import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { it } from 'node:test';

const serverDir = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(serverDir, '..', '..', 'kochbuch-dashboard.html');

it('kompiliert das Frontend-JavaScript ohne Syntaxfehler', () => {
  const html = readFileSync(htmlPath, 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length, 'Keine Script-Tags im Frontend gefunden.');
  assert.doesNotThrow(() => new Function(scripts.at(-1)[1]));
});
