const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/api-design-studio.js";
let code = fs.readFileSync(path, 'utf8');

const getSwaggerHtml = "function getSwaggerCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Swagger UI</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:20px;overflow-y:auto;height:100vh}\n" +
".header{display:flex;align-items:center;gap:15px;margin-bottom:30px;padding-bottom:15px;border-bottom:1px solid #1e293b}\n" +
"h1{color:#6366f1;font-size:24px} .version{background:#4f46e5;font-size:11px;padding:3px 8px;border-radius:20px;font-weight:bold}\n" +
".ep{background:#1e293b;border:1px solid #334155;border-radius:8px;margin-bottom:15px;overflow:hidden;border-left:5px solid transparent;transition:all 0.2s}\n" +
".ep.get{border-left-color:#3b82f6} .ep.post{border-left-color:#10b981}\n" +
".ep-header{padding:12px 15px;display:flex;align-items:center;gap:15px;cursor:pointer;background:rgba(0,0,0,0.2)}\n" +
".ep-header:hover{background:rgba(255,255,255,0.05)}\n" +
".badge{padding:4px 10px;border-radius:6px;font-weight:900;font-size:12px;width:70px;text-align:center}\n" +
".get .badge{background:#3b82f633;color:#60a5fa} .post .badge{background:#10b98133;color:#34d399}\n" +
".path{font-family:monospace;font-size:15px;font-weight:bold}\n" +
".desc{color:#94a3b8;font-size:13px;margin-left:auto}\n" +
".ep-body{padding:20px;border-top:1px solid #334155;display:none;background:#0f172a}\n" +
".open .ep-body{display:block}\n" +
"h3{font-size:12px;color:#cbd5e1;text-transform:uppercase;margin-bottom:10px}\n" +
".try-btn{background:transparent;border:1px solid #6366f1;color:#a5b4fc;padding:6px 15px;border-radius:6px;cursor:pointer;float:right;font-size:12px;font-weight:bold}\n" +
".try-btn:hover{background:#6366f1;color:#fff}\n" +
"table{width:100%;border-collapse:collapse;margin-bottom:20px} th,td{text-align:left;padding:10px;border-bottom:1px solid #1e293b;font-size:13px}\n" +
"th{color:#94a3b8} td{color:#e2e8f0} .code-box{background:#020617;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;color:#a5b4fc}</style></head>\n" +
"<body>\n" +
"<div class=\"header\"><h1>📘 My REST API</h1><span class=\"version\">1.0.0</span></div>\n" +
"<div class=\"ep get\" onclick=\"this.classList.toggle('open')\">\n" +
"  <div class=\"ep-header\"><div class=\"badge\">GET</div><div class=\"path\">/users</div><div class=\"desc\">List all users</div></div>\n" +
"  <div class=\"ep-body\">\n" +
"    <button class=\"try-btn\">Try it out</button>\n" +
"    <h3>Parameters</h3>\n" +
"    <table><tr><th>Name</th><th>Description</th></tr><tr><td><b>page</b><br><span style=\"color:#64748b;font-size:10px\">query (integer)</span></td><td>Page number (default: 1)</td></tr></table>\n" +
"    <h3>Responses</h3>\n" +
"    <div class=\"code-box\">200 OK<br><br>{<br>  \"data\": [{ \"id\": \"1\", \"name\": \"John\" }],<br>  \"total\": 1<br>}</div>\n" +
"  </div>\n" +
"</div>\n" +
"<div class=\"ep post\" onclick=\"this.classList.toggle('open')\">\n" +
"  <div class=\"ep-header\"><div class=\"badge\">POST</div><div class=\"path\">/users</div><div class=\"desc\">Create a new user</div></div>\n" +
"  <div class=\"ep-body\">\n" +
"    <button class=\"try-btn\">Try it out</button>\n" +
"    <h3>Request Body</h3>\n" +
"    <div class=\"code-box\" style=\"margin-bottom:15px\">{<br>  \"email\": \"user@example.com\",<br>  \"password\": \"strongpass\",<br>  \"name\": \"Jane Doe\"<br>}</div>\n" +
"    <h3>Responses</h3>\n" +
"    <div class=\"code-box\">201 Created</div>\n" +
"  </div>\n" +
"</div>\n" +
"<div class=\"ep post\" onclick=\"this.classList.toggle('open')\">\n" +
"  <div class=\"ep-header\"><div class=\"badge\">POST</div><div class=\"path\">/auth/login</div><div class=\"desc\">Authenticate user</div></div>\n" +
"  <div class=\"ep-body\"><button class=\"try-btn\">Try it out</button>\n" +
"    <h3>Request Body</h3><div class=\"code-box\" style=\"margin-bottom:15px\">{\"email\": \"...\", \"password\": \"...\"}</div>\n" +
"    <h3>Responses</h3><div class=\"code-box\">200 OK<br>{ \"accessToken\": \"ey...\", \"refreshToken\": \"ey...\" }</div>\n" +
"  </div>\n" +
"</div>\n" +
"<script>\n" +
"document.querySelectorAll('.try-btn').forEach(btn => {\n" +
"  btn.onclick = (e) => {\n" +
"    e.stopPropagation();\n" +
"    btn.textContent = 'Executing...';\n" +
"    setTimeout(() => { btn.textContent = 'Clear'; btn.style.background = '#334155'; btn.style.borderColor = '#475569'; btn.style.color = '#fff'; }, 800);\n" +
"  };\n" +
"});\n" +
"<\\/script></body></html>`;}";


const getGraphqlHtml = "function getGraphqlCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>GraphiQL UI</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;height:100vh}\n" +
".sidebar{width:300px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column}\n" +
".header{padding:15px;background:#020617;border-bottom:1px solid #334155;color:#e879f9;font-weight:900;display:flex;align-items:center;gap:10px}\n" +
".docs{flex:1;overflow-y:auto;padding:15px;font-size:13px}\n" +
".docs h3{color:#cbd5e1;font-size:11px;text-transform:uppercase;margin:15px 0 10px;letter-spacing:1px}\n" +
".type{color:#38bdf8;cursor:pointer;margin-bottom:5px;display:block}\n" +
".type:hover{text-decoration:underline}\n" +
".editor-pane{flex:1;display:flex;flex-direction:column}\n" +
".toolbar{padding:10px 15px;background:#1e293b;border-bottom:1px solid #334155;display:flex;gap:10px}\n" +
".play-btn{background:#e879f9;color:#000;border:none;padding:8px 20px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px}\n" +
".play-btn:hover{background:#d946ef}\n" +
".split{display:flex;flex:1}\n" +
".query{flex:1;background:#020617;border-right:1px solid #334155;padding:15px;font-family:monospace;font-size:14px;color:#e2e8f0;resize:none;outline:none}\n" +
".result{flex:1;background:#0f172a;padding:15px;font-family:monospace;font-size:14px;color:#a5b4fc;overflow-y:auto;white-space:pre-wrap}</style></head>\n" +
"<body>\n" +
"<div class=\"sidebar\">\n" +
"  <div class=\"header\">🔷 GraphiQL Explorer</div>\n" +
"  <div class=\"docs\">\n" +
"    <h3>Root Types</h3>\n" +
"    <span class=\"type\">Query</span><span class=\"type\">Mutation</span><span class=\"type\">Subscription</span>\n" +
"    <h3>Custom Types</h3>\n" +
"    <span class=\"type\">User</span><span class=\"type\">Post</span><span class=\"type\">AuthPayload</span>\n" +
"  </div>\n" +
"</div>\n" +
"<div class=\"editor-pane\">\n" +
"  <div class=\"toolbar\"><button class=\"play-btn\" onclick=\"runQuery()\">▶ Execute Query</button></div>\n" +
"  <div class=\"split\">\n" +
"    <textarea class=\"query\" id=\"queryInput\" spellcheck=\"false\">query GetUser {\n" +
"  me {\n" +
"    id\n" +
"    name\n" +
"    email\n" +
"    role\n" +
"  }\n" +
"}\n\n" +
"# Try running this query!</textarea>\n" +
"    <pre class=\"result\" id=\"resultOutput\">{\n" +
"  \"data\": null\n" +
"}</pre>\n" +
"  </div>\n" +
"</div>\n" +
"<script>\n" +
"function runQuery() {\n" +
"  const res = document.getElementById('resultOutput');\n" +
"  res.textContent = 'Loading...';\n" +
"  setTimeout(() => {\n" +
"    res.textContent = JSON.stringify({\n" +
"      data: {\n" +
"        me: {\n" +
"          id: \"usr_12345\",\n" +
"          name: \"Alex Dev\",\n" +
"          email: \"alex@example.com\",\n" +
"          role: \"ADMIN\"\n" +
"        }\n" +
"      }\n" +
"    }, null, 2);\n" +
"    res.style.color = '#34d399';\n" +
"  }, 500);\n" +
"}\n" +
"<\\/script></body></html>`;}";


const getRateLimitHtml = "function getRateLimitCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Rate Limiter Simulator</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;display:flex;gap:30px;height:100vh}\n" +
".card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;flex:1;display:flex;flex-direction:column}\n" +
"h2{color:#ef4444;margin-bottom:5px;display:flex;align-items:center;gap:10px}\n" +
"p{color:#94a3b8;font-size:13px;margin-bottom:20px}\n" +
".gauge-container{background:#0f172a;border-radius:10px;height:40px;width:100%;border:1px solid #334155;position:relative;overflow:hidden;margin-bottom:20px}\n" +
".gauge-fill{background:#10b981;height:100%;width:100%;transition:width 0.2s, background 0.3s;display:flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:14px}\n" +
".btn{background:#ef4444;color:#fff;border:none;padding:15px;border-radius:8px;font-size:16px;font-weight:900;cursor:pointer;transition:transform 0.1s;margin-bottom:20px}\n" +
".btn:active{transform:scale(0.97)}\n" +
".log{flex:1;background:#020617;border-radius:8px;padding:15px;overflow-y:auto;font-family:monospace;font-size:12px}\n" +
".log-item{padding:8px 0;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between}\n" +
".ok{color:#10b981} .fail{color:#ef4444}</style></head>\n" +
"<body>\n" +
"<div class=\"card\" style=\"flex:0.8\">\n" +
"  <h2>⚡ Token Bucket Simulator</h2>\n" +
"  <p>Capacity: 10 tokens | Refill: 1 token/sec</p>\n" +
"  <div class=\"gauge-container\"><div class=\"gauge-fill\" id=\"gauge\">10 / 10</div></div>\n" +
"  <button class=\"btn\" onclick=\"sendReq()\">🚀 Send API Request</button>\n" +
"  <div style=\"color:#64748b;font-size:11px;text-align:center\">Click rapidly to exhaust the bucket and trigger HTTP 429.</div>\n" +
"</div>\n" +
"<div class=\"card\">\n" +
"  <h2 style=\"color:#e2e8f0\">📋 Request Log</h2>\n" +
"  <div class=\"log\" id=\"logBox\"></div>\n" +
"</div>\n" +
"<script>\n" +
"let tokens = 10;\n" +
"const capacity = 10;\n" +
"const gauge = document.getElementById('gauge');\n" +
"const logBox = document.getElementById('logBox');\n\n" +
"setInterval(() => {\n" +
"  if(tokens < capacity) { tokens++; updateUI(); }\n" +
"}, 1000);\n\n" +
"function updateUI() {\n" +
"  const pct = (tokens / capacity) * 100;\n" +
"  gauge.style.width = pct + '%';\n" +
"  gauge.textContent = tokens + ' / ' + capacity;\n" +
"  if(tokens > 5) gauge.style.background = '#10b981';\n" +
"  else if(tokens > 2) gauge.style.background = '#f59e0b';\n" +
"  else gauge.style.background = '#ef4444';\n" +
"}\n\n" +
"function sendReq() {\n" +
"  const item = document.createElement('div');\n" +
"  item.className = 'log-item';\n" +
"  const time = new Date().toLocaleTimeString();\n  \n" +
"  if (tokens >= 1) {\n" +
"    tokens--;\n" +
"    item.innerHTML = `<span class=\"ok\">✅ 200 OK</span><span style=\"color:#64748b\">${time}</span>`;\n" +
"  } else {\n" +
"    item.innerHTML = `<span class=\"fail\">❌ 429 Too Many Requests</span><span style=\"color:#64748b\">${time}</span>`;\n" +
"  }\n" +
"  updateUI();\n" +
"  logBox.prepend(item);\n" +
"}\n" +
"updateUI();\n" +
"<\\/script></body></html>`;}";


const getJwtHtml = "function getJwtCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>JWT Debugger</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;display:flex;flex-direction:column;gap:20px;height:100vh}\n" +
".header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;padding-bottom:15px}\n" +
"h1{color:#10b981;font-size:22px;display:flex;align-items:center;gap:10px}\n" +
".btn{background:#10b981;color:#000;border:none;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer}\n" +
".grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;flex:1}\n" +
".col{display:flex;flex-direction:column;gap:15px}\n" +
"h3{font-size:14px;color:#94a3b8;text-transform:uppercase}\n" +
"textarea{flex:1;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;font-family:monospace;font-size:15px;resize:none;outline:none;word-break:break-all}\n" +
".box{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:20px;font-family:monospace;font-size:13px;color:#e2e8f0;overflow-y:auto}\n" +
".hl-header{color:#ef4444} .hl-payload{color:#a855f7} .hl-sign{color:#3b82f6}</style></head>\n" +
"<body>\n" +
"<div class=\"header\">\n" +
"  <h1>🔐 JWT Debugger</h1>\n" +
"  <button class=\"btn\" onclick=\"genToken()\">Regenerate Token</button>\n" +
"</div>\n" +
"<div class=\"grid\">\n" +
"  <div class=\"col\">\n" +
"    <h3>Encoded (Paste a token here)</h3>\n" +
"    <textarea id=\"encoded\" spellcheck=\"false\"></textarea>\n" +
"  </div>\n" +
"  <div class=\"col\">\n" +
"    <h3>Decoded</h3>\n" +
"    <div style=\"display:flex;flex-direction:column;gap:15px;flex:1\">\n" +
"      <div class=\"box\" id=\"decHeader\" style=\"flex:0.3;border-top:3px solid #ef4444\"></div>\n" +
"      <div class=\"box\" id=\"decPayload\" style=\"flex:0.7;border-top:3px solid #a855f7\"></div>\n" +
"    </div>\n" +
"  </div>\n" +
"</div>\n" +
"<script>\n" +
"function b64u(str){ return btoa(str).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,''); }\n" +
"function u64b(str){ try{ return atob(str.replace(/-/g,'+').replace(/_/g,'/')); }catch(e){return \"Invalid\";} }\n\n" +
"function genToken() {\n" +
"  const h = { alg: \"HS256\", typ: \"JWT\" };\n" +
"  const p = { sub: \"user_789\", name: \"John Doe\", role: \"admin\", iat: Math.floor(Date.now()/1000) };\n" +
"  const eH = b64u(JSON.stringify(h));\n" +
"  const eP = b64u(JSON.stringify(p));\n" +
"  const sign = \"SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\";\n  \n" +
"  document.getElementById('encoded').value = eH + '.' + eP + '.' + sign;\n" +
"  decodeToken();\n" +
"}\n\n" +
"function decodeToken() {\n" +
"  const parts = document.getElementById('encoded').value.split('.');\n" +
"  if(parts.length >= 2) {\n" +
"    try {\n" +
"      const hStr = JSON.stringify(JSON.parse(u64b(parts[0])), null, 2);\n" +
"      const pStr = JSON.stringify(JSON.parse(u64b(parts[1])), null, 2);\n" +
"      document.getElementById('decHeader').innerHTML = '<span style=\"color:#ef4444;font-weight:bold\">// HEADER: ALGORITHM & TOKEN TYPE</span><br>' + hStr;\n" +
"      document.getElementById('decPayload').innerHTML = '<span style=\"color:#a855f7;font-weight:bold\">// PAYLOAD: DATA</span><br>' + pStr;\n" +
"    } catch(e) {\n" +
"      document.getElementById('decHeader').textContent = 'Invalid Base64';\n" +
"    }\n" +
"  }\n" +
"}\n\n" +
"document.getElementById('encoded').addEventListener('input', decodeToken);\n" +
"genToken();\n" +
"<\\/script></body></html>`;}";


// Remove the old getHTML block completely
code = code.replace(/function getHTML\([^]*?<\/script><\/body><\/html>`;\r?\n\}/m, "");

// Replace the four generator functions
code = code.replace(/function getSwaggerCode\([^]*?return `[^]*?`;\r?\n\}/m, getSwaggerHtml);
code = code.replace(/function getGraphqlCode\([^]*?return `[^]*?`;\r?\n\}/m, getGraphqlHtml);
code = code.replace(/function getRateLimitCode\([^]*?return `[^]*?`;\r?\n\}/m, getRateLimitHtml);
code = code.replace(/function getJwtCode\([^]*?return `[^]*?`;\r?\n\}/m, getJwtHtml);

fs.writeFileSync(path, code);
console.log("Successfully transformed to fully functional HTML apps.");
