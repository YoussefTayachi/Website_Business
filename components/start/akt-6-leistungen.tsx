import { start } from "@/content/start";

/**
 * AKT 6, LEISTUNGEN. data-sc-act="flow".
 *
 * Drei schlichte Aussagen. Kein Kartengitter, keine Symbole: nach dem
 * Hoehepunkt soll die Seite ruhig werden, und ein Symbolraster waere hier der
 * Rueckfall in die Bauweise, gegen die Akt 4 gerade argumentiert hat.
 *
 * Die Staffelung liegt auf der Gruppe (data-sc-stagger), nicht auf den
 * einzelnen Punkten: die Engine zaehlt die Kinder selbst durch.
 */
export default function AktLeistungen() {
  const { label, headline, punkte } = start.leistungen;

  return (
    <section className="sc-section tight" data-sc-act="flow" data-sc-drift="#0E0F12">
      <div className="sc-wrap">
        <div className="sc-stack" data-sc-in="" data-sc-stagger="60">
          <span className="sc-label">{label}</span>
          <h2 className="sc-display sc-display--lg">{headline}</h2>
        </div>

        <div className="offer__grid" data-sc-in="" data-sc-stagger="70">
          {punkte.map((punkt) => (
            <div key={punkt.index} className="offer__item">
              <span className="offer__index">{punkt.index}</span>
              <div>
                <h3>{punkt.titel}</h3>
                <p>{punkt.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
