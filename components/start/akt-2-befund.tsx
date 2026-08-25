import { start } from "@/content/start";

/**
 * AKT 2, BEFUND. data-sc-act="flow", also kein Pin: der Abschnitt scrollt
 * normal durch.
 *
 * Die drei Befunde tauchen nacheinander auf. Die Staffelung liegt NICHT in
 * einer Verzoegerung, sondern in data-sc-reveal-at: die zwei Zahlen sind der
 * Fortschritt des Akts (0 bis 1), zwischen dem der Befund erscheint. Damit
 * gehoert das Tempo der Hand des Lesers und nicht einer Uhr, und beim
 * Zuruckscrollen laeuft es rueckwaerts. Wer die Werte anfasst, verschiebt die
 * Befunde gegeneinander.
 */
export default function AktBefund() {
  const { label, headline, befunde, abschluss } = start.befund;

  // Die drei Fenster stammen aus dem verifizierten Build und stehen deshalb
  // hier neben dem Inhalt, nicht in content/start.ts: sie sind Mechanik und
  // haben mit dem Text nichts zu tun.
  const revealAt = ["0.08 0.30", "0.35 0.57", "0.62 0.84"];

  return (
    <section className="sc-section befund" data-sc-act="flow" data-sc-drift="#121316">
      <div className="sc-wrap">
        <div className="befund__head sc-stack" data-sc-in="" data-sc-stagger="60">
          <span className="sc-label">{label}</span>
          <h2 className="sc-display sc-display--lg">{headline}</h2>
        </div>

        <div className="befund__list">
          {befunde.map((befund, i) => (
            <figure
              key={befund.tag}
              className="finding"
              data-sc-reveal="up"
              data-sc-reveal-at={revealAt[i]}
            >
              <figcaption className="finding__tag">{befund.tag}</figcaption>
              <div className="finding__body">
                <p className="sc-lede">{befund.text}</p>
                <span className="finding__stat">{befund.stat}</span>
              </div>
            </figure>
          ))}
        </div>

        <p className="befund__close" data-sc-in="">
          {abschluss}
        </p>
      </div>
    </section>
  );
}
