(function() {
'use strict';
var STORAGE_KEY = 'ia_achievements';
var XP_KEY = 'ia_xp';

var ALL_ACHIEVEMENTS = [
  { id:'first_gen',    icon:'🚀', xp:50,  en:'First Launch',     fr:'Premier Lancement',   en_d:'Generate your first AI component',        fr_d:'Générez votre premier composant IA' },
  { id:'lines_100',    icon:'📝', xp:30,  en:'Code Writer',      fr:'Codeur',              en_d:'Write 100+ lines of code',                fr_d:'Écrivez 100+ lignes de code' },
  { id:'lines_500',    icon:'✍️', xp:80,  en:'Prolific Coder',   fr:'Codeur Prolifique',   en_d:'Write 500+ lines of code',                fr_d:'Écrivez 500+ lignes' },
  { id:'voice_used',   icon:'🎙️', xp:40,  en:'Voice Commander',  fr:'Commandant Vocal',    en_d:'Use Voice AI for the first time',          fr_d:'Utilisez Voice AI' },
  { id:'security_90',  icon:'🛡️', xp:100, en:'Security Master',  fr:'Maître Sécurité',     en_d:'Achieve security score 90+',              fr_d:'Score sécurité 90+' },
  { id:'palette_gen',  icon:'🎨', xp:30,  en:'Color Artist',     fr:'Artiste Couleur',     en_d:'Generate your first color palette',       fr_d:'Générez une palette' },
  { id:'translate',    icon:'🌍', xp:40,  en:'Polyglot',         fr:'Polyglotte',          en_d:'Translate your app',                      fr_d:'Traduisez votre app' },
  { id:'present',      icon:'🎤', xp:50,  en:'Presenter',        fr:'Présentateur',        en_d:'Launch your first presentation',          fr_d:'Lancez une présentation' },
  { id:'svg_gen',      icon:'✒️', xp:25,  en:'Icon Crafter',     fr:'Créateur Icônes',     en_d:'Generate your first SVG icon',            fr_d:'Générez une icône SVG' },
  { id:'doc_gen',      icon:'📚', xp:35,  en:'Documenter',       fr:'Documenteur',         en_d:'Generate your first README',              fr_d:'Générez un README' },
  { id:'widget_drop',  icon:'🎪', xp:30,  en:'Widget Dropper',   fr:'Poseur de Widgets',   en_d:'Inject your first widget',                fr_d:'Injectez un widget' },
  { id:'clone_style',  icon:'🎭', xp:60,  en:'Style Thief',      fr:'Voleur de Style',     en_d:'Clone a website style',                   fr_d:'Clonez un style de site' },
  { id:'export_app',   icon:'📦', xp:55,  en:'Shipper',          fr:'Expéditeur',          en_d:'Export your first app as HTML',           fr_d:'Exportez en HTML' },
  { id:'all_modules',  icon:'🏅', xp:200, en:'Studio Master',    fr:'Maître Studio',       en_d:'Open every module at least once',         fr_d:'Ouvrez chaque module' }
];

function getUnlocked() { try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');}catch(e){return[];} }
function getXP() { return parseInt(localStorage.getItem(XP_KEY)||'0'); }
function getLevel(xp) {
  if(xp<100) return {n:1,en:'Apprentice',fr:'Apprenti',next:100};
  if(xp<300) return {n:2,en:'Developer',fr:'Développeur',next:300};
  if(xp<600) return {n:3,en:'Engineer',fr:'Ingénieur',next:600};
  if(xp<1000) return {n:4,en:'Architect',fr:'Architecte',next:1000};
  return {n:5,en:'IA Master',fr:'Maître IA',next:9999};
}
var LEVEL_ICONS = ['','🌱','💻','⚙️','🏗️','🤖'];

window.unlockAchievement = function(id) {
  var unlocked = getUnlocked();
  if(unlocked.indexOf(id)!==-1) return;
  var ach = ALL_ACHIEVEMENTS.filter(function(a){return a.id===id;})[0];
  if(!ach) return;
  unlocked.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  var xp = getXP() + ach.xp;
  localStorage.setItem(XP_KEY, xp);
  showToastAch(ach, xp);
  var badge = document.getElementById('ach-badge');
  if(badge) badge.textContent = unlocked.length;
};

function showToastAch(ach, xp) {
  var isFr = window.lang==='fr';
  if(!document.getElementById('ach-anim')) {
    var st=document.createElement('style'); st.id='ach-anim';
    st.textContent='@keyframes achIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes achOut{to{opacity:0;transform:translateX(120%)}}';
    document.head.appendChild(st);
  }
  var t=document.createElement('div');
  t.style='position:fixed;bottom:90px;right:24px;background:linear-gradient(135deg,#1e1035,#2d1060);border:1px solid #8b5cf6;border-radius:12px;padding:14px 18px;z-index:9999999;font-family:sans-serif;box-shadow:0 15px 40px rgba(139,92,246,0.5);max-width:280px;animation:achIn 0.4s ease;';
  t.innerHTML='<div style="display:flex;align-items:center;gap:10px;"><div style="font-size:28px;">'+ach.icon+'</div><div><div style="font-size:9px;font-weight:bold;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;">🏆 '+(isFr?'Succès Débloqué !':'Achievement Unlocked!')+'</div><div style="font-size:13px;font-weight:900;color:#fff;margin:2px 0;">'+(isFr?ach.fr:ach.en)+'</div><div style="font-size:10px;color:#c4b5fd;">+'+ach.xp+' XP • Total: '+xp+' XP</div></div></div>';
  document.body.appendChild(t);
  setTimeout(function(){t.style.animation='achOut 0.4s ease forwards';setTimeout(function(){t.remove();},400);},3500);
}

function renderAchTab() {
  var parent=document.getElementById('left-body'); if(!parent) return;
  parent.innerHTML='';
  var unlocked=getUnlocked(), xp=getXP(), level=getLevel(xp), isFr=window.lang==='fr';
  var wrap=document.createElement('div'); wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';
  var hdr=document.createElement('div'); hdr.style='padding:12px 14px 8px;border-bottom:1px solid rgba(139,92,246,0.25);flex-shrink:0;';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c4b5fd;">🏆 '+(isFr?'Succès':'Achievements')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+unlocked.length+'/'+ALL_ACHIEVEMENTS.length+' '+(isFr?'débloqués':'unlocked')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div'); body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Level card
  var lvPct=Math.min(100,Math.round((xp/level.next)*100));
  var lc=document.createElement('div'); lc.style='background:linear-gradient(135deg,#1e1035,#2d1060);border:1px solid #8b5cf6;border-radius:10px;padding:14px;';
  lc.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div><div style="font-size:11px;font-weight:900;color:#fff;">Level '+level.n+' — '+(isFr?level.fr:level.en)+'</div><div style="font-size:9px;color:#a78bfa;">'+xp+' XP'+(level.n<5?' / '+level.next+' XP':'')+'</div></div><div style="font-size:28px;">'+LEVEL_ICONS[level.n]+'</div></div><div style="background:#0f172a;border-radius:6px;height:8px;overflow:hidden;"><div style="width:'+lvPct+'%;height:100%;background:linear-gradient(90deg,#8b5cf6,#c4b5fd);border-radius:6px;"></div></div>';
  body.appendChild(lc);

  ALL_ACHIEVEMENTS.forEach(function(ach) {
    var isUnlocked=unlocked.indexOf(ach.id)!==-1;
    var c=document.createElement('div');
    c.style='display:flex;align-items:center;gap:10px;background:'+(isUnlocked?'#1e1035':'#0f172a')+';border:1px solid '+(isUnlocked?'#8b5cf6':'#1e293b')+';border-radius:8px;padding:8px 10px;'+(isUnlocked?'':'opacity:0.45;');
    c.innerHTML='<div style="font-size:18px;filter:'+(isUnlocked?'none':'grayscale(1)')+';">'+ach.icon+'</div><div style="flex:1;"><div style="font-size:10px;font-weight:bold;color:'+(isUnlocked?'#e2e8f0':'#475569')+';">'+(isFr?ach.fr:ach.en)+'</div><div style="font-size:9px;color:'+(isUnlocked?'#94a3b8':'#334155')+';">'+(isFr?ach.fr_d:ach.en_d)+'</div></div><div style="font-size:9px;font-weight:bold;color:'+(isUnlocked?'#a78bfa':'#334155')+';">+'+ach.xp+' XP</div>';
    body.appendChild(c);
  });

  var rb=document.createElement('button'); rb.textContent=isFr?'🔄 Réinitialiser':'🔄 Reset'; rb.style='width:100%;background:none;border:1px dashed #334155;color:#475569;padding:6px;border-radius:6px;font-size:9px;cursor:pointer;margin-top:4px;';
  rb.onclick=function(){if(confirm(isFr?'Réinitialiser ?':'Reset all?')){localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(XP_KEY);renderAchTab();}};
  body.appendChild(rb);
  wrap.appendChild(body); parent.appendChild(wrap);
}

function buildFAB() {
  if(document.getElementById('ach-fab')) return;
  var f=document.createElement('button'); f.id='ach-fab';
  f.style='position:fixed;bottom:84px;right:84px;width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-size:16px;box-shadow:0 6px 20px rgba(124,58,237,0.5);z-index:99998;display:flex;align-items:center;justify-content:center;transition:0.3s;position:fixed;';
  f.innerHTML='🏆<span id="ach-badge" style="position:absolute;top:-3px;right:-3px;background:#ef4444;color:#fff;font-size:8px;font-weight:bold;min-width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0f172a;">'+getUnlocked().length+'</span>';
  f.onmouseover=function(){this.style.transform='scale(1.1)';};
  f.onmouseout=function(){this.style.transform='scale(1)';};
  f.onclick=function(){if(window.renderTab)window.renderTab('achievements');};
  document.body.appendChild(f);
}

function hookEvents() {
  var openedTabs=JSON.parse(localStorage.getItem('ia_tabs_opened')||'[]');
  var ALL_TABS=['voice','nodelogic','dbarch','autodocs','svgstudio','social','promo','audit','iaultra','iapro','onemin','tm','vision','colors','i18n','present','security'];
  var prevRT=window.renderTab;
  window.renderTab=function(tab) {
    if(typeof prevRT==='function') prevRT(tab);
    if(openedTabs.indexOf(tab)===-1){openedTabs.push(tab);localStorage.setItem('ia_tabs_opened',JSON.stringify(openedTabs));}
    if(tab==='voice')    window.unlockAchievement('voice_used');
    if(tab==='svgstudio')window.unlockAchievement('svg_gen');
    if(tab==='present')  window.unlockAchievement('present');
    if(tab==='colors')   window.unlockAchievement('palette_gen');
    if(tab==='i18n')     window.unlockAchievement('translate');
    if(openedTabs.length>=ALL_TABS.length) window.unlockAchievement('all_modules');
  };
  if(window.editor && window.editor.onDidChangeModelContent) {
    window.editor.onDidChangeModelContent(function(){
      var lines=window.editor.getModel().getLineCount();
      if(lines>=100) window.unlockAchievement('lines_100');
      if(lines>=500) window.unlockAchievement('lines_500');
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(buildFAB, 1200);
  setTimeout(hookEvents, 3000);
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-achievements');if(el)el.textContent=(window.lang==='fr'?'Succès':'Badges');if(window.activeTab==='achievements')renderAchTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='achievements'){window.activeTab='achievements';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-achievements');if(el)el.classList.add('active');renderAchTab();return;}if(typeof oRT==='function')oRT(tab);};
});
if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(buildFAB,1200);setTimeout(hookEvents,3000);}
})();
