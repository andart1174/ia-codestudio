/**
 * AI Mentor Mode v1.0 — EN/FR
 * Interactive tutorial — AI guides you to build a complete app step by step
 */
(function(){
'use strict';
var TX={
  en:{tab:'AI Mentor',title:'🤝 AI Mentor Mode',sub:'Build a complete app step by step',
      pickPath:'Choose your learning path:',btnStart:'🚀 Start Mentoring',btnNext:'➡ Next Step',
      btnInject:'💉 Inject Code',btnReset:'🔄 Reset',step:'Step',of:'of',
      complete:'🎓 Tutorial Complete!',injected:'✅ Code injected!',progress:'Progress',
      paths:{landing:'🌐 Landing Page',dashboard:'📊 Dashboard App',portfolio:'👤 Portfolio',form:'📝 Contact Form',todo:'✅ Todo App'}},
  fr:{tab:'AI Mentor',title:'🤝 Mode AI Mentor',sub:'Construisez une app complète étape par étape',
      pickPath:'Choisissez votre parcours :',btnStart:'🚀 Démarrer le Mentorat',btnNext:'➡ Étape Suivante',
      btnInject:'💉 Injecter le Code',btnReset:'🔄 Réinitialiser',step:'Étape',of:'sur',
      complete:'🎓 Tutoriel Terminé !',injected:'✅ Code injecté !',progress:'Progression',
      paths:{landing:'🌐 Page d\'Accueil',dashboard:'📊 Dashboard',portfolio:'👤 Portfolio',form:'📝 Formulaire',todo:'✅ Todo App'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tp(k){return((TX[gl()]||TX.en).paths||TX.en.paths)[k]||k;}

var PATHS={
  landing:[
    {title:'HTML Structure',explain:'Every web page starts with HTML boilerplate. This sets up the document structure.',
     code:'<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My Landing Page</title>\n</head>\n<body>\n\n</body>\n</html>'},
    {title:'Add a Hero Section',explain:'The hero is the first thing visitors see. It needs a headline, subtext, and a call-to-action button.',
     code:'<header class="hero">\n  <nav class="navbar">\n    <div class="brand">✨ MyBrand</div>\n    <button class="nav-cta">Get Started</button>\n  </nav>\n  <div class="hero-content">\n    <h1>Build Something Amazing</h1>\n    <p>The fastest way to launch your next big idea.</p>\n    <button class="cta-btn" onclick="scrollToFeatures()">🚀 Start Free</button>\n  </div>\n</header>'},
    {title:'Style the Hero',explain:'CSS makes it look professional. We use flexbox for layout and a gradient background.',
     code:'<style>\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: Inter, sans-serif; background: #0f172a; color: #e2e8f0; }\n.navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; }\n.brand { font-size: 20px; font-weight: 900; color: #3b82f6; }\n.nav-cta { background: #3b82f6; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 700; }\n.hero { background: linear-gradient(135deg, #0f172a, #1e3a5f); min-height: 100vh; display: flex; flex-direction: column; }\n.hero-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }\nh1 { font-size: 56px; font-weight: 900; margin-bottom: 20px; }\n.cta-btn { background: #3b82f6; color: #fff; border: none; padding: 16px 40px; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; margin-top: 24px; transition: transform 0.2s; }\n.cta-btn:hover { transform: translateY(-3px); }\n</style>'},
    {title:'Add Features Section',explain:'Highlight your key features in a responsive grid layout.',
     code:'<section class="features" id="features">\n  <h2>Why Choose Us?</h2>\n  <div class="feature-grid">\n    <div class="feature-card">⚡ <h3>Fast</h3><p>Loads in under 1 second.</p></div>\n    <div class="feature-card">🔒 <h3>Secure</h3><p>Enterprise-grade security.</p></div>\n    <div class="feature-card">🌍 <h3>Global</h3><p>Available in 50+ countries.</p></div>\n  </div>\n</section>\n<style>\n.features { padding: 80px 40px; text-align: center; }\n.features h2 { font-size: 36px; font-weight: 900; margin-bottom: 40px; color: #f1f5f9; }\n.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; }\n.feature-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; font-size: 32px; }\n.feature-card h3 { font-size: 18px; margin: 12px 0 8px; color: #3b82f6; }\n.feature-card p { font-size: 14px; color: #94a3b8; }\n@media(max-width:600px){.feature-grid{grid-template-columns:1fr;}}\n</style>'},
    {title:'Add JavaScript',explain:'Add smooth scroll and simple animations to bring the page to life.',
     code:'<script>\nfunction scrollToFeatures() {\n  document.getElementById("features").scrollIntoView({ behavior: "smooth" });\n}\n\n// Fade in elements on scroll\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(e => {\n    if (e.isIntersecting) {\n      e.target.style.opacity = "1";\n      e.target.style.transform = "translateY(0)";\n    }\n  });\n}, { threshold: 0.1 });\n\ndocument.querySelectorAll(".feature-card").forEach(el => {\n  el.style.cssText += "opacity:0;transform:translateY(30px);transition:all 0.6s ease;";\n  observer.observe(el);\n});\n</scr'+'ipt>'}
  ],
  todo:[
    {title:'HTML Setup',explain:'Start with the basic HTML structure for a Todo app.',
     code:'<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>✅ Todo App</title>\n</head>\n<body>\n  <div class="app">\n    <h1>My Todos</h1>\n    <div class="input-row">\n      <input type="text" id="todo-input" placeholder="Add a task...">\n      <button onclick="addTodo()">Add</button>\n    </div>\n    <ul id="todo-list"></ul>\n    <div id="stats"></div>\n  </div>\n</body>\n</html>'},
    {title:'Style the App',explain:'Make it look clean and modern with CSS.',
     code:'<style>\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: Inter, sans-serif; background: #0f172a; color: #e2e8f0; display: flex; justify-content: center; padding: 40px 20px; }\n.app { width: 100%; max-width: 500px; }\nh1 { font-size: 28px; font-weight: 900; margin-bottom: 24px; color: #3b82f6; }\n.input-row { display: flex; gap: 10px; margin-bottom: 20px; }\ninput { flex: 1; background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 12px 16px; border-radius: 10px; font-size: 15px; outline: none; }\nbutton { background: #3b82f6; color: #fff; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }\nul { list-style: none; display: flex; flex-direction: column; gap: 8px; }\nli { display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 14px 16px; border-radius: 10px; border: 1px solid #334155; }\nli.done span { text-decoration: line-through; opacity: 0.5; }\n.del-btn { margin-left: auto; background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); border-radius: 6px; padding: 4px 10px; cursor: pointer; font-size: 12px; }\n#stats { margin-top: 16px; font-size: 13px; color: #64748b; }\n</style>'},
    {title:'JavaScript Logic',explain:'The core functionality: add, complete, delete and persist todos.',
     code:'<script>\nlet todos = JSON.parse(localStorage.getItem("todos") || "[]");\n\nfunction render() {\n  const list = document.getElementById("todo-list");\n  list.innerHTML = "";\n  todos.forEach((todo, i) => {\n    const li = document.createElement("li");\n    if (todo.done) li.classList.add("done");\n    li.innerHTML = `<input type="checkbox" ${todo.done?"checked":""} onchange="toggle(${i})">\n      <span>${todo.text}</span>\n      <button class="del-btn" onclick="remove(${i})">✕</button>`;\n    list.appendChild(li);\n  });\n  const done = todos.filter(t=>t.done).length;\n  document.getElementById("stats").textContent = `${done}/${todos.length} completed`;\n  localStorage.setItem("todos", JSON.stringify(todos));\n}\n\nfunction addTodo() {\n  const inp = document.getElementById("todo-input");\n  if (!inp.value.trim()) return;\n  todos.push({ text: inp.value.trim(), done: false });\n  inp.value = "";\n  render();\n}\n\nfunction toggle(i) { todos[i].done = !todos[i].done; render(); }\nfunction remove(i) { todos.splice(i, 1); render(); }\n\ndocument.getElementById("todo-input").addEventListener("keydown", e => { if(e.key==="Enter") addTodo(); });\nrender();\n</scr'+'ipt>'}
  ]
};
// Fill remaining paths with landing steps as fallback
['portfolio','form','dashboard'].forEach(function(k){PATHS[k]=PATHS.landing;});

var STATE={path:'landing',step:0,started:false};

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(59,130,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#34d399;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  if(!STATE.started){
    var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('pickPath');body.appendChild(plabel);
    var pgrid=document.createElement('div');pgrid.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
    Object.keys(PATHS).forEach(function(k){
      var btn=document.createElement('button');
      var isA=STATE.path===k;
      btn.textContent=tp(k);
      btn.style='padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;border:2px solid '+(isA?'#34d399':'rgba(255,255,255,0.08)')+';background:'+(isA?'rgba(16,185,129,0.12)':'rgba(255,255,255,0.02)')+';color:'+(isA?'#34d399':'#64748b')+';';
      btn.onclick=function(){STATE.path=k;renderTab();};
      pgrid.appendChild(btn);
    });
    body.appendChild(pgrid);

    var startBtn=document.createElement('button');
    startBtn.innerHTML=t('btnStart');
    startBtn.style='width:100%;background:linear-gradient(135deg,#065f46,#059669);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(5,150,105,0.35);margin-top:4px;';
    startBtn.onclick=function(){STATE.started=true;STATE.step=0;renderTab();};
    body.appendChild(startBtn);
  } else {
    var steps=PATHS[STATE.path]||PATHS.landing;
    var cur=steps[STATE.step];
    var isLast=STATE.step===steps.length-1;

    // Progress bar
    var pct=Math.round(((STATE.step+1)/steps.length)*100);
    var progWrap=document.createElement('div');
    progWrap.innerHTML='<div style="display:flex;justify-content:space-between;font-size:10px;color:#64748b;margin-bottom:4px;"><span>'+t('progress')+'</span><span style="color:#34d399;font-weight:700;">'+(STATE.step+1)+'/'+steps.length+'</span></div>' +
      '<div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;"><div style="width:'+pct+'%;height:100%;background:linear-gradient(90deg,#10b981,#3b82f6);border-radius:3px;transition:width 0.5s;"></div></div>';
    body.appendChild(progWrap);

    // Step card
    var card=document.createElement('div');
    card.style='background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:12px;';
    card.innerHTML='<div style="font-size:10px;color:#64748b;margin-bottom:4px;">'+t('step')+' '+(STATE.step+1)+' '+t('of')+' '+steps.length+'</div>' +
      '<div style="font-size:13px;font-weight:900;color:#34d399;margin-bottom:8px;">'+cur.title+'</div>' +
      '<div style="font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:10px;">'+cur.explain+'</div>';

    var pre=document.createElement('pre');
    pre.style='background:#0d1117;border-radius:8px;padding:10px;font-size:8.5px;color:#c9d1d9;overflow:auto;max-height:160px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.5;';
    pre.textContent=cur.code;
    card.appendChild(pre);
    body.appendChild(card);

    // Buttons
    var btnRow=document.createElement('div');btnRow.style='display:flex;gap:6px;';

    var injBtn=document.createElement('button');
    injBtn.innerHTML=t('btnInject');
    injBtn.style='flex:1;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    injBtn.onclick=function(){
      if(!window.editor)return;
      var existing=window.editor.getValue();
      if(existing.includes('</body>')){
        window.editor.setValue(existing.replace('</body>',cur.code+'\n</body>'));
      } else {
        window.editor.setValue((existing?existing+'\n':'')+cur.code);
      }
      if(window.runPreview)window.runPreview();
      if(window.showToast)window.showToast(t('injected'));
    };

    var nextBtn=document.createElement('button');
    nextBtn.innerHTML=isLast?'🎓 '+t('complete'):t('btnNext');
    nextBtn.style='flex:1;background:'+(isLast?'linear-gradient(135deg,#f59e0b,#ef4444)':'rgba(59,130,246,0.2)')+';color:'+(isLast?'#fff':'#60a5fa')+';border:'+(isLast?'none':'1px solid rgba(59,130,246,0.3)')+';padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    nextBtn.onclick=function(){
      if(isLast){STATE.started=false;STATE.step=0;if(window.showToast)window.showToast(t('complete'));}
      else{STATE.step++;} renderTab();
    };

    btnRow.appendChild(injBtn);btnRow.appendChild(nextBtn);body.appendChild(btnRow);

    var rstBtn=document.createElement('button');
    rstBtn.innerHTML=t('btnReset');
    rstBtn.style='width:100%;background:rgba(255,255,255,0.03);color:#64748b;border:1px solid rgba(255,255,255,0.07);padding:7px;border-radius:8px;font-size:9px;cursor:pointer;';
    rstBtn.onclick=function(){STATE.started=false;STATE.step=0;renderTab();};
    body.appendChild(rstBtn);
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-aimentor');if(el)el.textContent=t('tab');if(window.activeTab==='aimentor')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='aimentor'){window.activeTab='aimentor';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-aimentor');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
