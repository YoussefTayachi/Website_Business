import Link from "next/link";

// GERUEST. Text und Gestaltung folgen in Zug 2 bzw. Zug 3.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-3xl">Diese Seite gibt es nicht.</h1>
      <p className="mt-4">
        <Link href="/">Zurück zur Startseite</Link>
      </p>
    </div>
  );
}
