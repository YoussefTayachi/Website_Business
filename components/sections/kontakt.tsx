"use client";

import type { CSSProperties } from "react";
import { seite } from "@/content/seite";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/reveal";

/**
 * Sektion 7: Kontakt.
 * Aufgabe (Plan 5): der naechste Schritt. Ein Weg, nicht drei.
 *
 * WARUM JETZT EINE CLIENT COMPONENT. Die frueher hier stehende Begruendung
 * ("ohne Bewegung, das Motion-Budget ist aufgebraucht") ist zurueckgenommen;
 * ausfuehrlich im Kopf von prozess.tsx. "use client" ist der Preis fuer den
 * IntersectionObserver aus lib/reveal.ts.
 *
 * KEIN FORMULAR (Plan 5): ohne Deployment gibt es keinen Empfaenger, und ein
 * Formular, das ins Leere schreibt, waere schlimmer als keines. Stattdessen
 * ein mailto mit vorbereitetem Betreff, und die Adresse zusaetzlich im
 * Klartext: wer kein Mailprogramm eingerichtet hat, kann sie kopieren, statt
 * vor einem Link zu stehen, der nichts tut.
 *
 * Das ist der letzte Bildschirm vor dem Fuss und die einzige Handlung der
 * ganzen Seite, deshalb bekommt er als einzige Flaeche das aufgelegte Blatt
 * (bg-sheet) und den einen Schatten, den globals.css kennt. Der Akzent taucht
 * hier zum zweiten und letzten Mal auf der Startseite auf: einmal im Hero,
 * einmal hier.
 *
 * DIE GRAFISCHE GESTE. Zwei Dinge, und beide meinen dasselbe wie der Akzent:
 * hier zeigt jemand hin.
 *
 * 1. Das Blatt bekommt Eckwinkel (.ticks aus globals.css Abschnitt 5), die
 *    Klammer, mit der ein Messgeraet seinen Anzeigebereich markiert. Sie
 *    liegen AUF dem Blatt, nicht daneben: --tick-inset ist deshalb negativ,
 *    weil .ticks den Wert umkehrt (inset: calc(var(--tick-inset) * -1)).
 * 2. Eine Haarlinie laeuft auf den Knopf zu und endet kurz davor in einem
 *    Zeiger in Akzentfarbe. Derselbe Strich wie .mess-zeiger im Hero, und
 *    dieselbe Bedeutung: der Lauf ist angekommen, hier steht der Wert.
 *
 * DIE GEOMETRIE DER ZEIGERLINIE, ZWEIMAL KORRIGIERT (im Browser geprueft,
 * 1440 und 390 Pixel, hell und dunkel). Beide Fehler waren dieselbe Sorte:
 * die Figur war richtig gedacht und falsch platziert.
 *
 *   FRUEHER lief sie als Winkel von oben herab und knickte auf Knopfhoehe
 *   nach rechts ab. Ihr oberes Ende sass 48 Pixel ueber der Knopfmitte im
 *   freien Raum, angeschlossen an nichts. Ein Zeiger, der nirgends herkommt,
 *   zeigt nicht, er haengt, und die Figur las sich als stehen gebliebene
 *   Klammer. JETZT ist es eine reine Waagerechte, und sie setzt bei x=0 an,
 *   also exakt auf der Textflucht des Blattes: dort beginnen auch die
 *   Abschnittsmarke, die Ueberschrift und der Vorspann. Das ist die
 *   staerkste Flucht dieser Flaeche, und die Linie liegt darauf.
 *
 *   FRUEHER endete die Spitze bei x=63,5, also genau auf der linken Kante des
 *   Knopfes. Der Knopf ist bg-accent, die Spitze text-accent: Akzent auf
 *   Akzent, die einzige Stelle, die "hier" sagen soll, verschwand in der
 *   Flaeche, auf die sie zeigte. JETZT endet der Zeiger bei x=53 und laesst
 *   11 Pixel Papier bis zum Knopf. Er steht auf --c-sheet und hat dort
 *   6,56:1 im Hellen und 4,97:1 im Dunklen.
 *
 * WARUM UNTER sm GAR KEINE LINIE. Bei 390 Pixel Fensterbreite bleiben unter
 * dem Seitenrand der Seite und dem Polster des Blattes rund 300 Pixel. Ein
 * seitlicher Einzug fraesse davon ein Sechstel, und zwar an der einzigen
 * Handlung der Seite; eine Linie von oben muesste den Abstand ueber der
 * Zeile ueberbruecken, und der ist dort auf 32 Pixel zusammengezogen, also
 * zu kurz fuer einen Anlauf und zu lang fuer einen Beruehrungspunkt. Beides
 * war in der ersten Fassung zu sehen und las sich als Zeichenfehler. Eine
 * fehlende Geste ist besser als eine, die wie ein Fehler aussieht: dort
 * tragen die Eckwinkel und der Knopf allein, und die tragen genug.
 *
 * WARUM DIE ECKWINKEL NICHT AUSFAHREN. Ein Ausfahren muesste --tick-len
 * animieren; nicht registrierte Custom Properties interpolieren nicht, und
 * eine @property-Registrierung gehoerte nach globals.css, an der diese Datei
 * nichts zu aendern hat. Stattdessen kommt das ganze Blatt als EIN .reveal
 * herein und bringt seine Klammer mit. Das ist die ehrlichere Bewegung: das
 * Blatt wird aufgelegt, es baut sich nicht auf.
 *
 * DIE STAFFELUNG. Drei Stufen zu 90 ms (Blatt, Handlungszeile, Hinweis), die
 * Linie zeichnet sich ab 200 ms und ist bei 480 ms durch, der Zeiger kommt
 * bei rund 476 ms. Nichts startet spaeter als 500 ms nach Eintritt.
 *
 * OHNE JAVASCRIPT stehen Blatt, Eckwinkel, Knopf, Adresse und Hinweis da:
 * .reveal traegt seinen Startzustand nur unter (scripting: enabled), und
 * .draw-line und .marker-in tun das seit der Ergaenzung in globals.css
 * ebenfalls.
 */

/** Abstand zwischen den Stufen. Budget: 60 bis 90 ms, hoechstens vier Stufen. */
const STAFFEL_MS = 90;

/** Ab wann sich die Zeigerlinie zeichnet. Nach der Handlungszeile, auf die sie zeigt. */
const LINIE_AB_MS = 200;

/**
 * Ab wann der Zeiger steht. .marker-in rechnet --draw-delay plus 70 Prozent
 * der Zeichendauer (globals.css 6.4), mit --d-mid also 280 plus 196 = 476 ms.
 * Die Linie ist bei 480 ms durch. Der Zeiger steht damit am Ende der Linie
 * und nicht schon, waehrend sie noch unterwegs ist: er sitzt hinter einer
 * Luecke, und eine Marke, die vor ihrem eigenen Anlauf auftaucht, liest sich
 * als zweites, unabhaengiges Ding.
 */
const ZEIGER_AB_MS = 280;

/**
 * Die Eckwinkel des Blattes. Eine Stufe leiser als die Vorgabe von .ticks und
 * nach innen versetzt, damit sie die abgerundete Kante des Blattes nicht
 * beruehren.
 */
const KLAMMER: CSSProperties = {
  ["--tick-inset" as string]: "-0.875rem",
  ["--tick-len" as string]: "20px",
  ["--tick-color" as string]: "var(--c-line2)",
} as CSSProperties;

/** Zeichenvorlauf und -dauer der Zeigerlinie, fuer beide Fensterbreiten gleich. */
const LINIE: CSSProperties = {
  ["--draw-delay" as string]: `${LINIE_AB_MS}ms`,
  // 700 ms (--d-draw) sind fuer diese kurze Strecke traege. --d-mid ist der
  // naechste Wert derselben Leiter in globals.css, kein erfundener.
  ["--d-draw" as string]: "var(--d-mid)",
} as CSSProperties;

export default function Kontakt() {
  const { eyebrow, headline, intro, emailLabel, emailAdresse, mailtoBetreff, terminlinkHinweis } =
    seite.kontakt;
  const { ref, revealed } = useReveal<HTMLDivElement>();

  // Der Betreff muss kodiert werden: Doppelpunkt und Leerzeichen sind in einer
  // mailto-Abfrage sonst nicht zuverlaessig, "Anfrage: Website-Neubau" kaeme je
  // nach Mailprogramm zerlegt oder abgeschnitten an.
  const mailtoHref = `mailto:${emailAdresse}?subject=${encodeURIComponent(mailtoBetreff)}`;

  return (
    <div
      ref={ref}
      // is-in am gemeinsamen Vorfahren fuer .draw-line und .marker-in.
      className={cn("mx-auto max-w-page px-gutter py-section", revealed && "is-in")}
    >
      <div
        className={cn(
          "ticks max-w-4xl rounded-md bg-sheet px-6 py-12 shadow-lift sm:px-10 sm:py-14 lg:px-16 lg:py-16",
          "reveal",
          revealed && "is-in",
        )}
        style={KLAMMER}
      >
        <div className="max-w-text">
          {/* Abschnittsmarke in derselben Bauform wie im Hero und in
              befund.tsx. Der Strich steht hier auf dem Blatt statt auf dem
              Tisch, deshalb line3 und nicht heller: er muss auch auf der
              helleren Flaeche noch tragen. */}
          <p className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
            <span className="mono-label text-soft">{eyebrow}</span>
          </p>

          <h2 id="kontakt-titel" className="mt-6 text-display-2 text-balance text-ink">
            {headline}
          </h2>

          <p className="mt-5 text-lead text-soft">{intro}</p>
        </div>

        {/* Die Handlungszeile. sm:pl-16 ist kein Zierabstand, sondern der Platz,
            in dem die Zeigerlinie steht: der Knopf rueckt genau um ihre Breite
            ein. */}
        <div
          className={cn(
            "mt-block flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 sm:pl-16",
            "reveal",
            revealed && "is-in",
          )}
          style={{ ["--reveal-delay" as string]: `${STAFFEL_MS}ms` } as CSSProperties}
        >
          {/* Bezugspunkt der Zeigerlinie: right-full misst gegen die linke
              Kante DIESER Huelle, also gegen die des Knopfes. self-start,
              damit sie im gestapelten Fall nicht ueber die ganze Breite zieht
              und der Bezug zum Knopf verloren geht. */}
          <span className="relative inline-flex self-start sm:self-auto">
            {/* Ab sm: die Waagerechte im Einzug. Feste 64 mal 20 Pixel bei
                gleichem viewBox, also Massstab 1 und keine Verzerrung.
                right-full setzt die rechte Kante des Feldes auf die linke
                Kante des Knopfes, die Breite ist genau der Einzug (sm:pl-16),
                also faellt x=0 auf die Textflucht des Blattes.
                Alle Striche liegen auf halben Koordinaten, damit eine
                1-Pixel-Haarlinie auf ganzen Geraetepixeln sitzt und nicht
                ueber zwei verwischt. */}
            <svg
              aria-hidden="true"
              focusable="false"
              width={64}
              height={20}
              viewBox="0 0 64 20"
              fill="none"
              className="pointer-events-none absolute top-1/2 right-full hidden h-5 w-16 -translate-y-1/2 overflow-visible sm:block"
              style={LINIE}
            >
              {/* Der Anlauf. Setzt auf der Textflucht an und endet vor der
                  Luecke, in der der Zeiger steht. */}
              <path
                className="draw-line text-line3"
                d="M0 10.5 H34"
                pathLength={1}
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
              />
              {/* Der Zeiger, der eine Akzent dieser Figur: ein kurzer Lauf,
                  der in einem Strich endet. Dieselbe Bauform wie .mess-lauf
                  und .mess-zeiger im Hero, nur klein. Er endet bei x=53 und
                  laesst damit 11 Pixel Papier bis zum Knopf: der Akzent muss
                  gegen --c-sheet stehen, gegen die Akzentflaeche des Knopfes
                  haette er keinen Kontrast. */}
              <path
                className="marker-in text-accent"
                d="M40 10.5 H52.5 M52.5 2 V19"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
                style={{ ["--draw-delay" as string]: `${ZEIGER_AB_MS}ms` } as CSSProperties}
              />
            </svg>

            {/* 48 Pixel Mindesthoehe, also ueber den 44 aus WCAG 2.5.5. Dieselben
                Masse wie .nf-cta in globals.css, damit der Knopf der Seite und
                der Knopf in den gezeigten Fassungen dieselbe Hand haben.
                DIESE 48 SIND EINE ZUSAGE: hero.messwerte in content/seite.ts
                nennt "Tap-Ziel 48 Pixel" als Messwert ueber diese Seite. Die
                Zahl darf nach unten nie unterschritten und nach oben nicht
                beilaeufig veraendert werden, sonst steht im Hero eine falsche
                Angabe. Der Seitenabstand ist auf px-6 gewachsen, weil die
                Beschriftung jetzt 19 statt 17 Pixel misst und der Knopf sonst
                enger wirkt als der im Hero, der dieselbe Aufgabe hat.
                Der Fokusring kommt global aus :focus-visible.
                hover: kompiliert Tailwind v4 unter (hover: hover), der Zustand
                bleibt auf dem Handy also nicht nach dem Tippen stehen. */}
            <a
              href={mailtoHref}
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-6 font-medium text-accent-contrast transition hover:bg-accent-strong active:scale-[0.98]"
            >
              {emailLabel}
            </a>
          </span>

          {/* Die Adresse im Klartext. select-all: ein Klick markiert sie
              vollstaendig, ohne dass jemand am Wortanfang zielen muss. */}
          <span className="text-ink select-all">{emailAdresse}</span>
        </div>

        {/* Die bewusst offene Stelle. Ein Satz unter einer Haarlinie statt
            eines toten Knopfes: ein deaktiviertes Bedienelement verspricht
            etwas, das es nicht einloest, ein Hinweis benennt es. */}
        <div
          className={cn("mt-block border-t border-line pt-5", "reveal", revealed && "is-in")}
          style={{ ["--reveal-delay" as string]: `${STAFFEL_MS * 2}ms` } as CSSProperties}
        >
          <p className="max-w-text text-small text-soft">{terminlinkHinweis}</p>
        </div>
      </div>
    </div>
  );
}
