/**
 * Device Simulator Pro v1.0 — EN/FR — Non-destructive
 * Shows preview inside realistic device frames
 */
(function() {
'use strict';
var TX={en:{tab:'Simulator',title:'📱 Device Simulator Pro',sub:'Preview in real device frames',rotate:'Rotate',screenshot:'📸 Screenshot',refresh:'🔄 Refresh',fullscreen:'⛶ Fullscreen',devices:'Devices',noCode:'⚠️ No code to preview.',scale:'Scale'},fr:{tab:'Simulateur',title:'📱 Simulateur Appareils Pro',sub:'Aperçu dans de vrais cadres d\'appareils',rotate:'Rotation',screenshot:'📸 Capture',refresh:'🔄 Actualiser',fullscreen:'⛶ Plein écran',devices:'Appareils',noCode:'⚠️ Aucun code à prévisualiser.',scale:'Échelle'}};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var DEVICES=[
  {id:'iphone15',name:'iPhone 15 Pro',w:393,h:852,fr:28,bezel:10,notch:true,color:'#1a1a1a',icon:'📱'},
  {id:'galaxy',name:'Galaxy S24',w:360,h:800,fr:22,bezel:8,notch:false,color:'#0d0d0d',icon:'📱'},
  {id:'ipad',name:'iPad Air',w:820,h:1180,fr:20,bezel:16,notch:false,color:'#1a1a1a',icon:'📲'},
  {id:'macbook',name:'MacBook Pro 14"',w:1512,h:945,fr:14,bezel:14,notch:false,color:'#2a2a2a',icon:'💻',isDesktop:true},
  {id:'desktop',name:'Desktop 1440p',w:1440,h:900,fr:0,bezel:0,notch:false,color:'#111',icon:'🖥️',isDesktop:true}
];

var state={deviceIdx:0,landscape:false,scale:100};

function getCode(){return window.editor?window.editor.getValue():'';}

function renderSimTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;';

  // Header
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  // Device selector
  var devBar=document.createElement('div');devBar.style='padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;display:flex;flex-direction:column;gap:6px;';
  var devLabel=document.createElement('div');devLabel.style='font-size:9px;font-weight:900;color:#64748b;letter-spacing:1px;text-transform:uppercase;';devLabel.textContent=t('devices');
  var devGrid=document.createElement('div');devGrid.style='display:flex;flex-wrap:wrap;gap:5px;';
  DEVICES.forEach(function(d,i){
    var btn=document.createElement('button');
    btn.style='background:'+(i===state.deviceIdx?'rgba(59,130,246,0.2)':'rgba(255,255,255,0.04)')+';border:1px solid '+(i===state.deviceIdx?'rgba(59,130,246,0.5)':'rgba(255,255,255,0.1)')+';border-radius:7px;padding:5px 8px;cursor:pointer;transition:0.15s;';
    btn.innerHTML='<div style="font-size:14px;">'+d.icon+'</div><div style="font-size:9px;color:'+(i===state.deviceIdx?'#60a5fa':'#94a3b8')+';">'+d.name.split(' ')[0]+(d.name.split(' ')[1]?' '+d.name.split(' ')[1]:'')+'</div>';
    btn.onclick=function(){state.deviceIdx=i;renderSimTab();};
    devGrid.appendChild(btn);
  });
  devBar.appendChild(devLabel);devBar.appendChild(devGrid);

  // Controls
  var ctrlBar=document.createElement('div');ctrlBar.style='display:flex;gap:5px;flex-wrap:wrap;';
  var rotBtn=document.createElement('button');
  var dev=DEVICES[state.deviceIdx];
  rotBtn.textContent=(state.landscape?'↕️':'↔️')+' '+t('rotate');
  rotBtn.style='background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:5px 9px;color:#94a3b8;font-size:10px;cursor:pointer;font-weight:700;'+(dev.isDesktop?'opacity:0.4;pointer-events:none;':'');
  rotBtn.onclick=function(){if(!dev.isDesktop){state.landscape=!state.landscape;renderSimTab();}};

  var refBtn=document.createElement('button');refBtn.textContent=t('refresh');refBtn.style='background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:5px 9px;color:#94a3b8;font-size:10px;cursor:pointer;font-weight:700;';
  refBtn.onclick=function(){var fr=document.getElementById('sim-iframe');if(fr){fr.srcdoc=getCode();}};

  var ssBtn=document.createElement('button');ssBtn.textContent=t('screenshot');ssBtn.style='background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.3);border-radius:6px;padding:5px 9px;color:#60a5fa;font-size:10px;cursor:pointer;font-weight:700;';
  ssBtn.onclick=function(){if(window.showToast)window.showToast('📸 '+(gl()==='fr'?'Utilisez Ctrl+Shift+S pour capturer':'Use Ctrl+Shift+S to capture the screen'));};

  ctrlBar.appendChild(rotBtn);ctrlBar.appendChild(refBtn);ctrlBar.appendChild(ssBtn);
  devBar.appendChild(ctrlBar);

  // Scale slider
  var scaleRow=document.createElement('div');scaleRow.style='display:flex;align-items:center;gap:7px;margin-top:4px;';
  var scLbl=document.createElement('span');scLbl.style='font-size:10px;color:#64748b;flex:1;';scLbl.textContent=t('scale')+': '+state.scale+'%';
  var scSlider=document.createElement('input');scSlider.type='range';scSlider.min='30';scSlider.max='100';scSlider.value=state.scale;scSlider.style='flex:2;accent-color:#3b82f6;';
  scSlider.oninput=function(){state.scale=parseInt(scSlider.value);scLbl.textContent=t('scale')+': '+state.scale+'%';var fw=document.getElementById('sim-frame-wrap');if(fw)fw.style.transform='scale('+state.scale/100+')';};
  scaleRow.appendChild(scLbl);scaleRow.appendChild(scSlider);
  devBar.appendChild(scaleRow);

  wrap.appendChild(devBar);

  // Frame viewport
  var viewport=document.createElement('div');viewport.style='flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:16px;background:linear-gradient(135deg,#0a0a0f,#05070a);';

  var fw=document.createElement('div');fw.id='sim-frame-wrap';fw.style='transition:transform 0.3s;transform-origin:top center;transform:scale('+state.scale/100+');';

  var actualW=state.landscape&&!dev.isDesktop?dev.h:dev.w;
  var actualH=state.landscape&&!dev.isDesktop?dev.w:dev.h;

  // Device shell
  var shell=document.createElement('div');
  shell.style='position:relative;background:'+dev.color+';border-radius:'+(dev.fr+dev.bezel)+'px;padding:'+dev.bezel+'px;box-shadow:0 0 0 1px rgba(255,255,255,0.08),0 20px 60px rgba(0,0,0,0.7),inset 0 0 0 1px rgba(255,255,255,0.03);width:'+(actualW+dev.bezel*2)+'px;';

  if(dev.isDesktop){
    // Laptop bar at top
    shell.style.borderRadius='10px 10px 0 0';
    var topBar=document.createElement('div');topBar.style='height:28px;background:#1a1a1a;border-radius:8px 8px 0 0;display:flex;align-items:center;padding:0 12px;gap:6px;margin-bottom:4px;';
    topBar.innerHTML='<span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block;"></span><span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;display:inline-block;"></span><span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;"></span><span style="flex:1;height:18px;background:rgba(255,255,255,0.06);border-radius:5px;margin:0 20px;"></span>';
    shell.appendChild(topBar);
  }

  // Notch
  if(dev.notch&&!dev.isDesktop&&!state.landscape){
    var notch=document.createElement('div');notch.style='position:absolute;top:'+dev.bezel+'px;left:50%;transform:translateX(-50%);width:120px;height:30px;background:'+dev.color+';border-radius:0 0 18px 18px;z-index:10;display:flex;align-items:center;justify-content:center;gap:8px;';
    notch.innerHTML='<span style="width:10px;height:10px;border-radius:50%;background:#1a1a1a;"></span><span style="width:60px;height:6px;border-radius:3px;background:#1a1a1a;"></span>';
    shell.appendChild(notch);
  }

  // Screen
  var screen=document.createElement('div');screen.style='border-radius:'+(dev.fr-2)+'px;overflow:hidden;background:#000;position:relative;width:'+actualW+'px;height:'+actualH+'px;';

  var iframe=document.createElement('iframe');iframe.id='sim-iframe';iframe.title='Device Preview';iframe.sandbox='allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-pointer-lock';
  iframe.style='width:'+actualW+'px;height:'+actualH+'px;border:none;display:block;background:#fff;';
  var code=getCode();
  if(code){iframe.srcdoc=code;}else{iframe.srcdoc='<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:#475569;font-family:Inter,sans-serif;font-size:14px;font-weight:700;">'+t('noCode')+'</div>';}

  screen.appendChild(iframe);shell.appendChild(screen);

  // Side buttons (mobile)
  if(!dev.isDesktop){
    var sideL=document.createElement('div');sideL.style='position:absolute;left:-4px;top:80px;width:4px;height:40px;background:rgba(255,255,255,0.1);border-radius:2px 0 0 2px;';
    var sideL2=document.createElement('div');sideL2.style='position:absolute;left:-4px;top:130px;width:4px;height:40px;background:rgba(255,255,255,0.1);border-radius:2px 0 0 2px;';
    var sideR=document.createElement('div');sideR.style='position:absolute;right:-4px;top:100px;width:4px;height:60px;background:rgba(255,255,255,0.1);border-radius:0 2px 2px 0;';
    shell.appendChild(sideL);shell.appendChild(sideL2);shell.appendChild(sideR);
  }

  fw.appendChild(shell);viewport.appendChild(fw);
  wrap.appendChild(viewport);

  // Device info bar
  var infoBar=document.createElement('div');infoBar.style='padding:6px 12px;border-top:1px solid rgba(255,255,255,0.05);flex-shrink:0;display:flex;align-items:center;gap:10px;';
  infoBar.innerHTML='<span style="font-size:9px;color:#475569;font-weight:700;">'+dev.name+'</span><span style="font-size:9px;color:#475569;">'+actualW+'×'+actualH+'px</span>';
  if(state.landscape)infoBar.innerHTML+='<span style="font-size:9px;background:rgba(59,130,246,0.15);color:#60a5fa;padding:1px 7px;border-radius:4px;font-weight:700;">LANDSCAPE</span>';
  wrap.appendChild(infoBar);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();var e=document.getElementById('lbl-tab-devsim');if(e)e.textContent=t('tab');if(window.activeTab==='devsim')renderSimTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){if(tab==='devsim'){window.activeTab='devsim';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-devsim');if(b)b.classList.add('active');renderSimTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
