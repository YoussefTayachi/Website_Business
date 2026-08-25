import { start } from "@/content/start";

/**
 * AKT 7, PROZESS. data-sc-act="pan", Spanne 2,0 Bildschirme.
 *
 * Vier Schritte auf einer Haarlinien-Zeitachse, die seitlich vorbeilaeuft.
 * Der zweite Pan der Seite, und das ist Absicht: derselbe Griff fuer denselben
 * Gedanken ("mehrere gleichrangige Dinge nacheinander"), statt fuer jeden
 * Abschnitt eine neue Bewegung zu erfinden.
 *
 * data-sc-pan="0.08" ist flacher als in Akt 5, weil die Zeitachse schmaler
 * baut als die Fallkarten.
 */
export default function AktProzess() {
  const { label, headline, schritte } = start.prozess;

  return (
    <section className="sc-section" data-sc-act="pan" data-sc-span="2.0" data-sc-drift="#121316">
      <div data-sc-stage="" className="pan-stage">
        <div className="timeline" data-sc-pan="0.08">
          <div className="timeline__lead sc-stack">
            <span className="sc-label">{label}</span>
            <h2 className="sc-display sc-display--md">{headline}</h2>
          </div>

          {schritte.map((schritt) => (
            <div key={schritt.mark} className="step">
              {/* Der Teilstrich auf der Zeitachse. Reine Zeichnung, deshalb
                  aria-hidden: fuer einen Screenreader ist die Reihenfolge der
                  Schritte schon durch die Reihenfolge im Dokument gegeben. */}
              <div className="step__tick" aria-hidden="true" />
              <span className="step__mark">{schritt.mark}</span>
              <h3>{schritt.titel}</h3>
              <p>{schritt.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
