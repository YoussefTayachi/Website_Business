"use client";

import { useId } from "react";
import { projekte } from "@/content/projekte";
import { BefundAnker } from "@/components/showcase/befund-marker";

/**
 * Kanzlei Musterberg, alte Fassung.
 *
 * Die dritte Variante desselben Baukastens: die "seriöse". Times New Roman
 * durchgehend, Marineblau, alles mittig ausgerichtet, ein Handschlag-Klischee
 * ueber die halbe Startseite und darunter eine Textwand in 11 Pixeln.
 *
 * Alle Stile stehen in app/globals.css unter .alt-blatt[data-demo="kanzlei"].
 * Die Wurzel hier ist .alt-blatt und nicht .alt-fassung: die Huelle setzt
 * vorher-nachher.tsx, zwei ineinander waeren zwei Bildlaufbereiche.
 *
 * Die vier Befunde aus content/projekte.ts, gebaut statt behauptet:
 *   [0] Textwueste ohne Absaetze -> alle Absaetze laufen zu EINEM Block
 *                                   zusammen, ohne Zwischenueberschrift und
 *                                   ohne Absatzabstand, im Blocksatz
 *   [1] Schrift 11 Pixel         -> font-size: 11px, Times New Roman
 *   [2] Kein Terminweg vorhanden -> die einzige Kontaktaufforderung steht als
 *                                   blasser Textlink am Fuss der Spalte,
 *                                   ohne Sprechzeiten
 *   [3] Stockfoto-Klischee       -> eine GEBAUTE Handschlag-Grafik (SVG,
 *                                   keine Datei, kein fremdes Foto), die die
 *                                   halbe Startseite fuellt
 *
 * OFFEN, bewusst nicht selbst geloest: der Befund [0] spricht von fuenfzehn
 * Zeilen Fliesstext. `alteFassung.absaetze` traegt zwei Saetze, die in der
 * gebauten Spalte auf rund sechs Zeilen kommen. Der Block ist so gebaut, dass
 * er JEDEN Eintrag aus `absaetze` verschluckt: sobald der copywriter dort
 * verlaengert, waechst die Wand mit, ohne dass hier eine Zeile geaendert
 * werden muss. Text dazuzuerfinden waere der falsche Weg gewesen.
 */

const projekt = projekte["kanzlei-musterberg"];
const alt = projekt.alteFassung;

function stopNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}

export default function KanzleiMusterbergAlt() {
  // Eindeutige Verlaufs-ID: es koennen mehrere Demos gleichzeitig im DOM
  // stehen, und zwei gleiche SVG-IDs auf einer Seite sind ungueltig.
  const gradientId = "stock-" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className="alt-blatt" data-demo="kanzlei">
      <div className="alt-seite">
        <div className="alt-kopf alt-kopf--mittig">
          <div>
            <div className="alt-logo">{alt.ueberschrift}</div>
            <div className="alt-klein">{alt.unterzeile}</div>
          </div>
        </div>

        <ul className="alt-nav">
          {alt.navigation.map((n) => (
            <li key={n.label}>
              <a href={n.href} onClick={stopNavigation}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* BEFUND [3]: das Handschlag-Klischee. Vollstaendig als SVG gebaut,
            damit hier keine fremde Bilddatei liegt. Absichtlich generisch:
            zwei Aermel, zwei Haende, kein Bezug zur Kanzlei. Das helle
            Diagonalband ist der Rest, an dem man ein Vorschaubild aus einer
            Bilddatenbank erkannte.
            aria-hidden, weil die Bildunterschrift darunter dasselbe sagt. */}
        <div className="alt-spalten alt-spalten--breit">
          <div>
            {/* Der graue Grund kommt aus .alt-bildplatz und nicht aus dem SVG:
                das SVG behaelt sein Seitenverhaeltnis (xMidYMid meet) und
                steht deshalb in seiner Groesse mittig auf einer viel
                breiteren Flaeche. Genau so sah damals ein Bild aus, das
                jemand kleiner eingebunden hat, als der Platz war. */}
            <div className="alt-bildplatz alt-bildplatz--gross">
              <svg viewBox="0 0 420 200" width="100%" height="200" aria-hidden="true">
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#bcbcbc" />
                    <stop offset="1" stopColor="#8d8d8d" />
                  </linearGradient>
                </defs>

                {/* Die beiden Unterarme, schraeg von unten. Der Winkel traegt
                    das Bild: erst die zwei aufsteigenden Diagonalen machen
                    aus zwei grauen Formen einen Handschlag. */}
                <path
                  d="M-2 175 L22 225 L207 135 L183 85 Z"
                  fill={`url(#${gradientId})`}
                  stroke="#8a8a8a"
                  strokeWidth="2"
                />
                <path
                  d="M422 175 L398 225 L213 135 L237 85 Z"
                  fill={`url(#${gradientId})`}
                  stroke="#8a8a8a"
                  strokeWidth="2"
                />
                {/* Manschetten am aeusseren Ende */}
                <path d="M-2 175 L22 225 L100 187 L76 137 Z" fill="#5b5b5b" />
                <path d="M422 175 L398 225 L320 187 L344 137 Z" fill="#5b5b5b" />

                {/* Die ineinandergelegten Haende. Dieselbe Neigung wie die
                    Arme, sonst sitzt der Griff schief auf dem Handgelenk. */}
                <g transform="rotate(-26 210 110)">
                  <rect
                    x="162"
                    y="72"
                    width="96"
                    height="76"
                    rx="26"
                    fill="#c6c6c6"
                    stroke="#888888"
                    strokeWidth="2"
                  />
                  <path
                    d="M176 93 h66 M172 110 h70 M176 127 h66"
                    stroke="#888888"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Daumen, obenauf gelegt */}
                  <path
                    d="M186 73 q30 -20 58 -6 q10 5 3 13 q-12 12 -34 8 q-21 -4 -27 -15 Z"
                    fill="#d8d8d8"
                    stroke="#888888"
                    strokeWidth="2"
                  />
                </g>

                {/* Das helle Band einer Bilddatenbank-Vorschau */}
                <rect
                  x="-40"
                  y="162"
                  width="500"
                  height="18"
                  fill="#ffffff"
                  opacity="0.28"
                  transform="rotate(-7 210 100)"
                />
              </svg>
            </div>
            <p className="alt-bildunterschrift">
              {alt.stockGrafikBeschriftung}
              <BefundAnker index={3} />
            </p>
          </div>
        </div>

        <div className="alt-spalten">
          <div className="alt-sidebar alt-sidebar--links">
            <ul className="alt-nav-seite">
              {alt.navigation.map((n) => (
                <li key={n.label}>
                  <a href={n.href} onClick={stopNavigation}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Drei Befunde in einer Spalte. [1] und [0] haengen beide am ENDE
              der Textwand und schlagen in entgegengesetzte Richtungen aus,
              [2] am Kontaktlink darunter.
              Warum beide am Ende und nicht einer am Anfang: die Wand steht im
              Blocksatz. Am Anfang einer Blocksatzzeile zaehlt der Anker als
              eigenes Wort, und der Blocksatz schiebt eine sichtbare Luecke
              dahinter, die es ohne Messschild nicht gaebe. Die letzte Zeile
              eines Absatzes wird nicht mehr ausgetrieben und hat das Problem
              nicht. Die verschiedenen Laengen halten die beiden Schilder
              auseinander. */}
          <div className="alt-inhalt">
            <p className="alt-fliess alt-fliess--11">
              {alt.absaetze.join(" ")}
              <BefundAnker index={1} richtung="links" laenge={84} />
              <BefundAnker index={0} />
            </p>

            {/* BEFUND [2]: kein Terminweg. Kein Knopf, kein Kalender, keine
                Sprechzeit. Ein Textlink in Fusszeilengroesse. */}
            <p className="alt-klein">
              <a href="#" onClick={stopNavigation}>
                {alt.ctaLabel}
              </a>
              <BefundAnker index={2} />
            </p>
          </div>
        </div>

        <div className="alt-fuss">
          <span className="alt-zaehler" aria-hidden="true">
            {"012345".split("").map((ziffer, i) => (
              <span key={i}>{ziffer}</span>
            ))}
          </span>
          <div className="alt-fuss-zeile">© 2014</div>
          <div>{alt.fusszeile}</div>
        </div>
      </div>
    </div>
  );
}
