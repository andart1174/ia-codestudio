// Dev Swiss Kit Pro (v2.0) — Live RegExp Tester, Offline JWT Decoder & CSPRNG UUID/Keys

const RX_PRESETS = {
  email: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})',
  url: 'https?:\\/\\/[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=%]*',
  hex: '#(?:[0-9a-fA-F]{3}){1,2}\\b',
  ipv4: '\\b(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\b',
  date: '\\b(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b'
};

function testRegex(pattern, flags, text) {
  const esc = (typeof window !== 'undefined' && window.HubUtils) ? window.HubUtils.escapeHtml : (s) => String(s || '');
  if (!pattern) {
    return { ok: true, count: 0, html: esc(text || ''), matches: [] };
  }
  try {
    const cleanFlags = String(flags || '').replace(/[^gimsuy]/g, '');
    const re = new RegExp(pattern, cleanFlags);
    const matches = [];
    let html = '';
    let lastIndex = 0;
    const src = String(text || '');

    if (cleanFlags.includes('g')) {
      let m;
      let guard = 0;
      while ((m = re.exec(src)) !== null && guard < 1000) {
        guard++;
        html += esc(src.slice(lastIndex, m.index));
        html += `<mark>${esc(m[0])}</mark>`;
        lastIndex = m.index + m[0].length;
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (m[0].length === 0) re.lastIndex++;
      }
      html += esc(src.slice(lastIndex));
    } else {
      const m = re.exec(src);
      if (m) {
        html = esc(src.slice(0, m.index)) + `<mark>${esc(m[0])}</mark>` + esc(src.slice(m.index + m[0].length));
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      } else {
        html = esc(src);
      }
    }
    return { ok: true, count: matches.length, html, matches };
  } catch (err) {
    return { ok: false, error: err.message, count: 0, html: esc(text || ''), matches: [] };
  }
}

function decodeBase64UrlJson(segment) {
  let b64 = String(segment || '').replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) b64 += '=';
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const jsonStr = new TextDecoder('utf-8').decode(bytes);
  return JSON.parse(jsonStr);
}

function decodeJwt(token) {
  const clean = String(token || '').trim();
  if (!clean) return { ok: false, error: 'Empty token' };
  const parts = clean.split('.');
  if (parts.length < 2) return { ok: false, error: 'JWT must have header.payload(.signature)' };
  try {
    const header = decodeBase64UrlJson(parts[0]);
    const payload = decodeBase64UrlJson(parts[1]);
    const nowSec = Math.floor(Date.now() / 1000);
    let expStatus = 'none';
    let expDeltaSec = 0;
    if (typeof payload.exp === 'number') {
      expDeltaSec = payload.exp - nowSec;
      expStatus = expDeltaSec >= 0 ? 'valid' : 'expired';
    }
    return { ok: true, header, payload, signature: parts[2] || '', expStatus, expDeltaSec };
  } catch (err) {
    return { ok: false, error: 'Invalid Base64URL or JSON segment' };
  }
}

function getSecureRandomBytes(len) {
  const bytes = new Uint8Array(len);
  const cryptoObj = (typeof globalThis !== 'undefined' && globalThis.crypto) ? globalThis.crypto : null;
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    cryptoObj.getRandomValues(bytes);
  } else {
    throw new Error('Web Crypto API unavailable');
  }
  return bytes;
}

function generateUuidV4() {
  const cryptoObj = (typeof globalThis !== 'undefined' && globalThis.crypto) ? globalThis.crypto : null;
  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID();
  }
  const b = getSecureRandomBytes(16);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const hex = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateFromAlphabet(alphabet, len) {
  const bytes = getSecureRandomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

function generateNanoId(len) {
  return generateFromAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-', len || 21);
}

function generateHexKey(bytesLen) {
  return Array.from(getSecureRandomBytes(bytesLen || 32), x => x.toString(16).padStart(2, '0')).join('');
}

function generatePassword(len) {
  return generateFromAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*-_+=', len || 20);
}

if (typeof window !== 'undefined') {
  window._devSwissKit = { testRegex, decodeJwt, generateUuidV4, generateNanoId, generateHexKey, generatePassword };
}

document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('#swiss-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#swiss-tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.swiss-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(`tab-${tab}`);
      if (target) target.classList.add('active');
    });
  });

  // --- TAB 1: REGEX ---
  const rxPattern = document.getElementById('rx-pattern');
  const rxText = document.getElementById('rx-text');
  const rxHighlight = document.getElementById('rx-highlight');
  const rxGroups = document.getElementById('rx-groups');
  const rxCountPill = document.getElementById('rx-count-pill');
  const btnCopyRx = document.getElementById('btn-copy-rx');

  function getActiveFlags() {
    return Array.from(document.querySelectorAll('#rx-flags .flag-btn.active'))
      .map(b => b.getAttribute('data-flag'))
      .join('');
  }

  function runRegex() {
    const flags = getActiveFlags();
    const res = testRegex(rxPattern.value, flags, rxText.value);
    if (!res.ok) {
      rxCountPill.textContent = `❌ ${res.error}`;
      rxCountPill.classList.remove('good');
      rxHighlight.innerHTML = res.html;
      rxGroups.innerHTML = '';
      return;
    }
    rxCountPill.textContent = `${res.count} ${res.count === 1 ? 'match' : 'matches'}`;
    rxCountPill.classList.toggle('good', res.count > 0);
    rxHighlight.innerHTML = res.html;

    rxGroups.innerHTML = '';
    if (res.matches.length === 0) {
      rxGroups.innerHTML = '<div class="rx-group-item" style="color:#64748b;">No matches found.</div>';
      return;
    }
    res.matches.slice(0, 40).forEach((m, i) => {
      const row = document.createElement('div');
      row.className = 'rx-group-item';
      const groupsStr = m.groups.length ? ' → [' + m.groups.map((g, gi) => `$${gi + 1}: ${g === undefined ? 'undefined' : g}`).join(', ') + ']' : '';
      row.textContent = `#${i + 1} @${m.index}: "${m.match}"${groupsStr}`;
      rxGroups.appendChild(row);
    });
  }

  rxPattern.addEventListener('input', runRegex);
  rxText.addEventListener('input', runRegex);
  document.querySelectorAll('#rx-flags .flag-btn').forEach(btn => {
    btn.addEventListener('click', () => { btn.classList.toggle('active'); runRegex(); });
  });
  document.querySelectorAll('#rx-presets .preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#rx-presets .preset-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      rxPattern.value = RX_PRESETS[btn.getAttribute('data-rx')] || '';
      runRegex();
    });
  });
  btnCopyRx.addEventListener('click', () => {
    const snippet = `/${rxPattern.value}/${getActiveFlags()}`;
    window.HubUtils.copyText(snippet, `📋 Copied ${snippet}`);
  });
  runRegex();

  // --- TAB 2: JWT ---
  const jwtInput = document.getElementById('jwt-input');
  const jwtHeaderOut = document.getElementById('jwt-header-out');
  const jwtPayloadOut = document.getElementById('jwt-payload-out');
  const jwtExpPill = document.getElementById('jwt-exp-pill');
  const btnJwtDemo = document.getElementById('btn-jwt-demo');
  const btnCopyJwt = document.getElementById('btn-copy-jwt');

  function encodeB64Url(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function runJwt() {
    const res = decodeJwt(jwtInput.value);
    if (!res.ok) {
      jwtHeaderOut.textContent = '{}';
      jwtPayloadOut.textContent = res.error;
      jwtExpPill.textContent = '⚠️ Invalid JWT';
      jwtExpPill.classList.remove('good');
      return;
    }
    jwtHeaderOut.textContent = JSON.stringify(res.header, null, 2);
    jwtPayloadOut.textContent = JSON.stringify(res.payload, null, 2);
    if (res.expStatus === 'valid') {
      const mins = Math.max(1, Math.round(res.expDeltaSec / 60));
      jwtExpPill.textContent = `✅ Active (~${mins}m left)`;
      jwtExpPill.classList.add('good');
    } else if (res.expStatus === 'expired') {
      const mins = Math.max(1, Math.round(Math.abs(res.expDeltaSec) / 60));
      jwtExpPill.textContent = `⏰ Expired (${mins}m ago)`;
      jwtExpPill.classList.remove('good');
    } else {
      jwtExpPill.textContent = 'ℹ️ No exp claim';
      jwtExpPill.classList.add('good');
    }
  }

  function loadDemoJwt() {
    const now = Math.floor(Date.now() / 1000);
    const h = encodeB64Url({ alg: 'HS256', typ: 'JWT' });
    const p = encodeB64Url({
      sub: 'usr_ia_94820',
      name: 'IA Code Studio Dev',
      role: 'architect',
      plan: 'free-hub',
      iat: now,
      exp: now + 3600
    });
    jwtInput.value = `${h}.${p}.demo_signature_offline_only`;
    runJwt();
  }

  jwtInput.addEventListener('input', runJwt);
  btnJwtDemo.addEventListener('click', loadDemoJwt);
  btnCopyJwt.addEventListener('click', () => {
    window.HubUtils.copyText(jwtPayloadOut.textContent, currentLang === 'en' ? '📋 JWT Payload copied!' : '📋 Payload JWT copié !');
  });
  loadDemoJwt();

  // --- TAB 3: CRYPTO UUID & KEYS ---
  const idType = document.getElementById('id-type');
  const idCount = document.getElementById('id-count');
  const valIdCount = document.getElementById('val-id-count');
  const idLen = document.getElementById('id-len');
  const valIdLen = document.getElementById('val-id-len');
  const btnGenIds = document.getElementById('btn-gen-ids');
  const btnCopyAllIds = document.getElementById('btn-copy-all-ids');
  const btnDlIds = document.getElementById('btn-dl-ids');
  const idList = document.getElementById('id-results-list');

  let currentIds = [];

  function runGenerateIds() {
    const count = parseInt(idCount.value, 10) || 5;
    const len = parseInt(idLen.value, 10) || 21;
    valIdCount.textContent = count;
    valIdLen.textContent = len;

    currentIds = [];
    for (let i = 0; i < count; i++) {
      if (idType.value === 'uuid') currentIds.push(generateUuidV4());
      else if (idType.value === 'nanoid') currentIds.push(generateNanoId(len));
      else if (idType.value === 'apikey') currentIds.push(`sk_live_${generateNanoId(32)}`);
      else if (idType.value === 'hex256') currentIds.push(generateHexKey(32));
      else currentIds.push(generatePassword(len));
    }

    idList.innerHTML = '';
    currentIds.forEach(val => {
      const row = document.createElement('div');
      row.className = 'id-row';
      const span = document.createElement('span');
      span.textContent = val;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'action-btn';
      btn.style.padding = '3px 9px';
      btn.textContent = '📋';
      btn.addEventListener('click', () => {
        window.HubUtils.copyText(val, currentLang === 'en' ? '📋 Copied!' : '📋 Copié !');
      });
      row.appendChild(span);
      row.appendChild(btn);
      idList.appendChild(row);
    });
  }

  idType.addEventListener('change', runGenerateIds);
  idCount.addEventListener('input', runGenerateIds);
  idLen.addEventListener('input', runGenerateIds);
  btnGenIds.addEventListener('click', runGenerateIds);

  btnCopyAllIds.addEventListener('click', () => {
    window.HubUtils.copyText(currentIds.join('\n'), currentLang === 'en' ? `📋 Copied ${currentIds.length} keys!` : `📋 ${currentIds.length} clés copiées !`);
  });

  btnDlIds.addEventListener('click', () => {
    window.HubUtils.safeDownloadText(currentIds.join('\n'), `ia-crypto-${idType.value}.txt`, 'text/plain;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? '📥 .TXT downloaded!' : '📥 .TXT téléchargé !', 'success');
  });

  runGenerateIds();
});
