/* ── PHONE MOCKUP INTERACTION ── */

(function () {
  const GOAL    = RIPPLE.GOAL;
  const LOG_AMT = RIPPLE.LOG_AMT;

  let totalLogged = 1625;
  let glassCount  = 5;

  function updateUI() {
    const pct = Math.round((totalLogged / GOAL) * 100);
    const rem = Math.max(GOAL - totalLogged, 0);

    // Wave
    const fill    = document.getElementById('waveFill');
    const shimmer = document.getElementById('waveShimmer');
    if (fill)    fill.style.height    = pct + '%';
    if (shimmer) shimmer.style.bottom = pct + '%';

    // Text labels
    setText('pctText',   pct + '%');
    setText('mlText',    totalLogged.toLocaleString() + ' ml');
    setText('remStat',   rem > 0 ? rem + ' ml' : 'Goal!');
    setText('glassStat', glassCount);

    // Goal reached styling
    if (pct >= 100) {
      const pctEl = document.getElementById('pctText');
      if (pctEl) pctEl.classList.add('goal-reached');
    }
  }

  function addLogEntry() {
    const now = new Date();
    const t   = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const list = document.getElementById('logList');
    if (!list) return;

    const entry = document.createElement('div');
    entry.className = 'log-entry new-entry';
    entry.innerHTML = `<span>${LOG_AMT} ml</span><span>${t}</span>`;
    list.insertBefore(entry, list.firstChild);

    // Keep only 4 entries
    while (list.children.length > 4) {
      list.removeChild(list.lastChild);
    }
  }

  function logWater() {
    if (totalLogged >= GOAL) return;
    totalLogged  = Math.min(totalLogged + LOG_AMT, GOAL);
    glassCount  += 1;
    addLogEntry();
    updateUI();
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function init() {
    const btn = document.getElementById('logBtn');
    if (btn) btn.addEventListener('click', logWater);
    updateUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
