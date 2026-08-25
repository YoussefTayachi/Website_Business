import { start } from "@/content/start";

/**
 * AKT 8, UEBER. data-sc-act="flow".
 *
 * Erste Person, kein Team, kein Stockfoto. Das Standbild zeigt Werkzeug auf
 * einem Tisch und bewusst kein gestelltes Portrait: ein erfundenes oder
 * gekauftes Gesicht waere auf einer Seite, die mit Ehrlichkeit argumentiert,
 * der teuerste moegliche Fehler.
 *
 * Das Bild laedt lazy, im Gegensatz zum Hero: es steht acht Akte tief in der
 * Seite und ist beim ersten Bild garantiert nicht zu sehen.
 */
export default function AktUeber() {
  const { label, bildAlt, absaetze } = start.ueber;

  return (
    <section className="sc-section about tight" data-sc-act="flow" data-sc-drift="#0D0E11">
      <div className="sc-wrap about__wrap">
        <figure className="about__figure" data-sc-in="">
          <img src="/scrollcraft/about.webp" width={1600} height={888} alt={bildAlt} loading="lazy" />
        </figure>

        <div className="about__copy sc-stack" data-sc-in="" data-sc-stagger="80">
          <span className="sc-label">{label}</span>
          {absaetze.map((absatz) => (
            <p key={absatz}>{absatz}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
