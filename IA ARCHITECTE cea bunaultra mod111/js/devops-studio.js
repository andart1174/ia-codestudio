(function(){
'use strict';
const TX={en:{title:'DEVOPS STUDIO',sub:'Infrastructure & Deployment Generator',back:'← Back',injected:'✅ Injected!',tools:{
  docker:{name:'Docker Compose Generator',desc:'Generate multi-service docker-compose.yml (Node + DB + Redis + Nginx).',injectBtn:'🐳 Inject docker-compose.yml'},
  dockerfile:{name:'Dockerfile Builder',desc:'Generate optimized multi-stage Dockerfiles for Node/Python/Go.',injectBtn:'📦 Inject Dockerfile'},
  cicd:{name:'CI/CD Pipeline Builder',desc:'Generate GitHub Actions workflow with build, test and deploy steps.',injectBtn:'⚙️ Inject Workflow YAML'},
  nginx:{name:'Nginx Config Generator',desc:'Generate reverse proxy, SSL and load balancing configuration.',injectBtn:'🌐 Inject nginx.conf'},
  env:{name:'ENV Manager',desc:'Generate .env and .env.example files with validation boilerplate.',injectBtn:'🔒 Inject .env Template'},
  health:{name:'Server Health Dashboard',desc:'Generate a live server monitoring UI (CPU/RAM/Disk/Uptime).',injectBtn:'📊 Inject Health Dashboard'}
}},fr:{title:'STUDIO DEVOPS',sub:'Générateur d\'Infrastructure & Déploiement',back:'← Retour',injected:'✅ Injecté!',tools:{
  docker:{name:'Générateur Docker Compose',desc:'Générez docker-compose.yml multi-services (Node + DB + Redis + Nginx).',injectBtn:'🐳 Injecter docker-compose.yml'},
  dockerfile:{name:'Constructeur Dockerfile',desc:'Générez des Dockerfiles multi-étapes optimisés.',injectBtn:'📦 Injecter Dockerfile'},
  cicd:{name:'Générateur CI/CD',desc:'Générez un workflow GitHub Actions avec build, test et deploy.',injectBtn:'⚙️ Injecter Workflow YAML'},
  nginx:{name:'Config Nginx',desc:'Générez reverse proxy, SSL et configuration load balancing.',injectBtn:'🌐 Injecter nginx.conf'},
  env:{name:'Gestionnaire ENV',desc:'Générez .env et .env.example avec boilerplate de validation.',injectBtn:'🔒 Injecter Template .env'},
  health:{name:'Dashboard Santé Serveur',desc:'Générez une UI de monitoring serveur live (CPU/RAM/Disk/Uptime).',injectBtn:'📊 Injecter Health Dashboard'}
}}};
function gl(){return window.appLang||'en';}
window._injectDevOpsCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='devopsstudio'){window.activeTab='devopsstudio';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-devopsstudio');if(b)b.classList.add('active');window.initDevOpsStudio(gl());return;}
  if(typeof _o==='function')_o(tab);
};
window.initDevOpsStudio=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[
    {id:'docker',icon:'🐳',color:'#0ea5e9'},
    {id:'dockerfile',icon:'📦',color:'#14b8a6'},
    {id:'cicd',icon:'⚙️',color:'#8b5cf6'},
    {id:'nginx',icon:'🌐',color:'#10b981'},
    {id:'env',icon:'🔒',color:'#f59e0b'},
    {id:'health',icon:'📊',color:'#ec4899'}
  ];
  el.innerHTML=`<div style="padding:15px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;">
    <div style="background:linear-gradient(135deg,rgba(14,165,233,0.1),rgba(2,132,199,0.1));border-radius:14px;padding:16px;border:1px solid rgba(14,165,233,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:32px;filter:drop-shadow(0 0 10px #0ea5e9);">🐳</span>
      <div><h2 style="margin:0;color:#7dd3fc;font-size:16px;font-weight:900;">${t.title}</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">${t.sub}</p></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${tools.map(tool=>`<div onclick="window.handleDevOpsTool('${tool.id}')" style="background:rgba(15,23,42,0.8);border:1px solid ${tool.color}44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor='${tool.color}';this.style.boxShadow='0 0 15px ${tool.color}33';" onmouseout="this.style.borderColor='${tool.color}44';this.style.boxShadow='none';">
        <div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:${tool.color}18;border-radius:10px;">${tool.icon}</div>
        <div style="flex:1;"><div style="color:${tool.color};font-weight:800;font-size:13px;">${t.tools[tool.id].name}</div><div style="color:#64748b;font-size:10px;margin-top:3px;">${t.tools[tool.id].desc}</div></div>
      </div>`).join('')}
    </div></div>`;
};
window.handleDevOpsTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={docker:'#0ea5e9',dockerfile:'#14b8a6',cicd:'#8b5cf6',nginx:'#10b981',env:'#f59e0b',health:'#ec4899'};
  const icons={docker:'🐳',dockerfile:'📦',cicd:'⚙️',nginx:'🌐',env:'🔒',health:'📊'};
  const codeMap={docker:getDockerCode(),dockerfile:getDockerfileCode(),cicd:getCicdCode(),nginx:getNginxCode(),env:getEnvCode(),health:getHealthCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML=`<div style="padding:15px;font-family:'Inter',sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;">
    <button onclick="window.initDevOpsStudio('${lang}')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">${t.back}</button>
    <h3 style="color:${color};margin:0 0 5px;font-size:15px;font-weight:800;">${icon} ${tx.name}</h3>
    <p style="color:#64748b;font-size:11px;margin:0 0 20px;">${tx.desc}</p>
    <div style="background:#0f172a;border:1px dashed ${color};border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
      <div style="font-size:40px;margin-bottom:10px;">${icon}</div>
      <div style="color:#94a3b8;font-size:12px;">${lang==='fr'?'Prêt à injecter dans l\'éditeur':'Ready to inject into the editor'}</div>
    </div>
    <button id="btnInject${toolId}" style="width:100%;padding:12px;border-radius:8px;background:${color};border:none;color:#000;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px ${color}55;">${tx.injectBtn}</button>
  </div>`;
  document.getElementById('btnInject'+toolId).addEventListener('click',()=>window._injectDevOpsCode(codeMap[toolId]));
};

function getDockerCode() { return decodeURIComponent(escape(atob("77u/PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48dGl0bGU+RG9ja2VyIENvbXBvc2UgQnVpbGRlcjwvdGl0bGU+CjxzdHlsZT4qe2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW46MDtwYWRkaW5nOjB9Ym9keXtiYWNrZ3JvdW5kOiMwZjE3MmE7Y29sb3I6I2ZmZjtmb250LWZhbWlseTpJbnRlcixzYW5zLXNlcmlmO3BhZGRpbmc6MzBweDtoZWlnaHQ6MTAwdmg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0KaDJ7Y29sb3I6IzBlYTVlOTttYXJnaW4tYm90dG9tOjIwcHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTBweH0gLnNwbGl0e2Rpc3BsYXk6ZmxleDtnYXA6MjBweDtmbGV4OjE7b3ZlcmZsb3c6aGlkZGVufQoucGFuZWx7YmFja2dyb3VuZDojMWUyOTNiO2JvcmRlcjoxcHggc29saWQgIzMzNDE1NTtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzoyNXB4O3dpZHRoOjM1MHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjE1cHg7b3ZlcmZsb3cteTphdXRvfQoub3V0cHV0e2JhY2tncm91bmQ6IzAyMDYxNztib3JkZXI6MXB4IHNvbGlkICMzMzQxNTU7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MjBweDtmbGV4OjE7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiNhNWI0ZmM7b3ZlcmZsb3c6YXV0bzt3aGl0ZS1zcGFjZTpwcmV9CmxhYmVse2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEwcHg7Zm9udC1zaXplOjE0cHg7Y29sb3I6I2NiZDVlMTtjdXJzb3I6cG9pbnRlcjtwYWRkaW5nOjEwcHg7YmFja2dyb3VuZDojMGYxNzJhO2JvcmRlci1yYWRpdXM6OHB4O2JvcmRlcjoxcHggc29saWQgIzMzNDE1NTt0cmFuc2l0aW9uOjAuMnN9CmxhYmVsOmhvdmVye2JvcmRlci1jb2xvcjojMGVhNWU5fSBpbnB1dFt0eXBlPWNoZWNrYm94XXthY2NlbnQtY29sb3I6IzBlYTVlOTt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2N1cnNvcjpwb2ludGVyfQouYnRue2JhY2tncm91bmQ6IzBlYTVlOTtjb2xvcjojZmZmO2JvcmRlcjpub25lO3BhZGRpbmc6MTJweDtib3JkZXItcmFkaXVzOjhweDtmb250LXdlaWdodDo5MDA7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLXRvcDoxMHB4O2ZvbnQtc2l6ZToxNHB4fQouYnRuOmFjdGl2ZXt0cmFuc2Zvcm06c2NhbGUoMC45OCl9PC9zdHlsZT48L2hlYWQ+Cjxib2R5PjxoMj7wn5CzIERvY2tlciBDb21wb3NlIEJ1aWxkZXI8L2gyPgo8ZGl2IGNsYXNzPSJzcGxpdCI+ICA8ZGl2IGNsYXNzPSJwYW5lbCI+CiAgICA8bGFiZWw+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0ic3ZjX25vZGUiIGNoZWNrZWQ+IE5vZGUuanMgQXBwIChQb3J0IDMwMDApPC9sYWJlbD4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJzdmNfcGciIGNoZWNrZWQ+IFBvc3RncmVTUUwgRGF0YWJhc2U8L2xhYmVsPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9InN2Y19yZWRpcyI+IFJlZGlzIENhY2hlPC9sYWJlbD4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJzdmNfbmdpbngiPiBOZ2lueCBSZXZlcnNlIFByb3h5PC9sYWJlbD4KICAgIDxidXR0b24gY2xhc3M9ImJ0biIgb25jbGljaz0iZ2VuZXJhdGUoKSI+8J+UhCBHZW5lcmF0ZSBZQU1MPC9idXR0b24+ICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJvdXRwdXQiIGlkPSJvdXQiPjwvZGl2PjwvZGl2Pgo8c2NyaXB0PgpmdW5jdGlvbiBnZW5lcmF0ZSgpIHsKICBsZXQgeSA9ICJ2ZXJzaW9uOiAnMy44J1xuc2VydmljZXM6XG4iOwogIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmNfbm9kZScpLmNoZWNrZWQpIHsKICAgIHkgKz0gIiAgYXBwOlxuICAgIGJ1aWxkOiAuXG4gICAgY29udGFpbmVyX25hbWU6IG15X2FwcFxuICAgIHJlc3RhcnQ6IHVubGVzcy1zdG9wcGVkXG4gICAgcG9ydHM6XG4gICAgICAtIFwiMzAwMDozMDAwXCJcbiAgICBlbnZpcm9ubWVudDpcbiAgICAgIC0gTk9ERV9FTlY9cHJvZHVjdGlvblxuIjsKICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmNfcGcnKS5jaGVja2VkKSB5ICs9ICIgICAgICAtIERBVEFCQVNFX1VSTD1wb3N0Z3Jlc3FsOi8vdXNlcjpwYXNzQGRiOjU0MzIvbXlkYlxuIjsKICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmNfcmVkaXMnKS5jaGVja2VkKSB5ICs9ICIgICAgICAtIFJFRElTX1VSTD1yZWRpczovL3JlZGlzOjYzNzlcbiI7CiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3BnJykuY2hlY2tlZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3JlZGlzJykuY2hlY2tlZCkgewogICAgICB5ICs9ICIgICAgZGVwZW5kc19vbjpcbiI7CiAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmNfcGcnKS5jaGVja2VkKSB5ICs9ICIgICAgICAtIGRiXG4iOwogICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3JlZGlzJykuY2hlY2tlZCkgeSArPSAiICAgICAgLSByZWRpc1xuIjsKICAgIH0KICB9CiAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N2Y19wZycpLmNoZWNrZWQpIHsKICAgIHkgKz0gIlxuICBkYjpcbiAgICBpbWFnZTogcG9zdGdyZXM6MTUtYWxwaW5lXG4gICAgY29udGFpbmVyX25hbWU6IG15X3Bvc3RncmVzXG4gICAgcmVzdGFydDogdW5sZXNzLXN0b3BwZWRcbiAgICBlbnZpcm9ubWVudDpcbiAgICAgIFBPU1RHUkVTX1VTRVI6IHVzZXJcbiAgICAgIFBPU1RHUkVTX1BBU1NXT1JEOiBwYXNzXG4gICAgICBQT1NUR1JFU19EQjogbXlkYlxuICAgIHZvbHVtZXM6XG4gICAgICAtIHBvc3RncmVzX2RhdGE6L3Zhci9saWIvcG9zdGdyZXNxbC9kYXRhXG4iOwogIH0KICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3JlZGlzJykuY2hlY2tlZCkgewogICAgeSArPSAiXG4gIHJlZGlzOlxuICAgIGltYWdlOiByZWRpczo3LWFscGluZVxuICAgIGNvbnRhaW5lcl9uYW1lOiBteV9yZWRpc1xuICAgIHJlc3RhcnQ6IHVubGVzcy1zdG9wcGVkXG4gICAgdm9sdW1lczpcbiAgICAgIC0gcmVkaXNfZGF0YTovZGF0YVxuIjsKICB9CiAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N2Y19uZ2lueCcpLmNoZWNrZWQpIHsKICAgIHkgKz0gIlxuICBuZ2lueDpcbiAgICBpbWFnZTogbmdpbng6YWxwaW5lXG4gICAgY29udGFpbmVyX25hbWU6IG15X25naW54XG4gICAgcmVzdGFydDogdW5sZXNzLXN0b3BwZWRcbiAgICBwb3J0czpcbiAgICAgIC0gXCI4MDo4MFwiXG4gICAgICAtIFwiNDQzOjQ0M1wiXG4gICAgdm9sdW1lczpcbiAgICAgIC0gLi9uZ2lueC5jb25mOi9ldGMvbmdpbngvbmdpbnguY29uZjpyb1xuIjsKICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmNfbm9kZScpLmNoZWNrZWQpIHkgKz0gIiAgICBkZXBlbmRzX29uOlxuICAgICAgLSBhcHBcbiI7CiAgfQogIGxldCB2ID0gW107ICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3BnJykuY2hlY2tlZCkgdi5wdXNoKCIgIHBvc3RncmVzX2RhdGE6Iik7ICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZjX3JlZGlzJykuY2hlY2tlZCkgdi5wdXNoKCIgIHJlZGlzX2RhdGE6Iik7CiAgaWYodi5sZW5ndGggPiAwKSB5ICs9ICJcbnZvbHVtZXM6XG4iICsgdi5qb2luKCJcbiIpICsgIlxuIjsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0JykudGV4dENvbnRlbnQgPSB5Owp9CmdlbmVyYXRlKCk7Cjwvc2NyaXB0PjwvYm9keT48L2h0bWw+DQo="))); }

function getDockerfileCode() { return decodeURIComponent(escape(atob("77u/PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48dGl0bGU+RG9ja2VyZmlsZSBCdWlsZGVyPC90aXRsZT4KPHN0eWxlPip7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbjowO3BhZGRpbmc6MH1ib2R5e2JhY2tncm91bmQ6IzBmMTcyYTtjb2xvcjojZmZmO2ZvbnQtZmFtaWx5OkludGVyLHNhbnMtc2VyaWY7cGFkZGluZzozMHB4O2hlaWdodDoxMDB2aDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufQpoMntjb2xvcjojMTRiOGE2O21hcmdpbi1ib3R0b206MjBweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4fSAuc3BsaXR7ZGlzcGxheTpmbGV4O2dhcDoyMHB4O2ZsZXg6MTtvdmVyZmxvdzpoaWRkZW59Ci5wYW5lbHtiYWNrZ3JvdW5kOiMxZTI5M2I7Ym9yZGVyOjFweCBzb2xpZCAjMzM0MTU1O2JvcmRlci1yYWRpdXM6MTJweDtwYWRkaW5nOjI1cHg7d2lkdGg6MzUwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTVweDtvdmVyZmxvdy15OmF1dG99Ci5vdXRwdXR7YmFja2dyb3VuZDojMDIwNjE3O2JvcmRlcjoxcHggc29saWQgIzMzNDE1NTtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzoyMHB4O2ZsZXg6MTtmb250LWZhbWlseTptb25vc3BhY2U7Zm9udC1zaXplOjEzcHg7Y29sb3I6IzM0ZDM5OTtvdmVyZmxvdzphdXRvO3doaXRlLXNwYWNlOnByZX0KbGFiZWx7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NXB4O2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM5NGEzYjg7Zm9udC13ZWlnaHQ6Ym9sZH0Kc2VsZWN0LGlucHV0e2JhY2tncm91bmQ6IzBmMTcyYTtib3JkZXI6MXB4IHNvbGlkICM0NzU1Njk7Y29sb3I6I2ZmZjtwYWRkaW5nOjEwcHg7Ym9yZGVyLXJhZGl1czo2cHg7Zm9udC1zaXplOjEzcHg7b3V0bGluZTpub25lfQpzZWxlY3Q6Zm9jdXMsaW5wdXQ6Zm9jdXN7Ym9yZGVyLWNvbG9yOiMxNGI4YTZ9Ci5idG57YmFja2dyb3VuZDojMTRiOGE2O2NvbG9yOiMwMDA7Ym9yZGVyOm5vbmU7cGFkZGluZzoxMnB4O2JvcmRlci1yYWRpdXM6OHB4O2ZvbnQtd2VpZ2h0OjkwMDtjdXJzb3I6cG9pbnRlcjttYXJnaW4tdG9wOjEwcHg7Zm9udC1zaXplOjE0cHh9Ci5idG46YWN0aXZle3RyYW5zZm9ybTpzY2FsZSgwLjk4KX08L3N0eWxlPjwvaGVhZD4KPGJvZHk+PGgyPvCfk6YgRG9ja2VyZmlsZSBCdWlsZGVyPC9oMj4KPGRpdiBjbGFzcz0ic3BsaXQiPiAgPGRpdiBjbGFzcz0icGFuZWwiPgogICAgPGxhYmVsPkJhc2UgSW1hZ2UgPHNlbGVjdCBpZD0iYmFzZSI+PG9wdGlvbiB2YWx1ZT0ibm9kZSI+Tm9kZS5qcyAoQWxwaW5lKTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9InB5dGhvbiI+UHl0aG9uIChTbGltKTwvb3B0aW9uPjwvc2VsZWN0PjwvbGFiZWw+CiAgICA8bGFiZWw+V29ya2luZyBEaXJlY3RvcnkgPGlucHV0IHR5cGU9InRleHQiIGlkPSJ3b3JrZGlyIiB2YWx1ZT0iL2FwcCI+PC9sYWJlbD4KICAgIDxsYWJlbD5FeHBvc2VkIFBvcnQgPGlucHV0IHR5cGU9InRleHQiIGlkPSJwb3J0IiB2YWx1ZT0iMzAwMCI+PC9sYWJlbD4KICAgIDxsYWJlbD5TdGFydCBDb21tYW5kIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iY21kIiB2YWx1ZT0nbnBtIHN0YXJ0Jz48L2xhYmVsPgogICAgPGJ1dHRvbiBjbGFzcz0iYnRuIiBvbmNsaWNrPSJnZW5lcmF0ZSgpIj7wn5SEIEdlbmVyYXRlIERvY2tlcmZpbGU8L2J1dHRvbj4gIDwvZGl2PgogIDxkaXYgY2xhc3M9Im91dHB1dCIgaWQ9Im91dCI+PC9kaXY+PC9kaXY+CjxzY3JpcHQ+CmZ1bmN0aW9uIGdlbmVyYXRlKCkgewogIGNvbnN0IGJhc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFzZScpLnZhbHVlOwogIGNvbnN0IHdkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtkaXInKS52YWx1ZTsKICBjb25zdCBwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcnQnKS52YWx1ZTsKICBjb25zdCBjbWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY21kJykudmFsdWUuc3BsaXQoJyAnKS5tYXAocz0+JyInK3MrJyInKS5qb2luKCcsICcpOwogIGxldCBkID0gIiMgQXV0by1nZW5lcmF0ZWQgTXVsdGktc3RhZ2UgRG9ja2VyZmlsZVxuXG4iOwogIGlmKGJhc2UgPT09ICdub2RlJykgewogICAgZCArPSAiIyBTdGFnZSAxOiBCdWlsZFxuRlJPTSBub2RlOjIwLWFscGluZSBBUyBidWlsZGVyXG5XT1JLRElSICIrd2QrIlxuQ09QWSBwYWNrYWdlKi5qc29uIC4vXG5SVU4gbnBtIGNpIC0tb25seT1wcm9kdWN0aW9uXG5DT1BZIC4gLlxuUlVOIG5wbSBydW4gYnVpbGRcblxuIjsKICAgIGQgKz0gIiMgU3RhZ2UgMjogUHJvZHVjdGlvblxuRlJPTSBub2RlOjIwLWFscGluZSBBUyBwcm9kdWN0aW9uXG5XT1JLRElSICIrd2QrIlxuXG4jIFJ1biBhcyBub24tcm9vdCB1c2VyXG5SVU4gYWRkZ3JvdXAgLWcgMTAwMSAtUyBub2RlanMgJiYgYWRkdXNlciAtUyBub2RlanMgLXUgMTAwMVxuIjsKICAgIGQgKz0gIkNPUFkgLS1mcm9tPWJ1aWxkZXIgLS1jaG93bj1ub2RlanM6bm9kZWpzICIrd2QrIi9kaXN0IC4vZGlzdFxuQ09QWSAtLWZyb209YnVpbGRlciAtLWNob3duPW5vZGVqczpub2RlanMgIit3ZCsiL25vZGVfbW9kdWxlcyAuL25vZGVfbW9kdWxlc1xuQ09QWSAtLWZyb209YnVpbGRlciAiK3dkKyIvcGFja2FnZS5qc29uIC4vXG5cbiI7CiAgfSBlbHNlIHsKICAgIGQgKz0gIiMgUHl0aG9uIFN0YWdlXG5GUk9NIHB5dGhvbjozLjExLXNsaW1cbldPUktESVIgIit3ZCsiXG5cbiMgUnVuIGFzIG5vbi1yb290IHVzZXJcblJVTiB1c2VyYWRkIC1tIGFwcHVzZXJcbiI7CiAgICBkICs9ICJDT1BZIHJlcXVpcmVtZW50cy50eHQgLi9cblJVTiBwaXAgaW5zdGFsbCAtLW5vLWNhY2hlLWRpciAtciByZXF1aXJlbWVudHMudHh0XG5DT1BZIC4gLlxuUlVOIGNob3duIC1SIGFwcHVzZXI6YXBwdXNlciAiK3dkKyJcbiI7CiAgfQogIGQgKz0gIlVTRVIgIiArIChiYXNlPT09J25vZGUnPydub2RlanMnOidhcHB1c2VyJykgKyAiXG5cbkVYUE9TRSAiK3BvcnQrIlxuXG5DTUQgWyIgKyBjbWQgKyAiXVxuIjsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0JykudGV4dENvbnRlbnQgPSBkOwp9CmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXNlJykub25jaGFuZ2U9KCk9PntpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFzZScpLnZhbHVlPT09J3B5dGhvbicpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3J0JykudmFsdWU9JzgwMDAnO2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbWQnKS52YWx1ZT0ncHl0aG9uIGFwcC5weSc7fWVsc2V7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcnQnKS52YWx1ZT0nMzAwMCc7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NtZCcpLnZhbHVlPSducG0gc3RhcnQnO307Z2VuZXJhdGUoKTt9OwpnZW5lcmF0ZSgpOwo8L3NjcmlwdD48L2JvZHk+PC9odG1sPg0K"))); }

function getCicdCode() { return decodeURIComponent(escape(atob("77u/PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48dGl0bGU+Q0kvQ0QgUGlwZWxpbmU8L3RpdGxlPgo8c3R5bGU+Kntib3gtc2l6aW5nOmJvcmRlci1ib3g7bWFyZ2luOjA7cGFkZGluZzowfWJvZHl7YmFja2dyb3VuZDojMGYxNzJhO2NvbG9yOiNmZmY7Zm9udC1mYW1pbHk6SW50ZXIsc2Fucy1zZXJpZjtwYWRkaW5nOjMwcHg7aGVpZ2h0OjEwMHZoO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Cmgye2NvbG9yOiM4YjVjZjY7bWFyZ2luLWJvdHRvbToyMHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEwcHh9IC5zcGxpdHtkaXNwbGF5OmZsZXg7Z2FwOjIwcHg7ZmxleDoxO292ZXJmbG93OmhpZGRlbn0KLnBhbmVse2JhY2tncm91bmQ6IzFlMjkzYjtib3JkZXI6MXB4IHNvbGlkICMzMzQxNTU7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MjVweDt3aWR0aDozNTBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2dhcDoxNXB4O292ZXJmbG93LXk6YXV0b30KLm91dHB1dHtiYWNrZ3JvdW5kOiMwMjA2MTc7Ym9yZGVyOjFweCBzb2xpZCAjMzM0MTU1O2JvcmRlci1yYWRpdXM6MTJweDtwYWRkaW5nOjIwcHg7ZmxleDoxO2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTNweDtjb2xvcjojYzRiNWZkO292ZXJmbG93OmF1dG87d2hpdGUtc3BhY2U6cHJlfQpsYWJlbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4O2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiNjYmQ1ZTE7Y3Vyc29yOnBvaW50ZXI7cGFkZGluZzoxMHB4O2JhY2tncm91bmQ6IzBmMTcyYTtib3JkZXItcmFkaXVzOjhweDtib3JkZXI6MXB4IHNvbGlkICMzMzQxNTV9CmlucHV0W3R5cGU9Y2hlY2tib3hde2FjY2VudC1jb2xvcjojOGI1Y2Y2O3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHh9Ci5idG57YmFja2dyb3VuZDojOGI1Y2Y2O2NvbG9yOiNmZmY7Ym9yZGVyOm5vbmU7cGFkZGluZzoxMnB4O2JvcmRlci1yYWRpdXM6OHB4O2ZvbnQtd2VpZ2h0OjkwMDtjdXJzb3I6cG9pbnRlcjttYXJnaW4tdG9wOjEwcHg7Zm9udC1zaXplOjE0cHh9Ci5idG46YWN0aXZle3RyYW5zZm9ybTpzY2FsZSgwLjk4KX0KLm5vZGV7YmFja2dyb3VuZDojMGYxNzJhO2JvcmRlcjoycHggc29saWQgIzMzNDE1NTtwYWRkaW5nOjEwcHggMTVweDtib3JkZXItcmFkaXVzOjhweDtmb250LXdlaWdodDpib2xkO2NvbG9yOiM2NDc0OGI7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MTBweDttYXJnaW4tYm90dG9tOjEwcHg7dHJhbnNpdGlvbjowLjNzfQoubm9kZS5hY3RpdmV7Ym9yZGVyLWNvbG9yOiM4YjVjZjY7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiMyZTEwNjV9Ci5ub2RlLmRvbmV7Ym9yZGVyLWNvbG9yOiMxMGI5ODE7Y29sb3I6IzEwYjk4MTtiYWNrZ3JvdW5kOiMwNjRlM2J9PC9zdHlsZT48L2hlYWQ+Cjxib2R5PjxoMj7wn5qAIENJL0NEIFBpcGVsaW5lIFNpbXVsYXRvcjwvaDI+CjxkaXYgY2xhc3M9InNwbGl0Ij4gIDxkaXYgY2xhc3M9InBhbmVsIj4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX2xpbnQiIGNoZWNrZWQ+IENvZGUgTGludGluZzwvbGFiZWw+CiAgICA8bGFiZWw+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iY190ZXN0IiBjaGVja2VkPiBVbml0IFRlc3RzPC9sYWJlbD4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX2J1aWxkIiBjaGVja2VkPiBEb2NrZXIgQnVpbGQgJiBQdXNoPC9sYWJlbD4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX2RlcGxveSI+IFNTSCBEZXBsb3k8L2xhYmVsPgogICAgPGJ1dHRvbiBjbGFzcz0iYnRuIiBvbmNsaWNrPSJydW5TaW0oKSI+4pa2IFJ1biBQaXBlbGluZSBTaW11bGF0b3I8L2J1dHRvbj4KICAgIDxidXR0b24gY2xhc3M9ImJ0biIgc3R5bGU9ImJhY2tncm91bmQ6IzMzNDE1NSIgb25jbGljaz0iZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndml6Jykuc3R5bGUuZGlzcGxheT0nbm9uZSc7Z2VuZXJhdGUoKTsiPvCfk50gVmlldyBZQU1MPC9idXR0b24+ICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJvdXRwdXQiIGlkPSJ2aXoiPiAgICA8ZGl2IGNsYXNzPSJub2RlIiBpZD0ibl9jaGVja291dCI+8J+TpiBDaGVja291dCBDb2RlPC9kaXY+ICAgIDxkaXYgY2xhc3M9Im5vZGUiIGlkPSJuX2xpbnQiIHN0eWxlPSJkaXNwbGF5Om5vbmUiPvCfp7kgUnVuIExpbnRlcjwvZGl2PiAgICA8ZGl2IGNsYXNzPSJub2RlIiBpZD0ibl90ZXN0IiBzdHlsZT0iZGlzcGxheTpub25lIj7wn6eqIFJ1biBUZXN0czwvZGl2PiAgICA8ZGl2IGNsYXNzPSJub2RlIiBpZD0ibl9idWlsZCIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+8J+QsyBCdWlsZCBEb2NrZXIgSW1hZ2U8L2Rpdj4gICAgPGRpdiBjbGFzcz0ibm9kZSIgaWQ9Im5fZGVwbG95IiBzdHlsZT0iZGlzcGxheTpub25lIj7wn5qAIERlcGxveSB0byBQcm9kPC9kaXY+ICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJvdXRwdXQiIGlkPSJvdXQiIHN0eWxlPSJkaXNwbGF5Om5vbmUiPjwvZGl2PjwvZGl2Pgo8c2NyaXB0PgpmdW5jdGlvbiBydW5TaW0oKSB7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpeicpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJzsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnOwogIGNvbnN0IHN0ZXBzID0gWydjaGVja291dCddOyAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NfbGludCcpLmNoZWNrZWQpIHN0ZXBzLnB1c2goJ2xpbnQnKTsgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjX3Rlc3QnKS5jaGVja2VkKSBzdGVwcy5wdXNoKCd0ZXN0Jyk7ICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY19idWlsZCcpLmNoZWNrZWQpIHN0ZXBzLnB1c2goJ2J1aWxkJyk7ICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY19kZXBsb3knKS5jaGVja2VkKSBzdGVwcy5wdXNoKCdkZXBsb3knKTsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9kZScpLmZvckVhY2gobiA9PiB7IG4uY2xhc3NOYW1lPSdub2RlJzsgbi5zdHlsZS5kaXNwbGF5PSdub25lJzsgbi50ZXh0Q29udGVudCA9IG4udGV4dENvbnRlbnQucmVwbGFjZSgn4pyFICcsJycpOyB9KTsKICBzdGVwcy5mb3JFYWNoKHMgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fJytzKS5zdHlsZS5kaXNwbGF5PSdmbGV4Jyk7CiAgbGV0IGkgPSAwOyAgZnVuY3Rpb24gbmV4dCgpIHsgICAgaWYoaSA+IDApIHsgbGV0IHByZXY9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fJytzdGVwc1tpLTFdKTsgcHJldi5jbGFzc05hbWU9J25vZGUgZG9uZSc7IHByZXYudGV4dENvbnRlbnQ9J+KchSAnK3ByZXYudGV4dENvbnRlbnQ7IH0gICAgaWYoaSA8IHN0ZXBzLmxlbmd0aCkgeyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl8nK3N0ZXBzW2ldKS5jbGFzc05hbWU9J25vZGUgYWN0aXZlJzsgaSsrOyBzZXRUaW1lb3V0KG5leHQsIDgwMCk7IH0gIH0gIG5leHQoKTsKfQpmdW5jdGlvbiBnZW5lcmF0ZSgpIHsKICBsZXQgeSA9ICJuYW1lOiBDSS9DRCBQaXBlbGluZVxub246XG4gIHB1c2g6XG4gICAgYnJhbmNoZXM6IFttYWluXVxuXG5qb2JzOlxuICBidWlsZDpcbiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0XG4gICAgc3RlcHM6XG4gICAgICAtIG5hbWU6IENoZWNrb3V0XG4gICAgICAgIHVzZXM6IGFjdGlvbnMvY2hlY2tvdXRAdjRcbiI7CiAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NfbGludCcpLmNoZWNrZWQpIHkgKz0gIlxuICAgICAgLSBuYW1lOiBTZXR1cCBOb2RlXG4gICAgICAgIHVzZXM6IGFjdGlvbnMvc2V0dXAtbm9kZUB2NFxuICAgICAgLSBydW46IG5wbSBjaVxuICAgICAgLSBydW46IG5wbSBydW4gbGludFxuIjsKICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY190ZXN0JykuY2hlY2tlZCkgeSArPSAiXG4gICAgICAtIG5hbWU6IFJ1biBUZXN0c1xuICAgICAgICBydW46IG5wbSBydW4gdGVzdFxuIjsKICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY19idWlsZCcpLmNoZWNrZWQpIHkgKz0gIlxuICAgICAgLSBuYW1lOiBCdWlsZCAmIFB1c2ggRG9ja2VyXG4gICAgICAgIHVzZXM6IGRvY2tlci9idWlsZC1wdXNoLWFjdGlvbkB2NVxuICAgICAgICB3aXRoOlxuICAgICAgICAgIHB1c2g6IHRydWVcbiAgICAgICAgICB0YWdzOiBteXJlcG8vYXBwOmxhdGVzdFxuIjsKICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY19kZXBsb3knKS5jaGVja2VkKSB5ICs9ICJcbiAgICAgIC0gbmFtZTogRGVwbG95IHZpYSBTU0hcbiAgICAgICAgdXNlczogYXBwbGVib3kvc3NoLWFjdGlvbkB2MVxuICAgICAgICB3aXRoOlxuICAgICAgICAgIGhvc3Q6ICR7eyBzZWNyZXRzLkhPU1QgfX1cbiAgICAgICAgICBrZXk6ICR7eyBzZWNyZXRzLlNTSF9LRVkgfX1cbiAgICAgICAgICBzY3JpcHQ6IGRvY2tlci1jb21wb3NlIHB1bGwgJiYgZG9ja2VyLWNvbXBvc2UgdXAgLWRcbiI7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dCcpLnRleHRDb250ZW50ID0geTsKfQpydW5TaW0oKTsKPC9zY3JpcHQ+PC9ib2R5PjwvaHRtbD4NCg=="))); }

function getNginxCode() { return decodeURIComponent(escape(atob("77u/PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48dGl0bGU+TmdpbnggR2VuZXJhdG9yPC90aXRsZT4KPHN0eWxlPip7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbjowO3BhZGRpbmc6MH1ib2R5e2JhY2tncm91bmQ6IzBmMTcyYTtjb2xvcjojZmZmO2ZvbnQtZmFtaWx5OkludGVyLHNhbnMtc2VyaWY7cGFkZGluZzozMHB4O2hlaWdodDoxMDB2aDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufQpoMntjb2xvcjojMTBiOTgxO21hcmdpbi1ib3R0b206MjBweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMHB4fSAuc3BsaXR7ZGlzcGxheTpmbGV4O2dhcDoyMHB4O2ZsZXg6MTtvdmVyZmxvdzpoaWRkZW59Ci5wYW5lbHtiYWNrZ3JvdW5kOiMxZTI5M2I7Ym9yZGVyOjFweCBzb2xpZCAjMzM0MTU1O2JvcmRlci1yYWRpdXM6MTJweDtwYWRkaW5nOjI1cHg7d2lkdGg6MzUwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTVweDtvdmVyZmxvdy15OmF1dG99Ci5vdXRwdXR7YmFja2dyb3VuZDojMDIwNjE3O2JvcmRlcjoxcHggc29saWQgIzMzNDE1NTtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzoyMHB4O2ZsZXg6MTtmb250LWZhbWlseTptb25vc3BhY2U7Zm9udC1zaXplOjEzcHg7Y29sb3I6IzM0ZDM5OTtvdmVyZmxvdzphdXRvO3doaXRlLXNwYWNlOnByZX0KbGFiZWx7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NXB4O2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM5NGEzYjg7Zm9udC13ZWlnaHQ6Ym9sZH0KLmNiLWxhYmVse2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzoxMHB4O2JhY2tncm91bmQ6IzBmMTcyYTtib3JkZXItcmFkaXVzOjhweDtib3JkZXI6MXB4IHNvbGlkICMzMzQxNTU7Y3Vyc29yOnBvaW50ZXJ9CmlucHV0W3R5cGU9dGV4dF17YmFja2dyb3VuZDojMGYxNzJhO2JvcmRlcjoxcHggc29saWQgIzQ3NTU2OTtjb2xvcjojZmZmO3BhZGRpbmc6MTBweDtib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6MTNweDtvdXRsaW5lOm5vbmV9CmlucHV0W3R5cGU9dGV4dF06Zm9jdXN7Ym9yZGVyLWNvbG9yOiMxMGI5ODF9IGlucHV0W3R5cGU9Y2hlY2tib3hde2FjY2VudC1jb2xvcjojMTBiOTgxO3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHh9Ci5idG57YmFja2dyb3VuZDojMTBiOTgxO2NvbG9yOiMwMDA7Ym9yZGVyOm5vbmU7cGFkZGluZzoxMnB4O2JvcmRlci1yYWRpdXM6OHB4O2ZvbnQtd2VpZ2h0OjkwMDtjdXJzb3I6cG9pbnRlcjttYXJnaW4tdG9wOjEwcHg7Zm9udC1zaXplOjE0cHh9Ci5idG46YWN0aXZle3RyYW5zZm9ybTpzY2FsZSgwLjk4KX08L3N0eWxlPjwvaGVhZD4KPGJvZHk+PGgyPvCfjJAgTmdpbnggQ29uZmlnIEdlbmVyYXRvcjwvaDI+CjxkaXYgY2xhc3M9InNwbGl0Ij4gIDxkaXYgY2xhc3M9InBhbmVsIj4KICAgIDxsYWJlbD5Eb21haW4gTmFtZSA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImRvbWFpbiIgdmFsdWU9ImFwaS5teWFwcC5jb20iPjwvbGFiZWw+CiAgICA8bGFiZWw+VXBzdHJlYW0gUG9ydCA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9InBvcnQiIHZhbHVlPSIzMDAwIj48L2xhYmVsPgogICAgPGxhYmVsIGNsYXNzPSJjYi1sYWJlbCI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0ic3NsIiBjaGVja2VkPiBFbmFibGUgU1NMIChDZXJ0Ym90KTwvbGFiZWw+CiAgICA8bGFiZWwgY2xhc3M9ImNiLWxhYmVsIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJnemlwIiBjaGVja2VkPiBFbmFibGUgR1pJUDwvbGFiZWw+CiAgICA8YnV0dG9uIGNsYXNzPSJidG4iIG9uY2xpY2s9ImdlbmVyYXRlKCkiPvCflIQgR2VuZXJhdGUgQ29uZmlnPC9idXR0b24+ICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJvdXRwdXQiIGlkPSJvdXQiPjwvZGl2PjwvZGl2Pgo8c2NyaXB0PgpmdW5jdGlvbiBnZW5lcmF0ZSgpIHsKICBjb25zdCBkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbWFpbicpLnZhbHVlOwogIGNvbnN0IHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9ydCcpLnZhbHVlOwogIGNvbnN0IHNzbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzc2wnKS5jaGVja2VkOwogIGNvbnN0IGd6aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3ppcCcpLmNoZWNrZWQ7CiAgbGV0IGMgPSAiIyBOZ2lueCBDb25maWd1cmF0aW9uIGZvciAiK2QrIlxuXG51cHN0cmVhbSBiYWNrZW5kIHtcbiAgc2VydmVyIDEyNy4wLjAuMToiK3ArIjtcbiAga2VlcGFsaXZlIDMyO1xufVxuXG4iOwogIGlmKHNzbCkgewogICAgYyArPSAic2VydmVyIHtcbiAgbGlzdGVuIDgwO1xuICBzZXJ2ZXJfbmFtZSAiK2QrIjtcbiAgcmV0dXJuIDMwMSBodHRwczovLyRob3N0JHJlcXVlc3RfdXJpO1xufVxuXG4iOwogICAgYyArPSAic2VydmVyIHtcbiAgbGlzdGVuIDQ0MyBzc2wgaHR0cDI7XG4gIHNlcnZlcl9uYW1lICIrZCsiO1xuXG4gIHNzbF9jZXJ0aWZpY2F0ZSAvZXRjL2xldHNlbmNyeXB0L2xpdmUvIitkKyIvZnVsbGNoYWluLnBlbTtcbiAgc3NsX2NlcnRpZmljYXRlX2tleSAvZXRjL2xldHNlbmNyeXB0L2xpdmUvIitkKyIvcHJpdmtleS5wZW07XG5cbiI7CiAgfSBlbHNlIHsKICAgIGMgKz0gInNlcnZlciB7XG4gIGxpc3RlbiA4MDtcbiAgc2VydmVyX25hbWUgIitkKyI7XG5cbiI7CiAgfQogIGlmKGd6aXApIGMgKz0gIiAgZ3ppcCBvbjtcbiAgZ3ppcF90eXBlcyB0ZXh0L3BsYWluIGFwcGxpY2F0aW9uL2pzb24gYXBwbGljYXRpb24vamF2YXNjcmlwdCB0ZXh0L2NzcztcblxuIjsKICBjICs9ICIgIGxvY2F0aW9uIC8ge1xuICAgIHByb3h5X3Bhc3MgaHR0cDovL2JhY2tlbmQ7XG4gICAgcHJveHlfc2V0X2hlYWRlciBIb3N0ICRob3N0O1xuICAgIHByb3h5X3NldF9oZWFkZXIgWC1SZWFsLUlQICRyZW1vdGVfYWRkcjtcbiAgICBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLUZvciAkcHJveHlfYWRkX3hfZm9yd2FyZGVkX2ZvcjtcbiAgfVxufVxuIjsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0JykudGV4dENvbnRlbnQgPSBjOwp9CmdlbmVyYXRlKCk7Cjwvc2NyaXB0PjwvYm9keT48L2h0bWw+DQo="))); }

function getEnvCode(){return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>ENV Manager</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px}
h1{color:#f59e0b;margin-bottom:20px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.box{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px}
h3{color:#f59e0b;margin-bottom:15px;font-size:14px;text-transform:uppercase;letter-spacing:1px}
.group{margin-bottom:20px}
.group-title{color:#64748b;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #334155}
.row{display:flex;gap:8px;margin-bottom:6px}
.row input{flex:1;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;font-size:12px}
.row input:focus{outline:none;border-color:#f59e0b}
button{padding:10px 20px;background:#f59e0b;border:none;border-radius:8px;color:#000;font-weight:bold;cursor:pointer;width:100%;margin-top:10px}
.output{background:#000;border:1px solid #334155;border-radius:8px;padding:15px;font-family:monospace;font-size:12px;color:#fcd34d;white-space:pre-wrap;height:400px;overflow-y:auto}
.comment{color:#64748b}
</style></head>
<body>
<h1>🔒 ENV Manager</h1>
<div class="grid">
<div class="box">
  <h3>Configuration</h3>
  <div class="group">
    <div class="group-title">App Settings</div>
    <div class="row"><input id="appName" placeholder="APP_NAME" value="my-app"><input id="appPort" placeholder="PORT" value="3000"></div>
    <div class="row"><input id="nodeEnv" placeholder="NODE_ENV" value="production"><input id="appUrl" placeholder="APP_URL" value="https://myapp.com"></div>
  </div>
  <div class="group">
    <div class="group-title">Database</div>
    <div class="row"><input id="dbHost" placeholder="DB_HOST" value="localhost"><input id="dbPort" placeholder="DB_PORT" value="5432"></div>
    <div class="row"><input id="dbName" placeholder="DB_NAME" value="mydb"><input id="dbUser" placeholder="DB_USER" value="postgres"></div>
  </div>
  <div class="group">
    <div class="group-title">Authentication</div>
    <div class="row"><input id="jwtSecret" placeholder="JWT_SECRET" value="your-super-secret-key-here"></div>
    <div class="row"><input id="jwtExpiry" placeholder="JWT_EXPIRY" value="7d"><input id="refreshExpiry" placeholder="REFRESH_EXPIRY" value="30d"></div>
  </div>
  <button onclick="generateEnv()">Generate .env Files</button>
</div>
<div class="box">
  <h3>.env / .env.example Output</h3>
  <div class="output" id="output"></div>
</div>
</div>
<script>
function v(id){return document.getElementById(id).value||'';}
function generateEnv(){
  const env=\`# ============================
# \${v('appName').toUpperCase()} ENVIRONMENT CONFIG
# Generated by DevOps Studio
# ============================

# App
APP_NAME=\${v('appName')}
NODE_ENV=\${v('nodeEnv')}
PORT=\${v('appPort')}
APP_URL=\${v('appUrl')}

# Database
DB_HOST=\${v('dbHost')}
DB_PORT=\${v('dbPort')}
DB_NAME=\${v('dbName')}
DB_USER=\${v('dbUser')}
DB_PASSWORD=CHANGE_ME_IN_PRODUCTION
DATABASE_URL=postgresql://\${v('dbUser')}:CHANGE_ME@\${v('dbHost')}:\${v('dbPort')}/\${v('dbName')}

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=\${v('jwtSecret')}
JWT_EXPIRY=\${v('jwtExpiry')}
REFRESH_TOKEN_EXPIRY=\${v('refreshExpiry')}

# External APIs (add your keys)
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG....
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1\`;
  document.getElementById('output').textContent=env;
}
generateEnv();
<\/script>
</body></html>`;}

function getHealthCode(){return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Server Health</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:30px}
h1{color:#ec4899;margin-bottom:5px}
.sub{color:#64748b;font-size:13px;margin-bottom:25px;display:flex;align-items:center;gap:8px}
.dot{width:8px;height:8px;background:#10b981;border-radius:50%;animation:p 1.5s infinite}
@keyframes p{0%,100%{opacity:1}50%{opacity:0.3}}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:25px}
.metric{background:#1e293b;border-radius:12px;padding:20px;border:1px solid #334155;text-align:center}
.metric-val{font-size:32px;font-weight:900;margin:10px 0}
.metric-label{color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px}
.bar-bg{background:#334155;border-radius:10px;height:6px;margin-top:10px}
.bar-fill{height:6px;border-radius:10px;transition:width 0.5s ease}
.services{background:#1e293b;border-radius:12px;border:1px solid #334155;overflow:hidden}
.svc-row{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-bottom:1px solid #334155}
.svc-row:last-child{border-bottom:none}
.badge{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold}
.up{background:#10b98122;color:#10b981}.down{background:#ef444422;color:#ef4444}.warn{background:#f59e0b22;color:#f59e0b}
</style></head>
<body>
<h1>📊 Server Health Dashboard</h1>
<p class="sub"><span class="dot"></span> Live monitoring — updates every 3s</p>
<div class="grid" id="metricsGrid"></div>
<h3 style="color:#fff;margin-bottom:12px">Services Status</h3>
<div class="services" id="servicesGrid"></div>
<script>
const services=[
  {name:'Web App (Node.js)',port:3000,status:'up'},
  {name:'PostgreSQL Database',port:5432,status:'up'},
  {name:'Redis Cache',port:6379,status:'up'},
  {name:'Nginx Proxy',port:443,status:'up'},
  {name:'Background Worker',port:null,status:'warn'}
];
function randBetween(a,b){return a+Math.random()*(b-a);}
function getColor(v,warn,danger){return v>danger?'#ef4444':v>warn?'#f59e0b':'#10b981';}
function update(){
  const cpu=randBetween(15,75),ram=randBetween(40,85),disk=randBetween(30,60),uptime=99.98;
  const metrics=[
    {label:'CPU',val:cpu.toFixed(1)+'%',color:getColor(cpu,60,80)},
    {label:'RAM',val:ram.toFixed(1)+'%',color:getColor(ram,70,90)},
    {label:'Disk',val:disk.toFixed(1)+'%',color:getColor(disk,70,90)},
    {label:'Uptime',val:uptime+'%',color:'#10b981'}
  ];
  document.getElementById('metricsGrid').innerHTML=metrics.map(m=>\`<div class="metric">
    <div class="metric-label">\${m.label}</div>
    <div class="metric-val" style="color:\${m.color}">\${m.val}</div>
    <div class="bar-bg"><div class="bar-fill" style="width:\${parseFloat(m.val)}%;background:\${m.color}"></div></div>
  </div>\`).join('');
  document.getElementById('servicesGrid').innerHTML=services.map(s=>\`<div class="svc-row">
    <div><strong>\${s.name}</strong>\${s.port?'<span style="color:#475569;font-size:12px;margin-left:8px">:\${s.port}</span>':''}</div>
    <div style="display:flex;align-items:center;gap:15px">
      <span style="color:#64748b;font-size:12px">\${s.status==='warn'?'High memory':s.status==='up'?randBetween(1,50).toFixed(0)+'ms':'Connection refused'}</span>
      <span class="badge \${s.status}">\${s.status.toUpperCase()}</span>
    </div>
  </div>\`).join('');
}
update();setInterval(update,3000);
<\/script>
</body></html>`;}

const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-devopsstudio');if(l)l.textContent=gl()==='fr'?'Studio DevOps':'DevOps Studio';if(window.activeTab==='devopsstudio')window.initDevOpsStudio(gl());};
console.log('🐳 DevOps Studio loaded!');
})();
