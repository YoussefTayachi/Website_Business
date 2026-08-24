import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VorherNachher from "@/components/showcase/vorher-nachher";
import { projekte, projekteListe, type ProjektSlug } from "@/content/projekte";
import { seite } from "@/content/seite";
import { demoFassungen } from "@/lib/demo-fassungen";

/**
 * Fallstudie zu einem Demo-Projekt (PLAN.md Abschnitt 5, /arbeit/[slug]).
 *
 * Alles Inhaltliche kommt aus content/projekte.ts, alles Uebrige aus
 * content/seite.ts. In dieser Datei steht kein deutscher Satz mehr.
 *
 * DER AUFBAU. Nach dem Hero ist das der zweite grosse Gestaltungsmoment, und
 * er gehoert dem Vergleich: der steht ganz oben, direkt unter dem Kopf, und
 * bekommt die volle Seitenbreite. Was danach kommt, ist Begruendung und
 * deshalb Lesetext in einer Spalte. Drei Kapitel, jedes unter einer Haarlinie,
 * dazwischen Abstand statt Kasten. Innerhalb des Kapitels "Entscheidungen"
 * gibt es bewusst KEINE weiteren Linien: die Nummer und der Abstand sortieren
 * dort, sonst konkurrieren zwei Gliederungsebenen mit demselben Mittel.
 *
 * Am Ende steht derselbe Weg zurueck wie am Anfang. Wer unten ankommt, soll
 * nicht scrollen muessen, um wieder herauszufinden.
 */

function istProjektSlug(wert: string): wert is ProjektSlug {
  return Object.prototype.hasOwnProperty.call(projekte, wert);
}

export function generateStaticParams() {
  return projekteListe.map((projekt) => ({ slug: projekt.slug }));
}

// In Next 15 sind params ein Promise. Ohne await bekommt man kein Objekt,
// sondern ein Promise, und der Zugriff auf .slug ist dann still undefined.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!istProjektSlug(slug)) return {};

  const projekt = projekte[slug];

  // Das Kennzeichen steht schon im Titel: wer die Seite in einem
  // Suchergebnis sieht, soll gar nicht erst annehmen, das sei ein echter
  // Kunde (PLAN.md Abschnitt 6, harte Regel).
  return {
    title: `${projekt.firma} (${seite.kleintexte.demoKennzeichen.label})`,
    description: projekt.kurzbeschreibung,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!istProjektSlug(slug)) notFound();

  const projekt = projekte[slug];
  const { fallstudie } = projekt;
  const { showcase, kleintexte } = seite;
  const { zurueckLabel, zurueckHref, abschnitte } = seite.fallstudie;

  const fassungen = demoFassungen[slug];
  const AltFassung = fassungen.alt;
  const NeuFassung = fassungen.neu;

  // Zweimal derselbe Weg zurueck, oben und unten. Als eigene Konstante, damit
  // beide nie auseinanderlaufen.
  const zurueckLink = (
    <Link
      href={zurueckHref}
      className="link-rule mono-label-xs inline-flex min-h-11 items-center gap-2 text-soft"
    >
      <span aria-hidden="true">&larr;</span>
      {zurueckLabel}
    </Link>
  );

  return (
    <article className="mx-auto max-w-page px-gutter pt-block pb-section">
      {zurueckLink}

      <header className="mt-block">
        {/* Dieselbe Marke wie ueber jeder Sektion der Startseite: erst der
            Strich, dann die Beschriftung. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{projekt.branche}</span>
        </p>

        <h1 className="mt-6 text-display-2 text-balance text-ink">{projekt.firma}</h1>
        <p className="mt-5 max-w-text text-lead text-soft">{projekt.kurzbeschreibung}</p>

        {/* Pflichtkennzeichen (PLAN.md Abschnitt 6): jede Detailseite traegt
            sichtbar, dass es sich um ein fiktives Beispiel handelt. */}
        <p className="mt-8">
          <span className="demo-mark">{kleintexte.demoKennzeichen.label}</span>
        </p>
      </header>

      <section aria-labelledby="fallstudie-vergleich" className="mt-section">
        {/* Die Ueberschrift des Vergleichs steht eine Stufe unter dem
            Firmennamen: auf dieser Seite ist der Betrieb die Sache, der
            Vergleich ist der Beleg dafuer. */}
        <h2 id="fallstudie-vergleich" className="text-display-3 text-ink">
          {showcase.headline}
        </h2>

        <div className="mt-block">
          {AltFassung && NeuFassung ? (
            <VorherNachher
              variante="voll"
              firma={projekt.firma}
              findings={projekt.findings}
              alt={<AltFassung />}
              neu={<NeuFassung />}
            />
          ) : (
            // Kein stiller Leerraum: fehlt eine Fassung, steht das hier, bis
            // sie eingetragen ist (siehe lib/demo-fassungen.ts).
            // TODO(inhalt): der Satz gehoert nach content/seite.ts.
            <p className="rounded-sm border border-line2 px-4 py-3 text-small text-faint">
              Die gebauten Fassungen für {projekt.firma} fehlen noch.
            </p>
          )}
        </div>
      </section>

      {/* Die drei Kapitel als eine Gruppe. Der grosse Abstand steht vor der
          Gruppe, zwischen den Kapiteln der kleinere: so liest sich der
          Textteil als ein Stueck und nicht als drei Restsektionen. */}
      <div className="mt-section space-y-block">
        <section
          aria-labelledby="fallstudie-ausgangslage"
          className="max-w-text border-t border-line pt-8"
        >
          <h2 id="fallstudie-ausgangslage" className="text-display-3 text-ink">
            {abschnitte.ausgangslage}
          </h2>
          <p className="mt-5 text-soft">{fallstudie.ausgangslage}</p>
        </section>

        <section
          aria-labelledby="fallstudie-entscheidungen"
          className="max-w-text border-t border-line pt-8"
        >
          <h2 id="fallstudie-entscheidungen" className="text-display-3 text-ink">
            {abschnitte.entscheidungen}
          </h2>

          {/* Geordnete Liste, weil die Entscheidungen in content/projekte.ts in
              einer bewussten Reihenfolge stehen: erst der Kontaktweg, dann die
              Technik dahinter.
              items-baseline statt eines gerechneten Innenabstands: die Nummer
              sitzt damit auf derselben Schriftlinie wie der Titel, unabhaengig
              davon, wie sich die Schriftgroessen spaeter aendern. */}
          <ol className="mt-block space-y-8">
            {fallstudie.entscheidungen.map((entscheidung, index) => (
              <li
                key={entscheidung.titel}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3"
              >
                <span className="mono-label text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-title text-ink">{entscheidung.titel}</h3>
                  <p className="mt-2 text-soft">{entscheidung.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="fallstudie-ergebnis"
          className="max-w-text border-t border-line pt-8"
        >
          <h2 id="fallstudie-ergebnis" className="text-display-3 text-ink">
            {abschnitte.ergebnis}
          </h2>
          <p className="mt-5 text-lead text-ink">{fallstudie.ergebnis}</p>
        </section>
      </div>

      <div className="mt-section border-t border-line pt-6">{zurueckLink}</div>
    </article>
  );
}
