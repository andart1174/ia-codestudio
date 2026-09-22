
(function () {
  'use strict';

  /* =========================================================
   *  🫀 EMOTION-ADAPTIVE UI ENGINE
   *  Tab ID: emotionadaptive
   *  Author: IA Architecte Studio
   *  Real webcam motion/brightness variance analysis
   * ========================================================= */

  const TAB_ID = 'emotionadaptive';

  /* ── i18n ────────────────────────────────────────────────── */
  const T = {
    en: {
      title: '🫀 Emotion-Adaptive UI Engine',
      subtitle: 'Real-time webcam motion analysis → adaptive interface generation',
      enableCam: '📷 Enable Webcam',
      disableCam: '⏹ Disable Webcam',
      camBlocked: 'Camera access denied. Please allow camera in your browser settings.',
      camUnsupported: 'getUserMedia is not supported in this browser.',
      liveAnalysis: 'Live Analysis',
      detectedState: 'Detected State',
      confidence: 'Confidence',
      energyMeter: 'Energy Meter',
      motionLevel: 'Motion Level',
      frameVar: 'Frame Δ Variance',
      calmTime: 'Calm Duration',
      adaptivePreview: 'Adaptive UI Preview',
      exportCSS: '💾 Export Adaptive CSS',
      loadDemo: '🚀 Load Full Standalone App',
      states: {
        CALM: 'CALM',
        FOCUSED: 'FOCUSED',
        STRESSED: 'STRESSED',
        ENERGETIC: 'ENERGETIC',
        FATIGUED: 'FATIGUED',
        SCANNING: 'SCANNING…'
      },
      stateDesc: {
        CALM: 'Low motion, steady presence — soft, relaxed interface activated.',
        FOCUSED: 'Moderate motion, sustained attention — clean, productive interface.',
        STRESSED: 'High motion bursts — simplified, soothing interface to reduce cognitive load.',
        ENERGETIC: 'Rapid high-energy movement — vibrant, bold interface to match your pace.',
        FATIGUED: 'Very low motion for extended time — high-contrast, minimal interface.',
        SCANNING: 'Initializing sensor array…'
      },
      adaptivePalette: 'Adaptive Palette',
      animSpeed: 'Animation Speed',
      layoutDensity: 'Layout Density',
      fontSize: 'Typography Scale',
      copied: 'CSS copied to clipboard!',
      cssExported: 'Adaptive CSS exported to editor!',
      demoLoaded: 'Demo page loaded in editor!',
      permissionTitle: 'Webcam Permission Required',
      permissionDesc: 'This engine uses real-time video frame analysis (brightness & motion delta) to detect your current cognitive state. No video is recorded or transmitted.',
      howItWorks: 'How It Works',
      howItWorksDesc: 'Frame-to-frame pixel variance is computed each 100ms. High variance = fast movement (STRESSED/ENERGETIC). Near-zero variance = CALM/FOCUSED. Sustained near-zero for 5s+ triggers FATIGUED state.',
      preview: {
        heading: 'Adaptive Interface',
        body: 'This panel dynamically transforms based on your detected cognitive state. The color palette, animation speed, font size, and layout density all adapt in real time.',
        cta: 'Primary Action',
        secondary: 'Secondary',
        card1: 'Task Focus',
        card2: 'Quick Note',
        card3: 'Status'
      }
    },
    fr: {
      title: '🫀 Moteur UI Adaptatif aux Émotions',
      subtitle: 'Analyse webcam en temps réel → génération d\'interface adaptative',
      enableCam: '📷 Activer Webcam',
      disableCam: '⏹ Désactiver Webcam',
      camBlocked: 'Accès caméra refusé. Veuillez autoriser la caméra dans les paramètres du navigateur.',
      camUnsupported: 'getUserMedia n\'est pas supporté dans ce navigateur.',
      liveAnalysis: 'Analyse en Direct',
      detectedState: 'État Détecté',
      confidence: 'Confiance',
      energyMeter: 'Jauge d\'Énergie',
      motionLevel: 'Niveau de Mouvement',
      frameVar: 'Variance Δ Trame',
      calmTime: 'Durée de Calme',
      adaptivePreview: 'Aperçu UI Adaptatif',
      exportCSS: '💾 Exporter CSS Adaptatif',
      loadDemo: '🚀 Charger App Complète',
      states: {
        CALM: 'CALME',
        FOCUSED: 'CONCENTRÉ',
        STRESSED: 'STRESSÉ',
        ENERGETIC: 'ÉNERGIQUE',
        FATIGUED: 'FATIGUÉ',
        SCANNING: 'ANALYSE…'
      },
      stateDesc: {
        CALM: 'Faible mouvement, présence stable — interface douce et détendue activée.',
        FOCUSED: 'Mouvement modéré, attention soutenue — interface propre et productive.',
        STRESSED: 'Pics de mouvement élevés — interface simplifiée pour réduire la charge cognitive.',
        ENERGETIC: 'Mouvement rapide et énergique — interface vibrante et audacieuse.',
        FATIGUED: 'Très faible mouvement prolongé — interface haut contraste, minimaliste.',
        SCANNING: 'Initialisation du réseau de capteurs…'
      },
      adaptivePalette: 'Palette Adaptative',
      animSpeed: 'Vitesse d\'Animation',
      layoutDensity: 'Densité de Disposition',
      fontSize: 'Échelle Typographique',
      copied: 'CSS copié dans le presse-papiers!',
      cssExported: 'CSS adaptatif exporté dans l\'éditeur!',
      demoLoaded: 'Page démo chargée dans l\'éditeur!',
      permissionTitle: 'Permission Webcam Requise',
      permissionDesc: 'Ce moteur utilise l\'analyse de trames vidéo en temps réel (luminosité et delta de mouvement) pour détecter votre état cognitif. Aucune vidéo n\'est enregistrée ou transmise.',
      howItWorks: 'Comment Ça Fonctionne',
      howItWorksDesc: 'La variance pixel trame-à-trame est calculée toutes les 100ms. Haute variance = mouvement rapide (STRESSÉ/ÉNERGIQUE). Variance quasi-nulle = CALME/CONCENTRÉ. Quasi-nulle pendant 5s+ déclenche FATIGUÉ.',
      preview: {
        heading: 'Interface Adaptative',
        body: 'Ce panneau se transforme dynamiquement selon votre état cognitif détecté. La palette, la vitesse d\'animation, la taille de police et la densité de disposition s\'adaptent en temps réel.',
        cta: 'Action Principale',
        secondary: 'Secondaire',
        card1: 'Tâche Focus',
        card2: 'Note Rapide',
        card3: 'Statut'
      }
    }
  };

  function lang() { return window.appLang || 'en'; }
  function t(key) {
    const parts = key.split('.');
    let obj = T[lang()] || T.en;
    for (const p of parts) { obj = obj?.[p]; }
    if (obj === undefined) {
      let obj2 = T.en;
      for (const p of parts) { obj2 = obj2?.[p]; }
      return obj2 ?? key;
    }
    return obj;
  }

  /* ── State ───────────────────────────────────────────────── */
  const ENGINE = {
    stream: null,
    videoEl: null,
    analysisCanvas: null,
    analysisCtx: null,
    animFrame: null,
    analysisInterval: null,
    prevPixels: null,
    frameHistory: [],         // last N variance readings
    HISTORY_LEN: 20,
    varianceSum: 0,
    calmStartTime: null,
    calmThreshold: 8,         // variance below this = calm/focused
    highThreshold: 35,        // variance above this = stressed/energetic
    energeticThreshold: 60,   // very high = energetic
    fatigueSeconds: 5,        // calm duration before FATIGUED
    currentState: 'SCANNING',
    confidence: 0,
    energyLevel: 0,           // 0-100
    motionLevel: 0,           // 0-100
    lastVariance: 0,
    running: false,
    previewUpdateTimer: null
  };

  /* ── Adaptive Theme Profiles ─────────────────────────────── */
  const THEMES = {
    SCANNING: {
      bg: '#020617', accent: '#334155', text: '#94a3b8', secondary: '#1e293b',
      glow: '0 0 20px #334155', animDuration: '1s', fontSize: '16px',
      fontWeight: '400', spacing: '1rem', borderRadius: '12px',
      gradient: 'linear-gradient(135deg, #020617, #0f172a)',
      cardBg: '#0f172a', btnBg: '#1e293b', btnText: '#94a3b8',
      label: 'SCANNING', icon: '🔍', density: 'normal'
    },
    CALM: {
      bg: '#050b1a', accent: '#818cf8', text: '#c7d2fe', secondary: '#0f172a',
      glow: '0 0 30px rgba(129,140,248,0.4)', animDuration: '2s', fontSize: '16px',
      fontWeight: '400', spacing: '1.5rem', borderRadius: '20px',
      gradient: 'linear-gradient(135deg, #050b1a 0%, #0c0f2e 50%, #0d1b3e 100%)',
      cardBg: '#0d1528', btnBg: '#3730a3', btnText: '#c7d2fe',
      label: 'CALM', icon: '🌊', density: 'spacious'
    },
    FOCUSED: {
      bg: '#030c14', accent: '#22d3ee', text: '#cffafe', secondary: '#0c1a24',
      glow: '0 0 25px rgba(34,211,238,0.3)', animDuration: '0.8s', fontSize: '15px',
      fontWeight: '500', spacing: '1rem', borderRadius: '10px',
      gradient: 'linear-gradient(135deg, #030c14 0%, #0c2030 100%)',
      cardBg: '#0a1f2e', btnBg: '#0e7490', btnText: '#cffafe',
      label: 'FOCUSED', icon: '🎯', density: 'compact'
    },
    STRESSED: {
      bg: '#0d0a0a', accent: '#86efac', text: '#dcfce7', secondary: '#1a0f0f',
      glow: '0 0 20px rgba(134,239,172,0.25)', animDuration: '1.5s', fontSize: '16px',
      fontWeight: '400', spacing: '1.8rem', borderRadius: '16px',
      gradient: 'linear-gradient(135deg, #0d0a0a 0%, #1a1010 100%)',
      cardBg: '#150d0d', btnBg: '#166534', btnText: '#dcfce7',
      label: 'STRESSED', icon: '🍃', density: 'spacious'
    },
    ENERGETIC: {
      bg: '#050005', accent: '#f0abfc', text: '#fdf4ff', secondary: '#120017',
      glow: '0 0 40px rgba(240,171,252,0.5)', animDuration: '0.3s', fontSize: '18px',
      fontWeight: '700', spacing: '0.8rem', borderRadius: '8px',
      gradient: 'linear-gradient(135deg, #050005 0%, #1a0026 30%, #0d001a 100%)',
      cardBg: '#140020', btnBg: '#7e22ce', btnText: '#fdf4ff',
      label: 'ENERGETIC', icon: '⚡', density: 'compact'
    },
    FATIGUED: {
      bg: '#000000', accent: '#fde68a', text: '#ffffff', secondary: '#111111',
      glow: '0 0 20px rgba(253,230,138,0.2)', animDuration: '3s', fontSize: '19px',
      fontWeight: '600', spacing: '2rem', borderRadius: '6px',
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a00 100%)',
      cardBg: '#0f0f00', btnBg: '#854d0e', btnText: '#ffffff',
      label: 'FATIGUED', icon: '😴', density: 'minimal'
    }
  };

  /* ── CSS Export Generator ────────────────────────────────── */
  function generateAdaptiveCSS() {
    const states = ['CALM', 'FOCUSED', 'STRESSED', 'ENERGETIC', 'FATIGUED'];
    let css = `/* ============================================
 * Emotion-Adaptive UI CSS Variables
 * Generated by IA Architecte — Emotion Engine
 * ${new Date().toISOString()}
 * ============================================ */

/* Default (Calm) State */
:root {
  --ea-bg:            ${THEMES.CALM.bg};
  --ea-accent:        ${THEMES.CALM.accent};
  --ea-text:          ${THEMES.CALM.text};
  --ea-secondary:     ${THEMES.CALM.secondary};
  --ea-card-bg:       ${THEMES.CALM.cardBg};
  --ea-btn-bg:        ${THEMES.CALM.btnBg};
  --ea-btn-text:      ${THEMES.CALM.btnText};
  --ea-glow:          ${THEMES.CALM.glow};
  --ea-anim-duration: ${THEMES.CALM.animDuration};
  --ea-font-size:     ${THEMES.CALM.fontSize};
  --ea-font-weight:   ${THEMES.CALM.fontWeight};
  --ea-spacing:       ${THEMES.CALM.spacing};
  --ea-radius:        ${THEMES.CALM.borderRadius};
  --ea-gradient:      ${THEMES.CALM.gradient};
  --ea-state:         "calm";
  --ea-transition:    all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── State Attribute Overrides ──────────────────────────── */
/* Apply data-emotion="calm|focused|stressed|energetic|fatigued"
   to <html> or <body> to activate the corresponding profile. */
`;

    const attrMap = {
      CALM: 'calm', FOCUSED: 'focused', STRESSED: 'stressed',
      ENERGETIC: 'energetic', FATIGUED: 'fatigued'
    };

    for (const state of states) {
      const th = THEMES[state];
      css += `
[data-emotion="${attrMap[state]}"] {
  --ea-bg:            ${th.bg};
  --ea-accent:        ${th.accent};
  --ea-text:          ${th.text};
  --ea-secondary:     ${th.secondary};
  --ea-card-bg:       ${th.cardBg};
  --ea-btn-bg:        ${th.btnBg};
  --ea-btn-text:      ${th.btnText};
  --ea-glow:          ${th.glow};
  --ea-anim-duration: ${th.animDuration};
  --ea-font-size:     ${th.fontSize};
  --ea-font-weight:   ${th.fontWeight};
  --ea-spacing:       ${th.spacing};
  --ea-radius:        ${th.borderRadius};
  --ea-gradient:      ${th.gradient};
  --ea-state:         "${attrMap[state]}";
}
`;
    }

    css += `
/* ── Base Component Styles ──────────────────────────────── */
.ea-app {
  background: var(--ea-bg);
  color: var(--ea-text);
  font-size: var(--ea-font-size);
  font-weight: var(--ea-font-weight);
  padding: var(--ea-spacing);
  transition: var(--ea-transition);
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}

.ea-card {
  background: var(--ea-card-bg);
  border: 1px solid var(--ea-accent);
  border-radius: var(--ea-radius);
  padding: var(--ea-spacing);
  box-shadow: var(--ea-glow);
  transition: var(--ea-transition);
  margin-bottom: var(--ea-spacing);
}

.ea-btn {
  background: var(--ea-btn-bg);
  color: var(--ea-btn-text);
  border: 1px solid var(--ea-accent);
  border-radius: var(--ea-radius);
  padding: 0.6em 1.4em;
  font-size: var(--ea-font-size);
  font-weight: var(--ea-font-weight);
  cursor: pointer;
  transition: var(--ea-transition);
  box-shadow: var(--ea-glow);
}

.ea-btn:hover {
  filter: brightness(1.2);
  transform: translateY(-2px);
}

.ea-accent { color: var(--ea-accent); }
.ea-heading {
  font-size: calc(var(--ea-font-size) * 1.5);
  font-weight: calc(var(--ea-font-weight) + 200);
  color: var(--ea-accent);
}

/* ── Animation Speed Adaptive ───────────────────────────── */
@keyframes ea-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes ea-glow-pulse {
  0%, 100% { box-shadow: var(--ea-glow); }
  50% { box-shadow: none; }
}

.ea-animated {
  animation: ea-pulse var(--ea-anim-duration) ease-in-out infinite;
}

.ea-card:hover {
  animation: ea-glow-pulse var(--ea-anim-duration) ease-in-out infinite;
}

/* ── Density Modifiers ──────────────────────────────────── */
[data-emotion="energetic"] .ea-card,
[data-emotion="focused"] .ea-card {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

[data-emotion="calm"] .ea-card,
[data-emotion="stressed"] .ea-card {
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}

[data-emotion="fatigued"] .ea-card {
  padding: 2rem;
  margin-bottom: 2rem;
  border-width: 2px;
}

/* ── Energetic Neon Effects ─────────────────────────────── */
[data-emotion="energetic"] .ea-heading {
  text-shadow: 0 0 20px var(--ea-accent), 0 0 40px var(--ea-accent);
}

[data-emotion="energetic"] .ea-btn {
  animation: ea-glow-pulse 0.3s ease-in-out infinite;
}

/* ── Calm Softness ──────────────────────────────────────── */
[data-emotion="calm"] .ea-app {
  background: var(--ea-gradient);
}

[data-emotion="calm"] .ea-card {
  backdrop-filter: blur(10px);
}

/* ── Fatigued Readability ───────────────────────────────── */
[data-emotion="fatigued"] .ea-heading {
  font-size: 2rem;
  letter-spacing: 0.05em;
}

[data-emotion="fatigued"] .ea-btn {
  padding: 1em 2em;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

/* ── Stressed Calm-Down ─────────────────────────────────── */
[data-emotion="stressed"] .ea-app {
  background: var(--ea-gradient);
}

[data-emotion="stressed"] .ea-card {
  border-color: var(--ea-accent);
  opacity: 0.95;
}

/* ── Responsive Adaptive Breakpoints ───────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ea-animated, .ea-btn, .ea-card {
    animation: none !important;
    transition: none !important;
  }
}

@media (max-width: 768px) {
  .ea-app { padding: calc(var(--ea-spacing) * 0.75); }
  .ea-heading { font-size: calc(var(--ea-font-size) * 1.25); }
}
`;
    return css;
  }

  /* ── Standalone Template ─────────────────────────────────── */
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en" data-emotion="calm">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Emotion-Adaptive UI — IA Architecte</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ea-bg: #050b1a;
    --ea-accent: #818cf8;
    --ea-text: #c7d2fe;
    --ea-secondary: #0f172a;
    --ea-card-bg: #0d1528;
    --ea-btn-bg: #3730a3;
    --ea-btn-text: #c7d2fe;
    --ea-glow: 0 0 30px rgba(129,140,248,0.4);
    --ea-anim-duration: 2s;
    --ea-font-size: 16px;
    --ea-font-weight: 400;
    --ea-spacing: 1.5rem;
    --ea-radius: 20px;
    --ea-gradient: linear-gradient(135deg, #050b1a 0%, #0c0f2e 50%, #0d1b3e 100%);
    --ea-transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  [data-emotion="focused"] {
    --ea-bg: #030c14; --ea-accent: #22d3ee; --ea-text: #cffafe;
    --ea-secondary: #0c1a24; --ea-card-bg: #0a1f2e; --ea-btn-bg: #0e7490;
    --ea-btn-text: #cffafe; --ea-glow: 0 0 25px rgba(34,211,238,0.3);
    --ea-anim-duration: 0.8s; --ea-font-size: 15px; --ea-font-weight: 500;
    --ea-spacing: 1rem; --ea-radius: 10px;
    --ea-gradient: linear-gradient(135deg, #030c14 0%, #0c2030 100%);
  }
  [data-emotion="stressed"] {
    --ea-bg: #0d0a0a; --ea-accent: #86efac; --ea-text: #dcfce7;
    --ea-secondary: #1a0f0f; --ea-card-bg: #150d0d; --ea-btn-bg: #166534;
    --ea-btn-text: #dcfce7; --ea-glow: 0 0 20px rgba(134,239,172,0.25);
    --ea-anim-duration: 1.5s; --ea-font-size: 16px; --ea-font-weight: 400;
    --ea-spacing: 1.8rem; --ea-radius: 16px;
    --ea-gradient: linear-gradient(135deg, #0d0a0a 0%, #1a1010 100%);
  }
  [data-emotion="energetic"] {
    --ea-bg: #050005; --ea-accent: #f0abfc; --ea-text: #fdf4ff;
    --ea-secondary: #120017; --ea-card-bg: #140020; --ea-btn-bg: #7e22ce;
    --ea-btn-text: #fdf4ff; --ea-glow: 0 0 40px rgba(240,171,252,0.5);
    --ea-anim-duration: 0.3s; --ea-font-size: 18px; --ea-font-weight: 700;
    --ea-spacing: 0.8rem; --ea-radius: 8px;
    --ea-gradient: linear-gradient(135deg, #050005 0%, #1a0026 30%, #0d001a 100%);
  }
  [data-emotion="fatigued"] {
    --ea-bg: #000000; --ea-accent: #fde68a; --ea-text: #ffffff;
    --ea-secondary: #111111; --ea-card-bg: #0f0f00; --ea-btn-bg: #854d0e;
    --ea-btn-text: #ffffff; --ea-glow: 0 0 20px rgba(253,230,138,0.2);
    --ea-anim-duration: 3s; --ea-font-size: 19px; --ea-font-weight: 600;
    --ea-spacing: 2rem; --ea-radius: 6px;
    --ea-gradient: linear-gradient(135deg, #000000 0%, #1a1a00 100%);
  }

  body {
    background: var(--ea-bg);
    color: var(--ea-text);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: var(--ea-font-size);
    font-weight: var(--ea-font-weight);
    transition: var(--ea-transition);
    min-height: 100vh;
  }

  .layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    min-height: 100vh;
  }

  /* Sidebar */
  .sidebar {
    background: var(--ea-secondary);
    border-right: 1px solid var(--ea-accent);
    padding: var(--ea-spacing);
    transition: var(--ea-transition);
    display: flex;
    flex-direction: column;
    gap: var(--ea-spacing);
  }
  .logo {
    font-size: calc(var(--ea-font-size) * 1.4);
    font-weight: 900;
    color: var(--ea-accent);
    text-shadow: var(--ea-glow);
    transition: var(--ea-transition);
  }
  .cam-container {
    position: relative;
    border-radius: var(--ea-radius);
    overflow: hidden;
    border: 2px solid var(--ea-accent);
    box-shadow: var(--ea-glow);
    transition: var(--ea-transition);
  }
  video {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    transform: scaleX(-1);
  }
  .cam-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    flex-direction: column;
    gap: 0.5rem;
  }
  .cam-start-btn {
    background: var(--ea-btn-bg);
    color: var(--ea-btn-text);
    border: 1px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: 0.6em 1.2em;
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--ea-transition);
  }
  .state-badge {
    background: var(--ea-card-bg);
    border: 2px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: 1rem;
    text-align: center;
    box-shadow: var(--ea-glow);
    transition: var(--ea-transition);
  }
  .state-icon { font-size: 2.5rem; }
  .state-label {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--ea-accent);
    letter-spacing: 0.15em;
    margin-top: 0.25rem;
    transition: var(--ea-transition);
  }
  .meter-row { display: flex; flex-direction: column; gap: 0.5rem; }
  .meter-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .meter-bar {
    height: 8px;
    background: rgba(255,255,255,0.08);
    border-radius: 999px;
    overflow: hidden;
  }
  .meter-fill {
    height: 100%;
    background: var(--ea-accent);
    box-shadow: var(--ea-glow);
    border-radius: 999px;
    transition: width 0.3s ease;
  }
  .state-controls { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .state-btn {
    background: var(--ea-card-bg);
    color: var(--ea-text);
    border: 1px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: 0.4em 0.8em;
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--ea-transition);
  }
  .state-btn:hover, .state-btn.active { background: var(--ea-accent); color: var(--ea-bg); }

  /* Main content */
  .main {
    padding: var(--ea-spacing);
    transition: var(--ea-transition);
    background: var(--ea-gradient);
    display: flex;
    flex-direction: column;
    gap: var(--ea-spacing);
  }
  .main-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .main-title {
    font-size: calc(var(--ea-font-size) * 2);
    font-weight: 900;
    color: var(--ea-accent);
    text-shadow: var(--ea-glow);
    transition: var(--ea-transition);
  }
  [data-emotion="energetic"] .main-title {
    text-shadow: 0 0 20px var(--ea-accent), 0 0 40px var(--ea-accent);
    animation: neon-pulse 0.3s ease-in-out infinite;
  }
  @keyframes neon-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  .main-subtitle { opacity: 0.7; font-size: 0.9rem; margin-top: 0.25rem; }
  .export-btn {
    background: var(--ea-btn-bg);
    color: var(--ea-btn-text);
    border: 1px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: 0.6em 1.4em;
    font-weight: 600;
    cursor: pointer;
    transition: var(--ea-transition);
    box-shadow: var(--ea-glow);
    white-space: nowrap;
  }
  .export-btn:hover { filter: brightness(1.25); transform: translateY(-2px); }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--ea-spacing);
    transition: var(--ea-transition);
  }
  .card {
    background: var(--ea-card-bg);
    border: 1px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: var(--ea-spacing);
    box-shadow: var(--ea-glow);
    transition: var(--ea-transition);
  }
  .card:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: var(--ea-glow); }
  .card-title { font-weight: 700; color: var(--ea-accent); margin-bottom: 0.5rem; font-size: 1.05rem; }
  .card-body { opacity: 0.8; line-height: 1.6; font-size: 0.9rem; }
  .card-footer { margin-top: 1rem; display: flex; gap: 0.5rem; }
  .btn-primary {
    background: var(--ea-btn-bg);
    color: var(--ea-btn-text);
    border: none;
    border-radius: var(--ea-radius);
    padding: 0.5em 1em;
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--ea-transition);
    box-shadow: var(--ea-glow);
  }
  .btn-secondary {
    background: transparent;
    color: var(--ea-accent);
    border: 1px solid var(--ea-accent);
    border-radius: var(--ea-radius);
    padding: 0.5em 1em;
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--ea-transition);
  }
  [data-emotion="energetic"] .btn-primary {
    animation: neon-pulse var(--ea-anim-duration) ease-in-out infinite;
  }
  [data-emotion="fatigued"] .btn-primary {
    padding: 0.8em 1.4em;
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
  [data-emotion="fatigued"] .card-title { font-size: 1.3rem; }

  .toast {
    position: fixed; bottom: 1.5rem; right: 1.5rem;
    background: var(--ea-card-bg); color: var(--ea-text);
    border: 1px solid var(--ea-accent); border-radius: var(--ea-radius);
    padding: 0.75rem 1.25rem; box-shadow: var(--ea-glow);
    opacity: 0; transform: translateY(20px);
    transition: all 0.3s ease; pointer-events: none; z-index: 9999;
    font-size: 0.85rem;
  }
  .toast.show { opacity: 1; transform: translateY(0); }

  canvas#analysis { display: none; }

  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { border-right: none; border-bottom: 1px solid var(--ea-accent); }
  }
<\/style>
</head>
<body>
<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="logo">🫀 EmotionUI</div>

    <div class="cam-container" id="camContainer">
      <video id="videoFeed" autoplay muted playsinline></video>
      <canvas id="analysis" width="160" height="90"></canvas>
      <div class="cam-overlay" id="camOverlay">
        <div style="font-size:2rem">📷</div>
        <button class="cam-start-btn" id="camBtn">Enable Webcam</button>
        <div id="camError" style="font-size:0.75rem;opacity:0.7;text-align:center;padding:0 0.5rem;display:none"></div>
      </div>
    </div>

    <div class="state-badge" id="stateBadge">
      <div class="state-icon" id="stateIcon">🔍</div>
      <div class="state-label" id="stateLabel">SCANNING</div>
      <div id="stateDesc" style="font-size:0.75rem;opacity:0.7;margin-top:0.3rem;line-height:1.4">Awaiting webcam…</div>
    </div>

    <div class="meter-row">
      <div class="meter-label"><span>Energy</span><span id="energyVal">0%</span></div>
      <div class="meter-bar"><div class="meter-fill" id="energyFill" style="width:0%"></div></div>
      <div class="meter-label" style="margin-top:0.5rem"><span>Motion Δ</span><span id="motionVal">0%</span></div>
      <div class="meter-bar"><div class="meter-fill" id="motionFill" style="width:0%"></div></div>
      <div class="meter-label" style="margin-top:0.5rem"><span>Confidence</span><span id="confVal">0%</span></div>
      <div class="meter-bar"><div class="meter-fill" id="confFill" style="width:0%"></div></div>
    </div>

    <div>
      <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;opacity:0.6;margin-bottom:0.5rem">Force State</div>
      <div class="state-controls">
        <button class="state-btn active" data-state="calm">Calm</button>
        <button class="state-btn" data-state="focused">Focused</button>
        <button class="state-btn" data-state="stressed">Stressed</button>
        <button class="state-btn" data-state="energetic">Energetic</button>
        <button class="state-btn" data-state="fatigued">Fatigued</button>
      </div>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">
    <div class="main-header">
      <div>
        <div class="main-title" id="mainTitle">Adaptive Interface</div>
        <div class="main-subtitle" id="mainSubtitle">State: CALM — Soft, spacious layout activated</div>
      </div>
      <button class="export-btn" id="exportCSSBtn">💾 Export CSS</button>
    </div>

    <div class="cards-grid">
      <div class="card">
        <div class="card-title">📋 Task Focus</div>
        <div class="card-body">Your current cognitive state shapes this interface. Notice how colors, spacing, and typography adapt as your state changes.</div>
        <div class="card-footer">
          <button class="btn-primary">Get Started</button>
          <button class="btn-secondary">More</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">⚡ Quick Note</div>
        <div class="card-body">Jot down ideas. The interface density adjusts — compact for focus, spacious for calm, minimal for fatigue.</div>
        <div class="card-footer">
          <button class="btn-primary">New Note</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">📊 Status</div>
        <div class="card-body">Animation speeds, color palettes, border radii and font weights all change based on detected emotional state.</div>
        <div class="card-footer">
          <button class="btn-primary">View</button>
          <button class="btn-secondary">Settings</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🎨 Theme Engine</div>
        <div class="card-body">5 adaptive themes: Calm (indigo), Focused (cyan), Stressed (green calm-down), Energetic (neon), Fatigued (high contrast).</div>
        <div class="card-footer">
          <button class="btn-primary">Customize</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔬 Analysis</div>
        <div class="card-body">Frame-to-frame pixel variance is computed every 100ms. 5 seconds of sustained calm triggers the Fatigued profile.</div>
        <div class="card-footer">
          <button class="btn-primary">Details</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🚀 Export</div>
        <div class="card-body">Click Export CSS to download all adaptive variables and @media queries ready to drop into any project.</div>
        <div class="card-footer">
          <button class="btn-primary" id="exportCSSBtn2">Export Now</button>
        </div>
      </div>
    </div>
  </main>
</div>

<div class="toast" id="toast"></div>

<${'script'}>
  const html = document.documentElement;
  const video = document.getElementById('videoFeed');
  const canvas = document.getElementById('analysis');
  const ctx = canvas.getContext('2d');
  const camBtn = document.getElementById('camBtn');
  const camOverlay = document.getElementById('camOverlay');
  const camError = document.getElementById('camError');
  const stateIcon = document.getElementById('stateIcon');
  const stateLabel = document.getElementById('stateLabel');
  const stateDesc = document.getElementById('stateDesc');
  const energyFill = document.getElementById('energyFill');
  const motionFill = document.getElementById('motionFill');
  const confFill = document.getElementById('confFill');
  const energyVal = document.getElementById('energyVal');
  const motionVal = document.getElementById('motionVal');
  const confVal = document.getElementById('confVal');
  const mainTitle = document.getElementById('mainTitle');
  const mainSubtitle = document.getElementById('mainSubtitle');
  const toast = document.getElementById('toast');

  const THEMES = {
    calm: { icon:'🌊', label:'CALM', desc:'Low motion — soft, relaxed interface.' },
    focused: { icon:'🎯', label:'FOCUSED', desc:'Moderate motion — clean, productive layout.' },
    stressed: { icon:'🍃', label:'STRESSED', desc:'High movement — soothing, simplified interface.' },
    energetic: { icon:'⚡', label:'ENERGETIC', desc:'High energy — vibrant, bold interface.' },
    fatigued: { icon:'😴', label:'FATIGUED', desc:'Sustained stillness — high contrast, minimal UI.' }
  };

  let prevPixels = null, calmStart = null, interval = null, energyLevel = 0, streaming = false;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function setEmotion(state) {
    html.setAttribute('data-emotion', state);
    const th = THEMES[state];
    stateIcon.textContent = th.icon;
    stateLabel.textContent = th.label;
    stateDesc.textContent = th.desc;
    mainTitle.textContent = th.label + ' Mode';
    mainSubtitle.textContent = 'State: ' + th.label + ' — ' + th.desc;
    document.querySelectorAll('.state-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.state === state);
    });
  }

  function analyzeFrame() {
    if (!video.videoWidth) return;
    canvas.width = 80; canvas.height = 45;
    ctx.drawImage(video, 0, 0, 80, 45);
    const data = ctx.getImageData(0, 0, 80, 45).data;
    const gray = [];
    for (let i = 0; i < data.length; i += 4) {
      gray.push((data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114));
    }
    let variance = 0;
    if (prevPixels) {
      let diff = 0;
      for (let i = 0; i < gray.length; i++) diff += Math.abs(gray[i] - prevPixels[i]);
      variance = diff / gray.length;
    }
    prevPixels = gray;

    const motionPct = Math.min(100, (variance / 80) * 100);
    energyLevel = energyLevel * 0.8 + motionPct * 0.2;

    energyFill.style.width = energyLevel.toFixed(1) + '%';
    motionFill.style.width = motionPct.toFixed(1) + '%';
    energyVal.textContent = energyLevel.toFixed(0) + '%';
    motionVal.textContent = motionPct.toFixed(0) + '%';

    let state, conf;
    if (variance > 50) { state='energetic'; conf = Math.min(100, (variance/80)*100); calmStart=null; }
    else if (variance > 25) { state='stressed'; conf = Math.min(100, (variance/50)*100); calmStart=null; }
    else if (variance > 8) { state='focused'; conf = Math.min(100, (variance/25)*100); calmStart=null; }
    else {
      if (!calmStart) calmStart = Date.now();
      const calmSec = (Date.now() - calmStart) / 1000;
      if (calmSec >= 5) { state='fatigued'; conf = Math.min(100, ((calmSec-5)/5)*100+50); }
      else { state='calm'; conf = Math.min(100, (1-(variance/8))*100); }
    }
    confFill.style.width = conf.toFixed(1) + '%';
    confVal.textContent = conf.toFixed(0) + '%';
    setEmotion(state);
  }

  camBtn.addEventListener('click', async () => {
    if (!streaming) {
      if (!navigator.mediaDevices?.getUserMedia) {
        camError.textContent = 'getUserMedia not supported.'; camError.style.display='block'; return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width:320, height:240 } });
        video.srcObject = stream;
        camOverlay.style.display = 'none';
        streaming = true;
        camBtn.textContent = 'Disable Webcam';
        interval = setInterval(analyzeFrame, 100);
        showToast('📷 Webcam active — analyzing emotions…');
      } catch(e) {
        camError.textContent = 'Access denied: ' + e.message; camError.style.display='block';
      }
    } else {
      video.srcObject?.getTracks().forEach(t => t.stop());
      video.srcObject = null;
      camOverlay.style.display = 'flex';
      streaming = false; calmStart = null; prevPixels = null; energyLevel = 0;
      camBtn.textContent = 'Enable Webcam';
      clearInterval(interval);
      [energyFill, motionFill, confFill].forEach(f => f.style.width='0%');
      [energyVal, motionVal, confVal].forEach(v => v.textContent='0%');
      setEmotion('calm');
      showToast('⏹ Webcam disabled.');
    }
  });

  document.querySelectorAll('.state-btn').forEach(btn => {
    btn.addEventListener('click', () => setEmotion(btn.dataset.state));
  });

  function exportCSS() {
    const css = \`/* Emotion-Adaptive CSS — generated \${new Date().toISOString()} */
:root { --ea-bg:#050b1a; --ea-accent:#818cf8; --ea-text:#c7d2fe; --ea-radius:20px; --ea-anim-duration:2s; }
[data-emotion="focused"] { --ea-bg:#030c14; --ea-accent:#22d3ee; --ea-text:#cffafe; --ea-radius:10px; --ea-anim-duration:0.8s; }
[data-emotion="stressed"] { --ea-bg:#0d0a0a; --ea-accent:#86efac; --ea-text:#dcfce7; --ea-radius:16px; --ea-anim-duration:1.5s; }
[data-emotion="energetic"] { --ea-bg:#050005; --ea-accent:#f0abfc; --ea-text:#fdf4ff; --ea-radius:8px; --ea-anim-duration:0.3s; }
[data-emotion="fatigued"] { --ea-bg:#000; --ea-accent:#fde68a; --ea-text:#fff; --ea-radius:6px; --ea-anim-duration:3s; }\`;
    const blob = new Blob([css], {type:'text/css'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'emotion-adaptive.css';
    a.click();
    showToast('💾 CSS exported!');
  }

  document.getElementById('exportCSSBtn').addEventListener('click', exportCSS);
  document.getElementById('exportCSSBtn2').addEventListener('click', exportCSS);

  setEmotion('calm');
</${'script'}>
</body>
</html>`;

  /* ── Pixel Variance Analysis ─────────────────────────────── */
  function computeVariance(ctx, w, h, prevPixels) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const gray = new Float32Array(w * h);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      gray[j] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }

    let variance = 0;
    if (prevPixels && prevPixels.length === gray.length) {
      let sum = 0;
      for (let i = 0; i < gray.length; i++) {
        sum += Math.abs(gray[i] - prevPixels[i]);
      }
      variance = sum / gray.length;
    }
    return { variance, gray };
  }

  function classifyState() {
    const history = ENGINE.frameHistory;
    if (history.length < 3) return { state: 'SCANNING', confidence: 0 };

    const avg = history.reduce((s, v) => s + v, 0) / history.length;
    const max = Math.max(...history);
    let state, confidence;

    if (avg > ENGINE.energeticThreshold) {
      state = 'ENERGETIC';
      confidence = Math.min(100, ((avg - ENGINE.energeticThreshold) / 30) * 100 + 50);
      ENGINE.calmStartTime = null;
    } else if (avg > ENGINE.highThreshold) {
      state = 'STRESSED';
      confidence = Math.min(100, ((avg - ENGINE.highThreshold) / 25) * 100 + 50);
      ENGINE.calmStartTime = null;
    } else if (avg > ENGINE.calmThreshold) {
      state = 'FOCUSED';
      confidence = Math.min(100, ((avg - ENGINE.calmThreshold) / (ENGINE.highThreshold - ENGINE.calmThreshold)) * 100);
      ENGINE.calmStartTime = null;
    } else {
      // Low variance — calm or fatigued
      if (!ENGINE.calmStartTime) ENGINE.calmStartTime = Date.now();
      const calmDuration = (Date.now() - ENGINE.calmStartTime) / 1000;
      if (calmDuration >= ENGINE.fatigueSeconds) {
        state = 'FATIGUED';
        confidence = Math.min(100, ((calmDuration - ENGINE.fatigueSeconds) / 5) * 50 + 50);
      } else {
        state = 'CALM';
        confidence = Math.min(100, (1 - (avg / ENGINE.calmThreshold)) * 100);
      }
    }

    ENGINE.energyLevel = Math.min(100, (avg / 80) * 100);
    ENGINE.motionLevel = Math.min(100, (max / 80) * 100);
    ENGINE.lastVariance = avg;

    return { state, confidence: Math.round(confidence) };
  }

  /* ── Stop Camera ─────────────────────────────────────────── */
  function stopCamera() {
    if (ENGINE.stream) {
      ENGINE.stream.getTracks().forEach(t => t.stop());
      ENGINE.stream = null;
    }
    if (ENGINE.analysisInterval) {
      clearInterval(ENGINE.analysisInterval);
      ENGINE.analysisInterval = null;
    }
    ENGINE.running = false;
    ENGINE.prevPixels = null;
    ENGINE.frameHistory = [];
    ENGINE.calmStartTime = null;
    ENGINE.energyLevel = 0;
    ENGINE.motionLevel = 0;
  }

  /* ── Update Preview Panel ────────────────────────────────── */
  function updatePreviewPanel(state) {
    const lb = document.getElementById('ea-preview-panel');
    if (!lb) return;
    const th = THEMES[state] || THEMES.SCANNING;
    const l = lang();
    const lv = T[l] || T.en;

    lb.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
    lb.style.background = th.gradient || th.bg;
    lb.style.borderColor = th.accent;
    lb.style.boxShadow = th.glow;

    const title = lb.querySelector('#ea-prev-title');
    const body = lb.querySelector('#ea-prev-body');
    const cta = lb.querySelector('#ea-prev-cta');
    const sec = lb.querySelector('#ea-prev-sec');
    const card1 = lb.querySelector('#ea-prev-card1');
    const card2 = lb.querySelector('#ea-prev-card2');
    const card3 = lb.querySelector('#ea-prev-card3');

    if (title) {
      title.style.color = th.accent;
      title.style.fontSize = th.fontSize;
      title.style.fontWeight = th.fontWeight;
      title.style.textShadow = state === 'ENERGETIC' ? `0 0 15px ${th.accent}` : 'none';
    }
    if (body) {
      body.style.color = th.text;
      body.style.fontSize = th.fontSize;
    }
    if (cta) {
      cta.style.background = th.btnBg;
      cta.style.color = th.btnText;
      cta.style.borderRadius = th.borderRadius;
      cta.style.padding = state === 'FATIGUED' ? '0.75em 1.75em' : '0.5em 1.25em';
      cta.style.fontSize = th.fontSize;
      cta.style.fontWeight = th.fontWeight;
      cta.style.boxShadow = th.glow;
      cta.style.animation = state === 'ENERGETIC'
        ? `ea-neon-pulse ${th.animDuration} ease-in-out infinite`
        : 'none';
    }
    if (sec) {
      sec.style.color = th.accent;
      sec.style.borderColor = th.accent;
      sec.style.borderRadius = th.borderRadius;
      sec.style.fontSize = th.fontSize;
    }
    [card1, card2, card3].forEach(c => {
      if (!c) return;
      c.style.background = th.cardBg;
      c.style.borderColor = th.accent;
      c.style.borderRadius = th.borderRadius;
      c.style.boxShadow = th.glow;
      c.style.padding = th.spacing;
      c.style.color = th.text;
      c.style.fontSize = th.fontSize;
    });
  } // end updatePreviewPanel

/* ── Render Tab ──────────────────────────────────────────── */
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId !== TAB_ID) return;

    const lb = document.getElementById('left-body');
    if (!lb) return;

    if (window.editor) {
      window.editor.setValue(STANDALONE_TEMPLATE);
      if (window.runPreview) window.runPreview();
    }
    
    const lv = T[lang()] || T.en;
    lb.innerHTML = '';

    /* Inject keyframes into head if needed */
    if (!document.getElementById('ea-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ea-keyframes';
      style.textContent = `
        @keyframes ea-neon-pulse {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.85; filter: brightness(1.3); }
        }
        @keyframes ea-scan-sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ea-bar-shimmer {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        @keyframes ea-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes ea-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ea-fade-in { animation: ea-fade-in 0.4s ease forwards; }
      `;
      document.head.appendChild(style);
    }

    /* ── Layout ─────────────────────────────────────────────── */
    lb.style.cssText = `
      background: #020617;
      color: #e2e8f0;
      font-family: 'Inter', system-ui, sans-serif;
      padding: 0;
      overflow-y: auto;
      height: 100%;
    `;

    lb.innerHTML = `
<div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;min-height:100%;box-sizing:border-box;">

  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.75rem;" class="ea-fade-in">
    <div>
      <h2 style="margin:0;font-size:1.3rem;font-weight:800;color:#f0abfc;text-shadow:0 0 20px rgba(240,171,252,0.4);">${lv.title}</h2>
      <p style="margin:0.25rem 0 0;font-size:0.78rem;color:#94a3b8;">${lv.subtitle}</p>
    </div>
    <button id="ea-load-standalone" style="
      background:linear-gradient(135deg,#7c3aed,#4f46e5);
      color:#fff;border:none;border-radius:10px;
      padding:0.55rem 1.1rem;font-size:0.82rem;font-weight:600;
      cursor:pointer;box-shadow:0 0 15px rgba(124,58,237,0.4);
      white-space:nowrap;
    ">${lv.loadDemo}</button>
  </div>

  <!-- Two column layout -->
  <div style="display:grid;grid-template-columns:300px 1fr;gap:1rem;flex:1;" id="ea-main-grid">

    <!-- LEFT: camera + analysis -->
    <div style="display:flex;flex-direction:column;gap:0.75rem;">

      <!-- Camera Panel -->
      <div style="background:#0f172a;border:1px solid #334155;border-radius:14px;padding:0.85rem;flex-shrink:0;" class="ea-fade-in">
        <div style="font-size:0.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.65rem;">
          📷 ${lv.liveAnalysis}
        </div>

        <!-- Camera feed -->
        <div id="ea-cam-wrapper" style="position:relative;border-radius:10px;overflow:hidden;background:#000;border:2px solid #334155;margin-bottom:0.65rem;">
          <video id="ea-video" autoplay muted playsinline
            style="width:100%;height:160px;object-fit:cover;display:block;transform:scaleX(-1);"></video>
          <canvas id="ea-analysis-canvas" width="160" height="90"
            style="display:none;"></canvas>
          <div id="ea-cam-overlay" style="
            position:absolute;inset:0;
            background:rgba(2,6,23,0.85);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:0.6rem;border-radius:8px;
          ">
            <div style="font-size:2.5rem;animation:ea-beat 2s ease-in-out infinite;">📷</div>
            <div style="font-size:0.78rem;color:#94a3b8;text-align:center;padding:0 0.5rem;">${lv.permissionDesc}</div>
            <button id="ea-cam-btn" style="
              background:linear-gradient(135deg,#7c3aed,#4f46e5);
              color:#fff;border:none;border-radius:10px;
              padding:0.5rem 1.1rem;font-size:0.82rem;font-weight:700;
              cursor:pointer;box-shadow:0 0 15px rgba(124,58,237,0.5);
            ">${lv.enableCam}</button>
            <div id="ea-cam-error" style="font-size:0.72rem;color:#f87171;text-align:center;padding:0 0.5rem;display:none;"></div>
          </div>
        </div>

        <!-- How it works -->
        <details style="cursor:pointer;">
          <summary style="font-size:0.72rem;color:#64748b;font-weight:600;">${lv.howItWorks}</summary>
          <p style="font-size:0.7rem;color:#475569;margin:0.4rem 0 0;line-height:1.5;">${lv.howItWorksDesc}</p>
        </details>
      </div>

      <!-- State Badge -->
      <div id="ea-state-badge" style="
        background:linear-gradient(135deg,#0f172a,#1e0a3e);
        border:2px solid #7c3aed;border-radius:14px;
        padding:1rem;text-align:center;
        box-shadow:0 0 25px rgba(124,58,237,0.3);
        transition:all 0.6s cubic-bezier(0.4,0,0.2,1);
      " class="ea-fade-in">
        <div id="ea-state-icon" style="font-size:2.8rem;animation:ea-beat 2s ease-in-out infinite;">🔍</div>
        <div id="ea-state-label" style="font-size:1.2rem;font-weight:900;color:#f0abfc;letter-spacing:0.15em;margin-top:0.3rem;transition:all 0.5s ease;">
          ${lv.states.SCANNING}
        </div>
        <div id="ea-state-desc" style="font-size:0.72rem;color:#94a3b8;margin-top:0.3rem;line-height:1.4;transition:all 0.5s ease;">
          ${lv.stateDesc.SCANNING}
        </div>
      </div>

      <!-- Meters -->
      <div style="background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:0.85rem;display:flex;flex-direction:column;gap:0.6rem;" class="ea-fade-in">
        <div style="font-size:0.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">${lv.liveAnalysis}</div>

        ${[
          ['ea-energy-fill', 'ea-energy-val', lv.energyMeter, '#f0abfc'],
          ['ea-motion-fill', 'ea-motion-val', lv.motionLevel, '#22d3ee'],
          ['ea-conf-fill', 'ea-conf-val', lv.confidence, '#86efac'],
        ].map(([fillId, valId, label, color]) => `
          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:#64748b;margin-bottom:0.25rem;">
              <span>${label}</span><span id="${valId}" style="color:${color};font-weight:700;">0%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:999px;overflow:hidden;">
              <div id="${fillId}" style="height:100%;width:0%;background:${color};border-radius:999px;transition:width 0.3s ease;box-shadow:0 0 8px ${color};"></div>
            </div>
          </div>
        `).join('')}

        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:#64748b;margin-top:0.15rem;">
          <span>${lv.frameVar}</span>
          <span id="ea-var-val" style="color:#fde68a;font-weight:700;">—</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:#64748b;">
          <span>${lv.calmTime}</span>
          <span id="ea-calm-val" style="color:#86efac;font-weight:700;">—</span>
        </div>
      </div>

    </div>

    <!-- RIGHT: Preview + controls -->
    <div style="display:flex;flex-direction:column;gap:0.75rem;">

      <!-- Adaptive Preview Panel -->
      <div id="ea-preview-panel" style="
        background:linear-gradient(135deg,#050b1a,#0c0f2e);
        border:2px solid #818cf8;border-radius:16px;
        padding:1.25rem;flex:1;
        box-shadow:0 0 30px rgba(129,140,248,0.3);
        transition:all 0.6s cubic-bezier(0.4,0,0.2,1);
        display:flex;flex-direction:column;gap:1rem;
      " class="ea-fade-in">

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
          <div style="font-size:0.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">${lv.adaptivePreview}</div>
          <div id="ea-palette-swatches" style="display:flex;gap:0.3rem;"></div>
        </div>

        <!-- Preview header -->
        <div>
          <div id="ea-prev-title" style="font-size:1.2rem;font-weight:700;color:#818cf8;margin-bottom:0.4rem;transition:all 0.6s ease;">
            ${lv.preview.heading}
          </div>
          <p id="ea-prev-body" style="font-size:0.82rem;color:#c7d2fe;line-height:1.6;transition:all 0.6s ease;">
            ${lv.preview.body}
          </p>
        </div>

        <!-- Preview buttons -->
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <button id="ea-prev-cta" style="
            background:#3730a3;color:#c7d2fe;
            border:none;border-radius:20px;
            padding:0.5rem 1.25rem;font-size:0.85rem;font-weight:500;
            cursor:pointer;
            box-shadow:0 0 15px rgba(129,140,248,0.3);
            transition:all 0.6s ease;
          ">${lv.preview.cta}</button>
          <button id="ea-prev-sec" style="
            background:transparent;color:#818cf8;
            border:1px solid #818cf8;border-radius:20px;
            padding:0.5rem 1.1rem;font-size:0.85rem;
            cursor:pointer;transition:all 0.6s ease;
          ">${lv.preview.secondary}</button>
        </div>

        <!-- Preview cards -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;">
          ${[
            ['ea-prev-card1', lv.preview.card1, '📋'],
            ['ea-prev-card2', lv.preview.card2, '⚡'],
            ['ea-prev-card3', lv.preview.card3, '📊'],
          ].map(([id, label, icon]) => `
            <div id="${id}" style="
              background:#0d1528;border:1px solid #818cf8;
              border-radius:20px;padding:1rem;
              box-shadow:0 0 15px rgba(129,140,248,0.2);
              transition:all 0.6s ease;font-size:0.82rem;color:#c7d2fe;
            ">
              <div style="font-size:1.3rem;margin-bottom:0.4rem;">${icon}</div>
              <div style="font-weight:600;">${label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Adaptive properties table -->
        <div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:0.75rem;display:grid;grid-template-columns:1fr 1fr;gap:0.4rem 1rem;">
          ${[
            [lv.adaptivePalette, 'ea-tbl-palette'],
            [lv.animSpeed, 'ea-tbl-anim'],
            [lv.layoutDensity, 'ea-tbl-density'],
            [lv.fontSize, 'ea-tbl-font'],
          ].map(([label, id]) => `
            <div style="font-size:0.7rem;color:#475569;">${label}</div>
            <div id="${id}" style="font-size:0.7rem;color:#94a3b8;font-weight:600;text-align:right;">—</div>
          `).join('')}
        </div>

      </div>

      <!-- Action buttons -->
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;" class="ea-fade-in">
        <button id="ea-export-css" style="
          flex:1;background:linear-gradient(135deg,#0e7490,#0c4a6e);
          color:#cffafe;border:1px solid #22d3ee;border-radius:10px;
          padding:0.65rem 1rem;font-size:0.83rem;font-weight:700;
          cursor:pointer;box-shadow:0 0 12px rgba(34,211,238,0.25);
          transition:all 0.25s ease;
        ">${lv.exportCSS}</button>

        <button id="ea-copy-css" style="
          flex:1;background:linear-gradient(135deg,#166534,#14532d);
          color:#dcfce7;border:1px solid #86efac;border-radius:10px;
          padding:0.65rem 1rem;font-size:0.83rem;font-weight:700;
          cursor:pointer;box-shadow:0 0 12px rgba(134,239,172,0.2);
          transition:all 0.25s ease;
        ">📋 Copy CSS</button>
      </div>

    </div>
  </div>

</div>
`;

    /* ── Wire up logic ───────────────────────────────────────── */
    const video = lb.querySelector('#ea-video');
    const camOverlay = lb.querySelector('#ea-cam-overlay');
    const camBtn = lb.querySelector('#ea-cam-btn');
    const camError = lb.querySelector('#ea-cam-error');
    const analysisCanvas = lb.querySelector('#ea-analysis-canvas');
    const analysisCtx = analysisCanvas.getContext('2d');

    const stateBadge = lb.querySelector('#ea-state-badge');
    const stateIcon = lb.querySelector('#ea-state-icon');
    const stateLabel = lb.querySelector('#ea-state-label');
    const stateDesc = lb.querySelector('#ea-state-desc');

    const energyFill = lb.querySelector('#ea-energy-fill');
    const motionFill = lb.querySelector('#ea-motion-fill');
    const confFill = lb.querySelector('#ea-conf-fill');
    const energyVal = lb.querySelector('#ea-energy-val');
    const motionVal = lb.querySelector('#ea-motion-val');
    const confVal = lb.querySelector('#ea-conf-val');
    const varVal = lb.querySelector('#ea-var-val');
    const calmVal = lb.querySelector('#ea-calm-val');

    const previewPanel = lb.querySelector('#ea-preview-panel');
    const paletteSwatches = lb.querySelector('#ea-palette-swatches');

    const tblPalette = lb.querySelector('#ea-tbl-palette');
    const tblAnim = lb.querySelector('#ea-tbl-anim');
    const tblDensity = lb.querySelector('#ea-tbl-density');
    const tblFont = lb.querySelector('#ea-tbl-font');

    /* Responsive grid */
    const mainGrid = lb.querySelector('#ea-main-grid');
    const resizeObs = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w < 640) {
          mainGrid.style.gridTemplateColumns = '1fr';
        } else {
          mainGrid.style.gridTemplateColumns = '300px 1fr';
        }
      }
    });
    resizeObs.observe(lb);

    /* Apply state visuals */
    function applyState(state) {
      const th = THEMES[state] || THEMES.SCANNING;
      const ll = lang();
      const lv2 = T[ll] || T.en;

      // Badge
      stateBadge.style.background = `linear-gradient(135deg, ${th.bg}, ${th.cardBg})`;
      stateBadge.style.borderColor = th.accent;
      stateBadge.style.boxShadow = th.glow;
      stateIcon.textContent = th.icon;
      stateLabel.style.color = th.accent;
      stateLabel.textContent = lv2.states[state] || state;
      stateDesc.textContent = lv2.stateDesc[state] || '';

      // Preview panel
      previewPanel.style.background = th.gradient || th.bg;
      previewPanel.style.borderColor = th.accent;
      previewPanel.style.boxShadow = th.glow;

      const prevTitle = lb.querySelector('#ea-prev-title');
      const prevBody = lb.querySelector('#ea-prev-body');
      const prevCta = lb.querySelector('#ea-prev-cta');
      const prevSec = lb.querySelector('#ea-prev-sec');

      if (prevTitle) { prevTitle.style.color = th.accent; prevTitle.style.fontSize = th.fontSize; prevTitle.style.fontWeight = th.fontWeight; }
      if (prevBody) { prevBody.style.color = th.text; prevBody.style.fontSize = th.fontSize; }
      if (prevCta) {
        prevCta.style.background = th.btnBg; prevCta.style.color = th.btnText;
        prevCta.style.borderRadius = th.borderRadius;
        prevCta.style.padding = state === 'FATIGUED' ? '0.75em 1.75em' : '0.5em 1.25em';
        prevCta.style.fontSize = th.fontSize; prevCta.style.fontWeight = th.fontWeight;
        prevCta.style.boxShadow = th.glow;
        prevCta.style.animation = state === 'ENERGETIC' ? `ea-neon-pulse ${th.animDuration} ease-in-out infinite` : 'none';
      }
      if (prevSec) {
        prevSec.style.color = th.accent; prevSec.style.borderColor = th.accent;
        prevSec.style.borderRadius = th.borderRadius; prevSec.style.fontSize = th.fontSize;
      }

      ['ea-prev-card1','ea-prev-card2','ea-prev-card3'].forEach(id => {
        const c = lb.querySelector('#' + id);
        if (c) {
          c.style.background = th.cardBg; c.style.borderColor = th.accent;
          c.style.borderRadius = th.borderRadius; c.style.boxShadow = th.glow;
          c.style.padding = th.spacing; c.style.color = th.text; c.style.fontSize = th.fontSize;
        }
      });

      // Palette swatches
      paletteSwatches.innerHTML = [th.bg, th.accent, th.text, th.btnBg, th.cardBg].map(c =>
        `<div style="width:14px;height:14px;border-radius:3px;background:${c};border:1px solid rgba(255,255,255,0.15);"></div>`
      ).join('');

      // Table values
      const densityMap = { CALM:'Spacious', FOCUSED:'Compact', STRESSED:'Spacious', ENERGETIC:'Dense', FATIGUED:'Minimal', SCANNING:'—' };
      if (tblPalette) tblPalette.style.color = th.accent;
      if (tblPalette) tblPalette.textContent = th.label || state;
      if (tblAnim) tblAnim.textContent = th.animDuration;
      if (tblDensity) tblDensity.textContent = densityMap[state] || '—';
      if (tblFont) tblFont.textContent = `${th.fontSize} / w${th.fontWeight}`;

      ENGINE.currentState = state;
    }

    /* Start analysis loop */
    function startAnalysis() {
      const W = 80, H = 45;
      analysisCanvas.width = W;
      analysisCanvas.height = H;

      ENGINE.analysisInterval = setInterval(() => {
        if (!video.videoWidth || !video.readyState || video.paused) return;

        analysisCtx.drawImage(video, 0, 0, W, H);
        const { variance, gray } = computeVariance(analysisCtx, W, H, ENGINE.prevPixels);
        ENGINE.prevPixels = gray;

        // Maintain rolling history
        ENGINE.frameHistory.push(variance);
        if (ENGINE.frameHistory.length > ENGINE.HISTORY_LEN) ENGINE.frameHistory.shift();

        const { state, confidence } = classifyState();

        // Update meters
        const energyPct = ENGINE.energyLevel.toFixed(1);
        const motionPct = ENGINE.motionLevel.toFixed(1);
        energyFill.style.width = energyPct + '%';
        motionFill.style.width = motionPct + '%';
        confFill.style.width = confidence + '%';
        energyVal.textContent = energyPct + '%';
        motionVal.textContent = motionPct + '%';
        confVal.textContent = confidence + '%';
        varVal.textContent = variance.toFixed(2);

        if (ENGINE.calmStartTime) {
          const secs = ((Date.now() - ENGINE.calmStartTime) / 1000).toFixed(1);
          calmVal.textContent = secs + 's';
        } else {
          calmVal.textContent = '—';
        }

        if (state !== ENGINE.currentState) {
          applyState(state);
        }

      }, 100);
    }

    /* Camera toggle */
    function stopCameraLocal() {
      stopCamera();
      video.srcObject = null;
      camOverlay.style.display = 'flex';
      camBtn.textContent = lv.enableCam;
      energyFill.style.width = '0%';
      motionFill.style.width = '0%';
      confFill.style.width = '0%';
      energyVal.textContent = '0%';
      motionVal.textContent = '0%';
      confVal.textContent = '0%';
      varVal.textContent = '—';
      calmVal.textContent = '—';
      applyState('SCANNING');
    }

    camBtn.addEventListener('click', async () => {
      if (ENGINE.running) {
        stopCameraLocal();
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        camError.textContent = lv.camUnsupported;
        camError.style.display = 'block';
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' }
        });
        ENGINE.stream = stream;
        video.srcObject = stream;
        await video.play();
        camOverlay.style.display = 'none';
        ENGINE.running = true;
        camBtn.textContent = lv.disableCam;
        startAnalysis();
        if (window.showToast) window.showToast('📷 ' + (isFR ? 'Webcam active — analyse en cours…' : 'Webcam active — analyzing…'));
      } catch (err) {
        camError.textContent = lv.camBlocked + ' (' + err.message + ')';
        camError.style.display = 'block';
      }
    });

    /* Initial state */
    applyState('SCANNING');

    function buildDemoHTML(css) {
      return `<!DOCTYPE html>
<html lang="en" data-emotion="calm">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Emotion-Adaptive UI Live Demo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
<style>
${css}

/* Extra Demo Layout Styles */
body {
  margin: 0;
  padding: 0;
  background: var(--ea-bg);
  transition: var(--ea-transition);
}
.demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 24px;
  font-family: 'Inter', sans-serif;
  color: var(--ea-text);
  padding: 24px;
}
.control-panel {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.ctrl-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--ea-accent);
  background: var(--ea-secondary);
  color: var(--ea-text);
  font-weight: 600;
  cursor: pointer;
  transition: var(--ea-transition);
}
.ctrl-btn:hover {
  background: var(--ea-accent);
  color: var(--ea-bg);
}
</style>
</head>
<body>
  <div class="demo-container">
    <h1 style="color:var(--ea-accent);transition:var(--ea-transition);">🫀 Emotion-Adaptive Interface</h1>
    <p style="transition:var(--ea-transition);">Use the buttons below to switch emotional profiles and see the UI dynamically adapt:</p>
    
    <div class="control-panel">
      <button class="ctrl-btn" onclick="document.documentElement.setAttribute('data-emotion', 'calm')">😌 Calm</button>
      <button class="ctrl-btn" onclick="document.documentElement.setAttribute('data-emotion', 'focused')">⚡ Focused</button>
      <button class="ctrl-btn" onclick="document.documentElement.setAttribute('data-emotion', 'stressed')">🚨 Stressed</button>
      <button class="ctrl-btn" onclick="document.documentElement.setAttribute('data-emotion', 'energetic')">🔥 Energetic</button>
      <button class="ctrl-btn" onclick="document.documentElement.setAttribute('data-emotion', 'fatigued')">💤 Fatigued</button>
    </div>

    <div class="ea-card" style="max-width: 500px; width: 100%; transition:var(--ea-transition);">
      <h2 style="margin-top:0; margin-bottom:12px; color:var(--ea-accent); transition:var(--ea-transition);">System Status</h2>
      <p style="margin-bottom:16px; opacity:0.8; transition:var(--ea-transition);">The interface adapts its font size, spacing, animations, and color scheme based on user stress levels, lighting, and speed of interaction.</p>
      <button class="ea-btn" style="transition:var(--ea-transition);">Execute Action</button>
    </div>
  </div>
</body>
</html>`;
    }

    lb.querySelector('#ea-export-css').addEventListener('click', () => {
      const css = generateAdaptiveCSS();
      if (window.editor && typeof window.editor.setValue === 'function') {
        window.editor.setValue(buildDemoHTML(css));
        if (typeof window.runPreview === 'function') window.runPreview();
        if (window.showToast) window.showToast('✅ ' + lv.cssExported);
      } else {
        // fallback: download
        const blob = new Blob([css], { type: 'text/css' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'emotion-adaptive.css';
        a.click();
        URL.revokeObjectURL(a.href);
        if (window.showToast) window.showToast('💾 emotion-adaptive.css downloaded!');
      }
    });

    /* Copy CSS */
    lb.querySelector('#ea-copy-css').addEventListener('click', () => {
      const css = generateAdaptiveCSS();
      navigator.clipboard.writeText(css).then(() => {
        if (window.showToast) window.showToast('✅ ' + lv.copied);
      }).catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = css;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (window.showToast) window.showToast('✅ ' + lv.copied);
      });
    });

    /* Load standalone */
    lb.querySelector('#ea-load-standalone').addEventListener('click', () => {
      if (window.editor && typeof window.editor.setValue === 'function') {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (typeof window.runPreview === 'function') window.runPreview();
        if (window.showToast) window.showToast('🚀 ' + lv.demoLoaded);
      } else {
        if (window.showToast) window.showToast('⚠️ Editor not available.');
      }
    });

    /* Cleanup removed */

    /* Toast */
    if (window.showToast) window.showToast('✅ Emotion-Adaptive UI Engine initialized.');
  };

})();

