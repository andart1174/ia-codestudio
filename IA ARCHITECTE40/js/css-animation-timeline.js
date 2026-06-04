/**
 * CSS Animation Timeline v1.0 — EN/FR
 * Visual @keyframes editor with playback and export
 */
(function(){
'use strict';
var TX={
  en:{tab:'CSS Anim',title:'🎬 CSS Animation Timeline',sub:'Visual @keyframes editor with playback',
      animName:'Animation Name:',animNamePh:'myAnimation',duration:'Duration (s):',
      easing:'Easing:',iterations:'Iterations:',direction:'Direction:',
      addFrame:'+ Add Keyframe',play:'▶ Play',stop:'⏹ Stop',reset:'↺ Reset',
      export:'📋 Export CSS',inject:'💉 Inject into Editor',
      keyframes:'Keyframes:',preview:'Preview:',properties:'Properties:',
      at:'At:',del:'✕',copied:'📋 Copied!',injected:'✅ Injected!',
      presets:'Presets:',property:'Property',value:'Value',addProp:'+ Add Property',
      directions:{normal:'Normal',reverse:'Reverse',alternate:'Alternate','alternate-reverse':'Alt-Reverse'},
      easings:{ease:'Ease',linear:'Linear','ease-in':'Ease In','ease-out':'Ease Out','ease-in-out':'Ease In-Out',bounce:'Bounce'}},
  fr:{tab:'CSS Anim',title:'🎬 Timeline Animation CSS',sub:'Éditeur @keyframes visuel avec lecture',
      animName:'Nom Animation :',animNamePh:'monAnimation',duration:'Durée (s) :',
      easing:'Timing :',iterations:'Itérations :',direction:'Direction :',
      addFrame:'+ Ajouter Keyframe',play:'▶ Lire',stop:'⏹ Arrêter',reset:'↺ Réinitialiser',
      export:'📋 Exporter CSS',inject:'💉 Injecter dans Éditeur',
      keyframes:'Keyframes :',preview:'Aperçu :',properties:'Propriétés :',
      at:'À :',del:'✕',copied:'📋 Copié !',injected:'✅ Injecté !',
      presets:'Présélections :',property:'Propriété',value:'Valeur',addProp:'+ Ajouter Propriété',
      directions:{normal:'Normal',reverse:'Inverse',alternate:'Alterné','alternate-reverse':'Alt-Inversé'},
      easings:{ease:'Ease',linear:'Linéaire','ease-in':'Ease In','ease-out':'Ease Out','ease-in-out':'Ease In-Out',bounce:'Rebond'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var PRESETS={
  fadeIn:{name:'fadeIn',frames:[{p:0,props:[{k:'opacity',v:'0'}]},{p:100,props:[{k:'opacity',v:'1'}]}]},
  slideIn:{name:'slideIn',frames:[{p:0,props:[{k:'transform',v:'translateX(-100px)'},{k:'opacity',v:'0'}]},{p:100,props:[{k:'transform',v:'translateX(0)'},{k:'opacity',v:'1'}]}]},
  bounce:{name:'bounce',frames:[{p:0,props:[{k:'transform',v:'translateY(0)'}]},{p:30,props:[{k:'transform',v:'translateY(-30px)'}]},{p:60,props:[{k:'transform',v:'translateY(0)'}]},{p:80,props:[{k:'transform',v:'translateY(-15px)'}]},{p:100,props:[{k:'transform',v:'translateY(0)'}]}]},
  spin:{name:'spin',frames:[{p:0,props:[{k:'transform',v:'rotate(0deg)'}]},{p:100,props:[{k:'transform',v:'rotate(360deg)'}]}]},
  pulse:{name:'pulse',frames:[{p:0,props:[{k:'transform',v:'scale(1)'}]},{p:50,props:[{k:'transform',v:'scale(1.2)'}]},{p:100,props:[{k:'transform',v:'scale(1)'}]}]},
  shake:{name:'shake',frames:[{p:0,props:[{k:'transform',v:'translateX(0)'}]},{p:20,props:[{k:'transform',v:'translateX(-10px)'}]},{p:40,props:[{k:'transform',v:'translateX(10px)'}]},{p:60,props:[{k:'transform',v:'translateX(-10px)'}]},{p:80,props:[{k:'transform',v:'translateX(10px)'}]},{p:100,props:[{k:'transform',v:'translateX(0)'}]}]},
  colorShift:{name:'colorShift',frames:[{p:0,props:[{k:'background-color',v:'#3b82f6'}]},{p:50,props:[{k:'background-color',v:'#10b981'}]},{p:100,props:[{k:'background-color',v:'#3b82f6'}]}]},
  flip:{name:'flip',frames:[{p:0,props:[{k:'transform',v:'perspective(400px) rotateY(0)'}]},{p:50,props:[{k:'transform',v:'perspective(400px) rotateY(-180deg)'}]},{p:100,props:[{k:'transform',v:'perspective(400px) rotateY(-360deg)'}]}]}
};

var state={
  name:'myAnimation',duration:'1',easing:'ease',iterations:'infinite',direction:'normal',
  frames:[{p:0,props:[{k:'opacity',v:'0'}]},{p:100,props:[{k:'opacity',v:'1'}]}],
  playing:false
};
var previewInterval=null;

function genCSS(){
  var frames=state.frames.slice().sort(function(a,b){return a.p-b.p;});
  var kf='@keyframes '+state.name+' {\n';
  frames.forEach(function(f){
    kf+='  '+f.p+'% {\n';
    f.props.forEach(function(p){kf+='    '+p.k+': '+p.v+';\n';});
    kf+='  }\n';
  });
  kf+='}';
  var bounce='cubic-bezier(0.68,-0.55,0.265,1.55)';
  var easingVal=state.easing==='bounce'?bounce:state.easing;
  var cls='.'+state.name+'-element {\n  animation: '+state.name+' '+state.duration+'s '+easingVal+' '+state.iterations+' '+state.direction+';\n}';
  return kf+'\n\n'+cls;
}

function applyPreview(){
  var el=document.getElementById('anim-preview-el');
  if(!el)return;
  var frames=state.frames.slice().sort(function(a,b){return a.p-b.p;});
  var bounce='cubic-bezier(0.68,-0.55,0.265,1.55)';
  var easingVal=state.easing==='bounce'?bounce:state.easing;
  var styleTag=document.getElementById('anim-preview-style');
  if(!styleTag){styleTag=document.createElement('style');styleTag.id='anim-preview-style';document.head.appendChild(styleTag);}
  var css='@keyframes '+state.name+'_preview {\n';
  frames.forEach(function(f){css+='  '+f.p+'%{\n';f.props.forEach(function(p){css+='    '+p.k+':'+p.v+';\n';});css+='  }\n';});
  css+='}';
  styleTag.textContent=css;
  el.style.animation='none';
  el.offsetHeight; // reflow
  el.style.animation=state.name+'_preview '+state.duration+'s '+easingVal+' '+state.iterations+' '+state.direction;
  state.playing=true;
}

function stopPreview(){
  var el=document.getElementById('anim-preview-el');if(!el)return;
  el.style.animation='none';state.playing=false;
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,191,36,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(244,63,94,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Presets
  var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('presets');body.appendChild(plabel);
  var prow=document.createElement('div');prow.style='display:flex;flex-wrap:wrap;gap:4px;';
  Object.keys(PRESETS).forEach(function(k){
    var b=document.createElement('button');b.textContent=k;
    b.style='font-size:9px;padding:3px 8px;border-radius:5px;border:1px solid rgba(251,191,36,0.3);background:rgba(251,191,36,0.1);color:#fbbf24;cursor:pointer;';
    b.onclick=function(){var pr=PRESETS[k];state.name=pr.name;state.frames=JSON.parse(JSON.stringify(pr.frames));renderTab();};
    prow.appendChild(b);
  });
  body.appendChild(prow);

  // Settings row
  function mkSm(lk,id,val,type){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var inp=document.createElement('input');inp.type=type||'text';inp.id=id;inp.value=val||'';
    inp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(251,191,36,0.2);padding:6px 7px;border-radius:6px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
    inp.oninput=function(){state[id.replace('anim-','')]=this.value;};
    d.appendChild(l);d.appendChild(inp);return d;
  }
  var r1=document.createElement('div');r1.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  r1.appendChild(mkSm('animName','anim-name',state.name));
  r1.appendChild(mkSm('duration','anim-duration',state.duration,'number'));
  body.appendChild(r1);

  var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  // Easing select
  var eDiv=document.createElement('div');eDiv.style='display:flex;flex-direction:column;gap:2px;';
  var eLabel=document.createElement('div');eLabel.style='font-size:9px;color:#64748b;font-weight:600;';eLabel.textContent=t('easing');
  var eSel=document.createElement('select');eSel.id='anim-easing';
  eSel.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(251,191,36,0.2);padding:6px 7px;border-radius:6px;font-size:10px;outline:none;cursor:pointer;';
  ['ease','linear','ease-in','ease-out','ease-in-out','bounce'].forEach(function(e){var o=document.createElement('option');o.value=e;o.textContent=e;o.selected=state.easing===e;eSel.appendChild(o);});
  eSel.onchange=function(){state.easing=this.value;};
  eDiv.appendChild(eLabel);eDiv.appendChild(eSel);r2.appendChild(eDiv);
  // Iterations
  var iDiv=document.createElement('div');iDiv.style='display:flex;flex-direction:column;gap:2px;';
  var iLabel=document.createElement('div');iLabel.style='font-size:9px;color:#64748b;font-weight:600;';iLabel.textContent=t('iterations');
  var iSel=document.createElement('select');iSel.id='anim-iter';
  iSel.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(251,191,36,0.2);padding:6px 7px;border-radius:6px;font-size:10px;outline:none;cursor:pointer;';
  ['infinite','1','2','3','5'].forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=v;o.selected=state.iterations===v;iSel.appendChild(o);});
  iSel.onchange=function(){state.iterations=this.value;};
  iDiv.appendChild(iLabel);iDiv.appendChild(iSel);r2.appendChild(iDiv);
  body.appendChild(r2);

  // TIMELINE VISUAL
  var tlLabel=document.createElement('div');tlLabel.style='font-size:10px;color:#64748b;font-weight:600;';tlLabel.textContent=t('keyframes')+' ('+state.frames.length+')';body.appendChild(tlLabel);

  // Timeline bar
  var tlBar=document.createElement('div');tlBar.style='position:relative;height:36px;background:rgba(255,255,255,0.03);border:1px solid rgba(251,191,36,0.2);border-radius:8px;margin-bottom:4px;cursor:pointer;';
  // Track
  var track=document.createElement('div');track.style='position:absolute;top:50%;left:0;right:0;height:2px;background:rgba(251,191,36,0.2);transform:translateY(-50%);';tlBar.appendChild(track);
  // Keyframe markers
  var sortedFrames=state.frames.slice().sort(function(a,b){return a.p-b.p;});
  sortedFrames.forEach(function(f,idx){
    var marker=document.createElement('div');
    marker.style='position:absolute;top:50%;left:'+f.p+'%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#fbbf24;border:2px solid #0c0f1a;cursor:pointer;z-index:2;box-shadow:0 0 6px rgba(251,191,36,0.6);';
    marker.title=f.p+'%';
    tlBar.appendChild(marker);
    // Percentage label
    var pLabel=document.createElement('div');pLabel.style='position:absolute;top:-2px;left:'+f.p+'%;transform:translateX(-50%);font-size:7px;color:#fbbf24;white-space:nowrap;';
    pLabel.textContent=f.p+'%';track.appendChild(pLabel);
  });
  // Click to add keyframe
  tlBar.onclick=function(e){
    var rect=tlBar.getBoundingClientRect();var pct=Math.round(((e.clientX-rect.left)/rect.width)*100);
    pct=Math.max(0,Math.min(100,pct));
    if(!state.frames.find(function(f){return f.p===pct;})){
      state.frames.push({p:pct,props:[{k:'opacity',v:'1'}]});renderTab();
    }
  };
  body.appendChild(tlBar);

  var clickHint=document.createElement('div');clickHint.style='font-size:9px;color:#64748b;text-align:center;';clickHint.textContent=gl()==='fr'?'Cliquez sur la barre pour ajouter un keyframe':'Click bar to add a keyframe';body.appendChild(clickHint);

  // Keyframe cards
  sortedFrames.forEach(function(f,idx){
    var card=document.createElement('div');card.style='background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.2);border-radius:8px;padding:8px;';
    var cardHdr=document.createElement('div');cardHdr.style='display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    var pctBadge=document.createElement('div');pctBadge.style='font-size:11px;font-weight:900;color:#fbbf24;background:rgba(251,191,36,0.15);padding:3px 8px;border-radius:5px;';pctBadge.textContent=f.p+'%';
    // Delete button (not for 0% and 100%)
    var delBtn=document.createElement('button');delBtn.textContent=t('del');
    delBtn.style='margin-left:auto;background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.25);padding:2px 7px;border-radius:5px;font-size:9px;cursor:pointer;';
    delBtn.onclick=(function(pct){return function(){state.frames=state.frames.filter(function(f){return f.p!==pct;});renderTab();};})(f.p);
    if(f.p===0||f.p===100)delBtn.style.display='none';
    cardHdr.appendChild(pctBadge);cardHdr.appendChild(delBtn);card.appendChild(cardHdr);
    // Properties
    f.props.forEach(function(prop,pi){
      var pRow=document.createElement('div');pRow.style='display:flex;gap:4px;margin-bottom:4px;align-items:center;';
      var kInp=document.createElement('input');kInp.type='text';kInp.placeholder='property';kInp.value=prop.k;
      kInp.style='flex:1;background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px 7px;border-radius:5px;font-size:9px;outline:none;font-family:"JetBrains Mono",monospace;';
      kInp.onchange=(function(frameP,propIdx){return function(){var fr=state.frames.find(function(f){return f.p===frameP;});if(fr)fr.props[propIdx].k=this.value;};})(f.p,pi);
      var vInp=document.createElement('input');vInp.type='text';vInp.placeholder='value';vInp.value=prop.v;
      vInp.style='flex:1.5;background:#0f172a;color:#60a5fa;border:1px solid rgba(255,255,255,0.08);padding:5px 7px;border-radius:5px;font-size:9px;outline:none;font-family:"JetBrains Mono",monospace;';
      vInp.onchange=(function(frameP,propIdx){return function(){var fr=state.frames.find(function(f){return f.p===frameP;});if(fr)fr.props[propIdx].v=this.value;};})(f.p,pi);
      var rmProp=document.createElement('button');rmProp.textContent='✕';
      rmProp.style='background:transparent;color:#64748b;border:none;cursor:pointer;font-size:10px;padding:2px 4px;';
      rmProp.onclick=(function(frameP,propIdx){return function(){var fr=state.frames.find(function(f){return f.p===frameP;});if(fr&&fr.props.length>1)fr.props.splice(propIdx,1);renderTab();};})(f.p,pi);
      pRow.appendChild(kInp);pRow.appendChild(vInp);pRow.appendChild(rmProp);card.appendChild(pRow);
    });
    var addPropBtn=document.createElement('button');addPropBtn.textContent=t('addProp');
    addPropBtn.style='font-size:9px;background:rgba(255,255,255,0.04);color:#64748b;border:1px dashed rgba(255,255,255,0.1);padding:3px 8px;border-radius:5px;cursor:pointer;width:100%;';
    addPropBtn.onclick=(function(frameP){return function(){var fr=state.frames.find(function(f){return f.p===frameP;});if(fr)fr.props.push({k:'transform',v:'translateX(0)'});renderTab();};})(f.p);
    card.appendChild(addPropBtn);
    body.appendChild(card);
  });

  // Preview
  var pvLabel=document.createElement('div');pvLabel.style='font-size:10px;color:#64748b;font-weight:600;';pvLabel.textContent=t('preview');body.appendChild(pvLabel);
  var pvArea=document.createElement('div');
  pvArea.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:20px;display:flex;align-items:center;justify-content:center;min-height:80px;';
  var pvEl=document.createElement('div');pvEl.id='anim-preview-el';
  pvEl.style='width:60px;height:60px;background:linear-gradient(135deg,#fbbf24,#f472b6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;';
  pvEl.textContent='✨';pvArea.appendChild(pvEl);body.appendChild(pvArea);

  // Playback controls
  var ctrlRow=document.createElement('div');ctrlRow.style='display:flex;gap:6px;';
  var playBtn=document.createElement('button');playBtn.innerHTML=state.playing?t('stop'):t('play');
  playBtn.style='flex:1;background:linear-gradient(135deg,#92400e,#d97706);color:#fff;border:none;padding:9px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  playBtn.onclick=function(){if(state.playing){stopPreview();renderTab();}else{applyPreview();playBtn.innerHTML=t('stop');}};
  var resetBtn=document.createElement('button');resetBtn.innerHTML=t('reset');
  resetBtn.style='background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1);padding:9px 12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:10px;';
  resetBtn.onclick=function(){stopPreview();renderTab();};
  ctrlRow.appendChild(playBtn);ctrlRow.appendChild(resetBtn);body.appendChild(ctrlRow);

  // Generated CSS output
  var css=genCSS();
  var cssLabel=document.createElement('div');cssLabel.style='font-size:10px;color:#64748b;font-weight:600;';cssLabel.textContent='Generated CSS:';body.appendChild(cssLabel);
  var pre=document.createElement('pre');
  pre.style='background:#0d1117;border:1px solid rgba(251,191,36,0.2);border-radius:8px;padding:10px;font-size:8.5px;color:#c9d1d9;overflow:auto;max-height:140px;white-space:pre;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
  pre.textContent=css;body.appendChild(pre);

  // Export/Inject
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var expBtn=document.createElement('button');expBtn.innerHTML=t('export');
  expBtn.style='flex:1;background:rgba(251,191,36,0.12);color:#fbbf24;border:1px solid rgba(251,191,36,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  expBtn.onclick=function(){navigator.clipboard.writeText(css).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  var injBtn=document.createElement('button');injBtn.innerHTML=t('inject');
  injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injBtn.onclick=function(){
    if(!window.editor)return;
    var code=window.editor.getValue();
    var inject='<style>\n'+css+'\n</style>\n\n<div class="'+state.name+'-element" style="width:80px;height:80px;background:linear-gradient(135deg,#fbbf24,#f472b6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;">✨</div>';
    if(code.includes('</body>'))code=code.replace('</body>',inject+'\n</body>');
    else code+='\n'+inject;
    window.editor.setValue(code);if(window.runPreview)window.runPreview();
    if(window.showToast)window.showToast(t('injected'));
  };
  actRow.appendChild(expBtn);actRow.appendChild(injBtn);body.appendChild(actRow);

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cssanim');if(el)el.textContent=t('tab');if(window.activeTab==='cssanim')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='cssanim'){window.activeTab='cssanim';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cssanim');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
