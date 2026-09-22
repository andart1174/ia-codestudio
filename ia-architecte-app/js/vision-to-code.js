'use strict';
/* ═══════════════════════════════════════════════════════════════════
   📷 VISION TO CODE — IA Architecte Module
   Photo → Functional HTML/CSS/JS App Generator
   100% Offline | No API Key | EN/FR Bilingual
   ═══════════════════════════════════════════════════════════════════ */

(function () {

  /* ── Translations ──────────────────────────────────────────────── */
  const VTC_LANG = {
    en: {
      title: '📷 Vision to Code',
      subtitle: 'Upload a photo — Get functional code',
      dropZoneText: 'Drag & drop your image here',
      dropZoneOr: 'or click to browse',
      chooseFile: 'Choose Image',
      detected: '🔍 Object Type:',
      detectedColors: '🎨 Extracted Colors:',
      stylePromptLabel: '✏️ Style prompt (optional):',
      stylePromptPh: 'Ex: "vintage gold style", "neon blue", "minimalist white"...',
      selectManual: '— or choose manually —',
      generateBtn: '⚡ GENERATE CODE →',
      generating: '⚙️ Generating...',
      injectBtn: '💉 Inject into Editor',
      successMsg: '✅ Code generated! Click "Inject into Editor" to use it.',
      injected: '🚀 Code injected into editor!',
      noImage: 'Please upload an image first.',
      historyTitle: '🕐 Recent',
      clearHistory: 'Clear',
      objects: {
        clock:      { label: 'Analog Clock',      icon: '⌚' },
        digital:    { label: 'Digital Clock',     icon: '🕐' },
        calculator: { label: 'Calculator',        icon: '🔢' },
        thermometer:{ label: 'Thermometer',       icon: '🌡️' },
        dashboard:  { label: 'Car Dashboard',     icon: '🚗' },
        stopwatch:  { label: 'Stopwatch',         icon: '⏱️' },
        compass:    { label: 'Compass',           icon: '🧭' },
        progress:   { label: 'Progress Gauge',    icon: '📊' },
        weather:    { label: 'Weather Widget',    icon: '🌤️' },
        piano:      { label: 'Piano Keys',        icon: '🎹' },
        metronome:  { label: 'Metronome',         icon: '🎵' },
        alarm:      { label: 'Alarm Clock',       icon: '⏰' },
        countdown:  { label: 'Countdown Timer',   icon: '🎯' },
        currency:   { label: 'Currency Converter',icon: '💱' },
        units:      { label: 'Unit Converter',    icon: '📏' },
        colorpicker:{ label: 'Color Picker',      icon: '🎨' },
        gradient:   { label: 'Gradient Gen',      icon: '🌈' },
        dice:       { label: 'Dice Roller',       icon: '🎲' },
        slots:      { label: 'Slot Machine',      icon: '🎰' },
        spinner:    { label: 'Spinning Wheel',    icon: '🎡' },
        magic8:     { label: 'Magic 8-Ball',      icon: '🎱' },
        oscilloscope:{ label: 'Oscilloscope',     icon: '〰️' },
        battery:    { label: 'Battery Meter',     icon: '🔋' },
        protractor: { label: 'Protractor',        icon: '📐' },
        bmi:        { label: 'BMI Calculator',    icon: '⚖️' },
        morse:      { label: 'Morse Code',        icon: '📡' },
        password:   { label: 'Password Gen',      icon: '🔐' },
        binary:     { label: 'Binary Converter',  icon: '💻' },
        pomodoro:   { label: 'Pomodoro Timer',    icon: '🍅' },
        equalizer:  { label: 'Equalizer',         icon: '🎛️' },
      }
    },
    fr: {
      title: '📷 Vision vers Code',
      subtitle: 'Importez une photo — Obtenez du code fonctionnel',
      dropZoneText: 'Glissez-déposez votre image ici',
      dropZoneOr: 'ou cliquez pour parcourir',
      chooseFile: 'Choisir Image',
      detected: '🔍 Type d\'objet :',
      detectedColors: '🎨 Couleurs extraites :',
      stylePromptLabel: '✏️ Style prompt (optionnel) :',
      stylePromptPh: 'Ex: "style or vintage", "bleu néon", "blanc minimaliste"...',
      selectManual: '— ou choisissez manuellement —',
      generateBtn: '⚡ GÉNÉRER LE CODE →',
      generating: '⚙️ Génération...',
      injectBtn: '💉 Injecter dans l\'Éditeur',
      successMsg: '✅ Code généré ! Cliquez sur "Injecter dans l\'Éditeur" pour l\'utiliser.',
      injected: '🚀 Code injecté dans l\'éditeur !',
      noImage: 'Veuillez d\'abord importer une image.',
      historyTitle: '🕐 Récents',
      clearHistory: 'Effacer',
      objects: {
        clock:      { label: 'Horloge Analogique',   icon: '⌚' },
        digital:    { label: 'Horloge Digitale',     icon: '🕐' },
        calculator: { label: 'Calculatrice',          icon: '🔢' },
        thermometer:{ label: 'Thermomètre',           icon: '🌡️' },
        dashboard:  { label: 'Tableau de Bord',       icon: '🚗' },
        stopwatch:  { label: 'Chronomètre',           icon: '⏱️' },
        compass:    { label: 'Boussole',              icon: '🧭' },
        progress:   { label: 'Jauge Progrès',         icon: '📊' },
        weather:    { label: 'Widget Météo',          icon: '🌤️' },
        piano:      { label: 'Touches Piano',         icon: '🎹' },
        metronome:  { label: 'Métronome',             icon: '🎵' },
        alarm:      { label: 'Réveil',                icon: '⏰' },
        countdown:  { label: 'Minuterie',             icon: '🎯' },
        currency:   { label: 'Convertisseur Devises', icon: '💱' },
        units:      { label: 'Convertisseur Unités',  icon: '📏' },
        colorpicker:{ label: 'Pipette Couleur',       icon: '🎨' },
        gradient:   { label: 'Générateur Dégradé',    icon: '🌈' },
        dice:       { label: 'Dés',                   icon: '🎲' },
        slots:      { label: 'Machine à Sous',        icon: '🎰' },
        spinner:    { label: 'Roue Aléatoire',        icon: '🎡' },
        magic8:     { label: 'Boule Magique 8',       icon: '🎱' },
        oscilloscope:{ label: 'Oscilloscope',         icon: '〰️' },
        battery:    { label: 'Jauge Batterie',        icon: '🔋' },
        protractor: { label: 'Rapporteur',            icon: '📐' },
        bmi:        { label: 'Calculateur IMC',       icon: '⚖️' },
        morse:      { label: 'Code Morse',            icon: '📡' },
        password:   { label: 'Générateur Mdp',        icon: '🔐' },
        binary:     { label: 'Convertisseur Binaire', icon: '💻' },
        pomodoro:   { label: 'Minuteur Pomodoro',     icon: '🍅' },
        equalizer:  { label: 'Égaliseur',             icon: '🎛️' },
      }
    }
  };

  /* ── State ─────────────────────────────────────────────────────── */
  let vtcLang = 'en';
  let vtcImageData = null;    // base64 of uploaded image
  let vtcColors = [];         // extracted palette
  let vtcSelectedObj = 'clock';
  let vtcGeneratedCode = '';
  let vtcHistory = JSON.parse(localStorage.getItem('vtc_history') || '[]');
  const T = () => VTC_LANG[vtcLang] || VTC_LANG.en;

  /* ══════════════════════════════════════════════════════════════════
     🎨 COLOR EXTRACTOR — Canvas API, 100% offline
     ══════════════════════════════════════════════════════════════════ */
  function extractColors(imgEl, numColors = 5) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 80; canvas.height = 80;
    ctx.drawImage(imgEl, 0, 0, 80, 80);
    const pixels = ctx.getImageData(0, 0, 80, 80).data;
    const colorMap = {};
    for (let i = 0; i < pixels.length; i += 4) {
      const r = Math.round(pixels[i] / 20) * 20;
      const g = Math.round(pixels[i + 1] / 20) * 20;
      const b = Math.round(pixels[i + 2] / 20) * 20;
      const a = pixels[i + 3];
      if (a < 100) continue;
      const key = `${r},${g},${b}`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
    return Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numColors)
      .map(([k]) => {
        const [r, g, b] = k.split(',').map(Number);
        return `rgb(${r},${g},${b})`;
      });
  }

  function rgbToHex(rgb) {
    const m = rgb.match(/\d+/g);
    if (!m) return '#888888';
    return '#' + m.slice(0, 3).map(x => Number(x).toString(16).padStart(2, '0')).join('');
  }

  /* ══════════════════════════════════════════════════════════════════
     ⚙️ CODE GENERATORS — Each object type
     ══════════════════════════════════════════════════════════════════ */
  const Generators = {

    /* ⌚ ANALOG CLOCK */
    clock(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(30,41,59)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      const c3 = rgbToHex(colors[2] || 'rgb(255,255,255)');
      const isVintage = /vintage|retro|old/i.test(style);
      const isNeon    = /neon|cyber|glow/i.test(style);
      const bgColor   = isNeon ? '#050510' : (isVintage ? '#2c1810' : c1);
      const faceColor = isNeon ? '#0a0a1a' : (isVintage ? '#c8a96e' : '#1e293b');
      const handColor = isNeon ? '#00ffcc' : (isVintage ? '#8b5e3c' : c2);
      const numColor  = isNeon ? '#00ffcc' : (isVintage ? '#3d1f0a' : c3);
      const shadow    = isNeon ? `0 0 40px ${handColor}, 0 0 80px ${handColor}44` : '0 20px 60px rgba(0,0,0,0.6)';
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Analog Clock — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${bgColor};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .clock-wrap{display:flex;flex-direction:column;align-items:center;gap:24px}
    .clock-face{position:relative;width:320px;height:320px;border-radius:50%;background:${faceColor};border:6px solid ${handColor}44;box-shadow:${shadow};}
    .clock-center{position:absolute;width:14px;height:14px;background:${handColor};border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;}
    .hand{position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:4px 4px 0 0;}
    .hand-hour{width:7px;height:90px;background:${handColor};margin-left:-3.5px;border-radius:6px;}
    .hand-min{width:5px;height:120px;background:${numColor};margin-left:-2.5px;border-radius:6px;}
    .hand-sec{width:2px;height:130px;background:#ef4444;margin-left:-1px;border-radius:6px;}
    .tick{position:absolute;width:2px;height:12px;background:${numColor}88;left:50%;transform-origin:bottom center;opacity:0.6;}
    .tick.major{width:3px;height:20px;background:${numColor};opacity:1;}
    .num{position:absolute;font-size:14px;font-weight:900;color:${numColor};transform:translate(-50%,-50%);}
    .clock-label{color:${numColor}88;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;}
    ${isNeon ? `.clock-face{box-shadow:0 0 60px ${handColor}66, inset 0 0 40px ${handColor}11;} .hand-hour,.hand-min{filter:drop-shadow(0 0 8px ${handColor});}` : ''}
    ${isVintage ? `body{background:radial-gradient(circle,#3d2010,${bgColor});}` : ''}
  </style>
</head>
<body>
<div class="clock-wrap">
  <canvas id="clockCanvas" width="320" height="320" style="border-radius:50%;display:none;"></canvas>
  <div class="clock-face" id="clockFace"></div>
  <div class="clock-label">${isVintage ? 'CHRONOGRAPH' : (isNeon ? '⚡ CYBER CLOCK' : '◈ PRECISION TIME')}</div>
</div>
<script>
  const face = document.getElementById('clockFace');
  const cx = 160, cy = 160, r = 150;

  // Draw ticks & numbers
  for(let i = 0; i < 60; i++){
    const angle = (i * 6 - 90) * Math.PI / 180;
    const isMajor = i % 5 === 0;
    const inner = isMajor ? r - 22 : r - 14;
    const tick = document.createElement('div');
    tick.className = 'tick' + (isMajor ? ' major' : '');
    const tx = cx + Math.cos(angle) * (r - (isMajor ? 16 : 8));
    const ty = cy + Math.sin(angle) * (r - (isMajor ? 16 : 8));
    tick.style.cssText = \`left:\${tx}px;top:\${ty}px;transform:rotate(\${i*6}deg) translateX(-50%);\`;
    face.appendChild(tick);
  }
  [12,3,6,9].forEach((n,i)=>{
    const angle = (i * 90 - 90) * Math.PI / 180;
    const num = document.createElement('div');
    num.className = 'num';
    num.textContent = n;
    num.style.cssText = \`left:\${cx + Math.cos(angle)*115}px;top:\${cy + Math.sin(angle)*115}px;\`;
    face.appendChild(num);
  });

  // Hands
  const hH = document.createElement('div'); hH.className='hand hand-hour'; face.appendChild(hH);
  const hM = document.createElement('div'); hM.className='hand hand-min';  face.appendChild(hM);
  const hS = document.createElement('div'); hS.className='hand hand-sec';  face.appendChild(hS);
  const ctr = document.createElement('div'); ctr.className='clock-center'; face.appendChild(ctr);

  function tick(){
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds()/1000;
    const m = now.getMinutes() + s/60;
    const h = (now.getHours() % 12) + m/60;
    hS.style.transform = \`rotate(\${s*6}deg)\`;
    hM.style.transform = \`rotate(\${m*6}deg)\`;
    hH.style.transform = \`rotate(\${h*30}deg)\`;
  }
  tick();
  setInterval(tick, 50);
<\/script>
</body>
</html>`;
    },

    /* 🕐 DIGITAL CLOCK */
    digital(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(0,255,200)');
      const isRetro = /retro|vintage|old|amber|green/i.test(style);
      const isNeon  = /neon|cyber|glow|purple/i.test(style);
      const bg = isRetro ? '#0a0800' : (isNeon ? '#05000f' : c1);
      const clr = isRetro ? '#f5a623' : (isNeon ? '#bf00ff' : c2);
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Digital Clock — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;}
    .dclock{padding:48px 60px;background:rgba(255,255,255,0.03);border:1px solid ${clr}33;border-radius:24px;text-align:center;box-shadow:0 0 60px ${clr}22, inset 0 0 30px ${clr}08;}
    .time{font-family:'Share Tech Mono',monospace;font-size:86px;color:${clr};letter-spacing:8px;text-shadow:0 0 20px ${clr}, 0 0 40px ${clr}88;line-height:1;}
    .date{font-family:'Share Tech Mono',monospace;font-size:18px;color:${clr}88;margin-top:18px;letter-spacing:4px;}
    .sep{animation:blink 1s step-end infinite;}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    ${isRetro ? `body{background:radial-gradient(ellipse at center,#1a0f00,${bg});}` : ''}
    ${isNeon ? `.dclock{box-shadow:0 0 100px ${clr}44,inset 0 0 50px ${clr}11;}` : ''}
  </style>
</head>
<body>
<div class="dclock">
  <div class="time"><span id="dh">00</span><span class="sep">:</span><span id="dm">00</span><span class="sep">:</span><span id="ds">00</span></div>
  <div class="date" id="dd"></div>
</div>
<script>
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function pad(n){return String(n).padStart(2,'0');}
  function tick(){
    const n=new Date();
    document.getElementById('dh').textContent=pad(n.getHours());
    document.getElementById('dm').textContent=pad(n.getMinutes());
    document.getElementById('ds').textContent=pad(n.getSeconds());
    document.getElementById('dd').textContent=\`\${days[n.getDay()]} — \${months[n.getMonth()]} \${n.getDate()}, \${n.getFullYear()}\`;
  }
  tick(); setInterval(tick, 1000);
<\/script>
</body>
</html>`;
    },

    /* 🔢 CALCULATOR */
    calculator(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(30,41,59)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      const isDark   = /dark|black|night/i.test(style);
      const isGold   = /gold|luxury|premium/i.test(style);
      const bg  = isGold ? '#1a1400' : (isDark ? '#050810' : c1);
      const acc = isGold ? '#d4af37' : c2;
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Calculator — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${bg};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .calc{width:320px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:28px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,0.7);}
    .display{padding:28px 24px 16px;text-align:right;background:rgba(0,0,0,0.3);}
    .expr{font-size:14px;color:#94a3b8;min-height:20px;margin-bottom:4px;}
    .result{font-size:52px;font-weight:900;color:#fff;overflow:hidden;text-overflow:ellipsis;}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.05);}
    .btn{padding:22px 10px;border:none;font-size:18px;font-weight:700;cursor:pointer;transition:all 0.15s;background:rgba(255,255,255,0.04);color:#fff;font-family:'Inter',sans-serif;}
    .btn:hover{background:rgba(255,255,255,0.12);transform:scale(0.96);}
    .btn:active{transform:scale(0.92);}
    .btn.op{background:rgba(${acc.slice(1).match(/../g).map(h=>parseInt(h,16)).join(',')},0.15);color:${acc};}
    .btn.op:hover{background:rgba(${acc.slice(1).match(/../g).map(h=>parseInt(h,16)).join(',')},0.3);}
    .btn.eq{background:${acc};color:#fff;box-shadow:0 8px 24px ${acc}55;}
    .btn.eq:hover{filter:brightness(1.15);}
    .btn.zero{grid-column:span 2;}
    .btn.cl{color:#ef4444;}
  </style>
</head>
<body>
<div class="calc">
  <div class="display">
    <div class="expr" id="expr"></div>
    <div class="result" id="res">0</div>
  </div>
  <div class="grid">
    <button class="btn cl" onclick="clearAll()">AC</button>
    <button class="btn op" onclick="toggleSign()">+/−</button>
    <button class="btn op" onclick="percent()">%</button>
    <button class="btn op eq" onclick="op('/')">÷</button>
    <button class="btn" onclick="num(7)">7</button>
    <button class="btn" onclick="num(8)">8</button>
    <button class="btn" onclick="num(9)">9</button>
    <button class="btn op eq" onclick="op('*')">×</button>
    <button class="btn" onclick="num(4)">4</button>
    <button class="btn" onclick="num(5)">5</button>
    <button class="btn" onclick="num(6)">6</button>
    <button class="btn op eq" onclick="op('-')">−</button>
    <button class="btn" onclick="num(1)">1</button>
    <button class="btn" onclick="num(2)">2</button>
    <button class="btn" onclick="num(3)">3</button>
    <button class="btn op eq" onclick="op('+')">+</button>
    <button class="btn zero" onclick="num(0)">0</button>
    <button class="btn" onclick="dot()">.</button>
    <button class="btn eq" onclick="equals()">=</button>
  </div>
</div>
<script>
  let cur='0', prev='', operator='', freshResult=false;
  const res=document.getElementById('res'), expr=document.getElementById('expr');
  function update(){res.textContent=cur.length>10?parseFloat(cur).toExponential(4):cur;}
  function num(n){if(freshResult){cur=String(n);freshResult=false;}else{cur=cur==='0'?String(n):cur+n;}update();}
  function dot(){if(!cur.includes('.')){cur+='.';update();}}
  function op(o){prev=cur;operator=o;cur='0';expr.textContent=prev+' '+{'/':'÷','*':'×','-':'−','+':'+'}[o];}
  function equals(){
    if(!operator||!prev)return;
    const a=parseFloat(prev),b=parseFloat(cur);
    const ops={'+':a+b,'-':a-b,'*':a*b,'/':b!==0?a/b:'Err'};
    expr.textContent=prev+' '+{'/':'÷','*':'×','-':'−','+':'+'}[operator]+cur+' =';
    cur=String(ops[operator]);freshResult=true;operator='';prev='';update();
  }
  function clearAll(){cur='0';prev='';operator='';expr.textContent='';update();}
  function toggleSign(){cur=String(-parseFloat(cur));update();}
  function percent(){cur=String(parseFloat(cur)/100);update();}
<\/script>
</body>
</html>`;
    },

    /* 🌡️ THERMOMETER */
    thermometer(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thermometer — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .wrap{display:flex;flex-direction:column;align-items:center;gap:30px;}
    .gauge{position:relative;width:200px;height:200px;}
    svg{overflow:visible;}
    .lbl{font-size:48px;font-weight:900;color:#fff;text-align:center;text-shadow:0 0 20px ${c2}88;}
    .sub{font-size:13px;font-weight:700;color:#64748b;letter-spacing:3px;text-align:center;}
    .slider-wrap{display:flex;align-items:center;gap:14px;}
    .slider-wrap input{accent-color:${c2};width:200px;cursor:pointer;}
    .slider-wrap span{font-size:13px;color:#64748b;font-weight:700;width:60px;}
  </style>
</head>
<body>
<div class="wrap">
  <svg width="220" height="220" viewBox="0 0 220 220">
    <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="18" stroke-linecap="round"
      stroke-dasharray="??" stroke-dashoffset="0"
      transform="rotate(135 110 110)"/>
    <circle id="arcFg" cx="110" cy="110" r="90" fill="none" stroke="${c2}" stroke-width="18" stroke-linecap="round"
      stroke-dasharray="283 283"
      transform="rotate(135 110 110)"
      style="transition:stroke-dasharray 0.6s cubic-bezier(.4,0,.2,1); filter:drop-shadow(0 0 12px ${c2})"/>
    <text x="110" y="105" text-anchor="middle" font-size="42" font-weight="900" fill="#fff" font-family="Inter,sans-serif" id="tempText">22°</text>
    <text x="110" y="135" text-anchor="middle" font-size="13" fill="#64748b" font-family="Inter,sans-serif">CELSIUS</text>
  </svg>
  <div class="slider-wrap">
    <span id="sMin">-20°</span>
    <input type="range" min="-20" max="50" value="22" id="tempSlider" oninput="setTemp(this.value)"/>
    <span id="sMax">50°</span>
  </div>
  <div class="sub">TEMPERATURE MONITOR</div>
</div>
<script>
  const arc=document.getElementById('arcFg'), txt=document.getElementById('tempText');
  const totalLen=Math.PI*2*90*(270/360);
  function setTemp(v){
    const pct=(v-(-20))/(50-(-20));
    const filled=totalLen*pct;
    arc.setAttribute('stroke-dasharray',filled+' '+(totalLen-filled+283));
    txt.textContent=Math.round(v)+'°';
    const hue=v<0?200:(v<25?180:v<35?40:0);
    arc.setAttribute('stroke',\`hsl(\${hue},90%,55%)\`);
    arc.style.filter=\`drop-shadow(0 0 12px hsl(\${hue},90%,55%))\`;
  }
  setTemp(22);
<\/script>
</body>
</html>`;
    },

    /* 🚗 CAR DASHBOARD */
    dashboard(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(5,8,20)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Car Dashboard — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#030508;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .dash{display:flex;gap:30px;align-items:center;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:40px;box-shadow:0 40px 100px rgba(0,0,0,0.9);}
    .gauge-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;}
    .gauge-lbl{font-size:11px;font-weight:900;letter-spacing:3px;color:#475569;text-transform:uppercase;}
    .gauge-val{font-family:'Share Tech Mono',monospace;font-size:36px;color:#fff;text-align:center;}
    .gauge-unit{font-size:11px;color:#475569;font-weight:700;}
    .center-info{display:flex;flex-direction:column;align-items:center;gap:16px;}
    .speed-big{font-family:'Share Tech Mono',monospace;font-size:100px;line-height:1;color:#fff;text-shadow:0 0 30px rgba(255,255,255,0.3);}
    .speed-unit{font-size:16px;font-weight:900;letter-spacing:4px;color:#475569;}
    .controls{display:flex;gap:12px;margin-top:10px;}
    .ctrl-btn{padding:10px 20px;border-radius:12px;border:none;font-weight:900;font-size:14px;cursor:pointer;transition:all 0.2s;font-family:'Inter',sans-serif;}
    .ctrl-acc{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}55;}
    .ctrl-brk{background:#1e293b;color:#ef4444;border:1px solid #ef444433;}
    .ctrl-acc:hover{filter:brightness(1.2);}
    .ctrl-brk:hover{background:#ef444420;}
    .gear{font-family:'Share Tech Mono',monospace;font-size:48px;color:${c2};text-shadow:0 0 20px ${c2};}
    .indicators{display:flex;gap:8px;}
    .ind{width:10px;height:10px;border-radius:50%;background:#1e293b;transition:0.3s;}
    .ind.on{box-shadow:0 0 10px currentColor;}
  </style>
</head>
<body>
<div class="dash">
  <div class="gauge-wrap">
    <svg id="rpmGauge" width="160" height="160" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="65" fill="none" stroke="#1e293b" stroke-width="14" stroke-linecap="round" stroke-dasharray="306 408" transform="rotate(135 80 80)"/>
      <circle id="rpmArc" cx="80" cy="80" r="65" fill="none" stroke="${c2}" stroke-width="14" stroke-linecap="round" stroke-dasharray="0 408" transform="rotate(135 80 80)" style="transition:0.3s;filter:drop-shadow(0 0 8px ${c2});"/>
      <text x="80" y="78" text-anchor="middle" font-size="28" font-weight="900" fill="#fff" font-family="Share Tech Mono,monospace" id="rpmVal">0</text>
      <text x="80" y="98" text-anchor="middle" font-size="10" fill="#475569" font-family="Inter,sans-serif">RPM x100</text>
    </svg>
    <div class="gauge-lbl">Engine</div>
  </div>

  <div class="center-info">
    <div class="indicators">
      <div class="ind" id="ind-l" style="color:#22d3ee" title="Left Turn"></div>
      <div class="ind" id="ind-warn" style="color:#f59e0b" title="Warning"></div>
      <div class="ind" id="ind-r" style="color:#22d3ee" title="Right Turn"></div>
    </div>
    <div class="speed-big" id="speedVal">0</div>
    <div class="speed-unit">KM/H</div>
    <div class="gear" id="gearVal">N</div>
    <div class="controls">
      <button class="ctrl-btn ctrl-acc" onmousedown="startAccel()" onmouseup="stopAccel()" ontouchstart="startAccel()" ontouchend="stopAccel()">⬆ ACCEL</button>
      <button class="ctrl-btn ctrl-brk" onmousedown="startBrake()" onmouseup="stopBrake()" ontouchstart="startBrake()" ontouchend="stopBrake()">⬇ BRAKE</button>
    </div>
  </div>

  <div class="gauge-wrap">
    <svg id="speedGauge" width="160" height="160" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="65" fill="none" stroke="#1e293b" stroke-width="14" stroke-linecap="round" stroke-dasharray="306 408" transform="rotate(135 80 80)"/>
      <circle id="speedArc" cx="80" cy="80" r="65" fill="none" stroke="#3b82f6" stroke-width="14" stroke-linecap="round" stroke-dasharray="0 408" transform="rotate(135 80 80)" style="transition:0.3s;filter:drop-shadow(0 0 8px #3b82f6);"/>
      <text x="80" y="78" text-anchor="middle" font-size="28" font-weight="900" fill="#fff" font-family="Share Tech Mono,monospace" id="fuelVal">100</text>
      <text x="80" y="98" text-anchor="middle" font-size="10" fill="#475569" font-family="Inter,sans-serif">FUEL %</text>
    </svg>
    <div class="gauge-lbl">Fuel</div>
  </div>
</div>
<script>
  let speed=0, rpm=0, fuel=100, accel=false, brake=false, gear=0;
  const gears=['N','1','2','3','4','5','6'];
  const sVal=document.getElementById('speedVal'), rpmArc=document.getElementById('rpmArc'),
        speedArc=document.getElementById('speedArc'), gearEl=document.getElementById('gearVal'),
        fuelEl=document.getElementById('fuelVal'), rpmEl=document.getElementById('rpmVal');

  function setArc(el, pct, total=306){
    el.setAttribute('stroke-dasharray', (pct*total)+' 408');
  }

  function startAccel(){accel=true;} function stopAccel(){accel=false;}
  function startBrake(){brake=true;} function stopBrake(){brake=false;}

  setInterval(()=>{
    if(accel && speed<220 && fuel>0){speed+=1.5;fuel=Math.max(0,fuel-0.05);}
    if(brake && speed>0){speed-=3;}
    if(!accel && !brake && speed>0){speed-=0.4;}
    speed=Math.max(0,Math.min(220,speed));
    rpm=speed>0?(speed/220)*80+Math.random()*5:0;
    gear=speed<10?0:speed<40?1:speed<80?2:speed<120?3:speed<160?4:speed<200?5:6;
    sVal.textContent=Math.round(speed);
    rpmEl.textContent=Math.round(rpm);
    fuelEl.textContent=Math.round(fuel);
    gearEl.textContent=gears[gear];
    setArc(rpmArc,rpm/80);
    setArc(speedArc,speed/220);
    setArc(document.getElementById('speedArc'),fuel/100);
  },50);

  // Indicator blink
  setInterval(()=>{
    const ind=document.getElementById('ind-l');
    ind.classList.toggle('on');
    document.getElementById('ind-r').classList.toggle('on');
  },600);
<\/script>
</body>
</html>`;
    },

    /* ⏱️ STOPWATCH */
    stopwatch(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(16,185,129)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Stopwatch — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .sw{display:flex;flex-direction:column;align-items:center;gap:24px;padding:50px 60px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:32px;box-shadow:0 40px 100px rgba(0,0,0,0.6);}
    .time{font-family:'Share Tech Mono',monospace;font-size:80px;color:#fff;letter-spacing:4px;text-shadow:0 0 20px ${c2}66;}
    .ms{font-size:42px;color:${c2};}
    .btns{display:flex;gap:16px;}
    .btn{padding:14px 36px;border:none;border-radius:16px;font-size:16px;font-weight:900;cursor:pointer;transition:all 0.2s;font-family:'Inter',sans-serif;}
    .btn-start{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}44;}
    .btn-start:hover{filter:brightness(1.15);transform:translateY(-2px);}
    .btn-stop{background:#ef4444;color:#fff;box-shadow:0 8px 24px #ef444444;}
    .btn-stop:hover{filter:brightness(1.15);}
    .btn-lap{background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);}
    .btn-lap:hover{background:rgba(255,255,255,0.15);}
    .btn-reset{background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.08);}
    .laps{max-height:180px;overflow-y:auto;width:100%;display:flex;flex-direction:column;gap:6px;}
    .lap{display:flex;justify-content:space-between;padding:8px 16px;background:rgba(255,255,255,0.04);border-radius:10px;font-size:13px;font-family:'Share Tech Mono',monospace;color:#94a3b8;}
    .lap:first-child{color:${c2};font-weight:900;}
    .laps::-webkit-scrollbar{width:4px;} .laps::-webkit-scrollbar-thumb{background:${c2}44;border-radius:4px;}
  </style>
</head>
<body>
<div class="sw">
  <div class="time"><span id="mm">00</span>:<span id="ss">00</span><span class="ms">.<span id="ms">00</span></span></div>
  <div class="btns">
    <button class="btn btn-start" id="btnStart" onclick="startStop()">▶ START</button>
    <button class="btn btn-lap" onclick="addLap()">✦ LAP</button>
    <button class="btn btn-reset" onclick="reset()">↺ RESET</button>
  </div>
  <div class="laps" id="laps"></div>
</div>
<script>
  let running=false, elapsed=0, start=0, laps=[], lapCount=0, raf;
  const pad=n=>String(n).padStart(2,'0');
  function fmt(ms){
    const m=Math.floor(ms/60000), s=Math.floor((ms%60000)/1000), c=Math.floor((ms%1000)/10);
    return {m,s,c};
  }
  function render(){
    const t=fmt(elapsed);
    document.getElementById('mm').textContent=pad(t.m);
    document.getElementById('ss').textContent=pad(t.s);
    document.getElementById('ms').textContent=pad(t.c);
  }
  function tick(){elapsed=Date.now()-start;render();raf=requestAnimationFrame(tick);}
  function startStop(){
    if(running){running=false;cancelAnimationFrame(raf);document.getElementById('btnStart').textContent='▶ START';document.getElementById('btnStart').style.background='${c2}';}
    else{start=Date.now()-elapsed;running=true;tick();document.getElementById('btnStart').textContent='⏸ PAUSE';document.getElementById('btnStart').style.background='#f59e0b';}
  }
  function addLap(){
    if(!running)return;
    lapCount++;
    const t=fmt(elapsed);
    const item=document.createElement('div');item.className='lap';
    item.innerHTML=\`<span>Lap \${lapCount}</span><span>\${pad(t.m)}:\${pad(t.s)}.\${pad(t.c)}</span>\`;
    const lapsEl=document.getElementById('laps');
    lapsEl.insertBefore(item,lapsEl.firstChild);
  }
  function reset(){running=false;cancelAnimationFrame(raf);elapsed=0;lapCount=0;render();document.getElementById('laps').innerHTML='';document.getElementById('btnStart').textContent='▶ START';document.getElementById('btnStart').style.background='${c2}';}
<\/script>
</body>
</html>`;
    },

    /* 🧭 COMPASS */
    compass(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Compass — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:20px;}
    .compass{position:relative;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#1a2540,#0d1527);border:4px solid ${c2}44;box-shadow:0 0 60px ${c2}22,inset 0 0 40px rgba(0,0,0,0.5);}
    .needle{position:absolute;top:50%;left:50%;width:8px;height:120px;margin-left:-4px;margin-top:-110px;transform-origin:bottom center;border-radius:4px 4px 0 0;background:linear-gradient(to bottom,${c2},${c2}88);box-shadow:0 0 15px ${c2};}
    .needle-s{position:absolute;top:50%;left:50%;width:8px;height:70px;margin-left:-4px;transform-origin:top center;border-radius:0 0 4px 4px;background:linear-gradient(to bottom,#64748b,#94a3b8);}
    .rose{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
    .dir{position:absolute;font-size:18px;font-weight:900;color:#fff;}
    .deg{font-family:'Inter',sans-serif;font-size:36px;font-weight:900;color:#fff;text-align:center;}
    .heading{font-size:13px;color:#64748b;font-weight:700;letter-spacing:3px;}
    input[type=range]{accent-color:${c2};width:220px;cursor:pointer;}
  </style>
</head>
<body>
<div class="compass" id="comp">
  <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:900;color:${c2};">N</div>
  <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:16px;font-weight:700;color:#64748b;">S</div>
  <div style="position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:700;color:#fff;">E</div>
  <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:700;color:#fff;">W</div>
  <div class="needle" id="needle"></div>
  <div class="needle-s" id="needleS"></div>
  <div style="position:absolute;width:20px;height:20px;background:${c2};border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 20px ${c2};z-index:10;"></div>
</div>
<div class="deg"><span id="degVal">0</span>°</div>
<div class="heading" id="headingName">NORTH</div>
<input type="range" min="0" max="359" value="0" oninput="setDeg(this.value)"/>
<script>
  const dirs=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  function setDeg(v){
    document.getElementById('needle').style.transform=\`rotate(\${v}deg)\`;
    document.getElementById('needleS').style.transform=\`rotate(\${v}deg)\`;
    document.getElementById('degVal').textContent=v;
    const dName=dirs[Math.round(v/22.5)%16];
    document.getElementById('headingName').textContent={N:'NORTH',NE:'NORTHEAST',E:'EAST',SE:'SOUTHEAST',S:'SOUTH',SW:'SOUTHWEST',W:'WEST',NW:'NORTHWEST'}[dName]||dName;
  }
  // Auto-animate
  let a=0;
  setInterval(()=>{a=(a+0.3)%360;setDeg(Math.round(a));document.querySelector('input').value=Math.round(a);},30);
<\/script>
</body>
</html>`;
    },

    /* 📊 PROGRESS GAUGE */
    progress(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Progress Gauge — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:30px;}
    .gauges{display:flex;gap:30px;flex-wrap:wrap;justify-content:center;}
    .g{display:flex;flex-direction:column;align-items:center;gap:10px;}
    .g-lbl{font-size:11px;font-weight:900;letter-spacing:2px;color:#475569;text-transform:uppercase;}
    input[type=range]{accent-color:${c2};width:200px;}
  </style>
</head>
<body>
<div class="gauges">
  <div class="g">
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="16"/>
      <circle cx="90" cy="90" r="75" fill="none" stroke="${c2}" stroke-width="16" stroke-linecap="round"
        stroke-dasharray="471" stroke-dashoffset="118" transform="rotate(-90 90 90)"
        id="g1arc" style="transition:0.5s;filter:drop-shadow(0 0 10px ${c2})"/>
      <text x="90" y="85" text-anchor="middle" font-size="36" font-weight="900" fill="#fff" font-family="Inter,sans-serif" id="g1v">75%</text>
      <text x="90" y="108" text-anchor="middle" font-size="11" fill="#475569" font-family="Inter,sans-serif">PERFORMANCE</text>
    </svg>
    <div class="g-lbl">Performance</div>
    <input type="range" min="0" max="100" value="75" oninput="setGauge('g1arc','g1v',this.value)"/>
  </div>
  <div class="g">
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="16"/>
      <circle cx="90" cy="90" r="75" fill="none" stroke="#10b981" stroke-width="16" stroke-linecap="round"
        stroke-dasharray="471" stroke-dashoffset="236" transform="rotate(-90 90 90)"
        id="g2arc" style="transition:0.5s;filter:drop-shadow(0 0 10px #10b981)"/>
      <text x="90" y="85" text-anchor="middle" font-size="36" font-weight="900" fill="#fff" font-family="Inter,sans-serif" id="g2v">50%</text>
      <text x="90" y="108" text-anchor="middle" font-size="11" fill="#475569" font-family="Inter,sans-serif">MEMORY</text>
    </svg>
    <div class="g-lbl">Memory</div>
    <input type="range" min="0" max="100" value="50" oninput="setGauge('g2arc','g2v',this.value,'#10b981')"/>
  </div>
  <div class="g">
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="16"/>
      <circle cx="90" cy="90" r="75" fill="none" stroke="#f59e0b" stroke-width="16" stroke-linecap="round"
        stroke-dasharray="471" stroke-dashoffset="330" transform="rotate(-90 90 90)"
        id="g3arc" style="transition:0.5s;filter:drop-shadow(0 0 10px #f59e0b)"/>
      <text x="90" y="85" text-anchor="middle" font-size="36" font-weight="900" fill="#fff" font-family="Inter,sans-serif" id="g3v">30%</text>
      <text x="90" y="108" text-anchor="middle" font-size="11" fill="#475569" font-family="Inter,sans-serif">STORAGE</text>
    </svg>
    <div class="g-lbl">Storage</div>
    <input type="range" min="0" max="100" value="30" oninput="setGauge('g3arc','g3v',this.value,'#f59e0b')"/>
  </div>
</div>
<script>
  function setGauge(arcId, valId, v, color='${c2}'){
    const pct=parseInt(v)/100;
    const total=471;
    const offset=total-(total*pct);
    document.getElementById(arcId).setAttribute('stroke-dashoffset', offset);
    document.getElementById(valId).textContent=Math.round(v)+'%';
  }
<\/script>
</body>
</html>`;
    },

    /* 🌤️ WEATHER WIDGET */
    weather(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Weather Widget — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
    .widget{width:340px;background:linear-gradient(135deg,${c2}22,rgba(255,255,255,0.03));border:1px solid ${c2}33;border-radius:28px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,0.6);}
    .top{padding:32px 28px 20px;display:flex;justify-content:space-between;align-items:flex-start;}
    .city{font-size:22px;font-weight:900;color:#fff;display:flex;flex-direction:column;gap:4px;}
    .country{font-size:13px;color:#64748b;font-weight:700;}
    .icon{font-size:64px;animation:float 3s ease-in-out infinite;}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    .temp-row{padding:0 28px 16px;display:flex;align-items:flex-end;gap:8px;}
    .temp-big{font-size:86px;font-weight:900;line-height:1;color:#fff;}
    .temp-unit{font-size:32px;color:#64748b;margin-bottom:12px;}
    .desc{padding:0 28px 24px;font-size:16px;color:#94a3b8;font-weight:700;text-transform:capitalize;}
    .divider{height:1px;background:rgba(255,255,255,0.06);margin:0 28px;}
    .details{display:grid;grid-template-columns:repeat(3,1fr);padding:20px 28px;gap:12px;}
    .detail{display:flex;flex-direction:column;align-items:center;gap:4px;}
    .d-icon{font-size:20px;}
    .d-val{font-size:15px;font-weight:900;color:#fff;}
    .d-lbl{font-size:10px;font-weight:700;color:#475569;letter-spacing:1px;}
    .forecast{display:flex;justify-content:space-between;padding:16px 28px 24px;}
    .fc{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;}
    .fc-day{color:#475569;font-weight:700;}
    .fc-icon{font-size:20px;}
    .fc-temp{color:#fff;font-weight:900;}
    .choose{padding:16px 28px;display:flex;gap:8px;flex-wrap:wrap;}
    .wbtn{padding:7px 14px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);border-radius:20px;color:#fff;font-size:12px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:700;transition:0.2s;}
    .wbtn:hover{background:rgba(255,255,255,0.15);}
  </style>
</head>
<body>
<div class="widget">
  <div class="top">
    <div class="city"><span id="cityName">Paris</span><span class="country">🇫🇷 France</span></div>
    <div class="icon" id="wIcon">☀️</div>
  </div>
  <div class="temp-row">
    <div class="temp-big" id="wTemp">22</div>
    <div class="temp-unit">°C</div>
  </div>
  <div class="desc" id="wDesc">Clear sky — Sunny</div>
  <div class="divider"></div>
  <div class="details">
    <div class="detail"><span class="d-icon">💧</span><span class="d-val" id="wHum">45%</span><span class="d-lbl">HUMIDITY</span></div>
    <div class="detail"><span class="d-icon">🌬️</span><span class="d-val" id="wWind">12 km/h</span><span class="d-lbl">WIND</span></div>
    <div class="detail"><span class="d-icon">👁️</span><span class="d-val" id="wVis">10 km</span><span class="d-lbl">VISIBILITY</span></div>
  </div>
  <div class="divider"></div>
  <div class="forecast">
    <div class="fc"><div class="fc-day">MON</div><div class="fc-icon">⛅</div><div class="fc-temp">19°</div></div>
    <div class="fc"><div class="fc-day">TUE</div><div class="fc-icon">🌧️</div><div class="fc-temp">15°</div></div>
    <div class="fc"><div class="fc-day">WED</div><div class="fc-icon">☀️</div><div class="fc-temp">24°</div></div>
    <div class="fc"><div class="fc-day">THU</div><div class="fc-icon">⛈️</div><div class="fc-temp">18°</div></div>
    <div class="fc"><div class="fc-day">FRI</div><div class="fc-icon">🌤️</div><div class="fc-temp">22°</div></div>
  </div>
  <div class="choose">
    <button class="wbtn" onclick="setW('☀️','Clear sky — Sunny',22,45,'12 km/h','10 km')">☀️ Sunny</button>
    <button class="wbtn" onclick="setW('🌧️','Rainy — Overcast',14,88,'18 km/h','4 km')">🌧️ Rainy</button>
    <button class="wbtn" onclick="setW('❄️','Snowing — Cold',-3,70,'8 km/h','2 km')">❄️ Snow</button>
    <button class="wbtn" onclick="setW('⛈️','Thunderstorm',17,92,'35 km/h','1 km')">⛈️ Storm</button>
  </div>
</div>
<script>
  function setW(icon,desc,temp,hum,wind,vis){
    document.getElementById('wIcon').textContent=icon;
    document.getElementById('wDesc').textContent=desc;
    document.getElementById('wTemp').textContent=temp;
    document.getElementById('wHum').textContent=hum+'%';
    document.getElementById('wWind').textContent=wind;
    document.getElementById('wVis').textContent=vis;
  }
<\/script>
</body>
</html>`;
    },

    /* 🎹 PIANO */
    piano(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Piano — Vision to Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:28px;}
    .piano{position:relative;display:flex;background:#1a0f00;border-radius:0 0 16px 16px;border:4px solid #2c1a00;box-shadow:0 30px 80px rgba(0,0,0,0.8);}
    .key-w{width:64px;height:220px;background:linear-gradient(to bottom,#fefefe,#e8e8e8);border:2px solid #aaa;border-top:none;border-radius:0 0 10px 10px;cursor:pointer;position:relative;transition:background 0.08s;}
    .key-w:hover,.key-w.active{background:linear-gradient(to bottom,#dbeafe,#bfdbfe);}
    .key-b{width:42px;height:140px;background:linear-gradient(to bottom,#1a1a1a,#333);border:none;border-radius:0 0 8px 8px;cursor:pointer;position:absolute;z-index:2;transition:background 0.08s;box-shadow:2px 4px 8px rgba(0,0,0,0.8);}
    .key-b:hover,.key-b.active{background:linear-gradient(to bottom,#2563eb,#1d4ed8);}
    .key-lbl{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:900;color:#94a3b8;}
    .key-w .key-lbl{color:#64748b;}
    .note-display{font-size:36px;font-weight:900;color:#fff;min-height:50px;text-align:center;letter-spacing:2px;text-shadow:0 0 20px rgba(59,130,246,0.8);}
    .hint{font-size:12px;color:#475569;font-weight:700;letter-spacing:2px;}
  </style>
</head>
<body>
<div class="note-display" id="noteDisp">♪ Play a note</div>
<div class="piano" id="piano"></div>
<div class="hint">CLICK KEYS TO PLAY</div>
<script>
  const notes=['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5'];
  const blacks=[{n:'C#4',pos:1},{n:'D#4',pos:2},{n:'F#4',pos:4},{n:'G#4',pos:5},{n:'A#4',pos:6},{n:'C#5',pos:8},{n:'D#5',pos:9},{n:'F#5',pos:11},{n:'G#5',pos:12}];
  const freqs={'C4':261.63,'D4':293.66,'E4':329.63,'F4':349.23,'G4':392,'A4':440,'B4':493.88,'C5':523.25,'D5':587.33,'E5':659.25,'F5':698.46,'G5':783.99,'C#4':277.18,'D#4':311.13,'F#4':369.99,'G#4':415.3,'A#4':466.16,'C#5':554.37,'D#5':622.25,'F#5':739.99,'G#5':830.61};
  const ctx=new AudioContext();
  function playNote(n){
    const osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.type='triangle'; osc.frequency.value=freqs[n]||440;
    gain.gain.setValueAtTime(0.3,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+1.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime+1.5);
    document.getElementById('noteDisp').textContent='♪ '+n;
  }
  const piano=document.getElementById('piano');
  notes.forEach((n,i)=>{
    const k=document.createElement('div'); k.className='key-w';
    k.innerHTML=\`<div class="key-lbl">\${n}</div>\`;
    k.onclick=()=>playNote(n);
    k.onmousedown=()=>k.classList.add('active');
    k.onmouseup=()=>k.classList.remove('active');
    piano.appendChild(k);
  });
  blacks.forEach(({n,pos})=>{
    const k=document.createElement('div'); k.className='key-b';
    k.style.left=(pos*64-22)+'px';
    k.style.top='0';
    k.innerHTML=\`<div class="key-lbl" style="color:#94a3b8;bottom:8px;">\${n.replace('4','').replace('5','')}</div>\`;
    k.onclick=()=>playNote(n);
    k.onmousedown=()=>k.classList.add('active');
    k.onmouseup=()=>k.classList.remove('active');
    piano.appendChild(k);
  });
<\/script>
</body>
</html>`;
    },

    /* 🎵 METRONOME */
    metronome(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(245,158,11)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Metronome — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.metro{display:flex;flex-direction:column;align-items:center;gap:24px;padding:50px 60px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:32px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
.pendulum-wrap{width:200px;height:200px;position:relative;display:flex;align-items:flex-end;justify-content:center;}
.pendulum{width:4px;height:170px;background:linear-gradient(to bottom,${c2},rgba(255,255,255,0.3));border-radius:4px;transform-origin:top center;transform:rotate(0deg);transition:transform 0s;}
.bob{width:28px;height:28px;background:${c2};border-radius:50%;position:absolute;bottom:0;left:50%;transform:translateX(-50%);box-shadow:0 0 20px ${c2};}
.pivot{width:14px;height:14px;background:#fff;border-radius:50%;position:absolute;top:0;left:50%;transform:translateX(-50%);}
.bpm-display{font-size:72px;font-weight:900;color:#fff;line-height:1;}
.bpm-label{font-size:11px;font-weight:900;color:#475569;letter-spacing:3px;}
.controls{display:flex;gap:12px;align-items:center;}
.btn-metro{padding:12px 28px;border:none;border-radius:14px;font-size:15px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.btn-play{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}44;}
.btn-play:hover{filter:brightness(1.15);transform:translateY(-2px);}
input[type=range]{accent-color:${c2};width:200px;cursor:pointer;}
.beat-dot{width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.1);transition:background 0.05s,box-shadow 0.05s;}
.beat-dot.on{background:${c2};box-shadow:0 0 14px ${c2};}
.dots{display:flex;gap:8px;}
</style></head><body>
<div class="metro">
  <div class="pendulum-wrap">
    <div class="pivot"></div>
    <div class="pendulum" id="pend"><div class="bob"></div></div>
  </div>
  <div class="bpm-display" id="bpmShow">120</div>
  <div class="bpm-label">BPM</div>
  <input type="range" min="40" max="240" value="120" oninput="setBPM(this.value)"/>
  <div class="dots" id="dots"></div>
  <div class="controls">
    <button class="btn-metro btn-play" id="btnPlay" onclick="togglePlay()">▶ START</button>
  </div>
</div>
<script>
  let bpm=120,playing=false,beat=0,timer=null,angle=30;
  const pend=document.getElementById('pend'), dotsEl=document.getElementById('dots');
  let dir=1, beats=4;
  for(let i=0;i<beats;i++){const d=document.createElement('div');d.className='beat-dot';dotsEl.appendChild(d);}
  function setBPM(v){bpm=parseInt(v);document.getElementById('bpmShow').textContent=v;if(playing){stop();start();}}
  function togglePlay(){playing?stop():start();}
  function start(){
    playing=true;document.getElementById('btnPlay').textContent='⏹ STOP';
    const ms=60000/bpm;
    const step=()=>{
      angle=-angle;
      pend.style.transition=\`transform \${ms/1000}s ease-in-out\`;
      pend.style.transform=\`rotate(\${angle}deg)\`;
      // Flash beat dot
      const dots=dotsEl.querySelectorAll('.beat-dot');
      dots.forEach(d=>d.classList.remove('on'));
      dots[beat%beats].classList.add('on');
      beat++;
      // Click sound via WebAudio
      try{
        const ctx=new(window.AudioContext||window.webkitAudioContext)();
        const osc=ctx.createOscillator(),g=ctx.createGain();
        osc.frequency.value=beat%beats===1?1320:880;
        g.gain.setValueAtTime(0.3,ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.05);
        osc.connect(g);g.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+0.05);
      }catch(e){}
      timer=setTimeout(step,ms);
    };
    step();
  }
  function stop(){playing=false;clearTimeout(timer);document.getElementById('btnPlay').textContent='▶ START';pend.style.transition='transform 0.5s ease';pend.style.transform='rotate(0deg)';dotsEl.querySelectorAll('.beat-dot').forEach(d=>d.classList.remove('on'));}
<\/script></body></html>`;
    },

    /* ⏰ ALARM CLOCK */
    alarm(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Alarm Clock — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.alrm{display:flex;flex-direction:column;align-items:center;gap:20px;padding:50px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:32px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
.time{font-family:'Share Tech Mono',monospace;font-size:90px;color:#fff;letter-spacing:6px;text-shadow:0 0 30px rgba(255,255,255,0.2);}
.alarm-row{display:flex;align-items:center;gap:16px;}
.alarm-time{font-size:24px;font-weight:900;color:${c2};font-family:'Share Tech Mono',monospace;}
.alarm-lbl{font-size:12px;font-weight:700;color:#475569;letter-spacing:2px;}
.btn-alrm{padding:10px 22px;border:none;border-radius:12px;font-size:13px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.btn-set{background:${c2};color:#fff;box-shadow:0 6px 18px ${c2}44;}
.btn-set:hover{filter:brightness(1.15);}
.btn-clear{background:rgba(255,255,255,0.06);color:#64748b;border:1px solid rgba(255,255,255,0.1);}
input[type=time]{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;padding:8px 14px;font-size:18px;font-family:'Share Tech Mono',monospace;outline:none;}
.ringing{animation:ring 0.3s ease-in-out infinite alternate;}
@keyframes ring{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
.alarm-status{font-size:12px;font-weight:700;color:#475569;letter-spacing:2px;min-height:20px;}
</style></head><body>
<div class="alrm" id="alrmWrap">
  <div style="font-size:52px;transition:0.3s;" id="alrmIcon">⏰</div>
  <div class="time" id="curTime">00:00:00</div>
  <div class="alarm-lbl">SET ALARM</div>
  <div class="alarm-row">
    <input type="time" id="alrmInput" value="07:00"/>
    <button class="btn-alrm btn-set" onclick="setAlarm()">SET</button>
    <button class="btn-alrm btn-clear" onclick="clearAlarm()">CLEAR</button>
  </div>
  <div class="alarm-status" id="alrmStatus">No alarm set</div>
</div>
<script>
  let alarmTime=null,ringing=false,raf;
  const pad=n=>String(n).padStart(2,'0');
  function tick(){
    const n=new Date();
    const h=pad(n.getHours()),m=pad(n.getMinutes()),s=pad(n.getSeconds());
    document.getElementById('curTime').textContent=h+':'+m+':'+s;
    if(alarmTime&&!ringing&&h+':'+m===alarmTime&&s==='00'){triggerAlarm();}
    requestAnimationFrame(tick);
  }
  tick();
  function setAlarm(){
    alarmTime=document.getElementById('alrmInput').value;
    document.getElementById('alrmStatus').textContent='⏰ Alarm set for '+alarmTime;
    document.getElementById('alrmStatus').style.color='${c2}';
  }
  function clearAlarm(){alarmTime=null;ringing=false;document.getElementById('alrmStatus').textContent='No alarm set';document.getElementById('alrmStatus').style.color='#475569';document.getElementById('alrmIcon').className='';}
  function triggerAlarm(){
    ringing=true;
    document.getElementById('alrmIcon').className='ringing';
    document.getElementById('alrmStatus').textContent='🔔 RINGING! Click CLEAR to stop.';
    document.getElementById('alrmStatus').style.color='#ef4444';
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      let i=0;
      const ring=()=>{if(i++>20||!ringing)return;const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=i%2?880:1320;g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.2);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+0.2);setTimeout(ring,300);};ring();
    }catch(e){}
  }
<\/script></body></html>`;
    },

    /* 🎯 COUNTDOWN TIMER */
    countdown(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Countdown Timer — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.cd{display:flex;flex-direction:column;align-items:center;gap:24px;padding:50px 60px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:32px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
.cd-display{font-family:'Share Tech Mono',monospace;font-size:88px;color:#fff;letter-spacing:8px;text-shadow:0 0 30px ${c2}66;transition:color 0.3s;}
.cd-display.danger{color:#ef4444;text-shadow:0 0 30px #ef444466;animation:pulse 0.5s ease-in-out infinite alternate;}
@keyframes pulse{from{opacity:1}to{opacity:0.5}}
.presets{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}
.preset{padding:8px 16px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);border-radius:20px;color:#94a3b8;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.preset:hover{border-color:${c2};color:${c2};}
.custom{display:flex;gap:10px;align-items:center;}
.custom input{width:70px;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:16px;font-weight:700;text-align:center;outline:none;font-family:'Share Tech Mono',monospace;}
.custom span{color:#475569;font-weight:700;}
.btns{display:flex;gap:12px;}
.btn{padding:12px 28px;border:none;border-radius:14px;font-size:15px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.btn-s{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}44;}
.btn-s:hover{filter:brightness(1.15);transform:translateY(-2px);}
.btn-r{background:rgba(255,255,255,0.06);color:#64748b;border:1px solid rgba(255,255,255,0.1);}
.cd-label{font-size:12px;font-weight:900;color:#475569;letter-spacing:3px;}
</style></head><body>
<div class="cd">
  <div style="font-size:40px;">⏳</div>
  <div class="cd-display" id="cdDisp">05:00</div>
  <div class="cd-label" id="cdLbl">COUNTDOWN</div>
  <div class="presets">
    <button class="preset" onclick="setMin(1)">1 min</button>
    <button class="preset" onclick="setMin(3)">3 min</button>
    <button class="preset" onclick="setMin(5)">5 min</button>
    <button class="preset" onclick="setMin(10)">10 min</button>
    <button class="preset" onclick="setMin(25)">25 min 🍅</button>
    <button class="preset" onclick="setMin(60)">1 hour</button>
  </div>
  <div class="custom">
    <input type="number" id="inMin" value="5" min="0" max="99"/> <span>min</span>
    <input type="number" id="inSec" value="0"  min="0" max="59"/> <span>sec</span>
  </div>
  <div class="btns">
    <button class="btn btn-s" id="btnCD" onclick="startStop()">▶ START</button>
    <button class="btn btn-r" onclick="resetCD()">↺ RESET</button>
  </div>
</div>
<script>
  let remaining=300,running=false,timer=null;
  const disp=document.getElementById('cdDisp'),lbl=document.getElementById('cdLbl');
  function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function render(){disp.textContent=fmt(remaining);disp.className='cd-display'+(remaining<=10&&remaining>0?' danger':'');}
  function setMin(m){remaining=m*60;running=false;clearInterval(timer);document.getElementById('btnCD').textContent='▶ START';render();}
  function startStop(){
    if(running){running=false;clearInterval(timer);document.getElementById('btnCD').textContent='▶ START';}
    else{
      remaining=parseInt(document.getElementById('inMin').value||0)*60+parseInt(document.getElementById('inSec').value||0);
      running=true;document.getElementById('btnCD').textContent='⏸ PAUSE';
      timer=setInterval(()=>{if(remaining<=0){clearInterval(timer);running=false;lbl.textContent='✅ DONE!';disp.className='cd-display';return;}remaining--;render();},1000);
    }
  }
  function resetCD(){running=false;clearInterval(timer);remaining=parseInt(document.getElementById('inMin').value||0)*60+parseInt(document.getElementById('inSec').value||0);lbl.textContent='COUNTDOWN';document.getElementById('btnCD').textContent='▶ START';render();}
  render();
<\/script></body></html>`;
    },

    /* 💱 CURRENCY CONVERTER */
    currency(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(16,185,129)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Currency Converter — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.cvt{width:380px;padding:40px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
h2{font-size:20px;font-weight:900;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:10px;}
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
label{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;text-transform:uppercase;}
.row{display:flex;gap:10px;}
input[type=number]{flex:1;padding:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:20px;font-weight:700;outline:none;font-family:'Inter',sans-serif;transition:border 0.2s;}
input[type=number]:focus{border-color:${c2};}
select{padding:14px 10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:14px;font-weight:700;outline:none;font-family:'Inter',sans-serif;cursor:pointer;}
.swap-btn{width:100%;padding:14px;margin:8px 0;border:none;border-radius:14px;background:${c2};color:#fff;font-size:15px;font-weight:900;cursor:pointer;box-shadow:0 8px 24px ${c2}44;transition:all 0.2s;font-family:'Inter',sans-serif;}
.swap-btn:hover{filter:brightness(1.1);transform:translateY(-2px);}
.result{padding:20px;background:rgba(255,255,255,0.04);border:1px solid ${c2}33;border-radius:16px;text-align:center;}
.result-val{font-size:42px;font-weight:900;color:${c2};}
.result-lbl{font-size:13px;color:#475569;margin-top:4px;}
.rates{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
.rate-chip{padding:5px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;font-size:11px;color:#94a3b8;font-weight:700;}
</style></head><body>
<div class="cvt">
  <h2>💱 Currency Converter</h2>
  <div class="field"><label>Amount</label>
    <input type="number" id="cvtAmt" value="100" min="0" oninput="convert()"/></div>
  <div class="field"><label>From</label>
    <select id="cvtFrom" onchange="convert()">
      <option value="USD">🇺🇸 USD — Dollar</option><option value="EUR" selected>🇪🇺 EUR — Euro</option>
      <option value="GBP">🇬🇧 GBP — Pound</option><option value="JPY">🇯🇵 JPY — Yen</option>
      <option value="CAD">🇨🇦 CAD — Dollar CA</option><option value="CHF">🇨🇭 CHF — Franc</option>
      <option value="RON">🇷🇴 RON — Leu</option><option value="CNY">🇨🇳 CNY — Yuan</option>
    </select></div>
  <button class="swap-btn" onclick="swapCurr()">⇅ SWAP CURRENCIES</button>
  <div class="field"><label>To</label>
    <select id="cvtTo" onchange="convert()">
      <option value="USD" selected>🇺🇸 USD — Dollar</option><option value="EUR">🇪🇺 EUR — Euro</option>
      <option value="GBP">🇬🇧 GBP — Pound</option><option value="JPY">🇯🇵 JPY — Yen</option>
      <option value="CAD">🇨🇦 CAD — Dollar CA</option><option value="CHF">🇨🇭 CHF — Franc</option>
      <option value="RON">🇷🇴 RON — Leu</option><option value="CNY">🇨🇳 CNY — Yuan</option>
    </select></div>
  <div class="result"><div class="result-val" id="cvtResult">108.00</div><div class="result-lbl" id="cvtLbl">1 EUR = 1.08 USD</div></div>
  <div class="rates" id="rateChips"></div>
</div>
<script>
  const R={USD:1,EUR:0.926,GBP:0.792,JPY:149.8,CAD:1.36,CHF:0.904,RON:4.67,CNY:7.24};
  function convert(){
    const amt=parseFloat(document.getElementById('cvtAmt').value)||0;
    const from=document.getElementById('cvtFrom').value;
    const to=document.getElementById('cvtTo').value;
    const res=(amt/R[from])*R[to];
    document.getElementById('cvtResult').textContent=res.toLocaleString('en',{maximumFractionDigits:2})+' '+to;
    document.getElementById('cvtLbl').textContent=\`1 \${from} = \${(R[to]/R[from]).toFixed(4)} \${to}\`;
    // Mini chips
    const chips=document.getElementById('rateChips');
    chips.innerHTML=Object.entries(R).filter(([k])=>k!==from).map(([k,v])=>
      \`<div class="rate-chip">1 \${from} = \${(v/R[from]).toFixed(2)} \${k}</div>\`).join('');
  }
  function swapCurr(){const f=document.getElementById('cvtFrom'),t=document.getElementById('cvtTo');[f.value,t.value]=[t.value,f.value];convert();}
  convert();
<\/script></body></html>`;
    },

    /* 📏 UNIT CONVERTER */
    units(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(139,92,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Unit Converter — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.uc{width:400px;padding:36px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
h2{font-size:20px;font-weight:900;color:#fff;margin-bottom:20px;}
.tabs{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap;}
.tab{padding:7px 14px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);border-radius:20px;color:#64748b;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.tab.active{background:${c2};border-color:${c2};color:#fff;}
.uc-row{display:flex;gap:10px;margin-bottom:12px;}
input{flex:1;padding:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:16px;font-weight:700;outline:none;font-family:'Inter',sans-serif;transition:border 0.2s;}
input:focus{border-color:${c2};}
select{padding:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:13px;font-weight:700;outline:none;font-family:'Inter',sans-serif;cursor:pointer;min-width:100px;}
.eq{font-size:28px;color:${c2};align-self:center;font-weight:900;}
.result-box{padding:18px;background:rgba(139,92,246,0.1);border:1px solid ${c2}33;border-radius:16px;font-size:28px;font-weight:900;color:${c2};text-align:center;margin-top:8px;}
</style></head><body>
<div class="uc">
  <h2>📏 Unit Converter</h2>
  <div class="tabs">
    <button class="tab active" onclick="setMode('length',this)">📏 Length</button>
    <button class="tab" onclick="setMode('weight',this)">⚖️ Weight</button>
    <button class="tab" onclick="setMode('temp',this)">🌡️ Temp</button>
    <button class="tab" onclick="setMode('area',this)">🗺️ Area</button>
    <button class="tab" onclick="setMode('speed',this)">🚀 Speed</button>
  </div>
  <div class="uc-row">
    <input type="number" id="ucVal" value="1" oninput="convert()"/>
    <select id="ucFrom" onchange="convert()"></select>
  </div>
  <div class="uc-row"><select id="ucTo" onchange="convert()"></select></div>
  <div class="result-box" id="ucRes">—</div>
</div>
<script>
  const MODES={
    length:{units:['m','km','cm','mm','mi','ft','in','yd'],toM:{m:1,km:1000,cm:0.01,mm:0.001,mi:1609.34,ft:0.3048,in:0.0254,yd:0.9144}},
    weight:{units:['kg','g','lb','oz','t','mg'],toBase:{kg:1,g:0.001,lb:0.453592,oz:0.028349,t:1000,mg:0.000001}},
    temp:{units:['°C','°F','K'],special:true},
    area:{units:['m²','km²','ft²','ac','ha'],toM2:{'m²':1,'km²':1e6,'ft²':0.0929,'ac':4046.86,'ha':1e4}},
    speed:{units:['m/s','km/h','mph','knot'],toMs:{'m/s':1,'km/h':0.2778,'mph':0.44704,'knot':0.51444}}
  };
  let mode='length';
  function setMode(m,btn){
    mode=m;
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    const units=MODES[m].units;
    ['ucFrom','ucTo'].forEach((id,i)=>{
      const s=document.getElementById(id);s.innerHTML='';
      units.forEach((u,j)=>{const o=document.createElement('option');o.value=u;o.textContent=u;if(j===i)o.selected=true;s.appendChild(o);});
    });
    convert();
  }
  function convert(){
    const v=parseFloat(document.getElementById('ucVal').value)||0;
    const from=document.getElementById('ucFrom').value;
    const to=document.getElementById('ucTo').value;
    let res;
    if(mode==='temp'){
      const toC={'°C':v,'°F':(v-32)*5/9,'K':v-273.15};
      const fromC={'°C':c=>c,'°F':c=>c*9/5+32,'K':c=>c+273.15};
      res=fromC[to](toC[from]);
    } else {
      const key=Object.keys(MODES[mode]).find(k=>k.startsWith('to'));
      const map=MODES[mode][key];
      res=(v*map[from])/map[to];
    }
    document.getElementById('ucRes').textContent=(isNaN(res)?'—':res.toLocaleString('en',{maximumFractionDigits:6}))+' '+to;
  }
  setMode('length',document.querySelector('.tab'));
<\/script></body></html>`;
    },

    /* 🎨 COLOR PICKER */
    colorpicker(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(59,130,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Color Picker — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.cp{width:360px;padding:36px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:18px;}
h2{font-size:18px;font-weight:900;color:#fff;}
.preview{height:120px;border-radius:18px;transition:background 0.2s;border:1px solid rgba(255,255,255,0.1);}
input[type=color]{width:100%;height:56px;border:none;background:none;cursor:pointer;border-radius:14px;padding:4px;}
.codes{display:flex;flex-direction:column;gap:8px;}
.code-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;}
.code-lbl{font-size:11px;font-weight:800;color:#475569;letter-spacing:1px;text-transform:uppercase;}
.code-val{font-family:'Share Tech Mono',monospace;font-size:15px;color:#fff;font-weight:700;}
.copy-btn{padding:5px 12px;border:none;border-radius:8px;background:${c2};color:#fff;font-size:11px;font-weight:800;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.copy-btn:hover{filter:brightness(1.2);}
.palette{display:flex;gap:8px;flex-wrap:wrap;}
.swatch{width:36px;height:36px;border-radius:10px;cursor:pointer;border:2px solid transparent;transition:0.15s;}
.swatch:hover{transform:scale(1.2);border-color:rgba(255,255,255,0.5);}
.sliders{display:flex;flex-direction:column;gap:8px;}
.sl-row{display:flex;align-items:center;gap:12px;}
.sl-lbl{font-size:11px;font-weight:800;color:#475569;width:12px;}
input[type=range]{flex:1;cursor:pointer;}
</style></head><body>
<div class="cp">
  <h2>🎨 Color Picker</h2>
  <div class="preview" id="preview" style="background:${c2}"></div>
  <input type="color" id="mainPicker" value="${c2}" oninput="onPick(this.value)"/>
  <div class="sliders">
    <div class="sl-row"><span class="sl-lbl" style="color:#ef4444">R</span><input type="range" id="rSlider" min="0" max="255" value="59" style="accent-color:#ef4444" oninput="fromSliders()"/><span id="rVal" style="color:#ef4444;font-size:12px;font-weight:700;width:28px">59</span></div>
    <div class="sl-row"><span class="sl-lbl" style="color:#10b981">G</span><input type="range" id="gSlider" min="0" max="255" value="130" style="accent-color:#10b981" oninput="fromSliders()"/><span id="gVal" style="color:#10b981;font-size:12px;font-weight:700;width:28px">130</span></div>
    <div class="sl-row"><span class="sl-lbl" style="color:#60a5fa">B</span><input type="range" id="bSlider" min="0" max="255" value="246" style="accent-color:#60a5fa" oninput="fromSliders()"/><span id="bVal" style="color:#60a5fa;font-size:12px;font-weight:700;width:28px">246</span></div>
  </div>
  <div class="codes">
    <div class="code-row"><span class="code-lbl">HEX</span><span class="code-val" id="hexVal">${c2}</span><button class="copy-btn" onclick="copyCode('hexVal')">COPY</button></div>
    <div class="code-row"><span class="code-lbl">RGB</span><span class="code-val" id="rgbVal">rgb(59,130,246)</span><button class="copy-btn" onclick="copyCode('rgbVal')">COPY</button></div>
    <div class="code-row"><span class="code-lbl">HSL</span><span class="code-val" id="hslVal">hsl(213,89%,60%)</span><button class="copy-btn" onclick="copyCode('hslVal')">COPY</button></div>
  </div>
  <div class="palette" id="palette"></div>
</div>
<script>
  const presets=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#84cc16','#06b6d4','#a855f7','${c2}'];
  const palette=document.getElementById('palette');
  presets.forEach(c=>{const s=document.createElement('div');s.className='swatch';s.style.background=c;s.onclick=()=>onPick(c);palette.appendChild(s);});
  function onPick(hex){
    document.getElementById('preview').style.background=hex;
    document.getElementById('mainPicker').value=hex;
    document.getElementById('hexVal').textContent=hex;
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    document.getElementById('rSlider').value=r;document.getElementById('gSlider').value=g;document.getElementById('bSlider').value=b;
    document.getElementById('rVal').textContent=r;document.getElementById('gVal').textContent=g;document.getElementById('bVal').textContent=b;
    document.getElementById('rgbVal').textContent=\`rgb(\${r},\${g},\${b})\`;
    const h=rgbToHsl(r,g,b);document.getElementById('hslVal').textContent=\`hsl(\${h[0]},\${h[1]}%,\${h[2]}%)\`;
  }
  function fromSliders(){
    const r=parseInt(document.getElementById('rSlider').value),g=parseInt(document.getElementById('gSlider').value),b=parseInt(document.getElementById('bSlider').value);
    document.getElementById('rVal').textContent=r;document.getElementById('gVal').textContent=g;document.getElementById('bVal').textContent=b;
    const hex='#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
    onPick(hex);
  }
  function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6;}};return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
  function copyCode(id){navigator.clipboard.writeText(document.getElementById(id).textContent).catch(()=>{});}
  onPick('${c2}');
<\/script></body></html>`;
    },

    /* 🌈 GRADIENT GENERATOR */
    gradient(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const ca = rgbToHex(colors[1] || 'rgb(139,92,246)');
      const cb = rgbToHex(colors[2] || 'rgb(59,130,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Gradient Generator — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.gg{width:440px;padding:36px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:16px;}
h2{font-size:18px;font-weight:900;color:#fff;}
.preview{height:160px;border-radius:18px;transition:background 0.3s;}
.controls{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ctrl{display:flex;flex-direction:column;gap:6px;}
label{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;}
input[type=color]{width:100%;height:44px;border:none;background:none;cursor:pointer;border-radius:10px;padding:3px;}
select,input[type=range]{padding:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:13px;font-weight:700;outline:none;font-family:'Inter',sans-serif;width:100%;cursor:pointer;}
input[type=range]{accent-color:${ca};}
.code-box{background:rgba(0,0,0,0.4);border-radius:12px;padding:14px;font-family:'Share Tech Mono',monospace;font-size:12px;color:#a5b4fc;line-height:1.6;word-break:break-all;}
.copy-all{width:100%;padding:13px;border:none;border-radius:14px;background:linear-gradient(135deg,${ca},${cb});color:#fff;font-size:14px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.copy-all:hover{filter:brightness(1.1);transform:translateY(-2px);}
.presets-grid{display:flex;gap:8px;flex-wrap:wrap;}
.preset-pill{width:44px;height:28px;border-radius:8px;cursor:pointer;border:2px solid transparent;transition:0.15s;}
.preset-pill:hover{transform:scale(1.1);border-color:rgba(255,255,255,0.5);}
</style></head><body>
<div class="gg">
  <h2>🌈 Gradient Generator</h2>
  <div class="preview" id="gradPreview"></div>
  <div class="controls">
    <div class="ctrl"><label>Color 1</label><input type="color" id="gc1" value="${ca}" oninput="update()"/></div>
    <div class="ctrl"><label>Color 2</label><input type="color" id="gc2" value="${cb}" oninput="update()"/></div>
    <div class="ctrl"><label>Type</label>
      <select id="gtype" onchange="update()">
        <option>linear-gradient</option><option>radial-gradient</option><option>conic-gradient</option>
      </select></div>
    <div class="ctrl"><label>Angle (<span id="angleVal">135</span>°)</label>
      <input type="range" min="0" max="360" value="135" id="gangle" oninput="document.getElementById('angleVal').textContent=this.value;update()"/></div>
  </div>
  <div class="presets-grid" id="presets"></div>
  <div class="code-box" id="gradCode"></div>
  <button class="copy-all" onclick="copyGrad()">📋 COPY CSS CODE</button>
</div>
<script>
  const psets=[['#8b5cf6','#3b82f6'],['#ef4444','#f59e0b'],['#10b981','#3b82f6'],['#ec4899','#8b5cf6'],['#f97316','#ef4444'],['#06b6d4','#10b981'],['#a855f7','#ec4899'],['#22d3ee','#3b82f6']];
  const presDiv=document.getElementById('presets');
  psets.forEach(([a,b])=>{const d=document.createElement('div');d.className='preset-pill';d.style.background=\`linear-gradient(135deg,\${a},\${b})\`;d.onclick=()=>{document.getElementById('gc1').value=a;document.getElementById('gc2').value=b;update();};presDiv.appendChild(d);});
  function update(){
    const c1=document.getElementById('gc1').value,c2=document.getElementById('gc2').value;
    const type=document.getElementById('gtype').value,angle=document.getElementById('gangle').value;
    let css;
    if(type==='radial-gradient')css=\`radial-gradient(circle, \${c1}, \${c2})\`;
    else if(type==='conic-gradient')css=\`conic-gradient(\${c1}, \${c2}, \${c1})\`;
    else css=\`linear-gradient(\${angle}deg, \${c1}, \${c2})\`;
    document.getElementById('gradPreview').style.background=css;
    document.getElementById('gradCode').textContent=\`background: \${css};\`;
  }
  function copyGrad(){navigator.clipboard.writeText(document.getElementById('gradCode').textContent).catch(()=>{});}
  update();
<\/script></body></html>`;
    },

    /* 🎲 DICE ROLLER */
    dice(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Dice Roller — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:28px;}
.dice-row{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;}
.die{width:100px;height:100px;background:linear-gradient(135deg,#fff,#e8e8e8);border-radius:18px;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr;padding:12px;gap:6px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,0.5),3px 3px 0 0 #ccc;transition:transform 0.1s;user-select:none;}
.die:active{transform:scale(0.95);}
.die.rolling{animation:shake 0.4s ease-in-out;}
@keyframes shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}}
.dot{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;}
.dot.filled{background:${c2};}
.total-box{font-size:64px;font-weight:900;color:#fff;text-align:center;}
.total-lbl{font-size:11px;font-weight:800;color:#475569;letter-spacing:3px;text-align:center;}
.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;}
.btn{padding:12px 24px;border:none;border-radius:14px;font-size:14px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.btn-roll{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}44;}
.btn-roll:hover{filter:brightness(1.15);transform:translateY(-2px);}
.btn-add{background:rgba(255,255,255,0.06);color:#fff;border:1px solid rgba(255,255,255,0.1);}
.history{font-size:13px;color:#475569;font-weight:700;text-align:center;}
.dice-type{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}
.dtype{padding:6px 14px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);border-radius:20px;color:#64748b;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.dtype.active{background:${c2};border-color:${c2};color:#fff;}
</style></head><body>
<div class="dice-type" id="dtypes">
  <button class="dtype active" onclick="setType(6,this)">D6</button>
  <button class="dtype" onclick="setType(4,this)">D4</button>
  <button class="dtype" onclick="setType(8,this)">D8</button>
  <button class="dtype" onclick="setType(10,this)">D10</button>
  <button class="dtype" onclick="setType(12,this)">D12</button>
  <button class="dtype" onclick="setType(20,this)">D20</button>
  <button class="dtype" onclick="setType(100,this)">D100</button>
</div>
<div class="dice-row" id="diceRow"></div>
<div class="total-box" id="totalBox">—</div>
<div class="total-lbl" id="totalLbl">CLICK A DIE OR ROLL ALL</div>
<div class="controls">
  <button class="btn btn-add" onclick="addDie()">+ ADD DIE</button>
  <button class="btn btn-roll" onclick="rollAll()">🎲 ROLL ALL</button>
  <button class="btn btn-add" onclick="removeDie()">− REMOVE</button>
</div>
<div class="history" id="rollHistory">Roll history: —</div>
<script>
  let diceCount=2, dtype=6, rolls=[], rollHist=[];
  const dots6=[[5],[1,9],[1,5,9],[1,3,7,9],[1,3,5,7,9],[1,3,4,6,7,9]];
  function setType(n,btn){dtype=n;document.querySelectorAll('.dtype').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}
  function makeDie(val){
    const d=document.createElement('div');d.className='die';
    if(dtype===6&&val>=1){
      for(let i=0;i<9;i++){const dot=document.createElement('div');dot.className='dot'+(dots6[val-1].includes(i+1)?' filled':'');d.appendChild(dot);}
    } else {
      d.style.display='flex';d.style.alignItems='center';d.style.justifyContent='center';d.style.fontSize='36px';d.style.fontWeight='900';d.style.color='${c2}';d.textContent=val||'?';
    }
    d.onclick=()=>rollSingle(d);
    return d;
  }
  function rollSingle(d){d.classList.add('rolling');setTimeout(()=>{d.classList.remove('rolling');},400);const v=Math.ceil(Math.random()*dtype);d.replaceWith(makeDie(v));}
  function rollAll(){
    rolls=[];
    document.getElementById('diceRow').querySelectorAll('.die').forEach(d=>{
      d.classList.add('rolling');
      setTimeout(()=>{d.classList.remove('rolling');const v=Math.ceil(Math.random()*dtype);rolls.push(v);const nd=makeDie(v);d.replaceWith(nd);const total=rolls.reduce((a,b)=>a+b,0);document.getElementById('totalBox').textContent=total;document.getElementById('totalLbl').textContent='TOTAL ('+diceCount+'d'+dtype+')';},400);
    });
    rollHist.unshift(rolls.reduce((a,b)=>a+b,0)+'');
    rollHist=rollHist.slice(0,5);
    setTimeout(()=>document.getElementById('rollHistory').textContent='Roll history: '+rollHist.join(', '),500);
  }
  function addDie(){if(diceCount>=6)return;diceCount++;renderDice();}
  function removeDie(){if(diceCount<=1)return;diceCount--;renderDice();}
  function renderDice(){const row=document.getElementById('diceRow');row.innerHTML='';for(let i=0;i<diceCount;i++)row.appendChild(makeDie('?'));}
  renderDice();
<\/script></body></html>`;
    },

    /* 🎰 SLOT MACHINE */
    slots(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(245,158,11)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Slot Machine — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:24px;}
.machine{background:linear-gradient(135deg,#1a1400,#2c2000);border:3px solid ${c2}66;border-radius:28px;padding:36px 40px;box-shadow:0 0 60px ${c2}22,0 40px 80px rgba(0,0,0,0.8);display:flex;flex-direction:column;align-items:center;gap:24px;}
.title{font-size:22px;font-weight:900;color:${c2};letter-spacing:4px;text-shadow:0 0 20px ${c2};}
.reels{display:flex;gap:8px;}
.reel{width:90px;height:90px;background:rgba(0,0,0,0.4);border:2px solid ${c2}33;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:52px;overflow:hidden;position:relative;}
.reel.spin{animation:reel 0.1s steps(1) infinite;}
@keyframes reel{0%{opacity:1}50%{opacity:0.3}100%{opacity:1}}
.result-msg{font-size:22px;font-weight:900;min-height:34px;text-align:center;transition:0.3s;}
.win{color:#10b981;text-shadow:0 0 20px #10b981;animation:winPop 0.5s ease-out;}
.lose{color:#64748b;}
@keyframes winPop{0%{transform:scale(0.8)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
.credits{font-size:14px;font-weight:900;color:${c2};}
.btn-spin{padding:16px 48px;border:none;border-radius:18px;background:linear-gradient(135deg,${c2},#f97316);color:#1a0a00;font-size:18px;font-weight:900;cursor:pointer;box-shadow:0 8px 30px ${c2}66;transition:all 0.2s;font-family:'Inter',sans-serif;letter-spacing:2px;}
.btn-spin:hover{transform:translateY(-3px);box-shadow:0 12px 40px ${c2}88;}
.btn-spin:disabled{opacity:0.4;cursor:not-allowed;}
.payline{width:100%;height:3px;background:${c2};border-radius:4px;box-shadow:0 0 10px ${c2};margin:-12px 0;}
</style></head><body>
<div class="machine">
  <div class="title">🎰 JACKPOT</div>
  <div class="reels" id="reels">
    <div class="reel" id="r0">🍒</div>
    <div class="reel" id="r1">🍋</div>
    <div class="reel" id="r2">🔔</div>
  </div>
  <div class="payline"></div>
  <div class="result-msg lose" id="msg">Press SPIN to play!</div>
  <div class="credits">Credits: <span id="credits">100</span></div>
  <button class="btn-spin" id="spinBtn" onclick="spin()">🎰 SPIN</button>
</div>
<script>
  const syms=['🍒','🍋','🍊','🍇','🔔','⭐','💎','7️⃣','🃏'];
  const pays={
    '💎💎💎':500,'7️⃣7️⃣7️⃣':200,'⭐⭐⭐':100,'🔔🔔🔔':50,
    '🍒🍒🍒':30,'🍋🍋🍋':20,'🍊🍊🍊':15,'🍇🍇🍇':12,'🃏🃏🃏':10,
    '🍒🍒':5,'💎':3
  };
  let credits=100, spinning=false;
  function spin(){
    if(spinning||credits<1)return;
    credits--;document.getElementById('credits').textContent=credits;
    spinning=true;document.getElementById('spinBtn').disabled=true;
    document.getElementById('msg').textContent='Spinning...';
    document.getElementById('msg').className='result-msg lose';
    const reels=[document.getElementById('r0'),document.getElementById('r1'),document.getElementById('r2')];
    reels.forEach(r=>r.classList.add('spin'));
    const final=Array(3).fill(0).map(()=>syms[Math.floor(Math.random()*syms.length)]);
    setTimeout(()=>reels[0].classList.remove('spin')||reels[0].textContent=final[0],600);
    setTimeout(()=>reels[1].classList.remove('spin')||reels[1].textContent=final[1],900);
    setTimeout(()=>{reels[2].classList.remove('spin');reels[2].textContent=final[2];
      // Check win
      const key=final.join('');
      let win=0;
      for(const [k,v] of Object.entries(pays)){if(key.startsWith(k)||key===k){win=v;break;}}
      if(win){credits+=win;document.getElementById('credits').textContent=credits;document.getElementById('msg').textContent='🎉 WIN! +'+win+' credits!';document.getElementById('msg').className='result-msg win';}
      else{document.getElementById('msg').textContent='No luck... try again!';document.getElementById('msg').className='result-msg lose';}
      spinning=false;document.getElementById('spinBtn').disabled=credits<1;
      if(credits<=0){document.getElementById('msg').textContent='Game Over! Refresh to restart.';}
    },1200);
  }
<\/script></body></html>`;
    },

    /* 🎡 SPINNING WHEEL */
    spinner(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(139,92,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Spinning Wheel — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:24px;}
.wheel-wrap{position:relative;display:flex;flex-direction:column;align-items:center;gap:16px;}
canvas{border-radius:50%;box-shadow:0 0 60px ${c2}33,0 20px 60px rgba(0,0,0,0.6);}
.pointer{position:absolute;top:-8px;width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-top:28px solid ${c2};filter:drop-shadow(0 0 8px ${c2});}
.result{font-size:28px;font-weight:900;color:#fff;min-height:40px;text-align:center;}
.btn-spin{padding:14px 48px;border:none;border-radius:18px;background:linear-gradient(135deg,${c2},#3b82f6);color:#fff;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 8px 30px ${c2}44;transition:all 0.2s;font-family:'Inter',sans-serif;}
.btn-spin:hover{transform:translateY(-2px);filter:brightness(1.1);}
.edit-area{display:flex;flex-direction:column;gap:8px;width:320px;}
.edit-row{display:flex;gap:8px;}
.edit-inp{flex:1;padding:10px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:13px;font-weight:700;outline:none;font-family:'Inter',sans-serif;}
.edit-btn{padding:10px 14px;border:none;border-radius:10px;font-size:12px;font-weight:900;cursor:pointer;background:${c2};color:#fff;font-family:'Inter',sans-serif;}
</style></head><body>
<div class="wheel-wrap">
  <div class="pointer"></div>
  <canvas id="wheel" width="280" height="280"></canvas>
</div>
<div class="result" id="spinResult">Spin the wheel!</div>
<button class="btn-spin" id="spinBtn" onclick="spinWheel()">🎡 SPIN!</button>
<div class="edit-area">
  <div class="edit-row">
    <input class="edit-inp" id="newItem" placeholder="Add option..." value=""/>
    <button class="edit-btn" onclick="addItem()">+</button>
  </div>
</div>
<script>
  const colors=['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4','#a855f7'];
  let items=['Win!','Try Again','Bonus!','Prize!','Jackpot!','Lucky!','Next Time','Grand!'],angle=0,spinning=false;
  function draw(){
    const canvas=document.getElementById('wheel'),ctx=canvas.getContext('2d');
    const cx=140,r=135,n=items.length,slice=2*Math.PI/n;
    ctx.clearRect(0,0,280,280);
    items.forEach((item,i)=>{
      const start=angle+i*slice,end=start+slice;
      ctx.beginPath();ctx.moveTo(cx,cx);ctx.arc(cx,cx,r,start,end);ctx.closePath();
      ctx.fillStyle=colors[i%colors.length];ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=2;ctx.stroke();
      ctx.save();ctx.translate(cx,cx);ctx.rotate(start+slice/2);
      ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font='bold 13px Inter,sans-serif';
      ctx.shadowColor='rgba(0,0,0,0.5)';ctx.shadowBlur=4;
      ctx.fillText(item.length>10?item.slice(0,9)+'…':item,r-10,5);
      ctx.restore();
    });
    ctx.beginPath();ctx.arc(cx,cx,20,0,2*Math.PI);ctx.fillStyle='#0f172a';ctx.fill();ctx.strokeStyle=rgba;ctx.lineWidth=4;ctx.stroke();
  }
  const rgba='${c2}';
  function spinWheel(){
    if(spinning)return;spinning=true;document.getElementById('spinResult').textContent='Spinning...';
    document.getElementById('spinBtn').disabled=true;
    const totalAngle=Math.PI*2*(5+Math.random()*10)+Math.random()*Math.PI*2;
    const duration=3000,start=Date.now(),startAngle=angle;
    const anim=()=>{
      const elapsed=Date.now()-start,progress=Math.min(elapsed/duration,1);
      const ease=1-Math.pow(1-progress,4);
      angle=startAngle+totalAngle*ease;
      draw();
      if(progress<1){requestAnimationFrame(anim);}
      else{
        const n=items.length,slice=2*Math.PI/n;
        const norm=((-angle%(2*Math.PI))+2*Math.PI)%(2*Math.PI);
        const idx=Math.floor(norm/slice)%n;
        const winner=items[(n-1-idx+n)%n];
        document.getElementById('spinResult').textContent='🎉 '+winner+'!';
        spinning=false;document.getElementById('spinBtn').disabled=false;
      }
    };
    requestAnimationFrame(anim);
  }
  function addItem(){
    const v=document.getElementById('newItem').value.trim();
    if(!v)return;items.push(v);document.getElementById('newItem').value='';draw();
  }
  draw();
<\/script></body></html>`;
    },

    /* 🎱 MAGIC 8-BALL */
    magic8(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Magic 8-Ball — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:28px;}
.ball{width:280px;height:280px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#2a2a2a,#000);box-shadow:0 20px 60px rgba(0,0,0,0.8),inset 0 0 40px rgba(255,255,255,0.05);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.1s;position:relative;user-select:none;}
.ball:active{transform:scale(0.97);}
.ball.shaking{animation:shakeB 0.5s ease-in-out;}
@keyframes shakeB{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}}
.eight{position:absolute;top:20px;left:50%;transform:translateX(-50%);font-size:48px;font-weight:900;color:#fff;opacity:0.9;}
.window{width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,#1e40af,#1e3a8a,#172554);display:flex;align-items:center;justify-content:center;padding:16px;box-shadow:inset 0 4px 12px rgba(0,0,0,0.5);}
.answer{font-size:14px;font-weight:900;color:#93c5fd;text-align:center;line-height:1.3;transition:opacity 0.3s;}
.question-box{width:320px;}
.q-input{width:100%;padding:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:#fff;font-size:15px;outline:none;font-family:'Inter',sans-serif;text-align:center;}
.hint{font-size:12px;color:#475569;font-weight:700;letter-spacing:2px;text-align:center;}
</style></head><body>
<div class="ball" id="ball8" onclick="ask()">
  <div class="eight">8</div>
  <div class="window"><div class="answer" id="ans8">Ask a question...</div></div>
</div>
<div class="question-box">
  <input class="q-input" placeholder="Ask yes/no question..." id="q8" onkeydown="if(event.key==='Enter')ask()"/>
</div>
<div class="hint">CLICK THE BALL OR PRESS ENTER</div>
<script>
  const answers={positive:['It is certain','It is decidedly so','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes'],
    neutral:['Reply hazy, try again','Ask again later','Better not tell you now','Cannot predict now','Concentrate and ask again'],
    negative:['Don\'t count on it','My reply is no','My sources say no','Outlook not so good','Very doubtful']};
  function ask(){
    const ball=document.getElementById('ball8');
    ball.classList.add('shaking');
    document.getElementById('ans8').style.opacity='0';
    setTimeout(()=>{
      ball.classList.remove('shaking');
      const r=Math.random();
      let pool=r<0.5?answers.positive:(r<0.75?answers.neutral:answers.negative);
      document.getElementById('ans8').textContent=pool[Math.floor(Math.random()*pool.length)];
      document.getElementById('ans8').style.opacity='1';
    },500);
  }
<\/script></body></html>`;
    },

    /* 〰️ OSCILLOSCOPE */
    oscilloscope(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(5,10,5)');
      const c2 = rgbToHex(colors[1] || 'rgb(0,255,80)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Oscilloscope — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#030806;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:20px;}
.scope{background:#030d04;border:2px solid ${c2}44;border-radius:12px;position:relative;overflow:hidden;box-shadow:0 0 60px ${c2}22,inset 0 0 30px rgba(0,0,0,0.8);}
canvas{display:block;}
.grid-overlay{position:absolute;inset:0;background-image:linear-gradient(${c2}11 1px,transparent 1px),linear-gradient(90deg,${c2}11 1px,transparent 1px);background-size:50px 50px;pointer-events:none;}
.controls-bar{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
.ctrl{display:flex;flex-direction:column;align-items:center;gap:4px;}
.ctrl label{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;font-family:'Share Tech Mono',monospace;}
input[type=range]{accent-color:${c2};width:130px;cursor:pointer;}
.val{font-family:'Share Tech Mono',monospace;font-size:12px;color:${c2};}
.wave-btns{display:flex;gap:8px;}
.wbtn{padding:7px 16px;border:1px solid ${c2}44;background:rgba(0,0,0,0.4);border-radius:8px;color:${c2};font-size:12px;font-weight:700;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:0.2s;}
.wbtn.active,.wbtn:hover{background:${c2};color:#000;}
</style></head><body>
<div class="scope">
  <canvas id="osc" width="540" height="280"></canvas>
  <div class="grid-overlay"></div>
</div>
<div class="wave-btns">
  <button class="wbtn active" onclick="setWave('sine',this)">SINE</button>
  <button class="wbtn" onclick="setWave('square',this)">SQUARE</button>
  <button class="wbtn" onclick="setWave('triangle',this)">TRIANGLE</button>
  <button class="wbtn" onclick="setWave('sawtooth',this)">SAW</button>
</div>
<div class="controls-bar">
  <div class="ctrl"><label>FREQUENCY</label><input type="range" min="0.5" max="10" value="2" step="0.1" id="freqSl" oninput="freq=parseFloat(this.value);document.getElementById('freqV').textContent=this.value+'Hz'"/><span class="val" id="freqV">2Hz</span></div>
  <div class="ctrl"><label>AMPLITUDE</label><input type="range" min="10" max="120" value="80" id="ampSl" oninput="amp=parseFloat(this.value);document.getElementById('ampV').textContent=this.value"/><span class="val" id="ampV">80</span></div>
  <div class="ctrl"><label>NOISE</label><input type="range" min="0" max="30" value="0" id="noiseSl" oninput="noise=parseFloat(this.value);document.getElementById('noiseV').textContent=this.value"/><span class="val" id="noiseV">0</span></div>
</div>
<script>
  const canvas=document.getElementById('osc'),ctx=canvas.getContext('2d');
  let freq=2,amp=80,noise=0,waveType='sine',t=0;
  function setWave(type,btn){waveType=type;document.querySelectorAll('.wbtn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}
  function getY(x){
    const phase=t+x*freq*0.04;
    let y;
    switch(waveType){
      case 'sine':y=Math.sin(phase);break;
      case 'square':y=Math.sin(phase)>=0?1:-1;break;
      case 'triangle':y=2*Math.abs(2*(phase/(2*Math.PI)-Math.floor(phase/(2*Math.PI)+0.5)))-1;break;
      case 'sawtooth':y=2*(phase/(2*Math.PI)-Math.floor(phase/(2*Math.PI)+0.5));break;
      default:y=0;
    }
    return y*amp+(Math.random()-0.5)*noise;
  }
  function draw(){
    ctx.clearRect(0,0,540,280);
    ctx.strokeStyle='${c2}';ctx.lineWidth=2;ctx.shadowColor='${c2}';ctx.shadowBlur=8;
    ctx.beginPath();
    for(let x=0;x<540;x++){const y=140-getY(x);if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    ctx.stroke();
    // Center line
    ctx.strokeStyle='${c2}22';ctx.lineWidth=1;ctx.shadowBlur=0;
    ctx.beginPath();ctx.moveTo(0,140);ctx.lineTo(540,140);ctx.stroke();
    t+=0.08;
    requestAnimationFrame(draw);
  }
  draw();
<\/script></body></html>`;
    },

    /* 🔋 BATTERY METER */
    battery(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(16,185,129)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Battery Meter — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:30px;}
.battery-wrap{display:flex;flex-direction:column;align-items:center;gap:20px;}
.battery{width:200px;height:380px;border:4px solid rgba(255,255,255,0.3);border-radius:20px;position:relative;background:rgba(0,0,0,0.4);overflow:hidden;}
.battery::after{content:'';position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:50px;height:18px;background:rgba(255,255,255,0.3);border-radius:6px 6px 0 0;}
.fill{position:absolute;bottom:0;left:0;right:0;transition:height 0.6s cubic-bezier(.4,0,.2,1),background 0.5s;}
.pct{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:52px;font-weight:900;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.5);z-index:2;}
.bolt{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) translateY(30px);font-size:40px;z-index:3;opacity:0;transition:0.3s;}
.status{font-size:13px;font-weight:900;letter-spacing:2px;text-transform:uppercase;}
.slider-group{display:flex;flex-direction:column;align-items:center;gap:8px;}
input[type=range]{width:200px;cursor:pointer;}
.devices{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
.dev{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:0.2s;}
.dev:hover{transform:translateY(-3px);}
.dev-bar{width:50px;height:80px;border:2px solid rgba(255,255,255,0.2);border-radius:8px;position:relative;overflow:hidden;background:rgba(0,0,0,0.3);}
.dev-fill{position:absolute;bottom:0;left:0;right:0;transition:height 0.5s;}
.dev-lbl{font-size:10px;font-weight:700;color:#475569;}
.dev-pct{font-size:13px;font-weight:900;color:#fff;}
</style></head><body>
<div class="battery-wrap">
  <div class="battery" id="mainBat">
    <div class="fill" id="mainFill" style="height:78%;background:${c2};"></div>
    <div class="bolt" id="bolt">⚡</div>
    <div class="pct" id="mainPct">78%</div>
  </div>
  <div class="status" id="batStatus" style="color:${c2}">● GOOD</div>
</div>
<div class="slider-group">
  <input type="range" min="0" max="100" value="78" id="batSlider" oninput="setBat(this.value)" style="accent-color:${c2}"/>
  <div style="display:flex;gap:20px;">
    <button onclick="startCharge()" style="padding:8px 18px;border:none;border-radius:10px;background:${c2};color:#fff;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;font-size:12px;">⚡ CHARGE</button>
    <button onclick="stopCharge()" style="padding:8px 18px;border:none;border-radius:10px;background:rgba(255,255,255,0.06);color:#64748b;border:1px solid rgba(255,255,255,0.1);font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;font-size:12px;">■ STOP</button>
  </div>
</div>
<div class="devices">
  ${[['📱','Phone',85],['💻','Laptop',42],['⌚','Watch',15],['🎮','Controller',63]].map(([i,l,v])=>`
  <div class="dev"><span style="font-size:24px;">${i}</span><div class="dev-bar"><div class="dev-fill" style="height:${v}%;background:${v<20?'#ef4444':v<50?'#f59e0b':c2}"></div></div><div class="dev-pct">${v}%</div><div class="dev-lbl">${l}</div></div>`).join('')}
</div>
<script>
  let level=78,charging=false,chargeTimer;
  function setBat(v){level=parseFloat(v);render();}
  function render(){
    const fill=document.getElementById('mainFill'),pct=document.getElementById('mainPct'),status=document.getElementById('batStatus'),bolt=document.getElementById('bolt');
    fill.style.height=level+'%';
    pct.textContent=Math.round(level)+'%';
    const color=level<15?'#ef4444':level<30?'#f59e0b':'${c2}';
    fill.style.background=color;
    bolt.style.opacity=charging?'1':'0';
    if(level<15){status.textContent='● CRITICAL';status.style.color='#ef4444';}
    else if(level<30){status.textContent='● LOW';status.style.color='#f59e0b';}
    else if(charging){status.textContent='⚡ CHARGING';status.style.color='${c2}';}
    else{status.textContent='● GOOD';status.style.color='${c2}';}
    document.getElementById('batSlider').value=level;
  }
  function startCharge(){charging=true;chargeTimer=setInterval(()=>{if(level>=100){stopCharge();return;}level=Math.min(100,level+0.5);render();},100);}
  function stopCharge(){charging=false;clearInterval(chargeTimer);render();}
<\/script></body></html>`;
    },

    /* 📐 PROTRACTOR */
    protractor(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(245,158,11)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Protractor — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:24px;}
.angle-display{font-family:'Share+Tech+Mono',monospace;font-size:72px;font-weight:900;color:#fff;text-shadow:0 0 30px ${c2}66;}
.angle-lbl{font-size:11px;font-weight:800;color:#475569;letter-spacing:3px;}
.angle-type{font-size:16px;font-weight:900;min-height:26px;}
input[type=range]{accent-color:${c2};width:280px;cursor:pointer;}
.hint{font-size:11px;color:#475569;font-weight:700;letter-spacing:2px;}
</style></head><body>
<svg width="300" height="170" viewBox="0 0 300 170">
  <!-- Protractor body -->
  <path d="M20 150 A130 130 0 0 1 280 150" fill="rgba(245,158,11,0.08)" stroke="${c2}" stroke-width="3"/>
  <line x1="20" y1="150" x2="280" y2="150" stroke="${c2}66" stroke-width="2"/>
  <!-- Tick marks -->
  <g id="ticks"></g>
  <!-- Needle -->
  <line id="needle" x1="150" y1="150" x2="150" y2="30" stroke="${c2}" stroke-width="3" stroke-linecap="round" style="filter:drop-shadow(0 0 8px ${c2})"/>
  <circle cx="150" cy="150" r="8" fill="${c2}" style="filter:drop-shadow(0 0 10px ${c2})"/>
</svg>
<div class="angle-display"><span id="angVal">90</span>°</div>
<div class="angle-type" id="angType" style="color:${c2}">RIGHT ANGLE</div>
<div class="angle-lbl">PROTRACTOR</div>
<input type="range" min="0" max="180" value="90" oninput="setAngle(this.value)" style="accent-color:${c2}"/>
<div class="hint">DRAG SLIDER TO CHANGE ANGLE</div>
<script>
  const svg=document.querySelector('svg');
  const ticks=document.getElementById('ticks');
  // Draw ticks
  for(let a=0;a<=180;a+=10){
    const r=a*Math.PI/180,len=a%30===0?18:a%10===0?12:6;
    const cx=150,cy=150,radius=130;
    const x1=cx+radius*Math.cos(Math.PI-r),y1=cy-radius*Math.sin(Math.PI-r);
    const x2=cx+(radius-len)*Math.cos(Math.PI-r),y2=cy-(radius-len)*Math.sin(Math.PI-r);
    const tick=document.createElementNS('http://www.w3.org/2000/svg','line');
    tick.setAttribute('x1',x1);tick.setAttribute('y1',y1);tick.setAttribute('x2',x2);tick.setAttribute('y2',y2);
    tick.setAttribute('stroke','${c2}88');tick.setAttribute('stroke-width','1.5');ticks.appendChild(tick);
    if(a%30===0){
      const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
      const lx=cx+(radius-28)*Math.cos(Math.PI-r),ly=cy-(radius-28)*Math.sin(Math.PI-r);
      lbl.setAttribute('x',lx);lbl.setAttribute('y',ly);lbl.setAttribute('text-anchor','middle');lbl.setAttribute('dominant-baseline','middle');
      lbl.setAttribute('font-size','9');lbl.setAttribute('fill','${c2}88');lbl.setAttribute('font-family','Inter,sans-serif');lbl.textContent=a;
      ticks.appendChild(lbl);
    }
  }
  function setAngle(v){
    const a=parseFloat(v),r=a*Math.PI/180;
    const cx=150,cy=150,len=120;
    const x=cx+len*Math.cos(Math.PI-r),y=cy-len*Math.sin(Math.PI-r);
    document.getElementById('needle').setAttribute('x2',x);document.getElementById('needle').setAttribute('y2',y);
    document.getElementById('angVal').textContent=Math.round(a);
    const types={0:'ZERO ANGLE',180:'STRAIGHT ANGLE',90:'RIGHT ANGLE'};
    document.getElementById('angType').textContent=types[a]||(a<90?'ACUTE ANGLE':a>90?'OBTUSE ANGLE':'');
  }
  setAngle(90);
<\/script></body></html>`;
    },

    /* ⚖️ BMI CALCULATOR */
    bmi(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(16,185,129)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>BMI Calculator — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.bmi-card{width:380px;padding:40px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:18px;}
h2{font-size:20px;font-weight:900;color:#fff;margin-bottom:4px;}
.field{display:flex;flex-direction:column;gap:6px;}
label{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;text-transform:uppercase;}
input[type=number]{padding:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:20px;font-weight:700;outline:none;font-family:'Inter',sans-serif;transition:border 0.2s;}
input[type=number]:focus{border-color:${c2};}
input[type=range]{accent-color:${c2};width:100%;cursor:pointer;margin-top:4px;}
.bmi-result{text-align:center;padding:24px;border-radius:18px;border:2px solid transparent;transition:all 0.4s;}
.bmi-val{font-size:62px;font-weight:900;line-height:1;}
.bmi-cat{font-size:16px;font-weight:900;margin-top:4px;letter-spacing:2px;}
.bmi-bar{height:10px;border-radius:10px;background:linear-gradient(90deg,#3b82f6,#10b981,#f59e0b,#ef4444);position:relative;margin-top:8px;}
.bmi-marker{width:14px;height:20px;background:#fff;border-radius:4px;position:absolute;top:-5px;transform:translateX(-50%);transition:left 0.4s;box-shadow:0 0 10px rgba(255,255,255,0.5);}
.bmi-labels{display:flex;justify-content:space-between;font-size:9px;font-weight:700;color:#475569;margin-top:4px;}
</style></head><body>
<div class="bmi-card">
  <h2>⚖️ BMI Calculator</h2>
  <div class="field"><label>Weight (kg) — <span id="wVal">70</span> kg</label>
    <input type="range" min="30" max="200" value="70" id="weight" oninput="document.getElementById('wVal').textContent=this.value;calcBMI()"/></div>
  <div class="field"><label>Height (cm) — <span id="hVal">175</span> cm</label>
    <input type="range" min="120" max="220" value="175" id="height" oninput="document.getElementById('hVal').textContent=this.value;calcBMI()"/></div>
  <div class="field"><label>Age</label>
    <input type="number" id="age" value="30" min="5" max="120" oninput="calcBMI()"/></div>
  <div class="bmi-result" id="bmiResult">
    <div class="bmi-val" id="bmiVal">22.9</div>
    <div class="bmi-cat" id="bmiCat">NORMAL WEIGHT</div>
  </div>
  <div class="bmi-bar"><div class="bmi-marker" id="bmiMarker" style="left:50%"></div></div>
  <div class="bmi-labels"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
</div>
<script>
  function calcBMI(){
    const w=parseFloat(document.getElementById('weight').value)||70;
    const h=parseFloat(document.getElementById('height').value)||175;
    const bmi=w/((h/100)**2);
    document.getElementById('bmiVal').textContent=bmi.toFixed(1);
    let cat,color,left;
    if(bmi<18.5){cat='UNDERWEIGHT';color='#3b82f6';left=Math.min(bmi/18.5*25,25)+'%';}
    else if(bmi<25){cat='NORMAL WEIGHT';color='${c2}';left=(25+(bmi-18.5)/(25-18.5)*25)+'%';}
    else if(bmi<30){cat='OVERWEIGHT';color='#f59e0b';left=(50+(bmi-25)/(30-25)*25)+'%';}
    else{cat='OBESE';color='#ef4444';left=Math.min(75+(bmi-30)*2,97)+'%';}
    document.getElementById('bmiCat').textContent=cat;
    document.getElementById('bmiCat').style.color=color;
    document.getElementById('bmiVal').style.color=color;
    document.getElementById('bmiResult').style.borderColor=color+'44';
    document.getElementById('bmiResult').style.background=color+'11';
    document.getElementById('bmiMarker').style.left=left;
  }
  calcBMI();
<\/script></body></html>`;
    },

    /* 📡 MORSE CODE */
    morse(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(5,10,5)');
      const c2 = rgbToHex(colors[1] || 'rgb(0,255,80)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Morse Code — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#020903;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:20px;}
.morse-card{width:440px;padding:36px;background:rgba(0,255,80,0.03);border:1px solid ${c2}22;border-radius:24px;box-shadow:0 0 60px ${c2}11,0 40px 80px rgba(0,0,0,0.8);display:flex;flex-direction:column;gap:16px;}
h2{font-size:18px;font-weight:900;color:${c2};letter-spacing:3px;}
label{font-size:10px;font-weight:800;color:${c2}66;letter-spacing:1px;text-transform:uppercase;}
input[type=text]{width:100%;padding:14px;background:rgba(0,0,0,0.6);border:1px solid ${c2}33;border-radius:12px;color:${c2};font-size:18px;font-weight:700;outline:none;font-family:'Share Tech Mono',monospace;transition:border 0.2s;letter-spacing:2px;}
input[type=text]:focus{border-color:${c2}66;}
.code-display{padding:18px;background:rgba(0,0,0,0.5);border:1px solid ${c2}22;border-radius:12px;font-family:'Share Tech Mono',monospace;font-size:22px;color:${c2};min-height:64px;letter-spacing:4px;word-wrap:break-word;text-shadow:0 0 15px ${c2}66;line-height:1.6;}
.signal-light{width:60px;height:60px;border-radius:50%;background:rgba(0,0,0,0.5);border:3px solid ${c2}44;transition:all 0.05s;margin:0 auto;}
.signal-light.on{background:${c2};box-shadow:0 0 40px ${c2},0 0 80px ${c2}44;}
.btn-row{display:flex;gap:10px;}
.btn-m{flex:1;padding:12px;border:none;border-radius:12px;font-size:14px;font-weight:900;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:all 0.2s;}
.btn-play{background:${c2};color:#000;}
.btn-play:hover{filter:brightness(1.1);}
.btn-clr{background:rgba(255,255,255,0.05);color:${c2}66;border:1px solid ${c2}22;}
input[type=range]{accent-color:${c2};width:100%;}
</style></head><body>
<div class="morse-card">
  <h2>📡 MORSE CODE</h2>
  <div><label>Text Input</label><input type="text" id="morseInput" placeholder="TYPE YOUR MESSAGE..." value="SOS" oninput="translate()"/></div>
  <div><label>Morse Code</label><div class="code-display" id="morseOut">... --- ...</div></div>
  <div class="signal-light" id="sigLight"></div>
  <div><label>Speed — <span id="speedVal">60</span> WPM</label><input type="range" min="10" max="200" value="60" id="speedSl" oninput="document.getElementById('speedVal').textContent=this.value"/></div>
  <div class="btn-row">
    <button class="btn-m btn-play" onclick="play()">▶ PLAY SIGNAL</button>
    <button class="btn-m btn-clr" onclick="document.getElementById('morseInput').value='';translate();">✕ CLEAR</button>
  </div>
</div>
<script>
  const MAP={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.','.':'.-.-.-',',':'--..--','?':'..--..',' ':' / '};
  function translate(){
    const t=document.getElementById('morseInput').value.toUpperCase();
    const m=t.split('').map(c=>MAP[c]||'').join(' ');
    document.getElementById('morseOut').textContent=m||'—';
  }
  function play(){
    const m=document.getElementById('morseOut').textContent;
    const wpm=parseInt(document.getElementById('speedSl').value);
    const dot=1200/wpm;
    const light=document.getElementById('sigLight');
    let seq=[];
    m.split('').forEach(c=>{
      if(c==='.')seq.push({on:true,dur:dot});
      else if(c==='-')seq.push({on:true,dur:dot*3});
      else if(c===' ')seq.push({on:false,dur:dot});
      seq.push({on:false,dur:dot});
    });
    let i=0;
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    function step(){
      if(i>=seq.length){light.classList.remove('on');return;}
      const s=seq[i++];
      light.className='signal-light'+(s.on?' on':'');
      if(s.on){
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.frequency.value=700;g.gain.value=0.2;o.connect(g);g.connect(ctx.destination);o.start();
        setTimeout(()=>o.stop(),s.dur);
      }
      setTimeout(step,s.dur);
    }
    step();
  }
  translate();
<\/script></body></html>`;
    },

    /* 🔐 PASSWORD GENERATOR */
    password(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(139,92,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Password Generator — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.pg{width:400px;padding:36px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:16px;}
h2{font-size:18px;font-weight:900;color:#fff;}
.pass-box{position:relative;padding:16px 50px 16px 18px;background:rgba(0,0,0,0.4);border:1px solid ${c2}33;border-radius:14px;font-family:'Share Tech Mono',monospace;font-size:18px;color:${c2};letter-spacing:2px;min-height:56px;word-break:break-all;line-height:1.5;text-shadow:0 0 10px ${c2}66;}
.copy-icon{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:20px;color:${c2};transition:0.2s;}
.copy-icon:hover{transform:translateY(-50%) scale(1.2);}
.strength{height:6px;border-radius:6px;transition:all 0.4s;margin-top:-8px;}
.strength-lbl{font-size:11px;font-weight:800;letter-spacing:2px;}
label{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;text-transform:uppercase;}
input[type=range]{accent-color:${c2};width:100%;cursor:pointer;}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.chk{display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 12px;background:rgba(255,255,255,0.04);border-radius:10px;border:1px solid rgba(255,255,255,0.08);transition:0.2s;}
.chk:hover{border-color:${c2}44;}
.chk input{accent-color:${c2};cursor:pointer;}
.chk span{font-size:12px;font-weight:700;color:#94a3b8;}
.btn-gen{width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,${c2},#3b82f6);color:#fff;font-size:15px;font-weight:900;cursor:pointer;box-shadow:0 8px 24px ${c2}44;transition:0.2s;font-family:'Inter',sans-serif;}
.btn-gen:hover{filter:brightness(1.1);transform:translateY(-2px);}
.history-list{display:flex;flex-direction:column;gap:4px;max-height:100px;overflow-y:auto;}
.hist-item{font-family:'Share Tech Mono',monospace;font-size:11px;color:#64748b;padding:5px 10px;background:rgba(255,255,255,0.02);border-radius:6px;cursor:pointer;transition:0.2s;}
.hist-item:hover{color:${c2};background:rgba(139,92,246,0.08);}
</style></head><body>
<div class="pg">
  <h2>🔐 Password Generator</h2>
  <div class="pass-box" id="passOut">Click Generate!</button><button class="copy-icon" onclick="copyPass()">📋</button></div>
  <div class="strength" id="strengthBar"></div>
  <div class="strength-lbl" id="strengthLbl" style="color:#64748b">— Waiting —</div>
  <div><label>Length — <span id="lenVal">16</span></label><input type="range" min="6" max="64" value="16" id="lenSl" oninput="document.getElementById('lenVal').textContent=this.value;generate()"/></div>
  <div class="checks">
    <label class="chk"><input type="checkbox" id="chkUp" checked/><span>Uppercase A-Z</span></label>
    <label class="chk"><input type="checkbox" id="chkLo" checked/><span>Lowercase a-z</span></label>
    <label class="chk"><input type="checkbox" id="chkNum" checked/><span>Numbers 0-9</span></label>
    <label class="chk"><input type="checkbox" id="chkSym" checked/><span>Symbols !@#</span></label>
  </div>
  <button class="btn-gen" onclick="generate()">⚡ GENERATE PASSWORD</button>
  <div><label>History</label><div class="history-list" id="histList"></div></div>
</div>
<script>
  let hist=[];
  const sets={up:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',lo:'abcdefghijklmnopqrstuvwxyz',num:'0123456789',sym:'!@#$%^&*()-_=+[]{}|;:,.<>?'};
  function generate(){
    let pool='';
    if(document.getElementById('chkUp').checked)pool+=sets.up;
    if(document.getElementById('chkLo').checked)pool+=sets.lo;
    if(document.getElementById('chkNum').checked)pool+=sets.num;
    if(document.getElementById('chkSym').checked)pool+=sets.sym;
    if(!pool)pool=sets.lo;
    const len=parseInt(document.getElementById('lenSl').value);
    let pass='';
    for(let i=0;i<len;i++)pass+=pool[Math.floor(Math.random()*pool.length)];
    document.getElementById('passOut').firstChild.textContent=pass;
    // Strength
    let score=0;
    if(len>=12)score++;if(len>=20)score++;
    if(document.getElementById('chkUp').checked&&document.getElementById('chkLo').checked)score++;
    if(document.getElementById('chkNum').checked)score++;if(document.getElementById('chkSym').checked)score++;
    const levels=[['#ef4444','WEAK',15],['#f59e0b','FAIR',40],['#f59e0b','GOOD',65],['#10b981','STRONG',85],['${c2}','VERY STRONG',100]];
    const [color,lbl,w]=levels[Math.min(score,4)];
    document.getElementById('strengthBar').style.cssText=\`background:\${color};width:\${w}%;box-shadow:0 0 10px \${color}66\`;
    document.getElementById('strengthLbl').textContent=lbl;document.getElementById('strengthLbl').style.color=color;
    // History
    hist.unshift(pass);hist=hist.slice(0,6);
    document.getElementById('histList').innerHTML=hist.map(p=>\`<div class="hist-item" onclick="document.getElementById('passOut').firstChild.textContent='\${p}'">\${p}</div>\`).join('');
  }
  function copyPass(){navigator.clipboard.writeText(document.getElementById('passOut').firstChild.textContent||'').catch(()=>{});}
  generate();
<\/script></body></html>`;
    },

    /* 💻 BINARY CONVERTER */
    binary(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(5,10,5)');
      const c2 = rgbToHex(colors[1] || 'rgb(0,255,80)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Binary Converter — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#020903;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}
.bc{width:460px;padding:36px;background:rgba(0,255,80,0.03);border:1px solid ${c2}22;border-radius:24px;box-shadow:0 0 60px ${c2}11,0 40px 80px rgba(0,0,0,0.8);display:flex;flex-direction:column;gap:14px;}
h2{font-size:18px;font-weight:900;color:${c2};letter-spacing:3px;}
label{font-size:10px;font-weight:800;color:${c2}66;letter-spacing:1px;text-transform:uppercase;}
input,textarea{width:100%;padding:12px;background:rgba(0,0,0,0.6);border:1px solid ${c2}22;border-radius:10px;color:${c2};font-size:16px;font-weight:700;outline:none;font-family:'Share Tech Mono',monospace;transition:border 0.2s;resize:none;}
input:focus,textarea:focus{border-color:${c2}66;}
.out-box{padding:14px;background:rgba(0,0,0,0.5);border:1px solid ${c2}11;border-radius:10px;font-family:'Share Tech Mono',monospace;font-size:15px;color:${c2}99;min-height:46px;word-break:break-all;letter-spacing:1px;line-height:1.6;}
.row{display:flex;gap:8px;}
.btn-bc{flex:1;padding:11px;border:none;border-radius:10px;font-size:12px;font-weight:900;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:0.2s;background:${c2};color:#000;}
.btn-bc:hover{filter:brightness(1.1);}
.btn-bc.sec{background:rgba(0,255,80,0.1);color:${c2};border:1px solid ${c2}33;}
.bit-display{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}
.bit{width:28px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Share Tech Mono',monospace;font-size:16px;font-weight:900;transition:0.2s;cursor:pointer;}
.bit.on{background:${c2};color:#000;box-shadow:0 0 14px ${c2}88;}
.bit.off{background:rgba(255,255,255,0.04);color:${c2}33;border:1px solid ${c2}22;}
.bit-val{font-size:28px;font-weight:900;color:#fff;text-align:center;font-family:'Share Tech Mono',monospace;}
</style></head><body>
<div class="bc">
  <h2>💻 BINARY CONVERTER</h2>
  <div><label>Decimal → Binary</label>
    <div class="row"><input type="number" id="decIn" placeholder="Enter decimal..." value="42" oninput="decToBin()"/></div>
    <div class="out-box" id="binOut">101010</div></div>
  <div><label>Interactive 8-bit</label>
    <div class="bit-display" id="bits"></div>
    <div class="bit-val" id="bitDecVal">0</div></div>
  <div><label>Text → ASCII Binary</label>
    <div class="row"><input type="text" id="textIn" placeholder="Type text..." value="Hi" oninput="textToBin()"/></div>
    <div class="out-box" id="textBinOut" style="font-size:12px;"></div></div>
  <div><label>Hex ↔ Binary</label>
    <div class="row">
      <input type="text" id="hexIn" placeholder="Hex e.g. FF" value="2A" oninput="hexToBin()"/>
      <div class="out-box" style="flex:1;padding:12px;" id="hexBinOut">00101010</div>
    </div></div>
</div>
<script>
  let bits=[0,0,1,0,1,0,1,0];
  function makeBits(){
    const d=document.getElementById('bits');d.innerHTML='';
    [128,64,32,16,8,4,2,1].forEach((v,i)=>{
      const b=document.createElement('div');b.className='bit '+(bits[i]?'on':'off');b.textContent=bits[i];
      b.onclick=()=>{bits[i]=bits[i]?0:1;makeBits();};d.appendChild(b);
    });
    const val=bits.reduce((a,b,i)=>a+b*([128,64,32,16,8,4,2,1][i]),0);
    document.getElementById('bitDecVal').textContent=val;
  }
  function decToBin(){const v=parseInt(document.getElementById('decIn').value)||0;document.getElementById('binOut').textContent=(v>>>0).toString(2).padStart(8,'0');}
  function textToBin(){const t=document.getElementById('textIn').value;document.getElementById('textBinOut').textContent=t.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');}
  function hexToBin(){const h=document.getElementById('hexIn').value;const v=parseInt(h,16);document.getElementById('hexBinOut').textContent=isNaN(v)?'Invalid':(v>>>0).toString(2).padStart(8,'0');}
  makeBits();decToBin();textToBin();hexToBin();
<\/script></body></html>`;
    },

    /* 🍅 POMODORO TIMER */
    pomodoro(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(239,68,68)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Pomodoro Timer — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:20px;}
.pom{display:flex;flex-direction:column;align-items:center;gap:20px;padding:50px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:32px;box-shadow:0 40px 80px rgba(0,0,0,0.6);}
.mode-tabs{display:flex;gap:6px;background:rgba(255,255,255,0.05);border-radius:20px;padding:4px;}
.mtab{padding:8px 20px;border:none;border-radius:16px;font-size:12px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;background:transparent;color:#64748b;}
.mtab.active{background:${c2};color:#fff;box-shadow:0 4px 16px ${c2}44;}
.clock-ring{position:relative;width:220px;height:220px;}
.clock-ring svg{position:absolute;top:0;left:0;}
.ring-bg{stroke:rgba(255,255,255,0.06);}
.ring-fg{stroke:${c2};stroke-linecap:round;transition:stroke-dashoffset 1s linear,stroke 0.3s;filter:drop-shadow(0 0 8px ${c2});}
.time-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;}
.time-big{font-family:'Share Tech Mono',monospace;font-size:50px;font-weight:900;color:#fff;}
.time-mode{font-size:10px;font-weight:800;color:#475569;letter-spacing:3px;}
.btns{display:flex;gap:12px;}
.btn{padding:12px 28px;border:none;border-radius:14px;font-size:15px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
.btn-s{background:${c2};color:#fff;box-shadow:0 8px 24px ${c2}44;}
.btn-s:hover{filter:brightness(1.15);transform:translateY(-2px);}
.btn-r{background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.09);}
.sessions{display:flex;gap:6px;}
.ses-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);transition:0.3s;}
.ses-dot.done{background:${c2};box-shadow:0 0 8px ${c2};}
.task-inp{width:100%;padding:10px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:13px;font-weight:700;outline:none;font-family:'Inter',sans-serif;text-align:center;}
</style></head><body>
<div class="pom">
  <div class="mode-tabs">
    <button class="mtab active" onclick="setMode(25,'FOCUS',this)" id="m1">🍅 Focus</button>
    <button class="mtab" onclick="setMode(5,'SHORT BREAK',this)">☕ Short Break</button>
    <button class="mtab" onclick="setMode(15,'LONG BREAK',this)">🌿 Long Break</button>
  </div>
  <div class="clock-ring">
    <svg width="220" height="220" viewBox="0 0 220 220">
      <circle class="ring-bg" cx="110" cy="110" r="96" fill="none" stroke-width="12"/>
      <circle class="ring-fg" id="ring" cx="110" cy="110" r="96" fill="none" stroke-width="12" stroke-dasharray="603" stroke-dashoffset="0" transform="rotate(-90 110 110)"/>
    </svg>
    <div class="time-center">
      <div class="time-big" id="pomTime">25:00</div>
      <div class="time-mode" id="pomMode">FOCUS</div>
    </div>
  </div>
  <div class="sessions" id="sessDots"></div>
  <input class="task-inp" placeholder="What are you working on?" id="taskInp"/>
  <div class="btns">
    <button class="btn btn-s" id="pomBtn" onclick="togglePom()">▶ START</button>
    <button class="btn btn-r" onclick="resetPom()">↺ RESET</button>
  </div>
</div>
<script>
  let mins=25,remaining=1500,total=1500,running=false,timer=null,sessions=0,modeName='FOCUS';
  const ring=document.getElementById('ring');
  for(let i=0;i<4;i++){const d=document.createElement('div');d.className='ses-dot';d.id='sd'+i;document.getElementById('sessDots').appendChild(d);}
  function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function render(){document.getElementById('pomTime').textContent=fmt(remaining);const pct=remaining/total;ring.setAttribute('stroke-dashoffset',603*(1-pct));}
  function setMode(m,name,btn){mins=m;total=m*60;remaining=total;modeName=name;running=false;clearInterval(timer);document.getElementById('pomBtn').textContent='▶ START';document.getElementById('pomMode').textContent=name;document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const colors={FOCUS:'${c2}',SHORT:'#10b981',LONG:'#3b82f6'};ring.style.stroke=colors[name.split(' ')[0]]||'${c2}';render();}
  function togglePom(){
    if(running){running=false;clearInterval(timer);document.getElementById('pomBtn').textContent='▶ RESUME';}
    else{running=true;document.getElementById('pomBtn').textContent='⏸ PAUSE';timer=setInterval(()=>{if(remaining<=0){clearInterval(timer);running=false;if(modeName==='FOCUS'){sessions++;const d=document.getElementById('sd'+((sessions-1)%4));if(d)d.classList.add('done');}document.getElementById('pomBtn').textContent='▶ START';return;}remaining--;render();},1000);}
  }
  function resetPom(){running=false;clearInterval(timer);remaining=total;document.getElementById('pomBtn').textContent='▶ START';render();}
  render();
<\/script></body></html>`;
    },

    /* 🎛️ EQUALIZER */
    equalizer(colors, style) {
      const c1 = rgbToHex(colors[0] || 'rgb(15,23,42)');
      const c2 = rgbToHex(colors[1] || 'rgb(139,92,246)');
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Equalizer — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c1};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;gap:24px;}
.eq{padding:40px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:24px;}
h2{font-size:18px;font-weight:900;color:#fff;}
.bands{display:flex;gap:16px;align-items:flex-end;}
.band{display:flex;flex-direction:column;align-items:center;gap:8px;}
.slider-v{writing-mode:vertical-lr;direction:rtl;-webkit-appearance:slider-vertical;appearance:slider-vertical;height:180px;width:28px;cursor:pointer;}
.band-lbl{font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;}
.band-val{font-family:'Share Tech Mono',monospace;font-size:12px;color:${c2};font-weight:700;}
.visualizer{width:100%;height:80px;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;display:flex;align-items:flex-end;gap:3px;padding:6px;}
.bar{flex:1;border-radius:3px 3px 0 0;transition:height 0.1s;min-height:3px;}
.presets{display:flex;gap:8px;flex-wrap:wrap;}
.preset{padding:7px 14px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);border-radius:20px;color:#64748b;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.preset:hover{border-color:${c2};color:${c2};}
.play-row{display:flex;gap:12px;align-items:center;}
.btn-eq{padding:10px 22px;border:none;border-radius:12px;font-size:13px;font-weight:900;cursor:pointer;font-family:'Inter',sans-serif;transition:0.2s;}
.btn-play{background:${c2};color:#fff;box-shadow:0 6px 18px ${c2}44;}
.btn-play:hover{filter:brightness(1.1);}
.vol-row{display:flex;align-items:center;gap:10px;}
.vol-row input{accent-color:${c2};width:140px;}
.vol-lbl{font-size:12px;font-weight:700;color:#475569;}
</style></head><body>
<div class="eq">
  <h2>🎛️ Audio Equalizer</h2>
  <div class="visualizer" id="viz"></div>
  <div class="bands" id="bands">
    ${['32Hz','64Hz','125Hz','250Hz','500Hz','1kHz','2kHz','4kHz','8kHz','16kHz'].map((f,i)=>`
    <div class="band">
      <div class="band-val" id="bv${i}">0</div>
      <input type="range" class="slider-v" min="-12" max="12" value="0" id="b${i}" oninput="document.getElementById('bv${i}').textContent=(this.value>0?'+':'')+this.value+'dB'"/>
      <div class="band-lbl">${f}</div>
    </div>`).join('')}
  </div>
  <div class="presets">
    <button class="preset" onclick="setPreset([4,3,2,0,-1,-1,0,1,2,3])">🎸 Rock</button>
    <button class="preset" onclick="setPreset([5,4,3,0,0,-1,0,2,4,5])">🎵 Bass Boost</button>
    <button class="preset" onclick="setPreset([0,0,0,0,0,0,0,0,0,0])">⚪ Flat</button>
    <button class="preset" onclick="setPreset([-3,-1,0,2,4,4,3,2,0,-1])">🎤 Vocal</button>
    <button class="preset" onclick="setPreset([6,5,3,1,-1,-1,1,3,5,6])">🎧 Headphones</button>
    <button class="preset" onclick="setPreset([3,2,0,-2,-3,-2,0,2,4,5])">🌊 Jazz</button>
  </div>
  <div class="play-row">
    <button class="btn-eq btn-play" id="eqPlay" onclick="togglePlay()">▶ SIMULATE</button>
    <div class="vol-row"><span class="vol-lbl">VOL</span><input type="range" min="0" max="100" value="75" id="volSl" style="accent-color:${c2}"/><span class="vol-lbl" id="volVal">75%</span></div>
  </div>
</div>
<script>
  // Build visualizer bars
  const viz=document.getElementById('viz');
  const bars=[];
  const bandColors=['#ef4444','#f97316','#f59e0b','#84cc16','#10b981','${c2}','#3b82f6','#6366f1','#8b5cf6','#a855f7'];
  for(let i=0;i<40;i++){const b=document.createElement('div');b.className='bar';b.style.background=bandColors[Math.floor(i/4)];viz.appendChild(b);bars.push(b);}
  let playing=false,animFrame;
  function setPreset(vals){vals.forEach((v,i)=>{const sl=document.getElementById('b'+i);if(sl){sl.value=v;document.getElementById('bv'+i).textContent=(v>0?'+':'')+v+'dB';}})}
  function togglePlay(){if(playing){playing=false;cancelAnimationFrame(animFrame);document.getElementById('eqPlay').textContent='▶ SIMULATE';bars.forEach(b=>b.style.height='3px');}else{playing=true;document.getElementById('eqPlay').textContent='⏸ STOP';animate();}}
  function animate(){
    bars.forEach((b,i)=>{
      const bandIdx=Math.floor(i/4);
      const gain=parseFloat(document.getElementById('b'+bandIdx).value)||0;
      const vol=parseFloat(document.getElementById('volSl').value)/100;
      const base=30+gain*3+Math.random()*30;
      const h=Math.max(3,Math.min(72,base*vol));
      b.style.height=h+'px';
    });
    document.getElementById('volVal').textContent=document.getElementById('volSl').value+'%';
    animFrame=requestAnimationFrame(animate);
  }
<\/script></body></html>`;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     🖼️ TAB UI RENDERER
     ══════════════════════════════════════════════════════════════════ */
  function renderVisionTab() {
    const l = T();
    vtcLang = window.APP_LANG || window.lang || 'en';
    const objLang = l.objects;

    return `
<div id="vtc-root" style="display:flex;flex-direction:column;gap:0;height:100%;overflow-y:auto;">

  <!-- Header -->
  <div style="padding:18px 16px 12px;background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.1));border-bottom:1px solid rgba(255,255,255,0.07);">
    <div style="font-size:15px;font-weight:900;color:#fff;margin-bottom:3px;">${l.title}</div>
    <div style="font-size:11px;color:#64748b;font-weight:600;">${l.subtitle}</div>
  </div>

  <!-- Drop Zone -->
  <div style="padding:14px 14px 0;">
    <div id="vtc-dropzone"
      style="border:2px dashed rgba(139,92,246,0.4);border-radius:18px;padding:24px 16px;text-align:center;cursor:pointer;transition:all 0.3s;background:rgba(139,92,246,0.04);position:relative;"
      onclick="document.getElementById('vtc-file-input').click()"
      ondragover="event.preventDefault();this.style.borderColor='#8b5cf6';this.style.background='rgba(139,92,246,0.12)';"
      ondragleave="this.style.borderColor='rgba(139,92,246,0.4)';this.style.background='rgba(139,92,246,0.04)';"
      ondrop="event.preventDefault();vtcHandleDrop(event);">
      <div id="vtc-preview-wrap" style="display:none;margin-bottom:12px;">
        <img id="vtc-preview-img" src="" alt="" style="max-width:100%;max-height:130px;border-radius:12px;object-fit:cover;box-shadow:0 8px 24px rgba(0,0,0,0.6);"/>
      </div>
      <div id="vtc-drop-icon" style="font-size:36px;margin-bottom:8px;">📷</div>
      <div id="vtc-drop-text" style="font-size:13px;font-weight:700;color:#94a3b8;margin-bottom:4px;">${l.dropZoneText}</div>
      <div style="font-size:11px;color:#475569;">${l.dropZoneOr}</div>
      <input type="file" id="vtc-file-input" accept="image/*" style="display:none;" onchange="vtcHandleFile(this.files[0])"/>
    </div>
  </div>

  <!-- Extracted Colors -->
  <div id="vtc-colors-section" style="display:none;padding:10px 14px 0;">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:6px;">${l.detectedColors}</div>
    <div id="vtc-color-swatches" style="display:flex;gap:6px;flex-wrap:wrap;"></div>
  </div>

  <!-- Style Prompt -->
  <div style="padding:10px 14px 0;">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:5px;">${l.stylePromptLabel}</div>
    <input id="vtc-style-prompt" type="text" placeholder="${l.stylePromptPh}"
      style="width:100%;padding:9px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:12px;outline:none;font-family:'Inter',sans-serif;transition:border 0.2s;"
      onfocus="this.style.borderColor='#8b5cf6'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"/>
  </div>

  <!-- Object Selector -->
  <div style="padding:10px 14px 0;">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:8px;">${l.selectManual}</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;" id="vtc-obj-grid">
      ${Object.entries(objLang).map(([key, obj]) => `
        <button onclick="vtcSelectObj('${key}')" id="vtc-obj-${key}"
          style="padding:8px 6px;border-radius:10px;border:1px solid ${key === vtcSelectedObj ? '#8b5cf6' : 'rgba(255,255,255,0.08)'};
                 background:${key === vtcSelectedObj ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)'};
                 color:#fff;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;
                 display:flex;align-items:center;gap:6px;font-family:'Inter',sans-serif;"
          onmouseover="if('${key}'!==vtcSelectedObj)this.style.borderColor='rgba(139,92,246,0.4)'"
          onmouseout="if('${key}'!==vtcSelectedObj)this.style.borderColor='rgba(255,255,255,0.08)'">
          <span>${obj.icon}</span><span>${obj.label}</span>
        </button>
      `).join('')}
    </div>
  </div>

  <!-- Generate Button -->
  <div style="padding:12px 14px 0;">
    <button id="vtc-gen-btn" onclick="vtcGenerate()"
      style="width:100%;padding:13px;border:none;border-radius:14px;
             background:linear-gradient(135deg,#8b5cf6,#3b82f6);
             color:#fff;font-size:14px;font-weight:900;cursor:pointer;
             box-shadow:0 8px 24px rgba(139,92,246,0.4);
             transition:all 0.2s;font-family:'Inter',sans-serif;"
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 12px 32px rgba(139,92,246,0.5)'"
      onmouseout="this.style.transform='';this.style.boxShadow='0 8px 24px rgba(139,92,246,0.4)'">
      ${l.generateBtn}
    </button>
  </div>

  <!-- Success + Inject -->
  <div id="vtc-success" style="display:none;padding:10px 14px 0;">
    <div style="padding:10px 14px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;font-size:12px;color:#10b981;font-weight:700;margin-bottom:8px;">
      ${l.successMsg}
    </div>
    <button onclick="vtcInject()"
      style="width:100%;padding:11px;border:none;border-radius:12px;
             background:linear-gradient(135deg,#10b981,#059669);
             color:#fff;font-size:13px;font-weight:900;cursor:pointer;
             box-shadow:0 6px 18px rgba(16,185,129,0.35);
             font-family:'Inter',sans-serif;transition:all 0.2s;"
      onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
      ${l.injectBtn}
    </button>
  </div>

  <!-- History -->
  <div id="vtc-history-section" style="padding:12px 14px 20px;${vtcHistory.length === 0 ? 'display:none;' : ''}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;">${l.historyTitle}</div>
      <button onclick="vtcClearHistory()" style="background:none;border:none;color:#475569;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:700;">${l.clearHistory}</button>
    </div>
    <div id="vtc-history-list" style="display:flex;flex-direction:column;gap:5px;">
      ${vtcHistory.slice(-5).reverse().map(h => `
        <div onclick="vtcRestoreHistory('${h.key}')" style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:9px;cursor:pointer;transition:0.2s;"
          onmouseover="this.style.borderColor='rgba(139,92,246,0.3)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
          <span style="font-size:18px;">${VTC_LANG.en.objects[h.obj]?.icon || '📷'}</span>
          <div style="flex:1;">
            <div style="font-size:11px;font-weight:700;color:#fff;">${h.objLabel}</div>
            <div style="font-size:10px;color:#475569;">${h.style || '—'}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

</div>`;
  }

  /* ══════════════════════════════════════════════════════════════════
     ⚡ EVENT HANDLERS — Global functions
     ══════════════════════════════════════════════════════════════════ */

  window.vtcHandleFile = function (file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      vtcImageData = e.target.result;
      const img = document.getElementById('vtc-preview-img');
      const wrap = document.getElementById('vtc-preview-wrap');
      const icon = document.getElementById('vtc-drop-icon');
      const txt = document.getElementById('vtc-drop-text');
      if (!img) return;
      img.src = vtcImageData;
      img.onload = () => {
        vtcColors = extractColors(img);
        renderColorSwatches();
      };
      if (wrap) wrap.style.display = 'block';
      if (icon) icon.style.display = 'none';
      if (txt) txt.textContent = file.name;
      document.getElementById('vtc-success').style.display = 'none';
    };
    reader.readAsDataURL(file);
  };

  window.vtcHandleDrop = function (e) {
    const dz = document.getElementById('vtc-dropzone');
    if (dz) { dz.style.borderColor = 'rgba(139,92,246,0.4)'; dz.style.background = 'rgba(139,92,246,0.04)'; }
    const file = e.dataTransfer.files[0];
    if (file) vtcHandleFile(file);
  };

  window.vtcSelectObj = function (key) {
    vtcSelectedObj = key;
    document.querySelectorAll('[id^="vtc-obj-"]').forEach(btn => {
      const k = btn.id.replace('vtc-obj-', '');
      btn.style.borderColor = k === key ? '#8b5cf6' : 'rgba(255,255,255,0.08)';
      btn.style.background  = k === key ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)';
    });
    document.getElementById('vtc-success').style.display = 'none';
  };

  window.vtcGenerate = function () {
    const btn = document.getElementById('vtc-gen-btn');
    const l = T();
    if (!btn) return;
    btn.textContent = l.generating;
    btn.disabled = true;

    setTimeout(() => {
      const stylePrompt = (document.getElementById('vtc-style-prompt')?.value || '').toLowerCase();
      const colorsToUse = vtcColors.length >= 2 ? vtcColors : ['rgb(30,41,59)', 'rgb(59,130,246)', 'rgb(255,255,255)'];
      const gen = Generators[vtcSelectedObj];
      if (!gen) { btn.textContent = l.generateBtn; btn.disabled = false; return; }
      vtcGeneratedCode = gen(colorsToUse, stylePrompt);

      // Save to history
      const objLabel = T().objects[vtcSelectedObj]?.label || vtcSelectedObj;
      const histItem = {
        key: Date.now() + '',
        obj: vtcSelectedObj,
        objLabel,
        style: stylePrompt,
        code: vtcGeneratedCode,
      };
      vtcHistory.push(histItem);
      if (vtcHistory.length > 10) vtcHistory.shift();
      localStorage.setItem('vtc_history', JSON.stringify(vtcHistory));

      const success = document.getElementById('vtc-success');
      if (success) success.style.display = 'block';
      btn.textContent = l.generateBtn;
      btn.disabled = false;

      // Show success toast
      if (window.showToast) window.showToast(l.successMsg);
    }, 600);
  };

  window.vtcInject = function () {
    if (!vtcGeneratedCode) return;
    const ed = window.editor;
    if (!ed) return;
    ed.setValue(vtcGeneratedCode);
    ed.pushUndoStop();
    if (window.runPreview) window.runPreview();
    const l = T();
    if (window.showToast) window.showToast(l.injected || '🚀 Injected!');
  };

  window.vtcRestoreHistory = function (key) {
    const item = vtcHistory.find(h => h.key === key);
    if (!item) return;
    vtcGeneratedCode = item.code;
    document.getElementById('vtc-success').style.display = 'block';
    vtcSelectObj(item.obj);
    if (document.getElementById('vtc-style-prompt')) {
      document.getElementById('vtc-style-prompt').value = item.style || '';
    }
  };

  window.vtcClearHistory = function () {
    vtcHistory = [];
    localStorage.removeItem('vtc_history');
    const sec = document.getElementById('vtc-history-section');
    if (sec) sec.style.display = 'none';
    const list = document.getElementById('vtc-history-list');
    if (list) list.innerHTML = '';
  };

  function renderColorSwatches() {
    const wrap = document.getElementById('vtc-color-swatches');
    const sec  = document.getElementById('vtc-colors-section');
    if (!wrap || !sec) return;
    sec.style.display = 'block';
    wrap.innerHTML = vtcColors.map(c => `
      <div title="${rgbToHex(c)}"
        style="width:28px;height:28px;border-radius:8px;background:${c};border:2px solid rgba(255,255,255,0.15);cursor:pointer;transition:0.2s;box-shadow:0 3px 10px rgba(0,0,0,0.4);"
        onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform=''"></div>
    `).join('');
  }

  /* ══════════════════════════════════════════════════════════════════
     🧊 3D MODEL IMPORT — Parsers + Shape Detector + Code Generators
     ══════════════════════════════════════════════════════════════════ */

  /* ── Translation additions for 3D section ─────────────────────── */
  const VTC_3D_LANG = {
    en: {
      title3d:        '🧊 3D Model → Code',
      subtitle3d:     'Import a 3D model — Get renderable code',
      dropZone3d:     'Drop 3D asset or Image (.png, .jpg)',
      dropOr3d:       'or click to browse',
      modelInfo:      '📐 Model / Image Info',
      vertices:       'Vertices',
      faces:          'Faces',
      detected3d:     'Detected shape',
      bbox:           'Size / Bounding Box',
      outputMode:     '⚙️ Output Mode',
      modes: {
        threejs:   'Three.js Viewer',
        css3d:     'CSS 3D',
        webgl:     'WebGL Raw',
        wireframe: 'Wireframe',
      },
      material:   'Material',
      materials: { standard:'Standard', metallic:'Metallic', glass:'Glass', liquidChrome:'Liquid Chrome', neonHolo:'Neon Holo', wireframe:'Wireframe', toon:'Toon' },
      animLabel:  'Animation',
      anims: { rotate:'Auto Rotate', pulse:'Pulse', none:'None' },
      generate3d: '⚡ GENERATE 3D CODE →',
      generating3d:'⚙️ Generating 3D...',
      demoModels: '🎁 Demo Models (no file needed)',
      previewLabel:'🔭 Preview',
      shapes: { cube:'Cube', sphere:'Sphere', cylinder:'Cylinder', cone:'Cone', plane:'Plane', mesh:'Free Mesh' },
    },
    fr: {
      title3d:        '🧊 Modèle 3D → Code',
      subtitle3d:     'Importez un modèle 3D — Obtenez du code rendu',
      dropZone3d:     'Déposez Fichier 3D ou Image (.png, .jpg)',
      dropOr3d:       'ou cliquez pour parcourir',
      modelInfo:      '📐 Infos Modèle / Image',
      vertices:       'Sommets',
      faces:          'Faces',
      detected3d:     'Forme détectée',
      bbox:           'Taille / Englobante',
      outputMode:     '⚙️ Mode de sortie',
      modes: {
        threejs:   'Visionneuse Three.js',
        css3d:     'CSS 3D',
        webgl:     'WebGL Brut',
        wireframe: 'Fil de fer',
      },
      material:   'Matériau',
      materials: { standard:'Standard', metallic:'Métallique', glass:'Verre', liquidChrome:'Liquid Chrome', neonHolo:'Néon Holo', wireframe:'Fil de fer', toon:'Cartoon' },
      animLabel:  'Animation',
      anims: { rotate:'Rotation auto', pulse:'Pulsation', none:'Aucune' },
      generate3d: '⚡ GÉNÉRER CODE 3D →',
      generating3d:'⚙️ Génération 3D...',
      demoModels: '🎁 Modèles Démo (sans fichier)',
      previewLabel:'🔭 Aperçu',
      shapes: { cube:'Cube', sphere:'Sphère', cylinder:'Cylindre', cone:'Cône', plane:'Plan', mesh:'Maillage libre' },
    },
  };
  const T3 = () => VTC_3D_LANG[vtcLang] || VTC_3D_LANG.en;

  /* ── 3D State ──────────────────────────────────────────────────── */
  let vtc3dGeo    = null;   // { vertices, indices, normals, colors }
  let vtc3dInfo   = null;   // { vCount, fCount, bbox, shape }
  let vtc3dMode   = 'threejs';
  let vtc3dMat    = 'standard';
  let vtc3dAnim   = 'rotate';
  let vtc3dFileName = '';

  /* ── Built-in Demo Models ──────────────────────────────────────── */
  const DEMO_MODELS = {
    cube: {
      label: '🧊 Cube', shape: 'cube',
      vertices: [
        -1,-1,-1,  1,-1,-1,  1,1,-1, -1,1,-1,
        -1,-1, 1,  1,-1, 1,  1,1, 1, -1,1, 1,
      ],
      indices: [
        0,1,2, 0,2,3, 4,6,5, 4,7,6,
        0,5,1, 0,4,5, 2,7,3, 2,6,7,
        0,3,7, 0,7,4, 1,5,6, 1,6,2,
      ],
    },
    tetrahedron: {
      label: '🔺 Tetrahedron', shape: 'mesh',
      vertices: [ 0,1,0, -0.816,-0.333,0.471, 0.816,-0.333,0.471, 0,-0.333,-0.943 ],
      indices:  [ 0,1,2, 0,2,3, 0,3,1, 1,3,2 ],
    },
    icosphere: {
      label: '🌐 Icosphere', shape: 'sphere',
      vertices: (()=>{
        const t=(1+Math.sqrt(5))/2;
        const pts=[-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1];
        const len=Math.sqrt(1+t*t); return pts.map(v=>v/len);
      })(),
      indices: [0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],
    },
    diamond: {
      label: '💎 Diamond', shape: 'cone',
      vertices: [0,1,0, 1,0,0, 0.707,0,0.707, 0,0,1, -0.707,0,0.707, -1,0,0, -0.707,0,-0.707, 0,0,-1, 0.707,0,-0.707, 0,-0.5,0],
      indices:  [0,1,2,0,2,3,0,3,4,0,4,5,0,5,6,0,6,7,0,7,8,0,8,1,9,2,1,9,3,2,9,4,3,9,5,4,9,6,5,9,7,6,9,8,7,9,1,8],
    },
    torus_approx: {
      label: '🍩 Torus (Low Poly)', shape: 'mesh',
      vertices: (()=>{
        const v=[]; const R=0.7,r=0.3,S=12,s=8;
        for(let i=0;i<S;i++){const u=i/S*Math.PI*2;for(let j=0;j<s;j++){const t=j/s*Math.PI*2;
          v.push((R+r*Math.cos(t))*Math.cos(u),(R+r*Math.cos(t))*Math.sin(u),r*Math.sin(t));}}
        return v;
      })(),
      indices: (()=>{
        const idx=[]; const S=12,s=8;
        for(let i=0;i<S;i++){for(let j=0;j<s;j++){const a=i*s+j,b=i*s+(j+1)%s,c=((i+1)%S)*s+j,d=((i+1)%S)*s+(j+1)%s;
          idx.push(a,b,d,a,d,c);}} return idx;
      })(),
    },
  };

  /* ── OBJ Parser ────────────────────────────────────────────────── */
  function parseOBJ(text) {
    const positions = [], normals = [], uvs = [];
    const outVerts = [], outNorms = [], outIdx = [];
    const vertMap = {};
    let iCount = 0;
    text.split('\n').forEach(line => {
      const p = line.trim().split(/\s+/);
      if (p[0] === 'v')  positions.push(+p[1], +p[2], +p[3]);
      else if (p[0] === 'vn') normals.push(+p[1], +p[2], +p[3]);
      else if (p[0] === 'vt') uvs.push(+p[1], +p[2]);
      else if (p[0] === 'f') {
        const faceVerts = p.slice(1).map(tok => {
          const [vi, ti, ni] = tok.split('/').map(n => (n ? +n - 1 : 0));
          const key = `${vi}/${ti||0}/${ni||0}`;
          if (vertMap[key] === undefined) {
            vertMap[key] = iCount++;
            outVerts.push(positions[vi*3], positions[vi*3+1], positions[vi*3+2]);
            if (normals.length) outNorms.push(normals[ni*3]||0, normals[ni*3+1]||1, normals[ni*3+2]||0);
          }
          return vertMap[key];
        });
        for (let k = 1; k < faceVerts.length - 1; k++)
          outIdx.push(faceVerts[0], faceVerts[k], faceVerts[k+1]);
      }
    });
    return { vertices: outVerts, indices: outIdx, normals: outNorms };
  }

  /* ── STL Parser (binary + ASCII) ──────────────────────────────── */
  function parseSTL(buffer) {
    const isASCII = (new TextDecoder().decode(new Uint8Array(buffer, 0, 80))).includes('solid');
    const vertices = [], normals = [], indices = [];
    if (isASCII) {
      const text = new TextDecoder().decode(buffer);
      const re = /facet normal\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)[\s\S]*?vertex\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+vertex\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+vertex\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)/g;
      let m, i = 0;
      while ((m = re.exec(text))) {
        for (let t = 0; t < 3; t++) {
          normals.push(+m[1], +m[2], +m[3]);
          vertices.push(+m[4+t*3], +m[5+t*3], +m[6+t*3]);
          indices.push(i++);
        }
      }
    } else {
      const view = new DataView(buffer);
      const count = view.getUint32(80, true);
      for (let i = 0, off = 84; i < count; i++, off += 50) {
        const nx=view.getFloat32(off,true), ny=view.getFloat32(off+4,true), nz=view.getFloat32(off+8,true);
        for (let t = 0; t < 3; t++) {
          normals.push(nx, ny, nz);
          vertices.push(view.getFloat32(off+12+t*12,true), view.getFloat32(off+16+t*12,true), view.getFloat32(off+20+t*12,true));
          indices.push(i * 3 + t);
        }
      }
    }
    return { vertices, indices, normals };
  }

  /* ── GLTF/GLB Parser (basic, static mesh) ─────────────────────── */
  function parseGLTF(text) {
    try {
      const json = JSON.parse(text);
      const mesh = json.meshes?.[0]?.primitives?.[0];
      if (!mesh) return null;
      // Minimal: just count and return structure
      return {
        vertices: [], indices: [], normals: [],
        gltfJson: json,
        note: 'GLTF — Three.js mode recommended for full rendering'
      };
    } catch(e) { return null; }
  }

  /* ── Shape Analyzer ────────────────────────────────────────────── */
  function analyzeShape(geo) {
    const v = geo.vertices;
    if (!v || v.length < 3) return { shape:'mesh', bbox:{x:1,y:1,z:1}, vCount:0, fCount:0 };
    let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,minZ=Infinity,maxZ=-Infinity;
    for (let i=0; i<v.length; i+=3) {
      minX=Math.min(minX,v[i]);   maxX=Math.max(maxX,v[i]);
      minY=Math.min(minY,v[i+1]); maxY=Math.max(maxY,v[i+1]);
      minZ=Math.min(minZ,v[i+2]); maxZ=Math.max(maxZ,v[i+2]);
    }
    const dx=maxX-minX, dy=maxY-minY, dz=maxZ-minZ;
    const mx=Math.max(dx,dy,dz)||1;
    const rx=dx/mx, ry=dy/mx, rz=dz/mx;
    const vCount = v.length/3;
    const fCount = (geo.indices||[]).length/3;

    let shape = 'mesh';
    if (rx>0.8&&ry>0.8&&rz>0.8) shape='cube';
    else if (rx>0.7&&rz>0.7&&ry<0.3) shape='plane';
    else if (rx>0.7&&rz>0.7&&ry>1.3) shape='cylinder';
    else if (ry>1.5&&rx<0.7&&rz<0.7) shape='cone';
    else if (vCount>30 && Math.abs(rx-rz)<0.2 && Math.abs(rx-ry)<0.3) shape='sphere';

    return { shape, bbox:{ x:dx.toFixed(2), y:dy.toFixed(2), z:dz.toFixed(2) }, vCount, fCount };
  }

  /* ── Normalize geometry for output ───────────────────────────── */
  function normalizeGeo(geo) {
    const v = geo.vertices;
    let maxR = 0;
    for (let i=0; i<v.length; i+=3)
      maxR = Math.max(maxR, Math.sqrt(v[i]*v[i]+v[i+1]*v[i+1]+v[i+2]*v[i+2]));
    if (maxR === 0) return geo;
    const scale = 1/maxR;
    return { ...geo, vertices: v.map(x=>+(x*scale).toFixed(4)) };
  }

  /* ══════════════════════════════════════════════════════════════════
     🎨 3D CODE GENERATORS
     ══════════════════════════════════════════════════════════════════ */

  /* ── Mode A: WebGL Viewer (self-contained, no CDN) ─────────────── */
  function gen3DThreeJS(geo, info, colors, mat, anim, fname) {
    const ng = normalizeGeo(geo);
    const raw = ng.vertices, idx = ng.indices;
    const matColor = colors[1] ? rgbToHex(colors[1]) : '#3b82f6';
    const bgColor  = colors[0] ? rgbToHex(colors[0]) : '#0f172a';
    const doRotate = anim === 'rotate';
    const doPulse  = anim === 'pulse';
    const [cr,cg,cb]   = (matColor.slice(1).match(/../g)||['3b','82','f6']).map(h=>parseInt(h,16)/255);
    const [br,bg2,bb2] = (bgColor.slice(1).match(/../g)||['0f','17','2a']).map(h=>parseInt(h,16)/255);
    // Pre-expand geometry into flat non-indexed arrays with face normals
    const fV=[], fN=[];
    for(let f=0;f<idx.length;f+=3){
      const i0=idx[f],i1=idx[f+1],i2=idx[f+2];
      const ax=raw[i0*3],ay=raw[i0*3+1],az=raw[i0*3+2];
      const bx=raw[i1*3],by=raw[i1*3+1],bz=raw[i1*3+2];
      const cx=raw[i2*3],cy=raw[i2*3+1],cz=raw[i2*3+2];
      fV.push(ax,ay,az,bx,by,bz,cx,cy,cz);
      const ux=bx-ax,uy=by-ay,uz=bz-az,vx=cx-ax,vy=cy-ay,vz=cz-az;
      const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
      const nl=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
      fN.push(nx/nl,ny/nl,nz/nl,nx/nl,ny/nl,nz/nl,nx/nl,ny/nl,nz/nl);
    }
    const FVS=JSON.stringify(fV), FNS=JSON.stringify(fN), TRIS=fV.length/3;
    const autoRot = doRotate ? 'if(!drag)angY+=0.013;' : '';
    const pulseCode = doPulse ? 'pt+=0.025;' : '';
    const scaleExpr = doPulse ? '1.0+Math.sin(pt)*0.08' : '1.0';
    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'3D Model'} &mdash; Vision to Code</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body,html{width:100%;height:100%;overflow:hidden;background:${bgColor};}
#cv{display:block;width:100%;height:100%;}
#hud{position:fixed;bottom:14px;left:50%;transform:translateX(-50%);
  padding:6px 18px;background:rgba(0,0,0,0.6);
  border:1px solid rgba(255,255,255,0.1);border-radius:20px;
  font:700 11px/1 sans-serif;color:#94a3b8;letter-spacing:1px;
  pointer-events:none;white-space:nowrap;}
</style></head><body>
<canvas id="cv"></canvas>
<div id="hud">&#x1F5B1; Drag &middot; Scroll zoom &middot; ${info.vCount}V ${info.fCount}F &middot; ${info.shape}</div>
<script>
(function(){
var VERTS=${FVS};
var NORMS=${FNS};
var TRIS=${TRIS};
var cv=document.getElementById('cv');
cv.width=window.innerWidth;cv.height=window.innerHeight;
var gl=cv.getContext('webgl');
if(!gl){cv.style.display='none';document.body.innerHTML='<p style="color:#f00;padding:40px;font:18px sans-serif">WebGL not supported</p>';return;}
var VS='attribute vec3 aP;attribute vec3 aN;uniform mat4 uMVP;uniform mat4 uM;varying vec3 vN;varying vec3 vW;void main(){vec4 w=uM*vec4(aP,1.0);vW=w.xyz;vN=normalize(mat3(uM)*aN);gl_Position=uMVP*vec4(aP,1.0);}';
var FS='precision mediump float;varying vec3 vN;varying vec3 vW;uniform vec3 uC;void main(){vec3 N=normalize(vN);vec3 L=normalize(vec3(3.0,5.0,4.0)-vW);vec3 L2=normalize(vec3(-2.0,1.0,-3.0)-vW);vec3 V=normalize(vec3(0.,0.,4.)-vW);float d=max(dot(N,L),0.);float d2=max(dot(N,L2),0.)*.3;vec3 H=normalize(L+V);float sp=pow(max(dot(N,H),0.),60.)*.7;gl_FragColor=vec4(uC*(0.15+d*.72+d2)+vec3(sp),1.0);}';
function mkS(src,t){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var pr=gl.createProgram();
gl.attachShader(pr,mkS(VS,gl.VERTEX_SHADER));
gl.attachShader(pr,mkS(FS,gl.FRAGMENT_SHADER));
gl.linkProgram(pr);gl.useProgram(pr);
var vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(VERTS),gl.STATIC_DRAW);
var nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(NORMS),gl.STATIC_DRAW);
var aP=gl.getAttribLocation(pr,'aP'),aN=gl.getAttribLocation(pr,'aN');
var uMVP=gl.getUniformLocation(pr,'uMVP'),uM=gl.getUniformLocation(pr,'uM'),uC=gl.getUniformLocation(pr,'uC');
gl.uniform3f(uC,${cr.toFixed(4)},${cg.toFixed(4)},${cb.toFixed(4)});
gl.enable(gl.DEPTH_TEST);
gl.clearColor(${br.toFixed(4)},${bg2.toFixed(4)},${bb2.toFixed(4)},1.0);
function I(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);}
function mul(a,b){var o=I();for(var i=0;i<4;i++){for(var j=0;j<4;j++){var s=0;for(var k=0;k<4;k++){s+=a[k*4+j]*b[i*4+k];}o[i*4+j]=s;}}return o;}
function rY(a){var c=Math.cos(a),s=Math.sin(a),m=I();m[0]=c;m[2]=s;m[8]=-s;m[10]=c;return m;}
function rX(a){var c=Math.cos(a),s=Math.sin(a),m=I();m[5]=c;m[6]=-s;m[9]=s;m[10]=c;return m;}
function tZ(z){var m=I();m[14]=z;return m;}
function sc(s){var m=I();m[0]=m[5]=m[10]=s;return m;}
function persp(f,a,n,fr){var t=1/Math.tan(f/2),m=new Float32Array(16);m[0]=t/a;m[5]=t;m[10]=(fr+n)/(n-fr);m[11]=-1;m[14]=2*fr*n/(n-fr);return m;}
var angY=0,angX=0.3,zoom=2.4,drag=false,lx=0,ly=0,pt=0;
cv.addEventListener('mousedown',function(e){drag=true;lx=e.clientX;ly=e.clientY;});
cv.addEventListener('mousemove',function(e){if(!drag)return;angY+=(e.clientX-lx)*0.014;angX+=(e.clientY-ly)*0.010;angX=Math.max(-1.4,Math.min(1.4,angX));lx=e.clientX;ly=e.clientY;});
cv.addEventListener('mouseup',function(){drag=false;});
cv.addEventListener('wheel',function(e){zoom+=e.deltaY*0.004;zoom=Math.max(0.5,Math.min(10,zoom));},{passive:true});
cv.addEventListener('touchstart',function(e){lx=e.touches[0].clientX;ly=e.touches[0].clientY;},{passive:true});
cv.addEventListener('touchmove',function(e){angY+=(e.touches[0].clientX-lx)*0.014;angX+=(e.touches[0].clientY-ly)*0.010;lx=e.touches[0].clientX;ly=e.touches[0].clientY;e.preventDefault();},{passive:false});
function draw(){
  requestAnimationFrame(draw);
  ${autoRot}
  ${pulseCode}
  var W=window.innerWidth,H=window.innerHeight;
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H;}
  gl.viewport(0,0,W,H);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  var scale=${scaleExpr};
  var model=mul(tZ(-zoom),mul(rX(angX),mul(rY(angY),sc(scale))));
  var proj=persp(Math.PI/3,W/H,0.01,200);
  var mvp=mul(proj,model);
  gl.uniformMatrix4fv(uMVP,false,mvp);
  gl.uniformMatrix4fv(uM,false,model);
  gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.enableVertexAttribArray(aP);gl.vertexAttribPointer(aP,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.enableVertexAttribArray(aN);gl.vertexAttribPointer(aN,3,gl.FLOAT,false,0,0);
  gl.drawArrays(gl.TRIANGLES,0,TRIS);
}
draw();
window.addEventListener('resize',function(){cv.width=window.innerWidth;cv.height=window.innerHeight;});
})();
<\/script></html>`;
  }
  /* ── Mode B: CSS 3D ────────────────────────────────────────────── */
  function gen3DCSS(geo, info, colors, mat, anim, fname) {
    const c1 = colors[1] ? rgbToHex(colors[1]) : '#3b82f6';
    const c2 = colors[2] ? rgbToHex(colors[2]) : '#8b5cf6';
    const bg = colors[0] ? rgbToHex(colors[0]) : '#0f172a';
    const isRotate = anim !== 'none';
    const size = 160;
    const half = size/2;

    const faces6 = [
      { tf:`translateZ(${half}px)`,        bg:`${c1}cc` },
      { tf:`rotateY(180deg)  translateZ(${half}px)`, bg:`${c2}cc` },
      { tf:`rotateY(-90deg)  translateZ(${half}px)`, bg:`${c1}aa` },
      { tf:`rotateY( 90deg)  translateZ(${half}px)`, bg:`${c2}aa` },
      { tf:`rotateX( 90deg)  translateZ(${half}px)`, bg:`${c1}88` },
      { tf:`rotateX(-90deg)  translateZ(${half}px)`, bg:`${c2}88` },
    ];

    const shapeHTML = info.shape === 'cylinder'
      ? `<div style="width:${size}px;height:${size*1.5}px;border-radius:50%;background:conic-gradient(${c1},${c2},${c1});box-shadow:0 0 40px ${c1}66;animation:${isRotate?'rotY 4s linear infinite':'none'};"></div>`
      : info.shape === 'sphere'
      ? `<div style="width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle at 35% 35%,${c2},${c1} 60%,#000);box-shadow:0 0 60px ${c1}44,inset 0 -20px 40px rgba(0,0,0,0.5);animation:${isRotate?'rotY 6s linear infinite':'none'};"></div>`
      : `
        <div style="width:${size}px;height:${size}px;transform-style:preserve-3d;animation:${isRotate?'spin3d 6s linear infinite':'none'};">
          ${faces6.map(f=>`<div style="position:absolute;width:${size}px;height:${size}px;border:2px solid rgba(255,255,255,0.15);background:${f.bg};transform:${f.tf};backface-visibility:visible;display:flex;align-items:center;justify-content:center;font-size:${size*0.2}px;">🧊</div>`).join('')}
        </div>`;

    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'3D CSS'} — Vision to Code</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;perspective:800px;overflow:hidden;}
.scene{display:flex;flex-direction:column;align-items:center;gap:30px;}
.model-wrap{display:flex;align-items:center;justify-content:center;transform-style:preserve-3d;}
@keyframes spin3d{0%{transform:rotateX(15deg) rotateY(0)}100%{transform:rotateX(15deg) rotateY(360deg)}}
@keyframes rotY{0%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.info{font-size:12px;color:#475569;font-weight:700;letter-spacing:2px;text-align:center;}
.label{font-size:22px;font-weight:900;color:#fff;letter-spacing:4px;text-shadow:0 0 30px ${c1};}
</style></head><body>
<div class="scene">
  <div class="label">${(fname||info.shape||'3D MODEL').toUpperCase()}</div>
  <div class="model-wrap">${shapeHTML}</div>
  <div class="info">${info.shape.toUpperCase()} · ${info.vCount} VERTICES · CSS 3D · ZERO DEPENDENCIES</div>
</div>
</body></html>`;
  }

  /* ── Mode C: WebGL Raw ─────────────────────────────────────────── */
  function gen3DWebGL(geo, info, colors, mat, anim, fname) {
    const ng = normalizeGeo(geo);
    // IMPORTANT: expand to non-indexed flat arrays so normals match vertices 1:1
    const raw = ng.vertices, idx = ng.indices;
    const flat = [], nflat = [];
    for (let f = 0; f < idx.length; f += 3) {
      for (let k = 0; k < 3; k++) {
        flat.push(raw[idx[f+k]*3], raw[idx[f+k]*3+1], raw[idx[f+k]*3+2]);
      }
      const ax=raw[idx[f]*3],ay=raw[idx[f]*3+1],az=raw[idx[f]*3+2];
      const bx=raw[idx[f+1]*3],by=raw[idx[f+1]*3+1],bz=raw[idx[f+1]*3+2];
      const cx2=raw[idx[f+2]*3],cy2=raw[idx[f+2]*3+1],cz2=raw[idx[f+2]*3+2];
      const ux=bx-ax,uy=by-ay,uz=bz-az,vx=cx2-ax,vy=cy2-ay,vz=cz2-az;
      const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
      const nl = Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
      for (let k=0;k<3;k++) nflat.push(nx/nl, ny/nl, nz/nl);
    }
    const verts = JSON.stringify(flat);
    const norms = JSON.stringify(nflat);
    const c = colors[1] ? rgbToHex(colors[1]) : '#3b82f6';
    const bg = colors[0] ? rgbToHex(colors[0]) : '#0f172a';
    const [br,bg2,bb] = (bg.slice(1).match(/../g)||['0f','17','2a']).map(h=>parseInt(h,16)/255);
    const [cr,cg,cb]  = (c.slice(1).match(/../g)||['3b','82','f6']).map(h=>parseInt(h,16)/255);

    let fsString = `precision mediump float;varying vec3 vn;varying vec3 vp;uniform vec3 col;uniform float tm;void main(){vec3 n=normalize(vn);vec3 l=normalize(vec3(2.,3.,4.)-vp);float d=max(dot(n,l),0.);vec3 v=normalize(vec3(0.,0.,3.)-vp);vec3 h=normalize(l+v);float s=pow(max(dot(n,h),0.),32.)*.4;gl_FragColor=vec4(col*.2+col*d*.75+s,1.);}`;
    
    if (mat === 'liquidChrome') {
      fsString = `precision mediump float;varying vec3 vn;varying vec3 vp;uniform vec3 col;uniform float tm;
void main(){
  vec3 n=normalize(vn);
  vec3 v=normalize(vec3(0.,0.,3.)-vp);
  float ndotv=max(dot(n,v),0.0);
  float df=sin(vp.x*8.+tm*2.)*cos(vp.y*6.+tm*1.5)*0.1;
  vec2 mc=vec2(dot(vec3(1.,0.,0.),n), dot(vec3(0.,1.,0.),n))*0.495+0.5;
  vec3 env=vec3(0.1,0.3,0.7)*mc.y + vec3(0.9,0.9,1.0)*(mc.x+df);
  float fr=pow(1.0-ndotv, 3.0);
  gl_FragColor=vec4(mix(col*0.5,vec3(1.0),fr) + env*1.2,1.0);
}`;
    } else if (mat === 'neonHolo') {
      fsString = `precision mediump float;varying vec3 vn;varying vec3 vp;uniform vec3 col;uniform float tm;
void main(){
  vec3 n=normalize(vn);
  vec3 v=normalize(vec3(0.,0.,3.)-vp);
  float ndotv=1.0-max(dot(n,v),0.0);
  float sf=sin(vp.y*60.0-tm*8.0)*0.5+0.5;
  float intensity=pow(ndotv,2.5)*2.0 + sf*0.4 + 0.1;
  gl_FragColor=vec4(col*intensity,1.0);
}`;
    }

    const autoRot = (anim === 'rotate') ? 'ang+=0.01;rxA=Math.sin(performance.now()*0.0005)*0.2;' : '';

    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'WebGL Raw'} — Vision to Code</title>
<style>*{margin:0;padding:0}body{background:${bg};overflow:hidden;}canvas{display:block;width:100vw;height:100vh;}
#hud{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);padding:6px 18px;background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);border-radius:20px;font-family:monospace;font-size:11px;color:#94a3b8;letter-spacing:2px;pointer-events:none;}</style>
</head><body>
<canvas id="c"></canvas>
<div id="hud">🖱 DRAG TO ROTATE · ${info.vCount}V ${info.fCount}F · WebGL</div>
<script>
const FLAT=${verts};
const NRMS=${norms};
const canvas=document.getElementById('c');
canvas.width=innerWidth;canvas.height=innerHeight;
const gl=canvas.getContext('webgl');
if(!gl){document.body.innerHTML='<p style="color:red;padding:20px">WebGL not supported</p>';throw 0;}

const VS=\`attribute vec3 p;attribute vec3 n;uniform mat4 mvp;uniform mat4 m;varying vec3 vn;varying vec3 vp;void main(){vec4 w=m*vec4(p,1.);vp=w.xyz;vn=normalize(mat3(m)*n);gl_Position=mvp*vec4(p,1.);}\`;
const FS=\`${fsString}\`;
const cs=(src,t)=>{const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);return s;};
const prog=gl.createProgram();gl.attachShader(prog,cs(VS,gl.VERTEX_SHADER));gl.attachShader(prog,cs(FS,gl.FRAGMENT_SHADER));gl.linkProgram(prog);gl.useProgram(prog);

const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(FLAT),gl.STATIC_DRAW);
const nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(NRMS),gl.STATIC_DRAW);
const pL=gl.getAttribLocation(prog,'p'),nL=gl.getAttribLocation(prog,'n');
const mvpL=gl.getUniformLocation(prog,'mvp'),mL=gl.getUniformLocation(prog,'m'),cL=gl.getUniformLocation(prog,'col');
const tL=gl.getUniformLocation(prog,'tm');
gl.uniform3f(cL,${cr.toFixed(3)},${cg.toFixed(3)},${cb.toFixed(3)});
gl.enable(gl.DEPTH_TEST);
gl.clearColor(${br.toFixed(3)},${bg2.toFixed(3)},${bb.toFixed(3)},1);

const I=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
const mul=(a,b)=>{const o=I();for(let c=0;c<4;c++){for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s;}}return o;};
const mkRY=(r)=>{const c=Math.cos(r),s=Math.sin(r),m=I();m[0]=c;m[2]=s;m[8]=-s;m[10]=c;return m;};
const mkRX=(r)=>{const c=Math.cos(r),s=Math.sin(r),m=I();m[5]=c;m[6]=-s;m[9]=s;m[10]=c;return m;};
const mkTr=(z)=>{const m=I();m[14]=z;return m;};
const mkP=(fv,ar,n,f)=>{const t=1/Math.tan(fv/2),m=new Float32Array(16);m[0]=t/ar;m[5]=t;m[10]=(f+n)/(n-f);m[11]=-1;m[14]=2*f*n/(n-f);return m;};
let ang=0,rxA=0.25,drag=false,lx=0,ly=0;
canvas.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;});
canvas.addEventListener('mousemove',e=>{if(!drag)return;ang+=(e.clientX-lx)*.012;rxA+=(e.clientY-ly)*.008;lx=e.clientX;ly=e.clientY;});
canvas.addEventListener('mouseup',()=>drag=false);
canvas.addEventListener('touchstart',e=>{lx=e.touches[0].clientX;ly=e.touches[0].clientY;},{passive:true});
canvas.addEventListener('touchmove',e=>{ang+=(e.touches[0].clientX-lx)*.012;rxA+=(e.touches[0].clientY-ly)*.008;lx=e.touches[0].clientX;ly=e.touches[0].clientY;e.preventDefault();},{passive:false});

function draw(){
  requestAnimationFrame(draw);
  \${autoRot}
  gl.uniform1f(tL, performance.now() * 0.001);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const proj=mkP(Math.PI/3,canvas.width/canvas.height,0.01,100);
  const model=mul(mkTr(-2.2),mul(mkRX(rxA),mkRY(ang)));
  const mvp=mul(proj,model);
  gl.uniformMatrix4fv(mvpL,false,mvp);
  gl.uniformMatrix4fv(mL,false,model);
  gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.enableVertexAttribArray(pL);gl.vertexAttribPointer(pL,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.enableVertexAttribArray(nL);gl.vertexAttribPointer(nL,3,gl.FLOAT,false,0,0);
  gl.drawArrays(gl.TRIANGLES,0,FLAT.length/3);
}
draw();
addEventListener('resize',()=>{canvas.width=innerWidth;canvas.height=innerHeight;});
<\/script></body></html>`;
  }

  /* ── Mode D: Image Hologram (CSS 3D) ────────────────────────────── */
  function genImageCSS3D(geo, info, colors, mat, anim, fname) {
    const bg = colors[0] ? rgbToHex(colors[0]) : '#0f172a';
    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'Image'} — Magic Hologram</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:${bg};width:100vw;height:100vh;overflow:hidden;perspective:1000px;display:flex;align-items:center;justify-content:center;font-family:sans-serif;}
  .holo-container {
    width:40vw; height:60vh;
    transform-style:preserve-3d;
    transition:transform 0.1s;
    border-radius:24px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    background: url('${geo.data}') no-repeat center center;
    background-size: contain;
    position: relative;
  }
  .holo-container::after {
    content:''; position:absolute; top:0; left:0; right:0; bottom:0;
    border-radius:24px;
    background: linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1) 100%);
    mix-blend-mode: overlay;
    transform: translateZ(30px);
    pointer-events:none;
  }
  #hud{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);padding:6px 18px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-size:11px;color:#94a3b8;letter-spacing:1px;pointer-events:none;}
</style></head><body>
<div class="holo-container" id="card"></div>
<div id="hud">✨ Hover to explore parallax hologram ✨</div>
<script>
  const card = document.getElementById('card');
  let rx=0, ry=0;
  window.addEventListener('mousemove', e => {
    const w = window.innerWidth, h = window.innerHeight;
    const px = e.clientX/w - 0.5, py = e.clientY/h - 0.5;
    ry += (px*40 - ry)*0.15;
    rx += (-py*40 - rx)*0.15;
    card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  });
<\/script></body></html>`;
  }

  /* ── Mode E: Image Hologram (WebGL Parallax) ───────────────────── */
  function genImageWebGL(geo, info, colors, mat, anim, fname) {
    const bg = colors[0] ? rgbToHex(colors[0]) : '#000000';
    const [br,bg2,bb2] = (bg.slice(1).match(/../g)||['0f','17','2a']).map(h=>parseInt(h,16)/255);
    
    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'Image'} — WebGL Hologram</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:${bg};width:100vw;height:100vh;overflow:hidden;background-image:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 70%);}
  canvas{display:block;}
  #hud{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);padding:6px 18px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-family:sans-serif;font-size:11px;color:#94a3b8;letter-spacing:1px;pointer-events:none;}
</style></head><body>
<canvas id="c"></canvas>
<div id="hud">✨ Move mouse for WebGL Parallax & Depth ✨</div>
<script>
const cv=document.getElementById('c');
const gl=cv.getContext('webgl');
if(!gl){document.body.innerHTML='WebGL Error';throw 0;}

const VS=\`attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;vUv.y=1.-vUv.y;gl_Position=vec4(p,0.,1.);}\`;
const FS=\`precision mediump float;
varying vec2 vUv; uniform sampler2D t; uniform vec2 uM; uniform float uAsp;
void main(){
  // Fake depth based on luminance
  vec4 base = texture2D(t, vUv);
  float depth = dot(base.rgb, vec3(0.299, 0.587, 0.114));
  vec2 offset = uM * (depth - 0.5) * 0.05;
  vec4 cx = texture2D(t, vUv + offset);
  
  // Fake fresnel/glare
  float dist = length(vUv - vec2(0.5) - uM);
  float glare = smoothstep(0.5, 0.0, dist) * 0.4;
  
  gl_FragColor = cx + vec4(vec3(glare * cx.a), 0.);
}\`;

const s=(src,t)=>{const c=gl.createShader(t);gl.shaderSource(c,src);gl.compileShader(c);return c;};
const pr=gl.createProgram();gl.attachShader(pr,s(VS,gl.VERTEX_SHADER));gl.attachShader(pr,s(FS,gl.FRAGMENT_SHADER));gl.linkProgram(pr);gl.useProgram(pr);

const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),gl.STATIC_DRAW);
const lP=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lP);gl.vertexAttribPointer(lP,2,gl.FLOAT,false,0,0);

const img=new Image();
img.onload=()=>{
  const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  
  const mLoc=gl.getUniformLocation(pr,'uM');
  const aLoc=gl.getUniformLocation(pr,'uAsp');
  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-0.5;my=e.clientY/innerHeight-0.5;});
  
  function draw(){
    requestAnimationFrame(draw);
    cv.width=innerWidth;cv.height=innerHeight;
    gl.viewport(0,0,innerWidth,innerHeight);
    gl.uniform2f(mLoc,-mx,my);
    gl.uniform1f(aLoc,innerWidth/innerHeight);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  draw();
};
img.src = '${geo.data}';
<\/script></body></html>`;
  }

  /* ── Dispatch 3D generation ─────────────────────────────────────── */
  function generate3DCode(geo, info, colors, mode, mat, anim, fname) {
    if (geo.type === 'image') {
      return (mode === 'css3d') 
        ? genImageCSS3D(geo, info, colors, mat, anim, fname)
        : genImageWebGL(geo, info, colors, mat, anim, fname);
    }
    switch (mode) {
      case 'threejs':   return gen3DThreeJS(geo, info, colors, mat, anim, fname);
      case 'css3d':     return gen3DCSS(geo, info, colors, mat, anim, fname);
      case 'webgl':     return gen3DWebGL(geo, info, colors, mat, anim, fname);
      case 'wireframe': return gen3DWireframe(geo, info, colors, mat, anim, fname);
      default:          return gen3DThreeJS(geo, info, colors, mat, anim, fname);
    }
  }

  /* ── Mode F: Canvas Wireframe ──────────────────────────────────── */
  function gen3DWireframe(geo, info, colors, mat, anim, fname) {
    const ng = normalizeGeo(geo);
    const verts = JSON.stringify(ng.vertices);
    const idxs  = JSON.stringify(ng.indices);
    const c = colors[1] ? rgbToHex(colors[1]) : '#00ff80';
    const bg = colors[0] ? rgbToHex(colors[0]) : '#030d06';

    return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${fname||'Wireframe'} — Vision to Code</title>
<style>*{margin:0;padding:0}body{background:${bg};overflow:hidden;}canvas{display:block;}
#hud{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);padding:6px 18px;background:rgba(0,0,0,0.5);border:1px solid ${c}33;border-radius:20px;font-family:monospace;font-size:11px;color:${c};letter-spacing:2px;pointer-events:none;}</style>
</head><body>
<canvas id="c"></canvas>
<div id="hud">🖱️ DRAG TO ROTATE · ${info.vCount}V ${info.fCount}F · WIREFRAME</div>
<script>
const GEO={vertices:${verts},indices:${idxs}};
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
let W=canvas.width,H=canvas.height,CX=W/2,CY=H/2;

let rotX=0.3,rotY=0,drag=false,lx=0,ly=0,autoRot=${anim!=='none'};

canvas.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;autoRot=false;});
canvas.addEventListener('mousemove',e=>{if(!drag)return;rotY+=(e.clientX-lx)*0.008;rotX+=(e.clientY-ly)*0.008;lx=e.clientX;ly=e.clientY;});
canvas.addEventListener('mouseup',()=>drag=false);
canvas.addEventListener('touchstart',e=>{lx=e.touches[0].clientX;ly=e.touches[0].clientY;autoRot=false;},{passive:true});
canvas.addEventListener('touchmove',e=>{rotY+=(e.touches[0].clientX-lx)*0.01;rotX+=(e.touches[0].clientY-ly)*0.01;lx=e.touches[0].clientX;ly=e.touches[0].clientY;e.preventDefault();},{passive:false});

function matMulVec(m,v){return[m[0]*v[0]+m[3]*v[1]+m[6]*v[2],m[1]*v[0]+m[4]*v[1]+m[7]*v[2],m[2]*v[0]+m[5]*v[1]+m[8]*v[2]];}
function project(v,fov=400){const z=v[2]+2.5;return[CX+v[0]/z*fov,CY-v[1]/z*fov,z];}
function rotMat(rx,ry){
  const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
  return[cy,0,sy,sx*sy,cx,-sx*cy,-cx*sy,sx,cx*cy];
}

function draw(){
  requestAnimationFrame(draw);
  if(autoRot)rotY+=0.01;
  ctx.clearRect(0,0,W,H);
  const m=rotMat(rotX,rotY);
  const verts=GEO.vertices;const idx=GEO.indices;
  // Project vertices
  const projected=[];
  for(let i=0;i<verts.length;i+=3){
    const r=matMulVec(m,[verts[i],verts[i+1],verts[i+2]]);
    projected.push(project(r));
  }
  // Draw edges (deduplicated)
  const drawn=new Set();
  for(let f=0;f<idx.length;f+=3){
    const a=idx[f],b=idx[f+1],c=idx[f+2];
    [[a,b],[b,c],[c,a]].forEach(([p,q])=>{
      const key=Math.min(p,q)+'-'+Math.max(p,q);
      if(drawn.has(key))return;drawn.add(key);
      const pa=projected[p],pb=projected[q];
      if(!pa||!pb)return;
      const depth=(pa[2]+pb[2])*0.5;
      const alpha=Math.max(0.1,Math.min(1,(depth-0.5)*0.9));
      ctx.strokeStyle=\`${c}\${Math.round(alpha*255).toString(16).padStart(2,'0')}\`;
      ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(pa[0],pa[1]);ctx.lineTo(pb[0],pb[1]);ctx.stroke();
    });
  }
}
draw();
window.addEventListener('resize',()=>{canvas.width=W=window.innerWidth;canvas.height=H=window.innerHeight;CX=W/2;CY=H/2;});
<\/script></body></html>`;
  }



  /* ── Render 3D section HTML (injected into Vision Tab) ─────────── */
  function render3DSection() {
    const l = T3();
    const objItems = Object.entries(DEMO_MODELS).map(([k, dm]) => `
      <button onclick="vtc3dLoadDemo('${k}')" id="vtc3d-demo-${k}"
        style="padding:7px 10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);
               background:rgba(255,255,255,0.04);color:#fff;font-size:11px;font-weight:700;
               cursor:pointer;transition:all 0.2s;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:5px;"
        onmouseover="this.style.borderColor='#8b5cf688'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
        ${dm.label}
      </button>`).join('');

    const modeItems = Object.entries(l.modes).map(([k,v]) => `
      <label style="display:flex;align-items:center;gap:7px;cursor:pointer;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:9px;border:1px solid rgba(255,255,255,0.07);transition:0.2s;"
        onmouseover="this.style.borderColor='rgba(139,92,246,0.3)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.07)'">
        <input type="radio" name="vtc3d-mode" value="${k}" ${k===vtc3dMode?'checked':''} onchange="vtc3dMode='${k}'" style="accent-color:#8b5cf6;"/>
        <span style="font-size:11px;font-weight:700;color:#94a3b8;">${v}</span>
      </label>`).join('');

    const matItems = Object.entries(l.materials).map(([k,v]) => `
      <option value="${k}" ${k===vtc3dMat?'selected':''}>${v}</option>`).join('');

    const animItems = Object.entries(l.anims).map(([k,v]) => `
      <option value="${k}" ${k===vtc3dAnim?'selected':''}>${v}</option>`).join('');

    return `
<div id="vtc-3d-section" style="margin:14px 14px 0;padding:16px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.2);border-radius:18px;">

  <!-- 3D Header -->
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
    <span style="font-size:20px;">🧊</span>
    <div>
      <div style="font-size:12px;font-weight:900;color:#c4b5fd;">${l.title3d}</div>
      <div style="font-size:10px;color:#64748b;">${l.subtitle3d}</div>
    </div>
  </div>

  <!-- 3D Drop Zone -->
  <div id="vtc3d-dropzone"
    style="border:2px dashed rgba(139,92,246,0.4);border-radius:14px;padding:18px;text-align:center;cursor:pointer;transition:all 0.3s;background:rgba(0,0,0,0.2);margin-bottom:10px;"
    onclick="document.getElementById('vtc3d-file-input').click()"
    ondragover="event.preventDefault();this.style.borderColor='#8b5cf6';this.style.background='rgba(139,92,246,0.12)';"
    ondragleave="this.style.borderColor='rgba(139,92,246,0.4)';this.style.background='rgba(0,0,0,0.2)';"
    ondrop="event.preventDefault();vtc3dHandleDrop(event);">
    <div style="font-size:28px;margin-bottom:6px;">📂</div>
    <div style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:2px;">${l.dropZone3d}</div>
    <div style="font-size:10px;color:#475569;">${l.dropOr3d}</div>
    <input type="file" id="vtc3d-file-input" accept=".obj,.stl,.gltf,.glb,.ply,.png,.jpg,.jpeg,.webp" style="display:none;" onchange="vtc3dHandleFile(this.files[0])"/>
  </div>

  <!-- Demo Models -->
  <div style="margin-bottom:10px;">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:6px;">${l.demoModels}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;">${objItems}</div>
  </div>

  <!-- Model Info (hidden until loaded) -->
  <div id="vtc3d-info" style="display:none;margin-bottom:10px;padding:10px 12px;background:rgba(0,0,0,0.3);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:6px;">${l.modelInfo}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
      <div style="font-size:11px;color:#94a3b8;">${l.vertices}: <span id="vtc3d-vcount" style="color:#c4b5fd;font-weight:900;">—</span></div>
      <div style="font-size:11px;color:#94a3b8;">${l.faces}: <span id="vtc3d-fcount" style="color:#c4b5fd;font-weight:900;">—</span></div>
      <div style="font-size:11px;color:#94a3b8;">${l.detected3d}: <span id="vtc3d-shape" style="color:#10b981;font-weight:900;">—</span></div>
      <div style="font-size:11px;color:#94a3b8;">${l.bbox}: <span id="vtc3d-bbox" style="color:#f59e0b;font-weight:900;">—</span></div>
    </div>
    <!-- Mini Wireframe Preview -->
    <canvas id="vtc3d-preview-canvas" width="260" height="130"
      style="width:100%;margin-top:10px;border-radius:10px;background:rgba(0,0,0,0.5);display:block;cursor:grab;"></canvas>
  </div>

  <!-- Output Mode -->
  <div style="margin-bottom:10px;">
    <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:6px;">${l.outputMode}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">${modeItems}</div>
  </div>

  <!-- Material + Animation -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
    <div>
      <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:4px;">${l.material}</div>
      <select id="vtc3d-mat-sel" onchange="vtc3dMat=this.value"
        style="width:100%;padding:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:9px;color:#fff;font-size:12px;font-weight:700;outline:none;font-family:'Inter',sans-serif;cursor:pointer;">
        ${matItems}
      </select>
    </div>
    <div>
      <div style="font-size:10px;font-weight:800;color:#475569;letter-spacing:1px;margin-bottom:4px;">${l.animLabel}</div>
      <select id="vtc3d-anim-sel" onchange="vtc3dAnim=this.value"
        style="width:100%;padding:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:9px;color:#fff;font-size:12px;font-weight:700;outline:none;font-family:'Inter',sans-serif;cursor:pointer;">
        ${animItems}
      </select>
    </div>
  </div>

  <!-- Generate 3D Button -->
  <button id="vtc3d-gen-btn" onclick="vtc3dGenerate()"
    style="width:100%;padding:13px;border:none;border-radius:14px;
           background:linear-gradient(135deg,#7c3aed,#4f46e5);
           color:#fff;font-size:13px;font-weight:900;cursor:pointer;
           box-shadow:0 8px 24px rgba(124,58,237,0.45);
           transition:all 0.2s;font-family:'Inter',sans-serif;"
    onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
    ${l.generate3d}
  </button>

  <!-- 3D success + inject -->
  <div id="vtc3d-success" style="display:none;margin-top:10px;">
    <div style="padding:8px 12px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);border-radius:10px;font-size:11px;color:#c4b5fd;font-weight:700;margin-bottom:8px;">
      ✅ 3D Code generated! Click Inject to use it.
    </div>
    <button onclick="vtc3dInject()"
      style="width:100%;padding:11px;border:none;border-radius:12px;
             background:linear-gradient(135deg,#7c3aed,#6d28d9);
             color:#fff;font-size:12px;font-weight:900;cursor:pointer;
             font-family:'Inter',sans-serif;transition:0.2s;"
      onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
      💉 Inject 3D Code into Editor
    </button>
  </div>
</div>`;
  }

  /* ── Patch renderVisionTab to include the 3D section ──────────── */
  const _orig_renderVisionTab = renderVisionTab;
  renderVisionTab = function() {
    const base = _orig_renderVisionTab();
    const injectionPoint = '<!-- History -->';
    return base.replace(injectionPoint, render3DSection() + '\n\n  <!-- History -->');
  };

  /* ── Mini Preview ──────────────────────────────────────────────── */
  let vtc3dPreviewAngle = 0;
  let vtc3dPreviewRAF = null;

  function startMiniPreview() {
    const canvas = document.getElementById('vtc3d-preview-canvas');
    if (!canvas || !vtc3dGeo || vtc3dGeo.type === 'image') return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const CX = W/2, CY = H/2;

    let drag = false, lx = 0, ly = 0;
    let rx = 0.3, ry = 0;

    canvas.onmousedown = e => { drag = true; lx = e.offsetX; ly = e.offsetY; };
    canvas.onmousemove = e => { if (!drag) return; ry += (e.offsetX-lx)*0.012; rx += (e.offsetY-ly)*0.012; lx=e.offsetX; ly=e.offsetY; };
    canvas.onmouseup = () => drag = false;

    if (vtc3dPreviewRAF) cancelAnimationFrame(vtc3dPreviewRAF);

    const ng = normalizeGeo(vtc3dGeo);
    const v = ng.vertices, idx = ng.indices;

    function rmul(m, p) {
      return [m[0]*p[0]+m[3]*p[1]+m[6]*p[2], m[1]*p[0]+m[4]*p[1]+m[7]*p[2], m[2]*p[0]+m[5]*p[1]+m[8]*p[2]];
    }
    function proj(pt) { const z=pt[2]+2.2; return [CX+pt[0]/z*180, CY-pt[1]/z*180]; }
    function rotMat(rx,ry) {
      const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
      return [cy,0,sy,sx*sy,cx,-sx*cy,-cx*sy,sx,cx*cy];
    }

    function loop() {
      vtc3dPreviewRAF = requestAnimationFrame(loop);
      ry += 0.008;
      ctx.clearRect(0,0,W,H);
      const m = rotMat(rx, ry);
      const pp = [];
      for (let i=0; i<v.length; i+=3) pp.push(proj(rmul(m,[v[i],v[i+1],v[i+2]])));
      const shown = new Set();
      for (let f=0; f<idx.length; f+=3) {
        const [a,b,c2] = [idx[f],idx[f+1],idx[f+2]];
        [[a,b],[b,c2],[c2,a]].forEach(([p,q])=>{
          const key = Math.min(p,q)+'-'+Math.max(p,q);
          if (shown.has(key)) return; shown.add(key);
          if (!pp[p]||!pp[q]) return;
          ctx.strokeStyle = '#8b5cf688'; ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(pp[p][0],pp[p][1]); ctx.lineTo(pp[q][0],pp[q][1]); ctx.stroke();
        });
      }
    }
    loop();
  }

  /* ── 3D Event Handlers ─────────────────────────────────────────── */
  function updateModelInfo() {
    if (!vtc3dGeo || !vtc3dInfo) return;
    const info = document.getElementById('vtc3d-info');
    if (info) info.style.display = 'block';
    const vc = document.getElementById('vtc3d-vcount'); if (vc) vc.textContent = vtc3dInfo.vCount;
    const fc = document.getElementById('vtc3d-fcount'); if (fc) fc.textContent = vtc3dInfo.fCount;
    const sh = document.getElementById('vtc3d-shape');  if (sh) sh.textContent = T3().shapes[vtc3dInfo.shape] || vtc3dInfo.shape;
    const bb = document.getElementById('vtc3d-bbox');   if (bb) bb.textContent = `${vtc3dInfo.bbox.x}×${vtc3dInfo.bbox.y}×${vtc3dInfo.bbox.z}`;
    requestAnimationFrame(startMiniPreview);
  }

  window.vtc3dLoadDemo = function(key) {
    const dm = DEMO_MODELS[key];
    if (!dm) return;
    vtc3dGeo = { vertices: dm.vertices, indices: dm.indices, normals: [] };
    vtc3dInfo = analyzeShape(vtc3dGeo);
    vtc3dInfo.shape = dm.shape;
    vtc3dFileName = dm.label.replace(/[^a-z0-9]/gi,'_');
    updateModelInfo();
    // Highlight active demo
    document.querySelectorAll('[id^="vtc3d-demo-"]').forEach(b => {
      b.style.borderColor = 'rgba(255,255,255,0.1)';
      b.style.background = 'rgba(255,255,255,0.04)';
    });
    const active = document.getElementById(`vtc3d-demo-${key}`);
    if (active) { active.style.borderColor = '#8b5cf6'; active.style.background = 'rgba(139,92,246,0.2)'; }
  };

  window.vtc3dHandleFile = function(file) {
    if (!file) return;
    vtc3dFileName = file.name.replace(/\.[^.]+$/, '');
    const ext = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();

    if (ext === 'obj') {
      reader.onload = e => {
        vtc3dGeo = parseOBJ(e.target.result);
        vtc3dInfo = analyzeShape(vtc3dGeo);
        updateModelInfo();
      };
      reader.readAsText(file);
    } else if (ext === 'stl') {
      reader.onload = e => {
        vtc3dGeo = parseSTL(e.target.result);
        vtc3dInfo = analyzeShape(vtc3dGeo);
        updateModelInfo();
      };
      reader.readAsArrayBuffer(file);
    } else if (ext === 'gltf') {
      reader.onload = e => {
        vtc3dGeo = parseGLTF(e.target.result) || { vertices:[], indices:[], normals:[] };
        vtc3dInfo = analyzeShape(vtc3dGeo);
        updateModelInfo();
        // For GLTF, force Three.js mode since it's most capable
        vtc3dMode = 'threejs';
        const radios = document.querySelectorAll('input[name="vtc3d-mode"]');
        radios.forEach(r => { r.checked = (r.value === 'threejs'); });
      };
      reader.readAsText(file);
    } else if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          vtc3dGeo = { type: 'image', data: e.target.result, width: img.width, height: img.height };
          vtc3dInfo = { vCount: 0, fCount: 0, shape: 'Image 2D', bbox: {x: img.width, y: img.height, z: 0} };
          updateModelInfo();
          
          // Force WebGL mode for the best hologram effects
          vtc3dMode = 'webgl';
          const radios = document.querySelectorAll('input[name="vtc3d-mode"]');
          radios.forEach(r => { r.checked = (r.value === 'webgl'); });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else if (ext === 'glb' || ext === 'ply') {
      // Minimal fallback — show a message
      const info = document.getElementById('vtc3d-info');
      if (info) {
        info.style.display = 'block';
        info.innerHTML += `<div style="font-size:11px;color:#f59e0b;margin-top:8px;">ℹ️ ${ext.toUpperCase()} format: Use Three.js mode for best results. Demo model loaded instead.</div>`;
      }
      vtc3dLoadDemo('icosphere');
    }
  };

  window.vtc3dHandleDrop = function(e) {
    const dz = document.getElementById('vtc3d-dropzone');
    if (dz) { dz.style.borderColor='rgba(139,92,246,0.4)'; dz.style.background='rgba(0,0,0,0.2)'; }
    const file = e.dataTransfer.files[0];
    if (file) vtc3dHandleFile(file);
  };

  window.vtc3dGenerate = function() {
    const btn = document.getElementById('vtc3d-gen-btn');
    if (!btn) return;
    if (!vtc3dGeo) {
      // Auto-load cube demo if nothing loaded
      vtc3dLoadDemo('cube');
    }
    btn.textContent = T3().generating3d;
    btn.disabled = true;

    setTimeout(() => {
      const colorsToUse = vtcColors.length >= 2
        ? vtcColors
        : ['rgb(15,23,42)', 'rgb(139,92,246)', 'rgb(59,130,246)'];

      vtcGeneratedCode = generate3DCode(
        vtc3dGeo || DEMO_MODELS.cube,
        vtc3dInfo || analyzeShape(DEMO_MODELS.cube),
        colorsToUse,
        vtc3dMode || 'threejs',
        vtc3dMat || 'standard',
        vtc3dAnim || 'rotate',
        vtc3dFileName || 'model'
      );

      const suc = document.getElementById('vtc3d-success');
      if (suc) suc.style.display = 'block';
      btn.textContent = T3().generate3d;
      btn.disabled = false;
      if (window.showToast) window.showToast('✅ 3D Code generated!');
    }, 500);
  };

  window.vtc3dInject = function() {
    if (!vtcGeneratedCode) return;
    const ed = window.editor;
    if (!ed) return;
    ed.setValue(vtcGeneratedCode);
    ed.pushUndoStop();
    if (window.runPreview) window.runPreview();
    if (window.showToast) window.showToast('🧊 3D Code injected!');
  };

  /* ══════════════════════════════════════════════════════════════════
     🔌 REGISTER TAB with existing system
     ══════════════════════════════════════════════════════════════════ */
  function hookIntoTabSystem() {
    // Wait for renderTab to be defined in code-studio.js
    const originalRenderTab = window.renderTab;
    if (typeof originalRenderTab === 'function') {
      window.renderTab = function (tab) {
        if (tab === 'vision') {
          vtcLang = window.APP_LANG || window.lang || 'en';
          const body = document.getElementById('left-body');
          if (body) body.innerHTML = renderVisionTab();
          // Mark correct tab button active
          document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
          const vtcBtn = document.getElementById('tab-vision');
          if (vtcBtn) vtcBtn.classList.add('active');
          window.activeTab = 'vision';
          return;
        }
        originalRenderTab(tab);
      };
    }
    // Sync language on lang change
    const origApplyLang = window.applyLang;
    if (typeof origApplyLang === 'function') {
      window.applyLang = function () {
        origApplyLang();
        vtcLang = window.APP_LANG || window.lang || 'en';
      };
    }
  }

  /* ── Init ──────────────────────────────────────────────────────── */
  function init() {
    hookIntoTabSystem();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

})();
