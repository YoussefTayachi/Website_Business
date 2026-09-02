import Link from "next/link";

import Knopf from "./knopf";
import Marke from "./marke";
import Modus from "./modus";
import { start } from "@/content/start";

/**
 * Die Kopfleiste. Server Component bis auf den Modus-Schalter, der als eigene
 * Client-Insel darin sitzt.
 *
 * SIE TRAEGT ZWEI ROUTEN: die Startseite und die Entwurfsseiten unter
 * /work/[slug]. Auf den Entwurfsseiten stehen statt der zwei Ankerlinks ein
 * Zurueckweg, denn ein Anker auf "#designs" fuehrt dort ins Leere. Deshalb
 * sind die Ziele in content/start.ts absolut ("/#designs") und nicht relativ.
 *
 * ══ GLEICHE SCHRIFTGROESSE FUER WORTMARKE UND LINKS (2026-09-01) ═══════════
 * Der Mentor: "have the logo and quicklink the same font size; there's no
 * reason for the quicklink to be bigger than the actual logo."
 *
 * Vorher stand die Wortmarke auf clamp(18px, 1.4vw, 22px) und die Links auf
 * festen 18px. In einem breiten Fenster war die Marke also groesser, in einem
 * schmalen kleiner als die Links daneben, und beides sah nach Zufall aus.
 * Jetzt tragen beide `--st-fs-nav`, und die Marke hebt sich durch GEWICHT und
 * FARBE ab statt durch Groesse. Das ist auch der uebliche Weg: eine Wortmarke,
 * die ihre Nachbarn ueberragen muss, um Marke zu sein, ist keine.
 *
 * Die Wortmarke traegt den Akzentton, weil sie auf frostbreaker.app auch ihn
 * traegt. Sie ist damit das erste, was die beiden Seiten als eine Marke
 * lesbar macht.
 *
 * SEIT DEM 2026-09-02 SCHRUMPFT DIE LEISTE BEIM SCROLLEN, ohne JavaScript:
 * eine scroll-getriebene Animation in start.css (animation-timeline:
 * scroll()) nimmt ihr in den ersten 120 Pixeln ein Stueck Hoehe und gibt
 * ihr eine Kante. Browser ohne diese Technik sehen die feste Leiste, und
 * das ist ein vollstaendiger Zustand, kein kaputter.
 */
export default function StartLeiste({ variante = "start" }: { variante?: "start" | "werk" }) {
  const { anker, cta, zurueck } = start.leiste;

  return (
    // data-variante ist der Haken fuer die zwei Regeln, die nur auf den
    // Entwurfsseiten gelten (start.css): dort steht neben der Wortmarke ein
    // Zurueckweg, und beides zusammen passt auf 390px nicht.
    <header className="st-bar" data-variante={variante}>
      <div className="st-wrap st-bar__in">
        <Marke />

        <nav className="st-bar__nav" aria-label="Sections">
          {variante === "werk" ? (
            <Link className="st-bar__link st-bar__zurueck" href="/#designs">
              <span aria-hidden="true">←</span>
              {/* Auf dem Telefon bleibt nur der Pfeil stehen, das Wort wird
                  versteckt statt entfernt: ein Link ohne Text ist fuer einen
                  Vorleser ein Link ohne Ziel. Nachgerechnet in start.css. */}
              <span className="st-bar__wort">{zurueck}</span>
            </Link>
          ) : (
            anker.map((a) => (
              <a key={a.href} className="st-bar__link" href={a.href}>
                {a.label}
              </a>
            ))
          )}
        </nav>

        <div className="st-bar__rechts">
          <Modus />
          <Knopf className="st-bar__cta" href={cta.href}>
            {cta.label}
          </Knopf>
        </div>
      </div>
    </header>
  );
}
