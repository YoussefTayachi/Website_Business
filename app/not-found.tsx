import { start } from "@/content/start";

/**
 * GERUEST. Text und Gestaltung folgen.
 *
 * Diese Datei haengt am Wurzel-Layout und bekommt seit der Route Group
 * (mit-chrome) deshalb keine Kopfleiste und keinen Fuss mehr. Das ist der
 * bewusst in Kauf genommene Preis dafuer, dass die Startseite ihre eigene
 * Chrome mitbringen kann; ein globales 404 muss aber weiterhin fuer JEDE
 * Adresse greifen und kann darum nicht in die Gruppe wandern.
 *
 * Das <main id="top"> steht hier, damit die Sprungmarke aus app/layout.tsx
 * auch auf dieser Seite ein Ziel hat.
 *
 * Der Weg zurueck ist bewusst ein <a> und kein <Link>: die Startseite wird
 * von zwei Skripten ausserhalb von React getragen und braucht einen
 * vollstaendigen Seitenaufbau (ausfuehrlich in
 * components/chrome/kopfleiste.tsx).
 */
export default function NotFound() {
  return (
    <main id={start.sprungmarke.zielId} tabIndex={-1} className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-3xl">Diese Seite gibt es nicht.</h1>
      <p className="mt-4">
        <a href="/">Zurück zur Startseite</a>
      </p>
    </main>
  );
}
