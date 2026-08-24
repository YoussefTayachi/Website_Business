import type { CSSProperties } from "react";
import { seite } from "@/content/seite";

/**
 * Sektion 1: Hero (PLAN.md Abschnitt 5).
 *
 * Aufgabe: in sieben Sekunden klarmachen, was hier passiert. Der Besucher
 * kommt aus einer Kaltakquise-Mail und prueft, ob der Absender ueberhaupt
 * beurteilen kann, was er behauptet hat. Deshalb steht hier genau eine laute
 * Sache, die Ueberschrift, und darunter genau ein Weg, der weiterfuehrt.
 *
 * DER ERSTE DER DREI BEWEGUNGSMOMENTE (PLAN.md Abschnitt 4). Alles laeuft
 * einmal, beim Laden, und ist nach 820 ms fertig:
 *
 *   Raster      .draw-down / .draw-right   820 ms, Start 0 ms
 *   Kicker      .enter-fade                280 ms, Start 0 ms
 *   Zeile 1     .set-line                  560 ms, Start 80 ms
 *   Zeile 2     .set-line                  560 ms, Start 160 ms
 *   Vorspann    .enter-fade                280 ms, Start 300 ms
 *   Wege        .enter-fade                280 ms, Start 380 ms
 *   Messleiste  .enter-fade                280 ms, Start 460 ms
 *
 * Keyframes, Kurven und Dauern stehen fertig in app/globals.css (Abschnitt 6).
 * Hier steht nur, WANN etwas laeuft, nie WIE: eine zweite Kurve neben
 * --ease-standard waere ein zweites System.
 *
 * Reduzierte Bewegung braucht an dieser Stelle nichts: globals.css Abschnitt 7
 * nennt .set-line, .enter-fade, .draw-down und .draw-right ausdruecklich und
 * setzt sie auf ihren Endzustand. Wer das eingestellt hat, sieht dieselbe
 * Seite, nur ohne den Weg dorthin.
 *
 * DAZU DER MESSLAUF, der einzige scrollgesteuerte Moment der Seite
 * (globals.css Abschnitt 6.6). Er ist keine vierte Animation im Sinne des
 * Motion-Budgets, denn er laeuft nicht ab: er wird gefahren. Das Blatt bleibt
 * einen Wisch lang stehen, waehrenddessen laeuft der Maszstab unter den Wegen
 * mit dem Scrollen mit, der Zeiger steht auf dem Fortschritt, zwei Messwerte
 * tauchen auf, und die Eckwinkel fahren aus. Rueckwaerts genauso.
 *
 * Der Aufbau, den die drei Klassen dafuer brauchen, ist eine Kette und darf
 * nicht umgehaengt werden:
 *
 *   .mess-akt     die Hoehe des Moments und die Zeitachse. Kein Scrollbereich
 *                 als Vorfahr, deshalb overflow-clip und nicht overflow-hidden.
 *   .mess-buehne  klebt unter der Kopfleiste, genau einen Bildschirm hoch.
 *   .mess-feld    traegt --mess-p, den Fortschritt 0 bis 1. Alles darin
 *                 rechnet mit calc daraus.
 *
 * Das Raster liegt am Akt und nicht an der Buehne: nur so ist auch der Teil
 * des Akts bedeckt, den ein Handy freilegt, wenn seine Adressleiste
 * verschwindet und das Fenster hoeher wird als 100svh.
 *
 * Die id der Ueberschrift ist der Vertrag mit app/page.tsx: die dortige
 * <section> zeigt per aria-labelledby darauf. Beim Umbauen mitziehen.
 */

/** Startzeitpunkte in einer Tabelle, damit die Staffelung an einer Stelle steht. */
const VORLAUF = {
  kicker: 0,
  zeile: 80,
  zeileSchritt: 80,
  unterzeile: 300,
  wege: 380,
  messleiste: 460,
} as const;

/**
 * Wann im Messlauf ein Messwert auftaucht, als Anteil des Fortschritts.
 *
 * Nicht bei 0 und nicht bei 1: der erste Wert kommt, nachdem der Lauf sichtbar
 * angefangen hat (sonst stuende er von Anfang an da und der Lauf haette nichts
 * freigelegt), der zweite deutlich davor (sonst erschiene er im selben
 * Augenblick, in dem der Pin loslaesst, und niemand saehe ihn stehen).
 * Der Abstand zwischen beiden ist der Rhythmus: zwei Ankuenfte, keine
 * gleichzeitige Einblendung.
 */
const MARKEN = [0.46, 0.74] as const;

/**
 * Die Ueberschrift in ihre Saetze zerlegen.
 *
 * Warum ueberhaupt: .set-line legt je Zeile einen abschneidenden Rahmen an,
 * aus dem der Satz aufsteigt. Zwei Saetze in einem Rahmen stiegen als ein
 * Block auf, und der Moment, fuer den die Displaystufe da ist, waere weg.
 *
 * Warum abgeleitet und nicht zwei feste Zeilen im Code: der Text gehoert
 * content/seite.ts. Steht dort spaeter ein Satz oder stehen dort drei, setzt
 * diese Funktion sie weiterhin richtig, statt eine Zeile zu verschlucken.
 * Bewusst ohne Lookbehind, damit die Zerlegung nicht am Zielwert der
 * TypeScript-Konfiguration haengt.
 */
function satzZeilen(text: string): string[] {
  const treffer = text.match(/[^.!?]+[.!?]*/g);
  if (!treffer) return [text];

  const zeilen = treffer.map((zeile) => zeile.trim()).filter((zeile) => zeile.length > 0);
  return zeilen.length > 0 ? zeilen : [text];
}

/** --enter-delay ist der Griff, den globals.css fuer die Staffelung anbietet. */
function vorlauf(ms: number): CSSProperties {
  return { ["--enter-delay" as string]: `${ms}ms` } as CSSProperties;
}

export default function Hero() {
  const { hero } = seite;
  const zeilen = satzZeilen(hero.headline);

  return (
    // overflow-clip statt overflow-hidden: hidden macht aus diesem Kasten
    // einen Scrollbereich, und ein Scrollbereich als Vorfahr nimmt der Buehne
    // ihr sticky UND der Zeitachse ihren Bezug. Beides scheitert lautlos, die
    // Seite saehe nur wieder aus wie vorher. clip schneidet ab, ohne zu
    // scrollen (globals.css Abschnitt 6.6).
    <div className="mess-akt relative overflow-clip">
      {/* Das Haarlinienraster. Zwei Ebenen derselben Flaeche, weil sich nur so
          die waagerechten Linien nach unten und die senkrechten nach rechts
          zeichnen koennen (globals.css Abschnitt 6.2). Randlos ueber die volle
          Fensterbreite: das ist der Papierbogen, auf dem die Seite steht.
          aria-hidden und pointer-events-none, es ist reine Flaeche. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="rule-grid-h draw-down absolute inset-0" />
        <div className="rule-grid-v draw-right absolute inset-0" />
        {/* Das Raster hoert nicht an einer Kante auf, es laeuft aus. Ohne
            diesen Auslauf zieht die letzte Rasterzeile eine sichtbare Grenze
            quer durch die Seite, und die naechste Sektion saehe aus, als
            begaenne dort ein anderes Dokument. Farbe kommt aus dem Token, der
            Verlauf geht von derselben Farbe mit Deckkraft 0 aus: eine
            Interpolation gegen "transparent" laeuft bei manchen Browsern durch
            Grau. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-paper/0 to-paper" />
      </div>

      {/* Die Buehne. Ohne den Messlauf (schmales Fenster, reduzierte Bewegung,
          Browser ohne Scroll-Timeline) ist das ein gewoehnliches div und der
          Hero verhaelt sich wie zuvor. */}
      <div className="mess-buehne">
        {/* min-h statt fester Hoehe: der Hero fuellt den ersten Bildschirm, aber
            er deckelt nichts. svh und nicht vh, weil vh auf dem Handy die
            eingeblendete Adressleiste ignoriert und der Inhalt dann unter ihr
            steht. Der Abzug ist die Kopfleiste, die im Fluss darueber liegt.
            Genau dieses Mass ist auch die Hoehe der Buehne, damit waehrend des
            Pins nichts unerreichbar unter dem Fensterrand liegt. */}
        <div className="mess-feld relative mx-auto flex min-h-[calc(100svh_-_var(--header-h))] max-w-page flex-col justify-center px-gutter py-section">
          {/* Eckwinkel statt Rahmen: die Klammer, mit der ein Messgeraet seinen
              Anzeigebereich markiert. Eine Stufe leiser als die Vorgabe, sie
              soll das Feld begrenzen und nicht selbst gelesen werden.
              --tick-len haengt am Messlauf: die Klammer fasst waehrend der
              Messung nach, 16 bis 28 Pixel. Das ist der leiseste der drei
              Traeger des Moments und soll es bleiben. */}
          <div
            className="ticks"
            style={
              {
                ["--tick-inset" as string]: "clamp(0.5rem, 2vw, 1.5rem)",
                ["--tick-len" as string]: "calc(16px + var(--mess-p) * 12px)",
                ["--tick-color" as string]: "var(--c-line2)",
              } as CSSProperties
            }
          >
            {/* Der Kicker als Messschild: erst der Strich, dann die
                Beschriftung. Genau die Bauform, in der weiter unten die
                Befunde stehen, damit die Seite von der ersten Zeile an eine
                Sprache spricht. */}
            <p className="enter-fade flex items-center gap-3" style={vorlauf(VORLAUF.kicker)}>
              <span aria-hidden="true" className="block h-px w-10 bg-line3 sm:w-14" />
              <span className="mono-label text-soft">{hero.kicker}</span>
            </p>

            {/* Die eine laute Sache. Das Mass ist nicht die Seitenbreite,
                sondern die Zeile: rund 19 Zeichen der Displaystufe, damit die
                Ueberschrift auch bei 104 Pixeln zwei bis drei Zeilen hat und
                nicht als ein langer Strich ueber den Bildschirm laeuft.
                text-balance verteilt den Rest gleichmaessig, statt ein Wort
                allein auf der letzten Zeile stehen zu lassen. */}
            <h1 id="hero-titel" className="mt-7 max-w-[62rem] text-display-1 text-ink sm:mt-9">
              {zeilen.map((zeile, index) => (
                <span key={zeile} className="set-line">
                  <span
                    className="text-balance"
                    style={vorlauf(VORLAUF.zeile + index * VORLAUF.zeileSchritt)}
                  >
                    {zeile}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="enter-fade mt-7 max-w-text text-lead text-soft"
              style={vorlauf(VORLAUF.unterzeile)}
            >
              {hero.unterzeile}
            </p>

            {/* Zwei Wege, aber nur einer traegt Flaeche. Der Plan verlangt
                einen CTA, der Inhalt liefert zwei: der zweite ist deshalb ein
                Textlink und keine zweite Schaltflaeche gleichen Gewichts. Wer
                zwei gleich laute Knoepfe hinstellt, hat keinen lauten mehr.
                gap-y sorgt dafuer, dass beide im schmalen Fenster
                untereinander genug Luft behalten, ohne dass der Link am Knopf
                klebt. */}
            <div
              className="enter-fade mt-block flex flex-wrap items-center gap-x-8 gap-y-4"
              style={vorlauf(VORLAUF.wege)}
            >
              <a
                href={hero.primaerCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-6 text-body font-medium text-accent-contrast transition-[background-color,transform] duration-[var(--d-quick)] hover:bg-accent-strong active:scale-[0.98]"
              >
                {hero.primaerCta.label}
              </a>

              {/* min-h-11 sind die 44 Pixel Trefferflaeche aus WCAG 2.5.5.
                  Sichtbar bleibt nur die Zeile, die Flaeche liegt darum. */}
              <a
                href={hero.sekundaerCta.href}
                className="link-rule inline-flex min-h-11 items-center text-body text-soft"
              >
                {hero.sekundaerCta.label}
              </a>
            </div>

            {/* DIE MESSLEISTE. Das Geraet, das den Moment traegt.
                Sie steht im Fluss und nicht als aufgelegte Ebene: absolut
                positioniert muesste sie raten, wo der Inhalt aufhoert, und in
                einem niedrigen Fenster laege sie auf den Wegen. So kann sie
                das nie.
                Der Platz der Messwerte ist von Anfang an reserviert, sie sind
                nur durchsichtig. Deshalb springt beim Messlauf nichts.
                max-w: kuerzer als die Seite, sonst liest die Grundlinie sich
                als Trennlinie zur naechsten Sektion statt als Maszstab. */}
            <div
              className="enter-fade mt-block flex max-w-[46rem] flex-wrap items-center gap-x-6 gap-y-3"
              style={vorlauf(VORLAUF.messleiste)}
            >
              {/* Der Maszstab selbst ist Zierde und wird nicht vorgelesen. Was
                  er freilegt, die zwei Messwerte, ist Inhalt und bleibt es
                  auch bei Deckkraft 0.
                  Im schmalen Fenster nimmt er die ganze Zeile und die
                  Messwerte ruecken darunter: bliebe er dort in derselben
                  Zeile, waere er rund 170 Pixel kurz und laege am ersten
                  Messwert an, also weder Maszstab noch Abstand. */}
              <span
                aria-hidden="true"
                className="mess-skala w-full flex-none sm:w-auto sm:min-w-40 sm:flex-1"
              >
                <span className="mess-lauf" />
                <span className="mess-zeiger" />
              </span>

              {hero.messwerte.map((wert, index) => (
                <span
                  key={wert}
                  className="mess-schild mono-label text-soft"
                  // Faellt auf die Mitte zurueck, falls jemand einen dritten
                  // Messwert ergaenzt und die Marke dazu vergisst: der Wert
                  // taucht dann irgendwann auf statt gar nicht.
                  style={{ ["--mess-ab" as string]: String(MARKEN[index] ?? 0.5) } as CSSProperties}
                >
                  {wert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
