"use client";

import type { CSSProperties, ReactElement } from "react";
import { seite } from "@/content/seite";
import { useReveal } from "@/lib/reveal";

/**
 * Sektion 4: Leistungen.
 * Aufgabe (Plan 5): was Youssef baut. Knapp, vier Bloecke.
 *
 * DIE FALLE UND DER AUSWEG. In befund.tsx steht der Satz "Wer vier gleich
 * grosse Kaesten mit Icons hinstellt, schreibt Werbung", und er gilt hier
 * genauso. Der Ausweg ist nicht, auf Bilder zu verzichten, sondern das
 * Register zu wechseln: keine abgerundeten Piktogramme, sondern technische
 * Abbildungen. Jede haengt an einer Grundlinie, die ueber die ganze Zelle
 * laeuft, traegt darunter ihre Nummer ("ABB. 01", aus dem Index erzeugt, kein
 * neuer Schluessel in content/seite.ts) und zeigt die beschriebene Arbeit,
 * statt sie zu bebildern: das vermessene Blatt, die Verdichtung von viel Text
 * auf wenig, das Messgeraet, die Gabelung nach dem Livegang.
 * Zum Vergleich: die Tafeln in befund.tsx sind vier gleiche 64-Pixel-Felder,
 * weil sie eine Serie in einer Liste sind. Hier haben die Abbildungen
 * unterschiedliche Breiten bei gleicher Hoehe, weil sie Tafeln auf einem
 * Bogen sind. Ehrlich gesagt: ohne die Grundlinie und die Nummerierung
 * kippten diese vier sofort ins Iconset. Diese beiden Bauteile tragen die
 * Entscheidung, nicht die Zeichnungen selbst.
 *
 * DIE ANORDNUNG IST KEIN 2x2-RASTER. Auf breiten Fenstern liegen die vier
 * Tafeln in einem Zwoelfspalter, gespiegelt: Zeile eins breit-schmal, Zeile
 * zwei schmal-breit, mit einer freien Spalte dazwischen. Das ergibt einen
 * Bogen mit Rhythmus statt vier gleicher Kacheln, und es folgt dem Inhalt:
 * die beiden langen Texte (Neubau, Uebergabe) bekommen die breiten Felder.
 * Darunter faellt es auf zwei Spalten und schliesslich auf eine zurueck.
 *
 * WARUM CLIENT COMPONENT. Hier stand vorher, eine Datei nur fuer ein
 * sanfteres Erscheinen zur Client Component zu machen sei ein schlechter
 * Tausch. Das stimmt, solange es nur um das Erscheinen geht. Es geht aber um
 * die Zeichnungen: eine Abbildung, die schon fertig dasteht, ist ein Bild,
 * eine, die sich zeichnet, ist eine Abbildung im Entstehen. Dafuer braucht es
 * den IntersectionObserver aus lib/reveal.ts, und der braucht den Client.
 * Sonst kommt aus dieser Datei nichts Interaktives.
 *
 * Der Kopf (Marke, Ueberschrift, Vorspann) bewegt sich nicht, genau wie in
 * befund.tsx: er steht schon da, waehrend sich der Bogen darunter fuellt.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx: die dortige
 * <section> zeigt per aria-labelledby darauf. Beim Umbauen mitziehen.
 */

/** Wie in befund.tsx: vier Stufen, 70 ms Abstand, letzter Start bei 210 ms. */
const STAFFEL_MS = 70;

/** Wie in befund.tsx: der Strich faehrt hinein, wenn der Block schon steht. */
const ZEICHEN_VORLAUF_MS = 240;

/* Dieselben drei Bedeutungen wie in befund.tsx, damit beide Sektionen
   dieselbe Hand haben: line2 ist die Hilfslinie, line3 das gezeigte Ding, der
   Akzent kommt genau einmal je Abbildung vor und zeigt auf die eine Stelle,
   um die es geht. */
const RASTER = "text-line2";
const FORM = "text-line3";
const ZEIGER = "text-accent";

type Strichzug = { d: string; k: string };
type Platte = { breite: number; zuege: readonly Strichzug[] };

/**
 * Die vier Abbildungen, in der Reihenfolge von seite.leistungen.items.
 * Alle 88 hoch, damit sie auf derselben Grundlinie stehen; unterschiedlich
 * breit, weil sie unterschiedliche Dinge zeigen. Die Grundlinie selbst steckt
 * nicht im SVG, sondern ist der untere Rand der Zelle (border-b weiter
 * unten): so laeuft sie ueber die volle Spaltenbreite weiter und wird zur
 * Linie des Bogens statt zum Rahmen der Zeichnung.
 *
 * Mehrere Teilstrecken je d-Attribut sind Absicht, siehe befund.tsx.
 */
const PLATTEN: readonly Platte[] = [
  // ABB. 01 Website-Neubau. Ein Blatt mit Kopfband und zwei Spalten, rechts
  // aus dem Blatt herausgezogene Hilfslinien und eine Maszlinie mit
  // Endstrichen. Der Akzent ist das Mass: gebaut wird nach einem, nicht nach
  // Gefuehl.
  {
    breite: 168,
    zuege: [
      { d: "M8 12 H104 V84 H8 Z", k: FORM },
      { d: "M8 28 H104 M64 28 V84", k: FORM },
      { d: "M16 40 H56 M16 50 H48 M72 40 H96 M72 50 H88", k: FORM },
      { d: "M104 12 H156 M104 84 H156", k: RASTER },
      { d: "M148 12 V84 M144 12 H152 M144 84 H152", k: ZEIGER },
    ],
  },

  // ABB. 02 Inhalt und Struktur. Links acht dicht gestapelte Zeilen, rechts
  // drei mit Luft. Der Akzent ist die mittlere der drei: die eine, die bleibt.
  {
    breite: 136,
    zuege: [
      {
        d: "M4 10 H58 M4 20 H58 M4 30 H52 M4 40 H58 M4 50 H58 M4 60 H46 M4 70 H58 M4 80 H50",
        k: FORM,
      },
      { d: "M84 30 H132 M84 62 H124", k: FORM },
      { d: "M84 46 H132", k: ZEIGER },
    ],
  },

  // ABB. 03 Tempo und Technik. Drei Posten (Bild, Schrift, Code) ueber einem
  // Maszstab in der Teilung des Hero-Messlaufs, darunter der Zeiger. Er steht
  // dort, wo der kuerzeste Posten endet, und traegt als einziges den Akzent:
  // dieselbe Bedeutung wie .mess-zeiger in globals.css.
  {
    breite: 136,
    zuege: [
      { d: "M6 16 H58 M58 13 V19 M6 28 H44 M44 25 V31 M6 40 H30 M30 37 V43", k: FORM },
      {
        d: "M6 58 V64 M14 58 V64 M22 58 V64 M30 58 V64 M38 58 V64 M46 58 V64 M54 58 V64 M62 58 V64 M70 58 V64 M78 58 V64 M86 58 V64 M94 58 V64 M102 58 V64 M110 58 V64 M118 58 V64 M126 58 V64",
        k: RASTER,
      },
      { d: "M6 64 H130 M6 52 V64 M46 52 V64 M86 52 V64 M126 52 V64", k: FORM },
      { d: "M30 46 V64 M25 51 L30 46 L35 51", k: ZEIGER },
    ],
  },

  // ABB. 04 Uebergabe und Pflege. Ein Weg, der sich an einem Punkt in zwei
  // gleichwertige Wege teilt. Der Akzent steht auf dem Punkt und nicht auf
  // einem der beiden Wege: die Entscheidung gehoert dem Kunden, nicht mir.
  // Die Gegenfigur dazu steht eine Sektion hoeher, Tafel 04 im Befund: dort
  // endet der Weg vor einem leeren Knopf.
  {
    breite: 168,
    zuege: [
      { d: "M8 38 V50", k: RASTER },
      { d: "M8 44 H72", k: FORM },
      { d: "M72 44 C104 44 108 18 148 18 M72 44 C104 44 108 70 148 70", k: FORM },
      { d: "M148 14 V22 M148 66 V74", k: FORM },
      { d: "M72 26 V62", k: ZEIGER },
    ],
  },
];

/**
 * Die Plaetze im Zwoelfspalter, ausgeschrieben statt gerechnet: Tailwind
 * liest den Quelltext und erzeugt nur Klassen, die woertlich darin stehen.
 * Eine aus dem Index zusammengesetzte Klasse gaebe es im fertigen CSS nicht.
 */
const PLAETZE: readonly string[] = [
  "lg:col-start-1 lg:col-span-6 lg:row-start-1",
  "lg:col-start-8 lg:col-span-5 lg:row-start-1",
  "lg:col-start-1 lg:col-span-5 lg:row-start-2",
  "lg:col-start-7 lg:col-span-6 lg:row-start-2",
];

/**
 * Eine Abbildung. Ausgeloest wird sie von .is-in am <li> darueber
 * (globals.css Abschnitt 6.4). Feste Abmessung, fester viewBox, kein
 * Layout-Sprung: die Zelle ist auch vor dem Zeichnen genau so hoch.
 */
function Abbildung({ index }: { index: number }): ReactElement | null {
  const platte = PLATTEN[index];
  if (!platte) return null;

  return (
    <svg
      viewBox={`0 0 ${platte.breite} 88`}
      width={platte.breite}
      height={88}
      aria-hidden="true"
      focusable="false"
      className="block"
    >
      {platte.zuege.map((zug) => (
        <path
          key={zug.d}
          className={`draw-line ${zug.k}`}
          d={zug.d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function Leistungen(): ReactElement {
  const { eyebrow, headline, intro, items } = seite.leistungen;

  // Beobachter am Bogen und nicht am ganzen Abschnitt: haenge er oben, loeste
  // ihn der Kopf aus, waehrend die Tafeln noch unter der Fensterkante stehen.
  const { ref: bogenRef, revealed } = useReveal<HTMLUListElement>();

  // py-section wie in befund.tsx und showcase.tsx: der Abstand zwischen zwei
  // Sektionen setzt sich damit aus zwei Haelften zusammen, eine je Nachbar.
  // Wichtig ist nur, dass es alle sieben Sektionen gleich machen.
  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      {/* Abschnittsmarke, Ueberschrift, Vorspann. Genau dieselbe Bauform wie
          im Hero und in befund.tsx: erst der Strich, dann die Beschriftung.
          Sieben Sektionen mit sieben Kopfvarianten waeren sieben Handschriften.
          Die Marke steht NICHT in Akzentfarbe: der Akzent gehoert laut
          globals.css dem CTA und dem Befund-Marker. */}
      <header className="max-w-[46rem]">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{eyebrow}</span>
        </p>

        <h2 id="leistungen-titel" className="mt-6 text-display-2 text-balance text-ink">
          {headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{intro}</p>
      </header>

      <ul
        ref={bogenRef}
        className="mt-block grid gap-x-8 gap-y-block sm:grid-cols-2 lg:grid-cols-12"
      >
        {items.map((item, index) => (
          <li
            key={item.titel}
            // reveal UND is-in am selben Element, siehe befund.tsx: das <li>
            // ist zugleich das bewegte Element und der gemeinsame Vorfahr
            // seiner Abbildung.
            className={[
              revealed ? "reveal is-in" : "reveal",
              PLAETZE[index] ?? "",
            ].join(" ")}
            style={
              {
                ["--reveal-delay"]: `${index * STAFFEL_MS}ms`,
                ["--draw-delay"]: `${index * STAFFEL_MS + ZEICHEN_VORLAUF_MS}ms`,
              } as CSSProperties
            }
          >
            {/* Die Grundlinie. Sie gehoert der Zelle und nicht der Zeichnung:
                so laeuft sie unter der Abbildung weiter bis zum Spaltenende
                und wird zur Linie des Bogens. items-end setzt die Zeichnung
                darauf ab, statt sie darueber schweben zu lassen. */}
            <div className="flex items-end border-b border-line2">
              <Abbildung index={index} />
            </div>

            {/* Die Bildunterschrift. Nur die Nummer: den Namen der Abbildung
                traegt die Ueberschrift direkt darunter, und zweimal dasselbe
                waere Doppelung. text-faint und nicht text-mute, weil auch eine
                Nummer gelesen werden koennen muss (4,80:1 statt 2,63:1). */}
            <p className="mono-label-xs mt-4 text-faint">ABB. {String(index + 1).padStart(2, "0")}</p>

            <h3 className="mt-2 text-title text-ink">{item.titel}</h3>

            {/* Gedeckelt auf 32 rem: das breite Feld im Zwoelfspalter ist rund
                560 Pixel, das waeren bei 17 Pixel Fliesstext ueber 65 Zeichen
                je Zeile. Der Ueberschuss geht in den Weissraum rechts, wo er
                dem Bogen guttut. */}
            <p className="mt-3 max-w-[32rem] text-soft">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
