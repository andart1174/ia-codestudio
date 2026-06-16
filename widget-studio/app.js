// JavaScript Application Logic for AI Ad & Widget Studio

// 1. Language Translation Dictionary
const translations = {
    en: {
        nav_title: "AI AD & WIDGET STUDIO",
        config_title: "Widget Settings",
        config_subtitle: "Customize your interactive ad widget in real-time",
        label_template: "Choose Template",
        tpl_holo_title: "3D Hologram Card",
        tpl_holo_desc: "Tilting 3D card with floating mesh & particles",
        tpl_part_title: "Particle Field Banner",
        tpl_part_desc: "Swarming particles reacting to cursor interaction",
        tpl_cyber_title: "Cyberpunk Glitch",
        tpl_cyber_desc: "Neon frame with animated glitch text & grid",
        tpl_steam_title: "Steampunk Chrono",
        tpl_steam_desc: "Animated 3D gear clock showing local time",
        tpl_game_title: "Retro Game Ad",
        tpl_game_desc: "Interactive Space Shooter banner with CTA popup",
        tpl_liquid_title: "Liquid Wave Grid",
        tpl_liquid_desc: "Interactive ripple grid responding to mouse moves",
        tpl_matrix_title: "Matrix Code Rain",
        tpl_matrix_desc: "Falling digital rain with custom characters",
        tpl_audio_title: "3D Audio Visualizer",
        tpl_audio_desc: "3D particles deforming to microphone inputs",
        sec_content: "Content",
        label_title: "Headline / Title",
        label_desc: "Description / Subtitle",
        label_btn: "Button Text",
        label_url: "Button Action URL",
        sec_design: "Design & Visuals",
        label_color_primary: "Primary Color",
        label_color_accent: "Accent Color",
        label_opacity: "Glass Background Opacity",
        label_glow: "Neon Border Glow",
        sec_3d: "3D Settings",
        label_shape: "Floating 3D Shape",
        shape_torus: "Rotating Torus",
        shape_knot: "Torus Knot",
        shape_cube: "Spinning Cube",
        shape_octa: "Octahedron",
        label_speed: "3D Rotation Speed",
        label_particles: "Particle Density",
        sec_steampunk: "Steampunk Clock Settings",
        label_steam_theme: "Metal Theme",
        theme_bronze: "Vintage Bronze",
        theme_gold: "Polished Gold",
        theme_steel: "Industrial Steel",
        label_steam_particles: "Rising Steam Particles",
        label_steam_speed: "Gears Spin Speed",
        sec_game: "Retro Game Settings",
        label_difficulty: "Game Difficulty",
        diff_easy: "Easy",
        diff_normal: "Normal",
        diff_hard: "Hard",
        label_ship_color: "Spaceship Color",
        label_game_target: "Highscore CTA Threshold",
        sec_liquid: "Liquid Grid Settings",
        label_liquid_res: "Grid Resolution",
        res_low: "Low Resolution",
        res_med: "Standard Grid",
        res_high: "Ultra High Resolution",
        label_liquid_freq: "Wave Spring Elasticity",
        sec_matrix: "Matrix Rain Settings",
        label_matrix_chars: "Rain Character Set",
        chars_custom: "Custom Text",
        label_matrix_custom: "Enter Custom Letters",
        label_matrix_size: "Rain Column Font Size",
        label_matrix_speed: "Rain Speed",
        sec_audio: "Audio Visualizer Settings",
        label_audio_mic: "Enable Live Microphone Input",
        label_audio_type: "Visualizer Shape",
        audio_sphere: "3D Dynamic Sphere",
        audio_ring: "Equalizer Ring",
        audio_wave: "Symmetric Wave Grid",
        label_sensitivity: "Audio Sensitivity",
        tpl_scratch_title: "Scratch Card Reveal",
        tpl_scratch_desc: "Interactive scratch-off layer that rewards user with promo reveal & confetti",
        tpl_text_title: "Particle Text Exploder",
        tpl_text_desc: "Headline letters assembled by interactive particles that explode on hover",
        sec_scratch: "Scratch Card Settings",
        label_scratch_brush: "Scratch Brush Size",
        label_scratch_color: "Scratch Surface Color",
        label_scratch_threshold: "Reveal Threshold",
        sec_text_exp: "Particle Text Settings",
        label_text_density: "Particle Density",
        label_text_radius: "Interaction Radius",
        label_text_force: "Explode Force",
        sec_marketing: "Growth & Referral",
        label_badge: "Include Support Watermark",
        badge_desc: "Required for the free version. Removing this link locks the widget.",
        free_license_note: "💡 Free License: You can use all interactive templates for free on your site, but the \"Widget by IA Code Studio\" watermark must remain intact in your code. Removing or hiding it will lock the widget. Upgrade to Premium to remove the branding.",
        preview_title: "Live Preview",
        preview_subtitle: "Test animations, cursor effects and button click events",
        resp_full: "Full Width",
        resp_card: "Card",
        resp_banner: "Leaderboard",
        code_title: "Integration Code",
        code_subtitle: "Copy this self-contained HTML directly into your web project",
        btn_copy: "Copy Code",
        btn_copied: "Copied! ✅",
        btn_download: "Download HTML File",
        guide_title: "How to Integrate:",
        guide_step1: "Copy the generated code above.",
        guide_step2: "Paste it inside the <body> of your website where you want the banner to appear.",
        guide_step3: "For iframe embedding, download the HTML file, host it, and link it."
    },
    fr: {
        nav_title: "AI AD & WIDGET STUDIO",
        config_title: "Paramètres du widget",
        config_subtitle: "Personnalisez votre widget publicitaire en temps réel",
        label_template: "Choisir un modèle",
        tpl_holo_title: "Carte Hologramme 3D",
        tpl_holo_desc: "Carte 3D inclinable avec maillage flottant & particule",
        tpl_part_title: "Bannière Champ de Particules",
        tpl_part_desc: "Nuée de particules réagissant aux mouvements du curseur",
        tpl_cyber_title: "Glitch Cyberpunk",
        tpl_cyber_desc: "Cadre néon avec texte glitch animé & grille",
        tpl_steam_title: "Chrono Steampunk",
        tpl_steam_desc: "Horloge mecanic 3D animée indiquant l'heure locale",
        tpl_game_title: "Réclame Retro Game",
        tpl_game_desc: "Jeu Space Shooter interactif avec popup CTA",
        tpl_liquid_title: "Grille Liquide",
        tpl_liquid_desc: "Grille d'ondes réagissant au mouvement du curseur",
        tpl_matrix_title: "Pluie Matrix Code",
        tpl_matrix_desc: "Pluie de caractères numériques animée personalisable",
        tpl_audio_title: "Visualisateur Audio 3D",
        tpl_audio_desc: "Particules 3D réagissant au microphone en direct",
        sec_content: "Contenu",
        label_title: "Titre principal / Headline",
        label_desc: "Description / Sous-titre",
        label_btn: "Texte du bouton",
        label_url: "URL d'action du bouton",
        sec_design: "Design & Visuels",
        label_color_primary: "Couleur principale",
        label_color_accent: "Couleur d'accent",
        label_opacity: "Opacité du fond en verre",
        label_glow: "Glow de bordure néon",
        sec_3d: "Paramètres 3D",
        label_shape: "Forme 3D flottante",
        shape_torus: "Torus rotatif",
        shape_knot: "Nœud Torus (Knot)",
        shape_cube: "Cube rotatif",
        shape_octa: "Octaèdre",
        label_speed: "Vitesse de rotation 3D",
        label_particles: "Densité de particules",
        sec_steampunk: "Options Horloge Steampunk",
        label_steam_theme: "Thème de Métal",
        theme_bronze: "Bronze Vintage",
        theme_gold: "Or Poli",
        theme_steel: "Acier Industriel",
        label_steam_particles: "Particules de Vapeur",
        label_steam_speed: "Vitesse de rotation des rouages",
        sec_game: "Options Jeu Retro",
        label_difficulty: "Difficulté du Jeu",
        diff_easy: "Facile",
        diff_normal: "Normal",
        diff_hard: "Difficile",
        label_ship_color: "Couleur du Vaisseau",
        label_game_target: "Seuil CTA (Score)",
        sec_liquid: "Options Grille Liquide",
        label_liquid_res: "Résolution Grille",
        res_low: "Basse Résolution",
        res_med: "Grille Standard",
        res_high: "Haute Résolution",
        label_liquid_freq: "Elasticité des ressorts",
        sec_matrix: "Options Pluie Matrix",
        label_matrix_chars: "Jeu de Caractères",
        chars_custom: "Texte Personnalisé",
        label_matrix_custom: "Lettres personnalisées",
        label_matrix_size: "Taille des Caractères",
        label_matrix_speed: "Vitesse de Pluie",
        sec_audio: "Options Visualisateur Audio",
        label_audio_mic: "Activer le Micro en Direct",
        label_audio_type: "Forme Visuelle",
        audio_sphere: "Sphère 3D Dynamique",
        audio_ring: "Anneau Equalizer",
        audio_wave: "Grille d'Ondes Symétriques",
        label_sensitivity: "Sensibilité Audio",
        tpl_scratch_title: "Carte à Gratter Révélation",
        tpl_scratch_desc: "Couche à gratter interactive avec révélation de promo et confettis",
        tpl_text_title: "Exploseur de Texte",
        tpl_text_desc: "Titre assemblé par des particules interactives qui explosent au survol",
        sec_scratch: "Options Carte à Gratter",
        label_scratch_brush: "Taille du Grattoir",
        label_scratch_color: "Couleur de la Surface",
        label_scratch_threshold: "Seuil de Révélation",
        sec_text_exp: "Options Particules de Texte",
        label_text_density: "Densité de Particules",
        label_text_radius: "Rayon d'Interaction",
        label_text_force: "Force d'Explosion",
        sec_marketing: "Croissance & Parrainage",
        label_badge: "Filigrane de support",
        badge_desc: "Obligatoire pour la version gratuite. Retirer ce lien bloque le widget.",
        free_license_note: "💡 Licence Gratuite : Vous pouvez utiliser tous les modèles interactifs gratuitement sur votre site, mais le filigrane \"Widget by IA Code Studio\" doit rester intact. Le retirer ou le masquer bloquera le widget. Passez à la version Premium pour retirer la marque.",
        preview_title: "Aperçu en temps réel",
        preview_subtitle: "Testez les animations, les effets du curseur et les clics",
        resp_full: "Plein écran",
        resp_card: "Carte",
        resp_banner: "Bannière standard",
        code_title: "Code d'intégration",
        code_subtitle: "Copiez ce code HTML autonome directement dans votre projet",
        btn_copy: "Copier le code",
        btn_copied: "Copié ! ✅",
        btn_download: "Télécharger le fichier HTML",
        guide_title: "Comment intégrer :",
        guide_step1: "Copiez le code généré ci-dessus.",
        guide_step2: "Collez-le dans la balise <body> de votre site là où le widget doit s'afficher.",
        guide_step3: "Pour une intégration iframe, téléchargez le fichier HTML, hébergez-le et liez-le."
    }
};

let currentLang = 'en';

// 2. Application State
const state = {
    template: 'hologram', // hologram, particles, cyberpunk, steampunk, game, liquid, matrix, audio
    title: 'FUTURE IS NOW',
    desc: 'Build premium 3D websites with AI assistance. Free access today.',
    btnText: 'Try For Free',
    btnUrl: 'https://ia-codestudio.com',
    colorPrimary: '#06b6d4',
    colorAccent: '#8b5cf6',
    bgOpacity: 5,
    glowEnabled: true,
    
    // Hologram Specific
    shape: 'torus',
    speedMultiplier: 4,
    particlesCount: 100,

    // Steampunk Specific
    steamTheme: 'bronze',
    steamParticlesEnabled: true,
    steamSpeed: 3,

    // Game Specific
    gameDifficulty: 'normal',
    gameShipColor: '#10b981',
    gameTargetScore: 15,

    // Liquid Grid Specific
    liquidRes: 'med',
    liquidFreq: 45,

    // Matrix Specific
    matrixChars: 'binary',
    matrixCustomText: 'IACODE',
    matrixSize: 14,
    matrixSpeed: 5,

    // Audio Specific
    audioMicEnabled: true,
    audioType: 'sphere',
    audioSensitivity: 5,

    // Scratch Card Specific
    scratchBrushSize: 30,
    scratchColor: '#a1a1aa',
    scratchThreshold: 50,

    // Particle Text Specific
    textDensity: 400,
    textRadius: 80,
    textForce: 6,
    
    badgeEnabled: true
};

// 3. Document Elements
const els = {
    titleInput: document.getElementById('input-title'),
    descInput: document.getElementById('input-desc'),
    btnInput: document.getElementById('input-btn'),
    urlInput: document.getElementById('input-url'),
    colorPrimaryInput: document.getElementById('input-color-primary'),
    colorAccentInput: document.getElementById('input-color-accent'),
    colorPrimaryVal: document.querySelector('#input-color-primary + .color-value'),
    colorAccentVal: document.querySelector('#input-color-accent + .color-value'),
    bgOpacityInput: document.getElementById('input-bg-opacity'),
    bgOpacityVal: document.querySelector('#input-bg-opacity + .slider-value'),
    glowInput: document.getElementById('input-glow'),
    
    // 3D
    shapeInput: document.getElementById('input-shape'),
    speedInput: document.getElementById('input-speed'),
    speedVal: document.querySelector('#input-speed + .slider-value'),
    particlesInput: document.getElementById('input-particles'),
    particlesVal: document.querySelector('#input-particles + .slider-value'),
    
    // Steampunk
    steamThemeInput: document.getElementById('input-steam-theme'),
    steamParticlesInput: document.getElementById('input-steam-particles'),
    steamSpeedInput: document.getElementById('input-steam-speed'),
    steamSpeedVal: document.querySelector('#input-steam-speed + .slider-value'),

    // Game
    gameDifficultyInput: document.getElementById('input-game-difficulty'),
    gameShipColorInput: document.getElementById('input-game-ship-color'),
    gameTargetInput: document.getElementById('input-game-target'),
    gameTargetVal: document.querySelector('#input-game-target + .slider-value'),

    // Liquid
    liquidResInput: document.getElementById('input-liquid-res'),
    liquidFreqInput: document.getElementById('input-liquid-frequency'),
    liquidFreqVal: document.querySelector('#input-liquid-frequency + .slider-value'),

    // Matrix
    matrixCharsInput: document.getElementById('input-matrix-chars'),
    matrixCustomGroup: document.getElementById('group-matrix-custom-text'),
    matrixCustomInput: document.getElementById('input-matrix-custom'),
    matrixSizeInput: document.getElementById('input-matrix-size'),
    matrixSizeVal: document.querySelector('#input-matrix-size + .slider-value'),
    matrixSpeedInput: document.getElementById('input-matrix-speed'),
    matrixSpeedVal: document.querySelector('#input-matrix-speed + .slider-value'),

    // Audio
    audioMicInput: document.getElementById('input-audio-mic'),
    audioTypeInput: document.getElementById('input-audio-type'),
    audioSensitivityInput: document.getElementById('input-audio-sensitivity'),
    audioSensitivityVal: document.querySelector('#input-audio-sensitivity + .slider-value'),

    // Scratch Card
    scratchBrushInput: document.getElementById('input-scratch-brush'),
    scratchBrushVal: document.querySelector('#input-scratch-brush + .slider-value'),
    scratchColorInput: document.getElementById('input-scratch-color'),
    scratchThresholdInput: document.getElementById('input-scratch-threshold'),
    scratchThresholdVal: document.querySelector('#input-scratch-threshold + .slider-value'),

    // Particle Text
    textDensityInput: document.getElementById('input-text-density'),
    textDensityVal: document.querySelector('#input-text-density + .slider-value'),
    textRadiusInput: document.getElementById('input-text-radius'),
    textRadiusVal: document.querySelector('#input-text-radius + .slider-value'),
    textForceInput: document.getElementById('input-text-force'),
    textForceVal: document.querySelector('#input-text-force + .slider-value'),

    badgeInput: document.getElementById('input-badge'),
    
    // Outputs
    iframe: document.getElementById('preview-iframe'),
    codeOutput: document.getElementById('code-output'),
    copyBtn: document.getElementById('btn-copy-code'),
    downloadBtn: document.getElementById('btn-download-html'),
    
    // Panels
    section3D: document.getElementById('section-3d-settings'),
    sectionSteampunk: document.getElementById('section-steampunk-settings'),
    sectionGame: document.getElementById('section-game-settings'),
    sectionLiquid: document.getElementById('section-liquid-settings'),
    sectionMatrix: document.getElementById('section-matrix-settings'),
    sectionAudio: document.getElementById('section-audio-settings'),
    sectionScratch: document.getElementById('section-scratch-settings'),
    sectionTextExp: document.getElementById('section-text-settings'),
    groupDesc: document.getElementById('group-desc'),
    groupBgOpacity: document.getElementById('group-bg-opacity'),
    groupGlow: document.getElementById('group-glow'),
    
    templates: document.querySelectorAll('.template-card'),
    respBtns: document.querySelectorAll('.resp-btn'),
    iframeWrapper: document.querySelector('.iframe-wrapper'),
    langBtns: document.querySelectorAll('.lang-btn')
};

// 4. Initialization & Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    initLanguages();
    bindEvents();
    updateUIFromState();
    generateWidget();
});

function initLanguages() {
    els.langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            els.langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.getAttribute('data-lang');
            applyTranslations(currentLang);
        });
    });
    applyTranslations(currentLang);
}

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

function bindEvents() {
    const bindInput = (el, stateKey, valTransformer = null) => {
        if (!el) return;
        el.addEventListener('input', (e) => {
            let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (valTransformer) val = valTransformer(val);
            state[stateKey] = val;
            updateUIFromState();
            generateWidget();
        });
    };

    // Bind all form controls
    bindInput(els.titleInput, 'title');
    bindInput(els.descInput, 'desc');
    bindInput(els.btnInput, 'btnText');
    bindInput(els.urlInput, 'btnUrl');
    bindInput(els.colorPrimaryInput, 'colorPrimary');
    bindInput(els.colorAccentInput, 'colorAccent');
    bindInput(els.bgOpacityInput, 'bgOpacity', parseInt);
    bindInput(els.glowInput, 'glowEnabled');
    
    bindInput(els.shapeInput, 'shape');
    bindInput(els.speedInput, 'speedMultiplier', parseInt);
    bindInput(els.particlesInput, 'particlesCount', parseInt);
    
    bindInput(els.steamThemeInput, 'steamTheme');
    bindInput(els.steamParticlesInput, 'steamParticlesEnabled');
    bindInput(els.steamSpeedInput, 'steamSpeed', parseInt);

    bindInput(els.gameDifficultyInput, 'gameDifficulty');
    bindInput(els.gameShipColorInput, 'gameShipColor');
    bindInput(els.gameTargetInput, 'gameTargetScore', parseInt);

    bindInput(els.liquidResInput, 'liquidRes');
    bindInput(els.liquidFreqInput, 'liquidFreq', parseInt);

    bindInput(els.matrixCharsInput, 'matrixChars');
    bindInput(els.matrixCustomInput, 'matrixCustomText');
    bindInput(els.matrixSizeInput, 'matrixSize', parseInt);
    bindInput(els.matrixSpeedInput, 'matrixSpeed', parseInt);

    bindInput(els.audioMicInput, 'audioMicEnabled');
    bindInput(els.audioTypeInput, 'audioType');
    bindInput(els.audioSensitivityInput, 'audioSensitivity', parseInt);

    bindInput(els.scratchBrushInput, 'scratchBrushSize', parseInt);
    bindInput(els.scratchColorInput, 'scratchColor');
    bindInput(els.scratchThresholdInput, 'scratchThreshold', parseInt);

    bindInput(els.textDensityInput, 'textDensity', parseInt);
    bindInput(els.textRadiusInput, 'textRadius', parseInt);
    bindInput(els.textForceInput, 'textForce', parseInt);

    bindInput(els.badgeInput, 'badgeEnabled');

    // Template selection
    els.templates.forEach(card => {
        card.addEventListener('click', () => {
            els.templates.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.template = card.getAttribute('data-template');
            
            // Hide all specific sections first
            els.section3D.style.display = 'none';
            els.sectionSteampunk.style.display = 'none';
            els.sectionGame.style.display = 'none';
            els.sectionLiquid.style.display = 'none';
            els.sectionMatrix.style.display = 'none';
            els.sectionAudio.style.display = 'none';
            els.sectionScratch.style.display = 'none';
            els.sectionTextExp.style.display = 'none';
            
            // Show standard fields by default
            els.groupDesc.style.display = 'block';
            els.groupBgOpacity.style.display = 'block';
            els.groupGlow.style.display = 'block';
            
            // Show selected template settings
            if (state.template === 'hologram') {
                els.section3D.style.display = 'block';
            } else if (state.template === 'steampunk') {
                els.sectionSteampunk.style.display = 'block';
                els.groupDesc.style.display = 'none'; // Clocks do not need subtitle desc inputs
            } else if (state.template === 'game') {
                els.sectionGame.style.display = 'block';
            } else if (state.template === 'liquid') {
                els.sectionLiquid.style.display = 'block';
            } else if (state.template === 'matrix') {
                els.sectionMatrix.style.display = 'block';
                els.groupDesc.style.display = 'none'; // Rain is self-contained
            } else if (state.template === 'audio') {
                els.sectionAudio.style.display = 'block';
            } else if (state.template === 'scratch') {
                els.sectionScratch.style.display = 'block';
            } else if (state.template === 'textExploder') {
                els.sectionTextExp.style.display = 'block';
                els.groupDesc.style.display = 'none'; // text exploder uses headline particles
            }
            
            generateWidget();
        });
    });

    // Responsive toolbar size
    els.respBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.respBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const w = btn.getAttribute('data-width');
            const h = btn.getAttribute('data-height');
            
            els.iframeWrapper.style.width = w;
            els.iframeWrapper.style.height = h === '100%' ? '100%' : h;
        });
    });

    // Copy to clipboard
    els.copyBtn.addEventListener('click', () => {
        els.codeOutput.select();
        navigator.clipboard.writeText(els.codeOutput.value).then(() => {
            const originalIcon = els.copyBtn.querySelector('.copy-icon').textContent;
            const originalText = els.copyBtn.querySelector('[data-i18n]').textContent;
            
            els.copyBtn.classList.add('copied');
            els.copyBtn.querySelector('.copy-icon').textContent = '✅';
            els.copyBtn.querySelector('[data-i18n]').textContent = translations[currentLang].btn_copied || 'Copied! ✅';
            
            setTimeout(() => {
                els.copyBtn.classList.remove('copied');
                els.copyBtn.querySelector('.copy-icon').textContent = originalIcon;
                els.copyBtn.querySelector('[data-i18n]').textContent = originalText;
                applyTranslations(currentLang);
            }, 2000);
        });
    });

    // Download HTML file
    els.downloadBtn.addEventListener('click', () => {
        const htmlContent = els.codeOutput.value;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.template}-widget.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function updateUIFromState() {
    // Sync text labels from state values
    els.colorPrimaryVal.textContent = state.colorPrimary.toUpperCase();
    els.colorAccentVal.textContent = state.colorAccent.toUpperCase();
    els.bgOpacityVal.textContent = `${state.bgOpacity}%`;
    els.speedVal.textContent = `x${state.speedMultiplier}`;
    els.particlesVal.textContent = state.particlesCount;
    
    // Steampunk
    els.steamSpeedVal.textContent = `x${state.steamSpeed}`;
    
    // Game
    els.gameShipColorInput.nextElementSibling.textContent = state.gameShipColor.toUpperCase();
    els.gameTargetVal.textContent = `${state.gameTargetScore} pts`;
    
    // Liquid
    els.liquidFreqVal.textContent = `${state.liquidFreq}%`;
    
    // Matrix
    if (state.matrixChars === 'custom') {
        els.matrixCustomGroup.style.display = 'block';
    } else {
        els.matrixCustomGroup.style.display = 'none';
    }
    els.matrixSizeVal.textContent = `${state.matrixSize}px`;
    els.matrixSpeedVal.textContent = `x${state.matrixSpeed}`;
    
    // Audio
    els.audioSensitivityVal.textContent = `x${state.audioSensitivity}`;

    // Scratch Card
    els.scratchBrushVal.textContent = `${state.scratchBrushSize}px`;
    els.scratchColorInput.nextElementSibling.textContent = state.scratchColor.toUpperCase();
    els.scratchThresholdVal.textContent = `${state.scratchThreshold}%`;

    // Particle Text
    els.textDensityVal.textContent = state.textDensity;
    els.textRadiusVal.textContent = `${state.textRadius}px`;
    els.textForceVal.textContent = `x${state.textForce}`;

    // Check Premium status for watermark removal
    const isPremium = checkIsPremium();
    if (!isPremium) {
        state.badgeEnabled = true;
        els.badgeInput.checked = true;
        els.badgeInput.disabled = true;
        
        const badgeLabel = document.querySelector('label[for="input-badge"]');
        if (badgeLabel && !badgeLabel.innerHTML.includes('🔒')) {
            badgeLabel.innerHTML = badgeLabel.innerHTML + ' <span style="color:#fbbf24; font-size:11px;" title="Premium only">🔒 PRO</span>';
        }
    } else {
        els.badgeInput.disabled = false;
    }
}

// 5. Code Generators per Template
function generateWidget() {
    let html = '';
    if (state.template === 'hologram') {
        html = buildHologramCode();
    } else if (state.template === 'particles') {
        html = buildParticlesCode();
    } else if (state.template === 'cyberpunk') {
        html = buildCyberpunkCode();
    } else if (state.template === 'steampunk') {
        html = buildSteampunkCode();
    } else if (state.template === 'game') {
        html = buildGameCode();
    } else if (state.template === 'liquid') {
        html = buildLiquidCode();
    } else if (state.template === 'matrix') {
        html = buildMatrixCode();
    } else if (state.template === 'audio') {
        html = buildAudioCode();
    } else if (state.template === 'scratch') {
        html = buildScratchCode();
    } else if (state.template === 'textExploder') {
        html = buildTextExploderCode();
    }
    
    els.codeOutput.value = html;
    els.iframe.srcdoc = html;
}

// ==========================================
// TEMPLATE BUILDERS
// ==========================================

function checkIsPremium() {
    const session = localStorage.getItem('genius_session');
    if (!session) return false;
    try {
        const user = JSON.parse(session);
        const email = user.email.toLowerCase();
        const premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        const record = premiumList.find(p => p.email.toLowerCase() === email);
        if (record) {
            const now = Date.now();
            const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
            const daysLeft = Math.ceil((expiry - now) / 86400000);
            const isUnlimited = record.days === 9999;
            if (isUnlimited || daysLeft > 0) return true;
        }
    } catch (e) {
        console.error(e);
    }
    const subDate = localStorage.getItem('ia_premium_sub_date');
    if (subDate) {
        const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
        const left = 30 - daysPassed;
        if (left > 0) return true;
    }
    return false;
}

function getBrandingVerificationScript() {
    if (!state.badgeEnabled) return '';
    return `
        function verifyBranding() {
            const badge = document.querySelector('.referral-badge');
            const link = badge ? badge.getAttribute('href') : '';
            if (!badge || !link || !link.includes('ia-codestudio.com')) {
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(3,7,18,0.95); backdrop-filter:blur(10px); z-index:999999; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:sans-serif; text-align:center; padding:20px;';
                overlay.innerHTML = '<div style="background:#1e1b4b; border:1px solid #4338ca; padding:30px; border-radius:16px; max-width:400px; box-shadow:0 10px 25px rgba(0,0,0,0.5);"><span style="font-size:3rem;">⚠️</span><h3 style="margin:15px 0 10px; font-size:18px;">Branding Required / Logo Requis</h3><p style="font-size:13px; color:#94a3b8; line-height:1.5; margin-bottom:20px;">Please restore the "Powered by IA Code Studio" watermark badge or upgrade to Pro to remove it.<br><br>Veuillez restaurer le logo de support "Powered by IA Code Studio" ou passer à la version Pro pour le retirer.</p><a href="https://ia-codestudio.com" target="_blank" style="display:inline-block; background:#3b82f6; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:bold; font-size:13px;">Get Pro License / Version Pro</a></div>';
                document.body.appendChild(overlay);
                document.body.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }, true);
            }
        }
        setTimeout(verifyBranding, 1000);
    `;
}

function getBadgeHTML() {
    if (!state.badgeEnabled) return '';
    return `
    <a href="https://ia-codestudio.com" target="_blank" class="referral-badge">
        <span class="ref-icon">⚡</span>
        <span class="ref-text">Widget by <b>IA Code Studio</b></span>
    </a>
    `;
}

function getBadgeCSS() {
    if (!state.badgeEnabled) return '';
    return `
        .referral-badge {
            position: absolute;
            bottom: 12px;
            right: 12px;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            text-decoration: none;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        .referral-badge:hover {
            border-color: ${state.colorPrimary};
            color: #fff;
            box-shadow: 0 0 10px ${state.colorPrimary}33;
            transform: translateY(-1px);
        }
        .ref-icon {
            color: ${state.colorAccent};
            filter: drop-shadow(0 0 2px ${state.colorAccent});
        }
    `;
}

function buildHologramCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 30px ${state.colorPrimary}25, inset 0 0 1px ${state.colorPrimary}80;` : '';
    const borderGlow = state.glowEnabled ? `border: 1px solid ${state.colorPrimary}40;` : 'border: 1px solid rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Hologram Ad</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(circle at center, #0f1324 0%, #060810 100%);
            overflow-y: auto; overflow-x: hidden;
            font-family: 'Inter', sans-serif;
            perspective: 1000px;
        }

        .card-container {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(255, 255, 255, ${state.bgOpacity / 100});
            backdrop-filter: blur(20px);
            ${borderGlow}
            ${cardGlow}
            transform-style: preserve-3d;
            transition: transform 0.15s ease, border-color 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            overflow: hidden;
            user-select: none;
            cursor: pointer;
        }

        @media (max-height: 250px) {
            body {
                align-items: center;
                justify-content: center;
                padding: 5px;
            }
            .card-container {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }
            #webgl-canvas {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                opacity: 0.3;
                z-index: 1;
            }
            .card-info {
                position: relative;
                z-index: 5;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                transform: translateZ(20px);
                text-align: left;
            }
            .card-title {
                font-size: 16px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
            }
            .card-desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                padding: 0;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .card-btn {
                padding: 8px 16px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        #webgl-canvas {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 60%;
            pointer-events: none;
            z-index: 1;
        }

        .card-info {
            position: relative;
            z-index: 5;
            transform: translateZ(50px);
            text-align: center;
        }

        .card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 30%, ${state.colorPrimary} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
            text-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .card-desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 24px;
            padding: 0 10px;
        }

        .card-btn {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 15px ${state.colorPrimary}40;
            transition: all 0.3s ease;
            transform: translateZ(20px);
        }

        .card-btn:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}70;
            transform: translateZ(30px) scale(1.05);
        }

        .card-btn:active {
            transform: translateZ(15px) scale(0.98);
        }

        .card-container::after {
            content: '';
            position: absolute;
            top: -20%; left: -20%;
            width: 140%; height: 140%;
            background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%);
            pointer-events: none;
            z-index: 0;
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="card-container" id="tilt-card">
        <canvas id="webgl-canvas"></canvas>
        <div class="card-info">
            <h2 class="card-title">${state.title}</h2>
            <p class="card-desc">${state.desc}</p>
            <a href="${state.btnUrl}" target="_blank" class="card-btn">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        ${getBrandingVerificationScript()}
        const card = document.getElementById('tilt-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;
            card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open('${state.btnUrl}', '_blank');
            }
        });

        const canvas = document.getElementById('webgl-canvas');
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 6.5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        let geometry;
        const shapeType = '${state.shape}';
        
        if (shapeType === 'torus') {
            geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 64);
        } else if (shapeType === 'knot') {
            geometry = new THREE.TorusKnotGeometry(0.9, 0.3, 100, 16);
        } else if (shapeType === 'cube') {
            geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        } else if (shapeType === 'octahedron') {
            geometry = new THREE.OctahedronGeometry(1.5);
        }

        const material = new THREE.MeshPhongMaterial({
            color: '${state.colorPrimary}',
            emissive: '${state.colorPrimary}',
            emissiveIntensity: 0.15,
            specular: '${state.colorAccent}',
            shininess: 40,
            wireframe: true,
            transparent: true,
            opacity: 0.85
        });

        const mainMesh = new THREE.Mesh(geometry, material);
        scene.add(mainMesh);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight('${state.colorPrimary}', 2, 50);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight('${state.colorAccent}', 2, 50);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        const particleCount = ${state.particlesCount};
        const pGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const pSpeeds = [];

        for (let i = 0; i < particleCount * 3; i += 3) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 2.0 + Math.random() * 1.5;

            positions[i] = r * Math.sin(phi) * Math.cos(theta);
            positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i+2] = r * Math.cos(phi);

            pSpeeds.push({
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.005
            });
        }

        pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pMaterial = new THREE.PointsMaterial({
            color: '${state.colorAccent}',
            size: 0.05,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(pGeometry, pMaterial);
        scene.add(particles);

        window.addEventListener('resize', () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });

        const speed = ${state.speedMultiplier / 400};
        function animate() {
            requestAnimationFrame(animate);
            mainMesh.rotation.y += speed;
            mainMesh.rotation.x += speed * 0.6;
            particles.rotation.y -= speed * 0.15;

            const posAttr = pGeometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                let px = posAttr.getX(i);
                let py = posAttr.getY(i);
                let pz = posAttr.getZ(i);

                px += pSpeeds[i].x;
                py += pSpeeds[i].y;
                pz += pSpeeds[i].z;

                const dist = Math.sqrt(px*px + py*py + pz*pz);
                if (dist > 3.5 || dist < 1.5) {
                    pSpeeds[i].x *= -1;
                    pSpeeds[i].y *= -1;
                    pSpeeds[i].z *= -1;
                }

                posAttr.setXYZ(i, px, py, pz);
            }
            posAttr.needsUpdate = true;
            renderer.render(scene, camera);
        }
        animate();
    </script>
</body>
</html>`;
}

function buildParticlesCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${state.colorPrimary}30; border-color: ${state.colorPrimary}50;` : 'border-color: rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Particle Banner</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background-color: #06070c;
            overflow-y: auto; overflow-x: hidden;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #particle-canvas {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .banner-content {
            position: relative;
            z-index: 10;
            width: 90%;
            max-width: 760px;
            padding: 40px 50px;
            border-radius: 20px;
            background: rgba(255, 255, 255, ${state.bgOpacity / 100});
            border: 1px solid rgba(255,255,255,0.06);
            backdrop-filter: blur(15px);
            text-align: center;
            transition: all 0.3s ease;
            ${cardGlow}
        }

        @media (max-height: 250px) {
            .banner-content {
                width: 100%;
                height: 100%;
                border-radius: 0;
                padding: 10px 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                box-shadow: none;
                border: none;
                background: rgba(255, 255, 255, 0.02);
            }
            .title {
                font-size: 18px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
                text-align: left;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                max-width: 50%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding: 0;
            }
            .btn {
                padding: 8px 20px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 38px;
            font-weight: 800;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #ffffff 40%, ${state.colorPrimary} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
        }

        .desc {
            font-size: 15px;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 28px;
            max-width: 580px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
            box-shadow: 0 4px 15px ${state.colorPrimary}40;
            transition: all 0.3s ease;
        }

        .btn:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}70;
            transform: translateY(-2px);
        }

        .btn:active {
            transform: translateY(0);
        }

        @media (max-width: 600px) {
            .banner-content { padding: 30px 20px; }
            .title { font-size: 28px; }
            .desc { font-size: 13px; }
        }

        ${getBadgeCSS()}
    </style>
</head>
<body>

    <canvas id="particle-canvas"></canvas>

    <div class="banner-content">
        <h1 class="title">${state.title}</h1>
        <p class="desc">${state.desc}</p>
        <a href="${state.btnUrl}" target="_blank" class="btn">${state.btnText}</a>
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const numParticles = 80;
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.color = Math.random() > 0.4 ? '${state.colorPrimary}' : '${state.colorAccent}';
                this.opacity = Math.random() * 0.6 + 0.2;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }

            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        
                        this.x -= Math.cos(angle) * force * 3;
                        this.y -= Math.sin(angle) * force * 3;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        function connect() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.sqrt(
                        Math.pow(particles[i].x - particles[j].x, 2) +
                        Math.pow(particles[i].y - particles[j].y, 2)
                    );
                    
                    if (dist < 120) {
                        const alpha = (120 - dist) / 120 * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = '${state.colorPrimary}';
                        ctx.globalAlpha = alpha;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            const grad = ctx.createRadialGradient(0, 0, 50, 0, 0, 400);
            grad.addColorStop(0, '${state.colorPrimary}10');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.globalAlpha = 1;
            ctx.fillRect(0,0,width,height);
            
            const grad2 = ctx.createRadialGradient(width, height, 50, width, height, 400);
            grad2.addColorStop(0, '${state.colorAccent}10');
            grad2.addColorStop(1, 'transparent');
            ctx.fillStyle = grad2;
            ctx.fillRect(0,0,width,height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connect();
            requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>`;
}

function buildCyberpunkCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 20px ${state.colorPrimary}50, inset 0 0 10px ${state.colorPrimary}20;` : '';
    const borderGlow = state.glowEnabled ? `border: 2px solid ${state.colorPrimary};` : 'border: 2px solid #334155;';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyberpunk Glitch Ad</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background: #030407;
            overflow-y: auto; overflow-x: hidden;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Share Tech Mono', monospace;
        }

        body::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: 
                linear-gradient(rgba(18, 24, 45, 0.5) 50%, rgba(0, 0, 0, 0.25) 50%),
                linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
            background-size: 100% 4px, 6px 100%;
            pointer-events: none;
            z-index: 1;
        }

        .cyber-container {
            position: relative;
            width: 90%;
            max-width: 650px;
            padding: 45px 40px;
            background: rgba(4, 5, 12, 0.85);
            backdrop-filter: blur(10px);
            z-index: 10;
            overflow: hidden;
            ${borderGlow}
            ${cardGlow}
            clip-path: polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%);
        }

        @media (max-height: 250px) {
            .cyber-container {
                width: 100%;
                height: 100%;
                border-radius: 0;
                padding: 10px 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                clip-path: none;
                border-width: 1px;
            }
            .cyber-container::before {
                display: none;
            }
            .warning-stripe {
                display: none;
            }
            .title {
                font-size: 18px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
                text-align: left;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                max-width: 50%;
                border-left: 2px solid ${state.colorAccent};
                padding: 0 10px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .btn-wrapper {
                text-align: right;
            }
            .btn {
                padding: 8px 20px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        .cyber-container::before {
            content: 'SYSTEM_ONLINE';
            position: absolute;
            top: 4px;
            right: 40px;
            font-size: 8px;
            color: ${state.colorAccent};
            letter-spacing: 2px;
            opacity: 0.6;
        }

        .decor-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: repeating-linear-gradient(
                90deg,
                ${state.colorAccent},
                ${state.colorAccent} 10px,
                transparent 10px,
                transparent 20px
            );
        }

        .laser-scanner {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 2px;
            background: linear-gradient(90deg, transparent, ${state.colorPrimary}, transparent);
            box-shadow: 0 0 8px ${state.colorPrimary};
            animation: scan 4s linear infinite;
            z-index: 2;
        }

        @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 40px;
            font-weight: 900;
            color: #ffffff;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            position: relative;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .title::before, .title::after {
            content: '${state.title}';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #030407;
        }

        .title::before {
            left: 2px;
            text-shadow: -2px 0 #ff007c;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .title::after {
            left: -2px;
            text-shadow: -2px 0 #00f0ff, 0 2px #33ff33;
            clip: rect(85px, 450px, 140px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
            0% { clip: rect(31px, 9999px, 94px, 0); }
            10% { clip: rect(112px, 9999px, 76px, 0); }
            20% { clip: rect(85px, 9999px, 5px, 0); }
            30% { clip: rect(27px, 9999px, 115px, 0); }
            40% { clip: rect(73px, 9999px, 29px, 0); }
            50% { clip: rect(118px, 9999px, 142px, 0); }
            60% { clip: rect(9px, 9999px, 55px, 0); }
            70% { clip: rect(54px, 9999px, 120px, 0); }
            80% { clip: rect(122px, 9999px, 98px, 0); }
            90% { clip: rect(3px, 9999px, 88px, 0); }
            100% { clip: rect(61px, 9999px, 41px, 0); }
        }

        @keyframes glitch-anim2 {
            0% { clip: rect(76px, 9999px, 116px, 0); }
            11% { clip: rect(8px, 9999px, 15px, 0); }
            22% { clip: rect(125px, 9999px, 56px, 0); }
            33% { clip: rect(33px, 9999px, 82px, 0); }
            44% { clip: rect(90px, 9999px, 140px, 0); }
            55% { clip: rect(13px, 9999px, 95px, 0); }
            66% { clip: rect(114px, 9999px, 31px, 0); }
            77% { clip: rect(58px, 9999px, 118px, 0); }
            88% { clip: rect(102px, 9999px, 7px, 0); }
            100% { clip: rect(44px, 9999px, 133px, 0); }
        }

        .desc {
            color: #94a3b8;
            font-size: 14px;
            text-align: center;
            line-height: 1.6;
            margin-bottom: 30px;
            border-left: 2px solid ${state.colorAccent};
            padding: 0 15px;
            letter-spacing: 0.5px;
        }

        .btn-wrapper {
            text-align: center;
        }

        .btn {
            position: relative;
            display: inline-block;
            background: transparent;
            color: #fff;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 2px;
            text-decoration: none;
            padding: 14px 40px;
            border: 1px solid ${state.colorPrimary};
            box-shadow: 4px 4px 0px ${state.colorAccent};
            transition: all 0.2s ease;
            text-transform: uppercase;
        }

        .btn:hover {
            box-shadow: 0px 0px 15px ${state.colorPrimary};
            background: ${state.colorPrimary};
            color: #000;
            transform: translate(2px, 2px);
        }

        .btn:active {
            transform: translate(4px, 4px);
            box-shadow: none;
        }

        .warning-stripe {
            position: absolute;
            top: 25px;
            left: -35px;
            width: 120px;
            height: 12px;
            background: #fef08a;
            color: #000;
            font-size: 8px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(-45deg);
            z-index: 10;
            border: 1px solid #000;
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="cyber-container">
        <div class="warning-stripe">SECURE</div>
        <div class="laser-scanner"></div>
        
        <h1 class="title">${state.title}</h1>
        <p class="desc">${state.desc}</p>
        
        <div class="btn-wrapper">
            <a href="${state.btnUrl}" target="_blank" class="btn">${state.btnText}</a>
        </div>
        
        <div class="decor-line"></div>
        ${getBadgeHTML()}
    </div>

<script>
        ${getBrandingVerificationScript()}
    </script>
    </body>
</html>`;
}

function buildSteampunkCode() {
    let baseColor = '#b5a642'; // bronze
    let secondaryColor = '#8c7d26';
    if (state.steamTheme === 'gold') {
        baseColor = '#ffd700';
        secondaryColor = '#ccad00';
    } else if (state.steamTheme === 'steel') {
        baseColor = '#708090';
        secondaryColor = '#47525e';
    }

    const cardGlow = state.glowEnabled ? `box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 30px ${state.colorPrimary}25;` : '';
    const borderGlow = state.glowEnabled ? `border: 1px solid ${state.colorPrimary}35;` : 'border: 1px solid rgba(255,255,255,0.06);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Steampunk Chrono</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(circle at center, #130e0a 0%, #060403 100%);
            overflow-y: auto; overflow-x: hidden;
            font-family: 'Inter', sans-serif;
            perspective: 800px;
        }

        .clock-container {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 360px;
            max-height: 480px;
            border-radius: 24px;
            background: rgba(18, 12, 8, ${state.bgOpacity / 100});
            backdrop-filter: blur(15px);
            ${borderGlow}
            ${cardGlow}
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 30px;
            overflow: hidden;
            cursor: pointer;
            transform-style: preserve-3d;
            transition: transform 0.15s ease;
        }

        @media (max-height: 250px) {
            .clock-container {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                padding: 10px 20px;
                gap: 15px;
            }
            #canvas-3d {
                position: relative;
                width: 70px;
                height: 70px;
                flex-shrink: 0;
            }
            .ui-panel {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                flex-grow: 1;
                margin-top: 0;
                text-align: left;
                transform: none;
            }
            .title {
                font-size: 16px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
            }
            .btn-link {
                margin-top: 0;
                padding: 8px 18px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        #canvas-3d {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 65%;
            z-index: 1;
            pointer-events: none;
        }

        .ui-panel {
            position: relative;
            z-index: 10;
            text-align: center;
            transform: translateZ(40px);
            margin-top: auto;
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #e2e8f0;
            margin-bottom: 8px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
            background: linear-gradient(135deg, #fff, ${baseColor});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn-link {
            display: inline-block;
            background: linear-gradient(135deg, ${baseColor}, ${state.colorAccent});
            color: #fff;
            padding: 10px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            margin-top: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            transition: all 0.3s;
        }

        .btn-link:hover {
            box-shadow: 0 6px 20px rgba(255,255,255,0.1);
            transform: scale(1.05);
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="clock-container" id="clock-card">
        <canvas id="canvas-3d"></canvas>
        <div class="ui-panel">
            <h2 class="title">${state.title}</h2>
            <a href="${state.btnUrl}" target="_blank" class="btn-link">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        ${getBrandingVerificationScript()}
        const card = document.getElementById('clock-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = -((e.clientY - rect.top - rect.height/2) / rect.height) * 15;
            const rotateY = ((e.clientX - rect.left - rect.width/2) / rect.width) * 15;
            card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.4s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        const canvas = document.getElementById('canvas-3d');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0.2, 5);

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        // Lights
        const light = new THREE.DirectionalLight(0xffffff, 1.2);
        light.position.set(2, 4, 3);
        scene.add(light);
        
        const amLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(amLight);

        const frontLight = new THREE.PointLight(0xffffff, 1.5, 20);
        frontLight.position.set(0, 0, 4);
        scene.add(frontLight);

        // Helper function to create gear
        function createGear(radius, teeth, depth) {
            const group = new THREE.Group();
            const mat = new THREE.MeshPhongMaterial({
                color: '${baseColor}',
                specular: '${baseColor}',
                shininess: 60,
                emissive: '${baseColor}',
                emissiveIntensity: 0.25
            });

            // Center cylinder
            const cylinderGeo = new THREE.CylinderGeometry(radius * 0.85, radius * 0.85, depth, 24);
            const cylinder = new THREE.Mesh(cylinderGeo, mat);
            cylinder.rotation.x = Math.PI / 2;
            group.add(cylinder);

            // Add teeth
            const toothW = (Math.PI * 2 * radius) / teeth * 0.5;
            const toothH = radius * 0.15;
            const toothGeo = new THREE.BoxGeometry(toothW, depth, toothH);

            for (let i = 0; i < teeth; i++) {
                const tooth = new THREE.Mesh(toothGeo, mat);
                const angle = (i / teeth) * Math.PI * 2;
                tooth.position.set(Math.cos(angle) * (radius + toothH/2), 0, Math.sin(angle) * (radius + toothH/2));
                tooth.rotation.y = -angle;
                group.add(tooth);
            }

            // Spikes / Spokes
            const spokeGeo = new THREE.BoxGeometry(radius * 1.8, depth * 0.8, radius * 0.15);
            for (let i = 0; i < 3; i++) {
                const spoke = new THREE.Mesh(spokeGeo, mat);
                spoke.rotation.y = (i / 3) * Math.PI;
                group.add(spoke);
            }

            return group;
        }

        // Steampunk Chrono elements
        const gearLarge = createGear(0.85, 24, 0.15);
        gearLarge.position.set(0, 0, 0);
        scene.add(gearLarge);

        const gearSmall1 = createGear(0.45, 12, 0.12);
        gearSmall1.position.set(1.18, 0.3, -0.1);
        scene.add(gearSmall1);

        const gearSmall2 = createGear(0.55, 16, 0.1);
        gearSmall2.position.set(-1.18, -0.2, -0.05);
        scene.add(gearSmall2);

        // Clock Face Outline and Hands
        const clockFaceGeo = new THREE.TorusGeometry(0.86, 0.04, 8, 48);
        const clockFaceMat = new THREE.MeshPhongMaterial({
            color: '${secondaryColor}',
            specular: '${secondaryColor}',
            shininess: 40,
            emissive: '${secondaryColor}',
            emissiveIntensity: 0.15
        });
        const faceRim = new THREE.Mesh(clockFaceGeo, clockFaceMat);
        scene.add(faceRim);

        // Clock Hands
        const handMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
        const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.02), handMat);
        hourHand.position.y = 0.2;
        const hourPivot = new THREE.Group();
        hourPivot.add(hourHand);
        scene.add(hourPivot);

        const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.65, 0.02), handMat);
        minuteHand.position.y = 0.3;
        const minutePivot = new THREE.Group();
        minutePivot.add(minuteHand);
        scene.add(minutePivot);

        // Steam particle system
        const steamCount = ${state.steamParticlesEnabled ? 30 : 0};
        const sGeometry = new THREE.BufferGeometry();
        const sPositions = new Float32Array(steamCount * 3);
        const sSpeeds = [];

        for (let i = 0; i < steamCount * 3; i += 3) {
            sPositions[i] = (Math.random() - 0.5) * 1.5;
            sPositions[i+1] = -1.5 + Math.random() * 2.5;
            sPositions[i+2] = (Math.random() - 0.5) * 0.5;
            sSpeeds.push({
                x: (Math.random() - 0.5) * 0.005,
                y: 0.006 + Math.random() * 0.01,
                alpha: 0.5 + Math.random() * 0.5
            });
        }

        sGeometry.setAttribute('position', new THREE.BufferAttribute(sPositions, 3));
        const sMaterial = new THREE.PointsMaterial({
            color: '#cbd5e1',
            size: 0.08,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });

        const steamPoints = new THREE.Points(sGeometry, sMaterial);
        scene.add(steamPoints);

        // Animation Loop
        const spinSpeed = ${state.steamSpeed / 200};
        function animate() {
            requestAnimationFrame(animate);

            // Rotate gears (interlocking rotations)
            gearLarge.rotation.y -= spinSpeed;
            gearSmall1.rotation.y += spinSpeed * (24/12);
            gearSmall2.rotation.y += spinSpeed * (24/16);

            // Update local time hands
            const date = new Date();
            const hours = date.getHours() % 12;
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            hourPivot.rotation.z = -((hours + minutes/60) / 12) * Math.PI * 2;
            minutePivot.rotation.z = -((minutes + seconds/60) / 60) * Math.PI * 2;

            // Animate steam particles
            if (steamCount > 0) {
                const sPos = sGeometry.attributes.position;
                for (let i = 0; i < steamCount; i++) {
                    let py = sPos.getY(i) + sSpeeds[i].y;
                    let px = sPos.getX(i) + sSpeeds[i].x;

                    if (py > 2.0) {
                        py = -1.5;
                        px = (Math.random() - 0.5) * 1.5;
                    }

                    sPos.setY(i, py);
                    sPos.setX(i, px);
                }
                sPos.needsUpdate = true;
            }

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        animate();
    </script>
</body>
</html>`;
}

function buildGameCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 20px 45px rgba(0,0,0,0.8), 0 0 25px ${state.colorPrimary}30;` : '';
    const borderGlow = state.glowEnabled ? `border: 1px solid ${state.colorPrimary}40;` : 'border: 1px solid rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playable Retro Game Ad</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background-color: #04050a;
            overflow-y: auto; overflow-x: hidden;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Share Tech Mono', monospace;
        }

        .game-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(10, 12, 22, ${state.bgOpacity / 100});
            backdrop-filter: blur(15px);
            ${borderGlow}
            ${cardGlow}
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        #game-canvas {
            width: 100%;
            height: 100%;
            display: block;
            background: #020306;
            cursor: crosshair;
        }

        @media (max-height: 250px) {
            .game-wrapper {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
            }
            .overlay {
                padding: 5px 15px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .headline {
                font-size: 15px;
                margin-bottom: 0;
                margin-right: 10px;
                white-space: nowrap;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 15px;
                text-align: left;
                max-width: 50%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .btn-cta {
                padding: 8px 16px;
                font-size: 11px;
                white-space: nowrap;
            }
            .play-btn {
                margin-bottom: 0;
                margin-right: 8px;
            }
            .score-board {
                top: 8px;
                left: 8px;
                font-size: 11px;
            }
            .referral-badge {
                display: none !important;
            }
        }

        /* Glitchy popup */
        .overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(3, 4, 10, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;
            text-align: center;
            z-index: 100;
        }

        .headline {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            color: #fff;
            margin-bottom: 15px;
            text-transform: uppercase;
        }

        .desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 25px;
        }

        .btn-cta {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 12px;
            box-shadow: 0 4px 15px ${state.colorPrimary}50;
            transition: all 0.2s;
            letter-spacing: 1px;
            cursor: pointer;
        }

        .btn-cta:hover {
            box-shadow: 0 0 20px ${state.colorPrimary};
            transform: scale(1.03);
        }

        .play-btn {
            background: transparent;
            color: ${state.colorPrimary};
            border: 1px solid ${state.colorPrimary};
            box-shadow: none;
            margin-bottom: 12px;
        }

        .score-board {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            z-index: 10;
            pointer-events: none;
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="game-wrapper">
        <div class="score-board">SCORE: <span id="score-val">0</span> / ${state.gameTargetScore}</div>
        <canvas id="game-canvas"></canvas>
        
        <!-- Startup Overlay -->
        <div id="start-overlay" class="overlay">
            <h2 class="headline">${state.title}</h2>
            <p class="desc">Defeat the asteroids! Destroy at least <b>${state.gameTargetScore}</b> targets to unlock your reward.</p>
            <button class="btn-cta" onclick="startGame()">START MISSION</button>
        </div>

        <!-- Success CTA Overlay -->
        <div id="success-overlay" class="overlay" style="display:none;">
            <h2 class="headline" style="color:#10b981; text-shadow:0 0 10px #10b98133;">MISSION COMPLETE</h2>
            <p class="desc">${state.desc}</p>
            <a href="${state.btnUrl}" target="_blank" class="btn-cta">${state.btnText}</a>
        </div>
        
        <!-- Defeat Overlay -->
        <div id="defeat-overlay" class="overlay" style="display:none;">
            <h2 class="headline" style="color:#f87171;">VESSEL DESTROYED</h2>
            <p class="desc">You scored <span id="final-score">0</span> points. Try again or claim your reward now!</p>
            <button class="btn-cta play-btn" onclick="startGame()">RETRY GAME</button>
            <a href="${state.btnUrl}" target="_blank" class="btn-cta">${state.btnText}</a>
        </div>
        
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('score-val');
        
        let score = 0;
        let gameRunning = false;
        
        // Match width and height dynamically
        canvas.width = canvas.parentElement.clientWidth || 380;
        canvas.height = canvas.parentElement.clientHeight || 520;
        
        let playerX = canvas.width / 2;
        let playerY = canvas.height - 25;
        let lasers = [];
        let asteroids = [];
        let stars = [];

        window.addEventListener('resize', () => {
            canvas.width = canvas.parentElement.clientWidth || 380;
            canvas.height = canvas.parentElement.clientHeight || 520;
            playerX = canvas.width / 2;
            playerY = canvas.height - 25;
        });

        // Space difficulty settings
        const difficulty = '${state.gameDifficulty}';
        let speedMult = 1.0;
        if (difficulty === 'easy') speedMult = 0.65;
        if (difficulty === 'hard') speedMult = 1.4;

        // Initialize Starfield
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                speed: 0.5 + Math.random() * 1.0
            });
        }

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            playerX = e.clientX - rect.left;
            // keep inside bounds
            if (playerX < 20) playerX = 20;
            if (playerX > canvas.width - 20) playerX = canvas.width - 20;
        });

        canvas.addEventListener('click', () => {
            if (!gameRunning) return;
            // Shoot laser
            lasers.push({ x: playerX, y: playerY - 10 });
        });

        function startGame() {
            document.getElementById('start-overlay').style.display = 'none';
            document.getElementById('success-overlay').style.display = 'none';
            document.getElementById('defeat-overlay').style.display = 'none';
            
            score = 0;
            scoreEl.textContent = '0';
            lasers = [];
            asteroids = [];
            gameRunning = true;
            loop();
        }

        function triggerVictory() {
            gameRunning = false;
            document.getElementById('success-overlay').style.display = 'flex';
        }

        function triggerDefeat() {
            gameRunning = false;
            document.getElementById('final-score').textContent = score;
            document.getElementById('defeat-overlay').style.display = 'flex';
        }

        function loop() {
            if (!gameRunning) return;
            requestAnimationFrame(loop);
            
            // Draw Space Background
            ctx.fillStyle = '#020306';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Stars
            ctx.fillStyle = '#ffffff';
            stars.forEach(s => {
                s.y += s.speed;
                if (s.y > canvas.height) s.y = 0;
                ctx.fillRect(s.x, s.y, s.size, s.size);
            });

            // Draw Player Ship (Space theme)
            ctx.fillStyle = '${state.gameShipColor}';
            ctx.beginPath();
            ctx.moveTo(playerX, playerY - 18);
            ctx.lineTo(playerX - 14, playerY + 10);
            ctx.lineTo(playerX + 14, playerY + 10);
            ctx.closePath();
            ctx.fill();
            
            // Neon thruster glow
            ctx.fillStyle = '${state.colorAccent}';
            ctx.fillRect(playerX - 4, playerY + 11, 8, 4);

            // Laser updates
            ctx.fillStyle = '${state.colorPrimary}';
            for (let i = lasers.length - 1; i >= 0; i--) {
                lasers[i].y -= 8;
                ctx.fillRect(lasers[i].x - 1, lasers[i].y, 3, 10);
                
                // Out of screen
                if (lasers[i].y < 0) {
                    lasers.splice(i, 1);
                }
            }

            // Spawn Asteroids
            if (Math.random() < 0.03 * speedMult) {
                asteroids.push({
                    x: Math.random() * (canvas.width - 30) + 15,
                    y: -20,
                    size: 12 + Math.random() * 14,
                    speed: (1.5 + Math.random() * 2) * speedMult
                });
            }

            // Asteroid updates
            for (let i = asteroids.length - 1; i >= 0; i--) {
                const a = asteroids[i];
                a.y += a.speed;

                // Draw asteroid
                ctx.fillStyle = '#4b5563';
                ctx.beginPath();
                ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#374151';
                ctx.stroke();

                // Collision with player
                const distPlayer = Math.sqrt(Math.pow(a.x - playerX, 2) + Math.pow(a.y - playerY, 2));
                if (distPlayer < a.size + 12) {
                    triggerDefeat();
                    return;
                }

                // Collision with lasers
                for (let j = lasers.length - 1; j >= 0; j--) {
                    const l = lasers[j];
                    const distLaser = Math.sqrt(Math.pow(a.x - l.x, 2) + Math.pow(a.y - l.y, 2));
                    if (distLaser < a.size) {
                        // Explode asteroid!
                        asteroids.splice(i, 1);
                        lasers.splice(j, 1);
                        
                        score++;
                        scoreEl.textContent = score;
                        
                        if (score >= ${state.gameTargetScore}) {
                            triggerVictory();
                            return;
                        }
                        break;
                    }
                }

                // Asteroid out of bounds
                if (a.y > canvas.height + 20) {
                    asteroids.splice(i, 1);
                }
            }
        }
    </script>
</body>
</html>`;
}

function buildLiquidCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 20px 45px rgba(0,0,0,0.8), 0 0 25px ${state.colorPrimary}30; border-color: ${state.colorPrimary}50;` : 'border-color: rgba(255,255,255,0.08);';

    let gridGap = 20;
    if (state.liquidRes === 'low') gridGap = 30;
    if (state.liquidRes === 'high') gridGap = 12;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liquid Grid Ad</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background: #020306;
            overflow-y: auto; overflow-x: hidden;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Inter', sans-serif;
        }

        .panel-container {
            position: relative;
            width: 90%;
            max-width: 760px;
            padding: 50px;
            border-radius: 20px;
            background: rgba(10, 11, 18, ${state.bgOpacity / 100});
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            z-index: 10;
            text-align: center;
            ${cardGlow}
            overflow: hidden;
        }

        @media (max-height: 250px) {
            .panel-container {
                width: 100%;
                height: 100%;
                border-radius: 0;
                padding: 10px 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .title {
                font-size: 18px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
                text-align: left;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                max-width: 50%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .btn-action {
                padding: 8px 20px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        #grid-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .content {
            position: relative;
            z-index: 5;
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 34px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 40%, ${state.colorPrimary} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
        }

        .desc {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 25px;
            line-height: 1.5;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn-action {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #fff;
            padding: 12px 32px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 4px 15px ${state.colorPrimary}30;
            transition: all 0.3s;
        }

        .btn-action:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}60;
            transform: translateY(-2px);
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="panel-container">
        <canvas id="grid-canvas"></canvas>
        <div class="content">
            <h1 class="title">${state.title}</h1>
            <p class="desc">${state.desc}</p>
            <a href="${state.btnUrl}" target="_blank" class="btn-action">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('grid-canvas');
        const ctx = canvas.getContext('2d');

        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        const points = [];
        const gap = ${gridGap};
        const spring = ${state.liquidFreq / 1000};
        const friction = 0.94;

        // Mouse tracking
        const mouse = { x: null, y: null, radius: 90 };
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Create spring points grid
        const cols = Math.ceil(width / gap) + 1;
        const rows = Math.ceil(height / gap) + 1;

        for (let r = 0; r < rows; r++) {
            points[r] = [];
            for (let c = 0; c < cols; c++) {
                points[r][c] = {
                    x: c * gap,
                    y: r * gap,
                    origX: c * gap,
                    origY: r * gap,
                    vx: 0,
                    vy: 0
                };
            }
        }

        function update() {
            // Apply forces
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const p = points[r][c];

                    // Elastic return to original position
                    const dxOrig = p.origX - p.x;
                    const dyOrig = p.origY - p.y;
                    p.vx += dxOrig * spring;
                    p.vy += dyOrig * spring;

                    // Mouse interaction
                    if (mouse.x !== null && mouse.y !== null) {
                        const dx = mouse.x - p.x;
                        const dy = mouse.y - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < mouse.radius) {
                            const force = (mouse.radius - dist) / mouse.radius;
                            const angle = Math.atan2(dy, dx);

                            // Push away from cursor
                            p.vx -= Math.cos(angle) * force * 1.5;
                            p.vy -= Math.sin(angle) * force * 1.5;
                        }
                    }

                    // Physics update
                    p.vx *= friction;
                    p.vy *= friction;
                    p.x += p.vx;
                    p.y += p.vy;
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = '${state.colorPrimary}';
            ctx.lineWidth = 0.55;
            ctx.globalAlpha = 0.35;

            // Draw horizontal waves
            for (let r = 0; r < rows; r++) {
                ctx.beginPath();
                for (let c = 0; c < cols; c++) {
                    const p = points[r][c];
                    if (c === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }

            // Draw vertical waves
            for (let c = 0; c < cols; c++) {
                ctx.beginPath();
                for (let r = 0; r < rows; r++) {
                    const p = points[r][c];
                    if (r === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });

        loop();
    </script>
</body>
</html>`;
}

function buildMatrixCode() {
    let customTextArr = state.matrixCustomText ? state.matrixCustomText.split('') : ['I','A'];

    const cardGlow = state.glowEnabled ? `box-shadow: 0 20px 45px rgba(0,0,0,0.85), 0 0 25px ${state.colorPrimary}40; border-color: ${state.colorPrimary}50;` : 'border-color: rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrix Digital Rain Ad</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background-color: #010204;
            overflow-y: auto; overflow-x: hidden;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Share Tech Mono', monospace;
        }

        .matrix-card {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(2, 3, 6, ${state.bgOpacity / 100});
            border: 1px solid rgba(255,255,255,0.06);
            backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            overflow: hidden;
            ${cardGlow}
        }

        @media (max-height: 250px) {
            .matrix-card {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
            }
            .info-panel {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                text-align: left;
                padding: 0;
            }
            .title {
                font-size: 18px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
            }
            .btn-cyber {
                padding: 8px 20px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        #matrix-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .info-panel {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 10px;
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
            background: linear-gradient(180deg, #fff, ${state.colorPrimary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.6);
        }

        .btn-cyber {
            display: inline-block;
            background: transparent;
            color: ${state.colorPrimary};
            border: 1px solid ${state.colorPrimary};
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            padding: 11px 26px;
            border-radius: 6px;
            transition: all 0.3s ease;
            box-shadow: inset 0 0 4px ${state.colorPrimary}30;
        }

        .btn-cyber:hover {
            background: ${state.colorPrimary};
            color: #000;
            box-shadow: 0 0 15px ${state.colorPrimary};
            text-shadow: none;
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="matrix-card">
        <canvas id="matrix-canvas"></canvas>
        <div class="info-panel">
            <h2 class="title">${state.title}</h2>
            <a href="${state.btnUrl}" target="_blank" class="btn-cyber">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        let width = canvas.width = canvas.parentElement.offsetWidth || 380;
        let height = canvas.height = canvas.parentElement.offsetHeight || 520;

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.parentElement.offsetWidth || 380;
            height = canvas.height = canvas.parentElement.offsetHeight || 520;
        });

        // Character Sets
        const charsType = '${state.matrixChars}';
        const customArr = ${JSON.stringify(customTextArr)};
        const binaryChars = '01'.split('');
        const hexChars = '0123456789ABCDEF'.split('');
        const matrixOriginal = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');

        function getChar() {
            if (charsType === 'binary') return binaryChars[Math.floor(Math.random() * binaryChars.length)];
            if (charsType === 'hex') return hexChars[Math.floor(Math.random() * hexChars.length)];
            if (charsType === 'matrix') return matrixOriginal[Math.floor(Math.random() * matrixOriginal.length)];
            return customArr[Math.floor(Math.random() * customArr.length)];
        }

        const fontSize = ${state.matrixSize};
        const columns = Math.floor(width / fontSize) + 1;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // staggered drop heights
        }

        const speedMult = ${state.matrixSpeed};
        let frameCount = 0;

        function draw() {
            // Semi-transparent black to create trailing effect
            ctx.fillStyle = 'rgba(1, 2, 4, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '${state.colorPrimary}';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < columns; i++) {
                const text = getChar();
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Highlight first leading drop character
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#ffffff';
                } else {
                    ctx.fillStyle = '${state.colorPrimary}';
                }

                ctx.fillText(text, x, y);

                // Reset drop or advance
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Speed step multiplier
                drops[i] += (0.15 * speedMult);
            }
        }

        function animate() {
            draw();
            requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>`;
}

function buildAudioCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 30px ${state.colorPrimary}30; border-color: ${state.colorPrimary}50;` : 'border-color: rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Audio Visualizer</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            background: #020306;
            overflow-y: auto; overflow-x: hidden;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Inter', sans-serif;
        }

        .visual-card {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(10, 11, 18, ${state.bgOpacity / 100});
            border: 1px solid rgba(255,255,255,0.06);
            backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            overflow: hidden;
            ${cardGlow}
        }

        @media (max-height: 250px) {
            .visual-card {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
            }
            #visual-canvas {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                opacity: 0.3;
                z-index: 1;
            }
            .content {
                position: relative;
                z-index: 10;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                text-align: left;
            }
            .mic-permission-btn {
                margin-bottom: 0;
                margin-right: 15px;
                padding: 6px 12px;
            }
            .title {
                font-size: 18px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
            }
            .btn-link {
                padding: 8px 20px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }

        #visual-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .content {
            position: relative;
            z-index: 10;
            text-align: center;
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 40%, ${state.colorAccent} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .btn-link {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #fff;
            padding: 11px 28px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 4px 15px ${state.colorPrimary}30;
            transition: all 0.3s;
        }

        .btn-link:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}60;
            transform: translateY(-2px);
        }
        
        .mic-permission-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #94a3b8;
            padding: 6px 14px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 11px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 15px;
            transition: 0.2s;
        }
        .mic-permission-btn:hover {
            border-color: ${state.colorPrimary};
            color: #fff;
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="visual-card">
        <canvas id="visual-canvas"></canvas>
        <div class="content">
            <button class="mic-permission-btn" id="btn-mic">🎙️ Enable Mic</button>
            <h2 class="title">${state.title}</h2>
            <a href="${state.btnUrl}" target="_blank" class="btn-link">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('visual-canvas');
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 4.5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        // Core visualizer geometry
        let geometry;
        const type = '${state.audioType}';
        const sensitivity = ${state.audioSensitivity};

        if (type === 'sphere') {
            geometry = new THREE.SphereGeometry(1.0, 32, 32);
        } else if (type === 'ring') {
            geometry = new THREE.TorusGeometry(1.0, 0.1, 8, 80);
        } else { // wave grid
            geometry = new THREE.PlaneGeometry(2.0, 2.0, 24, 24);
        }

        const material = new THREE.PointsMaterial({
            color: '${state.colorPrimary}',
            size: 0.045,
            transparent: true,
            opacity: 0.85
        });

        const points = new THREE.Points(geometry, material);
        if (type === 'wave') {
            points.rotation.x = -Math.PI / 3;
            points.position.y = 0.2;
        }
        scene.add(points);

        // Ambient Lights
        const light = new THREE.DirectionalLight(0xffffff, 1.0);
        light.position.set(0, 2, 5);
        scene.add(light);

        // Audio Analyser Setup
        let analyser = null;
        let dataArray = null;
        let micStream = null;
        const micBtn = document.getElementById('btn-mic');

        const micEnabled = ${state.audioMicEnabled};
        if (micEnabled) {
            micBtn.addEventListener('click', setupAudioInput);
        } else {
            micBtn.style.display = 'none';
        }

        function setupAudioInput() {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(stream => {
                    micStream = stream;
                    micBtn.style.display = 'none';
                    
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaStreamSource(stream);
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 128;
                    
                    source.connect(analyser);
                    const bufferLength = analyser.frequencyBinCount;
                    dataArray = new Uint8Array(bufferLength);
                })
                .catch(err => {
                    console.log('Mic blocked, using procedural simulation', err);
                    micBtn.textContent = '❌ Blocked';
                    setTimeout(() => micBtn.style.display = 'none', 1500);
                });
        }

        // Auto-run if requested
        if (micEnabled && navigator.permissions) {
            navigator.permissions.query({ name: 'microphone' }).then(result => {
                if (result.state === 'granted') {
                    setupAudioInput();
                }
            });
        }

        // Animation Loop
        let clock = new THREE.Clock();
        
        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            points.rotation.y = time * 0.15;

            let audioVal = 0;
            if (analyser && dataArray) {
                analyser.getByteFrequencyData(dataArray);
                // Get average volume
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                audioVal = sum / dataArray.length / 255.0; // normalised 0-1
            } else {
                // Procedural heartbeat simulation if mic not connected
                audioVal = (Math.sin(time * 5) * 0.2 + 0.3) * (0.8 + Math.sin(time * 12) * 0.2);
            }

            // Deform vertices based on audio value
            const posAttr = geometry.attributes.position;
            const count = posAttr.count;

            for (let i = 0; i < count; i++) {
                const px = posAttr.getX(i);
                const py = posAttr.getY(i);
                const pz = posAttr.getZ(i);

                if (type === 'sphere') {
                    // radial noise deformation
                    const dist = Math.sqrt(px*px + py*py + pz*pz);
                    const angle = Math.atan2(py, px);
                    const noise = Math.sin(angle * 8 + time * 3) * Math.cos(pz * 4 + time * 2) * audioVal * 0.45 * sensitivity;
                    
                    // modulate scale from center
                    const scaleFactor = (1.0 + noise) / dist;
                    posAttr.setXYZ(i, px * scaleFactor, py * scaleFactor, pz * scaleFactor);
                } else if (type === 'ring') {
                    // ring wave distortion
                    const dist = Math.sqrt(px*px + py*py);
                    const noise = Math.sin(px * 10 + time * 4) * audioVal * 0.3 * sensitivity;
                    posAttr.setZ(i, noise);
                } else { // wave grid
                    // plane displacement
                    const z = Math.sin(px * 5 + time * 3) * Math.cos(py * 5 + time * 2) * audioVal * 0.6 * sensitivity;
                    posAttr.setZ(i, z);
                }
            }
            posAttr.needsUpdate = true;

            // Shift color slightly based on intensity
            material.color.setHSL((0.55 + audioVal * 0.2) % 1.0, 0.9, 0.55);

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        animate();
    </script>
</body>
</html>`;
}
function buildScratchCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 30px ${state.colorPrimary}25, inset 0 0 1px ${state.colorPrimary}80;` : '';
    const borderGlow = state.glowEnabled ? `border: 1px solid ${state.colorPrimary}40;` : 'border: 1px solid rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scratch Card Reveal</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(circle at center, #0f1324 0%, #060810 100%);
            overflow-y: auto; overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }

        .scratch-card {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(20, 24, 45, ${state.bgOpacity / 100});
            backdrop-filter: blur(20px);
            ${borderGlow}
            ${cardGlow}
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            overflow: hidden;
            user-select: none;
        }

        .scratch-content {
            position: relative;
            z-index: 5;
            text-align: center;
            pointer-events: none;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .scratch-content.active {
            pointer-events: auto;
        }

        .title {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 30%, ${state.colorPrimary} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
        }

        .desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 24px;
            padding: 0 10px;
        }

        .btn-cta {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 15px ${state.colorPrimary}40;
            transition: all 0.3s ease;
        }

        .btn-cta:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}70;
            transform: scale(1.05);
        }

        #scratch-canvas {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 20;
            cursor: pointer;
            border-radius: 22px;
            transition: opacity 0.6s ease;
        }

        #confetti-canvas {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 10;
            pointer-events: none;
        }

        @media (max-height: 250px) {
            body {
                align-items: center;
                justify-content: center;
                padding: 5px;
            }
            .scratch-card {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }
            .scratch-content {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                text-align: left;
            }
            .title {
                font-size: 16px;
                margin-bottom: 0;
                margin-right: 15px;
                white-space: nowrap;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                padding: 0;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .btn-cta {
                padding: 8px 16px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="scratch-card">
        <canvas id="scratch-canvas"></canvas>
        <canvas id="confetti-canvas"></canvas>
        <div class="scratch-content" id="reveal-content">
            <h2 class="title">${state.title}</h2>
            <p class="desc">${state.desc}</p>
            <a href="${state.btnUrl}" target="_blank" class="btn-cta">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('scratch-canvas');
        const ctx = canvas.getContext('2d');
        const content = document.getElementById('reveal-content');
        
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        let isDrawing = false;
        let isRevealed = false;
        const brushSize = ${state.scratchBrushSize};
        const threshold = ${state.scratchThreshold};

        // Draw Scratch Cover
        function initScratchCover() {
            ctx.fillStyle = '${state.scratchColor}';
            ctx.fillRect(0, 0, width, height);

            // Add brushed metallic look
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 2;
            for(let i=0; i<height; i+=4) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(width, i + (Math.random() - 0.5)*10);
                ctx.stroke();
            }
            
            // Draw scratch-here label
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 15px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw dynamic background box for text
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fillRect(width/2 - 90, height/2 - 20, 180, 40);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.strokeRect(width/2 - 90, height/2 - 20, 180, 40);

            ctx.fillStyle = '#0f172a';
            ctx.fillText('🪙 SCRATCH HERE', width / 2, height / 2);
        }

        initScratchCover();

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function scratch(e) {
            if (!isDrawing || isRevealed) return;
            e.preventDefault();
            const pos = getMousePos(e);
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
            ctx.fill();
            
            checkScratchPercentage();
        }

        function checkScratchPercentage() {
            // Sample grid pixels to save memory and performance
            let clearedCount = 0;
            const cols = 20;
            const rows = 20;
            const totalPoints = cols * rows;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = Math.floor((c / cols) * width);
                    const y = Math.floor((r / rows) * height);
                    const pixel = ctx.getImageData(x, y, 1, 1).data;
                    if (pixel[3] === 0) { // Alpha is transparent
                        clearedCount++;
                    }
                }
            }

            const pct = Math.floor((clearedCount / totalPoints) * 100);
            if (pct >= threshold && !isRevealed) {
                revealCard();
            }
        }

        function revealCard() {
            isRevealed = true;
            canvas.style.opacity = '0';
            content.classList.add('active');
            
            setTimeout(() => {
                canvas.style.display = 'none';
            }, 600);

            triggerConfetti();
        }

        // Mouse Listeners
        canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
        window.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => isDrawing = false);

        // Touch Listeners
        canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
        window.addEventListener('touchmove', scratch);
        window.addEventListener('touchend', () => isDrawing = false);

        // Confetti Particle System
        const confCanvas = document.getElementById('confetti-canvas');
        const confCtx = confCanvas.getContext('2d');
        let confWidth = confCanvas.width = confCanvas.offsetWidth;
        let confHeight = confCanvas.height = confCanvas.offsetHeight;
        let confetti = [];

        class Confetto {
            constructor() {
                this.x = Math.random() * confWidth;
                this.y = -20;
                this.size = Math.random() * 6 + 4;
                this.color = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random()*5)];
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = Math.random() * 3 + 2;
                this.rotation = Math.random() * 360;
                this.rSpeed = Math.random() * 2 - 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rSpeed;
            }
            draw() {
                confCtx.save();
                confCtx.translate(this.x, this.y);
                confCtx.rotate(this.rotation * Math.PI / 180);
                confCtx.fillStyle = this.color;
                confCtx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                confCtx.restore();
            }
        }

        let confettiAnimation = null;
        function triggerConfetti() {
            confetti = [];
            for (let i = 0; i < 75; i++) {
                confetti.push(new Confetto());
            }
            animateConfetti();
        }

        function animateConfetti() {
            confCtx.clearRect(0, 0, confWidth, confHeight);
            let active = false;
            
            confetti.forEach(c => {
                c.update();
                c.draw();
                if (c.y < confHeight) active = true;
            });

            if (active) {
                confettiAnimation = requestAnimationFrame(animateConfetti);
            }
        }

        window.addEventListener('resize', () => {
            if (!isRevealed) {
                // Resize scratch cover (will re-clear it but keeps layout functional)
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
                initScratchCover();
            }
            confWidth = confCanvas.width = confCanvas.offsetWidth;
            confHeight = confCanvas.height = confCanvas.offsetHeight;
        });
    </script>
</body>
</html>`;
}

function buildTextExploderCode() {
    const cardGlow = state.glowEnabled ? `box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 30px ${state.colorPrimary}25, inset 0 0 1px ${state.colorPrimary}80;` : '';
    const borderGlow = state.glowEnabled ? `border: 1px solid ${state.colorPrimary}40;` : 'border: 1px solid rgba(255,255,255,0.08);';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Particle Text Exploder</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: radial-gradient(circle at center, #070913 0%, #020306 100%);
            overflow-y: auto; overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }

        .exploder-card {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 380px;
            max-height: 520px;
            border-radius: 24px;
            background: rgba(10, 11, 20, ${state.bgOpacity / 100});
            backdrop-filter: blur(20px);
            ${borderGlow}
            ${cardGlow}
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 30px;
            overflow: hidden;
            cursor: pointer;
        }

        .canvas-container {
            width: 100%;
            height: 55%;
            position: relative;
        }

        #text-canvas {
            width: 100%;
            height: 100%;
            display: block;
        }

        .info-panel {
            text-align: center;
            position: relative;
            z-index: 10;
        }

        .desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 24px;
            padding: 0 10px;
        }

        .btn-cta {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary}, ${state.colorAccent});
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 15px ${state.colorPrimary}40;
            transition: all 0.3s ease;
        }

        .btn-cta:hover {
            box-shadow: 0 6px 20px ${state.colorPrimary}70;
            transform: scale(1.05);
        }

        @media (max-height: 250px) {
            body {
                align-items: center;
                justify-content: center;
                padding: 5px;
            }
            .exploder-card {
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }
            .canvas-container {
                width: 250px;
                height: 100%;
                flex-shrink: 0;
            }
            .info-panel {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                flex-grow: 1;
                text-align: left;
            }
            .desc {
                font-size: 11px;
                margin-bottom: 0;
                margin-right: 20px;
                text-align: left;
                padding: 0;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .btn-cta {
                padding: 8px 16px;
                font-size: 12px;
                white-space: nowrap;
            }
            .referral-badge {
                display: none !important;
            }
        }
        
        ${getBadgeCSS()}
    </style>
</head>
<body>

    <div class="exploder-card" id="card">
        <div class="canvas-container">
            <canvas id="text-canvas"></canvas>
        </div>
        <div class="info-panel">
            <p class="desc">${state.desc}</p>
            <a href="${state.btnUrl}" target="_blank" class="btn-cta">${state.btnText}</a>
        </div>
        ${getBadgeHTML()}
    </div>

    <script>
        ${getBrandingVerificationScript()}
        const canvas = document.getElementById('text-canvas');
        const ctx = canvas.getContext('2d');
        const card = document.getElementById('card');

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const particles = [];
        const mouse = { x: null, y: null, radius: ${state.textRadius} };

        // Mouse listeners
        card.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        card.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Generate particle positions from text pixels
        function initParticles() {
            particles.length = 0;
            
            // Render text on offscreen canvas to extract pixels
            const offscreen = document.createElement('canvas');
            offscreen.width = width;
            offscreen.height = height;
            const oCtx = offscreen.getContext('2d');
            
            oCtx.fillStyle = '#ffffff';
            // Size text dynamically
            const fontSize = Math.floor(width / 7.5);
            oCtx.font = 'bold ' + fontSize + 'px Outfit, sans-serif';
            oCtx.textAlign = 'center';
            oCtx.textBaseline = 'middle';
            
            const words = '${state.title}'.split(' ');
            if (words.length > 1) {
                // Split multi-word strings onto two lines
                const mid = Math.floor(words.length / 2);
                const line1 = words.slice(0, mid).join(' ');
                const line2 = words.slice(mid).join(' ');
                oCtx.fillText(line1, width/2, height/2 - fontSize*0.45);
                oCtx.fillText(line2, width/2, height/2 + fontSize*0.5);
            } else {
                oCtx.fillText('${state.title}', width/2, height/2);
            }

            const imgData = oCtx.getImageData(0, 0, width, height);
            const data = imgData.data;

            // Sample points
            const targetDensity = ${state.textDensity};
            let activePoints = [];
            for (let y = 0; y < height; y += 2) {
                for (let x = 0; x < width; x += 2) {
                    const idx = (y * width + x) * 4;
                    if (data[idx + 3] > 128) {
                        activePoints.push({ x, y });
                    }
                }
            }

            // Stagger step dynamically to fit particle target count
            const step = Math.max(1, Math.floor(activePoints.length / targetDensity));
            for (let i = 0; i < activePoints.length; i += step) {
                const pt = activePoints[i];
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    homeX: pt.x,
                    homeY: pt.y,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 2 + 1,
                    color: Math.random() > 0.45 ? '${state.colorPrimary}' : '${state.colorAccent}',
                    alpha: Math.random() * 0.4 + 0.6
                });
            }
        }

        initParticles();

        const spring = 0.055;
        const friction = 0.85;
        const forceMult = ${state.textForce};

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                // Spring pull to destination/home
                const dxHome = p.homeX - p.x;
                const dyHome = p.homeY - p.y;
                p.vx += dxHome * spring;
                p.vy += dyHome * spring;

                // Mouse repel interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        
                        // Push away from cursor
                        p.vx -= Math.cos(angle) * force * forceMult;
                        p.vy -= Math.sin(angle) * force * forceMult;
                    }
                }

                // Apply velocity and friction
                p.vx *= friction;
                p.vy *= friction;
                p.x += p.vx;
                p.y += p.vy;

                // Draw Particle
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        });
    </script>
</body>
</html>`;
}
