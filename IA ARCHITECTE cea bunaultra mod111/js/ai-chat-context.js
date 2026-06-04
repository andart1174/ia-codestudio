/**
 * AI Chat Context — Module v1.0
 * Reads editor code, provides contextual AI chat assistance
 * EN/FR bilingual — Non-destructive
 */
(function() {
'use strict';

var TX = {
  en: {
    tab: 'AI Chat',
    title: '🤖 AI Chat Context',
    sub: 'Ask questions about your current code',
    placeholder: 'Ask about your code… (e.g. "explain the navbar", "add dark mode")',
    send: 'Send',
    clear: 'Clear',
    apply: '⚡ Apply',
    noEditor: '⚠️ Editor not ready.',
    noCode: '⚠️ No code in editor yet.',
    contextLabel: 'Context:',
    contextLines: 'lines loaded',
    thinking: '⏳ Thinking…',
    welcome: '👋 Hello! I can read your current code and help you modify it. Ask me anything!',
    copied: '✅ Applied to editor!',
    historyKey: 'ia_chat_history'
  },
  fr: {
    tab: 'Chat IA',
    title: '🤖 Chat IA Contextuel',
    sub: 'Posez des questions sur votre code actuel',
    placeholder: 'Posez une question sur votre code… (ex: "explique la navbar", "ajoute le dark mode")',
    send: 'Envoyer',
    clear: 'Effacer',
    apply: '⚡ Appliquer',
    noEditor: '⚠️ Éditeur non prêt.',
    noCode: '⚠️ Aucun code dans l\'éditeur.',
    contextLabel: 'Contexte :',
    contextLines: 'lignes chargées',
    thinking: '⏳ Analyse en cours…',
    welcome: '👋 Bonjour ! Je peux lire votre code actuel et vous aider à le modifier. Posez-moi n\'importe quelle question !',
    copied: '✅ Appliqué à l\'éditeur !',
    historyKey: 'ia_chat_history'
  }
};

function getLang() { return window.lang || 'en'; }
function t(key) { return (TX[getLang()] || TX.en)[key] || key; }
function getCode() { return window.editor ? window.editor.getValue() : ''; }
function getLines() { var c = getCode(); return c ? c.split('\n').length : 0; }

// ── Conversation History ──────────────────────────────────────────────
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(t('historyKey')) || '[]'); }
  catch(e) { return []; }
}
function saveHistory(h) {
  try { localStorage.setItem(TX.en.historyKey, JSON.stringify(h.slice(-40))); } catch(e) {}
}
function clearHistory() {
  try { localStorage.removeItem(TX.en.historyKey); } catch(e) {}
}

// ── Smart AI Response Engine ──────────────────────────────────────────
function generateAIResponse(userMsg, code, isFr) {
  var q = userMsg.toLowerCase();
  var lines = code.split('\n');
  var lineCount = lines.length;
  var hasCSS = code.includes('<style');
  var hasJS = code.includes('<script');
  var hasNav = code.includes('nav') || code.includes('navbar');
  var hasForm = code.includes('<form');
  var hasTable = code.includes('<table');
  var primaryColor = '#3b82f6';
  var cm = code.match(/color:\s*(#[a-f0-9]{3,6})/i);
  if (cm) primaryColor = cm[1];

  // --- Explain intent ---
  if (q.includes('explain') || q.includes('explique') || q.includes('what does') || q.includes('que fait') || q.includes('describe') || q.includes('décris')) {
    var parts = [];
    if (hasNav) parts.push(isFr ? '• Une barre de navigation' : '• A navigation bar');
    if (hasForm) parts.push(isFr ? '• Un formulaire de contact/saisie' : '• A form element');
    if (hasTable) parts.push(isFr ? '• Un tableau de données' : '• A data table');
    if (hasCSS) parts.push(isFr ? '• Des styles CSS inline' : '• Inline CSS styles');
    if (hasJS) parts.push(isFr ? '• De la logique JavaScript' : '• JavaScript logic');
    return {
      text: isFr
        ? '📄 Votre code (' + lineCount + ' lignes) contient :\n' + (parts.length ? parts.join('\n') : '• Du HTML standard')
        : '📄 Your code (' + lineCount + ' lines) contains:\n' + (parts.length ? parts.join('\n') : '• Standard HTML'),
      code: null
    };
  }

  // --- Dark mode ---
  if (q.includes('dark') || q.includes('sombre') || q.includes('nuit')) {
    var darkCSS = '<style id="dark-mode-ctx">\nbody { background: #0f172a !important; color: #e2e8f0 !important; }\n* { border-color: rgba(255,255,255,0.1) !important; }\n</style>';
    var darkBtn = '<button onclick="document.body.classList.toggle(\'dark\')" style="position:fixed;bottom:20px;right:20px;background:#1e293b;color:#fff;border:none;padding:10px 18px;border-radius:8px;cursor:pointer;font-weight:700;z-index:9999">🌙 Dark</button>';
    var result = code.includes('</head>') ? code.replace('</head>', darkCSS + '\n</head>') : darkCSS + '\n' + code;
    result = result.includes('</body>') ? result.replace('</body>', darkBtn + '\n</body>') : result + '\n' + darkBtn;
    return {
      text: isFr ? '🌙 J\'ai ajouté un mode sombre et un bouton de basculement à votre code.' : '🌙 I\'ve added dark mode CSS and a toggle button to your code.',
      code: result
    };
  }

  // --- Add animation ---
  if (q.includes('animation') || q.includes('animate') || q.includes('animat') || q.includes('mouvement') || q.includes('transition')) {
    var animCSS = '<style id="ctx-anim">\n@keyframes ctxFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }\nbody > *, section, .card, div { animation: ctxFadeIn 0.6s ease forwards; }\nbutton, a { transition: transform 0.2s, box-shadow 0.2s; }\nbutton:hover, a:hover { transform: translateY(-2px); }\n</style>';
    var r2 = code.includes('</head>') ? code.replace('</head>', animCSS + '\n</head>') : animCSS + '\n' + code;
    return {
      text: isFr ? '✨ Animations ajoutées ! Les éléments apparaissent en fondu et les boutons ont un effet hover.' : '✨ Animations added! Elements fade in and buttons have a hover lift effect.',
      code: r2
    };
  }

  // --- Add responsive ---
  if (q.includes('responsive') || q.includes('mobile') || q.includes('adapt') || q.includes('phone') || q.includes('téléphone')) {
    var mediaCSS = '<style id="ctx-resp">\n@media (max-width: 768px) {\n  body { padding: 10px !important; }\n  [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }\n  [style*="display:flex"] { flex-direction: column !important; }\n  h1 { font-size: 1.8rem !important; }\n  nav { flex-direction: column !important; gap: 10px !important; }\n}\n</style>';
    var viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    var r3 = code;
    if (!r3.includes('viewport')) r3 = r3.includes('<head>') ? r3.replace('<head>', '<head>\n' + viewport) : viewport + '\n' + r3;
    r3 = r3.includes('</head>') ? r3.replace('</head>', mediaCSS + '\n</head>') : r3 + '\n' + mediaCSS;
    return {
      text: isFr ? '📱 J\'ai ajouté un media query responsive pour mobile (max-width: 768px).' : '📱 I\'ve added responsive CSS media queries for mobile (max-width: 768px).',
      code: r3
    };
  }

  // --- Add button ---
  if ((q.includes('add') || q.includes('ajoute') || q.includes('crée') || q.includes('create')) && (q.includes('button') || q.includes('bouton') || q.includes('btn'))) {
    var btnHtml = '\n<button style="background:' + primaryColor + ';color:#fff;border:none;border-radius:10px;padding:12px 24px;font-weight:700;cursor:pointer;font-size:14px;margin:10px;transition:0.2s;" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">' + (isFr ? '✨ Cliquez ici' : '✨ Click Here') + '</button>';
    var r4 = code.includes('</body>') ? code.replace('</body>', btnHtml + '\n</body>') : code + '\n' + btnHtml;
    return {
      text: isFr ? '🔘 J\'ai ajouté un bouton stylisé à votre code.' : '🔘 I\'ve added a styled button to your code.',
      code: r4
    };
  }

  // --- SEO ---
  if (q.includes('seo') || q.includes('meta') || q.includes('référencement') || q.includes('search engine')) {
    var titleMatch = code.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    var pageTitle = titleMatch ? titleMatch[1] : 'My Page';
    var seoMeta = '<meta name="description" content="' + pageTitle + ' — Generated with IA Architecte">\n<meta name="keywords" content="web, design, app">\n<meta property="og:title" content="' + pageTitle + '">\n<meta property="og:description" content="Professional web application">';
    var r5 = code.includes('</head>') ? code.replace('</head>', seoMeta + '\n</head>') : seoMeta + '\n' + code;
    return {
      text: isFr ? '🔍 J\'ai ajouté les balises SEO (meta description, OG tags) à votre code.' : '🔍 I\'ve added SEO meta tags (description, OG tags) to your code.',
      code: r5
    };
  }

  // --- Fix / debug ---
  if (q.includes('fix') || q.includes('bug') || q.includes('error') || q.includes('erreur') || q.includes('broken') || q.includes('cassé') || q.includes('debug')) {
    var issues = [];
    if (!code.includes('<!DOCTYPE')) issues.push(isFr ? '• DOCTYPE manquant' : '• Missing DOCTYPE');
    if (!code.includes('charset')) issues.push(isFr ? '• Charset manquant' : '• Missing charset');
    if (!code.includes('viewport')) issues.push(isFr ? '• Viewport manquant' : '• Missing viewport');
    var openDivs = (code.match(/<div/gi) || []).length;
    var closeDivs = (code.match(/<\/div>/gi) || []).length;
    if (openDivs !== closeDivs) issues.push((isFr ? '• Div non fermés: ' : '• Unclosed divs: ') + Math.abs(openDivs - closeDivs));
    return {
      text: isFr
        ? (issues.length ? '🔧 Problèmes détectés :\n' + issues.join('\n') : '✅ Aucun problème majeur détecté dans votre code.')
        : (issues.length ? '🔧 Issues found:\n' + issues.join('\n') : '✅ No major issues detected in your code.'),
      code: null
    };
  }

  // --- Color change ---
  if (q.includes('color') || q.includes('couleur') || q.includes('colour') || q.includes('theme') || q.includes('thème')) {
    var newColor = '#8b5cf6';
    if (q.includes('red') || q.includes('rouge')) newColor = '#ef4444';
    if (q.includes('green') || q.includes('vert')) newColor = '#10b981';
    if (q.includes('blue') || q.includes('bleu')) newColor = '#3b82f6';
    if (q.includes('orange')) newColor = '#f59e0b';
    if (q.includes('pink') || q.includes('rose')) newColor = '#ec4899';
    if (q.includes('purple') || q.includes('violet')) newColor = '#8b5cf6';
    var r6 = code.replace(new RegExp(primaryColor.replace('#','\\#'), 'gi'), newColor);
    return {
      text: isFr ? '🎨 J\'ai remplacé la couleur principale par ' + newColor + '.' : '🎨 I\'ve replaced the primary color with ' + newColor + '.',
      code: r6
    };
  }

  // --- Navbar questions ---
  if (q.includes('navbar') || q.includes('navigation') || q.includes('menu') || q.includes('nav')) {
    if (!hasNav) {
      var navHtml = '<nav style="background:rgba(0,0,0,0.8);backdrop-filter:blur(15px);border-bottom:1px solid rgba(255,255,255,0.1);padding:14px 30px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100;">\n  <div style="font-weight:900;font-size:18px;color:' + primaryColor + '">Brand</div>\n  <div style="display:flex;gap:20px;">\n    <a href="#" style="color:#94a3b8;text-decoration:none;">' + (isFr ? 'Accueil' : 'Home') + '</a>\n    <a href="#" style="color:#94a3b8;text-decoration:none;">' + (isFr ? 'À propos' : 'About') + '</a>\n    <a href="#" style="color:#94a3b8;text-decoration:none;">Contact</a>\n  </div>\n</nav>';
      var r7 = code.includes('<body>') ? code.replace('<body>', '<body>\n' + navHtml) : navHtml + '\n' + code;
      return { text: isFr ? '🔗 J\'ai ajouté une navbar glassmorphism à votre code.' : '🔗 I\'ve added a glassmorphism navbar to your code.', code: r7 };
    } else {
      return { text: isFr ? '✅ Votre code contient déjà une navbar. Voulez-vous que je la modifie ?' : '✅ Your code already has a navbar. Would you like me to modify it?', code: null };
    }
  }

  // --- Footer ---
  if (q.includes('footer') || q.includes('pied de page')) {
    var footerHtml = '\n<footer style="background:rgba(0,0,0,0.5);border-top:1px solid rgba(255,255,255,0.08);padding:30px;text-align:center;font-size:12px;color:#64748b;">\n  © 2026 — ' + (isFr ? 'Créé avec IA Architecte' : 'Built with IA Architecte') + '\n</footer>';
    var r8 = code.includes('</body>') ? code.replace('</body>', footerHtml + '\n</body>') : code + '\n' + footerHtml;
    return { text: isFr ? '🔻 J\'ai ajouté un footer à votre code.' : '🔻 I\'ve added a footer to your code.', code: r8 };
  }

  // --- Stats / count lines ---
  if (q.includes('stats') || q.includes('lines') || q.includes('lignes') || q.includes('how many') || q.includes('combien') || q.includes('size') || q.includes('taille')) {
    var kb = (new Blob([code]).size / 1024).toFixed(1);
    var tags = (code.match(/<[a-z]+/gi) || []).length;
    return {
      text: isFr
        ? '📊 Statistiques de votre code :\n• ' + lineCount + ' lignes\n• ' + kb + ' KB\n• ~' + tags + ' balises HTML'
        : '📊 Your code statistics:\n• ' + lineCount + ' lines\n• ' + kb + ' KB\n• ~' + tags + ' HTML tags',
      code: null
    };
  }

  // --- Default fallback ---
  return {
    text: isFr
      ? '🤖 J\'ai analysé vos ' + lineCount + ' lignes. Je peux vous aider avec :\n• Expliquer le code\n• Ajouter dark mode, animations, responsive\n• Corriger les erreurs\n• Changer les couleurs\n• Ajouter navbar, footer, boutons\n• Analyser les stats SEO\n\nQue souhaitez-vous faire ?'
      : '🤖 I\'ve analyzed your ' + lineCount + ' lines. I can help with:\n• Explaining the code\n• Adding dark mode, animations, responsive CSS\n• Fixing errors\n• Changing colors\n• Adding navbar, footer, buttons\n• Analyzing SEO stats\n\nWhat would you like to do?',
    code: null
  };
}

// ── Render ────────────────────────────────────────────────────────────
function renderChatTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  var l = getLang();
  var isFr = l === 'fr';
  var history = loadHistory();
  var lines = getLines();

  parent.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.2);flex-shrink:0;';
  hdr.innerHTML =
    '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div>' +
    '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>' +
    '<div style="margin-top:6px;display:flex;align-items:center;gap:6px;">' +
      '<span style="font-size:9px;font-weight:700;color:#475569;">' + t('contextLabel') + '</span>' +
      '<span id="ctx-line-count" style="font-size:9px;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3);padding:1px 8px;border-radius:10px;font-weight:700;">' +
        (lines > 0 ? lines + ' ' + t('contextLines') : t('noCode')) +
      '</span>' +
    '</div>';
  wrap.appendChild(hdr);

  // Messages area
  var msgs = document.createElement('div');
  msgs.id = 'aichat-msgs';
  msgs.style = 'flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px;';

  function renderMessages(list) {
    msgs.innerHTML = '';
    if (list.length === 0) {
      var welcome = document.createElement('div');
      welcome.style = 'background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:10px;padding:10px 12px;font-size:11px;color:#94a3b8;line-height:1.6;';
      welcome.textContent = t('welcome');
      msgs.appendChild(welcome);
    }
    list.forEach(function(msg) {
      var el = document.createElement('div');
      if (msg.role === 'user') {
        el.style = 'background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25);border-radius:10px 10px 4px 10px;padding:8px 11px;font-size:11px;color:#93c5fd;text-align:right;line-height:1.5;word-break:break-word;';
        el.textContent = msg.text;
      } else {
        el.style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px 10px 10px 4px;padding:8px 11px;font-size:11px;color:#e2e8f0;line-height:1.6;word-break:break-word;';
        var pre = document.createElement('pre');
        pre.style = 'margin:0;font-family:Inter,sans-serif;white-space:pre-wrap;font-size:11px;';
        pre.textContent = msg.text;
        el.appendChild(pre);
        if (msg.code) {
          var applyBtn = document.createElement('button');
          applyBtn.textContent = t('apply');
          applyBtn.style = 'margin-top:7px;width:100%;background:linear-gradient(135deg,#10b981,#06b6d4);border:none;border-radius:7px;padding:7px;color:#fff;font-weight:900;font-size:10px;cursor:pointer;';
          (function(c) {
            applyBtn.onclick = function() {
              if (window.editor) {
                window.editor.setValue(c);
                if (window.runPreview) window.runPreview();
                if (window.showToast) window.showToast(t('copied'));
              }
            };
          })(msg.code);
          el.appendChild(applyBtn);
        }
      }
      msgs.appendChild(el);
    });
    msgs.scrollTop = msgs.scrollHeight;
  }

  renderMessages(history);
  wrap.appendChild(msgs);

  // Input area
  var inputArea = document.createElement('div');
  inputArea.style = 'padding:10px 12px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;display:flex;flex-direction:column;gap:6px;';

  var textarea = document.createElement('textarea');
  textarea.id = 'aichat-input';
  textarea.placeholder = t('placeholder');
  textarea.rows = 2;
  textarea.style = 'width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(16,185,129,0.25);border-radius:8px;padding:8px 10px;color:#fff;font-size:11px;outline:none;resize:none;font-family:Inter,sans-serif;box-sizing:border-box;';

  var btnRow = document.createElement('div');
  btnRow.style = 'display:flex;gap:6px;';

  var sendBtn = document.createElement('button');
  sendBtn.id = 'aichat-send';
  sendBtn.textContent = t('send');
  sendBtn.style = 'flex:1;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:8px;padding:9px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';

  var clearBtn = document.createElement('button');
  clearBtn.textContent = t('clear');
  clearBtn.style = 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:9px 12px;color:#94a3b8;font-size:11px;cursor:pointer;font-weight:700;';

  btnRow.appendChild(sendBtn);
  btnRow.appendChild(clearBtn);
  inputArea.appendChild(textarea);
  inputArea.appendChild(btnRow);
  wrap.appendChild(inputArea);
  parent.appendChild(wrap);

  // Event: send
  function doSend() {
    var val = textarea.value.trim();
    if (!val) return;
    var code = getCode();
    if (!code) { if (window.showToast) window.showToast(t('noCode')); return; }

    var h = loadHistory();
    h.push({ role: 'user', text: val });
    saveHistory(h);

    // Thinking indicator
    var thinking = document.createElement('div');
    thinking.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:8px 11px;font-size:11px;color:#475569;font-style:italic;';
    thinking.textContent = t('thinking');
    msgs.appendChild(thinking);
    msgs.scrollTop = msgs.scrollHeight;

    textarea.value = '';

    setTimeout(function() {
      var resp = generateAIResponse(val, code, isFr);
      h = loadHistory();
      h.push({ role: 'ai', text: resp.text, code: resp.code || null });
      saveHistory(h);
      renderMessages(h);
      // Update context line count
      var ctxEl = document.getElementById('ctx-line-count');
      if (ctxEl) ctxEl.textContent = getLines() + ' ' + t('contextLines');
    }, 600);
  }

  sendBtn.onclick = doSend;
  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
  });
  clearBtn.onclick = function() {
    clearHistory();
    renderMessages([]);
  };
}

// ── Hook into tab system ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Hook applyLang
  var origApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof origApplyLang === 'function') origApplyLang();
    var el = document.getElementById('lbl-tab-aichat');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'aichat') renderChatTab();
  };

  // Hook renderTab
  var origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'aichat') {
      window.activeTab = 'aichat';
      document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-aichat');
      if (btn) btn.classList.add('active');
      renderChatTab();
      return;
    }
    if (typeof origRenderTab === 'function') origRenderTab(tab);
  };
});

})();
