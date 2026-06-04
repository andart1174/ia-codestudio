const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/web-architect-studio.js";

const w1 = fs.readFileSync('w1.html', 'utf8');
const w2 = fs.readFileSync('w2.html', 'utf8');
const w3 = fs.readFileSync('w3.html', 'utf8');
const w4 = fs.readFileSync('w4.html', 'utf8');
const w5 = fs.readFileSync('w5.html', 'utf8');
const w6 = fs.readFileSync('w6.html', 'utf8');
const w7 = fs.readFileSync('w7.html', 'utf8');
const w8 = fs.readFileSync('w8.html', 'utf8');
const w9 = fs.readFileSync('w9.html', 'utf8');
const w10 = fs.readFileSync('w10.html', 'utf8');

function b64Inject(funcName, htmlContent) {
  let b64 = Buffer.from(htmlContent, 'utf8').toString('base64');
  return `function ${funcName}() { return decodeURIComponent(escape(atob("${b64}"))); }`;
}

const jsCode = `(function(){
'use strict';
const TX={en:{title:'WEB ARCHITECT',sub:'UI Component & Template Forge',back:'← Back',injected:'✅ Component Injected!',copied:'📋 Code Copied!',inserted:'📍 Component Inserted!',tools:{
  hero:{name:'Landing Page Hero',desc:'Inject a responsive Hero Section with gradients or glassmorphism.'},
  glass:{name:'Glassmorphism UI',desc:'Inject modern frosted glass components and CSS.'},
  bg:{name:'Animated Backgrounds',desc:'Inject fluid mesh gradients and cyberpunk grids.'},
  pricing:{name:'Pricing Tables Pro',desc:'Inject SaaS pricing tables with hover animations.'},
  nav:{name:'Mega-Menu Nav',desc:'Inject modern navigation bars with responsive menus.'},
  cards:{name:'3D Hover Cards',desc:'Inject dynamic 3D tilting product cards.'},
  testi:{name:'Testimonial 3D Carousel',desc:'Inject a modern sliding carousel for user reviews.'},
  neu:{name:'Neumorphism Login',desc:'Inject a login form with extruded plastic 3D effects.'},
  time:{name:'Parallax Timeline',desc:'Inject an animated roadmap timeline that reacts to scroll.'},
  footer:{name:'Ultra-Modern Footer',desc:'Inject a massive footer with newsletter and links grid.'}
},btnInject:'💉 Inject Code',btnCopy:'📋 Copy Code',btnInsert:'📍 Inject in existing App'},fr:{title:'ARCHITECTE WEB',sub:'Générateur de Composants UI',back:'← Retour',injected:'✅ Composant Injecté!',copied:'📋 Code Copié!',inserted:'📍 Composant Inséré!',tools:{
  hero:{name:'Landing Page Hero',desc:'Injectez une section Hero responsive.'},
  glass:{name:'Interface Glassmorphism',desc:'Injectez des composants en verre givré et CSS moderne.'},
  bg:{name:'Fonds Animés',desc:'Injectez des gradients fluides et animés.'},
  pricing:{name:'Tableaux de Prix Pro',desc:'Injectez des tableaux de prix SaaS.'},
  nav:{name:'Mega-Menu Nav',desc:'Injectez des barres de navigation modernes.'},
  cards:{name:'Cartes 3D Hover',desc:'Injectez des cartes dynamiques avec inclinaison 3D.'},
  testi:{name:'Carrousel Testimonial 3D',desc:'Injectez un carrousel moderne pour les avis clients.'},
  neu:{name:'Login Neumorphism',desc:'Injectez un formulaire de login avec effet plastique 3D extrudé.'},
  time:{name:'Timeline Parallax',desc:'Injectez une roadmap animée qui réagit au défilement.'},
  footer:{name:'Footer Ultra-Moderne',desc:'Injectez un grand footer avec newsletter et grille de liens.'}
},btnInject:'💉 Injecter le Code',btnCopy:'📋 Copier le Code',btnInsert:'📍 Injecter dans l\\'App'}};

function gl(){return window.appLang||'en';}

window._injectWebArchitectCode=function(c, mode){
  if(window.editor){
    const t = TX[gl()]||TX.en;
    if(mode === 'replace') {
      window.editor.setValue(c);
      if(window.runPreview)window.runPreview();
      if(window.showToast)window.showToast(t.injected);
    } else if(mode === 'insert') {
      if(window.editor.insert) {
        window.editor.insert(c);
      } else {
        window.editor.setValue(window.editor.getValue() + "\\n" + c);
      }
      if(window.runPreview)window.runPreview();
      if(window.showToast)window.showToast(t.inserted);
    }
  }
};

window._copyWebArchitectCode=function(c){
  navigator.clipboard.writeText(c).then(()=>{
    if(window.showToast)window.showToast((TX[gl()]||TX.en).copied);
  });
};

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
    {id:'cards',icon:'🎴',color:'#ef4444'},
    {id:'testi',icon:'💬',color:'#38bdf8'},
    {id:'neu',icon:'🔐',color:'#94a3b8'},
    {id:'time',icon:'⏳',color:'#8b5cf6'},
    {id:'footer',icon:'🦶',color:'#f472b6'}
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
  let color = '#0ea5e9';
  if(toolId==='glass') color='#c084fc';
  if(toolId==='bg') color='#f43f5e';
  if(toolId==='pricing') color='#10b981';
  if(toolId==='nav') color='#f59e0b';
  if(toolId==='cards') color='#ef4444';
  if(toolId==='testi') color='#38bdf8';
  if(toolId==='neu') color='#94a3b8';
  if(toolId==='time') color='#8b5cf6';
  if(toolId==='footer') color='#f472b6';
  
  el.innerHTML=\`<div style="padding:15px;font-family:'Inter',sans-serif;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:#020617;">
    <button onclick="window.initWebArchitectStudio('\${lang}')" style="background:transparent;border:1px solid #334155;color:#94a3b8;padding:8px 15px;border-radius:8px;cursor:pointer;align-self:flex-start;margin-bottom:20px;font-weight:bold;">\${t.back}</button>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px dashed \${color}55;border-radius:16px;padding:20px;background:rgba(15,23,42,0.5);">
      <h3 style="color:\${color};margin:0 0 10px;font-size:18px;">\${toolData.name}</h3>
      <p style="color:#64748b;font-size:12px;margin:0 0 20px;">\${toolData.desc}</p>
      <div style="font-size:64px;margin-bottom:30px;filter:drop-shadow(0 0 20px \${color}66);">✨</div>
    </div>
    
    <div style="display:flex;gap:10px;margin-top:20px;">
      <button onclick="window.executeWebArchitect('\${toolId}', 'replace')" style="flex:1;background:\${color};color:#000;border:none;padding:12px;border-radius:8px;font-size:13px;font-weight:900;cursor:pointer;transition:0.2s;">\${t.btnInject}</button>
      <button onclick="window.executeWebArchitect('\${toolId}', 'copy')" style="flex:1;background:rgba(255,255,255,0.1);color:#fff;border:1px solid #334155;padding:12px;border-radius:8px;font-size:13px;font-weight:900;cursor:pointer;transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">\${t.btnCopy}</button>
    </div>
    <button onclick="window.executeWebArchitect('\${toolId}', 'insert')" style="width:100%;margin-top:10px;background:transparent;color:\${color};border:1px solid \${color};padding:12px;border-radius:8px;font-size:13px;font-weight:900;cursor:pointer;transition:0.2s;" onmouseover="this.style.background='\${color}22'" onmouseout="this.style.background='transparent'">\${t.btnInsert}</button>
  </div>\`;
};

window.executeWebArchitect=function(id, action){
  let c='';
  if(id==='hero') c=getHeroCode();
  else if(id==='glass') c=getGlassCode();
  else if(id==='bg') c=getBgCode();
  else if(id==='pricing') c=getPricingCode();
  else if(id==='nav') c=getNavCode();
  else if(id==='cards') c=getCardsCode();
  else if(id==='testi') c=getTestiCode();
  else if(id==='neu') c=getNeuCode();
  else if(id==='time') c=getTimeCode();
  else if(id==='footer') c=getFooterCode();
  
  if(c) {
    if(action === 'copy') window._copyWebArchitectCode(c);
    else window._injectWebArchitectCode(c, action);
  }
};

${b64Inject('getHeroCode', w1)}
${b64Inject('getGlassCode', w2)}
${b64Inject('getBgCode', w3)}
${b64Inject('getPricingCode', w4)}
${b64Inject('getNavCode', w5)}
${b64Inject('getCardsCode', w6)}
${b64Inject('getTestiCode', w7)}
${b64Inject('getNeuCode', w8)}
${b64Inject('getTimeCode', w9)}
${b64Inject('getFooterCode', w10)}

const _oa=window.applyLang;
window.applyLang=function(lang){
  if(window.activeTab==='webarchitect') window.initWebArchitectStudio(lang);
  if(typeof _oa==='function')_oa(lang);
};
})();`;

fs.writeFileSync(path, jsCode);
console.log("Updated Web Architect Studio with 10 tools.");
