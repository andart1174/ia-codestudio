/**
 * HyperStudio 3D/4D v2.0 — Smart HTML-3D Code Engine 2.0
 * Features: Intelligent Autocomplete Popup for all 19 3D/4D Custom Tags,
 * Live Syntax & Attribute Validator with Line Numbers, Undo/Redo History Stack & Autosave
 * Implements Idea #11
 */
(function () {
    'use strict';

    const AUTOSAVE_KEY = 'hyper3d_editor_autosave_v2';
    const MAX_HISTORY = 60;

    const TAG_CATALOG = [
        { tag: 'model-3d', snippet: '<model-3d preset="cyber_drone" x="0" y="0.5" z="0" scale="1.2" color="#00f2fe" material="neon" animate="spin-y"></model-3d>', desc: 'Procedural 3D preset vehicle / robot / tower' },
        { tag: 'hyper-cube', snippet: '<hyper-cube shape="tesseract" size="2.2" color="#00f2fe" rot-xw="0.02" rot-yw="0.015" material="neon"></hyper-cube>', desc: '4D polytope (tesseract, 5cell, 16cell, 24cell, clifford)' },
        { tag: 'liquid-metal', snippet: '<liquid-metal radius="1.4" color="#00f2fe" speed="0.04" ripple="0.3" x="0" y="1" z="0"></liquid-metal>', desc: 'Dynamic PBR liquid chrome sphere' },
        { tag: 'forcefield', snippet: '<forcefield radius="2.2" color="#00ffcc" pulse="0.03" x="0" y="1" z="0"></forcefield>', desc: 'Sci-fi hexagonal plasma shield dome' },
        { tag: 'dna-helix', snippet: '<dna-helix radius="1.2" height="4.5" color1="#00f2fe" color2="#ff007f" speed="0.02"></dna-helix>', desc: '4D glowing double-helix strand' },
        { tag: 'spatial-audio', snippet: '<spatial-audio radius="2.0" color="#ffb703" speed="0.04"></spatial-audio>', desc: 'Concentric pulsing acoustic wave rings' },
        { tag: 'pbr-mesh', snippet: '<pbr-mesh shape="torus" material="liquid-gold" color="#ffb703" radius="1.6" tube="0.4"></pbr-mesh>', desc: 'PBR primitive (torus, sphere, box, cylinder, octahedron)' },
        { tag: 'exploded-mesh', snippet: '<exploded-mesh preset="cyber_drone" factor="0.8" trigger="hover" color="#00f2fe"></exploded-mesh>', desc: 'Exploded-view dismantle model (hover / click / always)' },
        { tag: 'text-3d', snippet: '<text-3d text="HYPER 3D" x="0" y="1.6" z="0" scale="1.0" color="#00ffcc" material="neon" animate="float"></text-3d>', desc: 'Glowing 3D typography billboard' },
        { tag: 'particle-text', snippet: '<particle-text text="CYBER 4D" color="#00f2fe" count="1200"></particle-text>', desc: 'Click-to-disperse particle typography' },
        { tag: 'image-3d', snippet: '<image-3d id="img_1" src="" x="0" y="1" z="0" width="3.5" height="2.5" frame="neon" color="#00f2fe" depth="0.4" scanner="true" back="hologram" animate="float"></image-3d>', desc: '3D holographic photo frame' },
        { tag: 'hotspot-pin', snippet: '<hotspot-pin x="1.5" y="1.5" z="0" title="AI Optics" price="$299" text="4K 120fps sensor" color="#00f2fe"></hotspot-pin>', desc: 'Interactive clickable 3D info pin' },
        { tag: 'cta-button', snippet: '<cta-button text="LAUNCH NOW 🚀" url="https://ia-codestudio.com" x="0" y="-1.8" z="0" color="#00ffcc"></cta-button>', desc: 'Clickable 3D Call-To-Action button' },
        { tag: 'particles', snippet: '<particles count="2500" color="#00f2fe" speed="0.01" radius="8"></particles>', desc: 'Volumetric 3D star/particle cloud' },
        { tag: 'particle-constellation', snippet: '<particle-constellation count="120" max-dist="2.2" color="#00f2fe"></particle-constellation>', desc: 'Connected neural particle web' },
        { tag: 'cyber-wave', snippet: '<cyber-wave width="12" height="12" color="#00ffcc" speed="0.03"></cyber-wave>', desc: 'Undulating neon wireframe ocean' },
        { tag: 'mesh-sphere', snippet: '<mesh-sphere radius="1.5" color="#ff007f" material="plasma" animate="pulse"></mesh-sphere>', desc: '3D sphere primitive' },
        { tag: 'mesh-torus', snippet: '<mesh-torus radius="1.8" tube="0.4" p="2" q="3" color="#7928ca" material="wire-glow" animate="spin"></mesh-torus>', desc: 'Parametric 3D torus / torus knot' },
        { tag: 'light-point', snippet: '<light-point x="4" y="5" z="4" color="#00f2fe" intensity="2.2"></light-point>', desc: 'Dynamic 3D point light source' }
    ];

    const VALID_TAGS = new Set(TAG_CATALOG.map(t => t.tag).concat(['mesh-box', 'mesh-cylinder', 'mesh-explode', 'script']));

    let undoStack = [];
    let redoStack = [];
    let lastRecordedValue = '';
    let acPopup = null;
    let acItems = [];
    let acSelIdx = 0;

    function getCore() { return window.__HyperStudioCore; }

    // ── Undo / Redo History Stack ─────────────────────────────────────────
    function pushHistory(val) {
        if (val === lastRecordedValue) return;
        undoStack.push(lastRecordedValue);
        if (undoStack.length > MAX_HISTORY) undoStack.shift();
        redoStack = [];
        lastRecordedValue = val;
        updateHistoryButtons();
    }

    function performUndo() {
        const ed = document.getElementById('code-editor');
        const c = getCore();
        if (!ed || undoStack.length === 0) return;
        redoStack.push(ed.value);
        const prev = undoStack.pop();
        lastRecordedValue = prev;
        ed.value = prev;
        if (c) { c.updateLineNumbers(); c.runCode(); }
        validateCodeLive(prev);
        updateHistoryButtons();
    }

    function performRedo() {
        const ed = document.getElementById('code-editor');
        const c = getCore();
        if (!ed || redoStack.length === 0) return;
        undoStack.push(ed.value);
        const next = redoStack.pop();
        lastRecordedValue = next;
        ed.value = next;
        if (c) { c.updateLineNumbers(); c.runCode(); }
        validateCodeLive(next);
        updateHistoryButtons();
    }

    function updateHistoryButtons() {
        const u = document.getElementById('btn-editor-undo');
        const r = document.getElementById('btn-editor-redo');
        if (u) u.disabled = undoStack.length === 0;
        if (r) r.disabled = redoStack.length === 0;
    }

    // ── Live Tag & Attribute Validator (Exact Line Numbers) ───────────────
    function validateCodeLive(code) {
        const statusEl = document.getElementById('editor-status');
        if (!statusEl) return;

        const lines = code.split('\n');
        const warnings = [];
        const openTagStack = [];

        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            const stripped = line.replace(/<!--[\s\S]*?-->/g, '');
            const tagRe = /<(\/)?([a-z][a-z0-9-]*)([^>]*)>/gi;
            let m;
            while ((m = tagRe.exec(stripped)) !== null) {
                const isClose = !!m[1];
                const name = m[2].toLowerCase();
                const attrs = m[3] || '';
                const selfClose = attrs.trim().endsWith('/');

                if (!VALID_TAGS.has(name)) {
                    warnings.push(`Ln ${lineNum}: Unknown tag <${name}>`);
                    continue;
                }
                if (!isClose && !selfClose) {
                    openTagStack.push({ name, lineNum });
                    // Validate numeric attributes
                    const numAttrRe = /\b(x|y|z|scale|radius|tube|width|height|depth|intensity|speed|count|size|factor)=["']([^"']+)["']/gi;
                    let am;
                    while ((am = numAttrRe.exec(attrs)) !== null) {
                        if (isNaN(parseFloat(am[2]))) {
                            warnings.push(`Ln ${lineNum}: Invalid number for ${am[1]}="${am[2]}"`);
                        }
                    }
                    // Validate hex color attributes
                    const colAttrRe = /\b(color|color1|color2)=["']([^"']+)["']/gi;
                    let cm;
                    while ((cm = colAttrRe.exec(attrs)) !== null) {
                        if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(cm[2])) {
                            warnings.push(`Ln ${lineNum}: Check color ${cm[1]}="${cm[2]}"`);
                        }
                    }
                } else if (isClose) {
                    const last = openTagStack.length ? openTagStack[openTagStack.length - 1] : null;
                    if (last && last.name === name) openTagStack.pop();
                }
            }
        });

        if (openTagStack.length > 0) {
            const unclosed = openTagStack[openTagStack.length - 1];
            warnings.push(`Ln ${unclosed.lineNum}: Unclosed <${unclosed.name}>`);
        }

        if (warnings.length > 0) {
            statusEl.innerHTML = `<span class="status-dot" style="background:#ffb703;"></span> <span title="${warnings.join(' | ')}">⚠️ ${warnings[0]}</span>`;
        } else {
            statusEl.innerHTML = `<span class="status-dot green"></span> <span>Live Engine Ready ✓</span>`;
        }
    }

    // ── Smart Autocomplete Popup ──────────────────────────────────────────
    function ensureAutocompleteUI() {
        const container = document.querySelector('.editor-container');
        if (!container || acPopup) return;
        container.style.position = 'relative';
        acPopup = document.createElement('div');
        acPopup.id = 'hyper-ac-popup';
        acPopup.className = 'hyper-ac-popup hidden';
        container.appendChild(acPopup);
    }

    function hideAC() {
        if (acPopup) acPopup.classList.add('hidden');
        acItems = [];
    }

    function showAC(filterText, ed) {
        ensureAutocompleteUI();
        if (!acPopup) return;
        const q = (filterText || '').toLowerCase();
        acItems = TAG_CATALOG.filter(t => t.tag.includes(q) || t.desc.toLowerCase().includes(q)).slice(0, 8);
        if (acItems.length === 0) { hideAC(); return; }
        acSelIdx = 0;

        acPopup.innerHTML = acItems.map((item, i) => `
            <div class="hyper-ac-item ${i === 0 ? 'selected' : ''}" data-idx="${i}">
                <span class="ac-tag">&lt;${item.tag}&gt;</span>
                <span class="ac-desc">${item.desc}</span>
            </div>
        `).join('');
        acPopup.classList.remove('hidden');

        acPopup.querySelectorAll('.hyper-ac-item').forEach(el => {
            el.addEventListener('mousedown', (ev) => {
                ev.preventDefault();
                insertACItem(parseInt(el.dataset.idx, 10), ed);
            });
        });
    }

    function insertACItem(idx, ed) {
        const item = acItems[idx];
        if (!item || !ed) return;
        const pos = ed.selectionStart;
        const before = ed.value.substring(0, pos);
        const after = ed.value.substring(ed.selectionEnd);
        const replaceStart = before.lastIndexOf('<');
        const startIdx = (replaceStart >= 0 && pos - replaceStart <= 24) ? replaceStart : pos;

        pushHistory(ed.value);
        ed.value = ed.value.substring(0, startIdx) + item.snippet + '\n' + after;
        const newPos = startIdx + item.snippet.length + 1;
        ed.selectionStart = ed.selectionEnd = newPos;
        hideAC();

        const c = getCore();
        if (c) { c.updateLineNumbers(); c.runCode(); }
        validateCodeLive(ed.value);
    }

    function initSmartEditor() {
        const ed = document.getElementById('code-editor');
        if (!ed) return;
        lastRecordedValue = ed.value;

        // Inject Undo / Redo / Restore Autosave toolbar buttons cleanly into editor header
        const paneHeader = document.querySelector('#pane-editor .pane-header > div:last-child');
        if (paneHeader && !document.getElementById('btn-editor-undo')) {
            const toolsWrap = document.createElement('div');
            toolsWrap.style.cssText = 'display:inline-flex;align-items:center;gap:4px;';
            toolsWrap.innerHTML = `
                <button type="button" id="btn-editor-undo" class="btn-icon-sm" title="Undo (Ctrl+Z)" disabled><i class="fa-solid fa-rotate-left"></i></button>
                <button type="button" id="btn-editor-redo" class="btn-icon-sm" title="Redo (Ctrl+Y)" disabled><i class="fa-solid fa-rotate-right"></i></button>
                <button type="button" id="btn-editor-ac" class="btn-icon-sm" title="3D Tag Autocomplete (Ctrl+Space)" style="color:#00f2fe;"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
                <button type="button" id="btn-editor-restore" class="btn-icon-sm" title="Restore Last Autosaved Code" style="display:none;color:#00ffcc;"><i class="fa-solid fa-clock-rotate-left"></i></button>
            `;
            paneHeader.insertBefore(toolsWrap, paneHeader.firstChild);

            toolsWrap.querySelector('#btn-editor-undo').addEventListener('click', performUndo);
            toolsWrap.querySelector('#btn-editor-redo').addEventListener('click', performRedo);
            toolsWrap.querySelector('#btn-editor-ac').addEventListener('click', () => { ed.focus(); showAC('', ed); });

            // Check if there's an autosaved draft different from default
            try {
                const savedDraft = localStorage.getItem(AUTOSAVE_KEY);
                const restoreBtn = toolsWrap.querySelector('#btn-editor-restore');
                if (savedDraft && savedDraft.trim().length > 10 && restoreBtn) {
                    restoreBtn.style.display = 'inline-flex';
                    restoreBtn.addEventListener('click', () => {
                        pushHistory(ed.value);
                        ed.value = savedDraft;
                        const c = getCore();
                        if (c) { c.updateLineNumbers(); c.runCode(); }
                        validateCodeLive(ed.value);
                        restoreBtn.style.display = 'none';
                    });
                }
            } catch (e) {}
        }

        let histTimer = null;
        ed.addEventListener('input', () => {
            clearTimeout(histTimer);
            histTimer = setTimeout(() => {
                pushHistory(ed.value);
                try { localStorage.setItem(AUTOSAVE_KEY, ed.value); } catch (e) {}
            }, 350);

            validateCodeLive(ed.value);

            // Detect `<tag...` typing for autocomplete
            const before = ed.value.substring(0, ed.selectionStart);
            const match = before.match(/<([a-z0-9-]*)$/i);
            if (match) showAC(match[1], ed);
            else hideAC();
        });

        ed.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
                if (undoStack.length > 0) { e.preventDefault(); performUndo(); return; }
            }
            if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
                if (redoStack.length > 0) { e.preventDefault(); performRedo(); return; }
            }
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                showAC('', ed);
                return;
            }
            if (acPopup && !acPopup.classList.contains('hidden') && acItems.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    acSelIdx = (acSelIdx + 1) % acItems.length;
                    acPopup.querySelectorAll('.hyper-ac-item').forEach((el, i) => el.classList.toggle('selected', i === acSelIdx));
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    acSelIdx = (acSelIdx - 1 + acItems.length) % acItems.length;
                    acPopup.querySelectorAll('.hyper-ac-item').forEach((el, i) => el.classList.toggle('selected', i === acSelIdx));
                } else if (e.key === 'Enter' || e.key === 'Tab') {
                    e.preventDefault();
                    insertACItem(acSelIdx, ed);
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    hideAC();
                }
            }
        });

        ed.addEventListener('blur', () => setTimeout(hideAC, 180));
        validateCodeLive(ed.value);
    }

    window.__HyperSmartEditorV2 = { undo: performUndo, redo: performRedo, validate: validateCodeLive, catalog: TAG_CATALOG };
    window.addEventListener('DOMContentLoaded', () => setTimeout(initSmartEditor, 120));
})();
