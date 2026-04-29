/* ── ACTIVE HOURS VISUALIZER ── */

(function () {
  function formatHour(h) {
    const hh   = Math.floor(h);
    const mm   = h % 1 === 0.5 ? '30' : '00';
    const ampm = hh < 12 ? 'AM' : 'PM';
    const disp = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
    return `${disp}:${mm} ${ampm}`;
  }

  function update() {
    const wakeSl  = document.getElementById('wakeSl');
    const sleepSl = document.getElementById('sleepSl');
    if (!wakeSl || !sleepSl) return;

    let w = parseFloat(wakeSl.value);
    let s = parseFloat(sleepSl.value);

    // Guard: sleep must be at least 1hr after wake
    if (s <= w + 1) {
      s = w + 1;
      sleepSl.value = s;
    }

    // Labels
    setText('wakeLbl',  formatHour(w));
    setText('sleepLbl', formatHour(s));

    // Bar position
    const bar = document.getElementById('ahBar');
    if (bar) {
      bar.style.left  = (w  / 24 * 100) + '%';
      bar.style.width = ((s - w) / 24 * 100) + '%';
    }

    // Status text
    const active = (s - w).toFixed(1);
    const silent = (24 - (s - w)).toFixed(1);
    setText('ahStatus', `${active}-hour active window · ${silent} hrs fully silenced`);
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function init() {
    const wakeSl  = document.getElementById('wakeSl');
    const sleepSl = document.getElementById('sleepSl');
    if (wakeSl)  wakeSl.addEventListener('input',  update);
    if (sleepSl) sleepSl.addEventListener('input', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
