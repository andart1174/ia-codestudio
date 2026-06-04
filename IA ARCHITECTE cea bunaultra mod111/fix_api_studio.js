const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/api-design-studio.js";
let code = fs.readFileSync(path, 'utf8');

const getHtmlCode = `function getHTML(title, emoji, desc, files) {
  const fStr = JSON.stringify(files.map(f=>({name:f.name,icon:f.icon,code:f.code})));
  const b64 = typeof btoa !== 'undefined' ? btoa(encodeURIComponent(fStr)) : (typeof Buffer !== 'undefined' ? Buffer.from(encodeURIComponent(fStr)).toString('base64') : '');
  
  return \`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>\${title}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}h1{color:#14b8a6;padding:16px 20px;font-size:18px;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px;flex-shrink:0}.file-tabs{display:flex;gap:0;border-bottom:1px solid #1e293b;overflow-x:auto;flex-shrink:0;background:#020617}.file-tab{padding:10px 16px;cursor:pointer;font-size:12px;font-weight:600;color:#64748b;border-bottom:2px solid transparent;white-space:nowrap;transition:0.2s;display:flex;align-items:center;gap:5px}.file-tab.active{color:#14b8a6;border-bottom-color:#14b8a6;background:#0f172a}.file-tab:hover{color:#94a3b8}.code-area{flex:1;overflow:auto;position:relative}.toolbar{background:#1e293b;padding:8px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;flex-shrink:0}.toolbar-left{display:flex;align-items:center;gap:10px}.badge{background:#14b8a622;color:#14b8a6;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:bold}.copy-btn{background:#14b8a6;border:none;color:#000;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;transition:0.2s}.copy-btn:hover{background:#0d9488}pre{padding:20px;font-family:"Fira Code",Consolas,monospace;font-size:13px;line-height:1.7;overflow:auto;color:#e2e8f0;white-space:pre-wrap;word-break:break-all}.kw{color:#818cf8}.fn{color:#34d399}.str{color:#fb923c}.cm{color:#475569;font-style:italic}.num{color:#f472b6}.punc{color:#94a3b8}.tag{color:#60a5fa}.attr{color:#34d399}.val{color:#fb923c}</style></head><body>
<h1>\${emoji} \${title}<span style="font-size:12px;color:#64748b;font-weight:400">— \${desc}</span></h1>
<div class="file-tabs" id="tabs"></div>
<div class="toolbar"><div class="toolbar-left"><span id="curFile" class="badge"></span><span style="color:#64748b;font-size:11px">Click a tab to switch files</span></div><button class="copy-btn" onclick="copyCode()">📋 Copy File</button></div>
<div class="code-area"><pre id="codeBlock"></pre></div>
<script>
const files = JSON.parse(decodeURIComponent(atob('\${b64}')));
let cur=0;
function hl(code,name){
  let c=code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  if(name.endsWith(".json")){
    c=c.replace(/"([^"]+)":/g,'<span class="str">"$1"</span>:').replace(/: "([^"]+)"/g,': <span class="val">"$1"</span>');
  }else if(name.endsWith(".html")){
    c=c.replace(/&lt;(\\\\\\\/?)([a-zA-Z0-9]+)/g,'&lt;$1<span class="tag">$2</span>').replace(/([a-zA-Z0-9-]+)=/g,'<span class="attr">$1</span>=').replace(/"([^"]*)"/g,'<span class="str">"$1"</span>');
  }else{
    c=c.replace(/(import|export|from|const|let|async|await|return|function|default|null|false|true|chrome|console|document|window|alert|if|else|switch|case|break)\\b/g,'<span class="kw">$1</span>');
    c=c.replace(/\\/\\/.*$/gm,'<span class="cm">$&</span>');
    c=c.replace(/\\'([^\\']*)\\'/g,'<span class="str">\\'$1\\'</span>').replace(/"([^"]*)"/g,'<span class="str">"$1"</span>');
  }
  return c;
}
function showFile(i){
  cur=i;
  document.getElementById("tabs").innerHTML = files.map((f,idx)=>'<div class="file-tab'+(idx===i?' active':'')+'" onclick="showFile('+idx+')">'+f.icon+' '+f.name+'</div>').join('');
  document.getElementById("curFile").textContent = files[i].icon+" "+files[i].name;
  document.getElementById("codeBlock").innerHTML = hl(files[i].code,files[i].name);
}
function copyCode(){
  navigator.clipboard.writeText(files[cur].code).then(()=>{
    const b=document.querySelector(".copy-btn");
    b.textContent="✅ Copied!";
    setTimeout(()=>b.textContent="📋 Copy File",2000);
  });
}
showFile(0);
<\/script></body></html>\`;
}

`;

if (!code.includes('function getHTML(')) {
  code = code.replace('function getSwaggerCode', getHtmlCode + 'function getSwaggerCode');
}

// Replace getSwaggerCode
code = code.replace(/function getSwaggerCode\(\)\{return `([^]*?)`;\}/m, "function getSwaggerCode() { return getHTML('OpenAPI / Swagger', '📘', 'Complete REST API specification', [{name: 'openapi.yaml', icon: '📝', code: `$1`}]); }");

// Replace getGraphqlCode
code = code.replace(/function getGraphqlCode\(\)\{return `# GraphQL Schema Definition([^]*?)`;\}/m, "function getGraphqlCode() { return getHTML('GraphQL Schema', '🔷', 'Complete GraphQL Types and Queries', [{name: 'schema.graphql', icon: '🔷', code: `# GraphQL Schema Definition$1`}]); }");

// Replace getRateLimitCode
code = code.replace(/function getRateLimitCode\(\)\{return `\/\/ Rate Limiter Implementation([^]*?)`;\}/m, "function getRateLimitCode() { return getHTML('Rate Limiter', '⚡', 'Token Bucket & Sliding Window logic', [{name: 'rate-limiter.js', icon: '⚡', code: `// Rate Limiter Implementation$1`}]); }");

// Replace getJwtCode
code = code.replace(/function getJwtCode\(\)\{return `\/\/ JWT Authentication System([^]*?)`;\}/m, "function getJwtCode() { return getHTML('JWT Auth Flow', '🔐', 'Login, Validation and Refresh Token system', [{name: 'jwt-auth.js', icon: '🔐', code: `// JWT Authentication System$1`}]); }");

fs.writeFileSync(path, code);
console.log("Successfully refactored api-design-studio.js");
