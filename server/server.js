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

app.use(cors());
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
    ingredients_json TEXT NOT NULL DEFAULT '[]',
    steps_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const recipeColumns = ['name', 'category', 'portions', 'prepTime', 'cookingTime', 'difficulty', 'tags', 'ingredients', 'steps'];

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
    ingredients: JSON.parse(row.ingredients_json || '[]'),
    steps: JSON.parse(row.steps_json || '[]'),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function normalizeRecipe(input) {
  return {
    id: String(input.id || ''),
    name: String(input.name || 'Neues Rezept'),
    category: String(input.category || ''),
    portions: Number(input.portions) || 4,
    prepTime: String(input.prepTime || ''),
    cookingTime: String(input.cookingTime || ''),
    difficulty: String(input.difficulty || 'mittel'),
    tags: String(input.tags || ''),
    ingredients: Array.isArray(input.ingredients) ? input.ingredients : [],
    steps: Array.isArray(input.steps) ? input.steps : []
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
  const recipe = normalizeRecipe(req.body);
  recipe.id = recipe.id || crypto.randomUUID();

  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO recipes (
      id, name, category, portions, prepTime, cookingTime, difficulty, tags,
      ingredients_json, steps_json, created_at, updated_at
    ) VALUES (
      @id, @name, @category, @portions, @prepTime, @cookingTime, @difficulty, @tags,
      @ingredients, @steps, @created_at, @updated_at
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
