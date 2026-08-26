import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";
import { FallAngebot, FallTelefon, FallTempo } from "./zeichnungen";

/**
 * ARBEITEN. Drei Faelle in einem versetzten Zweispaltenraster.
 *
 * DAS FIKTIV-KENNZEICHEN STEHT AUF JEDER KARTE, sichtbar, als Kapsel auf dem
 * Bild und nicht als Fussnote darunter. Der Grund steht in content/start.ts:
 * wer nur das Bild sieht, muss lesen koennen, dass der Betrieb erfunden ist.
 * Eine gemeinsame Zeile ueber der Gruppe waere genau dann aus dem Bild.
 *
 * ES WIRD NICHT AUF /arbeit/[slug] VERLINKT. Diese Seiten sind noch deutsch
 * und tragen robots: index=false. Ein Link von einer englischen Seite auf
 * eine deutsche noindex-Seite waere ein Bruch in zwei Richtungen. Die Karten
 * sind deshalb <article>, kein <a>.
 *
 * DIE ZEICHNUNG WIRD UEBER DEN INDEX ZUGEORDNET, nicht ueber den Namen. Der
 * Text ist englisch und darf umformuliert werden; die Reihenfolge der drei
 * Faelle ist dagegen die Dramaturgie (Anruf, Angebot, Tempo) und aendert sich
 * nicht, ohne dass jemand hier nachsieht.
 *
 * WARUM EINE SWITCH-ANWEISUNG UND KEINE KOMPONENTENLISTE: seit die Karten
 * fertige Seiten zeigen, bekommt jede Zeichnung ihren eigenen Mock-Text aus
 * content/start.ts, und die drei Mocks haben verschiedene Felder (Fall B hat
 * Projektbilder, Fall C eine feste Leiste). Eine Liste [A, B, C] waere fuer
 * TypeScript eine Vereinigung von drei Komponenten, und keine davon liesse
 * sich mehr mit ihren eigenen Prop-Typen aufrufen. Der switch bindet Index
 * und Mock an genau einer Stelle zusammen, sichtbar und geprueft.
 */
function szene(i: number, titel: string) {
  const { faelle } = start.arbeiten;

  switch (i) {
    case 1:
      return <FallAngebot titel={titel} mock={faelle[1].mock} />;
    case 2:
      return <FallTempo titel={titel} mock={faelle[2].mock} />;
    default:
      return <FallTelefon titel={titel} mock={faelle[0].mock} />;
  }
}

const GRUENDE = ["st-card--a", "st-card--b", "st-card--c"] as const;
/** Nur der mittlere Fall ist quadratisch. Drei gleich hohe Karten waeren
 *  drei gleich laute, und das Raster verloere seinen Rhythmus. */
const FORMATE = ["", "st-card--square", ""] as const;

export default function StartArbeiten() {
  const { titel, kennzeichen, faelle } = start.arbeiten;

  return (
    // id ist das Ziel des Plus-Knopfs in der Leiste. Wer es aendert, muss
    // start.leiste.menu.href in content/start.ts mitziehen.
    <section className="st-works-sec st-wrap" id="work">
      <Reveal>
        <h2 className="st-h2 st-rise">
          {titel.map((zeile, i) => (
            <span
              key={zeile}
              className="st-rise__line"
              style={{ "--st-i": i } as CSSProperties}
            >
              <span>{zeile}</span>
            </span>
          ))}
        </h2>
      </Reveal>

      <div className="st-works">
        <div className="st-works__grid">
          {faelle.map((fall, i) => {
            return (
              <Reveal key={fall.name} as="article" className="st-work">
                <div className="st-work__frame st-fade">
                  <div className={`st-card st-card--work ${GRUENDE[i] ?? ""} ${FORMATE[i] ?? ""}`}>
                    {szene(i, fall.bildAlt)}
                    {/* Innerhalb der Karte, nicht daneben: beim Anheben auf
                        Hover soll das Kennzeichen mitgehen. Danebenstehend
                        blieb es liegen, waehrend die Karte sich hob. */}
                    <p className="st-work__flag">{kennzeichen}</p>
                  </div>
                </div>

                <h3 className="st-work__name">{fall.name}</h3>
                <p className="st-work__line">{fall.zeile}</p>

                <ul className="st-tags">
                  {fall.tags.map((tag) => (
                    <li key={tag} className="st-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
