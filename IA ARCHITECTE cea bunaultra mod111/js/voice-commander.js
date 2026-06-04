(function() {
'use strict';
var t_voc = {
  en: {
    tab: 'Voice AI', title: '🎙️ Voice-to-Code Commander', sub: 'Dictate → Generate HTML/JS instantly',
    listen: '🎙️ Tap to Speak', listening: '🔴 Listening...', processing: '⏳ Processing...',
    example1: 'Try: "Add a blue navigation bar with three links"',
    example2: 'Try: "Create a red hero section with a button"',
    example3: 'Try: "Add a pricing table with three plans"',
    history: 'Recent commands:',
    noSupport: 'No mic support — using text input',
    typePrompt: 'Type your command:'
  },
  fr: {
    tab: 'IA Vocale', title: '🎙️ IA Vocale', sub: 'Dictez → Générez du HTML/JS instantanément',
    listen: '🎙️ Appuyer pour Parler', listening: '🔴 Écoute...', processing: '⏳ Traitement...',
    example1: 'Essayez : "Ajoute une barre de navigation bleue"',
    example2: 'Essayez : "Crée une section hero rouge avec un bouton"',
    example3: 'Essayez : "Ajoute un tableau de tarifs avec trois plans"',
    history: 'Commandes récentes :',
    noSupport: 'Pas de micro — saisie texte activée',
    typePrompt: 'Tapez votre commande :'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_voc[gl()][k] || k; }

var VOICE_STATE = 'idle';
var history = [];

// Smart voice-to-HTML engine
function voiceToCode(transcript) {
  var p = (transcript || '').toLowerCase();
  var isFr = gl() === 'fr';
  var color = '#3b82f6';
  
  // Detect color
  var colorMap = {
    red: '#ef4444', rouge: '#ef4444', blue: '#3b82f6', bleu: '#3b82f6',
    green: '#10b981', vert: '#10b981', purple: '#8b5cf6', violet: '#8b5cf6',
    yellow: '#f59e0b', jaune: '#f59e0b', pink: '#ec4899', rose: '#ec4899',
    orange: '#f97316', black: '#1e293b', noir: '#1e293b', white: '#f8fafc', blanc: '#f8fafc'
  };
  Object.keys(colorMap).forEach(function(c) {
    if (p.includes(c)) color = colorMap[c];
  });

  var textColor = (color === '#f8fafc' || color === '#f59e0b') ? '#1e293b' : '#ffffff';
  var darkColor = shadeColor(color, -40);

  // NAVIGATION BAR
  if (p.includes('nav') || p.includes('navigation') || p.includes('menu') || p.includes('barre de nav')) {
    var links = detectLinks(p);
    return '<nav style="background:linear-gradient(90deg,' + color + ',' + darkColor + ');padding:15px 30px;display:flex;justify-content:space-between;align-items:center;color:' + textColor + ';font-family:sans-serif;box-shadow:0 4px 15px rgba(0,0,0,0.3);">\n' +
           '  <div style="font-weight:900;font-size:20px;">BRAND</div>\n' +
           '  <div style="display:flex;gap:25px;">\n' +
           links.map(function(l) { return '    <a href="#" style="color:' + textColor + ';text-decoration:none;font-weight:600;">' + l + '</a>'; }).join('\n') +
           '\n  </div>\n</nav>';
  }

  // HERO SECTION
  if (p.includes('hero') || p.includes('header') || p.includes('en-tête') || p.includes('entête')) {
    var hasBtn = p.includes('button') || p.includes('bouton') || p.includes('cta');
    return '<header style="padding:100px 10%;background:linear-gradient(135deg,' + color + '20,' + darkColor + '10);text-align:center;font-family:sans-serif;border-bottom:1px solid ' + color + '40;">\n' +
           '  <h1 style="font-size:3.5rem;font-weight:900;margin-bottom:20px;background:linear-gradient(90deg,' + color + ',#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Your Title Here</h1>\n' +
           '  <p style="font-size:1.2rem;color:#94a3b8;max-width:600px;margin:0 auto 30px;">Transform your ideas into reality with our powerful platform.</p>\n' +
           (hasBtn ? '  <button style="padding:15px 40px;background:' + color + ';color:#fff;border:none;border-radius:50px;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 8px 25px ' + color + '50;">Get Started</button>\n' : '') +
           '</header>';
  }

  // PRICING TABLE
  if (p.includes('pric') || p.includes('tarif') || p.includes('plan') || p.includes('abonnement')) {
    return '<section style="padding:80px 5%;background:#0f172a;font-family:sans-serif;">\n' +
           '  <h2 style="text-align:center;color:#fff;font-size:2rem;margin-bottom:40px;">Choose Your Plan</h2>\n' +
           '  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:auto;">\n' +
           ['Starter','Pro','Elite'].map(function(plan, i) {
             var prices = ['$9','$29','$79'];
             var active = i === 1;
             return '    <div style="background:' + (active ? color : '#1e293b') + ';padding:40px 25px;border-radius:16px;text-align:center;border:1px solid ' + (active ? 'transparent' : '#334155') + ';color:#fff;">\n' +
                    '      <h3 style="margin:0 0 10px;">' + plan + '</h3>\n' +
                    '      <div style="font-size:2.5rem;font-weight:900;margin:15px 0;">' + prices[i] + '<span style="font-size:1rem;">/mo</span></div>\n' +
                    '      <button style="width:100%;padding:12px;background:' + (active ? '#fff' : color) + ';color:' + (active ? color : '#fff') + ';border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Select</button>\n' +
                    '    </div>';
           }).join('\n') +
           '\n  </div>\n</section>';
  }

  // CARD / FEATURE GRID
  if (p.includes('card') || p.includes('carte') || p.includes('feature') || p.includes('grid') || p.includes('grille')) {
    return '<section style="padding:60px 5%;background:#0f172a;font-family:sans-serif;">\n' +
           '  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;">\n' +
           ['🚀 Fast','🔒 Secure','⚡ Smart','🎨 Beautiful'].map(function(f) {
             return '    <div style="background:#1e293b;padding:30px;border-radius:12px;text-align:center;border:1px solid ' + color + '30;color:#fff;">\n' +
                    '      <div style="font-size:2rem;margin-bottom:10px;">' + f.split(' ')[0] + '</div>\n' +
                    '      <h3 style="margin:0 0 8px;color:' + color + ';">' + f.split(' ').slice(1).join(' ') + '</h3>\n' +
                    '      <p style="color:#64748b;font-size:0.9rem;margin:0;">A powerful feature for your app.</p>\n' +
                    '    </div>';
           }).join('\n') +
           '\n  </div>\n</section>';
  }

  // CONTACT FORM
  if (p.includes('contact') || p.includes('form') || p.includes('formulaire')) {
    return '<section style="padding:80px 10%;background:#0f172a;font-family:sans-serif;">\n' +
           '  <h2 style="text-align:center;color:#fff;margin-bottom:30px;">Contact Us</h2>\n' +
           '  <form style="max-width:500px;margin:auto;display:flex;flex-direction:column;gap:15px;" onsubmit="event.preventDefault();alert(\'Message sent!\');this.reset();">\n' +
           '    <input type="text" placeholder="Your Name" style="padding:14px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:8px;">\n' +
           '    <input type="email" placeholder="Email Address" style="padding:14px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:8px;">\n' +
           '    <textarea placeholder="Your message..." style="padding:14px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:8px;height:100px;resize:none;"></textarea>\n' +
           '    <button type="submit" style="padding:14px;background:' + color + ';color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Send Message</button>\n' +
           '  </form>\n</section>';
  }

  // FOOTER
  if (p.includes('footer') || p.includes('pied de page')) {
    return '<footer style="padding:50px 10%;background:#05070a;color:#475569;font-family:sans-serif;text-align:center;border-top:1px solid #1e293b;">\n' +
           '  <div style="color:' + color + ';font-size:1.5rem;font-weight:900;margin-bottom:15px;">BRAND</div>\n' +
           '  <div style="display:flex;justify-content:center;gap:20px;margin-bottom:15px;">\n' +
           '    <a href="#" style="color:#64748b;text-decoration:none;">Privacy</a>\n' +
           '    <a href="#" style="color:#64748b;text-decoration:none;">Terms</a>\n' +
           '    <a href="#" style="color:#64748b;text-decoration:none;">Contact</a>\n' +
           '  </div>\n' +
           '  <div>© ' + new Date().getFullYear() + ' BRAND. All rights reserved.</div>\n' +
           '</footer>';
  }

  // BUTTON
  if (p.includes('button') || p.includes('bouton') || p.includes('btn')) {
    return '<div style="padding:20px;text-align:center;">\n' +
           '  <button id="voice-btn" style="padding:15px 40px;background:' + color + ';color:#fff;border:none;border-radius:50px;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 8px 25px ' + color + '50;transition:transform 0.2s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">Click Me</button>\n' +
           '</div>';
  }

  // GENERIC / SECTION fallback
  return '<section style="padding:60px 10%;background:' + color + '15;border-left:4px solid ' + color + ';font-family:sans-serif;margin:10px 0;">\n' +
         '  <h2 style="color:' + color + ';margin:0 0 10px;">' + transcript + '</h2>\n' +
         '  <p style="color:#94a3b8;margin:0;">Generated by Voice AI Commander</p>\n' +
         '</section>';
}

function shadeColor(color, amt) {
  var num = parseInt(color.replace('#',''), 16);
  var r = Math.min(255, Math.max(0, (num >> 16) + amt));
  var g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  var b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return '#' + [r,g,b].map(function(v) { return v.toString(16).padStart(2,'0'); }).join('');
}

function detectLinks(text) {
  var defaults = ['Home', 'About', 'Contact'];
  var frDefaults = ['Accueil', 'À Propos', 'Contact'];
  var custom = [];
  var words = text.split(/[\s,]+/);
  var linkWords = ['home', 'about', 'contact', 'services', 'portfolio', 'blog', 'pricing', 'accueil', 'propos', 'services', 'blog'];
  words.forEach(function(w) {
    var wl = w.toLowerCase();
    if (linkWords.indexOf(wl) !== -1 && custom.indexOf(w) === -1) {
      custom.push(w.charAt(0).toUpperCase() + w.slice(1));
    }
  });
  if (custom.length >= 2) return custom.slice(0, 4);
  return gl() === 'fr' ? frDefaults : defaults;
}

function injectCode(transcript) {
  var code = voiceToCode(transcript);
  if (!window.editor) return;
  var current = window.editor.getValue();
  if (current.includes('<body>')) {
    window.editor.setValue(current.replace('<body>', '<body>\n' + code));
  } else if (current.includes('</body>')) {
    window.editor.setValue(current.replace('</body>', '\n' + code + '\n</body>'));
  } else {
    window.editor.setValue(current + '\n' + code);
  }
  if (window.runPreview) window.runPreview();
  if (window.showToast) window.showToast(gl()==='fr'?'Code injecté!':'Code injected!');
  history.unshift(transcript);
  if (history.length > 5) history.pop();
}

function renderVoiceTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;display:flex;flex-direction:column;align-items:center;padding:15px;overflow-y:auto;gap:10px;';

  // MIC BUTTON
  var micWrapper = document.createElement('div');
  micWrapper.style = 'position:relative;width:90px;height:90px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
  if (VOICE_STATE === 'listening') {
    var ripple = document.createElement('div');
    ripple.style = 'position:absolute;inset:0;border-radius:50%;background:rgba(239,68,68,0.3);animation:ping 1.5s ease infinite;';
    micWrapper.appendChild(ripple);
  }
  var micBtn = document.createElement('div');
  micBtn.style = 'width:65px;height:65px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;background:' +
    (VOICE_STATE==='idle'?'linear-gradient(135deg,#3b82f6,#1d4ed8)':VOICE_STATE==='listening'?'linear-gradient(135deg,#ef4444,#b91c1c)':'linear-gradient(135deg,#f59e0b,#d97706)') +
    ';color:#fff;box-shadow:0 8px 20px rgba(0,0,0,0.4);';
  micBtn.title = gl()==='fr'?'Cliquer pour parler':'Click to speak';
  micBtn.innerHTML = VOICE_STATE==='idle'?'🎙️':VOICE_STATE==='listening'?'🔴':'⏳';
  micWrapper.appendChild(micBtn);

  var statusTxt = document.createElement('div');
  statusTxt.style = 'font-size:11px;font-weight:bold;color:' + (VOICE_STATE==='idle'?'#64748b':VOICE_STATE==='listening'?'#ef4444':'#f59e0b') + ';margin-bottom:2px;';
  statusTxt.textContent = VOICE_STATE==='idle'?t('listen'):VOICE_STATE==='listening'?t('listening'):t('processing');

  micWrapper.onclick = function() {
    if (VOICE_STATE !== 'idle') return;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      var rec = new SR();
      rec.lang = gl()==='fr'?'fr-FR':'en-US';
      rec.onstart = function() { VOICE_STATE='listening'; renderVoiceTab(); };
      rec.onresult = function(e) {
        var tr = e.results[0][0].transcript;
        var inp = document.getElementById('voice-text-inp');
        if(inp) inp.value = tr;
        VOICE_STATE='processing'; renderVoiceTab();
        setTimeout(function() { injectCode(tr); VOICE_STATE='idle'; renderVoiceTab(); }, 600);
      };
      rec.onerror = function(err) {
        console.warn('Voice error:', err.error);
        VOICE_STATE='idle'; renderVoiceTab();
        var errMsg = err.error;
        if(err.error === 'not-allowed') errMsg = gl()==='fr'?'Accès refusé. Vérifiez les permissions.':'Access denied. Check permissions.';
        else if(err.error === 'network') errMsg = gl()==='fr'?'Erreur réseau (file:// n\'est pas supporté).':'Network error (file:// not supported).';
        else if(err.error === 'no-speech') errMsg = gl()==='fr'?'Aucun son détecté.':'No speech detected.';
        if(window.showToast) window.showToast('🎙️ Error: ' + errMsg);
      };
      try {
        rec.start();
      } catch(e) {
        VOICE_STATE='idle'; renderVoiceTab();
        if(window.showToast) window.showToast('🎙️ Start error: ' + e.message);
      }
    } else {
      if(window.showToast) window.showToast(t('noSupport'));
    }
  };

  body.appendChild(micWrapper);
  body.appendChild(statusTxt);

  // ── TEXT INPUT FALLBACK (always visible) ──────────────────
  var textBox = document.createElement('div');
  textBox.style = 'width:100%;display:flex;flex-direction:column;gap:6px;';

  var textLabel = document.createElement('div');
  textLabel.style = 'font-size:9px;color:#475569;text-align:center;';
  textLabel.textContent = gl()==='fr'?'— ou tapez votre commande ci-dessous —':'— or type your command below —';
  textBox.appendChild(textLabel);

  var inp = document.createElement('input');
  inp.id = 'voice-text-inp';
  inp.placeholder = gl()==='fr'?'ex: ajoute une nav bleue...':'e.g. add a blue navbar...';
  inp.style = 'width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:9px 10px;border-radius:8px;font-size:11px;box-sizing:border-box;outline:none;';
  inp.onkeydown = function(e) { if(e.key==='Enter') { var v=this.value.trim(); if(v){injectCode(v);this.value='';renderVoiceTab();} } };
  textBox.appendChild(inp);

  var sendBtn = document.createElement('button');
  sendBtn.innerHTML = '⚡ ' + (gl()==='fr'?'Générer':'Generate');
  sendBtn.style = 'width:100%;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#fff;border:none;padding:9px;border-radius:8px;font-weight:bold;font-size:11px;cursor:pointer;';
  sendBtn.onclick = function() {
    var v = inp.value.trim();
    if(!v){ if(window.showToast) window.showToast(gl()==='fr'?'Entrez une commande':'Enter a command'); return; }
    injectCode(v); inp.value=''; renderVoiceTab();
  };
  textBox.appendChild(sendBtn);
  body.appendChild(textBox);

  // Examples (clickable chips)
  var exWrap = document.createElement('div');
  exWrap.style = 'width:100%;display:flex;flex-direction:column;gap:4px;';
  var exLabel = document.createElement('div');
  exLabel.style = 'font-size:9px;color:#475569;margin-bottom:2px;';
  exLabel.textContent = gl()==='fr'?'Exemples rapides :':'Quick examples:';
  exWrap.appendChild(exLabel);
  [t('example1'), t('example2'), t('example3')].forEach(function(ex) {
    var chip = document.createElement('div');
    chip.style = 'font-size:10px;color:#94a3b8;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px dashed rgba(255,255,255,0.08);cursor:pointer;';
    chip.textContent = ex;
    chip.onmouseover = function(){this.style.borderColor='#3b82f6';this.style.color='#60a5fa';};
    chip.onmouseout  = function(){this.style.borderColor='rgba(255,255,255,0.08)';this.style.color='#94a3b8';};
    chip.onclick = function() {
      var cmd = ex.replace(/^[^"]*"/, '').replace(/".*$/, '');
      injectCode(cmd); renderVoiceTab();
    };
    exWrap.appendChild(chip);
  });
  body.appendChild(exWrap);

  // History
  if (history.length > 0) {
    var histLabel = document.createElement('div');
    histLabel.style = 'font-size:10px;font-weight:bold;color:#475569;align-self:flex-start;margin-top:8px;';
    histLabel.textContent = t('history');
    body.appendChild(histLabel);
    history.forEach(function(cmd) {
      var hItem = document.createElement('div');
      hItem.style = 'width:100%;font-size:10px;color:#94a3b8;padding:5px 8px;background:#1e293b;border-radius:5px;cursor:pointer;border:1px solid #334155;display:flex;justify-content:space-between;';
      hItem.innerHTML = '<span>' + cmd + '</span><span style="color:#3b82f6;">↻</span>';
      hItem.onclick = function() { injectCode(cmd); renderVoiceTab(); };
      body.appendChild(hItem);
    });
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el = document.getElementById('lbl-tab-voice'); if(el) el.textContent = t('tab'); if(window.activeTab==='voice') renderVoiceTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='voice') { window.activeTab='voice'; document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');}); var el=document.getElementById('tab-voice'); if(el) el.classList.add('active'); renderVoiceTab(); return; }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
