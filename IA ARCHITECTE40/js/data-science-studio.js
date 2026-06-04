(function(){
'use strict';
const TX={en:{title:'DATA SCIENCE & ML STUDIO',sub:'Visualization, ML Tools & Analytics',back:'<- Back',injected:'Injected!',tools:{
  dataset:{name:'Dataset Visualizer',desc:'Upload a CSV and get instant histogram, scatter plot and heatmap charts.',injectBtn:'Generate Dataset Visualizer'},
  modelcard:{name:'ML Model Card Generator',desc:'Create professional model documentation cards for AI/ML projects.',injectBtn:'Generate Model Card'},
  features:{name:'Feature Engineering UI',desc:'Visual normalization, encoding, train/test split and feature analysis.',injectBtn:'Generate Feature UI'},
  confusion:{name:'Confusion Matrix Builder',desc:'Visualize classification metrics: accuracy, precision, recall, F1.',injectBtn:'Generate Confusion Matrix'},
  pytojs:{name:'Python to JS Converter',desc:'Transpile NumPy/Pandas patterns to equivalent JavaScript code.',injectBtn:'Convert Python to JS'}
}},fr:{title:'STUDIO DATA SCIENCE & ML',sub:'Visualisation, Outils ML & Analytique',back:'<- Retour',injected:'Injecte!',tools:{
  dataset:{name:'Visualiseur Dataset',desc:'Importez un CSV et obtenez histogramme, nuage de points et heatmap.',injectBtn:'Generer Visualiseur Dataset'},
  modelcard:{name:'Generateur Carte Modele ML',desc:'Creez des fiches de documentation professionnelles pour vos modeles AI.',injectBtn:'Generer Carte Modele'},
  features:{name:'UI Ingenierie Features',desc:'Normalisation, encodage, split train/test et analyse des features.',injectBtn:'Generer UI Features'},
  confusion:{name:'Constructeur Matrice Confusion',desc:'Visualisez les metriques: accuracy, precision, rappel, F1.',injectBtn:'Generer Matrice Confusion'},
  pytojs:{name:'Convertisseur Python vers JS',desc:'Transpiler les patterns NumPy/Pandas en code JavaScript equivalent.',injectBtn:'Convertir Python en JS'}
}}};
function gl(){return window.appLang||'en';}
window._injectDSCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){if(tab==='datasciencestudio'){window.activeTab='datasciencestudio';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-datasciencestudio');if(b)b.classList.add('active');window.initDSStudio(gl());return;}if(typeof _o==='function')_o(tab);};
window.initDSStudio=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'dataset',icon:'📈',color:'#3b82f6'},{id:'modelcard',icon:'🤖',color:'#8b5cf6'},{id:'features',icon:'⚙️',color:'#f59e0b'},{id:'confusion',icon:'🔲',color:'#10b981'},{id:'pytojs',icon:'🐍',color:'#f97316'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(37,99,235,0.1));border-radius:14px;padding:16px;border:1px solid rgba(59,130,246,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #3b82f6);">📊</span><div><h2 style="margin:0;color:#93c5fd;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleDSTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleDSTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={dataset:'#3b82f6',modelcard:'#8b5cf6',features:'#f59e0b',confusion:'#10b981',pytojs:'#f97316'};
  const icons={dataset:'📈',modelcard:'🤖',features:'⚙️',confusion:'🔲',pytojs:'🐍'};
  const codeMap={dataset:getDatasetCode(),modelcard:getModelCardCode(),features:getFeaturesCode(),confusion:getConfusionCode(),pytojs:getPyToJsCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initDSStudio(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInjectDS'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#fff;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInjectDS'+toolId).addEventListener('click',()=>window._injectDSCode(codeMap[toolId]));
};
function getDatasetCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Dataset Visualizer</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px}h1{color:#3b82f6;margin-bottom:15px}.upload-zone{border:2px dashed #3b82f6;border-radius:12px;padding:30px;text-align:center;cursor:pointer;margin-bottom:20px;background:#1e293b;transition:0.2s}.upload-zone:hover{background:#1e3a5f}.upload-zone input{display:none}.charts{display:grid;grid-template-columns:1fr 1fr;gap:15px}.chart-box{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:15px}.chart-title{color:#3b82f6;font-size:13px;font-weight:700;margin-bottom:10px}.stats-row{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}.stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 15px;flex:1;min-width:120px;text-align:center}.stat-val{color:#3b82f6;font-size:20px;font-weight:900;display:block}.stat-lbl{color:#64748b;font-size:11px}</style></head>
<body>
<h1>📈 Dataset Visualizer</h1>
<div class="upload-zone" onclick="document.getElementById('csv').click()">
  <input type="file" id="csv" accept=".csv" onchange="loadCSV(event)">
  <div style="font-size:40px;margin-bottom:10px">📂</div>
  <div style="color:#3b82f6;font-weight:bold">Click to upload CSV</div>
  <div style="color:#64748b;font-size:12px;margin-top:5px">Or we will use demo data below</div>
  <button onclick="event.stopPropagation();loadDemo()" style="margin-top:10px;background:#3b82f6;border:none;color:#fff;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold">Load Demo Data</button>
</div>
<div class="stats-row" id="statsRow"></div>
<div class="charts" id="charts"></div>
<script>
const DEMO=[{name:'Alice',age:28,salary:65000,score:87,dept:'Eng'},{name:'Bob',age:34,salary:80000,score:92,dept:'Sales'},{name:'Carol',age:25,salary:55000,score:78,dept:'HR'},{name:'Dave',age:41,salary:95000,score:96,dept:'Eng'},{name:'Eve',age:29,salary:70000,score:85,dept:'Sales'},{name:'Frank',age:38,salary:88000,score:91,dept:'Eng'},{name:'Grace',age:27,salary:62000,score:82,dept:'HR'},{name:'Hank',age:45,salary:105000,score:98,dept:'Eng'},{name:'Iris',age:31,salary:72000,score:88,dept:'Sales'},{name:'Jack',age:33,salary:78000,score:90,dept:'HR'}];
function loadDemo(){renderData(DEMO);}
function loadCSV(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const lines=ev.target.result.trim().split('\n');
    const headers=lines[0].split(',').map(h=>h.trim());
    const data=lines.slice(1).map(line=>{const vals=line.split(',');const obj={};headers.forEach((h,i)=>obj[h]=isNaN(vals[i])?vals[i]:+vals[i]);return obj;});
    renderData(data);
  };reader.readAsText(file);
}
function renderData(data){
  const keys=Object.keys(data[0]);
  const numKeys=keys.filter(k=>typeof data[0][k]==='number');
  const catKeys=keys.filter(k=>typeof data[0][k]==='string');
  const statsRow=document.getElementById('statsRow');
  statsRow.innerHTML='<div class="stat"><span class="stat-val">'+data.length+'</span><span class="stat-lbl">Rows</span></div>'+'<div class="stat"><span class="stat-val">'+keys.length+'</span><span class="stat-lbl">Columns</span></div>'+(numKeys.length?'<div class="stat"><span class="stat-val">'+numKeys.length+'</span><span class="stat-lbl">Numeric</span></div>':'')+(catKeys.length?'<div class="stat"><span class="stat-val">'+catKeys.length+'</span><span class="stat-lbl">Categorical</span></div>':'');
  const charts=document.getElementById('charts');charts.innerHTML='';
  const COLORS=['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];
  if(numKeys.length>=1){
    const k=numKeys[0];const vals=data.map(d=>d[k]);
    const min=Math.min(...vals),max=Math.max(...vals),bins=8,bw=(max-min)/bins;
    const hist=Array(bins).fill(0);vals.forEach(v=>{const i=Math.min(Math.floor((v-min)/bw),bins-1);hist[i]++;});
    const box=document.createElement('div');box.className='chart-box';
    box.innerHTML='<div class="chart-title">Histogram — '+k+'</div><canvas id="ch1"></canvas>';charts.appendChild(box);
    new Chart(document.getElementById('ch1'),{type:'bar',data:{labels:hist.map((_,i)=>(min+i*bw).toFixed(0)),datasets:[{data:hist,backgroundColor:COLORS[0]+'99',borderColor:COLORS[0],borderWidth:1}]},options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#94a3b8'},grid:{color:'#1e293b'}},y:{ticks:{color:'#94a3b8'},grid:{color:'#334155'}}}}});
  }
  if(numKeys.length>=2){
    const kx=numKeys[0],ky=numKeys[1];
    const box=document.createElement('div');box.className='chart-box';
    box.innerHTML='<div class="chart-title">Scatter — '+kx+' vs '+ky+'</div><canvas id="ch2"></canvas>';charts.appendChild(box);
    new Chart(document.getElementById('ch2'),{type:'scatter',data:{datasets:[{data:data.map(d=>({x:d[kx],y:d[ky]})),backgroundColor:COLORS[1]+'cc',pointRadius:6}]},options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#94a3b8'},grid:{color:'#1e293b'}},y:{ticks:{color:'#94a3b8'},grid:{color:'#334155'}}}}});
  }
  if(catKeys.length>=1){
    const k=catKeys[0];const counts={};data.forEach(d=>{counts[d[k]]=(counts[d[k]]||0)+1;});
    const box=document.createElement('div');box.className='chart-box';
    box.innerHTML='<div class="chart-title">Distribution — '+k+'</div><canvas id="ch3"></canvas>';charts.appendChild(box);
    new Chart(document.getElementById('ch3'),{type:'doughnut',data:{labels:Object.keys(counts),datasets:[{data:Object.values(counts),backgroundColor:COLORS.map(c=>c+'cc')}]},options:{plugins:{legend:{labels:{color:'#cbd5e1',font:{size:11}}}}}});
  }
  if(numKeys.length>=3){
    const box=document.createElement('div');box.className='chart-box';
    box.innerHTML='<div class="chart-title">Radar — Feature Comparison</div><canvas id="ch4"></canvas>';charts.appendChild(box);
    const avg=numKeys.slice(0,5).map(k=>{const vals=data.map(d=>d[k]);const max=Math.max(...vals);return vals.reduce((a,b)=>a+b,0)/vals.length/max*100;});
    new Chart(document.getElementById('ch4'),{type:'radar',data:{labels:numKeys.slice(0,5),datasets:[{data:avg,backgroundColor:COLORS[4]+'44',borderColor:COLORS[4],pointBackgroundColor:COLORS[4]}]},options:{scales:{r:{ticks:{color:'#94a3b8'},grid:{color:'#334155'},angleLines:{color:'#334155'},pointLabels:{color:'#94a3b8'}}},plugins:{legend:{display:false}}}});
  }
}
loadDemo();
<\/script></body></html>`;}

function getModelCardCode(){
const metrics=[{n:'Accuracy',train:94.2,test:91.8,prod:90.5,c:'#3b82f6'},{n:'Precision',train:93.1,test:90.4,prod:89.2,c:'#8b5cf6'},{n:'Recall',train:95.0,test:92.1,prod:91.8,c:'#10b981'},{n:'F1 Score',train:94.0,test:91.2,prod:90.5,c:'#f59e0b'},{n:'AUC-ROC',train:98.2,test:96.5,prod:95.8,c:'#ec4899'}];
const feats=[{n:'days_since_last_login',v:0.187},{n:'monthly_spend_avg',v:0.154},{n:'support_tickets_30d',v:0.132},{n:'plan_tier',v:0.118},{n:'session_frequency',v:0.097}];
return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ML Model Card</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:0;overflow-x:hidden}.header{background:linear-gradient(135deg,#1e1b4b,#312e81);padding:24px 28px;border-bottom:1px solid #4338ca33}.header h1{font-size:22px;font-weight:900;color:#a5b4fc;margin-bottom:4px}.header p{color:#6366f1;font-size:12px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px}.full{grid-column:1/-1}.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:18px}.card h3{color:#8b5cf6;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:14px;display:flex;align-items:center;gap:7px}table{width:100%;border-collapse:collapse}td{padding:7px 10px;font-size:12px;border-bottom:1px solid #1e293b}td:first-child{color:#64748b;width:40%}td:last-child{color:#e2e8f0;font-weight:600}tr:last-child td{border-bottom:none}.badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700}.metric-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}.metric-name{color:#94a3b8;font-size:12px;width:90px;flex-shrink:0}.metric-bars{flex:1;display:flex;flex-direction:column;gap:3px}.mini-bar{height:6px;border-radius:3px;transition:width 0.8s}.metric-vals{display:flex;gap:8px}.mv{font-size:11px;font-weight:700}.feat-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}.feat-name{color:#94a3b8;font-size:11px;width:150px;flex-shrink:0}.feat-bar{flex:1;height:10px;background:#1e293b;border-radius:5px;overflow:hidden}.feat-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#c4b5fd);border-radius:5px}.feat-val{color:#c4b5fd;font-size:11px;font-weight:700;width:40px;text-align:right}.code-block{background:#020617;border:1px solid #4338ca33;border-radius:8px;padding:14px;font-family:Consolas,monospace;font-size:12px;color:#a5f3fc;margin-top:10px;line-height:1.6}.tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;margin-right:4px}.legend{display:flex;gap:12px;margin-bottom:10px}.leg-item{display:flex;align-items:center;gap:5px;font-size:10px;color:#94a3b8}.leg-dot{width:8px;height:8px;border-radius:50%}</style></head>'
+'<body>'
+'<div class="header"><h1>🤖 ML Model Card</h1><p>Generated by Data Science &amp; ML Studio · v1.0.0</p></div>'
+'<div class="grid">'
+'<div class="card"><h3>🔍 Model Details</h3><table>'
+'<tr><td>Model Name</td><td>My ML Model v1.0</td></tr>'
+'<tr><td>Type</td><td><span class="badge" style="background:#3b82f622;color:#60a5fa">Binary Classifier</span></td></tr>'
+'<tr><td>Architecture</td><td>Random Forest (100 est.)</td></tr>'
+'<tr><td>Framework</td><td>scikit-learn 1.4</td></tr>'
+'<tr><td>Version</td><td><span class="badge" style="background:#10b98122;color:#34d399">1.0.0</span></td></tr>'
+'<tr><td>Created</td><td>2025-01</td></tr>'
+'<tr><td>License</td><td>MIT</td></tr>'
+'</table></div>'
+'<div class="card"><h3>📊 Training Data</h3><table>'
+'<tr><td>Dataset</td><td>Internal company data</td></tr>'
+'<tr><td>Train Size</td><td>80,000 samples</td></tr>'
+'<tr><td>Test Size</td><td>20,000 samples</td></tr>'
+'<tr><td>Features</td><td>42 input features</td></tr>'
+'<tr><td>Target</td><td>Binary (0/1)</td></tr>'
+'<tr><td>Date Range</td><td>2023-01 → 2024-12</td></tr>'
+'<tr><td>Preprocessing</td><td>StandardScaler + SMOTE</td></tr>'
+'</table></div>'
+'<div class="card full"><h3>📈 Performance Metrics</h3><div class="legend"><div class="leg-item"><div class="leg-dot" style="background:#3b82f6"></div>Train</div><div class="leg-item"><div class="leg-dot" style="background:#8b5cf6"></div>Test</div><div class="leg-item"><div class="leg-dot" style="background:#10b981"></div>Production</div></div>'
+metrics.map(m=>'<div class="metric-row"><div class="metric-name">'+m.n+'</div><div class="metric-bars"><div class="mini-bar" style="width:'+m.train+'%;background:'+m.c+'88;max-width:100%"></div><div class="mini-bar" style="width:'+m.test+'%;background:'+m.c+'aa;max-width:100%"></div><div class="mini-bar" style="width:'+m.prod+'%;background:'+m.c+';max-width:100%"></div></div><div class="metric-vals"><span class="mv" style="color:#6b7280">'+m.train+'%</span><span class="mv" style="color:#94a3b8">'+m.test+'%</span><span class="mv" style="color:'+m.c+'">'+m.prod+'%</span></div></div>').join('')+'</div>'
+'<div class="card"><h3>⭐ Top Features</h3>'
+feats.map(f=>'<div class="feat-row"><div class="feat-name">'+f.n+'</div><div class="feat-bar"><div class="feat-fill" style="width:'+(f.v/0.2*100)+'%"></div></div><div class="feat-val">'+f.v+'</div></div>').join('')+'</div>'
+'<div class="card"><h3>⚖️ Bias &amp; Limitations</h3><table>'
+'<tr><td>Gender</td><td><span class="tag" style="background:#10b98122;color:#34d399">✓ OK</span>&lt;2% disparity</td></tr>'
+'<tr><td>Age 65+</td><td><span class="tag" style="background:#f59e0b22;color:#fbbf24">⚠ Minor</span>Slight under-perf.</td></tr>'
+'<tr><td>Geography</td><td><span class="tag" style="background:#10b98122;color:#34d399">✓ OK</span>Consistent</td></tr>'
+'<tr><td>Data staleness</td><td>Retrain every quarter</td></tr>'
+'<tr><td>Cold start</td><td>Users with &lt;30 days history</td></tr>'
+'</table></div>'
+'<div class="card full"><h3>🚀 Deployment Code</h3><div class="code-block">import pickle<br>model = pickle.load(open(<span style="color:#fbbf24">\'model_v1.pkl\'</span>, <span style="color:#fbbf24">\'rb\'</span>))<br>prediction = model.predict(X_new)<br>probability = model.predict_proba(X_new)[:, 1]</div></div>'
+'</div></body></html>';}

function getFeaturesCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Feature Engineering</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px}h1{color:#f59e0b;margin-bottom:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:18px}.card h3{color:#f59e0b;font-size:13px;font-weight:800;text-transform:uppercase;margin-bottom:15px;letter-spacing:1px}label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;margin-bottom:5px;margin-top:12px;text-transform:uppercase}select,input{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px 10px;border-radius:7px;font-size:13px;margin-bottom:5px}button{padding:10px 18px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px;width:100%;margin-top:10px}.run{background:#f59e0b;color:#000}.code-out{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:15px;font-family:monospace;font-size:12px;color:#10b981;margin-top:15px;white-space:pre-wrap;min-height:80px}.feat-bar{height:20px;background:#f59e0b33;border-radius:4px;margin-bottom:6px;position:relative;overflow:hidden}.feat-bar-fill{height:100%;background:#f59e0b;border-radius:4px;transition:0.5s}.feat-label{position:absolute;left:8px;top:2px;font-size:11px;color:#fff}</style></head>
<body>
<h1>⚙️ Feature Engineering UI</h1>
<div class="grid">
<div class="card">
  <h3>Preprocessing</h3>
  <label>Normalization</label>
  <select id="norm"><option value="minmax">Min-Max Scaler</option><option value="standard">Standard Scaler (Z-score)</option><option value="robust">Robust Scaler</option><option value="none">None</option></select>
  <label>Encoding</label>
  <select id="enc"><option value="onehot">One-Hot Encoding</option><option value="label">Label Encoding</option><option value="ordinal">Ordinal Encoding</option><option value="target">Target Encoding</option></select>
  <label>Missing Values</label>
  <select id="missing"><option value="mean">Fill with Mean</option><option value="median">Fill with Median</option><option value="drop">Drop Rows</option><option value="forward">Forward Fill</option></select>
  <label>Train / Test Split</label>
  <input type="range" id="split" min="60" max="90" value="80" oninput="document.getElementById('splitVal').textContent=this.value+'% train'">
  <div id="splitVal" style="color:#f59e0b;font-size:12px;margin-top:4px;">80% train</div>
  <button class="run" onclick="generateCode()">Generate Preprocessing Code</button>
</div>
<div class="card">
  <h3>Feature Importance (Demo)</h3>
  <div id="feats"></div>
  <h3 style="margin-top:20px">Correlation Heatmap</h3>
  <canvas id="heatmap" width="300" height="300"></canvas>
</div>
</div>
<div class="card" style="margin-top:15px">
  <h3>Generated Code</h3>
  <div class="code-out" id="codeOut">Click "Generate Preprocessing Code" to see the output...</div>
</div>
<script>
const feats=[{name:'monthly_spend',imp:0.87},{name:'days_inactive',imp:0.73},{name:'ticket_count',imp:0.64},{name:'plan_tier',imp:0.55},{name:'session_freq',imp:0.42}];
document.getElementById('feats').innerHTML=feats.map(f=>'<div style="margin-bottom:8px"><div style="color:#cbd5e1;font-size:12px;margin-bottom:3px;">'+f.name+' ('+Math.round(f.imp*100)+'%)</div><div class="feat-bar"><div class="feat-bar-fill" style="width:'+(f.imp*100)+'%"></div></div></div>').join('');
function drawHeatmap(){const c=document.getElementById('heatmap'),ctx=c.getContext('2d');const n=5,sz=c.width/n;const data=[[1,0.82,0.34,-0.21,0.67],[0.82,1,0.45,-0.18,0.71],[0.34,0.45,1,0.12,0.38],[-0.21,-0.18,0.12,1,-0.09],[0.67,0.71,0.38,-0.09,1]];const labels=['spend','inactive','tickets','plan','sessions'];data.forEach((row,r)=>{row.forEach((val,c)=>{const v=Math.abs(val);const h=val>0?'210':'0';ctx.fillStyle='hsl('+h+',80%,'+(20+v*50)+'%)';ctx.fillRect(c*sz,r*sz,sz-2,sz-2);ctx.fillStyle='#fff';ctx.font='10px monospace';ctx.textAlign='center';ctx.fillText(val.toFixed(2),c*sz+sz/2,r*sz+sz/2+4);});});labels.forEach((l,i)=>{ctx.fillStyle='#64748b';ctx.font='9px monospace';ctx.textAlign='center';ctx.fillText(l,i*sz+sz/2,c.height+12);});}
function generateCode(){const norm=document.getElementById('norm').value,enc=document.getElementById('enc').value,miss=document.getElementById('missing').value,split=document.getElementById('split').value;const normCode={minmax:'from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler()\nX_scaled = scaler.fit_transform(X_train)',standard:'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)',robust:'from sklearn.preprocessing import RobustScaler\nscaler = RobustScaler()\nX_scaled = scaler.fit_transform(X_train)',none:'# No scaling applied'};const encCode={onehot:'pd.get_dummies(df, columns=cat_cols)',label:'from sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ndf[col] = le.fit_transform(df[col])',ordinal:'from sklearn.preprocessing import OrdinalEncoder\noe = OrdinalEncoder()\ndf[cat_cols] = oe.fit_transform(df[cat_cols])',target:'# Target encoding (install category_encoders)\nimport category_encoders as ce\nte = ce.TargetEncoder(cols=cat_cols)\ndf_enc = te.fit_transform(df, y)'};const missCode={mean:'df.fillna(df.mean(), inplace=True)',median:'df.fillna(df.median(), inplace=True)',drop:'df.dropna(inplace=True)',forward:'df.fillna(method="ffill", inplace=True)'};document.getElementById('codeOut').textContent='import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n\n# Missing values\n'+missCode[miss]+'\n\n# Encoding\nX_enc = '+encCode[enc]+'\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size='+(100-split)/100+', random_state=42\n)\n\n# Normalization\n'+normCode[norm];}
drawHeatmap();
<\/script></body></html>`;}
function getConfusionCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Confusion Matrix</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#10b981;margin-bottom:20px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px}.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px}h3{color:#10b981;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px}label{display:block;color:#94a3b8;font-size:11px;margin-bottom:4px;margin-top:10px}input{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;font-size:14px}button{margin-top:15px;width:100%;padding:10px;background:#10b981;border:none;border-radius:8px;color:#000;font-weight:900;cursor:pointer;font-size:13px}.matrix{display:grid;grid-template-columns:auto 1fr 1fr;grid-template-rows:auto 1fr 1fr;gap:4px;margin-top:10px}.cell{display:flex;align-items:center;justify-content:center;padding:20px;border-radius:8px;font-size:22px;font-weight:900}.cell-label{display:flex;align-items:center;justify-content:center;color:#64748b;font-size:11px;font-weight:bold}.tp{background:#10b98133;color:#10b981}.tn{background:#10b98133;color:#10b981}.fp{background:#ef444433;color:#ef4444}.fn{background:#f59e0b33;color:#f59e0b}.metric{background:#0f172a;border-radius:8px;padding:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}.metric-name{color:#94a3b8;font-size:13px}.metric-val{font-size:18px;font-weight:900;color:#10b981}.bar{height:6px;background:#334155;border-radius:3px;margin-top:5px;flex:1;margin-left:15px}.bar-fill{height:100%;border-radius:3px;background:#10b981}</style></head>
<body>
<h1>🔲 Confusion Matrix Builder</h1>
<div class="grid2">
<div class="card">
  <h3>Input Values</h3>
  <label>True Positives (TP)</label><input type="number" id="tp" value="85">
  <label>False Positives (FP)</label><input type="number" id="fp" value="12">
  <label>False Negatives (FN)</label><input type="number" id="fn" value="8">
  <label>True Negatives (TN)</label><input type="number" id="tn" value="95">
  <button onclick="calculate()">Calculate Metrics</button>
</div>
<div class="card">
  <h3>Matrix</h3>
  <div class="matrix" id="matrix"></div>
</div>
</div>
<div class="card" style="margin-top:15px">
  <h3>Performance Metrics</h3>
  <div id="metrics"></div>
</div>
<script>
function calculate(){
  const tp=+document.getElementById('tp').value,fp=+document.getElementById('fp').value,fn=+document.getElementById('fn').value,tn=+document.getElementById('tn').value;
  const total=tp+fp+fn+tn;
  const acc=(tp+tn)/total,prec=tp/(tp+fp),rec=tp/(tp+fn),f1=2*prec*rec/(prec+rec),spec=tn/(tn+fp),auc=(rec+spec)/2;
  document.getElementById('matrix').innerHTML='<div class="cell-label"></div><div class="cell-label">Pred Pos</div><div class="cell-label">Pred Neg</div><div class="cell-label">Act Pos</div><div class="cell tp">'+tp+'</div><div class="cell fn">'+fn+'</div><div class="cell-label">Act Neg</div><div class="cell fp">'+fp+'</div><div class="cell tn">'+tn+'</div>';
  const metrics=[{n:'Accuracy',v:acc,c:'#3b82f6'},{n:'Precision',v:prec,c:'#8b5cf6'},{n:'Recall (Sensitivity)',v:rec,c:'#10b981'},{n:'F1 Score',v:f1,c:'#f59e0b'},{n:'Specificity',v:spec,c:'#ec4899'},{n:'AUC-ROC (est.)',v:auc,c:'#06b6d4'}];
  document.getElementById('metrics').innerHTML=metrics.map(m=>'<div class="metric"><div><div class="metric-name">'+m.n+'</div><div class="bar"><div class="bar-fill" style="width:'+(m.v*100).toFixed(1)+'%;background:'+m.c+'"></div></div></div><div class="metric-val" style="color:'+m.c+';">'+(m.v*100).toFixed(1)+'%</div></div>').join('');
}
calculate();
<\/script></body></html>`;}

function getPyToJsCode(){
const cats=[
  {id:'numpy',label:'NumPy',icon:'N',color:'#3b82f6',pairs:[
    {py:'np.array([1, 2, 3, 4, 5])',js:'const arr = [1, 2, 3, 4, 5];'},
    {py:'np.zeros((3, 4))',js:'const zeros = Array.from({length: 3}, () => new Array(4).fill(0));'},
    {py:'np.mean(arr)',js:'const mean = arr.reduce((a, b) => a + b, 0) / arr.length;'},
    {py:'np.std(arr)',js:'const std = Math.sqrt(arr.map(x => (x-mean)**2).reduce((a,b)=>a+b,0)/arr.length);'},
    {py:'np.linspace(0, 1, 100)',js:'const linspace = (s,e,n) => Array.from({length:n},(_,i)=>s+(e-s)*i/(n-1));'},
    {py:'np.argmax(arr)',js:'const argmax = arr => arr.indexOf(Math.max(...arr));'},
    {py:'np.clip(arr, 0, 1)',js:'const clip = (a,mn,mx) => a.map(v => Math.min(Math.max(v,mn),mx));'}
  ]},
  {id:'pandas',label:'Pandas',icon:'P',color:'#10b981',pairs:[
    {py:'df.head(5)',js:'const head = (data, n=5) => data.slice(0, n);'},
    {py:'df.dropna()',js:'const dropna = data => data.filter(row => Object.values(row).every(v => v!=null && !isNaN(v)));'},
    {py:'df.fillna(df.mean())',js:'const avg=vals.reduce((a,b)=>a+b,0)/vals.length;\nconst filled = data.map(r => ({...r, [col]: r[col]??avg}));'},
    {py:"df.sort_values('col', ascending=False)",js:'const sorted = [...data].sort((a,b) => b[col]-a[col]);'},
    {py:"df.groupby('col').agg({'val':'mean'})",js:"const grouped = data.reduce((acc,r)=>{ (acc[r[key]]??=[]).push(r[val]); return acc; }, {});"},
    {py:'df.shape',js:'const shape = [data.length, Object.keys(data[0]).length];'}
  ]},
  {id:'sklearn',label:'Sklearn',icon:'S',color:'#8b5cf6',pairs:[
    {py:'train_test_split(X, y, test_size=0.2)',js:'function splitData(X,y,t=0.2){const idx=[...Array(X.length).keys()].sort(()=>Math.random()-0.5);const n=Math.floor(X.length*t);return{X_test:idx.slice(0,n).map(i=>X[i]),X_train:idx.slice(n).map(i=>X[i])}}'},
    {py:'MinMaxScaler().fit_transform(X)',js:'const mn=Math.min(...data),mx=Math.max(...data);\nconst scaled = data.map(v => (v-mn)/(mx-mn));'},
    {py:'StandardScaler().fit_transform(X)',js:'const m=data.reduce((a,b)=>a+b)/data.length;\nconst s=Math.sqrt(data.map(v=>(v-m)**2).reduce((a,b)=>a+b)/data.length);\nconst scaled = data.map(v=>(v-m)/s);'},
    {py:'accuracy_score(y_true, y_pred)',js:'const accuracy = (yt,yp) => yt.filter((v,i)=>v===yp[i]).length/yt.length;'},
    {py:'confusion_matrix(y_true, y_pred)',js:'function confMatrix(yt,yp){const m=[[0,0],[0,0]];yt.forEach((v,i)=>m[v][yp[i]]++);return m;}'}
  ]}
];
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Python to JS</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}.hdr{background:linear-gradient(135deg,#052e16,#0f172a);padding:14px 20px;border-bottom:1px solid #16a34a33;display:flex;align-items:center;gap:10px;flex-shrink:0}.hdr h1{color:#4ade80;font-size:16px;font-weight:900}.tabs{display:flex;background:#020617;border-bottom:1px solid #1e293b;flex-shrink:0}.tab{padding:10px 18px;cursor:pointer;font-size:12px;font-weight:700;color:#64748b;border-bottom:2px solid transparent;transition:0.2s}.tab.active{color:var(--c);border-bottom-color:var(--c)}.list{flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;gap:10px}.pair{background:#1e293b;border:1px solid #334155;border-radius:10px;overflow:hidden}.pair-hdr{padding:7px 14px;background:#0f172a;border-bottom:1px solid #334155;display:flex;align-items:center;gap:8px;font-size:11px}.cols{display:grid;grid-template-columns:1fr 1fr}.col{padding:12px 14px;font-family:Consolas,monospace;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all;border-right:1px solid #334155}.col:last-child{border-right:none}.lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}.cp{margin-left:auto;background:transparent;border:1px solid #334155;color:#64748b;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:10px;font-weight:700}.cp:hover{border-color:#94a3b8;color:#fff}</style></head><body>'
+'<div class="hdr"><h1>🐍 Python → JavaScript</h1><span style="color:#64748b;font-size:11px">NumPy · Pandas · Scikit-learn</span></div>'
+'<div class="tabs">'+cats.map((c,i)=>'<div class="tab'+(i===0?' active':'')+'" style="--c:'+c.color+'" onclick="show('+i+',this)">'+c.icon+' '+c.label+'</div>').join('')+'</div>'
+'<div class="list" id="L"></div>'
+'<script>const D='+JSON.stringify(cats.map(c=>({...c,pairs:c.pairs})))+';let cur=0;'
+'function show(i,el){cur=i;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));el.classList.add("active");render();}'
+'function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}'
+'function cp(e,t){e.stopPropagation();navigator.clipboard.writeText(t).then(()=>{const b=e.target;b.textContent="OK";setTimeout(()=>b.textContent="Copy JS",1500)});}'
+'function render(){const c=D[cur];document.getElementById("L").innerHTML=c.pairs.map((p,i)=>\'<div class="pair"><div class="pair-hdr"><span style="color:\'+c.color+\';font-weight:800">\'+c.label+\' Snippet #\'+(i+1)+\'</span><button class="cp" data-code="\'+encodeURIComponent(p.js)+\'" onclick="cp(event,decodeURIComponent(this.dataset.code))" >Copy JS</button></div><div class="cols"><div class="col"><div class="lbl" style="color:#f97316">Python</div><span style="color:#fbbf24">\'+esc(p.py)+\'</span></div><div class="col"><div class="lbl" style="color:#60a5fa">JavaScript</div><span style="color:#7dd3fc">\'+esc(p.js)+\'</span></div></div></div>\').join("");}'
+'show(0,document.querySelector(".tab"));<\/script></body></html>';}
const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-datasciencestudio');if(l)l.textContent=gl()==='fr'?'Studio Data Science':'Data Science Studio';if(window.activeTab==='datasciencestudio')window.initDSStudio(gl());};
console.log('Data Science Studio loaded!');
})();
