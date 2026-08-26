import { start } from "@/content/start";

/**
 * AKT 4, VERGLEICH. data-sc-act="pin", Spanne 3,2 Bildschirme, die groesste
 * der Seite. DER HOEHEPUNKT.
 *
 * Hier laeuft der Signature Move aus public/scrollcraft/page.js: zwei
 * Mini-Websites stehen im selben Rahmen, beide werden aus der echten
 * Scrollposition gefahren, aber die schlechte wird auf einem gedrosselten,
 * ruckelnden Takt gezeichnet und die gute in jedem Bild, 1:1. Der Rueckstand
 * ist echt und keine weich gesetzte CSS-Transition. Der Leser fuehlt den
 * Unterschied in der Hand, bevor er eine Zeile darueber gelesen hat.
 *
 * WAS page.js AUS DIESEM MARKUP LIEST, und was deshalb nicht umbenannt oder
 * verschachtelt werden darf:
 *   [data-sc-peak]          der Akt selbst, von dort kommt --sc-p
 *   [data-sc-stage]         bekommt den Zustandsbericht data-sc-verify-state
 *   .demo-frame             ohne den Rahmen bricht page.js ab
 *   .demo-frame__viewport   liefert die Hoehe, gegen die gemessen wird
 *   .demo-track--bad/--good die zwei bewegten Bahnen
 *   .demo-pane--good        wird per clip-path aufgezogen (der Umschlag)
 *   .demo-status--bad/--good bekommen .is-active
 *   [data-checkpoint]       die Marker, mit ihrem Fortschrittsfenster
 *
 * Die beiden Demos sind echtes Markup und kein Bild. Nur so kann die
 * schlechte Fassung wirklich ruckeln, und nur so traegt das Kennzeichen
 * "Fictional demo. Not a real business." echten Text statt eingebrannter
 * Pixel.
 */
export default function AktVergleich() {
  const { label, headline, kennzeichen, bildunterschrift, url, alt, neu } = start.vergleich;

  return (
    <section
      className="showcase-peak"
      data-sc-act="pin"
      data-sc-span="3.2"
      data-sc-drift="#171310"
      data-sc-peak=""
    >
      <div data-sc-stage="">
        <div className="peak__stage">
          <div className="peak__head">
            <span className="sc-label" data-sc-cue="0 0.14 0">
              {label}
            </span>
            <h2 className="sc-display sc-display--lg" data-sc-cue="0 0.14 0" data-sc-kinetic="lines">
              {headline}
            </h2>
            <p className="peak__tag fictional" data-sc-cue="0 0.14 0">
              {kennzeichen}
            </p>
          </div>

          <div className="demo-frame">
            <div className="demo-frame__bar" aria-hidden="true">
              <span className="demo-frame__dot" />
              <span className="demo-frame__dot" />
              <span className="demo-frame__dot" />
              <span className="demo-frame__url">{url}</span>
            </div>

            <div className="demo-frame__viewport">
              {/* Die absichtlich schlechte Fassung. Sie erbt ihre Schrift von
                  .demo-track--bad (Times New Roman): deshalb steht in
                  components/start/tokens.css eine Gegenregel gegen die
                  h1/h2/h3-Grundregel aus globals.css, die ihr sonst eine gut
                  gezeichnete Bildschirmserife unterschieben wuerde. */}
              <div className="demo-pane demo-pane--bad">
                <div className="demo-track demo-track--bad">
                  <div className="db-nav">{alt.nav}</div>
                  <div className="db-hero">
                    <h2>{alt.headline}</h2>
                    <p>{alt.unterzeile}</p>
                    <div className="db-phone">{alt.telefon}</div>
                  </div>
                  <div className="db-copy">
                    {alt.absatz1Vor}
                    <span className="db-link">{alt.absatz1Link}</span>
                    {alt.absatz1Nach}
                  </div>
                  <div className="db-block" aria-hidden="true" />
                  <div className="db-copy">{alt.absatz2}</div>
                  <div className="db-block" aria-hidden="true" />
                  <div className="db-foot">{alt.fuss}</div>
                </div>
                <span className="demo-status demo-status--bad">{alt.status}</span>
                {alt.marker.map((marker) => (
                  <span key={marker.text} className="demo-callout" data-checkpoint={marker.checkpoint}>
                    {marker.text}
                  </span>
                ))}
              </div>

              <div className="demo-pane demo-pane--good">
                <div className="demo-track demo-track--good">
                  <div className="dg-nav">
                    <strong>{neu.navMarke}</strong>
                    {neu.navLinks.map((eintrag) => (
                      <span key={eintrag}>{eintrag}</span>
                    ))}
                  </div>
                  {/* Der Kopf ist zweispaltig, und das ist keine Zierde. Der
                      Rahmen ist bis zu 928px breit, also ein Desktopfenster.
                      Die Fassung stand darin vorher einspaltig und mit
                      Textbreiten fuer ein Telefon: rechts blieben zwei Drittel
                      leer. Genau so sieht eine Seite aus, die nie fuer die
                      Breite gebaut wurde, auf der sie gerade laeuft, und das
                      ist der Vorwurf, den diese Demo widerlegen soll.
                      Naeheres bei .dg-hero in components/start/page.css. */}
                  <div className="dg-hero">
                    <div className="dg-hero__copy">
                      <h2>{neu.headline}</h2>
                      <p>{neu.unterzeile}</p>
                      {/* tabIndex -1 mit Absicht: der Knopf gehoert zu einer
                          gezeigten Website, nicht zu dieser hier. Waere er per
                          Tabulator erreichbar, liefe die Tastatur mitten in eine
                          Demo, deren Links nirgendwohin fuehren. */}
                      <a className="dg-cta" href="#" tabIndex={-1}>
                        {neu.ctaLabel}
                      </a>
                    </div>
                    {/* Vorher standen zwei leere .dg-block mitten in der Seite.
                        Ein leeres graues Rechteck ist in der NEU gebauten
                        Fassung das denkbar falscheste Bild: es ist genau das,
                        was eine unfertige Seite zeigt. Jetzt eine gezeichnete
                        Bildplatte an der Stelle, an der ein Kopfbild sitzt.
                        Reine Zeichnung, deshalb aria-hidden. */}
                    <div className="dg-plate" aria-hidden="true" />
                  </div>
                  <div className="dg-cols">
                    <div className="dg-copy">{neu.absatz1}</div>
                    <div className="dg-copy">{neu.absatz2}</div>
                  </div>
                  <div className="dg-foot">{neu.fuss}</div>
                </div>
                <span className="demo-status demo-status--good">{neu.status}</span>
                {neu.marker.map((marker) => (
                  <span key={marker.text} className="demo-callout" data-checkpoint={marker.checkpoint}>
                    {marker.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="peak__caption" data-sc-cue="0.58 0.94 0">
            {bildunterschrift}
          </p>
        </div>
      </div>
    </section>
  );
}
