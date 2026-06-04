(function() {
  'use strict';

  const T = {
    en: {
      title: "🎭 Brand Persona Swarm",
      desc: "Simulate a focus group of virtual customers visiting your web app. They analyze your code and chat about it live.",
      feedTitle: "💬 User Session Chat Log",
      scoreTitle: "Swarm Usability Score",
      generateBtn: "👥 Simulate Live User Sessions",
      liveTyping: "Live Feedback while typing",
      rating: "Rating",
      statusOk: "🟢 Focus group is highly satisfied.",
      statusWarn: "🟡 Focus group has concerns. Check comments.",
      personaTitle: "Active Audience"
    },
    fr: {
      title: "🎭 Swarm de Personas",
      desc: "Simulez un groupe de clients virtuels qui visitent votre page. Ils analysent votre code și vorbesc live în chat.",
      feedTitle: "💬 Log Chat Session Utilisateurs",
      scoreTitle: "Score d'Usabilité du Swarm",
      generateBtn: "👥 Simuler des Sessions Utilisateurs",
      liveTyping: "Feedback live lors de l'écriture",
      rating: "Note",
      statusOk: "🟢 Le groupe de discussion est très satisfait.",
      statusWarn: "🟡 Le groupe a des remarques. Lisez le chat.",
      personaTitle: "Audience Active"
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // Persona Details
  const PERSONAS = {
    sarah:  { name: "Sarah (Gen-Z)", icon: "✨", color: "#f472b6", score: 85 },
    alex:   { name: "Alex (Tech Lead)", icon: "💻", color: "#60a5fa", score: 80 },
    robert: { name: "Robert (Manager)", icon: "📈", color: "#34d399", score: 75 },
    martha: { name: "Martha (Senior)", icon: "👵", color: "#fb923c", score: 70 },
    chloe:  { name: "Chloe (Casual)", icon: "🎒", color: "#a78bfa", score: 80 }
  };

  const CHAT_HISTORY = [];
  let isLiveEnabled = true;
  let typingTimeout = null;

  function getGlobalScore() {
    let sum = 0;
    let count = 0;
    Object.keys(PERSONAS).forEach(k => {
      sum += PERSONAS[k].score;
      count++;
    });
    return Math.round(sum / count);
  }

  // Inject Message into Chat Feed
  function addChatMessage(personaKey, text) {
    const p = PERSONAS[personaKey];
    if (!p) return;
    const msg = {
      name: p.name,
      icon: p.icon,
      color: p.color,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    CHAT_HISTORY.push(msg);
    if (CHAT_HISTORY.length > 25) CHAT_HISTORY.shift();

    const feed = document.getElementById('ps-chat-feed');
    if (feed) {
      const msgDiv = document.createElement('div');
      msgDiv.style.cssText = `display: flex; gap: 10px; margin-bottom: 12px; font-size: 12px; line-height: 1.5; animation: slideUp 0.25s ease-out;`;
      msgDiv.innerHTML = `
        <div style="width: 28px; height: 28px; border-radius: 50%; background: ${p.color}33; border: 1px solid ${p.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px;">
          ${p.icon}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px;">
            <span style="font-weight: 800; color: ${p.color};">${p.name}</span>
            <span style="font-size: 9px; color: #64748b;">${msg.time}</span>
          </div>
          <div style="color: #cbd5e1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 12px; display: inline-block; max-width: 90%;">
            ${text}
          </div>
        </div>
      `;
      feed.appendChild(msgDiv);
      feed.scrollTop = feed.scrollHeight;
    }
  }

  // Code scanner and feed generator
  function scanCodeAndChat(isTypingTrigger = false) {
    const code = window.editor ? window.editor.getValue() : '';
    if (!code) return;

    const isFr = gl() === 'fr';

    // 1. Analyze design tokens (Sarah - Gen Z)
    if (code.includes('linear-gradient') || code.includes('backdrop-filter') || code.includes('box-shadow:')) {
      PERSONAS.sarah.score = 95;
      if (Math.random() > 0.4 || !isTypingTrigger) {
        addChatMessage('sarah', isFr 
          ? "Wow, degradeurile și efectele de sticlă blurată arată super bine! Are un vibe foarte estetic! 🧊✨"
          : "Wow, the gradients and glassmorphism styling look absolutely gorgeous! Very aesthetic vibe! 🧊✨"
        );
      }
    } else {
      PERSONAS.sarah.score = 55;
      if (Math.random() > 0.6 || !isTypingTrigger) {
        addChatMessage('sarah', isFr
          ? "Hmm, layoutul mi se pare cam simplu și plictisitor. Ar merge niște culori neon sau animații fluide. 😴"
          : "Hmm, the design looks a bit flat and plain. Could use some modern neon gradients or fluid animations. 😴"
        );
      }
    }

    // 2. Analyze HTML semantic tags (Alex - Tech Lead)
    const hasSemantic = code.includes('<header>') || code.includes('<main>') || code.includes('<nav>') || code.includes('<footer>');
    if (hasSemantic) {
      PERSONAS.alex.score = 90;
      if (Math.random() > 0.5 || !isTypingTrigger) {
        addChatMessage('alex', isFr
          ? "Excelent, folosești tag-uri semantice HTML5. Codul este curat și ușor de structurat de browser! 💻"
          : "Great job using semantic HTML5 layout tags. Clean AST structure, easy for SEO crawlers! 💻"
        );
      }
    } else {
      PERSONAS.alex.score = 45;
      if (Math.random() > 0.5 || !isTypingTrigger) {
        addChatMessage('alex', isFr
          ? "De ce folosești taguri generic-div pretutindeni? Folosește structuri semantice precum <header> și <main>."
          : "Please avoid using generic <div> wrappers for everything. Use semantic structures like <header> or <main>."
        );
      }
    }

    // 3. Analyze Call to Action and conversion hooks (Robert - Manager)
    const hasCTA = code.includes('button') || code.includes('href') || code.includes('cta') || code.includes('btn');
    if (hasCTA) {
      PERSONAS.robert.score = 88;
      if (Math.random() > 0.6 || !isTypingTrigger) {
        addChatMessage('robert', isFr
          ? "Bun, avem butoane clare de tip Call-to-Action. Utilizatorii au unde să dea click pentru conversii! 📈"
          : "Excellent, we have clear Call-to-Action buttons. The page is ready to convert traffic into leads! 📈"
        );
      }
    } else {
      PERSONAS.robert.score = 30;
      if (Math.random() > 0.4 || !isTypingTrigger) {
        addChatMessage('robert', isFr
          ? "Unde sunt butoanele sau formularele? Cum cumpără cineva de aici sau cum se înregistrează? 💸"
          : "There are no buttons, signups, or forms. How is a customer supposed to convert on this page? 💸"
        );
      }
    }

    // 4. Accessibility and text scaling (Martha - Senior)
    const hasSmallFont = code.includes('font-size:10px') || code.includes('font-size:11px') || code.includes('font-size: 9px');
    if (hasSmallFont) {
      PERSONAS.martha.score = 40;
      if (Math.random() > 0.5 || !isTypingTrigger) {
        addChatMessage('martha', isFr
          ? "Scrisul este extrem de mic! Îmi obosesc ochii citind. Vă rog faceți fontul mai mare și lizibil. 👵"
          : "The font size is tiny! I can't read a thing. Please make the text bigger and scale nicely. 👵"
        );
      }
    } else {
      PERSONAS.martha.score = 80;
      if (Math.random() > 0.7 || !isTypingTrigger) {
        addChatMessage('martha', isFr
          ? "Textul este aerisit și destul de ușor de citit. Aspectul este ordonat."
          : "The text spacing looks comfortable and clean. Highly readable layout."
        );
      }
    }

    // 5. Casual surfer check (Chloe)
    PERSONAS.chloe.score = Math.round((PERSONAS.sarah.score + PERSONAS.alex.score) / 2);
    if (PERSONAS.chloe.score > 70) {
      if (Math.random() > 0.6 || !isTypingTrigger) {
        addChatMessage('chloe', isFr
          ? "Pagina se încarcă super repede și arată foarte profesionist. Aș petrece timp aici! 👍"
          : "The page loads incredibly fast and looks very professional. I'd definitely browse this site! 👍"
        );
      }
    }

    updateUiScore();
  }

  function updateUiScore() {
    const scoreVal = getGlobalScore();
    const scoreValEl = document.getElementById('ps-swarm-score-val');
    const fillEl = document.getElementById('ps-swarm-score-fill');
    if (scoreValEl && fillEl) {
      scoreValEl.textContent = scoreVal;
      fillEl.style.strokeDashoffset = 250 - (250 * scoreVal / 100);
      
      const col = scoreVal > 75 ? '#34d399' : scoreVal > 50 ? '#fb923c' : '#ef4444';
      fillEl.style.stroke = col;
      scoreValEl.style.color = col;
    }

    const statusEl = document.getElementById('ps-swarm-status');
    if (statusEl) {
      statusEl.textContent = scoreVal > 65 ? t('statusOk') : t('statusWarn');
      statusEl.style.color = scoreVal > 65 ? '#34d399' : '#f87171';
    }

    // Update individual persona listing ratings
    Object.keys(PERSONAS).forEach(k => {
      const p = PERSONAS[k];
      const pScoreEl = document.getElementById(`ps-persona-score-${k}`);
      if (pScoreEl) {
        pScoreEl.textContent = p.score + '/100';
        pScoreEl.style.color = p.score > 75 ? '#34d399' : p.score > 50 ? '#fb923c' : '#ef4444';
      }
    });
  }

  // Monaco Hook with Debounce
  setTimeout(() => {
    if (window.editor) {
      window.editor.onDidChangeModelContent(() => {
        if (!isLiveEnabled) return;
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          scanCodeAndChat(true);
        }, 3500); // Trigger comment 3.5s after user stops typing
      });
    }
  }, 1000);

  // Render UI
  window.renderPersonaSwarm = function(container) {
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 10px 4px; font-family: 'Inter', sans-serif; color: #f1f5f9; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #f472b6, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 📊 Global Circular Score & Status -->
        <div style="display: flex; align-items: center; gap: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 18px;">
          <!-- SVG Circle Progress -->
          <div style="position: relative; width: 80px; height: 80px; flex-shrink: 0;">
            <svg style="width:100%; height:100%; transform: rotate(-90deg);">
              <circle cx="40" cy="40" r="36" style="fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 8;" />
              <circle id="ps-swarm-score-fill" cx="40" cy="40" r="36" style="fill: none; stroke: #34d399; stroke-width: 8; stroke-dasharray: 250; stroke-dashoffset: 60; transition: stroke-dashoffset 0.4s; stroke-linecap: round;" />
            </svg>
            <div id="ps-swarm-score-val" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #34d399;">
              80
            </div>
          </div>
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #e2e8f0; margin-bottom: 4px;">
              ${t('scoreTitle')}
            </div>
            <div id="ps-swarm-status" style="font-size: 10px; font-weight: 700;">-</div>
          </div>
        </div>

        <!-- 💬 Chat Log Container -->
        <div style="background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; display: flex; flex-direction: column; overflow: hidden; height: 260px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; padding: 10px 14px; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            ${t('feedTitle')}
          </div>
          <div id="ps-chat-feed" style="flex: 1; overflow-y: auto; padding: 14px; scrollbar-width: thin;">
            <!-- Chat history injected here -->
          </div>
        </div>

        <!-- 👥 Target Audience individual listings -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 12px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px;">
            👥 ${t('personaTitle')}
          </div>

          ${Object.keys(PERSONAS).map(k => {
            const p = PERSONAS[k];
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                <span style="display: flex; align-items: center; gap: 8px; font-weight: 700;">
                  <span style="width: 22px; height: 22px; border-radius: 50%; background: ${p.color}22; border: 1px solid ${p.color}44; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                    ${p.icon}
                  </span>
                  <span>${p.name}</span>
                </span>
                <span id="ps-persona-score-${k}" style="font-weight: 900; color: #34d399;">${p.score}/100</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 🎛️ Settings and Actions -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; padding: 4px 6px;">
            <span style="font-weight: 700;">${t('liveTyping')}</span>
            <input type="checkbox" id="ps-live-toggle" ${isLiveEnabled ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: #f472b6; cursor: pointer;" />
          </div>
          <button id="ps-generate-sessions-btn" class="sm-btn blue-btn" style="width:100%; font-weight:800; padding:12px; font-size:12px;">
            ${t('generateBtn')}
          </button>
        </div>
      </div>
    `;

    // Hook feed messages
    const feed = document.getElementById('ps-chat-feed');
    if (feed) {
      feed.innerHTML = '';
      if (CHAT_HISTORY.length === 0) {
        addChatMessage('alex', gl() === 'fr' 
          ? "Am intrat în sesiune. Scrie niște cod în Monaco și noi îl vom testa live! 🚀" 
          : "Logged in. Type some HTML code in Monaco and we will analyze it in real time! 🚀"
        );
      } else {
        CHAT_HISTORY.forEach(msg => {
          const msgDiv = document.createElement('div');
          msgDiv.style.cssText = `display: flex; gap: 10px; margin-bottom: 12px; font-size: 12px; line-height: 1.5;`;
          msgDiv.innerHTML = `
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${msg.color}33; border: 1px solid ${msg.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px;">
              ${msg.icon}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px;">
                <span style="font-weight: 800; color: ${msg.color};">${msg.name}</span>
                <span style="font-size: 9px; color: #64748b;">${msg.time}</span>
              </div>
              <div style="color: #cbd5e1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 12px; display: inline-block; max-width: 90%;">
                ${msg.text}
              </div>
            </div>
          `;
          feed.appendChild(msgDiv);
        });
        feed.scrollTop = feed.scrollHeight;
      }
    }

    // Toggle live feedback
    document.getElementById('ps-live-toggle').onchange = function(e) {
      isLiveEnabled = e.target.checked;
    };

    // Force simulation session button
    document.getElementById('ps-generate-sessions-btn').onclick = function() {
      scanCodeAndChat(false);
    };

    updateUiScore();
  };

  // Tab Decorator
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'personaswarm') {
      window.renderPersonaSwarm(document.getElementById('left-body'));
    } else {
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
