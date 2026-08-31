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
