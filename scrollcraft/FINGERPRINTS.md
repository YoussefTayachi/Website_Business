# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| casefile | Filmic one-shot | Fixed minimal bar, wordmark + one CTA label ("Email me"), used everywhere | `pin`, a still image (no video) behind an iris reveal, greet-cue kinetic headline | 9 acts, ~14.2vh: pin > flow+reveal > flow > pin(peak) > pan > flow > pan > flow > pin | `pin` span 1.15, spotlight + magnet CTA, footer folded into the same stage, single-value hold cue | "Scroll speed is the proof": two live demo mini-sites share one browser-chrome frame; the bad one's inner scroll is rendered on a throttled, jittery schedule while the reader scrolls it, the good one tracks 1:1, both driven by page-local rAF reading `--sc-p`, no video anywhere on the page | Low-key cinematic, forensic/interview-room variant: one hard warm key against a cool near-black field, two generated stills only | 4531 |

*(first build: nothing to clear against. Every dimension above is free for
this row; the next build has to differ from it on at least 4 of 6.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **casefile** claims: filmic one-shot as a *deliberate* choice (not the
  reach-for-default it was in earlier registries elsewhere), a browser-chrome
  demo frame as the hero/peak device, a two-pane live-scroll-speed comparison
  as the signature move, and a 9-act / ~14.2vh page shape. A later build in
  this workspace that also wants filmic one-shot needs a different nav
  treatment, hero device, act shape or close pattern to still clear the gate.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
