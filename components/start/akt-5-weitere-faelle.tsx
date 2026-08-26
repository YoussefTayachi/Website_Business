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
/**
 * Die gezeichnete Miniatur einer Website, einmal alt und einmal neu.
 *
 * DER GANZE WITZ IST, DASS BEIDE FASSUNGEN DASSELBE MARKUP HABEN. Genau das
 * behauptet die Bildunterschrift von Akt 4 ("Same business. Same content.
 * Rebuilt."), und hier laesst es sich beweisen statt behaupten: dieselben acht
 * Elemente, zwei Stylesheets, zwei Ergebnisse. Der Knopf (.cc-cta) steht in
 * beiden an derselben Stelle im Dokument; in der alten Fassung schiebt ihn
 * allein `order` ans Ende, was der Kartentext darunter woertlich sagt ("the
 * quote request was buried ... now it is one line, at the top").
 *
 * Kein Screenshot und kein Bild: die Betriebe sind erfunden, ein Screenshot
 * waere eine erfundene Referenz. Gezeichnet wird deshalb nur die STRUKTUR
 * einer Seite, und die traegt den Unterschied allein: links randlos, gedraengt,
 * eine Wand aus Text; rechts Rand, Rhythmus, eine einzige Handlung.
 *
 * Reine Zeichnung, deshalb traegt der ganze Block aria-hidden (siehe unten):
 * fuer einen Screenreader steht der Sinn der Karte im Text darunter, und eine
 * Reihe leerer <i> vorzulesen hilft niemandem.
 */
function Miniatur({ fassung }: { fassung: "alt" | "neu" }) {
  return (
    <div className={`cc-site cc-site--${fassung}`}>
      <div className="cc-top">
        <i className="cc-brand" />
        <i className="cc-navlink" />
        <i className="cc-navlink" />
        <i className="cc-navlink" />
      </div>
      <i className="cc-head" />
      <i className="cc-head cc-head--sub" />
      <i className="cc-cta" />
      <i className="cc-media" />
      <i className="cc-text" />
      <i className="cc-text" />
      <i className="cc-text" />
      <i className="cc-text" />
      <i className="cc-text cc-text--end" />
    </div>
  );
}

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
              {/* Nebeneinander, nicht uebereinander: der Vorher/Nachher-Griff
                  dieser Seite laeuft waagerecht (Akt 4 zieht die neue Fassung
                  per clip-path von links nach rechts auf). Zwei gestapelte
                  Baender waeren derselbe Gedanke in einer zweiten Sprache.

                  aria-hidden auf dem ganzen Block, samt der Beschriftungen:
                  ohne die Zeichnung sind "Before" und "After" fuer einen
                  Screenreader zwei Woerter ohne Bezug. Der Sinn der Karte
                  steht im Text darunter und wird dort vorgelesen. */}
              <div className="case-card__split" aria-hidden="true">
                <div className="case-card__before">
                  <span>{vorherLabel}</span>
                  <Miniatur fassung="alt" />
                </div>
                <div className="case-card__after">
                  <span>{nachherLabel}</span>
                  <Miniatur fassung="neu" />
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
