"use client";

import type { CSSProperties } from "react";
import { seite } from "@/content/seite";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/reveal";

/**
 * Sektion 5: Prozess.
 * Aufgabe (Plan 5): wie es ablaeuft, Angst nehmen. Vier Schritte, nummeriert.
 *
 * WARUM DIESE SEKTION JETZT EINE CLIENT COMPONENT IST. Bis hierher stand in
 * diesem Kopf die Begruendung, das Motion-Budget (PLAN.md Abschnitt 4) habe
 * drei Momente und dieser gehoere nicht dazu. Das galt, solange die Seite ihre
 * Wirkung aus Hero und Showcase zog und die uebrigen Sektionen reiner Satz
 * waren. Die Entscheidung ist zurueckgenommen: Prozess, Ueber und Kontakt sind
 * die Tafeln des Pruefberichts und bekommen gezeichnete Figuren, die sich beim
 * Ins-Blickfeld-Kommen EINMAL zeichnen. "use client" ist der Preis dafuer,
 * weil der IntersectionObserver aus lib/reveal.ts einen Browser braucht.
 * Der Aufwand bleibt gedeckelt: kein Zustand, kein Effekt, ein Beobachter je
 * Sektion, und jedes Element genau einmal.
 *
 * DIE GESTALTERISCHE ENTSCHEIDUNG (unveraendert gueltig, jetzt in Bewegung):
 * die vier Schritte sind KEINE vier gleichrangigen Kacheln, sondern eine
 * Skala. Auf breiten Fenstern stehen sie in vier Spalten ohne waagerechten
 * Abstand, ihre oberen Haarlinien laufen zu EINER durchgehenden Linie
 * zusammen; der Abstand zum Nachbarn kommt aus dem Innenabstand (pr) und nicht
 * aus einer Luecke im Raster. An jedem Schrittanfang haengt ein Teilstrich an
 * dieser Linie, am Ende des vierten ein zweiter, der die Skala schliesst.
 * Genau die Sprache, die die Seite ohnehin spricht (Plan 3: Messschilder,
 * Haarlinien, Eckwinkel).
 *
 * Angst nehmen heisst hier: der Weg ist sichtbar endlich. Man sieht auf einen
 * Blick, dass es vier Schritte sind und wo sie aufhoeren. Neu ist, dass man
 * es auch LAEUFT: die Linie zeichnet sich von links nach rechts durch alle
 * vier Stationen und endet in dem einen Akzent der Figur, dem schliessenden
 * Strich hinter Schritt 04 (der Uebergabe, also dem Livegang).
 *
 * Auf schmalen Fenstern kippt dieselbe Skala in die Senkrechte und laeuft von
 * oben nach unten. Deshalb faellt der fruehere Zwischenschritt mit zwei
 * Spalten weg: zwei Spalten mal zwei Zeilen sind keine Skala mehr, sondern
 * ein Raster, und eine Linie darin wuerde nichts mehr zeigen.
 *
 * WARUM DIE LAUFENDE LINIE EIN SVG IST UND DIE TEILSTRICHE NICHT.
 * Die Linie muss sich zeichnen, dafuer gibt es in globals.css genau ein
 * Werkzeug: .draw-line ueber stroke-dashoffset, mit pathLength="1", damit
 * kurze und lange Strecken gleich lang brauchen. Ein SVG, das einer Spalte
 * unbekannter Breite folgen soll, braucht preserveAspectRatio="none" und
 * verzerrt dabei normalerweise die Strichstaerke.
 *
 * Hier passiert das nachweislich nicht, und zwar durch die Geometrie und
 * nicht durch einen Trick: in JEDEM dieser SVGs liegt nur die GERADE STRECKE,
 * nie ein Querstrich. Beim waagerechten Lauf ist die Box 100 mal 12 Einheiten
 * gross und wird auf (Spaltenbreite mal 12px) gezogen, der Massstab in y ist
 * also exakt 1; die Strichstaerke einer waagerechten Linie wird in y gemessen
 * und bleibt damit 1 Pixel. Beim senkrechten Lauf gilt dasselbe gespiegelt.
 * Gedehnt wird ausschliesslich ENTLANG der Linie, nie quer zu ihr. Deshalb
 * braucht es hier kein vector-effect: es gibt nichts zu retten.
 *
 * Die Teilstriche stehen quer zur Linie und waeren genau der Fall, der
 * verzerren wuerde. Sie sind deshalb keine SVG-Pfade, sondern 1-Pixel-Kanten
 * aus CSS. Das hat einen zweiten, gestalterischen Ertrag: sie stehen von
 * Anfang an da, die Teilung ist also vorgedruckt und der Lauf zieht darueber.
 * Genau so liest sich ein Messgeraet, und nicht so, als entstuende die Skala
 * erst waehrend gemessen wird.
 *
 * DIE STAFFELUNG. Vier Stufen, 90 ms Abstand, nichts startet spaeter als
 * 360 ms nach Eintritt (Budget: 500 ms). Die Linie laeuft in vier
 * aneinandergesetzten Abschnitten, jeder --d-quick (120 ms) lang, also von
 * 0 bis 390 ms durch; der Text einer Station folgt seinem Abschnitt mit 90 ms
 * Vorlauf und kommt damit an, waehrend die Linie ihn schon passiert hat.
 * Wer schnell scrollt, sieht nie eine leere Flaeche, sondern hoechstens eine
 * Linie, die noch laeuft.
 *
 * OHNE JAVASCRIPT steht alles da: .reveal trug seinen Startzustand schon
 * immer nur unter (scripting: enabled), und .draw-line und .marker-in tun das
 * seit der Ergaenzung in globals.css ebenfalls.
 *
 * Die Nummern kommen als Text aus content/seite.ts und werden NICHT ein
 * zweites Mal per CSS-Counter erzeugt.
 */

/** Abstand zwischen zwei Stationen. Untergrenze des Budgets: 60 bis 90 ms. */
const STAFFEL_MS = 90;

/**
 * Vorlauf des Textes gegenueber seinem Linienabschnitt. Genau eine Stufe:
 * die Beschriftung erscheint, waehrend die Linie an ihr vorbeilaeuft, nicht
 * bevor sie da war und nicht erst, wenn die ganze Skala fertig ist.
 */
const TEXT_VORLAUF_MS = STAFFEL_MS;

/**
 * Der senkrechte Lauf muss die Luecke zum naechsten Schritt mit ueberbruecken,
 * sonst zerfaellt die Skala in vier Striche. Der Wert ist gap-y-12 aus dem
 * Raster unten und muss mit ihm zusammen geaendert werden.
 */
const LUECKE = "3rem";

/**
 * Vorlauf des Abschlusses am Ende der Skala. .marker-in rechnet --draw-delay
 * plus 70 Prozent der Zeichendauer (globals.css 6.4), mit --d-quick also plus
 * 84 ms; 330 ergibt 414 ms und liegt damit hinter dem Ende des letzten
 * Abschnitts (270 plus 120 = 390 ms) und noch innerhalb des Budgets von
 * 500 ms. Mit dem Wert der Station (270 ms) stuende der Abschluss bei 354 ms
 * und damit VOR der Linie, die zu ihm hinfuehrt.
 */
const ABSCHLUSS_AB_MS = 330;

export default function Prozess() {
  const { eyebrow, headline, intro, schritte } = seite.prozess;
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      // is-in am gemeinsamen Vorfahren: globals.css schreibt die Endzustaende
      // fuer reduzierte Bewegung als ".is-in .draw-line" und ".is-in
      // .marker-in", also in der Nachfahren-Form. .reveal dagegen wird als
      // ".reveal.is-in" gelesen und braucht die Klasse an sich selbst.
      className={cn("mx-auto max-w-page px-gutter py-section", revealed && "is-in")}
    >
      {/* Abschnittsmarke in derselben Bauform wie im Hero und in befund.tsx.
          Der Kopf bewegt sich bewusst nicht: er steht schon im Bild, wenn der
          Beobachter ausloest, und ein Kopf, der noch einfaehrt, waehrend die
          Skala darunter laeuft, waeren zwei Bewegungen um dieselbe Sache. */}
      <header className="max-w-[46rem]">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{eyebrow}</span>
        </p>

        <h2 id="prozess-titel" className="mt-6 text-display-2 text-balance text-ink">
          {headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{intro}</p>
      </header>

      {/* Semantisch eine geordnete Liste: die Reihenfolge ist der Inhalt.
          --d-draw wird hier von 700 ms auf --d-quick heruntergesetzt und gilt
          fuer alle vier Abschnitte: 700 ms sind die Dauer EINER Messschildlinie
          (befund-marker.tsx), hier haengen aber vier Abschnitte hintereinander,
          und die Skala braeuchte sonst fast drei Sekunden. Kein neuer Wert,
          sondern der naechstkleinere aus derselben Leiter in globals.css. */}
      <ol
        className="mt-block grid gap-y-12 lg:grid-cols-4 lg:gap-y-0"
        style={{ ["--d-draw" as string]: "var(--d-quick)" } as CSSProperties}
      >
        {schritte.map((schritt, index) => {
          const letzter = index === schritte.length - 1;
          const laufAb = index * STAFFEL_MS;

          return (
            <li key={schritt.nummer} className="relative pt-6 pl-8 lg:pl-0 lg:pr-8">
              {/* ── Der Lauf, waagerecht (ab lg) ────────────────────────────
                  Volle Spaltenbreite ohne Luecke zum Nachbarn, dadurch stossen
                  die vier Abschnitte stumpf aneinander und lesen sich als eine
                  Linie. w-full misst die Polsterbox des li und damit die ganze
                  Spalte, das Innenpolster (pr) liegt darin. */}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                className="pointer-events-none absolute top-0 left-0 hidden h-3 w-full overflow-visible text-line2 lg:block"
                style={{ ["--draw-delay" as string]: `${laufAb}ms` } as CSSProperties}
              >
                <path
                  className="draw-line"
                  d="M0 0.5 H100"
                  pathLength={1}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="butt"
                />
              </svg>

              {/* ── Der Lauf, senkrecht (unter lg) ──────────────────────────
                  Reicht bei allen ausser dem letzten Schritt um die Rasterluecke
                  ueber, damit die Skala durchlaeuft. Beim letzten endet sie mit
                  dem Schritt, denn dort hoert der Weg auf. */}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 12 100"
                preserveAspectRatio="none"
                className={cn(
                  "pointer-events-none absolute top-0 left-0 w-3 overflow-visible text-line2 lg:hidden",
                  letzter ? "h-full" : "h-[calc(100%+var(--prozess-luecke))]",
                )}
                style={
                  {
                    ["--draw-delay" as string]: `${laufAb}ms`,
                    ["--prozess-luecke" as string]: LUECKE,
                  } as CSSProperties
                }
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

              {/* Die Teilstriche. Quer zur Linie, deshalb CSS und nicht SVG
                  (Begruendung im Dateikopf). Sie stehen von Anfang an da: die
                  Skala ist eingraviert, gelaufen wird darauf.
                  12 statt 8 Pixel lang: mit der groesseren Schrift daneben
                  waren sie das kleinste Bauteil der Seite und verschwanden
                  gegen die Zeile, die sie eroeffnen. Die Teilung eines
                  Messgeraets muss man aus zwei Metern erkennen. */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 hidden h-3 w-px bg-line3 lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-3 bg-line3 lg:hidden"
              />

              {/* DER ABSCHLUSS, und der einzige Akzent dieser Figur. Er sitzt
                  am Ende des vierten Schrittes, also an der Uebergabe: hier
                  hoert der Weg auf, und genau das ist der Satz, den diese
                  Sektion sagen soll.

                  In der ersten Fassung war er ein Strich von 10 Pixeln ganz
                  aussen am Rand und im Browser praktisch nicht wahrnehmbar.
                  Ein Akzent, der seinen einen Satz nicht sagt, ist kein
                  leiser Akzent, sondern ein verschwendeter.

                  Jetzt sind es zwei Teile, beide weiterhin ein Pixel stark:
                  die letzten 40 Pixel des Laufs wechseln in den Akzent, und
                  darauf steht ein Strich von 20 statt 8 Pixeln. Dieselbe
                  Bauform wie .mess-lauf und .mess-zeiger im Hero. Dass der
                  Endstrich laenger ist als die Teilung, ist die Konvention
                  jeder Skala; laut wird davon nichts, weil die Strichstaerke
                  bleibt und in dieser Sektion kein zweites farbiges Element
                  steht, mit dem er konkurrieren koennte.

                  Der Akzentlauf liegt deckungsgleich auf der gezeichneten
                  Linie: der Pfad sitzt bei y=0,5 mit einem Pixel Staerke,
                  belegt also genau top-0/h-px. Senkrecht dasselbe bei x=0,5
                  und left-0/w-px. */}
              {letzter ? (
                <>
                  <span
                    aria-hidden="true"
                    className="marker-in absolute top-0 right-0 hidden h-px w-10 bg-accent lg:block"
                    style={{ ["--draw-delay" as string]: `${ABSCHLUSS_AB_MS}ms` } as CSSProperties}
                  />
                  <span
                    aria-hidden="true"
                    className="marker-in absolute top-0 right-0 hidden h-5 w-px bg-accent lg:block"
                    style={{ ["--draw-delay" as string]: `${ABSCHLUSS_AB_MS}ms` } as CSSProperties}
                  />
                  <span
                    aria-hidden="true"
                    className="marker-in absolute bottom-0 left-0 h-10 w-px bg-accent lg:hidden"
                    style={{ ["--draw-delay" as string]: `${ABSCHLUSS_AB_MS}ms` } as CSSProperties}
                  />
                  <span
                    aria-hidden="true"
                    className="marker-in absolute bottom-0 left-0 h-px w-5 bg-accent lg:hidden"
                    style={{ ["--draw-delay" as string]: `${ABSCHLUSS_AB_MS}ms` } as CSSProperties}
                  />
                </>
              ) : null}

              <div
                className={cn("reveal", revealed && "is-in")}
                style={
                  {
                    ["--reveal-delay" as string]: `${laufAb + TEXT_VORLAUF_MS}ms`,
                  } as CSSProperties
                }
              >
                {/* Die Nummer steht text-faint und nicht mehr in voller
                    Tinte. Sie und der Titel waren beide text-ink, also gleich
                    laut, und dann fuehrt keiner von beiden. Was jemand beim
                    Vorbeiscrollen lesen soll, ist "Erstgespraech", nicht "01".
                    Die Nummer ist die Marke an der Skala, mehr nicht: 4,80:1,
                    also lesbar, aber eine Stufe zurueck. */}
                <p className="mono-label text-faint">{schritt.nummer}</p>
                <h3 className="mt-3 text-title text-ink">{schritt.titel}</h3>
                {/* Bleibt text-small (17 Pixel) und wird NICHT auf Fliesstext
                    gehoben: die Spalte ist im breiten Fenster rund 250 Pixel
                    breit, bei 19 Pixel stuenden darin 26 Zeichen je Zeile.
                    Eine Stufe kleiner ist hier lesbarer als eine Stufe
                    groesser, weil die Zeile sonst zerfaellt. */}
                <p className="mt-3 text-small text-soft">{schritt.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
