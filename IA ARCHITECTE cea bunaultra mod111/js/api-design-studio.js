(function(){
'use strict';
const TX={en:{title:'API DESIGN STUDIO',sub:'REST, GraphQL & Webhook Generator',back:'<- Back',injected:'Injected!',tools:{
swagger:{name:'OpenAPI / Swagger Builder',desc:'Generate openapi.yaml documentation for your REST API endpoints.',injectBtn:'Inject OpenAPI YAML'},
rest:{name:'REST Client Tester',desc:'In-browser HTTP client - make GET/POST/PUT/DELETE requests live.',injectBtn:'Inject REST Client'},
graphql:{name:'GraphQL Schema Builder',desc:'Generate GraphQL schema with Types, Queries and Mutations.',injectBtn:'Inject GraphQL Schema'},
webhook:{name:'Webhook Event Simulator',desc:'Simulate webhook payloads (Stripe, GitHub, etc.) and view responses.',injectBtn:'Inject Webhook UI'},
ratelimit:{name:'Rate Limiter Config',desc:'Generate token bucket and sliding window rate limiting code.',injectBtn:'Inject Rate Limiter'},
jwt:{name:'JWT Auth Flow Builder',desc:'Generate complete JWT login, validation and refresh token system.',injectBtn:'Inject JWT Auth'}
}},fr:{title:'STUDIO API DESIGN',sub:'Generateur REST, GraphQL & Webhook',back:'<- Retour',injected:'Injecte!',tools:{
swagger:{name:'Constructeur OpenAPI',desc:'Generez openapi.yaml pour vos endpoints REST API.',injectBtn:'Injecter OpenAPI YAML'},
rest:{name:'Client REST Testeur',desc:'Client HTTP dans le navigateur - requetes live GET/POST/PUT/DELETE.',injectBtn:'Injecter Client REST'},
graphql:{name:'Schema GraphQL',desc:'Generez un schema GraphQL avec Types, Queries et Mutations.',injectBtn:'Injecter Schema GraphQL'},
webhook:{name:'Simulateur Webhook',desc:'Simulez des payloads webhook (Stripe, GitHub) et voyez les reponses.',injectBtn:'Injecter UI Webhook'},
ratelimit:{name:'Config Rate Limiter',desc:'Generez du code de limitation token bucket et sliding window.',injectBtn:'Injecter Rate Limiter'},
jwt:{name:'Auth JWT',desc:'Generez un systeme complet JWT login, validation et refresh token.',injectBtn:'Injecter Auth JWT'}
}}};
function gl(){return window.appLang||'en';}
window._injectApiCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='apidesign'){window.activeTab='apidesign';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-apidesign');if(b)b.classList.add('active');window.initApiDesignStudio(gl());return;}
  if(typeof _o==='function')_o(tab);
};
window.initApiDesignStudio=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'swagger',icon:'📘',color:'#6366f1'},{id:'rest',icon:'🔄',color:'#14b8a6'},{id:'graphql',icon:'🔷',color:'#e879f9'},{id:'webhook',icon:'🪝',color:'#f59e0b'},{id:'ratelimit',icon:'⚡',color:'#ef4444'},{id:'jwt',icon:'🔐',color:'#10b981'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(79,70,229,0.1));border-radius:14px;padding:16px;border:1px solid rgba(99,102,241,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #6366f1);">📡</span><div><h2 style="margin:0;color:#a5b4fc;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleApiTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleApiTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={swagger:'#6366f1',rest:'#14b8a6',graphql:'#e879f9',webhook:'#f59e0b',ratelimit:'#ef4444',jwt:'#10b981'};
  const icons={swagger:'📘',rest:'🔄',graphql:'🔷',webhook:'🪝',ratelimit:'⚡',jwt:'🔐'};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  const codeMap={swagger:getSwaggerCode(),rest:getRestCode(),graphql:getGraphqlCode(),webhook:getWebhookCode(),ratelimit:getRateLimitCode(),jwt:getJwtCode()};
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initApiDesignStudio(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInject'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#fff;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInject'+toolId).addEventListener('click',()=>window._injectApiCode(codeMap[toolId]));
};


function getSwaggerCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Swagger UI</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px;overflow-y:auto;height:100vh}
.header{display:flex;align-items:center;gap:15px;margin-bottom:30px;padding-bottom:15px;border-bottom:1px solid #1e293b}
h1{color:#6366f1;font-size:24px} .version{background:#4f46e5;font-size:11px;padding:3px 8px;border-radius:20px;font-weight:bold}
.ep{background:#1e293b;border:1px solid #334155;border-radius:8px;margin-bottom:15px;overflow:hidden;border-left:5px solid transparent;transition:all 0.2s}
.ep.get{border-left-color:#3b82f6} .ep.post{border-left-color:#10b981}
.ep-header{padding:12px 15px;display:flex;align-items:center;gap:15px;cursor:pointer;background:rgba(0,0,0,0.2)}
.ep-header:hover{background:rgba(255,255,255,0.05)}
.badge{padding:4px 10px;border-radius:6px;font-weight:900;font-size:12px;width:70px;text-align:center}
.get .badge{background:#3b82f633;color:#60a5fa} .post .badge{background:#10b98133;color:#34d399}
.path{font-family:monospace;font-size:15px;font-weight:bold}
.desc{color:#94a3b8;font-size:13px;margin-left:auto}
.ep-body{padding:20px;border-top:1px solid #334155;display:none;background:#0f172a}
.open .ep-body{display:block}
h3{font-size:12px;color:#cbd5e1;text-transform:uppercase;margin-bottom:10px}
.try-btn{background:transparent;border:1px solid #6366f1;color:#a5b4fc;padding:6px 15px;border-radius:6px;cursor:pointer;float:right;font-size:12px;font-weight:bold}
.try-btn:hover{background:#6366f1;color:#fff}
table{width:100%;border-collapse:collapse;margin-bottom:20px} th,td{text-align:left;padding:10px;border-bottom:1px solid #1e293b;font-size:13px}
th{color:#94a3b8} td{color:#e2e8f0} .code-box{background:#020617;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;color:#a5b4fc}</style></head>
<body>
<div class="header"><h1>📘 My REST API</h1><span class="version">1.0.0</span></div>

<div class="ep get" onclick="this.classList.toggle('open')">
  <div class="ep-header"><div class="badge">GET</div><div class="path">/users</div><div class="desc">List all users</div></div>
  <div class="ep-body">
    <button class="try-btn">Try it out</button>
    <h3>Parameters</h3>
    <table><tr><th>Name</th><th>Description</th></tr><tr><td><b>page</b><br><span style="color:#64748b;font-size:10px">query (integer)</span></td><td>Page number (default: 1)</td></tr></table>
    <h3>Responses</h3>
    <div class="code-box">200 OK<br><br>{<br>  "data": [{ "id": "1", "name": "John" }],<br>  "total": 1<br>}</div>
  </div>
</div>

<div class="ep post" onclick="this.classList.toggle('open')">
  <div class="ep-header"><div class="badge">POST</div><div class="path">/users</div><div class="desc">Create a new user</div></div>
  <div class="ep-body">
    <button class="try-btn">Try it out</button>
    <h3>Request Body</h3>
    <div class="code-box" style="margin-bottom:15px">{<br>  "email": "user@example.com",<br>  "password": "strongpass",<br>  "name": "Jane Doe"<br>}</div>
    <h3>Responses</h3>
    <div class="code-box">201 Created</div>
  </div>
</div>

<div class="ep post" onclick="this.classList.toggle('open')">
  <div class="ep-header"><div class="badge">POST</div><div class="path">/auth/login</div><div class="desc">Authenticate user</div></div>
  <div class="ep-body"><button class="try-btn">Try it out</button>
    <h3>Request Body</h3><div class="code-box" style="margin-bottom:15px">{"email": "...", "password": "..."}</div>
    <h3>Responses</h3><div class="code-box">200 OK<br>{ "accessToken": "ey...", "refreshToken": "ey..." }</div>
  </div>
</div>

<script>
document.querySelectorAll('.try-btn').forEach(btn => {
  btn.onclick = (e) => {
    e.stopPropagation();
    btn.textContent = 'Executing...';
    setTimeout(() => { btn.textContent = 'Clear'; btn.style.background = '#334155'; btn.style.borderColor = '#475569'; btn.style.color = '#fff'; }, 800);
  };
});
</script></body></html>`;}
function getRestCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>REST Client</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:15px;height:100vh}h2{color:#14b8a6;margin-bottom:15px;font-size:16px}.box{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:15px;display:flex;flex-direction:column}.method-row{display:flex;gap:8px;margin-bottom:10px}select{background:#0f172a;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;font-size:13px}select.method{width:110px}input{flex:1;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;font-size:13px}input:focus,select:focus{outline:none;border-color:#14b8a6}button{padding:8px 16px;background:#14b8a6;border:none;border-radius:6px;color:#000;font-weight:bold;cursor:pointer}.tabs{display:flex;gap:5px;margin-bottom:10px}.tab{padding:5px 12px;border-radius:6px;cursor:pointer;font-size:12px;background:#334155;color:#94a3b8;border:none}.tab.active{background:#14b8a633;color:#14b8a6}textarea{flex:1;background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-family:monospace;font-size:12px;resize:none}pre{flex:1;background:#000;border:1px solid #334155;border-radius:6px;padding:12px;font-family:monospace;font-size:12px;overflow:auto;color:#10b981;white-space:pre-wrap}.status-bar{display:flex;gap:15px;padding:8px 0;font-size:12px;border-top:1px solid #334155;margin-top:8px}.badge{padding:3px 10px;border-radius:10px;font-weight:bold}.s2{background:#10b98122;color:#10b981}.s4{background:#f59e0b22;color:#f59e0b}.s5{background:#ef444422;color:#ef4444}</style></head>
<body>
<div class="box"><h2>📡 REST Client</h2>
  <div class="method-row"><select class="method" id="method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select><input id="url" value="https://jsonplaceholder.typicode.com/posts/1"><button onclick="sendReq()">Send</button></div>
  <div class="tabs"><button class="tab active" onclick="switchTab('headers',this)">Headers</button><button class="tab" onclick="switchTab('body',this)">Body</button></div>
  <textarea id="headers" placeholder='{"Authorization":"Bearer TOKEN","Content-Type":"application/json"}' style="height:80px"></textarea>
  <textarea id="body" placeholder='{"key":"value"}' style="height:80px;display:none"></textarea>
</div>
<div class="box"><h2>Response</h2>
  <div id="statusBar" class="status-bar" style="display:none"></div>
  <pre id="responseBox">Click Send to make a request...</pre>
</div>
<script>
function switchTab(t,btn){document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('headers').style.display=t==='headers'?'flex':'none';document.getElementById('body').style.display=t==='body'?'flex':'none';}
async function sendReq(){
  const url=document.getElementById('url').value;
  const method=document.getElementById('method').value;
  const res=document.getElementById('responseBox');
  const bar=document.getElementById('statusBar');
  res.textContent='Loading...';res.style.color='#94a3b8';
  let headers={};
  try{headers=JSON.parse(document.getElementById('headers').value||'{}');}catch(e){}
  const opts={method,headers};
  const body=document.getElementById('body').value;
  if(body&&method!=='GET')opts.body=body;
  const t=Date.now();
  try{
    const r=await fetch(url,opts);
    const ms=Date.now()-t;
    const cls=r.status<300?'s2':r.status<500?'s4':'s5';
    bar.style.display='flex';
    bar.innerHTML='<span class="badge '+cls+'">'+r.status+' '+r.statusText+'</span><span>'+ms+'ms</span><span>'+Math.round(r.headers.get("content-length")||0/1024)+'KB</span>';
    const data=await r.text();
    try{res.textContent=JSON.stringify(JSON.parse(data),null,2);}catch{res.textContent=data;}
    res.style.color='#10b981';
  }catch(e){res.textContent='Error: '+e.message;res.style.color='#ef4444';}
}
<\/script></body></html>`;}
function getGraphqlCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GraphiQL UI</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;height:100vh}
.sidebar{width:300px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column}
.header{padding:15px;background:#020617;border-bottom:1px solid #334155;color:#e879f9;font-weight:900;display:flex;align-items:center;gap:10px}
.docs{flex:1;overflow-y:auto;padding:15px;font-size:13px}
.docs h3{color:#cbd5e1;font-size:11px;text-transform:uppercase;margin:15px 0 10px;letter-spacing:1px}
.type{color:#38bdf8;cursor:pointer;margin-bottom:5px;display:block}
.type:hover{text-decoration:underline}
.editor-pane{flex:1;display:flex;flex-direction:column}
.toolbar{padding:10px 15px;background:#1e293b;border-bottom:1px solid #334155;display:flex;gap:10px}
.play-btn{background:#e879f9;color:#000;border:none;padding:8px 20px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px}
.play-btn:hover{background:#d946ef}
.split{display:flex;flex:1}
.query{flex:1;background:#020617;border-right:1px solid #334155;padding:15px;font-family:monospace;font-size:14px;color:#e2e8f0;resize:none;outline:none}
.result{flex:1;background:#0f172a;padding:15px;font-family:monospace;font-size:14px;color:#a5b4fc;overflow-y:auto;white-space:pre-wrap}</style></head>
<body>
<div class="sidebar">
  <div class="header">🔷 GraphiQL Explorer</div>
  <div class="docs">
    <h3>Root Types</h3>
    <span class="type">Query</span><span class="type">Mutation</span><span class="type">Subscription</span>
    <h3>Custom Types</h3>
    <span class="type">User</span><span class="type">Post</span><span class="type">AuthPayload</span>
  </div>
</div>
<div class="editor-pane">
  <div class="toolbar"><button class="play-btn" onclick="runQuery()">▶ Execute Query</button></div>
  <div class="split">
    <textarea class="query" id="queryInput" spellcheck="false">query GetUser {
  me {
    id
    name
    email
    role
  }
}

# Try running this query!</textarea>
    <pre class="result" id="resultOutput">{
  "data": null
}</pre>
  </div>
</div>
<script>
function runQuery() {
  const res = document.getElementById('resultOutput');
  res.textContent = 'Loading...';
  setTimeout(() => {
    res.textContent = JSON.stringify({
      data: {
        me: {
          id: "usr_12345",
          name: "Alex Dev",
          email: "alex@example.com",
          role: "ADMIN"
        }
      }
    }, null, 2);
    res.style.color = '#34d399';
  }, 500);
}
</script></body></html>`;}
function getWebhookCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Webhook Simulator</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#f59e0b;margin-bottom:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.box{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px}h3{color:#f59e0b;margin-bottom:15px;font-size:14px}label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;margin-bottom:5px;text-transform:uppercase}select,input{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;margin-bottom:12px;font-size:13px}select:focus,input:focus{outline:none;border-color:#f59e0b}textarea{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-family:monospace;font-size:12px;height:200px;resize:vertical}button{width:100%;padding:12px;background:#f59e0b;border:none;border-radius:8px;color:#000;font-weight:900;cursor:pointer;margin-top:10px}.log-item{background:#0f172a;border-radius:6px;padding:10px;margin-bottom:8px;font-size:12px;border-left:3px solid #f59e0b}.log-time{color:#64748b;font-size:10px}.log-status{color:#10b981;font-weight:bold}</style></head>
<body>
<h1>🪝 Webhook Event Simulator</h1>
<div class="grid">
<div class="box">
  <h3>Configure Event</h3>
  <label>Provider</label>
  <select id="provider" onchange="loadTemplate()">
    <option value="stripe">Stripe</option>
    <option value="github">GitHub</option>
    <option value="shopify">Shopify</option>
  </select>
  <label>Event Type</label>
  <select id="eventType" onchange="loadTemplate()">
    <option value="payment_intent.succeeded">payment_intent.succeeded</option>
    <option value="customer.created">customer.created</option>
    <option value="invoice.paid">invoice.paid</option>
  </select>
  <label>Endpoint URL</label>
  <input id="endpoint" value="https://myapp.com/webhooks/stripe">
  <label>Payload</label>
  <textarea id="payload"></textarea>
  <button onclick="sendWebhook()">🚀 Send Webhook</button>
</div>
<div class="box">
  <h3>Event Log</h3>
  <div id="logContainer"><p style="color:#475569">No events yet. Send a webhook to see results.</p></div>
</div>
</div>
<script>
const templates={stripe:{payment_intent:{id:"pi_3Ox2",object:"payment_intent",amount:4999,currency:"usd",status:"succeeded",customer:"cus_abc123",created:Math.floor(Date.now()/1000)},'customer.created':{id:"cus_abc123",object:"customer",email:"user@example.com",name:"John Doe"},'invoice.paid':{id:"in_xyz",object:"invoice",amount_paid:4999,status:"paid"}}};
function loadTemplate(){const p=document.getElementById('provider').value,e=document.getElementById('eventType').value;const t={id:"evt_"+Math.random().toString(36).slice(2),type:e,created:Math.floor(Date.now()/1000),data:{object:templates.stripe[e]||{id:"obj_"+Math.random().toString(36).slice(2)}}};document.getElementById('payload').value=JSON.stringify(t,null,2);}
async function sendWebhook(){
  const log=document.getElementById('logContainer');
  const payload=document.getElementById('payload').value;
  const url=document.getElementById('endpoint').value;
  const item=document.createElement('div');item.className='log-item';
  try{
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-Webhook-Signature':'sha256=simulated'},body:payload});
    item.innerHTML='<div class="log-time">'+new Date().toLocaleTimeString()+'</div><div class="log-status">'+r.status+' '+r.statusText+'</div><div style="color:#94a3b8">POST '+url+'</div>';
  }catch(e){item.innerHTML='<div class="log-time">'+new Date().toLocaleTimeString()+'</div><div style="color:#ef4444">Network Error (CORS expected in browser)</div><div style="color:#64748b;font-size:10px">Payload sent with signature header</div>';item.style.borderColor='#f59e0b';}
  if(log.querySelector('p'))log.innerHTML='';
  log.prepend(item);
}
loadTemplate();
<\/script></body></html>`;}
function getRateLimitCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Rate Limiter Simulator</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;display:flex;gap:30px;height:100vh}
.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;flex:1;display:flex;flex-direction:column}
h2{color:#ef4444;margin-bottom:5px;display:flex;align-items:center;gap:10px}
p{color:#94a3b8;font-size:13px;margin-bottom:20px}
.gauge-container{background:#0f172a;border-radius:10px;height:40px;width:100%;border:1px solid #334155;position:relative;overflow:hidden;margin-bottom:20px}
.gauge-fill{background:#10b981;height:100%;width:100%;transition:width 0.2s, background 0.3s;display:flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:14px}
.btn{background:#ef4444;color:#fff;border:none;padding:15px;border-radius:8px;font-size:16px;font-weight:900;cursor:pointer;transition:transform 0.1s;margin-bottom:20px}
.btn:active{transform:scale(0.97)}
.log{flex:1;background:#020617;border-radius:8px;padding:15px;overflow-y:auto;font-family:monospace;font-size:12px}
.log-item{padding:8px 0;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between}
.ok{color:#10b981} .fail{color:#ef4444}</style></head>
<body>
<div class="card" style="flex:0.8">
  <h2>⚡ Token Bucket Simulator</h2>
  <p>Capacity: 10 tokens | Refill: 1 token/sec</p>
  <div class="gauge-container"><div class="gauge-fill" id="gauge">10 / 10</div></div>
  <button class="btn" onclick="sendReq()">🚀 Send API Request</button>
  <div style="color:#64748b;font-size:11px;text-align:center">Click rapidly to exhaust the bucket and trigger HTTP 429.</div>
</div>
<div class="card">
  <h2 style="color:#e2e8f0">📋 Request Log</h2>
  <div class="log" id="logBox"></div>
</div>
<script>
let tokens = 10;
const capacity = 10;
const gauge = document.getElementById('gauge');
const logBox = document.getElementById('logBox');

setInterval(() => {
  if(tokens < capacity) { tokens++; updateUI(); }
}, 1000);

function updateUI() {
  const pct = (tokens / capacity) * 100;
  gauge.style.width = pct + '%';
  gauge.textContent = tokens + ' / ' + capacity;
  if(tokens > 5) gauge.style.background = '#10b981';
  else if(tokens > 2) gauge.style.background = '#f59e0b';
  else gauge.style.background = '#ef4444';
}

function sendReq() {
  const item = document.createElement('div');
  item.className = 'log-item';
  const time = new Date().toLocaleTimeString();
  
  if (tokens >= 1) {
    tokens--;
    item.innerHTML = '<span class="ok">✅ 200 OK</span><span style="color:#64748b">' + time + '</span>';
  } else {
    item.innerHTML = '<span class="fail">❌ 429 Too Many Requests</span><span style="color:#64748b">' + time + '</span>';
  }
  updateUI();
  logBox.prepend(item);
}
updateUI();
</script></body></html>`;}
function getJwtCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>JWT Debugger</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;display:flex;flex-direction:column;gap:20px;height:100vh}
.header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;padding-bottom:15px}
h1{color:#10b981;font-size:22px;display:flex;align-items:center;gap:10px}
.btn{background:#10b981;color:#000;border:none;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;flex:1}
.col{display:flex;flex-direction:column;gap:15px}
h3{font-size:14px;color:#94a3b8;text-transform:uppercase}
textarea{flex:1;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;font-family:monospace;font-size:15px;resize:none;outline:none;word-break:break-all}
.box{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;font-family:monospace;font-size:13px;color:#e2e8f0;overflow-y:auto}
.hl-header{color:#ef4444} .hl-payload{color:#a855f7} .hl-sign{color:#3b82f6}</style></head>
<body>
<div class="header">
  <h1>🔐 JWT Debugger</h1>
  <button class="btn" onclick="genToken()">Regenerate Token</button>
</div>
<div class="grid">
  <div class="col">
    <h3>Encoded (Paste a token here)</h3>
    <textarea id="encoded" spellcheck="false"></textarea>
  </div>
  <div class="col">
    <h3>Decoded</h3>
    <div style="display:flex;flex-direction:column;gap:15px;flex:1">
      <div class="box" id="decHeader" style="flex:0.3;border-top:3px solid #ef4444"></div>
      <div class="box" id="decPayload" style="flex:0.7;border-top:3px solid #a855f7"></div>
    </div>
  </div>
</div>
<script>
function b64u(str){ return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''); }
function u64b(str){ try{ return atob(str.replace(/-/g,'+').replace(/_/g,'/')); }catch(e){return "Invalid";} }

function genToken() {
  const h = { alg: "HS256", typ: "JWT" };
  const p = { sub: "user_789", name: "John Doe", role: "admin", iat: Math.floor(Date.now()/1000) };
  const eH = b64u(JSON.stringify(h));
  const eP = b64u(JSON.stringify(p));
  const sign = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  
  document.getElementById('encoded').value = eH + '.' + eP + '.' + sign;
  decodeToken();
}

function decodeToken() {
  const parts = document.getElementById('encoded').value.split('.');
  if(parts.length >= 2) {
    try {
      const hStr = JSON.stringify(JSON.parse(u64b(parts[0])), null, 2);
      const pStr = JSON.stringify(JSON.parse(u64b(parts[1])), null, 2);
      document.getElementById('decHeader').innerHTML = '<span style="color:#ef4444;font-weight:bold">// HEADER: ALGORITHM & TOKEN TYPE</span><br>' + hStr;
      document.getElementById('decPayload').innerHTML = '<span style="color:#a855f7;font-weight:bold">// PAYLOAD: DATA</span><br>' + pStr;
    } catch(e) {
      document.getElementById('decHeader').textContent = 'Invalid Base64';
    }
  }
}

document.getElementById('encoded').addEventListener('input', decodeToken);
genToken();
</script></body></html>`;}
const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-apidesign');if(l)l.textContent=gl()==='fr'?'Studio API Design':'API Design Studio';if(window.activeTab==='apidesign')window.initApiDesignStudio(gl());};
console.log('📡 API Design Studio loaded!');
})();
