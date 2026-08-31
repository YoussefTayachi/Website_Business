import Modus from "./modus";
import { start } from "@/content/start";

/**
 * Die Kopfleiste. Server Component bis auf die Modus-Gruppe, die als eigene
 * Client-Insel darin sitzt.
 *
 * WAS BEI 390px DRIN IST UND WAS NICHT, ist in start.css nachgerechnet und
 * dort begruendet: Wortmarke und Modus-Gruppe bleiben, die zwei Ankerlinks
 * und der Pill-CTA kommen erst ab 768px dazu. Der CTA steht im Hero
 * unmittelbar darunter noch einmal, die Modus-Gruppe haette keinen zweiten
 * Ort, und sie darf auch keinen haben: zwei Radiogruppen mit demselben name
 * waeren eine einzige und wuerden sich gegenseitig umschalten.
 *
 * Die Wortmarke traegt den Akzentton, weil sie auf frostbreaker.app auch
 * ihn traegt. Sie ist damit das erste, was die beiden Seiten als eine Marke
 * lesbar macht. Der Ton ist --c-accent (sky-700 hell, sky-400 dunkel) und
 * nicht sky-500: eine Wortmarke ist formal von den Kontrastregeln
 * ausgenommen, war auf frostbreaker.app in sky-500 aber sichtbar das
 * blasseste Element der ganzen Leiste, blasser als jeder Link daneben.
 */
export default function StartLeiste() {
  const { marke, markeZusatz, markeHref, anker, cta } = start.leiste;

  return (
    <header className="st-bar">
      <div className="st-wrap st-bar__in">
        <a className="st-marke" href={markeHref}>
          {marke}
          <span className="st-marke__zusatz">{markeZusatz}</span>
        </a>

        <nav className="st-bar__nav" aria-label="Sections">
          {anker.map((a) => (
            <a key={a.href} className="st-bar__link" href={a.href}>
              {a.label}
            </a>
          ))}
        </nav>

        <div className="st-bar__rechts">
          <Modus />
          <a className="st-pill st-bar__cta" href={cta.href}>
            {cta.label}
            <span className="st-pill__pfeil" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
