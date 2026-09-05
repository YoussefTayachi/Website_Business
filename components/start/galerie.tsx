import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import coverNorthline from "@/public/arbeiten/cover-northline.png";
import coverVoltas from "@/public/arbeiten/cover-voltas.png";
import coverRidge from "@/public/arbeiten/cover-ridge.png";
import coverClearflow from "@/public/arbeiten/cover-clearflow.png";
import coverStoneleaf from "@/public/arbeiten/cover-stoneleaf.png";
import coverFoxandco from "@/public/arbeiten/cover-foxandco.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DIE GALERIE. Sechs Gestaltungen als Karten, zwei Spalten.
 *
 * WARUM DIESER ABSCHNITT DIE SEITE TRAEGT: wer Webdesign verkauft, muss
 * Design zeigen. Ein Absatz ueber "modern, schnell, mobil" ueberzeugt
 * niemanden, sechs sichtbar verschiedene Seiten schon.
 *
 * ══ WAS SICH AM 2026-09-05 GEAENDERT HAT ═══════════════════════════════════
 * Zweite Runde mit Youssefs Mentor (2026-09-03): "you can keep the grid but
 * the images of the website needs to change and the hover/border design
 * needs to also be changed (and use the two images I gave you yesterday as
 * reference for the design and the hover effect)". Die zwei Bilder zeigen
 * eine Portfolio-Karte: ein Cover mit Bildmarke auf koernigem Farbring,
 * und beim Ueberfahren wird das Cover unscharf, waehrend unten eine Tafel
 * mit Name, Zeile und einem Link-Knopf hereinfaehrt.
 *
 * 1. DIE KARTE ZEIGT EIN COVER, keine Aufnahme der Seite mehr. Ein
 *    Bildschirmfoto auf 50 Prozent zeigte sechs kleine Seiten; das Cover
 *    (components/entwuerfe/cover.tsx) zeigt Marke, Motiv, Schlagzeile und
 *    Farben des Entwurfs auf einer Flaeche. Die Seite selbst steht weiter
 *    unter /work/<slug>, und dorthin fuehrt die ganze Karte.
 *
 * 2. KEIN RAHMEN, KEIN SCHATTEN, KEIN ANHEBEN. Die Karte ist das Bild mit
 *    runden Ecken, wie in der Vorlage. Beim Ueberfahren wird das Cover
 *    unscharf und waechst leicht, die Tafel kommt von unten (start.css).
 *
 * 3. DIE PILLE AM ZEIGER IST WEG. Ihre Aufgabe ("hier geht es weiter")
 *    uebernimmt der Knopf in der Tafel. galerie-zeiger.tsx ist geloescht.
 *
 * Ohne feinen Zeiger steht die Tafel fest sichtbar da und das Cover bleibt
 * scharf: eine Angabe, die man nur beim Ueberfahren sieht, gibt es auf
 * einem Telefon nicht.
 *
 * DIE ZUORDNUNG VON SLUG ZU BILD STEHT HIER und nicht im Inhalt: ein
 * statischer Import ist Code, und nur er gibt next/image die Masse schon
 * beim Bauen mit. Ohne die springt beim Laden das ganze Raster.
 */
const COVER: Record<string, StaticImageData> = {
  northline: coverNorthline,
  voltas: coverVoltas,
  ridge: coverRidge,
  clearflow: coverClearflow,
  stoneleaf: coverStoneleaf,
  foxandco: coverFoxandco,
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
              // Zeile: bei zwei Spalten wandert der Blick von links oben nach
              // rechts unten, und genau dieser Reihenfolge folgt sie.
              style={{ ["--i" as string]: 3 + i }}
            >
              <Link className="st-karte__weg" href={`/work/${k.slug}`}>
                <span className="st-karte__rahmen">
                  <Image
                    className="st-karte__bild"
                    src={COVER[k.slug]}
                    alt={`Cover of the ${k.name} website design (${k.art.toLowerCase()}).`}
                    sizes="(min-width: 64rem) 34rem, (min-width: 52rem) 46vw, 92vw"
                  />

                  {/* Die Tafel. Sie liegt IN der Karte, damit die Karte ein
                      Bild bleibt und nicht Bild plus Beschriftung ist. */}
                  <span className="st-karte__tafel">
                    <span className="st-karte__meta">
                      <span className="st-karte__name">{k.name}</span>
                      <span className="st-karte__art">{k.art}</span>
                    </span>
                    {/* Der Knopf ist Zierde: der Name daneben ist bereits der
                        Linktext, und zwei Beschriftungen fuer einen Weg sind
                        fuer einen Vorleser eine Wiederholung. */}
                    <span className="st-karte__knopf" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                      </svg>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
