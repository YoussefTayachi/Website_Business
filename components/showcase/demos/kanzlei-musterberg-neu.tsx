"use client";

import { projekte } from "@/content/projekte";

/**
 * Kanzlei Musterberg, neue Fassung.
 *
 * DIE IDEE: ein Register. Links laeuft eine schmale Randspalte mit, in der
 * jeder Abschnitt seine Nummer traegt und ganz oben ein einzelnes
 * Paragraphenzeichen steht: das Zeichen des Fachs, einmal gesetzt, nicht
 * ueber die Seite gestreut. Der Text selbst bleibt streng linksbuendig und
 * bekommt ueber jedem Block eine Haarlinie. Das ist die Antwort auf den
 * Befund "Textwueste": nicht mehr Text, sondern sichtbare Ordnung.
 *
 * Die Nummern sind keine Zierde und kein erfundener Text: sie sind die
 * Lesereihenfolge der Bloecke, also eine echte Information. Deshalb stehen
 * sie in --text-label-xs, der Stufe, die in globals.css ausdruecklich fuer
 * "Beschriftung ohne eigenen Inhalt: Nummern" reserviert ist.
 *
 * Der Unterschied zu den anderen beiden neuen Fassungen ist der Aufbau, nicht
 * die Farbe: Kanzlei = streng links mit Randspalte, Elektro = asymmetrisch
 * zweispaltig mit Leitungsschema, Gasthof = mittig wie ein Aushang.
 * Die Ueberschrift ist hier bewusst die ruhigste der drei (max-w-text statt
 * voller Breite): eine Kanzlei wird nicht lauter, sie wird klarer.
 */

const projekt = projekte["kanzlei-musterberg"];
const neu = projekt.neueFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

export default function KanzleiMusterbergNeu() {
  return (
    <div className="neu-fassung" data-demo="kanzlei">
      <header className="nf-shell max-w-demo flex flex-wrap items-center justify-between gap-x-4 border-b border-line py-3">
        <span className="font-display text-title text-ink">{projekt.firma}</span>
        <nav className="-mr-2.5 flex flex-wrap items-center">
          {neu.navigation.map((n) => (
            <a key={n.label} className="nf-navlink" href={n.href} onClick={stopNavigation}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="nf-shell max-w-demo flex-1 py-block">
        {/* Die Randspalte ist 4,5rem breit und traegt in schmalen Fenstern
            nichts: dort ruecken Nummer und Zeichen ueber ihren Block. Ein
            hangender Rand, der nicht mehr haengt, waere nur verlorener Platz. */}
        <div className="grid gap-x-gutter @2xl:grid-cols-[4.5rem_minmax(0,1fr)]">
          <div aria-hidden="true" className="hidden @2xl:block">
            {/* text-line3 und nicht text-line2: als reines Zeichen darf das
                Paragraphenzeichen leise sein, aber bei 1,47:1 waere es auf
                mittelmaessigen Monitoren schlicht weg. */}
            <span className="font-display text-display-3 leading-none text-line3">§</span>
          </div>

          <div>
            <p className="mono-label text-accent">{projekt.branche}</p>
            <h1 className="mt-4 max-w-text font-display text-demo-1 text-balance text-ink">
              {neu.ueberschrift}
            </h1>
            <p className="mt-4 max-w-text text-demo-2 text-pretty text-soft">{neu.unterzeile}</p>
          </div>
        </div>

        <div className="mt-block space-y-6">
          {neu.absaetze.map((text, i) => (
            <div
              key={text}
              className="grid gap-x-gutter border-t border-line pt-4 @2xl:grid-cols-[4.5rem_minmax(0,1fr)]"
            >
              {/* tabular-nums ueber .mono-num: 01 und 02 stehen damit exakt
                  gleich breit untereinander, auch wenn spaeter 10 dazukommt. */}
              <p className="mono-label-xs mono-num text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 max-w-text text-body text-soft @2xl:mt-0">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-block grid gap-x-gutter @2xl:grid-cols-[4.5rem_minmax(0,1fr)]">
          <div />
          <div>
            <a className="nf-cta" href="#" onClick={stopNavigation}>
              {neu.ctaLabel}
            </a>
          </div>
        </div>
      </main>

      <footer className="nf-shell max-w-demo mt-auto border-t border-line py-5">
        <p className="text-caption text-faint">{neu.fusszeile}</p>
      </footer>
    </div>
  );
}
