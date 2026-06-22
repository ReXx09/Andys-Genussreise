/*
  Lokale Nährwerttabelle für das digitale Kochbuch – erweiterte Version.

  Alle Werte sind Durchschnittswerte pro 100 g oder 100 ml.
  Die Datei wird direkt von "kochbuch-dashboard.html" geladen.

  Neue Zutaten einfach in die passende items-Liste eintragen:

  {
    "name": "Beispiel Zutat",
    "kcal": 123,
    "protein": 4.5,
    "carbs": 20,
    "fat": 6,
    "fiber": 2.5,       // optional: Ballaststoffe in g
    "sugar": 5,          // optional: Zucker in g (Teil von carbs)
    "unit": "g",         // optional: "g" oder "ml"
    "aliases": ["beispiel", "beispiel zutat"]
  },

  Hinweise:
  - name: sichtbarer Hauptname
  - aliases: optionale Suchbegriffe/Synonyme
  - kcal: Kilokalorien pro 100 g/ml
  - protein: Eiweiß in g pro 100 g/ml
  - carbs: Kohlenhydrate in g pro 100 g/ml
  - fat: Fett in g pro 100 g/ml
  - fiber: Ballaststoffe in g pro 100 g/ml (optional)
  - sugar: Zucker in g pro 100 g/ml (optional)
  - unit: "g" oder "ml" (optional, Standard ist "g")
*/

window.NUTRIENT_DATA = {
  "version": 2,
  "unit": "pro 100 g/ml",
  "note": "Durchschnittswerte. Für exakte Produktwerte bitte Verpackung oder eine Produktdatenbank nutzen.",
  "categories": {
    "deutsch": {
      "label": "Deutsch / Grundzutaten",
      "items": [
        { "name": "Apfel", "kcal": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "fiber": 2.4, "sugar": 10.4 },
        { "name": "Banane", "kcal": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "fiber": 2.6, "sugar": 12.2 },
        { "name": "Orange", "kcal": 47, "protein": 0.9, "carbs": 12, "fat": 0.1, "fiber": 2.4, "sugar": 8.2 },
        { "name": "Kartoffel", "kcal": 77, "protein": 2, "carbs": 17, "fat": 0.1, "fiber": 2.2, "sugar": 0.8 },
        { "name": "Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4, "sugar": 0.1, "aliases": ["Reis"] },
        { "name": "Nudeln gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "fiber": 1.8, "sugar": 0.6, "aliases": ["Nudeln"] },
        { "name": "Haferflocken", "kcal": 389, "protein": 16.9, "carbs": 66, "fat": 6.9, "fiber": 10.6, "sugar": 0.9 },
        { "name": "Brot (Mischbrot)", "kcal": 250, "protein": 9, "carbs": 49, "fat": 3.2, "fiber": 4.5, "sugar": 2.0 },
        { "name": "Hähnchenbrust", "kcal": 165, "protein": 31, "carbs": 0, "fat": 3.6, "fiber": 0, "sugar": 0 },
        { "name": "Rindfleisch (mager)", "kcal": 250, "protein": 26, "carbs": 0, "fat": 15, "fiber": 0, "sugar": 0 },
        { "name": "Schweinefleisch (mager)", "kcal": 242, "protein": 27, "carbs": 0, "fat": 14, "fiber": 0, "sugar": 0 },
        { "name": "Lachs", "kcal": 208, "protein": 20, "carbs": 0, "fat": 13, "fiber": 0, "sugar": 0 },
        { "name": "Thunfisch (in Wasser)", "kcal": 144, "protein": 23, "carbs": 0, "fat": 5, "fiber": 0, "sugar": 0 },
        { "name": "Ei (Hühnerei)", "kcal": 155, "protein": 13, "carbs": 1.1, "fat": 11, "fiber": 0, "sugar": 0 },
        { "name": "Milch (3,5%)", "kcal": 64, "protein": 3.4, "carbs": 5, "fat": 3.5, "fiber": 0, "sugar": 5, "unit": "ml" },
        { "name": "Joghurt natur (3,5%)", "kcal": 61, "protein": 10, "carbs": 3.6, "fat": 0.4, "fiber": 0, "sugar": 3.6, "aliases": ["Joghurt"] },
        { "name": "Käse Gouda (45%)", "kcal": 356, "protein": 25, "carbs": 2.2, "fat": 27, "fiber": 0, "sugar": 0.2, "aliases": ["Käse", "Gouda"] },
        { "name": "Butter", "kcal": 717, "protein": 0.9, "carbs": 0.1, "fat": 81, "fiber": 0, "sugar": 0 },
        { "name": "Olivenöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml", "aliases": ["Öl"] },
        { "name": "Zucker (Kristallzucker)", "kcal": 387, "protein": 0, "carbs": 100, "fat": 0, "fiber": 0, "sugar": 100 },
        { "name": "Mehl (Weizen 405)", "kcal": 364, "protein": 10, "carbs": 76, "fat": 1, "fiber": 3.3, "sugar": 0.4 },
        { "name": "Tomate", "kcal": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "fiber": 1.2, "sugar": 2.6 },
        { "name": "Gurke", "kcal": 15, "protein": 0.7, "carbs": 3.6, "fat": 0.1, "fiber": 0.5, "sugar": 1.7 },
        { "name": "Karotte", "kcal": 41, "protein": 0.9, "carbs": 10, "fat": 0.2, "fiber": 2.8, "sugar": 4.7 },
        { "name": "Zwiebel", "kcal": 40, "protein": 1.1, "carbs": 9.3, "fat": 0.1, "fiber": 1.7, "sugar": 4.2 },
        { "name": "Paprika (rot)", "kcal": 31, "protein": 1, "carbs": 6, "fat": 0.3, "fiber": 2.1, "sugar": 4.0 },
        { "name": "Brokkoli", "kcal": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "fiber": 2.6, "sugar": 1.7 },
        { "name": "Spinat", "kcal": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "fiber": 2.2, "sugar": 0.4 },
        { "name": "Bohnen (weiße, getrocknet)", "kcal": 347, "protein": 21, "carbs": 60, "fat": 1.2, "fiber": 15, "sugar": 2.1 },
        { "name": "Linsen (trocken)", "kcal": 352, "protein": 25, "carbs": 60, "fat": 1.1, "fiber": 11, "sugar": 2.0, "aliases": ["Linsen"] },
        { "name": "Kichererbsen (trocken)", "kcal": 364, "protein": 19, "carbs": 61, "fat": 6, "fiber": 17, "sugar": 10 },
        { "name": "Nüsse gemischt", "kcal": 607, "protein": 20, "carbs": 22, "fat": 54, "fiber": 7, "sugar": 4.3, "aliases": ["Nüsse"] },
        { "name": "Schokolade (Zartbitter 70%)", "kcal": 546, "protein": 5, "carbs": 60, "fat": 31, "fiber": 11, "sugar": 35 },
        { "name": "Honig", "kcal": 304, "protein": 0.3, "carbs": 82, "fat": 0, "fiber": 0, "sugar": 82 },
        { "name": "Sahne (30%)", "kcal": 340, "protein": 2, "carbs": 3, "fat": 36, "fiber": 0, "sugar": 3, "unit": "ml" },
        { "name": "Wasser", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Salz", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0 },
        { "name": "Gewürze (gemischte Kräuter)", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0 },
        { "name": "Knoblauch", "kcal": 149, "protein": 6.4, "carbs": 33, "fat": 0.5, "fiber": 2.1, "sugar": 1.0 },
        { "name": "Lauch", "kcal": 61, "protein": 1.5, "carbs": 14, "fat": 0.3, "fiber": 1.8, "sugar": 3.9 },
        { "name": "Sellerie (Stange)", "kcal": 16, "protein": 0.8, "carbs": 3.0, "fat": 0.2, "fiber": 1.6, "sugar": 1.4 },
        { "name": "Rote Bete", "kcal": 43, "protein": 1.6, "carbs": 9.6, "fat": 0.1, "fiber": 2.8, "sugar": 6.8 },
        { "name": "Mais (Zuckermais)", "kcal": 86, "protein": 3.3, "carbs": 19, "fat": 1.2, "fiber": 2.7, "sugar": 3.2 },
        { "name": "Erbsen (grün)", "kcal": 81, "protein": 5.4, "carbs": 14, "fat": 0.4, "fiber": 5.1, "sugar": 5.7 },
        { "name": "Champignons (frisch)", "kcal": 22, "protein": 3.1, "carbs": 3.3, "fat": 0.3, "fiber": 1.0, "sugar": 0.7 }
      ]
    },
    "japanisch": {
      "label": "Japanisch",
      "items": [
        { "name": "Miso", "kcal": 199, "protein": 12, "carbs": 26, "fat": 6, "fiber": 5, "sugar": 8, "unit": "g" },
        { "name": "Nori", "kcal": 35, "protein": 5.8, "carbs": 5, "fat": 0.6, "fiber": 1.0, "sugar": 0.1 },
        { "name": "Wakame", "kcal": 45, "protein": 3, "carbs": 9, "fat": 0.6, "fiber": 3.0, "sugar": 0.5 },
        { "name": "Kombu", "kcal": 43, "protein": 8, "carbs": 9, "fat": 0.6, "fiber": 6.0, "sugar": 0.5 },
        { "name": "Dashi Instant", "kcal": 15, "protein": 1, "carbs": 3, "fat": 0, "fiber": 0, "sugar": 0, "aliases": ["Dashi"] },
        { "name": "Tofu (fest)", "kcal": 144, "protein": 17, "carbs": 3, "fat": 9, "fiber": 2.3, "sugar": 0.2, "aliases": ["Tofu"] },
        { "name": "Edamame", "kcal": 121, "protein": 11, "carbs": 9, "fat": 5, "fiber": 5, "sugar": 1.5 },
        { "name": "Sojasauce", "kcal": 53, "protein": 8, "carbs": 5, "fat": 0, "fiber": 0, "sugar": 0.5, "unit": "ml" },
        { "name": "Mirin", "kcal": 110, "protein": 0, "carbs": 27, "fat": 0, "fiber": 0, "sugar": 25, "unit": "ml" },
        { "name": "Sake (Reiswein)", "kcal": 103, "protein": 0, "carbs": 2, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Reisessig", "kcal": 18, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Sushi-Reis gekocht", "kcal": 150, "protein": 2.7, "carbs": 32, "fat": 0.3, "fiber": 0.4, "sugar": 0.2, "aliases": ["Sushi-Reis"] },
        { "name": "Udon gekocht", "kcal": 105, "protein": 4.5, "carbs": 21, "fat": 0.5, "fiber": 1.0, "sugar": 0.2, "aliases": ["Udon"] },
        { "name": "Soba gekocht", "kcal": 99, "protein": 5, "carbs": 21, "fat": 0.1, "fiber": 2.0, "sugar": 0.2, "aliases": ["Soba"] },
        { "name": "Ramen-Nudeln gekocht", "kcal": 137, "protein": 5, "carbs": 26, "fat": 2, "fiber": 0.9, "sugar": 0.3, "aliases": ["Ramen"] },
        { "name": "Shiitake (frisch)", "kcal": 34, "protein": 2.2, "carbs": 7, "fat": 0.5, "fiber": 2.5, "sugar": 2.0, "aliases": ["Shiitake"] },
        { "name": "Enoki", "kcal": 37, "protein": 2.7, "carbs": 7, "fat": 0.3, "fiber": 2.7, "sugar": 1.5 },
        { "name": "Daikon", "kcal": 18, "protein": 0.6, "carbs": 4, "fat": 0.1, "fiber": 1.6, "sugar": 1.8 },
        { "name": "Ingwer", "kcal": 80, "protein": 1.8, "carbs": 18, "fat": 0.8, "fiber": 2.0, "sugar": 1.7 },
        { "name": "Wasabi (Paste)", "kcal": 109, "protein": 6, "carbs": 19, "fat": 1, "fiber": 7, "sugar": 5, "aliases": ["Wasabi"] },
        { "name": "Sesamöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Sesam (ungeschält)", "kcal": 573, "protein": 18, "carbs": 23, "fat": 50, "fiber": 11, "sugar": 0.3 },
        { "name": "Panko (Paniermehl)", "kcal": 395, "protein": 9, "carbs": 78, "fat": 4, "fiber": 3.0, "sugar": 5.0 },
        { "name": "Tempura-Teig", "kcal": 280, "protein": 5, "carbs": 42, "fat": 10, "fiber": 1.5, "sugar": 2.0 },
        { "name": "Yakisoba-Nudeln gekocht", "kcal": 160, "protein": 5, "carbs": 30, "fat": 3, "fiber": 1.2, "sugar": 1.0, "aliases": ["Yakisoba"] },
        { "name": "Mochi", "kcal": 235, "protein": 4, "carbs": 52, "fat": 0.2, "fiber": 1.0, "sugar": 0.5 },
        { "name": "Anko (süße Bohnenpaste)", "kcal": 242, "protein": 6, "carbs": 56, "fat": 0.1, "fiber": 8, "sugar": 40 },
        { "name": "Matcha", "kcal": 276, "protein": 30, "carbs": 39, "fat": 6, "fiber": 25, "sugar": 0 },
        { "name": "Sojamilch", "kcal": 33, "protein": 2.8, "carbs": 1.6, "fat": 1.6, "fiber": 0.6, "sugar": 0.5, "unit": "ml" },
        { "name": "Ponzu (Sojasauce mit Zitrus)", "kcal": 15, "protein": 1, "carbs": 2, "fat": 0, "fiber": 0, "sugar": 0.5, "unit": "ml" },
        { "name": "Yuzu (Saft)", "kcal": 20, "protein": 0.5, "carbs": 5, "fat": 0.1, "fiber": 0, "sugar": 2, "unit": "ml" },
        { "name": "Shiso (Blätter)", "kcal": 16, "protein": 1.5, "carbs": 2.5, "fat": 0.3, "fiber": 1.0, "sugar": 0.5 },
        { "name": "Renkon (Lotuswurzel)", "kcal": 74, "protein": 2.6, "carbs": 17, "fat": 0.1, "fiber": 4.9, "sugar": 1.5 },
        { "name": "Tamari (Glutenfreie Sojasauce)", "kcal": 45, "protein": 8, "carbs": 4, "fat": 0, "fiber": 0, "sugar": 0.5, "unit": "ml" },
        { "name": "Furikake (Gewürzmischung)", "kcal": 150, "protein": 5, "carbs": 20, "fat": 5, "fiber": 3, "sugar": 2 }
      ]
    },
    "chinesisch": {
      "label": "Chinesisch",
      "items": [
        { "name": "Chinesische Sojasauce", "kcal": 53, "protein": 8, "carbs": 5, "fat": 0, "fiber": 0, "sugar": 0.5, "unit": "ml" },
        { "name": "Jasminreis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4, "sugar": 0.1, "aliases": ["Jasminreis"] },
        { "name": "Mie-Nudeln gekocht", "kcal": 150, "protein": 5, "carbs": 30, "fat": 2, "fiber": 1.0, "sugar": 0.2, "aliases": ["Mie-Nudeln", "Mienudeln"] },
        { "name": "Glasnudeln gekocht", "kcal": 110, "protein": 0.1, "carbs": 26, "fat": 0.1, "fiber": 0.5, "sugar": 0.1, "aliases": ["Glasnudeln"] },
        { "name": "Wonton-Nudeln gekocht", "kcal": 138, "protein": 5, "carbs": 27, "fat": 2, "fiber": 0.8, "sugar": 0.2, "aliases": ["Wonton-Nudeln", "Wonton"] },
        { "name": "Pak Choi", "kcal": 13, "protein": 1.5, "carbs": 2.2, "fat": 0.2, "fiber": 1.0, "sugar": 1.0 },
        { "name": "Chinakohl", "kcal": 16, "protein": 1.5, "carbs": 3, "fat": 0.2, "fiber": 1.2, "sugar": 1.2 },
        { "name": "Sojasprossen", "kcal": 30, "protein": 3.2, "carbs": 3.5, "fat": 0.2, "fiber": 1.0, "sugar": 1.5 },
        { "name": "Austernpilz", "kcal": 33, "protein": 2.5, "carbs": 6.7, "fat": 0.4, "fiber": 2.3, "sugar": 2.0 },
        { "name": "Bambussprossen", "kcal": 27, "protein": 2.6, "carbs": 5, "fat": 0.3, "fiber": 2.0, "sugar": 1.5 },
        { "name": "Wasserkastanien", "kcal": 74, "protein": 1.4, "carbs": 18, "fat": 0.1, "fiber": 3.0, "sugar": 4.0 },
        { "name": "Lotuswurzel", "kcal": 74, "protein": 2.6, "carbs": 17, "fat": 0.1, "fiber": 4.9, "sugar": 1.5 },
        { "name": "Frühlingszwiebel", "kcal": 32, "protein": 1.8, "carbs": 7, "fat": 0.3, "fiber": 2.6, "sugar": 2.3 },
        { "name": "Hoisin-Sauce", "kcal": 240, "protein": 3, "carbs": 50, "fat": 3, "fiber": 1, "sugar": 25, "unit": "ml" },
        { "name": "Austernsauce", "kcal": 100, "protein": 4, "carbs": 18, "fat": 0, "fiber": 0, "sugar": 10, "unit": "ml" },
        { "name": "Chilisauce (Süß-scharf)", "kcal": 90, "protein": 1, "carbs": 18, "fat": 1, "fiber": 0, "sugar": 15, "unit": "ml" },
        { "name": "Erdnussöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Schweinebauch", "kcal": 518, "protein": 9, "carbs": 0, "fat": 53, "fiber": 0, "sugar": 0 },
        { "name": "Garnelen", "kcal": 106, "protein": 20, "carbs": 1, "fat": 1.7, "fiber": 0, "sugar": 0 },
        { "name": "Ente (Brust)", "kcal": 337, "protein": 19, "carbs": 0, "fat": 28, "fiber": 0, "sugar": 0 },
        { "name": "Eier-Nudeln gekocht", "kcal": 138, "protein": 4.5, "carbs": 25, "fat": 2, "fiber": 0.8, "sugar": 0.2, "aliases": ["Eiernudeln"] },
        { "name": "Knoblauch", "kcal": 149, "protein": 6.4, "carbs": 33, "fat": 0.5, "fiber": 2.1, "sugar": 1.0 },
        { "name": "Sichuan-Pfeffer", "kcal": 250, "protein": 19, "carbs": 35, "fat": 9, "fiber": 22, "sugar": 0 },
        { "name": "Schwarzer Reisessig", "kcal": 20, "protein": 0, "carbs": 5, "fat": 0, "fiber": 0, "sugar": 5, "unit": "ml" },
        { "name": "Shao Xing Reiswein", "kcal": 120, "protein": 0, "carbs": 5, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Fermentierte schwarze Bohnen", "kcal": 120, "protein": 10, "carbs": 15, "fat": 2, "fiber": 5, "sugar": 2 },
        { "name": "Tofu (seide)", "kcal": 50, "protein": 5, "carbs": 2, "fat": 2, "fiber": 0.5, "sugar": 0.2 },
        { "name": "Szechuan-Öl (Chiliöl)", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" }
      ]
    },
    "italienisch": {
      "label": "Italienisch",
      "items": [
        { "name": "Pasta gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "fiber": 1.8, "sugar": 0.6, "aliases": ["Pasta"] },
        { "name": "Spaghetti gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "fiber": 1.8, "sugar": 0.6, "aliases": ["Spaghetti"] },
        { "name": "Penne gekocht", "kcal": 157, "protein": 5.8, "carbs": 31, "fat": 0.9, "fiber": 1.8, "sugar": 0.6, "aliases": ["Penne"] },
        { "name": "Risotto-Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4, "sugar": 0.1, "aliases": ["Risotto-Reis"] },
        { "name": "Arborio-Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4, "sugar": 0.1, "aliases": ["Arborio-Reis"] },
        { "name": "Parmesan", "kcal": 431, "protein": 38, "carbs": 4, "fat": 29, "fiber": 0, "sugar": 0 },
        { "name": "Mozzarella", "kcal": 280, "protein": 22, "carbs": 2, "fat": 22, "fiber": 0, "sugar": 0.5 },
        { "name": "Burrata", "kcal": 330, "protein": 17, "carbs": 4, "fat": 28, "fiber": 0, "sugar": 0.5 },
        { "name": "Ricotta", "kcal": 174, "protein": 11, "carbs": 3, "fat": 13, "fiber": 0, "sugar": 1.0 },
        { "name": "Pecorino", "kcal": 387, "protein": 32, "carbs": 4, "fat": 27, "fiber": 0, "sugar": 0 },
        { "name": "Gorgonzola", "kcal": 353, "protein": 21, "carbs": 2, "fat": 29, "fiber": 0, "sugar": 0.5 },
        { "name": "Prosciutto", "kcal": 250, "protein": 28, "carbs": 0, "fat": 15, "fiber": 0, "sugar": 0 },
        { "name": "Salami (Italian)", "kcal": 407, "protein": 22, "carbs": 2, "fat": 36, "fiber": 0, "sugar": 0.5 },
        { "name": "Pancetta", "kcal": 458, "protein": 14, "carbs": 1, "fat": 45, "fiber": 0, "sugar": 0 },
        { "name": "Tomaten (passiert)", "kcal": 32, "protein": 1.6, "carbs": 6, "fat": 0.2, "fiber": 1.5, "sugar": 4, "aliases": ["Passierte Tomaten", "Tomaten"] },
        { "name": "Tomaten (stückig)", "kcal": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "fiber": 1.2, "sugar": 2.6, "aliases": ["Stückige Tomaten"] },
        { "name": "Pesto Genovese", "kcal": 520, "protein": 5, "carbs": 4, "fat": 53, "fiber": 1.5, "sugar": 0.5, "aliases": ["Pesto"] },
        { "name": "Basilikum", "kcal": 23, "protein": 0.3, "carbs": 2.7, "fat": 0.6, "fiber": 1.5, "sugar": 0.3 },
        { "name": "Rucola", "kcal": 25, "protein": 2.6, "carbs": 2, "fat": 0.7, "fiber": 1.6, "sugar": 0.2 },
        { "name": "Zucchini", "kcal": 17, "protein": 1.2, "carbs": 3, "fat": 0.3, "fiber": 1.0, "sugar": 2.5 },
        { "name": "Aubergine", "kcal": 25, "protein": 1, "carbs": 6, "fat": 0.2, "fiber": 3.0, "sugar": 3.5 },
        { "name": "Kapern", "kcal": 23, "protein": 2.2, "carbs": 5, "fat": 0.9, "fiber": 3.0, "sugar": 0.5 },
        { "name": "Pinienkerne", "kcal": 673, "protein": 14, "carbs": 13, "fat": 68, "fiber": 3.7, "sugar": 3.6 },
        { "name": "Polenta gekocht", "kcal": 85, "protein": 2, "carbs": 18, "fat": 0.4, "fiber": 1.5, "sugar": 0.5, "aliases": ["Polenta"] },
        { "name": "Ciabatta", "kcal": 271, "protein": 9, "carbs": 54, "fat": 3, "fiber": 2.5, "sugar": 2.0 },
        { "name": "Focaccia", "kcal": 270, "protein": 8, "carbs": 42, "fat": 8, "fiber": 1.5, "sugar": 2.0 },
        { "name": "Balsamico (Aceto Balsamico)", "kcal": 88, "protein": 0, "carbs": 15, "fat": 0, "fiber": 0, "sugar": 15, "unit": "ml" },
        { "name": "Meersalz", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0 },
        { "name": "Artischocken (frisch)", "kcal": 47, "protein": 3.3, "carbs": 10, "fat": 0.2, "fiber": 5.4, "sugar": 1.0 },
        { "name": "Trüffelöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Bottarga (getrockneter Rogen)", "kcal": 350, "protein": 30, "carbs": 0, "fat": 25, "fiber": 0, "sugar": 0 },
        { "name": "Nduja (scharfe Wurst)", "kcal": 420, "protein": 18, "carbs": 2, "fat": 38, "fiber": 0, "sugar": 0.5 },
        { "name": "Taleggio (Käse)", "kcal": 340, "protein": 20, "carbs": 1, "fat": 28, "fiber": 0, "sugar": 0.2 },
        { "name": "Asiago (Käse)", "kcal": 390, "protein": 28, "carbs": 2, "fat": 30, "fiber": 0, "sugar": 0.2 }
      ]
    },
    "obst_erweitert": {
      "label": "Obst (Beeren, Steinobst, Exoten)",
      "items": [
        { "name": "Erdbeere", "kcal": 32, "protein": 0.7, "carbs": 7.7, "fat": 0.3, "fiber": 2.0, "sugar": 4.9 },
        { "name": "Heidelbeere (Blaubeere)", "kcal": 57, "protein": 0.7, "carbs": 14, "fat": 0.3, "fiber": 2.4, "sugar": 10 },
        { "name": "Himbeere", "kcal": 52, "protein": 1.2, "carbs": 12, "fat": 0.7, "fiber": 6.5, "sugar": 4.4 },
        { "name": "Pfirsich", "kcal": 39, "protein": 0.9, "carbs": 9.5, "fat": 0.3, "fiber": 1.5, "sugar": 8.4 },
        { "name": "Pflaume", "kcal": 46, "protein": 0.7, "carbs": 11, "fat": 0.3, "fiber": 1.4, "sugar": 10 },
        { "name": "Kirsche (Süßkirsche)", "kcal": 63, "protein": 1.1, "carbs": 16, "fat": 0.2, "fiber": 2.1, "sugar": 13 },
        { "name": "Mango", "kcal": 60, "protein": 0.8, "carbs": 15, "fat": 0.4, "fiber": 1.6, "sugar": 14 },
        { "name": "Ananas", "kcal": 50, "protein": 0.5, "carbs": 13, "fat": 0.1, "fiber": 1.4, "sugar": 10 },
        { "name": "Papaya", "kcal": 43, "protein": 0.5, "carbs": 11, "fat": 0.3, "fiber": 1.7, "sugar": 8.0 },
        { "name": "Avocado", "kcal": 160, "protein": 2, "carbs": 9, "fat": 15, "fiber": 6.7, "sugar": 0.7 },
        { "name": "Kiwi", "kcal": 61, "protein": 1.1, "carbs": 15, "fat": 0.5, "fiber": 3.0, "sugar": 9.0 },
        { "name": "Granatapfel", "kcal": 83, "protein": 1.7, "carbs": 19, "fat": 1.2, "fiber": 4.0, "sugar": 14 }
      ]
    },
    "kraeuter": {
      "label": "Kräuter frisch",
      "items": [
        { "name": "Petersilie", "kcal": 36, "protein": 3.0, "carbs": 6.0, "fat": 0.8, "fiber": 3.3, "sugar": 0.9 },
        { "name": "Schnittlauch", "kcal": 30, "protein": 3.3, "carbs": 4.3, "fat": 0.7, "fiber": 2.5, "sugar": 1.9 },
        { "name": "Thymian", "kcal": 101, "protein": 5.6, "carbs": 24, "fat": 1.7, "fiber": 14, "sugar": 0.4 },
        { "name": "Rosmarin", "kcal": 131, "protein": 3.3, "carbs": 20, "fat": 5.9, "fiber": 14, "sugar": 0.5 },
        { "name": "Minze", "kcal": 44, "protein": 3.3, "carbs": 8.4, "fat": 0.7, "fiber": 6.8, "sugar": 2.0 },
        { "name": "Koriander (frisch)", "kcal": 23, "protein": 2.1, "carbs": 3.7, "fat": 0.5, "fiber": 2.8, "sugar": 0.9 },
        { "name": "Oregano", "kcal": 265, "protein": 9, "carbs": 69, "fat": 4.3, "fiber": 43, "sugar": 4.1 },
        { "name": "Salbei", "kcal": 49, "protein": 2.7, "carbs": 9.0, "fat": 1.5, "fiber": 4.5, "sugar": 1.7 },
        { "name": "Dill", "kcal": 43, "protein": 3.5, "carbs": 7.0, "fat": 1.1, "fiber": 2.1, "sugar": 0.8 },
        { "name": "Estragon", "kcal": 67, "protein": 2.7, "carbs": 13, "fat": 1.2, "fiber": 7.4, "sugar": 1.5 }
      ]
    },
    "gewürze": {
      "label": "Gewürze / Trockengewürze",
      "items": [
        { "name": "Paprikapulver (edelsüß)", "kcal": 282, "protein": 14, "carbs": 50, "fat": 13, "fiber": 34, "sugar": 10 },
        { "name": "Kurkuma (gemahlen)", "kcal": 354, "protein": 7.8, "carbs": 65, "fat": 10, "fiber": 21, "sugar": 0.5 },
        { "name": "Kreuzkümmel (gemahlen)", "kcal": 375, "protein": 17, "carbs": 44, "fat": 22, "fiber": 10, "sugar": 2.3 },
        { "name": "Zimt (gemahlen)", "kcal": 247, "protein": 4.0, "carbs": 50, "fat": 1.2, "fiber": 53, "sugar": 2.2 },
        { "name": "Muskatnuss (gemahlen)", "kcal": 525, "protein": 5.8, "carbs": 50, "fat": 36, "fiber": 20, "sugar": 0.5 },
        { "name": "Currypulver", "kcal": 325, "protein": 12, "carbs": 50, "fat": 13, "fiber": 18, "sugar": 2.5 },
        { "name": "Chilipulver (Cayennepfeffer)", "kcal": 318, "protein": 12, "carbs": 56, "fat": 17, "fiber": 27, "sugar": 10 },
        { "name": "Lorbeerblätter", "kcal": 313, "protein": 7.6, "carbs": 48, "fat": 8.4, "fiber": 26, "sugar": 0.5 },
        { "name": "Kardamom (gemahlen)", "kcal": 311, "protein": 11, "carbs": 68, "fat": 6.7, "fiber": 28, "sugar": 0.5 },
        { "name": "Korianderpulver", "kcal": 279, "protein": 12, "carbs": 55, "fat": 12, "fiber": 42, "sugar": 0.5 },
        { "name": "Pfeffer (schwarz, gemahlen)", "kcal": 251, "protein": 10, "carbs": 65, "fat": 3.3, "fiber": 26, "sugar": 0.5 }
      ]
    },
    "nuesse_samen": {
      "label": "Nüsse & Samen einzeln",
      "items": [
        { "name": "Mandeln (ganz)", "kcal": 579, "protein": 21, "carbs": 22, "fat": 50, "fiber": 12, "sugar": 4.4 },
        { "name": "Walnüsse", "kcal": 654, "protein": 15, "carbs": 14, "fat": 65, "fiber": 6.7, "sugar": 2.6 },
        { "name": "Cashews", "kcal": 553, "protein": 18, "carbs": 30, "fat": 44, "fiber": 3.3, "sugar": 5.9 },
        { "name": "Erdnüsse", "kcal": 567, "protein": 26, "carbs": 16, "fat": 49, "fiber": 8.5, "sugar": 4.7 },
        { "name": "Chia-Samen", "kcal": 486, "protein": 17, "carbs": 42, "fat": 31, "fiber": 34, "sugar": 0.5 },
        { "name": "Leinsamen (geschrotet)", "kcal": 534, "protein": 18, "carbs": 29, "fat": 42, "fiber": 27, "sugar": 1.6 },
        { "name": "Kürbiskerne", "kcal": 559, "protein": 30, "carbs": 11, "fat": 49, "fiber": 6.0, "sugar": 0.5 },
        { "name": "Sonnenblumenkerne", "kcal": 584, "protein": 21, "carbs": 20, "fat": 51, "fiber": 8.6, "sugar": 2.6 }
      ]
    },
    "hülsenfrüchte_gekocht": {
      "label": "Hülsenfrüchte (gekocht)",
      "items": [
        { "name": "Linsen gekocht", "kcal": 116, "protein": 9, "carbs": 20, "fat": 0.4, "fiber": 7.9, "sugar": 1.8 },
        { "name": "Kichererbsen gekocht", "kcal": 139, "protein": 8.9, "carbs": 27, "fat": 2.6, "fiber": 7.6, "sugar": 4.8 },
        { "name": "Kidneybohnen gekocht", "kcal": 127, "protein": 8.7, "carbs": 23, "fat": 0.5, "fiber": 7.4, "sugar": 0.3 },
        { "name": "Schwarze Bohnen gekocht", "kcal": 132, "protein": 8.9, "carbs": 24, "fat": 0.5, "fiber": 8.7, "sugar": 0.3 }
      ]
    },
    "milchprodukte_erweitert": {
      "label": "Milchprodukte erweitert",
      "items": [
        { "name": "Quark (Magerstufe)", "kcal": 67, "protein": 13, "carbs": 4, "fat": 0.3, "fiber": 0, "sugar": 4 },
        { "name": "Frischkäse (Doppelrahmstufe)", "kcal": 290, "protein": 6, "carbs": 3, "fat": 28, "fiber": 0, "sugar": 3 },
        { "name": "Crème fraîche (30%)", "kcal": 315, "protein": 2.5, "carbs": 3, "fat": 30, "fiber": 0, "sugar": 3, "unit": "ml" },
        { "name": "Skyr (natur)", "kcal": 61, "protein": 10, "carbs": 3.6, "fat": 0.2, "fiber": 0, "sugar": 3.6 },
        { "name": "Kefir (3,5%)", "kcal": 66, "protein": 3.2, "carbs": 4, "fat": 3.6, "fiber": 0, "sugar": 4, "unit": "ml" },
        { "name": "Feta (Schafskäse)", "kcal": 264, "protein": 14, "carbs": 1.2, "fat": 21, "fiber": 0, "sugar": 0.5 },
        { "name": "Brie (Käse)", "kcal": 334, "protein": 21, "carbs": 0.5, "fat": 28, "fiber": 0, "sugar": 0.5 },
        { "name": "Emmentaler", "kcal": 380, "protein": 28, "carbs": 1.3, "fat": 29, "fiber": 0, "sugar": 0.5 }
      ]
    },
    "getreide_pseudogetreide": {
      "label": "Getreide & Pseudogetreide",
      "items": [
        { "name": "Quinoa roh", "kcal": 368, "protein": 14, "carbs": 64, "fat": 6.1, "fiber": 7.0, "sugar": 1.5 },
        { "name": "Quinoa gekocht", "kcal": 120, "protein": 4.4, "carbs": 21, "fat": 2.0, "fiber": 2.5, "sugar": 0.5 },
        { "name": "Couscous roh", "kcal": 376, "protein": 12, "carbs": 77, "fat": 0.6, "fiber": 5.0, "sugar": 0.5 },
        { "name": "Couscous gekocht", "kcal": 112, "protein": 3.8, "carbs": 23, "fat": 0.2, "fiber": 1.5, "sugar": 0.2 },
        { "name": "Bulgur roh", "kcal": 342, "protein": 12, "carbs": 76, "fat": 1.3, "fiber": 18, "sugar": 0.5 },
        { "name": "Bulgur gekocht", "kcal": 83, "protein": 3.1, "carbs": 18, "fat": 0.2, "fiber": 4.5, "sugar": 0.2 },
        { "name": "Buchweizen roh", "kcal": 343, "protein": 13, "carbs": 71, "fat": 3.4, "fiber": 10, "sugar": 0.5 },
        { "name": "Buchweizen gekocht", "kcal": 92, "protein": 3.4, "carbs": 19, "fat": 0.6, "fiber": 2.7, "sugar": 0.2 },
        { "name": "Dinkel (ganz, roh)", "kcal": 338, "protein": 14, "carbs": 70, "fat": 2.4, "fiber": 10, "sugar": 0.5 },
        { "name": "Dinkel gekocht", "kcal": 90, "protein": 3.8, "carbs": 18, "fat": 0.6, "fiber": 2.5, "sugar": 0.2 },
        { "name": "Amaranth roh", "kcal": 371, "protein": 14, "carbs": 65, "fat": 7.0, "fiber": 7.0, "sugar": 1.5 },
        { "name": "Amaranth gekocht", "kcal": 102, "protein": 3.8, "carbs": 18, "fat": 1.9, "fiber": 2.0, "sugar": 0.3 }
      ]
    },
    "fleisch_fisch_erweitert": {
      "label": "Fleisch & Fisch erweitert",
      "items": [
        { "name": "Truthahn (Brust)", "kcal": 135, "protein": 30, "carbs": 0, "fat": 1.5, "fiber": 0, "sugar": 0 },
        { "name": "Lamm (Keule)", "kcal": 235, "protein": 24, "carbs": 0, "fat": 16, "fiber": 0, "sugar": 0 },
        { "name": "Speck (geräuchert)", "kcal": 393, "protein": 12, "carbs": 1.5, "fat": 38, "fiber": 0, "sugar": 0.5 },
        { "name": "Kabeljau", "kcal": 82, "protein": 18, "carbs": 0, "fat": 0.7, "fiber": 0, "sugar": 0 },
        { "name": "Forelle (ganz)", "kcal": 141, "protein": 20, "carbs": 0, "fat": 6.0, "fiber": 0, "sugar": 0 },
        { "name": "Makrele", "kcal": 205, "protein": 20, "carbs": 0, "fat": 14, "fiber": 0, "sugar": 0 },
        { "name": "Sardinen (in Öl)", "kcal": 208, "protein": 24, "carbs": 0, "fat": 12, "fiber": 0, "sugar": 0 },
        { "name": "Hering", "kcal": 158, "protein": 17, "carbs": 0, "fat": 9.5, "fiber": 0, "sugar": 0 }
      ]
    },
    "oele_fette": {
      "label": "Öle & Fette",
      "items": [
        { "name": "Kokosöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Rapsöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Sonnenblumenöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Ghee (Butterschmalz)", "kcal": 900, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Margarine (Pflanzenfett)", "kcal": 720, "protein": 0, "carbs": 1, "fat": 80, "fiber": 0, "sugar": 0 }
      ]
    },
    "getraenke": {
      "label": "Getränke",
      "items": [
        { "name": "Kaffee (Filterkaffee)", "kcal": 2, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Tee (schwarz)", "kcal": 1, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Tee (grün)", "kcal": 1, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Orangensaft", "kcal": 45, "protein": 0.7, "carbs": 10, "fat": 0.2, "fiber": 0.2, "sugar": 9.0, "unit": "ml" },
        { "name": "Apfelsaft", "kcal": 46, "protein": 0.1, "carbs": 11, "fat": 0.1, "fiber": 0.2, "sugar": 10, "unit": "ml" },
        { "name": "Milch (1,5%)", "kcal": 47, "protein": 3.3, "carbs": 4.8, "fat": 1.5, "fiber": 0, "sugar": 4.8, "unit": "ml" },
        { "name": "Hafermilch", "kcal": 46, "protein": 1.0, "carbs": 6.5, "fat": 1.8, "fiber": 0.8, "sugar": 4.0, "unit": "ml" },
        { "name": "Mandelmilch", "kcal": 15, "protein": 0.6, "carbs": 0.5, "fat": 1.2, "fiber": 0.3, "sugar": 0.3, "unit": "ml" }
      ]
    },
    "indisch": {
      "label": "Indisch",
      "items": [
        { "name": "Basmati-Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "fiber": 0.4, "sugar": 0.1, "aliases": ["Basmati"] },
        { "name": "Garam Masala", "kcal": 320, "protein": 11, "carbs": 40, "fat": 15, "fiber": 20, "sugar": 2.0 },
        { "name": "Curryblätter (frisch)", "kcal": 60, "protein": 3.5, "carbs": 10, "fat": 1.2, "fiber": 4.0, "sugar": 1.0 },
        { "name": "Asafoetida (Hing)", "kcal": 230, "protein": 4.0, "carbs": 50, "fat": 1.5, "fiber": 10, "sugar": 0.5 },
        { "name": "Ghee", "kcal": 900, "protein": 0, "carbs": 0, "fat": 100, "fiber": 0, "sugar": 0, "unit": "ml" },
        { "name": "Tamarinde (Mark)", "kcal": 239, "protein": 2.8, "carbs": 62, "fat": 0.6, "fiber": 5.1, "sugar": 38 },
        { "name": "Mango-Lassi", "kcal": 90, "protein": 3.0, "carbs": 15, "fat": 2.0, "fiber": 0.5, "sugar": 12, "unit": "ml" }
      ]
    },
    "mexikanisch": {
      "label": "Mexikanisch",
      "items": [
        { "name": "Tortilla (Weizen)", "kcal": 300, "protein": 8, "carbs": 48, "fat": 7, "fiber": 4.0, "sugar": 2.0 },
        { "name": "Avocado", "kcal": 160, "protein": 2, "carbs": 9, "fat": 15, "fiber": 6.7, "sugar": 0.7 },
        { "name": "Jalapeño (frisch)", "kcal": 29, "protein": 1.0, "carbs": 6.5, "fat": 0.4, "fiber": 2.8, "sugar": 4.0 },
        { "name": "Chili (getrocknet, z.B. Chipotle)", "kcal": 280, "protein": 12, "carbs": 50, "fat": 14, "fiber": 20, "sugar": 5.0 },
        { "name": "Limette (Saft)", "kcal": 30, "protein": 0.4, "carbs": 8.4, "fat": 0.1, "fiber": 0.2, "sugar": 2.0, "unit": "ml" },
        { "name": "Koriander (frisch)", "kcal": 23, "protein": 2.1, "carbs": 3.7, "fat": 0.5, "fiber": 2.8, "sugar": 0.9 },
        { "name": "Pinto-Bohnen gekocht", "kcal": 143, "protein": 9.0, "carbs": 26, "fat": 0.6, "fiber": 9.0, "sugar": 0.4 }
      ]
    },
    "nahoestlich": {
      "label": "Nahöstlich",
      "items": [
        { "name": "Tahini (Sesampaste)", "kcal": 609, "protein": 20, "carbs": 18, "fat": 54, "fiber": 9.0, "sugar": 0.5 },
        { "name": "Harissa (Chilipaste)", "kcal": 80, "protein": 2.0, "carbs": 10, "fat": 4.0, "fiber": 2.0, "sugar": 2.0 },
        { "name": "Za'atar (Gewürzmischung)", "kcal": 250, "protein": 8.0, "carbs": 40, "fat": 10, "fiber": 15, "sugar": 1.0 },
        { "name": "Sumach (Gewürz)", "kcal": 250, "protein": 5.0, "carbs": 50, "fat": 2.0, "fiber": 20, "sugar": 5.0 },
        { "name": "Granatapfelsirup", "kcal": 180, "protein": 0.5, "carbs": 44, "fat": 0, "fiber": 0, "sugar": 40, "unit": "ml" },
        { "name": "Halloumi (Käse)", "kcal": 321, "protein": 22, "carbs": 2.0, "fat": 25, "fiber": 0, "sugar": 0.5 },
        { "name": "Falafel (Kichererbsenbällchen)", "kcal": 333, "protein": 13, "carbs": 32, "fat": 17, "fiber": 8.0, "sugar": 2.0 }
      ]
    }
  }
};