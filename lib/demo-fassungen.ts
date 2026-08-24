/**
 * Die Zuordnung Slug -> gebaute Demo-Fassung.
 *
 * Die sechs Fassungen selbst (drei alt, drei neu) liegen unter
 * components/showcase/demos/ und gehoeren dem ui-designer (Zug 2b im PLAN.md).
 * Sie exportieren jeweils eine Komponente ohne Props als Default und holen
 * ihre Texte selbst aus content/projekte.ts.
 *
 * Warum diese Datei ueberhaupt existiert: die Fallstudienseite und die
 * Showcase-Sektion brauchen die Fassungen als Wert und nicht als Dateinamen.
 * Ein Import ueber einen zusammengesetzten Pfad ("...demos/" + slug) waere
 * bequemer, verliert aber jede Typpruefung und faellt erst zur Laufzeit auf,
 * wenn ein Slug und ein Dateiname auseinanderlaufen. Diese Tabelle faellt
 * dagegen beim Bauen auf.
 *
 * EINTRAGEN, sobald eine Fassung gebaut ist. Zwei Zeilen je Projekt, oben der
 * Import, unten der Eintrag:
 *
 *   import ElektroAlt from "@/components/showcase/demos/elektro-musterhaus-alt";
 *   import ElektroNeu from "@/components/showcase/demos/elektro-musterhaus-neu";
 *   ...
 *   "elektro-musterhaus": { alt: ElektroAlt, neu: ElektroNeu },
 *
 * Solange ein Eintrag null ist, zeigt die Seite an dieser Stelle einen
 * sichtbaren Hinweis statt einer leeren Flaeche. Ein stiller Leerraum waere
 * auf genau der Seite, die Sorgfalt beweisen soll, das falsche Signal.
 */
import type { ComponentType } from "react";
import type { ProjektSlug } from "@/content/projekte";

import ElektroAlt from "@/components/showcase/demos/elektro-musterhaus-alt";
import ElektroNeu from "@/components/showcase/demos/elektro-musterhaus-neu";
import BauAlt from "@/components/showcase/demos/bau-mustergrund-alt";
import BauNeu from "@/components/showcase/demos/bau-mustergrund-neu";
import DachAlt from "@/components/showcase/demos/dach-musterhoehe-alt";
import DachNeu from "@/components/showcase/demos/dach-musterhoehe-neu";

export type DemoFassungen = {
  alt: ComponentType | null;
  neu: ComponentType | null;
};

export const demoFassungen: Record<ProjektSlug, DemoFassungen> = {
  "elektro-musterhaus": { alt: ElektroAlt, neu: ElektroNeu },
  "bau-mustergrund": { alt: BauAlt, neu: BauNeu },
  "dach-musterhoehe": { alt: DachAlt, neu: DachNeu },
};

/** true, wenn beide Fassungen eines Projekts gebaut sind. */
export function fassungenVollstaendig(slug: ProjektSlug): boolean {
  const eintrag = demoFassungen[slug];
  return eintrag.alt !== null && eintrag.neu !== null;
}
