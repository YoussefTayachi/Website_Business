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
 * Das reservierte Feld bleibt leer, die Textzeilen laufen aus dem Geraet
 * heraus, der Weg endet vor einem leeren Knopf. Wer eine dieser Tafeln durch
 * ein Symbol ersetzt, das nur "Beweis" bedeutet, hat aus dem Bericht wieder
 * Werbung gemacht.
 * Vier gleich grosse Felder (96 Pixel), eine Strichstaerke, eine Grundlinie
 * auf derselben Hoehe: das macht sie zur Tafelserie und nicht zum Iconset.
 *
 * DIE TAFEL FUEHRT JETZT DIE ZEILE AN (2026-08-24, neue Zielgruppe). Bis
 * hierher standen die Tafeln im breiten Fenster ganz rechts als
 * Randabbildungen und im schmalen ganz unten, also NACH dem Satz, den sie
 * zeigen. Fuer einen Leser, der jedes Wort liest, ist das die richtige
 * Reihenfolge. Bau, Elektro und Dach lesen nicht, sie scrollen: die Zeichnung
 * steht deshalb am Anfang der Zeile und ist von 64 auf 96 Pixel gewachsen.
 * Wer die Sektion ohne ein Wort durchscrollt, sieht vier Zeichnungen
 * untereinander und hat den Befund verstanden.
 * Aus vier Rasterspalten sind dabei zwei Bloecke geworden (Tafel, Text). Vier
 * Fluchten fuer vier Bauteile waren im schmalen Fenster ohnehin nur drei
 * Zeilen uebereinander, und jede Flucht weniger ist eine Linie weniger, die
 * das Auge halten muss.
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
const GRUNDLINIE: Strichzug = { d: "M0 83.5 H96", k: RASTER };

/**
 * Die vier Tafeln, in der Reihenfolge von seite.befund.items.
 * Feld 96 mal 96, Grundlinie bei 83,5.
 *
 * WARUM ALLE KOORDINATEN AUF HALBEN WERTEN LIEGEN. Ein Strich von einem Pixel
 * wird auf seiner Mittellinie gezeichnet. Liegt die auf einer ganzen
 * Koordinate, verteilt der Browser den Strich auf zwei Geraetepixel und die
 * Haarlinie wird grau statt scharf; auf einer halben Koordinate trifft sie
 * genau einen. Das Feld war frueher 64 Pixel gross und hatte diese Regel nur
 * fuer die Grundlinie; beim Vergroessern auf 96 (Faktor 1,5) sind alle
 * Strecken mitgezogen und ausdruecklich auf halbe Werte gelegt worden.
 * Wer hier etwas ergaenzt, haelt sich daran, sonst faellt eine Linie der Serie
 * gegenueber den anderen ab.
 *
 * Mehrere Teilstrecken in einem d-Attribut sind Absicht: stroke-dasharray
 * laeuft in SVG ueber Teilstrecken hinweg weiter, ein Strichzug aus vier
 * Teilungsstrichen zeichnet sich also von links nach rechts nacheinander,
 * ohne dass es dafuer vier Pfade und vier Verzoegerungen braucht.
 */
const TAFELN: readonly (readonly Strichzug[])[] = [
  // 01 Kein Beweis der Arbeit.
  //
  // NEU GEZEICHNET (2026-08-24). Hier stand "Tempo ungeprueft": ein
  // Bilder-Wasserfall ueber einem Maszstab. Das Thema hat gewechselt
  // (content/seite.ts, befund.items[0]), also musste die Zeichnung mit.
  //
  // Ein Blatt aus Textzeilen, und mitten darin ein Feld, das mit Eckwinkeln
  // markiert und leer ist. Die Eckwinkel sind das eigene Vokabular dieser
  // Seite (globals.css Abschnitt 5, .ticks: die Klammer, mit der ein
  // Messgeraet seinen Anzeigebereich markiert). Genau darin liegt die Aussage:
  // der Platz fuer den Beweis ist reserviert, benannt und leer. Der Betrieb
  // schreibt ueber seine Arbeit, er zeigt sie nicht.
  //
  // Warum kein voller Rahmen und schon gar kein Fotoapparat: ein Rahmen waere
  // ein Bildfeld und damit dasselbe Bauteil, das in Leistungen ABB. 02 die
  // Gegenfigur bildet (dort stehen drei davon auf einer Bautafel). Zwei
  // gleiche Rechtecke mit entgegengesetzter Bedeutung waeren eine Verwechslung
  // mit Ansage. Eckwinkel sagen "hier waere Platz", ein Rahmen sagt "hier ist
  // etwas".
  [
    GRUNDLINIE,
    { d: "M12.5 12.5 H83.5 M12.5 20.5 H68.5", k: FORM },
    {
      d: "M12.5 30.5 H24.5 M12.5 30.5 V42.5 M71.5 30.5 H83.5 M83.5 30.5 V42.5 M12.5 50.5 V62.5 M12.5 62.5 H24.5 M83.5 50.5 V62.5 M71.5 62.5 H83.5",
      k: MANGEL,
    },
    { d: "M12.5 70.5 H83.5 M12.5 77.5 H56.5", k: FORM },
  ],

  // 02 Unlesbar am Handy. Ein Geraeteumriss, aus dem drei Textzeilen rechts
  // hinauslaufen. Die mittlere laeuft am weitesten, bis an die Feldkante, und
  // traegt deshalb den Akzent.
  [
    GRUNDLINIE,
    { d: "M6.5 9.5 H45.5 V75.5 H6.5 Z", k: FORM },
    { d: "M19.5 16.5 H31.5 M19.5 68.5 H31.5", k: FORM },
    { d: "M13.5 33.5 H66 M13.5 57.5 H78", k: FORM },
    { d: "M13.5 45.5 H96", k: MANGEL },
  ],

  // 03 Design ohne Datum. Seitenkopf alter Bauart: Balken mit drei
  // Navigationsfeldern, darunter ein mittig gesetzter Block und ein
  // unterstrichener Link. Der Akzent ist die Mittelachse, an der alles
  // ausgerichtet ist: nicht der Balken und nicht der Link verraten das
  // Baujahr, sondern die Symmetrie.
  [
    GRUNDLINIE,
    { d: "M6.5 12.5 H89.5 V23.5 H6.5 Z M33.5 12.5 V23.5 M60.5 12.5 V23.5", k: FORM },
    { d: "M28 39.5 H69 M34 48.5 H63 M37 57.5 H60", k: FORM },
    { d: "M40 67.5 H57 M40 72.5 H57", k: FORM },
    { d: "M48.5 31.5 V78", k: MANGEL },
  ],

  // 04 Kein Weg zum Anruf. Ein Weg aus zwei Stufen, der zwoelf Pixel vor einem
  // leeren Knopfumriss aufhoert. Der Umriss ist der Akzent und er ist leer:
  // der naechste Schritt ist als Flaeche da und als Ziel nicht.
  // Die Zeichnung ist unveraendert geblieben, obwohl die Ueberschrift jetzt
  // "Kein Weg zum Anruf" heisst statt "Kein naechster Schritt": das Thema ist
  // dasselbe, nur zugespitzt (so steht es auch in content/seite.ts). Ein
  // Telefonhoerer im Knopf waere ein Piktogramm und ausserdem eine Behauptung
  // ueber ein Bedienelement, das es auf der gezeigten Seite gar nicht gibt.
  [
    GRUNDLINIE,
    { d: "M6.5 63.5 V75.5", k: RASTER },
    { d: "M6.5 69.5 H24.5 V48.5 H45", k: FORM },
    { d: "M57.5 36.5 H89.5 V59.5 H57.5 Z", k: MANGEL },
  ],
];

/**
 * Eine Tafel. Ausgeloest wird sie nicht von sich aus, sondern von .is-in am
 * <li> darueber (globals.css Abschnitt 6.4). Feste Abmessung und fester
 * viewBox in derselben Einheit (96 zu 96): der Massstab ist damit exakt 1, die
 * halben Koordinaten liegen auf halben Geraetepixeln, und es gibt keinen
 * Layout-Sprung, wenn die Zeichnung erscheint.
 */
function Tafel({ index }: { index: number }): ReactElement | null {
  const zuege = TAFELN[index];
  if (!zuege) return null;

  return (
    <svg
      viewBox="0 0 96 96"
      width={96}
      height={96}
      aria-hidden="true"
      focusable="false"
      // mt-3 haelt die Nummer auf Abstand, ohne sie zur Bildunterschrift zu
      // machen: sie steht ueber der Tafel, damit sie im breiten Fenster auf
      // derselben Hoehe beginnt wie die Befund-Ueberschrift daneben.
      className="mt-3 block"
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
        className="ticks mt-block max-w-[58rem] divide-y divide-line"
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
              // Schmal: die Tafel steht ueber dem Text, nicht daneben. Sie
              // darf sich hier NICHT neben den Satz stellen: bei 390 Pixeln
              // blieben der Spalte danach rund 220 Pixel, also 23 Zeichen je
              // Zeile, und das ist keine Lesespalte mehr.
              "flex flex-col gap-5 py-9",
              // Breit: Tafel links, Text rechts, beide oben buendig. Die vier
              // Tafeln stehen damit untereinander an der linken Flucht des
              // Berichts und lesen sich als Serie.
              "md:flex-row md:items-start md:gap-10 md:py-12",
            ].join(" ")}
            style={
              {
                ["--reveal-delay"]: `${index * STAFFEL_MS}ms`,
                ["--draw-delay"]: `${index * STAFFEL_MS + ZEICHEN_VORLAUF_MS}ms`,
              } as CSSProperties
            }
          >
            {/* Die Tafel mit ihrer laufenden Nummer. Die Nummer steht
                text-faint und nicht mehr im Akzent: seit die Tafel neben ihr
                steht, laegen sonst zwei Siegellackmarken eine Handbreit
                auseinander, und der Akzent bedeutet auf dieser Seite genau
                einmal je Tafel "hier zeigt jemand drauf". Das darf die
                Zeichnung sagen, nicht die Zaehlung.
                4,80:1 im Hellen wie im Dunklen, also auch als Kleintext
                lesbar. Dieselbe Bauform wie "ABB. 01" in leistungen.tsx. */}
            <div className="flex-none">
              <p className="mono-label-xs text-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <Tafel index={index} />
            </div>

            {/* min-w-0 ist Pflicht in einem Flex-Element mit langen deutschen
                Komposita: ohne das ist die Mindestbreite der Spalte die des
                laengsten Wortes, und die Zeile schiebt im schmalen Fenster
                waagerecht auf. */}
            <div className="min-w-0">
              <h3 className="mono-label text-ink">{item.label}</h3>

              <p className="mt-4 max-w-text text-body text-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
