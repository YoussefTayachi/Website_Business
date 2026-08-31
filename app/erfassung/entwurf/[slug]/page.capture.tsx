/* ============================================================================
   ERFASSUNGSSEITE FUER DIE ENTWUERFE. Zeigt genau eine Gestaltung, ohne
   Kopfleiste und ohne Fuss der Portfolio-Seite, damit
   `scripts/aufnahmen.mjs` sie als Bild abziehen kann.

   DIESE DATEI IST IN EINEM PRODUKTIONSBAU KEINE SEITE. Die Endung
   `.capture.tsx` steht nur in `pageExtensions`, wenn CAPTURE=1 gesetzt ist
   (Begruendung in next.config.mjs). Aus demselben Grund wird auch
   `entwurf.css` nur von hier importiert und landet nie im Buendel der
   Startseite.

   Aufnehmen:
       CAPTURE=1 npm run dev -- -p 3210
       node scripts/aufnahmen.mjs
   ========================================================================== */

import "@/components/entwuerfe/entwurf.css";

import { notFound } from "next/navigation";

import EntwurfSeite from "@/components/entwuerfe/entwurf";
import { entwurfNach } from "@/content/entwuerfe";

export default async function Erfassung({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = entwurfNach(slug);
  if (!e) notFound();

  // data-erfassung ist der Haken, an dem das Aufnahmeskript erkennt, dass die
  // Seite fertig aufgebaut ist. Es wartet darauf, statt auf eine feste
  // Zeitspanne.
  return (
    <div data-erfassung={`entwurf-${slug}`}>
      <EntwurfSeite e={e} />
    </div>
  );
}
