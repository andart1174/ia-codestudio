/**
 * Gamified Coding Challenges v1.0 — EN/FR
 * Code puzzles with XP system, badges and leaderboard
 */
(function(){
'use strict';
var TX={
  en:{tab:'Challenges',title:'🎮 Coding Challenges',sub:'Solve puzzles, earn XP & badges',
      btnStart:'▶ Start Challenge',btnSubmit:'✅ Submit Solution',btnHint:'💡 Hint',btnSkip:'⏭ Skip',
      btnNext:'➡ Next Challenge',xp:'XP',level:'Level',badge:'Badge',
      correct:'🎉 Correct! +',wrong:'❌ Not quite. Try again!',hint:'💡 Hint:',
      progress:'Your Progress',challenges:'Challenges',solved:'Solved',streak:'Streak'},
  fr:{tab:'Défis',title:'🎮 Défis de Codage',sub:'Résolvez des puzzles, gagnez XP & badges',
      btnStart:'▶ Démarrer le Défi',btnSubmit:'✅ Soumettre',btnHint:'💡 Indice',btnSkip:'⏭ Passer',
      btnNext:'➡ Défi Suivant',xp:'XP',level:'Niveau',badge:'Badge',
      correct:'🎉 Correct ! +',wrong:'❌ Pas tout à fait. Réessayez !',hint:'💡 Indice :',
      progress:'Votre Progression',challenges:'Défis',solved:'Résolus',streak:'Série'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var CHALLENGES=[
  {id:1,title:'Fix the Button',emoji:'🔧',xp:50,difficulty:'Easy',color:'#10b981',
   description:'This button has a bug — it shows undefined. Fix the onclick handler.',
   code:'<button onclick="showMsg()">Click Me</button>\n<p id="msg"></p>\n<script>\nfunction showMsg() {\n  document.getElementById("msg").textContent = message;\n}\nvar message = "Hello World!";\n</sc'+'ript>',
   hint:'The variable `message` is declared AFTER it\'s used. Move it before the function.',
   check:function(c){return c.includes('var message')&&c.indexOf('var message')<c.indexOf('function showMsg');}},
  {id:2,title:'Dark Mode Toggle',emoji:'🌙',xp:80,difficulty:'Easy',color:'#10b981',
   description:'Add a working dark mode toggle. When clicked, body gets class "dark".',
   code:'<button id="toggle">🌙 Toggle Dark Mode</button>\n<style>.dark{background:#000;color:#fff;}</style>',
   hint:'Use getElementById, addEventListener, and classList.toggle("dark") on document.body.',
   check:function(c){return c.includes('classList')&&c.includes('dark')&&(c.includes('addEventListener')||c.includes('onclick'));}},
  {id:3,title:'Counter App',emoji:'🔢',xp:100,difficulty:'Medium',color:'#f59e0b',
   description:'Build a counter: + and - buttons that update a display. Min: 0.',
   code:'<div id="count">0</div>\n<button id="plus">+</button>\n<button id="minus">-</button>',
   hint:'Get the element, parse its textContent as a number, change it, and set it back. Check count >= 0 for minus.',
   check:function(c){return c.includes('getElementById')&&(c.includes('textContent')||c.includes('innerHTML'))&&(c.includes('++')||c.includes('+= 1')||c.includes('+ 1'));}},
  {id:4,title:'Fetch & Display',emoji:'🌐',xp:150,difficulty:'Medium',color:'#f59e0b',
   description:'Fetch data from https://jsonplaceholder.typicode.com/todos/1 and display the title.',
   code:'<div id="result">Loading...</div>',
   hint:'Use fetch(url).then(r=>r.json()).then(data=>...) to get the data. Access data.title.',
   check:function(c){return c.includes('fetch')&&c.includes('jsonplaceholder')&&c.includes('.json()')&&c.includes('title');}},
  {id:5,title:'Animated Card',emoji:'✨',xp:120,difficulty:'Medium',color:'#f59e0b',
   description:'Create a card that scales up on hover using only CSS transitions.',
   code:'<div class="card">Hover Me!</div>',
   hint:'Use CSS: .card { transition: transform 0.3s; } .card:hover { transform: scale(1.05); }',
   check:function(c){return c.includes('transform')&&c.includes('scale')&&c.includes(':hover')&&c.includes('transition');}},
  {id:6,title:'Local Storage Save',emoji:'💾',xp:180,difficulty:'Hard',color:'#ef4444',
   description:'Build a note that saves to localStorage and reloads on page refresh.',
   code:'<textarea id="note" placeholder="Type your note..."></textarea>\n<button id="save">Save</button>',
   hint:'Use localStorage.setItem("note", value) on save, and localStorage.getItem("note") on load.',
   check:function(c){return c.includes('localStorage')&&c.includes('setItem')&&c.includes('getItem');}},
  {id:7,title:'CSS Grid Layout',emoji:'📐',xp:130,difficulty:'Hard',color:'#ef4444',
   description:'Create a 3-column responsive grid that becomes 1 column on mobile.',
   code:'<div class="grid">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div>6</div>\n</div>',
   hint:'Use display:grid; grid-template-columns: repeat(3, 1fr); and @media (max-width:600px) { grid-template-columns: 1fr; }',
   check:function(c){return c.includes('grid-template-columns')&&c.includes('1fr')&&c.includes('@media');}},
  {id:8,title:'Infinite Scroll Fake',emoji:'🌊',xp:200,difficulty:'Hard',color:'#ef4444',
   description:'Load 5 more items when user scrolls to bottom of a list.',
   code:'<ul id="list"></ul>\n<div id="loader" style="text-align:center;padding:20px;">Scroll for more...</div>',
   hint:'Use window.addEventListener("scroll", ...) and check window.innerHeight + window.scrollY >= document.body.offsetHeight.',
   check:function(c){return c.includes('scroll')&&(c.includes('scrollY')||c.includes('scrollTop'))&&c.includes('appendChild');}},
];

var STATE={xp:0,level:1,solved:0,streak:0,currentIdx:0,hintUsed:false,
  badges:[],lastResult:null};
try{var s=JSON.parse(localStorage.getItem('ia_challenges_state')||'{}');if(s.xp!==undefined)Object.assign(STATE,s);}catch(e){}
function saveState(){try{localStorage.setItem('ia_challenges_state',JSON.stringify(STATE));}catch(e){}}

var LEVEL_XP=[0,100,250,500,900,1500,2500,4000];
function getLevel(xp){for(var i=LEVEL_XP.length-1;i>=0;i--)if(xp>=LEVEL_XP[i])return i+1;return 1;}

var BADGES=[
  {id:'first',emoji:'🥇',name:'First Blood',req:function(s){return s.solved>=1;}},
  {id:'streak3',emoji:'🔥',name:'On Fire',req:function(s){return s.streak>=3;}},
  {id:'xp500',emoji:'⭐',name:'XP Master',req:function(s){return s.xp>=500;}},
  {id:'hard',emoji:'💪',name:'Hardcore',req:function(s){return s.solved>=6;}}
];
function checkBadges(){BADGES.forEach(function(b){if(!STATE.badges.includes(b.id)&&b.req(STATE)){STATE.badges.push(b.id);if(window.showToast)window.showToast(b.emoji+' Badge: '+b.name+'!');}});}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:10px 14px 8px;border-bottom:1px solid rgba(244,63,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(244,63,94,0.1),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f43f5e;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  // XP Bar
  var xpBar=document.createElement('div');
  var lv=getLevel(STATE.xp);
  var nextXP=LEVEL_XP[Math.min(lv,LEVEL_XP.length-1)]||9999;
  var prevXP=LEVEL_XP[Math.max(lv-1,0)]||0;
  var pct=Math.round(((STATE.xp-prevXP)/(nextXP-prevXP))*100)||0;
  xpBar.style='padding:8px 12px;background:#0a0d16;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;';
  xpBar.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
    '<span style="font-size:10px;font-weight:900;color:#f43f5e;">Lv.'+lv+' 🎮</span>' +
    '<span style="font-size:10px;color:#fbbf24;font-weight:700;">'+STATE.xp+' XP</span>' +
    '<span style="font-size:9px;color:#64748b;">✅ '+STATE.solved+' · 🔥 '+STATE.streak+'</span></div>' +
    '<div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;">' +
    '<div style="width:'+pct+'%;height:100%;background:linear-gradient(90deg,#f43f5e,#f59e0b);border-radius:3px;transition:width 0.5s;"></div></div>' +
    (STATE.badges.length?'<div style="margin-top:4px;font-size:12px;">'+BADGES.filter(function(b){return STATE.badges.includes(b.id);}).map(function(b){return'<span title="'+b.name+'">'+b.emoji+'</span>';}).join('')+'</div>':'');
  wrap.appendChild(xpBar);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;';

  // Challenge selector
  var chalLabel=document.createElement('div');chalLabel.style='font-size:10px;color:#64748b;font-weight:600;';chalLabel.textContent=t('challenges');body.appendChild(chalLabel);
  var chalGrid=document.createElement('div');chalGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:4px;';
  CHALLENGES.forEach(function(ch,i){
    var btn=document.createElement('button');
    var isActive=STATE.currentIdx===i;
    var isSolved=STATE.solved>i;
    btn.style='padding:6px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;text-align:left;' +
      'border:1px solid '+(isActive?ch.color:'rgba(255,255,255,0.08)')+';' +
      'background:'+(isActive?ch.color+'22':'rgba(255,255,255,0.02)')+';' +
      'color:'+(isActive?ch.color:isSolved?'#10b981':'#64748b')+';';
    btn.innerHTML=ch.emoji+' '+(isSolved?'✅ ':'')+ch.title+'<div style="font-size:8px;opacity:0.7;">+'+ch.xp+' XP</div>';
    btn.onclick=function(){STATE.currentIdx=i;STATE.hintUsed=false;STATE.lastResult=null;renderTab();};
    chalGrid.appendChild(btn);
  });
  body.appendChild(chalGrid);

  // Current challenge
  var ch=CHALLENGES[STATE.currentIdx]||CHALLENGES[0];
  var chalCard=document.createElement('div');
  chalCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-top:3px solid '+ch.color+';border-radius:10px;padding:10px;';
  chalCard.innerHTML='<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">' +
    '<span style="font-size:16px;">'+ch.emoji+'</span>' +
    '<div><div style="font-size:11px;font-weight:700;color:'+ch.color+';">'+ch.title+'</div>' +
    '<div style="font-size:9px;color:#64748b;">'+ch.difficulty+' · +'+ch.xp+' XP</div></div></div>' +
    '<div style="font-size:10px;color:#94a3b8;line-height:1.4;margin-bottom:8px;">'+ch.description+'</div>';

  // Starter code area
  var codeArea=document.createElement('textarea');
  codeArea.id='challenge-code';codeArea.rows=6;
  codeArea.style='width:100%;background:#0d1117;color:#c9d1d9;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px;font-family:"JetBrains Mono",monospace;font-size:9px;resize:vertical;outline:none;box-sizing:border-box;line-height:1.5;';
  codeArea.value=ch.code;
  chalCard.appendChild(codeArea);

  // Result
  if(STATE.lastResult!==null){
    var res=document.createElement('div');
    res.style='padding:8px;border-radius:6px;font-size:10px;font-weight:700;margin-top:6px;text-align:center;' +
      (STATE.lastResult?'background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3);':'background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.3);');
    res.textContent=STATE.lastResult?t('correct')+ch.xp+' XP! 🎉':t('wrong');
    chalCard.appendChild(res);
  }

  body.appendChild(chalCard);

  // Action buttons
  var btnRow=document.createElement('div');btnRow.style='display:flex;gap:6px;flex-wrap:wrap;';

  var submitBtn=document.createElement('button');
  submitBtn.innerHTML=t('btnSubmit');
  submitBtn.style='flex:1;background:linear-gradient(135deg,#059669,#10b981);color:#fff;border:none;padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;min-width:100px;';
  submitBtn.onclick=function(){
    var code=(document.getElementById('challenge-code')||{}).value||'';
    var passed=ch.check(code);
    STATE.lastResult=passed;
    if(passed){
      var xpGain=STATE.hintUsed?Math.round(ch.xp*0.5):ch.xp;
      STATE.xp+=xpGain;STATE.solved++;STATE.streak++;
      STATE.level=getLevel(STATE.xp);
      // Move to next
      if(STATE.currentIdx<CHALLENGES.length-1){setTimeout(function(){STATE.currentIdx++;STATE.lastResult=null;STATE.hintUsed=false;renderTab();},1500);}
      checkBadges();
    } else {STATE.streak=0;}
    saveState();renderTab();
  };

  var hintBtn=document.createElement('button');
  hintBtn.innerHTML=t('btnHint');
  hintBtn.style='background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid rgba(245,158,11,0.3);padding:9px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  hintBtn.onclick=function(){
    STATE.hintUsed=true;
    if(window.showToast)window.showToast(t('hint')+' '+ch.hint,'info',5000);
    else alert(ch.hint);
  };

  var injectBtn=document.createElement('button');
  injectBtn.innerHTML='💉 '+t('btnStart').replace('▶ ','');
  injectBtn.style='background:rgba(99,102,241,0.15);color:#a78bfa;border:1px solid rgba(99,102,241,0.3);padding:9px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injectBtn.title='Load challenge into editor';
  injectBtn.onclick=function(){
    if(window.editor){window.editor.setValue(ch.code);if(window.runPreview)window.runPreview();}
  };

  btnRow.appendChild(submitBtn);btnRow.appendChild(hintBtn);btnRow.appendChild(injectBtn);
  body.appendChild(btnRow);

  // Reset progress
  var rstBtn=document.createElement('button');
  rstBtn.textContent=gl()==='fr'?'🔄 Réinitialiser la progression':'🔄 Reset Progress';
  rstBtn.style='width:100%;background:rgba(239,68,68,0.08);color:#f87171;border:1px solid rgba(239,68,68,0.2);padding:7px;border-radius:8px;font-size:9px;cursor:pointer;';
  rstBtn.onclick=function(){
    if(confirm(gl()==='fr'?'Réinitialiser toute la progression ?':'Reset all progress?')){
      Object.assign(STATE,{xp:0,level:1,solved:0,streak:0,currentIdx:0,hintUsed:false,badges:[],lastResult:null});
      saveState();renderTab();
    }
  };
  body.appendChild(rstBtn);

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-challenges');if(el)el.textContent=t('tab');if(window.activeTab==='challenges')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='challenges'){window.activeTab='challenges';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-challenges');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
