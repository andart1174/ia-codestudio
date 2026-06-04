const fs = require('fs');

const dockerHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Docker Compose Builder</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}
h2{color:#0ea5e9;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}
.output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#a5b4fc;overflow:auto;white-space:pre}
label{display:flex;align-items:center;gap:10px;font-size:14px;color:#cbd5e1;cursor:pointer;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155;transition:0.2s}
label:hover{border-color:#0ea5e9} input[type=checkbox]{accent-color:#0ea5e9;width:18px;height:18px;cursor:pointer}
.btn{background:#0ea5e9;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}
.btn:active{transform:scale(0.98)}</style></head>
<body><h2>🐳 Docker Compose Builder</h2>
<div class="split">  <div class="panel">
    <label><input type="checkbox" id="svc_node" checked> Node.js App (Port 3000)</label>
    <label><input type="checkbox" id="svc_pg" checked> PostgreSQL Database</label>
    <label><input type="checkbox" id="svc_redis"> Redis Cache</label>
    <label><input type="checkbox" id="svc_nginx"> Nginx Reverse Proxy</label>
    <button class="btn" onclick="generate()">🔄 Generate YAML</button>  </div>
  <div class="output" id="out"></div></div>
<script>
function generate() {
  let y = "version: '3.8'\\nservices:\\n";
  if(document.getElementById('svc_node').checked) {
    y += "  app:\\n    build: .\\n    container_name: my_app\\n    restart: unless-stopped\\n    ports:\\n      - \\"3000:3000\\"\\n    environment:\\n      - NODE_ENV=production\\n";
    if(document.getElementById('svc_pg').checked) y += "      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\\n";
    if(document.getElementById('svc_redis').checked) y += "      - REDIS_URL=redis://redis:6379\\n";
    if(document.getElementById('svc_pg').checked || document.getElementById('svc_redis').checked) {
      y += "    depends_on:\\n";
      if(document.getElementById('svc_pg').checked) y += "      - db\\n";
      if(document.getElementById('svc_redis').checked) y += "      - redis\\n";
    }
  }
  if(document.getElementById('svc_pg').checked) {
    y += "\\n  db:\\n    image: postgres:15-alpine\\n    container_name: my_postgres\\n    restart: unless-stopped\\n    environment:\\n      POSTGRES_USER: user\\n      POSTGRES_PASSWORD: pass\\n      POSTGRES_DB: mydb\\n    volumes:\\n      - postgres_data:/var/lib/postgresql/data\\n";
  }
  if(document.getElementById('svc_redis').checked) {
    y += "\\n  redis:\\n    image: redis:7-alpine\\n    container_name: my_redis\\n    restart: unless-stopped\\n    volumes:\\n      - redis_data:/data\\n";
  }
  if(document.getElementById('svc_nginx').checked) {
    y += "\\n  nginx:\\n    image: nginx:alpine\\n    container_name: my_nginx\\n    restart: unless-stopped\\n    ports:\\n      - \\"80:80\\"\\n      - \\"443:443\\"\\n    volumes:\\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\\n";
    if(document.getElementById('svc_node').checked) y += "    depends_on:\\n      - app\\n";
  }
  let v = [];  if(document.getElementById('svc_pg').checked) v.push("  postgres_data:");  if(document.getElementById('svc_redis').checked) v.push("  redis_data:");
  if(v.length > 0) y += "\\nvolumes:\\n" + v.join("\\n") + "\\n";
  document.getElementById('out').textContent = y;
}
generate();
<\/script></body></html>`;

const dockerfileHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Dockerfile Builder</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}
h2{color:#14b8a6;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}
.output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#34d399;overflow:auto;white-space:pre}
label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#94a3b8;font-weight:bold}
select,input{background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-size:13px;outline:none}
select:focus,input:focus{border-color:#14b8a6}
.btn{background:#14b8a6;color:#000;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}
.btn:active{transform:scale(0.98)}</style></head>
<body><h2>📦 Dockerfile Builder</h2>
<div class="split">  <div class="panel">
    <label>Base Image <select id="base"><option value="node">Node.js (Alpine)</option><option value="python">Python (Slim)</option></select></label>
    <label>Working Directory <input type="text" id="workdir" value="/app"></label>
    <label>Exposed Port <input type="text" id="port" value="3000"></label>
    <label>Start Command <input type="text" id="cmd" value='npm start'></label>
    <button class="btn" onclick="generate()">🔄 Generate Dockerfile</button>  </div>
  <div class="output" id="out"></div></div>
<script>
function generate() {
  const base = document.getElementById('base').value;
  const wd = document.getElementById('workdir').value;
  const port = document.getElementById('port').value;
  const cmd = document.getElementById('cmd').value.split(' ').map(s=>'"'+s+'"').join(', ');
  let d = "# Auto-generated Multi-stage Dockerfile\\n\\n";
  if(base === 'node') {
    d += "# Stage 1: Build\\nFROM node:20-alpine AS builder\\nWORKDIR "+wd+"\\nCOPY package*.json ./\\nRUN npm ci --only=production\\nCOPY . .\\nRUN npm run build\\n\\n";
    d += "# Stage 2: Production\\nFROM node:20-alpine AS production\\nWORKDIR "+wd+"\\n\\n# Run as non-root user\\nRUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001\\n";
    d += "COPY --from=builder --chown=nodejs:nodejs "+wd+"/dist ./dist\\nCOPY --from=builder --chown=nodejs:nodejs "+wd+"/node_modules ./node_modules\\nCOPY --from=builder "+wd+"/package.json ./\\n\\n";
  } else {
    d += "# Python Stage\\nFROM python:3.11-slim\\nWORKDIR "+wd+"\\n\\n# Run as non-root user\\nRUN useradd -m appuser\\n";
    d += "COPY requirements.txt ./\\nRUN pip install --no-cache-dir -r requirements.txt\\nCOPY . .\\nRUN chown -R appuser:appuser "+wd+"\\n";
  }
  d += "USER " + (base==='node'?'nodejs':'appuser') + "\\n\\nEXPOSE "+port+"\\n\\nCMD [" + cmd + "]\\n";
  document.getElementById('out').textContent = d;
}
document.getElementById('base').onchange=()=>{if(document.getElementById('base').value==='python'){document.getElementById('port').value='8000';document.getElementById('cmd').value='python app.py';}else{document.getElementById('port').value='3000';document.getElementById('cmd').value='npm start';};generate();};
generate();
<\/script></body></html>`;

const cicdHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CI/CD Pipeline</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}
h2{color:#8b5cf6;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}
.output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#c4b5fd;overflow:auto;white-space:pre}
label{display:flex;align-items:center;gap:10px;font-size:14px;color:#cbd5e1;cursor:pointer;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155}
input[type=checkbox]{accent-color:#8b5cf6;width:18px;height:18px}
.btn{background:#8b5cf6;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}
.btn:active{transform:scale(0.98)}
.node{background:#0f172a;border:2px solid #334155;padding:10px 15px;border-radius:8px;font-weight:bold;color:#64748b;display:flex;align-items:center;gap:10px;margin-bottom:10px;transition:0.3s}
.node.active{border-color:#8b5cf6;color:#fff;background:#2e1065}
.node.done{border-color:#10b981;color:#10b981;background:#064e3b}</style></head>
<body><h2>🚀 CI/CD Pipeline Simulator</h2>
<div class="split">  <div class="panel">
    <label><input type="checkbox" id="c_lint" checked> Code Linting</label>
    <label><input type="checkbox" id="c_test" checked> Unit Tests</label>
    <label><input type="checkbox" id="c_build" checked> Docker Build & Push</label>
    <label><input type="checkbox" id="c_deploy"> SSH Deploy</label>
    <button class="btn" onclick="runSim()">▶ Run Pipeline Simulator</button>
    <button class="btn" style="background:#334155" onclick="document.getElementById('out').style.display='block';document.getElementById('viz').style.display='none';generate();">📝 View YAML</button>  </div>
  <div class="output" id="viz">    <div class="node" id="n_checkout">📦 Checkout Code</div>    <div class="node" id="n_lint" style="display:none">🧹 Run Linter</div>    <div class="node" id="n_test" style="display:none">🧪 Run Tests</div>    <div class="node" id="n_build" style="display:none">🐳 Build Docker Image</div>    <div class="node" id="n_deploy" style="display:none">🚀 Deploy to Prod</div>  </div>
  <div class="output" id="out" style="display:none"></div></div>
<script>
function runSim() {
  document.getElementById('viz').style.display='block'; document.getElementById('out').style.display='none';
  const steps = ['checkout'];  if(document.getElementById('c_lint').checked) steps.push('lint');  if(document.getElementById('c_test').checked) steps.push('test');  if(document.getElementById('c_build').checked) steps.push('build');  if(document.getElementById('c_deploy').checked) steps.push('deploy');
  document.querySelectorAll('.node').forEach(n => { n.className='node'; n.style.display='none'; n.textContent = n.textContent.replace('✅ ',''); });
  steps.forEach(s => document.getElementById('n_'+s).style.display='flex');
  let i = 0;  function next() {    if(i > 0) { let prev=document.getElementById('n_'+steps[i-1]); prev.className='node done'; prev.textContent='✅ '+prev.textContent; }    if(i < steps.length) { document.getElementById('n_'+steps[i]).className='node active'; i++; setTimeout(next, 800); }  }  next();
}
function generate() {
  let y = "name: CI/CD Pipeline\\non:\\n  push:\\n    branches: [main]\\n\\njobs:\\n  build:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - name: Checkout\\n        uses: actions/checkout@v4\\n";
  if(document.getElementById('c_lint').checked) y += "\\n      - name: Setup Node\\n        uses: actions/setup-node@v4\\n      - run: npm ci\\n      - run: npm run lint\\n";
  if(document.getElementById('c_test').checked) y += "\\n      - name: Run Tests\\n        run: npm run test\\n";
  if(document.getElementById('c_build').checked) y += "\\n      - name: Build & Push Docker\\n        uses: docker/build-push-action@v5\\n        with:\\n          push: true\\n          tags: myrepo/app:latest\\n";
  if(document.getElementById('c_deploy').checked) y += "\\n      - name: Deploy via SSH\\n        uses: appleboy/ssh-action@v1\\n        with:\\n          host: $\\{{ secrets.HOST }}\\n          key: $\\{{ secrets.SSH_KEY }}\\n          script: docker-compose pull && docker-compose up -d\\n";
  document.getElementById('out').textContent = y.replace(/\\$\\\{\\{/g, '${{');
}
runSim();
<\/script></body></html>`;

const nginxHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Nginx Generator</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}
h2{color:#10b981;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}
.output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#34d399;overflow:auto;white-space:pre}
label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#94a3b8;font-weight:bold}
.cb-label{flex-direction:row;align-items:center;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155;cursor:pointer}
input[type=text]{background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-size:13px;outline:none}
input[type=text]:focus{border-color:#10b981} input[type=checkbox]{accent-color:#10b981;width:18px;height:18px}
.btn{background:#10b981;color:#000;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}
.btn:active{transform:scale(0.98)}</style></head>
<body><h2>🌐 Nginx Config Generator</h2>
<div class="split">  <div class="panel">
    <label>Domain Name <input type="text" id="domain" value="api.myapp.com"></label>
    <label>Upstream Port <input type="text" id="port" value="3000"></label>
    <label class="cb-label"><input type="checkbox" id="ssl" checked> Enable SSL (Certbot)</label>
    <label class="cb-label"><input type="checkbox" id="gzip" checked> Enable GZIP</label>
    <button class="btn" onclick="generate()">🔄 Generate Config</button>  </div>
  <div class="output" id="out"></div></div>
<script>
function generate() {
  const d = document.getElementById('domain').value;
  const p = document.getElementById('port').value;
  const ssl = document.getElementById('ssl').checked;
  const gzip = document.getElementById('gzip').checked;
  let c = "# Nginx Configuration for "+d+"\\n\\nupstream backend {\\n  server 127.0.0.1:"+p+";\\n  keepalive 32;\\n}\\n\\n";
  if(ssl) {
    c += "server {\\n  listen 80;\\n  server_name "+d+";\\n  return 301 https://$host$request_uri;\\n}\\n\\n";
    c += "server {\\n  listen 443 ssl http2;\\n  server_name "+d+";\\n\\n  ssl_certificate /etc/letsencrypt/live/"+d+"/fullchain.pem;\\n  ssl_certificate_key /etc/letsencrypt/live/"+d+"/privkey.pem;\\n\\n";
  } else {
    c += "server {\\n  listen 80;\\n  server_name "+d+";\\n\\n";
  }
  if(gzip) c += "  gzip on;\\n  gzip_types text/plain application/json application/javascript text/css;\\n\\n";
  c += "  location / {\\n    proxy_pass http://backend;\\n    proxy_set_header Host $host;\\n    proxy_set_header X-Real-IP $remote_addr;\\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\\n  }\\n}\\n";
  document.getElementById('out').textContent = c;
}
generate();
<\/script></body></html>`;

// Test parsing the HTML files themselves. If they have errors, Node would throw when parsing the template literals, but we used backticks.

// Function to safely inject Base64 string logic
function b64Inject(funcName, htmlContent) {
  let b64 = Buffer.from(htmlContent).toString('base64');
  return `function ${funcName}() { return decodeURIComponent(escape(atob("${b64}"))); }`;
}

let newDockerCode = b64Inject('getDockerCode', dockerHtml);
let newDockerfileCode = b64Inject('getDockerfileCode', dockerfileHtml);
let newCicdCode = b64Inject('getCicdCode', cicdHtml);
let newNginxCode = b64Inject('getNginxCode', nginxHtml);

const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/devops-studio.js";
let code = fs.readFileSync(path, 'utf8');

// The file currently has getDockerCode to getEnvCode wrapped in getHTML structure because of transform_devops_studio2.js
// Wait, my previous transform_devops_studio2.js did:
// let dStart = code.indexOf('function getHTML('); ...
// Actually let's just find the first "function getDockerCode" and "function getEnvCode"
let dStart = code.indexOf('function getHTML(');
if (dStart === -1) {
  dStart = code.indexOf('function getDockerCode');
}
let envStart = code.indexOf('function getEnvCode');

if (dStart !== -1 && envStart !== -1) {
  let newCode = code.substring(0, dStart) + 
    newDockerCode + "\n\n" + 
    newDockerfileCode + "\n\n" + 
    newCicdCode + "\n\n" + 
    newNginxCode + "\n\n" + 
    code.substring(envStart);
  
  fs.writeFileSync(path, newCode);
  console.log("Successfully transformed DevOps Studio to pristine Interactive HTML Base64 applications.");
} else {
  console.error("Could not find function indices.");
}
