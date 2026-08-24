import { seite } from "@/content/seite";

/**
 * Sektion 6: Ueber Youssef.
 * Aufgabe (Plan 5): warum ausgerechnet er. Ehrlich, ohne Agentur-Plural.
 *
 * Server Component, ohne Bewegung (Begruendung siehe leistungen.tsx).
 *
 * Die Sektion mit der wenigsten Gestaltung, und das ist Absicht. Es gibt kein
 * Portraitfoto (Plan 8: die Seite arbeitet ohne fremde Bilder), also auch
 * keinen Ersatz dafuer: kein Initialenkreis, kein Signaturbild, keine
 * Zierflaeche. Was hier zaehlt, ist eine ruhige Lesespalte in max-w-text.
 *
 * Der erste Absatz steht eine Stufe groesser und in voller Tinte. Er traegt
 * die Antwort auf die Ueberschrift; die beiden anderen belegen sie.
 */
export default function Ueber() {
  const { eyebrow, headline, absaetze } = seite.ueber;

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      <div className="max-w-text">
        {/* Abschnittsmarke in derselben Bauform wie im Hero und in befund.tsx. */}
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{eyebrow}</span>
        </p>

        <h2 id="ueber-titel" className="mt-6 text-display-2 text-balance text-ink">
          {headline}
        </h2>

        <div className="mt-block space-y-6">
          {absaetze.map((absatz, index) => (
            <p key={absatz} className={index === 0 ? "text-lead text-ink" : "text-soft"}>
              {absatz}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
