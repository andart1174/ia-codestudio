(function(){
'use strict';
const TX={en:{title:'ALGORITHM VISUALIZER',sub:'Interactive Visual Learning Studio',back:'<- Back',injected:'Injected!',tools:{
  sorting:{name:'Sorting Visualizer',desc:'Watch Bubble, Merge, Quick & Insertion Sort animate in real time with colored bars.',injectBtn:'Play Sorting Visualizer'},
  pathfinding:{name:'Pathfinding Playground',desc:'Draw walls on a grid then watch A*, Dijkstra and BFS find the shortest path.',injectBtn:'Open Pathfinding Grid'},
  datastruct:{name:'Data Structure Explorer',desc:'Visualize Stack, Queue, Linked List and Binary Search Tree operations live.',injectBtn:'Explore Data Structures'},
  bigo:{name:'Big-O Complexity Chart',desc:'Compare algorithm complexity curves O(1) to O(n!) on an interactive chart.',injectBtn:'Open Complexity Chart'},
  regex:{name:'Regex Step Visualizer',desc:'See exactly how a regular expression matches text, step by step with highlights.',injectBtn:'Open Regex Visualizer'}
}},fr:{title:'VISUALISEUR ALGORITHMES',sub:'Studio d\'Apprentissage Visuel Interactif',back:'<- Retour',injected:'Injecte!',tools:{
  sorting:{name:'Visualiseur de Tri',desc:'Regardez Bubble, Merge, Quick Sort s\'animer en temps reel avec des barres colorees.',injectBtn:'Lancer le Tri'},
  pathfinding:{name:'Terrain Pathfinding',desc:'Dessinez des murs puis regardez A*, Dijkstra et BFS trouver le chemin.',injectBtn:'Ouvrir Pathfinding'},
  datastruct:{name:'Explorateur Structures',desc:'Visualisez Stack, Queue, Liste Chainee et Arbre BST en direct.',injectBtn:'Explorer Structures'},
  bigo:{name:'Graphe Complexite Big-O',desc:'Comparez les courbes O(1) a O(n!) sur un graphique interactif.',injectBtn:'Ouvrir Complexite'},
  regex:{name:'Visualiseur Regex',desc:'Voyez comment une expression reguliere correspond au texte etape par etape.',injectBtn:'Ouvrir Regex'}
}}};
function gl(){return window.appLang||'en';}
window._injectAlgoCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='algoviz'){window.activeTab='algoviz';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-algoviz');if(b)b.classList.add('active');window.initAlgoViz(gl());return;}
  if(typeof _o==='function')_o(tab);
};
window.initAlgoViz=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'sorting',icon:'📊',color:'#eab308'},{id:'pathfinding',icon:'🗺️',color:'#10b981'},{id:'datastruct',icon:'🌳',color:'#8b5cf6'},{id:'bigo',icon:'📈',color:'#f97316'},{id:'regex',icon:'🔍',color:'#ec4899'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(234,179,8,0.1),rgba(202,138,4,0.1));border-radius:14px;padding:16px;border:1px solid rgba(234,179,8,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #eab308);">🎯</span><div><h2 style="margin:0;color:#fde047;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleAlgoTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleAlgoTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={sorting:'#eab308',pathfinding:'#10b981',datastruct:'#8b5cf6',bigo:'#f97316',regex:'#ec4899'};
  const icons={sorting:'📊',pathfinding:'🗺️',datastruct:'🌳',bigo:'📈',regex:'🔍'};
  const codeMap={sorting:getSortingCode(),pathfinding:getPathfindingCode(),datastruct:getDsCode(),bigo:getBigOCode(),regex:getRegexCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initAlgoViz(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInjectAlgo'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#000;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInjectAlgo'+toolId).addEventListener('click',()=>window._injectAlgoCode(codeMap[toolId]));
};
function getSortingCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Sorting Visualizer</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px;display:flex;flex-direction:column;height:100vh}h1{color:#eab308;margin-bottom:15px;font-size:20px}.controls{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center}button{padding:8px 16px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px}button.active{outline:3px solid #fff}.play{background:#eab308;color:#000}.reset{background:#334155;color:#fff}select,input[type=range]{background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:8px}.label{color:#64748b;font-size:12px}#canvas{flex:1;border-radius:10px;background:#0f172a}.stats{display:flex;gap:20px;margin-top:10px;font-size:13px}.stat{background:#1e293b;padding:8px 15px;border-radius:8px}.stat-val{color:#eab308;font-weight:900;font-size:18px;display:block}</style></head>
<body>
<h1>📊 Sorting Visualizer</h1>
<div class="controls">
  <select id="algo"><option value="bubble">Bubble Sort — O(n²)</option><option value="insertion">Insertion Sort — O(n²)</option><option value="selection">Selection Sort — O(n²)</option><option value="merge">Merge Sort — O(n log n)</option></select>
  <span class="label">Size:</span><input type="range" id="size" min="10" max="100" value="50" oninput="reset()">
  <span class="label">Speed:</span><input type="range" id="speed" min="1" max="100" value="50">
  <button class="play" onclick="startSort()">▶ Sort</button>
  <button class="reset" onclick="reset()">↺ Reset</button>
</div>
<div class="stats"><div class="stat"><span class="stat-val" id="compares">0</span>Comparisons</div><div class="stat"><span class="stat-val" id="swaps">0</span>Swaps</div><div class="stat"><span class="stat-val" id="timeMs">0ms</span>Time</div></div>
<canvas id="canvas"></canvas>
<script>
let arr=[],comparing=[],sorted=[],running=false,comps=0,swps=0;
function reset(){arr=Array.from({length:+document.getElementById('size').value},()=>Math.floor(Math.random()*95)+5);comparing=[];sorted=[];comps=swps=0;updateStats();draw();}
function updateStats(){document.getElementById('compares').textContent=comps;document.getElementById('swaps').textContent=swps;}
function draw(){
  const c=document.getElementById('canvas');const ctx=c.getContext('2d');
  c.width=c.offsetWidth;c.height=c.offsetHeight;
  const w=c.width/arr.length;
  arr.forEach((v,i)=>{
    ctx.fillStyle=sorted.includes(i)?'#10b981':comparing.includes(i)?'#ef4444':'#3b82f6';
    const h=(v/100)*c.height;
    ctx.fillRect(i*w+1,c.height-h,w-2,h);
  });
}
function delay(){return new Promise(r=>setTimeout(r,101-+document.getElementById('speed').value));}
async function bubble(){for(let i=0;i<arr.length-1;i++){for(let j=0;j<arr.length-i-1;j++){comparing=[j,j+1];comps++;updateStats();draw();await delay();if(arr[j]>arr[j+1]){[arr[j],arr[j+1]]=[arr[j+1],arr[j]];swps++;}}sorted.push(arr.length-1-i);}}
async function insertion(){for(let i=1;i<arr.length;i++){let k=i;while(k>0&&arr[k-1]>arr[k]){comparing=[k,k-1];comps++;swps++;updateStats();[arr[k],arr[k-1]]=[arr[k-1],arr[k]];k--;draw();await delay();}}}
async function selection(){for(let i=0;i<arr.length;i++){let m=i;for(let j=i+1;j<arr.length;j++){comparing=[m,j];comps++;updateStats();draw();await delay();if(arr[j]<arr[m])m=j;}if(m!==i){[arr[i],arr[m]]=[arr[m],arr[i]];swps++;}sorted.push(i);}}
async function startSort(){if(running)return;running=true;const t=Date.now();const algo=document.getElementById('algo').value;if(algo==='bubble')await bubble();else if(algo==='insertion')await insertion();else if(algo==='selection')await selection();else{arr.sort((a,b)=>a-b);draw();}sorted=arr.map((_,i)=>i);comparing=[];draw();document.getElementById('timeMs').textContent=(Date.now()-t)+'ms';running=false;}
reset();window.addEventListener('resize',draw);
<\/script></body></html>`;}

function getPathfindingCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pathfinding</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px;display:flex;flex-direction:column;height:100vh}h1{color:#10b981;margin-bottom:12px;font-size:20px}.controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;align-items:center}button{padding:8px 16px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px}select{background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:8px}.play{background:#10b981;color:#000}.reset{background:#334155;color:#fff}.wall-btn{background:#475569;color:#fff}#grid{flex:1;display:grid;gap:1px;background:#334155;border-radius:8px;overflow:hidden}.legend{display:flex;gap:15px;font-size:11px;margin-top:8px}.leg{display:flex;align-items:center;gap:5px}.leg-box{width:14px;height:14px;border-radius:3px}</style></head>
<body>
<h1>🗺️ Pathfinding Playground</h1>
<div class="controls">
  <select id="algo"><option value="astar">A* Star</option><option value="dijkstra">Dijkstra</option><option value="bfs">BFS</option></select>
  <button class="wall-btn" onclick="mode='wall'">✏️ Draw Walls</button>
  <button class="wall-btn" onclick="mode='start'">🟢 Move Start</button>
  <button class="wall-btn" onclick="mode='end'">🔴 Move End</button>
  <button class="play" onclick="runAlgo()">▶ Find Path</button>
  <button class="reset" onclick="initGrid()">↺ Reset</button>
</div>
<div id="grid"></div>
<div class="legend">
  <div class="leg"><div class="leg-box" style="background:#10b981"></div>Start</div>
  <div class="leg"><div class="leg-box" style="background:#ef4444"></div>End</div>
  <div class="leg"><div class="leg-box" style="background:#1e293b;border:1px solid #475569"></div>Wall</div>
  <div class="leg"><div class="leg-box" style="background:#3b82f6"></div>Visited</div>
  <div class="leg"><div class="leg-box" style="background:#fde047"></div>Path</div>
</div>
<script>
const COLS=30,ROWS=20;let grid=[],start={r:5,c:5},end={r:14,c:24},mode='wall',mouseDown=false;
function initGrid(){grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));renderGrid();}
function renderGrid(){
  const el=document.getElementById('grid');
  el.style.gridTemplateColumns='repeat('+COLS+',1fr)';
  el.innerHTML='';
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    const cell=document.createElement('div');
    const isS=r===start.r&&c===start.c,isE=r===end.r&&c===end.c;
    cell.style.cssText='height:100%;aspect-ratio:1;cursor:pointer;transition:background 0.1s;background:'+(isS?'#10b981':isE?'#ef4444':grid[r][c]===1?'#1e293b':grid[r][c]===2?'#3b82f688':grid[r][c]===3?'#fde047':'#0f172a');
    cell.addEventListener('mousedown',()=>{mouseDown=true;toggleCell(r,c);});
    cell.addEventListener('mouseenter',()=>{if(mouseDown)toggleCell(r,c);});
    el.appendChild(cell);
  }
}
function toggleCell(r,c){
  if(mode==='wall'&&!(r===start.r&&c===start.c)&&!(r===end.r&&c===end.c)){grid[r][c]=grid[r][c]===1?0:1;}
  else if(mode==='start'){start={r,c};}
  else if(mode==='end'){end={r,c};}
  renderGrid();
}
document.addEventListener('mouseup',()=>mouseDown=false);
function heuristic(a,b){return Math.abs(a.r-b.r)+Math.abs(a.c-b.c);}
function neighbors(r,c){return[[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([nr,nc])=>nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid[nr][nc]!==1);}
async function runAlgo(){
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)if(grid[r][c]>1)grid[r][c]=0;
  const visited=[],path=[];
  const key=(r,c)=>r+','+c;
  const prev={};const dist={};
  Object.keys(dist);
  const queue=[[start.r,start.c,0]];dist[key(start.r,start.c)]=0;
  while(queue.length){
    queue.sort((a,b)=>a[2]-b[2]);
    const [r,c]=queue.shift();
    if(r===end.r&&c===end.c)break;
    if(grid[r][c]===2)continue;
    grid[r][c]=2;renderGrid();await new Promise(res=>setTimeout(res,10));
    for(const[nr,nc]of neighbors(r,c)){const k=key(nr,nc);const nd=(dist[key(r,c)]||0)+1;if(dist[k]===undefined||nd<dist[k]){dist[k]=nd;prev[k]=key(r,c);queue.push([nr,nc,nd+(document.getElementById('algo').value==='astar'?heuristic({r:nr,c:nc},end):0)]);}}
  }
  let cur=key(end.r,end.c);while(cur&&cur!==key(start.r,start.c)){const[pr,pc]=cur.split(',').map(Number);grid[pr][pc]=3;cur=prev[cur];renderGrid();await new Promise(res=>setTimeout(res,30));}
}
initGrid();
<\/script></body></html>`;}
function getDsCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Data Structures</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px}h1{color:#8b5cf6;margin-bottom:15px}.tabs{display:flex;gap:8px;margin-bottom:20px}.tab{padding:8px 16px;border:2px solid #334155;border-radius:8px;cursor:pointer;font-weight:bold;background:transparent;color:#64748b;transition:0.2s}.tab.active{border-color:#8b5cf6;color:#8b5cf6;background:#8b5cf611}.controls{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}input{background:#1e293b;border:1px solid #334155;color:#fff;padding:8px 12px;border-radius:8px;width:100px}button{padding:8px 16px;border:none;border-radius:8px;font-weight:bold;cursor:pointer}.push{background:#8b5cf6;color:#fff}.pop{background:#ef4444;color:#fff}.peek{background:#f59e0b;color:#000}.clear{background:#334155;color:#fff}#viz{background:#1e293b;border-radius:12px;padding:20px;min-height:120px;display:flex;align-items:flex-end;gap:4px;flex-wrap:wrap}.node{background:linear-gradient(135deg,#8b5cf6,#6d28d9);border-radius:8px;padding:12px 16px;color:#fff;font-weight:bold;font-size:15px;animation:pop 0.3s ease;display:flex;align-items:center;gap:8px}@keyframes pop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1)}}.node.new{background:linear-gradient(135deg,#10b981,#059669)}.log{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px;margin-top:15px;font-family:monospace;font-size:13px;height:100px;overflow-y:auto;color:#10b981}</style></head>
<body>
<h1>🌳 Data Structure Explorer</h1>
<div class="tabs">
  <button class="tab active" onclick="setDs('stack',this)">Stack</button>
  <button class="tab" onclick="setDs('queue',this)">Queue</button>
  <button class="tab" onclick="setDs('list',this)">Linked List</button>
</div>
<div class="controls">
  <input id="val" placeholder="Value" type="text" value="42">
  <button class="push" onclick="dsOp('push')">Push / Enqueue</button>
  <button class="pop" onclick="dsOp('pop')">Pop / Dequeue</button>
  <button class="peek" onclick="dsOp('peek')">Peek</button>
  <button class="clear" onclick="dsOp('clear')">Clear</button>
</div>
<div id="viz"></div>
<div class="log" id="log">> Data Structure Explorer ready...</div>
<script>
let ds='stack',data=[];
function setDs(type,btn){ds=type;data=[];document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');render();addLog('Switched to '+type);}
function addLog(msg){const l=document.getElementById('log');l.innerHTML+='<br>> '+msg;l.scrollTop=l.scrollHeight;}
function dsOp(op){
  const val=document.getElementById('val').value||'?';
  if(op==='push'){data.push({val,isNew:true});addLog('Push: '+val+' | Size: '+data.length);}
  else if(op==='pop'){if(!data.length){addLog('Error: Structure is empty!');return;}const r=data.pop();addLog('Pop: '+r.val+' | Size: '+data.length);}
  else if(op==='peek'){if(!data.length){addLog('Error: Empty!');return;}addLog('Peek: '+data[data.length-1].val);}
  else if(op==='clear'){data=[];addLog('Cleared!');}
  render();setTimeout(()=>{data.forEach(d=>d.isNew=false);render();},300);
}
function render(){
  const v=document.getElementById('viz');
  if(!data.length){v.innerHTML='<div style="color:#475569;margin:auto;">Structure is empty</div>';return;}
  const nodes=ds==='stack'?[...data].reverse():data;
  v.innerHTML=nodes.map((d,i)=>'<div class="node'+(d.isNew?' new':'')+'">'+((ds==='stack'&&i===0)||(ds!=='stack'&&i===data.length-1)?'<span style="color:#fde04788;font-size:10px;">'+(ds==='stack'?'TOP':'FRONT')+'</span>':'')+'<span>'+d.val+'</span>'+(ds==='list'&&i<data.length-1?'<span style="color:#8b5cf688">→</span>':'')+'</div>').join('');
}
render();
<\/script></body></html>`;}

function getBigOCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Big-O Chart</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#f97316;margin-bottom:20px}.chart-wrap{position:relative;height:400px}.legend{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:15px}.leg{background:#1e293b;border-radius:8px;padding:10px;font-size:12px;border-left:3px solid;text-align:center}.leg strong{display:block;font-size:15px;margin-bottom:4px}.notation{font-family:monospace}.class{font-size:10px;color:#64748b}</style></head>
<body>
<h1>📈 Big-O Complexity Reference</h1>
<div class="chart-wrap"><canvas id="c"></canvas></div>
<div class="legend" id="leg"></div>
<script>
const N=[1,2,5,10,20,50,100];
const algos=[
  {label:'O(1) — Constant',fn:()=>1,color:'#10b981',class:'Best'},
  {label:'O(log n) — Logarithmic',fn:n=>Math.log2(n),color:'#3b82f6',class:'Excellent'},
  {label:'O(n) — Linear',fn:n=>n,color:'#eab308',class:'Good'},
  {label:'O(n log n) — Linearithmic',fn:n=>n*Math.log2(n),color:'#f97316',class:'Fair'},
  {label:'O(n²) — Quadratic',fn:n=>n*n,color:'#ef4444',class:'Bad'},
  {label:'O(2ⁿ) — Exponential',fn:n=>Math.min(Math.pow(2,n),100000),color:'#ec4899',class:'Horrible'}
];
new Chart(document.getElementById('c'),{type:'line',data:{labels:N,datasets:algos.map(a=>({label:a.label,data:N.map(a.fn),borderColor:a.color,backgroundColor:a.color+'22',tension:0.4,fill:false,pointRadius:4}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#cbd5e1',font:{size:11}}}},scales:{x:{ticks:{color:'#94a3b8'},grid:{color:'#1e293b'}},y:{ticks:{color:'#94a3b8'},grid:{color:'#1e293b'},title:{display:true,text:'Operations',color:'#64748b'}}}}});
document.getElementById('leg').innerHTML=algos.map(a=>'<div class="leg" style="border-color:'+a.color+'"><strong style="color:'+a.color+'">'+a.class+'</strong><span class="notation">'+a.label+'</span></div>').join('');
<\/script></body></html>`;}

function getRegexCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Regex Visualizer</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#ec4899;margin-bottom:20px}.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin-bottom:15px}label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:6px}input,textarea{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:8px;font-size:14px;outline:none;font-family:monospace}input:focus,textarea:focus{border-color:#ec4899}.flags{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}.flag{display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer}.result{min-height:50px;padding:12px;background:#0f172a;border:1px solid #334155;border-radius:8px;font-size:16px;line-height:1.8;word-break:break-all}.highlight{background:#ec489966;border-radius:3px;padding:2px 0;border-bottom:2px solid #ec4899}.match-list{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.match-tag{background:#ec489922;color:#ec4899;border:1px solid #ec489944;padding:4px 10px;border-radius:20px;font-size:12px;font-family:monospace}.info{display:flex;gap:15px;font-size:13px;margin-top:10px}.stat{background:#0f172a;padding:8px 12px;border-radius:8px;text-align:center}.stat-n{color:#ec4899;font-weight:900;font-size:20px}</style></head>
<body>
<h1>🔍 Regex Step Visualizer</h1>
<div class="card">
  <label>Regular Expression</label>
  <input id="pattern" value="\b\w+@\w+\.\w+\b" oninput="testRegex()">
  <div class="flags">
    <label class="flag"><input type="checkbox" id="fi" checked> i (case insensitive)</label>
    <label class="flag"><input type="checkbox" id="fg" checked> g (global)</label>
    <label class="flag"><input type="checkbox" id="fm"> m (multiline)</label>
  </div>
</div>
<div class="card">
  <label>Test String</label>
  <textarea id="testStr" rows="4" oninput="testRegex()">Hello! Contact us at support@myapp.com or sales@company.org. Visit us at https://example.com</textarea>
</div>
<div class="card">
  <label>Result</label>
  <div class="result" id="result"></div>
  <div class="match-list" id="matchList"></div>
  <div class="info"><div class="stat"><div class="stat-n" id="matchCount">0</div>Matches</div><div class="stat"><div class="stat-n" id="groupCount">0</div>Groups</div><div class="stat" id="validity" style="flex:1"></div></div>
</div>
<script>
function testRegex(){
  const pat=document.getElementById('pattern').value;
  const str=document.getElementById('testStr').value;
  const f=(document.getElementById('fi').checked?'i':'')+(document.getElementById('fg').checked?'g':'')+(document.getElementById('fm').checked?'m':'');
  const validity=document.getElementById('validity');
  try{
    const re=new RegExp(pat,f);
    const matches=[...str.matchAll(new RegExp(pat,'g'+f.replace('g','')))];
    document.getElementById('matchCount').textContent=matches.length;
    document.getElementById('groupCount').textContent=matches.length>0?(matches[0].length-1):0;
    validity.innerHTML='<div class="stat-n" style="color:#10b981;font-size:14px;">✓ Valid</div><span>Pattern</span>';
    let highlighted=str,offset=0;
    const ranges=[];str.replace(re,(m,...args)=>{const idx=args[args.length-2];ranges.push([idx,idx+m.length,m]);});
    ranges.sort((a,b)=>b[0]-a[0]).forEach(([s,e,m])=>{highlighted=highlighted.slice(0,s)+'<mark class="highlight">'+m+'</mark>'+highlighted.slice(e);});
    document.getElementById('result').innerHTML=highlighted.replace(/\n/g,'<br>');
    document.getElementById('matchList').innerHTML=matches.map(m=>'<span class="match-tag">'+m[0]+'</span>').join('');
  }catch(err){validity.innerHTML='<div class="stat-n" style="color:#ef4444;font-size:14px;">✗ Error</div><span style="color:#ef4444;font-size:11px;">'+err.message+'</span>';document.getElementById('result').textContent=str;document.getElementById('matchList').innerHTML='';}
}
testRegex();
<\/script></body></html>`;}

const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-algoviz');if(l)l.textContent=gl()==='fr'?'Visualiseur Algo':'Algorithm Visualizer';if(window.activeTab==='algoviz')window.initAlgoViz(gl());};
console.log('Algorithm Visualizer loaded!');
})();
