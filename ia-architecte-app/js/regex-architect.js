// ==========================================
// RegEx Architect (Visual RegEx Builder)
// IA Architecte - Premium Phase 4
// ==========================================

(function() {
  const originalRenderTab = window.renderTab;

  window.renderTab = function(tab) {
    if (tab === 'regex') {
      window.activeTab = 'regex';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-regex');
      if(btn) btn.classList.add('active');

      const content = document.getElementById('left-body');
      
      const lang = window.appLang || 'en';
      const t = {
        title: lang === 'fr' ? 'RegEx Architect' : 'RegEx Architect',
        subtitle: lang === 'fr' ? 'Construisez et testez des expressions régulières.' : 'Build and test regular expressions visually.',
        templates: lang === 'fr' ? 'Modèles Rapides' : 'Quick Templates',
        testStr: lang === 'fr' ? 'Chaîne de test' : 'Test String',
        testBtn: lang === 'fr' ? '🧪 Tester Regex' : '🧪 Test Regex',
        injectBtn: lang === 'fr' ? 'Injecter Snippet JS' : 'Inject JS Snippet'
      };

      const templates = [
        { name: 'Email Validation', rx: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', test: 'test@example.com' },
        { name: 'Strong Password', rx: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', test: 'Pass1234' },
        { name: 'URL / Link', rx: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$', test: 'https://example.com' },
        { name: 'Hex Color', rx: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', test: '#ff0033' },
        { name: 'Phone Number (Intl)', rx: '^\\+?[1-9]\\d{1,14}$', test: '+1234567890' }
      ];

      content.innerHTML = `
        <div class="glass-panel" style="display:flex; flex-direction:column; height:100%; color:#fff; background:linear-gradient(135deg, #042f2e, #134e4a);">
          
          <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <h2 style="margin:0; font-size:20px; color:#2dd4bf; display:flex; align-items:center; gap:10px;">
              🧩 ${t.title}
            </h2>
            <p style="margin:5px 0 0; color:#99f6e4; font-size:12px;">${t.subtitle}</p>
          </div>

          <div style="padding:20px; overflow-y:auto; flex:1;">
            
            <div style="margin-bottom:20px;">
              <label style="display:block; font-size:12px; margin-bottom:5px; color:#5eead4;">${t.templates}</label>
              <select id="rx-template" style="width:100%; padding:8px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(45,212,191,0.3); color:white; font-size:12px; outline:none;" onchange="loadRxTemplate()">
                <option value="">-- Custom --</option>
                ${templates.map((tpl, i) => `<option value="${i}">${tpl.name}</option>`).join('')}
              </select>
            </div>

            <div style="margin-bottom:15px;">
              <label style="display:block; font-size:12px; margin-bottom:5px; color:#5eead4;">Regex Pattern</label>
              <div style="display:flex; align-items:center; background:rgba(0,0,0,0.5); border-radius:6px; border:1px solid #14b8a6; padding:5px;">
                <span style="color:#2dd4bf; font-weight:bold; padding:0 5px;">/</span>
                <input type="text" id="rx-pattern" value="[A-Z]\\w+" style="flex:1; background:transparent; border:none; color:#fff; font-family:monospace; outline:none;">
                <span style="color:#2dd4bf; font-weight:bold; padding:0 5px;">/</span>
                <input type="text" id="rx-flags" value="g" style="width:30px; background:transparent; border:none; color:#facc15; font-family:monospace; outline:none;" title="Flags (g, i, m)">
              </div>
            </div>

            <div style="margin-bottom:15px;">
              <label style="display:block; font-size:12px; margin-bottom:5px; color:#5eead4;">${t.testStr}</label>
              <textarea id="rx-test" style="width:100%; height:80px; padding:8px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(45,212,191,0.3); color:white; font-family:monospace; font-size:13px; outline:none; resize:none;">Hello World, testing Regex Architect!</textarea>
            </div>

            <button onclick="testRegex()" style="width:100%; background:linear-gradient(90deg, #0d9488, #14b8a6); color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(20,184,166,0.3); transition:0.2s; margin-bottom:15px;">
              ${t.testBtn}
            </button>

            <div id="rx-result" style="background:rgba(0,0,0,0.4); border-radius:6px; padding:10px; min-height:50px; font-family:monospace; font-size:13px; color:#cbd5e1; word-wrap:break-word; border:1px solid rgba(255,255,255,0.05); margin-bottom:20px;">
              <!-- Results go here -->
            </div>

            <button onclick="injectRegexSnippet()" style="width:100%; background:rgba(255,255,255,0.1); color:#2dd4bf; border:1px solid #2dd4bf; padding:10px; border-radius:8px; font-weight:bold; cursor:pointer; transition:0.2s;">
              ${t.injectBtn}
            </button>
            
          </div>
        </div>
      `;

      window.rxData = templates;

      window.loadRxTemplate = function() {
        const sel = document.getElementById('rx-template').value;
        if(sel !== '') {
          const tpl = window.rxData[sel];
          document.getElementById('rx-pattern').value = tpl.rx;
          document.getElementById('rx-test').value = tpl.test;
          document.getElementById('rx-flags').value = '';
          window.testRegex();
        }
      };

      window.testRegex = function() {
        const pat = document.getElementById('rx-pattern').value;
        const flg = document.getElementById('rx-flags').value;
        const str = document.getElementById('rx-test').value;
        const resDiv = document.getElementById('rx-result');

        if(!pat) { resDiv.innerHTML = '<span style="color:#f87171;">Empty regex</span>'; return; }

        try {
          const re = new RegExp(pat, flg);
          
          if(flg.includes('g')) {
             let matches = str.match(re);
             if(!matches) {
               resDiv.innerHTML = '<span style="color:#94a3b8;">No matches found.</span>';
             } else {
               // Highlight matches
               let highlighted = str.replace(re, match => `<mark style="background:#f59e0b; color:#000; border-radius:2px; padding:0 2px;">${match}</mark>`);
               resDiv.innerHTML = highlighted + `<br><br><span style="color:#4ade80;">Found ${matches.length} match(es).</span>`;
             }
          } else {
             let match = re.exec(str);
             if(!match) {
               resDiv.innerHTML = '<span style="color:#94a3b8;">No match found.</span>';
             } else {
               resDiv.innerHTML = `<span style="color:#4ade80;">Match found!</span><br>Full match: <mark style="background:#f59e0b; color:#000;">${match[0]}</mark>`;
               if(match.length > 1) {
                  resDiv.innerHTML += `<br><br>Capture Groups:<br>` + match.slice(1).map((g,i) => `[${i+1}]: ${g}`).join('<br>');
               }
             }
          }
        } catch(e) {
          resDiv.innerHTML = `<span style="color:#f87171;">Error: ${e.message}</span>`;
        }
      };

      window.injectRegexSnippet = function() {
        const pat = document.getElementById('rx-pattern').value;
        const flg = document.getElementById('rx-flags').value;
        
        const snippet = `\n<script>
// Regex Architect Snippet
function validateRegex(str) {
  const regex = new RegExp("${pat.replace(/\\/g, '\\\\')}", "${flg}");
  return regex.test(str);
}
</script>\n`;

        if (window.editor) {
            const cur = window.editor.getValue();
            if (cur.includes('</body>')) {
              window.editor.setValue(cur.replace('</body>', snippet + '</body>'));
            } else {
              window.editor.setValue(cur + snippet);
            }
            if(typeof window.showToast === 'function') window.showToast(lang === 'fr' ? 'Snippet Injecté!' : 'Snippet Injected!');
        }
      };

      // Initial test run
      setTimeout(window.testRegex, 100);

    } else if (originalRenderTab) {
      originalRenderTab(tab);
    }
  };
})();
