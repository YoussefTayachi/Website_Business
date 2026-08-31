/* ============================================================================
   ERFASSUNGSSEITE. Zeigt genau eine Demo-Fassung, ohne Kopfleiste, ohne Fuss,
   ohne Erklaerung, damit `scripts/aufnahmen.mjs` sie als Bild abziehen kann.

   DIESE DATEI IST IN EINEM PRODUKTIONSBAU KEINE SEITE. Die Endung
   `.capture.tsx` steht nur dann in `pageExtensions`, wenn CAPTURE=1 gesetzt
   ist (Begruendung ausfuehrlich in next.config.mjs). Ohne die Umgebungsvariable
   ist das hier fuer Next eine gewoehnliche Datei ohne Bedeutung. Deshalb
   braucht es hier auch kein notFound() und kein Flag, das jemand vergessen
   koennte.

   Aufnehmen:
       CAPTURE=1 npm run dev -- -p 3200
       node scripts/aufnahmen.mjs

   Die alten Fassungen kommen in die Huelle `.alt-fassung`, weil sie ihre
   Stile aus dieser Insel beziehen und sie selbst nicht mitbringen (dieselbe
   Aufgabe erfuellt sonst components/showcase/vorher-nachher.tsx). Die neuen
   Fassungen bringen ihre Zone `.neu-fassung` selbst mit.
   ========================================================================== */

import { notFound } from "next/navigation";

import { BefundProvider } from "@/components/showcase/befund-marker";
import BauMustergrundAlt from "@/components/showcase/demos/bau-mustergrund-alt";
import BauMustergrundNeu from "@/components/showcase/demos/bau-mustergrund-neu";
import DachMusterhoeheAlt from "@/components/showcase/demos/dach-musterhoehe-alt";
import DachMusterhoeheNeu from "@/components/showcase/demos/dach-musterhoehe-neu";
import ElektroMusterhausAlt from "@/components/showcase/demos/elektro-musterhaus-alt";
import ElektroMusterhausNeu from "@/components/showcase/demos/elektro-musterhaus-neu";

/** Die Bezeichner sind zugleich die Dateinamen der Aufnahmen. */
const FAELLE = {
  "elektro-alt": { Komponente: ElektroMusterhausAlt, alt: true },
  "elektro-neu": { Komponente: ElektroMusterhausNeu, alt: false },
  "bau-alt": { Komponente: BauMustergrundAlt, alt: true },
  "bau-neu": { Komponente: BauMustergrundNeu, alt: false },
  "dach-alt": { Komponente: DachMusterhoeheAlt, alt: true },
  "dach-neu": { Komponente: DachMusterhoeheNeu, alt: false },
} as const;

type Fall = keyof typeof FAELLE;

export default async function Erfassung({ params }: { params: Promise<{ fall: string }> }) {
  const { fall } = await params;
  const eintrag = FAELLE[fall as Fall];
  if (!eintrag) notFound();

  const { Komponente, alt } = eintrag;

  return (
    // data-erfassung ist der Haken, an dem das Aufnahmeskript erkennt, dass
    // die Seite fertig aufgebaut ist. Es wartet darauf, statt auf eine feste
    // Zeitspanne: eine Zahl waere auf einem langsamen Lauf zu kurz und auf
    // einem schnellen verschenkte Zeit.
    // KEIN min-h-screen. Die Telefonaufnahme laeuft als Vollbild, und mit
    // einer erzwungenen Mindesthoehe waere die Datei so hoch wie das
    // Aufnahmefenster statt so hoch wie die Seite. Im Geraeterahmen wanderte
    // dann eine halbe Bildschirmhoehe leere Flaeche durchs Bild.
    <div data-erfassung={fall} className="bg-paper">
      {alt ? (
        // Die alten Fassungen tragen BefundAnker, und die brauchen einen
        // Provider ueber sich. Er bekommt hier eine LEERE Befundliste:
        // BefundAnker gibt dann null zurueck, und die Aufnahme zeigt die
        // schlechte Seite so, wie ein Besucher sie saehe, ohne Marker und
        // ohne Erklaerebene. Genau das ist das Vorher-Bild.
        <BefundProvider findings={[]} sichtbar={false}>
          <div className="alt-fassung">
            <Komponente />
          </div>
        </BefundProvider>
      ) : (
        <Komponente />
      )}
    </div>
  );
}
