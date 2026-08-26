import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";
import { HeroCollage } from "./zeichnungen";

/**
 * HERO. Riesenzeile ueber die volle Breite, zwei schmale Introspalten rechts
 * darunter, dann die grosse Karte.
 *
 * Die Figur ist die der Referenz und sie hat einen Grund: die Zeile nimmt die
 * ganze Breite, weil sie das Lauteste auf der Seite sein soll, und der Text
 * laeuft rechts aus, weil er das Zweitlauteste ist und nicht daneben treten
 * darf. Drei gleich laute Dinge waeren kein lautes.
 *
 * Die Zeilen der Headline liegen einzeln in einer Maske und schieben
 * nacheinander hoch (--st-i ist der Versatz). Die Mechanik dazu steht
 * geschlossen in start.css, nicht hier.
 */
export default function StartHero() {
  const { headline, intro, bildAlt } = start.hero;

  return (
    <section className="st-hero st-wrap">
      <Reveal>
        <h1 className="st-h1 st-rise">
          {headline.map((zeile, i) => (
            <span
              key={zeile}
              className="st-rise__line"
              style={{ "--st-i": i } as CSSProperties}
            >
              <span>{zeile}</span>
            </span>
          ))}
        </h1>
      </Reveal>

      <Reveal className="st-hero__intro">
        {intro.map((absatz, i) => (
          <p
            key={absatz}
            className="st-lead st-fade"
            style={{ "--st-i": i } as CSSProperties}
          >
            {absatz}
          </p>
        ))}
      </Reveal>

      {/* figure ohne figcaption: die Beschreibung sitzt als aria-label am SVG
          selbst. Eine sichtbare Bildunterschrift waere hier eine vierte
          Textebene, und die Karte soll fuer sich sprechen. */}
      <Reveal className="st-hero__media" as="figure">
        <div className="st-card st-card--hero st-fade">
          <HeroCollage titel={bildAlt} />
        </div>
      </Reveal>
    </section>
  );
}
