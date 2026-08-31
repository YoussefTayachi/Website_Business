import Image from "next/image";

import vorherBild from "@/public/arbeiten/elektro-alt-1440.png";
import nachherBild from "@/public/arbeiten/elektro-neu-1440.png";

import Reveal from "./reveal";
import Vergleich from "./vergleich";
import { start } from "@/content/start";

/**
 * Die Arbeiten. Im Ausschnitt genau ein Fall, die anderen zwei kommen nach
 * der Abnahme dazu.
 *
 * DAS KENNZEICHEN STEHT ALS TEXT AUF DER KARTE und nicht im Bild. Ein
 * Hinweis, der nur im Screenshot steht, existiert fuer einen Screenreader
 * nicht, und er verschwindet ausserdem, sobald jemand das Bild nicht laedt.
 * Es steht an JEDER Karte und nicht einmal ueber der Gruppe: wer schnell
 * scrollt oder abschnittsweise vorgelesen bekommt, sieht sonst genau die
 * Karte ohne den Hinweis.
 *
 * DIE FASSUNG OHNE JAVASCRIPT steht hier und nicht in vergleich.tsx: sie ist
 * kein Teil des Reglers, sie ist sein Ersatz. Beide Aufnahmen stehen dann
 * als beschriftete Figuren nebeneinander. Der Schalter dafuer ist das
 * <noscript>-Stylesheet in app/layout.tsx (.nur-mit-js{display:none}), also
 * eine Regel, die der Browser nur anwendet, wenn JavaScript wirklich aus
 * ist. Ein Knopf, der auf nichts reagiert, ist schlimmer als kein Knopf.
 */
export default function StartArbeiten() {
  const { id, augenbraue, titel, kennzeichen, regler, faelle } = start.arbeiten;
  const fall = faelle[0];

  return (
    <Reveal as="section" id={id} className="st-sect">
      <div className="st-wrap">
        <div className="st-arb__kopf">
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            {augenbraue}
          </p>
          <h2 className="st-rise" style={{ ["--i" as string]: 1 }}>
            {titel}
          </h2>
        </div>

        <article className="st-fall st-rise" style={{ ["--i" as string]: 2 }}>
          <div className="st-fall__meta">
            <h3 className="st-fall__name">{fall.name}</h3>
            <span className="st-fall__gewerk">{fall.gewerk}</span>
          </div>

          <p className="st-fall__zeile">{fall.zeile}</p>

          <Vergleich
            vorher={vorherBild}
            nachher={nachherBild}
            altVorher={fall.bildAltVorher}
            altNachher={fall.bildAltNachher}
            adresse={fall.adresse}
          />

          <noscript>
            <div className="st-vgl-ohne">
              <figure>
                <Image src={vorherBild} alt={fall.bildAltVorher} sizes="(min-width: 48rem) 50vw, 100vw" />
                <figcaption>{regler.vorher}</figcaption>
              </figure>
              <figure>
                <Image src={nachherBild} alt={fall.bildAltNachher} sizes="(min-width: 48rem) 50vw, 100vw" />
                <figcaption>{regler.nachher}</figcaption>
              </figure>
            </div>
          </noscript>

          <ul className="st-tags">
            {fall.tags.map((t) => (
              <li key={t} className="st-tag">
                {t}
              </li>
            ))}
          </ul>

          <p className="st-fiktiv">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M12 2 1 21h22L12 2zm0 6 6.5 11h-13L12 8zm-1 3v4h2v-4h-2zm0 5v2h2v-2h-2z" />
            </svg>
            {kennzeichen}
          </p>
        </article>
      </div>
    </Reveal>
  );
}
