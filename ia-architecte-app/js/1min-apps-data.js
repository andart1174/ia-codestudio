'use strict';
/* IA Architecte — 1-Minute Micro Apps (10 Unique Apps) */

window.ONE_MIN_APPS = [
  {
    icon: '📱', en: 'QR Code Generator', fr: 'Générateur QR Code',
    desc_en: 'Create instant QR codes for any text or link.',
    desc_fr: 'Créez des QR codes instantanés pour n\'importe quel texte ou lien.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>QR Gen</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { 
      background: #f8fafc; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
    }
    .card { 
      background: #fff; 
      padding: 40px; 
      border-radius: 24px; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
      text-align: center; 
      width: 340px; 
    }
    input { 
      width: 100%; 
      padding: 14px; 
      border: 1px solid #e2e8f0; 
      border-radius: 12px; 
      margin-bottom: 20px; 
      outline: none; 
    }
    button { 
      background: #3b82f6; 
      color: #fff; 
      border: none; 
      padding: 14px; 
      width: 100%; 
      border-radius: 12px; 
      font-weight: 700; 
      cursor: pointer; 
    }
    #qr { 
      margin-top: 30px; 
      min-height: 200px; 
    }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin-bottom:10px">QR Code Maker</h2>
    <p style="color:#64748b;font-size:12px;margin-bottom:20px">Enter a link or text below</p>
    <input type="text" id="inp" placeholder="https://example.com" value="https://example.com">
    <button onclick="gen()">Generate QR Code</button>
    <div id="qr">
      <img id="qrim" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com" alt="QR" style="border-radius:10px">
    </div>
  </div>
  <script>
    function gen() {
      var v = document.getElementById('inp').value;
      if (!v) return;
      document.getElementById('qrim').src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(v);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '⚖️', en: 'BMI Calculator', fr: 'Calculateur IMC',
    desc_en: 'Simple and beautiful Body Mass Index calculator.',
    desc_fr: 'Calculateur d\'Indice de Masse Corporelle simple et esthétique.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>BMI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { 
      background: #1e293b; 
      color: #fff; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
    }
    .card { 
      background: #0f172a; 
      padding: 30px; 
      border-radius: 20px; 
      width: 320px; 
      box-shadow: 0 20px 40px rgba(0,0,0,0.3); 
    }
    .row { margin-bottom: 20px; }
    label { 
      font-size: 11px; 
      color: #94a3b8; 
      font-weight: 700; 
      margin-bottom: 5px; 
      display: block; 
    }
    input { 
      width: 100%; 
      padding: 12px; 
      background: #1e293b; 
      border: 1px solid #334155; 
      border-radius: 10px; 
      color: #fff; 
      outline: none; 
    }
    button { 
      background: #10b981; 
      color: #fff; 
      border: none; 
      padding: 12px; 
      width: 100%; 
      border-radius: 10px; 
      font-weight: 800; 
      cursor: pointer; 
    }
    #res { 
      margin-top: 20px; 
      text-align: center; 
      font-size: 32px; 
      font-weight: 900; 
    }
    #status { 
      text-align: center; 
      font-size: 14px; 
      color: #10b981; 
      font-weight: 700; 
    }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="text-align:center;margin-bottom:20px">BMI Calculator</h2>
    <div class="row">
      <label>WEIGHT (KG)</label>
      <input type="number" id="w" value="70">
    </div>
    <div class="row">
      <label>HEIGHT (CM)</label>
      <input type="number" id="h" value="175">
    </div>
    <button onclick="calc()">Calculate</button>
    <div id="res">22.9</div>
    <div id="status">Normal</div>
  </div>
  <script>
    function calc() {
      var w = parseFloat(document.getElementById('w').value);
      var h = parseFloat(document.getElementById('h').value) / 100;
      var b = (w / (h * h)).toFixed(1);
      
      document.getElementById('res').innerText = b;
      var s = document.getElementById('status');
      
      if (b < 18.5) {
        s.innerText = 'Underweight';
        s.style.color = '#3b82f6';
      } else if (b < 25) {
        s.innerText = 'Normal';
        s.style.color = '#10b981';
      } else if (b < 30) {
        s.innerText = 'Overweight';
        s.style.color = '#f59e0b';
      } else {
        s.innerText = 'Obese';
        s.style.color = '#ef4444';
      }
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '⏱️', en: 'Pro Stopwatch', fr: 'Chronomètre Pro',
    desc_en: 'Precision stopwatch with lap tracking.',
    desc_fr: 'Chronomètre de précision avec suivi des tours.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Stopwatch</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { 
      background: #000; 
      color: #fff; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      padding-top: 100px; 
      min-height: 100vh; 
    }
    #time { 
      font-size: 80px; 
      font-weight: 900; 
      font-variant-numeric: tabular-nums; 
      margin-bottom: 40px; 
    }
    .btn-row { 
      display: flex; 
      gap: 20px; 
      margin-bottom: 40px; 
    }
    button { 
      width: 80px; 
      height: 80px; 
      border-radius: 50%; 
      border: none; 
      font-weight: 700; 
      font-size: 16px; 
      cursor: pointer; 
    }
    #start { 
      background: rgba(16,185,129,0.2); 
      color: #10b981; 
    }
    #lap { 
      background: rgba(255,255,255,0.2); 
      color: #fff; 
    }
    #laps { 
      width: 300px; 
      border-top: 1px solid #333; 
      padding-top: 20px; 
    }
    .lap { 
      display: flex; 
      justify-content: space-between; 
      padding: 10px 0; 
      border-bottom: 1px solid #222; 
      font-variant-numeric: tabular-nums; 
    }
  </style>
</head>
<body>
  <div id="time">00:00.00</div>
  <div class="btn-row">
    <button id="lap" onclick="doLap()">Lap</button>
    <button id="start" onclick="toggle()">Start</button>
  </div>
  <div id="laps"></div>
  <script>
    let t = 0, run = false, int = null;
    
    function fmt(ms) {
      let m = Math.floor(ms / 60000);
      let s = Math.floor((ms % 60000) / 1000);
      let c = Math.floor((ms % 1000) / 10);
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + (c < 10 ? '0' : '') + c;
    }
    
    function toggle() {
      let b = document.getElementById('start');
      if (run) {
        clearInterval(int);
        b.innerText = 'Start';
        b.style.color = '#10b981';
        b.style.background = 'rgba(16,185,129,0.2)';
        document.getElementById('lap').innerText = 'Reset';
      } else {
        int = setInterval(() => {
          t += 10;
          document.getElementById('time').innerText = fmt(t);
        }, 10);
        b.innerText = 'Stop';
        b.style.color = '#ef4444';
        b.style.background = 'rgba(239,68,68,0.2)';
        document.getElementById('lap').innerText = 'Lap';
      }
      run = !run;
    }
    
    function doLap() {
      if (run) {
        let d = document.createElement('div');
        d.className = 'lap';
        d.innerHTML = '<span>Lap</span><span>' + fmt(t) + '</span>';
        document.getElementById('laps').prepend(d);
      } else {
        t = 0;
        document.getElementById('time').innerText = '00:00.00';
        document.getElementById('laps').innerHTML = '';
      }
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '🧾', en: 'Invoice Gen', fr: 'Générateur Facture',
    desc_en: 'Create and print beautiful invoices instantly.',
    desc_fr: 'Créez et imprimez de magnifiques factures instantanément.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Invoice</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #f1f5f9; padding: 40px; color: #1e293b; }
    .inv { 
      background: #fff; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px; 
      border-radius: 10px; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      border-bottom: 2px solid #e2e8f0; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    input { 
      border: 1px solid transparent; 
      padding: 5px; 
      font-size: inherit; 
      font-family: inherit; 
      width: 100%; 
      outline: none; 
    }
    input:hover { border-color: #e2e8f0; }
    .items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    th { background: #f8fafc; font-size: 12px; text-transform: uppercase; }
    .total { text-align: right; font-size: 24px; font-weight: 900; }
    button { 
      padding: 10px 20px; 
      background: #3b82f6; 
      color: #fff; 
      border: none; 
      border-radius: 8px; 
      cursor: pointer; 
      font-weight: 700; 
      display: block; 
      margin: 30px auto; 
    }
    @media print {
      body { background: #fff; padding: 0; }
      button { display: none; }
      .inv { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="inv">
    <div class="header">
      <div>
        <h1 style="color:#3b82f6;margin-bottom:10px">INVOICE</h1>
        <input value="Invoice #001">
        <input value="Date: 28 Apr 2026">
      </div>
      <div style="text-align:right">
        <input value="Your Company Name" style="text-align:right;font-weight:700">
        <input value="123 Business St." style="text-align:right">
        <input value="contact@company.com" style="text-align:right">
      </div>
    </div>
    
    <table class="items">
      <tr>
        <th>Description</th>
        <th>Qty</th>
        <th>Price ($)</th>
        <th>Total</th>
      </tr>
      <tr>
        <td><input value="Web Development Service"></td>
        <td><input type="number" value="1" oninput="calc()"></td>
        <td><input type="number" value="1500" oninput="calc()"></td>
        <td class="itot">$1500</td>
      </tr>
      <tr>
        <td><input value="UI/UX Design"></td>
        <td><input type="number" value="1" oninput="calc()"></td>
        <td><input type="number" value="800" oninput="calc()"></td>
        <td class="itot">$800</td>
      </tr>
    </table>
    
    <div class="total">Total: <span id="gtot">$2300</span></div>
    <button onclick="window.print()">Print / PDF</button>
  </div>
  
  <script>
    function calc() {
      let tot = 0;
      let trs = document.querySelectorAll('.items tr:not(:first-child)');
      
      trs.forEach(tr => {
        let q = tr.cells[1].firstChild.value;
        let p = tr.cells[2].firstChild.value;
        let t = q * p;
        tr.cells[3].innerText = '$' + t;
        tot += t;
      });
      
      document.getElementById('gtot').innerText = '$' + tot;
    }
    calc();
  <\/script>
</body>
</html>`
  },
  {
    icon: '💸', en: 'Tip Calculator', fr: 'Calculateur Pourboire',
    desc_en: 'Calculate tip and split the bill easily.',
    desc_fr: 'Calculez le pourboire et divisez l\'addition facilement.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Tip Calc</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #fbbf24; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: #fff; padding: 30px; border-radius: 24px; width: 320px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .lbl { font-size: 12px; font-weight: 800; color: #94a3b8; margin-top: 15px; margin-bottom: 5px; display: block; }
    input { width: 100%; padding: 15px; background: #f8fafc; border: none; border-radius: 12px; font-size: 18px; font-weight: 700; outline: none; text-align: right; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; background: #f8fafc; padding: 15px; border-radius: 16px; }
    .val { font-size: 24px; font-weight: 900; color: #1e293b; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Tip Calculator</h2>
    
    <label class="lbl">BILL AMOUNT ($)</label>
    <input type="number" id="bill" value="100" oninput="c()">
    
    <label class="lbl">TIP PERCENTAGE (%)</label>
    <input type="range" id="tip" min="0" max="30" value="15" 
           oninput="document.getElementById('tv').innerText=this.value+'%';c()" 
           style="width:100%;margin-top:10px">
    <div id="tv" style="text-align:center;font-weight:800;color:#f59e0b;margin-bottom:10px">15%</div>
    
    <label class="lbl">SPLIT (PEOPLE)</label>
    <input type="number" id="split" value="1" min="1" oninput="c()">
    
    <div class="grid">
      <div>
        <div class="lbl" style="margin-top:0">TIP / PERSON</div>
        <div class="val" id="rtip">$15.00</div>
      </div>
      <div>
        <div class="lbl" style="margin-top:0">TOTAL / PERSON</div>
        <div class="val" id="rtot" style="color:#10b981">$115.00</div>
      </div>
    </div>
  </div>
  
  <script>
    function c() {
      let b = parseFloat(document.getElementById('bill').value) || 0;
      let tp = parseFloat(document.getElementById('tip').value);
      let s = parseInt(document.getElementById('split').value) || 1;
      
      let tipAm = (b * tp) / 100;
      let totAm = b + tipAm;
      
      document.getElementById('rtip').innerText = '$' + (tipAm / s).toFixed(2);
      document.getElementById('rtot').innerText = '$' + (totAm / s).toFixed(2);
    }
    c();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🗣️', en: 'Text to Speech', fr: 'Texte vers Voix',
    desc_en: 'Simple web text-to-speech engine.',
    desc_fr: 'Moteur de synthèse vocale web simple.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>TTS</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #e0e7ff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: #fff; padding: 30px; border-radius: 24px; width: 360px; box-shadow: 0 20px 40px rgba(99,102,241,0.15); }
    textarea { width: 100%; height: 120px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; resize: none; outline: none; font-size: 14px; margin-bottom: 20px; }
    select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px; outline: none; }
    button { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; border: none; padding: 15px; width: 100%; border-radius: 12px; font-weight: 900; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin-bottom:20px;color:#3730a3">Text to Speech 🗣️</h2>
    <textarea id="txt" placeholder="Enter text here...">Hello! I am your AI voice assistant. Type something and I will say it out loud.</textarea>
    <select id="voice"><option>Loading voices...</option></select>
    <button onclick="speak()">Speak Now</button>
  </div>
  
  <script>
    let voices = [];
    
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      let vEl = document.getElementById('voice'); 
      vEl.innerHTML = '';
      
      voices.forEach((v, i) => { 
        let o = document.createElement('option'); 
        o.value = i; 
        o.innerText = v.name; 
        vEl.appendChild(o); 
      });
    };
    
    function speak() {
      let text = document.getElementById('txt').value;
      let s = new SpeechSynthesisUtterance(text);
      s.voice = voices[document.getElementById('voice').value];
      window.speechSynthesis.speak(s);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '🎨', en: 'Color Palette', fr: 'Palette Couleurs',
    desc_en: 'Generate random beautiful color palettes.',
    desc_fr: 'Générez de magnifiques palettes de couleurs aléatoires.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Palette</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { display: flex; flex-direction: column; height: 100vh; }
    .colors { display: flex; flex: 1; }
    .c { 
      flex: 1; display: flex; flex-direction: column; 
      justify-content: flex-end; padding: 30px; 
      transition: 0.3s; cursor: pointer; 
    }
    .c:hover { flex: 1.2; }
    .hex { 
      font-size: 24px; font-weight: 900; 
      background: rgba(255,255,255,0.8); 
      display: inline-block; padding: 10px 20px; 
      border-radius: 10px; margin-bottom: 10px; 
    }
    .hint { 
      font-size: 12px; font-weight: 700; 
      color: rgba(255,255,255,0.7); 
      text-transform: uppercase; 
    }
    button { 
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
      background: #fff; border: none; padding: 12px 30px; 
      border-radius: 30px; font-weight: 900; 
      box-shadow: 0 10px 20px rgba(0,0,0,0.2); cursor: pointer; z-index: 10; 
    }
  </style>
</head>
<body>
  <button onclick="gen()">Space to Generate</button>
  <div class="colors" id="cs"></div>
  
  <script>
    function rndC() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
    
    function gen() {
      let h = '';
      for(let i=0; i<5; i++) {
        let c = rndC();
        h += '<div class="c" style="background:' + c + '" onclick="navigator.clipboard.writeText(\\'' + c + '\\');alert(\\'Copied: ' + c + '\\')">';
        h += '<div class="hex">' + c + '</div>';
        h += '<div class="hint">Click to copy</div></div>';
      }
      document.getElementById('cs').innerHTML = h;
    }
    
    gen();
    
    window.onkeydown = e => {
      if (e.code === 'Space') {
        e.preventDefault();
        gen();
      }
    };
  <\/script>
</body>
</html>`
  },
  {
    icon: '🖌️', en: 'Drawing Canvas', fr: 'Toile Dessin',
    desc_en: 'A beautiful mini drawing application.',
    desc_fr: 'Une mini application de dessin magnifique.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Draw</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #f1f5f9; display: flex; flex-direction: column; align-items: center; padding: 20px; min-height: 100vh; }
    canvas { background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: crosshair; }
    .tools { 
      background: #fff; padding: 15px; border-radius: 16px; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-top: 20px; 
      display: flex; gap: 20px; align-items: center; 
    }
    input[type=color] { border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; overflow: hidden; }
    button { padding: 10px 20px; background: #ef4444; color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <canvas id="c" width="800" height="500"></canvas>
  
  <div class="tools">
    <input type="color" id="col" value="#3b82f6">
    <input type="range" id="sz" min="1" max="50" value="5">
    <button onclick="cx.clearRect(0,0,c.width,c.height)">Clear</button>
  </div>
  
  <script>
    const c = document.getElementById('c');
    const cx = c.getContext('2d');
    let p = false;
    
    c.onmousedown = (e) => {
      p = true;
      cx.beginPath();
      cx.moveTo(e.offsetX, e.offsetY);
    };
    
    c.onmousemove = (e) => {
      if (p) {
        cx.lineTo(e.offsetX, e.offsetY);
        cx.strokeStyle = document.getElementById('col').value;
        cx.lineWidth = document.getElementById('sz').value;
        cx.lineCap = 'round';
        cx.stroke();
      }
    };
    
    c.onmouseup = () => p = false;
    c.onmouseout = () => p = false;
  <\/script>
</body>
</html>`
  },
  {
    icon: '💰', en: 'Expense Tracker', fr: 'Suivi Dépenses',
    desc_en: 'Simple tool to add and track your daily expenses.',
    desc_fr: 'Outil simple pour ajouter et suivre vos dépenses quotidiennes.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Expenses</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #0f172a; display: flex; justify-content: center; padding: 40px; color: #f8fafc; min-height: 100vh; }
    .card { background: #1e293b; width: 360px; padding: 30px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .bal { font-size: 36px; font-weight: 900; color: #10b981; margin-bottom: 20px; text-align: center; }
    .inp { display: flex; gap: 10px; margin-bottom: 20px; }
    input { flex: 1; padding: 12px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #fff; outline: none; }
    button { padding: 12px; background: #3b82f6; color: #fff; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; }
    .list { max-height: 300px; overflow-y: auto; }
    .it { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #334155; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:12px;font-weight:700;color:#94a3b8;text-align:center">TOTAL EXPENSES</div>
    <div class="bal" id="bal">$0.00</div>
    
    <div class="inp">
      <input type="text" id="desc" placeholder="Coffee...">
      <input type="number" id="am" placeholder="4.50" style="width:80px">
      <button onclick="add()">+</button>
    </div>
    
    <div class="list" id="list"></div>
  </div>
  
  <script>
    let tot = 0;
    
    function add() {
      let d = document.getElementById('desc').value;
      let a = parseFloat(document.getElementById('am').value);
      
      if (!d || !a) return; 
      
      tot += a;
      document.getElementById('bal').innerText = '$' + tot.toFixed(2);
      
      let e = document.createElement('div'); 
      e.className = 'it'; 
      e.innerHTML = '<span>' + d + '</span><span style="color:#ef4444;font-weight:700">-$' + a.toFixed(2) + '</span>';
      
      document.getElementById('list').prepend(e);
      document.getElementById('desc').value = ''; 
      document.getElementById('am').value = '';
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '💱', en: 'Currency Convert', fr: 'Convertisseur',
    desc_en: 'Convert values between major currencies.',
    desc_fr: 'Convertir des valeurs entre devises majeures.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Convert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #10b981; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .card { background: #fff; padding: 30px; border-radius: 24px; width: 320px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .row { display: flex; gap: 10px; margin-bottom: 20px; }
    input { flex: 2; padding: 15px; background: #f8fafc; border: none; border-radius: 12px; font-size: 18px; font-weight: 700; outline: none; }
    select { flex: 1; padding: 15px; background: #e2e8f0; border: none; border-radius: 12px; font-weight: 800; outline: none; }
    .res { font-size: 32px; font-weight: 900; color: #1e293b; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin-bottom:20px">Converter</h2>
    
    <div class="row">
      <input type="number" id="am" value="100" oninput="c()">
      <select id="f" onchange="c()">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
    
    <div class="row" style="justify-content:flex-end">
      <select id="t" onchange="c()">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
    
    <div class="res" id="res">92.50</div>
  </div>
  
  <script>
    const rates = { USD: 1, EUR: 0.925, GBP: 0.79 };
    
    function c() {
      let a = parseFloat(document.getElementById('am').value) || 0;
      let f = document.getElementById('f').value;
      let t = document.getElementById('t').value;
      
      let inUSD = a / rates[f]; 
      let out = inUSD * rates[t];
      
      document.getElementById('res').innerText = out.toFixed(2);
    }
    c();
  <\/script>
</body>
</html>`
  }
];
