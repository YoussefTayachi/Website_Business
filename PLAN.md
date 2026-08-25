# Implementierungsplan: Portfolio-Website Webdesign

Stand: 2026-08-23, teilweise überholt am 2026-08-25.
Zielordner: `C:\Users\Youssef Tayachi\Desktop\Website Business`.
Eigenständiges Next.js-Projekt. Später als Branch in das frostbreaker.app-Repo
übernehmbar, deshalb technisch identische Basis (Next.js 15 App Router,
React 19, Tailwind v4, TypeScript strict).

---

## Stand 2026-08-25: das scrollcraft-Redesign

Die Startseite wurde neu gebaut. Sie ist kein statischer One-Pager mehr,
sondern eine Scroll-Erlebnis-Seite aus neun Akten, getragen von einer eigenen
Vanilla-JS-Engine. Der Weg dahin: zuerst als eigenständige HTML/CSS/JS-Seite
gebaut und im Browser verifiziert (`scrollcraft/builds/casefile/`, mit
`BRIEF.md` als Interview und Begründung), dann nach React portiert.

**Was der Nutzer für dieses Redesign ausdrücklich aufgehoben hat.** Die drei
Punkte sind Entscheidungen, keine Versäumnisse:

| Frühere Festlegung | Steht in | Gilt jetzt |
|---|---|---|
| Alle sichtbaren Texte deutsch | §10, §3 | **Englisch.** Kommentare, Commits und Doku bleiben deutsch. |
| Kein Sprachumschalter, weil die Zielkunden deutschsprachig sind | §5 | Weiterhin kein Umschalter, aber aus dem umgekehrten Grund: es gibt genau eine Sprache, und das ist Englisch. |
| Keine Animationsbibliothek | §8 | Eine Ausnahme: die scrollcraft-Engine. Kein React-Framework wie Framer Motion, sondern eigenes Vanilla JS und CSS ohne Abhängigkeiten, statisch in `public/scrollcraft/`, lädt nur auf `/`. Ohne eine Scroll-Engine ist der Signature Move nicht baubar. |

Dazu eine neue Leitlinie, die für alles Weitere gilt: **80 Prozent visuell,
20 Prozent Text.** Was man zeigen kann, wird gezeigt und nicht beschrieben.

**Der Signature Move.** In Akt 4 stehen zwei Mini-Websites im selben Rahmen.
Die schlechte Fassung ruckelt beim Scrollen wirklich: ihre innere Bahn wird auf
einem gedrosselten, unregelmäßigen Zeitplan gemalt und holt ihren Rückstand nie
auf, so wie es der Paint-Thread einer langsamen Seite unter einem schnellen
Scroll tut. Die neue Fassung folgt dem Rad in jedem Frame, 1:1. Der Besucher
fühlt den Unterschied in der Hand, bevor er einen Satz darüber gelesen hat.
Das ist die eine Sache, die diese Seite kann und ein Standard-Portfolio nicht,
und sie ist der Grund, warum §4 (Bewegungskonzept) und §7
(Komponentenarchitektur) unten nur noch historisch gelten.

**Die neun Akte**, mit dem Gefühl, das jeder tragen soll:

| # | Akt | Gefühl | Bauart |
|---|---|---|---|
| 1 | Hero | Verdacht, Kälte | gepinnt, Iris-Enthüllung auf ein Still |
| 2 | Befund | wachsende Unruhe | fließend, drei Befunde nacheinander |
| 3 | Scharnier | angehaltener Atem | fließend, **absichtlich fast leer** |
| 4 | Vergleich | Erleichterung (**der Höhepunkt**) | gepinnt, größte Spanne, der Signature Move |
| 5 | Weitere Fälle | Neugier, Bestätigung | seitlich schwenkend, zwei weitere Gewerke |
| 6 | Leistungen | Klarheit | fließend, drei Aussagen |
| 7 | Prozess | Zuversicht | schwenkend, vier Schritte auf einer Haarlinie |
| 8 | Über | Nähe | fließend, erste Person, ein Still |
| 9 | Kontakt | Entschluss | gepinnt, ein `mailto:`, Fuß eingefaltet |

Akt 3 ist kein Defekt. Die Stille vor dem Höhepunkt ist gebaut, nicht
vergessen.

**Was das strukturell nach sich zog.** Die Startseite bringt eigene
Kopfleiste, eigenes `<main id="top">` und einen in Akt 9 eingefalteten Fuß mit.
Das Wurzel-Layout darf deshalb keine Chrome mehr tragen, sonst stünden zwei
Kopfleisten und zwei verschachtelte `<main>` auf der Seite. Die drei übrigen
Routen holen sich die Chrome aus der Route Group `(mit-chrome)`. Die URLs sind
unverändert geblieben.

Die vier Stylesheets der Startseite werden aus `app/page.tsx` importiert, nie
aus einem Layout: `page.css` benutzt sehr allgemeine Selektoren, und die
`--sc-*`-Tokens würden sonst das Impressum tiefschwarz einfärben.

Der aktuelle Aufbau steht in `README.md`, die Arbeitsregeln in `CLAUDE.md`.
Die Abschnitte 1, 2 und 6 unten gelten unverändert weiter. Die Abschnitte 3
bis 5 und 7 bis 10 sind an den markierten Stellen überholt.

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

> **Teilweise überholt (2026-08-25).** Gilt weiter für `/arbeit/[slug]`,
> `/impressum` und `/datenschutz`. Die Startseite folgt seit dem
> scrollcraft-Redesign einer eigenen Richtung: Kino-Tech-Noir, tiefdunkler
> Grund, ein hartes Führungslicht, ein warmer Akzent, dazu dieselbe
> Messschild-Sprache aus Haarlinien und Monoschrift. Nur dunkel, kein
> Nachtmodus-Schalter: eine Kinoseite hat keine Tagfassung. Ihre Tokens stehen
> in `components/start/tokens.css`, die Begründung in
> `scrollcraft/builds/casefile/BRIEF.md`.
>
> Auch die Zielgruppenzeile unten ist überholt: seit dem Pivot sind es
> Bauunternehmen, Elektriker und Dachdecker, und die Seite spricht Englisch.

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

> **Für die Startseite überholt (2026-08-25).** Die drei Momente unten
> beschreiben den alten One-Pager. Die Bewegung der Startseite kommt jetzt aus
> der scrollcraft-Engine: gepinnte und fließende Akte, ein seitlicher Schwenk,
> ein wandernder Grundton, und in Akt 4 der Signature Move. Die Regeln
> darunter gelten trotzdem alle weiter, besonders diese:
> `prefers-reduced-motion: reduce` zeigt den **Endzustand**, nicht eine
> gedämpfte Fassung, und das Ruckeln der schlechten Demo verschwindet dabei
> vollständig. Es ist der Beweis der Seite, aber es ist auch Bewegung, und für
> jemanden mit Bewegungsempfindlichkeit hat es nichts zu suchen.

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

> **Überholt (2026-08-25).** Die sieben Sektionen sind durch die neun Akte
> oben ersetzt, die Komponenten unter `components/sections/` sind gelöscht.
> Die Zuordnung ist im Kern erhalten geblieben: aus Sektion 3 (Showcase) sind
> die Akte 3 bis 5 geworden, und der Fuß ist in Akt 9 eingefaltet statt im
> Layout.

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

> **Nachtrag (2026-08-25).** Die Route steht noch, ist aber deutsch geblieben,
> während die Startseite englisch spricht, und von der Startseite führt kein
> Link mehr dorthin. Sie trägt deshalb `robots: { index: false }`. Ob sie
> übersetzt oder entfernt wird, ist offen. Der Grund für den Aufschub: von der
> Kaltakquise-Mail führt der Klick auf `/`, und der Beweis liegt seit dem
> Redesign vollständig in Akt 4. Drei tiefe Unterseiten zu übersetzen wäre die
> teuerste Arbeit an der Stelle mit der geringsten Wirkung.

### `/impressum` und `/datenschutz`

Pflicht in Deutschland und bei dieser Zielgruppe ein Glaubwürdigkeitsloch, wenn
sie fehlen. Youssefs echte Daten sind nicht bekannt, deshalb **klar markierte
Platzhalter** mit einem Hinweisbalken, den er vor dem Livegang entfernt.

### Was bewusst fehlt

Blog, Preisseite, Kontaktformular mit Backend, CMS, Sprachumschalter,
Cookie-Banner, Kundenlogos, Testimonials, Zahlen-Ticker.

Zum Sprachumschalter: **nein, aber die Begründung hat sich umgedreht
(2026-08-25).** Der alte Grund steht unten und gilt nicht mehr: die Seite ist
seit dem scrollcraft-Redesign englisch. Der Umschalter fehlt trotzdem, und
zwar aus genau demselben Argument, nur andersherum gelesen: es gibt eine
Sprache, und sie ist gepflegt. Ein halbgepflegter zweiter Zweig, egal in
welche Richtung, wäre ein Qualitätsrisiko genau dort, wo die Seite Qualität
beweisen soll. Wer eine deutsche Fassung will, baut sie als eigenes Vorhaben.

Der überholte Wortlaut, zur Nachvollziehbarkeit: *„Die Zielkunden sind
deutschsprachig. Ein halbgepflegter englischer Zweig wäre ein Qualitätsrisiko
genau dort, wo die Seite Qualität beweisen soll. Weniger Fläche, mehr
Politur."*

Ein Rest davon bleibt offen und gehört ehrlich benannt: die Zielkunden **sind**
deutschsprachige Betriebe, und die Seite spricht sie jetzt auf Englisch an.
Das ist eine bewusste Entscheidung des Nutzers, kein Versehen. Ob sie sich in
der Antwortquote rechnet, ist ungemessen und lässt sich nur an echten Zahlen
aus der Kaltakquise entscheiden, nicht am Schreibtisch.

Zum Kontaktformular: ohne Deployment gibt es keinen Empfänger. Also `mailto:`
mit vorbereitetem Betreff plus ein deutlich markierter Platz für einen
Terminlink. Ein Formular, das ins Leere schreibt, wäre schlimmer als keines.

## 6. Die drei Demo-Projekte

Fiktive Betriebe aus Branchen, die Youssefs Zielgruppe entsprechen. Vorschlag
für die Zuschnitte, Namen und Texte macht der copywriter.

> **Korrigiert (2026-08-25).** Der Zielgruppen-Pivot hat Gastronomie und
> Kanzlei gestrichen. Es sind drei Gewerke, und alle drei sind Handwerk:
>
> 1. **Elektro.** Typisch: Baukasten-Seite von 2012, Telefonnummer als Bild,
>    kein Formular, mobil unbrauchbar.
> 2. **Bau.** Typisch: Referenzen unsichtbar oder gar nicht vorhanden, kein
>    erkennbarer nächster Schritt.
> 3. **Dach.** Typisch: Notdienst nicht auffindbar, Anruf-Knopf zu klein für
>    einen Daumen.
>
> Das gilt für die drei Fallstudien unter `/arbeit` **und** für die Demos auf
> der Startseite: Akt 4 zeigt einen Elektriker, Akt 5 ein Bauunternehmen und
> einen Dachdecker.

Der überholte Zuschnitt, zur Nachvollziehbarkeit:

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

> **Überholt (2026-08-25).** Der Baum unten beschreibt den alten One-Pager.
> Der aktuelle steht in `README.md` und in `CLAUDE.md`. Zwei Regeln sind neu
> dazugekommen und wiegen schwerer als alles im Baum:
>
> - **Die `data-sc-*`-Attribute im Markup sind der Vertrag mit der Engine.**
>   Sie liest genau diese Struktur. Ein umsortiertes oder eingespartes Element
>   bricht einen Akt, ohne dass TypeScript etwas merkt.
> - **Die Stylesheets der Startseite werden aus `app/page.tsx` importiert,
>   nie aus einem Layout.** Sonst färben ihre Tokens das Impressum ein.
>
> Die Regel zur `.alt-fassung`-Insel unten gilt weiter, und die Startseite
> macht dasselbe noch strenger: die zwei Mini-Websites in Akt 4 leben in
> `.demo-track--bad` und `.demo-track--good`, und nichts von dort darf nach
> außen wirken. Die schlechte Fassung erbt bewusst Times New Roman von ihrem
> Rahmen, damit sie aussieht wie das, was sie darstellt.

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
  Nachtmodus-Schalter, Kopfleiste, dazu seit dem Redesign der Skriptlader
  `components/start/skripte.tsx`. Die neun Akte selbst sind statisches Markup
  und bleiben Server Components.
- Nachtmodus wie im Hauptprojekt: `localStorage`-Skript im `<head>` setzt
  `.dark` vor dem ersten Bild, `suppressHydrationWarning`. Gilt für die
  Rechts- und Fallstudienseiten. Die Startseite ist nur dunkel: eine
  Kinoseite hat keine Tagfassung.
- Bilder: keine fremden Stockfotos. Alles Sichtbare ist gebaut (CSS, SVG,
  Typografie). Das ist gleichzeitig die Performance-Entscheidung und die
  ehrlichste Demonstration. **Nachtrag (2026-08-25):** zwei generierte Stills
  kommen dazu (Hero, Über), beide zeigen Werkzeug auf einem Tisch, keine
  Person, kein Stockfoto, kein erfundenes Porträt.
- Schriften über `@fontsource-variable`-Pakete, nie über ein CDN. Die Seite
  stellt keine Anfrage an eine fremde Domain, und der Datenschutztext
  behauptet genau das. Der scrollcraft-Build lud Fraunces und Archivo noch von
  Google und musste beim Portieren umgestellt werden.
- **Keine Animationsbibliothek, mit einer Ausnahme (2026-08-25): die
  scrollcraft-Engine.** Kein React-Framework wie Framer Motion, sondern eigenes
  Vanilla JS und CSS ohne Abhängigkeiten, statisch in `public/scrollcraft/`,
  lädt nur auf `/`. Der Nutzer hat sie für dieses Redesign ausdrücklich
  freigegeben, weil der Signature Move ohne eine Scroll-Engine nicht baubar
  ist. Das alte Argument gilt eine Ebene höher weiter: ein Portfolio, das
  40 kB Framer Motion für einen Schieber lädt, widerlegt sich selbst. Bevor
  eine **weitere** Abhängigkeit dazukommt, prüfen, ob CSS, Web Animations oder
  die vorhandene Engine reichen.
- Engine und Signature Move (`scrollcraft.css`, `scrollcraft.js`, `page.js`)
  sind byte-identisch aus dem verifizierten Build übernommen und bleiben es.
  Wer sie „verbessert", verliert die Verifikation.
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

> **Erste Zeile überholt (2026-08-25).** Sichtbarer Seitentext ist Englisch,
> alles andere bleibt Deutsch. Die Tabelle dazu steht in `CLAUDE.md`,
> Abschnitt „Sprache". Die vier Regeln darunter gelten unverändert weiter, in
> jeder Sprache, und die dritte hat beim Redesign drei Fundstellen gehabt:
> zwei Häufigkeitsangaben im Befund-Akt und die aufgedruckten Messwerte über
> den Demos. Messwerte über einer Demo sind nur zulässig, wenn die Demo
> daneben wirklich so gerendert wird.

- Alle Texte, Kommentare und Bezeichner-Kommentare deutsch. Bezeichner selbst
  englisch, wie im Hauptprojekt.
- **Keine Gedankenstriche („—") in sichtbaren Texten.** Doppelpunkt, Komma oder
  Klammer stattdessen.
- Kein Agentur-Plural („wir gestalten digitale Erlebnisse"). Es ist eine Person.
- Keine erfundenen Zahlen: keine Prozentwerte, keine Ladezeiten, keine
  Kundenzahlen, keine Preise, die nicht abgestimmt sind.
