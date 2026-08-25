# CLAUDE.md

Anleitung fuer Claude Code in diesem Ordner.

## Was das hier ist

Ein One-Pager plus drei Fallstudien fuer Youssefs Webdesign-Angebot. Die Leute,
die hier ankommen, kommen aus einer Kaltakquise-Mail, in der ein konkreter
Mangel an ihrer eigenen Website benannt wurde. Diese Seite loest das ein.

Daraus folgt die Regel, an der alles haengt: **der Beweis ist die Seite
selbst.** Wer einem Betrieb schreibt, seine Website sei zu langsam, und dann
auf eine Seite verlinkt, die ruckelt, hat das Gespraech beendet, bevor es
anfing.

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

Texte, Kommentare und Doku auf Deutsch, Bezeichner englisch.

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
app/            Routen: /, /arbeit/[slug], /impressum, /datenschutz
components/
  chrome/       Kopfleiste, Fuss, Nachtmodus-Schalter
  sections/     die sieben Sektionen des One-Pagers
  showcase/     Vorher/Nachher-Mechanik, Befund-Marker, die sechs Demo-Fassungen
content/        aller sichtbare Text
lib/            cn.ts, reveal.ts, media.ts, demo-fassungen.ts
```

**Text gehoert nach `content/`**, nicht in eine Komponente. Wer eine
Ueberschrift direkt ins JSX schreibt, versteckt sie vor dem naechsten, der die
Texte durchgeht.

**Farben und Schriftgroessen kommen als Tokens aus `app/globals.css`.** Keine
Hex-Werte in Komponenten. Ein Hex-Wert im JSX ueberlebt den Nachtmodus nicht.

## Was hier bewusst fehlt

Kein Supabase, kein Stripe, keine Auth, keine Middleware, keine
Animationsbibliothek, keine fremden Stockfotos. Alles Sichtbare ist gebaut, aus
CSS, SVG und Typografie.

Das ist keine Sparsamkeit, sondern das Argument: ein Portfolio, das 40 kB
Framer Motion fuer einen Schieber laedt, widerlegt sich selbst. Bevor du eine
Abhaengigkeit hinzufuegst, pruefe, ob CSS und Web Animations reichen. Fuer die
drei Bewegungsmomente in `PLAN.md` reichen sie.

Server Components sind der Standard. `"use client"` nur dort, wo Zeiger,
Tastatur oder `IntersectionObserver` gebraucht werden: Vorher/Nachher, Reveal,
Nachtmodus-Schalter, Kopfleiste.

## Vor dem Push

`npm run typecheck` und `npm run build` muessen fehlerfrei durchlaufen. Es gibt
keine CI, die das nachholt.

Dazu die drei Dinge, an denen sich diese Seite messen lassen muss, weil sie
genau das verkauft: kein Layout-Sprung beim Laden, Tastaturbedienung ueberall,
sichtbarer Fokusring.

Committen und pushen in einem Zug, nicht nachfragen. Commit-Messages deutsch.

## Der Ordner `graphify-out/`

Der Stat-Cache von graphify, der am Quellbaum haengt und deshalb hier liegt,
obwohl die Graphen selbst im Agentic OS unter `out/graphs/website-business/`
stehen. Er ist in `.git/info/exclude` eingetragen, also rein lokal, und
aendert keine versionierte Datei. Nicht loeschen: er macht den zweiten Lauf
schnell.
