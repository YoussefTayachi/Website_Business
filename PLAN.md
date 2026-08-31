# Plan: marketing.frostbreaker.app, der One-Pager fuer das Webdesign-Angebot

_Gesperrt ueber claudex-loop, von Claude und Youssef Tayachi, 2026-08-31._
_Fassung 4, nach Codex-Runde 3. Der Plan des ERSTEN Entwurfs liegt als_
_`PLAN-ERSTER-ENTWURF.md` daneben._

## Ziel

Die Startseite wird vollstaendig neu gebaut, in der Formensprache von
frostbreaker.app statt im designatives-Klon von vorher. Sie steht kuenftig auf
`marketing.frostbreaker.app` und ist die Landeseite fuer Betriebe, die aus
einer Kaltakquise-Mail kommen, in der ein konkreter Mangel an ihrer eigenen
Website benannt wurde. Sie muss in Sekunden drei Dinge zeigen: der Absender
kann sichtbar gestalten, der Betrieb versteht sofort was er bekommt, und ein
Gespraech kostet nichts. Wenig Text, viel Bild, grosse Schrift, Bewegung, die
das Koennen belegt statt es zu behaupten. Hell und dunkel, und auf dem Telefon
zuerst.

## Entscheidungen aus dem Verhoer

| # | Entscheidung | gesperrt auf |
|---|---|---|
| 1 | Marke | Frostbreaker Marketing als Dach, Youssef Tayachi als Gesicht, erste Person Singular |
| 2 | Domain | `marketing.frostbreaker.app`, setzt `metadataBase` |
| 3 | Zielgruppe | Handwerk als konkrete Bildebene, Rahmen etwas breiter auf oertliche Betriebe, die vom Anruf leben |
| 4 | Sprache | Englisch, sichtbarer Seitentext komplett |
| 5 | Beweis | frostbreaker.app und app.frostbreaker.app als echte Belege, drei Handwerks-Demos als Branchenprobe mit Kennzeichen |
| 6 | CTS Cement | faellt aus. Keine Zustimmung des Leads, Regel aus `Website_Business/README.md` |
| 7 | Handlungsaufruf | Call buchen. Kein Formular, kein Preis, kein Selbstbedienungs-Einstieg |
| 8 | Preis | wird nicht genannt |
| 9 | Bewegung | ausgebaut, deutlich ueber Frostbreaker hinaus, aber ohne Scroll-Entfuehrung |
| 10 | Dunkelmodus | wird gebaut, gegen meine erste Empfehlung, auf ausdruecklichen Wunsch |
| 11 | Mobil | 390px ist die Entwurfsbreite, nicht die Nachbesserung |

Kosmetik gesperrt wie vorgeschlagen. Zwei Punkte hat Claude selbst gesetzt,
beide billig zu drehen: der Calendly-Link
(`https://calendly.com/youssef-tayachi-frostbreaker/30min`, eine Konstante in
`content/start.ts`) und die Auslegung von "etwas breiter" (Ueberschrift
spricht oertliche Betriebe an, Bilder bleiben Handwerk).

## 1. Das Farbsystem, vollstaendig gerechnet

`app/globals.css` traegt bereits ein Zwei-Modus-System: primitive Farbleitern,
semantische Ebene, `@custom-variant dark`, Theme-Skript, Schalter. Die
Architektur bleibt, die Werte wandern.

**Alle Werte unten sind gerechnet (WCAG 2.1, relative Luminanz), nicht
geschaetzt, und zwar gegen den jeweils unguenstigsten Grund.** Der
unguenstigste Grund ist in beiden Modi die **Bandflaeche**, weil sie hell dem
Text am naechsten und dunkel am weitesten von ihm entfernt liegt: hell
`#f1f0ed`, dunkel `#26282e`.

Gemessene Helligkeiten der vier dunklen Flaechen, damit das nachpruefbar ist:
`#131418` 0,0071 · `#191a1f` 0,0104 · `#202128` 0,0155 · `#26282e` 0,0213.
Fassung 3 hat hier `#202128` als unguenstigsten Grund angesetzt, und das war
falsch. Das Skript liegt bei und laeuft beim Bau erneut.

### Flaechen

| Rolle | hell | dunkel |
|---|---|---|
| Seitengrund | `#fbfbfa` | `#131418` |
| Blatt, Karte | `#ffffff` | `#191a1f` |
| vertieft | `#f5f5f4` | `#202128` |
| Band | `#f1f0ed` | `#26282e` |

### Text, gegen den unguenstigsten Grund

| Rolle | hell | Kontrast | dunkel | Kontrast |
|---|---|---|---|---|
| Fliesstext, Ueberschrift | `#1c1b19` | 15,10:1 | `#edebe6` | 12,37:1 |
| Vorspann, Bildunterschrift | `#57534e` | 6,69:1 | `#a6a29a` | 5,79:1 |
| Kleintext | `#5d5b56` | 5,95:1 | `#949088` | 4,63:1 |
| Zierde, deaktiviert, **nie Inhalt** | `#6b6963` | 4,82:1 | `#575450` | unter Grenzwert, deshalb nie Inhalt |

**Korrektur, in zwei Stufen.** Der naheliegende dunkle Kleintext `#85817a`
misst auf der Bandflaeche 3,79:1. Fassung 3 hob ihn auf `#8d8981` an, rechnete
dabei aber gegen die falsche Flaeche: auf `#26282e` sind das nur 4,23:1 und es
faellt weiterhin durch. Endstand `#949088` mit 4,63:1.

### Linien

| Rolle | hell | Kontrast | dunkel | Kontrast |
|---|---|---|---|---|
| Haarlinie, nur Rhythmus | `#e9e8e6` | 1,18:1 | `#26282e` | 1,25:1 |
| kraeftige Kante | `#d8d7d4` | 1,39:1 | `#34363d` | 1,53:1 |
| **Kante an Bedienelementen** | `#8a8880` | **3,43:1** | `#6e717a` | 3,77:1 |

**Zweite Korrektur:** Frostbreaker fuehrt `#a9a8a2` als Bedienkante. Das misst
2,30:1 und verfehlt die 3:1 aus WCAG 1.4.11 fuer Bedienelemente. Auf `#8a8880`
angehoben (3,43:1 auf Grund, 3,12:1 auf Band). Die beiden leiseren Linien
tragen keine Information und duerfen leise bleiben.

### Akzente

| Rolle | hell | Kontrast | dunkel | Kontrast |
|---|---|---|---|---|
| Akzenttext, jede Groesse | sky-700 `#0369a1` | 5,21:1 | sky-400 `#38bdf8` | 6,88:1 |
| Akzent gross, ab 24px, Kanten | sky-600 `#0284c7` | 3,59:1 | sky-300 `#7dd3fc` | 8,84:1 |
| Akzentflaeche | sky-500 `#0ea5e9` | nur Flaeche | sky-500 | nur Flaeche |
| Akzentwaschung | `#e0f2fe` | Text darauf 5,17:1 | `#0c2534` | Text darauf 9,47:1 |
| Coral, Flaeche und Rahmen | `#ea5a3e` | nur Flaeche | `#ea5a3e` | nur Flaeche |
| Coral-Text | `#bd3f1d` | 4,73:1 | `#fb9a8c` | 7,09:1 |
| Coral-Waschung | `#fdece7` | Coral-Text darauf 4,71:1 | `#2b1713` | Coral-Text darauf 8,18:1 |

### Text auf Akzentflaechen, und die dritte Korrektur

| Kombination | Kontrast | Urteil |
|---|---|---|
| Weiss auf Tinte `#1c1b19` (Pill-CTA) | 17,21:1 | traegt |
| Weiss auf sky-700 | 5,93:1 | traegt |
| Weiss auf sky-600 | 4,10:1 | **faellt durch** |
| **Weiss auf Coral** | **3,48:1** | **faellt durch** |
| Tinte auf Coral | 4,94:1 | traegt |
| Nacht auf sky-400 | 8,59:1 | traegt |

**Auf Coral steht Tinte, nie Weiss.** Das ist kontraintuitiv, weil Coral
kraeftig aussieht, aber es ist gerechnet. Wer spaeter einen weissen Text auf
eine Coral-Flaeche setzt, bricht die Seite.

### Zustaende und Bedienteile

| Rolle | hell | dunkel |
|---|---|---|
| Auswahl `::selection` | sky-500 bei 18 % | sky-400 bei 26 % |
| Reglerbahn | `#f5f5f4`, Kante `#8a8880` | `#26282e`, Kante `#6e717a` |
| Reglergriff | `#1c1b19`, Rand `#ffffff` | `#edebe6`, Rand `#131418` |
| Hover | eine Stufe dunkler | eine Stufe **heller** |

**Der Fokusring ist zweifarbig, und das ist keine Zierde.** Ein einfarbiger
Ring versagt dort, wo er der Flaeche zu nah kommt: sky-700 auf einer
sky-500-Flaeche misst 2,1:1, sky-400 darauf 1,3:1. Ein Ring, den man auf dem
wichtigsten Knopf der Seite nicht sieht, ist keiner.

Deshalb: **2px Tinte `#1c1b19` innen, 2px Papier `#ffffff` aussen**, in beiden
Modi dieselbe Konstruktion. Damit liegt immer eine der beiden Haelften ueber
3:1, egal worauf der Ring landet. Gemessen ueber alle Flaechen der Seite:

| Flaeche | Tinte | Papier | wirksam |
|---|---|---|---|
| Grund hell `#fbfbfa` | 16,62:1 | 1,04:1 | 16,62:1 |
| Band hell `#f1f0ed` | 15,10:1 | 1,14:1 | 15,10:1 |
| sky-500 `#0ea5e9` | 6,21:1 | 2,77:1 | 6,21:1 |
| **Coral `#ea5a3e`** | 4,94:1 | 3,48:1 | **4,94:1** |
| Tinte, Pill-CTA `#1c1b19` | 1,00:1 | 17,21:1 | 17,21:1 |
| Grund dunkel `#131418` | 1,07:1 | 18,41:1 | 18,41:1 |
| Band dunkel `#26282e` | 1,17:1 | 14,73:1 | 14,73:1 |

Der schlechteste Fall der ganzen Seite ist 4,94:1, und der liegt ueber der
geforderten 3:1 fuer Bedienelemente.

Die `--st-`-Tokens entfallen, mit ihnen Mint `#2affaa`, Koenigsblau `#1032cf`
und reines Schwarz auf reinem Weiss.

### Wie `--st-*` verschwindet, Datei fuer Datei

1. `components/start/tokens.css` wird **geloescht**. Farbe, Schrift und
   Groesse ziehen nach `app/globals.css` in die semantische Ebene, weil
   Startseite und Rechtsseiten kuenftig ein System teilen.
2. Was routen-lokal bleibt, sind **Rhythmus-Tokens** der Startseite (Rand,
   Abschnittsabstand, Radien, Kurven). Sie wandern in den Kopf von
   `components/start/start.css`, weil nur diese Route sie braucht.
3. `components/start/start.css` wird neu geschrieben und liest ausschliesslich
   `--c-*` aus `globals.css`. Kein Hex-Wert in der Datei.
4. Jede `.st-`-Klasse behaelt ihr Praefix.
5. **Die Importreihenfolge in `app/page.tsx` bleibt unveraendert:**
   `globals.css` (aus dem Wurzel-Layout) vor `start.css` (aus der Seite).
   Startseiten-CSS wird nie aus einem Layout importiert.
6. Nachweis: im gebauten HTML von `/impressum` darf keine `.st-`-Regel stehen.

## 2. Schrift, ohne die Rechtsseiten zu beschaedigen

Fassung 2 sagte, `app/layout.tsx` tausche die Schriften. Das haette Inter und
Newsreader von den deutschen Rechtsseiten genommen. Korrigiert:

- **Wurzel-Layout behaelt** Inter, Newsreader (opsz) und JetBrains Mono. Die
  Rechtsseiten bleiben unveraendert gesetzt.
- **`app/page.tsx` importiert** `@fontsource-variable/fraunces` und
  `@fontsource-variable/space-grotesk`. Genau dort, wo heute Archivo steht,
  aus demselben Grund: die Schrift landet nur im Buendel dieser Route.
- **Archivo wird deinstalliert.** Nichts laedt es mehr.
- Space Grotesk kommt neu ins `package.json`, Fraunces ist bereits da.
- Fraunces traegt Displaystufen **ab 24px**, darunter Space Grotesk. Vier
  Groessenstufen, dazwischen nichts. Fliesstext nicht unter 17px.

## 3. Theme-Umschaltung

Das vorhandene Skript liest ausschliesslich `localStorage` und folgt der
Systemeinstellung **nicht**. Fassung 1 behauptete das Gegenteil. Korrigiert:

1. **CSS traegt die Grundlage**: `@media (prefers-color-scheme: dark)` setzt
   die dunklen Tokens. Der Modus stimmt damit auch ohne JavaScript.
2. **Das Skript ueberschreibt nur bei gespeicherter Wahl** und setzt dann
   `.light` oder `.dark` auf `html`, was die Medienabfrage schlaegt.
3. Kein Aufblitzen, weil das Skript vor dem ersten Bild laeuft.

**Der Schalter ist entschieden**, und er wird nicht aus Knoepfen nachgebaut:
drei **native `<input type="radio">`** in einem `<fieldset>` mit `<legend>`
("Theme"), Werte **System / Light / Dark**. Der Browser bringt damit
Gruppensemantik, Pfeiltastenwechsel, wandernden Fokus und den angesagten
Zustand von sich aus mit. Fassung 3 wollte `role="radiogroup"` ueber
gewoehnliche Knoepfe legen; das ist unvollstaendige ARIA und haette
`role="radio"`, `tabindex`-Verwaltung und Pfeiltasten von Hand gebraucht,
also drei Fehlerquellen fuer etwas, das nativ vorhanden ist.

Die Beschriftungen sind sichtbar, jedes Ziel misst 44px, die Auswahl faerbt
sich ueber `:checked`. "System" loescht den gespeicherten Wert und gibt die
Entscheidung an die Medienabfrage zurueck. Ein Ein-Klick-Umschalter kann das
nicht, weil er keinen Weg zurueck zu "System" hat.

## 4. Bildebene aus echten Seiten, reproduzierbar

Im Repo liegen sechs lauffaehige Demo-Seiten (`components/showcase/demos/`,
1.238 Zeilen echtes Layout). Sie werden zu Bilddateien.

**Die Erfassungsroute darf nie in einen Produktionsbau geraten, und Fassung 2
loeste das falsch.** Ein Ordner mit Unterstrich (`app/_erfassung/`) ist ein
privater Next-Ordner und erzeugt ueberhaupt keine Route, die Aufnahme haette
also nie funktioniert. Korrigiert ueber `pageExtensions`:

```js
// next.config.mjs
const capture = process.env.CAPTURE === "1";
export default {
  pageExtensions: capture ? ["capture.tsx", "tsx", "ts"] : ["tsx", "ts"],
  images: { formats: ["image/avif", "image/webp"] },
};
```

Die Erfassungsseiten heissen `page.capture.tsx`. Ohne `CAPTURE=1` ist die
Datei fuer Next **keine Seite**, sie kann im Produktionsbau gar nicht
entstehen. Das ist strukturell sicher statt von einer Laufzeitpruefung
abhaengig. Die Dateien bleiben im Repo, damit die Aufnahme wiederholbar ist.

**Ein eingecheckter Befehl macht jede Aufnahme, keine Handarbeit.**
`scripts/aufnahmen.mjs` haelt fest und protokolliert:

- Adresse je Fassung, Fenstermass 390 und 1440, `deviceScaleFactor: 2`
- Farbschema je Lauf (hell und dunkel getrennt)
- `document.fonts.ready` **und** `decode()` auf jedes `<img>` **und** zwei
  ruhige Bildwechsel, bevor ausgeloest wird
- `prefers-reduced-motion: reduce` erzwungen, damit keine Animation halb im
  Bild steht
- fester Beschnitt je Ziel, Browserfassung ins Manifest

**Eine Vorrichtung fuer alle Bilder, auch die uebernommenen.** Die vier
App-Screenshots aus `Frostbreaker_Website/public/screenshots/` und die
Aufnahme von frostbreaker.app laufen durch denselben Erzeuger und stehen mit
denselben Feldern im Manifest. Kein Bild kommt an der Vorrichtung vorbei.

`public/arbeiten/manifest.json` fuehrt je Bild: Datei, Masse, Bytes,
Quelle, Quellstand, Ausgabeformat.

**Formatweg, eindeutig:** Quelldateien bleiben PNG aus der Aufnahme.
Die Auslieferung macht `next/image` mit
`images.formats = ["image/avif", "image/webp"]`. Es gibt **kein** von Hand
gebautes `<picture>` und keine zwei parallel gepflegten Ableitungen.
Gemessen wird, was wirklich ausgeliefert wird.

**Jede Aufnahme hat genau einen Platz, und keine wird umgeschaltet.** Die
390er- und die 1440er-Aufnahme zeigen zwei verschiedene Layouts derselben
Seite, das ist Bildregie und nicht Aufloesung; `sizes` kann so etwas nicht
entscheiden, es waehlt nur die Kodierungsgroesse **einer** Quelle. Fassung 3
hatte dafuer keinen Abnehmer benannt. Deshalb bekommt jede Aufnahme ihren
festen Platz, und es wird an keiner Stelle zwischen zwei Layouts gewechselt:

| Aufnahme | Platz |
|---|---|
| 390px, Elektro Musterhaus neu | Telefonrahmen im Hero |
| 390px, Dach Musterhoehe alt und neu | Vergleich Fall 3 (der Fall handelt vom Telefon) |
| 1440px, Elektro Musterhaus alt und neu | Vergleich Fall 1 |
| 1440px, Bau Mustergrund alt und neu | Vergleich Fall 2 |
| 1440px, frostbreaker.app | Leitbild des echten Falls |
| App-Screenshots | Beweisstreifen, klein |

Ein Telefonrahmen zeigt also in jeder Fensterbreite dieselbe Telefonaufnahme,
nur kleiner. `sizes` regelt allein, wie gross sie kodiert ausgeliefert wird.
Damit gibt es kein `<picture>`, keine Bildregie und keinen ungenutzten
Aufnahmesatz.

**Vorher/Nachher-Paare** entstehen durch dieselbe Vorrichtung. Weichen die
Masse eines Paares voneinander ab, bricht die Erzeugung ab.

**Budget** (feste Masse verhindern den Sprung, nicht das Gewicht):

| | Grenze |
|---|---|
| Hero-Bild | 120 kB |
| jedes weitere Bild | 80 kB |
| alle Bilder zusammen | 700 kB |
| Erstbild insgesamt | unter 1,2 MB |

`sizes` an jedem `next/image`, kartengenaue Zuschnitte statt einer skalierten
Vollseite, `priority` **nur** am Hero-Bild, alles andere `loading="lazy"`.
Reisst ein Bild sein Budget, wird es zugeschnitten, nicht das Budget erhoeht.

## 5. Die sieben Flaechen

| # | Flaeche | was sie zeigt | Bild zu Text |
|---|---|---|---|
| 0 | Kopfleiste | ab 768px: Wortmarke, zwei Ankerlinks, Modus-Gruppe, schwarzer Pill-CTA. Darunter nur Wortmarke und Pill (siehe unten) | |
| 1 | Hero | Ueberschrift in Fraunces mit einem kursiven Sky-Wort, ein Vorspannsatz, Pill plus Textlink, daneben ein Geraeteaufbau mit einer echten Seite darin | 70/30 |
| 2 | Beweisstreifen | ein Satz plus zwei anklickbare Kapseln auf frostbreaker.app und app.frostbreaker.app | 20/80 |
| 3 | Arbeiten | Frostbreaker zuerst als echter Fall, darunter die drei Handwerksfaelle mit Vergleichsregler, Tag-Kapseln, Kennzeichen | 85/15 |
| 4 | Was dich Anrufe kostet | Coral. Drei Maengel als annotierte Bildausschnitte | 80/20 |
| 5 | Wie es laeuft | drei nummerierte Schritte an Haarlinien | 40/60 |
| 6 | Wer die Arbeit macht | echtes Portraet, zwei Saetze | 50/50 |
| 7 | Schluss und Fuss | Call buchen, Impressum, Datenschutz | |

**Die Kopfleiste bei 390px, ausgerechnet statt gehofft.** Bei 390px stehen
abzueglich der Seitenraender rund 350px zur Verfuegung. Wortmarke (rund
150px), zwei Ankerlinks, eine Dreiergruppe fuer den Modus (drei Ziele zu
44px sind allein 132px) und ein CTA passen dort nicht nebeneinander, ohne
Trefferflaechen zu unterschreiten. Also:

| Breite | Kopfleiste traegt | wohin der Rest geht |
|---|---|---|
| ab 768px | Wortmarke, zwei Ankerlinks, Modus-Gruppe, Pill-CTA | |
| unter 768px | Wortmarke und Pill-CTA, beide 44px | Ankerlinks entfallen, Modus-Gruppe steht im Fuss |

**Kein Menueknopf.** Ein One-Pager mit sieben Flaechen, den man in einer
Wischbewegung durchlaeuft, braucht keine Navigation zu zwei Ankern; ein
Hamburger waere ein Bedienelement fuer ein Problem, das es nicht gibt. Der
Modus-Schalter ist im Fuss vollstaendig vorhanden und ueber die Tastatur
erreichbar, also geht nichts verloren.

**Wem welcher Text gehoert:**

| Quelle | besitzt |
|---|---|
| `content/start.ts` | jeden Satz, den die Startseite rendert: Ueberschriften, Fallnamen, Bildunterschriften, Tag-Kapseln, das Kennzeichen "Fictional demo. Not a real business.", jedes `alt` |
| `content/projekte.ts` | nur den Text INNERHALB der Demo-Seiten, also das, was im Screenshot abgebildet ist |

Das Kennzeichen steht auf jeder Karte und kommt aus `start.ts`. Es darf nicht
Teil eines Bildes sein: ein Kennzeichen, das nur im Screenshot steht, ist fuer
einen Screenreader nicht vorhanden.

**Zum Vorher/Nachher:** In `Lehren/checkliste.md` steht "kein
Vorher/Nachher-Regler". Diese Regel gilt fuer den **Entwurf, der an einen Lead
geht**, wo der Prototyp die Website ist und die Argumentation in die Mail
gehoert. Sie gilt nicht fuer die eigene Verkaufsseite, wo der Vergleich das
Argument ist.

**Der Vergleichsregler, ausspezifiziert:**

- natives `<input type="range">`, `min=0 max=100 step=1`, Startwert 50
- `aria-label="Compare before and after"`, dazu `aria-valuetext`, das den
  Zustand in Worten sagt: bei 0 "Before", bei 100 "After", dazwischen
  "50 percent after". Eine nackte Zahl sagt niemandem, was er sieht.
- sichtbarer Fokusring, Griff mit 44px Trefferflaeche
  (Muster `.range-touch` aus dem Frostbreaker-Stylesheet)
- `touch-action: pan-y` auf dem Regler: eine senkrechte Wischgeste, die auf
  ihm beginnt, scrollt die Seite und bleibt nicht haengen
- **zusaetzlich zwei Knoepfe "Before" und "After"** mit je 44px. Wer nicht
  ziehen will oder kann, springt. Der Regler ist damit nie der einzige Weg.
- ohne JavaScript stehen beide Aufnahmen als zwei `<figure>` mit
  Bildunterschrift untereinander

## 6. Bewegung, mit zwei Grenzen

Grenze eins: **keine Bewegung nimmt jemandem das Scrollen ab.** Kein Pinning,
keine entfuehrte Scrollachse, kein Bild-fuer-Bild-Video.

Grenze zwei: **kein echter Scrollcontainer im Seiteninhalt.** Ein scrollbarer
Kasten mitten auf der Seite faengt auf dem Telefon die Wischgeste ab, und das
ist die Scroll-Entfuehrung, die schon einmal verworfen wurde. Wo eine Seite
"scrollt", verschiebt ein `transform` ein statisches Bild in einem
`overflow: hidden`-Rahmen.

| # | Bewegung | Traeger | ohne JS | unter `reduce` |
|---|---|---|---|---|
| 1 | Ueberschrift zeilenweise aus der Maske, 90ms Versatz | CSS-Animation | sichtbar | Endzustand |
| 2 | Hero-Verlauf folgt dem Zeiger | Client-Insel, nur `pointer: fine` | statisch | aus |
| 3 | Seite im Geraeterahmen wandert | `transform`, kein Scrollcontainer | statisch | aus |
| 4 | Abschnitte blenden gestaffelt ein | IntersectionObserver | sichtbar | Endzustand |
| 5 | Fallkarte hebt sich, Bild wandert | CSS-Hover, `hoverfine` | statisch | ohne Wanderung |
| 6 | Vergleichsregler | natives `range` | zwei Figuren | sofort |
| 7 | Pill-CTA, Pfeil laeuft | CSS-Hover, `hoverfine` | statisch | nur Farbe |
| 8 | Modus-Wechsel blendet Tokens ueber | CSS-Transition | sofort | **sofort, ohne Uebergang** |
| 9 | Haarlinie der Schritte zeichnet sich | CSS + Observer | gezeichnet | gezeichnet |
| 10 | mitlaufende Abschnittsmarke ab `lg` | Observer | ausgeblendet | ohne Bewegung |

**Punkt 3 im Detail, weil Fassung 2 sich dort widersprach.** Sie sagte
gleichzeitig "pausiert bei Hover und Fokus" und "`pointer-events: none`", und
damit gab es keine Flaeche, die Hover oder Fokus je empfangen haette.
Korrigiert:

- **Der einzige Tabstopp ist ein beschrifteter Knopf** ("Pause"/"Play"), 44px,
  am Rahmen. Der Rahmen selbst bekommt **kein** `tabindex`: eine
  Zierflaeche, die nur deshalb fokussierbar waere, um eine Pause zu
  empfangen, ist ein unbenannter Tabstopp und macht die Tastaturbedienung
  schlechter, nicht besser. Fassung 3 lief genau darauf zu.
- Angehalten wird ueber `:hover` und `:focus-within` am Rahmen. Fokussiert
  jemand den Pause-Knopf, steht die Bewegung schon, bevor er ihn drueckt.
- Der Knopf ist **bei Hover und bei Fokus sichtbar**, nicht nur bei Fokus.
  Wer mit der Maus kommt, soll ihn finden, ohne zu raten.
- Nur die bewegte Bildebene traegt `pointer-events: none`, damit sie den
  Hover des Rahmens nicht abfaengt.
- Die Bewegung laeuft nicht, solange der Abschnitt nicht im Bild ist.

Regeln fuer alle zehn:

- **Der Ausgangszustand ist sichtbar.** Der unsichtbare Startzustand haengt an
  `@media (scripting: enabled)`, wie `CLAUDE.md` es vorschreibt.
- **Vier Client-Inseln, mehr nicht:** Zeiger-Verlauf, Observer,
  Vergleichsregler, Modus-Gruppe. Alles andere bleibt Server Component.
- **Jeder Observer und jeder Listener wird im Aufraeumen entfernt.**
- Keine Bibliothek. `magicuidesign` bleibt ungenutzt, weil es Framer Motion
  nachzieht.

## 7. Dunkelmodus: die Abnahmematrix

Geprueft wird bei 390, 768 und 1440, hell und dunkel, jede Zeile einzeln:

| Kippstelle | Massnahme |
|---|---|
| Screenshots heller Websites | nicht invertieren, nicht filtern. Im Dunklen in einem Geraeterahmen mit heller Blende, damit sie als Bildschirm lesen |
| Wortmarke | beide Fassungen liegen vor (`frostbreaker-marke.svg`, `-dunkel.svg`), Umschaltung ueber CSS |
| Vergleichsregler | Bahn, Griff und Fokusring haben eigene dunkle Tokens (Abschnitt 1) |
| Fokusring | zweifarbig, gemessen ueber alle Flaechen (Abschnitt 1), schlechtester Fall 4,94:1 |
| Modus-Gruppe im Fuss | eigene dunkle Fassung, `:checked` muss in beiden Modi erkennbar sein |
| Auswahlfarbe | eigener Wert je Modus |
| SVG-Zeichnungen | Farbe als Klasse, nie als Praesentationsattribut |
| Body-Grundregeln aus `start.css` | duerfen die dunklen Tokens nicht ueberschreiben |
| Portraet und OG-Bild | ein Motiv fuer beide Modi, kein transparentes PNG mit dunklem Rand |
| Coral-Abschnitt | Waschung `#2b1713`, Coral-Text `#fb9a8c`, gemessen in Abschnitt 1 |
| Pause-Knopf am Geraeterahmen | eigene dunkle Fassung, sonst verschwindet er auf der Bildebene |

## 8. Mobil

Entworfen bei 390px, geprueft bei 390, 768 und 1440, hell und dunkel.
Kein Klickziel unter 44px. Kein waagerechtes Scrollen in irgendeiner Breite.
Die Untergrenzen der `clamp()`-Werte werden bei 390px nachgerechnet.
Kein Element faengt die senkrechte Wischgeste ab (Grenze zwei in 6, plus
`touch-action: pan-y` am Regler).

## 9. Umfang: was mit jeder Datei passiert

| Datei | was damit geschieht |
|---|---|
| `app/page.tsx` | neu, sieben Flaechen, importiert Fraunces, Space Grotesk und `start.css` |
| `components/start/*` | neu gebaut, Ordner bleibt |
| `components/start/tokens.css` | **entfaellt**, Inhalt teilt sich auf `globals.css` und den Kopf von `start.css` auf |
| `content/start.ts` | neu geschrieben |
| `app/globals.css` | Primitive und Semantik umgerichtet, Architektur bleibt |
| `app/layout.tsx` | `metadataBase`, Theme-Skript korrigiert. **Schriften bleiben** (Inter, Newsreader, JetBrains) |
| `app/opengraph-image.tsx` | **neu**, existiert bisher nicht |
| `next.config.mjs` | `pageExtensions` und `images.formats` |
| `scripts/aufnahmen.mjs` | **neu** |
| `app/(mit-chrome)/impressum,datenschutz` | bleiben, erben die neuen Tokens |
| `app/(mit-chrome)/arbeit/[slug]/` | **entfaellt** |
| `components/showcase/demos/*` | bleiben als Bildquelle |
| `components/showcase/vorher-nachher.tsx` | wird zum Vergleichsregler umgebaut |
| `components/showcase/befund-marker.tsx` | **bleibt und wird umgebaut.** Fassung 2 wollte es loeschen, aber Flaeche 4 braucht genau das: annotierte Bildausschnitte. Was der Mentor gestrichen hat, war die Beweisschicht auf einem LEAD-Entwurf, nicht der Mechanismus als solcher |
| `content/projekte.ts` | bleibt als Datenquelle der Demo-Seiten |
| `components/chrome/*`, `lib/*` | bleiben |
| `package.json` | Space Grotesk dazu, Archivo raus |
| `scrollcraft/`, `graphify-out/` | unangetastet |

Vor jeder Loeschung wird geprueft, wer die Datei noch importiert. Keine
Loeschung auf Verdacht.

**Metadaten sind Arbeitsschritte:**
`metadataBase: new URL("https://marketing.frostbreaker.app")` in
`app/layout.tsx`, `alternates.canonical` auf jeder Route und jede zeigt auf
sich selbst, `app/opengraph-image.tsx` erzeugt 1200x630, `icon.svg` plus
`apple-icon`. Im gebauten HTML wird nachgesehen, dass Canonical und
`og:image` absolut sind.

## Toolchain

Auf der Claude-Bank verzeichnet (`ls ~/.claude/skills/`): `impeccable`,
`frontend-design`, `ui-ux-pro-max`, `ui-styling`, `design-system`, `brand`,
`emil-design-eng`, `apple-design`, `animate`, `review-animations`,
`playwright-tester`.

| Strecke | laedt | wofuer |
|---|---|---|
| Gestaltung | `impeccable`, `frontend-design` | Hierarchie, Typografie, Flaechen |
| Farbe und Tokens | `ui-ux-pro-max` | Palettenpruefung und Schriftpaarung |
| Bewegung | `animate`, `emil-design-eng` | Kurven und Dauern statt geratener Werte |
| Nachpruefung | `review-animations` | die zehn Punkte gegenlesen |
| Messung | MCP `chrome-devtools` | Aufnahmen, Kontraste, Layout-Sprung |
| Abnahme | `Lehren/checkliste.md` | die Liste aus echten Rueckmeldungen |

`find-animation-opportunities` gestrichen: es sucht fehlende Bewegung in
bestehendem Code, hier entsteht alles neu.

Nicht benutzt: `magicuidesign` (Framer Motion), `nateherk-design:scrollcraft`
(das verworfene Design), Figma und Canva (die Seite wird im Code entworfen).

**Codex bleibt Kritiker, nicht Erbauer.** Seit Runde 1 ist belegt, dass Codex
unter Windows im read-only-Sandkasten keine Datei lesen kann: jeder Leseweg
geht ueber PowerShell, und PowerShell wird per Policy abgewiesen
(`CreateProcess ... rejected: blocked by policy`). Der Kontext wird ueber
stdin eingespeist. Ein Codex-Build-Track ist ausgeschlossen.

## Annahmen

| # | Annahme | Beleg |
|---|---|---|
| 1 | Repo `Websites/agentur`, Branch `main`, sauber bei `72f046b` | `git status`, `git log` |
| 2 | `package.json` fordert `next ^15.3.0`, aufgeloest laeuft 15.5.23 | Deklaration plus Startbanner des Dev-Servers auf Port 3200 |
| 3 | Frostbreakers Tokens und Schriftpaarung wie in Abschnitt 1 | `Frostbreaker_Website/app/globals.css`, `app/_ui.tsx` |
| 4 | Zwei-Modus-System vorhanden, folgt aber **nicht** der Systemeinstellung | `app/globals.css` Zeilen 1 bis 190, Theme-Skript in `app/layout.tsx` |
| 5 | Sechs Demo-Seiten, 1.238 Zeilen | `wc -l components/showcase/demos/*.tsx` |
| 6 | Portraet und beide Wortmarkenfassungen liegen vor | `ls Frostbreaker_Website/public/team/`, `.../marke/` |
| 7 | Lead-Entwuerfe ohne Zustimmung nicht als Referenz | `Website_Business/README.md`, woertlich |
| 8 | CI faehrt `typecheck` und `build`, deployt nicht | **nur aus `CLAUDE.md`.** Wird beim Bau gegen `.github/workflows/ci.yml` geprueft |
| 9 | Keine Animationsbibliothek, keine Stockfotos, keine erfundenen Zahlen | `CLAUDE.md` |
| 10 | Codex CLI 0.151.0, Modell `gpt-5.6-terra` | `codex --version`, Kopfzeile des Laufs |

## Risiken und offene Punkte

1. **Der Dunkelmodus ist neu fuer diese Marke.** Zehn Kippstellen. Erst die
   Messung entscheidet.
2. **"Bewegung ausbauen" gegen die scrollcraft-Absage.** Die zwei Grenzen
   halten uns fern vom verworfenen Design, bleiben aber Geschmacksfrage.
3. **Ein einziger echter Beleg.** Die Glaubwuerdigkeit haengt an Frostbreaker.
4. **Englischer Text fuer eine deutschsprachige Zielgruppe.** Vom Nutzer
   gesperrt, als Konversionsrisiko festgehalten.
5. **Bildgewicht.** Budget in Abschnitt 4, wird an der Auslieferung gemessen.
6. **`pageExtensions` beruehrt den ganzen Bau.** Ein Tippfehler dort macht
   jede Seite unsichtbar. Wird als Erstes geprueft, nicht als Letztes.

## Nachweise vor dem Push

- `npm run typecheck` und `npm run build` fehlerfrei
- Produktionsbau ohne `CAPTURE=1`: keine Erfassungsseite im Routen-Manifest
- im gebauten HTML von `/impressum` keine `.st-`-Regel, Inter und Newsreader
  weiterhin gesetzt
- Aufnahmen bei 390, 768, 1440, hell und dunkel, kein waagerechtes Scrollen
- alle zehn Kippstellen aus Abschnitt 7 einzeln durchgesehen
- kein Layout-Sprung, Fokusring ueberall sichtbar, Tastatur ueberall
- Vergleichsregler: `aria-valuetext` sagt den Zustand, `touch-action: pan-y`
  laesst senkrecht scrollen, beide Sprungknoepfe erreichbar
- Geraeterahmen: Pause-Knopf per Tastatur erreichbar und beschriftet, der
  Rahmen selbst **kein** Tabstopp, Anhalten auch ueber `:focus-within`
- Kopfleiste bei 390px: Wortmarke und CTA passen mit 44px nebeneinander,
  Modus-Gruppe im Fuss vollstaendig bedienbar
- Fokusring auf jeder Flaeche sichtbar, ausdruecklich auf dem Pill-CTA und
  auf der Coral-Flaeche
- `prefers-reduced-motion: reduce` zeigt Endzustaende, Modus-Wechsel ohne
  Uebergang
- ohne JavaScript steht die Seite, der Vergleich als zwei Figuren
- Bildbudget an der **ausgelieferten** Groesse gemessen, Manifest liegt vor
- jeder Token-Kontrast gerechnet und im Kommentar belegt
- Canonical und `og:image` absolut im ausgelieferten HTML
- `Lehren/checkliste.md` abgehakt, ohne die Punkte, die nur fuer Lead-Entwuerfe
  gelten

## Nicht im Umfang

Deployment und DNS. Ein Sprachumschalter. Formular, CRM-Anbindung, Analytics.
Preisangaben. Ein Blog. Weitere Unterseiten. Ein Neuaufbau von `scrollcraft/`.
Echte Kundenreferenzen, solange keine zugestimmt hat.
