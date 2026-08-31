import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DER SCHLUSSBLOCK. Eine Zeile, ein Satz, ein Knopf.
 *
 * WARUM ER UMGEKEHRTE FLAECHE HAT (Tinte statt Papier): es ist der einzige
 * Farbwechsel dieser Groesse auf der ganzen Seite, und er markiert das Ende.
 * Der Besucher hat bis hierher gescrollt, also ist die Frage jetzt faellig.
 *
 * Der zweite Satz nimmt dem Klick sein Risiko ("worst case you leave with a
 * list"), und er ist einlösbar: ein Gespraech ueber eine Website kostet
 * nichts und der Betrieb bekommt in jedem Fall etwas mit. Ein Versprechen,
 * das nicht eingehalten werden kann, stuende hier nicht.
 */
export default function StartSchluss() {
  const { titel, lead, cta } = start.schluss;

  return (
    <Reveal as="section" className="st-schluss">
      <div className="st-wrap st-schluss__in">
        <h2 className="st-rise" style={{ ["--i" as string]: 0 }}>
          {titel}
        </h2>
        <p className="st-schluss__lead st-rise" style={{ ["--i" as string]: 1 }}>
          {lead}
        </p>
        <div className="st-rise" style={{ ["--i" as string]: 2 }}>
          <a className="st-pill st-pill--um" href={cta.href}>
            {cta.label}
            <span className="st-pill__pfeil" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}
