import Link from "next/link";
import type { ReactNode } from "react";

/**
 * DER KNOPF. Eine Pille, ueberall dieselbe: Kopfleiste, Hero, Kalender,
 * Entwurfsseiten, Telefonleiste.
 *
 * WARUM EINE KOMPONENTE, seit dem 2026-09-02: die Beschriftung steht ZWEIMAL
 * im Markup, uebereinander. Beim Ueberfahren rollt die obere nach oben aus
 * dem Beschnitt und die untere nach, und der Pfeil laeuft mit. Das ist die
 * Bewegung, die auf godly.design unter "CTA" in fast jedem zweiten Beispiel
 * steht, und sie sagt in einer Viertelsekunde "hier ist gestaltet". Viermal
 * von Hand zwei Spans zu setzen, geht beim vierten Mal schief.
 *
 * Die zweite Beschriftung ist aria-hidden: ein Vorleser sagt den Knopf
 * einmal. Ohne feinen Zeiger (Telefon) gibt es kein Ueberfahren, und die
 * Regel in start.css laesst dort nur die obere Beschriftung stehen.
 *
 * `um` kehrt die Flaeche um, fuer den dunklen Schlussblock.
 */
export default function Knopf({
  href,
  children,
  um = false,
  className,
  onClick,
  type,
  extern = false,
  ariaLabel,
}: {
  href?: string;
  children: ReactNode;
  um?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  extern?: boolean;
  ariaLabel?: string;
}) {
  const klasse = ["st-pill", um ? "st-pill--um" : "", className ?? ""].filter(Boolean).join(" ");
  const innen = (
    <>
      <span className="st-pill__rolle">
        <span className="st-pill__text">{children}</span>
        <span className="st-pill__text" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="st-pill__pfeil" aria-hidden="true">
        →
      </span>
    </>
  );

  if (!href) {
    return (
      <button type={type ?? "button"} className={klasse} onClick={onClick} aria-label={ariaLabel}>
        {innen}
      </button>
    );
  }

  // Anker auf derselben Seite (#book) und fremde Adressen bleiben ein <a>,
  // damit next/link nicht versucht, sie vorzuladen.
  if (extern || href.startsWith("#") || href.startsWith("http")) {
    return (
      <a
        className={klasse}
        href={href}
        aria-label={ariaLabel}
        {...(extern ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {innen}
      </a>
    );
  }

  return (
    <Link className={klasse} href={href} aria-label={ariaLabel}>
      {innen}
    </Link>
  );
}
