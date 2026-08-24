"use client";

import { projekte } from "@/content/projekte";
import { BefundAnker } from "@/components/showcase/befund-marker";

/**
 * Gasthof Mustertal, alte Fassung.
 *
 * Dieselbe Baukasten-Vorlage wie bei Elektro Musterhaus, nur in der
 * "rustikalen" Variante: Georgia statt Arial, Braun statt Blau, dazu ein
 * gelber Lauftextbalken. Genau so funktionierten diese Baukaesten, und genau
 * daran erkennt der Besucher aus der Kaltakquise-Mail seine eigene Seite.
 *
 * Alle Stile stehen in app/globals.css unter .alt-blatt[data-demo="gasthof"].
 * Die Wurzel hier ist .alt-blatt und nicht .alt-fassung: die Huelle setzt
 * vorher-nachher.tsx, zwei ineinander waeren zwei Bildlaufbereiche.
 *
 * Jeder BefundAnker steht INLINE an der Stelle, auf die er zeigt: seine Linie
 * beginnt an seiner eigenen Grundlinie. Als eigene Zeile wuerde er das Layout
 * der alten Fassung um eine Zeilenhoehe verschieben.
 *
 * Die vier Befunde aus content/projekte.ts, gebaut statt behauptet:
 *   [0] Speisekarte als PDF     -> Link mit PDF-Symbol, href="#", onClick
 *                                  verhindert die Navigation: er fuehrt
 *                                  nirgendwohin
 *   [1] Startbild 4 Megabyte    -> ein Bildplatz, der noch laedt. KEINE echte
 *                                  Datei und keine erfundene Ladezeit: ein
 *                                  Rahmen mit stehendem Ladebalken bei 31 %
 *   [2] Oeffnungszeiten veraltet-> die Fusszeile verweist auf Facebook
 *   [3] Kontrast 3,1:1          -> weisse Schrift auf hellem Verlauf.
 *                                  #ffffff auf #929292 = 3,11:1 am dunkelsten
 *                                  Punkt, auf #9a9a9a = 2,81:1 am hellsten.
 *                                  Der Befund nennt den besten Wert, den die
 *                                  Schrift hier ueberhaupt erreicht.
 */

const projekt = projekte["gasthof-mustertal"];
const alt = projekt.alteFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

export default function GasthofMustertalAlt() {
  return (
    <div className="alt-blatt" data-demo="gasthof">
      <div className="alt-seite">
        <div className="alt-kopf">
          <div className="alt-logo">{projekt.firma}</div>
        </div>

        <ul className="alt-nav">
          {alt.navigation.map((n) => (
            <li key={n.label}>
              <a href={n.href} onClick={stopNavigation}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Der Lauftext. Die einzige Dauerschleife im ganzen Projekt und
            bewusst Teil des Fundstuecks. Bei prefers-reduced-motion steht er
            still und bleibt von Anfang an lesbar (Regel in globals.css,
            Abschnitt 7). */}
        <div className="alt-lauftext">
          <span>{alt.absaetze[1]}</span>
        </div>

        {/* BEFUND [1] und [3] in einem Bauteil, weil sie im Original auch
            zusammen auftraten: ein grosses Startbild, ueber das weisse
            Schrift gelegt wurde. Das Bild ist hier ein Platz, keine Datei. */}
        <div className="alt-bildplatz">
          <div className="alt-hellband">
            <h1>{alt.ueberschrift}</h1>
            <p>
              {alt.unterzeile}
              <BefundAnker index={3} />
            </p>
          </div>

          {/* Der Anker steht IM Ladebalken. Der hat eine feste Hoehe von 12
              Pixeln, deshalb verschiebt die zusaetzliche Zeilenbox nichts. */}
          <div className="alt-ladebalken">
            <i />
            <BefundAnker index={1} />
          </div>
        </div>

        <div className="alt-spalten">
          <div className="alt-inhalt">
            <p className="alt-fliess">{alt.absaetze[0]}</p>

            {/* BEFUND [0]: die Karte als Datei. Das Symbol ist gebaut, nicht
                geladen, und der Link fuehrt nirgendwohin. Eine Dateigroesse
                steht bewusst nicht daneben: sie stuende in keiner Textquelle
                und waere damit erfunden. */}
            <p>
              <a className="alt-pdf" href="#" onClick={stopNavigation}>
                <svg width="14" height="17" viewBox="0 0 14 17" aria-hidden="true">
                  <path
                    d="M0.5 0.5 H9 L13.5 5 V16.5 H0.5 Z"
                    fill="#f4f4f4"
                    stroke="#9a9a9a"
                    strokeWidth="1"
                  />
                  <path d="M9 0.5 V5 H13.5" fill="none" stroke="#9a9a9a" strokeWidth="1" />
                  <rect x="1" y="8" width="12" height="7" fill="#b8232f" />
                  <text
                    x="7"
                    y="13.6"
                    textAnchor="middle"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fontSize="5"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    PDF
                  </text>
                </svg>
                {alt.speisekarteDateiLabel}
              </a>
              <BefundAnker index={0} />
            </p>

            <p>
              <a className="alt-knopf" href="#" onClick={stopNavigation}>
                {alt.ctaLabel}
              </a>
            </p>
          </div>

          <div className="alt-sidebar">
            {/* Stockfoto-Platz mit sichtbarem Rahmen. Auch hier wird nichts
                geladen: die Flaeche stellt ein Bild dar. */}
            <div className="alt-bildplatz">
              <svg viewBox="0 0 210 120" width="100%" height="120" aria-hidden="true">
                <rect width="210" height="120" fill="#dad3c4" />
                <path d="M0 86 L62 48 L104 78 L146 52 L210 96 V120 H0 Z" fill="#b8ae99" />
                <circle cx="164" cy="34" r="14" fill="#cfc7b4" />
                <path
                  d="M0 0 H210 V120 H0 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* BEFUND [2]: die Oeffnungszeiten stehen nicht hier, sondern auf
            Facebook. Der Satz dazu steht so in der Fusszeile der Vorlage. */}
        <div className="alt-fuss">
          <span className="alt-zaehler" aria-hidden="true">
            {"012345".split("").map((ziffer, i) => (
              <span key={i}>{ziffer}</span>
            ))}
          </span>
          <div className="alt-fuss-zeile">© 2014</div>
          {/* richtung="links": die Fusszeile steht mittig und endet weit
              rechts. Nach rechts liefe das Schild aus der festen Seite
              heraus und machte den Bildlauf der Insel unnoetig breit. */}
          <div>
            {alt.fusszeile}
            <BefundAnker index={2} richtung="links" />
          </div>
        </div>
      </div>
    </div>
  );
}
