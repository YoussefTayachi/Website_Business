import { start } from "@/content/start";

/**
 * AKT 5, WEITERE FAELLE. data-sc-act="pan", Spanne 2,0 Bildschirme.
 *
 * Die Buehne bleibt stehen, und die Schiene (.rail, data-sc-pan) laeuft
 * waehrenddessen seitlich durch. Zwei weitere fiktive Betriebe, damit der
 * erste Fall nicht als Einzelstueck dasteht.
 *
 * data-sc-pan="0.1" ist der Anteil der Schienenbreite, der am Ende noch stehen
 * bleibt. Die Engine rechnet den Weg selbst aus, es steht also bewusst keine
 * Pixelzahl in diesem Markup.
 *
 * Das Kennzeichen steht auf JEDER Karte, nicht einmal ueber der Gruppe. Beim
 * seitlichen Lauf ist immer nur ein Ausschnitt zu sehen, eine gemeinsame
 * Ueberschrift waere im entscheidenden Moment aus dem Bild.
 */
export default function AktWeitereFaelle() {
  const { label, headline, vorherLabel, nachherLabel, kennzeichen, karten, notiz } =
    start.weitereFaelle;

  return (
    <section className="range" data-sc-act="pan" data-sc-span="2.0" data-sc-drift="#101215">
      <div data-sc-stage="" className="pan-stage">
        <div className="rail" data-sc-pan="0.1">
          <div className="range__lead sc-stack">
            <span className="sc-label">{label}</span>
            <h2 className="sc-display sc-display--md">{headline}</h2>
          </div>

          {karten.map((karte) => (
            <article key={karte.titel} className="case-card">
              {/* Vorher und Nachher als gezeichnete Andeutung, nicht als
                  Screenshot: es gibt diese Betriebe nicht, und ein erfundener
                  Screenshot waere eine erfundene Referenz. Die .cc-line sind
                  reine Flaeche und tragen deshalb keinen Text. */}
              <div className="case-card__split">
                <div className="case-card__before">
                  <span>{vorherLabel}</span>
                  <div className="cc-line" />
                  <div className="cc-line" />
                </div>
                <div className="case-card__after">
                  <span>{nachherLabel}</span>
                  <div className="cc-line" />
                  <div className="cc-line" />
                </div>
              </div>
              <div className="case-card__body">
                <h3>{karte.titel}</h3>
                <p>{karte.text}</p>
              </div>
              <p className="case-card__flag fictional">{kennzeichen}</p>
            </article>
          ))}

          <div className="range__note sc-stack">
            <p className="sc-body">{notiz}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
