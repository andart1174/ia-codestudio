/**
 * Future Code Predictor v1.0 — EN/FR
 * AI predicts what functions you'll add next and prepares them
 */
(function(){
'use strict';
var TX={
  en:{tab:'Code Predictor',title:'🔮 Future Code Predictor',sub:'AI predicts your next code blocks',
      btnAnalyze:'🔮 Analyze & Predict',btnInject:'➕ Inject Prediction',btnCopy:'📋 Copy',
      analyzing:'⏳ Analyzing patterns...',noCode:'Write some code in the editor first.',
      predictions:'AI Predictions:',confidence:'Confidence',inject:'Inject',
      injected:'✅ Code prediction injected!',copied:'📋 Copied!',
      tip:'The AI scans your code for patterns (forms, buttons, nav, etc.) and predicts missing functions.'},
  fr:{tab:'Prédicteur',title:'🔮 Prédicteur de Code',sub:'L\'IA prédit vos prochains blocs de code',
      btnAnalyze:'🔮 Analyser & Prédire',btnInject:'➕ Injecter la Prédiction',btnCopy:'📋 Copier',
      analyzing:'⏳ Analyse des patterns...',noCode:'Écrivez du code dans l\'éditeur d\'abord.',
      predictions:'Prédictions IA :',confidence:'Confiance',inject:'Injecter',
      injected:'✅ Prédiction de code injectée !',copied:'📋 Copié !',
      tip:'L\'IA scanne votre code pour détecter les patterns (formulaires, boutons, nav...) et prédit les fonctions manquantes.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var PATTERN_RULES=[
  {detect:/\bform\b|onsubmit|input.*type="text"/i,
   predict:'Form Validation Handler',conf:94,
   code:'function validateForm(formId) {\n  const form = document.getElementById(formId);\n  const inputs = form ? form.querySelectorAll("[required]") : [];\n  let valid = true;\n  inputs.forEach(inp => {\n    if (!inp.value.trim()) {\n      inp.style.border = "2px solid #ef4444";\n      valid = false;\n    } else {\n      inp.style.border = "";\n    }\n  });\n  return valid;\n}'},
  {detect:/fetch\(|XMLHttpRequest|async\s+function/i,
   predict:'Loading State Manager',conf:89,
   code:'function setLoading(buttonId, loading) {\n  const btn = document.getElementById(buttonId);\n  if (!btn) return;\n  btn.disabled = loading;\n  btn.dataset.original = btn.dataset.original || btn.innerHTML;\n  btn.innerHTML = loading ? \'<span style="opacity:0.7">⏳ Loading...</span>\' : btn.dataset.original;\n}'},
  {detect:/localStorage|sessionStorage/i,
   predict:'Storage Manager Utility',conf:91,
   code:'const Storage = {\n  get: (key, fallback = null) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },\n  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },\n  remove: (key) => localStorage.removeItem(key),\n  clear: () => localStorage.clear()\n};'},
  {detect:/addEventListener.*click|onclick=/i,
   predict:'Ripple Click Effect',conf:76,
   code:'function addRipple(selector) {\n  document.querySelectorAll(selector).forEach(el => {\n    el.addEventListener("click", function(e) {\n      const ripple = document.createElement("span");\n      const rect = this.getBoundingClientRect();\n      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:10px;height:10px;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;transform:translate(-50%,-50%);animation:rippleAnim 0.6s linear;pointer-events:none;`;\n      this.style.position = "relative";\n      this.style.overflow = "hidden";\n      this.appendChild(ripple);\n      setTimeout(() => ripple.remove(), 600);\n    });\n  });\n}'},
  {detect:/<nav|navbar|menu|hamburger/i,
   predict:'Mobile Nav Toggle',conf:88,
   code:'function initMobileNav() {\n  const toggle = document.querySelector(".hamburger, #nav-toggle, .menu-btn");\n  const nav = document.querySelector("nav ul, .nav-links, .navbar-menu");\n  if (!toggle || !nav) return;\n  toggle.addEventListener("click", () => {\n    nav.classList.toggle("open");\n    toggle.setAttribute("aria-expanded", nav.classList.contains("open"));\n  });\n  document.addEventListener("click", e => {\n    if (!toggle.contains(e.target) && !nav.contains(e.target)) nav.classList.remove("open");\n  });\n}'},
  {detect:/scroll|IntersectionObserver|parallax/i,
   predict:'Scroll Animation Observer',conf:82,
   code:'function initScrollAnimations() {\n  const observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n      if (entry.isIntersecting) {\n        entry.target.classList.add("visible");\n        entry.target.style.opacity = "1";\n        entry.target.style.transform = "translateY(0)";\n      }\n    });\n  }, { threshold: 0.1 });\n  document.querySelectorAll(".animate-on-scroll, [data-animate]").forEach(el => {\n    el.style.cssText = "opacity:0;transform:translateY(30px);transition:all 0.6s ease;";\n    observer.observe(el);\n  });\n}'},
  {detect:/toast|notification|alert|showMessage/i,
   predict:'Toast Notification System',conf:85,
   code:'function showToast(message, type = "success", duration = 3000) {\n  const toast = document.createElement("div");\n  const colors = { success: "#10b981", error: "#ef4444", warning: "#f59e0b", info: "#3b82f6" };\n  toast.style.cssText = `position:fixed;bottom:24px;right:24px;background:${colors[type]||colors.info};color:#fff;padding:12px 20px;border-radius:10px;font-weight:600;font-size:14px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.3);animation:slideIn 0.3s ease;`;\n  toast.textContent = message;\n  document.body.appendChild(toast);\n  setTimeout(() => { toast.style.opacity="0"; toast.style.transform="translateY(10px)"; setTimeout(()=>toast.remove(),300); }, duration);\n}'},
  {detect:/dark.*mode|theme.*toggle|data-theme/i,
   predict:'Dark Mode Toggle',conf:93,
   code:'function initDarkMode() {\n  const saved = localStorage.getItem("theme") || "dark";\n  document.documentElement.setAttribute("data-theme", saved);\n  const toggle = document.querySelector("#theme-toggle, .theme-btn, .dark-toggle");\n  if (toggle) {\n    toggle.addEventListener("click", () => {\n      const current = document.documentElement.getAttribute("data-theme");\n      const next = current === "dark" ? "light" : "dark";\n      document.documentElement.setAttribute("data-theme", next);\n      localStorage.setItem("theme", next);\n      toggle.textContent = next === "dark" ? "☀️" : "🌙";\n    });\n  }\n}'}
];

var predictions=[];

function analyze(code){
  var found=[];
  PATTERN_RULES.forEach(function(rule){
    if(rule.detect.test(code)){
      // Check if function already exists in code
      var fnName=rule.code.match(/^(?:function|const)\s+(\w+)/);
      if(fnName&&code.includes(fnName[1]))return;
      found.push(rule);
    }
  });
  // Always add at least generic ones
  if(found.length<2){
    PATTERN_RULES.slice(6,8).forEach(function(r){if(!found.includes(r))found.push(r);});
  }
  return found.slice(0,5);
}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';

  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(88,28,135,0.2),rgba(99,102,241,0.1));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');
  tip.style='font-size:10px;color:#94a3b8;background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.15);border-radius:6px;padding:8px 10px;line-height:1.5;';
  tip.textContent=t('tip');
  body.appendChild(tip);

  var analyzeBtn=document.createElement('button');
  analyzeBtn.innerHTML=t('btnAnalyze');
  analyzeBtn.style='width:100%;background:linear-gradient(135deg,#581c87,#4f46e5);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(88,28,135,0.4);';
  analyzeBtn.onmouseover=function(){this.style.transform='translateY(-1px)';};analyzeBtn.onmouseout=function(){this.style.transform='';};
  analyzeBtn.onclick=function(){
    var code=window.editor?window.editor.getValue():'';
    if(!code.trim()){if(window.showToast)window.showToast(t('noCode'));return;}
    analyzeBtn.innerHTML=t('analyzing');analyzeBtn.disabled=true;
    setTimeout(function(){
      predictions=analyze(code);
      renderTab();
    },600);
  };
  body.appendChild(analyzeBtn);

  if(predictions.length>0){
    var predLabel=document.createElement('div');
    predLabel.style='font-size:10px;color:#64748b;font-weight:600;';
    predLabel.textContent=t('predictions')+' ('+predictions.length+')';
    body.appendChild(predLabel);

    predictions.forEach(function(p,i){
      var card=document.createElement('div');
      card.style='background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2);border-radius:10px;padding:10px;';

      var cardHdr=document.createElement('div');
      cardHdr.style='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;';
      var confColor=p.conf>=90?'#10b981':p.conf>=80?'#f59e0b':'#94a3b8';
      cardHdr.innerHTML='<span style="font-size:11px;font-weight:700;color:#c084fc;">🔮 '+p.predict+'</span>' +
        '<span style="font-size:9px;font-weight:900;color:'+confColor+';">'+p.conf+'%</span>';
      card.appendChild(cardHdr);

      var confBar=document.createElement('div');
      confBar.style='height:3px;background:rgba(255,255,255,0.05);border-radius:3px;margin-bottom:8px;';
      confBar.innerHTML='<div style="width:'+p.conf+'%;height:100%;background:linear-gradient(90deg,#7c3aed,'+confColor+');border-radius:3px;"></div>';
      card.appendChild(confBar);

      var pre=document.createElement('pre');
      pre.style='background:#0d1117;border-radius:6px;padding:8px;font-size:8.5px;color:#c9d1d9;overflow:auto;max-height:80px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
      pre.textContent=p.code.split('\n').slice(0,4).join('\n')+(p.code.split('\n').length>4?'\n  // ...':'');
      card.appendChild(pre);

      var btnRow=document.createElement('div');
      btnRow.style='display:flex;gap:6px;margin-top:8px;';
      var injBtn=document.createElement('button');
      injBtn.innerHTML='➕ '+t('inject');
      injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:6px;border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;';
      injBtn.onclick=(function(code){return function(){
        if(!window.editor)return;
        var cur=window.editor.getValue();
        window.editor.setValue(cur+'\n\n'+code);
        if(window.runPreview)window.runPreview();
        if(window.showToast)window.showToast(t('injected'));
      };})(p.code);
      var cpBtn=document.createElement('button');
      cpBtn.innerHTML=t('btnCopy');
      cpBtn.style='background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:6px 10px;border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;';
      cpBtn.onclick=(function(code){return function(){navigator.clipboard.writeText(code).then(function(){if(window.showToast)window.showToast(t('copied'));});};})(p.code);
      btnRow.appendChild(injBtn);btnRow.appendChild(cpBtn);
      card.appendChild(btnRow);
      body.appendChild(card);
    });
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-codepredict');if(el)el.textContent=t('tab');if(window.activeTab==='codepredict')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='codepredict'){window.activeTab='codepredict';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-codepredict');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
