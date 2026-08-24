import { seite } from "@/content/seite";

/**
 * Sektion 4: Leistungen.
 * Aufgabe (Plan 5): was Youssef baut. Knapp, vier Bloecke.
 *
 * Server Component, ohne Bewegung. Diese Sektion gehoert zum ruhigen Teil der
 * Seite (Plan 4: das Motion-Budget liegt beim Hero, beim Umschlag und bei den
 * Befunden). Eine Datei nur fuer ein sanfteres Erscheinen zur Client Component
 * zu machen, waere ein schlechter Tausch.
 *
 * Aufbau: ein Kopfblock in Lesebreite, darunter vier Bloecke als Zweispalter.
 * Jeder Block haengt unter einer Haarlinie statt in einem Kasten (Plan 3:
 * "Haarlinien statt Kaesten"). Der Zweispalter ist auf max-w-5xl gedeckelt,
 * damit die Spalte bei 17 Pixel Fliesstext unter 60 Zeichen bleibt; ueber die
 * volle Seitenbreite waeren es rund 70 Zeichen pro Spalte und damit zu breit.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx: die dortige
 * <section> zeigt per aria-labelledby darauf. Beim Umbauen mitziehen.
 */
export default function Leistungen() {
  const { eyebrow, headline, intro, items } = seite.leistungen;

  // py-section wie in befund.tsx und showcase.tsx: der Abstand zwischen zwei
  // Sektionen setzt sich damit aus zwei Haelften zusammen, eine je Nachbar.
  // Wichtig ist nur, dass es alle sieben Sektionen gleich machen.
  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      {/* Abschnittsmarke, Ueberschrift, Vorspann. Genau dieselbe Bauform wie
          im Hero und in befund.tsx: erst der Strich, dann die Beschriftung.
          Sieben Sektionen mit sieben Kopfvarianten waeren sieben Handschriften.
          Die Marke steht NICHT in Akzentfarbe: der Akzent gehoert laut
          globals.css dem CTA und dem Befund-Marker. */}
      <header className="max-w-[46rem]">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
          <span className="mono-label text-soft">{eyebrow}</span>
        </p>

        <h2 id="leistungen-titel" className="mt-6 text-display-2 text-balance text-ink">
          {headline}
        </h2>

        <p className="mt-5 max-w-text text-lead text-soft">{intro}</p>
      </header>

      <ul className="mt-block grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.titel} className="border-t border-line pt-5">
            <h3 className="text-title text-ink">{item.titel}</h3>
            <p className="mt-3 text-soft">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
