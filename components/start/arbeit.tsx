import Image, { type StaticImageData } from "next/image";

import bildFrostbreaker from "@/public/arbeiten/frostbreaker.png";
import bildFrostbreakerTelefon from "@/public/arbeiten/frostbreaker-telefon.png";
import bildCement from "@/public/arbeiten/cement.png";
import bildCementTelefon from "@/public/arbeiten/cement-telefon.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * ECHTE ARBEIT. Zwei Faelle, jeder als SCHREIBTISCH PLUS TELEFON.
 *
 * ══ WARUM DER VERGLEICH GESTRICHEN IST (2026-09-01) ════════════════════════
 * Youssefs Mentor: "remove 'Before and after' because it doesn't really mean
 * anything, showing your previous is much more meaningful than a before and
 * after." Die "Vorher"-Seite war SELBST GEBAUT, und wer die schlechte
 * Fassung selbst entwirft, um sie danach zu schlagen, hat nichts gezeigt.
 *
 * ══ SEIT DEM 2026-09-02: MEHR ZEIGEN, OHNE MEHR ZU SAGEN ═══════════════════
 * Jeder Fall hat zwei Aufnahmen: eine breite, die LAENGER ist als ihr
 * Rahmen und beim Ueberfahren langsam nach unten wandert (man sieht also
 * die Seite, nicht nur ihren ersten Bildschirm), und eine Telefonaufnahme
 * in einem Geraeterahmen davor, die dasselbe tut. Beide Wege werden aus den
 * Bildmassen GERECHNET, wie im Hero (geraet.tsx): ein fester Prozentwert
 * waere bei der naechsten Aufnahme falsch.
 *
 * ══ DIE ZWEI FAELLE ════════════════════════════════════════════════════════
 * 1. frostbreaker.app: eigene Produktseite, eigene Software, verlinkt.
 *    Beide Aufnahmen kommen direkt von https://www.frostbreaker.app/
 *    (scripts/aufnahmen.mjs), nicht aus dem Repo.
 *
 * 2. Der Prototyp fuer einen Zementhersteller. Am 2026-09-02 hat der
 *    Betrieb zugestimmt, dass der Entwurf gezeigt wird, OHNE NAMEN. Deshalb:
 *      - beide Aufnahmen sind anonymisiert (Logo, Nummer, Produktname,
 *        Firmensitz und eine als Fingerabdruck taugliche Kennzahl werden
 *        bei der Aufnahme ausgeblendet, nachgeprueft vom Skript),
 *      - es gibt KEINEN Link: die veroeffentlichte Fassung traegt das Logo,
 *      - kein Zitat, denn es gibt keines.
 *    Wer hier einen Namen oder einen Link ergaenzt, bricht die Zusage.
 */
const BILD: Record<string, { breit: StaticImageData; telefon: StaticImageData }> = {
  frostbreaker: { breit: bildFrostbreaker, telefon: bildFrostbreakerTelefon },
  cement: { breit: bildCement, telefon: bildCementTelefon },
};

/** Anteil, um den ein Bild ueber seinen Ausschnitt hinausragt, als
 *  negativer Prozentwert fuer translateY. Null, wenn es kuerzer ist. */
function lauf(bild: StaticImageData, ausschnitt: number) {
  const verhaeltnis = bild.height / bild.width;
  const weg = Math.max(0, 1 - ausschnitt / verhaeltnis);
  return `${(-weg * 100).toFixed(2)}%`;
}

export default function StartArbeit() {
  const { id, augenbraue, titel, faelle } = start.arbeit;

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
        </div>

        <ul className="st-arbeit__faelle">
          {faelle.map((f, i) => {
            const b = BILD[f.slug];
            const href = "href" in f ? f.href : undefined;
            const knopf = "knopf" in f ? f.knopf : undefined;

            const buehne = (
              <span
                className="st-arbeit__buehne"
                style={{
                  ["--st-lauf-breit" as string]: lauf(b.breit, 760 / 1200),
                  ["--st-lauf-telefon" as string]: lauf(b.telefon, 19 / 9),
                }}
              >
                <span className="st-arbeit__breit">
                  <Image
                    className="st-arbeit__img"
                    src={b.breit}
                    alt={f.bildAlt}
                    sizes="(min-width: 62rem) 38rem, 92vw"
                  />
                </span>
                {/* Das Telefon ist dieselbe Seite noch einmal, also Zierde
                    fuer den Vorleser: das Alt-Attribut oben beschreibt den
                    Fall schon. */}
                <span className="st-arbeit__telefon" aria-hidden="true">
                  <span className="st-arbeit__screen">
                    <Image className="st-arbeit__tel-img" src={b.telefon} alt="" sizes="9rem" />
                  </span>
                </span>
              </span>
            );

            return (
              <li key={f.slug} className="st-arbeit__fall st-rise" style={{ ["--i" as string]: 2 + i }}>
                {href ? (
                  <a
                    className="st-arbeit__weg"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${knopf ?? f.name}, opens in a new tab`}
                  >
                    {buehne}
                  </a>
                ) : (
                  <div className="st-arbeit__weg">{buehne}</div>
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
