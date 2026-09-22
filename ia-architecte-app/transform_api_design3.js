const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/api-design-studio.js";
let code = fs.readFileSync(path, 'utf8');

// I will just use string manipulation to find the blocks and replace them.

// 1. Remove getHTML if it exists
let htmlIndex = code.indexOf('function getHTML(');
if (htmlIndex !== -1) {
  let endHtml = code.indexOf('</script></body></html>`;\n}', htmlIndex);
  if (endHtml !== -1) {
    code = code.substring(0, htmlIndex) + code.substring(endHtml + 29);
  }
}

// Now replace getSwaggerCode
let sStart = code.indexOf('function getSwaggerCode');
let sEnd = code.indexOf('function getRestCode');
if (sStart !== -1 && sEnd !== -1) {
  code = code.substring(0, sStart) +
`function getSwaggerCode(){return \`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Swagger UI</title>
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
<\/script></body></html>\`;}
` + code.substring(sEnd);
}

let gStart = code.indexOf('function getGraphqlCode');
let gEnd = code.indexOf('function getWebhookCode');
if (gStart !== -1 && gEnd !== -1) {
  code = code.substring(0, gStart) + 
`function getGraphqlCode(){return \`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GraphiQL UI</title>
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
<\/script></body></html>\`;}
` + code.substring(gEnd);
}

let rStart = code.indexOf('function getRateLimitCode');
let rEnd = code.indexOf('function getJwtCode');
if (rStart !== -1 && rEnd !== -1) {
  code = code.substring(0, rStart) + 
`function getRateLimitCode(){return \`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Rate Limiter Simulator</title>
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
    item.innerHTML = \`<span class="ok">✅ 200 OK</span><span style="color:#64748b">\${time}</span>\`;
  } else {
    item.innerHTML = \`<span class="fail">❌ 429 Too Many Requests</span><span style="color:#64748b">\${time}</span>\`;
  }
  updateUI();
  logBox.prepend(item);
}
updateUI();
<\/script></body></html>\`;}
` + code.substring(rEnd);
}

let jStart = code.indexOf('function getJwtCode');
let jEnd = code.indexOf('const _oa=window.applyLang');
if (jStart !== -1 && jEnd !== -1) {
  code = code.substring(0, jStart) + 
`function getJwtCode(){return \`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>JWT Debugger</title>
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
function b64u(str){ return btoa(str).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,''); }
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
<\/script></body></html>\`;}
` + code.substring(jEnd);
}

fs.writeFileSync(path, code);
console.log("Transformation completed successfully without Regex.");
