/* ============================================================================
   EINE SEITE JE ENTWURF.

   ══ WARUM ES DIESE ROUTE SEIT DEM 2026-09-01 GIBT ══════════════════════════
   Youssefs Mentor: "additionally create a page for each prototype ... and have
   the hover animation to have a card with the name of the business and a link
   to the page where you would provide more info, like /clear-flow."

   Das ist der Unterschied zwischen einer Galerie und einem Portfolio. Die
   Galerie zeigt, WIE etwas aussieht. Erst eine Seite je Entwurf kann sagen,
   WARUM es so aussieht, und genau das steht hier: drei
   Gestaltungsentscheidungen, und darunter der Entwurf in ganzer Laenge.

   DER ENTWURF STEHT HIER ALS ECHTE SEITE, nicht als Bild. Auf der Startseite
   ist er ein PNG, weil dort sechs Stueck nebeneinander liegen. Hier ist es
   einer, und ein Besucher, der auf eine Gestaltung klickt, soll sie im
   Browser dehnen, verkleinern und auf dem Telefon ansehen koennen. Eine
   Aufnahme kann das nicht, und bei einem Anbieter von Websites ist gerade
   das der Beweis.

   ══ DIE IMPORTE STEHEN HIER UND NICHT IN EINEM LAYOUT ══════════════════════
   Wie auf der Startseite: `start.css` und die Wix-Madefor-Schriften gehoeren
   dieser Route und der Startseite, nicht dem Wurzel-Layout. Stuenden sie
   dort, traefen sie /impressum und /datenschutz mit, die auf Inter und
   Newsreader laufen. `entwurf.css` kommt dazu, denn hier wird ein Entwurf
   wirklich gerendert.

   ZWEI <h1> AUF EINER SEITE, und das ist eine bewusste Abwaegung: eines fuer
   diese Seite (der Name des Betriebs), eines im Entwurf selbst (seine
   Schlagzeile). HTML erlaubt das, und die Alternative waere schlechter
   gewesen: der Entwurf ist auch unter der Erfassungsroute eine eigenstaendige
   Seite und braucht dort seine eigene oberste Ueberschrift. Der Vorschau-
   Bereich traegt deshalb ein aria-label, damit hoerbar bleibt, wo das eine
   Dokument aufhoert und das gezeigte anfaengt.
   ========================================================================== */

import "@fontsource-variable/wix-madefor-display";
import "@fontsource-variable/wix-madefor-text";
import "@/components/start/start.css";
import "@/components/entwuerfe/entwurf.css";
import "./werk.css";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import EntwurfSeite from "@/components/entwuerfe/entwurf";
import StartFuss from "@/components/start/fuss";
import StartLeiste from "@/components/start/leiste";
import { entwuerfe, entwurfNach } from "@/content/entwuerfe";
import { start } from "@/content/start";

// Sechs Entwuerfe, sechs Seiten, alle beim Bauen erzeugt. `dynamicParams`
// aus: /work/irgendwas ist ein 404 und keine leere Seite.
export const dynamicParams = false;

export function generateStaticParams() {
  return entwuerfe.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = entwurfNach(slug);
  if (!e) return {};

  return {
    title: `${e.marke}: a ${e.branche.toLowerCase()} website design`,
    description: e.kurz,
    alternates: { canonical: `/work/${e.slug}` },
  };
}

export default async function WerkSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = entwurfNach(slug);
  if (!e) notFound();

  const w = start.werk;
  const andere = entwuerfe.filter((x) => x.slug !== e.slug);

  return (
    <div className="st-page">
      <StartLeiste variante="werk" />

      <main id={start.sprungmarke.zielId}>
        <section className="st-sect wk-kopf">
          <div className="st-wrap">
            <p className="st-eyebrow">{e.branche}</p>
            <h1 className="wk-titel">{e.marke}</h1>
            <p className="st-lead wk-kurz">{e.kurz}</p>

            <p className="wk-hinweis">{w.hinweis}</p>

            <div className="wk-notizen">
              <p className="wk-notizen__kopf">{w.augenbraueNotizen}</p>
              <ul>
                {e.notizen.map((n) => (
                  <li key={n.titel}>
                    <h2>{n.titel}</h2>
                    <p>{n.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Der Entwurf. Er bringt seine eigenen Farben und seine eigene
            Schrift mit; das `wk-buehne`-Element gibt ihm nur eine Kante und
            haelt ihn vom Rest der Seite fern. */}
        <section className="wk-buehne" aria-label={w.vorschau}>
          <div className="wk-rahmen">
            <EntwurfSeite e={e} />
          </div>
        </section>

        <section className="st-sect wk-weiter">
          <div className="st-wrap">
            <h2>{w.weiter.titel}</h2>
            <ul className="wk-weiter__liste">
              {andere.map((a) => (
                <li key={a.slug}>
                  <Link href={`/work/${a.slug}`}>
                    <span className="wk-weiter__name">{a.marke}</span>
                    <span className="wk-weiter__art">{a.branche}</span>
                    <span className="wk-weiter__pfeil" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="st-schluss wk-cta">
          <div className="st-wrap wk-cta__in">
            <h2>{w.cta.titel}</h2>
            <p className="st-schluss__lead">{w.cta.lead}</p>
            <Link className="st-pill st-pill--um" href="/#book">
              {w.cta.knopf}
              <span className="st-pill__pfeil" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>

      <StartFuss />
    </div>
  );
}
