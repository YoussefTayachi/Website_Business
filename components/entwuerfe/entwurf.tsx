import type { CSSProperties } from "react";

import type { Entwurf } from "@/content/entwuerfe";

/**
 * Rendert einen Entwurf in seiner Bauform.
 *
 * WOFUER DAS DA IST: die Startseite zeigt eine Galerie aus Website-
 * Gestaltungen, damit ein Betrieb sieht, was moeglich ist. Diese Komponente
 * baut sie. Sie laeuft NUR unter der Erfassungsroute; auf der Startseite
 * stehen am Ende Bilder, keine gerenderten Entwuerfe. Der Grund ist Gewicht:
 * sechs vollstaendige Seiten im Markup der Startseite waeren sechs Seiten,
 * die der Besucher laedt, ohne sie je zu bedienen.
 *
 * ALLE FARBEN UND SCHRIFTEN KOMMEN ALS CSS-VARIABLE aus content/entwuerfe.ts
 * und werden hier als Inline-Stil gesetzt. Das ist die eine Stelle im
 * Projekt, an der Inline-Stil richtig ist: es sind Daten je Entwurf, keine
 * Gestaltungsentscheidung, und sie koennen deshalb nicht in ein Stylesheet.
 *
 * DIE BILDFLAECHEN SIND KEINE FOTOS. Verlauf aus entwurf.css, Formen als SVG
 * von hier. Drei Motive, eines je Bauform, damit die sechs Entwuerfe nicht
 * dieselbe Zeichnung tragen.
 */

/** Bauformen und Streben. Passt zu einer Baufirma und zu einem Maler. */
function MotivRaster() {
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

/** Konzentrische Boegen. Ruhig, passt zu Dach und Garten. */
function MotivBoegen() {
  return (
    <svg viewBox="0 0 800 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="2" opacity="0.35">
        <path d="M-40 400a440 440 0 0 1 880 0" />
        <path d="M60 400a340 340 0 0 1 680 0" />
        <path d="M160 400a240 240 0 0 1 480 0" />
        <path d="M260 400a140 140 0 0 1 280 0" />
      </g>
    </svg>
  );
}

/** Leitungswege mit Knoten. Passt zu Elektrik und Sanitaer. */
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

const MOTIV = { split: MotivRaster, band: MotivBoegen, kachel: MotivWege } as const;

function Bild({ e, className }: { e: Entwurf; className: string }) {
  const Motiv = MOTIV[e.bauform];
  return (
    // color steuert das SVG ueber currentColor: eine Farbe statt einer
    // Fuellangabe an jedem Pfad.
    <div className={`ew-bild ${className}`} style={{ color: e.farbe.aufAkzent }}>
      <Motiv />
    </div>
  );
}

function Leiste({ e, cta }: { e: Entwurf; cta?: boolean }) {
  return (
    <div className="ew-bar">
      <span className="ew-marke">{e.marke}</span>
      <nav className="ew-nav">
        {e.nav.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </nav>
      {cta ? <span className="ew-knopf">{e.cta}</span> : <span className="ew-marke" />}
    </div>
  );
}

export default function EntwurfSeite({ e }: { e: Entwurf }) {
  const stil = {
    "--ew-grund": e.farbe.grund,
    "--ew-flaeche": e.farbe.flaeche,
    "--ew-tinte": e.farbe.tinte,
    "--ew-leise": e.farbe.leise,
    "--ew-akzent": e.farbe.akzent,
    "--ew-auf-akzent": e.farbe.aufAkzent,
    "--ew-bild1": e.farbe.bild1,
    "--ew-bild2": e.farbe.bild2,
    "--ew-display": e.schrift.display,
    "--ew-text": e.schrift.text,
  } as CSSProperties;

  return (
    <div className="ew" style={stil} data-entwurf={e.slug}>
      {e.bauform === "split" ? <Split e={e} /> : null}
      {e.bauform === "band" ? <Band e={e} /> : null}
      {e.bauform === "kachel" ? <Kachel e={e} /> : null}
    </div>
  );
}

function Split({ e }: { e: Entwurf }) {
  return (
    <div className="ew-wrap">
      <Leiste e={e} cta />

      <div className="ew-split__held">
        <div>
          <p className="ew-augenbraue">{e.augenbraue}</p>
          <h1>{e.headline}</h1>
          <p className="ew-lead">{e.lead}</p>
          <div className="ew-knoepfe">
            <span className="ew-knopf">{e.cta}</span>
            <span className="ew-knopf ew-knopf--leise">{e.zweit}</span>
          </div>
        </div>
        <Bild e={e} className="ew-split__bild" />
      </div>

      <div className="ew-split__liste">
        {e.leistungen.slice(0, 3).map((l, i) => (
          <div key={l.titel} className="ew-split__punkt">
            <span className="ew-split__nr">{String(i + 1).padStart(2, "0")}</span>
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </div>
        ))}
      </div>

      <div className="ew-split__fuss">
        <span>{e.marke}</span>
        <span className="ew-split__tel">{e.ruf}</span>
      </div>
    </div>
  );
}

function Band({ e }: { e: Entwurf }) {
  return (
    <div className="ew-wrap">
      <Leiste e={e} />

      <div className="ew-band__held ew-bild" style={{ color: e.farbe.aufAkzent }}>
        <MotivBoegen />
        <p className="ew-augenbraue">{e.augenbraue}</p>
        <h1>{e.headline}</h1>
      </div>

      <div className="ew-band__karte">
        <p className="ew-lead">{e.lead}</p>
        <div className="ew-knoepfe">
          <span className="ew-knopf">{e.cta}</span>
          <span className="ew-knopf ew-knopf--leise">{e.zweit}</span>
        </div>
      </div>

      <div className="ew-band__liste">
        {e.leistungen.slice(0, 3).map((l) => (
          <div key={l.titel} className="ew-band__punkt">
            <div className="ew-band__regel" />
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </div>
        ))}
      </div>

      <div className="ew-band__fuss">
        <span>Call us</span>
        <span className="ew-band__tel">{e.ruf}</span>
      </div>
    </div>
  );
}

function Kachel({ e }: { e: Entwurf }) {
  return (
    <div className="ew-wrap">
      <Leiste e={e} cta />

      <div className="ew-kachel__held">
        <div>
          <p className="ew-augenbraue">{e.augenbraue}</p>
          <h1>{e.headline}</h1>
          <p className="ew-lead">{e.lead}</p>
          <Bild e={e} className="ew-kachel__bild" />
        </div>

        <div className="ew-kachel__karte">
          <p className="ew-augenbraue">Speak to someone</p>
          <span className="ew-kachel__tel">{e.ruf}</span>
          <p className="ew-kachel__notiz">Answered by an engineer, not a call centre.</p>
          <span className="ew-knopf">{e.zweit}</span>
        </div>
      </div>

      <div className="ew-kachel__liste">
        {e.leistungen.slice(0, 4).map((l) => (
          <div key={l.titel} className="ew-kachel__punkt">
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </div>
        ))}
      </div>

      <div className="ew-kachel__fuss">
        <span>{e.marke}</span>
        <span>{e.adresse}</span>
      </div>
    </div>
  );
}
