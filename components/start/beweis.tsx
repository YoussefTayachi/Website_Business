import Laufband from "./laufband";
import Reveal from "./reveal";

/**
 * Der Streifen unter dem Hero. Seit dem 2026-09-05 steht hier NUR NOCH das
 * Laufband der sechs Gewerke.
 *
 * WAS HIER STAND UND WARUM ES WEG IST: ein Satz ("This site, the app that
 * emailed you, every design below: all built by me.") mit zwei Chips auf
 * frostbreaker.app und app.frostbreaker.app. Der Mentor am 2026-09-05:
 * "Remove the 'This site, the app that emailed you ...' below the hero
 * section because it doesn't make sense to have it there when it's just a
 * different page." Richtig: wer aus der Mail kommt, hat die App nie gesehen,
 * der Satz verwies auf etwas, das fuer ihn nicht existiert. Der Beleg
 * dafuer, dass hier gebaut wird, steht weiter unten unter "Real work", mit
 * Aufnahme und Link, und dort ist er nachpruefbar.
 *
 * Die Chips sind mitgegangen: ohne den Satz standen zwei Adressen ohne
 * Zusammenhang da, und frostbreaker.app ist unter "Real work" verlinkt.
 */
export default function StartBeweis() {
  return (
    <Reveal as="section" className="st-beweis">
      <div className="st-rise" style={{ ["--i" as string]: 0 }}>
        <Laufband />
      </div>
    </Reveal>
  );
}
