import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import bildNorthline from "@/public/arbeiten/entwurf-northline.png";
import bildVoltas from "@/public/arbeiten/entwurf-voltas.png";
import bildRidge from "@/public/arbeiten/entwurf-ridge.png";
import bildClearflow from "@/public/arbeiten/entwurf-clearflow.png";
import bildStoneleaf from "@/public/arbeiten/entwurf-stoneleaf.png";
import bildFoxandco from "@/public/arbeiten/entwurf-foxandco.png";

import GalerieZeiger from "./galerie-zeiger";
import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DIE GALERIE. Sechs Gestaltungen als Karten, zwei Spalten.
 *
 * WARUM DIESER ABSCHNITT DIE SEITE TRAEGT: wer Webdesign verkauft, muss
 * Design zeigen. Ein Absatz ueber "modern, schnell, mobil" ueberzeugt
 * niemanden, sechs sichtbar verschiedene Seiten schon.
 *
 * ══ WAS SICH AM 2026-09-01 GEAENDERT HAT ═══════════════════════════════════
 * Drei Punkte aus dem Review von Youssefs Mentor, alle drei stecken hier:
 *
 * 1. DER FENSTERRAHMEN IST WEG ("remove the fake computer button"). Die drei
 *    grauen Punkte behaupteten einen Browser, den es nicht gibt, und kosteten
 *    oben in jeder Karte rund 40 Pixel, die dem Entwurf gehoerten.
 *
 * 2. JEDE KARTE IST EIN WEG. Sie fuehrt auf /work/<slug>, wo der Entwurf als
 *    echte, bedienbare Seite steht. Deshalb liegt der Link um die GANZE
 *    Karte und nicht nur um den Knopf: eine Karte, die aussieht wie ein Weg,
 *    muss ueberall ein Weg sein.
 *
 * 3. DIE ANGABEN LIEGEN IN DER KARTE statt darunter. Beim Ueberfahren
 *    schiebt sich die Tafel mit Name, Gewerk und Pfeil von unten herein.
 *    OHNE feinen Zeiger steht sie fest sichtbar da: eine Angabe, die man nur
 *    beim Ueberfahren sieht, gibt es auf einem Telefon nicht.
 *
 * WARUM BILDER UND KEINE EINGEBETTETEN SEITEN: sechs vollstaendige Seiten im
 * Markup waeren sechs Seiten, die jeder Besucher laedt, ohne eine davon zu
 * oeffnen. Die Aufnahmen entstehen aus genau den Komponenten, die auch
 * /work/<slug> rendert (components/entwuerfe/), ueber scripts/aufnahmen.mjs.
 * Sie sind also nicht abgemalt, sondern abfotografiert.
 *
 * DIE ZUORDNUNG VON SLUG ZU BILD STEHT HIER und nicht im Inhalt: ein
 * statischer Import ist Code, und nur er gibt next/image die Masse schon
 * beim Bauen mit. Ohne die springt beim Laden das ganze Raster.
 */
const BILD: Record<string, StaticImageData> = {
  northline: bildNorthline,
  voltas: bildVoltas,
  ridge: bildRidge,
  clearflow: bildClearflow,
  stoneleaf: bildStoneleaf,
  foxandco: bildFoxandco,
};

export default function StartGalerie() {
  const { id, augenbraue, titel, lead, karten, zeiger } = start.galerie;

  return (
    <Reveal as="section" id={id} className="st-sect st-galerie">
      <div className="st-wrap">
        <div className="st-galerie__kopf">
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            {augenbraue}
          </p>
          <h2 className="st-rise" style={{ ["--i" as string]: 1 }}>
            {titel}
          </h2>
          <p className="st-lead st-rise" style={{ ["--i" as string]: 2 }}>
            {lead}
          </p>
        </div>

        <GalerieZeiger label={zeiger}>
        <ul className="st-galerie__raster">
          {karten.map((k, i) => (
            <li
              key={k.slug}
              className="st-karte st-rise"
              // Die Staffelung laeuft ueber die Karte und nicht ueber die
              // Zeile: bei zwei Spalten wandert der Blick von links oben nach
              // rechts unten, und genau dieser Reihenfolge folgt sie.
              style={{ ["--i" as string]: 3 + i }}
            >
              <Link className="st-karte__weg" href={`/work/${k.slug}`}>
                <span className="st-karte__rahmen">
                  <Image
                    className="st-karte__bild"
                    src={BILD[k.slug]}
                    alt={`Website design for ${k.name}, a ${k.art.toLowerCase()} business.`}
                    sizes="(min-width: 64rem) 34rem, (min-width: 52rem) 46vw, 92vw"
                  />

                  {/* Die Tafel. Sie liegt IN der Karte, damit die Karte ein
                      Bild bleibt und nicht Bild plus Beschriftung ist. */}
                  <span className="st-karte__tafel">
                    <span className="st-karte__meta">
                      <span className="st-karte__name">{k.name}</span>
                      <span className="st-karte__art">{k.art}</span>
                    </span>
                    {/* Der Pfeil ist Zierde: der Name daneben ist bereits der
                        Linktext, und zwei Beschriftungen fuer einen Weg sind
                        fuer einen Vorleser eine Wiederholung. */}
                    <span className="st-karte__pfeil" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18 18 6M9 6h9v9" />
                      </svg>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        </GalerieZeiger>
      </div>
    </Reveal>
  );
}
