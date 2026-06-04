(function(){
'use strict';
const TX={en:{title:'BROWSER EXTENSION FORGE',sub:'Chrome & Firefox Extension Generator',back:'<- Back',injected:'Injected!',tools:{
  boilerplate:{name:'Extension Boilerplate Generator',desc:'Generate complete manifest.json + popup + background script structure.',injectBtn:'Generate Extension'},
  content:{name:'Content Script Builder',desc:'Inject JavaScript into any webpage to read or modify its content.',injectBtn:'Generate Content Script'},
  contextmenu:{name:'Context Menu Creator',desc:'Add custom right-click menu items that trigger your JavaScript code.',injectBtn:'Generate Context Menu'},
  storage:{name:'Storage Manager UI',desc:'Generate a settings panel using chrome.storage.sync with full CRUD.',injectBtn:'Generate Storage UI'},
  devtools:{name:'DevTools Panel Generator',desc:'Create a custom tab inside Chrome DevTools for debugging.',injectBtn:'Generate DevTools Panel'},
  popup:{name:'Popup UI Builder',desc:'Generate a beautiful, styled popup interface with tabs and controls.',injectBtn:'Generate Popup UI'}
}},fr:{title:'FORGE EXTENSIONS NAVIGATEUR',sub:'Generateur d\'Extensions Chrome & Firefox',back:'<- Retour',injected:'Injecte!',tools:{
  boilerplate:{name:'Generateur Boilerplate Extension',desc:'Generez manifest.json + popup + script background complets.',injectBtn:'Generer Extension'},
  content:{name:'Constructeur Script Contenu',desc:'Injectez du JavaScript dans n\'importe quelle page web.',injectBtn:'Generer Content Script'},
  contextmenu:{name:'Createur Menu Contextuel',desc:'Ajoutez des elements de menu clic-droit personnalises.',injectBtn:'Generer Menu Contextuel'},
  storage:{name:'UI Gestionnaire Storage',desc:'Panneau de parametres avec chrome.storage.sync et CRUD complet.',injectBtn:'Generer UI Storage'},
  devtools:{name:'Generateur Panel DevTools',desc:'Creez un onglet personnalise dans les DevTools de Chrome.',injectBtn:'Generer Panel DevTools'},
  popup:{name:'Constructeur UI Popup',desc:'Generez une interface popup avec onglets et controles.',injectBtn:'Generer UI Popup'}
}}};
function gl(){return window.appLang||'en';}
window._injectExtCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='extforge'){window.activeTab='extforge';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-extforge');if(b)b.classList.add('active');window.initExtForge(gl());return;}
  if(typeof _o==='function')_o(tab);
};
window.initExtForge=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'boilerplate',icon:'📦',color:'#14b8a6'},{id:'content',icon:'✏️',color:'#3b82f6'},{id:'contextmenu',icon:'🖱️',color:'#8b5cf6'},{id:'storage',icon:'💾',color:'#f59e0b'},{id:'devtools',icon:'🔧',color:'#ef4444'},{id:'popup',icon:'🪟',color:'#10b981'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(20,184,166,0.1),rgba(13,148,136,0.1));border-radius:14px;padding:16px;border:1px solid rgba(20,184,166,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #14b8a6);">🌎</span><div><h2 style="margin:0;color:#5eead4;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleExtTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleExtTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={boilerplate:'#14b8a6',content:'#3b82f6',contextmenu:'#8b5cf6',storage:'#f59e0b',devtools:'#ef4444',popup:'#10b981'};
  const icons={boilerplate:'📦',content:'✏️',contextmenu:'🖱️',storage:'💾',devtools:'🔧',popup:'🪟'};
  const codeMap={boilerplate:getBoilerplateCode(),content:getContentCode(),contextmenu:getContextMenuCode(),storage:getStorageCode(),devtools:getDevtoolsCode(),popup:getPopupCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initExtForge(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInjectExt'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#000;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInjectExt'+toolId).addEventListener('click',()=>window._injectExtCode(codeMap[toolId]));
};

function getHTML(title, emoji, desc, files) {
  const fStr = JSON.stringify(files.map(f=>({name:f.name,icon:f.icon,code:f.code})));
  const b64 = typeof btoa !== 'undefined' ? btoa(encodeURIComponent(fStr)) : (typeof Buffer !== 'undefined' ? Buffer.from(encodeURIComponent(fStr)).toString('base64') : '');
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}h1{color:#14b8a6;padding:16px 20px;font-size:18px;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px;flex-shrink:0}.file-tabs{display:flex;gap:0;border-bottom:1px solid #1e293b;overflow-x:auto;flex-shrink:0;background:#020617}.file-tab{padding:10px 16px;cursor:pointer;font-size:12px;font-weight:600;color:#64748b;border-bottom:2px solid transparent;white-space:nowrap;transition:0.2s;display:flex;align-items:center;gap:5px}.file-tab.active{color:#14b8a6;border-bottom-color:#14b8a6;background:#0f172a}.file-tab:hover{color:#94a3b8}.code-area{flex:1;overflow:auto;position:relative}.toolbar{background:#1e293b;padding:8px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;flex-shrink:0}.toolbar-left{display:flex;align-items:center;gap:10px}.badge{background:#14b8a622;color:#14b8a6;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:bold}.copy-btn{background:#14b8a6;border:none;color:#000;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;transition:0.2s}.copy-btn:hover{background:#0d9488}pre{padding:20px;font-family:"Fira Code",Consolas,monospace;font-size:13px;line-height:1.7;overflow:auto;color:#e2e8f0;white-space:pre-wrap;word-break:break-all}.kw{color:#818cf8}.fn{color:#34d399}.str{color:#fb923c}.cm{color:#475569;font-style:italic}.num{color:#f472b6}.punc{color:#94a3b8}.tag{color:#60a5fa}.attr{color:#34d399}.val{color:#fb923c}</style></head><body>
<h1>${emoji} ${title}<span style="font-size:12px;color:#64748b;font-weight:400">— ${desc}</span></h1>
<div class="file-tabs" id="tabs"></div>
<div class="toolbar"><div class="toolbar-left"><span id="curFile" class="badge"></span><span style="color:#64748b;font-size:11px">Click a tab to switch files</span></div><button class="copy-btn" onclick="copyCode()">📋 Copy File</button></div>
<div class="code-area"><pre id="codeBlock"></pre></div>
<script>
const files = JSON.parse(decodeURIComponent(atob('${b64}')));
let cur=0;
function hl(code,name){
  let c=code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  if(name.endsWith(".json")){
    c=c.replace(/"([^"]+)":/g,'<span class="str">"$1"</span>:').replace(/: "([^"]+)"/g,': <span class="val">"$1"</span>');
  }else if(name.endsWith(".html")){
    c=c.replace(/&lt;(\\\\\\/?)([a-zA-Z0-9]+)/g,'&lt;$1<span class="tag">$2</span>').replace(/([a-zA-Z0-9-]+)=/g,'<span class="attr">$1</span>=').replace(/"([^"]*)"/g,'<span class="str">"$1"</span>');
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
<\/script></body></html>`;
}

function getBoilerplateCode(){
const manifest = `{\n  "manifest_version": 3,\n  "name": "My Extension",\n  "version": "1.0.0",\n  "description": "A powerful Chrome extension built with Extension Forge",\n  "permissions": ["activeTab", "storage", "contextMenus", "notifications"],\n  "host_permissions": ["<all_urls>"],\n  "action": {\n    "default_popup": "popup/popup.html",\n    "default_icon": {\n      "16": "icons/icon16.png",\n      "48": "icons/icon48.png",\n      "128": "icons/icon128.png"\n    },\n    "default_title": "My Extension"\n  },\n  "background": {\n    "service_worker": "background/background.js"\n  },\n  "content_scripts": [\n    {\n      "matches": ["<all_urls>"],\n      "js": ["content/content.js"],\n      "css": ["content/content.css"],\n      "run_at": "document_idle"\n    }\n  ],\n  "options_page": "options/options.html",\n  "icons": {\n    "16": "icons/icon16.png",\n    "48": "icons/icon48.png",\n    "128": "icons/icon128.png"\n  }\n}`;
const bg = `chrome.runtime.onInstalled.addListener(() => {\n  console.log('Extension installed!');\n  chrome.storage.sync.set({\n    enabled: true,\n    theme: 'dark',\n    notifications: true\n  });\n  chrome.contextMenus.create({\n    id: 'myExtension',\n    title: 'My Extension Action',\n    contexts: ['selection']\n  });\n});\n\nchrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n  if (message.type === 'GET_DATA') {\n    sendResponse({ data: 'Hello from background!' });\n  }\n  return true;\n});\n\nchrome.contextMenus.onClicked.addListener((info, tab) => {\n  if (info.menuItemId === 'myExtension') {\n    chrome.tabs.sendMessage(tab.id, {\n      type: 'CONTEXT_ACTION',\n      selectedText: info.selectionText\n    });\n  }\n});`;
return getHTML('Extension Boilerplate', '📦', 'Complete manifest.json + background script structure', [{name:'manifest.json',icon:'📄',code:manifest},{name:'background.js',icon:'⚙️',code:bg}]);
}

function getContentCode(){
const contentJS = `(function() {\n  'use strict';\n\n  const CONFIG = {\n    targetSelector: 'p, article, .content',\n    highlightColor: '#fde047',\n    enabled: true\n  };\n\n  function log(msg) {\n    console.log('[MyExtension]', msg);\n  }\n\n  function injectStyles(css) {\n    const style = document.createElement('style');\n    style.id = 'my-extension-styles';\n    style.textContent = css;\n    document.head.appendChild(style);\n  }\n\n  function analyzePageContent() {\n    const wordCount = document.body.innerText.split(/\\s+/).filter(Boolean).length;\n    const images = document.images.length;\n    const links = document.links.length;\n    return { wordCount, images, links, title: document.title };\n  }\n\n  function highlightKeywords(keywords) {\n    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);\n    const nodesToProcess = [];\n    while (walker.nextNode()) nodesToProcess.push(walker.currentNode);\n\n    keywords.forEach(keyword => {\n      const regex = new RegExp('(' + keyword + ')', 'gi');\n      nodesToProcess.forEach(node => {\n        if (node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE' && regex.test(node.textContent)) {\n          const span = document.createElement('span');\n          span.innerHTML = node.textContent.replace(regex, '<mark style="background:' + CONFIG.highlightColor + ';border-radius:3px;padding:0 2px;">$1</mark>');\n          node.parentNode.replaceChild(span, node);\n        }\n      });\n    });\n  }\n\n  function createFloatingToolbar() {\n    const toolbar = document.createElement('div');\n    toolbar.id = 'my-ext-toolbar';\n    toolbar.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;z-index:999999;box-shadow:0 10px 30px rgba(0,0,0,0.5);display:flex;gap:8px;font-family:system-ui';\n    toolbar.innerHTML = '<button onclick="document.getElementById(\'my-ext-toolbar\').remove()" style="background:#ef4444;border:none;border-radius:6px;color:#fff;padding:6px 10px;cursor:pointer;font-size:12px;font-weight:bold">✕</button><span style="color:#fff;font-size:12px;padding:6px">Extension Active</span>';\n    document.body.appendChild(toolbar);\n  }\n\n  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n    log('Received message: ' + message.type);\n    if (message.type === 'ANALYZE') sendResponse(analyzePageContent());\n    else if (message.type === 'HIGHLIGHT') { highlightKeywords(message.keywords || []); sendResponse({ success: true }); }\n    else if (message.type === 'CONTEXT_ACTION') alert('Selected text: ' + message.selectedText);\n    return true;\n  });\n\n  function init() {\n    log('Content script loaded on: ' + window.location.hostname);\n    injectStyles('#my-ext-toolbar { font-family: system-ui !important; }');\n    const data = analyzePageContent();\n    log('Page stats: ' + JSON.stringify(data));\n  }\n\n  init();\n})();`;
return getHTML('Content Script Builder', '✏️', 'Inject JavaScript into any webpage', [{name:'content.js',icon:'📄',code:contentJS}]);
}

function getContextMenuCode(){
const bg = `chrome.runtime.onInstalled.addListener(() => {\n  chrome.contextMenus.create({ id: 'myExt-parent', title: '⚡ My Extension', contexts: ['all'] });\n  chrome.contextMenus.create({ id: 'search-selected', parentId: 'myExt-parent', title: 'Search: "%s"', contexts: ['selection'] });\n  chrome.contextMenus.create({ id: 'copy-formatted', parentId: 'myExt-parent', title: 'Copy formatted text', contexts: ['selection'] });\n  chrome.contextMenus.create({ id: 'sep-1', parentId: 'myExt-parent', type: 'separator', contexts: ['all'] });\n  chrome.contextMenus.create({ id: 'save-page', parentId: 'myExt-parent', title: 'Save page info', contexts: ['page'] });\n  chrome.contextMenus.create({ id: 'reverse-image', parentId: 'myExt-parent', title: 'Reverse image search', contexts: ['image'] });\n});\n\nchrome.contextMenus.onClicked.addListener(async (info, tab) => {\n  switch (info.menuItemId) {\n    case 'search-selected':\n      const query = encodeURIComponent(info.selectionText);\n      chrome.tabs.create({ url: 'https://google.com/search?q=' + query });\n      break;\n    case 'copy-formatted':\n      chrome.tabs.sendMessage(tab.id, { type: 'COPY_TEXT', text: info.selectionText });\n      break;\n    case 'save-page':\n      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });\n      chrome.storage.local.set({ savedPages: { url: activeTab.url, title: activeTab.title, savedAt: new Date().toISOString() } });\n      chrome.notifications.create({ type: 'basic', iconUrl: 'icons/icon48.png', title: 'Page Saved!', message: activeTab.title });\n      break;\n    case 'reverse-image':\n      const imgUrl = encodeURIComponent(info.srcUrl);\n      chrome.tabs.create({ url: 'https://lens.google.com/uploadbyurl?url=' + imgUrl });\n      break;\n  }\n});`;
return getHTML('Context Menu Creator', '🖱️', 'Add custom right-click menu items', [{name:'background.js',icon:'⚡',code:bg}]);
}

function getStorageCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Extension Settings</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;width:380px;padding:20px}h2{color:#f59e0b;margin-bottom:15px;font-size:16px}.section{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:15px;margin-bottom:12px}.section h3{color:#f59e0b;font-size:12px;text-transform:uppercase;margin-bottom:12px;letter-spacing:1px}.row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #334155}.row:last-child{border-bottom:none}.row label{color:#cbd5e1;font-size:13px}.toggle{position:relative;width:40px;height:22px}.toggle input{opacity:0;width:0;height:0}.slider{position:absolute;inset:0;background:#475569;border-radius:11px;cursor:pointer;transition:0.3s}.slider:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:0.3s}.toggle input:checked+.slider{background:#f59e0b}.toggle input:checked+.slider:before{transform:translateX(18px)}select{background:#0f172a;border:1px solid #475569;color:#fff;padding:5px 8px;border-radius:6px;font-size:12px}.btn-row{display:flex;gap:8px;margin-top:15px}button{flex:1;padding:10px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px}.save{background:#f59e0b;color:#000}.reset{background:#334155;color:#fff}.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;font-weight:bold;opacity:0;transition:0.3s}.toast.show{opacity:1}</style></head>
<body>
<h2>⚙️ Extension Settings</h2>
<div class="section">
  <h3>Features</h3>
  <div class="row"><label>Enable Extension</label><label class="toggle"><input type="checkbox" id="enabled" checked><span class="slider"></span></label></div>
  <div class="row"><label>Auto-highlight Keywords</label><label class="toggle"><input type="checkbox" id="highlight"><span class="slider"></span></label></div>
  <div class="row"><label>Show Floating Toolbar</label><label class="toggle"><input type="checkbox" id="toolbar" checked><span class="slider"></span></label></div>
  <div class="row"><label>Enable Notifications</label><label class="toggle"><input type="checkbox" id="notifications" checked><span class="slider"></span></label></div>
</div>
<div class="section">
  <h3>Appearance</h3>
  <div class="row"><label>Theme</label><select id="theme"><option value="dark">Dark</option><option value="light">Light</option><option value="system">System</option></select></div>
  <div class="row"><label>Language</label><select id="lang"><option value="en">English</option><option value="fr">Francais</option></select></div>
</div>
<div class="btn-row">
  <button class="save" onclick="saveSettings()">Save Settings</button>
  <button class="reset" onclick="resetSettings()">Reset</button>
</div>
<div class="toast" id="toast">Settings Saved!</div>
<script>
function loadSettings(){
  if(typeof chrome!=='undefined'&&chrome.storage){
    chrome.storage.sync.get(['enabled','highlight','toolbar','notifications','theme','lang'],data=>{
      if(data.enabled!==undefined)document.getElementById('enabled').checked=data.enabled;
      if(data.highlight!==undefined)document.getElementById('highlight').checked=data.highlight;
      if(data.toolbar!==undefined)document.getElementById('toolbar').checked=data.toolbar;
      if(data.notifications!==undefined)document.getElementById('notifications').checked=data.notifications;
      if(data.theme)document.getElementById('theme').value=data.theme;
      if(data.lang)document.getElementById('lang').value=data.lang;
    });
  }
}
function saveSettings(){
  const settings={enabled:document.getElementById('enabled').checked,highlight:document.getElementById('highlight').checked,toolbar:document.getElementById('toolbar').checked,notifications:document.getElementById('notifications').checked,theme:document.getElementById('theme').value,lang:document.getElementById('lang').value};
  if(typeof chrome!=='undefined'&&chrome.storage){chrome.storage.sync.set(settings);}
  const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000);
}
function resetSettings(){document.getElementById('enabled').checked=true;document.getElementById('highlight').checked=false;document.getElementById('toolbar').checked=true;document.getElementById('notifications').checked=true;document.getElementById('theme').value='dark';document.getElementById('lang').value='en';}
loadSettings();
<\/script></body></html>`;}

function getDevtoolsCode(){
const dtJS = `chrome.devtools.panels.create(\n  "My Extension",\n  "icons/icon16.png",\n  "devtools/panel.html",\n  (panel) => {\n    console.log("DevTools panel created!");\n    panel.onShown.addListener((panelWindow) => {\n      console.log("Panel shown");\n      panelWindow.init();\n    });\n    panel.onHidden.addListener(() => {\n      console.log("Panel hidden");\n    });\n  }\n);`;
const panelHtml = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>My Extension Panel</title>\n  <style>\n    body { background: #1e293b; color: #cbd5e1; font-family: monospace; padding: 20px; margin: 0; }\n    h2 { color: #14b8a6; margin-bottom: 20px; }\n    button { background: #14b8a6; border: none; border-radius: 6px; color: #000; padding: 8px 16px; cursor: pointer; font-weight: bold; margin-right: 10px; }\n    #output { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 15px; min-height: 200px; font-size: 13px; white-space: pre-wrap; margin-top: 15px; }\n    .entry { margin-bottom: 8px; }\n    .entry .time { color: #475569; font-size: 11px; }\n    .entry .data { color: #10b981; }\n  </style>\n</head>\n<body>\n  <h2>🔧 Extension DevTools</h2>\n  <button onclick="inspectPage()">Inspect Page</button>\n  <button onclick="clearLog()">Clear</button>\n  <div id="output">Click "Inspect Page" to analyze...</div>\n  <script src="panel.js"><\/script>\n</body>\n</html>`;
const panelJS = `function init() {\n  log("DevTools panel initialized");\n}\n\nfunction inspectPage() {\n  chrome.devtools.inspectedWindow.eval(\n    '({ url: location.href, title: document.title, elements: document.querySelectorAll("*").length, scripts: document.scripts.length, images: document.images.length })',\n    (result, error) => {\n      if (error) { log("Error: " + JSON.stringify(error)); return; }\n      log(JSON.stringify(result, null, 2));\n    }\n  );\n}\n\nfunction log(msg) {\n  const output = document.getElementById('output');\n  const entry = document.createElement('div');\n  entry.className = 'entry';\n  entry.innerHTML = '<span class="time">' + new Date().toLocaleTimeString() + '</span><br><span class="data">' + msg + '</span>';\n  output.prepend(entry);\n}\n\nfunction clearLog() {\n  document.getElementById('output').innerHTML = 'Log cleared...';\n}`;
return getHTML('DevTools Panel Generator', '🔧', 'Create a custom tab inside Chrome DevTools', [{name:'devtools.js',icon:'⚙️',code:dtJS},{name:'panel.html',icon:'🌐',code:panelHtml},{name:'panel.js',icon:'📄',code:panelJS}]);
}

function getPopupCode(){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Extension Popup</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;width:340px;min-height:400px}.header{background:linear-gradient(135deg,#10b981,#059669);padding:15px 20px;display:flex;align-items:center;justify-content:space-between}.header h1{font-size:15px;font-weight:900}.status-dot{width:8px;height:8px;background:#fff;border-radius:50%;animation:p 2s infinite}@keyframes p{0%,100%{opacity:1}50%{opacity:0.3}}.tabs{display:flex;background:#1e293b;border-bottom:1px solid #334155}.tab{flex:1;padding:10px;text-align:center;cursor:pointer;font-size:12px;font-weight:600;color:#64748b;border-bottom:2px solid transparent;transition:0.2s}.tab.active{color:#10b981;border-bottom-color:#10b981}.content{padding:15px}.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px}.stat-card{background:#1e293b;border-radius:8px;padding:12px;text-align:center;border:1px solid #334155}.stat-val{font-size:22px;font-weight:900;color:#10b981;display:block;margin-bottom:4px}.stat-lbl{font-size:10px;color:#64748b;text-transform:uppercase}.action-list{display:flex;flex-direction:column;gap:8px}.action-btn{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px 15px;cursor:pointer;display:flex;align-items:center;gap:10px;color:#cbd5e1;font-size:13px;width:100%;text-align:left;transition:0.2s}.action-btn:hover{border-color:#10b981;background:#10b98111}.action-icon{font-size:18px;width:30px}.footer{background:#0f172a;padding:10px 15px;text-align:center;font-size:11px;color:#475569;border-top:1px solid #1e293b}</style></head>
<body>
<div class="header">
  <h1>⚡ My Extension</h1>
  <div style="display:flex;align-items:center;gap:6px;font-size:11px;"><div class="status-dot"></div>Active</div>
</div>
<div class="tabs">
  <div class="tab active" onclick="showTab('home',this)">Home</div>
  <div class="tab" onclick="showTab('stats',this)">Stats</div>
  <div class="tab" onclick="showTab('settings',this)">Settings</div>
</div>
<div class="content" id="tabContent"></div>
<div class="footer">My Extension v1.0.0 — Generated by Extension Forge</div>
<script>
const tabs={
  home:'<div class="action-list"><button class="action-btn" onclick="sendMsg(\'ANALYZE\')"><span class="action-icon">🔍</span>Analyze Current Page</button><button class="action-btn" onclick="sendMsg(\'HIGHLIGHT\')"><span class="action-icon">✨</span>Highlight Keywords</button><button class="action-btn" onclick="chrome.tabs.create({url:\'options/options.html\'})"><span class="action-icon">⚙️</span>Open Full Settings</button><button class="action-btn" onclick="chrome.runtime.openOptionsPage()"><span class="action-icon">📖</span>View Documentation</button></div>',
  stats:'<div class="stats-grid"><div class="stat-card"><span class="stat-val" id="pagesV">0</span><span class="stat-lbl">Pages Visited</span></div><div class="stat-card"><span class="stat-val" id="actionsV">0</span><span class="stat-lbl">Actions Run</span></div><div class="stat-card"><span class="stat-val" id="timeV">0m</span><span class="stat-lbl">Time Saved</span></div><div class="stat-card"><span class="stat-val" id="hlV">0</span><span class="stat-lbl">Highlights</span></div></div>',
  settings:'<div style="display:flex;flex-direction:column;gap:10px;"><label style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13px;">Dark Mode</span><input type="checkbox" checked></label><label style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13px;">Auto-run on load</span><input type="checkbox"></label><label style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13px;">Notifications</span><input type="checkbox" checked></label></div>'
};
function showTab(name,el){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.getElementById('tabContent').innerHTML=tabs[name];if(name==='stats')loadStats();}
function loadStats(){document.getElementById('pagesV').textContent=Math.floor(Math.random()*500)+100;document.getElementById('actionsV').textContent=Math.floor(Math.random()*200)+50;document.getElementById('timeV').textContent=Math.floor(Math.random()*60)+10+'m';document.getElementById('hlV').textContent=Math.floor(Math.random()*1000)+200;}
async function sendMsg(type){if(typeof chrome!=='undefined'&&chrome.tabs){const[tab]=await chrome.tabs.query({active:true,currentWindow:true});chrome.tabs.sendMessage(tab.id,{type});}else{alert('Chrome APIs only available in real extension context');}}
showTab('home',document.querySelector('.tab'));
<\/script></body></html>`;}

const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-extforge');if(l)l.textContent=gl()==='fr'?'Forge Extensions':'Extension Forge';if(window.activeTab==='extforge')window.initExtForge(gl());};
console.log('Extension Forge loaded!');
})();
