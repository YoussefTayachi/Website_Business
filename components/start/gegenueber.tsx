import Image from "next/image";

import vorherBild from "@/public/arbeiten/vergleich-vorher.png";
import nachherBild from "@/public/arbeiten/vergleich-nachher.png";

import Reveal from "./reveal";
import Vergleich from "./vergleich";
import { start } from "@/content/start";

/**
 * DER VERGLEICH. Dieselbe Firma, dieselben Leistungen, eine neu gebaute
 * Seite. Zwei Aufnahmen und ein Regler dazwischen.
 *
 * WARUM ER NACH DER GALERIE STEHT: die Galerie beantwortet "was ist
 * moeglich", der Vergleich beantwortet "warum sollte ich". Die zweite Frage
 * stellt sich erst, wenn die erste beantwortet ist.
 *
 * DIE FASSUNG OHNE JAVASCRIPT steht hier und nicht in vergleich.tsx: sie ist
 * kein Teil des Reglers, sie ist sein Ersatz. Der Schalter dafuer ist das
 * <noscript>-Stylesheet in app/layout.tsx (.nur-mit-js{display:none}), also
 * eine Regel, die der Browser nur anwendet, wenn JavaScript wirklich aus
 * ist. Ein Knopf, der auf nichts reagiert, ist schlimmer als kein Knopf.
 */
export default function StartGegenueber() {
  const v = start.vergleich;

  return (
    <Reveal as="section" className="st-sect st-gegen">
      <div className="st-wrap st-gegen__in">
        <div className="st-gegen__kopf">
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            {v.augenbraue}
          </p>
          <h2 className="st-rise" style={{ ["--i" as string]: 1 }}>
            {v.titel}
          </h2>
          <p className="st-lead st-rise" style={{ ["--i" as string]: 2 }}>
            {v.lead}
          </p>
        </div>

        <div className="st-rise" style={{ ["--i" as string]: 3 }}>
          <Vergleich
            vorher={vorherBild}
            nachher={nachherBild}
            altVorher={v.bildAltVorher}
            altNachher={v.bildAltNachher}
            adresse={v.adresse}
          />

          <noscript>
            <div className="st-vgl-ohne">
              <figure>
                <Image src={vorherBild} alt={v.bildAltVorher} sizes="(min-width: 48rem) 50vw, 100vw" />
                <figcaption>{v.regler.vorher}</figcaption>
              </figure>
              <figure>
                <Image src={nachherBild} alt={v.bildAltNachher} sizes="(min-width: 48rem) 50vw, 100vw" />
                <figcaption>{v.regler.nachher}</figcaption>
              </figure>
            </div>
          </noscript>
        </div>
      </div>
    </Reveal>
  );
}
