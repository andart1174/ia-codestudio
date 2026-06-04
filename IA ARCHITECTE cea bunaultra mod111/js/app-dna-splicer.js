// 🧬 APP DNA SPLICER — IA Architecte Studio Module
// Tab ID: appdnasplicer
// Author: IA Architecte Studio
// Bilingual EN/FR | Full browser-native functionality

(function () {
  'use strict';

  /* =========================================================
     STANDALONE TEMPLATE
  ========================================================= */
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>🧬 App DNA Splicer</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#020617;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden;}
:root{--accent:#00f5ff;--accent2:#bf00ff;--accent3:#00ff88;--warn:#ffaa00;--danger:#ff3366;--card:#0d1929;--border:#1e3a5f;}
.dna-wrap{max-width:1400px;margin:0 auto;padding:24px;}
h1{text-align:center;font-size:2rem;font-weight:900;background:linear-gradient(135deg,#00f5ff,#bf00ff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;}
.subtitle{text-align:center;color:#64748b;margin-bottom:32px;font-size:0.9rem;}
/* --- layout same as module --- */
.inputs-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.panel{background:#0d1929;border:1px solid #1e3a5f;border-radius:16px;padding:20px;}
.panel h3{font-size:1rem;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
textarea{width:100%;height:200px;background:#020617;border:1px solid #1e3a5f;border-radius:8px;color:#94a3b8;font-family:'JetBrains Mono',monospace;font-size:0.75rem;padding:12px;resize:vertical;outline:none;transition:border-color .2s;}
textarea:focus{border-color:#00f5ff;}
.btn-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:28px;}
.btn{padding:10px 22px;border:none;border-radius:8px;font-family:'Inter',sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px;}
.btn-primary{background:linear-gradient(135deg,#00f5ff,#0080ff);color:#000;}
.btn-primary:hover{filter:brightness(1.2);transform:translateY(-1px);}
.btn-splice{background:linear-gradient(135deg,#bf00ff,#ff3366);color:#fff;}
.btn-splice:hover{filter:brightness(1.2);transform:translateY(-1px);}
.btn-gen{background:linear-gradient(135deg,#00ff88,#00bfff);color:#000;}
.btn-gen:hover{filter:brightness(1.2);transform:translateY(-1px);}
.btn-load{background:#1e3a5f;color:#00f5ff;border:1px solid #00f5ff;}
.btn-load:hover{background:#00f5ff;color:#000;}
.btn-preset{background:#0d1929;border:1px solid #1e3a5f;color:#94a3b8;padding:8px 14px;font-size:0.78rem;}
.btn-preset:hover{border-color:#00f5ff;color:#00f5ff;}
.dna-section{margin-bottom:28px;}
.dna-section h2{font-size:1.1rem;font-weight:700;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid #1e3a5f;}
.dna-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.gene-card{background:#020617;border:1px solid #1e3a5f;border-radius:12px;padding:16px;}
.gene-card h4{font-size:0.8rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;}
.swatches{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;}
.swatch{width:36px;height:36px;border-radius:8px;border:2px solid rgba(255,255,255,0.1);cursor:pointer;position:relative;transition:transform .2s;}
.swatch:hover{transform:scale(1.15);}
.swatch-label{font-size:0.65rem;color:#64748b;word-break:break-all;}
.font-tag{display:inline-block;background:#0d1929;border:1px solid #1e3a5f;border-radius:6px;padding:4px 10px;font-size:0.75rem;color:#94a3b8;margin:3px;}
.metric-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #0d1929;}
.metric-row:last-child{border-bottom:none;}
.metric-key{font-size:0.78rem;color:#64748b;}
.metric-val{font-size:0.78rem;font-weight:600;color:#00f5ff;}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.72rem;font-weight:600;}
.badge-sharp{background:#1e3a5f;color:#94a3b8;}
.badge-rounded{background:#0d2a1a;color:#00ff88;}
.badge-pill{background:#1a0d2a;color:#bf00ff;}
.badge-fast{background:#0d2a1a;color:#00ff88;}
.badge-medium{background:#2a1a0d;color:#ffaa00;}
.badge-slow{background:#2a0d0d;color:#ff3366;}
.slider-wrap{display:flex;align-items:center;gap:12px;margin:12px 0;}
.slider-wrap label{font-size:0.8rem;color:#64748b;white-space:nowrap;}
input[type=range]{-webkit-appearance:none;flex:1;height:6px;background:linear-gradient(90deg,#00f5ff,#bf00ff);border-radius:3px;outline:none;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;border:3px solid #00f5ff;cursor:pointer;}
.hybrid-card{background:linear-gradient(135deg,rgba(0,245,255,0.05),rgba(191,0,255,0.05));border:1px solid;border-image:linear-gradient(135deg,#00f5ff,#bf00ff) 1;border-radius:12px;padding:20px;margin-bottom:16px;}
.hybrid-card h4{font-size:0.9rem;font-weight:700;background:linear-gradient(135deg,#00f5ff,#bf00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px;}
.css-output{background:#020617;border:1px solid #1e3a5f;border-radius:8px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#94a3b8;white-space:pre;overflow-x:auto;max-height:400px;overflow-y:auto;}
.css-output .tok-var{color:#00f5ff;}
.css-output .tok-val{color:#00ff88;}
.css-output .tok-comment{color:#334155;}
.empty-state{text-align:center;padding:40px;color:#334155;font-size:0.9rem;}
.toast{position:fixed;bottom:24px;right:24px;background:#0d1929;border:1px solid #00f5ff;border-radius:10px;padding:12px 20px;color:#00f5ff;font-size:0.85rem;font-weight:600;z-index:9999;animation:toastIn .3s ease;}
@keyframes toastIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.dna-helix{display:flex;justify-content:center;margin:16px 0;}
.helix-svg{width:60px;height:80px;}
@media(max-width:768px){.inputs-row,.dna-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div class="dna-wrap">
  <h1>🧬 App DNA Splicer</h1>
  <p class="subtitle">Extract, analyse &amp; hybridize design systems from any app's CSS</p>
  <div style="text-align:center;margin-bottom:16px;">
    <span style="font-size:0.8rem;color:#64748b;margin-right:8px;">Presets:</span>
    <button class="btn btn-preset" onclick="loadPreset('apple-cyber')">🍎 Apple + Cyberpunk</button>
    <button class="btn btn-preset" onclick="loadPreset('stripe-neon')">💳 Stripe + Neon</button>
    <button class="btn btn-preset" onclick="loadPreset('notion-matrix')">📝 Notion + Matrix</button>
  </div>
  <div class="inputs-row">
    <div class="panel">
      <h3>🅰️ App A — CSS/HTML</h3>
      <textarea id="cssA" placeholder="Paste App A CSS or HTML here..."></textarea>
    </div>
    <div class="panel">
      <h3>🅱️ App B — CSS/HTML</h3>
      <textarea id="cssB" placeholder="Paste App B CSS or HTML here..."></textarea>
    </div>
  </div>
  <div class="btn-row">
    <button class="btn btn-primary" onclick="extractDNA()">🔬 Extract DNA</button>
    <button class="btn btn-splice" onclick="spliceDNA()">⚡ Splice!</button>
    <button class="btn btn-gen" onclick="generateCSS()">🎨 Generate Hybrid Design System</button>
  </div>
  <div class="slider-wrap" style="max-width:500px;margin:0 auto 24px;">
    <label>🅰️ Dominance</label>
    <input type="range" id="spliceRatio" min="0" max="100" value="50" oninput="updateRatioLabel()"/>
    <label id="ratioLabel">50/50</label>
    <label>🅱️ Dominance</label>
  </div>
  <div id="dnaSection" class="dna-section" style="display:none;">
    <h2>🧬 Extracted DNA</h2>
    <div class="dna-grid" id="dnaGrid"></div>
  </div>
  <div id="hybridSection" class="dna-section" style="display:none;">
    <h2>⚡ Hybrid DNA</h2>
    <div id="hybridGrid"></div>
  </div>
  <div id="cssSection" class="dna-section" style="display:none;">
    <h2>🎨 Generated CSS Design System</h2>
    <div class="css-output" id="cssOutput"></div>
  </div>
</div>
<${'script'}>
const PRESETS = {
  'apple-cyber': {
    a: \`:root { --color-primary: #0071e3; --color-bg: #ffffff; --color-text: #1d1d1f; --color-accent: #06c; --radius: 12px; --font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; --transition: 0.3s ease; --shadow: 0 4px 12px rgba(0,0,0,0.1); }
body { background: #ffffff; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; }
.btn { background: #0071e3; color: #fff; border-radius: 12px; padding: 12px 24px; font-size: 16px; border: none; transition: 0.3s ease; }
.card { background: #f5f5f7; border-radius: 18px; padding: 24px; margin: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
h1 { font-size: 48px; font-weight: 700; letter-spacing: -0.02em; color: #1d1d1f; }
.hero { padding: 80px 40px; background: linear-gradient(180deg, #fbfbfd 0%, #fff 100%); }\`,
    b: \`:root { --neon: #00f5ff; --neon2: #bf00ff; --bg: #020617; --card-bg: #0d1929; --border: #1e3a5f; --radius: 4px; --font: 'Orbitron', monospace; --speed: 0.1s; }
body { background: #020617; color: #00f5ff; font-family: 'Orbitron', monospace; }
.btn { background: transparent; color: #00f5ff; border: 2px solid #00f5ff; border-radius: 2px; padding: 10px 20px; text-transform: uppercase; transition: 0.1s; box-shadow: 0 0 20px #00f5ff44; }
.card { background: #0d1929; border: 1px solid #1e3a5f; border-radius: 4px; padding: 20px; box-shadow: 0 0 30px rgba(0,245,255,0.1); }
h1 { font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; text-shadow: 0 0 20px #00f5ff; }
.hero { background: radial-gradient(ellipse at center, #0d1929 0%, #020617 100%); border-bottom: 1px solid #1e3a5f; }\`
  },
  'stripe-neon': {
    a: \`:root { --color-primary: #635bff; --color-secondary: #0a2540; --color-bg: #ffffff; --color-accent: #00d4ff; --radius: 8px; --font: "Söhne", ui-sans-serif, system-ui, sans-serif; --transition: 0.2s cubic-bezier(0.25,0.46,0.45,0.94); }
body { background: #fff; color: #0a2540; font-family: "Söhne", ui-sans-serif, system-ui, sans-serif; }
.btn { background: #635bff; color: #fff; border-radius: 6px; padding: 10px 20px; font-weight: 600; transition: 0.2s; }
.card { background: #fff; border: 1px solid #e6ebf1; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(10,37,64,0.08); }
h1 { font-size: 56px; font-weight: 700; color: #0a2540; line-height: 1.1; }
input { border: 1px solid #e6ebf1; border-radius: 6px; padding: 10px 14px; font-size: 15px; }\`,
    b: \`:root { --glow: #ff00aa; --glow2: #ffcc00; --bg: #0a000f; --card: #140020; --border: #3d0060; --radius: 0px; --font: 'Share Tech Mono', monospace; --speed: 0.05s; }
body { background: #0a000f; color: #ff00aa; font-family: 'Share Tech Mono', monospace; }
.btn { background: #ff00aa22; border: 1px solid #ff00aa; color: #ff00aa; border-radius: 0; padding: 12px 24px; text-transform: uppercase; letter-spacing: 0.15em; box-shadow: 0 0 25px #ff00aa55, inset 0 0 15px #ff00aa11; transition: 0.05s; }
.card { background: #140020; border: 1px solid #3d0060; border-radius: 0; box-shadow: 0 0 40px rgba(255,0,170,0.15); }
h1 { font-size: 40px; text-shadow: 0 0 30px #ff00aa, 0 0 60px #ff00aa44; letter-spacing: 0.08em; text-transform: uppercase; }
input { background: #0a000f; border: 1px solid #ff00aa44; border-radius: 0; color: #ff00aa; font-family: 'Share Tech Mono', monospace; }\`
  },
  'notion-matrix': {
    a: \`:root { --color-primary: #2eaadc; --color-bg: #ffffff; --color-text: #37352f; --color-border: #e9e9e7; --radius: 3px; --font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; --transition: 0.1s ease; }
body { background: #fff; color: #37352f; font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif; }
.btn { background: transparent; border: 1px solid #e9e9e7; border-radius: 3px; color: #37352f; padding: 6px 12px; font-size: 14px; transition: 0.1s; }
.btn:hover { background: #f7f7f5; }
.card { background: #fff; border: 1px solid #e9e9e7; border-radius: 3px; padding: 16px; }
h1 { font-size: 40px; font-weight: 700; color: #37352f; margin-bottom: 16px; }
p { font-size: 16px; line-height: 1.65; color: #37352f; margin-bottom: 12px; }\`,
    b: \`:root { --matrix: #00ff41; --matrix2: #003b00; --bg: #000000; --card: #001100; --border: #003300; --radius: 0px; --font: 'Courier New', Courier, monospace; --speed: 0.05s; }
body { background: #000; color: #00ff41; font-family: 'Courier New', Courier, monospace; }
.btn { background: #001100; border: 1px solid #00ff41; color: #00ff41; border-radius: 0; padding: 8px 16px; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.05s; }
.btn:hover { background: #003b00; box-shadow: 0 0 20px #00ff4155; }
.card { background: #001100; border: 1px solid #003300; border-radius: 0; padding: 16px; box-shadow: 0 0 30px rgba(0,255,65,0.1); }
h1 { font-size: 36px; color: #00ff41; text-shadow: 0 0 20px #00ff41; letter-spacing: 0.05em; }
p { font-size: 14px; line-height: 1.8; color: #00cc33; }\`
  }
};

let dnaA = null, dnaB = null, hybridDNA = null;

function showToast(msg, dur=2800) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), dur);
}

function loadPreset(key) {
  const p = PRESETS[key];
  document.getElementById('cssA').value = p.a;
  document.getElementById('cssB').value = p.b;
  showToast('✅ Preset loaded!');
}

function updateRatioLabel() {
  const v = document.getElementById('spliceRatio').value;
  document.getElementById('ratioLabel').textContent = v + '/' + (100-v);
}

/* ---- DNA Extraction ---- */
function extractDNA() {
  const a = document.getElementById('cssA').value;
  const b = document.getElementById('cssB').value;
  if (!a.trim() && !b.trim()) { showToast('⚠️ Please paste CSS into at least one panel.'); return; }
  dnaA = parseDNA(a, 'A');
  dnaB = parseDNA(b, 'B');
  const grid = document.getElementById('dnaGrid');
  grid.innerHTML = '';
  grid.appendChild(renderDNAColumn(dnaA, '🅰️ App A'));
  grid.appendChild(renderDNAColumn(dnaB, '🅱️ App B'));
  document.getElementById('dnaSection').style.display = 'block';
  document.getElementById('hybridSection').style.display = 'none';
  document.getElementById('cssSection').style.display = 'none';
  showToast('🔬 DNA extracted!');
}

function parseDNA(css, label) {
  return {
    label,
    colors: extractColors(css),
    fonts: extractFonts(css),
    spacing: extractSpacing(css),
    borderRadius: extractBorderRadius(css),
    animations: extractAnimations(css),
    typography: extractTypography(css)
  };
}

function extractColors(css) {
  const found = [];
  // hex
  const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g;
  let m;
  while ((m = hexRe.exec(css)) !== null) {
    const hex = m[0].length === 4 ? '#' + m[1][0]+m[1][0]+m[1][1]+m[1][1]+m[1][2]+m[1][2] : m[0];
    found.push(hex.toLowerCase());
  }
  // rgb/rgba
  const rgbRe = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;
  while ((m = rgbRe.exec(css)) !== null) {
    found.push(rgbToHex(parseInt(m[1]),parseInt(m[2]),parseInt(m[3])));
  }
  // hsl/hsla
  const hslRe = /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/g;
  while ((m = hslRe.exec(css)) !== null) {
    found.push(hslToHex(parseFloat(m[1]),parseFloat(m[2]),parseFloat(m[3])));
  }
  // dedupe & cluster
  const unique = [...new Set(found)].filter(c => c !== '#000000' && c !== '#ffffff' && c !== '#000' && c !== '#fff');
  return clusterColors(unique);
}

function rgbToHex(r,g,b) {
  return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
}

function hslToHex(h,s,l) {
  s/=100; l/=100;
  const a = s*Math.min(l,1-l);
  const f = n => { const k=(n+h/30)%12; const c=l-a*Math.max(Math.min(k-3,9-k,1),-1); return Math.round(255*c).toString(16).padStart(2,'0'); };
  return '#'+f(0)+f(8)+f(4);
}

function hexToHsl(hex) {
  let r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}
  return [Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}

function clusterColors(hexList) {
  if (!hexList.length) return {primary:[], secondary:[], accent:[], bg:[]};
  const withHsl = hexList.map(h=>({hex:h,hsl:hexToHsl(h)}));
  const bg = withHsl.filter(c=>c.hsl[1]<15 && c.hsl[2]<25).map(c=>c.hex);
  const light = withHsl.filter(c=>c.hsl[2]>75 && c.hsl[1]<20).map(c=>c.hex);
  const vivid = withHsl.filter(c=>c.hsl[1]>50 && c.hsl[2]>20 && c.hsl[2]<80);
  vivid.sort((a,b)=>b.hsl[1]-a.hsl[1]);
  return {
    primary: vivid.slice(0,3).map(c=>c.hex),
    secondary: vivid.slice(3,6).map(c=>c.hex),
    accent: withHsl.filter(c=>c.hsl[1]>40 && c.hsl[2]>60).slice(0,3).map(c=>c.hex),
    bg: [...bg, ...light].slice(0,3)
  };
}

function extractFonts(css) {
  const re = /font-family\s*:\s*([^;}\n]+)/gi;
  const found = new Set();
  let m;
  while ((m = re.exec(css)) !== null) {
    m[1].split(',').forEach(f => {
      const clean = f.trim().replace(/["']/g,'').split(/\s+/)[0];
      if (clean && clean.length > 1) found.add(clean);
    });
  }
  return [...found].slice(0, 6);
}

function extractSpacing(css) {
  const re = /(?:margin|padding)(?:-(?:top|bottom|left|right|block|inline))?\s*:\s*([^;}\n]+)/gi;
  const vals = [];
  let m;
  while ((m = re.exec(css)) !== null) {
    m[1].split(/\s+/).forEach(v => {
      const n = parseFloat(v);
      if (!isNaN(n) && n > 0 && n < 200) vals.push(n);
    });
  }
  if (!vals.length) return {values:[], base:8, rhythm:'Unknown'};
  const sorted = [...new Set(vals)].sort((a,b)=>a-b);
  // Find GCD-like base unit
  let base = sorted[0] || 4;
  for (let b2=1; b2<=16; b2++) {
    const fits = sorted.filter(v=>v%b2<1).length;
    if (fits >= sorted.length*0.6) { base=b2; }
  }
  return {values: sorted.slice(0,8), base, rhythm: base+'px grid'};
}

function extractBorderRadius(css) {
  const re = /border-radius\s*:\s*([^;}\n]+)/gi;
  const vals = [];
  let m;
  while ((m = re.exec(css)) !== null) {
    const v = parseFloat(m[1]);
    if (!isNaN(v)) vals.push(v);
  }
  if (!vals.length) return {values:[], style:'Unknown', badge:'badge-rounded'};
  const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
  let style, badge;
  if (avg <= 3) { style='Sharp (Angular)'; badge='badge-sharp'; }
  else if (avg <= 10) { style='Rounded'; badge='badge-rounded'; }
  else { style='Pill / Soft'; badge='badge-pill'; }
  return {values: vals.slice(0,6), avg: Math.round(avg), style, badge};
}

function extractAnimations(css) {
  const re = /(?:transition|animation)[^:]*:\s*([^;}\n]+)/gi;
  const durations = [];
  let m;
  while ((m = re.exec(css)) !== null) {
    const durRe = /([\d.]+)(ms|s)/gi;
    let dm;
    while ((dm = durRe.exec(m[1])) !== null) {
      const ms = dm[2]==='s' ? parseFloat(dm[1])*1000 : parseFloat(dm[1]);
      if (ms > 0) durations.push(ms);
    }
  }
  if (!durations.length) return {values:[], avg:200, style:'Medium', badge:'badge-medium'};
  const avg = Math.round(durations.reduce((a,b)=>a+b,0)/durations.length);
  let style, badge;
  if (avg < 150) { style='Fast / Snappy'; badge='badge-fast'; }
  else if (avg <= 400) { style='Medium'; badge='badge-medium'; }
  else { style='Slow / Cinematic'; badge='badge-slow'; }
  return {values: durations.slice(0,6).map(d=>d+'ms'), avg, style, badge};
}

function extractTypography(css) {
  const re = /font-size\s*:\s*([^;}\n]+)/gi;
  const sizes = [];
  let m;
  while ((m = re.exec(css)) !== null) {
    const v = parseFloat(m[1]);
    if (!isNaN(v) && v > 0) sizes.push(v);
  }
  const unique = [...new Set(sizes)].sort((a,b)=>a-b);
  let ratio = 1.25;
  if (unique.length >= 2) {
    const ratios = [];
    for (let i=1;i<unique.length;i++) if (unique[i]>0&&unique[i-1]>0) ratios.push(unique[i]/unique[i-1]);
    const avg = ratios.reduce((a,b)=>a+b,0)/(ratios.length||1);
    ratio = Math.round(avg*100)/100;
  }
  return {sizes: unique.slice(0,8), ratio, scale: ratio < 1.15 ? 'Minor Second' : ratio < 1.2 ? 'Major Second' : ratio < 1.3 ? 'Minor Third' : ratio < 1.4 ? 'Major Third' : ratio < 1.5 ? 'Perfect Fourth' : 'Golden Ratio'};
}

/* ---- Render DNA column ---- */
function renderDNAColumn(dna, title) {
  const col = document.createElement('div');
  col.className = 'gene-card';
  col.style.display='grid';col.style.gap='16px';

  const header = document.createElement('h3');
  header.style.cssText='font-size:1rem;font-weight:700;margin-bottom:4px;';
  header.textContent = title + ' DNA';
  col.appendChild(header);

  // Colors
  const colorCard = makeGeneCard('🎨 Color Palette');
  const roles = ['primary','secondary','accent','bg'];
  roles.forEach(role => {
    if (!dna.colors[role] || !dna.colors[role].length) return;
    const roleLabel = document.createElement('div');
    roleLabel.style.cssText='font-size:0.7rem;color:#64748b;margin-top:8px;text-transform:uppercase;letter-spacing:0.05em;';
    roleLabel.textContent = role;
    colorCard.appendChild(roleLabel);
    const sw = document.createElement('div');
    sw.className='swatches';
    dna.colors[role].forEach(hex => {
      const s = document.createElement('div');
      s.className='swatch';
      s.style.background=hex;
      s.title=hex;
      s.onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(hex).then(()=>showToast('📋 '+hex+' copied'));
      const lbl = document.createElement('div');
      lbl.className='swatch-label';lbl.textContent=hex;
      const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:2px;';
      wrap.appendChild(s);wrap.appendChild(lbl);
      sw.appendChild(wrap);
    });
    colorCard.appendChild(sw);
  });
  col.appendChild(colorCard);

  // Fonts
  const fontCard = makeGeneCard('🔤 Typography');
  dna.fonts.forEach(f => {
    const tag = document.createElement('span');
    tag.className='font-tag';tag.textContent=f;fontCard.appendChild(tag);
  });
  if (!dna.fonts.length) fontCard.innerHTML += '<span style="color:#334155;font-size:0.8rem;">No font-family found</span>';
  const tsRow = document.createElement('div');
  tsRow.style.marginTop='8px';
  tsRow.innerHTML='<div class="metric-row"><span class="metric-key">Sizes found</span><span class="metric-val">'+dna.typography.sizes.join(', ')+'</span></div><div class="metric-row"><span class="metric-key">Scale ratio</span><span class="metric-val">'+dna.typography.ratio+' ('+dna.typography.scale+')</span></div>';
  fontCard.appendChild(tsRow);
  col.appendChild(fontCard);

  // Spacing
  const spCard = makeGeneCard('📐 Spacing Rhythm');
  spCard.innerHTML += '<div class="metric-row"><span class="metric-key">Base unit</span><span class="metric-val">'+dna.spacing.base+'px</span></div>';
  spCard.innerHTML += '<div class="metric-row"><span class="metric-key">Rhythm</span><span class="metric-val">'+dna.spacing.rhythm+'</span></div>';
  spCard.innerHTML += '<div class="metric-row"><span class="metric-key">Values</span><span class="metric-val">'+dna.spacing.values.map(v=>v+'px').join(' ')||'—'+'</span></div>';
  col.appendChild(spCard);

  // Border radius
  const brCard = makeGeneCard('🔘 Border Radius Style');
  brCard.innerHTML += '<div class="metric-row"><span class="metric-key">Avg radius</span><span class="metric-val">'+dna.borderRadius.avg+'px</span></div>';
  brCard.innerHTML += '<div class="metric-row"><span class="metric-key">Style</span><span class="metric-val"><span class="badge '+dna.borderRadius.badge+'">'+dna.borderRadius.style+'</span></span></div>';
  col.appendChild(brCard);

  // Animations
  const animCard = makeGeneCard('⚡ Animation Style');
  animCard.innerHTML += '<div class="metric-row"><span class="metric-key">Avg duration</span><span class="metric-val">'+dna.animations.avg+'ms</span></div>';
  animCard.innerHTML += '<div class="metric-row"><span class="metric-key">Style</span><span class="metric-val"><span class="badge '+dna.animations.badge+'">'+dna.animations.style+'</span></span></div>';
  col.appendChild(animCard);

  return col;
}

function makeGeneCard(title) {
  const card = document.createElement('div');
  card.className='gene-card';
  const h = document.createElement('h4');
  h.textContent=title; card.appendChild(h);
  return card;
}

/* ---- Splice! ---- */
function spliceDNA() {
  if (!dnaA || !dnaB) { extractDNA(); return; }
  const ratio = parseInt(document.getElementById('spliceRatio').value)/100;
  hybridDNA = {
    colors: spliceColors(dnaA.colors, dnaB.colors, ratio),
    fonts: spliceFonts(dnaA.fonts, dnaB.fonts, ratio),
    spacing: spliceSpacing(dnaA.spacing, dnaB.spacing, ratio),
    borderRadius: spliceRadius(dnaA.borderRadius, dnaB.borderRadius, ratio),
    animations: spliceAnimations(dnaA.animations, dnaB.animations, ratio),
    typography: spliceTypography(dnaA.typography, dnaB.typography, ratio),
    ratio
  };
  renderHybrid(hybridDNA, ratio);
  document.getElementById('hybridSection').style.display='block';
  showToast('⚡ DNAs spliced!');
}

function spliceColors(ca, cb, ratio) {
  // ratio=1 → all A, ratio=0 → all B
  const pick = (arrA, arrB) => ratio >= 0.5 ? [...(arrA||[]), ...(arrB||[])].slice(0,3) : [...(arrB||[]), ...(arrA||[])].slice(0,3);
  return {
    primary: ratio >= 0.5 ? (ca.primary||[]).slice(0,2).concat((cb.primary||[]).slice(0,1)) : (cb.primary||[]).slice(0,2).concat((ca.primary||[]).slice(0,1)),
    secondary: ratio >= 0.5 ? (cb.secondary||[]).slice(0,2).concat((ca.secondary||[]).slice(0,1)) : (ca.secondary||[]).slice(0,2).concat((cb.secondary||[]).slice(0,1)),
    accent: pick(ca.accent, cb.accent),
    bg: ratio >= 0.5 ? (ca.bg||[]).slice(0,2) : (cb.bg||[]).slice(0,2)
  };
}

function spliceFonts(fa, fb, ratio) {
  const primary = ratio >= 0.5 ? fa[0] : fb[0];
  const secondary = ratio >= 0.5 ? (fb[0]||fa[1]) : (fa[0]||fb[1]);
  return [...new Set([primary, secondary, ...(ratio>=0.5?fa:fb), ...(ratio>=0.5?fb:fa)].filter(Boolean))].slice(0,4);
}

function spliceSpacing(sa, sb, ratio) {
  const base = Math.round(sa.base * ratio + sb.base * (1-ratio));
  const values = [base, base*2, base*3, base*4, base*6, base*8];
  return {values, base, rhythm: base+'px grid (hybrid)'};
}

function spliceRadius(ra, rb, ratio) {
  const avg = Math.round((ra.avg||4)*ratio + (rb.avg||4)*(1-ratio));
  let style, badge;
  if (avg <= 3) { style='Sharp (Angular)'; badge='badge-sharp'; }
  else if (avg <= 10) { style='Rounded'; badge='badge-rounded'; }
  else { style='Pill / Soft'; badge='badge-pill'; }
  return {avg, style, badge, values:[avg, avg*2, avg*3]};
}

function spliceAnimations(aa, ab, ratio) {
  const avg = Math.round(aa.avg*ratio + ab.avg*(1-ratio));
  let style, badge;
  if (avg < 150) { style='Fast / Snappy'; badge='badge-fast'; }
  else if (avg <= 400) { style='Medium'; badge='badge-medium'; }
  else { style='Slow / Cinematic'; badge='badge-slow'; }
  return {avg, style, badge, values:[avg+'ms', Math.round(avg*1.5)+'ms', Math.round(avg*2)+'ms']};
}

function spliceTypography(ta, tb, ratio) {
  const ratio2 = ta.ratio*ratio + tb.ratio*(1-ratio);
  const baseSize = 16;
  const sizes = [Math.round(baseSize/ratio2), baseSize, Math.round(baseSize*ratio2), Math.round(baseSize*ratio2*ratio2), Math.round(baseSize*ratio2**3)];
  const scales = ['Minor Second','Major Second','Minor Third','Major Third','Perfect Fourth','Golden Ratio'];
  const scale = ratio2 < 1.15?'Minor Second':ratio2<1.2?'Major Second':ratio2<1.3?'Minor Third':ratio2<1.4?'Major Third':ratio2<1.5?'Perfect Fourth':'Golden Ratio';
  return {sizes, ratio: Math.round(ratio2*100)/100, scale};
}

function renderHybrid(dna, ratio) {
  const grid = document.getElementById('hybridGrid');
  grid.innerHTML = '';

  const card = document.createElement('div');
  card.className='hybrid-card';
  card.innerHTML = '<h4>🧬 Hybrid DNA ('+Math.round(ratio*100)+'% A / '+Math.round((1-ratio)*100)+'% B)</h4>';

  // Colors
  const colorSec = document.createElement('div');
  colorSec.innerHTML='<h4 style="font-size:0.8rem;color:#64748b;margin-bottom:8px;">🎨 Hybrid Color Palette</h4>';
  ['primary','secondary','accent','bg'].forEach(role => {
    if (!dna.colors[role]||!dna.colors[role].length) return;
    const row = document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:8px;';
    const lbl=document.createElement('span');
    lbl.style.cssText='font-size:0.7rem;color:#64748b;width:80px;text-transform:uppercase;';
    lbl.textContent=role;
    row.appendChild(lbl);
    const sw=document.createElement('div');sw.style.cssText='display:flex;gap:6px;';
    dna.colors[role].forEach(hex=>{
      const s=document.createElement('div');
      s.style.cssText='width:30px;height:30px;border-radius:6px;background:'+hex+';border:2px solid rgba(255,255,255,0.1);cursor:pointer;';
      s.title=hex;
      s.onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(hex).then(()=>showToast('📋 Copied '+hex));
      sw.appendChild(s);
    });
    row.appendChild(sw);
    colorSec.appendChild(row);
  });
  card.appendChild(colorSec);

  // Metrics
  const metrics = document.createElement('div');
  metrics.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;';
  const items = [
    ['🔤 Primary Font', dna.fonts[0]||'—'],
    ['🔤 Secondary Font', dna.fonts[1]||'—'],
    ['📐 Base Spacing', dna.spacing.base+'px'],
    ['🔘 Border Radius', dna.borderRadius.avg+'px ('+dna.borderRadius.style+')'],
    ['⚡ Animation Speed', dna.animations.avg+'ms ('+dna.animations.style+')'],
    ['📝 Type Ratio', dna.typography.ratio+' ('+dna.typography.scale+')']
  ];
  items.forEach(([k,v])=>{
    const m=document.createElement('div');
    m.className='metric-row';
    m.innerHTML='<span class="metric-key">'+k+'</span><span class="metric-val">'+v+'</span>';
    metrics.appendChild(m);
  });
  card.appendChild(metrics);
  grid.appendChild(card);
}

/* ---- Generate CSS ---- */
function generateCSS() {
  if (!hybridDNA) { spliceDNA(); return; }
  const d = hybridDNA;
  const p = d.colors.primary;
  const s = d.colors.secondary;
  const a = d.colors.accent;
  const bg = d.colors.bg;
  const sp = d.spacing;
  const br = d.borderRadius;
  const an = d.animations;
  const ty = d.typography;

  let css = '/* 🧬 Hybrid Design System\\n   Generated by App DNA Splicer\\n   Ratio: '+Math.round(d.ratio*100)+'% A / '+Math.round((1-d.ratio)*100)+'% B\\n*/\\n\\n';
  css += ':root {\\n';
  css += '  /* Colors — Primary (from App A) */\\n';
  if(p[0]) css += '  --color-primary:       '+p[0]+';\\n';
  if(p[1]) css += '  --color-primary-dark:  '+p[1]+';\\n';
  if(p[2]) css += '  --color-primary-light: '+p[2]+';\\n';
  css += '\\n  /* Colors — Secondary (from App B) */\\n';
  if(s[0]) css += '  --color-secondary:       '+s[0]+';\\n';
  if(s[1]) css += '  --color-secondary-dark:  '+s[1]+';\\n';
  if(s[2]) css += '  --color-secondary-light: '+s[2]+';\\n';
  css += '\\n  /* Colors — Accent */\\n';
  if(a[0]) css += '  --color-accent:   '+a[0]+';\\n';
  if(a[1]) css += '  --color-accent-2: '+a[1]+';\\n';
  css += '\\n  /* Colors — Background */\\n';
  if(bg[0]) css += '  --color-bg:       '+bg[0]+';\\n';
  if(bg[1]) css += '  --color-bg-card:  '+bg[1]+';\\n';
  if(bg[2]) css += '  --color-bg-input: '+bg[2]+';\\n';
  css += '\\n  /* Typography */\\n';
  if(d.fonts[0]) css += '  --font-primary:   "'+d.fonts[0]+'", system-ui, sans-serif;\\n';
  if(d.fonts[1]) css += '  --font-secondary: "'+d.fonts[1]+'", monospace;\\n';
  css += '  --font-size-xs:  '+Math.round(ty.sizes[0]||12)+'px;\\n';
  css += '  --font-size-sm:  '+Math.round(ty.sizes[1]||14)+'px;\\n';
  css += '  --font-size-base:'+Math.round(ty.sizes[2]||16)+'px;\\n';
  css += '  --font-size-lg:  '+Math.round(ty.sizes[3]||20)+'px;\\n';
  css += '  --font-size-xl:  '+Math.round(ty.sizes[4]||24)+'px;\\n';
  css += '  --font-size-2xl: '+Math.round((ty.sizes[4]||24)*ty.ratio)+'px;\\n';
  css += '  --font-size-3xl: '+Math.round((ty.sizes[4]||24)*ty.ratio*ty.ratio)+'px;\\n';
  css += '  --type-scale:    '+ty.ratio+'; /* '+ty.scale+' */\\n';
  css += '\\n  /* Spacing — '+sp.rhythm+' */\\n';
  css += '  --space-1:  '+sp.base+'px;\\n';
  css += '  --space-2:  '+(sp.base*2)+'px;\\n';
  css += '  --space-3:  '+(sp.base*3)+'px;\\n';
  css += '  --space-4:  '+(sp.base*4)+'px;\\n';
  css += '  --space-6:  '+(sp.base*6)+'px;\\n';
  css += '  --space-8:  '+(sp.base*8)+'px;\\n';
  css += '  --space-12: '+(sp.base*12)+'px;\\n';
  css += '  --space-16: '+(sp.base*16)+'px;\\n';
  css += '\\n  /* Border Radius — '+br.style+' */\\n';
  css += '  --radius-sm:  '+Math.max(0,br.avg-2)+'px;\\n';
  css += '  --radius:     '+br.avg+'px;\\n';
  css += '  --radius-lg:  '+Math.round(br.avg*1.5)+'px;\\n';
  css += '  --radius-xl:  '+Math.round(br.avg*2.5)+'px;\\n';
  css += '  --radius-pill: 9999px;\\n';
  css += '\\n  /* Animation — '+an.style+' */\\n';
  css += '  --duration-fast:   '+Math.round(an.avg*0.5)+'ms;\\n';
  css += '  --duration-base:   '+an.avg+'ms;\\n';
  css += '  --duration-slow:   '+Math.round(an.avg*2)+'ms;\\n';
  css += '  --easing:          cubic-bezier(0.25, 0.46, 0.45, 0.94);\\n';
  css += '  --easing-bounce:   cubic-bezier(0.68, -0.55, 0.265, 1.55);\\n';
  css += '\\n  /* Shadows */\\n';
  const shadowColor = p[0]||'#000';
  css += '  --shadow-sm:  0 2px 8px '+shadowColor+'22;\\n';
  css += '  --shadow:     0 4px 16px '+shadowColor+'33;\\n';
  css += '  --shadow-lg:  0 8px 32px '+shadowColor+'44;\\n';
  css += '  --shadow-glow:0 0 24px '+shadowColor+'66;\\n';
  css += '}\\n\\n';
  css += '/* === Base Styles === */\\n';
  css += 'body {\\n';
  css += '  background: var(--color-bg);\\n';
  css += '  color: var(--color-primary);\\n';
  css += '  font-family: var(--font-primary);\\n';
  css += '  font-size: var(--font-size-base);\\n';
  css += '  line-height: 1.6;\\n';
  css += '}\\n\\n';
  css += '/* === Button System === */\\n';
  css += '.btn {\\n';
  css += '  background: var(--color-primary);\\n';
  css += '  color: #fff;\\n';
  css += '  border: none;\\n';
  css += '  border-radius: var(--radius);\\n';
  css += '  padding: var(--space-2) var(--space-4);\\n';
  css += '  font-family: var(--font-primary);\\n';
  css += '  font-size: var(--font-size-sm);\\n';
  css += '  font-weight: 600;\\n';
  css += '  cursor: pointer;\\n';
  css += '  transition: all var(--duration-base) var(--easing);\\n';
  css += '  box-shadow: var(--shadow-sm);\\n';
  css += '}\\n';
  css += '.btn:hover {\\n';
  css += '  background: var(--color-primary-dark);\\n';
  css += '  box-shadow: var(--shadow-glow);\\n';
  css += '  transform: translateY(-1px);\\n';
  css += '}\\n\\n';
  css += '/* === Card System === */\\n';
  css += '.card {\\n';
  css += '  background: var(--color-bg-card);\\n';
  css += '  border-radius: var(--radius-lg);\\n';
  css += '  padding: var(--space-6);\\n';
  css += '  box-shadow: var(--shadow);\\n';
  css += '}\\n\\n';
  css += '/* === Input System === */\\n';
  css += 'input, textarea, select {\\n';
  css += '  background: var(--color-bg-input);\\n';
  css += '  border: 1px solid var(--color-secondary);\\n';
  css += '  border-radius: var(--radius-sm);\\n';
  css += '  padding: var(--space-2) var(--space-3);\\n';
  css += '  font-family: var(--font-primary);\\n';
  css += '  font-size: var(--font-size-sm);\\n';
  css += '  color: var(--color-primary);\\n';
  css += '  transition: border-color var(--duration-fast) var(--easing);\\n';
  css += '  outline: none;\\n';
  css += '}\\n';
  css += 'input:focus, textarea:focus, select:focus {\\n';
  css += '  border-color: var(--color-accent);\\n';
  css += '  box-shadow: 0 0 0 3px '+( a[0]||'#00f5ff')+'22;\\n';
  css += '}\\n';

  const output = document.getElementById('cssOutput');
  output.textContent = css;
  document.getElementById('cssSection').style.display='block';
  showToast('🎨 CSS Design System generated!');
}

function updateRatioLabel() {
  const v = document.getElementById('spliceRatio').value;
  document.getElementById('ratioLabel').textContent = v+'/'+(100-parseInt(v));
}
</${'script'}>
</body>
</html>`;

  /* =========================================================
     TRANSLATIONS
  ========================================================= */
  const T = {
    en: {
      title: '🧬 App DNA Splicer',
      subtitle: 'Extract, analyse & hybridize design systems from any app\'s CSS',
      presets: 'Presets',
      inputA: '🅰️ App A — CSS / HTML',
      inputB: '🅱️ App B — CSS / HTML',
      placeholderA: 'Paste App A CSS or HTML here…',
      placeholderB: 'Paste App B CSS or HTML here…',
      extract: '🔬 Extract DNA',
      splice: '⚡ Splice!',
      generate: '🎨 Generate Hybrid Design System',
      loadEditor: '📥 Load to Editor',
      loadStandalone: '🚀 Load Full Standalone App',
      domA: '🅰️ Dominance',
      domB: '🅱️ Dominance',
      dnaSec: '🧬 Extracted DNA',
      hybridSec: '⚡ Hybrid DNA',
      cssSec: '🎨 Generated CSS Design System',
      copyCss: '📋 Copy CSS',
      toastInit: '✅ App DNA Splicer initialized.',
      toastPreset: '✅ Preset loaded!',
      toastExtract: '🔬 DNA extracted!',
      toastSplice: '⚡ DNAs spliced!',
      toastGen: '🎨 CSS Design System generated!',
      toastCopy: '📋 CSS copied to clipboard!',
      toastNoCss: '⚠️ Please generate the hybrid design system first.',
      toastNoDNA: '⚠️ Please paste CSS into at least one panel.',
      toastCopied: '📋 Copied',
      appA: 'App A DNA',
      appB: 'App B DNA',
      palette: '🎨 Color Palette',
      typography: '🔤 Typography',
      spacing: '📐 Spacing Rhythm',
      radius: '🔘 Border Radius Style',
      animation: '⚡ Animation Style',
      hybridLabel: '🧬 Hybrid DNA',
      primaryFont: '🔤 Primary Font',
      secondaryFont: '🔤 Secondary Font',
      baseSpacing: '📐 Base Spacing',
      borderRadius: '🔘 Border Radius',
      animSpeed: '⚡ Animation Speed',
      typeRatio: '📝 Type Ratio',
      sizesFound: 'Sizes found',
      scaleRatio: 'Scale ratio',
      baseUnit: 'Base unit',
      rhythm: 'Rhythm',
      values: 'Values',
      avgRadius: 'Avg radius',
      style: 'Style',
      avgDuration: 'Avg duration',
      noFont: 'No font-family found',
      primary: 'Primary',
      secondary: 'Secondary',
      accent: 'Accent',
      bg: 'Background',
      hybridRatio: '% A /  % B',
    },
    fr: {
      title: '🧬 Spliceur d\'ADN d\'App',
      subtitle: 'Extrayez, analysez et hybridez des systèmes de design depuis le CSS de n\'importe quelle app',
      presets: 'Présets',
      inputA: '🅰️ App A — CSS / HTML',
      inputB: '🅱️ App B — CSS / HTML',
      placeholderA: 'Collez le CSS ou HTML de l\'App A ici…',
      placeholderB: 'Collez le CSS ou HTML de l\'App B ici…',
      extract: '🔬 Extraire l\'ADN',
      splice: '⚡ Splicer !',
      generate: '🎨 Générer le Design System Hybride',
      loadEditor: '📥 Charger dans l\'Éditeur',
      loadStandalone: '🚀 Charger l\'App Standalone',
      domA: '🅰️ Dominance',
      domB: '🅱️ Dominance',
      dnaSec: '🧬 ADN Extrait',
      hybridSec: '⚡ ADN Hybride',
      cssSec: '🎨 Système CSS Généré',
      copyCss: '📋 Copier le CSS',
      toastInit: '✅ Spliceur d\'ADN initialisé.',
      toastPreset: '✅ Préset chargé !',
      toastExtract: '🔬 ADN extrait !',
      toastSplice: '⚡ ADN splicés !',
      toastGen: '🎨 Système CSS Design généré !',
      toastCopy: '📋 CSS copié dans le presse-papiers !',
      toastNoCss: '⚠️ Veuillez d\'abord générer le système de design hybride.',
      toastNoDNA: '⚠️ Veuillez coller du CSS dans au moins un panneau.',
      toastCopied: '📋 Copié',
      appA: 'ADN App A',
      appB: 'ADN App B',
      palette: '🎨 Palette de Couleurs',
      typography: '🔤 Typographie',
      spacing: '📐 Rythme d\'Espacement',
      radius: '🔘 Style de Border-Radius',
      animation: '⚡ Style d\'Animation',
      hybridLabel: '🧬 ADN Hybride',
      primaryFont: '🔤 Police Principale',
      secondaryFont: '🔤 Police Secondaire',
      baseSpacing: '📐 Espacement de Base',
      borderRadius: '🔘 Border-Radius',
      animSpeed: '⚡ Vitesse d\'Animation',
      typeRatio: '📝 Ratio Typographique',
      sizesFound: 'Tailles trouvées',
      scaleRatio: 'Ratio d\'échelle',
      baseUnit: 'Unité de base',
      rhythm: 'Rythme',
      values: 'Valeurs',
      avgRadius: 'Rayon moyen',
      style: 'Style',
      avgDuration: 'Durée moy.',
      noFont: 'Aucun font-family trouvé',
      primary: 'Principal',
      secondary: 'Secondaire',
      accent: 'Accent',
      bg: 'Fond',
      hybridRatio: '% A / % B',
    }
  };

  /* =========================================================
     PRESETS DATA
  ========================================================= */
  const PRESETS = {
    'apple-cyber': {
      nameEN: '🍎 Apple + Cyberpunk',
      nameFR: '🍎 Apple + Cyberpunk',
      a: `:root {
  --color-primary: #0071e3;
  --color-bg: #ffffff;
  --color-text: #1d1d1f;
  --color-accent: #06c;
  --radius: 12px;
  --font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  --transition: 0.3s ease;
  --shadow: 0 4px 12px rgba(0,0,0,0.1);
}
body {
  background: #ffffff;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}
.btn {
  background: #0071e3;
  color: #fff;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  transition: 0.3s ease;
}
.btn:hover { background: #0077ed; }
.card {
  background: #f5f5f7;
  border-radius: 18px;
  padding: 24px;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
h1 { font-size: 48px; font-weight: 700; letter-spacing: -0.02em; color: #1d1d1f; }
h2 { font-size: 32px; font-weight: 600; color: #1d1d1f; }
p  { font-size: 17px; line-height: 1.5; color: #6e6e73; }
.hero { padding: 80px 40px; background: linear-gradient(180deg, #fbfbfd 0%, #fff 100%); }
input { border: 1px solid #d2d2d7; border-radius: 10px; padding: 10px 16px; font-size: 15px; }`,
      b: `:root {
  --neon: #00f5ff;
  --neon2: #bf00ff;
  --bg: #020617;
  --card-bg: #0d1929;
  --border: #1e3a5f;
  --radius: 4px;
  --font: 'Orbitron', monospace;
  --speed: 0.1s;
}
body {
  background: #020617;
  color: #00f5ff;
  font-family: 'Orbitron', monospace;
}
.btn {
  background: transparent;
  color: #00f5ff;
  border: 2px solid #00f5ff;
  border-radius: 2px;
  padding: 10px 20px;
  text-transform: uppercase;
  transition: 0.1s;
  box-shadow: 0 0 20px #00f5ff44;
}
.btn:hover { background: #00f5ff22; box-shadow: 0 0 40px #00f5ff88; }
.card {
  background: #0d1929;
  border: 1px solid #1e3a5f;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 30px rgba(0,245,255,0.1);
}
h1 {
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px #00f5ff;
}
h2 { font-size: 24px; color: #bf00ff; text-shadow: 0 0 15px #bf00ff; }
p  { font-size: 14px; color: #64748b; line-height: 1.7; }
.hero { background: radial-gradient(ellipse at center, #0d1929 0%, #020617 100%); border-bottom: 1px solid #1e3a5f; }`
    },
    'stripe-neon': {
      nameEN: '💳 Stripe + Neon',
      nameFR: '💳 Stripe + Néon',
      a: `:root {
  --color-primary: #635bff;
  --color-secondary: #0a2540;
  --color-bg: #ffffff;
  --color-accent: #00d4ff;
  --radius: 8px;
  --font: "Söhne", ui-sans-serif, system-ui, sans-serif;
  --transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
body {
  background: #fff;
  color: #0a2540;
  font-family: "Söhne", ui-sans-serif, system-ui, sans-serif;
}
.btn {
  background: #635bff;
  color: #fff;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  transition: 0.2s;
}
.btn:hover { background: #4f46e5; }
.card {
  background: #fff;
  border: 1px solid #e6ebf1;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(10,37,64,0.08);
}
h1 { font-size: 56px; font-weight: 700; color: #0a2540; line-height: 1.1; }
h2 { font-size: 32px; font-weight: 600; color: #425466; }
p  { font-size: 16px; line-height: 1.7; color: #425466; }
input {
  border: 1px solid #e6ebf1;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 15px;
}`,
      b: `:root {
  --glow: #ff00aa;
  --glow2: #ffcc00;
  --bg: #0a000f;
  --card: #140020;
  --border: #3d0060;
  --radius: 0px;
  --font: 'Share Tech Mono', monospace;
  --speed: 0.05s;
}
body {
  background: #0a000f;
  color: #ff00aa;
  font-family: 'Share Tech Mono', monospace;
}
.btn {
  background: #ff00aa22;
  border: 1px solid #ff00aa;
  color: #ff00aa;
  border-radius: 0;
  padding: 12px 24px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 0 0 25px #ff00aa55, inset 0 0 15px #ff00aa11;
  transition: 0.05s;
}
.btn:hover { background: #ff00aa33; }
.card {
  background: #140020;
  border: 1px solid #3d0060;
  border-radius: 0;
  box-shadow: 0 0 40px rgba(255,0,170,0.15);
  padding: 20px;
}
h1 {
  font-size: 40px;
  text-shadow: 0 0 30px #ff00aa, 0 0 60px #ff00aa44;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
h2 { font-size: 26px; color: #ffcc00; text-shadow: 0 0 15px #ffcc00; }
p  { font-size: 14px; line-height: 1.8; color: #9f007a; }
input {
  background: #0a000f;
  border: 1px solid #ff00aa44;
  border-radius: 0;
  color: #ff00aa;
  padding: 8px 12px;
  font-family: 'Share Tech Mono', monospace;
}`
    },
    'notion-matrix': {
      nameEN: '📝 Notion + Matrix',
      nameFR: '📝 Notion + Matrix',
      a: `:root {
  --color-primary: #2eaadc;
  --color-bg: #ffffff;
  --color-text: #37352f;
  --color-border: #e9e9e7;
  --radius: 3px;
  --font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --transition: 0.1s ease;
}
body {
  background: #fff;
  color: #37352f;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
}
.btn {
  background: transparent;
  border: 1px solid #e9e9e7;
  border-radius: 3px;
  color: #37352f;
  padding: 6px 12px;
  font-size: 14px;
  transition: 0.1s;
}
.btn:hover { background: #f7f7f5; }
.card {
  background: #fff;
  border: 1px solid #e9e9e7;
  border-radius: 3px;
  padding: 16px;
}
h1 { font-size: 40px; font-weight: 700; color: #37352f; margin-bottom: 16px; }
h2 { font-size: 24px; font-weight: 600; color: #37352f; }
p  { font-size: 16px; line-height: 1.65; color: #37352f; margin-bottom: 12px; }
input { border: 1px solid #e9e9e7; border-radius: 3px; padding: 4px 8px; font-size: 14px; }`,
      b: `:root {
  --matrix: #00ff41;
  --matrix2: #003b00;
  --bg: #000000;
  --card: #001100;
  --border: #003300;
  --radius: 0px;
  --font: 'Courier New', Courier, monospace;
  --speed: 0.05s;
}
body {
  background: #000;
  color: #00ff41;
  font-family: 'Courier New', Courier, monospace;
}
.btn {
  background: #001100;
  border: 1px solid #00ff41;
  color: #00ff41;
  border-radius: 0;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: 0.05s;
}
.btn:hover { background: #003b00; box-shadow: 0 0 20px #00ff4155; }
.card {
  background: #001100;
  border: 1px solid #003300;
  border-radius: 0;
  padding: 16px;
  box-shadow: 0 0 30px rgba(0,255,65,0.1);
}
h1 {
  font-size: 36px;
  color: #00ff41;
  text-shadow: 0 0 20px #00ff41;
  letter-spacing: 0.05em;
}
h2 { font-size: 24px; color: #00cc33; text-shadow: 0 0 10px #00cc33; }
p  { font-size: 14px; line-height: 1.8; color: #00cc33; }
input {
  background: #001100;
  border: 1px solid #003300;
  border-radius: 0;
  color: #00ff41;
  padding: 6px 10px;
  font-family: 'Courier New', monospace;
}`
    }
  };

  /* =========================================================
     MODULE STATE
  ========================================================= */
  let dnaA = null, dnaB = null, hybridDNA = null, generatedCSS = '';

  /* =========================================================
     DNA EXTRACTION ENGINE
  ========================================================= */
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, '0');
    };
    return '#' + f(0) + f(8) + f(4);
  }

  function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function extractColors(css) {
    const found = [];
    const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g;
    let m;
    while ((m = hexRe.exec(css)) !== null) {
      const raw = m[1];
      const hex = raw.length === 3
        ? '#' + raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2]
        : '#' + raw;
      found.push(hex.toLowerCase());
    }
    const rgbRe = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;
    while ((m = rgbRe.exec(css)) !== null) {
      found.push(rgbToHex(parseInt(m[1]), parseInt(m[2]), parseInt(m[3])));
    }
    const hslRe = /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/g;
    while ((m = hslRe.exec(css)) !== null) {
      found.push(hslToHex(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])));
    }
    const exclude = new Set(['#000000', '#ffffff', '#000', '#fff', '#00000', '#fffff']);
    const unique = [...new Set(found)].filter(c => !exclude.has(c) && c.length === 7);
    return clusterColors(unique);
  }

  function clusterColors(hexList) {
    if (!hexList.length) return { primary: [], secondary: [], accent: [], bg: [] };
    const withHsl = hexList.map(h => ({ hex: h, hsl: hexToHsl(h) }));
    const dark = withHsl.filter(c => c.hsl[2] < 20 && c.hsl[1] < 20).map(c => c.hex);
    const light = withHsl.filter(c => c.hsl[2] > 78 && c.hsl[1] < 15).map(c => c.hex);
    const vivid = withHsl.filter(c => c.hsl[1] > 45 && c.hsl[2] > 20 && c.hsl[2] < 85);
    vivid.sort((a, b) => b.hsl[1] - a.hsl[1]);
    const accentCands = withHsl.filter(c => c.hsl[1] > 35 && c.hsl[2] > 55 && c.hsl[2] < 90);
    return {
      primary: vivid.slice(0, 3).map(c => c.hex),
      secondary: vivid.slice(3, 6).map(c => c.hex),
      accent: accentCands.slice(0, 3).map(c => c.hex),
      bg: [...dark, ...light].slice(0, 4)
    };
  }

  function extractFonts(css) {
    const re = /font-family\s*:\s*([^;}\n]+)/gi;
    const found = new Set();
    let m;
    while ((m = re.exec(css)) !== null) {
      m[1].split(',').forEach(f => {
        const clean = f.trim().replace(/["']/g, '').trim();
        if (clean && clean.length > 1 && !clean.startsWith('-apple') && clean !== 'inherit' && clean !== 'sans-serif' && clean !== 'monospace') {
          found.add(clean.split(/\s+/).slice(0, 3).join(' '));
        }
      });
    }
    return [...found].slice(0, 6);
  }

  function extractSpacing(css) {
    const re = /(?:margin|padding)(?:-(?:top|bottom|left|right|block|inline|block-start|block-end|inline-start|inline-end))?\s*:\s*([^;}\n]+)/gi;
    const vals = [];
    let m;
    while ((m = re.exec(css)) !== null) {
      m[1].split(/\s+/).forEach(v => {
        const n = parseFloat(v);
        if (!isNaN(n) && n > 0 && n < 200) vals.push(n);
      });
    }
    // Also check gap
    const gapRe = /gap\s*:\s*([\d.]+)px/gi;
    while ((m = gapRe.exec(css)) !== null) { vals.push(parseFloat(m[1])); }
    if (!vals.length) return { values: [], base: 8, rhythm: '8px grid (default)' };
    const sorted = [...new Set(vals)].sort((a, b) => a - b);
    let base = sorted[0] || 4;
    for (let b2 = 1; b2 <= 20; b2++) {
      const fits = sorted.filter(v => v % b2 === 0 || Math.abs(v % b2) < 0.5).length;
      if (fits >= sorted.length * 0.55) base = b2;
    }
    if (base < 1) base = 4;
    return { values: sorted.slice(0, 10), base: Math.round(base), rhythm: Math.round(base) + 'px grid' };
  }

  function extractBorderRadius(css) {
    const re = /border-radius\s*:\s*([^;}\n]+)/gi;
    const vals = [];
    let m;
    while ((m = re.exec(css)) !== null) {
      const v = parseFloat(m[1]);
      if (!isNaN(v)) vals.push(v);
    }
    if (!vals.length) return { values: [], avg: 4, style: 'Rounded', badge: 'badge-rounded' };
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    let style, badge;
    if (avg <= 3) { style = 'Sharp (Angular)'; badge = 'badge-sharp'; }
    else if (avg <= 10) { style = 'Rounded'; badge = 'badge-rounded'; }
    else { style = 'Pill / Soft'; badge = 'badge-pill'; }
    return { values: [...new Set(vals)].slice(0, 6), avg: Math.round(avg), style, badge };
  }

  function extractAnimations(css) {
    const re = /(?:transition|animation)[^:]*:\s*([^;}\n]+)/gi;
    const durations = [];
    let m;
    while ((m = re.exec(css)) !== null) {
      const durRe = /([\d.]+)(ms|s)\b/gi;
      let dm;
      while ((dm = durRe.exec(m[1])) !== null) {
        const ms = dm[2] === 's' ? parseFloat(dm[1]) * 1000 : parseFloat(dm[1]);
        if (ms > 0 && ms < 5000) durations.push(ms);
      }
    }
    if (!durations.length) return { values: [], avg: 200, style: 'Medium', badge: 'badge-medium' };
    const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    let style, badge;
    if (avg < 150) { style = 'Fast / Snappy'; badge = 'badge-fast'; }
    else if (avg <= 400) { style = 'Medium'; badge = 'badge-medium'; }
    else { style = 'Slow / Cinematic'; badge = 'badge-slow'; }
    return { values: [...new Set(durations)].slice(0, 6).map(d => d + 'ms'), avg, style, badge };
  }

  function extractTypography(css) {
    const re = /font-size\s*:\s*([^;}\n]+)/gi;
    const sizes = [];
    let m;
    while ((m = re.exec(css)) !== null) {
      const v = parseFloat(m[1]);
      if (!isNaN(v) && v > 0 && v < 300) sizes.push(v);
    }
    const unique = [...new Set(sizes)].sort((a, b) => a - b);
    let ratio = 1.25;
    if (unique.length >= 2) {
      const ratios = [];
      for (let i = 1; i < Math.min(unique.length, 8); i++) {
        if (unique[i] > 0 && unique[i - 1] > 0) ratios.push(unique[i] / unique[i - 1]);
      }
      if (ratios.length) {
        const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
        if (avg > 1.0 && avg < 3) ratio = Math.round(avg * 100) / 100;
      }
    }
    const scale = ratio < 1.12 ? 'Minor Second' : ratio < 1.18 ? 'Major Second' : ratio < 1.28 ? 'Minor Third' : ratio < 1.38 ? 'Major Third' : ratio < 1.48 ? 'Perfect Fourth' : 'Golden Ratio';
    return { sizes: unique.slice(0, 8), ratio, scale };
  }

  function parseDNA(css, label) {
    return {
      label,
      colors: extractColors(css),
      fonts: extractFonts(css),
      spacing: extractSpacing(css),
      borderRadius: extractBorderRadius(css),
      animations: extractAnimations(css),
      typography: extractTypography(css)
    };
  }

  /* =========================================================
     SPLICE ENGINE
  ========================================================= */
  function spliceColors(ca, cb, ratio) {
    const pickBlend = (arrA, arrB) => {
      const combined = ratio >= 0.5
        ? [...(arrA || []), ...(arrB || [])]
        : [...(arrB || []), ...(arrA || [])];
      return [...new Set(combined)].slice(0, 3);
    };
    return {
      primary: ratio >= 0.5
        ? [...(ca.primary || []).slice(0, 2), ...(cb.primary || []).slice(0, 1)]
        : [...(cb.primary || []).slice(0, 2), ...(ca.primary || []).slice(0, 1)],
      secondary: ratio >= 0.5
        ? [...(cb.secondary || []).slice(0, 2), ...(ca.secondary || []).slice(0, 1)]
        : [...(ca.secondary || []).slice(0, 2), ...(cb.secondary || []).slice(0, 1)],
      accent: pickBlend(ca.accent, cb.accent),
      bg: ratio >= 0.5 ? (ca.bg || []).slice(0, 3) : (cb.bg || []).slice(0, 3)
    };
  }

  function spliceFonts(fa, fb, ratio) {
    const primary = ratio >= 0.5 ? (fa[0] || fb[0]) : (fb[0] || fa[0]);
    const secondary = ratio >= 0.5 ? (fb[0] || fa[1]) : (fa[0] || fb[1]);
    return [...new Set([primary, secondary, ...(ratio >= 0.5 ? fa : fb), ...(ratio >= 0.5 ? fb : fa)].filter(Boolean))].slice(0, 4);
  }

  function spliceSpacing(sa, sb, ratio) {
    const base = Math.round(sa.base * ratio + sb.base * (1 - ratio));
    const finalBase = base < 1 ? 4 : base;
    const values = [finalBase, finalBase * 2, finalBase * 3, finalBase * 4, finalBase * 6, finalBase * 8, finalBase * 12, finalBase * 16];
    return { values, base: finalBase, rhythm: finalBase + 'px grid (hybrid)' };
  }

  function spliceRadius(ra, rb, ratio) {
    const avg = Math.round((ra.avg || 4) * ratio + (rb.avg || 4) * (1 - ratio));
    let style, badge;
    if (avg <= 3) { style = 'Sharp (Angular)'; badge = 'badge-sharp'; }
    else if (avg <= 10) { style = 'Rounded'; badge = 'badge-rounded'; }
    else { style = 'Pill / Soft'; badge = 'badge-pill'; }
    return { avg, style, badge, values: [avg, avg * 2, Math.round(avg * 3)] };
  }

  function spliceAnimations(aa, ab, ratio) {
    const avg = Math.round(aa.avg * ratio + ab.avg * (1 - ratio));
    let style, badge;
    if (avg < 150) { style = 'Fast / Snappy'; badge = 'badge-fast'; }
    else if (avg <= 400) { style = 'Medium'; badge = 'badge-medium'; }
    else { style = 'Slow / Cinematic'; badge = 'badge-slow'; }
    return { avg, style, badge, values: [Math.round(avg * 0.5) + 'ms', avg + 'ms', Math.round(avg * 2) + 'ms'] };
  }

  function spliceTypography(ta, tb, ratio) {
    const blendRatio = ta.ratio * ratio + tb.ratio * (1 - ratio);
    const finalRatio = Math.round(blendRatio * 100) / 100;
    const baseSize = 16;
    const sizes = [
      Math.round(baseSize / (finalRatio * finalRatio)),
      Math.round(baseSize / finalRatio),
      baseSize,
      Math.round(baseSize * finalRatio),
      Math.round(baseSize * finalRatio * finalRatio),
      Math.round(baseSize * Math.pow(finalRatio, 3)),
      Math.round(baseSize * Math.pow(finalRatio, 4)),
      Math.round(baseSize * Math.pow(finalRatio, 5))
    ];
    const scale = finalRatio < 1.12 ? 'Minor Second' : finalRatio < 1.18 ? 'Major Second' : finalRatio < 1.28 ? 'Minor Third' : finalRatio < 1.38 ? 'Major Third' : finalRatio < 1.48 ? 'Perfect Fourth' : 'Golden Ratio';
    return { sizes, ratio: finalRatio, scale };
  }

  /* =========================================================
     CSS GENERATION
  ========================================================= */
  function generateCSSOutput(dna) {
    const d = dna;
    const p = d.colors.primary || [];
    const s = d.colors.secondary || [];
    const a = d.colors.accent || [];
    const bg = d.colors.bg || [];
    const sp = d.spacing;
    const br = d.borderRadius;
    const an = d.animations;
    const ty = d.typography;

    let css = '/* ================================================\n';
    css += '   🧬 HYBRID DESIGN SYSTEM\n';
    css += '   Generated by App DNA Splicer — IA Architecte Studio\n';
    css += '   Ratio: ' + Math.round(d.ratio * 100) + '% A / ' + Math.round((1 - d.ratio) * 100) + '% B\n';
    css += '   Type Scale: ' + ty.scale + ' (' + ty.ratio + ')\n';
    css += '   Spacing: ' + sp.rhythm + '\n';
    css += '   Radius: ' + br.style + '\n';
    css += '   Animation: ' + an.style + '\n';
    css += '================================================ */\n\n';
    css += ':root {\n\n';

    css += '  /* ── Colors ─────────────────────────────────── */\n';
    css += '  /* Primary (dominant from App ' + (d.ratio >= 0.5 ? 'A' : 'B') + ') */\n';
    if (p[0]) css += '  --color-primary:         ' + p[0] + ';\n';
    if (p[1]) css += '  --color-primary-alt:     ' + p[1] + ';\n';
    if (p[2]) css += '  --color-primary-muted:   ' + p[2] + ';\n';
    css += '\n  /* Secondary (dominant from App ' + (d.ratio >= 0.5 ? 'B' : 'A') + ') */\n';
    if (s[0]) css += '  --color-secondary:       ' + s[0] + ';\n';
    if (s[1]) css += '  --color-secondary-alt:   ' + s[1] + ';\n';
    if (s[2]) css += '  --color-secondary-muted: ' + s[2] + ';\n';
    css += '\n  /* Accent */\n';
    if (a[0]) css += '  --color-accent:          ' + a[0] + ';\n';
    if (a[1]) css += '  --color-accent-2:        ' + a[1] + ';\n';
    if (a[2]) css += '  --color-accent-3:        ' + a[2] + ';\n';
    css += '\n  /* Backgrounds */\n';
    if (bg[0]) css += '  --color-bg:              ' + bg[0] + ';\n';
    if (bg[1]) css += '  --color-bg-elevated:     ' + bg[1] + ';\n';
    if (bg[2]) css += '  --color-bg-card:         ' + bg[2] + ';\n';
    if (!bg[0]) css += '  --color-bg:              #020617;\n';

    css += '\n  /* ── Typography ─────────────────────────────── */\n';
    if (d.fonts[0]) css += '  --font-primary:          "' + d.fonts[0] + '", system-ui, sans-serif;\n';
    if (d.fonts[1]) css += '  --font-secondary:        "' + d.fonts[1] + '", monospace;\n';
    if (!d.fonts[0]) css += '  --font-primary:          system-ui, -apple-system, sans-serif;\n';
    css += '  /* Type Scale: ' + ty.scale + ' ×' + ty.ratio + ' */\n';
    css += '  --font-size-2xs:         ' + (ty.sizes[0] || Math.round(16 / (ty.ratio * ty.ratio))) + 'px;\n';
    css += '  --font-size-xs:          ' + (ty.sizes[1] || Math.round(16 / ty.ratio)) + 'px;\n';
    css += '  --font-size-sm:          ' + (ty.sizes[2] || 14) + 'px;\n';
    css += '  --font-size-base:        ' + (ty.sizes[3] || 16) + 'px;\n';
    css += '  --font-size-lg:          ' + (ty.sizes[4] || Math.round(16 * ty.ratio)) + 'px;\n';
    css += '  --font-size-xl:          ' + (ty.sizes[5] || Math.round(16 * ty.ratio * ty.ratio)) + 'px;\n';
    css += '  --font-size-2xl:         ' + (ty.sizes[6] || Math.round(16 * Math.pow(ty.ratio, 3))) + 'px;\n';
    css += '  --font-size-3xl:         ' + (ty.sizes[7] || Math.round(16 * Math.pow(ty.ratio, 4))) + 'px;\n';
    css += '  --type-scale:            ' + ty.ratio + ';\n';
    css += '  --line-height-tight:     1.25;\n';
    css += '  --line-height-base:      1.6;\n';
    css += '  --line-height-relaxed:   1.8;\n';
    css += '  --letter-spacing-tight:  -0.02em;\n';
    css += '  --letter-spacing-base:   0em;\n';
    css += '  --letter-spacing-wide:   0.05em;\n';

    css += '\n  /* ── Spacing (' + sp.rhythm + ') ──────────────── */\n';
    const b = sp.base;
    css += '  --space-px:              1px;\n';
    css += '  --space-1:               ' + b + 'px;\n';
    css += '  --space-2:               ' + (b * 2) + 'px;\n';
    css += '  --space-3:               ' + (b * 3) + 'px;\n';
    css += '  --space-4:               ' + (b * 4) + 'px;\n';
    css += '  --space-5:               ' + (b * 5) + 'px;\n';
    css += '  --space-6:               ' + (b * 6) + 'px;\n';
    css += '  --space-8:               ' + (b * 8) + 'px;\n';
    css += '  --space-10:              ' + (b * 10) + 'px;\n';
    css += '  --space-12:              ' + (b * 12) + 'px;\n';
    css += '  --space-16:              ' + (b * 16) + 'px;\n';
    css += '  --space-20:              ' + (b * 20) + 'px;\n';
    css += '  --space-24:              ' + (b * 24) + 'px;\n';

    css += '\n  /* ── Border Radius (' + br.style + ') ───────── */\n';
    const r = br.avg;
    css += '  --radius-none:           0px;\n';
    css += '  --radius-xs:             ' + Math.max(0, r - 2) + 'px;\n';
    css += '  --radius-sm:             ' + Math.max(0, r - 1) + 'px;\n';
    css += '  --radius:                ' + r + 'px;\n';
    css += '  --radius-md:             ' + Math.round(r * 1.25) + 'px;\n';
    css += '  --radius-lg:             ' + Math.round(r * 1.75) + 'px;\n';
    css += '  --radius-xl:             ' + Math.round(r * 2.5) + 'px;\n';
    css += '  --radius-2xl:            ' + Math.round(r * 3.5) + 'px;\n';
    css += '  --radius-pill:           9999px;\n';

    css += '\n  /* ── Animation (' + an.style + ') ───────────── */\n';
    const avgMs = an.avg;
    css += '  --duration-instant:      ' + Math.round(avgMs * 0.25) + 'ms;\n';
    css += '  --duration-fast:         ' + Math.round(avgMs * 0.5) + 'ms;\n';
    css += '  --duration-base:         ' + avgMs + 'ms;\n';
    css += '  --duration-slow:         ' + Math.round(avgMs * 1.5) + 'ms;\n';
    css += '  --duration-slower:       ' + Math.round(avgMs * 2.5) + 'ms;\n';
    css += '  --easing-default:        cubic-bezier(0.25, 0.46, 0.45, 0.94);\n';
    css += '  --easing-in:             cubic-bezier(0.42, 0, 1, 1);\n';
    css += '  --easing-out:            cubic-bezier(0, 0, 0.58, 1);\n';
    css += '  --easing-bounce:         cubic-bezier(0.68, -0.55, 0.265, 1.55);\n';
    css += '  --easing-elastic:        cubic-bezier(0.175, 0.885, 0.32, 1.275);\n';

    css += '\n  /* ── Shadows ────────────────────────────────── */\n';
    const shadowC = p[0] || '#000000';
    const accentC = a[0] || p[0] || '#00f5ff';
    css += '  --shadow-xs:             0 1px 3px ' + shadowC + '20;\n';
    css += '  --shadow-sm:             0 2px 8px ' + shadowC + '28;\n';
    css += '  --shadow:                0 4px 16px ' + shadowC + '33;\n';
    css += '  --shadow-md:             0 6px 24px ' + shadowC + '3d;\n';
    css += '  --shadow-lg:             0 8px 32px ' + shadowC + '44;\n';
    css += '  --shadow-xl:             0 12px 48px ' + shadowC + '55;\n';
    css += '  --shadow-glow:           0 0 24px ' + accentC + '66;\n';
    css += '  --shadow-glow-lg:        0 0 48px ' + accentC + '44;\n';

    css += '\n  /* ── Z-Index Scale ──────────────────────────── */\n';
    css += '  --z-base:                0;\n';
    css += '  --z-raised:              10;\n';
    css += '  --z-dropdown:            100;\n';
    css += '  --z-sticky:              200;\n';
    css += '  --z-overlay:             300;\n';
    css += '  --z-modal:               400;\n';
    css += '  --z-toast:               500;\n';
    css += '  --z-tooltip:             600;\n';

    css += '\n  /* ── Breakpoints ────────────────────────────── */\n';
    css += '  --breakpoint-sm:         640px;\n';
    css += '  --breakpoint-md:         768px;\n';
    css += '  --breakpoint-lg:         1024px;\n';
    css += '  --breakpoint-xl:         1280px;\n';
    css += '  --breakpoint-2xl:        1536px;\n';

    css += '}\n\n';

    css += '/* ════════════════════════════════════════════════\n';
    css += '   BASE COMPONENT SYSTEM\n';
    css += '════════════════════════════════════════════════ */\n\n';
    css += '*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n';
    css += 'html {\n  font-size: var(--font-size-base);\n  -webkit-text-size-adjust: 100%;\n}\n\n';
    css += 'body {\n';
    css += '  background-color: var(--color-bg);\n';
    css += '  color: var(--color-primary);\n';
    css += '  font-family: var(--font-primary);\n';
    css += '  font-size: var(--font-size-base);\n';
    css += '  line-height: var(--line-height-base);\n';
    css += '  margin: 0;\n';
    css += '  -webkit-font-smoothing: antialiased;\n';
    css += '  -moz-osx-font-smoothing: grayscale;\n';
    css += '}\n\n';

    css += '/* ── Headings ─────────────────────────── */\n';
    css += 'h1 { font-size: var(--font-size-3xl); font-weight: 800; line-height: var(--line-height-tight); letter-spacing: var(--letter-spacing-tight); }\n';
    css += 'h2 { font-size: var(--font-size-2xl); font-weight: 700; line-height: var(--line-height-tight); }\n';
    css += 'h3 { font-size: var(--font-size-xl);  font-weight: 600; }\n';
    css += 'h4 { font-size: var(--font-size-lg);  font-weight: 600; }\n';
    css += 'h5 { font-size: var(--font-size-base); font-weight: 500; }\n';
    css += 'h6 { font-size: var(--font-size-sm);  font-weight: 500; }\n\n';

    css += '/* ── Buttons ──────────────────────────── */\n';
    css += '.btn {\n';
    css += '  display: inline-flex;\n';
    css += '  align-items: center;\n';
    css += '  gap: var(--space-2);\n';
    css += '  background-color: var(--color-primary);\n';
    css += '  color: #ffffff;\n';
    css += '  border: none;\n';
    css += '  border-radius: var(--radius);\n';
    css += '  padding: var(--space-2) var(--space-4);\n';
    css += '  font-family: var(--font-primary);\n';
    css += '  font-size: var(--font-size-sm);\n';
    css += '  font-weight: 600;\n';
    css += '  line-height: 1;\n';
    css += '  cursor: pointer;\n';
    css += '  text-decoration: none;\n';
    css += '  transition:\n';
    css += '    background-color var(--duration-fast) var(--easing-default),\n';
    css += '    box-shadow       var(--duration-fast) var(--easing-default),\n';
    css += '    transform        var(--duration-fast) var(--easing-default);\n';
    css += '  box-shadow: var(--shadow-sm);\n';
    css += '  white-space: nowrap;\n';
    css += '}\n';
    css += '.btn:hover {\n';
    css += '  background-color: var(--color-primary-alt, var(--color-primary));\n';
    css += '  box-shadow: var(--shadow-glow);\n';
    css += '  transform: translateY(-1px);\n';
    css += '}\n';
    css += '.btn:active  { transform: translateY(0); box-shadow: var(--shadow-xs); }\n';
    css += '.btn-secondary {\n';
    css += '  background-color: transparent;\n';
    css += '  color: var(--color-primary);\n';
    css += '  border: 2px solid var(--color-primary);\n';
    css += '}\n';
    css += '.btn-secondary:hover { background-color: var(--color-primary); color: #fff; }\n';
    css += '.btn-accent {\n';
    css += '  background-color: var(--color-accent);\n';
    css += '  box-shadow: var(--shadow-glow);\n';
    css += '}\n\n';

    css += '/* ── Cards ────────────────────────────── */\n';
    css += '.card {\n';
    css += '  background-color: var(--color-bg-card, var(--color-bg-elevated));\n';
    css += '  border-radius: var(--radius-lg);\n';
    css += '  padding: var(--space-6);\n';
    css += '  box-shadow: var(--shadow);\n';
    css += '  transition: box-shadow var(--duration-base) var(--easing-default),\n';
    css += '              transform  var(--duration-base) var(--easing-default);\n';
    css += '}\n';
    css += '.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }\n\n';

    css += '/* ── Inputs ───────────────────────────── */\n';
    css += 'input, textarea, select {\n';
    css += '  background-color: var(--color-bg-elevated, var(--color-bg));\n';
    css += '  border: 1px solid var(--color-secondary-muted, var(--color-secondary));\n';
    css += '  border-radius: var(--radius-sm);\n';
    css += '  padding: var(--space-2) var(--space-3);\n';
    css += '  font-family: var(--font-primary);\n';
    css += '  font-size: var(--font-size-sm);\n';
    css += '  color: var(--color-primary);\n';
    css += '  outline: none;\n';
    css += '  width: 100%;\n';
    css += '  transition:\n';
    css += '    border-color var(--duration-fast) var(--easing-default),\n';
    css += '    box-shadow   var(--duration-fast) var(--easing-default);\n';
    css += '}\n';
    css += 'input:focus, textarea:focus, select:focus {\n';
    css += '  border-color: var(--color-accent, var(--color-primary));\n';
    css += '  box-shadow: 0 0 0 3px ' + (a[0] || p[0] || '#00f5ff') + '22;\n';
    css += '}\n\n';

    css += '/* ── Utility Classes ─────────────────── */\n';
    css += '.text-primary   { color: var(--color-primary); }\n';
    css += '.text-secondary { color: var(--color-secondary); }\n';
    css += '.text-accent    { color: var(--color-accent); }\n';
    css += '.bg-primary     { background-color: var(--color-primary); }\n';
    css += '.bg-secondary   { background-color: var(--color-secondary); }\n';
    css += '.bg-card        { background-color: var(--color-bg-card); }\n';
    css += '.rounded        { border-radius: var(--radius); }\n';
    css += '.rounded-lg     { border-radius: var(--radius-lg); }\n';
    css += '.rounded-pill   { border-radius: var(--radius-pill); }\n';
    css += '.shadow         { box-shadow: var(--shadow); }\n';
    css += '.shadow-lg      { box-shadow: var(--shadow-lg); }\n';
    css += '.shadow-glow    { box-shadow: var(--shadow-glow); }\n';
    css += '.transition     { transition: all var(--duration-base) var(--easing-default); }\n';

    css += '\n/* ════════════════════════════════════════════════\n';
    css += '   END OF HYBRID DESIGN SYSTEM\n';
    css += '   App DNA Splicer — IA Architecte Studio\n';
    css += '════════════════════════════════════════════════ */\n';

    return css;
  }

  /* =========================================================
     RENDER ENGINE
  ========================================================= */
  function makeEl(tag, attrs = {}, text = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'style') el.style.cssText = v;
      else if (k === 'innerHTML') el.innerHTML = v;
      else el.setAttribute(k, v);
    });
    if (text) el.textContent = text;
    return el;
  }

  function renderDNAColumn(dna, titleKey, lang) {
    const t = T[lang];
    const col = makeEl('div', { className: 'dna-col-wrap', style: 'display:grid;gap:14px;' });

    const header = makeEl('div', {
      className: 'dna-col-header',
      style: 'font-size:1rem;font-weight:700;color:#e2e8f0;padding-bottom:8px;border-bottom:1px solid #1e3a5f;'
    }, titleKey === 'A' ? t.appA : t.appB);
    col.appendChild(header);

    // --- Colors ---
    const colorCard = makeGeneCard(t.palette);
    const roles = [
      { key: 'primary', label: t.primary },
      { key: 'secondary', label: t.secondary },
      { key: 'accent', label: t.accent },
      { key: 'bg', label: t.bg }
    ];
    roles.forEach(({ key, label }) => {
      const arr = dna.colors[key] || [];
      if (!arr.length) return;
      const roleLabel = makeEl('div', {
        style: 'font-size:0.68rem;color:#475569;text-transform:uppercase;letter-spacing:0.06em;margin-top:8px;margin-bottom:4px;'
      }, label);
      colorCard.appendChild(roleLabel);
      const swatchRow = makeEl('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;' });
      arr.forEach(hex => {
        const wrap = makeEl('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:2px;' });
        const sw = makeEl('div', {
          style: `width:34px;height:34px;border-radius:8px;background:${hex};border:2px solid rgba(255,255,255,0.12);cursor:pointer;transition:transform .2s;`,
          title: hex
        });
        sw.onmouseenter = () => sw.style.transform = 'scale(1.18)';
        sw.onmouseleave = () => sw.style.transform = 'scale(1)';
        sw.onclick = () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(hex).then(() => {
              if (window.showToast) window.showToast(t.toastCopied + ' ' + hex);
            });
          }
        };
        const lbl = makeEl('div', { style: 'font-size:0.58rem;color:#475569;font-family:monospace;' }, hex);
        wrap.appendChild(sw);
        wrap.appendChild(lbl);
        swatchRow.appendChild(wrap);
      });
      colorCard.appendChild(swatchRow);
    });
    col.appendChild(colorCard);

    // --- Fonts ---
    const fontCard = makeGeneCard(t.typography);
    dna.fonts.forEach(f => {
      const tag = makeEl('span', { className: 'font-tag' }, f);
      fontCard.appendChild(tag);
    });
    if (!dna.fonts.length) {
      fontCard.appendChild(makeEl('span', { style: 'color:#334155;font-size:0.78rem;' }, t.noFont));
    }
    const tyRows = makeEl('div', { style: 'margin-top:10px;' });
    const szStr = dna.typography.sizes.map(s => s + 'px').join(', ') || '—';
    tyRows.innerHTML = `
      <div class="metric-row"><span class="metric-key">${t.sizesFound}</span><span class="metric-val" style="font-size:0.7rem;">${szStr}</span></div>
      <div class="metric-row"><span class="metric-key">${t.scaleRatio}</span><span class="metric-val">${dna.typography.ratio} (${dna.typography.scale})</span></div>
    `;
    fontCard.appendChild(tyRows);
    col.appendChild(fontCard);

    // --- Spacing ---
    const spCard = makeGeneCard(t.spacing);
    spCard.innerHTML += `
      <div class="metric-row"><span class="metric-key">${t.baseUnit}</span><span class="metric-val">${dna.spacing.base}px</span></div>
      <div class="metric-row"><span class="metric-key">${t.rhythm}</span><span class="metric-val">${dna.spacing.rhythm}</span></div>
      <div class="metric-row"><span class="metric-key">${t.values}</span><span class="metric-val" style="font-size:0.7rem;">${dna.spacing.values.map(v => v + 'px').join(' ') || '—'}</span></div>
    `;
    col.appendChild(spCard);

    // --- Border Radius ---
    const brCard = makeGeneCard(t.radius);
    brCard.innerHTML += `
      <div class="metric-row"><span class="metric-key">${t.avgRadius}</span><span class="metric-val">${dna.borderRadius.avg}px</span></div>
      <div class="metric-row"><span class="metric-key">${t.style}</span><span class="metric-val"><span class="badge ${dna.borderRadius.badge}">${dna.borderRadius.style}</span></span></div>
      <div class="metric-row"><span class="metric-key">${t.values}</span><span class="metric-val">${dna.borderRadius.values.map(v => v + 'px').join(', ') || '—'}</span></div>
    `;
    col.appendChild(brCard);

    // --- Animations ---
    const animCard = makeGeneCard(t.animation);
    animCard.innerHTML += `
      <div class="metric-row"><span class="metric-key">${t.avgDuration}</span><span class="metric-val">${dna.animations.avg}ms</span></div>
      <div class="metric-row"><span class="metric-key">${t.style}</span><span class="metric-val"><span class="badge ${dna.animations.badge}">${dna.animations.style}</span></span></div>
      <div class="metric-row"><span class="metric-key">${t.values}</span><span class="metric-val">${dna.animations.values.join(', ') || '—'}</span></div>
    `;
    col.appendChild(animCard);

    return col;
  }

  function makeGeneCard(title) {
    const card = makeEl('div', { className: 'gene-card' });
    const h = makeEl('h4', {}, title);
    card.appendChild(h);
    return card;
  }

  function renderHybridSection(dna, lang) {
    const t = T[lang];
    const grid = document.getElementById('dna-hybrid-grid');
    grid.innerHTML = '';

    const card = makeEl('div', { className: 'hybrid-card' });
    const pct = Math.round(dna.ratio * 100);
    card.innerHTML = `<h4>${t.hybridLabel} — ${pct}% A / ${100 - pct}% B</h4>`;

    // Color palette
    const colorSec = makeEl('div', { style: 'margin-bottom:16px;' });
    colorSec.innerHTML = `<div style="font-size:0.75rem;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">🎨 ${t.palette}</div>`;
    ['primary', 'secondary', 'accent', 'bg'].forEach(role => {
      const arr = dna.colors[role] || [];
      if (!arr.length) return;
      const row = makeEl('div', { style: 'display:flex;align-items:center;gap:8px;margin-bottom:8px;' });
      const lbl = makeEl('span', {
        style: 'font-size:0.68rem;color:#475569;width:76px;text-transform:uppercase;letter-spacing:0.04em;flex-shrink:0;'
      }, role);
      row.appendChild(lbl);
      const swRow = makeEl('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;' });
      arr.forEach(hex => {
        const s = makeEl('div', {
          style: `width:28px;height:28px;border-radius:6px;background:${hex};border:2px solid rgba(255,255,255,0.12);cursor:pointer;transition:transform .2s;`,
          title: hex
        });
        s.onclick = () => navigator.clipboard && navigator.clipboard.writeText(hex).then(() => {
          if (window.showToast) window.showToast(t.toastCopied + ' ' + hex);
        });
        s.onmouseenter = () => s.style.transform = 'scale(1.2)';
        s.onmouseleave = () => s.style.transform = 'scale(1)';
        swRow.appendChild(s);
      });
      row.appendChild(swRow);
      colorSec.appendChild(row);
    });
    card.appendChild(colorSec);

    // Metrics grid
    const metrics = makeEl('div', {
      style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px;'
    });
    const items = [
      [t.primaryFont, dna.fonts[0] || '—'],
      [t.secondaryFont, dna.fonts[1] || '—'],
      [t.baseSpacing, dna.spacing.base + 'px'],
      [t.borderRadius, dna.borderRadius.avg + 'px (' + dna.borderRadius.style + ')'],
      [t.animSpeed, dna.animations.avg + 'ms (' + dna.animations.style + ')'],
      [t.typeRatio, dna.typography.ratio + ' (' + dna.typography.scale + ')']
    ];
    items.forEach(([k, v]) => {
      const m = makeEl('div', { className: 'metric-row' });
      m.innerHTML = `<span class="metric-key">${k}</span><span class="metric-val">${v}</span>`;
      metrics.appendChild(m);
    });
    card.appendChild(metrics);
    grid.appendChild(card);
  }

  /* =========================================================
     MAIN RENDER FUNCTION
  ========================================================= */
  function renderDNASplicer(container) {
    const lang = window.appLang || 'en';
    const t = T[lang];

    container.innerHTML = `
      <style>
        #dna-splicer-root {
          font-family: 'Inter', system-ui, sans-serif;
          color: #e2e8f0;
          height: 100%;
          overflow-y: auto;
          padding: 20px;
          box-sizing: border-box;
          background: #020617;
        }
        #dna-splicer-root h1.dna-title {
          font-size: 1.55rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00f5ff, #bf00ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }
        #dna-splicer-root .dna-subtitle {
          color: #475569;
          font-size: 0.82rem;
          margin-bottom: 18px;
        }
        #dna-splicer-root .preset-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        #dna-splicer-root .preset-label {
          font-size: 0.75rem;
          color: #475569;
          font-weight: 600;
        }
        #dna-splicer-root .btn-preset {
          background: #0d1929;
          border: 1px solid #1e3a5f;
          color: #64748b;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all .2s;
          font-family: 'Inter', system-ui;
        }
        #dna-splicer-root .btn-preset:hover {
          border-color: #00f5ff;
          color: #00f5ff;
          background: #020617;
        }
        #dna-splicer-root .inputs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        @media (max-width: 650px) {
          #dna-splicer-root .inputs-row,
          #dna-splicer-root .dna-grid { grid-template-columns: 1fr !important; }
        }
        #dna-splicer-root .input-panel {
          background: #0d1929;
          border: 1px solid #1e3a5f;
          border-radius: 12px;
          padding: 14px;
        }
        #dna-splicer-root .input-panel h3 {
          font-size: 0.85rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #94a3b8;
        }
        #dna-splicer-root textarea.css-input {
          width: 100%;
          height: 170px;
          background: #020617;
          border: 1px solid #1e3a5f;
          border-radius: 8px;
          color: #7dd3fc;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.7rem;
          line-height: 1.6;
          padding: 10px;
          resize: vertical;
          outline: none;
          transition: border-color .2s;
          box-sizing: border-box;
        }
        #dna-splicer-root textarea.css-input:focus {
          border-color: #00f5ff;
          box-shadow: 0 0 0 2px #00f5ff18;
        }
        #dna-splicer-root .btn-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 14px;
        }
        #dna-splicer-root .btn {
          padding: 9px 18px;
          border: none;
          border-radius: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all .18s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        #dna-splicer-root .btn-primary {
          background: linear-gradient(135deg, #00f5ff, #0080ff);
          color: #000;
        }
        #dna-splicer-root .btn-primary:hover { filter: brightness(1.15); transform: translateY(-1px); }
        #dna-splicer-root .btn-splice {
          background: linear-gradient(135deg, #bf00ff, #ff3366);
          color: #fff;
        }
        #dna-splicer-root .btn-splice:hover { filter: brightness(1.15); transform: translateY(-1px); }
        #dna-splicer-root .btn-gen {
          background: linear-gradient(135deg, #00ff88, #00bfff);
          color: #000;
        }
        #dna-splicer-root .btn-gen:hover { filter: brightness(1.15); transform: translateY(-1px); }
        #dna-splicer-root .btn-secondary-act {
          background: #0d1929;
          border: 1px solid #1e3a5f;
          color: #64748b;
        }
        #dna-splicer-root .btn-secondary-act:hover {
          border-color: #00f5ff;
          color: #00f5ff;
        }
        #dna-splicer-root .btn-load-editor {
          background: #0d1929;
          border: 1px solid #00f5ff;
          color: #00f5ff;
          padding: 9px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          font-family: 'Inter', system-ui;
          transition: all .18s;
        }
        #dna-splicer-root .btn-load-editor:hover { background: #00f5ff; color: #000; }
        #dna-splicer-root .btn-standalone {
          background: linear-gradient(135deg, #ff00ff, #ff6600);
          color: #fff;
          padding: 9px 18px;
          border-radius: 8px;
          border: none;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          font-family: 'Inter', system-ui;
          transition: all .18s;
        }
        #dna-splicer-root .btn-standalone:hover { filter: brightness(1.15); transform: translateY(-1px); }
        #dna-splicer-root .slider-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 480px;
          margin: 0 auto 18px;
        }
        #dna-splicer-root .slider-wrap label {
          font-size: 0.75rem;
          color: #475569;
          white-space: nowrap;
        }
        #dna-splicer-root input[type=range] {
          -webkit-appearance: none;
          flex: 1;
          height: 5px;
          background: linear-gradient(90deg, #00f5ff, #bf00ff);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        #dna-splicer-root input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #00f5ff;
          cursor: pointer;
        }
        #dna-splicer-root .ratio-label {
          font-size: 0.75rem;
          color: #00f5ff;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
        }
        #dna-splicer-root .dna-section {
          margin-bottom: 22px;
        }
        #dna-splicer-root .dna-section-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid #1e3a5f;
          color: #e2e8f0;
        }
        #dna-splicer-root .dna-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        #dna-splicer-root .gene-card {
          background: #020617;
          border: 1px solid #1e3a5f;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
        }
        #dna-splicer-root .gene-card:last-child { margin-bottom: 0; }
        #dna-splicer-root .gene-card h4 {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 10px 0;
        }
        #dna-splicer-root .font-tag {
          display: inline-block;
          background: #0d1929;
          border: 1px solid #1e3a5f;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.72rem;
          color: #7dd3fc;
          margin: 2px;
          font-family: monospace;
        }
        #dna-splicer-root .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          padding: 5px 0;
          border-bottom: 1px solid #0d1929;
        }
        #dna-splicer-root .metric-row:last-child { border-bottom: none; }
        #dna-splicer-root .metric-key {
          font-size: 0.72rem;
          color: #475569;
          flex-shrink: 0;
        }
        #dna-splicer-root .metric-val {
          font-size: 0.72rem;
          font-weight: 600;
          color: #00f5ff;
          text-align: right;
          word-break: break-all;
        }
        #dna-splicer-root .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 700;
        }
        #dna-splicer-root .badge-sharp   { background: #1e2a3a; color: #94a3b8; }
        #dna-splicer-root .badge-rounded { background: #0d2a1a; color: #00ff88; }
        #dna-splicer-root .badge-pill    { background: #1a0d2a; color: #bf00ff; }
        #dna-splicer-root .badge-fast    { background: #0d2a1a; color: #00ff88; }
        #dna-splicer-root .badge-medium  { background: #2a1a0d; color: #ffaa00; }
        #dna-splicer-root .badge-slow    { background: #2a0d0d; color: #ff3366; }
        #dna-splicer-root .hybrid-card {
          background: linear-gradient(135deg, rgba(0,245,255,0.04), rgba(191,0,255,0.04));
          border: 1px solid #1e3a5f;
          border-radius: 12px;
          padding: 18px;
        }
        #dna-splicer-root .hybrid-card h4 {
          font-size: 0.9rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00f5ff, #bf00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 14px 0;
        }
        #dna-splicer-root .css-output-box {
          background: #020617;
          border: 1px solid #1e3a5f;
          border-radius: 10px;
          padding: 16px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.7rem;
          color: #64748b;
          white-space: pre;
          overflow-x: auto;
          max-height: 380px;
          overflow-y: auto;
          line-height: 1.7;
        }
        #dna-splicer-root .copy-btn-row {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }
      </style>

      <div id="dna-splicer-root">
        <h1 class="dna-title">${t.title}</h1>
        <p class="dna-subtitle">${t.subtitle}</p>

        <!-- Presets -->
        <div class="preset-bar">
          <span class="preset-label">${t.presets}:</span>
          <button class="btn-preset" data-preset="apple-cyber">${lang === 'fr' ? PRESETS['apple-cyber'].nameFR : PRESETS['apple-cyber'].nameEN}</button>
          <button class="btn-preset" data-preset="stripe-neon">${lang === 'fr' ? PRESETS['stripe-neon'].nameFR : PRESETS['stripe-neon'].nameEN}</button>
          <button class="btn-preset" data-preset="notion-matrix">${lang === 'fr' ? PRESETS['notion-matrix'].nameFR : PRESETS['notion-matrix'].nameEN}</button>
        </div>

        <!-- Inputs -->
        <div class="inputs-row">
          <div class="input-panel">
            <h3>${t.inputA}</h3>
            <textarea id="dna-css-a" class="css-input" placeholder="${t.placeholderA}"></textarea>
          </div>
          <div class="input-panel">
            <h3>${t.inputB}</h3>
            <textarea id="dna-css-b" class="css-input" placeholder="${t.placeholderB}"></textarea>
          </div>
        </div>

        <!-- Actions -->
        <div class="btn-row">
          <button class="btn btn-primary" id="btn-extract">${t.extract}</button>
          <button class="btn btn-splice" id="btn-splice">${t.splice}</button>
          <button class="btn btn-gen" id="btn-generate">${t.generate}</button>
        </div>

        <!-- Ratio Slider -->
        <div class="slider-wrap">
          <label>${t.domA}</label>
          <input type="range" id="dna-ratio" min="0" max="100" value="50"/>
          <span class="ratio-label" id="dna-ratio-label">50/50</span>
          <label>${t.domB}</label>
        </div>

        <!-- DNA Section -->
        <div id="dna-extract-section" class="dna-section" style="display:none;">
          <div class="dna-section-title">${t.dnaSec}</div>
          <div class="dna-grid" id="dna-extract-grid"></div>
        </div>

        <!-- Hybrid Section -->
        <div id="dna-hybrid-section" class="dna-section" style="display:none;">
          <div class="dna-section-title">${t.hybridSec}</div>
          <div id="dna-hybrid-grid"></div>
        </div>

        <!-- CSS Output -->
        <div id="dna-css-section" class="dna-section" style="display:none;">
          <div class="dna-section-title">${t.cssSec}</div>
          <div class="css-output-box" id="dna-css-output"></div>
          <div class="copy-btn-row">
            <button class="btn-load-editor" id="btn-copy-css">${t.copyCss}</button>
            <button class="btn-load-editor" id="btn-load-editor">${t.loadEditor}</button>
            <button class="btn-standalone" id="btn-standalone">${t.loadStandalone}</button>
          </div>
        </div>
      </div>
    `;

    // ── Wire events ──────────────────────────────────────────────────────────
    const ratioInput = container.querySelector('#dna-ratio');
    const ratioLabel = container.querySelector('#dna-ratio-label');
    ratioInput.addEventListener('input', () => {
      const v = ratioInput.value;
      ratioLabel.textContent = v + '/' + (100 - parseInt(v));
    });

    // Preset buttons
    container.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.preset;
        const p = PRESETS[key];
        container.querySelector('#dna-css-a').value = p.a;
        container.querySelector('#dna-css-b').value = p.b;
        if (window.showToast) window.showToast(T[lang].toastPreset);
      });
    });

    // Extract
    container.querySelector('#btn-extract').addEventListener('click', () => {
      const cssA = container.querySelector('#dna-css-a').value;
      const cssB = container.querySelector('#dna-css-b').value;
      if (!cssA.trim() && !cssB.trim()) {
        if (window.showToast) window.showToast(T[lang].toastNoDNA);
        return;
      }
      dnaA = parseDNA(cssA, 'A');
      dnaB = parseDNA(cssB, 'B');
      const grid = container.querySelector('#dna-extract-grid');
      grid.innerHTML = '';
      grid.appendChild(renderDNAColumn(dnaA, 'A', lang));
      grid.appendChild(renderDNAColumn(dnaB, 'B', lang));
      container.querySelector('#dna-extract-section').style.display = 'block';
      container.querySelector('#dna-hybrid-section').style.display = 'none';
      container.querySelector('#dna-css-section').style.display = 'none';
      if (window.showToast) window.showToast(T[lang].toastExtract);
    });

    // Splice
    container.querySelector('#btn-splice').addEventListener('click', () => {
      const cssA = container.querySelector('#dna-css-a').value;
      const cssB = container.querySelector('#dna-css-b').value;
      if (!dnaA) dnaA = parseDNA(cssA, 'A');
      if (!dnaB) dnaB = parseDNA(cssB, 'B');
      const ratio = parseInt(ratioInput.value) / 100;
      hybridDNA = {
        colors: spliceColors(dnaA.colors, dnaB.colors, ratio),
        fonts: spliceFonts(dnaA.fonts, dnaB.fonts, ratio),
        spacing: spliceSpacing(dnaA.spacing, dnaB.spacing, ratio),
        borderRadius: spliceRadius(dnaA.borderRadius, dnaB.borderRadius, ratio),
        animations: spliceAnimations(dnaA.animations, dnaB.animations, ratio),
        typography: spliceTypography(dnaA.typography, dnaB.typography, ratio),
        ratio
      };
      renderHybridSection(hybridDNA, lang);
      // Also refresh extracted grid if not shown
      if (container.querySelector('#dna-extract-section').style.display === 'none') {
        const grid = container.querySelector('#dna-extract-grid');
        grid.innerHTML = '';
        grid.appendChild(renderDNAColumn(dnaA, 'A', lang));
        grid.appendChild(renderDNAColumn(dnaB, 'B', lang));
        container.querySelector('#dna-extract-section').style.display = 'block';
      }
      container.querySelector('#dna-hybrid-section').style.display = 'block';
      container.querySelector('#dna-css-section').style.display = 'none';
      if (window.showToast) window.showToast(T[lang].toastSplice);
    });

    // Generate
    container.querySelector('#btn-generate').addEventListener('click', () => {
      const cssA = container.querySelector('#dna-css-a').value;
      const cssB = container.querySelector('#dna-css-b').value;
      if (!dnaA) dnaA = parseDNA(cssA, 'A');
      if (!dnaB) dnaB = parseDNA(cssB, 'B');
      if (!hybridDNA) {
        const ratio = parseInt(ratioInput.value) / 100;
        hybridDNA = {
          colors: spliceColors(dnaA.colors, dnaB.colors, ratio),
          fonts: spliceFonts(dnaA.fonts, dnaB.fonts, ratio),
          spacing: spliceSpacing(dnaA.spacing, dnaB.spacing, ratio),
          borderRadius: spliceRadius(dnaA.borderRadius, dnaB.borderRadius, ratio),
          animations: spliceAnimations(dnaA.animations, dnaB.animations, ratio),
          typography: spliceTypography(dnaA.typography, dnaB.typography, ratio),
          ratio
        };
        renderHybridSection(hybridDNA, lang);
        if (container.querySelector('#dna-extract-section').style.display === 'none') {
          const grid = container.querySelector('#dna-extract-grid');
          grid.innerHTML = '';
          grid.appendChild(renderDNAColumn(dnaA, 'A', lang));
          grid.appendChild(renderDNAColumn(dnaB, 'B', lang));
          container.querySelector('#dna-extract-section').style.display = 'block';
        }
        container.querySelector('#dna-hybrid-section').style.display = 'block';
      }
      generatedCSS = generateCSSOutput(hybridDNA);
      container.querySelector('#dna-css-output').textContent = generatedCSS;
      container.querySelector('#dna-css-section').style.display = 'block';
      if (window.showToast) window.showToast(T[lang].toastGen);
      // Scroll to output
      setTimeout(() => {
        container.querySelector('#dna-css-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });

    // Copy CSS
    container.querySelector('#btn-copy-css').addEventListener('click', () => {
      if (!generatedCSS) { if (window.showToast) window.showToast(T[lang].toastNoCss); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCSS).then(() => {
          if (window.showToast) window.showToast(T[lang].toastCopy);
        });
      }
    });

    // Load to Editor
    container.querySelector('#btn-load-editor').addEventListener('click', () => {
      if (!generatedCSS) { if (window.showToast) window.showToast(T[lang].toastNoCss); return; }
      if (window.editor) {
        const demoHTML = buildDemoHTML(generatedCSS);
        window.editor.setValue(demoHTML);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast(T[lang].loadEditor + ' ✅');
      }
    });

    // Load Standalone
    container.querySelector('#btn-standalone').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        if (window.showToast) window.showToast('🚀 Standalone App loaded!');
      }
    });
  }

  function buildDemoHTML(css) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🧬 App DNA Hybrid Design System Demo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${css}

/* Demo Styling using custom properties */
body {
  background-color: var(--color-bg, #020617);
  color: var(--color-primary, #e2e8f0);
  font-family: var(--font-primary, 'Inter', sans-serif);
  margin: 0;
  padding: var(--space-8, 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.demo-card {
  background-color: var(--color-bg-card, rgba(255,255,255,0.05));
  border: 1px solid var(--color-primary-muted, rgba(255,255,255,0.1));
  border-radius: var(--radius, 12px);
  padding: var(--space-8, 32px);
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform var(--duration-base, 300ms) var(--easing-default);
}
.demo-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-accent, #00f5ff);
}
h2 {
  color: var(--color-accent, #00f5ff);
  font-size: var(--font-size-2xl, 24px);
  margin-top: 0;
  margin-bottom: var(--space-4, 16px);
  font-weight: 800;
  letter-spacing: var(--letter-spacing-tight, -0.02em);
}
p {
  color: var(--color-secondary, #94a3b8);
  font-size: var(--font-size-sm, 14px);
  line-height: var(--line-height-base, 1.6);
  margin-bottom: var(--space-6, 24px);
}
.palette {
  display: flex;
  gap: var(--space-2, 8px);
  margin-bottom: var(--space-6, 24px);
}
.swatch {
  flex: 1;
  height: 48px;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xs, 10px);
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}
.swatch-primary { background-color: var(--color-primary); }
.swatch-secondary { background-color: var(--color-secondary); }
.swatch-accent { background-color: var(--color-accent); }
.swatch-bg { background-color: var(--color-bg); }

.btn {
  background-color: var(--color-accent, #00f5ff);
  color: var(--color-bg, #020617);
  border: none;
  border-radius: var(--radius-sm, 6px);
  padding: var(--space-3, 12px) var(--space-6, 24px);
  font-size: var(--font-size-sm, 14px);
  font-weight: 700;
  cursor: pointer;
  transition: all var(--duration-fast, 150ms) var(--easing-default);
}
.btn:hover {
  background-color: var(--color-accent-2, #bf00ff);
  color: #fff;
  box-shadow: 0 0 15px var(--color-accent, #00f5ff);
}
.specs {
  margin-top: var(--space-6, 24px);
  border-top: 1px dashed var(--color-primary-muted, rgba(255,255,255,0.1));
  padding-top: var(--space-4, 16px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3, 12px);
  font-family: var(--font-secondary, monospace);
  font-size: var(--font-size-xs, 12px);
  color: var(--color-secondary-alt, #64748b);
}
.spec-item span {
  color: var(--color-accent-3, #00ff88);
}
</style>
</head>
<body>
<div class="demo-card">
  <h2>🧬 Hybrid Design System Active</h2>
  <p>This is a live preview displaying components styled completely with the custom CSS properties generated by App DNA Splicer.</p>
  
  <div class="palette">
    <div class="swatch swatch-primary">Primary</div>
    <div class="swatch swatch-secondary">Secondary</div>
    <div class="swatch swatch-accent">Accent</div>
    <div class="swatch swatch-bg">BG</div>
  </div>
  
  <button class="btn">Interact with Accent Button</button>
  
  <div class="specs">
    <div class="spec-item">Base Spacing: <span>var(--space-1)</span></div>
    <div class="spec-item">Border Radius: <span>var(--radius)</span></div>
    <div class="spec-item">Primary Font: <span>var(--font-primary)</span></div>
    <div class="spec-item">Transition Speed: <span>var(--duration-base)</span></div>
  </div>
</div>
</body>
</html>`;
  }

  /* =========================================================
     TAB HOOK
  ========================================================= */
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId === 'appdnasplicer') {
      const container = document.getElementById('left-body');
      if (!container) return;
      renderDNASplicer(container);
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
      if (window.showToast) window.showToast(T[window.appLang || 'en'].toastInit);
    }
  };

})();
