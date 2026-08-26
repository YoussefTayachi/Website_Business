import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";

/**
 * UEBER. Eine Ueberschrift, zwei Absaetze, kein Foto.
 *
 * Kein Portraet und kein Team-Raster: die Seite verkauft, dass hier eine
 * Person arbeitet, und zwei Saetze sagen das kuerzer als ein Bild. Der
 * Abschnitt ist bewusst der kleinste der Seite, er steht zwischen den
 * Arbeiten und dem Fuss und soll den Weg dorthin nicht aufhalten.
 */
export default function StartUeber() {
  const { titel, absaetze } = start.ueber;

  return (
    <section className="st-ueber st-wrap">
      <Reveal>
        <h2 className="st-h2 st-rise">
          <span className="st-rise__line">
            <span>{titel}</span>
          </span>
        </h2>
      </Reveal>

      <Reveal className="st-ueber__body">
        {absaetze.map((absatz, i) => (
          <p
            key={absatz}
            className="st-lead st-fade"
            style={{ "--st-i": i } as CSSProperties}
          >
            {absatz}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
