// Live Sandbox Playground v2.0 — Console, Resizer, Auto-Save, #code= Share & CDN Injector

let cmHtml, cmCss, cmJs;
let debounceTimeout;
let currentPreset = 'cube';
let consoleCount = 0;

const AUTOSAVE_KEY = 'ia_codeplay_autosave_v2';

const CDN_SNIPPETS = {
  three: '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>',
  gsap: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><\/script>',
  chart: '<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>',
  tailwind: '<script src="https://cdn.tailwindcss.com"><\/script>'
};

const CONSOLE_BRIDGE_SCRIPT = `<script>
(function(){
  function send(level, args) {
    try {
      var text = Array.prototype.slice.call(args).map(function(a){
        if (typeof a === 'object') { try { return JSON.stringify(a); } catch(e) { return String(a); } }
        return String(a);
      }).join(' ');
      parent.postMessage({ type: 'ia-playground-console', level: level, text: text }, '*');
    } catch(e) {}
  }
  ['log','warn','error'].forEach(function(fn){
    var orig = console[fn];
    console[fn] = function(){ send(fn, arguments); if (orig) orig.apply(console, arguments); };
  });
  window.addEventListener('error', function(e){ send('error', [e.message + (e.lineno ? ' (line ' + e.lineno + ')' : '')]); });
  window.addEventListener('unhandledrejection', function(e){ send('error', ['Promise Rejection: ' + (e.reason && e.reason.message ? e.reason.message : e.reason)]); });
})();
<\/script>`;

function getWatermark() {
  return (window.HubUtils && window.HubUtils.getWatermarkCode)
    ? window.HubUtils.getWatermarkCode('Built with IA Code Studio Playground')
    : '';
}

function appendConsoleLine(level, text) {
  const logs = document.getElementById('console-logs');
  const countEl = document.getElementById('console-count');
  if (!logs) return;
  const line = document.createElement('div');
  line.className = `clog-line clog-${level || 'log'}`;
  const prefix = level === 'error' ? '✖ ' : level === 'warn' ? '⚠ ' : '› ';
  line.textContent = prefix + text;
  logs.appendChild(line);
  logs.scrollTop = logs.scrollHeight;
  consoleCount++;
  if (countEl) countEl.textContent = String(consoleCount);
}

function clearConsole() {
  const logs = document.getElementById('console-logs');
  const countEl = document.getElementById('console-count');
  if (logs) logs.innerHTML = '';
  consoleCount = 0;
  if (countEl) countEl.textContent = '0';
}

function initEditors() {
  if (typeof CodeMirror !== 'undefined') {
    cmHtml = CodeMirror.fromTextArea(document.getElementById('editor-html'), {
      mode: 'xml', htmlMode: true, theme: 'material-ocean', lineNumbers: true, lineWrapping: true
    });
    cmCss = CodeMirror.fromTextArea(document.getElementById('editor-css'), {
      mode: 'css', theme: 'material-ocean', lineNumbers: true, lineWrapping: true
    });
    cmJs = CodeMirror.fromTextArea(document.getElementById('editor-js'), {
      mode: 'javascript', theme: 'material-ocean', lineNumbers: true, lineWrapping: true
    });
  } else {
    const createMock = (id) => {
      const el = document.getElementById(id);
      return {
        getValue: () => el.value,
        setValue: (val) => { el.value = val; },
        on: (ev, cb) => { if (ev === 'change') el.addEventListener('input', cb); },
        refresh: () => {}
      };
    };
    cmHtml = createMock('editor-html');
    cmCss = createMock('editor-css');
    cmJs = createMock('editor-js');
  }

  [cmHtml, cmCss, cmJs].forEach(editor => {
    editor.on('change', () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        saveAutosave();
        updatePreview();
      }, 260);
    });
  });
}

function saveAutosave() {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
      html: cmHtml.getValue(),
      css: cmCss.getValue(),
      js: cmJs.getValue()
    }));
  } catch (e) {}
}

function updatePreview() {
  clearConsole();
  const html = cmHtml.getValue();
  const css = cmCss.getValue();
  const js = cmJs.getValue();
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();
  const iframe = document.getElementById('preview-iframe');

  iframe.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${CONSOLE_BRIDGE_SCRIPT}
  <style>${css}</style>
</head>
<body>
  ${html}
  ${includeWatermark ? getWatermark() : ''}
  <script>
    try {
      ${js}
    } catch (err) {
      console.error(err && err.message ? err.message : String(err));
    }
  <\/script>
</body>
</html>`;
}

function generateFullOutput() {
  const html = cmHtml.getValue();
  const css = cmCss.getValue();
  const js = cmJs.getValue();
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Widget — IA Code Studio</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
${includeWatermark ? getWatermark() : ''}
  <script>
${js}
  <\/script>
</body>
</html>`;
}

function loadPreset(presetName) {
  const preset = window.playgroundTemplates[presetName];
  if (!preset) return;
  currentPreset = presetName;
  cmHtml.setValue(preset.html);
  cmCss.setValue(preset.css);
  cmJs.setValue(preset.js);
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-preset') === presetName);
  });
  saveAutosave();
  updatePreview();
}

function tryLoadFromHashOrAutosave() {
  const h = window.location.hash || '';
  if (h.startsWith('#code=')) {
    try {
      const payload = JSON.parse(decodeURIComponent(escape(atob(h.slice(6)))));
      if (payload && typeof payload.html === 'string') {
        cmHtml.setValue(payload.html);
        cmCss.setValue(payload.css || '');
        cmJs.setValue(payload.js || '');
        updatePreview();
        if (window.HubUtils) window.HubUtils.showToast(currentLang === 'en' ? '🔗 Shared snippet loaded!' : '🔗 Snippet partagé chargé !', 'success');
        return true;
      }
    } catch (e) {}
  }
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data && (data.html || data.css || data.js)) {
        cmHtml.setValue(data.html || '');
        cmCss.setValue(data.css || '');
        cmJs.setValue(data.js || '');
        updatePreview();
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function initResizer() {
  const resizer = document.getElementById('split-resizer');
  const layout = document.getElementById('playground-layout');
  const leftPane = document.getElementById('editor-pane');
  const iframe = document.getElementById('preview-iframe');
  if (!resizer || !layout || !leftPane) return;

  let dragging = false;
  resizer.addEventListener('mousedown', () => {
    dragging = true;
    resizer.classList.add('dragging');
    if (iframe) iframe.style.pointerEvents = 'none';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = layout.getBoundingClientRect();
    const pct = Math.min(75, Math.max(25, ((e.clientX - rect.left) / rect.width) * 100));
    leftPane.style.width = `${pct}%`;
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    resizer.classList.remove('dragging');
    if (iframe) iframe.style.pointerEvents = '';
    if (cmHtml) cmHtml.refresh();
    if (cmCss) cmCss.refresh();
    if (cmJs) cmJs.refresh();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initEditors();
  initResizer();

  if (!tryLoadFromHashOrAutosave()) {
    loadPreset('cube');
  }

  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'ia-playground-console') {
      appendConsoleLine(e.data.level, e.data.text);
    }
  });

  // Tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.editor-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`wrapper-${tab}`).classList.add('active');
      if (tab === 'html') cmHtml.refresh();
      if (tab === 'css') cmCss.refresh();
      if (tab === 'js') cmJs.refresh();
    });
  });

  // Presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => loadPreset(btn.getAttribute('data-preset')));
  });

  // CDN Quick-Injector
  const cdnSel = document.getElementById('cdn-injector');
  if (cdnSel) {
    cdnSel.addEventListener('change', () => {
      const key = cdnSel.value;
      if (key && CDN_SNIPPETS[key]) {
        const cur = cmHtml.getValue();
        if (!cur.includes(CDN_SNIPPETS[key])) {
          cmHtml.setValue(CDN_SNIPPETS[key] + '\n' + cur);
          updatePreview();
          if (window.HubUtils) window.HubUtils.showToast(`⚡ ${key.toUpperCase()} CDN injected!`, 'success');
        }
      }
      cdnSel.value = '';
    });
  }

  // Format active code tab cleanly
  const fmtBtn = document.getElementById('btn-format-code');
  if (fmtBtn) {
    fmtBtn.addEventListener('click', () => {
      const active = document.querySelector('.tab-btn.active')?.getAttribute('data-tab') || 'html';
      const ed = active === 'css' ? cmCss : active === 'js' ? cmJs : cmHtml;
      const cleaned = ed.getValue().split('\n').map(l => l.replace(/\s+$/, '')).join('\n').trim();
      ed.setValue(cleaned);
      if (window.HubUtils) window.HubUtils.showToast(currentLang === 'en' ? '✨ Code formatted!' : '✨ Code formaté !', 'success');
    });
  }

  // Share #code= link
  const shareBtn = document.getElementById('btn-share-code');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      try {
        const data = { html: cmHtml.getValue(), css: cmCss.getValue(), js: cmJs.getValue() };
        const enc = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
        const url = window.location.origin + window.location.pathname + '#code=' + enc;
        if (window.HubUtils) {
          window.HubUtils.copyText(url, currentLang === 'en' ? '🔗 Shareable #code= link copied!' : '🔗 Lien partageable #code= copié !');
        }
      } catch (e) {
        if (window.HubUtils) window.HubUtils.showToast('Snippet too large for URL hash', 'warn');
      }
    });
  }

  // Reset to current preset
  const resetBtn = document.getElementById('btn-reset-code');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      try { localStorage.removeItem(AUTOSAVE_KEY); } catch (e) {}
      loadPreset(currentPreset);
    });
  }

  // Viewport switcher + Console toggle
  document.querySelectorAll('.vp-btn[data-vp]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vp-btn[data-vp]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const iframe = document.getElementById('preview-iframe');
      if (iframe) iframe.style.width = btn.getAttribute('data-vp');
    });
  });

  const toggleConsole = document.getElementById('btn-toggle-console');
  const drawer = document.getElementById('live-console-drawer');
  if (toggleConsole && drawer) {
    toggleConsole.addEventListener('click', () => drawer.classList.toggle('collapsed'));
  }
  const clearBtn = document.getElementById('btn-clear-console');
  if (clearBtn) clearBtn.addEventListener('click', clearConsole);

  document.getElementById('chk-watermark').addEventListener('change', updatePreview);

  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const lang = localStorage.getItem('hub_lang') || 'fr';
    const msg = (translations[lang] && translations[lang].success_copy) || 'Code copied!';
    if (window.HubUtils) window.HubUtils.copyText(generateFullOutput(), msg);
  });

  document.getElementById('btn-download-html').addEventListener('click', () => {
    if (window.HubUtils) window.HubUtils.safeDownloadText(generateFullOutput(), 'playground-widget.html', 'text/html;charset=utf-8');
  });
});
