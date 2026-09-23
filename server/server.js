import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { clampString, normalizeIngredient, parseIngredientText, parseRecipePage } from './import-parser.js';
import { validateImportUrl } from './import-security.js';
import { fetchImportResponse, isRedirectStatus, readLimitedResponse } from './import-http.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const dbPath = process.env.DB_PATH || join(rootDir, 'database.sqlite');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '5mb' }));
app.use(express.static(rootDir));

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Neues Rezept',
    category TEXT DEFAULT '',
    portions INTEGER DEFAULT 4,
    prepTime TEXT DEFAULT '',
    cookingTime TEXT DEFAULT '',
    difficulty TEXT DEFAULT 'mittel',
    tags TEXT DEFAULT '',
    folder_id TEXT DEFAULT NULL,
    ingredients_json TEXT NOT NULL DEFAULT '[]',
    steps_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS nutrient_entries (
    name TEXT PRIMARY KEY,
    kcal REAL NOT NULL DEFAULT 0,
    protein REAL NOT NULL DEFAULT 0,
    carbs REAL NOT NULL DEFAULT 0,
    fat REAL NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const columns = db.prepare("PRAGMA table_info(recipes)").all();
if (!columns.some((col) => col.name === 'folder_id')) {
  db.exec("ALTER TABLE recipes ADD COLUMN folder_id TEXT DEFAULT NULL");
}

const recipeColumns = ['name', 'category', 'portions', 'prepTime', 'cookingTime', 'difficulty', 'tags', 'ingredients', 'steps'];

const authPassword = String(process.env.KOCHBUCH_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '').trim();
const authSessionTtlHours = Math.max(1, Number(process.env.AUTH_SESSION_TTL_HOURS) || 24);
const authSessions = new Map();

function timingSafeTextEquals(a, b) {
  const left = Buffer.from(String(a || ''), 'utf8');
  const right = Buffer.from(String(b || ''), 'utf8');
  if (left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [token, expiresAt] of authSessions.entries()) {
    if (expiresAt <= now) {
      authSessions.delete(token);
    }
  }
}

function parseBearerToken(req) {
  const header = String(req.headers.authorization || '');
  if (!header.toLowerCase().startsWith('bearer ')) {
    return '';
  }
  return header.slice(7).trim();
}

function isTokenValid(token) {
  cleanupExpiredSessions();
  if (!token) return false;
  const expiresAt = authSessions.get(token);
  if (!expiresAt || expiresAt <= Date.now()) {
    authSessions.delete(token);
    return false;
  }
  return true;
}

function requireAuth(req, res, next) {
  if (!authPassword) {
    return res.status(503).json({ error: 'Login ist nicht konfiguriert (KOCHBUCH_ADMIN_PASSWORD fehlt).' });
  }

  const token = parseBearerToken(req);
  if (!isTokenValid(token)) {
    return res.status(401).json({ error: 'Nicht autorisiert. Bitte einloggen.' });
  }

  next();
}

function validatePayload(input) {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Ungueltige Nutzdaten' };
  }
  const ingredients = Array.isArray(input.ingredients) ? input.ingredients : [];
  const steps = Array.isArray(input.steps) ? input.steps : [];
  if (ingredients.length > 500) {
    return { ok: false, error: 'Zu viele Zutaten (max. 500)' };
  }
  if (steps.length > 300) {
    return { ok: false, error: 'Zu viele Schritte (max. 300)' };
  }
  return { ok: true };
}

function validateCompleteRecipePayload(input) {
  const validation = validatePayload(input);
  if (!validation.ok) return validation;
  if (!Array.isArray(input.ingredients) || !Array.isArray(input.steps)) {
    return { ok: false, error: 'ingredients und steps müssen als Arrays vorhanden sein' };
  }
  return { ok: true };
}

function recipeInsertStatement() {
  return db.prepare(`
    INSERT INTO recipes (
      id, name, category, portions, prepTime, cookingTime, difficulty, tags,
      folder_id, ingredients_json, steps_json, created_at, updated_at
    ) VALUES (
      @id, @name, @category, @portions, @prepTime, @cookingTime, @difficulty, @tags,
      @folder_id, @ingredients, @steps, @created_at, @updated_at
    )
  `);
}

function recipeDbParams(recipe, now) {
  return {
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    portions: recipe.portions,
    prepTime: recipe.prepTime,
    cookingTime: recipe.cookingTime,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    folder_id: recipe.folderId,
    ingredients: JSON.stringify(recipe.ingredients),
    steps: JSON.stringify(recipe.steps),
    created_at: now,
    updated_at: now
  };
}

function serializeRecipe(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    portions: row.portions,
    prepTime: row.prepTime,
    cookingTime: row.cookingTime,
    difficulty: row.difficulty,
    tags: row.tags,
    folderId: row.folder_id,
    ingredients: JSON.parse(row.ingredients_json || '[]'),
    steps: JSON.parse(row.steps_json || '[]'),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function normalizeRecipe(input) {
  const ingredients = Array.isArray(input.ingredients) ? input.ingredients : [];
  const steps = Array.isArray(input.steps) ? input.steps : [];
  return {
    id: String(input.id || ''),
    name: clampString(input.name || 'Neues Rezept', 256),
    category: clampString(input.category || '', 100),
    portions: Math.max(1, Math.min(999, Number(input.portions) || 4)),
    prepTime: clampString(input.prepTime || '', 100),
    cookingTime: clampString(input.cookingTime || '', 100),
    difficulty: clampString(input.difficulty || 'mittel', 20),
    tags: clampString(input.tags || '', 300),
    folderId: input.folderId ? clampString(input.folderId, 80) : null,
    ingredients: ingredients.map(normalizeIngredient),
    steps: steps.map((step) => clampString(step, 2000))
  };
}

function normalizeNutrient(input) {
  const name = clampString(input?.name, 120).trim();
  return {
    name,
    kcal: Number(input?.kcal) || 0,
    protein: Number(input?.protein) || 0,
    carbs: Number(input?.carbs) || 0,
    fat: Number(input?.fat) || 0
  };
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, database: dbPath });
});

app.get('/api/auth/status', (req, res) => {
  const token = parseBearerToken(req);
  res.json({
    authConfigured: !!authPassword,
    authenticated: isTokenValid(token)
  });
});

app.post('/api/auth/login', (req, res) => {
  if (!authPassword) {
    return res.status(503).json({ error: 'Login ist nicht konfiguriert (KOCHBUCH_ADMIN_PASSWORD fehlt).' });
  }

  const password = String(req.body?.password || '');
  if (!password) {
    return res.status(400).json({ error: 'Passwort ist erforderlich.' });
  }

  if (!timingSafeTextEquals(password, authPassword)) {
    return res.status(401).json({ error: 'Falsches Passwort.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + authSessionTtlHours * 60 * 60 * 1000;
  authSessions.set(token, expiresAt);

  res.json({
    token,
    expiresAt: new Date(expiresAt).toISOString()
  });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = parseBearerToken(req);
  if (token) {
    authSessions.delete(token);
  }
  res.json({ ok: true });
});

app.post('/api/recipes/import-preview', requireAuth, async (req, res) => {
  const url = await validateImportUrl(req.body?.url);
  if (!url) {
    return res.status(400).json({ error: 'Bitte eine öffentliche HTTP- oder HTTPS-Rezept-URL angeben.' });
  }

  try {
    const response = await fetchImportResponse(url);
    if (isRedirectStatus(response.status)) {
      return res.status(422).json({ error: 'Die Rezeptseite leitet weiter. Bitte den endgültigen Link verwenden.' });
    }
    if (!response.ok) {
      return res.status(502).json({ error: `Die Rezeptseite antwortet mit HTTP ${response.status}.` });
    }
    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > 2_000_000) {
      return res.status(413).json({ error: 'Die Rezeptseite ist zu groß (max. 2 MB).' });
    }
    const html = await readLimitedResponse(response, 2_000_000);
    const recipe = parseRecipePage(html);
    if (!recipe) {
      return res.status(422).json({ error: 'Auf dieser Seite wurde kein strukturiertes Rezept gefunden.' });
    }
    recipe.sourceUrl = url.toString();
    recipe.sourceImportedAt = new Date().toISOString();
    res.json({ sourceUrl: url.toString(), recipe });
  } catch (error) {
    const message = error?.name === 'TimeoutError' ? 'Der Abruf der Rezeptseite hat zu lange gedauert.' : error?.message === 'response-too-large' ? 'Die Rezeptseite ist zu groß (max. 2 MB).' : 'Die Rezeptseite konnte nicht abgerufen werden.';
    res.status(502).json({ error: message });
  }
});

app.get('/api/nutrients/online-search', requireAuth, async (req, res) => {
  const query = String(req.query?.q || '').trim().slice(0, 100);
  const barcode = String(req.query?.barcode || '').trim();
  if (barcode && !/^\d{8,14}$/.test(barcode)) {
    return res.status(400).json({ error: 'Bitte einen gültigen 8- bis 14-stelligen Barcode eingeben.' });
  }
  if (!barcode && query.length < 2) {
    return res.status(400).json({ error: 'Bitte mindestens zwei Zeichen für die Suche eingeben.' });
  }

  const searchUrl = barcode
    ? `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=code,product_name,product_name_de,generic_name,brands,nutriments`
    : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8&fields=code,product_name,product_name_de,generic_name,brands,nutriments`;
  try {
    const response = await fetch(searchUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'AndysKochbuch/1.0 (personal recipe manager)' }
    });
    if (!response.ok) {
      return res.status(502).json({ error: 'Die Online-Nährwertdatenbank ist derzeit nicht erreichbar.' });
    }
    const payload = await response.json();
    const products = (barcode ? [payload.status === 1 ? payload.product : null] : (Array.isArray(payload.products) ? payload.products : []))
      .filter(Boolean)
      .map((product) => {
        const nutriments = product.nutriments || {};
        return {
          id: String(product.code || ''),
          name: String(product.product_name_de || product.product_name || product.generic_name || '').trim(),
          brand: String(product.brands || '').trim(),
          kcal: Number(nutriments['energy-kcal_100g']) || 0,
          protein: Number(nutriments.proteins_100g) || 0,
          carbs: Number(nutriments.carbohydrates_100g) || 0,
          fat: Number(nutriments.fat_100g) || 0
        };
      })
      .filter((product) => product.name)
      .filter((product, index, all) => all.findIndex((item) => item.name.toLowerCase() === product.name.toLowerCase() && item.brand === product.brand) === index);
    res.json({ query: barcode || query, products });
  } catch (error) {
    const message = error?.name === 'TimeoutError' ? 'Die Online-Nährwertsuche hat zu lange gedauert.' : 'Die Online-Nährwertdatenbank konnte nicht abgefragt werden.';
    res.status(502).json({ error: message });
  }
});

app.get('/api/recipes', (req, res) => {
  const rows = db.prepare('SELECT * FROM recipes ORDER BY updated_at DESC').all();
  res.json(rows.map(serializeRecipe));
});

app.post('/api/recipes', requireAuth, (req, res) => {
  const validation = validatePayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }
  const recipe = normalizeRecipe(req.body);
  recipe.id = recipe.id || crypto.randomUUID();

  const now = new Date().toISOString();
  recipeInsertStatement().run(recipeDbParams(recipe, now));

  res.status(201).json({ ...recipe, createdAt: now, updatedAt: now });
});

app.post('/api/recipes/sync', requireAuth, (req, res) => {
  const recipes = Array.isArray(req.body?.recipes) ? req.body.recipes : null;
  if (!recipes || recipes.length > 500) {
    return res.status(400).json({ error: 'recipes muss ein Array mit maximal 500 Einträgen sein' });
  }

  const normalizedRecipes = [];
  const ids = new Set();
  for (const input of recipes) {
    const validation = validateCompleteRecipePayload(input);
    if (!validation.ok) return res.status(400).json({ error: validation.error });
    const recipe = normalizeRecipe(input);
    recipe.id = recipe.id || crypto.randomUUID();
    if (ids.has(recipe.id)) return res.status(400).json({ error: 'Rezept-IDs müssen eindeutig sein' });
    ids.add(recipe.id);
    normalizedRecipes.push(recipe);
  }

  const now = new Date().toISOString();
  const replaceRecipes = db.transaction(() => {
    db.prepare('DELETE FROM recipes').run();
    const insert = recipeInsertStatement();
    normalizedRecipes.forEach((recipe) => insert.run(recipeDbParams(recipe, now)));
  });
  replaceRecipes();
  res.json({ ok: true, count: normalizedRecipes.length });
});

app.put('/api/recipes/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);

  if (!existing) {
    return res.status(404).json({ error: 'Rezept nicht gefunden' });
  }

  const validation = validateCompleteRecipePayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const recipe = normalizeRecipe({ ...existing, ...req.body, id });
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    UPDATE recipes
    SET
      name = @name,
      category = @category,
      portions = @portions,
      prepTime = @prepTime,
      cookingTime = @cookingTime,
      difficulty = @difficulty,
      tags = @tags,
      folder_id = @folder_id,
      ingredients_json = @ingredients,
      steps_json = @steps,
      updated_at = @updated_at
    WHERE id = @id
  `);

  stmt.run({
    id,
    name: recipe.name,
    category: recipe.category,
    portions: recipe.portions,
    prepTime: recipe.prepTime,
    cookingTime: recipe.cookingTime,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    folder_id: recipe.folderId,
    ingredients: JSON.stringify(recipe.ingredients),
    steps: JSON.stringify(recipe.steps),
    updated_at: now
  });

  res.json({ ...recipe, updatedAt: now });
});

app.delete('/api/recipes/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM recipes WHERE id = ?').run(id);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'Rezept nicht gefunden' });
  }

  res.json({ ok: true });
});

app.post('/api/recipes/reset', requireAuth, (req, res) => {
  db.prepare('DELETE FROM recipes').run();
  res.json({ ok: true });
});

app.get('/api/nutrients', (req, res) => {
  const rows = db.prepare('SELECT name, kcal, protein, carbs, fat, updated_at FROM nutrient_entries ORDER BY name COLLATE NOCASE ASC').all();
  res.json(rows.map((row) => ({
    name: row.name,
    kcal: row.kcal,
    protein: row.protein,
    carbs: row.carbs,
    fat: row.fat,
    updatedAt: row.updated_at
  })));
});

app.post('/api/nutrients', requireAuth, (req, res) => {
  const nutrient = normalizeNutrient(req.body);
  if (!nutrient.name) {
    return res.status(400).json({ error: 'Name ist erforderlich' });
  }

  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO nutrient_entries (name, kcal, protein, carbs, fat, updated_at)
    VALUES (@name, @kcal, @protein, @carbs, @fat, @updated_at)
    ON CONFLICT(name) DO UPDATE SET
      kcal = excluded.kcal,
      protein = excluded.protein,
      carbs = excluded.carbs,
      fat = excluded.fat,
      updated_at = excluded.updated_at
  `).run({
    name: nutrient.name,
    kcal: nutrient.kcal,
    protein: nutrient.protein,
    carbs: nutrient.carbs,
    fat: nutrient.fat,
    updated_at: now
  });

  res.status(201).json({ ...nutrient, updatedAt: now });
});

app.post('/api/nutrients/sync', requireAuth, (req, res) => {
  const nutrients = Array.isArray(req.body?.nutrients) ? req.body.nutrients : null;
  if (!nutrients || nutrients.length > 1000) {
    return res.status(400).json({ error: 'nutrients muss ein Array mit maximal 1000 Einträgen sein' });
  }

  const normalizedNutrients = [];
  const names = new Set();
  for (const input of nutrients) {
    const nutrient = normalizeNutrient(input);
    if (!nutrient.name) return res.status(400).json({ error: 'Name ist erforderlich' });
    if (names.has(nutrient.name)) return res.status(400).json({ error: 'Nährwertnamen müssen eindeutig sein' });
    names.add(nutrient.name);
    normalizedNutrients.push(nutrient);
  }

  const now = new Date().toISOString();
  const replaceNutrients = db.transaction(() => {
    db.prepare('DELETE FROM nutrient_entries').run();
    const insert = db.prepare(`
      INSERT INTO nutrient_entries (name, kcal, protein, carbs, fat, updated_at)
      VALUES (@name, @kcal, @protein, @carbs, @fat, @updated_at)
    `);
    normalizedNutrients.forEach((nutrient) => insert.run({ ...nutrient, updated_at: now }));
  });
  replaceNutrients();
  res.json({ ok: true, count: normalizedNutrients.length });
});

app.delete('/api/nutrients/:name', requireAuth, (req, res) => {
  const name = String(req.params.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: 'Name ist erforderlich' });
  }
  const info = db.prepare('DELETE FROM nutrient_entries WHERE name = ?').run(name);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Nährwert nicht gefunden' });
  }
  res.json({ ok: true });
});

app.post('/api/nutrients/reset', requireAuth, (req, res) => {
  db.prepare('DELETE FROM nutrient_entries').run();
  res.json({ ok: true });
});

app.get('*', (req, res) => {
  res.sendFile(join(rootDir, 'index.html'));
});

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Andys Genussreise läuft auf http://localhost:${port}`);
    console.log(`SQLite Datenbank: ${dbPath}`);
    if (!authPassword) {
      console.warn('WARNUNG: KOCHBUCH_ADMIN_PASSWORD ist nicht gesetzt. Bearbeiten ist serverseitig gesperrt.');
    }
  });
}

export { app, parseIngredientText, parseRecipePage };
