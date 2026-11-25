// OmniConvert Pro 2.0 — UI Controllers for All 17 Upgraded & New Developer Tools
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});
  const $ = (id) => document.getElementById(id);

  Omni.onTabActivate = Omni.onTabActivate || {};
  Omni.currentOutputGetter = () => ($('code-output') ? $('code-output').value : '');

  Omni.activateOutput = function (outId, headingText, getterFn) {
    document.querySelectorAll('.out-pane').forEach((p) => p.classList.remove('active'));
    const pane = $(outId);
    if (pane) pane.classList.add('active');
    if (headingText && $('output-title')) $('output-title').textContent = headingText;
    if (typeof getterFn === 'function') Omni.currentOutputGetter = getterFn;
  };

  Omni.setCodeOutput = function (text, lang = 'plain', heading) {
    const out = $('code-output');
    if (!out) return;
    if (out._omniEditor) {
      out._omniEditor.setLang(lang);
      out._omniEditor.setValue(text);
    } else {
      out.value = text;
    }
    Omni.activateOutput('out-code', heading || Omni.t('outputDefaultTitle'), () => out.value);
  };

  function setTaVal(id, val) {
    const el = $(id);
    if (!el) return;
    if (el._omniEditor) el._omniEditor.setValue(val);
    else el.value = val;
  }

  // ===========================================================================
  // 1. PLAYGROUND 2.0 (Line Numbers, Templates, Device Switcher, ZIP, Gzip Share)
  // ===========================================================================
  const WATERMARK_HTML = `\n<!-- Built with IA Code Studio (Remove with PRO) -->\n<a id="ia-code-badge" href="https://ia-codestudio.com" target="_blank" rel="noopener noreferrer" style="position:fixed;bottom:14px;right:14px;z-index:99999;background:rgba(15,23,42,0.88);backdrop-filter:blur(8px);border:1px solid rgba(6,182,212,0.35);border-radius:99px;padding:6px 14px;font-family:system-ui,sans-serif;font-size:12px;font-weight:700;color:#f8fafc;text-decoration:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,0.3);">⚡ Built with <span style="color:#06b6d4;">IA Code Studio</span></a>\n`;

  const PG_TEMPLATES = {
    'glass-card': {
      html: `<div class="hero-card">\n  <span class="pill">OFFLINE SANDBOX 2.0</span>\n  <h2>Hello OmniConvert Pro</h2>\n  <p>Edit HTML, CSS, or JS and press Ctrl+Enter — live preview updates instantly.</p>\n  <button id="demo-btn">Trigger Action ⚡</button>\n</div>`,
      css: `body {\n  margin: 0; min-height: 100vh;\n  display: grid; place-items: center;\n  font-family: system-ui, sans-serif;\n  background: radial-gradient(circle at 20% 20%, #0e7490, #0f172a 60%, #1e1b4b);\n  color: #f8fafc;\n}\n.hero-card {\n  max-width: 360px; padding: 32px; border-radius: 20px; text-align: center;\n  background: rgba(255,255,255,0.08); backdrop-filter: blur(14px);\n  border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 20px 50px rgba(0,0,0,0.45);\n}\n.pill { font-size: 11px; letter-spacing: 1px; font-weight: 800; color: #22d3ee; background: rgba(6,182,212,0.16); padding: 4px 10px; border-radius: 99px; }\nh2 { margin: 14px 0 8px; font-size: 1.45rem; }\np { color: #cbd5e1; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; }\nbutton {\n  background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: #fff;\n  border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer;\n}\nbutton:hover { filter: brightness(1.1); transform: translateY(-1px); }`,
      js: `console.log('OmniConvert Playground 2.0 Ready!');\nlet clicks = 0;\ndocument.getElementById('demo-btn').addEventListener('click', (e) => {\n  clicks++;\n  e.target.textContent = 'Clicked ' + clicks + 'x ⚡';\n  console.log({ event: 'button_click', count: clicks });\n});`,
    },
    'bento-grid': {
      html: `<div class="bento">\n  <div class="tile wide"><h3>99.98%</h3><p>Offline Uptime</p></div>\n  <div class="tile"><h3>0ms</h3><p>Network Latency</p></div>\n  <div class="tile"><h3>AES-256</h3><p>Client Crypto</p></div>\n  <div class="tile wide accent"><h3>OmniConvert Pro</h3><p>Bento CSS Grid Template</p></div>\n</div>`,
      css: `body { margin:0; min-height:100vh; display:grid; place-items:center; background:#090d16; font-family:system-ui; color:#fff; padding:20px; }\n.bento { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; width:100%; max-width:440px; }\n.tile { background:#11192b; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; }\n.tile.wide { grid-column:span 2; }\n.tile.accent { background:linear-gradient(135deg,#06b6d4,#7c3aed); }\nh3 { margin:0; font-size:1.6rem; } p { margin:4px 0 0; opacity:0.75; font-size:0.85rem; }`,
      js: `console.log('Bento Grid loaded with', document.querySelectorAll('.tile').length, 'tiles');`,
    },
    'neon-counter': {
      html: `<main class="box">\n  <div id="val">0</div>\n  <div class="row">\n    <button id="dec">−</button>\n    <button id="rst">Reset</button>\n    <button id="inc">+</button>\n  </div>\n</main>`,
      css: `body { margin:0; height:100vh; display:grid; place-items:center; background:#070a12; color:#fff; font-family:monospace; }\n.box { text-align:center; }\n#val { font-size:4.5rem; font-weight:800; color:#22d3ee; text-shadow:0 0 28px rgba(34,211,238,0.6); margin-bottom:20px; }\n.row { display:flex; gap:10px; justify-content:center; }\nbutton { padding:10px 22px; border-radius:10px; border:1px solid #22d3ee; background:rgba(34,211,238,0.1); color:#fff; font-size:1.1rem; cursor:pointer; }`,
      js: `let n = 0;\nconst el = document.getElementById('val');\nconst render = () => { el.textContent = n; console.log('Counter =', n); };\ndocument.getElementById('inc').onclick = () => { n++; render(); };\ndocument.getElementById('dec').onclick = () => { n--; render(); };\ndocument.getElementById('rst').onclick = () => { n = 0; render(); };`,
    },
    'canvas-particles': {
      html: `<canvas id="c"></canvas>`,
      css: `body { margin:0; overflow:hidden; background:#050814; } canvas { display:block; }`,
      js: `const c = document.getElementById('c'), ctx = c.getContext('2d');\nconst resize = () => { c.width = innerWidth; c.height = innerHeight; };\nresize(); addEventListener('resize', resize);\nconst pts = Array.from({length:45}, () => ({ x:Math.random()*c.width, y:Math.random()*c.height, vx:(Math.random()-.5)*1.4, vy:(Math.random()-.5)*1.4 }));\n(function loop(){\n  ctx.fillStyle='rgba(5,8,20,0.22)'; ctx.fillRect(0,0,c.width,c.height);\n  for (const p of pts) {\n    p.x=(p.x+p.vx+c.width)%c.width; p.y=(p.y+p.vy+c.height)%c.height;\n    ctx.fillStyle='#22d3ee'; ctx.beginPath(); ctx.arc(p.x,p.y,2.2,0,Math.PI*2); ctx.fill();\n  }\n  requestAnimationFrame(loop);\n})();\nconsole.log('Particle simulation active:', pts.length);`,
    },
    'css-loader': {
      html: `<div class="ring"></div>`,
      css: `body { margin:0; height:100vh; display:grid; place-items:center; background:#090d16; }\n.ring { width:72px; height:72px; border-radius:50%; border:5px solid rgba(6,182,212,0.15); border-top-color:#06b6d4; border-right-color:#8b5cf6; animation:spin 0.9s linear infinite; }\n@keyframes spin { to { transform:rotate(360deg); } }`,
      js: `console.log('CSS Kinetic Loader running');`,
    },
  };

  function setupPlayground() {
    const htmlEl = $('editor-html');
    const cssEl = $('editor-css');
    const jsEl = $('editor-js');
    const iframe = $('preview-frame');
    const wmCheck = $('chk-watermark');
    const wmWrap = $('lbl-watermark-wrap');
    const wmProTag = $('watermark-pro-tag');

    // Enhance editors with line numbers & syntax highlighting
    const edHtml = Omni.enhanceCodeEditor(htmlEl, { lang: 'html', onRun: runPlayground });
    const edCss = Omni.enhanceCodeEditor(cssEl, { lang: 'css', onRun: runPlayground });
    const edJs = Omni.enhanceCodeEditor(jsEl, { lang: 'js', onRun: runPlayground });
    const editors = { html: edHtml, css: edCss, js: edJs };

    // Load autosaved or default rich starter template (never blank white screen!)
    const savedPg = Omni.getAutosave('playground');
    const starter = savedPg && (savedPg.html || savedPg.css || savedPg.js) ? savedPg : PG_TEMPLATES['glass-card'];
    edHtml.setValue(starter.html || '');
    edCss.setValue(starter.css || '');
    edJs.setValue(starter.js || '');

    // Watermark gating (clean, PRO can disable freely, Free shows modal on click)
    const isPro = Omni.checkIsPremium();
    if (isPro) {
      wmCheck.checked = false;
      if (wmProTag) wmProTag.classList.add('hidden');
    } else {
      wmCheck.checked = true;
      wmWrap.addEventListener('click', (e) => {
        if (!Omni.checkIsPremium()) {
          e.preventDefault();
          wmCheck.checked = true;
          Omni.openPremiumModal();
        }
      });
    }

    // Scoped subtabs ONLY inside #pg-editor-tabs (fixes P0.3 global collision!)
    const pgTabBtns = document.querySelectorAll('#pg-editor-tabs .seg-btn');
    pgTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.pgEditor;
        pgTabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        Object.entries(editors).forEach(([k, ed]) => ed.setVisible(k === key));
      });
    });

    // Starter template selector
    $('pg-template-select').addEventListener('change', (e) => {
      const tpl = PG_TEMPLATES[e.target.value];
      if (!tpl) return;
      edHtml.setValue(tpl.html);
      edCss.setValue(tpl.css);
      edJs.setValue(tpl.js);
      runPlayground();
      Omni.showToast('Template loaded!', 'success');
      e.target.value = '';
    });

    // Responsive preview device switcher
    const devBtns = document.querySelectorAll('#pg-device-bar .seg-btn');
    devBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        devBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        iframe.style.width = btn.dataset.device;
      });
    });

    function safeInlineScript(js) {
      return js.replace(/<\/script/gi, '<\\/script');
    }
    function safeInlineStyle(css) {
      return css.replace(/<\/style/gi, '<\\/style');
    }

    function buildExportHtml() {
      const includeWm = wmCheck.checked || !Omni.checkIsPremium();
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>OmniConvert Pro Export</title>\n  <style>\n${safeInlineStyle(cssEl.value)}\n  </style>\n</head>\n<body>\n${htmlEl.value}${includeWm ? WATERMARK_HTML : ''}\n  <script>\n${safeInlineScript(jsEl.value)}\n  </script>\n</body>\n</html>`;
    }

    let timer = null;
    function scheduleRun() {
      Omni.scheduleAutosave('playground', { html: htmlEl.value, css: cssEl.value, js: jsEl.value });
      if (timer) clearTimeout(timer);
      timer = setTimeout(runPlayground, 380);
    }

    function runPlayground() {
      const logs = $('console-logs');
      if (logs) logs.innerHTML = '';
      const includeWm = wmCheck.checked || !Omni.checkIsPremium();
      const srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${safeInlineStyle(cssEl.value)}</style><script>(function(){
        const post=(lvl,args)=>{const fmt=Array.from(args).map(a=>{if(a===null)return'null';if(a===undefined)return'undefined';if(a instanceof Error)return a.stack||a.message;if(typeof a==='object'){try{return JSON.stringify(a,null,2);}catch(_){return String(a);}}return String(a);});window.parent.postMessage({type:'omni-console',level:lvl,message:fmt.join(' ')},'*');};
        ['log','info','warn','error'].forEach(m=>{const orig=console[m];console[m]=function(){post(m,arguments);orig.apply(console,arguments);};});
        window.addEventListener('error',e=>post('error',[e.message]));
        window.addEventListener('unhandledrejection',e=>post('error',['Unhandled Rejection: '+(e.reason?.message||e.reason)]));
      })();<\/script></head><body>${htmlEl.value}${includeWm ? WATERMARK_HTML : ''}<script>try{\n${safeInlineScript(jsEl.value)}\n}catch(err){console.error(err);}<\/script></body></html>`;
      iframe.srcdoc = srcdoc;
    }

    [htmlEl, cssEl, jsEl].forEach((el) => el.addEventListener('input', scheduleRun));
    $('btn-pg-run').addEventListener('click', runPlayground);
    $('btn-clear-console').addEventListener('click', () => { $('console-logs').innerHTML = ''; });

    window.addEventListener('message', (ev) => {
      if (!ev.data || ev.data.type !== 'omni-console') return;
      const logs = $('console-logs');
      const div = document.createElement('div');
      div.className = `log-item log-${ev.data.level || 'log'}`;
      const ts = new Date().toLocaleTimeString([], { hour12: false });
      const sp = document.createElement('span');
      sp.className = 'log-time';
      sp.textContent = `[${ts}]`;
      div.appendChild(sp);
      div.appendChild(document.createTextNode(ev.data.message));
      logs.appendChild(div);
      logs.scrollTop = logs.scrollHeight;
    });

    $('btn-copy-playground').addEventListener('click', () => Omni.copyText(buildExportHtml(), Omni.t('pgCopiedHtml')));
    $('btn-download-playground').addEventListener('click', () => {
      Omni.downloadText(buildExportHtml(), 'omniconvert-export.html', 'text/html;charset=utf-8');
      Omni.showToast(Omni.t('pgDownloadedHtml'), 'success');
    });
    $('btn-zip-playground').addEventListener('click', () => {
      const idxHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>OmniConvert Project</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n${htmlEl.value}\n  <script src="script.js"></script>\n</body>\n</html>`;
      const blob = Omni.createZipBlob([
        { name: 'index.html', content: idxHtml },
        { name: 'style.css', content: cssEl.value },
        { name: 'script.js', content: jsEl.value },
      ]);
      Omni.downloadBlob(blob, 'omniconvert-project.zip');
      Omni.showToast(Omni.t('pgDownloadedZip'), 'success');
    });
    $('btn-share-playground').addEventListener('click', async () => {
      try {
        const enc = await Omni.encodeSharePayload({ kind: 'pg', html: htmlEl.value, css: cssEl.value, js: jsEl.value });
        const url = `${location.origin}${location.pathname}#share=${enc}`;
        await Omni.copyText(url, Omni.t('pgShareCopied'));
      } catch (err) {
        Omni.showToast(Omni.t('errorPrefix') + err.message, 'error');
      }
    });

    Omni.loadSharedPlayground = function (payload) {
      edHtml.setValue(payload.html || '');
      edCss.setValue(payload.css || '');
      edJs.setValue(payload.js || '');
      runPlayground();
      Omni.showToast(Omni.t('pgShareLoaded'), 'success');
    };

    Omni.onTabActivate.playground = () => {
      Omni.activateOutput('out-playground', 'Playground 2.0 — Live Sandbox', buildExportHtml);
    };

    Omni.registerSendTarget('playground', 'Open in Playground HTML', 'Ouvrir dans Playground HTML', (text) => {
      edHtml.setValue(text);
      runPlayground();
    });

    runPlayground();
  }

  // ===========================================================================
  // 2. SERIALIZE & DATA EXPLORER (JSON / XML / YAML / CSV + Tree + Sortable Table)
  // ===========================================================================
  function setupSerialize() {
    const input = $('serialize-input');
    const outTa = $('ser-code-output');
    const edIn = Omni.enhanceCodeEditor(input, { lang: 'json' });
    const edOut = Omni.enhanceCodeEditor(outTa, { lang: 'json' });
    let lastParsedData = null;

    function renderTree(data, container) {
      container.innerHTML = '';
      if (data === null || data === undefined) {
        container.innerHTML = '<div class="muted">Convert or format valid JSON/YAML/XML/CSV to explore interactive JSON Tree.</div>';
        return;
      }
      function makeNode(key, val, path) {
        const wrap = document.createElement('div');
        wrap.className = 'tree-node';
        const isObj = val !== null && typeof val === 'object';
        const row = document.createElement('div');
        row.className = 'tree-row';
        row.title = `Click to copy JSONPath: ${path}`;

        const toggle = document.createElement('span');
        toggle.className = 'tree-toggle';
        toggle.textContent = isObj ? '▾' : '·';
        row.appendChild(toggle);

        if (key !== null) {
          const kSpan = document.createElement('span');
          kSpan.className = 'tree-key';
          kSpan.textContent = key + ':';
          row.appendChild(kSpan);
        }

        const vSpan = document.createElement('span');
        if (isObj) {
          const isArr = Array.isArray(val);
          const count = isArr ? val.length : Object.keys(val).length;
          vSpan.className = 'muted';
          vSpan.textContent = isArr ? `Array[${count}]` : `Object{${count}}`;
        } else if (typeof val === 'string') { vSpan.className = 'tree-str'; vSpan.textContent = JSON.stringify(val); }
        else if (typeof val === 'number') { vSpan.className = 'tree-num'; vSpan.textContent = String(val); }
        else if (typeof val === 'boolean') { vSpan.className = 'tree-bool'; vSpan.textContent = String(val); }
        else { vSpan.className = 'tree-null'; vSpan.textContent = 'null'; }
        row.appendChild(vSpan);
        wrap.appendChild(row);

        let childBox = null;
        if (isObj) {
          childBox = document.createElement('div');
          const entries = Array.isArray(val) ? val.map((v, i) => [String(i), v, `${path}[${i}]`]) : Object.entries(val).map(([k, v]) => [k, v, /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? `${path}.${k}` : `${path}[${JSON.stringify(k)}]`]);
          entries.slice(0, 200).forEach(([k, v, p]) => childBox.appendChild(makeNode(k, v, p)));
          wrap.appendChild(childBox);
        }

        row.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isObj && e.target === toggle) {
            const hidden = childBox.classList.toggle('hidden');
            toggle.textContent = hidden ? '▸' : '▾';
          } else {
            Omni.copyText(path, Omni.t('serPathCopied') + path);
          }
        });
        return wrap;
      }
      container.appendChild(makeNode(null, data, '$'));
    }

    function renderTable(data, container) {
      container.innerHTML = '';
      const arr = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : null);
      if (!arr || !arr.length || typeof arr[0] !== 'object') {
        container.innerHTML = '<div class="muted">Table view works with JSON arrays of objects or CSV data.</div>';
        return;
      }
      const cols = [...new Set(arr.flatMap((r) => (r && typeof r === 'object' ? Object.keys(r) : [])))];
      let sortCol = null, sortAsc = true;

      function draw() {
        const rows = [...arr];
        if (sortCol) {
          rows.sort((a, b) => {
            const av = a?.[sortCol] ?? '', bv = b?.[sortCol] ?? '';
            return sortAsc ? String(av).localeCompare(String(bv), undefined, { numeric: true }) : String(bv).localeCompare(String(av), undefined, { numeric: true });
          });
        }
        const tbl = document.createElement('table');
        tbl.className = 'data-table';
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        cols.forEach((c) => {
          const th = document.createElement('th');
          th.textContent = c + (sortCol === c ? (sortAsc ? ' ▲' : ' ▼') : '');
          th.onclick = () => { if (sortCol === c) sortAsc = !sortAsc; else { sortCol = c; sortAsc = true; } draw(); };
          tr.appendChild(th);
        });
        thead.appendChild(tr);
        tbl.appendChild(thead);
        const tbody = document.createElement('tbody');
        rows.slice(0, 300).forEach((r) => {
          const rtr = document.createElement('tr');
          cols.forEach((c) => {
            const td = document.createElement('td');
            const v = r?.[c];
            td.textContent = v === null || v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v));
            rtr.appendChild(td);
          });
          tbody.appendChild(rtr);
        });
        tbl.appendChild(tbody);
        container.innerHTML = '';
        container.appendChild(tbl);
      }
      draw();
    }

    function setSerResult(str, lang, parsedObj, summary) {
      edOut.setLang(lang);
      edOut.setValue(str);
      lastParsedData = parsedObj !== undefined ? parsedObj : null;
      if (lastParsedData === null && lang === 'json') {
        try { lastParsedData = JSON.parse(str); } catch (_) {}
      }
      renderTree(lastParsedData, $('ser-view-tree'));
      renderTable(lastParsedData, $('ser-view-table'));
      Omni.activateOutput('out-serialize', `Data Explorer (${lang.toUpperCase()})`, () => outTa.value);
      Omni.addHistory('serialize', summary, str);
      Omni.showToast(Omni.t('serConverted'), 'success');
    }

    const viewBtns = document.querySelectorAll('#ser-view-tabs .seg-btn');
    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        viewBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const v = btn.dataset.serView;
        $('ser-view-raw').classList.toggle('hidden', v !== 'raw');
        $('ser-view-tree').classList.toggle('hidden', v !== 'tree');
        $('ser-view-table').classList.toggle('hidden', v !== 'table');
      });
    });

    const getIn = () => input.value.trim();

    $('btn-json-xml').onclick = () => { try { const p = JSON.parse(getIn()); setSerResult(Omni.Data.jsonToXml(p, 'root', true), 'xml', p, 'JSON → XML'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-xml-json').onclick = () => { try { const j = Omni.Data.xmlStringToJSON(getIn(), true); setSerResult(j, 'json', JSON.parse(j), 'XML → JSON'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-json-yaml').onclick = () => { try { const p = JSON.parse(getIn()); setSerResult(Omni.Data.jsonToYaml(p), 'plain', p, 'JSON → YAML'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-yaml-json').onclick = () => { try { const p = Omni.Data.parseYAML(getIn()); setSerResult(JSON.stringify(p, null, 2), 'json', p, 'YAML → JSON'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-xml-yaml').onclick = () => { try { const p = JSON.parse(Omni.Data.xmlStringToJSON(getIn(), true)); setSerResult(Omni.Data.jsonToYaml(p), 'plain', p, 'XML → YAML'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-yaml-xml').onclick = () => { try { const p = Omni.Data.parseYAML(getIn()); setSerResult(Omni.Data.jsonToXml(p, 'root', true), 'xml', p, 'YAML → XML'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-json-csv').onclick = () => { try { const p = JSON.parse(getIn()); setSerResult(Omni.Data.jsonToCsv(p), 'plain', p, 'JSON → CSV'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-csv-json').onclick = () => { try { const p = Omni.Data.csvToJson(getIn()); setSerResult(JSON.stringify(p, null, 2), 'json', p, 'CSV → JSON'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-json-mdtable').onclick = () => { try { const p = JSON.parse(getIn()); setSerResult(Omni.Data.jsonToMarkdownTable(p), 'plain', p, 'JSON → MD Table'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };

    $('btn-serialize-format').onclick = () => {
      const val = getIn();
      if (!val) return;
      try {
        if (val.startsWith('<')) setSerResult(Omni.Data.formatXml(val), 'xml', null, 'Format XML');
        else if (val.startsWith('{') || val.startsWith('[')) { const p = JSON.parse(val); setSerResult(JSON.stringify(p, null, 2), 'json', p, 'Format JSON'); }
        else { const p = Omni.Data.parseYAML(val); setSerResult(Omni.Data.jsonToYaml(p), 'plain', p, 'Format YAML'); }
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };
    $('btn-serialize-minify').onclick = () => {
      const val = getIn();
      if (!val) return;
      try {
        if (val.startsWith('<')) setSerResult(val.replace(/>\s+</g, '><').trim(), 'xml', null, 'Minify XML');
        else if (val.startsWith('{') || val.startsWith('[')) { const p = JSON.parse(val); setSerResult(JSON.stringify(p), 'json', p, 'Minify JSON'); }
        else { const p = Omni.Data.parseYAML(val); setSerResult(JSON.stringify(p), 'json', p, 'YAML → Minified JSON'); }
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };
    $('btn-serialize-sample').onclick = () => {
      const sample = JSON.stringify([
        { id: 1, name: 'Elena Popescu', role: 'Architect', score: 98.5, active: true },
        { id: 2, name: 'Marcus Vance', role: 'Security', score: 94.2, active: true },
        { id: 3, name: 'Sofia Chen', role: 'Frontend', score: 96.8, active: false },
      ], null, 2);
      edIn.setValue(sample);
      setSerResult(sample, 'json', JSON.parse(sample), 'Sample JSON');
    };

    Omni.onTabActivate.serialize = () => {
      Omni.activateOutput('out-serialize', 'Data Explorer (Raw / Tree / Table)', () => outTa.value);
    };
    Omni.registerSendTarget('serialize', 'Send to Data Converter', 'Envoyer vers Données JSON/XML/YAML', (text) => {
      edIn.setValue(text);
    });
  }

  // ===========================================================================
  // 3. JSON -> CODE & SCHEMA GENERATOR
  // ===========================================================================
  function setupCodegen() {
    const edIn = Omni.enhanceCodeEditor($('cg-input'), { lang: 'json' });
    function run() {
      const raw = $('cg-input').value.trim();
      if (!raw) return Omni.showToast(Omni.t('noData'), 'error');
      try {
        const parsed = JSON.parse(raw);
        const target = $('cg-target').value;
        const root = $('cg-root-name').value.trim() || 'Root';
        const code = Omni.Data.jsonToCode(parsed, target, root);
        const hlLang = target === 'jsonschema' ? 'json' : 'js';
        Omni.setCodeOutput(code, hlLang, `Generated ${target.toUpperCase()} (${root})`);
        Omni.addHistory('codegen', `JSON → ${target}`, code);
        Omni.showToast(`Generated ${target.toUpperCase()}!`, 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    }
    $('btn-cg-generate').onclick = run;
    $('cg-target').onchange = () => { if ($('cg-input').value.trim()) run(); };
    $('btn-cg-sample').onclick = () => {
      edIn.setValue(JSON.stringify({
        id: 42,
        uuid: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Elena Popescu',
        email: 'elena@devmail.io',
        website: 'https://ia-codestudio.com',
        active: true,
        roles: ['admin', 'architect'],
        metrics: { latencyMs: 12.4, requests: 1840 },
      }, null, 2));
      run();
    };
    Omni.onTabActivate.codegen = () => {
      Omni.activateOutput('out-code', 'JSON → Types & Schema Output', () => $('code-output').value);
    };
    Omni.registerSendTarget('codegen', 'Generate Types/Zod/SQL', 'Générer Types/Zod/SQL', (text) => {
      edIn.setValue(text);
      run();
    });
  }

  // ===========================================================================
  // 4. BASE64 STUDIO (UTF-8, Base64URL, Binary Magic-Byte Preview, Blob PDF CSP-safe!)
  // ===========================================================================
  function setupBase64() {
    const input = $('b64-text-input');
    const urlSafeChk = $('b64-urlsafe');
    const dropZone = $('b64-drop-zone');
    const fileInput = $('b64-file-input');
    const dlBtn = $('btn-b64-download');
    let currentBlobUrl = null;
    let currentMime = 'application/octet-stream';
    let currentName = 'decoded-file.bin';

    const MIME_EXT = {
      'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp',
      'image/svg+xml': 'svg', 'application/pdf': 'pdf', 'audio/mpeg': 'mp3', 'audio/wav': 'wav',
      'video/mp4': 'mp4', 'video/webm': 'webm', 'application/zip': 'zip', 'text/plain': 'txt', 'application/json': 'json',
    };

    function detectMagicMime(bytes) {
      if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'image/png';
      if (bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg';
      if (bytes.length >= 4 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';
      if (bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return 'application/pdf';
      if (bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4B && bytes[2] === 0x03 && bytes[3] === 0x04) return 'application/zip';
      return null;
    }

    function renderMedia(bytes, dataUrl, mime, name) {
      if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
      const blob = new Blob([bytes], { type: mime });
      currentBlobUrl = URL.createObjectURL(blob);
      currentMime = mime;
      currentName = name;

      $('b64-name').textContent = name;
      $('b64-type').textContent = mime;
      $('b64-size').textContent = bytes.length < 1024 ? `${bytes.length} B` : bytes.length < 1048576 ? `${(bytes.length / 1024).toFixed(2)} KB` : `${(bytes.length / 1048576).toFixed(2)} MB`;
      $('b64-file-details').classList.remove('hidden');
      dlBtn.classList.remove('hidden');

      const box = $('b64-media-preview');
      box.innerHTML = '';
      const safeAlt = Omni.escapeHTML(name);
      let tag = '';
      if (mime.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = currentBlobUrl;
        img.alt = name;
        box.appendChild(img);
        tag = `<img src="${dataUrl}" alt="${safeAlt}">`;
      } else if (mime.startsWith('audio/')) {
        const a = document.createElement('audio');
        a.src = currentBlobUrl; a.controls = true;
        box.appendChild(a);
        tag = `<audio controls src="${dataUrl}"></audio>`;
      } else if (mime.startsWith('video/')) {
        const v = document.createElement('video');
        v.src = currentBlobUrl; v.controls = true;
        box.appendChild(v);
        tag = `<video controls src="${dataUrl}"></video>`;
      } else if (mime === 'application/pdf') {
        // Uses Blob URL — 100% compatible with strict CSP (`frame-src blob:`)!
        const f = document.createElement('iframe');
        f.src = currentBlobUrl;
        f.title = 'PDF Preview';
        box.appendChild(f);
        tag = `<object data="${dataUrl}" type="application/pdf" width="100%" height="600"></object>`;
      } else {
        box.innerHTML = `<span class="muted">Binary file ready (${Omni.escapeHTML(mime)}, ${bytes.length} bytes). Click Download above.</span>`;
        tag = `<a href="${dataUrl}" download="${safeAlt}">Download ${safeAlt}</a>`;
      }
      $('embed-datauri').value = dataUrl;
      $('embed-htmltag').value = tag;
      Omni.activateOutput('out-base64', `Base64 Media (${mime})`, () => $('embed-datauri').value);
    }

    $('btn-b64-encode').onclick = () => {
      const txt = input.value;
      if (!txt) return Omni.showToast(Omni.t('noData'), 'error');
      const bytes = new TextEncoder().encode(txt);
      const out = urlSafeChk.checked ? Omni.Crypto.bytesToBase64Url(bytes) : Omni.Crypto.bytesToBase64(bytes);
      Omni.setCodeOutput(out, 'plain', urlSafeChk.checked ? 'Base64URL Encoded' : 'Base64 Encoded');
      Omni.addHistory('base64', 'Base64 Encode', out);
      Omni.showToast('Encoded!', 'success');
    };

    $('btn-b64-decode').onclick = () => {
      const raw = input.value.trim();
      if (!raw) return Omni.showToast(Omni.t('noData'), 'error');

      // Support multiline Data URIs with strict payload validation
      const uriMatch = raw.match(/^data:([^;,\s]+)(?:;[^;,]+)*;base64,([\s\S]+)$/i);
      if (uriMatch) {
        try {
          const mime = uriMatch[1].toLowerCase();
          const bytes = Omni.Crypto.base64ToBytes(uriMatch[2]);
          const ext = MIME_EXT[mime] || 'bin';
          renderMedia(bytes, `data:${mime};base64,${uriMatch[2].replace(/\s+/g, '')}`, mime, `decoded-file.${ext}`);
          Omni.showToast('Data URI decoded & rendered!', 'success');
        } catch (_) {
          Omni.showToast(Omni.t('b64Invalid'), 'error');
        }
        return;
      }

      try {
        const clean = raw.replace(/\s+/g, '');
        const bytes = /[-_]/.test(clean) || clean.length % 4 !== 0
          ? Omni.Crypto.base64UrlToBytes(clean)
          : Omni.Crypto.base64ToBytes(clean);
        const magicMime = detectMagicMime(bytes);
        if (magicMime) {
          const ext = MIME_EXT[magicMime] || 'bin';
          renderMedia(bytes, `data:${magicMime};base64,${Omni.Crypto.bytesToBase64(bytes)}`, magicMime, `detected.${ext}`);
          Omni.showToast(`Detected binary ${magicMime} from raw Base64!`, 'success');
          return;
        }
        // Strict UTF-8 check with graceful hex fallback for unknown binary
        let decoded;
        try {
          decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
        } catch (_) {
          renderMedia(bytes, `data:application/octet-stream;base64,${Omni.Crypto.bytesToBase64(bytes)}`, 'application/octet-stream', 'decoded.bin');
          Omni.showToast('Binary Base64 decoded — ready to download!', 'success');
          return;
        }
        Omni.setCodeOutput(decoded, 'plain', 'Base64 Decoded Text');
        Omni.addHistory('base64', 'Base64 Decode', decoded);
        Omni.showToast('Decoded!', 'success');
      } catch (_) {
        Omni.showToast(Omni.t('b64Invalid'), 'error');
      }
    };

    dlBtn.onclick = () => {
      if (!currentBlobUrl) return;
      const a = document.createElement('a');
      a.href = currentBlobUrl;
      a.download = currentName;
      a.click();
    };

    function handleFile(file) {
      if (!file) return;
      if (file.size > 15 * 1024 * 1024) {
        Omni.showToast('Warning: Large file (>15MB) may take a moment...', 'info');
      }
      const reader = new FileReader();
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result);
        const mime = file.type || detectMagicMime(bytes) || 'application/octet-stream';
        const b64 = Omni.Crypto.bytesToBase64(bytes);
        renderMedia(bytes, `data:${mime};base64,${b64}`, mime, file.name);
        Omni.showToast('File converted to Base64!', 'success');
      };
      reader.readAsArrayBuffer(file);
    }

    dropZone.onclick = () => fileInput.click();
    fileInput.onchange = (e) => { handleFile(e.target.files[0]); fileInput.value = ''; };
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); });

    Omni.onTabActivate.base64 = () => {
      if (currentBlobUrl) Omni.activateOutput('out-base64', `Base64 Media (${currentMime})`, () => $('embed-datauri').value);
      else Omni.activateOutput('out-code', 'Base64 Studio Output', () => $('code-output').value);
    };
    Omni.registerSendTarget('base64', 'Send to Base64 Studio', 'Envoyer vers Base64', (text) => { input.value = text; });
  }

  // ===========================================================================
  // 5. MINIFY & OBFUSCATE (Real Tokenizer + Compression Stats)
  // ===========================================================================
  function setupMinify() {
    const edIn = Omni.enhanceCodeEditor($('minify-input'), { lang: 'js' });
    const stats = $('minify-stats');

    function showStats(orig, out) {
      const a = new TextEncoder().encode(orig).length;
      const b = new TextEncoder().encode(out).length;
      const pct = a > 0 ? (((a - b) / a) * 100).toFixed(1) : '0.0';
      stats.textContent = `${a} B → ${b} B (${pct >= 0 ? '-' : '+'}${Math.abs(pct)}%)`;
      stats.classList.remove('hidden');
    }

    $('btn-minify-run').onclick = () => {
      const src = $('minify-input').value;
      if (!src.trim()) return Omni.showToast(Omni.t('noData'), 'error');
      const sel = $('minify-lang').value;
      const lang = sel === 'auto' ? Omni.Data.detectMinifyLanguage(src) : sel;
      let out;
      if (lang === 'css') out = Omni.Data.minifyCSS(src);
      else if (lang === 'html') out = Omni.Data.minifyHTML(src);
      else if (lang === 'sql') out = Omni.Data.minifySQL(src);
      else out = Omni.Data.minifyJS(src);
      showStats(src, out);
      Omni.setCodeOutput(out, lang, `Minified ${lang.toUpperCase()}`);
      Omni.addHistory('minify', `Minify ${lang.toUpperCase()}`, out);
      Omni.showToast(Omni.t('minDone'), 'success');
    };

    $('btn-obfuscate-run').onclick = () => {
      const src = $('minify-input').value;
      if (!src.trim()) return Omni.showToast(Omni.t('noData'), 'error');
      try {
        const out = Omni.Data.obfuscateJS(src);
        showStats(src, out);
        Omni.setCodeOutput(out, 'js', 'Obfuscated JavaScript');
        Omni.addHistory('minify', 'Obfuscate JS', out);
        Omni.showToast(Omni.t('minObfDone'), 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    Omni.onTabActivate.minify = () => Omni.activateOutput('out-code', 'Minify & Obfuscate Output', () => $('code-output').value);
    Omni.registerSendTarget('minify', 'Send to Minify & Obfuscate', 'Envoyer vers Minifier', (text) => edIn.setValue(text));
  }

  // ===========================================================================
  // 6. cURL TRANSLATOR & VISUAL URL INSPECTOR
  // ===========================================================================
  function setupHttpStudio() {
    const subBtns = document.querySelectorAll('#http-subtabs .seg-btn');
    subBtns.forEach((b) => {
      b.onclick = () => {
        subBtns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        $('http-sub-curl').classList.toggle('hidden', b.dataset.httpSub !== 'curl');
        $('http-sub-url').classList.toggle('hidden', b.dataset.httpSub !== 'url');
      };
    });

    function runCurl() {
      const raw = $('curl-input').value.trim();
      if (!raw) return Omni.showToast(Omni.t('noData'), 'error');
      try {
        const parsed = Omni.Data.parseCurl(raw);
        const target = $('curl-target').value;
        const code = Omni.Data.curlToCode(parsed, target);
        Omni.setCodeOutput(code, 'js', `cURL → ${target.toUpperCase()}`);
        Omni.addHistory('http', `cURL → ${target}`, code);
        Omni.showToast('cURL translated!', 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    }
    $('btn-curl-convert').onclick = runCurl;
    $('curl-target').onchange = () => { if ($('curl-input').value.trim()) runCurl(); };
    $('btn-curl-sample').onclick = () => {
      $('curl-input').value = `curl -X POST 'https://api.ia-codestudio.com/v1/convert' \\\n  -H 'Authorization: Bearer demo-token-2026' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"format":"yaml","offline":true}'`;
      runCurl();
    };

    // URL Query Builder
    const urlInput = $('url-inspector-input');
    const partsGrid = $('url-parts-grid');
    const paramsList = $('url-params-list');
    let currentUrlObj = null;

    function renderUrlParams() {
      if (!currentUrlObj) return;
      partsGrid.innerHTML = [
        ['Protocol', currentUrlObj.protocol],
        ['Host', currentUrlObj.host],
        ['Path', currentUrlObj.pathname],
        ['Hash', currentUrlObj.hash || '(none)'],
      ].map(([k, v]) => `<div class="copy-field"><label>${k}</label><div class="input-copy"><input readonly value="${Omni.escapeHTML(v)}"></div></div>`).join('');

      paramsList.innerHTML = '';
      const entries = Array.from(currentUrlObj.searchParams.entries());
      entries.forEach(([k, v], idx) => {
        const row = document.createElement('div');
        row.className = 'kv-row';
        const kIn = document.createElement('input'); kIn.className = 'field-input'; kIn.value = k; kIn.placeholder = 'key';
        const vIn = document.createElement('input'); vIn.className = 'field-input'; vIn.value = v; vIn.placeholder = 'value';
        const del = document.createElement('button'); del.className = 'icon-btn-sm'; del.innerHTML = '<svg class="ic ic-sm"><use href="#ic-trash"/></svg>';
        const rebuild = () => {
          const next = new URL(currentUrlObj.origin + currentUrlObj.pathname + currentUrlObj.hash);
          paramsList.querySelectorAll('.kv-row').forEach((r) => {
            const ins = r.querySelectorAll('input');
            if (ins[0].value) next.searchParams.append(ins[0].value, ins[1].value);
          });
          currentUrlObj = next;
          urlInput.value = next.toString();
          Omni.setCodeOutput(next.toString() + '\n\n// Parsed Query JSON:\n' + JSON.stringify(Object.fromEntries(next.searchParams.entries()), null, 2), 'json', 'URL Inspector Output');
        };
        kIn.oninput = rebuild;
        vIn.oninput = rebuild;
        del.onclick = () => { row.remove(); rebuild(); };
        row.append(kIn, vIn, del);
        paramsList.appendChild(row);
      });
      Omni.setCodeOutput(currentUrlObj.toString() + '\n\n// Parsed Query JSON:\n' + JSON.stringify(Object.fromEntries(currentUrlObj.searchParams.entries()), null, 2), 'json', 'URL Inspector Output');
    }

    urlInput.addEventListener('input', () => {
      try {
        currentUrlObj = new URL(urlInput.value.trim());
        renderUrlParams();
      } catch (_) {}
    });
    $('btn-url-add-param').onclick = () => {
      if (!currentUrlObj) {
        try { currentUrlObj = new URL(urlInput.value.trim() || 'https://example.com/'); } catch (_) { currentUrlObj = new URL('https://example.com/'); }
      }
      currentUrlObj.searchParams.append('key', 'value');
      urlInput.value = currentUrlObj.toString();
      renderUrlParams();
    };

    Omni.loadIntoHttp = (text, sub = 'curl') => {
      subBtns.forEach((b) => b.classList.toggle('active', b.dataset.httpSub === sub));
      $('http-sub-curl').classList.toggle('hidden', sub !== 'curl');
      $('http-sub-url').classList.toggle('hidden', sub !== 'url');
      if (sub === 'curl') { $('curl-input').value = text; runCurl(); }
      else { urlInput.value = text; urlInput.dispatchEvent(new Event('input')); }
    };
    Omni.onTabActivate.http = () => Omni.activateOutput('out-code', 'cURL & URL Studio Output', () => $('code-output').value);
  }

  // ===========================================================================
  // 7. QR CODE STUDIO 2.0 (ISO v1-40, Smart Templates, Logo, SVG, PNG, Scanner)
  // ===========================================================================
  function setupQRStudio() {
    let qrMode = 'text';
    let lastQrObj = null;
    let lastSvgStr = '';
    let logoImage = null;

    const modeBtns = document.querySelectorAll('#qr-mode-tabs .seg-btn');
    modeBtns.forEach((b) => {
      b.onclick = () => {
        modeBtns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        qrMode = b.dataset.qrMode;
        document.querySelectorAll('.qr-mode-pane').forEach((p) => p.classList.add('hidden'));
        $(`qr-pane-${qrMode}`).classList.remove('hidden');
        $('qr-style-controls').classList.toggle('hidden', qrMode === 'scan');
      };
    });

    $('qrcode-fg').oninput = () => { $('qrcode-fg-hex').value = $('qrcode-fg').value; };
    $('qrcode-fg-hex').oninput = () => { if (/^#[0-9a-f]{6}$/i.test($('qrcode-fg-hex').value)) $('qrcode-fg').value = $('qrcode-fg-hex').value; };
    $('qrcode-bg').oninput = () => { $('qrcode-bg-hex').value = $('qrcode-bg').value; };
    $('qrcode-bg-hex').oninput = () => { if (/^#[0-9a-f]{6}$/i.test($('qrcode-bg-hex').value)) $('qrcode-bg').value = $('qrcode-bg-hex').value; };

    $('qrcode-logo-file').onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          logoImage = img;
          $('qrcode-ecc').value = 'H'; // Auto high ECC for logo resilience!
          $('btn-qrcode-clear-logo').classList.remove('hidden');
          Omni.showToast('Logo loaded — Error Correction auto-set to High (30%)', 'info');
          generateQr();
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(f);
      e.target.value = '';
    };
    $('btn-qrcode-clear-logo').onclick = () => {
      logoImage = null;
      $('btn-qrcode-clear-logo').classList.add('hidden');
      generateQr();
    };

    function getPayload() {
      if (qrMode === 'wifi') return Omni.QR.buildTemplatePayload('wifi', { ssid: $('qr-wifi-ssid').value, auth: $('qr-wifi-auth').value, password: $('qr-wifi-pass').value, hidden: $('qr-wifi-hidden').checked });
      if (qrMode === 'vcard') return Omni.QR.buildTemplatePayload('vcard', { firstName: $('qr-vc-fn').value, lastName: $('qr-vc-ln').value, org: $('qr-vc-org').value, phone: $('qr-vc-phone').value, email: $('qr-vc-email').value, url: $('qr-vc-url').value });
      if (qrMode === 'email') return Omni.QR.buildTemplatePayload('email', { to: $('qr-em-to').value, subject: $('qr-em-subj').value, body: $('qr-em-body').value });
      if (qrMode === 'event') return Omni.QR.buildTemplatePayload('event', { summary: $('qr-ev-title').value, location: $('qr-ev-loc').value, start: $('qr-ev-start').value, end: $('qr-ev-end').value });
      return $('qrcode-input').value.trim();
    }

    function generateQr() {
      const payload = getPayload();
      if (!payload) return Omni.showToast(Omni.t('noData'), 'error');
      try {
        const ecc = $('qrcode-ecc').value;
        const size = parseInt($('qrcode-size').value, 10) || 320;
        const style = $('qrcode-style').value;
        const fg = $('qrcode-fg').value;
        const fg2 = $('qrcode-use-grad').checked ? $('qrcode-fg2').value : '';
        const bg = $('qrcode-bg').value;

        lastQrObj = Omni.QR.generate(payload, ecc);
        const opts = { size, style, fg, fg2, bg, quietZone: 4, logoImg: logoImage };
        Omni.QR.drawToCanvas(lastQrObj, $('qrcode-canvas'), opts);
        lastSvgStr = Omni.QR.toSvgString(lastQrObj, opts);

        $('qrcode-canvas-container').classList.remove('hidden');
        $('qrcode-placeholder').classList.add('hidden');
        $('qr-export-bar').classList.remove('hidden');
        const meta = $('qr-meta-badges');
        meta.innerHTML = `<span class="stat-pill">ISO v${lastQrObj.version} (${lastQrObj.size}×${lastQrObj.size})</span><span class="stat-pill">ECC ${lastQrObj.ecc}</span><span class="stat-pill">Mask #${lastQrObj.mask}</span><span class="stat-pill">${lastQrObj.byteLength} UTF-8 B</span><span class="stat-pill">Quiet Zone 4m</span>`;
        meta.classList.remove('hidden');

        $('qr-code-output').value = lastSvgStr;
        Omni.activateOutput('out-qr', `QR Studio 2.0 (v${lastQrObj.version}, ECC ${lastQrObj.ecc})`, () => lastSvgStr);
        Omni.addHistory('qrcode', `QR v${lastQrObj.version}: ${payload.slice(0, 30)}`, payload);
        Omni.showToast('ISO QR Code generated!', 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    }

    $('btn-qrcode-gen').onclick = generateQr;
    $('btn-qrcode-download').onclick = () => {
      $('qrcode-canvas').toBlob((blob) => { if (blob) Omni.downloadBlob(blob, 'omniconvert-qr.png'); }, 'image/png');
    };
    $('btn-qrcode-svg').onclick = () => {
      if (lastSvgStr) Omni.downloadText(lastSvgStr, 'omniconvert-qr.svg', 'image/svg+xml;charset=utf-8');
    };
    $('btn-qrcode-copy-img').onclick = () => {
      $('qrcode-canvas').toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          Omni.showToast('QR PNG copied to clipboard!', 'success');
        } catch (_) {
          Omni.copyText($('qrcode-canvas').toDataURL('image/png'), 'Copied PNG Data URI!');
        }
      });
    };

    // Offline QR Image Scanner (BarcodeDetector API)
    const scanDrop = $('qr-scan-drop');
    const scanFile = $('qr-scan-file');
    async function scanImageFile(file) {
      if (!file) return;
      const resBox = $('qr-scan-result');
      resBox.classList.remove('hidden');
      if (typeof global.BarcodeDetector !== 'function') {
        resBox.innerHTML = `<span class="muted">Your browser does not expose the native offline <code>BarcodeDetector</code> API (available in Chrome/Edge desktop & Android). Try Chrome/Edge to scan QR images offline.</span>`;
        return;
      }
      try {
        const bmp = await createImageBitmap(file);
        const det = new BarcodeDetector({ formats: ['qr_code'] });
        const codes = await det.detect(bmp);
        if (!codes.length) {
          resBox.innerHTML = `<span class="muted">No QR code detected in this image.</span>`;
        } else {
          const val = codes[0].rawValue;
          resBox.innerHTML = `<strong>Decoded QR Content:</strong><pre class="code-pre mt-4">${Omni.escapeHTML(val)}</pre>`;
          Omni.setCodeOutput(val, 'plain', 'Decoded QR Content');
          Omni.showToast('QR Code decoded offline!', 'success');
        }
      } catch (e) { resBox.textContent = 'Scan error: ' + e.message; }
    }
    scanDrop.onclick = () => scanFile.click();
    scanFile.onchange = (e) => { scanImageFile(e.target.files[0]); scanFile.value = ''; };
    scanDrop.addEventListener('dragover', (e) => { e.preventDefault(); scanDrop.classList.add('dragover'); });
    scanDrop.addEventListener('dragleave', () => scanDrop.classList.remove('dragover'));
    scanDrop.addEventListener('drop', (e) => { e.preventDefault(); scanDrop.classList.remove('dragover'); scanImageFile(e.dataTransfer.files[0]); });

    Omni.onTabActivate.qrcode = () => {
      Omni.activateOutput('out-qr', 'QR Studio 2.0 Preview', () => lastSvgStr || '');
      if (!lastQrObj && $('qrcode-input').value.trim()) generateQr();
    };
    Omni.registerSendTarget('qrcode', 'Generate QR Code', 'Générer un QR Code', (text) => {
      $('qrcode-input').value = text;
      generateQr();
    });
  }

  // ===========================================================================
  // 8. CRYPTO & HASH VAULT (MD5/SHA/HMAC + File Checksum + AES-256-GCM + PEM/Keys)
  // ===========================================================================
  function setupCryptoVault() {
    const subBtns = document.querySelectorAll('#hash-subtabs .seg-btn');
    subBtns.forEach((b) => {
      b.onclick = () => {
        subBtns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        const sub = b.dataset.hashSub;
        $('hash-sub-hashes').classList.toggle('hidden', sub !== 'hashes');
        $('hash-sub-aes').classList.toggle('hidden', sub !== 'aes');
        $('hash-sub-cert').classList.toggle('hidden', sub !== 'cert');
        $('hash-results-list').classList.toggle('hidden', sub !== 'hashes');
        $('hash-verify-banner').classList.toggle('hidden', sub !== 'hashes' || !$('hash-expected').value.trim());
        $('crypto-extra-wrap').classList.toggle('hidden', sub === 'hashes');
      };
    });

    let seq = 0;
    let activeBytes = null;

    async function computeAll(sourceInput) {
      const mySeq = ++seq;
      const isUpper = $('hash-uppercase').checked;
      const fmt = (h) => (isUpper ? h.toUpperCase() : h);
      const hasInput = sourceInput instanceof Uint8Array ? sourceInput.length > 0 : String(sourceInput).length > 0;
      const map = { md5: 'MD5', sha1: 'SHA-1', sha256: 'SHA-256', sha384: 'SHA-384', sha512: 'SHA-512' };
      const computed = [];

      for (const [id, algo] of Object.entries(map)) {
        const el = $(`hash-${id}`);
        if (!hasInput) { el.textContent = '—'; continue; }
        try {
          const val = fmt(await Omni.Crypto.digest(sourceInput, algo));
          if (mySeq !== seq) return; // Prevents async race condition!
          el.textContent = val;
          computed.push(val.toLowerCase());
        } catch (e) {
          if (mySeq !== seq) return;
          el.textContent = e.message;
        }
      }

      const hmacKey = $('hash-hmac-key').value;
      const hmacRow = $('hash-hmac-row');
      if (hmacKey && hasInput) {
        hmacRow.classList.remove('hidden');
        try {
          const hb = await Omni.Crypto.hmac('SHA-256', hmacKey, sourceInput);
          if (mySeq !== seq) return;
          const hv = fmt(Omni.Crypto.bytesToHex(hb));
          $('hash-hmac').textContent = hv;
          computed.push(hv.toLowerCase());
        } catch (e) { $('hash-hmac').textContent = e.message; }
      } else {
        hmacRow.classList.add('hidden');
      }

      // Checksum verifier banner
      const expected = $('hash-expected').value.trim().toLowerCase();
      const banner = $('hash-verify-banner');
      if (expected && computed.length) {
        const matched = computed.includes(expected);
        banner.className = `verify-banner ${matched ? 'ok' : 'bad'}`;
        banner.textContent = matched ? `✅ ${Omni.t('hashMatch')}` : `❌ ${Omni.t('hashMismatch')}`;
      } else {
        banner.classList.add('hidden');
      }
    }

    $('hash-input').addEventListener('input', () => {
      activeBytes = null;
      $('hash-file-badge').classList.add('hidden');
      computeAll($('hash-input').value);
    });
    ['hash-hmac-key', 'hash-expected', 'hash-uppercase'].forEach((id) => {
      $(id).addEventListener('input', () => computeAll(activeBytes || $('hash-input').value));
      $(id).addEventListener('change', () => computeAll(activeBytes || $('hash-input').value));
    });

    // Click hash text directly to copy!
    document.querySelectorAll('#hash-results-list .hash-val').forEach((el) => {
      el.onclick = () => { if (el.textContent && el.textContent !== '—') Omni.copyText(el.textContent); };
    });

    // File drag-and-drop checksum
    const fDrop = $('hash-file-drop');
    const fInput = $('hash-file-input');
    function hashFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        activeBytes = new Uint8Array(reader.result);
        const b = $('hash-file-badge');
        b.textContent = `File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        b.classList.remove('hidden');
        computeAll(activeBytes);
        Omni.showToast(`Computed checksums for ${file.name}`, 'success');
      };
      reader.readAsArrayBuffer(file);
    }
    fDrop.onclick = () => fInput.click();
    fInput.onchange = (e) => { hashFile(e.target.files[0]); fInput.value = ''; };
    fDrop.addEventListener('dragover', (e) => { e.preventDefault(); fDrop.classList.add('dragover'); });
    fDrop.addEventListener('dragleave', () => fDrop.classList.remove('dragover'));
    fDrop.addEventListener('drop', (e) => { e.preventDefault(); fDrop.classList.remove('dragover'); hashFile(e.dataTransfer.files[0]); });

    // AES-256-GCM
    $('btn-aes-encrypt').onclick = async () => {
      try {
        const res = await Omni.Crypto.aesEncrypt($('aes-input').value, $('aes-passphrase').value);
        $('crypto-extra-wrap').classList.remove('hidden');
        $('crypto-extra-label').textContent = 'Encrypted AES-256-GCM Token';
        $('crypto-extra-output').value = res;
        Omni.showToast('Encrypted locally with AES-256-GCM!', 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };
    $('btn-aes-decrypt').onclick = async () => {
      try {
        const res = await Omni.Crypto.aesDecrypt($('aes-input').value, $('aes-passphrase').value);
        $('crypto-extra-wrap').classList.remove('hidden');
        $('crypto-extra-label').textContent = 'Decrypted Plaintext';
        $('crypto-extra-output').value = res;
        Omni.showToast('Decrypted successfully!', 'success');
      } catch (e) { Omni.showToast('Decryption failed — wrong passphrase or corrupted ciphertext.', 'error'); }
    };

    // PEM Cert & Keypair
    $('btn-pem-parse').onclick = () => {
      try {
        const info = Omni.Crypto.parsePemCertificate($('pem-input').value);
        $('crypto-extra-wrap').classList.remove('hidden');
        $('crypto-extra-label').textContent = `X.509 Certificate (${info.status})`;
        $('crypto-extra-output').value = JSON.stringify(info, null, 2);
        Omni.showToast(`Certificate parsed (${info.status})`, 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };
    $('btn-keygen-run').onclick = async () => {
      try {
        const pair = await Omni.Crypto.generateKeypair($('keygen-algo').value);
        $('crypto-extra-wrap').classList.remove('hidden');
        $('crypto-extra-label').textContent = `${$('keygen-algo').value} Keypair (PEM)`;
        $('crypto-extra-output').value = pair.publicKeyPem + '\n\n' + pair.privateKeyPem;
        Omni.showToast('Keypair generated offline!', 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    Omni.onTabActivate.hash = () => {
      Omni.activateOutput('out-hash', 'Crypto & Hash Vault Output', () => {
        if (!$('crypto-extra-wrap').classList.contains('hidden')) return $('crypto-extra-output').value;
        return ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map((a) => `${a}: ${$('hash-' + a.toLowerCase().replace('-', '')).textContent}`).join('\n');
      });
    };
    Omni.registerSendTarget('hash', 'Hash in Crypto Vault', 'Hacher dans Coffre Crypto', (text) => {
      $('hash-input').value = text;
      computeAll(text);
    });
  }

  // ===========================================================================
  // 9. JWT STUDIO (Live Decode, Bearer Strip, Expiry Status, Verify & Sign)
  // ===========================================================================
  function setupJwtStudio() {
    const input = $('jwt-input');
    const signPayload = $('jwt-sign-payload');
    signPayload.value = JSON.stringify({
      sub: 'user_2026',
      name: 'OmniConvert Developer',
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    }, null, 2);

    function renderDecoded() {
      const raw = input.value.trim();
      const banner = $('jwt-status-banner');
      const warnBox = $('jwt-warnings');
      const tl = $('jwt-timeline');
      warnBox.innerHTML = '';

      if (!raw) {
        banner.classList.add('hidden');
        tl.classList.add('hidden');
        $('jwt-header-out').textContent = '—';
        $('jwt-payload-out').textContent = '—';
        $('jwt-sig-out').textContent = '—';
        return;
      }
      try {
        const d = Omni.Crypto.jwtDecode(raw);
        $('jwt-header-out').textContent = JSON.stringify(d.header, null, 2);
        $('jwt-payload-out').textContent = JSON.stringify(d.payload, null, 2);
        $('jwt-sig-out').textContent = d.signature;

        if (d.status === 'VALID') {
          banner.className = 'verify-banner ok';
          banner.textContent = `✅ ${Omni.t('jwtValid')} — expires in ${Math.floor(d.deltaSeconds / 60)}m (${d.expiresAt})`;
        } else if (d.status === 'EXPIRED') {
          banner.className = 'verify-banner bad';
          banner.textContent = `🔴 ${Omni.t('jwtExpired')} — expired ${Math.abs(Math.floor(d.deltaSeconds / 3600))}h ago (${d.expiresAt})`;
        } else if (d.status === 'NOT_YET_VALID') {
          banner.className = 'verify-banner warn';
          banner.textContent = `⏳ ${Omni.t('jwtNotYet')} — valid from ${d.notBefore}`;
        } else {
          banner.className = 'verify-banner warn';
          banner.textContent = `⚠️ Decoded (alg: ${d.header.alg || 'none'}, no exp claim)`;
        }

        d.warnings.forEach((w) => {
          const el = document.createElement('div');
          el.className = 'verify-banner warn';
          el.textContent = '⚠️ ' + w;
          warnBox.appendChild(el);
        });

        const items = [];
        if (d.issuedAt) items.push(`<div><span class="meta-k">iat:</span><strong>${d.issuedAt}</strong></div>`);
        if (d.notBefore) items.push(`<div><span class="meta-k">nbf:</span><strong>${d.notBefore}</strong></div>`);
        if (d.expiresAt) items.push(`<div><span class="meta-k">exp:</span><strong>${d.expiresAt}</strong></div>`);
        if (items.length) { tl.innerHTML = items.join(''); tl.classList.remove('hidden'); }
        else tl.classList.add('hidden');
      } catch (e) {
        banner.className = 'verify-banner bad';
        banner.textContent = '❌ ' + e.message;
        tl.classList.add('hidden');
      }
    }

    input.addEventListener('input', renderDecoded);

    $('btn-jwt-verify').onclick = async () => {
      try {
        const res = await Omni.Crypto.jwtVerifyHS(input.value, $('jwt-secret').value);
        $('jwt-sig-out').textContent = `${res.valid ? '✅ SIGNATURE VALID' : '❌ SIGNATURE INVALID'}\n\nActual:   ${res.actualSig}\nExpected: ${res.expectedSig}`;
        Omni.showToast(res.valid ? 'HMAC Signature Verified!' : 'Invalid Signature!', res.valid ? 'success' : 'error');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    $('btn-jwt-sign').onclick = async () => {
      try {
        const payload = JSON.parse(signPayload.value);
        const alg = $('jwt-sign-alg').value;
        const token = await Omni.Crypto.jwtSignHS({ alg, typ: 'JWT' }, payload, $('jwt-sign-secret').value);
        input.value = token;
        renderDecoded();
        Omni.copyText(token, 'Signed JWT copied to clipboard!');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    Omni.onTabActivate.jwt = () => {
      Omni.activateOutput('out-jwt', 'JWT Inspector & Claims', () => $('jwt-payload-out').textContent);
      renderDecoded();
    };
    Omni.registerSendTarget('jwt', 'Inspect in JWT Studio', 'Inspecter dans Studio JWT', (text) => {
      input.value = text;
      renderDecoded();
    });
  }

  // ===========================================================================
  // 10. COLORS, OKLCH, WCAG 2.1 CONTRAST & COLORBLIND LAB
  // ===========================================================================
  function setupColorsLab() {
    const picker = $('color-picker');
    const anyIn = $('color-any-input');
    const wFg = $('wcag-fg'), wFgHex = $('wcag-fg-hex');
    const wBg = $('wcag-bg'), wBgHex = $('wcag-bg-hex');
    let currentRgb = { r: 6, g: 182, b: 212 };

    function renderWcag() {
      const fg = Omni.Color.parse(wFgHex.value) || { r: 6, g: 182, b: 212 };
      const bg = Omni.Color.parse(wBgHex.value) || { r: 15, g: 23, b: 42 };
      const fgHex = Omni.Color.rgbToHex(fg.r, fg.g, fg.b);
      const bgHex = Omni.Color.rgbToHex(bg.r, bg.g, bg.b);
      const ratio = Omni.Color.contrastRatio(fg, bg);

      const card = $('wcag-preview-card');
      card.style.backgroundColor = bgHex;
      card.style.color = fgHex;
      $('wcag-badges').innerHTML = [
        [`Ratio ${ratio}:1`, ratio >= 4.5],
        [`AA Normal (4.5)`, ratio >= 4.5],
        [`AAA Normal (7.0)`, ratio >= 7.0],
        [`AA Large (3.0)`, ratio >= 3.0],
      ].map(([lbl, ok]) => `<span class="wcag-pill ${ok ? 'pass' : 'fail'}">${ok ? '✓' : '✕'} ${lbl}</span>`).join('');
    }

    function updateColor(rgb, syncText = true) {
      currentRgb = rgb;
      const hex = Omni.Color.rgbToHex(rgb.r, rgb.g, rgb.b);
      const hsl = Omni.Color.rgbToHsl(rgb.r, rgb.g, rgb.b);
      const oklch = Omni.Color.rgbToOklch(rgb.r, rgb.g, rgb.b);
      const cmyk = Omni.Color.rgbToCmyk(rgb.r, rgb.g, rgb.b);

      picker.value = hex;
      if (syncText) anyIn.value = hex;
      $('out-hex').value = hex;
      $('out-rgb').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      $('out-hsl').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      $('out-oklch').value = `oklch(${oklch.L}% ${oklch.C} ${oklch.H})`;
      $('out-cmyk').value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
      $('out-cssvar').value = `--color-brand: ${hex};`;

      wFg.value = hex;
      wFgHex.value = hex;
      renderWcag();

      // Tailwind 50-950 Shade Scale
      const shadesEl = $('tailwind-shades');
      shadesEl.innerHTML = '';
      Omni.Color.tailwindScale(rgb).forEach((s) => {
        const chip = document.createElement('div');
        chip.className = 'shade-chip';
        chip.innerHTML = `<div class="shade-swatch" style="background:${s.hex}"></div><div class="shade-meta"><strong>${s.step}</strong><span>${s.hex}</span></div>`;
        chip.onclick = () => Omni.copyText(s.hex, `Copied ${s.step}: ${s.hex}`);
        shadesEl.appendChild(chip);
      });

      // Colorblind Simulation
      const cvd = Omni.Color.simulateColorblind(rgb);
      $('colorblind-grid').innerHTML = Object.entries(cvd).map(([name, hx]) =>
        `<div class="cvd-card"><div class="cvd-dot" style="background:${hx}"></div><div><strong>${name}</strong><div class="muted">${hx}</div></div></div>`
      ).join('');
    }

    picker.oninput = () => updateColor(Omni.Color.parse(picker.value));
    anyIn.oninput = () => {
      const parsed = Omni.Color.parse(anyIn.value);
      if (parsed) updateColor(parsed, false);
    };
    wFg.oninput = () => { wFgHex.value = wFg.value; renderWcag(); };
    wFgHex.oninput = () => { const p = Omni.Color.parse(wFgHex.value); if (p) { wFg.value = Omni.Color.rgbToHex(p.r, p.g, p.b); renderWcag(); } };
    wBg.oninput = () => { wBgHex.value = wBg.value; renderWcag(); };
    wBgHex.oninput = () => { const p = Omni.Color.parse(wBgHex.value); if (p) { wBg.value = Omni.Color.rgbToHex(p.r, p.g, p.b); renderWcag(); } };

    $('btn-wcag-autofix').onclick = () => {
      const fg = Omni.Color.parse(wFgHex.value) || currentRgb;
      const bg = Omni.Color.parse(wBgHex.value) || { r: 15, g: 23, b: 42 };
      const fixed = Omni.Color.autoFixContrast(fg, bg, 4.5);
      const hex = Omni.Color.rgbToHex(fixed.r, fixed.g, fixed.b);
      updateColor(fixed, true);
      Omni.showToast(`Auto-fixed foreground to ${hex} (WCAG AA)!`, 'success');
    };

    Omni.loadColorInput = (str) => {
      const p = Omni.Color.parse(str);
      if (p) updateColor(p, true);
    };
    Omni.onTabActivate.colors = () => {
      Omni.activateOutput('out-colors', 'Colors, WCAG & Tailwind 50–950 Lab', () => {
        const scales = Omni.Color.tailwindScale(currentRgb).map((s) => `  --color-${s.step}: ${s.hex};`).join('\n');
        return `:root {\n${scales}\n}`;
      });
      updateColor(currentRgb, false);
    };
    updateColor(currentRgb, true);
  }

  // ===========================================================================
  // 11. SHARED VISUAL OUTPUT PANEL CONTROLLER (Gradient / Shadow / Glass / SVG)
  // ===========================================================================
  let visualState = { css: '', tailwind: '', extra: '', activeMode: 'css', langCss: 'css', langTw: 'plain' };

  function updateVisualOutput(cfg) {
    visualState = { ...visualState, ...cfg };
    const codeEl = $('visual-code-output');
    const val = visualState.activeMode === 'css' ? visualState.css : (visualState.activeMode === 'tailwind' ? visualState.tailwind : visualState.extra);
    codeEl.value = val || '';
    $('btn-visual-export-png').classList.toggle('hidden', !cfg.allowPng);
    const pill = $('visual-stat-pill');
    if (cfg.stat) { pill.textContent = cfg.stat; pill.classList.remove('hidden'); }
    else pill.classList.add('hidden');
  }

  function setupVisualTabs() {
    const btns = document.querySelectorAll('#visual-code-tabs .seg-btn');
    btns.forEach((b) => {
      b.onclick = () => {
        btns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        visualState.activeMode = b.dataset.vcode;
        $('visual-code-output').value =
          visualState.activeMode === 'css' ? visualState.css : (visualState.activeMode === 'tailwind' ? visualState.tailwind : visualState.extra);
      };
    });
  }

  // ===========================================================================
  // 12. GRADIENT & MESH STUDIO (Conic Angle Fixed + Smart Stop Midpoint + PNG Export)
  // ===========================================================================
  function setupGradientStudio() {
    let stops = [
      { color: '#06b6d4', pos: 0 },
      { color: '#8b5cf6', pos: 50 },
      { color: '#ec4899', pos: 100 },
    ];
    const PRESETS = [
      { name: 'Cyber Aura', type: 'linear', angle: 135, stops: [{ color: '#06b6d4', pos: 0 }, { color: '#8b5cf6', pos: 100 }] },
      { name: 'Sunset', type: 'linear', angle: 135, stops: [{ color: '#f43f5e', pos: 0 }, { color: '#f59e0b', pos: 100 }] },
      { name: 'Emerald', type: 'linear', angle: 120, stops: [{ color: '#10b981', pos: 0 }, { color: '#06b6d4', pos: 100 }] },
      { name: 'Hyper Mesh', type: 'mesh', angle: 135, stops: [{ color: '#06b6d4', pos: 0 }, { color: '#8b5cf6', pos: 50 }, { color: '#f43f5e', pos: 100 }] },
      { name: 'Conic Prism', type: 'conic', angle: 45, stops: [{ color: '#06b6d4', pos: 0 }, { color: '#8b5cf6', pos: 33 }, { color: '#ec4899', pos: 66 }, { color: '#06b6d4', pos: 100 }] },
      { name: 'Midnight', type: 'radial', angle: 0, stops: [{ color: '#1e3a8a', pos: 0 }, { color: '#090d16', pos: 100 }] },
      { name: 'Aurora', type: 'mesh', angle: 90, stops: [{ color: '#22d3ee', pos: 0 }, { color: '#34d399', pos: 50 }, { color: '#6366f1', pos: 100 }] },
      { name: 'Lava', type: 'linear', angle: 45, stops: [{ color: '#ef4444', pos: 0 }, { color: '#f97316', pos: 50 }, { color: '#facc15', pos: 100 }] },
    ];

    function buildCss() {
      const type = $('gradient-type').value;
      const angle = $('gradient-angle').value;
      const sorted = [...stops].sort((a, b) => a.pos - b.pos);
      const stopStr = sorted.map((s) => `${s.color} ${s.pos}%`).join(', ');
      if (type === 'linear') return `linear-gradient(${angle}deg, ${stopStr})`;
      if (type === 'radial') return `radial-gradient(circle at center, ${stopStr})`;
      if (type === 'conic') return `conic-gradient(from ${angle}deg at 50% 50%, ${stopStr})`;
      // Multi-point Mesh Gradient
      const c0 = sorted[0]?.color || '#06b6d4';
      const c1 = sorted[1]?.color || '#8b5cf6';
      const c2 = sorted[2]?.color || c0;
      const c3 = sorted[3]?.color || c1;
      return `radial-gradient(at 15% 20%, ${c0} 0px, transparent 55%), radial-gradient(at 85% 25%, ${c1} 0px, transparent 55%), radial-gradient(at 75% 85%, ${c2} 0px, transparent 55%), radial-gradient(at 20% 80%, ${c3} 0px, transparent 55%), #0b1120`;
    }

    function renderStops() {
      const list = $('gradient-stops-list');
      list.innerHTML = '';
      stops.forEach((s, i) => {
        const row = document.createElement('div');
        row.className = 'stop-row';
        const cp = document.createElement('input'); cp.type = 'color'; cp.value = s.color;
        const rng = document.createElement('input'); rng.type = 'range'; rng.min = '0'; rng.max = '100'; rng.value = s.pos; rng.className = 'slider flex-1';
        const lbl = document.createElement('span'); lbl.className = 'stat-pill'; lbl.textContent = s.pos + '%';
        const del = document.createElement('button'); del.className = 'icon-btn-sm'; del.innerHTML = '<svg class="ic ic-sm"><use href="#ic-trash"/></svg>';
        del.disabled = stops.length <= 2;
        cp.oninput = () => { s.color = cp.value; renderPreview(); };
        rng.oninput = () => { s.pos = +rng.value; lbl.textContent = s.pos + '%'; renderPreview(); };
        del.onclick = () => { if (stops.length > 2) { stops.splice(i, 1); renderStops(); renderPreview(); } };
        row.append(cp, rng, lbl, del);
        list.appendChild(row);
      });
    }

    function renderPreview() {
      const type = $('gradient-type').value;
      // Show angle for BOTH linear AND conic!
      $('gradient-angle-container').style.visibility = (type === 'linear' || type === 'conic') ? 'visible' : 'hidden';
      $('gradient-angle-val').textContent = $('gradient-angle').value + '°';

      const bg = buildCss();
      if (Omni.state.activeTab === 'gradient') {
        const target = $('visual-preview-target');
        target.style.cssText = `width:100%;height:200px;border-radius:14px;background:${bg};box-shadow:0 16px 40px rgba(0,0,0,0.4);`;
        target.textContent = '';
        const twVal = `bg-[${bg.replace(/\s+/g, '_')}]`;
        updateVisualOutput({
          css: `.gradient-surface {\n  background: ${bg};\n}`,
          tailwind: `class="${twVal}"`,
          extra: `background-image: ${bg};`,
          allowPng: true,
        });
      }
    }

    $('gradient-type').onchange = renderPreview;
    $('gradient-angle').oninput = renderPreview;
    $('btn-gradient-add-stop').onclick = () => {
      if (stops.length >= 6) return Omni.showToast('Max 6 color stops', 'info');
      // Smart midpoint insertion between largest gap!
      const sorted = [...stops].sort((a, b) => a.pos - b.pos);
      let bestPos = 50, maxGap = -1;
      for (let i = 0; i < sorted.length - 1; i++) {
        const gap = sorted[i + 1].pos - sorted[i].pos;
        if (gap > maxGap) { maxGap = gap; bestPos = Math.round((sorted[i].pos + sorted[i + 1].pos) / 2); }
      }
      stops.push({ color: '#10b981', pos: bestPos });
      renderStops();
      renderPreview();
    };
    $('btn-gradient-reverse').onclick = () => {
      stops.forEach((s) => { s.pos = 100 - s.pos; });
      stops.reverse();
      renderStops();
      renderPreview();
    };
    $('btn-gradient-random').onclick = () => {
      const randHex = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
      stops.forEach((s) => { s.color = randHex(); });
      $('gradient-angle').value = Math.floor(Math.random() * 360);
      renderStops();
      renderPreview();
    };

    const pBox = $('gradient-presets');
    PRESETS.forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'preset-swatch-btn';
      btn.title = p.name;
      btn.style.background = `linear-gradient(135deg, ${p.stops.map((s) => `${s.color} ${s.pos}%`).join(', ')})`;
      btn.onclick = () => {
        $('gradient-type').value = p.type;
        $('gradient-angle').value = p.angle;
        stops = p.stops.map((s) => ({ ...s }));
        renderStops();
        renderPreview();
      };
      pBox.appendChild(btn);
    });

    // Export Gradient Wallpaper PNG (1200x800)
    $('btn-visual-export-png').onclick = () => {
      const c = document.createElement('canvas');
      c.width = 1200; c.height = 800;
      const ctx = c.getContext('2d');
      const rad = (Number($('gradient-angle').value) - 90) * Math.PI / 180;
      const cx = 600, cy = 400, len = 720;
      const g = ctx.createLinearGradient(cx - Math.cos(rad) * len, cy - Math.sin(rad) * len, cx + Math.cos(rad) * len, cy + Math.sin(rad) * len);
      [...stops].sort((a, b) => a.pos - b.pos).forEach((s) => g.addColorStop(s.pos / 100, s.color));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1200, 800);
      c.toBlob((blob) => { if (blob) Omni.downloadBlob(blob, 'omniconvert-gradient.png'); });
    };

    renderStops();
    Omni.onTabActivate.gradient = () => {
      Omni.activateOutput('out-visual', 'Gradient & Mesh Studio', () => $('visual-code-output').value);
      renderPreview();
    };
  }

  // ===========================================================================
  // 13. MULTI-LAYER SHADOW & GLASSMORPHISM LAB (Preserves Dimensions & Clears Properly!)
  // ===========================================================================
  function setupShadowAndGlass() {
    let mode = 'box';
    let layers = [
      { x: 0, y: 10, blur: 25, spread: -5, color: '#000000', alpha: 45, inset: false },
      { x: 0, y: 4, blur: 10, spread: -2, color: '#06b6d4', alpha: 25, inset: false },
    ];

    const SHADOW_PRESETS = [
      { name: 'Soft Elevation', layers: [{ x: 0, y: 12, blur: 30, spread: -6, color: '#000000', alpha: 45, inset: false }, { x: 0, y: 4, blur: 12, spread: -2, color: '#000000', alpha: 25, inset: false }] },
      { name: 'Cyber Glow', layers: [{ x: 0, y: 0, blur: 24, spread: 2, color: '#06b6d4', alpha: 65, inset: false }, { x: 0, y: 0, blur: 48, spread: 6, color: '#8b5cf6', alpha: 40, inset: false }] },
      { name: 'Neumorphism', layers: [{ x: 8, y: 8, blur: 16, spread: 0, color: '#000000', alpha: 50, inset: false }, { x: -8, y: -8, blur: 16, spread: 0, color: '#ffffff', alpha: 12, inset: false }] },
      { name: 'Inner Press', layers: [{ x: 0, y: 4, blur: 14, spread: 0, color: '#000000', alpha: 60, inset: true }] },
    ];

    const modeBtns = document.querySelectorAll('#shadow-mode-tabs .seg-btn');
    modeBtns.forEach((b) => {
      b.onclick = () => {
        modeBtns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        mode = b.dataset.shadowMode;
        $('shadow-layers-pane').classList.toggle('hidden', mode === 'glass');
        $('glass-controls-pane').classList.toggle('hidden', mode !== 'glass');
        renderLayers();
        renderVisual();
      };
    });

    function rgbaStr(hex, alphaPct) {
      const rgb = Omni.Color.parse(hex) || { r: 0, g: 0, b: 0 };
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(alphaPct / 100).toFixed(2)})`;
    }

    function renderLayers() {
      const list = $('shadow-layers-list');
      list.innerHTML = '';
      layers.forEach((L, idx) => {
        const card = document.createElement('div');
        card.className = 'layer-card';
        card.innerHTML = `
          <div class="section-bar mb-8">
            <strong>Layer #${idx + 1}</strong>
            <div class="btn-row">
              ${mode === 'box' ? `<label class="check-label"><input type="checkbox" class="ly-inset" ${L.inset ? 'checked' : ''}><span>Inset</span></label>` : ''}
              <input type="color" class="ly-color" value="${L.color}">
              ${layers.length > 1 ? `<button class="icon-btn-sm ly-del" aria-label="Delete Layer"><svg class="ic ic-sm"><use href="#ic-trash"/></svg></button>` : ''}
            </div>
          </div>
          <div class="form-row-2">
            <div class="slider-row"><label>X <strong>${L.x}px</strong></label><input type="range" class="slider ly-x" min="-50" max="50" value="${L.x}"></div>
            <div class="slider-row"><label>Y <strong>${L.y}px</strong></label><input type="range" class="slider ly-y" min="-50" max="50" value="${L.y}"></div>
            <div class="slider-row"><label>Blur <strong>${L.blur}px</strong></label><input type="range" class="slider ly-blur" min="0" max="100" value="${L.blur}"></div>
            <div class="slider-row"><label>Opacity <strong>${L.alpha}%</strong></label><input type="range" class="slider ly-alpha" min="0" max="100" value="${L.alpha}"></div>
            ${mode === 'box' ? `<div class="slider-row"><label>Spread <strong>${L.spread}px</strong></label><input type="range" class="slider ly-spread" min="-40" max="40" value="${L.spread}"></div>` : ''}
          </div>`;

        const bind = (sel, key, suffix) => {
          const el = card.querySelector(sel);
          if (!el) return;
          el.oninput = () => {
            L[key] = el.type === 'checkbox' ? el.checked : (el.type === 'color' ? el.value : +el.value);
            const st = el.closest('.slider-row')?.querySelector('strong');
            if (st) st.textContent = L[key] + suffix;
            renderVisual();
          };
        };
        bind('.ly-x', 'x', 'px'); bind('.ly-y', 'y', 'px'); bind('.ly-blur', 'blur', 'px');
        bind('.ly-spread', 'spread', 'px'); bind('.ly-alpha', 'alpha', '%');
        bind('.ly-color', 'color', ''); bind('.ly-inset', 'inset', '');
        const del = card.querySelector('.ly-del');
        if (del) del.onclick = () => { layers.splice(idx, 1); renderLayers(); renderVisual(); };
        list.appendChild(card);
      });
    }

    function renderVisual() {
      if (Omni.state.activeTab !== 'shadow') return;
      const target = $('visual-preview-target');

      if (mode === 'glass') {
        const blur = $('glass-blur').value;
        const op = $('glass-opacity').value;
        const sat = $('glass-saturation').value;
        const bop = $('glass-border-op').value;
        const rad = $('glass-radius').value;
        const rgb = Omni.Color.parse($('glass-color').value) || { r: 255, g: 255, b: 255 };
        $('blur-val').textContent = blur + 'px';
        $('opacity-val').textContent = op + '%';
        $('saturation-val').textContent = sat + '%';
        $('border-op-val').textContent = bop + '%';
        $('radius-val').textContent = rad + 'px';

        const bgRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(op / 100).toFixed(2)})`;
        const brRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(bop / 100).toFixed(2)})`;
        // Explicit dimensions preserved cleanly (fixes Bug 5.3.2!)
        target.style.cssText = `width:220px;height:130px;border-radius:${rad}px;background:${bgRgba};backdrop-filter:blur(${blur}px) saturate(${sat}%);-webkit-backdrop-filter:blur(${blur}px) saturate(${sat}%);border:1px solid ${brRgba};display:grid;place-items:center;font-weight:800;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,0.45);box-shadow:none;filter:none;`;
        target.textContent = 'Glass Card';

        const css = `.glass-card {\n  background: ${bgRgba};\n  backdrop-filter: blur(${blur}px) saturate(${sat}%);\n  -webkit-backdrop-filter: blur(${blur}px) saturate(${sat}%);\n  border: 1px solid ${brRgba};\n  border-radius: ${rad}px;\n}`;
        const tw = `class="backdrop-blur-[${blur}px] backdrop-saturate-[${sat}%] bg-[${bgRgba.replace(/\s+/g, '')}] border border-[${brRgba.replace(/\s+/g, '')}] rounded-[${rad}px]"`;
        updateVisualOutput({ css, tailwind: tw, extra: css, allowPng: false });
        return;
      }

      if (mode === 'box') {
        const val = layers.map((L) => `${L.inset ? 'inset ' : ''}${L.x}px ${L.y}px ${L.blur}px ${L.spread}px ${rgbaStr(L.color, L.alpha)}`).join(', ');
        target.style.cssText = `width:160px;height:120px;border-radius:14px;background:linear-gradient(135deg,#0ea5e9,#6366f1);display:grid;place-items:center;font-weight:800;color:#fff;box-shadow:${val};text-shadow:none;filter:none;`;
        target.textContent = 'Box Shadow';
        updateVisualOutput({
          css: `.elevated-box {\n  box-shadow: ${val};\n}`,
          tailwind: `class="shadow-[${val.replace(/\s+/g, '_')}]"`,
          extra: `box-shadow: ${val};`,
          allowPng: false,
        });
      } else if (mode === 'text') {
        const val = layers.map((L) => `${L.x}px ${L.y}px ${L.blur}px ${rgbaStr(L.color, L.alpha)}`).join(', ');
        target.style.cssText = `width:auto;height:auto;background:transparent;font-size:2rem;font-weight:900;color:#f8fafc;text-shadow:${val};box-shadow:none;filter:none;`;
        target.textContent = 'Text Shadow';
        updateVisualOutput({
          css: `.glow-text {\n  text-shadow: ${val};\n}`,
          tailwind: `class="[text-shadow:${val.replace(/\s+/g, '_')}]"`,
          extra: `text-shadow: ${val};`,
          allowPng: false,
        });
      } else {
        const val = layers.map((L) => `drop-shadow(${L.x}px ${L.y}px ${L.blur}px ${rgbaStr(L.color, L.alpha)})`).join(' ');
        target.style.cssText = `width:130px;height:130px;border-radius:28px;background:linear-gradient(135deg,#06b6d4,#ec4899);display:grid;place-items:center;font-weight:800;color:#fff;filter:${val};box-shadow:none;text-shadow:none;`;
        target.textContent = 'Drop Shadow';
        updateVisualOutput({
          css: `.filtered-icon {\n  filter: ${val};\n}`,
          tailwind: `class="[filter:${val.replace(/\s+/g, '_')}]"`,
          extra: `filter: ${val};`,
          allowPng: false,
        });
      }
    }

    $('btn-shadow-add-layer').onclick = () => {
      if (layers.length >= 5) return Omni.showToast('Max 5 shadow layers', 'info');
      layers.push({ x: 0, y: 16, blur: 32, spread: 0, color: '#8b5cf6', alpha: 30, inset: false });
      renderLayers();
      renderVisual();
    };

    const pBox = $('shadow-presets');
    SHADOW_PRESETS.forEach((p) => {
      const b = document.createElement('button');
      b.className = 'chip-btn';
      b.textContent = p.name;
      b.onclick = () => { layers = p.layers.map((x) => ({ ...x })); renderLayers(); renderVisual(); };
      pBox.appendChild(b);
    });

    ['glass-blur', 'glass-opacity', 'glass-saturation', 'glass-border-op', 'glass-radius', 'glass-color'].forEach((id) => {
      $(id).addEventListener('input', renderVisual);
    });

    renderLayers();
    Omni.onTabActivate.shadow = () => {
      Omni.activateOutput('out-visual', 'Multi-Layer Shadow & Glass Lab', () => $('visual-code-output').value);
      renderVisual();
    };
  }

  // ===========================================================================
  // 14. SVG OPTIMIZER + REACT JSX + CSS DATA URI
  // ===========================================================================
  function setupSvgStudio() {
    const input = $('svg-input');
    function run() {
      const raw = input.value.trim();
      if (!raw) return Omni.showToast(Omni.t('noData'), 'error');
      try {
        const res = Omni.Svg.optimize(raw, {
          removeComments: $('svg-opt-comments').checked,
          removeMetadata: $('svg-opt-meta').checked,
          removeDimensions: $('svg-opt-dims').checked,
          minify: $('svg-opt-minify').checked,
          roundPrecision: 2,
        });
        const target = $('visual-preview-target');
        target.style.cssText = 'width:180px;height:180px;display:grid;place-items:center;background:rgba(255,255,255,0.06);border-radius:12px;padding:16px;';
        // Safe SVG rendering via Blob URL image (prevents script execution inside untrusted SVGs!)
        const blob = new Blob([res.svg], { type: 'image/svg+xml' });
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        img.style.cssText = 'max-width:100%;max-height:100%;';
        img.onload = () => URL.revokeObjectURL(img.src);
        target.innerHTML = '';
        target.appendChild(img);

        Omni.activateOutput('out-visual', 'SVG Optimizer Studio', () => $('visual-code-output').value);
        updateVisualOutput({
          css: res.svg,
          tailwind: Omni.Svg.toReactJsx(res.svg, 'OptimizedIcon'),
          extra: Omni.Svg.toCssDataUri(res.svg),
          stat: `${res.origBytes} B → ${res.newBytes} B (-${res.savedPct}%)`,
          allowPng: false,
        });
        Omni.addHistory('svg', `SVG Optimized (-${res.savedPct}%)`, res.svg);
        Omni.showToast(`SVG optimized (-${res.savedPct}%)!`, 'success');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    }

    $('btn-svg-optimize').onclick = run;
    $('btn-svg-sample').onclick = () => {
      input.value = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Sample SVG with comments & decimals -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">\n  <metadata>Exported by Design Tool</metadata>\n  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>\n  <circle cx="60.0000" cy="60.0000" r="48.5000" fill="url(#g)"/>\n  <path d="M40.0000 62.5000 L54.2500 76.7500 L82.0000 46.0000" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>\n</svg>`;
      run();
    };
    const drop = $('svg-drop-zone'), fi = $('svg-file-input');
    drop.onclick = () => fi.click();
    fi.onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader(); r.onload = () => { input.value = r.result; run(); }; r.readAsText(f);
      fi.value = '';
    };
    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('dragover'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault(); drop.classList.remove('dragover');
      const f = e.dataTransfer.files[0]; if (!f) return;
      const r = new FileReader(); r.onload = () => { input.value = r.result; run(); }; r.readAsText(f);
    });

    Omni.onTabActivate.svg = () => {
      Omni.activateOutput('out-visual', 'SVG Optimizer Studio', () => $('visual-code-output').value);
      if (input.value.trim()) run();
    };
    Omni.registerSendTarget('svg', 'Optimize in SVG Studio', 'Optimiser dans Studio SVG', (text) => { input.value = text; run(); });
  }

  // ===========================================================================
  // 15. REGEX LAB (Respects Exact Flags, Capture Groups Table, Replace, Safe Loop)
  // ===========================================================================
  function setupRegexLab() {
    const patIn = $('regex-pattern');
    const flgIn = $('regex-flags');
    const txtIn = $('regex-test-input');
    const repIn = $('regex-replace-input');
    const pills = document.querySelectorAll('#regex-flag-pills .flag-pill');

    const PRESETS = [
      { label: 'Email', pat: '([\\w.+-]+)@([\\w-]+\\.[\\w.-]+)', flags: 'gi' },
      { label: 'URL', pat: 'https?:\\/\\/[\\w.-]+(?:\\/[\\w./?%&=-]*)?', flags: 'gi' },
      { label: 'IPv4', pat: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
      { label: 'UUID', pat: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', flags: 'gi' },
      { label: 'Hex Color', pat: '#(?:[0-9a-f]{3}){1,2}\\b', flags: 'gi' },
      { label: 'ISO Date', pat: '(\\d{4})-(\\d{2})-(\\d{2})', flags: 'g' },
    ];
    const pBox = $('regex-presets');
    PRESETS.forEach((p) => {
      const b = document.createElement('button');
      b.className = 'chip-btn'; b.textContent = p.label;
      b.onclick = () => { patIn.value = p.pat; flgIn.value = p.flags; syncPills(); runRegex(); };
      pBox.appendChild(b);
    });

    function syncPills() {
      const f = flgIn.value;
      pills.forEach((p) => p.classList.toggle('active', f.includes(p.dataset.flag)));
    }
    pills.forEach((p) => {
      p.onclick = () => {
        const ch = p.dataset.flag;
        flgIn.value = flgIn.value.includes(ch) ? flgIn.value.replace(ch, '') : flgIn.value + ch;
        syncPills();
        runRegex();
      };
    });

    function runRegex() {
      const pattern = patIn.value;
      const flags = flgIn.value.replace(/[^dgimsuvy]/g, '');
      const text = txtIn.value;
      const errEl = $('regex-error-msg');
      const countEl = $('regex-match-count');
      const hlBox = $('regex-highlighted');
      const grpBox = $('regex-groups-table');
      errEl.textContent = '';

      if (!pattern) {
        countEl.textContent = Omni.t('rgxNoMatches');
        hlBox.textContent = text;
        grpBox.innerHTML = '<span class="muted">Enter a regex pattern to inspect matches & capture groups.</span>';
        $('regex-replace-wrap').classList.add('hidden');
        return;
      }

      try {
        // Respects exact user flags (never forces 'g'!)
        const re = new RegExp(pattern, flags);
        const matches = [];
        const t0 = performance.now();
        if (re.global || re.sticky) {
          let m, guard = 0;
          while ((m = re.exec(text)) !== null) {
            matches.push({ index: m.index, text: m[0], groups: m.slice(1), named: m.groups || null });
            if (m[0].length === 0) re.lastIndex++;
            if (++guard > 2000 || performance.now() - t0 > 350) {
              errEl.textContent = 'Stopped early to prevent ReDoS browser freeze.';
              break;
            }
          }
        } else {
          const m = re.exec(text);
          if (m) matches.push({ index: m.index, text: m[0], groups: m.slice(1), named: m.groups || null });
        }

        countEl.textContent = matches.length === 1 ? `1 ${Omni.t('rgxMatch')}` : `${matches.length} ${Omni.t('rgxMatches')}`;

        // Safe HTML slice builder (zero sentinel-token collision!)
        let outHtml = '';
        let cursor = 0;
        for (const m of matches) {
          outHtml += Omni.escapeHTML(text.slice(cursor, m.index));
          if (m.text.length === 0) outHtml += '<mark class="regex-zero" title="Zero-length match"></mark>';
          else outHtml += `<mark class="regex-match">${Omni.escapeHTML(m.text)}</mark>`;
          cursor = m.index + m.text.length;
        }
        outHtml += Omni.escapeHTML(text.slice(cursor));
        hlBox.innerHTML = outHtml;

        // Capture groups table
        if (!matches.length) {
          grpBox.innerHTML = '<span class="muted">No matches found.</span>';
        } else {
          const rows = matches.slice(0, 100).map((m, i) => {
            const gStr = m.groups.length ? m.groups.map((g, gi) => `$${gi + 1}=${JSON.stringify(g)}`).join(', ') : '—';
            const nStr = m.named ? JSON.stringify(m.named) : '—';
            return `<tr><td>${i + 1}</td><td>${m.index}</td><td><code>${Omni.escapeHTML(m.text || '(empty)')}</code></td><td><code>${Omni.escapeHTML(gStr)}</code></td><td><code>${Omni.escapeHTML(nStr)}</code></td></tr>`;
          }).join('');
          grpBox.innerHTML = `<table class="data-table"><thead><tr><th>#</th><th>Idx</th><th>Full Match</th><th>Groups ($1..$n)</th><th>Named</th></tr></thead><tbody>${rows}</tbody></table>`;
        }

        // Replace Preview
        if (repIn.value !== '') {
          $('regex-replace-wrap').classList.remove('hidden');
          $('regex-replace-out').textContent = text.replace(new RegExp(pattern, flags), repIn.value);
        } else {
          $('regex-replace-wrap').classList.add('hidden');
        }
      } catch (e) {
        errEl.textContent = e.message;
        countEl.textContent = Omni.t('rgxNoMatches');
      }
    }

    [patIn, flgIn, txtIn, repIn].forEach((el) => el.addEventListener('input', () => { syncPills(); runRegex(); }));
    Omni.onTabActivate.regex = () => {
      Omni.activateOutput('out-regex', 'Regex Lab — Matches & Capture Groups', () => {
        if (repIn.value !== '') return $('regex-replace-out').textContent;
        return `/${patIn.value}/${flgIn.value}`;
      });
      runRegex();
    };
  }

  // ===========================================================================
  // 16. MYERS DIFF STUDIO (Unified & Side-by-Side, Line Numbers, Word Diff, CRLF-safe)
  // ===========================================================================
  function setupDiffStudio() {
    function renderInline(parts) {
      return parts.map((p) => p.changed ? `<span class="diff-word-hl">${Omni.escapeHTML(p.text)}</span>` : Omni.escapeHTML(p.text)).join('');
    }

    function runDiff() {
      const edits = Omni.Data.diffTexts($('diff-original').value, $('diff-modified').value, {
        ignoreWhitespace: $('diff-ignore-ws').checked,
        ignoreCase: $('diff-ignore-case').checked,
      });
      const adds = edits.filter((e) => e.type === 'added').length;
      const rems = edits.filter((e) => e.type === 'removed').length;
      const sbs = $('diff-side-by-side').checked;
      const box = $('diff-output');

      let html = `<div class="diff-stat"><span class="add">+ ${adds} ${Omni.t('difAdditions')}</span><span class="rem">− ${rems} ${Omni.t('difDeletions')}</span><span class="muted">${edits.length} lines</span></div>`;
      if (sbs) {
        html += '<div class="diff-sbs">';
        edits.forEach((e) => {
          const leftCls = e.type === 'removed' ? 'diff-row removed' : (e.type === 'unchanged' ? 'diff-row unchanged' : '');
          const rightCls = e.type === 'added' ? 'diff-row added' : (e.type === 'unchanged' ? 'diff-row unchanged' : '');
          const lTxt = e.type === 'added' ? '' : (e.inline ? renderInline(e.inline) : Omni.escapeHTML(e.text));
          const rTxt = e.type === 'removed' ? '' : (e.inline ? renderInline(e.inline) : Omni.escapeHTML(e.text));
          html += `<div class="diff-sbs-cell ${leftCls}"><span class="diff-ln">${e.oldLine ?? ''}</span><span class="diff-txt">${lTxt || '&nbsp;'}</span></div>`;
          html += `<div class="diff-sbs-cell ${rightCls}"><span class="diff-ln">${e.newLine ?? ''}</span><span class="diff-txt">${rTxt || '&nbsp;'}</span></div>`;
        });
        html += '</div>';
      } else {
        edits.forEach((e) => {
          const sign = e.type === 'added' ? '+' : (e.type === 'removed' ? '−' : ' ');
          const content = e.inline ? renderInline(e.inline) : Omni.escapeHTML(e.text);
          html += `<div class="diff-row ${e.type}"><span class="diff-ln">${e.oldLine ?? ''}</span><span class="diff-ln">${e.newLine ?? ''}</span><span class="diff-sign">${sign}</span><span class="diff-txt">${content || '&nbsp;'}</span></div>`;
        });
      }
      box.innerHTML = html;
      Omni.activateOutput('out-diff', `Diff Studio (+${adds} / −${rems})`, () => edits.map((e) => `${e.type === 'added' ? '+' : e.type === 'removed' ? '-' : ' '} ${e.text}`).join('\n'));
    }

    $('btn-diff-compare').onclick = runDiff;
    $('btn-diff-swap').onclick = () => {
      const tmp = $('diff-original').value;
      $('diff-original').value = $('diff-modified').value;
      $('diff-modified').value = tmp;
      runDiff();
    };
    ['diff-ignore-ws', 'diff-ignore-case', 'diff-side-by-side'].forEach((id) => $(id).addEventListener('change', runDiff));
    Omni.onTabActivate.diff = () => {
      Omni.activateOutput('out-diff', 'Myers Diff Studio', () => $('diff-output').textContent);
      if ($('diff-original').value || $('diff-modified').value) runDiff();
    };
    Omni.registerSendTarget('diff', 'Send to Diff Original', 'Envoyer vers Diff Original', (text) => {
      $('diff-original').value = text;
    });
  }

  // ===========================================================================
  // 17. UTILITIES & CRON HUB (5 Scoped Subtabs!)
  // ===========================================================================
  function setupUtilitiesHub() {
    const subBtns = document.querySelectorAll('#utilities-subtabs .seg-btn');
    const subPanels = document.querySelectorAll('.util-subpanel');

    function switchUtilSub(name) {
      Omni.state.activeUtilSubtab = name;
      subBtns.forEach((b) => b.classList.toggle('active', b.dataset.utilTab === name));
      subPanels.forEach((p) => p.classList.toggle('hidden', p.id !== `util-${name}`));
      if (name === 'cron') runCron();
    }
    subBtns.forEach((b) => { b.onclick = () => switchUtilSub(b.dataset.utilTab); });
    Omni.switchUtilSubtab = switchUtilSub;

    // --- Text Tools & Full GFM Markdown (Zero Watermark!) ---
    const uIn = $('utilities-input');
    $('btn-url-encode').onclick = () => { if (uIn.value) Omni.setCodeOutput(encodeURIComponent(uIn.value), 'plain', 'URL Encoded'); };
    $('btn-url-decode').onclick = () => { try { Omni.setCodeOutput(decodeURIComponent(uIn.value), 'plain', 'URL Decoded'); } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); } };
    $('btn-html-encode').onclick = () => { if (uIn.value) Omni.setCodeOutput(Omni.escapeHTML(uIn.value), 'html', 'HTML Escaped'); };
    $('btn-html-decode').onclick = () => {
      if (!uIn.value) return;
      // Only decode HTML entities without stripping real tags!
      const ta = document.createElement('textarea');
      ta.innerHTML = uIn.value;
      Omni.setCodeOutput(ta.value, 'html', 'HTML Unescaped');
    };

    const mdTabs = document.querySelectorAll('#md-out-tabs .seg-btn');
    mdTabs.forEach((b) => {
      b.onclick = () => {
        mdTabs.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        const v = b.dataset.mdView;
        $('md-preview-frame').classList.toggle('hidden', v !== 'preview');
        $('md-html-output').classList.toggle('hidden', v !== 'html');
      };
    });

    $('btn-markdown').onclick = () => {
      const md = uIn.value;
      if (!md.trim()) return Omni.showToast(Omni.t('noData'), 'error');
      const html = Omni.Data.renderMarkdown(md);
      $('md-html-output').value = html;
      $('md-preview-frame').srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;background:#0b1120;color:#e2e8f0;padding:24px;line-height:1.65;}h1,h2,h3,h4{color:#22d3ee;margin:1.2em 0 0.5em;}a{color:#38bdf8;}code{background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-family:monospace;color:#f472b6;}pre{background:#060911;padding:14px;border-radius:8px;overflow:auto;}pre code{background:none;color:#38bdf8;padding:0;}blockquote{border-left:3px solid #8b5cf6;margin:1em 0;padding:4px 14px;color:#cbd5e1;background:rgba(139,92,246,0.08);}table{border-collapse:collapse;width:100%;margin:1em 0;}th,td{border:1px solid rgba(148,163,184,0.25);padding:8px 10px;text-align:left;}th{background:rgba(6,182,212,0.12);}</style></head><body>${html}</body></html>`;
      Omni.activateOutput('out-markdown', 'GFM Markdown Live Preview (Clean HTML5)', () => html);
      Omni.showToast('Markdown rendered!', 'success');
    };

    // Case converters
    document.querySelectorAll('#case-converter-btns .chip-btn').forEach((btn) => {
      btn.onclick = () => {
        const s = uIn.value.trim();
        if (!s) return;
        const words = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim().split(/\s+/);
        const mode = btn.dataset.case;
        let out = s;
        if (mode === 'camel') out = words.map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
        else if (mode === 'pascal') out = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
        else if (mode === 'snake') out = words.map((w) => w.toLowerCase()).join('_');
        else if (mode === 'kebab') out = words.map((w) => w.toLowerCase()).join('-');
        else if (mode === 'const') out = words.map((w) => w.toUpperCase()).join('_');
        else if (mode === 'title') out = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        Omni.setCodeOutput(out, 'plain', `Case Converter (${mode})`);
      };
    });

    // --- Generators (UUID v4/v7/ULID/NanoID, Unbiased Password, Exact Fake Data) ---
    $('btn-uuid-gen').onclick = () => {
      const type = $('id-gen-type').value;
      const n = Math.min(100, Math.max(1, parseInt($('uuid-count').value, 10) || 1));
      const gen = type === 'uuid7' ? Omni.Crypto.generateUUIDv7 : type === 'ulid' ? Omni.Crypto.generateULID : type === 'nanoid' ? () => Omni.Crypto.generateNanoID(21) : Omni.Crypto.generateUUIDv4;
      const list = Array.from({ length: n }, gen).join('\n');
      Omni.setCodeOutput(list, 'plain', `Generated ${n} × ${type.toUpperCase()}`);
      Omni.showToast(`Generated ${n} IDs!`, 'success');
    };

    $('pass-length').oninput = () => { $('pass-len-val').textContent = $('pass-length').value; };
    $('btn-pass-gen').onclick = () => {
      try {
        const count = Math.min(50, Math.max(1, parseInt($('pass-bulk-count').value, 10) || 1));
        const opts = {
          length: +$('pass-length').value,
          upper: $('pass-upper').checked,
          lower: $('pass-lower').checked,
          numbers: $('pass-numbers').checked,
          symbols: $('pass-symbols').checked,
          excludeAmbiguous: $('pass-no-ambig').checked,
        };
        const items = Array.from({ length: count }, () => Omni.Crypto.generatePassword(opts));
        $('pass-entropy-badge').textContent = `${items[0].entropyBits} bits • ${items[0].strength}`;
        Omni.setCodeOutput(items.map((x) => x.password).join('\n'), 'plain', `Unbiased Password (${items[0].entropyBits} bits)`);
        Omni.showToast('Cryptographically unbiased password generated!', 'success');
      } catch (e) { Omni.showToast(e.message, 'error'); }
    };

    $('fake-data-count').oninput = () => { $('fake-data-count-val').textContent = $('fake-data-count').value; };
    $('btn-fake-data-gen').onclick = () => {
      const type = $('fake-data-type').value;
      const n = +$('fake-data-count').value;
      const out = Omni.Fake.generate(type, n);
      Omni.setCodeOutput(out, type === 'users-json' ? 'json' : 'plain', `Fake Data (${type}, n=${n})`);
      Omni.showToast('Mock data generated!', 'success');
    };

    // --- Timestamp & Auto-running Countdown ---
    const pad2 = (n) => String(n).padStart(2, '0');
    const toLocalInput = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    const now = new Date();
    $('date-input').value = toLocalInput(now);
    $('diff-date1').value = toLocalInput(now);
    $('diff-date2').value = toLocalInput(new Date(now.getTime() + 86400000));
    $('countdown-target').value = toLocalInput(new Date(now.getTime() + 7200000));

    function convertTs() {
      try {
        const res = Omni.Time.parseTimestamp($('ts-input').value);
        const zones = ['UTC', 'America/New_York', 'Europe/London', 'Europe/Paris', 'Europe/Bucharest', 'Asia/Tokyo'];
        const tzLines = zones.map((z) => {
          try { return `  ${z.padEnd(18)}: ${new Intl.DateTimeFormat('en-GB', { timeZone: z, dateStyle: 'medium', timeStyle: 'long' }).format(res.date)}`; }
          catch (_) { return ''; }
        }).filter(Boolean);
        const out = [
          `Detected Unit : ${res.detectedUnit}`,
          `ISO 8601      : ${res.date.toISOString()}`,
          `UTC String    : ${res.date.toUTCString()}`,
          `Local Time    : ${res.date.toString()}`,
          `Unix (s)      : ${res.seconds}`,
          `Unix (ms)     : ${res.ms}`,
          `\nWorld Timezones:\n${tzLines.join('\n')}`,
        ].join('\n');
        Omni.setCodeOutput(out, 'plain', 'Timestamp Conversion');
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    }
    $('btn-ts-now').onclick = () => { $('ts-input').value = Math.floor(Date.now() / 1000); convertTs(); };
    $('btn-ts-convert').onclick = convertTs;
    $('btn-date-convert').onclick = () => {
      const d = new Date($('date-input').value);
      if (isNaN(d.getTime())) return Omni.showToast('Invalid date!', 'error');
      Omni.setCodeOutput(`Unix Seconds      : ${Math.floor(d.getTime() / 1000)}\nUnix Milliseconds : ${d.getTime()}\nISO 8601          : ${d.toISOString()}`, 'plain', 'Date → Timestamp');
    };
    $('btn-ts-calc-diff').onclick = () => {
      const d1 = new Date($('diff-date1').value), d2 = new Date($('diff-date2').value);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return Omni.showToast('Invalid dates!', 'error');
      const r = Omni.Time.diffDates(d1, d2);
      Omni.setCodeOutput(`Direction : ${r.direction === 'forward' ? 'Date 2 is AFTER Date 1' : 'Date 2 is BEFORE Date 1'}\nBreakdown : ${r.days}d ${r.hours}h ${r.minutes}m ${r.seconds}s\n\nTotals:\n- Days    : ${r.totalDays}\n- Hours   : ${r.totalHours}\n- Minutes : ${r.totalMin}\n- Seconds : ${r.totalSec}`, 'plain', 'Date Difference');
    };

    // Live countdown starts immediately and ticks cleanly
    function tickCountdown() {
      const target = new Date($('countdown-target').value).getTime();
      const disp = $('countdown-display');
      if (isNaN(target)) { disp.textContent = 'Invalid'; return; }
      const diff = target - Date.now();
      if (diff <= 0) { disp.textContent = 'Expired!'; return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      disp.textContent = `${pad2(d)}d ${pad2(h)}h ${pad2(m)}m ${pad2(s)}s`;
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
    $('countdown-target').addEventListener('input', tickCountdown);

    // --- Cron Builder & Human Explainer ---
    function runCron() {
      const expr = $('cron-input').value.trim();
      try {
        const desc = Omni.Cron.describe(expr, Omni.state.lang);
        const runs = Omni.Cron.nextRuns(expr, 10);
        $('cron-human-card').textContent = desc;
        $('cron-runs-list').innerHTML = runs.map((r, i) =>
          `<div class="cron-run-row"><span>#${i + 1} ${r.toLocaleString()}</span><span class="muted">${r.toISOString()}</span></div>`
        ).join('');
        Omni.activateOutput('out-cron', `Cron Schedule (${expr})`, () => `${expr}\n${desc}\n\nNext 10 runs:\n${runs.map((r) => r.toISOString()).join('\n')}`);
      } catch (e) {
        $('cron-human-card').textContent = '❌ ' + e.message;
        $('cron-runs-list').innerHTML = '';
      }
    }
    $('cron-input').addEventListener('input', runCron);
    document.querySelectorAll('#cron-presets .chip-btn').forEach((b) => {
      b.onclick = () => { $('cron-input').value = b.dataset.cron; runCron(); };
    });
    Omni.onLangChange(() => { if (Omni.state.activeTab === 'utilities' && Omni.state.activeUtilSubtab === 'cron') runCron(); });

    // --- BigInt Number Base & 32-Bit Interactive Grid ---
    const nbFields = { 10: $('nb-dec'), 16: $('nb-hex'), 2: $('nb-bin'), 8: $('nb-oct'), 36: $('nb-b36') };
    let currentBig = 255n;

    function renderBitGrid(val) {
      const grid = $('nb-bit-grid');
      const bits = BigInt.asUintN(32, val).toString(2).padStart(32, '0');
      grid.innerHTML = '';
      for (let i = 0; i < 32; i++) {
        const bitPos = 31 - i;
        const isOn = bits[i] === '1';
        const btn = document.createElement('button');
        btn.className = 'bit-cell' + (isOn ? ' on' : '');
        btn.innerHTML = `<small>${bitPos}</small>${isOn ? '1' : '0'}`;
        btn.onclick = () => {
          currentBig = currentBig ^ (1n << BigInt(bitPos));
          syncBases(currentBig, null);
        };
        grid.appendChild(btn);
      }
    }

    function syncBases(val, skipBase) {
      currentBig = val;
      const f = Omni.BigBase.formatAll(val);
      if (skipBase !== 10) nbFields[10].value = f.dec;
      if (skipBase !== 16) nbFields[16].value = f.hex;
      if (skipBase !== 2) nbFields[2].value = f.bin;
      if (skipBase !== 8) nbFields[8].value = f.oct;
      if (skipBase !== 36) nbFields[36].value = f.base36;
      renderBitGrid(val);
      if (Omni.state.activeTab === 'utilities' && Omni.state.activeUtilSubtab === 'number-base') {
        Omni.setCodeOutput(`Decimal (10) : ${f.dec}\nHex (16)     : 0x${f.hex}\nBinary (2)   : 0b${f.bin}\nOctal (8)    : 0o${f.oct}\nBase 36      : ${f.base36}\n32-bit Uint  : ${f.bits32}`, 'plain', 'BigInt Base Conversion');
      }
    }

    Object.entries(nbFields).forEach(([base, el]) => {
      el.addEventListener('input', () => {
        const raw = el.value.trim();
        if (!raw || raw === '-') return;
        try { syncBases(Omni.BigBase.parse(raw, Number(base)), Number(base)); } catch (_) {}
      });
    });

    $('btn-nb-bitwise-calc').onclick = () => {
      try {
        const r = Omni.BigBase.bitwise($('nb-bit-a').value, $('nb-bit-b').value, $('nb-bit-op').value);
        syncBases(r.res, null);
        const out = `Bitwise ${$('nb-bit-op').value}\nA = ${r.a} (0x${r.a.toString(16).toUpperCase()})\n${$('nb-bit-op').value !== 'NOT' ? `B = ${r.b} (0x${r.b.toString(16).toUpperCase()})\n` : ''}────────────────────\nDecimal : ${r.formatted.dec}\nHex     : 0x${r.formatted.hex}\nBinary  : 0b${r.formatted.bin}\nOctal   : 0o${r.formatted.oct}`;
        Omni.setCodeOutput(out, 'plain', `Bitwise ${$('nb-bit-op').value} Result`);
      } catch (e) { Omni.showToast(Omni.t('errorPrefix') + e.message, 'error'); }
    };

    renderBitGrid(currentBig);
    Omni.onTabActivate.utilities = () => {
      if (Omni.state.activeUtilSubtab === 'cron') runCron();
      else Omni.activateOutput('out-code', 'Dev Utilities Output', () => $('code-output').value);
    };
  }

  // ===========================================================================
  // 18. SNIPPET VAULT 2.0 (Full Edit, Undo Delete, Safe Import, Send to Playground)
  // ===========================================================================
  function setupSnippets() {
    let snippets = [];
    let lastDeleted = null;

    function load() {
      try {
        const raw = localStorage.getItem(Omni.STORAGE.SNIPPETS);
        snippets = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(snippets)) snippets = [];
      } catch (_) { snippets = []; }
      // Sanitize every item (prevents P1 crash on missing category!)
      snippets = snippets.filter((s) => s && s.title && s.code).map((s) => ({
        id: String(s.id || Date.now() + Math.random()),
        title: String(s.title),
        category: String(s.category || 'General'),
        code: String(s.code),
        date: s.date || new Date().toLocaleDateString(),
      }));
      if (!snippets.length) {
        snippets = [
          { id: 's1', title: 'Fetch JSON with AbortController', category: 'JavaScript', code: `const ctrl = new AbortController();\nsetTimeout(() => ctrl.abort(), 5000);\nconst res = await fetch('https://api.example.com/data', { signal: ctrl.signal });\nconst data = await res.json();`, date: new Date().toLocaleDateString() },
          { id: 's2', title: 'Modern CSS Center Grid', category: 'CSS', code: `.center {\n  display: grid;\n  place-items: center;\n  min-height: 100dvh;\n}`, date: new Date().toLocaleDateString() },
        ];
        save();
      }
      render();
    }

    function save() {
      try { localStorage.setItem(Omni.STORAGE.SNIPPETS, JSON.stringify(snippets)); } catch (_) {}
    }

    function resetForm() {
      $('snippet-edit-id').value = '';
      $('snippet-title').value = '';
      $('snippet-code-input').value = '';
      $('btn-snippet-save').textContent = Omni.t('snipSave');
      $('btn-snippet-cancel-edit').classList.add('hidden');
    }

    function render() {
      const box = $('snippets-list-container');
      const q = $('snippet-search').value.toLowerCase();
      const cat = $('snippet-filter-cat').value;
      const list = snippets.filter((s) => (cat === 'All' || s.category === cat) && (s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)));
      box.innerHTML = '';
      if (!list.length) {
        box.innerHTML = '<div class="muted text-center mt-8">No snippets found.</div>';
        return;
      }
      list.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'snippet-card';
        card.innerHTML = `<div><div class="snippet-title">${Omni.escapeHTML(s.title)}</div><div class="snippet-meta"><span class="cat-badge">${Omni.escapeHTML(s.category)}</span><span>${Omni.escapeHTML(s.date)}</span></div></div><div class="btn-row"><button class="icon-btn-sm s-edit" title="Edit"><svg class="ic ic-sm"><use href="#ic-edit"/></svg></button><button class="icon-btn-sm s-copy" title="Copy"><svg class="ic ic-sm"><use href="#ic-copy"/></svg></button><button class="icon-btn-sm s-del" title="Delete"><svg class="ic ic-sm"><use href="#ic-trash"/></svg></button></div>`;
        card.onclick = (e) => {
          if (e.target.closest('button')) return;
          Omni.setCodeOutput(s.code, s.category.toLowerCase() === 'css' ? 'css' : s.category.toLowerCase() === 'html' ? 'html' : 'js', `Snippet: ${s.title}`);
        };
        card.querySelector('.s-edit').onclick = () => {
          $('snippet-edit-id').value = s.id;
          $('snippet-title').value = s.title;
          $('snippet-category').value = s.category;
          $('snippet-code-input').value = s.code;
          $('btn-snippet-save').textContent = Omni.t('snipUpdate');
          $('btn-snippet-cancel-edit').classList.remove('hidden');
        };
        card.querySelector('.s-copy').onclick = () => Omni.copyText(s.code);
        card.querySelector('.s-del').onclick = () => {
          lastDeleted = s;
          snippets = snippets.filter((x) => x.id !== s.id);
          save(); render();
          Omni.showToast('Snippet deleted! (Import/Ctrl+Z to restore or re-save)', 'info');
        };
        box.appendChild(card);
      });
    }

    $('btn-snippet-save').onclick = () => {
      const title = $('snippet-title').value.trim();
      const code = $('snippet-code-input').value;
      const category = $('snippet-category').value || 'General';
      if (!title || !code.trim()) return Omni.showToast('Title and code are required!', 'error');
      const editId = $('snippet-edit-id').value;
      if (editId) {
        const idx = snippets.findIndex((x) => x.id === editId);
        if (idx !== -1) snippets[idx] = { ...snippets[idx], title, category, code, date: new Date().toLocaleDateString() };
        Omni.showToast('Snippet updated!', 'success');
      } else {
        snippets.unshift({ id: Date.now().toString(36), title, category, code, date: new Date().toLocaleDateString() });
        Omni.showToast('Snippet saved!', 'success');
      }
      save(); render(); resetForm();
    };
    $('btn-snippet-cancel-edit').onclick = resetForm;
    $('snippet-search').oninput = render;
    $('snippet-filter-cat').onchange = render;

    $('btn-snippets-export').onclick = () => {
      Omni.downloadText(JSON.stringify(snippets, null, 2), 'omniconvert_pro_snippets.json', 'application/json');
      Omni.showToast('Snippets exported!', 'success');
    };
    $('btn-snippets-import-trigger').onclick = () => $('snippets-import-file').click();
    $('snippets-import-file').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const arr = JSON.parse(r.result);
          if (!Array.isArray(arr)) throw new Error('Expected JSON array');
          let added = 0;
          arr.forEach((s) => {
            if (s && s.title && s.code) {
              snippets.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: String(s.title), category: String(s.category || 'General'), code: String(s.code), date: s.date || new Date().toLocaleDateString() });
              added++;
            }
          });
          save(); render();
          Omni.showToast(`Imported ${added} snippets safely!`, 'success');
        } catch (err) { Omni.showToast(Omni.t('errorPrefix') + err.message, 'error'); }
      };
      r.readAsText(f);
      e.target.value = ''; // Allows re-importing same file!
    };

    load();
    Omni.onTabActivate.snippets = () => Omni.activateOutput('out-code', 'Snippet Viewer', () => $('code-output').value);
    Omni.registerSendTarget('snippets', 'Save as Snippet', 'Enregistrer en Snippet', (text) => {
      $('snippet-code-input').value = text;
      $('snippet-title').focus();
    });
  }

  // ===========================================================================
  // Global Copy Buttons inside Cards
  // ===========================================================================
  function setupInlineCopyButtons() {
    document.querySelectorAll('[data-copy-input]').forEach((btn) => {
      btn.onclick = () => {
        const el = $(btn.dataset.copyInput);
        if (el && el.value) Omni.copyText(el.value);
      };
    });
    document.querySelectorAll('[data-copy-el]').forEach((btn) => {
      btn.onclick = () => {
        const el = $(btn.dataset.copyEl);
        if (el && el.textContent && el.textContent !== '—') Omni.copyText(el.textContent);
      };
    });
  }

  Omni.initAllTools = function () {
    setupVisualTabs();
    setupPlayground();
    setupSerialize();
    setupCodegen();
    setupBase64();
    setupMinify();
    setupHttpStudio();
    setupQRStudio();
    setupCryptoVault();
    setupJwtStudio();
    setupColorsLab();
    setupGradientStudio();
    setupShadowAndGlass();
    setupSvgStudio();
    setupRegexLab();
    setupDiffStudio();
    setupUtilitiesHub();
    setupSnippets();
    setupInlineCopyButtons();
  };
})(typeof window !== 'undefined' ? window : globalThis);
