// ==========================================
// Timeline FX Studio Module
// IA Architecte - Premium Phase 4
// ==========================================

(function() {
  const originalRenderTab = window.renderTab;

  window.renderTab = function(tab) {
    if (tab === 'timeline') {
      window.activeTab = 'timeline';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-timeline');
      if(btn) btn.classList.add('active');

      const content = document.getElementById('left-body');
      
      const lang = window.appLang || 'en';
      const t = {
        title: lang === 'fr' ? 'Studio Timeline FX' : 'Timeline FX Studio',
        subtitle: lang === 'fr' ? 'Animații CSS complexe stil After Effects' : 'After Effects style complex CSS animations',
        targetSel: lang === 'fr' ? 'Sélecteur CSS (ex: .box)' : 'CSS Selector (e.g. .box)',
        duration: lang === 'fr' ? 'Durée (sec)' : 'Duration (sec)',
        easing: lang === 'fr' ? 'Type (Easing)' : 'Easing',
        addKeyframe: lang === 'fr' ? '+ Ajouter Clé' : '+ Add Keyframe',
        generate: lang === 'fr' ? '🚀 Générer CSS' : '🚀 Generate CSS',
        play: lang === 'fr' ? '▶ Jouer' : '▶ Play',
        propX: 'X (px)', propY: 'Y (px)', propS: 'Scale', propR: 'Rotate (deg)', propO: 'Opacity'
      };

      // State
      window.timelineData = window.timelineData || [
        { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 100, x: 100, y: 0, scale: 1.2, rotate: 90, opacity: 0 }
      ];

      function renderKeyframes() {
        // Sort by percent
        window.timelineData.sort((a, b) => a.percent - b.percent);
        
        let html = '';
        window.timelineData.forEach((kf, index) => {
          html += `
            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:8px; margin-bottom:8px; position:relative;">
              <div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center;">
                <div style="font-weight:bold; color:#f472b6;">
                  <input type="number" min="0" max="100" value="${kf.percent}" onchange="updateKf(${index}, 'percent', this.value)" style="width:50px; background:transparent; border:1px solid rgba(244,114,182,0.4); color:#f472b6; border-radius:4px; padding:2px 5px; text-align:center;"> %
                </div>
                ${index > 0 && index < window.timelineData.length - 1 ? `<button onclick="removeKf(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer;">✕</button>` : ''}
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:5px;">
                <label style="font-size:10px; color:#cbd5e1; display:flex; justify-content:space-between;">X: <input type="number" value="${kf.x}" onchange="updateKf(${index}, 'x', this.value)" style="width:45px; background:rgba(0,0,0,0.3); border:none; color:white; padding:2px; border-radius:3px;"></label>
                <label style="font-size:10px; color:#cbd5e1; display:flex; justify-content:space-between;">Y: <input type="number" value="${kf.y}" onchange="updateKf(${index}, 'y', this.value)" style="width:45px; background:rgba(0,0,0,0.3); border:none; color:white; padding:2px; border-radius:3px;"></label>
                <label style="font-size:10px; color:#cbd5e1; display:flex; justify-content:space-between;">Scale: <input type="number" step="0.1" value="${kf.scale}" onchange="updateKf(${index}, 'scale', this.value)" style="width:45px; background:rgba(0,0,0,0.3); border:none; color:white; padding:2px; border-radius:3px;"></label>
                <label style="font-size:10px; color:#cbd5e1; display:flex; justify-content:space-between;">Rot: <input type="number" value="${kf.rotate}" onchange="updateKf(${index}, 'rotate', this.value)" style="width:45px; background:rgba(0,0,0,0.3); border:none; color:white; padding:2px; border-radius:3px;"></label>
                <label style="font-size:10px; color:#cbd5e1; display:flex; justify-content:space-between; grid-column:span 2;">Opacity: <input type="number" step="0.1" min="0" max="1" value="${kf.opacity}" onchange="updateKf(${index}, 'opacity', this.value)" style="width:100px; background:rgba(0,0,0,0.3); border:none; color:white; padding:2px; border-radius:3px;"></label>
              </div>
            </div>
          `;
        });
        return html;
      }

      content.innerHTML = `
        <div class="glass-panel" style="display:flex; flex-direction:column; height:100%; color:#fff; background:linear-gradient(135deg, #18181b, #3f1d38);">
          <!-- Header -->
          <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); flex-shrink:0;">
            <h2 style="margin:0; font-size:20px; color:#f472b6; display:flex; align-items:center; gap:10px;">
              🎞️ ${t.title}
            </h2>
            <p style="margin:5px 0 0; color:#cbd5e1; font-size:12px;">${t.subtitle}</p>
          </div>

          <!-- Main Layout -->
          <div style="padding:20px; overflow-y:auto; flex:1;">
            
            <div style="margin-bottom:15px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="display:block; font-size:12px; margin-bottom:5px; color:#94a3b8;">${t.targetSel}</label>
                <input type="text" id="tl-selector" value=".anim-box" style="width:100%; padding:8px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(244,114,182,0.3); color:white; font-family:monospace; font-size:12px; outline:none;">
              </div>
              <div>
                <label style="display:block; font-size:12px; margin-bottom:5px; color:#94a3b8;">${t.duration}</label>
                <input type="number" id="tl-duration" value="2" step="0.5" style="width:100%; padding:8px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(244,114,182,0.3); color:white; font-size:12px; outline:none;">
              </div>
            </div>

            <div style="margin-bottom:15px;">
              <label style="display:block; font-size:12px; margin-bottom:5px; color:#94a3b8;">${t.easing}</label>
              <select id="tl-easing" style="width:100%; padding:8px; border-radius:6px; background:rgba(0,0,0,0.3); border:1px solid rgba(244,114,182,0.3); color:white; font-size:12px; outline:none; appearance:none;">
                <option value="ease-in-out">Ease In-Out</option>
                <option value="linear">Linear</option>
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bouncy (Back)</option>
                <option value="cubic-bezier(0.25, 1, 0.5, 1)">Snappy (Out-Quart)</option>
              </select>
            </div>

            <!-- Keyframes Container -->
            <div style="background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; margin-bottom:15px; border:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <strong style="color:#e2e8f0; font-size:13px;">Keyframes (Timeline)</strong>
                <button onclick="addKf()" style="background:rgba(244,114,182,0.2); color:#f472b6; border:1px solid #f472b6; padding:4px 8px; border-radius:4px; font-size:10px; cursor:pointer; font-weight:bold;">${t.addKeyframe}</button>
              </div>
              <div id="kf-list">
                ${renderKeyframes()}
              </div>
            </div>

            <div style="display:flex; gap:10px;">
              <button onclick="playTimeline()" style="flex:1; background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid #4ade80; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 0 10px rgba(34,197,94,0.1); transition:0.2s;">
                ${t.play}
              </button>
              <button onclick="generateTimelineCss()" style="flex:2; background:linear-gradient(90deg, #db2777, #ec4899); color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(236,72,153,0.3); transition:0.2s;">
                ${t.generate}
              </button>
            </div>
            
            <div style="margin-top:15px; font-size:11px; color:#94a3b8; text-align:center;">
              ${lang === 'fr' ? 'Avertissement: Assurez-vous que la classe existe dans l\'éditeur pour tester le Play.' : 'Tip: Make sure the class exists in the editor to test Play.'}
            </div>
          </div>
        </div>
      `;

      // Helper functions for UI
      window.updateKf = function(index, field, value) {
        // Convert comma to dot for languages like Romanian/French
        if (typeof value === 'string') value = value.replace(',', '.');
        window.timelineData[index][field] = parseFloat(value);
        if(field === 'percent') {
          document.getElementById('kf-list').innerHTML = renderKeyframes();
        }
      };

      window.addKf = function() {
        const last = window.timelineData[window.timelineData.length - 1];
        let newPercent = 50;
        
        if (window.timelineData.length > 0) {
          const maxP = Math.max(...window.timelineData.map(k => k.percent));
          if (maxP < 100) newPercent = Math.min(100, maxP + 10);
          else {
            // Find a gap
            const existing = window.timelineData.map(k => k.percent);
            for(let i=10; i<100; i+=10) {
              if(!existing.includes(i)) { newPercent = i; break; }
            }
          }
        }
        
        window.timelineData.push({
          percent: newPercent,
          x: last ? last.x : 0, y: last ? last.y : 0, 
          scale: last ? last.scale : 1, rotate: last ? last.rotate : 0, opacity: last ? last.opacity : 1
        });
        document.getElementById('kf-list').innerHTML = renderKeyframes();
      };

      window.removeKf = function(index) {
        if(window.timelineData.length > 2) {
          window.timelineData.splice(index, 1);
          document.getElementById('kf-list').innerHTML = renderKeyframes();
        }
      };

      // Generate CSS Code
      window.generateTimelineCss = function(injectOnly = false) {
        const sel = document.getElementById('tl-selector').value.trim() || '.anim-box';
        const dur = document.getElementById('tl-duration').value || '2';
        const ease = document.getElementById('tl-easing').value;
        const animName = 'tlAnim_' + Math.random().toString(36).substr(2,5);

        window.timelineData.sort((a, b) => a.percent - b.percent);

        let kfCss = `@keyframes ${animName} {\n`;
        window.timelineData.forEach(kf => {
          kfCss += `  ${kf.percent}% { transform: translate(${kf.x}px, ${kf.y}px) scale(${kf.scale}) rotate(${kf.rotate}deg); opacity: ${kf.opacity}; }\n`;
        });
        kfCss += `}\n\n`;

        const classCss = `${sel} {\n  animation: ${animName} ${dur}s ${ease} both;\n}`;
        const finalCss = kfCss + classCss;

        if (injectOnly) {
          return { sel, animName, dur, ease, finalCss };
        } else {
          const styleBlock = `\n<style>\n/* Timeline Generated CSS */\n${finalCss}</style>\n`;
          if (window.editor) {
            const cur = window.editor.getValue();
            if (cur.includes('</head>')) {
              window.editor.setValue(cur.replace('</head>', styleBlock + '</head>'));
            } else if (cur.includes('</body>')) {
              window.editor.setValue(cur.replace('</body>', styleBlock + '</body>'));
            } else {
              window.editor.setValue(cur + styleBlock);
            }
            if(typeof window.showToast === 'function') {
              window.showToast(lang === 'fr' ? 'CSS Timeline injecté!' : 'Timeline CSS Injected!');
            }
          } else {
             // Fallback
             const injector = window.injectCode || (window.parent && window.parent.injectCode);
             if(typeof injector === 'function') {
               injector(styleBlock);
             }
          }
        }
      };

      window.playTimeline = function() {
        const data = generateTimelineCss(true);
        const iframe = document.getElementById('preview-iframe');
        if(!iframe) return;

        // Inject temp style to preview and trigger it
        iframe.contentWindow.postMessage({
          type: 'INJECT_TEMP_CSS',
          id: 'timeline-temp-anim',
          css: data.finalCss,
          selector: data.sel
        }, '*');

        // Direct DOM manipulation fallback if postMessage doesn't have a listener
        try {
          const doc = iframe.contentWindow.document;
          let style = doc.getElementById('timeline-temp-anim');
          if(!style) {
            style = doc.createElement('style');
            style.id = 'timeline-temp-anim';
            doc.head.appendChild(style);
          }
          
          // Force reflow to restart animation
          const els = doc.querySelectorAll(data.sel);
          els.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // trigger reflow
            el.style.animation = '';
          });
          
          style.innerHTML = data.finalCss;
        } catch(e) {
          console.warn("Cross-origin or iframe not ready for direct DOM access.");
        }
      };

    } else if (originalRenderTab) {
      originalRenderTab(tab);
    }
  };
})();
