import type { Metadata } from "next";
import { seite } from "@/content/seite";

export const metadata: Metadata = {
  title: seite.datenschutz.titel,
  // Wie beim Impressum: unvollstaendig und deshalb vorerst nicht im Index.
  robots: { index: false },
};

/**
 * Datenschutzerklaerung aus content/seite.ts.
 *
 * Bewusst schlicht gehalten (lesbare Textspalte, max-w-text). Zur bewussten
 * Nicht-Zusammenlegung mit /impressum siehe den Kommentar dort.
 */
export default function DatenschutzPage() {
  const { datenschutz, kleintexte } = seite;

  return (
    <div className="mx-auto max-w-text px-gutter py-section">
      {/* Vor dem Livegang entfernen, zusammen mit den Klammern im Text. */}
      <p className="mb-block rounded-sm border border-accent-line bg-accent-wash px-4 py-3 text-small text-ink">
        {kleintexte.platzhalterWarnung}
      </p>

      <h1 className="text-display-3 text-ink">{datenschutz.titel}</h1>

      {datenschutz.abschnitte.map((abschnitt) => (
        <section key={abschnitt.ueberschrift} className="mt-block">
          <h2 className="text-title text-ink">{abschnitt.ueberschrift}</h2>
          <p className="mt-2 whitespace-pre-line text-soft">{abschnitt.text}</p>
        </section>
      ))}
    </div>
  );
}
