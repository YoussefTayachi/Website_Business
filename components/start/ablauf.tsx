import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DER ABLAUF. Drei Schritte an einer Haarlinie, ein Satz je Schritt.
 *
 * WARUM SO WENIG TEXT: an dieser Stelle hat der Besucher die Entwuerfe und
 * den Vergleich schon gesehen. Er will nicht wissen, wie sorgfaeltig
 * gearbeitet wird, sondern nur, was auf ihn zukommt und ob er hinterher
 * festhaengt. Drei Saetze beantworten das.
 *
 * Die Haarlinie zeichnet sich beim Eintreten (start.css, .st-ablauf__linie).
 * Das ist der einzige Ort auf der Seite, an dem eine Linie waechst, und sie
 * hat dafuer einen Grund: sie ist die Zeit, und drei Schritte sind eine
 * Reihenfolge. Wo Bewegung nur huebsch waere, steht keine.
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
              <span className="st-ablauf__linie" aria-hidden="true" />
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
