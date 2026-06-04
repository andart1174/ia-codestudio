/**
 * ✨ Text Animation Studio — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Text Anim',title:'✨ Text Animation Studio',sub:'Viral text effects — typewriter, glitch, wave, split, scramble',
      text:'Text',textP:'e.g. Build something amazing',color:'Color',bg:'Background',
      speed:'Speed (ms)',size:'Font Size',effect:'Effect',
      btn:'✨ Preview & Generate',inject:'💉 Inject',copy:'📋 Copy',
      effects:['Typewriter','Glitch','Wave','Split Reveal','Scramble','Neon Pulse','Word Flip','Rainbow']},
  fr:{tab:'Anim Texte',title:'✨ Studio Animation Texte',sub:'Effets texte viraux — machine à écrire, glitch, vague...',
      text:'Texte',textP:'ex. Créez quelque chose d\'incroyable',color:'Couleur',bg:'Fond',
      speed:'Vitesse (ms)',size:'Taille Police',effect:'Effet',
      btn:'✨ Prévisualiser',inject:'💉 Injecter',copy:'📋 Copier',
      effects:['Machine à Écrire','Glitch','Vague','Révélation','Brouillage','Neon','Mot par Mot','Arc-en-ciel']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={text:'Build Something Amazing',color:'#ffffff',bg:'#050810',speed:80,size:48,effect:'typewriter'};
var EFFECTS=['typewriter','glitch','wave','split','scramble','neon','wordflip','rainbow'];

function buildHTML(d){
  var scripts={
    typewriter:'var el=document.getElementById("ta");var txt='+JSON.stringify(d.text)+';var i=0;el.textContent="";function type(){if(i<txt.length){el.textContent+=txt[i++];setTimeout(type,'+d.speed+');}else{setTimeout(function(){el.textContent="";i=0;type();},2000);}};type();',
    glitch:'var el=document.getElementById("ta");el.textContent='+JSON.stringify(d.text)+';var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";function glitch(){var arr='+JSON.stringify(d.text)+'.split("");var passes=0;var iv=setInterval(function(){el.textContent=arr.map(function(c,i){return Math.random()<.3?chars[Math.floor(Math.random()*chars.length)]:c;}).join("");if(++passes>20){clearInterval(iv);el.textContent='+JSON.stringify(d.text)+';setTimeout(glitch,3000);}},50);}glitch();',
    wave:'var el=document.getElementById("ta");el.innerHTML='+JSON.stringify(d.text)+'.split("").map(function(c,i){return"<span style=\'display:inline-block;animation:wave 1.5s ease-in-out infinite;animation-delay:"+(i*.08)+"s\'>"+c+"</span>";}).join("");',
    split:'var el=document.getElementById("ta");var words='+JSON.stringify(d.text)+'.split(" ");el.innerHTML=words.map(function(w,i){return"<span style=\'display:inline-block;opacity:0;transform:translateY(40px);animation:splitIn .6s ease forwards;animation-delay:"+(i*.15)+"s;margin-right:12px\'>"+w+"</span>";}).join("");',
    scramble:'var el=document.getElementById("ta");var target='+JSON.stringify(d.text)+';var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";var cur=target.split("").map(function(){return chars[Math.floor(Math.random()*chars.length)];});var resolved=0;function tick(){var done=true;cur=cur.map(function(c,i){if(i<resolved)return target[i];done=false;return chars[Math.floor(Math.random()*chars.length)];});el.textContent=cur.join("");if(!done){setTimeout(function(){resolved=Math.min(resolved+1,target.length);tick();},'+d.speed+');}};tick();',
    neon:'var el=document.getElementById("ta");el.textContent='+JSON.stringify(d.text)+';',
    wordflip:'var words='+JSON.stringify(d.text.split(' '))+';var i=0;var el=document.getElementById("ta");function flip(){el.style.opacity="0";el.style.transform="translateY(-20px)";setTimeout(function(){el.textContent=words[i%words.length];i++;el.style.transition=".4s ease";el.style.opacity="1";el.style.transform="none";},300);setTimeout(flip,1800);}flip();',
    rainbow:'var el=document.getElementById("ta");el.innerHTML='+JSON.stringify(d.text)+'.split("").map(function(c,i){var hue=(i/'+d.text.length+')*360;return"<span style=\'color:hsl("+hue+",100%,65%);display:inline-block;\'>"+c+"</span>";}).join("");'
  };
  var extraCSS={
    wave:'@keyframes wave{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}',
    split:'@keyframes splitIn{to{opacity:1;transform:none}}',
    neon:'@keyframes neonPulse{0%,100%{text-shadow:0 0 10px '+d.color+',0 0 30px '+d.color+',0 0 60px '+d.color+'}50%{text-shadow:0 0 5px '+d.color+',0 0 15px '+d.color+'}} #ta{animation:neonPulse 2s ease-in-out infinite;}',
    glitch:'@keyframes glitchShift{0%,100%{clip-path:inset(0 0 95% 0)}20%{clip-path:inset(30% 0 50% 0)}40%{clip-path:inset(70% 0 10% 0)}60%{clip-path:inset(20% 0 70% 0)}80%{clip-path:inset(80% 0 5% 0)}} #ta::before,#ta::after{content:attr(data-text);position:absolute;left:0;} #ta::before{color:#f00;animation:glitchShift .4s infinite;} #ta::after{color:#0ff;animation:glitchShift .4s infinite reverse;}'
  };
  var css=extraCSS[d.effect]||'';
  return'<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Text Animation</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box}body{background:'+d.bg+';display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,sans-serif;}'+
  '#ta{font-size:'+d.size+'px;font-weight:900;color:'+d.color+';text-align:center;position:relative;max-width:90vw;line-height:1.2;}'+css+'</style></head><body>'+
  '<span id="ta" data-text='+JSON.stringify(d.text)+'></span>'+
  '<script>'+scripts[d.effect]+'<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,191,36,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  var tld=document.createElement('div');var tll=document.createElement('div');tll.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';tll.textContent=t('text');var tli=document.createElement('input');tli.id='ta-text';tli.placeholder=t('textP');tli.value=st.text;tli.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(251,191,36,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';tli.oninput=function(){st.text=this.value;};tld.appendChild(tll);tld.appendChild(tli);body.appendChild(tld);

  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  function colorRow(k,lbl){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.type='color';i.id='ta-'+k;i.value=st[k];i.style='width:100%;height:32px;background:#0d1117;border:1px solid rgba(251,191,36,0.25);border-radius:6px;cursor:pointer;padding:2px;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  cr.appendChild(colorRow('color',t('color')));cr.appendChild(colorRow('bg',t('bg')));body.appendChild(cr);

  var gr2=document.createElement('div');gr2.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  function slRow(k,lbl,min,max,unit){var d=document.createElement('div');var r=document.createElement('div');r.style='display:flex;justify-content:space-between;';var l=document.createElement('span');l.style='font-size:9px;color:#94a3b8;font-weight:700;';l.textContent=lbl;var v=document.createElement('span');v.id='tv-'+k;v.style='font-size:9px;color:#fbbf24;font-weight:700;';v.textContent=st[k]+(unit||'');r.appendChild(l);r.appendChild(v);d.appendChild(r);var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=st[k];s.style='width:100%;accent-color:#f59e0b;margin-top:3px;';s.oninput=function(){st[k]=parseInt(this.value);document.getElementById('tv-'+k).textContent=st[k]+(unit||'');};d.appendChild(s);return d;}
  gr2.appendChild(slRow('speed',t('speed'),20,200,'ms'));gr2.appendChild(slRow('size',t('size'),16,96,'px'));body.appendChild(gr2);

  var el=document.createElement('div');el.style='font-size:9px;color:#94a3b8;font-weight:700;';el.textContent=t('effect');body.appendChild(el);
  var er=document.createElement('div');er.style='display:flex;gap:4px;flex-wrap:wrap;';
  var effLabels=t('effects');
  EFFECTS.forEach(function(e,idx){var b=document.createElement('button');b.textContent=Array.isArray(effLabels)?effLabels[idx]:e;b.dataset.ef=e;var on=st.effect===e;b.style='padding:4px 9px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(251,191,36,'+(on?'0.8':'0.25')+');background:rgba(251,191,36,'+(on?'0.2':'0.05')+');color:'+(on?'#fbbf24':'#64748b')+';';b.onclick=function(){st.effect=e;document.querySelectorAll('[data-ef]').forEach(function(x){x.style.borderColor='rgba(251,191,36,0.25)';x.style.background='rgba(251,191,36,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(251,191,36,0.8)';this.style.background='rgba(251,191,36,0.2)';this.style.color='#fbbf24';};er.appendChild(b);});body.appendChild(er);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#78350f,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(251,191,36,0.35);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){st.text=(document.getElementById('ta-text')||{}).value||st.text;st.color=(document.getElementById('ta-color')||{}).value||st.color;st.bg=(document.getElementById('ta-bg')||{}).value||st.bg;html=buildHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#fbbf24;">✅ Effect: '+st.effect+' · '+st.size+'px · '+st.speed+'ms</div>';if(window.showToast)window.showToast('✨ Animation generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='textanim'){window.activeTab='textanim';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-textanim');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-textanim');if(el)el.textContent=t('tab');if(window.activeTab==='textanim')render();};
});
})();
