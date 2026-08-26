/* ============================================================================
   DIE ZEICHNUNGEN. Vier Szenen: die Hero-Collage und drei Fallkarten.

   ES GIBT KEIN EINZIGES FOTO AUF DIESER SEITE, und das ist eine Entscheidung,
   keine Einschraenkung. Die drei Betriebe sind erfunden. Ein Screenshot waere
   damit eine erfundene Referenz, und ein generiertes Still waere ein Portfolio,
   das genau das widerlegt, was es verkauft: dass hier jemand Dinge selbst
   baut. Gezeichnet wird deshalb, und zwar mit den Mitteln, mit denen auch die
   echte Seite gebaut wuerde.

   DIE DREI FALLKARTEN ZEIGEN SEIT DEM 2026-08-26 FERTIGE SEITEN, keine leeren
   Huellen mehr. Vorher standen dort graue Balken: die Struktur einer Website,
   nie ihr Inhalt. Das war ehrlich und hat trotzdem nichts bewiesen, denn ein
   Drahtgitter sieht aus wie ein Entwurf und nicht wie eine Lieferung. Jetzt
   traegt jede Karte die Navigation, die Schlagzeile, den Knopf und die Nummer
   des jeweiligen Betriebs, gesetzt als echte <text>-Elemente. Sie sind scharf
   auf jeder Aufloesung, markierbar, und sie kosten keine einzige Anfrage.

   DER TEXT DARIN STEHT IN content/start.ts, unter faelle[n].mock. Kein
   sichtbarer String gehoert in diese Datei, auch kein zweizeiliger in einem
   gezeichneten Knopf. Die Zeichnung bekommt ihn als Prop.

   WARUM SVG UND NICHT CSS-KAESTEN: eine viewBox skaliert exakt, auf jeder
   Fensterbreite, ohne einen einzigen Umbruchpunkt. Und sie kennt ihre eigenen
   Massverhaeltnisse, bevor irgendetwas geladen ist. Genau daran haengt die
   Zusage, dass diese Seite beim Laden nicht springt: die Karte reserviert ihre
   Hoehe ueber aspect-ratio, der Inhalt braucht dafuer keine Datei.

   FARBEN KOMMEN ALS KLASSE, nicht als Attribut. fill="var(--x)" wirkt in SVG
   nicht, die Begruendung steht bei der Zeichenpalette in start.css. Groesse,
   Fettung und Laufweite duerfen dagegen als Attribut dastehen: sie loesen
   keine Variable auf. Die Schriftfamilie erbt vom body, die Mockups sind
   deshalb in derselben Archivo gesetzt wie die Seite.

   Jede Szene ist role="img" mit aria-label aus content/start.ts, und das
   bleibt so, obwohl darin jetzt Text steht: role="img" macht den Inhalt fuer
   Hilfsmittel zu einem einzigen Bild, sodass niemand eine Navigation
   vorgelesen bekommt, die keine ist. aria-hidden waere die schlechtere Wahl,
   die Karte haette dann gar keine Beschreibung mehr.

   ALLE MASSE SIND viewBox-EINHEITEN. Bei 1440px Fensterbreite ist eine
   Fallkarte rund 580px breit, eine Einheit also rund 0,58px: Schriftgrad 26
   steht dort mit rund 15px im Bild. Wer eine Groesse aendert, rechnet mit
   diesem Faktor, sonst verschwindet die Zeile auf dem Handy.
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

/* ── BAUSTEINE DER MOCKUPS ────────────────────────────────────────────────
   Drei Gesten, die in mehr als einer Fallkarte vorkommen. Sie stehen hier
   oben, damit dieselbe Navigation nicht dreimal leicht verschieden aussieht:
   eine Serie erkennt man an den Wiederholungen, nicht an den Einfaellen. */

/** Die Navigationspunkte einer Miniaturseite.
 *
 *  SIE STEHEN ALS EIN EINZIGER TEXTKNOTEN DA, die Punkte als tspan mit dx.
 *  Nur so richtet textAnchor="end" die ganze Reihe an ihrem rechten Ende aus,
 *  ohne dass hier jemand Zeichenbreiten schaetzen muesste (der Browser kennt
 *  sie, wir nicht). Getrennte <text>-Knoten mit geratenen x-Werten waeren beim
 *  ersten Schriftwechsel schief. */
function MockNav({
  x,
  y,
  punkte,
  groesse,
  abstand,
  anker = "start",
}: {
  x: number;
  y: number;
  punkte: readonly string[];
  groesse: number;
  abstand: number;
  anker?: "start" | "end";
}) {
  return (
    <text
      className="st-fill-ink"
      x={x}
      y={y}
      fontSize={groesse}
      fontWeight={600}
      fillOpacity={0.66}
      textAnchor={anker}
    >
      {punkte.map((punkt, i) => (
        <tspan key={punkt} dx={i === 0 ? 0 : abstand}>
          {punkt}
        </tspan>
      ))}
    </text>
  );
}

/** Das Menuezeichen einer Handy-Ansicht: drei Striche, rechts oben. */
function MockMenue({ x, y, breite }: { x: number; y: number; breite: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className="st-fill-ink"
          x={x}
          y={y + i * 11}
          width={breite}
          height={4}
          rx={2}
        />
      ))}
    </>
  );
}

/** Der Hoerer im Anrufknopf. Der Pfad ist in einem 24er Raster gezeichnet und
 *  wird skaliert, damit er in Fall A und Fall C exakt dieselbe Form hat. */
function MockHoerer({ x, y, groesse }: { x: number; y: number; groesse: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${groesse / 24})`}>
      <path
        className="st-fill-ink"
        d="M4.2 3h4.3l1.7 4.3-2.6 1.9a12.5 12.5 0 0 0 5.2 5.2l1.9-2.6 4.3 1.7v4.3a1.2 1.2 0 0 1-1.3 1.2A17 17 0 0 1 3 4.3 1.2 1.2 0 0 1 4.2 3z"
      />
    </g>
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

/* ── FALL A: Elektro Musterhaus ───────────────────────────────────────────
   Blau. Die Handy-Ansicht eines Elektrikers, gross und unten angeschnitten.

   WARUM ANGESCHNITTEN: ein vollstaendig sichtbares Telefon muesste in dieser
   Karte rund 350 Einheiten breit sein, und der Anrufbalken darin waere auf
   einem echten Bildschirm keine 9 Pixel hoch. Angeschnitten sind es 500
   Einheiten, die Nummer ist lesbar, und der Schnitt sagt nebenbei das
   Richtige: die Seite geht weiter, das Wichtige steht trotzdem oben.

   WARUM DAS GERAET ERST BEI y=136 BEGINNT: darueber liegt das Fiktiv-
   Kennzeichen, und das ist eine CSS-Kapsel in fester Pixelgroesse ueber einer
   Zeichnung, die mitskaliert. Bei 390px Fensterbreite reicht sie gemessen bis
   rund 125 viewBox-Einheiten hinunter, bei 1440px nur bis 82. Beginnt der
   Schirm hoeher, deckt die Kapsel auf dem Handy die Wortmarke des Betriebs zu,
   also genau das, was die Karte beweisen soll. Die 136 sind der gemessene
   Sicherheitsabstand, keine Geschmacksfrage.

   DIE REIHENFOLGE IM SCHIRM IST DAS ARGUMENT DER KARTE. Marke, Navigation,
   dann sofort der Anrufbalken mit der Nummer, mit einem mintgruenen Ring
   darum. Erst danach die Schlagzeile. Genau das behauptet die Zeile unter der
   Karte, und wer die Zeile aendert, ordnet hier um. */
type MockElektro = {
  readonly marke: string;
  readonly nav: readonly string[];
  readonly ruf: { readonly label: string; readonly zusatz: string };
  readonly headline: readonly string[];
  readonly kacheln: readonly string[];
};

export function FallTelefon({ titel, mock }: { titel: string; mock: MockElektro }) {
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

      {/* Das Gewerk als Zeichen, gross und leise, am rechten Rand
          angeschnitten. Es traegt keine Information, nur die Nische. */}
      <path
        className="st-stroke-mint"
        d="M902 92 788 424h100l-70 320 198-372H902z"
        strokeWidth="13"
        strokeLinejoin="round"
        strokeOpacity="0.28"
      />

      {/* Der Bogen von links auf den Anrufbalken. Er zeigt, wohin der Daumen
          geht, ohne dass irgendwo ein Wort stehen muss. */}
      <path
        className="st-stroke-mint"
        d="M74 700C74 520 96 420 178 372"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="2 26"
      />
      <path
        className="st-stroke-mint"
        d="M148 340l36 30-28 34"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g>
        {/* Das Geraet. Hoehe 1000 bei Breite 500, also echtes Telefonformat;
            sichtbar ist davon der obere Bildschirm. */}
        <rect className="st-fill-paper" x="190" y="136" width="500" height="1000" rx="64" />
        <rect className="st-fill-line" x="400" y="152" width="80" height="10" rx="5" />
        <rect
          className="st-stroke-soft"
          x="206"
          y="172"
          width="468"
          height="948"
          rx="46"
          strokeWidth="2"
        />

        {/* Kopfzeile: Marke links, Menue rechts. */}
        <text
          className="st-fill-ink"
          x="228"
          y="216"
          fontSize="20"
          fontWeight="800"
          letterSpacing="1.4"
        >
          {mock.marke}
        </text>
        <MockMenue x={616} y={196} breite={36} />
        <MockNav x={228} y={264} punkte={mock.nav} groesse={18} abstand={22} />
        <path className="st-stroke-soft" d="M228 284H652" strokeWidth="1.5" />

        {/* DIE EINE HANDLUNG. Ring, Balken, Hoerer, Nummer, Erreichbarkeit. */}
        <rect
          className="st-stroke-mint"
          x="218"
          y="292"
          width="444"
          height="98"
          rx="30"
          strokeWidth="3"
          strokeOpacity="0.55"
        />
        <rect className="st-fill-mint" x="228" y="302" width="424" height="78" rx="22" />
        <MockHoerer x={252} y={322} groesse={34} />
        <text className="st-fill-ink" x="300" y="340" fontSize="26" fontWeight="700">
          {mock.ruf.label}
        </text>
        <text
          className="st-fill-ink"
          x="300"
          y="366"
          fontSize="15"
          fontWeight="500"
          fillOpacity="0.62"
        >
          {mock.ruf.zusatz}
        </text>

        {mock.headline.map((zeile, i) => (
          <text
            key={zeile}
            className="st-fill-ink"
            x="228"
            y={440 + i * 44}
            fontSize="42"
            fontWeight="800"
            letterSpacing="-1"
          >
            {zeile}
          </text>
        ))}

        {/* Das Bildmotiv: ein Zaehlerschrank mit zwei Reihen Sicherungen, eine
            davon mintgruen. Kein Foto, sondern dieselbe Geometrie, aus der
            auch der Rest der Seite besteht. */}
        <rect className="st-fill-media" x="228" y="504" width="424" height="110" rx="16" />
        <rect className="st-fill-ink" x="262" y="522" width="356" height="74" rx="10" />
        <circle className="st-fill-mint" cx="604" cy="527" r="4" />
        {[532, 564].map((railY) => (
          <g key={railY}>
            <rect className="st-fill-paper" x="278" y={railY} width="324" height="26" rx="5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <rect
                key={i}
                className={railY === 532 && i === 5 ? "st-fill-mint" : "st-fill-ink"}
                x={288 + i * 34}
                y={railY + 6}
                width="20"
                height="14"
                rx="3"
              />
            ))}
          </g>
        ))}

        {/* Die Leistungen als Kacheln, zwei mal zwei. */}
        {mock.kacheln.map((kachel, i) => {
          const kx = 228 + (i % 2) * 220;
          const ky = 626 + Math.floor(i / 2) * 78;

          return (
            <g key={kachel}>
              <rect className="st-fill-chip" x={kx} y={ky} width="204" height="72" rx="14" />
              <rect className="st-fill-mint" x={kx + 16} y={ky + 12} width="24" height="24" rx="8" />
              <text
                className="st-fill-ink"
                x={kx + 16}
                y={ky + 58}
                fontSize="17"
                fontWeight="600"
              >
                {kachel}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ── FALL B: Bau Mustergrund ──────────────────────────────────────────────
   Tiefschwarz, quadratisch. Ein Browserfenster mit der fertigen Seite eines
   Bauunternehmens, und dahinter zwei Textwaende: die Seite, die es vorher war.

   DIE KOMPOSITION IST DAS ARGUMENT. Was hinten liegt, ist grau und viel und
   traegt bewusst keine Struktur, keine Ueberschrift, keinen Knopf, nur Zeile
   um Zeile. Was vorne liegt, ist geordnet, und die Anfrage steht zweimal weit
   oben: einmal als Knopf in der Kopfleiste, einmal unter der Schlagzeile. Wer
   die Textwaende entfernt, nimmt der Karte ihre Haelfte des Satzes.

   Die drei Projektbilder sind gezeichnet, nicht fotografiert: Kran, Rohbau,
   Fassadengeruest. Ein Stockfoto waere hier eine erfundene Referenz. */
type MockBau = {
  readonly marke: string;
  readonly adresse: string;
  readonly nav: readonly string[];
  readonly cta: string;
  readonly zweitCta: string;
  readonly headline: readonly string[];
  readonly lead: string;
  readonly leistungen: readonly string[];
  readonly projekte: readonly string[];
};

export function FallAngebot({ titel, mock }: { titel: string; mock: MockBau }) {
  /* Drei Projektkacheln auf der Satzbreite 134..866, Fuge 22. */
  const kachelBreite = 229;

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

      {/* Die zwei Textwaende dahinter, in den beiden freien Ecken. */}
      <g opacity="0.3">
        <g transform="rotate(-8 190 240)">
          <rect className="st-fill-paper" x="14" y="8" width="310" height="470" rx="14" />
          <Textzeilen
            x={44}
            y={40}
            breiten={[250, 218, 242, 186, 250, 212, 234, 168, 246, 206, 238, 180]}
            hoehe={9}
            abstand={35}
          />
        </g>
        <g transform="rotate(7 810 790)">
          <rect className="st-fill-paper" x="676" y="556" width="310" height="450" rx="14" />
          <Textzeilen
            x={706}
            y={588}
            breiten={[250, 218, 242, 186, 250, 212, 234, 168, 246, 206, 238]}
            hoehe={9}
            abstand={35}
          />
        </g>
      </g>

      {/* Das fertige Fenster */}
      <g>
        <rect className="st-fill-paper" x="90" y="150" width="820" height="720" rx="24" />
        <rect className="st-fill-chip" x="90" y="150" width="820" height="52" rx="24" />
        <rect className="st-fill-chip" x="90" y="180" width="820" height="22" />
        <path className="st-stroke-soft" d="M90 202H910" strokeWidth="1.5" />
        {[124, 150, 176].map((cx) => (
          <circle key={cx} className="st-fill-line" cx={cx} cy="176" r="6" />
        ))}
        <rect className="st-fill-paper" x="300" y="162" width="400" height="28" rx="14" />
        <text
          className="st-fill-ink"
          x="500"
          y="182"
          fontSize="16"
          fontWeight="500"
          /* 0,6 und nicht weniger: schwarz auf Weiss sind das 5,7:1, unter 0,55
             faellt die Adresszeile unter den Grenzwert fuer Fliesstext. */
          fillOpacity="0.6"
          textAnchor="middle"
        >
          {mock.adresse}
        </text>

        {/* Kopfleiste: Marke, Navigation, und der Anfrageknopf ganz rechts. */}
        <text
          className="st-fill-ink"
          x="134"
          y="252"
          fontSize="21"
          fontWeight="800"
          letterSpacing="1.5"
        >
          {mock.marke}
        </text>
        <MockNav x={646} y={252} punkte={mock.nav} groesse={18} abstand={26} anker="end" />
        <rect className="st-fill-mint" x="674" y="222" width="192" height="56" rx="18" />
        <text
          className="st-fill-ink"
          x="770"
          y="257"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          {mock.cta}
        </text>
        <path className="st-stroke-soft" d="M134 306H866" strokeWidth="1.5" />

        {mock.headline.map((zeile, i) => (
          <text
            key={zeile}
            className="st-fill-ink"
            x="134"
            y={392 + i * 66}
            fontSize="62"
            fontWeight="800"
            letterSpacing="-1.6"
          >
            {zeile}
          </text>
        ))}
        <text
          className="st-fill-ink"
          x="134"
          y="504"
          fontSize="21"
          fontWeight="500"
          fillOpacity="0.7"
        >
          {mock.lead}
        </text>

        {/* Die eine Handlung, gross, dazu der leise Zweitweg daneben. */}
        <rect className="st-fill-mint" x="134" y="534" width="286" height="64" rx="32" />
        <text className="st-fill-ink" x="166" y="573" fontSize="24" fontWeight="700">
          {mock.cta}
        </text>
        <path
          className="st-stroke-ink"
          d="M354 566h32m0 0-11-11m11 11-11 11"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          className="st-stroke-soft"
          x="444"
          y="534"
          width="252"
          height="64"
          rx="32"
          strokeWidth="2"
        />
        <text
          className="st-fill-ink"
          x="570"
          y="573"
          fontSize="22"
          fontWeight="600"
          fillOpacity="0.78"
          textAnchor="middle"
        >
          {mock.zweitCta}
        </text>

        {/* Die Leistungen als eine Zeile, nicht als drittes Kartengitter. */}
        <path className="st-stroke-soft" d="M134 630H866" strokeWidth="1.5" />
        {mock.leistungen.map((leistung, i) => {
          const lx = 134 + i * 244;

          return (
            <g key={leistung}>
              <circle className="st-fill-mint" cx={lx + 7} cy="661" r="7" />
              <text className="st-fill-ink" x={lx + 26} y="668" fontSize="19" fontWeight="600">
                {leistung}
              </text>
            </g>
          );
        })}

        {/* Drei Projektbilder mit Bildunterschrift. */}
        {mock.projekte.map((projekt, i) => {
          const px = 134 + i * (kachelBreite + 22);

          return (
            <g key={projekt}>
              <rect
                className="st-fill-media"
                x={px}
                y="686"
                width={kachelBreite}
                height="142"
                rx="12"
              />
              {i === 0 && (
                /* Kran: Turm, Ausleger, Gegengewicht, Haken. */
                <g>
                  <rect className="st-fill-ink" x={px + 34} y="768" width="66" height="36" fillOpacity="0.28" />
                  <rect className="st-fill-ink" x={px + 104} y="720" width="12" height="84" />
                  <rect className="st-fill-ink" x={px + 48} y="716" width="140" height="9" />
                  <rect className="st-fill-ink" x={px + 40} y="708" width="22" height="24" />
                  <path className="st-stroke-ink" d={`M${px + 164} 725V760`} strokeWidth="3" />
                  <rect className="st-fill-ink" x={px + 156} y="760" width="16" height="12" rx="2" />
                </g>
              )}
              {i === 1 && (
                /* Rohbau: Giebel im Schnitt, eine Geschossdecke, zwei Staender. */
                <g>
                  <path
                    className="st-stroke-ink"
                    d={`M${px + 44} 804V758l70-38 70 38v46`}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                  <path
                    className="st-stroke-ink"
                    d={`M${px + 44} 778h140M${px + 80} 778v26M${px + 148} 778v26`}
                    strokeWidth="4"
                    strokeOpacity="0.45"
                  />
                  <path
                    className="st-stroke-mint"
                    d={`M${px + 44} 758l70-38 70 38`}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </g>
              )}
              {i === 2 && (
                /* Fassade mit Geruest: Haus, Fenster, mintgruene Rohre. */
                <g>
                  <rect className="st-fill-ink" x={px + 52} y="712" width="126" height="92" fillOpacity="0.9" />
                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                      <rect
                        key={`${r}-${c}`}
                        className="st-fill-paper"
                        x={px + 66 + c * 38}
                        y={724 + r * 24}
                        width="22"
                        height="14"
                        fillOpacity="0.85"
                      />
                    )),
                  )}
                  <path
                    className="st-stroke-mint"
                    d={`M${px + 58} 706v100M${px + 172} 706v100M${px + 52} 730h126M${px + 52} 764h126M${px + 52} 798h126`}
                    strokeWidth="3"
                    strokeOpacity="0.85"
                  />
                </g>
              )}
              <rect className="st-fill-ink" x={px + 20} y="804" width={kachelBreite - 40} height="6" rx="3" />
              <text className="st-fill-ink" x={px} y="854" fontSize="18" fontWeight="600">
                {projekt}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ── FALL C: Dach Musterhoehe ─────────────────────────────────────────────
   Mint. Ein schwarzes Telefon vor einer schwarzen Dachkante, dazu ein
   Ladebalken, der ganz durch ist, und drei Winkel als Fahrtrichtung.

   DIE KARTE BEHAUPTET TEMPO UND HANDY, also ist sie die einzige der drei mit
   einem vollstaendig sichtbaren Geraet: nichts haengt unten heraus, nichts
   wartet. Der Kontakt steht zweimal in Sichtweite, oben als Anrufknopf mit
   Nummer und unten als feste Leiste, die beim Scrollen stehen bleibt.

   Die Dachkante am unteren Rand ist eine Silhouette, kein Bild: eine
   gezeichnete Kante, mehr nicht. Das Dach im Schirm wiederholt sie als
   Ziegelmuster. */
type MockDach = {
  readonly marke: string;
  readonly nav: readonly string[];
  readonly headline: readonly string[];
  readonly lead: string;
  readonly ruf: string;
  readonly leistungen: readonly string[];
  readonly leiste: { readonly ruf: string; readonly weg: string };
};

export function FallTempo({ titel, mock }: { titel: string; mock: MockDach }) {
  return (
    <svg viewBox="0 0 1000 800" role="img" aria-label={titel}>
      <defs>
        {/* Der Ziegelschnitt wird beschnitten, nicht gerechnet: seine Grundlinie
            liegt auf der Bildkante, und ohne Maske stiessen seine spitzen Ecken
            aus der abgerundeten Bildflaeche heraus. */}
        <clipPath id="st-c-bild">
          <rect x="348" y="452" width="306" height="140" rx="14" />
        </clipPath>
      </defs>

      <rect className="st-fill-c" width="1000" height="800" />

      {/* Die Dachkante */}
      <path
        className="st-fill-ink"
        d="M0 800V690l236-172 172 118 210-166 194 140 188-108v298z"
        fillOpacity="0.16"
      />
      <path className="st-fill-ink" d="M0 800v-56l248-150 168 104 214-146 186 128 184-96v216z" />

      {/* Drei Schleifspuren links, die auf das Geraet zulaufen: kuerzer und
          blasser nach unten. Vorher stand hier ein gefuellter Ladebalken, und
          der war das Gegenteil eines Arguments: ein Balken, der voll ist,
          sieht aus wie ein Balken, der laedt. */}
      {[
        [70, 330, 200, 1],
        [130, 372, 140, 0.55],
        [180, 414, 90, 0.3],
      ].map(([x, y, w, o]) => (
        <rect
          key={y}
          className="st-fill-ink"
          x={x}
          y={y}
          width={w}
          height="12"
          rx="6"
          fillOpacity={o}
        />
      ))}

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

      {/* Das Telefon. Es beginnt bei y=74, damit das Fiktiv-Kennzeichen auf
          dem Handy nicht die Wortmarke im Schirm verdeckt (die Rechnung dazu
          steht bei Fall A). Unten laeuft nur der schwarze Rahmen aus dem Bild,
          der Schirm bleibt ganz sichtbar: diese Karte behauptet, dass nichts
          abgeschnitten ist. */}
      <g>
        <rect className="st-fill-ink" x="306" y="74" width="390" height="744" rx="54" />
        <rect className="st-fill-paper" x="322" y="108" width="358" height="676" rx="38" />

        <text
          className="st-fill-ink"
          x="348"
          y="160"
          fontSize="17"
          fontWeight="800"
          letterSpacing="1.2"
        >
          {mock.marke}
        </text>
        <MockMenue x={622} y={144} breite={32} />
        <MockNav x={348} y={202} punkte={mock.nav} groesse={16} abstand={20} />
        <path className="st-stroke-soft" d="M348 222H654" strokeWidth="1.5" />

        {mock.headline.map((zeile, i) => (
          <text
            key={zeile}
            className="st-fill-ink"
            x="348"
            y={278 + i * 42}
            fontSize="36"
            fontWeight="800"
            letterSpacing="-0.8"
          >
            {zeile}
          </text>
        ))}
        <text
          className="st-fill-ink"
          x="348"
          y="354"
          fontSize="16"
          fontWeight="500"
          fillOpacity="0.68"
        >
          {mock.lead}
        </text>

        <rect className="st-fill-mint" x="348" y="374" width="306" height="60" rx="20" />
        <MockHoerer x={372} y={388} groesse={30} />
        <text className="st-fill-ink" x="414" y="413" fontSize="22" fontWeight="700">
          {mock.ruf}
        </text>

        {/* Das Bildmotiv: ein Dach im Schnitt, mit Ziegelreihen und einer
            mintgruenen Kante. */}
        <rect className="st-fill-media" x="348" y="452" width="306" height="140" rx="14" />
        <g clipPath="url(#st-c-bild)">
          <path className="st-fill-ink" d="M348 592 501 488 654 592z" />
          {[514, 536, 558, 580].map((y) => {
            const halb = (y - 488) * 1.4712;

            return (
              <path
                key={y}
                className="st-stroke-paper"
                d={`M${501 - halb} ${y}H${501 + halb}`}
                strokeWidth="3"
                strokeOpacity="0.32"
              />
            );
          })}
          <path
            className="st-stroke-mint"
            d="M348 592 501 488 654 592"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </g>

        {/* Drei Leistungszeilen mit Haarlinie, wie auf der echten Seite. */}
        <path className="st-stroke-soft" d="M348 606H654M348 642H654M348 678H654" strokeWidth="1.5" />
        {mock.leistungen.map((leistung, i) => (
          <g key={leistung}>
            <text
              className="st-fill-ink"
              x="348"
              y={630 + i * 36}
              fontSize="17"
              fontWeight="600"
            >
              {leistung}
            </text>
            <path
              className="st-stroke-ink"
              d={`M642 ${618 + i * 36}l8 7-8 7`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.5"
            />
          </g>
        ))}

        {/* Die feste Leiste am unteren Rand: anrufen oder hinfahren. */}
        <rect className="st-fill-ink" x="348" y="720" width="306" height="46" rx="14" />
        <text className="st-fill-paper" x="372" y="749" fontSize="17" fontWeight="700">
          {mock.leiste.ruf}
        </text>
        <rect className="st-fill-mint" x="524" y="730" width="110" height="26" rx="13" />
        <text
          className="st-fill-ink"
          x="579"
          y="748"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          {mock.leiste.weg}
        </text>
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
