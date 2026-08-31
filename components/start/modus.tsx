"use client";

import { useEffect, useState } from "react";
import { start } from "@/content/start";

type Wahl = "system" | "light" | "dark";

/**
 * Die Modus-Gruppe: Auto, Hell, Dunkel.
 *
 * WARUM DREI NATIVE RADIOS UND KEINE DREI KNOEPFE MIT role="radiogroup":
 * eine Gruppe aus Knoepfen mit aria-checked ist unvollstaendige ARIA. Sie
 * braucht zusaetzlich role="radio" an jedem Kind, eine Verwaltung von
 * tabindex (genau ein Kind im Tabstopp, die anderen auf -1) und
 * Pfeiltastenbedienung von Hand. Das sind drei Fehlerquellen fuer etwas, das
 * <fieldset> plus <input type="radio"> von sich aus richtig macht.
 *
 * WARUM ES DREI ZUSTAENDE SIND UND NICHT ZWEI: ein Umschalter kennt nur hell
 * und dunkel und hat keinen Weg zurueck zu "richte dich nach dem Geraet".
 * Wer einmal geklickt hat, ist damit dauerhaft festgelegt, auch wenn sein
 * Telefon abends von selbst umschaltet.
 *
 * DIE WAHRHEIT STEHT AN <html>, gesetzt vom Skript in app/layout.tsx, bevor
 * das erste Bild steht. Diese Komponente liest sie nach der Hydration aus
 * und schreibt sie fort. Sie entscheidet nichts beim ersten Bild, sonst
 * gaebe es ein Aufblitzen.
 *
 * OHNE JAVASCRIPT ist die Gruppe nicht da, und das ist richtig: sie koennte
 * nichts bewirken. Der Modus stimmt dann trotzdem, weil app/globals.css die
 * dunklen Tokens zusaetzlich unter @media (prefers-color-scheme: dark)
 * fuehrt. Der Schalter ist eine Zutat, keine Voraussetzung.
 */
export default function Modus({ className }: { className?: string }) {
  const [wahl, setzeWahl] = useState<Wahl>("system");
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
    if (gespeichert === "dark" || gespeichert === "light") setzeWahl(gespeichert);
    setzeBereit(true);
  }, []);

  // Solange "Auto" gewaehlt ist, folgt die Seite dem Geraet auch dann, wenn
  // es waehrend des Besuchs umschaltet. Ohne diesen Horcher bliebe sie bis
  // zum naechsten Neuladen im alten Modus stehen, und "Auto" waere eine
  // Behauptung statt eines Verhaltens.
  useEffect(() => {
    if (wahl !== "system") return;
    const abfrage = window.matchMedia("(prefers-color-scheme: dark)");
    const folge = () => anwenden("system");
    abfrage.addEventListener("change", folge);
    return () => abfrage.removeEventListener("change", folge);
  }, [wahl]);

  function anwenden(neu: Wahl) {
    const wurzel = document.documentElement;
    const dunkel =
      neu === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : neu === "dark";

    // Beide Klassen werden gefuehrt, auch die helle: nur `.light` kann die
    // Medienabfrage in globals.css wieder schlagen, wenn jemand ausdruecklich
    // hell waehlt, waehrend sein Geraet auf dunkel steht.
    wurzel.classList.toggle("dark", dunkel);
    wurzel.classList.toggle("light", !dunkel);

    try {
      if (neu === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", neu);
    } catch {
      // siehe oben
    }
  }

  function waehle(neu: Wahl) {
    setzeWahl(neu);
    anwenden(neu);
  }

  return (
    // data-bereit haengt die Uebergaenge erst nach der Hydration ein. Ohne
    // das wandert die Markierung beim Laden einmal sichtbar von "Auto" auf
    // die gespeicherte Wahl, und eine Animation beim Seitenaufbau ist genau
    // das, was diese Seite sonst vermeidet.
    <fieldset
      className={className ? `st-modus ${className}` : "st-modus"}
      {...(bereit ? { "data-bereit": "" } : {})}
    >
      <legend className="st-modus__legende">{legende}</legend>
      {optionen.map((o) => (
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
          <label className="st-modus__label" htmlFor={`st-modus-${o.wert}`}>
            {o.label}
          </label>
        </span>
      ))}
    </fieldset>
  );
}
