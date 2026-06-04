/**
 * CSS Grid/Flexbox Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Layout',title:'📐 Grid/Flexbox Builder',sub:'Visual layout builder → export pure CSS',
      mode:'Mode:',grid:'Grid',flex:'Flexbox',
      cols:'Columns:',rows:'Rows:',gap:'Gap (px):',
      direction:'Direction:',wrap:'Wrap:',justify:'Justify:',align:'Align:',
      addCol:'+ Col',addRow:'+ Row',addCell:'+ Cell',removeCell:'- Cell',
      btnCopy:'📋 Copy CSS',btnInject:'💉 Inject',btnReset:'↺ Reset',
      copied:'📋 Copied!',injected:'✅ Injected!',
      preview:'Live Preview:',code:'Generated Code:'},
  fr:{tab:'Layout',title:'📐 Constructeur Grid/Flex',sub:'Constructeur visuel → export CSS pur',
      mode:'Mode :',grid:'Grille',flex:'Flexbox',
      cols:'Colonnes :',rows:'Rangées :',gap:'Espacement (px) :',
      direction:'Direction :',wrap:'Retour :',justify:'Justifier :',align:'Aligner :',
      addCol:'+ Col',addRow:'+ Rangée',addCell:'+ Cellule',removeCell:'- Cellule',
      btnCopy:'📋 Copier CSS',btnInject:'💉 Injecter',btnReset:'↺ Reset',
      copied:'📋 Copié !',injected:'✅ Injecté !',
      preview:'Aperçu Live :',code:'Code Généré :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={
  mode:'grid',
  grid:{cols:['1fr','1fr','1fr'],rows:['200px'],gap:16,cells:9},
  flex:{direction:'row',wrap:'wrap',justify:'flex-start',align:'stretch',gap:12,cells:6}
};

function genGridCSS(){
  var g=state.grid;
  return'.container {\n  display: grid;\n  grid-template-columns: '+g.cols.join(' ')+';\n  grid-template-rows: '+g.rows.join(' ')+';\n  gap: '+g.gap+'px;\n  width: 100%;\n}\n\n.item {\n  background: rgba(99,102,241,0.2);\n  border: 2px solid rgba(99,102,241,0.5);\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  color: #818cf8;\n}';
}

function genFlexCSS(){
  var f=state.flex;
  return'.container {\n  display: flex;\n  flex-direction: '+f.direction+';\n  flex-wrap: '+f.wrap+';\n  justify-content: '+f.justify+';\n  align-items: '+f.align+';\n  gap: '+f.gap+'px;\n  width: 100%;\n}\n\n.item {\n  background: rgba(16,185,129,0.15);\n  border: 2px solid rgba(16,185,129,0.4);\n  border-radius: 8px;\n  padding: 16px 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  color: #34d399;\n  flex: '+(f.wrap==='nowrap'?'1':'0 0 auto')+';\n}';
}

function genHTML(){
  var mode=state.mode;var cellCount=mode==='grid'?state.grid.cells:state.flex.cells;
  var css=mode==='grid'?genGridCSS():genFlexCSS();
  var items=Array.from({length:cellCount},function(_,i){return'  <div class="item">'+( i+1)+'</div>';}).join('\n');
  return'<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<style>\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #0f172a; font-family: Inter, sans-serif; padding: 20px; }\n'+css+'\n</style>\n</head>\n<body>\n<div class="container">\n'+items+'\n</div>\n</body>\n</html>';
}

function renderPreview(){
  var pv=document.getElementById('layout-preview');if(!pv)return;
  var mode=state.mode;
  if(mode==='grid'){
    var g=state.grid;
    pv.style.display='grid';
    pv.style.gridTemplateColumns=g.cols.join(' ');
    pv.style.gridTemplateRows='auto';
    pv.style.gap=g.gap+'px';
    pv.style.flexDirection='';pv.style.flexWrap='';pv.style.justifyContent='';pv.style.alignItems='';
    pv.innerHTML='';
    for(var i=0;i<g.cells;i++){
      var cell=document.createElement('div');
      cell.style='background:rgba(99,102,241,0.2);border:2px solid rgba(99,102,241,0.5);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#818cf8;min-height:32px;';
      cell.textContent=i+1;pv.appendChild(cell);
    }
  } else {
    var f=state.flex;
    pv.style.display='flex';
    pv.style.flexDirection=f.direction;
    pv.style.flexWrap=f.wrap;
    pv.style.justifyContent=f.justify;
    pv.style.alignItems=f.align;
    pv.style.gap=f.gap+'px';
    pv.style.gridTemplateColumns='';pv.style.gridTemplateRows='';
    pv.innerHTML='';
    for(var i=0;i<f.cells;i++){
      var cell=document.createElement('div');
      cell.style='background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.4);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#34d399;padding:8px 12px;';
      cell.textContent=i+1;pv.appendChild(cell);
    }
  }
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Mode toggle
  var modeLabel=document.createElement('div');modeLabel.style='font-size:10px;color:#64748b;font-weight:600;';modeLabel.textContent=t('mode');body.appendChild(modeLabel);
  var modeRow=document.createElement('div');modeRow.style='display:flex;gap:6px;';
  [['grid',t('grid'),'#6366f1'],['flex',t('flex'),'#10b981']].forEach(function(m){
    var btn=document.createElement('button');btn.textContent=m[1];var isA=state.mode===m[0];
    btn.style='flex:1;padding:9px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;border:1px solid '+(isA?m[2]:'rgba(255,255,255,0.08)')+';background:'+(isA?m[2]+'22':'rgba(255,255,255,0.02)')+';color:'+(isA?m[2]:'#64748b')+';';
    btn.onclick=function(){state.mode=m[0];renderTab();};modeRow.appendChild(btn);
  });
  body.appendChild(modeRow);

  var isGrid=state.mode==='grid';var color=isGrid?'#6366f1':'#10b981';

  // Preview
  var pvLabel=document.createElement('div');pvLabel.style='font-size:10px;color:#64748b;font-weight:600;';pvLabel.textContent=t('preview');body.appendChild(pvLabel);
  var preview=document.createElement('div');preview.id='layout-preview';
  preview.style='background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;min-height:80px;width:100%;box-sizing:border-box;';
  body.appendChild(preview);

  function mkSel(lk,opts,val,onChange){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(lk);
    var s=document.createElement('select');s.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:6px 7px;border-radius:6px;font-size:10px;cursor:pointer;outline:none;';
    opts.forEach(function(o){var op=document.createElement('option');op.value=o;op.textContent=o;op.selected=val===o;s.appendChild(op);});
    s.onchange=function(){onChange(this.value);};d.appendChild(l);d.appendChild(s);return d;
  }
  function mkNum(lk,val,min,max,onChange){
    var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:2px;';
    var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=t(lk)+' '+val;
    var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=val;s.style='width:100%;accent-color:'+color+';';
    s.oninput=function(){l.textContent=t(lk)+' '+this.value;onChange(parseInt(this.value));};
    d.appendChild(l);d.appendChild(s);return d;
  }

  if(isGrid){
    var g=state.grid;
    // Column controls
    var colLabel=document.createElement('div');colLabel.style='font-size:10px;color:#64748b;font-weight:600;';colLabel.textContent=t('cols');body.appendChild(colLabel);
    var colRow=document.createElement('div');colRow.style='display:flex;flex-wrap:wrap;gap:5px;align-items:center;';
    g.cols.forEach(function(c,i){
      var inp=document.createElement('input');inp.type='text';inp.value=c;
      inp.style='width:60px;background:#0f172a;color:#e2e8f0;border:1px solid rgba(99,102,241,0.25);padding:5px 7px;border-radius:6px;font-size:9px;text-align:center;outline:none;font-family:"JetBrains Mono",monospace;';
      inp.onchange=(function(idx){return function(){g.cols[idx]=this.value;renderPreview();var pre=document.getElementById('layout-pre');if(pre)pre.textContent=genGridCSS();};})(i);
      colRow.appendChild(inp);
    });
    var addColBtn=document.createElement('button');addColBtn.textContent=t('addCol');
    addColBtn.style='font-size:9px;padding:5px 9px;border-radius:6px;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.25);cursor:pointer;';
    addColBtn.onclick=function(){g.cols.push('1fr');renderTab();};
    var rmColBtn=document.createElement('button');rmColBtn.textContent='- Col';
    rmColBtn.style='font-size:9px;padding:5px 9px;border-radius:6px;background:rgba(239,68,68,0.08);color:#f87171;border:1px solid rgba(239,68,68,0.2);cursor:pointer;';
    rmColBtn.onclick=function(){if(g.cols.length>1){g.cols.pop();renderTab();}};
    colRow.appendChild(addColBtn);colRow.appendChild(rmColBtn);body.appendChild(colRow);
    // Gap + Cells
    var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
    r2.appendChild(mkNum('gap',g.gap,0,60,function(v){g.gap=v;renderPreview();}));
    var cellDiv=document.createElement('div');cellDiv.style='display:flex;flex-direction:column;gap:2px;';
    var cellLabel=document.createElement('div');cellLabel.style='font-size:9px;color:#64748b;font-weight:600;';cellLabel.textContent='Cells: '+g.cells;
    var cellRow2=document.createElement('div');cellRow2.style='display:flex;gap:4px;';
    var addCellBtn=document.createElement('button');addCellBtn.textContent=t('addCell');addCellBtn.style='flex:1;font-size:9px;padding:5px;border-radius:5px;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.2);cursor:pointer;';
    addCellBtn.onclick=function(){g.cells++;cellLabel.textContent='Cells: '+g.cells;renderPreview();};
    var rmCellBtn=document.createElement('button');rmCellBtn.textContent=t('removeCell');rmCellBtn.style='flex:1;font-size:9px;padding:5px;border-radius:5px;background:rgba(239,68,68,0.08);color:#f87171;border:1px solid rgba(239,68,68,0.2);cursor:pointer;';
    rmCellBtn.onclick=function(){if(g.cells>1){g.cells--;cellLabel.textContent='Cells: '+g.cells;renderPreview();}};
    cellRow2.appendChild(addCellBtn);cellRow2.appendChild(rmCellBtn);cellDiv.appendChild(cellLabel);cellDiv.appendChild(cellRow2);r2.appendChild(cellDiv);
    body.appendChild(r2);
  } else {
    var f=state.flex;
    var r1=document.createElement('div');r1.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
    r1.appendChild(mkSel('direction',['row','row-reverse','column','column-reverse'],f.direction,function(v){f.direction=v;renderPreview();}));
    r1.appendChild(mkSel('wrap',['wrap','nowrap','wrap-reverse'],f.wrap,function(v){f.wrap=v;renderPreview();}));
    body.appendChild(r1);
    var r2=document.createElement('div');r2.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
    r2.appendChild(mkSel('justify',['flex-start','flex-end','center','space-between','space-around','space-evenly'],f.justify,function(v){f.justify=v;renderPreview();}));
    r2.appendChild(mkSel('align',['stretch','flex-start','flex-end','center','baseline'],f.align,function(v){f.align=v;renderPreview();}));
    body.appendChild(r2);
    var r3=document.createElement('div');r3.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
    r3.appendChild(mkNum('gap',f.gap,0,60,function(v){f.gap=v;renderPreview();}));
    var cellDiv=document.createElement('div');cellDiv.style='display:flex;flex-direction:column;gap:2px;';
    var cellLabel=document.createElement('div');cellLabel.style='font-size:9px;color:#64748b;font-weight:600;';cellLabel.textContent='Cells: '+f.cells;
    var cellRowF=document.createElement('div');cellRowF.style='display:flex;gap:4px;';
    var aBtn=document.createElement('button');aBtn.textContent='+';aBtn.style='flex:1;font-size:12px;padding:4px;border-radius:5px;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.25);cursor:pointer;';
    aBtn.onclick=function(){f.cells++;cellLabel.textContent='Cells: '+f.cells;renderPreview();};
    var rBtn=document.createElement('button');rBtn.textContent='−';rBtn.style='flex:1;font-size:12px;padding:4px;border-radius:5px;background:rgba(239,68,68,0.08);color:#f87171;border:1px solid rgba(239,68,68,0.2);cursor:pointer;';
    rBtn.onclick=function(){if(f.cells>1){f.cells--;cellLabel.textContent='Cells: '+f.cells;renderPreview();}};
    cellRowF.appendChild(aBtn);cellRowF.appendChild(rBtn);cellDiv.appendChild(cellLabel);cellDiv.appendChild(cellRowF);r3.appendChild(cellDiv);body.appendChild(r3);
  }

  // Code output
  var codeLabel=document.createElement('div');codeLabel.style='font-size:10px;color:#64748b;font-weight:600;';codeLabel.textContent=t('code');body.appendChild(codeLabel);
  var pre=document.createElement('pre');pre.id='layout-pre';
  pre.style='background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px;font-size:8px;color:#c9d1d9;overflow:auto;max-height:120px;white-space:pre;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
  pre.textContent=isGrid?genGridCSS():genFlexCSS();body.appendChild(pre);

  // Actions
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='flex:1;background:'+color+'1a;color:'+color+';border:1px solid '+color+'44;padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){navigator.clipboard.writeText(isGrid?genGridCSS():genFlexCSS()).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');
  injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injBtn.onclick=function(){if(window.editor){window.editor.setValue(genHTML());if(window.runPreview)window.runPreview();if(window.showToast)window.showToast(t('injected'));}};
  var rstBtn=document.createElement('button');rstBtn.innerHTML=t('btnReset');
  rstBtn.style='background:rgba(255,255,255,0.04);color:#64748b;border:1px solid rgba(255,255,255,0.08);padding:9px 10px;border-radius:8px;font-size:10px;cursor:pointer;';
  rstBtn.onclick=function(){state={mode:state.mode,grid:{cols:['1fr','1fr','1fr'],rows:['200px'],gap:16,cells:9},flex:{direction:'row',wrap:'wrap',justify:'flex-start',align:'stretch',gap:12,cells:6}};renderTab();};
  actRow.appendChild(cpBtn);actRow.appendChild(injBtn);actRow.appendChild(rstBtn);body.appendChild(actRow);
  wrap.appendChild(body);parent.appendChild(wrap);
  setTimeout(renderPreview,50);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-layout');if(el)el.textContent=t('tab');if(window.activeTab==='layout')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='layout'){window.activeTab='layout';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-layout');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
