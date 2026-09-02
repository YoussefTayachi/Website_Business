"use client";

import { useEffect, useState } from "react";

import Knopf from "./knopf";
import { start } from "@/content/start";

/**
 * DIE TELEFONLEISTE. Ein Knopf am unteren Rand, nur unter 48rem
 * (start.css), und nur zwischen Hero und Schlussblock.
 *
 * WARUM: die Kopfleiste traegt auf dem Telefon keinen Knopf (nachgerechnet
 * in start.css), und der Knopf im Hero ist nach dem ersten Wisch aus dem
 * Bild. Von der Galerie bis zur Person, also ueber vier Bildschirme, gab es
 * damit keinen Weg zur Buchung. Jetzt haengt einer unten.
 *
 * ZWEI BEOBACHTER statt eines Scroll-Horchers: einer auf dem Hero (Leiste
 * erscheint, sobald er das Bild verlaesst), einer auf dem Schlussblock
 * (Leiste verschwindet, sobald der Kalender im Bild ist, denn dort steht
 * der Weg schon, und zwei Knoepfe fuer dasselbe Ziel uebereinander sind
 * einer zu viel). IntersectionObserver kostet nichts pro Bild, ein
 * Scroll-Horcher schon.
 *
 * Ohne JavaScript gibt es die Leiste nicht (sie wird erst nach der
 * Hydration eingehaengt), und das ist richtig: ohne Skript gibt es auch
 * keinen Beobachter, der sie wieder wegnaehme.
 */
export default function MobilCta() {
  const [heroWeg, setzeHeroWeg] = useState(false);
  const [schlussDa, setzeSchlussDa] = useState(false);
  const { label, href } = start.mobilCta;

  useEffect(() => {
    const hero = document.querySelector(".st-hero");
    const schluss = document.getElementById(start.schluss.id);
    if (!hero || !schluss) return;

    const bHero = new IntersectionObserver(([e]) => setzeHeroWeg(!e.isIntersecting), {
      threshold: 0,
    });
    const bSchluss = new IntersectionObserver(([e]) => setzeSchlussDa(e.isIntersecting), {
      // Der Kalender soll erst gelten, wenn ein Stueck davon wirklich da
      // ist, nicht beim ersten Pixel.
      rootMargin: "0px 0px -20% 0px",
    });
    bHero.observe(hero);
    bSchluss.observe(schluss);
    return () => {
      bHero.disconnect();
      bSchluss.disconnect();
    };
  }, []);

  const sichtbar = heroWeg && !schlussDa;

  return (
    // Sichtbarkeit und Tastaturreihenfolge regelt start.css ueber
    // visibility: eine unsichtbare Leiste darf keinen Tabstopp tragen.
    <div className="st-mobil" {...(sichtbar ? { "data-da": "" } : {})}>
      <Knopf href={href} className="st-mobil__knopf">
        {label}
      </Knopf>
    </div>
  );
}
