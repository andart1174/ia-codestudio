/**
 * CSS Specificity Calculator v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Specificity',title:'🔍 CSS Specificity Calculator',sub:'Calculate & compare selector specificity',
      selector:'CSS Selector:',ph:'e.g. #nav .btn:hover',btnCalc:'⚡ Calculate',
      result:'Specificity:',ids:'IDs',classes:'Classes/Attrs/Pseudo',elements:'Elements',
      total:'Total weight',compare:'Compare selectors (one per line):',btnCompare:'🔄 Compare',
      winner:'🏆 Highest specificity:',tip:'Specificity = (IDs, Classes+Attrs+Pseudo, Elements). Higher = wins.',
      examples:'Quick examples:',low:'Low specificity',medium:'Medium',high:'High'},
  fr:{tab:'Spécificité',title:'🔍 Calculateur de Spécificité CSS',sub:'Calculez & comparez la spécificité',
      selector:'Sélecteur CSS :',ph:'ex. #nav .btn:hover',btnCalc:'⚡ Calculer',
      result:'Spécificité :',ids:'IDs',classes:'Classes/Attrs/Pseudo',elements:'Éléments',
      total:'Poids total',compare:'Comparer sélecteurs (un par ligne) :',btnCompare:'🔄 Comparer',
      winner:'🏆 Spécificité la plus haute :',tip:'Spécificité = (IDs, Classes+Attrs+Pseudo, Éléments). Plus haut = gagne.',
      examples:'Exemples rapides :',low:'Faible',medium:'Moyenne',high:'Haute'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

function calcSpec(sel){
  var s=sel.trim();
  // Remove pseudo-elements to count them as elements
  var ids=(s.match(/#[a-zA-Z][\w-]*/g)||[]).length;
  var classes=(s.match(/\.[a-zA-Z][\w-]*/g)||[]).length;
  var attrs=(s.match(/\[[^\]]*\]/g)||[]).length;
  var pseudoClasses=(s.match(/:[a-zA-Z][\w-]*(?:\([^)]*\))?/g)||[]).filter(function(p){return!p.startsWith('::');}).length;
  var pseudoEls=(s.match(/::[a-zA-Z][\w-]*/g)||[]).length;
  var elements=(s.match(/(?:^|[\s>+~])([a-zA-Z][a-zA-Z0-9-]*)/g)||[]).filter(function(e){return!['not','is','where','has','nth','first','last','only','nth-child','nth-type'].some(function(k){return e.trim().startsWith(':'+k);});}).length+pseudoEls;
  var c=classes+attrs+pseudoClasses;
  return{ids:ids,classes:c,elements:elements,weight:ids*100+c*10+elements};
}

function specBar(val,max,color){
  var pct=max>0?Math.min((val/max)*100,100):0;
  return '<div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;margin-top:3px;"><div style="width:'+pct+'%;height:100%;background:'+color+';border-radius:3px;"></div></div>';
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(6,182,212,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(6,182,212,0.08),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#22d3ee;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');tip.style='font-size:9.5px;color:#94a3b8;background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:6px;padding:7px 9px;line-height:1.4;';tip.textContent=t('tip');body.appendChild(tip);

  // Quick examples
  var exLabel=document.createElement('div');exLabel.style='font-size:10px;color:#64748b;font-weight:600;';exLabel.textContent=t('examples');body.appendChild(exLabel);
  var exRow=document.createElement('div');exRow.style='display:flex;flex-wrap:wrap;gap:4px;';
  [['p','#ef4444',t('low')],['p.btn','#f59e0b',t('medium')],['#nav .btn:hover','#10b981',t('high')]].forEach(function(ex){
    var b=document.createElement('button');b.textContent=ex[0];
    b.style='font-size:9px;padding:3px 8px;border-radius:5px;border:1px solid '+ex[1]+'44;background:'+ex[1]+'11;color:'+ex[1]+';cursor:pointer;';
    b.onclick=function(){var inp=document.getElementById('spec-input');if(inp){inp.value=ex[0];calcBtn.click();}};
    exRow.appendChild(b);
  });
  body.appendChild(exRow);

  var slabel=document.createElement('div');slabel.style='font-size:10px;color:#64748b;font-weight:600;';slabel.textContent=t('selector');body.appendChild(slabel);
  var sinp=document.createElement('input');sinp.type='text';sinp.id='spec-input';sinp.placeholder=t('ph');
  sinp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(6,182,212,0.2);padding:8px 10px;border-radius:8px;font-size:11px;outline:none;width:100%;box-sizing:border-box;font-family:"JetBrains Mono",monospace;';
  body.appendChild(sinp);

  var calcBtn=document.createElement('button');calcBtn.innerHTML=t('btnCalc');
  calcBtn.style='width:100%;background:linear-gradient(135deg,#0e7490,#0891b2);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;';
  calcBtn.onclick=function(){
    var sel=(document.getElementById('spec-input')||{}).value||'';
    if(!sel)return;
    var spec=calcSpec(sel);
    var out=document.getElementById('spec-output');if(!out)return;
    var weightColor=spec.weight>=100?'#ef4444':spec.weight>=10?'#f59e0b':'#10b981';
    out.style.display='flex';
    out.innerHTML='<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(6,182,212,0.2);border-radius:10px;padding:12px;">' +
      '<div style="font-family:\'JetBrains Mono\',monospace;font-size:20px;font-weight:900;color:#22d3ee;margin-bottom:8px;letter-spacing:4px;">' +
      '('+spec.ids+','+spec.classes+','+spec.elements+')</div>' +
      '<div style="font-size:18px;font-weight:900;color:'+weightColor+';margin-bottom:10px;">'+t('total')+': '+spec.weight+'</div>' +
      [['IDs','ids','#ef4444'],['Classes','classes','#f59e0b'],['Elements','elements','#10b981']].map(function(r){
        return '<div style="margin-bottom:6px;"><div style="display:flex;justify-content:space-between;font-size:9px;color:#64748b;"><span>'+r[0]+'</span><span style="color:'+r[2]+';font-weight:700;">'+spec[r[1]]+'</span></div>'+specBar(spec[r[1]],Math.max(spec.ids,spec.classes,spec.elements,1),r[2])+'</div>';
      }).join('')+'</div>';
  };
  body.appendChild(calcBtn);
  var specOut=document.createElement('div');specOut.id='spec-output';specOut.style='display:none;flex-direction:column;';body.appendChild(specOut);

  // Compare
  var cDivider=document.createElement('div');cDivider.style='height:1px;background:rgba(255,255,255,0.05);';body.appendChild(cDivider);
  var clabel=document.createElement('div');clabel.style='font-size:10px;color:#64748b;font-weight:600;';clabel.textContent=t('compare');body.appendChild(clabel);
  var cta=document.createElement('textarea');cta.id='spec-compare';cta.rows=4;cta.placeholder='h1\n.btn\n#nav .btn:hover\nbody > main > p';
  cta.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(6,182,212,0.15);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;resize:vertical;font-family:"JetBrains Mono",monospace;line-height:1.4;';
  body.appendChild(cta);
  var cmpBtn=document.createElement('button');cmpBtn.innerHTML=t('btnCompare');
  cmpBtn.style='width:100%;background:rgba(6,182,212,0.15);color:#22d3ee;border:1px solid rgba(6,182,212,0.3);padding:9px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  cmpBtn.onclick=function(){
    var lines=((document.getElementById('spec-compare')||{}).value||'').split('\n').map(function(l){return l.trim();}).filter(Boolean);
    var results=lines.map(function(l){return{sel:l,spec:calcSpec(l)};});
    results.sort(function(a,b){return b.spec.weight-a.spec.weight;});
    var cOut=document.getElementById('spec-cmp-out');if(!cOut)return;
    cOut.innerHTML='';
    results.forEach(function(r,i){
      var c=i===0?'#fbbf24':'#64748b';
      var row=document.createElement('div');
      row.style='display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;border-left:3px solid '+c+';';
      row.innerHTML='<span style="font-size:11px;">'+( i===0?'🏆':'#'+(i+1))+'</span>' +
        '<code style="flex:1;font-size:10px;color:#e2e8f0;">'+r.sel+'</code>' +
        '<span style="font-size:11px;font-weight:900;color:'+c+';">('+r.spec.ids+','+r.spec.classes+','+r.spec.elements+') = '+r.spec.weight+'</span>';
      cOut.appendChild(row);
    });
  };
  body.appendChild(cmpBtn);
  var cmpOut=document.createElement('div');cmpOut.id='spec-cmp-out';cmpOut.style='display:flex;flex-direction:column;gap:4px;';body.appendChild(cmpOut);
  wrap.appendChild(body);parent.appendChild(wrap);
  sinp.onkeydown=function(e){if(e.key==='Enter')calcBtn.click();};
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cssspec');if(el)el.textContent=t('tab');if(window.activeTab==='cssspec')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='cssspec'){window.activeTab='cssspec';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cssspec');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
