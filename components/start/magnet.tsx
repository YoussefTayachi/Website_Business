"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * DER MAGNET. Was darin liegt, rueckt dem Zeiger ein paar Pixel entgegen,
 * sobald er in die Naehe kommt, und faellt zurueck, wenn er geht.
 *
 * Nur fuer den EINEN Knopf im Hero. Ein Magnet an jedem Knopf ist ein
 * Trick, einer am wichtigsten Knopf der Seite ist eine Geste.
 *
 * Nur mit feinem Zeiger und nicht bei reduzierter Bewegung, wie das
 * Zeigerlicht. Die Verschiebung ist auf 8 Pixel gedeckelt: mehr, und der
 * Knopf laeuft dem Klick davon.
 */
export default function Magnet({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const kind = el.firstElementChild as HTMLElement | null;
    if (!kind) return;

    let angefordert = 0;
    let dx = 0;
    let dy = 0;
    const zeichne = () => {
      angefordert = 0;
      kind.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    };
    const beiBewegung = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      // Verhaeltnis zur halben Groesse, gedeckelt auf 8 Pixel.
      dx = Math.max(-8, Math.min(8, (x / (r.width / 2)) * 8));
      dy = Math.max(-8, Math.min(8, (y / (r.height / 2)) * 8));
      if (!angefordert) angefordert = requestAnimationFrame(zeichne);
    };
    const zurueck = () => {
      dx = 0;
      dy = 0;
      if (!angefordert) angefordert = requestAnimationFrame(zeichne);
    };

    el.addEventListener("pointermove", beiBewegung, { passive: true });
    el.addEventListener("pointerleave", zurueck);
    return () => {
      el.removeEventListener("pointermove", beiBewegung);
      el.removeEventListener("pointerleave", zurueck);
      if (angefordert) cancelAnimationFrame(angefordert);
    };
  }, []);

  return (
    <div ref={ref} className={className ? `st-magnet ${className}` : "st-magnet"}>
      {children}
    </div>
  );
}
