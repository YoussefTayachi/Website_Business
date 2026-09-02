import Image, { type StaticImageData } from "next/image";

import bildFrostbreaker from "@/public/arbeiten/frostbreaker.png";
import bildCement from "@/public/arbeiten/cement.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * ECHTE ARBEIT. Seit dem 2026-09-02 ZWEI Faelle nebeneinander.
 *
 * ══ WARUM DER VERGLEICH GESTRICHEN IST (2026-09-01) ════════════════════════
 * Youssefs Mentor: "remove 'Before and after' because it doesn't really mean
 * anything, showing your previous is much more meaningful than a before and
 * after." Die "Vorher"-Seite war SELBST GEBAUT, und wer die schlechte
 * Fassung selbst entwirft, um sie danach zu schlagen, hat nichts gezeigt.
 *
 * ══ DIE ZWEI FAELLE ════════════════════════════════════════════════════════
 * 1. frostbreaker.app: eigene Produktseite, eigene Software, verlinkt.
 *    Die Aufnahme kommt direkt von https://www.frostbreaker.app/
 *    (scripts/aufnahmen.mjs), nicht aus dem Repo.
 *
 * 2. Der Prototyp fuer einen Zementhersteller. Am 2026-09-02 hat der
 *    Betrieb zugestimmt, dass der Entwurf gezeigt wird, OHNE NAMEN. Deshalb:
 *      - die Aufnahme ist anonymisiert (Logo, Nummer, Produktname bei der
 *        Aufnahme ausgeblendet, nachgeprueft vom Skript),
 *      - es gibt KEINEN Link: die veroeffentlichte Fassung traegt das Logo,
 *      - kein Zitat, denn es gibt keines.
 *    Wer hier einen Namen oder einen Link ergaenzt, bricht die Zusage.
 *
 * DIE ZUORDNUNG VON SLUG ZU BILD STEHT HIER und nicht im Inhalt, aus
 * demselben Grund wie in der Galerie: ein statischer Import ist Code, und
 * nur er gibt next/image die Masse schon beim Bauen mit.
 */
const BILD: Record<string, StaticImageData> = {
  frostbreaker: bildFrostbreaker,
  cement: bildCement,
};

export default function StartArbeit() {
  const { id, augenbraue, titel, lead, faelle } = start.arbeit;

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

        <ul className="st-arbeit__faelle">
          {faelle.map((f, i) => {
            const bild = (
              <Image
                className="st-arbeit__img"
                src={BILD[f.slug]}
                alt={f.bildAlt}
                sizes="(min-width: 62rem) 38rem, 92vw"
              />
            );
            const href = "href" in f ? f.href : undefined;
            const knopf = "knopf" in f ? f.knopf : undefined;

            return (
              <li key={f.slug} className="st-arbeit__fall st-rise" style={{ ["--i" as string]: 3 + i }}>
                {href ? (
                  <a
                    className="st-arbeit__bild"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${knopf ?? f.name}, opens in a new tab`}
                  >
                    {bild}
                  </a>
                ) : (
                  <div className="st-arbeit__bild">{bild}</div>
                )}

                <div className="st-arbeit__text">
                  <p className="st-arbeit__art">{f.art}</p>
                  <p className="st-arbeit__name">{f.name}</p>
                  <p className="st-arbeit__satz">{f.text}</p>
                  {href && knopf ? (
                    <a className="st-link" href={href} target="_blank" rel="noreferrer">
                      {knopf}
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
