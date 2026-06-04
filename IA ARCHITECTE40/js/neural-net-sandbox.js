(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🧠 NEURAL NETWORK SANDBOX — Real Backpropagation in Browser
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neural Network Decision Boundary Sandbox</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0b1329;
      --card-border: #1e293b;
      --accent: #8b5cf6;
      --accent-secondary: #ec4899;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 960px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
    }
    h1 {
      margin: 0 0 6px 0;
      font-size: 26px;
      font-weight: 900;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.sub { margin: 0 0 24px; font-size: 14px; color: var(--text-muted); }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .grid { grid-template-columns: 1fr 1fr; }
    }
    canvas {
      display: block;
      border-radius: 12px;
      cursor: crosshair;
      width: 100%;
    }
    .panel {
      background: rgba(255,255,255,0.01);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    h3 {
      margin: 0;
      font-size: 11px;
      text-transform: uppercase;
      color: var(--accent);
      letter-spacing: 0.8px;
      font-weight: 800;
    }
    .form-group { display: flex; flex-direction: column; gap: 4px; }
    label {
      font-size: 11px; color: var(--text-muted); font-weight: 600;
      display: flex; justify-content: space-between;
    }
    select, input[type="range"] {
      background: #020617; border: 1px solid var(--card-border);
      color: var(--text); border-radius: 8px; padding: 6px 10px;
      font-family: inherit; font-size: 13px; outline: none;
    }
    input[type="range"] {
      padding: 0; height: 5px; -webkit-appearance: none;
      background: #1e293b; cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 14px; height: 14px;
      border-radius: 50%; background: var(--accent-secondary);
    }
    .btn-group { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    button {
      font-family: inherit; border-radius: 10px; font-size: 12px;
      font-weight: 700; cursor: pointer; padding: 10px; outline: none; border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000; font-weight: 900;
    }
    .btn-secondary {
      background: #1e293b; border: 1px solid #334155; color: var(--text);
    }
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .stat-box {
      background: #020617; border: 1px solid var(--card-border);
      border-radius: 8px; padding: 8px 12px; text-align: center;
    }
    .stat-val { font-size: 18px; font-weight: 900; color: var(--accent); }
    .stat-lbl { font-size: 9px; color: var(--text-muted); text-transform: uppercase; }
    .toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000; padding: 12px 24px; border-radius: 30px;
      font-size: 13px; font-weight: 800; display: none; z-index: 100;
    }
    .net-canvas-wrap {
      background: #020617; border: 1px solid var(--card-border);
      border-radius: 12px; overflow: hidden; height: 140px;
    }
    #netCanvas { width: 100%; height: 140px; }
  </style>
</head>
<body>
<div class="container">
  <h1>🧠 Neural Network Decision Boundary Sandbox</h1>
  <p class="sub">Click to add data points — watch the network learn in real-time via backpropagation</p>

  <div class="grid">
    <!-- Left: Plot area -->
    <div>
      <div style="display:flex;gap:10px;margin-bottom:8px;">
        <button class="btn-primary" id="modeA" style="flex:1;background:linear-gradient(90deg,#8b5cf6,#6d28d9);">🔵 Class A</button>
        <button class="btn-secondary" id="modeB" style="flex:1;">🔴 Class B</button>
      </div>
      <canvas id="plotCanvas" width="400" height="360" style="border:1px solid #1e293b;"></canvas>
    </div>

    <!-- Right: Controls -->
    <div class="panel">
      <h3>⚙️ Network Architecture</h3>
      <div class="form-group">
        <label>Hidden Layer Neurons<span id="neuronsVal">8</span></label>
        <input type="range" id="neuronsSlider" min="2" max="16" step="1" value="8">
      </div>
      <div class="form-group">
        <label>Learning Rate<span id="lrVal">0.05</span></label>
        <input type="range" id="lrSlider" min="0.001" max="0.3" step="0.001" value="0.05">
      </div>

      <h3>📊 Training Stats</h3>
      <div class="stat-grid">
        <div class="stat-box"><div class="stat-val" id="epochStat">0</div><div class="stat-lbl">Epochs</div></div>
        <div class="stat-box"><div class="stat-val" id="lossStat">—</div><div class="stat-lbl">Loss</div></div>
        <div class="stat-box"><div class="stat-val" id="accStat">—</div><div class="stat-lbl">Accuracy</div></div>
        <div class="stat-box"><div class="stat-val" id="ptsStat">0</div><div class="stat-lbl">Points</div></div>
      </div>

      <div class="btn-group">
        <button class="btn-primary" id="trainBtn">⚡ Train / Pause</button>
        <button class="btn-secondary" id="clearBtn">🗑️ Clear All</button>
      </div>

      <h3>🔮 Network Visualization</h3>
      <div class="net-canvas-wrap">
        <canvas id="netCanvas" width="400" height="140"></canvas>
      </div>
    </div>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>
  // ── Mini Neural Net (2→N→1, sigmoid) ──────────────────────
  function sigmoid(x){ return 1/(1+Math.exp(-x)); }
  function sigmoidD(x){ const s=sigmoid(x); return s*(1-s); }

  class NeuralNet {
    constructor(hiddenN, lr){
      this.hiddenN = hiddenN;
      this.lr = lr;
      this.reset();
    }
    reset(){
      const h = this.hiddenN;
      this.w1 = Array.from({length:h},()=>[randn(),randn()]);
      this.b1 = Array.from({length:h},()=>randn()*0.1);
      this.w2 = Array.from({length:h},()=>randn());
      this.b2 = randn()*0.1;
    }
    forward(x0,x1){
      this.z1 = this.w1.map((w,i)=>w[0]*x0+w[1]*x1+this.b1[i]);
      this.a1 = this.z1.map(sigmoid);
      this.z2 = this.a1.reduce((s,a,i)=>s+this.w2[i]*a,this.b2);
      this.a2 = sigmoid(this.z2);
      return this.a2;
    }
    train(x0,x1,y){
      const out = this.forward(x0,x1);
      const dL = out - y;
      const dZ2 = dL * sigmoidD(this.z2);
      const dW2 = this.a1.map(a=>a*dZ2);
      const dB2 = dZ2;
      const dA1 = this.w2.map(w=>w*dZ2);
      const dZ1 = dA1.map((d,i)=>d*sigmoidD(this.z1[i]));
      this.w2 = this.w2.map((w,i)=>w - this.lr*dW2[i]);
      this.b2 -= this.lr*dB2;
      this.w1 = this.w1.map((w,i)=>[w[0]-this.lr*dZ1[i]*x0, w[1]-this.lr*dZ1[i]*x1]);
      this.b1 = this.b1.map((b,i)=>b - this.lr*dZ1[i]);
      return 0.5*dL*dL;
    }
  }

  function randn(){ return (Math.random()-0.5)*2; }

  let net = new NeuralNet(8, 0.05);
  let points = [];
  let currentClass = 0;
  let isTraining = false;
  let epoch = 0;
  let trainInterval = null;

  const plotCanvas = document.getElementById('plotCanvas');
  const plotCtx = plotCanvas.getContext('2d');
  const netCanvas = document.getElementById('netCanvas');
  const netCtx = netCanvas.getContext('2d');
  const toast = document.getElementById('toast');

  function showToast(msg){
    toast.textContent = msg; toast.style.display='block';
    setTimeout(()=>{toast.style.display='none';},2200);
  }

  function normX(px){ return (px/plotCanvas.width)*2-1; }
  function normY(py){ return -((py/plotCanvas.height)*2-1); }

  function drawBoundary(){
    const imgData = plotCtx.createImageData(plotCanvas.width,plotCanvas.height);
    const step = 4;
    for(let py=0;py<plotCanvas.height;py+=step){
      for(let px=0;px<plotCanvas.width;px+=step){
        const p = net.forward(normX(px),normY(py));
        const r = Math.round(p*139);
        const g = Math.round((1-p)*92);
        const b = Math.round(p*246+(1-p)*236);
        for(let dy=0;dy<step&&py+dy<plotCanvas.height;dy++){
          for(let dx=0;dx<step&&px+dx<plotCanvas.width;dx++){
            const idx=((py+dy)*plotCanvas.width+(px+dx))*4;
            imgData.data[idx]=r; imgData.data[idx+1]=g;
            imgData.data[idx+2]=b; imgData.data[idx+3]=60;
          }
        }
      }
    }
    plotCtx.putImageData(imgData,0,0);
  }

  function drawPlot(){
    plotCtx.fillStyle='#020617';
    plotCtx.fillRect(0,0,plotCanvas.width,plotCanvas.height);
    if(points.length>=4) drawBoundary();

    // Grid
    plotCtx.strokeStyle='rgba(255,255,255,0.04)';
    plotCtx.lineWidth=1;
    for(let i=0;i<=10;i++){
      const x=i/10*plotCanvas.width; const y=i/10*plotCanvas.height;
      plotCtx.beginPath(); plotCtx.moveTo(x,0); plotCtx.lineTo(x,plotCanvas.height); plotCtx.stroke();
      plotCtx.beginPath(); plotCtx.moveTo(0,y); plotCtx.lineTo(plotCanvas.width,y); plotCtx.stroke();
    }

    // Points
    points.forEach(p=>{
      plotCtx.beginPath();
      plotCtx.arc(p.px,p.py,6,0,Math.PI*2);
      plotCtx.fillStyle = p.cls===0 ? '#8b5cf6' : '#ec4899';
      plotCtx.shadowColor = p.cls===0 ? '#8b5cf6' : '#ec4899';
      plotCtx.shadowBlur = 8;
      plotCtx.fill();
      plotCtx.shadowBlur=0;
    });
  }

  function drawNet(){
    netCtx.fillStyle='#020617';
    netCtx.fillRect(0,0,netCanvas.width,netCanvas.height);
    const hiddenN = net.hiddenN;
    const layers = [2, hiddenN, 1];
    const xs = [40, netCanvas.width/2, netCanvas.width-40];
    const colors = ['#8b5cf6','#06b6d4','#ec4899'];

    layers.forEach((count,li)=>{
      const spacing = netCanvas.height/(count+1);
      for(let ni=0;ni<count;ni++){
        const cy = spacing*(ni+1);
        if(li<2){
          const nextCount=layers[li+1];
          const nextSpacing=netCanvas.height/(nextCount+1);
          const w2use = li===0 ? (net.w1[ni]||[0,0]) : [net.w2[ni]||0];
          for(let nj=0;nj<nextCount;nj++){
            const wVal = li===0 ? ((net.w1[nj]||[0,0])[ni]||0) : (net.w2[nj]||0);
            const intensity=Math.min(1,Math.abs(wVal)/2);
            netCtx.strokeStyle=wVal>0 ? \`rgba(16,185,129,\${0.15+intensity*0.6})\` : \`rgba(239,68,68,\${0.15+intensity*0.6})\`;
            netCtx.lineWidth=0.5+intensity*1.5;
            netCtx.beginPath();
            netCtx.moveTo(xs[li],cy);
            netCtx.lineTo(xs[li+1],nextSpacing*(nj+1));
            netCtx.stroke();
          }
        }
        netCtx.beginPath();
        netCtx.arc(xs[li],cy,7,0,Math.PI*2);
        netCtx.fillStyle=colors[li];
        netCtx.shadowColor=colors[li];
        netCtx.shadowBlur=8;
        netCtx.fill();
        netCtx.shadowBlur=0;
      }
    });
  }

  function trainStep(){
    if(points.length<4) return;
    let totalLoss=0;
    const shuffled=[...points].sort(()=>Math.random()-0.5);
    shuffled.forEach(p=>{
      totalLoss+=net.train(normX(p.px),normY(p.py),p.cls);
    });
    epoch++;

    // compute accuracy
    let correct=0;
    points.forEach(p=>{
      const pred=net.forward(normX(p.px),normY(p.py))>0.5?1:0;
      if(pred===p.cls) correct++;
    });

    document.getElementById('epochStat').textContent=epoch;
    document.getElementById('lossStat').textContent=(totalLoss/points.length).toFixed(4);
    document.getElementById('accStat').textContent=Math.round(correct/points.length*100)+'%';
    document.getElementById('ptsStat').textContent=points.length;

    drawPlot();
    drawNet();
  }

  plotCanvas.addEventListener('click',(e)=>{
    const rect=plotCanvas.getBoundingClientRect();
    const px=(e.clientX-rect.left)*(plotCanvas.width/rect.width);
    const py=(e.clientY-rect.top)*(plotCanvas.height/rect.height);
    points.push({px,py,cls:currentClass});
    document.getElementById('ptsStat').textContent=points.length;
    drawPlot();
    if(points.length===4) showToast("⚡ 4 points added — press Train to start!");
  });

  document.getElementById('modeA').addEventListener('click',()=>{
    currentClass=0;
    document.getElementById('modeA').style.opacity='1';
    document.getElementById('modeB').style.opacity='0.5';
  });
  document.getElementById('modeB').addEventListener('click',()=>{
    currentClass=1;
    document.getElementById('modeB').style.background='linear-gradient(90deg,#ec4899,#be185d)';
    document.getElementById('modeB').style.color='#000';
    document.getElementById('modeA').style.opacity='0.5';
  });

  document.getElementById('neuronsSlider').addEventListener('input',(e)=>{
    document.getElementById('neuronsVal').textContent=e.target.value;
    net=new NeuralNet(parseInt(e.target.value),parseFloat(document.getElementById('lrSlider').value));
    epoch=0;
  });
  document.getElementById('lrSlider').addEventListener('input',(e)=>{
    document.getElementById('lrVal').textContent=parseFloat(e.target.value).toFixed(3);
    net.lr=parseFloat(e.target.value);
  });

  document.getElementById('trainBtn').addEventListener('click',()=>{
    if(points.length<4){ showToast("⚠️ Add at least 4 points first!"); return; }
    isTraining=!isTraining;
    if(isTraining){
      trainInterval=setInterval(()=>{
        for(let i=0;i<10;i++) trainStep();
      },50);
    } else {
      clearInterval(trainInterval);
    }
  });

  document.getElementById('clearBtn').addEventListener('click',()=>{
    points=[];epoch=0;isTraining=false;clearInterval(trainInterval);
    net=new NeuralNet(parseInt(document.getElementById('neuronsSlider').value),parseFloat(document.getElementById('lrSlider').value));
    document.getElementById('epochStat').textContent='0';
    document.getElementById('lossStat').textContent='—';
    document.getElementById('accStat').textContent='—';
    document.getElementById('ptsStat').textContent='0';
    drawPlot(); drawNet();
    showToast("🗑️ Cleared! Add new training points.");
  });

  drawPlot();
  drawNet();
</script>
</body>
</html>`;

  const TX = {
    en: {
      title: '🧠 NEURAL NETWORK DECISION BOUNDARY SANDBOX',
      sub: 'Click to add data points — real backpropagation trains the network live in your browser',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Neural Sandbox loaded into editor!',
      classA: '🔵 Class A',
      classB: '🔴 Class B',
      archHdr: '⚙️ Network Architecture',
      hiddenNeurons: 'Hidden Layer Neurons',
      learningRate: 'Learning Rate',
      statsHdr: '📊 Training Stats',
      epochs: 'Epochs',
      loss: 'Loss',
      accuracy: 'Accuracy',
      points: 'Points',
      trainBtn: '⚡ Train / Pause',
      clearBtn: '🗑️ Clear All',
      netVizHdr: '🔮 Network Visualization',
      errPoints: '⚠️ Add at least 4 points first!',
      readyToTrain: '⚡ 4 points added — press Train to start!',
      cleared: '🗑️ Cleared! Add new training points.'
    },
    fr: {
      title: '🧠 SANDBOX RÉSEAU NEURONAL & FRONTIÈRE DE DÉCISION',
      sub: 'Cliquez pour ajouter des points — rétropropagation réelle en direct dans le navigateur',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Sandbox Neural chargé dans l\'éditeur !',
      classA: '🔵 Classe A',
      classB: '🔴 Classe B',
      archHdr: '⚙️ Architecture du Réseau',
      hiddenNeurons: 'Neurones Cachés',
      learningRate: 'Taux d\'Apprentissage',
      statsHdr: '📊 Statistiques d\'Entraînement',
      epochs: 'Époques',
      loss: 'Perte',
      accuracy: 'Précision',
      points: 'Points',
      trainBtn: '⚡ Entraîner / Pause',
      clearBtn: '🗑️ Tout effacer',
      netVizHdr: '🔮 Visualisation du Réseau',
      errPoints: '⚠️ Ajoutez au moins 4 points d\'abord !',
      readyToTrain: '⚡ 4 points ajoutés — appuyez sur Entraîner !',
      cleared: '🗑️ Effacé ! Ajoutez de nouveaux points.'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'neuralnet') {
      window.activeTab = 'neuralnet';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-neuralnet');
      if (btn) btn.classList.add('active');
      initNeuralNet(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initNeuralNet(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="neural-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.1));border-radius:14px;padding:14px;border:1px solid rgba(139,92,246,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #8b5cf6);">🧠</span>
          <div>
            <h2 style="margin:0;color:#a78bfa;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <button id="neural-load-full" style="width:100%;background:linear-gradient(90deg,#8b5cf6,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(139,92,246,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Class mode buttons -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
          <button id="neural-class-a" style="background:linear-gradient(90deg,#8b5cf6,#6d28d9);border:none;color:#fff;padding:8px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;">${T.classA}</button>
          <button id="neural-class-b" style="background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:8px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;">${T.classB}</button>
        </div>

        <!-- Plot canvas -->
        <div style="background:#020617;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:12px;cursor:crosshair;">
          <canvas id="neural-plot" width="360" height="260" style="width:100%;display:block;"></canvas>
        </div>

        <!-- Controls -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:12px;display:flex;flex-direction:column;gap:12px;">
          <h3 style="margin:0;font-size:11px;color:#a78bfa;text-transform:uppercase;">${T.archHdr}</h3>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.hiddenNeurons}</span>
              <span id="neural-neurons-val">8</span>
            </div>
            <input type="range" id="neural-neurons" min="2" max="16" step="1" value="8" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.learningRate}</span>
              <span id="neural-lr-val">0.050</span>
            </div>
            <input type="range" id="neural-lr" min="0.001" max="0.3" step="0.001" value="0.05" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Stats -->
          <h3 style="margin:4px 0 0;font-size:11px;color:#a78bfa;text-transform:uppercase;">${T.statsHdr}</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;padding:6px;text-align:center;">
              <div id="neural-epoch" style="font-size:16px;font-weight:900;color:#a78bfa;">0</div>
              <div style="font-size:8px;color:#94a3b8;text-transform:uppercase;">${T.epochs}</div>
            </div>
            <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;padding:6px;text-align:center;">
              <div id="neural-loss" style="font-size:16px;font-weight:900;color:#f59e0b;">—</div>
              <div style="font-size:8px;color:#94a3b8;text-transform:uppercase;">${T.loss}</div>
            </div>
            <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;padding:6px;text-align:center;">
              <div id="neural-acc" style="font-size:16px;font-weight:900;color:#10b981;">—</div>
              <div style="font-size:8px;color:#94a3b8;text-transform:uppercase;">${T.accuracy}</div>
            </div>
            <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;padding:6px;text-align:center;">
              <div id="neural-pts" style="font-size:16px;font-weight:900;color:#06b6d4;">0</div>
              <div style="font-size:8px;color:#94a3b8;text-transform:uppercase;">${T.points}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <button id="neural-train-btn" style="background:linear-gradient(90deg,#8b5cf6,#ec4899);border:none;color:#000;padding:9px;border-radius:7px;font-size:11px;font-weight:900;cursor:pointer;">${T.trainBtn}</button>
            <button id="neural-clear-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:9px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;">${T.clearBtn}</button>
          </div>
        </div>

        <!-- Network Viz -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 8px;font-size:11px;color:#a78bfa;text-transform:uppercase;">${T.netVizHdr}</h3>
          <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;overflow:hidden;height:100px;">
            <canvas id="neural-net-canvas" width="400" height="100" style="width:100%;display:block;"></canvas>
          </div>
        </div>

        <div id="neural-toast" style="display:none;text-align:center;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#a78bfa;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const plotCanvas = document.getElementById('neural-plot');
    const plotCtx = plotCanvas.getContext('2d');
    const netCanvas = document.getElementById('neural-net-canvas');
    const netCtx = netCanvas.getContext('2d');
    const toastEl = document.getElementById('neural-toast');

    let points = [];
    let currentClass = 0;
    let isTraining = false;
    let epoch = 0;
    let trainInterval = null;

    // ── Tiny Neural Net ──────────────────────────────────────
    function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
    function sigmoidD(x) { const s = sigmoid(x); return s * (1 - s); }
    function randn() { return (Math.random() - 0.5) * 2; }

    function makeNet(hiddenN, lr) {
      return {
        hiddenN, lr,
        w1: Array.from({ length: hiddenN }, () => [randn(), randn()]),
        b1: Array.from({ length: hiddenN }, () => randn() * 0.1),
        w2: Array.from({ length: hiddenN }, () => randn()),
        b2: randn() * 0.1,
        z1: [], a1: [], z2: 0, a2: 0,
        forward(x0, x1) {
          this.z1 = this.w1.map((w, i) => w[0] * x0 + w[1] * x1 + this.b1[i]);
          this.a1 = this.z1.map(sigmoid);
          this.z2 = this.a1.reduce((s, a, i) => s + this.w2[i] * a, this.b2);
          this.a2 = sigmoid(this.z2);
          return this.a2;
        },
        train(x0, x1, y) {
          const out = this.forward(x0, x1);
          const dL = out - y;
          const dZ2 = dL * sigmoidD(this.z2);
          const dW2 = this.a1.map(a => a * dZ2);
          const dA1 = this.w2.map(w => w * dZ2);
          const dZ1 = dA1.map((d, i) => d * sigmoidD(this.z1[i]));
          this.w2 = this.w2.map((w, i) => w - this.lr * dW2[i]);
          this.b2 -= this.lr * dZ2;
          this.w1 = this.w1.map((w, i) => [w[0] - this.lr * dZ1[i] * x0, w[1] - this.lr * dZ1[i] * x1]);
          this.b1 = this.b1.map((b, i) => b - this.lr * dZ1[i]);
          return 0.5 * dL * dL;
        }
      };
    }

    let net = makeNet(8, 0.05);

    function showToast(msg) {
      toastEl.textContent = msg;
      toastEl.style.display = 'block';
      setTimeout(() => { toastEl.style.display = 'none'; }, 2200);
    }

    function normX(px) { return (px / plotCanvas.width) * 2 - 1; }
    function normY(py) { return -(((py / plotCanvas.height) * 2) - 1); }

    function drawBoundary() {
      const step = 5;
      const imgData = plotCtx.createImageData(plotCanvas.width, plotCanvas.height);
      for (let py = 0; py < plotCanvas.height; py += step) {
        for (let px = 0; px < plotCanvas.width; px += step) {
          const p = net.forward(normX(px), normY(py));
          const r = Math.round(p * 139 + (1 - p) * 6);
          const g = Math.round(p * 92 + (1 - p) * 182);
          const b = Math.round(p * 246 + (1 - p) * 212);
          for (let dy = 0; dy < step && py + dy < plotCanvas.height; dy++) {
            for (let dx = 0; dx < step && px + dx < plotCanvas.width; dx++) {
              const idx = ((py + dy) * plotCanvas.width + (px + dx)) * 4;
              imgData.data[idx] = r;
              imgData.data[idx + 1] = g;
              imgData.data[idx + 2] = b;
              imgData.data[idx + 3] = 55;
            }
          }
        }
      }
      plotCtx.putImageData(imgData, 0, 0);
    }

    function drawPlot() {
      plotCtx.fillStyle = '#020617';
      plotCtx.fillRect(0, 0, plotCanvas.width, plotCanvas.height);
      if (points.length >= 4) drawBoundary();

      plotCtx.strokeStyle = 'rgba(255,255,255,0.04)';
      plotCtx.lineWidth = 1;
      for (let i = 0; i <= 8; i++) {
        const x = i / 8 * plotCanvas.width;
        const y = i / 8 * plotCanvas.height;
        plotCtx.beginPath(); plotCtx.moveTo(x, 0); plotCtx.lineTo(x, plotCanvas.height); plotCtx.stroke();
        plotCtx.beginPath(); plotCtx.moveTo(0, y); plotCtx.lineTo(plotCanvas.width, y); plotCtx.stroke();
      }

      points.forEach(p => {
        plotCtx.beginPath();
        plotCtx.arc(p.px, p.py, 5, 0, Math.PI * 2);
        plotCtx.fillStyle = p.cls === 0 ? '#8b5cf6' : '#ec4899';
        plotCtx.shadowColor = p.cls === 0 ? '#8b5cf6' : '#ec4899';
        plotCtx.shadowBlur = 10;
        plotCtx.fill();
        plotCtx.shadowBlur = 0;
      });
    }

    function drawNet() {
      netCtx.fillStyle = '#020617';
      netCtx.fillRect(0, 0, netCanvas.width, netCanvas.height);
      const h = net.hiddenN;
      const xs = [30, netCanvas.width / 2, netCanvas.width - 30];
      const counts = [2, h, 1];
      const cols = ['#8b5cf6', '#06b6d4', '#ec4899'];

      counts.forEach((count, li) => {
        const sp = netCanvas.height / (count + 1);
        for (let ni = 0; ni < count; ni++) {
          const cy = sp * (ni + 1);
          if (li < 2) {
            const nc = counts[li + 1];
            const nsp = netCanvas.height / (nc + 1);
            for (let nj = 0; nj < nc; nj++) {
              const w = li === 0 ? (net.w1[nj] || [0, 0])[ni] : (net.w2[nj] || 0);
              const intensity = Math.min(1, Math.abs(w) / 2);
              netCtx.strokeStyle = w > 0 ? `rgba(16,185,129,${0.1 + intensity * 0.7})` : `rgba(239,68,68,${0.1 + intensity * 0.7})`;
              netCtx.lineWidth = 0.5 + intensity * 1.5;
              netCtx.beginPath();
              netCtx.moveTo(xs[li], cy);
              netCtx.lineTo(xs[li + 1], nsp * (nj + 1));
              netCtx.stroke();
            }
          }
          netCtx.beginPath();
          netCtx.arc(xs[li], cy, 6, 0, Math.PI * 2);
          netCtx.fillStyle = cols[li];
          netCtx.shadowColor = cols[li];
          netCtx.shadowBlur = 8;
          netCtx.fill();
          netCtx.shadowBlur = 0;
        }
      });
    }

    function trainStep() {
      if (points.length < 4) return;
      let totalLoss = 0;
      const shuffled = [...points].sort(() => Math.random() - 0.5);
      shuffled.forEach(p => {
        totalLoss += net.train(normX(p.px), normY(p.py), p.cls);
      });
      epoch++;

      let correct = 0;
      points.forEach(p => {
        if ((net.forward(normX(p.px), normY(p.py)) > 0.5 ? 1 : 0) === p.cls) correct++;
      });

      document.getElementById('neural-epoch').textContent = epoch;
      document.getElementById('neural-loss').textContent = (totalLoss / points.length).toFixed(4);
      document.getElementById('neural-acc').textContent = Math.round(correct / points.length * 100) + '%';
      document.getElementById('neural-pts').textContent = points.length;

      drawPlot();
      drawNet();
    }

    plotCanvas.addEventListener('click', (e) => {
      const rect = plotCanvas.getBoundingClientRect();
      const scaleX = plotCanvas.width / rect.width;
      const scaleY = plotCanvas.height / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;
      points.push({ px, py, cls: currentClass });
      document.getElementById('neural-pts').textContent = points.length;
      drawPlot();
      if (points.length === 4) showToast(T.readyToTrain);
    });

    document.getElementById('neural-class-a').addEventListener('click', () => {
      currentClass = 0;
      document.getElementById('neural-class-a').style.opacity = '1';
      document.getElementById('neural-class-b').style.background = '#1e293b';
      document.getElementById('neural-class-b').style.color = '#f8fafc';
    });

    document.getElementById('neural-class-b').addEventListener('click', () => {
      currentClass = 1;
      document.getElementById('neural-class-b').style.background = 'linear-gradient(90deg,#ec4899,#be185d)';
      document.getElementById('neural-class-b').style.color = '#000';
      document.getElementById('neural-class-a').style.opacity = '0.5';
    });

    document.getElementById('neural-neurons').addEventListener('input', (e) => {
      document.getElementById('neural-neurons-val').textContent = e.target.value;
      net = makeNet(parseInt(e.target.value), parseFloat(document.getElementById('neural-lr').value));
      epoch = 0;
      drawNet();
    });

    document.getElementById('neural-lr').addEventListener('input', (e) => {
      document.getElementById('neural-lr-val').textContent = parseFloat(e.target.value).toFixed(3);
      net.lr = parseFloat(e.target.value);
    });

    document.getElementById('neural-train-btn').addEventListener('click', () => {
      if (points.length < 4) { showToast(T.errPoints); return; }
      isTraining = !isTraining;
      if (isTraining) {
        trainInterval = setInterval(() => { for (let i = 0; i < 10; i++) trainStep(); }, 50);
      } else {
        clearInterval(trainInterval);
      }
    });

    document.getElementById('neural-clear-btn').addEventListener('click', () => {
      points = []; epoch = 0; isTraining = false; clearInterval(trainInterval);
      net = makeNet(parseInt(document.getElementById('neural-neurons').value), parseFloat(document.getElementById('neural-lr').value));
      ['neural-epoch', 'neural-loss', 'neural-acc'].forEach(id => {
        document.getElementById(id).textContent = id === 'neural-epoch' ? '0' : '—';
      });
      document.getElementById('neural-pts').textContent = '0';
      drawPlot(); drawNet();
      showToast(T.cleared);
    });

    document.getElementById('neural-load-full').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    drawPlot();
    drawNet();

    if (window.showToast) window.showToast('✅ Neural Sandbox initialized.');
  }
})();
