import telefonBild from "@/public/arbeiten/hero-telefon.png";

import Geraet from "./geraet";
import Knopf from "./knopf";
import Reveal from "./reveal";
import Zeigerlicht from "./zeigerlicht";
import { Worte } from "./worte";
import { start } from "@/content/start";

/**
 * Der Hero.
 *
 * WAS HIER ANDERS IST ALS AUF frostbreaker.app: dort traegt den Helden ein
 * reiner Lichtverlauf, weil das Produkt zwei Angebote hat und ein Bild die
 * Seite auf eines davon festlegen wuerde. Hier ist es umgekehrt. Diese Seite
 * verkauft Gestaltung, und ein Gestalter, der im ersten Bildschirm nichts
 * zeigt, argumentiert gegen sich selbst. Deshalb steht rechts ein Telefon
 * mit einer ECHTEN Aufnahme einer gebauten Seite darin, nicht eine
 * Zeichnung und nicht ein Stockfoto.
 *
 * Das Bild kommt als statischer Import und nicht als Zeichenkette: nur so
 * kennt next/image die Masse schon beim Bauen, reserviert den Platz und
 * laesst beim Laden nichts springen. Geraet rechnet aus denselben Massen
 * aus, wie weit die Aufnahme im Rahmen wandern darf.
 *
 * Die Ueberschrift laeuft wortweise ein (Worte), alles darunter gestaffelt
 * (--i). Der Zaehler der Ueberschrift und der der Absaetze sind bewusst
 * getrennt: die Ueberschrift hat ihren eigenen, schnelleren Takt.
 *
 * ══ NEU AM 2026-09-02 ══════════════════════════════════════════════════════
 * DER ANRUF. Neben dem Telefon springt nach der Ueberschrift eine Karte
 * auf: "Incoming call, new customer". Sie zeigt, was die Schlagzeile
 * verspricht, und zwar als Bild und nicht als dritter Satz. Sie ist
 * aria-hidden, weil sie nichts sagt, was das Telefon daneben nicht schon
 * sagt, und sie ist in content/start.ts beschriftet, weil Text nicht in
 * Komponenten gehoert.
 *
 * DAS TELEFON KIPPT DEM ZEIGER ENTGEGEN. Zeigerlicht schreibt --mx und --my
 * auf diesen Abschnitt, und start.css rechnet daraus eine kleine Drehung.
 * Auf dem Telefon gibt es keinen Zeiger, also auch keine Drehung.
 */
export default function StartHero() {
  const { augenbraue, headline, lead, cta, zweitCta, ctaZusatz, anruf } = start.hero;

  return (
    <section className="st-hero">
      <Zeigerlicht className="st-hero__licht" />

      <Reveal as="div" className="st-wrap st-hero__in">
        <div>
          <p className="st-eyebrow st-rise" style={{ ["--i" as string]: 0 }}>
            <span className="st-eyebrow__punkt" aria-hidden="true" />
            {augenbraue}
          </p>

          <h1>
            <Worte
              segmente={[
                { text: headline.vor },
                { text: headline.akzent, klasse: "st-akzent" },
              ]}
            />
            {headline.nach}
          </h1>

          <p className="st-lead st-hero__lead st-rise" style={{ ["--i" as string]: 5 }}>
            {lead}
          </p>

          <div className="st-hero__knoepfe st-rise" style={{ ["--i" as string]: 6 }}>
            <Knopf href={cta.href}>{cta.label}</Knopf>
            <a className="st-link" href={zweitCta.href}>
              {zweitCta.label}
            </a>
          </div>

          <p className="st-hero__zusatz st-rise" style={{ ["--i" as string]: 7 }}>
            {ctaZusatz}
          </p>
        </div>

        <div className="st-hero__geraet st-rise" style={{ ["--i" as string]: 4 }}>
          <Geraet bild={telefonBild} />

          {/* Der Anruf. Zierde, siehe oben. */}
          <div className="st-anruf" aria-hidden="true">
            <span className="st-anruf__ring">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </span>
            <span className="st-anruf__text">
              <span className="st-anruf__titel">{anruf.titel}</span>
              <span className="st-anruf__zeile">{anruf.text}</span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
