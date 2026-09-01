import Kalender from "./kalender";
import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * DER SCHLUSSBLOCK, seit dem 2026-09-01 MIT KALENDER.
 *
 * WARUM ER UMGEKEHRTE FLAECHE HAT (Tinte statt Papier): es ist der einzige
 * Farbwechsel dieser Groesse auf der ganzen Seite, und er markiert das Ende.
 * Der Besucher hat bis hierher gescrollt, also ist die Frage jetzt faellig.
 *
 * ZWEISPALTIG: links die Frage, rechts der Kalender. Vorher stand hier ein
 * Knopf, der auf calendly.com fuehrte. Der Mentor hat das als Reibung
 * benannt, und er hat recht: wer die Seite verlaesst, um zu buchen, hat einen
 * Schritt mehr und eine fremde Umgebung vor sich. Die Begruendung fuer den
 * einen Klick, der trotzdem davorsteht, hat ihren Platz in kalender.tsx.
 *
 * Der zweite Satz nimmt dem Klick sein Risiko ("worst case you leave with a
 * list"), und er ist einloesbar: ein Gespraech ueber eine Website kostet
 * nichts und der Betrieb bekommt in jedem Fall etwas mit. Ein Versprechen,
 * das nicht eingehalten werden kann, stuende hier nicht.
 *
 * DIE DREI FAKTEN daneben sind das, was jemand vor einem Klick auf einen
 * Kalender wissen will: wie lange, in welcher Form, was es kostet. Alle drei
 * sind wahr und keiner ist eine Zahl, die sich nicht halten laesst.
 */
export default function StartSchluss() {
  const { id, augenbraue, titel, lead, fakten } = start.schluss;

  return (
    <Reveal as="section" id={id} className="st-schluss">
      <div className="st-wrap st-schluss__in">
        <div className="st-schluss__wort">
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            {augenbraue}
          </p>
          <h2 className="st-rise" style={{ ["--i" as string]: 1 }}>
            {titel}
          </h2>
          <p className="st-schluss__lead st-rise" style={{ ["--i" as string]: 2 }}>
            {lead}
          </p>

          <ul className="st-schluss__fakten st-rise" style={{ ["--i" as string]: 3 }}>
            {fakten.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="st-rise" style={{ ["--i" as string]: 4 }}>
          <Kalender />
        </div>
      </div>
    </Reveal>
  );
}
