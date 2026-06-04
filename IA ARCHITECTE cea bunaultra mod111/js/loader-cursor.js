/**
 * Loading Screen Builder + Cursor Effects Studio — EN/FR (compact)
 */
(function(){
'use strict';
// ── LOADING SCREEN BUILDER ──
var TL={en:{tab:'Loader',title:'💫 Loading Screen Builder',sub:'Animated loading screens',style:'Style:',color:'Color:',text:'Loading text:',speed:'Speed:',btnGen:'💫 Generate',btnCopy:'📋 Copy',btnInject:'💉 To Editor',copied:'Copied!'},fr:{tab:'Loader',title:'💫 Constructeur Loading',sub:'Écrans de chargement animés',style:'Style :',color:'Couleur :',text:'Texte :',speed:'Vitesse :',btnGen:'💫 Générer',btnCopy:'📋 Copier',btnInject:'💉 Injecter',copied:'Copié !'}};
function gl(){return window.lang||'en';}
function tl(k){return(TL[gl()]||TL.en)[k]||k;}

var LD={style:'spinner',color:'#38bdf8',text:'Loading...',speed:'1'};

function genLoader(){
  var c=LD.color,tx=LD.text,sp=LD.speed+'s';
  var LOADERS={
    spinner:'<style>.ldr{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:sans-serif;}.spin{width:60px;height:60px;border:5px solid #1e293b;border-top:5px solid '+c+';border-radius:50%;animation:sp '+sp+' linear infinite;}@keyframes sp{to{transform:rotate(360deg);}}.lt{color:'+c+';font-size:14px;margin-top:20px;font-weight:600;letter-spacing:0.1em;}</style><div class="ldr"><div class="spin"></div><p class="lt">'+tx+'</p></div>',
    pulse:'<style>.ldr{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:sans-serif;}.pulse{width:60px;height:60px;background:'+c+';border-radius:50%;animation:pu '+sp+' ease-in-out infinite;}@keyframes pu{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.5);opacity:0.5;}}.lt{color:'+c+';font-size:14px;margin-top:20px;font-weight:600;}</style><div class="ldr"><div class="pulse"></div><p class="lt">'+tx+'</p></div>',
    dots:'<style>.ldr{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:sans-serif;}.dots{display:flex;gap:10px;}.dot{width:14px;height:14px;background:'+c+';border-radius:50%;animation:do '+sp+' ease-in-out infinite;}.dot:nth-child(2){animation-delay:0.2s;}.dot:nth-child(3){animation-delay:0.4s;}@keyframes do{0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);}}.lt{color:'+c+';font-size:14px;margin-top:20px;font-weight:600;}</style><div class="ldr"><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><p class="lt">'+tx+'</p></div>',
    bar:'<style>.ldr{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:sans-serif;}.bar-wrap{width:200px;height:6px;background:#1e293b;border-radius:3px;overflow:hidden;}.bar-fill{height:100%;background:'+c+';border-radius:3px;animation:bar '+sp+' ease-in-out infinite;}@keyframes bar{0%{width:0;}70%{width:100%;}100%{width:100%;opacity:0;}}.lt{color:'+c+';font-size:14px;margin-top:14px;font-weight:600;}</style><div class="ldr"><div class="bar-wrap"><div class="bar-fill"></div></div><p class="lt">'+tx+'</p></div>',
    wave:'<style>.ldr{position:fixed;inset:0;background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:sans-serif;}.bars{display:flex;gap:5px;align-items:center;height:50px;}.b{width:8px;background:'+c+';border-radius:4px;animation:wa '+sp+' ease-in-out infinite;}.b:nth-child(1){animation-delay:0s;}.b:nth-child(2){animation-delay:0.1s;}.b:nth-child(3){animation-delay:0.2s;}.b:nth-child(4){animation-delay:0.3s;}.b:nth-child(5){animation-delay:0.4s;}@keyframes wa{0%,100%{height:10px;}50%{height:50px;}}.lt{color:'+c+';font-size:14px;margin-top:16px;font-weight:600;}</style><div class="ldr"><div class="bars"><div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div></div><p class="lt">'+tx+'</p></div>'
  };
  var inner=LOADERS[LD.style]||LOADERS.spinner;
  return'<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;background:#0f172a;">'+inner+'</body></html>';
}

function renderLoaderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(236,72,153,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(131,24,67,0.2),rgba(236,72,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  var chips=document.createElement('div');chips.style='display:flex;flex-wrap:wrap;gap:4px;';
  ['spinner','pulse','dots','bar','wave'].forEach(function(s){
    var b=document.createElement('button');b.textContent=s;
    b.style='padding:5px 10px;border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(236,72,153,'+(LD.style===s?'0.8':'0.2')+');background:rgba(236,72,153,'+(LD.style===s?'0.2':'0.04')+');color:'+(LD.style===s?'#f472b6':'#64748b')+';';
    b.onclick=function(){LD.style=s;renderLoaderTab();};chips.appendChild(b);
  });
  body.appendChild(chips);

  function mkF(lbl,key,type){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var i=document.createElement('input');i.type=type||'text';i.value=LD[key];i.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(236,72,153,0.15);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){LD[key]=this.value;};w.appendChild(l);w.appendChild(i);return w;}
  body.appendChild(mkF(tl('text'),'text'));
  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  r2.appendChild(mkF(tl('color'),'color','color'));r2.appendChild(mkF(tl('speed'),'speed','number'));body.appendChild(r2);

  var genBtn=document.createElement('button');genBtn.innerHTML=tl('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#831843,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(236,72,153,0.3);';
  body.appendChild(genBtn);
  var ifr=document.createElement('iframe');ifr.style='width:100%;height:200px;border:1px solid rgba(236,72,153,0.2);border-radius:8px;display:none;';
  var aRow=document.createElement('div');aRow.style='display:none;gap:5px;';
  var cpB=document.createElement('button');cpB.innerHTML=tl('btnCopy');cpB.style='flex:1;background:rgba(236,72,153,0.1);color:#f472b6;border:1px solid rgba(236,72,153,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var ijB=document.createElement('button');ijB.innerHTML=tl('btnInject');ijB.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  aRow.appendChild(cpB);if(window.editor)aRow.appendChild(ijB);
  body.appendChild(ifr);body.appendChild(aRow);wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    LD.text=body.querySelector('input[type=text]').value||'Loading...';
    LD.speed=body.querySelector('input[type=number]').value||'1';
    LD.color=body.querySelector('input[type=color]').value||'#38bdf8';
    var html=genLoader();ifr.style.display='';aRow.style.display='flex';
    ifr.contentDocument.open();ifr.contentDocument.write(html);ifr.contentDocument.close();
    cpB.onclick=function(){navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast(tl('copied'));});};
    if(window.editor)ijB.onclick=function(){var c2=window.editor.getValue();var p2=c2.indexOf('</body>');var fmt=window.formatHTML||function(h){return h;};window.editor.setValue(p2>-1?c2.slice(0,p2)+'\n<!-- Loader -->\n'+fmt(html)+'\n</body>'+c2.slice(p2+7):c2+'\n'+fmt(html));};
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-loader');if(el)el.textContent=tl('tab');if(window.activeTab==='loader')renderLoaderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='loader'){window.activeTab='loader';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-loader');if(btn)btn.classList.add('active');renderLoaderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();

/* ── CURSOR EFFECTS STUDIO ── */
(function(){
'use strict';
var TC={en:{tab:'Cursor',title:'🖱️ Cursor Effects Studio',sub:'Custom animated cursors for your site',effect:'Effect:',color:'Color:',size:'Size (px):',btnGen:'🖱️ Generate',btnCopy:'📋 Copy Code',btnInject:'💉 Inject',copied:'Copied!',preview:'Click here to test your cursor →'},fr:{tab:'Curseur',title:'🖱️ Studio Effets Curseur',sub:'Curseurs animés pour votre site',effect:'Effet :',color:'Couleur :',size:'Taille :',btnGen:'🖱️ Générer',btnCopy:'📋 Copier',btnInject:'💉 Injecter',copied:'Copié !',preview:'Cliquez ici pour tester →'}};
function gl(){return window.lang||'en';}
function tc(k){return(TC[gl()]||TC.en)[k]||k;}

var CD={effect:'trail',color:'#38bdf8',size:'12'};

function genCursor(){
  var c=CD.color,s=+CD.size||12;
  var EFFECTS={
    trail:'<style>#cursor-dot{position:fixed;width:'+s+'px;height:'+s+'px;background:'+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:transform 0.1s;mix-blend-mode:screen;}body{cursor:none !important;}</style><div id="cursor-dot"></div><script>var d=document.getElementById("cursor-dot");var tx=0,ty=0,cx=0,cy=0;document.addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;});setInterval(function(){cx+=(tx-cx)*0.15;cy+=(ty-cy)*0.15;d.style.left=cx+"px";d.style.top=cy+"px";},16);<\/script>',
    glow:'<style>#cursor-dot{position:fixed;width:'+s+'px;height:'+s+'px;background:'+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 '+s+'px '+c+',0 0 '+(s*2)+'px '+c+',0 0 '+(s*3)+'px '+c+';animation:glowPulse 1.5s ease-in-out infinite;}@keyframes glowPulse{0%,100%{box-shadow:0 0 '+s+'px '+c+',0 0 '+(s*2)+'px '+c+';}50%{box-shadow:0 0 '+(s*2)+'px '+c+',0 0 '+(s*4)+'px '+c+',0 0 '+(s*6)+'px '+c+';}}body{cursor:none !important;}</style><div id="cursor-dot"></div><script>var d=document.getElementById("cursor-dot");document.addEventListener("mousemove",function(e){d.style.left=e.clientX+"px";d.style.top=e.clientY+"px";});<\/script>',
    ripple:'<style>body{cursor:none !important;}.cursor-main{position:fixed;width:'+s+'px;height:'+s+'px;background:'+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);}.cursor-ring{position:fixed;width:'+(s*3)+'px;height:'+(s*3)+'px;border:2px solid '+c+';border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left 0.12s,top 0.12s;opacity:0.5;}.ripple{position:fixed;border-radius:50%;pointer-events:none;animation:rp 0.6s ease-out forwards;}@keyframes rp{0%{width:0;height:0;opacity:0.8;border:2px solid '+c+';}100%{width:'+(s*6)+'px;height:'+(s*6)+'px;opacity:0;border:2px solid '+c+';}}</style><div class="cursor-main" id="cm"></div><div class="cursor-ring" id="cr"></div><script>var m=document.getElementById("cm"),r=document.getElementById("cr");document.addEventListener("mousemove",function(e){m.style.left=e.clientX+"px";m.style.top=e.clientY+"px";r.style.left=e.clientX+"px";r.style.top=e.clientY+"px";});document.addEventListener("click",function(e){var rp=document.createElement("div");rp.className="ripple";rp.style.cssText="left:"+(e.clientX-(3*'+s+'))+"px;top:"+(e.clientY-(3*'+s+'))+"px;z-index:99997;";document.body.appendChild(rp);setTimeout(function(){rp.remove();},600);});<\/script>',
    particles:'<style>body{cursor:none !important;}.c-dot{position:fixed;width:'+s+'px;height:'+s+'px;background:'+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);}.c-particle{position:fixed;border-radius:50%;pointer-events:none;background:'+c+';animation:cp 0.8s ease-out forwards;}@keyframes cp{to{opacity:0;transform:translate(var(--dx),var(--dy)) scale(0);}}</style><div class="c-dot" id="cdot"></div><script>var d=document.getElementById("cdot");document.addEventListener("mousemove",function(e){d.style.left=e.clientX+"px";d.style.top=e.clientY+"px";if(Math.random()>0.6){var p=document.createElement("div");p.className="c-particle";var sz=Math.random()*6+2;p.style.cssText="width:"+sz+"px;height:"+sz+"px;left:"+e.clientX+"px;top:"+e.clientY+"px;z-index:99998;--dx:"+(Math.random()*40-20)+"px;--dy:"+(Math.random()*40-20)+"px;opacity:"+(Math.random()*0.8+0.2)+";";document.body.appendChild(p);setTimeout(function(){p.remove();},800);}});<\/script>',
    magnetic:'<style>body{cursor:none !important;}.mag-cursor{position:fixed;width:'+s+'px;height:'+s+'px;border:2px solid '+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s;}.mag-dot{position:fixed;width:4px;height:4px;background:'+c+';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);}</style><div class="mag-cursor" id="mc"></div><div class="mag-dot" id="md"></div><script>var mc=document.getElementById("mc"),md=document.getElementById("md");var mx=0,my=0,cx2=0,cy2=0;document.addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;md.style.left=mx+"px";md.style.top=my+"px";});setInterval(function(){cx2+=(mx-cx2)*0.1;cy2+=(my-cy2)*0.1;mc.style.left=cx2+"px";mc.style.top=cy2+"px";},16);document.querySelectorAll("a,button").forEach(function(el){el.addEventListener("mouseenter",function(){mc.style.width="'+(s*2.5)+'px";mc.style.height="'+(s*2.5)+'px";});el.addEventListener("mouseleave",function(){mc.style.width="'+s+'px";mc.style.height="'+s+'px";});});<\/script>'
  };
  return EFFECTS[CD.effect]||EFFECTS.trail;
}

function renderCursorTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(49,46,129,0.3),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+tc('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tc('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;';

  var chips=document.createElement('div');chips.style='display:flex;flex-wrap:wrap;gap:4px;';
  ['trail','glow','ripple','particles','magnetic'].forEach(function(s){
    var b=document.createElement('button');b.textContent=s;
    b.style='padding:5px 10px;border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,'+(CD.effect===s?'0.8':'0.2')+');background:rgba(99,102,241,'+(CD.effect===s?'0.2':'0.04')+');color:'+(CD.effect===s?'#818cf8':'#64748b')+';';
    b.onclick=function(){CD.effect=s;renderCursorTab();};chips.appendChild(b);
  });
  body.appendChild(chips);

  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  function mkF2(lbl,key,type){var w=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;';l.textContent=lbl;var i=document.createElement('input');i.type=type;i.value=CD[key];i.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(99,102,241,0.15);padding:6px 8px;border-radius:6px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){CD[key]=this.value;};w.appendChild(l);w.appendChild(i);return w;}
  r2.appendChild(mkF2(tc('color'),'color','color'));r2.appendChild(mkF2(tc('size'),'size','number'));body.appendChild(r2);

  // Preview area
  var prevDiv=document.createElement('div');prevDiv.style='background:#0f172a;border:1px solid rgba(99,102,241,0.2);border-radius:10px;padding:20px;text-align:center;color:#64748b;font-size:11px;min-height:80px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:none;';
  prevDiv.id='cursor-preview-area';prevDiv.textContent=tc('preview');body.appendChild(prevDiv);

  var genBtn=document.createElement('button');genBtn.innerHTML=tc('btnGen');genBtn.style='width:100%;background:linear-gradient(135deg,#312e81,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.3);';
  body.appendChild(genBtn);
  var aRow=document.createElement('div');aRow.style='display:none;gap:5px;';
  var cpB=document.createElement('button');cpB.innerHTML=tc('btnCopy');cpB.style='flex:1;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  var ijB=document.createElement('button');ijB.innerHTML=tc('btnInject');ijB.style='flex:1;background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.2);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  aRow.appendChild(cpB);if(window.editor)aRow.appendChild(ijB);
  body.appendChild(aRow);wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    aRow.style.display='flex';
    var code=genCursor();
    // Live preview in the preview div
    var existDot=prevDiv.querySelector('#cdot,#cm,#cursor-dot,.c-dot,.mag-cursor');if(existDot)existDot.remove();
    prevDiv.style.color=CD.color;prevDiv.textContent=tc('preview');
    // Simple visual feedback
    var fakeDot=document.createElement('div');fakeDot.style='position:absolute;width:'+CD.size+'px;height:'+CD.size+'px;background:'+CD.color+';border-radius:50%;pointer-events:none;transition:left 0.1s,top 0.1s;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 '+(+CD.size)+'px '+CD.color+';';
    prevDiv.appendChild(fakeDot);
    prevDiv.onmousemove=function(e){var r3=prevDiv.getBoundingClientRect();fakeDot.style.left=(e.clientX-r3.left)+'px';fakeDot.style.top=(e.clientY-r3.top)+'px';};
    cpB.onclick=function(){navigator.clipboard.writeText(code).then(function(){if(window.showToast)window.showToast(tc('copied'));});};
    if(window.editor)ijB.onclick=function(){var cv=window.editor.getValue();var pv=cv.indexOf('</body>');var fmt=window.formatHTML||function(h){return h;};window.editor.setValue(pv>-1?cv.slice(0,pv)+'\n'+fmt(code)+'\n</body>'+cv.slice(pv+7):cv+'\n'+fmt(code));};
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cursor');if(el)el.textContent=tc('tab');if(window.activeTab==='cursor')renderCursorTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='cursor'){window.activeTab='cursor';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cursor');if(btn)btn.classList.add('active');renderCursorTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
