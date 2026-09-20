// IA Architecte Studio ULTRA — AI Engine
// Handles Gemini API calls + intelligent Demo Mode fallback

const AIEngine = (() => {
  const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  // ─── SYSTEM PROMPT ──────────────────────────────────────────────────────────
  const SYSTEM_PROMPT = `You are an expert senior web developer specializing in beautiful, functional web applications.
Your task is to generate a COMPLETE, WORKING web application from the user's description.

CRITICAL RULES:
1. Return ONLY a valid JSON object. No markdown, no code fences, no explanation whatsoever.
2. The JSON must have EXACTLY these three fields: {"html": "...", "css": "...", "js": "..."}
3. HTML field: body content only (NO <html>, <head>, <body> tags — just the inner body content)
4. CSS field: complete, beautiful modern styles for the entire app
5. JS field: complete, fully functional JavaScript (every button and feature must work)
6. Make it VISUALLY STUNNING — use gradients, shadows, animations, modern dark/light themes
7. Make it FULLY FUNCTIONAL — not just a mockup, every interactive element must work
8. Use only vanilla HTML/CSS/JS (you may include CDN scripts as <script> tags in the HTML field)
9. Include responsive design (mobile-friendly)
10. Write production-quality, clean code`;

  const MODIFY_PROMPT = (request, html, css, js) => `You are an expert web developer. Modify the existing web application based on this request: "${request}"

Current HTML: ${html.substring(0, 2000)}
Current CSS: ${css.substring(0, 2000)}
Current JS: ${js.substring(0, 2000)}

RULES:
1. Return ONLY valid JSON: {"html": "...", "css": "...", "js": "..."}
2. Include ALL three fields with the complete updated code
3. Preserve all existing functionality unless the request says to remove something
4. Only add/change what was requested
5. No markdown, no explanation — ONLY the JSON object`;

  // ─── DEMO MODE: Keyword Scoring ──────────────────────────────────────────────
  const KEYWORDS_MAP = {
    snake:       ['snake', 'serpent', 'snake game', 'jeu serpent'],
    breaker:     ['breaker', 'brick', 'casse-brique', 'brique', 'breakout', 'paddle', 'ball'],
    memory:      ['memory', 'memoire', 'card', 'flip', 'match', 'matching', 'mémoire', 'emoji match'],
    tictactoe:   ['tictactoe', 'tic-tac-toe', 'morpion', 'xo', 'tic tac toe'],
    space:       ['space', 'galaxy', 'invader', 'shooter', 'laser', 'alien', 'vaisseau', 'spatial'],
    pong:        ['pong', 'tennis', 'table tennis', 'paddle ball', 'ping pong'],
    todo:        ['todo', 'task', 'tasks', 'tâche', 'taches', 'list', 'liste', 'to-do', 'task manager', 'planner', 'gestionnaire'],
    kanban:      ['kanban', 'trello', 'board', 'tableau', 'drag', 'project', 'projet', 'workflow'],
    pomodoro:    ['pomodoro', 'timer', 'minuteur', 'focus', 'countdown', 'compte à rebours', 'chime'],
    dashboard:   ['dashboard', 'tableau de bord', 'analytics', 'chart', 'graphique', 'statistics', 'stats', 'kpi', 'saas', 'growth'],
    crypto:      ['crypto', 'bitcoin', 'btc', 'ethereum', 'solana', 'ticker', 'market', 'coin', 'monnaie'],
    budget:      ['budget', 'expense', 'dépense', 'finance', 'money', 'argent', 'tracker', 'spending'],
    ecommerce:   ['shop', 'store', 'boutique', 'product', 'produit', 'cart', 'panier', 'ecommerce', 'e-commerce', 'bag', 'leather'],
    sneaker:     ['sneaker', 'shoe', 'chaussure', 'basket', 'streetwear', 'drop', 'edition', 'boost'],
    restaurant:  ['restaurant', 'bistro', 'menu', 'food', 'pizza', 'burger', 'dîner', 'meal', 'order'],
    music:       ['music', 'musique', 'player', 'lecteur', 'audio', 'song', 'chanson', 'playlist', 'synth', 'beatmaker', 'drum'],
    gallery:     ['gallery', 'galerie', 'photo', 'image', 'lightbox', 'masonry', 'showcase', 'photography'],
    paint:       ['paint', 'draw', 'dessin', 'peinture', 'sketch', 'canvas studio', 'brush'],
    regex:       ['regex', 'regexp', 'regular expression', 'pattern', 'matcher', 'text transform'],
    json:        ['json', 'formatter', 'validator', 'beautify', 'minify', 'structure'],
    hash:        ['hash', 'base64', 'encode', 'decode', 'cryptography', 'encoder', 'btoa'],
    quiz:        ['quiz', 'qcm', 'question', 'trivia', 'questionnaire', 'test knowledge'],
    typing:      ['typing', 'type', 'keyboard', 'clavier', 'wpm', 'words per minute', 'frappe', 'speed test'],
    flashcards:  ['flashcard', 'flashcards', 'carte mémoire', 'study', 'revision', 'repetition'],
    calculator:  ['calculator', 'calculatrice', 'calc', 'math', 'calcul', 'scientific', 'trig'],
    password:    ['password', 'mot de passe', 'mdp', 'generator', 'générateur', 'secure', 'security', 'keyforge', 'entropy'],
    weather:     ['weather', 'météo', 'meteo', 'temperature', 'climat', 'forecast', 'radar'],
  };

  function scoreTemplate(templateId, prompt) {
    const p = prompt.toLowerCase();
    const keywords = KEYWORDS_MAP[templateId] || [];
    let score = 0;
    keywords.forEach(kw => {
      if (p.includes(kw.toLowerCase())) score += kw.length * 2;
    });
    return score;
  }

  function findBestTemplate(prompt) {
    if (!window.ULTRA_TEMPLATES || !window.ULTRA_TEMPLATES.length) return null;
    let best = null, bestScore = 0;
    window.ULTRA_TEMPLATES.forEach(tpl => {
      const score = scoreTemplate(tpl.id, prompt);
      if (score > bestScore) { bestScore = score; best = tpl; }
    });
    // If no keyword match, return a random template
    return best || window.ULTRA_TEMPLATES[Math.floor(Math.random() * window.ULTRA_TEMPLATES.length)];
  }

  // ─── SIMULATE GENERATION PROGRESS ────────────────────────────────────────────
  async function simulateProgress(onProgress) {
    const steps = [
      [10, 350, '🔍 Analyzing your request...'],
      [25, 550, '🏗️ Designing architecture...'],
      [45, 800, '✏️ Writing HTML structure...'],
      [62, 650, '🎨 Styling with CSS...'],
      [80, 700, '⚡ Adding JavaScript logic...'],
      [93, 400, '🔧 Optimizing code...'],
      [100, 200, '✅ Done!'],
    ];
    for (const [pct, delay, msg] of steps) {
      onProgress(pct, msg);
      await new Promise(r => setTimeout(r, delay));
    }
  }

  // ─── GEMINI API CALL ──────────────────────────────────────────────────────────
  async function callGemini(apiKey, prompt) {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 8192,
          topP: 0.95,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API Error HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Try direct JSON parse first
    try {
      const parsed = JSON.parse(text);
      if (parsed.html !== undefined || parsed.css !== undefined || parsed.js !== undefined) {
        return {
          html: parsed.html || '',
          css: parsed.css || '',
          js: parsed.js || ''
        };
      }
    } catch (e) { /* Try extraction */ }

    // Try to extract JSON from text (if wrapped in markdown)
    const jsonMatch = text.match(/\{[\s\S]*?"html"[\s\S]*?\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return { html: parsed.html || '', css: parsed.css || '', js: parsed.js || '' };
      } catch (e) { /* Continue */ }
    }

    throw new Error('Could not parse AI response as JSON. Try again.');
  }

  // ─── GEMINI MULTIMODAL API CALL ──────────────────────────────────────────
  async function callGeminiMultimodal(apiKey, base64Data, mimeType, prompt) {
    const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType || 'image/png',
                data: cleanBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 8192,
          topP: 0.95,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API Error HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
      const parsed = JSON.parse(text);
      if (parsed.html !== undefined || parsed.css !== undefined || parsed.js !== undefined) {
        return { html: parsed.html || '', css: parsed.css || '', js: parsed.js || '' };
      }
    } catch (e) { /* Try extraction */ }

    const jsonMatch = text.match(/\{[\s\S]*?"html"[\s\S]*?\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return { html: parsed.html || '', css: parsed.css || '', js: parsed.js || '' };
      } catch (e) { /* Continue */ }
    }

    throw new Error('Could not parse AI response as JSON. Try again.');
  }

  // ─── PUBLIC API ───────────────────────────────────────────────────────────────

  async function generate(prompt, onProgress) {
    const apiKey = localStorage.getItem('ultra_api_key');

    if (apiKey && apiKey.trim()) {
      // Real AI generation via Gemini
      onProgress(5, t('msgGenStart'));

      // Animate progress bar while waiting
      let fakeProgress = 5;
      const fakeInterval = setInterval(() => {
        if (fakeProgress < 85) {
          fakeProgress += Math.random() * 8;
          onProgress(Math.min(fakeProgress, 85), '✦ AI is thinking...');
        }
      }, 800);

      try {
        const fullPrompt = `${SYSTEM_PROMPT}\n\nUser request: ${prompt}`;
        const result = await callGemini(apiKey.trim(), fullPrompt);
        clearInterval(fakeInterval);
        onProgress(100, t('msgGenDone'));
        return result;
      } catch (err) {
        clearInterval(fakeInterval);
        throw err;
      }
    } else {
      // Demo mode: smart template matching with animated progress
      await simulateProgress(onProgress);
      const tpl = findBestTemplate(prompt);
      if (!tpl) throw new Error('No templates available');
      return { html: tpl.html, css: tpl.css, js: tpl.js };
    }
  }

  async function generateWithVision(base64Data, mimeType, prompt, onProgress) {
    const apiKey = localStorage.getItem('ultra_api_key');

    if (apiKey && apiKey.trim()) {
      onProgress(10, '📸 Analyzing image layout and elements with Gemini Vision...');
      let fakeProgress = 10;
      const fakeInterval = setInterval(() => {
        if (fakeProgress < 85) {
          fakeProgress += Math.random() * 7;
          onProgress(Math.min(fakeProgress, 85), '✦ Converting wireframe/sketch to live code...');
        }
      }, 800);

      try {
        const fullPrompt = `${SYSTEM_PROMPT}\n\nTASK: Analyze the provided UI screenshot / wireframe sketch carefully. Recreate it as a COMPLETE, BEAUTIFUL, PRODUCTION-GRADE, RESPONSIVE, WORKING web application. User instructions: ${prompt || 'Clone and make fully functional'}`;
        const result = await callGeminiMultimodal(apiKey.trim(), base64Data, mimeType, fullPrompt);
        clearInterval(fakeInterval);
        onProgress(100, t('msgGenDone'));
        return result;
      } catch (err) {
        clearInterval(fakeInterval);
        throw err;
      }
    } else {
      // Demo Vision Mode: smart matching
      await simulateProgress(onProgress);
      const tpl = findBestTemplate(prompt || 'dashboard');
      return { html: tpl.html, css: tpl.css, js: tpl.js };
    }
  }

  async function modify(chatRequest, existingCode, onProgress) {
    const apiKey = localStorage.getItem('ultra_api_key');

    if (apiKey && apiKey.trim()) {
      onProgress(15, '🤖 AI is modifying your app...');

      let fakeProgress = 15;
      const fakeInterval = setInterval(() => {
        if (fakeProgress < 80) {
          fakeProgress += 10;
          onProgress(fakeProgress, '✦ Applying changes...');
        }
      }, 600);

      try {
        const prompt = MODIFY_PROMPT(chatRequest, existingCode.html, existingCode.css, existingCode.js);
        const result = await callGemini(apiKey.trim(), prompt);
        clearInterval(fakeInterval);
        onProgress(100, '✅ Changes applied!');
        return result;
      } catch (err) {
        clearInterval(fakeInterval);
        throw err;
      }
    } else {
      // Demo mode: cannot modify without API key
      await new Promise(r => setTimeout(r, 1200));
      onProgress(100, '⚠️ Connect Gemini API to enable AI modifications');
      return existingCode; // Return unchanged
    }
  }

  async function modifyComponent(targetOuterHtml, userPrompt, contextCode, onProgress) {
    const apiKey = localStorage.getItem('ultra_api_key');

    if (apiKey && apiKey.trim()) {
      onProgress(20, '🎯 Refactoring targeted component...');
      const surgicalPrompt = `You are an expert frontend engineer performing SURGICAL COMPONENT REFACTORING.
Modify the following HTML component based strictly on this request: "${userPrompt}".
Current component HTML:
${targetOuterHtml}

RULES:
1. Return ONLY valid JSON: {"replacementHtml": "...", "additionalCss": "...", "additionalJs": "..."}
2. replacementHtml must be the complete replacement for the component.
3. additionalCss / additionalJs can be empty string if not needed.
4. No markdown, no commentary.`;

      const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: surgicalPrompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
        })
      });

      if (!response.ok) throw new Error('Surgical AI request failed');
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      try {
        const parsed = JSON.parse(text);
        onProgress(100, '✅ Component updated!');
        return parsed;
      } catch(e) {
        const match = text.match(/\{[\s\S]*?"replacementHtml"[\s\S]*?\}/);
        if (match) return JSON.parse(match[0]);
      }
      throw new Error('Could not parse surgical component response.');
    } else {
      // Demo mode surgical fallback: smart client-side enhancement
      await new Promise(r => setTimeout(r, 600));
      onProgress(100, '✅ Enhanced locally (Demo)');
      return {
        replacementHtml: targetOuterHtml.replace(/class="/, 'class="ultra-enhanced-component ')
      };
    }
  }

  return { generate, generateWithVision, modify, modifyComponent };
})();

window.AIEngine = AIEngine;

