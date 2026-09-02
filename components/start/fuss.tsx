import Marke from "./marke";
import { start } from "@/content/start";

/**
 * Der Fuss. Bewusst wenig Text: was hier steht, steht hier, weil es
 * rechtlich stehen muss (Impressum, Datenschutz) und weil eine Seite ohne
 * Fuss abgeschnitten aussieht.
 *
 * SEIT DEM 2026-09-02 MIT GROSSER WORTMARKE. Ueber der Zeile mit den Links
 * steht der Markenname in Riesengroesse, in der Farbe der Haarlinie, und
 * fuellt sich beim Ueberfahren mit dem Akzent. Das ist der Fuss, den auf
 * godly.design unter "Footer" fast jede Seite hat, und er kostet kein
 * einziges neues Wort: der Name steht ohnehin hier. Er ist aria-hidden,
 * weil die Wortmarke daneben ihn schon vorliest.
 *
 * Der Weg nach oben ist ein Anker auf #top, kein Skript: der Browser kann
 * das, und mit scroll-behavior: smooth sieht es gleich aus.
 */
export default function StartFuss() {
  const { kontaktLabel, mail, rechtLinks, copyright, nachOben } = start.fuss;

  return (
    <footer className="st-fuss">
      <div className="st-wrap">
        <p className="st-fuss__gross" aria-hidden="true">
          {start.leiste.marke}
        </p>

        <div className="st-fuss__in">
          {/* Die vollstaendige Wortmarke. Sie steht hier, weil die Kopfleiste
              auf dem Telefon nur "frostbreaker" traegt: der Zusatz passt dort
              neben die Modus-Gruppe nicht mehr (nachgerechnet in start.css).
              So steht der volle Name auf jeder Breite genau einmal. */}
          <Marke inFuss />

          <ul className="st-fuss__links">
            <li>
              {kontaktLabel}: <a href={`mailto:${mail}`}>{mail}</a>
            </li>
            {rechtLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <p className="st-fuss__rechts">
            <a className="st-fuss__oben" href="#top">
              {nachOben}
              <span aria-hidden="true">↑</span>
            </a>
            <span>{copyright}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
