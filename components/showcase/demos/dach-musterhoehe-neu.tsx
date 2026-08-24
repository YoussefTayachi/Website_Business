"use client";

import type { ReactElement } from "react";
import { projekte } from "@/content/projekte";

/**
 * Dachdecker Musterhoehe, neue Fassung.
 *
 * DIE IDEE: der Notruf. Diese Seite wird nicht am Schreibtisch gelesen,
 * sondern um drei Uhr nachts im Sturm, mit einer Hand, ohne Brille, waehrend
 * es auf den Dachboden tropft. Alles, was dabei nicht hilft, ist im Weg.
 * Deshalb: ein Band ueber allem mit dem Satz, der in der alten Fassung fehlt,
 * daneben ein Anruf-Knopf von 56 Pixeln Hoehe, und dasselbe Paar noch einmal
 * unter dem Text. Wo elegant und unmissverstaendlich auseinanderlaufen,
 * gewinnt hier unmissverstaendlich.
 *
 * WARUM ZWEI BAENDER UND KEIN KLEBENDES. Ausfuehrlich begruendet in
 * app/globals.css bei .nf-band: die neue Fassung liegt im Schieber unter
 * einem clip-path, ein position: sticky waere dort an die freigeschnittene
 * Flaeche geheftet statt ans Fenster. Zwei feste Plaetze schlagen einen
 * wandernden. Das untere Band steht direkt hinter dem letzten Absatz, damit
 * es Teil des Textflusses bleibt; der Hoehenausgleich gegenueber der alten
 * Fassung faellt dahinter an, nicht davor.
 *
 * WARUM KEINE ZEICHNUNG. Elektro hat sein Leitungsschema, Bau seine
 * Bautafel. Hier waere ein gezeichnetes Dach genau das: Zierde neben dem
 * einen Ding, das zaehlt. Der einzige gezeichnete Strich dieser Fassung
 * sitzt IM Knopf (der Hoerer) und arbeitet dort: er macht den Knopf ohne ein
 * gelesenes Wort als Anruf erkennbar.
 *
 * ZONE statt Insel: .neu-fassung benutzt die Tokens dieser Seite, deckelt
 * aber Massstab (--text-demo-1 hoert bei 44 Pixel auf) und Messbezug
 * (container-type: inline-size, also cqi statt vw). Begruendung steht in
 * app/globals.css, Abschnitt 9.
 *
 * Die vier Befunde aus content/projekte.ts sind hier aufgeloest, nicht
 * behauptet:
 *   [0] Kein Notdienst sichtbar -> `notdienstHinweis` steht im ersten Band,
 *                                  noch ueber der Kopfzeile, und ein zweites
 *                                  Mal am Ende des Textes. Kein Bildlauf
 *                                  noetig, in keiner Fensterbreite
 *   [1] Schrift 12 Pixel        -> die Absaetze dieser Fassung laufen in
 *                                  --text-demo-2 (17 bis 20 Pixel) statt in
 *                                  --text-body, der Bandsatz ebenso. Die
 *                                  einzige der drei neuen Fassungen mit
 *                                  vergroessertem Fliesstext, und zwar genau
 *                                  wegen dieses Befunds
 *   [2] Tap-Ziel 30 Pixel       -> .nf-cta--gross misst 56 Pixel in der Hoehe
 *                                  (WCAG 2.5.5 verlangt 44), im schmalen
 *                                  Feld ausserdem die volle Satzbreite. Die
 *                                  Navigationsziele messen 44 mal 44
 *   [3] Baujahr in der Fusszeile-> die Fusszeile traegt das LAUFENDE Jahr,
 *                                  gerechnet und nicht getippt (siehe unten)
 *
 * "use client" ist noetig, weil jeder Link hier ins Leere fuehren MUSS: eine
 * gezeigte Website darf die Portfolio-Seite nicht verlassen und auch nicht an
 * ihren Anfang springen.
 */

const projekt = projekte["dach-musterhoehe"];
const neu = projekt.neueFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

/**
 * Der Hoerer im Anruf-Knopf. Haarlinie in currentColor, also in der
 * Schriftfarbe des Knopfes, und damit im selben Zeichenvorrat wie der Rest
 * der Seite. Die alte Fassung hat dasselbe Zeichen gefuellt in 18 Pixeln in
 * einem 30-Pixel-Knopf; der Unterschied zwischen den Fassungen soll die
 * GROESSE sein und nicht die Fuellung, sonst vergleicht der Besucher zwei
 * Geschmaecker statt zweier Masse.
 *
 * shrink-0, weil der Knopf ein Flexcontainer mit umbrechendem Text ist: ohne
 * das quetscht ein langes Label das Zeichen schmal.
 */
function Hoerer(): ReactElement {
  return (
    <svg
      viewBox="0 0 20 20"
      width={20}
      height={20}
      aria-hidden="true"
      focusable="false"
      className="block shrink-0"
    >
      <path
        d="M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H7l1.5 4-1.7 1.3c1 2.4 3 4.4 5.4 5.4l1.3-1.7 4 1.5v1.5c0 1.1-.9 2-2 2C9 16.5 3.5 11 3.5 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Der Notruf: Satz plus Knopf. Steht zweimal auf der Seite, deshalb einmal
 * hier. Zwei Kopien, die irgendwann auseinanderlaufen, waeren genau der
 * Fehler, den diese Fassung an der alten kritisiert.
 *
 * Im schmalen Feld untereinander, und weil die Spalte dabei streckt, wird der
 * Knopf von selbst so breit wie der Satz darueber. Das ist gewollt: der
 * Daumen trifft dann die ganze Zeile. Ab @md nebeneinander, dort schrumpft er
 * auf seine Beschriftung zurueck.
 */
function Notruf({ obenLinie }: { obenLinie?: boolean }): ReactElement {
  return (
    <div className={`nf-band${obenLinie ? " border-t border-accent-line" : ""}`}>
      <div className="nf-shell max-w-demo flex flex-col gap-4 py-4 @md:flex-row @md:items-center @md:justify-between @md:gap-x-6">
        <p className="text-demo-2 font-medium text-ink">{neu.notdienstHinweis}</p>
        <a className="nf-cta nf-cta--gross" href="#" onClick={stopNavigation}>
          <Hoerer />
          {neu.ctaLabel}
        </a>
      </div>
    </div>
  );
}

export default function DachMusterhoeheNeu() {
  // BEFUND [3]: das Baujahr. Gerechnet statt getippt, denn eine Jahreszahl im
  // Quelltext ist genau der Fehler der alten Fassung, nur ein paar Jahre
  // spaeter. suppressHydrationWarning, weil diese Seite vorgerendert wird:
  // faellt der Jahreswechsel zwischen Build und Aufruf, weicht der Wert im
  // Browser vom ausgelieferten HTML ab. Sichtbar richtig ist dann der des
  // Browsers, React soll darueber nur nicht in der Konsole klagen.
  const jahr = new Date().getFullYear();

  return (
    <div className="neu-fassung" data-demo="dach">
      {/* BEFUND [0], erster fester Platz: noch ueber der Kopfzeile. Das erste,
          was auf dieser Seite steht, ist der Satz und der Knopf. */}
      <Notruf />

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

      {/* main traegt hier KEIN nf-shell: das untere Band gehoert in den
          Textfluss, muss aber ueber die volle Breite laufen. Der Seitenrand
          sitzt deshalb an den Bloecken darin. */}
      <main className="flex-1">
        <div className="nf-shell max-w-demo py-block">
          <p className="mono-label text-accent">{projekt.branche}</p>

          <h1 className="mt-4 max-w-text font-display text-demo-1 text-balance text-ink">
            {neu.ueberschrift}
          </h1>

          <p className="mt-4 max-w-text text-demo-2 text-ink">{neu.unterzeile}</p>

          {/* BEFUND [1]: Schriftgroesse. Der Fliesstext dieser Fassung steht
              in --text-demo-2 und nicht in --text-body. Das ist keine
              Verzierung, sondern die Antwort auf die 12 Pixel nebenan: wer
              nachts auf diese Seite kommt, soll nicht zoomen muessen. */}
          <div className="mt-block max-w-text space-y-5 text-demo-2 text-soft">
            {neu.absaetze.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>

        {/* BEFUND [0], zweiter fester Platz. Eigene Oberlinie, weil das Band
            hier mitten im Blatt steht und nicht an dessen Oberkante: unten
            schliesst es .nf-band selbst ab, oben braucht es die Kante dazu. */}
        <Notruf obenLinie />
      </main>

      <footer className="nf-shell max-w-demo mt-auto border-t border-line py-5">
        <p className="text-caption text-faint" suppressHydrationWarning>
          {neu.fusszeile} &copy; {jahr}
        </p>
      </footer>
    </div>
  );
}
