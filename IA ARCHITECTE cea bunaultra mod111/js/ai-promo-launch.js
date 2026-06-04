(function() {
'use strict';
var t_promo = {
  en: {
    title: '🚀 AI Promo Launch', sub: 'Auto-generate marketing posts from your code',
    generate: '✨ Generate Campaign',
    urlLabel: 'Your app URL (replaces link.com):',
    urlPh: 'https://my-app.netlify.app',
    tw: '𝕏 Twitter / X', fb: '📘 LinkedIn / Facebook', ph: '🚀 Product Hunt',
    tk: '🎵 TikTok Script', email: '📧 Email Subject', ig: '📸 Instagram Caption', wa: '💬 WhatsApp',
    copy: '📋 Copy', copied: '✅ Copied!',
    step1: 'Analyzing your code...', step2: 'Calculating virality score...', step3: 'Writing posts...',
    noCode: 'No code found in editor. Write some HTML first.'
  },
  fr: {
    title: '🚀 Lancement IA Promo', sub: 'Générez des posts marketing depuis votre code',
    generate: '✨ Générer la Campagne',
    urlLabel: 'URL de votre app (remplace lien.com) :',
    urlPh: 'https://mon-app.netlify.app',
    tw: '𝕏 Twitter / X', fb: '📘 LinkedIn / Facebook', ph: '🚀 Product Hunt',
    tk: '🎵 Script TikTok', email: '📧 Objet Email', ig: '📸 Instagram', wa: '💬 WhatsApp',
    copy: '📋 Copier', copied: '✅ Copié!',
    step1: 'Analyse du code...', step2: 'Calcul du score de viralité...', step3: 'Rédaction des posts...',
    noCode: 'Aucun code dans l\'éditeur. Écrivez du HTML d\'abord.'
  }
};
var promoUserUrl = '';
function gl() { return window.lang || 'en'; }
function t(k) { return t_promo[gl()][k] || k; }

// ─── Smart Code Analyzer ───────────────────────────────────────────────
function analyzeProject(code) {
  var low = code.toLowerCase();
  var isFr = gl() === 'fr';

  // Detect category
  var category = 'web';
  var emoji = '💻';
  var adjectives, actions, targets;

  if (low.includes('crypto') || low.includes('blockchain') || low.includes('nft') || low.includes('web3')) {
    category = 'crypto'; emoji = '🪙';
  } else if (low.includes('shop') || low.includes('cart') || low.includes('price') || low.includes('buy') || low.includes('boutique')) {
    category = 'ecommerce'; emoji = '🛒';
  } else if (low.includes('three.js') || low.includes('scene') || low.includes('webgl')) {
    category = '3d'; emoji = '🌐';
  } else if (low.includes('dashboard') || low.includes('analytics') || low.includes('admin')) {
    category = 'dashboard'; emoji = '📊';
  } else if (low.includes('portfolio') || low.includes('gallery') || low.includes('showcase')) {
    category = 'portfolio'; emoji = '🎨';
  } else if (low.includes('blog') || low.includes('article') || low.includes('post')) {
    category = 'blog'; emoji = '✍️';
  } else if (low.includes('restaurant') || low.includes('menu') || low.includes('food')) {
    category = 'restaurant'; emoji = '🍽️';
  } else if (low.includes('ai') || low.includes('machine') || low.includes('model')) {
    category = 'ai'; emoji = '🤖';
  }

  // Extract name from title/h1
  var nameMatch = code.match(/<title>(.*?)<\/title>/i) || code.match(/<h1[^>]*>(.*?)<\/h1>/i);
  var name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g,'').trim() : (isFr ? 'Mon App' : 'My App');
  
  // Extract h2 for context
  var h2Match = code.match(/<h2[^>]*>(.*?)<\/h2>/i);
  var subContext = h2Match ? h2Match[1].replace(/<[^>]+>/g,'').trim() : '';

  // Count interactive elements
  var btnCount = (code.match(/<button/gi)||[]).length;
  var hasForm = /<form/i.test(code);
  var hasAnim = /animation|transition|keyframe/i.test(code);
  var isResponsive = /viewport|grid|flex|responsive|vw|vh/i.test(code);
  var pageCount = (code.match(/class="ia-page"/g)||[]).length || 1;
  
  // Calculate Virality / Quality Score
  var viralityScore = 40; 
  if(hasAnim) viralityScore += 15;
  if(isResponsive) viralityScore += 15;
  if(hasForm) viralityScore += 10;
  if(btnCount > 2) viralityScore += 10;
  if(code.length > 2000) viralityScore += 5;
  if(code.includes('linear-gradient') || code.includes('box-shadow')) viralityScore += 5;
  if(viralityScore > 99) viralityScore = 99;

  return { category, emoji, name, subContext, btnCount, hasForm, hasAnim, isResponsive, pageCount, isFr, viralityScore };
}

// ─── Content Generator ─────────────────────────────────────────────────
function generatePosts(info) {
  var n = info.name;
  var e = info.emoji;
  var cat = info.category;
  var isFr = info.isFr;

  var CATS = {
    crypto: {
      en: { noun: 'crypto platform', adj: 'decentralized', tags: '#Web3 #Crypto #DeFi #Blockchain', hook: 'The future of finance is here.' },
      fr: { noun: 'plateforme crypto', adj: 'décentralisée', tags: '#Web3 #Crypto #DeFi #Blockchain', hook: 'L\'avenir de la finance est là.' }
    },
    ecommerce: {
      en: { noun: 'online store', adj: 'lightning-fast', tags: '#Ecommerce #Shop #OnlineBusiness #Sales', hook: 'Shopping just got better.' },
      fr: { noun: 'boutique en ligne', adj: 'ultra-rapide', tags: '#Ecommerce #Boutique #VenteEnLigne', hook: 'Le shopping vient de changer.' }
    },
    '3d': {
      en: { noun: '3D web experience', adj: 'immersive', tags: '#WebGL #ThreeJS #3D #Interactive', hook: 'Welcome to the third dimension.' },
      fr: { noun: 'expérience web 3D', adj: 'immersive', tags: '#WebGL #ThreeJS #3D #Interactif', hook: 'Bienvenue dans la troisième dimension.' }
    },
    dashboard: {
      en: { noun: 'analytics dashboard', adj: 'powerful', tags: '#Dashboard #Analytics #DataViz #SaaS', hook: 'Data-driven decisions start here.' },
      fr: { noun: 'tableau de bord analytique', adj: 'puissant', tags: '#Dashboard #Analytique #DataViz #SaaS', hook: 'Les décisions data-driven commencent ici.' }
    },
    portfolio: {
      en: { noun: 'creative portfolio', adj: 'stunning', tags: '#Portfolio #Design #Creative #WebDesign', hook: 'Show the world your talent.' },
      fr: { noun: 'portfolio créatif', adj: 'époustouflant', tags: '#Portfolio #Design #Créatif #WebDesign', hook: 'Montrez votre talent au monde.' }
    },
    blog: {
      en: { noun: 'blog platform', adj: 'modern', tags: '#Blog #Content #Writing #Publishing', hook: 'Stories worth reading.' },
      fr: { noun: 'plateforme de blog', adj: 'moderne', tags: '#Blog #Contenu #Écriture #Publication', hook: 'Des histoires qui méritent d\'être lues.' }
    },
    restaurant: {
      en: { noun: 'restaurant website', adj: 'delicious', tags: '#Restaurant #Food #FoodTech #Menu', hook: 'Taste starts online.' },
      fr: { noun: 'site restaurant', adj: 'savoureux', tags: '#Restaurant #Food #FoodTech #Menu', hook: 'Le goût commence en ligne.' }
    },
    ai: {
      en: { noun: 'AI application', adj: 'intelligent', tags: '#AI #MachineLearning #Innovation #Tech', hook: 'Intelligence meets design.' },
      fr: { noun: 'application IA', adj: 'intelligente', tags: '#IA #MachineLearning #Innovation #Tech', hook: 'L\'intelligence rencontre le design.' }
    },
    web: {
      en: { noun: 'web application', adj: 'sleek', tags: '#WebDev #HTML #CSS #Frontend', hook: 'Great design meets great code.' },
      fr: { noun: 'application web', adj: 'élégante', tags: '#WebDev #HTML #CSS #Frontend', hook: 'Le bon design rencontre le bon code.' }
    }
  };

  var d = CATS[cat][isFr?'fr':'en'];
  var features = [];
  if (info.isResponsive) features.push(isFr?'✅ Design responsive':'✅ Responsive design');
  if (info.hasAnim)      features.push(isFr?'✅ Animations fluides':'✅ Smooth animations');
  if (info.hasForm)      features.push(isFr?'✅ Formulaires interactifs':'✅ Interactive forms');
  if (info.pageCount > 1) features.push(isFr?('✅ ' + info.pageCount + ' pages'):('✅ ' + info.pageCount + ' pages'));
  if (info.btnCount > 0) features.push(isFr?'✅ Interface interactive':'✅ Interactive UI');
  if (features.length === 0) features.push(isFr?'✅ Interface moderne':'✅ Modern interface');

  var featStr = features.slice(0,3).join('\n');
  var subLine = info.subContext ? ('\nCore feature: ' + info.subContext + '\n') : '';
  var subLineFr = info.subContext ? ('\nFonctionnalité clé: ' + info.subContext + '\n') : '';

  var url = promoUserUrl || (isFr ? 'votre-lien.com' : 'your-link.com');
  var tw, fb, ph, tk, em, ig, wa;

  if (isFr) {
    tw = e + ' Viens de lancer "' + n + '" — une ' + d.noun + ' ' + d.adj + ' !\n\n' +
         featStr + '\n' + subLineFr +
         '\n' + d.hook + '\n\n🔗 ' + url + '\n\n' + d.tags;

    fb = '🎉 Je suis ravi d\'annoncer le lancement de "' + n + '" !\n\n' +
         'J\'ai construit cette ' + d.noun + ' ' + d.adj + ' avec IA Architecte Studio.\n\n' +
         featStr + '\n' + subLineFr +
         '\n' + d.hook + '\n\n👉 ' + url + '\n\n' + d.tags;

    ph = '🔺 "' + n + '" est en direct sur Product Hunt !\n\n' +
         'Salut les Hunters 👋\n\nJ\'ai créé cette ' + d.noun + ' parce que ' +
         (info.hasForm ? 'les formulaires lents frustraient mes utilisateurs.' : 'le problème n\'était pas résolu élégamment.') + '\n\n' +
         featStr + '\n\n' + d.hook + '\n\n🙏 Un upvote aide vraiment ! 👇\n' + url;

    tk = '✅ Sec 0-3 (Hook) :\n"' + d.hook + ' Tu DOIS voir ça."\n\n' +
         '✅ Sec 3-8 (Problème) :\n"Avant, ' + (info.hasForm?'les formulaires prenaient des minutes':'ça prenait des heures') + '."\n\n' +
         '✅ Sec 8-20 (Solution) :\n"Voici ' + n + ' — ' + d.adj + ' et ' + d.noun + '."\n\n' +
         '✅ Sec 20-30 (Fonctionnalités) :\n' + features.slice(0,2).join('\n') + '\n\n' +
         '✅ Fin (CTA) :\n"Lien dans ma bio — ' + url + '"';

    em = d.hook.replace('.','') + ' — "' + n + '" est maintenant disponible !';

    ig = d.hook + ' 🔥\n\n' +
         'Nouvelle ' + d.noun + ' lancée : "' + n + '" ✨\n\n' +
         featStr + '\n\n' +
         '👉 Lien dans la bio\n\n' +
         d.tags + ' #launch #buildinpublic #indiehacker';

    wa = '👋 Salut !\n\nJ\'ai lancé "' + n + '" — une ' + d.noun + ' ' + d.adj + '.\n\n' +
         features.slice(0,2).join('\n') + '\n\n' +
         d.hook + '\n\n🔗 ' + url + '\n\nDis-moi ce que tu en penses !';

  } else {
    tw = e + ' Just launched "' + n + '" — a ' + d.adj + ' ' + d.noun + '!\n\n' +
         featStr + '\n' + subLine +
         '\n' + d.hook + '\n\n🔗 ' + url + '\n\n' + d.tags;

    fb = '🎉 Thrilled to announce the launch of "' + n + '"!\n\n' +
         'It\'s a ' + d.adj + ' ' + d.noun + ' built with IA Architecte Studio.\n\n' +
         featStr + '\n' + subLine +
         '\n' + d.hook + '\n\nCheck it out 👉 ' + url + '\n\n' + d.tags;

    ph = '🔺 "' + n + '" is live on Product Hunt!\n\n' +
         'Hey Hunters 👋\n\nI built this ' + d.noun + ' because ' +
         (info.hasForm ? 'slow forms were killing conversions.' : 'the problem wasn\'t solved elegantly.') + '\n\n' +
         featStr + '\n\n' + d.hook + '\n\n🙏 An upvote really helps! 👇\n' + url;

    tk = '✅ Sec 0-3 (Hook):\n"' + d.hook + ' You NEED to see this."\n\n' +
         '✅ Sec 3-8 (Problem):\n"Before, ' + (info.hasForm?'forms took forever':'it took hours') + '."\n\n' +
         '✅ Sec 8-20 (Solution):\n"Meet ' + n + ' — ' + d.adj + ' ' + d.noun + '."\n\n' +
         '✅ Sec 20-30 (Features):\n' + features.slice(0,2).join('\n') + '\n\n' +
         '✅ End (CTA):\n"Link in bio — ' + url + '"';

    em = d.hook.replace('.','') + ' — "' + n + '" is now live!';

    ig = d.hook + ' 🔥\n\n' +
         'New ' + d.noun + ' dropped: "' + n + '" ✨\n\n' +
         featStr + '\n\n' +
         '👉 Link in bio\n\n' +
         d.tags + ' #launch #buildinpublic #indiehacker';

    wa = '👋 Hey!\n\nI just launched "' + n + '" — a ' + d.adj + ' ' + d.noun + '.\n\n' +
         features.slice(0,2).join('\n') + '\n\n' +
         d.hook + '\n\n🔗 ' + url + '\n\nLet me know what you think!';
  }

  return { tw, fb, ph, tk, em, ig, wa, score: info.viralityScore };
}

// ─── Render ────────────────────────────────────────────────────────────
var cachedResults = null;
var isLoading = false;

function renderPromoTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(236,72,153,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fb7185;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // URL input field
  var urlLbl = document.createElement('div'); urlLbl.style='font-size:9px;color:#64748b;font-weight:600;'; urlLbl.textContent=t('urlLabel'); body.appendChild(urlLbl);
  var urlInp = document.createElement('input'); urlInp.type='url'; urlInp.placeholder=t('urlPh'); urlInp.value=promoUserUrl;
  urlInp.style='width:100%;background:#0f172a;color:#e2e8f0;border:1px solid rgba(236,72,153,0.25);padding:7px 10px;border-radius:7px;font-size:10px;outline:none;box-sizing:border-box;';
  urlInp.oninput=function(){promoUserUrl=this.value.trim();};
  body.appendChild(urlInp);

  var genBtn = document.createElement('button');
  genBtn.innerHTML = isLoading ? '⏳ ...' : t('generate');
  genBtn.style = 'width:100%;background:linear-gradient(135deg,#ec4899,#e11d48);color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 15px rgba(236,72,153,0.3);';
  genBtn.onclick = function() {
    promoUserUrl = urlInp.value.trim();
    if (!window.editor) return;
    var code = window.editor.getValue();
    if (!code || !code.trim()) {
      if (window.showToast) window.showToast(t('noCode'));
      return;
    }
    isLoading = true;
    renderPromoTab();

    // Animate steps
    var steps = [t('step1'), t('step2'), t('step3')];
    var si = 0;
    var statusEl = document.getElementById('promo-status');
    var iv = setInterval(function() {
      if (statusEl) statusEl.textContent = steps[si % steps.length];
      si++;
    }, 600);

    setTimeout(function() {
      clearInterval(iv);
      var info = analyzeProject(code);
      cachedResults = generatePosts(info);
      isLoading = false;
      renderPromoTab();
    }, 1800);
  };
  body.appendChild(genBtn);

  if (isLoading) {
    var statusEl = document.createElement('div');
    statusEl.id = 'promo-status';
    statusEl.style = 'text-align:center;color:#ec4899;font-size:11px;padding:15px;animation:pulse 1.5s infinite;';
    statusEl.textContent = t('step1');
    body.appendChild(statusEl);
  }

  if (cachedResults && !isLoading) {
    var scoreWrap = document.createElement('div');
    scoreWrap.style = 'background:linear-gradient(90deg, rgba(236,72,153,0.1), rgba(225,29,72,0.1));border-radius:8px;padding:12px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(236,72,153,0.3);';
    var scoreText = document.createElement('div');
    scoreText.style = 'font-size:11px;color:#fce7f3;font-weight:bold;';
    scoreText.innerHTML = (gl()==='fr'?'📈 Score de Viralité IA :':'📈 AI Virality Score:') + '<br><span style="font-size:9px;color:#f472b6;font-weight:normal;">' + (gl()==='fr'?'Basé sur UI/UX & animations':'Based on UI/UX & animations') + '</span>';
    var scoreValue = document.createElement('div');
    var sColor = cachedResults.score > 80 ? '#10b981' : (cachedResults.score > 60 ? '#f59e0b' : '#ef4444');
    scoreValue.style = 'font-size:24px;font-weight:900;color:' + sColor + ';text-shadow:0 0 10px ' + sColor + '50;';
    scoreValue.textContent = cachedResults.score + '/100';
    scoreWrap.appendChild(scoreText); scoreWrap.appendChild(scoreValue);
    body.appendChild(scoreWrap);

    var cards = [
      { label: t('tw'),    text: cachedResults.tw,  color: '#1d9bf0' },
      { label: t('fb'),    text: cachedResults.fb,  color: '#0a66c2' },
      { label: t('ph'),    text: cachedResults.ph,  color: '#da552f' },
      { label: t('tk'),    text: cachedResults.tk,  color: '#ee1d52' },
      { label: t('ig'),    text: cachedResults.ig,  color: '#e1306c' },
      { label: t('wa'),    text: cachedResults.wa,  color: '#25d366' },
      { label: t('email'), text: cachedResults.em,  color: '#10b981' }
    ];

    cards.forEach(function(card) {
      var outer = document.createElement('div');
      outer.style = 'border-radius:10px;overflow:hidden;border:2px solid ' + card.color + '60;margin-bottom:2px;';

      // Header bar
      var header = document.createElement('div');
      header.style = [
        'background:' + card.color,
        'padding:8px 12px',
        'display:flex',
        'justify-content:space-between',
        'align-items:center'
      ].join(';');

      var lbl = document.createElement('span');
      lbl.style = 'font-size:12px;font-weight:900;color:#fff;';
      lbl.textContent = card.label;

      var cpBtn = document.createElement('button');
      cpBtn.textContent = '📋 ' + t('copy');
      cpBtn.style = 'background:rgba(255,255,255,0.25);border:1px solid rgba(255,255,255,0.5);color:#fff;font-size:10px;font-weight:700;padding:4px 10px;border-radius:5px;cursor:pointer;';
      cpBtn.onclick = function(e){
        e.stopPropagation();
        navigator.clipboard.writeText(card.text);
        cpBtn.textContent = '✅ ' + t('copied');
        setTimeout(function(){ cpBtn.textContent = '📋 ' + t('copy'); }, 2000);
      };

      header.appendChild(lbl);
      header.appendChild(cpBtn);
      outer.appendChild(header);

      // TEXT BODY — white text on dark, always fully visible
      var textBody = document.createElement('div');
      textBody.style = [
        'background:#0f172a',
        'color:#f1f5f9',
        'font-size:12px',
        'line-height:1.8',
        'padding:12px 14px',
        'white-space:pre-wrap',
        'word-break:break-word',
        'font-family:-apple-system,system-ui,sans-serif'
      ].join(';');
      textBody.textContent = card.text;
      outer.appendChild(textBody);

      body.appendChild(outer);
    });
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);

  // Auto-generate on tab open if editor has code
  if (!cachedResults && !isLoading && window.editor) {
    var edCode = window.editor.getValue();
    if (edCode && edCode.trim().length > 50) {
      setTimeout(function(){ genBtn.click(); }, 400);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-promo');
    if(el) el.textContent = t('title').replace('🚀 ','');
    if(window.activeTab==='promo') renderPromoTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='promo') {
      window.activeTab='promo';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn=document.getElementById('tab-promo'); if(btn) btn.classList.add('active');
      renderPromoTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
