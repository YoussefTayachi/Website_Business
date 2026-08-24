/**
 * Scroll-Reveal auf Basis von IntersectionObserver.
 *
 * Bewusst OHNE "use client": der Hook wird ausschliesslich aus Komponenten
 * importiert, die selbst die Direktive tragen. So bleibt die Grenze zwischen
 * Server- und Client-Bereich dort sichtbar, wo sie hingehoert, naemlich in der
 * Komponente.
 *
 * Zwei Zusagen, auf die sich alle Sektionen verlassen duerfen:
 * 1. Ein Element wird GENAU EINMAL sichtbar geschaltet. Nach dem ersten
 *    Treffer wird es abgemeldet, es gibt also kein Aus- und Wiedereinblenden
 *    beim Zurueckscrollen.
 * 2. Bei "prefers-reduced-motion: reduce" liefert der Hook sofort den
 *    sichtbaren Endzustand, ohne Beobachter und ohne Uebergang. Kein
 *    dezenteres Fallback, sondern das fertige Bild.
 */
import { useEffect, useRef, useState, type RefObject } from "react";

export type RevealOptions = {
  /** Vorlauf, damit der Uebergang beginnt, bevor das Element ganz im Bild ist. */
  rootMargin?: string;
  /** Anteil des Elements, der sichtbar sein muss. 0 = ein Pixel genuegt. */
  threshold?: number;
};

export type Reveal<T extends HTMLElement> = {
  /** An das zu beobachtende Element haengen. */
  ref: RefObject<T | null>;
  /** true, sobald das Element einmal im Blick war (oder Motion reduziert ist). */
  revealed: boolean;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
): Reveal<T> {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0 } = options;

  const ref = useRef<T | null>(null);
  const done = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (done.current) return;

    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ohne IntersectionObserver waere der Inhalt dauerhaft unsichtbar. Lieber
    // ohne Uebergang zeigen als verbergen: die Seite muss lesbar bleiben.
    if (reduced || typeof IntersectionObserver === "undefined") {
      done.current = true;
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          done.current = true;
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, revealed };
}
