import Image from "next/image";

import fallBild from "@/public/arbeiten/frostbreaker.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * ECHTE ARBEIT. Steht an der Stelle, an der bis zum 2026-09-01 der
 * Vorher/Nachher-Regler stand.
 *
 * ══ WARUM DER VERGLEICH GESTRICHEN IST ═════════════════════════════════════
 * Youssefs Mentor: "remove 'Before and after' because it doesn't really mean
 * anything, showing your previous is much more meaningful than a before and
 * after."
 *
 * Der Einwand trifft eine Schwaeche, die vorher niemand benannt hat: die
 * "Vorher"-Seite war SELBST GEBAUT. Wer die schlechte Fassung selbst
 * entwirft, um sie danach zu schlagen, hat nichts gezeigt ausser dass er
 * beides kann. Ein Betrieb, der schon einmal mit einer Agentur zu tun hatte,
 * riecht das, und dann kostet die Flaeche Vertrauen statt es zu bringen.
 *
 * WAS STATTDESSEN HIER STEHT, ist das Einzige, was jemand nachpruefen kann:
 * Frostbreaker. Eigene Produktseite, eigene Software, beide oeffentlich
 * erreichbar, beide von Youssef gebaut. Es gibt keinen zugestimmten
 * Kundenfall (CTS Cement hat nicht zugestimmt, siehe
 * Website_Business/README.md), also wird auch keiner behauptet.
 *
 * DAS BILD IST EINE AUFNAHME DER ECHTEN, LAUFENDEN SEITE, aufgenommen von
 * scripts/aufnahmen.mjs direkt von https://www.frostbreaker.app/. Kein
 * Nachbau, keine Zeichnung. Wenn die Seite sich aendert, faellt es beim
 * naechsten Aufnahmelauf auf.
 */
export default function StartArbeit() {
  const { id, augenbraue, titel, lead, fall } = start.arbeit;

  return (
    <Reveal as="section" id={id} className="st-sect st-arbeit">
      <div className="st-wrap">
        <div className="st-arbeit__kopf">
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

        <div className="st-arbeit__fall st-rise" style={{ ["--i" as string]: 3 }}>
          <a
            className="st-arbeit__bild"
            href={fall.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${fall.knopf}, opens in a new tab`}
          >
            <Image
              src={fallBild}
              alt={fall.bildAlt}
              sizes="(min-width: 62rem) 40rem, 92vw"
            />
          </a>

          <div className="st-arbeit__text">
            <p className="st-arbeit__name">{fall.name}</p>
            <p className="st-arbeit__art">{fall.art}</p>

            <ul className="st-arbeit__punkte">
              {fall.punkte.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <a className="st-link" href={fall.href} target="_blank" rel="noreferrer">
              {fall.knopf}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
