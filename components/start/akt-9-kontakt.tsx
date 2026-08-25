import { start } from "@/content/start";

/**
 * AKT 9, KONTAKT. data-sc-act="pin", Spanne 1,15 Bildschirme. Der Schluss.
 *
 * Drei Dinge sind hier Mechanik und keine Gestaltung:
 *
 * 1. id="kontakt". public/scrollcraft/page.js sucht diesen Akt ueber genau
 *    dieses id, um den Tastaturfokus auf dem CTA zu reparieren. Auf einer
 *    gepinnten Buehne (position: sticky) wuerde das eingebaute
 *    scrollIntoView der Engine den Leser aus dem Akt heraus nach hinten
 *    scrollen, der Fortschritt stuende wieder auf 0 und der CTA waere im
 *    Moment des Fokus unsichtbar. page.js parkt den Fortschritt stattdessen
 *    bei 0,30, also sicher innerhalb des Halteplateaus. Wer das id aendert,
 *    schaltet diese Reparatur ab, ohne dass irgendetwas einen Fehler meldet.
 *
 * 2. data-sc-cue="0.05" mit EINEM Wert. Nur der letzte Akt darf einen Cue
 *    halten statt ihn wieder auszublenden. Zwei oder drei Werte hier wuerden
 *    den Schluss wieder wegblenden, waehrend der Leser noch davor steht.
 *
 * 3. Der Fuss steht INNERHALB der Buehne. Sonst laeuft nach dem Schlusssatz
 *    noch ein Stueck Seite nach, und der Akt, dessen Aufgabe das Anhalten
 *    ist, haelt nicht an.
 */
export default function AktKontakt() {
  const { label, headline, ctaLabel, ctaHref, fussSatz, fussEmail, fussEmailHref } = start.kontakt;

  return (
    <section id="kontakt" data-sc-act="pin" data-sc-span="1.15" data-sc-drift="#0A0B0D">
      <div data-sc-stage="" className="close" data-sc-spotlight="">
        <div className="close__inner">
          <span className="sc-label" data-sc-cue="0.05">
            {label}
          </span>
          <h2 className="sc-display sc-display--lg" data-sc-cue="0.05" data-sc-kinetic="lines">
            {headline}
          </h2>
          {/* data-sc-magnet: der Knopf lehnt sich dem Zeiger entgegen.
              data-sc-rise="0" nimmt ihm das Einsteigen von unten, weil er auf
              einer gepinnten Buehne sonst waehrend des ganzen Akts unterwegs
              waere statt einmal anzukommen. */}
          <a
            className="cta"
            href={ctaHref}
            data-sc-magnet="0.26"
            data-sc-cue="0.05"
            data-sc-rise="0"
          >
            {ctaLabel}
          </a>
        </div>

        <footer className="foot">
          <span>{fussSatz}</span>
          <a href={fussEmailHref}>{fussEmail}</a>
        </footer>
      </div>
    </section>
  );
}
