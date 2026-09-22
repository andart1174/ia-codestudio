/**
 * Heat Map Injector v1.0 — EN/FR
 * Records clicks in the preview iframe and draws a heatmap overlay using Canvas.
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Heat Map', title: '🔥 Click Heat Map', sub: 'See where users click most',
    desc: 'Tracks clicks in your preview and draws a visual heatmap. Hot zones = more clicks. Click "Start Tracking" then interact with your preview.',
    start: '▶ Start Tracking',
    stop: '⏹ Stop & Show Map',
    clear: '🗑 Clear',
    clicks: 'Clicks recorded: ',
    ready: '✅ Click your preview now!',
    stopped: '🔥 Heatmap generated!'
  },
  fr: {
    tab: 'Carte Thermique', title: '🔥 Carte de Chaleur', sub: 'Voyez ou les utilisateurs cliquent le plus',
    desc: 'Enregistre les clics dans votre apercu et dessine une carte de chaleur visuelle.',
    start: '▶ Demarrer le Suivi',
    stop: '⏹ Arreter et Afficher',
    clear: '🗑 Effacer',
    clicks: 'Clics enregistres: ',
    ready: '✅ Cliquez sur votre apercu !',
    stopped: '🔥 Carte thermique generee !'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var clicks = [];
var tracking = false;
var trackHandler = null;

function getFrame() {
  return document.getElementById('preview-iframe') || document.querySelector('#right-panel iframe');
}

function startTracking(countEl, statusEl, startBtn, stopBtn) {
  clicks = [];
  tracking = true;
  statusEl.textContent = t('ready');
  countEl.textContent = t('clicks') + '0';
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startBtn.style.opacity = '0.5';
  stopBtn.style.opacity = '1';

  var frame = getFrame();
  if (!frame) return;

  /* Inject tracking script into iframe */
  try {
    var doc = frame.contentDocument || frame.contentWindow.document;
    if (!doc) return;
    /* Remove previous */
    var old = doc.getElementById('ia-heatmap-track');
    if (old) old.remove();
    var sc = doc.createElement('script');
    sc.id = 'ia-heatmap-track';
    sc.textContent = 'document.addEventListener("click",function(e){window.parent.postMessage({type:"ia-click",x:e.clientX,y:e.clientY,w:window.innerWidth,h:window.innerHeight},"*");});';
    doc.body.appendChild(sc);
  } catch(e) { /* cross-origin */ }

  trackHandler = function (e) {
    if (!e.data || e.data.type !== 'ia-click') return;
    clicks.push({ x: e.data.x / e.data.w, y: e.data.y / e.data.h });
    countEl.textContent = t('clicks') + clicks.length;
  };
  window.addEventListener('message', trackHandler);
}

function stopTracking(canvas, statusEl, startBtn, stopBtn) {
  tracking = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.style.opacity = '1';
  stopBtn.style.opacity = '0.5';
  if (trackHandler) { window.removeEventListener('message', trackHandler); trackHandler = null; }

  /* Remove inject from iframe */
  try {
    var frame = getFrame();
    if (frame) {
      var doc = frame.contentDocument || frame.contentWindow.document;
      var sc = doc.getElementById('ia-heatmap-track');
      if (sc) sc.remove();
    }
  } catch(e){}

  drawHeatmap(canvas, clicks);
  statusEl.textContent = t('stopped');
}

function drawHeatmap(canvas, pts) {
  var W = canvas.width, H = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  /* Dark background */
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, W, H);

  if (!pts.length) return;

  /* Draw each click as a radial gradient blob */
  pts.forEach(function (pt) {
    var cx = pt.x * W, cy = pt.y * H;
    var r = Math.max(30, W * 0.12);
    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, 'rgba(255,50,0,0.25)');
    grad.addColorStop(0.4, 'rgba(255,150,0,0.1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  /* Overlay with color map */
  var imageData = ctx.getImageData(0, 0, W, H);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var brightness = data[i];
    if (brightness > 20) {
      /* Map red intensity to heatmap colors: blue → cyan → green → yellow → red */
      var v = Math.min(brightness / 120, 1);
      if (v < 0.25) { data[i]=0; data[i+1]=Math.round(v*4*255); data[i+2]=255; }
      else if (v < 0.5) { data[i]=0; data[i+1]=255; data[i+2]=Math.round((1-(v-0.25)*4)*255); }
      else if (v < 0.75) { data[i]=Math.round((v-0.5)*4*255); data[i+1]=255; data[i+2]=0; }
      else { data[i]=255; data[i+1]=Math.round((1-(v-0.75)*4)*255); data[i+2]=0; }
      data[i+3] = Math.min(200, brightness * 3);
    }
  }
  ctx.putImageData(imageData, 0, 0);

  /* Draw click dots */
  pts.forEach(function (pt) {
    ctx.beginPath();
    ctx.arc(pt.x * W, pt.y * H, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
  });

  /* Legend */
  var lgd = ctx.createLinearGradient(4, H-14, W-4, H-14);
  lgd.addColorStop(0, '#0000ff'); lgd.addColorStop(0.25, '#00ffff');
  lgd.addColorStop(0.5, '#00ff00'); lgd.addColorStop(0.75, '#ffff00');
  lgd.addColorStop(1, '#ff0000');
  ctx.fillStyle = lgd;
  ctx.fillRect(4, H-10, W-8, 6);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '8px monospace';
  ctx.fillText('cold', 4, H-13);
  ctx.fillText('hot', W-18, H-13);
}

function renderHeatmapTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f87171;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var countEl = document.createElement('div');
  countEl.style.cssText = 'font-size:11px;color:#fbbf24;text-align:center;font-weight:700;';
  countEl.textContent = t('clicks') + '0';
  body.appendChild(countEl);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  /* Canvas heatmap */
  var canvas = document.createElement('canvas');
  canvas.width = 180; canvas.height = 130;
  canvas.style.cssText = 'width:100%;border-radius:8px;border:1px solid #1e293b;display:block;';
  var initCtx = canvas.getContext('2d');
  initCtx.fillStyle = '#0f172a';
  initCtx.fillRect(0, 0, 180, 130);
  initCtx.fillStyle = '#334155';
  initCtx.font = '10px sans-serif';
  initCtx.textAlign = 'center';
  initCtx.fillText('Start tracking to see heatmap', 90, 65);
  body.appendChild(canvas);

  /* Buttons */
  var btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';

  var startBtn = document.createElement('button');
  startBtn.textContent = t('start');
  startBtn.style.cssText = 'flex:2;background:linear-gradient(135deg,#dc2626,#b91c1c);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:10px;cursor:pointer;transition:opacity .2s;';

  var stopBtn = document.createElement('button');
  stopBtn.textContent = t('stop');
  stopBtn.disabled = true;
  stopBtn.style.cssText = 'flex:2;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:8px;padding:10px;color:#f87171;font-weight:900;font-size:10px;cursor:pointer;opacity:0.5;';

  var clearBtn = document.createElement('button');
  clearBtn.textContent = t('clear');
  clearBtn.style.cssText = 'flex:1;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:8px;padding:10px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;';

  startBtn.onclick = function () { startTracking(countEl, statusEl, startBtn, stopBtn); };
  stopBtn.onclick = function () { stopTracking(canvas, statusEl, startBtn, stopBtn); };
  clearBtn.onclick = function () {
    clicks = [];
    countEl.textContent = t('clicks') + '0';
    statusEl.textContent = '';
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#334155'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Start tracking to see heatmap', 90, 65);
  };

  btnRow.appendChild(startBtn);
  btnRow.appendChild(stopBtn);
  btnRow.appendChild(clearBtn);
  body.appendChild(btnRow);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-heatmap');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'heatmap') renderHeatmapTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'heatmap') {
      window.activeTab = 'heatmap';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-heatmap');
      if (btn) btn.classList.add('active');
      renderHeatmapTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
