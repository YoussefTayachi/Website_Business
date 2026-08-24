/**
 * Media Query als React-Zustand.
 *
 * Bewusst OHNE "use client", genau wie lib/reveal.ts: der Hook wird nur aus
 * Komponenten importiert, die die Direktive selbst tragen.
 *
 * Warum useSyncExternalStore und nicht useState plus useEffect: React ruft
 * beim Hydrieren getServerSnapshot auf und erst danach getSnapshot. Damit
 * stimmen Server- und erste Client-Ausgabe garantiert ueberein, es gibt also
 * keine Hydration-Warnung, und trotzdem steht das echte Ergebnis unmittelbar
 * nach dem Mounten zur Verfuegung.
 *
 * Der Server-Schnappschuss ist immer `false`, also "Abfrage trifft nicht zu".
 * Aufrufstellen muessen ihre Abfrage deshalb so formulieren, dass der
 * anspruchslosere Fall false ist (z. B. "(min-width: 768px)": ohne Kenntnis
 * der Breite wird das schmale Layout gerendert).
 */
import { useCallback, useSyncExternalStore } from "react";

// Eine MediaQueryList je Abfrage. getSnapshot laeuft bei jedem Render, und
// window.matchMedia legt bei jedem Aufruf ein neues Objekt an; ohne diesen
// Zwischenspeicher waere das pro Render eine Allokation ohne Nutzen.
const listen = new Map<string, MediaQueryList>();

function liste(query: string): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }

  let vorhanden = listen.get(query);
  if (!vorhanden) {
    vorhanden = window.matchMedia(query);
    listen.set(query, vorhanden);
  }
  return vorhanden;
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = liste(query);
      if (!mql) return () => {};

      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => liste(query)?.matches ?? false, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
