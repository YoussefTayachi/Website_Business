"use client";

import type { ReactElement } from "react";
import { projekte } from "@/content/projekte";

/**
 * Baubetrieb Mustergrund, neue Fassung.
 *
 * DIE IDEE: eine Bautafel. Nicht die Behauptung "wir bauen", sondern drei
 * gezeichnete Bauwerke mit Titel und Ort, in derselben Haarlinien-Bildsprache
 * wie der Rest der Seite. Der Betrieb wird an dem gemessen, was dasteht.
 *
 * WARUM DIE TAFEL NACH OBEN GEHOERT. Der Befund der alten Fassung ist nicht
 * "die Referenzen stehen weit unten", sondern "es gibt keine". Die Antwort
 * darauf muss die erste Flaeche unter dem Kopf sein, sonst loest die neue
 * Fassung den Befund erst nach einem Bildlauf auf und der Vergleich im
 * Schieber zeigt an derselben Stelle wieder nichts.
 *
 * Aufbau: eine Spalte, mittig, ueber die ganze Satzbreite. Elektro hat die
 * asymmetrische Zweispaltigkeit, hier traegt die Serie. Drei gleich breite
 * Felder unter einer durchgehenden Haarlinie lesen sich als Register; ein
 * Zickzack aus Text und Bild waere eine Werbestrecke.
 *
 * ZONE statt Insel: .neu-fassung benutzt die Tokens dieser Seite, deckelt
 * aber Massstab (--text-demo-1 hoert bei 44 Pixel auf) und Messbezug
 * (container-type: inline-size, also cqi statt vw). Begruendung steht in
 * app/globals.css, Abschnitt 9.
 *
 * Die vier Befunde aus content/projekte.ts sind hier aufgeloest, nicht
 * behauptet:
 *   [0] Keine Referenz sichtbar  -> die Bautafel. Drei Projekte, jedes mit
 *                                   Titel, Ort und gezeichnetem Bauwerk,
 *                                   direkt unter dem Kopf
 *   [1] Feste Breite 980 Pixel   -> es gibt in dieser Datei keine einzige
 *                                   Pixelbreite und keine einzige
 *                                   Fensterabfrage. Jede Umbruchstelle ist
 *                                   eine Container-Query (@md, @3xl) und
 *                                   misst die Panelbreite, nicht das Fenster.
 *                                   Genau das ist der Unterschied zu 980px:
 *                                   die Seite waechst mit ihrer Flaeche
 *   [2] Kontrast 3,4:1           -> Fliesstext steht in --c-soft (7,06:1),
 *                                   Kleintext in --c-faint (4,80:1),
 *                                   Ueberschriften in --c-ink (15,56:1).
 *                                   Hell wie dunkel gerechnet, siehe
 *                                   Abschnitt 2 in globals.css
 *   [3] Keine laufende Baustelle -> das dritte Bauwerk. Es traegt seinen
 *                                   Status im Titel ("im Bau") UND in der
 *                                   Zeichnung: halbfertige oberste Decke,
 *                                   Kran darueber. Wer die Tafel ohne ein
 *                                   Wort ansieht, sieht trotzdem, dass zwei
 *                                   Bauwerke stehen und eines gerade waechst
 *
 * Alle Ziele messen mindestens 44 mal 44 Pixel (.nf-navlink) bzw. 48 Pixel
 * Hoehe (.nf-cta).
 *
 * "use client" ist noetig, weil jeder Link hier ins Leere fuehren MUSS: eine
 * gezeigte Website darf die Portfolio-Seite nicht verlassen und auch nicht an
 * ihren Anfang springen.
 */

const projekt = projekte["bau-mustergrund"];
const neu = projekt.neueFassung;

// Die Ueberschrift der Bautafel. Bewusst aus der Navigation geholt und nicht
// danebengeschrieben: dieselbe Loesung wie beim Leistungskasten der alten
// Fassung (siehe bau-mustergrund-alt.tsx). Ein hier erfundenes Wort waere ein
// sichtbarer Text ausserhalb von content/.
const TAFEL_TITEL = neu.navigation[0].label;

// Eindeutig je Projekt, weil auf der Startseite mehrere Demo-Fassungen
// nebeneinander im selben Dokument stehen koennen.
const TAFEL_ID = "nf-bau-tafel";

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

/* Zwei Bedeutungen, eine Strichstaerke (die ist ueberall 1). Dasselbe
   Vokabular wie in components/sections/befund.tsx: --c-line2 ist das Papier,
   auf dem gemessen wird (hier: der Baugrund), --c-line3 ist das gezeigte
   Ding. Der Akzent kommt in der ganzen Tafel GENAU EINMAL vor, naemlich am
   Kran des dritten Bauwerks, und meint dort dasselbe wie ueberall auf dieser
   Seite: hier zeigt jemand mit dem Finger drauf. Zwei fertige Bauwerke in
   Akzentfarbe waeren drei gleich laute Dinge und damit keins. */
const BAUGRUND = "text-line2";
const FORM = "text-line3";
const LAUFEND = "text-accent";

type Strichzug = { d: string; k: string };

/**
 * Dieselbe Grundlinie in allen drei Zeichnungen, auf derselben Hoehe und ueber
 * die volle Feldbreite. Das eine Bauteil, das aus drei Zeichnungen eine Serie
 * macht statt drei Icons (dieselbe Entscheidung wie bei den Tafeln in
 * components/sections/befund.tsx). Auch der Kran steht darauf, nicht daneben.
 */
const GRUNDLINIE: Strichzug = { d: "M0 63.5 H128", k: BAUGRUND };

/**
 * Die drei Bauwerke, in der Reihenfolge von neueFassung.referenzen.
 * Feld 128 mal 72, gezeichnet in Geraetepixeln (1:1, siehe <Bauwerk>).
 *
 * Alle Koordinaten liegen auf halben Pixeln. Eine Haarlinie auf einer ganzen
 * Koordinate liegt auf der Pixelgrenze und wird auf zwei halb gedeckte Reihen
 * verteilt, also grau statt scharf. Bei Diagonalen ist das egal, dort stehen
 * runde Werte.
 *
 * Mehrere Teilstrecken in einem d-Attribut sind Absicht: was zusammen eine
 * Bedeutung hat (beide Aussenwaende, alle Fensteroeffnungen), steht in einem
 * Strichzug.
 */
const BAUWERKE: readonly (readonly Strichzug[])[] = [
  // 01 Einfamilienhaus, Rohbau. Giebelhaus mit Satteldach. Tuer und Fenster
  // sind blosse Oeffnungen ohne Fuellung und ohne Rahmen: genau das ist ein
  // Rohbau, und es kostet keinen einzigen Strich extra, es so zu zeigen.
  [
    GRUNDLINIE,
    { d: "M33.5 63.5 V35.5 M94.5 63.5 V35.5", k: FORM },
    { d: "M33.5 35.5 H94.5", k: FORM },
    { d: "M28.5 37 L64 13 L99.5 37", k: FORM },
    { d: "M56.5 63.5 V47.5 H71.5 V63.5", k: FORM },
    { d: "M41.5 41.5 H49.5 V51.5 H41.5 Z M78.5 41.5 H86.5 V51.5 H78.5 Z", k: FORM },
  ],

  // 02 Lagerhalle, Erweiterung. Die Halle links mit flachem Satteldach und
  // Tor, rechts der niedrigere Anbau mit Flachdach, der sich an die
  // bestehende Wand lehnt. Die gemeinsame Wand ist der ganze Punkt: eine
  // Erweiterung ist kein zweites Gebaeude.
  [
    GRUNDLINIE,
    { d: "M9.5 63.5 V42.5 M83.5 63.5 V42.5", k: FORM },
    { d: "M7 43.5 L46.5 31 L86 43.5", k: FORM },
    { d: "M27.5 63.5 V47.5 H51.5 V63.5", k: FORM },
    { d: "M83.5 49.5 H117.5 V63.5", k: FORM },
    { d: "M81 49.5 H119.5", k: FORM },
    { d: "M93.5 54.5 H103.5 V59.5 H93.5 Z", k: FORM },
  ],

  // 03 Mehrfamilienhaus, im Bau. Drei Geschosse, aber die oberste Decke ist
  // nur zur Haelfte gezogen und es gibt kein Dach: der Strich hoert mitten im
  // Bauwerk auf. Darueber der Kran, das einzige Akzentzeichen der Tafel.
  // Ein Gittermast aus zwei Senkrechten mit drei Sprossen, weil eine einzelne
  // Linie als Fahnenstange gelesen wird; der Ausleger reicht ueber das
  // Bauwerk, das Hubseil endet ueber der offenen Decke.
  [
    GRUNDLINIE,
    { d: "M19.5 63.5 V25.5 M75.5 63.5 V25.5", k: FORM },
    { d: "M19.5 50.5 H75.5 M19.5 38.5 H75.5", k: FORM },
    { d: "M19.5 25.5 H49.5", k: FORM },
    {
      d: "M27.5 54.5 H35.5 V60.5 H27.5 Z M59.5 54.5 H67.5 V60.5 H59.5 Z M27.5 42.5 H35.5 V48.5 H27.5 Z M59.5 42.5 H67.5 V48.5 H59.5 Z",
      k: FORM,
    },
    { d: "M97.5 63.5 V11.5 M101.5 63.5 V11.5", k: LAUFEND },
    { d: "M97.5 51.5 H101.5 M97.5 37.5 H101.5 M97.5 23.5 H101.5", k: LAUFEND },
    { d: "M55.5 11.5 H123.5", k: LAUFEND },
    { d: "M63.5 11.5 V20.5 M61.5 20.5 H65.5", k: LAUFEND },
  ],
];

/**
 * Ein gezeichnetes Bauwerk. Feste Abmessung und fester viewBox, also 1:1: so
 * liegen die halben Koordinaten oben auf echten Pixelmitten und die Haarlinie
 * bleibt eine. Deko, deshalb aria-hidden; die Aussage steht als Text daneben.
 */
function Bauwerk({ index }: { index: number }): ReactElement | null {
  const zuege = BAUWERKE[index];
  if (!zuege) return null;

  return (
    <svg
      viewBox="0 0 128 72"
      width={128}
      height={72}
      aria-hidden="true"
      focusable="false"
      className="block"
    >
      {zuege.map((zug) => (
        <path
          key={zug.d}
          className={zug.k}
          d={zug.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          // Haelt den Strich bei jeder Groesse auf einem Geraetepixel: eine
          // Haarlinie, die mitskaliert, ist keine mehr.
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function BauMustergrundNeu() {
  return (
    <div className="neu-fassung" data-demo="bau">
      <header className="nf-shell max-w-demo flex flex-wrap items-center justify-between gap-x-4 border-b border-line py-3">
        <span className="font-display text-title text-ink">{projekt.firma}</span>
        {/* -mr-2.5 zieht den Innenabstand des letzten Ziels aus der Flucht:
            optisch buendig mit dem Seitenrand, ohne die Trefferflaeche zu
            beschneiden. */}
        <nav className="-mr-2.5 flex flex-wrap items-center">
          {neu.navigation.map((n) => (
            <a key={n.label} className="nf-navlink" href={n.href} onClick={stopNavigation}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="nf-shell max-w-demo flex-1 py-block">
        <p className="mono-label text-accent">{projekt.branche}</p>

        <h1 className="mt-4 max-w-text font-display text-demo-1 text-balance text-ink">
          {neu.ueberschrift}
        </h1>

        <p className="mt-4 max-w-text text-demo-2 text-soft">{neu.unterzeile}</p>

        <p className="mt-6 max-w-text text-body text-soft">{neu.absaetze[0]}</p>

        {/* Genau ein Knopf auf der ganzen Seite. Der Dachdecker nebenan
            wiederholt seinen (dort ist der Anruf der Notfall), hier waere ein
            zweiter nur ein zweites lautes Ding neben der Tafel. Der Schluss
            dieser Seite ist der Beweis, nicht die Aufforderung. */}
        <div className="mt-8">
          <a className="nf-cta" href="#" onClick={stopNavigation}>
            {neu.ctaLabel}
          </a>
        </div>

        <section aria-labelledby={TAFEL_ID} className="mt-block">
          <h2 id={TAFEL_ID} className="mono-label text-ink">
            {TAFEL_TITEL}
          </h2>

          {/* Der zweite Absatz aus content/ steht hier und nicht oben: er
              beschreibt woertlich, was direkt darunter zu sehen ist ("Jedes
              Projekt steht mit Ort und einem Satz auf dieser Seite"). Ueber
              der Tafel ist er eine Bildunterschrift, im Kopf waere er eine
              Ankuendigung. */}
          <p className="mt-3 max-w-text text-body text-soft">{neu.absaetze[1]}</p>

          {/* Geordnete Liste, weil die Reihenfolge in content/projekte.ts eine
              Aussage ist: zwei fertige Bauwerke, dann das laufende.
              Die Haarlinie sitzt an jedem Eintrag und nicht an der Liste: im
              breiten Feld setzen die drei Oberkanten zusammen die Tafelkante,
              im schmalen trennen dieselben drei Linien die Eintraege. Ein
              Rahmen ist dafuer nicht noetig, und ein zusaetzlicher Strich an
              der Liste waere direkt ueber dem ersten Eintrag eine
              Doppellinie. */}
          <ol className="mt-8 grid gap-8 @3xl:grid-cols-3 @3xl:gap-x-gutter">
            {neu.referenzen.map((referenz, i) => (
              <li
                key={referenz.titel}
                className={[
                  "grid gap-y-4 border-t border-line pt-6",
                  // Mittlere Breite: Zeichnung links, Text rechts. 8rem ist
                  // exakt die Feldbreite der Zeichnung (128 Pixel), die Spalte
                  // schneidet sie also nicht an.
                  "@md:grid-cols-[8rem_minmax(0,1fr)] @md:items-start @md:gap-x-6",
                  // Breites Feld: drei Spalten nebeneinander, Zeichnung wieder
                  // ueber dem Text. Dieselbe Bewegung wie bei den Tafeln in
                  // components/sections/befund.tsx.
                  "@3xl:grid-cols-1",
                ].join(" ")}
              >
                <Bauwerk index={i} />
                <div>
                  <h3 className="text-demo-2 font-medium text-ink">{referenz.titel}</h3>
                  {/* Der Ort als Messschild und nicht als Fliesstext: er ist
                      ein Registereintrag, kein Satz. Dasselbe Bauteil, das
                      auf dieser Seite ueberall Beschriftung traegt. */}
                  <p className="mono-label mt-2 text-soft">{referenz.ort}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="nf-shell max-w-demo mt-auto border-t border-line py-5">
        <p className="text-caption text-faint">{neu.fusszeile}</p>
      </footer>
    </div>
  );
}
