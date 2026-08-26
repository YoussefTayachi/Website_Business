import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";
import { PfeilIcon } from "./zeichnungen";

/**
 * LEISTUNGEN. Vier nummerierte Punkte, getrennt von Haarlinien.
 *
 * KEINE KARTEN UND KEINE ICONS. Vier Kaesten nebeneinander waeren vier gleich
 * laute Dinge; die Nummer traegt die Struktur bereits, und der Titel darf
 * dadurch so gross werden, dass er allein aus dem Augenwinkel funktioniert.
 *
 * Die Haarlinien ziehen beim Sichtbarwerden von links auf, nacheinander. Sie
 * sind Pseudoelemente und keine border, weil eine border das nicht kann. Der
 * Abschluss unter dem letzten Punkt haengt an der Liste selbst und zieht
 * nicht mit: zwei laufende Linien an derselben Stelle waeren Unruhe.
 *
 * <ol>, nicht <ul>: die Punkte sind nummeriert, und die Nummer steht im Text.
 * list-style ist abgeschaltet, weil die Nummer sichtbar als eigenes Element
 * gesetzt wird und ein Screenreader sie sonst zweimal bekaeme.
 */
export default function StartLeistungen() {
  const { titel, punkte, link } = start.leistungen;

  return (
    <section className="st-svc-sec st-wrap">
      <Reveal>
        <h2 className="st-h2 st-rise">
          <span className="st-rise__line">
            <span>{titel}</span>
          </span>
        </h2>
      </Reveal>

      <Reveal as="ol" className="st-svc">
        {punkte.map((punkt, i) => (
          <li
            key={punkt.nr}
            className="st-svc__row"
            style={{ "--st-i": i } as CSSProperties}
          >
            <span className="st-svc__nr">{punkt.nr}</span>
            <h3 className="st-h3 st-svc__title">{punkt.titel}</h3>
            <p className="st-svc__text">{punkt.text}</p>
          </li>
        ))}
      </Reveal>

      <p className="st-svc__more">
        <a className="st-arrowlink" href={link.href}>
          {link.label}
          <PfeilIcon />
        </a>
      </p>
    </section>
  );
}
