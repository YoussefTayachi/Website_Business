"use client";

import { projekte } from "@/content/projekte";
import { BefundAnker } from "@/components/showcase/befund-marker";

/**
 * Dachdecker Musterhoehe, alte Fassung.
 *
 * Die dritte Variante desselben Baukastens: die "rustikale". Ziegelrot statt
 * Blau, Trebuchet ueber Verdana, mittiger Kopf, ein gelber Lauftextbalken, die
 * Navigation ein zweites Mal in der linken Spalte, unten ein Besucherzaehler.
 * Genau so sah eine Handwerkerseite von 2013 aus, und genau daran erkennt der
 * Besucher aus der Kaltakquise-Mail seine eigene.
 *
 * Alle Stile stehen in app/globals.css, Abschnitt 8, unter
 * .alt-blatt[data-demo="dach"]. Die Wurzel hier ist .alt-blatt und NICHT
 * .alt-fassung: die Huelle setzt vorher-nachher.tsx, zwei ineinander waeren
 * zwei Bildlaufbereiche.
 *
 * Die vier Befunde aus content/projekte.ts sind hier gebaut, nicht behauptet:
 *   [0] Kein Notdienst sichtbar -> der Zeitenkasten in der linken Spalte nennt
 *                                  `oeffnungszeiten` und sonst nichts:
 *                                  Montag bis Freitag, 8 bis 17 Uhr. Wer beim
 *                                  Sturm um drei Uhr nachts sucht, findet auf
 *                                  der ganzen Seite kein zweites Wort dazu
 *   [1] Schrift 12 Pixel        -> das Blatt selbst steht auf font-size 12px
 *                                  (die Insel steht sonst auf 13). Jeder
 *                                  Absatz misst nachpruefbar 12 Pixel
 *   [2] Tap-Ziel 30 Pixel       -> .alt-anruf, exakt 30 mal 30 Pixel
 *                                  einschliesslich Rahmen. Nicht 26, das ist
 *                                  der Wert der Elektro-Fassung
 *   [3] Baujahr in der Fusszeile-> "© 2013" steht woertlich in
 *                                  `alteFassung.fusszeile`, der Anker zeigt
 *                                  darauf
 *
 * Der Anruf-Knopf ist der EINZIGE Kontaktweg dieser Fassung, und das ist
 * Absicht: der Befund spricht von "dem Anruf-Knopf". Gaebe es daneben einen
 * zweiten, grossen Knopf, waere der Befund zwar noch wahr, aber belanglos.
 * `ctaLabel` steht deshalb als aria-label an dieser Flaeche und nicht als
 * Beschriftung daneben: in 30 Pixeln hat kein Wort Platz, und genau das ist
 * der Punkt. Die Kritik gilt der gezeigten Website, sie ist kein Grund, die
 * eigene Portfolio-Seite unbenutzbar zu machen.
 *
 * Jeder BefundAnker steht INLINE an der Stelle, auf die er zeigt: seine Linie
 * beginnt an seiner eigenen Grundlinie. Als eigene Zeile wuerde er das Layout
 * der alten Fassung um eine Zeilenhoehe verschieben.
 *
 * "use client" ist noetig, weil jeder Link hier ins Leere fuehren MUSS: eine
 * gezeigte Website darf die Portfolio-Seite nicht verlassen und auch nicht an
 * ihren Anfang springen.
 */

const projekt = projekte["dach-musterhoehe"];
const alt = projekt.alteFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

/**
 * Das Bildchen der Vorlage: ein gezeichnetes Ziegeldach, kein Foto. Es wird
 * nie eine Datei geladen, die Flaeche IST das Bild. Flache Farben und harte
 * Kanten, weil die Clipart dieser Baukaesten genau so aussah.
 */
function ZiegelClipart() {
  return (
    <svg viewBox="0 0 166 96" width="100%" height="96" aria-hidden="true">
      <rect width="166" height="96" fill="#cdd6db" />
      {/* Hauskoerper */}
      <rect x="30" y="56" width="106" height="40" fill="#e7ded2" />
      <rect x="70" y="72" width="26" height="24" fill="#8f7f6f" />
      {/* Schornstein, hinter dem Dach angesetzt */}
      <rect x="112" y="24" width="14" height="24" fill="#9a5b48" />
      {/* Dachflaeche */}
      <path d="M83 14 L156 58 H10 Z" fill="#a8442e" />
      {/* Ziegelreihen. Vier Striche reichen: mehr liest sich als Schraffur. */}
      <g stroke="#8b3625" strokeWidth="1.5" fill="none">
        <path d="M65 24 L38 40" />
        <path d="M101 24 L128 40" />
        <path d="M47 35 L23 49" />
        <path d="M119 35 L143 49" />
      </g>
      {/* Firstziegel */}
      <path d="M83 14 L83 58" stroke="#7d2f20" strokeWidth="2" />
    </svg>
  );
}

/** Das Telefonzeichen im 30-Pixel-Knopf. 18 mal 18, damit es mittig sitzt. */
function Hoerer() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M2.2 4.4C2.2 3 3.2 2 4.6 2h1.9l1.4 3.9-2 1.4c.9 2.3 2.3 3.7 4.6 4.6l1.4-2 3.9 1.4v1.9c0 1.4-1 2.4-2.4 2.4C7 15.6 2.4 11 2.2 4.4Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function DachMusterhoeheAlt() {
  return (
    <div className="alt-blatt" data-demo="dach">
      <div className="alt-seite">
        <div className="alt-kopf alt-kopf--mittig">
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

          {/* BEFUND [2]: der Anruf-Knopf. 30 mal 30 Pixel, am rechten Ende der
              Leiste, wie ihn der Baukasten als "Schnellkontakt" anbot. Der
              Anker steht IM Listenpunkt und schlaegt nach links aus: der Knopf
              klebt am rechten Rand der festen Seite, nach rechts liefe das
              Schild aus dem Rahmen. */}
          <li className="alt-nav-anruf">
            <a
              className="alt-anruf"
              href="#"
              onClick={stopNavigation}
              aria-label={alt.ctaLabel}
            >
              <Hoerer />
            </a>
            <BefundAnker index={2} richtung="links" laenge={72} />
          </li>
        </ul>

        {/* Der Lauftext. Die einzige Dauerschleife im ganzen Projekt und
            bewusst Teil des Fundstuecks. Bei prefers-reduced-motion steht er
            still und bleibt von Anfang an lesbar (Regel in globals.css,
            Abschnitt 7). Kein BefundAnker darin: ein Schild, das mitfaehrt,
            zeigt auf nichts. */}
        <div className="alt-lauftext">
          <span>{alt.unterzeile}</span>
        </div>

        <div className="alt-spalten">
          <div className="alt-sidebar alt-sidebar--links">
            {/* Dieselbe Navigation ein zweites Mal, jetzt als Linkliste. Auch
                das gehoert zum Fundstueck: der Baukasten bot beides an, also
                stand beides da. */}
            <ul className="alt-nav-seite">
              {alt.navigation.map((n) => (
                <li key={n.label}>
                  <a href={n.href} onClick={stopNavigation}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="alt-bildplatz">
              <ZiegelClipart />
            </div>

            {/* BEFUND [0]: kein Notdienst sichtbar. Der Kasten sagt, wann
                jemand rangeht, und schweigt zu der einen Nacht, in der es
                darauf ankommt. Der Anker zeigt genau auf diesen Satz und
                schlaegt nach rechts aus, in die Inhaltsspalte hinein: nach
                links liefe er aus der Seite. */}
            <div className="alt-zeiten">
              {alt.oeffnungszeiten}
              <BefundAnker index={0} />
            </div>
          </div>

          <div className="alt-inhalt">
            <h1>{alt.ueberschrift}</h1>

            {/* BEFUND [1]: Schriftgroesse. Der Wert steht am Blatt und wirkt
                deshalb auf jeden Absatz dieser Fassung, nicht nur auf diesen
                einen. Der Anker haengt am ENDE des ersten Absatzes: am Anfang
                einer Blocksatzzeile zaehlt er als eigenes Wort und der
                Blocksatz schiebt eine sichtbare Luecke dahinter, in der Mitte
                einer vollen Zeile rutscht er um. Die letzte Zeile eines
                Absatzes hat beide Probleme nicht. */}
            <p className="alt-fliess">
              {alt.absaetze[0]}
              <BefundAnker index={1} />
            </p>
            <p className="alt-fliess">{alt.absaetze[1]}</p>
          </div>
        </div>

        <div className="alt-fuss">
          <span className="alt-zaehler" aria-hidden="true">
            {"012345".split("").map((ziffer, i) => (
              <span key={i}>{ziffer}</span>
            ))}
          </span>
          {/* BEFUND [3]: das Baujahr. "© 2013" steht woertlich in der
              Fusszeile aus content/projekte.ts, hier wird es nur gesetzt.
              richtung="links": die Fusszeile steht mittig und endet weit
              rechts, nach rechts liefe das Schild aus der festen Seite heraus
              und machte den Bildlauf der Insel unnoetig breit. */}
          <div className="alt-fuss-zeile">
            {alt.fusszeile}
            <BefundAnker index={3} richtung="links" laenge={72} />
          </div>
        </div>
      </div>
    </div>
  );
}
