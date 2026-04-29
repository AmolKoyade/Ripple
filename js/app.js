/* ══ RIPPLE — Main App ══ */
(function () {

  /* ── STATE ── */
  let state = {
    goal:    2000,
    cupSize: 250,
    wakeH:   7,
    sleepH:  22,
    todayLogged: 0,
    todayLog: [],        // [{ml, time, emoji}]
    weekData: [],        // 7 entries: ml logged per day
    streak: 0,
    bestDay: 0,
    lastLogDate: null,
    goalCelebrated: false
  };

  /* ── STORAGE ── */
  const KEY = 'ripple_v2';

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){}
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        Object.assign(state, saved);
      }
    } catch(e){}
    resetDayIfNeeded();
  }

  function resetDayIfNeeded() {
    const today = todayStr();
    if (state.lastLogDate !== today) {
      // Save yesterday's total into weekData before resetting
      if (state.lastLogDate) {
        pushWeekData(state.todayLogged);
        updateStreak(state.todayLogged >= state.goal);
      } else {
        // First time — initialise empty week
        state.weekData = new Array(7).fill(0);
      }
      state.todayLogged = 0;
      state.todayLog = [];
      state.lastLogDate = today;
      state.goalCelebrated = false;
      save();
    }
    // Ensure weekData has 7 entries
    while (state.weekData.length < 7) state.weekData.unshift(0);
    if (state.weekData.length > 7) state.weekData = state.weekData.slice(-7);
  }

  function pushWeekData(ml) {
    state.weekData.push(ml);
    if (state.weekData.length > 7) state.weekData.shift();
  }

  function updateStreak(hit) {
    if (hit) {
      state.streak = (state.streak || 0) + 1;
    } else {
      state.streak = 0;
    }
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  /* ── ONBOARDING ── */
  const onboarding = document.getElementById('onboarding');
  const appEl      = document.getElementById('app');

  function initOnboarding() {
    // Bind goal opts
    bindOpts('.goal-opt', (v) => {
      state.goal = parseInt(v);
      document.querySelectorAll('.goal-opt').forEach(b => b.classList.toggle('active', b.dataset.val == v));
    });

    bindOpts('.cup-opt', (v) => {
      state.cupSize = parseInt(v);
      document.querySelectorAll('.cup-opt').forEach(b => b.classList.toggle('active', b.dataset.val == v));
    });

    // Set defaults
    document.querySelectorAll('.goal-opt').forEach(b => b.classList.toggle('active', b.dataset.val == state.goal));
    document.querySelectorAll('.cup-opt').forEach(b => b.classList.toggle('active', b.dataset.val == state.cupSize));

    document.getElementById('startBtn').addEventListener('click', () => {
      save();
      showApp();
    });
  }

  function bindOpts(selector, cb) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', () => cb(btn.dataset.val));
    });
  }

  function showApp() {
    onboarding.classList.add('hidden');
    appEl.classList.remove('hidden');
    renderAll();
  }

  /* ── DATE LABEL ── */
  function renderDateLabel() {
    const el = document.getElementById('dateLabel');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  /* ── PROGRESS RING ── */
  const CIRC = 2 * Math.PI * 90; // 565.48

  function renderRing() {
    const pct     = Math.min(state.todayLogged / state.goal, 1);
    const offset  = CIRC * (1 - pct);
    const ring    = document.getElementById('ringProg');
    const mlEl    = document.getElementById('ringMl');
    const pctEl   = document.getElementById('ringPct');

    if (ring)  ring.style.strokeDashoffset = offset;
    if (mlEl)  mlEl.textContent = state.todayLogged.toLocaleString();
    if (pctEl) pctEl.textContent = Math.round(pct * 100) + '%';

    if (pct >= 1 && ring) {
      ring.classList.add('goal-hit');
    } else {
      ring && ring.classList.remove('goal-hit');
    }
  }

  /* ── META PILLS ── */
  function renderMeta() {
    const rem = Math.max(state.goal - state.todayLogged, 0);
    setText('metaGoal', `Goal: ${state.goal.toLocaleString()} ml`);
    setText('metaRem',  rem > 0 ? `Remaining: ${rem.toLocaleString()} ml` : 'Goal reached! 🎉');
  }

  /* ── NUDGE BAR ── */
  function renderNudge() {
    const bar  = document.getElementById('nudgeBar');
    const text = document.getElementById('nudgeText');
    if (!bar || !text) return;

    const { icon, msg, cls } = calcNudge();
    bar.className = 'nudge-bar ' + cls;
    document.querySelector('.nudge-icon').textContent = icon;
    text.textContent = msg;
    bar.classList.add('pop');
    setTimeout(() => bar.classList.remove('pop'), 400);
  }

  function calcNudge() {
    const pct = state.todayLogged / state.goal;
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const activeTotal = state.sleepH - state.wakeH;
    const elapsed = Math.max(hours - state.wakeH, 0);
    const expectedPct = activeTotal > 0 ? elapsed / activeTotal : 0;

    if (state.todayLogged === 0) return { icon: '💧', msg: "Stay hydrated! Log your first drink.", cls: '' };
    if (pct >= 1) return { icon: '🎉', msg: "Daily goal reached! Notifications paused until tomorrow.", cls: 'done' };
    if (pct >= 0.85) return { icon: '🏁', msg: `So close! Only ${(state.goal - state.todayLogged).toLocaleString()} ml left.`, cls: 'on-track' };

    const gap = expectedPct - pct;
    if (gap > 0.25) return { icon: '🚨', msg: `${(state.goal - state.todayLogged).toLocaleString()} ml to go with limited time — drink up!`, cls: 'urgent' };
    if (gap > 0.1)  return { icon: '⚡', msg: `A bit behind — one glass now keeps you on track.`, cls: 'urgent' };
    return { icon: '✅', msg: `On track! Keep drinking consistently.`, cls: 'on-track' };
  }

  /* ── STATS ── */
  function renderStats() {
    const glasses = Math.floor(state.todayLogged / (state.cupSize || 250));
    const now = new Date();
    const hoursActive = Math.max(now.getHours() - state.wakeH + now.getMinutes()/60, 0.5);
    const avgHr = hoursActive > 0 ? Math.round(state.todayLogged / hoursActive) : 0;

    const best = Math.max(state.bestDay || 0, state.todayLogged);
    state.bestDay = best;

    setText('statGlasses', glasses);
    setText('statStreak',  (state.streak || 0) + (state.streak > 0 ? '🔥' : ''));
    setText('statAvg',     avgHr > 0 ? avgHr + ' ml' : '—');
    setText('statBest',    best > 0 ? best.toLocaleString() + ' ml' : '—');
  }

  /* ── WEEK CHART ── */
  function renderWeekChart() {
    const el = document.getElementById('weekChart');
    if (!el) return;

    const today = new Date();
    const maxVal = Math.max(...state.weekData, state.todayLogged, state.goal, 1);

    // Days labels — last 6 history + today
    const days = [];
    for (let i = 6; i >= 1; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push({ label: RIPPLE_DATA.weekDays[d.getDay()], ml: state.weekData[6 - i] || 0, isToday: false });
    }
    days.push({ label: 'Today', ml: state.todayLogged, isToday: true });

    el.innerHTML = days.map(d => {
      const h = Math.max((d.ml / maxVal) * 76, 4);
      const cls = d.isToday ? 'today' : d.ml >= state.goal ? 'goal-hit' : '';
      return `<div class="chart-bar-wrap">
        <div class="chart-bar ${cls}" style="height:${h}px;" title="${d.ml} ml"></div>
        <div class="chart-day">${d.label}</div>
      </div>`;
    }).join('');
  }

  /* ── LOG LIST ── */
  function renderLog() {
    const list = document.getElementById('logList');
    if (!list) return;

    if (!state.todayLog.length) {
      list.innerHTML = `<div class="log-empty">No drinks logged yet today.<br>Tap a quick-add button to start!</div>`;
      return;
    }

    list.innerHTML = state.todayLog.map((entry, idx) => `
      <div class="log-entry" data-idx="${idx}">
        <div class="log-left">
          <div class="log-drop">${entry.emoji}</div>
          <div>
            <div class="log-amt">+${entry.ml} ml</div>
            <div class="log-time">${entry.time}</div>
          </div>
        </div>
        <button class="log-delete" data-idx="${idx}" title="Remove">✕</button>
      </div>
    `).join('');

    list.querySelectorAll('.log-delete').forEach(btn => {
      btn.addEventListener('click', () => removeEntry(parseInt(btn.dataset.idx)));
    });
  }

  /* ── LOGGING ── */
  let undoTimer = null;
  let pendingUndo = null;

  function logWater(ml) {
    const emoji = pickEmoji(ml);
    const time  = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const entry = { ml, time, emoji };

    state.todayLogged += ml;
    state.todayLog.unshift(entry);
    if (state.navigator && navigator.vibrate) navigator.vibrate(15);

    renderAll();
    save();
    showUndoToast(ml, entry);

    // Check goal celebration
    if (state.todayLogged >= state.goal && !state.goalCelebrated) {
      state.goalCelebrated = true;
      setTimeout(() => showCelebration(), 800);
    }
  }

  function pickEmoji(ml) {
    if (ml <= 100) return '☕';
    if (ml <= 200) return '🥛';
    if (ml <= 300) return '💧';
    if (ml <= 500) return '🍶';
    return '🧴';
  }

  function removeEntry(idx) {
    const entry = state.todayLog[idx];
    if (!entry) return;
    state.todayLogged = Math.max(0, state.todayLogged - entry.ml);
    state.todayLog.splice(idx, 1);
    renderAll();
    save();
  }

  /* ── UNDO TOAST ── */
  function showUndoToast(ml, entry) {
    const toast  = document.getElementById('undoToast');
    const msg    = document.getElementById('undoMsg');
    if (!toast) return;

    if (undoTimer) clearTimeout(undoTimer);
    pendingUndo = entry;
    msg.textContent = `+ ${ml} ml logged`;
    toast.classList.remove('hidden');

    undoTimer = setTimeout(() => {
      toast.classList.add('hidden');
      pendingUndo = null;
    }, 5000);
  }

  document.getElementById('undoBtn').addEventListener('click', () => {
    if (!pendingUndo) return;
    const idx = state.todayLog.indexOf(pendingUndo);
    if (idx > -1) removeEntry(idx);
    document.getElementById('undoToast').classList.add('hidden');
    clearTimeout(undoTimer);
    pendingUndo = null;
  });

  /* ── PARTICLES ── */
  function spawnParticles(n = 8) {
    const wrap = document.getElementById('particles');
    if (!wrap) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 4 + Math.random() * 6;
      const angle = Math.random() * 2 * Math.PI;
      const dist  = 60 + Math.random() * 40;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${110 + 90 * Math.cos(angle) - size/2}px;
        top:${110 + 90 * Math.sin(angle) - size/2}px;
        --tx:${(Math.cos(angle) * dist).toFixed(1)}px;
        --ty:${(Math.sin(angle) * dist - 20).toFixed(1)}px;
        animation-delay:${i * 50}ms;
      `;
      wrap.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  /* ── QUICK ADD BUTTONS ── */
  document.querySelectorAll('.quick-btn[data-ml]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ml = parseInt(btn.dataset.ml);
      logWater(ml);
      spawnParticles(6);
    });
  });

  /* ── CUSTOM AMOUNT ── */
  document.getElementById('customAddBtn').addEventListener('click', () => {
    document.getElementById('customOverlay').classList.remove('hidden');
    document.getElementById('customInput').focus();
  });

  document.getElementById('closeCustom').addEventListener('click', () => {
    document.getElementById('customOverlay').classList.add('hidden');
  });

  document.querySelectorAll('.preset-chip').forEach(c => {
    c.addEventListener('click', () => {
      document.getElementById('customInput').value = c.dataset.ml;
    });
  });

  document.getElementById('addCustomBtn').addEventListener('click', () => {
    const val = parseInt(document.getElementById('customInput').value);
    if (!val || val < 1 || val > 2000) {
      document.getElementById('customInput').style.animation = 'shake .3s ease';
      setTimeout(() => document.getElementById('customInput').style.animation = '', 400);
      return;
    }
    logWater(val);
    spawnParticles(6);
    document.getElementById('customOverlay').classList.add('hidden');
    document.getElementById('customInput').value = '';
  });

  /* ── CLEAR DAY ── */
  document.getElementById('clearDayBtn').addEventListener('click', () => {
    if (!state.todayLog.length) return;
    if (confirm('Clear all of today\'s logs?')) {
      state.todayLogged = 0;
      state.todayLog = [];
      state.goalCelebrated = false;
      renderAll();
      save();
    }
  });

  /* ── CELEBRATION ── */
  function showCelebration() {
    document.getElementById('celebration').classList.remove('hidden');
  }

  document.getElementById('celClose').addEventListener('click', () => {
    document.getElementById('celebration').classList.add('hidden');
  });

  /* ── SETTINGS ── */
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsOverlay').classList.add('hidden');
  });
  document.getElementById('settingsOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('settingsOverlay'))
      document.getElementById('settingsOverlay').classList.add('hidden');
  });
  document.getElementById('customOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('customOverlay'))
      document.getElementById('customOverlay').classList.add('hidden');
  });

  function openSettings() {
    // Sync selectors
    document.querySelectorAll('#settingsPanel .goal-opt').forEach(b =>
      b.classList.toggle('active', parseInt(b.dataset.val) === state.goal));
    document.querySelectorAll('#settingsPanel .cup-opt').forEach(b =>
      b.classList.toggle('active', parseInt(b.dataset.val) === state.cupSize));

    // Populate hour selects
    populateHourSelect('wakeSelect',  state.wakeH);
    populateHourSelect('sleepSelect', state.sleepH);

    document.getElementById('settingsOverlay').classList.remove('hidden');
  }

  function populateHourSelect(id, selected) {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '';
    for (let h = 0; h <= 23; h++) {
      const ampm = h < 12 ? 'AM' : 'PM';
      const disp = h === 0 ? '12' : h > 12 ? h - 12 : h;
      const opt = document.createElement('option');
      opt.value = h;
      opt.textContent = `${disp}:00 ${ampm}`;
      if (h === selected) opt.selected = true;
      sel.appendChild(opt);
    }
  }

  // Settings option selectors
  document.querySelectorAll('#settingsPanel .goal-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#settingsPanel .goal-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('#settingsPanel .cup-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#settingsPanel .cup-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('saveSettings').addEventListener('click', () => {
    const activeGoal = document.querySelector('#settingsPanel .goal-opt.active');
    const activeCup  = document.querySelector('#settingsPanel .cup-opt.active');
    if (activeGoal) state.goal    = parseInt(activeGoal.dataset.val);
    if (activeCup)  state.cupSize = parseInt(activeCup.dataset.val);
    state.wakeH  = parseInt(document.getElementById('wakeSelect').value);
    state.sleepH = parseInt(document.getElementById('sleepSelect').value);

    // Update featured cup button label
    const featBtn = document.getElementById('defaultCupBtn');
    if (featBtn) {
      featBtn.dataset.ml = state.cupSize;
      featBtn.querySelector('.quick-ml').textContent = state.cupSize + ' ml';
    }

    save();
    renderAll();
    document.getElementById('settingsOverlay').classList.add('hidden');
  });

  document.getElementById('resetAllBtn').addEventListener('click', () => {
    if (confirm('Reset ALL data? This cannot be undone.')) {
      localStorage.removeItem(KEY);
      location.reload();
    }
  });

  /* ── RENDER ALL ── */
  function renderAll() {
    renderDateLabel();
    renderRing();
    renderMeta();
    renderNudge();
    renderStats();
    renderWeekChart();
    renderLog();
  }

  /* ── HELPERS ── */
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ── BOOT ── */
  function boot() {
    load();

    const hasSetup = !!localStorage.getItem(KEY);
    if (hasSetup) {
      showApp();
    } else {
      // Show onboarding
      initOnboarding();
      appEl.classList.add('hidden');
      onboarding.classList.remove('hidden');
    }
  }

  document.addEventListener('DOMContentLoaded', boot);

})();
