
(function () {
  'use strict';

  // ─── Tab Registration ────────────────────────────────────────────────────────
  const TAB_ID = 'codetutorialgame';
  const _origRenderTab = window.renderTab;

  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId === TAB_ID) {
      renderCodeTutorialGame();
      setTimeout(() => {
        const btn = document.getElementById('ctg-load-editor-btn');
        if (btn) btn.click();
      }, 50);
    }
  };

  // ─── i18n ────────────────────────────────────────────────────────────────────
  const T = {
    en: {
      title: '🎮 Code Tutorial Game Engine',
      subtitle: 'Paste code → Play a fill-in-the-blank game',
      pasteLabel: 'Paste Your Code Snippet',
      placeholder: 'Paste any HTML, CSS or JavaScript here…',
      generateBtn: 'Generate Game ▶',
      newGameBtn: '🔀 New Game',
      harderBtn: '🔥 Harder Mode (50%)',
      normalBtn: '⚡ Normal Mode (25%)',
      shareBtn: '📤 Share Game',
      loadEditorBtn: '🚀 Load Full Standalone App',
      examplesLabel: 'Built-in Examples:',
      exCssFlexbox: 'CSS Flexbox',
      exJsFetch: 'JS Fetch',
      exHtmlForm: 'HTML Form',
      exCssAnim: 'CSS Animation',
      wordBankLabel: '🧩 Word Bank — drag chips into the blanks',
      scoreLabel: 'Score',
      timerLabel: 'Time',
      streakLabel: 'Streak',
      resultTitle: '🏆 Result',
      resultScore: 'Your score:',
      resultTime: 'Time:',
      resultStars: 'Stars:',
      playAgainBtn: '🔄 Play Again',
      toastInit: '✅ Code Tutorial Game Engine initialized.',
      toastGenerated: '🎮 Game generated! Fill in the blanks.',
      toastShared: '📋 Standalone game copied to clipboard!',
      toastNoCode: '⚠️ Please paste some code first.',
      instructionsTitle: 'How to Play',
      inst1: 'Paste any code snippet above.',
      inst2: 'Click "Generate Game" to create fill-in-the-blank puzzle.',
      inst3: 'Click a blank, then click a chip from the Word Bank to fill it.',
      inst4: 'Or drag chips directly into blanks.',
      inst5: 'Green = correct ✓   Red = wrong, try again.',
      inst6: 'Earn streak multipliers for consecutive correct answers!',
      correctMsg: '✓ Correct!',
      wrongMsg: '✗ Wrong!',
      allDoneMsg: 'All blanks filled!',
      s: 's',
    },
    fr: {
      title: '🎮 Moteur de Jeu Tutoriel de Code',
      subtitle: 'Collez du code → Jouez à un jeu à trous',
      pasteLabel: 'Collez votre extrait de code',
      placeholder: 'Collez du HTML, CSS ou JavaScript ici…',
      generateBtn: 'Générer le Jeu ▶',
      newGameBtn: '🔀 Nouveau Jeu',
      harderBtn: '🔥 Mode Difficile (50%)',
      normalBtn: '⚡ Mode Normal (25%)',
      shareBtn: '📤 Partager le Jeu',
      loadEditorBtn: '🚀 Charger l\'App Standalone',
      examplesLabel: 'Exemples intégrés :',
      exCssFlexbox: 'CSS Flexbox',
      exJsFetch: 'JS Fetch',
      exHtmlForm: 'Formulaire HTML',
      exCssAnim: 'Animation CSS',
      wordBankLabel: '🧩 Banque de mots — glissez les jetons dans les trous',
      scoreLabel: 'Score',
      timerLabel: 'Temps',
      streakLabel: 'Série',
      resultTitle: '🏆 Résultat',
      resultScore: 'Votre score :',
      resultTime: 'Temps :',
      resultStars: 'Étoiles :',
      playAgainBtn: '🔄 Rejouer',
      toastInit: '✅ Moteur de Jeu Tutoriel initialisé.',
      toastGenerated: '🎮 Jeu généré ! Remplissez les trous.',
      toastShared: '📋 Jeu standalone copié dans le presse-papiers !',
      toastNoCode: '⚠️ Veuillez coller du code d\'abord.',
      instructionsTitle: 'Comment Jouer',
      inst1: 'Collez un extrait de code ci-dessus.',
      inst2: 'Cliquez sur "Générer le Jeu" pour créer un puzzle à trous.',
      inst3: 'Cliquez un trou, puis un jeton de la Banque pour le remplir.',
      inst4: 'Ou faites glisser les jetons directement dans les trous.',
      inst5: 'Vert = correct ✓   Rouge = incorrect, réessayez.',
      inst6: 'Gagnez des multiplicateurs de série pour des bonnes réponses consécutives!',
      correctMsg: '✓ Correct !',
      wrongMsg: '✗ Faux !',
      allDoneMsg: 'Tous les trous sont remplis !',
      s: 's',
    }
  };

  function lang() { return (window.appLang || 'en') === 'fr' ? 'fr' : 'en'; }
  function t(k) { return (T[lang()] || T.en)[k] || k; }

  // ─── Built-in Example Snippets ───────────────────────────────────────────────
  const EXAMPLES = {
    cssFlexbox: `.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;
  background-color: #ffffff;
}

.item {
  flex: 1 1 200px;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 16px;
  font-size: 14px;
  color: #333333;
}`,

    jsFetch: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    console.log('User fetched:', data.name);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error.message);
    return null;
  }
}

fetchUserData(42).then(user => {
  if (user) {
    document.getElementById('username').textContent = user.name;
  }
});`,

    htmlForm: `<form id="contact-form" method="POST" action="/submit">
  <div class="form-group">
    <label for="name">Full Name</label>
    <input type="text" id="name" name="name" required placeholder="Enter your name">
  </div>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" required placeholder="you@example.com">
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit" class="btn-primary">Send Message</button>
  <button type="reset" class="btn-secondary">Clear Form</button>
</form>`,

    cssAnimation: `@keyframes slideInUp {
  from {
    transform: translateY(60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.card {
  animation: slideInUp 0.4s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.fade-in {
  animation: fadeIn 0.6s ease-in both;
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}`
  };

  // ─── Tokenizer ───────────────────────────────────────────────────────────────
  // Returns array of token objects: { type, value, removable }
  function tokenizeCode(code) {
    const tokens = [];
    // We'll use a simple character-by-character tokenizer that understands
    // CSS, HTML, and JS well enough to produce meaningful tokens.

    // Detect language
    const trimmed = code.trim();
    let lang_type = 'js';
    if (trimmed.startsWith('<')) lang_type = 'html';
    else if (/^[\s\S]*\{[\s\S]*:[\s\S]*;/.test(trimmed) && !trimmed.startsWith('const') && !trimmed.startsWith('let') && !trimmed.startsWith('var') && !trimmed.startsWith('function') && !trimmed.startsWith('async') && !trimmed.startsWith('//')) lang_type = 'css';

    // Use regex-based tokenizer
    let regexes;
    if (lang_type === 'html') {
      regexes = [
        { type: 'comment',    re: /^<!--[\s\S]*?-->/ },
        { type: 'tag-open',   re: /^<\/?[a-zA-Z][a-zA-Z0-9\-]*/ },
        { type: 'attr-name',  re: /^[a-zA-Z_:][a-zA-Z0-9\-_:.]*(?=\s*=)/ },
        { type: 'attr-value', re: /^"[^"]*"|^'[^']*'/ },
        { type: 'tag-close',  re: /^\/?>/ },
        { type: 'text',       re: /^[^<]+/ },
      ];
    } else if (lang_type === 'css') {
      regexes = [
        { type: 'comment',    re: /^\/\*[\s\S]*?\*\// },
        { type: 'at-rule',    re: /^@[a-zA-Z\-]+/ },
        { type: 'selector',   re: /^[^{};,\s\/][^{};,\/]*(?=\s*\{)/ },
        { type: 'prop',       re: /^[a-zA-Z\-]+(?=\s*:)/ },
        { type: 'value',      re: /^:[^;{}]+(?=;)/ },
        { type: 'semicolon',  re: /^;/ },
        { type: 'brace',      re: /^[{}]/ },
        { type: 'whitespace', re: /^\s+/ },
        { type: 'other',      re: /^./ },
      ];
    } else {
      // JavaScript
      regexes = [
        { type: 'comment-block',  re: /^\/\*[\s\S]*?\*\// },
        { type: 'comment-line',   re: /^\/\/[^\n]*/ },
        { type: 'template',       re: /^`(?:[^`\\]|\\.)*`/ },
        { type: 'string',         re: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/ },
        { type: 'number',         re: /^\b\d+(\.\d+)?\b/ },
        { type: 'keyword',        re: /^(async|await|function|return|const|let|var|if|else|try|catch|throw|new|class|extends|import|export|default|for|while|do|switch|case|break|continue|typeof|instanceof|void|delete|in|of)\b/ },
        { type: 'builtin',        re: /^(console|document|window|fetch|Promise|Array|Object|JSON|Math|Date|Error|parseInt|parseFloat|setTimeout|setInterval|clearTimeout|clearInterval)\b/ },
        { type: 'identifier',     re: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
        { type: 'operator',       re: /^[+\-*/%=<>!&|^~?:]+/ },
        { type: 'punctuation',    re: /^[()[\]{},;.]/ },
        { type: 'whitespace',     re: /^\s+/ },
        { type: 'other',          re: /^./ },
      ];
    }

    // Removable token types (these make good blanks)
    const removableTypes = new Set([
      'attr-value', 'tag-open',
      'value', 'prop', 'selector', 'at-rule',
      'keyword', 'builtin', 'identifier', 'number', 'string',
    ]);

    let remaining = code;
    let pos = 0;
    while (remaining.length > 0) {
      let matched = false;
      for (const { type, re } of regexes) {
        const m = remaining.match(re);
        if (m) {
          const value = m[0];
          const removable = removableTypes.has(type) && value.trim().length > 1;
          tokens.push({ type, value, removable, id: pos++ });
          remaining = remaining.slice(value.length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        tokens.push({ type: 'other', value: remaining[0], removable: false, id: pos++ });
        remaining = remaining.slice(1);
      }
    }

    // For CSS values, strip the leading colon and trailing semicolon from the raw match,
    // we want to show ":" and ";" as punctuation, and only blank the actual value part.
    // Re-split CSS value tokens
    const finalTokens = [];
    for (const tok of tokens) {
      if (tok.type === 'value') {
        // tok.value looks like ": flex;" or ": 0 4px …;"
        const colonIdx = tok.value.indexOf(':');
        const rawVal = tok.value.slice(colonIdx + 1).trim();
        finalTokens.push({ type: 'colon', value: tok.value.slice(0, colonIdx + 1), removable: false, id: tok.id });
        finalTokens.push({ type: 'css-value', value: ' ' + rawVal, removable: true, id: tok.id + 0.5 });
      } else {
        finalTokens.push(tok);
      }
    }

    return finalTokens;
  }

  // ─── Game State ──────────────────────────────────────────────────────────────
  let gameState = {
    tokens: [],
    blanks: [],        // { id, answer, filled: null }
    wordBank: [],      // shuffled list of answers
    score: 0,
    total: 0,
    timerInterval: null,
    elapsed: 0,
    streak: 0,
    maxStreak: 0,
    selectedBlankId: null,
    selectedChipValue: null,
    hardMode: false,
    originalCode: '',
    started: false,
    finished: false,
  };

  // ─── Shuffle ─────────────────────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ─── Generate Game from Code ─────────────────────────────────────────────────
  function generateGame(code, hard) {
    const tokens = tokenizeCode(code);
    const removable = tokens.filter(t => t.removable);
    if (removable.length === 0) return null;

    const pct = hard ? 0.50 : 0.25;
    // Ensure at least 1, at most all removable
    let count = Math.max(1, Math.round(removable.length * pct));
    count = Math.min(count, removable.length);

    // Pick evenly distributed indices from removable tokens
    const selectedIds = new Set();
    const shuffledRemovable = shuffle(removable);
    for (let i = 0; i < count; i++) {
      selectedIds.add(shuffledRemovable[i].id);
    }

    const blanks = [];
    const usedBankValues = [];

    tokens.forEach(tok => {
      if (selectedIds.has(tok.id)) {
        const blankId = 'blank_' + tok.id;
        blanks.push({ blankId, answer: tok.value.trim(), filled: null, correct: null });
        usedBankValues.push(tok.value.trim());
      }
    });

    // Build word bank (shuffled, may have duplicates displayed individually)
    const wordBank = shuffle(usedBankValues.map((v, i) => ({ chipId: 'chip_' + i, value: v, used: false })));

    return { tokens, blanks, wordBank, selectedIds };
  }

  // ─── Timer ───────────────────────────────────────────────────────────────────
  function startTimer() {
    stopTimer();
    gameState.elapsed = 0;
    updateTimerDisplay();
    gameState.timerInterval = setInterval(() => {
      gameState.elapsed++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (gameState.timerInterval) {
      clearInterval(gameState.timerInterval);
      gameState.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const el = document.getElementById('ctg-timer-value');
    if (el) {
      const m = Math.floor(gameState.elapsed / 60);
      const s = gameState.elapsed % 60;
      el.textContent = (m > 0 ? m + 'm ' : '') + s + t('s');
    }
  }

  // ─── Score Display ───────────────────────────────────────────────────────────
  function updateScoreDisplay() {
    const sc = document.getElementById('ctg-score-value');
    const sk = document.getElementById('ctg-streak-value');
    if (sc) sc.textContent = gameState.score + '/' + gameState.total;
    if (sk) sk.textContent = '×' + (gameState.streak || 0);
  }

  // ─── Render Game Board ───────────────────────────────────────────────────────
  function renderGameBoard() {
    const board = document.getElementById('ctg-game-board');
    if (!board) return;

    const { tokens, blanks, selectedIds } = gameState._gen;
    const blankMap = {};
    blanks.forEach(b => { blankMap[b.blankId] = b; });
    gameState.blanks = blanks;
    gameState.total = blanks.length;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.selectedBlankId = null;

    updateScoreDisplay();

    let html = '<pre class="ctg-code-pre"><code class="ctg-code-display">';
    tokens.forEach(tok => {
      if (selectedIds.has(tok.id)) {
        const blankId = 'blank_' + tok.id;
        const blank = blankMap[blankId];
        const displayLen = Math.max(5, tok.value.trim().length);
        const widthPx = Math.max(60, displayLen * 9);
        html += `<span class="ctg-blank" id="${blankId}" data-blank-id="${blankId}" 
          style="min-width:${widthPx}px" 
          draggable="false"
          ondragover="event.preventDefault()"
          ondrop="window.__ctgDrop(event, '${blankId}')"
          onclick="window.__ctgBlankClick('${blankId}')">&#8203;</span>`;
      } else {
        // Escape HTML special chars
        const escaped = tok.value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        html += `<span class="ctg-token ctg-type-${tok.type}">${escaped}</span>`;
      }
    });
    html += '</code></pre>';
    board.innerHTML = html;
  }

  // ─── Render Word Bank ─────────────────────────────────────────────────────────
  function renderWordBank() {
    const bank = document.getElementById('ctg-word-bank');
    if (!bank) return;
    bank.innerHTML = '';
    gameState.wordBank.forEach(chip => {
      if (chip.used) return;
      const el = document.createElement('span');
      el.className = 'ctg-chip';
      el.id = chip.chipId;
      el.textContent = chip.value;
      el.draggable = true;
      el.setAttribute('data-chip-id', chip.chipId);
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', chip.chipId);
        gameState.selectedChipValue = chip.value;
        gameState.selectedChipId = chip.chipId;
        el.classList.add('ctg-chip-dragging');
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('ctg-chip-dragging');
      });
      el.addEventListener('click', () => {
        window.__ctgChipClick(chip.chipId, chip.value);
      });
      bank.appendChild(el);
    });
  }

  // ─── Drop / Click Handlers ───────────────────────────────────────────────────
  window.__ctgDrop = function(event, blankId) {
    event.preventDefault();
    const chipId = event.dataTransfer.getData('text/plain');
    const chip = gameState.wordBank.find(c => c.chipId === chipId);
    if (!chip || chip.used) return;
    tryFillBlank(blankId, chip.value, chipId);
  };

  window.__ctgBlankClick = function(blankId) {
    // Deselect any previously selected blank
    document.querySelectorAll('.ctg-blank-selected').forEach(el => el.classList.remove('ctg-blank-selected'));
    const blankEl = document.getElementById(blankId);

    // If blank is already correctly filled, ignore
    const blank = gameState.blanks.find(b => b.blankId === blankId);
    if (!blank || blank.correct === true) return;

    if (gameState.selectedBlankId === blankId) {
      gameState.selectedBlankId = null;
      return;
    }

    gameState.selectedBlankId = blankId;
    if (blankEl) blankEl.classList.add('ctg-blank-selected');

    // If a chip was already clicked, fill immediately
    if (gameState.selectedChipId && gameState.selectedChipValue) {
      tryFillBlank(blankId, gameState.selectedChipValue, gameState.selectedChipId);
    }
  };

  window.__ctgChipClick = function(chipId, chipValue) {
    const chip = gameState.wordBank.find(c => c.chipId === chipId);
    if (!chip || chip.used) return;

    // Deselect other chips
    document.querySelectorAll('.ctg-chip-selected').forEach(el => el.classList.remove('ctg-chip-selected'));
    const chipEl = document.getElementById(chipId);

    if (gameState.selectedChipId === chipId) {
      gameState.selectedChipId = null;
      gameState.selectedChipValue = null;
      return;
    }

    gameState.selectedChipId = chipId;
    gameState.selectedChipValue = chipValue;
    if (chipEl) chipEl.classList.add('ctg-chip-selected');

    // If a blank is already selected, fill it
    if (gameState.selectedBlankId) {
      tryFillBlank(gameState.selectedBlankId, chipValue, chipId);
    }
  };

  function tryFillBlank(blankId, chipValue, chipId) {
    const blank = gameState.blanks.find(b => b.blankId === blankId);
    if (!blank || blank.correct === true) return;

    const blankEl = document.getElementById(blankId);
    const chipEl = document.getElementById(chipId);

    const isCorrect = chipValue.trim() === blank.answer.trim();

    blank.filled = chipValue;
    blank.correct = isCorrect;

    // Clear selections
    gameState.selectedBlankId = null;
    gameState.selectedChipId = null;
    gameState.selectedChipValue = null;
    document.querySelectorAll('.ctg-blank-selected').forEach(el => el.classList.remove('ctg-blank-selected'));
    document.querySelectorAll('.ctg-chip-selected').forEach(el => el.classList.remove('ctg-chip-selected'));

    if (isCorrect) {
      gameState.score++;
      gameState.streak++;
      if (gameState.streak > gameState.maxStreak) gameState.maxStreak = gameState.streak;
      // Mark chip as used
      const chip = gameState.wordBank.find(c => c.chipId === chipId);
      if (chip) chip.used = true;
      if (chipEl) chipEl.style.display = 'none';
      if (blankEl) {
        blankEl.textContent = chipValue;
        blankEl.classList.add('ctg-blank-correct');
        blankEl.classList.remove('ctg-blank', 'ctg-blank-selected', 'ctg-blank-wrong');
        // Remove click handler
        blankEl.onclick = null;
        blankEl.ondrop = null;
        blankEl.ondragover = null;
      }
      showFeedback(t('correctMsg') + (gameState.streak > 1 ? ' ×' + gameState.streak + '🔥' : ''), 'success');
    } else {
      gameState.streak = 0;
      if (blankEl) {
        blankEl.classList.add('ctg-blank-wrong');
        blankEl.textContent = chipValue;
        setTimeout(() => {
          blankEl.textContent = '\u200B';
          blankEl.classList.remove('ctg-blank-wrong');
        }, 800);
      }
      showFeedback(t('wrongMsg'), 'error');
    }

    updateScoreDisplay();

    // Check if all blanks are filled
    const allDone = gameState.blanks.every(b => b.correct === true);
    if (allDone) {
      stopTimer();
      gameState.finished = true;
      setTimeout(showResult, 500);
    }

    renderWordBank();
  }

  function showFeedback(msg, type) {
    const fb = document.getElementById('ctg-feedback');
    if (!fb) return;
    fb.textContent = msg;
    fb.className = 'ctg-feedback ctg-feedback-' + type + ' ctg-feedback-visible';
    clearTimeout(fb._timer);
    fb._timer = setTimeout(() => {
      fb.classList.remove('ctg-feedback-visible');
    }, 1500);
  }

  // ─── Result Modal ─────────────────────────────────────────────────────────────
  function showResult() {
    const pct = gameState.total > 0 ? (gameState.score / gameState.total) : 0;
    const stars = pct >= 1 ? 3 : pct >= 0.8 ? 2 : pct >= 0.5 ? 1 : 0;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    const m = Math.floor(gameState.elapsed / 60);
    const s = gameState.elapsed % 60;
    const timeStr = (m > 0 ? m + 'm ' : '') + s + 's';

    const modal = document.getElementById('ctg-result-modal');
    if (!modal) return;

    document.getElementById('ctg-result-score').textContent = gameState.score + '/' + gameState.total + ' (' + Math.round(pct * 100) + '%)';
    document.getElementById('ctg-result-time').textContent = timeStr;
    document.getElementById('ctg-result-stars').textContent = starStr;
    document.getElementById('ctg-result-streak').textContent = '×' + gameState.maxStreak;

    modal.style.display = 'flex';
  }

  // ─── Standalone Template ─────────────────────────────────────────────────────
  function buildStandaloneGame() {
    const code = gameState.originalCode || '';
    const genData = gameState._gen;
    if (!genData) return '';

    // Serialize game data
    const gameData = {
      tokens: genData.tokens.map(t => ({ type: t.type, value: t.value, id: t.id })),
      blanks: genData.blanks.map(b => ({ blankId: b.blankId, answer: b.answer })),
      wordBank: genData.wordBank.map(c => ({ chipId: c.chipId, value: c.value })),
      selectedIds: Array.from(genData.selectedIds),
    };
    const gameDataJson = JSON.stringify(gameData).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Code Tutorial Game</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#020617;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 16px}
h1{font-size:2rem;font-weight:700;background:linear-gradient(90deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;text-align:center}
.subtitle{color:#94a3b8;margin-bottom:32px;text-align:center}
.hud{display:flex;gap:24px;margin-bottom:24px;justify-content:center}
.hud-item{background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:10px 20px;text-align:center}
.hud-label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px}
.hud-value{font-size:1.4rem;font-weight:700;color:#7c3aed}
.code-pre{background:#0a0f1e;border:1px solid #1e293b;border-radius:12px;padding:24px;font-family:'Fira Code',monospace;font-size:13px;line-height:1.8;white-space:pre-wrap;word-break:break-word;width:100%;max-width:860px;overflow-x:auto}
.blank{display:inline-block;min-width:60px;height:24px;border:2px dashed #7c3aed;border-radius:6px;background:#1e0a3c;cursor:pointer;vertical-align:middle;text-align:center;line-height:22px;color:#a78bfa;font-size:13px;transition:all 0.2s;padding:0 6px}
.blank:hover{border-color:#a78bfa;background:#2d1060}
.blank-selected{border-color:#06b6d4;background:#0e2a38;box-shadow:0 0 10px #06b6d440}
.blank-correct{border:2px solid #10b981;background:#052e1c;color:#34d399;cursor:default;box-shadow:0 0 8px #10b98140}
.blank-wrong{border-color:#ef4444;background:#2d0f0f;animation:shake 0.4s}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.word-bank-label{color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;margin-top:24px}
.word-bank{display:flex;flex-wrap:wrap;gap:10px;max-width:860px;width:100%;justify-content:center;min-height:50px;background:#060e1f;border:1px solid #1e293b;border-radius:12px;padding:16px}
.chip{display:inline-flex;align-items:center;padding:6px 16px;background:#1e0a3c;border:1px solid #7c3aed;border-radius:20px;color:#c4b5fd;font-family:'Fira Code',monospace;font-size:13px;cursor:pointer;user-select:none;transition:all 0.2s}
.chip:hover{background:#2d1060;border-color:#a78bfa;box-shadow:0 0 12px #7c3aed50;transform:translateY(-2px)}
.chip-selected{background:#312e81;border-color:#06b6d4;box-shadow:0 0 12px #06b6d450}
.feedback{position:fixed;top:20px;right:20px;padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;opacity:0;transform:translateY(-10px);transition:all 0.3s;pointer-events:none;z-index:999}
.feedback.visible{opacity:1;transform:translateY(0)}
.feedback.success{background:#052e1c;border:1px solid #10b981;color:#34d399}
.feedback.error{background:#2d0f0f;border:1px solid #ef4444;color:#f87171}
.result-modal{display:none;position:fixed;inset:0;background:#000000cc;z-index:1000;align-items:center;justify-content:center}
.result-card{background:#0f172a;border:1px solid #7c3aed;border-radius:20px;padding:40px;text-align:center;max-width:420px;width:90%}
.result-card h2{font-size:1.8rem;font-weight:700;margin-bottom:24px;color:#a78bfa}
.result-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1e293b;font-size:15px}
.result-row:last-of-type{border:none}
.result-val{font-weight:700;color:#06b6d4}
.stars{font-size:2rem;margin:20px 0}
.btn{padding:12px 28px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;margin-top:16px}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff}
.btn-primary:hover{opacity:0.9;transform:scale(1.03)}
.token-keyword{color:#c084fc}
.token-builtin{color:#67e8f9}
.token-string{color:#86efac}
.token-number{color:#fbbf24}
.token-comment,.token-comment-block,.token-comment-line{color:#4b5563;font-style:italic}
.token-tag-open{color:#f472b6}
.token-attr-name{color:#93c5fd}
.token-prop{color:#67e8f9}
.token-selector{color:#f472b6}
.token-at-rule{color:#c084fc}
</style>
</head>
<body>
<h1>🎮 Code Tutorial Game</h1>
<p class="subtitle">Fill in the blanks — click a blank, then click a word chip!</p>
<div class="hud">
  <div class="hud-item"><div class="hud-label">Score</div><div class="hud-value" id="score">0/0</div></div>
  <div class="hud-item"><div class="hud-label">Time</div><div class="hud-value" id="timer">0s</div></div>
  <div class="hud-item"><div class="hud-label">Streak</div><div class="hud-value" id="streak">×0</div></div>
</div>
<pre class="code-pre" id="board"></pre>
<div class="word-bank-label">🧩 Word Bank — click chips then click blanks</div>
<div class="word-bank" id="bank"></div>
<div class="feedback" id="fb"></div>
<div class="result-modal" id="modal">
  <div class="result-card">
    <h2>🏆 Result</h2>
    <div class="result-row"><span>Score</span><span class="result-val" id="r-score"></span></div>
    <div class="result-row"><span>Time</span><span class="result-val" id="r-time"></span></div>
    <div class="result-row"><span>Best Streak</span><span class="result-val" id="r-streak"></span></div>
    <div class="stars" id="r-stars"></div>
    <button class="btn btn-primary" onclick="initGame()">🔄 Play Again</button>
  </div>
</div>
<${'script'}>
const GAME_DATA = ${gameDataJson};
let state={blanks:[],wordBank:[],score:0,total:0,elapsed:0,streak:0,maxStreak:0,selBlankId:null,selChipId:null,selChipVal:null,timerInt:null};
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
function initGame(){
  const modal=document.getElementById('modal');modal.style.display='none';
  state={blanks:GAME_DATA.blanks.map(b=>({...b,filled:null,correct:null})),
    wordBank:shuffle(GAME_DATA.wordBank.map(c=>({...c,used:false}))),
    score:0,total:GAME_DATA.blanks.length,elapsed:0,streak:0,maxStreak:0,
    selBlankId:null,selChipId:null,selChipVal:null,timerInt:null};
  renderBoard();renderBank();startTimer();updateHud();
}
const selIds=new Set(GAME_DATA.selectedIds);
function renderBoard(){
  const board=document.getElementById('board');
  let html='';
  GAME_DATA.tokens.forEach(tok=>{
    if(selIds.has(tok.id)){
      const bid='blank_'+tok.id;
      const w=Math.max(60,tok.value.trim().length*9);
      html+=\`<span class="blank" id="\${bid}" onclick="blankClick('\${bid}')" ondragover="event.preventDefault()" ondrop="doDrop(event,'\${bid}')" style="min-width:\${w}px">&#8203;</span>\`;
    }else{
      const esc=tok.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      html+=\`<span class="token-\${tok.type}">\${esc}</span>\`;
    }
  });
  board.innerHTML=html;
}
function renderBank(){
  const bank=document.getElementById('bank');bank.innerHTML='';
  state.wordBank.forEach(c=>{
    if(c.used)return;
    const el=document.createElement('span');
    el.className='chip';el.id=c.chipId;el.textContent=c.value;
    el.draggable=true;
    el.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',c.chipId);state.selChipId=c.chipId;state.selChipVal=c.value;el.classList.add('chip-dragging');});
    el.addEventListener('dragend',()=>el.classList.remove('chip-dragging'));
    el.addEventListener('click',()=>chipClick(c.chipId,c.value));
    bank.appendChild(el);
  });
}
function blankClick(bid){
  document.querySelectorAll('.blank-selected').forEach(e=>e.classList.remove('blank-selected'));
  const bl=state.blanks.find(b=>b.blankId===bid);
  if(!bl||bl.correct===true)return;
  if(state.selBlankId===bid){state.selBlankId=null;return;}
  state.selBlankId=bid;
  const el=document.getElementById(bid);if(el)el.classList.add('blank-selected');
  if(state.selChipId&&state.selChipVal)tryFill(bid,state.selChipVal,state.selChipId);
}
function chipClick(cid,cval){
  const chip=state.wordBank.find(c=>c.chipId===cid);if(!chip||chip.used)return;
  document.querySelectorAll('.chip-selected').forEach(e=>e.classList.remove('chip-selected'));
  if(state.selChipId===cid){state.selChipId=null;state.selChipVal=null;return;}
  state.selChipId=cid;state.selChipVal=cval;
  const el=document.getElementById(cid);if(el)el.classList.add('chip-selected');
  if(state.selBlankId)tryFill(state.selBlankId,cval,cid);
}
function doDrop(e,bid){e.preventDefault();const cid=e.dataTransfer.getData('text/plain');const c=state.wordBank.find(x=>x.chipId===cid);if(!c||c.used)return;tryFill(bid,c.value,cid);}
function tryFill(bid,cval,cid){
  const bl=state.blanks.find(b=>b.blankId===bid);if(!bl||bl.correct===true)return;
  const bel=document.getElementById(bid);const cel=document.getElementById(cid);
  const ok=cval.trim()===bl.answer.trim();
  bl.filled=cval;bl.correct=ok;
  state.selBlankId=null;state.selChipId=null;state.selChipVal=null;
  document.querySelectorAll('.blank-selected').forEach(e=>e.classList.remove('blank-selected'));
  document.querySelectorAll('.chip-selected').forEach(e=>e.classList.remove('chip-selected'));
  if(ok){
    state.score++;state.streak++;if(state.streak>state.maxStreak)state.maxStreak=state.streak;
    const c=state.wordBank.find(x=>x.chipId===cid);if(c)c.used=true;
    if(cel)cel.style.display='none';
    if(bel){bel.textContent=cval;bel.className='blank blank-correct';bel.onclick=null;bel.ondrop=null;}
    showFb('✓ Correct!'+(state.streak>1?' ×'+state.streak+'🔥':''),'success');
  }else{
    state.streak=0;
    if(bel){bel.classList.add('blank-wrong');bel.textContent=cval;setTimeout(()=>{bel.textContent='\\u200B';bel.classList.remove('blank-wrong');},800);}
    showFb('✗ Wrong!','error');
  }
  updateHud();renderBank();
  if(state.blanks.every(b=>b.correct===true)){stopTimer();setTimeout(showResult,500);}
}
function showFb(msg,type){
  const fb=document.getElementById('fb');fb.textContent=msg;fb.className='feedback '+type+' visible';
  clearTimeout(fb._t);fb._t=setTimeout(()=>fb.classList.remove('visible'),1500);
}
function updateHud(){
  document.getElementById('score').textContent=state.score+'/'+state.total;
  document.getElementById('streak').textContent='×'+state.streak;
}
function startTimer(){stopTimer();state.elapsed=0;updTimer();state.timerInt=setInterval(()=>{state.elapsed++;updTimer();},1000);}
function stopTimer(){if(state.timerInt){clearInterval(state.timerInt);state.timerInt=null;}}
function updTimer(){const m=Math.floor(state.elapsed/60),s=state.elapsed%60;document.getElementById('timer').textContent=(m>0?m+'m ':'')+s+'s';}
function showResult(){
  const pct=state.total>0?state.score/state.total:0;
  const stars=pct>=1?3:pct>=0.8?2:pct>=0.5?1:0;
  document.getElementById('r-score').textContent=state.score+'/'+state.total+' ('+Math.round(pct*100)+'%)';
  const m=Math.floor(state.elapsed/60),s=state.elapsed%60;
  document.getElementById('r-time').textContent=(m>0?m+'m ':'')+s+'s';
  document.getElementById('r-streak').textContent='×'+state.maxStreak;
  document.getElementById('r-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);
  document.getElementById('modal').style.display='flex';
}
initGame();
</${'script'}>
</body>
</html>`;
  }

  // ─── STANDALONE_TEMPLATE ─────────────────────────────────────────────────────
  // (used by the Load Full Standalone App button)
  const STANDALONE_TEMPLATE = buildStandaloneGame;  // function, called fresh each time

  // ─── CSS ─────────────────────────────────────────────────────────────────────
  const CSS = `
    #ctg-root {
      font-family: 'Inter', sans-serif;
      background: #020617;
      color: #e2e8f0;
      min-height: 100%;
      padding: 24px 20px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .ctg-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .ctg-title {
      font-size: 1.65rem;
      font-weight: 700;
      background: linear-gradient(90deg, #7c3aed, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 4px;
      line-height: 1.2;
    }
    .ctg-subtitle {
      font-size: 0.82rem;
      color: #64748b;
    }
    .ctg-panel {
      background: #0a0f1e;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 14px;
    }
    .ctg-panel-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 10px;
    }
    .ctg-textarea {
      width: 100%;
      height: 140px;
      background: #030712;
      border: 1px solid #1e293b;
      border-radius: 10px;
      color: #e2e8f0;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 12.5px;
      padding: 12px;
      resize: vertical;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
      line-height: 1.6;
    }
    .ctg-textarea:focus {
      border-color: #7c3aed;
      box-shadow: 0 0 0 2px #7c3aed22;
    }
    .ctg-examples-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .ctg-example-label {
      font-size: 11px;
      color: #64748b;
      display: flex;
      align-items: center;
      margin-right: 4px;
    }
    .ctg-example-btn {
      padding: 5px 12px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 20px;
      color: #94a3b8;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .ctg-example-btn:hover {
      border-color: #7c3aed;
      color: #c4b5fd;
      background: #1e0a3c;
    }
    .ctg-actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 14px;
      align-items: center;
    }
    .ctg-btn {
      padding: 9px 18px;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .ctg-btn-primary {
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: #ffffff;
    }
    .ctg-btn-primary:hover {
      opacity: 0.9;
      transform: scale(1.03);
      box-shadow: 0 4px 18px #7c3aed55;
    }
    .ctg-btn-secondary {
      background: #0f172a;
      border: 1px solid #334155;
      color: #94a3b8;
    }
    .ctg-btn-secondary:hover {
      border-color: #7c3aed;
      color: #c4b5fd;
      background: #1e0a3c;
    }
    .ctg-btn-danger {
      background: #1a0533;
      border: 1px solid #7c3aed;
      color: #c4b5fd;
    }
    .ctg-btn-danger:hover {
      background: #2d1060;
      box-shadow: 0 0 12px #7c3aed55;
    }
    .ctg-btn-share {
      background: #0a1f1a;
      border: 1px solid #10b981;
      color: #34d399;
    }
    .ctg-btn-share:hover {
      background: #052e1c;
      box-shadow: 0 0 12px #10b98155;
    }
    .ctg-hud {
      display: flex;
      gap: 12px;
      margin-bottom: 14px;
    }
    .ctg-hud-item {
      flex: 1;
      background: #0a0f1e;
      border: 1px solid #1e293b;
      border-radius: 10px;
      padding: 10px 14px;
      text-align: center;
    }
    .ctg-hud-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #475569;
      margin-bottom: 4px;
    }
    .ctg-hud-value {
      font-size: 1.3rem;
      font-weight: 700;
      color: #7c3aed;
      line-height: 1;
    }
    .ctg-hud-value.green { color: #10b981; }
    .ctg-hud-value.cyan  { color: #06b6d4; }
    .ctg-hud-value.gold  { color: #f59e0b; }
    .ctg-game-area {
      background: #0a0f1e;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 14px;
      overflow-x: auto;
    }
    .ctg-code-pre {
      margin: 0;
      padding: 0;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.9;
      white-space: pre-wrap;
      word-break: break-word;
      color: #e2e8f0;
    }
    .ctg-code-display {
      font-family: inherit;
      font-size: inherit;
    }
    .ctg-blank {
      display: inline-block;
      min-width: 60px;
      height: 24px;
      border: 2px dashed #7c3aed;
      border-radius: 6px;
      background: #1e0a3c;
      cursor: pointer;
      vertical-align: middle;
      text-align: center;
      line-height: 20px;
      color: #a78bfa;
      font-size: 13px;
      transition: all 0.2s;
      padding: 0 6px;
      font-family: 'Fira Code', monospace;
    }
    .ctg-blank:hover {
      border-color: #a78bfa;
      background: #2d1060;
    }
    .ctg-blank-selected {
      border-color: #06b6d4 !important;
      background: #0e2a38 !important;
      box-shadow: 0 0 10px #06b6d440;
    }
    .ctg-blank-correct {
      display: inline-block;
      border: 2px solid #10b981;
      border-radius: 6px;
      background: #052e1c;
      color: #34d399;
      vertical-align: middle;
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      padding: 0 8px;
      height: 24px;
      line-height: 20px;
      box-shadow: 0 0 8px #10b98140;
    }
    .ctg-blank-wrong {
      border-color: #ef4444 !important;
      background: #2d0f0f !important;
      color: #f87171 !important;
      animation: ctgShake 0.4s;
    }
    @keyframes ctgShake {
      0%,100% { transform: translateX(0); }
      25%      { transform: translateX(-5px); }
      75%      { transform: translateX(5px); }
    }
    .ctg-word-bank-section {
      background: #06090f;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .ctg-word-bank-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 12px;
    }
    .ctg-word-bank {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      min-height: 40px;
    }
    .ctg-chip {
      display: inline-flex;
      align-items: center;
      padding: 5px 14px;
      background: #1e0a3c;
      border: 1px solid #7c3aed;
      border-radius: 20px;
      color: #c4b5fd;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .ctg-chip:hover {
      background: #2d1060;
      border-color: #a78bfa;
      box-shadow: 0 0 12px #7c3aed50;
      transform: translateY(-2px);
    }
    .ctg-chip-selected {
      background: #312e81 !important;
      border-color: #06b6d4 !important;
      box-shadow: 0 0 12px #06b6d450 !important;
    }
    .ctg-chip-dragging {
      opacity: 0.5;
    }
    .ctg-feedback {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      opacity: 0;
      transform: translateY(-8px);
      transition: all 0.25s;
      pointer-events: none;
      z-index: 9999;
      max-width: 280px;
    }
    .ctg-feedback-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .ctg-feedback-success {
      background: #052e1c;
      border: 1px solid #10b981;
      color: #34d399;
    }
    .ctg-feedback-error {
      background: #2d0f0f;
      border: 1px solid #ef4444;
      color: #f87171;
    }
    .ctg-result-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    .ctg-result-card {
      background: #0f172a;
      border: 1px solid #7c3aed;
      border-radius: 20px;
      padding: 36px 32px;
      text-align: center;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 0 60px #7c3aed30;
    }
    .ctg-result-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #a78bfa;
      margin-bottom: 20px;
    }
    .ctg-result-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #1e293b;
      font-size: 14px;
      color: #94a3b8;
    }
    .ctg-result-row:last-of-type { border: none; }
    .ctg-result-val {
      font-weight: 700;
      color: #06b6d4;
    }
    .ctg-result-stars {
      font-size: 2rem;
      margin: 18px 0 8px;
    }
    .ctg-instructions {
      background: #050d1a;
      border: 1px solid #0f2744;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .ctg-instructions-title {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .ctg-instructions ol {
      padding-left: 18px;
      margin: 0;
    }
    .ctg-instructions li {
      font-size: 12px;
      color: #475569;
      margin-bottom: 4px;
      line-height: 1.5;
    }
    /* Syntax highlighting in game */
    .ctg-type-keyword    { color: #c084fc; }
    .ctg-type-builtin    { color: #67e8f9; }
    .ctg-type-string, .ctg-type-template { color: #86efac; }
    .ctg-type-number     { color: #fbbf24; }
    .ctg-type-comment, .ctg-type-comment-block, .ctg-type-comment-line { color: #374151; font-style: italic; }
    .ctg-type-tag-open   { color: #f472b6; }
    .ctg-type-tag-close  { color: #94a3b8; }
    .ctg-type-attr-name  { color: #93c5fd; }
    .ctg-type-attr-value { color: #86efac; }
    .ctg-type-prop       { color: #67e8f9; }
    .ctg-type-selector   { color: #f472b6; }
    .ctg-type-at-rule    { color: #c084fc; }
    .ctg-type-css-value  { color: #fde68a; }
    .ctg-type-colon      { color: #94a3b8; }
    .ctg-type-semicolon  { color: #94a3b8; }
    .ctg-type-brace      { color: #94a3b8; }
    .ctg-type-operator   { color: #94a3b8; }
    .ctg-type-punctuation{ color: #64748b; }
    .ctg-type-identifier { color: #e2e8f0; }
    .ctg-type-text       { color: #cbd5e1; }
    .ctg-empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #334155;
    }
    .ctg-empty-icon {
      font-size: 3rem;
      margin-bottom: 12px;
      display: block;
    }
    .ctg-mode-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      margin-left: 8px;
    }
    .ctg-mode-normal {
      background: #172554;
      color: #60a5fa;
      border: 1px solid #1d4ed8;
    }
    .ctg-mode-hard {
      background: #3b0764;
      color: #e879f9;
      border: 1px solid #a21caf;
    }
  `;

  // ─── Main Render ─────────────────────────────────────────────────────────────
  function renderCodeTutorialGame() {
    const container = document.getElementById('left-body');
    if (!container) return;

    // Inject styles
    let styleEl = document.getElementById('ctg-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'ctg-styles';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = CSS;

    container.innerHTML = `
      <div id="ctg-root">
        <div class="ctg-header">
          <div class="ctg-title">${t('title')}</div>
          <div class="ctg-subtitle">${t('subtitle')}</div>
        </div>

        <!-- Input Panel -->
        <div class="ctg-panel">
          <div class="ctg-panel-label">${t('pasteLabel')}</div>
          <textarea id="ctg-code-input" class="ctg-textarea" placeholder="${t('placeholder')}" spellcheck="false"></textarea>
          <div class="ctg-examples-row">
            <span class="ctg-example-label">${t('examplesLabel')}</span>
            <button class="ctg-example-btn" id="ex-cssflexbox">${t('exCssFlexbox')}</button>
            <button class="ctg-example-btn" id="ex-jsfetch">${t('exJsFetch')}</button>
            <button class="ctg-example-btn" id="ex-htmlform">${t('exHtmlForm')}</button>
            <button class="ctg-example-btn" id="ex-cssanim">${t('exCssAnim')}</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="ctg-actions-row">
          <button class="ctg-btn ctg-btn-primary" id="ctg-generate-btn">${t('generateBtn')}</button>
          <button class="ctg-btn ctg-btn-secondary" id="ctg-new-game-btn" style="display:none">${t('newGameBtn')}</button>
          <button class="ctg-btn ctg-btn-danger" id="ctg-harder-btn">${t('harderBtn')}</button>
          <button class="ctg-btn ctg-btn-share" id="ctg-share-btn" style="display:none">${t('shareBtn')}</button>
          <button class="ctg-btn ctg-btn-secondary" id="ctg-load-editor-btn">${t('loadEditorBtn')}</button>
        </div>

        <!-- HUD -->
        <div class="ctg-hud" id="ctg-hud" style="display:none">
          <div class="ctg-hud-item">
            <div class="ctg-hud-label">${t('scoreLabel')}</div>
            <div class="ctg-hud-value green" id="ctg-score-value">0/0</div>
          </div>
          <div class="ctg-hud-item">
            <div class="ctg-hud-label">${t('timerLabel')}</div>
            <div class="ctg-hud-value cyan" id="ctg-timer-value">0s</div>
          </div>
          <div class="ctg-hud-item">
            <div class="ctg-hud-label">${t('streakLabel')}</div>
            <div class="ctg-hud-value gold" id="ctg-streak-value">×0</div>
          </div>
        </div>

        <!-- Game Board -->
        <div class="ctg-game-area" id="ctg-game-area">
          <div class="ctg-empty-state">
            <span class="ctg-empty-icon">🎮</span>
            <div>${lang() === 'fr' ? 'Collez du code et cliquez Générer le Jeu' : 'Paste code above and click Generate Game'}</div>
          </div>
        </div>

        <!-- Word Bank -->
        <div class="ctg-word-bank-section" id="ctg-bank-section" style="display:none">
          <div class="ctg-word-bank-label" id="ctg-bank-label">${t('wordBankLabel')}</div>
          <div class="ctg-word-bank" id="ctg-word-bank"></div>
        </div>

        <!-- Instructions -->
        <div class="ctg-instructions">
          <div class="ctg-instructions-title">📖 ${t('instructionsTitle')}</div>
          <ol>
            <li>${t('inst1')}</li>
            <li>${t('inst2')}</li>
            <li>${t('inst3')}</li>
            <li>${t('inst4')}</li>
            <li>${t('inst5')}</li>
            <li>${t('inst6')}</li>
          </ol>
        </div>

        <!-- Feedback Toast -->
        <div class="ctg-feedback" id="ctg-feedback"></div>

        <!-- Result Modal -->
        <div class="ctg-result-overlay" id="ctg-result-modal">
          <div class="ctg-result-card">
            <div class="ctg-result-title">${t('resultTitle')}</div>
            <div class="ctg-result-row">
              <span>${t('resultScore')}</span>
              <span class="ctg-result-val" id="ctg-result-score">—</span>
            </div>
            <div class="ctg-result-row">
              <span>${t('resultTime')}</span>
              <span class="ctg-result-val" id="ctg-result-time">—</span>
            </div>
            <div class="ctg-result-row">
              <span>${t('streakLabel')} max</span>
              <span class="ctg-result-val" id="ctg-result-streak">—</span>
            </div>
            <div class="ctg-result-stars" id="ctg-result-stars">☆☆☆</div>
            <button class="ctg-btn ctg-btn-primary" id="ctg-play-again-btn">${t('playAgainBtn')}</button>
          </div>
        </div>
      </div>
    `;

    // ── Wire up events ──────────────────────────────────────────────────────────

    // Example buttons
    document.getElementById('ex-cssflexbox').addEventListener('click', () => {
      document.getElementById('ctg-code-input').value = EXAMPLES.cssFlexbox;
    });
    document.getElementById('ex-jsfetch').addEventListener('click', () => {
      document.getElementById('ctg-code-input').value = EXAMPLES.jsFetch;
    });
    document.getElementById('ex-htmlform').addEventListener('click', () => {
      document.getElementById('ctg-code-input').value = EXAMPLES.htmlForm;
    });
    document.getElementById('ex-cssanim').addEventListener('click', () => {
      document.getElementById('ctg-code-input').value = EXAMPLES.cssAnimation;
    });

    // Hard mode toggle
    let hardMode = false;
    document.getElementById('ctg-harder-btn').addEventListener('click', function() {
      hardMode = !hardMode;
      if (hardMode) {
        this.textContent = t('normalBtn');
        this.classList.add('ctg-btn-primary');
        this.classList.remove('ctg-btn-danger');
      } else {
        this.textContent = t('harderBtn');
        this.classList.remove('ctg-btn-primary');
        this.classList.add('ctg-btn-danger');
      }
      gameState.hardMode = hardMode;
    });

    // Generate Game
    document.getElementById('ctg-generate-btn').addEventListener('click', () => {
      const code = document.getElementById('ctg-code-input').value.trim();
      if (!code) {
        if (window.showToast) window.showToast(t('toastNoCode'));
        return;
      }
      startNewGame(code, hardMode);
    });

    // New Game (same code, new blanks)
    document.getElementById('ctg-new-game-btn').addEventListener('click', () => {
      const code = gameState.originalCode;
      if (!code) return;
      startNewGame(code, hardMode);
    });

    // Share Game
    document.getElementById('ctg-share-btn').addEventListener('click', () => {
      if (!gameState._gen) return;
      const html = buildStandaloneGame();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(html).then(() => {
          if (window.showToast) window.showToast(t('toastShared'));
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = html;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (window.showToast) window.showToast(t('toastShared'));
      }
    });

    // Load Full Standalone App
    document.getElementById('ctg-load-editor-btn').addEventListener('click', () => {
      let template;
      if (gameState._gen) {
        template = buildStandaloneGame();
      } else {
        // Generate a fresh game from CSS Flexbox example
        const tmpCode = EXAMPLES.cssFlexbox;
        const tmpGen = generateGame(tmpCode, false);
        if (tmpGen) {
          gameState._gen = tmpGen;
          gameState.originalCode = tmpCode;
        }
        template = buildStandaloneGame();
      }
      if (window.editor && typeof window.editor.setValue === 'function') {
        window.editor.setValue(template);
      }
      if (typeof window.runPreview === 'function') {
        window.runPreview();
      }
    });

    // Play Again (from result modal)
    document.getElementById('ctg-play-again-btn').addEventListener('click', () => {
      document.getElementById('ctg-result-modal').style.display = 'none';
      const code = gameState.originalCode;
      if (code) startNewGame(code, hardMode);
    });

    // Close modal on backdrop click
    document.getElementById('ctg-result-modal').addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });

    if (window.showToast) window.showToast(t('toastInit'));
  }

  // ─── Start New Game ──────────────────────────────────────────────────────────
  function startNewGame(code, hard) {
    stopTimer();
    gameState.finished = false;
    gameState.originalCode = code;
    gameState.hardMode = hard;

    const gen = generateGame(code, hard);
    if (!gen || gen.blanks.length === 0) {
      if (window.showToast) window.showToast('⚠️ ' + (lang() === 'fr' ? 'Pas assez de tokens détectés.' : 'Not enough tokens detected.'));
      return;
    }

    gameState._gen = gen;
    gameState.wordBank = gen.wordBank;
    gameState.blanks = gen.blanks;
    gameState.score = 0;
    gameState.total = gen.blanks.length;
    gameState.streak = 0;
    gameState.maxStreak = 0;
    gameState.selectedBlankId = null;
    gameState.selectedChipId = null;
    gameState.selectedChipValue = null;

    // Show game area
    const gameArea = document.getElementById('ctg-game-area');
    if (gameArea) {
      gameArea.innerHTML = '<div id="ctg-game-board"></div>';
    }

    // Show HUD
    const hud = document.getElementById('ctg-hud');
    if (hud) hud.style.display = 'flex';

    // Show bank section
    const bankSection = document.getElementById('ctg-bank-section');
    if (bankSection) bankSection.style.display = 'block';

    // Show action buttons
    const newBtn = document.getElementById('ctg-new-game-btn');
    if (newBtn) newBtn.style.display = 'inline-block';
    const shareBtn = document.getElementById('ctg-share-btn');
    if (shareBtn) shareBtn.style.display = 'inline-block';

    renderGameBoard();
    renderWordBank();
    updateScoreDisplay();
    startTimer();

    if (window.showToast) window.showToast(t('toastGenerated'));
  }

  // ─── Toast ───────────────────────────────────────────────────────────────────
  if (window.showToast) {
    // Delayed init toast so it fires after module loads
    setTimeout(() => {
      window.showToast(t('toastInit'));
    }, 300);
  }

})();
