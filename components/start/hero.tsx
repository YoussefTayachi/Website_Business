import telefonBild from "@/public/arbeiten/elektro-neu-390.png";

import Geraet from "./geraet";
import Reveal from "./reveal";
import Zeigerlicht from "./zeigerlicht";
import { Worte } from "./worte";
import { start } from "@/content/start";

/**
 * Der Hero.
 *
 * WAS HIER ANDERS IST ALS AUF frostbreaker.app: dort traegt den Helden ein
 * reiner Lichtverlauf, weil das Produkt zwei Angebote hat und ein Bild die
 * Seite auf eines davon festlegen wuerde. Hier ist es umgekehrt. Diese Seite
 * verkauft Gestaltung, und ein Gestalter, der im ersten Bildschirm nichts
 * zeigt, argumentiert gegen sich selbst. Deshalb steht rechts ein Telefon
 * mit einer ECHTEN Aufnahme einer gebauten Seite darin, nicht eine
 * Zeichnung und nicht ein Stockfoto.
 *
 * Das Bild kommt als statischer Import und nicht als Zeichenkette: nur so
 * kennt next/image die Masse schon beim Bauen, reserviert den Platz und
 * laesst beim Laden nichts springen. Geraet rechnet aus denselben Massen
 * aus, wie weit die Aufnahme im Rahmen wandern darf.
 *
 * Die Ueberschrift laeuft wortweise ein (Worte), alles darunter gestaffelt
 * (--i). Der Zaehler der Ueberschrift und der der Absaetze sind bewusst
 * getrennt: die Ueberschrift hat ihren eigenen, schnelleren Takt.
 */
export default function StartHero() {
  const { augenbraue, headline, lead, cta, zweitCta, ctaZusatz } = start.hero;

  return (
    <section className="st-hero">
      <Zeigerlicht className="st-hero__licht" />

      <Reveal as="div" className="st-wrap st-hero__in">
        <div>
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            {augenbraue}
          </p>

          <h1>
            <Worte
              segmente={[
                { text: headline.vor },
                { text: headline.akzent, klasse: "st-akzent" },
              ]}
            />
            {headline.nach}
          </h1>

          <p className="st-lead st-hero__lead st-rise" style={{ ["--i" as string]: 5 }}>
            {lead}
          </p>

          <div className="st-hero__knoepfe st-rise" style={{ ["--i" as string]: 6 }}>
            <a className="st-pill" href={cta.href}>
              {cta.label}
              <span className="st-pill__pfeil" aria-hidden="true">
                →
              </span>
            </a>
            <a className="st-link" href={zweitCta.href}>
              {zweitCta.label}
            </a>
          </div>

          <p className="st-hero__zusatz st-rise" style={{ ["--i" as string]: 7 }}>
            {ctaZusatz}
          </p>
        </div>

        <div className="st-rise" style={{ ["--i" as string]: 4 }}>
          <Geraet bild={telefonBild} />
        </div>
      </Reveal>
    </section>
  );
}
