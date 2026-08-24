"use client";

/**
 * Der Umschlag von Vorher zu Nachher (PLAN.md Abschnitt 2 und 4).
 *
 * Zwei Bedienarten, und beide muessen tragen:
 *   1. Ein ziehbarer Schieber. Pointer Events statt Mouse Events, sonst gibt
 *      es ihn auf dem Handy nicht.
 *   2. Ein Umschalter mit zwei Knoepfen. Er ist der Weg fuer alle, die nicht
 *      ziehen wollen oder koennen, und im schmalen Fenster der einzige.
 *
 * Beides schreibt in denselben Zustand: `split` von 0 (nur alte Fassung) bis
 * 100 (nur neue Fassung). Ein zweiter Zustand fuer den Umschalter waere eine
 * zweite Wahrheit, die irgendwann von der ersten abweicht.
 *
 * Umgesetzt ueber clip-path auf der oberen Ebene, gesteuert ueber die
 * CSS-Variable --split (siehe .split / .split-new in globals.css). Keine
 * Breitenaenderung: beide Fassungen liegen im selben Rasterfeld, behalten
 * damit exakt dieselbe Hoehe, und keine der beiden wird beim Ziehen neu
 * umbrochen.
 */

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { seite } from "@/content/seite";
import type { Finding } from "@/content/projekte";
import { useMediaQuery } from "@/lib/media";
import { useReveal } from "@/lib/reveal";
import { BefundListe, BefundProvider } from "./befund-marker";

/**
 * Ab hier gibt es den Schieber, darunter nur den Umschalter.
 *
 * Hergeleitet und nicht gegriffen: die Demo-Fassungen sind Websites und
 * brauchen rund 320 Pixel, um als Seite lesbar zu bleiben. Beim Schieber sieht
 * man in der Mittelstellung von jeder Fassung die halbe Rahmenbreite, der
 * Rahmen muss also mindestens 640 Pixel breit sein. Dazu kommt der Seitenrand
 * der Seite (--spacing-gutter, bis 3rem je Seite): 640 + 96 = 736. Die
 * naechste uebliche Stufe darueber ist 768.
 *
 * Zweiter Grund, der in dieselbe Richtung zeigt: auf einem Touchgeraet
 * konkurriert das waagerechte Ziehen an einer Naht mit dem Blaettern der
 * Seite. Der Umschalter hat dieses Problem nicht.
 */
const SCHIEBER_AB = "(min-width: 768px)";

/** Schrittweite der Pfeiltasten in Prozent. */
const TASTEN_SCHRITT = 5;

export type VorherNachherProps = {
  /** Die bewusst schlechte Fassung. Wird in die Insel .alt-fassung gewickelt. */
  alt: ReactNode;
  /** Die neue Fassung. */
  neu: ReactNode;
  /** Die Befunde des Projekts, fuer Marker und Liste. */
  findings: readonly Finding[];
  /** Firmenname des Demo-Projekts, fuer die Beschriftung des Schiebers. */
  firma: string;
  /** "voll" ist die Fassung fuer die Fallstudienseite. */
  variante?: "schieber" | "voll";
};

export default function VorherNachher({
  alt,
  neu,
  findings,
  firma,
  variante = "schieber",
}: VorherNachherProps): ReactElement {
  const schieberModus = useMediaQuery(SCHIEBER_AB);
  const { ref: rahmenRef, revealed } = useReveal<HTMLDivElement>();

  // Startstellung. Auf der Fallstudienseite steht zuerst die alte Fassung
  // ganzflaechig da, mit allen Befunden (PLAN.md Abschnitt 5). Im Showcase
  // steht die Mittelstellung, weil dort der Kontrast in einem Blick wirken
  // soll und niemand erst ziehen muss, um ihn zu sehen.
  const [split, setSplit] = useState(variante === "voll" ? 0 : 50);

  // .split-eased schaltet den Uebergang an der Trennkante an. Beim Ziehen muss
  // er aus sein: ein Uebergang liesse die Kante hinter dem Finger herlaufen
  // und wer zurueckzieht, bekaeme seine Position nicht sofort zurueck. Genau
  // dieses Gefuehl traegt aber den ganzen Moment.
  const [sanft, setSanft] = useState(true);

  const rahmen = useRef<HTMLDivElement | null>(null);
  const zieht = useRef(false);

  // Im schmalen Fenster steht immer nur eine Fassung. Sie wird aus derselben
  // Zahl abgeleitet, damit ein Wechsel der Fensterbreite nichts umwirft.
  const aktiveFassung: "alt" | "neu" = split > 50 ? "neu" : "alt";

  // Die Liste ersetzt die Marker dort, wo sie nicht tragen: im schmalen
  // Fenster ist kein Platz fuer sie, und auf der Fallstudienseite gehoert der
  // ausformulierte Befund ohnehin zur Tiefe der Seite.
  const listeSichtbar = !schieberModus || variante === "voll";

  const setzeAusZeiger = useCallback((clientX: number) => {
    const el = rahmen.current;
    if (!el) return;
    const kasten = el.getBoundingClientRect();
    if (kasten.width === 0) return;
    const prozent = ((clientX - kasten.left) / kasten.width) * 100;
    setSplit(Math.min(100, Math.max(0, prozent)));
  }, []);

  const beiZeigerStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Verhindert Textauswahl und das Mitziehen der Seite. Nimmt allerdings
    // auch den Fokus, deshalb wird er gleich darauf von Hand gesetzt: wer
    // gezogen hat, soll ohne Umweg mit den Pfeiltasten weitermachen koennen.
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus();
    zieht.current = true;
    setSanft(false);
    setzeAusZeiger(event.clientX);
  };

  const beiZeigerBewegung = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!zieht.current) return;
    setzeAusZeiger(event.clientX);
  };

  const beiZeigerEnde = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!zieht.current) return;
    zieht.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    // Erst beim Loslassen wieder weich: der naechste Sprung ueber den
    // Umschalter oder ueber Pos1/Ende soll sich als Bewegung lesen.
    setSanft(true);
  };

  const beiTaste = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    let ziel: number;
    let weich: boolean;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        ziel = split - TASTEN_SCHRITT;
        // Pfeiltasten laufen hart. Bei gehaltener Taste kommen die
        // Wiederholungen schneller als der 420-ms-Uebergang, jede neue
        // Wiederholung wuerde ihn von der gerade interpolierten Stelle neu
        // starten und die Kante bliebe sichtbar hinter der Taste zurueck.
        weich = false;
        break;
      case "ArrowRight":
      case "ArrowUp":
        ziel = split + TASTEN_SCHRITT;
        weich = false;
        break;
      case "Home":
        ziel = 0;
        weich = true;
        break;
      case "End":
        ziel = 100;
        weich = true;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSanft(weich);
    setSplit(Math.min(100, Math.max(0, ziel)));
  };

  const umschalten = (fassung: "alt" | "neu") => {
    setSanft(true);
    setSplit(fassung === "alt" ? 0 : 100);
  };

  const { showcase, kleintexte } = seite;
  const kennzeichen = kleintexte.demoKennzeichen;
  const gerundet = Math.round(split);

  // .nur-mit-js: ohne JavaScript passiert beim Druck auf diese Knoepfe
  // nichts, also verschwinden sie. Die Regel dafuer steht in app/layout.tsx,
  // in einem <noscript> und damit nur dort wirksam, wo sie gebraucht wird.
  // Den Vergleich liefert in diesem Fall der <noscript>-Block weiter unten.
  //
  // min-h-12 (48px): der Hero behauptet "Tap-Ziel 48 Pixel" ueber die Seite
  // selbst, und die Demos nennen 26/30 Pixel als Mangel. Ein kleineres
  // Trefferziel hier waere derselbe Fehler, an genau der Stelle, an der man
  // ihn zuerst nachmisst.
  const umschalter = (
    <div className="nur-mit-js flex flex-wrap items-center gap-2">
      <button
        type="button"
        aria-pressed={aktiveFassung === "alt"}
        onClick={() => umschalten("alt")}
        className={cn(
          "mono-label-xs inline-flex min-h-12 cursor-pointer items-center rounded-sm border px-4 transition-colors",
          aktiveFassung === "alt"
            ? "border-accent bg-accent text-accent-contrast"
            : "border-line2 text-soft hover:border-line3 hover:text-ink",
        )}
      >
        {showcase.vorherLabel}
      </button>
      <button
        type="button"
        aria-pressed={aktiveFassung === "neu"}
        onClick={() => umschalten("neu")}
        className={cn(
          "mono-label-xs inline-flex min-h-12 cursor-pointer items-center rounded-sm border px-4 transition-colors",
          aktiveFassung === "neu"
            ? "border-accent bg-accent text-accent-contrast"
            : "border-line2 text-soft hover:border-line3 hover:text-ink",
        )}
      >
        {showcase.nachherLabel}
      </button>
    </div>
  );

  const demoMark = <span className="demo-mark">{kennzeichen.label}</span>;

  return (
    <BefundProvider findings={findings} sichtbar={revealed} listeSichtbar={listeSichtbar}>
      <div ref={rahmenRef} className="w-full">
        {/* Kopfzeile. Im breiten Fenster steht die Beschriftung ueber der
            Seite, zu der sie gehoert: die neue Fassung wird von links
            freigeschnitten, sie liegt also links. Im schmalen Fenster ist die
            Beschriftung zugleich der Umschalter. */}
        {schieberModus ? (
          <div className="mb-3 grid grid-cols-2 items-end gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono-label text-ink">{showcase.nachherLabel}</span>
              {demoMark}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="mono-label text-ink">{showcase.vorherLabel}</span>
              {demoMark}
            </div>
          </div>
        ) : (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            {/* Ohne JavaScript faellt der Umschalter weg, und mit ihm die
                einzige Beschriftung der Flaeche darunter. Sie kommt hier als
                Klartext zurueck, in derselben Bauform wie im breiten
                Fenster. */}
            <noscript>
              <span className="mono-label text-ink">{showcase.vorherLabel}</span>
            </noscript>
            {umschalter}
            {demoMark}
          </div>
        )}

        {schieberModus ? (
          <div
            ref={rahmen}
            className={cn("split ticks grid", sanft && "split-eased")}
            style={{ ["--split" as string]: `${split}%` } as CSSProperties}
          >
            {/* Untere Ebene: die alte Fassung, ungeschnitten. Sie steht als
                erstes Rasterkind im selben Feld wie die neue und bestimmt
                zusammen mit ihr die Hoehe des Rahmens. */}
            <div
              className="alt-fassung col-start-1 row-start-1 min-w-0"
              inert={split >= 100}
              style={{ pointerEvents: split >= 100 ? "none" : undefined }}
            >
              {alt}
            </div>

            {/* Obere Ebene: die neue Fassung, von links freigeschnitten. Der
                weggeschnittene Teil nimmt keine Zeigerereignisse mehr an, dort
                trifft der Klick also die alte Fassung darunter. Deshalb
                braucht nur der vollstaendig verdeckte Fall eine eigene
                Abschaltung. */}
            <div
              className="split-new col-start-1 row-start-1 min-w-0 bg-sheet"
              inert={split <= 0}
              style={{ pointerEvents: split <= 0 ? "none" : undefined }}
            >
              {neu}
            </div>

            {/* Die Naht traegt den Griff. Sie ist selbst pointer-events: none,
                der Griff darin schaltet das fuer sich wieder an. So bekommt
                der Griff die Position und den Uebergang aus globals.css
                geschenkt und muss beides nicht zweimal fuehren. */}
            <div className="split-seam">
              {/* sticky, damit der Griff bei einer hohen Fassung (Variante
                  "voll") nicht in der Mitte des Blocks liegen bleibt, sondern
                  im Blick steht, solange der Rahmen im Blick ist. Der Versatz
                  ist derselbe wie scroll-padding-top in globals.css. */}
              <div className="sticky h-0" style={{ top: "calc(var(--header-h) + 1.5rem)" }}>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label={`${firma}: ${showcase.vorherLabel} und ${showcase.nachherLabel}`}
                  aria-orientation="horizontal"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={gerundet}
                  aria-valuetext={`${gerundet} Prozent ${showcase.nachherLabel}`}
                  onPointerDown={beiZeigerStart}
                  onPointerMove={beiZeigerBewegung}
                  onPointerUp={beiZeigerEnde}
                  onPointerCancel={beiZeigerEnde}
                  onKeyDown={beiTaste}
                  className="pointer-events-auto -ml-[22px] flex h-11 w-11 cursor-ew-resize touch-none items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className="block h-7 w-7 rounded-full border border-accent-contrast bg-accent shadow-lift"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Schmales Fenster: genau eine Fassung im DOM. Beide zu rendern und
          // eine davon zu verstecken waere doppelte Arbeit fuer das Geraet,
          // das ohnehin das langsamste ist.
          <div className="grid">
            {aktiveFassung === "alt" ? (
              <div className="alt-fassung min-w-0">{alt}</div>
            ) : (
              <div className="min-w-0 bg-sheet">{neu}</div>
            )}
          </div>
        )}

        {/* OHNE JAVASCRIPT.
            Auf dem Server liefert useMediaQuery immer false (siehe
            lib/media.ts), es steht also der schmale Zweig da: die alte
            Fassung allein, darueber ein Umschalter, der auf nichts reagiert.
            seite.kleintexte.fehlertexte.keinJavascript verspricht dem
            Besucher aber "beide Fassungen direkt untereinander", und ein
            Versprechen wird gebaut und nicht wegformuliert. Also kommt hier
            die NEUE Fassung nach; die alte steht oben schon im DOM und wird
            nicht gedoppelt.

            Warum das kein zweites Rendern auf dem Client ist: React behandelt
            die Kinder eines <noscript> wie Text (shouldSetTextContent), steigt
            beim Hydrieren also gar nicht erst hinein. Was der Server dort
            ausgibt, bleibt unangetastet stehen und ist bei eingeschaltetem
            JavaScript ohnehin unsichtbar. */}
        <noscript>
          <p className="mt-4 max-w-text text-caption text-faint">
            {kleintexte.fehlertexte.keinJavascript}
          </p>
          <p className="mono-label mt-6 text-ink">{showcase.nachherLabel}</p>
          <div className="mt-3 grid bg-sheet">{neu}</div>
        </noscript>

        {/* Fusszeile: Bedienhinweis, Umschalter als zweiter Weg, das
            Kennzeichen im Klartext, und wo noetig die Befundliste. */}
        <div className="mt-4 space-y-4">
          {schieberModus ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-caption text-faint">{showcase.bedienhinweis}</p>
              {umschalter}
            </div>
          ) : null}

          <p className="text-caption text-faint">{kennzeichen.beschreibung}</p>

          {listeSichtbar ? <BefundListe /> : null}
        </div>
      </div>
    </BefundProvider>
  );
}
