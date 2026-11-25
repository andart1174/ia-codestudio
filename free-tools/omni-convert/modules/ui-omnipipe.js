// OmniConvert Pro 2.0 — OmniPipe Visual Chained Pipelines, Ctrl+K Command Palette, Magic Paste & History Drawer
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});
  const $ = (id) => document.getElementById(id);

  // ===========================================================================
  // 1. OMNIPIPE — Visual Chained Conversion Pipelines
  // ===========================================================================
  const PIPE_OPS = {
    trim: { label: 'Trim Whitespace', run: async (s) => s.trim() },
    b64_encode: { label: 'Base64 Encode (UTF-8)', run: async (s) => Omni.Crypto.bytesToBase64(new TextEncoder().encode(s)) },
    b64_decode: { label: 'Base64 Decode (UTF-8)', run: async (s) => new TextDecoder().decode(Omni.Crypto.base64ToBytes(s.trim())) },
    b64url_decode: { label: 'Base64URL Decode', run: async (s) => new TextDecoder().decode(Omni.Crypto.base64UrlToBytes(s.trim())) },
    url_encode: { label: 'URL Encode', run: async (s) => encodeURIComponent(s) },
    url_decode: { label: 'URL Decode', run: async (s) => decodeURIComponent(s) },
    html_escape: { label: 'HTML Escape', run: async (s) => Omni.escapeHTML(s) },
    html_unescape: { label: 'HTML Unescape', run: async (s) => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; } },
    json_pretty: { label: 'JSON Pretty Format', run: async (s) => JSON.stringify(JSON.parse(s), null, 2) },
    json_minify: { label: 'JSON Minify', run: async (s) => JSON.stringify(JSON.parse(s)) },
    json_to_yaml: { label: 'JSON → YAML', run: async (s) => Omni.Data.jsonToYaml(JSON.parse(s)) },
    yaml_to_json: { label: 'YAML → JSON', run: async (s) => JSON.stringify(Omni.Data.parseYAML(s), null, 2) },
    json_to_xml: { label: 'JSON → XML', run: async (s) => Omni.Data.jsonToXml(JSON.parse(s), 'root', true) },
    xml_to_json: { label: 'XML → JSON', run: async (s) => Omni.Data.xmlStringToJSON(s, true) },
    json_to_ts: { label: 'JSON → TypeScript', run: async (s) => Omni.Data.jsonToCode(JSON.parse(s), 'typescript', 'PipelineData') },
    json_to_csv: { label: 'JSON → CSV', run: async (s) => Omni.Data.jsonToCsv(JSON.parse(s)) },
    csv_to_json: { label: 'CSV → JSON', run: async (s) => JSON.stringify(Omni.Data.csvToJson(s), null, 2) },
    jwt_payload: { label: 'Extract JWT Payload JSON', run: async (s) => JSON.stringify(Omni.Crypto.jwtDecode(s).payload, null, 2) },
    sha256: { label: 'SHA-256 Hash', run: async (s) => Omni.Crypto.digest(s, 'SHA-256') },
    md5: { label: 'MD5 Hash', run: async (s) => Omni.Crypto.md5(s) },
    upper: { label: 'UPPERCASE', run: async (s) => s.toUpperCase() },
    lower: { label: 'lowercase', run: async (s) => s.toLowerCase() },
    sort_lines: { label: 'Sort Lines A→Z', run: async (s) => s.replace(/\r\n?/g, '\n').split('\n').sort((a, b) => a.localeCompare(b)).join('\n') },
    dedupe_lines: { label: 'Deduplicate Lines', run: async (s) => [...new Set(s.replace(/\r\n?/g, '\n').split('\n'))].join('\n') },
    minify_js: { label: 'Minify JS', run: async (s) => Omni.Data.minifyJS(s) },
    minify_css: { label: 'Minify CSS', run: async (s) => Omni.Data.minifyCSS(s) },
  };

  const BUILTIN_RECIPES = [
    { name: 'Base64 → JSON → YAML', steps: ['b64_decode', 'json_pretty', 'json_to_yaml'], sample: 'eyJuYW1lIjoiT21uaVBpcGUiLCJ2ZXJzaW9uIjoyLCJvZmZsaW5lIjp0cnVlfQ==' },
    { name: 'JWT → Payload → TypeScript', steps: ['jwt_payload', 'json_to_ts'], sample: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEiLCJuYW1lIjoiQW5kcmVpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
    { name: 'URL Decode → JSON Pretty', steps: ['url_decode', 'json_pretty'], sample: '%7B%22status%22%3A%22ok%22%2C%22items%22%3A%5B1%2C2%2C3%5D%7D' },
    { name: 'CSV → JSON → XML', steps: ['csv_to_json', 'json_to_xml'], sample: 'id,name,role\n1,Elena,Architect\n2,Lucas,DevOps' },
    { name: 'Dedupe & Sort → SHA-256', steps: ['trim', 'dedupe_lines', 'sort_lines', 'sha256'], sample: 'zebra\nalpha\nbeta\nalpha\ndelta' },
  ];

  Omni.runPipelineSteps = async function (input, steps) {
    let cur = String(input);
    const trace = [];
    for (let i = 0; i < steps.length; i++) {
      const opId = steps[i];
      const op = PIPE_OPS[opId];
      if (!op) throw new Error(`Unknown step: ${opId}`);
      const t0 = performance.now();
      try {
        cur = await op.run(cur);
        trace.push({
          step: i + 1,
          opId,
          label: op.label,
          ok: true,
          ms: +(performance.now() - t0).toFixed(2),
          len: cur.length,
          preview: cur.replace(/\s+/g, ' ').slice(0, 90),
        });
      } catch (err) {
        trace.push({ step: i + 1, opId, label: op.label, ok: false, error: err.message });
        return { ok: false, output: cur, trace, error: `Step #${i + 1} (${op.label}): ${err.message}` };
      }
    }
    return { ok: true, output: cur, trace };
  };

  function setupOmniPipe() {
    let steps = ['b64_decode', 'json_pretty', 'json_to_yaml'];
    let savedRecipes = [];
    try { savedRecipes = JSON.parse(localStorage.getItem(Omni.STORAGE.RECIPES) || '[]'); } catch (_) { savedRecipes = []; }

    const inputEl = $('pipe-input');
    inputEl.value = BUILTIN_RECIPES[0].sample;

    function renderSteps() {
      const list = $('pipe-steps-list');
      list.innerHTML = '';
      if (!steps.length) {
        list.innerHTML = '<div class="muted">No steps added yet. Choose a transformation above and click Add Step.</div>';
        return;
      }
      steps.forEach((opId, idx) => {
        const card = document.createElement('div');
        card.className = 'pipe-step-card';
        card.innerHTML = `<span class="pipe-step-num">${idx + 1}</span><strong class="flex-1">${Omni.escapeHTML(PIPE_OPS[opId]?.label || opId)}</strong><button class="icon-btn-sm p-up" title="Move Up" ${idx === 0 ? 'disabled' : ''}>↑</button><button class="icon-btn-sm p-dn" title="Move Down" ${idx === steps.length - 1 ? 'disabled' : ''}>↓</button><button class="icon-btn-sm p-del" title="Remove"><svg class="ic ic-sm"><use href="#ic-trash"/></svg></button>`;
        card.querySelector('.p-up').onclick = () => { if (idx > 0) { [steps[idx - 1], steps[idx]] = [steps[idx], steps[idx - 1]]; renderSteps(); } };
        card.querySelector('.p-dn').onclick = () => { if (idx < steps.length - 1) { [steps[idx + 1], steps[idx]] = [steps[idx], steps[idx + 1]]; renderSteps(); } };
        card.querySelector('.p-del').onclick = () => { steps.splice(idx, 1); renderSteps(); };
        list.appendChild(card);
      });
    }

    function renderSaved() {
      const box = $('pipe-saved-list');
      box.innerHTML = '';
      if (!savedRecipes.length) {
        box.innerHTML = '<span class="muted">No custom recipes saved yet.</span>';
        return;
      }
      savedRecipes.forEach((r, idx) => {
        const b = document.createElement('button');
        b.className = 'chip-btn';
        b.textContent = `${r.name} (${r.steps.length}) ✕`;
        b.title = 'Click to load recipe (Shift+Click to delete)';
        b.onclick = (e) => {
          if (e.shiftKey) {
            savedRecipes.splice(idx, 1);
            localStorage.setItem(Omni.STORAGE.RECIPES, JSON.stringify(savedRecipes));
            renderSaved();
            return;
          }
          steps = [...r.steps];
          renderSteps();
          runPipe();
        };
        box.appendChild(b);
      });
    }

    async function runPipe() {
      if (!steps.length) return Omni.showToast('Add at least one pipeline step!', 'error');
      const res = await Omni.runPipelineSteps(inputEl.value, steps);
      const traceEl = $('pipe-trace-list');
      traceEl.innerHTML = res.trace.map((t) =>
        t.ok
          ? `<div class="pipe-trace-row"><strong>#${t.step} ${Omni.escapeHTML(t.label)}</strong> <span class="muted">(${t.ms} ms • ${t.len} chars)</span><div class="pipe-trace-preview">${Omni.escapeHTML(t.preview)}</div></div>`
          : `<div class="pipe-trace-row err"><strong>#${t.step} ${Omni.escapeHTML(t.label)} FAILED:</strong> ${Omni.escapeHTML(t.error)}</div>`
      ).join('');
      $('pipe-final-output').value = res.output;
      Omni.activateOutput('out-omnipipe', `OmniPipe (${steps.length} steps)`, () => $('pipe-final-output').value);
      if (res.ok) {
        Omni.addHistory('omnipipe', `Pipeline (${steps.length} steps)`, res.output);
        Omni.showToast(`Pipeline completed (${steps.length} steps)!`, 'success');
      } else {
        Omni.showToast(res.error, 'error');
      }
    }

    // Built-in recipe chips
    const presetsEl = $('pipe-preset-chips');
    BUILTIN_RECIPES.forEach((r) => {
      const b = document.createElement('button');
      b.className = 'chip-btn';
      b.textContent = '⚡ ' + r.name;
      b.onclick = () => {
        steps = [...r.steps];
        inputEl.value = r.sample;
        renderSteps();
        runPipe();
      };
      presetsEl.appendChild(b);
    });

    $('btn-pipe-add-step').onclick = () => {
      steps.push($('pipe-step-picker').value);
      renderSteps();
    };
    $('btn-pipe-run').onclick = runPipe;
    $('btn-pipe-save').onclick = () => {
      if (!steps.length) return;
      const name = prompt(Omni.state.lang === 'fr' ? 'Nom de la recette OmniPipe :' : 'Recipe name:', steps.map((s) => s.split('_')[0]).join('→'));
      if (!name) return;
      savedRecipes.unshift({ name: name.trim(), steps: [...steps] });
      localStorage.setItem(Omni.STORAGE.RECIPES, JSON.stringify(savedRecipes));
      renderSaved();
      Omni.showToast('Recipe saved!', 'success');
    };
    $('btn-pipe-share').onclick = async () => {
      try {
        const enc = await Omni.encodeSharePayload({ kind: 'pipe', steps, input: inputEl.value.slice(0, 2000) });
        const url = `${location.origin}${location.pathname}#share=${enc}`;
        await Omni.copyText(url, 'OmniPipe share URL copied!');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    Omni.loadSharedPipe = (payload) => {
      if (Array.isArray(payload.steps)) steps = payload.steps.filter((s) => PIPE_OPS[s]);
      if (typeof payload.input === 'string') inputEl.value = payload.input;
      renderSteps();
      Omni.switchToTab('omnipipe');
      runPipe();
    };

    Omni.onTabActivate.omnipipe = () => {
      Omni.activateOutput('out-omnipipe', `OmniPipe (${steps.length} steps)`, () => $('pipe-final-output').value);
    };
    Omni.registerSendTarget('omnipipe', 'Send to OmniPipe Input', 'Envoyer dans OmniPipe', (text) => {
      inputEl.value = text;
      runPipe();
    });

    renderSteps();
    renderSaved();
  }

  // ===========================================================================
  // 2. CTRL+K COMMAND PALETTE & MAGIC PASTE AUTO-DETECTOR
  // ===========================================================================
  const TOOL_CATALOG = [
    { tab: 'playground', keywords: 'html css js sandbox codepen preview zip share' },
    { tab: 'omnipipe', keywords: 'pipeline chain workflow cyberchef recipe' },
    { tab: 'serialize', keywords: 'json xml yaml csv table tree format beautify' },
    { tab: 'codegen', keywords: 'typescript zod json schema sql pydantic go struct types' },
    { tab: 'base64', keywords: 'base64 base64url encode decode file image pdf data uri' },
    { tab: 'minify', keywords: 'minify compress obfuscate js css html sql' },
    { tab: 'http', keywords: 'curl fetch axios python php go url query params' },
    { tab: 'qrcode', keywords: 'qr code wifi vcard email svg png logo scanner' },
    { tab: 'hash', keywords: 'md5 sha1 sha256 sha512 hmac checksum file aes encrypt decrypt pem x509 keypair' },
    { tab: 'jwt', keywords: 'jwt json web token decode verify sign bearer exp' },
    { tab: 'colors', keywords: 'color hex rgb hsl oklch cmyk wcag contrast tailwind shades colorblind' },
    { tab: 'gradient', keywords: 'gradient linear radial conic mesh css tailwind png' },
    { tab: 'shadow', keywords: 'box shadow text shadow drop shadow glassmorphism glass blur' },
    { tab: 'svg', keywords: 'svg optimizer react jsx data uri vector' },
    { tab: 'regex', keywords: 'regex regexp pattern match capture group replace' },
    { tab: 'diff', keywords: 'diff compare text code myers side by side' },
    { tab: 'utilities', subtab: 'cron', keywords: 'cron schedule expression next runs' },
    { tab: 'utilities', subtab: 'timestamp', keywords: 'unix timestamp date countdown timezone' },
    { tab: 'utilities', subtab: 'generators', keywords: 'uuid v4 v7 ulid nanoid password lorem fake mock data' },
    { tab: 'utilities', subtab: 'number-base', keywords: 'decimal hex binary octal base36 bigint bitwise' },
    { tab: 'utilities', subtab: 'text-tools', keywords: 'markdown gfm url encode html escape camelcase snakecase' },
    { tab: 'snippets', keywords: 'snippet vault code library save export' },
  ];

  function applyMagicInput(raw, det) {
    Omni.switchToTab(det.tab);
    if (det.subtab && typeof Omni.switchUtilSubtab === 'function') {
      Omni.switchUtilSubtab(det.subtab);
    }
    if (det.type === 'jwt') {
      $('jwt-input').value = raw;
      $('jwt-input').dispatchEvent(new Event('input'));
    } else if (det.type === 'pem') {
      document.querySelector('#hash-subtabs [data-hash-sub="cert"]')?.click();
      $('pem-input').value = raw;
      $('btn-pem-parse').click();
    } else if (det.type === 'curl') {
      Omni.loadIntoHttp(raw, 'curl');
    } else if (det.type === 'url') {
      Omni.loadIntoHttp(raw, 'url');
    } else if (det.type === 'svg') {
      $('svg-input').value = raw;
      $('btn-svg-optimize').click();
    } else if (det.type === 'color') {
      Omni.loadColorInput(raw);
    } else if (det.type === 'timestamp') {
      $('ts-input').value = raw;
      $('btn-ts-convert').click();
    } else if (det.type === 'cron') {
      $('cron-input').value = raw;
      $('cron-input').dispatchEvent(new Event('input'));
    } else if (det.type === 'json' || det.type === 'xml' || det.type === 'yaml') {
      const inp = $('serialize-input');
      if (inp._omniEditor) inp._omniEditor.setValue(raw); else inp.value = raw;
      $('btn-serialize-format').click();
    } else if (det.type === 'datauri' || det.type === 'base64') {
      $('b64-text-input').value = raw;
      $('btn-b64-decode').click();
    } else if (det.type === 'html') {
      const ed = $('editor-html');
      if (ed._omniEditor) ed._omniEditor.setValue(raw); else ed.value = raw;
      $('btn-pg-run').click();
    } else {
      $('hash-input').value = raw;
      $('hash-input').dispatchEvent(new Event('input'));
    }
    Omni.showToast(`Magic Paste → ${det.action}`, 'success');
  }

  function setupCommandPalette() {
    const modal = $('cmd-modal');
    const cmdIn = $('cmd-input');
    const resultsEl = $('cmd-results');
    const magicBanner = $('magic-detect-banner');

    function open() {
      modal.classList.add('open');
      cmdIn.value = '';
      magicBanner.classList.add('hidden');
      renderList('');
      setTimeout(() => cmdIn.focus(), 20);
    }
    function close() { modal.classList.remove('open'); }

    function renderList(q) {
      const query = q.trim().toLowerCase();
      // Smart Magic Paste check if input looks like actual data (not a short keyword)
      const det = q.trim().length >= 3 ? Omni.MagicDetect(q) : null;
      const isDataLike = det && det.type !== 'text';
      if (isDataLike) {
        const lbl = Omni.state.lang === 'fr' ? det.labelFr : det.labelEn;
        magicBanner.innerHTML = `<span>✨ ${Omni.escapeHTML(lbl)}</span><button id="btn-magic-apply" class="btn btn-primary btn-sm">${Omni.escapeHTML(det.action)} →</button>`;
        magicBanner.classList.remove('hidden');
        $('btn-magic-apply').onclick = () => { applyMagicInput(q.trim(), det); close(); };
      } else {
        magicBanner.classList.add('hidden');
      }

      const matches = TOOL_CATALOG.filter((item) => {
        if (!query) return true;
        const title = Omni.t(`tab_${item.tab}`).toLowerCase();
        return title.includes(query) || item.keywords.includes(query) || (item.subtab && item.subtab.includes(query));
      });
      resultsEl.innerHTML = '';
      matches.slice(0, 14).forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.className = 'cmd-item' + (idx === 0 ? ' selected' : '');
        const label = item.subtab ? `${Omni.t(`tab_${item.tab}`)} → ${item.subtab}` : Omni.t(`tab_${item.tab}`);
        btn.innerHTML = `<span>${Omni.escapeHTML(label)}</span><span class="muted">#${item.tab}</span>`;
        btn.onclick = () => {
          Omni.switchToTab(item.tab);
          if (item.subtab && typeof Omni.switchUtilSubtab === 'function') Omni.switchUtilSubtab(item.subtab);
          close();
        };
        resultsEl.appendChild(btn);
      });
    }

    $('btn-open-cmd').onclick = open;
    $('btn-cmd-close').onclick = close;
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    cmdIn.addEventListener('input', () => renderList(cmdIn.value));
    cmdIn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') {
        const magicBtn = $('btn-magic-apply');
        if (magicBtn && !magicBanner.classList.contains('hidden')) { magicBtn.click(); return; }
        resultsEl.querySelector('.cmd-item')?.click();
      }
    });

    // Global Ctrl+K / Cmd+K shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('open')) close();
        else open();
      } else if (e.key === 'Escape') {
        close();
        Omni.closePremiumModal();
        $('history-drawer')?.classList.remove('open');
      }
    });
  }

  // ===========================================================================
  // 3. HISTORY DRAWER
  // ===========================================================================
  function setupHistoryDrawer() {
    const drawer = $('history-drawer');
    const listEl = $('history-list');
    const badge = $('history-count-badge');

    Omni.renderHistoryBadge = function () {
      const len = Omni.state.history.length;
      badge.textContent = String(len);
      badge.classList.toggle('hidden', len === 0);
    };

    function renderDrawer() {
      const items = Omni.state.history;
      listEl.innerHTML = '';
      if (!items.length) {
        listEl.innerHTML = '<div class="muted text-center mt-16">No conversions recorded yet.</div>';
        return;
      }
      items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'history-item';
        card.innerHTML = `<div class="section-bar"><strong>${Omni.escapeHTML(item.summary)}</strong><span class="muted">${item.time}</span></div><pre>${Omni.escapeHTML(item.output.slice(0, 180))}</pre><div class="btn-row mt-8"><button class="btn btn-ghost btn-sm h-copy">Copy</button><button class="btn btn-secondary btn-sm h-open">Open Tab</button></div>`;
        card.querySelector('.h-copy').onclick = () => Omni.copyText(item.output);
        card.querySelector('.h-open').onclick = () => { Omni.switchToTab(item.tool); drawer.classList.remove('open'); };
        listEl.appendChild(card);
      });
    }

    $('btn-history').onclick = () => { renderDrawer(); drawer.classList.toggle('open'); };
    $('btn-history-close').onclick = () => drawer.classList.remove('open');

    Omni.loadHistory();
    Omni.renderHistoryBadge();
  }

  Omni.initOmniPipeAndPalette = function () {
    setupOmniPipe();
    setupCommandPalette();
    setupHistoryDrawer();
  };
})(typeof window !== 'undefined' ? window : globalThis);
