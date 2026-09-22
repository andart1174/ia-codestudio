(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🤖 AI & LLM STUDIO
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'AI & LLM STUDIO',
      sub: 'Generative AI Interface & API Builder',
      back: '← Back',
      inject: '➕ Inject Tool Code',
      injected: '✅ Tool Code Injected!',
      tools: {
        chatbot: { name: 'Chatbot UI Forge', desc: 'Generate a ChatGPT-style conversational interface with typing indicators.', injectBtn: 'Inject Chat UI' },
        apiFetch: { name: 'LLM API Fetch Streamer', desc: 'Generate JS fetch code for OpenAI/Anthropic with SSE streaming support.', injectBtn: 'Inject API Code' },
        promptChain: { name: 'Prompt Workflow Visualizer', desc: 'Generate a node-based UI for visualizing chained LLM prompts.', injectBtn: 'Inject Workflow UI' },
        voice: { name: 'Voice-to-App Interface', desc: 'Generate Web Speech API code for voice recognition and synthesis.', injectBtn: 'Inject Voice UI' },
        rag: { name: 'RAG Search UI Simulator', desc: 'Generate a Perplexity-style search interface with AI summaries.', injectBtn: 'Inject RAG UI' },
        persona: { name: 'AI Persona Configurator', desc: 'Generate a control panel to tweak System Prompts, Temperature, and Avatars.', injectBtn: 'Inject Persona UI' }
      }
    },
    fr: {
      title: 'STUDIO AI & LLM',
      sub: 'Créateur d\'interfaces IA Générative',
      back: '← Retour',
      inject: '➕ Injecter le Code',
      injected: '✅ Code de l\'outil injecté!',
      tools: {
        chatbot: { name: 'Forge Interface Chatbot', desc: 'Générez une interface style ChatGPT avec indicateur de frappe.', injectBtn: 'Injecter UI Chat' },
        apiFetch: { name: 'Streaming API LLM', desc: 'Code JS pour l\'API OpenAI/Anthropic avec support de flux (Streaming).', injectBtn: 'Injecter Code API' },
        promptChain: { name: 'Flux de Prompts', desc: 'Générez une UI basée sur des nœuds pour chaîner des requêtes IA.', injectBtn: 'Injecter Workflow' },
        voice: { name: 'Interface Vocale', desc: 'Générez le code Web Speech API pour la reconnaissance vocale.', injectBtn: 'Injecter UI Vocale' },
        rag: { name: 'Recherche RAG', desc: 'Interface de recherche style Perplexity avec résumés IA.', injectBtn: 'Injecter UI RAG' },
        persona: { name: 'Configurateur Persona', desc: 'Panneau de contrôle pour ajuster le Prompt Système et la Température.', injectBtn: 'Injecter Persona' }
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
    else console.log('[AI LLM Toast]:', msg);
  }

  window._injectAiLlmCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      showBannerToast(TX[lang].injected);
    }
  };

  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'aillmstudio') {
      window.activeTab = 'aillmstudio';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-aillmstudio');
      if (btn) btn.classList.add('active');
      window.initAiLlmStudio(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') originalRenderTab(tab);
  };

  window.initAiLlmStudio = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#020617; color:#f8fafc;">
        <div style="background:linear-gradient(135deg, rgba(168,85,247,0.1), rgba(139,92,246,0.1)); border-radius:14px; padding:16px; border:1px solid rgba(168,85,247,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
          <span style="font-size:32px; filter:drop-shadow(0 0 10px #a855f7);">🤖</span>
          <div>
            <h2 style="margin:0; color:#d8b4fe; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(168,85,247,0.4);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          
          <!-- 1. Chatbot UI Forge -->
          <div onclick="window.handleAiTool('chatbot')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(56, 189, 248, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#38bdf8'; this.style.boxShadow='0 0 15px rgba(56, 189, 248, 0.2)';" onmouseout="this.style.borderColor='rgba(56, 189, 248, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(56, 189, 248, 0.1); border-radius:10px; color:#38bdf8;">💬</div>
            <div style="flex:1;"><div style="color:#38bdf8; font-weight:800; font-size:13px;">${getTranslation('chatbot', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('chatbot', 'desc')}</div></div>
          </div>

          <!-- 2. LLM API Streamer -->
          <div onclick="window.handleAiTool('apiFetch')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(168, 85, 247, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#a855f7'; this.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.2)';" onmouseout="this.style.borderColor='rgba(168, 85, 247, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(168, 85, 247, 0.1); border-radius:10px; color:#a855f7;">🔌</div>
            <div style="flex:1;"><div style="color:#a855f7; font-weight:800; font-size:13px;">${getTranslation('apiFetch', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('apiFetch', 'desc')}</div></div>
          </div>

          <!-- 3. Prompt Chain -->
          <div onclick="window.handleAiTool('promptChain')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(245, 158, 11, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 15px rgba(245, 158, 11, 0.2)';" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(245, 158, 11, 0.1); border-radius:10px; color:#f59e0b;">🔗</div>
            <div style="flex:1;"><div style="color:#f59e0b; font-weight:800; font-size:13px;">${getTranslation('promptChain', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('promptChain', 'desc')}</div></div>
          </div>

          <!-- 4. Voice UI -->
          <div onclick="window.handleAiTool('voice')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(236, 72, 153, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ec4899'; this.style.boxShadow='0 0 15px rgba(236, 72, 153, 0.2)';" onmouseout="this.style.borderColor='rgba(236, 72, 153, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(236, 72, 153, 0.1); border-radius:10px; color:#ec4899;">🎙️</div>
            <div style="flex:1;"><div style="color:#ec4899; font-weight:800; font-size:13px;">${getTranslation('voice', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('voice', 'desc')}</div></div>
          </div>

          <!-- 5. RAG Simulator -->
          <div onclick="window.handleAiTool('rag')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(16, 185, 129, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.2)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">🧠</div>
            <div style="flex:1;"><div style="color:#10b981; font-weight:800; font-size:13px;">${getTranslation('rag', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('rag', 'desc')}</div></div>
          </div>

          <!-- 6. Persona Config -->
          <div onclick="window.handleAiTool('persona')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(244, 63, 94, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f43f5e'; this.style.boxShadow='0 0 15px rgba(244, 63, 94, 0.2)';" onmouseout="this.style.borderColor='rgba(244, 63, 94, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(244, 63, 94, 0.1); border-radius:10px; color:#f43f5e;">🎛️</div>
            <div style="flex:1;"><div style="color:#f43f5e; font-weight:800; font-size:13px;">${getTranslation('persona', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('persona', 'desc')}</div></div>
          </div>

        </div>
      </div>
    `;
  };

  window.handleAiTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initAiLlmStudio('${lang}')" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'chatbot') renderAiIntro(el, backBtn, toolId, lang, '#38bdf8', '💬', getChatbotCode(lang));
    else if (toolId === 'apiFetch') renderAiIntro(el, backBtn, toolId, lang, '#a855f7', '🔌', getApiFetchCode(lang));
    else if (toolId === 'promptChain') renderAiIntro(el, backBtn, toolId, lang, '#f59e0b', '🔗', getPromptChainCode(lang));
    else if (toolId === 'voice') renderAiIntro(el, backBtn, toolId, lang, '#ec4899', '🎙️', getVoiceCode(lang));
    else if (toolId === 'rag') renderAiIntro(el, backBtn, toolId, lang, '#10b981', '🧠', getRagCode(lang));
    else if (toolId === 'persona') renderAiIntro(el, backBtn, toolId, lang, '#f43f5e', '🎛️', getPersonaCode(lang));
  };

  function renderAiIntro(parent, backBtn, toolId, lang, color, icon, code) {
    const tx = TX[lang].tools[toolId];
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:${color}; margin:0 0 5px; font-size:15px; font-weight:800;">${icon} ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 20px;">${tx.desc}</p>
        
        <div style="background:#0f172a; border:1px dashed ${color}; border-radius:10px; padding:20px; text-align:center; margin-bottom:20px;">
          <div style="font-size:40px; margin-bottom:10px; opacity:0.8;">${icon}</div>
          <div style="color:#94a3b8; font-size:12px; margin-bottom:10px;">Ready to generate AI interface module.</div>
        </div>

        <button id="btnInject${toolId}" style="width:100%; padding:12px; border-radius:8px; background:${color}; border:none; color:#000; font-weight:900; font-size:13px; cursor:pointer; box-shadow:0 4px 15px ${color}44;">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    document.getElementById(`btnInject${toolId}`).addEventListener('click', () => {
      window._injectAiLlmCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // TOOL 1: Chatbot UI Forge
  // ═══════════════════════════════════════════
  function getChatbotCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Chat Interface</title>
<style>
  body { background: #212121; color: #ececf1; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; }
  
  /* Header */
  .header { padding: 15px 20px; background: #212121; border-bottom: 1px solid #4d4d4f; font-weight: 600; font-size: 16px; text-align: center; }
  
  /* Chat History */
  .chat-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
  
  .message { display: flex; gap: 15px; max-width: 800px; margin: 0 auto; width: 100%; }
  .avatar { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .avatar-user { background: #ec4899; color: white; }
  .avatar-ai { background: #10a37f; color: white; }
  
  .content { flex: 1; line-height: 1.6; font-size: 15px; word-wrap: break-word; }
  .content p { margin: 0 0 10px 0; }
  .content pre { background: #0d0d0d; padding: 10px; border-radius: 6px; overflow-x: auto; font-family: monospace; }
  
  /* Input Area */
  .input-wrapper { background: #212121; padding: 20px; border-top: 1px solid transparent; }
  .input-box { max-width: 800px; margin: 0 auto; background: #2f2f2f; border: 1px solid #4d4d4f; border-radius: 12px; display: flex; align-items: flex-end; padding: 10px 15px; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
  .input-box:focus-within { border-color: #10a37f; }
  textarea { background: transparent; border: none; color: #fff; width: 100%; resize: none; font-family: inherit; font-size: 15px; max-height: 200px; outline: none; padding: 0; margin-bottom: 2px; }
  .send-btn { background: #10a37f; border: none; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; transition: background 0.2s; margin-left: 10px; }
  .send-btn:hover { background: #0b8c6c; }
  .send-btn:disabled { background: #4d4d4f; cursor: not-allowed; color: #212121; }
  
  /* Typing Indicator */
  .typing { display: flex; gap: 4px; align-items: center; height: 24px; }
  .dot { width: 6px; height: 6px; background: #8e8ea0; border-radius: 50%; animation: blink 1.4s infinite both; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
</style>
</head>
<body>

  <div class="header">Chat AI Interface</div>
  
  <div class="chat-container" id="chatHistory">
    <!-- Initial Greeting -->
    <div class="message">
      <div class="avatar avatar-ai">🤖</div>
      <div class="content">
        <p>Hello! I am your AI assistant. How can I help you code today?</p>
      </div>
    </div>
  </div>

  <div class="input-wrapper">
    <div class="input-box">
      <textarea id="userInput" rows="1" placeholder="Send a message..." oninput="autoResize(this)" onkeydown="checkEnter(event)"></textarea>
      <button class="send-btn" id="sendBtn" onclick="sendMessage()">➤</button>
    </div>
    <div style="text-align:center; font-size:11px; color:#8e8ea0; margin-top:10px;">AI can make mistakes. Consider verifying important information.</div>
  </div>

<script>
  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    document.getElementById('sendBtn').disabled = textarea.value.trim() === '';
  }

  function checkEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function appendMessage(role, text) {
    const chat = document.getElementById('chatHistory');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    
    const isAi = role === 'ai';
    const avatar = isAi ? '<div class="avatar avatar-ai">🤖</div>' : '<div class="avatar avatar-user">U</div>';
    
    msgDiv.innerHTML = \`
      \${avatar}
      <div class="content">\${text}</div>
    \`;
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
    return msgDiv;
  }

  function appendTyping() {
    const chat = document.getElementById('chatHistory');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.id = 'typingIndicator';
    msgDiv.innerHTML = \`
      <div class="avatar avatar-ai">🤖</div>
      <div class="content">
        <div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      </div>
    \`;
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
  }

  function removeTyping() {
    const ind = document.getElementById('typingIndicator');
    if (ind) ind.remove();
  }

  function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', \`<p>\${text}</p>\`);
    input.value = '';
    autoResize(input);

    appendTyping();

    // Simulate AI Response delay
    setTimeout(() => {
      removeTyping();
      appendMessage('ai', \`<p>This is a simulated response to: "\${text}".</p><pre>console.log("AI is ready!");</pre>\`);
    }, 1500);
  }
  
  document.getElementById('sendBtn').disabled = true;
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 2: LLM API Fetch Streamer
  // ═══════════════════════════════════════════
  function getApiFetchCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>LLM API Stream Generator</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; }
  h1 { color: #a855f7; margin-top: 0; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .box { background: #1e293b; padding: 25px; border-radius: 12px; border: 1px solid #334155; }
  input, select, textarea { width: 100%; background: #0f172a; border: 1px solid #475569; color: #fff; padding: 12px; border-radius: 8px; box-sizing: border-box; margin-bottom: 15px; font-family: inherit; }
  button { width: 100%; padding: 14px; border-radius: 8px; background: #a855f7; color: #fff; border: none; font-weight: bold; cursor: pointer; font-size: 15px; }
  pre { background: #020617; border: 1px solid #334155; padding: 15px; border-radius: 8px; overflow-x: auto; color: #d8b4fe; font-size: 13px; line-height: 1.5; }
  
  .output-box { border: 1px dashed #a855f7; min-height: 150px; padding: 15px; border-radius: 8px; background: #0f172a; margin-top: 20px; color: #fff; line-height: 1.6; }
  .cursor { display: inline-block; width: 8px; height: 16px; background: #fff; animation: blink 1s step-start infinite; margin-left: 2px; vertical-align: middle; }
  @keyframes blink { 50% { opacity: 0; } }
</style>
</head>
<body>

  <h1>🔌 LLM API Fetch (SSE Stream)</h1>
  
  <div class="grid">
    <div class="box">
      <h3>1. Configuration</h3>
      <label>API Provider:</label>
      <select id="provider">
        <option value="openai">OpenAI (Chat Completions)</option>
        <option value="anthropic">Anthropic (Messages API)</option>
      </select>
      
      <label>System Prompt:</label>
      <textarea id="sysPrompt" rows="3">You are a helpful coding assistant.</textarea>
      
      <label>User Message:</label>
      <input type="text" id="userMsg" value="Write a short poem about code.">
      
      <button onclick="simulateStream()">▶ Test Simulated Stream</button>
      
      <div class="output-box" id="streamOutput">
        <span style="color:#64748b;">Stream output will appear here...</span>
      </div>
    </div>
    
    <div class="box">
      <h3>2. Production Ready Code (JavaScript)</h3>
      <p style="font-size:12px; color:#94a3b8; margin-top:0;">This code uses the native fetch API to read a Server-Sent Events stream from the LLM.</p>
      <pre id="codeView"></pre>
    </div>
  </div>

<script>
  function updateCode() {
    const provider = document.getElementById('provider').value;
    const sys = document.getElementById('sysPrompt').value;
    
    let code = '';
    if(provider === 'openai') {
      code = \`async function fetchOpenAIStream(userMessage) {
  const API_KEY = "YOUR_OPENAI_API_KEY";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \\\`Bearer \${API_KEY}\\\`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      stream: true,
      messages: [
        { role: "system", content: "\${sys}" },
        { role: "user", content: userMessage }
      ]
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\\n').filter(line => line.trim() !== '');
    
    for (const line of lines) {
      if (line.includes('[DONE]')) return;
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        const content = data.choices[0]?.delta?.content;
        if (content) {
          // TODO: Append content to your UI here
          process.stdout.write(content);
        }
      }
    }
  }
}\`;
    } else {
      code = \`// Anthropic Messages API Streaming Example
// Similar logic using TextDecoder but different JSON structure.\`;
    }
    document.getElementById('codeView').textContent = code;
  }

  document.getElementById('provider').addEventListener('change', updateCode);
  document.getElementById('sysPrompt').addEventListener('input', updateCode);
  updateCode();

  // Simulation Logic
  async function simulateStream() {
    const output = document.getElementById('streamOutput');
    output.innerHTML = '<span class="cursor"></span>';
    
    const text = "Coding in the dark,\\nFingers flying on the keys,\\nBugs run and hide.\\n\\nServers hum along,\\nLogic flows like a river,\\nBuild is passing now.";
    const chunks = text.split('');
    let i = 0;
    
    function streamNext() {
      if(i < chunks.length) {
        const char = chunks[i] === '\\n' ? '<br>' : chunks[i];
        output.innerHTML = output.innerHTML.replace('<span class="cursor"></span>', '') + char + '<span class="cursor"></span>';
        i++;
        setTimeout(streamNext, 30 + Math.random() * 50); // Random delay for realism
      } else {
        output.innerHTML = output.innerHTML.replace('<span class="cursor"></span>', ''); // Remove cursor at end
      }
    }
    streamNext();
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 3: Prompt Workflow Visualizer
  // ═══════════════════════════════════════════
  function getPromptChainCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Prompt Chain Visualizer</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; }
  h1 { color: #f59e0b; margin-top: 0; margin-bottom: 40px; text-align: center; }
  
  .workflow { display: flex; align-items: stretch; justify-content: center; gap: 0; position: relative; }
  
  .node { background: #1e293b; border: 2px solid #334155; border-radius: 12px; width: 250px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); position: relative; z-index: 2; transition: transform 0.3s, border-color 0.3s; }
  .node:hover { transform: translateY(-5px); border-color: #f59e0b; }
  
  .node-title { font-weight: 800; color: #fff; margin-bottom: 10px; font-size: 15px; display: flex; align-items: center; justify-content: space-between; }
  .badge { background: #f59e0b; color: #000; padding: 2px 8px; border-radius: 10px; font-size: 10px; }
  .node-desc { font-size: 12px; color: #94a3b8; margin-bottom: 15px; }
  
  .prompt-box { background: #0f172a; border: 1px solid #475569; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 11px; color: #fcd34d; height: 80px; overflow-y: auto; }
  
  /* Arrows */
  .arrow { display: flex; align-items: center; justify-content: center; width: 60px; z-index: 1; }
  .line { height: 4px; width: 100%; background: #475569; position: relative; }
  .line::after { content: ''; position: absolute; right: -5px; top: -5px; border-top: 7px solid transparent; border-bottom: 7px solid transparent; border-left: 10px solid #475569; }
  
  /* Animations */
  .active-node { border-color: #10b981; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
  .active-arrow .line { background: #10b981; }
  .active-arrow .line::after { border-left-color: #10b981; }
  
  .btn-run { display: block; width: 200px; margin: 50px auto 0; padding: 15px; background: #f59e0b; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.2s; }
  .btn-run:hover { background: #d97706; }
</style>
</head>
<body>

  <h1>🔗 AI Workflow: Blog Post Generator</h1>
  
  <div class="workflow" id="flowContainer">
    <!-- Step 1 -->
    <div class="node" id="n1">
      <div class="node-title">Step 1: Outline <span class="badge">GPT-4</span></div>
      <div class="node-desc">Generates the article structure.</div>
      <div class="prompt-box">System: You are an SEO expert.<br>User: Write an outline for a blog post about Web3 gaming.</div>
    </div>
    
    <div class="arrow" id="a1"><div class="line"></div></div>
    
    <!-- Step 2 -->
    <div class="node" id="n2">
      <div class="node-title">Step 2: Draft <span class="badge">Claude 3</span></div>
      <div class="node-desc">Expands outline into full text.</div>
      <div class="prompt-box">System: You are a copywriter.<br>User: Expand this outline into a 1000-word article: {output_from_step_1}</div>
    </div>
    
    <div class="arrow" id="a2"><div class="line"></div></div>
    
    <!-- Step 3 -->
    <div class="node" id="n3">
      <div class="node-title">Step 3: Review <span class="badge">Llama 3</span></div>
      <div class="node-desc">Proofreads and corrects logic.</div>
      <div class="prompt-box">System: You are an editor.<br>User: Fix grammar and improve flow in this text: {output_from_step_2}</div>
    </div>
  </div>
  
  <button class="btn-run" onclick="runChain()">▶ Execute Chain</button>

<script>
  async function runChain() {
    const nodes = [document.getElementById('n1'), document.getElementById('n2'), document.getElementById('n3')];
    const arrows = [document.getElementById('a1'), document.getElementById('a2')];
    
    // Reset
    nodes.forEach(n => n.classList.remove('active-node'));
    arrows.forEach(a => a.classList.remove('active-arrow'));
    
    for(let i=0; i<nodes.length; i++) {
      nodes[i].classList.add('active-node');
      
      // Simulate API delay
      await new Promise(r => setTimeout(r, 1500));
      
      nodes[i].classList.remove('active-node');
      
      if(i < arrows.length) {
        arrows[i].classList.add('active-arrow');
        await new Promise(r => setTimeout(r, 500));
      }
    }
    
    alert("Workflow execution complete! Final text generated.");
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 4: Voice-to-App Interface
  // ═══════════════════════════════════════════
  function getVoiceCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Voice AI Interface</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  h1 { color: #ec4899; margin-bottom: 50px; }
  
  .mic-btn { width: 120px; height: 120px; border-radius: 50%; background: #1e293b; border: 4px solid #ec4899; display: flex; align-items: center; justify-content: center; font-size: 50px; cursor: pointer; transition: all 0.3s; position: relative; z-index: 2; box-shadow: 0 10px 30px rgba(236,72,153,0.3); }
  .mic-btn:hover { transform: scale(1.05); }
  
  .waves { position: absolute; width: 120px; height: 120px; border-radius: 50%; background: rgba(236,72,153,0.4); z-index: 1; opacity: 0; }
  .listening .waves { animation: pulse 1.5s infinite ease-out; }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  .transcript { margin-top: 50px; width: 80%; max-width: 600px; min-height: 100px; background: #1e293b; border-radius: 12px; padding: 20px; font-size: 18px; line-height: 1.5; color: #fff; text-align: center; border: 1px solid #334155; }
  .status { margin-top: 15px; font-weight: bold; color: #ec4899; }
</style>
</head>
<body>

  <h1>🎙️ Voice Assistant UI</h1>
  
  <div style="position:relative;">
    <div class="waves"></div>
    <div class="mic-btn" id="micBtn" onclick="toggleListen()">🎤</div>
  </div>
  
  <div class="status" id="statusText">Tap to Speak</div>
  
  <div class="transcript" id="transcript">Your speech will appear here...</div>

<script>
  let isListening = false;
  let recognition;
  
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = function() {
      document.querySelector('.waves').parentElement.classList.add('listening');
      document.getElementById('statusText').innerText = "Listening...";
      document.getElementById('transcript').innerText = "";
    };
    
    recognition.onresult = function(event) {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }
      
      document.getElementById('transcript').innerHTML = 
        finalTranscript + '<i style="color:#ec4899;">' + interimTranscript + '</i>';
    };
    
    recognition.onend = function() {
      if(isListening) recognition.start(); // Keep listening
      else {
        document.querySelector('.waves').parentElement.classList.remove('listening');
        document.getElementById('statusText').innerText = "Tap to Speak";
      }
    };
  } else {
    document.getElementById('transcript').innerText = "Web Speech API not supported in this browser.";
  }

  function toggleListen() {
    if(!recognition) return alert("Speech API not supported here.");
    if(isListening) {
      isListening = false;
      recognition.stop();
    } else {
      isListening = true;
      recognition.start();
    }
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 5: RAG Search UI Simulator
  // ═══════════════════════════════════════════
  function getRagCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>RAG Search Simulator</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; align-items: center; }
  
  .search-container { width: 100%; max-width: 700px; position: relative; }
  .search-box { width: 100%; background: #1e293b; border: 2px solid #334155; border-radius: 30px; padding: 15px 25px; font-size: 18px; color: #fff; box-sizing: border-box; outline: none; transition: 0.3s; }
  .search-box:focus { border-color: #10b981; box-shadow: 0 0 15px rgba(16,185,129,0.3); }
  .search-btn { position: absolute; right: 10px; top: 10px; background: #10b981; border: none; border-radius: 20px; width: 40px; height: 40px; color: #fff; font-size: 18px; cursor: pointer; }
  
  .results-area { width: 100%; max-width: 700px; margin-top: 40px; display: none; }
  
  /* Sources Box */
  .sources { display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 10px; }
  .source-card { background: #1e293b; border: 1px solid #334155; padding: 10px 15px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 8px; white-space: nowrap; }
  .source-card img { width: 16px; height: 16px; }
  
  /* Answer Box */
  .answer-box { background: #1e293b; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; line-height: 1.6; color: #fff; }
  
  /* Skeleton Loading */
  .skeleton { background: #334155; height: 15px; margin-bottom: 10px; border-radius: 4px; animation: pulse 1.5s infinite; }
  .skeleton.w-50 { width: 50%; }
  .skeleton.w-80 { width: 80%; }
  .skeleton.w-100 { width: 100%; }
  
  @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
</style>
</head>
<body>

  <h1 style="color:#10b981; margin-bottom:30px;">🧠 AI Knowledge Search</h1>
  
  <div class="search-container">
    <input type="text" class="search-box" id="searchInput" placeholder="Ask anything... e.g., 'What is RAG?'" onkeypress="if(event.key==='Enter') executeSearch()">
    <button class="search-btn" onclick="executeSearch()">→</button>
  </div>
  
  <div class="results-area" id="resultsArea">
    <div style="font-weight:bold; margin-bottom:10px; color:#94a3b8;">📚 Sources Analyzed</div>
    <div class="sources" id="sourcesBox">
      <!-- Sources populated via JS -->
    </div>
    
    <div style="font-weight:bold; margin-bottom:10px; color:#10b981;">✨ Answer</div>
    <div class="answer-box" id="answerBox">
      <!-- Answer populated via JS -->
    </div>
  </div>

<script>
  async function executeSearch() {
    const q = document.getElementById('searchInput').value.trim();
    if(!q) return;
    
    const area = document.getElementById('resultsArea');
    const sources = document.getElementById('sourcesBox');
    const answer = document.getElementById('answerBox');
    
    area.style.display = 'block';
    sources.innerHTML = '<div class="skeleton w-100"></div>';
    answer.innerHTML = '<div class="skeleton w-100"></div><div class="skeleton w-80"></div><div class="skeleton w-50"></div>';
    
    // Simulate DB Retrieval (Vector Search)
    await new Promise(r => setTimeout(r, 1000));
    
    sources.innerHTML = \`
      <div class="source-card">📄 Wikipedia - LLMs</div>
      <div class="source-card">🌐 TechCrunch Article</div>
      <div class="source-card">🔬 ArXiv Paper 2304.123</div>
    \`;
    
    // Simulate LLM Generation
    await new Promise(r => setTimeout(r, 1200));
    
    answer.innerHTML = \`<p>Based on the sources retrieved, <strong>\${q}</strong> is answered as follows:</p>
    <p>Retrieval-Augmented Generation (RAG) is a technique that enhances large language models (LLMs) by grounding their answers in external knowledge bases. This reduces hallucinations and allows the AI to reference up-to-date, proprietary data without needing full model fine-tuning.</p>\`;
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 6: AI Persona Configurator
  // ═══════════════════════════════════════════
  function getPersonaCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>AI Persona Configurator</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; display: flex; justify-content: center; }
  .panel { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 30px; width: 100%; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
  h2 { color: #f43f5e; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 15px; }
  
  .avatar-picker { display: flex; gap: 15px; margin-bottom: 25px; }
  .avatar { width: 50px; height: 50px; border-radius: 50%; font-size: 25px; display: flex; align-items: center; justify-content: center; background: #0f172a; border: 2px solid #334155; cursor: pointer; transition: 0.2s; }
  .avatar.selected { border-color: #f43f5e; background: rgba(244, 63, 94, 0.2); transform: scale(1.1); }
  
  label { display: block; font-weight: bold; margin-bottom: 8px; font-size: 13px; color: #94a3b8; }
  textarea { width: 100%; background: #0f172a; border: 1px solid #475569; color: #fff; padding: 12px; border-radius: 8px; box-sizing: border-box; margin-bottom: 25px; font-family: inherit; resize: vertical; min-height: 100px; outline: none; }
  textarea:focus { border-color: #f43f5e; }
  
  .slider-container { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
  input[type="range"] { flex: 1; accent-color: #f43f5e; }
  .val-badge { background: #0f172a; border: 1px solid #475569; padding: 4px 12px; border-radius: 6px; font-family: monospace; }
  
  button { width: 100%; padding: 14px; border-radius: 8px; background: #f43f5e; color: #fff; border: none; font-weight: bold; cursor: pointer; font-size: 15px; transition: 0.2s; }
  button:hover { background: #e11d48; }
</style>
</head>
<body>

  <div class="panel">
    <h2>🎛️ AI Persona Settings</h2>
    
    <label>Bot Avatar</label>
    <div class="avatar-picker" id="avatars">
      <div class="avatar selected" onclick="selAvatar(this)">🤖</div>
      <div class="avatar" onclick="selAvatar(this)">🧙‍♂️</div>
      <div class="avatar" onclick="selAvatar(this)">👩‍⚕️</div>
      <div class="avatar" onclick="selAvatar(this)">🏴‍☠️</div>
    </div>
    
    <label>System Prompt (Behavior)</label>
    <textarea id="sysPrompt">You are a helpful and highly technical AI assistant. Always provide concise code snippets.</textarea>
    
    <label>Temperature (Creativity)</label>
    <div class="slider-container">
      <input type="range" id="temp" min="0" max="2" step="0.1" value="0.7" oninput="updateVal('temp')">
      <span class="val-badge" id="tempVal">0.7</span>
    </div>

    <label>Max Tokens</label>
    <div class="slider-container">
      <input type="range" id="tokens" min="256" max="4096" step="256" value="2048" oninput="updateVal('tokens')">
      <span class="val-badge" id="tokensVal">2048</span>
    </div>
    
    <button onclick="savePersona()">Save Configuration</button>
  </div>

<script>
  function selAvatar(el) {
    document.querySelectorAll('.avatar').forEach(a => a.classList.remove('selected'));
    el.classList.add('selected');
  }

  function updateVal(id) {
    document.getElementById(id + 'Val').innerText = document.getElementById(id).value;
  }

  function savePersona() {
    const avatar = document.querySelector('.avatar.selected').innerText;
    const prompt = document.getElementById('sysPrompt').value;
    const temp = document.getElementById('temp').value;
    
    const config = { avatar, prompt, temperature: parseFloat(temp) };
    alert("Persona Saved!\\n\\n" + JSON.stringify(config, null, 2));
  }
</script>
</body>
</html>`;
  }

  // Hook localization switcher
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') originalApplyLang();
    const currentLang = gl();
    const sideLbl = document.getElementById('lbl-tab-aillmstudio');
    if (sideLbl) sideLbl.textContent = currentLang === 'fr' ? 'Studio AI & LLM' : 'AI & LLM Studio';
    if (window.activeTab === 'aillmstudio') window.initAiLlmStudio(currentLang);
  };

  console.log('🤖 AI & LLM Studio loaded successfully!');
})();
