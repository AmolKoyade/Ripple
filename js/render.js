/* ── DYNAMIC DOM RENDERING ── */

(function () {

  /* Features */
  function renderFeatures() {
    const container = document.getElementById('features');
    if (!container || !RIPPLE.features) return;
    container.innerHTML = RIPPLE.features.map(f => `
      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon" style="background:${f.iconBg};">${f.icon}</div>
          <div class="feat-title">${f.title}</div>
        </div>
        <div class="feat-desc">${f.desc}</div>
      </div>
    `).join('');
  }

  /* Spec cards */
  function renderSpecs() {
    const container = document.getElementById('specGrid');
    if (!container || !RIPPLE.specs) return;
    container.innerHTML = RIPPLE.specs.map(s => `
      <div class="spec-card">
        <div class="spec-head">
          <div class="spec-dot" style="background:${s.dot};"></div>
          <div class="spec-title">${s.title}</div>
        </div>
        ${s.rows.map(r => `
          <div class="spec-row">
            <span>${r.label}</span>
            <span${r.color ? ` style="color:${r.color};"` : ''}>${r.value}</span>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  /* Notification copy variants */
  function renderCopyVariants() {
    const container = document.getElementById('copyVariants');
    if (!container || !RIPPLE.copyVariants) return;
    container.innerHTML = RIPPLE.copyVariants.map(v => `
      <div class="copy-card">
        <div class="copy-state" style="color:${v.color};">${v.state}</div>
        <div class="copy-text">${v.text}</div>
      </div>
    `).join('');
  }

  /* Design tokens */
  function renderTokens() {
    const container = document.getElementById('tokensGrid');
    if (!container || !RIPPLE.tokens) return;
    container.innerHTML = RIPPLE.tokens.map(t => `
      <div class="token-chip">
        <div class="token-swatch" style="background:${t.hex};${t.border || ''}"></div>
        <div>
          <div class="token-name">${t.name}</div>
          <div class="token-hex">${t.hex}</div>
        </div>
      </div>
    `).join('');
  }

  /* Typography tokens */
  function renderTypography() {
    const container = document.getElementById('typoGrid');
    if (!container || !RIPPLE.typography) return;
    container.innerHTML = RIPPLE.typography.map(t => `
      <div class="typo-item">
        <div class="typo-lbl">${t.lbl}</div>
        <div class="typo-val">${t.val}</div>
        <div class="typo-sub">${t.sub}</div>
      </div>
    `).join('');
  }

  function init() {
    renderFeatures();
    renderSpecs();
    renderCopyVariants();
    renderTokens();
    renderTypography();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
