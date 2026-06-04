/**
 * GitHub Sync v1.0 — EN/FR
 * Import/Export code from GitHub repos via personal access token
 */
(function(){
'use strict';
var TX={
  en:{tab:'GitHub',title:'🔄 GitHub Sync',sub:'Import & Export via GitHub API',
      token:'Personal Access Token:',tokenPh:'ghp_xxxxxxxxxxxxxxxxxxxx',
      repo:'Repository (owner/repo):',repoPh:'username/my-repo',
      branch:'Branch:',file:'File path:',filePh:'index.html',
      btnLoad:'⬇ Load from GitHub',btnPush:'⬆ Push to GitHub',btnSave:'💾 Save Config',
      loading:'⏳ Loading...',pushing:'⏳ Pushing...',
      loaded:'✅ File loaded!',pushed:'✅ Pushed to GitHub!',
      errToken:'❌ Token required.',errRepo:'❌ Repo required.',errFile:'❌ File path required.',
      commitMsg:'Commit message:',commitPh:'Update via IA Architecte Studio',
      tip:'Your token is stored locally and never sent to any server except api.github.com.',
      recentFiles:'Recent files:',raw:'Raw URL:'},
  fr:{tab:'GitHub',title:'🔄 GitHub Sync',sub:'Importez & Exportez via l\'API GitHub',
      token:'Token d\'accès personnel :',tokenPh:'ghp_xxxxxxxxxxxxxxxxxxxx',
      repo:'Dépôt (owner/repo) :',repoPh:'username/mon-repo',
      branch:'Branche :',file:'Chemin du fichier :',filePh:'index.html',
      btnLoad:'⬇ Charger depuis GitHub',btnPush:'⬆ Pousser vers GitHub',btnSave:'💾 Sauver Config',
      loading:'⏳ Chargement...',pushing:'⏳ Push en cours...',
      loaded:'✅ Fichier chargé !',pushed:'✅ Poussé vers GitHub !',
      errToken:'❌ Token requis.',errRepo:'❌ Dépôt requis.',errFile:'❌ Chemin requis.',
      commitMsg:'Message de commit :',commitPh:'Mise à jour via IA Architecte Studio',
      tip:'Votre token est stocké localement et jamais envoyé ailleurs qu\'à api.github.com.',
      recentFiles:'Fichiers récents :',raw:'URL brute :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var CFG_KEY='ia_github_cfg';
function loadCfg(){try{return JSON.parse(localStorage.getItem(CFG_KEY)||'{}');}catch(e){return{};}}
function saveCfg(c){try{localStorage.setItem(CFG_KEY,JSON.stringify(c));}catch(e){}}

var cfg=loadCfg();
var lastSha='';

function mkField(labelText,id,ph,type,val){
  var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
  var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=labelText;
  var inp=document.createElement(type==='textarea'?'textarea':'input');
  if(type!=='textarea'){inp.type=type||'text';}
  inp.id=id;inp.placeholder=ph||'';inp.value=val||'';
  inp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;font-family:inherit;'+(type==='textarea'?'resize:vertical;':'');
  if(type==='textarea')inp.rows=2;
  d.appendChild(l);d.appendChild(inp);return d;
}

function getVal(id){return((document.getElementById(id)||{}).value||'').trim();}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.12);flex-shrink:0;background:linear-gradient(135deg,rgba(30,30,30,0.9),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#e2e8f0;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');
  tip.style='font-size:9.5px;color:#94a3b8;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:6px;padding:8px;line-height:1.5;';
  tip.textContent='🔒 '+t('tip');
  body.appendChild(tip);

  body.appendChild(mkField(t('token'),'gh-token',t('tokenPh'),'password',cfg.token||''));
  body.appendChild(mkField(t('repo'),'gh-repo',t('repoPh'),'text',cfg.repo||''));
  var brow=document.createElement('div');brow.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  brow.appendChild(mkField(t('branch'),'gh-branch','main','text',cfg.branch||'main'));
  brow.appendChild(mkField(t('file'),'gh-file',t('filePh'),'text',cfg.file||'index.html'));
  body.appendChild(brow);

  // Save config
  var saveCfgBtn=document.createElement('button');
  saveCfgBtn.innerHTML=t('btnSave');
  saveCfgBtn.style='width:100%;background:rgba(99,102,241,0.12);color:#a78bfa;border:1px solid rgba(99,102,241,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  saveCfgBtn.onclick=function(){
    cfg={token:getVal('gh-token'),repo:getVal('gh-repo'),branch:getVal('gh-branch')||'main',file:getVal('gh-file')||'index.html'};
    saveCfg(cfg);if(window.showToast)window.showToast(t('btnSave'));
  };
  body.appendChild(saveCfgBtn);

  var divider=document.createElement('div');divider.style='height:1px;background:rgba(255,255,255,0.06);';body.appendChild(divider);

  // Load button
  var loadBtn=document.createElement('button');
  loadBtn.innerHTML=t('btnLoad');
  loadBtn.style='width:100%;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  loadBtn.onclick=function(){
    var token=getVal('gh-token'),repo=getVal('gh-repo'),branch=getVal('gh-branch')||'main',file=getVal('gh-file')||'index.html';
    if(!token){if(window.showToast)window.showToast(t('errToken'));return;}
    if(!repo){if(window.showToast)window.showToast(t('errRepo'));return;}
    loadBtn.innerHTML=t('loading');loadBtn.disabled=true;
    fetch('https://api.github.com/repos/'+repo+'/contents/'+file+'?ref='+branch,{
      headers:{'Authorization':'token '+token,'Accept':'application/vnd.github.v3+json'}
    }).then(function(r){return r.json();}).then(function(data){
      if(data.message){if(window.showToast)window.showToast('❌ '+data.message);return;}
      lastSha=data.sha||'';
      var content=atob(data.content.replace(/\n/g,''));
      if(window.editor)window.editor.setValue(content);
      if(window.runPreview)window.runPreview();
      if(window.showToast)window.showToast(t('loaded'));
      // Update raw URL
      var rawEl=document.getElementById('gh-raw-url');
      if(rawEl){rawEl.textContent=data.html_url||'';}
    }).catch(function(e){if(window.showToast)window.showToast('❌ '+e.message);})
    .finally(function(){loadBtn.innerHTML=t('btnLoad');loadBtn.disabled=false;});
  };
  body.appendChild(loadBtn);

  // Raw URL display
  var rawLabel=document.createElement('div');rawLabel.style='font-size:9px;color:#64748b;';rawLabel.textContent=t('raw');
  var rawUrl=document.createElement('div');rawUrl.id='gh-raw-url';rawUrl.style='font-size:8.5px;color:#94a3b8;word-break:break-all;background:rgba(255,255,255,0.02);border-radius:4px;padding:4px 6px;min-height:16px;';rawUrl.textContent='—';
  body.appendChild(rawLabel);body.appendChild(rawUrl);

  // Commit message + Push
  body.appendChild(mkField(t('commitMsg'),'gh-commit',t('commitPh'),'textarea',''));
  var pushBtn=document.createElement('button');
  pushBtn.innerHTML=t('btnPush');
  pushBtn.style='width:100%;background:linear-gradient(135deg,#1f2937,#374151);color:#e2e8f0;border:1px solid rgba(255,255,255,0.15);padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  pushBtn.onclick=function(){
    var token=getVal('gh-token'),repo=getVal('gh-repo'),branch=getVal('gh-branch')||'main',file=getVal('gh-file')||'index.html';
    var msg=getVal('gh-commit')||t('commitPh');
    if(!token||!repo){if(window.showToast)window.showToast(t('errToken'));return;}
    if(!window.editor)return;
    var code=window.editor.getValue();
    pushBtn.innerHTML=t('pushing');pushBtn.disabled=true;
    var encoded=btoa(unescape(encodeURIComponent(code)));
    var body2={message:msg,content:encoded,branch:branch};
    if(lastSha)body2.sha=lastSha;
    fetch('https://api.github.com/repos/'+repo+'/contents/'+file,{
      method:'PUT',
      headers:{'Authorization':'token '+token,'Accept':'application/vnd.github.v3+json','Content-Type':'application/json'},
      body:JSON.stringify(body2)
    }).then(function(r){return r.json();}).then(function(data){
      if(data.content){lastSha=data.content.sha||lastSha;if(window.showToast)window.showToast(t('pushed'));}
      else if(data.message){if(window.showToast)window.showToast('❌ '+data.message);}
    }).catch(function(e){if(window.showToast)window.showToast('❌ '+e.message);})
    .finally(function(){pushBtn.innerHTML=t('btnPush');pushBtn.disabled=false;});
  };
  body.appendChild(pushBtn);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-githubsync');if(el)el.textContent=t('tab');if(window.activeTab==='githubsync')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='githubsync'){window.activeTab='githubsync';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-githubsync');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
