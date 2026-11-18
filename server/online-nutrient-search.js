function simplifyNutrientSearchQuery(value) {
  return String(value || '')
    .replace(/\([^)]*\)|\[[^\]]*\]/g, ' ')
    .split(/\b(?:oder|or)\b/i)[0]
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
}

function normalizeOnlineNutrientProducts(products) {
  return products
    .map((product) => {
      const nutriments = product.nutriments || {};
      return {
        id: String(product.code || ''),
        name: String(product.product_name_de || product.product_name || product.generic_name || '').trim(),
        brand: Array.isArray(product.brands) ? product.brands.join(', ').trim() : String(product.brands || '').trim(),
        kcal: Number(nutriments['energy-kcal_100g']) || 0,
        protein: Number(nutriments.proteins_100g) || 0,
        carbs: Number(nutriments.carbohydrates_100g) || 0,
        fat: Number(nutriments.fat_100g) || 0
      };
    })
    .filter((product) => product.name)
    .filter((product, index, all) => all.findIndex((item) =>
      item.name.toLowerCase() === product.name.toLowerCase() && item.brand === product.brand) === index);
}

export { normalizeOnlineNutrientProducts, simplifyNutrientSearchQuery };
