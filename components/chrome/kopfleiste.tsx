"use client";
import { useEffect, useState } from "react";
import { seite } from "@/content/seite";
import ThemeToggle from "./nachtmodus-schalter";

/**
 * Kopfleiste.
 *
 * Bewusst nur zwei Ankerlinks. Der Grund steht in content/seite.ts und in
 * PLAN.md Abschnitt 1: ein Kaltklick liest eine Bahn, kein Menue. Die zwei
 * Spruenge sind der Beweis (Vergleich) und der naechste Schritt (Kontakt).
 *
 * DIE HOEHE IST EIN VERTRAG. Die Leiste misst immer genau --header-h aus
 * globals.css, in beiden Zustaenden. Zwei Dinge rechnen mit diesem Wert:
 * scroll-padding-top fuer Ankerspruenge und der Schiebergriff in
 * components/showcase/vorher-nachher.tsx, der sich daran festhaelt. Deshalb
 * schrumpft die Leiste beim Scrollen NICHT. Eine schrumpfende Leiste ist
 * ausserdem eine, die waehrend des Scrollens den ganzen Text darunter um ein
 * paar Pixel nach oben zieht, und genau das ist das Flackern, das hier nicht
 * vorkommen soll.
 *
 * Was sich stattdessen aendert, ist die Flaeche: oben auf der Seite liegt die
 * Leiste AUF dem Papier (durchsichtig, das Haarlinienraster des Hero
 * scheint hindurch), ab 24 Pixel Scroll liegt sie UEBER dem Text (Papierton
 * deckend, darunter eine Haarlinie). Das ist der laufende Kolumnentitel einer
 * Publikation: der Text verschwindet sauber an einer Linie statt unter einer
 * Milchglasscheibe. Ueberblendet wird ausschliesslich opacity, es bewegt sich
 * also nichts im Layout.
 */
export default function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const { marke, ankerlinks } = seite.kopfleiste;

  useEffect(() => {
    // Einmal beim Laden auswerten: wer mit einem Anker in der Adresse
    // ankommt oder die Seite neu laedt, steht sofort mitten im Dokument.
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact ? "true" : "false"}
      className="group/kopf sticky top-0 z-40 h-[var(--header-h)] w-full"
    >
      {/* Die Flaeche. Eigene Ebene, damit nur ihre Deckkraft laeuft und weder
          Farbe noch Rahmen des Inhalts daran haengen. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-line2 bg-paper opacity-0 transition-opacity duration-[var(--d-mid)] group-data-[compact=true]/kopf:opacity-100"
      />

      {/* relative, damit die Zeile ueber der Flaeche liegt: beide sind
          positioniert, also entscheidet die Reihenfolge im Dokument. */}
      <div className="relative mx-auto flex h-full max-w-page items-center gap-3 px-gutter sm:gap-6">
        {/* Die Wortmarke in der Displayschrift. Sie ist das einzige Stueck
            Serif in der Chrome und damit die Klammer zum Hero.
            min-w-0 und truncate sind die Notbremse fuer sehr schmale Geraete:
            bei 390 Pixeln (Zielbreite) passt die Zeile mit rund 50 Pixeln
            Luft, darunter gibt die Marke nach, statt die Leiste zu sprengen. */}
        {/* Bewusst ein <a> und kein <Link>: jeder Weg zurueck zur Startseite
            muss ein vollstaendiger Seitenaufbau sein. Die Startseite wird von
            zwei Skripten ausserhalb von React getragen
            (public/scrollcraft/scrollcraft.js und page.js). Bei einem
            Client-Wechsel liegen beide im Cache und laufen nicht erneut: die
            Engine bliebe an das alte, inzwischen verworfene DOM gebunden, und
            der Signature Move in Akt 4 waere tot. Dasselbe gilt fuer die zwei
            Ankerlinks darunter. */}
        <a
          href="/"
          className="min-w-0 truncate font-display text-small text-ink transition-colors hover:text-accent sm:text-body"
        >
          {marke}
        </a>

        {/* TODO(inhalt): "Hauptnavigation" ist der letzte hartcodierte
            sichtbare Text dieser Datei. Er gehoert nach content/seite.ts, ist
            dort aber bisher nicht vorgesehen. */}
        <nav aria-label="Hauptnavigation" className="ml-auto shrink-0">
          <ul className="flex items-center gap-4 sm:gap-6">
            {ankerlinks.map((link) => (
              <li key={link.href}>
                {/* Die Ziele im Inhalt sind relativ ("#kontakt"). Hier werden
                    sie absolut gemacht, sonst zeigen sie auf /impressum,
                    /datenschutz und /arbeit/[slug] ins Leere.
                    min-h-11: 44 Pixel Trefferflaeche, derselbe Wert, den die
                    Befunde an der alten Fassung vermissen.
                    <a> statt <Link>, Begruendung eine Ebene weiter oben bei
                    der Wortmarke.
                    Nur noch ein Eintrag ("Contact" -> #kontakt): der fruehere
                    zweite Link zeigte auf "#showcase", das es auf der neuen
                    Startseite nicht mehr gibt. Zurueck zur Startseite fuehrt
                    bereits die Wortmarke, ein zweiter Nav-Punkt dafuer waere
                    doppelt. Siehe content/seite.ts, kopfleiste. */}
                <a
                  href={`/${link.href}`}
                  className="inline-flex min-h-11 items-center text-small whitespace-nowrap text-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
