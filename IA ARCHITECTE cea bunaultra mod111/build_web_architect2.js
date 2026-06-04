const fs = require('fs');

const w1 = fs.readFileSync('w1.html', 'utf8');
const w2 = fs.readFileSync('w2.html', 'utf8');
const w3 = fs.readFileSync('w3.html', 'utf8');
const w4 = fs.readFileSync('w4.html', 'utf8');
const w5 = fs.readFileSync('w5.html', 'utf8');
const w6 = fs.readFileSync('w6.html', 'utf8');

function b64Inject(funcName, htmlContent) {
  let b64 = Buffer.from(htmlContent, 'utf8').toString('base64');
  return `function ${funcName}() { return decodeURIComponent(escape(atob("${b64}"))); }`;
}

const jsCode = `(function(){
'use strict';
const TX={en:{title:'WEB ARCHITECT',sub:'UI Component & Template Forge',back:'← Back',injected:'✅ Component Injected!',tools:{
  hero:{name:'Landing Page Hero',desc:'Inject a responsive Hero Section with gradients or glassmorphism.',injectBtn:'🌆 Inject Hero'},
  glass:{name:'Glassmorphism UI',desc:'Inject modern frosted glass components and CSS.',injectBtn:'🪟 Inject Glass UI'},
  bg:{name:'Animated Backgrounds',desc:'Inject fluid mesh gradients and cyberpunk grids.',injectBtn:'✨ Inject Background'},
  pricing:{name:'Pricing Tables Pro',desc:'Inject SaaS pricing tables with hover animations.',injectBtn:'💳 Inject Pricing'},
  nav:{name:'Mega-Menu Nav',desc:'Inject modern navigation bars with responsive menus.',injectBtn:'🧭 Inject Navbar'},
  cards:{name:'3D Hover Cards',desc:'Inject dynamic 3D tilting product cards.',injectBtn:'🎴 Inject 3D Cards'}
}},fr:{title:'ARCHITECTE WEB',sub:'Générateur de Composants UI',back:'← Retour',injected:'✅ Composant Injecté!',tools:{
  hero:{name:'Landing Page Hero',desc:'Injectez une section Hero responsive.',injectBtn:'🌆 Injecter Hero'},
  glass:{name:'Interface Glassmorphism',desc:'Injectez des composants en verre givré et CSS moderne.',injectBtn:'🪟 Injecter Glass UI'},
  bg:{name:'Fonds Animés',desc:'Injectez des gradients fluides et animés.',injectBtn:'✨ Injecter Fond Animé'},
  pricing:{name:'Tableaux de Prix Pro',desc:'Injectez des tableaux de prix SaaS.',injectBtn:'💳 Injecter Prix'},
  nav:{name:'Mega-Menu Nav',desc:'Injectez des barres de navigation modernes.',injectBtn:'🧭 Injecter Navbar'},
  cards:{name:'Cartes 3D Hover',desc:'Injectez des cartes dynamiques avec inclinaison 3D.',injectBtn:'🎴 Injecter Cartes 3D'}
}}};
function gl(){return window.appLang||'en';}
window._injectWebArchitectCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='webarchitect'){window.activeTab='webarchitect';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-webarchitect');if(b)b.classList.add('active');window.initWebArchitectStudio(gl());return;}
  if(typeof _o==='function')_o(tab);
};
window.initWebArchitectStudio=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[
    {id:'hero',icon:'🌆',color:'#0ea5e9'},
    {id:'glass',icon:'🪟',color:'#c084fc'},
    {id:'bg',icon:'✨',color:'#f43f5e'},
    {id:'pricing',icon:'💳',color:'#10b981'},
    {id:'nav',icon:'🧭',color:'#f59e0b'},
    {id:'cards',icon:'🎴',color:'#ef4444'}
  ];
  el.innerHTML=\`<div style="padding:15px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;">
    <div style="background:linear-gradient(135deg,rgba(244,114,182,0.1),rgba(225,29,72,0.1));border-radius:14px;padding:16px;border:1px solid rgba(244,114,182,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:32px;filter:drop-shadow(0 0 10px #f472b6);">✨</span>
      <div><h2 style="margin:0;color:#fbcfe8;font-size:16px;font-weight:900;">\${t.title}</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">\${t.sub}</p></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      \${tools.map(tool=>\`<div onclick="window.injectWebArchitect('\${tool.id}')" style="background:rgba(15,23,42,0.8);border:1px solid \${tool.color}44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor='\${tool.color}';this.style.boxShadow='0 0 15px \${tool.color}33';" onmouseout="this.style.borderColor='\${tool.color}44';this.style.boxShadow='none';">
        <div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:\${tool.color}18;border-radius:10px;">\${tool.icon}</div>
        <div style="flex:1;"><div style="color:\${tool.color};font-weight:800;font-size:13px;">\${t.tools[tool.id].name}</div><div style="color:#64748b;font-size:10px;margin-top:3px;">\${t.tools[tool.id].desc}</div></div>
      </div>\`).join('')}
    </div></div>\`;
};
window.injectWebArchitect=function(id){
  let c='';
  if(id==='hero') c=getHeroCode();
  else if(id==='glass') c=getGlassCode();
  else if(id==='bg') c=getBgCode();
  else if(id==='pricing') c=getPricingCode();
  else if(id==='nav') c=getNavCode();
  else if(id==='cards') c=getCardsCode();
  if(c) window._injectWebArchitectCode(c);
};

${b64Inject('getHeroCode', w1)}
${b64Inject('getGlassCode', w2)}
${b64Inject('getBgCode', w3)}
${b64Inject('getPricingCode', w4)}
${b64Inject('getNavCode', w5)}
${b64Inject('getCardsCode', w6)}

const _oa=window.applyLang;
window.applyLang=function(lang){
  if(window.activeTab==='webarchitect') window.initWebArchitectStudio(lang);
  if(typeof _oa==='function')_oa(lang);
};
})();`;

fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/web-architect-studio.js', jsCode);
console.log("web-architect-studio.js has been generated successfully with direct HTML component injection.");
