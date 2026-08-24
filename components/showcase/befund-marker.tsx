"use client";

/**
 * Die Messschilder ueber der schlechten Fassung (PLAN.md Abschnitt 2 und 4).
 *
 * Drei Teile, die zusammengehoeren:
 *   BefundProvider  traegt die Befunde eines Projekts, den geoeffneten Befund
 *                   und die Information, ob die Sektion schon im Blick war.
 *   BefundAnker     steht MITTEN IM MARKUP der alten Fassung, direkt neben dem
 *                   Element mit dem Mangel, und zeichnet Linie plus Schild.
 *   BefundListe     dieselben Befunde als normale, immer sichtbare Liste.
 *
 * Warum der Anker ein echter Button ist und kein Hover-Effekt: auf dem Handy
 * gibt es kein Hover. Ein Befund, der sich nur beim Zeigen oeffnet, waere dort
 * unerreichbar, und genau von dort kommt der Kaltklick aus der Mail.
 *
 * Warum es die Liste zusaetzlich gibt: ueber einer freigeschnittenen Flaeche
 * lassen sich Marker nicht sinnvoll vorlesen, und in einem schmalen Fenster
 * ist fuer sie kein Platz. Steht die Liste auf der Seite, werden die Marker
 * zur Zierde: sie bekommen aria-hidden und fallen aus der Tab-Reihenfolge,
 * damit derselbe Befund nicht zweimal vorgelesen wird.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import type { Finding } from "@/content/projekte";

/** Vorlauf je Marker, damit sich die Schilder gestaffelt zeichnen. */
const STAFFEL_MS = 90;

export type BefundKontext = {
  /** Die Befunde des Projekts, in der Reihenfolge aus content/projekte.ts. */
  findings: readonly Finding[];
  /** Index des gerade geoeffneten Befunds, oder null. Immer hoechstens einer. */
  aktiv: number | null;
  setzeAktiv: (index: number | null) => void;
  /** true, sobald die Sektion einmal im Blick war (oder Motion reduziert ist). */
  sichtbar: boolean;
  /** true, wenn auf derselben Seite eine BefundListe steht. */
  listeSichtbar: boolean;
  /** Gemeinsamer id-Praefix fuer aria-controls. */
  idPraefix: string;
};

const BefundCtx = createContext<BefundKontext | null>(null);

export function useBefunde(): BefundKontext {
  const kontext = useContext(BefundCtx);
  if (!kontext) {
    throw new Error("BefundAnker und BefundListe brauchen einen BefundProvider darueber.");
  }
  return kontext;
}

export type BefundProviderProps = {
  findings: readonly Finding[];
  /**
   * Kommt von useReveal() an der Sektion. Der Provider beobachtet bewusst
   * nicht selbst: der Beobachter gehoert an den Rahmen, den der Aufrufer
   * ohnehin schon haelt, und ein zusaetzliches Wrapper-Element wuerde im
   * Raster ueber den beiden Fassungen im Weg stehen.
   */
  sichtbar: boolean;
  listeSichtbar?: boolean;
  children: ReactNode;
};

export function BefundProvider({
  findings,
  sichtbar,
  listeSichtbar = false,
  children,
}: BefundProviderProps): ReactElement {
  const [aktiv, setzeAktiv] = useState<number | null>(null);
  const idPraefix = useId();

  // Escape schliesst, und ein Zeigerdruck ausserhalb schliesst ebenfalls.
  // Beides einmal zentral statt einmal je Marker: es kann ohnehin nur ein
  // Befund offen sein.
  useEffect(() => {
    if (aktiv === null) return;

    const beiTaste = (event: KeyboardEvent) => {
      if (event.key === "Escape") setzeAktiv(null);
    };

    // Capture-Phase: der Schieber ruft in seinem eigenen pointerdown
    // preventDefault auf, und in der Bubble-Phase kaeme dieser Zuhoerer bei
    // manchen Zielen zu spaet.
    const beiZeiger = (event: PointerEvent) => {
      const ziel = event.target;
      if (ziel instanceof Element && ziel.closest("[data-befund-marker]")) return;
      setzeAktiv(null);
    };

    document.addEventListener("keydown", beiTaste);
    document.addEventListener("pointerdown", beiZeiger, true);
    return () => {
      document.removeEventListener("keydown", beiTaste);
      document.removeEventListener("pointerdown", beiZeiger, true);
    };
  }, [aktiv]);

  const wert = useMemo<BefundKontext>(
    () => ({ findings, aktiv, setzeAktiv, sichtbar, listeSichtbar, idPraefix }),
    [findings, aktiv, sichtbar, listeSichtbar, idPraefix],
  );

  return <BefundCtx.Provider value={wert}>{children}</BefundCtx.Provider>;
}

export type BefundAnkerProps = {
  /** Index in `findings`. Gibt es dort keinen Eintrag, rendert der Anker nichts. */
  index: number;
  /**
   * Auf welche Seite Linie und Schild ausschlagen. Vorgabe "rechts". Steht der
   * Mangel am rechten Rand der Fassung, gehoert hier "links" hin, sonst laeuft
   * das Schild aus dem Rahmen.
   */
  richtung?: "links" | "rechts";
  /** Waagerechte Laenge der Haarlinie in Pixeln. */
  laenge?: number;
};

/**
 * Ein Messschild an genau einer Stelle der alten Fassung.
 *
 * Der aeussere Span ist absichtlich 0 mal 0 Pixel gross und inline: er darf
 * das Layout der alten Fassung nicht verschieben, sonst zeigt der Vergleich
 * nicht mehr das, was gebaut wurde. Alles Sichtbare haengt absolut daran.
 */
export function BefundAnker({
  index,
  richtung = "rechts",
  laenge = 56,
}: BefundAnkerProps): ReactElement | null {
  const { findings, aktiv, setzeAktiv, sichtbar, listeSichtbar, idPraefix } = useBefunde();

  const finding = findings[index];
  if (!finding) return null;

  const offen = aktiv === index;
  const panelId = `${idPraefix}-befund-${index}`;

  // Hoehe des Zeichenfelds und Hoehe, auf der die waagerechte Strecke liegt.
  // Der Knick sitzt bei 40 Prozent der Laenge, damit kurze und lange Linien
  // denselben Winkel bekommen.
  const hoehe = 34;
  const linie = 12;
  const knick = Math.round(laenge * 0.4);

  // pathLength="1" ist Pflicht: .draw-line in globals.css rechnet mit einer
  // normierten Laenge, sonst braucht eine kurze Linie weniger Zeit als eine
  // lange und die Staffelung faellt auseinander.
  const d =
    richtung === "rechts"
      ? `M0.5 ${hoehe - 0.5} L${knick} ${linie} L${laenge} ${linie}`
      : `M${laenge - 0.5} ${hoehe - 0.5} L${laenge - knick} ${linie} L0 ${linie}`;

  const gruppe: CSSProperties =
    richtung === "rechts" ? { left: 0, bottom: 0 } : { right: 0, bottom: 0 };

  const schild: CSSProperties =
    richtung === "rechts"
      ? { left: laenge, top: linie, transform: "translateY(-50%)" }
      : { right: laenge, top: linie, transform: "translateY(-50%)" };

  return (
    <span
      data-befund-marker=""
      // is-in am Anker selbst und nicht an einem gemeinsamen Vorfahren:
      // globals.css schreibt die Endzustaende fuer reduzierte Bewegung als
      // ".is-in .marker-in" und ".is-in .draw-line", also in der
      // Nachfahren-Form. Die greift nur, wenn is-in oberhalb steht.
      className={cn("relative inline-block h-0 w-0 align-baseline", sichtbar && "is-in")}
      // Steht die Befundliste auf der Seite, traegt sie den Inhalt. Der Marker
      // ist dann Zierde: aria-hidden und tabIndex -1 gehoeren zusammen, ein
      // fokussierbares Element mit aria-hidden waere eine Sackgasse.
      aria-hidden={listeSichtbar || undefined}
      style={{ ["--draw-delay" as string]: `${index * STAFFEL_MS}ms` } as CSSProperties}
    >
      <span className="absolute z-20 text-accent" style={gruppe}>
        <svg
          width={laenge}
          height={hoehe}
          viewBox={`0 0 ${laenge} ${hoehe}`}
          fill="none"
          aria-hidden="true"
          className="block overflow-visible"
        >
          <path
            className="draw-line"
            d={d}
            pathLength={1}
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <span className="absolute" style={schild}>
          {/* relative Huelle, damit die Erklaerung unter dem Schild haengt und
              nicht an der Ankerstelle. */}
          <span className="relative block">
            <button
              type="button"
              tabIndex={listeSichtbar ? -1 : undefined}
              aria-expanded={offen}
              aria-controls={panelId}
              onClick={() => setzeAktiv(offen ? null : index)}
              // Enter und Leertaste braucht kein eigener Zuhoerer: das macht
              // ein echter Button von sich aus. Escape faengt der Provider.
              className={cn(
                "marker-in mono-label-xs block max-w-[14rem] cursor-pointer rounded-sm px-1.5 py-1 text-left whitespace-nowrap",
                // Volltonflaeche statt farbiger Schrift: die alte Fassung
                // bringt ihren eigenen, hellen Grund mit, und der bleibt im
                // Nachtmodus hell. Auf der Akzentflaeche stimmt der Kontrast
                // in beiden Themen (7,03:1 hell, 5,27:1 dunkel).
                "bg-accent text-accent-contrast",
                "transition-colors hover:bg-accent-strong",
              )}
            >
              {finding.tag}
            </button>

            {offen ? (
              <span
                id={panelId}
                className="absolute top-[calc(100%+0.375rem)] left-0 z-30 block w-[min(18rem,60vw)] rounded-sm border border-line bg-sheet px-3 py-2 text-caption text-ink shadow-lift"
              >
                {finding.text}
              </span>
            ) : null}
          </span>
        </span>
      </span>
    </span>
  );
}

export type BefundListeProps = {
  className?: string;
};

/**
 * Die Befunde als Liste. Fallback fuer schmale Fenster und der Weg, auf dem
 * Screenreader die Befunde ueberhaupt in einer sinnvollen Reihenfolge
 * bekommen.
 */
export function BefundListe({ className }: BefundListeProps): ReactElement | null {
  const { findings } = useBefunde();
  if (findings.length === 0) return null;

  return (
    <ol className={cn("space-y-4", className)}>
      {findings.map((finding, index) => (
        <li key={finding.tag} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
          <span className="mono-label-xs pt-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="block">
            <span className="mono-label block text-ink">{finding.tag}</span>
            <span className="mt-1 block text-small text-soft">{finding.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
