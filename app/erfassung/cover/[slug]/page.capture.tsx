/* ============================================================================
   ERFASSUNGSSEITE FUER DIE COVER. Zeigt das Cover genau eines Entwurfs
   (components/entwuerfe/cover.tsx), damit `scripts/aufnahmen.mjs` es als
   Bild fuer die Galerie abziehen kann.

   DIESE DATEI IST IN EINEM PRODUKTIONSBAU KEINE SEITE (Endung .capture.tsx,
   Begruendung in next.config.mjs). cover.css wird nur von hier importiert.

   Die Schriften der Entwuerfe kommen ausdruecklich mit: Wix Madefor laedt
   sonst nur die Startseite, und ein Cover in der Rueckfallschrift saehe
   nicht aus wie sein Entwurf.

   Aufnehmen:
       CAPTURE=1 npm run dev -- -p 3210
       node scripts/aufnahmen.mjs --nur cover-*
   ========================================================================== */

import "@fontsource-variable/wix-madefor-display";
import "@fontsource-variable/wix-madefor-text";
import "@/components/entwuerfe/cover.css";

import { notFound } from "next/navigation";

import EntwurfCover from "@/components/entwuerfe/cover";
import { entwurfNach } from "@/content/entwuerfe";

export default async function Erfassung({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = entwurfNach(slug);
  if (!e) notFound();

  return (
    <div data-erfassung={`cover-${slug}`}>
      <EntwurfCover e={e} />
    </div>
  );
}
