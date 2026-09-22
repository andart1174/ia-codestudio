/**
 * Persona Swarm (AI Crowd Tester) — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'AI Personas',title:'🎭 Persona Swarm',sub:'Real Live UI Testing',btnGen:'🚀 Unleash Swarm on Code',p1:'Angry Teen',p2:'Confused Senior',p3:'Speed-Reader',stat:'Swarm Analysis Report:'},
  fr:{tab:'Personas IA',title:'🎭 Nuée de Personas',sub:'Test UI en Temps Réel',btnGen:'🚀 Lâcher sur le Code',p1:'Ado Énervé',p2:'Senior Confus',p3:'Lecteur Rapide',stat:'Rapport d\'Analyse Nuée :'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(244,63,94,0.3);background:linear-gradient(135deg,rgba(159,18,57,0.3),rgba(244,63,94,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb7185;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnGen');
  btn.style='width:100%;background:linear-gradient(135deg,#9f1239,#e11d48);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(225,29,72,0.3);';
  b.appendChild(btn);

  var res=document.createElement('div');res.style='display:none;flex-direction:column;gap:8px;margin-top:10px;';
  function mkP(N,E,M,C){return '<div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;border-left:3px solid '+C+';"><div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">'+E+'</span><b style="color:#e2e8f0;font-size:11px;">'+N+'</b></div><div style="color:#94a3b8;font-size:9px;margin-top:6px;">'+M+'</div></div>';}
  
  btn.onclick=function(){
    res.style.display='flex';
    var code = window.editor ? window.editor.getValue() : '';
    var isFr = (window.lang === 'fr');
    
    // Analyze code for Persona feedback
    var btnCount = (code.match(/<button/g)||[]).length;
    var linkCount = (code.match(/<a[\s>]/g)||[]).length;
    var forms = (code.match(/<input/g)||[]).length;
    
    var hasSmallFont = /font-size:\s*([1-9]|1[0-3])px/.test(code);
    var hasContrast = /color:\s*(#777|#888|#999|gray|lightgray)/i.test(code);
    var longText = (code.match(/<p>[^<]{150,}<\/p>/gi)||[]).length;
    var h1Count = (code.match(/<h[1-3]/gi)||[]).length;

    // Teen Logic
    var teenMsg = '';
    if(btnCount === 0 && linkCount === 0) {
      teenMsg = isFr ? "M'ennuie. Il n'y a rien à cliquer ici !" : "Boring. There's literally nothing to click!";
    } else if (forms > 5) {
      teenMsg = isFr ? "Trop long ce formulaire, flemme de remplir. Je pars." : "Form is way too long, I'm out of here.";
    } else {
      teenMsg = isFr ? ("J'ai cliqué frénétiquement sur les " + btnCount + " boutons. Ça passe.") : ("Spam-clicked your " + btnCount + " buttons. It's alright.");
    }

    // Senior Logic
    var seniorMsg = '';
    if(hasSmallFont || hasContrast) {
      seniorMsg = isFr ? "Le texte est trop petit ou gris clair. Je n'arrive pas à lire sans mes lunettes !" : "Text is too small or light grey. I can't read this without my glasses!";
    } else if(linkCount > 10) {
      seniorMsg = isFr ? "Il y a trop de liens, je suis perdu. Où dois-je aller ?" : "Too many links, I'm confused. Where should I click?";
    } else {
      seniorMsg = isFr ? "L'interface est claire, j'ai bien compris la page." : "The interface is clear, I understood the page well.";
    }

    // Speed Reader Logic
    var readerMsg = '';
    if(h1Count === 0) {
      readerMsg = isFr ? "Aucun titre (H1/H2) ! Impossible de scanner la page rapidement." : "No headers (H1/H2)! I can't scan the page quickly.";
    } else if(longText > 0) {
      readerMsg = isFr ? "Des gros blocs de texte... TL;DR (Trop Long; Pas Lu)." : "Massive walls of text... TL;DR. Won't read.";
    } else {
      readerMsg = isFr ? "Titres clairs, paragraphes courts. J'ai scanné en 1.5s." : "Clear headers, short paragraphs. Scanned in 1.5s. Perfect.";
    }

    res.innerHTML='<div style="color:#fb7185;font-size:10px;font-weight:800;margin-bottom:4px;">'+tl('stat')+'</div>'+
      mkP(tl('p1'),'😡',teenMsg,(btnCount===0?'#ef4444':'#10b981'))+
      mkP(tl('p2'),'👴',seniorMsg,(hasSmallFont?'#ef4444':'#10b981'))+
      mkP(tl('p3'),'⚡',readerMsg,(h1Count===0?'#ef4444':'#10b981'));
  };
  b.appendChild(res);w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-personaswarm');if(el)el.textContent=tl('tab');if(window.activeTab==='personaswarm')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='personaswarm'){window.activeTab='personaswarm';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-personaswarm');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
