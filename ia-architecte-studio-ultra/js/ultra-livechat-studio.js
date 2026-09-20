/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ULTRA LIVE CONCIERGE & FAQ CHATBOT STUDIO (Intercom/Crisp/Zendesk Style)
 * High-performance autonomous client-side widget with AI FAQ auto-replies,
 * procedural Web Audio synthesis, lead collector, and 1-click injection.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && typeof UltraSoundFX.play === 'function') {
      UltraSoundFX.play(type);
    }
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg, type || 'info');
    } else {
      console.log(`[Toast ${type}]: ${msg}`);
    }
  }

  function _synthSound(type) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      if (type === 'chime') {
        // Soft welcoming two-tone chime
        [880, 1320].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.15, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.35);
        });
      } else if (type === 'pop') {
        // Discrete subtle outgoing pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch(e){}
  }

  const UltraLiveChatStudio = {
    botName: 'Aura Concierge',
    greeting: '👋 Hello! How can I assist you today?',
    theme: 'emerald',
    position: 'bottom-right',
    leadCaptureEnabled: true,
    leadPrompt: 'Need a human specialist? Leave your email/phone:',
    faqs: [
      {
        q: 'What features are included?',
        a: 'This application includes high-performance zero-backend client-side modules, offline caching, responsive themes, and instant code export.'
      },
      {
        q: 'How can I export the code?',
        a: 'Click the Export button in the top navigation bar to download full standalone HTML, ZIP packages, or deploy directly.'
      },
      {
        q: 'Does this run offline?',
        a: 'Yes! With our PWA Service Worker caching engine, the app works 100% offline in airplane mode.'
      },
      {
        q: 'Can I customize the themes?',
        a: 'Absolutely! Use the Theme Morpher or Color settings to morph design systems, fonts, and accessible palettes with 1 click.'
      }
    ],

    themes: {
      emerald: {
        primary: '#10b981',
        secondary: '#059669',
        glow: 'rgba(16,185,129,0.3)',
        bg: '#061a14',
        border: 'rgba(16,185,129,0.35)',
        text: '#f8fafc',
        bubbleBot: '#0f291e',
        bubbleUser: '#10b981',
        bubbleUserText: '#ffffff'
      },
      cyber: {
        primary: '#38bdf8',
        secondary: '#0284c7',
        glow: 'rgba(56,189,248,0.3)',
        bg: '#081528',
        border: 'rgba(56,189,248,0.35)',
        text: '#f8fafc',
        bubbleBot: '#0e243f',
        bubbleUser: '#0284c7',
        bubbleUserText: '#ffffff'
      },
      gold: {
        primary: '#f59e0b',
        secondary: '#d97706',
        glow: 'rgba(245,158,11,0.3)',
        bg: '#1a1406',
        border: 'rgba(245,158,11,0.35)',
        text: '#f8fafc',
        bubbleBot: '#291d06',
        bubbleUser: '#d97706',
        bubbleUserText: '#000000'
      },
      velvet: {
        primary: '#a855f7',
        secondary: '#7c3aed',
        glow: 'rgba(168,85,247,0.3)',
        bg: '#160824',
        border: 'rgba(168,85,247,0.35)',
        text: '#f8fafc',
        bubbleBot: '#230e38',
        bubbleUser: '#7c3aed',
        bubbleUserText: '#ffffff'
      }
    },

    simMessages: [],
    simIsTyping: false,
    simIsOpen: true,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-livechat-studio');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();

      const elName = document.getElementById('livechat-input-botname');
      const elGreet = document.getElementById('livechat-input-greeting');
      const elTheme = document.getElementById('livechat-select-theme');
      const elPos = document.getElementById('livechat-select-pos');
      const elLead = document.getElementById('livechat-toggle-lead');
      const elLeadPrompt = document.getElementById('livechat-input-leadprompt');

      if (elName) elName.value = this.botName;
      if (elGreet) elGreet.value = this.greeting;
      if (elTheme) elTheme.value = this.theme;
      if (elPos) elPos.value = this.position;
      if (elLead) elLead.checked = this.leadCaptureEnabled;
      if (elLeadPrompt) elLeadPrompt.value = this.leadPrompt;

      this.renderFaqList();
      this.resetChat();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-livechat-studio');
      if (modal) modal.classList.remove('show');
    },

    onBotNameChange(val) {
      this.botName = val || 'Aura Concierge';
      this.renderSimulator();
    },

    onGreetingChange(val) {
      this.greeting = val || '👋 Hello! How can I assist you today?';
      this.resetChat();
    },

    selectTheme(th) {
      _sound('click');
      this.theme = th || 'emerald';
      this.renderSimulator();
    },

    selectPosition(pos) {
      _sound('click');
      this.position = pos || 'bottom-right';
      this.renderSimulator();
    },

    toggleLeadCapture(enabled) {
      _sound('click');
      this.leadCaptureEnabled = enabled;
      this.renderSimulator();
    },

    onLeadPromptChange(val) {
      this.leadPrompt = val;
    },

    addFaqPrompt() {
      _sound('click');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const q = prompt(isFr ? 'Entrez la question fréquente :' : 'Enter FAQ Question:');
      if (!q || !q.trim()) return;
      const a = prompt(isFr ? 'Entrez la réponse automatique :' : 'Enter Automated Answer:');
      if (!a || !a.trim()) return;

      this.faqs.push({ q: q.trim(), a: a.trim() });
      this.renderFaqList();
      this.renderSimulator();
      _toast(isFr ? 'Nouvelle question FAQ ajoutée.' : 'New FAQ pair added.', 'success');
    },

    removeFaq(idx) {
      _sound('click');
      this.faqs.splice(idx, 1);
      this.renderFaqList();
      this.renderSimulator();
    },

    renderFaqList() {
      const container = document.getElementById('livechat-faq-list');
      if (!container) return;
      if (this.faqs.length === 0) {
        container.innerHTML = '<div style="font-size:0.72rem;color:#64748b;font-style:italic">No FAQ pairs configured yet.</div>';
        return;
      }
      container.innerHTML = this.faqs.map((f, i) => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;gap:6px">
          <div style="flex:1;min-width:0">
            <div style="font-size:0.74rem;font-weight:700;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Q: ${f.q}</div>
            <div style="font-size:0.68rem;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">A: ${f.a}</div>
          </div>
          <button onclick="UltraLiveChatStudio.removeFaq(${i})" style="background:none;border:none;color:#ef4444;font-size:0.8rem;cursor:pointer;padding:2px 5px">✕</button>
        </div>
      `).join('');
    },

    resetChat() {
      this.simMessages = [
        {
          sender: 'bot',
          text: this.greeting,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      this.simIsTyping = false;
      this.renderSimulator();
    },

    sendUserMessage(text) {
      if (!text || !text.trim()) return;
      _synthSound('pop');
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.simMessages.push({
        sender: 'user',
        text: text.trim(),
        time: timeStr
      });
      this.simIsTyping = true;
      this.renderSimulator();

      const input = document.getElementById('sim-livechat-input');
      if (input) input.value = '';

      // Fuzzy / Substring FAQ Matcher
      const query = text.toLowerCase();
      let matchedFaq = this.faqs.find(f => {
        const qWords = f.q.toLowerCase().split(/\s+/);
        return qWords.some(w => w.length > 3 && query.includes(w)) || query.includes(f.q.toLowerCase());
      });

      setTimeout(() => {
        this.simIsTyping = false;
        _synthSound('chime');
        const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (matchedFaq) {
          this.simMessages.push({
            sender: 'bot',
            text: matchedFaq.a,
            time: botTimeStr
          });
        } else if (query.includes('hello') || query.includes('hi') || query.includes('bonjour') || query.includes('salut')) {
          this.simMessages.push({
            sender: 'bot',
            text: 'Hello! I am your AI live concierge. Feel free to click any of the quick question chips above, or ask anything about this application!',
            time: botTimeStr
          });
        } else {
          // Fallback + Lead Capture Form
          this.simMessages.push({
            sender: 'bot',
            text: `Thank you for asking! I will make sure our engineering team reviews your inquiry.`,
            time: botTimeStr,
            isLeadForm: this.leadCaptureEnabled
          });
        }
        this.renderSimulator();
      }, 550);
    },

    submitLead(contactVal) {
      if (!contactVal || !contactVal.trim()) return;
      _sound('celebrate');
      try {
        if (typeof localStorage !== 'undefined') {
          const leads = JSON.parse(localStorage.getItem('__livechat_leads') || '[]');
          leads.push({ contact: contactVal.trim(), date: new Date().toISOString() });
          localStorage.setItem('__livechat_leads', JSON.stringify(leads));
        }
      } catch(e){}

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.simMessages.push({
        sender: 'bot',
        text: `✓ Thank you! Your contact (${contactVal.trim()}) has been securely registered. Our team will reach out shortly.`,
        time: timeStr
      });
      this.renderSimulator();
      _toast('Lead captured successfully!', 'success');
    },

    renderSimulator() {
      const container = document.getElementById('livechat-simulator-container');
      if (!container) return;

      const th = this.themes[this.theme] || this.themes.emerald;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      container.innerHTML = `
        <!-- Simulated Web Page Canvas with Floating Chat Card -->
        <div style="width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
          <!-- Glassmorphic Chat Widget Window -->
          <div id="sim-chat-window" style="width:330px;height:360px;border-radius:18px;background:${th.bg};border:1px solid ${th.border};box-shadow:0 20px 50px rgba(0,0,0,0.85),0 0 25px ${th.glow};display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(14px);position:relative">
            <!-- Header -->
            <div style="padding:10px 14px;background:rgba(255,255,255,0.04);border-bottom:1px solid ${th.border};display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${th.primary},${th.secondary});display:flex;align-items:center;justify-content:center;font-size:1.1rem;box-shadow:0 0 10px ${th.glow}">
                  🤖
                </div>
                <div>
                  <div style="font-weight:800;font-size:0.84rem;color:#fff">${this.botName}</div>
                  <div style="font-size:0.65rem;color:${th.primary};display:flex;align-items:center;gap:4px">
                    <span style="width:6px;height:6px;border-radius:50%;background:#10b981;display:inline-block"></span>
                    <span>${isFr ? 'En ligne · Réponse instantanée' : 'Online · Instant Replies'}</span>
                  </div>
                </div>
              </div>
              <button onclick="UltraLiveChatStudio.resetChat()" style="background:none;border:none;color:#94a3b8;font-size:0.8rem;cursor:pointer" title="Reset chat">↺</button>
            </div>

            <!-- Messages Timeline -->
            <div id="sim-chat-timeline" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px">
              ${this.simMessages.map(m => {
                if (m.sender === 'bot') {
                  return `
                    <div style="display:flex;flex-direction:column;align-items:flex-start;max-width:85%">
                      <div style="background:${th.bubbleBot};border:1px solid ${th.border};padding:8px 12px;border-radius:14px 14px 14px 2px;color:${th.text};font-size:0.75rem;line-height:1.4">
                        ${m.text}
                      </div>
                      ${m.isLeadForm ? `
                        <div style="margin-top:8px;background:rgba(255,255,255,0.06);border:1px solid ${th.border};border-radius:10px;padding:8px;width:100%">
                          <div style="font-size:0.68rem;color:#cbd5e1;margin-bottom:6px">${this.leadPrompt}</div>
                          <div style="display:flex;gap:4px">
                            <input id="sim-lead-input" type="text" placeholder="name@domain.com / +1 555..." style="flex:1;padding:4px 8px;font-size:0.7rem;background:#090d16;border:1px solid rgba(255,255,255,0.15);border-radius:4px;color:#fff">
                            <button onclick="UltraLiveChatStudio.submitLead(document.getElementById('sim-lead-input').value)" style="background:${th.primary};border:none;border-radius:4px;color:#000;font-weight:900;font-size:0.7rem;padding:4px 8px;cursor:pointer">Send</button>
                          </div>
                        </div>
                      ` : ''}
                      <span style="font-size:0.6rem;color:#64748b;margin-top:2px;margin-left:4px">${m.time}</span>
                    </div>
                  `;
                } else {
                  return `
                    <div style="display:flex;flex-direction:column;align-items:flex-end;align-self:flex-end;max-width:85%">
                      <div style="background:${th.bubbleUser};padding:8px 12px;border-radius:14px 14px 2px 14px;color:${th.bubbleUserText};font-size:0.75rem;font-weight:600;line-height:1.4">
                        ${m.text}
                      </div>
                      <span style="font-size:0.6rem;color:#64748b;margin-top:2px;margin-right:4px">${m.time}</span>
                    </div>
                  `;
                }
              }).join('')}

              <!-- Typing Indicator -->
              ${this.simIsTyping ? `
                <div style="display:flex;align-items:center;gap:4px;background:${th.bubbleBot};border:1px solid ${th.border};padding:8px 12px;border-radius:14px;width:fit-content">
                  <span style="width:5px;height:5px;border-radius:50%;background:${th.primary};animation:__lc_dot 1s infinite 0.1s"></span>
                  <span style="width:5px;height:5px;border-radius:50%;background:${th.primary};animation:__lc_dot 1s infinite 0.25s"></span>
                  <span style="width:5px;height:5px;border-radius:50%;background:${th.primary};animation:__lc_dot 1s infinite 0.4s"></span>
                </div>
              ` : ''}

              <!-- FAQ Quick Replies Chips (Shown after greeting) -->
              ${(this.simMessages.length === 1 && this.faqs.length > 0) ? `
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
                  ${this.faqs.slice(0, 4).map(f => `
                    <button onclick="UltraLiveChatStudio.sendUserMessage('${f.q.replace(/'/g, "\\'")}')" style="background:rgba(255,255,255,0.06);border:1px solid ${th.border};border-radius:12px;padding:4px 10px;font-size:0.68rem;color:#f8fafc;cursor:pointer;transition:all 0.2s">
                      ⚡ ${f.q}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <!-- Input Bar -->
            <div style="padding:8px 10px;background:rgba(255,255,255,0.04);border-top:1px solid ${th.border};display:flex;gap:6px;align-items:center">
              <input id="sim-livechat-input" type="text" placeholder="${isFr ? 'Écrivez votre message...' : 'Ask a question or type a message...'}" onkeydown="if(event.key==='Enter')UltraLiveChatStudio.sendUserMessage(this.value)" style="flex:1;background:#090d16;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:7px 12px;color:#fff;font-size:0.75rem">
              <button onclick="UltraLiveChatStudio.sendUserMessage(document.getElementById('sim-livechat-input').value)" style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-size:0.8rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:900">➔</button>
            </div>
          </div>
        </div>
      `;

      // Auto-scroll timeline
      setTimeout(() => {
        const tl = document.getElementById('sim-chat-timeline');
        if (tl) tl.scrollTop = tl.scrollHeight;
      }, 50);
    },

    // ──────────────────────────────────────────────────────────────────────────
    // STANDALONE ZERO-DEPENDENCY EMBED SNIPPET GENERATOR
    // ──────────────────────────────────────────────────────────────────────────
    generateStandaloneSnippet() {
      const th = this.themes[this.theme] || this.themes.emerald;
      const configJson = JSON.stringify({
        botName: this.botName,
        greeting: this.greeting,
        position: this.position,
        leadCaptureEnabled: this.leadCaptureEnabled,
        leadPrompt: this.leadPrompt,
        theme: {
          primary: th.primary,
          secondary: th.secondary,
          glow: th.glow,
          bg: th.bg,
          border: th.border,
          text: th.text,
          bubbleBot: th.bubbleBot,
          bubbleUser: th.bubbleUser,
          bubbleUserText: th.bubbleUserText
        },
        faqs: this.faqs
      }, null, 2);

      return `<!-- Ultra Live Concierge & FAQ Chatbot — Autonomous Injectable Support Widget -->
<script>
(function() {
  const config = ${configJson};

  function __lc_mount() {
    if (document.getElementById('__lc_root')) return;

    var styleEl = document.createElement('style');
    styleEl.id = '__lc_style';
    styleEl.textContent = \`
      .__lc_container { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; pointer-events: auto; }
      @keyframes __lc_pulse {
        0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.7); }
        70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
        100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
      }
      @keyframes __lc_blink {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }
      @keyframes __lc_dot {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes __lc_slide_up {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    \`;
    (document.head || document.documentElement).appendChild(styleEl);

    var root = document.createElement('div');
    root.id = '__lc_root';
    root.className = '__lc_container';
    var posCss = (config.position === 'bottom-left') ? 'bottom:24px;left:24px;' : 'bottom:24px;right:24px;';
    root.style.cssText = 'position:fixed;' + posCss + 'z-index:9999999;';
    (document.body || document.documentElement).appendChild(root);

    function __synth(type) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        var c = new AC();
        if (c.state === 'suspended') c.resume();
        var now = c.currentTime;
        if (type === 'chime') {
          [880, 1320].forEach(function(f, i) {
            var o = c.createOscillator(); var g = c.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(f, now + i*0.12);
            g.gain.setValueAtTime(0.15, now + i*0.12);
            g.gain.exponentialRampToValueAtTime(0.001, now + i*0.12 + 0.35);
            o.connect(g); g.connect(c.destination); o.start(now + i*0.12); o.stop(now + i*0.12 + 0.35);
          });
        } else if (type === 'pop') {
          var o = c.createOscillator(); var g = c.createGain();
          o.type = 'sine'; o.frequency.setValueAtTime(440, now);
          o.frequency.exponentialRampToValueAtTime(220, now + 0.05);
          g.gain.setValueAtTime(0.12, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          o.connect(g); g.connect(c.destination); o.start(now); o.stop(now + 0.05);
        }
      } catch(e){}
    }

    var history = [];
    try {
      history = JSON.parse(localStorage.getItem('__lc_hist') || '[]');
    } catch(e){}
    if (!history.length) {
      history.push({ sender: 'bot', text: config.greeting, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) });
    }

    var isOpen = false;
    var isTyping = false;

    function render() {
      root.innerHTML = \`
        <!-- Trigger Button -->
        <div id="__lc_btn" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});box-shadow:0 8px 30px rgba(0,0,0,0.6),0 0 20px \${config.theme.glow};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.6rem;position:relative;animation:__lc_pulse 2.5s infinite;user-select:none">
          \${isOpen ? '✕' : '💬'}
          <div style="position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#10b981;border:2px solid #000;animation:__lc_blink 2s infinite"></div>
        </div>

        <!-- Chat Window Card -->
        <div id="__lc_card" style="display:\${isOpen ? 'flex' : 'none'};position:absolute;bottom:75px;\${config.position==='bottom-left'?'left:0;':'right:0;'}width:330px;height:420px;border-radius:20px;background:\${config.theme.bg};border:1px solid \${config.theme.border};box-shadow:0 25px 60px rgba(0,0,0,0.85),0 0 35px \${config.theme.glow};flex-direction:column;overflow:hidden;backdrop-filter:blur(16px);animation:__lc_slide_up 0.3s cubic-bezier(0.16,1,0.3,1)">
          <!-- Header -->
          <div style="padding:12px 14px;background:rgba(255,255,255,0.04);border-bottom:1px solid \${config.theme.border};display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 0 10px \${config.theme.glow}">
                🤖
              </div>
              <div>
                <div style="font-weight:800;font-size:0.86rem;color:#fff">\${config.botName}</div>
                <div style="font-size:0.65rem;color:\${config.theme.primary};display:flex;align-items:center;gap:4px">
                  <span style="width:6px;height:6px;border-radius:50%;background:#10b981;display:inline-block"></span>
                  <span>Online · Instant Replies</span>
                </div>
              </div>
            </div>
            <button id="__lc_close_btn" style="background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer">✕</button>
          </div>

          <!-- Timeline -->
          <div id="__lc_timeline" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px">
            \${history.map(function(m) {
              if (m.sender === 'bot') {
                return \`
                  <div style="display:flex;flex-direction:column;align-items:flex-start;max-width:85%">
                    <div style="background:\${config.theme.bubbleBot};border:1px solid \${config.theme.border};padding:8px 12px;border-radius:14px 14px 14px 2px;color:\${config.theme.text};font-size:0.75rem;line-height:1.4">
                      \${m.text}
                    </div>
                    \${m.isLeadForm ? \`
                      <div style="margin-top:8px;background:rgba(255,255,255,0.06);border:1px solid \${config.theme.border};border-radius:10px;padding:8px;width:100%">
                        <div style="font-size:0.68rem;color:#cbd5e1;margin-bottom:6px">\${config.leadPrompt}</div>
                        <div style="display:flex;gap:4px">
                          <input id="__lc_lead_inp" type="text" placeholder="name@domain.com / +1 555..." style="flex:1;padding:4px 8px;font-size:0.7rem;background:#090d16;border:1px solid rgba(255,255,255,0.15);border-radius:4px;color:#fff">
                          <button id="__lc_lead_sub" style="background:\${config.theme.primary};border:none;border-radius:4px;color:#000;font-weight:900;font-size:0.7rem;padding:4px 8px;cursor:pointer">Send</button>
                        </div>
                      </div>
                    \` : ''}
                    <span style="font-size:0.6rem;color:#64748b;margin-top:2px;margin-left:4px">\${m.time}</span>
                  </div>
                \`;
              } else {
                return \`
                  <div style="display:flex;flex-direction:column;align-items:flex-end;align-self:flex-end;max-width:85%">
                    <div style="background:\${config.theme.bubbleUser};padding:8px 12px;border-radius:14px 14px 2px 14px;color:\${config.theme.bubbleUserText};font-size:0.75rem;font-weight:600;line-height:1.4">
                      \${m.text}
                    </div>
                    <span style="font-size:0.6rem;color:#64748b;margin-top:2px;margin-right:4px">\${m.time}</span>
                  </div>
                \`;
              }
            }).join('')}

            \${isTyping ? \`
              <div style="display:flex;align-items:center;gap:4px;background:\${config.theme.bubbleBot};border:1px solid \${config.theme.border};padding:8px 12px;border-radius:14px;width:fit-content">
                <span style="width:5px;height:5px;border-radius:50%;background:\${config.theme.primary};animation:__lc_dot 1s infinite 0.1s"></span>
                <span style="width:5px;height:5px;border-radius:50%;background:\${config.theme.primary};animation:__lc_dot 1s infinite 0.25s"></span>
                <span style="width:5px;height:5px;border-radius:50%;background:\${config.theme.primary};animation:__lc_dot 1s infinite 0.4s"></span>
              </div>
            \` : ''}

            \${(history.length === 1 && config.faqs.length > 0) ? \`
              <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
                \${config.faqs.slice(0, 4).map(function(f, idx) {
                  return '<button class="__lc_faq_btn" data-faq-idx="' + idx + '" style="background:rgba(255,255,255,0.06);border:1px solid ' + config.theme.border + ';border-radius:12px;padding:4px 10px;font-size:0.68rem;color:#f8fafc;cursor:pointer;transition:all 0.2s">⚡ ' + f.q + '</button>';
                }).join('')}
              </div>
            \` : ''}
          </div>

          <!-- Input Bar -->
          <div style="padding:8px 10px;background:rgba(255,255,255,0.04);border-top:1px solid \${config.theme.border};display:flex;gap:6px;align-items:center">
            <input id="__lc_msg_inp" type="text" placeholder="Ask a question or type a message..." style="flex:1;background:#090d16;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:7px 12px;color:#fff;font-size:0.75rem">
            <button id="__lc_send_btn" style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border:none;color:#000;font-size:0.8rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:900">➔</button>
          </div>
        </div>
      \`;

      var btn = root.querySelector('#__lc_btn');
      var closeBtn = root.querySelector('#__lc_close_btn');
      var sendBtn = root.querySelector('#__lc_send_btn');
      var msgInp = root.querySelector('#__lc_msg_inp');
      var leadSub = root.querySelector('#__lc_lead_sub');
      var leadInp = root.querySelector('#__lc_lead_inp');

      if (btn) btn.onclick = function() {
        isOpen = !isOpen;
        if (isOpen) __synth('chime');
        render();
      };
      if (closeBtn) closeBtn.onclick = function() { isOpen = false; render(); };

      var doSend = function() {
        if (!msgInp || !msgInp.value.trim()) return;
        var text = msgInp.value.trim();
        msgInp.value = '';
        __synth('pop');
        var timeStr = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        history.push({ sender: 'user', text: text, time: timeStr });
        isTyping = true;
        render();

        var query = text.toLowerCase();
        var matchedFaq = null;
        for (var i = 0; i < config.faqs.length; i++) {
          var f = config.faqs[i];
          var qWords = f.q.toLowerCase().split(/\\s+/);
          var hasMatch = false;
          for (var j = 0; j < qWords.length; j++) {
            if (qWords[j].length > 3 && query.indexOf(qWords[j]) !== -1) { hasMatch = true; break; }
          }
          if (hasMatch || query.indexOf(f.q.toLowerCase()) !== -1) {
            matchedFaq = f;
            break;
          }
        }

        setTimeout(function() {
          isTyping = false;
          __synth('chime');
          var botTime = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
          if (matchedFaq) {
            history.push({ sender: 'bot', text: matchedFaq.a, time: botTime });
          } else {
            history.push({
              sender: 'bot',
              text: 'Thank you for asking! I will make sure our team reviews your question.',
              time: botTime,
              isLeadForm: config.leadCaptureEnabled
            });
          }
          try { localStorage.setItem('__lc_hist', JSON.stringify(history)); } catch(e){}
          render();
        }, 550);
      };

      if (sendBtn) sendBtn.onclick = doSend;
      if (msgInp) msgInp.onkeydown = function(e) { if (e.key === 'Enter') doSend(); };

      if (leadSub && leadInp) {
        leadSub.onclick = function() {
          var cVal = leadInp.value.trim();
          if (!cVal) return;
          try {
            var leads = JSON.parse(localStorage.getItem('__livechat_leads') || '[]');
            leads.push({ contact: cVal, date: new Date().toISOString() });
            localStorage.setItem('__livechat_leads', JSON.stringify(leads));
          } catch(e){}
          var botTime = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
          history.push({ sender: 'bot', text: '✓ Thank you! We have registered ' + cVal + '. A specialist will follow up shortly.', time: botTime });
          try { localStorage.setItem('__lc_hist', JSON.stringify(history)); } catch(e){}
          render();
        };
      }

      root.querySelectorAll('.__lc_faq_btn').forEach(function(fBtn) {
        fBtn.onclick = function() {
          var idx = parseInt(fBtn.getAttribute('data-faq-idx'), 10);
          if (config.faqs[idx]) {
            msgInp.value = config.faqs[idx].q;
            doSend();
          }
        };
      });

      var tl = root.querySelector('#__lc_timeline');
      if (tl) tl.scrollTop = tl.scrollHeight;
    }

    render();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    __lc_mount();
  } else {
    document.addEventListener('DOMContentLoaded', __lc_mount);
    window.addEventListener('load', __lc_mount);
  }
})();
` + '</' + 'script>';
    },

    injectIntoApp() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const snippet = this.generateStandaloneSnippet();
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

      if (targetApp && targetApp.html !== undefined) {
        targetApp.html = targetApp.html.replace(/<!-- Ultra Live Concierge[\s\S]*?<\/script>/gi, '');
        targetApp.html = targetApp.html.trim() + '\n\n' + snippet;

        if (targetApp.editor && targetApp.currentTab === 'html') {
          try { targetApp.editor.setValue(targetApp.html); } catch(e){}
        }

        if (typeof window.refreshPreview === 'function') {
          window.refreshPreview();
        } else if (typeof refreshPreview === 'function') {
          refreshPreview();
        }

        try {
          const previewFrame = document.getElementById('preview-frame');
          const pDoc = previewFrame ? (previewFrame.contentDocument || previewFrame.contentWindow?.document) : null;
          if (pDoc) {
            const oldRoot = pDoc.getElementById('__lc_root');
            if (oldRoot) oldRoot.remove();
            const s = pDoc.createElement('script');
            const jsCode = snippet.replace(/<script>([\s\S]*?)<\/script>/i, '$1').replace(/<!--[\s\S]*?-->/g, '');
            s.textContent = jsCode;
            (pDoc.body || pDoc.documentElement).appendChild(s);
          }
        } catch(e){
          console.warn('Live iframe chat injection fallback:', e);
        }

        this.close();
        _sound('celebrate');
        if (window.UltraConfetti && typeof window.UltraConfetti.fire === 'function') {
          window.UltraConfetti.fire(50);
        }
        _toast(isFr ? '💬 Widget Live Chat injecté avec succès dans l\'application !' : '💬 Live Chat widget injected into active application!', 'success');
      } else {
        _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
      }
    },

    async copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Live Chat Code')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const snippet = this.generateStandaloneSnippet();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(snippet);
        } else {
          const ta = document.createElement('textarea');
          ta.value = snippet;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        _sound('celebrate');
        _toast(isFr ? '📋 Code d\'intégration Live Chat copié !' : '📋 Live Chat embed code copied to clipboard!', 'success');
      } catch(e) {
        _toast(isFr ? 'Erreur de copie.' : 'Clipboard error.', 'warning');
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraLiveChatStudio = UltraLiveChatStudio;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('modal-livechat-studio');
        if (modal && modal.classList.contains('show')) {
          UltraLiveChatStudio.close();
        }
      }
    });
  }

  console.log('[ULTRA] Live Concierge & FAQ Chatbot Studio initialized.');
})();
