import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalizeOnlineNutrientProducts, simplifyNutrientSearchQuery } from '../online-nutrient-search.js';

describe('Online-Nährwertsuche', () => {
  it('entfernt Rezeptqualifizierer vor der Volltextsuche', () => {
    assert.equal(simplifyNutrientSearchQuery('Weizenmehl (Typ 405 oder 550)'), 'Weizenmehl');
  });

  it('wandelt Suchtreffer in das Dashboard-Format um und behält passende Treffer', () => {
    const products = normalizeOnlineNutrientProducts([
      {
        code: '4306188420804',
        product_name_de: 'Weizenmehl Type 405',
        brands: ['Jeden Tag'],
        nutriments: { 'energy-kcal_100g': 344, proteins_100g: 10, carbohydrates_100g: 72, fat_100g: 1 }
      },
      {
        code: '4018905311233',
        product_name: 'Weizenmehl Type 405',
        brands: ['Jeden Tag'],
        nutriments: { 'energy-kcal_100g': 344 }
      },
      { code: 'missing-name', brands: ['No Name'] }
    ]);

    assert.deepEqual(products, [{
      id: '4306188420804',
      name: 'Weizenmehl Type 405',
      brand: 'Jeden Tag',
      kcal: 344,
      protein: 10,
      carbs: 72,
      fat: 1
    }]);
  });
});
