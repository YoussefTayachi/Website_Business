# CLAUDE.md

Anleitung fuer Claude Code in diesem Ordner.

## Was das hier ist

Ein Portfolio-One-Pager fuer Youssefs
Webdesign-Angebot. Die Leute, die hier ankommen, kommen aus einer
Kaltakquise-Mail, in der ein konkreter Mangel an ihrer eigenen Website benannt
wurde. Diese Seite muss in Sekunden zwei Dinge zeigen: der Absender ist
sichtbar Experte, und der Betrieb versteht sofort, was er davon hat.

Die Startseite hat die FARBEN von frostbreaker.app, aber nicht dessen
Schrift. Gesetzt ist **Wix Madefor** (Display und Text), nach dem Vorbild
von wix.com/website/templates; der Nutzer wollte ausdruecklich weg von der
Serifen-Signatur der Produktseite. Coral traegt genau eine Aufgabe, Sky ist
Leitakzent, es gibt einen Dunkelmodus.

Der Aufbau folgt derselben Idee wie die Vorlagengalerie von Wix: **zeigen
statt beschreiben**. Sieben Flaechen: Hero, Beweisstreifen, Galerie aus sechs
Gestaltungen, Vorher/Nachher-Vergleich, drei Schritte, Schlussblock, Fuss.

**Die Galerie ist der Kern.** Sechs Website-Entwuerfe (`content/entwuerfe.ts`,
`components/entwuerfe/`) in drei Bauformen, jeder mit eigener Palette und
eigener Schrift, damit sie wie sechs Betriebe aussehen und nicht sechsmal wie
diese Seite. Sie werden gerendert, aufgenommen und als Bild eingebunden.

**Keine Wix-Vorlagen im Projekt.** Der Nutzer hatte angeboten, welche zu
importieren. Abgelehnt, und das soll so bleiben: die Vorlagen gehoeren Wix,
und auf einer Webdesign-Seite liest jeder Besucher gezeigte Designs als
eigene Arbeit. Uebernommen ist die BAUFORM der Galerie, nicht ihr Inhalt.

**Kein Kennzeichen auf den Entwuerfen, und das ist Absicht.** Frueher trugen
die Demo-Karten "Fictional demo. Not a real business." Der Abschnitt heisst
jetzt "What your page could look like" und behauptet damit keinen Kunden,
also gibt es nichts klarzustellen. Wer ihn in eine Fallstudie umbaut
("built for", "our client"), behauptet etwas und muss das neu entscheiden.

Davor stand hier ein designatives-Klon (Archivo Black, Mint, Koenigsblau)
und davor ein neunaktiges Scroll-Erlebnis. Beide sind verworfen und aus dem
Code entfernt. `scrollcraft/` bleibt als historische Referenz liegen.

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
| Entwuerfe (`content/entwuerfe.ts`) | Englisch |
| Alte Vergleichsfassung (`content/projekte.ts`) | Elektro-Eintrag englisch, Bau und Dach noch deutsch (werden nicht aufgenommen) |
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
- Die Entwuerfe zeigen erfundene Betriebe mit erfundenen Nummern. Sie
  behaupten keinen Auftrag, deshalb tragen sie kein Kennzeichen (siehe oben).
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
Push nach `main` und deployt selbst nicht.

**ABER EIN PUSH NACH `main` GEHT LIVE.** Hier stand bis zum 2026-08-31 das
Gegenteil ("ein Push geht ins Repo und sonst nirgendwohin"), und das war
falsch: das Vercel-Projekt `website-business` haengt ueber Vercels eigene
GitHub-Integration am Repo `YoussefTayachi/Website_Business` und baut jeden
Push nach `main` als **Produktion**. Die CI-Datei hat damit nichts zu tun,
und ein fehlendes `.vercel/`-Verzeichnis beweist gar nichts, weil die
Verknuepfung bei Vercel liegt und nicht im Arbeitsverzeichnis.

Oeffentlich erreichbar ist davon `https://website-business-five.vercel.app`.
Die Aliase mit `-git-main-` und `-youtays-projects` im Namen antworten mit
302, sie stehen hinter Vercels Zugriffsschutz.
`marketing.frostbreaker.app` ist noch nicht eingerichtet und loest nicht auf.

Wer also ohne Absicht veroeffentlichen will, committet und pusht **nicht**.

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

## Die Bilder der Startseite

Alles Sichtbare in Galerie, Hero und Vergleich sind **Aufnahmen echter,
gebauter Seiten**, keine Zeichnungen und keine Stockfotos. Der Weg:

```bash
CAPTURE=1 npm run dev -- -p 3210   # Erfassungsseiten sind nur so Seiten
node scripts/aufnahmen.mjs         # nimmt auf, schreibt public/arbeiten/manifest.json
node scripts/pruefbilder.mjs       # Startseite in vier Zustaenden, meldet Ueberlauf
```

**Nie zwei Dev-Server auf demselben `.next`.** Genau das ist am 2026-08-31
passiert (3200 zum Ansehen, 3210 zum Erfassen), und der geteilte Build-Cache
ist zerbrochen: `Cannot find module './331.js'`, danach lieferte die
Erfassungsseite ihr CSS nicht mehr aus und die Aufnahme zeigte rohes HTML.
Das faellt nur auf, wenn man das Bild ansieht. Einen Server, oder `.next`
vorher loeschen.

Die Erfassungsseiten heissen `page.capture.tsx` und stehen nur mit
`CAPTURE=1` in `pageExtensions` (siehe `next.config.mjs`). Ohne die Variable
sind sie fuer Next keine Seiten und koennen nicht in einen Produktionsbau
geraten. Nachgeprueft wird das am Routen-Manifest, nicht geglaubt.
