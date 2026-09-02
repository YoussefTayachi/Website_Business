/* ============================================================================
   PRUEFBILDER. Nimmt die Startseite in vier Zustaenden auf und meldet
   waagerechten Ueberlauf.

       node scripts/pruefbilder.mjs [ZIELORDNER]

   Vorbedingung ist ein laufender Dev- oder Produktionsserver. Standard ist
   http://localhost:3210, anders ueber BASIS.

   WARUM ES DAS GIBT: "sieht gut aus" ist keine Pruefung. Diese vier Bilder
   beantworten in einem Lauf, ob die Seite hell und dunkel steht, ob sie bei
   390 und bei 1440 steht, und ob irgendwo waagerecht gescrollt wird.

   ZWEI DINGE, DIE HIER GELERNT WURDEN und ohne die die Bilder luegen:

   0. NICHT NUR `scrollWidth` PRUEFEN. Siehe die Begruendung unten an der
      Messstelle: `overflow-x: clip` macht diesen Wert blind.

   1. VOLLSTAENDIG SCROLLEN, DANN ZURUECK. Die Abschnitte blenden ueber einen
      IntersectionObserver ein. Wer nur oben aufnimmt, fotografiert leere
      Flaechen und haelt sie fuer einen Fehler.

   2. AUF JEDES BILD WARTEN. next/image laedt unterhalb der Falz erst beim
      Hineinscrollen nach. Beim ersten Durchlauf sah der Vergleich deshalb
      aus wie ein kaputter, leerer Rahmen, obwohl er im Browser einwandfrei
      lief. `document.images` durchzugehen kostet nichts und schliesst
      diesen Irrtum aus.

   `reducedMotion: "reduce"` ist Absicht: unter dieser Einstellung zeigt die
   Seite ihre ENDZUSTAENDE, und genau die gehoeren auf ein Pruefbild. Ein
   Screenshot mitten im Uebergang ist unbrauchbar. Nebenbei prueft der Lauf
   damit auch, dass die reduzierte Fassung ueberhaupt vollstaendig ist.
   ========================================================================== */

import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(
  path.resolve("scrollcraft/builds/casefile/node_modules/playwright-core"),
);

const BASIS = process.env.BASIS ?? "http://localhost:3210";
const ZIEL = process.argv[2] ?? "pruefbilder";

const BREITEN = [
  { name: "1440-hell", breite: 1440, hoehe: 900, schema: "light" },
  { name: "1440-dunkel", breite: 1440, hoehe: 900, schema: "dark" },
  { name: "390-hell", breite: 390, hoehe: 844, schema: "light" },
  { name: "390-dunkel", breite: 390, hoehe: 844, schema: "dark" },
];

/* SEIT DEM 2026-09-01 WIRD MEHR ALS DIE STARTSEITE GEPRUEFT. Die Entwuerfe
   stehen jetzt unter /work/[slug] als echte Seiten, und jede bringt ihre
   eigene Bauform mit. Genau dort ist ein Ueberlauf am wahrscheinlichsten:
   .ew-ub__bild laeuft absichtlich aus dem Fenster, .ew-sl haelt eine feste
   296px-Spalte, und beides muss auf 390px trotzdem sitzen.

   Nicht alle sechs: zwei Bauformen decken die zwei riskanten Muster ab
   (feste Spalte, absichtliches Herauslaufen). Wer eine dritte riskante
   Bauform baut, ergaenzt hier eine Zeile. */
const SEITEN = [
  { pfad: "/", kuerzel: "seite" },
  { pfad: "/work/voltas", kuerzel: "work-voltas" },
  { pfad: "/work/stoneleaf", kuerzel: "work-stoneleaf" },
];

const FAELLE = SEITEN.flatMap((s) =>
  BREITEN.map((b) => ({ ...b, pfad: s.pfad, name: `${s.kuerzel}-${b.name}` })),
);

await mkdir(ZIEL, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
let fehler = 0;

try {
  for (const f of FAELLE) {
    const kontext = await browser.newContext({
      viewport: { width: f.breite, height: f.hoehe },
      deviceScaleFactor: 2,
      colorScheme: f.schema,
      reducedMotion: "reduce",
      isMobile: f.breite < 500,
      hasTouch: f.breite < 500,
    });
    const page = await kontext.newPage();
    await page.goto(BASIS + f.pfad, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      window.scrollTo(0, 0);
    });

    await page.waitForFunction(
      () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      null,
      { timeout: 30000 },
    );
    await page.waitForTimeout(900);

    await page.screenshot({ path: path.join(ZIEL, `${f.name}.png`), fullPage: true });

    /* ZWEI PRUEFUNGEN, UND DIE ZWEITE IST DIE WICHTIGE.
     *
     * `scrollWidth - clientWidth` findet nur Ueberlauf, der die Seite
     * waagerecht scrollen laesst. Diese Seite traegt aber `overflow-x: clip`
     * auf `.st-page`, weil die Riesentypografie in schmalen Fenstern gern
     * ueber den Rand laeuft. Damit ist der Wert IMMER 0, und zwar auch dann,
     * wenn ein Bedienelement zur Haelfte abgeschnitten am Rand klebt.
     *
     * Genau das ist am 2026-08-31 passiert: die Modus-Gruppe ragte bei 390px
     * fuenf Pixel aus dem Fenster, "Dark" war angeschnitten, und dieser Lauf
     * meldete vier von vier Breiten in Ordnung. Der Nutzer hat es auf seinem
     * Telefon gesehen, das Skript nicht.
     *
     * Die zweite Pruefung sucht deshalb ELEMENTE, deren rechte Kante hinter
     * dem Fensterrand liegt. `aria-hidden` bleibt aussen vor: Zierde wie der
     * Lichtverlauf im Hero ragt absichtlich hinaus und wird absichtlich
     * beschnitten. Was eine Bedeutung hat, darf es nicht.
     */
    const ueberlauf = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    const abgeschnitten = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const treffer = [];
      /* Was in einem BESCHNITTENEN Kasten liegt, der selbst im Fenster
         steht, darf hinausragen: das Laufband der Gewerke (2026-09-02)
         schiebt seine Spur absichtlich aus dem Bild, und der Kasten darum
         schneidet sie ab. Gemeldet wird nur, was der Besucher wirklich
         abgeschnitten SIEHT, also der Kasten selbst, falls er ueber den
         Rand ragt. */
      const beschnitten = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o === "hidden" || o === "clip") {
            const pr = p.getBoundingClientRect();
            return pr.right <= vw + 1 && pr.left >= -1;
          }
        }
        return false;
      };
      for (const el of document.querySelectorAll("body *")) {
        if (el.closest("[aria-hidden='true']")) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if ((r.right > vw + 1 || r.left < -1) && !beschnitten(el)) {
          treffer.push({
            was: (el.getAttribute("class") || el.tagName).toString().split(" ")[0],
            rechts: Math.round(r.right),
            links: Math.round(r.left),
          });
        }
      }
      // Nur die aeussersten melden: ein zu breites Element schleppt seine
      // Kinder mit, und zwanzig Zeilen fuer einen Fehler helfen niemandem.
      return treffer.slice(0, 5);
    });

    /* DRITTE PRUEFUNG: EIN WORT, DAS BREITER IST ALS SEINE SPALTE.
     *
     * DER ERSTE ANLAUF WAR FALSCH, und das gehoert hierher, damit ihn niemand
     * wiederholt: `scrollWidth > clientWidth` findet nichts. Bei
     * `overflow: visible` meldet Chrome scrollWidth gleich clientWidth, und
     * ausserdem BRICHT der Browser das zu lange Wort, statt es ueberstehen zu
     * lassen. Der Schaden ist also kein Ueberlauf, sondern ein Umbruch mitten
     * im Wort: "Maintenanc" in der einen Zeile, "e" in der naechsten. So stand
     * es am 2026-09-01 bei 390px in der Ablaufliste, gesetzt in 28px in einer
     * 161px breiten Spalte.
     *
     * Gemessen wird deshalb das laengste Wort gegen den verfuegbaren Platz,
     * mit derselben Schrift, in der es gesetzt ist. Nur die EIGENEN Textknoten
     * eines Elements: `textContent` klebt Kindelemente ohne Leerzeichen
     * aneinander, und "frostbreaker" plus "marketing" ergaebe ein Wort mit 21
     * Zeichen, das es nie gab.
     *
     * Gegengeprueft: bei 34px meldet der Lauf "Onboarding" und "Maintenance",
     * bei den gesetzten 22px keines von beiden. Eine Pruefung, die nie
     * anschlaegt, ist keine.
     */
    const langeWorte = await page.evaluate(() => {
      const ctx = document.createElement("canvas").getContext("2d");
      const treffer = [];
      for (const el of document.querySelectorAll("body *")) {
        if (el.closest("[aria-hidden='true']")) continue;
        const st = getComputedStyle(el);
        const platz = el.clientWidth - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight);
        // Unter 8px liegen die versteckten Beschriftungen (1px plus
        // clip-path). Die haben keinen sichtbaren Platz und brauchen keinen.
        if (!(platz > 8)) continue;

        const eigen = [...el.childNodes]
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.nodeValue)
          .join(" ")
          .trim();
        if (!eigen) continue;

        ctx.font = `${st.fontStyle} ${st.fontWeight} ${st.fontSize} ${st.fontFamily}`;
        // measureText kennt keine Laufweite. Sie steht in den Ueberschriften
        // dieser Seite auf negativen Werten, wird also addiert und nicht
        // ignoriert, sonst faellt jede Messung zu gross aus.
        const sperr = st.letterSpacing.endsWith("px") ? parseFloat(st.letterSpacing) : 0;

        for (const wort of eigen.split(/\s+/)) {
          const breite = ctx.measureText(wort).width + sperr * wort.length;
          if (breite > platz + 1) {
            treffer.push({
              was: (el.getAttribute("class") || el.tagName).toString().split(" ")[0],
              wort,
              breite: Math.round(breite),
              platz: Math.round(platz),
            });
            break;
          }
        }
      }
      return treffer.slice(0, 5);
    });

    const wortrand = langeWorte.length
      ? `   WORT ZU BREIT: ${langeWorte
          .map((t) => `${t.was} "${t.wort}" ${t.breite} in ${t.platz}px`)
          .join(", ")}`
      : "";
    const rand = abgeschnitten.length
      ? `   AUSSERHALB: ${abgeschnitten.map((t) => `${t.was} (${t.links}..${t.rechts})`).join(", ")}`
      : "";
    console.log(
      `${f.name.padEnd(28)} Ueberlauf ${ueberlauf} px, ausserhalb ${abgeschnitten.length}, ` +
        `Woerter zu breit ${langeWorte.length}${rand}${wortrand}`,
    );

    await kontext.close();
  }
} finally {
  await browser.close();
}

if (fehler > 0) {
  console.error(`\n${fehler} von ${FAELLE.length} Faelle zeigen abgeschnittenen Inhalt.`);
  process.exit(1);
}
console.log(`\n${FAELLE.length} Pruefbilder in ${ZIEL}.`);
