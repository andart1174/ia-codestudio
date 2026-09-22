/**
 * Time Machine v1.0 — EN/FR
 * Local Git-like version control and timeline
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Timeline', title: '🕰️ Time Machine', sub: 'Local Version Control',
    takeSnap: '📸 Take Snapshot', snapName: 'Snapshot Name (e.g. "Added Navbar")',
    timeline: 'Your Timeline', empty: 'No snapshots yet.',
    restore: '⏪ Restore This Version', restored: '✅ Version restored!',
    delete: '❌ Delete', deleted: '🗑️ Snapshot deleted.',
    autoSave: 'Auto-snapshot every 5 mins'
  },
  fr: {
    tab: 'Historique', title: '🕰️ Machine à Remonter le Temps', sub: 'Contrôle de Version Local',
    takeSnap: '📸 Prendre un Snapshot', snapName: 'Nom (ex: "Ajout Navbar")',
    timeline: 'Votre Historique', empty: 'Aucun snapshot pour le moment.',
    restore: '⏪ Restaurer cette Version', restored: '✅ Version restaurée !',
    delete: '❌ Supprimer', deleted: '🗑️ Snapshot supprimé.',
    autoSave: 'Snapshot auto. toutes les 5 min'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var STORAGE_KEY = 'ia_time_machine';
var state = {
  snapshots: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  autoEnabled: false
};

var autoInterval = null;

function saveStorage() {
  // limit to 30 snapshots to avoid crashing localStorage
  if(state.snapshots.length > 30) state.snapshots.splice(30, state.snapshots.length - 30);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.snapshots));
  } catch(e) {
    alert('Storage limit reached! Please delete some old snapshots.');
  }
}

function takeSnapshot(auto) {
  if(!window.editor) return;
  var code = window.editor.getValue();
  var nameInp = document.getElementById('tm-snap-name');
  var name = auto ? 'Auto-Save' : (nameInp && nameInp.value ? nameInp.value : 'Manual Snapshot');
  
  // don't save if code hasn't changed since last snapshot
  if(state.snapshots.length > 0 && state.snapshots[0].code === code) return;

  var snap = {
    id: 'snap_' + Date.now(),
    name: name,
    date: new Date().toISOString(),
    code: code
  };

  state.snapshots.unshift(snap);
  saveStorage();
  if(nameInp) nameInp.value = '';
  renderTMTab();
}

function toggleAutoSave(cb) {
  state.autoEnabled = cb.checked;
  if(state.autoEnabled) {
    autoInterval = setInterval(function(){ takeSnapshot(true); }, 5 * 60000); // 5 mins
  } else {
    clearInterval(autoInterval);
  }
}

function restoreSnapshot(id) {
  var snap = state.snapshots.find(function(s){ return s.id === id; });
  if(snap && window.editor) {
    window.editor.setValue(snap.code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('restored'));
  }
}

function deleteSnapshot(id) {
  state.snapshots = state.snapshots.filter(function(s){ return s.id !== id; });
  saveStorage();
  if(window.showToast) window.showToast(t('deleted'));
  renderTMTab();
}

function renderTMTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(217,70,239,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#d946ef;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var form = document.createElement('div');
  form.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  
  var inp = document.createElement('input');
  inp.id = 'tm-snap-name';
  inp.placeholder = t('snapName');
  inp.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;margin-bottom:8px;box-sizing:border-box;';
  form.appendChild(inp);

  var btn = document.createElement('button');
  btn.textContent = t('takeSnap');
  btn.style = 'width:100%;background:linear-gradient(135deg,#d946ef,#c026d3);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:8px;';
  btn.onclick = function(){ takeSnapshot(false); };
  form.appendChild(btn);

  var autoRow = document.createElement('div');
  autoRow.style = 'display:flex;align-items:center;gap:6px;font-size:10px;color:#94a3b8;';
  var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = 'tm-auto';
  cb.checked = state.autoEnabled;
  cb.onchange = function(){ toggleAutoSave(this); };
  autoRow.appendChild(cb);
  var lbl = document.createElement('label'); lbl.htmlFor='tm-auto'; lbl.textContent = t('autoSave');
  autoRow.appendChild(lbl);
  form.appendChild(autoRow);

  body.appendChild(form);

  var lSec = document.createElement('div');
  lSec.innerHTML = '<div style="font-size:9px;font-weight:900;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">' + t('timeline') + '</div>';
  
  var list = document.createElement('div');
  list.style = 'display:flex;flex-direction:column;gap:0;border-left:2px solid rgba(217,70,239,0.3);margin-left:8px;padding-left:12px;';
  
  if(state.snapshots.length === 0) {
    list.innerHTML = '<div style="font-size:10px;color:#64748b;font-style:italic;">' + t('empty') + '</div>';
  } else {
    state.snapshots.forEach(function(s, idx) {
      var item = document.createElement('div');
      item.style = 'position:relative;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:10px;margin-bottom:12px;';
      
      var dot = document.createElement('div');
      dot.style = 'position:absolute;left:-17px;top:14px;width:8px;height:8px;background:#d946ef;border-radius:50%;border:2px solid #0f172a;';
      item.appendChild(dot);

      var d = new Date(s.date);
      var timeStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

      var tRow = document.createElement('div');
      tRow.style = 'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;';
      tRow.innerHTML = '<div><div style="font-size:11px;font-weight:900;color:#f0abfc;margin-bottom:2px;">'+s.name+'</div><div style="font-size:9px;color:#64748b;">'+timeStr+'</div></div>';
      
      var bDel = document.createElement('button');
      bDel.textContent = '✕';
      bDel.style = 'background:transparent;border:none;color:#ef4444;cursor:pointer;font-size:10px;padding:0;';
      bDel.onclick = function(){ deleteSnapshot(s.id); };
      tRow.appendChild(bDel);
      item.appendChild(tRow);

      var bRes = document.createElement('button');
      bRes.textContent = t('restore');
      bRes.style = 'width:100%;background:rgba(217,70,239,0.1);color:#e879f9;border:1px solid rgba(217,70,239,0.3);border-radius:4px;padding:6px;font-weight:700;font-size:9px;cursor:pointer;';
      bRes.onclick = function(){ restoreSnapshot(s.id); };
      item.appendChild(bRes);

      list.appendChild(item);
    });
  }
  lSec.appendChild(list);
  body.appendChild(lSec);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-tm');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='tm') renderTMTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='tm') {
      window.activeTab = 'tm';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-tm');
      if(btn) btn.classList.add('active');
      renderTMTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
