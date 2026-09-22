/**
 * Time-Travel DOM Debugger v2.0 — EN/FR
 * Tracks Editor Changes & Rewinds Preview
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Time Travel', title: '⏪ Time-Travel Debugger', sub: 'Code & UI Replay DVR',
    desc: 'Starts a background DVR that records your code changes as you type. Use the slider below to rewind time and instantly see past versions of your UI without losing your current code!',
    start: '🔴 Start Recording',
    stop: '⏹️ Stop Recording',
    restore: '⏪ Restore Editor to this Point',
    recording: 'Recording Active...',
    restored: '✅ Code restored to past state!'
  },
  fr: {
    tab: 'Voyage Temporel', title: '⏪ Débogueur Temporel', sub: 'Replay DVR du Code & UI',
    desc: 'Démarre un DVR en arrière-plan qui enregistre vos modifications de code. Utilisez le curseur pour rembobiner et voir les anciennes versions de l\'UI sans perdre votre code actuel !',
    start: '🔴 Démarrer l\'Enregistrement',
    stop: '⏹️ Arrêter',
    restore: '⏪ Restaurer le Code à ce Point',
    recording: 'Enregistrement Actif...',
    restored: '✅ Code restauré à l\'état passé !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var dvrHistory = [];
var isRecording = false;
var editorListener = null;
var debounceTimer = null;
var isSliding = false;

function startRecording() {
  if (!window.editor) return;
  isRecording = true;
  dvrHistory = [];
  
  // Save initial state
  dvrHistory.push(window.editor.getValue());
  updateUI();

  // Listen to typing
  editorListener = window.editor.onDidChangeModelContent(function() {
    if (isSliding) return; // Don't record if we are time-traveling
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      var code = window.editor.getValue();
      // Only push if different from last
      if (dvrHistory.length === 0 || dvrHistory[dvrHistory.length - 1] !== code) {
        dvrHistory.push(code);
        if (dvrHistory.length > 200) dvrHistory.shift(); // Max 200 states
        updateUI();
      }
    }, 1000); // 1 snapshot per second of typing
  });
}

function stopRecording() {
  isRecording = false;
  if (editorListener) {
    editorListener.dispose();
    editorListener = null;
  }
  updateUI();
}

function previewState(index) {
  if (!dvrHistory[index]) return;
  isSliding = true;
  var code = dvrHistory[index];
  var iframe = document.getElementById('preview-iframe');
  if (iframe) {
    var doc = iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  }
}

function restoreState(index) {
  if (!dvrHistory[index] || !window.editor) return;
  var code = dvrHistory[index];
  isSliding = false;
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(t('restored'));
}

function updateUI() {
  var slider = document.getElementById('tt-slider');
  var count = document.getElementById('tt-count');
  if (slider && count) {
    slider.max = Math.max(0, dvrHistory.length - 1);
    slider.value = slider.max;
    count.textContent = dvrHistory.length + ' States';
  }
  
  var btnStart = document.getElementById('btn-tt-start');
  var btnStop = document.getElementById('btn-tt-stop');
  var statusDiv = document.getElementById('tt-status');
  
  if(btnStart && btnStop && statusDiv) {
    btnStart.style.display = isRecording ? 'none' : 'block';
    btnStop.style.display = isRecording ? 'block' : 'none';
    statusDiv.style.opacity = isRecording ? '1' : '0';
  }
}

function renderTimetravelTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f87171;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '⏪';
  icon.style = 'font-size:40px;margin-bottom:10px;';
  if(isRecording) icon.style.animation = 'pulse 2s infinite';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btnStart = document.createElement('button');
  btnStart.id = 'btn-tt-start';
  btnStart.textContent = t('start');
  btnStart.style = 'width:100%;background:linear-gradient(135deg,#f87171,#f59e0b);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btnStart.onclick = function() { startRecording(); renderTimetravelTab(); };
  sec.appendChild(btnStart);

  var btnStop = document.createElement('button');
  btnStop.id = 'btn-tt-stop';
  btnStop.textContent = t('stop');
  btnStop.style = 'width:100%;background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.4);border-radius:6px;padding:10px;color:#fca5a5;font-weight:900;font-size:11px;cursor:pointer;display:none;';
  btnStop.onclick = function() { stopRecording(); renderTimetravelTab(); };
  sec.appendChild(btnStop);

  var status = document.createElement('div');
  status.id = 'tt-status';
  status.textContent = t('recording');
  status.style = 'margin-top:10px;font-size:10px;color:#f87171;font-weight:bold;opacity:0;transition:opacity 0.3s;';
  sec.appendChild(status);

  body.appendChild(sec);

  // DVR Control Section
  var dvrSec = document.createElement('div');
  dvrSec.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  
  var dvrHdr = document.createElement('div');
  dvrHdr.style = 'display:flex;justify-content:space-between;margin-bottom:10px;';
  dvrHdr.innerHTML = '<span style="font-size:10px;color:#cbd5e1;font-weight:bold;">DVR Timeline</span><span id="tt-count" style="font-size:10px;color:#38bdf8;font-weight:bold;">0 States</span>';
  dvrSec.appendChild(dvrHdr);

  var slider = document.createElement('input');
  slider.type = 'range';
  slider.id = 'tt-slider';
  slider.min = '0';
  slider.max = '0';
  slider.value = '0';
  slider.style = 'width:100%;cursor:pointer;margin-bottom:15px;';
  slider.oninput = function(e) {
    var val = parseInt(e.target.value);
    previewState(val);
  };
  slider.onchange = function(e) {
    // When they release the slider, we stay in preview mode. They must hit restore to keep it, or type to break out.
  };
  dvrSec.appendChild(slider);

  var btnRestore = document.createElement('button');
  btnRestore.textContent = t('restore');
  btnRestore.style = 'width:100%;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);color:#7dd3fc;border-radius:6px;padding:8px;font-weight:bold;font-size:10px;cursor:pointer;';
  btnRestore.onclick = function() {
    var val = parseInt(document.getElementById('tt-slider').value);
    restoreState(val);
  };
  dvrSec.appendChild(btnRestore);

  body.appendChild(dvrSec);
  wrap.appendChild(body);
  parent.appendChild(wrap);

  updateUI();
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-timetravel');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='timetravel') renderTimetravelTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='timetravel') {
      window.activeTab = 'timetravel';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-timetravel');
      if(btn) btn.classList.add('active');
      renderTimetravelTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
