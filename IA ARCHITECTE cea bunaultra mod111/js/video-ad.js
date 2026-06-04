/**
 * 🎬 Video Ad Frame Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Video Ad',title:'🎬 Video Ad Frame Builder',sub:'YouTube pre-roll style ads — pure HTML/CSS',
      brand:'Brand Name',brandP:'e.g. UltraApp',headline:'Headline',headlineP:'e.g. The Future of Productivity',
      sub2:'Subtext',sub2P:'e.g. Try free for 30 days',cta:'CTA Button',ctaP:'e.g. Start Free Trial',
      color:'Brand Color',format:'Format',skip:'Skip after (sec)',
      btn:'🎬 Generate Ad',inject:'💉 Inject',copy:'📋 Copy',
      formats:['16:9 Pre-roll','9:16 Story','1:1 Square']},
  fr:{tab:'Video Ad',title:'🎬 Créateur Publicité Vidéo',sub:'Style pre-roll YouTube — HTML/CSS pur',
      brand:'Nom de Marque',brandP:'ex. UltraApp',headline:'Titre',headlineP:'ex. L\'Avenir de la Productivité',
      sub2:'Sous-titre',sub2P:'ex. Essai gratuit 30 jours',cta:'Bouton CTA',ctaP:'ex. Commencer Gratuitement',
      color:'Couleur Marque',format:'Format',skip:'Passer après (sec)',
      btn:'🎬 Générer',inject:'💉 Injecter',copy:'📋 Copier',
      formats:['16:9 Pre-roll','9:16 Story','1:1 Carré']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={brand:'UltraApp',headline:'The Future of Productivity',sub:'Try free for 30 days',cta:'Start Free Trial',color:'#6366f1',format:'16x9',skip:5};

function buildHTML(d){
  var fr=gl()==='fr';
  var dims={['16x9']:'width:640px;height:360px',['9x16']:'width:360px;height:640px',['1x1']:'width:400px;height:400px'};
  var dim=dims[d.format]||dims['16x9'];
  var skipLabel=fr?'Passer la pub':'Skip Ad';
  var adLabel=fr?'Publicité':'Advertisement';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+d.brand+' Ad</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}'+
  'body{background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px}'+
  '.ad-wrap{'+dim+';position:relative;overflow:hidden;background:#000;border-radius:8px;}'+
  '.bg-anim{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,'+d.color+'33 0%,transparent 60%);animation:bgPulse 3s ease-in-out infinite;}'+
  '@keyframes bgPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}'+
  '.particles{position:absolute;inset:0;overflow:hidden;}'+
  '.p{position:absolute;width:4px;height:4px;background:'+d.color+';border-radius:50%;opacity:.4;animation:float linear infinite;}'+
  '@keyframes float{0%{transform:translateY(100%);opacity:0}10%{opacity:.6}90%{opacity:.2}100%{transform:translateY(-100%);opacity:0}}'+
  '.content{position:relative;z-index:10;height:100%;display:flex;flex-direction:column;justify-content:center;padding:40px;animation:fadeSlide .8s ease forwards;}'+
  '@keyframes fadeSlide{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}'+
  '.ad-badge{font-size:10px;color:rgba(255,255,255,.5);background:rgba(0,0,0,.4);padding:3px 8px;border-radius:4px;display:inline-block;margin-bottom:16px;}'+
  '.brand-name{font-size:13px;font-weight:700;color:'+d.color+';letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;}'+
  '.headline{font-size:clamp(18px,4vw,36px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:12px;}'+
  '.subtext{font-size:14px;color:rgba(255,255,255,.65);margin-bottom:28px;line-height:1.5;}'+
  '.cta-btn{background:'+d.color+';color:#fff;border:none;padding:14px 32px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;display:inline-block;transition:.2s;box-shadow:0 4px 20px '+d.color+'66;}'+
  '.cta-btn:hover{transform:scale(1.05);box-shadow:0 6px 28px '+d.color+'99;}'+
  '.skip-area{position:absolute;bottom:16px;right:16px;z-index:20;}'+
  '.skip-btn{background:rgba(0,0,0,.7);color:#fff;border:1px solid rgba(255,255,255,.3);padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;border-radius:4px;display:none;}'+
  '.skip-countdown{background:rgba(0,0,0,.7);color:rgba(255,255,255,.7);padding:8px 16px;font-size:12px;border:1px solid rgba(255,255,255,.2);border-radius:4px;}'+
  '.progress{position:absolute;top:0;left:0;height:3px;background:'+d.color+';animation:prog '+d.skip+'s linear forwards;}'+
  '@keyframes prog{from{width:0}to{width:100%}}'+
  '.timer-ring{position:absolute;top:12px;right:16px;z-index:20;display:flex;align-items:center;gap:6px;}'+
  '.ring-badge{font-size:10px;color:rgba(255,255,255,.4);background:rgba(0,0,0,.5);padding:3px 8px;border-radius:4px;}'+
  '</style></head><body>'+
  '<div class="ad-wrap" id="adFrame">'+
  '<div class="bg-anim"></div>'+
  '<div class="particles" id="pts"></div>'+
  '<div class="progress" id="prog"></div>'+
  '<div class="timer-ring"><div class="ring-badge" id="adBadge">'+adLabel+'</div></div>'+
  '<div class="content">'+
  '<div class="ad-badge">'+adLabel+'</div>'+
  '<div class="brand-name">'+d.brand+'</div>'+
  '<div class="headline">'+d.headline+'</div>'+
  '<div class="subtext">'+d.sub+'</div>'+
  '<button class="cta-btn" onclick="window.open(\'#\',\'_blank\')">'+d.cta+' →</button>'+
  '</div>'+
  '<div class="skip-area">'+
  '<div class="skip-countdown" id="skipCount">'+skipLabel+' in <span id="skipN">'+d.skip+'</span>s</div>'+
  '<button class="skip-btn" id="skipBtn" onclick="document.getElementById(\'adFrame\').style.opacity=\'0.2\';this.textContent=\'Ad closed\'">'+skipLabel+' →</button>'+
  '</div></div>'+
  '<div style="font-size:11px;color:#475569;text-align:center;">'+adLabel+' · '+d.brand+' · <a href="#" style="color:'+d.color+';">Learn More</a></div>'+
  '<script>'+
  '(function(){var n='+d.skip+';var el=document.getElementById("skipN");var sc=document.getElementById("skipCount");var sb=document.getElementById("skipBtn");'+
  'var pts=document.getElementById("pts");for(var i=0;i<15;i++){var p=document.createElement("div");p.className="p";p.style.left=Math.random()*100+"%";p.style.animationDuration=(3+Math.random()*4)+"s";p.style.animationDelay=Math.random()*4+"s";pts.appendChild(p);}'+
  'var iv=setInterval(function(){n--;if(el)el.textContent=n;if(n<=0){clearInterval(iv);if(sc)sc.style.display="none";if(sb)sb.style.display="block";}},1000);'+
  '})();'+
  '<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';
  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='va-'+k;i.placeholder=ph;i.value=st[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  body.appendChild(fi('brand',t('brand'),t('brandP')));
  body.appendChild(fi('headline',t('headline'),t('headlineP')));
  body.appendChild(fi('sub',t('sub2'),t('sub2P')));
  body.appendChild(fi('cta',t('cta'),t('ctaP')));
  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  var cd=document.createElement('div');var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';cl.textContent=t('color');var ci=document.createElement('input');ci.type='color';ci.id='va-color';ci.value=st.color;ci.style='width:100%;height:34px;background:#0d1117;border:1px solid rgba(99,102,241,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};cd.appendChild(cl);cd.appendChild(ci);
  var sd=document.createElement('div');var sl2=document.createElement('div');sl2.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';sl2.textContent=t('skip')+':';var si=document.createElement('input');si.type='number';si.id='va-skip';si.value=st.skip;si.min=3;si.max=15;si.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';si.oninput=function(){st.skip=parseInt(this.value)||5;};sd.appendChild(sl2);sd.appendChild(si);
  cr.appendChild(cd);cr.appendChild(sd);body.appendChild(cr);
  var fl=document.createElement('div');fl.style='font-size:9px;color:#94a3b8;font-weight:700;';fl.textContent=t('format');body.appendChild(fl);
  var fr2=document.createElement('div');fr2.style='display:flex;gap:4px;';
  [['16x9','16:9'],['9x16','9:16'],['1x1','1:1']].forEach(function(f){var b=document.createElement('button');b.textContent=f[1];b.dataset.f=f[0];var on=st.format===f[0];b.style='padding:5px 12px;border-radius:20px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid rgba(99,102,241,'+(on?'0.8':'0.25')+');background:rgba(99,102,241,'+(on?'0.2':'0.05')+');color:'+(on?'#818cf8':'#64748b')+';';b.onclick=function(){st.format=f[0];document.querySelectorAll('[data-f]').forEach(function(x){x.style.borderColor='rgba(99,102,241,0.25)';x.style.background='rgba(99,102,241,0.05)';x.style.color='#64748b';});this.style.borderColor='rgba(99,102,241,0.8)';this.style.background='rgba(99,102,241,0.2)';this.style.color='#818cf8';};fr2.appendChild(b);});
  body.appendChild(fr2);
  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e1b4b,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.35);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  var html='';
  btn.onclick=function(){st.brand=document.getElementById('va-brand').value||'Brand';st.headline=document.getElementById('va-headline').value||'Headline';st.sub=document.getElementById('va-sub').value||'Subtext';st.cta=document.getElementById('va-cta').value||'Get Started';st.color=document.getElementById('va-color').value;st.skip=parseInt(document.getElementById('va-skip').value)||5;html=buildHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#818cf8;">✅ Video Ad Frame generated — Skip after '+st.skip+'s | Format: '+st.format+'</div>';if(window.showToast)window.showToast('🎬 Video Ad generated!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Ad injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='videoad'){window.activeTab='videoad';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-videoad');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-videoad');if(el)el.textContent=t('tab');if(window.activeTab==='videoad')render();};
});
})();
