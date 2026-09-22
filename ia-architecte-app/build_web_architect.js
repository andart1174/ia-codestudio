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
  hero:{name:'Landing Page Hero',desc:'Generate a responsive Hero Section with gradients or glassmorphism.',injectBtn:'🌆 Inject Hero'},
  glass:{name:'Glassmorphism UI',desc:'Generate modern frosted glass components and CSS.',injectBtn:'🪟 Inject Glass UI'},
  bg:{name:'Animated Backgrounds',desc:'Generate fluid mesh gradients and cyberpunk grids.',injectBtn:'✨ Inject Background'},
  pricing:{name:'Pricing Tables Pro',desc:'Generate SaaS pricing tables with monthly/yearly toggles.',injectBtn:'💳 Inject Pricing'},
  nav:{name:'Mega-Menu Nav',desc:'Generate modern navigation bars with responsive menus.',injectBtn:'🧭 Inject Navbar'},
  cards:{name:'3D Hover Cards',desc:'Generate dynamic 3D tilting product cards.',injectBtn:'🎴 Inject 3D Cards'}
}},fr:{title:'ARCHITECTE WEB',sub:'Générateur de Composants UI',back:'← Retour',injected:'✅ Composant Injecté!',tools:{
  hero:{name:'Landing Page Hero',desc:'Générez une section Hero responsive avec gradients ou glassmorphism.',injectBtn:'🌆 Injecter Hero'},
  glass:{name:'Interface Glassmorphism',desc:'Générez des composants en verre givré et CSS moderne.',injectBtn:'🪟 Injecter Glass UI'},
  bg:{name:'Fonds Animés',desc:'Générez des gradients fluides et des grilles cyberpunk.',injectBtn:'✨ Injecter Fond Animé'},
  pricing:{name:'Tableaux de Prix Pro',desc:'Générez des tableaux de prix SaaS avec switch mensuel/annuel.',injectBtn:'💳 Injecter Prix'},
  nav:{name:'Mega-Menu Nav',desc:'Générez des barres de navigation modernes et responsives.',injectBtn:'🧭 Injecter Navbar'},
  cards:{name:'Cartes 3D Hover',desc:'Générez des cartes produits dynamiques avec inclinaison 3D.',injectBtn:'🎴 Injecter Cartes 3D'}
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
    {id:'hero',icon:'🌆',color:'#f472b6'},
    {id:'glass',icon:'🪟',color:'#38bdf8'},
    {id:'bg',icon:'✨',color:'#a855f7'},
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
      \${tools.map(tool=>\`<div onclick="window.handleWebArchitectTool('\${tool.id}')" style="background:rgba(15,23,42,0.8);border:1px solid \${tool.color}44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor='\${tool.color}';this.style.boxShadow='0 0 15px \${tool.color}33';" onmouseout="this.style.borderColor='\${tool.color}44';this.style.boxShadow='none';">
        <div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:\${tool.color}18;border-radius:10px;">\${tool.icon}</div>
        <div style="flex:1;"><div style="color:\${tool.color};font-weight:800;font-size:13px;">\${t.tools[tool.id].name}</div><div style="color:#64748b;font-size:10px;margin-top:3px;">\${t.tools[tool.id].desc}</div></div>
      </div>\`).join('')}
    </div></div>\`;
};
window.handleWebArchitectTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  let toolData = t.tools[toolId];
  let color = '#f472b6';
  if(toolId==='glass') color='#38bdf8';
  if(toolId==='bg') color='#a855f7';
  if(toolId==='pricing') color='#10b981';
  if(toolId==='nav') color='#f59e0b';
  if(toolId==='cards') color='#ef4444';
  
  el.innerHTML=\`<div style="padding:15px;font-family:'Inter',sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:#020617;">
    <button onclick="window.initWebArchitectStudio('\${lang}')" style="background:transparent;border:1px solid #334155;color:#94a3b8;padding:8px 15px;border-radius:8px;cursor:pointer;align-self:flex-start;margin-bottom:20px;font-weight:bold;">\${t.back}</button>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px dashed \${color}55;border-radius:16px;padding:20px;background:rgba(15,23,42,0.5);">
      <h3 style="color:\${color};margin:0 0 10px;font-size:18px;">\${toolData.name}</h3>
      <p style="color:#64748b;font-size:12px;margin:0 0 20px;">\${toolData.desc}</p>
      <div style="font-size:64px;margin-bottom:30px;filter:drop-shadow(0 0 20px \${color}66);">⚙️</div>
      <div style="color:#cbd5e1;font-size:12px;margin-bottom:20px;background:#1e293b;padding:10px 15px;border-radius:8px;width:100%;">Ready to inject into the editor</div>
    </div>
    <button onclick="window.injectWebArchitect('\${toolId}')" style="background:\${color};color:#000;border:none;padding:16px;border-radius:12px;font-size:15px;font-weight:900;cursor:pointer;margin-top:20px;transition:0.2s;box-shadow:0 0 20px \${color}44;">\${toolData.injectBtn}</button>
  </div>\`;
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
console.log("web-architect-studio.js has been generated successfully.");
