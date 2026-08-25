# Webdesign-Portfolio

Scroll-Erlebnis-Seite plus drei Fallstudien für Youssefs Webdesign-Angebot.
Zielgruppe sind Handwerksbetriebe (Bauunternehmen, Elektriker, Dachdecker), die
aus einer Kaltakquise-Mail kommen. **Der sichtbare Seitentext ist Englisch**,
Kommentare, Commits und Doku bleiben deutsch.

Die Startseite ist in neun Akte gegliedert, die beim Scrollen ablaufen. Ihr
Kern steht in Akt 4: zwei Mini-Websites im selben Rahmen, die schlechte ruckelt
beim Scrollen wirklich, die neue folgt dem Rad ohne Verzug. Der Besucher fühlt
den Unterschied, bevor er einen Satz darüber liest.

Der Plan mit allen Entscheidungen steht in `PLAN.md`, die Arbeitsregeln in
`CLAUDE.md`, das Interview und die Begründung der neun Akte in
`scrollcraft/builds/casefile/BRIEF.md`.

Eigenständiges Projekt, technisch auf derselben Basis wie `apps/web` im
Frostbreaker-Repo: Next.js 15 (App Router), React 19, Tailwind v4 über
`@tailwindcss/postcss`, TypeScript strict.

## Starten

```bash
npm install
npm run dev          # http://localhost:3000
```

Läuft parallel schon etwas auf Port 3000 (zum Beispiel der Frostbreaker-Dev),
dann mit einem anderen Port starten:

```bash
npm run dev -- -p 3200
```

Tailwind v4 löst seine Pfade gegen das aktuelle Arbeitsverzeichnis auf. Die
Befehle deshalb immer aus diesem Projektordner heraus aufrufen, nicht aus einem
übergeordneten.

## Weitere Befehle

```bash
npm run typecheck    # tsc --noEmit
npm run build        # Produktionsbau
npm start            # gebaute Fassung ausliefern
```

Es gibt keine Tests: das Projekt enthält keine Logik, die man sinnvoll testen
könnte. Kein Supabase, kein Stripe, keine Auth, keine Middleware.

Zur Animationsbibliothek gilt eine einzige Ausnahme: die scrollcraft-Engine,
die die Startseite trägt. Sie ist eigenes Vanilla JS und CSS ohne
Abhängigkeiten, liegt als statische Datei in `public/scrollcraft/` und lädt nur
auf `/`. Begründung in `CLAUDE.md`, Abschnitt „Was hier bewusst fehlt".

## Aufbau

```
app/
  layout.tsx            Wurzel: html, body, Schriften, Theme-Skript
  page.tsx              Startseite, setzt die neun Akte zusammen
  globals.css           Tokens der Rechts- und Fallstudienseiten
  (mit-chrome)/         Route Group mit Kopfleiste, main und Fuß:
                        impressum, datenschutz, arbeit/[slug]
components/
  start/                die neun Akte, Leiste, Skriptlader,
                        scrollcraft.css, page.css, tokens.css
  chrome/               Kopfleiste, Fuß, Nachtmodus-Schalter
  showcase/             Vorher/Nachher-Mechanik, Befund-Marker,
                        sechs Demo-Fassungen (nur noch /arbeit)
content/
  start.ts              aller Text der Startseite, englisch
  seite.ts              Kopfleiste, Fuß, Impressum, Datenschutz
  projekte.ts           die drei Fallstudien, noch deutsch
lib/                    cn.ts, reveal.ts, media.ts, demo-fassungen.ts
public/scrollcraft/     Engine, Signature Move, zwei Stills
scrollcraft/            der Herkunfts-Build samt BRIEF.md
```

Die Startseite bringt eigene Kopfleiste, eigenes `<main>` und einen in den
Schlussakt eingefalteten Fuß mit. Deshalb trägt das Wurzel-Layout keine Chrome
mehr, und die drei übrigen Routen holen sie sich aus der Route Group
`(mit-chrome)`. Die URLs haben sich dabei nicht geändert.

Farben und Schriftgrößen kommen als Tokens: für die Rechts- und
Fallstudienseiten aus `app/globals.css`, für die Startseite aus
`components/start/tokens.css`. Keine Hex-Werte in Komponenten.

Schriften liegen lokal als `@fontsource-variable`-Pakete (Fraunces, Archivo,
JetBrains Mono für die Startseite, Inter und Newsreader für die übrigen). Die
Seite stellt **keine Anfrage an eine fremde Domain**, und der Datenschutztext
behauptet genau das.

## Offene Platzhalter vor einem Livegang

- `/impressum` und `/datenschutz` tragen einen Hinweisbalken und leere Felder.
  Sie sind englisch. Ob zusätzlich eine deutsche Fassung nötig ist, muss
  Youssef vor dem Livegang klären: seine Kunden sind deutsche Betriebe.
- Die drei Demo-Projekte sind fiktiv und als solche gekennzeichnet. Das
  Kennzeichen bleibt stehen.
- Kontakt läuft über `mailto:`, es gibt kein Formular und keinen Empfänger.
- `/arbeit/[slug]` ist noch deutsch und trägt deshalb `robots: { index: false }`.
  Von der Startseite führt kein Link dorthin. Übersetzen oder entfernen ist
  eine offene Entscheidung.
- Die Kopfleiste der Route Group verlinkt noch auf `/#showcase`. Diesen Anker
  gibt es auf der neuen Startseite nicht mehr, im Code als `OFFEN` markiert.

## Später als Branch ins frostbreaker.app-Repo

Das Projekt hat inzwischen ein eigenes Git
(`github.com/YoussefTayachi/Website_Business`). Zum Übernehmen im
Frostbreaker-Repo einen Branch anlegen, den Inhalt dieses Ordners dort ablegen
(zum Beispiel als `apps/portfolio`) und die Abhängigkeiten aus der hiesigen
`package.json` in die Zielanwendung übernehmen. Weil Next-, React- und Tailwind-Version identisch
gewählt sind, ist das ein Verschieben von Dateien und kein Portieren.

Zu prüfen ist dabei nur dreierlei:

1. Die `@fontsource-variable`-Pakete müssen im Ziel installiert sein.
2. `app/globals.css` bringt eigene Tokens mit. Sie dürfen die Tokens des
   Hauptprojekts nicht überschreiben, wenn beide im selben Dokument landen.
3. Das Hauptprojekt hat eine Auth-Middleware. Wird das Portfolio dort
   eingehängt, müssen seine Routen im Matcher ausgenommen werden, sonst
   schiebt sie jeden Besucher auf `/login`.
