'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hook into translation logic
  const origApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof origApplyLang === 'function') origApplyLang();
    const l = window.lang || 'en';
    const s1 = document.getElementById('lbl-tab-onemin');
    if (s1) s1.textContent = l === 'fr' ? 'App 1-Min' : '1-Min App';
    const s2 = document.getElementById('lbl-tab-wizard');
    if (s2) s2.textContent = l === 'fr' ? 'Assistant App' : 'App Wizard';
    const s3 = document.getElementById('lbl-tab-prompt');
    if (s3) s3.textContent = l === 'fr' ? 'Prompt vers App' : 'Prompt-to-App';
    
    // Also translate the content if currently on one of these tabs
    if(window.activeTab === 'onemin') renderOneMinTab();
    if(window.activeTab === 'wizard') renderWizardTab();
    if(window.activeTab === 'prompt') renderPromptTab();
  };
  
  // Call once to initialize
  if (window.applyLang) window.applyLang();

  // 2. Hook into renderTab logic
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'onemin') {
      window.activeTab = 'onemin';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const tBtn = document.getElementById('tab-onemin');
      if (tBtn) tBtn.classList.add('active');
      renderOneMinTab();
      return;
    }
    if (tab === 'wizard') {
      window.activeTab = 'wizard';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const tBtn = document.getElementById('tab-wizard');
      if (tBtn) tBtn.classList.add('active');
      renderWizardTab();
      return;
    }
    if (tab === 'prompt') {
      window.activeTab = 'prompt';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const tBtn = document.getElementById('tab-prompt');
      if (tBtn) tBtn.classList.add('active');
      renderPromptTab();
      return;
    }
    
    // Default to original handler
    if (typeof origRenderTab === 'function') {
      origRenderTab(tab);
    }
  };

  // 3. Render Functions
  function renderOneMinTab() {
    const parent = document.getElementById('left-body');
    if(!parent) return;
    const l = window.lang || 'en';
    
    parent.innerHTML = '';

    // Create a robust scrollable wrapper that ignores flex quirks
    const wrapper = document.createElement('div');
    wrapper.style = 'width:100%; flex:1; min-height:0; overflow-y:auto; overflow-x:hidden; padding-bottom:50px; display:block;';

    // Header
    const hdr = document.createElement('div');
    hdr.style = 'padding-bottom:15px;';
    hdr.innerHTML = `
      <h3 style="color:#fbbf24; margin-bottom:10px; font-size:16px;">⏱️ ${l === 'fr' ? 'Apps 1-Minute' : '1-Minute Apps'}</h3>
      <p style="color:#94a3b8; font-size:12px; margin-bottom:10px; line-height:1.5;">
        ${l === 'fr' ? 'Déployez ces micro-applications entièrement fonctionnelles en un seul clic !' : 'Deploy these fully functional micro-apps in just one click!'}
      </p>
    `;
    wrapper.appendChild(hdr);

    if (window.ONE_MIN_APPS) {
      const list = document.createElement('div');
      list.style = 'display:flex; flex-direction:column; gap:10px;';
      
      window.ONE_MIN_APPS.forEach((app, idx) => {
        const title = app[l] || app.en;
        const desc = app['desc_' + l] || app.desc_en;
        
        const card = document.createElement('div');
        card.className = 'ia-pro-card';
        card.style = 'background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.2); border-radius:12px; padding:15px; transition:all 0.2s;';
        card.onmouseover = () => { card.style.background='rgba(245,158,11,0.1)'; card.style.borderColor='rgba(245,158,11,0.4)'; };
        card.onmouseout = () => { card.style.background='rgba(245,158,11,0.05)'; card.style.borderColor='rgba(245,158,11,0.2)'; };
        
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="display:flex; flex-direction:column; gap:5px; flex:1;">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
                <div style="font-size:24px;">${app.icon}</div>
                <div style="font-weight:800; color:#fbbf24; font-size:14px;">${title}</div>
              </div>
              <div style="font-size:11px; color:#94a3b8; line-height:1.4;">${desc}</div>
            </div>
            <div style="display:flex; gap:5px; margin-left:10px;">
              <button title="Cinematic Generate" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;font-size:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;" onclick="event.stopPropagation(); window.loadOneMinApp(${idx}, true)">🎬</button>
              <button title="Instant Generate" style="background:linear-gradient(135deg,#f59e0b,#d97706);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;font-size:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;" onclick="event.stopPropagation(); window.loadOneMinApp(${idx}, false)">⚡</button>
            </div>
          </div>
        `;
        list.appendChild(card);
      });
      wrapper.appendChild(list);
    }
    
    parent.appendChild(wrapper);
  }

  // Global loader for 1-minute apps
  window.loadOneMinApp = function(idx, cinematic) {
    if(!window.editor || !window.ONE_MIN_APPS) return;
    const app = window.ONE_MIN_APPS[idx];
    if(app) {
      if (cinematic) {
        typeOneMinCode(app.code);
      } else {
        window.editor.setValue(app.code);
        if(window.runPreview) window.runPreview();
        if(window.showToast) {
          const l = window.lang || 'en';
          window.showToast(l === 'fr' ? '✅ App chargée et prête au déploiement !' : '✅ App loaded and ready to deploy!');
        }
      }
    }
  };

  let isOneMinTyping = false;
  function typeOneMinCode(code) {
    if (!window.editor || isOneMinTyping) return;
    isOneMinTyping = true;
    var lines = code.split('\n');
    var currentCode = '';
    var index = 0;
    
    if(window.showToast) {
       const l = window.lang || 'en';
       window.showToast(l === 'fr' ? '🤖 L\'IA écrit le code...' : '🤖 AI is writing code...');
    }
    
    function typeNextLine() {
      if (index < lines.length) {
        currentCode += lines[index] + (index === lines.length - 1 ? '' : '\n');
        window.editor.setValue(currentCode);
        
        try {
           var lineCount = window.editor.getModel().getLineCount();
           window.editor.revealLine(lineCount);
        } catch(e){}
        
        index++;
        var delay = 80;
        if (lines[index-1]) {
           if (lines[index-1].length > 40) delay = 150;
           if (lines[index-1].trim() === '') delay = 20;
        }
        
        setTimeout(typeNextLine, delay);
      } else {
        if (window.runPreview) window.runPreview();
        if(window.showToast) {
           const l = window.lang || 'en';
           window.showToast(l === 'fr' ? '✅ Application Générée !' : '✅ App Generated!');
        }
        isOneMinTyping = false;
      }
    }
    
    typeNextLine();
  }

  function renderWizardTab() {
    const parent = document.getElementById('left-body');
    if(!parent) return;
    const l = window.lang || 'en';

    parent.innerHTML = `
      <div style="padding:15px;">
        <h3 style="color:#34d399; margin-bottom:10px; font-size:16px;">🪄 ${l === 'fr' ? 'Assistant App' : 'App Wizard'}</h3>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:20px; line-height:1.5;">
          ${l === 'fr' ? 'Construisez une application personnalisée en 3 étapes simples.' : 'Build a custom application in 3 simple steps.'}
        </p>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:15px; margin-bottom:15px;">
          <label style="font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; display:block; margin-bottom:8px;">1. ${l === 'fr' ? 'Type d\'application' : 'App Type'}</label>
          <select id="wiz-type" style="width:100%; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:8px; padding:8px; font-size:13px; outline:none;">
            <option value="landing">Landing Page</option>
            <option value="dashboard">Dashboard</option>
            <option value="portfolio">Portfolio</option>
          </select>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:15px; margin-bottom:15px;">
          <label style="font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; display:block; margin-bottom:8px;">2. ${l === 'fr' ? 'Thème de couleur' : 'Color Theme'}</label>
          <div style="display:flex; gap:10px;">
            <div class="wiz-color" data-color="#3b82f6" style="width:30px; height:30px; background:#3b82f6; border-radius:50%; cursor:pointer; border:2px solid #fff;"></div>
            <div class="wiz-color" data-color="#10b981" style="width:30px; height:30px; background:#10b981; border-radius:50%; cursor:pointer; border:2px solid transparent;"></div>
            <div class="wiz-color" data-color="#8b5cf6" style="width:30px; height:30px; background:#8b5cf6; border-radius:50%; cursor:pointer; border:2px solid transparent;"></div>
            <div class="wiz-color" data-color="#f59e0b" style="width:30px; height:30px; background:#f59e0b; border-radius:50%; cursor:pointer; border:2px solid transparent;"></div>
            <div class="wiz-color" data-color="#ef4444" style="width:30px; height:30px; background:#ef4444; border-radius:50%; cursor:pointer; border:2px solid transparent;"></div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:15px; margin-bottom:20px;">
          <label style="font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; display:block; margin-bottom:8px;">3. ${l === 'fr' ? 'Composants' : 'Components'}</label>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label style="font-size:13px; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="wiz-nav" checked> Navbar</label>
            <label style="font-size:13px; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="wiz-hero" checked> Hero Section</label>
            <label style="font-size:13px; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="wiz-feat"> Features</label>
            <label style="font-size:13px; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="wiz-foot" checked> Footer</label>
          </div>
        </div>

        <button id="wiz-build" style="width:100%; padding:12px; background:#10b981; color:#fff; border:none; border-radius:10px; font-weight:800; cursor:pointer; font-size:14px; box-shadow:0 10px 20px rgba(16,185,129,0.3);">
          ⚡ ${l === 'fr' ? 'Générer l\'application' : 'Build Application'}
        </button>
      </div>
    `;

    // Attach logic
    setTimeout(() => {
      let selectedColor = '#3b82f6';
      document.querySelectorAll('.wiz-color').forEach(el => {
        el.onclick = () => {
          document.querySelectorAll('.wiz-color').forEach(e => e.style.borderColor = 'transparent');
          el.style.borderColor = '#fff';
          selectedColor = el.dataset.color;
        };
      });

      document.getElementById('wiz-build').onclick = () => {
        const type = document.getElementById('wiz-type').value;
        const nav = document.getElementById('wiz-nav').checked;
        const hero = document.getElementById('wiz-hero').checked;
        const feat = document.getElementById('wiz-feat').checked;
        const foot = document.getElementById('wiz-foot').checked;

        let generatedCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Wizard App - ${type}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; }
    .btn { padding: 12px 24px; background: ${selectedColor}; color: #fff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: inline-block; text-decoration: none; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; width: 100%; }
  </style>
</head>
<body>`;

        if (type === 'landing') {
          if (nav) generatedCode += `
  <nav style="padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 20px; font-weight: 900; color: ${selectedColor};">Brand.</div>
      <div style="display: flex; gap: 20px;"><a href="#" style="color: #cbd5e1; text-decoration: none;">Home</a><a href="#" style="color: #cbd5e1; text-decoration: none;">About</a></div>
    </div>
  </nav>`;
          if (hero) generatedCode += `
  <header style="padding: 100px 0; text-align: center; flex: 1; display: flex; align-items: center;">
    <div class="container">
      <h1 style="font-size: 64px; margin-bottom: 20px; font-weight: 900;">Welcome to <span style="color: ${selectedColor};">Your App</span></h1>
      <p style="font-size: 20px; color: #94a3b8; max-width: 600px; margin: 0 auto 40px;">A completely custom landing page generated instantly.</p>
      <button class="btn" style="font-size: 18px; padding: 16px 36px; border-radius: 12px;">Get Started</button>
    </div>
  </header>`;
          if (feat) generatedCode += `
  <section style="padding: 80px 0; background: rgba(255,255,255,0.02);">
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
      <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px;"><div style="font-size: 40px; margin-bottom: 15px;">⚡</div><h3 style="font-size: 20px;">Fast Performance</h3></div>
      <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px;"><div style="font-size: 40px; margin-bottom: 15px;">🛡️</div><h3 style="font-size: 20px;">Secure Architecture</h3></div>
    </div>
  </section>`;
        } 
        else if (type === 'dashboard') {
          generatedCode += `<div style="display: flex; flex: 1;">`;
          if (nav) generatedCode += `
  <aside style="width: 250px; background: #1e293b; padding: 20px; border-right: 1px solid rgba(255,255,255,0.05);">
    <div style="font-size: 20px; font-weight: 900; color: ${selectedColor}; margin-bottom: 40px;">Dash.</div>
    <div style="display: flex; flex-direction: column; gap: 15px;"><a href="#" style="color: #fff; text-decoration: none;">📊 Overview</a><a href="#" style="color: #94a3b8; text-decoration: none;">👥 Users</a></div>
  </aside>`;
          generatedCode += `<main style="flex: 1; padding: 40px; display: flex; flex-direction: column;">`;
          if (hero) generatedCode += `
  <header style="margin-bottom: 30px;">
    <h1 style="font-size: 32px; font-weight: 900;">Dashboard Overview</h1><p style="color: #94a3b8;">Welcome back, Admin.</p>
  </header>`;
          if (feat) generatedCode += `
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px;"><div style="color: #94a3b8; font-size: 12px;">REVENUE</div><div style="font-size: 24px; color: ${selectedColor}; font-weight: 900;">$12,450</div></div>
    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px;"><div style="color: #94a3b8; font-size: 12px;">USERS</div><div style="font-size: 24px; font-weight: 900;">1,234</div></div>
  </div>`;
          generatedCode += `</main></div>`;
        }
        else if (type === 'portfolio') {
          if (nav) generatedCode += `
  <nav style="padding: 30px 0;">
    <div class="container" style="display: flex; justify-content: center; gap: 30px;">
      <a href="#" style="color: #fff; font-weight: 800; text-decoration: none;">Work</a><a href="#" style="color: #94a3b8; text-decoration: none;">About</a><a href="#" style="color: #94a3b8; text-decoration: none;">Contact</a>
    </div>
  </nav>`;
          if (hero) generatedCode += `
  <header style="padding: 80px 0; text-align: center;">
    <div class="container">
      <div style="width: 120px; height: 120px; background: ${selectedColor}; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 50px;">👋</div>
      <h1 style="font-size: 48px; font-weight: 900;">Hi, I'm a Creator.</h1>
      <p style="font-size: 18px; color: #94a3b8; max-width: 500px; margin: 10px auto 30px;">I build digital experiences and design beautiful interfaces.</p>
      <button class="btn">View My Work</button>
    </div>
  </header>`;
          if (feat) generatedCode += `
  <section style="padding: 60px 0;">
    <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div style="height: 250px; background: rgba(255,255,255,0.05); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #94a3b8;">Project 1</div>
      <div style="height: 250px; background: rgba(255,255,255,0.05); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #94a3b8;">Project 2</div>
    </div>
  </section>`;
        }

        if (foot) {
          generatedCode += `
  <footer style="padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.1); margin-top: auto; text-align: center;">
    <div class="container"><p style="color: #64748b; font-size: 14px;">&copy; 2026. Custom ${type} App.</p></div>
  </footer>`;
        }

        generatedCode += `
</body>
</html>`;

        if (window.editor) {
          window.editor.setValue(generatedCode);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast(l === 'fr' ? '✅ Assistant terminé !' : '✅ Wizard complete!');
        }
      };
    }, 50);
  }

  function renderPromptTab() {
    const parent = document.getElementById('left-body');
    if(!parent) return;
    const l = window.lang || 'en';

    parent.innerHTML = `
      <div style="padding:15px; height:100%; display:flex; flex-direction:column;">
        <h3 style="color:#f472b6; margin-bottom:10px; font-size:16px;">⚡ ${l === 'fr' ? 'Prompt vers App' : 'Prompt-to-App'}</h3>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:20px; line-height:1.5;">
          ${l === 'fr' ? 'Décrivez ce que vous souhaitez et l\'IA Ultra générera le code en moins d\'une minute.' : 'Describe what you want and IA Ultra will generate the code in under a minute.'}
        </p>

        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:20px; text-align:center;">
          <div style="font-size:48px; margin-bottom:20px; background:linear-gradient(135deg,#ec4899,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">✨</div>
          <h2 style="font-size:24px; font-weight:900; margin-bottom:15px; color:#fff;">
            ${l === 'fr' ? 'Que voulez-vous construire aujourd\'hui ?' : 'What do you want to build today?'}
          </h2>
          <textarea id="fast-prompt" placeholder="${l === 'fr' ? 'Ex: Une page de portfolio avec un thème sombre et des animations...' : 'E.g. A portfolio page with a dark theme and animations...'}" style="width:100%; height:120px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.2); border-radius:12px; color:#fff; padding:15px; font-size:14px; outline:none; resize:none; margin-bottom:20px;"></textarea>
          
          <button id="fast-generate" style="width:100%; padding:16px; background:linear-gradient(90deg,#ec4899,#8b5cf6); color:#fff; border:none; border-radius:12px; font-weight:900; font-size:16px; cursor:pointer; box-shadow:0 10px 30px rgba(236,72,153,0.3); transition:0.3s;"
                  onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            ${l === 'fr' ? 'Générer l\'Application' : 'Generate Application'}
          </button>
        </div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('fast-generate').onclick = function() {
        const val = document.getElementById('fast-prompt').value.trim();
        if(!val) return;
        
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = l === 'fr' ? '⏳ Génération en cours...' : '⏳ Generating...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.opacity = '1';
          btn.disabled = false;

          let finalCode = '';
          if (typeof window.buildMultiPage === 'function') {
            finalCode = window.buildMultiPage(val, l === 'fr');
          } else {
            finalCode = `<!DOCTYPE html><html><head><title>${val}</title></head><body style="background:#0f172a;color:#fff;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;"><h1>Generated App: ${val}</h1></body></html>`;
          }

          if (window.editor) {
            window.editor.setValue(finalCode);
            if (window.runPreview) window.runPreview();
            if (window.showToast) window.showToast(l === 'fr' ? '✨ Application générée avec succès !' : '✨ Application generated successfully!');
          }
        }, 1500);
      };
    }, 50);
  }

});
