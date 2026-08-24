import Link from "next/link";
import VorherNachher from "@/components/showcase/vorher-nachher";
import { projekteListe } from "@/content/projekte";
import { seite } from "@/content/seite";
import { demoFassungen } from "@/lib/demo-fassungen";

/**
 * Sektion 3: Showcase, das Herzstueck (PLAN.md Abschnitt 2 und 5).
 *
 * Hier loest die Seite ein, was die Mail behauptet hat. Statt zu erklaeren,
 * dass eine Website von 2012 nicht mehr traegt, stehen beide Fassungen im
 * selben Fenster und der Besucher schaltet selbst um.
 *
 * WAS DIESE DATEI TUT und was nicht: sie stellt drei Projekte in eine
 * Reihenfolge, gibt jedem seinen Kopf (Nummer, Branche, Firma, Beschreibung,
 * Weg in die Tiefe) und uebergibt die Flaeche an die Mechanik. Der Umschlag
 * selbst, der Schieber, die Messschilder und das Pflichtkennzeichen ueber der
 * Flaeche gehoeren components/showcase/vorher-nachher.tsx. Zwei Stellen, die
 * dasselbe Kennzeichen setzen, waeren zwei Stellen, an denen es fehlen kann.
 *
 * DREI GROSSE FLAECHEN UNTEREINANDER sind viel Weg. Damit niemand darin
 * verloren geht, traegt jedes Projekt seinen Zaehler ("01 / 03") ueber der
 * Flaeche: er sagt, wo man ist, und er sagt, dass es endlich ist. Deshalb
 * "von drei" und nicht nur eine laufende Nummer.
 *
 * KEINE EIGENE BEWEGUNG. Die zwei Momente, die hier hingehoeren, bringt die
 * Mechanik mit: den Umschlag und das Zeichnen der Messschilder (PLAN.md
 * Abschnitt 4). Ein Reveal der Sektion obendrauf waere der dritte, und dann
 * bewegt sich alles und nichts hat mehr Gewicht.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx (aria-labelledby).
 */
export default function Showcase() {
  const { showcase, kleintexte } = seite;
  const gesamt = projekteListe.length;

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      <header className="max-w-[46rem]">
        {/* Abschnittsmarke in derselben Bauform wie im Hero und im Befund. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{showcase.eyebrow}</span>
        </p>

        <h2 id="showcase-titel" className="mt-6 text-display-2 text-balance text-ink">
          {showcase.headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{showcase.intro}</p>
      </header>

      <div className="mt-block space-y-section">
        {projekteListe.map((projekt, index) => {
          const fassungen = demoFassungen[projekt.slug];
          const AltFassung = fassungen.alt;
          const NeuFassung = fassungen.neu;
          const titelId = `showcase-${projekt.slug}`;

          return (
            <article key={projekt.slug} aria-labelledby={titelId} className="border-t border-line">
              {/* Der Kopf des Projekts. Zaehler links, Branche rechts, beide
                  als Messschild direkt unter der Haarlinie: das ist die
                  Beschriftung eines Blattes, nicht die Ueberschrift einer
                  Karte. */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-5">
                {/* mono-label-xs bringt die Monoschrift und die
                    gleichbreiten Ziffern schon mit. Die laufende Nummer steht
                    in Tinte, die Gesamtzahl daneben leiser: das eine ist die
                    Auskunft, das andere ihr Bezug.
                    aria-hidden, weil "01 / 03" vorgelesen nichts erklaert.
                    Wer zuhoert, bekommt die Auskunft besser: der Vorspann der
                    Sektion nennt die Zahl der Betriebe, und die Ueberschriften
                    der drei Artikel stehen ohnehin in der Elementliste. */}
                <p aria-hidden="true" className="mono-label-xs">
                  <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-faint"> / {String(gesamt).padStart(2, "0")}</span>
                </p>
                <p className="mono-label text-soft">{projekt.branche}</p>
              </div>

              <h3 id={titelId} className="mt-5 text-display-3 text-balance text-ink">
                {projekt.firma}
              </h3>

              <p className="mt-3 max-w-text text-body text-soft">{projekt.kurzbeschreibung}</p>

              {/* Die Flaeche bekommt die volle Breite der Seite. Die gezeigten
                  Websites brauchen sie: die alte Fassung ist fest 900 Pixel
                  breit, die neue laeuft bis --container-demo (46rem). Eine
                  Lesespalte waere hier der falsche Rahmen. */}
              <div className="mt-block">
                {AltFassung && NeuFassung ? (
                  <VorherNachher
                    firma={projekt.firma}
                    findings={projekt.findings}
                    alt={<AltFassung />}
                    neu={<NeuFassung />}
                  />
                ) : (
                  // Kein stiller Leerraum, wenn eine Fassung fehlt (siehe
                  // lib/demo-fassungen.ts). Auf dieser Seite waere eine leere
                  // Flaeche genau das falsche Signal. Das Pflichtkennzeichen
                  // setzt sonst die Mechanik; faellt sie aus, steht es hier.
                  // PLATZHALTERTEXT: gehoert nach content/seite.ts, sobald der
                  // copywriter dafuer eine Zeile hat. Wortlaut vorerst wie in
                  // app/arbeit/[slug]/page.tsx, damit beide Stellen dasselbe
                  // sagen.
                  <div className="space-y-3">
                    <p>
                      <span className="demo-mark">{kleintexte.demoKennzeichen.label}</span>
                    </p>
                    <p className="rounded-sm border border-line2 px-4 py-3 text-small text-faint">
                      Die gebauten Fassungen für {projekt.firma} fehlen noch.
                    </p>
                  </div>
                )}
              </div>

              {/* Der Fuss des Projekts: links der Weg in die Tiefe, rechts
                  derselbe Zaehler wie oben. Ein Textlink und kein zweiter
                  Knopf, der eine Knopf der Seite steht im Hero und im
                  Kontakt.
                  Der Zaehler steht zweimal, weil eine Demoflaeche hoch ist:
                  wer unten ankommt, hat den Kopf des Projekts lange nicht
                  mehr gesehen und will wissen, ob nach diesem Beispiel noch
                  eines kommt. Wie die Seitenzahl oben und unten am Blatt. */}
              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                <Link
                  href={`/arbeit/${projekt.slug}`}
                  className="link-rule inline-flex min-h-11 items-center gap-2 text-body text-ink"
                >
                  {showcase.fallstudieLinkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </Link>

                <p aria-hidden="true" className="mono-label-xs text-faint">
                  {String(index + 1).padStart(2, "0")} / {String(gesamt).padStart(2, "0")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
