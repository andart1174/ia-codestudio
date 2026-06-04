(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 🛡️ CODE PROTECTOR STUDIO — Real HTML/CSS/JS Minifier & Obfuscator
  // ══════════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Protector Pro</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0f172a;
      --card-border: #1e293b;
      --accent: #818cf8;
      --accent-hover: #6366f1;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 700px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 {
      margin: 0 0 8px 0;
      font-size: 22px;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: -0.5px;
    }
    p.sub {
      margin: 0 0 20px 0;
      font-size: 13px;
      color: var(--text-muted);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    @media (min-width: 600px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .pane {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    textarea {
      width: 100%;
      height: 180px;
      background: #090d16;
      border: 1px solid var(--card-border);
      color: #e2e8f0;
      padding: 12px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      resize: vertical;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }
    textarea:focus {
      border-color: var(--accent);
    }
    .options {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .opt-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      cursor: pointer;
      user-select: none;
    }
    .opt-row:last-child {
      margin-bottom: 0;
    }
    .opt-row input {
      accent-color: var(--accent);
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
    .opt-label {
      font-size: 13px;
      font-weight: 500;
    }
    .opt-desc {
      font-size: 11px;
      color: var(--text-muted);
      margin-left: 26px;
      margin-top: -2px;
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    @media (min-width: 480px) {
      .actions {
        grid-template-columns: 1fr 1fr;
      }
    }
    button.btn-primary {
      background: linear-gradient(90deg, var(--accent), #a78bfa);
      border: none;
      color: #000;
      padding: 14px;
      border-radius: 8px;
      font-weight: 900;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(129,140,248,0.2);
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(129,140,248,0.3);
    }
    button.btn-secondary {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--card-border);
      color: var(--text);
      padding: 14px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button.btn-secondary:hover {
      background: rgba(255,255,255,0.1);
    }
    .stats-card {
      display: none;
      margin-top: 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }
    .stat-box {
      background: #1e293b;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-label {
      font-size: 9px;
      color: var(--text-muted);
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .stat-val {
      font-size: 14px;
      font-weight: 900;
    }
    .stat-val.orig { color: #f87171; }
    .stat-val.opt { color: #34d399; }
    .stat-val.saved { color: #10b981; }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16,185,129,0.9);
      color: #fff;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      display: none;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      z-index: 100;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🛡️ CODE PROTECTOR PRO</h1>
    <p class="sub">Protect your HTML, CSS, and JS from prying eyes</p>

    <div class="options">
      <div class="opt-row" onclick="document.getElementById('optMinify').click()">
        <input type="checkbox" id="optMinify" checked onclick="event.stopPropagation()">
        <div>
          <div class="opt-label">Minify HTML & CSS</div>
          <div class="opt-desc">Removes whitespace, comments and linebreaks to reduce file size.</div>
        </div>
      </div>
      <div style="height: 12px;"></div>
      <div class="opt-row" onclick="document.getElementById('optObfuscate').click()">
        <input type="checkbox" id="optObfuscate" checked onclick="event.stopPropagation()">
        <div>
          <div class="opt-label">Obfuscate JavaScript</div>
          <div class="opt-desc">Replaces variables and encodes strings into secure hexadecimal escapes.</div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="pane">
        <label for="inputCode">Source Code</label>
        <textarea id="inputCode" placeholder="<!-- Paste your HTML/CSS/JS code here -->
<script>
  function test() {
    console.log('Hello World');
  }
</script>"></textarea>
      </div>
      <div class="pane">
        <label for="outputCode">Protected Output</label>
        <textarea id="outputCode" readonly placeholder="// Click Protect Code to process..."></textarea>
      </div>
    </div>

    <div class="actions">
      <button class="btn-primary" id="processBtn">🛡️ Protect Code</button>
      <div style="display: flex; gap: 8px;">
        <button class="btn-secondary" id="copyBtn" style="flex: 1;">📋 Copy Output</button>
        <button class="btn-secondary" id="downloadBtn" style="flex: 1;">⬇️ Download</button>
      </div>
    </div>

    <div class="stats-card" id="statsCard">
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Original</div>
          <div class="stat-val orig" id="origSize">—</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Minified</div>
          <div class="stat-val opt" id="optSize">—</div>
        </div>
        <div class="stat-box" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2);">
          <div class="stat-label">Saved</div>
          <div class="stat-val saved" id="savedPct">—</div>
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const inputCode = document.getElementById('inputCode');
    const outputCode = document.getElementById('outputCode');
    const optMinify = document.getElementById('optMinify');
    const optObfuscate = document.getElementById('optObfuscate');
    const processBtn = document.getElementById('processBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const statsCard = document.getElementById('statsCard');
    const origSize = document.getElementById('origSize');
    const optSize = document.getElementById('optSize');
    const savedPct = document.getElementById('savedPct');
    const toast = document.getElementById('toast');

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    function minifyHTML(html) {
      return html
        .replace(/<!--(?!\\[if)[\\s\\S]*?-->/g, '')
        .replace(/\\s+/g, ' ')
        .replace(/>\\s+</g, '><')
        .replace(/\\s+>/g, '>')
        .replace(/<\\s+/g, '<')
        .trim();
    }

    function minifyCSS(css) {
      return css
        .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
        .replace(/\\s*([{}:;,>~+])\\s*/g, '$1')
        .replace(/\\s+/g, ' ')
        .replace(/;}/g, '}')
        .trim();
    }

    function obfuscateJS(js) {
      let result = js.replace(/\\/\\/[^\\n]*/g, '');
      result = result.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');
      result = result.replace(/\\s+/g, ' ');
      const varNames = ['variable', 'value', 'result', 'element', 'target', 'callback', 'handler', 'counter', 'index', 'data'];
      const shortNames = ['_a', '_b', '_c', '_d', '_e', '_f', '_g', '_h', '_i', '_j'];
      varNames.forEach((v, i) => {
        result = result.split(v).join(shortNames[i]);
      });
      result = result.replace(/'([^'\\\\]*)'/g, (_, s) => {
        if (s.length === 0) return "''";
        const hex = Array.from(s).map(c => '\\\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
        return "'" + hex + "'";
      });
      return result.trim();
    }

    function processCode(rawCode, doMinify, doObfuscate) {
      let html = rawCode;
      if (doMinify) {
        html = html.replace(new RegExp('<style([^>]*)>([\\\\s\\\\S]*?)<\\\\/' + 'style>', 'gi'), (_, attrs, css) => {
          return '<style' + attrs + '>' + minifyCSS(css) + '</' + 'style>';
        });
        html = minifyHTML(html);
      }
      if (doObfuscate) {
        html = html.replace(new RegExp('<script([^>]*)>([\\\\s\\\\S]*?)<\\\\/' + 'script>', 'gi'), (_, attrs, js) => {
          if (attrs.includes('src=')) return '<script' + attrs + '></' + 'script>';
          return '<script' + attrs + '>' + obfuscateJS(js) + '</' + 'script>';
        });
      }
      return html;
    }

    processBtn.addEventListener('click', () => {
      const code = inputCode.value.trim();
      if (!code) { showToast('Please enter some code first.'); return; }
      
      const doMinify = optMinify.checked;
      const doObfuscate = optObfuscate.checked;
      
      const result = processCode(code, doMinify, doObfuscate);
      outputCode.value = result;
      
      const origLen = code.length;
      const optLen = result.length;
      const saved = Math.round((1 - optLen / origLen) * 100);
      
      origSize.textContent = origLen.toLocaleString() + ' chars';
      optSize.textContent = optLen.toLocaleString() + ' chars';
      savedPct.textContent = (saved > 0 ? '-' : '+') + Math.abs(saved) + '%';
      statsCard.style.display = 'block';
      showToast('Code protected successfully!');
    });

    copyBtn.addEventListener('click', () => {
      const text = outputCode.value;
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); showToast('Copied to clipboard!');
      }
    });

    downloadBtn.addEventListener('click', () => {
      const text = outputCode.value;
      if (!text) return;
      const blob = new Blob([text], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'index_protected.html' });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: 'CODE PROTECTOR',
      sub: 'Real Minifier, Compressor & JS Obfuscator',
      inputLabel: 'Paste your code (or load from editor)',
      loadEditor: '📥 Load from Main Editor',
      minifyHtml: '🗜️ Minify HTML + CSS',
      obfuscateJs: '🔐 Obfuscate JavaScript',
      outputLabel: 'Protected Output',
      copy: '📋 Copy Result',
      copySuccess: '✅ Copied!',
      inject: '💉 Inject into Editor',
      original: 'ORIGINAL',
      result: 'RESULT',
      reduction: 'REDUCTION',
      chars: 'chars',
      clearedInput: 'Input cleared.',
      clear: '🗑️ Clear',
      injected: '✅ Code Protector loaded.',
      injectSuccess: '✅ Injected into editor!',
      statsTitle: 'Compression Stats',
      tip: 'Tip: First minify HTML, then obfuscate the JS inside.',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!'
    },
    fr: {
      title: 'PROTECTEUR DE CODE',
      sub: 'Minificateur & Obfuscateur JS Réel',
      inputLabel: 'Collez votre code (ou chargez depuis l\'éditeur)',
      loadEditor: '📥 Charger depuis l\'Éditeur',
      minifyHtml: '🗜️ Minifier HTML + CSS',
      obfuscateJs: '🔐 Obfusquer JavaScript',
      outputLabel: 'Sortie Protégée',
      copy: '📋 Copier le Résultat',
      copySuccess: '✅ Copié!',
      inject: '💉 Injecter dans l\'Éditeur',
      original: 'ORIGINAL',
      result: 'RÉSULTAT',
      reduction: 'RÉDUCTION',
      chars: 'chars',
      clearedInput: 'Entrée effacée.',
      clear: '🗑️ Effacer',
      injected: '✅ Protecteur de Code chargé.',
      injectSuccess: '✅ Injecté dans l\'éditeur!',
      statsTitle: 'Statistiques de Compression',
      tip: 'Conseil: Minifiez d\'abord le HTML, puis obfusquez le JS.',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _orig = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'codeprotector') {
      window.activeTab = 'codeprotector';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-codeprotector');
      if (btn) btn.classList.add('active');
      initCodeProtector(gl());
      return;
    }
    if (typeof _orig === 'function') _orig(tab);
  };

  // ── REAL MINIFICATION FUNCTIONS ──────────────────────────────

  function minifyHTML(html) {
    return html
      .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')         // Remove HTML comments
      .replace(/\s+/g, ' ')                              // Collapse whitespace
      .replace(/>\s+</g, '><')                           // Remove space between tags
      .replace(/\s+>/g, '>')                             // Clean before >
      .replace(/<\s+/g, '<')                             // Clean after <
      .trim();
  }

  function minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')                 // Remove comments
      .replace(/\s*([{}:;,>~+])\s*/g, '$1')             // Remove space around special chars
      .replace(/\s+/g, ' ')                              // Collapse spaces
      .replace(/;}/g, '}')                               // Remove trailing semicolons
      .trim();
  }

  function obfuscateJS(js) {
    // Step 1: Strip single-line comments
    let result = js.replace(/\/\/[^\n]*/g, '');
    // Step 2: Strip multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    // Step 3: Collapse whitespace
    result = result.replace(/\s+/g, ' ');
    // Step 4: Rename common variable patterns (simple alpha substitution for display)
    const varNames = ['variable', 'value', 'result', 'element', 'target', 'callback', 'handler', 'counter', 'index', 'data'];
    const shortNames = ['_a', '_b', '_c', '_d', '_e', '_f', '_g', '_h', '_i', '_j'];
    varNames.forEach((v, i) => {
      result = result.split(v).join(shortNames[i]);
    });
    // Step 5: Encode string literals to hex
    result = result.replace(/'([^'\\]*)'/g, (_, s) => {
      if (s.length === 0) return "''";
      const hex = Array.from(s).map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
      return `'${hex}'`;
    });
    return result.trim();
  }

  function processCode(rawCode, doMinify, doObfuscate) {
    let html = rawCode;

    if (doMinify) {
      // Extract and minify CSS blocks
      html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, css) => {
        return `<style${attrs}>${minifyCSS(css)}<\/style>`;
      });
      // Minify HTML structure
      html = minifyHTML(html);
    }

    if (doObfuscate) {
      // Extract and obfuscate JS blocks
      html = html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, js) => {
        if (attrs.includes('src=')) return `<script${attrs}><\/script>`;
        return `<script${attrs}>${obfuscateJS(js)}<\/script>`;
      });
    }

    return html;
  }

  // ── UI ────────────────────────────────────────────────────────

  function initCodeProtector(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1));border-radius:14px;padding:14px;border:1px solid rgba(99,102,241,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #6366f1);">🛡️</span>
          <div>
            <h2 style="margin:0;color:#a5b4fc;font-size:15px;font-weight:900;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="cp-load-full-app" style="width:100%;background:linear-gradient(90deg,#818cf8,#6366f1);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(99,102,241,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Info Tip -->
        <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;padding:8px 12px;font-size:10px;color:#fbbf24;margin-bottom:14px;">💡 ${T.tip}</div>

        <!-- Input -->
        <div style="font-size:10px;font-weight:700;color:#94a3b8;margin-bottom:6px;">${T.inputLabel}</div>
        <textarea id="cp-input" style="width:100%;height:130px;background:#0f172a;border:1px solid #1e293b;color:#e2e8f0;padding:10px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:10px;resize:vertical;box-sizing:border-box;outline:none;margin-bottom:10px;" placeholder="<!-- Paste HTML / CSS / JS here -->"></textarea>

        <button id="cp-load-editor" style="width:100%;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.4);color:#818cf8;padding:9px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;margin-bottom:14px;">${T.loadEditor}</button>

        <!-- Action Buttons -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
          <button id="cp-minify-btn" style="background:linear-gradient(90deg,rgba(99,102,241,0.8),rgba(139,92,246,0.8));border:none;color:#fff;padding:13px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.minifyHtml}</button>
          <button id="cp-obfuscate-btn" style="background:linear-gradient(90deg,rgba(236,72,153,0.8),rgba(168,85,247,0.8));border:none;color:#fff;padding:13px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.obfuscateJs}</button>
        </div>

        <!-- Stats -->
        <div id="cp-stats" style="display:none;background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:12px;margin-bottom:12px;">
          <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:10px;">${T.statsTitle}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
            <div style="background:#1e293b;padding:10px;border-radius:8px;text-align:center;">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.original}</div>
              <div id="cp-orig-count" style="font-size:12px;color:#f87171;font-weight:900;">—</div>
            </div>
            <div style="background:#1e293b;padding:10px;border-radius:8px;text-align:center;">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.result}</div>
              <div id="cp-result-count" style="font-size:12px;color:#34d399;font-weight:900;">—</div>
            </div>
            <div style="background:rgba(16,185,129,0.1);padding:10px;border-radius:8px;text-align:center;border:1px solid rgba(16,185,129,0.3);">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:4px;">${T.reduction}</div>
              <div id="cp-reduction" style="font-size:12px;color:#10b981;font-weight:900;">—</div>
            </div>
          </div>
        </div>

        <!-- Output -->
        <div style="font-size:10px;font-weight:700;color:#94a3b8;margin-bottom:6px;">${T.outputLabel}</div>
        <textarea id="cp-output" readonly style="width:100%;height:120px;background:#000;border:1px solid #1e293b;color:#a5b4fc;padding:10px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:10px;resize:none;box-sizing:border-box;outline:none;margin-bottom:10px;" placeholder="// Protected output will appear here..."></textarea>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button id="cp-copy" style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.4);color:#818cf8;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.copy}</button>
          <button id="cp-inject" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:10px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;">${T.inject}</button>
        </div>
        <div id="cp-toast" style="display:none;text-align:center;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#34d399;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const input = document.getElementById('cp-input');
    const output = document.getElementById('cp-output');
    const stats = document.getElementById('cp-stats');
    const toast = document.getElementById('cp-toast');

    function showT(msg) { toast.textContent = msg; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2000); }

    function run(minify, obfuscate) {
      const raw = input.value.trim();
      if (!raw) return;
      const result = processCode(raw, minify, obfuscate);
      output.value = result;
      const origLen = raw.length;
      const resLen = result.length;
      const pct = Math.round((1 - resLen / origLen) * 100);
      document.getElementById('cp-orig-count').textContent = origLen.toLocaleString() + ' ' + T.chars;
      document.getElementById('cp-result-count').textContent = resLen.toLocaleString() + ' ' + T.chars;
      document.getElementById('cp-reduction').textContent = (pct > 0 ? '-' : '+') + Math.abs(pct) + '%';
      stats.style.display = 'block';
    }

    document.getElementById('cp-load-editor').addEventListener('click', () => {
      const editorCode = window.code || (window.editor ? window.editor.getValue() : '');
      if (editorCode) { input.value = editorCode; }
    });

    document.getElementById('cp-minify-btn').addEventListener('click', () => run(true, false));
    document.getElementById('cp-obfuscate-btn').addEventListener('click', () => run(true, true));

    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        return new Promise((resolve, reject) => {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) resolve(); else reject(new Error('execCommand copy failed'));
          } catch (e) {
            reject(e);
          }
        });
      }
    }

    document.getElementById('cp-copy').addEventListener('click', () => {
      if (!output.value) return;
      copyToClipboard(output.value).then(() => showT(T.copySuccess));
    });

    document.getElementById('cp-inject').addEventListener('click', () => {
      if (!output.value) return;
      if (window.editor) { 
        window.editor.setValue(output.value); 
        if (window.runPreview) window.runPreview();
        showT(T.injectSuccess); 
      }
      else if (window.smartInject) { 
        window.smartInject(output.value, 'logic'); 
        showT(T.injectSuccess); 
      }
    });

    document.getElementById('cp-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showT(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast(T.injected);
  }
})();
