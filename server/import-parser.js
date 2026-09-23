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

function parseIngredientText(value) {
  const text = clampString(value, 300).trim();
  const match = text.match(/^((?:[0-9]+\s+)?[0-9]+\/[0-9]+|[0-9]+(?:[,.][0-9]+)?(?:\s*[-–]\s*[0-9]+(?:[,.][0-9]+)?)?|[½¼¾⅓⅔⅛⅜⅝⅞])\s*([a-zA-ZäöüÄÖÜ]+\.?)?\s+(.+)$/);
  if (!match) return { name: text, amount: text ? 1 : 0, unit: '' };

  const amountText = match[1];
  const fractionValues = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 };
  const parseAmount = (raw) => {
    const valueText = raw.trim();
    if (fractionValues[valueText]) return fractionValues[valueText];
    const mixed = valueText.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
    if (/^\d+\/\d+$/.test(valueText)) {
      const [numerator, denominator] = valueText.split('/').map(Number);
      return denominator ? numerator / denominator : NaN;
    }
    return Number(valueText.replace(',', '.'));
  };
  const range = amountText.split(/\s*[-–]\s*/).map(parseAmount);
  const amount = range.length === 2 ? (range[0] + range[1]) / 2 : range[0];
  const unitAliases = {
    kg: 'kg', g: 'g', gramm: 'g', ml: 'ml', l: 'l', el: 'EL', esslöffel: 'EL', tl: 'TL', teelöffel: 'TL',
    st: 'Stück', stk: 'Stück', stück: 'Stück', stücke: 'Stück', dose: 'Dose', dosen: 'Dose', packung: 'Packung', packungen: 'Packung',
    pkg: 'Packung', prise: 'Prise', prisen: 'Prise', bund: 'Bund', bünde: 'Bund', zehe: 'Zehe', zehen: 'Zehe'
  };
  const candidateUnit = String(match[2] || '').replace('.', '').toLowerCase();
  const unit = unitAliases[candidateUnit] || '';
  const name = unit ? match[3].trim() : `${match[2] ? `${match[2]} ` : ''}${match[3]}`.trim();
  return { name, amount: Number.isFinite(amount) ? amount : 0, unit };
}

function parseRecipeInstructions(instructions) {
  const values = Array.isArray(instructions) ? instructions : instructions ? [instructions] : [];
  return values.flatMap((step) => {
    if (typeof step === 'string') return [step.trim()];
    if (Array.isArray(step?.itemListElement)) return parseRecipeInstructions(step.itemListElement);
    if (step?.text) return [String(step.text).trim()];
    if (step?.item) return parseRecipeInstructions(step.item);
    return [];
  }).filter(Boolean);
}

function findRecipeJsonLd(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value.map(findRecipeJsonLd).find(Boolean) || null;
  if (typeof value !== 'object') return null;
  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  if (types.some((type) => String(type || '').toLowerCase() === 'recipe')) return value;
  if (Array.isArray(value['@graph'])) return findRecipeJsonLd(value['@graph']);
  return null;
}

function parseIsoDuration(value) {
  const match = String(value || '').match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/i);
  if (!match) return '';
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  if (!hours && !minutes) return '';
  return `${hours ? `${hours} Std. ` : ''}${minutes ? `${minutes} Min.` : ''}`.trim();
}

function parseRecipePage(html) {
  const scripts = [...String(html).matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const recipe = findRecipeJsonLd(parsed);
      if (!recipe?.name) continue;
      const sourceFields = {
        category: Boolean(recipe.recipeCategory), portions: Boolean(recipe.recipeYield), prepTime: Boolean(recipe.prepTime),
        cookingTime: Boolean(recipe.cookTime), tags: Boolean(recipe.keywords),
        ingredients: Array.isArray(recipe.recipeIngredient) && recipe.recipeIngredient.length > 0,
        steps: Array.isArray(recipe.recipeInstructions) && recipe.recipeInstructions.length > 0
      };
      return {
        name: clampString(recipe.name, 256),
        category: clampString(Array.isArray(recipe.recipeCategory) ? recipe.recipeCategory[0] : recipe.recipeCategory, 100),
        portions: Math.max(1, Number.parseInt(String(recipe.recipeYield || '').match(/\d+/)?.[0] || '4', 10)),
        prepTime: parseIsoDuration(recipe.prepTime), cookingTime: parseIsoDuration(recipe.cookTime), difficulty: 'mittel',
        tags: clampString(Array.isArray(recipe.keywords) ? recipe.keywords.join(', ') : recipe.keywords, 300),
        ingredients: (Array.isArray(recipe.recipeIngredient) ? recipe.recipeIngredient : recipe.recipeIngredient ? [recipe.recipeIngredient] : []).map((ingredient) => normalizeIngredient(parseIngredientText(ingredient))),
        steps: parseRecipeInstructions(recipe.recipeInstructions), sourceFields
      };
    } catch {}
  }
  return null;
}

export { clampString, normalizeIngredient, parseIngredientText, parseRecipePage };
