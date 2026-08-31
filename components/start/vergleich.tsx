"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { start } from "@/content/start";

/**
 * Der Vergleich zweier Aufnahmen derselben Seite, vorher und nachher.
 *
 * DAS IST DAS ARGUMENT DIESER SEITE. Wer Website-Redesign verkauft, kann
 * schlecht behaupten, dass es besser wird, und es dann nicht zeigen.
 *
 * Zur Regel "kein Vorher/Nachher-Regler" aus Lehren/checkliste.md: die gilt
 * fuer den ENTWURF, DER AN EINEN LEAD GEHT. Dort ist der Prototyp die
 * Website, und die Argumentation gehoert in die Mail. Hier ist es umgekehrt,
 * das hier IST die Argumentation.
 *
 * WARUM EIN NATIVES input[type=range] UND KEIN SELBSTGEBAUTER WISCHER:
 * ein selbstgebauter hat keinen angesagten Wert, keine Tastaturbedienung
 * ohne Nacharbeit, keinen Zustand, den Hilfsmittel verstehen, und keine
 * Wiederholrate beim Halten einer Pfeiltaste. Das Feld liegt deckungsgleich
 * ueber dem Bild und ist bis auf seinen Griff unsichtbar.
 *
 * DIE ZEILE, AUF DIE ES ANKOMMT, steht in start.css: touch-action: pan-y.
 * Ohne sie faengt der Regler auf dem Telefon die senkrechte Wischgeste ab,
 * und man kommt an der Karte nicht mehr vorbei.
 *
 * aria-valuetext SAGT DEN ZUSTAND IN WORTEN. Ein Screenreader liest sonst
 * "50" vor, und niemand weiss, ob das viel oder wenig alte Seite ist.
 *
 * ZWEI SPRUNGKNOEPFE, damit Ziehen nie der einzige Weg ist. Wer eine
 * Feinmotorik-Einschraenkung hat oder einfach nur schnell beides sehen will,
 * springt.
 *
 * OHNE JAVASCRIPT wird das hier nicht gerendert (.nur-mit-js in
 * app/layout.tsx), stattdessen stehen beide Aufnahmen als zwei beschriftete
 * Figuren untereinander. Die stehen in gegenueber.tsx, nicht hier: sie sind
 * kein Teil des Reglers, sie sind sein Ersatz.
 */
export default function Vergleich({
  vorher,
  nachher,
  altVorher,
  altNachher,
  adresse,
}: {
  vorher: StaticImageData;
  nachher: StaticImageData;
  altVorher: string;
  altNachher: string;
  /** Musteradresse fuer die Adresszeile des Browserrahmens. */
  adresse: string;
}) {
  const [p, setzeP] = useState(50);
  const t = start.vergleich.regler;

  const ansage = p <= 0 ? t.ansageVorher : p >= 100 ? t.ansageNachher : t.ansageMitte(p);

  return (
    <div className="nur-mit-js">
      <div className="st-rahmen">
        {/* Reine Zierde, deshalb aria-hidden: die drei Punkte sind das Bild
            eines Fensters und kein Bedienelement, und die Adresse steht in
            keinem Zusammenhang, den ein Vorleser braucht. */}
        <div className="st-rahmen__leiste" aria-hidden="true">
          <span className="st-rahmen__punkte">
            <span className="st-rahmen__punkt" />
            <span className="st-rahmen__punkt" />
            <span className="st-rahmen__punkt" />
          </span>
          <span className="st-rahmen__adresse">{adresse}</span>
        </div>

        <div className="st-vgl" style={{ ["--p" as string]: p }}>
          {/* Die alte Fassung liegt unten und ganzflaechig. Die neue liegt
              darueber und wird von links freigegeben. */}
          <Image
            className="st-vgl__bild"
            src={vorher}
            alt={altVorher}
            sizes="(min-width: 72rem) 72rem, 100vw"
          />

          <div className="st-vgl__nachher">
            <Image
              className="st-vgl__bild"
              src={nachher}
              alt={altNachher}
              sizes="(min-width: 72rem) 72rem, 100vw"
            />
          </div>

          <div className="st-vgl__kante" aria-hidden="true" />
          <div className="st-vgl__griff" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9 6 4 12l5 6zM15 6l5 6-5 6z" />
            </svg>
          </div>

          <div className="st-vgl__marken" aria-hidden="true">
            <span className="st-vgl__marke">{t.vorher}</span>
            <span className="st-vgl__marke">{t.nachher}</span>
          </div>

          <input
            className="st-vgl__regler"
            type="range"
            min={0}
            max={100}
            step={1}
            value={p}
            onChange={(e) => setzeP(Number(e.target.value))}
            aria-label={t.label}
            aria-valuetext={ansage}
          />
        </div>
      </div>

      <div className="st-vgl__sprung">
        <button type="button" className="st-sprung" onClick={() => setzeP(0)}>
          {t.vorher}
        </button>
        <button type="button" className="st-sprung" onClick={() => setzeP(100)}>
          {t.nachher}
        </button>
      </div>
    </div>
  );
}
