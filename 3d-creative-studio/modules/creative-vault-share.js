/* ============================================================================
   3D CREATIVE STUDIO v2.0 — MODULE 5: PRESET VAULT, URL SHARE & QR (100% FREE!)
   Idea #11: Save/Load/Delete Presets in localStorage + JSON Backup +
   Instant #cfg= URL Share & Client-Side QRious Scannable QR Modal
   ============================================================================ */
(function () {
  'use strict';

  const VAULT_KEY = 'creative_studio_vault_v2';

  function loadVault() {
    try {
      const list = JSON.parse(localStorage.getItem(VAULT_KEY) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }

  function saveVault(list) {
    try { localStorage.setItem(VAULT_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function renderVault() {
    const core = window.__CreativeStudioCore;
    const container = document.getElementById('creative-vault-list');
    if (!container || !core) return;
    const list = loadVault();
    container.textContent = '';

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'vault-empty';
      empty.textContent = core.getLang() === 'fr' ? 'Aucun preset sauvegardé.' : 'No saved presets yet.';
      container.appendChild(empty);
      return;
    }

    list.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'vault-item';

      const swatch = document.createElement('span');
      swatch.className = 'vault-swatch';
      swatch.style.background = `linear-gradient(135deg, ${item.state?.cPrim || '#00f0ff'}, ${item.state?.cSec || '#ff007f'})`;

      const title = document.createElement('span');
      title.className = 'vault-name';
      title.textContent = item.name;

      const btnLoad = document.createElement('button');
      btnLoad.type = 'button';
      btnLoad.className = 'vault-btn';
      btnLoad.textContent = '▶';
      btnLoad.title = 'Load Preset';
      btnLoad.addEventListener('click', () => {
        core.restoreState(item.state);
        core.showToast(`Loaded "${item.name}"`, 'success');
      });

      const btnDel = document.createElement('button');
      btnDel.type = 'button';
      btnDel.className = 'vault-btn del';
      btnDel.textContent = '🗑';
      btnDel.title = 'Delete Preset';
      btnDel.addEventListener('click', () => {
        const next = loadVault();
        next.splice(idx, 1);
        saveVault(next);
        renderVault();
      });

      row.append(swatch, title, btnLoad, btnDel);
      container.appendChild(row);
    });
  }

  function buildShareUrl() {
    const core = window.__CreativeStudioCore;
    if (!core) return window.location.href;
    const st = core.getState();
    const json = JSON.stringify(st);
    const bytes = new TextEncoder().encode(json);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    const b64 = btoa(bin);
    return window.location.href.split('#')[0] + '#cfg=' + b64;
  }

  function restoreFromUrlHash() {
    const core = window.__CreativeStudioCore;
    if (!core || !window.location.hash.includes('#cfg=')) return;
    try {
      const b64 = window.location.hash.split('#cfg=')[1];
      const bin = atob(b64);
      const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
      const st = JSON.parse(new TextDecoder().decode(bytes));
      core.restoreState(st);
      core.showToast('✨ Shared 3D component config loaded!', 'success');
    } catch (e) {
      console.warn('Invalid #cfg hash', e);
    }
  }

  function drawFallbackMatrixQR(canvas, text, color) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, size, size);
    const cells = 21;
    const cell = Math.floor((size - 20) / cells);
    const off = Math.floor((size - cell * cells) / 2);
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    ctx.fillStyle = color || '#00f0ff';
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        const finder = (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);
        const on = finder
          ? (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
             (r % (cells - 7) === 0 || c % (cells - 7) === 0))
          : (Math.abs(Math.imul(h ^ (r * 31 + c * 17), 2654435761)) % 3 === 0);
        if (on) ctx.fillRect(off + c * cell, off + r * cell, cell - 1, cell - 1);
      }
    }
  }

  function openShareModal() {
    const core = window.__CreativeStudioCore;
    const modal = document.getElementById('modal-creative-share');
    if (!modal || !core) return;
    const url = buildShareUrl();
    const inp = document.getElementById('creative-share-url');
    if (inp) inp.value = url;

    const canvas = document.getElementById('creative-qr-canvas');
    const c1 = core.els.colorPrimary?.value || '#00f0ff';
    if (canvas) {
      if (typeof window.QRious === 'function') {
        try {
          new window.QRious({ element: canvas, value: url, size: 200, background: '#030712', foreground: c1, level: 'M' });
        } catch (e) {
          drawFallbackMatrixQR(canvas, url, c1);
        }
      } else {
        drawFallbackMatrixQR(canvas, url, c1);
      }
    }
    modal.style.display = 'flex';
  }

  function bindVaultAndShare() {
    const core = window.__CreativeStudioCore;
    if (!core) return;

    const btnSave = document.getElementById('btn-creative-vault-save');
    const inpName = document.getElementById('creative-vault-name');
    const btnExpJson = document.getElementById('btn-creative-vault-export');
    const btnImpJson = document.getElementById('btn-creative-vault-import');
    const fileJson = document.getElementById('creative-vault-file');

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const key = core.els.selectComponent?.value || 'asset';
        const name = (inpName?.value || '').trim() || `${key}-${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
        const list = loadVault();
        list.unshift({ id: 'cs-' + Date.now(), name, state: core.getState() });
        saveVault(list.slice(0, 24));
        if (inpName) inpName.value = '';
        renderVault();
        core.showToast(`Saved Preset "${name}"!`, 'success');
      });
    }

    if (btnExpJson) {
      btnExpJson.addEventListener('click', () => {
        const data = JSON.stringify({ app: '3DCreativeStudio', version: '2.0', presets: loadVault() }, null, 2);
        core.safeDownloadBlob(new Blob([data], { type: 'application/json' }), '3d-creative-studio-vault.json');
      });
    }
    if (btnImpJson && fileJson) btnImpJson.addEventListener('click', () => fileJson.click());
    if (fileJson) {
      fileJson.addEventListener('change', (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = (ev) => {
          try {
            const parsed = JSON.parse(ev.target.result);
            const arr = Array.isArray(parsed.presets) ? parsed.presets : (Array.isArray(parsed) ? parsed : []);
            if (arr.length === 0) throw new Error('Empty');
            saveVault([...arr, ...loadVault()].slice(0, 30));
            renderVault();
            core.showToast(`Imported ${arr.length} preset(s)!`, 'success');
          } catch (err) {
            core.showToast('Invalid JSON Vault file', 'error');
          }
        };
        r.readAsText(f);
      });
    }

    const btnShareOpen = document.getElementById('btn-share-creative');
    const modal = document.getElementById('modal-creative-share');
    const btnClose = document.getElementById('btn-creative-share-close');
    const btnCopyUrl = document.getElementById('btn-creative-url-copy');
    const btnDlQr = document.getElementById('btn-creative-qr-dl');

    if (btnShareOpen) btnShareOpen.addEventListener('click', openShareModal);
    if (btnClose && modal) btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    if (btnCopyUrl) {
      btnCopyUrl.addEventListener('click', () => {
        const val = document.getElementById('creative-share-url')?.value || '';
        navigator.clipboard.writeText(val).then(() => core.showToast('Share URL copied!', 'success'));
      });
    }
    if (btnDlQr) {
      btnDlQr.addEventListener('click', () => {
        const canvas = document.getElementById('creative-qr-canvas');
        if (!canvas) return;
        canvas.toBlob(blob => { if (blob) core.safeDownloadBlob(blob, 'creative-studio-qr.png'); }, 'image/png');
      });
    }

    renderVault();
    restoreFromUrlHash();
  }

  const prevLang = window.__CreativeStudioHooks.onLangChanged;
  window.__CreativeStudioHooks.onLangChanged = function (lang) {
    if (typeof prevLang === 'function') prevLang(lang);
    renderVault();
  };

  const prevReady = window.__CreativeStudioHooks.onReady;
  window.__CreativeStudioHooks.onReady = function () {
    if (typeof prevReady === 'function') prevReady();
    bindVaultAndShare();
  };

  window.__CreativeVaultV2 = { openShareModal, buildShareUrl };
})();
