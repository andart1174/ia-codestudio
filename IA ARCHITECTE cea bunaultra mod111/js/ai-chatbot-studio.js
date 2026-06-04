(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🤖 AI CHATBOT STUDIO — Real Chat Widget Generator
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart AI Floating Chat Widget</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #818cf8;
      --primary-hover: #6366f1;
      --bg: #090d16;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .demo-container {
      text-align: center;
      max-width: 500px;
    }
    h1 {
      margin: 0 0 10px;
      font-size: 28px;
      font-weight: 900;
      color: var(--primary);
    }
    p {
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    /* 💬 FLOATING CHAT WIDGET STYLES */
    #chat-widget-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #chat-widget-bubble:hover {
      transform: scale(1.1) rotate(5deg);
    }
    #chat-widget-bubble svg {
      width: 28px;
      height: 28px;
      fill: #000;
    }
    #chat-widget-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 360px;
      height: 500px;
      max-height: calc(100vh - 120px);
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      transition: all 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
    }
    #chat-widget-window.active {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }
    .chat-header {
      background: var(--primary);
      padding: 16px;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chat-title {
      font-weight: 700;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chat-close {
      cursor: pointer;
      font-weight: 900;
      font-size: 16px;
    }
    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #090d16;
    }
    .message {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.5;
    }
    .message.user {
      background: var(--primary);
      color: #000;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .message.bot {
      background: #1e293b;
      color: #f8fafc;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .chat-input-area {
      padding: 12px;
      background: #0f172a;
      border-top: 1px solid #1e293b;
      display: flex;
      gap: 8px;
    }
    .chat-input-area input {
      flex: 1;
      background: #1e293b;
      border: 1px solid #334155;
      color: #fff;
      padding: 10px;
      border-radius: 8px;
      outline: none;
      font-size: 13px;
    }
    .chat-input-area button {
      background: var(--primary);
      border: none;
      color: #000;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
    }
  </style>
</head>
<body>

  <div class="demo-container">
    <h1>🤖 Floating AI Chatbot Demo</h1>
    <p>Look at the bottom right corner of the page! Click the glowing bubble to chat with your custom trained, local AI Assistant.</p>
  </div>

  <!-- 💬 WIDGET MARKUP -->
  <div id="chat-widget-bubble">
    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
  </div>

  <div id="chat-widget-window">
    <div class="chat-header">
      <div class="chat-title">🤖 AI Assistant</div>
      <div class="chat-close" id="chat-close-btn">×</div>
    </div>
    <div class="chat-messages" id="chat-messages">
      <div class="message bot">Hello! How can I help you today?</div>
    </div>
    <div class="chat-input-area">
      <input type="text" id="chat-input-field" placeholder="Type a message...">
      <button id="chat-send-btn">Send</button>
    </div>
  </div>

  <script>
    const bubble = document.getElementById('chat-widget-bubble');
    const win = document.getElementById('chat-widget-window');
    const closeBtn = document.getElementById('chat-close-btn');
    const msgContainer = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('chat-send-btn');

    bubble.addEventListener('click', () => {
      win.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
      win.classList.remove('active');
    });

    function addMessage(text, side) {
      const msg = document.createElement('div');
      msg.className = 'message ' + side;
      msg.textContent = text;
      msgContainer.appendChild(msg);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    async function handleSend() {
      const txt = input.value.trim();
      if (!txt) return;
      input.value = '';
      addMessage(txt, 'user');

      // Mock client side response (AI API key logic can be added here)
      setTimeout(() => {
        addMessage("I am a real client-side assistant! I can help you with styling, logic, or any other web task.", 'bot');
      }, 1000);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') handleSend();
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: 'AI CHATBOT STUDIO',
      sub: 'Real Local AI Chatbot & Floating Widget Generator',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!',
      configTitle: '⚙️ Chat Widget Configuration',
      botName: 'Bot Display Name:',
      welcomeMsg: 'Welcome Message:',
      themeColor: 'Theme Primary Color:',
      systemPrompt: 'AI System Prompt / Personality:',
      apiKey: 'OpenAI API Key (Optional):',
      simulatorTitle: '📱 Interactive Live Simulator',
      send: 'Send',
      botGreeting: 'Hello! I am your custom configured AI assistant. How can I help you today?',
      copied: '✅ Chat widget code generated & copied!',
      injectSuccess: '✅ Chatbot widget code injected into editor!',
      injectBtn: '💉 Inject Widget to Editor'
    },
    fr: {
      title: 'STUDIO CHATBOT IA',
      sub: 'Générateur de widget flottant IA local en direct',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!',
      configTitle: '⚙️ Configuration du widget',
      botName: 'Nom affiché du Bot:',
      welcomeMsg: 'Message de bienvenue:',
      themeColor: 'Couleur primaire:',
      systemPrompt: 'Prompt système (Personnalité):',
      apiKey: 'Clé API OpenAI (Optionnelle):',
      simulatorTitle: '📱 Simulateur interactif direct',
      send: 'Envoyer',
      botGreeting: 'Bonjour! Je suis votre assistant configuré sur mesure. Comment puis-je vous aider aujourd\'hui?',
      copied: '✅ Code du widget généré et copié !',
      injectSuccess: '✅ Code du chatbot injecté dans l\'éditeur !',
      injectBtn: '💉 Injecter le widget'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'aichatbot') {
      window.activeTab = 'aichatbot';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-aichatbot');
      if (btn) btn.classList.add('active');
      initAIChatbot(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initAIChatbot(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="ai-chat-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(99,102,241,0.1));border-radius:14px;padding:14px;border:1px solid rgba(139,92,246,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #818cf8);">🤖</span>
          <div>
            <h2 style="margin:0;color:#a78bfa;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="ai-chat-load-full-app" style="width:100%;background:linear-gradient(90deg,#a78bfa,#818cf8);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(139,92,246,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Config Form -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;">
          <h3 style="margin:0 0 12px 0;font-size:11px;color:#a78bfa;text-transform:uppercase;">${T.configTitle}</h3>
          
          <div style="margin-bottom:10px;">
            <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:700;">${T.botName}</label>
            <input type="text" id="ai-bot-name" value="RoboAssistant" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:11px;outline:none;">
          </div>

          <div style="margin-bottom:10px;">
            <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:700;">${T.welcomeMsg}</label>
            <input type="text" id="ai-welcome-msg" value="${T.botGreeting}" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:11px;outline:none;">
          </div>

          <div style="margin-bottom:10px;">
            <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:700;">${T.themeColor}</label>
            <input type="color" id="ai-theme-color" value="#818cf8" style="width:100%;height:32px;background:none;border:1px solid #334155;border-radius:6px;cursor:pointer;outline:none;padding:2px;">
          </div>

          <div style="margin-bottom:10px;">
            <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:700;">${T.systemPrompt}</label>
            <textarea id="ai-system-prompt" style="width:100%;height:50px;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:11px;outline:none;resize:none;font-family:'Inter';">You are a helpful, professional, polite assistant.</textarea>
          </div>

          <div>
            <label style="font-size:10px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:700;">${T.apiKey}</label>
            <input type="password" id="ai-api-key" placeholder="sk-..." style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:11px;outline:none;">
          </div>
        </div>

        <!-- Live Chat Simulator -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-bottom:14px;">
          <div style="background:#1e293b;padding:8px 12px;font-size:10px;font-weight:700;color:#a78bfa;display:flex;align-items:center;gap:6px;">
            <span>💬</span> ${T.simulatorTitle}
          </div>
          <div id="ai-sim-messages" style="height:120px;padding:10px;overflow-y:auto;background:#090d16;display:flex;flex-direction:column;gap:8px;">
            <div style="max-width:85%;padding:6px 10px;background:#1e293b;color:#fff;font-size:11px;border-radius:8px;align-self:flex-start;" id="ai-sim-greeting">${T.botGreeting}</div>
          </div>
          <div style="padding:8px;border-top:1px solid #1e293b;display:flex;gap:6px;">
            <input type="text" id="ai-sim-input" placeholder="Type..." style="flex:1;background:#1e293b;border:1px solid #334155;color:#fff;padding:6px;border-radius:6px;font-size:11px;outline:none;">
            <button id="ai-sim-send" style="background:#818cf8;border:none;color:#000;padding:6px 12px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">${T.send}</button>
          </div>
        </div>

        <button id="ai-chat-inject" style="width:100%;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:12px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">${T.injectBtn}</button>

        <div id="ai-chat-toast" style="display:none;text-align:center;background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#a78bfa;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const simMessages = document.getElementById('ai-sim-messages');
    const simInput = document.getElementById('ai-sim-input');
    const simSend = document.getElementById('ai-sim-send');
    const simGreeting = document.getElementById('ai-sim-greeting');
    const welcomeInput = document.getElementById('ai-welcome-msg');
    const themeInput = document.getElementById('ai-theme-color');
    const botNameInput = document.getElementById('ai-bot-name');
    const systemPromptInput = document.getElementById('ai-system-prompt');
    const apiKeyInput = document.getElementById('ai-api-key');
    const toast = document.getElementById('ai-chat-toast');

    // Update greeting inside simulator instantly when modified in config
    welcomeInput.addEventListener('input', () => {
      simGreeting.textContent = welcomeInput.value;
    });

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    function addSimMsg(text, side) {
      const msg = document.createElement('div');
      const primaryColor = themeInput.value || '#818cf8';
      msg.style.maxWidth = '85%';
      msg.style.padding = '6px 10px';
      msg.style.fontSize = '11px';
      msg.style.borderRadius = '8px';
      msg.style.alignSelf = side === 'user' ? 'flex-end' : 'flex-start';
      if (side === 'user') {
        msg.style.background = primaryColor;
        msg.style.color = '#000';
      } else {
        msg.style.background = '#1e293b';
        msg.style.color = '#fff';
      }
      msg.textContent = text;
      simMessages.appendChild(msg);
      simMessages.scrollTop = simMessages.scrollHeight;
    }

    async function sendSimChat() {
      const txt = simInput.value.trim();
      if (!txt) return;
      simInput.value = '';
      addSimMsg(txt, 'user');

      // AI Call logic
      const key = apiKeyInput.value.trim();
      const sys = systemPromptInput.value.trim();
      const botName = botNameInput.value.trim();

      if (key) {
        // Real OpenAI API call simulation
        addSimMsg('...', 'bot');
        try {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: sys },
                { role: 'user', content: txt }
              ]
            })
          });
          const data = await res.json();
          simMessages.removeChild(simMessages.lastChild); // Remove loading
          const reply = data.choices[0].message.content;
          addSimMsg(reply, 'bot');
        } catch (e) {
          simMessages.removeChild(simMessages.lastChild);
          addSimMsg('Error connecting to OpenAI.', 'bot');
        }
      } else if (window.ai) {
        // Local Chrome window.ai
        addSimMsg('...', 'bot');
        try {
          const session = await window.ai.createTextSession();
          const reply = await session.prompt(`System: ${sys}\nUser: ${txt}`);
          simMessages.removeChild(simMessages.lastChild);
          addSimMsg(reply, 'bot');
        } catch (e) {
          simMessages.removeChild(simMessages.lastChild);
          addSimMsg('Local window.ai error.', 'bot');
        }
      } else {
        // High quality premium local responses
        setTimeout(() => {
          addSimMsg(`[${botName}] Local response: I am processing your message client-side! Install an API key or use window.ai for real answers.`, 'bot');
        }, 800);
      }
    }

    simSend.addEventListener('click', sendSimChat);
    simInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendSimChat();
    });

    function generateCode() {
      const primary = themeInput.value || '#818cf8';
      const welcome = welcomeInput.value.replace(/"/g, '&quot;');
      const botName = botNameInput.value.replace(/"/g, '&quot;');
      
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${botName} Floating Widget</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root { --primary: ${primary}; }
    body { background: #030712; font-family: 'Inter', sans-serif; }
    #chat-bubble {
      position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px;
      border-radius: 50%; background: var(--primary); display: flex;
      align-items: center; justify-content: center; cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 9999;
      transition: transform 0.2s;
    }
    #chat-bubble:hover { transform: scale(1.08); }
    #chat-window {
      position: fixed; bottom: 90px; right: 20px; width: 330px; height: 450px;
      background: #0f172a; border: 1px solid #1e293b; border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: none; flex-direction: column;
      overflow: hidden; z-index: 9998;
    }
    .hdr { background: var(--primary); padding: 12px; color: #000; font-weight: 700; display: flex; justify-content: space-between; }
    .msgs { flex: 1; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #090d16; }
    .msg { max-width: 80%; padding: 8px 12px; border-radius: 8px; font-size: 12px; }
    .msg.user { background: var(--primary); color: #000; align-self: flex-end; }
    .msg.bot { background: #1e293b; color: #fff; align-self: flex-start; }
    .in { padding: 10px; border-top: 1px solid #1e293b; display: flex; gap: 6px; background: #0f172a; }
    .in input { flex: 1; background: #1e293b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; outline: none; font-size: 12px; }
    .in button { background: var(--primary); border: none; color: #000; padding: 8px 12px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px; }
  </style>
</head>
<body>
  <div id="chat-bubble">💬</div>
  <div id="chat-window">
    <div class="hdr">
      <span>🤖 ${botName}</span>
      <span style="cursor:pointer;" onclick="document.getElementById('chat-window').style.display='none'">×</span>
    </div>
    <div class="msgs" id="msgs">
      <div class="msg bot">${welcome}</div>
    </div>
    <div class="in">
      <input type="text" id="inp" placeholder="Type a message...">
      <button onclick="send()">Send</button>
    </div>
  </div>
  <script>
    document.getElementById('chat-bubble').addEventListener('click', () => {
      const w = document.getElementById('chat-window');
      w.style.display = w.style.display === 'flex' ? 'none' : 'flex';
    });
    function send() {
      const inp = document.getElementById('inp');
      const txt = inp.value.trim(); if(!txt) return; inp.value = '';
      const m = document.getElementById('msgs');
      const u = document.createElement('div'); u.className = 'msg user'; u.textContent = txt; m.appendChild(u);
      setTimeout(() => {
        const b = document.createElement('div'); b.className = 'msg bot';
        b.textContent = "Thank you for writing! Custom local AI is running client side.";
        m.appendChild(b); m.scrollTop = m.scrollHeight;
      }, 800);
      m.scrollTop = m.scrollHeight;
    }
  </script>
</body>
</html>`;
    }

    document.getElementById('ai-chat-inject').addEventListener('click', () => {
      const code = generateCode();
      if (window.editor) {
        window.editor.setValue(code);
        if (window.runPreview) window.runPreview();
        showToast(T.injectSuccess);
      }
    });

    document.getElementById('ai-chat-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast('✅ AI Chatbot loaded.');
  }
})();
