import type { CSSProperties } from "react";
import { start } from "@/content/start";
import Reveal from "./reveal";

/**
 * FUSS. Vollflaechig Mint, bis an alle vier Kanten.
 *
 * DIE FARBE IST DER ABSCHLUSS. Die ganze Seite laeuft auf Papier, und genau
 * eine Flaeche bricht damit. Sie ist deshalb der letzte Eindruck und traegt
 * den letzten Satz. Schwarz darauf misst 15,98:1, es geht also nichts an
 * Lesbarkeit verloren, nur weil die Flaeche laut ist.
 *
 * Der Fokusring ist hier schwarz statt blau und ohne weisse Fuge: der
 * Untergrund ist bekannt und hell, die Fuge waere nur Unruhe. Die Regel steht
 * in start.css bei .st-fuss :focus-visible.
 *
 * DIE WORTMARKE UNTEN IST KEIN LINK UND KEINE UEBERSCHRIFT. Sie ist das
 * Signet am Ende. Als Ueberschrift stuende der Name ein drittes Mal in der
 * Gliederung, als Link fuehrte sie an eine Stelle, an der der Besucher
 * gerade steht.
 */
export default function StartFuss() {
  const { headline, kontakt, rechtliches, marke, copyright } = start.fuss;

  return (
    // id="kontakt" ist der Vertrag mit content/seite.ts: die Kopfleiste der
    // Unterseiten verlinkt ihren "Contact"-Eintrag auf /#kontakt, und dieses
    // Ziel ist der Kontaktblock der Startseite.
    <footer className="st-fuss" id="kontakt">
      <div className="st-wrap">
        <Reveal>
          <p className="st-h1 st-rise">
            {headline.map((zeile, i) => (
              <span
                key={zeile}
                className="st-rise__line"
                style={{ "--st-i": i } as CSSProperties}
              >
                <span>{zeile}</span>
              </span>
            ))}
          </p>
        </Reveal>

        <div className="st-fuss__cols">
          <div>
            <span className="st-fuss__label">{kontakt.label}</span>
            <ul className="st-fuss__list">
              <li>
                <a className="st-fuss__link" href={`mailto:${kontakt.mail}`}>
                  {kontakt.mail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="st-fuss__label">{rechtliches.label}</span>
            <ul className="st-fuss__list">
              {rechtliches.links.map((link) => (
                <li key={link.href}>
                  <a className="st-fuss__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Reveal className="st-wrap st-fuss__markwrap">
        <p className="st-fuss__mark">{marke}</p>
      </Reveal>

      <div className="st-wrap">
        <p className="st-fuss__copy">{copyright}</p>
      </div>
    </footer>
  );
}
