/**
 * 🎮 Gamified Ad — Spin Wheel + Scratch Card + Slot — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Gamified Ad',title:'🎮 Gamified Ad Builder',sub:'Spin Wheel · Scratch Card · Slot Machine',
      brand:'Brand',brandP:'e.g. UltraApp',offer:'Main Offer',offerP:'e.g. 50% OFF',
      color:'Color',game:'Game Type',btn:'🎮 Generate',inject:'💉 Inject',copy:'📋 Copy'},
  fr:{tab:'Ad Gamifiée',title:'🎮 Créateur Ad Gamifiée',sub:'Roue · Carte à Gratter · Machine à Sous',
      brand:'Marque',brandP:'ex. UltraApp',offer:'Offre',offerP:'ex. -50%',
      color:'Couleur',game:'Type de Jeu',btn:'🎮 Générer',inject:'💉 Injecter',copy:'📋 Copier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={brand:'UltraApp',offer:'50% OFF',color:'#8b5cf6',game:'wheel'};

function buildWheel(d){
  var prizes=['10% OFF','20% OFF',d.offer,'FREE Trial','30% OFF','Gift!'];
  var colors=['#ef4444','#f59e0b','#8b5cf6','#3b82f6','#10b981','#ec4899'];
  var n=prizes.length;var arc=2*Math.PI/n;
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+d.brand+' Spin</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{background:#050810;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;color:#fff}'+
  'h2{font-size:28px;font-weight:900;margin-bottom:6px;background:linear-gradient(135deg,'+d.color+',#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}'+
  '.sub{color:#64748b;font-size:13px;margin-bottom:30px}.wrap{position:relative;margin-bottom:24px}'+
  '.arrow{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:28px;z-index:10}'+
  '.spin-btn{background:'+d.color+';color:#fff;border:none;padding:14px 40px;border-radius:50px;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 4px 20px '+d.color+'66;transition:.2s}'+
  '.spin-btn:hover{transform:scale(1.05)}.spin-btn:disabled{opacity:.5;cursor:not-allowed}'+
  '.result{margin-top:20px;font-size:24px;font-weight:900;color:'+d.color+';min-height:40px;text-align:center;animation:pop .4s ease}'+
  '@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}'+
  '</style></head><body>'+
  '<h2>🎰 Spin & Win!</h2><div class="sub">'+d.brand+' — Try your luck!</div>'+
  '<div class="wrap"><div class="arrow">▼</div><canvas id="wh" width="280" height="280"></canvas></div>'+
  '<button class="spin-btn" id="spinBtn" onclick="spin()">🎮 SPIN!</button>'+
  '<div class="result" id="res"></div>'+
  '<script>var prizes='+JSON.stringify(prizes)+';var colors='+JSON.stringify(colors)+';var n=prizes.length;var arc=2*Math.PI/n;'+
  'var cv=document.getElementById("wh");var ctx=cv.getContext("2d");var angle=0;var spinning=false;'+
  'function draw(a){ctx.clearRect(0,0,280,280);prizes.forEach(function(p,i){ctx.beginPath();ctx.moveTo(140,140);ctx.arc(140,140,130,a+i*arc,a+(i+1)*arc);ctx.closePath();ctx.fillStyle=colors[i];ctx.fill();ctx.save();ctx.translate(140,140);ctx.rotate(a+(i+.5)*arc);ctx.textAlign="right";ctx.fillStyle="#fff";ctx.font="bold 12px Inter";ctx.fillText(p,120,4);ctx.restore();});ctx.beginPath();ctx.arc(140,140,18,0,2*Math.PI);ctx.fillStyle="#0f172a";ctx.fill();ctx.strokeStyle="#fff";ctx.lineWidth=3;ctx.stroke();}'+
  'draw(0);'+
  'function spin(){if(spinning)return;spinning=true;document.getElementById("spinBtn").disabled=true;document.getElementById("res").textContent="";var extra=2*Math.PI*5+Math.random()*2*Math.PI;var target=angle+extra;var start=null;var dur=4000;'+
  'requestAnimationFrame(function step(ts){if(!start)start=ts;var prog=Math.min((ts-start)/dur,1);var ease=1-Math.pow(1-prog,4);angle=angle+(target-angle)*ease;draw(angle);if(prog<1){requestAnimationFrame(step);}else{angle=target%(2*Math.PI);draw(angle);var idx=Math.floor(((2*Math.PI-(angle%(2*Math.PI)))/(2*Math.PI))*n)%n;document.getElementById("res").textContent="🎉 You won: "+prizes[idx]+"!";spinning=false;document.getElementById("spinBtn").disabled=false;}});'+
  '}'+
  '<\/script></body></html>';
}

function buildScratch(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+d.brand+' Scratch</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{background:#050810;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;color:#fff;gap:20px}'+
  'h2{font-size:28px;font-weight:900;background:linear-gradient(135deg,'+d.color+',#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}'+
  '.card{position:relative;width:300px;height:200px;border-radius:16px;overflow:hidden;cursor:crosshair;box-shadow:0 8px 32px rgba(0,0,0,.6)}'+
  '.prize{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#1e1b4b,#4c1d95);font-size:36px;font-weight:900;color:'+d.color+'}'+
  '.scratch{position:absolute;inset:0;cursor:crosshair}'+
  '.hint{font-size:13px;color:#64748b}'+
  '.pct{font-size:12px;color:'+d.color+';font-weight:700}</style></head><body>'+
  '<h2>🎟️ Scratch & Win!</h2>'+
  '<div class="card"><div class="prize"><div>🎁</div><div style="font-size:24px;">'+d.offer+'</div><div style="font-size:13px;color:#94a3b8;margin-top:8px;">'+d.brand+' Special Offer</div></div><canvas class="scratch" id="sc" width="300" height="200"></canvas></div>'+
  '<div class="hint">👆 Scratch to reveal your prize!</div><div class="pct" id="pct">0% scratched</div>'+
  '<script>var cv=document.getElementById("sc");var ctx=cv.getContext("2d");var w=300,h=200;'+
  'var grd=ctx.createLinearGradient(0,0,w,h);grd.addColorStop(0,"#c0a060");grd.addColorStop(.5,"#f0d080");grd.addColorStop(1,"#c0a060");'+
  'ctx.fillStyle=grd;ctx.fillRect(0,0,w,h);ctx.fillStyle="rgba(180,140,40,0.3)";'+
  'for(var i=0;i<200;i++){ctx.fillRect(Math.random()*w,Math.random()*h,2,2);}'+
  'ctx.fillStyle="#8B7355";ctx.font="bold 18px Inter";ctx.textAlign="center";ctx.fillText("SCRATCH HERE",w/2,h/2-8);ctx.fillText("🪙",w/2,h/2+20);'+
  'var draw=false;ctx.globalCompositeOperation="destination-out";'+
  'function pos(e){var r=cv.getBoundingClientRect();var cx=e.touches?e.touches[0].clientX:e.clientX;var cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};}'+
  'function scratch(e){if(!draw)return;var p=pos(e);ctx.beginPath();ctx.arc(p.x,p.y,22,0,2*Math.PI);ctx.fill();}'+
  'cv.addEventListener("mousedown",function(){draw=true;});cv.addEventListener("mouseup",function(){draw=false;pct();});cv.addEventListener("mousemove",scratch);'+
  'cv.addEventListener("touchstart",function(e){draw=true;e.preventDefault();},{passive:false});cv.addEventListener("touchend",function(){draw=false;pct();});cv.addEventListener("touchmove",function(e){scratch(e);e.preventDefault();pct();},{passive:false});'+
  'function pct(){var d=ctx.getImageData(0,0,w,h).data;var t=0;for(var i=3;i<d.length;i+=4){if(d[i]<128)t++;}var p=Math.round(t/(w*h)*100);document.getElementById("pct").textContent=p+"% scratched";if(p>60)document.getElementById("pct").style.color="#22c55e";}'+
  '<\/script></body></html>';
}

function buildSlot(d){
  var symbols=['🍋','⭐','💎','🔔','7️⃣','🎯'];
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+d.brand+' Slots</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{background:#050810;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;color:#fff}'+
  'h2{font-size:28px;font-weight:900;margin-bottom:6px;background:linear-gradient(135deg,'+d.color+',#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent}'+
  '.machine{background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:2px solid rgba(255,255,255,.1);border-radius:20px;padding:30px;margin:20px 0;box-shadow:0 20px 60px rgba(0,0,0,.5)}'+
  '.reels{display:flex;gap:12px;margin-bottom:24px}'+
  '.reel{width:80px;height:80px;border-radius:12px;background:#0f172a;border:2px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:40px;overflow:hidden;position:relative}'+
  '.reel.spin{animation:spinReel .1s linear infinite}'+
  '@keyframes spinReel{0%{transform:translateY(-5px)}50%{transform:translateY(5px)}100%{transform:translateY(-5px)}}'+
  '.spin-btn{background:linear-gradient(135deg,'+d.color+','+d.color+'cc);color:#fff;border:none;padding:14px 48px;border-radius:50px;font-size:18px;font-weight:900;cursor:pointer;box-shadow:0 4px 20px '+d.color+'88;transition:.2s;letter-spacing:1px}'+
  '.spin-btn:disabled{opacity:.5}.res{height:40px;margin-top:16px;font-size:20px;font-weight:900;text-align:center}'+
  '.win{color:#fbbf24;animation:pop .4s ease}@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}'+
  '.coins{font-size:13px;color:#64748b;margin-top:8px}'+
  '</style></head><body>'+
  '<h2>🎰 '+d.brand+' Lucky Slots</h2>'+
  '<div class="machine">'+
  '<div class="reels"><div class="reel" id="r0">🍋</div><div class="reel" id="r1">⭐</div><div class="reel" id="r2">💎</div></div>'+
  '<button class="spin-btn" id="sb" onclick="spin()">🎮 SPIN</button>'+
  '<div class="res" id="res"></div>'+
  '<div class="coins">Spins: <span id="spins">3</span> remaining</div></div>'+
  '<script>var sym='+JSON.stringify(symbols)+';var spins=3;'+
  'function rnd(){return sym[Math.floor(Math.random()*sym.length)];}'+
  'function spin(){if(spins<=0)return;spins--;document.getElementById("spins").textContent=spins;if(spins===0)document.getElementById("sb").disabled=true;'+
  'document.getElementById("res").textContent="";[0,1,2].forEach(function(i){document.getElementById("r"+i).classList.add("spin");});'+
  'var r=[rnd(),rnd(),rnd()];'+
  'setTimeout(function(){document.getElementById("r0").textContent=r[0];document.getElementById("r0").classList.remove("spin");},600);'+
  'setTimeout(function(){document.getElementById("r1").textContent=r[1];document.getElementById("r1").classList.remove("spin");},900);'+
  'setTimeout(function(){document.getElementById("r2").textContent=r[2];document.getElementById("r2").classList.remove("spin");var res=document.getElementById("res");if(r[0]===r[1]&&r[1]===r[2]){res.innerHTML=\'<span class="win">🎉 JACKPOT! '+d.offer+'!</span>\';}else if(r[0]===r[1]||r[1]===r[2]||r[0]===r[2]){res.innerHTML=\'<span class="win">🎊 Match! 10% OFF</span>\';}else{res.innerHTML=\'<span style="color:#64748b">Try again!</span>\';}},1200);}'+
  '<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(139,92,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(236,72,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#a78bfa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='ga-'+k;i.placeholder=ph;i.value=st[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(139,92,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('brand',t('brand'),t('brandP')));
  body.appendChild(fi('offer',t('offer'),t('offerP')));
  var cr=document.createElement('div');cr.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');var ci=document.createElement('input');ci.type='color';ci.id='ga-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(139,92,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};cr.appendChild(cl);cr.appendChild(ci);body.appendChild(cr);
  var gl2=document.createElement('div');gl2.style='font-size:9px;color:#94a3b8;font-weight:700;';gl2.textContent=t('game');body.appendChild(gl2);
  var gr=document.createElement('div');gr.style='display:flex;gap:4px;';
  [['wheel','🎡 Wheel'],['scratch','🎟️ Scratch'],['slot','🎰 Slot']].forEach(function(g){var b=document.createElement('button');b.innerHTML=g[1];b.dataset.g=g[0];var on=st.game===g[0];b.style='flex:1;padding:6px;border-radius:8px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(139,92,246,'+(on?'0.8':'0.25')+');background:rgba(139,92,246,'+(on?'0.2':'0.05')+');color:'+(on?'#a78bfa':'#64748b')+';';b.onclick=function(){st.game=g[0];document.querySelectorAll('[data-g]').forEach(function(x){x.style.borderColor='rgba(139,92,246,0.25)';x.style.background='rgba(139,92,246,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(139,92,246,0.8)';this.style.background='rgba(139,92,246,0.2)';this.style.color='#a78bfa';};gr.appendChild(b);});
  body.appendChild(gr);
  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#4c1d95,#8b5cf6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(139,92,246,0.35);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){st.brand=(document.getElementById('ga-brand')||{}).value||'Brand';st.offer=(document.getElementById('ga-offer')||{}).value||'50% OFF';st.color=(document.getElementById('ga-color')||{}).value||'#8b5cf6';html=st.game==='scratch'?buildScratch(st):st.game==='slot'?buildSlot(st):buildWheel(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#a78bfa;">✅ '+st.game+' ad generated!</div>';if(window.showToast)window.showToast('🎮 Game Ad generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='gamifiedad'){window.activeTab='gamifiedad';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-gamifiedad');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-gamifiedad');if(el)el.textContent=t('tab');if(window.activeTab==='gamifiedad')render();};
});
})();
