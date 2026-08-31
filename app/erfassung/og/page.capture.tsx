/* ============================================================================
   VORLAGEN FUER DIE METADATEN-BILDER. Zwei Flaechen, die aufgenommen und als
   Bilddatei neben app/layout.tsx abgelegt werden:

       /erfassung/og      -> app/opengraph-image.png   (1200 x 630)
       /erfassung/og?icon -> app/apple-icon.png        (180 x 180)

   WARUM NICHT next/og UND ImageResponse: Satori, das darin steckt, liest
   TTF, OTF und WOFF, aber KEIN WOFF2. Die @fontsource-variable-Pakete
   liefern ausschliesslich WOFF2. Das OG-Bild waere also entweder in einer
   Systemschrift gesetzt, oder es braeuchte eine zweite Schriftquelle nur
   fuer dieses eine Bild. Ueber die Aufnahmestrecke traegt es dieselbe
   Schrift, dieselben Farbtokens und dieselben Entwuerfe wie die Seite.

   DIESE DATEI IST IN EINEM PRODUKTIONSBAU KEINE SEITE (Endung .capture.tsx,
   siehe next.config.mjs). Die erzeugten PNG dagegen liegen fest im Repo und
   sind vom Bau unabhaengig.
   ========================================================================== */

import "@fontsource-variable/wix-madefor-display";
import "@fontsource-variable/wix-madefor-text";
import "@/components/start/start.css";
import "./og.css";

import Image from "next/image";

import bildNorthline from "@/public/arbeiten/entwurf-northline.png";
import bildRidge from "@/public/arbeiten/entwurf-ridge.png";
import bildVoltas from "@/public/arbeiten/entwurf-voltas.png";

export default async function OgVorlage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const nurIcon = "icon" in q;

  if (nurIcon) {
    // Das Apple-Symbol. Dieselbe Bildmarke wie app/icon.svg, nur als Flaeche,
    // die sich aufnehmen laesst. Ohne abgerundete Ecken: iOS rundet selbst,
    // und eine zweite Rundung darunter erzeugt einen hellen Rand.
    return (
      <div data-erfassung="og-icon" className="og-icon">
        <svg viewBox="0 0 512 512" aria-hidden="true">
          <rect width="512" height="512" fill="#0284C7" />
          <g fill="none" stroke="#FFFFFF" strokeWidth="62" strokeLinecap="butt">
            <path d="M 262 400 V 228 A 74 74 0 0 1 336 154" />
            <path d="M 182 252 H 342" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div data-erfassung="og" className="st-page og">
      <div className="og__kopf">
        <span className="og__marke">
          frostbreaker<span className="og__marke-zusatz">marketing</span>
        </span>
      </div>

      <h1 className="og__titel">
        Websites that get <span className="st-akzent">the call</span>.
      </h1>

      <p className="og__lead">Designed and built for local businesses.</p>

      {/* Drei Entwuerfe, angeschnitten am unteren Rand. Angeschnitten und
          nicht vollstaendig: ein OG-Bild wird in der Vorschau klein gezeigt,
          und drei vollstaendige Seiten waeren dort drei graue Flecken. So
          liest man, dass es um Websites geht, ohne sie entziffern zu muessen. */}
      <div className="og__reihe" aria-hidden="true">
        <Image src={bildNorthline} alt="" />
        <Image src={bildVoltas} alt="" />
        <Image src={bildRidge} alt="" />
      </div>
    </div>
  );
}
