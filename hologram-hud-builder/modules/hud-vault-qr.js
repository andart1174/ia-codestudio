/* ============================================================================
   QUANTUM 3D HUD BUILDER v2.0 — MODULE 4: PRESET VAULT, UNDO/REDO & SHARE QR
   Idea #11 (100% Free: Named Preset Vault + JSON Backup + Undo/Redo + Local QR)
   ============================================================================ */
(function () {
    'use strict';

    window.__QuantumHUDHooks = window.__QuantumHUDHooks || {};

    const VAULT_KEY = 'quantum_hud_vault_v2';
    const MAX_HISTORY = 30;
    let historyStack = [];
    let historyIndex = -1;
    let isRestoringHistory = false;
    let historyDebounce = null;

    // ------------------------------------------------------------------------
    // 1. UNDO / REDO SNAPSHOT ENGINE
    // ------------------------------------------------------------------------
    function updateUndoRedoButtons() {
        const uBtn = document.getElementById('btn-hud-undo');
        const rBtn = document.getElementById('btn-hud-redo');
        if (uBtn) uBtn.disabled = historyIndex <= 0;
        if (rBtn) rBtn.disabled = historyIndex >= historyStack.length - 1;
    }

    function pushHistory() {
        const core = window.__QuantumHUDCore;
        if (!core || isRestoringHistory || typeof core.getSnapshotState !== 'function') return;
        const snap = JSON.stringify(core.getSnapshotState());
        if (historyIndex >= 0 && historyStack[historyIndex] === snap) return;
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(snap);
        if (historyStack.length > MAX_HISTORY) historyStack.shift();
        historyIndex = historyStack.length - 1;
        updateUndoRedoButtons();
    }

    function scheduleHistoryPush() {
        if (isRestoringHistory) return;
        clearTimeout(historyDebounce);
        historyDebounce = setTimeout(pushHistory, 220);
    }

    function undo() {
        const core = window.__QuantumHUDCore;
        if (!core || historyIndex <= 0) return;
        historyIndex--;
        isRestoringHistory = true;
        try {
            core.restoreSnapshotState(JSON.parse(historyStack[historyIndex]));
            core.playSound('click');
            core.logTerminal(`Undo (${historyIndex + 1}/${historyStack.length})`);
        } finally {
            isRestoringHistory = false;
            updateUndoRedoButtons();
        }
    }

    function redo() {
        const core = window.__QuantumHUDCore;
        if (!core || historyIndex >= historyStack.length - 1) return;
        historyIndex++;
        isRestoringHistory = true;
        try {
            core.restoreSnapshotState(JSON.parse(historyStack[historyIndex]));
            core.playSound('click');
            core.logTerminal(`Redo (${historyIndex + 1}/${historyStack.length})`);
        } finally {
            isRestoringHistory = false;
            updateUndoRedoButtons();
        }
    }

    // ------------------------------------------------------------------------
    // 2. PRESET VAULT (Save / Load / Delete / JSON Export & Import)
    // ------------------------------------------------------------------------
    function loadVaultList() {
        try {
            const raw = localStorage.getItem(VAULT_KEY);
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function saveVaultList(list) {
        try { localStorage.setItem(VAULT_KEY, JSON.stringify(list)); } catch (e) {}
    }

    function renderVaultList() {
        const container = document.getElementById('vault-list');
        if (!container) return;
        const list = loadVaultList();
        container.textContent = '';

        if (list.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'vault-empty';
            empty.textContent = 'No saved HUD presets yet.';
            container.appendChild(empty);
            return;
        }

        const core = window.__QuantumHUDCore;
        list.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = 'vault-item';

            const dot = document.createElement('span');
            dot.className = 'vault-dot';
            dot.style.background = item.state?.customPrimaryHex || '#00f3ff';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'vault-name';
            nameSpan.textContent = item.name;
            nameSpan.title = `${item.state?.preset || 'reactor'} — ${item.createdAt || ''}`;

            const btnLoad = document.createElement('button');
            btnLoad.className = 'vault-act-btn';
            btnLoad.title = 'Load Preset';
            btnLoad.innerHTML = '<i class="fa-solid fa-play"></i>';
            btnLoad.addEventListener('click', () => {
                if (!core) return;
                core.restoreSnapshotState(item.state);
                pushHistory();
                core.playSound('confirm');
                core.logTerminal(`Loaded Vault Preset: "${item.name}"`);
            });

            const btnDel = document.createElement('button');
            btnDel.className = 'vault-act-btn del';
            btnDel.title = 'Delete Preset';
            btnDel.innerHTML = '<i class="fa-solid fa-trash"></i>';
            btnDel.addEventListener('click', () => {
                const updated = loadVaultList();
                updated.splice(idx, 1);
                saveVaultList(updated);
                renderVaultList();
                core?.playSound('click');
            });

            row.append(dot, nameSpan, btnLoad, btnDel);
            container.appendChild(row);
        });
    }

    function saveCurrentPreset() {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const inp = document.getElementById('vault-preset-name');
        const name = (inp?.value || '').trim() || `HUD-${core.getActivePreset().toUpperCase()}-${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
        const list = loadVaultList();
        list.unshift({
            id: 'v-' + Date.now(),
            name,
            createdAt: new Date().toISOString().slice(0, 10),
            state: core.getSnapshotState()
        });
        saveVaultList(list.slice(0, 24));
        if (inp) inp.value = '';
        renderVaultList();
        core.playSound('confirm');
        core.logTerminal(`Saved Preset to Vault: "${name}"`);
    }

    function exportVaultJSON() {
        const core = window.__QuantumHUDCore;
        const list = loadVaultList();
        const payload = JSON.stringify({ app: 'Quantum3DHUDBuilder', version: '2.0', presets: list }, null, 2);
        core?.safeDownloadBlob(new Blob([payload], { type: 'application/json' }), 'quantum-hud-vault.json');
        core?.playSound('confirm');
    }

    function importVaultJSON(file) {
        const core = window.__QuantumHUDCore;
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const parsed = JSON.parse(ev.target.result);
                const incoming = Array.isArray(parsed.presets) ? parsed.presets : (Array.isArray(parsed) ? parsed : []);
                if (incoming.length === 0) throw new Error('Empty JSON vault');
                const merged = [...incoming, ...loadVaultList()].slice(0, 30);
                saveVaultList(merged);
                renderVaultList();
                core?.playSound('confirm');
                core?.logTerminal(`Imported ${incoming.length} preset(s) into Vault.`);
            } catch (err) {
                core?.logTerminal('ERROR: Invalid Vault JSON file.');
            }
        };
        reader.readAsText(file);
    }

    // ------------------------------------------------------------------------
    // 3. SHARE HUD URL + LOCAL CLIENT-SIDE QR CODE MODAL (100% Free!)
    // ------------------------------------------------------------------------
    function drawFallbackMatrixQR(canvas, text, colorHex) {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        ctx.fillStyle = '#050814';
        ctx.fillRect(0, 0, size, size);
        const cells = 21;
        const cell = Math.floor((size - 24) / cells);
        const off = Math.floor((size - cell * cells) / 2);
        let hash = 2166136261;
        for (let i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        ctx.fillStyle = colorHex || '#00f3ff';
        for (let r = 0; r < cells; r++) {
            for (let c = 0; c < cells; c++) {
                const inFinder = (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);
                let on = false;
                if (inFinder) {
                    const lr = r < 7 ? r : r - (cells - 7);
                    const lc = c < 7 ? c : c - (cells - 7);
                    on = lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
                } else {
                    const bit = Math.abs(Math.imul(hash ^ (r * 31 + c * 17), 2654435761)) % 3;
                    on = bit === 0;
                }
                if (on) ctx.fillRect(off + c * cell, off + r * cell, cell - 1, cell - 1);
            }
        }
    }

    function openShareModal(url) {
        const modal = document.getElementById('modal-share-qr');
        if (!modal) return;
        const core = window.__QuantumHUDCore;
        const shareUrl = url || (core?.buildShareHUDUrl ? core.buildShareHUDUrl() : window.location.href);
        const inp = document.getElementById('share-url-input');
        if (inp) inp.value = shareUrl;

        const qrCanvas = document.getElementById('hud-share-qr-canvas');
        const priHex = core ? core.getPrimaryColorInfo().hex : '#00f3ff';
        if (qrCanvas) {
            if (typeof window.QRious === 'function') {
                try {
                    new window.QRious({
                        element: qrCanvas,
                        value: shareUrl,
                        size: 210,
                        background: '#050816',
                        foreground: priHex,
                        level: 'M'
                    });
                } catch (e) {
                    drawFallbackMatrixQR(qrCanvas, shareUrl, priHex);
                }
            } else {
                drawFallbackMatrixQR(qrCanvas, shareUrl, priHex);
            }
        }
        modal.style.display = 'flex';
        core?.playSound('confirm');
    }

    // ------------------------------------------------------------------------
    // 4. BIND VAULT, UNDO/REDO & SHARE QR UI
    // ------------------------------------------------------------------------
    function bindVaultAndShareUI() {
        const core = window.__QuantumHUDCore;
        if (!core) return;

        // Seed initial history snapshot
        setTimeout(pushHistory, 350);

        // Listen to key interactive controls to push Undo snapshots cleanly
        ['preset-select', 'speed-slider', 'scanline-slider', 'glitch-slider', 'exploded-slider', 'material-mode',
         'layer-clock', 'layer-globe', 'layer-visualizer', 'layer-grid', 'layer-radar', 'layer-wave', 'layer-bloom', 'toggle-nebula']
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', scheduleHistoryPush);
            });
        document.querySelectorAll('.color-btn, .color-btn-sec, .cinema-theme-btn').forEach(b => {
            b.addEventListener('click', scheduleHistoryPush);
        });

        const btnUndo = document.getElementById('btn-hud-undo');
        const btnRedo = document.getElementById('btn-hud-redo');
        if (btnUndo) btnUndo.addEventListener('click', undo);
        if (btnRedo) btnRedo.addEventListener('click', redo);

        window.addEventListener('keydown', (e) => {
            if (!(e.ctrlKey || e.metaKey)) return;
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
            else if (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
        });

        // Vault controls
        const btnSave = document.getElementById('btn-vault-save');
        const btnExpJson = document.getElementById('btn-vault-export-json');
        const btnImpJson = document.getElementById('btn-vault-import-json');
        const fileVault = document.getElementById('vault-import-input');
        if (btnSave) btnSave.addEventListener('click', saveCurrentPreset);
        if (btnExpJson) btnExpJson.addEventListener('click', exportVaultJSON);
        if (btnImpJson && fileVault) btnImpJson.addEventListener('click', () => fileVault.click());
        if (fileVault) fileVault.addEventListener('change', (e) => { if (e.target.files?.[0]) importVaultJSON(e.target.files[0]); });
        renderVaultList();

        // Share QR Modal buttons
        const shareModal = document.getElementById('modal-share-qr');
        const btnShareClose = document.getElementById('btn-share-qr-close');
        const btnShareCopy = document.getElementById('btn-share-url-copy');
        const btnShareDlQr = document.getElementById('btn-share-qr-download');
        if (btnShareClose && shareModal) btnShareClose.addEventListener('click', () => { shareModal.style.display = 'none'; });
        if (shareModal) shareModal.addEventListener('click', (e) => { if (e.target === shareModal) shareModal.style.display = 'none'; });
        if (btnShareCopy) {
            btnShareCopy.addEventListener('click', () => {
                const inp = document.getElementById('share-url-input');
                if (!inp) return;
                navigator.clipboard.writeText(inp.value).then(() => {
                    const orig = btnShareCopy.innerHTML;
                    btnShareCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    core.playSound('confirm');
                    setTimeout(() => { btnShareCopy.innerHTML = orig; }, 1600);
                });
            });
        }
        if (btnShareDlQr) {
            btnShareDlQr.addEventListener('click', () => {
                const qr = document.getElementById('hud-share-qr-canvas');
                if (!qr) return;
                qr.toBlob((blob) => {
                    if (blob) core.safeDownloadBlob(blob, `quantum-hud-${core.getActivePreset()}-qr.png`);
                }, 'image/png');
            });
        }
    }

    const prevReady = window.__QuantumHUDHooks.onReady;
    window.__QuantumHUDHooks.onReady = function () {
        if (typeof prevReady === 'function') prevReady();
        bindVaultAndShareUI();
    };

    window.__QuantumVaultV2 = {
        openShareModal,
        saveCurrentPreset,
        undo,
        redo,
        pushHistory
    };
})();
