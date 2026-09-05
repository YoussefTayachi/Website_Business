# Webdesign-Portfolio

Heller Portfolio-One-Pager plus drei Fallstudien für Youssefs
Webdesign-Angebot. Zielgruppe sind Handwerksbetriebe (Bauunternehmen,
Elektriker, Dachdecker), die aus einer Kaltakquise-Mail kommen. **Der
sichtbare Seitentext ist Englisch**, Kommentare, Commits und Doku bleiben
deutsch.

Die Startseite folgt seit dem Redesign vom 2026-08-26 dem Vorbild
designatives.com: weißer Grund, riesige fette Grotesk-Headlines, Königsblau
als Akzent, nummerierte Leistungen, große Fallkarten mit Tag-Pills, mintgrüner
Schlussblock. Das frühere dunkle Scroll-Erlebnis (neun Akte,
scrollcraft-Engine) wurde verworfen und ist aus dem Code entfernt; sein Build
liegt als Referenz in `scrollcraft/`.

Die Arbeitsregeln stehen in `CLAUDE.md`. `PLAN.md` ist der Plan des ersten
Entwurfs und inzwischen Geschichte.

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
Befehle deshalb immer aus diesem Projektordner heraus aufrufen, nicht aus
einem übergeordneten.

## Weitere Befehle

```bash
npm run typecheck    # tsc --noEmit
npm run build        # Produktionsbau
npm start            # gebaute Fassung ausliefern
```

Es gibt keine Tests: das Projekt enthält keine Logik, die man sinnvoll testen
könnte. Kein Supabase, kein Stripe, keine Auth, keine Middleware, keine
Animationsbibliothek. Bewegung läuft über CSS und einen IntersectionObserver
(`components/start/reveal.tsx`).

## Aufbau

```
app/
  layout.tsx            Wurzel: html, body, Schriften, Theme-Skript
  page.tsx              Startseite, setzt die sieben Abschnitte zusammen
  not-found.tsx         globales 404, englisch
  globals.css           Tokens der Unterseiten
  (mit-chrome)/         Route Group mit Kopfleiste, main und Fuß:
                        impressum, datenschutz
  work/[slug]/          eine Seite je Entwurf, sechs Stück, beim Bau erzeugt
  erfassung/            NUR mit CAPTURE=1 eine Route (page.capture.tsx)
components/
  start/                die sieben Abschnitte: leiste, hero, beweis, galerie,
                        arbeit, ablauf, person, schluss, fuss; dazu
                        reveal.tsx, modus.tsx, kalender.tsx, geraet.tsx,
                        zeichnungen.tsx, tokens.css, start.css
  entwuerfe/            die sechs Entwürfe: entwurf.tsx (sechs Bauformen)
                        und entwurf.css
  chrome/               Kopfleiste, Fuß, Nachtmodus-Schalter (Unterseiten)
  showcase/             Vorher/Nachher-Mechanik und Demo-Fassungen, wird von
                        keiner Route mehr geladen
content/
  start.ts              aller Text der Startseite und der Entwurfsseiten
  entwuerfe.ts          die sechs Entwürfe als Daten, englisch
  seite.ts              Kopfleiste, Fuß, Impressum, Datenschutz
  projekte.ts           die drei alten Fallstudien, noch deutsch, ungenutzt
lib/                    cn.ts, reveal.ts, media.ts, demo-fassungen.ts
scripts/                aufnahmen.mjs (Bilder), pruefbilder.mjs (Prüfung)
scrollcraft/            der Build des verworfenen Scroll-Designs, Referenz
```

Die Startseite bringt eigene Kopfleiste, eigenes `<main>` und eigenen Fuß
mit. Deshalb trägt das Wurzel-Layout keine Chrome, und die drei übrigen
Routen holen sie sich aus der Route Group `(mit-chrome)`.

Farben und Schriftgrößen kommen als Tokens: für die Startseite aus
`components/start/tokens.css` (Präfix `--st-`), für die übrigen Seiten aus
`app/globals.css`. Keine Hex-Werte in Komponenten.

Schriften liegen lokal als `@fontsource-variable`-Pakete.

**Genau eine fremde Domain wird angefragt:** der Buchungskalender von
Calendly im Schlussblock. Er lädt seit dem 2026-09-05 ohne Klick, sobald der
Block 600px vor dem Fenster steht; bis dahin stellt die Seite keine einzige
Anfrage nach außen. Der Datenschutztext sagt genau das (`content/seite.ts`,
zwei Abschnitte), und unter dem Kalender steht eine Zeile dazu. Wer das
ändert (Klick davor, oder Laden mit der Seite), schreibt alle drei Stellen um
(siehe CLAUDE.md).

## Offene Platzhalter vor einem Livegang

- `/impressum` und `/datenschutz` tragen einen Hinweisbalken und leere
  Felder. Sie sind englisch. Ob zusätzlich eine deutsche Fassung nötig ist,
  muss Youssef vor dem Livegang klären: seine Kunden sind deutsche Betriebe.
- Die sechs Entwürfe zeigen erfundene Betriebe. Auf der Startseite tragen
  sie kein Kennzeichen (der Abschnitt heißt „what your page could look
  like" und behauptet nichts), auf `/work/[slug]` schon: dort steht der Name
  eines Betriebs als Überschrift, und ohne die eine Zeile läse sich die Seite
  wie eine Fallstudie.
- Youssefs Mentor riet, die Entwürfe auf **echte** Betriebe zu setzen. Das
  ist für den Prototyp in einer Kaltakquise-Mail richtig und für eine
  öffentliche Galerie eine offene Entscheidung: dort stünde der Name eines
  fremden Unternehmens unter einer Gestaltung, die es nie beauftragt hat.
  Bis ein Betrieb zustimmt, bleiben die Namen erfunden.
- Kontakt läuft über `mailto:` und den Kalender. Es gibt kein eigenes
  Formular und keinen Empfänger im Backend.
- `content/projekte.ts` und `components/showcase/` werden von keiner Route
  mehr geladen, seit der Vorher/Nachher-Vergleich gestrichen ist. Löschen
  ist eine offene Entscheidung.

## Später als Branch ins frostbreaker.app-Repo

Das Projekt hat ein eigenes Git (`github.com/YoussefTayachi/Website_Business`).
Zum Übernehmen im Frostbreaker-Repo einen Branch anlegen, den Inhalt dieses
Ordners dort ablegen (zum Beispiel als `apps/portfolio`) und die
Abhängigkeiten aus der hiesigen `package.json` in die Zielanwendung
übernehmen. Weil Next-, React- und Tailwind-Version identisch gewählt sind,
ist das ein Verschieben von Dateien und kein Portieren.

Zu prüfen ist dabei nur dreierlei:

1. Die `@fontsource-variable`-Pakete müssen im Ziel installiert sein.
2. `app/globals.css` und `components/start/tokens.css` bringen eigene Tokens
   mit. Sie dürfen die Tokens des Hauptprojekts nicht überschreiben, wenn
   beide im selben Dokument landen.
3. Das Hauptprojekt hat eine Auth-Middleware. Wird das Portfolio dort
   eingehängt, müssen seine Routen im Matcher ausgenommen werden, sonst
   schiebt sie jeden Besucher auf `/login`.
