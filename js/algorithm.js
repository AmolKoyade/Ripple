/* ── REMAINING GOAL ALGORITHM ── */

(function () {
  const COLORS = {
    urgent:  '#E87050',
    moderate:'#F5B040',
    relaxed: '#00B4D8',
    done:    '#3AC97B'
  };

  const NOTES = {
    urgent:   'Catch-up mode active — short intervals to help close the gap before the window closes.',
    moderate: 'Moderate pace — slightly accelerated nudges to stay on course.',
    relaxed:  'Comfortable pace — you are ahead of schedule. Relaxed notification cadence.',
    done:     'All notifications silenced. Daily goal achieved — well done.'
  };

  /**
   * Core algorithm:
   *   ml per hour needed = remaining / hoursLeft
   *   minutes per 250ml glass = (250 / mlPerHour) * 60
   *   clamped to [20, 120] minutes
   */
  function calcNudge(remaining, hoursLeft) {
    if (remaining <= 0) return { minutes: 0, state: 'done' };
    const mlPerHour = remaining / hoursLeft;
    const mins      = Math.round((250 / mlPerHour) * 60);
    const clamped   = Math.max(20, Math.min(120, mins));
    const state     = clamped <= 35 ? 'urgent' : clamped <= 65 ? 'moderate' : 'relaxed';
    return { minutes: clamped, state };
  }

  function update() {
    const rSlider = document.getElementById('algR');
    const hSlider = document.getElementById('algH');
    if (!rSlider || !hSlider) return;

    const rem = parseInt(rSlider.value, 10);
    const hrs = parseFloat(hSlider.value);

    // Slider readouts
    setText('algROut', rem);
    setText('algHOut', hrs.toFixed(1) + ' h');

    // Metric cards
    setText('algRem', rem + ' ml');
    setText('algHrs', hrs.toFixed(1) + ' h');

    const { minutes, state } = calcNudge(rem, hrs);
    const nudgeEl = document.getElementById('algNudge');
    if (nudgeEl) {
      nudgeEl.textContent = state === 'done' ? 'Goal met' : minutes + ' min';
      nudgeEl.style.color = COLORS[state];

      // Brief animation
      nudgeEl.classList.remove('updated');
      void nudgeEl.offsetWidth; // reflow
      nudgeEl.classList.add('updated');
    }

    setText('algNote', NOTES[state]);
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function init() {
    const rSlider = document.getElementById('algR');
    const hSlider = document.getElementById('algH');
    if (rSlider) rSlider.addEventListener('input', update);
    if (hSlider) hSlider.addEventListener('input', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
