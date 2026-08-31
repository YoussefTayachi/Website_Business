import Image, { type StaticImageData } from "next/image";

import bildNorthline from "@/public/arbeiten/entwurf-northline.png";
import bildVoltas from "@/public/arbeiten/entwurf-voltas.png";
import bildRidge from "@/public/arbeiten/entwurf-ridge.png";
import bildClearflow from "@/public/arbeiten/entwurf-clearflow.png";
import bildStoneleaf from "@/public/arbeiten/entwurf-stoneleaf.png";
import bildFoxandco from "@/public/arbeiten/entwurf-foxandco.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DIE GALERIE. Sechs Gestaltungen als Karten, drei Spalten.
 *
 * WARUM DIESER ABSCHNITT DIE SEITE TRAEGT: wer Webdesign verkauft, muss
 * Design zeigen. Ein Absatz ueber "modern, schnell, mobil" ueberzeugt
 * niemanden, sechs sichtbar verschiedene Seiten schon. Das Vorbild ist die
 * Vorlagengalerie von Wix, und zwar die BAUFORM: Karte im Browserrahmen,
 * Beschriftung darunter, mehrere nebeneinander. Der Inhalt ist eigener.
 *
 * WARUM BILDER UND KEINE EINGEBETTETEN SEITEN: sechs vollstaendige Seiten im
 * Markup waeren sechs Seiten, die jeder Besucher laedt, ohne eine davon zu
 * bedienen. Die Aufnahmen entstehen aus denselben Komponenten
 * (components/entwuerfe/) ueber scripts/aufnahmen.mjs, sind also nicht
 * abgemalt, sondern abfotografiert.
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
  const { id, augenbraue, titel, lead, karten } = start.galerie;

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

        <ul className="st-galerie__raster">
          {karten.map((k, i) => (
            <li
              key={k.slug}
              className="st-karte st-rise"
              // Die Staffelung laeuft ueber die Karte und nicht ueber die
              // Zeile: bei drei Spalten wandert der Blick von links oben nach
              // rechts unten, und genau dieser Reihenfolge folgt sie.
              style={{ ["--i" as string]: 3 + i }}
            >
              <div className="st-karte__rahmen">
                <span className="st-karte__punkte" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <Image
                  className="st-karte__bild"
                  src={BILD[k.slug]}
                  alt={`Website design for ${k.name}, a ${k.art.toLowerCase()} business.`}
                  sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 44vw, 88vw"
                />
              </div>
              <p className="st-karte__meta">
                <span className="st-karte__name">{k.name}</span>
                <span className="st-karte__art">{k.art}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
