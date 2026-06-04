/**
 * Password Strength Analyzer v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Password',title:'🔒 Password Analyzer',sub:'Generate & analyze password strength',
      generate:'Generate Secure Password',length:'Length:',options:'Options:',
      uppercase:'Uppercase',lowercase:'Lowercase',numbers:'Numbers',symbols:'Symbols',
      strength:'Strength:',timeToCrack:'Time to crack:',entropy:'Entropy:',
      checks:'Security checks:',copy:'📋 Copy',generate2:'⚡ Generate',
      weak:'Weak',fair:'Fair',good:'Good',strong:'Strong',veryStrong:'Very Strong',
      copied:'📋 Copied!',yourPassword:'Your Password:',analysis:'Live Analysis:',
      checks_list:{length8:'At least 8 chars',length12:'At least 12 chars',upper:'Uppercase letters',lower:'Lowercase letters',nums:'Numbers',syms:'Special symbols',noCommon:'Not a common password',noRepeat:'No repeated patterns'}},
  fr:{tab:'Password',title:'🔒 Analyseur de Mot de Passe',sub:'Générez & analysez la sécurité',
      generate:'Générer Mot de Passe Sécurisé',length:'Longueur :',options:'Options :',
      uppercase:'Majuscules',lowercase:'Minuscules',numbers:'Chiffres',symbols:'Symboles',
      strength:'Force :',timeToCrack:'Temps de crack :',entropy:'Entropie :',
      checks:'Vérifications :',copy:'📋 Copier',generate2:'⚡ Générer',
      weak:'Faible',fair:'Passable',good:'Bon',strong:'Fort',veryStrong:'Très Fort',
      copied:'📋 Copié !',yourPassword:'Votre Mot de Passe :',analysis:'Analyse Live :',
      checks_list:{length8:'Au moins 8 caractères',length12:'Au moins 12 caractères',upper:'Lettres majuscules',lower:'Lettres minuscules',nums:'Chiffres',syms:'Symboles spéciaux',noCommon:'Pas un mot de passe commun',noRepeat:'Pas de répétitions'}}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tc(k){return((TX[gl()]||TX.en).checks_list||TX.en.checks_list)[k]||k;}

var COMMON=['password','123456','qwerty','abc123','letmein','monkey','dragon','master','sunshine','princess','welcome','shadow','superman','michael','football'];

function calcEntropy(pw){
  var charset=0;
  if(/[a-z]/.test(pw))charset+=26;
  if(/[A-Z]/.test(pw))charset+=26;
  if(/[0-9]/.test(pw))charset+=10;
  if(/[^a-zA-Z0-9]/.test(pw))charset+=32;
  return Math.round(pw.length*Math.log2(charset||1));
}

function timeToCrack(entropy){
  var ops=1e10; // 10 billion guesses/sec (GPU)
  var combos=Math.pow(2,entropy);
  var secs=combos/(ops*2);
  if(secs<1)return gl()==='fr'?'Instantané':'Instant';
  if(secs<60)return Math.round(secs)+' sec';
  if(secs<3600)return Math.round(secs/60)+' min';
  if(secs<86400)return Math.round(secs/3600)+' hr';
  if(secs<31536000)return Math.round(secs/86400)+' days';
  if(secs<3153600000)return Math.round(secs/31536000)+' yrs';
  return secs<3e13?'Thousands of yrs':'🏆 Millions of yrs';
}

function getStrength(entropy){
  if(entropy<28)return{label:t('weak'),color:'#ef4444',score:1};
  if(entropy<36)return{label:t('fair'),color:'#f97316',score:2};
  if(entropy<60)return{label:t('good'),color:'#eab308',score:3};
  if(entropy<80)return{label:t('strong'),color:'#22c55e',score:4};
  return{label:t('veryStrong'),color:'#10b981',score:5};
}

function analyzePassword(pw){
  var entropy=calcEntropy(pw);
  var strength=getStrength(entropy);
  var isCommon=COMMON.some(function(c){return pw.toLowerCase().includes(c);});
  var hasRepeat=/(.)\1{2,}/.test(pw);
  var checks={
    length8:pw.length>=8,length12:pw.length>=12,
    upper:/[A-Z]/.test(pw),lower:/[a-z]/.test(pw),
    nums:/[0-9]/.test(pw),syms:/[^a-zA-Z0-9]/.test(pw),
    noCommon:!isCommon,noRepeat:!hasRepeat
  };
  return{entropy:entropy,strength:strength,time:timeToCrack(entropy),checks:checks};
}

function generatePassword(len,useUpper,useLower,useNums,useSyms){
  var chars='';var result='';
  if(useUpper)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(useLower)chars+='abcdefghijklmnopqrstuvwxyz';
  if(useNums)chars+='0123456789';
  if(useSyms)chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  if(!chars)chars='abcdefghijklmnopqrstuvwxyz';
  var arr=new Uint8Array(len);window.crypto.getRandomValues(arr);
  for(var i=0;i<len;i++)result+=chars[arr[i]%chars.length];
  return result;
}

var currentPw='';
var pwLen=16;
var opts={upper:true,lower:true,nums:true,syms:true};

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Password input + copy
  var pwLabel=document.createElement('div');pwLabel.style='font-size:10px;color:#64748b;font-weight:600;';pwLabel.textContent=t('yourPassword');body.appendChild(pwLabel);
  var pwRow=document.createElement('div');pwRow.style='display:flex;gap:6px;';
  var pwInp=document.createElement('input');pwInp.type='text';pwInp.id='pw-input';pwInp.value=currentPw;pwInp.placeholder='Type or generate a password...';
  pwInp.style='flex:1;background:#0f172a;color:#4ade80;border:1px solid rgba(34,197,94,0.3);padding:10px 12px;border-radius:8px;font-size:13px;font-family:"JetBrains Mono",monospace;outline:none;letter-spacing:1px;';
  pwInp.oninput=function(){currentPw=this.value;updateAnalysis();};
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('copy');cpBtn.style='background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.3);padding:8px 12px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){if(currentPw)navigator.clipboard.writeText(currentPw).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  pwRow.appendChild(pwInp);pwRow.appendChild(cpBtn);body.appendChild(pwRow);

  // Strength bar
  var analysis=currentPw?analyzePassword(currentPw):{entropy:0,strength:{label:'—',color:'#334155',score:0},time:'—',checks:{length8:false,length12:false,upper:false,lower:false,nums:false,syms:false,noCommon:false,noRepeat:false}};
  var barWrap=document.createElement('div');barWrap.style='display:flex;flex-direction:column;gap:4px;';
  var barRow=document.createElement('div');barRow.style='display:flex;align-items:center;gap:8px;';
  var bar=document.createElement('div');bar.style='flex:1;height:8px;background:#1e293b;border-radius:4px;overflow:hidden;';
  var barFill=document.createElement('div');barFill.style='height:100%;width:'+(analysis.strength.score/5*100)+'%;background:'+analysis.strength.color+';border-radius:4px;transition:width 0.3s;box-shadow:0 0 8px '+analysis.strength.color+'66;';
  bar.appendChild(barFill);
  var strengthLabel=document.createElement('span');strengthLabel.style='font-size:11px;font-weight:800;color:'+analysis.strength.color+';min-width:70px;';strengthLabel.textContent=analysis.strength.label;
  barRow.appendChild(bar);barRow.appendChild(strengthLabel);barWrap.appendChild(barRow);
  var statsRow=document.createElement('div');statsRow.style='display:flex;gap:8px;';
  [{label:t('entropy'),val:analysis.entropy+' bits'},{label:t('timeToCrack'),val:analysis.time}].forEach(function(s){
    var d=document.createElement('div');d.style='flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:6px 8px;';
    d.innerHTML='<div style="font-size:8.5px;color:#64748b;margin-bottom:2px;">'+s.label+'</div><div style="font-size:11px;font-weight:700;color:#e2e8f0;font-family:\'JetBrains Mono\',monospace;">'+s.val+'</div>';
    statsRow.appendChild(d);
  });
  barWrap.appendChild(statsRow);body.appendChild(barWrap);

  // Security checks
  var checksLabel=document.createElement('div');checksLabel.style='font-size:10px;color:#64748b;font-weight:600;';checksLabel.textContent=t('checks');body.appendChild(checksLabel);
  var checksGrid=document.createElement('div');checksGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:4px;';
  Object.keys(analysis.checks).forEach(function(k){
    var ok=analysis.checks[k];
    var c=document.createElement('div');c.style='display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.02);border:1px solid '+(ok?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.05)')+';border-radius:6px;padding:5px 8px;';
    c.innerHTML='<span style="font-size:10px;">'+(ok?'✅':'❌')+'</span><span style="font-size:9px;color:'+(ok?'#4ade80':'#64748b')+';">'+tc(k)+'</span>';
    checksGrid.appendChild(c);
  });
  body.appendChild(checksGrid);

  // Generator
  var genLabel=document.createElement('div');genLabel.style='font-size:10px;color:#64748b;font-weight:600;';genLabel.textContent=t('generate');body.appendChild(genLabel);
  var lenRow=document.createElement('div');lenRow.style='display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 10px;';
  var lenLabel=document.createElement('span');lenLabel.style='font-size:10px;color:#64748b;white-space:nowrap;';lenLabel.textContent=t('length')+' '+pwLen;
  var lenSlider=document.createElement('input');lenSlider.type='range';lenSlider.min=8;lenSlider.max=64;lenSlider.value=pwLen;lenSlider.style='flex:1;accent-color:#22c55e;';
  lenSlider.oninput=function(){pwLen=parseInt(this.value);lenLabel.textContent=t('length')+' '+pwLen;};
  lenRow.appendChild(lenLabel);lenRow.appendChild(lenSlider);body.appendChild(lenRow);

  var optsRow=document.createElement('div');optsRow.style='display:flex;flex-wrap:wrap;gap:5px;';
  [{k:'upper',l:t('uppercase')},{k:'lower',l:t('lowercase')},{k:'nums',l:t('numbers')},{k:'syms',l:t('symbols')}].forEach(function(o){
    var btn=document.createElement('button');btn.textContent=o.l;var isA=opts[o.k];
    btn.style='font-size:9px;padding:5px 10px;border-radius:20px;border:1px solid '+(isA?'rgba(34,197,94,0.5)':'rgba(255,255,255,0.1)')+';background:'+(isA?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.03)')+';color:'+(isA?'#4ade80':'#64748b')+';cursor:pointer;';
    btn.onclick=function(){opts[o.k]=!opts[o.k];renderTab();};optsRow.appendChild(btn);
  });
  body.appendChild(optsRow);

  var genBtn=document.createElement('button');genBtn.innerHTML='⚡ '+t('generate2');
  genBtn.style='width:100%;background:linear-gradient(135deg,#166534,#22c55e);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(34,197,94,0.3);';
  genBtn.onclick=function(){
    currentPw=generatePassword(pwLen,opts.upper,opts.lower,opts.nums,opts.syms);
    var inp=document.getElementById('pw-input');if(inp){inp.value=currentPw;}
    updateAnalysis();
  };
  body.appendChild(genBtn);
  wrap.appendChild(body);parent.appendChild(wrap);

  function updateAnalysis(){
    var a=currentPw?analyzePassword(currentPw):{entropy:0,strength:{label:'—',color:'#334155',score:0},time:'—',checks:{length8:false,length12:false,upper:false,lower:false,nums:false,syms:false,noCommon:false,noRepeat:false}};
    barFill.style.width=(a.strength.score/5*100)+'%';barFill.style.background=a.strength.color;barFill.style.boxShadow='0 0 8px '+a.strength.color+'66';
    strengthLabel.style.color=a.strength.color;strengthLabel.textContent=a.strength.label;
    statsRow.children[0].querySelector('div:last-child').textContent=a.entropy+' bits';
    statsRow.children[1].querySelector('div:last-child').textContent=a.time;
    Object.keys(a.checks).forEach(function(k,i){var el=checksGrid.children[i];if(!el)return;el.style.borderColor=a.checks[k]?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.05)';el.children[0].textContent=a.checks[k]?'✅':'❌';el.children[1].style.color=a.checks[k]?'#4ade80':'#64748b';});
  }
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-password');if(el)el.textContent=t('tab');if(window.activeTab==='password')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='password'){window.activeTab='password';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-password');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
