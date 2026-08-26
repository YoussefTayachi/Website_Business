import { start } from "@/content/start";
import { PfeilIcon, PlusIcon } from "./zeichnungen";

/**
 * Die Leiste der Startseite. Fixiert, ueber dem Inhalt, ohne eigene Flaeche.
 *
 * Drei Dinge, in genau dieser Ordnung: der eine CTA links, die Marke mittig,
 * ein rundes Plus rechts. Kein Menue: es ist ein One-Pager, das Plus springt
 * zum Werkabschnitt. Ein Overlay mit drei Punkten waere hier ein Versprechen
 * auf Seiten, die es nicht gibt.
 *
 * NICHT ZU VERWECHSELN mit components/chrome/kopfleiste.tsx. Die traegt die
 * deutschen Unterseiten samt Navigation und Nachtmodus-Schalter, und genau
 * deshalb bekommt die Startseite ihre eigene: zwei Kopfleisten im selben
 * Dokument waren der Grund fuer die Route Group (mit-chrome).
 *
 * Die Marke fuehrt auf dasselbe #top, das auch die Sprungmarke im
 * Wurzel-Layout anspringt. Ein zweites id waere ein zweiter Vertrag.
 */
export default function StartLeiste() {
  const { cta, marke, menu } = start.leiste;
  const { zielId } = start.sprungmarke;

  return (
    <header className="st-bar">
      <a className="st-pill" href={cta.href}>
        <span className="st-pill__arrow" aria-hidden="true">
          <PfeilIcon />
        </span>
        <span>{cta.label}</span>
      </a>

      <a className="st-bar__mark" href={`#${zielId}`}>
        {marke}
      </a>

      {/* Ein Icon ohne Beschriftung braucht einen Namen. Er kommt aus dem
          Text und ist derselbe, den ein Sehender als Linkziel erwartet. */}
      <a className="st-icon" href={menu.href} aria-label={menu.label}>
        <PlusIcon />
      </a>
    </header>
  );
}
