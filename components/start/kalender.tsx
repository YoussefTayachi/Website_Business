"use client";

import { useEffect, useRef, useState } from "react";

import Knopf from "./knopf";
import { start } from "@/content/start";

/* ============================================================================
   DER KALENDER AUF DER SEITE, seit dem 2026-09-05 OHNE KNOPF DAVOR.

   ══ WARUM ES IHN GIBT ══════════════════════════════════════════════════════
   Youssefs Mentor: "have the calendar integrated with your website to reduce
   friction." Jeder Wechsel auf eine fremde Domain kostet Buchungen.

   ══ WARUM KEIN KLICK MEHR DAVOR STEHT ══════════════════════════════════════
   Bis zum 2026-09-05 lag ein Deckel mit "Open the calendar" darueber, und
   der Klick war die Einwilligung nach TDDDG Paragraf 25, weil Calendly beim
   Laden Cookies setzt. Der Mentor in der zweiten Runde: "Integrate the
   calendar to your page without any button to reduce friction." Youssef hat
   das so entschieden.

   WAS DARAUS FOLGT, und was nicht stillschweigend zurueckgebaut werden darf:
   der Kalender laedt jetzt, sobald der Schlussblock in die Naehe des Fensters
   kommt (IntersectionObserver, 600px Vorlauf), ohne Zutun. Der Hinweis unter
   dem Kalender und die zwei Abschnitte in content/seite.ts (Datenschutz,
   "Cookies and embedded content" und "Booking calendar") sagen genau das.
   Wer den Klick wieder davorsetzt, muss beide zurueckschreiben.

   NICHT SCHON MIT DER SEITE: der Rahmen laedt erst kurz vor dem Sichtbar-
   werden. Wer die Seite nach dem Hero verlaesst, hat Calendly nie geladen,
   und der Hero wird nicht von einem fremden Skript ausgebremst.

   ══ WARUM DIE FARBEN MITWANDERN ════════════════════════════════════════════
   Calendly faerbt seinen Rahmen ueber Abfrageparameter in der Adresse. Die
   stehen fest, sobald der Rahmen geladen ist. Ein heller Kalender auf einer
   dunklen Seite ist ein weisses Loch, deshalb horcht die Komponente auf die
   Klasse an <html> und baut die Adresse neu, wenn der Modus wechselt.
   ========================================================================== */

/** Die Grundadresse. Dieselbe wie der Link darunter, nur eingebettet. */
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
  const huelle = useRef<HTMLDivElement>(null);
  const [nah, setzeNah] = useState(false);
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

  // Laden, sobald der Block 600px vor dem Fenster steht. Einmal geladen
  // bleibt geladen: ein Kalender, der beim Zurueckscrollen verschwindet,
  // waere ein Fehler und kein Sparen.
  useEffect(() => {
    const el = huelle.current;
    if (!el || nah) return;
    if (!("IntersectionObserver" in window)) {
      setzeNah(true);
      return;
    }
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setzeNah(true);
          o.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [nah]);

  return (
    <div ref={huelle}>
      <div className="st-kal">
        {nah ? (
          <iframe
            // key erzwingt einen neuen Rahmen, wenn der Modus wechselt. Ohne
            // ihn aendert React nur das src-Attribut, und Chrome traegt das in
            // die Verlaufsliste ein: der Zurueck-Knopf des Browsers landete
            // dann im Kalender statt auf der vorigen Seite.
            key={dunkel ? "dark" : "light"}
            className="st-kal__rahmen"
            src={adresse(dunkel)}
            title={t.rahmen}
          />
        ) : (
          /* Bis der Rahmen da ist, steht ein angedeuteter Monat an seiner
             Stelle, in derselben Hoehe: der Abschnitt springt nicht, wenn
             Calendly kommt. nur-mit-js, weil ohne JavaScript nie etwas kommt
             und dann der <noscript>-Knopf darunter der Weg ist. */
          <div className="st-kal__laedt nur-mit-js" role="status">
            <div className="st-kal__gitter" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  data-frei={i % 7 === 2 || i % 9 === 4 ? "" : undefined}
                  style={{ ["--i" as string]: i }}
                />
              ))}
            </div>
            <p className="st-kal__hinweis">{t.laedt}</p>
          </div>
        )}

        <noscript>
          <div className="st-kal__laedt">
            <Knopf href={t.direkt.href} extern>
              {t.direkt.label}
            </Knopf>
          </div>
        </noscript>
      </div>

      {/* Der Hinweis gehoert UNTER den Kalender und nicht in die
          Datenschutzerklaerung allein: wer hier bucht, soll an der Stelle
          lesen koennen, dass ein Dritter laedt. */}
      <p className="st-kal__fuss">
        {t.hinweis}{" "}
        <a className="st-kal__direkt" href={t.direkt.href} target="_blank" rel="noreferrer">
          {t.direkt.label}
        </a>
      </p>
    </div>
  );
}
