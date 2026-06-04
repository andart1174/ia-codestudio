(function() {
  'use strict';

  // Helper for translations
  function gl() {
    return window.appLang || 'en';
  }

  /* ─────────────────────────────────────────────
     NLP ANALYSIS & DESIGN SYSTEM GENERATION
  ───────────────────────────────────────────── */

  const KEYWORDS = {
    environments: {
      ocean: ['ocean', 'sea', 'water', 'deep', 'submarine', 'underwater', 'abyss', 'tide', 'wave'],
      forest: ['forest', 'woods', 'trees', 'nature', 'jungle', 'leaves', 'moss', 'pine'],
      city: ['city', 'cyberpunk', 'tokyo', 'neon', 'streets', 'urban', 'metropolis', 'alleys'],
      space: ['space', 'stars', 'galaxy', 'universe', 'orbit', 'spaceship', 'void', 'cosmos'],
      desert: ['desert', 'sand', 'dunes', 'sun', 'dry', 'arid', 'sahara', 'canyon'],
      mountains: ['mountain', 'snow', 'peak', 'rock', 'climb', 'summit', 'alpine']
    },
    times: {
      night: ['night', 'midnight', 'dark', 'stars', 'moon', 'late'],
      day: ['day', 'noon', 'sun', 'bright', 'afternoon', 'light'],
      dawn: ['dawn', 'morning', 'sunrise', 'early', 'waking'],
      dusk: ['dusk', 'sunset', 'evening', 'twilight', 'golden hour']
    },
    emotions: {
      peaceful: ['peaceful', 'calm', 'quiet', 'serene', 'tranquil', 'relaxing', 'soothing'],
      exciting: ['exciting', 'fast', 'adrenaline', 'action', 'intense', 'rush', 'thrill'],
      mysterious: ['mysterious', 'secret', 'hidden', 'shadow', 'unknown', 'enigma', 'fog'],
      melancholic: ['melancholic', 'sad', 'nostalgic', 'rain', 'tears', 'alone', 'distant', 'memory'],
      joyful: ['joyful', 'happy', 'smile', 'laugh', 'party', 'fun', 'celebrate']
    },
    temperatures: {
      cold: ['cold', 'freezing', 'ice', 'snow', 'chill', 'frost', 'winter', 'breeze'],
      warm: ['warm', 'cozy', 'fire', 'blanket', 'hearth', 'hug'],
      hot: ['hot', 'burning', 'flame', 'summer', 'sweat', 'blaze', 'heat']
    },
    motions: {
      static: ['static', 'still', 'frozen', 'unmoving', 'paused', 'stopped'],
      slow: ['slow', 'drifting', 'floating', 'gliding', 'crawling'],
      fast: ['fast', 'running', 'speeding', 'dashing', 'flying', 'racing']
    }
  };

  const DEFAULT_SCORE = { environment: 'ocean', time: 'night', emotion: 'mysterious', temperature: 'cold', motion: 'slow' };

  function analyzeDream(text) {
    const t = text.toLowerCase();
    const result = { ...DEFAULT_SCORE };
    
    // Find best match for each category
    for (const category in KEYWORDS) {
      let bestMatch = null;
      let highestScore = 0;
      
      for (const key in KEYWORDS[category]) {
        let score = 0;
        KEYWORDS[category][key].forEach(word => {
          const regex = new RegExp('\\b' + word + '\\b', 'gi');
          const matches = t.match(regex);
          if (matches) score += matches.length;
        });
        if (score > highestScore) {
          highestScore = score;
          bestMatch = key;
        }
      }
      
      if (bestMatch) {
        // Strip 's' from 'environments' to get 'environment' etc
        const catName = category.replace(/s$/, '');
        result[catName] = bestMatch;
      }
    }
    return result;
  }

  function generateDesignSystem(analysis) {
    // Base palettes based on environment + time
    const palettes = {
      ocean_night: { bg: '#020617', surface: '#0f172a', primary: '#38bdf8', secondary: '#818cf8', accent: '#c084fc', text: '#f8fafc', font: '"Inter", sans-serif' },
      ocean_day: { bg: '#e0f2fe', surface: '#bae6fd', primary: '#0ea5e9', secondary: '#0284c7', accent: '#0369a1', text: '#082f49', font: '"Inter", sans-serif' },
      forest_night: { bg: '#064e3b', surface: '#065f46', primary: '#10b981', secondary: '#34d399', accent: '#6ee7b7', text: '#ecfdf5', font: '"Merriweather", serif' },
      forest_day: { bg: '#d1fae5', surface: '#a7f3d0', primary: '#059669', secondary: '#047857', accent: '#064e3b', text: '#022c22', font: '"Merriweather", serif' },
      city_night: { bg: '#09090b', surface: '#18181b', primary: '#ec4899', secondary: '#8b5cf6', accent: '#06b6d4', text: '#fafafa', font: '"Space Grotesk", sans-serif' },
      city_day: { bg: '#f4f4f5', surface: '#e4e4e7', primary: '#f43f5e', secondary: '#3b82f6', accent: '#10b981', text: '#18181b', font: '"Space Grotesk", sans-serif' },
      space_night: { bg: '#000000', surface: '#111827', primary: '#a855f7', secondary: '#d946ef', accent: '#3b82f6', text: '#ffffff', font: '"Orbitron", sans-serif' },
      desert_day: { bg: '#fef3c7', surface: '#fde68a', primary: '#d97706', secondary: '#b45309', accent: '#ea580c', text: '#451a03', font: '"Playfair Display", serif' },
      mountains_cold: { bg: '#f8fafc', surface: '#f1f5f9', primary: '#64748b', secondary: '#94a3b8', accent: '#38bdf8', text: '#0f172a', font: '"Montserrat", sans-serif' }
    };

    let key = analysis.environment + '_' + analysis.time;
    if (!palettes[key]) {
      // Fallback
      if (analysis.environment === 'mountains') key = 'mountains_cold';
      else if (analysis.environment === 'desert') key = 'desert_day';
      else if (analysis.environment === 'space') key = 'space_night';
      else key = 'ocean_night';
    }
    
    let ds = { ...palettes[key] };
    
    // Adjust for emotion
    if (analysis.emotion === 'exciting') { ds.primary = '#ef4444'; ds.font = '"Oswald", sans-serif'; }
    if (analysis.emotion === 'melancholic') { ds.primary = '#64748b'; ds.secondary = '#475569'; }
    
    // Adjust for temperature
    if (analysis.temperature === 'hot') { ds.accent = '#f97316'; }
    if (analysis.temperature === 'cold' && !key.includes('mountains')) { ds.accent = '#7dd3fc'; }
    
    // Determine animation speed
    let speed = '2s';
    if (analysis.motion === 'fast') speed = '0.5s';
    if (analysis.motion === 'static') speed = '0s';
    if (analysis.motion === 'slow') speed = '4s';
    
    ds.animationSpeed = speed;
    
    // Determine background effect (CSS)
    if (analysis.environment === 'ocean') {
      ds.bgEffect = `background: linear-gradient(180deg, ${ds.bg} 0%, ${ds.surface} 100%);`;
    } else if (analysis.environment === 'city' && analysis.time === 'night') {
      ds.bgEffect = `background: radial-gradient(circle at 50% 50%, ${ds.surface} 0%, ${ds.bg} 100%); box-shadow: inset 0 0 100px ${ds.primary}33;`;
    } else {
      ds.bgEffect = `background-color: ${ds.bg};`;
    }

    return ds;
  }

  function generateHtml(ds, text) {
    return `<div style="font-family: ${ds.font.split(',')[0].replace(/"/g,'')}, system-ui; ${ds.bgEffect} min-height: 400px; padding: 40px; color: ${ds.text}; border-radius: 12px; overflow: hidden; position: relative; transition: all 1s ease;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center; position: relative; z-index: 10;">
    <h1 style="font-size: 42px; font-weight: 800; margin-bottom: 20px; color: ${ds.primary}; text-shadow: 0 4px 12px ${ds.primary}44; line-height: 1.2;">
      Dream Manifestation
    </h1>
    <p style="font-size: 18px; line-height: 1.8; opacity: 0.9; margin-bottom: 30px; border-left: 4px solid ${ds.accent}; padding-left: 20px; text-align: left;">
      "${text}"
    </p>
    <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 40px;">
      <button style="background: ${ds.primary}; color: ${ds.bg}; border: none; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 14px ${ds.primary}66; transition: all 0.3s;">Explore Reality</button>
      <button style="background: transparent; color: ${ds.text}; border: 2px solid ${ds.secondary}; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s;">Wake Up</button>
    </div>
    <div style="display: flex; justify-content: center; gap: 8px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${ds.primary};"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${ds.secondary};"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${ds.accent};"></div>
    </div>
  </div>
</div>`;
  }

  function generateFullPageHtml(ds, text, analysis) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dream UI: ${analysis.environment}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Merriweather:wght@400;700&family=Space+Grotesk:wght@400;700&family=Orbitron:wght@400;700&family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Oswald:wght@400;700&display=swap');
    
    :root {
      --bg: ${ds.bg};
      --surface: ${ds.surface};
      --primary: ${ds.primary};
      --secondary: ${ds.secondary};
      --accent: ${ds.accent};
      --text: ${ds.text};
      --anim-speed: ${ds.animationSpeed};
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: ${ds.font};
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      ${ds.bgEffect}
    }
    
    .container {
      max-width: 800px;
      background: var(--surface);
      padding: 60px;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px var(--secondary)44;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .container::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    }
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      color: var(--primary);
      text-shadow: 0 4px 20px var(--primary)66;
    }
    
    .dream-text {
      font-size: 1.25rem;
      line-height: 1.8;
      margin-bottom: 2.5rem;
      padding: 20px 40px;
      border-left: 4px solid var(--accent);
      border-right: 4px solid var(--accent);
      background: rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    
    .tags {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }
    
    .tag {
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .tag.env { background: var(--primary)22; color: var(--primary); border: 1px solid var(--primary); }
    .tag.time { background: var(--secondary)22; color: var(--secondary); border: 1px solid var(--secondary); }
    .tag.emo { background: var(--accent)22; color: var(--accent); border: 1px solid var(--accent); }
    
    .buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
    }
    
    button {
      padding: 16px 40px;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: bold;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    button.primary {
      background: var(--primary);
      color: var(--bg);
      border: none;
      box-shadow: 0 4px 15px var(--primary)66;
    }
    
    button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px var(--primary)88;
    }
    
    button.secondary {
      background: transparent;
      color: var(--text);
      border: 2px solid var(--secondary);
    }
    
    button.secondary:hover {
      background: var(--secondary)22;
    }
    
    @keyframes breathe {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    .animated {
      animation: breathe var(--anim-speed) infinite ease-in-out;
    }
  </style>
</head>
<body>
  <div class="container animated">
    <h1>Dream Manifestation</h1>
    <div class="tags">
      <span class="tag env">${analysis.environment}</span>
      <span class="tag time">${analysis.time}</span>
      <span class="tag emo">${analysis.emotion}</span>
      <span class="tag env">${analysis.temperature}</span>
      <span class="tag time">${analysis.motion}</span>
    </div>
    <div class="dream-text">
      "${text}"
    </div>
    <div class="buttons">
      <button class="primary">Explore Reality</button>
      <button class="secondary">Wake Up</button>
    </div>
  </div>
</body>
</html>`;
  }

  /* ─────────────────────────────────────────────
     STANDALONE TEMPLATE FOR EDITOR
  ───────────────────────────────────────────── */

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🧠 Dream UI Interpreter</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020617; color: #f8fafc; font-family: 'Inter', sans-serif; padding: 40px; }
  .wrapper { max-width: 900px; margin: 0 auto; }
  h1 { font-size: 32px; font-weight: 800; color: #d8b4fe; margin-bottom: 8px; }
  p.sub { color: #94a3b8; margin-bottom: 24px; }
  textarea { width: 100%; height: 120px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 16px; color: #f8fafc; font-family: inherit; font-size: 16px; resize: none; outline: none; margin-bottom: 16px; }
  textarea:focus { border-color: #d8b4fe; box-shadow: 0 0 0 2px rgba(216,180,254,0.2); }
  .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .chip { background: #1e293b; color: #cbd5e1; padding: 8px 16px; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
  .chip:hover { background: #334155; color: #fff; }
  button { background: linear-gradient(135deg, #a855f7, #ec4899); color: #fff; border: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; margin-bottom: 32px; }
  .analysis { background: #0f172a; border: 1px solid #1e3a5f; padding: 20px; border-radius: 12px; margin-bottom: 24px; display: none; }
  .analysis-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; }
  .a-item span { display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
  .a-item strong { color: #e879f9; font-size: 16px; }
  #preview { display: none; margin-top: 24px; }
</style>
</head>
<body>
  <div class="wrapper">
    <h1>🧠 Dream UI Interpreter</h1>
    <p class="sub">Describe a feeling, vision, or dream, and AI will generate a design system for it.</p>
    
    <div class="chips">
      <div class="chip">I want to feel like inside a submarine at 3am in the deep ocean</div>
      <div class="chip">A bonfire in a snowy forest at midnight with northern lights</div>
      <div class="chip">The feeling of running through a cyberpunk Tokyo in the rain</div>
      <div class="chip">A museum from the future where art is made of light</div>
    </div>
    
    <textarea id="dreamInput" placeholder="Type your vision here..."></textarea>
    <button id="interpretBtn">Interpret & Generate UI</button>
    
    <div class="analysis" id="analysis">
      <div class="analysis-grid" id="analysisGrid"></div>
    </div>
    
    <div id="preview"></div>
  </div>

  <${'script'}>
    const KEYWORDS = ${JSON.stringify(KEYWORDS)};
    
    function analyze(t) {
      t = t.toLowerCase();
      let res = { environment: 'ocean', time: 'night', emotion: 'mysterious', temperature: 'cold', motion: 'slow' };
      for (const cat in KEYWORDS) {
        let best = null, high = 0;
        for (const k in KEYWORDS[cat]) {
          let score = 0;
          KEYWORDS[cat][k].forEach(w => {
            if (new RegExp('\\\\b' + w + '\\\\b', 'gi').test(t)) score++;
          });
          if (score > high) { high = score; best = k; }
        }
        if (best) res[cat.replace(/s$/, '')] = best;
      }
      return res;
    }

    document.querySelectorAll('.chip').forEach(c => {
      c.onclick = () => { document.getElementById('dreamInput').value = c.textContent; };
    });

    document.getElementById('interpretBtn').onclick = () => {
      const text = document.getElementById('dreamInput').value || 'A dark silent room';
      const analysis = analyze(text);
      
      const grid = document.getElementById('analysisGrid');
      grid.innerHTML = Object.entries(analysis).map(([k, v]) => 
        '<div class="a-item"><span>'+k+'</span><strong>'+v+'</strong></div>'
      ).join('');
      document.getElementById('analysis').style.display = 'block';
      
      document.getElementById('preview').style.display = 'block';
      // For standalone demo we just show a mockup
      document.getElementById('preview').innerHTML = '<div style="padding:40px;background:#18181b;color:#e879f9;border-radius:12px;text-align:center;font-family:sans-serif;border:1px solid #3f3f46;"><h2>Generated Design System Applied!</h2><p>In the full studio this renders the complete UI component.</p></div>';
    };
  </${'script'}>
</body>
</html>`;

  /* ─────────────────────────────────────────────
     UI COMPONENT RENDERER
  ───────────────────────────────────────────── */

  let currentAnalysis = null;
  let currentDS = null;
  let currentText = "";

  function renderModule() {
    const isFr = gl() === 'fr';
    const ui = document.createElement('div');
    ui.id = 'dreamui-root';
    ui.innerHTML = `
      <style>
        #dreamui-root {
          font-family: 'Inter', system-ui, sans-serif;
          background: #020617;
          min-height: 100%;
          padding: 24px;
          color: #e2e8f0;
          box-sizing: border-box;
        }
        #dreamui-root * { box-sizing: border-box; }
        .dui-title {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 800;
          color: #d8b4fe;
          margin-bottom: 8px;
        }
        .dui-sub {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .dui-textarea {
          width: 100%;
          height: 120px;
          background: #0f172a;
          border: 1px solid #1e3a5f;
          border-radius: 12px;
          padding: 16px;
          color: #f8fafc;
          font-family: inherit;
          font-size: 15px;
          resize: vertical;
          outline: none;
          margin-bottom: 16px;
          transition: all 0.2s;
        }
        .dui-textarea:focus {
          border-color: #d8b4fe;
          box-shadow: 0 0 0 2px rgba(216,180,254,0.2);
        }
        .dui-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .dui-chip {
          background: #1e293b;
          color: #cbd5e1;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 12px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .dui-chip:hover {
          background: #334155;
          color: #fff;
          border-color: #475569;
        }
        .dui-btn {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(168,85,247,0.3);
          transition: all 0.2s;
        }
        .dui-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(168,85,247,0.4);
        }
        .dui-btn-sec {
          background: #1e293b;
          color: #f8fafc;
          border: 1px solid #334155;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dui-btn-sec:hover { background: #334155; }
        
        .dui-analysis {
          margin-top: 32px;
          background: #0f172a;
          border: 1px solid #1e3a5f;
          border-radius: 12px;
          padding: 24px;
          display: none;
        }
        .dui-analysis.active { display: block; }
        .dui-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .dui-a-item {
          background: #020617;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #1e293b;
          text-align: center;
        }
        .dui-a-item span {
          display: block;
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .dui-a-item strong {
          color: #e879f9;
          font-size: 16px;
          text-transform: capitalize;
        }
        
        .dui-preview { margin-top: 24px; }
        .dui-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
      </style>
      
      <div class="dui-title">🌙 ${isFr ? 'Interpréteur de Rêves UI' : 'Dream UI Interpreter'}</div>
      <div class="dui-sub">${isFr ? 'Décrivez une vision et l\'IA générera un système de design.' : 'Describe a feeling or vision, and AI will generate a design system for it.'}</div>
      
      <div class="dui-chips">
        <div class="dui-chip">Inside a submarine at 3am in the deep ocean</div>
        <div class="dui-chip">A bonfire in a snowy forest with northern lights</div>
        <div class="dui-chip">Running through cyberpunk Tokyo in the rain</div>
        <div class="dui-chip">A museum from the future made of light</div>
      </div>
      
      <textarea id="duiText" class="dui-textarea" placeholder="${isFr ? 'Tapez votre vision ici...' : 'Type your vision here...'}"></textarea>
      
      <button class="dui-btn" id="duiAnalyzeBtn">
        <span>✨</span> ${isFr ? 'Interpréter & Générer' : 'Interpret & Generate UI'}
      </button>
      
      <div class="dui-analysis" id="duiAnalysisPanel">
        <div class="dui-grid" id="duiAnalysisGrid"></div>
        <div class="dui-preview" id="duiPreviewArea"></div>
        
        <div class="dui-actions">
          <button class="dui-btn-sec" id="duiGenPageBtn">📄 ${isFr ? 'Générer Page Complète' : 'Generate Full Page'}</button>
          <button class="dui-btn-sec" id="duiLoadBtn">🚀 ${isFr ? 'Charger dans Éditeur' : 'Load to Editor'}</button>
          <button class="dui-btn-sec" id="duiDemoBtn">🔥 ${isFr ? 'Démo Autonome' : 'Standalone App'}</button>
        </div>
      </div>
    `;

    // Event Listeners
    setTimeout(() => {
      const chips = ui.querySelectorAll('.dui-chip');
      chips.forEach(c => {
        c.addEventListener('click', () => {
          ui.querySelector('#duiText').value = c.textContent;
        });
      });

      ui.querySelector('#duiAnalyzeBtn').addEventListener('click', () => {
        const text = ui.querySelector('#duiText').value.trim() || 'A dark void';
        currentText = text;
        currentAnalysis = analyzeDream(text);
        currentDS = generateDesignSystem(currentAnalysis);
        
        // Update Analysis Grid
        const grid = ui.querySelector('#duiAnalysisGrid');
        grid.innerHTML = Object.entries(currentAnalysis).map(([k, v]) => 
          `<div class="dui-a-item"><span>${k}</span><strong>${v}</strong></div>`
        ).join('');
        
        // Update Preview
        ui.querySelector('#duiPreviewArea').innerHTML = generateHtml(currentDS, text);
        
        // Show panel
        ui.querySelector('#duiAnalysisPanel').classList.add('active');
      });

      ui.querySelector('#duiGenPageBtn').addEventListener('click', () => {
        if (!currentDS) return;
        const fullHtml = generateFullPageHtml(currentDS, currentText, currentAnalysis);
        if (window.editor) {
          window.editor.setValue(fullHtml);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast('✅ Full Page Generated!');
        }
      });

      ui.querySelector('#duiLoadBtn').addEventListener('click', () => {
        if (!currentDS) return;
        const html = generateHtml(currentDS, currentText);
        if (window.editor) {
          window.editor.setValue(html);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast('✅ Component Loaded!');
        }
      });

      ui.querySelector('#duiDemoBtn').addEventListener('click', () => {
        if (window.editor) {
          window.editor.setValue(STANDALONE_TEMPLATE);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast('✅ Standalone App Loaded!');
        }
      });
      
      if (window.showToast) window.showToast('✅ Dream UI initialized.');
    }, 0);

    return ui;
  }

  /* ─────────────────────────────────────────────
     TAB REGISTRATION
  ───────────────────────────────────────────── */

  if (window.renderTab) {
    const _orig = window.renderTab;
    window.renderTab = function(tabId) {
      if (typeof _orig === 'function') _orig(tabId);
      if (tabId === 'dreamui') {
        const lb = document.getElementById('left-body');
        if (lb) {
          lb.appendChild(renderModule());
        }
        if (window.editor) {
          window.editor.setValue(STANDALONE_TEMPLATE);
          if (window.runPreview) window.runPreview();
        }
      }
    };
  }

})();
