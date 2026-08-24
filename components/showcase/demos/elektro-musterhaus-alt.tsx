"use client";

import { useId } from "react";
import { projekte } from "@/content/projekte";
import { BefundAnker } from "@/components/showcase/befund-marker";

/**
 * Elektro Musterhaus, alte Fassung.
 *
 * Das ist keine Karikatur. Es ist eine Baukastenseite von 2012, die jemand
 * ernst gemeint hat: fest auf 900 Pixel gesetzt, Grauverlauf, Verlaufsknopf,
 * Blocksatz, Besucherzaehler. Nur so erkennt der Besucher aus der
 * Kaltakquise-Mail seine eigene Seite wieder, und nur so wirkt der Kontrast
 * zur neuen Fassung.
 *
 * Alle Stile stehen in app/globals.css unter .alt-fassung. Kein Token und
 * keine Schrift dieser Seite wirkt hinein, keine Regel von dort hinaus.
 * Die Wurzel hier ist .alt-blatt und nicht .alt-fassung: die Huelle setzt
 * vorher-nachher.tsx, zwei ineinander waeren zwei Bildlaufbereiche.
 *
 * Die vier Befunde aus content/projekte.ts sind hier gebaut, nicht behauptet:
 *   [0] Telefonnummer als Grafik  -> SVG in der Kopfzeile, nicht markierbar,
 *                                    kein tel:-Link, andere Schrift, unscharf
 *   [1] Kein Kontaktweg sichtbar  -> die Adresse steht als Satz im Fliesstext,
 *                                    darunter ein blasser Textlink, sonst
 *                                    nichts
 *   [2] Tap-Ziel 26 Pixel         -> .alt-nav--eng, Hoehe exakt 26 Pixel
 *   [3] Kontrast 2,9:1            -> #979797 auf #ffffff = 2,92:1 (gerechnet)
 *
 * Jeder BefundAnker steht INLINE an der Stelle, auf die er zeigt: seine Linie
 * beginnt an seiner eigenen Grundlinie. Als eigene Zeile wuerde er das Layout
 * der alten Fassung um eine Zeilenhoehe verschieben, und dann zeigte der
 * Vergleich nicht mehr das, was gebaut wurde.
 *
 * "use client" ist noetig, weil jeder Link hier ins Leere fuehren MUSS: eine
 * gezeigte Website darf die Portfolio-Seite nicht verlassen und auch nicht
 * an ihren Anfang springen.
 */

const projekt = projekte["elektro-musterhaus"];
const alt = projekt.alteFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

export default function ElektroMusterhausAlt() {
  // Die Filter-ID muss auf der Seite eindeutig sein: drei Demos koennen
  // gleichzeitig im DOM stehen. useId liefert in React 19 Zeichen, die in
  // url(#...) nichts zu suchen haben, deshalb alles Nicht-Alphanumerische weg.
  const blurId = "tel-" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className="alt-blatt" data-demo="elektro">
      <div className="alt-seite">
        <div className="alt-kopf">
          <div className="alt-logo">{projekt.firma}</div>

          {/* BEFUND [0]: die Telefonnummer als Grafik. Ein SVG statt Text.
              Nicht markierbar (user-select: none in globals.css), nicht
              antippbar (kein tel:), in einer anderen Schrift als der Rest und
              leicht unscharf, wie eine als JPEG gespeicherte Schriftgrafik.
              role="img" mit aria-label bleibt trotzdem stehen: die Kritik
              gilt der gezeigten Website, sie ist kein Grund, die eigene
              Portfolio-Seite unbenutzbar zu machen.
              Der Anker steht VOR der Grafik und schlaegt nach links aus: die
              Grafik klebt am rechten Rand der festen Seite, nach rechts liefe
              das Schild aus dem Rahmen, und stuende der Anker dahinter, laege
              das Schild genau auf dem, worauf es zeigt. */}
          <span>
            <BefundAnker index={0} richtung="links" />
            <span className="alt-telbild">
              <svg
                width={204}
                height={26}
                viewBox="0 0 204 26"
                role="img"
                aria-label={alt.telefonBildText}
              >
                <defs>
                  <filter id={blurId} x="-4%" y="-20%" width="108%" height="140%">
                    <feGaussianBlur stdDeviation="0.35" />
                  </filter>
                </defs>
                <rect width="204" height="26" fill="#f2f2f2" />
                <text
                  x="8"
                  y="18"
                  filter={`url(#${blurId})`}
                  fontFamily="Verdana, Geneva, sans-serif"
                  fontSize="15"
                  fontWeight="700"
                  fill="#1f3b57"
                >
                  {alt.telefonBildText}
                </text>
              </svg>
            </span>
          </span>
        </div>

        {/* BEFUND [2]: Tap-Ziel. .alt-nav--eng setzt Hoehe und Mindestbreite
            auf 26 Pixel. Der Anker sitzt IM ersten Menuepunkt, nicht neben
            der Liste: nur dort zeigt die Linie auf ein Ziel und nicht auf die
            Leiste als Ganzes. */}
        <ul className="alt-nav alt-nav--eng">
          {alt.navigation.map((n, i) => (
            <li key={n.label}>
              <a href={n.href} onClick={stopNavigation}>
                {n.label}
              </a>
              {i === 0 ? <BefundAnker index={2} /> : null}
            </li>
          ))}
        </ul>

        {/* Das Kopfband des Baukastens. Kein Foto des Betriebs, sondern der
            Verlauf, den die Vorlage mitbrachte. Es wird nichts geladen. */}
        <div className="alt-banner" aria-hidden="true" />

        <div className="alt-spalten">
          <div className="alt-inhalt">
            <h1>{alt.ueberschrift}</h1>
            <p>
              <b>{alt.unterzeile}</b>
            </p>

            {/* BEFUND [3]: Kontrast. #979797 auf #ffffff = 2,92:1, gerundet
                die 2,9:1 aus dem Befund. Dazu Blocksatz ohne Silbentrennung,
                der im Deutschen zuverlaessig Loecher zwischen die Woerter
                reisst.
                Der Anker haengt am ENDE des ersten Absatzes, also an dessen
                letzter Zeile. Gemessen, nicht geraten: am Ende einer VOLLEN
                Blocksatzzeile rutscht er in die naechste Zeile und zeigt auf
                Weissraum, am Anfang einer Blocksatzzeile zaehlt er als
                eigenes Wort und der Blocksatz schiebt eine Luecke dahinter.
                Die letzte Zeile eines Absatzes hat beide Probleme nicht: sie
                wird nicht mehr ausgetrieben und hat rechts Platz. */}
            <p className="alt-fliess alt-fliess--weak">
              {alt.absaetze[0]}
              <BefundAnker index={3} />
            </p>
            <p className="alt-fliess alt-fliess--weak">{alt.absaetze[1]}</p>

            <hr />

            {/* BEFUND [1], erster Teil: die Adresse selbst. Ein Satz im
                Blocksatz, mitten im Text, ohne Link, ohne Knopf, ohne
                Aufforderung. Genau das meint der Befund mit "in Fliesstext
                gesetzt": wer anfragen will, muss die Adresse abschreiben.
                Ohne diese Zeile beschriebe der Befund etwas, das auf der
                gezeigten Seite gar nicht steht. */}
            <p className="alt-fliess">{alt.emailZeile}</p>

            {/* BEFUND [1], zweiter Teil: der einzige Kontaktweg. Kein Knopf,
                keine Flaeche, kein Formular: ein blauer Textlink unter allem
                anderen, in derselben Groesse wie die Fusszeile. */}
            <p className="alt-klein">
              <a href="#" onClick={stopNavigation}>
                {alt.ctaLabel}
              </a>
              <BefundAnker index={1} />
            </p>
          </div>

          <div className="alt-sidebar">
            {/* Der Stockfoto-Platz. Es wird nie eine Datei geladen: die
                Flaeche STELLT ein Bild dar. Das Kreuz ist die Vorschau, die
                ein Browser fuer ein fehlendes Bild zeichnete. */}
            <div className="alt-bildplatz">
              <svg viewBox="0 0 210 132" width="100%" height="132" aria-hidden="true">
                <path
                  d="M0 0 L210 132 M210 0 L0 132"
                  stroke="#bdbdbd"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x="72"
                  y="46"
                  width="66"
                  height="40"
                  fill="#dcdcdc"
                  stroke="#b0b0b0"
                  strokeWidth="1"
                />
                <path d="M78 80 L94 62 L106 74 L118 64 L132 80 Z" fill="#b3b3b3" />
                <circle cx="122" cy="56" r="5" fill="#c9c9c9" />
              </svg>
            </div>

            {/* Dieselbe Navigation ein zweites Mal, jetzt als Aufzaehlung mit
                Standardpunkten. Auch das gehoert zum Fundstueck: der
                Baukasten bot die Liste an, also stand sie da. */}
            <ul>
              {alt.navigation.map((n) => (
                <li key={n.label}>
                  <a href={n.href} onClick={stopNavigation}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="alt-fuss">
          <span className="alt-zaehler" aria-hidden="true">
            {"012345".split("").map((ziffer, i) => (
              <span key={i}>{ziffer}</span>
            ))}
          </span>
          <div className="alt-fuss-zeile">© 2014</div>
          <div>{alt.fusszeile}</div>
        </div>
      </div>
    </div>
  );
}
