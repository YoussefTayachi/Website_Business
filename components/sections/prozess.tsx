import { seite } from "@/content/seite";

/**
 * Sektion 5: Prozess.
 * Aufgabe (Plan 5): wie es ablaeuft, Angst nehmen. Vier Schritte, nummeriert.
 *
 * Server Component, ohne Bewegung (Begruendung siehe leistungen.tsx).
 *
 * DIE GESTALTERISCHE ENTSCHEIDUNG: die vier Schritte sind KEINE vier
 * gleichrangigen Kacheln, sondern eine Skala. Auf breiten Fenstern stehen sie
 * in vier Spalten ohne waagerechten Abstand, wodurch ihre oberen Haarlinien zu
 * EINER durchgehenden Linie zusammenlaufen; der Abstand zum Nachbarn kommt aus
 * dem Innenabstand (pr) und nicht aus einer Luecke im Raster. An jedem
 * Schrittanfang haengt ein Teilstrich an dieser Linie, am Ende des vierten ein
 * zweiter, der die Skala schliesst. Genau die Sprache, die die Seite ohnehin
 * spricht (Plan 3: Messschilder, Haarlinien, Eckwinkel).
 *
 * Angst nehmen heisst hier: der Weg ist sichtbar endlich. Man sieht auf einen
 * Blick, dass es vier Schritte sind und wo sie aufhoeren.
 *
 * Die Nummern kommen als Text aus content/seite.ts und werden NICHT ein
 * zweites Mal per CSS-Counter erzeugt.
 */
export default function Prozess() {
  const { eyebrow, headline, intro, schritte } = seite.prozess;

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      {/* Abschnittsmarke in derselben Bauform wie im Hero und in befund.tsx. */}
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

      {/* Semantisch eine geordnete Liste: die Reihenfolge ist der Inhalt. */}
      <ol className="mt-block grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {schritte.map((schritt, index) => (
          <li
            key={schritt.nummer}
            className="relative border-t border-line2 pt-5 sm:pr-8 lg:pr-10"
          >
            {/* Der Teilstrich am Schrittanfang. Aria-versteckt: die Nummer
                daneben sagt dasselbe bereits in Worten. */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-2 w-px bg-line3"
            />
            {/* Der schliessende Teilstrich, nur dort, wo die vier Schritte
                tatsaechlich als eine Skala nebeneinanderstehen. In den
                gestapelten Layouts haenge er am rechten Rand eines einzelnen
                Schrittes und wuerde dort nichts bedeuten. */}
            {index === schritte.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 hidden h-2 w-px bg-line3 lg:block"
              />
            ) : null}

            <p className="mono-label text-ink">{schritt.nummer}</p>
            <h3 className="mt-3 text-title text-ink">{schritt.titel}</h3>
            <p className="mt-2 text-small text-soft">{schritt.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
