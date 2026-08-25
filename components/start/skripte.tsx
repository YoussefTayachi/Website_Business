"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Laedt die beiden unveraenderten Skripte der Scroll-Inszenierung und startet
 * die Engine. Das ist die einzige Client-Komponente der Startseite: die neun
 * Akte selbst sind statisches Markup und bleiben Server Components.
 *
 * DIE REIHENFOLGE IST BEDINGUNG, nicht Geschmack:
 *   1. scrollcraft.js laden. Es haengt ScrollCraft an window und macht sonst
 *      nichts von allein, es gibt kein Auto-Mount.
 *   2. ScrollCraft.mount(document.body). Erst hier liest die Engine die
 *      [data-sc-*]-Struktur ein und beginnt, DOM zu veraendern.
 *   3. page.js laden. Es braucht Schritt 2 zwingend, aus zwei Gruenden:
 *      es liest --sc-p von [data-sc-peak], das die Engine erst setzt, und es
 *      haengt einen focusin-Listener ans window, der NACH dem der Engine
 *      registriert sein muss. Beide horchen auf dasselbe Ereignis, und wer
 *      spaeter registriert, hat auf einer gepinnten Buehne das letzte Wort
 *      (die Begruendung steht ausfuehrlich im Kopf von page.js).
 *
 * Alles davon laeuft erst nach der Hydration (strategy="afterInteractive"):
 * die Engine formt DOM um, den React sonst danach noch einmal anfassen
 * wuerde, und das Ergebnis waere eine halb umgebaute Seite.
 */

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: HTMLElement | Document | string) => unknown };
  }
}

/**
 * Den Ankersprung nach dem Mounten nachziehen.
 *
 * Wer von /impressum aus auf "/#kontakt" klickt (oder die Adresse direkt
 * aufruft), laesst den Browser zu #kontakt scrollen, WAEHREND die Seite noch
 * ihre ungemountete Hoehe hat. mount() gibt den gepinnten Akten erst danach
 * ihre Spanne, Akt 4 allein 320vh. Gemessen am 2026-08-25 bei 1440x900:
 * das Dokument waechst dabei in einem Bild von 5914 auf 12517 Pixel, #kontakt
 * wandert von 5247 auf 11482. Der weiche Sprung des Browsers laeuft zu diesem
 * Zeitpunkt noch und endet stur bei 5014, also 6468 Pixel vor dem Schlussakt.
 * Ohne diese Korrektur landet der Nav-Link mitten im Nichts.
 *
 * Nicht auf die Oberkante des Akts springen: bei einem gepinnten Akt steht
 * --sc-p dort auf 0 und die Cues sind noch dunkel. 0,30 ist derselbe Parkwert,
 * mit dem public/scrollcraft/page.js den Tastaturfokus auf demselben Akt
 * loest, sicher im Halteplateau des Cues "0.05".
 *
 * behavior "instant" ist Bedingung: es bricht den noch laufenden weichen
 * Sprung ab. Mit "smooth" gewaenne der alte Sprung und liefe erneut ins Leere.
 */
function ankerNachziehen() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const ziel = document.getElementById(id);
  if (!ziel) return;

  if (ziel.getAttribute("data-sc-act") === "pin") {
    const weg = Math.max(ziel.offsetHeight - window.innerHeight, 1);
    window.scrollTo({ top: ziel.offsetTop + 0.3 * weg, behavior: "instant" });
    return;
  }
  // Fliessende Akte: scrollIntoView statt offsetTop, weil nur das
  // scroll-padding-top aus app/globals.css beruecksichtigt und das Ziel
  // sonst unter der Leiste haengt.
  ziel.scrollIntoView({ block: "start", behavior: "instant" });
}

export default function StartSkripte() {
  // Erst wenn die Engine steht, kommt page.js in den Baum. Das ist die
  // Verkettung aus Schritt 2 nach 3 oben, ausgedrueckt in React.
  const [engineSteht, setEngineSteht] = useState(false);

  // Derselbe Sprung noch einmal fuer den Fall ohne Seitenaufbau: Vor- und
  // Zurueck-Taste oder eine von Hand geaenderte Adresse loesen nur ein
  // hashchange aus. Der Browser springt dann auf die Oberkante des Akts, wo
  // --sc-p auf 0 steht und der CTA unsichtbar ist.
  useEffect(() => {
    if (!engineSteht) return;
    const beiHashwechsel = () => requestAnimationFrame(ankerNachziehen);
    window.addEventListener("hashchange", beiHashwechsel);
    return () => window.removeEventListener("hashchange", beiHashwechsel);
  }, [engineSteht]);

  return (
    <>
      <Script
        src="/scrollcraft/scrollcraft.js"
        strategy="afterInteractive"
        onReady={() => {
          // onReady statt onLoad: onLoad feuert nur beim ersten Laden. Kommt
          // jemand ueber einen Seitenwechsel zurueck, liegt das Skript im
          // Cache, onLoad bliebe stumm, und die Seite waere tot. onReady
          // feuert auch dann. Das Mounten selbst ist trotzdem einmalig
          // gehalten, siehe den Kommentar in components/chrome/kopfleiste.tsx:
          // in die Startseite fuehrt bewusst kein Client-Wechsel mehr.
          if (engineSteht) return;
          window.ScrollCraft?.mount(document.body);
          setEngineSteht(true);
          // Ein Bild spaeter: erst dann steht die neue Hoehe der gepinnten
          // Akte im Layout und offsetTop liefert den richtigen Wert.
          requestAnimationFrame(ankerNachziehen);
        }}
      />

      {engineSteht ? <Script src="/scrollcraft/page.js" strategy="afterInteractive" /> : null}
    </>
  );
}
