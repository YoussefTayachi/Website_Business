/* ============================================================================
   DIE STARTSEITE. Neun Akte, die beim Scrollen ablaufen.

   WARUM DIE IMPORTE HIER STEHEN UND NICHT IM LAYOUT, und das ist der heikelste
   Punkt der ganzen Seite: components/start/page.css benutzt sehr allgemeine
   Klassennamen (.hero, .cta, .step, .foot, .rail), und
   components/start/scrollcraft.css setzt Grundregeln auf html, body, * und
   :root. Stuende auch nur eine dieser Dateien in app/layout.tsx, faerbte sie
   /impressum, /datenschutz und /arbeit/[slug] mit ein. Als Import aus DIESEM
   Modul legt Next sie in das CSS-Buendel genau dieser Route.

   DIE REIHENFOLGE IST BEDINGUNG:
     app/globals.css  (aus app/layout.tsx, kommt vor der Seite)
       -> scrollcraft.css   Grundregeln der Engine, gewinnt ueber globals
       -> page.css          die Stile dieser Seite
       -> tokens.css        Marke und die Gegenregeln gegen globals
   Alles davon ist ungeschichtet und schlaegt damit die @layer-Regeln von
   Tailwind, unabhaengig von der Position im Dokument. Innerhalb der
   ungeschichteten Regeln entscheidet die Reihenfolge, deshalb steht tokens.css
   zuletzt.

   Die Schriften der Startseite kommen ebenfalls von hier und nicht aus dem
   Layout: Fraunces und Archivo braucht nur diese Seite, die deutschen
   Unterseiten laufen weiter auf Inter und Newsreader.
   ========================================================================== */

// Fraunces: der Einstieg opsz.css statt index.css, damit die Schrift ihre
// optische Achse traegt (dasselbe Muster wie bei Newsreader in
// app/layout.tsx). Die kursive Fassung wird gebraucht, siehe .befund__close
// und .hinge p in components/start/page.css.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/archivo";
import "@/components/start/scrollcraft.css";
import "@/components/start/page.css";
import "@/components/start/tokens.css";

import type { Metadata } from "next";
import StartLeiste from "@/components/start/leiste";
import AktHero from "@/components/start/akt-1-hero";
import AktBefund from "@/components/start/akt-2-befund";
import AktScharnier from "@/components/start/akt-3-scharnier";
import AktVergleich from "@/components/start/akt-4-vergleich";
import AktWeitereFaelle from "@/components/start/akt-5-weitere-faelle";
import AktLeistungen from "@/components/start/akt-6-leistungen";
import AktProzess from "@/components/start/akt-7-prozess";
import AktUeber from "@/components/start/akt-8-ueber";
import AktKontakt from "@/components/start/akt-9-kontakt";
import StartSkripte from "@/components/start/skripte";
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
    <>
      {/* Der Fortschrittsbalken der Engine. Muss VOR den Akten stehen: die
          Engine sucht ihn mit querySelector unter der Mount-Wurzel, und der
          Balken selbst liegt fixiert am oberen Rand. */}
      <span data-sc-progress="" />
      <div className="sc-grain" aria-hidden="true" />

      <StartLeiste />

      {/* id="top" ist das Ziel der Sprungmarke aus app/layout.tsx UND das Ziel
          der Wortmarke in der Leiste. Das Gegenstueck fuer die deutschen
          Unterseiten steht in app/(mit-chrome)/layout.tsx und traegt dasselbe
          id, damit die Sprungmarke auf jeder Route ein Ziel hat. */}
      <main id="top">
        <AktHero />
        <AktBefund />
        <AktScharnier />
        <AktVergleich />
        <AktWeitereFaelle />
        <AktLeistungen />
        <AktProzess />
        <AktUeber />
        <AktKontakt />
      </main>

      <StartSkripte />
    </>
  );
}
