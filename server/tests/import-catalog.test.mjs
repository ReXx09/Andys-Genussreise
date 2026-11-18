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

  it('übernimmt Zutaten und Schritte aus dem HTML bei unvollständigem JSON-LD', () => {
    const html = `<script type="application/ld+json">${JSON.stringify({
      '@type': 'Recipe', name: 'Kekse &#8211; &amp; mehr'
    })}</script>
      <h2>Rezept Grundteig (ergibt ca. 12 Stück)</h2>
      <ul><li>ca. 200 g Mehl</li><li>2 Eier</li></ul>
      <h2>Schritt 1</h2><p>Butter cremig rühren.</p>
      <h2>Schritt 2</h2><p>Für etwa 14–15 Minuten backen.</p>`;
    const recipe = parseRecipePage(html);
    assert.equal(recipe.name, 'Kekse – & mehr');
    assert.equal(recipe.portions, 12);
    assert.deepEqual(recipe.ingredients.map(({ name, amount, unit }) => ({ name, amount, unit })), [
      { name: 'Mehl', amount: 200, unit: 'g' },
      { name: 'Eier', amount: 2, unit: '' }
    ]);
    assert.deepEqual(recipe.steps, ['Butter cremig rühren.', 'Für etwa 14–15 Minuten backen.']);
    assert.equal(recipe.cookingTime, '14–15 Min.');
    assert.equal(recipe.sourceFields.ingredients, true);
    assert.equal(recipe.sourceFields.steps, true);
    assert.equal(recipe.sourceFields.portions, true);
    assert.equal(recipe.sourceFields.cookingTime, true);
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
