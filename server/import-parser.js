function clampString(value, maxLength) {
  return String(value || '').slice(0, maxLength);
}

function decodeHtmlEntities(value) {
  const namedEntities = {
    amp: '&', apos: "'", auml: 'ä', Auml: 'Ä', eacute: 'é', Eacute: 'É',
    gt: '>', hellip: '…', ldquo: '“', lt: '<', mdash: '—', nbsp: ' ',
    ndash: '–', ouml: 'ö', Ouml: 'Ö', quot: '"', rdquo: '”', rsquo: '’',
    szlig: 'ß', uuml: 'ü', Uuml: 'Ü'
  };
  return String(value || '').replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z][a-z0-9]+);/gi, (entity, value) => {
    if (value[0] !== '#') return namedEntities[value] || entity;
    const codePoint = value[1]?.toLowerCase() === 'x'
      ? Number.parseInt(value.slice(2), 16)
      : Number.parseInt(value.slice(1), 10);
    return Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : entity;
  });
}

function extractHtmlText(markup) {
  return decodeHtmlEntities(String(markup || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<br\b[^>]*>/gi, ' ')
    .replace(/<\/?[a-z][^>]*>/gi, ' '))
    .replace(/[\s\u00a0]+/g, ' ')
    .trim();
}

function findHtmlHeadings(html) {
  return [...String(html).matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
    text: extractHtmlText(match[2])
  }));
}

function extractListItems(markup) {
  return [...String(markup).matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)]
    .map((match) => extractHtmlText(match[1]))
    .filter(Boolean);
}

function extractRecipeIngredients(html) {
  const headings = findHtmlHeadings(html);
  const candidates = headings
    .filter((heading) => /\b(zutaten|ingredients?)\b/i.test(heading.text))
    .concat(headings.filter((heading) => /\b(rezept|recipe|grundteig)\b/i.test(heading.text)));

  for (const heading of candidates) {
    const nextHeading = headings.find((item) => item.start > heading.start);
    const section = String(html).slice(heading.end, nextHeading?.start ?? html.length);
    const list = section.match(/<(ul|ol)\b[^>]*>[\s\S]*?<\/\1\s*>/i);
    if (!list) continue;
    const ingredients = extractListItems(list[0]);
    if (ingredients.length) return ingredients;
  }
  return [];
}

function extractRecipeSteps(html) {
  const headings = findHtmlHeadings(html);
  const numberedSteps = headings.filter((heading) => /^(?:schritt|step)\s*\d+\b/i.test(heading.text));
  if (numberedSteps.length) {
    return numberedSteps.map((heading) => {
      const nextHeading = headings.find((item) => item.start > heading.start);
      const section = String(html).slice(heading.end, nextHeading?.start ?? html.length);
      const paragraphs = [...section.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p\s*>/gi)]
        .map((match) => extractHtmlText(match[1]))
        .filter(Boolean);
      return paragraphs.join(' ');
    }).filter(Boolean);
  }

  const heading = headings.find((item) => /^(?:zubereitung|anleitung|instructions?)\b/i.test(item.text));
  if (!heading) return [];
  const nextHeading = headings.find((item) => item.start > heading.start);
  const section = String(html).slice(heading.end, nextHeading?.start ?? html.length);
  const list = section.match(/<(ul|ol)\b[^>]*>[\s\S]*?<\/\1\s*>/i);
  if (list) return extractListItems(list[0]);
  return [...section.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p\s*>/gi)]
    .map((match) => extractHtmlText(match[1]))
    .filter(Boolean);
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
  const text = clampString(value, 300).trim().replace(/^(?:ca\.?|circa|etwa|ungefähr)\s+/i, '');
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
  if (types.some((type) => String(type || '').split(/[\/#]/).pop().toLowerCase() === 'recipe')) return value;
  if (Array.isArray(value['@graph'])) return findRecipeJsonLd(value['@graph']);
  return null;
}

function parsePortions(recipeYield, headings) {
  const recipeYieldText = Array.isArray(recipeYield) ? recipeYield.join(' ') : String(recipeYield || '');
  const recipeYieldMatch = recipeYieldText.match(/\d+/);
  if (recipeYieldMatch) return Number.parseInt(recipeYieldMatch[0], 10);
  const headingText = headings.map((heading) => heading.text).join(' ');
  const headingMatch = headingText.match(/(?:ergibt|reicht\s+für|für)\s*(?:ca\.?\s*)?(\d+)\s*(?:portionen|personen|stück)/i);
  return headingMatch ? Number.parseInt(headingMatch[1], 10) : 0;
}

function parseIsoDuration(value) {
  const match = String(value || '').match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/i);
  if (!match) return '';
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  if (!hours && !minutes) return '';
  return `${hours ? `${hours} Std. ` : ''}${minutes ? `${minutes} Min.` : ''}`.trim();
}

function parseTextCookingTime(html) {
  const text = extractHtmlText(html);
  const match = text.match(/\b(?:für\s+)?(?:etwa\s+|ca\.?\s*)?(\d+(?:[,.]\d+)?(?:\s*[-–]\s*\d+(?:[,.]\d+)?)?)\s*(?:minuten?|min\.?)\s+(?:lang\s+)?(?:backen|kochen|köcheln|garen|braten)\b/i);
  return match ? `${match[1].replace(/\s+/g, '')} Min.` : '';
}

function parseRecipePage(html) {
  const scripts = [...String(html).matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const headings = findHtmlHeadings(html);
  const htmlIngredients = extractRecipeIngredients(html);
  const htmlSteps = extractRecipeSteps(html);
  for (const match of scripts) {
    let parsed;
    try {
      parsed = JSON.parse(match[1].trim());
    } catch {
      continue;
    }
    const recipe = findRecipeJsonLd(parsed);
    if (!recipe?.name) continue;
    const structuredIngredients = (Array.isArray(recipe.recipeIngredient) ? recipe.recipeIngredient : recipe.recipeIngredient ? [recipe.recipeIngredient] : [])
      .map((ingredient) => normalizeIngredient(parseIngredientText(ingredient)));
    const ingredients = structuredIngredients.length
      ? structuredIngredients
      : htmlIngredients.map((ingredient) => normalizeIngredient(parseIngredientText(ingredient)));
    const structuredSteps = parseRecipeInstructions(recipe.recipeInstructions);
    const steps = structuredSteps.length ? structuredSteps : htmlSteps;
    const portions = parsePortions(recipe.recipeYield, headings);
    const cookingTime = parseIsoDuration(recipe.cookTime) || parseTextCookingTime(html);
    const sourceFields = {
      category: Boolean(recipe.recipeCategory), portions: portions > 0, prepTime: Boolean(recipe.prepTime),
      cookingTime: Boolean(cookingTime), tags: Boolean(recipe.keywords),
      ingredients: ingredients.length > 0, steps: steps.length > 0
    };
    return {
      name: clampString(extractHtmlText(recipe.name), 256),
      category: clampString(Array.isArray(recipe.recipeCategory) ? recipe.recipeCategory[0] : recipe.recipeCategory, 100),
      portions: Math.max(1, portions || 4),
      prepTime: parseIsoDuration(recipe.prepTime), cookingTime, difficulty: 'mittel',
      tags: clampString(Array.isArray(recipe.keywords) ? recipe.keywords.join(', ') : recipe.keywords, 300),
      ingredients, steps, sourceFields
    };
  }
  return null;
}

export { clampString, normalizeIngredient, parseIngredientText, parseRecipePage };
