"use client";

import { projekte } from "@/content/projekte";

/**
 * Gasthof Mustertal, neue Fassung.
 *
 * DIE IDEE: ein Aushang an der Tuer. Die ganze Seite ist symmetrisch um eine
 * Mittelachse gebaut, mit Haarlinien oben und unten wie bei einer gedruckten
 * Tafel. Das Zeichen dazu ist ein Gedeck von oben, aus zwei Kreisen, einem
 * Glas und einer Serviette: das Erste, was ein Gast sieht, wenn er sich
 * setzt. Kein Besteck-Symbol, kein Weinglas-Klischee, keine Schnoerkelschrift.
 *
 * Der Unterschied zu den anderen beiden neuen Fassungen ist der Aufbau, nicht
 * die Farbe: Es gibt genau einen Akzent auf dieser Seite, und er gilt auch
 * hier. Gasthof = mittig und symmetrisch, Elektro = asymmetrisch zweispaltig,
 * Kanzlei = streng links mit Randspalte.
 *
 * WICHTIG bei mittiger Komposition: die Komposition ist zentriert, der
 * LESETEXT nicht. Zentrierter Fliesstext zwingt das Auge, bei jeder Zeile den
 * Anfang neu zu suchen. Die beiden Absaetze stehen deshalb linksbuendig in
 * zwei Spalten, getrennt von einer Haarlinie, wie zwei Spalten auf einem
 * gedruckten Aushang.
 */

const projekt = projekte["gasthof-mustertal"];
const neu = projekt.neueFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

/** Ein Gedeck von oben. Zwei Kreise, ein Glas, eine Serviette. Nur Deko. */
function Gedeck() {
  return (
    <svg viewBox="0 0 168 116" fill="none" aria-hidden="true" className="h-auto w-full">
      {/* Der Teller sitzt auf der Mitte des Zeichenfelds (cx = 84 von 168) und
          nicht in der Mitte seiner eigenen Gruppe. In einer mittigen
          Komposition zaehlt, wo das Hauptelement steht, nicht wo der
          Rahmen um alles zufaellig endet. */}
      {/* Im Dunklen eine Stufe hoeher: --c-line2 liegt dort bei 1,53:1 zum
          Grund, das Gedeck waere faktisch weg. --c-line3 (3,77:1) macht es
          genauso praesent wie im Hellen. Gleichwertig heisst nicht gleich. */}
      <g stroke="currentColor" strokeWidth={1} className="text-line2 dark:text-line3">
        {/* Teller und Innenrand */}
        <circle cx="84" cy="58" r="38" vectorEffect="non-scaling-stroke" />
        <circle cx="84" cy="58" r="28" vectorEffect="non-scaling-stroke" />
        {/* Serviette, laengs gefaltet */}
        <rect x="8" y="36" width="15" height="45" rx="3" vectorEffect="non-scaling-stroke" />
        {/* Glas */}
        <circle cx="148" cy="38" r="11" vectorEffect="non-scaling-stroke" />
      </g>
      {/* Der einzige Akzent: der Fuss des Glases. Ein Punkt, mehr braucht es
          nicht, damit das Zeichen zur uebrigen Seite gehoert. */}
      <g stroke="currentColor" strokeWidth={1} className="text-accent">
        <circle cx="148" cy="38" r="6" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export default function GasthofMustertalNeu() {
  return (
    <div className="neu-fassung" data-demo="gasthof">
      {/* Kein Firmenname in der Kopfzeile: der Name IST die Ueberschrift
          gleich darunter. Ihn zweimal zu setzen waere Fuellmaterial und
          naehme der Ueberschrift ihre Wirkung.
          -mx-2.5 zieht den Innenabstand der aeusseren Ziele aus der Flucht,
          damit die Reihe optisch mittig steht und nicht um eine halbe
          Trefferflaeche verschoben wirkt. */}
      <header className="nf-shell max-w-demo border-b border-line py-2 text-center">
        <nav className="-mx-2.5 flex flex-wrap items-center justify-center">
          {neu.navigation.map((n) => (
            <a key={n.label} className="nf-navlink" href={n.href} onClick={stopNavigation}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="nf-shell max-w-demo flex-1 py-block text-center">
        <p className="mono-label text-accent">{projekt.branche}</p>

        <h1 className="mt-4 font-display text-demo-1 text-balance text-ink">
          {neu.ueberschrift}
        </h1>
        <p className="mx-auto mt-4 max-w-text text-demo-2 text-pretty text-soft">
          {neu.unterzeile}
        </p>

        <div className="mx-auto mt-block w-42">
          <Gedeck />
        </div>

        {/* Zwei Spalten, eine Haarlinie dazwischen, kein Rasterabstand: der
            Abstand kommt links und rechts von der Linie aus gleich grossem
            Innenabstand, sonst sitzt die Linie schief im Zwischenraum.
            Linksbuendig, obwohl alles drumherum mittig sitzt: gelesen wird
            von links. */}
        <div className="mx-auto mt-block grid gap-y-6 text-left @2xl:grid-cols-2">
          <p className="text-body text-soft @2xl:pr-gutter">{neu.absaetze[0]}</p>
          <p className="text-body text-soft @2xl:border-l @2xl:border-line @2xl:pl-gutter">
            {neu.absaetze[1]}
          </p>
        </div>

        <div className="mt-block">
          <a className="nf-cta" href="#" onClick={stopNavigation}>
            {neu.ctaLabel}
          </a>
        </div>
      </main>

      <footer className="nf-shell max-w-demo mt-auto border-t border-line py-5 text-center">
        <p className="text-caption text-faint">{neu.fusszeile}</p>
      </footer>
    </div>
  );
}
