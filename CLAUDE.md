# CLAUDE.md

Anleitung fuer Claude Code in diesem Ordner.

## Was das hier ist

Ein heller Portfolio-One-Pager plus drei Fallstudien fuer Youssefs
Webdesign-Angebot. Die Leute, die hier ankommen, kommen aus einer
Kaltakquise-Mail, in der ein konkreter Mangel an ihrer eigenen Website benannt
wurde. Diese Seite muss in Sekunden zwei Dinge zeigen: der Absender ist
sichtbar Experte, und der Betrieb versteht sofort, was er davon hat.

Die Startseite folgt seit dem 2026-08-31 der Formensprache von
frostbreaker.app, weil sie kuenftig auf `marketing.frostbreaker.app` steht
und dieselbe Marke sein soll: warmes Off-White, Fraunces als Display-Serife
mit einem kursiven Sky-Wort in der Ueberschrift, Space Grotesk als
Fliesstext, Coral fuer genau einen Abschnitt, schwarzer Pill-CTA, echte
Screenshots gebauter Seiten statt Zeichnungen. Sie hat einen Dunkelmodus.

**Stand: Abnahme-Ausschnitt.** Gebaut sind Kopfleiste, Hero,
Beweisstreifen, ein Fall und ein kleiner Fuss. Es fehlen die Flaechen
"Was dich Anrufe kostet" (Coral), "Wie es laeuft", "Wer die Arbeit macht",
der Schlussblock, die Faelle 2 und 3 sowie `app/opengraph-image.tsx`.
`PLAN.md` beschreibt den Vollausbau und ist vier Runden gegen Codex
gelaufen; `PLAN-REVIEW-LOG.md` haelt den Streit fest.

Davor stand hier ein designatives-Klon (Archivo Black, Mint `#2affaa`,
Koenigsblau `#1032cf`, `--st-`-Farbtokens, mintgruener Riesenfuss) und davor
ein neunaktiges Scroll-Erlebnis. Beide sind vom Nutzer verworfen und aus dem
Code entfernt. Der Ordner `scrollcraft/` bleibt als historische Referenz
liegen, nichts darin wird geladen.

Zwei Dateien ergaenzen das hier:

- `README.md` fuer Befehle, Ordner und was vor einem Livegang noch offen ist
- `PLAN.md` ist der aktuelle Plan des Frostbreaker-Umbaus
- `PLAN-REVIEW-LOG.md` ist das Streitprotokoll dazu, vier Runden gegen Codex
- `PLAN-ERSTER-ENTWURF.md` ist der Plan des ERSTEN Entwurfs und Geschichte

## Erst fragen, dann suchen

Dieses Projekt liegt im Agentic OS als Wissensgraph
(`../Agentic_OS`, Tag `website-business`). Der Graph beantwortet in einem
Aufruf, wofuer ein Grep mehrere Laeufe braucht.

| Frage | Werkzeug |
|---|---|
| "Wie funktioniert X?" | `aos_brief` |
| "Wo steht X?" / "Gibt es X schon?" | `aos_where` |
| "Was bricht, wenn ich X aendere?" | `aos_affected` |

Ohne MCP-Werkzeuge geht dasselbe im OS-Ordner mit `aos brief "..."`.
Nach groesseren Aenderungen im OS-Ordner `python aos.py map website-business`
laufen lassen. Achtung: der semantische `deep`-Lauf scheitert derzeit an
Timeouts des kostenlosen Modells, die Textebene des Graphen kann veraltet
sein.

## Befehle

```bash
npm run dev -- -p 3200   # Port 3000 ist oft vom Frostbreaker-Dev belegt
npm run typecheck        # tsc --noEmit, der einzige Test hier
npm run build            # muss vor jedem Push fehlerfrei durchlaufen
```

**Immer aus diesem Projektordner heraus.** Tailwind v4 loest seine Pfade
gegen das aktuelle Arbeitsverzeichnis auf; aus einem uebergeordneten Ordner
gestartet kommt die Seite ungestylt hoch.

## Sprache

**Sichtbarer Seitentext ist Englisch. Alles andere bleibt Deutsch.**

| Was | Sprache |
|---|---|
| Sichtbarer Text auf `/` (`content/start.ts`) | Englisch |
| Impressum, Datenschutz (`content/seite.ts`) | Englisch |
| Demo-Seiten (`content/projekte.ts`) | **noch Deutsch**, siehe unten |
| Kommentare, Commit-Messages, Doku | Deutsch |
| Bezeichner | Englisch, Dateinamen deutsch |

- **Leichte Sprache ist Pflicht.** Die Zielgruppe (Bauunternehmen,
  Elektriker, Dachdecker) hat keinen IT-Hintergrund. Keine nackte Kennzahl
  ohne ihre Folge fuer den Betrieb; kein Fachwort, das ein Laie nicht sofort
  versteht. Der Ton ist kurz und selbstbewusst, nicht schwurbelig.
- **Keine Gedankenstriche in sichtbaren Texten.** Doppelpunkt, Komma oder
  Klammer stattdessen.
- Kein Agentur-Plural. Es ist eine Person, erste Person Singular.
- **Keine erfundenen Zahlen**, Ladezeiten, Kundenzahlen, Preise, Referenzen,
  Testimonials oder Kundenlogos. Die Zielgruppe prueft so etwas nach.
- Die drei Demo-Projekte sind fiktiv und tragen auf jeder Karte das
  Kennzeichen "Fictional demo. Not a real business." **Das bleibt stehen**,
  und es steht als Text auf der Karte, nie nur im Bild: ein Kennzeichen im
  Screenshot ist fuer einen Screenreader nicht vorhanden.
- **Offen:** die Demo-Seiten selbst sind deutsch, die Portfolio-Seite ist
  englisch. Auf den Screenshots sieht man das. Entweder die Demos werden
  uebersetzt oder es bleibt so, weil die Zielgruppe deutsch ist.
- Der einzige ECHTE Beleg ist Frostbreaker selbst. Lead-Entwuerfe duerfen
  ohne Zustimmung nicht als Referenz gezeigt werden
  (`Website_Business/README.md`), CTS Cement hat nicht zugestimmt.

## Wo was steht

```
app/
  layout.tsx            Wurzel: html, body, Schriften, Theme-Skript, Sprungmarke
  page.tsx              die Startseite, setzt die sieben Abschnitte zusammen
  not-found.tsx         globales 404, englisch, Text aus content/start.ts
  globals.css           Tokens der Rechts- und Fallstudienseiten
  (mit-chrome)/         Route Group: Kopfleiste + main + Fuss
    impressum/ datenschutz/ arbeit/[slug]/
components/
  start/                die sieben Abschnitte der Startseite:
                        leiste, hero, statement, leistungen, arbeiten,
                        ueber, fuss; dazu reveal.tsx (IntersectionObserver),
                        zeichnungen.tsx (alle SVG-Bildflaechen),
                        tokens.css, start.css
  chrome/               Kopfleiste, Fuss, Nachtmodus-Schalter (Unterseiten)
  showcase/             Vorher/Nachher-Mechanik der Fallstudien (nur /arbeit)
content/
  start.ts              aller sichtbare Text der Startseite, englisch
  seite.ts              Kopfleiste, Fuss, Impressum, Datenschutz, Kleintexte
  projekte.ts           die drei Fallstudien, noch deutsch
lib/                    cn.ts, reveal.ts, media.ts, demo-fassungen.ts
scrollcraft/            historischer Build des verworfenen Scroll-Designs
```

**Die Route Group `(mit-chrome)` ist kein Ornament.** Das Wurzel-Layout
traegt keine Kopfleiste, keinen Fuss und kein `<main>`, weil die Startseite
all das selbst mitbringt. Wer Chrome ins Wurzel-Layout zieht, erzeugt zwei
Kopfleisten und verschachtelte `<main>`-Elemente.

**Text gehoert nach `content/`**, nicht in eine Komponente.

**Farben und Schriftgroessen kommen als Tokens.** Startseite:
`components/start/tokens.css` (Praefix `--st-`, gemessen an der Referenz:
Weiss, Schwarz, Koenigsblau `#1032cf`, Mint `#2affaa`). Unterseiten:
`app/globals.css`. Keine Hex-Werte in Komponenten. In SVG kommen Farben als
Klasse, weil Praesentationsattribute CSS-Variablen nicht aufloesen.

**Die Stylesheets der Startseite werden aus `app/page.tsx` importiert,
nicht aus einem Layout.** Nur so bleiben sie auf diese Route beschraenkt.
Nach Aenderungen daran im gebauten HTML von `/impressum` nachsehen, dass
dort kein `st-`-Stil haengt.

## Was hier bewusst fehlt

Kein Supabase, kein Stripe, keine Auth, keine Middleware, keine fremden
Stockfotos, **keine Animationsbibliothek**. Alles Sichtbare ist gebaut, aus
CSS, SVG und Typografie. Bewegung laeuft ueber CSS-Transitions und einen
IntersectionObserver (`components/start/reveal.tsx`); ein Portfolio, das
40 kB Framer Motion fuer einen Reveal laedt, widerlegt sich selbst.

Server Components sind der Standard. `"use client"` nur dort, wo Zeiger,
Tastatur oder `IntersectionObserver` gebraucht werden.

Die Leitlinie fuer neue Flaechen: **80 Prozent visuell, 20 Prozent Text.**
Fliesstext nicht unter 17px, Headlines deutlich groesser als
Werkzeug-Standard.

## Vor dem Push

`npm run typecheck` und `npm run build` muessen fehlerfrei durchlaufen. Die
CI (`.github/workflows/ci.yml`) faehrt genau diese zwei Befehle auf jedem
Push nach `main`, deployt aber **nicht**. Ein Push geht ins Repo und sonst
nirgendwohin.

Die vier Dinge, an denen sich diese Seite messen lassen muss: kein
Layout-Sprung beim Laden, Tastaturbedienung ueberall, sichtbarer Fokusring,
und `prefers-reduced-motion: reduce` zeigt den **Endzustand**, nicht eine
gedaempfte Fassung. Ohne JavaScript steht die ganze Seite (der
Bewegungs-Ausgangszustand haengt an `@media (scripting: enabled)`).

Committen und pushen in einem Zug, nicht nachfragen. Commit-Messages deutsch.

## Der Ordner `scrollcraft/`

Der Build des verworfenen Scroll-Designs samt `BRIEF.md`. Historische
Referenz, wird von nichts mehr geladen. Nicht loeschen, aber auch nichts
mehr daraus verdrahten. In `scrollcraft/builds/casefile/node_modules` liegt
ein nutzbares `playwright-core` fuer Browser-Pruefungen, damit es nie ins
Haupt-`package.json` geraet.

## Der Ordner `graphify-out/`

Stat-Cache von graphify, rein lokal (`.git/info/exclude`). Nicht loeschen:
er macht den zweiten Lauf schnell.
