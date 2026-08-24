# Webdesign-Portfolio

One-Pager plus drei Fallstudien für Youssefs Webdesign-Angebot. Zielgruppe sind
deutschsprachige Betriebe, die aus einer Kaltakquise-Mail kommen. Der Plan mit
allen Entscheidungen steht in `PLAN.md`.

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
könnte. Kein Supabase, kein Stripe, keine Auth, keine Middleware, keine
Animationsbibliothek.

## Aufbau

```
app/            Routen: /, /arbeit/[slug], /impressum, /datenschutz
components/
  chrome/       Kopfleiste, Fuß, Nachtmodus-Schalter
  sections/     die sieben Sektionen des One-Pagers
  showcase/     Vorher/Nachher-Mechanik und Befund-Marker
content/        alle Texte (copywriter)
lib/            cn.ts, reveal.ts
```

Alle Farben und Schriftgrößen kommen als Tokens aus `app/globals.css`. Keine
Hex-Werte in Komponenten.

## Offene Platzhalter vor einem Livegang

- `/impressum` und `/datenschutz` tragen einen Hinweisbalken und leere Felder.
- Die drei Demo-Projekte sind fiktiv und als solche gekennzeichnet. Das
  Kennzeichen bleibt stehen.
- Kontakt läuft über `mailto:`, es gibt kein Formular und keinen Empfänger.

## Später als Branch ins frostbreaker.app-Repo

Das Projekt hat bewusst kein eigenes Git. Zum Übernehmen im Frostbreaker-Repo
einen Branch anlegen, den Inhalt dieses Ordners dort ablegen (zum Beispiel als
`apps/portfolio`) und die Abhängigkeiten aus der hiesigen `package.json` in die
Zielanwendung übernehmen. Weil Next-, React- und Tailwind-Version identisch
gewählt sind, ist das ein Verschieben von Dateien und kein Portieren.

Zu prüfen ist dabei nur dreierlei:

1. Die `@fontsource-variable`-Pakete müssen im Ziel installiert sein.
2. `app/globals.css` bringt eigene Tokens mit. Sie dürfen die Tokens des
   Hauptprojekts nicht überschreiben, wenn beide im selben Dokument landen.
3. Das Hauptprojekt hat eine Auth-Middleware. Wird das Portfolio dort
   eingehängt, müssen seine Routen im Matcher ausgenommen werden, sonst
   schiebt sie jeden Besucher auf `/login`.
