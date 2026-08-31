/* ============================================================================
   DIE STARTSEITE. Abnahme-Ausschnitt: Kopfleiste, Hero, Beweisstreifen, ein
   Fall, Fuss. Die uebrigen Flaechen (Problem, Vorgehen, Wer die Arbeit macht,
   Schluss) kommen nach der Abnahme dazu.

   WARUM DIE SCHRIFT- UND STYLESHEET-IMPORTE HIER STEHEN UND NICHT IM LAYOUT,
   und das ist der heikelste Punkt der ganzen Seite:

   1. components/start/start.css setzt Regeln auf .st-page und nimmt
      Grundregeln aus app/globals.css zurueck (Schriftfamilie,
      Silbentrennung). Stuende die Datei in app/layout.tsx, traefe das
      /impressum und /datenschutz mit.
   2. Wix Madefor braucht NUR diese Route. Die deutschen
      Rechtsseiten laufen weiter auf Inter und Newsreader, und die kommen
      aus dem Wurzel-Layout. Wer die neuen Schriften dorthin zieht, nimmt
      den Rechtsseiten ihre eigene und laedt auf jeder Route vier Familien
      statt zwei.

   Genau an dieser Stelle stand vorher Archivo, aus demselben Grund.

   DIE REIHENFOLGE IST BEDINGUNG:
     app/globals.css (aus dem Layout, bringt die Farbtokens)
       -> start.css  (Layout und Gegenregeln, braucht die Tokens)

   ALLE KLASSEN DIESER SEITE TRAGEN DAS PRAEFIX .st-. Eine frueherer Fassung
   benutzte generische Namen und faerbte damit die Rechtsseiten ein.
   ========================================================================== */

import "@fontsource-variable/wix-madefor-display";
import "@fontsource-variable/wix-madefor-text";
import "@/components/start/start.css";

import type { Metadata } from "next";

import StartAblauf from "@/components/start/ablauf";
import StartBeweis from "@/components/start/beweis";
import StartFuss from "@/components/start/fuss";
import StartGalerie from "@/components/start/galerie";
import StartGegenueber from "@/components/start/gegenueber";
import StartHero from "@/components/start/hero";
import StartLeiste from "@/components/start/leiste";
import StartPerson from "@/components/start/person";
import StartSchluss from "@/components/start/schluss";
import { start } from "@/content/start";

// Der Titel der Startseite darf die Marke nicht noch einmal angehaengt
// bekommen (app/layout.tsx haengt sie per template an jeden
// Unterseitentitel). `absolute` schaltet das Template fuer diese Seite ab.
export const metadata: Metadata = {
  title: { absolute: start.meta.title },
  description: start.meta.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="st-page">
      <StartLeiste />

      {/* id="top" ist das Ziel der Sprungmarke aus app/layout.tsx UND das
          Ziel der Wortmarke in der Leiste. Das Gegenstueck fuer die
          deutschen Unterseiten steht in app/(mit-chrome)/layout.tsx und
          traegt dasselbe id, damit die Sprungmarke auf jeder Route ein Ziel
          hat. */}
      {/* DIE REIHENFOLGE IST DAS ARGUMENT, nicht nur eine Anordnung:
          1. Hero      was ich mache
          2. Beweis    wer ich bin, nachpruefbar
          3. Galerie   was moeglich ist, gezeigt statt beschrieben
          4. Vergleich warum es sich lohnt
          5. Ablauf    was auf dich zukommt
          6. Person    wer das macht, mit Gesicht
          7. Schluss   die Frage
          Die Galerie steht VOR dem Vergleich: "was ist moeglich" kommt vor
          "warum sollte ich", weil die zweite Frage sich erst stellt, wenn
          die erste beantwortet ist. */}
      <main id={start.sprungmarke.zielId}>
        <StartHero />
        <StartBeweis />
        <StartGalerie />
        <StartGegenueber />
        <StartAblauf />
        <StartPerson />
        <StartSchluss />
      </main>

      <StartFuss />
    </div>
  );
}
