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
Gestaltungen, echte laufende Arbeit, sechs Ablaufstufen, Person, Schlussblock
mit Kalender, Fuss.

**Die Galerie ist der Kern.** Sechs Website-Entwuerfe (`content/entwuerfe.ts`,
`components/entwuerfe/`) in **sechs verschiedenen Bauformen**, jeder mit
eigener Palette und eigener Schrift, damit sie wie sechs Betriebe aussehen
und nicht sechsmal wie diese Seite. Auf der Startseite stehen Aufnahmen; jede
Karte fuehrt auf `/work/<slug>`, wo derselbe Entwurf als echte, bedienbare
Seite steht.

## Das Mentor-Review vom 2026-09-01

Youssefs Mentor hat die Seite geprueft. Sechs Punkte, fuenf umgesetzt, einer
bewusst nicht. **Wer etwas davon zurueckbaut, baut einen benannten Fehler
wieder ein.**

| Einwand | Umgesetzt als |
|---|---|
| "remove Before and after, showing your previous is more meaningful" | Vergleich ersatzlos gestrichen, `components/start/arbeit.tsx` zeigt stattdessen frostbreaker.app |
| "How it works: titles like Onboarding, Research, ... instead of a sentence" | sechs benannte Stufen in `content/start.ts`, `ablauf` |
| "have the calendar integrated to reduce friction" | `components/start/kalender.tsx`, eingebettet, laedt auf Klick |
| "logo and quicklink the same font size" | `--st-fs-nav`, beide 17px |
| "remove the Auto and have 2 logo for dark and light" | `modus.tsx`, zwei Zeichen, folgt ohne Klick dem Geraet |
| "6 websites have a similar layout, likely a template" | drei Bauformen fuer sechs Entwuerfe wurden sechs Bauformen |
| "remove the fake computer button" | Fensterrahmen mit den drei Punkten ist weg |
| "create a page for each prototype, hover card with name and link" | `/work/[slug]` plus Tafel in der Galeriekarte |

**Nicht umgesetzt: "base your prototype on a REAL business that actually
exists".** Fuer den Prototyp, der IN EINER KALTAKQUISE-MAIL an genau diesen
Betrieb geht, ist der Rat richtig, und so arbeitet Frostbreaker auch. In
einer oeffentlichen Galerie steht damit der Name eines fremden Unternehmens
unter einer Gestaltung, die es nie beauftragt hat. Die sechs Entwuerfe der
Galerie bleiben deshalb erfunden.

**Der CTS-Prototyp steht seit dem 2026-09-02 unter "Real work", ANONYM.**
Der Betrieb hat zugestimmt, dass der Entwurf gezeigt wird, unter der
Bedingung, dass sein Name nicht faellt. Was daraus folgt und was niemand
zurueckbauen darf:

- Auf der Seite steht "Cement manufacturer" und "Redesign prototype, USA",
  kein Firmenname, kein Produktname, kein Ort genauer als das Land.
- Die Aufnahmen `public/arbeiten/cement.png` und `cement-telefon.png` sind
  ANONYMISIERT: Logo, Telefonnummer, Produktname, Firmensitz und die
  CO2-Kennzahl (ein Fingerabdruck, mit dem eine Suche den Hersteller
  findet) werden bei der Aufnahme ausgeblendet, und `scripts/aufnahmen.mjs`
  bricht ab, wenn danach noch einer der verbotenen Texte sichtbar ist
  (`anonym.verboten`). Die breite Aufnahme endet bei 1500px, VOR dem
  Produktraster: dort steht der Markenname auf den Saecken, und den kann
  kein Skript ausblenden. Neu aufnehmen mit
  `node scripts/aufnahmen.mjs --nur cement` (und `--nur cement-telefon`),
  dafuer braucht es keinen Erfassungsserver. Die Adresse des Prototyps
  steht nicht im oeffentlichen Manifest.
- Es gibt KEINEN LINK auf den Prototyp: die veroeffentlichte Fassung traegt
  das Logo. Und KEIN ZITAT: der Betrieb hat zugestimmt, nicht gelobt.

## Die zweite Ueberarbeitung vom 2026-09-02

Vorbild war godly.design, eine Sammlung gut gestalteter Seiten nach Bauteil
(Hero, CTA, Logo, Fuss). Uebernommen sind BEWEGUNGEN, kein Inhalt:

| Bauteil | Was sich bewegt |
|---|---|
| Logo | Bildmarke (das f aus `app/icon.svg`) vor dem Wort, kippt beim Ueberfahren (`marke.tsx`) |
| Kopfleiste | schrumpft beim Scrollen ueber `animation-timeline: scroll()`, ohne JavaScript; Links mit einlaufendem Unterstrich |
| Knopf | `knopf.tsx`, eine Komponente fuer alle Pillen: Beschriftung rollt beim Ueberfahren, Pfeil laeuft, Druck beim Tippen |
| Hero | Woerter kommen aus Unschaerfe, Telefon kippt dem Zeiger entgegen, Anrufkarte springt nach 1,3s auf |
| Galerie | Bild kommt aus leichter Vergroesserung, Karte hebt sich mit Schatten |
| Beweis | Laufband der sechs Gewerke (`laufband.tsx`), haelt beim Ueberfahren |
| Galerie | Pille "Open" folgt dem Zeiger ueber den Karten (`galerie-zeiger.tsx`) |
| Arbeit | zwei Faelle, je Schreibtisch plus Telefon; beide Aufnahmen sind laenger als ihr Rahmen und wandern beim Ueberfahren (Weg aus den Bildmassen gerechnet) |
| Hero-Knopf | Magnet (`magnet.tsx`): rueckt dem Zeiger bis 8px entgegen |
| Kopfleiste | Fortschrittslinie in Sky an der Unterkante, scroll-getrieben |
| Ablauf | Haarlinie je Stufe, Akzent laeuft nacheinander darueber, Nummer faerbt sich |
| Person | Portraet wird von oben aufgedeckt (`clip-path`) |
| Schluss | dasselbe Zeigerlicht wie im Hero, Ueberschrift wortweise, freie Tage im Kalendergitter leuchten |
| Fuss | Riesen-Wortmarke, faerbt sich beim Ueberfahren |
| Telefon | feste Buchungsleiste unten (`mobilcta.tsx`), nur zwischen Hero und Kalender |

Die Texte folgen drei Fragen: SCHMERZ (Schlagzeile), PERSON (Augenbraue
"trades and local businesses", "six trades"), VERSPRECHEN (Lead, Arbeit,
Person). Die Wortzahl ist dabei gesunken (506 auf 492 ueber alle
Zeichenketten in `content/start.ts`), obwohl ein zweiter Fall dazukam.

`prefers-reduced-motion: reduce` zeigt weiterhin den Endzustand, fuer jede
neue Bewegung steht eine Zeile im Reduzierblock von `start.css`.

**Keine Wix-Vorlagen im Projekt.** Der Nutzer hatte angeboten, welche zu
importieren. Abgelehnt, und das soll so bleiben: die Vorlagen gehoeren Wix,
und auf einer Webdesign-Seite liest jeder Besucher gezeigte Designs als
eigene Arbeit. Uebernommen ist die BAUFORM der Galerie, nicht ihr Inhalt.

**Kein Kennzeichen in der GALERIE, eine Zeile auf der ENTWURFSSEITE.** Der
Abschnitt auf der Startseite heisst "What your page could look like" und
behauptet keinen Kunden, also gibt es dort nichts klarzustellen. Auf
`/work/[slug]` steht der Name eines Betriebs als Ueberschrift, und ohne die
eine Zeile (`start.werk.hinweis`) laese sich die Seite wie eine Fallstudie.
Wer daraus wirklich eine macht ("built for", "our client"), behauptet etwas
und muss das neu entscheiden.

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
- Die Entwuerfe zeigen erfundene Betriebe mit erfundenen Nummern. In der
  Galerie behaupten sie keinen Auftrag und tragen deshalb kein Kennzeichen;
  auf `/work/[slug]` steht dafuer eine Zeile (siehe oben).
- Echte Belege sind Frostbreaker selbst und, anonym, der CTS-Prototyp
  (siehe oben). Andere Lead-Entwuerfe duerfen ohne Zustimmung nicht als
  Referenz gezeigt werden (`Website_Business/README.md`).

## Wo was steht

```
app/
  layout.tsx            Wurzel: html, body, Schriften, Theme-Skript, Sprungmarke
  page.tsx              die Startseite, setzt die sieben Abschnitte zusammen
  not-found.tsx         globales 404, englisch, Text aus content/start.ts
  globals.css           Tokens der Rechts- und Fallstudienseiten
  (mit-chrome)/         Route Group: Kopfleiste + main + Fuss
    impressum/ datenschutz/
  work/[slug]/          eine Seite je Entwurf, sechs Stueck, beim Bau erzeugt
                        (generateStaticParams, dynamicParams: false)
components/
  start/                die Abschnitte der Startseite:
                        leiste, marke, modus, hero, geraet, beweis, galerie,
                        arbeit, ablauf, person, schluss, kalender, fuss,
                        mobilcta; dazu knopf.tsx (die eine Pille),
                        reveal.tsx (IntersectionObserver), worte.tsx,
                        zeigerlicht.tsx, start.css
  entwuerfe/            entwurf.tsx (sechs Bauformen) und entwurf.css.
                        Geladen von /work/[slug] und der Erfassungsroute,
                        NIE von der Startseite
  chrome/               Kopfleiste, Fuss, Nachtmodus-Schalter (Unterseiten)
  showcase/             Vorher/Nachher-Mechanik, wird von keiner Route mehr
                        geladen, seit der Vergleich gestrichen ist
content/
  start.ts              aller sichtbare Text der Startseite UND der
                        Entwurfsseiten, englisch
  entwuerfe.ts          die sechs Entwuerfe als Daten, englisch
  seite.ts              Kopfleiste, Fuss, Impressum, Datenschutz, Kleintexte
  projekte.ts           die drei alten Fallstudien, deutsch, ungenutzt
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

## Der Kalender und der Datenschutz

Der Schlussblock bettet den Buchungskalender von Calendly ein
(`components/start/kalender.tsx`). Er laedt **erst auf Klick**, und das ist
keine Vorsicht auf Verdacht: ein Betrieb mit deutschem Impressum darf einen
Dritten, der Cookies setzt, nach TDDDG Paragraf 25 nicht ungefragt nachladen.
Der Klick IST die Einwilligung, und er kostet einen Klick statt eines
Seitenwechsels.

**Diese eine Zeile und der Datenschutztext haengen zusammen.** Wer
`useState(false)` auf `true` stellt, laedt Calendly sofort und muss dann die
zwei Abschnitte in `content/seite.ts` ("Cookies and embedded content" und
"Booking calendar") neu schreiben und eine echte Einwilligung davorsetzen.

Ohne JavaScript ist der Deckel nicht da (`nur-mit-js`), stattdessen steht ein
`<noscript>`-Knopf auf calendly.com. Ein Knopf, der auf nichts reagiert, ist
schlimmer als kein Knopf.

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
node scripts/pruefbilder.mjs       # drei Seiten in vier Zustaenden, meldet Ueberlauf
```

Der Pruefdurchlauf laeuft gegen `npm start` und nicht gegen den Dev-Server,
und er deckt seit dem 2026-09-01 auch `/work/voltas` und `/work/stoneleaf`
ab: dort sitzen die zwei riskanten Bauformen (feste 296px-Spalte, Bild das
absichtlich aus dem Fenster laeuft).

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

**Eine Aufnahme kommt NICHT vom Dev-Server:** `frostbreaker.png` wird direkt
von `https://www.frostbreaker.app/` geschossen. Der Abschnitt darunter
behauptet "built, shipped, still running", und das kann nur eine Aufnahme aus
dem Netz belegen. Fuer fremde Adressen gilt `waitUntil: "load"` statt
`networkidle` (eine ausgelieferte Seite wird nie ruhig), und die Wartezeiten
auf Schriften und Bilder haben eine Obergrenze: `page.evaluate` hat in
Playwright KEINE Zeitgrenze, und genau daran hing der Lauf am 2026-09-01
minutenlang ohne Fehlermeldung.

**Auch die Metadaten-Bilder kommen von dort.** `app/opengraph-image.png` und
`app/apple-icon.png` werden von `/erfassung/og` aufgenommen und liegen fest
im Repo. Der naheliegende Weg waere `next/og` gewesen; Satori liest aber TTF,
OTF und WOFF und **kein WOFF2**, und die @fontsource-variable-Pakete liefern
nur WOFF2. Das OG-Bild stuende damit in einer Systemschrift. Ueber die
Aufnahme traegt es dieselbe Schrift und dieselben Entwuerfe wie die Seite.

Das Browsersymbol (`app/icon.svg`) ist die Bildmarke von Frostbreaker, damit
marketing.frostbreaker.app und frostbreaker.app im Tab dasselbe Zeichen
tragen.

**Der Pruefdurchlauf hat DREI Pruefungen, und jede steht fuer einen Fehler,
den eine fruehere Fassung durchgelassen hat.** Wer eine davon streicht, macht
denselben Fehler wieder moeglich:

1. `scrollWidth` gegen `clientWidth` (findet fast nichts, siehe unten)
2. Elemente ausserhalb des Fensters (fand die Modus-Gruppe am 2026-08-31)
3. **Woerter, die breiter sind als ihre Spalte.** Am 2026-09-01 stand
   "Maintenance" bei 390px in einer 161px-Spalte in 28px und wurde mitten im
   Wort umgebrochen. Der erste Anlauf dafuer war falsch: bei
   `overflow: visible` meldet Chrome `scrollWidth` gleich `clientWidth`, und
   der Browser BRICHT das Wort, statt es ueberstehen zu lassen. Gemessen wird
   deshalb das laengste Wort mit `canvas.measureText` in der Schrift, in der
   es gesetzt ist. Gegengeprueft: bei 34px meldet der Lauf, bei 22px nicht.

**`scrollWidth` allein findet keinen Ueberlauf auf dieser Seite.** `.st-page`
traegt `overflow-x: clip`, damit die Riesentypografie in schmalen Fenstern
nicht die Seite verschiebt. Damit ist `scrollWidth - clientWidth` immer 0,
auch wenn ein Bedienelement halb abgeschnitten am Rand klebt. Genau so ist
die Modus-Gruppe am 2026-08-31 bei 390px aus dem Bild gelaufen, ohne dass
der Pruefdurchlauf etwas meldete. `scripts/pruefbilder.mjs` sucht seither
nach ELEMENTEN ausserhalb des Fensters und laesst `aria-hidden` aussen vor
(Zierde wie der Lichtverlauf im Hero ragt absichtlich hinaus).
