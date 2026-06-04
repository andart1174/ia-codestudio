/**
 * SVG Canvas Draw v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'SVG Studio', title: '✍️ SVG Canvas Studio', sub: 'Draw vector graphics',
    desc: 'Draw a shape below using your mouse. When finished, it will instantly inject pure <svg> math code into your application.',
    clear: '🗑️ Clear',
    inject: '⚡ Inject SVG into Code',
    injected: '✅ SVG Vector injected successfully!'
  },
  fr: {
    tab: 'Studio SVG', title: '✍️ Studio Canvas SVG', sub: 'Dessinez des vecteurs',
    desc: 'Dessinez une forme ci-dessous. Une fois terminé, cela injectera instantanément le code mathématique pur <svg> dans votre HTML.',
    clear: '🗑️ Effacer',
    inject: '⚡ Injecter SVG dans le Code',
    injected: '✅ Vecteur SVG injecté avec succès !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

let currentPoints = [];
let currentColor = '#ec4899';
let currentStroke = 4;
let currentWidth = 100; // default SVG width in % or px depending on usage


function generateSVGString() {
  if(currentPoints.length < 2) return '';
  
  // Calculate bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  currentPoints.forEach(p => {
    if(p.x < minX) minX = p.x;
    if(p.y < minY) minY = p.y;
    if(p.x > maxX) maxX = p.x;
    if(p.y > maxY) maxY = p.y;
  });
  
  const width = Math.max(maxX - minX, 10);
  const height = Math.max(maxY - minY, 10);
  
  // Create path data
  let pathD = 'M ' + (currentPoints[0].x - minX) + ' ' + (currentPoints[0].y - minY) + ' ';
  for(let i=1; i<currentPoints.length; i++) {
    pathD += 'L ' + (currentPoints[i].x - minX) + ' ' + (currentPoints[i].y - minY) + ' ';
  }
  
  return '\n<!-- ✍️ Hand-drawn SVG Vector -->\n' +
         '<svg viewBox="0 0 ' + (width + 20) + ' ' + (height + 20) + '" width="' + currentWidth + 'px" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 50px; left: 50px; z-index: 1000;">\n' +
         '  <path d="' + pathD + '" fill="none" stroke="' + currentColor + '" stroke-width="' + currentStroke + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(10, 10)"/>\n' +
         '</svg>\n';
}

function injectSVG() {
  if(currentPoints.length < 2) {
    if(window.showToast) window.showToast('Please draw something first!');
    return;
  }
  if(!window.editor) return;
  
  var code = window.editor.getValue();
  var svgStr = generateSVGString();

  if(code.includes('</body>')) {
    code = code.replace('</body>', svgStr + '\n</body>');
  } else {
    code += '\n' + svgStr;
  }
  
  window.editor.setValue(code);
  if(window.runPreview) window.runPreview();
  if(window.showToast) window.showToast(t('injected'));
}

function renderSvgTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#ec4899;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;align-items:center;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;text-align:center;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  // Canvas
  var canvasContainer = document.createElement('div');
  canvasContainer.style = 'background:#1e293b;border:1px solid #334155;border-radius:8px;width:100%;aspect-ratio:1;position:relative;cursor:crosshair;touch-action:none;';
  
  var canvas = document.createElement('canvas');
  canvas.style = 'width:100%;height:100%;border-radius:8px;';
  canvasContainer.appendChild(canvas);
  body.appendChild(canvasContainer);

  let ctx = null;
  let isDrawing = false;
  
  // Need to set real canvas dimensions after append
  setTimeout(() => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx = canvas.getContext('2d');
    ctx.lineWidth = currentStroke;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    
    // Redraw if returning to tab
    if(currentPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      for(let i=1; i<currentPoints.length; i++) {
        ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
      }
      ctx.stroke();
    }
  }, 10);

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if(e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    currentPoints = [];
    const pos = getPos(e);
    currentPoints.push(pos);
    if(ctx) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  }

  function draw(e) {
    e.preventDefault();
    if(!isDrawing) return;
    const pos = getPos(e);
    currentPoints.push(pos);
    if(ctx) {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  }

  function endDraw() {
    isDrawing = false;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', endDraw);
  
  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('touchmove', draw);
  window.addEventListener('touchend', endDraw);

  var controls = document.createElement('div');
  controls.style = 'display:flex; gap:10px; width:100%; align-items:center;';
  
  var colPicker = document.createElement('input');
  colPicker.type = 'color';
  colPicker.value = currentColor;
  colPicker.style = 'width: 40px; height: 30px; border: none; cursor: pointer; background: transparent;';
  colPicker.onchange = e => { 
    currentColor = e.target.value; 
    if(ctx) ctx.strokeStyle = currentColor; 
  };
  
  var sizeW = document.createElement('div');
  sizeW.style = 'display:flex; flex-direction:column; flex:1;';
  var sl = document.createElement('input');
  sl.type = 'range'; sl.min = '10'; sl.max = '500'; sl.value = currentWidth;
  var slLbl = document.createElement('span');
  slLbl.textContent = 'Size: ' + currentWidth + 'px';
  slLbl.style = 'font-size:10px; color:#cbd5e1;';
  sl.oninput = e => { 
    currentWidth = e.target.value; 
    slLbl.textContent = 'Size: ' + currentWidth + 'px'; 
  };
  sizeW.appendChild(slLbl);
  sizeW.appendChild(sl);

  controls.appendChild(colPicker);
  controls.appendChild(sizeW);
  body.appendChild(controls);

  var btns = document.createElement('div');
  btns.style = 'display:flex;gap:10px;width:100%;';

  var clrBtn = document.createElement('button');
  clrBtn.textContent = t('clear');
  clrBtn.style = 'flex:1;background:transparent;border:1px solid #475569;border-radius:6px;color:#cbd5e1;padding:8px;font-weight:bold;cursor:pointer;';
  clrBtn.onclick = () => {
    currentPoints = [];
    if(ctx) ctx.clearRect(0,0,canvas.width,canvas.height);
  };
  btns.appendChild(clrBtn);

  var injBtn = document.createElement('button');
  injBtn.textContent = t('inject');
  injBtn.style = 'flex:2;background:linear-gradient(135deg,#ec4899,#be185d);border:none;border-radius:6px;color:#fff;padding:8px;font-weight:bold;cursor:pointer;';
  injBtn.onclick = injectSVG;
  btns.appendChild(injBtn);

  body.appendChild(btns);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-svgdraw');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='svgdraw') renderSvgTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='svgdraw') {
      window.activeTab = 'svgdraw';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-svgdraw');
      if(btn) btn.classList.add('active');
      renderSvgTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
