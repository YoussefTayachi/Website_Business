import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";

/**
 * STATEMENT. Zwei Zeilen, sonst nichts.
 *
 * Der Abschnitt ist der leerste der Seite, und das ist Absicht: er trennt den
 * Einstieg von der Leistungsliste und gibt dem Blick eine Pause, bevor die
 * Aufzaehlung beginnt. Weissraum ist hier das Trennmittel, keine Linie und
 * kein Rahmen.
 *
 * Die Zeilen tragen ein <p> und keine Ueberschrift: es ist ein Satz, kein
 * Abschnittstitel. Eine h2 hier haenge in der Gliederung ohne Inhalt darunter.
 */
export default function StartStatement() {
  const { zeilen } = start.statement;

  return (
    <section className="st-statement st-wrap">
      <Reveal>
        <p className="st-h2 st-rise">
          {zeilen.map((zeile, i) => (
            <span
              key={zeile}
              className="st-rise__line"
              style={{ "--st-i": i } as CSSProperties}
            >
              <span>{zeile}</span>
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
