"use client";

import { useEffect, useState } from "react";

import Knopf from "./knopf";
import { start } from "@/content/start";

/* ============================================================================
   DER KALENDER AUF DER SEITE.

   ══ WARUM ES IHN GIBT ══════════════════════════════════════════════════════
   Youssefs Mentor: "For the CTA, have the calendar integrated with your
   website to reduce friction." Das stimmt: jeder Wechsel auf eine fremde
   Domain kostet Buchungen, und calendly.com sieht nicht aus wie diese Seite.
   Wer dort landet, muss sich neu zurechtfinden, und ein Teil geht nicht
   zurueck.

   ══ WARUM EIN KLICK DAVOR STEHT ════════════════════════════════════════════
   Der Kalender kommt von Calendly, einem Dritten, und setzt beim Laden dessen
   Cookies. Ein Betrieb mit deutschem Impressum darf so etwas nach TDDDG
   Paragraf 25 nicht ungefragt nachladen. Der Klick IST die Einwilligung.

   Er kostet einen Klick statt eines Seitenwechsels: der Kalender oeffnet sich
   an Ort und Stelle, niemand verlaesst die Seite, und der Weg zu
   calendly.com steht daneben fuer alle, die das lieber tun. Damit ist die
   Reibung kleiner als vorher und nicht groesser.

   WER DAS ANDERS BEWERTET, aendert genau eine Zeile: `useState(false)` unten
   auf `useState(true)`. Dann laedt der Kalender sofort, und der Absatz in
   content/seite.ts (Datenschutz) muss entsprechend angepasst werden.

   ══ WARUM DIE FARBEN MITWANDERN ════════════════════════════════════════════
   Calendly faerbt seinen Rahmen ueber Abfrageparameter in der Adresse. Die
   stehen fest, sobald der Rahmen geladen ist. Ein heller Kalender auf einer
   dunklen Seite ist ein weisses Loch, deshalb horcht die Komponente auf die
   Klasse an <html> und baut die Adresse neu, wenn der Modus wechselt. Das
   kostet ein Nachladen des Rahmens, und das ist der richtige Tausch: den
   Modus wechselt man selten, den Kalender sieht man die ganze Zeit.

   loading="lazy" ist kein Detail. Ohne das laedt der Rahmen mit der Seite,
   also weit oberhalb der Stelle, an der ihn jemand braucht.
   ========================================================================== */

/** Die Grundadresse. Dieselbe wie der Knopf daneben, nur eingebettet. */
const BASIS = "https://calendly.com/youssef-tayachi-frostbreaker/30min";

/* Die Farben stehen hier als nackte Werte und nicht als Token, und das ist
   kein Versehen: Calendly nimmt sie als Zeichenkette in einer URL entgegen.
   Eine CSS-Variable kann dort nicht stehen. Gewaehlt sind die Werte der
   Tokens --c-paper, --c-ink und --c-accent aus app/globals.css. */
const FARBEN = {
  light: { background: "fbfbfa", text: "1c1b19", primary: "0369a1" },
  dark: { background: "191a1f", text: "ededea", primary: "38bdf8" },
} as const;

function adresse(dunkel: boolean) {
  const f = FARBEN[dunkel ? "dark" : "light"];
  const p = new URLSearchParams({
    hide_gdpr_banner: "1",
    hide_landing_page_details: "1",
    background_color: f.background,
    text_color: f.text,
    primary_color: f.primary,
  });
  return `${BASIS}?${p.toString()}`;
}

export default function Kalender() {
  const [geladen, setzeGeladen] = useState(false);
  const [dunkel, setzeDunkel] = useState(false);
  const t = start.schluss.kalender;

  // Den Modus erst nach der Hydration lesen. Beim Rendern auf dem Server gibt
  // es kein <html class>, und ein geratener Wert waere ein Aufblitzen.
  useEffect(() => {
    const lies = () => setzeDunkel(document.documentElement.classList.contains("dark"));
    lies();

    const beobachter = new MutationObserver(lies);
    beobachter.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => beobachter.disconnect();
  }, []);

  if (!geladen) {
    return (
      <div className="st-kal st-kal--zu">
        {/* nur-mit-js: ohne JavaScript kann dieser Knopf nichts oeffnen, und
            ein Knopf, der auf nichts reagiert, ist schlimmer als kein Knopf.
            Der Schalter dafuer ist das <noscript>-Stylesheet in
            app/layout.tsx, also eine Regel, die der Browser nur anwendet,
            wenn JavaScript wirklich aus ist. */}
        <div className="st-kal__deckel nur-mit-js">
          {/* Ein angedeuteter Kalender. Zierde, also aria-hidden: er zeigt,
              WAS sich hinter dem Knopf oeffnet, und ist kein Inhalt. */}
          <div className="st-kal__gitter" aria-hidden="true">
            {/* Die freien Tage leuchten nacheinander auf (start.css): der
                Monat wirkt so, als taete sich etwas, bevor jemand klickt. */}
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                data-frei={i % 7 === 2 || i % 9 === 4 ? "" : undefined}
                style={{ ["--i" as string]: i }}
              />
            ))}
          </div>

          <Knopf onClick={() => setzeGeladen(true)}>{t.knopf}</Knopf>

          <p className="st-kal__hinweis">{t.hinweis}</p>

          <a className="st-kal__direkt" href={t.direkt.href} target="_blank" rel="noreferrer">
            {t.direkt.label}
          </a>
        </div>

        <noscript>
          <div className="st-kal__deckel">
            <Knopf href={t.direkt.href} extern>
              {t.direkt.label}
            </Knopf>
          </div>
        </noscript>
      </div>
    );
  }

  return (
    <div className="st-kal">
      <iframe
        // key erzwingt einen neuen Rahmen, wenn der Modus wechselt. Ohne ihn
        // aendert React nur das src-Attribut, und Chrome traegt das in die
        // Verlaufsliste ein: der Zurueck-Knopf des Browsers landete dann im
        // Kalender statt auf der vorigen Seite.
        key={dunkel ? "dark" : "light"}
        className="st-kal__rahmen"
        src={adresse(dunkel)}
        title={t.rahmen}
        loading="lazy"
      />
    </div>
  );
}
