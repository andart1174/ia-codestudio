/**
 * Cinematic Trailer Studio — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Cinematic',title:'🎬 Cinematic Studio',sub:'3D Video Trailer Generator',btnGen:'🎥 Start Cinematic Record',p1:'1. Select your browser window when prompted.',p2:'2. Hands off! Recording in progress...',p3:'3. Processing video...',msg:'Trailer Downloaded! 🚀',err:'Recording cancelled or not supported.',dur:'Duration (sec):'},
  fr:{tab:'Cinématique',title:'🎬 Studio Cinématique',sub:'Générateur de Bande-Annonce 3D',btnGen:'🎥 Démarrer Enregistrement',p1:'1. Sélectionnez cette fenêtre quand demandé.',p2:'2. Ne touchez à rien ! Enregistrement...',p3:'3. Traitement de la vidéo...',msg:'Bande-annonce téléchargée ! 🚀',err:'Enregistrement annulé ou non supporté.',dur:'Durée (sec) :'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

var duration = 10;

function runCinematicAnimation(wrap) {
  // Inject CSS keyframes if not exists
  if(!document.getElementById('cinematic-keyframes')) {
    var s = document.createElement('style');
    s.id = 'cinematic-keyframes';
    s.innerHTML = `
      @keyframes cinematicPan {
        0%   { transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) scale(0.9) translateZ(0); box-shadow: 0 20px 50px rgba(168,85,247,0.2); }
        30%  { transform: perspective(1000px) rotateY(15deg) rotateX(-5deg) scale(0.95) translateZ(50px); box-shadow: 0 30px 60px rgba(168,85,247,0.4); }
        60%  { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05) translateZ(100px); box-shadow: 0 40px 80px rgba(168,85,247,0.6); }
        90%  { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0); box-shadow: 0 10px 30px rgba(168,85,247,0.2); }
        100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1); box-shadow: none; }
      }
      .cinematic-active {
        animation: cinematicPan ${duration}s ease-in-out forwards;
        transform-origin: center center;
        transition: all 0.5s;
        border-radius: 12px;
        overflow: hidden;
      }
    `;
    document.head.appendChild(s);
  } else {
    // update duration
    document.getElementById('cinematic-keyframes').innerHTML = document.getElementById('cinematic-keyframes').innerHTML.replace(/cinematicPan \d+s/, 'cinematicPan '+duration+'s');
  }

  wrap.classList.add('cinematic-active');
  setTimeout(function(){
    wrap.classList.remove('cinematic-active');
  }, duration * 1000);
}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(168,85,247,0.3);background:linear-gradient(135deg,rgba(107,33,168,0.3),rgba(168,85,247,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var vp=document.createElement('div');vp.style='width:100%;height:140px;background:#000;border-radius:8px;border:1px solid rgba(168,85,247,0.3);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c084fc\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolygon points=\'23 7 16 12 23 17 23 7\'%3E%3C/polygon%3E%3Crect x=\'1\' y=\'5\' width=\'15\' height=\'14\' rx=\'2\' ry=\'2\'%3E%3C/rect%3E%3C/svg%3E");background-repeat:no-repeat;background-position:center;background-size:40px;opacity:0.6;';
  b.appendChild(vp);

  var dWrap=document.createElement('div');dWrap.style='display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.05);padding:8px;border-radius:6px;';
  dWrap.innerHTML='<span style="color:#94a3b8;font-size:10px;">'+tl('dur')+'</span>';
  var dInp=document.createElement('input');dInp.type='number';dInp.value=duration;dInp.min=5;dInp.max=60;
  dInp.style='width:60px;background:#0f172a;color:#e2e8f0;border:1px solid rgba(168,85,247,0.3);border-radius:4px;padding:4px;font-size:10px;outline:none;text-align:center;';
  dInp.oninput=function(){duration=Math.max(5, Math.min(60, parseInt(this.value)||10));};
  dWrap.appendChild(dInp);
  b.appendChild(dWrap);

  var btn=document.createElement('button');btn.innerHTML=tl('btnGen');
  btn.style='width:100%;background:linear-gradient(135deg,#6b21a8,#a855f7);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(168,85,247,0.3);';
  b.appendChild(btn);

  var st=document.createElement('div');st.style='color:#94a3b8;font-size:10px;text-align:center;margin-top:10px;min-height:30px;font-weight:bold;';
  b.appendChild(st);

  btn.onclick=async function(){
    if(!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      st.style.color='#ef4444'; st.textContent=tl('err'); return;
    }
    
    st.style.color='#fbbf24';
    st.textContent=tl('p1');
    
    var stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "never" }, audio: false });
    } catch(err) {
      st.style.color='#ef4444'; st.textContent=tl('err'); return;
    }

    st.style.color='#4ade80';
    st.textContent=tl('p2');

    var wrap = document.getElementById('preview-frame-wrap');
    if(wrap) runCinematicAnimation(wrap);

    var mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    var chunks = [];
    
    mediaRecorder.ondataavailable = function(e) {
      if(e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = function() {
      st.style.color='#38bdf8';
      st.textContent=tl('p3');
      
      var blob = new Blob(chunks, { type: 'video/webm' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'Cinematic_Trailer.webm';
      a.click();
      URL.revokeObjectURL(url);
      
      st.style.color='#a855f7';
      st.textContent=tl('msg');
      stream.getTracks().forEach(t => t.stop());
    };

    mediaRecorder.start();

    // Stop after duration
    setTimeout(function(){
      if(mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, duration * 1000);
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cinematic');if(el)el.textContent=tl('tab');if(window.activeTab==='cinematic')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='cinematic'){window.activeTab='cinematic';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cinematic');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
