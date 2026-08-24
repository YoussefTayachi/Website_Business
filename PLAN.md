# Implementierungsplan: Portfolio-Website Webdesign

Stand: 2026-08-23. Zielordner: `C:\Users\Youssef Tayachi\Desktop\Website Business`.
Eigenständiges Next.js-Projekt, kein Git, kein Deployment. Später als Branch in
das frostbreaker.app-Repo übernehmbar, deshalb technisch identische Basis
(Next.js 15 App Router, React 19, Tailwind v4, TypeScript strict).

---

## 1. Die Ausgangslage, ehrlich benannt

Der Besucher kommt aus einer Kaltakquise-Mail. Er ist skeptisch. In dieser Mail
stand ein konkreter Befund über *seine* Website: zu langsam, unlesbar auf dem
Handy, Design von 2011, kein erkennbarer nächster Schritt. Er klickt, um zu
prüfen, ob der Absender das überhaupt beurteilen kann.

Daraus folgt, was diese Seite leisten muss und was nicht:

- Sie muss den Befund aus der Mail **einlösen**, nicht wiederholen.
- Sie hat keine echten Referenzen. Erfundene wären der schnellste Weg, das
  Vertrauen zu verlieren, das die Mail gerade aufgebaut hat.
- Sie braucht keine Navigation über sieben Punkte. Ein Kaltklick liest eine
  Bahn, nicht ein Menü.

## 2. Die tragende Entscheidung

**Der Beweis ist die Seite selbst, und die Seite zeigt den Befund.**

Statt zu behaupten, Youssef könne gutes Webdesign, stellt die Seite das
Problem und seine Lösung nebeneinander und lässt den Besucher selbst
umschalten. Das Herzstück ist eine Fläche, in der eine bewusst schlechte
Website eines offensichtlich fiktiven Betriebs **live gerendert** steht, nicht
als Screenshot: gequetschte Zeilen, Grauverlauf, blaue Unterstreichungen,
Kontrast unter der Grenze, ein CTA, den man suchen muss. Daneben, per Schieber
oder Umschalter erreichbar, dieselbe Firma neu gebaut.

Über der schlechten Fassung liegen **Messschilder**: Haarlinien mit
Monoschrift-Beschriftung, die auf einzelne Stellen zeigen und benennen, was
dort nicht stimmt. Genau die Sprache, in der ein Prüfbericht spricht, und
genau die Befunde, die Youssef in seinen Mails anspricht.

Warum das und nicht ein Standard-Portfolio-Raster: ein Raster mit
Projektbildern setzt voraus, dass der Besucher Bilder von Websites bewerten
kann und will. Der Kontrast zwischen zwei begehbaren Fassungen setzt das nicht
voraus. Er wirkt sofort, und er beweist Handwerk in beide Richtungen: die
schlechte Fassung überzeugend schlecht zu bauen ist selbst eine
Gestaltungsleistung.

## 3. Visuelle Richtung

Nicht der zurückhaltende Werkzeug-Look von Frostbreaker, aber auch nicht
Berlin-Startup-Neon. Zielkunden sind deutschsprachige Betriebe, die noch eine
Website von 2011 haben: Handwerk, Kanzleien, Praxen, Autohäuser, Gastronomie.
Für die muss die Seite **teuer und seriös** wirken, nicht laut.

**Richtung: editorial und messtechnisch.** Eine hochwertige Publikation, in der
jemand mit dem Lineal Befunde einträgt.

| Ebene | Festlegung |
|---|---|
| Grundton hell | warmes Papier, kein reines Weiß |
| Grundton dunkel | tiefe Tinte, kein reines Schwarz, vollwertiges Pendant |
| Display-Schrift | Serif mit Charakter, groß und selbstbewusst gesetzt |
| Fließ- und UI-Schrift | präzise Grotesk (Inter Variable, wie im Hauptprojekt) |
| Messschilder | Monoschrift, ~10px, weit gesperrt, Versalien |
| Akzent | **genau einer**, kräftig, für CTA und Befund-Marker |
| Flächen | Haarlinien statt Kästen, Eckwinkel statt Rahmen, kaum Schatten |
| Verläufe | nur wo etwas Material darstellt, nie als Zierde |

Die konkreten Werte (Hex, Typo-Skala, Font-Pairing, Spacing-Skala) legt der
ui-designer fest, mit `frontend-design` und `ui-ux-pro-max`. Bindend ist die
Token-Architektur nach Frostbreaker-Vorbild: CSS-Variablen auf `:root` und
`.dark`, per `@theme inline` an Tailwind v4 gebunden, `@custom-variant dark`.
Keine Hex-Werte in Komponenten.

Schriften über `@fontsource-variable`-Pakete, nicht über ein CDN. Dieselbe
Entscheidung wie im Hauptprojekt und Voraussetzung dafür, dass die Seite ohne
fremde Anfrage lädt.

## 4. Bewegungskonzept

Motion-Budget bewusst gedeckelt. Drei Momente tragen die Seite, alles andere
ist ruhig:

1. **Der Einstieg.** Die Überschrift setzt sich, das Haarlinien-Raster zeichnet
   sich einmal. Einmalig, unter 900ms, danach steht es.
2. **Der Umschlag.** Vorher zu Nachher. Der eine Moment, für den die Seite
   gebaut ist. Er muss sich anfühlen, als ob Material bewegt wird, und er muss
   unterbrechbar sein: wer den Schieber zurückzieht, bekommt ihn sofort zurück.
3. **Der Befund.** Die Messschilder zeichnen sich gestaffelt auf die schlechte
   Fassung, wenn die Sektion in den Blick kommt. Einmal, nicht bei jedem Scroll.

Regeln, aus dem Hauptprojekt übernommen:

- Standard-Easing `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- Nur `opacity`, `transform`, `clip-path`, `stroke-dashoffset` animieren.
- **Keine Dauerschleifen im Sichtfeld**, mit einer möglichen Ausnahme im Hero.
- `prefers-reduced-motion: reduce` schaltet jede Animation ab und zeigt den
  Endzustand. Kein „dezenteres" Fallback, sondern der fertige Zustand.
- Scroll-Reveals über `IntersectionObserver`, jedes Element genau einmal.

Der ui-designer nutzt dafür `animate` und `animation-vocabulary`, für Material
und Zurückhaltung `apple-design`.

## 5. Seitenstruktur

Bewusst klein. Fünf Routen, davon zwei rechtlich.

### `/` (One-Pager)

| # | Sektion | Aufgabe | Besonderheit |
|---|---|---|---|
| 1 | Hero | In sieben Sekunden klarmachen, was hier passiert | Display-Serif, Haarlinienraster, ein CTA |
| 2 | Der Befund | Die Weckung: was an alten Websites Geld kostet | Messschild-Sprache, keine Zahlen ohne Quelle |
| 3 | **Showcase** | Vorher/Nachher, begehbar | **Das Herzstück.** 3 Demo-Projekte |
| 4 | Leistungen | Was Youssef baut | knapp, drei bis vier Blöcke |
| 5 | Prozess | Wie es abläuft, Angst nehmen | vier Schritte, nummeriert |
| 6 | Über Youssef | Warum ausgerechnet er | ehrlich, ohne Agentur-Plural |
| 7 | Kontakt | Der nächste Schritt | ein Weg, nicht drei |
| 8 | Fuß | Rechtliches, Nachtmodus | |

### `/arbeit/[slug]`

Drei Detailseiten, eine je Demo-Projekt. Hier lebt die Tiefe: die schlechte
Fassung ganzflächig mit allen Befunden, die neue Fassung ganzflächig, dazwischen
die Begründung jeder Entscheidung. Zweiter großer Gestaltungsmoment nach dem
Hero.

### `/impressum` und `/datenschutz`

Pflicht in Deutschland und bei dieser Zielgruppe ein Glaubwürdigkeitsloch, wenn
sie fehlen. Youssefs echte Daten sind nicht bekannt, deshalb **klar markierte
Platzhalter** mit einem Hinweisbalken, den er vor dem Livegang entfernt.

### Was bewusst fehlt

Blog, Preisseite, Kontaktformular mit Backend, CMS, Sprachumschalter,
Cookie-Banner, Kundenlogos, Testimonials, Zahlen-Ticker.

Zum Sprachumschalter: **nein.** Die Zielkunden sind deutschsprachig. Ein
halbgepflegter englischer Zweig wäre ein Qualitätsrisiko genau dort, wo die
Seite Qualität beweisen soll. Weniger Fläche, mehr Politur.

Zum Kontaktformular: ohne Deployment gibt es keinen Empfänger. Also `mailto:`
mit vorbereitetem Betreff plus ein deutlich markierter Platz für einen
Terminlink. Ein Formular, das ins Leere schreibt, wäre schlimmer als keines.

## 6. Die drei Demo-Projekte

Fiktive Betriebe aus Branchen, die Youssefs Zielgruppe entsprechen. Vorschlag
für die Zuschnitte, Namen und Texte macht der copywriter:

1. **Handwerk** (Elektro, Sanitär, Dach). Typisch: Baukasten-Seite von 2012,
   Telefonnummer als Bild, kein Formular, mobil unbrauchbar.
2. **Gastronomie**. Typisch: Speisekarte als PDF, Startbild 4 MB, Öffnungszeiten
   nur auf Facebook aktuell.
3. **Kanzlei oder Praxis**. Typisch: Textwüste, Serifen in 11px, kein
   Terminweg, Stockfoto mit Handschlag.

**Harte Regel: keine erfundenen Referenzen.** Jeder Name muss auch ohne Label
als Beispiel erkennbar sein, **und** jede Karte, jede Detailseite trägt ein
sichtbares Kennzeichen „Demo, fiktives Beispiel". Keine Logos, die wie echte
Marken aussehen. Keine Testimonials. Keine Kennzahlen wie „+340 % Anfragen".

Die Befunde in den Messschildern beschreiben, was in der gezeigten schlechten
Fassung **tatsächlich zu sehen ist** (Kontrastwert, Schriftgröße, Tap-Ziel in
Pixeln). Keine erfundenen Ladezeiten.

## 7. Komponentenarchitektur

```
app/
  layout.tsx              Schriften, Theme-Skript, Metadata
  globals.css             Tokens, @theme inline, Keyframes
  page.tsx                One-Pager: setzt Sektionen zusammen
  arbeit/[slug]/page.tsx  Fallstudie
  impressum/page.tsx
  datenschutz/page.tsx
components/
  chrome/                 Kopfleiste, Fuß, Nachtmodus-Schalter
  sections/               hero, befund, showcase, leistungen,
                          prozess, ueber, kontakt
  showcase/
    vorher-nachher.tsx    Schiebe-/Umschaltmechanik
    befund-marker.tsx     Messschild mit Linie
    demos/
      <slug>-alt.tsx      die bewusst schlechte Fassung
      <slug>-neu.tsx      die neue Fassung
  ui/                     Knopf, Marke, Abschnittsmarke, Reveal
content/
  projekte.ts             Demo-Projekte, Befunde, Fallstudientexte
  seite.ts                alle übrigen Texte
lib/
  reveal.ts               IntersectionObserver-Hook
  cn.ts
```

**Regel für die Demo-Fassungen:** die schlechte Fassung wird in einer
`.alt-fassung`-Insel gerendert, deren Stile ausschließlich innerhalb dieser
Klasse gelten. Kein Token, keine Schrift und keine Regel von dort darf nach
außen wirken. Dasselbe Vorgehen wie `.fb-hud` im Hauptprojekt.

## 8. Technische Festlegungen

- Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4 über
  `@tailwindcss/postcss`. Konfigurationsdateien 1:1 nach dem Vorbild in
  `apps/web` (`next.config.mjs`, `postcss.config.mjs`, `tsconfig.json` mit
  `@/*`-Alias).
- **Keine** Supabase-, Stripe-, Auth- oder Middleware-Abhängigkeit.
- Server Components als Standard. `"use client"` nur dort, wo Zeiger, Tastatur
  oder `IntersectionObserver` gebraucht werden: Vorher/Nachher, Reveal,
  Nachtmodus-Schalter, Kopfleiste.
- Nachtmodus wie im Hauptprojekt: `localStorage`-Skript im `<head>` setzt
  `.dark` vor dem ersten Bild, `suppressHydrationWarning`.
- Bilder: keine fremden Stockfotos. Alles Sichtbare ist gebaut (CSS, SVG,
  Typografie). Das ist gleichzeitig die Performance-Entscheidung und die
  ehrlichste Demonstration.
- Keine Animationsbibliothek. CSS und Web Animations reichen für drei Momente,
  und ein Portfolio, das 40 kB Framer Motion für einen Schieber lädt, widerlegt
  sich selbst.
- Ziel: kein Layout-Sprung beim Laden, Tastaturbedienung überall, sichtbarer
  Fokusring, `npx tsc --noEmit` und `npm run build` fehlerfrei.

## 9. Reihenfolge und Zuständigkeit

Aufgeteilt nach Dateibesitz, damit sich zwei Agenten nie in derselben Datei
begegnen.

| Zug | Wer | Auftrag | Fertig, wenn |
|---|---|---|---|
| 1a | ui-designer | Designsystem: `app/globals.css` mit allen Tokens, Typo-Skala, Keyframes, Dark Mode. Font-Pairing festlegen. | CSS liegt, Fontpakete benannt |
| 1b | copywriter | `content/seite.ts` und `content/projekte.ts`, alle Texte deutsch | Dateien liegen, typisiert |
| 1c | senior-developer | Projektgerüst: package.json, Konfigs, layout.tsx, leere Routen, Nachtmodus, `lib/` | `npm run dev` läuft |
| 2a | senior-developer | Mechanik: `vorher-nachher.tsx`, `befund-marker.tsx`, Reveal-Hook, Fallstudien-Route | Schieber funktioniert, Tastatur bedienbar |
| 2b | ui-designer | Die sechs Demo-Fassungen (drei alt, drei neu) | Kontrast wirkt |
| 3 | ui-designer | Alle Sektionen gestalten und in Bewegung setzen | Seite steht |
| 4 | ui-designer | Prüfung: Zugänglichkeit, schmale Fenster, Nachtmodus, reduced-motion | Befunde behoben |
| 5 | senior-developer | Verifikation: `npm install`, `npm run dev`, `tsc --noEmit`, `npm run build` | Alles grün |

## 10. Sprachregeln für alle Beteiligten

- Alle Texte, Kommentare und Bezeichner-Kommentare deutsch. Bezeichner selbst
  englisch, wie im Hauptprojekt.
- **Keine Gedankenstriche („—") in sichtbaren Texten.** Doppelpunkt, Komma oder
  Klammer stattdessen.
- Kein Agentur-Plural („wir gestalten digitale Erlebnisse"). Es ist eine Person.
- Keine erfundenen Zahlen: keine Prozentwerte, keine Ladezeiten, keine
  Kundenzahlen, keine Preise, die nicht abgestimmt sind.
