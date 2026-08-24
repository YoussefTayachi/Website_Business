"use client";

import type { CSSProperties } from "react";
import { seite } from "@/content/seite";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/reveal";

/**
 * Sektion 6: Ueber Youssef.
 * Aufgabe (Plan 5): warum ausgerechnet er. Ehrlich, ohne Agentur-Plural.
 *
 * WARUM JETZT EINE CLIENT COMPONENT. Bis hierher stand hier, die Sektion habe
 * keine Bewegung, weil das Motion-Budget aufgebraucht sei. Diese Begruendung
 * ist zurueckgenommen (ausfuehrlich im Kopf von prozess.tsx): die Sektionen
 * nach dem Showcase sind die Tafeln des Pruefberichts und bekommen je eine
 * gezeichnete Figur, die sich beim Ins-Blickfeld-Kommen einmal zeichnet.
 * "use client" ist der Preis fuer den IntersectionObserver aus lib/reveal.ts.
 *
 * DIE SEKTION MIT DER WENIGSTEN GESTALTUNG, UND DAS BLEIBT SO. Es gibt kein
 * Portraitfoto (Plan 8: die Seite arbeitet ohne fremde Bilder), also auch
 * keinen Ersatz dafuer: kein Initialenkreis, kein Signaturbild, keine
 * Zierflaeche. Was hier zaehlt, ist eine ruhige Lesespalte in max-w-text.
 *
 * WARUM KEINE WEGFIGUR AUS DREI STATIONEN (Werkzeug, Mail, diese Seite).
 * Die Idee war naheliegend, weil der Text Frostbreaker als das selbstgebaute
 * Programm nennt, aus dem die Kaltakquise-Mail kam: eine Figur, die zeigt,
 * warum der Besucher gerade hier steht. Sie scheitert an zwei Dingen, und
 * beide sind hart. Erstens braucht sie drei Beschriftungen, damit die drei
 * Stationen etwas BEDEUTEN; jeder sichtbare String dieser Seite gehoert nach
 * content/seite.ts, und dort steht keine. Zweitens waeren drei unbeschriftete
 * Sinnbilder (Zange, Umschlag, Blatt) genau der Icon-Satz, den diese Seite
 * nirgends benutzt: sie zeigten nichts, sie schmueckten.
 *
 * WAS STATTDESSEN STEHT. Die Lesespalte bekommt links eine Haarlinie, die
 * sich beim Eintritt nach unten zeichnet, mit einem Teilstrich an jedem der
 * drei Absaetze und einem Fuss, der sie unter dem letzten schliesst. Das ist
 * dasselbe Instrument wie die Skala im Prozess, nur in den Rand gedreht:
 * drei Eintraege, dann ist der Eintrag zu Ende. Es zeigt etwas (dass es genau
 * drei Aussagen sind, und dass sie abgeschlossen sind), ohne ein Wort zu
 * erfinden.
 *
 * KEIN AKZENT IN DIESER SEKTION. Der Akzent bedeutet auf dieser Seite ueberall
 * "hier zeigt jemand mit dem Finger drauf" (globals.css Abschnitt 2). Hier
 * zeigt niemand auf etwas, hier steht jemand fuer etwas gerade. Die ruhigste
 * Sektion ist deshalb die einzige ohne Siegellack, und genau das macht ihn
 * eine Bildschirmhoehe weiter unten im Kontakt wieder laut.
 *
 * Der erste Absatz steht eine Stufe groesser und in voller Tinte. Er traegt
 * die Antwort auf die Ueberschrift; die beiden anderen belegen sie.
 *
 * ZUR TECHNIK DER LINIE: dieselbe Ueberlegung wie in prozess.tsx. Im SVG
 * liegt nur die gerade Strecke, gedehnt wird ausschliesslich ENTLANG von ihr
 * (Massstab quer dazu ist exakt 1), deshalb bleibt die Strichstaerke bei
 * einem Pixel und es braucht kein vector-effect. Teilstriche und Fuss stehen
 * quer und sind deshalb CSS-Kanten, keine Pfade.
 */

/** Abstand zwischen zwei Absaetzen. Drei Stufen, 90 ms, Budget sind vier. */
const STAFFEL_MS = 90;

/**
 * Vorlauf des Fusses. Er haengt an .marker-in und kommt damit bei
 * --draw-delay plus 70 Prozent der Zeichendauer an (globals.css 6.4). Mit
 * --d-slow als Zeichendauer sind das rund 474 ms: nach dem Ende der Linie
 * (420 ms) und noch innerhalb des Staffelbudgets von 500 ms.
 */
const FUSS_AB_MS = 180;

export default function Ueber() {
  const { eyebrow, headline, absaetze } = seite.ueber;
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      // is-in am gemeinsamen Vorfahren fuer .draw-line und .marker-in; die
      // .reveal-Kinder tragen die Klasse zusaetzlich selbst, weil globals.css
      // sie als ".reveal.is-in" liest und nicht als Nachfahren.
      className={cn("mx-auto max-w-page px-gutter py-section", revealed && "is-in")}
    >
      <div className="max-w-text">
        {/* Abschnittsmarke in derselben Bauform wie im Hero und in befund.tsx.
            Ohne Bewegung: sie steht schon im Bild, wenn der Beobachter
            ausloest. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{eyebrow}</span>
        </p>

        <h2 id="ueber-titel" className="mt-6 text-display-2 text-balance text-ink">
          {headline}
        </h2>

        {/* Die Lesespalte rueckt um den Rand ein, in dem die Linie steht.
            --d-draw von 700 auf --d-slow: die Strecke ist eine einzige gerade
            Linie ueber drei Absaetze, und 700 ms lesen sich dabei zaeh. */}
        <div
          className="relative mt-block pl-8"
          style={{ ["--d-draw" as string]: "var(--d-slow)" } as CSSProperties}
        >
          {/* h-full und NICHT top-0/bottom-0: ein <svg> ohne height-Attribut
              ist ein ersetztes Element, seine Hoehe ist auto und kommt dann
              aus dem viewBox statt aus der Aufspannung; das ueberzaehlige
              bottom wird verworfen. Die Randlinie war damit genau 100 Pixel
              lang und endete mitten im ersten Absatz, waehrend die Striche der
              beiden anderen Absaetze im Nichts standen. Im Browser gemessen,
              2026-08-24. Der senkrechte Lauf in prozess.tsx hatte den Fehler
              nie, weil dort ohnehin eine Hoehenklasse steht. */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 12 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-0 left-0 h-full w-3 overflow-visible text-line2"
          >
            <path
              className="draw-line"
              d="M0.5 0 V100"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="butt"
            />
          </svg>

          {/* Der Fuss, der den Eintrag schliesst. In line3 und nicht im Akzent:
              siehe Begruendung im Dateikopf. */}
          <span
            aria-hidden="true"
            className="marker-in absolute bottom-0 left-0 h-px w-2.5 bg-line3"
            style={{ ["--draw-delay" as string]: `${FUSS_AB_MS}ms` } as CSSProperties}
          />

          <div className="space-y-6">
            {absaetze.map((absatz, index) => (
              <div
                key={absatz}
                className={cn("reveal", revealed && "is-in")}
                style={
                  { ["--reveal-delay" as string]: `${index * STAFFEL_MS}ms` } as CSSProperties
                }
              >
                <p className={cn("relative", index === 0 ? "text-lead text-ink" : "text-soft")}>
                  {/* Der Teilstrich am Absatz. Er steht IM Absatz und nicht in
                      der Huelle darum, damit sich sein em an dessen
                      Schriftgroesse misst: der erste Absatz steht in text-lead,
                      die beiden anderen in text-body, und der Strich soll bei
                      beiden in der ersten Zeile liegen und nicht darueber.
                      0,75em ist die optische Mitte einer Zeile bei
                      line-height 1,5 bis 1,65. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.75em] -left-8 block h-px w-2 bg-line3"
                  />
                  {absatz}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
