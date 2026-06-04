/**
 * Project Manager v1.0 — EN/FR
 * LocalStorage based multi-project management
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Projects', title: '📁 Project Manager', sub: 'Save and manage your workspaces',
    saveNew: '💾 Save Current as New', saveBtn: 'Save',
    projName: 'Project Name', defaultName: 'Untitled Project',
    myProj: 'My Projects', empty: 'No projects saved yet.',
    load: 'Load', delete: 'Delete', download: 'Download',
    loaded: '✅ Project loaded!', saved: '✅ Project saved!', deleted: '🗑️ Project deleted.',
    confirmDel: 'Are you sure you want to delete this project?',
    overwrite: '🔄 Update Current'
  },
  fr: {
    tab: 'Projets', title: '📁 Gestionnaire de Projets', sub: 'Sauvegardez et gérez vos espaces',
    saveNew: '💾 Sauvegarder comme Nouveau', saveBtn: 'Sauvegarder',
    projName: 'Nom du Projet', defaultName: 'Projet Sans Titre',
    myProj: 'Mes Projets', empty: 'Aucun projet sauvegardé.',
    load: 'Ouvrir', delete: 'Supprimer', download: 'Télécharger',
    loaded: '✅ Projet chargé !', saved: '✅ Projet sauvegardé !', deleted: '🗑️ Projet supprimé.',
    confirmDel: 'Voulez-vous vraiment supprimer ce projet ?',
    overwrite: '🔄 Mettre à jour'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var STORAGE_KEY = 'ia_pro_projects';
var state = {
  projects: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  currentId: null
};

function getCode() { return window.editor ? window.editor.getValue() : ''; }
function saveToStorage() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects)); }

function createProject() {
  var code = getCode();
  var nameInp = document.getElementById('pm-new-name');
  var name = (nameInp ? nameInp.value.trim() : '') || t('defaultName');
  
  var newProj = {
    id: 'proj_' + Date.now() + '_' + Math.floor(Math.random()*1000),
    name: name,
    date: new Date().toISOString(),
    code: code
  };
  
  state.projects.unshift(newProj);
  state.currentId = newProj.id;
  saveToStorage();
  
  if(window.showToast) window.showToast(t('saved'));
  if(nameInp) nameInp.value = '';
  renderPMTab();
}

function updateProject() {
  if(!state.currentId) return;
  var code = getCode();
  var idx = state.projects.findIndex(function(p){ return p.id === state.currentId; });
  if(idx > -1) {
    state.projects[idx].code = code;
    state.projects[idx].date = new Date().toISOString();
    saveToStorage();
    if(window.showToast) window.showToast(t('saved'));
    renderPMTab();
  }
}

function loadProject(id) {
  var proj = state.projects.find(function(p){ return p.id === id; });
  if(proj && window.editor) {
    window.editor.setValue(proj.code);
    state.currentId = id;
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('loaded'));
    renderPMTab();
  }
}

function deleteProject(id) {
  if(confirm(t('confirmDel'))) {
    state.projects = state.projects.filter(function(p){ return p.id !== id; });
    if(state.currentId === id) state.currentId = null;
    saveToStorage();
    if(window.showToast) window.showToast(t('deleted'));
    renderPMTab();
  }
}

function downloadProject(id) {
  var proj = state.projects.find(function(p){ return p.id === id; });
  if(!proj) return;
  var blob = new Blob([proj.code], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = proj.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(iso) {
  var d = new Date(iso);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function renderPMTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#a855f7;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  // New Project Form
  var form = document.createElement('div');
  form.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;';
  
  var fTitle = document.createElement('div');
  fTitle.style = 'font-size:9px;font-weight:900;color:#a855f7;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
  fTitle.textContent = t('saveNew');
  form.appendChild(fTitle);

  var inp = document.createElement('input');
  inp.id = 'pm-new-name';
  inp.type = 'text';
  inp.placeholder = t('projName');
  inp.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:8px;color:#fff;font-size:11px;outline:none;margin-bottom:8px;box-sizing:border-box;';
  form.appendChild(inp);

  var btnRow = document.createElement('div');
  btnRow.style = 'display:flex;gap:6px;';

  var btnSave = document.createElement('button');
  btnSave.textContent = t('saveBtn');
  btnSave.style = 'flex:1;background:linear-gradient(135deg,#a855f7,#7e22ce);border:none;border-radius:6px;padding:8px;color:#fff;font-weight:900;font-size:10px;cursor:pointer;';
  btnSave.onclick = createProject;
  btnRow.appendChild(btnSave);

  if(state.currentId) {
    var btnUpd = document.createElement('button');
    btnUpd.textContent = t('overwrite');
    btnUpd.style = 'flex:1;background:rgba(168,85,247,0.15);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:8px;font-weight:700;font-size:10px;cursor:pointer;';
    btnUpd.onclick = updateProject;
    btnRow.appendChild(btnUpd);
  }

  form.appendChild(btnRow);
  body.appendChild(form);

  // List of Projects
  var listSec = document.createElement('div');
  var lTitle = document.createElement('div');
  lTitle.style = 'font-size:9px;font-weight:900;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;';
  lTitle.textContent = t('myProj') + ' (' + state.projects.length + ')';
  listSec.appendChild(lTitle);

  var list = document.createElement('div');
  list.style = 'display:flex;flex-direction:column;gap:8px;';
  
  if(state.projects.length === 0) {
    list.innerHTML = '<div style="font-size:10px;color:#64748b;font-style:italic;">' + t('empty') + '</div>';
  } else {
    state.projects.forEach(function(p) {
      var isActive = (p.id === state.currentId);
      var item = document.createElement('div');
      item.style = 'background:'+(isActive?'rgba(168,85,247,0.1)':'rgba(255,255,255,0.02)')+';border:1px solid '+(isActive?'rgba(168,85,247,0.3)':'rgba(255,255,255,0.05)')+';border-radius:8px;padding:10px;transition:0.2s;';
      
      var topRow = document.createElement('div');
      topRow.style = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';
      topRow.innerHTML = '<div style="font-size:11px;font-weight:900;color:'+(isActive?'#d8b4fe':'#fff')+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;">' + (isActive?'▶ ':'') + p.name + '</div><div style="font-size:9px;color:#64748b;">' + formatDate(p.date) + '</div>';
      item.appendChild(topRow);

      var actions = document.createElement('div');
      actions.style = 'display:flex;gap:4px;';
      
      var lBtn = document.createElement('button'); lBtn.textContent = t('load');
      lBtn.style = 'flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:4px;color:#fff;font-size:9px;font-weight:700;cursor:pointer;';
      lBtn.onclick = function(){ loadProject(p.id); };
      
      var dBtn = document.createElement('button'); dBtn.textContent = '⬇';
      dBtn.title = t('download');
      dBtn.style = 'background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);border-radius:4px;width:24px;color:#38bdf8;font-size:10px;cursor:pointer;';
      dBtn.onclick = function(){ downloadProject(p.id); };

      var xBtn = document.createElement('button'); xBtn.textContent = '✕';
      xBtn.title = t('delete');
      xBtn.style = 'background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:4px;width:24px;color:#ef4444;font-size:10px;cursor:pointer;';
      xBtn.onclick = function(){ deleteProject(p.id); };

      if(!isActive) actions.appendChild(lBtn);
      actions.appendChild(dBtn);
      actions.appendChild(xBtn);

      item.appendChild(actions);
      list.appendChild(item);
    });
  }

  listSec.appendChild(list);
  body.appendChild(listSec);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-pm');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='pm') renderPMTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='pm') {
      window.activeTab = 'pm';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-pm');
      if(btn) btn.classList.add('active');
      renderPMTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
