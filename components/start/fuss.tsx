import { start } from "@/content/start";

/**
 * Der Fuss des Ausschnitts. Bewusst klein: der eigentliche Schlussblock mit
 * dem letzten Handlungsaufruf gehoert zu den Flaechen, die nach der Abnahme
 * dazukommen. Was hier steht, steht hier, weil es rechtlich stehen muss
 * (Impressum, Datenschutz) und weil eine Seite ohne Fuss abgeschnitten
 * aussieht.
 *
 * Der mintgruene Riesenfuss der Vorgaengerfassung ist entfallen. Er gehoerte
 * zum designatives-Klon und nicht zu dieser Marke.
 */
export default function StartFuss() {
  const { kontaktLabel, mail, rechtLinks, copyright } = start.fuss;

  return (
    <footer className="st-fuss">
      <div className="st-wrap st-fuss__in">
        {/* Die vollstaendige Wortmarke. Sie steht hier, weil die Kopfleiste
            auf dem Telefon nur "frostbreaker" traegt: der Zusatz passt dort
            neben die Modus-Gruppe nicht mehr (nachgerechnet in start.css).
            So steht der volle Name auf jeder Breite genau einmal. */}
        <p className="st-fuss__marke">
          {start.leiste.marke}
          <span className="st-fuss__marke-zusatz">{start.leiste.markeZusatz}</span>
        </p>

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

        <p>{copyright}</p>
      </div>
    </footer>
  );
}
