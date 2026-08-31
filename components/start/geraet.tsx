"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { start } from "@/content/start";

/**
 * Der Telefonrahmen im Hero. Darin wandert eine ECHTE Aufnahme einer
 * gebauten Seite langsam nach unten und wieder zurueck.
 *
 * KEIN ECHTER SCROLLCONTAINER, und das ist die wichtigste Zeile hier. Ein
 * scrollbarer Kasten mitten auf der Seite faengt auf dem Telefon die
 * senkrechte Wischgeste ab: man will die Seite scrollen, trifft den Kasten
 * und scrollt stattdessen in ihm. Das ist dieselbe Scroll-Entfuehrung, die
 * an dieser Seite schon einmal komplett verworfen wurde, nur an anderer
 * Stelle. Hier verschiebt eine CSS-Animation ein statisches Bild in einem
 * beschnittenen Rahmen, und die Bildebene traegt pointer-events: none.
 *
 * DER HALT. Eine Dauerbewegung braucht einen. Sie pausiert bei Hover und bei
 * :focus-within (beides in start.css), und dazu gibt es diesen echten,
 * beschrifteten Knopf mit 44px. Der Rahmen selbst bekommt bewusst KEIN
 * tabindex: eine Zierflaeche, die nur fokussierbar waere, um eine Pause
 * entgegenzunehmen, ist ein unbenannter Tabstopp und macht die
 * Tastaturbedienung schlechter statt besser.
 *
 * DER WEG DES BILDES wird gerechnet, nicht geraten. Bekannt sind die Masse
 * der Aufnahme (aus dem statischen Import) und das Seitenverhaeltnis des
 * Ausschnitts (9:19 aus start.css). Ein fester Prozentwert waere bei der
 * naechsten, laengeren Aufnahme sofort falsch.
 */
export default function Geraet({ bild }: { bild: StaticImageData }) {
  const [pause, setzePause] = useState(false);
  const { bildAlt, pause: pauseLabel, weiter } = start.hero.geraet;

  // Anteil des Bildes, der ueber den Ausschnitt hinausragt. Bei einem Bild,
  // das kuerzer ist als sein Ausschnitt, ist der Weg null statt negativ:
  // sonst schoebe die Animation es aus dem Rahmen heraus.
  const ausschnitt = 19 / 9;
  const bildVerhaeltnis = bild.height / bild.width;
  const weg = Math.max(0, 1 - ausschnitt / bildVerhaeltnis);

  return (
    <figure
      className="st-geraet"
      style={{ ["--st-lauf" as string]: `${(-weg * 100).toFixed(2)}%` }}
      {...(pause ? { "data-pause": "" } : {})}
    >
      <div className="st-geraet__screen">
        <Image
          className="st-geraet__img"
          src={bild}
          alt={bildAlt}
          // Das einzige Bild ueber der Falz, also das einzige mit priority.
          // Alles andere auf dieser Seite laedt spaeter.
          priority
          sizes="(min-width: 62rem) 20rem, 100vw"
        />
      </div>

      <button
        type="button"
        className="st-geraet__halt"
        onClick={() => setzePause((p) => !p)}
        aria-pressed={pause}
        // Die Beschriftung benennt das ZIEL des Klicks, nicht den Zustand.
        // Den sagt aria-pressed.
        aria-label={pause ? weiter : pauseLabel}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          {pause ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
        </svg>
      </button>
    </figure>
  );
}
