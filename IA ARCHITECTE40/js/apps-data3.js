'use strict';
/* IA Architecte — Apps 11-17 */
const APPS_DATA_3=[

{icon:'🏋️',en:'BMI Calculator',fr:'Calculateur IMC',desc_en:'Calculate BMI with health tips',desc_fr:'Calcul IMC avec conseils santé',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>BMI</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:32px;width:100%;max-width:420px}h1{font-size:22px;font-weight:900;margin-bottom:24px;text-align:center}label{display:block;font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}input,select{width:100%;padding:11px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;font-size:15px;outline:none;margin-bottom:16px;transition:border .2s}input:focus{border-color:#3b82f6}.btn{width:100%;padding:13px;background:linear-gradient(135deg,#3b82f6,#10b981);border:none;border-radius:12px;color:#fff;font-weight:800;font-size:15px;cursor:pointer;margin-bottom:20px}.result{display:none;text-align:center;padding:20px;border-radius:14px;margin-bottom:16px}.bmi-num{font-size:56px;font-weight:900;line-height:1}.bmi-cat{font-size:16px;font-weight:700;margin-top:6px}.bmi-tip{font-size:13px;color:#94a3b8;line-height:1.6;margin-top:12px;text-align:left}.meter{height:10px;border-radius:5px;background:linear-gradient(90deg,#3b82f6 0%,#10b981 25%,#f59e0b 60%,#ef4444 100%);position:relative;margin:14px 0 6px}.meter-dot{width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid #0f1521;position:absolute;top:-2px;transition:left .5s;box-shadow:0 0 8px rgba(255,255,255,.4)}.meter-labels{display:flex;justify-content:space-between;font-size:9px;color:#64748b}</style></head><body>
<div class="card"><h1>🏋️ BMI Calculator</h1>
<label>Unit System</label>
<select id="unit" onchange="updateLabels()"><option value="metric">Metric (kg / cm)</option><option value="imperial">Imperial (lbs / inches)</option></select>
<label id="wl">Weight (kg)</label><input id="weight" type="number" placeholder="70" min="1"/>
<label id="hl">Height (cm)</label><input id="height" type="number" placeholder="175" min="1"/>
<label>Age</label><input id="age" type="number" placeholder="30" min="1" max="120"/>
<label>Gender</label><select id="gender"><option value="m">Male</option><option value="f">Female</option></select>
<button class="btn" onclick="calc()">Calculate BMI</button>
<div class="result" id="res">
  <div class="bmi-num" id="bmi-num">0</div>
  <div class="bmi-cat" id="bmi-cat"></div>
  <div class="meter"><div class="meter-dot" id="dot"></div></div>
  <div class="meter-labels"><span>Thin</span><span>Normal</span><span>Over</span><span>Obese</span></div>
  <div class="bmi-tip" id="tip"></div>
</div></div>
<script>
function updateLabels(){const m=document.getElementById('unit').value==='metric';document.getElementById('wl').textContent='Weight ('+(m?'kg':'lbs')+')';document.getElementById('hl').textContent='Height ('+(m?'cm':'inches')+')';}
function calc(){
  const unit=document.getElementById('unit').value;
  let w=parseFloat(document.getElementById('weight').value),h=parseFloat(document.getElementById('height').value);
  if(!w||!h)return;
  let bmi;
  if(unit==='metric'){bmi=w/((h/100)**2);}else{bmi=(703*w)/(h**2);}
  bmi=Math.round(bmi*10)/10;
  const cats=[{max:18.5,label:'Underweight',color:'#3b82f6',tip:'You may need to gain weight. Consider a balanced diet rich in proteins and healthy fats.',pct:10},{max:25,label:'Normal weight',color:'#10b981',tip:'Great! Maintain your healthy weight through balanced nutrition and regular exercise.',pct:30},{max:30,label:'Overweight',color:'#f59e0b',tip:'Consider increasing physical activity and reducing processed foods & added sugars.',pct:60},{max:99,label:'Obese',color:'#ef4444',tip:'Consult a healthcare professional for a personalized plan. Small steps lead to big changes!',pct:85}];
  const cat=cats.find(c=>bmi<c.max)||cats[3];
  const res=document.getElementById('res');res.style.display='block';res.style.background=cat.color+'18';res.style.border='1px solid '+cat.color+'33';
  document.getElementById('bmi-num').textContent=bmi;document.getElementById('bmi-num').style.color=cat.color;
  document.getElementById('bmi-cat').textContent=cat.label;document.getElementById('bmi-cat').style.color=cat.color;
  document.getElementById('dot').style.left='calc('+cat.pct+'% - 7px)';
  document.getElementById('tip').textContent='💡 '+cat.tip;
}
</script></body></html>`},

{icon:'🏠',en:'Mortgage Calculator',fr:'Calculateur Hypothèque',desc_en:'Monthly payments, amortization & chart',desc_fr:'Mensualités, amortissement et graphique',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Mortgage</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;padding:24px;min-height:100vh}.container{max-width:700px;margin:0 auto}h1{font-size:22px;font-weight:900;margin-bottom:20px}label{display:block;font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}input{width:100%;padding:10px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:#e2e8f0;font-size:14px;outline:none;margin-bottom:14px;transition:border .2s}input:focus{border-color:#3b82f6}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.btn{padding:12px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;border-radius:10px;color:#fff;font-weight:800;cursor:pointer;font-size:14px;width:100%;margin-bottom:20px}.results{display:none;display-flex:flex-direction:column;gap:14px}.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}.kpi{padding:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;text-align:center}.kpi-val{font-size:22px;font-weight:900;color:#3b82f6}.kpi-lbl{font-size:11px;color:#64748b;margin-top:4px}.chart-area{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px}.chart-title{font-size:12px;font-weight:800;color:#94a3b8;margin-bottom:10px}svg{width:100%}.table-area{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;max-height:220px;overflow-y:auto}table{width:100%;border-collapse:collapse;font-size:12px}th{padding:10px 12px;background:rgba(59,130,246,.1);color:#3b82f6;font-weight:700;text-align:left;position:sticky;top:0}td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.04);color:#94a3b8}</style></head><body>
<div class="container">
<h1>🏠 Mortgage Calculator</h1>
<div class="form-grid">
  <div><label>Loan Amount ($)</label><input id="loan" type="number" value="350000" placeholder="350000"/></div>
  <div><label>Interest Rate (%/year)</label><input id="rate" type="number" value="3.5" step="0.1" placeholder="3.5"/></div>
  <div><label>Loan Term (years)</label><input id="term" type="number" value="25" placeholder="25"/></div>
  <div><label>Down Payment ($)</label><input id="down" type="number" value="70000" placeholder="70000"/></div>
</div>
<button class="btn" onclick="calc()">📊 Calculate</button>
<div class="kpis" id="kpis" style="display:none"></div>
<div class="chart-area" id="chart-area" style="display:none"><div class="chart-title">Principal vs Interest over time</div><svg height="120" id="svg" viewBox="0 0 600 120"></svg></div>
<div class="table-area" id="table-area" style="display:none"><table id="tbl"><thead><tr><th>Year</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody id="tbody"></tbody></table></div>
</div>
<script>
function fmt(n){return '$'+Math.round(n).toLocaleString();}
function calc(){
  const P=parseFloat(document.getElementById('loan').value)-parseFloat(document.getElementById('down').value||0);
  const r=parseFloat(document.getElementById('rate').value)/100/12;
  const n=parseFloat(document.getElementById('term').value)*12;
  if(!P||!r||!n)return;
  const M=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  const total=M*n,interest=total-P;
  document.getElementById('kpis').style.display='grid';
  document.getElementById('kpis').innerHTML=[['Monthly Payment',fmt(M),'#3b82f6'],['Total Interest',fmt(interest),'#ef4444'],['Total Cost',fmt(total),'#f59e0b']].map(([l,v,c])=>`<div class="kpi"><div class="kpi-val" style="color:${c}">${v}</div><div class="kpi-lbl">${l}</div></div>`).join('');
  // Amortization table
  let bal=P;const rows=[];
  for(let y=1;y<=parseFloat(document.getElementById('term').value);y++){
    let yp=0,yi=0;
    for(let m=0;m<12;m++){const iP=bal*r;const pp=M-iP;yp+=pp;yi+=iP;bal-=pp;}
    rows.push([y,fmt(M*12),fmt(yp),fmt(yi),fmt(Math.max(0,bal))]);
  }
  document.getElementById('tbody').innerHTML=rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
  document.getElementById('table-area').style.display='block';
  // Chart
  const maxY=parseFloat(document.getElementById('term').value);
  let b=P;const pts1=[],pts2=[];
  for(let y=0;y<maxY;y++){let yp=0,yi=0;for(let m=0;m<12;m++){const iP=b*r;const pp=M-iP;yp+=pp;yi+=iP;b-=pp;}pts1.push(yi);pts2.push(yp);}
  const maxV=Math.max(...pts1,...pts2);const W=600,H=110;
  const bx=i=>i*(W/maxY),by=v=>H-Math.max(0,(v/maxV)*H+2);
  const p1=pts1.map((v,i)=>(i?'L':'M')+bx(i)+' '+by(v)).join(' ');
  const p2=pts2.map((v,i)=>(i?'L':'M')+bx(i)+' '+by(v)).join(' ');
  document.getElementById('svg').innerHTML=`<path d="${p1}" fill="none" stroke="#ef4444" stroke-width="2"/><path d="${p2}" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="4" y="12" fill="#ef4444" font-size="9">Interest</text><text x="60" y="12" fill="#3b82f6" font-size="9">Principal</text>`;
  document.getElementById('chart-area').style.display='block';
}
calc();
</script></body></html>`},

{icon:'🍎',en:'Calorie Counter',fr:'Compteur Calories',desc_en:'Track calories & macros with daily gauge',desc_fr:'Suivi calories et macros avec jauge',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Calories</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;padding:24px;min-height:100vh}.container{max-width:500px;margin:0 auto}h1{font-size:20px;font-weight:900;margin-bottom:18px}.goal-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;margin-bottom:16px}.ring-wrap{display:flex;align-items:center;gap:20px}.ring-info{flex:1}.kcal-num{font-size:38px;font-weight:900;color:#10b981}.kcal-sub{font-size:12px;color:#64748b}.macros{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.macro{background:rgba(255,255,255,.03);border-radius:10px;padding:10px;text-align:center}.macro-val{font-size:16px;font-weight:800}.macro-lbl{font-size:10px;color:#64748b;margin-top:2px}.add-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;margin-bottom:14px}.add-grid{display:flex;gap:8px;margin-bottom:10px}input,select{flex:1;padding:9px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:#e2e8f0;font-size:13px;outline:none}input:focus{border-color:#10b981}.add-btn{padding:9px 16px;background:#10b981;border:none;border-radius:9px;color:#fff;font-weight:700;cursor:pointer;white-space:nowrap}.food-list{display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto}.food-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;font-size:13px}.food-icon{font-size:18px}.food-info{flex:1}.food-kcal{font-weight:800;color:#10b981}.del{background:none;border:none;color:#374151;cursor:pointer;font-size:16px;transition:color .2s}.del:hover{color:#ef4444}svg circle{transition:stroke-dasharray .5s}</style></head><body>
<div class="container">
<h1>🍎 Calorie Counter</h1>
<div class="goal-card">
  <div class="ring-wrap">
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="7"/>
      <circle id="ring" cx="45" cy="45" r="38" fill="none" stroke="#10b981" stroke-width="7" stroke-dasharray="0 239" stroke-linecap="round" transform="rotate(-90 45 45)"/>
      <text x="45" y="50" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="900" font-family="Inter">
        <tspan id="pct-txt">0%</tspan>
      </text>
    </svg>
    <div class="ring-info">
      <div><span class="kcal-num" id="total-kcal">0</span><span style="font-size:14px;color:#64748b"> / <input id="goal" type="number" value="2000" style="width:60px;padding:2px 6px;font-size:13px;font-weight:700;color:#f59e0b;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.2);border-radius:6px" oninput="update()"/> kcal</span></div>
      <div class="kcal-sub">Daily Goal</div>
    </div>
  </div>
  <div class="macros">
    <div class="macro"><div class="macro-val" id="m-p" style="color:#3b82f6">0g</div><div class="macro-lbl">Protein</div></div>
    <div class="macro"><div class="macro-val" id="m-c" style="color:#f59e0b">0g</div><div class="macro-lbl">Carbs</div></div>
    <div class="macro"><div class="macro-val" id="m-f" style="color:#ef4444">0g</div><div class="macro-lbl">Fat</div></div>
  </div>
</div>
<div class="add-card">
  <div style="font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Add Food</div>
  <div class="add-grid">
    <input id="fname" placeholder="Food name" style="flex:2"/>
    <input id="fkcal" type="number" placeholder="kcal"/>
  </div>
  <div class="add-grid">
    <input id="fprot" type="number" placeholder="Protein g"/>
    <input id="fcarb" type="number" placeholder="Carbs g"/>
    <input id="ffat" type="number" placeholder="Fat g"/>
    <button class="add-btn" onclick="addFood()">+ Add</button>
  </div>
</div>
<div style="font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Today's Log</div>
<div class="food-list" id="food-list"></div>
</div>
<script>
const PRESETS=[{n:'🍌 Banana',k:89,p:1,c:23,f:0},{n:'🥚 Egg',k:78,p:6,c:1,f:5},{n:'🍗 Chicken 100g',k:165,p:31,c:0,f:4},{n:'🥑 Avocado',k:160,p:2,c:9,f:15},{n:'🥛 Milk 200ml',k:103,p:7,c:10,f:4}];
let foods=[...PRESETS];
function addFood(){const n=document.getElementById('fname').value.trim()||'Food',k=+document.getElementById('fkcal').value||0,p=+document.getElementById('fprot').value||0,c=+document.getElementById('fcarb').value||0,f=+document.getElementById('ffat').value||0;foods.push({n,k,p,c,f});['fname','fkcal','fprot','fcarb','ffat'].forEach(id=>document.getElementById(id).value='');update();}
function del(i){foods.splice(i,1);update();}
function update(){
  const total=foods.reduce((a,f)=>({k:a.k+f.k,p:a.p+f.p,c:a.c+f.c,f:a.f+f.f}),{k:0,p:0,c:0,f:0});
  const goal=+document.getElementById('goal').value||2000;
  const pct=Math.min(100,Math.round(total.k/goal*100));
  document.getElementById('total-kcal').textContent=total.k;
  document.getElementById('pct-txt').textContent=pct+'%';
  document.getElementById('ring').setAttribute('stroke-dasharray',`${pct/100*239} 239`);
  document.getElementById('ring').setAttribute('stroke',pct>100?'#ef4444':pct>75?'#f59e0b':'#10b981');
  document.getElementById('m-p').textContent=total.p+'g';document.getElementById('m-c').textContent=total.c+'g';document.getElementById('m-f').textContent=total.f+'g';
  document.getElementById('food-list').innerHTML=foods.map((f,i)=>`<div class="food-item"><span class="food-icon">🍽</span><div class="food-info"><div style="font-weight:600">${f.n}</div><div style="font-size:10px;color:#64748b">P:${f.p}g C:${f.c}g F:${f.f}g</div></div><span class="food-kcal">${f.k}</span><button class="del" onclick="del(${i})">✕</button></div>`).join('');
}
update();
</script></body></html>`},

{icon:'⚽',en:'Sports Scoreboard',fr:'Tableau de Score',desc_en:'Live scoreboard for 5 sports with timer',desc_fr:'Score live pour 5 sports avec chrono',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Scoreboard</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;min-height:100vh;padding:20px}.container{max-width:600px;margin:0 auto}h1{font-size:20px;font-weight:900;margin-bottom:16px;text-align:center}.sport-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px;justify-content:center}.stab{padding:6px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:#94a3b8;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.stab.active{background:rgba(59,130,246,.15);color:#3b82f6;border-color:rgba(59,130,246,.3)}.scoreboard{background:linear-gradient(135deg,rgba(15,21,33,.9),rgba(11,15,26,.95));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:28px;text-align:center;margin-bottom:16px}.sport-name{font-size:13px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:.1em;margin-bottom:20px}.teams{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:20px}.team-block{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px}.team-name-input{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.15);color:#e2e8f0;font-size:14px;font-weight:800;text-align:center;width:140px;padding:4px;outline:none}.team-icon{font-size:40px}.score-num{font-size:64px;font-weight:900;color:#e2e8f0;cursor:pointer;user-select:none;line-height:1;transition:all .15s}.score-num:hover{color:#3b82f6;transform:scale(1.05)}.vs{font-size:20px;font-weight:900;color:#374151;flex-shrink:0}.timer{font-size:36px;font-weight:900;font-family:monospace;color:#f59e0b;margin-bottom:14px}.period{font-size:12px;color:#64748b;margin-bottom:16px}.controls{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.cbtn{padding:9px 16px;border-radius:10px;border:none;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.minus-btn{background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2)}.plus-btn{background:rgba(16,185,129,.1);color:#10b981;border:1px solid rgba(16,185,129,.2)}.timer-btn{background:rgba(59,130,246,.1);color:#3b82f6;border:1px solid rgba(59,130,246,.2)}.reset-btn{background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1)}.events{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px;max-height:150px;overflow-y:auto}.event-item{font-size:12px;color:#64748b;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;justify-content:space-between}.event-item:last-child{border-bottom:none}</style></head><body>
<div class="container"><h1>⚽ Sports Scoreboard</h1>
<div class="sport-tabs" id="sport-tabs"></div>
<div class="scoreboard">
  <div class="sport-name" id="sport-name">FOOTBALL</div>
  <div class="teams">
    <div class="team-block"><div class="team-icon" id="icon1">🔵</div><input class="team-name-input" id="t1" value="HOME" oninput="addEvent('name')"/><div class="score-num" id="s1" onclick="addScore(1)">0</div></div>
    <div class="vs">VS</div>
    <div class="team-block"><div class="team-icon" id="icon2">🔴</div><input class="team-name-input" id="t2" value="AWAY" oninput="addEvent('name')"/><div class="score-num" id="s2" onclick="addScore(2)">0</div></div>
  </div>
  <div class="timer" id="timer">00:00</div>
  <div class="period" id="period">1st Half</div>
  <div class="controls">
    <button class="cbtn minus-btn" onclick="adjust(1,-1)">−1 Home</button>
    <button class="cbtn plus-btn" onclick="addScore(1)">+1 Home</button>
    <button class="cbtn timer-btn" id="tbtn" onclick="toggleTimer()">▶ Start</button>
    <button class="cbtn plus-btn" onclick="addScore(2)">+1 Away</button>
    <button class="cbtn minus-btn" onclick="adjust(2,-1)">−1 Away</button>
    <button class="cbtn reset-btn" onclick="reset()">Reset</button>
  </div>
</div>
<div class="events" id="events"><div class="event-item"><span>⚽ Match ready to start</span><span>0:00</span></div></div>
</div>
<script>
const SPORTS=[{n:'FOOTBALL',icon1:'🔵',icon2:'🔴',p:['1st Half','2nd Half','Extra Time'],t:45},{n:'BASKETBALL',icon1:'🟡',icon2:'⚫',p:['Q1','Q2','Q3','Q4'],t:12},{n:'TENNIS',icon1:'🎾',icon2:'🎾',p:['Set 1','Set 2','Set 3'],t:0},{n:'HOCKEY',icon1:'🔵',icon2:'⚫',p:['Period 1','Period 2','Period 3'],t:20},{n:'VOLLEYBALL',icon1:'🟠',icon2:'🟣',p:['Set 1','Set 2','Set 3'],t:0}];
let cur=0,s=[0,0],sec=0,running=false,interval=null,period=0,events=[];
document.getElementById('sport-tabs').innerHTML=SPORTS.map((s,i)=>`<button class="stab${i===0?' active':''}" onclick="setSport(${i},this)">${s.n}</button>`).join('');
function setSport(i,el){cur=i;s=[0,0];sec=0;period=0;clearInterval(interval);running=false;document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active'));el.classList.add('active');const sp=SPORTS[i];document.getElementById('sport-name').textContent=sp.n;document.getElementById('icon1').textContent=sp.icon1;document.getElementById('icon2').textContent=sp.icon2;document.getElementById('period').textContent=sp.p[0];render();}
function addScore(team){s[team-1]++;addEvent('goal',team);render();}
function adjust(team,d){s[team-1]=Math.max(0,s[team-1]+d);render();}
function render(){document.getElementById('s1').textContent=s[0];document.getElementById('s2').textContent=s[1];const m=Math.floor(sec/60),ss=sec%60;document.getElementById('timer').textContent=(m<10?'0':'')+m+':'+(ss<10?'0':'')+ss;}
function toggleTimer(){running=!running;document.getElementById('tbtn').textContent=running?'⏸ Pause':'▶ Start';if(running){interval=setInterval(()=>{sec++;render();},1000);}else clearInterval(interval);}
function reset(){clearInterval(interval);running=false;s=[0,0];sec=0;period=0;const sp=SPORTS[cur];document.getElementById('period').textContent=sp.p[0];document.getElementById('tbtn').textContent='▶ Start';events=[];document.getElementById('events').innerHTML='<div class="event-item"><span>Match reset</span><span>0:00</span></div>';render();}
function addEvent(type,team){const m=Math.floor(sec/60),ss=sec%60;const time=(m<10?'0':'')+m+':'+(ss<10?'0':'')+ss;const msg=type==='goal'?`⚽ Goal! ${document.getElementById('t'+team).value} scores`:'🏟 Event';const ev=document.getElementById('events');ev.innerHTML=`<div class="event-item"><span>${msg}</span><span>${time}</span></div>`+ev.innerHTML;}
render();
</script></body></html>`},

{icon:'💪',en:'HIIT Workout Timer',fr:'Timer HIIT',desc_en:'Configurable HIIT/Tabata timer with sequences',desc_fr:'Timer HIIT/Tabata configurable avec séquences',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>HIIT Timer</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}.card{width:100%;max-width:420px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:24px}h1{font-size:20px;font-weight:900;text-align:center;margin-bottom:0}.presets{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-bottom:4px}.preset{padding:5px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);font-size:11px;font-weight:700;color:#94a3b8;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.preset:hover{border-color:rgba(59,130,246,.3);color:#3b82f6}.config{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.cfg-item{display:flex;flex-direction:column;gap:4px}.cfg-lbl{font-size:10px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.05em}input[type=number]{padding:8px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#e2e8f0;font-size:16px;font-weight:700;outline:none;text-align:center}.display{text-align:center;padding:20px 0}.phase-lbl{font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}.big-time{font-size:80px;font-weight:900;line-height:1;font-family:monospace;transition:color .3s}.round-info{font-size:12px;color:#64748b;margin-top:8px}.progress-ring{margin:12px auto;display:block}.controls{display:flex;gap:10px;justify-content:center}.cbtn{padding:12px 28px;border-radius:12px;border:none;font-size:14px;font-weight:800;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.start{background:linear-gradient(135deg,#10b981,#3b82f6);color:#fff}.stop{background:rgba(239,68,68,.15);color:#ef4444;border:1px solid rgba(239,68,68,.25)}.reset{background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1)}.seq{margin-top:12px;display:flex;gap:4px;flex-wrap:wrap;justify-content:center}.seq-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.1);transition:all .3s}</style></head><body>
<h1>💪 HIIT Timer</h1>
<div class="presets">
  <button class="preset" onclick="loadPreset(20,10,8)">Tabata</button>
  <button class="preset" onclick="loadPreset(40,20,6)">Classic HIIT</button>
  <button class="preset" onclick="loadPreset(45,15,10)">Intense</button>
  <button class="preset" onclick="loadPreset(30,30,5)">50/50</button>
</div>
<div class="card">
  <div class="config">
    <div class="cfg-item"><div class="cfg-lbl">🔥 Work (sec)</div><input id="work" type="number" value="20" min="5" max="120"/></div>
    <div class="cfg-item"><div class="cfg-lbl">😮‍💨 Rest (sec)</div><input id="rest" type="number" value="10" min="5" max="120"/></div>
    <div class="cfg-item"><div class="cfg-lbl">🔄 Rounds</div><input id="rounds" type="number" value="8" min="1" max="30"/></div>
    <div class="cfg-item"><div class="cfg-lbl">⏱ Prep (sec)</div><input id="prep" type="number" value="5" min="0" max="30"/></div>
  </div>
</div>
<div class="display">
  <div class="phase-lbl" id="phase-lbl" style="color:#10b981">READY</div>
  <div class="big-time" id="big-time" style="color:#10b981">GO!</div>
  <div class="round-info" id="round-info">Press START to begin</div>
  <svg class="progress-ring" width="140" height="140" viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="8"/>
    <circle id="prog-ring" cx="70" cy="70" r="62" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="390 390" stroke-linecap="round" transform="rotate(-90 70 70)" style="transition:stroke-dasharray .8s,stroke .3s"/>
  </svg>
  <div class="seq" id="seq"></div>
</div>
<div class="controls">
  <button class="cbtn start" id="start-btn" onclick="toggle()">▶ START</button>
  <button class="cbtn reset" onclick="resetTimer()">↺ Reset</button>
</div>
<script>
let running=false,interval=null,phase='prep',curRound=1,timeLeft=5,totalTime=5;
function loadPreset(w,r,n){document.getElementById('work').value=w;document.getElementById('rest').value=r;document.getElementById('rounds').value=n;resetTimer();}
function getVal(id){return parseInt(document.getElementById(id).value)||0;}
function buildSeq(){const r=getVal('rounds');const s=document.getElementById('seq');s.innerHTML=Array.from({length:r},(_,i)=>`<div class="seq-dot" id="dot${i}"></div>`).join('');}
function resetTimer(){clearInterval(interval);running=false;phase='prep';curRound=1;timeLeft=getVal('prep')||5;totalTime=timeLeft;document.getElementById('start-btn').textContent='▶ START';document.getElementById('start-btn').className='cbtn start';updateDisplay();buildSeq();}
function toggle(){
  if(running){clearInterval(interval);running=false;document.getElementById('start-btn').textContent='▶ RESUME';document.getElementById('start-btn').className='cbtn start';}
  else{running=true;document.getElementById('start-btn').textContent='⏸ PAUSE';document.getElementById('start-btn').className='cbtn stop';interval=setInterval(tick,1000);}
}
function tick(){
  timeLeft--;updateDisplay();
  if(timeLeft<=0){
    if(phase==='prep'){phase='work';timeLeft=getVal('work');totalTime=timeLeft;}
    else if(phase==='work'){phase='rest';timeLeft=getVal('rest');totalTime=timeLeft;}
    else if(phase==='rest'){curRound++;if(curRound>getVal('rounds')){done();return;}phase='work';timeLeft=getVal('work');totalTime=timeLeft;}
  }
}
function updateDisplay(){
  const colors={prep:'#f59e0b',work:'#ef4444',rest:'#10b981'};
  const labels={prep:'GET READY',work:'WORK!',rest:'REST'};
  document.getElementById('phase-lbl').textContent=labels[phase]||'';
  document.getElementById('phase-lbl').style.color=colors[phase];
  document.getElementById('big-time').textContent=String(timeLeft).padStart(2,'0');
  document.getElementById('big-time').style.color=colors[phase];
  document.getElementById('round-info').textContent=phase==='prep'?'Prepare yourself...':`Round ${curRound} of ${getVal('rounds')}`;
  const pct=timeLeft/totalTime;document.getElementById('prog-ring').setAttribute('stroke-dasharray',`${390*pct} 390`);document.getElementById('prog-ring').setAttribute('stroke',colors[phase]);
  for(let i=0;i<getVal('rounds');i++){const d=document.getElementById('dot'+i);if(d)d.style.background=i<curRound-1?'#10b981':i===curRound-1?colors[phase]:'rgba(255,255,255,.1)';}
}
function done(){clearInterval(interval);running=false;document.getElementById('phase-lbl').textContent='DONE! 🎉';document.getElementById('big-time').textContent='💪';document.getElementById('big-time').style.color='#10b981';document.getElementById('round-info').textContent='Workout complete!';document.getElementById('start-btn').textContent='▶ START';document.getElementById('start-btn').className='cbtn start';}
resetTimer();
</script></body></html>`},

{icon:'📈',en:'Stock Portfolio',fr:'Portefeuille Actions',desc_en:'Simulated stock portfolio tracker with P&L',desc_fr:'Portefeuille d\'actions simulé avec P&L',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Portfolio</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:#080c14;color:#e2e8f0;padding:20px;min-height:100vh}.container{max-width:700px;margin:0 auto}h1{font-size:20px;font-weight:900;margin-bottom:18px}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}.kpi{padding:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px}.kpi-val{font-size:20px;font-weight:900}.kpi-lbl{font-size:10px;color:#64748b;margin-top:3px}.add-row{display:flex;gap:8px;margin-bottom:16px}input,select{padding:9px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:#e2e8f0;font-size:13px;outline:none}input:focus,select:focus{border-color:#3b82f6}.add-btn{padding:9px 16px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;border-radius:9px;color:#fff;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'Inter',sans-serif}.table-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden}table{width:100%;border-collapse:collapse;font-size:13px}th{padding:11px 14px;background:rgba(59,130,246,.1);color:#3b82f6;font-weight:700;text-align:left}td{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04)}tr:last-child td{border-bottom:none}.up{color:#10b981}.dn{color:#ef4444}.del-btn{background:none;border:none;color:#374151;cursor:pointer;font-size:15px}.del-btn:hover{color:#ef4444}.mini-chart{display:inline-flex;align-items:flex-end;gap:2px;height:24px;vertical-align:middle;margin-left:6px}.bar{width:3px;border-radius:1px}</style></head><body>
<div class="container">
<h1>📈 Stock Portfolio</h1>
<div class="kpis" id="kpis"></div>
<div class="add-row">
  <select id="stock-sel"><option value="">Select stock...</option></select>
  <input id="qty" type="number" placeholder="Qty" style="width:80px" min="1"/>
  <input id="price" type="number" placeholder="Buy price" step="0.01"/>
  <button class="add-btn" onclick="addHolding()">+ Add</button>
</div>
<div class="table-wrap"><table><thead><tr><th>Stock</th><th>Qty</th><th>Buy</th><th>Current</th><th>Value</th><th>P&L</th><th>Chart</th><th></th></tr></thead><tbody id="tbody"></tbody></table></div>
</div>
<script>
const STOCKS={AAPL:{n:'Apple',p:189.5,c:'🍎',h:[175,180,183,178,185,188,186,190,189.5]},MSFT:{n:'Microsoft',p:415,c:'💻',h:[390,398,405,400,408,412,410,416,415]},GOOGL:{n:'Google',p:175,c:'🔍',h:[162,165,170,168,172,174,171,176,175]},AMZN:{n:'Amazon',p:205,c:'📦',h:[190,195,200,197,202,204,201,206,205]},TSLA:{n:'Tesla',p:175,c:'⚡',h:[200,190,185,178,180,172,168,176,175]},NVDA:{n:'Nvidia',p:875,c:'🧠',h:[700,750,800,820,840,860,845,880,875]},META:{n:'Meta',p:520,c:'👍',h:[480,490,500,495,505,510,508,522,520]},BTC:{n:'Bitcoin',p:68000,c:'₿',h:[60000,63000,65000,62000,66000,67000,64000,69000,68000]}};
let holdings=[{sym:'AAPL',qty:10,buy:165},{sym:'TSLA',qty:5,buy:210},{sym:'NVDA',qty:2,buy:650}];
const sel=document.getElementById('stock-sel');
Object.entries(STOCKS).forEach(([sym,{n,c}])=>{const o=document.createElement('option');o.value=sym;o.textContent=`${c} ${sym} — ${n}`;sel.appendChild(o);});
function addHolding(){const sym=sel.value;const qty=+document.getElementById('qty').value;const price=+document.getElementById('price').value;if(!sym||!qty||!price)return;holdings.push({sym,qty,buy:price});document.getElementById('qty').value='';document.getElementById('price').value='';render();}
function del(i){holdings.splice(i,1);render();}
function miniChart(h,up){return '<div class="mini-chart">'+h.map(v=>{const hPct=Math.round((v-Math.min(...h))/(Math.max(...h)-Math.min(...h))*20)||2;return`<div class="bar" style="height:${hPct}px;background:${up?'#10b981':'#ef4444'}"></div>`;}).join('')+'</div>';}
function render(){
  let total=0,cost=0;
  const rows=holdings.map((h,i)=>{const s=STOCKS[h.sym];if(!s)return'';const cur=s.p,val=cur*h.qty,paid=h.buy*h.qty,pl=val-paid,pct=((pl/paid)*100).toFixed(1);total+=val;cost+=paid;const up=pl>=0;return`<tr><td><span style="font-size:18px">${s.c}</span> <strong>${h.sym}</strong><br><small style="color:#64748b">${s.n}</small></td><td>${h.qty}</td><td>$${h.buy.toFixed(2)}</td><td>$${cur.toFixed(2)}</td><td style="font-weight:700">$${Math.round(val).toLocaleString()}</td><td class="${up?'up':'dn'}">${up?'+':''}$${Math.round(pl).toLocaleString()}<br><small>${up?'+':''}${pct}%</small></td><td>${miniChart(s.h,up)}</td><td><button class="del-btn" onclick="del(${i})">✕</button></td></tr>`;}).join('');
  document.getElementById('tbody').innerHTML=rows||'<tr><td colspan="8" style="text-align:center;color:#374151;padding:20px">Add stocks above</td></tr>';
  const pl=total-cost,up=pl>=0;
  document.getElementById('kpis').innerHTML=[['Portfolio Value','$'+Math.round(total).toLocaleString(),'#3b82f6'],['Total P&L',(up?'+':'')+'$'+Math.round(Math.abs(pl)).toLocaleString(),up?'#10b981':'#ef4444'],['Return',(up?'+':'')+((pl/cost)*100).toFixed(1)+'%',up?'#10b981':'#ef4444'],['Holdings',holdings.length,'#8b5cf6']].map(([l,v,c])=>`<div class="kpi"><div class="kpi-val" style="color:${c}">${v}</div><div class="kpi-lbl">${l}</div></div>`).join('');
}
render();setInterval(()=>{Object.values(STOCKS).forEach(s=>{s.p=+(s.p*(1+(Math.random()*.004-.002))).toFixed(2);});render();},3000);
</script></body></html>`},

{icon:'🧘',en:'Meditation Timer',fr:'Timer Méditation',desc_en:'Breathing cycles & meditation timer with animations',desc_fr:'Cycles respiratoires et timer méditation animé',
code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Meditation</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}body{background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.15),transparent 70%),#080c14;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:24px}.title{font-size:22px;font-weight:900;text-align:center;background:linear-gradient(135deg,#8b5cf6,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.breath-circle{width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.3),rgba(59,130,246,.1));border:2px solid rgba(139,92,246,.3);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;transition:transform 4s ease-in-out,box-shadow 4s ease-in-out;box-shadow:0 0 30px rgba(139,92,246,.2)}.breath-circle.inhale{transform:scale(1.3);box-shadow:0 0 60px rgba(139,92,246,.5)}.breath-circle.exhale{transform:scale(0.85);box-shadow:0 0 15px rgba(139,92,246,.1)}.breath-label{font-size:14px;font-weight:800;color:#c4b5fd;text-align:center}.breath-count{font-size:36px;font-weight:900;font-family:monospace;color:#e2e8f0}.instruction{font-size:13px;color:#7c3aed;font-weight:700;text-align:center;height:20px}.session-timer{font-size:42px;font-weight:900;font-family:monospace;color:#8b5cf6;text-shadow:0 0 20px rgba(139,92,246,.4)}.session-lbl{font-size:11px;color:#64748b;text-align:center}.presets{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.preset{padding:7px 16px;border-radius:20px;border:1px solid rgba(139,92,246,.2);background:rgba(139,92,246,.06);color:#a78bfa;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.preset:hover,.preset.active{background:rgba(139,92,246,.2);border-color:rgba(139,92,246,.4)}.controls{display:flex;gap:10px}.btn{padding:11px 26px;border-radius:12px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}.start-btn{background:linear-gradient(135deg,#8b5cf6,#3b82f6);color:#fff}.reset-btn{background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1)}.cycles{font-size:12px;color:#64748b;text-align:center}</style></head><body>
<div class="title">🧘 Meditation Timer</div>
<div class="session-timer" id="session-time">10:00</div>
<div class="session-lbl">Session Duration</div>
<div class="presets" id="presets">
  <button class="preset active" onclick="setSession(5,this)">5 min</button>
  <button class="preset" onclick="setSession(10,this)">10 min</button>
  <button class="preset" onclick="setSession(15,this)">15 min</button>
  <button class="preset" onclick="setSession(20,this)">20 min</button>
</div>
<div class="breath-circle" id="bc">
  <div class="breath-label" id="breath-phase">INHALE</div>
  <div class="breath-count" id="breath-count">4</div>
</div>
<div class="instruction" id="instr">Press Start to begin your session</div>
<div class="cycles" id="cycles-done">Breath cycles: 0</div>
<div class="controls">
  <button class="btn start-btn" id="start-btn" onclick="toggle()">▶ Begin</button>
  <button class="btn reset-btn" onclick="reset()">↺ Reset</button>
</div>
<script>
let sessionSec=600,curSec=600,running=false,mainInt=null,breathInt=null,breathPhase='inhale',breathCount=4,cycleDone=0;
const phases={inhale:{dur:4,next:'hold',lbl:'INHALE',instr:'Breathe in slowly...'},hold:{dur:4,next:'exhale',lbl:'HOLD',instr:'Hold your breath...'},exhale:{dur:6,next:'pause',lbl:'EXHALE',instr:'Breathe out gently...'},pause:{dur:2,next:'inhale',lbl:'PAUSE',instr:'Relax...'}};
function setSession(min,el){sessionSec=min*60;curSec=sessionSec;document.querySelectorAll('.preset').forEach(b=>b.classList.remove('active'));el.classList.add('active');updateSessionDisplay();reset();}
function updateSessionDisplay(){const m=Math.floor(curSec/60),s=curSec%60;document.getElementById('session-time').textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;}
function toggle(){
  if(running){clearInterval(mainInt);clearInterval(breathInt);running=false;document.getElementById('start-btn').textContent='▶ Resume';document.getElementById('bc').className='breath-circle';document.getElementById('instr').textContent='Session paused';}
  else{running=true;document.getElementById('start-btn').textContent='⏸ Pause';startBreath();mainInt=setInterval(()=>{curSec--;updateSessionDisplay();if(curSec<=0){clearInterval(mainInt);clearInterval(breathInt);running=false;document.getElementById('start-btn').textContent='▶ Begin';document.getElementById('instr').textContent='🎉 Session complete!';document.getElementById('bc').className='breath-circle';}},1000);}
}
function startBreath(){breathPhase='inhale';breathCount=phases.inhale.dur;doBreath();}
function doBreath(){const ph=phases[breathPhase];document.getElementById('breath-phase').textContent=ph.lbl;document.getElementById('instr').textContent=ph.instr;document.getElementById('bc').className='breath-circle '+(breathPhase==='inhale'||breathPhase==='hold'?'inhale':'exhale');if(breathPhase==='inhale')cycleDone++;document.getElementById('cycles-done').textContent='Breath cycles: '+cycleDone;breathCount=ph.dur;document.getElementById('breath-count').textContent=breathCount;clearInterval(breathInt);breathInt=setInterval(()=>{breathCount--;document.getElementById('breath-count').textContent=breathCount;if(breathCount<=0){clearInterval(breathInt);breathPhase=ph.next;doBreath();}},1000);}
function reset(){clearInterval(mainInt);clearInterval(breathInt);running=false;curSec=sessionSec;cycleDone=0;document.getElementById('start-btn').textContent='▶ Begin';document.getElementById('bc').className='breath-circle';document.getElementById('breath-phase').textContent='INHALE';document.getElementById('breath-count').textContent='4';document.getElementById('instr').textContent='Press Start to begin your session';document.getElementById('cycles-done').textContent='Breath cycles: 0';updateSessionDisplay();}
setSession(10,document.querySelector('.preset'));
</script></body></html>`},

];
if(window.APPS_DATA)window.APPS_DATA=window.APPS_DATA.concat(APPS_DATA_3);
