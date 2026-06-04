/**
 * Code Timer / Pomodoro v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Pomodoro',title:'⏱️ Code Timer / Pomodoro',sub:'Track coding sessions & stay focused',
      work:'Work',shortBreak:'Short Break',longBreak:'Long Break',
      btnStart:'▶ Start',btnPause:'⏸ Pause',btnReset:'↺ Reset',btnSkip:'⏭ Skip',
      session:'Session',tomatoes:'Pomodoros',totalTime:'Total Coded',today:'Today',
      settings:'Settings:',workMin:'Work (min):',breakMin:'Break (min):',longMin:'Long Break (min):',
      stats:'Session Stats',task:'Current Task:',taskPh:'What are you working on?',
      completed:'✅ Pomodoro complete!',breakDone:'☕ Break done! Back to work.',
      tip:'Work 25min → 5min break → repeat. Every 4 sessions = long break.'},
  fr:{tab:'Pomodoro',title:'⏱️ Minuteur / Pomodoro',sub:'Suivez vos sessions de codage',
      work:'Travail',shortBreak:'Pause courte',longBreak:'Pause longue',
      btnStart:'▶ Démarrer',btnPause:'⏸ Pause',btnReset:'↺ Réinitialiser',btnSkip:'⏭ Passer',
      session:'Session',tomatoes:'Pomodoros',totalTime:'Total Codé',today:'Aujourd\'hui',
      settings:'Paramètres :',workMin:'Travail (min) :',breakMin:'Pause (min) :',longMin:'Pause longue (min) :',
      stats:'Statistiques',task:'Tâche en cours :',taskPh:'Sur quoi travaillez-vous ?',
      completed:'✅ Pomodoro terminé !',breakDone:'☕ Pause terminée ! Au travail.',
      tip:'25min travail → 5min pause → répétez. Toutes les 4 sessions = grande pause.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var STORAGE_KEY='ia_pomodoro_state';
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){return{};}}
function saveState(s){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch(e){}}

var saved=loadState();
var CFG={work:saved.work||25,shortBreak:saved.shortBreak||5,longBreak:saved.longBreak||15};
var STATE={
  phase:'work', // work | short | long
  timeLeft:(saved.work||25)*60,
  running:false,
  sessions:saved.sessions||0,
  totalSeconds:saved.totalSeconds||0,
  todaySeconds:saved.todaySeconds||0,
  lastDate:saved.lastDate||new Date().toDateString()
};
var timerInterval=null;

function persistState(){
  saveState({work:CFG.work,shortBreak:CFG.shortBreak,longBreak:CFG.longBreak,
    sessions:STATE.sessions,totalSeconds:STATE.totalSeconds,
    todaySeconds:STATE.todaySeconds,lastDate:STATE.lastDate});
}

function resetToday(){
  var today=new Date().toDateString();
  if(STATE.lastDate!==today){STATE.todaySeconds=0;STATE.lastDate=today;}
}

function formatTime(s){var m=Math.floor(s/60);var sec=s%60;return(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;}
function formatHMS(s){var h=Math.floor(s/3600);var m=Math.floor((s%3600)/60);return h>0?h+'h '+m+'m':m+'m';}

function phaseLen(ph){return ph==='work'?CFG.work*60:ph==='short'?CFG.shortBreak*60:CFG.longBreak*60;}
function phaseColor(ph){return ph==='work'?'#ef4444':ph==='short'?'#10b981':'#3b82f6';}
function phaseLabel(ph){return ph==='work'?t('work'):ph==='short'?t('shortBreak'):t('longBreak');}

function tick(){
  STATE.timeLeft--;
  if(STATE.running&&STATE.phase==='work'){STATE.totalSeconds++;STATE.todaySeconds++;}
  persistState();
  updateDisplay();
  if(STATE.timeLeft<=0){
    clearInterval(timerInterval);timerInterval=null;STATE.running=false;
    if(STATE.phase==='work'){
      STATE.sessions++;persistState();
      if(window.showToast)window.showToast(t('completed'));
      STATE.phase=STATE.sessions%4===0?'long':'short';
    } else {
      if(window.showToast)window.showToast(t('breakDone'));
      STATE.phase='work';
    }
    STATE.timeLeft=phaseLen(STATE.phase);
    persistState();renderTab();
  }
}

function updateDisplay(){
  var tEl=document.getElementById('pom-time');if(tEl)tEl.textContent=formatTime(STATE.timeLeft);
  var pct=Math.round(((phaseLen(STATE.phase)-STATE.timeLeft)/phaseLen(STATE.phase))*100);
  var ring=document.getElementById('pom-ring-fill');
  if(ring){var circ=2*Math.PI*45;ring.style.strokeDashoffset=circ-(pct/100)*circ;}
  var todayEl=document.getElementById('pom-today');if(todayEl)todayEl.textContent=formatHMS(STATE.todaySeconds);
  var totalEl=document.getElementById('pom-total');if(totalEl)totalEl.textContent=formatHMS(STATE.totalSeconds);
  var sesEl=document.getElementById('pom-sessions');if(sesEl)sesEl.textContent=STATE.sessions;
}

function renderTab(){
  resetToday();
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(245,158,11,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;align-items:center;';

  // Phase tabs
  var phTabs=document.createElement('div');phTabs.style='display:flex;gap:4px;width:100%;';
  [['work',t('work')],['short',t('shortBreak')],['long',t('longBreak')]].forEach(function(ph){
    var btn=document.createElement('button');btn.textContent=ph[1];
    var isA=STATE.phase===ph[0];var c=phaseColor(ph[0]);
    btn.style='flex:1;padding:6px;border-radius:7px;font-size:9.5px;font-weight:700;cursor:pointer;border:1px solid '+(isA?c:'rgba(255,255,255,0.08)')+';background:'+(isA?c+'22':'rgba(255,255,255,0.02)')+';color:'+(isA?c:'#64748b')+';';
    btn.onclick=function(){
      clearInterval(timerInterval);timerInterval=null;STATE.running=false;STATE.phase=ph[0];STATE.timeLeft=phaseLen(ph[0]);persistState();renderTab();
    };
    phTabs.appendChild(btn);
  });
  body.appendChild(phTabs);

  // Timer ring (SVG)
  var color=phaseColor(STATE.phase);
  var circ=2*Math.PI*45;
  var pct=Math.round(((phaseLen(STATE.phase)-STATE.timeLeft)/phaseLen(STATE.phase))*100);
  var offset=circ-(pct/100)*circ;
  var svgWrap=document.createElement('div');svgWrap.style='position:relative;display:flex;align-items:center;justify-content:center;margin:4px 0;';
  svgWrap.innerHTML='<svg width="120" height="120" viewBox="0 0 120 120">' +
    '<circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>' +
    '<circle id="pom-ring-fill" cx="60" cy="60" r="45" fill="none" stroke="'+color+'" stroke-width="8" stroke-linecap="round"' +
    ' stroke-dasharray="'+circ+'" stroke-dashoffset="'+offset+'" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 0.5s;"/>' +
    '</svg>' +
    '<div style="position:absolute;text-align:center;">' +
    '<div id="pom-time" style="font-size:28px;font-weight:900;color:'+color+';font-family:\'JetBrains Mono\',monospace;letter-spacing:2px;">'+formatTime(STATE.timeLeft)+'</div>' +
    '<div style="font-size:9px;color:#64748b;margin-top:2px;">'+phaseLabel(STATE.phase)+'</div></div>';
  body.appendChild(svgWrap);

  // Controls
  var ctrlRow=document.createElement('div');ctrlRow.style='display:flex;gap:8px;';
  var startBtn=document.createElement('button');
  startBtn.innerHTML=STATE.running?t('btnPause'):t('btnStart');
  startBtn.style='flex:1;background:'+(STATE.running?'rgba(245,158,11,0.2)':'linear-gradient(135deg,'+color+'cc,'+color+')')+';color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  startBtn.onclick=function(){
    STATE.running=!STATE.running;
    if(STATE.running){timerInterval=setInterval(tick,1000);}
    else{clearInterval(timerInterval);timerInterval=null;}
    renderTab();
    if(STATE.running)timerInterval=setInterval(tick,1000);
  };
  var resetBtn=document.createElement('button');resetBtn.innerHTML=t('btnReset');
  resetBtn.style='background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1);padding:10px 12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:11px;';
  resetBtn.onclick=function(){clearInterval(timerInterval);timerInterval=null;STATE.running=false;STATE.timeLeft=phaseLen(STATE.phase);persistState();renderTab();};
  ctrlRow.appendChild(startBtn);ctrlRow.appendChild(resetBtn);body.appendChild(ctrlRow);

  // Current task
  var taskLabel=document.createElement('div');taskLabel.style='font-size:10px;color:#64748b;font-weight:600;align-self:flex-start;width:100%;';taskLabel.textContent=t('task');body.appendChild(taskLabel);
  var taskInp=document.createElement('input');taskInp.type='text';taskInp.placeholder=t('taskPh');taskInp.value=saved.task||'';
  taskInp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(239,68,68,0.2);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
  taskInp.oninput=function(){saved.task=this.value;persistState();};
  body.appendChild(taskInp);

  // Stats
  var statsGrid=document.createElement('div');statsGrid.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%;';
  [{id:'pom-sessions',label:'🍅 '+t('tomatoes'),val:STATE.sessions,color:'#ef4444'},
   {id:'pom-today',label:'📅 '+t('today'),val:formatHMS(STATE.todaySeconds),color:'#f59e0b'},
   {id:'pom-total',label:'⏱ '+t('totalTime'),val:formatHMS(STATE.totalSeconds),color:'#10b981'}
  ].forEach(function(s){
    var c=document.createElement('div');c.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;text-align:center;';
    c.innerHTML='<div style="font-size:9px;color:#64748b;margin-bottom:3px;">'+s.label+'</div><div id="'+s.id+'" style="font-size:13px;font-weight:900;color:'+s.color+';">'+s.val+'</div>';
    statsGrid.appendChild(c);
  });
  body.appendChild(statsGrid);

  // Settings
  var setLabel=document.createElement('div');setLabel.style='font-size:10px;color:#64748b;font-weight:600;align-self:flex-start;width:100%;';setLabel.textContent=t('settings');body.appendChild(setLabel);
  var setGrid=document.createElement('div');setGrid.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%;';
  [{lk:'workMin',id:'cfg-work',def:CFG.work},{lk:'breakMin',id:'cfg-short',def:CFG.shortBreak},{lk:'longMin',id:'cfg-long',def:CFG.longBreak}].forEach(function(f){
    var c=document.createElement('div');c.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:8px;color:#64748b;';l.textContent=t(f.lk);
    var inp=document.createElement('input');inp.type='number';inp.id=f.id;inp.value=f.def;inp.min=1;inp.max=120;
    inp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px;border-radius:6px;font-size:10px;text-align:center;width:100%;box-sizing:border-box;outline:none;';
    inp.onchange=function(){
      CFG.work=parseInt((document.getElementById('cfg-work')||{value:25}).value)||25;
      CFG.shortBreak=parseInt((document.getElementById('cfg-short')||{value:5}).value)||5;
      CFG.longBreak=parseInt((document.getElementById('cfg-long')||{value:15}).value)||15;
      if(!STATE.running){STATE.timeLeft=phaseLen(STATE.phase);}
      persistState();updateDisplay();
    };
    c.appendChild(l);c.appendChild(inp);setGrid.appendChild(c);
  });
  body.appendChild(setGrid);

  wrap.appendChild(body);parent.appendChild(wrap);
  if(STATE.running){timerInterval=setInterval(tick,1000);}
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-pomodoro');if(el)el.textContent=t('tab');if(window.activeTab==='pomodoro')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='pomodoro'){window.activeTab='pomodoro';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-pomodoro');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
