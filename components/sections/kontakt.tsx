import { seite } from "@/content/seite";

/**
 * Sektion 7: Kontakt.
 * Aufgabe (Plan 5): der naechste Schritt. Ein Weg, nicht drei.
 *
 * Server Component, ohne Bewegung (Begruendung siehe leistungen.tsx).
 *
 * KEIN FORMULAR (Plan 5): ohne Deployment gibt es keinen Empfaenger, und ein
 * Formular, das ins Leere schreibt, waere schlimmer als keines. Stattdessen
 * ein mailto mit vorbereitetem Betreff, und die Adresse zusaetzlich im
 * Klartext: wer kein Mailprogramm eingerichtet hat, kann sie kopieren, statt
 * vor einem Link zu stehen, der nichts tut.
 *
 * Das ist der letzte Bildschirm vor dem Fuss und die einzige Handlung der
 * ganzen Seite, deshalb bekommt er als einzige Flaeche das aufgelegte Blatt
 * (bg-sheet) und den einen Schatten, den globals.css kennt. Der Akzent taucht
 * hier zum zweiten und letzten Mal auf der Startseite auf: einmal im Hero,
 * einmal hier.
 */
export default function Kontakt() {
  const { eyebrow, headline, intro, emailLabel, emailAdresse, mailtoBetreff, terminlinkHinweis } =
    seite.kontakt;

  // Der Betreff muss kodiert werden: Doppelpunkt und Leerzeichen sind in einer
  // mailto-Abfrage sonst nicht zuverlaessig, "Anfrage: Website-Neubau" kaeme je
  // nach Mailprogramm zerlegt oder abgeschnitten an.
  const mailtoHref = `mailto:${emailAdresse}?subject=${encodeURIComponent(mailtoBetreff)}`;

  return (
    <div className="mx-auto max-w-page px-gutter py-section">
      <div className="max-w-4xl rounded-md bg-sheet px-6 py-10 shadow-lift sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="max-w-text">
          {/* Abschnittsmarke in derselben Bauform wie im Hero und in
              befund.tsx. Der Strich steht hier auf dem Blatt statt auf dem
              Tisch, deshalb line3 und nicht heller: er muss auch auf der
              helleren Flaeche noch tragen. */}
          <p className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
            <span className="mono-label text-soft">{eyebrow}</span>
          </p>

          <h2 id="kontakt-titel" className="mt-6 text-display-2 text-balance text-ink">
            {headline}
          </h2>

          <p className="mt-5 text-lead text-soft">{intro}</p>
        </div>

        <div className="mt-block flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          {/* 48 Pixel Mindesthoehe, also ueber den 44 aus WCAG 2.5.5. Dieselben
              Masse wie .nf-cta in globals.css, damit der Knopf der Seite und
              der Knopf in den gezeigten Fassungen dieselbe Hand haben.
              Der Fokusring kommt global aus :focus-visible.
              hover: kompiliert Tailwind v4 unter (hover: hover), der Zustand
              bleibt auf dem Handy also nicht nach dem Tippen stehen. */}
          <a
            href={mailtoHref}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-5 font-medium text-accent-contrast transition hover:bg-accent-strong active:scale-[0.98]"
          >
            {emailLabel}
          </a>

          {/* Die Adresse im Klartext. select-all: ein Klick markiert sie
              vollstaendig, ohne dass jemand am Wortanfang zielen muss. */}
          <span className="text-ink select-all">{emailAdresse}</span>
        </div>

        {/* Die bewusst offene Stelle. Ein Satz unter einer Haarlinie statt
            eines toten Knopfes: ein deaktiviertes Bedienelement verspricht
            etwas, das es nicht einloest, ein Hinweis benennt es. */}
        <div className="mt-block border-t border-line pt-5">
          <p className="max-w-text text-small text-soft">{terminlinkHinweis}</p>
        </div>
      </div>
    </div>
  );
}
