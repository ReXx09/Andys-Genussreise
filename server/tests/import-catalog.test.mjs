import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

const { parseIngredientText, parseRecipePage } = await import('../import-parser.js');

describe('Rezeptimport-Katalog', () => {
  it('verarbeitet einfache Zutaten mit Einheit', () => {
    assert.deepEqual(parseIngredientText('250 g Mehl'), { name: 'Mehl', amount: 250, unit: 'g' });
    assert.deepEqual(parseIngredientText('2 TL Salz'), { name: 'Salz', amount: 2, unit: 'TL' });
  });

  it('verarbeitet gemischte Brüche und Mengenbereiche', () => {
    assert.equal(parseIngredientText('1 1/2 EL Öl').amount, 1.5);
    assert.equal(parseIngredientText('2–4 Stück Tomaten').amount, 3);
    assert.equal(parseIngredientText('⅓ kg Zucker').amount, 1 / 3);
  });

  it('verarbeitet Zutaten ohne Mengenangabe', () => {
    assert.deepEqual(parseIngredientText('Salz nach Geschmack'), { name: 'Salz nach Geschmack', amount: 1, unit: '' });
  });

  it('verarbeitet klassische JSON-LD-Rezepte mit fehlenden optionalen Feldern', () => {
    const html = `<script type="application/ld+json">${JSON.stringify({
      '@type': 'Recipe', name: 'Suppe', recipeIngredient: '1 Dose Tomaten', recipeInstructions: 'Alles kochen'
    })}</script>`;
    const recipe = parseRecipePage(html);
    assert.equal(recipe.name, 'Suppe');
    assert.equal(recipe.ingredients[0].unit, 'Dose');
    assert.deepEqual(recipe.steps, ['Alles kochen']);
    assert.equal(recipe.sourceFields.category, false);
  });

  it('verarbeitet verschachtelte HowTo-Abschnitte', () => {
    const html = `<script type="application/ld+json">${JSON.stringify({
      '@type': 'Recipe', name: 'Ofengemuese', recipeIngredient: ['500 g Kartoffeln'],
      recipeInstructions: [{ '@type': 'HowToSection', itemListElement: [
        { '@type': 'HowToStep', text: 'Schneiden' }, { '@type': 'HowToStep', text: 'Backen' }
      ] }]
    })}</script>`;
    assert.deepEqual(parseRecipePage(html).steps, ['Schneiden', 'Backen']);
  });
});
