"use client";

import { projekte } from "@/content/projekte";

/**
 * Elektro Musterhaus, neue Fassung.
 *
 * DIE IDEE: ein Leitungsschema. Eine einzige Haarlinie laeuft mit rechten
 * Winkeln durch die Seite, hat an jeder Abzweigung einen Knoten und endet in
 * genau EINEM Punkt. Das ist kein Ornament, sondern die Aussage des
 * Neubaus in Bildform: viele Wege, ein Ziel. Kein Blitz, kein Werkzeug,
 * kein Zahnrad.
 *
 * Aufbau: asymmetrisch. Text links in Lesebreite, Schema rechts in der
 * schmalen Spalte. Von den drei neuen Fassungen ist das die einzige mit
 * zwei ungleichen Spalten.
 *
 * ZONE statt Insel: .neu-fassung benutzt die Tokens dieser Seite, deckelt
 * aber Massstab (--text-demo-1 hoert bei 44 Pixel auf) und Messbezug
 * (container-type: inline-size, also cqi statt vw). Begruendung steht in
 * app/globals.css, Abschnitt 9.
 *
 * Alle Ziele messen mindestens 44 mal 44 Pixel (.nf-navlink, .nf-tap) bzw.
 * 48 Pixel Hoehe (.nf-cta). Der Fliesstext steht in --c-soft: 7,06:1 auf
 * dem Blatt, hell wie dunkel gerechnet.
 */

const projekt = projekte["elektro-musterhaus"];
const neu = projekt.neueFassung;

// Bewusste Wiederverwendung: dieselbe Nummer, die in der alten Fassung als
// Grafik in der Kopfzeile klebt, steht hier als Text. Markierbar, vorlesbar,
// mit 44 Pixel Trefferflaeche. Das ist der Befund und seine Antwort im selben
// Zeichenvorrat. `neueFassung` hat kein eigenes Telefonfeld; kaeme eines
// dazu, gehoert diese Zeile darauf umgestellt.
const telefon = projekt.alteFassung.telefonBildText;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

/** Das Leitungsschema, senkrecht. Nur Deko, deshalb aria-hidden. */
function SchemaHoch() {
  return (
    <svg viewBox="0 0 176 340" fill="none" aria-hidden="true" className="h-auto w-full">
      {/* Der Hauptstrang. vectorEffect haelt ihn bei jeder Groesse auf einem
          Geraetepixel: eine Haarlinie, die mitskaliert, ist keine mehr. */}
      {/* Im Dunklen eine Stufe hoeher: --c-line2 liegt dort bei 1,53:1 zum
          Grund, und damit waere das Schema faktisch weg. Mit --c-line3
          (3,77:1) ist es genauso praesent wie im Hellen, wo line2 gegen
          Papier reicht. Gleichwertig heisst nicht gleich. */}
      <g stroke="currentColor" strokeWidth={1} className="text-line2 dark:text-line3">
        <path d="M10 4 V52 H126 V118 H54 V196 H150 V286 H96 V330" vectorEffect="non-scaling-stroke" />
        <path d="M126 52 H172" vectorEffect="non-scaling-stroke" />
        <path d="M54 118 V150 H12" vectorEffect="non-scaling-stroke" />
        <path d="M150 196 H116 V232" vectorEffect="non-scaling-stroke" />
      </g>
      {/* Abzweigdosen */}
      <g fill="currentColor" className="text-line3">
        <rect x="123" y="49" width="6" height="6" />
        <rect x="51" y="115" width="6" height="6" />
        <rect x="147" y="193" width="6" height="6" />
        <rect x="93" y="283" width="6" height="6" />
      </g>
      {/* Der eine Endpunkt, in der einen Akzentfarbe der Seite. */}
      <g className="text-accent">
        <circle cx="96" cy="330" r="4.5" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Dasselbe Schema liegend, fuer schmale Fenster. */
function SchemaQuer() {
  return (
    <svg viewBox="0 0 340 56" fill="none" aria-hidden="true" className="h-auto w-full">
      {/* Im Dunklen eine Stufe hoeher: --c-line2 liegt dort bei 1,53:1 zum
          Grund, und damit waere das Schema faktisch weg. Mit --c-line3
          (3,77:1) ist es genauso praesent wie im Hellen, wo line2 gegen
          Papier reicht. Gleichwertig heisst nicht gleich. */}
      <g stroke="currentColor" strokeWidth={1} className="text-line2 dark:text-line3">
        <path d="M4 12 H62 V44 H150 V12 H236 V38 H330" vectorEffect="non-scaling-stroke" />
        <path d="M62 12 V2" vectorEffect="non-scaling-stroke" />
        <path d="M150 44 V54" vectorEffect="non-scaling-stroke" />
      </g>
      <g fill="currentColor" className="text-line3">
        <rect x="59" y="41" width="6" height="6" />
        <rect x="147" y="9" width="6" height="6" />
        <rect x="233" y="35" width="6" height="6" />
      </g>
      <g className="text-accent">
        <circle cx="330" cy="38" r="4.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function ElektroMusterhausNeu() {
  return (
    <div className="neu-fassung" data-demo="elektro">
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
        <div className="grid gap-x-gutter gap-y-block @2xl:grid-cols-[minmax(0,1fr)_9.5rem]">
          <div>
            <p className="mono-label text-accent">{projekt.branche}</p>

            <h1 className="mt-4 font-display text-demo-1 text-balance text-ink">
              {neu.ueberschrift}
            </h1>

            <p className="mt-4 max-w-text text-demo-2 text-soft">{neu.unterzeile}</p>

            <div className="mt-block max-w-text space-y-4 text-body text-soft">
              {neu.absaetze.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            {/* Ein Ziel, das ins Auge faellt, und daneben der zweite Weg fuer
                die, die lieber anrufen. Nicht drei gleich laute Knoepfe:
                genau einer ist gefuellt. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-1">
              <a className="nf-cta" href="#" onClick={stopNavigation}>
                {neu.ctaLabel}
              </a>
              <a className="nf-tap" href="#" onClick={stopNavigation}>
                {telefon}
              </a>
            </div>

            <div className="mt-block max-w-text @2xl:hidden">
              <SchemaQuer />
            </div>
          </div>

          <aside className="hidden @2xl:block">
            <SchemaHoch />
          </aside>
        </div>
      </main>

      <footer className="nf-shell max-w-demo mt-auto border-t border-line py-5">
        <p className="text-caption text-faint">{neu.fusszeile}</p>
      </footer>
    </div>
  );
}
