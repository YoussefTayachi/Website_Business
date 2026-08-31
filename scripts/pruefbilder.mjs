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

const FAELLE = [
  { name: "1440-hell", breite: 1440, hoehe: 900, schema: "light" },
  { name: "1440-dunkel", breite: 1440, hoehe: 900, schema: "dark" },
  { name: "390-hell", breite: 390, hoehe: 844, schema: "light" },
  { name: "390-dunkel", breite: 390, hoehe: 844, schema: "dark" },
];

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
    await page.goto(BASIS, { waitUntil: "networkidle" });
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

    await page.screenshot({ path: path.join(ZIEL, `seite-${f.name}.png`), fullPage: true });

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
      for (const el of document.querySelectorAll("body *")) {
        if (el.closest("[aria-hidden='true']")) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
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

    if (ueberlauf > 0 || abgeschnitten.length > 0) fehler++;
    const rand = abgeschnitten.length
      ? `   FEHLER: ${abgeschnitten.map((t) => `${t.was} (${t.links}..${t.rechts})`).join(", ")}`
      : "";
    console.log(
      `${f.name.padEnd(14)} Ueberlauf ${ueberlauf} px, ausserhalb des Fensters: ${abgeschnitten.length}${rand}`,
    );

    await kontext.close();
  }
} finally {
  await browser.close();
}

if (fehler > 0) {
  console.error(`\n${fehler} von ${FAELLE.length} Breiten scrollen waagerecht.`);
  process.exit(1);
}
console.log(`\n${FAELLE.length} Pruefbilder in ${ZIEL}.`);
