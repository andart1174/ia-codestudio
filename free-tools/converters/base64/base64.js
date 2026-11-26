// Base64 Toolkit Pro v2.0 — UTF-8, URL-Safe, CSS url(), Zero XSS, Reverse Base64 -> Image

function encodeUtf8Base64(str, urlSafe) {
  const bytes = new TextEncoder().encode(String(str || ''));
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  let b64 = btoa(bin);
  if (urlSafe) {
    b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }
  return b64;
}

function normalizeBase64(input) {
  let clean = String(input || '').trim().replace(/\s+/g, '');
  clean = clean.replace(/-/g, '+').replace(/_/g, '/');
  while (clean.length % 4 !== 0) clean += '=';
  return clean;
}

function decodeUtf8Base64(input) {
  const clean = normalizeBase64(input);
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

function base64ToUint8Array(rawB64) {
  const clean = normalizeBase64(rawB64);
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function detectBase64Image(input) {
  const trimmed = String(input || '').trim();
  const dataUriMatch = trimmed.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=_\-\s]+)$/i);
  if (dataUriMatch) {
    const mime = dataUriMatch[1].toLowerCase();
    const raw = dataUriMatch[2].replace(/\s+/g, '');
    return { mime, raw, dataUri: `data:${mime};base64,${normalizeBase64(raw)}` };
  }

  const compact = trimmed.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/=_-]{16,}$/.test(compact)) return null;

  const sigs = [
    { prefix: 'iVBORw0KGgo', mime: 'image/png' },
    { prefix: '/9j/', mime: 'image/jpeg' },
    { prefix: 'R0lGOD', mime: 'image/gif' },
    { prefix: 'UklGR', mime: 'image/webp' },
    { prefix: 'PHN2Zy', mime: 'image/svg+xml' },
    { prefix: 'PD94bW', mime: 'image/svg+xml' }
  ];
  for (const s of sigs) {
    if (compact.startsWith(s.prefix)) {
      const norm = normalizeBase64(compact);
      return { mime: s.mime, raw: norm, dataUri: `data:${s.mime};base64,${norm}` };
    }
  }
  return null;
}

function formatBytes(bytes) {
  if (!bytes || bytes < 1024) return `${bytes || 0} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

if (typeof window !== 'undefined') {
  window._b64Toolkit = { encodeUtf8Base64, decodeUtf8Base64, normalizeBase64, detectBase64Image };
}

document.addEventListener('DOMContentLoaded', () => {
  const inpText = document.getElementById('inp-text');
  const chkUrlSafe = document.getElementById('chk-urlsafe');
  const btnEncode = document.getElementById('btn-encode');
  const btnDecode = document.getElementById('btn-decode');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container-box');
  const outputCode = document.getElementById('output-code');

  const statIn = document.getElementById('b64-stat-in');
  const statOut = document.getElementById('b64-stat-out');
  const statMime = document.getElementById('b64-stat-mime');

  const btnCopyRaw = document.getElementById('btn-copy-raw');
  const btnCopyCss = document.getElementById('btn-copy-css');
  const btnDownloadMedia = document.getElementById('btn-download-media');
  const btnDownloadTxt = document.getElementById('btn-download-txt');

  let activeMedia = null; // { mime, raw, dataUri, filename }

  function updateStats(inBytes, outBytes, mime) {
    if (statIn) statIn.textContent = `In: ${formatBytes(inBytes)}`;
    if (statOut) statOut.textContent = `Out: ${formatBytes(outBytes)}`;
    if (statMime) {
      if (mime) {
        statMime.textContent = mime;
        statMime.style.display = '';
      } else {
        statMime.style.display = 'none';
      }
    }
  }

  function renderTextPreview(label, text) {
    previewContainer.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;gap:8px;justify-content:center;';
    const badge = document.createElement('div');
    badge.style.cssText = 'font-size:0.75rem;color:#38bdf8;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.6px;';
    badge.textContent = label;
    const pre = document.createElement('pre');
    pre.style.cssText = 'margin:0;color:#e2e8f0;font-family:var(--font-mono);font-size:0.84rem;white-space:pre-wrap;word-break:break-all;max-height:150px;overflow:auto;background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.07);';
    pre.textContent = text.length > 600 ? text.slice(0, 600) + '…' : text;
    wrapper.appendChild(badge);
    wrapper.appendChild(pre);
    previewContainer.appendChild(wrapper);
  }

  function renderImagePreview(media) {
    previewContainer.innerHTML = '';
    activeMedia = media;
    if (btnDownloadMedia) btnDownloadMedia.style.display = '';

    let safeSrc = media.dataUri;
    if (media.mime === 'image/svg+xml') {
      try {
        const rawSvg = decodeUtf8Base64(media.raw);
        const sanitized = window.HubUtils.sanitizeSvg(rawSvg);
        if (!sanitized) throw new Error('Invalid SVG');
        safeSrc = `data:image/svg+xml;base64,${encodeUtf8Base64(sanitized, false)}`;
        activeMedia.dataUri = safeSrc;
      } catch (e) {
        renderTextPreview('⚠️ SVG', 'Invalid or unsafe SVG payload.');
        return;
      }
    }

    const img = document.createElement('img');
    img.src = safeSrc;
    img.alt = 'Base64 Decoded Preview';
    img.onerror = () => {
      renderTextPreview('⚠️ Media', currentLang === 'en' ? 'Base64 image could not be rendered.' : 'Image Base64 impossible à afficher.');
    };
    previewContainer.appendChild(img);
  }

  function renderFileInfo(name, mime, size) {
    previewContainer.innerHTML = '';
    const box = document.createElement('div');
    box.style.cssText = 'text-align:center;color:#94a3b8;font-size:0.9rem;display:flex;flex-direction:column;align-items:center;gap:6px;';
    const icon = document.createElement('span');
    icon.style.fontSize = '2.2rem';
    icon.textContent = '📄';
    const title = document.createElement('strong');
    title.style.color = '#fff';
    title.textContent = name || 'File';
    const meta = document.createElement('span');
    meta.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;';
    meta.textContent = `${mime || 'application/octet-stream'} • ${formatBytes(size)}`;
    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(meta);
    previewContainer.appendChild(box);
  }

  // Encode text -> pure Base64
  function handleEncode() {
    const val = inpText.value;
    if (!val) {
      window.HubUtils.showToast(currentLang === 'en' ? 'Enter text to encode first.' : 'Saisissez du texte à encoder.', 'warn');
      return;
    }
    try {
      const encoded = encodeUtf8Base64(val, chkUrlSafe.checked);
      activeMedia = null;
      if (btnDownloadMedia) btnDownloadMedia.style.display = 'none';
      outputCode.value = encoded;
      updateStats(new TextEncoder().encode(val).length, encoded.length, chkUrlSafe.checked ? 'text/base64url' : 'text/base64');
      renderTextPreview(chkUrlSafe.checked ? 'URL-Safe Base64' : 'UTF-8 Base64', encoded);
    } catch (e) {
      window.HubUtils.showToast(currentLang === 'en' ? 'Encoding failed.' : 'Erreur d\'encodage.', 'error');
    }
  }

  // Decode Base64 -> UTF-8 text OR Reverse Image Preview
  function handleDecode() {
    const val = (inpText.value || '').trim();
    if (!val) {
      window.HubUtils.showToast(currentLang === 'en' ? 'Paste Base64 or Data URI first.' : 'Collez un Base64 ou Data URI.', 'warn');
      return;
    }

    const detectedImg = detectBase64Image(val);
    if (detectedImg) {
      const ext = detectedImg.mime.split('/')[1].replace('+xml', '');
      detectedImg.filename = `decoded-image.${ext}`;
      outputCode.value = detectedImg.dataUri;
      let rawBytes = 0;
      try { rawBytes = base64ToUint8Array(detectedImg.raw).length; } catch (e) {}
      updateStats(val.length, rawBytes, detectedImg.mime);
      renderImagePreview(detectedImg);
      window.HubUtils.showToast(currentLang === 'en' ? `🖼️ Detected ${detectedImg.mime}!` : `🖼️ Image détectée (${detectedImg.mime}) !`, 'success');
      return;
    }

    try {
      const decoded = decodeUtf8Base64(val);
      activeMedia = null;
      if (btnDownloadMedia) btnDownloadMedia.style.display = 'none';
      outputCode.value = decoded;
      updateStats(val.length, new TextEncoder().encode(decoded).length, 'text/plain');
      renderTextPreview(currentLang === 'en' ? 'Decoded UTF-8 Text' : 'Texte UTF-8 Décodé', decoded);
    } catch (e) {
      window.HubUtils.showToast(currentLang === 'en' ? 'Invalid Base64 string.' : 'Chaîne Base64 invalide.', 'error');
    }
  }

  function handleFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      window.HubUtils.showToast(currentLang === 'en' ? 'File exceeds 8 MB client-side limit.' : 'Le fichier dépasse la limite de 8 Mo.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = String(ev.target.result || '');
      const commaIdx = dataUrl.indexOf(',');
      const raw = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
      outputCode.value = dataUrl;
      updateStats(file.size, dataUrl.length, file.type || 'application/octet-stream');

      if ((file.type || '').startsWith('image/')) {
        renderImagePreview({ mime: file.type, raw, dataUri: dataUrl, filename: file.name });
      } else {
        activeMedia = { mime: file.type || 'application/octet-stream', raw, dataUri: dataUrl, filename: file.name };
        if (btnDownloadMedia) btnDownloadMedia.style.display = '';
        renderFileInfo(file.name, file.type, file.size);
      }
      window.HubUtils.showToast(currentLang === 'en' ? `✅ Converted ${file.name}` : `✅ ${file.name} converti`, 'success');
    };
    reader.readAsDataURL(file);
  }

  btnEncode.addEventListener('click', handleEncode);
  btnDecode.addEventListener('click', handleDecode);
  chkUrlSafe.addEventListener('change', () => {
    if (inpText.value && !activeMedia && outputCode.value) handleEncode();
  });

  // Drop zone
  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  btnCopyRaw.addEventListener('click', () => {
    if (!outputCode.value) return;
    const msg = (translations[currentLang] && translations[currentLang].success_copy) || 'Copied!';
    window.HubUtils.copyText(outputCode.value, msg);
  });

  btnCopyCss.addEventListener('click', () => {
    const val = (outputCode.value || '').trim();
    if (!val) return;
    const uri = val.startsWith('data:') ? val : `data:application/octet-stream;base64,${val}`;
    const css = `background-image: url("${uri}");`;
    window.HubUtils.copyText(css, currentLang === 'en' ? '🎨 CSS url() copied!' : '🎨 CSS url() copié !');
  });

  if (btnDownloadMedia) {
    btnDownloadMedia.addEventListener('click', () => {
      if (!activeMedia) return;
      try {
        const bytes = base64ToUint8Array(activeMedia.raw);
        const blob = new Blob([bytes], { type: activeMedia.mime });
        window.HubUtils.safeDownloadBlob(blob, activeMedia.filename || 'media-decoded.bin');
        window.HubUtils.showToast(currentLang === 'en' ? '🖼️ Media downloaded!' : '🖼️ Média téléchargé !', 'success');
      } catch (e) {
        window.HubUtils.showToast(currentLang === 'en' ? 'Could not reconstruct file.' : 'Impossible de reconstruire le fichier.', 'error');
      }
    });
  }

  btnDownloadTxt.addEventListener('click', () => {
    if (!outputCode.value) return;
    window.HubUtils.safeDownloadText(outputCode.value, 'base64-output.txt', 'text/plain;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? '📥 .TXT downloaded!' : '📥 .TXT téléchargé !', 'success');
  });
});
