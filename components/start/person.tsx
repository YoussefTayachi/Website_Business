import Image from "next/image";

import portraet from "@/public/youssef-tayachi.png";

import Reveal from "./reveal";
import { start } from "@/content/start";

/**
 * WER DAHINTERSTECKT. Portraet und zwei Saetze.
 *
 * WARUM DIESER ABSCHNITT ZWISCHEN ABLAUF UND SCHLUSS STEHT: an dieser Stelle
 * ist inhaltlich alles gesagt, und die letzte offene Frage ist "wer ist das
 * eigentlich". Sie muss beantwortet sein, BEVOR der Knopf kommt. Weiter oben
 * haette das Bild die Entwuerfe verdraengt, weiter unten kaeme es zu spaet.
 *
 * DAS FOTO IST ECHT und dasselbe wie auf frostbreaker.app. Kein Stockfoto,
 * kein Team, das es nicht gibt.
 *
 * `priority` bewusst NICHT: das Bild steht weit unterhalb der Falz. Es hat
 * feste Masse aus dem statischen Import, reserviert also seinen Platz, ohne
 * die erste Ansicht zu belasten.
 */
export default function StartPerson() {
  const p = start.person;

  return (
    <Reveal as="section" className="st-sect st-person">
      <div className="st-wrap st-person__in">
        {/* Kein st-rise: das Portraet kommt nicht von unten, es wird von
            oben nach unten AUFGEDECKT (start.css, clip-path). Ein Foto, das
            wie ein Absatz einschwebt, ist ein Absatz; eines, das sich
            aufdeckt, ist ein Foto. */}
        <div className="st-person__bild">
          <Image src={portraet} alt={p.bildAlt} sizes="(min-width: 62rem) 22rem, 60vw" />
        </div>

        <div>
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 1 }}>
            {p.augenbraue}
          </p>
          <h2 className="st-person__titel st-rise" style={{ ["--i" as string]: 2 }}>
            {p.titel}
          </h2>
          {p.absaetze.map((t, i) => (
            <p key={i} className="st-person__text st-rise" style={{ ["--i" as string]: 3 + i }}>
              {t}
            </p>
          ))}
          <p className="st-person__name st-rise" style={{ ["--i" as string]: 5 }}>
            {p.name}
            <span className="st-person__rolle">{p.rolle}</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
