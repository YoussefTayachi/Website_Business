import type { Metadata } from "next";
import { seite } from "@/content/seite";

export const metadata: Metadata = {
  title: seite.impressum.titel,
  // Solange die Angaben Platzhalter sind, hat die Seite in einem Index nichts
  // verloren: ein unvollstaendiges Impressum, das gefunden wird, ist
  // schlimmer als eines, das nur intern erreichbar ist.
  robots: { index: false },
};

/**
 * Impressum aus content/seite.ts.
 *
 * Bewusst schlicht gehalten (lesbare Textspalte, max-w-text): diese Seite ist
 * kein Schauplatz, sie muss lesbar und vollstaendig sein.
 *
 * Die Datei ist ihrem Gegenstueck unter /datenschutz sehr aehnlich, teilt sich
 * mit ihm aber absichtlich keine Komponente: sobald echte Daten die
 * Platzhalter ersetzen, laufen beide Seiten in Aufbau und Gliederung
 * auseinander (Rechtstexte tun das immer), und dann waere die gemeinsame
 * Komponente eine Fessel statt einer Ersparnis.
 */
export default function ImpressumPage() {
  const { impressum, kleintexte } = seite;

  return (
    <div className="mx-auto max-w-text px-gutter py-section">
      {/* Vor dem Livegang entfernen, zusammen mit den Klammern im Text. */}
      <p className="mb-block rounded-sm border border-accent-line bg-accent-wash px-4 py-3 text-small text-ink">
        {kleintexte.platzhalterWarnung}
      </p>

      <h1 className="text-display-3 text-ink">{impressum.titel}</h1>

      {impressum.abschnitte.map((abschnitt) => (
        <section key={abschnitt.ueberschrift} className="mt-block">
          <h2 className="text-title text-ink">{abschnitt.ueberschrift}</h2>
          {/* whitespace-pre-line: die Zeilenumbrueche im Inhalt sind Teil der
              Angabe (Name, Strasse, Ort untereinander), nicht Formatierung. */}
          <p className="mt-2 whitespace-pre-line text-soft">{abschnitt.text}</p>
        </section>
      ))}
    </div>
  );
}
