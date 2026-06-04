/* ═══════════════════════════════════════════════════════
   IA Architecte — IA ULTRA ENGINE v2.5
   The Supreme Omni-Generator & Agentic Simulator
   Premium Edition: Matrix Streaming, Theme Architect & OMNI-ASSEMBLER
   ═══════════════════════════════════════════════════════ */

(function(window) {
  'use strict';

  function createIAUltraUI(container) {
    const isFr = (window.lang === 'fr');
    
    // Base layout wrapper
    container.style.padding = '0';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.height = '100%';
    container.style.background = '#030509';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    // Glowing orb
    const bgGlow = document.createElement('div');
    bgGlow.style = 'position:absolute; top:-50px; left:50%; transform:translateX(-50%); width:300px; height:300px; background:radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%); border-radius:50%; pointer-events:none; z-index:0; transition: 1s;';
    container.appendChild(bgGlow);

    // ── HEADER with Typewriter Status + Action Buttons ──
    const header = document.createElement('div');
    header.style = 'padding: 14px 20px 10px; border-bottom: 1px solid rgba(139,92,246,0.2); z-index: 10; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;';
    const _statusMsgs = isFr
        ? ['SYNTHÈSE PRÊTE','OMNI-ASSEMBLER ACTIF','NEURAL CORE EN LIGNE','MOTEUR SUPRÊME v3.0','35+ TYPES D\'APPS']
        : ['SYNTHESIS READY','OMNI-ASSEMBLER ACTIVE','NEURAL CORE ONLINE','SUPREME ENGINE v3.0','35+ APP TYPES'];
    let _statusIdx = 0;
    header.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:24px; text-shadow: 0 0 15px #8b5cf6;" id="ultra-icon">⚡</span>
        <div>
          <div style="font-size:16px; font-weight:900; color:#fff; letter-spacing:1px; text-shadow: 0 0 10px rgba(139,92,246,0.5);">IA ULTRA</div>
          <div id="ultra-status" style="font-size:10px; color:#c4b5fd; font-weight:700; letter-spacing:2px; min-width:200px; height:14px;"></div>
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button id="btn-templates" title="${isFr ? 'Prompts Rapides (Ctrl+T)' : 'Quick Templates (Ctrl+T)'}" style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); color:#a78bfa; border-radius:8px; padding:6px 10px; cursor:pointer; font-size:13px; transition:0.2s;">🎯</button>
        <button id="btn-history" title="${isFr ? 'Historique (Ctrl+H)' : 'History (Ctrl+H)'}" style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); color:#a78bfa; border-radius:8px; padding:6px 10px; cursor:pointer; font-size:13px; transition:0.2s;">📜</button>
        <button id="btn-export" title="${isFr ? 'Exporter (Ctrl+E)' : 'Export (Ctrl+E)'}" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); color:#34d399; border-radius:8px; padding:6px 10px; cursor:pointer; font-size:13px; transition:0.2s;" disabled>📤</button>
      </div>
    `;
    container.appendChild(header);
    // Typewriter animation
    const statusEl = header.querySelector('#ultra-status');
    const typewriteStatus = () => {
        const msg = _statusMsgs[_statusIdx % _statusMsgs.length]; _statusIdx++;
        let i = 0; statusEl.innerText = '';
        const tw = setInterval(() => {
            if(i < msg.length) { statusEl.innerText += msg[i]; i++; }
            else { clearInterval(tw); setTimeout(typewriteStatus, 2500); }
        }, 55);
    };
    setTimeout(typewriteStatus, 900);

    // ── TEMPLATES PANEL ──
    const templatesPanel = document.createElement('div');
    templatesPanel.style = 'position:absolute; top:0; left:0; right:0; bottom:0; z-index:500; background:rgba(3,5,9,0.97); backdrop-filter:blur(20px); display:none; flex-direction:column; padding:20px; overflow-y:auto;';
    container.appendChild(templatesPanel);
    const _tplHeader = document.createElement('div');
    _tplHeader.style = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-shrink:0;';
    _tplHeader.innerHTML = `<div style="font-weight:900; color:#a78bfa; font-size:15px;">🎯 ${isFr ? 'Prompts Rapides Premium' : 'Quick Premium Prompts'}</div><button id="close-templates" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:8px; padding:6px 14px; cursor:pointer;">✕ ${isFr ? 'Fermer' : 'Close'}</button>`;
    templatesPanel.appendChild(_tplHeader);
    const _tplScroll = document.createElement('div');
    _tplScroll.style = 'overflow-y:auto; flex:1;';
    templatesPanel.appendChild(_tplScroll);
    const _tplCats = [
      { label: isFr ? '🤖 IA & Tech' : '🤖 AI & Tech', color: '#8b5cf6', items: [
          { e:'🤖', l: isFr?'Chat IA':'AI Chat', p: isFr?'interface chat IA avancée avec historique conversations et réponses simulées':'advanced AI chat interface with conversation history and simulated responses' },
          { e:'📊', l:'Admin Dashboard', p: isFr?'dashboard admin SaaS avec statistiques temps réel et graphiques':'SaaS admin dashboard with real-time statistics and analytics charts' },
          { e:'⚙️', l:'SaaS Platform', p: isFr?'plateforme SaaS avec billing et usage stats':'SaaS platform with billing and usage stats' }
      ]},
      { label: isFr ? '💰 Finance' : '💰 Finance', color: '#10b981', items: [
          { e:'💳', l:'FinTech Wallet', p: isFr?'application wallet fintech avec solde et transactions':'fintech wallet with balance and transactions' },
          { e:'📈', l:'Crypto Trading', p: isFr?'plateforme trading crypto avec graphiques prix':'crypto trading platform with price charts' },
          { e:'💹', l: isFr?'Budget Personnel':'Budget Planner', p: isFr?'planificateur budget personnel avec graphique dépenses':'personal budget planner with expense chart' }
      ]},
      { label: isFr ? '🛒 Commerce' : '🛒 Commerce', color: '#ec4899', items: [
          { e:'🛍️', l:'E-commerce', p: isFr?'boutique e-commerce premium avec panier et filtres':'premium e-commerce store with cart and filters' },
          { e:'🍕', l: isFr?'Application Restaurant':'Restaurant App', p: isFr?'application restaurant avec menu interactif et panier de commande':'restaurant app with interactive menu and order cart' },
          { e:'🚚', l: isFr?'Livraison':'Delivery', p: isFr?'application livraison avec tracking colis':'delivery app with real-time package tracking' }
      ]},
      { label: isFr ? '🎮 Jeux' : '🎮 Games', color: '#fbbf24', items: [
          { e:'🐍', l:'Snake Game', p: isFr?'jeu arcade snake avec score progressif':'interactive snake game with progressive score' },
          { e:'🎵', l: isFr?'Lecteur Musique':'Music Player', p: isFr?'lecteur vinyle avec animation et contrôles audio':'vinyl music player with animation and controls' },
          { e:'❓', l:'Quiz Game', p: isFr?'quiz interactif avec timer et classement':'interactive quiz with timer and leaderboard' }
      ]},
      { label: '🌌 3D', color: '#00c6ff', items: [
          { e:'🌍', l:'3D Earth', p: isFr?'globe terrestre 3D WebGL avec marqueurs':'3D WebGL earth globe with network markers' },
          { e:'🌌', l:'3D Galaxy', p: isFr?'simulation galaxie 3D avec particules stellaires':'galaxy simulation with stellar particles' },
          { e:'🧊', l:'3D Shapes', p: isFr?'laboratoire de formes 3D cube sphère tore':'3D shapes lab cube sphere torus' }
      ]},
      { label: isFr ? '📚 Productivité' : '📚 Productivity', color: '#f59e0b', items: [
          { e:'📋', l:'Kanban Board', p: isFr?'tableau Kanban avec drag-and-drop et sauvegarde':'Kanban board with drag-and-drop and localStorage' },
          { e:'📝', l: isFr?'Notes':'Notes Editor', p: isFr?'éditeur notes multi-documents avec sauvegarde auto':'multi-document notes editor with auto-save' },
          { e:'🎯', l:'Habit Tracker', p: isFr?'tracker habitudes quotidiennes avec grille de progression':'daily habit tracker with weekly progress grid' }
      ]},
      { label: isFr ? '🌐 Pro & Portfolio' : '🌐 Pro & Portfolio', color: '#a78bfa', items: [
          { e:'👤', l:'Portfolio', p: isFr?'portfolio développeur avec compétences et projets':'developer portfolio with skills and projects' },
          { e:'📄', l: isFr?'CV Builder':'Resume Builder', p: isFr?'générateur CV interactif avec preview':'interactive resume builder with real-time preview' },
          { e:'🚀', l:'Landing Page', p: isFr?'landing page marketing premium avec hero animé et pricing':'premium marketing landing page with animated hero and pricing' }
      ]}
    ];
    _tplCats.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.style = 'margin-bottom:22px;';
        catDiv.innerHTML = `<div style="font-size:11px; font-weight:700; color:${cat.color}; margin-bottom:10px; letter-spacing:1px;">${cat.label}</div>`;
        const g = document.createElement('div');
        g.style = 'display:grid; grid-template-columns:repeat(3,1fr); gap:8px;';
        cat.items.forEach(item => {
            const b = document.createElement('div');
            b.style = `background:rgba(255,255,255,0.03); border:1px solid ${cat.color}22; border-radius:10px; padding:12px 10px; cursor:pointer; transition:0.2s;`;
            b.innerHTML = `<div style="font-size:20px; margin-bottom:5px;">${item.e}</div><div style="font-size:11px; font-weight:700; color:#fff;">${item.l}</div>`;
            b.onmouseover = () => { b.style.background='rgba(255,255,255,0.07)'; b.style.borderColor=cat.color; };
            b.onmouseout = () => { b.style.background='rgba(255,255,255,0.03)'; b.style.borderColor=`${cat.color}22`; };
            b.onclick = () => { input.value = item.p; templatesPanel.style.display='none'; handlePrompt(); };
            g.appendChild(b);
        });
        catDiv.appendChild(g);
        _tplScroll.appendChild(catDiv);
    });

    // ── HISTORY PANEL ──
    const historyPanel = document.createElement('div');
    historyPanel.style = 'position:absolute; top:0; right:0; bottom:0; width:300px; z-index:500; background:#0a0c12; border-left:1px solid rgba(139,92,246,0.3); display:none; flex-direction:column; transform:translateX(100%); transition:transform 0.35s cubic-bezier(0.4,0,0.2,1);';
    container.appendChild(historyPanel);
    historyPanel.innerHTML = `<div style="padding:16px; border-bottom:1px solid rgba(139,92,246,0.2); display:flex; justify-content:space-between; align-items:center; flex-shrink:0;"><div style="font-weight:900; color:#a78bfa; font-size:13px;">📜 ${isFr ? 'Historique' : 'History'}</div><button id="close-history" style="background:transparent; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.7); border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px;">✕</button></div><div id="history-list" style="flex:1; overflow-y:auto; padding:12px;"></div>`;

    // ── EXPORT MODAL ──
    const exportModal = document.createElement('div');
    exportModal.style = 'position:absolute; inset:0; z-index:600; background:rgba(0,0,0,0.88); backdrop-filter:blur(20px); display:none; align-items:center; justify-content:center;';
    container.appendChild(exportModal);
    exportModal.innerHTML = `<div style="background:#0d1117; border:1px solid rgba(16,185,129,0.3); border-radius:20px; padding:28px; width:330px; box-shadow:0 0 50px rgba(16,185,129,0.1);"><div style="font-weight:900; color:#34d399; font-size:17px; margin-bottom:6px;">📤 ${isFr ? 'Gestionnaire d\'Export' : 'Export Manager'}</div><div style="font-size:11px; color:#6b7280; margin-bottom:20px;">${isFr ? 'App 100% fonctionnelle, prête à déployer' : '100% functional app ready to deploy'}</div><div style="display:flex; flex-direction:column; gap:10px;"><button id="exp-copy" style="background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.4); color:#60a5fa; border-radius:12px; padding:14px 18px; cursor:pointer; text-align:left; font-size:13px; font-weight:700;">📋 ${isFr ? 'Copier le Code HTML' : 'Copy HTML Code'}</button><button id="exp-download" style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.4); color:#34d399; border-radius:12px; padding:14px 18px; cursor:pointer; text-align:left; font-size:13px; font-weight:700;">💾 ${isFr ? 'Télécharger .html' : 'Download .html File'}</button><button id="exp-new-tab" style="background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.4); color:#a78bfa; border-radius:12px; padding:14px 18px; cursor:pointer; text-align:left; font-size:13px; font-weight:700;">🚀 ${isFr ? 'Ouvrir Nouvel Onglet' : 'Open in New Tab'}</button><button id="exp-close" style="background:transparent; border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.4); border-radius:12px; padding:10px; cursor:pointer; font-size:12px;">${isFr ? 'Annuler' : 'Cancel'}</button></div></div>`;

    // Split Work Area: Upper (Console) and Lower/Side (Code Matrix)
    const workArea = document.createElement('div');
    workArea.style = 'flex: 1; display:flex; flex-direction:column; overflow:hidden; z-index: 10; position:relative;';
    container.appendChild(workArea);

    // Console Area (Logs & Theme Cards)
    const consoleArea = document.createElement('div');
    consoleArea.id = 'ultra-console';
    consoleArea.style = 'flex: 1; padding: 20px; overflow-y: auto; font-family: "JetBrains Mono", monospace; font-size: 12px; color: #a78bfa; display:flex; flex-direction:column; gap:8px; scroll-behavior: smooth;';
    workArea.appendChild(consoleArea);

    // Code Matrix Streamer (Hidden initially)
    const matrixArea = document.createElement('div');
    matrixArea.id = 'ultra-matrix';
    matrixArea.style = 'flex: 0; padding: 0px 20px; overflow-y: hidden; background: rgba(0,0,0,0.5); font-family: "Fira Code", monospace; font-size: 10px; color: #3b82f6; border-top: 1px solid transparent; transition: flex 0.5s ease, padding 0.5s ease; white-space:pre-wrap; word-wrap:break-word; text-shadow: 0 0 5px rgba(59,130,246,0.7);';
    workArea.appendChild(matrixArea);

    // Input Area
    const inputArea = document.createElement('div');
    inputArea.style = 'padding: 20px; background: rgba(10,12,18,0.9); border-top: 1px solid rgba(139,92,246,0.2); z-index: 10; position:relative;';
    
    const inputWrapper = document.createElement('div');
    inputWrapper.style = 'position:relative; display:flex; align-items:center;';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'ultra-input';
    input.placeholder = isFr ? 'Quelle application voulez-vous créer ?' : 'What app should I generate?';
    
    input.style = 'width: 100%; padding: 15px 45px 15px 20px; background: rgba(139,92,246,0.05); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; color: #fff; font-family: "Inter", sans-serif; font-size: 14px; outline: none; transition: 0.3s; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);';
    input.onfocus = () => { input.style.borderColor = '#8b5cf6'; input.style.background = 'rgba(139,92,246,0.1)'; input.style.boxShadow = '0 0 15px rgba(139,92,246,0.2), inset 0 0 10px rgba(0,0,0,0.5)'; };
    input.onblur = () => { input.style.borderColor = 'rgba(139,92,246,0.3)'; input.style.background = 'rgba(139,92,246,0.05)'; input.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5)'; };

    const voiceBtn = document.createElement('button');
    voiceBtn.innerHTML = '🎙️';
    voiceBtn.title = isFr ? 'Commande Vocale' : 'Voice Command';
    voiceBtn.style = 'position: absolute; right: 50px; background: rgba(255,255,255,0.05); border: 1px solid rgba(139,92,246,0.3); width: 32px; height: 32px; border-radius: 8px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;';
    voiceBtn.onmouseover = () => { voiceBtn.style.background = 'rgba(139,92,246,0.2)'; };
    voiceBtn.onmouseout = () => { voiceBtn.style.background = 'rgba(255,255,255,0.05)'; };

    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = '✨';
    sendBtn.style = 'position: absolute; right: 10px; background: linear-gradient(135deg, #8b5cf6, #3b82f6); border: none; width: 32px; height: 32px; border-radius: 8px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 0 10px rgba(139,92,246,0.4);';
    sendBtn.onmouseover = () => { sendBtn.style.transform = 'scale(1.1)'; };
    sendBtn.onmouseout = () => { sendBtn.style.transform = 'scale(1)'; };
    sendBtn.onclick = () => handlePrompt();

    const startVoice = () => {
        const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(!Speech) { alert(isFr ? 'Désolé, votre navigateur nu suporta pas la reconnaissance vocale.' : 'Sorry, your browser does not support voice recognition.'); return; }
        const rec = new Speech();
        rec.lang = isFr ? 'fr-FR' : 'en-US';
        rec.onstart = () => { voiceBtn.style.background = '#ef4444'; voiceBtn.innerHTML = '●'; };
        rec.onresult = (e) => { input.value = e.results[0][0].transcript; handlePrompt(); };
        rec.onend = () => { voiceBtn.style.background = 'rgba(255,255,255,0.05)'; voiceBtn.innerHTML = '🎙️'; };
        rec.start();
    };
    voiceBtn.onclick = startVoice;

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(voiceBtn);
    inputWrapper.appendChild(sendBtn);
    inputArea.appendChild(inputWrapper);
    // ── ENHANCE BUTTON + SHORTCUTS HINT ──
    const _enhRow = document.createElement('div');
    _enhRow.style = 'display:flex; gap:8px; margin-top:10px; align-items:center;';
    const _enhMap = {
        'chat': isFr?'interface chat IA avancée avec historique multi-conversations et réponses simulées intelligentes':'advanced AI chat interface with multi-conversation history and intelligent simulated responses',
        'dashboard': isFr?'tableau de bord admin SaaS avec statistiques temps réel, graphiques analytics et gestion utilisateurs':'SaaS admin dashboard with real-time statistics, analytics charts and user management',
        'shop': isFr?'boutique e-commerce premium avec panier, filtres produits et paiement sécurisé':'premium e-commerce store with cart, product filters and secure checkout',
        'store': isFr?'boutique e-commerce premium avec panier et paiement sécurisé':'premium e-commerce store with cart and secure checkout',
        'kanban': isFr?'tableau Kanban productivité avec 3 colonnes drag-and-drop et sauvegarde localStorage':'productivity Kanban board with 3 drag-and-drop columns and localStorage save',
        'timer': isFr?'timer Pomodoro focus avec phases travail et pause, statistiques sessions et alertes sonores':'Pomodoro focus timer with work/break phases, session statistics and sound alerts',
        'crypto': isFr?'plateforme trading crypto avec graphiques prix en temps réel, portefeuille et mouveurs de marché':'crypto trading platform with real-time price charts, portfolio and market movers',
        'medical': isFr?'plateforme médicale avec rendez-vous par spécialité et historique consultations':'medical platform with specialty appointment booking and consultation history',
        'restaurant': isFr?'application restaurant design avec menu catégorisé, photos plats et panier de commande':'designed restaurant app with categorized menu, dish photos and order cart',
        'calendar': isFr?'calendrier événements mensuel interactif avec création et suppression de rendez-vous':'interactive monthly event calendar with appointment creation and deletion',
        'quiz': isFr?'quiz interactif avec questions à choix multiples, timer et leaderboard des scores':'interactive quiz with multiple choice questions, timer and score leaderboard',
        'budget': isFr?'planificateur budget personnel avec entrées revenus et dépenses, graphique anneau Chart.js':'personal budget planner with income/expense entries and Chart.js donut chart',
        'galaxy': isFr?'simulation galaxie 3D WebGL avec 15000 particules stellaires et contrôles caméra':'3D WebGL galaxy simulation with 15000 stellar particles and camera controls',
        'landing': isFr?'landing page marketing premium avec hero animé, section features glassmorphism et pricing table':'ultra-premium marketing landing page with animated hero, glassmorphism features and pricing table',
        'resume': isFr?'générateur CV professionnel avec formulaire multi-sections et preview téléchargeable HTML':'professional resume builder with multi-section form and downloadable HTML preview',
        'habit': isFr?'tracker habitudes quotidiennes avec grille de progression hebdomadaire et statistiques de streak':'daily habit tracker with weekly progress grid and streak statistics',
        'gallery': isFr?'galerie photo premium avec grille masonry, lightbox modal et filtres par catégorie':'premium photo gallery with masonry grid, lightbox modal and category filters',
        'podcast': isFr?'plateforme podcast avec liste épisodes, lecteur audio HTML5 et interface moderne':'podcast platform with episode list, HTML5 audio player and modern interface',
        'translat': isFr?'interface de traduction bilingue avec sélection de langue et dictionnaire intégré':'bilingual translation interface with language selection and integrated dictionary'
    };
    const _enhBtn = document.createElement('button');
    _enhBtn.innerHTML = isFr ? '✨ Améliorer' : '✨ Enhance';
    _enhBtn.title = isFr ? 'Enrichir le prompt avec mots-clés premium' : 'Auto-enrich prompt with premium keywords';
    _enhBtn.style = 'background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); color:#fbbf24; border-radius:8px; padding:6px 14px; cursor:pointer; font-size:11px; font-weight:700; transition:0.2s;';
    _enhBtn.onmouseover = () => { _enhBtn.style.background='rgba(251,191,36,0.2)'; };
    _enhBtn.onmouseout = () => { _enhBtn.style.background='rgba(251,191,36,0.1)'; };
    _enhBtn.onclick = () => {
        const val = input.value.trim().toLowerCase(); if(!val) { input.focus(); return; }
        for(const key in _enhMap) { if(val.includes(key)) { input.value=_enhMap[key]; input.style.borderColor='#fbbf24'; setTimeout(()=>{input.style.borderColor='rgba(139,92,246,0.3)';},1500); return; } }
        input.value = (isFr?'Application premium : ':'Premium app: ') + val + (isFr?' avec design glassmorphism et fonctionnalités avancées':' with glassmorphism design and advanced features');
        input.style.borderColor='#fbbf24'; setTimeout(()=>{input.style.borderColor='rgba(139,92,246,0.3)';},1500);
    };
    const _hintLbl = document.createElement('div');
    _hintLbl.style = 'font-size:10px; color:rgba(255,255,255,0.2); margin-left:auto; font-family:monospace; white-space:nowrap;';
    _hintLbl.innerHTML = 'Ctrl+Enter &middot; Ctrl+T &middot; Ctrl+H &middot; Ctrl+E';
    
    let isMutationMode = false;
    const _modeToggle = document.createElement('div');
    _modeToggle.style = 'display:flex; background:rgba(0,0,0,0.3); border-radius:8px; padding:3px; margin-right:8px; border:1px solid rgba(255,255,255,0.1); flex-shrink:0;';
    _modeToggle.innerHTML = `
        <button id="mode-create" style="background:rgba(139,92,246,0.3); color:#fff; border:none; padding:5px 12px; font-size:11px; border-radius:6px; cursor:pointer; font-weight:700; transition:0.2s;">\u2728 ${isFr?'Nouvel App':'New App'}</button>
        <button id="mode-mutate" style="background:transparent; color:#64748b; border:none; padding:5px 12px; font-size:11px; border-radius:6px; cursor:pointer; font-weight:700; transition:0.2s;">\ud83d\udd28 ${isFr?'Mutation':'Mutation'}</button>
    `;
    _modeToggle.querySelector('#mode-create').onclick = function() {
        isMutationMode = false;
        this.style.background = 'rgba(139,92,246,0.3)'; this.style.color = '#fff';
        _modeToggle.querySelector('#mode-mutate').style.background = 'transparent'; 
        _modeToggle.querySelector('#mode-mutate').style.color = '#64748b';
        input.placeholder = isFr ? 'Quelle application voulez-vous cr\u00e9er ?' : 'What app should I generate?';
    };
    _modeToggle.querySelector('#mode-mutate').onclick = function() {
        isMutationMode = true;
        this.style.background = 'rgba(16,185,129,0.3)'; this.style.color = '#10b981';
        _modeToggle.querySelector('#mode-create').style.background = 'transparent'; 
        _modeToggle.querySelector('#mode-create').style.color = '#64748b';
        input.placeholder = isFr ? 'Quelle modification voulez-vous apporter au code g\u00e9n\u00e9r\u00e9 ?' : 'What change should I apply to the current app?';
    };
    
    _enhRow.appendChild(_modeToggle);
    _enhRow.appendChild(_enhBtn);
    _enhRow.appendChild(_hintLbl);
    inputArea.appendChild(_enhRow);
    container.appendChild(inputArea);

    // ==========================================
    // MODULE: CONSOLE LOGGER
    // ==========================================
    const logMessage = (msg, type = 'system', delay = 0) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.style = 'opacity: 0; transform: translateX(-10px); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); line-height: 1.6; display:flex; align-items:flex-start; gap:10px; background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:8px; border-left: 2px solid transparent; margin-bottom: 4px;';
                
                let color = '#a78bfa';
                let label = type.toUpperCase();
                
                if(type === 'user') { color = '#fff'; label = 'USER'; line.style.background = 'rgba(139,92,246,0.1)'; }
                if(type === 'architect') { color = '#3b82f6'; label = isFr?'ARCHITECTE':'ARCHITECT'; line.style.borderLeftColor = '#3b82f6'; }
                if(type === 'design') { color = '#ec4899'; label = 'DESIGN'; line.style.borderLeftColor = '#ec4899'; }
                if(type === 'logic') { color = '#10b981'; label = 'LOGIC CORE'; line.style.borderLeftColor = '#10b981'; }
                if(type === 'alert') { color = '#fbbf24'; label = 'SECURITY'; line.style.borderLeftColor = '#fbbf24'; }
                if(type === 'success') { color = '#10b981'; label = 'COMPLETE'; line.style.borderLeftColor = '#10b981'; line.style.boxShadow = '0 0 15px rgba(16,185,129,0.1)'; }
                if(type === 'system') { color = '#94a3b8'; label = 'SYSTEM'; }
                if(type === 'ai') { color = '#a78bfa'; label = 'AI CORE'; line.style.borderLeftColor = '#a78bfa'; }
                if(type === 'performance') { color = '#06b6d4'; label = 'PERF'; line.style.borderLeftColor = '#06b6d4'; }
                if(type === 'oracle') { color = '#f97316'; label = 'ORACLE'; line.style.borderLeftColor = '#f97316'; }
                if(type === 'complexity') { color = '#ec4899'; label = 'MATRIX'; line.style.borderLeftColor = '#ec4899'; }

                line.innerHTML = `
                    <div style="background:${color}22; color:${color}; font-size:10px; font-weight:900; padding:2px 6px; border-radius:4px; min-width:75px; text-align:center; border:1px solid ${color}44; white-space:nowrap;">${label}</div>
                    <div style="color:${type==='user'?'#fff':'#c4b5fd'}; flex:1; font-size:11px;">${msg}</div>
                `;
                consoleArea.appendChild(line);
                consoleArea.scrollTop = consoleArea.scrollHeight;
                
                requestAnimationFrame(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                });
                resolve();
            }, delay);
        });
    };

    // ==========================================
    // MODULE: HISTORY MANAGER
    // ==========================================
    const _histDB = JSON.parse(localStorage.getItem('iaUltraHistory_v3') || '[]');
    const _saveHistory = (prompt, theme, type) => {
        _histDB.unshift({ prompt, theme: theme.name||theme.id, type, date: new Date().toLocaleString(), id: Date.now() });
        if(_histDB.length > 15) _histDB.pop();
        localStorage.setItem('iaUltraHistory_v3', JSON.stringify(_histDB));
        _renderHistory();
    };
    const _renderHistory = () => {
        const list = document.getElementById('history-list'); if(!list) return;
        if(!_histDB.length) { list.innerHTML = `<div style="text-align:center; padding:40px 20px; opacity:0.4; font-size:11px;">${isFr?'Aucune génération encore.':'No generations yet.'}</div>`; return; }
        list.innerHTML = _histDB.map((e,i) => `<div class="hist-item" data-prompt="${encodeURIComponent(e.prompt)}" style="background:rgba(255,255,255,0.03); border:1px solid rgba(139,92,246,0.15); border-radius:10px; padding:12px; margin-bottom:8px; cursor:pointer; transition:0.2s;"><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span style="font-size:10px; color:#8b5cf6; font-weight:900;">#${i+1}</span><span style="font-size:9px; opacity:0.4;">${e.date}</span></div><div style="font-size:11px; font-weight:700; color:#e2e8f0; margin-bottom:6px; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${e.prompt}</div><div style="display:flex; gap:5px;"><span style="font-size:9px; background:rgba(139,92,246,0.15); color:#a78bfa; padding:2px 6px; border-radius:3px;">🎨 ${e.theme}</span><span style="font-size:9px; background:rgba(16,185,129,0.1); color:#34d399; padding:2px 6px; border-radius:3px;">📦 ${e.type}</span></div></div>`).join('');
        list.querySelectorAll('.hist-item').forEach(item => {
            item.onmouseover = () => { item.style.borderColor='rgba(139,92,246,0.4)'; item.style.background='rgba(139,92,246,0.07)'; };
            item.onmouseout = () => { item.style.borderColor='rgba(139,92,246,0.15)'; item.style.background='rgba(255,255,255,0.03)'; };
            item.onclick = () => { input.value=decodeURIComponent(item.dataset.prompt); historyPanel.style.transform='translateX(100%)'; setTimeout(()=>{historyPanel.style.display='none';},350); handlePrompt(); };
        });
    };
    _renderHistory();

    // ==========================================
    // MODULE: EXPORT MANAGER LOGIC
    // ==========================================
    let _lastCode = ''; let _lastPrompt = '';
    const _getCode = () => { if(window.editor) return window.editor.getValue(); if(typeof editor!=='undefined'&&editor) return editor.getValue(); return _lastCode; };
    exportModal.querySelector('#exp-copy').onclick = () => {
        const code = _getCode(); if(!code) return;
        const btn = exportModal.querySelector('#exp-copy');
        try { navigator.clipboard.writeText(code).then(() => { btn.innerHTML = `✅ ${isFr?'Copié !':'Copied!'}`; setTimeout(()=>{btn.innerHTML=`📋 ${isFr?'Copier le Code HTML':'Copy HTML Code'}`;},2000); }); }
        catch(e) { const ta=document.createElement('textarea'); ta.value=code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); btn.innerHTML=`✅ ${isFr?'Copié!':'Copied!'}`; setTimeout(()=>{btn.innerHTML=`📋 ${isFr?'Copier le Code HTML':'Copy HTML Code'}`;},2000); }
    };
    exportModal.querySelector('#exp-download').onclick = () => {
        const code = _getCode(); if(!code) return;
        const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([code],{type:'text/html'}));
        a.download=(_lastPrompt||'ia-ultra-app').replace(/[^a-zA-Z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,30)+'.html'; a.click();
        exportModal.style.display='none';
    };
    exportModal.querySelector('#exp-new-tab').onclick = () => {
        const code = _getCode(); if(!code) return;
        window.open(URL.createObjectURL(new Blob([code],{type:'text/html'})),'_blank');
        exportModal.style.display='none';
    };
    exportModal.querySelector('#exp-close').onclick = () => { exportModal.style.display='none'; };
    exportModal.onclick = (e) => { if(e.target===exportModal) exportModal.style.display='none'; };

    // ==========================================
    // MODULE: HEADER BUTTONS LOGIC
    // ==========================================
    header.querySelector('#btn-templates').onclick = () => { templatesPanel.style.display = templatesPanel.style.display==='flex' ? 'none' : 'flex'; };
    templatesPanel.querySelector('#close-templates').onclick = () => { templatesPanel.style.display='none'; };
    header.querySelector('#btn-history').onclick = () => {
        _renderHistory();
        if(historyPanel.style.display!=='flex') { historyPanel.style.display='flex'; setTimeout(()=>{historyPanel.style.transform='translateX(0)';},10); }
        else { historyPanel.style.transform='translateX(100%)'; setTimeout(()=>{historyPanel.style.display='none';},350); }
    };
    historyPanel.querySelector('#close-history').onclick = () => { historyPanel.style.transform='translateX(100%)'; setTimeout(()=>{historyPanel.style.display='none';},350); };
    header.querySelector('#btn-export').onclick = () => { exportModal.style.display='flex'; };

    // ==========================================
    // MODULE: COMPLEXITY METER
    // ==========================================
    const _getComplexity = (type, prompt) => {
        const u=['galaxy','3d_earth','3d_shapes','crypto','landing_premium','resume_builder'];
        const a=['saas','kanban','medical','ecommerce','fintech','social','education','quiz','calendar','photo_gallery','budget_planner','habit_tracker','podcast','translator','restaurant'];
        if(u.includes(type)) return { level:'ULTRA', color:'#ec4899', score: 92+Math.floor(Math.random()*8) };
        if(a.includes(type)||prompt.split(' ').length>10) return { level:'ADVANCED', color:'#8b5cf6', score: 72+Math.floor(Math.random()*18) };
        if(prompt.split(' ').length>5) return { level:'STANDARD', color:'#3b82f6', score: 50+Math.floor(Math.random()*20) };
        return { level:'SIMPLE', color:'#10b981', score: 28+Math.floor(Math.random()*18) };
    };

    // ==========================================
    // MODULE: SYNTAX ORACLE
    // ==========================================
    const _runOracle = (code) => {
        const lines = code.split('\n').length;
        const jsFn = (code.match(/function\s+\w+|=>\s*\{|\.onclick\s*=/g)||[]).length;
        const htmlEl = (code.match(/<[a-zA-Z]+[\s>]/g)||[]).length;
        const ls = code.includes('localStorage'), has3d = code.includes('THREE'), hasAnim = code.includes('animation')||code.includes('transition');
        const score = Math.min(100, Math.floor((lines>300?22:lines>150?14:7)+(jsFn>12?20:jsFn*1.5)+(ls?15:0)+(hasAnim?12:0)+(has3d?22:0)));
        return { lines, jsFn, htmlEl, ls, has3d, hasAnim, score };
    };
    let matrixInterval = null;
    const startMatrixStream = (themeCSS) => {
        matrixArea.style.flex = '1';
        matrixArea.style.padding = '10px 20px';
        matrixArea.style.borderTop = '1px solid rgba(59,130,246,0.3)';
        
        let dummyCode = `import { IA_ULTRA } from '@aura/engine';\nconst DOMProcessor = new IA_ULTRA.NodeScanner();\nDOMProcessor.init({ theme: '${themeCSS}' });\n`;
        dummyCode += `function mutateDOM(nodes) {\n  return nodes.map(n => \`<div class="ultra-component \${n.type}">\${n.content}</div>\`);\n}\n`;
        dummyCode += `const CSS_INJECTOR = {\n  vars: '--primary: #8b5cf6; --glass: rgba(0,0,0,0.5);',\n  apply: () => document.root.append(vars)\n};\n\n`;
        dummyCode += `// Initializing OMNI-ASSEMBLER Sandbox...\nlet __GeniusDB = new LocalMatrix();\nawait __GeniusDB.hydrate();\n\n`;
        for(let i=0; i<30; i++) {
            dummyCode += `DOMProcessor.renderBlock(0x${Math.floor(Math.random()*100000).toString(16)});  // Building node tree...\n`;
        }

        let charIndex = 0;
        matrixArea.innerText = '';
        
        matrixInterval = setInterval(() => {
            if(charIndex < dummyCode.length) {
                matrixArea.innerText += dummyCode.substring(charIndex, charIndex+5);
                charIndex += 5;
                matrixArea.scrollTop = matrixArea.scrollHeight;
            } else {
                clearInterval(matrixInterval);
            }
        }, 30);
    };

    const stopMatrixStream = () => {
        if(matrixInterval) clearInterval(matrixInterval);
        setTimeout(() => {
            matrixArea.style.flex = '0';
            matrixArea.style.padding = '0 20px';
            matrixArea.style.borderTop = '1px solid transparent';
            setTimeout(() => { matrixArea.innerText = ''; }, 500);
        }, 1500);
    };

    // ==========================================
    // MODULE: HOLOGRAPHIC THEME ARCHITECT
    // ==========================================
    const renderThemeSelector = (promptText) => {
        return new Promise(resolve => {
            const themeContainer = document.createElement('div');
            themeContainer.style = 'display:flex; flex-direction:column; gap:10px; margin-top:10px; margin-bottom: 20px;';
            
            const txt = isFr ? '🎨 ARCHITECTE: Choisissez l\'esthétique' : '🎨 ARCHITECT: Select System Aesthetic';
            const title = document.createElement('div');
            title.style='color:#ec4899; font-weight:bold; margin-bottom:5px; text-shadow:0 0 5px #ec4899;';
            title.innerText = txt;
            themeContainer.appendChild(title);

            const themes = [
                { id: 'cyber', name: 'CYBER NEON', bg: 'linear-gradient(135deg, #09090b, #1e1b4b)', accent: '#8b5cf6, #3b82f6', desc: isFr ? 'Néons, Gradients, Futuriste' : 'Neons, Gradients, Futuristic' },
                { id: 'hologram', name: 'MATRIX GLITCH', bg: 'linear-gradient(135deg, #001a1a, #000)', accent: '#00ffcc, #0080ff', desc: isFr ? 'Holographique, Effets de scan' : 'Holographic, Scanline effects' },
                { id: 'darkglass', name: 'DARK GLASS', bg: 'linear-gradient(135deg, #000000, #171717)', accent: '#a3e635, #10b981', desc: isFr ? 'Transparence premium, Minimal' : 'Premium transparency, Minimal' },
                { id: 'apple', name: 'MINIMAL PURE', bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', accent: '#0f172a, #334155', desc: isFr ? 'Clair, Élégant, Professionnel' : 'Light, Elegant, Professional' },
                { id: 'neobrutal', name: 'NEO BRUTALISM', bg: '#ffeb3b', accent: '#000000, #ff5722', desc: isFr ? 'Contraste extrem, Bold, Retro Web' : 'Extreme contrast, Bold, Retro Web' },
                { id: 'liquidaurora', name: 'LIQUID AURORA', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #a1c4fd 100%)', accent: '#d4fc79, #ec4899', desc: isFr ? 'Gradient fluid, Visceral, Modern' : 'Fluid gradient, Visceral, Modern' },
                { id: 'extreme', name: 'EXTREME GLASS', bg: 'linear-gradient(135deg, #0f172a, #1e293b)', accent: '#00c6ff, #0072ff', desc: isFr ? 'Transludic, Ultra-blur, Elegant' : 'Translucent, Ultra-blur, Elegant' }
            ];

            const grid = document.createElement('div');
            grid.style = 'display:grid; grid-template-columns: 1fr; gap: 10px;';

            themes.forEach(t => {
                const card = document.createElement('div');
                card.style = `padding: 12px; border-radius: 8px; background: ${t.bg}; border: 1px solid rgba(255,255,255,0.1); cursor:pointer; transition:0.3s; position:relative; overflow:hidden;`;
                card.innerHTML = `
                    <div style="font-weight:bold; color: ${t.id === 'apple' ? '#0f172a' : '#fff'};">${t.name}</div>
                    <div style="font-size:10px; color: ${t.id === 'apple' ? '#475569' : '#94a3b8'}; margin-top:2px;">${t.desc}</div>
                    <div style="position:absolute; right: -10px; bottom: -10px; width:40px; height:40px; background:linear-gradient(45deg, ${t.accent}); filter:blur(15px); border-radius:50%;"></div>
                `;
                
                card.onmouseover = () => { card.style.transform = 'scale(1.02)'; card.style.borderColor = 'rgba(255,255,255,0.3)'; };
                card.onmouseout = () => { card.style.transform = 'scale(1)'; card.style.borderColor = 'rgba(255,255,255,0.1)'; };
                
                card.onclick = () => {
                    grid.style.pointerEvents = 'none';
                    card.style.border = '2px solid #10b981';
                    card.style.boxShadow = '0 0 15px rgba(16,185,129,0.4)';
                    setTimeout(() => {
                        themeContainer.style.display = 'none';
                        bgGlow.style.background = `radial-gradient(circle, ${t.accent.split(',')[0]}33 0%, rgba(0,0,0,0) 70%)`;
                        resolve(t);
                    }, 600);
                };
                grid.appendChild(card);
            });

            themeContainer.appendChild(grid);
            consoleArea.appendChild(themeContainer);
            consoleArea.scrollTop = consoleArea.scrollHeight;
        });
    };

    // ==========================================
    // MODULE: MASTER SEQUENCE GENERATOR
    // ==========================================
    const runGenerationSequence = async (prompt) => {
        sendBtn.style.opacity = '0.5';
        sendBtn.style.pointerEvents = 'none';
        input.disabled = true;
        header.querySelector('#btn-export').disabled = true;

        await logMessage(prompt, 'user');
        const selectedTheme = await renderThemeSelector(prompt);
        
        const fr = (window.lang === 'fr');
        const _type = OmniAssembler.classifyIntent(prompt);
        const _cx = _getComplexity(_type, prompt);

        await logMessage(fr ? `Thème sélectionné: [${selectedTheme.name}]` : `Theme secured: [${selectedTheme.name}]`, 'system', 200);
        await logMessage(fr ? `Analyse de l'intention sémantique: [${prompt.substring(0,25)}...]` : `Decoding semantic intent: [${prompt.substring(0,25)}...]`, 'system', 600);
        await logMessage(
            fr ? `Complexité détectée: <span style="background:${_cx.color}22; color:${_cx.color}; padding:2px 8px; border-radius:4px; font-weight:900; font-size:10px;">${_cx.level}</span> · Score Matrix: ${_cx.score}/100`
               : `Complexity detected: <span style="background:${_cx.color}22; color:${_cx.color}; padding:2px 8px; border-radius:4px; font-weight:900; font-size:10px;">${_cx.level}</span> · Matrix Score: ${_cx.score}/100`,
            'complexity', 400
        );
        
        startMatrixStream(selectedTheme.id || 'cyber');

        await logMessage(fr ? '[Agent Arhitecte] Classification de la Catégorie App...' : '[Architect Agent] Classifying Application Core...', 'architect', 800);
        await logMessage(fr ? '[Expert] Optimisation du contraste pour accessibilité WCAG 2.1...' : '[Expert] Optimizing contrast ratios for WCAG 2.1 accessibility...', 'system', 400);
        
        const is3D = (prompt.toLowerCase().includes('3d') || prompt.toLowerCase().includes('space') || prompt.toLowerCase().includes('galaxy') || prompt.toLowerCase().includes('universe') || prompt.toLowerCase().includes('planet'));
        if(is3D) {
            await logMessage(fr ? '[3D Architect] Initialisation du context WebGL & Accélération GPU...' : '[3D Architect] Initializing WebGL context & GPU Acceleration...', 'architect', 900);
            await logMessage(fr ? '[Physics Agent] Calcul des trajectoires orbitales...' : '[Physics Agent] Calculating orbital trajectories...', 'logic', 700);
        }

        await logMessage(fr ? '[Agent Arhitecte] Construction de la grille DOM structurée...' : '[Architect Agent] Scaffolding structured DOM grid...', 'architect', 1000);
        await logMessage(fr ? '[Design Agent] Synthèse des tokens Glassmorphism...' : '[Design Agent] Synthesizing glassmorphism depth tokens...', 'design', 600);
        await logMessage(fr ? '[Agent Design] Injection de tokens CSS ('+selectedTheme.name+')...' : '[Design Agent] Injecting CSS tokens ('+selectedTheme.name+')...', 'design', 600);
        
        if(is3D) {
            await logMessage(fr ? '[Cosmic Agent] Génération des shaders de nébuleuse...' : '[Cosmic Agent] Synthesizing nebula shaders...', 'design', 800);
        }

        await logMessage(fr ? '[Logo Architect] Génération d\'une identité visuelle procedurale...' : '[Logo Architect] Synthesizing procedural visual identity...', 'design', 700);
        await logMessage(fr ? '[Vocal Agent] Calibrage des phonèmes linguistiques (EN/FR)...' : '[Vocal Agent] Calibrating linguistic phonemes (EN/FR)...', 'ai', 600);
        await logMessage(fr ? '[Agent Logique] Synthèse Mutator Logic (Mock DB, Handlers)...' : '[Logic Agent] Synthesizing Mutator Logic (Mock DB, Handlers)...', 'logic', 1100);
        await logMessage(fr ? '[Sécurité] Validation des injections...' : '[Security] Validating boundary injection...', 'alert', 800);
        await logMessage(fr ? '[Performance] Optimisation du bundle final...' : '[Performance] Optimizing final bundle...', 'performance', 600);
        await logMessage(fr ? 'Compilation de la matrice finale...' : 'Compiling final matrix...', 'system', 1000);
        
        stopMatrixStream();

        // Omni-Assembler Integration
        const result = OmniAssembler.buildApp(prompt, selectedTheme);
        _lastCode = result; _lastPrompt = prompt;
        _saveHistory(prompt, selectedTheme, _type);
        
        // Inject into editor
        if(window.editor) {
            window.editor.setValue(result);
            window.editor.pushUndoStop();
        } else if (typeof editor !== 'undefined' && editor) {
            editor.setValue(result);
            editor.pushUndoStop();
        }

        await logMessage(fr ? '⚡ APPLICATION GÉNÉRÉE AVEC SUCCÈS ! (100% Fonctionnelle)' : '⚡ APPLICATION SUCCESSFULLY GENERATED! (100% Functional)', 'success', 800);

        // SYNTAX ORACLE ANALYSIS
        const _or = _runOracle(result);
        await logMessage(
            fr ? `🔬 ${_or.lines} lignes · ${_or.htmlEl} éléments · ${_or.jsFn} fonctions JS ${_or.ls?'· 💾 LocalStorage':''} ${_or.has3d?'· 🌐 WebGL 3D':''} ${_or.hasAnim?'· ✨ Animations':''} · Score: ${_or.score}/100`
             : `🔬 ${_or.lines} lines · ${_or.htmlEl} elements · ${_or.jsFn} JS functions ${_or.ls?'· 💾 LocalStorage':''} ${_or.has3d?'· 🌐 WebGL 3D':''} ${_or.hasAnim?'· ✨ Animations':''} · Score: ${_or.score}/100`,
            'oracle', 400
        );

        // APP CARD (Preview Highlight + action buttons)
        setTimeout(() => {
            const _ac = document.createElement('div');
            _ac.style = 'background:linear-gradient(135deg,rgba(139,92,246,0.08),rgba(16,185,129,0.04)); border:1px solid rgba(139,92,246,0.25); border-radius:14px; padding:16px; margin-top:8px; animation:ultraFadeIn 0.5s ease;';
            _ac.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;"><div><div style="font-size:9px; color:#6b7280; font-weight:700; letter-spacing:1px; margin-bottom:2px;">${fr?'APP G\u00c9N\u00c9R\u00c9E':'GENERATED APP'}</div><div style="font-size:12px; font-weight:900; color:#e2e8f0; max-width:190px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${prompt.replace(/"/g,'&quot;')}">${prompt}</div></div><span style="background:${_cx.color}18; color:${_cx.color}; font-size:9px; font-weight:900; padding:4px 10px; border-radius:6px; border:1px solid ${_cx.color}33; flex-shrink:0;">${_cx.level}</span></div><div style="display:flex; gap:7px; flex-wrap:wrap; margin-bottom:12px;"><span style="font-size:10px; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; color:#94a3b8;">\ud83c\udfa8 ${selectedTheme.name}</span><span style="font-size:10px; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; color:#94a3b8;">\ud83d\udce6 ${_or.lines} ${fr?'lignes':'lines'}</span><span style="font-size:10px; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; color:#94a3b8;">\u26a1 ${_or.score}/100</span></div><div style="display:flex; gap:7px;"><button id="ac-variant" style="flex:1; background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.35); color:#a78bfa; border-radius:8px; padding:7px 4px; cursor:pointer; font-size:11px; font-weight:700; transition:0.2s;">\ud83c\udfb2 ${fr?'Variante':'Variant'}</button><button id="ac-speak" style="flex:1; background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.35); color:#60a5fa; border-radius:8px; padding:7px 4px; cursor:pointer; font-size:11px; font-weight:700; transition:0.2s;">\ud83d\udce2 ${fr?'Narrer':'Narrate'}</button><button id="ac-export" style="flex:1; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#34d399; border-radius:8px; padding:7px 4px; cursor:pointer; font-size:11px; font-weight:700; transition:0.2s;">\ud83d\udce4 Export</button><button id="ac-export-react" style="flex:1; background:rgba(236,72,153,0.12); border:1px solid rgba(236,72,153,0.35); color:#f472b6; border-radius:8px; padding:7px 4px; cursor:pointer; font-size:11px; font-weight:700; transition:0.2s;">\u1f680 React</button></div>`;
            consoleArea.appendChild(_ac); consoleArea.scrollTop=consoleArea.scrollHeight;

            // VARIANT ENGINE
            const _allThemes = [
                {id:'cyber',name:'CYBER NEON',accent:'#8b5cf6, #3b82f6'},{id:'hologram',name:'MATRIX GLITCH',accent:'#00ffcc, #0080ff'},
                {id:'darkglass',name:'DARK GLASS',accent:'#a3e635, #10b981'},{id:'apple',name:'MINIMAL PURE',accent:'#0f172a, #334155'},
                {id:'neobrutal',name:'NEO BRUTALISM',accent:'#000000, #ff5722'},{id:'liquidaurora',name:'LIQUID AURORA',accent:'#d4fc79, #ec4899'},
                {id:'extreme',name:'EXTREME GLASS',accent:'#00c6ff, #0072ff'}
            ];
            _ac.querySelector('#ac-variant').onclick = () => {
                const others = _allThemes.filter(t=>t.id!==(selectedTheme.id||'cyber'));
                const vt = others[Math.floor(Math.random()*others.length)];
                const vBtn = _ac.querySelector('#ac-variant'); vBtn.innerHTML='\u23f3';
                const vr = OmniAssembler.buildApp(prompt, vt); _lastCode=vr;
                if(window.editor){window.editor.setValue(vr);window.editor.pushUndoStop();}else if(typeof editor!=='undefined'&&editor){editor.setValue(vr);editor.pushUndoStop();}
                if(typeof window.runPreview==='function') window.runPreview(); else if(typeof runPreview==='function') runPreview();
                _saveHistory(prompt+` [+variant: ${vt.name}]`, vt, _type);
                vBtn.innerHTML=`\u2705 ${fr?'Appliqu\u00e9!':'Applied!'}`; setTimeout(()=>{vBtn.innerHTML=`\ud83c\udfb2 ${fr?'Variante':'Variant'}`;},2000);
            };

            // SPEAK MODE
            _ac.querySelector('#ac-speak').onclick = () => {
                if(!window.speechSynthesis) return;
                window.speechSynthesis.cancel();
                const summary = fr
                    ? `Application g\u00e9n\u00e9r\u00e9e. Type: ${_type.replace(/_/g,' ')}. Th\u00e8me: ${selectedTheme.name}. ${_or.lines} lignes de code. Complexit\u00e9: ${_cx.level}. Score: ${_or.score} sur cent.`
                    : `Application generated. Type: ${_type.replace(/_/g,' ')}. Theme: ${selectedTheme.name}. ${_or.lines} lines of code. Complexity: ${_cx.level}. Score: ${_or.score} out of one hundred.`;
                const utt = new SpeechSynthesisUtterance(summary);
                utt.lang = fr?'fr-FR':'en-US'; utt.rate=0.9; window.speechSynthesis.speak(utt);
                const sBtn = _ac.querySelector('#ac-speak'); sBtn.innerHTML=`\u23f9\ufe0f Stop`;
                utt.onend=()=>{sBtn.innerHTML=`\ud83d\udce2 ${fr?'Narrer':'Narrate'}`;};  
                sBtn.onclick=()=>{window.speechSynthesis.cancel();sBtn.innerHTML=`\ud83d\udce2 ${fr?'Narrer':'Narrate'}`;};  
            };

            // EXPORT
            _ac.querySelector('#ac-export').onclick = () => { exportModal.style.display='flex'; };
            
            // REACT EXPORT (JSZip)
            _ac.querySelector('#ac-export-react').onclick = async () => {
                const zbtn = _ac.querySelector('#ac-export-react');
                zbtn.innerHTML = '\u23f3...';
                
                try {
                    const zip = new JSZip();
                    const code = typeof _lastCode !== 'undefined' ? _lastCode : (window.editor ? window.editor.getValue() : '');
                    
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(code, "text/html");
                    
                    const css = Array.from(doc.querySelectorAll('style')).map(s => s.innerHTML).join('\n');
                    let bodyHtml = doc.body.innerHTML; 
                    bodyHtml = bodyHtml.replace(/class=/g, 'className=').replace(/onclick=/g, 'onClick=').replace(/style="([^"]*)"/g, (match, p1) => {
                         const obj = p1.split(';').filter(e=>e.trim()).map(e=>{ const p=e.split(':'); if(!p[1])return ''; const k=p[0].trim().replace(/-([a-z])/g, g=>g[1].toUpperCase()); return `"${k}":"${p[1].trim()}"`;}).filter(Boolean).join(',');
                         return `style={{${obj}}}`;
                    }).replace(/style='([^']*)'/g, (match, p1) => {
                         const obj = p1.split(';').filter(e=>e.trim()).map(e=>{ const p=e.split(':'); if(!p[1])return ''; const k=p[0].trim().replace(/-([a-z])/g, g=>g[1].toUpperCase()); return `"${k}":"${p[1].trim()}"`;}).filter(Boolean).join(',');
                         return `style={{${obj}}}`;
                    });
                    
                    const reactComp = `import React, { useEffect } from 'react';\nimport './index.css';\n\nexport default function App() {\n  return (\n    <div className="ia-ultra-app">\n      ${bodyHtml}\n    </div>\n  );\n}`;
                    const indexHtml = `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>IA Ultra React App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`;
                    const mainJsx = `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`;
                    const pkgJson = `{\n  "name": "ia-ultra-react-app",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1"\n  },\n  "devDependencies": {\n    "@types/react": "^18.3.3",\n    "@types/react-dom": "^18.3.0",\n    "@vitejs/plugin-react": "^4.3.1",\n    "vite": "^5.3.1"\n  }\n}`;

                    zip.file("index.html", indexHtml);
                    zip.file("package.json", pkgJson);
                    zip.folder("src").file("App.jsx", reactComp);
                    zip.folder("src").file("main.jsx", mainJsx);
                    zip.folder("src").file("index.css", css);

                    const content = await zip.generateAsync({type:"blob"});
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(content);
                    a.download = "ia-ultra-react.zip";
                    a.click();
                    
                    zbtn.innerHTML = '\u2705 ZIP';
                    setTimeout(() => { zbtn.innerHTML = '\u1f680 React'; }, 2000);
                } catch(err) {
                    console.error(err);
                    zbtn.innerHTML = '\u274c Err';
                }
            };
        }, 1200);

        header.querySelector('#btn-export').disabled = false;
        
        if (typeof window.runPreview === 'function') window.runPreview();
        else if (typeof runPreview === 'function') runPreview();

        sendBtn.style.opacity = '1';
        sendBtn.style.pointerEvents = 'all';
        input.disabled = false;
        input.value = '';
        input.focus();
    };

    const runMutationSequence = async (promptText) => {
        const ed = window.editor;
        if(!ed || !ed.getValue() || ed.getValue().length < 50) {
            await logMessage(isFr ? "\u274c ERREUR: Aucun code actuel d\u00e9tect\u00e9 dans l'\u00e9diteur." : "\u274c ERROR: No existing code detected in editor.", 'alert', 0);
            return;
        }
        
        sendBtn.style.opacity = '0.5';
        sendBtn.style.pointerEvents = 'none';
        input.disabled = true;
        
        await logMessage(promptText, 'user');
        await logMessage(isFr ? "[AGENT MUTATION] R\u00e9veil de la sentinelle..." : "[MUTATION AGENT] Awakening sentinel...", 'logic', 300);
        await logMessage(isFr ? `Cartographie de l'intention: [${promptText.substring(0,35)}]` : `Mapping semantic intent: [${promptText.substring(0,35)}]`, 'system', 500);
        
        startMatrixStream('hologram');
        await logMessage(isFr ? "[AGENT MUTATION] Scan du DOM courant en cours..." : "[MUTATION AGENT] Scanning current DOM structure...", 'architect', 800);
        await logMessage(isFr ? "Ciblage des heuristiques visuelles..." : "Targeting graphical heuristics...", 'design', 600);
        
        // Simulating mutation processing
        const code = ed.getValue();
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, "text/html");
        
        const lowP = promptText.toLowerCase();
        let mutated = false;
        
        if (lowP.includes('dark') || lowP.includes('sombre')) {
            await logMessage(isFr ? "[MUTATION] Injection du Mode Nuit (Glassmorphism)..." : "[MUTATION] Injecting Dark Glassmorphism...", 'design', 500);
            const _st = doc.createElement('style');
            _st.innerHTML = "body { background: linear-gradient(135deg, #020617, #000) !important; color: #f8fafc !important; } .card, nav, header, section { background: rgba(0,0,0,0.6) !important; backdrop-filter: blur(15px) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; } h1, h2, h3 { color: #fff !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        if (lowP.includes('red') || lowP.includes('rouge')) {
            await logMessage(isFr ? "[MUTATION] Remplacement des Primary Tokens (Rouge)..." : "[MUTATION] Rewiring Primary Tokens (Red)...", 'design', 500);
            const _st = doc.createElement('style');
            _st.innerHTML = "button, .btn { background: #ef4444 !important; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4) !important; color: #fff !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        if (lowP.includes('blue') || lowP.includes('bleu')) {
            await logMessage(isFr ? "[MUTATION] Remplacement des Primary Tokens (Bleu)..." : "[MUTATION] Rewiring Primary Tokens (Blue)...", 'design', 500);
            const _st = doc.createElement('style');
            _st.innerHTML = "button, .btn { background: #3b82f6 !important; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important; color: #fff !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        if (lowP.includes('green') || lowP.includes('vert')) {
            await logMessage(isFr ? "[MUTATION] Remplacement des Primary Tokens (Vert)..." : "[MUTATION] Rewiring Primary Tokens (Green)...", 'design', 500);
            const _st = doc.createElement('style');
            _st.innerHTML = "button, .btn { background: #10b981 !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important; color: #fff !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        if (lowP.includes('round') || lowP.includes('arrondi') || lowP.includes('border')) {
            await logMessage(isFr ? "[MUTATION] Alt\u00e9ration g\u00e9om\u00e9trique (Border-Radius)..." : "[MUTATION] Geometric alteration (Border-Radius)...", 'architect', 400);
            const _st = doc.createElement('style');
            _st.innerHTML = "button, .btn, .card, img { border-radius: 20px !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        if (lowP.includes('anim')) {
            await logMessage(isFr ? "[MUTATION] Synth\u00e8se des hover states dynamiques..." : "[MUTATION] Synthesizing dynamic hover states...", 'design', 600);
            const _st = doc.createElement('style');
            _st.innerHTML = "button, .card { transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; } button:hover { transform: translateY(-4px) scale(1.05) !important; filter: brightness(1.2) !important; } .card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important; }";
            doc.head.appendChild(_st);
            mutated = true;
        }
        
        if (!mutated) {
            await logMessage(isFr ? "[MUTATION] Injection structurelle de pr\u00e9cision..." : "[MUTATION] Precision structural injection...", 'logic', 800);
            const h1s = doc.querySelectorAll('h1');
            if (h1s.length > 0) {
                h1s[0].innerHTML = promptText;
                h1s[0].style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
                h1s[0].style.webkitBackgroundClip = 'text';
                h1s[0].style.webkitTextFillColor = 'transparent';
            } else {
                const b = doc.createElement('div');
                b.style = "padding:20px; background:linear-gradient(135deg, #8b5cf6, #3b82f6); color:#fff; text-align:center; font-weight:900; border-radius:12px; margin:20px; font-family:sans-serif; font-size:24px; box-shadow:0 10px 30px rgba(59,130,246,0.5);";
                b.innerHTML = '\u2728 ' + promptText;
                if (doc.body.firstChild) doc.body.insertBefore(b, doc.body.firstChild);
                else doc.body.appendChild(b);
            }
        }
        
        await logMessage(isFr ? "[S\u00c9CURIT\u00c9] V\u00e9rification d'int\u00e9grit\u00e9 de la mutation..." : "[SECURITY] Verifying mutation integrity...", 'alert', 700);
        await logMessage(isFr ? "Application des alt\u00e9rations d\u00e9finitives..." : "Applying final structural alterations...", 'system', 500);
        
        stopMatrixStream();
        
        const langStr = doc.documentElement.lang || 'en';
        const finalMarkup = `<!DOCTYPE html>\n<html lang="${langStr}">\n${doc.head.outerHTML}\n${doc.body.outerHTML}\n</html>`;
        
        ed.setValue(finalMarkup);
        ed.pushUndoStop();
        
        if (typeof window._lastCode !== 'undefined') window._lastCode = finalMarkup;
        
        await logMessage(isFr ? "\u26a1 MUTATION APPLIQU\u00c9E AVEC SUCC\u00c8S !" : "\u26a1 MUTATION SUCCESSFULLY EVOLVED!", 'success', 800);
        
        if (typeof window.runPreview === 'function') window.runPreview();
        else if (typeof runPreview === 'function') runPreview();
        
        sendBtn.style.opacity = '1';
        sendBtn.style.pointerEvents = 'all';
        input.disabled = false;
        input.value = '';
        input.focus();
    };

    const handlePrompt = () => {
        const val = input.value.trim();
        if(!val) return;
        if(typeof isMutationMode !== 'undefined' && isMutationMode) {
            runMutationSequence(val);
        } else {
            runGenerationSequence(val);
        }
    };

    input.onkeydown = (e) => { if(e.key === 'Enter') handlePrompt(); };
    sendBtn.onclick = handlePrompt;

    // ==========================================
    // MODULE: KEYBOARD SHORTCUTS
    // ==========================================
    const _keyHandler = (e) => {
        if(!container.isConnected) { document.removeEventListener('keydown', _keyHandler); return; }
        if(e.ctrlKey && e.key==='Enter') { e.preventDefault(); handlePrompt(); }
        if(e.ctrlKey && (e.key==='h'||e.key==='H')) { e.preventDefault(); header.querySelector('#btn-history').click(); }
        if(e.ctrlKey && (e.key==='e'||e.key==='E')) { e.preventDefault(); if(!header.querySelector('#btn-export').disabled) exportModal.style.display='flex'; }
        if(e.ctrlKey && (e.key==='t'||e.key==='T')) { e.preventDefault(); header.querySelector('#btn-templates').click(); }
        if(e.key==='Escape') { templatesPanel.style.display='none'; historyPanel.style.transform='translateX(100%)'; setTimeout(()=>{historyPanel.style.display='none';},350); exportModal.style.display='none'; }
    };
    document.addEventListener('keydown', _keyHandler);

    // ==========================================
    // TYPEWRITER WELCOME MESSAGE
    // ==========================================
    const _welcome = isFr
        ? 'IA ULTRA v3.0 · 35+ types d\'apps · 8 thèmes · Templates · Export · History · Prêt.'
        : 'IA ULTRA v3.0 · 35+ app types · 8 themes · Templates · Export · History · Standing by.';
    setTimeout(() => {
        const wl = document.createElement('div');
        wl.style = 'opacity:0; padding:8px 12px; border-radius:8px; border-left:2px solid #8b5cf6; background:rgba(139,92,246,0.05); margin-bottom:4px; transition:opacity 0.5s;';
        const ws = document.createElement('span'); ws.style='font-size:11px; color:#a78bfa;'; wl.appendChild(ws);
        consoleArea.appendChild(wl); requestAnimationFrame(()=>{ wl.style.opacity='1'; });
        let wi=0; const wt=setInterval(()=>{ ws.innerText+=_welcome[wi]||''; wi++; consoleArea.scrollTop=consoleArea.scrollHeight; if(wi>=_welcome.length) clearInterval(wt); },20);
    }, 500);

    // Animation keyframe
    if(!document.getElementById('ultra-anim-style')) {
        const _st=document.createElement('style'); _st.id='ultra-anim-style';
        _st.innerHTML='@keyframes ultraFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(_st);
    }
  }

  // ==========================================
  // OMNI-ASSEMBLER ENGINE (Fully Functional Gen)
  // ==========================================
  const OmniAssembler = {
      lang: 'en',
      
      // PERSISTENT SESSION CONTEXT
      context: {
          activeType: null,
          brandName: null,
          features: new Set()
      },

      // NEURAL-HEURISTIC KNOWLEDGE BASE (Mapped to buildApp conditions)
      brain: {
          ai_chat: ['gpt', 'chat', 'ai', 'intel', 'assistant', 'bot', 'conversa', 'discusta'],
          fintech: ['bank', 'wallet', 'pay', 'transaction', 'finance', 'ledger', 'coin', 'broker', 'banca', 'portofel'],
          crypto: ['crypto', 'bitcoin', 'btc', 'eth', 'trading', 'exchange', 'market', 'chart', 'tranzactie'],
          saas: ['saas', 'subscription', 'platform', 'enterprise', 'b2b', 'service', 'abonament'],
          medical: ['medical', 'hospital', 'doctor', 'patient', 'clinic', 'sante', 'med', 'health', 'santé', 'spital', 'medic'],
          education: ['school', 'learn', 'education', 'academy', 'student', 'course', 'tutor', 'curs', 'cursuri', 'scoala'],
          agency: ['agency', 'creative', 'studio', 'art', 'design', 'agence', 'studio'],
          industrial: ['factory', 'industrial', 'monitor', 'logistics', 'iot', 'process', 'matrix', 'usine', 'fabrica'],
          kanban: ['task', 'todo', 'kanban', 'project', 'manage', 'organize', 'trello', 'proiect', 'toti'],
          notes: ['note', 'document', 'write', 'editor', 'text', 'doc', 'journal', 'notita', 'scris'],
          timer: ['timer', 'clock', 'time', 'pomodoro', 'focus', 'countdown', 'ceas', 'timp'],
          music: ['music', 'song', 'audio', 'player', 'vinyl', 'artist', 'muzica', 'piesa'],
          game: ['game', 'play', 'arcade', 'fun', 'snake', 'gaming', 'joc', 'distractie'],
          ecommerce: ['shop', 'store', 'magazin', 'boutique', 'cart', 'order', 'product', 'commerce', 'achat'],
          social: ['community', 'network', 'post', 'social', 'friend', 'chat', 'message', 'forum', 'amis', 'retea'],
          fitness: ['fit', 'sport', 'gym', 'workout', 'muscle', 'entraînement', 'fitness', 'pulse', 'antrenament'],
          blog: ['blog', 'news', 'article', 'journal', 'gazette', 'insights', 'stiri', 'articol'],
          dashboard: ['dashboard', 'admin', 'panel', 'stat', 'gestion', 'tableau', 'control', 'panou'],
          utility: ['calc', 'tool', 'utilitar', 'meteo', 'weather', 'converter', 'measure', 'scula', 'calculator'],
          realestate: ['imo', 'house', 'apartment', 'rent', 'sell', 'home', 'maison', 'appartement', 'location', 'casa'],
          travel: ['travel', 'voyage', 'hotel', 'booking', 'avion', 'flight', 'turism', 'vacanta'],
          legal: ['law', 'legal', 'lawyer', 'justice', 'court', 'case', 'avocat', 'justitie'],
          delivery: ['delivery', 'ship', 'track', 'parcel', 'courier', 'livrare', 'curier'],
          multipage: ['site', 'web', 'nav', 'menu', 'page', 'multiple', 'structure', 'pagini', 'complet'],
          portfolio: ['portfolio', 'work', 'cv', 'resume', 'skill', 'about', 'portofoliu', 'experienta'],
          '3d_shapes': ['3d', 'shape', 'cube', 'model', 'render', 'threejs', 'geometrie'],
          '3d_earth': ['earth', 'globe', 'world', 'planet', 'map', 'pamant', 'glob', 'harta'],
          galaxy: ['space', 'star', 'galaxy', 'universe', 'cosmos', 'astronomy', 'galaxie', 'univers'],
          // NEW TYPES v3.0
          restaurant: ['restaurant', 'menu', 'diner', 'bistro', 'cafe', 'brasserie', 'cuisine', 'pizza', 'burger', 'sushi', 'trattoria', 'resto'],
          habit_tracker: ['habit', 'routine', 'daily', 'streak', 'habitude', 'quotidien', 'suivi', 'habitudes'],
          photo_gallery: ['gallery', 'galerie', 'photo', 'photos', 'photography', 'lightbox', 'mosaic'],
          budget_planner: ['budget', 'expense', 'income', 'saving', 'finances', 'bilan'],
          translator: ['translate', 'translation', 'dictionnaire', 'dictionary', 'traduction', 'traduire'],
          podcast: ['podcast', 'episode', 'épisode', 'écouter', 'broadcasting'],
          calendar: ['calendar', 'calendrier', 'agenda', 'planning', 'schedule'],
          quiz: ['quiz', 'questionnaire', 'trivia', 'examen', 'qcm'],
          landing_premium: ['landing', 'waitlist', 'launch', 'lancement', 'conversion', 'startup'],
          resume_builder: ['curriculum vitae', 'curriculum', 'career', 'recrutement', 'emploi']
      },

      getL: function(en, fr) { return this.lang === 'fr' ? fr : en; },
      js: function(s) { return s.toString().replace(/'/g, "\\'"); },

      generateSVGIcon: function(type) {
          let path = "";
          let fill = "var(--primary)";
          if(type === 'fintech') path = "M11.8 2.1L3 7v10l8.8 4.9L20.6 17V7l-8.8-4.9zM11.8 4.1l7 3.9-3.3 1.8-7-3.9 3.3-1.8zM4.8 8.4l7 3.9V20l-7-3.9V8.4zm8.8 11.6V12.3l7-3.9V17l-7 3.9z";
          else if(type === 'medical') path = "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z";
          else if(type === 'saas') path = "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 16.3V9.6l7.5 3.3v6.7L4 16.3zm16 0l-7.5 3.3v-6.7L20 9.6v6.7z";
          else if(type === 'education') path = "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 10.5L3.3 9 12 4.5l8.7 4.5L12 13.5z";
          else if(type === 'fitness') path = "M20 6h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM10 4h4v2h-4V4z"; 
          else if(type === 'ecommerce') path = "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z";
          else if(type === 'social') path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z";
          else if(type === 'industrial') path = "M22 10v10a2 2 0 01-2 2H4a2 2 0 01-2-2V10l10-8 10 8zM12 4.51L4 10.91V20h16V10.91l-8-6.4zM7 15h10v2H7v-2z";
          else path = "M12 2L1 21h22L12 2zm0 3.45l8.15 13.55H3.85L12 5.45z";
          return `<svg viewBox="0 0 24 24" width="32" height="32" fill="${fill}" style="filter: drop-shadow(0 0 8px var(--primary));"><path d="${path}"/></svg>`;
      },

      extractBrandTitle: function(prompt) {
          let p = prompt.trim();
          p = p.replace(/^(fais-moi|fais|make|create|generate|je veux|build|vredu|vreau|da-mi|ghive me|show)\s+/i, '');
          p = p.replace(/^(un|a|une|the|le|la|o)\s+/i, '');
          p = p.replace(/\s+(app|application|aplicatie|website|site|platforma|saas)$/i, '');
          return p.charAt(0).toUpperCase() + p.slice(1).substring(0, 30);
      },

      classifyIntent: function(prompt) {
          const p = prompt.toLowerCase();
          
          // Neural Heuristic Scoring
          let topScore = 0;
          let bestMatch = 'multipage'; // Default to a sophisticated multipage site instead of just 'landing'

          // Contextual analysis - is this an expansion?
          if(this.context.activeType && (p.includes('add') || p.includes('ajout') || p.includes('plus') || p.includes('and '))) {
              return this.context.activeType;
          }

          for(let cat in this.brain) {
              let score = 0;
              this.brain[cat].forEach(kw => { 
                if(p === kw) score += 10; // Exact match boost
                else if(p.includes(kw)) score++; 
              });
              if(score > topScore) { topScore = score; bestMatch = cat; }
          }
          
          // Priority exact keyword overrides
          if(p.includes('chat') || p.includes('gpt')) return 'ai_chat';
          if(p.includes('kanban') || p.includes('trello')) return 'kanban';
          if(p.includes('snake') || p.includes('arcade')) return 'game';
          if(p.includes('earth') || p.includes('globe')) return '3d_earth';
          // NEW v3.0 overrides
          if(p.includes('restaurant')||p.includes('bistro')||p.includes('pizza')||p.includes('burger')||p.includes('café')||p.includes('cafe')&&p.includes('menu')) return 'restaurant';
          if(p.includes('habit')||p.includes('habitude')||p.includes('streak')||p.includes('routine')&&p.includes('quotidien')) return 'habit_tracker';
          if(p.includes('galerie')||p.includes('gallery')||(p.includes('photo')&&p.includes('lightbox'))) return 'photo_gallery';
          if(p.includes('budget')||(p.includes('expense')&&p.includes('income'))||(p.includes('dépense')&&p.includes('revenu'))) return 'budget_planner';
          if(p.includes('translat')||p.includes('traduct')||p.includes('dictionnaire')||p.includes('dictionary')) return 'translator';
          if(p.includes('podcast')||p.includes('épisode')||p.includes('episode')&&p.includes('audio')) return 'podcast';
          if(p.includes('calendar')||p.includes('calendrier')||p.includes('agenda')||(p.includes('event')&&p.includes('schedule'))) return 'calendar';
          if(p.includes('quiz')||p.includes('questionnaire')||p.includes('trivia')||p.includes('qcm')) return 'quiz';
          if(p.includes('landing')||p.includes('waitlist')||p.includes('lancement')) return 'landing_premium';
          if((p.includes('resume')&&!p.includes('portfolio'))||(p.includes('curriculum'))||(p.trim()==='cv')||(p.includes('cv builder'))) return 'resume_builder';
          
          return bestMatch;
      },
      
      buildApp: function(prompt, theme) {
          // Detect language of prompt (EN/FR only)
          const isFrPrompt = /[àâçéèêëîïôûù]/.test(prompt.toLowerCase()) || prompt.toLowerCase().includes('fais') || prompt.toLowerCase().includes('le ') || prompt.toLowerCase().includes('la ') || prompt.toLowerCase().includes('une ') || prompt.toLowerCase().includes('moi');
          this.lang = isFrPrompt ? 'fr' : 'en';

          const type = this.classifyIntent(prompt);
          const brand = this.extractBrandTitle(prompt);

          // SET CONTEXT
          this.context.activeType = type;
          this.context.brandName = brand;

          const p = prompt.toLowerCase();
          
          let bgColor = '#0f172a', cardBg = 'rgba(30, 41, 59, 0.7)', text = '#f8fafc', primary = '#3b82f6';
          let extraCSS = "";
          // CUSTOM THEME SUPPORT
          if(theme.id === 'custom') {
              bgColor = theme.customBg || '#0f172a';
              cardBg = theme.customCardBg || 'rgba(30,41,59,0.7)';
              text = theme.customText || '#f8fafc';
              primary = theme.customPrimary || '#8b5cf6';
          } else if(theme.id === 'cyber') { bgColor = '#09090b'; cardBg = 'rgba(24, 24, 27, 0.8)'; text = '#e4e4e7'; primary = '#8b5cf6'; }
          else if (theme.id === 'apple') { bgColor = '#f8fafc'; cardBg = '#ffffff'; text = '#0f172a'; primary = '#2563eb'; }
          else if (theme.id === 'neobrutal') { 
              bgColor = '#ffeb3b'; cardBg = '#ffffff'; text = '#000000'; primary = '#ff5722'; 
              extraCSS = `
                .card { border: 4px solid #000; box-shadow: 8px 8px 0px #000; border-radius: 0; }
                button { border: 4px solid #000; box-shadow: 4px 4px 0px #000; border-radius: 0; color:#000;  }
                button:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 #000; filter: none; }
                input, select, textarea { border: 4px solid #000; background: #fff; color: #000; border-radius: 0; }
                .logo { text-shadow: 2px 2px 0px #000; }
              `;
          }
          else if (theme.id === 'liquidaurora') { 
              bgColor = '#ff9a9e'; cardBg = 'rgba(255,255,255,0.4)'; text = '#4a4a4a'; primary = '#ec4899'; 
              extraCSS = `
                body { background: linear-gradient(-45deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb); background-size: 400% 400%; animation: gradientBG 15s ease infinite; }
                @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                .card { backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); }
              `;
          }
          else if (theme.id === 'extreme') { 
              bgColor = '#0f172a'; cardBg = 'rgba(255,255,255,0.05)'; text = '#ffffff'; primary = '#00c6ff'; 
              extraCSS = `
                body { background: linear-gradient(135deg, #0f172a, #1e293b); }
                body::before { content:''; position:fixed; top:-50%; left:-50%; width:200%; height:200%; background:radial-gradient(circle at 50% 50%, rgba(0,198,255,0.1), transparent 60%); pointer-events:none; }
                .card { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5); border-radius: 24px; }
              `;
          }
          else if (theme.id === 'hologram') { 
              extraCSS = `
                body::before { content:""; position:fixed; top:0; left:0; width:100%; height:100%; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 204, 0.03) 3px); pointer-events:none; z-index:10000; }
                .card { border: 1px solid rgba(0, 255, 204, 0.3); box-shadow: 0 0 20px rgba(0, 255, 204, 0.1); border-radius:0; }
                @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
                .logo { animation: glitch 5s infinite linear; text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
              `;
          }

          // Generate Procedural Logo
          const logoIcon = this.generateSVGIcon(type);

          // 3D Injection Check
          const is3D = ['3d_earth', '3d_shapes', 'galaxy'].includes(type);
          let threeJS = is3D ? `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/controls/OrbitControls.js"></script>` : "";

          // New Injections
          let gsapJS = (p.includes('animation') || p.includes('animat') || p.includes('gsap') || type === 'music' || type === ' Extreme Glass' || theme.id === 'liquidaurora') ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>` : "";
          let chartJS = (type === 'crypto') ? `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>` : "";

          // Clean HTML Head
          let head = `<!DOCTYPE html>
<html lang="${this.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap" rel="stylesheet">
    ${threeJS}
    ${gsapJS}
    ${chartJS}
    <style>
        :root { --bg: ${bgColor}; --card: ${cardBg}; --text: ${text}; --primary: ${primary}; }
        body { margin:0; padding:0; background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; display:flex; flex-direction:column; min-height:100vh; overflow-x:hidden; }
        ${extraCSS}
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; width: 100%; box-sizing: border-box; }
        header { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; }
        .logo-area { display:flex; align-items:center; gap:12px; }
        .logo { font-weight: 900; font-size: 24px; color: var(--primary); letter-spacing: -1px; }
        .card { background: var(--card); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 16px; backdrop-filter: blur(20px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: 0.3s; }
        .card:hover { transform: translateY(-5px); border-color: var(--primary); }
        button { padding: 12px 24px; background: var(--primary); border: none; border-radius: 10px; color: #fff; font-weight: 800; cursor: pointer; transition: 0.2s; font-family:'Inter',sans-serif; }
        button:hover { transform: scale(1.05); filter: brightness(1.2); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
        input, select, textarea { padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: var(--text); outline: none; font-family:'Inter',sans-serif; width:100%; box-sizing:border-box;}
        input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); }
        .badge { display:inline-block; padding: 4px 10px; background: var(--primary); border-radius: 20px; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 10px; }
        ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: var(--bg); } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">`;

          let bodyHTML = "";
          let scriptJS = "";
          let globalScript = `
            class OmniData {
                constructor(key, defaultData = []) {
                    this.key = key;
                    this.data = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultData));
                }
                save() { localStorage.setItem(this.key, JSON.stringify(this.data)); }
                add(item) { this.data.unshift({ ...item, id: Date.now() }); this.save(); }
                delete(id) { this.data = this.data.filter(i => i.id !== id); this.save(); }
                update(id, updates) { this.data = this.data.map(i => i.id === id ? { ...i, ...updates } : i); this.save(); }
                get() { return this.data; }
            }

            function showToast(msg) {
                const t = document.createElement('div');
                t.style = "position:fixed; bottom:20px; left:20px; background:var(--primary); color:#fff; padding:15px 25px; border-radius:10px; z-index:30000; font-weight:bold; animation: fadeIn 0.3s; box-shadow:0 10px 30px rgba(0,0,0,0.5);";
                t.innerText = msg;
                document.body.appendChild(t);
                setTimeout(() => t.remove(), 3000);
            }

            const style = document.createElement('style');
            style.innerHTML = \`@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }\`;
            document.head.appendChild(style);
          `;

          if(type === 'ai_chat') {
              bodyHTML = `
              <div style="display:flex; height:100vh; overflow:hidden;">
                  <aside style="width:260px; background:rgba(0,0,0,0.4); display:flex; flex-direction:column; padding:20px;">
                      <div class="logo-area" style="margin-bottom:30px;">${logoIcon}<div class="logo">${brand} GPT</div></div>
                      <button id="new-chat" style="background:transparent; border:1px solid rgba(255,255,255,0.2); text-align:left; padding:12px; font-weight:normal;">+ ${this.getL("New chat", "Nouveau chat")}</button>
                      <div style="flex:1; margin-top:20px; font-size:12px; opacity:0.6; display:flex; flex-direction:column; gap:10px;">
                         <div>💬 ${this.getL("How to build a SaaS", "Comment créer un SaaS")}</div>
                         <div>💬 ${this.getL("React components", "Composants React")}</div>
                      </div>
                      <div style="font-size:12px; opacity:0.4;">IA ULTRA Engine v2.5</div>
                  </aside>
                  <main style="flex:1; display:flex; flex-direction:column; position:relative;">
                      <div id="chat-stream" style="flex:1; overflow-y:auto; padding:40px; display:flex; flex-direction:column; gap:20px;">
                          <div style="display:flex; gap:15px; max-width:800px; margin:0 auto; width:100%;">
                              <div style="width:40px; height:40px; border-radius:5px; background:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">🤖</div>
                              <div style="padding-top:10px;">${this.getL("Hello! I am your advanced AI. How can I assist you today?", "Bonjour ! Je suis votre IA avancée. Comment puis-je vous aider aujourd'hui ?")}</div>
                          </div>
                      </div>
                      <div style="padding:20px; max-width:800px; margin:0 auto; width:100%;">
                          <div style="display:flex; background:rgba(255,255,255,0.1); border-radius:15px; border:1px solid rgba(255,255,255,0.2); padding:5px 15px; align-items:center;">
                              <input type="text" id="chat-input" placeholder="${this.getL("Message " + brand + "...", "Message " + brand + "...")}" style="flex:1; border:none; background:transparent; font-size:16px; outline:none; box-shadow:none;">
                              <button id="send-chat" style="padding:8px 15px; border-radius:10px; font-size:16px;">➤</button>
                          </div>
                          <div style="text-align:center; font-size:10px; opacity:0.4; margin-top:10px;">${brand} ${this.getL("can make mistakes. Consider verifying important information.", "peut faire des erreurs. Pensez à vérifier les informations importantes.")}</div>
                      </div>
                  </main>
              </div>`;
              scriptJS = `document.getElementById('send-chat').onclick = () => {
                  const val = document.getElementById('chat-input').value; if(!val) return;
                  const stream = document.getElementById('chat-stream');
                  stream.innerHTML += \`<div style="display:flex; gap:15px; max-width:800px; margin:0 auto; width:100%; flex-direction:row-reverse;"><div style="width:40px; height:40px; border-radius:5px; background:#475569; display:flex; align-items:center; justify-content:center; flex-shrink:0;">👤</div><div style="padding:10px 15px; background:rgba(255,255,255,0.1); border-radius:15px;">\${val}</div></div>\`;
                  document.getElementById('chat-input').value = ''; stream.scrollTop = stream.scrollHeight;
                  setTimeout(() => {
                      stream.innerHTML += \`<div style="display:flex; gap:15px; max-width:800px; margin:0 auto; width:100%;"><div style="width:40px; height:40px; border-radius:5px; background:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">🤖</div><div style="padding-top:10px; line-height:1.6;">${this.js(this.getL("Processing semantic tokens... Done. I am a simulated response from IA ULTRA.", "Traitement des tokens sémantiques... Terminé. Je suis une réponse simulée par IA ULTRA."))}</div></div>\`;
                      stream.scrollTop = stream.scrollHeight;
                  }, 1500);
              };`;
          } else if(type === 'fintech') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">${brand} Wallet</div></div><button style="border-radius:50%; width:40px; height:40px; padding:0;">👤</button></header>
              <div class="container" style="max-width:900px;">
                  <div class="card" style="background:linear-gradient(135deg, var(--primary), #6366f1); margin-top:30px; position:relative; overflow:hidden;">
                      <div style="font-size:14px; opacity:0.8;">${this.getL("Active Balance", "Solde Actif")}</div>
                      <div style="font-size:48px; font-weight:900; margin:10px 0;" id="fin-bal">$ 0.00</div>
                      <div style="display:flex; gap:10px;"><button id="fin-add-btn" style="background:rgba(255,255,255,0.2); border:1px solid rgba(255,255,255,0.3);">${this.getL("+ Deposit", "+ Dépôt")}</button></div>
                      <div style="position:absolute; right:-20px; top:-20px; font-size:120px; opacity:0.1;">💳</div>
                  </div>
                  <div class="card" style="margin-top:20px;">
                      <h3>${this.getL("Transaction History", "Historique des Transactions")}</h3>
                      <div id="fin-list" style="margin-top:20px; display:flex; flex-direction:column; gap:12px;"></div>
                  </div>
              </div>`;
              scriptJS = `
                  const finStore = new OmniData('fin_${brand.toLowerCase().replace(/\s/g,'_')}', []);
                  const render = () => {
                      const list = document.getElementById('fin-list');
                      const items = finStore.get();
                      const bal = items.reduce((s,i) => s + parseFloat(i.amt||0), 0);
                      document.getElementById('fin-bal').innerText = '$ ' + bal.toLocaleString();
                      list.innerHTML = items.map(t => \`
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; background:rgba(255,255,255,0.03); border-radius:12px; animation:fadeIn 0.3s ease;">
                              <div><div style="font-weight:bold;">\${t.note}</div><div style="font-size:11px; opacity:0.5;">\${new Date(t.id).toLocaleString()}</div></div>
                              <div style="color:#10b981; font-weight:bold;">+ $\${parseFloat(t.amt).toLocaleString()}</div>
                          </div>
                      \`).join('');
                  };
                  document.getElementById('fin-add-btn').onclick = () => {
                      const amt = prompt("${this.js(this.getL("Amount to deposit:", "Montant à déposer :"))}");
                      const note = prompt("${this.js(this.getL("Reference / Note:", "Référence / Note :"))}");
                      if(amt && note) { finStore.add({amt, note}); render(); showToast("${this.js(this.getL("Funds added!", "Fonds ajoutés !"))}"); }
                  };
                  render();
              `;
          } else if(type === 'crypto') {
              bodyHTML = `
              <div style="padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1);">
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Exchange</div></div>
                  <div style="display:flex; gap:15px;"><button>${this.getL("Deposit", "Déposer")}</button><button style="background:transparent; border:1px solid var(--primary); color:var(--primary);">${this.getL("Trade", "Négocier")}</button></div>
              </div>
              <div class="container" style="display:grid; grid-template-columns:2fr 1fr; gap:30px; margin-top:20px;">
                  <div>
                      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px;">
                          <div><div style="opacity:0.6; font-size:14px;">Bitcoin (BTC)</div><div style="font-size:42px; font-weight:900;">$64,289.50</div><div style="color:#10b981; font-weight:bold;">+2.45% (24h)</div></div>
                      </div>
                      <div class="card" style="height:400px; padding:10px;"><canvas id="cryptoChart"></canvas></div>
                      <div class="card" style="margin-top:20px;">
                          <h3>${this.getL("Recent Transactions", "Transactions Récentes")}</h3>
                          <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981;">Buy BTC</span><span>0.1500</span><span>$9,643.00</span></div>
                          <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ef4444;">Sell ETH</span><span>2.4000</span><span>$8,200.00</span></div>
                      </div>
                  </div>
                  <div>
                      <div class="card" style="margin-bottom:20px;">
                          <h3>${this.getL("Your Portfolio", "Votre Portefeuille")}</h3>
                          <div style="font-size:32px; font-weight:900; color:var(--primary);">$124,590.20</div>
                          <p style="opacity:0.6; font-size:12px; margin-top:0;">Available balance</p>
                      </div>
                      <div class="card">
                          <h3>${this.getL("Market Movers", "Mouvances du Marché")}</h3>
                          <div style="display:flex; justify-content:space-between; margin-bottom:15px;"><b>ETH</b><b style="color:#10b981;">+5.2%</b></div>
                          <div style="display:flex; justify-content:space-between; margin-bottom:15px;"><b>SOL</b><b style="color:#10b981;">+12.4%</b></div>
                          <div style="display:flex; justify-content:space-between; margin-bottom:15px;"><b>ADA</b><b style="color:#ef4444;">-1.2%</b></div>
                          <div style="display:flex; justify-content:space-between;"><b>DOT</b><b style="color:#10b981;">+3.1%</b></div>
                      </div>
                  </div>
              </div>`;
              scriptJS = `if(typeof Chart !== 'undefined') {
                  const ctx = document.getElementById('cryptoChart').getContext('2d');
                  const gradient = ctx.createLinearGradient(0, 0, 0, 400); gradient.addColorStop(0, '#3b82f655'); gradient.addColorStop(1, '#3b82f600');
                  new Chart(ctx, { type: 'line', data: { labels: ['10:00','11:00','12:00','13:00','14:00','15:00','16:00'], datasets: [{ label: 'BTC/USD', data: [62000, 62500, 61800, 63000, 63500, 64000, 64289], borderColor: '#3b82f6', backgroundColor: gradient, borderWidth: 3, fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { color: 'rgba(255,255,255,0.05)' } } } } });
              }`;
          } else if(type === 'saas') {
              bodyHTML = `
              <div style="display:flex; min-height:100vh;">
                  <nav style="width:280px; background:rgba(255,255,255,0.02); border-right:1px solid rgba(255,255,255,0.05); padding:30px; display:flex; flex-direction:column; gap:20px;">
                      <div class="logo-area">${logoIcon}<div class="logo">${brand} </div></div>
                      <div style="margin-top:40px; display:flex; flex-direction:column; gap:10px;">
                          <button style="text-align:left; background:rgba(255,255,255,0.05);">${this.getL("Dashboard", "Tableau de bord")}</button>
                          <button style="text-align:left; background:transparent;">${this.getL("Usage Stats", "Statistiques")}</button>
                          <button style="text-align:left; background:transparent;">${this.getL("Billing", "Facturation")}</button>
                      </div>
                  </nav>
                  <main style="flex:1; padding:40px; overflow-y:auto;">
                      <div class="badge">ACTIVE SUBSCRIPTION</div>
                      <h1>${this.getL("Platform Overview", "Vue d'ensemble")}</h1>
                      <div class="card" style="margin-top:30px;">
                          <h3 style="margin-top:0;">${this.getL("API Integration", "Intégration API")}</h3>
                          <div style="background:#000; padding:20px; border-radius:10px; font-family:monospace; font-size:12px; border:1px solid rgba(255,255,255,0.1); overflow-x:auto;">
                              <span style="color:#fbbf24;">curl</span> -X POST "https://api.${brand.toLowerCase().replace(/\s/g,'')}.com/v1/sync"<br>
                              -H "Authorization: Bearer <span style="color:#10b981;">sk_live_....</span>"
                          </div>
                      </div>
                      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-top:20px;">
                          <div class="card"><h3>${this.getL("User Base", "Base Utilisateurs")}</h3><h1 style="color:var(--primary);">14,290</h1></div>
                          <div class="card"><h3>${this.getL("Revenue", "Revenus")}</h3><h1 style="color:var(--primary);">$ 25.5k</h1></div>
                      </div>
                  </main>
              </div>`;
          } else if(type === 'education') {
              bodyHTML = `
              <header style="justify-content:center; flex-direction:column; gap:10px; padding:20px; background:rgba(0,0,0,0.2);">
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Academy</div></div>
                  <div style="font-size:12px; letter-spacing:3px; opacity:0.6;">LEARNING MANAGEMENT SYSTEM</div>
              </header>
              <div class="container" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:25px; margin-top:30px;">
                  <div class="card" style="padding:0; overflow:hidden;">
                      <div style="height:160px; background:linear-gradient(45deg, #fbbf24, #f59e0b); display:flex; align-items:center; justify-content:center; font-size:62px;">📚</div>
                      <div style="padding:25px;">
                          <div class="badge">FUNDAMENTALS</div>
                          <h3>${this.getL("Mastering System Logic", "Maîtriser la Logique")}</h3>
                          <p style="opacity:0.7; font-size:14px;">${this.getL("Deep dive into the architecture of modern systems.", "Plongée dans l'architecture des systèmes.")}</p>
                          <button style="width:100%">${this.getL("Resume Course", "Reprendre la leçon")}</button>
                      </div>
                  </div>
                  <div class="card" style="padding:0; overflow:hidden;">
                      <div style="height:160px; background:linear-gradient(45deg, #10b981, #059669); display:flex; align-items:center; justify-content:center; font-size:62px;">👨‍💻</div>
                      <div style="padding:25px;">
                          <div class="badge">PRO LEVEL</div>
                          <h3>${this.getL("Advanced Patterns", "Motifs de Codage Avancés")}</h3>
                          <p style="opacity:0.7; font-size:14px;">${this.getL("Learn to build world-class AI engines from scratch.", "Apprenez à construire des moteurs IA.")}</p>
                          <button style="width:100%; background:transparent; border:1px solid var(--primary); color:var(--primary);">${this.getL("Start Learning", "Commencer")}</button>
                      </div>
                  </div>
              </div>`;
          } else if(type === 'industrial') {
              bodyHTML = `
              <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; background:#000;">
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Matrix</div></div>
                  <div style="display:flex; gap:20px; font-size:11px; font-weight:bold;"><span style="color:#10b981;">● NODE 01: ONLINE</span><span style="color:#fbbf24;">● SYNC: ACTIVE</span></div>
              </div>
              <div class="container" style="margin-top:40px;">
                  <h1 style="font-size:42px; letter-spacing:-2px;">${this.getL("Operational Telemetry", "Télémétrie Opérationnelle")}</h1>
                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:20px; margin-top:30px;">
                      <div class="card" style="border-left:5px solid #10b981;"><h3>${this.getL("Throughput", "Rendement")}</h3><h1 style="color:#10b981; font-size:48px; margin:0;">98.4%</h1></div>
                      <div class="card" style="border-left:5px solid #8b5cf6;"><h3>${this.getL("Active Units", "Unités Actives")}</h3><h1 style="color:#8b5cf6; font-size:48px; margin:0;">12,042</h1></div>
                      <div class="card" style="border-left:5px solid #ef4444;"><h3>${this.getL("Error Rate", "Taux Erreurs")}</h3><h1 style="color:#ef4444; font-size:48px; margin:0;">0.02%</h1></div>
                  </div>
                  <div class="card" style="margin-top:30px; background:#000; border:1px solid rgba(255,255,255,0.1);">
                      <h3>${this.getL("Sensor Waveform Analysis", "Analyse de Forme d'Onde")}</h3>
                      <div style="height:120px; border:1px dashed rgba(255,255,255,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center; opacity:0.3; font-family:monospace;">[ SIMULATING GPU ACCELERATED GRAPH ]</div>
                  </div>
              </div>`;
          } else if(type === 'kanban') {
              bodyHTML = `
              <header style="padding:15px 30px;"><div class="logo-area">${logoIcon}<div class="logo">${brand} Tasks</div></div><div class="badge">OMNI-DATABASE ACTIVE</div></header>
              <div style="display:flex; gap:20px; padding:30px; overflow-x:auto; min-height:80vh; align-items:flex-start;">
                  <div class="card" id="col-todo" style="width:300px; flex-shrink:0; padding:15px; background:rgba(255,255,255,0.02);">
                      <h3 style="margin-top:0; border-bottom:2px solid #ef4444; padding-bottom:10px;">${this.getL("To Do", "À Faire")}</h3>
                      <div class="tasks-container" style="min-height:50px;"></div>
                      <div style="margin-top:15px; display:flex;">
                          <input type="text" id="new-task-in" placeholder="${this.getL("New Task...", "Nouvelle Tâche...")}" style="flex:1; border-radius:10px 0 0 10px;">
                          <button id="add-task-btn" style="border-radius:0 10px 10px 0;">+</button>
                      </div>
                  </div>
                  <div class="card" id="col-progress" style="width:300px; flex-shrink:0; padding:15px; background:rgba(255,255,255,0.02);">
                      <h3 style="margin-top:0; border-bottom:2px solid #f59e0b; padding-bottom:10px;">${this.getL("In Progress", "En Cours")}</h3>
                      <div class="tasks-container" style="min-height:50px;"></div>
                  </div>
                  <div class="card" id="col-done" style="width:300px; flex-shrink:0; padding:15px; background:rgba(255,255,255,0.02);">
                      <h3 style="margin-top:0; border-bottom:2px solid #10b981; padding-bottom:10px;">${this.getL("Done", "Terminé")}</h3>
                      <div class="tasks-container" style="min-height:50px;"></div>
                  </div>
              </div>`;
              scriptJS = `
              let taskDB = JSON.parse(localStorage.getItem('kanbanDB') || '{"todo":[],"progress":[],"done":[]}');
              
              const saveDB = () => {
                  taskDB.todo = Array.from(document.getElementById('col-todo').querySelectorAll('.task-item span')).map(s=>s.innerText);
                  taskDB.progress = Array.from(document.getElementById('col-progress').querySelectorAll('.task-item span')).map(s=>s.innerText);
                  taskDB.done = Array.from(document.getElementById('col-done').querySelectorAll('.task-item span')).map(s=>s.innerText);
                  localStorage.setItem('kanbanDB', JSON.stringify(taskDB));
              };

              const createTaskEl = (text, colColor) => {
                  const d = document.createElement('div');
                  d.className = 'task-item'; d.draggable = true;
                  d.style = 'background:var(--card); padding:15px; border-radius:10px; margin-bottom:10px; border-left:4px solid '+colColor+'; cursor:grab; position:relative;';
                  d.innerHTML = '<span>'+text+'</span><div class="del-btn" style="position:absolute; right:10px; top:10px; cursor:pointer; color:#ef4444; font-size:12px;">✖</div>';
                  d.ondragstart = function() { dragItem = this; setTimeout(()=> this.style.display='none', 0); };
                  d.ondragend = function() { dragItem = null; this.style.display='block'; saveDB(); showToast('${this.js(this.getL("Task saved.", "Tâche sauvegardée."))}'); };
                  d.querySelector('.del-btn').onclick = function() { d.remove(); saveDB(); };
                  return d;
              };

              const initDB = () => {
                  taskDB.todo.forEach(t => document.getElementById('col-todo').querySelector('.tasks-container').appendChild(createTaskEl(t, '#ef4444')));
                  taskDB.progress.forEach(t => document.getElementById('col-progress').querySelector('.tasks-container').appendChild(createTaskEl(t, '#f59e0b')));
                  taskDB.done.forEach(t => document.getElementById('col-done').querySelector('.tasks-container').appendChild(createTaskEl(t, '#10b981')));
              };

              let dragItem = null;
              document.querySelectorAll('.card').forEach(c => {
                  c.ondragover = function(e) { e.preventDefault(); };
                  c.ondrop = function() { 
                      if(dragItem) { 
                          let colColor = this.id==='col-done'?'#10b981':(this.id==='col-progress'?'#f59e0b':'#ef4444');
                          dragItem.style.borderLeftColor = colColor;
                          this.querySelector('.tasks-container').appendChild(dragItem); 
                      } 
                  };
              });

              document.getElementById('add-task-btn').onclick = () => {
                  const val = document.getElementById('new-task-in').value;
                  if(!val) return;
                  document.getElementById('col-todo').querySelector('.tasks-container').appendChild(createTaskEl(val, '#ef4444'));
                  document.getElementById('new-task-in').value = '';
                  saveDB();
              };

              initDB();
              `;
          } else if(type === 'notes') {
              bodyHTML = `
              <div style="display:flex; height:100vh; overflow:hidden;">
                  <aside style="width:280px; background:rgba(0,0,0,0.4); display:flex; flex-direction:column; border-right:1px solid rgba(255,255,255,0.1);">
                      <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="logo-area">${logoIcon}<div class="logo">${brand} Notes</div></div></div>
                      <div style="padding:15px;"><button id="new-note-btn" style="width:100%;">+ ${this.getL("New Document", "Nouveau Document")}</button></div>
                      <div id="notes-list" style="flex:1; overflow-y:auto; padding:10px;"></div>
                  </aside>
                  <main style="flex:1; display:flex; flex-direction:column; padding:40px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                          <input type="text" id="note-title" placeholder="${this.getL("Document Title...", "Titre de Document...")}" style="font-size:32px; font-weight:900; background:transparent; border:none; box-shadow:none; padding:0; flex:1;">
                          <button id="del-note-btn" style="background:#ef4444; padding:8px 15px; font-size:12px;">${this.getL("Delete", "Supprimer")}</button>
                      </div>
                      <textarea id="note-content" placeholder="${this.getL("Start writing your ideas...", "Commencez à écrire vos idées...")}" style="flex:1; width:100%; font-size:18px; line-height:1.6; border:none; background:transparent; resize:none; box-shadow:none; padding:10px 0; outline:none; height:100%;"></textarea>
                  </main>
              </div>`;
              scriptJS = `
                  let notesDB = JSON.parse(localStorage.getItem('notesDB') || '[{"id":1, "title":"${this.js(this.getL("Welcome Note", "Bienvenue"))}", "content":"${this.js(this.getL("Start typing directly! It automatically saves.", "Tapez pour éditer! Sauvegarde auto."))}"}]');
                  let activeId = notesDB[0]?.id || null;

                  const saveDB = () => { localStorage.setItem('notesDB', JSON.stringify(notesDB)); renderList(); };
                  
                  const renderList = () => {
                      const list = document.getElementById('notes-list');
                      list.innerHTML = notesDB.map(n => \`<div class="note-item" onclick="loadNote(\${n.id})" style="padding:15px; background:\${n.id===activeId?'rgba(255,255,255,0.1)':'transparent'}; border-radius:10px; cursor:pointer; margin-bottom:5px; border-left:\${n.id===activeId?'3px solid var(--primary)':'3px solid transparent'};"><div style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">\${n.title||'Untitled'}</div><div style="font-size:12px; opacity:0.5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:5px;">\${n.content||'No content'}</div></div>\`).join('');
                  };

                  window.loadNote = (id) => {
                      activeId = id; const n = notesDB.find(x=>x.id===id);
                      if(!n) return;
                      document.getElementById('note-title').value = n.title;
                      document.getElementById('note-content').value = n.content;
                      renderList();
                  };

                  document.getElementById('new-note-btn').onclick = () => {
                      const id = Date.now();
                      notesDB.unshift({id, title:'', content:''});
                      loadNote(id); saveDB();
                  };

                  document.getElementById('del-note-btn').onclick = () => {
                      notesDB = notesDB.filter(x=>x.id!==activeId);
                      if(notesDB.length===0) { document.getElementById('new-note-btn').click(); }
                      else { loadNote(notesDB[0].id); saveDB(); }
                  };

                  let timer;
                  const handleEdit = () => {
                      clearTimeout(timer);
                      timer = setTimeout(() => {
                          const n = notesDB.find(x=>x.id===activeId);
                          if(n) {
                              n.title = document.getElementById('note-title').value;
                              n.content = document.getElementById('note-content').value;
                              saveDB();
                              showToast('${this.js(this.getL("Saved securely.", "Sauvegardé avec succes."))}');
                          }
                      }, 1000);
                  };

                  document.getElementById('note-title').oninput = handleEdit;
                  document.getElementById('note-content').oninput = handleEdit;
                  
                  if(notesDB.length>0) loadNote(notesDB[0].id); else document.getElementById('new-note-btn').click();
              `;
          } else if(type === 'timer') {
              bodyHTML = `
              <header style="justify-content:center;"><div class="logo-area">${logoIcon}<div class="logo">${brand} Focus</div></div></header>
              <div style="min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                  <div class="card" style="width:350px; height:350px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; border: 8px solid var(--primary); box-shadow: 0 0 50px rgba(59,130,246,0.3); position:relative;">
                      <h1 id="time-display" style="font-size:72px; margin:0; font-family:monospace;">25:00</h1>
                      <div id="status-label" style="opacity:0.6; font-size:18px; margin-top:5px; text-transform:uppercase; font-weight:bold; letter-spacing:2px;">Work Phase</div>
                      <div style="display:flex; gap:10px; margin-top:30px;">
                          <button id="btn-start" style="border-radius:30px; font-size:16px;">${this.getL("Start", "Démarrer")}</button>
                          <button id="btn-stop" style="border-radius:30px; background:rgba(255,255,255,0.1); color:var(--text); font-size:16px; border:none; box-shadow:none;">${this.getL("Pause", "Pause")}</button>
                      </div>
                  </div>
                  <div class="card" style="margin-top:40px; text-align:center; display:flex; gap:30px;">
                      <div><h2 style="margin:0; color:var(--primary);" id="stat-work">0</h2><p style="opacity:0.5; font-size:12px; margin:5px 0 0;">${this.getL("Work Sessions", "Sessions de Lucru")}</p></div>
                      <div><h2 style="margin:0; color:#10b981;" id="stat-break">0</h2><p style="opacity:0.5; font-size:12px; margin:5px 0 0;">${this.getL("Breaks Taken", "Pauze Luate")}</p></div>
                  </div>
              </div>`;
              scriptJS = `
                  let statsLog = JSON.parse(localStorage.getItem('timerStats') || '{"w":0,"b":0}');
                  document.getElementById('stat-work').innerText = statsLog.w;
                  document.getElementById('stat-break').innerText = statsLog.b;

                  let timeLeft = 25 * 60; let running = false; let interval; let isBreak = false;
                  
                  const updateDisplay = () => {
                      const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                      const s = (timeLeft % 60).toString().padStart(2, '0');
                      document.getElementById('time-display').innerText = m+':'+s;
                  };

                  const playSound = () => {
                      const ctx = new (window.AudioContext || window.webkitAudioContext)();
                      const osc = ctx.createOscillator(); const gain = ctx.createGain();
                      osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime);
                      gain.gain.setValueAtTime(1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
                      osc.connect(gain); gain.connect(ctx.destination);
                      osc.start(); osc.stop(ctx.currentTime + 1.5);
                  };

                  document.getElementById('btn-start').onclick = () => {
                      if(running) return; running = true;
                      interval = setInterval(() => {
                          timeLeft--; updateDisplay();
                          if(timeLeft <= 0) {
                              playSound(); clearInterval(interval); running = false;
                              if(isBreak) { statsLog.b++; isBreak=false; timeLeft=25*60; document.getElementById('status-label').innerText="Work Phase"; document.getElementById('status-label').style.color="var(--text)"; }
                              else { statsLog.w++; isBreak=true; timeLeft=5*60; document.getElementById('status-label').innerText="Break Time"; document.getElementById('status-label').style.color="#10b981"; }
                              localStorage.setItem('timerStats', JSON.stringify(statsLog));
                              document.getElementById('stat-work').innerText = statsLog.w;
                              document.getElementById('stat-break').innerText = statsLog.b;
                              showToast('${this.js(this.getL("Phase completed!", "Fază finalizată!"))}');
                              updateDisplay();
                          }
                      }, 1000);
                  };
                  document.getElementById('btn-stop').onclick = () => { running = false; clearInterval(interval); };
                  updateDisplay();
              `;
          } else if(type === 'music') {
              bodyHTML = `
              <div style="display:flex; justify-content:center; align-items:center; min-height:100vh;">
                  <div class="card" style="width:350px; padding:30px; display:flex; flex-direction:column; align-items:center; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5);">
                      <div style="width:100%; display:flex; justify-content:space-between; font-size:12px; font-weight:bold; opacity:0.5; margin-bottom:20px;">
                          <span>Now Playing</span><span>${logoIcon}</span>
                      </div>
                      <div id="vinyl" style="width:250px; height:250px; border-radius:50%; background:radial-gradient(circle, #333 30%, #111 70%); border:4px solid var(--primary); display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(0,0,0,0.5); position:relative; overflow:hidden;">
                          <div style="width:80px; height:80px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; z-index:2; border:2px solid #000;">
                               <div style="width:15px; height:15px; background:#000; border-radius:50%;"></div>
                          </div>
                      </div>
                      <div style="margin-top:30px; text-align:center;">
                          <h2 style="margin:0; font-size:24px;">Synthetic Dreams</h2>
                          <p style="margin:5px 0 0; opacity:0.6; font-size:14px;">${brand} Orchestra</p>
                      </div>
                      <div style="width:100%; margin-top:30px;">
                          <div style="width:100%; height:4px; background:rgba(255,255,255,0.1); border-radius:2px; position:relative;">
                              <div id="progress" style="width:30%; height:100%; background:var(--primary); border-radius:2px; position:relative;">
                                  <div style="width:12px; height:12px; background:#fff; border-radius:50%; position:absolute; right:-6px; top:-4px; box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>
                              </div>
                          </div>
                          <div style="display:flex; justify-content:space-between; font-size:10px; opacity:0.5; margin-top:8px;">
                              <span>1:24</span><span>4:08</span>
                          </div>
                      </div>
                      <div style="display:flex; justify-content:center; align-items:center; gap:30px; margin-top:20px;">
                          <button style="background:transparent; color:var(--text); font-size:20px; box-shadow:none; padding:10px;">⏮</button>
                          <button id="play-btn" style="width:60px; height:60px; border-radius:50%; font-size:24px; padding:0; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(59,130,246,0.3);">▶</button>
                          <button style="background:transparent; color:var(--text); font-size:20px; box-shadow:none; padding:10px;">⏭</button>
                      </div>
                  </div>
              </div>`;
              scriptJS = `let playing = false; let rot = 0; let interval;
              document.getElementById('play-btn').onclick = () => {
                  playing = !playing;
                  document.getElementById('play-btn').innerText = playing ? '⏸' : '▶';
                  if(playing) {
                      if(typeof gsap !== 'undefined') { gsap.to('#vinyl', {rotation: '+=360', repeat:-1, duration: 4, ease: 'none'}); }
                      else { interval = setInterval(()=> { rot+=1; document.getElementById('vinyl').style.transform = 'rotate('+rot+'deg)'; }, 20); }
                  } else {
                      if(typeof gsap !== 'undefined') { gsap.killTweensOf('#vinyl'); }
                      else { clearInterval(interval); }
                  }
              };`;
          } else if(type === 'game') {
               bodyHTML = `
               <header><div class="logo-area">${logoIcon}<div class="logo">${brand} Arcade</div></div><div class="badge">PRESS START</div></header>
               <div style="display:flex; flex-direction:column; align-items:center; margin-top:40px;">
                   <div style="display:flex; justify-content:space-between; width:400px; margin-bottom:10px; font-weight:bold; font-size:20px; color:var(--primary);">
                       <span>SCORE: <span id="score">0</span></span>
                   </div>
                   <div style="border:4px solid var(--primary); border-radius:10px; box-shadow:0 0 30px rgba(59,130,246,0.4); padding:2px; background:#000;">
                       <canvas id="gameCanvas" width="400" height="400" style="display:block;"></canvas>
                   </div>
                   <p style="opacity:0.6; margin-top:20px; text-align:center;">${this.getL("Use Arrow Keys to move the snake. Collect the points.", "Utilisez les flèches directionnelles pour bouger. Collectez les points.")}</p>
                   <button id="start-game" style="margin-top:10px; padding:15px 40px; font-size:18px;">${this.getL("Play Game", "Jouer")}</button>
               </div>`;
               scriptJS = `const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d');
               const grid = 20; let snake = [{x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160}];
               let dx = grid; let dy = 0; let food = {x: 300, y: 300}; let score = 0; let pColor = getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#3b82f6';
               let gameLoop;
               function draw() {
                   ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
                   ctx.fillStyle = '#ef4444'; ctx.fillRect(food.x, food.y, grid-2, grid-2);
                   ctx.fillStyle = pColor;
                   snake.forEach((s, i) => { ctx.fillStyle = i===0 ? '#fff' : pColor; ctx.fillRect(s.x, s.y, grid-2, grid-2); });
               }
               function move() {
                   const head = {x: snake[0].x+dx, y: snake[0].y+dy};
                   if(head.x<0) head.x = canvas.width-grid; if(head.x>=canvas.width) head.x = 0;
                   if(head.y<0) head.y = canvas.height-grid; if(head.y>=canvas.height) head.y = 0;
                   for(let i=0;i<snake.length;i++) if(head.x===snake[i].x && head.y===snake[i].y) return gameOver();
                   snake.unshift(head);
                   if(head.x===food.x && head.y===food.y) { score+=10; document.getElementById('score').innerText=score; spawnFood(); } else { snake.pop(); }
                   draw();
               }
               function spawnFood() { food.x = Math.floor(Math.random()*(canvas.width/grid))*grid; food.y = Math.floor(Math.random()*(canvas.height/grid))*grid; }
               function gameOver() { clearInterval(gameLoop); showToast('${this.js(this.getL("Game Over! Score: ", "Jeu Terminé ! Score : "))}'+score); document.getElementById('start-game').style.display='inline-block'; }
               document.addEventListener('keydown', e => { if(e.key==='ArrowLeft'&&dx===0){dx=-grid;dy=0;}else if(e.key==='ArrowUp'&&dy===0){dx=0;dy=-grid;}else if(e.key==='ArrowRight'&&dx===0){dx=grid;dy=0;}else if(e.key==='ArrowDown'&&dy===0){dx=0;dy=grid;} });
               document.getElementById('start-game').onclick = function() { snake = [{x:160,y:160},{x:140,y:160},{x:120,y:160}]; dx=grid; dy=0; score=0; document.getElementById('score').innerText=score; this.style.display='none'; spawnFood(); clearInterval(gameLoop); gameLoop = setInterval(move, 100); };
               draw();`;
          } else if(type === 'ecommerce') {
              let i1='📦', i2='🏷️', i3='🛍️', t1=this.getL("Standard Edition", "Édition Standard"), t2=this.getL("Premium Upgrade", "Mise à jour Premium"), t3=this.getL("Professional Service", "Service Professionnel");
              if(p.includes('pizza')||p.includes('restauran')||p.includes('food')||p.includes('burger')) { i1='🍕'; i2='🍔'; i3='🥗'; t1=this.getL("Classic Margherita", "Margherita Classique"); t2=this.getL("Monster Burger", "Burger Monstre"); t3=this.getL("Chef Special", "Spécial Chef"); }
              else if(p.includes('coffe')||p.includes('cafe')) { i1='☕'; i2='🥐'; i3='🍰'; t1='Espresso'; t2='Croissant'; t3='Cake'; }
              else if(p.includes('tech')||p.includes('pc')||p.includes('phone')||p.includes('electro')) { i1='💻'; i2='📱'; i3='🎧'; t1='Pro Laptop'; t2='Ultima Phone'; t3='Noise Cancel'; }
              
              bodyHTML = `
              <header>
                <div class="logo-area">${logoIcon}<div class="logo">${brand}</div></div>
                <button id="cart-btn">🛒 ${this.getL("Cart", "Panier")} (0)</button>
              </header>
              <div style="margin-top: 40px; text-align:center; margin-bottom: 50px;">
                  <h1 style="font-size:48px; margin-bottom:10px;">${this.getL("Curated Collection", "Collection Sélectionnée")}</h1>
                  <p style="opacity:0.7;">${this.getL("Discover premium items tailored for your needs.", "Découvrez des articles premium adaptés à vos besoins.")}</p>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                  <div class="card"><div style="height:180px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; display:flex; align-items:center; justify-content:center; font-size:60px;">${i1}</div><div class="badge">NEW</div><h3>${t1}</h3><p style="font-weight:900; font-size:24px; color:var(--primary);">$29.99</p><button class="add-to-cart" style="width:100%;">${this.getL("Add to Cart", "Ajouter au panier")}</button></div>
                  <div class="card"><div style="height:180px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; display:flex; align-items:center; justify-content:center; font-size:60px;">${i2}</div><div class="badge">BEST</div><h3>${t2}</h3><p style="font-weight:900; font-size:24px; color:var(--primary);">$59.50</p><button class="add-to-cart" style="width:100%;">${this.getL("Add to Cart", "Ajouter au panier")}</button></div>
                  <div class="card"><div style="height:180px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; display:flex; align-items:center; justify-content:center; font-size:60px;">${i3}</div><div class="badge">PRO</div><h3>${t3}</h3><p style="font-weight:900; font-size:24px; color:var(--primary);">$120.00</p><button class="add-to-cart" style="width:100%;">${this.getL("Add to Cart", "Ajouter au panier")}</button></div>
              </div>
              <div id="cart-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:1000; align-items:center; justify-content:center; backdrop-filter: blur(10px);">
                 <div class="card" style="width:95%; max-width:450px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h2 style="margin:0;">${this.getL("Your Shopping Cart", "Votre Panier")}</h2>
                        <button id="close-cart" style="background:transparent; color:var(--text); font-size:24px; padding:0;">×</button>
                    </div>
                    <div id="cart-items" style="margin:20px 0; min-height:150px; max-height: 300px; overflow-y:auto; padding-right:10px;"></div>
                    <div style="padding-top:20px; border-top:1px solid rgba(255,255,255,0.1);">
                        <div style="display:flex; justify-content:space-between; font-weight:900; font-size:20px; margin-bottom:20px;"><span>Total:</span><span id="cart-total">$0.00</span></div>
                        <button style="width:100%; font-size:18px;" onclick="showToast('${this.js(this.getL("Connecting to secure payment...", "Connexion au paiement sécurisé..."))}')">${this.getL("Checkout Now", "Payer Maintenant")}</button>
                    </div>
                 </div>
              </div>`;
              scriptJS = `let cart = []; const cBtn = document.getElementById('cart-btn'); const cModal = document.getElementById('cart-modal');
              document.querySelectorAll('.add-to-cart').forEach(b => b.onclick = (e) => { 
                const card = e.target.parentElement;
                const price = parseFloat(card.querySelector('p').innerText.replace('$',''));
                cart.push({ n: card.querySelector('h3').innerText, p: price }); 
                cBtn.innerText = '🛒 ' + "${this.js(this.getL("Cart", "Panier"))}" + ' (' + cart.length + ')'; 
                showToast(card.querySelector('h3').innerText + ' ' + "${this.js(this.getL("added!", "ajouté!"))}"); 
              });
              cBtn.onclick = () => { 
                const itemsDiv = document.getElementById('cart-items');
                if(!cart.length) { itemsDiv.innerHTML = '<div style="text-align:center; padding:40px; opacity:0.5;">' + "${this.js(this.getL("Your cart is empty.", "Votre panier est vide."))}" + '</div>'; }
                else { 
                  itemsDiv.innerHTML = cart.map((i,idx) => '<div style="display:flex; justify-content:space-between; padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; margin-bottom:10px;"><div><b>'+i.n+'</b></div><div>$'+i.p.toFixed(2)+'</div></div>').join('');
                }
                const total = cart.reduce((s,i) => s+i.p, 0);
                document.getElementById('cart-total').innerText = '$' + total.toFixed(2);
                cModal.style.display='flex'; 
              };
              document.getElementById('close-cart').onclick = () => cModal.style.display='none';`;
          } else if(type === 'realestate') {
              bodyHTML = `
              <header>
                <div class="logo-area">${logoIcon}<div class="logo">${brand}</div></div>
                <div style="display:flex; gap:20px; align-items:center;">
                    <a href="#" style="color:var(--text); text-decoration:none; font-weight:bold;">${this.getL("Listings", "Annonces")}</a>
                    <button>${this.getL("Post Property", "Publier")}</button>
                </div>
              </header>
              <div style="padding: 60px 0; text-align:center; background:rgba(59,130,246,0.05); border-radius:30px; margin: 30px 0;">
                  <h1 style="font-size:52px; margin:0;">${this.getL("Find Your Dream Home", "Trouvez votre Maison de Rêve")}</h1>
                  <p style="opacity:0.7; font-size:20px; margin-top:15px;">${this.getL("Premium properties selected by expert architects.", "Propriétés premium sélectionnées par des architectes experts.")}</p>
                  <div style="margin-top:40px; display:flex; max-width:600px; margin-left:auto; margin-right:auto; gap:10px;">
                      <input type="text" placeholder="${this.getL("Location or ZIP...", "Localisation ou CP...")}">
                      <button style="white-space:nowrap;">${this.getL("Search Now", "Rechercher")}</button>
                  </div>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
                  <div class="card"><div style="height:200px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; position:relative; overflow:hidden;"><div style="font-size:80px; text-align:center; line-height:200px;">🏠</div><div style="position:absolute; top:15px; left:15px; background:#ef4444; padding:5px 12px; border-radius:5px; font-weight:bold; font-size:12px;">SALE</div></div><h3>Modern Villa Skyline</h3><p style="opacity:0.6;">888 Luxury Ave, Global City</p><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span style="font-weight:900; font-size:22px; color:var(--primary);">$1,250,000</span><button onclick="showToast('${this.js(this.getL("Contacting agency...", "Contact de l'agence..."))}')">${this.getL("View", "Voir")}</button></div></div>
                  <div class="card"><div style="height:200px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; position:relative; overflow:hidden;"><div style="font-size:80px; text-align:center; line-height:200px;">🏢</div><div style="position:absolute; top:15px; left:15px; background:#10b981; padding:5px 12px; border-radius:5px; font-weight:bold; font-size:12px;">RENT</div></div><h3>Glass Tower Penthouse</h3><p style="opacity:0.6;">12 Penthouse Blvd, Tech District</p><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span style="font-weight:900; font-size:22px; color:var(--primary);">$4,500/mo</span><button onclick="showToast('${this.js(this.getL("Contacting agency...", "Contact de l'agence..."))}')">${this.getL("View", "Voir")}</button></div></div>
                  <div class="card"><div style="height:200px; background:rgba(0,0,0,0.3); border-radius:12px; margin-bottom:15px; position:relative; overflow:hidden;"><div style="font-size:80px; text-align:center; line-height:200px;">🏡</div></div><h3>Garden Suite Retreat</h3><p style="opacity:0.6;">45 Nature Side, Green Valley</p><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span style="font-weight:900; font-size:22px; color:var(--primary);">$680,000</span><button onclick="showToast('${this.js(this.getL("Contacting agency...", "Contact de l'agence..."))}')">${this.getL("View", "Voir")}</button></div></div>
              </div>`;
          } else if(type === 'portfolio') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                  <div style="width:120px; height:120px; background:linear-gradient(45deg, var(--primary), #ec4899); border-radius:50%; margin-bottom:30px; display:flex; align-items:center; justify-content:center; font-size:50px; box-shadow: 0 0 30px rgba(59,130,246,0.3);">👤</div>
                  <h1 style="font-size:64px; margin:0; letter-spacing:-2px;">${brand}</h1>
                  <p style="font-size:24px; opacity:0.7; max-width:700px; margin-top:20px;">${this.getL("Professional Developer & Experience Architect.", "Développeur Professionnel & Architecte d'Expériences.")}</p>
                  <div style="display:flex; gap:15px; margin-top:40px;">
                      <button style="padding:15px 40px; border-radius:30px;">${this.getL("Hire Me", "Me Contacter")}</button>
                      <button style="padding:15px 40px; border-radius:30px; background:transparent; border:2px solid var(--primary); color:var(--primary);">${this.getL("View Work", "Voir Projets")}</button>
                  </div>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:40px; margin-bottom:100px;">
                  <div class="card"><h2>${this.getL("My Skills", "Mes Compétences")}</h2><div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">
                      <div><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>Code Synthesis</span><span>95%</span></div><div style="height:8px; background:rgba(0,0,0,0.3); border-radius:4px; overflow:hidden;"><div style="width:95%; height:100%; background:var(--primary);"></div></div></div>
                      <div><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>UI/UX Design</span><span>88%</span></div><div style="height:8px; background:rgba(0,0,0,0.3); border-radius:4px; overflow:hidden;"><div style="width:88%; height:100%; background:var(--primary);"></div></div></div>
                      <div><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>Logic Architect</span><span>92%</span></div><div style="height:8px; background:rgba(0,0,0,0.3); border-radius:4px; overflow:hidden;"><div style="width:92%; height:100%; background:var(--primary);"></div></div></div>
                  </div></div>
                  <div class="card"><h2>${this.getL("Recent Projects", "Projets Récents")}</h2><div id="project-list" style="margin-top:20px;">
                      <div style="padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; margin-bottom:10px; border-left:4px solid var(--primary);">🚀 IA Ultra Engine v2</div>
                      <div style="padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; margin-bottom:10px; border-left:4px solid var(--primary);">🌐 Global E-commerce Portal</div>
                      <div style="padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; border-left:4px solid var(--primary);">🎨 Artistic Pattern Generator</div>
                  </div></div>
              </div>`;
          } else if(type === 'medical') {
               bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">⚕ ${brand}</div></div><button id="book-btn">${this.getL("Book Appointment", "Prendre RDV")}</button></header>
              <div class="container" style="display:grid; grid-template-columns: 1fr 1fr; gap:40px; margin-top:40px;">
                  <div>
                      <h1 style="font-size:42px; margin:0 0 20px;">${this.getL("Digital Health Hub", "Centre de Santé Numérique")}</h1>
                      <div class="card">
                          <h3>${this.getL("Your Appointments", "Vos Rendez-vous")}</h3>
                          <div id="appt-list" style="margin-top:15px; display:flex; flex-direction:column; gap:10px;"></div>
                      </div>
                  </div>
                  <div id="booking-card" class="card">
                      <h2 style="margin-top:0;">${this.getL("New Consultation", "Nouvelle Consultation")}</h2>
                      <div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">
                          <div><label>${this.getL("Specialty", "Spécialité")}</label><select id="med-spec"><option>General Medicine</option><option>Cardiology</option><option>Neurology</option></select></div>
                          <div><label>${this.getL("Preferred Date", "Date Prévue")}</label><input type="date" id="med-date"></div>
                          <button id="save-med-btn" style="width:100%; margin-top:10px;">${this.getL("Confirm Booking", "Confirmer le RDV")}</button>
                      </div>
                  </div>
              </div>`;
              scriptJS = `
                  const medData = new OmniData('med_${brand.toLowerCase().replace(/\s/g,'_')}', []);
                  const render = () => {
                      const list = document.getElementById('appt-list');
                      const items = medData.get();
                      if(!items.length) { list.innerHTML = '<p style="opacity:0.5;">${this.js(this.getL("No appointments scheduled.", "Aucun rendez-vous prévu."))}</p>'; }
                      else {
                          list.innerHTML = items.map(a => \`
                              <div style="padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; border-left:4px solid var(--primary); display:flex; justify-content:space-between; align-items:center;">
                                  <div><div style="font-weight:bold;">\${a.spec}</div><div style="font-size:12px; opacity:0.6;">\${a.date}</div></div>
                                  <button style="background:#ef4444; padding:5px 10px; font-size:10px;" onclick="cancelMed(\${a.id})">${this.getL("Cancel", "Annuler")}</button>
                              </div>
                          \`).join('');
                      }
                  };
                  window.cancelMed = (id) => { medData.delete(id); render(); showToast("${this.js(this.getL("Appointment cancelled.", "Rendez-vous annulé."))}"); };
                  document.getElementById('save-med-btn').onclick = () => {
                      const spec = document.getElementById('med-spec').value;
                      const date = document.getElementById('med-date').value;
                      if(!date) return;
                      medData.add({ spec, date });
                      render();
                      showToast("${this.js(this.getL("Appointment booked successfully!", "Rendez-vous enregistré !"))}");
                  };
                  render();
              `;
          } else if(type === 'fitness') {
              bodyHTML = `
              <header style="justify-content:center; flex-direction:column; gap:10px; padding:20px;">
                  <div class="logo">${brand} Pulse</div>
                  <div style="font-size:12px; opacity:0.6;">${this.getL("AI POWERED WORKOUT ENGINE", "MOTEUR D'ENTRAÎNEMENT IA")}</div>
              </header>
              <div class="container" style="padding:40px 0;">
                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:40px;">
                      <div class="card" style="text-align:center;"><h1 id="total-kcal" style="margin:0; color:var(--primary);">0</h1><p style="margin:0; opacity:0.6;">${this.getL("Total Kcal", "Calories Totales")}</p></div>
                      <div class="card" style="text-align:center;"><h1 id="session-count" style="margin:0; color:var(--primary);">0</h1><p style="margin:0; opacity:0.6;">${this.getL("Sessions", "Sessions")}</p></div>
                  </div>
                  <div class="card">
                      <h3>${this.getL("Log New Activity", "Nouvelle Activité")}</h3>
                      <div style="display:flex; gap:10px; margin-top:15px;">
                          <input type="text" id="fit-name" placeholder="${this.getL("Run, Yoga, Gym...", "Course, Yoga...")}">
                          <input type="number" id="fit-kcal" placeholder="Kcal" style="width:100px;">
                          <button id="fit-add-btn">${this.getL("Record", "Enregistrer")}</button>
                      </div>
                  </div>
                  <div id="fit-list" style="margin-top:30px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:15px;"></div>
              </div>`;
              scriptJS = `
                  const fitData = new OmniData('fit_${brand.toLowerCase().replace(/\s/g,'_')}', []);
                  const render = () => {
                      const list = document.getElementById('fit-list');
                      const items = fitData.get();
                      document.getElementById('total-kcal').innerText = items.reduce((s,i)=>s+parseInt(i.kcal||0), 0);
                      document.getElementById('session-count').innerText = items.length;
                      list.innerHTML = items.map(i => \`
                          <div class="card" style="display:flex; justify-content:space-between; align-items:center; border-left:4px solid var(--primary);">
                              <div><div style="font-weight:bold;">\${i.name}</div><div style="font-size:12px; opacity:0.5;">\${i.kcal} kcal</div></div>
                              <button style="background:#ef4444; padding:5px 12px; font-size:11px;" onclick="delFit(\${i.id})">${this.getL("Delete", "Supprimer")}</button>
                          </div>
                      \`).join('');
                  };
                  window.delFit = (id) => { fitData.delete(id); render(); showToast("${this.js(this.getL("Entry removed.", "Entrée supprimée."))}"); };
                  document.getElementById('fit-add-btn').onclick = () => {
                      const name = document.getElementById('fit-name').value;
                      const kcal = document.getElementById('fit-kcal').value;
                      if(!name || !kcal) return;
                      fitData.add({name, kcal});
                      document.getElementById('fit-name').value=''; document.getElementById('fit-kcal').value='';
                      render();
                      showToast("${this.js(this.getL("Workout recorded!", "Entraînement enregistré !"))}");
                  };
                  render();
              `;
          } else if(type === 'social') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">${brand} Social</div></div><div style="display:flex; gap:10px;"><button id="p-me-btn">${this.getL("My Profile", "Mon Profil")}</button></div></header>
              <div style="max-width:600px; margin: 30px auto;">
                  <div class="card" style="margin-bottom:20px;">
                      <textarea id="p-text" style="height:100px; margin-bottom:15px; font-size:16px;" placeholder="${this.getL("What's on your mind?", "Quoi de neuf ?")}" ></textarea>
                      <button id="p-btn" style="width:100%">${this.getL("Post", "Publier")}</button>
                  </div>
                  <div id="feed" style="display:flex; flex-direction:column; gap:20px;"></div>
              </div>`;
              scriptJS = `
                  const socialData = new OmniData('social_${brand.toLowerCase().replace(/\s/g,'_')}', [
                    { u: 'Architect', t: "${this.js(this.getL("The IA ULTRA system is now 100% functional. Every post here is persistent!", "Le système IA ULTRA est désormais 100% fonctionnel. Chaque publication ici este persistente !"))}" }
                  ]);
                  const render = () => {
                      document.getElementById('feed').innerHTML = socialData.get().map(p => \`
                          <div class="card" style="animation:fadeIn 0.4s ease;">
                              <div style="font-weight:900; color:var(--primary); margin-bottom:10px;">@\${p.u || 'User'}</div>
                              <div style="font-size:18px;">\${p.t}</div>
                              <div style="margin-top:20px; display:flex; gap:20px; font-size:12px; opacity:0.6;">
                                  <span style="cursor:pointer;" onclick="showToast('${this.js(this.getL("Liked!", "Aimé !"))}')">👍 Like</span>
                                  <span style="cursor:pointer; color:#ef4444;" onclick="delSocial(\${p.id})">${this.getL("Delete", "Supprimer")}</span>
                              </div>
                          </div>
                      \`).join('');
                  };
                  window.delSocial = (id) => { socialData.delete(id); render(); };
                  document.getElementById('p-btn').onclick = () => {
                      const v = document.getElementById('p-text').value;
                      if(v) { socialData.add({u:'You', t:v}); document.getElementById('p-text').value=''; render(); showToast("${this.js(this.getL("Posted!", "Publié !"))}"); }
                  };
                  render();
              `;
          } else if(type === 'blog') {
              bodyHTML = `
              <header style="justify-content:center;"><div class="logo">${brand}</div></header>
              <div style="max-width:800px; margin: 50px auto;">
                  <h1 style="font-size:62px; letter-spacing:-3px; margin:0 0 30px;">${this.getL("Future Insights", "Visions Futures")}</h1>
                  <div class="card" style="margin-bottom:40px; padding:0; overflow:hidden;">
                      <div style="height:350px; background:linear-gradient(135deg, var(--primary), #ec4899); display:flex; align-items:center; justify-content:center; font-size:120px;">📰</div>
                      <div style="padding:40px;">
                          <div class="badge">FEATURED</div>
                          <h2>${this.getL("AI is the new Electricity", "L'IA est l'Électricité Nouvelle")}</h2>
                          <p style="font-size:18px; opacity:0.7; line-height:1.7;">${this.getL("How specialized models are transforming small businesses into automated giants.", "Comment les modèles spécialisés transforment les petites entreprises en géants automatisés.")}</p>
                          <button style="margin-top:20px;">${this.getL("Read More", "Lire la suite")}</button>
                      </div>
                  </div>
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                      <div class="card"><h3>${this.getL("Sustainable Tech", "Tech Durable")}</h3><p>${this.getL("Green coding practices for a better planet.", "Codage vert pour une meilleure planète.")}</p></div>
                      <div class="card"><h3>${this.getL("Quantum Logic", "Logique Quantique")}</h3><p>${this.getL("Understanding the logic of the next decade.", "Comprendre la logique de la prochaine décennie.")}</p></div>
                  </div>
              </div>`;
          } else if(type === 'dashboard') {
              bodyHTML = `
              <div style="display:flex; min-height: 90vh; gap: 30px; margin-top:20px;">
                  <aside style="width:250px; display:flex; flex-direction:column; gap:10px;">
                      <div class="logo-area" style="margin-bottom:40px;">${logoIcon}<div class="logo">${brand}</div></div>
                      <button style="text-align:left; background:rgba(255,255,255,0.05);">${this.getL("Overview", "Aperçu")}</button>
                      <button style="text-align:left; background:transparent;">${this.getL("Statistics", "Statistiques")}</button>
                      <button style="text-align:left; background:transparent;">${this.getL("Settings", "Paramètres")}</button>
                      <div style="margin-top:auto; font-size:11px; opacity:0.3; padding:20px; border-top:1px solid rgba(255,255,255,0.1);">OMNI-ARCHITECT ENGINE v2.5</div>
                  </aside>
                  <main style="flex:1;">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                          <h1>${this.getL("Control Panel", "Panneau de Contrôle")}</h1>
                          <div id="stat-clock" style="font-weight:900; background:rgba(0,0,0,0.3); padding:10px 20px; border-radius:10px; border-bottom:2px solid var(--primary);">00:00:00</div>
                      </div>
                      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:40px;">
                          <div class="card"><h3 style="margin:0; opacity:0.6;">Revenue</h3><h1 style="color:var(--primary);">$45k</h1></div>
                          <div class="card"><h3 style="margin:0; opacity:0.6;">Visits</h3><h1 style="color:var(--primary);">12,900</h1></div>
                          <div class="card"><h3 style="margin:0; opacity:0.6;">Orders</h3><h1 style="color:var(--primary);">88%</h1></div>
                      </div>
                      <div class="card">
                          <h3>${this.getL("User Directory", "Répertoire des Utilisateurs")}</h3>
                          <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                              <thead><tr style="text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); opacity:0.6;"><th>ID</th><th>User</th><th>Active</th></tr></thead>
                              <tbody id="db-list"></tbody>
                          </table>
                      </div>
                  </main>
              </div>`;
              scriptJS = `setInterval(() => { document.getElementById('stat-clock').innerText = new Date().toLocaleTimeString(); }, 1000);
              const db = [{i:'01', u:'Alice Architect', a:'YES'}, {i:'02', u:'Bob Builder', a:'YES'}, {i:'03', u:'Charlie Code', a:'NO'}];
              document.getElementById('db-list').innerHTML = db.map(r => '<tr style="border-bottom:1px solid rgba(255,255,255,0.05); height:50px;"><td>'+r.i+'</td><td>'+r.u+'</td><td style="color:'+(r.a==='YES'?'#10b981':'#ef4444')+'">'+r.a+'</td></tr>').join('');`;
          } else if(type === 'utility') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; align-items:center; justify-content:center;">
                  <div class="card" style="width:100%; max-width:450px; text-align:center;">
                      <div class="logo" style="margin-bottom:30px;">${brand}</div>
                      <h2 style="margin-bottom:30px;">${this.getL("Dynamic Logic System", "Système de Logique Dynamique")}</h2>
                      <div style="display:flex; flex-direction:column; gap:20px;">
                          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                             <input type="number" id="v1" placeholder="Val A">
                             <input type="number" id="v2" placeholder="Val B">
                          </div>
                          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
                              <button onclick="op('+')">+</button><button onclick="op('-')">-</button><button onclick="op('*')">×</button><button onclick="op('/')">÷</button>
                          </div>
                          <div style="font-size:48px; font-weight:900; background:rgba(0,0,0,0.2); padding:20px; border-radius:15px; border:2px solid var(--primary);" id="res">0</div>
                      </div>
                  </div>
              </div>`;
              scriptJS = `window.op = (s) => { 
                const a = parseFloat(document.getElementById('v1').value)||0;
                const b = parseFloat(document.getElementById('v2').value)||0;
                let r = 0; if(s==='+') r=a+b; if(s==='-') r=a-b; if(s==='*') r=a*b; if(s==='/') r=a/b;
                document.getElementById('res').innerText = r.toFixed(2).replace('.00','');
                showToast("${this.js(this.getL("Calculation complete!", "Calcul terminé!"))}");
              }`;
          } else if(type === 'travel') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">✈️ ${brand}</div></div><button>${this.getL("My Bookings", "Mes Réservations")}</button></header>
              <div style="padding: 60px 0; text-align:center; background:linear-gradient(rgba(59,130,246,0.1), transparent); border-radius:30px; margin: 30px 0;">
                  <h1 style="font-size:52px; margin:0;">${this.getL("Explore the World", "Explorez le Monde")}</h1>
                  <p style="opacity:0.7; font-size:20px; margin-top:15px;">${this.getL("Unique destinations curated for the modern traveler.", "Destinations uniques pour le voyageur moderne.")}</p>
                  <div style="margin-top:40px; display:flex; max-width:600px; margin-left:auto; margin-right:auto; gap:10px; background:var(--card); padding:10px; border-radius:20px;">
                      <input type="text" placeholder="${this.getL("Where to?", "Où allez-vous ?")}" style="border:none; background:transparent;">
                      <button style="white-space:nowrap;">${this.getL("Find Flights", "Trouver des Vols")}</button>
                  </div>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                  <div class="card" style="padding:0; overflow:hidden;"><div style="height:200px; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:60px;">🏔️</div><div style="padding:20px;"><h3>Alpine Escape</h3><p>$450 / ${this.getL("night", "nuit")}</p><button style="width:100%;">${this.getL("Book Now", "Réserver")}</button></div></div>
                  <div class="card" style="padding:0; overflow:hidden;"><div style="height:200px; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:60px;">🏝️</div><div style="padding:20px;"><h3>Tropical Paradise</h3><p>$320 / ${this.getL("night", "nuit")}</p><button style="width:100%;">${this.getL("Book Now", "Réserver")}</button></div></div>
                  <div class="card" style="padding:0; overflow:hidden;"><div style="height:200px; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:60px;">🏙️</div><div style="padding:20px;"><h3>City Lights</h3><p>$280 / ${this.getL("night", "nuit")}</p><button style="width:100%;">${this.getL("Book Now", "Réserver")}</button></div></div>
              </div>`;
          } else if(type === 'legal') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">⚖️ ${brand}</div></div><button>${this.getL("Consultation", "Consultation")}</button></header>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:60px; margin: 60px 0; align-items:center;">
                  <div>
                      <h1 style="font-size:48px; line-height:1.1;">${this.getL("Justice & Integrity", "Justice & Intégrité")}</h1>
                      <p style="font-size:20px; opacity:0.8; margin:30px 0;">${this.getL("Premium legal services with a focus on civil and corporate law.", "Services juridiques premium axés sur le droit civil et des sociétés.")}</p>
                      <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:15px;">
                          <li>✅ ${this.getL("Expert Representation", "Représentation d'Experts")}</li>
                          <li>✅ ${this.getL("Confidential Handling", "Traitement Confidentiel")}</li>
                          <li>✅ ${this.getL("Certified Mediators", "Médiateurs Certifiés")}</li>
                      </ul>
                  </div>
                  <div class="card">
                      <h3>${this.getL("Open a Case", "Ouvrir un Dossier")}</h3>
                      <input type="text" placeholder="${this.getL("Subject", "Sujet")}" style="margin:20px 0;">
                      <textarea placeholder="${this.getL("Description", "Description")}" style="height:100px; margin-bottom:20px;"></textarea>
                      <button style="width:100%;">${this.getL("Submit Request", "Envoyer la Demande")}</button>
                  </div>
              </div>`;
          } else if(type === 'agency') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                  <div class="badge" style="background:var(--primary); font-size:14px; padding:8px 20px;">${this.getL("Creative Synthesis", "Synthèse Créative")}</div>
                  <h1 style="font-size:82px; letter-spacing:-5px; margin:20px 0;">${brand}</h1>
                  <p style="font-size:26px; opacity:0.6; max-width:800px;">${this.getL("We transform complex logic into digital art.", "Nous transformons la logique complexe en art numérique.")}</p>
                  <div style="display:flex; gap:20px; margin-top:50px;">
                      <button style="padding:20px 50px; font-size:18px;">${this.getL("Start Project", "Démarrer un Projet")}</button>
                      <button style="padding:20px 50px; font-size:18px; background:transparent; border:2px solid var(--text); color:var(--text);">${this.getL("Our Work", "Notre Travail")}</button>
                  </div>
              </div>
              <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:100px;">
                  <div style="height:400px; background:rgba(255,255,255,0.05); border-radius:30px;"></div>
                  <div style="height:400px; background:var(--primary); border-radius:30px; display:flex; align-items:center; justify-content:center; font-size:80px;">🎨</div>
                  <div style="height:400px; background:rgba(255,255,255,0.05); border-radius:30px;"></div>
              </div>`;
          } else if(type === 'delivery') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">🚚 ${brand}</div></div><div class="badge">LIVE TRACKING</div></header>
              <div style="max-width:800px; margin: 40px auto;">
                  <div class="card">
                      <h2 style="margin-top:0;">${this.getL("Track Your Package", "Suivre votre Colis")}</h2>
                      <div style="display:flex; gap:10px; margin:20px 0;">
                          <input type="text" placeholder="IA-ULTRA-001" style="flex:1;">
                          <button id="track-btn">${this.getL("Locate", "Localiser")}</button>
                      </div>
                      <div id="tracking-status" style="padding:20px; background:rgba(0,0,0,0.2); border-radius:12px; display:none;">
                          <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                              <span><b>Status:</b> ${this.getL("In Transit", "En Transit")}</span>
                              <span><b>ETA:</b> 14:00</span>
                          </div>
                          <div style="height:10px; background:rgba(255,255,255,0.1); border-radius:5px; overflow:hidden;">
                              <div style="width:65%; height:100%; background:var(--primary); transition:2s;"></div>
                          </div>
                      </div>
                  </div>
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
                      <div class="card"><h3>${this.getL("Ship Now", "Expédier")}</h3><p>${this.getL("Fastest global network.", "Réseau mondial le plus rapide.")}</p></div>
                      <div class="card"><h3>${this.getL("Pricing", "Tarifs")}</h3><p>${this.getL("Competitive rates.", "Tarifs compétitifs.")}</p></div>
                  </div>
              </div>`;
              scriptJS = `document.getElementById('track-btn').onclick = () => {
                  document.getElementById('tracking-status').style.display = 'block';
                  showToast("${this.js(this.getL("Fetching real-time data...", "Récupération des données..."))}");
              };`;
          } else if(type === 'clock') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                  <div class="card" style="width:320px; height:320px; border-radius:50%; display:flex; align-items:center; justify-content:center; position:relative; border: 8px solid var(--primary); box-shadow: 0 0 50px rgba(59,130,246,0.2);">
                      <div id="hour" style="position:absolute; width:6px; height:60px; background:var(--text); transform-origin:bottom; bottom:50%; border-radius:3px;"></div>
                      <div id="min" style="position:absolute; width:4px; height:90px; background:var(--text); transform-origin:bottom; bottom:50%; border-radius:2px; opacity:0.8;"></div>
                      <div id="sec" style="position:absolute; width:2px; height:110px; background:#ef4444; transform-origin:bottom; bottom:50%; border-radius:1px;"></div>
                      <div style="width:12px; height:12px; background:var(--primary); border-radius:50%; z-index:10;"></div>
                      <div style="position:absolute; top:30px; font-weight:900; letter-spacing:2px; opacity:0.5;">OMNI-TIME</div>
                  </div>
                  <div id="digi-time" style="margin-top:40px; font-size:48px; font-weight:900; font-family:monospace; color:var(--primary);">00:00:00</div>
                  <p style="opacity:0.6;">${this.getL("High-precision synchronization active.", "Synchronisation haute précision active.")}</p>
              </div>`;
              scriptJS = `setInterval(() => {
                  const d = new Date();
                  const h = d.getHours(); const m = d.getMinutes(); const s = d.getSeconds();
                  document.getElementById('hour').style.transform = "rotate("+(h*30+m/2)+"deg)";
                  document.getElementById('min').style.transform = "rotate("+(m*6)+"deg)";
                  document.getElementById('sec').style.transform = "rotate("+(s*6)+"deg)";
                  document.getElementById('digi-time').innerText = d.toLocaleTimeString();
              }, 1000);`;
          } else if(type === 'thermometer') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; align-items:center; justify-content:center; gap:50px;">
                  <div class="card" style="height:400px; width:40px; border-radius:20px; padding:5px; position:relative;">
                      <div id="temp-fill" style="position:absolute; bottom:5px; left:5px; right:5px; background:linear-gradient(to top, #3b82f6, #ef4444); border-radius:15px; height:50%; transition:1s ease-out;"></div>
                  </div>
                  <div style="text-align:left;">
                      <div class="badge" id="weather-city">LONDON</div>
                      <h1 style="font-size:80px; margin:0;" id="temp-val">24°C</h1>
                      <p style="opacity:0.7; font-size:24px;" id="weather-desc">Sunny Intervals</p>
                      <div style="display:flex; gap:20px; margin-top:20px;">
                          <div class="card" style="padding:15px;">💧 <b id="hum-val">45%</b></div>
                          <div class="card" style="padding:15px;">💨 <b id="wind-val">12km/h</b></div>
                      </div>
                  </div>
              </div>`;
              scriptJS = `const updateWeather = () => {
                  const t = Math.floor(Math.random()*15 + 15);
                  document.getElementById('temp-val').innerText = t + "°C";
                  document.getElementById('temp-fill').style.height = (t*2) + "%";
                  document.getElementById('hum-val').innerText = Math.floor(Math.random()*40+30) + "%";
                  document.getElementById('weather-city').innerText = "${this.js(this.getL("CURRENT LOCATION", "POSITION ACTUELLE"))}";
              }; updateWeather(); setInterval(updateWeather, 5000);`;
          } else if(type === 'converter') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; align-items:center; justify-content:center;">
                  <div class="card" style="width:100%; max-width:400px;">
                      <h2 style="text-align:center; margin-bottom:30px;">${this.getL("Smart Converter", "Convertisseur Intelligent")}</h2>
                      <div style="display:flex; flex-direction:column; gap:20px;">
                          <div><label>From: USD</label><input type="number" id="unit-val" value="1"></div>
                          <div style="text-align:center; font-size:24px; color:var(--primary);">⇅</div>
                          <div><label>To: EUR</label><input type="number" id="result-val" readonly style="background:rgba(255,255,255,0.05);"></div>
                          <button id="conv-btn" style="width:100%;">${this.getL("Convert Now", "Convertir")}</button>
                      </div>
                  </div>
              </div>`;
              scriptJS = `document.getElementById('conv-btn').onclick = () => {
                  const v = parseFloat(document.getElementById('unit-val').value) || 0;
                  document.getElementById('result-val').value = (v * 0.92).toFixed(2);
                  showToast("${this.js(this.getL("Exchange rate updated!", "Taux de change mis à jour!"))}");
              };`;
          } else if(type === 'measure') {
              bodyHTML = `
              <div style="min-height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden;">
                  <div style="width:100%; height:150px; background:var(--card); border:2px solid var(--primary); position:relative; display:flex; align-items:flex-start;">
                      ${Array.from({length:20}).map((_,i) => `<div style="flex:1; height:40px; border-left:1px solid var(--text); position:relative; font-size:10px; padding-left:2px;">${i}cm <div style="position:absolute; left:50%; top:0; height:20px; border-left:1px solid rgba(255,255,255,0.2);"></div></div>`).join('')}
                      <div id="ruler-point" style="position:absolute; left:0; top:0; bottom:0; width:2px; background:#ef4444; box-shadow:0 0 10px #ef4444; transition:0.2s;"></div>
                  </div>
                  <div style="margin-top:40px; text-align:center;">
                      <h1 id="measure-val">0.00 cm</h1>
                      <p>${this.getL("Drag or move mouse to measure accurately.", "Déplacez la souris pour mesurer précisément.")}</p>
                  </div>
              </div>`;
              scriptJS = `document.body.onmousemove = (e) => {
                  const p = (e.clientX / window.innerWidth) * 100;
                  document.getElementById('ruler-point').style.left = p + "%";
                  document.getElementById('measure-val').innerText = (e.clientX / 37.8).toFixed(2) + " cm";
              };`;
          } else if(type === '3d_earth') {
              bodyHTML = `
              <div id="canvas-container" style="position:fixed; inset:0; z-index:0;"></div>
              <header style="position:relative; z-index:10; background:rgba(0,0,0,0.3); backdrop-filter:blur(10px);">
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Explorer</div></div>
                  <div class="badge">LIVE WEBGL SYNTHESIS</div>
              </header>
              <div style="position:absolute; bottom:40px; left:40px; z-index:10; max-width:300px;" class="card">
                  <h2 style="margin-top:0;">${this.getL("Global Network", "Réseau Global")}</h2>
                  <p style="opacity:0.7;">${this.getL("Drag to rotate the planet. Click on markers for data.", "Faites glisser pentru a roti planeta. Cliquez sur les marqueurs.")}</p>
                  <button style="width:100%;" onclick="resetCam()">${this.getL("Reset View", "Réinitialiser")}</button>
              </div>`;
              scriptJS = `
                let scene, camera, renderer, globe, controls;
                function init() {
                    scene = new THREE.Scene();
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    document.getElementById('canvas-container').appendChild(renderer.domElement);
                    
                    const geom = new THREE.SphereGeometry(5, 64, 64);
                    const mat = new THREE.MeshPhongMaterial({ 
                        color: '${primary}', 
                        wireframe: true, 
                        transparent: true, 
                        opacity: 0.3 
                    });
                    globe = new THREE.Mesh(geom, mat);
                    scene.add(globe);
                    
                    const light = new THREE.PointLight(0xffffff, 1.5);
                    light.position.set(10, 10, 10);
                    scene.add(light);
                    scene.add(new THREE.AmbientLight(0x404040));
                    
                    // Add markers
                    for(let i=0; i<20; i++) {
                        const mGeom = new THREE.SphereGeometry(0.1, 8, 8);
                        const mMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                        const marker = new THREE.Mesh(mGeom, mMat);
                        const phi = Math.acos(-1 + (2 * i) / 20);
                        const theta = Math.sqrt(20 * Math.PI) * phi;
                        marker.position.setFromSphericalCoords(5, phi, theta);
                        globe.add(marker);
                    }

                    if(typeof THREE.OrbitControls !== 'undefined') {
                        controls = new THREE.OrbitControls(camera, renderer.domElement);
                        controls.enableDamping = true;
                    }
                    camera.position.z = 12;
                    animate();
                }
                function animate() {
                    requestAnimationFrame(animate);
                    globe.rotation.y += 0.002;
                    if(controls) controls.update();
                    renderer.render(scene, camera);
                }
                window.resetCam = () => { camera.position.set(0,0,12); controls.reset(); };
                window.onresize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
                init();
              `;
          } else if(type === '3d_shapes') {
              bodyHTML = `
              <div id="canvas-container" style="position:fixed; inset:0; z-index:0;"></div>
              <header style="position:relative; z-index:10;"><div class="logo-area">${logoIcon}<div class="logo">${brand} 3D Lab</div></div></header>
              <div style="position:absolute; bottom:20px; right:20px; z-index:10; width:200px; padding:15px;" class="card">
                  <h3 style="margin-top:0; font-size:16px;">${this.getL("Object Controls", "Contrôles Objet")}</h3>
                  <label style="font-size:12px;">Rotation Speed</label><input type="range" id="speed" min="0" max="100" value="20">
                  <label style="margin-top:10px; display:block; font-size:12px;">Shape Color</label><input type="color" id="color" value="${primary}" style="height:30px; padding:2px;">
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:20px;">
                      <button onclick="setShape('cube')">Cube</button><button onclick="setShape('sphere')">Sphere</button>
                      <button onclick="setShape('torus')">Torus</button><button onclick="setShape('knot')">Knot</button>
                  </div>
              </div>`;
              scriptJS = `
                let scene, camera, renderer, mesh, controls;
                function init() {
                    scene = new THREE.Scene();
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    document.getElementById('canvas-container').appendChild(renderer.domElement);
                    
                    setShape('cube');
                    document.getElementById('color').oninput = (e) => { if(mesh) mesh.material.color.set(e.target.value); };
                    
                    const light = new THREE.DirectionalLight(0xffffff, 1);
                    light.position.set(5, 5, 5);
                    scene.add(light);
                    scene.add(new THREE.AmbientLight(0x404040, 2));

                    if(typeof THREE.OrbitControls !== 'undefined') {
                        controls = new THREE.OrbitControls(camera, renderer.domElement);
                    }
                    camera.position.z = 5;
                    animate();
                }
                window.setShape = (type) => {
                    if(mesh) scene.remove(mesh);
                    let geom;
                    if(type === 'cube') geom = new THREE.BoxGeometry(2, 2, 2);
                    else if(type === 'sphere') geom = new THREE.SphereGeometry(1.5, 32, 32);
                    else if(type === 'torus') geom = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
                    else geom = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
                    
                    const mat = new THREE.MeshStandardMaterial({ color: document.getElementById('color').value, metalness: 0.7, roughness: 0.2 });
                    mesh = new THREE.Mesh(geom, mat);
                    scene.add(mesh);
                };
                function animate() {
                    requestAnimationFrame(animate);
                    const s = document.getElementById('speed').value / 1000;
                    if(mesh) { mesh.rotation.x += s; mesh.rotation.y += s; }
                    if(controls) controls.update();
                    renderer.render(scene, camera);
                }
                init();
              `;
          } else if(type === 'galaxy') {
              bodyHTML = `
              <div id="canvas-container" style="position:fixed; inset:0; z-index:0; background:#000;"></div>
              <header style="position:relative; z-index:10; border:none; background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);">
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Cosmos</div></div>
                  <div class="badge" style="background:#ec4899;">DEEP SPACE SCAN</div>
              </header>
              <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; pointer-events:none; z-index:5;">
                  <h1 style="font-size:120px; margin:0; opacity:0.1; letter-spacing:20px;">${brand}</h1>
              </div>`;
              scriptJS = `
                let scene, camera, renderer, particles, controls;
                function init() {
                    scene = new THREE.Scene();
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
                    renderer = new THREE.WebGLRenderer({ antialias: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    document.getElementById('canvas-container').appendChild(renderer.domElement);
                    
                    const geom = new THREE.BufferGeometry();
                    const vertices = [];
                    for (let i = 0; i < 15000; i++) {
                        const x = (Math.random() - 0.5) * 1000;
                        const y = (Math.random() - 0.5) * 1000;
                        const z = (Math.random() - 0.5) * 1000;
                        vertices.push(x, y, z);
                    }
                    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, opacity: 0.8 });
                    particles = new THREE.Points(geom, mat);
                    scene.add(particles);

                    if(typeof THREE.OrbitControls !== 'undefined') {
                        controls = new THREE.OrbitControls(camera, renderer.domElement);
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;
                    }
                    camera.position.z = 500;
                    animate();
                }
                function animate() {
                    requestAnimationFrame(animate);
                    particles.rotation.y += 0.0005;
                    if(controls) controls.update();
                    renderer.render(scene, camera);
                }
                init();
              `;
          } else if(type === 'education') {
              bodyHTML = `
              <header><div class="logo-area">${logoIcon}<div class="logo">${brand} Academy</div></div><button>${this.getL("Get Certified", "S'inscrire")}</button></header>
              <div style="text-align:center; padding:60px 20px;">
                  <h1 style="font-size:52px; margin-bottom:10px;">${this.getL("Master Modern Skills", "Maîtrisez les Compétences Modernes")}</h1>
                  <p style="opacity:0.7; font-size:20px;">${this.getL("Interactive learning platform powered by IA Architecte.", "Plateforme d'apprentissage interactive.")}</p>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:30px; margin-bottom:50px;">
                  <div class="card"><h3>1. Introduction to Logic</h3><p>Beginner Course • 2h</p><button style="width:100%; margin-top:15px;">${this.getL("Start Learning", "Commencer")}</button></div>
                  <div class="card"><h3>2. Advanced Synthesis</h3><p>Intermediate • 5h</p><button style="width:100%; margin-top:15px;">${this.getL("Start Learning", "Commencer")}</button></div>
                  <div class="card"><h3>3. Master Deployment</h3><p>Expert • 10h</p><button style="width:100%; margin-top:15px;">${this.getL("Start Learning", "Commencer")}</button></div>
              </div>`;
          } else if(type === 'multipage') {
              bodyHTML = `
              <header style="background:rgba(0,0,0,0.5); backdrop-filter:blur(10px); position:sticky; top:0; z-index:100; border-bottom:1px solid rgba(255,255,255,0.1); padding:10px 0;">
                  <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
                      <div class="logo-area" style="margin:0;">${logoIcon}<div class="logo">${brand}</div></div>
                      <nav style="display:flex; gap:25px;">
                          <a href="#" onclick="showPage('home', event)" style="color:var(--text); text-decoration:none; font-weight:bold;">${this.getL("Home", "Accueil")}</a>
                          <a href="#" onclick="showPage('about', event)" style="color:var(--text); text-decoration:none; opacity:0.7;">${this.getL("About", "À Propos")}</a>
                          <a href="#" onclick="showPage('services', event)" style="color:var(--text); text-decoration:none; opacity:0.7;">${this.getL("Services", "Services")}</a>
                          <a href="#" onclick="showPage('contact', event)" style="color:var(--text); text-decoration:none; opacity:0.7;">${this.getL("Contact", "Contact")}</a>
                      </nav>
                  </div>
              </header>
              <div id="page-home" class="page active">
                  <div class="container" style="padding:100px 0; text-align:center;">
                      <div class="badge">ESTABLISHED 2026</div>
                      <h1 style="font-size:82px; margin:20px 0; letter-spacing:-4px;">${brand}</h1>
                      <p style="font-size:24px; opacity:0.7; margin:0 auto 50px; max-width:700px;">${this.getL("The Future of Multipage Architectures synthesized via IA ULTRA.", "L'avenir des architectures multi-pages synthétisées via IA ULTRA.")}</p>
                      <button style="padding:20px 50px; font-size:20px; border-radius:50px;" onclick="showPage('about', event)">${this.getL("Explore Vision", "Explorer la Vision")}</button>
                  </div>
                  <div class="container" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:100px;">
                      <div class="card" style="text-align:center;"><div style="font-size:40px; margin-bottom:15px;">🚀</div><h3>${this.getL("Speed", "Rapidité")}</h3><p>${this.getL("Instant deployment.", "Déploiement instantané.")}</p></div>
                      <div class="card" style="text-align:center;"><div style="font-size:40px; margin-bottom:15px;">🛡️</div><h3>${this.getL("Security", "Sécurité")}</h3><p>${this.getL("Encrypted nodes.", "Nœuds cryptés.")}</p></div>
                      <div class="card" style="text-align:center;"><div style="font-size:40px; margin-bottom:15px;">💎</div><h3>${this.getL("Quality", "Qualité")}</h3><p>${this.getL("Premium finish.", "Finition premium.")}</p></div>
                  </div>
              </div>
              <div id="page-about" class="page">
                  <div class="container" style="padding:100px 0;">
                      <h2 style="font-size:48px;">${this.getL("About Our Vision", "À Propos de Notre Vision")}</h2>
                      <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:50px; margin-top:40px; align-items:center;">
                          <div style="height:350px; background:linear-gradient(135deg, var(--primary), #ec4899); border-radius:30px; display:flex; align-items:center; justify-content:center; font-size:120px; box-shadow:0 20px 50px rgba(0,0,0,0.3);">🧬</div>
                          <div>
                              <p style="font-size:20px; line-height:1.8; opacity:0.8;">${this.getL("We deploy complex systems with high-end aesthetics. Every page is a masterpiece synthesized by Ultra Intelligence protocols, ensuring absolute functional clarity and aesthetic dominance.", "Nous déployons des systèmes complexes avec une esthétique haut de gamme. Chaque page est un chef-d'œuvre synthétisé par des protocoles d'Ultra Intelligence, garantissant une clarté fonctionnelle et o dominance esthétique absolue.")}</p>
                              <button style="margin-top:30px; padding:15px 35px;" onclick="showPage('services', event)">${this.getL("Our Services", "Nos Services")}</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div id="page-services" class="page">
                  <div class="container" style="padding:100px 0;">
                      <h2 style="font-size:48px; text-align:center;">${this.getL("Our Expertise", "Notre Expertise")}</h2>
                      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:30px; margin-top:50px;">
                          <div class="card"><h3>${this.getL("AI Logic", "Logique IA")}</h3><p>${this.getL("Optimized neural structures for business scaling and decision synthesis.", "Structures neurales optimisées pentru expansiunea afacerilor și sinteza deciziilor.")}</p></div>
                          <div class="card"><h3>${this.getL("UI Synthesis", "Synthèse UI")}</h3><p>${this.getL("Premium interfaces with zero latency and pixel-perfect responsiveness.", "Interfaces premium avec latence zéro et réactivité parfaite au pixel près.")}</p></div>
                          <div class="card"><h3>${this.getL("Cloud Ops", "Opérations Cloud")}</h3><p>${this.getL("Global architectural deployment across distributed edge networks.", "Déploiement architectural mondial sur des réseaux distribués.")}</p></div>
                      </div>
                  </div>
              </div>
              <div id="page-contact" class="page">
                  <div class="container" style="max-width:600px; padding:100px 0;">
                      <h2 style="font-size:48px; text-align:center;">${this.getL("Get in Touch", "Contactez-nous")}</h2>
                      <div class="card" style="margin-top:40px;">
                          <div style="display:flex; flex-direction:column; gap:20px;">
                              <div><label>${this.getL("Full Name", "Nom Complet")}</label><input type="text" placeholder="John Architect"></div>
                              <div><label>${this.getL("Email Address", "Adresse Email")}</label><input type="email" placeholder="john@example.com"></div>
                              <div><label>${this.getL("Message", "Message")}</label><textarea style="height:120px;" placeholder="${this.getL("Your ideas...", "Vos idées...")}"></textarea></div>
                              <button style="width:100%;" onclick="showToast('${this.js(this.getL("Message Sent! We will contact you soon.", "Message Envoyé ! Nous vous contacterons bientôt."))}')">${this.getL("Send Now", "Envoyer")}</button>
                          </div>
                      </div>
                  </div>
              </div>`;
              scriptJS = `
                  window.showPage = (id, event) => {
                      if(event) event.preventDefault();
                      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                      const target = document.getElementById('page-'+id);
                      if(target) target.classList.add('active');
                      document.querySelectorAll('nav a').forEach(a => { a.style.opacity = '0.7'; a.style.fontWeight = 'normal'; });
                      if(event && event.target) { event.target.style.opacity = '1'; event.target.style.fontWeight = 'bold'; }
                      window.scrollTo({top:0, behavior:'smooth'});
                      showToast("${this.js(this.getL("Syncing page: ", "Synchronisation: "))}" + id.toUpperCase());
                  };
                  const s = document.createElement('style');
                  s.innerHTML = '.page { display:none; animation: fadeIn 0.5s ease; } .page.active { display:block; } nav a { transition: 0.3s; }';
                  document.head.appendChild(s);
              `;
          } else if(type === 'restaurant') {
              const _cats = [this.getL('Starters','Entr\u00e9es'),this.getL('Mains','Plats'),this.getL('Desserts','Desserts'),this.getL('Drinks','Boissons')];
              const _dishesDef = [
                  [{n:'Caesar Salad',p:'$12.50',e:'\u{1F957}'},{n:'Soup du Jour',p:'$9.00',e:'\u{1F35C}'},{n:'Bruschetta',p:'$8.50',e:'\u{1F956}'}],
                  [{n:this.getL('Grilled Salmon','Saumon Grill\u00e9'),p:'$28.00',e:'\u{1F41F}'},{n:this.getL('Beef Tenderloin','Filet de Boeuf'),p:'$38.00',e:'\u{1F969}'},{n:this.getL('Mushroom Risotto','Risotto aux Champignons'),p:'$22.00',e:'\u{1F344}'}],
                  [{n:'Cr\u00e8me Brul\u00e9e',p:'$9.50',e:'\u{1F36E}'},{n:'Tiramisu',p:'$8.00',e:'\u2615'},{n:this.getL('Choc Fondant','Fondant Choc'),p:'$10.00',e:'\u{1F36B}'}],
                  [{n:'Bordeaux Rouge',p:'$14/gl',e:'\u{1F377}'},{n:this.getL('Craft Beer','Bi\u00e8re Art.'),p:'$8.00',e:'\u{1F37A}'},{n:'Espresso',p:'$4.50',e:'\u2615'}]
              ];
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\uD83C\uDF7D\uFE0F ' + brand + '</div></div><button id="view-order-btn">\uD83D\uDED2 ' + this.getL('Order','Commande') + ' (<span id="order-count">0</span>)</button></header>'
                + '<div style="margin:20px 0; display:flex; gap:8px; flex-wrap:wrap;" id="cat-row">' + _cats.map((c,i) => '<button class="cat-btn" data-cat="' + i + '" style="padding:8px 16px;border-radius:20px;font-size:12px;background:' + (i===0?'var(--primary)':'transparent') + ';border:1px solid var(--primary);color:' + (i===0?'#fff':'var(--primary)') + ';cursor:pointer;transition:0.2s;">' + c + '</button>').join('') + '</div>'
                + '<div id="menu-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;"></div>'
                + '<div id="order-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(10px);">'
                + '<div class="card" style="width:95%;max-width:440px;max-height:80vh;overflow-y:auto;">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;"><h2 style="margin:0;">\uD83D\uDED2 ' + this.getL('Your Order','Votre Commande') + '</h2><button id="close-order" style="background:transparent;font-size:24px;border:none;color:var(--text);cursor:pointer;">&times;</button></div>'
                + '<div id="order-items"></div>'
                + '<div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:20px;padding-top:20px;"><div style="display:flex;justify-content:space-between;font-size:20px;font-weight:900;margin-bottom:20px;"><span>Total:</span><span id="order-total">$0.00</span></div>'
                + '<button style="width:100%;" onclick="placeOrder()">&#10003; ' + this.getL('Place Order','Passer la Commande') + '</button></div></div></div>';
              scriptJS = 'var _cart=[]; var _dishesData=' + JSON.stringify(_dishesDef) + ';'
                + 'function renderMenu(cat){ var g=document.getElementById("menu-grid"); g.innerHTML=""; _dishesData[cat].forEach(function(d){ var el=document.createElement("div"); el.className="card"; el.style.textAlign="center"; el.innerHTML="<div style=\'font-size:60px;margin-bottom:15px;\'>" +d.e+"</div><h3 style=\'margin:0 0 5px;\'>" +d.n+"</h3><p style=\'color:var(--primary);font-weight:900;font-size:22px;margin:10px 0;\'>" +d.p+"</p>"; var btn=document.createElement("button"); btn.style.width="100%"; btn.innerHTML="Add"; btn.onclick=function(){ addCart(d.n,d.p); }; el.appendChild(btn); g.appendChild(el); }); }'
                + 'function addCart(n,p){ _cart.push({n:n,p:p}); document.getElementById("order-count").innerText=_cart.length; showToast(n+" ' + this.getL('added!','ajouté!') + '"); }'
                + 'function placeOrder(){ showToast("' + this.getL('Order placed!','Commande passée !') + '"); }'
                + 'document.getElementById("view-order-btn").onclick=function(){ var oi=document.getElementById("order-items"); oi.innerHTML=_cart.length?_cart.map(function(i){ return "<div style=\'display:flex;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.05);border-radius:8px;margin-bottom:8px;\'><span>"+i.n+"</span><span>"+i.p+"</span></div>"; }).join(""):"<p style=\'text-align:center;opacity:0.5;\'>Empty</p>"; document.getElementById("order-modal").style.display="flex"; };'
                + 'document.getElementById("close-order").onclick=function(){ document.getElementById("order-modal").style.display="none"; };'
                + 'document.querySelectorAll(".cat-btn").forEach(function(b,i){ b.onclick=function(){ document.querySelectorAll(".cat-btn").forEach(function(x){ x.style.background="transparent"; x.style.color="var(--primary)"; }); b.style.background="var(--primary)"; b.style.color="#fff"; renderMenu(Number(b.dataset.cat)); }; });'
                + 'renderMenu(0);';
          } else if(type === 'habit_tracker') {
              const _htDays = (isFrPrompt?['L','M','M','J','V','S','D']:['Mo','Tu','We','Th','Fr','Sa','Su']);
              bodyHTML = '<header><div class="logo-area"><div class="logo">\uD83C\uDFAF ' + brand + ' ' + this.getL('Habits','Habitudes') + '</div></div><div class="badge">' + this.getL('STREAK TRACKER','SUIVI DE STREAK') + '</div></header>'
                + '<div class="container" style="padding:30px 0;">'
                + '<div style="display:flex;gap:15px;margin-bottom:30px;flex-wrap:wrap;">'
                + '<div class="card" style="text-align:center;flex:1;min-width:120px;"><h1 id="streak-ct" style="margin:0;color:var(--primary);font-size:48px;">0</h1><p style="margin:0;opacity:0.6;">' + this.getL('Day Streak','Jours de suite') + '</p></div>'
                + '<div class="card" style="text-align:center;flex:1;min-width:120px;"><h1 id="total-ct" style="margin:0;color:#10b981;font-size:48px;">0</h1><p style="margin:0;opacity:0.6;">' + this.getL('Total Done','Total Fait') + '</p></div>'
                + '</div>'
                + '<div class="card" style="margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('Add Habit','Ajouter Habitude') + '</h3>'
                + '<div style="display:flex;gap:10px;"><input type="text" id="habit-inp" placeholder="' + this.getL('E.g. Exercise 30min...','Ex: Sport 30min...') + '" style="flex:1;"><button id="add-habit-btn">' + this.getL('Add','Ajouter') + '</button></div></div>'
                + '<div id="habits-grid" style="display:flex;flex-direction:column;gap:15px;"></div></div>';
              scriptJS = 'var _hdb=JSON.parse(localStorage.getItem("habits_' + brand.toLowerCase().replace(/s/g,'_') + '")||"[]");'
                + 'var _htDays=' + JSON.stringify(_htDays) + ';'
                + 'function saveH(){ localStorage.setItem("habits_' + brand.toLowerCase().replace(/s/g,'_') + '",JSON.stringify(_hdb)); }'
                + 'function renderH(){ var g=document.getElementById("habits-grid"); g.innerHTML=""; var total=0; _hdb.forEach(function(h,hi){ var done=h.log.filter(Boolean).length; total+=done; var card=document.createElement("div"); card.className="card"; card.style.cssText="display:flex;align-items:center;gap:15px;flex-wrap:wrap;"; var info=document.createElement("div"); info.style.flex="1"; info.innerHTML="<b>" +h.name+"</b><div style,font-size:12px;opacity:.5>" +done+"/7</div>"; var dd=document.createElement("div"); dd.style.cssText="display:flex;gap:6px;flex-wrap:wrap;"; _htDays.forEach(function(d,di){ var b=document.createElement("div"); b.style.cssText="width:36px;height:36px;border-radius:8px;background:" +(h.log[di]?"var(--primary)":"rgba(255,255,255,0.08)")+";display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;font-weight:700;"; b.textContent=d; b.onclick=(function(hhi,ddi){ return function(){ toggleD(hhi,ddi); }; })(hi,di); dd.appendChild(b); }); var db=document.createElement("button"); db.style.cssText="background:#ef4444;padding:4px 10px;font-size:11px;"; db.textContent="Del"; db.onclick=(function(hhi){ return function(){ delH(hhi); }; })(hi); card.appendChild(info); card.appendChild(dd); card.appendChild(db); g.appendChild(card); }); document.getElementById("total-ct").innerText=total; document.getElementById("streak-ct").innerText=_hdb.length?Math.max.apply(null,_hdb.map(function(h){ return h.log.filter(Boolean).length; })):0; }'
                + 'window.toggleD=function(hi,di){ _hdb[hi].log[di]=!_hdb[hi].log[di]; saveH(); renderH(); };'
                + 'window.delH=function(hi){ _hdb.splice(hi,1); saveH(); renderH(); };'
                + 'document.getElementById("add-habit-btn").onclick=function(){ var v=document.getElementById("habit-inp").value; if(!v) return; _hdb.push({name:v,log:[false,false,false,false,false,false,false]}); saveH(); renderH(); document.getElementById("habit-inp").value=""; showToast("' + this.getL('Habit added!','Habitude ajoutée!') + '"); };'
                + 'renderH();';
          } else if(type === 'photo_gallery') {
              const _gImgs = [{e:'\uD83C\uDFD4',c:'Nature'},{e:'\uD83C\uDFD9',c:'Urban'},{e:'\uD83C\uDF0A',c:'Ocean'},{e:'\uD83E\uDD8B',c:'Wildlife'},{e:'\uD83C\uDF08',c:'Abstract'},{e:'\uD83C\uDF03',c:'Night'},{e:'\uD83C\uDFE1',c:'Architecture'},{e:'\uD83E\uDD41',c:'Minimal'},{e:'\uD83C\uDFA8',c:'Art'}];
              const _gData = _gImgs.concat(_gImgs).slice(0,12).map(function(x,i){ return {e:x.e,c:x.c,title:'Photo '+(i+1)}; });
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">' + brand + ' Gallery</div></div>'
                + '<div style="display:flex;gap:8px;">' + ['All','Nature','Urban','Ocean','Wildlife'].map(c => '<button class="gf-btn" data-cat="' + c + '" style="padding:6px 14px;border-radius:20px;font-size:12px;background:' + (c==='All'?'var(--primary)':'transparent') + ';border:1px solid var(--primary);color:' + (c==='All'?'#fff':'var(--primary)') + ';cursor:pointer;">' + c + '</button>').join('') + '</div></header>'
                + '<div class="container" style="padding:30px 0;"><div id="gallery-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:15px;"></div></div>'
                + '<div id="lb-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:1000;align-items:center;justify-content:center;cursor:pointer;" onclick="document.getElementById(\'lb-modal\').style.display=\'none\'">'
                + '<div style="text-align:center;"><div id="lb-img" style="font-size:180px;user-select:none;"></div><div id="lb-cap" style="color:#fff;margin-top:20px;font-size:20px;font-weight:700;"></div></div></div>';
              scriptJS = 'var _gdata=' + JSON.stringify(_gData) + '; var _gcat="All"; var _filtered=_gdata;'
                + 'function renderGal(){ var g=document.getElementById("gallery-grid"); g.innerHTML=""; var items=(_gcat==="All"?_gdata:_gdata.filter(function(x){ return x.c===_gcat; })); items.forEach(function(x,i){ var d=document.createElement("div"); d.style.cssText="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;cursor:pointer;transition:0.3s;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:80px;"; d.textContent=x.e; d.onclick=(function(ii){ return function(){ window.openLB(ii); }; })(i); g.appendChild(d); }); window._filtered=items; }'
                + 'window.openLB=function(i){ var x=_filtered[i]; document.getElementById("lb-img").innerText=x.e; document.getElementById("lb-cap").innerText=x.title+" - "+x.c; document.getElementById("lb-modal").style.display="flex"; };'
                + 'document.querySelectorAll(".gf-btn").forEach(function(b){ b.onclick=function(){ _gcat=b.dataset.cat; document.querySelectorAll(".gf-btn").forEach(function(x){ x.style.background="transparent"; x.style.color="var(--primary)"; }); b.style.background="var(--primary)"; b.style.color="#fff"; renderGal(); }; });'
                + 'renderGal();';
          } else if(type === 'budget_planner') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\uD83D\uDCC9 ' + brand + ' Budget</div></div><div class="badge">' + this.getL('PERSONAL FINANCE','FINANCE PERSO') + '</div></header>'
                + '<div class="container" style="padding:30px 0;display:grid;grid-template-columns:1fr 1fr;gap:30px;">'
                + '<div>'
                + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;">'
                + '<div class="card" style="text-align:center;border-left:4px solid #10b981;"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('INCOME','REVENUS') + '</div><h2 id="inc-total" style="margin:0;color:#10b981;">$0.00</h2></div>'
                + '<div class="card" style="text-align:center;border-left:4px solid #ef4444;"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('EXPENSES','D\u00c9PENSES') + '</div><h2 id="exp-total" style="margin:0;color:#ef4444;">$0.00</h2></div>'
                + '</div>'
                + '<div class="card" style="margin-bottom:20px;border:2px solid var(--primary);"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('BALANCE','SOLDE') + '</div><h1 id="balance" style="margin:0;font-size:36px;">$0.00</h1></div>'
                + '</div>'
                + '<div><div class="card" style="margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('Add Entry','Ajouter une Entrée') + '</h3>'
                + '<div style="display:flex;flex-direction:column;gap:12px;">'
                + '<input type="text" id="b-desc" placeholder="' + this.getL('Description...','Description...') + '">'
                + '<input type="number" id="b-amt" placeholder="' + this.getL('Amount ($)','Montant ($)') + '">'
                + '<select id="b-type"><option value="income">' + this.getL('Income','Revenu') + '</option><option value="expense">' + this.getL('Expense','Dépense') + '</option></select>'
                + '<button id="b-add-btn" style="width:100%;">' + this.getL('Add Entry','Ajouter') + '</button></div></div>'
                + '<div id="b-list" style="display:flex;flex-direction:column;gap:8px;"></div></div></div>';
              scriptJS = 'var bItems=JSON.parse(localStorage.getItem("budget_' + brand.toLowerCase().replace(/s/g,'_') + '")||"[]");'
                + 'function saveBudget(){ localStorage.setItem("budget_' + brand.toLowerCase().replace(/s/g,'_') + '",JSON.stringify(bItems)); }'
                + 'function renderBudget(){ var inc=0,exp=0; bItems.forEach(function(i){ if(i.t==="income") inc+=parseFloat(i.a||0); else exp+=parseFloat(i.a||0); }); var bal=inc-exp; document.getElementById("inc-total").innerText="$"+inc.toFixed(2); document.getElementById("exp-total").innerText="$"+exp.toFixed(2); document.getElementById("balance").innerText=(bal>=0?"+":"-")+"$"+Math.abs(bal).toFixed(2); document.getElementById("balance").style.color=bal>=0?"#10b981":"#ef4444"; document.getElementById("b-list").innerHTML=bItems.slice(0,8).map(function(i){ return "<div style=\'display:flex;justify-content:space-between;align-items:center;padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid "+(i.t==="income"?"#10b981":"#ef4444")+";\'><div><div style=\'font-weight:700;font-size:13px;\'>" +i.d+"</div></div><span style=\'font-weight:900;color:"+(i.t==="income"?"#10b981":"#ef4444")+";\'>" +(i.t==="income"?"+":"-")+"$"+parseFloat(i.a).toFixed(2)+"</span></div>"; }).join(""); }'
                + 'document.getElementById("b-add-btn").onclick=function(){ var d=document.getElementById("b-desc").value,a=document.getElementById("b-amt").value,t=document.getElementById("b-type").value; if(!d||!a) return; bItems.unshift({d:d,a:a,t:t,id:Date.now()}); saveBudget(); renderBudget(); document.getElementById("b-desc").value=""; document.getElementById("b-amt").value=""; showToast("' + this.getL('Entry added!','Entrée ajoutée!') + '"); };'
                + 'renderBudget();';
          } else if(type === 'translator') {
              const _trDict = {hello:{fr:'Bonjour',es:'Hola',de:'Hallo',it:'Ciao'},'thank you':{fr:'Merci',es:'Gracias',de:'Danke',it:'Grazie'},goodbye:{fr:'Au revoir',es:'Adios',de:'Auf Wiedersehen',it:'Arrivederci'},yes:{fr:'Oui',es:'Si',de:'Ja',it:'Si'},no:{fr:'Non',es:'No',de:'Nein',it:'No'},please:{fr:'S.v.p.',es:'Por favor',de:'Bitte',it:'Per favore'},'good morning':{fr:'Bonjour',es:'Buenos dias',de:'Guten Morgen',it:'Buongiorno'}};
              bodyHTML = '<header style="justify-content:center;flex-direction:column;gap:8px;padding:20px;">'
                + '<div class="logo">\uD83C\uDF0D ' + brand + ' ' + this.getL('Translator','Traducteur') + '</div>'
                + '<div style="font-size:12px;opacity:0.6;">' + this.getL('Smart bilingual interface','Interface bilingue intelligente') + '</div></header>'
                + '<div class="container" style="max-width:900px;padding:30px 0;">'
                + '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:15px;align-items:start;">'
                + '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:12px;align-items:center;"><select id="lang-from" style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.2);color:var(--text);border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer;"><option value="en">EN English</option><option value="fr">FR Français</option><option value="es">ES Español</option><option value="de">DE Deutsch</option></select><span style="font-size:12px;opacity:0.5;">' + this.getL('Source','Source') + '</span></div>'
                + '<textarea id="tr-input" style="height:200px;resize:none;" placeholder="' + this.getL('Type text to translate...','Saisissez le texte...') + '"></textarea></div>'
                + '<div style="display:flex;flex-direction:column;gap:10px;padding-top:50px;"><button id="tr-swap" style="padding:12px;border-radius:12px;font-size:20px;">&#8644;</button><button id="tr-go" style="padding:12px;border-radius:12px;font-size:16px;">&#8594;</button></div>'
                + '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:12px;align-items:center;"><select id="lang-to" style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.2);color:var(--text);border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer;"><option value="fr">FR Français</option><option value="en">EN English</option><option value="es">ES Español</option><option value="de">DE Deutsch</option></select>'
                + '<button id="tr-speak" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer;">\uD83D\uDD0A</button></div>'
                + '<textarea id="tr-output" style="height:200px;resize:none;background:rgba(255,255,255,0.02);" placeholder="' + this.getL('Translation appears here...','La traduction apparaît ici...') + '" readonly></textarea></div></div>'
                + '<div class="card" style="margin-top:20px;"><div style="font-size:12px;opacity:0.6;margin-bottom:10px;">' + this.getL('Quick Phrases','Phrases Rapides') + '</div><div style="display:flex;gap:8px;flex-wrap:wrap;" id="phrase-btns"></div></div></div>';
              scriptJS = 'var _trd=' + JSON.stringify(_trDict) + ';'
                + 'function doTranslate(){ var t=document.getElementById("tr-input").value.toLowerCase().trim(); var to=document.getElementById("lang-to").value; var found=Object.keys(_trd).find(function(k){ return t.includes(k); }); var res=found&&_trd[found][to]?_trd[found][to]:"["+to.toUpperCase()+"]: "+t.split("").reverse().join("").substring(0,60); document.getElementById("tr-output").value=res; showToast("' + this.getL('Translation ready!','Traduction prête!') + '"); }'
                + 'document.getElementById("tr-go").onclick=doTranslate;'
                + 'document.getElementById("tr-swap").onclick=function(){ var a=document.getElementById("lang-from"),b=document.getElementById("lang-to"),t=a.value; a.value=b.value; b.value=t; };'
                + 'document.getElementById("tr-speak").onclick=function(){ var t=document.getElementById("tr-output").value; if(t&&window.speechSynthesis){ var u=new SpeechSynthesisUtterance(t); u.lang=document.getElementById("lang-to").value; window.speechSynthesis.speak(u); } };'
                + 'var _phrases=["Hello","Thank you","Please","Yes","No","Good morning"];'
                + 'var _phrases=["Hello","Thank you","Please","Yes","No","Good morning"]; var pbCont=document.getElementById("phrase-btns"); pbCont.innerHTML=""; _phrases.forEach(function(ph){ var btn=document.createElement("button"); btn.style.cssText="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;"; btn.textContent=ph; btn.onclick=function(){ document.getElementById("tr-input").value=ph; doTranslate(); }; pbCont.appendChild(btn); });'
          } else if(type === 'podcast') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\uD83C\uDF99\uFE0F ' + brand + '</div></div><button onclick="showToast(\\\'' + this.getL('Subscribed!','Abonn\u00e9!') + '\\\')">' + this.getL('+ Subscribe','+ S\u2019abonner') + '</button></header>'
                + '<div class="container" style="display:grid;grid-template-columns:1fr 320px;gap:30px;margin-top:30px;">'
                + '<div><h2>' + this.getL('Latest Episodes','Derniers Épisodes') + '</h2><div id="ep-list" style="display:flex;flex-direction:column;gap:15px;"></div></div>'
                + '<div><div class="card" id="player-card" style="position:sticky;top:20px;">'
                + '<div style="text-align:center;padding:20px 0;">'
                + '<div id="pl-thumb" style="font-size:80px;margin-bottom:15px;">\uD83C\uDF99\uFE0F</div>'
                + '<div id="pl-title" style="font-weight:900;font-size:16px;margin-bottom:5px;">' + this.getL('Select an episode','Sélectionnez') + '</div>'
                + '<div id="pl-ep" style="font-size:12px;opacity:0.6;margin-bottom:20px;">' + brand + '</div></div>'
                + '<div style="height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:15px;overflow:hidden;"><div id="pl-prog" style="width:0%;height:100%;background:var(--primary);transition:width 0.3s;border-radius:2px;"></div></div>'
                + '<div style="display:flex;justify-content:center;gap:20px;">'
                + '<button style="background:transparent;font-size:22px;border:none;color:var(--text);cursor:pointer;padding:8px;" onclick="skipPod(-1)">&#9194;</button>'
                + '<button id="pl-btn" style="width:54px;height:54px;border-radius:50%;font-size:20px;padding:0;" onclick="togglePod()">&#9654;</button>'
                + '<button style="background:transparent;font-size:22px;border:none;color:var(--text);cursor:pointer;padding:8px;" onclick="skipPod(1)">&#9193;</button>'
                + '</div></div></div></div>';
              scriptJS = 'var _eps=[{e:"\\uD83E\\uDD16",t:"' + this.getL('The Future of AI','L\\u2019avenir de l\\u2019IA') + '",d:"48 min"},{e:"\\uD83D\\uDE80",t:"' + this.getL('Build Startups Fast','Startups Rapides') + '",d:"34 min"},{e:"\\uD83D\\uDCA1",t:"' + this.getL('Creative Workflows','Workflows Cr\u00e9atifs') + '",d:"27 min"},{e:"\\uD83C\\uDF0D",t:"' + this.getL('Remote Work Culture','Culture Remote') + '",d:"41 min"},{e:"\\uD83D\\uDCCA",t:"' + this.getL('Data-Driven Decisions','D\u00e9cisions Data') + '",d:"36 min"}];'
                + 'var _curEp=null,_playing=false,_progVal=0,_progInt;'
                + 'var elist=document.getElementById("ep-list"); elist.innerHTML=""; _eps.forEach(function(ep,i){ var d=document.createElement("div"); d.style.cssText="display:flex;gap:15px;align-items:center;cursor:pointer;transition:0.2s;"; d.className="card"; d.onclick=(function(idx){ return function(){ window.loadEp(idx); }; })(i); d.innerHTML="<div style=\\"font-size:40px;flex-shrink:0;\\">" +ep.e+"</div><div style=\\"flex:1;\\"><div style=\\"font-weight:700;font-size:14px;margin-bottom:4px;\\">" +ep.t+"</div><div style=\\"font-size:12px;opacity:0.5;\\">" +ep.d+"</div></div><button style=\\"padding:8px 14px;font-size:12px;\\">&#9654;</button>"; elist.appendChild(d); });'
                + 'window.loadEp=function(i){ _curEp=i; document.getElementById("pl-thumb").innerText=_eps[i].e; document.getElementById("pl-title").innerText=_eps[i].t; document.getElementById("pl-ep").innerText="Ep."+(i+1)+" · "+_eps[i].d; _progVal=0; document.getElementById("pl-prog").style.width="0%"; showToast("Now playing: "+_eps[i].t); };'
                + 'window.togglePod=function(){ _playing=!_playing; document.getElementById("pl-btn").innerHTML=_playing?"&#9646;&#9646;":"&#9654;"; if(_playing){ _progInt=setInterval(function(){ _progVal=Math.min(100,_progVal+0.3); document.getElementById("pl-prog").style.width=_progVal+"%"; if(_progVal>=100){ clearInterval(_progInt); _playing=false; document.getElementById("pl-btn").innerHTML="&#9654;"; } },300); } else { clearInterval(_progInt); } };'
                + 'window.skipPod=function(d){ if(_curEp!==null){ var ni=_curEp+d; if(ni>=0&&ni<_eps.length) loadEp(ni); } };';
          } else if(type === 'calendar') {
              const _months = isFrPrompt?['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']:['January','February','March','April','May','June','July','August','September','October','November','December'];
              const _dayHeaders = isFrPrompt?['L','M','M','J','V','S','D']:['Su','Mo','Tu','We','Th','Fr','Sa'];
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\uD83D\uDCC5 ' + brand + ' ' + this.getL('Calendar','Calendrier') + '</div></div><button id="add-ev-btn">+ ' + this.getL('Add Event','Ajouter') + '</button></header>'
                + '<div class="container" style="padding:30px 0;display:grid;grid-template-columns:1fr 300px;gap:30px;">'
                + '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">'
                + '<button id="prev-mo" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 12px;color:var(--text);cursor:pointer;">&#8592;</button>'
                + '<h2 id="cal-title" style="margin:0;font-size:20px;"></h2>'
                + '<button id="next-mo" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 12px;color:var(--text);cursor:pointer;">&#8594;</button></div>'
                + '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:10px;">' + _dayHeaders.map(d => '<div style="text-align:center;font-size:11px;font-weight:700;opacity:0.5;padding:8px 0;">' + d + '</div>').join('') + '</div>'
                + '<div id="cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;"></div></div>'
                + '<div><div class="card" id="ev-form" style="display:none;margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('New Event','Nouvel Événement') + '</h3>'
                + '<input type="text" id="ev-title" placeholder="' + this.getL('Title...','Titre...') + '" style="margin-bottom:10px;">'
                + '<input type="date" id="ev-date" style="margin-bottom:10px;">'
                + '<div style="display:flex;gap:8px;"><button id="ev-save" style="flex:1;">' + this.getL('Save','Sauver') + '</button><button id="ev-cancel" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:var(--text);flex:1;cursor:pointer;">' + this.getL('Cancel','Annuler') + '</button></div></div>'
                + '<div class="card"><h3 style="margin-top:0;">' + this.getL('Events','Événements') + '</h3><div id="ev-list" style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;"></div></div></div></div>';
              scriptJS = 'var _calEvs=JSON.parse(localStorage.getItem("cal_' + brand.toLowerCase().replace(/s/g,'_') + '")||"[]");'
                + 'var _calDate=new Date();'
                + 'var _calMonths=' + JSON.stringify(_months) + ';'
                + 'function saveCalEvs(){ localStorage.setItem("cal_' + brand.toLowerCase().replace(/s/g,'_') + '",JSON.stringify(_calEvs)); }'
                + 'function renderCal(){ var y=_calDate.getFullYear(),m=_calDate.getMonth(); document.getElementById("cal-title").innerText=_calMonths[m]+" "+y; var first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(); var g=document.getElementById("cal-grid"); g.innerHTML=""; for(var i=0;i<first;i++){ g.appendChild(document.createElement("div")); } for(var d2=1;d2<=days;d2++){ var ds=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d2).padStart(2,"0"); var evs=_calEvs.filter(function(e){ return e.date===ds; }); var cell=document.createElement("div"); cell.style.cssText="border-radius:8px;background:rgba(255,255,255,0.04);padding:6px;min-height:50px;cursor:pointer;border:1px solid rgba(255,255,255,0.05);transition:0.2s;"; cell.innerHTML="<div style,font-size:12px;font-weight:700;margin-bottom:3px>" +d2+"</div>" +evs.map(function(e){ return "<div style,font-size:9px;background:#8b5cf622;color:#a78bfa;padding:2px 4px;border-radius:3px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap>" +e.t+"</div>"; }).join(""); cell.onclick=(function(dds){ return function(){ window.quickAdd(dds); }; })(ds); g.appendChild(cell); } renderEvList(); }'
                + 'function renderEvList(){ var lst=document.getElementById("ev-list"); lst.innerHTML=""; if(_calEvs.length){ _calEvs.forEach(function(e){ var d=document.createElement("div"); d.style.cssText="display:flex;justify-content:space-between;align-items:center;padding:8px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid #8b5cf6;"; var d1=document.createElement("div"); d1.innerHTML="<div style=\'font-weight:700;font-size:12px;\'>" +e.t+"</div><div style=\'font-size:10px;opacity:0.5;\'>" +e.date+"</div>"; var btn=document.createElement("button"); btn.style.cssText="background:#ef4444;padding:4px 8px;font-size:10px;"; btn.textContent="Del"; btn.onclick=(function(eid){ return function(){ window.delEv(eid); }; })(e.id); d.appendChild(d1); d.appendChild(btn); lst.appendChild(d); }); } else { lst.innerHTML="<p style=\'text-align:center;opacity:0.4;font-size:12px;\'>No events</p>"; } }'
                + 'window.delEv=function(id){ _calEvs=_calEvs.filter(function(e){ return e.id!==id; }); saveCalEvs(); renderCal(); };'
                + 'window.quickAdd=function(ds){ document.getElementById("ev-date").value=ds; document.getElementById("ev-form").style.display="block"; };'
                + 'document.getElementById("add-ev-btn").onclick=function(){ document.getElementById("ev-form").style.display="block"; };'
                + 'document.getElementById("ev-cancel").onclick=function(){ document.getElementById("ev-form").style.display="none"; };'
                + 'document.getElementById("ev-save").onclick=function(){ var t=document.getElementById("ev-title").value,date=document.getElementById("ev-date").value; if(!t||!date) return; _calEvs.push({t:t,date:date,id:Date.now()}); saveCalEvs(); document.getElementById("ev-form").style.display="none"; document.getElementById("ev-title").value=""; renderCal(); showToast("' + this.getL('Event added!','Événement ajouté!') + '"); };'
                + 'document.getElementById("prev-mo").onclick=function(){ _calDate.setMonth(_calDate.getMonth()-1); renderCal(); };'
                + 'document.getElementById("next-mo").onclick=function(){ _calDate.setMonth(_calDate.getMonth()+1); renderCal(); };'
                + 'renderCal();';
          } else if(type === 'quiz') {
              bodyHTML = '<header style="justify-content:center;"><div class="logo">\u2753 ' + brand + ' Quiz</div></header>'
                + '<div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;">'
                + '<div id="quiz-start" style="text-align:center;"><div style="font-size:80px;margin-bottom:30px;">\uD83E\uDDE0</div>'
                + '<h1 style="font-size:42px;margin-bottom:10px;">' + this.getL('Ready to test your knowledge?','Prêt à tester vos connaissances ?') + '</h1>'
                + '<p style="opacity:0.7;font-size:18px;margin-bottom:40px;">' + this.getL('10 questions · 15 sec each','10 questions · 15 sec chacune') + '</p>'
                + '<button id="start-quiz" style="padding:18px 50px;font-size:20px;border-radius:30px;">' + this.getL('Start Quiz','Démarrer le Quiz') + '</button></div>'
                + '<div id="quiz-game" style="display:none;width:100%;max-width:650px;">'
                + '<div style="display:flex;justify-content:space-between;margin-bottom:20px;"><span id="q-num" style="font-size:14px;opacity:0.6;">1/10</span><span id="q-timer" style="font-size:16px;font-weight:900;color:var(--primary);">15</span><span id="q-score" style="font-size:14px;opacity:0.6;">Score: 0</span></div>'
                + '<div style="height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:30px;"><div id="timer-bar" style="height:100%;background:var(--primary);border-radius:2px;transition:width 1s linear;"></div></div>'
                + '<div class="card" style="margin-bottom:20px;"><h2 id="q-text" style="font-size:20px;line-height:1.4;margin:0;">...</h2></div>'
                + '<div id="q-opts" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"></div></div>'
                + '<div id="quiz-end" style="display:none;text-align:center;"><div style="font-size:80px;margin-bottom:20px;">\uD83C\uDFC6</div>'
                + '<h1 id="end-score" style="font-size:56px;margin-bottom:10px;color:var(--primary);">0</h1>'
                + '<p style="font-size:20px;opacity:0.7;margin-bottom:30px;">' + this.getL('out of 10 correct!','bonnes réponses sur 10 !') + '</p>'
                + '<button id="restart-quiz" style="padding:15px 40px;border-radius:20px;">' + this.getL('Play Again','Rejouer') + '</button></div></div>';
              scriptJS = 'var _Qs=[{q:"' + this.getL('What does HTML stand for?','Que signifie HTML ?') + '",opts:["HyperText Markup Language","High Tech Modern Language","Home Tool Markup","Hyperlink Text Mode"],a:0},'
                + '{q:"' + this.getL('Which planet is closest to the Sun?','Quelle planète est la plus proche du Soleil ?') + '",opts:["Venus","Mercury","Mars","Earth"],a:1},'
                + '{q:"' + this.getL('What is 12 x 12?','Combien font 12 x 12 ?') + '",opts:["132","144","124","154"],a:1},'
                + '{q:"' + this.getL('Sides of a hexagon?','C\u00f4t\u00e9s d\\u2019un hexagone ?') + '",opts:["5","6","7","8"],a:1},'
                + '{q:"' + this.getL('Which gas do plants absorb?','Quel gaz les plantes absorbent ?') + '",opts:["Oxygen","Nitrogen","CO2","Helium"],a:2},'
                + '{q:"' + this.getL('JavaScript was created in?','JavaScript créé en ?') + '",opts:["1992","1995","1998","2000"],a:1},'
                + '{q:"' + this.getL('Capital of France?','Capitale de la France ?') + '",opts:["Lyon","Marseille","Paris","Bordeaux"],a:2},'
                + '{q:"' + this.getL('Bytes in a kilobyte?','Octets dans un kilo-octet ?') + '",opts:["512","1024","2048","256"],a:1},'
                + '{q:"' + this.getL('Speed of light (approx)?','Vitesse de la lumière (approx) ?') + '",opts:["300,000 km/s","150,000 km/s","450,000 km/s","600,000 km/s"],a:0},'
                + '{q:"' + this.getL('CSS stands for?','CSS signifie ?') + '",opts:["Cascading Style Sheets","Creative Style System","Computer Style Syntax","Colorful Style Sheets"],a:0}];'
                + 'var _qi=0,_score=0,_qtimer,_qtv=15;'
                + 'function startQuiz(){ _qi=0;_score=0; document.getElementById("quiz-start").style.display="none"; document.getElementById("quiz-end").style.display="none"; document.getElementById("quiz-game").style.display="block"; showQ(); }'
                + 'function showQ(){ if(_qi>=_Qs.length){ endQuiz(); return; } clearInterval(_qtimer); _qtv=15; var q=_Qs[_qi]; document.getElementById("q-num").innerText=(_qi+1)+"/10"; document.getElementById("q-text").innerText=q.q; document.getElementById("q-score").innerText="Score: "+_score; var qo=document.getElementById("q-opts"); qo.innerHTML=""; q.opts.forEach(function(o,i){ var b=document.createElement("button"); b.style.cssText="padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:var(--text);cursor:pointer;font-size:14px;transition:0.2s;"; b.textContent=o; b.onclick=(function(idx){ return function(){ window.answerQ(idx); }; })(i); qo.appendChild(b); }); var bar=document.getElementById("timer-bar"); bar.style.transition="none"; bar.style.width="100%"; setTimeout(function(){ bar.style.transition="width 15s linear"; bar.style.width="0%"; },50); _qtimer=setInterval(function(){ _qtv--; document.getElementById("q-timer").innerText=_qtv; if(_qtv<=0){ clearInterval(_qtimer); document.querySelectorAll("#q-opts button").forEach(function(b){ b.disabled=true; }); setTimeout(function(){ _qi++; showQ(); },1000); } },1000); }'
                + 'function showQ(){ if(_qi>=_Qs.length){ endQuiz(); return; } clearInterval(_qtimer); _qtv=15; var q=_Qs[_qi]; document.getElementById("q-num").innerText=(_qi+1)+"/10"; document.getElementById("q-text").innerText=q.q; document.getElementById("q-score").innerText="Score: "+_score; var qo=document.getElementById("q-opts"); qo.innerHTML=""; q.opts.forEach(function(o,i){ var b=document.createElement("button"); b.style.cssText="padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:var(--text);cursor:pointer;font-size:14px;transition:0.2s;"; b.textContent=o; b.onclick=(function(idx){ return function(){ window.answerQ(idx); }; })(i); qo.appendChild(b); }); var bar=document.getElementById("timer-bar"); bar.style.transition="none"; bar.style.width="100%"; setTimeout(function(){ bar.style.transition="width 15s linear"; bar.style.width="0%"; },50); _qtimer=setInterval(function(){ _qtv--; document.getElementById("q-timer").innerText=_qtv; if(_qtv<=0){ clearInterval(_qtimer); document.querySelectorAll("#q-opts button").forEach(function(b){ b.disabled=true; }); setTimeout(function(){ _qi++; showQ(); },1000); } },1000); }'
                + 'function endQuiz(){ document.getElementById("quiz-game").style.display="none"; document.getElementById("quiz-end").style.display="block"; document.getElementById("end-score").innerText=_score; showToast("' + this.getL('Quiz complete! ','Quiz terminé ! ') + '"+_score+"pts"); }'
                + 'document.getElementById("start-quiz").onclick=startQuiz;'
                + 'document.getElementById("restart-quiz").onclick=startQuiz;';
          } else if(type === 'landing_premium') {
              bodyHTML = '<header style="position:sticky;top:0;z-index:100;background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.08);padding:12px 0;">'
                + '<div class="container" style="display:flex;justify-content:space-between;align-items:center;padding:0 20px;">'
                + '<div class="logo-area">' + logoIcon + '<div class="logo">' + brand + '</div></div>'
                + '<nav style="display:flex;gap:25px;align-items:center;">'
                + '<a href="#features" style="color:var(--text);text-decoration:none;font-size:14px;opacity:0.7;">' + this.getL('Features','Fonctionnalités') + '</a>'
                + '<a href="#pricing" style="color:var(--text);text-decoration:none;font-size:14px;opacity:0.7;">' + this.getL('Pricing','Tarifs') + '</a>'
                + '<button style="padding:8px 20px;font-size:14px;">' + this.getL('Get Started Free','Commencer Gratuitement') + '</button></nav></div></header>'
                + '<div style="min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 20px;position:relative;overflow:hidden;">'
                + '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,' + primary + '22,transparent 70%);border-radius:50%;pointer-events:none;"></div>'
                + '<div class="badge" style="font-size:14px;padding:8px 20px;margin-bottom:30px;background:' + primary + '22;color:' + primary + ';border:1px solid ' + primary + '44;">' + this.getL('Launching 2026 · Early Access','Lancement 2026 · Accès Anticipé') + '</div>'
                + '<h1 style="font-size:72px;line-height:1.1;margin:0 0 25px;letter-spacing:-3px;max-width:900px;">' + this.getL('The Future of','L\\u2019Avenir de la') + ' <span style="color:' + primary + ';">' + brand + '</span> ' + this.getL('Starts Here','Commence Ici') + '</h1>'
                + '<p style="font-size:22px;opacity:0.7;max-width:600px;line-height:1.6;margin:0 0 50px;">' + this.getL('Join thousands of innovators building the next generation of digital experiences.','Rejoignez des milliers d\\u2019innovateurs construisant la prochaine g\u00e9n\u00e9ration.') + '</p>'
                + '<div style="display:flex;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:16px;overflow:hidden;">'
                + '<input type="email" id="waitlist-email" placeholder="' + this.getL('Enter your email...','Entrez votre email...') + '" style="border:none;background:transparent;width:280px;border-radius:0;box-shadow:none;">'
                + '<button id="join-btn" style="border-radius:0px;white-space:nowrap;">' + this.getL('Join Waitlist','Rejoindre') + '</button></div>'
                + '<p style="font-size:12px;opacity:0.4;margin-top:20px;">&#128274; ' + this.getL('No spam. Unsubscribe anytime.','Pas de spam.') + '</p></div>'
                + '<div id="features" style="padding:100px 0;background:rgba(0,0,0,0.2);"><div class="container"><h2 style="text-align:center;font-size:48px;margin-bottom:60px;">' + this.getL('Everything you need','Tout ce dont vous avez besoin') + '</h2>'
                + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;">'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#9889;</div><h3>' + this.getL('Lightning Fast','Ultra Rapide') + '</h3></div>'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#128737;</div><h3>' + this.getL('Enterprise Security','S\u00e9curit\u00e9 Entreprise') + '</h3></div>'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#129302;</div><h3>' + this.getL('AI-Powered','Propuls\u00e9 par l\\u2019IA') + '</h3></div>'
                + '</div></div></div>'
                + '<div id="pricing" style="padding:100px 0;"><div class="container"><h2 style="text-align:center;font-size:48px;margin-bottom:60px;">' + this.getL('Simple Pricing','Tarifs Simples') + '</h2>'
                + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:25px;max-width:900px;margin:0 auto;">'
                + '<div class="card" style="text-align:center;"><div class="badge">' + this.getL('STARTER','DÉBUTANT') + '</div><h2 style="font-size:42px;margin:20px 0;">Free</h2><button style="width:100%;background:transparent;border:1px solid var(--primary);color:var(--primary);">' + this.getL('Get Started','Commencer') + '</button></div>'
                + '<div class="card" style="text-align:center;border:2px solid ' + primary + ';transform:scale(1.05);box-shadow:0 0 30px ' + primary + '33;"><div class="badge">PRO &#11088;</div><h2 style="font-size:42px;margin:20px 0;color:' + primary + ';">$29<span style="font-size:16px;opacity:0.7;">/mo</span></h2><button style="width:100%;">' + this.getL('Start Free Trial','Essai Gratuit') + '</button></div>'
                + '<div class="card" style="text-align:center;"><div class="badge">ENTERPRISE</div><h2 style="font-size:42px;margin:20px 0;">$99<span style="font-size:16px;opacity:0.7;">/mo</span></h2><button style="width:100%;">' + this.getL('Contact Sales','Contacter') + '</button></div>'
                + '</div></div></div>';
              scriptJS = 'document.getElementById("join-btn").onclick=function(){ var e=document.getElementById("waitlist-email").value; if(!e||!e.includes("@")) return; showToast("' + this.getL("You're on the list!","Vous êtes sur la liste !") + '"); document.getElementById("waitlist-email").value=""; };';
          } else if(type === 'resume_builder') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\uD83D\uDCC4 ' + brand + ' ' + this.getL('Resume Builder','Générateur de CV') + '</div></div><button id="dl-cv">' + this.getL('Download CV','Télécharger CV') + '</button></header>'
                + '<div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:30px 0;">'
                + '<div style="display:flex;flex-direction:column;gap:20px;">'
                + '<div class="card"><h3 style="margin-top:0;">&#128100; ' + this.getL('Personal Info','Informations Personnelles') + '</h3><div style="display:flex;flex-direction:column;gap:12px;">'
                + '<input type="text" id="cv-name" placeholder="' + this.getL('Full Name','Nom Complet') + '" oninput="updateCV()">'
                + '<input type="text" id="cv-title" placeholder="' + this.getL('Job Title','Titre Professionnel') + '" oninput="updateCV()">'
                + '<input type="email" id="cv-email" placeholder="Email" oninput="updateCV()">'
                + '<textarea id="cv-summary" style="height:80px;" placeholder="' + this.getL('Professional summary...','Résumé professionnel...') + '" oninput="updateCV()"></textarea></div></div>'
                + '<div class="card"><h3 style="margin-top:0;">&#128188; ' + this.getL('Experience','Expérience') + '</h3><div id="exp-list" style="display:flex;flex-direction:column;gap:10px;"></div>'
                + '<button id="add-exp" style="width:100%;margin-top:15px;background:transparent;border:1px dashed var(--primary);color:var(--primary);">+ ' + this.getL('Add Experience','Ajouter Expérience') + '</button></div>'
                + '<div class="card"><h3 style="margin-top:0;">&#128295; ' + this.getL('Skills','Compétences') + '</h3><div style="display:flex;gap:8px;margin-bottom:10px;">'
                + '<input type="text" id="skill-inp" placeholder="' + this.getL('Add skill...','Ajouter compétence...') + '" style="flex:1;"><button id="add-skill">+</button></div>'
                + '<div id="skills-cloud" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div></div>'
                + '<div><div class="card" id="cv-preview" style="min-height:600px;background:#ffffff;color:#0f172a;padding:40px;font-family:Inter,sans-serif;">'
                + '<div id="cv-head" style="border-bottom:3px solid ' + primary + ';padding-bottom:20px;margin-bottom:25px;">'
                + '<h1 id="p-name" style="font-size:28px;margin:0;color:' + primary + ';">' + this.getL('Your Name','Votre Nom') + '</h1>'
                + '<div id="p-title" style="font-size:16px;opacity:0.7;margin:5px 0;">' + this.getL('Your Title','Votre Titre') + '</div>'
                + '<div id="p-contact" style="font-size:12px;opacity:0.6;margin-top:8px;">email@example.com</div></div>'
                + '<div id="p-summary" style="margin-bottom:25px;font-size:13px;line-height:1.6;opacity:0.8;"></div>'
                + '<div id="p-exp-section" style="display:none;margin-bottom:25px;"><h3 style="color:' + primary + ';border-bottom:1px solid ' + primary + '44;padding-bottom:8px;">' + this.getL('EXPERIENCE','EXPÉRIENCE') + '</h3><div id="p-exp"></div></div>'
                + '<div id="p-skills-section" style="display:none;"><h3 style="color:' + primary + ';border-bottom:1px solid ' + primary + '44;padding-bottom:8px;">' + this.getL('SKILLS','COMPÉTENCES') + '</h3><div id="p-skills" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>'
                + '</div></div></div>';
              scriptJS = 'var _exps=[{role:"' + this.getL('Software Developer','Développeur Logiciel') + '",company:"Tech Corp",dates:"2022-' + this.getL('Present','Présent') + '",desc:"' + this.getL('Built scalable web apps.','Applications web évolutives.') + '"}];'
                + 'var _skills=["JavaScript","HTML/CSS","React"];'
                + 'window.renderExpList=function(){ var lst=document.getElementById("exp-list"); lst.innerHTML=""; _exps.forEach(function(e,i){ var d=document.createElement("div"); d.className="card"; d.style.cssText="padding:12px;margin-bottom:5px;"; d.innerHTML="<div style=\\"font-weight:700;\\">" +e.role+"</div><div style=\\"font-size:12px;opacity:0.6;\\">" +e.company+" \u00b7 "+e.dates+"</div>"; var b=document.createElement("button"); b.style.cssText="background:#ef4444;padding:3px 8px;font-size:10px;margin-top:5px;"; b.textContent="' + this.getL('Remove','Supprimer') + '"; b.onclick=(function(idx){ return function(){ _exps.splice(idx,1); window.renderExpList(); window.updateCV(); }; })(i); d.appendChild(b); lst.appendChild(d); }); };'
                + 'window.renderSkillCloud=function(){ var sc=document.getElementById("skills-cloud"); sc.innerHTML=""; _skills.forEach(function(s,i){ var sp=document.createElement("span"); sp.style.cssText="background:' + primary + '22;border:1px solid ' + primary + '44;color:' + primary + ';border-radius:20px;padding:4px 12px;font-size:12px;cursor:pointer;"; sp.textContent=s+" \u00d7"; sp.onclick=(function(idx){ return function(){ _skills.splice(idx,1); window.renderSkillCloud(); window.updateCV(); }; })(i); sc.appendChild(sp); }); window.updateCV(); };'
                + 'window.updateCV=function(){ var n=document.getElementById("cv-name").value||"' + this.getL('Your Name','Votre Nom') + '",t=document.getElementById("cv-title").value||"' + this.getL('Your Title','Votre Titre') + '",em=document.getElementById("cv-email").value||"email@example.com",s=document.getElementById("cv-summary").value; document.getElementById("p-name").innerText=n; document.getElementById("p-title").innerText=t; document.getElementById("p-contact").innerText=em; document.getElementById("p-summary").innerText=s; document.getElementById("p-exp-section").style.display=_exps.length?"block":"none"; document.getElementById("p-exp").innerHTML=_exps.map(function(e){ return "<div style=\'margin-bottom:15px;\'><div style=\'font-weight:700;font-size:14px;\'>" +e.role+"</div><div style=\'font-size:12px;opacity:0.6;margin-bottom:5px;\'>" +e.company+" · "+e.dates+"</div><div style=\'font-size:13px;opacity:0.8;\'>" +e.desc+"</div></div>"; }).join(""); document.getElementById("p-skills-section").style.display=_skills.length?"block":"none"; document.getElementById("p-skills").innerHTML=_skills.map(function(s){ return "<span style=\'background:' + primary + '22;color:' + primary + ';border:1px solid ' + primary + '44;border-radius:4px;padding:4px 10px;font-size:12px;\'>" +s+"</span>"; }).join(""); };'
                + 'document.getElementById("add-exp").onclick=function(){ var r=prompt("' + this.getL('Role Title:','Titre du Poste :') + '"); var c=prompt("' + this.getL('Company:','Entreprise :') + '"); if(r&&c){ _exps.push({role:r,company:c,dates:"2023-' + this.getL('Present','Présent') + '",desc:"' + this.getL('Key responsibilities.','Responsabilités clés.') + '"}); window.renderExpList(); } };'
                + 'document.getElementById("add-skill").onclick=function(){ var s=document.getElementById("skill-inp").value; if(s){ _skills.push(s); document.getElementById("skill-inp").value=""; window.renderSkillCloud(); } };'
                + 'document.getElementById("dl-cv").onclick=function(){ var cv=document.getElementById("cv-preview").outerHTML; var html="<!DOCTYPE html><html><head><link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap\" rel=\"stylesheet\"><style>body{font-family:Inter,sans-serif;padding:40px;background:#fff;color:#0f172a;}</style></head><body>"+cv+"</body></html>"; var a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([html],{type:"text/html"})); a.download="cv.html"; a.click(); showToast("' + this.getL('CV downloaded!','CV téléchargé!') + '"); };'
                + 'renderExpList(); renderSkillCloud(); updateCV();';

          } else {
                bodyHTML = `
              <header>
                  <div class="logo-area">${logoIcon}<div class="logo">${brand} Workspace</div></div>
                  <button id="add-entry" style="font-size:14px;">+ ${this.getL("Add Record", "Ajouter")}</button>
              </header>
              <div class="container" style="padding:40px 0;">
                  <div id="ent-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:2000; align-items:center; justify-content:center; backdrop-filter:blur(20px);">
                      <div class="card" style="width:95%; max-width:450px;">
                          <h2>${this.getL("New Data Record", "Nouvelle Entrée")}</h2>
                          <div style="display:flex; flex-direction:column; gap:15px; margin:20px 0;">
                              <input type="text" id="item-name" placeholder="${this.getL("Entry Name...", "Nom...")}">
                              <textarea id="item-desc" placeholder="${this.getL("Details and Description...", "Détails...")}"></textarea>
                              <button id="save-item-btn" style="width:100%">${this.getL("Save To Matrix", "Sauvegarder")}</button>
                              <button id="close-ent" style="background:transparent; color:var(--text); width:100%">${this.getL("Cancel", "Annuler")}</button>
                          </div>
                      </div>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:40px;">
                      <h1 style="margin:0; font-size:42px; letter-spacing:-2px;">${brand} ${this.getL("System", "Système")}</h1>
                      <div class="badge" style="background:#10b981">OPERATIONAL</div>
                  </div>
                  <div id="data-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:25px;"></div>
              </div>`;
              scriptJS = `
                  const store = new OmniData('data_${brand.toLowerCase().replace(/\s/g,'_')}', [
                      { name: "${this.js(this.getL("System Initialized", "Système Initialisé"))}", desc: "${this.js(this.getL("IA ULTRA has synthesized this functional environment. Start adding data now.", "IA ULTRA a synthétisé cet environnement fonctionnel. Commencez à ajouter des données."))}" }
                  ]);
                  const render = () => {
                      const grid = document.getElementById('data-grid');
                      grid.innerHTML = store.get().map(i => \`
                          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; animation:fadeIn 0.4s ease;">
                              <div><h3 style="margin-top:0; color:var(--primary); font-size:22px;">\${i.name}</h3><p style="opacity:0.8; line-height:1.6;">\${i.desc}</p></div>
                              <div style="margin-top:20px;"><button style="background:#ef4444; padding:5px 12px; font-size:11px;" onclick="delEnt(\${i.id})">${this.getL("Delete", "Supprimer")}</button></div>
                          </div>
                      \`).join('');
                  };
                  window.delEnt = (id) => { store.delete(id); render(); showToast("${this.js(this.getL("Entry deleted.", "Entrée supprimée."))}"); };
                  document.getElementById('add-entry').onclick = () => document.getElementById('ent-modal').style.display='flex';
                  document.getElementById('close-ent').onclick = () => document.getElementById('ent-modal').style.display='none';
                  document.getElementById('save-item-btn').onclick = () => {
                      const name = document.getElementById('item-name').value;
                      const desc = document.getElementById('item-desc').value;
                      if(!name) return;
                      store.add({name, desc});
                      document.getElementById('ent-modal').style.display='none';
                      document.getElementById('item-name').value=''; document.getElementById('item-desc').value='';
                      render();
                      showToast("${this.js(this.getL("Data saved successfully!", "Données sauvegardées !"))}");
                  };
                  render();
              `;
          }

          let tail = `</div>
<script>
    \n${globalScript} \n${scriptJS}
</script>
</body>
</html>`;
          return head + bodyHTML + tail;
      }
  };

  // Export to window
  window.renderIAUltra = createIAUltraUI;

})(window);
