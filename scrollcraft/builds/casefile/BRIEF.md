# BRIEF: casefile

Interview conducted with the human before any generation (Step 0 of scrollcraft).
Answers below are verbatim, not paraphrased.

## Step 0: interview

**1. Vibe, three to five words, plus references.**
"Kino-Tech-Noir" (dark, atmospheric, dramatic light, feels like a trailer for a
thriller, not like a tool). No named sites; interpreted as a forensic
report/measurement-tag aesthetic combined with noir light: interrogation-room
spotlight character, editorial rather than kitsch.

**2. The scroll journey, section by section, in their words.**
Hero, Befund/Tension, Showcase Vorher/Nachher (the heart of the page, with the
three demo-industry scenes), Leistungen (services), Prozess (process), Ueber
Youssef (about), Kontakt (contact). Order taken directly from the existing
`PLAN.md`.

**3. Energy curve.**
Calm opening, peak at the switch moment (before/after), calm again afterward
through to the close. Not loud the whole way.

**4. Feeling stage by stage, and the ONE moment.**
Hero = suspicion / cold. Befund = growing unease ("this is about me"). Showcase
switch = the peak, felt relief / surprise. Leistungen/Prozess = trust /
clarity. Ueber = closeness. Kontakt = resolve.

**5. One thing this site does that nobody else's does.**
"Scroll speed is the proof." Scrolling through the bad version actually lags,
visibly, physically felt, not just claimed. Scrolling through the new version
tracks the wheel with no delay. The difference is felt in the hand, not read
in a sentence.

**6. Aesthetic range.**
"Editorial, gedeckt" (editorial, restrained). Close to the existing
inspection-tag concept: precise, high quality, restrained colour with one
strong accent. Noir through light and contrast, not through volume or
maximalism.

**7. One world or distinct scenes?**
Distinct scenes. No unbroken camera flight. The three demo industries are
independent case studies; a cut between them is more honest than a forced
flight connecting them.

**8. Existing assets.**
None. Everything generated, and generated sparingly: the budget is 80 KIE.ai
credits, checked live before this build (`kie.mjs probe`).

---

## Step 1: brief (self-derived from the business context, confirmed against the
interview, not re-asked because the answers above already cover it)

**What is this, and who is it for?**
A solo web designer's landing page, the destination of a cold email. Youssef
sends a plain-language email to trade businesses (builders, electricians,
roofers) naming one concrete fault on their own site. The page the link opens
has to survive the same scrutiny it is asking the visitor to apply to
themselves.

**What must the visitor believe by the end?**
That this person can actually tell what is wrong with a website at a glance,
and can prove it, not just claim it.

**What does the visitor do next?**
Write an email. One CTA, one label, `mailto:`, everywhere on the page. No
booking link, no form (there is no backend to receive one).

**What already exists?**
Nothing. Palette, type and the six demo pairs are all built for this page.

**Art direction.**
Low-key cinematic (worlds.md #1), tuned toward a forensic interview-room mood:
one hard key light, deep black falloff, warm amber highlight against a cold
grey-blue field. The measurement-tag language (hairline leader lines,
monospace uppercase callouts) carries over from the existing `PLAN.md` concept,
now as an English scroll page rather than a static German one-pager.

---

## The journey

```
1  Hero          suspicion, cold        a single light on a fault, before you're told what it is
2  Befund        growing unease         findings landing one at a time, plain, unembellished
3  Hinge         held breath            the page goes quiet, one line, before it shows you
4  Showcase Peak relief, surprise       the switch: you feel the bad site drag, then the new one glide
5  Showcase Range curiosity, proof      two more cases confirm it wasn't a trick
6  Leistungen    clarity                what he actually builds, stated plainly
7  Prozess       confidence             how the work happens, four steps, no mystery
8  Ueber         closeness              his own voice, first person, no team, no stock photo
9  Kontakt       resolve                the page stops moving and hands you one way to write
```

## The feeling curve

| # | Act | Feeling | What causes it |
|---|---|---|---|
| 1 | Hero | Suspicion, cold | Black screen, then an iris wipe opens on a single hard key light over a measuring tool laid across a keyboard. Headline lands already lit (greet cue), clipped and flat. |
| 2 | Befund | Growing unease | Three findings appear one at a time over the same dark ground, in the exact monospace/leader-line language of a real inspection tag. No adjectives, just the measured fact. |
| 3 | Hinge | Held breath | Near-empty dark viewport. One short line. Deliberate silence, authored, not a loading gap: this is the beat before the switch and it is meant to feel empty. |
| 4 | Showcase Peak | Relief, surprise (**THE PEAK**) | Scrolling the bad demo site inside its own frame and feeling it genuinely lag under the hand: the signature move. A wipe, then the same content in the rebuilt version tracks the wheel exactly, no delay. Largest span on the page by a clear margin. |
| 5 | Showcase Range | Curiosity, confirmation | Two further case files (a restaurant, a law practice) pan past, each with its own measured fault and fix, proving the first one wasn't cherry-picked. |
| 6 | Leistungen | Clarity | Three plain statements of what gets built, no icon grid, no cards. |
| 7 | Prozess | Confidence | Four steps travel past on a hairline timeline, blueprint in spirit, no drama. |
| 8 | Ueber | Closeness | First-person voice, a close still of tools on a desk (not a posed portrait, no stock photo, no fabricated headshot). |
| 9 | Kontakt | Resolve | The page stops. One line, one mailto CTA that leans toward the pointer, footer folded into the same stage so nothing trails off after it. |

Two adjacent acts never share a feeling word: cold -> unease -> held breath ->
relief (peak) -> curiosity -> clarity -> confidence -> closeness -> resolve is
nine distinct states in sequence.

## The peak

> You scroll through the broken demo and your own hand can feel it dragging
> half a beat behind the wheel, like a page that hasn't loaded. Then it wipes
> to the rebuilt version and the same scroll suddenly tracks your hand exactly,
> instantly, and you didn't have to be told which one was better.

Lives in act 4, Showcase Peak. It gets the largest `data-sc-span` on the page,
the silence of act 3 immediately in front of it, and the only bespoke JS on
the site.

## The tell-someone sentence

"It's the site where the bad demo actually stutters while you're scrolling it
with your own hand, and then the fixed one glides, before you've read a single
line explaining why."

## Authored silence

Act 3 (Hinge) is an intentionally near-empty dark viewport with one short line
of copy and no other content. This is deliberate, not dead scroll: it is the
quiet before the peak, called for directly in feel.md section 5. The
verification pass should read it as authored silence, not as a defect.

## Language and content rules for this build

English throughout. No em dashes in visible text (colon, comma or
parentheses instead). No agency plural ("we design"): first person singular
throughout, since it is one person. No invented numbers, load times, client
counts or testimonials. The three demo industries are fictional and every
instance is labelled "Fictional demo. Not a real business." in real markup,
not baked into an image.

## Budget

80 KIE.ai credits confirmed live via `kie.mjs probe` before generation. A
single `kling/v2-1-pro` clip is documented at 160 credits, more than the whole
budget on its own, so **no video is generated for this build**. The peak and
the signature move are both built from live HTML/CSS/JS (the two demo sites
are real rendered markup, and the lag/glide difference is real scroll-handling
code), which is arguably more honest to "the proof is the page itself" than a
generated clip of a fake site would have been. Two stills are generated for
mood (hero, about), at the documented ceiling of 28 credits each, leaving
headroom against a reroll.
