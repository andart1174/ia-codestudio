const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/devops-studio.js";
let code = fs.readFileSync(path, 'utf8');

const getHtmlHelper = `function getHTML(title, emoji, desc, files) {
  const fStr = JSON.stringify(files.map(f=>({name:f.name,icon:f.icon,code:f.code})));
  const b64 = typeof btoa !== 'undefined' ? btoa(encodeURIComponent(fStr)) : (typeof Buffer !== 'undefined' ? Buffer.from(encodeURIComponent(fStr)).toString('base64') : '');
  return \`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>\${title}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}h1{color:#0ea5e9;padding:16px 20px;font-size:18px;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px;flex-shrink:0}.file-tabs{display:flex;gap:0;border-bottom:1px solid #1e293b;overflow-x:auto;flex-shrink:0;background:#020617}.file-tab{padding:10px 16px;cursor:pointer;font-size:12px;font-weight:600;color:#64748b;border-bottom:2px solid transparent;white-space:nowrap;transition:0.2s;display:flex;align-items:center;gap:5px}.file-tab.active{color:#0ea5e9;border-bottom-color:#0ea5e9;background:#0f172a}.file-tab:hover{color:#94a3b8}.code-area{flex:1;overflow:auto;position:relative}.toolbar{background:#1e293b;padding:8px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;flex-shrink:0}.toolbar-left{display:flex;align-items:center;gap:10px}.badge{background:#0ea5e922;color:#0ea5e9;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:bold}.copy-btn{background:#0ea5e9;border:none;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;transition:0.2s}.copy-btn:hover{background:#0284c7}pre{padding:20px;font-family:"Fira Code",Consolas,monospace;font-size:13px;line-height:1.7;overflow:auto;color:#e2e8f0;white-space:pre-wrap;word-break:break-all}.kw{color:#818cf8}.fn{color:#34d399}.str{color:#fb923c}.cm{color:#475569;font-style:italic}.num{color:#f472b6}.punc{color:#94a3b8}.tag{color:#60a5fa}.attr{color:#34d399}.val{color:#fb923c}</style></head><body>
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
    c=c.replace(/\\/\\/.*$/gm,'<span class="cm">$$&</span>');
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
}`;

const getDockerCodeStr = `function getDockerCode(){ return getHTML('Docker Compose Generator', '🐳', 'Multi-service environment setup', [{name: 'docker-compose.yml', icon: '🐳', code: \`version: '3.8'
services:
  app:
    build: .
    container_name: my_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    container_name: my_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: my_redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: my_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/conf:/etc/letsencrypt
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge\`
}]); }`;

const getDockerfileCodeStr = `function getDockerfileCode(){ return getHTML('Dockerfile Builder', '📦', 'Optimized multi-stage Dockerfile', [{name: 'Dockerfile', icon: '📦', code: \`# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs \\
    && adduser -S nextjs -u 1001

# Copy built assets from builder
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/server.js"]\`
}]); }`;

const getCicdCodeStr = `function getCicdCode(){ return getHTML('CI/CD Pipeline', '🚀', 'GitHub Actions workflow', [{name: 'pipeline.yml', icon: '🚀', code: \`name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: $\{{ github.repository }}

jobs:
  # --- 1. TEST ---
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: $\{{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # --- 2. BUILD & PUSH ---
  build:
    name: Build Docker Image
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: $\{{ env.REGISTRY }}
          username: $\{{ github.actor }}
          password: $\{{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: $\{{ env.REGISTRY }}/$\{{ env.IMAGE_NAME }}:latest

  # --- 3. DEPLOY ---
  deploy:
    name: Deploy to Production
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: $\{{ secrets.SERVER_HOST }}
          username: $\{{ secrets.SERVER_USER }}
          key: $\{{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f
            echo "✅ Deployment complete!"\`
}]); }`;

const getNginxCodeStr = `function getNginxCode(){ return getHTML('Nginx Config', '🌐', 'Reverse proxy configuration', [{name: 'nginx.conf', icon: '🌐', code: \`# Nginx Reverse Proxy Configuration
# Place at: /etc/nginx/nginx.conf

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" ';
    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # Upstream App Servers (Load Balancing)
    upstream app_backend {
        least_conn;
        server app1:3000;
        server app2:3000;
        keepalive 32;
    }

    # HTTP -> HTTPS redirect
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        return 301 https://$host$request_uri;
    }

    # HTTPS Main Server
    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_session_cache shared:SSL:10m;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000" always;

        # API Proxy
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static Files Cache
        location /static/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        location / {
            proxy_pass http://app_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
        }
    }
}\`
}]); }`;

// Find where functions begin
let dStart = code.indexOf('function getDockerCode');
let envStart = code.indexOf('function getEnvCode');

if (dStart !== -1 && envStart !== -1) {
  let newCode = code.substring(0, dStart) + 
    getHtmlHelper + "\n\n" +
    getDockerCodeStr + "\n\n" + 
    getDockerfileCodeStr + "\n\n" + 
    getCicdCodeStr + "\n\n" + 
    getNginxCodeStr + "\n\n" + 
    code.substring(envStart);
  
  fs.writeFileSync(path, newCode);
  console.log("Successfully reverted DevOps Studio to properly wrappered syntax-highlighted code output.");
} else {
  console.error("Could not find function indices.");
}
