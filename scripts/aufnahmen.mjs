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
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(
  path.resolve("scrollcraft/builds/casefile/node_modules/playwright-core"),
);

const BASIS = process.env.BASIS ?? "http://localhost:3210";
const ZIEL = "public/arbeiten";

/* EINE EINZELNE AUFNAHME, seit dem 2026-09-02:
       node scripts/aufnahmen.mjs --nur cement
   nimmt nur die genannte Datei auf und traegt sie in das bestehende Manifest
   ein, statt alle zehn neu zu schiessen. Gebraucht fuer die externen
   Aufnahmen, die keinen Erfassungsserver brauchen. */
const NUR = (() => {
  const i = process.argv.indexOf("--nur");
  return i > -1 ? process.argv[i + 1] : null;
})();

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
/* Die Anonymisierung des Zementherstellers, fuer beide Aufnahmen dieselbe. */
const ANONYM_CEMENT = {
      css: `
        header a[aria-label] img { opacity: 0 !important; }
        header a[aria-label] { background: #1c1b19; border-radius: 8px; }
        a[href^="tel:"] { display: none !important; }
      `,
      /** Dieser Text darf nach dem Ausblenden nirgends sichtbar sein. */
      /* "Garden Grove" ist der Firmensitz und steht in der Belegleiste
         unter dem Hero; mit dem Ort ist der Hersteller in einer Suche
         gefunden. Ausgeblendet wird die ganze Kachel (li), nicht nur die
         Zahl, sonst bleibt eine Beschriftung ohne Wert stehen. */
      /* Die CO2-Zahl ist ein Fingerabdruck: wer sie in eine Suche tippt,
         hat den Hersteller. Also auch weg. */
      verboten: ["CTS", "Rapid Set", "800-929", "Garden Grove", "1,809,294,008"],
};

const AUFNAHMEN = [
  // Die Galerie. Sechs Gestaltungen.
  //
  // 1200 UND NICHT 1440, und das ist der billigste Weg zu groesseren
  // Entwuerfen: `.ew-wrap` ist 1180px breit: bei 1440 Fensterbreite stehen
  // links und rechts 130px leere Flaeche, die in der Karte mitverkleinert
  // wird. Bei 1200 fuellt der Inhalt den Rahmen fast randlos, und dieselbe
  // Karte zeigt denselben Entwurf rund 20 Prozent groesser, ohne dass an
  // einer einzigen Schriftgroesse gedreht werden muss.
  //
  // 760 hoch: genug fuer Kopfleiste, Held und den Anfang der Leistungen.
  { fall: "entwurf/northline", datei: "entwurf-northline", breite: 1200, hoehe: 760, platz: "Galerie, Bau" },
  { fall: "entwurf/voltas", datei: "entwurf-voltas", breite: 1200, hoehe: 760, platz: "Galerie, Elektro" },
  { fall: "entwurf/ridge", datei: "entwurf-ridge", breite: 1200, hoehe: 760, platz: "Galerie, Dach" },
  { fall: "entwurf/clearflow", datei: "entwurf-clearflow", breite: 1200, hoehe: 760, platz: "Galerie, Sanitaer" },
  { fall: "entwurf/stoneleaf", datei: "entwurf-stoneleaf", breite: 1200, hoehe: 760, platz: "Galerie, Garten" },
  { fall: "entwurf/foxandco", datei: "entwurf-foxandco", breite: 1200, hoehe: 760, platz: "Galerie, Maler" },

  // DIE COVER, seit dem 2026-09-05. Die Galerie zeigt je Entwurf ein Cover
  // (components/entwuerfe/cover.tsx) und nicht mehr die Aufnahme der Seite:
  // der Mentor wollte andere Bilder im Raster, und sein Vorbild war eine
  // Marke auf koernigem Verlauf. Die Seitenaufnahmen oben bleiben, das
  // OG-Bild schneidet drei davon an. Gleiches Mass, damit das Raster steht.
  //
  // SKALA 1 UND NICHT 2: die Koernung ist Rauschen, und Rauschen laesst sich
  // nicht komprimieren. Bei Skala 2 wog ein Cover 5 MB, bei Skala 1 ein
  // Viertel davon. Die Karte ist nie breiter als 34rem (544px), auf einem
  // 2x-Bildschirm also 1088 Geraetepixel, und 1200 reichen dafuer ohne
  // Hochrechnen. Gemessen am 2026-09-05.
  { fall: "cover/northline", datei: "cover-northline", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Bau" },
  { fall: "cover/voltas", datei: "cover-voltas", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Elektro" },
  { fall: "cover/ridge", datei: "cover-ridge", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Dach" },
  { fall: "cover/clearflow", datei: "cover-clearflow", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Sanitaer" },
  { fall: "cover/stoneleaf", datei: "cover-stoneleaf", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Garten" },
  { fall: "cover/foxandco", datei: "cover-foxandco", breite: 1200, hoehe: 760, skala: 1, platz: "Galerie, Cover Maler" },

  // Der Hero. Dieselbe Gestaltung wie in der Galerie, aber schmal
  // aufgenommen: im Telefonrahmen steht eine Telefonansicht und keine
  // verkleinerte Breitbildseite.
  { fall: "entwurf/voltas", datei: "hero-telefon", breite: 420, hoehe: 1400, platz: "Telefonrahmen im Hero" },

  // ECHTE ARBEIT. Die einzige Aufnahme, die NICHT vom Dev-Server kommt.
  //
  // Hier standen bis zum 2026-09-01 die zwei Haelften des
  // Vorher/Nachher-Vergleichs. Der ist gestrichen (Begruendung in
  // components/start/arbeit.tsx), und an seiner Stelle steht jetzt die
  // laufende Produktseite von Frostbreaker.
  //
  // WARUM AUS DEM NETZ UND NICHT AUS DEM REPO: der Abschnitt behauptet "built,
  // shipped, still running". Eine Aufnahme aus einem lokalen Bau koennte das
  // nicht belegen, eine aus dem Netz schon. Nebenbei faellt so beim naechsten
  // Aufnahmelauf auf, wenn sich die Seite geaendert hat.
  //
  // SEIT DEM 2026-09-02 ZWEI AUFNAHMEN JE FALL: eine breite, die LAENGER ist
  // als ihr Ausschnitt (`voll` begrenzt die Vollseitenaufnahme auf diese
  // Hoehe) und beim Ueberfahren im Rahmen wandert, und eine Telefonaufnahme
  // fuer den Geraeterahmen davor. So zeigt der Abschnitt mehr von der Seite
  // als den ersten Bildschirm, ohne dass jemand die Seite verlaesst.
  {
    extern: "https://www.frostbreaker.app/",
    datei: "frostbreaker",
    breite: 1200,
    hoehe: 760,
    voll: 2200,
    platz: "Echte Arbeit, Produktseite (wandert im Rahmen)",
  },
  {
    extern: "https://www.frostbreaker.app/",
    datei: "frostbreaker-telefon",
    breite: 390,
    hoehe: 844,
    voll: 1500,
    telefon: true,
    platz: "Echte Arbeit, Produktseite im Telefonrahmen",
  },

  // DER PROTOTYP FUER EINEN ZEMENTHERSTELLER, seit dem 2026-09-02. Der
  // Betrieb hat zugestimmt, dass der Entwurf gezeigt wird, aber OHNE SEINEN
  // NAMEN. Deshalb wird bei der Aufnahme alles ausgeblendet, was ihn nennt:
  // das Logo in der Kopfzeile (bleibt als dunkle Flaeche stehen, damit die
  // Leiste nicht leer aussieht), die Telefonnummer, und die Augenbraue mit
  // dem Produktnamen. Die Selektoren zielen auf ARIA und href und nicht auf
  // die gehashten Klassennamen, damit ein neuer Bau des Prototyps sie nicht
  // still aushebelt. Ob es gewirkt hat, prueft der Lauf unten nach: steht
  // der Name noch sichtbar im Fenster, bricht er ab.
  //
  // `voll` bleibt hier bei 1500 Pixeln und nicht 2200: weiter unten stehen
  // Produktfotos mit dem Markennamen AUF DEN SAECKEN, und den kann kein
  // Skript ausblenden. Der Ausschnitt endet vor dem Produktraster.
  {
    extern: "https://cts-prototype-dusky.vercel.app/",
    datei: "cement",
    breite: 1200,
    hoehe: 760,
    voll: 1500,
    platz: "Echte Arbeit, Prototyp Zementhersteller (anonymisiert, wandert im Rahmen)",
    anonym: ANONYM_CEMENT,
  },
  {
    extern: "https://cts-prototype-dusky.vercel.app/",
    datei: "cement-telefon",
    breite: 390,
    hoehe: 844,
    voll: 1500,
    telefon: true,
    platz: "Echte Arbeit, Prototyp Zementhersteller im Telefonrahmen (anonymisiert)",
    anonym: ANONYM_CEMENT,
  },
];

// Die Metadaten-Bilder, wie gehabt.
AUFNAHMEN.push(
  { fall: "og", datei: "opengraph-image", ordner: "app", breite: 1200, hoehe: 630, platz: "og:image und twitter:image" },
  { fall: "og?icon", datei: "apple-icon", ordner: "app", breite: 180, hoehe: 180, platz: "Symbol fuer iOS-Startbildschirm" },
);

/** Wartet, bis die Seite wirklich fertig ist, statt eine Zahl abzuwarten. */
async function ruhe(page, extern) {
  // 1. Der Aufbau selbst. Die Marke gibt es nur auf den eigenen
  //    Erfassungsseiten; bei einer fremden Adresse hat `networkidle` diese
  //    Rolle bereits uebernommen.
  if (!extern) await page.waitForSelector("[data-erfassung]", { state: "attached" });
  // 2. Die Schriften. Ohne das steht im Bild der Rueckfallstapel.
  // 3. Jedes Bild dekodiert. `complete` allein heisst nur geladen, nicht
  //    gezeichnet, und ein halb dekodiertes Bild landet als Luecke im PNG.
  //
  // BEIDES MIT EINER OBERGRENZE, und das ist keine Vorsicht auf Verdacht:
  // page.evaluate hat in Playwright KEINE Zeitgrenze. Am 2026-09-01 hing der
  // Lauf bei der ersten fremden Adresse (frostbreaker.app) minutenlang genau
  // hier, ohne Fehler und ohne Ausgabe, weil dort eine Schrift oder ein Bild
  // nie fertig meldete. Nach der Grenze wird aufgenommen, was da ist; das ist
  // allemal besser als ein Lauf, der nie zurueckkommt.
  await page.evaluate(async () => {
    const grenze = (v) => new Promise((r) => setTimeout(r, v));
    await Promise.race([document.fonts.ready, grenze(8000)]);
    const bilder = Array.from(document.images);
    await Promise.race([
      Promise.all(bilder.map((b) => (b.decode ? b.decode().catch(() => {}) : null))),
      grenze(8000),
    ]);
  });
  // 4. Zwei ruhige Bildwechsel. Danach hat der Browser mindestens einmal
  //    vollstaendig mit allem gezeichnet, was oben angekommen ist.
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
}

const browser = await chromium.launch({ channel: "chrome" });
const manifest = [];
// `--nur cover-*` nimmt alle Dateien mit diesem Anfang, `--nur cement` genau
// die eine.
const passt = (a) =>
  NUR.endsWith("*") ? a.datei.startsWith(NUR.slice(0, -1)) : a.datei === NUR;
const AUSWAHL = NUR ? AUFNAHMEN.filter(passt) : AUFNAHMEN;
if (NUR && AUSWAHL.length === 0) throw new Error(`Keine Aufnahme heisst "${NUR}".`);

try {
  for (const a of AUSWAHL) {
    const kontext = await browser.newContext({
      viewport: { width: a.breite, height: a.hoehe },
      deviceScaleFactor: a.skala ?? 2,
      // Telefonaufnahmen fremder Seiten mit Geraeteemulation, sonst liefert
      // die Seite ihre Schreibtischfassung in 390px Breite.
      isMobile: Boolean(a.telefon),
      hasTouch: Boolean(a.telefon),
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
    const url = a.extern ?? `${BASIS}/erfassung/${a.fall}`;
    // networkidle nur bei den eigenen Erfassungsseiten. Eine fremde,
    // ausgelieferte Seite wird nie ruhig: Messpunkte, Vorabladungen und
    // offene Verbindungen halten den Zaehler dauerhaft ueber null.
    const antwort = await page.goto(url, {
      waitUntil: a.extern ? "load" : "networkidle",
      timeout: 45000,
    });
    if (!antwort || !antwort.ok()) {
      throw new Error(
        `${url} antwortet mit ${antwort ? antwort.status() : "nichts"}. ` +
          (a.extern ? "Ist die Seite erreichbar?" : "Laeuft der Dev-Server mit CAPTURE=1?"),
      );
    }
    if (a.extern) {
      // Ein Versuch auf Ruhe, aber mit Grenze und ohne Anspruch.
      await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    }
    await ruhe(page, Boolean(a.extern));

    if (a.anonym) {
      await page.addStyleTag({ content: a.anonym.css });
      // Alles, was den Namen im Text traegt (Augenbraue, Diagrammtitel,
      // Produktzeilen), hat keinen stabilen Selektor. Es wird ueber seinen
      // Textknoten gefunden, und das Elternelement wird ausgeblendet.
      await page.evaluate((verboten) => {
        const geher = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const treffer = [];
        let n;
        while ((n = geher.nextNode())) {
          if (verboten.some((v) => n.textContent.includes(v))) treffer.push(n.parentElement);
        }
        // display:none und nicht visibility:hidden: Einblendungen setzen
        // visibility auf dem Kind ausdruecklich auf "visible", und dann
        // schlaegt das Ausblenden des Elternteils nicht durch. Genau so ist
        // "Garden Grove, CA" beim ersten Lauf stehen geblieben.
        for (const el of treffer) (el.closest("li") ?? el).style.display = "none";
      }, a.anonym.verboten);
      await page.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      // Nachgeprueft, nicht geglaubt: kein verbotener Text mehr sichtbar im
      // Fenster. Sichtbar heisst: eigener Textknoten, im Bildausschnitt,
      // nicht visibility:hidden und nicht opacity 0.
      const reste = await page.evaluate(({ verboten, hoehe }) => {
        const h = hoehe;
        const gefunden = [];
        const geher = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = geher.nextNode())) {
          const t = n.textContent;
          if (!verboten.some((v) => t.includes(v))) continue;
          const el = n.parentElement;
          const r = el.getBoundingClientRect();
          // Kein Rechteck heisst: display:none irgendwo darueber.
          if (r.width === 0 && r.height === 0) continue;
          if (r.bottom < 0 || r.top > h) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || cs.opacity === "0" || cs.display === "none") continue;
          gefunden.push(t.trim().slice(0, 40));
        }
        return gefunden;
      }, { verboten: a.anonym.verboten, hoehe: a.voll ?? a.hoehe });
      if (reste.length) {
        throw new Error(`Anonymisierung unvollstaendig, sichtbar: ${reste.join(" | ")}`);
      }
    }

    const datei = `${a.datei}.png`;
    const ordner = a.ordner ?? ZIEL;
    const pfad = path.join(ordner, datei);
    await mkdir(ordner, { recursive: true });
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
    // Elementweise nur, wo die Datei so hoch sein soll wie ihr Inhalt: beim
    // Hero-Telefon (es wandert im Rahmen) und bei den Metadaten-Bildern. Die
    // Vergleichsaufnahmen brauchen dagegen ein FESTES Fenstermass, damit
    // beide Seiten des Paares exakt gleich gross sind.
    const elementweise = a.datei === "hero-telefon" || (a.fall ?? "").startsWith("og");
    // DAS ELEMENT MIT DER MARKIERUNG, nicht sein erstes Kind. Die
    // Vorgaengerfassung nahm `[data-erfassung] > *`, weil bei den Demos ein
    // Wrapper die Markierung trug. Beim OG-Bild sitzt sie direkt auf der
    // Flaeche, und die Aufnahme zeigte dann nur die Kopfzeile: 1200 mal 100
    // statt 1200 mal 630. Der Wrapper ist inzwischen ueberall so hoch wie
    // sein Inhalt, also ist er die richtige Wahl fuer beide Faelle.
    const ziel = elementweise ? page.locator("[data-erfassung]").first() : page;
    if (a.voll) {
      // Erst einmal bis zur Grenze scrollen, damit nachgeladene Bilder und
      // Einblendungen da sind, dann zurueck und die volle Seite bis zur
      // Grenze aufnehmen.
      await page.evaluate(async (grenze) => {
        for (let y = 0; y < grenze; y += 300) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      }, a.voll);
      await ruhe(page, Boolean(a.extern));
      // Feste Elemente am unteren Rand (Telefon-Buchungsleisten) landen in
      // einer Vollseitenaufnahme mitten im Bild. Ausblenden.
      await page.evaluate(() => {
        for (const el of document.body.querySelectorAll("*")) {
          const cs = getComputedStyle(el);
          if (cs.position !== "fixed") continue;
          const r = el.getBoundingClientRect();
          if (r.top > window.innerHeight / 2) el.style.visibility = "hidden";
        }
      });
      const dokument = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.screenshot({
        path: pfad,
        fullPage: true,
        clip: { x: 0, y: 0, width: a.breite, height: Math.min(a.voll, dokument) },
      });
    } else {
      await ziel.screenshot({ path: pfad });
    }

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
      // Das Manifest liegt in public/ und ist damit oeffentlich. Bei einer
      // anonymisierten Aufnahme darf die Adresse nicht hinein: sie traegt
      // den Namen, den die Aufnahme gerade verbirgt.
      quelle: a.anonym ? "extern, anonymisiert, Adresse nicht im Manifest" : url,
      fensterbreite: a.breite,
      fensterhoehe: a.hoehe,
      geraeteskala: a.skala ?? 2,
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

  // Bei einer Teilaufnahme (--nur) bleiben die uebrigen Eintraege stehen und
  // nur die neu aufgenommenen werden ersetzt. Bis zum 2026-09-05 schrieb der
  // Lauf hier das Manifest mit NUR den neuen Eintraegen, und nach einer
  // einzelnen Aufnahme stand von den anderen nichts mehr drin.
  const manifestPfad = path.join(ZIEL, "manifest.json");
  let bisher = [];
  if (NUR) {
    try {
      bisher = JSON.parse(await readFile(manifestPfad, "utf8")).bilder ?? [];
    } catch {
      bisher = [];
    }
  }
  const neu = new Set(manifest.map((m) => m.datei));
  const bilder = [...bisher.filter((m) => !neu.has(m.datei)), ...manifest];
  await writeFile(
    manifestPfad,
    JSON.stringify({ erzeugtVon: "scripts/aufnahmen.mjs", bilder }, null, 2) + "\n",
    "utf8",
  );
  const gesamt = manifest.reduce((s, m) => s + m.bytes, 0);
  console.log(`\n${manifest.length} Aufnahmen, zusammen ${(gesamt / 1024).toFixed(0)} kB.`);
} finally {
  await browser.close();
}
