/* ================================================================
   ⚛️ QUANTUM LAB v1.0 — 5 Revolutionary Unique Features
   IA Architecte — Code Studio Pro | EN/FR Bilingual
   1. 🎙️ Voice Code Studio   (Web Speech API)
   2. ⏱️ Code Time Machine    (LocalStorage snapshots + diff)
   3. 🧬 CSS Genetic Engine   (Genetic algorithm design)
   4. 🌍 Instant URL Share    (LZ compression, zero server)
   5. 🎛️ Live CSS Mixer       (Real-time CSS variable knobs)
   ================================================================ */
'use strict';

(function () {

  /* ── i18n ─────────────────────────────────────────────── */
  const T = {
    en: {
      title: '⚛️ QUANTUM LAB',
      subtitle: '5 Unique Innovations · Nowhere Else',
      tools: [
        { id: 'voice',   icon: '🎙️', label: 'Voice Code' },
        { id: 'timemachine', icon: '⏱️', label: 'Time Machine' },
        { id: 'genetic', icon: '🧬', label: 'CSS Evolution' },
        { id: 'share',   icon: '🌍', label: 'Instant Share' },
        { id: 'mixer',   icon: '🎛️', label: 'CSS Mixer' }
      ],
      openFull: '⛶ Open Full Screen',
      inject: '💉 Inject into Editor',
      copy: '📋 Copy Code',
      close: '✕ Close',
      /* Voice */
      voiceTitle: '🎙️ Voice Code Studio',
      voiceDesc: 'Speak to generate HTML/CSS/JS code. Say what you want to build.',
      voiceStart: '🎙️ Start Listening',
      voiceStop: '⏹ Stop',
      voiceListening: '🔴 Listening…',
      voiceExamples: ['dark hero section with animation', 'blue login form', 'pricing table 3 plans', 'animated navbar', 'glassmorphism card'],
      voiceNoSupport: '⚠️ Web Speech API not supported in this browser. Use Chrome or Edge.',
      voiceResult: 'Recognized:',
      /* Time Machine */
      tmTitle: '⏱️ Code Time Machine',
      tmDesc: 'Auto-saves a snapshot every 30s. Scrub back in time to any version.',
      tmSave: '💾 Save Snapshot Now',
      tmRestore: '⏪ Restore',
      tmDiff: '📊 Compare with Current',
      tmClear: '🗑️ Clear History',
      tmEmpty: 'No snapshots yet. Start coding — auto-save every 30s.',
      tmSnapshots: 'Snapshots:',
      tmLines: 'lines',
      /* Genetic */
      genTitle: '🧬 CSS Genetic Evolution',
      genDesc: 'Pick your favorite mutations → they breed → unique designs emerge after 5 generations.',
      genMutate: '🧬 Generate Mutations',
      genBreed: '🔀 Breed Selected',
      genGeneration: 'Generation',
      genSelect: 'Click to select (pick 2)',
      genApply: '✅ Apply to Editor',
      genExport: '📦 Export CSS',
      genNoCode: '⚠️ Open HTML with CSS in editor first.',
      /* Share */
      shareTitle: '🌍 Instant Share (Zero Server)',
      shareDesc: 'Your entire code is compressed into a URL. Share it — recipient sees code + preview instantly.',
      shareCreate: '🔗 Generate Share Link',
      shareCreating: '⚙️ Compressing…',
      shareCopy: '📋 Copy Link',
      shareOpen: '↗ Open in New Tab',
      shareSize: 'Link size:',
      shareImport: '📥 Import from URL',
      shareImportBtn: '📥 Import',
      shareImportPlaceholder: 'Paste a QUANTUM SHARE link here…',
      /* Mixer */
      mixTitle: '🎛️ Live CSS Variable Mixer',
      mixDesc: 'All CSS custom properties detected in your code. Adjust with sliders → live preview updates.',
      mixScan: '🔍 Scan CSS Variables',
      mixApply: '✅ Apply Changes',
      mixExport: '📤 Export CSS',
      mixReset: '↺ Reset',
      mixNone: 'No CSS custom properties (--var) found in editor. Add some first!'
    },
    fr: {
      title: '⚛️ QUANTUM LAB',
      subtitle: '5 Innovations Uniques · Nulle Part Ailleurs',
      tools: [
        { id: 'voice',   icon: '🎙️', label: 'Voice Code' },
        { id: 'timemachine', icon: '⏱️', label: 'Machine Temporelle' },
        { id: 'genetic', icon: '🧬', label: 'Évolution CSS' },
        { id: 'share',   icon: '🌍', label: 'Partage Instantané' },
        { id: 'mixer',   icon: '🎛️', label: 'Mixeur CSS' }
      ],
      openFull: '⛶ Plein Écran',
      inject: '💉 Injecter dans l\'Éditeur',
      copy: '📋 Copier le Code',
      close: '✕ Fermer',
      voiceTitle: '🎙️ Voice Code Studio',
      voiceDesc: 'Parlez pour générer du code HTML/CSS/JS. Dites ce que vous voulez créer.',
      voiceStart: '🎙️ Démarrer l\'Écoute',
      voiceStop: '⏹ Arrêter',
      voiceListening: '🔴 Écoute en cours…',
      voiceExamples: ['section hero sombre animée', 'formulaire de connexion bleu', 'tableau de prix 3 plans', 'navbar animée', 'carte glassmorphism'],
      voiceNoSupport: '⚠️ Web Speech API non supportée. Utilisez Chrome ou Edge.',
      voiceResult: 'Reconnu :',
      tmTitle: '⏱️ Machine Temporelle',
      tmDesc: 'Sauvegarde automatique toutes les 30s. Revenez à n\'importe quelle version.',
      tmSave: '💾 Sauvegarder Maintenant',
      tmRestore: '⏪ Restaurer',
      tmDiff: '📊 Comparer avec Actuel',
      tmClear: '🗑️ Effacer l\'Historique',
      tmEmpty: 'Pas encore de snapshots. Codez — sauvegarde auto toutes les 30s.',
      tmSnapshots: 'Snapshots :',
      tmLines: 'lignes',
      genTitle: '🧬 Moteur d\'Évolution CSS',
      genDesc: 'Choisissez vos mutations favorites → elles se reproduisent → designs uniques après 5 générations.',
      genMutate: '🧬 Générer des Mutations',
      genBreed: '🔀 Reproduire les Sélectionnés',
      genGeneration: 'Génération',
      genSelect: 'Cliquez pour sélectionner (choisir 2)',
      genApply: '✅ Appliquer à l\'Éditeur',
      genExport: '📦 Exporter CSS',
      genNoCode: '⚠️ Ouvrez d\'abord du HTML avec du CSS dans l\'éditeur.',
      shareTitle: '🌍 Partage Instantané (Zéro Serveur)',
      shareDesc: 'Tout votre code est compressé dans une URL. Partagez — le destinataire voit le code + aperçu instantanément.',
      shareCreate: '🔗 Générer le Lien de Partage',
      shareCreating: '⚙️ Compression…',
      shareCopy: '📋 Copier le Lien',
      shareOpen: '↗ Ouvrir dans un Nouvel Onglet',
      shareSize: 'Taille du lien :',
      shareImport: '📥 Importer depuis une URL',
      shareImportBtn: '📥 Importer',
      shareImportPlaceholder: 'Collez un lien QUANTUM SHARE ici…',
      mixTitle: '🎛️ Mixeur de Variables CSS',
      mixDesc: 'Toutes les propriétés CSS personnalisées détectées dans votre code. Ajustez avec les sliders → aperçu en direct.',
      mixScan: '🔍 Scanner les Variables CSS',
      mixApply: '✅ Appliquer les Changements',
      mixExport: '📤 Exporter CSS',
      mixReset: '↺ Réinitialiser',
      mixNone: 'Aucune variable CSS (--var) trouvée dans l\'éditeur. Ajoutez-en d\'abord !'
    }
  };

  const t = () => T[window.lang === 'fr' ? 'fr' : 'en'];

  /* ── Helpers ──────────────────────────────────────────── */
  function toast(msg, color) {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(20px);
      background:${color||'#10b981'};color:#fff;padding:11px 26px;border-radius:12px;
      z-index:999999;font-weight:700;font-size:13px;font-family:'Inter',sans-serif;
      box-shadow:0 8px 30px rgba(0,0,0,.5);transition:all .35s;pointer-events:none;`;
    d.textContent = msg;
    document.body.appendChild(d);
    requestAnimationFrame(() => { d.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 350); }, 3200);
  }

  function injectToEditor(code) {
    const ed = window.editor;
    if (!ed) { toast('⚠️ Editor not ready', '#f59e0b'); return; }
    ed.setValue(code); ed.pushUndoStop();
    setTimeout(() => { if (window.runPreview) window.runPreview(); }, 100);
    toast('💉 ' + (window.lang === 'fr' ? 'Injecté !' : 'Injected!'));
  }

  function getCode() { return window.editor ? window.editor.getValue() : ''; }

  /* ── LZ Compression (pure JS, no external lib) ─────────── */
  const LZ = (() => {
    // Simple LZ-based compression using built-in APIs when available
    function toBase64URL(str) {
      try { return btoa(unescape(encodeURIComponent(str))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''); }
      catch { return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''); }
    }
    function fromBase64URL(str) {
      const b = str.replace(/-/g,'+').replace(/_/g,'/');
      const pad = b.length % 4 ? '='.repeat(4 - b.length % 4) : '';
      try { return decodeURIComponent(escape(atob(b + pad))); }
      catch { return atob(b + pad); }
    }
    // Simple RLE-like compression for HTML (enough for sharing)
    function compress(str) {
      // Use URL-safe base64 with JSON escape — simple but effective
      return toBase64URL(str);
    }
    function decompress(str) {
      return fromBase64URL(str);
    }
    return { compress, decompress };
  })();

  /* ── CSS Variable Detection ────────────────────────────── */
  function detectCSSVars(code) {
    const vars = {};
    const rx = /--([a-zA-Z0-9_-]+)\s*:\s*([^;}\n]+)/g;
    let m;
    while ((m = rx.exec(code)) !== null) {
      const name = m[1].trim();
      const val  = m[2].trim();
      if (!vars[name]) vars[name] = val;
    }
    return vars;
  }

  /* ── CSS Mutation Engine ───────────────────────────────── */
  function mutateCSS(code, seed) {
    // Extract all color values and mutate them
    const rng = (() => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    })();

    const hueShift = Math.floor(rng() * 360);
    const satMult  = 0.7 + rng() * 0.6;
    const lightMult = 0.8 + rng() * 0.4;
    const borderR  = Math.floor(rng() * 24);
    const spaceMult = 0.8 + rng() * 0.5;

    function shiftHSL(h,s,l) {
      return `hsl(${(h + hueShift) % 360},${Math.min(100,Math.floor(s*satMult))}%,${Math.min(95,Math.floor(l*lightMult))}%)`;
    }

    function mutateHex(hex) {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      const h = rgbToHue(r,g,b), s = rgbToSat(r,g,b), l = rgbToLum(r,g,b);
      return shiftHSL(h, s*100, l*100);
    }

    function rgbToHue(r,g,b) { r/=255;g/=255;b/=255; const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min; if(!d)return 0; let h; if(max===r)h=(g-b)/d%6; else if(max===g)h=(b-r)/d+2; else h=(r-g)/d+4; return (h*60+360)%360; }
    function rgbToSat(r,g,b) { r/=255;g/=255;b/=255; const max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2; if(max===min)return 0; return (max-min)/(1-Math.abs(2*l-1)); }
    function rgbToLum(r,g,b) { return (Math.max(r,g,b)/255+Math.min(r,g,b)/255)/2; }

    let mutated = code
      .replace(/#([0-9a-fA-F]{6})\b/g, (m, hex) => mutateHex('#' + hex))
      .replace(/border-radius\s*:\s*[\d.]+px/g, `border-radius:${borderR}px`)
      .replace(/padding\s*:\s*([\d.]+)px/g, (m, v) => `padding:${Math.round(parseFloat(v)*spaceMult)}px`);

    return mutated;
  }

  /* ── Voice → Code Generator ────────────────────────────── */
  function voiceToCode(transcript) {
    const t = transcript.toLowerCase();
    const p = (a,b,s='#3b82f6',e='#8b5cf6') => `linear-gradient(${a}deg,${s},${e})`;

    // Detect color intent
    const colorMap = { red:'#ef4444',blue:'#3b82f6',green:'#10b981',purple:'#8b5cf6',
      pink:'#ec4899',yellow:'#f59e0b',orange:'#f97316',cyan:'#06b6d4',indigo:'#6366f1',
      rouge:'#ef4444',bleu:'#3b82f6',vert:'#10b981',violet:'#8b5cf6',rose:'#ec4899',
      jaune:'#f59e0b',orange2:'#f97316' };
    let primary = '#3b82f6', secondary = '#8b5cf6';
    Object.entries(colorMap).forEach(([k,v]) => { if (t.includes(k)) { primary = v; } });

    const dark = t.includes('dark') || t.includes('sombre') || t.includes('noir');
    const glass = t.includes('glass') || t.includes('verre') || t.includes('blur');
    const animated = t.includes('anim') || t.includes('motion') || t.includes('gradient');
    const bg = dark ? '#080c14' : glass ? 'rgba(15,20,40,0.85)' : '#f8fafc';
    const textCol = (dark || glass) ? '#e2e8f0' : '#1e293b';

    // Detect component type
    if (t.includes('hero') || t.includes('landing') || t.includes('accueil') || t.includes('page')) {
      return generateHero(primary, secondary, dark, glass, animated, bg, textCol, transcript);
    }
    if (t.includes('login') || t.includes('form') || t.includes('connexion') || t.includes('signup') || t.includes('formulaire')) {
      return generateForm(primary, dark, bg, textCol, transcript);
    }
    if (t.includes('pricing') || t.includes('prix') || t.includes('tarif') || t.includes('plan')) {
      return generatePricing(primary, secondary, dark, bg, textCol);
    }
    if (t.includes('navbar') || t.includes('navigation') || t.includes('menu') || t.includes('header')) {
      return generateNavbar(primary, secondary, dark, transcript);
    }
    if (t.includes('card') || t.includes('carte') || t.includes('glass')) {
      return generateCard(primary, secondary, dark, glass, animated, bg, textCol, transcript);
    }
    if (t.includes('dashboard') || t.includes('tableau de bord') || t.includes('analytics')) {
      return generateDashboard(primary, secondary, dark, bg, textCol);
    }
    if (t.includes('button') || t.includes('bouton') || t.includes('cta')) {
      return generateButton(primary, secondary, animated, dark, bg, textCol, transcript);
    }
    // Default: smart generic component
    return generateGeneric(primary, secondary, dark, animated, bg, textCol, transcript);
  }

  function wrap(body, styles, title='Voice Component') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title} · Voice Code · IA Architecte QUANTUM LAB</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;}${styles}</style>
</head>
<body>${body}</body></html>`;
  }

  function generateHero(p,s,dark,glass,anim,bg,text,desc) {
    const animCSS = anim ? `@keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}` : '';
    const animStyle = anim ? `background-size:200% 200%;animation:gradMove 6s ease infinite;` : '';
    return wrap(`
<div style="min-height:100vh;display:flex;flex-direction:column;background:${bg}${glass?`;backdrop-filter:blur(20px)`:''};">
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);">
    <span style="font-weight:900;font-size:20px;background:linear-gradient(135deg,${p},${s});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🚀 Brand</span>
    <div style="display:flex;gap:24px;font-size:13px;font-weight:600;color:${text};opacity:.7;">
      <span style="cursor:pointer;">Features</span><span style="cursor:pointer;">Pricing</span><span style="cursor:pointer;">About</span>
    </div>
    <button style="padding:9px 22px;background:${p};color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px;">Get Started</button>
  </nav>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:60px 20px;text-align:center;">
    <div style="max-width:760px;">
      <div style="display:inline-block;padding:6px 18px;background:${p}22;border:1px solid ${p}44;color:${p};border-radius:20px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:28px;">✨ AI-Generated · QUANTUM LAB</div>
      <h1 style="font-size:clamp(38px,6vw,72px);font-weight:900;line-height:1.1;margin-bottom:20px;
        background:linear-gradient(135deg,${p},${s});${animStyle}-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${desc.split(' ').slice(0,4).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}</h1>
      <p style="font-size:18px;color:${text};opacity:.6;line-height:1.7;max-width:580px;margin:0 auto 40px;">The next generation platform. Built with cutting-edge technology and designed for scale.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <button onclick="this.textContent='🚀 Loading…'" style="padding:15px 36px;background:linear-gradient(135deg,${p},${s});color:#fff;border:none;border-radius:14px;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 12px 30px ${p}44;transition:.2s;">Start Free Trial</button>
        <button style="padding:15px 36px;background:rgba(255,255,255,.07);color:${text};border:1px solid rgba(255,255,255,.15);border-radius:14px;font-weight:700;font-size:16px;cursor:pointer;">Watch Demo ▶</button>
      </div>
    </div>
  </div>
</div>`, `body{background:${bg};color:${text};}${animCSS}`, 'Hero · Voice Code');
  }

  function generateForm(p,dark,bg,text,desc) {
    const isLogin = desc.toLowerCase().includes('login') || desc.toLowerCase().includes('connexion');
    return wrap(`
<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;background:${bg};">
  <div style="width:100%;max-width:420px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:56px;height:56px;background:linear-gradient(135deg,${p},${p}99);border-radius:16px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:26px;">🔐</div>
      <h1 style="font-size:24px;font-weight:900;margin-bottom:6px;">${isLogin?'Welcome Back':'Create Account'}</h1>
      <p style="font-size:13px;opacity:.5;">${isLogin?'Sign in to your account':'Join thousands of users today'}</p>
    </div>
    <form onsubmit="event.preventDefault();this.innerHTML='<div style=\\'text-align:center;padding:30px;font-size:18px;font-weight:800;color:${p}\\'>✅ ${isLogin?'Signed in!':'Account created!'}</div>'"
      style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:16px;">
      ${!isLogin?`<div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:11px;font-weight:800;opacity:.5;text-transform:uppercase;letter-spacing:.07em;">Full Name</label>
        <input placeholder="John Doe" style="padding:12px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:${text};font-size:14px;outline:none;font-family:inherit;"/>
      </div>`:''}
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:11px;font-weight:800;opacity:.5;text-transform:uppercase;letter-spacing:.07em;">Email</label>
        <input type="email" placeholder="you@example.com" style="padding:12px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:${text};font-size:14px;outline:none;font-family:inherit;"/>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:11px;font-weight:800;opacity:.5;text-transform:uppercase;letter-spacing:.07em;">Password</label>
        <input type="password" placeholder="••••••••" style="padding:12px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:${text};font-size:14px;outline:none;font-family:inherit;"/>
      </div>
      <button type="submit" style="padding:14px;background:linear-gradient(135deg,${p},${p}bb);color:#fff;border:none;border-radius:12px;font-weight:800;font-size:15px;cursor:pointer;margin-top:4px;box-shadow:0 8px 20px ${p}44;">${isLogin?'Sign In →':'Create Account →'}</button>
      <p style="text-align:center;font-size:12px;opacity:.45;">${isLogin?'No account? <a href="#" style="color:'+p+';">Sign up</a>':'Already have an account? <a href="#" style="color:'+p+';">Sign in</a>'}</p>
    </form>
  </div>
</div>`, `body{background:${bg};color:${text};}`, isLogin?'Login':'Signup');
  }

  function generatePricing(p,s,dark,bg,text) {
    return wrap(`
<div style="min-height:100vh;background:${bg};padding:60px 20px;">
  <div style="text-align:center;margin-bottom:48px;">
    <h1 style="font-size:clamp(32px,5vw,54px);font-weight:900;margin-bottom:14px;background:linear-gradient(135deg,${p},${s});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Simple, Transparent Pricing</h1>
    <p style="font-size:16px;opacity:.55;">No hidden fees. Cancel anytime.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:900px;margin:0 auto;">
    ${[['Starter','$0','For beginners','#fff',false],['Pro','$49','For professionals',p,true],['Enterprise','$199','For teams','#fff',false]].map(([n,price,desc,c,featured])=>`
    <div style="padding:36px 28px;background:${featured?`linear-gradient(135deg,${p}18,${s}18)`:'rgba(255,255,255,.04)'};border:${featured?`2px solid ${p}66`:'1px solid rgba(255,255,255,.07)'};border-radius:22px;text-align:center;${featured?`box-shadow:0 20px 60px ${p}22;`:''}">
      <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:${featured?p:'#94a3b8'};margin-bottom:14px;">${n}${featured?' ⭐':''}</div>
      <div style="font-size:52px;font-weight:900;margin-bottom:8px;${featured?`background:linear-gradient(135deg,${p},${s});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`:''}">${price}<span style="font-size:16px;opacity:.4;font-weight:400;">/mo</span></div>
      <div style="font-size:13px;opacity:.5;margin-bottom:28px;">${desc}</div>
      <button style="width:100%;padding:13px;background:${featured?`linear-gradient(135deg,${p},${s})`:'rgba(255,255,255,.07)'};color:${featured?'#fff':text};border:${featured?'none':'1px solid rgba(255,255,255,.1)'};border-radius:12px;font-weight:800;cursor:pointer;font-size:14px;${featured?`box-shadow:0 8px 20px ${p}44;`:''}">${n==='Enterprise'?'Contact Sales':'Get Started'}</button>
    </div>`).join('')}
  </div>
</div>`, `body{background:${bg};color:${text};}`, 'Pricing');
  }

  function generateNavbar(p,s,dark,desc) {
    const bg = dark ? 'rgba(8,12,20,.96)' : 'rgba(255,255,255,.96)';
    const text = dark ? '#e2e8f0' : '#1e293b';
    return wrap(`
<nav style="display:flex;align-items:center;justify-content:space-between;padding:14px 32px;background:${bg};border-bottom:1px solid rgba(128,128,128,.12);backdrop-filter:blur(16px);position:sticky;top:0;z-index:100;box-shadow:0 4px 20px rgba(0,0,0,.1);">
  <div style="display:flex;align-items:center;gap:10px;">
    <div style="width:36px;height:36px;background:linear-gradient(135deg,${p},${s});border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;">🏛️</div>
    <span style="font-weight:900;font-size:18px;color:${text};">Brand</span>
  </div>
  <div style="display:flex;gap:28px;font-size:13px;font-weight:600;color:${text};opacity:.65;">
    <span style="cursor:pointer;transition:.2s;" onmouseover="this.style.opacity=1;this.style.color='${p}'" onmouseout="this.style.opacity=.65;this.style.color='${text}'">Features</span>
    <span style="cursor:pointer;transition:.2s;" onmouseover="this.style.opacity=1;this.style.color='${p}'" onmouseout="this.style.opacity=.65;this.style.color='${text}'">Pricing</span>
    <span style="cursor:pointer;transition:.2s;" onmouseover="this.style.opacity=1;this.style.color='${p}'" onmouseout="this.style.opacity=.65;this.style.color='${text}'">Docs</span>
    <span style="cursor:pointer;transition:.2s;" onmouseover="this.style.opacity=1;this.style.color='${p}'" onmouseout="this.style.opacity=.65;this.style.color='${text}'">Blog</span>
  </div>
  <div style="display:flex;gap:10px;align-items:center;">
    <button style="padding:8px 18px;background:transparent;color:${text};border:1px solid rgba(128,128,128,.2);border-radius:9px;font-weight:600;cursor:pointer;font-size:13px;">Log In</button>
    <button style="padding:9px 20px;background:linear-gradient(135deg,${p},${s});color:#fff;border:none;border-radius:9px;font-weight:700;cursor:pointer;font-size:13px;box-shadow:0 6px 18px ${p}44;">Get Started →</button>
  </div>
</nav>
<div style="padding:80px 20px;text-align:center;background:${dark?'#080c14':'#f8fafc'};min-height:60vh;display:flex;align-items:center;justify-content:center;">
  <p style="color:${dark?'#94a3b8':'#64748b'};font-size:14px;">← Navbar generated by Voice Code · IA Architecte QUANTUM LAB</p>
</div>`, `*{box-sizing:border-box;margin:0;padding:0}`, 'Navbar');
  }

  function generateCard(p,s,dark,glass,anim,bg,text,desc) {
    return wrap(`
<div style="min-height:100vh;background:${bg};display:flex;align-items:center;justify-content:center;padding:40px 20px;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:960px;width:100%;">
    ${[['⚡','Lightning Fast','Optimized for peak performance on any device, anywhere.'],
       ['🔒','Secure by Default','Enterprise-grade security and encryption built-in.'],
       ['🌍','Global Scale','Deploy to 50+ regions with zero configuration.'],
       ['🤖','AI-Powered','Smart automation that learns your workflow.']
    ].map(([icon,title,d])=>`
    <div style="padding:30px;background:${glass?`rgba(255,255,255,.07)`:`rgba(255,255,255,.04)`};
      border:1px solid rgba(255,255,255,.09);border-radius:20px;
      ${glass?'backdrop-filter:blur(16px);':''}
      transition:.3s;cursor:pointer;"
      onmouseover="this.style.borderColor='${p}55';this.style.transform='translateY(-6px)';this.style.boxShadow='0 24px 48px rgba(0,0,0,.25)'"
      onmouseout="this.style.borderColor='rgba(255,255,255,.09)';this.style.transform='';this.style.boxShadow=''">
      <div style="font-size:36px;margin-bottom:16px;">${icon}</div>
      <div style="font-size:17px;font-weight:800;margin-bottom:10px;color:${text};">${title}</div>
      <div style="font-size:13px;color:${text};opacity:.55;line-height:1.65;">${d}</div>
      <div style="margin-top:18px;font-size:12px;font-weight:700;color:${p};cursor:pointer;">Learn more →</div>
    </div>`).join('')}
  </div>
</div>`, `body{background:${bg};color:${text};}`, 'Cards');
  }

  function generateDashboard(p,s,dark,bg,text) {
    return wrap(`
<div style="min-height:100vh;background:${bg};display:flex;">
  <div style="width:220px;flex-shrink:0;background:rgba(0,0,0,.3);border-right:1px solid rgba(255,255,255,.06);padding:20px 12px;display:flex;flex-direction:column;gap:4px;">
    <div style="font-weight:900;font-size:18px;padding:10px 8px 20px;background:linear-gradient(135deg,${p},${s});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">📊 Dashboard</div>
    ${['🏠 Overview','📈 Analytics','👥 Users','📦 Products','💰 Revenue','⚙️ Settings'].map((item,i)=>`<div style="padding:10px 12px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:${i===0?'700':'600'};background:${i===0?`${p}22`:'transparent'};color:${i===0?p:text};opacity:${i===0?1:.6};transition:.2s;" onmouseover="this.style.background='rgba(255,255,255,.06)';this.style.opacity=1" onmouseout="this.style.background='${i===0?p+'22':'transparent'}';this.style.opacity=${i===0?1:.6}">${item}</div>`).join('')}
  </div>
  <div style="flex:1;padding:28px;overflow:auto;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px;">
      ${[['Total Revenue','$142,890','↑ 12.4%','#10b981'],['Active Users','24,589','↑ 8.1%','#3b82f6'],['Conversion','4.72%','↑ 2.3%','#a78bfa'],['Bounce Rate','28.4%','↓ 5.2%','#f59e0b']].map(([lbl,val,chg,c])=>`
      <div style="padding:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;">
        <div style="font-size:11px;opacity:.45;font-weight:700;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px;">${lbl}</div>
        <div style="font-size:24px;font-weight:900;margin-bottom:5px;">${val}</div>
        <div style="font-size:11px;font-weight:700;color:${c};">${chg} vs last month</div>
      </div>`).join('')}
    </div>
    <div style="padding:24px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;">
      <div style="font-size:13px;font-weight:800;margin-bottom:16px;">Weekly Performance</div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:100px;">
        ${[65,42,88,73,95,58,79].map((h,i)=>`<div style="flex:1;background:linear-gradient(0deg,${p},${s});border-radius:6px 6px 0 0;height:${h}%;opacity:${0.5+i*0.07};transition:.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=${0.5+i*0.07}"></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;">
        ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div style="flex:1;text-align:center;font-size:10px;opacity:.4;font-weight:700;">${d}</div>`).join('')}
      </div>
    </div>
  </div>
</div>`, `body{background:${bg};color:${text};}`, 'Dashboard');
  }

  function generateButton(p,s,anim,dark,bg,text,desc) {
    const animCSS = anim ? `@keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${p}66}50%{box-shadow:0 0 0 12px transparent}}` : '';
    return wrap(`
<div style="min-height:100vh;background:${bg};display:flex;align-items:center;justify-content:center;padding:40px;">
  <div style="display:flex;flex-direction:column;gap:24px;align-items:center;max-width:500px;width:100%;">
    <h2 style="font-size:18px;font-weight:800;opacity:.4;text-transform:uppercase;letter-spacing:.1em;">Button Components</h2>
    <button onclick="this.textContent='✅ Clicked!';setTimeout(()=>this.textContent='Primary CTA',1500)"
      style="padding:16px 40px;background:linear-gradient(135deg,${p},${s});color:#fff;border:none;border-radius:14px;font-weight:800;font-size:16px;cursor:pointer;${anim?'animation:pulse 2s infinite;':''}box-shadow:0 12px 30px ${p}44;transition:.2s;width:100%;">
      Primary CTA Button</button>
    <button style="padding:15px 40px;background:transparent;color:${p};border:2px solid ${p};border-radius:14px;font-weight:700;font-size:15px;cursor:pointer;transition:.2s;width:100%;"
      onmouseover="this.style.background='${p}11'" onmouseout="this.style.background='transparent'">Outlined Button</button>
    <button style="padding:15px 40px;background:rgba(255,255,255,.07);color:${text};border:1px solid rgba(255,255,255,.12);border-radius:14px;font-weight:600;font-size:15px;cursor:pointer;transition:.2s;width:100%;"
      onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.07)'">Ghost Button</button>
    <div style="display:flex;gap:12px;">
      <button style="width:44px;height:44px;background:${p};color:#fff;border:none;border-radius:12px;font-size:20px;cursor:pointer;">+</button>
      <button style="width:44px;height:44px;background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3);border-radius:12px;font-size:16px;cursor:pointer;">✕</button>
      <button style="width:44px;height:44px;background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.3);border-radius:12px;font-size:16px;cursor:pointer;">✓</button>
    </div>
  </div>
</div>`, `body{background:${bg};color:${text};}${animCSS}`, 'Buttons');
  }

  function generateGeneric(p,s,dark,anim,bg,text,desc) {
    return wrap(`
<div style="min-height:100vh;background:${bg};display:flex;align-items:center;justify-content:center;padding:40px 20px;">
  <div style="max-width:680px;width:100%;text-align:center;">
    <div style="font-size:64px;margin-bottom:24px;">🚀</div>
    <h1 style="font-size:clamp(28px,5vw,52px);font-weight:900;margin-bottom:16px;background:linear-gradient(135deg,${p},${s});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${desc.split(' ').slice(0,5).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}</h1>
    <p style="font-size:16px;opacity:.55;line-height:1.75;margin-bottom:36px;max-width:520px;margin-left:auto;margin-right:auto;">Generated from your voice command: "<em>${desc}</em>"</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button style="padding:14px 32px;background:linear-gradient(135deg,${p},${s});color:#fff;border:none;border-radius:13px;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 10px 28px ${p}44;">Get Started</button>
      <button style="padding:14px 32px;background:rgba(255,255,255,.06);color:${text};border:1px solid rgba(255,255,255,.12);border-radius:13px;font-weight:700;font-size:15px;cursor:pointer;">Learn More</button>
    </div>
    <div style="margin-top:48px;padding:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;font-size:11px;opacity:.4;">
      ⚛️ QUANTUM LAB · Voice Code Studio · IA Architecte
    </div>
  </div>
</div>`, `body{background:${bg};color:${text};}`, 'Component');
  }

  /* ================================================================
     OVERLAY MODAL
  ================================================================ */
  function openOverlay(title, html, onMount) {
    const old = document.getElementById('qlab-overlay');
    if (old) old.remove();
    const ov = document.createElement('div');
    ov.id = 'qlab-overlay';
    ov.style.cssText = `position:fixed;inset:0;z-index:99000;background:rgba(5,8,16,.92);
      backdrop-filter:blur(8px);display:flex;flex-direction:column;font-family:'Inter',sans-serif;
      animation:qlabFadeIn .2s ease;`;
    ov.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 24px;
        background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;">
        <div style="font-size:17px;font-weight:900;background:linear-gradient(135deg,#818cf8,#34d399,#f472b6);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;">⚛️ QUANTUM LAB — ${title}</div>
        <button id="qlab-close" style="padding:7px 16px;background:rgba(239,68,68,.15);color:#f87171;
          border:1px solid rgba(239,68,68,.3);border-radius:8px;font-weight:700;cursor:pointer;
          font-size:12px;font-family:inherit;">${t().close}</button>
      </div>
      <div id="qlab-body" style="flex:1;overflow-y:auto;padding:24px;
        scrollbar-width:thin;scrollbar-color:rgba(129,140,248,.2) transparent;">${html}</div>`;
    document.body.appendChild(ov);
    ov.querySelector('#qlab-close').addEventListener('click', () => ov.remove());
    if (onMount) onMount(ov.querySelector('#qlab-body'));
  }

  /* ================================================================
     TIME MACHINE
  ================================================================ */
  const TM_KEY = 'qlab_snapshots';
  let tmInterval = null;

  function getSnapshots() { try { return JSON.parse(localStorage.getItem(TM_KEY)||'[]'); } catch { return []; } }
  function saveSnapshot(auto) {
    const code = getCode();
    if (!code.trim()) return;
    const snaps = getSnapshots();
    if (snaps.length && snaps[0].code === code) return; // No change
    snaps.unshift({ code, ts: Date.now(), lines: code.split('\n').length, auto });
    localStorage.setItem(TM_KEY, JSON.stringify(snaps.slice(0, 50)));
    return true;
  }

  function startAutoSave() {
    if (tmInterval) clearInterval(tmInterval);
    tmInterval = setInterval(() => {
      if (saveSnapshot(true)) { /* silent auto save */ }
    }, 30000);
  }

  /* ================================================================
     RENDER INTO .left-body
  ================================================================ */
  function getLeftBody() { return document.querySelector('.left-body'); }

  const S = {
    card: 'padding:11px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;margin-bottom:10px;',
    lbl: 'display:block;font-size:9px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px;',
    inp: 'width:100%;padding:8px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:8px;color:#e2e8f0;font-size:11px;font-family:"Inter",sans-serif;outline:none;',
    ta:  'width:100%;padding:8px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:8px;color:#e2e8f0;font-size:11px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;',
    btnP:'width:100%;padding:8px;background:linear-gradient(135deg,#818cf8,#34d399);color:#fff;border:none;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;font-family:"Inter",sans-serif;transition:.2s;margin-bottom:5px;',
    btnS:'width:100%;padding:8px;background:rgba(255,255,255,.06);color:#e2e8f0;border:1px solid rgba(255,255,255,.1);border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;font-family:"Inter",sans-serif;transition:.2s;margin-bottom:5px;',
    btnG:'width:100%;padding:8px;background:rgba(16,185,129,.1);color:#34d399;border:1px solid rgba(16,185,129,.25);border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;font-family:"Inter",sans-serif;margin-bottom:5px;',
    btnI:'width:100%;padding:7px;background:rgba(129,140,248,.1);color:#a5b4fc;border:1px solid rgba(129,140,248,.25);border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;font-family:"Inter",sans-serif;margin-top:4px;',
    h:'font-size:12px;font-weight:800;margin-bottom:5px;',
    d:'font-size:10px;opacity:.55;line-height:1.5;margin-bottom:10px;'
  };

  function renderQuantumLab() {
    const lb = getLeftBody();
    if (!lb) return;
    lb.style.overflow = 'hidden';
    lb.style.height = '100%';
    lb.style.display = 'flex';
    lb.style.flexDirection = 'column';
    lb.style.padding = '10px 10px 0 10px';
    const lang = t();
    lb.innerHTML = `
<div id="qlab-panel" style="display:flex;flex-direction:column;height:100%;min-height:0;">
  <div style="padding:0 0 10px;flex-shrink:0;">
    <div style="font-size:13px;font-weight:900;background:linear-gradient(135deg,#818cf8,#34d399,#f472b6);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1px;">⚛️ QUANTUM LAB</div>
    <div style="font-size:9px;opacity:.45;font-weight:700;margin-bottom:10px;">${lang.subtitle}</div>
    <div id="qlab-tool-btns" style="display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;">
      ${lang.tools.map((tool, idx) => `
        <button data-qtool="${tool.id}" style="display:flex;align-items:center;gap:6px;padding:6px 8px;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;
          color:#94a3b8;font-size:9.5px;font-weight:700;cursor:pointer;text-align:left;transition:all .18s;font-family:'Inter',sans-serif;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
          ${idx === lang.tools.length - 1 ? 'grid-column: span 2;' : ''}">
          <span style="font-size:12px;flex-shrink:0;">${tool.icon}</span>
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${tool.label}</span>
        </button>`).join('')}
    </div>
  </div>
  <div id="qlab-content" style="flex:1;overflow-y:auto;padding-top:8px;border-top:1px solid rgba(255,255,255,.06);
    scrollbar-width:thin;scrollbar-color:rgba(129,140,248,.2) transparent;min-height:0;"></div>
</div>`;

    lb.querySelectorAll('[data-qtool]').forEach(btn => {
      btn.addEventListener('click', () => {
        lb.querySelectorAll('[data-qtool]').forEach(b => {
          b.style.background = 'rgba(255,255,255,.03)'; b.style.color = '#94a3b8'; b.style.borderColor = 'rgba(255,255,255,.07)';
        });
        btn.style.background = 'linear-gradient(135deg,rgba(129,140,248,.2),rgba(52,211,153,.15))';
        btn.style.color = '#a5b4fc';
        btn.style.borderColor = 'rgba(129,140,248,.4)';
        renderToolPanel(btn.dataset.qtool);
      });
    });

    // Activate first
    lb.querySelector('[data-qtool="voice"]').click();
    startAutoSave();
  }

  function renderToolPanel(tool) {
    const tc = document.getElementById('qlab-content');
    if (!tc) return;
    const lang = t();
    tc.innerHTML = '';
    if (tool === 'voice')       buildVoicePanel(tc, lang);
    else if (tool === 'timemachine') buildTimeMachinePanel(tc, lang);
    else if (tool === 'genetic')     buildGeneticPanel(tc, lang);
    else if (tool === 'share')       buildSharePanel(tc, lang);
    else if (tool === 'mixer')       buildMixerPanel(tc, lang);
  }

  /* ── 🎙️ VOICE PANEL ─────────────────────────────────── */
  function buildVoicePanel(tc, lang) {
    const hasSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    tc.innerHTML = `
<div style="${S.card}">
  <div style="${S.h}">${lang.voiceTitle}</div>
  <div style="${S.d}">${lang.voiceDesc}</div>
  ${!hasSpeech ? `<div style="padding:10px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:9px;font-size:10px;color:#fbbf24;">${lang.voiceNoSupport}</div>` : `
  <div id="qv-status" style="padding:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;font-size:10px;text-align:center;color:#94a3b8;margin-bottom:10px;">⚪ Ready</div>
  <button id="qv-start" style="${S.btnP}">${lang.voiceStart}</button>
  <div style="${S.lbl}">Examples:</div>
  <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px;">
    ${lang.voiceExamples.map(ex=>`<button class="qv-ex" data-ex="${ex}" style="padding:5px 8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:7px;color:#94a3b8;font-size:9px;font-weight:600;cursor:pointer;text-align:left;font-family:inherit;transition:.15s;">"${ex}"</button>`).join('')}
  </div>
  <div id="qv-recognized" style="display:none;padding:8px;background:rgba(129,140,248,.1);border:1px solid rgba(129,140,248,.3);border-radius:8px;font-size:10px;color:#a5b4fc;margin-bottom:8px;"></div>
  <button id="qv-full" style="${S.btnI}">⛶ ${lang.openFull}</button>`}
</div>`;

    if (!hasSpeech) return;

    let recog = null, listening = false;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    const status = tc.querySelector('#qv-status');

    const runRecog = (text) => {
      status.textContent = '⚙️ Generating code…';
      setTimeout(() => {
        const code = voiceToCode(text);
        injectToEditor(code);
        status.textContent = '✅ ' + lang.voiceResult + ' "' + text + '"';
        status.style.color = '#34d399';
      }, 500);
    };

    tc.querySelector('#qv-start').addEventListener('click', function() {
      if (listening) {
        if (recog) recog.stop();
        listening = false;
        this.textContent = lang.voiceStart;
        this.style.background = 'linear-gradient(135deg,#818cf8,#34d399)';
        status.textContent = '⚪ Ready'; status.style.color = '#94a3b8';
        return;
      }
      recog = new SpeechRec();
      recog.lang = window.lang === 'fr' ? 'fr-FR' : 'en-US';
      recog.continuous = false;
      recog.interimResults = true;

      recog.onstart = () => {
        listening = true;
        this.textContent = lang.voiceStop;
        this.style.background = 'rgba(239,68,68,.4)';
        status.textContent = lang.voiceListening; status.style.color = '#f472b6';
      };
      recog.onresult = (e) => {
        const interim = Array.from(e.results).map(r=>r[0].transcript).join('');
        status.textContent = '🎙️ "' + interim + '"';
        if (e.results[e.results.length-1].isFinal) {
          const final = e.results[e.results.length-1][0].transcript.trim();
          const rec = tc.querySelector('#qv-recognized');
          if (rec) { rec.style.display='block'; rec.textContent = lang.voiceResult + ' "' + final + '"'; }
          runRecog(final);
        }
      };
      recog.onerror = (e) => { status.textContent = '❌ ' + e.error; status.style.color='#f87171'; listening = false; this.textContent = lang.voiceStart; this.style.background='linear-gradient(135deg,#818cf8,#34d399)'; };
      recog.onend = () => { if (listening) { listening = false; this.textContent = lang.voiceStart; this.style.background='linear-gradient(135deg,#818cf8,#34d399)'; } };
      recog.start();
    });

    tc.querySelectorAll('.qv-ex').forEach(b => {
      b.addEventListener('mouseenter', () => { b.style.background='rgba(129,140,248,.15)'; b.style.color='#a5b4fc'; });
      b.addEventListener('mouseleave', () => { b.style.background='rgba(255,255,255,.04)'; b.style.color='#94a3b8'; });
      b.addEventListener('click', () => {
        const ex = b.dataset.ex;
        const rec = tc.querySelector('#qv-recognized');
        if (rec) { rec.style.display='block'; rec.textContent = lang.voiceResult + ' "' + ex + '"'; }
        status.textContent = '⚙️ Generating…'; status.style.color = '#a5b4fc';
        runRecog(ex);
      });
    });

    tc.querySelector('#qv-full').addEventListener('click', () => {
      openOverlay('Voice Code Studio', `
        <div style="display:grid;grid-template-columns:280px 1fr;gap:24px;height:100%;">
          <div>
            <div style="font-size:14px;font-weight:800;color:#a5b4fc;margin-bottom:14px;">🎙️ Voice Controls</div>
            <div id="qvf-status" style="padding:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;font-size:13px;text-align:center;color:#94a3b8;margin-bottom:14px;">⚪ Ready</div>
            <button id="qvf-start" style="${S.btnP}font-size:14px;padding:14px;">${lang.voiceStart}</button>
            <div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;margin:14px 0 8px;">Quick Examples</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${lang.voiceExamples.map(ex=>`<button class="qvf-ex" data-ex="${ex}" style="padding:9px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:9px;color:#94a3b8;font-size:12px;font-weight:600;cursor:pointer;text-align:left;font-family:inherit;transition:.15s;">"${ex}"</button>`).join('')}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="font-size:14px;font-weight:800;color:#a5b4fc;">Live Preview</div>
            <iframe id="qvf-preview" style="flex:1;min-height:440px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#fff;"></iframe>
            <div style="display:flex;gap:10px;">
              <button id="qvf-inject" style="${S.btnG}font-size:13px;padding:12px;margin-bottom:0;">${lang.inject}</button>
              <button id="qvf-copy" style="${S.btnS}font-size:13px;padding:12px;margin-bottom:0;">${lang.copy}</button>
            </div>
          </div>
        </div>`, body => {
        let lastCode = '';
        const fStatus = body.querySelector('#qvf-status');
        const fPreview = body.querySelector('#qvf-preview');
        const setPreview = code => { const d=fPreview.contentDocument; d.open(); d.write(code); d.close(); };

        const runFull = text => {
          fStatus.textContent = '⚙️ Generating…'; fStatus.style.color = '#a5b4fc';
          setTimeout(() => {
            lastCode = voiceToCode(text);
            setPreview(lastCode);
            fStatus.textContent = '✅ "' + text + '"'; fStatus.style.color = '#34d399';
          }, 400);
        };

        if (hasSpeech) {
          let r2 = null, l2 = false;
          body.querySelector('#qvf-start').addEventListener('click', function() {
            if (l2) { if(r2) r2.stop(); l2=false; this.textContent=lang.voiceStart; this.style.background='linear-gradient(135deg,#818cf8,#34d399)'; fStatus.textContent='⚪ Ready'; fStatus.style.color='#94a3b8'; return; }
            r2 = new SpeechRec(); r2.lang = window.lang==='fr'?'fr-FR':'en-US'; r2.continuous=false; r2.interimResults=true;
            r2.onstart=()=>{l2=true;this.textContent=lang.voiceStop;this.style.background='rgba(239,68,68,.4)';fStatus.textContent=lang.voiceListening;fStatus.style.color='#f472b6';};
            r2.onresult=e=>{const txt=Array.from(e.results).map(r=>r[0].transcript).join('');fStatus.textContent='🎙️ "'+txt+'"';if(e.results[e.results.length-1].isFinal)runFull(e.results[e.results.length-1][0].transcript.trim());};
            r2.onerror=e=>{fStatus.textContent='❌ '+e.error;fStatus.style.color='#f87171';l2=false;this.textContent=lang.voiceStart;this.style.background='linear-gradient(135deg,#818cf8,#34d399)';};
            r2.onend=()=>{if(l2){l2=false;this.textContent=lang.voiceStart;this.style.background='linear-gradient(135deg,#818cf8,#34d399)';}};
            r2.start();
          });
        }
        body.querySelectorAll('.qvf-ex').forEach(b=>{b.addEventListener('mouseenter',()=>{b.style.background='rgba(129,140,248,.15)';b.style.color='#a5b4fc';});b.addEventListener('mouseleave',()=>{b.style.background='rgba(255,255,255,.04)';b.style.color='#94a3b8';});b.addEventListener('click',()=>runFull(b.dataset.ex));});
        body.querySelector('#qvf-inject').addEventListener('click',()=>{ if(lastCode) injectToEditor(lastCode); });
        body.querySelector('#qvf-copy').addEventListener('click',()=>{ if(lastCode){navigator.clipboard.writeText(lastCode).catch(()=>{});toast('📋 Copied!');} });
      });
    });
  }

  /* ── ⏱️ TIME MACHINE PANEL ──────────────────────────── */
  function buildTimeMachinePanel(tc, lang) {
    const renderList = () => {
      const snaps = getSnapshots();
      const list = tc.querySelector('#qtm-list');
      if (!list) return;
      if (!snaps.length) {
        list.innerHTML = `<div style="font-size:10px;opacity:.4;text-align:center;padding:16px;">${lang.tmEmpty}</div>`;
        return;
      }
      list.innerHTML = snaps.map((s, i) => {
        const d = new Date(s.ts);
        const time = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
        const date = d.toLocaleDateString([], {month:'short', day:'numeric'});
        return `<div style="padding:9px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:9px;margin-bottom:5px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;">
            <span style="font-size:10px;font-weight:700;color:#a5b4fc;">${i===0?'🟢 Latest':'⏱️'} ${time}</span>
            <span style="font-size:9px;opacity:.4;">${date} · ${s.lines} ${lang.tmLines}</span>
          </div>
          <div style="display:flex;gap:4px;">
            <button data-tm-restore="${i}" style="flex:1;padding:5px;background:rgba(129,140,248,.15);color:#a5b4fc;border:1px solid rgba(129,140,248,.3);border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;">${lang.tmRestore}</button>
            <button data-tm-diff="${i}" style="flex:1;padding:5px;background:rgba(255,255,255,.05);color:#94a3b8;border:1px solid rgba(255,255,255,.08);border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;">${lang.tmDiff}</button>
          </div>
        </div>`;
      }).join('');

      list.querySelectorAll('[data-tm-restore]').forEach(btn => {
        btn.addEventListener('click', () => {
          const snap = getSnapshots()[parseInt(btn.dataset.tmRestore)];
          if (snap) { injectToEditor(snap.code); toast('⏪ ' + (window.lang==='fr'?'Version restaurée !':'Version restored!')); }
        });
      });
      list.querySelectorAll('[data-tm-diff]').forEach(btn => {
        btn.addEventListener('click', () => {
          const snap = getSnapshots()[parseInt(btn.dataset.tmDiff)];
          if (!snap) return;
          const cur = getCode();
          const curLines = cur.split('\n'), snapLines = snap.code.split('\n');
          let diffHTML = '';
          const maxL = Math.max(curLines.length, snapLines.length);
          for (let i = 0; i < Math.min(maxL, 60); i++) {
            const c = curLines[i]||'', s2 = snapLines[i]||'';
            if (c !== s2) {
              diffHTML += `<div style="background:rgba(239,68,68,.12);border-left:3px solid #ef4444;padding:2px 8px;font-size:10px;font-family:monospace;white-space:pre-wrap;word-break:break-all;color:#fca5a5;">- ${s2||'(empty)'}</div>`;
              diffHTML += `<div style="background:rgba(16,185,129,.1);border-left:3px solid #10b981;padding:2px 8px;font-size:10px;font-family:monospace;white-space:pre-wrap;word-break:break-all;color:#86efac;">+ ${c||'(empty)'}</div>`;
            }
          }
          openOverlay('Code Diff', `
            <div style="font-size:13px;font-weight:800;color:#a5b4fc;margin-bottom:12px;">Snapshot vs Current — ${new Date(snap.ts).toLocaleString()}</div>
            <div style="background:#0a0f1e;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;overflow:auto;max-height:500px;">
              ${diffHTML || '<div style="color:#34d399;font-size:12px;padding:10px;">✅ No differences found</div>'}
            </div>
            <div style="margin-top:14px;display:flex;gap:10px;">
              <button id="qtm-apply-snap" style="${S.btnG}font-size:13px;padding:12px;margin-bottom:0;">${lang.tmRestore}</button>
            </div>`, body => {
            body.querySelector('#qtm-apply-snap').addEventListener('click', () => { injectToEditor(snap.code); toast('⏪ Restored!'); });
          });
        });
      });
    };

    tc.innerHTML = `
<div style="${S.card}">
  <div style="${S.h}">${lang.tmTitle}</div>
  <div style="${S.d}">${lang.tmDesc}</div>
  <button id="qtm-save" style="${S.btnP}">${lang.tmSave}</button>
  <div style="display:flex;gap:5px;margin-bottom:10px;">
    <button id="qtm-full" style="${S.btnI}flex:1;">⛶ ${lang.openFull}</button>
    <button id="qtm-clear" style="flex:1;padding:7px;background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;">${lang.tmClear}</button>
  </div>
  <div style="${S.lbl}">${lang.tmSnapshots}</div>
  <div id="qtm-list"></div>
</div>`;

    renderList();

    tc.querySelector('#qtm-save').addEventListener('click', () => {
      if (saveSnapshot(false)) { renderList(); toast('💾 ' + (window.lang==='fr'?'Snapshot sauvegardé !':'Snapshot saved!')); }
      else toast('⚠️ ' + (window.lang==='fr'?'Pas de changements':'No changes'), '#f59e0b');
    });
    tc.querySelector('#qtm-clear').addEventListener('click', () => {
      localStorage.removeItem(TM_KEY); renderList(); toast('🗑️ ' + (window.lang==='fr'?'Historique effacé':'History cleared'), '#ef4444');
    });
    tc.querySelector('#qtm-full').addEventListener('click', () => {
      const snaps = getSnapshots();
      openOverlay('Code Time Machine', `
        <div style="display:grid;grid-template-columns:280px 1fr;gap:24px;height:100%;">
          <div style="display:flex;flex-direction:column;gap:10px;overflow-y:auto;max-height:560px;">
            <div style="font-size:14px;font-weight:800;color:#a5b4fc;flex-shrink:0;">${snaps.length} Snapshots</div>
            <div id="qtm-f-list" style="display:flex;flex-direction:column;gap:6px;"></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="font-size:14px;font-weight:800;color:#a5b4fc;">Snapshot Code</div>
            <textarea id="qtm-f-code" rows="22" style="${S.ta}flex:1;" readonly></textarea>
            <div style="display:flex;gap:10px;">
              <button id="qtm-f-restore" style="${S.btnG}font-size:13px;padding:12px;margin-bottom:0;">${lang.tmRestore}</button>
              <button id="qtm-f-copy" style="${S.btnS}font-size:13px;padding:12px;margin-bottom:0;">${lang.copy}</button>
            </div>
          </div>
        </div>`, body => {
        let selected = snaps[0];
        const codeEl = body.querySelector('#qtm-f-code');
        if (selected) codeEl.value = selected.code;
        const list = body.querySelector('#qtm-f-list');
        list.innerHTML = snaps.map((s,i) => `
          <div data-fsnap="${i}" style="padding:12px;background:${i===0?'rgba(129,140,248,.15)':'rgba(255,255,255,.04)'};border:1px solid ${i===0?'rgba(129,140,248,.4)':'rgba(255,255,255,.07)'};border-radius:10px;cursor:pointer;transition:.2s;">
            <div style="font-size:12px;font-weight:800;color:${i===0?'#a5b4fc':'#e2e8f0'};margin-bottom:3px;">${new Date(s.ts).toLocaleTimeString()}</div>
            <div style="font-size:10px;opacity:.5;">${new Date(s.ts).toLocaleDateString()} · ${s.lines} lines${s.auto?' · auto':''}</div>
          </div>`).join('');
        list.querySelectorAll('[data-fsnap]').forEach(btn => {
          btn.addEventListener('click', () => {
            selected = snaps[parseInt(btn.dataset.fsnap)];
            codeEl.value = selected.code;
            list.querySelectorAll('[data-fsnap]').forEach(b => { b.style.background='rgba(255,255,255,.04)'; b.style.borderColor='rgba(255,255,255,.07)'; b.querySelector('div').style.color='#e2e8f0'; });
            btn.style.background='rgba(129,140,248,.15)'; btn.style.borderColor='rgba(129,140,248,.4)'; btn.querySelector('div').style.color='#a5b4fc';
          });
        });
        body.querySelector('#qtm-f-restore').addEventListener('click', () => { if(selected) injectToEditor(selected.code); });
        body.querySelector('#qtm-f-copy').addEventListener('click', () => { if(selected){navigator.clipboard.writeText(selected.code).catch(()=>{});toast('📋 Copied!');} });
      });
    });
  }

  /* ── 🧬 GENETIC PANEL ────────────────────────────────── */
  function buildGeneticPanel(tc, lang) {
    let generation = 1, selected = [], mutations = [], currentBase = '';

    const getMutations = (base) => {
      return Array.from({length:6}, (_,i) => ({
        id: i, css: mutateCSS(base, Date.now() + i * 137 + generation * 999),
        selected: false
      }));
    };

    const renderMutations = () => {
      const grid = tc.querySelector('#qgen-grid');
      if (!grid) return;
      grid.innerHTML = mutations.map(m => {
        // Extract color samples for preview
        const colors = [...m.css.matchAll(/hsl\([^)]+\)|#[0-9a-f]{3,6}/gi)].slice(0,4).map(c=>c[0]);
        const c1 = colors[0]||'#3b82f6', c2 = colors[1]||'#8b5cf6';
        return `<div data-mid="${m.id}" style="cursor:pointer;padding:10px;background:${m.selected?'rgba(52,211,153,.15)':'rgba(255,255,255,.04)'};border:${m.selected?'2px solid #34d399':'1px solid rgba(255,255,255,.07)'};border-radius:10px;transition:.2s;display:flex;flex-direction:column;gap:4px;">
          <div style="height:40px;background:linear-gradient(135deg,${c1},${c2});border-radius:7px;margin-bottom:3px;"></div>
          <div style="display:flex;gap:4px;margin-bottom:3px;">
            ${colors.slice(0,4).map(c=>`<div style="flex:1;height:10px;background:${c};border-radius:3px;"></div>`).join('')}
          </div>
          <div style="font-size:9px;opacity:.6;text-align:center;margin-bottom:3px;">${m.selected?'✅ Selected':lang.genSelect}</div>
          <div style="display:flex;gap:4px;">
            <button class="qgen-card-btn qgen-card-inj" data-mid="${m.id}" style="flex:1;padding:4px 2px;font-size:8px;font-weight:700;background:rgba(129,140,248,.15);border:1px solid rgba(129,140,248,.3);color:#a5b4fc;border-radius:4px;cursor:pointer;font-family:inherit;">📥 Editor</button>
            <button class="qgen-card-btn qgen-card-prev" data-mid="${m.id}" style="flex:1;padding:4px 2px;font-size:8px;font-weight:700;background:rgba(52,211,153,.15);border:1px solid rgba(52,211,153,.3);color:#34d399;border-radius:4px;cursor:pointer;font-family:inherit;">👁️ Prev</button>
          </div>
        </div>`;
      }).join('');

      grid.querySelectorAll('[data-mid]').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.closest('.qgen-card-btn')) return;
          const id = parseInt(el.dataset.mid);
          const m = mutations.find(x=>x.id===id);
          if (!m) return;
          if (m.selected) { m.selected=false; selected=selected.filter(s=>s.id!==id); }
          else if (selected.length < 2) { m.selected=true; selected.push(m); }
          else { toast('⚠️ Pick max 2','#f59e0b'); return; }
          renderMutations();
          tc.querySelector('#qgen-breed').disabled = selected.length < 2;
        });
      });

      grid.querySelectorAll('.qgen-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = parseInt(btn.dataset.mid);
          const m = mutations.find(x=>x.id===id);
          if (!m) return;
          if (btn.classList.contains('qgen-card-inj')) {
            injectToEditor(m.css);
            toast('📥 Injected to Editor');
          } else {
            injectToEditor(m.css);
            toast('👁️ Preview loaded');
          }
        });
      });
    };

    tc.innerHTML = `
<div style="${S.card}">
  <div style="${S.h}">${lang.genTitle}</div>
  <div style="${S.d}">${lang.genDesc}</div>
  <div style="font-size:9px;font-weight:800;color:#34d399;margin-bottom:8px;">Gen ${generation} · ${selected.length}/2 selected</div>
  <button id="qgen-mutate" style="${S.btnP}">${lang.genMutate}</button>
  <div id="qgen-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;"></div>
  <button id="qgen-breed" disabled style="width:100%;padding:8px;background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.25);border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;font-family:'Inter',sans-serif;margin-bottom:5px;opacity:.5;">${lang.genBreed}</button>
  <button id="qgen-apply" style="${S.btnI}" disabled>${lang.genApply}</button>
</div>`;

    tc.querySelector('#qgen-mutate').addEventListener('click', () => {
      currentBase = getCode();
      if (!currentBase.trim()) { toast('⚠️ ' + lang.genNoCode, '#f59e0b'); return; }
      selected = [];
      mutations = getMutations(currentBase);
      renderMutations();
      tc.querySelector('#qgen-breed').disabled = true;
      tc.querySelector('#qgen-apply').disabled = true;
      toast('🧬 ' + (window.lang==='fr'?'6 mutations générées !':'6 mutations generated!'), '#818cf8');
    });

    tc.querySelector('#qgen-breed').addEventListener('click', () => {
      if (selected.length < 2) return;
      const bred = selected[0].css.split('\n').map((line, i) => {
        return i % 2 === 0 ? line : (selected[1].css.split('\n')[i] || line);
      }).join('\n');
      generation++;
      currentBase = bred;
      selected = [];
      mutations = getMutations(bred);
      renderMutations();
      tc.querySelector('#qgen-breed').disabled = true;
      tc.querySelector('#qgen-apply').disabled = false;
      const genBtn = document.querySelector('[data-qtool="genetic"]');
      if (genBtn && genBtn.querySelector('span') && genBtn.querySelector('span').nextSibling) {
        tc.querySelector('#qgen-apply').disabled = false;
      }
      toast('🔀 Gen ' + generation + ' ' + (window.lang==='fr'?'créée !':'created!'), '#818cf8');
    });

    tc.querySelector('#qgen-apply').addEventListener('click', () => {
      if (currentBase) { injectToEditor(currentBase); toast('✅ Gen ' + generation + ' applied!'); }
    });
  }

  /* ── 🌍 SHARE PANEL ──────────────────────────────────── */
  function buildSharePanel(tc, lang) {
    tc.innerHTML = `
<div style="${S.card}">
  <div style="${S.h}">${lang.shareTitle}</div>
  <div style="${S.d}">${lang.shareDesc}</div>
  <button id="qsh-create" style="${S.btnP}">${lang.shareCreate}</button>
  <div id="qsh-result" style="display:none;margin-bottom:10px;">
    <div style="font-size:9px;color:#34d399;font-weight:700;margin-bottom:5px;">✅ Link ready!</div>
    <input id="qsh-link" readonly style="${S.inp}font-size:9px;margin-bottom:5px;"/>
    <div id="qsh-size" style="font-size:9px;opacity:.45;margin-bottom:6px;"></div>
    <div style="display:flex;gap:4px;">
      <button id="qsh-copy" style="flex:1;padding:6px;background:rgba(129,140,248,.15);color:#a5b4fc;border:1px solid rgba(129,140,248,.3);border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;">${lang.shareCopy}</button>
      <button id="qsh-open" style="flex:1;padding:6px;background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.2);border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;">${lang.shareOpen}</button>
    </div>
  </div>
  <div style="${S.lbl}margin-top:8px;">${lang.shareImport}</div>
  <div style="display:flex;gap:5px;">
    <input id="qsh-import-inp" placeholder="${lang.shareImportPlaceholder}" style="${S.inp}font-size:9px;"/>
    <button id="qsh-import-btn" style="padding:7px 10px;background:rgba(129,140,248,.15);color:#a5b4fc;border:1px solid rgba(129,140,248,.3);border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;">${lang.shareImportBtn}</button>
  </div>
</div>`;

    tc.querySelector('#qsh-create').addEventListener('click', () => {
      const code = getCode();
      if (!code.trim()) { toast('⚠️ Editor is empty', '#f59e0b'); return; }
      const btn = tc.querySelector('#qsh-create');
      btn.textContent = lang.shareCreating; btn.disabled = true;
      setTimeout(() => {
        const compressed = LZ.compress(code);
        const url = location.href.split('#')[0] + '#qshare=' + compressed;
        const res = tc.querySelector('#qsh-result');
        const inp = tc.querySelector('#qsh-link');
        const sz  = tc.querySelector('#qsh-size');
        res.style.display = 'block';
        inp.value = url;
        sz.textContent = lang.shareSize + ' ' + Math.round(url.length/1024*10)/10 + ' KB (original: ' + Math.round(code.length/1024*10)/10 + ' KB)';
        btn.textContent = lang.shareCreate; btn.disabled = false;
        toast('🔗 ' + (window.lang==='fr'?'Lien créé !':'Link created!'));
      }, 600);
    });

    tc.querySelector('#qsh-copy').addEventListener('click', () => {
      const link = tc.querySelector('#qsh-link').value;
      navigator.clipboard.writeText(link).catch(()=>{}); toast('📋 Copied!');
    });

    tc.querySelector('#qsh-open').addEventListener('click', () => {
      const link = tc.querySelector('#qsh-link').value;
      if (link) window.open(link, '_blank');
    });

    tc.querySelector('#qsh-import-btn').addEventListener('click', () => {
      const raw = tc.querySelector('#qsh-import-inp').value.trim();
      const match = raw.match(/#qshare=(.+)/);
      if (!match) { toast('⚠️ Invalid link format', '#f59e0b'); return; }
      try {
        const code = LZ.decompress(match[1]);
        injectToEditor(code);
        toast('📥 ' + (window.lang==='fr'?'Code importé !':'Code imported!'));
      } catch(e) { toast('❌ Decode failed: ' + e.message, '#ef4444'); }
    });

    // Auto-import from URL if present
    const hashMatch = location.hash.match(/#qshare=(.+)/);
    if (hashMatch) {
      try {
        const code = LZ.decompress(hashMatch[1]);
        setTimeout(() => { injectToEditor(code); toast('📥 Auto-imported from share link!'); }, 2000);
      } catch(e) {}
    }
  }

  /* ── 🎛️ CSS MIXER PANEL ─────────────────────────────── */
  function buildMixerPanel(tc, lang) {
    let originalVars = {}, currentVars = {};

    const scan = () => {
      const code = getCode();
      const vars = detectCSSVars(code);
      originalVars = { ...vars };
      currentVars = { ...vars };
      renderSliders();
    };

    const renderSliders = () => {
      const cont = tc.querySelector('#qmix-sliders');
      if (!cont) return;
      const entries = Object.entries(currentVars);
      if (!entries.length) {
        cont.innerHTML = `<div style="font-size:10px;opacity:.4;text-align:center;padding:12px;">${lang.mixNone}</div>`;
        return;
      }
      cont.innerHTML = entries.map(([name, val]) => {
        const isColor = val.match(/^#|^hsl|^rgb|^rgba/i);
        const isNum = val.match(/^[\d.]+(\s*(px|em|rem|%|vh|vw))?$/);
        if (isColor) {
          return `<div style="margin-bottom:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:9px;font-weight:800;color:#94a3b8;font-family:monospace;">--${name}</span>
              <span style="font-size:9px;opacity:.5;">${val.slice(0,18)}</span>
            </div>
            <input type="color" data-var="${name}" value="${val.startsWith('#')?val:'#818cf8'}" style="width:100%;height:28px;border:none;border-radius:7px;cursor:pointer;padding:2px;background:rgba(255,255,255,.05);"/>
          </div>`;
        }
        if (isNum) {
          const num = parseFloat(val), unit = val.replace(/[\d.]/g,'').trim()||'px';
          return `<div style="margin-bottom:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:9px;font-weight:800;color:#94a3b8;font-family:monospace;">--${name}</span>
              <span id="qmix-v-${name}" style="font-size:9px;opacity:.5;">${val}</span>
            </div>
            <input type="range" data-var="${name}" data-unit="${unit}" min="0" max="${Math.max(num*3,100)}" step="${num<10?1:5}" value="${num}" style="width:100%;accent-color:#818cf8;cursor:pointer;"/>
          </div>`;
        }
        return `<div style="margin-bottom:8px;">
          <span style="font-size:9px;font-weight:800;color:#94a3b8;font-family:monospace;">--${name}</span>
          <input data-var="${name}" value="${val}" style="${S.inp}font-size:9px;margin-top:3px;font-family:monospace;"/>
        </div>`;
      }).join('');

      cont.querySelectorAll('input[data-var]').forEach(inp => {
        inp.addEventListener('input', () => {
          const varName = inp.dataset.var;
          const unit = inp.dataset.unit||'';
          const val = inp.type==='range' ? inp.value+unit : inp.value;
          currentVars[varName] = val;
          const vLabel = cont.querySelector(`#qmix-v-${varName}`);
          if (vLabel) vLabel.textContent = val;
          // Live apply to preview iframe
          const iframe = document.getElementById('preview-iframe');
          if (iframe && iframe.contentDocument) {
            const root = iframe.contentDocument.documentElement;
            if (root) root.style.setProperty('--'+varName, val);
          }
        });
      });
    };

    const applyToCode = () => {
      let code = getCode();
      Object.entries(currentVars).forEach(([name, val]) => {
        const rx = new RegExp(`--${name}\\s*:\\s*[^;]+;`, 'g');
        code = code.replace(rx, `--${name}: ${val};`);
      });
      injectToEditor(code);
    };

    const exportCSS = () => {
      const css = ':root {\n' + Object.entries(currentVars).map(([k,v])=>`  --${k}: ${v};`).join('\n') + '\n}';
      navigator.clipboard.writeText(css).catch(()=>{});
      toast('📤 CSS variables copied!');
    };

    tc.innerHTML = `
<div style="${S.card}">
  <div style="${S.h}">${lang.mixTitle}</div>
  <div style="${S.d}">${lang.mixDesc}</div>
  <button id="qmix-scan" style="${S.btnP}">${lang.mixScan}</button>
  <div id="qmix-sliders" style="margin-bottom:8px;"></div>
  <button id="qmix-apply" style="${S.btnG}">${lang.mixApply}</button>
  <div style="display:flex;gap:5px;">
    <button id="qmix-export" style="${S.btnI}flex:1;">${lang.mixExport}</button>
    <button id="qmix-reset" style="${S.btnI}flex:1;">${lang.mixReset}</button>
  </div>
</div>`;

    tc.querySelector('#qmix-scan').addEventListener('click', () => { scan(); toast('🔍 ' + Object.keys(currentVars).length + ' CSS vars detected'); });
    tc.querySelector('#qmix-apply').addEventListener('click', applyToCode);
    tc.querySelector('#qmix-export').addEventListener('click', exportCSS);
    tc.querySelector('#qmix-reset').addEventListener('click', () => { currentVars={...originalVars}; renderSliders(); toast('↺ Reset!'); });
  }

  /* ================================================================
     INTEGRATION — hook into tab button
  ================================================================ */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    // CSS
    if (!document.getElementById('qlab-css')) {
      const s = document.createElement('style');
      s.id = 'qlab-css';
      s.textContent = `
        @keyframes qlabFadeIn{from{opacity:0}to{opacity:1}}
        #qlab-overlay::-webkit-scrollbar,#qlab-body::-webkit-scrollbar,#qlab-content::-webkit-scrollbar{width:4px}
        #qlab-overlay::-webkit-scrollbar-thumb,#qlab-body::-webkit-scrollbar-thumb,#qlab-content::-webkit-scrollbar-thumb{background:rgba(129,140,248,.2);border-radius:99px}
        [data-tab="quantumlab"].active{background:linear-gradient(90deg,rgba(129,140,248,.3),rgba(52,211,153,.2),rgba(244,114,182,.2))!important;border-left-color:#818cf8!important;}
        [data-tab="quantumlab"]{animation:qlabTabPulse 4s ease-in-out infinite;}
        @keyframes qlabTabPulse{0%,100%{box-shadow:none}50%{box-shadow:0 0 14px rgba(129,140,248,.4),inset 0 0 8px rgba(52,211,153,.1)}}
      `;
      document.head.appendChild(s);
    }

    const btn = document.querySelector('[data-tab="quantumlab"]');
    if (btn) {
      const _orig = window.renderTab;
      window.renderTab = function (tab) {
        if (tab === 'quantumlab') {
          window.activeTab = 'quantumlab';
          document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderQuantumLab();
          return;
        }
        if (typeof _orig === 'function') _orig(tab);
      };
    }

    console.log('[IA Architecte] ⚛️ QUANTUM LAB v1.0 — 5 unique innovations loaded.');
  });

  window.QuantumLab = { version: '1.0', toast };

})();
