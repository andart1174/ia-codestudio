/**
 * 404 Page Generator + CSS Unit Converter — EN/FR
 */

/* ─── 404 PAGE GENERATOR ─── */
(function(){
'use strict';
var TX={
  en:{tab:'404',title:'🎭 404 Page Generator',sub:'Creative animated 404 pages',
    style:'Style:',title2:'Page title:',msg:'Message:',homeUrl:'Home URL:',homeBtn:'Button text:',
    btnGen:'🎭 Generate Page',btnCopy:'📋 Copy HTML',btnInject:'💉 To Editor',copied:'Copied!'},
  fr:{tab:'404',title:'🎭 Générateur Page 404',sub:'Pages 404 créatives et animées',
    style:'Style :',title2:'Titre :',msg:'Message :',homeUrl:'URL accueil :',homeBtn:'Texte bouton :',
    btnGen:'🎭 Générer Page',btnCopy:'📋 Copier HTML',btnInject:'💉 Vers Éditeur',copied:'Copié !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var STYLES=['space','glitch','robot','minimal','retro'];
var D={style:'space',title2:'Page Not Found',msg:'The page you\'re looking for has vanished into the void.',homeUrl:'/',homeBtn:'Back to Home'};

var PAGES={
space:function(d){return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — '+d.title2+'</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{min-height:100vh;background:#0a0a1a;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;overflow:hidden;color:#fff;}.stars{position:fixed;inset:0;}.star{position:absolute;border-radius:50%;background:#fff;animation:twinkle 3s infinite;}@keyframes twinkle{0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:1;transform:scale(1.5);}}.content{text-align:center;z-index:1;}.num{font-size:clamp(100px,20vw,200px);font-weight:900;background:linear-gradient(135deg,#6366f1,#38bdf8,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;animation:float 4s ease-in-out infinite;}@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);}}.rocket{font-size:60px;animation:rocket 3s ease-in-out infinite;}@keyframes rocket{0%{transform:rotate(-10deg) translateY(0);}50%{transform:rotate(10deg) translateY(-15px);}100%{transform:rotate(-10deg) translateY(0);}}.msg{font-size:18px;color:#94a3b8;margin:16px 0 32px;max-width:400px;}a{display:inline-block;background:linear-gradient(135deg,#6366f1,#3b82f6);color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;transition:all 0.3s;box-shadow:0 0 30px rgba(99,102,241,0.5);}a:hover{transform:translateY(-3px);box-shadow:0 10px 40px rgba(99,102,241,0.7);}</style></head><body>'+
'<div class="stars" id="stars"></div>'+
'<div class="content"><div class="rocket">🚀</div><div class="num">404</div><p class="msg">'+d.msg+'</p><a href="'+d.homeUrl+'">'+d.homeBtn+'</a></div>'+
'<script>var s=document.getElementById("stars");for(var i=0;i<80;i++){var el=document.createElement("div");el.className="star";el.style.cssText="width:"+(Math.random()*3+1)+"px;height:"+(Math.random()*3+1)+"px;top:"+Math.random()*100+"%;left:"+Math.random()*100+"%;animation-delay:"+Math.random()*3+"s;animation-duration:"+(Math.random()*3+2)+"s;";s.appendChild(el);}<\/script></body></html>';},

glitch:function(d){return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — '+d.title2+'</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{min-height:100vh;background:#000;display:flex;align-items:center;justify-content:center;font-family:"Courier New",monospace;color:#0f0;}.content{text-align:center;}.num{font-size:clamp(80px,18vw,180px);font-weight:900;color:#0f0;position:relative;text-shadow:3px 0 #f00,-3px 0 #00f;animation:glitch 0.5s infinite;}@keyframes glitch{0%,100%{text-shadow:3px 0 #f00,-3px 0 #00f;}25%{text-shadow:-3px 0 #f00,3px 0 #00f;clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%);}50%{text-shadow:3px 2px #f00,-3px -2px #00f;}75%{text-shadow:-3px 2px #f00,3px -2px #00f;clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);}}.scan{position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,255,0,0.02) 50%);background-size:100% 4px;pointer-events:none;}.msg{color:#0f0;font-size:16px;margin:16px 0 30px;opacity:0.8;}a{display:inline-block;border:2px solid #0f0;color:#0f0;padding:12px 28px;text-decoration:none;font-family:"Courier New",monospace;font-weight:700;animation:blink 1s step-end infinite;}@keyframes blink{50%{border-color:transparent;color:transparent;}}</style></head><body><div class="scan"></div>'+
'<div class="content"><div class="num">404</div><p class="msg">> ERROR: '+d.msg+'</p><a href="'+d.homeUrl+'">'+d.homeBtn+' ▶</a></div></body></html>';},

robot:function(d){return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — '+d.title2+'</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{min-height:100vh;background:linear-gradient(135deg,#1e293b,#0f172a);display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;color:#e2e8f0;}.content{text-align:center;}.robot{font-size:80px;animation:shake 2s ease-in-out infinite;}@keyframes shake{0%,100%{transform:rotate(0);}10%,30%,50%,70%,90%{transform:rotate(-5deg);}20%,40%,60%,80%{transform:rotate(5deg);}}.num{font-size:clamp(80px,15vw,160px);font-weight:900;color:#38bdf8;margin:10px 0;}.msg{color:#94a3b8;font-size:16px;margin:12px 0 28px;}a{display:inline-block;background:#38bdf8;color:#0f172a;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:900;font-size:15px;transition:all 0.2s;}a:hover{background:#60cdff;transform:scale(1.05);}</style></head><body>'+
'<div class="content"><div class="robot">🤖</div><div class="num">404</div><p class="msg">'+d.msg+'</p><a href="'+d.homeUrl+'">'+d.homeBtn+'</a></div></body></html>';},

minimal:function(d){return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — '+d.title2+'</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{min-height:100vh;background:#fff;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;}.content{text-align:center;}.line{width:60px;height:3px;background:#000;margin:0 auto 30px;}.num{font-size:clamp(80px,15vw,160px);font-weight:900;color:#000;letter-spacing:-5px;}.sub{font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#666;margin:8px 0 32px;}a{display:inline-block;background:#000;color:#fff;padding:12px 32px;text-decoration:none;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;transition:background 0.2s;}a:hover{background:#333;}</style></head><body>'+
'<div class="content"><div class="line"></div><div class="num">404</div><p class="sub">'+d.title2+'</p><p style="color:#999;font-size:14px;margin-bottom:24px;">'+d.msg+'</p><a href="'+d.homeUrl+'">'+d.homeBtn+'</a></div></body></html>';},

retro:function(d){return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 — '+d.title2+'</title><style>@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");*{margin:0;padding:0;box-sizing:border-box;}body{min-height:100vh;background:#1a0a2e;display:flex;align-items:center;justify-content:center;font-family:"Press Start 2P",monospace;color:#fff;image-rendering:pixelated;}.content{text-align:center;border:4px solid #ff6b6b;padding:30px;box-shadow:8px 8px 0 #ff6b6b;}.num{font-size:clamp(40px,10vw,80px);color:#ffd700;text-shadow:4px 4px 0 #ff6b6b;animation:blink2 1s step-end infinite;}@keyframes blink2{50%{opacity:0;}}.msg{font-size:8px;color:#b9f2ff;margin:20px 0;line-height:2;}a{display:inline-block;background:#ffd700;color:#000;padding:12px 20px;text-decoration:none;font-size:9px;margin-top:16px;border:3px solid #000;box-shadow:3px 3px 0 #000;cursor:pointer;}a:hover{transform:translate(3px,3px);box-shadow:none;}</style></head><body>'+
'<div class="content"><div class="num">404</div><p style="font-size:8px;margin:12px 0;color:#ffd700;">GAME OVER</p><p class="msg">'+d.msg+'</p><a href="'+d.homeUrl+'">'+d.homeBtn+' &gt;&gt;</a></div></body></html>';}
};

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(88,28,135,0.3),rgba(168,85,247,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  // Style selector chips
  var chipWrap=document.createElement('div');chipWrap.style='display:flex;flex-wrap:wrap;gap:4px;';
  STYLES.forEach(function(s){
    var ch=document.createElement('button');ch.textContent=s.charAt(0).toUpperCase()+s.slice(1);
    ch.style='padding:5px 10px;border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(168,85,247,'+(D.style===s?'0.8)':'0.3)')+';background:rgba(168,85,247,'+(D.style===s?'0.2)':'0.05)')+';color:'+(D.style===s?'#c084fc':'#64748b')+';';
    ch.onclick=function(){D.style=s;renderTab();};chipWrap.appendChild(ch);});
  body.appendChild(chipWrap);

  function mkF(lbl,key,ph){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var i=document.createElement('input');i.type='text';i.value=D[key];i.placeholder=ph||'';i.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(168,85,247,0.15);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){D[key]=this.value;};w.appendChild(l);w.appendChild(i);return w;}
  body.appendChild(mkF(t('title2'),'title2','Page Not Found'));
  body.appendChild(mkF(t('msg'),'msg'));
  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  r2.appendChild(mkF(t('homeUrl'),'homeUrl','/'));r2.appendChild(mkF(t('homeBtn'),'homeBtn','Back Home'));body.appendChild(r2);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#581c87,#9333ea);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(147,51,234,0.3);';
  body.appendChild(genBtn);
  var ifr=document.createElement('iframe');ifr.style='width:100%;height:220px;border:1px solid rgba(168,85,247,0.2);border-radius:8px;display:none;';
  var actRow=document.createElement('div');actRow.style='display:none;flex;gap:5px;';
  var cpB=document.createElement('button');cpB.innerHTML=t('btnCopy');cpB.style='flex:1;background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var ijB=document.createElement('button');ijB.innerHTML=t('btnInject');ijB.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  actRow.appendChild(cpB);if(window.editor)actRow.appendChild(ijB);
  body.appendChild(ifr);body.appendChild(actRow);wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var html=(PAGES[D.style]||PAGES.space)(D);
    ifr.style.display='';actRow.style.display='flex';
    ifr.contentDocument.open();ifr.contentDocument.write(html);ifr.contentDocument.close();
    cpB.onclick=function(){navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    if(window.editor)ijB.onclick=function(){window.editor.setValue((window.formatHTML||function(h){return h;})(html));};
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-404gen');if(el)el.textContent=t('tab');if(window.activeTab==='404gen')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='404gen'){window.activeTab='404gen';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-404gen');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ─── CSS UNIT CONVERTER ─── */
(function(){
'use strict';
var TX={
  en:{tab:'Units',title:'🧮 CSS Unit Converter',sub:'px ↔ rem ↔ vw ↔ em ↔ % live',
    base:'Base font size (px):',vp:'Viewport width (px):',parent:'Parent element (px):',
    input:'Enter value:',from:'From:',to:'To:',result:'Result:',
    allUnits:'All equivalents:'},
  fr:{tab:'Unités',title:'🧮 Convertisseur Unités CSS',sub:'px ↔ rem ↔ vw ↔ em ↔ % en direct',
    base:'Taille police de base (px) :',vp:'Largeur viewport (px) :',parent:'Élément parent (px) :',
    input:'Entrez la valeur :',from:'De :',to:'Vers :',result:'Résultat :',
    allUnits:'Tous les équivalents :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var CFG={base:16,vp:1440,parent:1000};
var UNITS=['px','rem','em','%','vw','vh','vmin','pt','cm','mm'];

function toPx(val,unit){
  switch(unit){
    case'px':return val;
    case'rem':return val*CFG.base;
    case'em':return val*(CFG.parent||CFG.base);
    case'%':return val/100*CFG.parent;
    case'vw':return val/100*CFG.vp;
    case'vh':return val/100*(CFG.vp*0.5625);
    case'vmin':return val/100*Math.min(CFG.vp,CFG.vp*0.5625);
    case'pt':return val*1.3333;
    case'cm':return val*37.7953;
    case'mm':return val*3.77953;
    default:return val;
  }
}
function fromPx(px,unit){
  switch(unit){
    case'px':return px;
    case'rem':return px/CFG.base;
    case'em':return px/(CFG.parent||CFG.base);
    case'%':return px/CFG.parent*100;
    case'vw':return px/CFG.vp*100;
    case'vh':return px/(CFG.vp*0.5625)*100;
    case'vmin':return px/Math.min(CFG.vp,CFG.vp*0.5625)*100;
    case'pt':return px/1.3333;
    case'cm':return px/37.7953;
    case'mm':return px/3.77953;
    default:return px;
  }
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(6,182,212,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(8,51,68,0.3),rgba(6,182,212,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#22d3ee;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  // Config row
  var cfgRow=document.createElement('div');cfgRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;';
  function mkCfg(lbl,key){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:8px;color:#64748b;font-weight:600;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';l.textContent=lbl;var i=document.createElement('input');i.type='number';i.value=CFG[key];i.style='width:100%;background:#0f172a;color:#22d3ee;border:1px solid rgba(6,182,212,0.2);padding:5px 6px;border-radius:6px;font-size:10px;outline:none;';i.oninput=function(){CFG[key]=+this.value;update();};w.appendChild(l);w.appendChild(i);return w;}
  cfgRow.appendChild(mkCfg(t('base'),'base'));cfgRow.appendChild(mkCfg(t('vp'),'vp'));cfgRow.appendChild(mkCfg(t('parent'),'parent'));body.appendChild(cfgRow);

  // Input + from/to selects
  var mainRow=document.createElement('div');mainRow.style='display:grid;grid-template-columns:1fr 70px 70px;gap:5px;align-items:end;';
  var valWrap=document.createElement('div');var vlbl=document.createElement('div');vlbl.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';vlbl.textContent=t('input');
  var valInp=document.createElement('input');valInp.type='number';valInp.value='16';valInp.style='width:100%;background:#0f172a;color:#22d3ee;border:1px solid rgba(6,182,212,0.3);padding:7px 8px;border-radius:7px;font-size:13px;font-weight:700;outline:none;';
  valWrap.appendChild(vlbl);valWrap.appendChild(valInp);

  function mkSel(lbl,def){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var s=document.createElement('select');s.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(6,182,212,0.2);padding:6px 4px;border-radius:6px;font-size:10px;outline:none;';UNITS.forEach(function(u){var op=document.createElement('option');op.value=u;op.textContent=u;if(u===def)op.selected=true;s.appendChild(op);});w.appendChild(l);w.appendChild(s);return{wrap:w,sel:s};}
  var fromSel=mkSel(t('from'),'px');var toSel=mkSel(t('to'),'rem');
  mainRow.appendChild(valWrap);mainRow.appendChild(fromSel.wrap);mainRow.appendChild(toSel.wrap);body.appendChild(mainRow);

  // Result
  var resCard=document.createElement('div');resCard.style='background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:10px;padding:12px;text-align:center;';
  var resVal=document.createElement('div');resVal.style='font-size:28px;font-weight:900;color:#22d3ee;margin-bottom:4px;';
  var resLabel=document.createElement('div');resLabel.style='font-size:10px;color:#64748b;';
  resCard.appendChild(resVal);resCard.appendChild(resLabel);body.appendChild(resCard);

  // All units table
  var allLabel=document.createElement('div');allLabel.style='font-size:9px;color:#64748b;font-weight:600;margin-top:4px;';allLabel.textContent=t('allUnits');body.appendChild(allLabel);
  var allGrid=document.createElement('div');allGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:4px;';body.appendChild(allGrid);

  wrap.appendChild(body);parent.appendChild(wrap);

  function update(){
    var val=+valInp.value||0;var fromU=fromSel.sel.value;var toU=toSel.sel.value;
    var px=toPx(val,fromU);var converted=fromPx(px,toU);
    var decimals=toU==='px'||toU==='pt'?2:4;
    resVal.textContent=converted.toFixed(decimals)+toU;
    resLabel.textContent=val+fromU+' = '+converted.toFixed(decimals)+toU+' (base '+CFG.base+'px)';
    allGrid.innerHTML='';
    UNITS.forEach(function(u){
      var v=fromPx(px,u);var dec=u==='px'||u==='pt'?2:4;
      var card=document.createElement('div');card.style='background:rgba(255,255,255,0.03);border:1px solid rgba(6,182,212,'+(u===toU?'0.4)':'0.1)')+';border-radius:6px;padding:6px 8px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;';
      var uLabel=document.createElement('span');uLabel.style='font-size:9px;color:#64748b;font-weight:600;';uLabel.textContent=u;
      var uVal=document.createElement('span');uVal.style='font-size:11px;font-weight:700;color:'+(u===toU?'#22d3ee':'#e2e8f0')+';font-family:"JetBrains Mono",monospace;';uVal.textContent=v.toFixed(dec);
      card.appendChild(uLabel);card.appendChild(uVal);
      card.onclick=function(){toSel.sel.value=u;update();};allGrid.appendChild(card);
    });
  }
  valInp.oninput=update;fromSel.sel.onchange=update;toSel.sel.onchange=update;update();
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-units');if(el)el.textContent=t('tab');if(window.activeTab==='units')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='units'){window.activeTab='units';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-units');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
