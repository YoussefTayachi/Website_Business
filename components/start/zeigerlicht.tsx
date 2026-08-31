"use client";

import { useEffect, useRef } from "react";

/**
 * Der Lichtverlauf im Hero, der dem Zeiger folgt.
 *
 * WARUM DAS UEBERHAUPT DA IST: die Seite verkauft Gestaltung. Eine Flaeche,
 * die auf Anwesenheit reagiert, sagt das in einer halben Sekunde, und sie
 * sagt es, ohne einen Satz dafuer zu brauchen.
 *
 * WARUM NUR bei (pointer: fine): auf einem Telefon gibt es keinen Zeiger,
 * der einem Verlauf folgen koennte, und ein Horcher, der nie feuert, ist
 * nur Ballast im Buendel. matchMedia entscheidet das einmal, nicht die
 * Fensterbreite: ein Laptop mit Beruehrungsbildschirm hat beides.
 *
 * WARUM transform UND NICHT DIE VERLAUFSMITTE: eine wandernde
 * `radial-gradient`-Mitte zwingt den Browser, den Verlauf in jedem Bild neu
 * zu rastern. Ein transform verschiebt eine fertige Ebene. Der Unterschied
 * ist auf einem alten Laptop der zwischen weich und ruckelnd.
 *
 * WARUM requestAnimationFrame: pointermove feuert oefter als der Bildschirm
 * zeichnet. Ohne die Drossel schriebe die Komponente Stile, die nie jemand
 * sieht, und erzwaenge dabei Layoutberechnungen.
 *
 * Ohne JavaScript steht der Verlauf still und mittig. Er ist Zierde, und
 * Zierde darf fehlen.
 */
export default function Zeigerlicht({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let angefordert = 0;
    let x = 0;
    let y = 0;

    const zeichne = () => {
      angefordert = 0;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };

    const beiBewegung = (e: PointerEvent) => {
      // Auf -1 bis 1 normiert, gemessen am Fenster und nicht am Element:
      // der Verlauf soll auf die Bewegung im Bild reagieren, nicht auf die
      // Bewegung innerhalb eines Kastens, dessen Grenzen niemand sieht.
      x = (e.clientX / window.innerWidth) * 2 - 1;
      y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!angefordert) angefordert = requestAnimationFrame(zeichne);
    };

    window.addEventListener("pointermove", beiBewegung, { passive: true });
    return () => {
      window.removeEventListener("pointermove", beiBewegung);
      if (angefordert) cancelAnimationFrame(angefordert);
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
