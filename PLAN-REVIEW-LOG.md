# Plan Review Log: marketing.frostbreaker.app, der One-Pager

Phase 0 (Recon) und Phase 1 (Verhoer) abgeschlossen, Plan mit dem Nutzer
gesperrt. MAX_ROUNDS=5. PLAN_FILE=PLAN.md.

## Was Phase 0 gemessen hat

- Ist-Zustand der Startseite: designatives-Klon, reines Weiss auf reinem
  Schwarz, Archivo Black, Koenigsblau `#1032cf`, Mint `#2affaa`.
  Vollseiten-Aufnahme bei 1440px ueber chrome-devtools.
- Zielstil: frostbreaker.app, gemessen aus
  `Frostbreaker_Website/app/globals.css` und `app/_ui.tsx`, dazu eine
  Live-Aufnahme. Warmes Off-White, Fraunces mit Sky-Kursiv, Space Grotesk,
  Coral als Zweitton.
- Fund, der den Dunkelmodus billig macht: `app/globals.css` in DIESEM Repo
  traegt bereits ein gerechnetes Zwei-Modus-System samt Schalter und
  Theme-Skript. Nur die Werte zeigen auf die falsche Palette.
- Fund, der eine Idee gestoppt hat: `Website_Business/README.md` verbietet,
  Lead-Entwuerfe ohne Zustimmung als Referenz zu zeigen. CTS Cement faellt
  damit als Beleg aus.
- Skill-Inventar beider Baenke erhoben, Ergebnis in `PLAN.md` unter
  `## Toolchain`.

## Was Phase 1 entschieden hat

Sieben tragende Fragen, alle beantwortet: Marke, Zielgruppe, Sprache, Beweis,
Handlungsaufruf, Preis, Bewegungsniveau. Dazu Dunkelmodus und Mobil auf
Nachforderung des Nutzers. Zehn kosmetische Punkte als Block angenommen.
Zwei Punkte hat Claude selbst gesetzt (Calendly-Link, Auslegung von "etwas
breiter"), beide in `PLAN.md` als solche gekennzeichnet.

Eine Empfehlung wurde ueberstimmt: Claude riet vom Dunkelmodus ab (Befund des
Mentors am Fall CTS, Screenshots und Wortmarke kippen nicht mit). Der Nutzer
hat ihn ausdruecklich bestellt. Er wird gebaut, die zwei Kippstellen sind im
Plan benannt und adressiert.

---

## Runde 1 — Codex (gpt-5.6-terra, reasoning effort high)

- Removing `--st-*` “without replacement” conflicts with the documented route-local `start.css` dependency and risks moving homepage styles into global legal-page CSS.  
  Fix: explicitly rewrite every `--st-*` consumer to a new route-scoped token layer, retain the `page.tsx` import order, and do not import homepage CSS from a layout.

- A temporary capture route is still a production route whenever it exists during `next build`; “remove it afterwards” is not a safeguard.  
  Fix: use a deterministic capture script that creates/removes the route and add a build-time assertion that the route is absent from the route manifest.

- The screenshot procedure is not reproducible: it omits capture URLs, font/image readiness, animation disabling, browser version, crop rules, and a committed command.  
  Fix: define one checked-in capture command with fixed viewport/DPR/color scheme, `document.fonts.ready`, disabled motion, and an asset manifest.

- Capturing six demos at two DPR-2 breakpoints plus five real-product images can easily make the page heavy; fixed `next/image` dimensions prevent CLS but do not control transfer size.  
  Fix: set per-asset byte and dimension budgets, produce card-specific crops/derivatives, provide `sizes`, and preload only the hero asset.

- Before/after images need identical viewport, crop, and intrinsic dimensions; the plan only says each image has fixed dimensions.  
  Fix: capture each pair through one shared fixture and fail generation when their dimensions differ.

- Coral `#ea5a3e` is roughly 3.3:1 on the proposed light surface, so it cannot safely carry normal text, icon meaning, or white CTA text as the plan’s annotations may require.  
  Fix: reserve coral for nonessential fills or add a darker light-mode coral and explicit foreground tokens for every coral use.

- Keeping the old dark ladder while replacing the single seal accent with Sky plus Coral leaves no defined dark semantic mapping for focus, hover, text-on-accent, Coral wash, and controls.  
  Fix: specify a complete light/dark semantic-token table and audit every global consumer, including the legal pages affected by `globals.css`.

- The plan calls screenshots and wordmarks the only dark-mode tipping points, but omits the new comparison range control, focus rings, selection, SVG illustrations, and any `start.css` body resets.  
  Fix: include those surfaces in the dark-mode acceptance matrix at 390/768/1440.

- “Standard follows `prefers-color-scheme`” is unsupported by the supplied code: the theme script and switch implementation are not inlined, and no no-JS CSS fallback is specified.  
  Fix: implement a CSS system-preference baseline, then let the early script override it only when a stored preference exists.

- The planned token cross-fade contradicts the reduced-motion promise unless it is explicitly disabled under `prefers-reduced-motion`.  
  Fix: make theme changes immediate in reduced-motion mode, including the switch glyph.

- The before/after “wiper” is not accessible merely because it supports arrows and taps; it needs a labeled native range control, visible focus, announced state, and 44px touch geometry.  
  Fix: use an `input type="range"` with “Before”/“After” labels and retain two properly captioned figures as the no-JS fallback.

- Auto-scrolling the device page and hover-scrolling screenshots are continuous motion with no pause mechanism, and a real scroll container can recreate the rejected scroll-interference on touch devices.  
  Fix: keep screenshots static by default, or use an inert clipped transform with pause-on-hover/focus and no wheel/touch scroll handling.

- The motion inventory asserts reduced-motion and no-JS compliance but does not specify base-visible CSS, `scripting: enabled` gates, client-island boundaries, or cleanup for its observers/listeners.  
  Fix: document these per item, with visible end-state CSS as the default and one small client component only for pointer, observer, slider, and theme behavior.

- The plan says all visible text belongs in `content/start.ts` while also retaining `content/projekte.ts` as demo data; it never establishes the single source for project labels and required “Fictional demo” notices.  
  Fix: define ownership per field and ensure the homepage consumes one source without duplicating or dropping the disclosure.

- Deleting `/arbeit/[slug]` may orphan `components/showcase/vorher-nachher.tsx`, `befund-marker.tsx`, and project metadata, yet the new homepage needs equivalent functionality.  
  Fix: list each retained consumer, move reusable comparison code deliberately, and remove only confirmed dead route-only dependencies.

- `metadataBase`, canonical URLs, and the generated OG image are decisions, not implementation steps; the supplied current homepage metadata does not set them.  
  Fix: assign ownership in `app/layout.tsx`/route metadata and verify absolute canonical and OG URLs in the production build.

- The toolchain depends on unavailable or unverified capabilities (`frontend-design`, `ui-ux-pro-max`, and MCP `chrome-devtools` are not supplied), while `find-animation-opportunities` is listed but not actually scheduled.  
  Fix: remove unsupported dependencies, use the documented local `playwright-core` capture option if available, and explicitly run the installed motion-audit skills before locking the inventory.

- Assumptions 1, 3, 4’s script/switch portion, 5’s “runnable” claim, 6, 8, and 10 are not supported by the inlined material; they cite files or command output not provided.  
  Fix: mark them unverified until evidenced, then record the exact checked revision, installed packages, CI workflow, assets, and CLI output.

- Assumption 2 says Next 15.5, but the supplied `package.json` only declares `^15.3.0`; no lockfile is provided to establish 15.5.  
  Fix: state the declared version range or verify and pin the resolved version before relying on 15.5 behavior.

VERDICT: REVISE

### Claudes Antwort auf Runde 1

Von 20 Befunden 18 uebernommen, 2 zurueckgewiesen. Vier davon waren echte
Fehler, die sonst gebaut worden waeren.

**Uebernommen, und warum es zaehlt:**

1. **Akzentfarben waren falsch gerechnet.** Fassung 1 gab `#0284c7` als
   Textfarbe an. Nachgerechnet: 3,96:1 auf `#fbfbfa`, faellt fuer Fliesstext
   durch. Coral `#ea5a3e` misst 3,36:1 und kann ueberhaupt keinen Text
   tragen. Neu: sky-700 `#0369a1` (5,73:1) fuer jeden Text, sky-600 nur ab
   24px, sky-500 nur Flaeche; Coral nur Flaeche, dazu coral-ink `#bd3f1d`
   (5,21:1 auf Grund, 4,71:1 auf der Waschung) fuer Coral-Text. Alle Werte
   mit Skript gerechnet, nicht geschaetzt.

2. **"Folgt der Systemeinstellung" war unbelegt und tatsaechlich falsch.**
   Das vorhandene Skript liest nur `localStorage`. Ohne CSS-Grundlage haette
   die Seite bei Systemeinstellung "dunkel" hell ausgeliefert. Neu:
   `@media (prefers-color-scheme: dark)` traegt die Grundlage, das Skript
   ueberschreibt nur bei gespeicherter Wahl. Abschnitt 2 ist deswegen neu.

3. **Ein echter Scrollcontainer im Seiteninhalt faengt auf dem Telefon die
   Wischgeste ab.** Das ist genau die Scroll-Entfuehrung, die der Nutzer
   schon einmal verworfen hat, nur an anderer Stelle. Neu als Grenze zwei in
   Abschnitt 5: keine Scrollcontainer, stattdessen `transform` in einem
   `overflow: hidden`-Rahmen mit `pointer-events: none`, plus Halt bei Hover
   und Fokus.

4. **"Erfassungsroute faellt danach raus" ist keine Absicherung.** Neu:
   `notFound()` in der Produktion plus eine Pruefung gegen das
   Routen-Manifest.

5. Aufnahmeverfahren war nicht reproduzierbar: neu als eingecheckter Befehl
   mit festem Fenstermass, `deviceScaleFactor`, `document.fonts.ready`,
   erzwungenem `reduce` und einem Manifest.
6. Bildbudget in Bytes ergaenzt. Feste Masse verhindern den Sprung, nicht das
   Gewicht.
7. Vorher/Nachher-Paare brechen ab, wenn ihre Masse voneinander abweichen.
8. Vollstaendige semantische Token-Tabelle hell und dunkel als Lieferung,
   inklusive Fokus, Auswahl, Text-auf-Akzent und Reglergriff.
9. Kippstellen im Dunkelmodus von zwei auf neun erweitert.
10. Modus-Wechsel unter `reduce` ohne Uebergang.
11. Vergleich wird ein beschriftetes `input type="range"` mit Fokusring,
    angesagtem Wert und 44px Griff, statt eines selbstgebauten Wischers.
    Ohne JS zwei `<figure>` mit Bildunterschrift.
12. Bewegungstabelle nennt je Punkt Traeger, Verhalten ohne JS und Verhalten
    unter `reduce`; dazu `@media (scripting: enabled)`, vier benannte
    Client-Inseln und Aufraeumen der Observer.
13. Textbesitz geklaert: `start.ts` besitzt alles, was die Startseite
    rendert, `projekte.ts` nur den Text innerhalb der Demo-Seiten. Das
    Kennzeichen darf nicht Teil eines Bildes sein, sonst fehlt es dem
    Screenreader.
14. Datei-fuer-Datei-Tabelle statt pauschalem Loeschen. `befund-marker.tsx`
    entfaellt begruendet, `vorher-nachher.tsx` wird umgebaut statt geloescht.
15. Metadaten als Arbeitsschritte ausgeschrieben.
16. CSS-Geltungsbereiche ausdruecklich getrennt: Tokens global, Layout
    routen-lokal, mit Nachweis im gebauten HTML von `/impressum`.
17. `find-animation-opportunities` gestrichen, es sucht fehlende Bewegung in
    bestehendem Code.
18. Next-Fassung praezisiert: deklariert `^15.3.0`, aufgeloest 15.5.23.

**Zurueckgewiesen, mit Grund:**

- **"Toolchain haengt an nicht verfuegbaren Faehigkeiten."** `frontend-design`
  und `ui-ux-pro-max` sind auf der Claude-Bank installiert, `chrome-devtools`
  ist als MCP verbunden. Codex konnte das nicht sehen, weil ihm die
  Skill-Auflistung nicht mitgegeben wurde. Die Quelle steht jetzt im Plan.
- **"Annahmen 1, 3, 4, 5, 6, 8, 10 sind unbelegt."** Sie sind in dieser
  Sitzung direkt geprueft worden; Codex kann sie nur nicht nachvollziehen,
  weil sein Sandkasten keine Dateien liest. Der Befund wird trotzdem teilweise
  wirksam: jede Annahme traegt jetzt ihren konkreten Beleg, und Annahme 8
  (CI) ist als einzige ausdruecklich als "nur aus der Doku" markiert.

**Nebenbefund aus Runde 1, der die Mechanik betrifft:** Codex kann unter
Windows im read-only-Sandkasten keine Datei lesen. Jeder Leseversuch geht
ueber PowerShell, und PowerShell wird per Policy abgewiesen
(`CreateProcess ... rejected: blocked by policy`). Der Kontext wird deshalb
ueber stdin eingespeist, statt Codex ihn holen zu lassen. Der Sandkasten
bleibt read-only, es wird nichts geschrieben. Ein Codex-Build-Track ist damit
ausgeschlossen.


---

## Runde 2 — Codex

- `app/_erfassung/` is a Next private folder, so it will not create a capture URL; changing it to a routable folder would make the manifest check fail even if production returns `notFound()`.  
  Fix: use a reproducible script that temporarily generates a routable capture entry for the capture run, removes it before the production build, and verifies absence afterward.

- Waiting for `document.fonts.ready` alone does not make screenshots deterministic, and the four copied app screenshots are not explicitly subject to the same manifest, crop, format, and budget pipeline.  
  Fix: await image decoding and stable layout, then ingest every image source through one generator that writes its dimensions, bytes, source revision, and output format to the manifest.

- “WebP with AVIF where smaller” is ambiguous: a single `next/image` source does not automatically choose between two manually generated source files.  
  Fix: choose one pipeline: static AVIF/WebP via `<picture>`, or configure Next’s image formats and budget the actual delivered encodes.

- The promised “complete semantic table” is still a future deliverable, not a plan specification: the measured light ladder names only three text values while promising four, and provides no dark values for Sky/Coral foregrounds, washes, focus, selection, or slider states.  
  Fix: put the full light/dark token table and each worst-case contrast in the plan before implementation begins.

- The theme-control interaction remains undecided between a three-state control and a one-click forced override, so its keyboard model, labels, and return-to-system behavior cannot be implemented or tested.  
  Fix: select one model now, preferably an explicit System/Light/Dark radio-style control with defined focus and `aria-checked` behavior.

- The motion plan says the auto-moving device image pauses on hover and focus while also assigning `pointer-events: none`; as written, it does not identify a focusable or hoverable pause surface.  
  Fix: make the outer frame hoverable and provide a real, labeled pause control, or remove the autoplay entirely.

- The native range specification still does not define meaningful announced values; screen readers will otherwise announce percentages or numbers without explaining which design state is shown.  
  Fix: define min/max/step and dynamic `aria-valuetext` such as “Before image”, “50% comparison”, and “After image”.

- Testing the comparison control on a phone is not a mitigation for its vertical-scroll conflict; the plan has no defined gesture behavior when a drag begins on the range.  
  Fix: specify and test vertical-pan escape behavior plus 44px Before/After buttons as an alternative to dragging.

- Deleting `components/showcase/befund-marker.tsx` conflicts with section 4’s requirement for three annotated image excerpts; the lead-prototype rule does not justify deleting a useful sales-page annotation mechanism.  
  Fix: retain/refactor it for the new annotations, or name and scope its replacement before deletion.

- Font migration is now both missing and incorrectly scoped: the plan requires Fraunces in the hero, but omits Space Grotesk installation/imports and says `app/layout.tsx` swaps fonts despite the supplied route-scoping rule preserving legal-page fonts.  
  Fix: install and import the new pair from `app/page.tsx`/route-local start CSS, while retaining the legal pages’ existing font imports in the root layout.

- The CSS migration still says `--st-*` disappears but never states how `tokens.css`, `start.css`, and existing `.st-*` consumers are rewritten to global semantic tokens without breaking the required import order.  
  Fix: enumerate the token-file migration, replace every `--st-*` reference, and retain route-local layout CSS imports in their documented order.

VERDICT: REVISE

### Claudes Antwort auf Runde 2

Alle elf Befunde uebernommen. Zwei davon waren echte Denkfehler, und das
Nachrechnen der geforderten Tabelle hat drei weitere Fehler aufgedeckt, die
Codex nicht sehen konnte.

**Die zwei Denkfehler:**

1. **`app/_erfassung/` haette nie funktioniert.** Ein Ordner mit Unterstrich
   ist unter `app/` ein privater Next-Ordner und erzeugt keine Route. Die
   Erfassungsseite waere nicht erreichbar gewesen, und die Absicherung ueber
   `notFound()` haette einen Fall abgesichert, den es gar nicht gibt. Neu
   ueber `pageExtensions`: die Dateien heissen `page.capture.tsx` und sind
   ohne `CAPTURE=1` fuer Next keine Seiten. Strukturell sicher statt von
   einer Laufzeitpruefung abhaengig.

2. **Punkt 3 der Bewegungstabelle widersprach sich selbst.** "Pausiert bei
   Hover und Fokus" und `pointer-events: none` schliessen einander aus, es
   gab keine Flaeche, die Hover je empfangen haette. Neu: der aeussere
   Geraeterahmen empfaengt Zeiger und Fokus, nur die bewegte Bildebene ist
   durchlaessig, und dazu kommt ein echter beschrifteter Pause-Knopf mit
   44px. Eine Dauerbewegung braucht einen Halt, den man findet, ohne die Maus
   darueber zu halten.

**Drei Fehler, die erst beim Rechnen der Tabelle sichtbar wurden:**

3. **Weiss auf Coral misst 3,48:1 und faellt durch.** Auf Coral steht Tinte
   (4,94:1), nie Weiss. Kontraintuitiv, weil Coral kraeftig aussieht, aber
   gerechnet.
4. **Frostbreakers Bedienkante `#a9a8a2` misst 2,30:1** und verfehlt die 3:1
   aus WCAG 1.4.11. Angehoben auf `#8a8880` (3,43:1). Die Referenz wird an
   dieser Stelle bewusst nicht uebernommen.
5. **Die dunkle Kleintextstufe `#85817a` misst auf der vertieften Flaeche nur
   4,14:1.** Angehoben auf `#8d8981` (4,60:1).

**Weiter uebernommen:**

6. Die vollstaendige Token-Tabelle steht jetzt IM Plan, hell und dunkel,
   Flaechen, vier Textstufen, drei Linienstufen, Akzente, Waschungen, Text
   auf Akzentflaechen, Fokus, Auswahl, Reglerbahn und Griff, Hover-Richtung.
   Jeder Wert gegen den unguenstigsten Grund gerechnet (hell `#f1f0ed`,
   dunkel `#202128`).
7. Schriftmigration korrigiert: das Wurzel-Layout **behaelt** Inter,
   Newsreader und JetBrains fuer die Rechtsseiten. Fraunces und Space Grotesk
   werden aus `app/page.tsx` importiert, genau dort wo heute Archivo steht.
   Fassung 2 haette den Rechtsseiten die Schrift genommen.
8. `--st-*`-Migration in sechs Schritten ausgeschrieben: `tokens.css`
   entfaellt, Farbe wandert in `globals.css`, Rhythmus in den Kopf von
   `start.css`, Importreihenfolge bleibt, Praefix bleibt, Nachweis im
   gebauten HTML von `/impressum`.
9. Schalter entschieden statt offengelassen: Dreiergruppe System / Light /
   Dark mit `role="radiogroup"` und `aria-checked`. Ein Ein-Klick-Umschalter
   hat keinen Weg zurueck zu "System".
10. Aufnahme wartet nicht nur auf `document.fonts.ready`, sondern auch auf
    `decode()` je Bild und zwei ruhige Bildwechsel. Alle Bilder laufen durch
    eine Vorrichtung, auch die vier uebernommenen App-Screenshots.
11. Formatweg eindeutig: Quellen bleiben PNG, die Auslieferung macht
    `next/image` ueber `images.formats`. Kein handgebautes `<picture>`,
    keine zwei parallelen Ableitungen. Gemessen wird die Auslieferung.
12. Regler ausspezifiziert: `min/max/step`, `aria-valuetext` in Worten statt
    einer nackten Zahl, `touch-action: pan-y` damit senkrechtes Scrollen
    immer entkommt, plus zwei 44px-Knoepfe "Before" und "After", damit Ziehen
    nie der einzige Weg ist.
13. **`befund-marker.tsx` wird doch behalten und umgebaut.** Codex hat recht:
    Flaeche 4 verlangt annotierte Bildausschnitte, und genau das kann diese
    Komponente. Was der Mentor gestrichen hat, war die Beweisschicht auf
    einem LEAD-Entwurf, nicht der Mechanismus. Fassung 2 hat die Regel zu
    weit gezogen.

Kein Befund aus Runde 2 wurde zurueckgewiesen.


---

## Runde 3 — Codex

- The dark “worst-case” surface is misidentified: `#26282e` (dark Band) is lighter than `#202128`, so `#8d8981` falls to about 4.23:1 there, not the claimed passing 4.60:1.  
  Fix: recalculate every dark token against `#26282e` or prohibit that text from appearing on Band; raise dark small text until it clears 4.5:1 there.

- The focus-ring claim is false on accent fills: sky-700 against sky-500 is only about 2.1:1, sky-400 against sky-500 about 1.3:1, and Sky against Coral is also insufficient.  
  Fix: use contextual focus colors—dark ink on light accents and light ink on dark accents—or a two-color outline/halo that reaches 3:1 against each adjacent fill.

- A `radiogroup` containing ordinary buttons with `aria-checked` is not fully specified ARIA radio behavior; the selectable children need radio semantics and roving focus.  
  Fix: use native radio inputs with a legend, or explicitly give each control `role="radio"`, correct `tabindex`, and arrow-key behavior.

- The 390px header cannot plausibly fit a wordmark, two anchor links, a 132px three-button mode group, and a CTA while preserving 44px targets; no mobile collapse is defined.  
  Fix: specify an accessible mobile navigation layout, such as a menu for anchors and a relocated theme group.

- `sizes` changes the encoded size of one `next/image` source; it does not select the separately captured 390px versus 1440px website layouts, so the capture matrix has no stated consumer.  
  Fix: assign each capture to a concrete visual slot, or define responsive art direction and test its selected source at each breakpoint.

- The pause solution should not make the decorative device frame itself an unnamed tab stop merely to receive focus.  
  Fix: keep focus on the labeled Pause/Play button and pause the frame through `:focus-within`; reveal the control on hover as well as focus.

VERDICT: REVISE

### Claudes Antwort auf Runde 3

Alle sechs Befunde uebernommen. Einer davon war ein Rechenfehler in der
Tabelle, die Runde 2 erst erzwungen hatte.

1. **Der unguenstigste dunkle Grund war falsch bestimmt.** Nachgemessen:
   `#131418` 0,0071 · `#191a1f` 0,0104 · `#202128` 0,0155 · `#26282e` 0,0213.
   Die Bandflaeche ist die hellste und damit der schwerste Fall fuer hellen
   Text, nicht die vertiefte. Alle dunklen Werte neu gerechnet. Der
   Kleintext `#8d8981` faellt dort auf 4,23:1 durch und steht jetzt auf
   `#949088` (4,63:1). Ink, Soft, Sky und Coral sind ebenfalls neu beziffert.

2. **Der Fokusring war einfarbig geplant und damit auf Akzentflaechen
   unsichtbar.** sky-700 auf sky-500 misst 2,1:1, sky-400 darauf 1,3:1. Neu:
   2px Tinte innen, 2px Papier aussen, dieselbe Konstruktion in beiden Modi.
   Ueber alle Flaechen der Seite gemessen liegt der schlechteste Fall bei
   4,94:1 (auf Coral), und der ist damit ueber der geforderten 3:1.

3. **`role="radiogroup"` ueber gewoehnliche Knoepfe ist unvollstaendige
   ARIA.** Ersetzt durch drei native `<input type="radio">` in einem
   `<fieldset>` mit `<legend>`. Der Browser liefert Gruppensemantik,
   Pfeiltasten, wandernden Fokus und die Ansage mit; von Hand waeren das
   drei Fehlerquellen fuer etwas, das es bereits gibt.

4. **Die Kopfleiste passt bei 390px rechnerisch nicht.** Drei Modus-Ziele zu
   44px sind allein 132px, dazu Wortmarke, zwei Anker und ein CTA auf rund
   350px. Neu: unter 768px traegt die Leiste nur Wortmarke und Pill, die
   Ankerlinks entfallen, die Modus-Gruppe steht im Fuss. Kein Menueknopf,
   weil ein One-Pager mit sieben Flaechen keine Navigation zu zwei Ankern
   braucht.

5. **Die Aufnahmematrix hatte keinen Abnehmer.** `sizes` waehlt die
   Kodierungsgroesse EINER Quelle und kann nicht zwischen zwei verschiedenen
   Layouts entscheiden; das waere Bildregie. Neu: jede Aufnahme hat einen
   festen Platz (Telefonaufnahmen in Telefonrahmen, Breitbildaufnahmen in
   den Vergleichen), und es wird nirgends zwischen zwei Layouts
   umgeschaltet. Damit bleibt es bei einer Quelle je Bild, ohne `<picture>`.

6. **Der Pause-Zugang haette einen unbenannten Tabstopp erzeugt.** Neu: der
   beschriftete Knopf ist der einzige Tabstopp, der Rahmen bekommt kein
   `tabindex`, angehalten wird ueber `:hover` und `:focus-within`, und der
   Knopf ist bei Hover UND bei Fokus sichtbar.

Kein Befund aus Runde 3 wurde zurueckgewiesen.


---

## Runde 4 — Codex

The contrast arithmetic is internally consistent, including dark small text on `#26282e` and the two-tone focus ring. The capture gating, font split, route-local CSS migration, mobile header, range control, and pause control now have implementable, production-safe directions.

VERDICT: APPROVED

### Abschluss

Konvergiert nach 4 von 5 Runden. Befunde je Runde: 20, 11, 6, 0.
Zurueckgewiesen wurden insgesamt 2 Befunde, beide aus Runde 1 und beide mit
Grund protokolliert (Codex konnte das Skill-Verzeichnis und die geprueften
Annahmen nicht sehen, weil sein Sandkasten unter Windows keine Datei liest).

Der Plan ist damit freigegeben zum Bau. Der naechste Schritt ist die
Entscheidung des Nutzers, nicht Code.
