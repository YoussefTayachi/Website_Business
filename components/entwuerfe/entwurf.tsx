import type { CSSProperties } from "react";

import type { Entwurf } from "@/content/entwuerfe";

/* ============================================================================
   RENDERT EINEN ENTWURF IN SEINER BAUFORM.

   SECHS BAUFORMEN FUER SECHS ENTWUERFE, seit dem 2026-09-01. Vorher waren es
   drei fuer sechs, und der Mentor hat genau das erkannt ("likely a template,
   which isn't a good look"). Die Begruendung des Umbaus steht ausfuehrlich in
   content/entwuerfe.ts.

   Die Bauformen unterscheiden sich im SKELETT und nicht in der Farbe:

     overlay        Navigation liegt im Bild, Schlagzeile unten links
     seitenleiste   senkrechte Leiste links, Nummer klebt an ihrem Fuss
     mitte          alles zentriert, Haarlinien, Serifensatz
     streifen       Notdienstband ganz oben, Leistungen als Zeilen
     ueberlappung   Bild laeuft rechts hinaus, Karte ueberlappt es
     typo           kein Held-Bild, Schlagzeile traegt alles, Farbband unten

   Diese Komponente laeuft an ZWEI Orten: unter /work/<slug> als echte,
   bedienbare Seite, und unter der Erfassungsroute, damit die Galerie ein Bild
   davon zeigen kann. Auf der Startseite selbst stehen Bilder, denn sechs
   vollstaendige Seiten im Markup waeren sechs Seiten, die jeder Besucher
   laedt, ohne eine davon zu oeffnen.

   ALLE FARBEN UND SCHRIFTEN KOMMEN ALS CSS-VARIABLE aus content/entwuerfe.ts
   und werden hier als Inline-Stil gesetzt. Das ist die eine Stelle im
   Projekt, an der Inline-Stil richtig ist: es sind Daten je Entwurf, keine
   Gestaltungsentscheidung, und sie koennen deshalb nicht in ein Stylesheet.

   DIE NAVIGATION IST BEWUSST KEIN <a>. Ein Entwurf zeigt, wie eine Seite
   aussieht; er hat keine Unterseiten. Vier Links, die alle ins Leere fuehren,
   waeren vier kaputte Versprechen und fuer eine Tastaturbedienung vier
   sinnlose Stationen.
   ========================================================================== */

/* ── DIE MOTIVE ────────────────────────────────────────────────────────────
   Sechs Zeichnungen, eine je Entwurf. Vorher waren es drei, geteilt ueber
   sechs Entwuerfe, und zwei Seiten mit derselben Zeichnung sehen verwandt
   aus, egal wie verschieden ihr Aufbau ist. Alle zeichnen in currentColor,
   damit die Farbe von aussen kommt. */

/** Traggeruest und Streben. Bau. */
function MotivGeruest() {
  return (
    <svg viewBox="0 0 400 500" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.45">
        <path d="M40 470V150l160-96 160 96v320" />
        <path d="M40 230h320M40 310h320M40 390h320" />
        <path d="M120 150v320M200 102v368M280 150v320" />
      </g>
      <g fill="currentColor" opacity="0.9">
        <circle cx="200" cy="102" r="9" />
        <circle cx="120" cy="230" r="6" />
        <circle cx="280" cy="390" r="6" />
      </g>
    </svg>
  );
}

/** Leitungswege mit Knoten. Elektrik. */
function MotivWege() {
  return (
    <svg viewBox="0 0 700 300" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="2.5" opacity="0.5" strokeLinecap="round">
        <path d="M40 60h180l60 60h140l60-60h140" />
        <path d="M40 160h120l60 60h300l60-60h60" />
        <path d="M40 240h280l60-60h280" />
      </g>
      <g fill="currentColor" opacity="0.95">
        <circle cx="220" cy="60" r="7" />
        <circle cx="420" cy="120" r="7" />
        <circle cx="220" cy="220" r="7" />
        <circle cx="520" cy="180" r="7" />
      </g>
    </svg>
  );
}

/** Ueberlappende Schindelreihen. Dach. */
function MotivSchindeln() {
  return (
    <svg viewBox="0 0 800 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="2" opacity="0.4">
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r} transform={`translate(${r % 2 ? -40 : 0} ${r * 78})`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
              <path key={c} d={`M${c * 90} 60a45 45 0 0 1 90 0v46h-90z`} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Rohrfuehrung mit Boegen und Flanschen. Sanitaer. */
function MotivRohr() {
  return (
    <svg viewBox="0 0 400 600" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="10" opacity="0.42" strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 -20v150a50 50 0 0 0 50 50h140a50 50 0 0 1 50 50v180a50 50 0 0 1-50 50H120" />
        <path d="M320 -20v90a40 40 0 0 1-40 40h-90" />
      </g>
      <g fill="currentColor" opacity="0.85">
        <circle cx="80" cy="60" r="13" />
        <circle cx="320" cy="430" r="13" />
        <circle cx="190" cy="110" r="9" />
      </g>
    </svg>
  );
}

/** Hoehenlinien und Pflanzreihen. Garten. */
function MotivHoehen() {
  return (
    <svg viewBox="0 0 600 700" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="2" opacity="0.38">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-40 ${120 + i * 100}c120 -${60 + i * 8} 240 ${70 + i * 6} 360 0s200 -${40 + i * 5} 320 30`}
          />
        ))}
      </g>
      <g fill="currentColor" opacity="0.55">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={70 + i * 68} cy={620 - (i % 3) * 34} r="5" />
        ))}
      </g>
    </svg>
  );
}

/** Breite Pinselbahnen. Maler. */
function MotivBahnen() {
  return (
    <svg viewBox="0 0 600 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M-40 340 380 -60" strokeWidth="70" opacity="0.22" />
        <path d="M60 380 480 -20" strokeWidth="46" opacity="0.3" />
        <path d="M200 400 620 0" strokeWidth="26" opacity="0.2" />
      </g>
    </svg>
  );
}

const MOTIV = {
  overlay: MotivGeruest,
  seitenleiste: MotivWege,
  mitte: MotivSchindeln,
  streifen: MotivRohr,
  ueberlappung: MotivHoehen,
  typo: MotivBahnen,
} as const;

function Bild({ e, className }: { e: Entwurf; className?: string }) {
  const Motiv = MOTIV[e.bauform];
  return (
    // color steuert das SVG ueber currentColor: eine Farbe statt einer
    // Fuellangabe an jedem Pfad.
    <div className={className ? `ew-bild ${className}` : "ew-bild"} style={{ color: e.farbe.aufAkzent }}>
      <Motiv />
    </div>
  );
}

/* ── DIE EINZIGEN GETEILTEN BAUSTEINE ─────────────────────────────────────
   Knopf und Knopfpaar. Alles andere ist je Bauform eigen. Geteilt ist genau
   das, was in sechs Handschriften keinen Unterschied machen darf: die
   Trefferflaeche eines Knopfes. */
function Knopf({ children, leise }: { children: string; leise?: boolean }) {
  return <span className={leise ? "ew-knopf ew-knopf--leise" : "ew-knopf"}>{children}</span>;
}

function Knoepfe({ e }: { e: Entwurf }) {
  return (
    <div className="ew-knoepfe">
      <Knopf>{e.cta}</Knopf>
      <Knopf leise>{e.zweit}</Knopf>
    </div>
  );
}

export default function EntwurfSeite({ e }: { e: Entwurf }) {
  const stil = {
    "--ew-grund": e.farbe.grund,
    "--ew-flaeche": e.farbe.flaeche,
    "--ew-tinte": e.farbe.tinte,
    "--ew-leise": e.farbe.leise,
    "--ew-linie": e.farbe.linie,
    "--ew-akzent": e.farbe.akzent,
    "--ew-auf-akzent": e.farbe.aufAkzent,
    "--ew-bild1": e.farbe.bild1,
    "--ew-bild2": e.farbe.bild2,
    "--ew-display": e.schrift.display,
    "--ew-text": e.schrift.text,
  } as CSSProperties;

  const Form = FORM[e.bauform];

  return (
    <div className={`ew ew--${e.bauform}`} style={stil} data-entwurf={e.slug}>
      <Form e={e} />
    </div>
  );
}

/* ══ 1. OVERLAY ═══════════════════════════════════════════════════════════
   Der Held fuellt die Flaeche, die Navigation liegt darin, die Schlagzeile
   steht unten links. Darunter ein Band aus drei Leistungen und ein schmaler
   Fuss. Bauform fuer einen Betrieb, dessen Arbeit man sehen kann. */
function Overlay({ e }: { e: Entwurf }) {
  return (
    <div className="ew-wrap">
      <header className="ew-ov__held">
        <Bild e={e} className="ew-ov__bild" />

        <div className="ew-ov__leiste">
          <span className="ew-marke">{e.marke}</span>
          <nav className="ew-nav" aria-hidden="true">
            {e.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <Knopf>{e.cta}</Knopf>
        </div>

        <div className="ew-ov__text">
          <p className="ew-augenbraue">{e.augenbraue}</p>
          <h1>{e.headline}</h1>
          <p className="ew-lead">{e.lead}</p>
          <Knoepfe e={e} />
        </div>
      </header>

      <div className="ew-ov__band">
        {e.leistungen.slice(0, 3).map((l, i) => (
          <div key={l.titel} className="ew-ov__punkt">
            <span className="ew-ov__nr">{String(i + 1).padStart(2, "0")}</span>
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </div>
        ))}
      </div>

      <div className="ew-ov__fuss">
        <span>{e.markeKurz}</span>
        <span className="ew-ov__tel">{e.ruf}</span>
        <span>{e.ort}</span>
      </div>
    </div>
  );
}

/* ══ 2. SEITENLEISTE ══════════════════════════════════════════════════════
   Senkrechte Leiste links: Marke oben, Navigation untereinander, Nummer am
   Fuss. Rechts der Inhalt. Die Nummer haengt an der Leiste und nicht im
   Fliesstext, damit sie auf jeder Bildschirmhoehe an derselben Stelle steht. */
function Seitenleiste({ e }: { e: Entwurf }) {
  return (
    <div className="ew-sl">
      <aside className="ew-sl__rail">
        <span className="ew-marke ew-sl__marke">{e.marke}</span>

        <nav className="ew-sl__nav" aria-hidden="true">
          {e.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>

        <div className="ew-sl__ruf">
          <span className="ew-augenbraue">Speak to someone</span>
          <span className="ew-sl__tel">{e.ruf}</span>
          <span className="ew-sl__notiz">Answered by an engineer, not a call centre.</span>
        </div>
      </aside>

      <main className="ew-sl__haupt">
        <p className="ew-augenbraue">{e.augenbraue}</p>
        <h1>{e.headline}</h1>
        <p className="ew-lead">{e.lead}</p>
        <Knoepfe e={e} />

        <div className="ew-sl__kacheln">
          {e.leistungen.slice(0, 4).map((l, i) => (
            <div key={l.titel} className={i === 0 ? "ew-sl__kachel ew-sl__kachel--voll" : "ew-sl__kachel"}>
              {i === 0 ? <Bild e={e} className="ew-sl__kachelbild" /> : null}
              {/* Titel und Text stehen in EINEM Element. Ohne diese Huelle
                  waeren sie im Raster der ersten Kachel zwei Felder: die
                  Ueberschrift landete neben dem Bild, der Satz in der Zeile
                  darunter unter dem Bild. Genau so sah es in der Aufnahme vom
                  2026-09-01 aus. */}
              <div className="ew-sl__kachelwort">
                <h3>{l.titel}</h3>
                <p>{l.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ══ 3. MITTE ═════════════════════════════════════════════════════════════
   Zeitschriftensatz. Marke mittig, Navigation darunter, Haarlinien statt
   Kaesten, Serife in der Schlagzeile. Die einzige Bauform ohne eine einzige
   linksbuendige Kante im ersten Bildschirm. */
function Mitte({ e }: { e: Entwurf }) {
  return (
    <div className="ew-wrap ew-mi">
      <div className="ew-mi__kopf">
        <span className="ew-marke ew-mi__marke">{e.marke}</span>
        <nav className="ew-mi__nav" aria-hidden="true">
          {e.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
      </div>

      <div className="ew-mi__held">
        <p className="ew-augenbraue">{e.augenbraue}</p>
        <h1>{e.headline}</h1>
        <p className="ew-lead">{e.lead}</p>
        <Knoepfe e={e} />
      </div>

      <Bild e={e} className="ew-mi__bild" />

      <div className="ew-mi__spalten">
        {e.leistungen.slice(0, 3).map((l) => (
          <div key={l.titel} className="ew-mi__spalte">
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </div>
        ))}
      </div>

      <div className="ew-mi__fuss">
        <span className="ew-mi__tel">{e.ruf}</span>
        <span>{e.ort}</span>
      </div>
    </div>
  );
}

/* ══ 4. STREIFEN ══════════════════════════════════════════════════════════
   Notdienstband ueber die volle Breite, DARUEBER der Marke: bei einem
   Wasserschaden ist die Nummer wichtiger als der Name. Darunter Bildspalte
   links, Leistungen als Zeilen rechts. Zeilen und keine Kacheln, weil eine
   Liste in einem Durchgang gelesen wird. */
function Streifen({ e }: { e: Entwurf }) {
  return (
    <div className="ew-st">
      <div className="ew-st__notruf">
        <span>Emergency? Call {e.ruf}</span>
        <span className="ew-st__notruf-zusatz">{e.augenbraue}</span>
      </div>

      <div className="ew-wrap">
        <div className="ew-st__leiste">
          <span className="ew-marke">{e.marke}</span>
          <nav className="ew-nav" aria-hidden="true">
            {e.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <Knopf>{e.cta}</Knopf>
        </div>

        <div className="ew-st__haupt">
          <Bild e={e} className="ew-st__bild" />

          <div className="ew-st__inhalt">
            <h1>{e.headline}</h1>
            <p className="ew-lead">{e.lead}</p>

            <ol className="ew-st__zeilen">
              {e.leistungen.slice(0, 4).map((l, i) => (
                <li key={l.titel} className="ew-st__zeile">
                  <span className="ew-st__nr">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{l.titel}</h3>
                  <p>{l.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ew-st__fuss">
          <span>{e.markeKurz}</span>
          <span>{e.ort}</span>
        </div>
      </div>
    </div>
  );
}

/* ══ 5. UEBERLAPPUNG ══════════════════════════════════════════════════════
   Das Bild laeuft rechts aus dem Fenster, die Textkarte ueberlappt es von
   links. Darunter vier hohe, schmale Kacheln. Die einzige Bauform mit einer
   Ueberschneidung: sie erzeugt Tiefe ohne einen einzigen Schatten. */
function Ueberlappung({ e }: { e: Entwurf }) {
  return (
    <div className="ew-ub">
      <div className="ew-wrap ew-ub__leiste">
        <span className="ew-marke">{e.marke}</span>
        <nav className="ew-nav" aria-hidden="true">
          {e.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
        <Knopf>{e.cta}</Knopf>
      </div>

      <div className="ew-ub__held">
        <Bild e={e} className="ew-ub__bild" />

        <div className="ew-ub__karte">
          <p className="ew-augenbraue">{e.augenbraue}</p>
          <h1>{e.headline}</h1>
          <p className="ew-lead">{e.lead}</p>
          <Knoepfe e={e} />
        </div>
      </div>

      <div className="ew-wrap">
        <div className="ew-ub__reihe">
          {e.leistungen.slice(0, 4).map((l) => (
            <div key={l.titel} className="ew-ub__kachel">
              <div className="ew-ub__kachelbild" aria-hidden="true" />
              <h3>{l.titel}</h3>
              <p>{l.text}</p>
            </div>
          ))}
        </div>

        <div className="ew-ub__fuss">
          <span className="ew-ub__tel">{e.ruf}</span>
          <span>{e.ort}</span>
        </div>
      </div>
    </div>
  );
}

/* ══ 6. TYPO ══════════════════════════════════════════════════════════════
   Kein Held-Bild. Die Schlagzeile fuellt den ersten Bildschirm, darunter
   Fliesstext links und Leistungen als Zeilen rechts, dann ein Farbband ueber
   die volle Breite als Abschluss. Der Gegenbeweis zu der Annahme, oben
   muesse ein Foto stehen. */
function Typo({ e }: { e: Entwurf }) {
  return (
    <div className="ew-ty">
      <div className="ew-wrap">
        <div className="ew-ty__leiste">
          <span className="ew-marke">{e.marke}</span>
          <nav className="ew-nav" aria-hidden="true">
            {e.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <span className="ew-ty__tel">{e.ruf}</span>
        </div>

        <p className="ew-augenbraue ew-ty__augenbraue">{e.augenbraue}</p>
        <h1 className="ew-ty__zeile">{e.headline}</h1>

        <div className="ew-ty__unter">
          <p className="ew-lead">{e.lead}</p>

          <div className="ew-ty__liste">
            {e.leistungen.slice(0, 3).map((l) => (
              <div key={l.titel} className="ew-ty__punkt">
                <h3>{l.titel}</h3>
                <p>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ew-ty__band">
        <Bild e={e} className="ew-ty__bandbild" />
        <div className="ew-wrap ew-ty__bandin">
          <h2>{e.cta}.</h2>
          <Knopf leise>{e.zweit}</Knopf>
        </div>
      </div>

      <div className="ew-wrap ew-ty__fuss">
        <span>{e.markeKurz}</span>
        <span>{e.ort}</span>
      </div>
    </div>
  );
}

const FORM = {
  overlay: Overlay,
  seitenleiste: Seitenleiste,
  mitte: Mitte,
  streifen: Streifen,
  ueberlappung: Ueberlappung,
  typo: Typo,
} as const;
