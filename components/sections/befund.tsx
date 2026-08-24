"use client";

import type { CSSProperties, ReactElement } from "react";
import { seite } from "@/content/seite";
import { useReveal } from "@/lib/reveal";

/**
 * Sektion 2: Der Befund (PLAN.md Abschnitt 5).
 *
 * Aufgabe: die Weckung vor dem Beweis. Der Besucher hat in der Mail einen
 * Befund ueber seine eigene Website gelesen; hier steht, dass dieser Befund
 * kein Einzelfall ist, und gleich darunter im Showcase steht er gebaut.
 *
 * DIE FORM IST DIE AUSSAGE: ein Pruefbericht, keine Feature-Kacheln. Vier
 * Zeilen mit laufender Nummer, Messschild-Beschriftung, einem Satz dazu und
 * einer gezeichneten Tafel, getrennt durch Haarlinien und geklammert von
 * Eckwinkeln. Keine Karte, kein Schatten.
 *
 * WARUM JETZT DOCH FIGUREN. Hier stand vorher: "Wer vier gleich grosse
 * Kaesten mit Icons hinstellt, schreibt Werbung." Der Satz gilt weiter, und
 * die Tafeln widersprechen ihm nicht: sie sind keine Piktogramme neben einer
 * Ueberschrift, sondern Zeichnungen, die den benannten Mangel VORFUEHREN.
 * Der Balken fuer unverkleinerte Bilder laeuft aus dem Feld heraus, die
 * Textzeilen laufen aus dem Geraet heraus, der Weg endet vor einem leeren
 * Knopf. Wer eine dieser Tafeln durch ein Symbol ersetzt, das nur "Tempo"
 * bedeutet, hat aus dem Bericht wieder Werbung gemacht.
 * Vier gleich grosse Felder (64 Pixel), eine Strichstaerke, eine Grundlinie
 * auf derselben Hoehe: das macht sie zur Tafelserie und nicht zum Iconset.
 *
 * Bewusst dieselbe Bauform wie die BefundListe in
 * components/showcase/befund-marker.tsx (Nummer in Akzentfarbe, Schild in
 * Versalien, Satz darunter): was hier als Behauptung steht, taucht ein
 * Bildschirm weiter unten als Messschild auf der alten Fassung wieder auf.
 * Zwei Bauformen fuer dieselbe Sache waeren zwei Sprachen.
 *
 * WARUM JETZT DOCH BEWEGUNG. Hier stand vorher: "KEINE BEWEGUNG", mit dem
 * Motion-Budget aus PLAN.md Abschnitt 4 als Begruendung. Das Budget bleibt,
 * die Zuordnung aendert sich: der dritte Moment ("der Befund zeichnet sich
 * gestaffelt, wenn die Sektion in den Blick kommt") gehoert nicht nur den
 * Messschildern ueber der alten Fassung, sondern dem Befund als solchem. Es
 * ist derselbe Vorgang mit demselben Vokabular, einen Bildschirm frueher.
 * Deshalb ist diese Datei eine Client Component: sie braucht den
 * IntersectionObserver aus lib/reveal.ts, sonst nichts.
 *
 * Der Kopf (Marke, Ueberschrift, Vorspann) bewegt sich NICHT. Er steht schon
 * da, waehrend sich der Bericht darunter fuellt. Wer schnell scrollt, sieht
 * also nie eine leere Flaeche, sondern immer mindestens die Ueberschrift.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx (aria-labelledby).
 */

/** Die Eckwinkel der Liste. Eine Stufe leiser als die Vorgabe: sie klammern
 *  das Feld, sie sind nicht sein Rahmen. */
const KLAMMER: CSSProperties = {
  ["--tick-inset" as string]: "clamp(0.5rem, 2vw, 1.25rem)",
  ["--tick-len" as string]: "16px",
  ["--tick-color" as string]: "var(--c-line2)",
} as CSSProperties;

/**
 * Staffel je Zeile. 70 ms liegt in der Spanne, in der eine Reihe als Folge
 * gelesen wird statt als Gleichzeitigkeit; die letzte der vier Zeilen setzt
 * sich bei 210 ms in Bewegung, also lange bevor jemand weitergescrollt ist.
 * Vier Zeilen sind zugleich das ganze Staffelbudget dieser Sektion.
 */
const STAFFEL_MS = 70;

/**
 * Vorlauf der Zeichnung gegenueber dem Erscheinen ihrer Zeile. Die Zeile
 * braucht --d-mid (280 ms) zum Ankommen; faengt die Linie gleichzeitig an,
 * zeichnet sie die erste Haelfte, waehrend sie noch fast durchsichtig ist.
 * 240 ms setzt den Strich also kurz vor das Ende der Blende: die Zeile steht,
 * dann faehrt die Tafel hinein. Spaetester Start ist damit 210 + 240 = 450 ms.
 */
const ZEICHEN_VORLAUF_MS = 240;

/* Zwei Strichstaerken sind es nicht (die ist ueberall 1), zwei Bedeutungen
   schon: --c-line2 ist das Papier, auf dem gemessen wird (Grundlinie,
   Teilung), --c-line3 ist das gezeigte Ding. Der Akzent kommt genau einmal je
   Tafel vor und meint dasselbe wie ueberall auf dieser Seite: hier zeigt
   jemand mit dem Finger drauf. Er sitzt in Spalte vier, die laufende Nummer
   in Spalte eins; die beiden roten Marken einer Zeile stehen also an ihren
   Enden und ballen sich nicht. */
const RASTER = "text-line2";
const FORM = "text-line3";
const MANGEL = "text-accent";

type Strichzug = { d: string; k: string };

/** Dieselbe Grundlinie in allen vier Tafeln, auf derselben Hoehe. Das eine
 *  Bauteil, das aus vier Zeichnungen eine Serie macht. */
const GRUNDLINIE: Strichzug = { d: "M0 55.5 H64", k: RASTER };

/**
 * Die vier Tafeln, in der Reihenfolge von seite.befund.items.
 * Feld 64 mal 64, Grundlinie bei 55,5 (halber Pixel = scharfe Haarlinie).
 *
 * Mehrere Teilstrecken in einem d-Attribut sind Absicht: stroke-dasharray
 * laeuft in SVG ueber Teilstrecken hinweg weiter, ein Strichzug aus vier
 * Teilungsstrichen zeichnet sich also von links nach rechts nacheinander,
 * ohne dass es dafuer vier Pfade und vier Verzoegerungen braucht.
 */
const TAFELN: readonly (readonly Strichzug[])[] = [
  // 01 Tempo ungeprueft. Ein Wasserfall aus drei Posten ueber einem Maszstab.
  // Die ersten beiden enden auf einem Endstrich, der dritte (die Bilder) hat
  // keinen: er laeuft aus dem Feld und damit aus dem Maszstab heraus.
  [
    GRUNDLINIE,
    { d: "M8 51 V55.5 M24 51 V55.5 M40 51 V55.5 M56 51 V55.5", k: RASTER },
    { d: "M8 18 H26 M26 15 V21", k: FORM },
    { d: "M8 30 H36 M36 27 V33", k: FORM },
    { d: "M8 42 H64", k: MANGEL },
  ],

  // 02 Unlesbar am Handy. Ein Geraeteumriss, aus dem drei Textzeilen rechts
  // hinauslaufen. Die mittlere laeuft am weitesten, bis an die Feldkante, und
  // traegt deshalb den Akzent.
  [
    GRUNDLINIE,
    { d: "M4 6 H30 V50 H4 Z", k: FORM },
    { d: "M13 11 H21 M13 46 H21", k: FORM },
    { d: "M9 22 H44 M9 38 H52", k: FORM },
    { d: "M9 30 H64", k: MANGEL },
  ],

  // 03 Design ohne Datum. Seitenkopf alter Bauart: Balken mit drei
  // Navigationsfeldern, darunter ein mittig gesetzter Block und ein
  // unterstrichener Link. Der Akzent ist die Mittelachse, an der alles
  // ausgerichtet ist: nicht der Balken und nicht der Link verraten das
  // Baujahr, sondern die Symmetrie.
  [
    GRUNDLINIE,
    { d: "M4 8 H60 V16 H4 Z M22 8 V16 M40 8 V16", k: FORM },
    { d: "M18 26 H46 M22 32 H42 M24 38 H40", k: FORM },
    { d: "M26 45 H38 M26 48 H38", k: FORM },
    { d: "M32 21 V52", k: MANGEL },
  ],

  // 04 Kein naechster Schritt. Ein Weg aus zwei Stufen, der acht Pixel vor
  // einem leeren Knopfumriss aufhoert. Der Umriss ist der Akzent und er ist
  // leer: der naechste Schritt ist als Flaeche da und als Ziel nicht.
  [
    GRUNDLINIE,
    { d: "M4 42 V50", k: RASTER },
    { d: "M4 46 H16 V32 H30", k: FORM },
    { d: "M38 24 H60 V40 H38 Z", k: MANGEL },
  ],
];

/**
 * Eine Tafel. Ausgeloest wird sie nicht von sich aus, sondern von .is-in am
 * <li> darueber (globals.css Abschnitt 6.4). Feste Abmessung und fester
 * viewBox: die Spalte ist 4 rem breit, es gibt also keinen Layout-Sprung,
 * wenn die Zeichnung erscheint.
 */
function Tafel({ index }: { index: number }): ReactElement | null {
  const zuege = TAFELN[index];
  if (!zuege) return null;

  return (
    <svg
      viewBox="0 0 64 64"
      width={64}
      height={64}
      aria-hidden="true"
      focusable="false"
      // self-start ist Pflicht, nicht Geschmack: die Zeile richtet sich an der
      // Schriftlinie aus (items-baseline), und die Grundlinie eines SVG ist
      // seine Unterkante. Ohne self-start wuerde die Tafel um ihre eigene
      // Hoehe nach unten geschoben, um dort anzudocken.
      className="col-start-2 row-start-3 block self-start md:col-start-4 md:row-start-1"
    >
      {zuege.map((zug) => (
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

export default function Befund(): ReactElement {
  const { befund } = seite;

  // Der Beobachter haengt an der Liste und nicht am ganzen Abschnitt. Haenge
  // er oben, loeste der Kopf ihn aus, waehrend die Zeilen noch unter der
  // Fensterkante stehen: die Staffelung waere dann vorbei, bevor sie jemand
  // sieht.
  const { ref: listeRef, revealed } = useReveal<HTMLOListElement>();

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      <header className="max-w-[46rem]">
        {/* Abschnittsmarke in derselben Bauform wie der Kicker im Hero: erst
            der Strich, dann die Beschriftung. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{befund.eyebrow}</span>
        </p>

        <h2 id="befund-titel" className="mt-6 text-display-2 text-balance text-ink">
          {befund.headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{befund.intro}</p>
      </header>

      {/* Die Befunde. divide-y statt eines Rahmens: es gibt nur Trennlinien
          zwischen den Zeilen, aussen klammern die Eckwinkel. Erst Abstand,
          dann Linie, dann Rahmen, und ein Rahmen ist hier nicht noetig. */}
      <ol
        ref={listeRef}
        className="ticks mt-block max-w-[56rem] divide-y divide-line"
        style={KLAMMER}
      >
        {befund.items.map((item, index) => (
          <li
            key={item.label}
            // reveal UND is-in am selben Element: globals.css schreibt den
            // Endzustand der Zeile als ".reveal.is-in" und den Start der
            // Zeichnung als ".is-in .draw-line". Das <li> ist beides, das
            // bewegte Element und der gemeinsame Vorfahr seiner Tafel.
            className={[
              revealed ? "reveal is-in" : "reveal",
              // Schmal: zwei Spalten, drei Zeilen (Schild, Satz, Tafel). Die
              // Tafel darf sich hier NICHT neben den Satz stellen: bei 390
              // Pixeln blieben der Spalte danach 226 Pixel, also rund 26
              // Zeichen je Zeile, und das ist keine Lesespalte mehr.
              "grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-3 py-6",
              // Breit: vier Spalten, eine Zeile. Die Tafeln stehen dann
              // untereinander am rechten Rand des Berichts und lesen sich als
              // Serie, wie Randabbildungen in einer Publikation.
              "md:grid-cols-[2.25rem_minmax(0,12rem)_minmax(0,1fr)_4rem] md:gap-x-6 md:py-7",
            ].join(" ")}
            style={
              {
                ["--reveal-delay"]: `${index * STAFFEL_MS}ms`,
                ["--draw-delay"]: `${index * STAFFEL_MS + ZEICHEN_VORLAUF_MS}ms`,
              } as CSSProperties
            }
          >
            <span className="mono-label-xs col-start-1 row-start-1 text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mono-label col-start-2 row-start-1 text-ink">{item.label}</h3>

            <p className="col-start-2 row-start-2 max-w-text text-body text-soft md:col-start-3 md:row-start-1">
              {item.text}
            </p>

            <Tafel index={index} />
          </li>
        ))}
      </ol>
    </div>
  );
}
