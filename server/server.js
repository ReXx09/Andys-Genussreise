import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

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

const columns = db.prepare("PRAGMA table_info(recipes)").all();
if (!columns.some((col) => col.name === 'folder_id')) {
  db.exec("ALTER TABLE recipes ADD COLUMN folder_id TEXT DEFAULT NULL");
}

const recipeColumns = ['name', 'category', 'portions', 'prepTime', 'cookingTime', 'difficulty', 'tags', 'ingredients', 'steps'];

function clampString(value, maxLength) {
  return String(value || '').slice(0, maxLength);
}

function normalizeIngredient(input) {
  return {
    name: clampString(input?.name, 200),
    amount: Number(input?.amount) || 0,
    unit: clampString(input?.unit, 20),
    nutrientKey: clampString(input?.nutrientKey, 120),
    kcal: Number(input?.kcal) || 0,
    protein: Number(input?.protein) || 0,
    carbs: Number(input?.carbs) || 0,
    fat: Number(input?.fat) || 0
  };
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

app.get('/api/health', (req, res) => {
  res.json({ ok: true, database: dbPath });
});

app.get('/api/recipes', (req, res) => {
  const rows = db.prepare('SELECT * FROM recipes ORDER BY updated_at DESC').all();
  res.json(rows.map(serializeRecipe));
});

app.post('/api/recipes', (req, res) => {
  const validation = validatePayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }
  const recipe = normalizeRecipe(req.body);
  recipe.id = recipe.id || crypto.randomUUID();

  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO recipes (
      id, name, category, portions, prepTime, cookingTime, difficulty, tags,
      folder_id, ingredients_json, steps_json, created_at, updated_at
    ) VALUES (
      @id, @name, @category, @portions, @prepTime, @cookingTime, @difficulty, @tags,
      @folder_id, @ingredients, @steps, @created_at, @updated_at
    )
  `);

  stmt.run({
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
  });

  res.status(201).json({ ...recipe, createdAt: now, updatedAt: now });
});

app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);

  if (!existing) {
    return res.status(404).json({ error: 'Rezept nicht gefunden' });
  }

  const validation = validatePayload(req.body);
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

app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM recipes WHERE id = ?').run(id);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'Rezept nicht gefunden' });
  }

  res.json({ ok: true });
});

app.post('/api/recipes/reset', (req, res) => {
  db.prepare('DELETE FROM recipes').run();
  res.json({ ok: true });
});

app.get('*', (req, res) => {
  res.sendFile(join(rootDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Andys Genussreise läuft auf http://localhost:${port}`);
  console.log(`SQLite Datenbank: ${dbPath}`);
});
