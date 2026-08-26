"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/reveal";

/**
 * Der Client-Rumpf fuer die Bewegung der Startseite.
 *
 * WARUM ES DIESE HUELLE GIBT: die neun Abschnitte sind statisches Markup und
 * sollen Server Components bleiben. Nur der IntersectionObserver braucht den
 * Browser. Statt eine ganze Sektion auf "use client" zu schalten, wandert
 * hier ausschliesslich das Beobachten hinein; der Inhalt kommt als children
 * aus der Server Component und wird nie an den Client geschickt.
 *
 * Die Huelle setzt genau ein Attribut: data-st-in, sobald ihr Bereich einmal
 * im Bild war. Was daraufhin passiert, entscheidet allein components/start/
 * start.css (.st-rise, .st-fade, .st-svc__row::before). So steht die Bewegung
 * an einer Stelle und nicht in einem Dutzend Komponenten.
 *
 * useReveal liefert bei prefers-reduced-motion: reduce sofort revealed, und
 * die Regeln in start.css nehmen dort zusaetzlich jeden Uebergang heraus. Der
 * Endzustand ist damit das erste Bild, keine gedaempfte Fassung.
 */
export default function Reveal({
  as,
  className,
  children,
  style,
}: {
  /** Standard ist div. section, ul, ol und figure kommen ebenfalls vor. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const Tag = as ?? "div";
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      // Nur setzen, nie auf "false": die CSS-Regeln haengen an der reinen
      // Anwesenheit des Attributs ([data-st-in]), und ein leerer Wert liest
      // sich im Inspector kuerzer als ein "true", das nie falsch wird.
      {...(revealed ? { "data-st-in": "" } : {})}
    >
      {children}
    </Tag>
  );
}
