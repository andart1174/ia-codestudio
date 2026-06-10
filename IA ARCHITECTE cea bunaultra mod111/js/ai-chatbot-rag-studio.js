/**
 * 🤖 AI Multi-Discipline Tutor & RAG Studio v4.0
 * IA Architecte — Code Studio Pro | Standalone App Builder v4.0
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'AI Chatbot',
    title: '🤖 AI Tutor & RAG Knowledge Base',
    sub: 'Design custom AI tutors with math (LaTeX) and coding (Prism)',
    desc: 'Build general, mathematical, or programming AI tutors. Upload textbooks or documentation files to index facts. Test in the playground (supporting LaTeX equations & syntax coloring), then inject code directly into Monaco.',
    btnInject: '🔮 Inject Standalone Studio into Monaco',
    lblSettings: 'AI Tutor Settings',
    lblName: 'Tutor Name',
    lblSystemPrompt: 'System Instructions (Prompt)',
    lblTemp: 'Temperature',
    lblApiKey: 'Gemini API Key (Optional)',
    lblPreset: 'Tutor Subject Preset',
    lblUpload: '📁 Upload Textbook / Documentation File',
    lblRag: 'RAG Knowledge Base (Chunked Facts)',
    btnAddFact: '➕ Add Fact',
    factPlaceholder: 'Add a fact, math formula, or coding standard...',
    lblPlayground: 'Interactive Playground Chat',
    chatPlaceholder: 'Ask a math question, request code, or query textbook...',
    btnSend: 'Send',
    mockIndicator: 'Running in offline simulation mode. Add Gemini key above for live AI.',
    injected: 'Standalone RAG Tutor Studio injected into Monaco!',
    copied: 'Copied!',
    noHTML: 'No HTML code found or Monaco editor not active.',
    btnDelete: 'Delete',
    presetGeneral: '📖 General Book Explainer',
    presetMath: '🧮 Math Tutor (LaTeX)',
    presetCode: '💻 Code Assistant (Highlight)',
    lblShowingFacts: 'Showing {count} of {total} paragraphs. All content is indexed for AI.',
    btnExportJson: 'Export JSON',
    btnImportJson: 'Import JSON',
    voiceListening: 'Listening...',
    voiceSynthesis: 'Read Response',
    btnEdit: 'Edit',
    lblColorHue: 'Tutor Neon Theme Color',
    btnQuiz: '📝 Generate Quiz',
    lblChatSessions: 'Chat Sessions',
    btnNewChat: 'New Chat',
    quizCorrect: 'Correct! 🎉',
    quizWrong: 'Wrong! ❌',
    quizScore: 'Your score: {score} of {total}'
  },
  fr: {
    tab: 'AI Chatbot',
    title: '🤖 Assistant AI & Base RAG',
    sub: 'Créez des tuteurs IA avec math (LaTeX) et codage (Prism)',
    desc: 'Construisez des agents IA spécialisés en lecture, maths ou développement. Téléchargez des manuels ou de la documention. Testez dans le playground (LaTeX et coloration Prism actifs) puis injectez dans Monaco.',
    btnInject: '🔮 Injecter le Studio Standalone dans Monaco',
    lblSettings: 'Configuration du Tuteur',
    lblName: 'Nom du Tuteur',
    lblSystemPrompt: 'Instructions Système',
    lblTemp: 'Température',
    lblApiKey: 'Clé API Gemini (Optionnel)',
    lblPreset: 'Spécialité du Tuteur',
    lblUpload: '📁 Charger un Manuel / Fichier Doc',
    lblRag: 'Base de Connaissances RAG (Faits Extraits)',
    btnAddFact: '➕ Ajouter un Fait',
    factPlaceholder: 'Ajouter un fait, une formule ou une règle de code...',
    lblPlayground: 'Playground Interactif',
    chatPlaceholder: 'Posez des questions sur le manuel, les maths, demandez du code...',
    btnSend: 'Envoyer',
    mockIndicator: 'Mode simulation hors-ligne. Entrez eine clé API Gemini pour l\'IA réelle.',
    injected: 'Studio RAG Standalone injecté dans Monaco !',
    copied: 'Copié !',
    noHTML: 'Aucun HTML trouvé ou Monaco inactif.',
    btnDelete: 'Supprimer',
    presetGeneral: '📖 Lecteur & Analyseur Général',
    presetMath: '🧮 Tuteur de Maths (LaTeX)',
    presetCode: '💻 Assistant de Codage (Coloration)',
    lblShowingFacts: 'Affichage de {count} sur {total} paragraphes. Tout le contenu est indexé pour l\'IA.',
    btnExportJson: 'Exporter JSON',
    btnImportJson: 'Importer JSON',
    voiceListening: 'Écoute en cours...',
    voiceSynthesis: 'Lire réponse',
    btnEdit: 'Modifier',
    lblColorHue: 'Couleur de thème néon',
    btnQuiz: '📝 Générer Quiz',
    lblChatSessions: 'Sessions de Chat',
    btnNewChat: 'Nouveau Chat',
    quizCorrect: 'Correct! 🎉',
    quizWrong: 'Faux! ❌',
    quizScore: 'Votre score: {score} de {total}'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

// Local states
let chatbotName = 'AI Tutor';
let systemPreset = 'general'; // general, math, code
let systemPrompt = 'You are an expert AI Tutor. Guide the user step-by-step. Use only the provided textbook context if available.';
let temperature = 0.6;
let apiKey = '';
let currentHue = 150; // Initial general Green hue

let facts = [
  'Flash Shop sells the following art products: PORTRAIT 01 ($50), LANDSCAPE 03 ($65), CITY 05 ($45), and STUDIO 02 ($40).',
  'Quadratic equation roots formula: When ax^2 + bx + c = 0, roots are given by x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.',
  'Binary Search algorithm operates in O(log n) time complexity by dividing search space in half repeatedly.',
  'Return policy allows refunds within 14 days of delivery if items are in original condition.'
];

// Multi-session chat support
let sessions = [
  { id: 'session_default', name: 'General Chat', messages: [] }
];
let activeSessionId = 'session_default';

let isGenerating = false;
let newFactText = '';
let currentChatInput = '';

// Active Quiz State
let activeQuiz = null;

// Load resources dynamically
function loadResourcesInParent() {
  if (!window.Prism) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    document.head.appendChild(script);
  }

  if (!window.katex) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
    document.head.appendChild(script);
    
    const contrib = document.createElement('script');
    contrib.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js';
    document.head.appendChild(contrib);
  }
}

function handlePresetChange(val) {
  systemPreset = val;
  if (val === 'math') {
    chatbotName = 'Math Tutor';
    currentHue = 45; // Golden hue
    systemPrompt = 'You are a professional Mathematics Professor. Explain mathematical problems step-by-step. Render formulas using LaTeX format using $ or $$ delimiter tags.';
  } else if (val === 'code') {
    chatbotName = 'Code Master';
    currentHue = 240; // Indigo hue
    systemPrompt = 'You are an expert Coding Assistant. Provide clean, well-commented code blocks. Explain patterns step-by-step and specify language syntaxes in code fences (e.g. ```javascript).';
  } else {
    chatbotName = 'Book Reader';
    currentHue = 150; // Green hue
    systemPrompt = 'You are a literary analyst and tutor. Explain concepts based on the uploaded book. Answer precisely citing paragraphs.';
  }
  updateLocalHueCSS();
  renderChatbotTab();
}

function updateLocalHueCSS() {
  const root = document.getElementById('left-body');
  if (root) {
    root.style.setProperty('--primary', `hsl(${currentHue}, 85%, 50%)`);
    root.style.setProperty('--primary-fade', `hsla(${currentHue}, 85%, 50%, 0.06)`);
  }
}

function addFact() {
  const text = newFactText.trim();
  if (text) {
    facts.push(text);
    newFactText = '';
    if (window.showToast) window.showToast('Fact added!');
    renderChatbotTab();
  }
}

function deleteFact(index) {
  facts.splice(index, 1);
  if (window.showToast) window.showToast('Fact deleted!');
  renderChatbotTab();
}

// Local RAG TF-IDF Matcher
function queryLocalRag(query) {
  const stopwords = new Set([
    'the', 'and', 'for', 'with', 'you', 'this', 'that', 'from', 'have', 'are', 'was', 'were', 'been',
    'der', 'die', 'das', 'und', 'ist', 'mit', 'von', 'eine', 'einer',
    'une', 'des', 'les', 'dans', 'pour', 'avec', 'dans', 'cette', 'sont'
  ]);
  const queryWords = query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopwords.has(w));
  
  if (queryWords.length === 0 || facts.length === 0) {
    return { context: facts[0] || null, matchScore: 0 };
  }

  // Calculate IDF
  const idf = {};
  queryWords.forEach(word => {
    let docFreq = 0;
    facts.forEach(fact => {
      if (fact.toLowerCase().includes(word)) docFreq++;
    });
    idf[word] = Math.log(facts.length / (docFreq + 1)) + 1;
  });

  let bestMatch = null;
  let maxScore = -1;

  facts.forEach(fact => {
    let score = 0;
    const factText = fact.toLowerCase();
    queryWords.forEach(word => {
      if (factText.includes(word)) {
        const tf = (factText.split(word).length - 1);
        score += tf * idf[word];
      }
    });
    if (score > maxScore) {
      maxScore = score;
      bestMatch = fact;
    }
  });

  return { context: bestMatch, matchScore: maxScore };
}

// Synthesize local simulation responses
function getMockResponse(query, context) {
  const q = query.toLowerCase();
  
  if (systemPreset === 'math') {
    if (q.includes('equation') || q.includes('quadratic') || q.includes('roots')) {
      return `To solve a quadratic equation $ax^2 + bx + c = 0$, we use the quadratic formula:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n**Example:** For $x^2 - 5x + 6 = 0$, $a=1$, $b=-5$, $c=6$.\n\n$$x = \\frac{5 \\pm \\sqrt{25 - 24}}{2} = \\frac{5 \\pm 1}{2}$$\n\nSo $x_1 = 3$ and $x_2 = 2$.`;
    }
    return `Mathematical statement: ${context ? `Using textbook formula: "${context}"` : 'Please ask a math problem or input formulas.'}`;
  }

  if (systemPreset === 'code') {
    if (q.includes('search') || q.includes('binary') || q.includes('algorithm')) {
      return `Here is the Binary Search algorithm implementation in JavaScript:\n\n\`\`\`javascript\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\`\`\`\n\n**Complexity:** Time complexity is $O(\\log n)$ as noted in context.`;
    }
    return `Here is a custom function code block:\n\n\`\`\`javascript\n// Injected code helper\nfunction processData(data) {\n  console.log("Analyzing:", data);\n  return { success: true, timestamp: Date.now() };\n}\n\`\`\``;
  }

  if (context) {
    return `[Offline Simulation Mode] Matched paragraph from document:

"${context}"

💡 Note: Fill in your Gemini API Key in the left panel to connect live Google AI. / Note : Entrez votre clé API Gemini dans le panneau de gauche pour activer l'IA en direct.`;
  }
  
  return `Hello! I am your AI Book Reader. I couldn't find specific details for "${query}" in my knowledge base. Please upload a textbook to teach me more!`;
}

// Dispatch message
async function sendMessage() {
  const text = currentChatInput.trim();
  if (!text || isGenerating) return;

  const session = sessions.find(s => s.id === activeSessionId) || sessions[0];
  session.messages.push({ role: 'user', content: text });
  currentChatInput = '';
  isGenerating = true;
  renderChatbotTab();

  const ragResult = queryLocalRag(text);

  // Trigger Local SVG graph pulse
  const matchedIdx = facts.indexOf(ragResult.context);
  if (matchedIdx !== -1) {
    triggerNodeFlash(matchedIdx);
  }

  setTimeout(async () => {
    let reply = '';
    
    if (apiKey.trim()) {
      try {
        const promptContext = ragResult.context 
          ? `[TEXTBOOK KNOWLEDGE CONTEXT]: ${ragResult.context}\n\n`
          : `[NO RELATED TEXTBOOK CONTEXT FOUND]\n\n`;
        const prompt = `${systemPrompt}\n\n${promptContext}User Query: ${text}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: parseFloat(temperature) || 0.6 }
          })
        });

        if (!res.ok) throw new Error('API failure');
        const data = await res.json();
        reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (err) {
        reply = `❌ Gemini API Error: ${err.message}. Offline simulation triggered.`;
      }
    }

    if (!reply || reply.startsWith('❌')) {
      reply = (reply ? reply + '\n\n' : '') + getMockResponse(text, ragResult.context);
    }

    session.messages.push({ role: 'bot', content: reply });
    isGenerating = false;
    renderChatbotTab();
    
    // Asynchronously trigger math & code rendering
    setTimeout(() => {
      const box = document.getElementById('aichat-messages-box');
      if (box) {
        box.scrollTop = box.scrollHeight;
        if (window.renderMathInElement) {
          window.renderMathInElement(box, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
        if (window.Prism) {
          window.Prism.highlightAllUnder(box);
        }
      }
    }, 50);
  }, 700);
}

// Local SVG flash triggers
function triggerNodeFlash(idx) {
  setTimeout(() => {
    const el = document.getElementById(`rag-node-${idx}`);
    if (el) {
      el.setAttribute('fill', '#ff0055');
      el.setAttribute('r', '8');
      
      const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      anim.setAttribute("attributeName", "r");
      anim.setAttribute("values", "8;12;8");
      anim.setAttribute("dur", "0.6s");
      anim.setAttribute("repeatCount", "2");
      el.appendChild(anim);
      anim.beginElement();

      setTimeout(() => {
        el.setAttribute('fill', `hsl(${currentHue}, 85%, 50%)`);
        el.setAttribute('r', '5');
        el.innerHTML = '';
      }, 1200);
    }
  }, 50);
}

// Generate interactive quiz
async function buildQuiz() {
  const session = sessions.find(s => s.id === activeSessionId) || sessions[0];
  isGenerating = true;
  renderChatbotTab();

  let quizData = null;

  if (apiKey.trim()) {
    try {
      const prompt = `Based ONLY on this textbook context:\n${facts.slice(0,25).join('\n')}\n\n` +
        `Generate a 3-question multiple choice quiz. Output STRICTLY a JSON array where each object has fields: "question" (string), "options" (array of 4 strings), and "answerIdx" (integer 0-3). Output ONLY raw JSON, no markdown formatting.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      quizData = JSON.parse(rawText.replace(/```(json)?/g, '').trim());
    } catch(err) {
      quizData = null;
    }
  }

  // Fallback / Mock Quiz Data
  if (!quizData) {
    if (systemPreset === 'math') {
      quizData = [
        { question: "What is the formula to solve ax^2 + bx + c = 0?", options: ["x = -b ± √D / 2a", "x = -b / 2a", "x = -c / a", "x = (a+b)/c"], answerIdx: 0 },
        { question: "Under what condition does ax^2 + bx + c = 0 have real roots?", options: ["b^2 - 4ac < 0", "b^2 - 4ac >= 0", "a = 0", "b = 0"], answerIdx: 1 }
      ];
    } else if (systemPreset === 'code') {
      quizData = [
        { question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answerIdx: 1 },
        { question: "What sorting condition is required for Binary Search?", options: ["Unsorted", "Sorted descending only", "Sorted ascending or descending", "It does not matter"], answerIdx: 2 }
      ];
    } else {
      quizData = [
        { question: "What is the price of PORTRAIT 01 in Flash Shop?", options: ["$40", "$50", "$65", "$45"], answerIdx: 1 },
        { question: "How many days does the refund policy allow?", options: ["7 days", "14 days", "30 days", "No refunds"], answerIdx: 1 }
      ];
    }
  }

  activeQuiz = {
    questions: quizData,
    currentIdx: 0,
    score: 0,
    answers: []
  };

  isGenerating = false;
  
  // Inject Quiz UI directly into Chat
  session.messages.push({
    role: 'bot',
    isQuiz: true,
    content: "Started a new quiz session! Let's check your knowledge."
  });
  
  renderChatbotTab();
}

function answerQuizQuestion(selectedIdx) {
  if (!activeQuiz) return;
  
  const q = activeQuiz.questions[activeQuiz.currentIdx];
  const isCorrect = selectedIdx === q.answerIdx;
  if (isCorrect) activeQuiz.score++;
  
  activeQuiz.answers.push({ q: q.question, selected: selectedIdx, correct: q.answerIdx });
  activeQuiz.currentIdx++;
  
  const session = sessions.find(s => s.id === activeSessionId) || sessions[0];
  
  if (activeQuiz.currentIdx >= activeQuiz.questions.length) {
    // End Quiz
    session.messages.push({
      role: 'bot',
      content: `📊 **Quiz Completed!**\n\n${t('quizScore').replace('{score}', activeQuiz.score).replace('{total}', activeQuiz.questions.length)}\n\n` +
        activeQuiz.answers.map((a, i) => `${i+1}. ${a.q}\nYour answer: ${a.selected === a.correct ? '🎉 Correct' : '❌ Wrong'}`).join('\n\n')
    });
    activeQuiz = null;
  }
  renderChatbotTab();
}

function handleNewChat() {
  const id = 'session_' + Date.now();
  sessions.push({ id: id, name: 'Chat ' + sessions.length, messages: [] });
  activeSessionId = id;
  activeQuiz = null;
  renderChatbotTab();
}

function injectTutorToMonaco() {
  const ed = window.editor;
  if (!ed) {
    alert(t('noHTML'));
    return;
  }

  const generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${chatbotName} — Standalone AI Tutor Studio</title>
  
  <!-- Premium Fonts and Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Math (KaTeX) & Code Highlighting (Prism.js) Resource CDNs -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js"></script>

  <style>
    :root {
      --primary: hsl(${currentHue}, 85%, 50%);
      --primary-fade: hsla(${currentHue}, 85%, 50%, 0.06);
      --bg: #090a0f;
      --card-bg: rgba(255, 255, 255, 0.03);
      --border: rgba(255, 255, 255, 0.08);
      --text: #e2e8f0;
      --muted: #64748b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background: radial-gradient(circle at top right, var(--primary-fade), transparent), var(--bg);
      overflow: hidden;
    }
    .studio-layout {
      width: 100%;
      max-width: 1050px;
      height: calc(100vh - 40px);
      max-height: 720px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 28px;
      backdrop-filter: blur(35px);
      display: grid;
      grid-template-columns: 380px 1fr;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    }
    
    /* Left Panel: Settings & RAG */
    .sidebar {
      border-right: 1px solid var(--border);
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding: 20px;
      gap: 16px;
      scrollbar-width: thin;
    }
    .sidebar-title {
      font-size: 14px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .settings-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: rgba(255,255,255,0.01);
      border: 1px solid rgba(255,255,255,0.03);
      border-radius: 12px;
      padding: 12px;
    }
    .lbl {
      font-size: 9px;
      font-weight: 800;
      color: var(--muted);
      text-transform: uppercase;
    }
    .input-field {
      width: 100%;
      background: #050508;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      padding: 8px 12px;
      font-size: 11.5px;
      outline: none;
      font-family: inherit;
    }
    .input-field:focus {
      border-color: var(--primary);
    }
    .presets-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .preset-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      cursor: pointer;
    }
    .file-input-wrapper {
      display: block;
      background: rgba(16, 185, 129, 0.03);
      border: 1px dashed rgba(16, 185, 129, 0.25);
      border-radius: 10px;
      padding: 12px;
      text-align: center;
      cursor: pointer;
    }
    .file-input-wrapper input {
      display: none;
    }
    .btn-action {
      background: #13111d;
      color: #cbd5e1;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .btn-action:hover {
      background: rgba(255,255,255,0.02);
      border-color: var(--primary);
    }
    .rag-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 190px;
      overflow-y: auto;
      scrollbar-width: thin;
    }
    .rag-item {
      background: #08070d;
      border: 1px solid rgba(255,255,255,0.03);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 10.5px;
      line-height: 1.4;
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }
    .rag-item span {
      flex: 1;
      word-break: break-word;
    }
    .rag-actions {
      display: flex;
      gap: 4px;
      align-self: flex-start;
    }
    .rag-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 11px;
      padding: 2px;
    }
    .rag-btn.delete { color: #ef4444; }
    .rag-btn.edit { color: #fbbf24; }
    .rag-status {
      font-size: 9.5px;
      color: #34d399;
      font-style: italic;
      margin-top: 4px;
    }

    /* Right Panel: Chat Room */
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      background: rgba(255,255,255,0.005);
    }
    .chat-header {
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255, 255, 255, 0.01);
    }
    .bot-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #a855f7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 0 15px rgba(16,185,129,0.2);
    }
    .header-info h2 { font-size: 15px; font-weight: 800; color: #fff; }
    .header-info p { font-size: 9.5px; color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
    
    .chat-messages {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      scrollbar-width: thin;
    }
    .msg {
      max-width: 82%;
      padding: 12px 18px;
      border-radius: 18px;
      font-size: 13px;
      line-height: 1.6;
      word-break: break-word;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .msg.user {
      align-self: flex-end;
      background: var(--primary);
      color: #000;
      font-weight: 600;
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    .msg.bot {
      align-self: flex-start;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      color: var(--text);
      border-bottom-left-radius: 4px;
    }
    .msg pre {
      margin-top: 10px;
      border-radius: 10px;
      overflow: auto;
      padding: 12px;
      background: #020204 !important;
    }
    .audio-btn {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      font-size: 10.5px;
      float: right;
      margin-left: 8px;
      transition: color 0.2s;
    }
    .audio-btn:hover {
      color: var(--primary);
    }
    .quiz-options-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
    }
    .quiz-btn {
      background: #13111d;
      color: #fff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px;
      text-align: left;
      font-size: 11.5px;
      cursor: pointer;
    }
    .quiz-btn:hover {
      border-color: var(--primary);
      background: rgba(255,255,255,0.02);
    }

    .chat-footer {
      padding: 18px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 10px;
      align-items: center;
      background: rgba(0, 0, 0, 0.1);
    }
    .chat-input {
      flex: 1;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border);
      padding: 12px 16px;
      border-radius: 12px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .chat-input:focus { border-color: var(--primary); }
    
    .mic-btn {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      transition: transform 0.2s;
    }
    .mic-btn:hover {
      transform: scale(1.1);
    }
    
    .send-btn {
      background: var(--primary);
      color: #000;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .send-btn:hover { opacity: 0.9; }

    .offline-bar {
      font-size: 9.5px;
      color: #facc15;
      background: rgba(250,204,21,0.05);
      border: 1px solid rgba(250,204,21,0.1);
      border-radius: 8px;
      padding: 8px 12px;
      font-style: italic;
      margin: 12px 24px;
    }

    @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>

  <div class="studio-layout">
    <!-- Left Configuration & Knowledge Base Sidebar -->
    <div class="sidebar">
      <div class="sidebar-title">🤖 Custom AI Tutor Settings</div>
      
      <!-- Preset Select -->
      <div class="settings-group">
        <div class="lbl">Tutor Subject Preset</div>
        <div class="presets-container">
          <label class="preset-label">
            <input type="radio" name="preset" value="general" ${systemPreset === 'general' ? 'checked' : ''} onchange="changePreset('general')"/>
            <span>📖 General Book Explainer</span>
          </label>
          <label class="preset-label">
            <input type="radio" name="preset" value="math" ${systemPreset === 'math' ? 'checked' : ''} onchange="changePreset('math')"/>
            <span>🧮 Math Tutor (LaTeX)</span>
          </label>
          <label class="preset-label">
            <input type="radio" name="preset" value="code" ${systemPreset === 'code' ? 'checked' : ''} onchange="changePreset('code')"/>
            <span>💻 Code Assistant (Highlight)</span>
          </label>
        </div>
      </div>

      <!-- Config Form -->
      <div class="settings-group">
        <div class="lbl">Tutor Name</div>
        <input type="text" class="input-field" id="tutor-name" value="${chatbotName}" oninput="updateName(this.value)"/>
        
        <div class="lbl" style="margin-top: 8px;">System Prompt</div>
        <textarea class="input-field" id="system-prompt" rows="3" style="resize: vertical;" oninput="updatePrompt(this.value)">${systemPrompt}</textarea>
        
        <div class="lbl" style="margin-top: 8px;">Gemini API Key</div>
        <input type="password" class="input-field" id="api-key" placeholder="AIzaSy..." value="${apiKey}" oninput="updateKey(this.value)"/>
      </div>

      <!-- Accent Color Theme Hue Slider -->
      <div class="settings-group">
        <div class="lbl">Theme Accent Hue: <span id="hue-val-lbl">${currentHue}</span>°</div>
        <input type="range" min="0" max="360" value="${currentHue}" style="width: 100%; cursor: pointer;" oninput="updateHue(this.value)"/>
      </div>

      <!-- Book Upload -->
      <label class="file-input-wrapper">
        <div class="lbl" style="color: var(--primary);">📁 Load Textbook / Doc File</div>
        <input type="file" id="book-upload" accept=".txt,.md,.json,.js,.html,.css" onchange="uploadBook(event)"/>
        <div style="font-size: 9.5px; color: var(--muted); margin-top: 4px;">Click to upload document text</div>
      </label>

      <!-- JSON Tools -->
      <div style="display: flex; gap: 8px;">
        <button class="btn-action" style="flex: 1;" onclick="exportKB()">📥 Export JSON</button>
        <button class="btn-action" style="flex: 1; position: relative;">
          📤 Import JSON
          <input type="file" accept=".json" style="position: absolute; opacity: 0; left:0; top:0; width:100%; height:100%; cursor: pointer;" onchange="importKB(event)"/>
        </button>
      </div>

      <!-- RAG Knowledge Base Graph Visualizer -->
      <div class="sidebar-title" style="margin-top: 8px;">📊 RAG Memory Graph</div>
      <svg id="rag-svg-graph" style="width:100%; height:80px; background:#050508; border:1px solid var(--border); border-radius:10px;"></svg>

      <!-- RAG Knowledge Base -->
      <div class="sidebar-title" style="margin-top: 8px;">📚 Indexed Facts (RAG)</div>
      <div class="rag-list" id="rag-items-list">
        <!-- Rendered dynamically -->
      </div>
      <div class="rag-status" id="rag-count-status"></div>

      <!-- Add Fact -->
      <div style="display: flex; gap: 4px;">
        <input type="text" class="input-field" id="new-fact-input" placeholder="Add custom fact..."/>
        <button class="btn-action" style="background: var(--primary); color: #000; font-weight:800; border: none; padding: 0 12px;" onclick="addCustomFact()">＋</button>
      </div>
      
      <!-- Quiz button -->
      <button class="btn-action" style="background: linear-gradient(90deg, var(--primary), #a855f7); color: #fff; border:none; margin-top: 4px;" onclick="triggerQuiz()">📝 Generate Quiz</button>
    </div>

    <!-- Right Live Playground -->
    <div class="chat-container">
      <div class="chat-header">
        <div class="bot-avatar">🤖</div>
        <div class="header-info">
          <h2 id="display-tutor-name">${chatbotName}</h2>
          
          <!-- Dropdown Session Select -->
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
            <select id="chat-session-select" onchange="switchSession(this.value)" style="background: #000; border: 1px solid var(--border); color: #fff; font-size: 10px; border-radius: 4px; outline:none; padding: 1px 4px; cursor: pointer;">
              <!-- Settle dynamically -->
            </select>
            <button onclick="addNewChatSession()" style="background: none; border: none; color: var(--primary); font-size: 10px; font-weight: bold; cursor: pointer;">+ New Chat</button>
          </div>
        </div>
      </div>
      
      <div class="chat-messages" id="chat-messages-box">
        <div class="msg bot">Hello! I am your custom RAG AI Tutor. How can I help you learn today?</div>
      </div>

      <div class="offline-bar" id="offline-warning-bar" style="display: none;">
        Running in offline simulation mode. Fill in your Gemini API Key in the left panel to connect live Google AI.
      </div>

      <div class="chat-footer">
        <button class="mic-btn" id="voice-dictate-btn" onclick="toggleDictation()" title="Speech dictation">🎙️</button>
        <input type="text" class="chat-input" id="chat-input" placeholder="Ask a question..." onkeydown="if(event.key==='Enter') sendUserMsg()"/>
        <button class="send-btn" onclick="sendUserMsg()">Send</button>
      </div>
    </div>
  </div>

  <script>
    let facts = ${JSON.stringify(facts)};
    let chatbotName = "${chatbotName}";
    let systemPreset = "${systemPreset}";
    let systemPrompt = \`${systemPrompt}\`;
    let apiKey = "${apiKey}";
    let currentHue = ${currentHue};
    
    // Multi-session chat
    let sessions = [
      { id: 'session_default', name: 'General Chat', messages: [] }
    ];
    let activeSessionId = 'session_default';
    
    // Active quiz
    let activeQuiz = null;
    
    let isListening = false;
    let recognition = null;

    checkWarning();
    renderRAGList();
    renderSessionSelect();

    function checkWarning() {
      const bar = document.getElementById('offline-warning-bar');
      if (bar) {
        bar.style.display = apiKey.trim() ? 'none' : 'block';
      }
    }

    function updateName(val) {
      chatbotName = val;
      document.getElementById('display-tutor-name').textContent = val;
    }

    function updatePrompt(val) {
      systemPrompt = val;
    }

    function updateKey(val) {
      apiKey = val;
      checkWarning();
    }

    function updateHue(val) {
      currentHue = val;
      const root = document.documentElement;
      root.style.setProperty('--primary', 'hsl(' + val + ', 85%, 50%)');
      root.style.setProperty('--primary-fade', 'hsla(' + val + ', 85%, 50%, 0.06)');
      const label = document.getElementById('hue-val-lbl');
      if (label) label.textContent = val;
      renderRAGList();
    }

    function changePreset(preset) {
      systemPreset = preset;
      if (preset === 'math') {
        updateHue(45);
        document.getElementById('tutor-name').value = 'Math Tutor';
        updateName('Math Tutor');
        systemPrompt = 'You are a professional Mathematics Professor. Explain mathematical problems step-by-step. Render formulas using LaTeX format using $ or $$ delimiter tags.';
        document.getElementById('system-prompt').value = systemPrompt;
      } else if (preset === 'code') {
        updateHue(240);
        document.getElementById('tutor-name').value = 'Code Master';
        updateName('Code Master');
        systemPrompt = 'You are an expert Coding Assistant. Provide clean, well-commented code blocks. Explain patterns step-by-step and specify language syntaxes in code fences (e.g. \\\`\\\`\\\`javascript).';
        document.getElementById('system-prompt').value = systemPrompt;
      } else {
        updateHue(150);
        document.getElementById('tutor-name').value = 'Book Reader';
        updateName('Book Reader');
        systemPrompt = 'You are a literary analyst and tutor. Explain concepts based on the uploaded book. Answer precisely citing paragraphs.';
        document.getElementById('system-prompt').value = systemPrompt;
      }
    }

    // Book upload chunking
    function uploadBook(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const text = evt.target.result;
          const chunks = text.split(/\\n\\s*\\n/).map(l => l.trim()).filter(l => l.length > 10);
          if (chunks.length > 0) {
            facts = chunks;
            alert("Book chunks imported: " + facts.length);
            renderRAGList();
          }
        };
        reader.readAsText(file);
      }
    }

    // Export KB JSON
    function exportKB() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(facts, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", chatbotName.toLowerCase().replace(/\\s+/g, '-') + "-kb.json");
      dl.click();
    }

    // Import KB JSON
    function importKB(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          try {
            const parsed = JSON.parse(evt.target.result);
            if (Array.isArray(parsed)) {
              facts = parsed;
              alert("Loaded JSON facts: " + facts.length);
              renderRAGList();
            }
          } catch(err) { alert("Invalid JSON file."); }
        };
        reader.readAsText(file);
      }
    }

    // Render list preview
    function renderRAGList() {
      const parent = document.getElementById('rag-items-list');
      if (!parent) return;
      parent.innerHTML = '';

      const maxPreview = 10;
      const previewList = facts.slice(0, maxPreview);

      previewList.forEach((fact, idx) => {
        const item = document.createElement('div');
        item.className = 'rag-item';
        item.innerHTML = '<span>' + escapeHtml(fact) + '</span>';

        const wrapper = document.createElement('div');
        wrapper.className = 'rag-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'rag-btn edit';
        editBtn.textContent = '✏️';
        editBtn.onclick = () => editFact(idx);
        wrapper.appendChild(editBtn);

        const delBtn = document.createElement('button');
        delBtn.className = 'rag-btn delete';
        delBtn.textContent = '✕';
        delBtn.onclick = () => deleteFact(idx);
        wrapper.appendChild(delBtn);

        item.appendChild(wrapper);
        parent.appendChild(item);
      });

      const status = document.getElementById('rag-count-status');
      if (status) {
        if (facts.length > maxPreview) {
          status.textContent = "Showing " + maxPreview + " of " + facts.length + " facts. All content is search-indexed.";
        } else {
          status.textContent = "Showing all " + facts.length + " facts indexed.";
        }
      }
      renderSVGGraph();
    }

    // SVG Graph visualizer
    function renderSVGGraph() {
      const svg = document.getElementById('rag-svg-graph');
      if (!svg) return;
      svg.innerHTML = '';
      
      const width = svg.clientWidth || 340;
      
      facts.slice(0, 100).forEach((fact, idx) => {
        const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        node.setAttribute('id', 'rag-node-' + idx);
        
        // Arrange nodes on grid
        const cols = 10;
        const x = (idx % cols) * (width / cols) + 16;
        const y = Math.floor(idx / cols) * 18 + 12;
        
        node.setAttribute('cx', x);
        node.setAttribute('cy', y);
        node.setAttribute('r', '4.5');
        node.setAttribute('fill', 'hsl(' + currentHue + ', 85%, 50%)');
        node.setAttribute('opacity', '0.45');
        
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = fact.substring(0, 50) + "...";
        node.appendChild(title);
        
        svg.appendChild(node);
      });
    }

    function triggerNodeFlash(idx) {
      const el = document.getElementById('rag-node-' + idx);
      if (el) {
        el.setAttribute('fill', '#ff0055');
        el.setAttribute('r', '8');
        el.setAttribute('opacity', '1');
        
        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute("attributeName", "r");
        anim.setAttribute("values", "8;13;8");
        anim.setAttribute("dur", "0.6s");
        anim.setAttribute("repeatCount", "2");
        el.appendChild(anim);
        anim.beginElement();

        setTimeout(() => {
          el.setAttribute('fill', 'hsl(' + currentHue + ', 85%, 50%)');
          el.setAttribute('r', '4.5');
          el.setAttribute('opacity', '0.45');
          el.innerHTML = '';
        }, 1200);
      }
    }

    function addCustomFact() {
      const inp = document.getElementById('new-fact-input');
      const text = inp.value.trim();
      if (text) {
        facts.push(text);
        inp.value = '';
        renderRAGList();
      }
    }

    function editFact(idx) {
      const newVal = prompt("Modify this paragraph:", facts[idx]);
      if (newVal !== null && newVal.trim() !== '') {
        facts[idx] = newVal.trim();
        renderRAGList();
      }
    }

    function deleteFact(idx) {
      facts.splice(idx, 1);
      renderRAGList();
    }

    // Matcher RAG: TF-IDF Lite
    function matchLocalRag(query) {
      const stopwords = new Set([
        'the', 'and', 'for', 'with', 'you', 'this', 'that', 'from', 'have', 'are', 'was', 'were', 'been',
        'une', 'des', 'les', 'dans', 'pour', 'avec', 'dans', 'cette', 'sont'
      ]);
      const queryWords = query.toLowerCase()
        .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_\`~()?]/g, ' ')
        .split(/\\s+/)
        .filter(w => w.length > 2 && !stopwords.has(w));
      
      if (queryWords.length === 0 || facts.length === 0) {
        return { context: facts[0] || null, idx: 0 };
      }

      // Calculate IDF
      const idf = {};
      queryWords.forEach(word => {
        let docFreq = 0;
        facts.forEach(fact => {
          if (fact.toLowerCase().includes(word)) docFreq++;
        });
        idf[word] = Math.log(facts.length / (docFreq + 1)) + 1;
      });

      let bestMatch = null;
      let bestIdx = -1;
      let maxScore = -1;

      facts.forEach((fact, idx) => {
        let score = 0;
        const factText = fact.toLowerCase();
        queryWords.forEach(word => {
          if (factText.includes(word)) {
            const tf = (factText.split(word).length - 1);
            score += tf * idf[word];
          }
        });
        if (score > maxScore) {
          maxScore = score;
          bestMatch = fact;
          bestIdx = idx;
        }
      });

      return { context: bestMatch, idx: bestIdx };
    }

    function runMathHighlight(element) {
      if (window.renderMathInElement) {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
      if (window.Prism) {
        window.Prism.highlightAllUnder(element);
      }
    }

    // Sessions Managers
    function renderSessionSelect() {
      const sel = document.getElementById('chat-session-select');
      if (!sel) return;
      sel.innerHTML = '';
      sessions.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        if (s.id === activeSessionId) opt.selected = true;
        sel.appendChild(opt);
      });
    }

    function switchSession(id) {
      activeSessionId = id;
      activeQuiz = null;
      loadMessagesFromSession();
    }

    function addNewChatSession() {
      const id = 'session_' + Date.now();
      sessions.push({ id: id, name: 'Chat ' + sessions.length, messages: [] });
      activeSessionId = id;
      activeQuiz = null;
      renderSessionSelect();
      loadMessagesFromSession();
    }

    function loadMessagesFromSession() {
      const box = document.getElementById('chat-messages-box');
      if (!box) return;
      box.innerHTML = '';

      const s = sessions.find(ss => ss.id === activeSessionId) || sessions[0];
      if (s.messages.length === 0) {
        box.innerHTML = '<div class="msg bot">Hello! New session opened. How can I help you? / Bonjour ! Nouvelle session ouverte. Comment puis-je vous aider ?</div>';
      } else {
        s.messages.forEach(msg => {
          if (msg.isQuiz) {
            appendQuizMessage(msg.quizData);
          } else {
            const bubble = appendMessage(msg.role, msg.content);
            if (msg.role === 'bot') {
              const audioBtn = document.createElement('button');
              audioBtn.className = 'audio-btn';
              audioBtn.textContent = '🔊 Read';
              audioBtn.onclick = () => readText(msg.content);
              bubble.appendChild(audioBtn);
            }
          }
        });
      }
      runMathHighlight(box);
    }

    // Live Quiz system
    async function triggerQuiz() {
      const s = sessions.find(ss => ss.id === activeSessionId) || sessions[0];
      
      let quizData = null;
      if (apiKey.trim()) {
        try {
          const prompt = "Generate a 3-question multiple choice quiz based ONLY on these facts:\\n" + facts.slice(0, 20).join('\\n') +
            "\\n\\nOutput STRICTLY a JSON array where each object has fields: 'question' (string), 'options' (array of 4 strings), and 'answerIdx' (integer 0-3). Output ONLY raw JSON, no markdown fences.";
          
          const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
          });
          const data = await res.json();
          const txt = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          quizData = JSON.parse(txt.replace(/\`\`\`(json)?/g, '').trim());
        } catch(e) { quizData = null; }
      }

      if (!quizData) {
        // Mock Quiz questions
        if (systemPreset === 'math') {
          quizData = [
            { question: "What is the formula to solve ax^2 + bx + c = 0?", options: ["x = -b ± √D / 2a", "x = -b / 2a", "x = -c / a", "x = (a+b)/c"], answerIdx: 0 },
            { question: "Under what condition does ax^2 + bx + c = 0 have real roots?", options: ["b^2 - 4ac < 0", "b^2 - 4ac >= 0", "a = 0", "b = 0"], answerIdx: 1 }
          ];
        } else if (systemPreset === 'code') {
          quizData = [
            { question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answerIdx: 1 },
            { question: "What sorting condition is required for Binary Search?", options: ["Unsorted", "Sorted descending only", "Sorted ascending or descending", "It does not matter"], answerIdx: 2 }
          ];
        } else {
          quizData = [
            { question: "What is the price of PORTRAIT 01 in Flash Shop?", options: ["$40", "$50", "$65", "$45"], answerIdx: 1 },
            { question: "How many days does the refund policy allow?", options: ["7 days", "14 days", "30 days", "No refunds"], answerIdx: 1 }
          ];
        }
      }

      activeQuiz = {
        questions: quizData,
        currentIdx: 0,
        score: 0,
        answers: []
      };

      s.messages.push({
        role: 'bot',
        isQuiz: true,
        quizData: activeQuiz
      });

      appendQuizMessage(activeQuiz);
    }

    function appendQuizMessage(quiz) {
      const box = document.getElementById('chat-messages-box');
      if (quiz.currentIdx >= quiz.questions.length) {
        // Render final score bubble
        const bubble = document.createElement('div');
        bubble.className = 'msg bot';
        bubble.innerHTML = "📊 <b>Quiz Complete!</b><br/>Your score: <b>" + quiz.score + " / " + quiz.questions.length + "</b>";
        box.appendChild(bubble);
        box.scrollTop = box.scrollHeight;
        
        // Save to session history
        const s = sessions.find(ss => ss.id === activeSessionId) || sessions[0];
        s.messages.push({ role: 'bot', content: "📊 Quiz Complete! Your score: " + quiz.score + "/" + quiz.questions.length });
        activeQuiz = null;
        return;
      }

      const q = quiz.questions[quiz.currentIdx];
      const bubble = document.createElement('div');
      bubble.className = 'msg bot';
      bubble.innerHTML = \`<div><b>Question \${quiz.currentIdx + 1}:</b> \${escapeHtml(q.question)}</div>\`;
      
      const optBox = document.createElement('div');
      optBox.className = 'quiz-options-box';
      
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = (idx + 1) + ". " + opt;
        btn.onclick = () => {
          // Disable all buttons in this box
          optBox.querySelectorAll('button').forEach(b => b.disabled = true);
          if (idx === q.answerIdx) {
            btn.style.borderColor = '#10b981';
            btn.style.color = '#10b981';
            quiz.score++;
          } else {
            btn.style.borderColor = '#ef4444';
            btn.style.color = '#ef4444';
          }
          
          setTimeout(() => {
            quiz.currentIdx++;
            appendQuizMessage(quiz);
          }, 800);
        };
        optBox.appendChild(btn);
      });
      
      bubble.appendChild(optBox);
      box.appendChild(bubble);
      box.scrollTop = box.scrollHeight;
    }

    async function sendUserMsg() {
      const inp = document.getElementById('chat-input');
      const text = inp.value.trim();
      if (!text) return;

      inp.value = '';
      appendMessage('user', text);
      
      // Save user message to session
      const s = sessions.find(ss => ss.id === activeSessionId) || sessions[0];
      s.messages.push({ role: 'user', content: text });

      const loader = appendMessage('bot', 'Processing...');

      const ragResult = matchLocalRag(text);
      if (ragResult.idx !== -1) {
        triggerNodeFlash(ragResult.idx);
      }
      
      setTimeout(async () => {
        let response = '';
        if (apiKey.trim()) {
          try {
            const context = ragResult.context ? "[TEXTBOOK CONTEXT]: " + ragResult.context + "\\n\\n" : "";
            const prompt = systemPrompt + "\\n\\n" + context + "User Query: " + text;
            
            const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            response = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          } catch(e) {
            response = "❌ Error calling API. Offline simulation loaded.";
          }
        }

        if (!response || response.startsWith('❌')) {
          response = (response ? response + '\\n\\n' : '') + getSimulatedReply(text, ragResult.context);
        }

        s.messages.push({ role: 'bot', content: response });

        loader.innerHTML = formatMarkdown(response);
        
        // Add Audio read button to bot bubble
        const audioBtn = document.createElement('button');
        audioBtn.className = 'audio-btn';
        audioBtn.textContent = '🔊 Read';
        audioBtn.onclick = () => readText(response);
        loader.appendChild(audioBtn);

        runMathHighlight(document.getElementById('chat-messages-box'));
      }, 700);
    }

    function appendMessage(role, content) {
      const box = document.getElementById('chat-messages-box');
      const msg = document.createElement('div');
      msg.className = 'msg ' + role;
      msg.textContent = content;
      box.appendChild(msg);
      box.scrollTop = box.scrollHeight;
      return msg;
    }

    function formatMarkdown(text) {
      return text.replace(/\\\`\\\`\\\`(\\w+)?([\\s\\S]*?)\\\`\\\`\\\`/g, function(match, lang, code) {
        const cleanLang = lang || 'javascript';
        return '<pre><code class="language-' + cleanLang + '">' + escapeHtml(code.trim()) + '</code></pre>';
      }).replace(/\\n/g, '<br/>');
    }

    function escapeHtml(string) {
      return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // TTS Text Speech Voice Synthesis
    function readText(text) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const cleanText = text
          .replace(/\\$\\$([\\s\\S]*?)\\$\\$/g, ' equation ')
          .replace(/\\$([\\s\\S]*?)\\$/g, ' formula ')
          .replace(/\\\`\\\`\\\`([\\s\\S]*?)\\\`\\\`\\\`/g, ' code block ')
          .replace(/<[^>]*>/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }

    // Dictation (Speech-to-Text)
    function toggleDictation() {
      const btn = document.getElementById('voice-dictate-btn');
      const inp = document.getElementById('chat-input');

      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!recognition) {
          recognition = new SpeechRec();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';

          recognition.onstart = () => {
            isListening = true;
            btn.textContent = '🛑';
            btn.style.color = '#ef4444';
            inp.placeholder = 'Listening...';
          };
          recognition.onresult = (e) => {
            const tr = e.results[0][0].transcript;
            inp.value = tr;
          };
          recognition.onerror = () => { stopDic(); };
          recognition.onend = () => { stopDic(); };
        }

        function stopDic() {
          isListening = false;
          btn.textContent = '🎙️';
          btn.style.color = 'var(--primary)';
          inp.placeholder = 'Ask a question...';
        }

        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
      }
    }

    function getSimulatedReply(query, context) {
      const q = query.toLowerCase();
      const preset = systemPreset;

      if (preset === 'math') {
        if (q.includes('equation') || q.includes('quadratic') || q.includes('roots')) {
          return "Quadratic formula for $ax^2 + bx + c = 0$:\\n\\n$$x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$";
        }
        return context ? "Formula context: " + context : "Input a math question.";
      }
      
      if (preset === 'code') {
        if (q.includes('search') || q.includes('binary')) {
          return "Binary Search in JS:\\n\\n\\\`\\\`\\\`javascript\\nfunction binarySearch(arr, t) {\\n  let l = 0, r = arr.length - 1;\\n  while(l <= r) {\\n    let m = Math.floor((l+r)/2);\\n    if(arr[m] === t) return m;\\n    if(arr[m] < t) l = m + 1;\\n    else r = m - 1;\\n  }\\n  return -1;\\n}\\n\\\`\\\`\\\`";
        }
        return "\\\`\\\`\\\`javascript\\nconsole.log('AI coding helper initialized');\\n\\\`\\\`\\\`";
      }

      return context ? "[Offline Simulation Mode] Matched paragraph from document:\\n\\n\\"" + context + "\\"\\n\\n💡 Note: Fill in your Gemini API Key in the left panel to connect live Google AI. / Note : Entrez votre clé API Gemini dans le panneau de gauche pour activer l'IA." : "Hello! Please ask a question on textbook contents.";
    }
  </script>
</body>
</html>`;

  ed.setValue(generatedHtml);
  if (window.showToast) window.showToast(t('injected'));
  if (window.runPreview) window.runPreview();
}

function renderChatbotTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0a13;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(99,102,241,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Preset Selector
  const presetHdr = document.createElement('div');
  presetHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  presetHdr.textContent = t('lblPreset');
  scrollContainer.appendChild(presetHdr);

  const presetCard = document.createElement('div');
  presetCard.style = 'background:#13111d;border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:6px;';
  
  const presets = [['general', t('presetGeneral')], ['math', t('presetMath')], ['code', t('presetCode')]];
  presets.forEach(([val, lbl]) => {
    const lblEl = document.createElement('label');
    lblEl.style = 'display:flex;align-items:center;gap:8px;font-size:10.5px;cursor:pointer;';
    const isSel = val === systemPreset;
    lblEl.innerHTML = `<input type="radio" name="subjectpreset" value="${val}" ${isSel ? 'checked' : ''} /> <span>${lbl}</span>`;
    lblEl.querySelector('input').onchange = function() { handlePresetChange(this.value); };
    presetCard.appendChild(lblEl);
  });
  scrollContainer.appendChild(presetCard);

  // Persona Settings
  const settingsHdr = document.createElement('div');
  settingsHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  settingsHdr.textContent = t('lblSettings');
  scrollContainer.appendChild(settingsHdr);

  const settingsForm = document.createElement('div');
  settingsForm.style = 'background:#13111d;border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;';

  // Bot name
  settingsForm.innerHTML += `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;">${t('lblName')}</label>`;
  const inpName = document.createElement('input');
  inpName.type = 'text'; inpName.value = chatbotName;
  inpName.style = 'width:100%;background:#09080e;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10.5px;outline:none;';
  inpName.oninput = function() { chatbotName = this.value; };
  settingsForm.appendChild(inpName);

  // System prompt
  settingsForm.innerHTML += `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;">${t('lblSystemPrompt')}</label>`;
  const taPrompt = document.createElement('textarea');
  taPrompt.rows = 3; taPrompt.value = systemPrompt;
  taPrompt.style = 'width:100%;background:#09080e;border:1px solid rgba(255,255,255,0.1);color:#cbd5e1;border-radius:6px;padding:6px;font-size:9.5px;outline:none;resize:vertical;font-family:inherit;';
  taPrompt.oninput = function() { systemPrompt = this.value; };
  settingsForm.appendChild(taPrompt);

  // API Key config
  settingsForm.innerHTML += `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;">${t('lblApiKey')}</label>`;
  const inpKey = document.createElement('input');
  inpKey.type = 'password'; inpKey.value = apiKey; inpKey.placeholder = 'AIzaSy...';
  inpKey.style = 'width:100%;background:#09080e;border:1px solid rgba(255,255,255,0.1);color:#10b981;border-radius:6px;padding:6px;font-size:10.5px;outline:none;';
  inpKey.oninput = function() { apiKey = this.value; };
  settingsForm.appendChild(inpKey);

  // HSL Accent Hue slider picker
  settingsForm.innerHTML += `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-top:4px;">${t('lblColorHue')} (${currentHue}°)</label>`;
  const hueSlider = document.createElement('input');
  hueSlider.type = 'range'; hueSlider.min = 0; hueSlider.max = 360; hueSlider.value = currentHue;
  hueSlider.style = 'width:100%;cursor:pointer;';
  hueSlider.oninput = function() {
    currentHue = this.value;
    updateLocalHueCSS();
  };
  settingsForm.appendChild(hueSlider);

  scrollContainer.appendChild(settingsForm);

  // Textbook uploader
  const uploadRow = document.createElement('div');
  uploadRow.style = 'display:flex;flex-direction:column;gap:5px;background:#13111d;border:1px dashed rgba(16,185,129,0.2);padding:10px;border-radius:8px;';
  uploadRow.innerHTML = `<label style="font-size:9px;color:#facc15;font-weight:800;text-transform:uppercase;">${t('lblUpload')}</label>`;
  
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.txt,.md,.json,.js,.html,.css';
  fileInput.style = 'font-size:9.5px;color:#94a3b8;cursor:pointer;';
  fileInput.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const text = evt.target.result;
        const chunks = text.split(/\n\s*\n/).map(l => l.trim()).filter(l => l.length > 10);
        if (chunks.length > 0) {
          facts = chunks;
          if (window.showToast) window.showToast(`Imported ${facts.length} paragraphs!`);
          renderChatbotTab();
        }
      };
      reader.readAsText(file);
    }
  };
  uploadRow.appendChild(fileInput);
  scrollContainer.appendChild(uploadRow);

  // JSON Save/Load Tools
  const jsonRow = document.createElement('div');
  jsonRow.style = 'display:flex;gap:6px;margin-bottom:8px;';
  
  const expBtn = document.createElement('button');
  expBtn.textContent = '📥 ' + t('btnExportJson');
  expBtn.style = 'flex:1;background:#13111d;color:#34d399;border:1px solid rgba(16,185,129,0.2);border-radius:6px;padding:6px;font-size:9.5px;font-weight:bold;cursor:pointer;';
  expBtn.onclick = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(facts, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${chatbotName.toLowerCase().replace(/\s+/g, '-')}-knowledge-base.json`);
    dlAnchorElem.click();
  };

  const impBtn = document.createElement('button');
  impBtn.textContent = '📤 ' + t('btnImportJson');
  impBtn.style = 'flex:1;background:#13111d;color:#cbd5e1;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px;font-size:9.5px;font-weight:bold;cursor:pointer;position:relative;overflow:hidden;';
  
  const jsonFileInput = document.createElement('input');
  jsonFileInput.type = 'file';
  jsonFileInput.accept = '.json';
  jsonFileInput.style = 'position:absolute;top:0;left:0;opacity:0;cursor:pointer;width:100%;height:100%;';
  jsonFileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (Array.isArray(parsed)) {
            facts = parsed;
            if (window.showToast) window.showToast(`Imported ${facts.length} facts!`);
            renderChatbotTab();
          } else {
            alert('Invalid JSON: Must be an array.');
          }
        } catch (err) {
          alert('Failed to parse JSON.');
        }
      };
      reader.readAsText(file);
    }
  };
  impBtn.appendChild(jsonFileInput);
  jsonRow.appendChild(expBtn);
  jsonRow.appendChild(impBtn);
  scrollContainer.appendChild(jsonRow);

  // SVG RAG Graph Visualizer (Local)
  const svgHdr = document.createElement('div');
  svgHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  svgHdr.textContent = '📊 RAG Memory Graph';
  scrollContainer.appendChild(svgHdr);

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, 'svg');
  svg.id = 'rag-svg-graph';
  svg.style = 'width:100%;height:80px;background:#050508;border:1px solid rgba(255,255,255,0.05);border-radius:10px;margin-top:6px;';
  scrollContainer.appendChild(svg);

  // Populate local SVG graph nodes (capped to 100 to prevent freezes on large documents)
  setTimeout(() => {
    const width = svg.clientWidth || 340;
    facts.slice(0, 100).forEach((fact, idx) => {
      const node = document.createElementNS(svgNS, 'circle');
      node.setAttribute('id', `rag-node-${idx}`);
      
      const cols = 10;
      const x = (idx % cols) * (width / cols) + 16;
      const y = Math.floor(idx / cols) * 18 + 12;
      
      node.setAttribute('cx', x);
      node.setAttribute('cy', y);
      node.setAttribute('r', '4.5');
      node.setAttribute('fill', `hsl(${currentHue}, 85%, 50%)`);
      node.setAttribute('opacity', '0.45');
      
      const title = document.createElementNS(svgNS, 'title');
      title.textContent = fact.substring(0, 50) + "...";
      node.appendChild(title);
      
      svg.appendChild(node);
    });
  }, 50);

  // RAG Section
  const ragHdr = document.createElement('div');
  ragHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  ragHdr.textContent = t('lblRag');
  scrollContainer.appendChild(ragHdr);

  const ragCard = document.createElement('div');
  ragCard.style = 'background:#13111d;border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';

  // Render facts list
  const maxPreview = 12;
  const factsToRender = facts.slice(0, maxPreview);
  
  factsToRender.forEach((fact, idx) => {
    const item = document.createElement('div');
    item.style = 'background:#08070d;border:1px solid rgba(255,255,255,0.03);border-radius:6px;padding:6px 8px;font-size:9.5px;line-height:1.4;display:flex;justify-content:space-between;gap:6px;';
    item.innerHTML = `<span style="flex:1;word-break:break-all;">${fact}</span>`;
    
    const actionsWrapper = document.createElement('div');
    actionsWrapper.style = 'display:flex;gap:4px;align-self:flex-start;';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.style = 'background:none;border:none;color:#fbbf24;font-size:10px;cursor:pointer;padding:1px 2px;';
    editBtn.onclick = () => {
      const newVal = prompt(gl() === 'fr' ? 'Modifier le fait :' : 'Edit fact / formula:', fact);
      if (newVal !== null && newVal.trim() !== '') {
        facts[idx] = newVal.trim();
        if (window.showToast) window.showToast('Updated!');
        renderChatbotTab();
      }
    };
    actionsWrapper.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.style = 'background:none;border:none;color:#ef4444;font-size:10px;cursor:pointer;padding:1px 2px;';
    delBtn.onclick = () => deleteFact(idx);
    actionsWrapper.appendChild(delBtn);

    item.appendChild(actionsWrapper);
    ragCard.appendChild(item);
  });

  if (facts.length > maxPreview) {
    const moreEl = document.createElement('div');
    moreEl.style = 'font-size:9px;color:#34d399;font-style:italic;padding:4px 0 2px 2px;';
    moreEl.textContent = t('lblShowingFacts')
      .replace('{count}', maxPreview)
      .replace('{total}', facts.length);
    ragCard.appendChild(moreEl);
  }

  // Add fact form
  const addFactRow = document.createElement('div');
  addFactRow.style = 'display:flex;gap:4px;margin-top:4px;';
  
  const inpFact = document.createElement('input');
  inpFact.type = 'text'; inpFact.placeholder = t('factPlaceholder'); inpFact.value = newFactText;
  inpFact.style = 'flex:1;background:#09080e;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:9.5px;outline:none;';
  inpFact.oninput = function() { newFactText = this.value; };
  inpFact.onkeydown = function(e) { if(e.key === 'Enter') addFact(); };

  const addFBtn = document.createElement('button');
  addFBtn.textContent = '＋';
  addFBtn.style = 'background:#10b981;color:#000;border:none;border-radius:6px;padding:6px 12px;font-weight:bold;cursor:pointer;font-size:12px;';
  addFBtn.onclick = addFact;

  addFactRow.appendChild(inpFact);
  addFactRow.appendChild(addFBtn);
  ragCard.appendChild(addFactRow);
  scrollContainer.appendChild(ragCard);

  // Add Quiz Generator Button
  const qzBtn = document.createElement('button');
  qzBtn.textContent = t('btnQuiz');
  qzBtn.style = 'background:linear-gradient(90deg, hsl(' + currentHue + ', 85%, 50%), #a855f7); color:#fff; font-weight:800; border:none; padding:10px; border-radius:8px; cursor:pointer; margin-top:4px; font-size:11px;';
  qzBtn.onclick = buildQuiz;
  scrollContainer.appendChild(qzBtn);

  // Playground Chat Window
  const playHdr = document.createElement('div');
  playHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  playHdr.textContent = t('lblPlayground');
  scrollContainer.appendChild(playHdr);

  const chatContainer = document.createElement('div');
  chatContainer.style = 'background:#08070d;border:1px solid rgba(16,185,129,0.15);border-radius:12px;height:280px;display:flex;flex-direction:column;overflow:hidden;';

  // Session Selector bar
  const sessHeader = document.createElement('div');
  sessHeader.style = 'display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.02);padding:6px 10px;border-bottom:1px solid rgba(255,255,255,0.05);';
  
  const sessTitle = document.createElement('div');
  sessTitle.textContent = t('lblChatSessions');
  sessTitle.style = 'font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;';
  sessHeader.appendChild(sessTitle);

  const selectRow = document.createElement('div');
  selectRow.style = 'display:flex;gap:4px;align-items:center;';

  const sessSelect = document.createElement('select');
  sessSelect.style = 'background:#050508;border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:9px;border-radius:4px;outline:none;padding:1px;';
  sessions.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    if (s.id === activeSessionId) opt.selected = true;
    sessSelect.appendChild(opt);
  });
  sessSelect.onchange = function() {
    activeSessionId = this.value;
    activeQuiz = null;
    renderChatbotTab();
  };
  selectRow.appendChild(sessSelect);

  const newChatBtn = document.createElement('button');
  newChatBtn.textContent = '+';
  newChatBtn.style = 'background:none;border:none;color:#10b981;font-weight:bold;cursor:pointer;font-size:12px;padding:0 4px;';
  newChatBtn.onclick = handleNewChat;
  selectRow.appendChild(newChatBtn);

  sessHeader.appendChild(selectRow);
  chatContainer.appendChild(sessHeader);

  const msgBox = document.createElement('div');
  msgBox.id = 'aichat-messages-box';
  msgBox.style = 'flex:1;padding:10px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;';

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  if (activeSession.messages.length === 0) {
    msgBox.innerHTML = `<div style="align-self:flex-start;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);color:#94a3b8;font-size:10px;padding:8px;border-radius:8px;max-width:85%;line-height:1.4;">` +
                       `Hello! I am your AI Multi-Discipline Tutor. Ask me anything on textbook, math equations or code snippets.` +
                       `</div>`;
  } else {
    activeSession.messages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.style = 'padding:8px 10px;border-radius:8px;font-size:10.5px;line-height:1.4;max-width:85%;word-break:break-word;position:relative;';
      if (msg.role === 'user') {
        bubble.style.alignSelf = 'flex-end';
        bubble.style.background = `hsl(${currentHue}, 85%, 50%)`;
        bubble.style.color = '#000';
        bubble.style.fontWeight = '500';
      } else {
        bubble.style.alignSelf = 'flex-start';
        bubble.style.background = 'rgba(255,255,255,0.04)';
        bubble.style.border = '1px solid rgba(255,255,255,0.06)';
        bubble.style.color = '#e2e8f0';

        // Add TTS Diffuser Speaker Button (unless it is a quiz selection card)
        if (!msg.isQuiz) {
          const audioBtn = document.createElement('button');
          audioBtn.textContent = '🔊';
          audioBtn.style = 'background:none;border:none;color:#64748b;font-size:9.5px;cursor:pointer;float:right;margin-left:6px;';
          audioBtn.title = t('voiceSynthesis');
          audioBtn.onclick = () => {
            if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
              const cleanText = msg.content
                .replace(/\$\$([\s\S]*?)\$\$/g, ' equation ')
                .replace(/\$([\s\S]*?)\$/g, ' formula ')
                .replace(/```([\s\S]*?)```/g, ' code block ')
                .replace(/<[^>]*>/g, '');
              const utterance = new SpeechSynthesisUtterance(cleanText);
              utterance.lang = gl() === 'fr' ? 'fr-FR' : 'en-US';
              window.speechSynthesis.speak(utterance);
            }
          };
          bubble.appendChild(audioBtn);
        }
      }

      if (msg.isQuiz && msg.quizData) {
        // Render quiz card inside playground
        const qz = msg.quizData;
        if (qz.currentIdx >= qz.questions.length) {
          bubble.innerHTML = `📊 <b>Quiz Complete!</b><br/>Your score: <b>${qz.score} / ${qz.questions.length}</b>`;
        } else {
          const activeQ = qz.questions[qz.currentIdx];
          bubble.innerHTML = `<div><b>Question ${qz.currentIdx + 1}:</b> ${activeQ.question}</div>`;
          const optsDiv = document.createElement('div');
          optsDiv.style = 'display:flex;flex-direction:column;gap:4px;margin-top:6px;';
          activeQ.options.forEach((opt, oIdx) => {
            const optBtn = document.createElement('button');
            optBtn.textContent = (oIdx+1) + ". " + opt;
            optBtn.style = 'background:#050508;border:1px solid rgba(255,255,255,0.06);border-radius:6px;color:#cbd5e1;padding:4px 8px;font-size:10px;text-align:left;cursor:pointer;';
            optBtn.onclick = () => {
              optsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
              answerQuizQuestion(oIdx);
            };
            optsDiv.appendChild(optBtn);
          });
          bubble.appendChild(optsDiv);
        }
      } else if (systemPreset === 'code' && msg.role === 'bot') {
        const text = msg.content.replace(/```(\w+)?([\s\S]*?)```/g, function(match, lang, code) {
          const cleanLang = lang || 'javascript';
          return `<pre style="background:#020204;border-radius:6px;padding:8px;margin-top:6px;overflow:auto;"><code class="language-${cleanLang}">${code.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`;
        }).replace(/\n/g, '<br/>');
        bubble.innerHTML += text;
      } else {
        bubble.innerHTML += msg.content.replace(/\n/g, '<br/>');
      }
      msgBox.appendChild(bubble);
    });
  }
  
  if (isGenerating) {
    const typing = document.createElement('div');
    typing.style = 'align-self:flex-start;color:#10b981;font-size:9.5px;font-style:italic;padding:4px;';
    typing.textContent = 'Typing...';
    msgBox.appendChild(typing);
  }

  chatContainer.appendChild(msgBox);

  // Chat footer input
  const chatFooter = document.createElement('div');
  chatFooter.style = 'display:flex;gap:4px;padding:6px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.15);align-items:center;';
  
  const cInp = document.createElement('input');
  cInp.type = 'text'; cInp.placeholder = t('chatPlaceholder'); cInp.value = currentChatInput;
  cInp.style = 'flex:1;background:#050508;border:1px solid rgba(255,255,255,0.05);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  cInp.oninput = function() { currentChatInput = this.value; };
  cInp.onkeydown = function(e) { if(e.key === 'Enter') sendMessage(); };

  // Voice Speech Recognition Button (Speech-to-Text)
  const micBtn = document.createElement('button');
  micBtn.textContent = '🎙️';
  micBtn.style = 'background:none;border:none;color:#fbbf24;font-size:13px;cursor:pointer;padding:4px;';
  
  let isListening = false;
  let recognition = null;
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = gl() === 'fr' ? 'fr-FR' : 'en-US';

    recognition.onstart = () => {
      isListening = true;
      micBtn.textContent = '🛑';
      micBtn.style.color = '#ef4444';
      cInp.placeholder = t('voiceListening');
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      cInp.value = transcript;
      currentChatInput = transcript;
    };

    recognition.onerror = () => { stopListening(); };
    recognition.onend = () => { stopListening(); };

    function stopListening() {
      isListening = false;
      micBtn.textContent = '🎙️';
      micBtn.style.color = '#fbbf24';
      cInp.placeholder = t('chatPlaceholder');
    }

    micBtn.onclick = () => {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    };
  } else {
    micBtn.style.display = 'none';
  }

  const sendBtn = document.createElement('button');
  sendBtn.textContent = t('btnSend');
  sendBtn.style = 'background:#10b981;color:#000;border:none;border-radius:6px;padding:6px 12px;font-size:10px;font-weight:800;cursor:pointer;';
  sendBtn.onclick = sendMessage;

  chatFooter.appendChild(micBtn);
  chatFooter.appendChild(cInp);
  chatFooter.appendChild(sendBtn);
  chatContainer.appendChild(chatFooter);
  scrollContainer.appendChild(chatContainer);

  if (!apiKey.trim()) {
    const mockCard = document.createElement('div');
    mockCard.style = 'font-size:9px;color:#facc15;background:rgba(250,204,21,0.06);border:1px solid rgba(250,204,21,0.15);border-radius:6px;padding:6px 8px;font-style:italic;';
    mockCard.textContent = t('mockIndicator');
    scrollContainer.appendChild(mockCard);
  }

  // Inject Injector Button
  const injBtn = document.createElement('button');
  injBtn.innerHTML = t('btnInject');
  injBtn.style = 'background:linear-gradient(90deg,#10b981,#6366f1);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  injBtn.onclick = injectTutorToMonaco;
  scrollContainer.appendChild(injBtn);

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);

  // Render RAG visualizer nodes dynamically

  // Trigger KaTeX and Prism on load inside parent window
  loadResourcesInParent();
  setTimeout(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(msgBox, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
    if (window.Prism) {
      window.Prism.highlightAllUnder(msgBox);
    }
  }, 50);
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-aichatbotrag');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'aichatbotrag') renderChatbotTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'aichatbotrag') {
      window.activeTab = 'aichatbotrag';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-aichatbotrag');
      if (btn) btn.classList.add('active');
      renderChatbotTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
