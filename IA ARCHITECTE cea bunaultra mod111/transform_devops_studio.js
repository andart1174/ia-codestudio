const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/devops-studio.js";
let code = fs.readFileSync(path, 'utf8');

const getDockerHtml = "function getDockerCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Docker Compose Builder</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}\n" +
"h2{color:#0ea5e9;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}\n" +
".panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}\n" +
".output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#a5b4fc;overflow:auto;white-space:pre}\n" +
"label{display:flex;align-items:center;gap:10px;font-size:14px;color:#cbd5e1;cursor:pointer;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155;transition:0.2s}\n" +
"label:hover{border-color:#0ea5e9} input[type=checkbox]{accent-color:#0ea5e9;width:18px;height:18px;cursor:pointer}\n" +
".btn{background:#0ea5e9;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}\n" +
".btn:active{transform:scale(0.98)}</style></head>\n" +
"<body>\n<h2>🐳 Docker Compose Builder</h2>\n" +
"<div class=\"split\">\n  <div class=\"panel\">\n" +
"    <label><input type=\"checkbox\" id=\"svc_node\" checked> Node.js App (Port 3000)</label>\n" +
"    <label><input type=\"checkbox\" id=\"svc_pg\" checked> PostgreSQL Database</label>\n" +
"    <label><input type=\"checkbox\" id=\"svc_redis\"> Redis Cache</label>\n" +
"    <label><input type=\"checkbox\" id=\"svc_nginx\"> Nginx Reverse Proxy</label>\n" +
"    <button class=\"btn\" onclick=\"generate()\">🔄 Generate YAML</button>\n  </div>\n" +
"  <div class=\"output\" id=\"out\"></div>\n</div>\n" +
"<script>\n" +
"function generate() {\n" +
"  let y = \"version: '3.8'\\nservices:\\n\";\n" +
"  if(document.getElementById('svc_node').checked) {\n" +
"    y += \"  app:\\n    build: .\\n    container_name: my_app\\n    restart: unless-stopped\\n    ports:\\n      - \\\"3000:3000\\\"\\n    environment:\\n      - NODE_ENV=production\\n\";\n" +
"    if(document.getElementById('svc_pg').checked) y += \"      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\\n\";\n" +
"    if(document.getElementById('svc_redis').checked) y += \"      - REDIS_URL=redis://redis:6379\\n\";\n" +
"    if(document.getElementById('svc_pg').checked || document.getElementById('svc_redis').checked) {\n" +
"      y += \"    depends_on:\\n\";\n" +
"      if(document.getElementById('svc_pg').checked) y += \"      - db\\n\";\n" +
"      if(document.getElementById('svc_redis').checked) y += \"      - redis\\n\";\n" +
"    }\n  }\n" +
"  if(document.getElementById('svc_pg').checked) {\n" +
"    y += \"\\n  db:\\n    image: postgres:15-alpine\\n    container_name: my_postgres\\n    restart: unless-stopped\\n    environment:\\n      POSTGRES_USER: user\\n      POSTGRES_PASSWORD: pass\\n      POSTGRES_DB: mydb\\n    volumes:\\n      - postgres_data:/var/lib/postgresql/data\\n\";\n" +
"  }\n" +
"  if(document.getElementById('svc_redis').checked) {\n" +
"    y += \"\\n  redis:\\n    image: redis:7-alpine\\n    container_name: my_redis\\n    restart: unless-stopped\\n    volumes:\\n      - redis_data:/data\\n\";\n" +
"  }\n" +
"  if(document.getElementById('svc_nginx').checked) {\n" +
"    y += \"\\n  nginx:\\n    image: nginx:alpine\\n    container_name: my_nginx\\n    restart: unless-stopped\\n    ports:\\n      - \\\"80:80\\\"\\n      - \\\"443:443\\\"\\n    volumes:\\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\\n\";\n" +
"    if(document.getElementById('svc_node').checked) y += \"    depends_on:\\n      - app\\n\";\n" +
"  }\n" +
"  let v = [];\n  if(document.getElementById('svc_pg').checked) v.push(\"  postgres_data:\");\n  if(document.getElementById('svc_redis').checked) v.push(\"  redis_data:\");\n" +
"  if(v.length > 0) y += \"\\nvolumes:\\n\" + v.join(\"\\n\") + \"\\n\";\n" +
"  document.getElementById('out').textContent = y;\n" +
"}\n" +
"generate();\n" +
"<\\/script></body></html>`;}";


const getDockerfileHtml = "function getDockerfileCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Dockerfile Builder</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}\n" +
"h2{color:#14b8a6;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}\n" +
".panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}\n" +
".output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#34d399;overflow:auto;white-space:pre}\n" +
"label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#94a3b8;font-weight:bold}\n" +
"select,input{background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-size:13px;outline:none}\n" +
"select:focus,input:focus{border-color:#14b8a6}\n" +
".btn{background:#14b8a6;color:#000;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}\n" +
".btn:active{transform:scale(0.98)}</style></head>\n" +
"<body>\n<h2>📦 Dockerfile Builder</h2>\n" +
"<div class=\"split\">\n  <div class=\"panel\">\n" +
"    <label>Base Image <select id=\"base\"><option value=\"node\">Node.js (Alpine)</option><option value=\"python\">Python (Slim)</option></select></label>\n" +
"    <label>Working Directory <input type=\"text\" id=\"workdir\" value=\"/app\"></label>\n" +
"    <label>Exposed Port <input type=\"text\" id=\"port\" value=\"3000\"></label>\n" +
"    <label>Start Command <input type=\"text\" id=\"cmd\" value='npm start'></label>\n" +
"    <button class=\"btn\" onclick=\"generate()\">🔄 Generate Dockerfile</button>\n  </div>\n" +
"  <div class=\"output\" id=\"out\"></div>\n</div>\n" +
"<script>\n" +
"function generate() {\n" +
"  const base = document.getElementById('base').value;\n" +
"  const wd = document.getElementById('workdir').value;\n" +
"  const port = document.getElementById('port').value;\n" +
"  const cmd = document.getElementById('cmd').value.split(' ').map(s=>'\"'+s+'\"').join(', ');\n" +
"  let d = \"# Auto-generated Multi-stage Dockerfile\\n\\n\";\n" +
"  if(base === 'node') {\n" +
"    d += \"# Stage 1: Build\\nFROM node:20-alpine AS builder\\nWORKDIR \"+wd+\"\\nCOPY package*.json ./\\nRUN npm ci --only=production\\nCOPY . .\\nRUN npm run build\\n\\n\";\n" +
"    d += \"# Stage 2: Production\\nFROM node:20-alpine AS production\\nWORKDIR \"+wd+\"\\n\\n# Run as non-root user\\nRUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001\\n\";\n" +
"    d += \"COPY --from=builder --chown=nodejs:nodejs \"+wd+\"/dist ./dist\\nCOPY --from=builder --chown=nodejs:nodejs \"+wd+\"/node_modules ./node_modules\\nCOPY --from=builder \"+wd+\"/package.json ./\\n\\n\";\n" +
"  } else {\n" +
"    d += \"# Python Stage\\nFROM python:3.11-slim\\nWORKDIR \"+wd+\"\\n\\n# Run as non-root user\\nRUN useradd -m appuser\\n\";\n" +
"    d += \"COPY requirements.txt ./\\nRUN pip install --no-cache-dir -r requirements.txt\\nCOPY . .\\nRUN chown -R appuser:appuser \"+wd+\"\\n\";\n" +
"  }\n" +
"  d += \"USER \" + (base==='node'?'nodejs':'appuser') + \"\\n\\nEXPOSE \"+port+\"\\n\\nCMD [\" + cmd + \"]\\n\";\n" +
"  document.getElementById('out').textContent = d;\n" +
"}\n" +
"document.getElementById('base').onchange=()=>{if(document.getElementById('base').value==='python'){document.getElementById('port').value='8000';document.getElementById('cmd').value='python app.py';}else{document.getElementById('port').value='3000';document.getElementById('cmd').value='npm start';};generate();};\n" +
"generate();\n" +
"<\\/script></body></html>`;}";


const getCicdHtml = "function getCicdCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>CI/CD Pipeline</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}\n" +
"h2{color:#8b5cf6;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}\n" +
".panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}\n" +
".output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#c4b5fd;overflow:auto;white-space:pre}\n" +
"label{display:flex;align-items:center;gap:10px;font-size:14px;color:#cbd5e1;cursor:pointer;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155}\n" +
"input[type=checkbox]{accent-color:#8b5cf6;width:18px;height:18px}\n" +
".btn{background:#8b5cf6;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}\n" +
".btn:active{transform:scale(0.98)}\n" +
".node{background:#0f172a;border:2px solid #334155;padding:10px 15px;border-radius:8px;font-weight:bold;color:#64748b;display:flex;align-items:center;gap:10px;margin-bottom:10px;transition:0.3s}\n" +
".node.active{border-color:#8b5cf6;color:#fff;background:#2e1065}\n" +
".node.done{border-color:#10b981;color:#10b981;background:#064e3b}</style></head>\n" +
"<body>\n<h2>🚀 CI/CD Pipeline Simulator</h2>\n" +
"<div class=\"split\">\n  <div class=\"panel\">\n" +
"    <label><input type=\"checkbox\" id=\"c_lint\" checked> Code Linting</label>\n" +
"    <label><input type=\"checkbox\" id=\"c_test\" checked> Unit Tests</label>\n" +
"    <label><input type=\"checkbox\" id=\"c_build\" checked> Docker Build & Push</label>\n" +
"    <label><input type=\"checkbox\" id=\"c_deploy\"> SSH Deploy</label>\n" +
"    <button class=\"btn\" onclick=\"runSim()\">▶ Run Pipeline Simulator</button>\n" +
"    <button class=\"btn\" style=\"background:#334155\" onclick=\"document.getElementById('out').style.display='block';document.getElementById('viz').style.display='none';generate();\">📝 View YAML</button>\n  </div>\n" +
"  <div class=\"output\" id=\"viz\">\n    <div class=\"node\" id=\"n_checkout\">📦 Checkout Code</div>\n    <div class=\"node\" id=\"n_lint\" style=\"display:none\">🧹 Run Linter</div>\n    <div class=\"node\" id=\"n_test\" style=\"display:none\">🧪 Run Tests</div>\n    <div class=\"node\" id=\"n_build\" style=\"display:none\">🐳 Build Docker Image</div>\n    <div class=\"node\" id=\"n_deploy\" style=\"display:none\">🚀 Deploy to Prod</div>\n  </div>\n" +
"  <div class=\"output\" id=\"out\" style=\"display:none\"></div>\n</div>\n" +
"<script>\n" +
"function runSim() {\n" +
"  document.getElementById('viz').style.display='block'; document.getElementById('out').style.display='none';\n" +
"  const steps = ['checkout'];\n  if(document.getElementById('c_lint').checked) steps.push('lint');\n  if(document.getElementById('c_test').checked) steps.push('test');\n  if(document.getElementById('c_build').checked) steps.push('build');\n  if(document.getElementById('c_deploy').checked) steps.push('deploy');\n" +
"  document.querySelectorAll('.node').forEach(n => { n.className='node'; n.style.display='none'; n.textContent = n.textContent.replace('✅ ',''); });\n" +
"  steps.forEach(s => document.getElementById('n_'+s).style.display='flex');\n" +
"  let i = 0;\n  function next() {\n    if(i > 0) { let prev=document.getElementById('n_'+steps[i-1]); prev.className='node done'; prev.textContent='✅ '+prev.textContent; }\n    if(i < steps.length) { document.getElementById('n_'+steps[i]).className='node active'; i++; setTimeout(next, 800); }\n  }\n  next();\n" +
"}\n" +
"function generate() {\n" +
"  let y = \"name: CI/CD Pipeline\\non:\\n  push:\\n    branches: [main]\\n\\njobs:\\n  build:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - name: Checkout\\n        uses: actions/checkout@v4\\n\";\n" +
"  if(document.getElementById('c_lint').checked) y += \"\\n      - name: Setup Node\\n        uses: actions/setup-node@v4\\n      - run: npm ci\\n      - run: npm run lint\\n\";\n" +
"  if(document.getElementById('c_test').checked) y += \"\\n      - name: Run Tests\\n        run: npm run test\\n\";\n" +
"  if(document.getElementById('c_build').checked) y += \"\\n      - name: Build & Push Docker\\n        uses: docker/build-push-action@v5\\n        with:\\n          push: true\\n          tags: myrepo/app:latest\\n\";\n" +
"  if(document.getElementById('c_deploy').checked) y += \"\\n      - name: Deploy via SSH\\n        uses: appleboy/ssh-action@v1\\n        with:\\n          host: $\\{{ secrets.HOST }}\\n          key: $\\{{ secrets.SSH_KEY }}\\n          script: docker-compose pull && docker-compose up -d\\n\";\n" +
"  document.getElementById('out').textContent = y;\n" +
"}\n" +
"runSim();\n" +
"<\\/script></body></html>`;}";


const getNginxHtml = "function getNginxCode(){return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Nginx Generator</title>\n" +
"<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:30px;height:100vh;display:flex;flex-direction:column}\n" +
"h2{color:#10b981;margin-bottom:20px;display:flex;align-items:center;gap:10px} .split{display:flex;gap:20px;flex:1;overflow:hidden}\n" +
".panel{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:25px;width:350px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}\n" +
".output{background:#020617;border:1px solid #334155;border-radius:12px;padding:20px;flex:1;font-family:monospace;font-size:13px;color:#34d399;overflow:auto;white-space:pre}\n" +
"label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#94a3b8;font-weight:bold}\n" +
".cb-label{flex-direction:row;align-items:center;padding:10px;background:#0f172a;border-radius:8px;border:1px solid #334155;cursor:pointer}\n" +
"input[type=text]{background:#0f172a;border:1px solid #475569;color:#fff;padding:10px;border-radius:6px;font-size:13px;outline:none}\n" +
"input[type=text]:focus{border-color:#10b981} input[type=checkbox]{accent-color:#10b981;width:18px;height:18px}\n" +
".btn{background:#10b981;color:#000;border:none;padding:12px;border-radius:8px;font-weight:900;cursor:pointer;margin-top:10px;font-size:14px}\n" +
".btn:active{transform:scale(0.98)}</style></head>\n" +
"<body>\n<h2>🌐 Nginx Config Generator</h2>\n" +
"<div class=\"split\">\n  <div class=\"panel\">\n" +
"    <label>Domain Name <input type=\"text\" id=\"domain\" value=\"api.myapp.com\"></label>\n" +
"    <label>Upstream Port <input type=\"text\" id=\"port\" value=\"3000\"></label>\n" +
"    <label class=\"cb-label\"><input type=\"checkbox\" id=\"ssl\" checked> Enable SSL (Certbot)</label>\n" +
"    <label class=\"cb-label\"><input type=\"checkbox\" id=\"gzip\" checked> Enable GZIP</label>\n" +
"    <button class=\"btn\" onclick=\"generate()\">🔄 Generate Config</button>\n  </div>\n" +
"  <div class=\"output\" id=\"out\"></div>\n</div>\n" +
"<script>\n" +
"function generate() {\n" +
"  const d = document.getElementById('domain').value;\n" +
"  const p = document.getElementById('port').value;\n" +
"  const ssl = document.getElementById('ssl').checked;\n" +
"  const gzip = document.getElementById('gzip').checked;\n" +
"  let c = \"# Nginx Configuration for \"+d+\"\\n\\nupstream backend {\\n  server 127.0.0.1:\"+p+\";\\n  keepalive 32;\\n}\\n\\n\";\n" +
"  if(ssl) {\n" +
"    c += \"server {\\n  listen 80;\\n  server_name \"+d+\";\\n  return 301 https://$host$request_uri;\\n}\\n\\n\";\n" +
"    c += \"server {\\n  listen 443 ssl http2;\\n  server_name \"+d+\";\\n\\n  ssl_certificate /etc/letsencrypt/live/\"+d+\"/fullchain.pem;\\n  ssl_certificate_key /etc/letsencrypt/live/\"+d+\"/privkey.pem;\\n\\n\";\n" +
"  } else {\n" +
"    c += \"server {\\n  listen 80;\\n  server_name \"+d+\";\\n\\n\";\n" +
"  }\n" +
"  if(gzip) c += \"  gzip on;\\n  gzip_types text/plain application/json application/javascript text/css;\\n\\n\";\n" +
"  c += \"  location / {\\n    proxy_pass http://backend;\\n    proxy_set_header Host $host;\\n    proxy_set_header X-Real-IP $remote_addr;\\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\\n  }\\n}\\n\";\n" +
"  document.getElementById('out').textContent = c;\n" +
"}\n" +
"generate();\n" +
"<\\/script></body></html>`;}";


// Replace the four generator functions by doing substring extraction.
let dStart = code.indexOf('function getDockerCode');
let envStart = code.indexOf('function getEnvCode');

if (dStart !== -1 && envStart !== -1) {
  let newCode = code.substring(0, dStart) + 
    getDockerHtml + "\n\n" + 
    getDockerfileHtml + "\n\n" + 
    getCicdHtml + "\n\n" + 
    getNginxHtml + "\n\n" + 
    code.substring(envStart);
  
  fs.writeFileSync(path, newCode);
  console.log("Successfully transformed DevOps Studio components to HTML apps.");
} else {
  console.error("Could not find function indices.");
}
