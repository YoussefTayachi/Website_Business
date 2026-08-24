"use client";
import { useEffect, useState } from "react";
import { seite } from "@/content/seite";

/**
 * Nachtmodus-Schalter.
 *
 * Die Wahrheit steht in der Klasse .dark am <html>, gesetzt schon im <head>
 * (siehe app/layout.tsx). Dieser Knopf liest sie nach der Hydration nur aus
 * und schreibt sie fort. Deshalb ist der Startwert hier bewusst "hell": das
 * Skript hat zu diesem Zeitpunkt laengst entschieden, und ein anderer
 * Startwert wuerde beim ersten Bild das falsche Zeichen zeigen.
 *
 * Bis der Zustand feststeht (mounted), bleibt die Flaeche leer statt falsch.
 * Sie behaelt ihre Groesse, damit die Kopfleiste beim Laden nicht springt.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const { ariaLabelZuDunkel, ariaLabelZuHell } = seite.kleintexte.nachtmodusSchalter;

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Privater Modus oder gesperrter Speicher: der Wechsel gilt dann nur
      // fuer diesen Besuch. Kein Grund, den Klick scheitern zu lassen.
    }
  }

  return (
    // Zwei Kaesten ineinander, und das hat einen Grund: der Knopf misst 44 mal
    // 44 Pixel (WCAG 2.5.5, und derselbe Wert, den die Befunde an der alten
    // Fassung vermissen), sichtbar ist davon nur der innere Rahmen mit 36
    // Pixeln. Ein Bedienelement, das kleiner ist als das, was die Seite an
    // anderen Seiten bemaengelt, waere ein Eigentor.
    // Die Beschriftung kommt aus content/seite.ts: sie benennt das ZIEL des
    // Klicks, nicht den aktuellen Zustand. Den sagt aria-pressed.
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? ariaLabelZuHell : ariaLabelZuDunkel}
      className="group/schalter flex h-11 w-11 shrink-0 items-center justify-center"
    >
      {/* Benannte Gruppe: die Kopfleiste ist selbst eine Gruppe, und ein
          unbenanntes group-hover wuerde hier auf JEDES Zeigen irgendwo in der
          Leiste anspringen. */}
      <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-line3 text-soft transition-colors group-hover/schalter:border-ink group-hover/schalter:text-ink">
        {mounted ? (
          dark ? (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )
        ) : (
          <span className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
