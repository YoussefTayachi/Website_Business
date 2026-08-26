import { start } from "@/content/start";

/**
 * Das globale 404. Es haengt am Wurzel-Layout und bekommt seit der Route
 * Group (mit-chrome) deshalb keine Kopfleiste und keinen Fuss: ein globales
 * 404 muss fuer JEDE Adresse greifen und kann darum nicht in die Gruppe
 * wandern.
 *
 * Der Text kommt aus start.notFound und ist englisch, wie das Wurzel-Layout
 * (lang="en"), unter dem diese Seite fuer alle Routen ausgeliefert wird.
 *
 * Das <main id="top"> steht hier, damit die Sprungmarke aus app/layout.tsx
 * auch auf dieser Seite ein Ziel hat.
 */
export default function NotFound() {
  const { title, ctaLabel } = start.notFound;

  return (
    <main id={start.sprungmarke.zielId} tabIndex={-1} className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-3xl">{title}</h1>
      <p className="mt-4">
        <a href="/">{ctaLabel}</a>
      </p>
    </main>
  );
}
