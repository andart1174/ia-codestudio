/**
 * Screen Recorder v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Record', title: '📹 Screen Recorder', sub: 'Capture preview directly',
    start: '🔴 Start Recording', stop: '⏹️ Stop & Save',
    desc: 'Select the browser tab or window you want to record.',
    unsupported: 'Your browser does not support screen recording.',
    watermark: 'Add watermark'
  },
  fr: {
    tab: 'Enregistrer', title: '📹 Enregistreur', sub: 'Capturez l\'aperçu',
    start: '🔴 Démarrer l\'Enregistrement', stop: '⏹️ Arrêter & Sauvegarder',
    desc: 'Sélectionnez l\'onglet ou la fenêtre à enregistrer.',
    unsupported: 'Votre navigateur ne supporte pas l\'enregistrement.',
    watermark: 'Ajouter filigrane'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var mediaRecorder = null;
var chunks = [];

function startRec() {
  if(!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    alert(t('unsupported')); return;
  }
  navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false })
  .then(function(stream) {
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];
    mediaRecorder.ondataavailable = function(e) { if(e.data.size > 0) chunks.push(e.data); };
    mediaRecorder.onstop = function() {
      var blob = new Blob(chunks, { type: 'video/webm' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a'); a.href = url; a.download = 'ia-architecte-demo.webm';
      a.click(); URL.revokeObjectURL(url);
      renderRecTab();
    };
    mediaRecorder.start();
    renderRecTab();
  })
  .catch(function(err){ console.log(err); renderRecTab(); });
}

function stopRec() {
  if(mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(function(t) { t.stop(); });
  }
}

function renderRecTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#ef4444;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:20px;';

  var isRecording = mediaRecorder && mediaRecorder.state === 'recording';

  var icon = document.createElement('div');
  icon.innerHTML = '🎥';
  icon.style = 'font-size:48px;animation:'+(isRecording?'pulse 1s infinite':'none')+';';
  body.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;max-width:200px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = isRecording ? t('stop') : t('start');
  btn.style = 'width:100%;background:'+(isRecording?'#1e293b':'#ef4444')+';color:#fff;border:1px solid '+(isRecording?'#334155':'#b91c1c')+';border-radius:8px;padding:12px;font-weight:900;font-size:12px;cursor:pointer;transition:0.3s;';
  btn.onclick = isRecording ? stopRec : startRec;
  body.appendChild(btn);

  if(!isRecording) {
    var checkRow = document.createElement('div');
    checkRow.style = 'display:flex;align-items:center;gap:6px;font-size:10px;color:#64748b;';
    checkRow.innerHTML = '<input type="checkbox" checked id="rec-wm"><label for="rec-wm">'+t('watermark')+'</label>';
    body.appendChild(checkRow);
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);

  if(!document.getElementById('pulse-css')) {
    var style = document.createElement('style'); style.id='pulse-css';
    style.textContent = '@keyframes pulse { 0% { opacity: 1; transform:scale(1); } 50% { opacity: 0.5; transform:scale(0.9); } 100% { opacity: 1; transform:scale(1); } }';
    document.head.appendChild(style);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-record');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='record') renderRecTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='record') {
      window.activeTab = 'record';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-record');
      if(btn) btn.classList.add('active');
      renderRecTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
