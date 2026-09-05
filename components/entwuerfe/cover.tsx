import type { CSSProperties } from "react";

import type { Entwurf } from "@/content/entwuerfe";

import { EntwurfMotiv } from "./entwurf";

/* ============================================================================
   DAS COVER EINES ENTWURFS. Eine Flaeche von 1200 mal 760, die als Bild in
   der Galerie steht, seit dem 2026-09-05.

   WARUM NICHT MEHR DIE AUFNAHME DER SEITE: Youssefs Mentor hat die Galerie
   am 2026-09-03 ein zweites Mal geprueft: "you can keep the grid but the
   images of the website needs to change and the hover/border design needs
   to also be changed". Als Vorbild gab er eine Portfolio-Karte mit, die kein
   Bildschirmfoto zeigt, sondern ein Cover: eine Bildmarke in der Mitte,
   eine Zeile Text darunter, ringsum ein koerniger Farbverlauf. Ein
   Bildschirmfoto auf 50 Prozent zeigt sechs kleine Seiten, ein Cover zeigt
   sechs Marken. Die Seite selbst steht weiterhin unter /work/<slug>, und
   die Karte fuehrt dorthin.

   WAS DAS COVER ZEIGT, KOMMT AUS DEM ENTWURF und ist nichts Zweites: sein
   Motiv (dieselbe Zeichnung wie im Held der Seite), seine Marke in seiner
   Schrift, seine Schlagzeile, seine drei Farben als Ring.
   Wer einen Entwurf in content/entwuerfe.ts aendert, aendert damit sein
   Cover mit; neu aufnehmen mit `node scripts/aufnahmen.mjs --nur cover-*`.

   Der Ring ist Verlauf plus Maske aus Rauschen (cover.css): so entsteht die
   Koernung des Vorbilds ohne Bildmaterial.
   ========================================================================== */

/* Die Motive haben sechs verschiedene Seitenverhaeltnisse und zeichnen mit
   `slice`, also beschnitten. Jedes bekommt einen Kasten in seinem eigenen
   Verhaeltnis, damit die ganze Zeichnung im Bild steht. Werte in Pixeln, bei
   fester Flaeche von 1200 mal 760. */
const KASTEN: Record<Entwurf["bauform"], { w: number; h: number; strich: number }> = {
  overlay: { w: 210, h: 262, strich: 4 },
  seitenleiste: { w: 380, h: 163, strich: 5 },
  mitte: { w: 360, h: 180, strich: 3.5 },
  streifen: { w: 180, h: 270, strich: 12 },
  ueberlappung: { w: 260, h: 303, strich: 4 },
  typo: { w: 300, h: 200, strich: 0 },
};

export default function EntwurfCover({ e }: { e: Entwurf }) {
  const k = KASTEN[e.bauform];
  const stil = {
    "--ew-grund": e.farbe.grund,
    "--ew-flaeche": e.farbe.flaeche,
    "--ew-tinte": e.farbe.tinte,
    "--ew-leise": e.farbe.leise,
    "--ew-akzent": e.farbe.akzent,
    "--ew-bild1": e.farbe.bild1,
    "--ew-bild2": e.farbe.bild2,
    "--ew-display": e.schrift.display,
    "--ew-text": e.schrift.text,
    "--cv-mark-w": `${k.w}px`,
    "--cv-mark-h": `${k.h}px`,
    "--cv-strich": String(k.strich),
  } as CSSProperties;

  return (
    <div className={`cv cv--${e.bauform}`} style={stil}>
      <div className="cv__ring" aria-hidden="true" />
      <div className="cv__ring cv__ring--weich" aria-hidden="true" />
      <div className="cv__korn" aria-hidden="true" />

      <div className="cv__mitte">
        <div className="cv__mark" aria-hidden="true">
          <EntwurfMotiv bauform={e.bauform} />
        </div>
        {/* Zwei Zeilen wie in der Vorlage: die Marke in Tinte, die
            Schlagzeile in der Akzentfarbe. Die Augenbraue stand hier auch,
            aber bei 16px im Bild sind das auf der Karte 7px, und das liest
            niemand. Gestrichen, statt kleiner gemacht. */}
        <p className="cv__marke">{e.marke}</p>
        <p className="cv__zeile">{e.headline}</p>
      </div>
    </div>
  );
}
