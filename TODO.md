# Andys Kochbuch - Aufgabenliste

## Bereits erledigt

- [x] Transaktionale Rezept-Synchronisierung und robuste Payload-Pruefung
- [x] Appdata-Bind-Mount fuer die SQLite-Datenbank auf Unraid
- [x] Unraid-WebUI-Label und Docker-Deployment-Konfiguration
- [x] Browser-Favicon und Docker-Icon als PNG/SVG
- [x] URL-Rezeptimport mit JSON-LD-Vorschau
- [x] Importpruefung fuer fehlende Felder und lokale Ordnerauswahl
- [x] Fortschrittsanzeige beim URL-Import
- [x] Mengen- und Einheitenparser fuer importierte Zutaten
- [x] Direkte Gegenueberstellung von importiertem Rezept und Kochbuchrezept

## Als Naechstes

### 1. Rezeptvergleich erweitern

- [x] Zutaten beider Rezepte normalisieren und automatisch zuordnen
- [x] Fehlende Zutaten farblich markieren
- [x] Mengen- und Einheitenabweichungen markieren
- [x] Fehlende oder abweichende Zubereitungsschritte anzeigen
- [x] Vergleichsansicht fuer mobile Bildschirme optimieren

### 2. Kontrollierte Rezeptzusammenfuehrung

- [x] Einzelne Zutaten aus dem Vergleich auswaehlbar machen
- [x] Einzelne Schritte aus dem Vergleich auswaehlbar machen
- [x] Zusammengefuehrtes Rezept als neues Rezept speichern
- [x] Bestehendes Rezept nur nach ausdruecklicher Sicherheitsabfrage aktualisieren
- [x] Originalrezept vor jeder Zusammenfuehrung unveraendert erhalten

### 3. Online-Naehrwertabgleich

- [x] Open-Food-Facts-Suche im Zutateneditor ergaenzen
- [x] Treffer mit Nahrwerten zur manuellen Bestaetigung anzeigen
- [x] Treffer in die persoenliche Nahrwertbibliothek uebernehmen
- [x] Lokale Werte niemals automatisch ueberschreiben
- [x] API-Fehler, Rate-Limits und nicht gefundene Zutaten sichtbar behandeln
- [x] Optional Barcode-Suche fuer verpackte Lebensmittel ergaenzen

### 4. Importqualitaet verbessern

- [x] Weitere JSON-LD-Varianten fuer Rezeptzutaten und Schritte unterstuetzen
- [x] Brueche, Bereichsangaben und Einheiten wie TL/EL/Stueck verbessern
- [x] Zutaten ohne erkennbare Menge sinnvoll vorbelegen
- [x] Importquelle und Abrufdatum im Rezept optional speichern
- [ ] Weitere Rezeptseiten mit einem kleinen Testkatalog pruefen

### 5. Tests und Sicherheit

- [ ] Unit-Tests fuer Zutatenparser und Mengenberechnung ergaenzen
- [ ] Tests fuer fehlende JSON-LD-Felder ergaenzen
- [ ] SSRF-Schutz und Redirect-Verhalten weiter testen
- [ ] URL-Import mit zu grosser oder langsamer Antwort testen
- [ ] API- und Frontend-Syntaxpruefung in den Build aufnehmen

### 6. Deployment und Betrieb

- [ ] Nach jeder Aenderung GitHub-Actions-Build pruefen
- [ ] GHCR-Image auf Unraid aktualisieren und Container recreaten
- [ ] Neue Icon-Dateien im Image und in GitHub pruefen
- [ ] Datenbank-Backup nach erfolgreichem Update erstellen
- [ ] Admin-Passwort rotieren, falls es bereits geteilt wurde

## Arbeitsregel

Nach jedem erledigten Punkt:

1. Aenderung umsetzen
2. Fokussierten Test ausfuehren
3. Checkbox hier aktualisieren
4. Erst danach mit dem naechsten Punkt beginnen
