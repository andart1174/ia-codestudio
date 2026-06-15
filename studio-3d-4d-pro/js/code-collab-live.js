/**
 * Code Collab Live v4.0 — EN/FR
 * Bidirectional real-time sync with CHUNKED transfer for large code
 */
(function() {
'use strict';

/* ─── TRANSLATIONS ────────────────────────── */
var TX = {
  en: {
    tab:'Collab', title:'🧑‍💻 Collab Live', sub:'Real-time shared 3D workspace',
    start:'📡 Host a Session', join:'🔗 Join a Session',
    yourId:'Your Session ID:', waiting:'Waiting for partner...',
    partnerId:"Partner's Session ID",
    connected:'🟢 Connected', disconnected:'🔴 Disconnected',
    loadPeer:'Connecting...', copy:'📋 Copy ID', copied:'✅ Copied!',
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
    loadPeer:'Connexion...', copy:'📋 Copier ID', copied:'✅ Copié !',
    voiceStart:'🎤 Vocal', voiceStop:'🔇 Fin appel', voiceError:'Micro refusé.',
    typeMsg:'Écrire un message...', syncNow:'🔄 Sync Manuel',
    syncSending:'Envoi...', syncOk:'✅ Envoyé !', hint:'Sync auto — les modèles apparaissent sur les deux écrans.'
  }
};
function gl(){ return window.currentLang||'en'; }
function t(k){ return (TX[gl()]||TX.en)[k]||k; }

/* ─── CONSTANTS ───────────────────────────── */
var CHUNK = 40000;   // 40 KB per WebRTC chunk (safe limit)

/* ─── STATE ───────────────────────────────── */
var S = {
  status:'offline', peerId:null, conn:null,
  messages:[], voiceActive:false, call:null
};
var peer = null, localStream = null;
var lastSent = '';        // last code we sent (to avoid echo)
var lastApplied = '';     // last code we received and applied
var receiving = false;    // guard while applying partner code
var syncTimer = null;
var chunkBuf = {};        // id -> {total, parts:[]}
var partnerCursor = null, mouseT = 0;

/* ─── PEERJS LOADER ───────────────────────── */
function loadPeer(cb){
  if(window.Peer){cb();return;}
  var s=document.createElement('script');
  s.src='https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js';
  s.onload=cb; document.head.appendChild(s);
}

/* ─── CHUNKED SEND ────────────────────────── */
// WebRTC data channel max ~64KB; chunks sent with delay to avoid overflow
function sendCode(code){
  if(!S.conn||!S.conn.open) return;
  if(code.length <= CHUNK){
    safeSend({t:'c', d:code});
  } else {
    var id = Date.now();
    var n  = Math.ceil(code.length / CHUNK);
    for(var i=0;i<n;i++){
      (function(idx){
        setTimeout(function(){
          safeSend({t:'k', id:id, n:n, i:idx, d:code.substring(idx*CHUNK,(idx+1)*CHUNK)});
        }, idx * 80);   // 80ms between chunks — avoids data channel overrun
      })(i);
    }
  }
}

/* ─── AUTO-HOOK Generate button ─────────────
   Whenever user clicks btn-export (Generate 3D Scene),
   auto-send the resulting code to partner.             */
var exportHooked = false;
function hookExportBtn(){
  if(exportHooked) return;
  var btn = document.getElementById('btn-export');
  if(!btn) return;
  exportHooked = true;
  btn.addEventListener('click', function(){
    setTimeout(function(){
      var ta = document.getElementById('code-editor');
      if(!ta||!ta.value.trim()) return;
      if(S.status==='connected'){
        lastSent = ta.value;
        sendCode(ta.value);
        if(window.toast) window.toast(t('syncOk'));
        // Return to Design view so canvas stays visible
        setTimeout(function(){
          var dBtn = document.getElementById('btn-design-mode');
          if(dBtn) dBtn.click();
        }, 300);
      }
    }, 700);
  });
}

/* ─── RECEIVE DATA ────────────────────────── */
function onData(raw){
  if(!raw||!raw.t) return;

  /* small code sync */
  if(raw.t==='c'){
    applyCode(raw.d);
  }

  /* chunk piece */
  else if(raw.t==='k'){
    if(!chunkBuf[raw.id]) chunkBuf[raw.id]={n:raw.n, parts:[]};
    chunkBuf[raw.id].parts[raw.i] = raw.d;
    var buf = chunkBuf[raw.id];
    var got = 0;
    for(var j=0;j<buf.n;j++) if(buf.parts[j]!==undefined) got++;
    if(got===buf.n){
      var full = buf.parts.join('');
      delete chunkBuf[raw.id];
      applyCode(full);
    }
  }

  /* chat */
  else if(raw.t==='m'){
    S.messages.push({sender:'partner',text:raw.d});
    renderPanel();
  }

  /* cursor */
  else if(raw.t==='p'){
    showCursor(parseFloat(raw.x), parseFloat(raw.y));
  }
}

/* ─── APPLY CODE FROM PARTNER ─────────────── */
function applyCode(code){
  if(!code||code.length<100) return;
  if(code===lastApplied) return;
  lastApplied = code;
  lastSent    = code;

  // Also put code in editor + run preview (right panel)
  var ta = document.getElementById('code-editor');
  if(ta){
    receiving = true;
    ta.value  = code;
    try{ ta.dispatchEvent(new Event('input',{bubbles:true})); }catch(e){}
    if(window.runPreview) window.runPreview();
    setTimeout(function(){ receiving=false; }, 300);
  }

  // Show FULL-SCREEN overlay so partner sees the model clearly
  showPartnerModel(code);
}

function showPartnerModel(code){
  // Remove existing overlay if any
  var old = document.getElementById('collab-model-overlay');
  if(old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'collab-model-overlay';
  overlay.style.cssText = [
    'position:fixed','inset:0','z-index:99998',
    'background:rgba(5,8,21,0.96)',
    'display:flex','flex-direction:column',
    'font-family:Inter,sans-serif'
  ].join(';');

  // Header bar
  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;'+
    'padding:10px 16px;background:#0d1225;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;';
  bar.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+
    '\ud83d\udd04 Partner\'s 3D Model — Live Sync</div>';

  var closeBtn = document.createElement('button');
  closeBtn.textContent = '✖ Close & Continue Working';
  closeBtn.style.cssText = 'background:rgba(59,130,246,0.2);color:#93c5fd;'+
    'border:1px solid rgba(59,130,246,0.4);border-radius:8px;'+
    'padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer;';
  closeBtn.onmouseover = function(){ closeBtn.style.background='rgba(59,130,246,0.4)'; };
  closeBtn.onmouseout  = function(){ closeBtn.style.background='rgba(59,130,246,0.2)'; };
  closeBtn.onclick = function(){ overlay.remove(); };
  bar.appendChild(closeBtn);
  overlay.appendChild(bar);

  // iframe with model
  var iframe = document.createElement('iframe');
  iframe.style.cssText = 'flex:1;width:100%;border:none;background:#000;';
  iframe.setAttribute('sandbox','allow-scripts allow-same-origin');
  var blob = new Blob([code],{type:'text/html'});
  var url  = URL.createObjectURL(blob);
  iframe.src = url;
  setTimeout(function(){ URL.revokeObjectURL(url); }, 10000);
  overlay.appendChild(iframe);

  document.body.appendChild(overlay);
  if(window.toast) window.toast('\ud83d\udd04 Partner synced a 3D model!');
}

/* ─── POLLING — catches any .value write ──── */
// Runs every 400ms and sends code if it has changed since last send.
// This is the PRIMARY sync method — works regardless of how code was written.
function startPolling(){
  if(syncTimer) clearInterval(syncTimer);
  syncTimer = setInterval(function(){
    if(S.status!=='connected'||receiving) return;
    var ta = document.getElementById('code-editor');
    if(!ta) return;
    var code = ta.value;
    if(code && code!==lastSent){
      lastSent = code;
      sendCode(code);
    }
  }, 400);
}
function stopPolling(){
  if(syncTimer){ clearInterval(syncTimer); syncTimer=null; }
}

/* ─── HOOK 'input' EVENT for instant send ─── */
// sketch-extruder fires dispatchEvent(new Event('input')) after setting value.
// This catches it instantly without waiting for the 400ms poll.
var inputHooked = false;
function hookInput(){
  if(inputHooked) return;
  inputHooked = true;
  document.addEventListener('input', function(e){
    if(receiving||S.status!=='connected') return;
    var ta = document.getElementById('code-editor');
    if(!ta||e.target!==ta) return;
    var code = ta.value;
    if(code && code!==lastSent){
      lastSent = code;
      sendCode(code);
    }
  }, true);   // capture=true to catch before other listeners
}

/* ─── SAFE SEND ───────────────────────────── */
function safeSend(data){
  if(S.conn&&S.conn.open){
    try{ S.conn.send(data); }catch(e){ console.error('[Collab] send err',e); }
  }
}

/* ─── PEER SETUP ──────────────────────────── */
function initPeer(isHost, partnerId){
  if(!window.Peer) return;
  peer = new Peer({debug:0});
  peer.on('open',function(id){
    S.peerId=id;
    if(isHost){ S.status='hosting'; renderPanel(); }
    else { doConnect(partnerId); }
  });
  peer.on('connection',function(c){
    if(S.conn&&S.conn.open){c.close();return;}
    wireConn(c);
  });
  peer.on('call',function(call){
    getMic(function(stream){ call.answer(stream); wireCall(call); });
  });
  peer.on('disconnected',function(){ S.status='offline'; doCleanup(); });
  peer.on('error',function(err){ console.error('[Collab] peer err',err); S.status='offline'; doCleanup(); });
}

function doConnect(id){
  var c = peer.connect(id, {reliable:true});
  wireConn(c);
}

function wireConn(c){
  S.conn=c;
  c.on('open',function(){
    S.status='connected';
    if(window.toast) window.toast(t('connected'));
    hookInput();
    hookExportBtn();
    startPolling();
    // Send current code if already in editor (don't auto-generate - would switch view)
    var ta=document.getElementById('code-editor');
    if(ta&&ta.value.trim()){
      lastSent=ta.value;
      sendCode(ta.value);
    }
    renderPanel();
  });
  c.on('data', function(data){ onData(data); });
  c.on('close', function(){ doCleanup(); });
  c.on('error', function(e){ console.error('[Collab] conn err',e); doCleanup(); });
}

/* ─── CHAT ────────────────────────────────── */
function sendChat(msg){
  if(!msg.trim()||!S.conn) return;
  S.messages.push({sender:'me',text:msg});
  safeSend({t:'m',d:msg});
  renderPanel();
}

/* ─── VOICE ───────────────────────────────── */
function toggleVoice(){
  if(S.voiceActive&&S.call){
    S.call.close(); stopMic(); S.voiceActive=false; renderPanel();
  } else {
    getMic(function(stream){
      S.voiceActive=true;
      if(S.conn&&S.conn.peer){ var call=peer.call(S.conn.peer,stream); wireCall(call); }
      renderPanel();
    });
  }
}
function wireCall(call){
  S.call=call;
  call.on('stream',function(remote){
    var a=document.getElementById('collab-aud');
    if(!a){a=document.createElement('audio');a.id='collab-aud';a.autoplay=true;document.body.appendChild(a);}
    a.srcObject=remote; renderPanel();
  });
  call.on('close',function(){ S.voiceActive=false; S.call=null; stopMic(); renderPanel(); });
}
function getMic(cb){
  if(localStream){cb(localStream);return;}
  navigator.mediaDevices.getUserMedia({audio:true})
    .then(function(s){localStream=s;cb(s);})
    .catch(function(e){console.error(e);if(window.toast)window.toast(t('voiceError'));});
}
function stopMic(){
  if(localStream){localStream.getTracks().forEach(function(tr){tr.stop();});localStream=null;}
}

/* ─── PARTNER CURSOR ──────────────────────── */
function showCursor(rx,ry){
  if(!partnerCursor){
    partnerCursor=document.createElement('div');
    partnerCursor.style.cssText='position:fixed;pointer-events:none;z-index:999999;'+
      'font-size:22px;transition:left 0.08s linear,top 0.08s linear;'+
      'filter:drop-shadow(0 0 4px #60a5fa);';
    partnerCursor.textContent='👆';
    document.body.appendChild(partnerCursor);
  }
  partnerCursor.style.left=(rx*window.innerWidth)+'px';
  partnerCursor.style.top=(ry*window.innerHeight)+'px';
}
document.addEventListener('mousemove',function(e){
  var now=Date.now(); if(now-mouseT<60||S.status!=='connected') return;
  mouseT=now;
  safeSend({t:'p',x:(e.clientX/window.innerWidth).toFixed(4),y:(e.clientY/window.innerHeight).toFixed(4)});
});

/* ─── CLEANUP ─────────────────────────────── */
function doCleanup(){
  S.status='offline'; S.conn=null; stopPolling();
  if(S.call){S.call.close();S.call=null;} stopMic(); S.voiceActive=false;
  if(partnerCursor){partnerCursor.remove();partnerCursor=null;}
  chunkBuf={};
  if(window.toast) window.toast(t('disconnected'));
  renderPanel();
}

/* ─── SESSION ─────────────────────────────── */
function hostSession(){ S.status='loading'; renderPanel(); loadPeer(function(){ initPeer(true); }); }
function joinSession(){
  var inp=document.getElementById('cl-join-inp'); if(!inp) return;
  var id=inp.value.trim(); if(!id) return;
  S.status='loading'; renderPanel(); loadPeer(function(){ initPeer(false,id); });
}

/* ─── RENDER PANEL ────────────────────────── */
function renderPanel(){
  var panel=document.getElementById('collab-fp');
  if(!panel){
    panel=document.createElement('div');
    panel.id='collab-fp';
    panel.style.cssText='position:fixed;bottom:20px;right:410px;width:310px;'+
      'background:#080e1e;border:1px solid rgba(59,130,246,0.5);border-radius:14px;'+
      'box-shadow:0 16px 50px rgba(0,0,0,0.85);z-index:9999;display:flex;'+
      'flex-direction:column;overflow:hidden;font-family:Inter,sans-serif;max-height:520px;';
    document.body.appendChild(panel);
  }
  panel.innerHTML='';
  var wrap=mk('div','display:flex;flex-direction:column;max-height:520px;');

  /* HEADER */
  var hdr=mk('div','padding:11px 14px 9px;border-bottom:1px solid rgba(59,130,246,0.18);'+
    'display:flex;justify-content:space-between;align-items:flex-start;'+
    'background:linear-gradient(180deg,#0d1225,#080e1e);flex-shrink:0;');
  var ti=mk('div','');
  ti.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+t('title')+'</div>'+
    '<div style="font-size:10px;color:#475569;margin-top:2px;">'+t('sub')+'</div>';
  var xb=mk('button','background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);'+
    'border-radius:6px;color:#64748b;font-size:11px;padding:3px 8px;cursor:pointer;');
  xb.textContent='✖';
  xb.onmouseover=function(){xb.style.background='rgba(239,68,68,0.2)';xb.style.color='#fca5a5';};
  xb.onmouseout=function(){xb.style.background='rgba(255,255,255,0.05)';xb.style.color='#64748b';};
  xb.onclick=function(){
    panel.style.display='none';
    var b=document.getElementById('btn-collab-mode');if(b)b.classList.remove('active');
  };
  hdr.appendChild(ti); hdr.appendChild(xb); wrap.appendChild(hdr);

  /* BODY */
  var body=mk('div','flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;');

  if(S.status==='loading'){
    var ld=mk('div','text-align:center;padding:30px 10px;color:#94a3b8;font-size:11px;');
    ld.innerHTML='<div style="font-size:24px;margin-bottom:8px;">⏳</div>'+t('loadPeer');
    body.appendChild(ld);
  }

  else if(S.status==='offline'){
    var hb=card();
    var bH=mk('button','width:100%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);'+
      'border:none;border-radius:8px;padding:11px;color:#fff;font-weight:900;font-size:12px;cursor:pointer;');
    bH.textContent=t('start');
    bH.onmouseover=function(){bH.style.filter='brightness(1.15)';};
    bH.onmouseout=function(){bH.style.filter='none';};
    bH.onclick=hostSession; hb.appendChild(bH); body.appendChild(hb);

    var jb=card();
    var inp=mk('input','width:100%;box-sizing:border-box;background:rgba(0,0,0,0.35);'+
      'border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:9px 10px;'+
      'color:#e2e8f0;font-size:11px;margin-bottom:8px;outline:none;');
    inp.id='cl-join-inp'; inp.placeholder=t('partnerId');
    var bJ=mk('button','width:100%;background:rgba(59,130,246,0.12);color:#93c5fd;'+
      'border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:11px;font-weight:700;font-size:12px;cursor:pointer;');
    bJ.textContent=t('join'); bJ.onclick=joinSession;
    jb.appendChild(inp); jb.appendChild(bJ); body.appendChild(jb);
  }

  else if(S.status==='hosting'){
    var wb=card(); wb.style.textAlign='center';
    wb.innerHTML='<div style="font-size:10px;color:#64748b;margin-bottom:8px;">'+t('yourId')+'</div>'+
      '<div style="font-size:14px;color:#60a5fa;font-weight:900;background:#000;padding:10px;'+
      'border-radius:8px;word-break:break-all;user-select:all;margin-bottom:12px;">'+(S.peerId||'…')+'</div>';
    var bC=mk('button','background:rgba(255,255,255,0.06);color:#e2e8f0;'+
      'border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:6px 14px;font-size:11px;cursor:pointer;margin-bottom:14px;');
    bC.textContent=t('copy');
    bC.onclick=function(){navigator.clipboard.writeText(S.peerId||'');bC.textContent=t('copied');};
    wb.appendChild(bC);
    var pw=mk('div','font-size:11px;color:#f59e0b;'); pw.textContent=t('waiting');
    wb.appendChild(pw); body.appendChild(wb);
  }

  else if(S.status==='connected'){
    /* Status */
    var sb=mk('div','background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);'+
      'border-radius:10px;padding:9px 12px;display:flex;justify-content:space-between;align-items:center;');
    var sl=mk('div','font-size:11px;color:#34d399;font-weight:700;');
    sl.textContent=t('connected');
    var vb=mk('button',S.voiceActive
      ?'background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid rgba(239,68,68,0.4);border-radius:7px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;'
      :'background:rgba(59,130,246,0.15);color:#93c5fd;border:1px solid rgba(59,130,246,0.3);border-radius:7px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;');
    vb.textContent=S.voiceActive?t('voiceStop'):t('voiceStart');
    vb.onclick=toggleVoice;
    sb.appendChild(sl); sb.appendChild(vb); body.appendChild(sb);

    /* Sync bar */
    var sy=mk('div','background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.2);'+
      'border-radius:8px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;');
    var syL=mk('div','font-size:10px;color:#818cf8;flex:1;'); syL.textContent=t('hint');
    var syB=mk('button','background:rgba(99,102,241,0.2);color:#a5b4fc;border:1px solid rgba(99,102,241,0.4);'+
      'border-radius:6px;padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;margin-left:8px;');
    syB.textContent=t('syncNow');
    syB.onclick=function(){
      syB.textContent=t('syncSending');
      // Generate current 3D scene code
      var expBtn=document.getElementById('btn-export');
      if(expBtn) expBtn.click();
      // Wait for export, then send code, then RETURN to Design view
      setTimeout(function(){
        var ta=document.getElementById('code-editor');
        if(!ta||!ta.value.trim()){
          syB.textContent=t('syncNow');
          if(window.toast) window.toast('Add a 3D model first!');
          // Go back to design view regardless
          var dBtn=document.getElementById('btn-design-mode');
          if(dBtn) dBtn.click();
          return;
        }
        lastSent=''; lastApplied='';
        sendCode(ta.value);
        // IMPORTANT: go back to Design view
        var dBtn=document.getElementById('btn-design-mode');
        if(dBtn) dBtn.click();
        setTimeout(function(){ syB.textContent=t('syncOk'); },400);
        setTimeout(function(){ syB.textContent=t('syncNow'); },2500);
      }, 1000);
    };
    sy.appendChild(syL); sy.appendChild(syB); body.appendChild(sy);

    /* Chat */
    var chatBox=mk('div','display:flex;flex-direction:column;background:rgba(255,255,255,0.015);'+
      'border:1px solid rgba(255,255,255,0.05);border-radius:10px;overflow:hidden;max-height:220px;');
    var msgs=mk('div','flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;');
    S.messages.forEach(function(m){
      var isMe=m.sender==='me';
      var d=mk('div','max-width:88%;padding:7px 10px;border-radius:9px;font-size:11px;line-height:1.45;word-break:break-word;'+
        (isMe?'background:#3b82f6;color:#fff;align-self:flex-end;':'background:rgba(255,255,255,0.08);color:#cbd5e1;align-self:flex-start;'));
      d.textContent=m.text; msgs.appendChild(d);
    });
    chatBox.appendChild(msgs);
    var row=mk('div','display:flex;border-top:1px solid rgba(255,255,255,0.05);');
    var ci=mk('input','flex:1;background:transparent;border:none;padding:10px;color:#e2e8f0;font-size:11px;outline:none;');
    ci.type='text'; ci.placeholder=t('typeMsg');
    ci.onkeydown=function(e){ if(e.key==='Enter'&&ci.value.trim()){ sendChat(ci.value); ci.value=''; } };
    var cb=mk('button','background:transparent;border:none;color:#3b82f6;padding:0 12px;cursor:pointer;font-size:16px;');
    cb.textContent='➤';
    cb.onclick=function(){ if(ci.value.trim()){ sendChat(ci.value); ci.value=''; } };
    row.appendChild(ci); row.appendChild(cb);
    chatBox.appendChild(row); body.appendChild(chatBox);
    setTimeout(function(){ msgs.scrollTop=msgs.scrollHeight; }, 30);
  }

  wrap.appendChild(body); panel.appendChild(wrap);
}

/* ─── DOM HELPERS ─────────────────────────── */
function mk(tag,css){ var e=document.createElement(tag); if(css)e.style.cssText=css; return e; }
function card(){ return mk('div','background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px;'); }

/* ─── PUBLIC API ──────────────────────────── */
window.CodeCollabLive = {
  init: function(container, btnEl){
    if(!btnEl) return;
    btnEl.addEventListener('click', function(){
      var p=document.getElementById('collab-fp');
      if(!p){ renderPanel(); p=document.getElementById('collab-fp'); }
      if(!p) return;
      if(p.style.display==='none'||p.style.display===''){
        p.style.display='flex'; btnEl.classList.add('active');
      } else {
        p.style.display='none'; btnEl.classList.remove('active');
      }
    });
  },
  refreshLang: function(){
    var lb=document.getElementById('lbl-collab');
    if(lb) lb.textContent=t('tab');
    var p=document.getElementById('collab-fp');
    if(p&&p.style.display!=='none') renderPanel();
  }
};

})();
