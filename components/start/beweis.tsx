import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * Der Beweisstreifen. Der einzige Ort auf dieser Seite, an dem etwas steht,
 * das jemand nachpruefen kann.
 *
 * WARUM ER GLEICH UNTER DEM HERO STEHT und nicht weiter unten: wer aus einer
 * Kaltakquise-Mail kommt, hat genau eine Frage, und die lautet "wer schreibt
 * mir da eigentlich". Sie muss beantwortet sein, bevor irgendetwas verkauft
 * wird.
 *
 * ES GIBT KEINEN ZUGESTIMMTEN KUNDENFALL. Der einzige echte Beleg ist
 * Frostbreaker selbst, und genau der steht hier: die Produktseite und die
 * Software. Beides sind echte Adressen, beide oeffnen sich. Was hier NICHT
 * steht, steht bewusst nicht da: keine erfundenen Kundenlogos, keine
 * Testimonials, keine Zahl ueber zufriedene Betriebe. Die Zielgruppe prueft
 * so etwas nach, und ein einziger Fund kostet den Auftrag.
 *
 * rel="noreferrer" ist hier Absicht und nicht Gewohnheit: die Adressen
 * gehoeren demselben Betreiber, aber der Verweis soll trotzdem nichts ueber
 * die Herkunft verraten, solange die Seite noch nicht oeffentlich ist.
 */
export default function StartBeweis() {
  const { satz, links } = start.beweis;

  return (
    <Reveal as="section" className="st-beweis">
      <div className="st-wrap st-beweis__in">
        <p className="st-beweis__satz st-rise" style={{ ["--i" as string]: 0 }}>
          {satz}
        </p>

        <ul className="st-beweis__links st-rise" style={{ ["--i" as string]: 1 }}>
          {links.map((l) => (
            <li key={l.href}>
              <a className="st-chip" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <span className="st-chip__zusatz">{l.zusatz}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
