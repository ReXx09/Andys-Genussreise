/*
  Lokale Nährwerttabelle für das digitale Kochbuch.

  Alle Werte sind Durchschnittswerte pro 100 g oder 100 ml.
  Die Datei wird direkt von "kochbuch-dashboard.html" geladen.

  Neue Zutaten einfach in die passende items-Liste eintragen:

  {
    "name": "Beispiel Zutat",
    "kcal": 123,
    "protein": 4.5,
    "carbs": 20,
    "fat": 6,
    "aliases": ["beispiel", "beispiel zutat"]
  },

  Hinweis:
  - name: sichtbarer Hauptname
  - aliases: optionale Suchbegriffe/Synonyme
  - kcal: Kilokalorien pro 100 g/ml
  - protein: Eiweiß in g pro 100 g/ml
  - carbs: Kohlenhydrate in g pro 100 g/ml
  - fat: Fett in g pro 100 g/ml
*/

window.NUTRIENT_DATA = {
  "version": 1,
  "unit": "pro 100 g/ml",
  "note": "Durchschnittswerte. Für exakte Produktwerte bitte Verpackung oder eine Produktdatenbank nutzen.",
  "categories": {
    "deutsch": {
      "label": "Deutsch / Grundzutaten",
      "items": [
        { "name": "Apfel", "kcal": 52, "protein": 0.3, "carbs": 14, "fat": 0.2 },
        { "name": "Banane", "kcal": 89, "protein": 1.1, "carbs": 23, "fat": 0.3 },
        { "name": "Orange", "kcal": 47, "protein": 0.9, "carbs": 12, "fat": 0.1 },
        { "name": "Kartoffel", "kcal": 77, "protein": 2, "carbs": 17, "fat": 0.1 },
        { "name": "Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "aliases": ["Reis"] },
        { "name": "Nudeln gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "aliases": ["Nudeln"] },
        { "name": "Haferflocken", "kcal": 389, "protein": 16.9, "carbs": 66, "fat": 6.9 },
        { "name": "Brot", "kcal": 250, "protein": 9, "carbs": 49, "fat": 3.2 },
        { "name": "Hähnchenbrust", "kcal": 165, "protein": 31, "carbs": 0, "fat": 3.6 },
        { "name": "Rindfleisch", "kcal": 250, "protein": 26, "carbs": 0, "fat": 15 },
        { "name": "Schweinefleisch", "kcal": 242, "protein": 27, "carbs": 0, "fat": 14 },
        { "name": "Lachs", "kcal": 208, "protein": 20, "carbs": 0, "fat": 13 },
        { "name": "Thunfisch", "kcal": 144, "protein": 23, "carbs": 0, "fat": 5 },
        { "name": "Ei", "kcal": 155, "protein": 13, "carbs": 1.1, "fat": 11 },
        { "name": "Milch", "kcal": 42, "protein": 3.4, "carbs": 5, "fat": 1 },
        { "name": "Joghurt natur", "kcal": 59, "protein": 10, "carbs": 3.6, "fat": 0.4, "aliases": ["Joghurt"] },
        { "name": "Käse Gouda", "kcal": 356, "protein": 25, "carbs": 2.2, "fat": 27, "aliases": ["Käse", "Gouda"] },
        { "name": "Butter", "kcal": 717, "protein": 0.9, "carbs": 0.1, "fat": 81 },
        { "name": "Olivenöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100, "aliases": ["Öl"] },
        { "name": "Zucker", "kcal": 387, "protein": 0, "carbs": 100, "fat": 0 },
        { "name": "Mehl", "kcal": 364, "protein": 10, "carbs": 76, "fat": 1 },
        { "name": "Tomate", "kcal": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2 },
        { "name": "Gurke", "kcal": 15, "protein": 0.7, "carbs": 3.6, "fat": 0.1 },
        { "name": "Karotte", "kcal": 41, "protein": 0.9, "carbs": 10, "fat": 0.2 },
        { "name": "Zwiebel", "kcal": 40, "protein": 1.1, "carbs": 9.3, "fat": 0.1 },
        { "name": "Paprika", "kcal": 31, "protein": 1, "carbs": 6, "fat": 0.3 },
        { "name": "Brokkoli", "kcal": 34, "protein": 2.8, "carbs": 7, "fat": 0.4 },
        { "name": "Spinat", "kcal": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4 },
        { "name": "Bohnen", "kcal": 347, "protein": 21, "carbs": 60, "fat": 1.2 },
        { "name": "Linsen trocken", "kcal": 352, "protein": 25, "carbs": 60, "fat": 1.1, "aliases": ["Linsen"] },
        { "name": "Kichererbsen", "kcal": 364, "protein": 19, "carbs": 61, "fat": 6 },
        { "name": "Nüsse gemischt", "kcal": 607, "protein": 20, "carbs": 22, "fat": 54, "aliases": ["Nüsse"] },
        { "name": "Schokolade", "kcal": 546, "protein": 5, "carbs": 60, "fat": 31 },
        { "name": "Honig", "kcal": 304, "protein": 0.3, "carbs": 82, "fat": 0 },
        { "name": "Sahne", "kcal": 340, "protein": 2, "carbs": 3, "fat": 36 },
        { "name": "Wasser", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0 },
        { "name": "Salz", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0 },
        { "name": "Gewürze", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0 }
      ]
    },
    "japanisch": {
      "label": "Japanisch",
      "items": [
        { "name": "Miso", "kcal": 199, "protein": 12, "carbs": 26, "fat": 6 },
        { "name": "Nori", "kcal": 35, "protein": 5.8, "carbs": 5, "fat": 0.6 },
        { "name": "Wakame", "kcal": 45, "protein": 3, "carbs": 9, "fat": 0.6 },
        { "name": "Kombu", "kcal": 43, "protein": 8, "carbs": 9, "fat": 0.6 },
        { "name": "Dashi Instant", "kcal": 15, "protein": 1, "carbs": 3, "fat": 0, "aliases": ["Dashi"] },
        { "name": "Tofu fest", "kcal": 144, "protein": 17, "carbs": 3, "fat": 9, "aliases": ["Tofu"] },
        { "name": "Edamame", "kcal": 121, "protein": 11, "carbs": 9, "fat": 5 },
        { "name": "Sojasauce", "kcal": 53, "protein": 8, "carbs": 5, "fat": 0 },
        { "name": "Mirin", "kcal": 110, "protein": 0, "carbs": 27, "fat": 0 },
        { "name": "Sake", "kcal": 103, "protein": 0, "carbs": 2, "fat": 0 },
        { "name": "Reisessig", "kcal": 18, "protein": 0, "carbs": 0, "fat": 0 },
        { "name": "Sushi-Reis gekocht", "kcal": 150, "protein": 2.7, "carbs": 32, "fat": 0.3, "aliases": ["Sushi-Reis"] },
        { "name": "Udon gekocht", "kcal": 105, "protein": 4.5, "carbs": 21, "fat": 0.5, "aliases": ["Udon"] },
        { "name": "Soba gekocht", "kcal": 99, "protein": 5, "carbs": 21, "fat": 0.1, "aliases": ["Soba"] },
        { "name": "Ramen-Nudeln gekocht", "kcal": 137, "protein": 5, "carbs": 26, "fat": 2, "aliases": ["Ramen"] },
        { "name": "Shiitake frisch", "kcal": 34, "protein": 2.2, "carbs": 7, "fat": 0.5, "aliases": ["Shiitake"] },
        { "name": "Enoki", "kcal": 37, "protein": 2.7, "carbs": 7, "fat": 0.3 },
        { "name": "Daikon", "kcal": 18, "protein": 0.6, "carbs": 4, "fat": 0.1 },
        { "name": "Ingwer", "kcal": 80, "protein": 1.8, "carbs": 18, "fat": 0.8 },
        { "name": "Wasabi Paste", "kcal": 109, "protein": 6, "carbs": 19, "fat": 1, "aliases": ["Wasabi"] },
        { "name": "Sesamöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100 },
        { "name": "Sesam", "kcal": 573, "protein": 18, "carbs": 23, "fat": 50 },
        { "name": "Panko", "kcal": 395, "protein": 9, "carbs": 78, "fat": 4 },
        { "name": "Tempura-Teig", "kcal": 280, "protein": 5, "carbs": 42, "fat": 10 },
        { "name": "Yakisoba-Nudeln gekocht", "kcal": 160, "protein": 5, "carbs": 30, "fat": 3, "aliases": ["Yakisoba"] },
        { "name": "Mochi", "kcal": 235, "protein": 4, "carbs": 52, "fat": 0.2 },
        { "name": "Anko", "kcal": 242, "protein": 6, "carbs": 56, "fat": 0.1 },
        { "name": "Matcha", "kcal": 276, "protein": 30, "carbs": 39, "fat": 6 },
        { "name": "Sojamilch", "kcal": 33, "protein": 2.8, "carbs": 1.6, "fat": 1.6 }
      ]
    },
    "chinesisch": {
      "label": "Chinesisch",
      "items": [
        { "name": "Chinesische Sojasauce", "kcal": 53, "protein": 8, "carbs": 5, "fat": 0, "aliases": ["Sojasauce"] },
        { "name": "Jasminreis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "aliases": ["Jasminreis"] },
        { "name": "Mie-Nudeln gekocht", "kcal": 150, "protein": 5, "carbs": 30, "fat": 2, "aliases": ["Mie-Nudeln", "Mienudeln"] },
        { "name": "Glasnudeln gekocht", "kcal": 110, "protein": 0.1, "carbs": 26, "fat": 0.1, "aliases": ["Glasnudeln"] },
        { "name": "Wonton-Nudeln gekocht", "kcal": 138, "protein": 5, "carbs": 27, "fat": 2, "aliases": ["Wonton-Nudeln", "Wonton"] },
        { "name": "Pak Choi", "kcal": 13, "protein": 1.5, "carbs": 2.2, "fat": 0.2 },
        { "name": "Chinakohl", "kcal": 16, "protein": 1.5, "carbs": 3, "fat": 0.2 },
        { "name": "Sojasprossen", "kcal": 30, "protein": 3.2, "carbs": 3.5, "fat": 0.2 },
        { "name": "Austernpilz", "kcal": 33, "protein": 2.5, "carbs": 6.7, "fat": 0.4 },
        { "name": "Bambussprossen", "kcal": 27, "protein": 2.6, "carbs": 5, "fat": 0.3 },
        { "name": "Wasserkastanien", "kcal": 74, "protein": 1.4, "carbs": 18, "fat": 0.1 },
        { "name": "Lotuswurzel", "kcal": 74, "protein": 2.6, "carbs": 17, "fat": 0.1 },
        { "name": "Frühlingszwiebel", "kcal": 32, "protein": 1.8, "carbs": 7, "fat": 0.3 },
        { "name": "Hoisin-Sauce", "kcal": 240, "protein": 3, "carbs": 50, "fat": 3 },
        { "name": "Austernsauce", "kcal": 100, "protein": 4, "carbs": 18, "fat": 0 },
        { "name": "Chilisauce", "kcal": 90, "protein": 1, "carbs": 18, "fat": 1 },
        { "name": "Erdnussöl", "kcal": 884, "protein": 0, "carbs": 0, "fat": 100 },
        { "name": "Schweinebauch", "kcal": 518, "protein": 9, "carbs": 0, "fat": 53 },
        { "name": "Garnelen", "kcal": 106, "protein": 20, "carbs": 1, "fat": 1.7 },
        { "name": "Ente", "kcal": 337, "protein": 19, "carbs": 0, "fat": 28 },
        { "name": "Eier-Nudeln gekocht", "kcal": 138, "protein": 4.5, "carbs": 25, "fat": 2, "aliases": ["Eiernudeln"] },
        { "name": "Knoblauch", "kcal": 149, "protein": 6.4, "carbs": 33, "fat": 0.5 },
        { "name": "Sichuan-Pfeffer", "kcal": 250, "protein": 19, "carbs": 35, "fat": 9 }
      ]
    },
    "italienisch": {
      "label": "Italienisch",
      "items": [
        { "name": "Pasta gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "aliases": ["Pasta"] },
        { "name": "Spaghetti gekocht", "kcal": 158, "protein": 5.8, "carbs": 31, "fat": 0.9, "aliases": ["Spaghetti"] },
        { "name": "Penne gekocht", "kcal": 157, "protein": 5.8, "carbs": 31, "fat": 0.9, "aliases": ["Penne"] },
        { "name": "Risotto-Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "aliases": ["Risotto-Reis"] },
        { "name": "Arborio-Reis gekocht", "kcal": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "aliases": ["Arborio-Reis"] },
        { "name": "Parmesan", "kcal": 431, "protein": 38, "carbs": 4, "fat": 29 },
        { "name": "Mozzarella", "kcal": 280, "protein": 22, "carbs": 2, "fat": 22 },
        { "name": "Burrata", "kcal": 330, "protein": 17, "carbs": 4, "fat": 28 },
        { "name": "Ricotta", "kcal": 174, "protein": 11, "carbs": 3, "fat": 13 },
        { "name": "Pecorino", "kcal": 387, "protein": 32, "carbs": 4, "fat": 27 },
        { "name": "Gorgonzola", "kcal": 353, "protein": 21, "carbs": 2, "fat": 29 },
        { "name": "Prosciutto", "kcal": 250, "protein": 28, "carbs": 0, "fat": 15 },
        { "name": "Salami", "kcal": 407, "protein": 22, "carbs": 2, "fat": 36 },
        { "name": "Pancetta", "kcal": 458, "protein": 14, "carbs": 1, "fat": 45 },
        { "name": "Tomaten passierte", "kcal": 32, "protein": 1.6, "carbs": 6, "fat": 0.2, "aliases": ["Passierte Tomaten", "Tomaten"] },
        { "name": "Tomaten stückig", "kcal": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "aliases": ["Stückige Tomaten"] },
        { "name": "Pesto Genovese", "kcal": 520, "protein": 5, "carbs": 4, "fat": 53, "aliases": ["Pesto"] },
        { "name": "Basilikum", "kcal": 23, "protein": 0.3, "carbs": 2.7, "fat": 0.6 },
        { "name": "Rucola", "kcal": 25, "protein": 2.6, "carbs": 2, "fat": 0.7 },
        { "name": "Zucchini", "kcal": 17, "protein": 1.2, "carbs": 3, "fat": 0.3 },
        { "name": "Aubergine", "kcal": 25, "protein": 1, "carbs": 6, "fat": 0.2 },
        { "name": "Kapern", "kcal": 23, "protein": 2.2, "carbs": 5, "fat": 0.9 },
        { "name": "Pinienkerne", "kcal": 673, "protein": 14, "carbs": 13, "fat": 68 },
        { "name": "Polenta gekocht", "kcal": 85, "protein": 2, "carbs": 18, "fat": 0.4, "aliases": ["Polenta"] },
        { "name": "Ciabatta", "kcal": 271, "protein": 9, "carbs": 54, "fat": 3 },
        { "name": "Focaccia", "kcal": 270, "protein": 8, "carbs": 42, "fat": 8 },
        { "name": "Balsamico", "kcal": 88, "protein": 0, "carbs": 15, "fat": 0 },
        { "name": "Meersalz", "kcal": 0, "protein": 0, "carbs": 0, "fat": 0 }
      ]
    }
  }
};
