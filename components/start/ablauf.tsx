import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DER ABLAUF. Sechs benannte Stufen, ein Satz je Stufe.
 *
 * WARUM SO WENIG TEXT: an dieser Stelle hat der Besucher die Entwuerfe und
 * die echte Arbeit schon gesehen. Er will nur wissen, was auf ihn zukommt
 * und ob er hinterher festhaengt.
 *
 * DIE LINIE, seit dem 2026-09-02 ueber die VOLLE BREITE jeder Stufe: eine
 * Haarlinie liegt still da, und der Akzent laeuft beim Eintreten von links
 * darueber, Stufe fuer Stufe versetzt. Sechs Stufen, die nacheinander
 * "voll" werden, sind ein Fortschritt, den man sieht, statt eines, den man
 * liest. Die Nummer wandert dabei in den Akzentton.
 */
export default function StartAblauf() {
  const { id, augenbraue, titel, schritte } = start.ablauf;

  return (
    <Reveal as="section" id={id} className="st-sect st-ablauf">
      <div className="st-wrap">
        <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
          {augenbraue}
        </p>
        <h2 className="st-ablauf__titel st-rise" style={{ ["--i" as string]: 1 }}>
          {titel}
        </h2>

        <ol className="st-ablauf__liste">
          {schritte.map((s, i) => (
            <li key={s.nr} className="st-ablauf__schritt st-rise" style={{ ["--i" as string]: 2 + i }}>
              <span className="st-ablauf__linie" aria-hidden="true">
                <span className="st-ablauf__fortschritt" />
              </span>
              <span className="st-ablauf__nr">{s.nr}</span>
              <h3 className="st-ablauf__name">{s.titel}</h3>
              <p className="st-ablauf__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
