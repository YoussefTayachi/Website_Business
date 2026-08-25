import { start } from "@/content/start";

/**
 * AKT 1, HERO. data-sc-act="pin", Spanne 1,6 Bildschirme.
 *
 * Die Buehne bleibt stehen, waehrend das Standbild von einer Irisblende
 * geoeffnet wird (data-sc-reveal="iris") und die Schlagzeile zeilenweise
 * gesetzt wird (data-sc-kinetic="lines"). Kein Video: die Begruendung steht im
 * Budgetabschnitt von scrollcraft/builds/casefile/BRIEF.md.
 *
 * JEDES data-sc-Attribut hier ist Mechanik, kein Schmuck. Die Engine
 * (public/scrollcraft/scrollcraft.js) sucht genau diese Struktur:
 * Akt -> [data-sc-stage] -> Inhalt. Wer eine Ebene einzieht oder wegnimmt,
 * bricht den Pin.
 *
 * Das Bild bewusst als schlichtes <img> und nicht als next/image: die
 * Irisblende der Engine haengt an der <figure> als unmittelbarem Traeger, und
 * ein zusaetzlicher Wrapper samt srcset bringt bei einem bildschirmfuellenden
 * Standbild nichts. width und height stehen als Attribute drin, damit beim
 * Laden nichts springt.
 */
export default function AktHero() {
  const { label, headline, lede, bildAlt } = start.hero;

  return (
    <section className="hero" data-sc-act="pin" data-sc-span="1.6" data-sc-drift="#0A0B0D">
      <div data-sc-stage="">
        <figure className="hero__figure" data-sc-reveal="iris" data-sc-reveal-at="0.02 0.4">
          <img
            src="/scrollcraft/hero.webp"
            width={2000}
            height={1112}
            alt={bildAlt}
            loading="eager"
            fetchPriority="high"
          />
        </figure>

        {/* Der Verlauf, der die Schrift vom Bild abhebt. Gemessen im Build:
            ohne ihn kam die Schlagzeile ueber den hellsten Tasten auf 4,47:1,
            also knapp unter die 4,5:1 fuer Fliesstext. Die verstaerkte Fassung
            steht in components/start/page.css unter .hero .sc-scrim--lead. */}
        <div className="sc-scrim sc-scrim--lead" aria-hidden="true" />

        <div className="hero__copy sc-copy sc-copy--lead" data-sc-cue="0 0.85 0">
          <span className="sc-label">{label}</span>
          <h1 className="sc-display sc-display--xl" data-sc-kinetic="lines">
            {headline}
          </h1>
          <p className="sc-body hero__lede">{lede}</p>
        </div>
      </div>
    </section>
  );
}
