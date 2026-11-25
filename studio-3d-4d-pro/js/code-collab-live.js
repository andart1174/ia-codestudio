/**
 * Code Collab Live v5.0 — EN/FR
 * Secure sandboxed P2P WebRTC collaboration with invite links (?collab=ID), STUN config, error handling & responsive layout
 */
(function() {
'use strict';

var TX = {
  en: {
    tab:'Collab', title:'🧑‍💻 Collab Live', sub:'Real-time shared 3D workspace',
    start:'📡 Host a Session', join:'🔗 Join a Session',
    yourId:'Your Session ID:', waiting:'Waiting for partner...',
    partnerId:"Partner's Session ID",
    connected:'🟢 Connected', disconnected:'🔴 Disconnected',
    loadPeer:'Connecting to P2P network...', peerErr:'P2P network unreachable. Retry later.',
    copy:'📋 Copy ID', copyLink:'🔗 Copy Invite Link', copied:'✅ Copied!',
    voiceStart:'🎤 Voice', voiceStop:'🔇 End Voice', voiceError:'Microphone denied.',
    typeMsg:'Type a message...', syncNow:'🔄 Sync Now',
    syncSending:'Sending...', syncOk:'✅ Sent!', hint:'Auto-sync active — models appear on both screens.'
  },
  fr: {
    tab:'Collab', title:'🧑‍💻 Collab Live', sub:'Espace 3D partagé en temps réel',
    start:'📡 Héberger une Session', join:'🔗 Rejoindre une Session',
    yourId:'Votre ID de Session :', waiting:'En attente du partenaire...',
    partnerId:'ID du Partenaire',
    connected:'🟢 Connecté', disconnected:'🔴 Déconnecté',
    loadPeer:'Connexion au réseau P2P...', peerErr:'Réseau P2P indisponible. Réessayez.',
    copy:'📋 Copier ID', copyLink:'🔗 Copier Lien Invit.', copied:'✅ Copié !',
    voiceStart:'🎤 Vocal', voiceStop:'🔇 Fin appel', voiceError:'Micro refusé.',
    typeMsg:'Écrire un message...', syncNow:'🔄 Sync Manuel',
    syncSending:'Envoi...', syncOk:'✅ Envoyé !', hint:'Sync auto — les modèles apparaissent sur les deux écrans.'
  }
};
function gl(){ return window.currentLang || 'en'; }
function t(k){ return (TX[gl()] || TX.en)[k] || k; }

var CHUNK = 40000;
var S = { status:'offline', peerId:null, conn:null, messages:[], voiceActive:false, call:null };
var peer = null, localStream = null;
var lastSent = '', lastApplied = '', receiving = false;
var syncTimer = null, chunkBuf = {}, partnerCursor = null, mouseT = 0, sendTimers = [];
var mouseMoveBound = false;

function loadPeer(cb, onErr){
  if (window.Peer) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js';
  s.onload = cb;
  s.onerror = function() {
    S.status = 'offline';
    if (window.toast) window.toast('⚠️ ' + t('peerErr'));
    renderPanel();
    if (onErr) onErr();
  };
  document.head.appendChild(s);
}

function clearPendingChunks() {
  sendTimers.forEach(function(id) { clearTimeout(id); });
  sendTimers = [];
}

function sendCode(code){
  if (!S.conn || !S.conn.open) return;
  clearPendingChunks();
  if (code.length <= CHUNK) {
    safeSend({ t:'c', d:code });
  } else {
    var id = Date.now();
    var n = Math.ceil(code.length / CHUNK);
    for (var i = 0; i < n; i++) {
      (function(idx){
        var tid = setTimeout(function(){
          safeSend({ t:'k', id:id, n:n, i:idx, d:code.substring(idx*CHUNK, (idx+1)*CHUNK) });
        }, idx * 70);
        sendTimers.push(tid);
      })(i);
    }
  }
}

var exportHooked = false;
function hookExportBtn(){
  if (exportHooked) return;
  var btn = document.getElementById('btn-export');
  if (!btn) return;
  exportHooked = true;
  btn.addEventListener('click', function(){
    setTimeout(function(){
      var ta = document.getElementById('code-editor');
      if (!ta || !ta.value.trim()) return;
      if (S.status === 'connected') {
        lastSent = ta.value;
        sendCode(ta.value);
        if (window.toast) window.toast(t('syncOk'));
      }
    }, 500);
  });
}

function onData(raw){
  if (!raw || !raw.t) return;
  if (raw.t === 'c') {
    applyCode(raw.d);
  } else if (raw.t === 'k') {
    if (!chunkBuf[raw.id]) chunkBuf[raw.id] = { n:raw.n, parts:[] };
    chunkBuf[raw.id].parts[raw.i] = raw.d;
    var buf = chunkBuf[raw.id];
    var got = 0;
    for (var j = 0; j < buf.n; j++) if (buf.parts[j] !== undefined) got++;
    if (got === buf.n) {
      var full = buf.parts.join('');
      delete chunkBuf[raw.id];
      applyCode(full);
    }
  } else if (raw.t === 'm') {
    S.messages.push({ sender:'partner', text:String(raw.d || '').slice(0, 1000) });
    renderPanel();
  } else if (raw.t === 'p') {
    showCursor(parseFloat(raw.x), parseFloat(raw.y));
  }
}

function applyCode(code){
  if (!code || code.length < 50 || code === lastApplied) return;
  lastApplied = code;
  lastSent = code;
  var ta = document.getElementById('code-editor');
  if (ta) {
    receiving = true;
    ta.value = code;
    try { ta.dispatchEvent(new Event('input', { bubbles:true })); } catch (e) {}
    if (window.runPreview) window.runPreview();
    setTimeout(function(){ receiving = false; }, 350);
  }
  showPartnerModel(code);
}

// Strict sandboxed iframe (allow-scripts ONLY — no allow-same-origin, so partner HTML cannot read parent cookies/localStorage!)
function showPartnerModel(code){
  var old = document.getElementById('collab-model-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'collab-model-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(5,8,21,0.96);display:flex;flex-direction:column;font-family:Inter,sans-serif;';

  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#0d1225;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;';
  var titleEl = document.createElement('div');
  titleEl.style.cssText = 'font-size:13px;font-weight:900;color:#60a5fa;';
  titleEl.textContent = "🔄 Partner's 3D Model — Sandboxed Live Sync";
  bar.appendChild(titleEl);

  var closeBtn = document.createElement('button');
  closeBtn.textContent = '✖ Close & Continue Working';
  closeBtn.style.cssText = 'background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid rgba(59,130,246,0.4);border-radius:8px;padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer;';
  closeBtn.onclick = function(){ overlay.remove(); };
  bar.appendChild(closeBtn);
  overlay.appendChild(bar);

  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'flex:1;width:100%;border:none;background:#000;';
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.srcdoc = code;
  overlay.appendChild(iframe);

  document.body.appendChild(overlay);
  if (window.toast) window.toast('🔄 Partner synced a 3D model!');
}

function startPolling(){
  if (syncTimer) clearInterval(syncTimer);
  syncTimer = setInterval(function(){
    if (S.status !== 'connected' || receiving) return;
    var ta = document.getElementById('code-editor');
    if (!ta) return;
    var code = ta.value;
    if (code && code !== lastSent) { lastSent = code; sendCode(code); }
  }, 600);
}
function stopPolling(){ if (syncTimer) { clearInterval(syncTimer); syncTimer = null; } }

var inputHooked = false;
function hookInput(){
  if (inputHooked) return;
  inputHooked = true;
  document.addEventListener('input', function(e){
    if (receiving || S.status !== 'connected') return;
    var ta = document.getElementById('code-editor');
    if (!ta || e.target !== ta) return;
    var code = ta.value;
    if (code && code !== lastSent) { lastSent = code; sendCode(code); }
  }, true);
}

function safeSend(data){
  if (S.conn && S.conn.open) {
    try { S.conn.send(data); } catch (e) { console.error('[Collab] send err', e); }
  }
}

function onMouseMove(e){
  var now = Date.now();
  if (now - mouseT < 60 || S.status !== 'connected') return;
  mouseT = now;
  safeSend({ t:'p', x:(e.clientX / window.innerWidth).toFixed(4), y:(e.clientY / window.innerHeight).toFixed(4) });
}

function initPeer(isHost, partnerId){
  if (!window.Peer) return;
  peer = new Peer({
    debug: 0,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun.cloudflare.com:3478' }
      ]
    }
  });
  peer.on('open', function(id){
    S.peerId = id;
    if (isHost) { S.status = 'hosting'; renderPanel(); }
    else { doConnect(partnerId); }
  });
  peer.on('connection', function(c){
    if (S.conn && S.conn.open) { c.close(); return; }
    wireConn(c);
  });
  peer.on('call', function(call){
    getMic(function(stream){ call.answer(stream); wireCall(call); });
  });
  peer.on('disconnected', function(){ S.status = 'offline'; doCleanup(); });
  peer.on('error', function(err){
    console.error('[Collab] peer err', err);
    if (window.toast) window.toast('⚠️ ' + (err.message || t('peerErr')));
    S.status = 'offline';
    doCleanup();
  });
}

function doConnect(id){
  var c = peer.connect(id, { reliable:true });
  wireConn(c);
}

function wireConn(c){
  S.conn = c;
  c.on('open', function(){
    S.status = 'connected';
    if (window.toast) window.toast(t('connected'));
    hookInput();
    hookExportBtn();
    startPolling();
    if (!mouseMoveBound) { document.addEventListener('mousemove', onMouseMove); mouseMoveBound = true; }
    var ta = document.getElementById('code-editor');
    if (ta && ta.value.trim()) { lastSent = ta.value; sendCode(ta.value); }
    renderPanel();
  });
  c.on('data', function(data){ onData(data); });
  c.on('close', function(){ doCleanup(); });
  c.on('error', function(e){ console.error('[Collab] conn err', e); doCleanup(); });
}

function sendChat(msg){
  if (!msg.trim() || !S.conn) return;
  S.messages.push({ sender:'me', text:msg });
  safeSend({ t:'m', d:msg });
  renderPanel();
}

function toggleVoice(){
  if (S.voiceActive && S.call) {
    S.call.close(); stopMic(); S.voiceActive = false; renderPanel();
  } else {
    getMic(function(stream){
      S.voiceActive = true;
      if (S.conn && S.conn.peer) { var call = peer.call(S.conn.peer, stream); wireCall(call); }
      renderPanel();
    });
  }
}
function wireCall(call){
  S.call = call;
  call.on('stream', function(remote){
    var a = document.getElementById('collab-aud');
    if (!a) { a = document.createElement('audio'); a.id = 'collab-aud'; a.autoplay = true; document.body.appendChild(a); }
    a.srcObject = remote; renderPanel();
  });
  call.on('close', function(){ S.voiceActive = false; S.call = null; stopMic(); renderPanel(); });
}
function getMic(cb){
  if (localStream) { cb(localStream); return; }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (window.toast) window.toast(t('voiceError'));
    return;
  }
  navigator.mediaDevices.getUserMedia({ audio:true })
    .then(function(s){ localStream = s; cb(s); })
    .catch(function(){ if (window.toast) window.toast(t('voiceError')); });
}
function stopMic(){
  if (localStream) { localStream.getTracks().forEach(function(tr){ tr.stop(); }); localStream = null; }
}

function showCursor(rx, ry){
  if (!Number.isFinite(rx) || !Number.isFinite(ry)) return;
  if (!partnerCursor) {
    partnerCursor = document.createElement('div');
    partnerCursor.style.cssText = 'position:fixed;pointer-events:none;z-index:999999;font-size:20px;transition:left 0.08s linear,top 0.08s linear;filter:drop-shadow(0 0 4px #60a5fa);';
    partnerCursor.textContent = '👆';
    document.body.appendChild(partnerCursor);
  }
  partnerCursor.style.left = Math.max(0, Math.min(window.innerWidth - 20, rx * window.innerWidth)) + 'px';
  partnerCursor.style.top = Math.max(0, Math.min(window.innerHeight - 20, ry * window.innerHeight)) + 'px';
}

function doCleanup(){
  S.status = 'offline'; S.conn = null; stopPolling(); clearPendingChunks();
  if (mouseMoveBound) { document.removeEventListener('mousemove', onMouseMove); mouseMoveBound = false; }
  if (S.call) { S.call.close(); S.call = null; } stopMic(); S.voiceActive = false;
  if (partnerCursor) { partnerCursor.remove(); partnerCursor = null; }
  chunkBuf = {};
  if (window.toast) window.toast(t('disconnected'));
  renderPanel();
}

function hostSession(){ S.status = 'loading'; renderPanel(); loadPeer(function(){ initPeer(true); }); }
function joinSession(directId){
  var inp = document.getElementById('cl-join-inp');
  var id = (directId || (inp ? inp.value : '') || '').trim();
  if (!id) return;
  S.status = 'loading'; renderPanel(); loadPeer(function(){ initPeer(false, id); });
}

function renderPanel(){
  var panel = document.getElementById('collab-fp');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'collab-fp';
    panel.style.cssText = 'position:fixed;bottom:56px;right:18px;width:min(320px,calc(100vw - 32px));background:#080e1e;border:1px solid rgba(59,130,246,0.5);border-radius:14px;box-shadow:0 16px 50px rgba(0,0,0,0.85);z-index:9999;display:flex;flex-direction:column;overflow:hidden;font-family:Inter,sans-serif;max-height:520px;';
    document.body.appendChild(panel);
  }
  panel.innerHTML = '';
  var wrap = mk('div', 'display:flex;flex-direction:column;max-height:520px;');

  var hdr = mk('div', 'padding:11px 14px 9px;border-bottom:1px solid rgba(59,130,246,0.18);display:flex;justify-content:space-between;align-items:flex-start;background:linear-gradient(180deg,#0d1225,#080e1e);flex-shrink:0;');
  var ti = mk('div', '');
  ti.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  var xb = mk('button', 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;color:#94a3b8;font-size:11px;padding:3px 8px;cursor:pointer;');
  xb.textContent = '✖';
  xb.onclick = function(){ panel.style.display = 'none'; var b = document.getElementById('btn-collab-mode'); if (b) b.classList.remove('active'); };
  hdr.appendChild(ti); hdr.appendChild(xb); wrap.appendChild(hdr);

  var body = mk('div', 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;');

  if (S.status === 'loading') {
    var ld = mk('div', 'text-align:center;padding:30px 10px;color:#94a3b8;font-size:11px;');
    ld.innerHTML = '<div style="font-size:24px;margin-bottom:8px;">⏳</div>' + t('loadPeer');
    body.appendChild(ld);
  } else if (S.status === 'offline') {
    var hb = card();
    var bH = mk('button', 'width:100%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;');
    bH.textContent = t('start'); bH.onclick = hostSession; hb.appendChild(bH); body.appendChild(hb);

    var jb = card();
    var inp = mk('input', 'width:100%;box-sizing:border-box;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:9px 10px;color:#e2e8f0;font-size:11px;margin-bottom:8px;outline:none;');
    inp.id = 'cl-join-inp'; inp.placeholder = t('partnerId');
    var urlCollab = new URLSearchParams(window.location.search).get('collab');
    if (urlCollab) inp.value = urlCollab;
    var bJ = mk('button', 'width:100%;background:rgba(59,130,246,0.12);color:#93c5fd;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:11px;font-weight:700;font-size:12px;cursor:pointer;');
    bJ.textContent = t('join'); bJ.onclick = function(){ joinSession(); };
    jb.appendChild(inp); jb.appendChild(bJ); body.appendChild(jb);
  } else if (S.status === 'hosting') {
    var wb = card(); wb.style.textAlign = 'center';
    wb.innerHTML = '<div style="font-size:10px;color:#94a3b8;margin-bottom:8px;">' + t('yourId') + '</div>' +
      '<div style="font-size:13px;color:#60a5fa;font-weight:900;background:#000;padding:10px;border-radius:8px;word-break:break-all;user-select:all;margin-bottom:10px;">' + (S.peerId || '…') + '</div>';
    var btnRow = mk('div', 'display:flex;gap:6px;justify-content:center;margin-bottom:12px;');
    var bC = mk('button', 'flex:1;background:rgba(255,255,255,0.06);color:#e2e8f0;border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:6px 8px;font-size:10px;cursor:pointer;');
    bC.textContent = t('copy');
    bC.onclick = function(){ navigator.clipboard.writeText(S.peerId || ''); bC.textContent = t('copied'); };
    var bL = mk('button', 'flex:1;background:rgba(59,130,246,0.18);color:#93c5fd;border:1px solid rgba(59,130,246,0.35);border-radius:7px;padding:6px 8px;font-size:10px;cursor:pointer;');
    bL.textContent = t('copyLink');
    bL.onclick = function(){
      var inviteUrl = location.origin + location.pathname + '?collab=' + encodeURIComponent(S.peerId || '');
      navigator.clipboard.writeText(inviteUrl); bL.textContent = t('copied');
    };
    btnRow.appendChild(bC); btnRow.appendChild(bL); wb.appendChild(btnRow);
    var pw = mk('div', 'font-size:11px;color:#f59e0b;'); pw.textContent = t('waiting');
    wb.appendChild(pw); body.appendChild(wb);
  } else if (S.status === 'connected') {
    var sb = mk('div', 'background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:10px;padding:9px 12px;display:flex;justify-content:space-between;align-items:center;');
    var sl = mk('div', 'font-size:11px;color:#34d399;font-weight:700;'); sl.textContent = t('connected');
    var vb = mk('button', S.voiceActive
      ? 'background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid rgba(239,68,68,0.4);border-radius:7px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;'
      : 'background:rgba(59,130,246,0.15);color:#93c5fd;border:1px solid rgba(59,130,246,0.3);border-radius:7px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;');
    vb.textContent = S.voiceActive ? t('voiceStop') : t('voiceStart'); vb.onclick = toggleVoice;
    sb.appendChild(sl); sb.appendChild(vb); body.appendChild(sb);

    var sy = mk('div', 'background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;');
    var syL = mk('div', 'font-size:10px;color:#818cf8;flex:1;'); syL.textContent = t('hint');
    var syB = mk('button', 'background:rgba(99,102,241,0.2);color:#a5b4fc;border:1px solid rgba(99,102,241,0.4);border-radius:6px;padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;margin-left:8px;');
    syB.textContent = t('syncNow');
    syB.onclick = function(){
      syB.textContent = t('syncSending');
      if (window.SketchExtruder && typeof window.SketchExtruder.exportScene === 'function' && window.SketchExtruder.getModels && window.SketchExtruder.getModels().length > 0) {
        window.SketchExtruder.exportScene();
      }
      setTimeout(function(){
        var ta = document.getElementById('code-editor');
        if (!ta || !ta.value.trim()) { syB.textContent = t('syncNow'); return; }
        lastSent = ''; lastApplied = ''; sendCode(ta.value);
        setTimeout(function(){ syB.textContent = t('syncOk'); }, 300);
        setTimeout(function(){ syB.textContent = t('syncNow'); }, 2200);
      }, 350);
    };
    sy.appendChild(syL); sy.appendChild(syB); body.appendChild(sy);

    var chatBox = mk('div', 'display:flex;flex-direction:column;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.05);border-radius:10px;overflow:hidden;max-height:220px;');
    var msgs = mk('div', 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;');
    S.messages.forEach(function(m){
      var isMe = m.sender === 'me';
      var d = mk('div', 'max-width:88%;padding:7px 10px;border-radius:9px;font-size:11px;line-height:1.45;word-break:break-word;' + (isMe ? 'background:#3b82f6;color:#fff;align-self:flex-end;' : 'background:rgba(255,255,255,0.08);color:#cbd5e1;align-self:flex-start;'));
      d.textContent = m.text; msgs.appendChild(d);
    });
    chatBox.appendChild(msgs);
    var row = mk('div', 'display:flex;border-top:1px solid rgba(255,255,255,0.05);');
    var ci = mk('input', 'flex:1;background:transparent;border:none;padding:10px;color:#e2e8f0;font-size:11px;outline:none;');
    ci.type = 'text'; ci.placeholder = t('typeMsg');
    ci.onkeydown = function(e){ if (e.key === 'Enter' && ci.value.trim()) { sendChat(ci.value); ci.value = ''; } };
    var cb = mk('button', 'background:transparent;border:none;color:#3b82f6;padding:0 12px;cursor:pointer;font-size:16px;');
    cb.textContent = '➤';
    cb.onclick = function(){ if (ci.value.trim()) { sendChat(ci.value); ci.value = ''; } };
    row.appendChild(ci); row.appendChild(cb); chatBox.appendChild(row); body.appendChild(chatBox);
    setTimeout(function(){ msgs.scrollTop = msgs.scrollHeight; }, 30);
  }

  wrap.appendChild(body); panel.appendChild(wrap);
}

function mk(tag, css){ var e = document.createElement(tag); if (css) e.style.cssText = css; return e; }
function card(){ return mk('div', 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px;'); }

window.CodeCollabLive = {
  init: function(container, btnEl){
    if (btnEl) {
      btnEl.addEventListener('click', function(){
        var p = document.getElementById('collab-fp');
        if (!p) { renderPanel(); p = document.getElementById('collab-fp'); }
        if (!p) return;
        if (p.style.display === 'none' || p.style.display === '') {
          p.style.display = 'flex'; btnEl.classList.add('active');
        } else {
          p.style.display = 'none'; btnEl.classList.remove('active');
        }
      });
    }
    // Auto-open panel if ?collab=ROOM_ID is present in URL
    var urlCollab = new URLSearchParams(window.location.search).get('collab');
    if (urlCollab) {
      renderPanel();
      var p = document.getElementById('collab-fp');
      if (p) p.style.display = 'flex';
    }
  },
  refreshLang: function(){
    var lb = document.getElementById('lbl-collab');
    if (lb) lb.textContent = t('tab');
    var p = document.getElementById('collab-fp');
    if (p && p.style.display !== 'none') renderPanel();
  }
};
})();
