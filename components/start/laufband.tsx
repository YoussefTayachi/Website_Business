import { start } from "@/content/start";

/**
 * DAS LAUFBAND. Die sechs Gewerke der Galerie, in einer Zeile, die langsam
 * nach links laeuft und beim Ueberfahren stehen bleibt.
 *
 * WARUM: der Betrieb, der aus der Mail kommt, will in einer Sekunde wissen,
 * ob er gemeint ist. Sechs Gewerke, die vorbeiziehen, beantworten das ohne
 * einen Satz. Es ist die "Logo-Leiste" von godly.design, nur mit Gewerken
 * statt mit Kundenlogos, die es hier nicht gibt.
 *
 * DIE LISTE STEHT ZWEIMAL IM MARKUP, und das ist der ganze Trick: die
 * Animation schiebt die Spur um genau die Haelfte, und in dem Moment sieht
 * das Bild aus wie am Anfang. Die zweite Haelfte ist aria-hidden, sonst
 * liest ein Vorleser zwoelf Gewerke.
 *
 * KEINE NEUEN WOERTER: die Namen kommen aus galerie.karten.
 */
export default function Laufband() {
  const gewerke = start.galerie.karten.map((k) => k.art);
  const spur = (versteckt: boolean) => (
    <ul className="st-band__spur" {...(versteckt ? { "aria-hidden": "true" } : {})}>
      {gewerke.map((g) => (
        <li key={g}>
          {g}
          <span className="st-band__punkt" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="st-band" aria-label={start.beweis.laufband}>
      {spur(false)}
      {spur(true)}
    </div>
  );
}
