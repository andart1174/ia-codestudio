(function(){
'use strict';
const TX={en:{title:'MOBILE UI KIT STUDIO',sub:'iOS, Android & React Native Generator',back:'<- Back',injected:'Injected!',tools:{
  components:{name:'iOS/Android Component Generator',desc:'Navbar, TabBar, Cards, Modals — native-style mobile components.',injectBtn:'Generate Mobile Components'},
  rnboiler:{name:'React Native Boilerplate',desc:'Complete RN project structure with Navigation, Auth & API setup.',injectBtn:'Generate RN Boilerplate'},
  appicon:{name:'App Icon Generator',desc:'Generate all icon sizes from 1024px to 29px as a downloadable preview.',injectBtn:'Generate App Icons'},
  splash:{name:'Splash Screen Builder',desc:'Animated launch screen for iOS and Android with logo and brand.',injectBtn:'Generate Splash Screen'},
  pushnotif:{name:'Push Notification UI',desc:'Preview how notifications look on iOS and Android lock screens.',injectBtn:'Generate Notification UI'}
}},fr:{title:'STUDIO KIT UI MOBILE',sub:'Generateur iOS, Android & React Native',back:'<- Retour',injected:'Injecte!',tools:{
  components:{name:'Generateur Composants iOS/Android',desc:'Navbar, TabBar, Cartes, Modals — composants mobiles natifs.',injectBtn:'Generer Composants Mobile'},
  rnboiler:{name:'Boilerplate React Native',desc:'Structure complete RN avec Navigation, Auth et API.',injectBtn:'Generer Boilerplate RN'},
  appicon:{name:'Generateur Icones App',desc:'Generez toutes les tailles d icones de 1024px a 29px.',injectBtn:'Generer Icones App'},
  splash:{name:'Constructeur Splash Screen',desc:'Ecran de demarrage anime iOS et Android avec logo et marque.',injectBtn:'Generer Splash Screen'},
  pushnotif:{name:'UI Notification Push',desc:'Apercu des notifications sur ecrans verrouilles iOS et Android.',injectBtn:'Generer UI Notification'}
}}};
function gl(){return window.appLang||'en';}
window._injectMobileCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){if(tab==='mobileuikit'){window.activeTab='mobileuikit';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-mobileuikit');if(b)b.classList.add('active');window.initMobileKit(gl());return;}if(typeof _o==='function')_o(tab);};
window.initMobileKit=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'components',icon:'📱',color:'#a855f7'},{id:'rnboiler',icon:'⚛️',color:'#06b6d4'},{id:'appicon',icon:'🎯',color:'#f97316'},{id:'splash',icon:'🌅',color:'#ec4899'},{id:'pushnotif',icon:'🔔',color:'#10b981'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(147,51,234,0.1));border-radius:14px;padding:16px;border:1px solid rgba(168,85,247,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #a855f7);">📱</span><div><h2 style="margin:0;color:#d8b4fe;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleMobileTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleMobileTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={components:'#a855f7',rnboiler:'#06b6d4',appicon:'#f97316',splash:'#ec4899',pushnotif:'#10b981'};
  const icons={components:'📱',rnboiler:'⚛️',appicon:'🎯',splash:'🌅',pushnotif:'🔔'};
  const codeMap={components:getComponentsCode(),rnboiler:getRNBoilerCode(),appicon:getAppIconCode(),splash:getSplashCode(),pushnotif:getPushNotifCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initMobileKit(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInjectMob'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#fff;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInjectMob'+toolId).addEventListener('click',()=>window._injectMobileCode(codeMap[toolId]));
};
function getComponentsCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Mobile Components</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#1a1a2e;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;padding:20px}h1{color:#a855f7;margin-bottom:20px;font-size:20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}.section{background:#16213e;border-radius:16px;padding:20px;border:1px solid #0f3460}.section h3{color:#a855f7;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px}
/* iOS-style Navbar */
.ios-navbar{background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);border-radius:12px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(255,255,255,0.12)}.ios-nav-title{font-size:17px;font-weight:600;color:#fff}.ios-nav-btn{color:#0a84ff;font-size:15px;background:none;border:none;cursor:pointer;font-weight:400}
/* iOS Card */
.ios-card{background:rgba(255,255,255,0.07);border-radius:16px;padding:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:14px}.ios-card-icon{width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px}.ios-card-body{flex:1}.ios-card-title{font-size:16px;font-weight:600}.ios-card-sub{font-size:13px;color:rgba(255,255,255,0.5);margin-top:3px}.ios-card-arrow{color:rgba(255,255,255,0.3);font-size:18px}
/* iOS TabBar */
.ios-tabbar{background:rgba(28,28,30,0.94);backdrop-filter:blur(20px);border-radius:20px;padding:10px 20px;display:flex;justify-content:space-around;border:1px solid rgba(255,255,255,0.08);margin-top:15px}.ios-tab{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:5px 15px}.ios-tab-icon{font-size:22px}.ios-tab-label{font-size:10px;color:rgba(255,255,255,0.4)}.ios-tab.active .ios-tab-icon{filter:drop-shadow(0 0 6px #0a84ff)}.ios-tab.active .ios-tab-label{color:#0a84ff}
/* Modal */
.ios-modal-overlay{background:rgba(0,0,0,0.6);border-radius:16px;padding:20px;margin-top:15px}.ios-modal{background:#2c2c2e;border-radius:20px;overflow:hidden}.ios-modal-header{padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);text-align:center;font-weight:600;font-size:17px}.ios-modal-body{padding:16px 20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.5}.ios-modal-footer{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,0.1)}.ios-modal-btn{padding:14px;text-align:center;cursor:pointer;font-size:17px;font-weight:400}.ios-modal-btn.primary{color:#0a84ff;font-weight:600}.ios-modal-btn:first-child{border-right:1px solid rgba(255,255,255,0.1)}
/* Toggle / Switch */
.ios-switch{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08)}.ios-switch label{font-size:16px}.ios-toggle{position:relative;width:51px;height:31px}.ios-toggle input{opacity:0;width:0;height:0}.ios-slider{position:absolute;inset:0;background:#3a3a3c;border-radius:31px;cursor:pointer;transition:.3s}.ios-slider:before{content:"";position:absolute;width:27px;height:27px;left:2px;top:2px;background:white;border-radius:50%;transition:.3s;box-shadow:0 2px 6px rgba(0,0,0,0.4)}.ios-toggle input:checked+.ios-slider{background:#30d158}.ios-toggle input:checked+.ios-slider:before{transform:translateX(20px)}
</style></head>
<body>
<h1>📱 iOS / Android Components</h1>
<div class="grid">
  <div class="section">
    <h3>Navigation Bar</h3>
    <div class="ios-navbar"><button class="ios-nav-btn">Back</button><span class="ios-nav-title">My App</span><button class="ios-nav-btn">Done</button></div>
    <h3 style="margin-top:20px">Cards</h3>
    <div class="ios-card"><div class="ios-card-icon" style="background:#0a84ff22">🏠</div><div class="ios-card-body"><div class="ios-card-title">Dashboard</div><div class="ios-card-sub">View your analytics</div></div><span class="ios-card-arrow">›</span></div>
    <div class="ios-card"><div class="ios-card-icon" style="background:#30d15822">📊</div><div class="ios-card-body"><div class="ios-card-title">Reports</div><div class="ios-card-sub">Monthly summaries</div></div><span class="ios-card-arrow">›</span></div>
    <div class="ios-card"><div class="ios-card-icon" style="background:#ff375f22">❤️</div><div class="ios-card-body"><div class="ios-card-title">Health</div><div class="ios-card-sub">3 new updates</div></div><span class="ios-card-arrow">›</span></div>
  </div>
  <div class="section">
    <h3>Tab Bar</h3>
    <div class="ios-tabbar"><div class="ios-tab active"><span class="ios-tab-icon">🏠</span><span class="ios-tab-label">Home</span></div><div class="ios-tab"><span class="ios-tab-icon">🔍</span><span class="ios-tab-label">Search</span></div><div class="ios-tab"><span class="ios-tab-icon">💬</span><span class="ios-tab-label">Messages</span></div><div class="ios-tab"><span class="ios-tab-icon">👤</span><span class="ios-tab-label">Profile</span></div></div>
    <h3 style="margin-top:20px">Alert Modal</h3>
    <div class="ios-modal-overlay"><div class="ios-modal"><div class="ios-modal-header">Delete Account?</div><div class="ios-modal-body">This action cannot be undone. All your data will be permanently deleted.</div><div class="ios-modal-footer"><div class="ios-modal-btn">Cancel</div><div class="ios-modal-btn primary">Delete</div></div></div></div>
    <h3 style="margin-top:20px">Settings Toggles</h3>
    <div class="ios-switch"><label>Notifications</label><label class="ios-toggle"><input type="checkbox" checked><span class="ios-slider"></span></label></div>
    <div class="ios-switch"><label>Dark Mode</label><label class="ios-toggle"><input type="checkbox"><span class="ios-slider"></span></label></div>
    <div class="ios-switch"><label>Face ID</label><label class="ios-toggle"><input type="checkbox" checked><span class="ios-slider"></span></label></div>
  </div>
</div>
</body></html>`;}

function getRNBoilerCode(){
const pkg='{\n  "name": "MyApp",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "18.2.0",\n    "react-native": "0.73.0",\n    "@react-navigation/native": "^6.1.9",\n    "@react-navigation/stack": "^6.3.20",\n    "@react-navigation/bottom-tabs": "^6.5.11",\n    "react-native-safe-area-context": "^4.8.2",\n    "react-native-screens": "^3.29.0",\n    "@reduxjs/toolkit": "^2.1.0",\n    "react-redux": "^9.1.0",\n    "axios": "^1.6.7",\n    "react-native-async-storage": "^1.21.0"\n  }\n}';
const app="import React from 'react';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\nimport { createStackNavigator } from '@react-navigation/stack';\nimport { Provider } from 'react-redux';\nimport { store } from './src/store';\nimport HomeScreen from './src/screens/HomeScreen';\nimport ProfileScreen from './src/screens/ProfileScreen';\nimport LoginScreen from './src/screens/LoginScreen';\n\nconst Tab = createBottomTabNavigator();\nconst Stack = createStackNavigator();\n\nfunction MainTabs() {\n  return (\n    <Tab.Navigator screenOptions={{\n      tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },\n      tabBarActiveTintColor: '#6366f1',\n      tabBarInactiveTintColor: '#64748b',\n    }}>\n      <Tab.Screen name=\"Home\" component={HomeScreen}\n        options={{ tabBarIcon: () => '&#127968;' }} />\n      <Tab.Screen name=\"Profile\" component={ProfileScreen}\n        options={{ tabBarIcon: () => '&#128100;' }} />\n    </Tab.Navigator>\n  );\n}\n\nexport default function App() {\n  return (\n    <Provider store={store}>\n      <NavigationContainer>\n        <Stack.Navigator screenOptions={{ headerShown: false }}>\n          <Stack.Screen name=\"Login\" component={LoginScreen} />\n          <Stack.Screen name=\"Main\" component={MainTabs} />\n        </Stack.Navigator>\n      </NavigationContainer>\n    </Provider>\n  );\n}";
const store="import { configureStore } from '@reduxjs/toolkit';\nimport authReducer from './authSlice';\nimport userReducer from './userSlice';\n\nexport const store = configureStore({\n  reducer: {\n    auth: authReducer,\n    user: userReducer\n  }\n});";
const auth="import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';\nimport api from '../api/client';\n\nexport const login = createAsyncThunk('auth/login',\n  async ({ email, password }) => {\n    const res = await api.post('/auth/login', { email, password });\n    return res.data;\n  }\n);\n\nconst authSlice = createSlice({\n  name: 'auth',\n  initialState: { token: null, loading: false, error: null },\n  reducers: {\n    logout: (state) => { state.token = null; }\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(login.pending, (state) => { state.loading = true; })\n      .addCase(login.fulfilled, (state, action) => {\n        state.loading = false;\n        state.token = action.payload.token;\n      })\n      .addCase(login.rejected, (state, action) => {\n        state.loading = false;\n        state.error = action.error.message;\n      });\n  }\n});\n\nexport const { logout } = authSlice.actions;\nexport default authSlice.reducer;";
const apiclient="import axios from 'axios';\nimport AsyncStorage from '@react-native-async-storage/async-storage';\n\nconst api = axios.create({ baseURL: 'https://api.myapp.com/v1' });\n\napi.interceptors.request.use(async (config) => {\n  const token = await AsyncStorage.getItem('token');\n  if (token) config.headers.Authorization = 'Bearer ' + token;\n  return config;\n});\n\napi.interceptors.response.use(\n  res => res,\n  async err => {\n    if (err.response?.status === 401) {\n      await AsyncStorage.removeItem('token');\n    }\n    return Promise.reject(err);\n  }\n);\n\nexport default api;";
const files=[{name:'package.json',lang:'json',icon:'📦',code:pkg},{name:'App.tsx',lang:'tsx',icon:'⚛️',code:app},{name:'store/index.ts',lang:'ts',icon:'🗄️',code:store},{name:'authSlice.ts',lang:'ts',icon:'🔐',code:auth},{name:'api/client.ts',lang:'ts',icon:'🌐',code:apiclient}];
return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>React Native Boilerplate</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}h1{color:#06b6d4;padding:16px 20px;font-size:18px;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px;flex-shrink:0}.file-tabs{display:flex;gap:0;border-bottom:1px solid #1e293b;overflow-x:auto;flex-shrink:0;background:#020617}.file-tab{padding:10px 16px;cursor:pointer;font-size:12px;font-weight:600;color:#64748b;border-bottom:2px solid transparent;white-space:nowrap;transition:0.2s;display:flex;align-items:center;gap:5px}.file-tab.active{color:#06b6d4;border-bottom-color:#06b6d4;background:#0f172a}.file-tab:hover{color:#94a3b8}.code-area{flex:1;overflow:auto;position:relative}.toolbar{background:#1e293b;padding:8px 15px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;flex-shrink:0}.toolbar-left{display:flex;align-items:center;gap:10px}.badge{background:#06b6d422;color:#06b6d4;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:bold}.copy-btn{background:#06b6d4;border:none;color:#000;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;transition:0.2s}.copy-btn:hover{background:#0891b2}pre{padding:20px;font-family:"Fira Code",Consolas,monospace;font-size:13px;line-height:1.7;overflow:auto;color:#e2e8f0;white-space:pre-wrap;word-break:break-all}.kw{color:#818cf8}.fn{color:#34d399}.str{color:#fb923c}.cm{color:#475569;font-style:italic}.num{color:#f472b6}.punc{color:#94a3b8}.tag{color:#60a5fa}.attr{color:#34d399}.val{color:#fb923c}</style></head><body>'
+'<h1>⚛️ React Native Boilerplate<span style="font-size:12px;color:#64748b;font-weight:400">— Complete Project Structure</span></h1>'
+'<div class="file-tabs">'+files.map((f,i)=>'<div class="file-tab'+(i===0?' active':'')+'" onclick="showFile('+i+',this)">'+f.icon+' '+f.name+'</div>').join('')+'</div>'
+'<div class="toolbar"><div class="toolbar-left"><span id="curFile" class="badge">📦 package.json</span><span style="color:#64748b;font-size:11px">Click a tab to switch files</span></div><button class="copy-btn" onclick="copyCode()">📋 Copy File</button></div>'
+'<div class="code-area"><pre id="codeBlock"></pre></div>'
+'<script>const files='+JSON.stringify(files.map(f=>({name:f.name,icon:f.icon,code:f.code})))+';let cur=0;function hl(code,name){let c=code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");if(name.endsWith(".json")){c=c.replace(/"([^"]+)":/g,\'<span class="str">"$1"</span>:\').replace(/: "([^"]+)"/g,\': <span class="val">"$1"</span>\');}else{c=c.replace(/(import|export|from|const|let|async|await|return|function|default|null|false|true)\b/g,\'<span class="kw">$1</span>\');c=c.replace(/\\/\\/.*$/gm,\'<span class="cm">$&</span>\');c=c.replace(/\'([^\']*)\'/g,\'<span class="str">\'+"\'$1\'"+"<\\/span>").replace(/"([^"]*)"/g,\'<span class="str">"$1"<\\/span>\');}return c;}function showFile(i,el){cur=i;document.querySelectorAll(".file-tab").forEach(t=>t.classList.remove("active"));el.classList.add("active");document.getElementById("curFile").textContent=files[i].icon+" "+files[i].name;document.getElementById("codeBlock").innerHTML=hl(files[i].code,files[i].name);}function copyCode(){navigator.clipboard.writeText(files[cur].code).then(()=>{const b=document.querySelector(".copy-btn");b.textContent="✅ Copied!";setTimeout(()=>b.textContent="📋 Copy File",2000);});}showFile(0,document.querySelectorAll(".file-tab")[0]);<\/script></body></html>';}

function getAppIconCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>App Icon Generator</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#f97316;margin-bottom:20px}.upload-area{border:2px dashed #f97316;border-radius:12px;padding:30px;text-align:center;margin-bottom:20px;cursor:pointer;background:#1e293b;transition:0.2s}.upload-area:hover{background:#431407}.preview-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:12px}.icon-item{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:10px;text-align:center}.icon-size{color:#f97316;font-size:10px;font-weight:bold;margin-top:6px}.icon-platform{color:#64748b;font-size:9px}.canvas-wrap{display:flex;justify-content:center;margin-bottom:20px}canvas{border-radius:22%;cursor:pointer}.color-tools{display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap}button{padding:8px 16px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}label{color:#64748b;font-size:12px;display:flex;align-items:center;gap:6px}input[type=color]{width:36px;height:30px;border:none;border-radius:6px;cursor:pointer}input[type=text]{background:#1e293b;border:1px solid #475569;color:#fff;padding:7px 10px;border-radius:6px;font-size:13px;width:200px}</style></head>
<body>
<h1>🎯 App Icon Generator</h1>
<div class="color-tools">
  <label>BG Color <input type="color" id="bg" value="#6366f1" oninput="drawIcon()"></label>
  <label>Icon Emoji <input type="text" id="emoji" value="⚡" oninput="drawIcon()" style="width:80px"></label>
  <label>Text <input type="text" id="txt" value="" placeholder="or text..."></label>
  <button onclick="drawIcon()" style="background:#f97316;color:#000">Preview</button>
  <button onclick="downloadAll()" style="background:#10b981;color:#000">Download All Sizes</button>
</div>
<div class="canvas-wrap"><canvas id="main" width="512" height="512"></canvas></div>
<div class="preview-grid" id="grid"></div>
<script>
const SIZES=[{s:1024,p:'App Store'},{s:180,p:'iOS 3x'},{s:120,p:'iOS 2x'},{s:87,p:'iOS Spotlight 3x'},{s:80,p:'iOS Spotlight 2x'},{s:76,p:'iPad'},{s:60,p:'iOS Notif 3x'},{s:58,p:'Settings 2x'},{s:40,p:'Spotlight'},{s:29,p:'Settings'},{s:512,p:'Play Store'},{s:192,p:'Android XXXHDPI'},{s:144,p:'Android XXHDPI'},{s:96,p:'Android XHDPI'},{s:72,p:'Android HDPI'},{s:48,p:'Android MDPI'}];
function drawIcon(size,ctx2){
  const c=ctx2?null:document.getElementById('main');
  const ctx=ctx2||c.getContext('2d');
  const w=size||512;
  if(!ctx2){c.width=w;c.height=w;}
  ctx.clearRect(0,0,w,w);
  const r=w*0.2;ctx.beginPath();ctx.moveTo(r,0);ctx.lineTo(w-r,0);ctx.quadraticCurveTo(w,0,w,r);ctx.lineTo(w,w-r);ctx.quadraticCurveTo(w,w,w-r,w);ctx.lineTo(r,w);ctx.quadraticCurveTo(0,w,0,w-r);ctx.lineTo(0,r);ctx.quadraticCurveTo(0,0,r,0);ctx.closePath();
  const bg=document.getElementById('bg').value;ctx.fillStyle=bg;ctx.fill();
  const grd=ctx.createRadialGradient(w*0.3,w*0.2,0,w/2,w/2,w*0.7);grd.addColorStop(0,'rgba(255,255,255,0.3)');grd.addColorStop(1,'rgba(0,0,0,0.2)');ctx.fillStyle=grd;ctx.fill();
  const emoji=document.getElementById('emoji').value||'⚡';const txt=document.getElementById('txt').value;
  ctx.textAlign='center';ctx.textBaseline='middle';
  if(txt){ctx.font='bold '+(w*0.28)+'px Inter,sans-serif';ctx.fillStyle='#fff';ctx.fillText(txt,w/2,w/2);}
  else{ctx.font=(w*0.45)+'px serif';ctx.fillText(emoji,w/2,w*0.52);}
  renderGrid();
}
function renderGrid(){
  const grid=document.getElementById('grid');grid.innerHTML='';
  SIZES.forEach(({s,p})=>{
    const oc=document.createElement('canvas');oc.width=s;oc.height=s;
    const octx=oc.getContext('2d');drawIconToCtx(s,octx);
    const item=document.createElement('div');item.className='icon-item';
    const preview=document.createElement('canvas');preview.width=72;preview.height=72;preview.style.borderRadius='18%';
    preview.getContext('2d').drawImage(oc,0,0,72,72);
    item.appendChild(preview);item.innerHTML+='<div class="icon-size">'+s+'x'+s+'</div><div class="icon-platform">'+p+'</div>';
    grid.appendChild(item);
  });
}
function drawIconToCtx(w,ctx){
  ctx.clearRect(0,0,w,w);
  const r=w*0.2;ctx.beginPath();ctx.moveTo(r,0);ctx.lineTo(w-r,0);ctx.quadraticCurveTo(w,0,w,r);ctx.lineTo(w,w-r);ctx.quadraticCurveTo(w,w,w-r,w);ctx.lineTo(r,w);ctx.quadraticCurveTo(0,w,0,w-r);ctx.lineTo(0,r);ctx.quadraticCurveTo(0,0,r,0);ctx.closePath();
  ctx.fillStyle=document.getElementById('bg').value;ctx.fill();
  const grd=ctx.createRadialGradient(w*0.3,w*0.2,0,w/2,w/2,w*0.7);grd.addColorStop(0,'rgba(255,255,255,0.3)');grd.addColorStop(1,'rgba(0,0,0,0.2)');ctx.fillStyle=grd;ctx.fill();
  const emoji=document.getElementById('emoji').value||'⚡';const txt=document.getElementById('txt').value;
  ctx.textAlign='center';ctx.textBaseline='middle';
  if(txt){ctx.font='bold '+(w*0.28)+'px Inter,sans-serif';ctx.fillStyle='#fff';ctx.fillText(txt,w/2,w/2);}
  else{ctx.font=(w*0.45)+'px serif';ctx.fillText(emoji,w/2,w*0.52);}
}
function downloadAll(){
  SIZES.slice(0,6).forEach(({s,p})=>{
    const oc=document.createElement('canvas');oc.width=s;oc.height=s;drawIconToCtx(s,oc.getContext('2d'));
    const a=document.createElement('a');a.href=oc.toDataURL('image/png');a.download='icon_'+s+'x'+s+'.png';a.click();
  });
}
drawIcon();
<\/script></body></html>`;}

function getSplashCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Splash Screen Builder</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#ec4899;margin-bottom:20px}.layout{display:grid;grid-template-columns:300px 1fr;gap:20px;height:85vh}.controls{background:#1e293b;border-radius:12px;padding:20px;overflow-y:auto;border:1px solid #334155}.preview-area{background:#1e293b;border-radius:12px;border:1px solid #334155;display:flex;align-items:center;justify-content:center;gap:30px}label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:5px;margin-top:12px}input[type=text],input[type=color],select{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px;border-radius:6px;font-size:13px;margin-bottom:5px}input[type=color]{height:35px}button{width:100%;padding:10px;margin-top:10px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px;background:#ec4899;color:#fff}.phone{width:200px;height:380px;border:6px solid #334155;border-radius:40px;overflow:hidden;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5)}.phone-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:15px;transition:background 0.5s}.logo-circle{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;animation:pulse 2s infinite}.splash-title{font-size:20px;font-weight:800;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.3)}.splash-sub{font-size:12px;color:rgba(255,255,255,0.6)}.progress-bar{width:80px;height:3px;background:rgba(255,255,255,0.2);border-radius:2px;overflow:hidden;margin-top:20px}.progress-fill{height:100%;background:#fff;border-radius:2px;animation:load 2.5s infinite}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}@keyframes load{0%{width:0%}100%{width:100%}}</style></head>
<body>
<h1>🌅 Splash Screen Builder</h1>
<div class="layout">
<div class="controls">
  <label>App Name</label><input type="text" id="appName" value="MyApp" oninput="update()">
  <label>Tagline</label><input type="text" id="tagline" value="Your productivity companion" oninput="update()">
  <label>Logo Emoji</label><input type="text" id="logo" value="⚡" oninput="update()">
  <label>Background Color 1</label><input type="color" id="bg1" value="#6366f1" oninput="update()">
  <label>Background Color 2</label><input type="color" id="bg2" value="#8b5cf6" oninput="update()">
  <label>Logo BG Color</label><input type="color" id="logoBg" value="rgba(255,255,255,0.2)" oninput="update()">
  <label>Animation</label>
  <select id="anim" onchange="update()"><option>pulse</option><option>bounce</option><option>spin</option></select>
  <button onclick="update()">Update Preview</button>
</div>
<div class="preview-area">
  <div>
    <div style="text-align:center;color:#64748b;font-size:11px;margin-bottom:8px">iOS</div>
    <div class="phone"><div class="phone-inner" id="splashIos">
      <div class="logo-circle" id="logoIos">⚡</div>
      <div class="splash-title" id="titleIos">MyApp</div>
      <div class="splash-sub" id="subIos">Your productivity companion</div>
      <div class="progress-bar"><div class="progress-fill"></div></div>
    </div></div>
  </div>
  <div>
    <div style="text-align:center;color:#64748b;font-size:11px;margin-bottom:8px">Android</div>
    <div class="phone" style="border-radius:20px"><div class="phone-inner" id="splashAndroid">
      <div class="logo-circle" id="logoAndroid">⚡</div>
      <div class="splash-title" id="titleAndroid">MyApp</div>
      <div class="splash-sub" id="subAndroid">Your productivity companion</div>
      <div class="progress-bar"><div class="progress-fill"></div></div>
    </div></div>
  </div>
</div>
</div>
<script>
function update(){
  const name=document.getElementById('appName').value,tag=document.getElementById('tagline').value,logo=document.getElementById('logo').value,bg1=document.getElementById('bg1').value,bg2=document.getElementById('bg2').value,logoBg=document.getElementById('logoBg').value;
  ['Ios','Android'].forEach(p=>{
    document.getElementById('splash'+p).style.background='linear-gradient(135deg,'+bg1+','+bg2+')';
    document.getElementById('logo'+p).textContent=logo;document.getElementById('logo'+p).style.background=logoBg;
    document.getElementById('title'+p).textContent=name;document.getElementById('sub'+p).textContent=tag;
  });
}
update();
<\/script></body></html>`;}

function getPushNotifCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Push Notification UI</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;padding:25px}h1{color:#10b981;margin-bottom:20px}.layout{display:grid;grid-template-columns:320px 1fr;gap:20px}.controls{background:#1e293b;border-radius:12px;padding:20px;border:1px solid #334155}label{display:block;color:#94a3b8;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:5px;margin-top:12px}input[type=text],select,textarea{width:100%;background:#0f172a;border:1px solid #475569;color:#fff;padding:8px 10px;border-radius:6px;font-size:13px}textarea{height:70px;resize:none}button{width:100%;padding:10px;margin-top:10px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:13px;background:#10b981;color:#000}.preview-area{display:flex;gap:30px;flex-wrap:wrap;align-items:flex-start}.phone{background:#0f0f23;border:6px solid #334155;border-radius:40px;overflow:hidden;width:200px;height:380px;position:relative;flex-shrink:0}.lock-screen{height:100%;background:linear-gradient(160deg,#1a1a3e,#0f0f23);padding:20px 15px;display:flex;flex-direction:column;align-items:center}.time-display{text-align:center;margin:20px 0 30px;}.time{font-size:52px;font-weight:200;line-height:1}.date{font-size:13px;color:rgba(255,255,255,0.5);margin-top:5px}.notif-card{width:100%;background:rgba(255,255,255,0.12);backdrop-filter:blur(20px);border-radius:16px;padding:12px;display:flex;gap:10px;align-items:flex-start;animation:slideIn 0.4s ease}.notif-app-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}.notif-content{flex:1;min-width:0}.notif-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:3px}.notif-app-name{font-size:11px;color:rgba(255,255,255,0.5);font-weight:600}.notif-time{font-size:10px;color:rgba(255,255,255,0.4)}.notif-title{font-size:13px;font-weight:600;color:#fff;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.notif-body{font-size:12px;color:rgba(255,255,255,0.65);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}@keyframes slideIn{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}</style></head>
<body>
<h1>🔔 Push Notification UI</h1>
<div class="layout">
<div class="controls">
  <label>App Name</label><input type="text" id="appName" value="MyApp">
  <label>App Icon</label><input type="text" id="appIcon" value="⚡">
  <label>Notification Title</label><input type="text" id="notifTitle" value="New message from Sarah">
  <label>Notification Body</label><textarea id="notifBody">Hey! Are you free tonight? We were thinking of grabbing dinner 🍕</textarea>
  <label>Icon Background</label><input type="color" id="iconBg" value="#6366f1">
  <label>Type</label>
  <select id="type"><option>Message</option><option>Alert</option><option>Promo</option><option>Reminder</option></select>
  <button onclick="preview()">Update Preview</button>
</div>
<div class="preview-area">
  <div>
    <div style="color:#64748b;font-size:11px;text-align:center;margin-bottom:8px">iOS Lock Screen</div>
    <div class="phone"><div class="lock-screen">
      <div class="time-display"><div class="time" id="clock">9:41</div><div class="date" id="dateDisp">Monday, January 15</div></div>
      <div class="notif-card" id="notifIos">
        <div class="notif-app-icon" id="iconIos" style="background:#6366f1">⚡</div>
        <div class="notif-content">
          <div class="notif-header"><span class="notif-app-name" id="nameIos">MYAPP</span><span class="notif-time">now</span></div>
          <div class="notif-title" id="titleIos">New message from Sarah</div>
          <div class="notif-body" id="bodyIos">Hey! Are you free tonight?</div>
        </div>
      </div>
    </div></div>
  </div>
</div>
</div>
<script>
function preview(){
  const app=document.getElementById('appName').value,icon=document.getElementById('appIcon').value,title=document.getElementById('notifTitle').value,body=document.getElementById('notifBody').value,bg=document.getElementById('iconBg').value;
  document.getElementById('iconIos').textContent=icon;document.getElementById('iconIos').style.background=bg;
  document.getElementById('nameIos').textContent=app.toUpperCase();document.getElementById('titleIos').textContent=title;document.getElementById('bodyIos').textContent=body;
}
function updateClock(){const d=new Date();document.getElementById('clock').textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');document.getElementById('dateDisp').textContent=d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});}
updateClock();setInterval(updateClock,10000);
<\/script></body></html>`;}

const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-mobileuikit');if(l)l.textContent=gl()==='fr'?'Kit UI Mobile':'Mobile UI Kit';if(window.activeTab==='mobileuikit')window.initMobileKit(gl());};
console.log('Mobile UI Kit Studio loaded!');
})();
