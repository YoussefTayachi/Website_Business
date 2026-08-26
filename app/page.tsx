/* ============================================================================
   DIE STARTSEITE. Ein heller Portfolio-One-Pager.

   WARUM DIE STYLESHEET-IMPORTE HIER STEHEN UND NICHT IM LAYOUT, und das ist
   der heikelste Punkt der ganzen Seite: components/start/start.css setzt
   Regeln auf html und body und nimmt mehrere Grundregeln aus
   app/globals.css zurueck (Schrift, Silbentrennung, Fokusfarbe,
   Bildlaufleiste). Stuende auch nur eine der beiden Dateien in
   app/layout.tsx, traefe das /impressum, /datenschutz und /arbeit/[slug]
   mit. Als Import aus DIESEM Modul legt Next sie in das CSS-Buendel genau
   dieser Route.

   DIE REIHENFOLGE IST BEDINGUNG:
     app/globals.css  (aus app/layout.tsx, kommt vor der Seite)
       -> tokens.css   Farbe, Schrift, Groesse, Rhythmus, Kurven
       -> start.css    das Layout und die Gegenregeln, braucht die Tokens
   Beide Dateien sind ungeschichtet und schlagen damit die @layer-Regeln von
   Tailwind, unabhaengig von ihrer Position im Dokument. Innerhalb der
   ungeschichteten Regeln entscheidet die Reihenfolge.

   ALLE KLASSEN DIESER SEITE TRAGEN DAS PRAEFIX .st-. Die Vorgaengerfassung
   benutzte generische Namen (.hero, .cta, .step, .foot) und faerbte damit
   das Impressum ein. Mit Praefix ist der Fehler strukturell erledigt.

   ARCHIVO KOMMT EBENFALLS VON HIER und nicht aus dem Layout: die deutschen
   Unterseiten laufen weiter auf Inter und Newsreader und sollen keine
   Schrift laden, die sie nicht setzen.
   ========================================================================== */

import "@fontsource-variable/archivo";
import "@/components/start/tokens.css";
import "@/components/start/start.css";

import type { Metadata } from "next";
import StartLeiste from "@/components/start/leiste";
import StartHero from "@/components/start/hero";
import StartStatement from "@/components/start/statement";
import StartLeistungen from "@/components/start/leistungen";
import StartArbeiten from "@/components/start/arbeiten";
import StartUeber from "@/components/start/ueber";
import StartFuss from "@/components/start/fuss";
import { start } from "@/content/start";

// Der Titel der Startseite darf die Marke nicht noch einmal angehaengt
// bekommen (app/layout.tsx haengt sie per template an jeden Unterseitentitel).
// `absolute` schaltet das Template fuer diese eine Seite ab.
export const metadata: Metadata = {
  title: { absolute: start.meta.title },
  description: start.meta.description,
};

export default function Home() {
  return (
    // .st-page haelt zwei Dinge zusammen: den Platz fuer die fixierte Leiste
    // und das Beschneiden nach den Seiten. Die Riesentypografie laeuft in
    // schmalen Fenstern gern ueber den Rand, und die Seite selbst darf nie
    // waagerecht scrollen.
    <div className="st-page">
      <StartLeiste />

      {/* id="top" ist das Ziel der Sprungmarke aus app/layout.tsx UND das
          Ziel der Wortmarke in der Leiste. Das Gegenstueck fuer die deutschen
          Unterseiten steht in app/(mit-chrome)/layout.tsx und traegt dasselbe
          id, damit die Sprungmarke auf jeder Route ein Ziel hat. */}
      <main id="top">
        <StartHero />
        <StartStatement />
        <StartLeistungen />
        <StartArbeiten />
        <StartUeber />
      </main>

      <StartFuss />
    </div>
  );
}
