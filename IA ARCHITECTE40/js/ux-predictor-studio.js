
/* ============================================================
   🔮 PREDICTIVE UX HEATMAP STUDIO
   Tab ID: uxpredictor
   IA Architecte Studio — Premium Interactive Module
   ============================================================ */

(function () {
  'use strict';

  // ── Localisation ─────────────────────────────────────────────────────────────
  const T = {
    en: {
      title: '🔮 Predictive UX Heatmap Studio',
      subtitle: 'Sketch wireframes · Predict user attention · Export UX audits',
      palette_label: 'Element Palette',
      elem_image: '🖼️ Image',
      elem_text: '📝 Text Block',
      elem_button: '🔘 Button / CTA',
      elem_nav: '🔗 Nav Link',
      elem_form: '📋 Form',
      elem_card: '📦 Card',
      canvas_label: 'Wireframe Canvas',
      hint: 'Select a type above, then click & drag on the canvas to place elements.',
      btn_predict: '⚡ Predict Attention',
      btn_clear_heatmap: '🧹 Clear Heatmap',
      btn_clear_all: '🗑️ Clear All',
      btn_undo: '↩ Undo',
      btn_export: '📄 Export Report',
      btn_load: '🚀 Load Full Standalone App',
      ranked_title: '📊 Attention Rankings',
      insights_title: '💡 UX Insights',
      no_elements: 'Place some elements on the canvas first.',
      no_heatmap: 'Run "Predict Attention" to see rankings.',
      fold_line: 'Fold Line',
      attention_pct: '% attention',
      insight_below_fold: (name) => `"${name}" is below the fold — ~60% of users may never see it.`,
      insight_no_cta: 'No Button/CTA found above the fold. Consider moving your primary action higher.',
      insight_cta_ok: 'Great! Your primary CTA is visible above the fold.',
      insight_nav_top: 'Navigation is at the top — users will find it easily.',
      insight_no_nav: 'No navigation element detected. Add a nav bar for better orientation.',
      insight_form_low: (name) => `Form "${name}" has low predicted attention. Try adding a nearby heading or CTA.`,
      insight_image_high: (name) => `Image "${name}" grabs strong attention — ensure it conveys your message.`,
      insight_isolation: 'Some elements benefit from whitespace isolation (+15% boost applied).',
      insight_fold_ok: 'Good content density above the fold.',
      rank_label: (i) => `#${i + 1}`,
      toast_init: '✅ UX Heatmap Studio initialized.',
      toast_predict: '🔮 Heatmap generated!',
      toast_cleared: '🧹 Canvas cleared.',
      toast_exported: '📄 UX report loaded into editor.',
      pattern_f: 'F-Pattern',
      pattern_z: 'Z-Pattern',
      pattern_thirds: 'Rule of Thirds',
      delete_elem: '✕',
      selected_type: 'Selected:',
      layer_panel: 'Layers',
      export_html_title: 'UX Audit Report',
    },
    fr: {
      title: '🔮 Studio de Heatmap UX Prédictive',
      subtitle: 'Esquissez des wireframes · Prédisez l\'attention · Exportez vos audits UX',
      palette_label: 'Palette d\'éléments',
      elem_image: '🖼️ Image',
      elem_text: '📝 Bloc de Texte',
      elem_button: '🔘 Bouton / CTA',
      elem_nav: '🔗 Lien Nav',
      elem_form: '📋 Formulaire',
      elem_card: '📦 Carte',
      canvas_label: 'Canevas Wireframe',
      hint: 'Sélectionnez un type ci-dessus, puis cliquez et faites glisser sur le canevas.',
      btn_predict: '⚡ Prédire l\'Attention',
      btn_clear_heatmap: '🧹 Effacer la Heatmap',
      btn_clear_all: '🗑️ Tout Effacer',
      btn_undo: '↩ Annuler',
      btn_export: '📄 Exporter le Rapport',
      btn_load: '🚀 Charger l\'App Complète',
      ranked_title: '📊 Classement Attention',
      insights_title: '💡 Insights UX',
      no_elements: 'Placez d\'abord des éléments sur le canevas.',
      no_heatmap: 'Lancez "Prédire l\'Attention" pour voir le classement.',
      fold_line: 'Ligne de Pli',
      attention_pct: '% attention',
      insight_below_fold: (name) => `"${name}" est sous le pli — ~60% des utilisateurs ne le verront pas.`,
      insight_no_cta: 'Aucun bouton/CTA au-dessus du pli. Déplacez votre action principale plus haut.',
      insight_cta_ok: 'Excellent ! Votre CTA principal est visible au-dessus du pli.',
      insight_nav_top: 'La navigation est en haut — les utilisateurs la trouveront facilement.',
      insight_no_nav: 'Aucun élément de navigation détecté. Ajoutez une barre de navigation.',
      insight_form_low: (name) => `Le formulaire "${name}" attire peu l\'attention. Ajoutez un titre ou un CTA à proximité.`,
      insight_image_high: (name) => `L\'image "${name}" capte fortement l\'attention — assurez-vous qu\'elle transmet votre message.`,
      insight_isolation: 'Certains éléments bénéficient de l\'isolation par espace blanc (+15% appliqué).',
      insight_fold_ok: 'Bonne densité de contenu au-dessus du pli.',
      rank_label: (i) => `#${i + 1}`,
      toast_init: '✅ Studio Heatmap UX initialisé.',
      toast_predict: '🔮 Heatmap générée !',
      toast_cleared: '🧹 Canevas effacé.',
      toast_exported: '📄 Rapport UX chargé dans l\'éditeur.',
      pattern_f: 'Modèle en F',
      pattern_z: 'Modèle en Z',
      pattern_thirds: 'Règle des Tiers',
      delete_elem: '✕',
      selected_type: 'Sélectionné :',
      layer_panel: 'Calques',
      export_html_title: 'Rapport d\'Audit UX',
    }
  };

  function lang() { return (window.appLang === 'fr') ? 'fr' : 'en'; }
  function t(key, ...args) {
    const val = T[lang()][key];
    if (typeof val === 'function') return val(...args);
    return val || key;
  }

  // ── Element Type Definitions ──────────────────────────────────────────────────
  const ELEMENT_TYPES = {
    image:  { key: 'image',  icon: '🖼️',  labelKey: 'elem_image',  color: '#6366f1', attentionBoost: 0.40, minW: 80,  minH: 60  },
    text:   { key: 'text',   icon: '📝',  labelKey: 'elem_text',   color: '#22d3ee', attentionBoost: 0.25, minW: 60,  minH: 30  },
    button: { key: 'button', icon: '🔘',  labelKey: 'elem_button', color: '#f59e0b', attentionBoost: 0.35, minW: 60,  minH: 30  },
    nav:    { key: 'nav',    icon: '🔗',  labelKey: 'elem_nav',    color: '#34d399', attentionBoost: 0.20, minW: 100, minH: 24  },
    form:   { key: 'form',   icon: '📋',  labelKey: 'elem_form',   color: '#f87171', attentionBoost: 0.20, minW: 80,  minH: 80  },
    card:   { key: 'card',   icon: '📦',  labelKey: 'elem_card',   color: '#a78bfa', attentionBoost: 0.15, minW: 80,  minH: 80  },
  };

  // ── State ─────────────────────────────────────────────────────────────────────
  let elements       = [];   // { id, type, x, y, w, h, label, score }
  let selectedType   = 'button';
  let heatmapGenerated = false;
  let history        = [];   // undo stack
  let idCounter      = 0;
  let dragState      = null; // { startX, startY, currentX, currentY, creating }
  let dragMoveState  = null; // { elemId, offsetX, offsetY }
  let resizeState    = null; // { elemId, startX, startY, startW, startH }
  let hoveredElem    = null;
  let selectedElem   = null; // for move/resize

  // ── Canvas Constants ──────────────────────────────────────────────────────────
  const CANVAS_W  = 720;
  const CANVAS_H  = 540;
  const FOLD_Y    = 360; // 2/3 of canvas height = "above the fold"

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  let canvasWire, ctxWire;
  let canvasHeat, ctxHeat;
  let rankList, insightList;
  let selectedTypeLabel;

  // ── Standalone Template ───────────────────────────────────────────────────────
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🔮 Predictive UX Heatmap Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#020617;color:#e2e8f0;min-height:100vh;padding:24px}
h1{font-size:1.8rem;font-weight:900;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
.subtitle{color:#64748b;font-size:.85rem;margin-bottom:24px}
.layout{display:grid;grid-template-columns:180px 1fr 260px;gap:16px}
.panel{background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px}
.panel h3{font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed;margin-bottom:12px}
.palette-btn{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;margin-bottom:6px;background:#1e293b;border:2px solid transparent;border-radius:8px;color:#e2e8f0;font-family:inherit;font-size:.82rem;cursor:pointer;transition:.15s}
.palette-btn:hover{background:#263350;border-color:#7c3aed}
.palette-btn.active{background:#1e0a3c;border-color:#7c3aed;color:#a78bfa}
.canvas-wrap{position:relative;width:720px;height:540px}
canvas{position:absolute;top:0;left:0;border-radius:8px}
#wire-canvas{background:#0a1628;border:1px solid #1e293b;cursor:crosshair}
#heat-canvas{pointer-events:none;opacity:.7}
.controls{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.btn{padding:8px 14px;border:none;border-radius:8px;font-family:inherit;font-size:.8rem;font-weight:600;cursor:pointer;transition:.15s}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff}
.btn-primary:hover{opacity:.85}
.btn-secondary{background:#1e293b;color:#94a3b8;border:1px solid #334155}
.btn-secondary:hover{background:#263350;color:#e2e8f0}
.btn-danger{background:#1e293b;color:#f87171;border:1px solid #7f1d1d}
.btn-danger:hover{background:#450a0a}
.fold-legend{display:flex;align-items:center;gap:6px;font-size:.72rem;color:#64748b;margin-top:8px}
.fold-dot{width:24px;height:2px;background:repeating-linear-gradient(90deg,#f59e0b 0,#f59e0b 4px,transparent 4px,transparent 8px)}
.rank-item{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#0a1628;border-radius:8px;margin-bottom:6px;border-left:3px solid #7c3aed}
.rank-num{font-size:.7rem;font-weight:800;color:#7c3aed;min-width:24px}
.rank-name{font-size:.78rem;color:#e2e8f0;flex:1}
.rank-pct{font-size:.78rem;font-weight:700}
.insight-item{padding:8px 10px;background:#0a1628;border-radius:8px;margin-bottom:6px;font-size:.76rem;line-height:1.5;border-left:3px solid #06b6d4;color:#94a3b8}
.insight-item.warn{border-color:#f59e0b;color:#fbbf24}
.insight-item.good{border-color:#34d399;color:#6ee7b7}
.hint{color:#475569;font-size:.72rem;margin-top:8px;line-height:1.5}
.selected-label{font-size:.75rem;color:#a78bfa;margin-top:6px}
@media(max-width:1100px){.layout{grid-template-columns:1fr}}
</style>
</head>
<body>
<h1>🔮 Predictive UX Heatmap Studio</h1>
<p class="subtitle">Sketch wireframes · Predict user attention · Export UX audits</p>
<div class="layout">
  <div class="panel" id="palette-panel">
    <h3 id="palette-label">Element Palette</h3>
    <button class="palette-btn" data-type="image">🖼️ Image</button>
    <button class="palette-btn" data-type="text">📝 Text Block</button>
    <button class="palette-btn active" data-type="button">🔘 Button / CTA</button>
    <button class="palette-btn" data-type="nav">🔗 Nav Link</button>
    <button class="palette-btn" data-type="form">📋 Form</button>
    <button class="palette-btn" data-type="card">📦 Card</button>
    <p class="selected-label" id="sel-label">Selected: Button / CTA</p>
  </div>
  <div>
    <div class="panel" style="padding-bottom:8px">
      <h3 id="canvas-label">Wireframe Canvas</h3>
      <div class="canvas-wrap">
        <canvas id="wire-canvas" width="720" height="540"></canvas>
        <canvas id="heat-canvas" width="720" height="540"></canvas>
      </div>
      <div class="fold-legend"><div class="fold-dot"></div><span id="fold-lbl">Fold Line (viewport boundary)</span></div>
      <p class="hint" id="hint-text">Select a type above, then click &amp; drag on the canvas to place elements.</p>
      <div class="controls">
        <button class="btn btn-primary" id="predict-btn">⚡ Predict Attention</button>
        <button class="btn btn-secondary" id="clear-heat-btn">🧹 Clear Heatmap</button>
        <button class="btn btn-secondary" id="undo-btn">↩ Undo</button>
        <button class="btn btn-danger" id="clear-all-btn">🗑️ Clear All</button>
        <button class="btn btn-primary" id="export-btn" style="background:linear-gradient(135deg,#0891b2,#0e7490)">📄 Export Report</button>
      </div>
    </div>
  </div>
  <div>
    <div class="panel" style="margin-bottom:16px">
      <h3 id="ranked-title">📊 Attention Rankings</h3>
      <div id="rank-list"><p style="color:#475569;font-size:.76rem">Place some elements on the canvas first.</p></div>
    </div>
    <div class="panel">
      <h3 id="insights-title">💡 UX Insights</h3>
      <div id="insight-list"><p style="color:#475569;font-size:.76rem">Run "Predict Attention" to see insights.</p></div>
    </div>
  </div>
</div>
<${'script'}>
(function(){
'use strict';
const CANVAS_W=720,CANVAS_H=540,FOLD_Y=360;
const ELEM_TYPES={
  image:{key:'image',icon:'🖼️',label:'Image',color:'#6366f1',boost:0.40,minW:80,minH:60},
  text:{key:'text',icon:'📝',label:'Text Block',color:'#22d3ee',boost:0.25,minW:60,minH:30},
  button:{key:'button',icon:'🔘',label:'Button/CTA',color:'#f59e0b',boost:0.35,minW:60,minH:30},
  nav:{key:'nav',icon:'🔗',label:'Nav Link',color:'#34d399',boost:0.20,minW:100,minH:24},
  form:{key:'form',icon:'📋',label:'Form',color:'#f87171',boost:0.20,minW:80,minH:80},
  card:{key:'card',icon:'📦',label:'Card',color:'#a78bfa',boost:0.15,minW:80,minH:80}
};
let elements=[],selectedType='button',heatGenerated=false,history=[],idCtr=0;
let dragState=null,hoveredElem=null;
const wireCanvas=document.getElementById('wire-canvas');
const heatCanvas=document.getElementById('heat-canvas');
const ctxW=wireCanvas.getContext('2d');
const ctxH=heatCanvas.getContext('2d');
const rankList=document.getElementById('rank-list');
const insightList=document.getElementById('insight-list');
const selLabel=document.getElementById('sel-label');

document.querySelectorAll('.palette-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.palette-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    selectedType=btn.dataset.type;
    selLabel.textContent='Selected: '+ELEM_TYPES[selectedType].label;
  });
});

function getId(){return++idCtr;}
function snapRect(x1,y1,x2,y2,type){
  const def=ELEM_TYPES[type];
  let x=Math.min(x1,x2),y=Math.min(y1,y2),w=Math.abs(x2-x1),h=Math.abs(y2-y1);
  w=Math.max(w,def.minW);h=Math.max(h,def.minH);
  x=Math.max(0,Math.min(x,CANVAS_W-w));y=Math.max(0,Math.min(y,CANVAS_H-h));
  return{x,y,w,h};
}
function getCanvasPos(e){
  const r=wireCanvas.getBoundingClientRect();
  return{x:e.clientX-r.left,y:e.clientY-r.top};
}
function elemAt(x,y){
  for(let i=elements.length-1;i>=0;i--){
    const el=elements[i];
    if(x>=el.x&&x<=el.x+el.w&&y>=el.y&&y<=el.y+el.h)return el;
  }
  return null;
}

wireCanvas.addEventListener('mousedown',e=>{
  const pos=getCanvasPos(e);
  dragState={startX:pos.x,startY:pos.y,currentX:pos.x,currentY:pos.y};
});
wireCanvas.addEventListener('mousemove',e=>{
  const pos=getCanvasPos(e);
  hoveredElem=elemAt(pos.x,pos.y);
  if(dragState){dragState.currentX=pos.x;dragState.currentY=pos.y;}
  drawWire();
});
wireCanvas.addEventListener('mouseup',e=>{
  if(!dragState)return;
  const pos=getCanvasPos(e);
  const dx=Math.abs(pos.x-dragState.startX),dy=Math.abs(pos.y-dragState.startY);
  if(dx>8||dy>8){
    history.push(JSON.parse(JSON.stringify(elements)));
    const r=snapRect(dragState.startX,dragState.startY,pos.x,pos.y,selectedType);
    const def=ELEM_TYPES[selectedType];
    const count=elements.filter(el=>el.type===selectedType).length+1;
    elements.push({id:getId(),type:selectedType,icon:def.icon,label:def.label+' '+count,color:def.color,...r,score:0});
    heatGenerated=false;
    ctxH.clearRect(0,0,CANVAS_W,CANVAS_H);
    updateSidebar();
  }
  dragState=null;
  drawWire();
});
wireCanvas.addEventListener('mouseleave',()=>{dragState=null;hoveredElem=null;drawWire();});

function computeScore(el){
  const def=ELEM_TYPES[el.type];
  let score=0.5;
  // F-pattern: horizontal scan lines
  const relY=el.y/CANVAS_H;
  const relX=el.x/CANVAS_W;
  score+=Math.max(0,(1-relY*1.5))*0.30;
  score+=Math.max(0,(1-relX))*0.15;
  // element type boost
  score+=def.boost;
  // above-fold boost
  const centerY=el.y+el.h/2;
  if(centerY<FOLD_Y)score+=0.50;
  // top-left boost
  if(el.x<CANVAS_W*0.33&&el.y<CANVAS_H*0.33)score+=0.30;
  else if(el.x<CANVAS_W*0.66&&el.y<CANVAS_H*0.5)score+=0.20;
  // rule of thirds
  const thirds=[CANVAS_W/3,CANVAS_W*2/3];
  const thirdsY=[CANVAS_H/3,CANVAS_H*2/3];
  for(const tx of thirds)for(const ty of thirdsY){
    if(Math.abs((el.x+el.w/2)-tx)<40&&Math.abs((el.y+el.h/2)-ty)<40)score+=0.12;
  }
  // size boost (large elements)
  const area=(el.w*el.h)/(CANVAS_W*CANVAS_H);
  score+=area*0.5;
  // isolation boost
  let isolated=true;
  for(const other of elements){
    if(other.id===el.id)continue;
    const gap=30;
    if(el.x-gap<other.x+other.w&&el.x+el.w+gap>other.x&&el.y-gap<other.y+other.h&&el.y+el.h+gap>other.y){isolated=false;break;}
  }
  if(isolated)score+=0.15;
  // Z-pattern: if few elements, boost corners
  if(elements.length<=4){
    if((relX<0.2&&relY<0.2)||(relX>0.8&&relY<0.2)||(relX<0.2&&relY>0.8)||(relX>0.8&&relY>0.8))score+=0.10;
  }
  return Math.min(1,score);
}

function scoreColor(s){
  if(s>0.70)return'#ef4444';
  if(s>0.45)return'#f59e0b';
  return'#3b82f6';
}

function drawHeatmap(){
  ctxH.clearRect(0,0,CANVAS_W,CANVAS_H);
  if(!heatGenerated||elements.length===0)return;
  for(const el of elements){
    const cx=el.x+el.w/2,cy=el.y+el.h/2;
    const radius=Math.max(el.w,el.h)*1.1;
    const grad=ctxH.createRadialGradient(cx,cy,0,cx,cy,radius);
    const s=el.score;
    let r,g,b;
    if(s>0.70){r=239;g=Math.floor((1-s)*2*255);b=0;}
    else if(s>0.45){r=245;g=158;b=11;}
    else{r=59;g=130;b=246;}
    grad.addColorStop(0,\`rgba(\${r},\${g},\${b},0.75)\`);
    grad.addColorStop(0.5,\`rgba(\${r},\${g},\${b},0.35)\`);
    grad.addColorStop(1,\`rgba(\${r},\${g},\${b},0)\`);
    ctxH.fillStyle=grad;
    ctxH.beginPath();
    ctxH.ellipse(cx,cy,radius,radius*0.75,0,0,Math.PI*2);
    ctxH.fill();
  }
}

function drawWire(){
  ctxW.clearRect(0,0,CANVAS_W,CANVAS_H);
  // grid
  ctxW.strokeStyle='#0d1f3c';ctxW.lineWidth=1;
  for(let x=0;x<=CANVAS_W;x+=40){ctxW.beginPath();ctxW.moveTo(x,0);ctxW.lineTo(x,CANVAS_H);ctxW.stroke();}
  for(let y=0;y<=CANVAS_H;y+=40){ctxW.beginPath();ctxW.moveTo(0,y);ctxW.lineTo(CANVAS_W,y);ctxW.stroke();}
  // fold line
  ctxW.setLineDash([8,6]);ctxW.strokeStyle='#f59e0b';ctxW.lineWidth=1.5;
  ctxW.beginPath();ctxW.moveTo(0,FOLD_Y);ctxW.lineTo(CANVAS_W,FOLD_Y);ctxW.stroke();
  ctxW.setLineDash([]);
  ctxW.fillStyle='#f59e0b';ctxW.font='11px Inter,sans-serif';
  ctxW.fillText('▶ Fold Line',6,FOLD_Y-5);
  // elements
  for(const el of elements){
    const isHov=hoveredElem&&hoveredElem.id===el.id;
    ctxW.strokeStyle=el.color;ctxW.lineWidth=isHov?2.5:1.5;
    ctxW.fillStyle=el.color+'22';
    ctxW.beginPath();ctxW.roundRect(el.x,el.y,el.w,el.h,6);
    ctxW.fill();ctxW.stroke();
    if(heatGenerated){
      const s=el.score;
      const pct=Math.round(s*100);
      ctxW.fillStyle=scoreColor(s);ctxW.font='bold 11px Inter,sans-serif';
      ctxW.fillText(pct+'%',el.x+4,el.y+14);
    }
    ctxW.fillStyle=el.color;ctxW.font='12px Inter,sans-serif';
    const maxW=el.w-8;
    let lbl=el.icon+' '+el.label;
    if(ctxW.measureText(lbl).width>maxW)lbl=el.icon;
    ctxW.fillText(lbl,el.x+4,el.y+el.h/2+5);
  }
  // drag preview
  if(dragState){
    const dx=Math.abs(dragState.currentX-dragState.startX),dy=Math.abs(dragState.currentY-dragState.startY);
    if(dx>4||dy>4){
      const r=snapRect(dragState.startX,dragState.startY,dragState.currentX,dragState.currentY,selectedType);
      const def=ELEM_TYPES[selectedType];
      ctxW.strokeStyle=def.color;ctxW.lineWidth=2;ctxW.setLineDash([6,4]);
      ctxW.strokeRect(r.x,r.y,r.w,r.h);ctxW.setLineDash([]);
      ctxW.fillStyle=def.color+'33';ctxW.fillRect(r.x,r.y,r.w,r.h);
    }
  }
  drawHeatmap();
}

function updateSidebar(){
  if(elements.length===0){rankList.innerHTML='<p style="color:#475569;font-size:.76rem">Place some elements on the canvas first.</p>';insightList.innerHTML='<p style="color:#475569;font-size:.76rem">Run \\"Predict Attention\\" to see insights.</p>';return;}
  if(!heatGenerated){rankList.innerHTML='<p style="color:#475569;font-size:.76rem">Run \\"Predict Attention\\" to see rankings.</p>';insightList.innerHTML='<p style="color:#475569;font-size:.76rem">Run \\"Predict Attention\\" to see insights.</p>';return;}
  const sorted=[...elements].sort((a,b)=>b.score-a.score);
  rankList.innerHTML=sorted.map((el,i)=>{
    const pct=Math.round(el.score*100);
    const c=scoreColor(el.score);
    return\`<div class="rank-item" style="border-color:\${c}"><span class="rank-num" style="color:\${c}">#\${i+1}</span><span class="rank-name">\${el.icon} \${el.label}</span><span class="rank-pct" style="color:\${c}">\${pct}% attention</span></div>\`;
  }).join('');
  const insights=[];
  const ctaAbove=elements.find(el=>el.type==='button'&&el.y+el.h/2<FOLD_Y);
  const ctaBelow=elements.find(el=>el.type==='button'&&el.y+el.h/2>=FOLD_Y);
  if(ctaAbove)insights.push({cls:'good',text:'✅ Great! Your primary CTA is visible above the fold.'});
  if(ctaBelow)insights.push({cls:'warn',text:\`⚠️ "\${ctaBelow.label}" is below the fold — ~60% of users may never see it.\`});
  if(!elements.find(el=>el.type==='button'))insights.push({cls:'warn',text:'⚠️ No Button/CTA found above the fold. Consider moving your primary action higher.'});
  const nav=elements.find(el=>el.type==='nav');
  if(nav&&nav.y<60)insights.push({cls:'good',text:'✅ Navigation is at the top — users will find it easily.'});
  else if(!nav)insights.push({cls:'',text:'ℹ️ No navigation element detected. Add a nav bar for better orientation.'});
  const lowForm=elements.find(el=>el.type==='form'&&el.score<0.5);
  if(lowForm)insights.push({cls:'warn',text:\`⚠️ Form "\${lowForm.label}" has low predicted attention. Try adding a nearby heading or CTA.\`});
  const highImg=elements.find(el=>el.type==='image'&&el.score>0.70);
  if(highImg)insights.push({cls:'good',text:\`✅ Image "\${highImg.label}" grabs strong attention — ensure it conveys your message.\`});
  const hasIsolated=elements.some(el=>{let iso=true;for(const o of elements){if(o.id===el.id)continue;if(el.x-30<o.x+o.w&&el.x+el.w+30>o.x&&el.y-30<o.y+o.h&&el.y+el.h+30>o.y){iso=false;break;}}return iso;});
  if(hasIsolated)insights.push({cls:'',text:'ℹ️ Some elements benefit from whitespace isolation (+15% boost applied).'});
  const aboveFold=elements.filter(el=>el.y+el.h/2<FOLD_Y).length;
  if(aboveFold>=2&&aboveFold<=5)insights.push({cls:'good',text:'✅ Good content density above the fold.'});
  insightList.innerHTML=insights.length===0?'<p style="color:#475569;font-size:.76rem">No specific insights.</p>':insights.map(ins=>\`<div class="insight-item \${ins.cls}">\${ins.text}</div>\`).join('');
}

document.getElementById('predict-btn').addEventListener('click',()=>{
  if(elements.length===0)return;
  elements.forEach(el=>{el.score=computeScore(el);});
  heatGenerated=true;
  drawWire();
  updateSidebar();
});
document.getElementById('clear-heat-btn').addEventListener('click',()=>{heatGenerated=false;ctxH.clearRect(0,0,CANVAS_W,CANVAS_H);drawWire();updateSidebar();});
document.getElementById('undo-btn').addEventListener('click',()=>{if(history.length>0){elements=history.pop();heatGenerated=false;ctxH.clearRect(0,0,CANVAS_W,CANVAS_H);drawWire();updateSidebar();}});
document.getElementById('clear-all-btn').addEventListener('click',()=>{history.push(JSON.parse(JSON.stringify(elements)));elements=[];heatGenerated=false;ctxH.clearRect(0,0,CANVAS_W,CANVAS_H);drawWire();updateSidebar();});
document.getElementById('export-btn').addEventListener('click',()=>{
  if(elements.length===0){alert('Add elements first!');return;}
  const sorted=[...elements].sort((a,b)=>b.score-a.score);
  const rows=sorted.map((el,i)=>\`<tr><td>#\${i+1}</td><td>\${el.icon} \${el.label}</td><td>\${el.type}</td><td>\${heatGenerated?Math.round(el.score*100)+'%':'N/A'}</td><td>\${el.y+el.h/2<FOLD_Y?'Above':'Below'}</td></tr>\`).join('');
  const html=\`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>UX Audit Report</title><style>body{font-family:sans-serif;padding:32px;background:#fff;color:#111}h1{color:#7c3aed}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{padding:10px 12px;border:1px solid #e5e7eb;text-align:left}th{background:#f3f4f6}tr:nth-child(even){background:#fafafa}</style></head><body><h1>🔮 UX Audit Report</h1><p>Generated: \${new Date().toLocaleString()}</p><h2>Elements (\${elements.length})</h2><table><tr><th>Rank</th><th>Element</th><th>Type</th><th>Attention</th><th>Position</th></tr>\${rows}</table></body></html>\`;
  const w=window.open('','_blank');w.document.write(html);w.document.close();
});
drawWire();updateSidebar();
})();
</${'script'}>
</body>
</html>`;

  // ── Attention Score Calculator ────────────────────────────────────────────────
  function computeAttentionScore(el) {
    const def = ELEMENT_TYPES[el.type];
    let score = 0.50; // base

    const relY = el.y / CANVAS_H;
    const relX = el.x / CANVAS_W;
    const centerX = el.x + el.w / 2;
    const centerY = el.y + el.h / 2;

    // ── F-Pattern: attention decays as you go right and down
    score += Math.max(0, (1 - relY * 1.5)) * 0.30;  // vertical decay
    score += Math.max(0, (1 - relX))        * 0.15;  // horizontal decay

    // ── Element type boost
    score += def.attentionBoost;

    // ── Above-the-fold boost (+50%)
    if (centerY < FOLD_Y) {
      score += 0.50;
    }

    // ── Top-left boost (+30% / +20%)
    if (el.x < CANVAS_W * 0.33 && el.y < CANVAS_H * 0.33) {
      score += 0.30;
    } else if (centerX < CANVAS_W * 0.66 && centerY < CANVAS_H * 0.5) {
      score += 0.20;
    }

    // ── Rule of Thirds: intersection points
    const thirdsX = [CANVAS_W / 3, (CANVAS_W * 2) / 3];
    const thirdsY = [CANVAS_H / 3, (CANVAS_H * 2) / 3];
    for (const tx of thirdsX) {
      for (const ty of thirdsY) {
        if (Math.abs(centerX - tx) < 45 && Math.abs(centerY - ty) < 45) {
          score += 0.12;
        }
      }
    }

    // ── Size boost: larger elements attract more attention
    const area = (el.w * el.h) / (CANVAS_W * CANVAS_H);
    score += area * 0.50;

    // ── Isolation effect: whitespace around element (+15%)
    let isolated = true;
    for (const other of elements) {
      if (other.id === el.id) continue;
      const gap = 32;
      if (
        el.x - gap < other.x + other.w &&
        el.x + el.w + gap > other.x &&
        el.y - gap < other.y + other.h &&
        el.y + el.h + gap > other.y
      ) {
        isolated = false;
        break;
      }
    }
    if (isolated) score += 0.15;

    // ── Z-Pattern: if few elements, boost diagonal corners
    if (elements.length <= 4) {
      if (
        (relX < 0.2 && relY < 0.2) ||
        (relX > 0.8 && relY < 0.2) ||
        (relX < 0.2 && relY > 0.8) ||
        (relX > 0.8 && relY > 0.8)
      ) {
        score += 0.10;
      }
    }

    return Math.min(1.0, Math.max(0.0, score));
  }

  // ── Score → color ─────────────────────────────────────────────────────────────
  function scoreToRGB(s) {
    if (s > 0.70) return { r: 239, g: Math.floor((1 - s) * 2 * 200), b: 0 };
    if (s > 0.45) return { r: 245, g: 158, b: 11 };
    return { r: 59, g: 130, b: 246 };
  }
  function scoreToHex(s) {
    const c = scoreToRGB(s);
    return `rgb(${c.r},${c.g},${c.b})`;
  }

  // ── Draw Wireframe ────────────────────────────────────────────────────────────
  function drawWireframe() {
    if (!ctxWire) return;
    ctxWire.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    ctxWire.fillStyle = '#0a1628';
    ctxWire.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Grid
    ctxWire.strokeStyle = '#0d2240';
    ctxWire.lineWidth = 1;
    for (let x = 0; x <= CANVAS_W; x += 40) {
      ctxWire.beginPath(); ctxWire.moveTo(x, 0); ctxWire.lineTo(x, CANVAS_H); ctxWire.stroke();
    }
    for (let y = 0; y <= CANVAS_H; y += 40) {
      ctxWire.beginPath(); ctxWire.moveTo(0, y); ctxWire.lineTo(CANVAS_W, y); ctxWire.stroke();
    }

    // Fold line
    ctxWire.save();
    ctxWire.setLineDash([8, 6]);
    ctxWire.strokeStyle = '#f59e0b';
    ctxWire.lineWidth = 1.5;
    ctxWire.beginPath(); ctxWire.moveTo(0, FOLD_Y); ctxWire.lineTo(CANVAS_W, FOLD_Y); ctxWire.stroke();
    ctxWire.setLineDash([]);
    ctxWire.restore();

    // Fold label
    ctxWire.fillStyle = '#f59e0bb0';
    ctxWire.font = '11px Inter, sans-serif';
    ctxWire.fillText('▶ ' + t('fold_line'), 6, FOLD_Y - 5);

    // Rule of thirds guides (subtle)
    ctxWire.save();
    ctxWire.strokeStyle = '#1e3a5f55';
    ctxWire.lineWidth = 1;
    ctxWire.setLineDash([3, 6]);
    [CANVAS_W / 3, (CANVAS_W * 2) / 3].forEach(x => {
      ctxWire.beginPath(); ctxWire.moveTo(x, 0); ctxWire.lineTo(x, CANVAS_H); ctxWire.stroke();
    });
    [CANVAS_H / 3, (CANVAS_H * 2) / 3].forEach(y => {
      ctxWire.beginPath(); ctxWire.moveTo(0, y); ctxWire.lineTo(CANVAS_W, y); ctxWire.stroke();
    });
    ctxWire.setLineDash([]);
    ctxWire.restore();

    // Elements
    for (const el of elements) {
      const def = ELEMENT_TYPES[el.type];
      const isHovered = hoveredElem && hoveredElem.id === el.id;
      const isSelected = selectedElem && selectedElem.id === el.id;

      // Shadow glow
      if (isHovered || isSelected) {
        ctxWire.save();
        ctxWire.shadowColor = def.color;
        ctxWire.shadowBlur = 12;
      }

      // Fill
      ctxWire.fillStyle = def.color + '22';
      ctxWire.beginPath();
      ctxWire.roundRect(el.x, el.y, el.w, el.h, 6);
      ctxWire.fill();

      // Border
      ctxWire.strokeStyle = def.color;
      ctxWire.lineWidth = isSelected ? 2.5 : isHovered ? 2 : 1.5;
      ctxWire.beginPath();
      ctxWire.roundRect(el.x, el.y, el.w, el.h, 6);
      ctxWire.stroke();

      if (isHovered || isSelected) ctxWire.restore();

      // Score overlay
      if (heatmapGenerated && el.score !== undefined) {
        const pct = Math.round(el.score * 100);
        ctxWire.fillStyle = scoreToHex(el.score);
        ctxWire.font = 'bold 11px Inter, sans-serif';
        ctxWire.fillText(pct + '%', el.x + 5, el.y + 15);
      }

      // Label
      ctxWire.fillStyle = def.color;
      ctxWire.font = '12px Inter, sans-serif';
      const maxLabelW = el.w - 10;
      let lbl = def.icon + ' ' + el.label;
      if (ctxWire.measureText(lbl).width > maxLabelW) {
        lbl = def.icon;
      }
      ctxWire.fillText(lbl, el.x + 5, el.y + el.h / 2 + 5);

      // Delete handle on hover
      if (isHovered) {
        ctxWire.fillStyle = '#ef4444dd';
        ctxWire.fillRect(el.x + el.w - 16, el.y, 16, 16);
        ctxWire.fillStyle = '#fff';
        ctxWire.font = 'bold 10px Inter, sans-serif';
        ctxWire.fillText('✕', el.x + el.w - 12, el.y + 11);

        // Resize handle (bottom-right)
        ctxWire.fillStyle = def.color + 'cc';
        ctxWire.fillRect(el.x + el.w - 10, el.y + el.h - 10, 10, 10);
      }
    }

    // Drag preview
    if (dragState) {
      const dx = Math.abs(dragState.currentX - dragState.startX);
      const dy = Math.abs(dragState.currentY - dragState.startY);
      if (dx > 4 || dy > 4) {
        const r = snapRect(dragState.startX, dragState.startY, dragState.currentX, dragState.currentY, selectedType);
        const def = ELEMENT_TYPES[selectedType];
        ctxWire.save();
        ctxWire.setLineDash([6, 4]);
        ctxWire.strokeStyle = def.color;
        ctxWire.lineWidth = 2;
        ctxWire.strokeRect(r.x, r.y, r.w, r.h);
        ctxWire.setLineDash([]);
        ctxWire.fillStyle = def.color + '33';
        ctxWire.fillRect(r.x, r.y, r.w, r.h);
        ctxWire.restore();
      }
    }
  }

  // ── Draw Heatmap ──────────────────────────────────────────────────────────────
  function drawHeatmap() {
    if (!ctxHeat) return;
    ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
    if (!heatmapGenerated || elements.length === 0) return;

    for (const el of elements) {
      const cx = el.x + el.w / 2;
      const cy = el.y + el.h / 2;
      const radius = Math.max(el.w, el.h) * 1.15;
      const { r, g, b } = scoreToRGB(el.score);
      const grad = ctxHeat.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0,   `rgba(${r},${g},${b},0.82)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.50)`);
      grad.addColorStop(0.8, `rgba(${r},${g},${b},0.18)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctxHeat.fillStyle = grad;
      ctxHeat.beginPath();
      ctxHeat.ellipse(cx, cy, radius, radius * 0.75, 0, 0, Math.PI * 2);
      ctxHeat.fill();
    }
  }

  // ── Geometry helpers ──────────────────────────────────────────────────────────
  function getCanvasPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY
    };
  }

  function snapRect(x1, y1, x2, y2, type) {
    const def = ELEMENT_TYPES[type];
    let x = Math.min(x1, x2), y = Math.min(y1, y2);
    let w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
    w = Math.max(w, def.minW);
    h = Math.max(h, def.minH);
    x = Math.max(0, Math.min(x, CANVAS_W - w));
    y = Math.max(0, Math.min(y, CANVAS_H - h));
    return { x, y, w, h };
  }

  function elemAt(px, py) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (px >= el.x && px <= el.x + el.w && py >= el.y && py <= el.y + el.h) return el;
    }
    return null;
  }

  function isDeleteHandle(el, px, py) {
    return (
      px >= el.x + el.w - 16 && px <= el.x + el.w &&
      py >= el.y && py <= el.y + 16
    );
  }

  function isResizeHandle(el, px, py) {
    return (
      px >= el.x + el.w - 12 && px <= el.x + el.w &&
      py >= el.y + el.h - 12 && py <= el.y + el.h
    );
  }

  // ── Ranked sidebar ────────────────────────────────────────────────────────────
  function updateRankings() {
    if (!rankList || !insightList) return;
    if (elements.length === 0) {
      rankList.innerHTML    = `<p class="uxp-no-items">${t('no_elements')}</p>`;
      insightList.innerHTML = `<p class="uxp-no-items">${t('no_heatmap')}</p>`;
      return;
    }
    if (!heatmapGenerated) {
      rankList.innerHTML    = `<p class="uxp-no-items">${t('no_heatmap')}</p>`;
      insightList.innerHTML = `<p class="uxp-no-items">${t('no_heatmap')}</p>`;
      return;
    }

    const sorted = [...elements].sort((a, b) => b.score - a.score);

    rankList.innerHTML = sorted.map((el, i) => {
      const pct = Math.round(el.score * 100);
      const col = scoreToHex(el.score);
      const def = ELEMENT_TYPES[el.type];
      return `
        <div class="uxp-rank-item" style="border-left-color:${col}">
          <span class="uxp-rank-num" style="color:${col}">${t('rank_label', i)}</span>
          <span class="uxp-rank-name">${def.icon} ${el.label}</span>
          <span class="uxp-rank-pct" style="color:${col}">${pct}% ${t('attention_pct')}</span>
        </div>`;
    }).join('');

    // Generate insights
    const insights = [];
    const ctaAboveFold  = elements.find(el => el.type === 'button' && el.y + el.h / 2 < FOLD_Y);
    const ctaBelowFold  = elements.filter(el => el.type === 'button' && el.y + el.h / 2 >= FOLD_Y);
    const navEl         = elements.find(el => el.type === 'nav');
    const lowForms      = elements.filter(el => el.type === 'form' && el.score < 0.50);
    const highImages    = elements.filter(el => el.type === 'image' && el.score > 0.70);
    const hasIsolated   = elements.some(el => {
      for (const o of elements) {
        if (o.id === el.id) continue;
        const g = 32;
        if (el.x-g < o.x+o.w && el.x+el.w+g > o.x && el.y-g < o.y+o.h && el.y+el.h+g > o.y) return false;
      }
      return true;
    });
    const aboveFoldCount = elements.filter(el => el.y + el.h / 2 < FOLD_Y).length;

    if (ctaAboveFold) insights.push({ cls: 'good', text: '✅ ' + t('insight_cta_ok') });
    for (const cta of ctaBelowFold) insights.push({ cls: 'warn', text: '⚠️ ' + t('insight_below_fold', cta.label) });
    if (!ctaAboveFold && ctaBelowFold.length === 0 && !elements.find(el => el.type === 'button')) {
      insights.push({ cls: 'warn', text: '⚠️ ' + t('insight_no_cta') });
    }
    if (navEl && navEl.y < 60) insights.push({ cls: 'good', text: '✅ ' + t('insight_nav_top') });
    else if (!navEl)           insights.push({ cls: '',     text: 'ℹ️ ' + t('insight_no_nav') });
    for (const f of lowForms)  insights.push({ cls: 'warn', text: '⚠️ ' + t('insight_form_low', f.label) });
    for (const img of highImages) insights.push({ cls: 'good', text: '✅ ' + t('insight_image_high', img.label) });
    if (hasIsolated) insights.push({ cls: '', text: 'ℹ️ ' + t('insight_isolation') });
    if (aboveFoldCount >= 2 && aboveFoldCount <= 5) insights.push({ cls: 'good', text: '✅ ' + t('insight_fold_ok') });

    insightList.innerHTML = insights.length === 0
      ? `<p class="uxp-no-items">No specific insights.</p>`
      : insights.map(ins => `<div class="uxp-insight-item ${ins.cls ? 'uxp-insight-' + ins.cls : ''}">${ins.text}</div>`).join('');

    updateLayerPanel();
  }

  // ── Layer Panel ───────────────────────────────────────────────────────────────
  function updateLayerPanel() {
    const lp = document.getElementById('uxp-layer-panel');
    if (!lp) return;
    lp.innerHTML = elements.length === 0
      ? `<p class="uxp-no-items">—</p>`
      : [...elements].reverse().map(el => {
        const def = ELEMENT_TYPES[el.type];
        const isSelected = selectedElem && selectedElem.id === el.id;
        return `
          <div class="uxp-layer-item${isSelected ? ' selected' : ''}"
               data-id="${el.id}"
               title="${el.label}">
            <span class="uxp-layer-icon">${def.icon}</span>
            <span class="uxp-layer-name">${el.label}</span>
          </div>`;
      }).join('');

    lp.querySelectorAll('.uxp-layer-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        const el = elements.find(e => e.id === id);
        selectedElem = (selectedElem && selectedElem.id === id) ? null : el;
        drawWireframe();
        drawHeatmap();
        updateLayerPanel();
      });
    });
  }

  // ── Generate Heatmap ──────────────────────────────────────────────────────────
  function predictAttention() {
    if (elements.length === 0) return;
    elements.forEach(el => { el.score = computeAttentionScore(el); });
    heatmapGenerated = true;
    drawWireframe();
    drawHeatmap();
    updateRankings();
    if (window.showToast) window.showToast(t('toast_predict'));
  }

  // ── Export Report ─────────────────────────────────────────────────────────────
  function generateHTMLReport() {
    const now     = new Date().toLocaleString();
    const sorted  = [...elements].sort((a, b) => b.score - a.score);
    const hasScore = heatmapGenerated;
    const l = lang();

    const rowsHTML = sorted.map((el, i) => {
      const def      = ELEMENT_TYPES[el.type];
      const pct      = hasScore ? Math.round(el.score * 100) + '%' : '—';
      const position = el.y + el.h / 2 < FOLD_Y
        ? (l === 'fr' ? 'Au-dessus du pli ✅' : 'Above Fold ✅')
        : (l === 'fr' ? 'En dessous du pli ⚠️' : 'Below Fold ⚠️');
      const scoreClass = hasScore
        ? (el.score > 0.70 ? 'high' : el.score > 0.45 ? 'med' : 'low')
        : '';
      return `<tr>
        <td><strong>#${i + 1}</strong></td>
        <td>${def.icon} ${el.label}</td>
        <td>${def.key.toUpperCase()}</td>
        <td class="score ${scoreClass}">${pct}</td>
        <td>${position}</td>
        <td>${el.x}px, ${el.y}px</td>
        <td>${el.w}×${el.h}px</td>
      </tr>`;
    }).join('\n');

    const insightsHTML = (() => {
      if (!hasScore) return `<p>${l === 'fr' ? 'Exécutez la prédiction d\'abord.' : 'Run prediction first.'}</p>`;
      const items = [];
      const ctaAbove = elements.find(e => e.type === 'button' && e.y + e.h / 2 < FOLD_Y);
      const ctaBelow = elements.filter(e => e.type === 'button' && e.y + e.h / 2 >= FOLD_Y);
      const navEl    = elements.find(e => e.type === 'nav');
      if (ctaAbove) items.push({ cls: 'good', msg: l === 'fr' ? '✅ CTA principal visible au-dessus du pli.' : '✅ Primary CTA is visible above the fold.' });
      ctaBelow.forEach(c => items.push({ cls: 'warn', msg: l === 'fr' ? `⚠️ "${c.label}" est sous le pli — ~60% des utilisateurs ne le verront pas.` : `⚠️ "${c.label}" is below the fold — ~60% of users may never see it.` }));
      if (!ctaAbove && ctaBelow.length === 0 && !elements.find(e => e.type === 'button')) {
        items.push({ cls: 'warn', msg: l === 'fr' ? '⚠️ Aucun bouton/CTA trouvé.' : '⚠️ No Button/CTA found on canvas.' });
      }
      if (navEl && navEl.y < 60) items.push({ cls: 'good', msg: l === 'fr' ? '✅ Navigation en haut de page.' : '✅ Navigation at top of page.' });
      else if (!navEl) items.push({ cls: 'neutral', msg: l === 'fr' ? 'ℹ️ Aucune navigation détectée.' : 'ℹ️ No navigation element detected.' });
      elements.filter(e => e.type === 'form' && e.score < 0.5).forEach(f =>
        items.push({ cls: 'warn', msg: l === 'fr' ? `⚠️ Formulaire "${f.label}" a une faible attention prédite.` : `⚠️ Form "${f.label}" has low predicted attention.` })
      );
      elements.filter(e => e.type === 'image' && e.score > 0.70).forEach(img =>
        items.push({ cls: 'good', msg: l === 'fr' ? `✅ Image "${img.label}" capte fortement l'attention.` : `✅ Image "${img.label}" captures strong attention.` })
      );
      return items.map(it => `<div class="insight ${it.cls}">${it.msg}</div>`).join('');
    })();

    const headline = l === 'fr'
      ? `Rapport d'Audit UX — ${sorted.length} éléments analysés`
      : `UX Audit Report — ${sorted.length} elements analysed`;
    const generatedLabel = l === 'fr' ? 'Généré le' : 'Generated';
    const elementColLabel = l === 'fr' ? 'Éléments' : 'Elements';
    const insightsColLabel = l === 'fr' ? 'Insights UX' : 'UX Insights';
    const thRank     = l === 'fr' ? 'Rang'        : 'Rank';
    const thName     = l === 'fr' ? 'Nom'         : 'Name';
    const thType     = l === 'fr' ? 'Type'        : 'Type';
    const thAttn     = l === 'fr' ? 'Attention'   : 'Attention';
    const thPos      = l === 'fr' ? 'Position'    : 'Position';
    const thCoords   = l === 'fr' ? 'Coordonnées' : 'Coordinates';
    const thSize     = l === 'fr' ? 'Dimensions'  : 'Dimensions';
    const methodLabel = l === 'fr'
      ? '<strong>Méthodes appliquées :</strong> Modèle en F, Modèle en Z, Règle des Tiers, Effets de Position, Isolation par Espace Blanc, Boost par Type d\'Élément'
      : '<strong>Methods applied:</strong> F-Pattern, Z-Pattern, Rule of Thirds, Position Effects, Whitespace Isolation, Element Type Boost';

    return `<!DOCTYPE html>
<html lang="${l}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('export_html_title')}</title>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#f8fafc;color:#1e293b;padding:40px;max-width:1000px;margin:0 auto}
    header{background:linear-gradient(135deg,#7c3aed,#0891b2);color:#fff;padding:32px;border-radius:16px;margin-bottom:32px}
    header h1{font-size:1.8rem;font-weight:900;margin-bottom:8px}
    header p{opacity:.85;font-size:.9rem}
    .meta{display:flex;gap:16px;margin-top:16px;flex-wrap:wrap}
    .meta-badge{background:rgba(255,255,255,.2);padding:4px 12px;border-radius:20px;font-size:.78rem}
    section{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
    section h2{font-size:1.1rem;font-weight:700;color:#7c3aed;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #ede9fe}
    table{width:100%;border-collapse:collapse;font-size:.85rem}
    th{background:#f1f5f9;padding:10px 12px;text-align:left;font-weight:600;color:#475569;border-bottom:2px solid #e2e8f0}
    td{padding:10px 12px;border-bottom:1px solid #f1f5f9}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#f8fafc}
    .score{font-weight:700}
    .score.high{color:#ef4444}
    .score.med{color:#f59e0b}
    .score.low{color:#3b82f6}
    .insight{padding:10px 14px;border-radius:8px;margin-bottom:8px;font-size:.85rem;line-height:1.6}
    .insight.good{background:#f0fdf4;border-left:4px solid #22c55e;color:#166534}
    .insight.warn{background:#fffbeb;border-left:4px solid #f59e0b;color:#92400e}
    .insight.neutral{background:#f0f9ff;border-left:4px solid #38bdf8;color:#075985}
    .method-box{background:#faf5ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px 16px;font-size:.82rem;color:#5b21b6;line-height:1.6}
    footer{text-align:center;color:#94a3b8;font-size:.75rem;margin-top:32px}
  </style>
</head>
<body>
  <header>
    <h1>🔮 ${t('export_html_title')}</h1>
    <p>${headline}</p>
    <div class="meta">
      <span class="meta-badge">📅 ${generatedLabel}: ${now}</span>
      <span class="meta-badge">📐 Canvas: ${CANVAS_W}×${CANVAS_H}px</span>
      <span class="meta-badge">📊 ${sorted.length} ${elementColLabel}</span>
      <span class="meta-badge">📏 Fold: y=${FOLD_Y}px</span>
    </div>
  </header>

  <section>
    <h2>📊 ${elementColLabel}</h2>
    <table>
      <thead><tr>
        <th>${thRank}</th><th>${thName}</th><th>${thType}</th>
        <th>${thAttn}</th><th>${thPos}</th><th>${thCoords}</th><th>${thSize}</th>
      </tr></thead>
      <tbody>${rowsHTML}</tbody>
    </table>
  </section>

  <section>
    <h2>💡 ${insightsColLabel}</h2>
    ${insightsHTML}
  </section>

  <section>
    <h2>🧠 ${l === 'fr' ? 'Méthodologie' : 'Methodology'}</h2>
    <div class="method-box">${methodLabel}</div>
  </section>

  <footer>
    <p>Generated by 🔮 Predictive UX Heatmap Studio — IA Architecte Studio</p>
  </footer>
</body>
</html>`;
  }

  // ── CSS Injection ─────────────────────────────────────────────────────────────
  function injectCSS() {
    const styleId = 'uxp-styles';
    if (document.getElementById(styleId)) return;
    const css = `
      #uxp-root { font-family: 'Inter', sans-serif; background: #020617; color: #e2e8f0; padding: 20px; min-height: 100%; box-sizing: border-box; }
      #uxp-root * { box-sizing: border-box; }

      .uxp-header { margin-bottom: 18px; }
      .uxp-title { font-size: 1.55rem; font-weight: 900; background: linear-gradient(135deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 4px; }
      .uxp-subtitle { color: #475569; font-size: .78rem; margin: 0; }

      .uxp-layout { display: grid; grid-template-columns: 170px 1fr 248px; gap: 14px; align-items: start; }

      .uxp-panel { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 14px; }
      .uxp-panel-title { font-size: .68rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #7c3aed; margin: 0 0 10px; }

      .uxp-palette-btn { display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 10px; margin-bottom: 5px; background: #1e293b; border: 2px solid transparent; border-radius: 8px; color: #e2e8f0; font-family: inherit; font-size: .8rem; cursor: pointer; transition: background .12s, border-color .12s; text-align:left; }
      .uxp-palette-btn:hover { background: #263350; border-color: #7c3aed55; }
      .uxp-palette-btn.active { background: #1e0a3c; border-color: #7c3aed; color: #a78bfa; }

      .uxp-selected-label { font-size: .7rem; color: #a78bfa; margin-top: 8px; padding: 5px 8px; background: #1e0a3c55; border-radius: 6px; }

      .uxp-canvas-section { display: flex; flex-direction: column; gap: 10px; }
      .uxp-canvas-wrap { position: relative; width: ${CANVAS_W}px; height: ${CANVAS_H}px; border-radius: 10px; overflow: hidden; box-shadow: 0 0 32px #7c3aed22; }
      #uxp-wire-canvas { position: absolute; top: 0; left: 0; cursor: crosshair; border-radius: 10px; }
      #uxp-heat-canvas { position: absolute; top: 0; left: 0; pointer-events: none; opacity: .72; border-radius: 10px; }

      .uxp-fold-legend { display: flex; align-items: center; gap: 8px; font-size: .68rem; color: #64748b; }
      .uxp-fold-dash { width: 28px; height: 2px; background: repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 5px, transparent 5px, transparent 10px); }
      .uxp-canvas-hint { color: #334155; font-size: .7rem; margin: 0; line-height: 1.6; }

      .uxp-controls { display: flex; flex-wrap: wrap; gap: 7px; }
      .uxp-btn { padding: 7px 13px; border: none; border-radius: 8px; font-family: inherit; font-size: .76rem; font-weight: 600; cursor: pointer; transition: opacity .15s, transform .1s; white-space: nowrap; }
      .uxp-btn:hover { opacity: .88; }
      .uxp-btn:active { transform: scale(.97); }
      .uxp-btn-primary { background: linear-gradient(135deg, #7c3aed, #5b21b6); color: #fff; }
      .uxp-btn-cyan { background: linear-gradient(135deg, #0891b2, #0e7490); color: #fff; }
      .uxp-btn-secondary { background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
      .uxp-btn-secondary:hover { background: #263350; color: #e2e8f0; }
      .uxp-btn-danger { background: #1e293b; color: #f87171; border: 1px solid #7f1d1d44; }
      .uxp-btn-danger:hover { background: #450a0a55; }
      .uxp-btn-load { background: linear-gradient(135deg, #059669, #047857); color: #fff; width: 100%; margin-top: 8px; }

      .uxp-rank-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; background: #0a1628; border-radius: 8px; margin-bottom: 5px; border-left: 3px solid #7c3aed; }
      .uxp-rank-num { font-size: .68rem; font-weight: 800; min-width: 24px; }
      .uxp-rank-name { font-size: .75rem; color: #e2e8f0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .uxp-rank-pct { font-size: .73rem; font-weight: 700; white-space: nowrap; }

      .uxp-insight-item { padding: 7px 10px; background: #0a1628; border-radius: 8px; margin-bottom: 5px; font-size: .72rem; line-height: 1.55; border-left: 3px solid #06b6d4; color: #94a3b8; }
      .uxp-insight-warn { border-color: #f59e0b; color: #fbbf24; background: #1a1206; }
      .uxp-insight-good { border-color: #34d399; color: #6ee7b7; background: #071a12; }

      .uxp-no-items { color: #334155; font-size: .72rem; margin: 0; font-style: italic; }

      .uxp-layer-item { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 6px; font-size: .72rem; color: #94a3b8; cursor: pointer; transition: background .1s; }
      .uxp-layer-item:hover { background: #1e293b; color: #e2e8f0; }
      .uxp-layer-item.selected { background: #1e0a3c; color: #a78bfa; }
      .uxp-layer-icon { font-size: .85rem; }
      .uxp-layer-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .uxp-legend { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
      .uxp-legend-item { display: flex; align-items: center; gap: 5px; font-size: .66rem; color: #475569; }
      .uxp-legend-dot { width: 10px; height: 10px; border-radius: 50%; }

      .uxp-right-col { display: flex; flex-direction: column; gap: 14px; }
      .uxp-side-panel-scroll { max-height: 220px; overflow-y: auto; padding-right: 2px; }
      .uxp-side-panel-scroll::-webkit-scrollbar { width: 4px; }
      .uxp-side-panel-scroll::-webkit-scrollbar-track { background: transparent; }
      .uxp-side-panel-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    `;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  function render() {
    const container = document.getElementById('left-body');
    if (!container) return;

    injectCSS();

    container.innerHTML = `
      <div id="uxp-root">
        <div class="uxp-header">
          <h1 class="uxp-title">${t('title')}</h1>
          <p class="uxp-subtitle">${t('subtitle')}</p>
        </div>

        <div class="uxp-layout">

          <!-- LEFT: Palette + Layers -->
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="uxp-panel">
              <p class="uxp-panel-title">${t('palette_label')}</p>
              ${Object.values(ELEMENT_TYPES).map(def => `
                <button class="uxp-palette-btn${selectedType === def.key ? ' active' : ''}"
                        data-type="${def.key}">
                  <span>${def.icon}</span>
                  <span>${t(def.labelKey)}</span>
                </button>`).join('')}
              <p class="uxp-selected-label" id="uxp-sel-label">
                ${t('selected_type')} ${ELEMENT_TYPES[selectedType].icon} ${t(ELEMENT_TYPES[selectedType].labelKey)}
              </p>
            </div>

            <div class="uxp-panel">
              <p class="uxp-panel-title">${t('layer_panel')}</p>
              <div id="uxp-layer-panel" class="uxp-side-panel-scroll">
                <p class="uxp-no-items">—</p>
              </div>
            </div>

            <div class="uxp-panel">
              <p class="uxp-panel-title">Legend</p>
              <div class="uxp-legend">
                <div class="uxp-legend-item"><div class="uxp-legend-dot" style="background:#ef4444"></div> High</div>
                <div class="uxp-legend-item"><div class="uxp-legend-dot" style="background:#f59e0b"></div> Medium</div>
                <div class="uxp-legend-item"><div class="uxp-legend-dot" style="background:#3b82f6"></div> Low</div>
              </div>
            </div>
          </div>

          <!-- CENTER: Canvas -->
          <div class="uxp-canvas-section">
            <div class="uxp-panel" style="padding-bottom:10px;">
              <p class="uxp-panel-title">${t('canvas_label')}</p>
              <div class="uxp-canvas-wrap">
                <canvas id="uxp-wire-canvas" width="${CANVAS_W}" height="${CANVAS_H}"></canvas>
                <canvas id="uxp-heat-canvas" width="${CANVAS_W}" height="${CANVAS_H}"></canvas>
              </div>
              <div class="uxp-fold-legend" style="margin-top:8px;">
                <div class="uxp-fold-dash"></div>
                <span>${t('fold_line')} (y=${FOLD_Y}px)</span>
              </div>
              <p class="uxp-canvas-hint">${t('hint')}</p>
              <div class="uxp-controls" style="margin-top:10px;">
                <button class="uxp-btn uxp-btn-primary" id="uxp-predict-btn">${t('btn_predict')}</button>
                <button class="uxp-btn uxp-btn-secondary" id="uxp-clear-heat-btn">${t('btn_clear_heatmap')}</button>
                <button class="uxp-btn uxp-btn-secondary" id="uxp-undo-btn">${t('btn_undo')}</button>
                <button class="uxp-btn uxp-btn-danger" id="uxp-clear-all-btn">${t('btn_clear_all')}</button>
                <button class="uxp-btn uxp-btn-cyan" id="uxp-export-btn">${t('btn_export')}</button>
              </div>
              <button class="uxp-btn uxp-btn-load" id="uxp-load-btn">${t('btn_load')}</button>
            </div>
          </div>

          <!-- RIGHT: Rankings + Insights -->
          <div class="uxp-right-col">
            <div class="uxp-panel">
              <p class="uxp-panel-title">${t('ranked_title')}</p>
              <div id="uxp-rank-list" class="uxp-side-panel-scroll">
                <p class="uxp-no-items">${t('no_elements')}</p>
              </div>
            </div>
            <div class="uxp-panel">
              <p class="uxp-panel-title">${t('insights_title')}</p>
              <div id="uxp-insight-list" class="uxp-side-panel-scroll">
                <p class="uxp-no-items">${t('no_heatmap')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>`;

    // Cache DOM refs
    canvasWire = document.getElementById('uxp-wire-canvas');
    canvasHeat = document.getElementById('uxp-heat-canvas');
    ctxWire    = canvasWire.getContext('2d');
    ctxHeat    = canvasHeat.getContext('2d');
    rankList   = document.getElementById('uxp-rank-list');
    insightList = document.getElementById('uxp-insight-list');
    selectedTypeLabel = document.getElementById('uxp-sel-label');

    // Palette buttons
    container.querySelectorAll('.uxp-palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedType = btn.dataset.type;
        container.querySelectorAll('.uxp-palette-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const def = ELEMENT_TYPES[selectedType];
        if (selectedTypeLabel) {
          selectedTypeLabel.textContent = t('selected_type') + ' ' + def.icon + ' ' + t(def.labelKey);
        }
      });
    });

    // Canvas mouse events
    canvasWire.addEventListener('mousedown', onMouseDown);
    canvasWire.addEventListener('mousemove', onMouseMove);
    canvasWire.addEventListener('mouseup',   onMouseUp);
    canvasWire.addEventListener('mouseleave', onMouseLeave);
    canvasWire.addEventListener('dblclick',   onDblClick);

    // Control buttons
    document.getElementById('uxp-predict-btn').addEventListener('click', predictAttention);
    document.getElementById('uxp-clear-heat-btn').addEventListener('click', () => {
      heatmapGenerated = false;
      ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawWireframe();
      updateRankings();
    });
    document.getElementById('uxp-undo-btn').addEventListener('click', () => {
      if (history.length > 0) {
        elements = history.pop();
        selectedElem = null;
        heatmapGenerated = false;
        ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
        drawWireframe();
        updateRankings();
      }
    });
    document.getElementById('uxp-clear-all-btn').addEventListener('click', () => {
      history.push(JSON.parse(JSON.stringify(elements)));
      elements = [];
      selectedElem = null;
      heatmapGenerated = false;
      ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawWireframe();
      updateRankings();
      if (window.showToast) window.showToast(t('toast_cleared'));
    });
    document.getElementById('uxp-export-btn').addEventListener('click', () => {
      const html = generateHTMLReport();
      if (window.editor && window.editor.setValue) {
        window.editor.setValue(html);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast(t('toast_exported'));
      } else {
        const blob = new Blob([html], { type: 'text/html' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url; a.download = 'ux-audit-report.html'; a.click();
        URL.revokeObjectURL(url);
      }
    });
    document.getElementById('uxp-load-btn').addEventListener('click', () => {
      if (window.editor && window.editor.setValue) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
    });

    // Initial draw
    drawWireframe();
    updateRankings();
    updateLayerPanel();

    if (window.showToast) window.showToast(t('toast_init'));
  }

  // ── Mouse Event Handlers ──────────────────────────────────────────────────────
  function onMouseDown(e) {
    const pos = getCanvasPos(e, canvasWire);

    // Check delete handle on hovered element
    if (hoveredElem && isDeleteHandle(hoveredElem, pos.x, pos.y)) {
      history.push(JSON.parse(JSON.stringify(elements)));
      elements = elements.filter(el => el.id !== hoveredElem.id);
      if (selectedElem && selectedElem.id === hoveredElem.id) selectedElem = null;
      hoveredElem = null;
      heatmapGenerated = false;
      if (ctxHeat) ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawWireframe();
      updateRankings();
      return;
    }

    // Check resize handle on hovered element
    if (hoveredElem && isResizeHandle(hoveredElem, pos.x, pos.y)) {
      history.push(JSON.parse(JSON.stringify(elements)));
      resizeState = {
        elemId: hoveredElem.id,
        startMouseX: pos.x,
        startMouseY: pos.y,
        startW: hoveredElem.w,
        startH: hoveredElem.h,
      };
      selectedElem = hoveredElem;
      return;
    }

    // Check if clicking an existing element (move)
    const hit = elemAt(pos.x, pos.y);
    if (hit) {
      history.push(JSON.parse(JSON.stringify(elements)));
      dragMoveState = {
        elemId: hit.id,
        offsetX: pos.x - hit.x,
        offsetY: pos.y - hit.y,
      };
      selectedElem = hit;
      drawWireframe();
      updateLayerPanel();
      return;
    }

    // Otherwise start creating new element
    selectedElem = null;
    dragState = { startX: pos.x, startY: pos.y, currentX: pos.x, currentY: pos.y };
  }

  function onMouseMove(e) {
    const pos = getCanvasPos(e, canvasWire);

    if (resizeState) {
      const el = elements.find(x => x.id === resizeState.elemId);
      if (el) {
        const def = ELEMENT_TYPES[el.type];
        el.w = Math.max(def.minW, resizeState.startW + (pos.x - resizeState.startMouseX));
        el.h = Math.max(def.minH, resizeState.startH + (pos.y - resizeState.startMouseY));
        el.w = Math.min(el.w, CANVAS_W - el.x);
        el.h = Math.min(el.h, CANVAS_H - el.y);
        heatmapGenerated = false;
        if (ctxHeat) ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
      }
      drawWireframe();
      return;
    }

    if (dragMoveState) {
      const el = elements.find(x => x.id === dragMoveState.elemId);
      if (el) {
        el.x = Math.max(0, Math.min(pos.x - dragMoveState.offsetX, CANVAS_W - el.w));
        el.y = Math.max(0, Math.min(pos.y - dragMoveState.offsetY, CANVAS_H - el.h));
        heatmapGenerated = false;
        if (ctxHeat) ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
      }
      drawWireframe();
      return;
    }

    hoveredElem = elemAt(pos.x, pos.y);
    if (hoveredElem) {
      canvasWire.style.cursor = 'move';
    } else {
      canvasWire.style.cursor = 'crosshair';
    }

    if (dragState) {
      dragState.currentX = pos.x;
      dragState.currentY = pos.y;
    }
    drawWireframe();
  }

  function onMouseUp(e) {
    const pos = getCanvasPos(e, canvasWire);

    if (resizeState) {
      resizeState = null;
      drawWireframe();
      updateLayerPanel();
      return;
    }

    if (dragMoveState) {
      dragMoveState = null;
      drawWireframe();
      updateLayerPanel();
      return;
    }

    if (dragState) {
      const dx = Math.abs(pos.x - dragState.startX);
      const dy = Math.abs(pos.y - dragState.startY);
      if (dx > 8 || dy > 8) {
        history.push(JSON.parse(JSON.stringify(elements)));
        const r = snapRect(dragState.startX, dragState.startY, pos.x, pos.y, selectedType);
        const def = ELEMENT_TYPES[selectedType];
        const count = elements.filter(el => el.type === selectedType).length + 1;
        const label = t(def.labelKey).replace(/[^a-zA-ZÀ-ÿ\s]/g, '').trim() + ' ' + count;
        elements.push({
          id:    ++idCounter,
          type:  selectedType,
          icon:  def.icon,
          label: label,
          color: def.color,
          score: 0,
          ...r,
        });
        heatmapGenerated = false;
        if (ctxHeat) ctxHeat.clearRect(0, 0, CANVAS_W, CANVAS_H);
        updateRankings();
        updateLayerPanel();
      }
      dragState = null;
      drawWireframe();
    }
  }

  function onMouseLeave() {
    dragState     = null;
    dragMoveState = null;
    resizeState   = null;
    hoveredElem   = null;
    canvasWire.style.cursor = 'crosshair';
    drawWireframe();
  }

  function onDblClick(e) {
    // Double-click to rename element
    const pos = getCanvasPos(e, canvasWire);
    const hit = elemAt(pos.x, pos.y);
    if (!hit) return;
    const newLabel = window.prompt('Rename element:', hit.label);
    if (newLabel && newLabel.trim()) {
      history.push(JSON.parse(JSON.stringify(elements)));
      hit.label = newLabel.trim();
      drawWireframe();
      updateRankings();
      updateLayerPanel();
    }
  }

  // ── Hook into renderTab ───────────────────────────────────────────────────────
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId === 'uxpredictor') {
      render();
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
    }
  };

  // ── Auto-init if tab already active ──────────────────────────────────────────
  (function autoInit() {
    const leftBody = document.getElementById('left-body');
    if (!leftBody) return;
    const activeTab = document.querySelector('[data-tab="uxpredictor"].active, [data-tab="uxpredictor"][aria-selected="true"]');
    if (activeTab) render();
  })();

})();
