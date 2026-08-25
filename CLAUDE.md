# CLAUDE.md

Anleitung fuer Claude Code in diesem Ordner.

## Was das hier ist

Eine Scroll-Erlebnis-Seite plus drei Fallstudien fuer Youssefs
Webdesign-Angebot. Die Leute, die hier ankommen, kommen aus einer
Kaltakquise-Mail, in der ein konkreter Mangel an ihrer eigenen Website benannt
wurde. Diese Seite loest das ein.

Daraus folgt die Regel, an der alles haengt: **der Beweis ist die Seite
selbst.** Wer einem Betrieb schreibt, seine Website sei zu langsam, und dann
auf eine Seite verlinkt, die ruckelt, hat das Gespraech beendet, bevor es
anfing.

Die Startseite treibt das auf die Spitze. Sie ist in neun Akte gegliedert, und
im vierten stehen zwei Mini-Websites nebeneinander im selben Rahmen: die
schlechte Fassung **ruckelt beim Scrollen wirklich**, die neue folgt dem Rad
ohne Verzug. Der Besucher fuehlt den Unterschied in der Hand, bevor er einen
Satz darueber gelesen hat. Das ist die eine Sache, die diese Seite kann und
die andere Portfolios nicht koennen, und jede Aenderung, die sie beschaedigt,
ist eine Verschlechterung, egal wie gut sie sonst gemeint ist.

Zwei Dateien beantworten fast alles, bevor du hier weiterliest:

- `README.md` fuer Befehle, Ordner und was vor einem Livegang noch offen ist
- `PLAN.md` fuer jede Entscheidung samt Begruendung, von der visuellen
  Richtung bis zur Komponentenarchitektur

Was hier steht, ergaenzt die beiden und wiederholt sie nicht.

## Erst fragen, dann suchen

Dieses Projekt liegt im Agentic OS als Wissensgraph
(`../Agentic_OS`, Tag `website-business`). Der Graph beantwortet in einem
Aufruf, wofuer ein Grep mehrere Laeufe und tausende gelesene Zeilen braucht.

| Frage | Werkzeug |
|---|---|
| "Wie funktioniert X?" | `aos_brief` |
| "Wo steht X?" / "Gibt es X schon?" | `aos_where` |
| "Was bricht, wenn ich X aendere?" | `aos_affected` |

Ohne MCP-Werkzeuge geht dasselbe im OS-Ordner mit `aos brief "..."`.

**Erst danach Dateien lesen**, und dann gezielt die, die das Paket genannt
hat. Nicht auf Verdacht.

Der Graph kennt seit dem 2026-08-25 auch `README.md` und `PLAN.md`, nicht nur
den Code. Nach groesseren Aenderungen im OS-Ordner `python aos.py map
website-business` laufen lassen, bei geaenderten Texten zusaetzlich `python
aos.py deep website-business`. Sonst zeigt der Graph den Stand von vorgestern.

## Befehle

```bash
npm run dev -- -p 3200   # Port 3000 ist oft vom Frostbreaker-Dev belegt
npm run typecheck        # tsc --noEmit, der einzige Test hier
npm run build            # muss vor jedem Push fehlerfrei durchlaufen
```

**Immer aus diesem Projektordner heraus.** Tailwind v4 loest seine Pfade gegen
das aktuelle Arbeitsverzeichnis auf. Aus einem uebergeordneten Ordner
gestartet, findet es die Inhalte nicht, und die Seite kommt ungestylt hoch.
Das sieht nach einem kaputten Stylesheet aus und ist doch nur das falsche CWD.

Es gibt keine Testsuite. Das Projekt enthaelt keine Logik, die man sinnvoll
testen koennte, und `typecheck` plus `build` fangen ab, was hier schiefgehen
kann.

## Sprache

**Sichtbarer Seitentext ist Englisch. Alles andere bleibt Deutsch.**

| Was | Sprache |
|---|---|
| Sichtbarer Text auf `/` (`content/start.ts`) | Englisch |
| Impressum, Datenschutz (`content/seite.ts`) | Englisch |
| Fallstudien `/arbeit/[slug]` (`content/projekte.ts`) | noch Deutsch, siehe unten |
| Kommentare, Commit-Messages, Doku | Deutsch |
| Bezeichner, Dateinamen im Code | wie gehabt: Bezeichner englisch, Dateinamen deutsch |

Das ist eine bewusste Umkehr der frueheren Festlegung. `PLAN.md` Abschnitt 5
begruendete das Weglassen eines Sprachumschalters damit, dass die Zielkunden
deutschsprachig sind. Der Umschalter fehlt weiterhin, aber aus dem umgekehrten
Grund: es gibt jetzt genau eine Sprache, und das ist Englisch. Wer eine
deutsche Fassung will, baut sie als eigenes Vorhaben, nicht nebenbei.

Die Fallstudien unter `/arbeit/[slug]` sind noch deutsch. Von der Startseite
fuehrt kein Link dorthin, und sie tragen deshalb `robots: { index: false }`.
Sie zu uebersetzen ist eine offene Entscheidung, kein Versehen.

- **Keine Gedankenstriche in sichtbaren Texten.** Doppelpunkt, Komma oder
  Klammer stattdessen.
- Kein Agentur-Plural ("wir gestalten digitale Erlebnisse"). Es ist eine
  Person, und der Plural verraet den Alleinunternehmer sofort.
- **Keine erfundenen Zahlen.** Keine Prozentwerte, keine Ladezeiten, keine
  Kundenzahlen, keine Preise, die nicht abgestimmt sind. Die Zielgruppe prueft
  so etwas nach, und eine widerlegte Zahl kostet mehr, als jede Zahl bringt.
- Keine erfundenen Referenzen. Die drei Demo-Projekte sind fiktiv und tragen
  ein Kennzeichen. **Das Kennzeichen bleibt stehen.**

## Wo was steht

```
app/
  layout.tsx            Wurzel: html, body, Schriften, Theme-Skript, Sprungmarke
  page.tsx              die Startseite, setzt die neun Akte zusammen
  globals.css           Tokens der Rechts- und Fallstudienseiten
  icon.svg              Favicon
  (mit-chrome)/         Route Group: Kopfleiste + main + Fuss
    layout.tsx
    impressum/ datenschutz/ arbeit/[slug]/
components/
  start/                die neun Akte, die Leiste, der Skriptlader,
                        dazu scrollcraft.css, page.css, tokens.css
  chrome/               Kopfleiste, Fuss, Nachtmodus-Schalter
  showcase/             Vorher/Nachher-Mechanik, Befund-Marker,
                        die sechs Demo-Fassungen (nur noch /arbeit)
content/
  start.ts              aller sichtbare Text der Startseite, englisch
  seite.ts              Kopfleiste, Fuss, Impressum, Datenschutz, Kleintexte
  projekte.ts           die drei Fallstudien, noch deutsch
lib/                    cn.ts, reveal.ts, media.ts, demo-fassungen.ts
public/scrollcraft/     scrollcraft.js, page.js, hero.webp, about.webp
scrollcraft/            der Herkunfts-Build, siehe unten
```

**Die Route Group `(mit-chrome)` ist kein Ornament.** Das Wurzel-Layout darf
keine Kopfleiste, keinen Fuss und kein `<main>` mehr tragen, weil die
Startseite all das selbst mitbringt: ihre eigene `.site-bar`, ihr eigenes
`<main id="top">` und einen Fuss, der in den Schlussakt eingefaltet ist. Wer
Chrome zurueck ins Wurzel-Layout zieht, erzeugt zwei Kopfleisten und
verschachtelte `<main>`-Elemente.

**Text gehoert nach `content/`**, nicht in eine Komponente. Wer eine
Ueberschrift direkt ins JSX schreibt, versteckt sie vor dem naechsten, der die
Texte durchgeht.

**Farben und Schriftgroessen kommen als Tokens.** Fuer die Rechts- und
Fallstudienseiten aus `app/globals.css`, fuer die Startseite aus
`components/start/tokens.css`. Keine Hex-Werte in Komponenten.

## Die Scroll-Engine

`components/start/scrollcraft.css` und `public/scrollcraft/scrollcraft.js` sind
die Engine aus dem scrollcraft-Build. Sie sind **byte-identisch** uebernommen
und bleiben es. `public/scrollcraft/page.js` traegt den Signature Move (das
echte Ruckeln der schlechten Demo) und einen Fokus-Fix fuer den gepinnten
Schlussakt. Beides ist im Browser verifizierte Mechanik.

Drei Dinge daran sind Bedingung, nicht Geschmack:

1. **Die `data-sc-*`-Attribute im Markup sind der Vertrag mit der Engine.** Sie
   liest genau diese Struktur. Ein umsortiertes oder eingespartes Element
   bricht einen Akt, ohne dass TypeScript etwas merkt.
2. **Die vier Stylesheets der Startseite werden aus `app/page.tsx` importiert,
   nicht aus einem Layout.** Nur so liefert Next sie ausschliesslich fuer diese
   Route aus. `page.css` benutzt sehr allgemeine Selektoren (`.hero`, `.cta`,
   `.step`, `.foot`), und die `--sc-*`-Tokens wuerden das Impressum
   tiefschwarz einfaerben. Nach Aenderungen daran im gebauten HTML von
   `/impressum` nachsehen, dass dort nur das globals-Bundle haengt.
3. **Die Kopfleiste verlinkt mit `<a>`, nicht mit `<Link>`.** Bei einem
   Client-Wechsel laeuft `page.js` nicht erneut, seine Closures zeigten dann
   auf verworfenes DOM, und der Signature Move waere beim zweiten Besuch tot.
   Voller Seitenaufbau ist hier der Preis dafuer, dass die Seite funktioniert.

## Was hier bewusst fehlt

Kein Supabase, kein Stripe, keine Auth, keine Middleware, keine fremden
Stockfotos. Alles Sichtbare ausser den zwei generierten Stills ist gebaut, aus
CSS, SVG und Typografie.

**Zur Animationsbibliothek gilt seit dem scrollcraft-Redesign eine Ausnahme,
und nur diese eine:** die scrollcraft-Engine. Sie ist keine React-Bibliothek
wie Framer Motion, sondern eigenes Vanilla JS und CSS ohne Abhaengigkeiten,
liegt als statische Datei in `public/` und laedt nur auf der Startseite. Der
Nutzer hat sie fuer dieses Redesign ausdruecklich freigegeben, weil der
Signature Move ohne eine Scroll-Engine nicht baubar ist.

Das alte Argument gilt trotzdem weiter, nur eine Ebene hoeher: ein Portfolio,
das 40 kB Framer Motion fuer einen Schieber laedt, widerlegt sich selbst.
Bevor du eine **weitere** Abhaengigkeit hinzufuegst, pruefe, ob CSS, Web
Animations oder die schon vorhandene Engine reichen.

Server Components sind der Standard. Die neun Akte sind statisches Markup und
bleiben Server Components. `"use client"` nur dort, wo Zeiger, Tastatur oder
`IntersectionObserver` gebraucht werden: der Skriptlader
(`components/start/skripte.tsx`), Vorher/Nachher, Reveal, Nachtmodus-Schalter,
Kopfleiste.

Die Leitlinie fuer neue Flaechen: **80 Prozent visuell, 20 Prozent Text.** Was
man zeigen kann, wird gezeigt und nicht beschrieben. Wo ein Satz reicht, steht
kein zweiter.

## Vor dem Push

`npm run typecheck` und `npm run build` muessen fehlerfrei durchlaufen. Es gibt
zwar eine CI (`.github/workflows/ci.yml`, genau diese zwei Befehle auf jedem
Push nach `main`), aber sie faengt den Fehler erst, wenn er schon im Repo
steht. Vor dem Push pruefen, nicht danach.

Was die CI **nicht** tut: deployen. Es gibt keinen Deployment-Schritt und
keinen `.vercel`-Ordner in diesem Projekt. Ein Push nach `main` geht ins Repo
und sonst nirgendwohin. Wer das aendert, macht jeden kuenftigen Push zu einem
Livegang, und das gehoert dann hierher geschrieben.

Dazu die vier Dinge, an denen sich diese Seite messen lassen muss, weil sie
genau das verkauft: kein Layout-Sprung beim Laden, Tastaturbedienung ueberall,
sichtbarer Fokusring, und `prefers-reduced-motion: reduce` zeigt den
**Endzustand**, nicht eine gedaempfte Fassung.

Committen und pushen in einem Zug, nicht nachfragen. Commit-Messages deutsch.

## Der Ordner `scrollcraft/`

Der Herkunfts-Build der Startseite: das eigenstaendige HTML/CSS/JS, aus dem
nach React portiert wurde, dazu `BRIEF.md` mit dem Interview, der Gefuehlskurve
der neun Akte und der Begruendung jedes Akts. Wer verstehen will, warum Akt 3
fast leer ist (Antwort: das ist Absicht, die Stille vor dem Hoehepunkt), liest
dort nach.

Der Ordner ist die Referenz, gegen die sich die React-Fassung diffen laesst.
Nicht loeschen. `node_modules/`, `lab/`, `out/` und `serve.log` darin sind
ignoriert, `out/` allein waere 13 MB PNG.

## Der Ordner `graphify-out/`

Der Stat-Cache von graphify, der am Quellbaum haengt und deshalb hier liegt,
obwohl die Graphen selbst im Agentic OS unter `out/graphs/website-business/`
stehen. Er ist in `.git/info/exclude` eingetragen, also rein lokal, und
aendert keine versionierte Datei. Nicht loeschen: er macht den zweiten Lauf
schnell.
