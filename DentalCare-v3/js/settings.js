/* ══ SETTINGS JS ══ */

// ── Load saved preferences on page load ──
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const savedTheme = localStorage.getItem('dc_theme') || 'light';
  applyTheme(savedTheme);
  const themeEl = document.querySelector(`[data-theme="${savedTheme}"]`);
  if (themeEl) {
    document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('active'));
    themeEl.classList.add('active');
  }

  // Restore accent color
  const savedColor = localStorage.getItem('dc_color');
  if (savedColor) {
    applyAccentColor(savedColor);
    document.querySelectorAll('.color-opt').forEach(o => {
      o.classList.toggle('active', o.dataset.color === savedColor);
    });
  }

  // Restore font size
  const savedFont = localStorage.getItem('dc_font') || 'md';
  applyFont(savedFont);
  document.querySelectorAll('.font-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.font === savedFont);
  });

  // Day chips
  document.querySelectorAll('.day-chip input').forEach(cb => {
    cb.addEventListener('change', function() {
      this.closest('.day-chip').classList.toggle('active', this.checked);
    });
  });
});

// ── Tab switching ──
function switchTab(btn, tabId) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
}

// ── Theme ──
function applyTheme(theme) {
  const body = document.body;
  if (theme === 'dark') {
    body.classList.add('dark');
  } else if (theme === 'light') {
    body.classList.remove('dark');
  } else if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('dark', prefersDark);
  }
}

function selectTheme(el, theme) {
  document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  applyTheme(theme);
  localStorage.setItem('dc_theme', theme);

  // Apply dark mode to ALL pages via localStorage flag
  broadcastSetting('dc_theme', theme);
  DC.showToast(`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} ✓`);
}

// ── Accent Color ──
function applyAccentColor(color) {
  document.documentElement.style.setProperty('--blue', color);
  // Darken for hover state
  document.documentElement.style.setProperty('--blue2', color);
}

function selectColor(el) {
  document.querySelectorAll('.color-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  const color = el.dataset.color;
  applyAccentColor(color);
  localStorage.setItem('dc_color', color);
  broadcastSetting('dc_color', color);
  DC.showToast('Accent color updated ✓');
}

// ── Font Size ──
function applyFont(size) {
  document.body.classList.remove('font-sm', 'font-md', 'font-lg');
  document.body.classList.add('font-' + size);
}

function selectFont(el, size) {
  document.querySelectorAll('.font-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  applyFont(size);
  localStorage.setItem('dc_font', size);
  broadcastSetting('dc_font', size);
  DC.showToast(`Font size: ${size.charAt(0).toUpperCase() + size.slice(1)} ✓`);
}

// ── Broadcast settings to all pages via localStorage ──
function broadcastSetting(key, value) {
  localStorage.setItem(key, value);
}

// ── Save All ──
function saveSettings() {
  DC.showToast('All settings saved ✓');
}
