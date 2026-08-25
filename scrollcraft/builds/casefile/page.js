/* ============================================================================
   page.js: bespoke behaviour for this build only. The engine (scrollcraft.js)
   is never touched; this reads --sc-p off the act element the same way any
   page-local script is meant to, per devices.md "Composing an act".

   THE SIGNATURE MOVE ("scroll speed is the proof"): inside the showcase-peak
   act, two miniature demo sites sit in the same frame. As the reader scrolls
   through the act, both inner tracks are driven off the real scroll position,
   but the bad one is deliberately rendered at a throttled, jittery rate while
   the good one is rendered every frame, 1:1. The lag is not simulated with an
   eased CSS transition (that would just look like gentle easing); it is a
   real gap between the target position and the position actually painted,
   updated on a ragged schedule, which is what a slow site's paint thread
   actually does under a fast scroll.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }

  function initPeak() {
    var act = document.querySelector('[data-sc-peak]');
    if (!act) return;

    var frame = act.querySelector('.demo-frame');
    var stage = act.querySelector('[data-sc-stage]');
    var viewport = act.querySelector('.demo-frame__viewport');
    var badTrack = act.querySelector('.demo-track--bad');
    var goodTrack = act.querySelector('.demo-track--good');
    var goodPane = act.querySelector('.demo-pane--good');
    var badStatus = act.querySelector('.demo-status--bad');
    var goodStatus = act.querySelector('.demo-status--good');
    var callouts = Array.prototype.slice.call(act.querySelectorAll('[data-checkpoint]'));
    if (!frame || !badTrack || !goodTrack || !goodPane) return;

    var badMax = 0, goodMax = 0;
    function measure() {
      var vh = viewport.clientHeight;
      badMax = Math.max(0, badTrack.scrollHeight - vh);
      goodMax = Math.max(0, goodTrack.scrollHeight - vh);
    }
    measure();
    window.addEventListener('resize', measure);

    var badTarget = 0, badRendered = 0, goodRendered = -1;
    var frame_n = 0, stall = 0;
    var lastActive = '';

    function getP() {
      var v = parseFloat(act.style.getPropertyValue('--sc-p'));
      return isNaN(v) ? 0 : v;
    }

    function tick() {
      var p = getP();
      // three phases inside the act's own progress: read the bad site,
      // switch, read the good site.
      var badP = clamp01(p / 0.44);
      var switchP = clamp01((p - 0.40) / 0.14);
      var goodP = clamp01((p - 0.56) / 0.44);

      badTarget = badP * badMax;
      var goodTarget = goodP * goodMax;

      if (reduce) {
        badRendered = badTarget;
        goodRendered = goodTarget;
      } else {
        // BAD: updates on a ragged schedule and never fully catches up, plus
        // the occasional dropped-frame stall, so the reader's own scrolling
        // visibly outruns what is on screen.
        frame_n++;
        if (stall > 0) {
          stall--;
        } else {
          if (frame_n % 4 === 0) {
            badRendered += (badTarget - badRendered) * 0.30;
            if (Math.random() < 0.10) stall = 5 + Math.floor(Math.random() * 8);
          }
        }
        // GOOD: exact, every frame.
        goodRendered = goodTarget;
      }

      badTrack.style.transform = 'translate3d(0,' + (-badRendered).toFixed(1) + 'px,0)';
      goodTrack.style.transform = 'translate3d(0,' + (-goodRendered).toFixed(1) + 'px,0)';
      goodPane.style.clipPath = 'inset(0 ' + (100 - switchP * 100).toFixed(1) + '% 0 0)';

      var active = p < 0.5 ? 'bad' : 'good';
      if (active !== lastActive) {
        if (badStatus) badStatus.classList.toggle('is-active', active === 'bad');
        if (goodStatus) goodStatus.classList.toggle('is-active', active === 'good');
        lastActive = active;
      }

      callouts.forEach(function (el) {
        var range = (el.getAttribute('data-checkpoint') || '').split(' ').map(parseFloat);
        var on = p >= range[0] && p <= range[1];
        el.classList.toggle('is-active', on);
      });

      // Report the real rendered state so the verification harness grades
      // this bespoke stage instead of assuming a pinned act with no engine
      // cues is dead. See verify.md, "Bespoke fixed stages must report
      // their visible state."
      if (stage) {
        stage.setAttribute('data-sc-verify-state',
          'p=' + p.toFixed(2) +
          ' bad=' + Math.round(badRendered) +
          ' good=' + Math.round(goodRendered) +
          ' switch=' + switchP.toFixed(2));
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------------
  // Keyboard focus on the close act's CTA. The engine centres a faded
  // control on focusin for ordinary acts, but cannot for a pinned one: a
  // pinned stage is position: sticky, so "centring" it only scrolls the
  // reader backwards out of the act, which parks progress at 0 and leaves
  // the cue dark. See verify.md, "It does not fix a pinned act". The close
  // act's cue is a single-value hold at 0.05, so parking progress just past
  // that point is enough to guarantee the CTA is lit before it is focused.
  // ---------------------------------------------------------------------
  function initCloseFocus() {
    var act = document.getElementById('kontakt');
    if (!act) return;
    // The engine's own focusin handler (scrollcraft.js) registers first and
    // calls el.scrollIntoView({block:'center'}), which is exactly the wrong
    // move on a sticky pinned stage (see the comment above). Because this
    // listener is attached after mount(), on the same 'focusin' bubble on
    // window, it runs second on the same dispatch and gets the final word.
    window.addEventListener('focusin', function (e) {
      var el = e.target;
      if (!el || !act.contains(el)) return;
      var vh = window.innerHeight;
      var height = act.offsetHeight;
      var travel = Math.max(height - vh, 1);
      var targetP = 0.30; // safely inside the "0.05" hold's plateau
      var y = act.offsetTop + targetP * travel;
      window.scrollTo({ top: y, behavior: 'instant' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPeak();
      initCloseFocus();
    });
  } else {
    initPeak();
    initCloseFocus();
  }
})();
