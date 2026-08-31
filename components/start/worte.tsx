import { Fragment, type ReactNode } from "react";

/**
 * Zerlegt eine Ueberschrift in Woerter, damit sie wortweise einlaufen kann.
 *
 * WORTWEISE UND NICHT ZEILENWEISE: eine Zeile weiss nur dann, wo sie
 * anfaengt, wenn man sie von Hand umbricht. Sobald jemand die Schriftgroesse
 * hochstellt, das Fenster schmaler zieht oder der Text uebersetzt wird,
 * stimmen die handgesetzten Zeilen nicht mehr, und die Animation zerfaellt.
 * Ein Wort weiss immer, wo es anfaengt.
 *
 * KEINE MASKE MIT overflow: hidden. Der uebliche Weg fuer so eine Animation
 * ist ein Kasten mit Beschnitt, aus dem das Wort hochfaehrt. Bei einer
 * Serife wie Fraunces schneidet der Beschnitt die Unterlaengen von y, p, g
 * und j ab, und zwar dauerhaft, nicht nur waehrend der Bewegung. Hier
 * bewegen sich deshalb nur Deckkraft und 0,4em.
 *
 * DER ZAEHLER LAEUFT UEBER ALLE ABSCHNITTE HINWEG. Die Ueberschrift besteht
 * aus drei Teilen (vor dem Akzent, Akzent, danach), und die Staffelung darf
 * an der Naht nicht von vorn beginnen, sonst laufen zwei Woerter gleichzeitig
 * ein und der Rhythmus bricht.
 *
 * Die Leerzeichen stehen bewusst ALS EIGENE TEXTKNOTEN zwischen den Spans:
 * ein inline-block verschluckt den Zwischenraum, den er einschliesst, und
 * ohne diese Knoten klebte die Zeile zusammen.
 */
export type Wortsegment = { text: string; klasse?: string };

export function Worte({ segmente, start = 0 }: { segmente: Wortsegment[]; start?: number }) {
  let i = start;

  return (
    <>
      {segmente.map((seg, si) => {
        // trim, damit ein fuehrendes oder folgendes Leerzeichen im Text
        // (etwa "Stop losing customers ") kein leeres Wort erzeugt. Der
        // Abstand zwischen den Segmenten kommt aus dem Fragment darunter.
        const woerter = seg.text.trim().split(/\s+/).filter(Boolean);

        return (
          <Fragment key={si}>
            {si > 0 ? " " : null}
            {woerter.map((w, wi) => {
              const eigenes = i++;
              return (
                <Fragment key={wi}>
                  {wi > 0 ? " " : null}
                  <span
                    className={seg.klasse ? `st-word ${seg.klasse}` : "st-word"}
                    style={{ ["--i" as string]: eigenes }}
                  >
                    {w}
                  </span>
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * Kleiner Helfer fuer alles, was gestaffelt einlaeuft, aber kein Text ist:
 * er setzt nur den Zaehler --i, den start.css in eine Verzoegerung umrechnet.
 */
export function Stufe({
  i,
  className,
  children,
}: {
  i: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className ? `st-rise ${className}` : "st-rise"} style={{ ["--i" as string]: i }}>
      {children}
    </div>
  );
}
