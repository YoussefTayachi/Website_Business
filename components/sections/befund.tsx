import type { CSSProperties } from "react";
import { seite } from "@/content/seite";

/**
 * Sektion 2: Der Befund (PLAN.md Abschnitt 5).
 *
 * Aufgabe: die Weckung vor dem Beweis. Der Besucher hat in der Mail einen
 * Befund ueber seine eigene Website gelesen; hier steht, dass dieser Befund
 * kein Einzelfall ist, und gleich darunter im Showcase steht er gebaut.
 *
 * DIE FORM IST DIE AUSSAGE: ein Pruefbericht, keine Feature-Kacheln. Vier
 * Zeilen mit laufender Nummer, Messschild-Beschriftung und einem Satz dazu,
 * getrennt durch Haarlinien und geklammert von Eckwinkeln. Keine Karte, kein
 * Schatten, kein Symbol. Wer vier gleich grosse Kaesten mit Icons hinstellt,
 * schreibt Werbung; wer vier Zeilen untereinander setzt, schreibt einen
 * Befund.
 *
 * Bewusst dieselbe Bauform wie die BefundListe in
 * components/showcase/befund-marker.tsx (Nummer in Akzentfarbe, Schild in
 * Versalien, Satz darunter): was hier als Behauptung steht, taucht ein
 * Bildschirm weiter unten als Messschild auf der alten Fassung wieder auf.
 * Zwei Bauformen fuer dieselbe Sache waeren zwei Sprachen.
 *
 * KEINE BEWEGUNG. Das Motion-Budget (PLAN.md Abschnitt 4) hat drei Momente,
 * und dieser gehoert nicht dazu: Einstieg im Hero, Umschlag im Showcase,
 * Befund-Marker auf der alten Fassung. Ein Reveal auch hier waere der Anfang
 * einer Seite, auf der alles wackelt.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx (aria-labelledby).
 */

/** Die Eckwinkel der Liste. Eine Stufe leiser als die Vorgabe: sie klammern
 *  das Feld, sie sind nicht sein Rahmen. */
const KLAMMER: CSSProperties = {
  ["--tick-inset" as string]: "clamp(0.5rem, 2vw, 1.25rem)",
  ["--tick-len" as string]: "16px",
  ["--tick-color" as string]: "var(--c-line2)",
} as CSSProperties;

export default function Befund() {
  const { befund } = seite;

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      <header className="max-w-[46rem]">
        {/* Abschnittsmarke in derselben Bauform wie der Kicker im Hero: erst
            der Strich, dann die Beschriftung. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{befund.eyebrow}</span>
        </p>

        <h2 id="befund-titel" className="mt-6 text-display-2 text-balance text-ink">
          {befund.headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{befund.intro}</p>
      </header>

      {/* Die Befunde. divide-y statt eines Rahmens: es gibt nur Trennlinien
          zwischen den Zeilen, aussen klammern die Eckwinkel. Erst Abstand,
          dann Linie, dann Rahmen, und ein Rahmen ist hier nicht noetig. */}
      <ol className="ticks mt-block max-w-[56rem] divide-y divide-line" style={KLAMMER}>
        {befund.items.map((item, index) => (
          <li
            key={item.label}
            className={[
              // Auf schmalen Fenstern zwei Spalten (Nummer, Inhalt), ab md
              // drei: die Beschriftung bekommt eine eigene Spalte und die
              // Saetze stehen alle auf derselben Flucht. Das ist der
              // Unterschied zwischen einer Liste und einem Bericht.
              "grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 py-6",
              "md:grid-cols-[2.25rem_minmax(0,14rem)_minmax(0,1fr)] md:gap-x-6 md:py-7",
            ].join(" ")}
          >
            <span className="mono-label-xs col-start-1 row-start-1 text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mono-label col-start-2 row-start-1 text-ink">{item.label}</h3>

            <p className="col-start-2 row-start-2 max-w-text text-body text-soft md:col-start-3 md:row-start-1">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
