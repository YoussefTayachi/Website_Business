/* ============================================================================
   AUFNAHMEN. Macht aus den gebauten Demo-Seiten die Bilder, die auf der
   Startseite stehen, und schreibt ein Manifest dazu.

   WARUM ES DIESEN BEFEHL GIBT UND NICHT EINE HANDVOLL SCREENSHOTS: eine von
   Hand geschossene Aufnahme laesst sich nicht wiederholen. Niemand weiss
   spaeter, bei welcher Fensterbreite sie entstand, ob die Schrift schon
   geladen war, ob eine Animation halb im Bild stand oder welche
   Browserfassung sie gerendert hat. Genau das macht der Unterschied zwischen
   einem Bild, das man neu erzeugen kann, und einem, das man nur noch
   nachbauen kann.

   Vorbedingung ist ein Dev-Server MIT den Erfassungsseiten:
       CAPTURE=1 npm run dev -- -p 3210
       node scripts/aufnahmen.mjs

   playwright-core kommt bewusst aus scrollcraft/builds/casefile/node_modules
   und steht NICHT im package.json dieses Projekts: es wird nur hier
   gebraucht, und ein Browser-Treiber hat in den Abhaengigkeiten einer
   Portfolio-Seite nichts verloren. So steht es auch in CLAUDE.md.
   ========================================================================== */

import { createRequire } from "node:module";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(
  path.resolve("scrollcraft/builds/casefile/node_modules/playwright-core"),
);

const BASIS = process.env.BASIS ?? "http://localhost:3210";
const ZIEL = "public/arbeiten";

/* Jede Aufnahme hat GENAU EINEN Platz auf der Seite, und der steht hier
   daneben. Zwei Aufnahmen derselben Seite in verschiedenen Breiten sind
   Bildregie und keine Aufloesungsfrage: `sizes` kann zwischen ihnen nicht
   waehlen, es waehlt nur die Kodierungsgroesse EINER Quelle. Wer hier eine
   Zeile ergaenzt, ohne einen Platz zu nennen, erzeugt eine Datei, die
   niemand einbindet. */
/* DIE HOEHE 800 IST GEMESSEN, NICHT GERUNDET. Bei 900 endete der Inhalt der
   alten Fassung bei rund 830 Pixeln, und die restlichen 70 Pixel waren leere
   Flaeche. Im Vergleich stand darunter ein leerer Streifen, der aussah wie
   ein Fehler und nicht wie das Ende einer Seite. 800 schneidet beide
   Fassungen dort ab, wo sie noch etwas zeigen.

   BEIDE SEITEN DES PAARES MUESSEN DIESELBE HOEHE HABEN, sonst springt der
   Vergleich beim Ziehen. Die Pruefung unten erzwingt das. */
const AUFNAHMEN = [
  // Die Galerie. Sechs Gestaltungen, jede bei 1440 aufgenommen und auf der
  // Startseite als Karte gezeigt. 900 Pixel hoch, weil genau so viel von
  // einer Seite in eine Galeriekarte passt, ohne dass sie zur Briefmarke
  // wird: gezeigt wird der erste Bildschirm, und ueber den wird geurteilt.
  { fall: "entwurf/northline", datei: "entwurf-northline", breite: 1440, hoehe: 900, platz: "Galerie, Bau" },
  { fall: "entwurf/voltas", datei: "entwurf-voltas", breite: 1440, hoehe: 900, platz: "Galerie, Elektro" },
  { fall: "entwurf/ridge", datei: "entwurf-ridge", breite: 1440, hoehe: 900, platz: "Galerie, Dach" },
  { fall: "entwurf/clearflow", datei: "entwurf-clearflow", breite: 1440, hoehe: 900, platz: "Galerie, Sanitaer" },
  { fall: "entwurf/stoneleaf", datei: "entwurf-stoneleaf", breite: 1440, hoehe: 900, platz: "Galerie, Garten" },
  { fall: "entwurf/foxandco", datei: "entwurf-foxandco", breite: 1440, hoehe: 900, platz: "Galerie, Maler" },

  // Der Hero. Dieselbe Gestaltung wie in der Galerie, aber schmal
  // aufgenommen: im Telefonrahmen steht eine Telefonansicht und keine
  // verkleinerte Breitbildseite.
  { fall: "entwurf/voltas", datei: "hero-telefon", breite: 420, hoehe: 1400, platz: "Telefonrahmen im Hero" },

  // Der Vergleich. Die alte Fassung ist die absichtlich schlechte Seite aus
  // components/showcase/demos/, die neue ist der Entwurf desselben Betriebs.
  // DIE HOEHE 800 IST GEMESSEN: bei 900 endete der Inhalt der alten Fassung
  // bei rund 830 Pixeln, und der Rest war leere Flaeche.
  { fall: "elektro-alt", datei: "vergleich-vorher", breite: 1440, hoehe: 800, platz: "Vergleich, vorher" },
  { fall: "entwurf/voltas", datei: "vergleich-nachher", breite: 1440, hoehe: 800, platz: "Vergleich, nachher" },
];

/** Wartet, bis die Seite wirklich fertig ist, statt eine Zahl abzuwarten. */
async function ruhe(page) {
  // 1. Der Aufbau selbst.
  await page.waitForSelector("[data-erfassung]", { state: "attached" });
  // 2. Die Schriften. Ohne das steht im Bild der Rueckfallstapel.
  await page.evaluate(() => document.fonts.ready);
  // 3. Jedes Bild dekodiert. `complete` allein heisst nur geladen, nicht
  //    gezeichnet, und ein halb dekodiertes Bild landet als Luecke im PNG.
  await page.evaluate(async () => {
    const bilder = Array.from(document.images);
    await Promise.all(bilder.map((b) => (b.decode ? b.decode().catch(() => {}) : null)));
  });
  // 4. Zwei ruhige Bildwechsel. Danach hat der Browser mindestens einmal
  //    vollstaendig mit allem gezeichnet, was oben angekommen ist.
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
}

const browser = await chromium.launch({ channel: "chrome" });
const manifest = [];

try {
  for (const a of AUFNAHMEN) {
    const kontext = await browser.newContext({
      viewport: { width: a.breite, height: a.hoehe },
      deviceScaleFactor: 2,
      // Die Aufnahmen zeigen Websites von Handwerksbetrieben. Die sind hell,
      // und sie bleiben hell, auch wenn die Portfolio-Seite drumherum dunkel
      // steht. Ein invertierter Screenshot waere eine Luege ueber das, was
      // der Kunde spaeter bekommt.
      colorScheme: "light",
      // Erzwungen, damit keine Einblendung halb im Bild steht. Die
      // Demo-Seiten zeigen unter `reduce` ihren Endzustand, und genau der
      // gehoert ins Bild.
      reducedMotion: "reduce",
    });
    const page = await kontext.newPage();
    const url = `${BASIS}/erfassung/${a.fall}`;
    const antwort = await page.goto(url, { waitUntil: "networkidle" });
    if (!antwort || !antwort.ok()) {
      throw new Error(
        `${url} antwortet mit ${antwort ? antwort.status() : "nichts"}. ` +
          `Laeuft der Dev-Server mit CAPTURE=1?`,
      );
    }
    await ruhe(page);

    const datei = `${a.datei}.png`;
    const pfad = path.join(ZIEL, datei);
    await mkdir(ZIEL, { recursive: true });
    // ZWEI ARTEN VON AUFNAHME, und der Unterschied ist wichtig:
    //
    // Die TELEFONAUFNAHME soll im Geraeterahmen wandern koennen und ist
    // deshalb absichtlich laenger als ihr Ausschnitt. Sie fotografiert das
    // ELEMENT und nicht die Seite. Grund: das Wurzel-Layout setzt
    // <body className="min-h-screen">, eine Vollseitenaufnahme waere damit
    // immer genau fensterhoch, egal wie lang die Demo-Seite wirklich ist.
    // Im Rahmen wanderte dann eine halbe Bildschirmhoehe leere Flaeche
    // durchs Bild, und die Bewegung zeigte nichts.
    //
    // Die BREITBILDAUFNAHMEN zeigen den ersten Bildschirm in einem festen
    // Fenstermass, weil genau der im Vergleich verglichen wird und beide
    // Seiten eines Paares dieselben Masse brauchen.
    const elementweise = a.breite < 500;
    const ziel = elementweise ? page.locator("[data-erfassung] > *").first() : page;
    await ziel.screenshot({ path: pfad });

    const masse = await page.evaluate(() => {
      const el = document.querySelector("[data-erfassung] > *");
      return {
        dh: document.documentElement.scrollHeight,
        eh: el ? Math.round(el.getBoundingClientRect().height) : null,
      };
    });
    const { size } = await stat(pfad);

    manifest.push({
      datei,
      platz: a.platz,
      quelle: url,
      fensterbreite: a.breite,
      fensterhoehe: a.hoehe,
      geraeteskala: 2,
      elementweise,
      dokumenthoehe: masse.dh,
      inhaltshoehe: masse.eh,
      bytes: size,
      browser: browser.version(),
      erzeugt: new Date().toISOString().slice(0, 10),
    });
    console.log(`${datei.padEnd(24)} ${(size / 1024).toFixed(0).padStart(5)} kB   ${a.platz}`);

    await kontext.close();
  }

  /* PAARE MUESSEN GLEICH GROSS SEIN. Weichen vorher und nachher in ihren
     Massen voneinander ab, springt der Vergleich beim Ziehen, und das faellt
     erst am fertigen Bau auf. Lieber hier abbrechen. */
  const paare = [["vergleich-vorher.png", "vergleich-nachher.png"]];
  for (const [a, b] of paare) {
    const x = manifest.find((m) => m.datei === a);
    const y = manifest.find((m) => m.datei === b);
    if (!x || !y) continue;
    if (x.fensterbreite !== y.fensterbreite || x.elementweise !== y.elementweise || x.fensterhoehe !== y.fensterhoehe) {
      throw new Error(`Paar ${a} / ${b} wurde nicht gleich aufgenommen.`);
    }
  }

  await writeFile(
    path.join(ZIEL, "manifest.json"),
    JSON.stringify({ erzeugtVon: "scripts/aufnahmen.mjs", bilder: manifest }, null, 2) + "\n",
    "utf8",
  );
  const gesamt = manifest.reduce((s, m) => s + m.bytes, 0);
  console.log(`\n${manifest.length} Aufnahmen, zusammen ${(gesamt / 1024).toFixed(0)} kB.`);
} finally {
  await browser.close();
}
