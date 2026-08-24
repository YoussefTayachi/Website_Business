"use client";

import { projekte } from "@/content/projekte";
import { BefundAnker } from "@/components/showcase/befund-marker";

/**
 * Baubetrieb Mustergrund, alte Fassung.
 *
 * Derselbe Baukasten wie bei Elektro Musterhaus, aber die "Business"-Vorlage:
 * schwere Graphitbalken, Versalien in Arial Black ueber Tahoma, ein
 * Signalstreifen unter dem Kopfband, Betonweiss statt Weiss. Kein Foto, kein
 * Projekt, kein Ort. Das ist keine Karikatur: es ist die Seite, die ein
 * Baubetrieb 2011 fuer 39 Euro im Monat bekam und danach nie wieder anfasste.
 *
 * Alle Stile stehen in app/globals.css, Abschnitt 8, unter
 * .alt-blatt[data-demo="bau"]. Die Wurzel hier ist .alt-blatt und NICHT
 * .alt-fassung: die Huelle setzt vorher-nachher.tsx, zwei ineinander waeren
 * zwei Bildlaufbereiche.
 *
 * Die vier Befunde aus content/projekte.ts sind hier gebaut, nicht behauptet:
 *   [0] Keine Referenz sichtbar  -> der Leistungskasten in der rechten Spalte
 *                                   traegt vier nackte Woerter aus
 *                                   `leistungenListe`. Kein Bild, kein Ort,
 *                                   kein Bauvorhaben, nirgends auf der Seite
 *   [1] Feste Breite 980 Pixel   -> .alt-seite ist unter [data-demo="bau"] auf
 *                                   exakt 980px gesetzt, gegen die 900 des
 *                                   gemeinsamen Teils. Nachmessbar
 *   [2] Kontrast 3,4:1           -> #808080 auf #f0efe8 = 3,43:1 (Rechnung im
 *                                   Kopf von Abschnitt 8). Beide Absaetze
 *                                   laufen in diesem Grau
 *   [3] Keine laufende Baustelle -> gezeigt wird, was STATTDESSEN dasteht: der
 *                                   Floskelsatz ueber "Qualitaet, Termintreue
 *                                   und partnerschaftliche Zusammenarbeit" und
 *                                   die Fusszeile mit "Alle Rechte
 *                                   vorbehalten". Ein Hinweis auf das Fehlen
 *                                   waere ein Text ueber die Seite, kein Teil
 *                                   von ihr
 *
 * Jeder BefundAnker steht INLINE an der Stelle, auf die er zeigt: seine Linie
 * beginnt an seiner eigenen Grundlinie. Als eigene Zeile wuerde er das Layout
 * der alten Fassung um eine Zeilenhoehe verschieben, und dann zeigte der
 * Vergleich nicht mehr das, was gebaut wurde.
 *
 * "use client" ist noetig, weil jeder Link hier ins Leere fuehren MUSS: eine
 * gezeigte Website darf die Portfolio-Seite nicht verlassen und auch nicht an
 * ihren Anfang springen.
 */

const projekt = projekte["bau-mustergrund"];
const alt = projekt.alteFassung;

// Die Ueberschrift des Leistungskastens. Bewusst aus der Navigation geholt und
// nicht danebengeschrieben: der Baukasten beschriftete solche Kaesten mit dem
// Menuepunkt, zu dem sie gehoerten, und ein hier erfundenes Wort waere ein
// sichtbarer Text ausserhalb von content/.
const kastenTitel = alt.navigation[1].label;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

export default function BauMustergrundAlt() {
  return (
    <div className="alt-blatt" data-demo="bau">
      <div className="alt-seite">
        {/* BEFUND [1]: die feste Breite. Der Anker haengt am ENDE des
            Werbespruchs, also am aeussersten rechten Ende der 980 Pixel, und
            schlaegt nach links aus. Nach rechts liefe das Schild aus der
            Seite in den Bildlauf hinein und machte die Insel breiter, als sie
            ist. Genau hier sieht man, was der Befund meint: rechts von diesem
            Punkt hoert die Seite auf, egal wie schmal das Fenster ist. */}
        <div className="alt-kopf">
          <div className="alt-logo">{projekt.firma}</div>
          <div className="alt-slogan">
            {alt.unterzeile}
            <BefundAnker index={1} richtung="links" laenge={72} />
          </div>
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

        {/* Das Kopfband des Baukastens. Kein Foto einer Baustelle, sondern der
            Graphitverlauf mit Signalstreifen, den die Vorlage mitbrachte. Es
            wird nichts geladen, alles sind Verlaeufe (siehe globals.css). */}
        <div className="alt-banner" aria-hidden="true" />

        <div className="alt-spalten">
          <div className="alt-inhalt">
            <h1>{alt.ueberschrift}</h1>

            {/* BEFUND [2]: Kontrast. #808080 auf #f0efe8 = 3,43:1, gerundet
                die 3,4:1 aus dem Befund. Dazu Blocksatz ohne Silbentrennung,
                der im Deutschen zuverlaessig Loecher zwischen die Woerter
                reisst.
                Der Anker haengt am ENDE des ersten Absatzes, also an dessen
                letzter Zeile. Gemessen, nicht geraten: am Ende einer VOLLEN
                Blocksatzzeile rutscht er in die naechste Zeile und zeigt auf
                Weissraum, am Anfang einer Blocksatzzeile zaehlt er als
                eigenes Wort und der Blocksatz schiebt eine Luecke dahinter.
                Die letzte Zeile eines Absatzes hat beide Probleme nicht. */}
            <p className="alt-fliess alt-fliess--weak">
              {alt.absaetze[0]}
              <BefundAnker index={2} />
            </p>

            {/* BEFUND [3]: keine laufende Baustelle. Der Anker zeigt auf den
                Satz, der auf dieser Seite an der Stelle steht, an der bei
                einem Baubetrieb ein Projekt stehen muesste: eine Floskel
                ueber die eigene Haltung. Wer wissen will, ob hier gerade
                jemand baut, liest genau das und weiss es danach nicht. */}
            <p className="alt-fliess alt-fliess--weak">
              {alt.absaetze[1]}
              <BefundAnker index={3} />
            </p>

            <hr />

            {/* Der Verlaufsknopf des Baukastens. Er sieht aus wie jeder andere
                Kasten der Seite und faellt deshalb nirgends auf. */}
            <p>
              <a className="alt-knopf" href="#" onClick={stopNavigation}>
                {alt.ctaLabel}
              </a>
            </p>
          </div>

          {/* BEFUND [0]: keine Referenz sichtbar. Vier Woerter in einem
              Rahmen, mehr hat diese Seite ueber ihre Arbeit nicht zu sagen.
              Bewusst KEIN Bildplatz daneben: ein Platzhalterbild wuerde als
              "hier war mal ein Projekt" gelesen und den Befund abschwaechen.
              Der Anker sitzt am letzten Listenpunkt und schlaegt nach links
              aus, weil der Kasten am rechten Rand der festen Seite klebt. */}
          <div className="alt-sidebar">
            <div className="alt-kasten">
              <h2>{kastenTitel}</h2>
              <ul>
                {alt.leistungenListe.map((leistung, i) => (
                  <li key={leistung}>
                    {leistung}
                    {i === alt.leistungenListe.length - 1 ? (
                      <BefundAnker index={0} richtung="links" laenge={72} />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Der dunkle Fussbalken. Er traegt "Alle Rechte vorbehalten" und
            sonst nichts: kein Datum, kein Bauvorhaben, keine Nachricht. */}
        <div className="alt-fuss">
          <div>{alt.fusszeile}</div>
        </div>
      </div>
    </div>
  );
}
