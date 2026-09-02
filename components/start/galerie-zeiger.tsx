"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * DIE MARKE AM ZEIGER. Ueber den Galeriekarten folgt dem Zeiger eine kleine
 * Pille mit "Open" und einem Pfeil. Auf godly.design hat jede zweite
 * Galerie so etwas, und es macht aus sechs Bildern sechs Tueren.
 *
 * Nur mit feinem Zeiger; auf dem Telefon gibt es keinen. Die Pille ist
 * aria-hidden, denn der Link darunter heisst schon nach dem Betrieb.
 *
 * DIE POSITION KOMMT ALS transform UND NICHT ALS left/top: transform laeuft
 * auf der Komposition, left/top erzwingt in jedem Bild ein Layout. Und sie
 * wird ueber requestAnimationFrame geschrieben, weil pointermove oefter
 * feuert, als der Bildschirm zeichnet.
 */
export default function GalerieZeiger({ label, children }: { label: string; children: ReactNode }) {
  const huelle = useRef<HTMLDivElement>(null);
  const pille = useRef<HTMLDivElement>(null);
  const [da, setzeDa] = useState(false);

  useEffect(() => {
    const el = huelle.current;
    const p = pille.current;
    if (!el || !p) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let angefordert = 0;
    let x = 0;
    let y = 0;
    const zeichne = () => {
      angefordert = 0;
      p.style.transform = `translate(${x}px, ${y}px)`;
    };
    const beiBewegung = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!angefordert) angefordert = requestAnimationFrame(zeichne);
      // Nur ueber einer Karte, nicht in der Luecke dazwischen.
      setzeDa(Boolean((e.target as Element).closest(".st-karte")));
    };
    const weg = () => setzeDa(false);

    el.addEventListener("pointermove", beiBewegung, { passive: true });
    el.addEventListener("pointerleave", weg);
    return () => {
      el.removeEventListener("pointermove", beiBewegung);
      el.removeEventListener("pointerleave", weg);
      if (angefordert) cancelAnimationFrame(angefordert);
    };
  }, []);

  return (
    <div ref={huelle} className="st-galerie__feld">
      {children}
      <div ref={pille} className="st-zeiger" aria-hidden="true" {...(da ? { "data-da": "" } : {})}>
        {label}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18 18 6M9 6h9v9" />
        </svg>
      </div>
    </div>
  );
}
