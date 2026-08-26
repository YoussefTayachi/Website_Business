/* ============================================================================
   DIE ZEICHNUNGEN. Vier Szenen: die Hero-Collage und drei Fallkarten.

   ES GIBT KEIN EINZIGES BILD AUF DIESER SEITE, und das ist eine Entscheidung,
   keine Einschraenkung. Die drei Betriebe sind erfunden. Ein Screenshot waere
   damit eine erfundene Referenz, und ein generiertes Still waere ein Portfolio,
   das genau das widerlegt, was es verkauft: dass hier jemand Dinge selbst
   baut. Gezeichnet wird deshalb die STRUKTUR einer Website, nie ihr Aussehen.

   WARUM SVG UND NICHT CSS-KAESTEN: eine viewBox skaliert exakt, auf jeder
   Fensterbreite, ohne einen einzigen Umbruchpunkt. Und sie kennt ihre eigenen
   Massverhaeltnisse, bevor irgendetwas geladen ist. Genau daran haengt die
   Zusage, dass diese Seite beim Laden nicht springt: die Karte reserviert ihre
   Hoehe ueber aspect-ratio, der Inhalt braucht dafuer keine Datei.

   FARBEN KOMMEN ALS KLASSE, nicht als Attribut. fill="var(--x)" wirkt in SVG
   nicht, die Begruendung steht bei der Zeichenpalette in start.css.

   Jede Szene ist role="img" mit aria-label aus content/start.ts. Die einzelnen
   Rechtecke darin sind fuer einen Screenreader bedeutungslos und bleiben es.
   ========================================================================== */

/** Vier graue Textzeilen absteigender Laenge, wie sie in jeder Miniaturseite
 *  vorkommen. Als Funktion, damit dieselbe Geste nicht viermal dasteht. */
function Textzeilen({
  x,
  y,
  breiten,
  hoehe = 10,
  abstand = 22,
}: {
  x: number;
  y: number;
  breiten: number[];
  hoehe?: number;
  abstand?: number;
}) {
  return (
    <>
      {breiten.map((b, i) => (
        <rect
          key={i}
          className="st-fill-line"
          x={x}
          y={y + i * abstand}
          width={b}
          height={hoehe}
          rx={hoehe / 2}
        />
      ))}
    </>
  );
}

/* ── DIE HERO-COLLAGE ─────────────────────────────────────────────────────
   Die groesste Flaeche der Seite und der erste Eindruck. Drei Gegenstaende,
   wie sie der Alternativtext in content/start.ts nennt: ein Laptopfenster,
   ein Telefon, ein Haken.

   DIE DRAMATURGIE IST DIE DER SEITE SELBST. Links das breite Fenster mit der
   fertigen Seite, rechts davor das Telefon mit derselben Seite auf dem
   Schirm, und ganz rechts der Haken. Das Telefon steht VOR dem Fenster, weil
   die Seite genau das behauptet: das Telefon kommt zuerst.

   Der mintgruene Anrufbalken im Telefon ist derselbe, der im Fuss zur Flaeche
   wird. Die Farbe taucht hier zum ersten Mal auf und ist am Ende die ganze
   Seite. */
export function HeroCollage({ titel }: { titel: string }) {
  return (
    <svg viewBox="0 0 1600 1000" role="img" aria-label={titel}>
      <defs>
        {/* Zwei Lichter statt einer Flaechenfarbe: unten links Blau, oben
            rechts Mint. Sie ordnen den Blick diagonal und halten die schwarze
            Karte davon ab, ein Loch zu sein. */}
        <radialGradient id="st-hero-blau" cx="0.18" cy="0.9" r="0.75">
          <stop className="st-stop-blue" offset="0" stopOpacity="0.72" />
          <stop className="st-stop-blue" offset="1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="st-hero-mint" cx="0.9" cy="0.12" r="0.55">
          <stop className="st-stop-mint" offset="0" stopOpacity="0.3" />
          <stop className="st-stop-mint" offset="1" stopOpacity="0" />
        </radialGradient>
        {/* Ein sehr leises Raster. Es soll nicht gesehen, sondern gespuert
            werden: ohne das wirkt die schwarze Flaeche flach. */}
        <pattern id="st-hero-raster" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            className="st-stroke-soft"
            d="M80 0V80M0 80H80"
            strokeWidth="1"
            strokeOpacity="0.09"
          />
        </pattern>
      </defs>

      <rect className="st-fill-b" width="1600" height="1000" />
      <rect width="1600" height="1000" fill="url(#st-hero-raster)" />
      <rect width="1600" height="1000" fill="url(#st-hero-blau)" />
      <rect width="1600" height="1000" fill="url(#st-hero-mint)" />

      {/* ── Das Laptopfenster ─────────────────────────────────────────── */}
      <g>
        <rect className="st-fill-paper" x="110" y="205" width="880" height="625" rx="20" />
        {/* Die Fensterleiste: erst dieselbe Rundung wie die Karte, dann ein
            Rechteck ohne Rundung darueber, damit nur die zwei oberen Ecken
            rund bleiben. */}
        <rect className="st-fill-chip" x="110" y="205" width="880" height="48" rx="20" />
        <rect className="st-fill-chip" x="110" y="233" width="880" height="20" />
        <path className="st-stroke-soft" d="M110 253H990" strokeWidth="1.5" />
        {[142, 166, 190].map((cx) => (
          <circle key={cx} className="st-fill-line" cx={cx} cy="229" r="6" />
        ))}

        {/* Kopfzeile der gezeichneten Seite */}
        <rect className="st-fill-ink" x="150" y="288" width="104" height="14" rx="7" />
        {[790, 858, 912].map((x, i) => (
          <rect
            key={x}
            className="st-fill-line"
            x={x}
            y="290"
            width={[52, 40, 38][i]}
            height="10"
            rx="5"
          />
        ))}

        {/* Schlagzeile, Handlung, Bild. Genau die Reihenfolge, die die
            Leistungsliste weiter unten behauptet. */}
        <rect className="st-fill-ink" x="150" y="342" width="404" height="36" rx="6" />
        <rect className="st-fill-ink" x="150" y="392" width="300" height="36" rx="6" />
        <rect className="st-fill-mint" x="150" y="456" width="212" height="52" rx="26" />
        <rect className="st-fill-ink" x="182" y="474" width="148" height="16" rx="8" />
        <rect
          className="st-stroke-soft"
          x="378"
          y="456"
          width="168"
          height="52"
          rx="26"
          strokeWidth="2"
        />

        <rect className="st-fill-media" x="608" y="342" width="342" height="238" rx="14" />
        <path className="st-fill-mint" d="M608 520 748 400l90 78 112-98v180a14 14 0 0 1-14 14H622a14 14 0 0 1-14-14z" />
        <circle className="st-fill-paper" cx="678" cy="404" r="26" />

        {/* Drei Kacheln als Fussbereich der gezeichneten Seite */}
        {[150, 424, 698].map((x) => (
          <g key={x}>
            <rect className="st-fill-chip" x={x} y="614" width="252" height="152" rx="12" />
            <rect className="st-fill-mint" x={x + 22} y="636" width="34" height="34" rx="10" />
            <Textzeilen x={x + 22} y={690} breiten={[204, 150]} abstand={22} />
          </g>
        ))}
      </g>

      {/* ── Das Telefon, vor dem Fenster ──────────────────────────────── */}
      <g>
        <rect className="st-fill-paper" x="1024" y="140" width="336" height="716" rx="52" />
        <rect
          className="st-stroke-soft"
          x="1042"
          y="186"
          width="300"
          height="624"
          rx="30"
          strokeWidth="2"
        />
        <rect className="st-fill-line" x="1156" y="162" width="72" height="10" rx="5" />

        {/* Der Anrufbalken. Die eine Handlung, ganz oben, mit dem Ring darum,
            der sagt: hier wird getippt. */}
        <rect className="st-fill-mint" x="1060" y="204" width="264" height="62" rx="16" />
        <path
          className="st-fill-ink"
          d="M1090 222c-3 0-6 2-6 6 0 15 12 27 27 27 4 0 6-3 6-6v-8c0-3-2-5-5-6l-6-1c-2 0-4 1-5 3l-2 2a21 21 0 0 1-8-8l2-2c2-1 3-3 3-5l-1-6c-1-3-3-5-6-5z"
        />
        <rect className="st-fill-ink" x="1134" y="222" width="130" height="14" rx="7" />
        <rect className="st-fill-ink" x="1134" y="244" width="86" height="10" rx="5" fillOpacity="0.45" />
        <rect
          className="st-stroke-mint"
          x="1048"
          y="192"
          width="288"
          height="86"
          rx="26"
          strokeWidth="3"
          strokeOpacity="0.55"
        />

        <rect className="st-fill-ink" x="1060" y="298" width="242" height="26" rx="5" />
        <rect className="st-fill-ink" x="1060" y="334" width="176" height="26" rx="5" />
        <rect className="st-fill-media" x="1060" y="384" width="264" height="152" rx="14" />
        <path className="st-fill-mint" d="M1060 500l72-58 52 42 76-62v98a14 14 0 0 1-14 14h-172a14 14 0 0 1-14-14z" />
        <Textzeilen x={1060} y={562} breiten={[264, 232, 250, 168]} />

        {/* Die feste Leiste am unteren Rand: Adresse und Weg, immer sichtbar. */}
        <rect className="st-fill-ink" x="1060" y="700" width="264" height="56" rx="16" />
        <rect className="st-fill-paper" x="1084" y="720" width="120" height="14" rx="7" />
        <rect className="st-fill-mint" x="1230" y="716" width="70" height="24" rx="12" />
      </g>

      {/* ── Der Haken ─────────────────────────────────────────────────── */}
      <path
        className="st-stroke-mint"
        d="M1398 726l50 52 106-124"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── FALL A: der Anrufbalken ──────────────────────────────────────────────
   Blau. Ein Telefon, ganz gross, und darauf die eine Zeile, die vorher keine
   war. Der mintgruene Balken sitzt oben, nicht unten: genau das ist der Satz
   unter der Karte. */
export function FallTelefon({ titel }: { titel: string }) {
  return (
    <svg viewBox="0 0 1000 800" role="img" aria-label={titel}>
      <defs>
        <radialGradient id="st-a-licht" cx="0.14" cy="0.1" r="0.85">
          <stop className="st-stop-paper" offset="0" stopOpacity="0.22" />
          <stop className="st-stop-paper" offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="st-fill-a" width="1000" height="800" />
      <rect width="1000" height="800" fill="url(#st-a-licht)" />

      {/* Der Bogen von links auf den Balken. Er zeigt, wohin der Daumen
          geht, ohne dass irgendwo ein Wort stehen muss. */}
      <path
        className="st-stroke-mint"
        d="M96 566C96 400 168 296 318 254"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="2 26"
      />
      <path
        className="st-stroke-mint"
        d="M292 226l40 26-30 34"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g>
        <rect className="st-fill-paper" x="340" y="86" width="324" height="690" rx="50" />
        <rect className="st-fill-line" x="472" y="108" width="60" height="8" rx="4" />
        <rect
          className="st-stroke-soft"
          x="356"
          y="132"
          width="292"
          height="606"
          rx="30"
          strokeWidth="2"
        />

        <rect className="st-fill-ink" x="376" y="152" width="92" height="12" rx="6" />
        {[556, 594, 620].map((x, i) => (
          <rect
            key={x}
            className="st-fill-line"
            x={x}
            y="153"
            width={[28, 18, 18][i]}
            height="10"
            rx="5"
          />
        ))}

        <rect className="st-fill-mint" x="374" y="186" width="256" height="66" rx="18" />
        <path
          className="st-fill-ink"
          d="M400 206c-3 0-6 3-6 6 0 16 13 29 29 29 3 0 6-3 6-6v-9c0-3-2-5-5-6l-7-1c-2 0-4 1-5 3l-2 3a22 22 0 0 1-9-9l3-2c2-1 3-4 3-6l-2-6c0-3-2-5-5-5z"
        />
        <rect className="st-fill-ink" x="442" y="204" width="124" height="16" rx="8" />
        <rect className="st-fill-ink" x="442" y="228" width="80" height="10" rx="5" fillOpacity="0.45" />
        <rect
          className="st-stroke-mint"
          x="364"
          y="176"
          width="276"
          height="86"
          rx="26"
          strokeWidth="3"
          strokeOpacity="0.6"
        />

        <rect className="st-fill-ink" x="374" y="288" width="206" height="24" rx="5" />
        <rect className="st-fill-ink" x="374" y="322" width="152" height="24" rx="5" />
        <rect className="st-fill-media" x="374" y="370" width="256" height="146" rx="14" />
        <path className="st-fill-mint" d="M374 482l68-56 50 40 72-58v94a14 14 0 0 1-14 14H388a14 14 0 0 1-14-14z" />
        <Textzeilen x={374} y={544} breiten={[256, 224, 240, 160]} />

        <rect className="st-fill-ink" x="374" y="662" width="256" height="56" rx="16" />
        <rect className="st-fill-paper" x="398" y="682" width="112" height="14" rx="7" />
        <rect className="st-fill-mint" x="536" y="678" width="70" height="24" rx="12" />
      </g>
    </svg>
  );
}

/* ── FALL B: die eine Handlung ────────────────────────────────────────────
   Tiefschwarz, quadratisch. Hinter dem fertigen Fenster liegen zwei
   Textwaende, halb verdeckt und halb abgedunkelt: die Seite, die es vorher
   war. Davor eine einzige mintgruene Zeile.

   DIE KOMPOSITION IST DAS ARGUMENT. Was hinten liegt, ist grau und viel. Was
   vorne liegt, ist wenig und farbig. */
export function FallAngebot({ titel }: { titel: string }) {
  return (
    <svg viewBox="0 0 1000 1000" role="img" aria-label={titel}>
      <defs>
        <radialGradient id="st-b-licht" cx="0.85" cy="0.88" r="0.8">
          <stop className="st-stop-mint" offset="0" stopOpacity="0.26" />
          <stop className="st-stop-mint" offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="st-fill-b" width="1000" height="1000" />
      <rect width="1000" height="1000" fill="url(#st-b-licht)" />

      {/* Die zwei Textwaende dahinter. Sie tragen bewusst keine Struktur:
          keine Ueberschrift, kein Knopf, nur Zeile um Zeile. */}
      <g opacity="0.34">
        <g transform="rotate(-7 250 300)">
          <rect className="st-fill-paper" x="66" y="118" width="330" height="470" rx="14" />
          <Textzeilen
            x={96}
            y={150}
            breiten={[270, 244, 262, 208, 270, 232, 256, 190, 268, 240, 254, 176]}
            hoehe={9}
            abstand={36}
          />
        </g>
        <g transform="rotate(6 780 760)">
          <rect className="st-fill-paper" x="640" y="600" width="300" height="400" rx="14" />
          <Textzeilen
            x={668}
            y={630}
            breiten={[244, 212, 236, 180, 244, 206, 228, 162, 240]}
            hoehe={9}
            abstand={36}
          />
        </g>
      </g>

      {/* Das fertige Fenster */}
      <g>
        <rect className="st-fill-paper" x="112" y="238" width="790" height="600" rx="22" />
        <rect className="st-fill-chip" x="112" y="238" width="790" height="50" rx="22" />
        <rect className="st-fill-chip" x="112" y="266" width="790" height="22" />
        <path className="st-stroke-soft" d="M112 288H902" strokeWidth="1.5" />
        {[146, 172, 198].map((cx) => (
          <circle key={cx} className="st-fill-line" cx={cx} cy="263" r="6" />
        ))}

        <rect className="st-fill-ink" x="156" y="330" width="100" height="14" rx="7" />
        {[694, 762, 818].map((x, i) => (
          <rect
            key={x}
            className="st-fill-line"
            x={x}
            y="332"
            width={[52, 40, 38][i]}
            height="10"
            rx="5"
          />
        ))}

        <rect className="st-fill-ink" x="156" y="392" width="440" height="38" rx="6" />
        <rect className="st-fill-ink" x="156" y="444" width="318" height="38" rx="6" />

        {/* Die eine Zeile, ganz oben, nicht am Ende einer Textwand. */}
        <rect className="st-fill-mint" x="156" y="514" width="300" height="62" rx="31" />
        <rect className="st-fill-ink" x="192" y="536" width="164" height="18" rx="9" />
        <path
          className="st-stroke-ink"
          d="M374 545h34m0 0-11-11m11 11-11 11"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect className="st-fill-media" x="620" y="392" width="282" height="212" rx="14" />
        <path className="st-fill-mint" d="M620 556l70-58 52 42 160-130v180a14 14 0 0 1-14 14H634a14 14 0 0 1-14-14z" />
        <circle className="st-fill-paper" cx="686" cy="452" r="24" />

        <Textzeilen x={156} y={614} breiten={[300, 262]} hoehe={11} abstand={26} />

        {[156, 412, 668].map((x) => (
          <g key={x}>
            <rect className="st-fill-chip" x={x} y="676" width="234" height="126" rx="12" />
            <rect className="st-fill-mint" x={x + 22} y="698" width="32" height="32" rx="10" />
            <Textzeilen x={x + 22} y={748} breiten={[190, 134]} abstand={22} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── FALL C: schnell und ganz ─────────────────────────────────────────────
   Mint. Ein schwarzes Telefon vor einer schwarzen Dachkante, dazu ein
   Ladebalken, der ganz durch ist.

   Der Dachschnitt am unteren Rand ist die einzige Stelle der Seite, die
   ueberhaupt auf ein Gewerk anspielt. Er ist eine Silhouette, kein Bild: eine
   gezeichnete Kante, mehr nicht. */
export function FallTempo({ titel }: { titel: string }) {
  return (
    <svg viewBox="0 0 1000 800" role="img" aria-label={titel}>
      <rect className="st-fill-c" width="1000" height="800" />

      {/* Die Dachkante */}
      <path
        className="st-fill-ink"
        d="M0 800V690l236-172 172 118 210-166 194 140 188-108v298z"
        fillOpacity="0.16"
      />
      <path className="st-fill-ink" d="M0 800v-56l248-150 168 104 214-146 186 128 184-96v216z" />

      {/* Der Ladebalken, ganz durch, und drei Fahrtlinien darunter. */}
      <g>
        <rect className="st-fill-ink" x="86" y="286" width="188" height="14" rx="7" fillOpacity="0.22" />
        <rect className="st-fill-ink" x="86" y="286" width="188" height="14" rx="7" />
        {[
          [86, 330, 148],
          [86, 360, 108],
          [86, 390, 62],
        ].map(([x, y, w]) => (
          <rect key={y} className="st-fill-ink" x={x} y={y} width={w} height="10" rx="5" />
        ))}
      </g>

      {/* Drei Winkel als Fahrtrichtung, rechts oben. */}
      <g>
        {[0, 46, 92].map((dx, i) => (
          <path
            key={dx}
            className="st-stroke-ink"
            d={`M${790 + dx} 168l34 36-34 36`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.3 + i * 0.35}
          />
        ))}
      </g>

      {/* Das Telefon */}
      <g>
        <rect className="st-fill-ink" x="352" y="76" width="300" height="620" rx="46" />
        <rect className="st-fill-paper" x="370" y="120" width="264" height="532" rx="26" />

        <rect className="st-fill-ink" x="390" y="140" width="84" height="12" rx="6" />
        {[540, 574, 598].map((x, i) => (
          <rect
            key={x}
            className="st-fill-line"
            x={x}
            y="141"
            width={[26, 16, 16][i]}
            height="10"
            rx="5"
          />
        ))}

        <rect className="st-fill-ink" x="390" y="180" width="190" height="24" rx="5" />
        <rect className="st-fill-ink" x="390" y="214" width="140" height="24" rx="5" />

        <rect className="st-fill-mint" x="390" y="262" width="208" height="52" rx="26" />
        <rect className="st-fill-ink" x="418" y="280" width="132" height="16" rx="8" />

        <rect className="st-fill-media" x="390" y="336" width="224" height="132" rx="14" />
        <path className="st-fill-mint" d="M390 438l58-50 44 36 66-52v82a14 14 0 0 1-14 14H404a14 14 0 0 1-14-14z" />

        <Textzeilen x={390} y={494} breiten={[224, 196, 210, 142]} />

        <rect className="st-fill-ink" x="390" y="588" width="224" height="46" rx="14" />
        <rect className="st-fill-paper" x="410" y="604" width="96" height="14" rx="7" />
        <rect className="st-fill-mint" x="528" y="601" width="62" height="20" rx="10" />
      </g>
    </svg>
  );
}

/* ── ICONS ────────────────────────────────────────────────────────────────
   Pfeil und Plus fuer die Leiste und die Linkzeilen. Sie erben ihre Farbe
   ueber currentColor, damit der Umschlag auf Hover (schwarze Flaeche, weisse
   Schrift) sie ohne zweite Regel mitnimmt. */
export function PfeilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
