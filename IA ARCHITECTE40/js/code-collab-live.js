/**
 * Code Collab Live v1.0 — EN/FR
 * Real-time Peer-to-Peer collaboration using PeerJS
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Collab', title: '🧑‍💻 Code Collab Live', sub: 'Real-time P2P Pair Programming',
    start: 'Host a Session', join: 'Join a Session',
    yourId: 'Your Session ID:', waiting: 'Waiting for connection...',
    partnerId: 'Partner\'s ID', connect: 'Connect',
    chat: 'Chat Messages', typeMsg: 'Type a message...', send: 'Send',
    connected: '🟢 Connected!', disconnected: '🔴 Disconnected.',
    loadPeer: 'Loading PeerJS network...',
    copy: '📋 Copy ID', copied: 'Copied!',
    voiceStart: '🎤 Voice Chat', voiceStop: '🔇 End Voice', voiceError: 'Microphone access denied.'
  },
  fr: {
    tab: 'Collab', title: '🧑‍💻 Code Collab Live', sub: 'Programmation en binôme P2P',
    start: 'Héberger une Session', join: 'Rejoindre une Session',
    yourId: 'Votre ID de Session :', waiting: 'En attente de connexion...',
    partnerId: 'ID du Partenaire', connect: 'Se Connecter',
    chat: 'Messages du Chat', typeMsg: 'Écrire un message...', send: 'Envoyer',
    connected: '🟢 Connecté !', disconnected: '🔴 Déconnecté.',
    loadPeer: 'Chargement du réseau PeerJS...',
    copy: '📋 Copier ID', copied: 'Copié !',
    voiceStart: '🎤 Appel Vocal', voiceStop: '🔇 Fin d\'appel', voiceError: 'Accès micro refusé.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var state = {
  status: 'offline', // offline, hosting, connected
  peerId: null,
  conn: null,
  messages: [],
  voiceActive: false,
  call: null
};

var peer = null;
var localStream = null;
var isUpdating = false; // flag to prevent infinite loops during editor sync

function injectPeerJS(callback) {
  if (window.Peer) { callback(); return; }
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

function initPeer(isHost, partnerId) {
  if(!window.Peer) return;
  peer = new Peer({ debug: 2 });
  
  peer.on('open', function(id) {
    state.peerId = id;
    if(isHost) {
      state.status = 'hosting';
      renderCollabTab();
    } else {
      connectToPartner(partnerId);
    }
  });

  peer.on('connection', function(c) {
    // When someone connects to us (Host receives connection)
    if(state.conn && state.conn.open) { c.close(); return; } // already connected
    setupConnection(c);
  });

  peer.on('call', function(call) {
    if(!localStream) {
       navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
         localStream = stream;
         state.voiceActive = true;
         call.answer(stream);
         setupCallEvent(call);
       }).catch(function(err){
         console.error(err);
         if(window.showToast) window.showToast(t('voiceError'));
       });
    } else {
       call.answer(localStream);
       setupCallEvent(call);
    }
  });

  peer.on('disconnected', function() { state.status = 'offline'; renderCollabTab(); });
  peer.on('error', function(err) { alert('Collab Error: ' + err.message); state.status='offline'; renderCollabTab(); });
}

function connectToPartner(id) {
  var c = peer.connect(id, { reliable: true });
  setupConnection(c);
}

function setupConnection(c) {
  state.conn = c;
  c.on('open', function() {
    state.status = 'connected';
    if(window.showToast) window.showToast(t('connected'));
    
    // If I am the host, send my code immediately
    if(window.editor && state.conn.peer) {
      sendData({ type: 'code_sync', code: window.editor.getValue() });
    }
    renderCollabTab();
  });

  c.on('data', function(data) {
    if(data.type === 'chat') {
      state.messages.push({ sender: 'partner', text: data.text });
      renderCollabTab();
    }
    else if(data.type === 'code_sync' && window.editor) {
      if(window.editor.getValue() !== data.code) {
        isUpdating = true;
        var pos = window.editor.getPosition();
        window.editor.setValue(data.code);
        window.editor.setPosition(pos); // restore cursor
        if(window.runPreview) window.runPreview();
        setTimeout(function(){ isUpdating = false; }, 50);
      }
    }
  });

  c.on('close', function() {
    state.status = 'offline';
    state.conn = null;
    if(state.call) { state.call.close(); state.call = null; }
    if(localStream) { localStream.getTracks().forEach(function(t){t.stop();}); localStream = null; }
    state.voiceActive = false;
    if(window.showToast) window.showToast(t('disconnected'));
    renderCollabTab();
  });
}

function sendData(data) {
  if(state.conn && state.conn.open) {
    state.conn.send(data);
  }
}

function sendChat(msg) {
  if(!msg || !state.conn) return;
  state.messages.push({ sender: 'me', text: msg });
  sendData({ type: 'chat', text: msg });
  renderCollabTab();
}

function setupCallEvent(call) {
  state.call = call;
  call.on('stream', function(remoteStream) {
    var audio = document.getElementById('collab-audio');
    if(!audio) {
      audio = document.createElement('audio');
      audio.id = 'collab-audio';
      audio.autoplay = true;
      document.body.appendChild(audio);
    }
    audio.srcObject = remoteStream;
    renderCollabTab();
  });
  call.on('close', function() {
    state.voiceActive = false;
    state.call = null;
    if(localStream) {
      localStream.getTracks().forEach(function(t){t.stop();});
      localStream = null;
    }
    renderCollabTab();
  });
}

function toggleVoice() {
  if(state.voiceActive && state.call) {
    state.call.close();
    if(localStream) {
      localStream.getTracks().forEach(function(t){t.stop();});
      localStream = null;
    }
    state.voiceActive = false;
    renderCollabTab();
  } else {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      localStream = stream;
      state.voiceActive = true;
      if(state.conn && state.conn.peer) {
        var call = peer.call(state.conn.peer, stream);
        setupCallEvent(call);
      }
      renderCollabTab();
    }).catch(function(err){
      console.error(err);
      if(window.showToast) window.showToast(t('voiceError'));
    });
  }
}

// Hook into Monaco Editor to sync changes
function hookEditorSync() {
  if(!window.editor || window._collabHooked) return;
  window.editor.onDidChangeModelContent(function() {
    if(isUpdating) return;
    if(state.status === 'connected') {
      sendData({ type: 'code_sync', code: window.editor.getValue() });
    }
  });
  window._collabHooked = true;
}

function hostSession() {
  state.status = 'loading';
  renderCollabTab();
  injectPeerJS(function(){ initPeer(true); hookEditorSync(); });
}

function joinSession() {
  var id = document.getElementById('collab-partner-id').value.trim();
  if(!id) return;
  state.status = 'loading';
  renderCollabTab();
  injectPeerJS(function(){ initPeer(false, id); hookEditorSync(); });
}

function renderCollabTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#3b82f6;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';

  if(state.status === 'loading') {
    body.innerHTML = '<div style="text-align:center;padding:20px;color:#94a3b8;font-size:11px;">' + t('loadPeer') + '</div>';
  } 
  else if(state.status === 'offline') {
    var pHost = document.createElement('div');
    pHost.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
    var bHost = document.createElement('button');
    bHost.textContent = t('start');
    bHost.style = 'width:100%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
    bHost.onclick = hostSession;
    pHost.appendChild(bHost);
    body.appendChild(pHost);

    var pJoin = document.createElement('div');
    pJoin.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
    var inpJ = document.createElement('input');
    inpJ.id = 'collab-partner-id';
    inpJ.placeholder = t('partnerId');
    inpJ.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;margin-bottom:8px;outline:none;box-sizing:border-box;';
    var bJoin = document.createElement('button');
    bJoin.textContent = t('join');
    bJoin.style = 'width:100%;background:rgba(59,130,246,0.15);color:#93c5fd;border:1px solid rgba(59,130,246,0.3);border-radius:6px;padding:10px;font-weight:700;font-size:11px;cursor:pointer;';
    bJoin.onclick = joinSession;
    pJoin.appendChild(inpJ); pJoin.appendChild(bJoin);
    body.appendChild(pJoin);
  }
  else if(state.status === 'hosting') {
    var pWait = document.createElement('div');
    pWait.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:15px;text-align:center;';
    pWait.innerHTML = '<div style="font-size:10px;color:#94a3b8;margin-bottom:8px;">' + t('yourId') + '</div>' +
                      '<div style="font-size:14px;color:#3b82f6;font-weight:900;margin-bottom:12px;user-select:all;word-break:break-all;background:#000;padding:8px;border-radius:6px;">' + state.peerId + '</div>';
    
    var bCopy = document.createElement('button');
    bCopy.textContent = t('copy');
    bCopy.style = 'background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px 12px;font-size:10px;cursor:pointer;margin-bottom:12px;';
    bCopy.onclick = function() { navigator.clipboard.writeText(state.peerId); bCopy.textContent = t('copied'); };
    pWait.appendChild(bCopy);
    
    var lWait = document.createElement('div');
    lWait.style = 'font-size:11px;color:#f59e0b;animation:pulse 1.5s infinite;';
    lWait.textContent = t('waiting');
    pWait.appendChild(lWait);
    body.appendChild(pWait);
  }
  else if(state.status === 'connected') {
    var pConn = document.createElement('div');
    pConn.style = 'background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center;';
    
    var tConn = document.createElement('div');
    tConn.style = 'font-size:11px;color:#34d399;font-weight:700;';
    tConn.textContent = t('connected');
    
    var bVoice = document.createElement('button');
    bVoice.textContent = state.voiceActive ? t('voiceStop') : t('voiceStart');
    bVoice.style = state.voiceActive 
      ? 'background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid rgba(239,68,68,0.4);border-radius:6px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;transition:all 0.2s;'
      : 'background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid rgba(59,130,246,0.4);border-radius:6px;padding:4px 10px;font-size:10px;font-weight:700;cursor:pointer;transition:all 0.2s;';
    bVoice.onclick = toggleVoice;
    
    pConn.appendChild(tConn);
    pConn.appendChild(bVoice);
    body.appendChild(pConn);

    var chatSec = document.createElement('div');
    chatSec.style = 'flex:1;display:flex;flex-direction:column;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;overflow:hidden;';
    
    var cMsgs = document.createElement('div');
    cMsgs.style = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;';
    state.messages.forEach(function(m) {
      var d = document.createElement('div');
      var isMe = m.sender === 'me';
      d.style = 'max-width:85%;padding:6px 10px;border-radius:8px;font-size:11px;line-height:1.4;word-break:break-word;' + 
                (isMe ? 'background:#3b82f6;color:#fff;align-self:flex-end;' : 'background:rgba(255,255,255,0.1);color:#cbd5e1;align-self:flex-start;');
      d.textContent = m.text;
      cMsgs.appendChild(d);
    });
    chatSec.appendChild(cMsgs);

    var cInpRow = document.createElement('div');
    cInpRow.style = 'display:flex;border-top:1px solid rgba(255,255,255,0.05);';
    var cInp = document.createElement('input');
    cInp.type = 'text'; cInp.placeholder = t('typeMsg');
    cInp.style = 'flex:1;background:transparent;border:none;padding:10px;color:#fff;font-size:11px;outline:none;';
    cInp.onkeydown = function(e){ if(e.key==='Enter') { sendChat(cInp.value); cInp.value=''; } };
    
    var cBtn = document.createElement('button');
    cBtn.textContent = '➤';
    cBtn.style = 'background:transparent;border:none;color:#3b82f6;padding:0 12px;cursor:pointer;font-size:14px;';
    cBtn.onclick = function() { sendChat(cInp.value); cInp.value=''; };
    
    cInpRow.appendChild(cInp); cInpRow.appendChild(cBtn);
    chatSec.appendChild(cInpRow);
    body.appendChild(chatSec);

    setTimeout(function(){ cMsgs.scrollTop = cMsgs.scrollHeight; }, 50);
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-collab');
    if(el) el.textContent = t('tab');
    var topEl = document.getElementById('lbl-top-collab');
    if(topEl) topEl.textContent = t('tab');
    if(window.activeTab==='collab') renderCollabTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='collab') {
      window.activeTab = 'collab';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-collab');
      if(btn) btn.classList.add('active');
      
      // Update topbar active class
      var topShowroom = document.getElementById('topbar-showroom');
      var topCollab = document.getElementById('topbar-collab');
      if (topShowroom) topShowroom.classList.remove('active');
      if (topCollab) topCollab.classList.add('active');
      
      renderCollabTab(); return;
    } else {
      // Remove active class from topbar Collab button if switching to another tab
      var topCollab = document.getElementById('topbar-collab');
      if (topCollab) topCollab.classList.remove('active');
    }
    if(typeof oRT==='function') oRT(tab);
  };

  // Attach topbar click listener
  var topBtn = document.getElementById('topbar-collab');
  if (topBtn) {
    topBtn.onclick = function() {
      var p = document.getElementById('left-panel');
      if (p && p.classList.contains('collapsed')) {
        var toggleL = document.getElementById('toggle-left');
        if (toggleL) toggleL.click();
      }
      if (window.renderTab) window.renderTab('collab');
    };
  }
});
})();
