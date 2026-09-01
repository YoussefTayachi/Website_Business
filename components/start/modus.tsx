"use client";

import { useEffect, useState } from "react";
import { start } from "@/content/start";

type Wahl = "light" | "dark";

/**
 * Der Modus-Schalter: zwei Zustaende, Sonne und Mond.
 *
 * ══ WARUM "AUTO" AM 2026-09-01 ENTFALLEN IST ═══════════════════════════════
 * Youssefs Mentor: "remove the 'Auto' and make it choose automatically by
 * default, then have 2 logo for dark and light themed."
 *
 * Das Argument, das hier vorher fuer den dritten Zustand stand, war: ein
 * Umschalter kenne keinen Weg zurueck zur Geraeteeinstellung. Es hat einen
 * Fehler. "Auto" war ein SICHTBARER KNOPF FUER DEN AUSGANGSZUSTAND. Wer nie
 * etwas anfasst, ist ohnehin auf Auto, und das sind fast alle; die Gruppe
 * kostete dafuer ein Drittel mehr Breite in der engsten Leiste der Seite.
 *
 * WAS JETZT PASSIERT, und "automatisch" ist hier woertlich gemeint:
 *   nichts gespeichert -> die Seite folgt dem Geraet, MITLAUFEND. Schaltet
 *                         das Telefon abends auf dunkel, schaltet sie mit.
 *   einmal geklickt    -> die Wahl steht und ueberlebt den Besuch.
 * Der einzige verlorene Weg ist der zurueck auf "folge dem Geraet". Er
 * kostet das Loeschen der Seitendaten, und er wird praktisch nie gebraucht.
 *
 * WARUM ZWEI NATIVE RADIOS UND KEIN UMSCHALTKNOPF: zwei Zeichen nebeneinander
 * sind eine WAHL zwischen zwei Zustaenden und keine Umkehrung eines
 * Zustands. Als Radiogruppe sagt der Browser von sich aus, welcher von
 * beiden gilt, laesst mit den Pfeiltasten wechseln und braucht dafuer weder
 * role="radio" noch eine tabindex-Verwaltung von Hand.
 *
 * DIE WAHRHEIT STEHT AN <html>, gesetzt vom Skript in app/layout.tsx, bevor
 * das erste Bild steht. Diese Komponente liest sie nach der Hydration aus
 * und schreibt sie fort. Sie entscheidet nichts beim ersten Bild, sonst
 * gaebe es ein Aufblitzen.
 *
 * OHNE JAVASCRIPT ist der Schalter nicht da, und das ist richtig: er koennte
 * nichts bewirken. Der Modus stimmt dann trotzdem, weil app/globals.css die
 * dunklen Tokens zusaetzlich unter @media (prefers-color-scheme: dark)
 * fuehrt. Der Schalter ist eine Zutat, keine Voraussetzung.
 */

/** Sonne. Steht fuer den hellen Modus. */
function Sonne() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

/** Mond. Steht fuer den dunklen Modus. */
function Mond() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
    </svg>
  );
}

const ZEICHEN = { light: Sonne, dark: Mond } as const;

export default function Modus({ className }: { className?: string }) {
  const [wahl, setzeWahl] = useState<Wahl>("light");
  // Solange nichts gespeichert ist, folgt die Seite dem Geraet. `fest` sagt,
  // ob jemand das schon einmal ueberstimmt hat.
  const [fest, setzeFest] = useState(false);
  const [bereit, setzeBereit] = useState(false);
  const { legende, optionen } = start.modus;

  useEffect(() => {
    let gespeichert: string | null = null;
    try {
      gespeichert = localStorage.getItem("theme");
    } catch {
      // Privater Modus oder gesperrter Speicher. Dann gilt eben die
      // Systemeinstellung, und der Wechsel haelt nur fuer diesen Besuch.
    }

    if (gespeichert === "dark" || gespeichert === "light") {
      setzeWahl(gespeichert);
      setzeFest(true);
    } else {
      setzeWahl(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    setzeBereit(true);
  }, []);

  // Ohne eigene Wahl laeuft die Seite dem Geraet HINTERHER, auch waehrend des
  // Besuchs. Ohne diesen Horcher bliebe sie bis zum naechsten Neuladen im
  // alten Modus stehen, und "automatisch" waere eine Behauptung statt eines
  // Verhaltens.
  useEffect(() => {
    if (fest) return;
    const abfrage = window.matchMedia("(prefers-color-scheme: dark)");
    const folge = (e: MediaQueryListEvent) => {
      const neu: Wahl = e.matches ? "dark" : "light";
      setzeWahl(neu);
      male(neu);
    };
    abfrage.addEventListener("change", folge);
    return () => abfrage.removeEventListener("change", folge);
  }, [fest]);

  /** Setzt die Klassen an <html>. Beide werden gefuehrt, auch die helle: nur
   *  `.light` kann die Medienabfrage in globals.css wieder schlagen, wenn
   *  jemand ausdruecklich hell waehlt, waehrend sein Geraet dunkel steht. */
  function male(neu: Wahl) {
    const wurzel = document.documentElement;
    wurzel.classList.toggle("dark", neu === "dark");
    wurzel.classList.toggle("light", neu === "light");
  }

  function waehle(neu: Wahl) {
    setzeWahl(neu);
    setzeFest(true);
    male(neu);
    try {
      localStorage.setItem("theme", neu);
    } catch {
      // siehe oben
    }
  }

  return (
    // data-bereit haengt die Uebergaenge erst nach der Hydration ein. Ohne
    // das wandert die Markierung beim Laden einmal sichtbar auf die
    // gespeicherte Wahl, und eine Animation beim Seitenaufbau ist genau das,
    // was diese Seite sonst vermeidet.
    <fieldset
      className={className ? `st-modus ${className}` : "st-modus"}
      {...(bereit ? { "data-bereit": "" } : {})}
    >
      <legend className="st-modus__legende">{legende}</legend>
      {optionen.map((o) => {
        const Zeichen = ZEICHEN[o.wert as Wahl];
        return (
          <span key={o.wert} className="st-modus__wahl">
            <input
              className="st-modus__eingabe"
              type="radio"
              name="st-modus"
              id={`st-modus-${o.wert}`}
              value={o.wert}
              checked={wahl === o.wert}
              onChange={() => waehle(o.wert as Wahl)}
            />
            {/* Sichtbar ist das Zeichen, gelesen wird das Wort. Ein Schalter
                aus zwei Bildern ohne Namen ist fuer einen Vorleser zwei
                unbeschriftete Knoepfe. */}
            <label className="st-modus__label" htmlFor={`st-modus-${o.wert}`}>
              <Zeichen />
              <span className="st-modus__wort">{o.label}</span>
            </label>
          </span>
        );
      })}
    </fieldset>
  );
}
