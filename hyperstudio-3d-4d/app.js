/* ==========================================================================
   HyperStudio 3D/4D - Main Application Engine & Renderer (Pro Edition V11)
   ========================================================================== */

(function() {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. I18n Translations Dictionary (Strictly English 🇬🇧 & French 🇫🇷 Only)
    // ----------------------------------------------------------------------
    const translations = {
        en: {
            tagline: "HTML 3D/4D Code Generator & Renderer",
            presets_label: "Presets:",
            preset_drone: "🛸 Cyber Recon Drone 3D",
            preset_station: "🛰️ Orbital Space Station 4D",
            preset_robot: "🤖 Cyber Mech Robot 3D",
            preset_starship: "🛸 Cosmic Starship 4D",
            preset_alien: "👽 Extraterrestrial Alien 4D",
            preset_car: "🏎️ Neon Cyber Car 3D",
            preset_ship: "⛵ Cosmic Pirate Ship 3D",
            preset_saturn: "🪐 Saturn Galaxy Ring 4D",
            preset_crystal: "💎 Crystal Energy Tower 3D",
            preset_warrior: "🦾 Mech Warrior Titan 3D",
            preset_fighter: "🚀 Delta Space Fighter 3D",
            preset_tesseract: "✨ Cyberpunk Tesseract 4D",
            preset_24cell: "🌟 Majestic 24-Cell 4D",
            btn_import_3d: "Import 3D Model",
            btn_inspector: "3D Inspector",
            btn_shader: "Shader FX",
            btn_bloom: "Cyber Glow",
            btn_cinematic: "Cinematic AI",
            btn_parallax: "Mouse Parallax",
            btn_gallery: "Gallery",
            btn_web_templates: "Web Templates",
            btn_framework: "Framework Export",
            btn_random_dna: "Randomize DNA 🎲",
            btn_sculptor: "Shape Sculptor",
            btn_logo: "3D Logo Studio",
            btn_morph: "4D Morph 🌀",
            btn_eco: "SEO Eco Mode ⚡",
            btn_ad_studio: "4D Ad Studio 📣",
            btn_code_editor: "Code Editor 📝",
            btn_run: "Run Code",
            btn_reset: "Reset Scene",
            btn_embed: "Get Embed Code",
            btn_export_html: "Export .HTML",
            btn_export_obj: "Export .OBJ",
            btn_audio: "Audio Beats",
            btn_physics: "3D Physics",
            timeline_speed: "Speed:",
            inspector_title: "3D Model & Image Inspector",
            shader_title: "Shader & Light FX Studio",
            sculptor_modal_title: "3D Shape & Parametric Knot Sculptor",
            sculptor_modal_desc: "Configure parametric math ratios (P/Q), torus knot radii, and custom materials:",
            btn_insert_sculpt: "Insert Sculpted Mesh",
            logo_modal_title: "3D Text & Logo Sculptor Studio Pro",
            logo_modal_desc: "Sculpt an extraordinary, unique 3D/4D brand logo with customized 3D typography, orbital rings, and particle halos:",
            btn_insert_logo: "Generate Unique 3D Logo",
            preset_gradient: "Neon Color Gradient:",
            light_intensity: "Light Power:",
            ambient_glow: "Ambient Light:",
            select_model_label: "Selected Target 3D Object / Image:",
            rot_speed_label: "Rotation Speed:",
            pos_x: "Position X:",
            pos_y: "Position Y:",
            pos_z: "Position Z:",
            model_scale: "Scale Factor:",
            model_color: "Color Tint:",
            view_full: "💻 Full Viewport",
            view_hero: "🖥️ Hero Banner",
            view_mobile: "📱 Mobile Card",
            gallery_title: "3D / 4D Visual Model Gallery",
            gallery_desc: "Select any model card to instantly load and edit in the studio workspace:",
            modal_framework_title: "Multi-Framework Web Code Exporter",
            modal_framework_desc: "Select your target web framework below to get ready-to-paste 3D component code:",
            templates_modal_title: "Complete Web Landing Page Templates",
            templates_modal_desc: "Download complete, ready-to-host HTML5 landing pages featuring your exact 3D/4D model background:",
            ai_prompt_placeholder: "Describe or speak any 3D/4D model (Robot, Alien, Starship, Drone)...",
            btn_ai_gen: "Generate AI",
            editor_title: "HTML / JS 3D Code Editor",
            status_ready: "Live Engine Ready",
            viewport_title: "3D / 4D Interactive Canvas",
            cam_orbit: "Auto-Orbit",
            vp_wireframe: "Wireframe",
            vp_grid: "Grid",
            vp_4d_controls: "4D Controls",
            bg_cyber: "🌌 Cyber Dark",
            bg_space: "✨ Deep Space",
            bg_studio: "⚪ Studio Grey",
            bg_transparent: "🏁 Transparent",
            panel_4d_title: "4D Hyper-Rotation Engines",
            polytope_label: "4D Geometry Mesh:",
            poly_tesseract: "🔷 Tesseract (Hypercube - 16v)",
            poly_5cell: "🔺 5-Cell (Pentachoron - 5v)",
            poly_16cell: "💎 16-Cell (Hexadecachoron - 8v)",
            poly_24cell_opt: "🌟 Majestic 24-Cell 4D",
            axis_xw: "Rotation XW (4D Plane):",
            axis_yw: "Rotation YW (4D Plane):",
            axis_zw: "Rotation ZW (4D Plane):",
            hyper_dist: "4D Perspective Distance (W):",
            modal_embed_title: "Standalone HTML 3D Embed Code",
            modal_embed_desc: "Copy and paste this HTML snippet into any website or HTML file to render this exact interactive 3D/4D model without external dependencies!",
            btn_copy: "Copy Code",
            copied_notice: "Copied to clipboard!",
            // Toolbar tabs & groups
            tab_generate: "Generate",
            tab_studios: "Studios",
            tab_io: "Import / Export",
            tab_settings: "Settings",
            group_generate: "Generate 3D/4D Models",
            group_studios: "Advanced Studios",
            group_io: "Import & Resources",
            group_settings: "Settings & Options",
            // Viewport group labels
            vp_camera: "Camera",
            vp_scene: "Scene",
            vp_tools: "Tools",
            // Photo import panel
            photo_panel_title: "Photo 3D Controls",
            photo_preview_label: "Imported Photo",
            photo_frame_fx: "Frame & FX",
            photo_frame_style: "3D Frame Style:",
            photo_frame_color: "Frame Color:",
            photo_dimensions: "Dimensions",
            photo_width: "Width:",
            photo_height: "Height:",
            photo_position: "Position & Rotation",
            photo_rot_y: "Rotation Y:",
            photo_apply: "Apply Changes",
            photo_open_studio: "Open Frame Studio",
            pfx_depth: "Depth Relief",
            pfx_scanner: "Laser Scan",
            pfx_hologram: "Hologram Back",
            pfx_disintegrate: "Disintegrate",
            pfx_invert: "Invert Colors",
            pfx_float: "Float Anim.",
            // Install App Guide
            btn_install_app: "Install App 📲",
            install_modal_title: "Install on Phone & Tablet (PWA Guide)",
            install_modal_subtitle: "Install HyperStudio 3D & Pilot Simulator as a standalone native app with full-screen view and maximum 60FPS performance:",
            install_android_title: "Android (Chrome / Edge)",
            install_android_step1: "Open this page in Google Chrome.",
            install_android_step2: "Tap the 3 dots menu (⋮) in the top-right corner.",
            install_android_step3: "Select \"Install app\" (or \"Add to Home screen\").",
            install_android_step4: "The app icon will appear directly on your home screen!",
            install_btn_prompt: "Install Now with 1 Click",
            install_ios_title: "iPhone & iPad (Safari)",
            install_ios_step1: "Open this page in Apple Safari.",
            install_ios_step2: "Tap the Share button (⎋) in the toolbar.",
            install_ios_step3: "Scroll down and tap \"Add to Home Screen\" (➕).",
            install_ios_step4: "Tap \"Add\" in the top-right corner.",
            install_wifi_title: "Open from PC to Phone / Tablet (Local Wi-Fi Network)",
            install_wifi_desc: "To access the studio from any phone or tablet on the same Wi-Fi:",
            install_wifi_code1: "1. Start a local web server (e.g. Live Server extension or run: npx serve)",
            install_wifi_code2: "2. Open your PC local IP address on mobile (e.g. http://192.168.1.X:5500)",
            install_wifi_code3: "3. Or deploy free on GitHub Pages / Vercel / Netlify for instant global access!",
            btn_install_understood: "Got it"
        },
        fr: {
            tagline: "Générateur et Rendu de Code HTML 3D/4D",
            presets_label: "Préréglages:",
            preset_drone: "🛸 Drome Cyber Recon 3D",
            preset_station: "🛰️ Station Spatiale Orbitale 4D",
            preset_robot: "🤖 Robot Mech Cyberpunk 3D",
            preset_starship: "🛸 Vaisseau Spatial Cosmique 4D",
            preset_alien: "👽 Extraterrestre 4D",
            preset_car: "🏎️ Voiture Cyber Néon 3D",
            preset_ship: "⛵ Navire Pirate Cosmique 3D",
            preset_saturn: "🪐 Saturne Anneau Galaxie 4D",
            preset_crystal: "💎 Tour d'Énergie Cristalline 3D",
            preset_warrior: "🦾 Titan Guerrier Mech 3D",
            preset_fighter: "🚀 Chasseur Spatial Delta 3D",
            preset_tesseract: "✨ Tesseract 4D Cyberpunk",
            preset_24cell: "🌟 Majestueux 24-Cell 4D",
            btn_import_3d: "Importer Modèle 3D",
            btn_inspector: "Inspecteur 3D",
            btn_shader: "Studio Shader",
            btn_bloom: "Néon Glow",
            btn_cinematic: "IA Cinématique",
            btn_parallax: "Parallaxe Souris",
            btn_gallery: "Galerie",
            btn_web_templates: "Modèles Web",
            btn_framework: "Export Framework",
            btn_random_dna: "Randomiser ADN 🎲",
            btn_sculptor: "Sculpteur 3D",
            btn_logo: "Studio Logo 3D Pro",
            btn_morph: "Morph 4D 🌀",
            btn_eco: "SEO Mode Éco ⚡",
            btn_ad_studio: "Studio Pub 4D 📣",
            btn_code_editor: "Éditeur de Code 📝",
            btn_run: "Exécuter",
            btn_reset: "Réinitialiser",
            btn_embed: "Obtenir Code Intégré",
            btn_export_html: "Exporter .HTML",
            btn_export_obj: "Exporter .OBJ",
            btn_audio: "Rythme Audio",
            btn_physics: "Physique 3D",
            timeline_speed: "Vitesse:",
            inspector_title: "Inspecteur de Transformation 3D",
            shader_title: "Studio de Shader et Lumière",
            sculptor_modal_title: "Sculpteur 3D et Nœud Paramétrique",
            sculptor_modal_desc: "Configurez les ratios P/Q, rayons torus knot et matériaux personnalisés :",
            btn_insert_sculpt: "Insérer Maillage Sculpté",
            logo_modal_title: "Studio de Sculpture de Logo 3D Pro",
            logo_modal_desc: "Saisissez votre nom de marque pour sculpter un logo néon 3D avec halo orbital :",
            btn_insert_logo: "Générer Logo 3D Unique",
            preset_gradient: "Dégradé Néon Couleur :",
            light_intensity: "Puissance Lumière :",
            ambient_glow: "Lumière Ambiante :",
            select_model_label: "Objet 3D / Image Cible Sélectionné :",
            rot_speed_label: "Vitesse de Rotation :",
            pos_x: "Position X:",
            pos_y: "Position Y:",
            pos_z: "Position Z:",
            model_scale: "Échelle Factor:",
            model_color: "Teinte Couleur:",
            view_full: "💻 Vue Complète",
            view_hero: "🖥️ Bannière Hero",
            view_mobile: "📱 Carte Mobile",
            gallery_title: "Galerie Visuelle de Modèles 3D / 4D",
            gallery_desc: "Sélectionnez n'importe quelle carte pour charger et modifier dans l'éspace de travail :",
            modal_framework_title: "Exportateur de Code Web Multi-Framework",
            modal_framework_desc: "Sélectionnez votre framework cible ci-dessous pour obtenir le code de composant 3D :",
            templates_modal_title: "Modèles de Pages Web Complete",
            templates_modal_desc: "Téléchargez des pages d'atterrissage HTML5 complètes intégrant votre arrière-plan 3D/4D :",
            ai_prompt_placeholder: "Décrivez ou parlez de tout modèle 3D/4D...",
            btn_ai_gen: "Générer AI",
            editor_title: "Éditeur de Code HTML / JS 3D",
            status_ready: "Moteur Prêt en Direct",
            viewport_title: "Canevas Interactif 3D / 4D",
            cam_orbit: "Auto-Orbiter",
            vp_wireframe: "Fil de Fer",
            vp_grid: "Grille",
            vp_4d_controls: "Contrôles 4D",
            bg_cyber: "🌌 Cyber Sombre",
            bg_space: "✨ Espace Profond",
            bg_studio: "⚪ Studio Gris",
            bg_transparent: "🏁 Transparent",
            panel_4d_title: "Moteurs de Hyper-Rotation 4D",
            polytope_label: "Maillage Géométrie 4D:",
            poly_tesseract: "🔷 Tesseract (Hypercube - 16v)",
            poly_5cell: "🔺 5-Cell (Pentachoron - 5v)",
            poly_16cell: "💎 16-Cell (Hexadecachoron - 8v)",
            poly_24cell_opt: "🌟 Majestueux 24-Cell 4D",
            axis_xw: "Rotation XW (Plan 4D):",
            axis_yw: "Rotation YW (Plan 4D):",
            axis_zw: "Rotation ZW (Plan 4D):",
            hyper_dist: "Distance Perspective 4D (W):",
            modal_embed_title: "Code d'Intégration HTML 3D Autonome",
            modal_embed_desc: "Copiez et collez ce fragment HTML sur n'importe quel site web pour afficher ce modèle 3D/4D interactif exact sans dépendances externes !",
            btn_copy: "Copier le Code",
            copied_notice: "Copié dans le presse-papiers !",
            // Onglets & groupes
            tab_generate: "Générer",
            tab_studios: "Studios",
            tab_io: "Import / Export",
            tab_settings: "Paramètres",
            group_generate: "Générer des Modèles 3D/4D",
            group_studios: "Studios Avancés",
            group_io: "Import & Ressources",
            group_settings: "Paramètres & Options",
            // Étiquettes de groupe viewport
            vp_camera: "Caméra",
            vp_scene: "Scène",
            vp_tools: "Outils",
            // Panneau photo
            photo_panel_title: "Contrôles Photo 3D",
            photo_preview_label: "Photo Importée",
            photo_frame_fx: "Cadre & Effets",
            photo_frame_style: "Style de Cadre 3D :",
            photo_frame_color: "Couleur du Cadre :",
            photo_dimensions: "Dimensions",
            photo_width: "Largeur :",
            photo_height: "Hauteur :",
            photo_position: "Position & Rotation",
            photo_rot_y: "Rotation Y :",
            photo_apply: "Appliquer",
            photo_open_studio: "Ouvrir le Studio",
            pfx_depth: "Relief 3D",
            pfx_scanner: "Laser Scan",
            pfx_hologram: "Dos Hologramme",
            pfx_disintegrate: "Désintégration",
            pfx_invert: "Inverser Couleurs",
            pfx_float: "Anim. Flotte",
            // Guide d'installation de l'application
            btn_install_app: "Installer l'App 📲",
            install_modal_title: "Installer sur Téléphone & Tablette (Guide PWA)",
            install_modal_subtitle: "Installez HyperStudio 3D & Simulateur de Pilotage comme une application native autonome en plein écran et performances 60FPS maximales :",
            install_android_title: "Android (Chrome / Edge)",
            install_android_step1: "Ouvrez cette page dans Google Chrome.",
            install_android_step2: "Appuyez sur le menu à 3 points (⋮) en haut à droite.",
            install_android_step3: "Sélectionnez « Installer l'application » (ou « Ajouter à l'écran d'accueil »).",
            install_android_step4: "L'icône de l'application apparaîtra directement sur votre écran d'accueil !",
            install_btn_prompt: "Installer Maintenant en 1 Clic",
            install_ios_title: "iPhone & iPad (Safari)",
            install_ios_step1: "Ouvrez cette page dans Apple Safari.",
            install_ios_step2: "Appuyez sur le bouton Partager (⎋) dans la barre d'outils.",
            install_ios_step3: "Faites défiler vers le bas et appuyez sur « Sur l'écran d'accueil » (➕).",
            install_ios_step4: "Appuyez sur « Ajouter » en haut à droite.",
            install_wifi_title: "Ouvrir depuis le PC sur Téléphone / Tablette (Réseau Wi-Fi Local)",
            install_wifi_desc: "Pour accéder au studio depuis n'importe quel téléphone ou tablette sur le même Wi-Fi :",
            install_wifi_code1: "1. Démarrez un serveur web local (ex: extension Live Server ou commande : npx serve)",
            install_wifi_code2: "2. Ouvrez l'adresse IP locale du PC sur mobile (ex: http://192.168.1.X:5500)",
            install_wifi_code3: "3. Ou déployez gratuitement sur GitHub Pages / Vercel / Netlify pour un accès global instantané !",
            btn_install_understood: "Compris"
        }
    };

    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        const flagEl = document.getElementById('lang-flag');
        const textEl = document.getElementById('lang-text');
        if (flagEl) flagEl.textContent = lang === 'en' ? '🇬🇧' : '🇫🇷';
        if (textEl) textEl.textContent = lang.toUpperCase();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (translations[lang] && translations[lang][key]) {
                el.title = translations[lang][key];
            }
        });
    }

    // ----------------------------------------------------------------------
    // Web Audio API Synthesized Sci-Fi SFX Engine
    // ----------------------------------------------------------------------
    let audioCtx = null;
    let isSFXEnabled = true;

    function initAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
    }

    function playClickSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.08);
        } catch(e){}
    }

    function playHoverSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.04);
        } catch(e){}
    }

    function playRunSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.18);

            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.18);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.18);
        } catch(e){}
    }

    function playRingChimeSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc1.type = 'sine'; osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.25);
            osc2.frequency.setValueAtTime(1320, audioCtx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(2640, audioCtx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

            osc1.connect(gain); osc2.connect(gain);
            gain.connect(audioCtx.destination);

            osc1.start(); osc2.start();
            osc1.stop(audioCtx.currentTime + 0.35);
            osc2.stop(audioCtx.currentTime + 0.35);
        } catch(e){}
    }

    function playBoostSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);

            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.35);
        } catch(e){}
    }

    function playLaserSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(980, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);

            gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.12);
        } catch(e){}
    }

    function playExplosionSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.4);

            gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.45);
        } catch(e){}
    }

    function playMissionCompleteSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);

                gain.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.35);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(audioCtx.currentTime + idx * 0.1);
                osc.stop(audioCtx.currentTime + idx * 0.1 + 0.35);
            });
        } catch(e){}
    }

    function playShieldHitSFX() {
        if (!isSFXEnabled) return;
        initAudioContext();
        if (!audioCtx) return;

        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.15);

            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } catch(e){}
    }

    // ----------------------------------------------------------------------
    // 2. Preset Code Templates
    // ----------------------------------------------------------------------
    const presetTemplates = {
        cyber_drone: `<!-- 🛸 CYBER RECON DRONE 3D -->
<model-3d preset="cyber_drone" x="0" y="0.5" z="0" scale="1.3" color="#00f2fe" material="matrix" animate="spin-y" scroll-rotate="true"></model-3d>
<cta-button text="DISCOVER DRONE 🚀" url="https://example.com" x="0" y="-1.8" z="0" color="#00ffcc"></cta-button>
<particles count="2500" color="#00ffcc" speed="0.01"></particles>
<light-point x="0" y="3" z="3" color="#00f2fe" intensity="2.5"></light-point>`,

        space_station: `<!-- 🛰️ ORBITAL SPACE STATION 4D -->
<model-3d preset="space_station" x="0" y="0" z="0" scale="1.5" color="#00ffcc" material="wire-glow" animate="spin"></model-3d>
<hyper-cube shape="24cell" size="2.6" color="#7928ca" rot-xw="0.02" material="neon"></hyper-cube>
<cta-button text="EXPLORE STATION 🛰️" url="https://example.com" x="0" y="-2.0" z="0" color="#00f2fe"></cta-button>
<particles count="3500" color="#00f2fe" speed="0.015"></particles>`,

        cyber_robot: `<!-- 🤖 CYBER MECH ROBOT 3D -->
<model-3d preset="cyber_robot" x="0" y="0.5" z="0" scale="1.3" color="#00f2fe" material="neon" animate="spin-y"></model-3d>
<particles count="2500" color="#00ffcc" speed="0.01"></particles>`,

        cosmic_starship: `<!-- 🛸 COSMIC STARSHIP 4D -->
<model-3d preset="cosmic_starship" x="0" y="0" z="0" scale="1.3" color="#ff007f" material="neon" animate="spin-y"></model-3d>
<mesh-torus radius="3.2" tube="0.08" color="#00ffcc" material="neon" animate="spin-x"></mesh-torus>
<particles count="4000" color="#00f2fe" speed="0.02"></particles>`,

        alien_avatar: `<!-- 👽 EXTRATERRESTRIAL ALIEN 4D -->
<model-3d preset="alien_avatar" x="0" y="0" z="0" scale="1.3" color="#00ffcc" material="hologram" animate="spin-y"></model-3d>
<hyper-cube shape="tesseract" size="1.6" color="#7928ca" rot-xw="0.04" material="neon"></hyper-cube>
<particles count="3500" color="#00ffcc" speed="0.012"></particles>`,

        cyber_car: `<!-- 🏎️ NEON CYBER CAR 3D -->
<model-3d preset="cyber_car" x="0" y="0" z="0" scale="1.2" color="#ff007f" material="neon" animate="spin-y"></model-3d>
<particles count="3000" color="#ff007f" speed="0.015"></particles>`,

        pirate_ship: `<!-- ⛵ COSMIC PIRATE SHIP 3D -->
<model-3d preset="pirate_ship" x="0" y="0" z="0" scale="1.2" color="#7928ca" material="glass" animate="spin-y"></model-3d>
<particles count="2500" color="#00f2fe" speed="0.008"></particles>`,

        saturn_galaxy: `<!-- 🪐 SATURN GALAXY RING 4D -->
<model-3d preset="saturn_galaxy" x="0" y="0" z="0" scale="1.2" color="#ffb703" material="standard" animate="spin-y"></model-3d>
<hyper-cube shape="16cell" size="2.0" color="#7928ca" rot-xw="0.02" material="neon"></hyper-cube>
<particles count="4500" color="#ffb703" speed="0.01"></particles>`,

        crystal_tower: `<!-- 💎 CRYSTAL ENERGY TOWER 3D -->
<model-3d preset="crystal_tower" x="0" y="0" z="0" scale="1.2" color="#a855f7" material="glass" animate="spin-y"></model-3d>
<particles count="3000" color="#a855f7" speed="0.012"></particles>
<light-point x="0" y="3" z="2" color="#a855f7" intensity="3.0"></light-point>`,

        mech_warrior: `<!-- 🦾 MECH WARRIOR TITAN 3D -->
<model-3d preset="mech_warrior" x="0" y="0" z="0" scale="1.2" color="#ff6b00" material="neon" animate="spin-y"></model-3d>
<particles count="2000" color="#ff6b00" speed="0.008"></particles>`,

        space_fighter: `<!-- 🚀 DELTA SPACE FIGHTER 3D -->
<model-3d preset="space_fighter" x="0" y="0" z="0" scale="1.3" color="#00f2fe" material="neon" animate="spin-y"></model-3d>
<particles count="3500" color="#00f2fe" speed="0.018"></particles>`,

        tesseract_4d: `<!-- 4D HYPERCUBE (TESSERACT) -->
<hyper-cube shape="tesseract" size="2.2" color="#00f2fe" rot-xw="0.02" rot-yw="0.015" material="glass"></hyper-cube>
<particles count="1500" color="#7928ca" speed="0.005"></particles>`,

        poly_24cell: `<!-- 🌟 MAJESTIC 24-CELL 4D -->
<hyper-cube shape="24cell" size="2.4" color="#00ffcc" rot-xw="0.02" rot-zw="0.015" material="neon"></hyper-cube>
<particles count="2500" color="#00f2fe" speed="0.01"></particles>`
    };

    // ----------------------------------------------------------------------
    // 3. UI Elements & On-Demand Code Editor Drawer Logic
    // ----------------------------------------------------------------------
    const workspace = document.getElementById('workspace');
    const paneEditor = document.getElementById('pane-editor');
    const paneResizer = document.getElementById('pane-resizer');
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    const cursorPos = document.getElementById('cursor-pos');

    const btnToggleEditor = document.getElementById('btn-toggle-editor');
    const btnVpToggleEditor = document.getElementById('btn-vp-toggle-editor');
    const btnFloatingEditorToggle = document.getElementById('btn-floating-editor-toggle');
    const btnCloseEditorPane = document.getElementById('btn-close-editor-pane');
    const btnRunEditor = document.getElementById('btn-run-editor');

    let isEditorOpen = false;

    function toggleCodeEditor(forceState) {
        isEditorOpen = (typeof forceState === 'boolean') ? forceState : !isEditorOpen;
        playClickSFX();

        if (paneEditor) paneEditor.classList.toggle('open', isEditorOpen);
        if (paneResizer) paneResizer.classList.toggle('open', isEditorOpen);
        if (workspace) workspace.classList.toggle('editor-open', isEditorOpen);

        if (btnToggleEditor) btnToggleEditor.classList.toggle('active', isEditorOpen);
        if (btnVpToggleEditor) btnVpToggleEditor.classList.toggle('active', isEditorOpen);

        setTimeout(() => {
            if (window.onViewportResize) window.onViewportResize();
        }, 50);
    }

    if (btnToggleEditor) btnToggleEditor.addEventListener('click', () => toggleCodeEditor());
    if (btnVpToggleEditor) btnVpToggleEditor.addEventListener('click', () => toggleCodeEditor());
    if (btnFloatingEditorToggle) btnFloatingEditorToggle.addEventListener('click', () => toggleCodeEditor(true));
    if (btnCloseEditorPane) btnCloseEditorPane.addEventListener('click', () => toggleCodeEditor(false));
    if (btnRunEditor) btnRunEditor.addEventListener('click', () => {
        playRunSFX();
        parseAndRender();
    });

    let isResizing = false;

    paneResizer.addEventListener('mousedown', () => {
        isResizing = true;
        paneResizer.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const containerWidth = document.getElementById('workspace').clientWidth;
        let newWidth = (e.clientX / containerWidth) * 100;
        newWidth = Math.max(20, Math.min(80, newWidth));
        paneEditor.style.width = `${newWidth}%`;
        if (window.onViewportResize) window.onViewportResize();
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            paneResizer.classList.remove('dragging');
            document.body.style.cursor = 'default';
            if (window.onViewportResize) window.onViewportResize();
        }
    });

    function updateLineNumbers() {
        const lines = codeEditor.value.split('\n').length;
        let lineNums = '';
        for (let i = 1; i <= lines; i++) lineNums += i + '\n';
        lineNumbers.innerText = lineNums;
    }

    function updateCursorPos() {
        const text = codeEditor.value.substring(0, codeEditor.selectionStart);
        const lines = text.split('\n');
        const currentLine = lines.length;
        const currentCol = lines[lines.length - 1].length + 1;
        cursorPos.textContent = `Ln ${currentLine}, Col ${currentCol}`;
    }

    codeEditor.addEventListener('input', () => {
        updateLineNumbers();
        updateCursorPos();
        triggerLiveRenderDebounced();
    });

    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    codeEditor.addEventListener('click', updateCursorPos);
    codeEditor.addEventListener('keyup', updateCursorPos);

    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
            updateLineNumbers();
        } else if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            playRunSFX();
            runCode();
        }
    });

    document.querySelectorAll('.snippet-tag').forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSFX();
            const snippet = btn.getAttribute('data-snippet');
            const start = codeEditor.selectionStart;
            codeEditor.value = codeEditor.value.substring(0, start) + snippet + '\n\n' + codeEditor.value.substring(start);
            updateLineNumbers();
            runCode();
        });
    });

    // ----------------------------------------------------------------------
    // 4. 4D Polytopes Mathematical Generator Engine
    // ----------------------------------------------------------------------
    function buildTesseract4D() {
        const vertices = [];
        for (let i = 0; i < 16; i++) {
            vertices.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
        }
        const edges = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                let diff = 0;
                for (let k = 0; k < 4; k++) if (vertices[i][k] !== vertices[j][k]) diff++;
                if (diff === 1) edges.push([i, j]);
            }
        }
        return { vertices, edges };
    }

    function build5Cell4D() {
        const a = 1 / Math.sqrt(5);
        const vertices = [
            [1, 1, 1, -a], [1, -1, -1, -a], [-1, 1, -1, -a], [-1, -1, 1, -a], [0, 0, 0, Math.sqrt(5) - a]
        ];
        const edges = [];
        for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) edges.push([i, j]);
        return { vertices, edges };
    }

    function build16Cell4D() {
        const vertices = [
            [1, 0, 0, 0], [-1, 0, 0, 0], [0, 1, 0, 0], [0, -1, 0, 0],
            [0, 0, 1, 0], [0, 0, -1, 0], [0, 0, 0, 1], [0, 0, 0, -1]
        ];
        const edges = [];
        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 8; j++) {
                if (i % 2 === 0 && j === i + 1) continue;
                edges.push([i, j]);
            }
        }
        return { vertices, edges };
    }

    function build24Cell4D() {
        const vertices = [];
        const v16 = build16Cell4D().vertices;
        v16.forEach(v => vertices.push([v[0]*1.4, v[1]*1.4, v[2]*1.4, v[3]*1.4]));
        const vTess = buildTesseract4D().vertices;
        vTess.forEach(v => vertices.push([v[0]*0.7, v[1]*0.7, v[2]*0.7, v[3]*0.7]));

        const edges = [];
        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                let distSq = 0;
                for (let k = 0; k < 4; k++) {
                    let d = vertices[i][k] - vertices[j][k];
                    distSq += d * d;
                }
                if (distSq >= 1.8 && distSq <= 2.1) edges.push([i, j]);
            }
        }
        return { vertices, edges };
    }

    const polytopeLibrary = {
        tesseract: buildTesseract4D(),
        '5cell': build5Cell4D(),
        '16cell': build16Cell4D(),
        '24cell': build24Cell4D()
    };

    // ----------------------------------------------------------------------
    // 5. Three.js Engine & Advanced FX Modes
    // ----------------------------------------------------------------------
    let scene, camera, renderer, controls;
    let mainAmbientLight, mainDirLight;
    let customObjects = [];
    let animationCallbacks = [];
    let polytopeMeshGroup = null;
    let warpParticles = null;
    let isAutoOrbiting = false;

    let isAudioReactive = false;
    let isAnimationPaused = false;
    let timeSpeedMultiplier = 1.0;

    let isPhysicsEnabled = false;
    let physicsObjects = [];

    let isBloomEnabled = false;
    let isCinematicCamEnabled = false;
    let isMouseParallaxEnabled = false;
    let is4DMorphing = false;
    let isEcoMode = false;
    let lastFrameTime = 0;
    let morphTimer = 0;

    let mousePos = { x: 0, y: 0 };
    let scrollRotationOffset = 0;

    let importedModelRegistry = {};
    let importedOBJDataStore = {};

    let activePresetKey = null;

    let currentPolytypeKey = 'tesseract';
    let polytope4DParams = {
        size: 2.0, rotXW: 0.02, rotYW: 0.01, rotZW: 0.00, dist4D: 2.5, angleXW: 0, angleYW: 0, angleZW: 0
    };

    function init3DEngine() {
        const container = document.getElementById('canvas-container');
        const canvas = document.getElementById('webgl-canvas');

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0c14);

        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 3, 7);

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        setupDefaultLights();

        const gridHelper = new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d);
        gridHelper.name = 'grid-floor';
        scene.add(gridHelper);

        canvas.addEventListener('click', handleCanvasModelClick);

        canvas.addEventListener('mousemove', (e) => {
            if (!renderer || !camera || !scene) return;
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((e.clientX - rect.left) / rect.width) * 2 - 1,
                -((e.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            let isHoveringClickable = false;
            if (intersects.length > 0) {
                for (let i = 0; i < intersects.length; i++) {
                    let hitObj = intersects[i].object;
                    while (hitObj) {
                        if (hitObj.userData && (hitObj.userData.url || hitObj.userData.preset || hitObj.userData.isExplodable || hitObj.userData.isImage)) {
                            isHoveringClickable = true;
                            break;
                        }
                        if (!hitObj.parent || hitObj.parent === scene) break;
                        hitObj = hitObj.parent;
                    }
                    if (isHoveringClickable) break;
                }
            }
            canvas.style.cursor = isHoveringClickable ? 'pointer' : 'default';
        });

        window.addEventListener('mousemove', (e) => {
            mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('scroll', () => {
            scrollRotationOffset = window.scrollY * 0.005;
        });

        window.onViewportResize = () => {
            const cont = document.getElementById('canvas-container');
            if (cont && camera && renderer) {
                const w = cont.clientWidth;
                const h = cont.clientHeight;
                if (w > 0 && h > 0) {
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            }
        };

        window.addEventListener('resize', window.onViewportResize);
        requestAnimationFrame(renderLoop);
    }

    function setupDefaultLights() {
        mainAmbientLight = new THREE.AmbientLight(0xffffff, 0.6);
        mainAmbientLight.name = 'default-light';
        scene.add(mainAmbientLight);

        mainDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainDirLight.position.set(10, 15, 10);
        mainDirLight.name = 'default-light';
        scene.add(mainDirLight);
    }

    function handleCanvasModelClick(event) {
        if (!renderer || !camera || !scene) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            for (let i = 0; i < intersects.length; i++) {
                let hitObj = intersects[i].object;
                let targetData = null;

                while (hitObj) {
                    if (hitObj.userData && (hitObj.userData.url || hitObj.userData.preset || hitObj.userData.isExplodable || hitObj.userData.isImage || hitObj.userData.isHotspot || hitObj.userData.triggerDisintegrate)) {
                        targetData = hitObj.userData;
                        break;
                    }
                    if (!hitObj.parent || hitObj.parent === scene) break;
                    hitObj = hitObj.parent;
                }

                if (targetData) {
                    if (targetData.triggerDisintegrate) {
                        playRunSFX();
                        targetData.triggerDisintegrate();
                    } else if (targetData.isParticleText && targetData.triggerDisperse) {
                        playRunSFX();
                        targetData.triggerDisperse();
                    } else if (targetData.isHotspot && targetData.triggerHotspot) {
                        targetData.triggerHotspot();
                    } else if (targetData.isExplodable && targetData.triggerExplode) {
                        playRunSFX();
                        targetData.triggerExplode();
                    } else if (targetData.url) {
                        playRunSFX();
                        let targetUrl = targetData.url;
                        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                            targetUrl = 'https://' + targetUrl;
                        }
                        try {
                            const newWin = window.open(targetUrl, '_blank');
                            if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
                                window.location.href = targetUrl;
                            }
                        } catch(e) {
                            window.location.href = targetUrl;
                        }
                    } else if (targetData.preset) {
                        setActiveModelPreset(targetData.preset);
                    }
                    break;
                }
            }
        }
    }

    function rotate4DPoint(pt, angleXW, angleYW, angleZW) {
        let [x, y, z, w] = pt;
        let cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
        let x1 = x * cosXW - w * sinXW, w1 = x * sinXW + w * cosXW;
        let cosYW = Math.cos(angleYW), sinYW = Math.sin(angleYW);
        let y2 = y * cosYW - w1 * sinYW, w2 = y * sinYW + w1 * cosYW;
        let cosZW = Math.cos(angleZW), sinZW = Math.sin(angleZW);
        let z3 = z * cosZW - w2 * sinZW, w3 = z * sinZW + w2 * cosZW;
        return [x1, y2, z3, w3];
    }

    function project4Dto3D(pt4d, distance, scale) {
        const [x, y, z, w] = pt4d;
        const wFactor = 1 / (distance - w);
        return new THREE.Vector3(x * wFactor * scale, y * wFactor * scale, z * wFactor * scale);
    }

    function createPolytopeMesh(shapeKey, colorHex) {
        if (polytopeMeshGroup) scene.remove(polytopeMeshGroup);

        currentPolytypeKey = polytopeLibrary[shapeKey] ? shapeKey : 'tesseract';
        const polyData = polytopeLibrary[currentPolytypeKey];

        polytopeMeshGroup = new THREE.Group();
        polytopeMeshGroup.name = 'polytope-4d';

        const lineMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(colorHex || 0x00f2fe),
            linewidth: 2
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(polyData.edges.length * 2 * 3), 3));

        const lineSegments = new THREE.LineSegments(geometry, lineMaterial);
        polytopeMeshGroup.add(lineSegments);

        const nodeGroup = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const nodeMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorHex || 0x00f2fe),
            emissive: new THREE.Color(0x7928ca)
        });

        for (let i = 0; i < polyData.vertices.length; i++) {
            nodeGroup.add(new THREE.Mesh(sphereGeo, nodeMat));
        }
        polytopeMeshGroup.add(nodeGroup);
        scene.add(polytopeMeshGroup);
    }

    function updatePolytope4D() {
        if (!polytopeMeshGroup) return;

        polytope4DParams.angleXW += polytope4DParams.rotXW * timeSpeedMultiplier;
        polytope4DParams.angleYW += polytope4DParams.rotYW * timeSpeedMultiplier;
        polytope4DParams.angleZW += polytope4DParams.rotZW * timeSpeedMultiplier;

        const polyData = polytopeLibrary[currentPolytypeKey];
        const projected3D = polyData.vertices.map(v => {
            const rotPt = rotate4DPoint(v, polytope4DParams.angleXW, polytope4DParams.angleYW, polytope4DParams.angleZW);
            return project4Dto3D(rotPt, polytope4DParams.dist4D, polytope4DParams.size);
        });

        const lineSegments = polytopeMeshGroup.children[0];
        const positions = lineSegments.geometry.attributes.position.array;

        let posIdx = 0;
        for (let i = 0; i < polyData.edges.length; i++) {
            const [idxA, idxB] = polyData.edges[i];
            const pA = projected3D[idxA], pB = projected3D[idxB];
            positions[posIdx++] = pA.x; positions[posIdx++] = pA.y; positions[posIdx++] = pA.z;
            positions[posIdx++] = pB.x; positions[posIdx++] = pB.y; positions[posIdx++] = pB.z;
        }

        lineSegments.geometry.attributes.position.needsUpdate = true;

        const nodeGroup = polytopeMeshGroup.children[1];
        for (let i = 0; i < polyData.vertices.length; i++) {
            if (nodeGroup.children[i]) nodeGroup.children[i].position.copy(projected3D[i]);
        }
    }

    function createProceduralModelGroup(presetKey, colorHex, matType) {
        const group = new THREE.Group();
        const mat = createMaterial(matType || 'neon', colorHex || '#00f2fe');
        const accentMat = createMaterial('neon', colorHex || '#00ffcc');
        const darkMat = createMaterial('standard', '#111122');

        if (presetKey === 'cyber_drone') {
            // Main octagonal body
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.28, 8), mat); group.add(body);
            const topDome = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 8, 0, Math.PI*2, 0, Math.PI/2), mat); topDome.position.y = 0.14; group.add(topDome);
            const bottomDome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI*2, Math.PI/2, Math.PI/2), mat); bottomDome.position.y = -0.14; group.add(bottomDome);
            // Camera eye
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), accentMat); eye.position.set(0, -0.2, 0.42); group.add(eye);
            const eyeRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 8, 16), accentMat); eyeRing.position.set(0, -0.2, 0.38); eyeRing.rotation.x = Math.PI/2; group.add(eyeRing);
            // 4 arms with double rotors
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2 + Math.PI/4;
                const armGroup = new THREE.Group();
                const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.08), mat); arm.position.x = 0.45; armGroup.add(arm);
                const joint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), accentMat); joint.position.x = 0.9; armGroup.add(joint);
                // Rotor hub
                const rotorHub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), accentMat); rotorHub.position.x = 0.9; rotorHub.position.y = 0.1; armGroup.add(rotorHub);
                // Rotor blades
                for (let b = 0; b < 2; b++) {
                    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.12), accentMat);
                    blade.position.set(0.9 + (b === 0 ? 0.28 : -0.28), 0.16, 0);
                    armGroup.add(blade);
                }
                const landing = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6), mat); landing.position.set(0.9, -0.25, 0); armGroup.add(landing);
                armGroup.rotation.y = angle;
                group.add(armGroup);
            }
            // Status LED ring
            const ledRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 8, 32), accentMat); ledRing.rotation.x = Math.PI/2; group.add(ledRing);

        } else if (presetKey === 'space_station') {
            // Central hub module
            const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 12), mat); group.add(hub);
            const hubCapT = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 6, 0, Math.PI*2, 0, Math.PI/2), mat); hubCapT.position.y = 0.55; group.add(hubCapT);
            const hubCapB = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 6, 0, Math.PI*2, Math.PI/2), mat); hubCapB.position.y = -0.55; group.add(hubCapB);
            // Docking ring
            const dockRing = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.07, 8, 24), accentMat); dockRing.rotation.x = Math.PI/2; group.add(dockRing);
            // 3 habitat modules on arms
            for (let i = 0; i < 3; i++) {
                const angle = (i * 2 * Math.PI) / 3;
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), mat);
                arm.rotation.z = Math.PI/2; arm.position.set(Math.cos(angle)*0.8, 0, Math.sin(angle)*0.8);
                arm.rotation.y = -angle; group.add(arm);
                const module = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 10), mat);
                module.position.set(Math.cos(angle)*1.7, 0, Math.sin(angle)*1.7); group.add(module);
                const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.45), accentMat);
                solarPanel.position.set(Math.cos(angle)*1.7, 0.5, Math.sin(angle)*1.7); group.add(solarPanel);
                const solarPanel2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.45), accentMat);
                solarPanel2.position.set(Math.cos(angle)*1.7, -0.5, Math.sin(angle)*1.7); group.add(solarPanel2);
            }
            // Outer orbital ring
            const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.06, 8, 48), accentMat); outerRing.rotation.x = Math.PI/2; group.add(outerRing);

        } else if (presetKey === 'cosmic_starship') {
            // Streamlined fuselage
            const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.45, 3.5, 8), mat); fuselage.rotation.x = Math.PI/2; group.add(fuselage);
            // Nose cone
            const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.0, 8), mat); nose.rotation.x = -Math.PI/2; nose.position.z = 2.25; group.add(nose);
            // Engine nacelle
            const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.6, 8), mat); engine.rotation.x = Math.PI/2; engine.position.z = -2.0; group.add(engine);
            const engineGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 8), accentMat); engineGlow.rotation.x = Math.PI/2; engineGlow.position.z = -2.35; group.add(engineGlow);
            // Delta wings
            const wingGeoL = new THREE.BufferGeometry();
            const wvL = new Float32Array([-0.2,0,-0.8, -2.2,0,-1.0, -0.2,0,1.2]); wingGeoL.setAttribute('position', new THREE.BufferAttribute(wvL,3)); wingGeoL.computeVertexNormals();
            const wingL = new THREE.Mesh(wingGeoL, mat); group.add(wingL);
            const wingGeoR = new THREE.BufferGeometry();
            const wvR = new Float32Array([0.2,0,-0.8, 2.2,0,-1.0, 0.2,0,1.2]); wingGeoR.setAttribute('position', new THREE.BufferAttribute(wvR,3)); wingGeoR.computeVertexNormals();
            const wingR = new THREE.Mesh(wingGeoR, mat); group.add(wingR);
            // Canopy
            const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 6, 0, Math.PI*2, 0, Math.PI/2), accentMat); canopy.rotation.x = Math.PI/2; canopy.position.z = 1.2; group.add(canopy);
            // Fin
            const finGeo = new THREE.BufferGeometry();
            const fv = new Float32Array([0,0,-1.5, 0,0.8,-0.5, 0,0,0.5]); finGeo.setAttribute('position', new THREE.BufferAttribute(fv,3)); finGeo.computeVertexNormals();
            const fin = new THREE.Mesh(finGeo, accentMat); fin.position.y = 0.35; group.add(fin);

        } else if (presetKey === 'alien_avatar') {
            // Elongated alien skull
            const skull = new THREE.Mesh(new THREE.SphereGeometry(0.75, 24, 20), mat); skull.scale.set(0.85, 1.5, 0.75); skull.position.y = 1.5; group.add(skull);
            // Sunken jaw
            const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 8, 0, Math.PI*2, Math.PI/2, Math.PI/2), mat); jaw.position.set(0, 0.78, 0.12); group.add(jaw);
            // Large wrap-around eyes
            const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 10), accentMat); eyeL.scale.set(1.5, 0.7, 0.5); eyeL.position.set(-0.35, 1.55, 0.55); group.add(eyeL);
            const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 10), accentMat); eyeR.scale.set(1.5, 0.7, 0.5); eyeR.position.set(0.35, 1.55, 0.55); group.add(eyeR);
            // Neck with vertebra details
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.55, 12), mat); neck.position.y = 0.55; group.add(neck);
            // Thorax
            const thorax = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.38, 0.9, 14), mat); thorax.position.y = -0.1; group.add(thorax);
            // Abdomen tapers
            const abdomen = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.22, 0.7, 12), mat); abdomen.position.y = -0.85; group.add(abdomen);
            // Long thin arms
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 1.4, 8), mat); armL.position.set(-0.75, -0.05, 0); armL.rotation.z = Math.PI/5; group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 1.4, 8), mat); armR.position.set(0.75, -0.05, 0); armR.rotation.z = -Math.PI/5; group.add(armR);
            // Orbital energy rings
            const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.03, 8, 32), accentMat); ring1.position.y = 1.5; ring1.rotation.x = Math.PI/2.5; group.add(ring1);
            const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.03, 8, 32), accentMat); ring2.position.y = 1.5; ring2.rotation.x = Math.PI/2.5; ring2.rotation.y = Math.PI/2; group.add(ring2);

        } else if (presetKey === 'cyber_robot' || presetKey === 'robot') {
            // Head with visor slit
            const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 0.75), mat); head.position.y = 1.7; group.add(head);
            const visor = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.18, 0.12), accentMat); visor.position.set(0, 1.74, 0.38); group.add(visor);
            const headTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.65), mat); headTop.position.set(0, 2.1, 0); group.add(headTop);
            const antL = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.5, 6), accentMat); antL.position.set(-0.25, 2.4, 0); group.add(antL);
            const antR = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.5, 6), accentMat); antR.position.set(0.25, 2.4, 0); group.add(antR);
            // Neck
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.35, 8), mat); neck.position.y = 1.18; group.add(neck);
            // Chest with armor plates
            const chest = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.1, 0.82), mat); chest.position.y = 0.4; group.add(chest);
            const chestPlateL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.12), accentMat); chestPlateL.position.set(-0.35, 0.5, 0.47); group.add(chestPlateL);
            const chestPlateR = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.12), accentMat); chestPlateR.position.set(0.35, 0.5, 0.47); group.add(chestPlateR);
            const coreOrb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), accentMat); coreOrb.position.set(0, 0.45, 0.48); group.add(coreOrb);
            // Waist
            const waist = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.3, 0.65), mat); waist.position.y = -0.25; group.add(waist);
            // Legs
            const legL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.42), mat); legL.position.set(-0.38, -0.9, 0); group.add(legL);
            const legR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.42), mat); legR.position.set(0.38, -0.9, 0); group.add(legR);
            const footL = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.58), mat); footL.position.set(-0.38, -1.43, 0.08); group.add(footL);
            const footR = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.58), mat); footR.position.set(0.38, -1.43, 0.08); group.add(footR);
            // Arms with shoulder pauldrons
            const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), mat); shoulderL.position.set(-1.02, 0.72, 0); group.add(shoulderL);
            const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), mat); shoulderR.position.set(1.02, 0.72, 0); group.add(shoulderR);
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.85, 8), mat); armL.position.set(-1.08, 0.18, 0); group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.85, 8), mat); armR.position.set(1.08, 0.18, 0); group.add(armR);
            const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.7, 8), mat); forearmL.position.set(-1.08, -0.42, 0); group.add(forearmL);
            const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.7, 8), mat); forearmR.position.set(1.08, -0.42, 0); group.add(forearmR);
            const handL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.22), mat); handL.position.set(-1.08, -0.92, 0); group.add(handL);
            const handR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.22), mat); handR.position.set(1.08, -0.92, 0); group.add(handR);

        } else if (presetKey === 'cyber_car') {
            // Low-profile chassis
            const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 1.55), mat); chassis.position.y = 0.22; group.add(chassis);
            // Aerodynamic body
            const bodyGeo = new THREE.BufferGeometry();
            const bv = new Float32Array([
                -1.7,0.22,-0.77, 1.7,0.22,-0.77, 1.7,0.22,0.77, -1.7,0.22,0.77,
                -1.1,0.78,-0.65, 0.85,0.78,-0.65, 0.85,0.78,0.65, -1.1,0.78,0.65,
            ]);
            const bi = new Uint16Array([0,4,1, 1,4,5, 1,5,2, 2,5,6, 2,6,3, 3,6,7, 3,7,0, 0,7,4, 4,7,5, 5,7,6, 0,1,2, 0,2,3]);
            bodyGeo.setAttribute('position', new THREE.BufferAttribute(bv,3));
            bodyGeo.setIndex(new THREE.BufferAttribute(bi,1));
            bodyGeo.computeVertexNormals();
            const carBody = new THREE.Mesh(bodyGeo, mat); group.add(carBody);
            // Canopy glass
            const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.15), accentMat); canopy.position.set(-0.1, 0.9, 0); group.add(canopy);
            // Front splitter
            const splitter = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.3), accentMat); splitter.position.set(0, 0.12, -0.95); group.add(splitter);
            // Rear wing
            const rearWing = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.35), accentMat); rearWing.position.set(0, 0.95, 0.85); group.add(rearWing);
            const wingPostL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), mat); wingPostL.position.set(-0.8, 0.74, 0.85); group.add(wingPostL);
            const wingPostR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), mat); wingPostR.position.set(0.8, 0.74, 0.85); group.add(wingPostR);
            // 4 wheels
            for (let wx = -1; wx <= 1; wx += 2) {
                for (let wz = -1; wz <= 1; wz += 2) {
                    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16), mat); wheel.rotation.z = Math.PI/2;
                    wheel.position.set(wx*1.35, 0.0, wz*0.78); group.add(wheel);
                    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 12), accentMat); rim.rotation.x = Math.PI/2;
                    rim.position.set(wx*1.47, 0.0, wz*0.78); group.add(rim);
                }
            }

        } else if (presetKey === 'pirate_ship') {
            // Hull (curved boat shape via beveled box)
            const hull = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.75, 1.4, 4, 1, 1), mat); hull.position.y = 0; group.add(hull);
            // Hull bottom keel
            const keel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 0.4), mat); keel.position.y = -0.5; group.add(keel);
            // Deck
            const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.3), mat); deck.position.y = 0.43; group.add(deck);
            // Bow (front raised) 
            const bow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 1.3), mat); bow.position.set(1.85, 0.35, 0); group.add(bow);
            // Stern (rear raised)
            const stern = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 1.3), mat); stern.position.set(-1.85, 0.45, 0); group.add(stern);
            // 3 masts
            const mastPositions = [0.7, -0.2, -1.3];
            const mastHeights = [3.0, 2.5, 2.0];
            mastPositions.forEach((mx, i) => {
                const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, mastHeights[i], 8), accentMat);
                mast.position.set(mx, 0.43 + mastHeights[i]/2, 0); group.add(mast);
                // Yard arm
                const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4-i*0.3, 6), mat);
                yard.rotation.z = Math.PI/2; yard.position.set(mx, 0.43 + mastHeights[i]*0.7, 0); group.add(yard);
                // Crow's nest
                const nest = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.2, 8), mat);
                nest.position.set(mx, 0.43 + mastHeights[i] - 0.35, 0); group.add(nest);
            });
            // Cannons on deck
            for (let ci = -1; ci <= 1; ci += 2) {
                const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 8), accentMat);
                cannon.rotation.z = Math.PI/2; cannon.position.set(ci*0.6, 0.58, 0.6); group.add(cannon);
                const cannon2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 8), accentMat);
                cannon2.rotation.z = Math.PI/2; cannon2.position.set(ci*0.6, 0.58, -0.6); group.add(cannon2);
            }

        } else if (presetKey === 'saturn_galaxy') {
            // Planet with slight polar flattening
            const planet = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 24), mat); planet.scale.set(1,0.92,1); group.add(planet);
            // Storm band
            const band = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.06, 8, 40), accentMat); band.position.y = 0.1; group.add(band);
            // Layered ring system
            const ringAngles = [Math.PI/3.2, Math.PI/3.4, Math.PI/3.0];
            const ringData = [[1.55, 0.08], [2.0, 0.11], [2.5, 0.07]];
            ringData.forEach(([r, t], i) => {
                const ring = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, 56), accentMat);
                ring.rotation.x = ringAngles[i]; group.add(ring);
            });
            // Small moon
            const moon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mat); moon.position.set(3.2, 0.4, 0); group.add(moon);

        } else if (presetKey === 'crystal_tower') {
            // Base platform
            const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 0.25, 6), mat); base.position.y = -1.6; group.add(base);
            // Lower crystal cluster base
            const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 0.45, 6), mat); pedestal.position.y = -1.25; group.add(pedestal);
            // Central main crystal spire
            const mainCrystal = new THREE.Mesh(new THREE.ConeGeometry(0.42, 3.2, 6), mat); mainCrystal.position.y = 0.4; group.add(mainCrystal);
            const mainBase = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.4, 6), mat); mainBase.position.y = -1.05; group.add(mainBase);
            // Side crystal spires at angles
            const sideData = [[0.22, 2.0, 0.9, 0, -0.9, 0.18], [0.2, 1.7, -0.8, 0, -0.8, -0.12], [0.18, 1.5, 0.0, 0, -1.0, 0.08], [0.15, 1.3, 0.7, 0, -1.1, -0.07]];
            const subAngles = [0, Math.PI*2/3, Math.PI*4/3, Math.PI/3];
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const radius = 0.68 + (i % 2) * 0.15;
                const height = 1.6 - i * 0.1;
                const cr = 0.14 - i * 0.01;
                const side = new THREE.Mesh(new THREE.ConeGeometry(cr, height, 5), accentMat);
                side.position.set(Math.cos(angle)*radius, -1.05 + height/2, Math.sin(angle)*radius);
                side.rotation.z = (i % 2 === 0 ? 0.12 : -0.12); group.add(side);
            }
            // Energy orb at apex
            const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), accentMat); orb.position.y = 2.05; group.add(orb);
            // Energy rings around orb
            for (let r = 0; r < 3; r++) {
                const eRing = new THREE.Mesh(new THREE.TorusGeometry(0.35 + r*0.1, 0.02, 6, 20), accentMat);
                eRing.position.y = 2.05; eRing.rotation.x = r * Math.PI/3; group.add(eRing);
            }

        } else if (presetKey === 'mech_warrior') {
            // Massive armored head
            const head = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.8, 0.9), mat); head.position.y = 2.3; group.add(head);
            const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.35, 0.88), mat); helmet.position.set(0, 2.75, 0); group.add(helmet);
            const visor = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.12), accentMat); visor.position.set(0, 2.38, 0.46); group.add(visor);
            const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), accentMat); eyeL.position.set(-0.22, 2.38, 0.48); group.add(eyeL);
            const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), accentMat); eyeR.position.set(0.22, 2.38, 0.48); group.add(eyeR);
            // Neck hydraulics
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 0.4, 8), mat); neck.position.y = 1.78; group.add(neck);
            const neckPipeL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), accentMat); neckPipeL.position.set(-0.18, 1.88, 0.15); neckPipeL.rotation.x = 0.3; group.add(neckPipeL);
            const neckPipeR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), accentMat); neckPipeR.position.set(0.18, 1.88, 0.15); neckPipeR.rotation.x = 0.3; group.add(neckPipeR);
            // Massive chest armor
            const chest = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.3, 1.05), mat); chest.position.y = 0.85; group.add(chest);
            const chestVent = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.14), accentMat); chestVent.position.set(0, 1.1, 0.54); group.add(chestVent);
            const reactorCore = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), accentMat); reactorCore.position.set(0, 0.75, 0.56); group.add(reactorCore);
            // Waist armor
            const waist = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.9), mat); waist.position.y = 0.08; group.add(waist);
            // Heavy legs
            const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.58), mat); thighL.position.set(-0.55, -0.64, 0); group.add(thighL);
            const thighR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.58), mat); thighR.position.set(0.55, -0.64, 0); group.add(thighR);
            const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.85, 0.52), mat); shinL.position.set(-0.55, -1.6, 0.05); group.add(shinL);
            const shinR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.85, 0.52), mat); shinR.position.set(0.55, -1.6, 0.05); group.add(shinR);
            const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.76), mat); bootL.position.set(-0.55, -2.14, 0.12); group.add(bootL);
            const bootR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.76), mat); bootR.position.set(0.55, -2.14, 0.12); group.add(bootR);
            // Massive shoulder armor
            const paulL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.55, 0.72), mat); paulL.position.set(-1.35, 1.4, 0); group.add(paulL);
            const paulR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.55, 0.72), mat); paulR.position.set(1.35, 1.4, 0); group.add(paulR);
            // Arms
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 1.0, 8), mat); armL.position.set(-1.42, 0.72, 0); group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 1.0, 8), mat); armR.position.set(1.42, 0.72, 0); group.add(armR);
            // Heavy forearms / weapons
            const weaponL = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.18, 0.9, 8), mat); weaponL.position.set(-1.42, -0.12, 0); group.add(weaponL);
            const cannonL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 1.1, 8), accentMat); cannonL.rotation.x = Math.PI/2; cannonL.position.set(-1.42, -0.12, 0.6); group.add(cannonL);
            const weaponR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.38, 0.9), mat); weaponR.position.set(1.42, -0.18, 0); group.add(weaponR);
            const bladeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 1.4), accentMat); bladeR.position.set(1.42, -0.18, 0.85); group.add(bladeR);

        } else if (presetKey === 'space_fighter') {
            // Central fuselage (sleek and angular)
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 2.8, 6), mat); body.rotation.x = Math.PI/2; group.add(body);
            // Nose
            const noseGeo = new THREE.ConeGeometry(0.22, 1.2, 6); 
            const nose = new THREE.Mesh(noseGeo, mat); nose.rotation.x = -Math.PI/2; nose.position.z = 2.0; group.add(nose);
            // Cockpit
            const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 6, 0, Math.PI*2, 0, Math.PI/2), accentMat); cockpit.rotation.x = Math.PI/2; cockpit.position.z = 0.9; group.add(cockpit);
            // Main delta wings
            const wingGeoL = new THREE.BufferGeometry();
            const wlv = new Float32Array([0,0,0.8, -2.4,0,-0.5, -0.5,0,-1.4, 0,0,-1.4]); wingGeoL.setAttribute('position', new THREE.BufferAttribute(wlv,3));
            wingGeoL.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1)); wingGeoL.computeVertexNormals();
            const wingL = new THREE.Mesh(wingGeoL, mat); group.add(wingL);
            const wingGeoR = new THREE.BufferGeometry();
            const wrv = new Float32Array([0,0,0.8, 2.4,0,-0.5, 0.5,0,-1.4, 0,0,-1.4]); wingGeoR.setAttribute('position', new THREE.BufferAttribute(wrv,3));
            wingGeoR.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1)); wingGeoR.computeVertexNormals();
            const wingR = new THREE.Mesh(wingGeoR, mat); group.add(wingR);
            // Wing strakes
            const strakeL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.6), accentMat); strakeL.position.set(-0.7, 0, -0.2); group.add(strakeL);
            const strakeR = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.6), accentMat); strakeR.position.set(0.7, 0, -0.2); group.add(strakeR);
            // Twin engine pods
            const engL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 1.1, 8), mat); engL.rotation.x = Math.PI/2; engL.position.set(-0.85, 0, -1.35); group.add(engL);
            const engR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 1.1, 8), mat); engR.rotation.x = Math.PI/2; engR.position.set(0.85, 0, -1.35); group.add(engR);
            const glowL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 8), accentMat); glowL.rotation.x = Math.PI/2; glowL.position.set(-0.85, 0, -1.95); group.add(glowL);
            const glowR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 8), accentMat); glowR.rotation.x = Math.PI/2; glowR.position.set(0.85, 0, -1.95); group.add(glowR);
            // Vertical tail fin
            const finGeo = new THREE.BufferGeometry();
            const fv = new Float32Array([0,0,-1.4, 0,0.7,-0.4, 0,0.15,0.6]); finGeo.setAttribute('position', new THREE.BufferAttribute(fv,3)); finGeo.computeVertexNormals();
            const fin = new THREE.Mesh(finGeo, accentMat); fin.position.y = 0.28; group.add(fin);
            // Laser cannons on wings
            const laserL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 1.4, 6), accentMat); laserL.rotation.x = Math.PI/2; laserL.position.set(-1.8, 0, -0.2); group.add(laserL);
            const laserR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 1.4, 6), accentMat); laserR.rotation.x = Math.PI/2; laserR.position.set(1.8, 0, -0.2); group.add(laserR);

        } else {
            const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.2), mat);
            group.add(mesh);
        }
        return group;
    }


    function create3DTextTexture(text, colorHex) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 1024, 256);

            ctx.fillStyle = 'rgba(10, 15, 30, 0.85)';
            ctx.strokeStyle = colorHex || '#00f2fe';
            ctx.lineWidth = 6;
            if (ctx.roundRect) {
                ctx.beginPath();
                ctx.roundRect(24, 24, 976, 208, 40);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.fillRect(24, 24, 976, 208);
            }

            let cleanText = (text || '3D TEXT').replace(/[\uE000-\uF8FF]/g, '');
            let fontSize = 54;
            ctx.font = `bold ${fontSize}px sans-serif`;
            let textWidth = ctx.measureText(cleanText).width;

            while (textWidth > 900 && fontSize > 16) {
                fontSize -= 2;
                ctx.font = `bold ${fontSize}px sans-serif`;
                textWidth = ctx.measureText(cleanText).width;
            }

            ctx.fillStyle = colorHex || '#00f2fe';
            ctx.shadowColor = colorHex || '#00f2fe';
            ctx.shadowBlur = 18;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cleanText, 512, 128);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        } catch(e) {
            const fallbackCanvas = document.createElement('canvas');
            fallbackCanvas.width = 256; fallbackCanvas.height = 64;
            const fCtx = fallbackCanvas.getContext('2d');
            fCtx.fillStyle = colorHex || '#00f2fe';
            fCtx.fillRect(0, 0, 256, 64);
            const tex = new THREE.CanvasTexture(fallbackCanvas);
            tex.needsUpdate = true;
            return tex;
        }
    }

    function createMatrixCanvasTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#00ffcc'; ctx.font = '14px monospace';
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
                ctx.fillText(char, i * 16, j * 16 + 14);
            }
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }

    function createCarbonFiberTexture() {
        try {
            const canvas = document.createElement('canvas'); canvas.width = 128; canvas.height = 128;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#111318'; ctx.fillRect(0, 0, 128, 128);
            ctx.fillStyle = '#222632';
            for (let y = 0; y < 128; y += 16) {
                for (let x = 0; x < 128; x += 16) {
                    if ((x / 16 + y / 16) % 2 === 0) {
                        ctx.fillRect(x, y, 14, 14);
                    }
                }
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(4, 4);
            return tex;
        } catch(e) { return null; }
    }

    function createMaterial(type, colorHex) {
        const color = new THREE.Color(colorHex);
        const isWire = document.getElementById('btn-toggle-wireframe') ? document.getElementById('btn-toggle-wireframe').classList.contains('active') : false;

        switch (type) {
            case 'glass':
                return new THREE.MeshPhysicalMaterial({ color: color, transparent: true, opacity: 0.45, roughness: 0.1, transmission: 0.9, wireframe: isWire });
            case 'hologram':
                return new THREE.MeshPhongMaterial({ color: color, emissive: color, wireframe: true, transparent: true, opacity: 0.7, shininess: 100 });
            case 'matrix':
                const matTexture = createMatrixCanvasTexture();
                return new THREE.MeshStandardMaterial({ map: matTexture, color: color, roughness: 0.2, metalness: 0.8, emissive: color, emissiveIntensity: 0.6 });
            case 'plasma':
            case 'quantum-plasma':
                return new THREE.MeshPhysicalMaterial({ color: color, emissive: new THREE.Color(0xff007f), emissiveIntensity: 1.2, roughness: 0.1, metalness: 0.9, clearcoat: 1.0, wireframe: isWire });
            case 'carbon-fiber':
                const carbonTex = createCarbonFiberTexture();
                return new THREE.MeshStandardMaterial({ map: carbonTex, color: color, roughness: 0.3, metalness: 0.8, wireframe: isWire });
            case 'liquid-gold':
                return new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0xffb703), metalness: 1.0, roughness: 0.05, clearcoat: 1.0, emissive: new THREE.Color(0xffb703), emissiveIntensity: 0.2, wireframe: isWire });
            case 'iridescent-glass':
                return new THREE.MeshPhysicalMaterial({ color: color, transparent: true, opacity: 0.65, roughness: 0.05, transmission: 0.92, clearcoat: 1.0, reflectivity: 0.9, wireframe: isWire });
            case 'holographic-water':
                return new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0x00f2fe), transparent: true, opacity: 0.75, roughness: 0.08, transmission: 0.85, emissive: new THREE.Color(0x00ffcc), emissiveIntensity: 0.4, wireframe: isWire });
            case 'wire-glow':
                return new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 1.5, wireframe: true });
            case 'neon':
                return new THREE.MeshBasicMaterial({ color: color, wireframe: isWire });
            default:
                return new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.7, wireframe: isWire });
        }
    }

    function createHyperspaceWormholeParticles() {
        if (warpParticles) scene.remove(warpParticles);

        const count = 4000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count);

        const cyan = new THREE.Color(0x00f2fe);
        const magenta = new THREE.Color(0xff007f);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 10 + 1.2;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.sin(angle) * radius;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            velocities[i] = Math.random() * 0.4 + 0.15;

            const c = Math.random() > 0.5 ? cyan : magenta;
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.95
        });

        warpParticles = new THREE.Points(geometry, material);
        warpParticles.name = 'warp-particles';
        warpParticles.userData = { velocities };
        scene.add(warpParticles);
    }

    function clearSceneUserObjects() {
        for (let i = scene.children.length - 1; i >= 0; i--) {
            const obj = scene.children[i];
            if (obj.name !== 'grid-floor' && obj.name !== 'default-light' && obj.name !== 'warp-particles') {
                scene.remove(obj);
            }
        }
        customObjects = [];
        animationCallbacks = [];
        physicsObjects = [];
        polytopeMeshGroup = null;
    }

    function updateInspectorModelDropdown() {
        const modelSelect = document.getElementById('inspector-model-select');
        modelSelect.innerHTML = '';

        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${codeEditor.value}</div>`, 'text/html');
        const container = doc.body.firstChild;

        let modelIndex = 1;
        let presetsFound = [];

        container.querySelectorAll('model-3d').forEach(node => {
            const preset = node.getAttribute('preset') || 'cyber_drone';
            const label = preset.startsWith('imported_') 
                ? `📦 Model #${modelIndex} (${preset.substring(0, 16)}...)` 
                : `🛸 Model #${modelIndex} (${preset})`;
            
            const opt = document.createElement('option');
            opt.value = preset;
            opt.textContent = label;
            modelSelect.appendChild(opt);

            presetsFound.push(preset);
            modelIndex++;
        });

        let imgIndex = 1;
        container.querySelectorAll('image-3d').forEach(node => {
            const src = node.getAttribute('src') || 'image';
            const imgId = node.getAttribute('id') || `image_${imgIndex}`;
            const label = `🖼️ Photo #${imgIndex} (${src.substring(0, 18)}...)`;

            const opt = document.createElement('option');
            opt.value = imgId;
            opt.textContent = label;
            modelSelect.appendChild(opt);

            presetsFound.push(imgId);
            imgIndex++;
        });

        container.querySelectorAll('text-3d').forEach(node => {
            const textVal = node.getAttribute('text') || '3D TEXT';
            const label = `🔤 Text: "${textVal}"`;

            const opt = document.createElement('option');
            opt.value = textVal;
            opt.textContent = label;
            modelSelect.appendChild(opt);

            presetsFound.push(textVal);
        });

        let pinIndex = 1;
        container.querySelectorAll('hotspot-pin').forEach(node => {
            const titleVal = node.getAttribute('title') || `Hotspot Pin #${pinIndex}`;
            const pinKey = `pin_${titleVal}`;
            const label = `📍 Hotspot Pin: "${titleVal}"`;

            const opt = document.createElement('option');
            opt.value = pinKey;
            opt.textContent = label;
            modelSelect.appendChild(opt);

            presetsFound.push(pinKey);
            pinIndex++;
        });

        if (presetsFound.length > 0) {
            if (!activePresetKey || !presetsFound.includes(activePresetKey)) {
                activePresetKey = presetsFound[0];
            }
            modelSelect.value = activePresetKey;
            syncInspectorSlidersFromModelTag(activePresetKey);
        } else {
            activePresetKey = null;
        }
    }

    function syncInspectorSlidersFromModelTag(presetKey) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${codeEditor.value}</div>`, 'text/html');
        const container = doc.body.firstChild;

        let imgIndex = 1;
        container.querySelectorAll('model-3d, text-3d, image-3d, hotspot-pin').forEach(node => {
            let key = '';
            if (node.tagName.toLowerCase() === 'text-3d') key = node.getAttribute('text');
            else if (node.tagName.toLowerCase() === 'image-3d') key = node.getAttribute('id') || `image_${imgIndex++}`;
            else if (node.tagName.toLowerCase() === 'hotspot-pin') key = `pin_${node.getAttribute('title') || 'Hotspot Pin'}`;
            else key = node.getAttribute('preset');

            if (key === presetKey) {
                const px = parseFloat(node.getAttribute('x') || '0');
                const py = parseFloat(node.getAttribute('y') || '0');
                const pz = parseFloat(node.getAttribute('z') || '0');
                const rx = parseFloat(node.getAttribute('rot-x') || '0');
                const ry = parseFloat(node.getAttribute('rot-y') || '0');
                const rz = parseFloat(node.getAttribute('rot-z') || '0');
                const w = parseFloat(node.getAttribute('width') || '3.5');
                const h = parseFloat(node.getAttribute('height') || '2.5');
                const scale = parseFloat(node.getAttribute('scale') || '1');
                const color = node.getAttribute('color') || '#00f2fe';
                const frame = node.getAttribute('frame') || 'neon';

                document.getElementById('slider-pos-x').value = px;
                document.getElementById('slider-pos-y').value = py;
                document.getElementById('slider-pos-z').value = pz;
                document.getElementById('slider-rot-x').value = rx;
                document.getElementById('slider-rot-y').value = ry;
                document.getElementById('slider-rot-z').value = rz;
                document.getElementById('slider-img-width').value = w;
                document.getElementById('slider-img-height').value = h;
                document.getElementById('slider-scale').value = scale;
                document.getElementById('picker-model-color').value = color;
                document.getElementById('select-img-frame').value = frame;

                document.getElementById('val-pos-x').textContent = px.toFixed(1);
                document.getElementById('val-pos-y').textContent = py.toFixed(1);
                document.getElementById('val-pos-z').textContent = pz.toFixed(1);
                document.getElementById('val-rot-x').textContent = `${Math.round(rx)}°`;
                document.getElementById('val-rot-y').textContent = `${Math.round(ry)}°`;
                document.getElementById('val-rot-z').textContent = `${Math.round(rz)}°`;
                document.getElementById('val-img-width').textContent = w.toFixed(1);
                document.getElementById('val-img-height').textContent = h.toFixed(1);
                document.getElementById('val-scale').textContent = scale.toFixed(1);

                // Sync modal sliders if present
                const modalW = document.getElementById('modal-slider-w');
                const modalH = document.getElementById('modal-slider-h');
                const modalRY = document.getElementById('modal-slider-ry');
                const modalColor = document.getElementById('modal-frame-color');
                if (modalW) modalW.value = w;
                if (modalH) modalH.value = h;
                if (modalRY) modalRY.value = ry;
                if (modalColor) modalColor.value = color;
                if (document.getElementById('modal-val-w')) document.getElementById('modal-val-w').textContent = w.toFixed(1);
                if (document.getElementById('modal-val-h')) document.getElementById('modal-val-h').textContent = h.toFixed(1);
                if (document.getElementById('modal-val-ry')) document.getElementById('modal-val-ry').textContent = `${Math.round(ry)}°`;
            }
        });
    }

    function setActiveModelPreset(presetKey) {
        activePresetKey = presetKey;
        const modelSelect = document.getElementById('inspector-model-select');
        if (modelSelect) modelSelect.value = presetKey;
        syncInspectorSlidersFromModelTag(presetKey);
        document.getElementById('panel-transform-inspector').classList.remove('hidden');
        document.getElementById('btn-toggle-inspector').classList.add('active');
    }

    function showHotspotPopup(title, price, detail, colorHex) {
        let modal = document.getElementById('modal-hotspot-popup');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-hotspot-popup';
            modal.className = 'modal-overlay active';
            modal.style.zIndex = '999999';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="modal-card" style="max-width:380px; background:rgba(10,15,30,0.95); border:2px solid ${colorHex || '#00f2fe'}; box-shadow:0 0 35px ${colorHex || '#00f2fe'}; backdrop-filter:blur(16px); border-radius:20px; padding:22px; animation: modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                    <span style="background:${colorHex || '#00f2fe'}; color:#000; font-weight:700; font-size:0.75rem; padding:4px 10px; border-radius:20px; text-transform:uppercase;">📍 3D Hotspot Spec</span>
                    <button onclick="document.getElementById('modal-hotspot-popup').remove()" style="background:none; border:none; color:#fff; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <h3 style="color:#fff; font-size:1.3rem; margin:0 0 6px 0; font-family:var(--font-primary);">${title}</h3>
                <div style="color:${colorHex || '#00f2fe'}; font-size:1.2rem; font-weight:700; margin-bottom:10px;">${price}</div>
                <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.4; margin-bottom:18px;">${detail}</p>
                <button onclick="alert('🛍️ Opening product link for ${title}...'); document.getElementById('modal-hotspot-popup').remove()" class="btn btn-primary btn-glow-accent" style="width:100%; border-color:${colorHex || '#00f2fe'}; background:${colorHex || '#00f2fe'}; color:#000; font-weight:700;">
                    <i class="fa-solid fa-cart-shopping"></i> BUY NOW 🚀
                </button>
            </div>
        `;
        modal.classList.add('active');
    }

    function attachExplodeEngineToGroup(group, baseFactor) {
        if (!group || !group.children) return;
        const originalPositions = [];
        group.children.forEach(child => {
            originalPositions.push(child.position.clone());
        });

        group.userData.setExplodeFactor = (f) => {
            group.children.forEach((child, i) => {
                const orig = originalPositions[i];
                if (!orig) return;
                const dir = orig.length() > 0 ? orig.clone().normalize() : new THREE.Vector3(0, (i + 1) * 0.4, 0);
                child.position.copy(orig).add(dir.multiplyScalar(f * 1.5));
            });
        };

        if (baseFactor > 0) group.userData.setExplodeFactor(baseFactor);
    }

    function parseHTML3DTags(codeText) {
        clearSceneUserObjects();

        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${codeText}</div>`, 'text/html');
        const container = doc.body.firstChild;

        let imageTagCounter = 1;

        container.childNodes.forEach(node => {
            if (node.nodeType !== 1) return;

            const tagName = node.tagName.toLowerCase();
            const getAttr = (name, def) => node.getAttribute(name) || def;

            if (tagName === 'image-3d') {
                const src = getAttr('src', 'https://picsum.photos/400/300');
                const imgId = getAttr('id', `image_${imageTagCounter++}`);
                const x = parseFloat(getAttr('x', '0'));
                const y = parseFloat(getAttr('y', '1'));
                const z = parseFloat(getAttr('z', '0'));
                const w = parseFloat(getAttr('width', '3.5'));
                const h = parseFloat(getAttr('height', '2.5'));
                const scale = parseFloat(getAttr('scale', '1'));
                const rx = (parseFloat(getAttr('rot-x', '0')) * Math.PI) / 180;
                const ry = (parseFloat(getAttr('rot-y', '0')) * Math.PI) / 180;
                const rz = (parseFloat(getAttr('rot-z', '0')) * Math.PI) / 180;
                const frameStyle = getAttr('frame', 'neon');
                const colorHex = getAttr('color', '#00f2fe');
                const animate = getAttr('animate', '');
                const depthAmount = parseFloat(getAttr('depth', '0.4'));
                const hasScanner = getAttr('scanner', 'false') === 'true';
                const backStyle = getAttr('back', 'none');
                const hasDisintegrate = getAttr('disintegrate', 'false') === 'true';
                const isInverted = getAttr('invert', 'false') === 'true';

                const textureLoader = new THREE.TextureLoader();
                const imageGroup = new THREE.Group();

                const planeGeo = new THREE.PlaneGeometry(w, h, 48, 48);

                textureLoader.load(src, (texture) => {
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;

                    // 1. 🗿 3D Volumetric Depth Relief & Height Displacement Engine (Run FIRST on raw image)
                    if (depthAmount > 0) {
                        try {
                            const offCanvas = document.createElement('canvas');
                            offCanvas.width = 64; offCanvas.height = 64;
                            const offCtx = offCanvas.getContext('2d');
                            const imgElem = texture.image;
                            if (imgElem && (imgElem.complete || imgElem.width > 0)) {
                                offCtx.drawImage(imgElem, 0, 0, 64, 64);
                                const imgData = offCtx.getImageData(0, 0, 64, 64).data;
                                const pos = planeGeo.attributes.position;
                                for (let i = 0; i < pos.count; i++) {
                                    const u = Math.floor(((pos.getX(i) / w) + 0.5) * 63);
                                    const v = Math.floor(((pos.getY(i) / h) + 0.5) * 63);
                                    const idx = (v * 64 + u) * 4;
                                    const rVal = imgData[idx] || 0;
                                    const gVal = imgData[idx+1] || 0;
                                    const bVal = imgData[idx+2] || 0;
                                    const lum = (rVal * 0.299 + gVal * 0.587 + bVal * 0.114) / 255;
                                    pos.setZ(i, (lum - 0.5) * depthAmount * 0.35);
                                }
                                pos.needsUpdate = true;
                                planeGeo.computeVertexNormals();
                            }
                        } catch(e){}
                    }

                    // 2. 🔄 Photo Color Inversion Engine (Run SECOND to invert texture colors)
                    if (isInverted && texture.image) {
                        try {
                            const invCanvas = document.createElement('canvas');
                            invCanvas.width = texture.image.width || 512;
                            invCanvas.height = texture.image.height || 512;
                            const invCtx = invCanvas.getContext('2d');
                            invCtx.drawImage(texture.image, 0, 0, invCanvas.width, invCanvas.height);
                            const imgData = invCtx.getImageData(0, 0, invCanvas.width, invCanvas.height);
                            const d = imgData.data;
                            for (let i = 0; i < d.length; i += 4) {
                                d[i] = 255 - d[i];
                                d[i+1] = 255 - d[i+1];
                                d[i+2] = 255 - d[i+2];
                            }
                            invCtx.putImageData(imgData, 0, 0);
                            const invTex = new THREE.CanvasTexture(invCanvas);
                            invTex.minFilter = THREE.LinearFilter;
                            invTex.magFilter = THREE.LinearFilter;
                            texture = invTex;
                        } catch(e){}
                    }

                    // 2b. 🪄 Magic Remove Background Cutout Engine
                    const hasCutout = getAttr('cutout', 'false') === 'true' || getAttr('autocutout', 'false') === 'true';
                    if (hasCutout && texture.image) {
                        try {
                            const cutCanvas = document.createElement('canvas');
                            const cutW = texture.image.width || 512, cutH = texture.image.height || 512;
                            cutCanvas.width = cutW; cutCanvas.height = cutH;
                            const cutCtx = cutCanvas.getContext('2d');
                            cutCtx.drawImage(texture.image, 0, 0, cutW, cutH);
                            const imgData = cutCtx.getImageData(0, 0, cutW, cutH);
                            const d = imgData.data;

                            const cornerR = (d[0] + d[(cutW - 1) * 4] + d[(cutH - 1) * cutW * 4] + d[(cutH * cutW - 1) * 4]) / 4;
                            const cornerG = (d[1] + d[(cutW - 1) * 4 + 1] + d[(cutH - 1) * cutW * 4 + 1] + d[(cutH * cutW - 1) * 4 + 1]) / 4;
                            const cornerB = (d[2] + d[(cutW - 1) * 4 + 2] + d[(cutH - 1) * cutW * 4 + 2] + d[(cutH * cutW - 1) * 4 + 2]) / 4;

                            for (let i = 0; i < d.length; i += 4) {
                                const r = d[i], g = d[i+1], b = d[i+2];
                                const dist = Math.sqrt((r - cornerR)**2 + (g - cornerG)**2 + (b - cornerB)**2);
                                const isNearWhite = (r > 220 && g > 220 && b > 220);
                                const isNearBlack = (r < 30 && g < 30 && b < 30);
                                if (dist < 70 || isNearWhite || isNearBlack) {
                                    d[i + 3] = 0;
                                }
                            }
                            cutCtx.putImageData(imgData, 0, 0);
                            const cutTex = new THREE.CanvasTexture(cutCanvas);
                            cutTex.minFilter = THREE.LinearFilter;
                            cutTex.magFilter = THREE.LinearFilter;
                            texture = cutTex;
                        } catch(e){}
                    }

                    const planeMat = new THREE.MeshStandardMaterial({
                        map: texture,
                        transparent: true,
                        alphaTest: 0.05,
                        side: THREE.DoubleSide,
                        roughness: 0.2,
                        metalness: 0.1
                    });

                    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
                    imageGroup.add(planeMesh);

                    // 3. 🪞 Holographic Dual-Sided Backing Card
                    if (backStyle === 'hologram' || backStyle === 'true') {
                        const backGeo = new THREE.PlaneGeometry(w, h);
                        const backMat = createMaterial('matrix', colorHex);
                        const backMesh = new THREE.Mesh(backGeo, backMat);
                        backMesh.position.z = -0.04;
                        backMesh.rotation.y = Math.PI;
                        imageGroup.add(backMesh);
                    }

                    // 4. ⚡ Cyber Laser Scanner Beam
                    if (hasScanner) {
                        const scannerColor = new THREE.Color(colorHex);
                        const laserGeo = new THREE.BoxGeometry(w + 0.2, 0.04, 0.06);
                        const laserMat = new THREE.MeshBasicMaterial({ color: scannerColor });
                        const laserMesh = new THREE.Mesh(laserGeo, laserMat);
                        laserMesh.position.z = 0.05;
                        imageGroup.add(laserMesh);

                        let laserY = -h / 2;
                        let laserDir = 1;
                        animationCallbacks.push(() => {
                            laserY += 0.03 * laserDir * timeSpeedMultiplier;
                            if (laserY > h / 2 || laserY < -h / 2) laserDir *= -1;
                            laserMesh.position.y = laserY;
                        });
                    }

                    // 5. 💥 Particle Disintegration FX Engine (Only active when disintegrate="true")
                    let isDisintegrated = false;
                    let disProgress = 0;

                    if (hasDisintegrate) {
                        const countP = 1500;
                        const pGeo = new THREE.BufferGeometry();
                        const posP = new Float32Array(countP * 3);
                        const origP = new Float32Array(countP * 3);
                        const velP = new Float32Array(countP * 3);

                        for (let i = 0; i < countP; i++) {
                            const px = (Math.random() - 0.5) * w;
                            const py = (Math.random() - 0.5) * h;
                            const pz = (Math.random() - 0.5) * 0.1;
                            origP[i*3] = px; origP[i*3+1] = py; origP[i*3+2] = pz;
                            posP[i*3] = px; posP[i*3+1] = py; posP[i*3+2] = pz;
                            velP[i*3] = (Math.random() - 0.5) * 2.5;
                            velP[i*3+1] = (Math.random() - 0.5) * 2.5;
                            velP[i*3+2] = Math.random() * 2.5 + 0.5;
                        }
                        pGeo.setAttribute('position', new THREE.BufferAttribute(posP, 3));
                        const pMat = new THREE.PointsMaterial({ size: 0.06, color: new THREE.Color(colorHex), transparent: true, opacity: 0.9 });
                        const pMesh = new THREE.Points(pGeo, pMat);
                        pMesh.visible = false;
                        imageGroup.add(pMesh);

                        imageGroup.userData.triggerDisintegrate = () => {
                            isDisintegrated = !isDisintegrated;
                        };
                        imageGroup.children.forEach(child => { child.userData = imageGroup.userData; });

                        animationCallbacks.push(() => {
                            if (isDisintegrated && disProgress < 1.0) {
                                disProgress += 0.04 * timeSpeedMultiplier;
                                planeMesh.visible = false;
                                pMesh.visible = true;
                            } else if (!isDisintegrated && disProgress > 0) {
                                disProgress -= 0.04 * timeSpeedMultiplier;
                                if (disProgress <= 0) {
                                    planeMesh.visible = true;
                                    pMesh.visible = false;
                                }
                            }

                            if (pMesh.visible) {
                                const arr = pMesh.geometry.attributes.position.array;
                                for (let i = 0; i < countP; i++) {
                                    arr[i*3] = origP[i*3] + velP[i*3] * disProgress;
                                    arr[i*3+1] = origP[i*3+1] + velP[i*3+1] * disProgress;
                                    arr[i*3+2] = origP[i*3+2] + velP[i*3+2] * disProgress;
                                }
                                pMesh.geometry.attributes.position.needsUpdate = true;
                            }
                        });
                    }

                    // 6. 3D Frame Styling Engine
                    const frameColor = new THREE.Color(colorHex);
                    if (frameStyle === 'neon') {
                        const frameGeo = new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.08);
                        const frameMat = new THREE.MeshStandardMaterial({
                            color: frameColor,
                            emissive: frameColor,
                            emissiveIntensity: 1.5,
                            wireframe: true
                        });
                        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
                        imageGroup.add(frameMesh);
                    } else if (frameStyle === 'hologram') {
                        const glassGeo = new THREE.BoxGeometry(w + 0.2, h + 0.2, 0.05);
                        const glassMat = new THREE.MeshPhysicalMaterial({
                            color: frameColor,
                            transparent: true,
                            opacity: 0.4,
                            roughness: 0.1,
                            transmission: 0.9
                        });
                        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
                        imageGroup.add(glassMesh);
                    } else if (frameStyle === 'crystal') {
                        const crystalGeo = new THREE.BoxGeometry(w + 0.3, h + 0.3, 0.2);
                        const crystalMat = new THREE.MeshPhysicalMaterial({
                            color: frameColor,
                            emissive: frameColor,
                            emissiveIntensity: 0.5,
                            roughness: 0.1,
                            metalness: 0.9,
                            clearcoat: 1.0
                        });
                        const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
                        crystalMesh.position.z = -0.1;
                        imageGroup.add(crystalMesh);
                    }
                });

                imageGroup.position.set(x, y, z);
                imageGroup.rotation.set(rx, ry, rz);
                imageGroup.scale.set(scale, scale, scale);
                imageGroup.userData = { preset: imgId, isImage: true };

                if (animate.includes('float')) {
                    let time = 0;
                    const baseY = y;
                    animationCallbacks.push(() => {
                        time += 0.02 * timeSpeedMultiplier;
                        imageGroup.position.y = baseY + Math.sin(time) * 0.15;
                    });
                }
                if (animate.includes('spin-y') || animate.includes('spin')) {
                    animationCallbacks.push(() => {
                        imageGroup.rotation.y += 0.015 * timeSpeedMultiplier;
                    });
                }

                scene.add(imageGroup);
                customObjects.push(imageGroup);
            }

            else if (tagName === 'hotspot-pin') {
                const px = parseFloat(getAttr('x', '1.5'));
                const py = parseFloat(getAttr('y', '1.5'));
                const pz = parseFloat(getAttr('z', '0'));
                const titleText = getAttr('title', '4K AI Optics');
                const priceText = getAttr('price', '$299');
                const detailText = getAttr('text', 'Interactive 3D Spec');
                const colorHex = getAttr('color', '#00f2fe');

                const pinGroup = new THREE.Group();
                pinGroup.position.set(px, py, pz);

                const pinColor = new THREE.Color(colorHex);

                // 1. Ultra-Bright Glowing Core Orb
                const coreMesh = new THREE.Mesh(
                    new THREE.SphereGeometry(0.18, 16, 16),
                    new THREE.MeshStandardMaterial({ color: pinColor, emissive: pinColor, emissiveIntensity: 3.0 })
                );
                pinGroup.add(coreMesh);

                // 2. Vertical Glowing Laser Pin Stem Pointing Downwards
                const stemMesh = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.02, 0.02, 0.6, 12),
                    new THREE.MeshBasicMaterial({ color: pinColor })
                );
                stemMesh.position.y = -0.3;
                pinGroup.add(stemMesh);

                // 3. Pulsing Horizontal Ring
                const ringMesh = new THREE.Mesh(
                    new THREE.TorusGeometry(0.35, 0.025, 16, 32),
                    new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, opacity: 0.9 })
                );
                ringMesh.rotation.x = Math.PI / 2;
                pinGroup.add(ringMesh);

                // 4. Floating 3D Text Banner Label
                try {
                    const labelTex = create3DTextTexture(`📍 ${titleText} (${priceText})`, colorHex);
                    const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, side: THREE.DoubleSide });
                    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), labelMat);
                    labelMesh.position.set(1.3, 0, 0);
                    pinGroup.add(labelMesh);
                } catch(e){}

                let ringPulse = 0;
                animationCallbacks.push(() => {
                    ringPulse += 0.05 * timeSpeedMultiplier;
                    const scaleFactor = 1.0 + Math.sin(ringPulse) * 0.25;
                    ringMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
                });

                pinGroup.userData = {
                    isHotspot: true,
                    triggerHotspot: () => {
                        playRunSFX();
                        showHotspotPopup(titleText, priceText, detailText, colorHex);
                    }
                };

                scene.add(pinGroup);
                customObjects.push(pinGroup);
            }

            else if (tagName === 'mesh-explode') {
                const count = parseInt(getAttr('count', '3000'));
                const colorHex = getAttr('color', '#00ffcc');
                const radius = parseFloat(getAttr('radius', '1.4'));

                const particleGeo = new THREE.BufferGeometry();
                const posArr = new Float32Array(count * 3);
                const origPos = new Float32Array(count * 3);
                const expVel = new Float32Array(count * 3);

                for (let i = 0; i < count; i++) {
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos((Math.random() * 2) - 1);
                    const r = radius * Math.cbrt(Math.random());
                    const px = r * Math.sin(phi) * Math.cos(theta);
                    const py = r * Math.sin(phi) * Math.sin(theta);
                    const pz = r * Math.cos(phi);

                    origPos[i * 3] = px;
                    origPos[i * 3 + 1] = py;
                    origPos[i * 3 + 2] = pz;

                    posArr[i * 3] = px;
                    posArr[i * 3 + 1] = py;
                    posArr[i * 3 + 2] = pz;

                    const speed = Math.random() * 2.2 + 0.6;
                    expVel[i * 3] = (px / (r || 1)) * speed;
                    expVel[i * 3 + 1] = (py / (r || 1)) * speed;
                    expVel[i * 3 + 2] = (pz / (r || 1)) * speed;
                }

                particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
                const particleMat = new THREE.PointsMaterial({
                    size: 0.08,
                    color: new THREE.Color(colorHex),
                    transparent: true,
                    opacity: 0.95
                });

                const particleMesh = new THREE.Points(particleGeo, particleMat);
                const clickTarget = new THREE.Mesh(
                    new THREE.SphereGeometry(radius * 1.2, 16, 16),
                    new THREE.MeshBasicMaterial({ visible: false })
                );

                const explodeGroup = new THREE.Group();
                explodeGroup.add(particleMesh);
                explodeGroup.add(clickTarget);

                let isExploded = false;
                let explodeProgress = 0;

                explodeGroup.userData = {
                    isExplodable: true,
                    triggerExplode: () => {
                        isExploded = !isExploded;
                    }
                };

                clickTarget.userData = explodeGroup.userData;

                animationCallbacks.push(() => {
                    particleMesh.rotation.y += 0.008 * timeSpeedMultiplier;

                    if (isExploded && explodeProgress < 1.0) {
                        explodeProgress += 0.035 * timeSpeedMultiplier;
                    } else if (!isExploded && explodeProgress > 0) {
                        explodeProgress -= 0.035 * timeSpeedMultiplier;
                    }

                    const pos = particleMesh.geometry.attributes.position.array;
                    for (let i = 0; i < count; i++) {
                        pos[i * 3] = origPos[i * 3] + expVel[i * 3] * explodeProgress * 2.2;
                        pos[i * 3 + 1] = origPos[i * 3 + 1] + expVel[i * 3 + 1] * explodeProgress * 2.2;
                        pos[i * 3 + 2] = origPos[i * 3 + 2] + expVel[i * 3 + 2] * explodeProgress * 2.2;
                    }
                    particleMesh.geometry.attributes.position.needsUpdate = true;
                });

                scene.add(explodeGroup);
                customObjects.push(explodeGroup);
                customObjects.push(clickTarget);
            }

            else if (tagName === 'cta-button') {
                const ctaText = getAttr('text', 'CLICK HERE');
                const ctaUrl = getAttr('url', 'https://example.com');
                const x = parseFloat(getAttr('x', '0'));
                const y = parseFloat(getAttr('y', '-1.8'));
                const z = parseFloat(getAttr('z', '0'));
                const color = getAttr('color', '#00ffcc');

                const texture = create3DTextTexture(ctaText, color);
                const geo = new THREE.PlaneGeometry(3.8, 0.9);
                const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
                const mesh = new THREE.Mesh(geo, mat);

                mesh.position.set(x, y, z);
                mesh.userData = { url: ctaUrl, isCTA: true };

                let pulseTime = 0;
                animationCallbacks.push(() => {
                    pulseTime += 0.04 * timeSpeedMultiplier;
                    const s = 1 + Math.sin(pulseTime) * 0.05;
                    mesh.scale.set(s, s, s);
                });

                scene.add(mesh);
                customObjects.push(mesh);
            }

            else if (tagName === 'model-3d') {
                const preset = getAttr('preset', 'cyber_drone');
                const x = parseFloat(getAttr('x', '0'));
                const y = parseFloat(getAttr('y', '0'));
                const z = parseFloat(getAttr('z', '0'));
                const scale = parseFloat(getAttr('scale', '1'));
                const color = getAttr('color', '#00f2fe');
                const matType = getAttr('material', 'neon');
                const animate = getAttr('animate', '');
                const hasScrollRotate = getAttr('scroll-rotate', 'false') === 'true';
                const dismantleFactor = parseFloat(getAttr('dismantle', '0'));

                let modelGroup;
                if (importedModelRegistry[preset]) {
                    modelGroup = importedModelRegistry[preset].clone(true);
                    modelGroup.traverse(child => {
                        if (child.isMesh) {
                            child.material = createMaterial(matType, color);
                        }
                    });
                } else {
                    modelGroup = createProceduralModelGroup(preset, color, matType);
                }

                attachExplodeEngineToGroup(modelGroup, dismantleFactor);

                modelGroup.userData = { preset: preset };
                modelGroup.position.set(x, y, z);
                modelGroup.scale.set(scale, scale, scale);

                if (animate.includes('spin-y') || animate.includes('spin')) {
                    animationCallbacks.push(() => { 
                        modelGroup.rotation.y += 0.015 * timeSpeedMultiplier; 
                        if (hasScrollRotate) modelGroup.rotation.y += scrollRotationOffset;
                    });
                }
                scene.add(modelGroup);
                customObjects.push(modelGroup);
            }

            else if (tagName === 'hyper-cube') {
                const shape = getAttr('shape', 'tesseract');
                polytope4DParams.size = parseFloat(getAttr('size', '2.0'));
                polytope4DParams.rotXW = parseFloat(getAttr('rot-xw', '0.02'));
                polytope4DParams.rotYW = parseFloat(getAttr('rot-yw', '0.01'));
                polytope4DParams.rotZW = parseFloat(getAttr('rot-zw', '0.00'));
                createPolytopeMesh(shape, getAttr('color', '#00f2fe'));
                document.getElementById('polytope-select').value = shape;
            } else if (tagName === 'text-3d') {
                const textStr = getAttr('text', '3D TEXT');
                const color = getAttr('color', '#00ffcc');
                const matType = getAttr('material', 'neon');
                const animate = getAttr('animate', '');
                const x = parseFloat(getAttr('x', '0'));
                const y = parseFloat(getAttr('y', '0'));
                const z = parseFloat(getAttr('z', '0'));
                const scale = parseFloat(getAttr('scale', '1.0'));
                const size = parseFloat(getAttr('size', '1.2'));

                const texture = create3DTextTexture(textStr, color);
                const geo = new THREE.PlaneGeometry(4.5 * size, 1.15 * size);
                const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
                const mesh = new THREE.Mesh(geo, mat);

                mesh.position.set(x, y, z);
                mesh.scale.set(scale, scale, scale);
                mesh.userData = { preset: textStr, isText: true };

                if (animate.includes('float')) {
                    let time = 0;
                    const baseY = y;
                    animationCallbacks.push(() => {
                        time += 0.02 * timeSpeedMultiplier;
                        mesh.position.y = baseY + Math.sin(time) * 0.15;
                    });
                }
                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'mesh-sphere') {
                const radius = parseFloat(getAttr('radius', '1.5'));
                const segments = parseInt(getAttr('segments', '32'));
                const color = getAttr('color', '#ff007f');
                const matType = getAttr('material', 'standard');
                const animate = getAttr('animate', '');
                const hasPhysics = getAttr('physics', 'false') === 'true';

                const geo = new THREE.SphereGeometry(radius, segments, segments);
                const mat = createMaterial(matType, color);
                const mesh = new THREE.Mesh(geo, mat);

                if (hasPhysics) {
                    mesh.position.y = 4.0;
                    physicsObjects.push({ mesh, vy: 0, radius, bounce: 0.75 });
                }

                if (animate.includes('spin')) animationCallbacks.push(() => { mesh.rotation.y += 0.01 * timeSpeedMultiplier; });
                if (animate.includes('pulse')) {
                    let time = 0;
                    animationCallbacks.push(() => {
                        time += 0.03 * timeSpeedMultiplier;
                        const s = 1 + Math.sin(time) * 0.1;
                        mesh.scale.set(s, s, s);
                    });
                }
                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'mesh-torus') {
                const radius = parseFloat(getAttr('radius', '1.8'));
                const tube = parseFloat(getAttr('tube', '0.4'));
                const color = getAttr('color', '#7928ca');
                const matType = getAttr('material', 'neon');
                const animate = getAttr('animate', '');
                const p = parseInt(getAttr('p', '2'));
                const q = parseInt(getAttr('q', '3'));

                let geo = node.hasAttribute('p') ? new THREE.TorusKnotGeometry(radius, tube, 128, 32, p, q) : new THREE.TorusGeometry(radius, tube, 32, 100);
                const mat = createMaterial(matType, color);
                const mesh = new THREE.Mesh(geo, mat);

                if (animate.includes('spin-x')) animationCallbacks.push(() => { mesh.rotation.x += 0.015 * timeSpeedMultiplier; });
                if (animate.includes('spin-y')) animationCallbacks.push(() => { mesh.rotation.y += 0.015 * timeSpeedMultiplier; });
                if (animate.includes('spin')) animationCallbacks.push(() => { mesh.rotation.x += 0.01 * timeSpeedMultiplier; mesh.rotation.y += 0.015 * timeSpeedMultiplier; });

                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'mesh-box') {
                const w = parseFloat(getAttr('width', '2'));
                const h = parseFloat(getAttr('height', '2'));
                const d = parseFloat(getAttr('depth', '2'));
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), createMaterial(getAttr('material', 'glass'), getAttr('color', '#00f2fe')));
                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'mesh-cylinder') {
                const r = parseFloat(getAttr('radius', '1'));
                const h = parseFloat(getAttr('height', '2.5'));
                const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32), createMaterial(getAttr('material', 'glass'), getAttr('color', '#00f2fe')));
                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'particle-constellation') {
                const count = parseInt(getAttr('count', '120'));
                const maxDist = parseFloat(getAttr('max-dist', '2.2'));
                const colorHex = getAttr('color', '#00f2fe');

                const pGroup = new THREE.Group();
                const pPositions = [];
                const pVelocities = [];

                for (let i = 0; i < count; i++) {
                    pPositions.push(new THREE.Vector3(
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 10
                    ));
                    pVelocities.push(new THREE.Vector3(
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02
                    ));
                }

                const lineMaterial = new THREE.LineBasicMaterial({
                    color: new THREE.Color(colorHex),
                    transparent: true,
                    opacity: 0.45
                });

                const lineGeo = new THREE.BufferGeometry();
                const maxLines = count * count;
                const linePositions = new Float32Array(maxLines * 6);
                lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                const lineMesh = new THREE.LineSegments(lineGeo, lineMaterial);
                pGroup.add(lineMesh);

                const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);
                const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex) });
                const nodeMeshes = [];
                for (let i = 0; i < count; i++) {
                    const nm = new THREE.Mesh(nodeGeo, nodeMat);
                    nm.position.copy(pPositions[i]);
                    pGroup.add(nm);
                    nodeMeshes.push(nm);
                }

                animationCallbacks.push(() => {
                    let lineIndex = 0;
                    const posArray = lineMesh.geometry.attributes.position.array;

                    for (let i = 0; i < count; i++) {
                        pPositions[i].add(pVelocities[i]);
                        if (Math.abs(pPositions[i].x) > 5) pVelocities[i].x *= -1;
                        if (Math.abs(pPositions[i].y) > 4) pVelocities[i].y *= -1;
                        if (Math.abs(pPositions[i].z) > 5) pVelocities[i].z *= -1;
                        nodeMeshes[i].position.copy(pPositions[i]);
                    }

                    for (let i = 0; i < count; i++) {
                        for (let j = i + 1; j < count; j++) {
                            const dist = pPositions[i].distanceTo(pPositions[j]);
                            if (dist < maxDist) {
                                posArray[lineIndex++] = pPositions[i].x;
                                posArray[lineIndex++] = pPositions[i].y;
                                posArray[lineIndex++] = pPositions[i].z;

                                posArray[lineIndex++] = pPositions[j].x;
                                posArray[lineIndex++] = pPositions[j].y;
                                posArray[lineIndex++] = pPositions[j].z;
                            }
                        }
                    }

                    lineMesh.geometry.setDrawRange(0, lineIndex / 3);
                    lineMesh.geometry.attributes.position.needsUpdate = true;
                });

                scene.add(pGroup);
                customObjects.push(pGroup);
            } else if (tagName === 'cyber-wave') {
                const width = parseFloat(getAttr('width', '12'));
                const height = parseFloat(getAttr('height', '12'));
                const colorHex = getAttr('color', '#00ffcc');
                const speed = parseFloat(getAttr('speed', '0.03'));

                const segs = 30;
                const waveGeo = new THREE.PlaneGeometry(width, height, segs, segs);
                waveGeo.rotateX(-Math.PI / 2);

                const waveMat = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(colorHex),
                    emissive: new THREE.Color(colorHex),
                    emissiveIntensity: 0.6,
                    wireframe: true
                });

                const waveMesh = new THREE.Mesh(waveGeo, waveMat);
                waveMesh.position.y = -2.2;

                let waveTime = 0;
                animationCallbacks.push(() => {
                    waveTime += speed * timeSpeedMultiplier;
                    const p = waveGeo.attributes.position.array;
                    for (let i = 0; i < waveGeo.attributes.position.count; i++) {
                        const vx = p[i * 3];
                        const vz = p[i * 3 + 2];
                        p[i * 3 + 1] = Math.sin(vx * 0.8 + waveTime) * Math.cos(vz * 0.8 + waveTime) * 0.4;
                    }
                    waveGeo.attributes.position.needsUpdate = true;
                });

                scene.add(waveMesh);
                customObjects.push(waveMesh);
            } else if (tagName === 'cta-button') {
                const textStr = getAttr('text', 'GET STARTED 🚀');
                const urlStr = getAttr('url', 'https://example.com');
                const colorHex = getAttr('color', '#00ffcc');
                const x = parseFloat(getAttr('x', '0'));
                const y = parseFloat(getAttr('y', '-1.8'));
                const z = parseFloat(getAttr('z', '0'));
                const scale = parseFloat(getAttr('scale', '1.0'));

                const texture = create3DTextTexture(textStr, colorHex);
                const geo = new THREE.PlaneGeometry(3.8 * scale, 0.9 * scale);
                const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(x, y, z);
                mesh.userData = { url: urlStr, isCTA: true };

                let t = 0;
                animationCallbacks.push(() => {
                    t += 0.04 * timeSpeedMultiplier;
                    const s = scale * (1 + Math.sin(t) * 0.05);
                    mesh.scale.set(s, s, s);
                });

                scene.add(mesh);
                customObjects.push(mesh);
            } else if (tagName === 'particle-text') {
                const textStr = getAttr('text', 'CYBER 4D');
                const colorHex = getAttr('color', '#00f2fe');
                const count = parseInt(getAttr('count', '1200'));
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));
                const s = parseFloat(getAttr('scale', '1.0'));

                const offC = document.createElement('canvas'); offC.width = 256; offC.height = 64;
                const offCtx = offC.getContext('2d');
                offCtx.font = 'bold 36px monospace'; offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle';
                offCtx.fillStyle = '#ffffff'; offCtx.fillText(textStr, 128, 32);
                const imgData = offCtx.getImageData(0, 0, 256, 64).data;

                const letterPts = [];
                for (let ly = 0; ly < 64; ly += 2) {
                    for (let lx = 0; lx < 256; lx += 2) {
                        const idx = (ly * 256 + lx) * 4;
                        if (imgData[idx] > 128) {
                            letterPts.push(new THREE.Vector3((lx - 128) * 0.035, (32 - ly) * 0.035, 0));
                        }
                    }
                }

                const numPts = Math.min(count, letterPts.length > 0 ? letterPts.length : count);
                const posArr = new Float32Array(numPts * 3);
                const origArr = new Float32Array(numPts * 3);
                const velArr = new Float32Array(numPts * 3);

                for (let i = 0; i < numPts; i++) {
                    const pt = letterPts[i % letterPts.length] || new THREE.Vector3((Math.random()-0.5)*4, (Math.random()-0.5)*2, 0);
                    origArr[i*3] = pt.x; origArr[i*3+1] = pt.y; origArr[i*3+2] = pt.z;
                    posArr[i*3] = pt.x; posArr[i*3+1] = pt.y; posArr[i*3+2] = pt.z;
                    velArr[i*3] = (Math.random()-0.5)*3.5; velArr[i*3+1] = (Math.random()-0.5)*3.5; velArr[i*3+2] = (Math.random()-0.5)*3.5;
                }

                const ptGeo = new THREE.BufferGeometry();
                ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
                const ptMesh = new THREE.Points(ptGeo, new THREE.PointsMaterial({ size: 0.07, color: new THREE.Color(colorHex), transparent: true, opacity: 0.9 }));
                const ptGroup = new THREE.Group(); ptGroup.add(ptMesh);
                ptGroup.position.set(px, py, pz); ptGroup.scale.set(s, s, s);

                let disperseProg = 0.0, isDispersed = false;
                ptGroup.userData = {
                    isParticleText: true,
                    triggerDisperse: () => { isDispersed = !isDispersed; }
                };

                animationCallbacks.push(() => {
                    if (isDispersed && disperseProg < 1.0) disperseProg += 0.04 * timeSpeedMultiplier;
                    else if (!isDispersed && disperseProg > 0) disperseProg -= 0.04 * timeSpeedMultiplier;
                    const arr = ptMesh.geometry.attributes.position.array;
                    for (let i = 0; i < numPts; i++) {
                        arr[i*3] = origArr[i*3] + velArr[i*3] * disperseProg;
                        arr[i*3+1] = origArr[i*3+1] + velArr[i*3+1] * disperseProg;
                        arr[i*3+2] = origArr[i*3+2] + velArr[i*3+2] * disperseProg;
                    }
                    ptMesh.geometry.attributes.position.needsUpdate = true;
                });

                scene.add(ptGroup);
                customObjects.push(ptGroup);
            } else if (tagName === 'exploded-mesh') {
                const preset = getAttr('preset', 'cyber_drone');
                const factor = parseFloat(getAttr('factor', '0.8'));
                const trigger = getAttr('trigger', 'hover');
                const colorHex = getAttr('color', '#00f2fe');
                const matType = getAttr('material', 'neon');
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));
                const s = parseFloat(getAttr('scale', '1.0'));

                const baseModel = createProceduralModelGroup(preset, colorHex, matType);
                baseModel.position.set(px, py, pz); baseModel.scale.set(s, s, s);

                const originalPositions = [];
                baseModel.children.forEach(child => {
                    originalPositions.push(child.position.clone());
                });

                let currentFactor = trigger === 'always' ? factor : 0.0;
                let isHoverExploded = false;

                baseModel.userData = {
                    isExplodedMesh: true,
                    factor: factor,
                    setExplodeFactor: (f) => {
                        baseModel.children.forEach((child, i) => {
                            const orig = originalPositions[i];
                            if (!orig) return;
                            const dir = orig.length() > 0 ? orig.clone().normalize() : new THREE.Vector3(0, 1, 0);
                            child.position.copy(orig).add(dir.multiplyScalar(f * 1.5));
                        });
                    },
                    triggerHover: (hovered) => {
                        if (trigger === 'hover') isHoverExploded = hovered;
                    }
                };

                baseModel.userData.setExplodeFactor(currentFactor);

                animationCallbacks.push(() => {
                    baseModel.rotation.y += 0.01 * timeSpeedMultiplier;
                    if (trigger === 'hover') {
                        const targetF = isHoverExploded ? factor : 0.0;
                        currentFactor += (targetF - currentFactor) * 0.1;
                        baseModel.userData.setExplodeFactor(currentFactor);
                    }
                });

                scene.add(baseModel);
                customObjects.push(baseModel);
            } else if (tagName === 'pbr-mesh') {
                const shape = getAttr('shape', 'torus');
                const matType = getAttr('material', 'liquid-gold');
                const colorHex = getAttr('color', '#ffb703');
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));
                const r = parseFloat(getAttr('radius', '1.6')), tube = parseFloat(getAttr('tube', '0.4'));

                let geo;
                if (shape === 'sphere') geo = new THREE.SphereGeometry(r, 32, 32);
                else if (shape === 'box') geo = new THREE.BoxGeometry(r*1.5, r*1.5, r*1.5);
                else if (shape === 'cylinder') geo = new THREE.CylinderGeometry(r*0.8, r*0.8, r*2, 32);
                else if (shape === 'octahedron') geo = new THREE.OctahedronGeometry(r*1.3);
                else geo = new THREE.TorusGeometry(r, tube, 32, 64);

                const pbrMat = createMaterial(matType, colorHex);
                const pbrMesh = new THREE.Mesh(geo, pbrMat);
                pbrMesh.position.set(px, py, pz);

                if (getAttr('animate', 'spin').includes('spin')) {
                    animationCallbacks.push(() => {
                        pbrMesh.rotation.x += 0.01 * timeSpeedMultiplier;
                        pbrMesh.rotation.y += 0.015 * timeSpeedMultiplier;
                    });
                }

                scene.add(pbrMesh);
                customObjects.push(pbrMesh);
            } else if (tagName === 'liquid-metal') {
                const r = parseFloat(getAttr('radius', '1.4'));
                const colorHex = getAttr('color', '#00f2fe');
                const speed = parseFloat(getAttr('speed', '0.04'));
                const ripple = parseFloat(getAttr('ripple', '0.3'));
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));

                const sphereGeo = new THREE.SphereGeometry(r, 64, 64);
                const mat = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(colorHex),
                    metalness: 0.95,
                    roughness: 0.05,
                    envMapIntensity: 2.0
                });
                const liquidMesh = new THREE.Mesh(sphereGeo, mat);
                liquidMesh.position.set(px, py, pz);

                const origPos = sphereGeo.attributes.position.array.slice();
                let time = 0;

                animationCallbacks.push(() => {
                    time += speed * timeSpeedMultiplier;
                    const pos = liquidMesh.geometry.attributes.position.array;
                    for (let i = 0; i < pos.length; i += 3) {
                        const ox = origPos[i], oy = origPos[i+1], oz = origPos[i+2];
                        const wave = Math.sin(ox * 3.0 + time) * Math.cos(oy * 3.0 + time) * Math.sin(oz * 3.0 + time) * ripple;
                        const factor = 1.0 + wave * 0.2;
                        pos[i] = ox * factor;
                        pos[i+1] = oy * factor;
                        pos[i+2] = oz * factor;
                    }
                    liquidMesh.geometry.attributes.position.needsUpdate = true;
                    liquidMesh.rotation.y += 0.005 * timeSpeedMultiplier;
                });

                scene.add(liquidMesh);
                customObjects.push(liquidMesh);
            } else if (tagName === 'forcefield') {
                const r = parseFloat(getAttr('radius', '2.2'));
                const colorHex = getAttr('color', '#00ffcc');
                const pulseSpeed = parseFloat(getAttr('pulse', '0.03'));
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));

                const shieldGroup = new THREE.Group();
                shieldGroup.position.set(px, py, pz);

                const outerGeo = new THREE.IcosahedronGeometry(r, 3);
                const outerMat = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(colorHex),
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6
                });
                const outerMesh = new THREE.Mesh(outerGeo, outerMat);
                shieldGroup.add(outerMesh);

                const innerGeo = new THREE.SphereGeometry(r * 0.96, 32, 32);
                const innerMat = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(colorHex),
                    transparent: true,
                    opacity: 0.15,
                    side: THREE.DoubleSide
                });
                const innerMesh = new THREE.Mesh(innerGeo, innerMat);
                shieldGroup.add(innerMesh);

                let pulseTimer = 0;
                animationCallbacks.push(() => {
                    pulseTimer += pulseSpeed * timeSpeedMultiplier;
                    const scaleFactor = 1.0 + Math.sin(pulseTimer) * 0.06;
                    outerMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    outerMesh.rotation.y += 0.01 * timeSpeedMultiplier;
                    outerMesh.rotation.x += 0.005 * timeSpeedMultiplier;
                });

                scene.add(shieldGroup);
                customObjects.push(shieldGroup);
            } else if (tagName === 'dna-helix') {
                const r = parseFloat(getAttr('radius', '1.2'));
                const h = parseFloat(getAttr('height', '4.5'));
                const color1 = getAttr('color1', '#00f2fe');
                const color2 = getAttr('color2', '#ff007f');
                const speed = parseFloat(getAttr('speed', '0.02'));
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));

                const dnaGroup = new THREE.Group();
                dnaGroup.position.set(px, py, pz);

                const nodeCount = 28;
                const mat1 = new THREE.MeshStandardMaterial({ color: new THREE.Color(color1), emissive: new THREE.Color(color1), emissiveIntensity: 1.5 });
                const mat2 = new THREE.MeshStandardMaterial({ color: new THREE.Color(color2), emissive: new THREE.Color(color2), emissiveIntensity: 1.5 });
                const rungsMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff'), transparent: true, opacity: 0.7 });

                const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);

                for (let i = 0; i < nodeCount; i++) {
                    const t = (i / nodeCount) * Math.PI * 4;
                    const yPos = (i / nodeCount) * h - h / 2;

                    const x1 = Math.cos(t) * r, z1 = Math.sin(t) * r;
                    const node1 = new THREE.Mesh(sphereGeo, mat1);
                    node1.position.set(x1, yPos, z1);
                    dnaGroup.add(node1);

                    const x2 = Math.cos(t + Math.PI) * r, z2 = Math.sin(t + Math.PI) * r;
                    const node2 = new THREE.Mesh(sphereGeo, mat2);
                    node2.position.set(x2, yPos, z2);
                    dnaGroup.add(node2);

                    const rungGeo = new THREE.CylinderGeometry(0.025, 0.025, r * 2, 8);
                    const rung = new THREE.Mesh(rungGeo, rungsMat);
                    rung.position.set(0, yPos, 0);
                    rung.rotation.y = -t;
                    rung.rotation.z = Math.PI / 2;
                    dnaGroup.add(rung);
                }

                animationCallbacks.push(() => {
                    dnaGroup.rotation.y += speed * timeSpeedMultiplier;
                });

                scene.add(dnaGroup);
                customObjects.push(dnaGroup);
            } else if (tagName === 'spatial-audio') {
                const r = parseFloat(getAttr('radius', '2.0'));
                const colorHex = getAttr('color', '#ffb703');
                const speed = parseFloat(getAttr('speed', '0.04'));
                const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));

                const audioGroup = new THREE.Group();
                audioGroup.position.set(px, py, pz);

                const ringMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.8 });
                const ringMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.5 });
                const ringMat3 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.25 });

                const ring1 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.4, 0.03, 16, 64), ringMat1);
                const ring2 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.7, 0.03, 16, 64), ringMat2);
                const ring3 = new THREE.Mesh(new THREE.TorusGeometry(r * 1.0, 0.03, 16, 64), ringMat3);

                [ring1, ring2, ring3].forEach(rg => rg.rotation.x = Math.PI / 2);

                audioGroup.add(ring1); audioGroup.add(ring2); audioGroup.add(ring3);

                let audioTimer = 0;
                animationCallbacks.push(() => {
                    audioTimer += speed * timeSpeedMultiplier;
                    const s1 = 0.4 + (audioTimer % 1) * 0.8;
                    const s2 = 0.4 + ((audioTimer + 0.33) % 1) * 0.8;
                    const s3 = 0.4 + ((audioTimer + 0.66) % 1) * 0.8;

                    ring1.scale.set(s1, s1, s1); ringMat1.opacity = Math.max(0, 1.0 - (s1 / 1.2));
                    ring2.scale.set(s2, s2, s2); ringMat2.opacity = Math.max(0, 1.0 - (s2 / 1.2));
                    ring3.scale.set(s3, s3, s3); ringMat3.opacity = Math.max(0, 1.0 - (s3 / 1.2));
                });

                scene.add(audioGroup);
                customObjects.push(audioGroup);
            } else if (tagName === 'particles') {
                const count = parseInt(getAttr('count', '2000'));
                const color = getAttr('color', '#00f2fe');
                const speed = parseFloat(getAttr('speed', '0.01'));
                const radius = parseFloat(getAttr('radius', '8'));

                const particleGeo = new THREE.BufferGeometry();
                const posArray = new Float32Array(count * 3);
                for (let i = 0; i < count * 3; i++) posArray[i] = (Math.random() - 0.5) * radius * 2;

                particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                const pts = new THREE.Points(particleGeo, new THREE.PointsMaterial({ size: 0.04, color: new THREE.Color(color), transparent: true, opacity: 0.8 }));
                animationCallbacks.push(() => { pts.rotation.y += speed * timeSpeedMultiplier; });

                scene.add(pts);
                customObjects.push(pts);
            } else if (tagName === 'light-point') {
                const ptLight = new THREE.PointLight(new THREE.Color(getAttr('color', '#ffffff')), parseFloat(getAttr('intensity', '2.0')), 50);
                ptLight.position.set(parseFloat(getAttr('x', '5')), parseFloat(getAttr('y', '5')), parseFloat(getAttr('z', '5')));
                scene.add(ptLight);
            }
        });

        const scriptMatch = codeText.match(/<script>([\s\S]*?)<\/script>/i);
        if (scriptMatch && scriptMatch[1]) {
            try {
                const sandboxFunc = new Function('scene', 'THREE', 'onFrame', scriptMatch[1]);
                sandboxFunc(scene, THREE, (fn) => animationCallbacks.push(fn));
            } catch (err) {
                console.error("Script execution error:", err);
            }
        }

        updatePolyStats();
        updateInspectorModelDropdown();
    }

    function updatePolyStats() {
        let totalVerts = 0;
        scene.traverse((obj) => {
            if (obj.isMesh || obj.isLineSegments) {
                if (obj.geometry && obj.geometry.attributes.position) {
                    totalVerts += obj.geometry.attributes.position.count;
                }
            }
        });
        document.getElementById('poly-counter').textContent = `Vertices: ${totalVerts}`;
    }

    let lastTime = performance.now();
    let frameCount = 0;

    function renderLoop(time) {
        requestAnimationFrame(renderLoop);

        if (isEcoMode && time - lastFrameTime < 33) {
            return;
        }
        lastFrameTime = time;

        if (!isAnimationPaused) {
            if (warpParticles) {
                const pos = warpParticles.geometry.attributes.position.array;
                const vels = warpParticles.userData.velocities;
                for (let i = 0; i < vels.length; i++) {
                    pos[i * 3 + 2] += vels[i] * 2.0;
                    if (pos[i * 3 + 2] > 20) pos[i * 3 + 2] = -20;
                }
                warpParticles.geometry.attributes.position.needsUpdate = true;
            }

            if (is4DMorphing) {
                morphTimer += 0.015;
                polytope4DParams.rotXW = 0.03 + Math.sin(morphTimer * 0.5) * 0.03;
                polytope4DParams.rotYW = 0.02 + Math.cos(morphTimer * 0.7) * 0.03;
                polytope4DParams.rotZW = Math.sin(morphTimer * 0.3) * 0.02;
                polytope4DParams.dist4D = 2.5 + Math.sin(morphTimer * 0.4) * 0.8;

                const shapes = ['tesseract', '5cell', '16cell', '24cell'];
                const shapeIndex = Math.floor((time * 0.00025) % shapes.length);
                if (shapes[shapeIndex] !== currentPolytypeKey) {
                    createPolytopeMesh(shapes[shapeIndex], '#00f2fe');
                }
            }

            if (isCinematicCamEnabled) {
                const t = time * 0.0004 * timeSpeedMultiplier;
                camera.position.x = Math.sin(t) * 7.5;
                camera.position.y = 2.5 + Math.cos(t * 1.3) * 2.0;
                camera.position.z = Math.cos(t) * 7.5;
                camera.lookAt(0, 0, 0);
            }

            if (isMouseParallaxEnabled) {
                scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, mousePos.x * 0.4, 0.05);
                scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, -mousePos.y * 0.3, 0.05);
            }

            if (isAudioReactive) {
                const audioBeatScale = 1 + Math.sin(time * 0.015) * 0.18;
                customObjects.forEach(obj => {
                    if (obj.isMesh && obj.geometry.type !== 'PlaneGeometry') {
                        obj.scale.set(audioBeatScale, audioBeatScale, audioBeatScale);
                    }
                });
            }

            if (isPhysicsEnabled || physicsObjects.length > 0) {
                physicsObjects.forEach(item => {
                    item.vy -= 0.015;
                    item.mesh.position.y += item.vy;
                    if (item.mesh.position.y <= item.radius) {
                        item.mesh.position.y = item.radius;
                        item.vy = -item.vy * item.bounce;
                    }
                });
            }

            if (polytopeMeshGroup) {
                try { updatePolytope4D(); } catch (err) { console.error("4D render error:", err); }
            }
            
            animationCallbacks.forEach(fn => {
                try { fn(); } catch (err) { console.error("Animation callback error:", err); }
            });

            if (isAutoOrbiting && !isCinematicCamEnabled && !isPilotGameActive) {
                camera.position.x = Math.sin(time * 0.0005 * timeSpeedMultiplier) * 7;
                camera.position.z = Math.cos(time * 0.0005 * timeSpeedMultiplier) * 7;
                camera.lookAt(0, 0, 0);
            }
        }

        if (isPilotGameActive && camera) {
            updatePilotVehicleSimulation();
        } else if (controls) {
            controls.update();
        }

        renderer.render(scene, camera);

        frameCount++;
        if (time - lastTime >= 1000) {
            const ecoText = isEcoMode ? ' [SEO Eco 30FPS]' : '';
            document.getElementById('fps-counter').textContent = `${frameCount} FPS${ecoText}`;
            frameCount = 0;
            lastTime = time;
        }
    }

    let liveRenderTimer = null;
    function triggerLiveRenderDebounced() {
        clearTimeout(liveRenderTimer);
        liveRenderTimer = setTimeout(runCode, 400);
    }

    function runCode() {
        parseHTML3DTags(codeEditor.value);
    }

    function handleRandomizeDNA() {
        playRunSFX();
        const colors = ['#00f2fe', '#ff007f', '#00ffcc', '#ffb703', '#7928ca', '#ff4d6d'];
        const materials = ['matrix', 'wire-glow', 'plasma', 'hologram', 'glass', 'neon'];
        const presets = ['cyber_drone', 'space_station', 'cyber_robot', 'cosmic_starship', 'alien_avatar', 'cyber_car', 'pirate_ship', 'saturn_galaxy', 'crystal_tower', 'mech_warrior', 'space_fighter'];
        const shapes4D = ['tesseract', '5cell', '16cell', '24cell'];

        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const randFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

        let c1 = pick(colors), c2 = pick(colors), c3 = pick(colors);
        let m1 = pick(materials), m2 = pick(materials);
        let p1 = pick(presets);
        let shape = pick(shapes4D);

        let dnaCode = `<!-- 🎲 PROCEDURAL DNA MODEL: SEED #${Math.floor(Math.random() * 9999)} -->\n`;
        dnaCode += `<model-3d preset="${p1}" x="0" y="0.5" z="0" scale="${randFloat(1.0, 1.6)}" color="${c1}" material="${m1}" animate="spin-y" scroll-rotate="true"></model-3d>\n\n`;
        dnaCode += `<hyper-cube shape="${shape}" size="${randFloat(1.8, 2.8)}" color="${c2}" rot-xw="${randFloat(0.01, 0.04)}" rot-yw="${randFloat(0.01, 0.03)}" material="${m2}"></hyper-cube>\n\n`;
        dnaCode += `<mesh-torus radius="${randFloat(2.0, 3.2)}" tube="${randFloat(0.05, 0.12)}" color="${c3}" material="neon" animate="spin-x" p="${Math.floor(Math.random()*4+1)}" q="${Math.floor(Math.random()*4+2)}"></mesh-torus>\n\n`;
        dnaCode += `<cta-button text="GET STARTED 🚀" url="https://example.com" x="0" y="-2.2" z="0" color="${c1}"></cta-button>\n\n`;
        dnaCode += `<particles count="${Math.floor(Math.random() * 2500 + 1500)}" color="${c1}" speed="${randFloat(0.008, 0.02)}"></particles>\n\n`;
        dnaCode += `<light-point x="4" y="4" z="4" color="${c1}" intensity="2.2"></light-point>`;

        codeEditor.value = dnaCode;
        updateLineNumbers();
        runCode();
    }

    document.getElementById('btn-random-dna').addEventListener('click', handleRandomizeDNA);

    document.getElementById('btn-eco-mode').addEventListener('click', (e) => {
        playClickSFX();
        isEcoMode = !isEcoMode;
        e.currentTarget.classList.toggle('active', isEcoMode);
    });

    const btnVoiceAI = document.getElementById('btn-voice-ai');
    if (btnVoiceAI) {
        btnVoiceAI.addEventListener('click', () => {
            playClickSFX();
            const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognitionClass) {
                alert("Speech recognition is not supported in this browser. Please type your prompt in the text box.");
                return;
            }

            const rec = new SpeechRecognitionClass();
            rec.lang = 'en-US';
            btnVoiceAI.style.color = '#ff007f';

            rec.onresult = (evt) => {
                const speechResult = evt.results[0][0].transcript;
                document.getElementById('ai-prompt-input').value = speechResult;
                btnVoiceAI.style.color = '';
                handleAIGenerate();
            };

            rec.onerror = () => {
                btnVoiceAI.style.color = '';
            };

            rec.start();
        });
    }

    const btnOpenARModal = document.getElementById('btn-open-ar-modal');
    const modalARView = document.getElementById('modal-ar-view');
    const btnCloseARView = document.getElementById('btn-close-ar-view');

    if (btnOpenARModal && modalARView) {
        btnOpenARModal.addEventListener('click', () => {
            playClickSFX();
            modalARView.classList.add('active');
        });
    }

    if (btnCloseARView && modalARView) {
        btnCloseARView.addEventListener('click', () => {
            playClickSFX();
            modalARView.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------
    // 💥 3D DISMANTLE & EXPLODED-VIEW STUDIO HANDLERS
    // ----------------------------------------------------------------------
    const btnOpenDismantle = document.getElementById('btn-open-dismantle');
    const modalDismantle = document.getElementById('modal-dismantle');
    const btnCloseDismantle = document.getElementById('btn-close-dismantle');
    const btnApplyDismantle = document.getElementById('btn-apply-dismantle');

    if (btnOpenDismantle && modalDismantle) {
        btnOpenDismantle.addEventListener('click', () => {
            playClickSFX();
            modalDismantle.classList.add('active');
        });
    }

    if (btnCloseDismantle && modalDismantle) {
        btnCloseDismantle.addEventListener('click', () => {
            playClickSFX();
            modalDismantle.classList.remove('active');
        });
    }

    if (btnApplyDismantle && modalDismantle) {
        btnApplyDismantle.addEventListener('click', () => {
            playClickSFX();
            const factor = document.getElementById('slider-dismantle-factor').value || '0.8';
            
            const inspectorSlider = document.getElementById('slider-inspector-dismantle');
            if (inspectorSlider) {
                inspectorSlider.value = factor;
                const valLabel = document.getElementById('val-inspector-dismantle');
                if (valLabel) valLabel.textContent = `${parseFloat(factor).toFixed(2)}x`;
            }

            let editorText = codeEditor.value;
            if (editorText.includes('dismantle=')) {
                editorText = editorText.replace(/\bdismantle="[^"]*"/gi, `dismantle="${factor}"`);
            } else if (editorText.includes('<model-3d')) {
                editorText = editorText.replace('<model-3d', `<model-3d dismantle="${factor}"`);
            } else {
                editorText += (editorText.trim() ? '\n\n' : '') + `<exploded-mesh preset="${activePresetKey || 'cyber_drone'}" factor="${factor}" trigger="hover" color="#00f2fe"></exploded-mesh>`;
            }

            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            modalDismantle.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------
    // 📽️ SCROLL-DRIVEN KEYFRAME CAMERA STUDIO HANDLERS
    // ----------------------------------------------------------------------
    const btnOpenKeyframeStudio = document.getElementById('btn-open-keyframe-studio');
    const modalKeyframeStudio = document.getElementById('modal-keyframe-studio');
    const btnCloseKeyframeStudio = document.getElementById('btn-close-keyframe-studio');
    const btnAddCameraKeyframe = document.getElementById('btn-add-camera-keyframe');
    const btnApplyScrollCamera = document.getElementById('btn-apply-scroll-camera');
    const keyframeListContainer = document.getElementById('keyframe-list-container');

    const capturedCameraKeyframes = [];

    if (btnOpenKeyframeStudio && modalKeyframeStudio) {
        btnOpenKeyframeStudio.addEventListener('click', () => {
            playClickSFX();
            modalKeyframeStudio.classList.add('active');
        });
    }

    if (btnCloseKeyframeStudio && modalKeyframeStudio) {
        btnCloseKeyframeStudio.addEventListener('click', () => {
            playClickSFX();
            modalKeyframeStudio.classList.remove('active');
        });
    }

    if (btnAddCameraKeyframe) {
        btnAddCameraKeyframe.addEventListener('click', () => {
            playClickSFX();
            const kf = {
                id: capturedCameraKeyframes.length + 1,
                pos: { x: camera.position.x.toFixed(2), y: camera.position.y.toFixed(2), z: camera.position.z.toFixed(2) },
                target: { x: controls.target.x.toFixed(2), y: controls.target.y.toFixed(2), z: controls.target.z.toFixed(2) }
            };
            capturedCameraKeyframes.push(kf);

            if (keyframeListContainer) {
                keyframeListContainer.innerHTML = capturedCameraKeyframes.map(k => `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,242,254,0.08); border:1px solid rgba(0,242,254,0.3); padding:8px 12px; border-radius:8px; margin-bottom:6px; font-size:0.85rem; color:#fff;">
                        <span>📷 Keyframe #${k.id}: Pos(${k.pos.x}, ${k.pos.y}, ${k.pos.z})</span>
                        <span style="color:#00ffcc;">Target(${k.target.x}, ${k.target.y}, ${k.target.z})</span>
                    </div>
                `).join('');
            }
        });
    }

    if (btnApplyScrollCamera && modalKeyframeStudio) {
        btnApplyScrollCamera.addEventListener('click', () => {
            playClickSFX();
            const ease = document.getElementById('slider-keyframe-ease').value || '0.08';
            if (!codeEditor.value.includes('scroll-camera="true"')) {
                const tag = `\n<!-- 📽️ SCROLL-DRIVEN 3D KEYFRAME CAMERA -->\n<script>\n  // Scroll-Driven 3D Camera Keyframes Enabled (Ease: ${ease})\n  window.addEventListener('scroll', () => {\n    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);\n    camera.position.x = Math.sin(progress * Math.PI * 2) * 7;\n    camera.position.z = Math.cos(progress * Math.PI * 2) * 7;\n  });\n<\/script>`;
                codeEditor.value += tag;
                updateLineNumbers();
                runCode();
            }
            modalKeyframeStudio.classList.remove('active');
        });
    }

    const sliderScrollSim = document.getElementById('slider-scroll-sim');
    if (sliderScrollSim) {
        sliderScrollSim.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value) / 100;
            document.getElementById('val-scroll-sim').textContent = `${Math.round(pct * 100)}%`;
            if (capturedCameraKeyframes.length >= 2) {
                const index = pct * (capturedCameraKeyframes.length - 1);
                const kf1 = capturedCameraKeyframes[Math.floor(index)];
                const kf2 = capturedCameraKeyframes[Math.ceil(index)];
                const t = index - Math.floor(index);

                camera.position.x = parseFloat(kf1.pos.x) + (parseFloat(kf2.pos.x) - parseFloat(kf1.pos.x)) * t;
                camera.position.y = parseFloat(kf1.pos.y) + (parseFloat(kf2.pos.y) - parseFloat(kf1.pos.y)) * t;
                camera.position.z = parseFloat(kf1.pos.z) + (parseFloat(kf2.pos.z) - parseFloat(kf1.pos.z)) * t;

                controls.target.x = parseFloat(kf1.target.x) + (parseFloat(kf2.target.x) - parseFloat(kf1.target.x)) * t;
                controls.target.y = parseFloat(kf1.target.y) + (parseFloat(kf2.target.y) - parseFloat(kf1.target.y)) * t;
                controls.target.z = parseFloat(kf1.target.z) + (parseFloat(kf2.target.z) - parseFloat(kf1.target.z)) * t;
                controls.update();
            } else {
                camera.position.x = Math.sin(pct * Math.PI * 2) * 7;
                camera.position.z = Math.cos(pct * Math.PI * 2) * 7;
                controls.update();
            }
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🌌 3D COSMIC QUEST, SPACE MISSIONS, RADAR, LASERS & SYNTH RADIO ENGINE
    // ══════════════════════════════════════════════════════════════════════
    let isPilotGameActive = false;
    let activeCosmosWorld = 'galaxies'; // 'galaxies', 'rings', 'asteroids', 'cybercity', 'blackhole', 'deepspace'
    let isSpaceFlightMode = true; // true = 3D Space Flight, false = Ground Surface Drive
    let cosmosGroup = null;
    let infiniteStarfield = null;
    let spaceRings = [];
    let spaceScore = 0;
    let spaceCrystals = 0;
    let shieldHP = 100;
    let maxShieldHP = 100;
    let ringFlashTimer = 0;
    let radioChannel = 'cosmic'; // 'cosmic', 'pulse', 'chill', 'off'

    // Mission State Machine
    let activeMission = 'station'; // 'station', 'wormhole', 'asteroids', 'blackhole', 'freeroam'
    let missionProgress = 0;
    let missionTargetCount = 3;
    let missionTimerSeconds = 60;
    let missionInterval = null;
    let isMissionComplete = false;

    // Upgrades Unlocked
    let unlockedUpgrades = {
        speed: false,
        lasers: false,
        shield: false,
        nitro: false,
        trail: false
    };

    // Cosmic Game Objects
    let activeLasers = [];
    let destroyableAsteroids = [];
    let plasmaCrystals = [];
    let orbitalStation = null;
    let explosionParticles = [];
    let radarSweepAngle = 0;
    let lastLaserFireTime = 0;

    // Load Saved Game Progress
    try {
        const saved = JSON.parse(localStorage.getItem('hyper3d_cosmic_save') || '{}');
        if (typeof saved.crystals === 'number') spaceCrystals = saved.crystals;
        if (typeof saved.score === 'number') spaceScore = saved.score;
        if (saved.upgrades) unlockedUpgrades = Object.assign(unlockedUpgrades, saved.upgrades);
    } catch(e){}

    const gameKeys = {
        w: false, a: false, s: false, d: false,
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
        ' ': false, Shift: false, Control: false, q: false, e: false, r: false,
        f: false, h: false
    };

    let pilotPhysics = {
        speed: 0,
        maxSpeed: 0.48,
        nitroMaxSpeed: 1.1,
        accel: 0.016,
        brake: 0.024,
        friction: 0.985,
        turnSpeed: 0.038,
        pitchSpeed: 0.032,
        yaw: 0,
        pitch: 0,
        roll: 0,
        altitude: 2.0,
        nitro: 1.0,
        isBoosting: false,
        vehicleType: 'air',
        targetObj: null
    };

    // ── Save Progress & Update Pilot Rank ─────────────────────────────────
    function saveCosmicProgress() {
        try {
            localStorage.setItem('hyper3d_cosmic_save', JSON.stringify({
                crystals: spaceCrystals,
                score: spaceScore,
                upgrades: unlockedUpgrades
            }));
        } catch(e){}

        const crysEl = document.getElementById('hud-crystals-val');
        if (crysEl) crysEl.textContent = `💎 ${spaceCrystals}`;

        const scoreEl = document.getElementById('hud-score-val');
        if (scoreEl) scoreEl.textContent = String(spaceScore);

        const rankEl = document.getElementById('hud-rank-name');
        if (rankEl) {
            if (spaceScore >= 15000) rankEl.textContent = '💎 QUANTUM LORD';
            else if (spaceScore >= 5000) rankEl.textContent = '🥇 COMMANDER';
            else if (spaceScore >= 1500) rankEl.textContent = '🥈 STAR PILOT';
            else rankEl.textContent = '🥉 CADET';
        }
    }

    // ── Procedural Ambient Space Synth Radio Engine ───────────────────────
    let synthRadioGain = null;
    let synthRadioInterval = null;

    function initCosmicRadio() {
        if (!audioCtx) initAudioContext();
        if (!audioCtx) return;
        if (synthRadioGain) return;

        synthRadioGain = audioCtx.createGain();
        synthRadioGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        synthRadioGain.connect(audioCtx.destination);

        startRadioChords();
    }

    function setRadioChannel(chan) {
        radioChannel = chan || 'cosmic';
        const hudRadioSelectEl = document.getElementById('hud-radio-select');
        if (hudRadioSelectEl && hudRadioSelectEl.value !== radioChannel) hudRadioSelectEl.value = radioChannel;
        document.querySelectorAll('.cockpit-chip-btn.radio-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.val === radioChannel);
        });
        if (!audioCtx) initCosmicRadio();
        if (!synthRadioGain) return;
        if (chan === 'off') {
            synthRadioGain.gain.setValueAtTime(0, audioCtx.currentTime);
        } else {
            synthRadioGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        }
    }

    function startRadioChords() {
        if (synthRadioInterval) clearInterval(synthRadioInterval);
        const progressions = [
            [220, 261.63, 329.63, 440],     // Am
            [174.61, 220, 261.63, 349.23],  // F
            [261.63, 329.63, 392, 523.25],  // C
            [196, 246.94, 293.66, 392]      // G
        ];
        let progIdx = 0;

        const playChord = () => {
            if (!isPilotGameActive || radioChannel === 'off' || !audioCtx) return;
            const chord = progressions[progIdx % progressions.length];
            progIdx++;

            chord.forEach((freq, i) => {
                try {
                    const osc = audioCtx.createOscillator();
                    const noteGain = audioCtx.createGain();
                    osc.type = radioChannel === 'pulse' ? 'sawtooth' : 'sine';
                    osc.frequency.setValueAtTime(freq * (radioChannel === 'chill' ? 0.5 : 1), audioCtx.currentTime);

                    noteGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
                    noteGain.gain.exponentialRampToValueAtTime(0.03, audioCtx.currentTime + 1.2);
                    noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.8);

                    osc.connect(noteGain);
                    noteGain.connect(synthRadioGain);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 4.0);
                } catch(e){}
            });
        };

        playChord();
        synthRadioInterval = setInterval(playChord, 3800);
    }

    // ── Infinite 3D Volumetric Starfield Generator ────────────────────────
    function buildInfiniteStarfield() {
        if (infiniteStarfield) {
            scene.remove(infiniteStarfield);
            infiniteStarfield = null;
        }

        const count = 4500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const palette = [
            new THREE.Color('#00f2fe'),
            new THREE.Color('#ff007f'),
            new THREE.Color('#00ffcc'),
            new THREE.Color('#ffb703'),
            new THREE.Color('#a855f7'),
            new THREE.Color('#ffffff')
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 700;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 700;

            const col = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;

            sizes[i] = Math.random() * 0.22 + 0.08;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.18,
            vertexColors: true,
            transparent: true,
            opacity: 0.95
        });

        infiniteStarfield = new THREE.Points(geometry, material);
        infiniteStarfield.name = 'infinite-starfield';
        scene.add(infiniteStarfield);
    }

    // ── Spawn Floating Dark Matter Crystals ───────────────────────────────
    function spawnMissionCrystals(count = 3) {
        plasmaCrystals.forEach(c => { if (c.mesh) scene.remove(c.mesh); });
        plasmaCrystals = [];

        const crysGeo = new THREE.OctahedronGeometry(1.6, 0);
        const crysMat = new THREE.MeshPhongMaterial({
            color: 0x00ffcc,
            emissive: 0x00ffcc,
            emissiveIntensity: 0.8,
            shininess: 90
        });

        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(crysGeo, crysMat.clone());
            mesh.position.set(
                (Math.random() - 0.5) * 160 + (i % 2 === 0 ? 30 : -30),
                Math.random() * 18 + 4,
                (i + 1) * 45 + Math.random() * 20
            );
            scene.add(mesh);
            plasmaCrystals.push({ mesh, active: true, radius: 2.2 });
        }
    }

    // ── Spawn Orbital Space Station ───────────────────────────────────────
    function spawnOrbitalStation() {
        if (orbitalStation) {
            scene.remove(orbitalStation);
            orbitalStation = null;
        }

        orbitalStation = new THREE.Group();
        orbitalStation.position.set(0, 18, 165);

        // Core Hub Sphere
        const hub = new THREE.Mesh(
            new THREE.SphereGeometry(7, 24, 24),
            new THREE.MeshStandardMaterial({ color: 0x1f293d, metalness: 0.8, roughness: 0.2 })
        );
        orbitalStation.add(hub);

        // Neon Docking Ring
        const ringGeo = new THREE.TorusGeometry(12, 0.8, 12, 36);
        const ringMat = new THREE.MeshPhongMaterial({ color: 0x00f2fe, emissive: 0x00f2fe, emissiveIntensity: 0.6 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        orbitalStation.add(ring);

        // Solar Arrays
        [-16, 16].forEach(offset => {
            const panel = new THREE.Mesh(
                new THREE.BoxGeometry(10, 0.4, 6),
                new THREE.MeshPhongMaterial({ color: 0x0072ff, emissive: 0x002266, shininess: 80 })
            );
            panel.position.x = offset;
            orbitalStation.add(panel);
        });

        // Communication Beacon
        const beacon = new THREE.Mesh(
            new THREE.SphereGeometry(1.2, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xff007f })
        );
        beacon.position.y = 8.5;
        orbitalStation.add(beacon);

        scene.add(orbitalStation);
    }

    // ── Cosmic Worlds & Obstacles Spawner ──────────────────────────────────
    function buildCosmosWorld(worldType) {
        activeCosmosWorld = worldType || 'galaxies';
        const hudWorldSelectEl = document.getElementById('hud-world-select');
        if (hudWorldSelectEl && hudWorldSelectEl.value !== activeCosmosWorld) hudWorldSelectEl.value = activeCosmosWorld;
        document.querySelectorAll('.cockpit-chip-btn.world-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.val === activeCosmosWorld);
        });
        if (cosmosGroup) {
            scene.remove(cosmosGroup);
            cosmosGroup = null;
        }
        spaceRings = [];
        destroyableAsteroids = [];

        cosmosGroup = new THREE.Group();
        cosmosGroup.name = 'cosmos-world-group';

        const cyanMat = new THREE.MeshPhongMaterial({ color: 0x00f2fe, emissive: 0x00f2fe, emissiveIntensity: 0.4 });
        const magentaMat = new THREE.MeshPhongMaterial({ color: 0xff007f, emissive: 0xff007f, emissiveIntensity: 0.4 });
        const goldMat = new THREE.MeshPhongMaterial({ color: 0xffb703, emissive: 0xffb703, emissiveIntensity: 0.5 });

        if (activeCosmosWorld === 'galaxies') {
            // 🪐 Saturn with Multi-Layered Rings
            const saturnGroup = new THREE.Group();
            saturnGroup.position.set(110, 35, 160);

            const saturnPlanet = new THREE.Mesh(new THREE.SphereGeometry(24, 32, 32), new THREE.MeshPhongMaterial({
                color: 0xe0a96d, emissive: 0x5a3d1c, emissiveIntensity: 0.3, shininess: 30
            }));
            saturnGroup.add(saturnPlanet);

            const ringGeo1 = new THREE.RingGeometry(30, 44, 48);
            const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffd166, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
            const saturnRing1 = new THREE.Mesh(ringGeo1, ringMat1);
            saturnRing1.rotation.x = Math.PI / 2.6;
            saturnGroup.add(saturnRing1);

            const ringGeo2 = new THREE.RingGeometry(46, 56, 48);
            const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
            const saturnRing2 = new THREE.Mesh(ringGeo2, ringMat2);
            saturnRing2.rotation.x = Math.PI / 2.6;
            saturnGroup.add(saturnRing2);

            // Orbiting Moons
            const moon1 = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 16), new THREE.MeshPhongMaterial({ color: 0x00ffcc, emissive: 0x008866 }));
            moon1.position.set(65, 12, -20);
            saturnGroup.add(moon1);

            const moon2 = new THREE.Mesh(new THREE.SphereGeometry(2.0, 16, 16), new THREE.MeshPhongMaterial({ color: 0xff007f, emissive: 0x880044 }));
            moon2.position.set(-75, -15, 30);
            saturnGroup.add(moon2);

            cosmosGroup.add(saturnGroup);

            // ☀️ Glowing Plasma Sun
            const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(32, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffb703 }));
            sunMesh.position.set(-160, 80, -200);
            cosmosGroup.add(sunMesh);

            // 🌍 Azure Ice Exoplanet
            const exoplanet = new THREE.Mesh(new THREE.SphereGeometry(18, 32, 32), new THREE.MeshPhongMaterial({
                color: 0x0072ff, emissive: 0x002266, shininess: 80
            }));
            exoplanet.position.set(-90, 45, 180);
            cosmosGroup.add(exoplanet);

        } else if (activeCosmosWorld === 'rings') {
            // ⚡ Hyper Rings Speed Slalom
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 3;
                const rx = Math.sin(angle) * 35 + (Math.random() - 0.5) * 10;
                const ry = 4 + Math.cos(angle * 1.5) * 12;
                const rz = i * 42 + 25;

                const ringMesh = new THREE.Mesh(
                    new THREE.TorusGeometry(4.2, 0.3, 12, 32),
                    i % 2 === 0 ? cyanMat : goldMat
                );
                ringMesh.position.set(rx, ry, rz);
                ringMesh.rotation.y = Math.sin(angle) * 0.4;
                cosmosGroup.add(ringMesh);

                const centerOrb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), magentaMat);
                ringMesh.add(centerOrb);

                spaceRings.push({ mesh: ringMesh, radius: 4.5, active: true, baseZ: rz, index: i });
            }

        } else if (activeCosmosWorld === 'asteroids') {
            // ☄️ Deep Asteroid Storm & Destructible Minerals
            for (let i = 0; i < 55; i++) {
                const radius = Math.random() * 4.5 + 2.0;
                const geo = new THREE.DodecahedronGeometry(radius, 1);
                const posAttr = geo.attributes.position;
                for (let v = 0; v < posAttr.count; v++) {
                    posAttr.setXYZ(
                        v,
                        posAttr.getX(v) * (0.8 + Math.random() * 0.4),
                        posAttr.getY(v) * (0.8 + Math.random() * 0.4),
                        posAttr.getZ(v) * (0.8 + Math.random() * 0.4)
                    );
                }
                geo.computeVertexNormals();

                const rockMat = new THREE.MeshPhongMaterial({
                    color: i % 3 === 0 ? 0x223344 : 0x1f2430,
                    emissive: i % 4 === 0 ? 0x00f2fe : 0x000000,
                    emissiveIntensity: 0.25,
                    flatShading: true
                });

                const asteroid = new THREE.Mesh(geo, rockMat);
                asteroid.position.set(
                    (Math.random() - 0.5) * 280,
                    (Math.random() - 0.5) * 90 + 10,
                    (Math.random() - 0.5) * 280
                );
                asteroid.userData = {
                    rotX: (Math.random() - 0.5) * 0.015,
                    rotY: (Math.random() - 0.5) * 0.02,
                    rotZ: (Math.random() - 0.5) * 0.01,
                    hp: 2,
                    radius: radius,
                    index: i
                };
                cosmosGroup.add(asteroid);
                destroyableAsteroids.push({ mesh: asteroid, hp: 2, radius: radius, active: true });
            }

        } else if (activeCosmosWorld === 'cybercity') {
            // 🏙️ Cyberpunk Spire Megacity
            for (let i = 0; i < 40; i++) {
                const width = Math.random() * 8 + 6;
                const height = Math.random() * 65 + 20;
                const depth = Math.random() * 8 + 6;

                const spire = new THREE.Mesh(
                    new THREE.BoxGeometry(width, height, depth),
                    new THREE.MeshPhongMaterial({
                        color: 0x0d1224,
                        emissive: i % 2 === 0 ? 0x00f2fe : 0xff007f,
                        emissiveIntensity: 0.15
                    })
                );
                spire.position.set(
                    (Math.random() - 0.5) * 260,
                    height / 2,
                    (Math.random() - 0.5) * 260
                );
                cosmosGroup.add(spire);

                const beacon = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), goldMat);
                beacon.position.y = height / 2 + 1.2;
                spire.add(beacon);
            }

        } else if (activeCosmosWorld === 'blackhole') {
            // 🕳️ Black Hole Event Horizon Singularity
            const bhGroup = new THREE.Group();
            bhGroup.position.set(0, 25, 180);

            const singularity = new THREE.Mesh(
                new THREE.SphereGeometry(22, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x000000 })
            );
            bhGroup.add(singularity);

            const diskGeo = new THREE.RingGeometry(26, 68, 64);
            const diskMat = new THREE.MeshBasicMaterial({ color: 0xff007f, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
            const disk = new THREE.Mesh(diskGeo, diskMat);
            disk.rotation.x = Math.PI / 2.3;
            bhGroup.add(disk);

            const warpTorus = new THREE.Mesh(new THREE.TorusGeometry(32, 1.2, 12, 48), cyanMat);
            warpTorus.rotation.x = Math.PI / 2.3;
            bhGroup.add(warpTorus);

            cosmosGroup.add(bhGroup);
        }

        scene.add(cosmosGroup);
    }

    // ── Primary Vehicle Finder ────────────────────────────────────────────
    function findPrimaryVehicleObject() {
        if (customObjects.length === 0) return null;
        for (let obj of customObjects) {
            if (obj.userData && obj.userData.preset) return obj;
        }
        for (let obj of customObjects) {
            if (obj.isGroup || (obj.isMesh && obj.geometry.type !== 'PlaneGeometry')) return obj;
        }
        return customObjects[0] || null;
    }

    // ── Mission Management Engine ─────────────────────────────────────────
    function startMission(missionKey) {
        activeMission = missionKey || 'station';
        missionProgress = 0;
        isMissionComplete = false;
        if (missionInterval) clearInterval(missionInterval);

        // Sync dropdown select element & chips
        const hudMissionSelectEl = document.getElementById('hud-mission-select');
        if (hudMissionSelectEl && hudMissionSelectEl.value !== activeMission) {
            hudMissionSelectEl.value = activeMission;
        }
        document.querySelectorAll('.cockpit-chip-btn.mission-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.val === activeMission);
        });

        // Clean up previous mission objects from scene
        if (orbitalStation) { scene.remove(orbitalStation); orbitalStation = null; }
        plasmaCrystals.forEach(c => { if (c.mesh) scene.remove(c.mesh); });
        plasmaCrystals = [];
        activeLasers.forEach(l => { if (l.mesh) scene.remove(l.mesh); });
        activeLasers = [];

        const titleEl = document.getElementById('hud-mission-title');
        const descEl = document.getElementById('hud-mission-desc');
        const progEl = document.getElementById('hud-mission-progress');
        const timerEl = document.getElementById('hud-mission-timer');
        const isFR = currentLang === 'fr';

        if (activeMission === 'station') {
            missionTargetCount = 3;
            if (titleEl) titleEl.textContent = isFR ? '🎯 MISSION 1: Sauver la Station Orbitale' : '🎯 MISSION 1: Save Orbital Station';
            if (descEl) descEl.textContent = isFR ? 'Collectez 3 cristaux de plasma et livrez-les à la Station Spatiale' : 'Collect 3 plasma crystals and deliver them to the Space Station';
            if (progEl) progEl.textContent = '0 / 3 💎';
            if (timerEl) timerEl.style.display = 'none';
            buildCosmosWorld('galaxies');
            spawnMissionCrystals(3);
            spawnOrbitalStation();

        } else if (activeMission === 'wormhole') {
            missionTargetCount = 10;
            missionTimerSeconds = 60;
            if (titleEl) titleEl.textContent = isFR ? '⚡ MISSION 2: Slalom des Portes Quantiques' : '⚡ MISSION 2: Quantum Gate Slalom';
            if (descEl) descEl.textContent = isFR ? 'Traversez 10 hyper-anneaux avant la fin du chronomètre' : 'Fly through 10 hyper rings before the timer runs out';
            if (progEl) progEl.textContent = '0 / 10 ⚡';
            if (timerEl) {
                timerEl.style.display = 'block';
                timerEl.textContent = '⏱️ 00:60';
            }
            buildCosmosWorld('rings');

            missionInterval = setInterval(() => {
                if (!isPilotGameActive) return;
                missionTimerSeconds--;
                if (timerEl) timerEl.textContent = `⏱️ 00:${String(Math.max(0, missionTimerSeconds)).padStart(2, '0')}`;
                if (missionTimerSeconds <= 0) {
                    clearInterval(missionInterval);
                    if (!isMissionComplete) {
                        showHUDNotification(isFR ? '⚠️ TEMPS ÉCOULÉ ! Mission échouée.' : '⚠️ TIME OUT! Mission failed.', '#ff0055');
                    }
                }
            }, 1000);

        } else if (activeMission === 'asteroids') {
            missionTargetCount = 5;
            if (titleEl) titleEl.textContent = isFR ? '☄️ MISSION 3: Chasse & Minage d\'Astéroïdes' : '☄️ MISSION 3: Asteroid Hunt & Mining';
            if (descEl) descEl.textContent = isFR ? 'Détruisez 5 astéroïdes avec les lasers plasma [F / CLIC / TIR]' : 'Destroy 5 asteroids with plasma lasers [F / CLICK / FIRE]';
            if (progEl) progEl.textContent = '0 / 5 💥';
            if (timerEl) timerEl.style.display = 'none';
            buildCosmosWorld('asteroids');

        } else if (activeMission === 'blackhole') {
            missionTargetCount = 1;
            if (titleEl) titleEl.textContent = isFR ? '🕳️ MISSION 4: Évasion du Trou Noir' : '🕳️ MISSION 4: Event Horizon Escape';
            if (descEl) descEl.textContent = isFR ? 'Utilisez le Nitro Warp pour échapper à l\'attraction gravitationnelle !' : 'Engage Nitro Warp to escape the singularity gravitational pull!';
            if (progEl) progEl.textContent = isFR ? 'ÉVASION 🕳️' : 'ESCAPE 🕳️';
            if (timerEl) timerEl.style.display = 'none';
            buildCosmosWorld('blackhole');

        } else if (activeMission === 'freeroam') {
            if (titleEl) titleEl.textContent = isFR ? '🌌 VOL LIBRE DANS LE COSMOS' : '🌌 FREE COSMIC FLIGHT ROAM';
            if (descEl) descEl.textContent = isFR ? 'Explorez librement les galaxies, planètes et anneaux solaires' : 'Freely explore deep space, planets, and collect cosmic star treasures';
            if (progEl) progEl.textContent = isFR ? 'LIBRE ✨' : 'FREE ✨';
            if (timerEl) timerEl.style.display = 'none';
            buildCosmosWorld('galaxies');
        }
    }

    function checkMissionVictory() {
        if (isMissionComplete) return;
        isMissionComplete = true;
        if (missionInterval) clearInterval(missionInterval);

        spaceScore += 1500;
        spaceCrystals += 500;
        saveCosmicProgress();
        playMissionCompleteSFX();

        const isFR = currentLang === 'fr';
        showHUDNotification(isFR ? '🏆 MISSION ACCOMPLIE ! +1500 PTS • +500 💎' : '🏆 MISSION COMPLETE! +1500 PTS • +500 💎', '#00ffcc');
    }

    function showHUDNotification(msg, color = '#00f2fe') {
        const banner = document.getElementById('hud-boost-banner');
        const msgEl = document.getElementById('hud-boost-msg');
        if (banner && msgEl) {
            msgEl.textContent = msg;
            msgEl.style.color = color;
            banner.style.display = 'block';
            clearTimeout(ringFlashTimer);
            ringFlashTimer = setTimeout(() => { banner.style.display = 'none'; }, 2200);
        }
    }

    // ── Laser Blaster Weapon Engine ───────────────────────────────────────
    function fireLaserBlaster() {
        const obj = pilotPhysics.targetObj;
        if (!obj || !camera || !isPilotGameActive) return;

        const now = performance.now();
        const fireCooldown = unlockedUpgrades.lasers ? 130 : 250;
        if (now - lastLaserFireTime < fireCooldown) return;
        lastLaserFireTime = now;

        playLaserSFX();

        const keyF = document.getElementById('k-f');
        if (keyF) {
            keyF.classList.add('active');
            setTimeout(() => keyF.classList.remove('active'), 120);
        }

        const cosPitch = Math.cos(pilotPhysics.pitch);
        const sinPitch = Math.sin(pilotPhysics.pitch);
        const sinYaw = Math.sin(pilotPhysics.yaw);
        const cosYaw = Math.cos(pilotPhysics.yaw);

        const forwardVec = new THREE.Vector3(sinYaw * cosPitch, sinPitch, cosYaw * cosPitch);
        const rightVec = new THREE.Vector3(cosYaw, 0, -sinYaw);

        const laserColor = unlockedUpgrades.lasers ? 0x00ffcc : 0xff0055;
        const laserMat = new THREE.MeshBasicMaterial({ color: laserColor, transparent: true, opacity: 0.9 });

        [-1.1, 1.1].forEach(offset => {
            const geo = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 8);
            geo.rotateX(Math.PI / 2);
            const laserMesh = new THREE.Mesh(geo, laserMat);

            const spawnPos = obj.position.clone()
                .add(rightVec.clone().multiplyScalar(offset))
                .add(forwardVec.clone().multiplyScalar(1.5));
            laserMesh.position.copy(spawnPos);
            laserMesh.rotation.set(pilotPhysics.pitch, pilotPhysics.yaw, pilotPhysics.roll, 'YXZ');

            scene.add(laserMesh);
            activeLasers.push({
                mesh: laserMesh,
                velocity: forwardVec.clone().multiplyScalar(2.6),
                life: 55
            });
        });
    }

    // ── 3D Holographic Tactical Radar Rendering ───────────────────────────
    function drawCosmicRadar() {
        const radarCanvas = document.getElementById('hud-radar-canvas');
        if (!radarCanvas) return;
        const ctx = radarCanvas.getContext('2d');
        if (!ctx) return;

        const w = radarCanvas.width;
        const h = radarCanvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = w / 2 - 2;

        ctx.clearRect(0, 0, w, h);

        // Radar background
        ctx.fillStyle = 'rgba(10, 18, 38, 0.92)';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Range rings
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Sweeping beam
        radarSweepAngle = (radarSweepAngle + 0.04) % (Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(radarSweepAngle) * radius, cy + Math.sin(radarSweepAngle) * radius);
        ctx.stroke();

        const playerPos = pilotPhysics.targetObj ? pilotPhysics.targetObj.position : new THREE.Vector3();
        const playerYaw = pilotPhysics.yaw;
        const radarRange = 160;

        const drawBlip = (worldPos, color, size = 3) => {
            const dx = worldPos.x - playerPos.x;
            const dz = worldPos.z - playerPos.z;

            const relX = dx * Math.cos(-playerYaw) - dz * Math.sin(-playerYaw);
            const relZ = dx * Math.sin(-playerYaw) + dz * Math.cos(-playerYaw);

            const bx = cx + (relX / radarRange) * radius;
            const by = cy - (relZ / radarRange) * radius;

            if (Math.hypot(bx - cx, by - cy) < radius - 2) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(bx, by, size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        if (orbitalStation) drawBlip(orbitalStation.position, '#00ffcc', 4);
        spaceRings.forEach(r => { if (r.active) drawBlip(r.mesh.position, '#00f2fe', 3); });
        plasmaCrystals.forEach(c => { if (c.active) drawBlip(c.mesh.position, '#ffb703', 3.5); });
        destroyableAsteroids.forEach(a => { if (a.active) drawBlip(a.mesh.position, '#ff0055', 2.5); });

        // Player dot in center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // ── Pilot / Drive Mode Toggle ─────────────────────────────────────────
    let activeCameraMode = 'chase'; // 'chase', 'cockpit', 'topdown'

    function togglePilotGameMode(forcedState) {
        isPilotGameActive = (typeof forcedState === 'boolean') ? forcedState : !isPilotGameActive;
        const hud = document.getElementById('fps-hud-overlay');
        const btn = document.getElementById('btn-toggle-wasd-game');
        const btnText = document.getElementById('game-mode-btn-text');

        if (isPilotGameActive) {
            playRunSFX();
            initCosmicRadio();
            document.body.classList.add('game-mode-active');

            pilotPhysics.targetObj = findPrimaryVehicleObject();
            if (!pilotPhysics.targetObj) {
                const fallbackFighter = createProceduralModelGroup('space_fighter', '#00f2fe', 'neon');
                fallbackFighter.position.set(0, 2, 0);
                scene.add(fallbackFighter);
                customObjects.push(fallbackFighter);
                pilotPhysics.targetObj = fallbackFighter;
            }

            const presetName = (pilotPhysics.targetObj.userData && pilotPhysics.targetObj.userData.preset) || '';
            const isGroundVehicle = presetName === 'cyber_car' || presetName === 'mech_warrior';
            isSpaceFlightMode = !isGroundVehicle;
            pilotPhysics.vehicleType = isSpaceFlightMode ? 'air' : 'car';

            const modePillText = document.getElementById('hud-mode-pill-text');
            if (modePillText) modePillText.textContent = isSpaceFlightMode ? '🚀 Flight' : '🏎️ Drive';

            // Apply Upgrades
            maxShieldHP = unlockedUpgrades.shield ? 200 : 100;
            shieldHP = maxShieldHP;
            pilotPhysics.maxSpeed = unlockedUpgrades.speed ? 0.65 : 0.48;

            // Reset physics
            pilotPhysics.speed = 0;
            pilotPhysics.yaw = pilotPhysics.targetObj.rotation.y || 0;
            pilotPhysics.pitch = 0;
            pilotPhysics.roll = 0;
            pilotPhysics.altitude = pilotPhysics.targetObj.position.y || (isSpaceFlightMode ? 2.5 : 0.4);
            pilotPhysics.nitro = 1.0;

            // Initialize Infinite Starfield, World & Active Mission
            buildInfiniteStarfield();
            startMission(activeMission);
            saveCosmicProgress();

            if (controls) controls.enabled = false;
            if (hud) hud.style.display = 'flex';
            if (btn) btn.classList.add('active');
            if (btnText) btnText.textContent = '🕹️ In Game (ESC to Exit)';

            if (typeof window.onViewportResize === 'function') {
                setTimeout(window.onViewportResize, 50);
            }
        } else {
            playClickSFX();
            document.body.classList.remove('game-mode-active');
            const settingsModal = document.getElementById('modal-game-settings');
            if (settingsModal) settingsModal.classList.remove('active');

            if (synthRadioGain && audioCtx) synthRadioGain.gain.setValueAtTime(0, audioCtx.currentTime);
            if (missionInterval) clearInterval(missionInterval);

            if (controls) controls.enabled = true;
            if (hud) hud.style.display = 'none';
            if (btn) btn.classList.remove('active');
            if (btnText) btnText.textContent = '🕹️ Pilot & Drive Mode';

            // Cleanup cosmos objects on exit
            if (cosmosGroup) { scene.remove(cosmosGroup); cosmosGroup = null; }
            if (infiniteStarfield) { scene.remove(infiniteStarfield); infiniteStarfield = null; }
            if (orbitalStation) { scene.remove(orbitalStation); orbitalStation = null; }
            plasmaCrystals.forEach(c => { if (c.mesh) scene.remove(c.mesh); });
            plasmaCrystals = [];
            activeLasers.forEach(l => { if (l.mesh) scene.remove(l.mesh); });
            activeLasers = [];

            if (camera) { camera.fov = 45; camera.updateProjectionMatrix(); }
            if (typeof window.onViewportResize === 'function') {
                setTimeout(window.onViewportResize, 50);
            }
        }
    }

    // ── Main Flight & Vehicle Simulation Loop ─────────────────────────────
    function updatePilotVehicleSimulation() {
        const obj = pilotPhysics.targetObj;
        if (!obj || !camera) return;

        const forwardPressed = gameKeys.w || gameKeys.ArrowUp;
        const backPressed = gameKeys.s || gameKeys.ArrowDown;
        const leftPressed = gameKeys.a || gameKeys.ArrowLeft;
        const rightPressed = gameKeys.d || gameKeys.ArrowRight;
        const boostPressed = gameKeys[' '] && pilotPhysics.nitro > 0.04;
        const pitchUpPressed = gameKeys.q || gameKeys.Shift;
        const pitchDownPressed = gameKeys.e || gameKeys.Control;
        const resetPressed = gameKeys.r;
        const firePressed = gameKeys.f;

        if (firePressed) fireLaserBlaster();

        // Reset Position shortcut
        if (resetPressed) {
            obj.position.set(0, isSpaceFlightMode ? 2.5 : 0.4, 0);
            pilotPhysics.speed = 0;
            pilotPhysics.yaw = 0;
            pilotPhysics.pitch = 0;
            pilotPhysics.roll = 0;
            pilotPhysics.altitude = obj.position.y;
            camera.position.set(0, (isSpaceFlightMode ? 2.5 : 0.4) + 2.2, -6.5);
        }

        // Nitro Warp Boost
        const nitroConsumption = unlockedUpgrades.nitro ? 0.005 : 0.009;
        if (boostPressed) {
            if (!pilotPhysics.isBoosting) playBoostSFX();
            pilotPhysics.isBoosting = true;
            pilotPhysics.nitro = Math.max(0, pilotPhysics.nitro - nitroConsumption);
            camera.fov = THREE.MathUtils.lerp(camera.fov, 58, 0.12);
            camera.updateProjectionMatrix();
        } else {
            pilotPhysics.isBoosting = false;
            pilotPhysics.nitro = Math.min(1.0, pilotPhysics.nitro + 0.0035);
            camera.fov = THREE.MathUtils.lerp(camera.fov, 45, 0.08);
            camera.updateProjectionMatrix();
        }

        const currentMaxSpeed = pilotPhysics.isBoosting ? (pilotPhysics.maxSpeed * 2.2) : pilotPhysics.maxSpeed;

        // Thrust Acceleration & Braking
        if (forwardPressed) {
            pilotPhysics.speed = Math.min(currentMaxSpeed, pilotPhysics.speed + pilotPhysics.accel * (pilotPhysics.isBoosting ? 2.0 : 1.0));
        } else if (backPressed) {
            pilotPhysics.speed = Math.max(-currentMaxSpeed * 0.4, pilotPhysics.speed - pilotPhysics.brake);
        } else {
            pilotPhysics.speed *= pilotPhysics.friction;
            if (Math.abs(pilotPhysics.speed) < 0.001) pilotPhysics.speed = 0;
        }

        // Steering / Yaw
        let steerDir = 0;
        if (leftPressed) steerDir += 1;
        if (rightPressed) steerDir -= 1;

        if (steerDir !== 0) {
            const steerEffectiveness = Math.abs(pilotPhysics.speed) > 0.01 ? 1.0 : (isSpaceFlightMode ? 0.8 : 0.35);
            pilotPhysics.yaw += steerDir * pilotPhysics.turnSpeed * steerEffectiveness;
        }

        // Pitch (Climb / Dive)
        if (isSpaceFlightMode) {
            let pitchDir = 0;
            if (pitchUpPressed) pitchDir += 1;
            if (pitchDownPressed) pitchDir -= 1;

            if (pitchDir !== 0) {
                pilotPhysics.pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pilotPhysics.pitch + pitchDir * pilotPhysics.pitchSpeed));
            } else {
                pilotPhysics.pitch = THREE.MathUtils.lerp(pilotPhysics.pitch, 0, 0.05);
            }

            // Aerodynamic banking roll
            pilotPhysics.roll = THREE.MathUtils.lerp(pilotPhysics.roll, -steerDir * 0.55, 0.14);
        } else {
            pilotPhysics.pitch = 0;
            pilotPhysics.roll = THREE.MathUtils.lerp(pilotPhysics.roll, -steerDir * 0.1, 0.15);
        }

        // Clean 3D Forward Motion Vector
        const cosPitch = Math.cos(pilotPhysics.pitch);
        const sinPitch = Math.sin(pilotPhysics.pitch);
        const sinYaw = Math.sin(pilotPhysics.yaw);
        const cosYaw = Math.cos(pilotPhysics.yaw);

        const forwardX = sinYaw * cosPitch;
        const forwardY = sinPitch;
        const forwardZ = cosYaw * cosPitch;

        if (isSpaceFlightMode) {
            obj.position.x += forwardX * pilotPhysics.speed;
            obj.position.y += forwardY * pilotPhysics.speed;
            obj.position.z += forwardZ * pilotPhysics.speed;

            // Black Hole Gravitational Pull
            if (activeCosmosWorld === 'blackhole') {
                const bhPos = new THREE.Vector3(0, 25, 180);
                const distToBH = obj.position.distanceTo(bhPos);
                if (distToBH < 120) {
                    const pullForce = Math.min(0.22, 500 / (distToBH * distToBH + 50));
                    const toBH = bhPos.clone().sub(obj.position).normalize();
                    obj.position.addScaledVector(toBH, pullForce);

                    // Wormhole Teleportation & Singularity Event
                    if (distToBH < 22) {
                        const isFR = currentLang === 'fr';
                        showHUDNotification(isFR ? '🌀 SINGULARITÉ QUANTIQUE ! +1000 PTS' : '🌀 QUANTUM SINGULARITY TRAVERSED! +1000 PTS', '#ff00ff');
                        obj.position.set(0, 20, -40);
                        pilotPhysics.pitch = 0;
                        pilotPhysics.speed = 0.35;
                        spaceScore += 1000;
                        saveCosmicProgress();
                        if (activeMission === 'blackhole') {
                            checkMissionVictory();
                        }
                    }
                }
            }

            // Floor Clamp
            if (activeCosmosWorld !== 'deepspace' && obj.position.y < 0.4) {
                obj.position.y = 0.4;
                if (pilotPhysics.pitch < 0) pilotPhysics.pitch = 0;
            }
        } else {
            obj.position.x += sinYaw * pilotPhysics.speed;
            obj.position.z += cosYaw * pilotPhysics.speed;
            obj.position.y = 0.4;
        }

        // Apply 3D Rotation to Vehicle
        obj.rotation.set(pilotPhysics.pitch, pilotPhysics.yaw, pilotPhysics.roll, 'YXZ');

        // Infinite Infinite Starfield Re-centering
        if (infiniteStarfield) {
            infiniteStarfield.position.copy(obj.position);
            infiniteStarfield.rotation.y += 0.0003;
        }

        // Dynamic Ground Grid Re-centering
        const gridObj = scene.getObjectByName('grid-floor');
        if (gridObj) {
            gridObj.position.x = Math.floor(obj.position.x / 20) * 20;
            gridObj.position.z = Math.floor(obj.position.z / 20) * 20;
        }

        // Rotate Asteroids & Crystals
        plasmaCrystals.forEach(c => {
            if (c.active && c.mesh) {
                c.mesh.rotation.y += 0.03;
                c.mesh.rotation.x += 0.02;

                // Crystal Pickup
                if (obj.position.distanceTo(c.mesh.position) < c.radius + 1.2) {
                    c.active = false;
                    scene.remove(c.mesh);
                    spaceCrystals += 100;
                    spaceScore += 300;
                    playRingChimeSFX();
                    showHUDNotification('💎 CRYSTAL COLLECTED! +100 💎', '#00ffcc');

                    if (activeMission === 'station') {
                        missionProgress++;
                        const progEl = document.getElementById('hud-mission-progress');
                        if (progEl) progEl.textContent = `${missionProgress} / ${missionTargetCount} 💎`;
                    }
                    saveCosmicProgress();
                }
            }
        });

        // Orbital Station Delivery Check
        if (orbitalStation && activeMission === 'station' && missionProgress >= missionTargetCount) {
            if (obj.position.distanceTo(orbitalStation.position) < 14) {
                checkMissionVictory();
            }
        }

        // Laser Projectiles Simulation & Asteroid Hit Collisions
        for (let i = activeLasers.length - 1; i >= 0; i--) {
            const laser = activeLasers[i];
            laser.mesh.position.add(laser.velocity);
            laser.life--;

            // Collision check against asteroids
            destroyableAsteroids.forEach(ast => {
                if (ast.active && laser.mesh.position.distanceTo(ast.mesh.position) < ast.radius + 0.8) {
                    ast.hp -= unlockedUpgrades.lasers ? 2 : 1;
                    laser.life = 0; // Destroy laser
                    playExplosionSFX();

                    // Flash asteroid white on hit
                    ast.mesh.material.color.setHex(0xffffff);
                    setTimeout(() => { if (ast.mesh) ast.mesh.material.color.setHex(0x223344); }, 100);

                    if (ast.hp <= 0) {
                        ast.active = false;
                        scene.remove(ast.mesh);
                        spaceScore += 400;
                        spaceCrystals += 80;
                        showHUDNotification('💥 ASTEROID DESTROYED! +400 PTS', '#ffb703');

                        if (activeMission === 'asteroids') {
                            missionProgress++;
                            const progEl = document.getElementById('hud-mission-progress');
                            if (progEl) progEl.textContent = `${missionProgress} / ${missionTargetCount} 💥`;
                            if (missionProgress >= missionTargetCount) {
                                checkMissionVictory();
                            }
                        }
                        saveCosmicProgress();
                    }
                }
            });

            if (laser.life <= 0) {
                scene.remove(laser.mesh);
                activeLasers.splice(i, 1);
            }
        }

        // Hyper Rings Collision & Slalom
        if (spaceRings.length > 0) {
            spaceRings.forEach(ringData => {
                const dist = obj.position.distanceTo(ringData.mesh.position);
                if (dist < ringData.radius + 1.2 && ringData.active) {
                    ringData.active = false;
                    spaceScore += 500;
                    spaceCrystals += 50;
                    pilotPhysics.nitro = Math.min(1.0, pilotPhysics.nitro + 0.6);
                    pilotPhysics.speed = Math.min(currentMaxSpeed * 1.5, pilotPhysics.speed + 0.25);
                    playRingChimeSFX();
                    showHUDNotification('⚡ RING PASS! +500 PTS • +50 💎', '#00f2fe');

                    if (activeMission === 'wormhole') {
                        missionProgress++;
                        const progEl = document.getElementById('hud-mission-progress');
                        if (progEl) progEl.textContent = `${missionProgress} / ${missionTargetCount} ⚡`;
                        if (missionProgress >= missionTargetCount) {
                            checkMissionVictory();
                        }
                    }
                    saveCosmicProgress();

                    // Flash ring material and respawn ahead
                    ringData.mesh.material.color.setHex(0xffffff);
                    setTimeout(() => {
                        ringData.mesh.position.z = obj.position.z + 120 + Math.random() * 80;
                        ringData.mesh.position.x = obj.position.x + (Math.random() - 0.5) * 40;
                        ringData.mesh.position.y = Math.max(2, obj.position.y + (Math.random() - 0.5) * 20);
                        ringData.mesh.material.color.setHex(0x00f2fe);
                        ringData.active = true;
                    }, 400);
                }
            });
        }

        // Camera View Modes: Chase, Cockpit, or Top-Down
        if (activeCameraMode === 'cockpit') {
            // First-Person Cockpit View
            const desiredCamX = obj.position.x + forwardX * 0.4;
            const desiredCamY = obj.position.y + 0.35;
            const desiredCamZ = obj.position.z + forwardZ * 0.4;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.25);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.25);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.25);

            camera.lookAt(
                obj.position.x + forwardX * 30.0,
                obj.position.y + forwardY * 30.0 + 0.2,
                obj.position.z + forwardZ * 30.0
            );
        } else if (activeCameraMode === 'topdown') {
            // Tactical Top-Down Drone Cam
            const desiredCamX = obj.position.x;
            const desiredCamY = obj.position.y + 18.0;
            const desiredCamZ = obj.position.z - 3.0;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.15);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.15);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.15);

            camera.lookAt(
                obj.position.x,
                obj.position.y,
                obj.position.z + forwardZ * 6.0
            );
        } else {
            // Smooth 3rd-Person Chase Camera (Default)
            const camDist = isSpaceFlightMode ? 6.8 : 5.4;
            const camH = isSpaceFlightMode ? 2.2 : 1.8;
            const desiredCamX = obj.position.x - sinYaw * camDist;
            const desiredCamY = obj.position.y + camH - sinPitch * 2.0;
            const desiredCamZ = obj.position.z - cosYaw * camDist;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.18);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.18);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.18);

            camera.lookAt(
                obj.position.x + forwardX * 2.0,
                obj.position.y + 0.6,
                obj.position.z + forwardZ * 2.0
            );
        }

        // Update Cyber Cockpit Telemetry
        const speedKMH = Math.round(Math.abs(pilotPhysics.speed) * 340);
        const speedValEl = document.getElementById('hud-speed-val');
        if (speedValEl) speedValEl.textContent = String(speedKMH).padStart(3, '0');

        const nitroFillEl = document.getElementById('hud-nitro-fill');
        if (nitroFillEl) nitroFillEl.style.width = (pilotPhysics.nitro * 100).toFixed(0) + '%';

        const shieldFillEl = document.getElementById('hud-shield-fill');
        const shieldValEl = document.getElementById('hud-shield-val');
        const shieldPct = Math.round((shieldHP / maxShieldHP) * 100);
        if (shieldFillEl) shieldFillEl.style.width = shieldPct + '%';
        if (shieldValEl) shieldValEl.textContent = shieldPct + '%';

        // Draw Mini Holographic Radar
        drawCosmicRadar();

        // Update Key Indicator Highlights
        const keyMap = {
            'k-w': forwardPressed,
            'k-s': backPressed,
            'k-a': leftPressed,
            'k-d': rightPressed,
            'k-f': firePressed,
            'k-space': boostPressed,
            'k-q': pitchUpPressed,
            'k-e': pitchDownPressed,
            'k-r': resetPressed
        };
        for (let id in keyMap) {
            const keyEl = document.getElementById(id);
            if (keyEl) keyEl.classList.toggle('active', !!keyMap[id]);
        }
    }

    // Keyboard event listeners
    window.addEventListener('keydown', (e) => {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) return;

        if (isPilotGameActive) {
            // Unfocus any select dropdowns so typing WASD won't switch options!
            if (activeEl && activeEl.tagName === 'SELECT') {
                activeEl.blur();
            }

            if (e.key === 'Escape') {
                togglePilotGameMode(false);
                return;
            }

            if (e.key.toLowerCase() === 'h') {
                openHangarModal();
                return;
            }

            // Prevent browser default scrolling for flight keys
            const flightKeyList = ['w', 'a', 's', 'd', 'q', 'e', 'f', 'r', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (flightKeyList.includes(e.key.toLowerCase()) || flightKeyList.includes(e.key)) {
                e.preventDefault();
            }
        }

        const k = e.key.toLowerCase();
        if (k in gameKeys) gameKeys[k] = true;
        if (e.key in gameKeys) gameKeys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        const k = e.key.toLowerCase();
        if (k in gameKeys) gameKeys[k] = false;
        if (e.key in gameKeys) gameKeys[e.key] = false;
    });

    // Mouse click to fire plasma lasers in game mode
    window.addEventListener('mousedown', (e) => {
        if (!isPilotGameActive) return;
        const target = e.target;
        if (target && (target.tagName === 'BUTTON' || target.tagName === 'SELECT' || target.closest('.modal-card') || target.closest('.hud-select-wrap'))) return;
        if (document.activeElement && document.activeElement.tagName === 'SELECT') {
            document.activeElement.blur();
        }
        fireLaserBlaster();
    });

    const btnToggleWASDGame = document.getElementById('btn-toggle-wasd-game');
    if (btnToggleWASDGame) {
        btnToggleWASDGame.addEventListener('click', () => togglePilotGameMode());
    }

    const btnExitGameHud = document.getElementById('btn-exit-game-hud');
    if (btnExitGameHud) {
        btnExitGameHud.addEventListener('click', () => togglePilotGameMode(false));
    }

    // Mission Selector in HUD & Chips
    const hudMissionSelect = document.getElementById('hud-mission-select');
    if (hudMissionSelect) {
        hudMissionSelect.addEventListener('change', (e) => {
            playClickSFX();
            startMission(e.target.value);
        });
    }

    document.querySelectorAll('.cockpit-chip-btn.mission-chip').forEach(chip => {
        const handleMissionChip = (e) => {
            e.preventDefault();
            playClickSFX();
            const val = chip.dataset.val;
            startMission(val);
        };
        chip.addEventListener('click', handleMissionChip);
        chip.addEventListener('touchend', handleMissionChip);
    });

    // Cosmic World Selector in HUD & Chips
    const hudWorldSelect = document.getElementById('hud-world-select');
    if (hudWorldSelect) {
        hudWorldSelect.addEventListener('change', (e) => {
            playClickSFX();
            buildCosmosWorld(e.target.value);
        });
    }

    document.querySelectorAll('.cockpit-chip-btn.world-chip').forEach(chip => {
        const handleWorldChip = (e) => {
            e.preventDefault();
            playClickSFX();
            const val = chip.dataset.val;
            buildCosmosWorld(val);
        };
        chip.addEventListener('click', handleWorldChip);
        chip.addEventListener('touchend', handleWorldChip);
    });

    // Synth Radio Selector in HUD & Chips
    const hudRadioSelect = document.getElementById('hud-radio-select');
    if (hudRadioSelect) {
        hudRadioSelect.addEventListener('change', (e) => {
            playClickSFX();
            setRadioChannel(e.target.value);
        });
    }

    document.querySelectorAll('.cockpit-chip-btn.radio-chip').forEach(chip => {
        const handleRadioChip = (e) => {
            e.preventDefault();
            playClickSFX();
            const val = chip.dataset.val;
            setRadioChannel(val);
        };
        chip.addEventListener('click', handleRadioChip);
        chip.addEventListener('touchend', handleRadioChip);
    });

    // Flight / Drive Mode Toggle Pill in HUD
    const hudBtnModeToggle = document.getElementById('hud-btn-mode-toggle');
    if (hudBtnModeToggle) {
        hudBtnModeToggle.addEventListener('click', () => {
            playClickSFX();
            isSpaceFlightMode = !isSpaceFlightMode;
            pilotPhysics.vehicleType = isSpaceFlightMode ? 'air' : 'car';
            const pillText = document.getElementById('hud-mode-pill-text');
            if (pillText) pillText.textContent = isSpaceFlightMode ? '🚀 Flight' : '🏎️ Drive';
        });
    }

    // Cockpit Game Settings & Missions Modal
    const modalGameSettings = document.getElementById('modal-game-settings');
    const btnOpenGameSettings = document.getElementById('btn-open-game-settings');
    const btnCloseGameSettings = document.getElementById('btn-close-game-settings');
    const btnResumeGameModal = document.getElementById('btn-resume-game-modal');
    const btnModalOpenHangar = document.getElementById('btn-modal-open-hangar');
    const btnModalExitGame = document.getElementById('btn-modal-exit-game');

    function openGameSettingsModal(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        playClickSFX();
        if (modalGameSettings) modalGameSettings.classList.add('active');
    }

    if (btnOpenGameSettings) {
        btnOpenGameSettings.addEventListener('click', openGameSettingsModal);
    }

    const hudMissionTrackerEl = document.getElementById('hud-mission-tracker');
    if (hudMissionTrackerEl) {
        hudMissionTrackerEl.addEventListener('click', openGameSettingsModal);
        hudMissionTrackerEl.addEventListener('touchend', openGameSettingsModal);
    }
    if (btnCloseGameSettings && modalGameSettings) {
        btnCloseGameSettings.addEventListener('click', () => {
            playClickSFX();
            modalGameSettings.classList.remove('active');
        });
    }
    if (btnResumeGameModal && modalGameSettings) {
        btnResumeGameModal.addEventListener('click', () => {
            playClickSFX();
            modalGameSettings.classList.remove('active');
        });
    }
    if (btnModalOpenHangar && modalGameSettings) {
        btnModalOpenHangar.addEventListener('click', () => {
            playClickSFX();
            modalGameSettings.classList.remove('active');
            openHangarModal();
        });
    }
    if (btnModalExitGame && modalGameSettings) {
        btnModalExitGame.addEventListener('click', () => {
            playClickSFX();
            modalGameSettings.classList.remove('active');
            togglePilotGameMode(false);
        });
    }

    // Camera Perspective Selector buttons
    document.querySelectorAll('.cam-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playClickSFX();
            document.querySelectorAll('.cam-view-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            activeCameraMode = e.currentTarget.getAttribute('data-cam') || 'chase';
        });
    });

    // Hangar Modal Open & Upgrade Management
    const modalHangar = document.getElementById('modal-cosmic-hangar');
    const btnOpenHangar = document.getElementById('btn-open-hangar');
    const btnCloseHangar = document.getElementById('btn-close-hangar');
    const btnCloseHangarFooter = document.getElementById('btn-close-hangar-footer');
    const hangarCrystalsDisplay = document.getElementById('hangar-crystals-display');

    function openHangarModal() {
        if (!modalHangar) return;
        playClickSFX();
        modalHangar.classList.add('active');
        if (hangarCrystalsDisplay) hangarCrystalsDisplay.textContent = `💎 ${spaceCrystals} Crystals`;

        // Update card buttons
        document.querySelectorAll('.btn-hangar-buy').forEach(btn => {
            const upg = btn.dataset.upgrade;
            const cost = parseInt(btn.dataset.cost || '0', 10);
            if (unlockedUpgrades[upg]) {
                btn.classList.add('owned');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> EQUIPPED';
            } else {
                btn.classList.remove('owned');
                btn.textContent = `${cost} 💎`;
            }
        });
    }

    if (btnOpenHangar) btnOpenHangar.addEventListener('click', openHangarModal);
    if (btnCloseHangar) btnCloseHangar.addEventListener('click', () => { playClickSFX(); modalHangar.classList.remove('active'); });
    if (btnCloseHangarFooter) btnCloseHangarFooter.addEventListener('click', () => { playClickSFX(); modalHangar.classList.remove('active'); });

    if (modalGameSettings) {
        modalGameSettings.addEventListener('click', (e) => {
            if (e.target === modalGameSettings) {
                playClickSFX();
                modalGameSettings.classList.remove('active');
            }
        });
    }
    if (modalHangar) {
        modalHangar.addEventListener('click', (e) => {
            if (e.target === modalHangar) {
                playClickSFX();
                modalHangar.classList.remove('active');
            }
        });
    }

    // Handle Buying Upgrades
    document.querySelectorAll('.btn-hangar-buy').forEach(btn => {
        btn.addEventListener('click', () => {
            const upg = btn.dataset.upgrade;
            const cost = parseInt(btn.dataset.cost || '0', 10);
            if (unlockedUpgrades[upg]) return;

            if (spaceCrystals >= cost) {
                spaceCrystals -= cost;
                unlockedUpgrades[upg] = true;
                playRingChimeSFX();
                saveCosmicProgress();
                openHangarModal();
                showHUDNotification(`🛠️ UPGRADE INSTALLED: ${upg.toUpperCase()}`, '#00ffcc');
            } else {
                showHUDNotification('⚠️ NOT ENOUGH DARK MATTER CRYSTALS!', '#ff0055');
            }
        });
    });

    // ── Enhanced Mobile & Tablet Virtual Gamepad Engine ──────────────────
    const touchMap = {
        'tbtn-up': 'w',
        'tbtn-down': 's',
        'tbtn-left': 'a',
        'tbtn-right': 'd',
        'tbtn-pitch-up': 'q',
        'tbtn-pitch-down': 'e',
        'tbtn-boost': ' ',
        'tbtn-brake': 's'
    };

    const bindTouch = (id, keyName) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const setKey = (val) => {
            gameKeys[keyName] = val;
            btn.classList.toggle('active', val);
        };
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setKey(true);
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setKey(false);
        }, { passive: false });

        btn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            setKey(false);
        }, { passive: false });

        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            setKey(true);
        });
        btn.addEventListener('mouseup', () => setKey(false));
        btn.addEventListener('mouseleave', () => setKey(false));
    };

    Object.keys(touchMap).forEach(id => bindTouch(id, touchMap[id]));

    // D-Pad Multi-Direction Sliding & Drag Tracker
    const touchDpad = document.querySelector('.touch-dpad');
    if (touchDpad) {
        const handleDpadMove = (e) => {
            if (!isPilotGameActive) return;
            const touch = e.touches ? e.touches[0] : e;
            if (!touch) return;
            const rect = touchDpad.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = touch.clientX - cx;
            const dy = touch.clientY - cy;
            const dist = Math.hypot(dx, dy);

            if (dist > 15) {
                const angle = Math.atan2(dy, dx); // -PI to +PI
                // -PI/2 is UP, PI/2 is DOWN, 0 is RIGHT, PI/-PI is LEFT
                gameKeys.w = angle < -Math.PI / 8 && angle > -7 * Math.PI / 8;
                gameKeys.s = angle > Math.PI / 8 && angle < 7 * Math.PI / 8;
                gameKeys.d = angle > -3 * Math.PI / 8 && angle < 3 * Math.PI / 8;
                gameKeys.a = angle > 5 * Math.PI / 8 || angle < -5 * Math.PI / 8;

                const btnUp = document.getElementById('tbtn-up');
                const btnDown = document.getElementById('tbtn-down');
                const btnLeft = document.getElementById('tbtn-left');
                const btnRight = document.getElementById('tbtn-right');
                if (btnUp) btnUp.classList.toggle('active', !!gameKeys.w);
                if (btnDown) btnDown.classList.toggle('active', !!gameKeys.s);
                if (btnLeft) btnLeft.classList.toggle('active', !!gameKeys.a);
                if (btnRight) btnRight.classList.toggle('active', !!gameKeys.d);
            }
        };

        touchDpad.addEventListener('touchmove', (e) => {
            e.preventDefault();
            handleDpadMove(e);
        }, { passive: false });
    }

    // Auto-fire laser blaster with holding interval
    let laserAutoFireTimer = null;
    const tbtnFire = document.getElementById('tbtn-fire');
    if (tbtnFire) {
        const startLaserFiring = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            fireLaserBlaster();
            tbtnFire.classList.add('active');
            if (laserAutoFireTimer) clearInterval(laserAutoFireTimer);
            laserAutoFireTimer = setInterval(() => {
                if (isPilotGameActive) fireLaserBlaster();
            }, 180);
        };
        const stopLaserFiring = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            tbtnFire.classList.remove('active');
            if (laserAutoFireTimer) {
                clearInterval(laserAutoFireTimer);
                laserAutoFireTimer = null;
            }
        };

        tbtnFire.addEventListener('touchstart', startLaserFiring, { passive: false });
        tbtnFire.addEventListener('touchend', stopLaserFiring, { passive: false });
        tbtnFire.addEventListener('touchcancel', stopLaserFiring, { passive: false });
        tbtnFire.addEventListener('mousedown', startLaserFiring);
        tbtnFire.addEventListener('mouseup', stopLaserFiring);
        tbtnFire.addEventListener('mouseleave', stopLaserFiring);
    }

    const tbtnMissions = document.getElementById('tbtn-missions');
    if (tbtnMissions) {
        tbtnMissions.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openGameSettingsModal(e);
        }, { passive: false });
        tbtnMissions.addEventListener('click', openGameSettingsModal);
    }

    const tbtnHangar = document.getElementById('tbtn-hangar');
    if (tbtnHangar) {
        tbtnHangar.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openHangarModal();
        }, { passive: false });
        tbtnHangar.addEventListener('click', openHangarModal);
    }

    const tbtnReset = document.getElementById('tbtn-reset');
    if (tbtnReset) {
        const doReset = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            gameKeys.r = true;
            setTimeout(() => { gameKeys.r = false; }, 200);
        };
        tbtnReset.addEventListener('touchstart', doReset, { passive: false });
        tbtnReset.addEventListener('click', doReset);
    }

    // Direct Canvas Touch Drag for Flight Yaw & Pitch in Pilot Mode
    let touchFlightStartX = 0;
    let touchFlightStartY = 0;
    let isTouchingCanvasFlight = false;

    const webglCanvas = document.getElementById('webgl-canvas');
    if (webglCanvas) {
        webglCanvas.addEventListener('touchstart', (e) => {
            if (!isPilotGameActive) return;
            if (modalGameSettings?.classList.contains('active') || modalHangar?.classList.contains('active')) return;
            if (e.target.closest('.mobile-game-touch-controls') || e.target.closest('.game-hud-top') || e.target.closest('.modal-card') || e.target.closest('.modal-overlay')) return;
            const touch = e.touches[0];
            if (touch) {
                touchFlightStartX = touch.clientX;
                touchFlightStartY = touch.clientY;
                isTouchingCanvasFlight = true;
            }
        }, { passive: true });

        webglCanvas.addEventListener('touchmove', (e) => {
            if (!isPilotGameActive || !isTouchingCanvasFlight) return;
            const touch = e.touches[0];
            if (!touch) return;
            const deltaX = touch.clientX - touchFlightStartX;
            const deltaY = touch.clientY - touchFlightStartY;
            touchFlightStartX = touch.clientX;
            touchFlightStartY = touch.clientY;

            // Apply smooth steering yaw & pitch
            pilotPhysics.yaw -= deltaX * 0.008;
            if (isSpaceFlightMode) {
                pilotPhysics.pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pilotPhysics.pitch - deltaY * 0.006));
            }
        }, { passive: true });

        const endCanvasFlight = () => { isTouchingCanvasFlight = false; };
        webglCanvas.addEventListener('touchend', endCanvasFlight, { passive: true });
        webglCanvas.addEventListener('touchcancel', endCanvasFlight, { passive: true });
    }

    // Fullscreen API Helper
    function toggleAppFullscreen() {
        const doc = document;
        const docEl = doc.documentElement;
        const isFS = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;

        if (!isFS) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen().catch(() => {});
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
            const fsText = document.getElementById('hud-fs-text');
            if (fsText) fsText.textContent = 'Exit Full';
        } else {
            if (doc.exitFullscreen) {
                doc.exitFullscreen().catch(() => {});
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            const fsText = document.getElementById('hud-fs-text');
            if (fsText) fsText.textContent = 'Fullscreen';
        }
    }

    const btnHudFullscreen = document.getElementById('btn-hud-fullscreen');
    if (btnHudFullscreen) btnHudFullscreen.addEventListener('click', toggleAppFullscreen);

    const tbtnFullscreen = document.getElementById('tbtn-fullscreen');
    if (tbtnFullscreen) {
        tbtnFullscreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleAppFullscreen();
        }, { passive: false });
        tbtnFullscreen.addEventListener('click', toggleAppFullscreen);
    }

    // On-Screen Touch Gamepad Display Toggle
    const btnHudTouchToggle = document.getElementById('btn-hud-touch-toggle');
    const mobileGameTouch = document.getElementById('mobile-game-touch');
    if (btnHudTouchToggle && mobileGameTouch) {
        btnHudTouchToggle.addEventListener('click', () => {
            const isCurrentlyHidden = mobileGameTouch.classList.contains('force-hide') ||
                (getComputedStyle(mobileGameTouch).display === 'none' && !mobileGameTouch.classList.contains('force-show'));

            if (isCurrentlyHidden) {
                mobileGameTouch.classList.add('force-show');
                mobileGameTouch.classList.remove('force-hide');
                btnHudTouchToggle.classList.add('active');
            } else {
                mobileGameTouch.classList.add('force-hide');
                mobileGameTouch.classList.remove('force-show');
                btnHudTouchToggle.classList.remove('active');
            }
        });
    }

    // ── PWA Service Worker Registration & Installation Prompt ────────────
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then((reg) => {
                console.log('[PWA] Service Worker registered with scope:', reg.scope);
            }).catch((err) => {
                console.warn('[PWA] Service Worker registration failed:', err);
            });
        });
    }

    let deferredPwaPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPwaPrompt = e;
        const btnPwa = document.getElementById('btn-pwa-install-prompt');
        if (btnPwa) {
            btnPwa.style.display = 'inline-flex';
            btnPwa.onclick = async () => {
                if (deferredPwaPrompt) {
                    deferredPwaPrompt.prompt();
                    const { outcome } = await deferredPwaPrompt.userChoice;
                    console.log('[PWA] User response to install:', outcome);
                    deferredPwaPrompt = null;
                    btnPwa.style.display = 'none';
                }
            };
        }
    });

    // PWA Install Guide Modal Listeners
    const btnOpenInstallGuide = document.getElementById('btn-open-install-guide');
    const modalInstallGuide = document.getElementById('modal-install-guide');
    const btnCloseInstallGuide = document.getElementById('btn-close-install-guide');
    const btnCloseInstallGuideFooter = document.getElementById('btn-close-install-guide-footer');

    if (btnOpenInstallGuide && modalInstallGuide) {
        btnOpenInstallGuide.addEventListener('click', () => {
            playClickSFX();
            modalInstallGuide.classList.add('active');
        });
    }
    if (btnCloseInstallGuide && modalInstallGuide) {
        btnCloseInstallGuide.addEventListener('click', () => {
            playClickSFX();
            modalInstallGuide.classList.remove('active');
        });
    }
    if (btnCloseInstallGuideFooter && modalInstallGuide) {
        btnCloseInstallGuideFooter.addEventListener('click', () => {
            playClickSFX();
            modalInstallGuide.classList.remove('active');
        });
    }

    // Mobile & Tablet Workspace View Mode Switcher (Canvas vs Editor)
    const mtabViewport = document.getElementById('mtab-viewport');
    const mtabEditor = document.getElementById('mtab-editor');
    const paneViewport = document.getElementById('pane-viewport');

    const updateCanvasViewSize = () => {
        if (paneViewport && renderer && camera) {
            const w = paneViewport.clientWidth || window.innerWidth;
            const h = paneViewport.clientHeight || (window.innerHeight - 80);
            if (w > 0 && h > 0) {
                renderer.setSize(w, h);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        }
    };

    if (mtabViewport && mtabEditor && paneEditor && paneViewport) {
        mtabViewport.addEventListener('click', () => {
            playClickSFX();
            mtabViewport.classList.add('active');
            mtabEditor.classList.remove('active');
            paneEditor.classList.remove('mobile-active');
            paneViewport.classList.remove('mobile-hidden');
            setTimeout(updateCanvasViewSize, 60);
        });

        mtabEditor.addEventListener('click', () => {
            playClickSFX();
            mtabEditor.classList.add('active');
            mtabViewport.classList.remove('active');
            paneEditor.classList.add('mobile-active');
            paneViewport.classList.add('mobile-hidden');
        });
    }

    // Responsive Canvas Resize on Mobile Orientation & Window Resize
    window.addEventListener('resize', updateCanvasViewSize);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateCanvasViewSize, 150);
        setTimeout(updateCanvasViewSize, 400);
    });

    // ----------------------------------------------------------------------
    // 3D PHOTO / IMAGE IMPORT ENGINE LOGIC  +  PHOTO CONTROL PANEL
    // ----------------------------------------------------------------------
    const btnImportImage  = document.getElementById('btn-import-image');
    const fileImportImage = document.getElementById('file-import-image');

    // Panel elements
    const photoPanel         = document.getElementById('panel-photo-import');
    const photoBtnClose      = document.getElementById('btn-close-photo-import');
    const photoThumb         = document.getElementById('photo-preview-thumb');
    const photoFrameSel      = document.getElementById('photo-frame-select');
    const photoFrameColor    = document.getElementById('photo-frame-color');
    const photoSliderWidth   = document.getElementById('photo-slider-width');
    const photoSliderHeight  = document.getElementById('photo-slider-height');
    const photoSliderX       = document.getElementById('photo-slider-x');
    const photoSliderY       = document.getElementById('photo-slider-y');
    const photoSliderZ       = document.getElementById('photo-slider-z');
    const photoSliderRY      = document.getElementById('photo-slider-ry');
    const photoValWidth      = document.getElementById('photo-val-width');
    const photoValHeight     = document.getElementById('photo-val-height');
    const photoValX          = document.getElementById('photo-val-x');
    const photoValY          = document.getElementById('photo-val-y');
    const photoValZ          = document.getElementById('photo-val-z');
    const photoValRY         = document.getElementById('photo-val-ry');
    const photoBtnApply      = document.getElementById('photo-btn-apply');
    const photoBtnOpenStudio = document.getElementById('photo-btn-open-studio');

    // FX buttons
    const pfxDepth       = document.getElementById('pfx-depth');
    const pfxScanner     = document.getElementById('pfx-scanner');
    const pfxHologram    = document.getElementById('pfx-hologram');
    const pfxDisintegrate= document.getElementById('pfx-disintegrate');
    const pfxInvert      = document.getElementById('pfx-invert');
    const pfxFloat       = document.getElementById('pfx-float');

    // State for the currently imported photo tag
    let _photoImgId   = null;
    let _photoDataUrl = null;

    /** Reads all panel controls and rebuilds the image-3d tag for the imported photo */
    function buildPhotoTag() {
        if (!_photoImgId || !_photoDataUrl) return null;
        const w   = parseFloat(photoSliderWidth.value);
        const h   = parseFloat(photoSliderHeight.value);
        const x   = parseFloat(photoSliderX.value);
        const y   = parseFloat(photoSliderY.value);
        const z   = parseFloat(photoSliderZ.value);
        const ry  = parseInt(photoSliderRY.value);
        const fr  = photoFrameSel  ? photoFrameSel.value   : 'neon';
        const col = photoFrameColor? photoFrameColor.value : '#00f2fe';

        const depth   = pfxDepth       && pfxDepth.classList.contains('active')       ? '0.4'     : '0';
        const scanner = pfxScanner     && pfxScanner.classList.contains('active')     ? 'true'    : 'false';
        const back    = pfxHologram    && pfxHologram.classList.contains('active')    ? 'hologram': 'none';
        const disin   = pfxDisintegrate&& pfxDisintegrate.classList.contains('active')? 'true'    : 'false';
        const invert  = pfxInvert      && pfxInvert.classList.contains('active')      ? 'true'    : 'false';
        const anim    = pfxFloat       && pfxFloat.classList.contains('active')       ? 'float'   : 'none';

        return `<image-3d id="${_photoImgId}" src="${_photoDataUrl}" x="${x}" y="${y}" z="${z}" width="${w}" height="${h}" rot-x="0" rot-y="${ry}" rot-z="0" frame="${fr}" color="${col}" depth="${depth}" scanner="${scanner}" back="${back}" disintegrate="${disin}" invert="${invert}" animate="${anim}"></image-3d>`;
    }

    /** Replace / insert the image-3d tag in the code editor, then run */
    function applyPhotoTag() {
        if (!_photoImgId) return;
        const tag = buildPhotoTag();
        if (!tag) return;
        const code = codeEditor.value;
        const re   = new RegExp(`<image-3d[^>]*id="${_photoImgId}"[^>]*>\\s*</image-3d>`, 'g');
        if (re.test(code)) {
            codeEditor.value = code.replace(re, tag);
        } else {
            // First insertion
            codeEditor.value = code.length > 0 ? code + '\n\n' + tag : tag;
        }
        updateLineNumbers();
        runCode();
    }

    /** Open the photo panel and show thumbnail */
    function openPhotoPanel(dataUrl) {
        if (!photoPanel) return;
        _photoDataUrl = dataUrl;
        // Show thumbnail
        if (photoThumb) { photoThumb.src = dataUrl; }
        // Reset sliders to defaults
        if (photoSliderWidth)  { photoSliderWidth.value  = 3.5; photoValWidth.textContent  = '3.5'; }
        if (photoSliderHeight) { photoSliderHeight.value = 2.5; photoValHeight.textContent = '2.5'; }
        if (photoSliderX)      { photoSliderX.value = 0;   photoValX.textContent = '0.0'; }
        if (photoSliderY)      { photoSliderY.value = 1;   photoValY.textContent = '1.0'; }
        if (photoSliderZ)      { photoSliderZ.value = 0;   photoValZ.textContent = '0.0'; }
        if (photoSliderRY)     { photoSliderRY.value = 0;  photoValRY.textContent = '0°';  }
        if (photoFrameSel)     photoFrameSel.value   = 'neon';
        if (photoFrameColor)   photoFrameColor.value = '#00f2fe';
        // Reset FX toggles
        [pfxDepth, pfxScanner, pfxHologram].forEach(b => b && b.classList.add('active'));
        [pfxDisintegrate, pfxInvert, pfxFloat].forEach(b => b && b.classList.remove('active'));
        // Show panel
        photoPanel.classList.remove('hidden');
    }

    // Live slider labels
    function bindPhotoSlider(slider, valEl, suffix, decimals) {
        if (!slider || !valEl) return;
        slider.addEventListener('input', () => {
            valEl.textContent = parseFloat(slider.value).toFixed(decimals) + (suffix || '');
        });
    }
    bindPhotoSlider(photoSliderWidth,  photoValWidth,  '',  1);
    bindPhotoSlider(photoSliderHeight, photoValHeight, '',  1);
    bindPhotoSlider(photoSliderX,      photoValX,      '',  1);
    bindPhotoSlider(photoSliderY,      photoValY,      '',  1);
    bindPhotoSlider(photoSliderZ,      photoValZ,      '',  1);
    bindPhotoSlider(photoSliderRY,     photoValRY,     '°', 0);

    // FX toggle buttons
    [pfxDepth, pfxScanner, pfxHologram, pfxDisintegrate, pfxInvert, pfxFloat].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // Apply button
    if (photoBtnApply) photoBtnApply.addEventListener('click', () => {
        playRunSFX();
        applyPhotoTag();
    });

    // Open Frame Studio from panel
    if (photoBtnOpenStudio) photoBtnOpenStudio.addEventListener('click', () => {
        playClickSFX();
        const modal = document.getElementById('modal-photo-frame');
        if (modal) modal.classList.add('visible');
        photoPanel.classList.add('hidden');
    });

    // Close panel
    if (photoBtnClose) photoBtnClose.addEventListener('click', () => {
        photoPanel.classList.add('hidden');
    });

    // ── Original import logic (now also shows the panel) ──
    if (btnImportImage && fileImportImage) {
        btnImportImage.addEventListener('click', () => {
            playClickSFX();
            fileImportImage.click();
        });

        fileImportImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                const dataUrl = evt.target.result;
                _photoImgId = `image_${Date.now()}`;

                const hasExistingCode = codeEditor.value.trim().length > 0;
                const offsetZ = hasExistingCode ? 0.5 : 0;

                const newImageTag = `<image-3d id="${_photoImgId}" src="${dataUrl}" x="0" y="1" z="${offsetZ}" width="3.5" height="2.5" rot-x="0" rot-y="0" rot-z="0" frame="neon" color="#00f2fe" depth="0.4" scanner="true" back="hologram" animate="float"></image-3d>`;

                if (hasExistingCode) {
                    codeEditor.value += '\n\n' + newImageTag;
                } else {
                    codeEditor.value = newImageTag;
                }

                updateLineNumbers();
                runCode();
                setActiveModelPreset(_photoImgId);

                // Open the Photo Control Panel with thumbnail
                openPhotoPanel(dataUrl);
            };
            reader.readAsDataURL(file);
            e.target.value = '';
        });
    }

    const btnUniqueStudio = document.getElementById('btn-unique-studio');
    if (btnUniqueStudio) {
        btnUniqueStudio.addEventListener('click', () => {
            playRunSFX();
            const uniqueDemoCode = `<!-- ✨ HYPERSTUDIO 3D/4D - UNIQUE MODEL ENGINE COMBO -->
<liquid-metal radius="1.4" color="#00f2fe" speed="0.04" ripple="0.3"></liquid-metal>
<forcefield radius="2.4" color="#00ffcc" pulse="0.03"></forcefield>
<dna-helix radius="1.2" height="4.5" color1="#00f2fe" color2="#ff007f" speed="0.02" x="-3" y="1" z="0"></dna-helix>
<spatial-audio radius="2.0" color="#ffb703" speed="0.04" x="3" y="1" z="0"></spatial-audio>
<text-3d text="UNIQUE 3D ENGINE" x="0" y="2.8" z="0" scale="0.9" color="#00f2fe" material="neon" animate="float"></text-3d>
<cta-button text="DISCOVER 🚀" url="https://example.com" x="0" y="-1.8" z="0" color="#00ffcc"></cta-button>
<particles count="3000" color="#00ffcc" speed="0.01"></particles>
<light-point x="5" y="5" z="5" color="#00f2fe" intensity="2.0"></light-point>`;
            codeEditor.value = uniqueDemoCode;
            updateLineNumbers();
            runCode();
        });
    }

    // ----------------------------------------------------------------------
    // 🖼️ 3D PHOTO FRAME STUDIO PRO MODAL HANDLERS (5 ADVANCED FX)
    // ----------------------------------------------------------------------
    const btnOpenFrameStudio = document.getElementById('btn-open-frame-studio');
    const btnQuickFrame = document.getElementById('btn-quick-frame');
    const modalPhotoFrame = document.getElementById('modal-photo-frame');
    const btnClosePhotoFrame = document.getElementById('btn-close-photo-frame');
    const btnApplyPhotoFrame = document.getElementById('btn-apply-photo-frame');

    const btnToggleDepthRelief = document.getElementById('btn-toggle-depth-relief');
    const btnToggleCyberScanner = document.getElementById('btn-toggle-cyber-scanner');
    const btnToggleDualSide = document.getElementById('btn-toggle-dual-side');
    const btnToggleDisintegrate = document.getElementById('btn-toggle-disintegrate');
    const btnToggleInvertColors = document.getElementById('btn-toggle-invert-colors');
    const btnToggleHotspotPin = document.getElementById('btn-toggle-hotspot-pin');

    function updatePhotoStudioModalButtonUI() {
        const editorText = codeEditor.value;

        // 1. Depth Relief
        const isDepthOff = editorText.includes('depth="0"');
        if (btnToggleDepthRelief) {
            btnToggleDepthRelief.innerHTML = isDepthOff 
                ? '<i class="fa-solid fa-layer-group" style="color:#888;"></i> <span>🗿 3D Depth Relief: OFF</span>'
                : '<i class="fa-solid fa-layer-group" style="color:#00ffcc;"></i> <span>🗿 3D Depth Relief: ON</span>';
            btnToggleDepthRelief.style.borderColor = isDepthOff ? 'var(--border-color)' : '#00ffcc';
            btnToggleDepthRelief.style.background = isDepthOff ? 'transparent' : 'rgba(0, 255, 204, 0.15)';
        }

        // 2. Cyber Laser Scanner
        const isScannerOff = editorText.includes('scanner="false"');
        if (btnToggleCyberScanner) {
            btnToggleCyberScanner.innerHTML = isScannerOff
                ? '<i class="fa-solid fa-bolt" style="color:#888;"></i> <span>⚡ Cyber Laser Scanner: OFF</span>'
                : '<i class="fa-solid fa-bolt" style="color:#ff007f;"></i> <span>⚡ Cyber Laser Scanner: ON</span>';
            btnToggleCyberScanner.style.borderColor = isScannerOff ? 'var(--border-color)' : '#ff007f';
            btnToggleCyberScanner.style.background = isScannerOff ? 'transparent' : 'rgba(255, 0, 127, 0.15)';
        }

        // 3. Holographic Backing
        const isBackOff = editorText.includes('back="none"');
        if (btnToggleDualSide) {
            btnToggleDualSide.innerHTML = isBackOff
                ? '<i class="fa-solid fa-clone" style="color:#888;"></i> <span>🪞 Holographic Backing: OFF</span>'
                : '<i class="fa-solid fa-clone" style="color:#ffb703;"></i> <span>🪞 Holographic Backing: ON</span>';
            btnToggleDualSide.style.borderColor = isBackOff ? 'var(--border-color)' : '#ffb703';
            btnToggleDualSide.style.background = isBackOff ? 'transparent' : 'rgba(255, 183, 3, 0.15)';
        }

        // 4. Particle Disintegrate
        const isDisintegrateOn = editorText.includes('disintegrate="true"');
        if (btnToggleDisintegrate) {
            btnToggleDisintegrate.innerHTML = isDisintegrateOn
                ? '<i class="fa-solid fa-atom" style="color:#7928ca;"></i> <span>💥 Particle Disintegrate: ON</span>'
                : '<i class="fa-solid fa-atom" style="color:#888;"></i> <span>💥 Particle Disintegrate: OFF</span>';
            btnToggleDisintegrate.style.borderColor = isDisintegrateOn ? '#7928ca' : 'var(--border-color)';
            btnToggleDisintegrate.style.background = isDisintegrateOn ? 'rgba(121, 40, 202, 0.15)' : 'transparent';
        }

        // 5. Invert Photo Colors
        const isInvertOn = editorText.includes('invert="true"');
        if (btnToggleInvertColors) {
            btnToggleInvertColors.innerHTML = isInvertOn
                ? '<i class="fa-solid fa-circle-half-stroke" style="color:#00f2fe;"></i> <span>🔄 Invert Photo Colors: ON</span>'
                : '<i class="fa-solid fa-circle-half-stroke" style="color:#888;"></i> <span>🔄 Invert Photo Colors: OFF</span>';
            btnToggleInvertColors.style.borderColor = isInvertOn ? '#00f2fe' : 'var(--border-color)';
            btnToggleInvertColors.style.background = isInvertOn ? 'rgba(0, 242, 254, 0.15)' : 'transparent';
        }

        // 6. 3D Hotspot Pin
        const isHotspotOn = editorText.includes('<hotspot-pin');
        if (btnToggleHotspotPin) {
            btnToggleHotspotPin.innerHTML = isHotspotOn
                ? '<i class="fa-solid fa-location-dot" style="color:#00f2fe;"></i> <span>📍 3D Hotspot Pin: ON</span>'
                : '<i class="fa-solid fa-location-dot" style="color:#888;"></i> <span>📍 3D Hotspot Pin: OFF</span>';
            btnToggleHotspotPin.style.borderColor = isHotspotOn ? '#00f2fe' : 'var(--border-color)';
            btnToggleHotspotPin.style.background = isHotspotOn ? 'rgba(0, 242, 254, 0.15)' : 'transparent';
        }

        // 7. Magic Remove Background Cutout
        const isCutoutOn = editorText.includes('cutout="true"');
        const btnMagicRemoveBg = document.getElementById('btn-magic-remove-bg');
        if (btnMagicRemoveBg) {
            btnMagicRemoveBg.innerHTML = isCutoutOn
                ? '<i class="fa-solid fa-wand-magic-sparkles" style="color:#00ffcc;"></i> <span>🪄 Magic Remove Background: ON</span>'
                : '<i class="fa-solid fa-wand-magic-sparkles" style="color:#888;"></i> <span>🪄 Magic Remove Background: OFF</span>';
            btnMagicRemoveBg.style.borderColor = isCutoutOn ? '#00ffcc' : 'var(--border-color)';
            btnMagicRemoveBg.style.background = isCutoutOn ? 'rgba(0, 255, 204, 0.15)' : 'transparent';
        }
    }

    function openPhotoFrameStudioModal() {
        playClickSFX();
        if (!codeEditor.value.includes('<image-3d')) {
            const defaultImageTag = `<image-3d id="image_${Date.now()}" src="https://picsum.photos/400/300" x="0" y="1" z="0" width="3.5" height="2.5" rot-x="0" rot-y="0" rot-z="0" frame="neon" color="#00f2fe" depth="0.4" scanner="true" back="hologram" animate="float"></image-3d>`;
            codeEditor.value += (codeEditor.value.trim() ? '\n\n' : '') + defaultImageTag;
            updateLineNumbers();
            runCode();
        }
        updatePhotoStudioModalButtonUI();
        if (modalPhotoFrame) modalPhotoFrame.classList.add('active');
    }

    if (btnOpenFrameStudio) btnOpenFrameStudio.addEventListener('click', openPhotoFrameStudioModal);
    if (btnQuickFrame) btnQuickFrame.addEventListener('click', openPhotoFrameStudioModal);

    if (btnClosePhotoFrame && modalPhotoFrame) {
        btnClosePhotoFrame.addEventListener('click', () => {
            playClickSFX();
            modalPhotoFrame.classList.remove('active');
        });
    }

    if (btnApplyPhotoFrame && modalPhotoFrame) {
        btnApplyPhotoFrame.addEventListener('click', () => {
            playClickSFX();
            modalPhotoFrame.classList.remove('active');
        });
    }

    // Toggle 3D Depth Relief
    if (btnToggleDepthRelief) {
        btnToggleDepthRelief.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('depth="0"')) {
                editorText = editorText.replace(/depth="0"/gi, 'depth="0.5"');
            } else if (editorText.includes('depth=')) {
                editorText = editorText.replace(/depth="[^"]*"/gi, 'depth="0"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d depth="0.5"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle Cyber Scanner
    if (btnToggleCyberScanner) {
        btnToggleCyberScanner.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('scanner="true"')) {
                editorText = editorText.replace(/scanner="true"/gi, 'scanner="false"');
            } else if (editorText.includes('scanner="false"')) {
                editorText = editorText.replace(/scanner="false"/gi, 'scanner="true"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d scanner="true"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle Dual Side Hologram
    if (btnToggleDualSide) {
        btnToggleDualSide.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('back="hologram"')) {
                editorText = editorText.replace(/back="hologram"/gi, 'back="none"');
            } else if (editorText.includes('back="none"')) {
                editorText = editorText.replace(/back="none"/gi, 'back="hologram"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d back="hologram"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle Particle Disintegration
    if (btnToggleDisintegrate) {
        btnToggleDisintegrate.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('disintegrate="true"')) {
                editorText = editorText.replace(/disintegrate="true"/gi, 'disintegrate="false"');
            } else if (editorText.includes('disintegrate="false"')) {
                editorText = editorText.replace(/disintegrate="false"/gi, 'disintegrate="true"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d disintegrate="true"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle Invert Photo Colors
    if (btnToggleInvertColors) {
        btnToggleInvertColors.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('invert="true"')) {
                editorText = editorText.replace(/invert="true"/gi, 'invert="false"');
            } else if (editorText.includes('invert="false"')) {
                editorText = editorText.replace(/invert="false"/gi, 'invert="true"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d invert="true"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle 3D Hotspot Pin
    if (btnToggleHotspotPin) {
        btnToggleHotspotPin.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('<hotspot-pin')) {
                editorText = editorText.replace(/<hotspot-pin[^>]*>[\s\S]*?<\/hotspot-pin>/gi, '').replace(/<hotspot-pin[^>]*\/>/gi, '').trim();
            } else {
                const pinTag = `<hotspot-pin x="1.5" y="1.5" z="0" title="4K AI Optics" price="$299" text="Quantum 4K camera sensor with 120fps streaming" color="#00f2fe"></hotspot-pin>`;
                editorText = editorText.trim() + (editorText.trim() ? '\n\n' : '') + pinTag;
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Toggle Magic Background Removal Cutout
    const btnMagicRemoveBg = document.getElementById('btn-magic-remove-bg');
    if (btnMagicRemoveBg) {
        btnMagicRemoveBg.addEventListener('click', () => {
            playClickSFX();
            let editorText = codeEditor.value;
            if (editorText.includes('cutout="true"')) {
                editorText = editorText.replace(/cutout="true"/gi, 'cutout="false"');
            } else if (editorText.includes('cutout="false"')) {
                editorText = editorText.replace(/cutout="false"/gi, 'cutout="true"');
            } else {
                editorText = editorText.replace(/<image-3d/gi, '<image-3d cutout="true"');
            }
            codeEditor.value = editorText;
            updateLineNumbers();
            runCode();
            updatePhotoStudioModalButtonUI();
        });
    }

    // Frame Cards Click Handlers
    document.querySelectorAll('.frame-card').forEach(card => {
        card.addEventListener('click', () => {
            playClickSFX();
            const frameStyle = card.getAttribute('data-frame-style');
            
            document.querySelectorAll('.frame-card').forEach(c => c.style.boxShadow = 'none');
            card.style.boxShadow = '0 0 20px var(--accent-cyan)';

            const frameSelect = document.getElementById('select-img-frame');
            if (frameSelect) {
                frameSelect.value = frameStyle;
                updateActiveModelTransform();
            }
        });
    });

    // Modal Live Sliders
    const modalSliderW = document.getElementById('modal-slider-w');
    const modalSliderH = document.getElementById('modal-slider-h');
    const modalSliderRY = document.getElementById('modal-slider-ry');
    const modalColor = document.getElementById('modal-frame-color');

    if (modalSliderW) {
        modalSliderW.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('modal-val-w').textContent = parseFloat(val).toFixed(1);
            document.getElementById('slider-img-width').value = val;
            updateActiveModelTransform();
        });
    }

    if (modalSliderH) {
        modalSliderH.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('modal-val-h').textContent = parseFloat(val).toFixed(1);
            document.getElementById('slider-img-height').value = val;
            updateActiveModelTransform();
        });
    }

    if (modalSliderRY) {
        modalSliderRY.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('modal-val-ry').textContent = `${Math.round(val)}°`;
            document.getElementById('slider-rot-y').value = val;
            updateActiveModelTransform();
        });
    }

    if (modalColor) {
        modalColor.addEventListener('input', (e) => {
            const val = e.target.value;
            document.getElementById('picker-model-color').value = val;
            updateActiveModelTransform();
        });
    }

    // ----------------------------------------------------------------------
    // SOCIAL MEDIA & VIRAL AD PUBLISHER STUDIO ENGINE
    // ----------------------------------------------------------------------
    const btnOpenSocialStudio = document.getElementById('btn-open-social-studio');
    const modalSocialPublisher = document.getElementById('modal-social-publisher');
    const btnCloseSocialPublisher = document.getElementById('btn-close-social-publisher');
    const socialCaptionArea = document.getElementById('social-caption-area');
    const btnRegenSocialCaption = document.getElementById('btn-regen-social-caption');
    const btnCopySocialCaption = document.getElementById('btn-copy-social-caption');
    const recordStatusText = document.getElementById('record-status-text');

    function generateAICaptionAndHashtags() {
        const handle = document.getElementById('social-handle-input') ? document.getElementById('social-handle-input').value.trim() : '@CyberStudio3D';
        const codeText = codeEditor.value;

        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${codeText}</div>`, 'text/html');
        const container = doc.body.firstChild;

        let modelTitle = "Cyber 3D/4D Experience 🚀";
        let mainDescription = "";
        let specificHashtags = ["#3D", "#WebGL", "#HyperStudio3D", "#DigitalArt", "#TechLaunch"];

        const model3DTag = container.querySelector('model-3d');
        const hyperCubeTag = container.querySelector('hyper-cube');
        const text3DTag = container.querySelector('text-3d');
        const image3DTag = container.querySelector('image-3d');
        const ctaTag = container.querySelector('cta-button');
        const constellationTag = container.querySelector('particle-constellation');
        const waveTag = container.querySelector('cyber-wave');
        const explodeTag = container.querySelector('mesh-explode');

        const presetKey = model3DTag ? model3DTag.getAttribute('preset') : null;
        const matType = model3DTag ? model3DTag.getAttribute('material') : (container.querySelector('[material]') ? container.querySelector('[material]').getAttribute('material') : '');
        const shape4D = hyperCubeTag ? hyperCubeTag.getAttribute('shape') : null;
        const customText = text3DTag ? text3DTag.getAttribute('text') : null;
        const ctaText = ctaTag ? ctaTag.getAttribute('text') : null;

        const hooks = [
            "Step into the future of interactive 3D web experience with",
            "Unveiling an extraordinary 3D/4D WebGL masterpiece:",
            "Check out this revolutionary real-time 3D creation:",
            "Next-gen 3D web design brought to life with",
            "Elevate your web project with this stunning 3D/4D interactive visual:"
        ];
        const randomHook = hooks[Math.floor(Math.random() * hooks.length)];

        if (image3DTag) {
            modelTitle = "3D Interactive Photo & Billboard 🖼️";
            mainDescription = `${randomHook} custom imported 3D photo mesh! Featuring full 3D space movement, 360° multi-axis rotation, and dynamic neon cyber framing.`;
            specificHashtags.push('#3DPhoto', '#Photo3D', '#NeonFrame', '#WebGLImage', '#CreativeDesign');
        } else if (presetKey === 'cyber_drone' || (codeText.toLowerCase().includes('preset="cyber_drone"') || (customText && customText.toLowerCase().includes('drone')))) {
            modelTitle = customText ? `${customText} 🛸` : "Cyber Recon Drone X-1 🛸";
            mainDescription = `${randomHook} the Cyber Recon Drone X-1! Powered by a digital Matrix code core, quad-rotor plasma thrusters, and 4D hyperspace physics. Built for immersive 3D web advertising.`;
            specificHashtags.push('#CyberDrone', '#Drone3D', '#MatrixCode', '#Cyberpunk', '#SciFiArt');
        } else if (presetKey === 'space_station' || (codeText.toLowerCase().includes('preset="space_station"') || (customText && customText.toLowerCase().includes('station')))) {
            modelTitle = customText ? `${customText} 🛰️` : "Orbital Space Station 4D 🛰️";
            mainDescription = `${randomHook} Orbital Space Station 4D! Featuring a hyper-dimensional 24-Cell reactor core, spinning neon solar rings, and cosmic starfield atmosphere.`;
            specificHashtags.push('#SpaceStation', '#4DPolytope', '#CosmicArt', '#SpaceTech', '#SciFi3D');
        } else if (presetKey === 'cyber_robot' || (codeText.toLowerCase().includes('preset="cyber_robot"') || (customText && customText.toLowerCase().includes('robot')))) {
            modelTitle = customText ? `${customText} 🤖` : "Cyber Mech Robot V4 🤖";
            mainDescription = `${randomHook} Cyber Mech Robot V4! Engineered with quantum holographic shielding, 4D hypercube AI core, and interactive plasma physics.`;
            specificHashtags.push('#CyberRobot', '#RobotMech', '#QuantumAI', '#Hologram3D', '#MechaArt');
        } else if (presetKey === 'cosmic_starship' || (codeText.toLowerCase().includes('preset="cosmic_starship"') || (customText && customText.toLowerCase().includes('starship')))) {
            modelTitle = customText ? `${customText} 🚀` : "Cosmic Starship 4D 🚀";
            mainDescription = `${randomHook} Cosmic Starship 4D! Navigating deep space with hyper-dimensional 24-Cell geometry, ion propulsion trails, and hyperspace warp particle fields.`;
            specificHashtags.push('#CosmicStarship', '#Starship4D', '#SpaceTravel', '#HyperSpace', '#WebGL3D');
        } else if (presetKey === 'alien_avatar' || (codeText.toLowerCase().includes('preset="alien_avatar"') || (customText && customText.toLowerCase().includes('alien')))) {
            modelTitle = customText ? `${customText} 👽` : "Extraterrestrial Alien 4D 👽";
            mainDescription = `${randomHook} Extraterrestrial Alien 4D! Designed with a 4D Tesseract neural core, holographic aura, and quantum particle atmosphere.`;
            specificHashtags.push('#Alien4D', '#AlienArt', '#Tesseract', '#QuantumArt', '#SciFiDesign');
        } else if (presetKey === 'cyber_car' || (codeText.toLowerCase().includes('preset="cyber_car"') || (customText && customText.toLowerCase().includes('car')))) {
            modelTitle = customText ? `${customText} 🏎️` : "Neon Cyber Car 3D 🏎️";
            mainDescription = `${randomHook} Neon Cyber Car 3D! Hit the futuristic digital highway with aerodynamic neon chassis geometry, plasma speed particles, and interactive WebGL controls.`;
            specificHashtags.push('#CyberCar', '#NeonRider', '#Supercar3D', '#Automotive3D', '#CyberpunkCar');
        } else if (presetKey === 'pirate_ship' || (codeText.toLowerCase().includes('preset="pirate_ship"') || (customText && customText.toLowerCase().includes('ship')))) {
            modelTitle = customText ? `${customText} ⛵` : "Cosmic Pirate Ship 3D ⛵";
            mainDescription = `${randomHook} Cosmic Pirate Ship 3D! Sail through the digital space ocean featuring crystal glass hull geometry, laser sails, and cyber wave particle mesh.`;
            specificHashtags.push('#PirateShip', '#SpacePirate', '#CyberWave', '#Glassmorphism', '#DigitalOcean');
        } else if (presetKey === 'saturn_galaxy' || (codeText.toLowerCase().includes('preset="saturn_galaxy"') || (customText && customText.toLowerCase().includes('saturn')))) {
            modelTitle = customText ? `${customText} 🪐` : "Saturn Galaxy Ring 4D 🪐";
            mainDescription = `${randomHook} Saturn Galaxy Ring 4D! Surrounded by a majestic 16-Cell 4D polytope halo and thousands of glowing orbital star particles.`;
            specificHashtags.push('#Saturn4D', '#GalaxyRings', '#Astronomy3D', '#SpaceVisuals', '#Polytope4D');
        } else if (presetKey === 'crystal_tower' || (codeText.toLowerCase().includes('preset="crystal_tower"') || (customText && customText.toLowerCase().includes('crystal')))) {
            modelTitle = customText ? `${customText} 💎` : "Crystal Energy Tower 3D 💎";
            mainDescription = `${randomHook} Crystal Energy Tower 3D! Featuring multi-faceted hexagonal crystal spires, an apex energy plasma orb, and refractive glass materials.`;
            specificHashtags.push('#CrystalTower', '#Crystal3D', '#GlassShader', '#SciFiArchitecture', '#3DArt');
        } else if (presetKey === 'mech_warrior' || (codeText.toLowerCase().includes('preset="mech_warrior"') || (customText && (customText.toLowerCase().includes('warrior') || customText.toLowerCase().includes('titan'))))) {
            modelTitle = customText ? `${customText} 🦾` : "Mech Warrior Titan 3D 🦾";
            mainDescription = `${randomHook} Mech Warrior Titan 3D! Engineered with heavy armored plating, plasma reactor chest core, shoulder pauldrons, and heavy energy cannons.`;
            specificHashtags.push('#MechWarrior', '#TitanRobot', '#MechaArt', '#SciFiMech', '#CyberArmor');
        } else if (presetKey === 'space_fighter' || (codeText.toLowerCase().includes('preset="space_fighter"') || (customText && (customText.toLowerCase().includes('fighter') || customText.toLowerCase().includes('delta'))))) {
            modelTitle = customText ? `${customText} 🚀` : "Delta Space Fighter 3D 🚀";
            mainDescription = `${randomHook} Delta Space Fighter 3D! Featuring high-speed swept delta wings, dual glowing ion thrust engines, wingtip laser cannons, and aerodynamic fuselage geometry.`;
            specificHashtags.push('#SpaceFighter', '#DeltaWing', '#Starfighter', '#SciFiSpaceship', '#WebGL3D');
        } else if (shape4D || codeText.includes('<hyper-cube')) {
            const shapeName = shape4D ? (shape4D === '24cell' ? '24-Cell 4D' : shape4D.toUpperCase() + ' 4D') : 'Hypercube 4D';
            modelTitle = customText ? `${customText} ✨` : `Hyper-Dimensional ${shapeName} ✨`;
            mainDescription = `${randomHook} ${shapeName}! Experience real-time 4D perspective rotation across hyper-dimensional spatial axes with glass refraction shaders.`;
            specificHashtags.push('#4DGeometry', '#Tesseract', '#MathArt', '#Polytope', '#Hypercube');
        } else if (customText) {
            modelTitle = `3D Neon Brand: "${customText}" ✨`;
            mainDescription = `${randomHook} custom 3D typography logo "${customText}"! Sculpted with ${matType || 'neon'} shader texturing, orbital plasma rings, and particle halos.`;
            specificHashtags.push('#3DLogo', '#Typography3D', '#BrandDesign', '#NeonLogo', '#LogoSculptor');
        } else if (presetKey && presetKey.startsWith('imported_')) {
            modelTitle = "Custom 3D OBJ Model Showcase 📦";
            mainDescription = `${randomHook} custom imported 3D OBJ model asset! Rendered live in WebGL with interactive 3D orbit controls and custom neon materials.`;
            specificHashtags.push('#3DModel', '#OBJImport', '#3DAsset', '#Interactive3D', '#Web3D');
        } else {
            modelTitle = "HyperStudio 3D/4D Creation 🌟";
            mainDescription = `${randomHook} interactive 3D WebGL model built with HyperStudio 3D/4D! Fully responsive, customizable, and ready for modern web apps.`;
            specificHashtags.push('#HyperStudio3D', '#WebDesign', '#Interactive3D', '#WebFX', '#CreativeTech');
        }

        let extraFXDetails = [];
        if (constellationTag) extraFXDetails.push("3D particle constellation network");
        if (waveTag) extraFXDetails.push("undulating cyber wave terrain");
        if (explodeTag) extraFXDetails.push("interactive particle explosion physics");
        if (matType === 'matrix') extraFXDetails.push("Matrix code digital rain shader");
        if (matType === 'plasma') extraFXDetails.push("high-energy plasma glow shader");
        if (matType === 'hologram') extraFXDetails.push("quantum hologram grid shader");

        if (extraFXDetails.length > 0) {
            mainDescription += ` Enhanced with ${extraFXDetails.join(', ')}.`;
        }

        if (ctaText) {
            mainDescription += ` Interactive Call-to-Action: "${ctaText}".`;
        }

        specificHashtags.push('#ViralReels', '#Innovation', handle);

        const hashtagStr = "\n\n" + Array.from(new Set(specificHashtags)).join(' ');
        return `🚀 ${modelTitle}\n\n${mainDescription}${hashtagStr}`;
    }

    // 🎬 Social Media Publisher Hook
    const btnSocialRecTrigger = document.getElementById('btn-social-record-clip');
    if (btnSocialRecTrigger) {
        btnSocialRecTrigger.addEventListener('click', () => {
            if (typeof toggleVideoRecording === 'function') toggleVideoRecording();
        });
    }

    if (btnOpenSocialStudio && modalSocialPublisher) {
        btnOpenSocialStudio.addEventListener('click', () => {
            playClickSFX();
            if (socialCaptionArea) socialCaptionArea.value = generateAICaptionAndHashtags();
            modalSocialPublisher.classList.add('active');
        });
    }

    if (btnCloseSocialPublisher && modalSocialPublisher) {
        btnCloseSocialPublisher.addEventListener('click', () => {
            playClickSFX();
            modalSocialPublisher.classList.remove('active');
        });
    }

    if (btnRegenSocialCaption && socialCaptionArea) {
        btnRegenSocialCaption.addEventListener('click', () => {
            playClickSFX();
            socialCaptionArea.value = generateAICaptionAndHashtags();
        });
    }

    if (btnCopySocialCaption && socialCaptionArea) {
        btnCopySocialCaption.addEventListener('click', () => {
            playClickSFX();
            socialCaptionArea.select();
            document.execCommand('copy');
            alert("Caption and viral hashtags copied to clipboard! 📋");
        });
    }

    // 📲 1-Click Social Media Publisher Share Intent Handlers
    const shareSocialIntent = (platform) => {
        playClickSFX();
        const caption = socialCaptionArea ? encodeURIComponent(socialCaptionArea.value) : '';
        const url = encodeURIComponent('https://hyperstudio3d.app');

        if (platform === 'tiktok') {
            window.open('https://www.tiktok.com/upload', '_blank');
        } else if (platform === 'instagram') {
            window.open('https://www.instagram.com/create/select/', '_blank');
        } else if (platform === 'youtube') {
            window.open('https://studio.youtube.com', '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${caption}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        } else if (platform === 'pinterest') {
            window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${caption}`, '_blank');
        } else if (platform === 'telegram') {
            window.open(`https://t.me/share/url?url=${url}&text=${caption}`, '_blank');
        }
    };

    ['tiktok', 'instagram', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest', 'telegram'].forEach(p => {
        const btn = document.getElementById(`share-${p}`);
        if (btn) {
            btn.addEventListener('click', () => shareSocialIntent(p));
        }
    });

    function toggle4DMorphing() {
        playClickSFX();
        is4DMorphing = !is4DMorphing;
        
        ['btn-morph-4d', 'btn-morph-hdr'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.toggle('active', is4DMorphing);
        });

        if (is4DMorphing) {
            if (!codeEditor.value.includes('<hyper-cube')) {
                const morphTag = `\n\n<!-- 🌀 4D HYPERCUBE MORPHING CORE -->\n<hyper-cube shape="24cell" size="2.4" color="#00f2fe" rot-xw="0.03" rot-yw="0.02" material="neon"></hyper-cube>`;
                codeEditor.value += morphTag;
                updateLineNumbers();
                runCode();
            }
        }
    }

    const btnMorph4D = document.getElementById('btn-morph-4d');
    if (btnMorph4D) btnMorph4D.addEventListener('click', toggle4DMorphing);

    const btnMorphHdr = document.getElementById('btn-morph-hdr');
    if (btnMorphHdr) btnMorphHdr.addEventListener('click', toggle4DMorphing);

    function generateAI3DCodeFromPrompt(promptStr) {
        const p = promptStr.toLowerCase();
        let generatedTags = [];
        let comments = `<!-- AI GENERATED 3D/4D MODEL FOR: "${promptStr}" -->\n`;

        let primaryColor = "#00f2fe";
        let secondaryColor = "#ff007f";
        let accentColor = "#00ffcc";

        if (p.includes('roz') || p.includes('pink') || p.includes('rose') || p.includes('magenta')) {
            primaryColor = "#ff007f"; secondaryColor = "#7928ca";
        } else if (p.includes('verde') || p.includes('green') || p.includes('vert')) {
            primaryColor = "#00ffcc"; secondaryColor = "#00f2fe";
        } else if (p.includes('galben') || p.includes('gold') || p.includes('yellow') || p.includes('or')) {
            primaryColor = "#ffb703"; secondaryColor = "#ff007f";
        } else if (p.includes('violet') || p.includes('purple') || p.includes('pourpre')) {
            primaryColor = "#7928ca"; secondaryColor = "#00f2fe";
        }

        let mainMaterial = "glass";
        if (p.includes('hologram') || p.includes('quantum')) mainMaterial = "hologram";
        else if (p.includes('neon') || p.includes('glowing')) mainMaterial = "neon";
        else if (p.includes('metal') || p.includes('chrome')) mainMaterial = "metal";

        if (p.includes('liquid') || p.includes('mercur') || p.includes('metal')) {
            generatedTags.push(`<liquid-metal radius="1.6" color="${primaryColor}" speed="0.04" ripple="0.3" x="0" y="1" z="0"></liquid-metal>
<text-3d text="LIQUID METAL" x="0" y="2.8" z="0" scale="0.9" color="${primaryColor}" material="neon" animate="float"></text-3d>`);
        } else if (p.includes('forcefield') || p.includes('shield') || p.includes('scut')) {
            generatedTags.push(`<forcefield radius="2.4" color="${accentColor}" pulse="0.03" x="0" y="1" z="0"></forcefield>
<text-3d text="FORCEFIELD SHIELD" x="0" y="3.0" z="0" scale="0.9" color="${accentColor}" material="neon" animate="float"></text-3d>`);
        } else if (p.includes('dna') || p.includes('helix') || p.includes('gene')) {
            generatedTags.push(`<dna-helix radius="1.2" height="4.5" color1="${primaryColor}" color2="${secondaryColor}" speed="0.02" x="0" y="1" z="0"></dna-helix>
<text-3d text="DNA HYPER-HELIX" x="0" y="3.4" z="0" scale="0.9" color="${secondaryColor}" material="neon" animate="float"></text-3d>`);
        } else if (p.includes('spatial') || p.includes('audio') || p.includes('sound') || p.includes('acoust')) {
            generatedTags.push(`<spatial-audio radius="2.2" color="#ffb703" speed="0.04" x="0" y="1" z="0"></spatial-audio>
<text-3d text="3D SPATIAL AUDIO" x="0" y="2.8" z="0" scale="0.9" color="#ffb703" material="neon" animate="float"></text-3d>`);
        } else if (p.includes('drone') || p.includes('drona') || p.includes('recon')) {
            generatedTags.push(`<model-3d preset="cyber_drone" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="${mainMaterial}" animate="spin-y"></model-3d>`);
        } else if (p.includes('warrior') || p.includes('titan') || p.includes('guerrier') || p.includes('mech warrior')) {
            generatedTags.push(`<model-3d preset="mech_warrior" x="0" y="0.5" z="0" scale="1.2" color="${primaryColor}" material="neon" animate="spin-y"></model-3d>`);
        } else if (p.includes('robot') || p.includes('mech') || p.includes('android')) {
            generatedTags.push(`<model-3d preset="cyber_robot" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="neon" animate="spin-y"></model-3d>`);
        } else if (p.includes('fighter') || p.includes('chasseur') || p.includes('delta')) {
            generatedTags.push(`<model-3d preset="space_fighter" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="neon" animate="spin-y"></model-3d>`);
        } else if (p.includes('starship') || p.includes('vaisseau') || p.includes('spaceship')) {
            generatedTags.push(`<model-3d preset="cosmic_starship" x="0" y="0.5" z="0" scale="1.4" color="${primaryColor}" material="${mainMaterial}" animate="spin-y"></model-3d>
<hyper-cube shape="24cell" size="2.2" color="${secondaryColor}" rot-xw="0.03" rot-yw="0.02" material="neon"></hyper-cube>`);
        } else if (p.includes('alien') || p.includes('extraterrestre')) {
            generatedTags.push(`<model-3d preset="alien_avatar" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="${mainMaterial}" animate="spin-y"></model-3d>
<hyper-cube shape="tesseract" size="2.0" color="${secondaryColor}" rot-xw="0.04" material="wire-glow"></hyper-cube>`);
        } else if (p.includes('crystal') || p.includes('cristal') || p.includes('tower') || p.includes('turn')) {
            generatedTags.push(`<model-3d preset="crystal_tower" x="0" y="0.5" z="0" scale="1.2" color="${primaryColor}" material="glass" animate="spin-y"></model-3d>`);
        } else if (p.includes('car') || p.includes('voiture') || p.includes('auto')) {
            generatedTags.push(`<model-3d preset="cyber_car" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="neon" animate="spin-y"></model-3d>`);
        } else if (p.includes('ship') || p.includes('navire') || p.includes('pirate')) {
            generatedTags.push(`<model-3d preset="pirate_ship" x="0" y="0.5" z="0" scale="1.3" color="${primaryColor}" material="glass" animate="spin-y"></model-3d>`);
        } else {
            generatedTags.push(`<hyper-cube shape="tesseract" size="2.2" color="${primaryColor}" rot-xw="0.025" material="glass"></hyper-cube>`);
        }

        generatedTags.push(`<cta-button text="DISCOVER 🚀" url="https://example.com" x="0" y="-1.8" z="0" color="${accentColor}"></cta-button>`);
        generatedTags.push(`<particles count="3000" color="${accentColor}" speed="0.01"></particles>`);
        generatedTags.push(`<light-point x="5" y="5" z="5" color="${primaryColor}" intensity="2.0"></light-point>`);

        return comments + generatedTags.join('\n\n');
    }

    function handleAIGenerate() {
        const input = document.getElementById('ai-prompt-input');
        const promptStr = input.value.trim();
        if (!promptStr) return;

        playRunSFX();
        const generatedCode = generateAI3DCodeFromPrompt(promptStr);
        codeEditor.value = generatedCode;
        updateLineNumbers();
        runCode();
    }

    document.getElementById('btn-ai-generate').addEventListener('click', handleAIGenerate);

    document.getElementById('ai-prompt-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAIGenerate();
        }
    });

    document.querySelectorAll('.ai-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            playClickSFX();
            const promptText = chip.getAttribute('data-prompt');
            document.getElementById('ai-prompt-input').value = promptText;
            handleAIGenerate();
        });
    });

    document.getElementById('btn-import-3d').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('file-import-3d').click();
    });

    document.getElementById('file-import-3d').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const contents = evt.target.result;
                const modelKey = 'imported_' + Date.now();

                importedOBJDataStore[modelKey] = contents;

                if (typeof THREE.OBJLoader !== 'undefined') {
                    const loader = new THREE.OBJLoader();
                    const obj = loader.parse(contents);

                    const box = new THREE.Box3().setFromObject(obj);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);

                    if (maxDim > 0) {
                        const normScale = 2.5 / maxDim;
                        obj.scale.set(normScale, normScale, normScale);
                    }
                    obj.position.sub(center);

                    importedModelRegistry[modelKey] = obj;

                    const hasExistingModels = codeEditor.value.trim().length > 0;
                    const offsetX = hasExistingModels ? 2.8 : 0;

                    const newTag = `<model-3d preset="${modelKey}" x="${offsetX}" y="0" z="0" scale="1.0" color="#00f2fe" material="neon" animate="spin-y"></model-3d>`;
                    
                    if (!hasExistingModels) {
                        codeEditor.value = newTag;
                    } else {
                        codeEditor.value += '\n\n' + newTag;
                    }

                    activePresetKey = modelKey;
                    updateLineNumbers();
                    runCode();
                } else {
                    alert('3D OBJ Loader is initializing. Please try again.');
                }
            } catch(err) {
                console.error("Error parsing OBJ file:", err);
                alert("Error loading 3D OBJ file: " + err.message);
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    });

    const btnOpenAdStudio = document.getElementById('btn-open-ad-studio');
    const modalAdStudio = document.getElementById('modal-ad-studio');
    const btnCloseAdStudio = document.getElementById('btn-close-ad-studio');
    const btnGenerateAd = document.getElementById('btn-generate-ad');

    if (btnOpenAdStudio && modalAdStudio) {
        btnOpenAdStudio.addEventListener('click', () => {
            playClickSFX();
            modalAdStudio.classList.add('active');
        });
    }

    if (btnCloseAdStudio && modalAdStudio) {
        btnCloseAdStudio.addEventListener('click', () => {
            playClickSFX();
            modalAdStudio.classList.remove('active');
        });
    }

    if (btnGenerateAd) {
        btnGenerateAd.addEventListener('click', () => {
            playClickSFX();
            const adType = document.getElementById('ad-type-select').value;
            const title = document.getElementById('ad-title-input').value.trim() || 'CYBER PROD';
            const subtitle = document.getElementById('ad-subtitle-input').value.trim() || 'NEXT-GEN AI';
            const price = document.getElementById('ad-price-input').value.trim();
            const timer = document.getElementById('ad-timer-input').value.trim();
            const trust = document.getElementById('ad-trust-input').value.trim();
            const aspect = document.getElementById('ad-aspect-select').value;
            const ctaText = document.getElementById('ad-cta-text-input').value.trim() || 'BUY NOW 🛒';
            const ctaUrl = document.getElementById('ad-cta-url-input').value.trim() || 'https://example.com';
            const color = document.getElementById('ad-color-picker').value;

            const viewportSelect = document.getElementById('viewport-mode-select');
            if (viewportSelect) {
                viewportSelect.value = aspect;
                viewportSelect.dispatchEvent(new Event('change'));
            }

            let adCode = `<!-- 📣 4D INTERACTIVE AD CAMPAIGN PRO: "${title}" -->\n`;

            if (trust) {
                adCode += `<text-3d text="${trust}" x="0" y="2.4" z="0" scale="0.5" color="#ffb703" material="neon"></text-3d>\n\n`;
            }

            if (adType === 'ecommerce') {
                adCode += `<model-3d preset="cyber_drone" x="0" y="0.8" z="0" scale="1.4" color="${color}" material="matrix" animate="spin-y"></model-3d>\n\n`;
                adCode += `<hyper-cube shape="tesseract" size="2.4" color="#00ffcc" rot-xw="0.025" material="wire-glow"></hyper-cube>\n\n`;
                adCode += `<text-3d text="${title}" x="0" y="1.8" z="0" scale="0.9" color="${color}" material="neon"></text-3d>\n\n`;
                if (price) adCode += `<text-3d text="${price}" x="0" y="-0.6" z="0" scale="0.75" color="#ff007f" material="neon" animate="float"></text-3d>\n\n`;
                if (timer) adCode += `<text-3d text="${timer}" x="0" y="-1.3" z="0" scale="0.55" color="#ff4d6d" material="neon"></text-3d>\n\n`;
                adCode += `<cta-button text="${ctaText}" url="${ctaUrl}" x="0" y="-2.1" z="0" color="${color}"></cta-button>\n\n`;
                adCode += `<particles count="3000" color="${color}" speed="0.012"></particles>`;
            } else if (adType === 'saas') {
                adCode += `<hyper-cube shape="24cell" size="2.6" color="${color}" rot-xw="0.03" rot-yw="0.02" material="neon"></hyper-cube>\n\n`;
                adCode += `<text-3d text="${title}" x="0" y="1.2" z="0" scale="1.1" color="${color}" material="neon" animate="float"></text-3d>\n\n`;
                adCode += `<text-3d text="${subtitle}" x="0" y="-0.4" z="0" scale="0.6" color="#00ffcc" material="hologram"></text-3d>\n\n`;
                if (timer) adCode += `<text-3d text="${timer}" x="0" y="-1.2" z="0" scale="0.55" color="#ff007f" material="neon"></text-3d>\n\n`;
                adCode += `<cta-button text="${ctaText}" url="${ctaUrl}" x="0" y="-2.0" z="0" color="${color}"></cta-button>\n\n`;
                adCode += `<particles count="4000" color="${color}" speed="0.015"></particles>`;
            } else if (adType === 'crypto') {
                adCode += `<hyper-cube shape="16cell" size="2.4" color="${color}" rot-xw="0.04" material="plasma"></hyper-cube>\n\n`;
                adCode += `<mesh-torus radius="2.8" tube="0.08" color="#ff007f" material="neon" animate="spin-x"></mesh-torus>\n\n`;
                adCode += `<text-3d text="${title}" x="0" y="1.0" z="0" scale="1.1" color="${color}" material="neon"></text-3d>\n\n`;
                if (price) adCode += `<text-3d text="${price}" x="0" y="-0.5" z="0" scale="0.7" color="#00ffcc" material="neon" animate="float"></text-3d>\n\n`;
                if (timer) adCode += `<text-3d text="${timer}" x="0" y="-1.2" z="0" scale="0.55" color="#ff007f" material="neon"></text-3d>\n\n`;
                adCode += `<cta-button text="${ctaText}" url="${ctaUrl}" x="0" y="-2.1" z="0" color="#ff007f"></cta-button>\n\n`;
                adCode += `<particles count="3500" color="${color}" speed="0.02"></particles>`;
            } else if (adType === 'auto') {
                adCode += `<mesh-box width="3.4" height="0.8" depth="1.6" color="${color}" material="neon"></mesh-box>\n\n`;
                adCode += `<mesh-torus radius="3.2" tube="0.05" color="#00ffcc" material="wire-glow" animate="spin-y"></mesh-torus>\n\n`;
                adCode += `<text-3d text="${title}" x="0" y="1.3" z="0" scale="1.0" color="${color}" material="neon" animate="float"></text-3d>\n\n`;
                adCode += `<text-3d text="${subtitle}" x="0" y="-0.5" z="0" scale="0.6" color="#ff007f" material="neon"></text-3d>\n\n`;
                if (timer) adCode += `<text-3d text="${timer}" x="0" y="-1.2" z="0" scale="0.55" color="#00ffcc" material="neon"></text-3d>\n\n`;
                adCode += `<cta-button text="${ctaText}" url="${ctaUrl}" x="0" y="-2.1" z="0" color="${color}"></cta-button>\n\n`;
                adCode += `<particles count="3000" color="${color}" speed="0.015"></particles>`;
            }

            adCode += `\n\n<light-point x="0" y="4" z="5" color="${color}" intensity="2.5"></light-point>`;

            codeEditor.value = adCode;
            updateLineNumbers();
            runCode();
            modalAdStudio.classList.remove('active');
        });
    }

    document.getElementById('btn-open-sculptor').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-sculptor').classList.add('active');
    });

    document.getElementById('btn-close-sculptor').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-sculptor').classList.remove('active');
    });

    document.getElementById('btn-insert-sculpted').addEventListener('click', () => {
        playClickSFX();
        const type = document.getElementById('sculptor-mesh-type').value;
        const r = document.getElementById('slider-sculpt-r').value;
        const tube = document.getElementById('slider-sculpt-tube').value;
        const p = document.getElementById('slider-sculpt-p').value;
        const q = document.getElementById('slider-sculpt-q').value;

        let tag = '';
        if (type === 'torus_knot') {
            tag = `<mesh-torus radius="${r}" tube="${tube}" p="${p}" q="${q}" color="#00f2fe" material="wire-glow" animate="spin"></mesh-torus>`;
        } else if (type === 'sphere') {
            tag = `<mesh-sphere radius="${r}" color="#ff007f" material="plasma" animate="pulse"></mesh-sphere>`;
        } else {
            tag = `<mesh-cylinder radius="${r}" height="3.0" color="#00ffcc" material="glass"></mesh-cylinder>`;
        }

        codeEditor.value += '\n\n' + tag;
        updateLineNumbers();
        runCode();
        document.getElementById('modal-sculptor').classList.remove('active');
    });

    document.getElementById('btn-open-logo').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-logo-sculptor').classList.add('active');
    });

    document.getElementById('btn-close-logo-sculptor').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-logo-sculptor').classList.remove('active');
    });

    document.getElementById('btn-insert-logo').addEventListener('click', () => {
        playClickSFX();
        const brandText = document.getElementById('logo-text-input').value.trim() || 'HYPER 3D';
        const subtext = document.getElementById('logo-subtext-input').value.trim();
        const ringType = document.getElementById('logo-ring-select').value;
        const mat = document.getElementById('logo-material-select').value;
        const particleType = document.getElementById('logo-particles-select').value;
        const mainColor = document.getElementById('logo-color-picker').value;
        const ringColor = document.getElementById('logo-ring-color-picker').value;

        let logoCode = `<!-- ✍️ UNIQUE 3D NEON BRAND LOGO: "${brandText}" -->\n`;
        logoCode += `<text-3d text="${brandText}" x="0" y="0.8" z="0" scale="1.0" color="${mainColor}" material="${mat}" animate="float"></text-3d>\n\n`;

        if (subtext) {
            logoCode += `<text-3d text="${subtext}" x="0" y="-0.8" z="0" scale="0.7" color="${ringColor}" material="neon" animate="float"></text-3d>\n\n`;
        }

        if (ringType === 'dual_rings') {
            logoCode += `<mesh-torus radius="2.8" tube="0.06" color="${ringColor}" material="wire-glow" animate="spin-x"></mesh-torus>\n`;
            logoCode += `<mesh-torus radius="3.2" tube="0.05" color="${mainColor}" material="neon" animate="spin-y"></mesh-torus>\n\n`;
        } else if (ringType === 'torus_knot') {
            logoCode += `<mesh-torus radius="2.6" tube="0.12" p="2" q="3" color="${ringColor}" material="plasma" animate="spin"></mesh-torus>\n\n`;
        } else if (ringType === 'hyper_core') {
            logoCode += `<hyper-cube shape="24cell" size="2.5" color="${ringColor}" rot-xw="0.03" rot-yw="0.02" material="neon"></hyper-cube>\n\n`;
        } else if (ringType === 'shield_box') {
            logoCode += `<mesh-box width="5.0" height="2.2" depth="0.1" color="${ringColor}" material="glass"></mesh-box>\n\n`;
        }

        if (particleType === 'starfield') {
            logoCode += `<particles count="3000" color="${mainColor}" speed="0.012"></particles>\n\n`;
        } else if (particleType === 'laser_dust') {
            logoCode += `<particles count="2000" color="${ringColor}" speed="0.02"></particles>\n\n`;
        } else if (particleType === 'pulsar') {
            logoCode += `<particles count="#ff007f" speed="0.015"></particles>\n\n`;
        }

        logoCode += `<light-point x="0" y="4" z="5" color="${mainColor}" intensity="2.5"></light-point>`;

        codeEditor.value = logoCode;
        updateLineNumbers();
        runCode();
        document.getElementById('modal-logo-sculptor').classList.remove('active');
    });

    document.getElementById('btn-toggle-inspector').addEventListener('click', (e) => {
        playClickSFX();
        const btn = e.currentTarget;
        btn.classList.toggle('active');
        document.getElementById('panel-transform-inspector').classList.toggle('hidden', !btn.classList.contains('active'));
    });

    document.getElementById('btn-close-inspector').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('panel-transform-inspector').classList.add('hidden');
        document.getElementById('btn-toggle-inspector').classList.remove('active');
    });

    document.getElementById('btn-shader-studio').addEventListener('click', (e) => {
        playClickSFX();
        const btn = e.currentTarget;
        btn.classList.toggle('active');
        document.getElementById('panel-shader-studio').classList.toggle('hidden', !btn.classList.contains('active'));
    });

    document.getElementById('btn-close-shader').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('panel-shader-studio').classList.add('hidden');
        document.getElementById('btn-shader-studio').classList.remove('active');
    });

    document.getElementById('select-gradient-preset').addEventListener('change', (e) => {
        playClickSFX();
        const mode = e.target.value;
        let colorHex = '#00f2fe';
        if (mode === 'flame') colorHex = '#ff007f';
        else if (mode === 'emerald') colorHex = '#00ffcc';
        else if (mode === 'solar') colorHex = '#ffb703';

        customObjects.forEach(obj => {
            obj.traverse(child => {
                if (child.isMesh && child.material) {
                    child.material.color = new THREE.Color(colorHex);
                    if (child.material.emissive) child.material.emissive = new THREE.Color(colorHex);
                }
            });
        });
    });

    document.getElementById('slider-light-power').addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (mainDirLight) mainDirLight.intensity = val;
        document.getElementById('val-light-power').textContent = val.toFixed(1);
    });

    document.getElementById('slider-ambient-glow').addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (mainAmbientLight) mainAmbientLight.intensity = val;
        document.getElementById('val-ambient-glow').textContent = val.toFixed(1);
    });

    document.getElementById('btn-toggle-sfx').addEventListener('click', (e) => {
        isSFXEnabled = !isSFXEnabled;
        const btn = e.currentTarget;
        btn.classList.toggle('active', isSFXEnabled);
        document.getElementById('sfx-text').textContent = isSFXEnabled ? 'SFX ON' : 'SFX OFF';
        if (isSFXEnabled) playClickSFX();
    });

    document.getElementById('btn-toggle-bloom').addEventListener('click', (e) => {
        playClickSFX();
        isBloomEnabled = !isBloomEnabled;
        e.currentTarget.classList.toggle('active', isBloomEnabled);
        const canvas = document.getElementById('webgl-canvas');
        canvas.style.filter = isBloomEnabled 
            ? 'drop-shadow(0 0 25px #00f2fe) drop-shadow(0 0 45px #7928ca)' 
            : 'none';
    });

    document.getElementById('btn-cinematic-cam').addEventListener('click', (e) => {
        playClickSFX();
        isCinematicCamEnabled = !isCinematicCamEnabled;
        e.currentTarget.classList.toggle('active', isCinematicCamEnabled);
        if (!isCinematicCamEnabled) {
            camera.position.set(0, 3, 7);
            controls.reset();
        }
    });

    document.getElementById('btn-mouse-parallax').addEventListener('click', (e) => {
        playClickSFX();
        isMouseParallaxEnabled = !isMouseParallaxEnabled;
        e.currentTarget.classList.toggle('active', isMouseParallaxEnabled);
        if (!isMouseParallaxEnabled) {
            scene.rotation.set(0, 0, 0);
        }
    });

    function updateSceneEnvironmentBackground(mode) {
        const stage = document.getElementById('viewport-canvas-stage');
        const canvas = document.getElementById('webgl-canvas');

        if (mode === 'cyber') {
            scene.background = new THREE.Color(0x0a0c14);
            scene.fog = new THREE.FogExp2(0x0a0c14, 0.02);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0xffffff);
            if (stage) stage.style.background = '#0a0c14';
        } else if (mode === 'city') {
            scene.background = new THREE.Color(0x12002b);
            scene.fog = new THREE.FogExp2(0x1a003b, 0.04);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0x00f2fe);
            if (stage) stage.style.background = 'radial-gradient(circle at center, #1b003a 0%, #080012 100%)';
        } else if (mode === 'nebula') {
            scene.background = new THREE.Color(0x26001b);
            scene.fog = new THREE.FogExp2(0x2e0024, 0.045);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0xff007f);
            if (stage) stage.style.background = 'radial-gradient(circle at center, #38002b 0%, #0d000a 100%)';
        } else if (mode === 'sunset') {
            scene.background = new THREE.Color(0x2d0816);
            scene.fog = new THREE.FogExp2(0x2d0816, 0.035);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0xffb703);
            if (stage) stage.style.background = 'linear-gradient(to bottom, #10001a 0%, #3d0520 60%, #ff5e00 100%)';
        } else if (mode === 'warp') {
            scene.background = new THREE.Color(0x001524);
            scene.fog = new THREE.FogExp2(0x001d3d, 0.05);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0x00ffcc);
            if (stage) stage.style.background = 'radial-gradient(circle at center, #002b4d 0%, #000814 100%)';
        } else if (mode === 'space') {
            scene.background = new THREE.Color(0x020208);
            scene.fog = null;
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0xffffff);
            if (stage) stage.style.background = '#020208';
        } else if (mode === 'studio') {
            scene.background = new THREE.Color(0x2c303e);
            scene.fog = new THREE.FogExp2(0x2c303e, 0.02);
            if (mainAmbientLight) mainAmbientLight.color = new THREE.Color(0xffffff);
            if (stage) stage.style.background = '#2c303e';
        } else if (mode === 'transparent') {
            scene.background = null;
            scene.fog = null;
            if (stage) stage.style.background = 'transparent';
        }
    }

    document.getElementById('env-bg-select').addEventListener('change', (e) => {
        playClickSFX();
        updateSceneEnvironmentBackground(e.target.value);
    });

    document.getElementById('viewport-mode-select').addEventListener('change', (e) => {
        playClickSFX();
        const mode = e.target.value;
        const container = document.getElementById('canvas-container');
        container.classList.remove('mode-hero', 'mode-mobile');
        if (mode === 'hero') container.classList.add('mode-hero');
        else if (mode === 'mobile') container.classList.add('mode-mobile');
        
        let count = 0;
        const interval = setInterval(() => {
            if (window.onViewportResize) window.onViewportResize();
            count++;
            if (count > 20) clearInterval(interval);
        }, 20);
    });

    document.getElementById('inspector-model-select').addEventListener('change', (e) => {
        playClickSFX();
        setActiveModelPreset(e.target.value);
    });

    const updateActiveModelTransform = () => {
        if (!activePresetKey) return;

        const rotSpeed = document.getElementById('slider-rot-speed').value;
        const px = document.getElementById('slider-pos-x').value;
        const py = document.getElementById('slider-pos-y').value;
        const pz = document.getElementById('slider-pos-z').value;

        const rx = document.getElementById('slider-rot-x').value;
        const ry = document.getElementById('slider-rot-y').value;
        const rz = document.getElementById('slider-rot-z').value;

        const imgWidth = document.getElementById('slider-img-width').value;
        const imgHeight = document.getElementById('slider-img-height').value;
        const sc = document.getElementById('slider-scale').value;
        const color = document.getElementById('picker-model-color').value;
        const frameStyle = document.getElementById('select-img-frame').value;
        const matValue = document.getElementById('select-inspector-material') ? document.getElementById('select-inspector-material').value : 'neon';
        const dismantleVal = document.getElementById('slider-inspector-dismantle') ? document.getElementById('slider-inspector-dismantle').value : '0.0';

        timeSpeedMultiplier = parseFloat(rotSpeed);
        document.getElementById('val-rot-speed').textContent = parseFloat(rotSpeed).toFixed(1) + 'x';
        document.getElementById('val-pos-x').textContent = parseFloat(px).toFixed(1);
        document.getElementById('val-pos-y').textContent = parseFloat(py).toFixed(1);
        document.getElementById('val-pos-z').textContent = parseFloat(pz).toFixed(1);

        document.getElementById('val-rot-x').textContent = `${Math.round(rx)}°`;
        document.getElementById('val-rot-y').textContent = `${Math.round(ry)}°`;
        document.getElementById('val-rot-z').textContent = `${Math.round(rz)}°`;

        document.getElementById('val-img-width').textContent = parseFloat(imgWidth).toFixed(1);
        document.getElementById('val-img-height').textContent = parseFloat(imgHeight).toFixed(1);
        document.getElementById('val-scale').textContent = parseFloat(sc).toFixed(1);
        if (document.getElementById('val-inspector-dismantle')) {
            document.getElementById('val-inspector-dismantle').textContent = parseFloat(dismantleVal).toFixed(2) + 'x';
        }

        const rxRad = (parseFloat(rx) * Math.PI) / 180;
        const ryRad = (parseFloat(ry) * Math.PI) / 180;
        const rzRad = (parseFloat(rz) * Math.PI) / 180;

        customObjects.forEach(obj => {
            if (obj.userData && (obj.userData.preset === activePresetKey || obj.name === activePresetKey)) {
                obj.position.set(parseFloat(px), parseFloat(py), parseFloat(pz));
                obj.rotation.set(rxRad, ryRad, rzRad);
                obj.scale.set(parseFloat(sc), parseFloat(sc), parseFloat(sc));

                // 💥 Dismantle / Exploded view update
                if (obj.userData.setExplodeFactor) {
                    obj.userData.setExplodeFactor(parseFloat(dismantleVal));
                }

                // 🎨 PBR Material update
                obj.traverse(child => {
                    if (child.isMesh && child.material) {
                        child.material = createMaterial(matValue, color);
                    }
                });
            }
        });

        let editorText = codeEditor.value;

        // Replace attributes in <image-3d>
        const imageTagRegex = new RegExp(`(<image-3d\\b[^>]*\\bid="${activePresetKey}"[^>]*>)`, 'gi');
        if (editorText.match(imageTagRegex)) {
            editorText = editorText.replace(imageTagRegex, (match) => {
                let updated = match;
                updated = updated.replace(/\bx="[^"]*"/gi, `x="${px}"`);
                updated = updated.replace(/\by="[^"]*"/gi, `y="${py}"`);
                updated = updated.replace(/\bz="[^"]*"/gi, `z="${pz}"`);
                updated = updated.replace(/\brot-x="[^"]*"/gi, `rot-x="${rx}"`);
                updated = updated.replace(/\brot-y="[^"]*"/gi, `rot-y="${ry}"`);
                updated = updated.replace(/\brot-z="[^"]*"/gi, `rot-z="${rz}"`);
                updated = updated.replace(/\bwidth="[^"]*"/gi, `width="${imgWidth}"`);
                updated = updated.replace(/\bheight="[^"]*"/gi, `height="${imgHeight}"`);
                updated = updated.replace(/\bscale="[^"]*"/gi, `scale="${sc}"`);
                updated = updated.replace(/\bcolor="[^"]*"/gi, `color="${color}"`);
                updated = updated.replace(/\bframe="[^"]*"/gi, `frame="${frameStyle}"`);
                return updated;
            });
        }

        // Replace attributes in <model-3d>
        const tagRegex = new RegExp(`(<model-3d\\b[^>]*\\bpreset="${activePresetKey}"[^>]*>)`, 'gi');
        editorText = editorText.replace(tagRegex, (match) => {
            let updatedTag = match;
            updatedTag = updatedTag.replace(/\bx="[^"]*"/gi, `x="${px}"`);
            updatedTag = updatedTag.replace(/\by="[^"]*"/gi, `y="${py}"`);
            updatedTag = updatedTag.replace(/\bz="[^"]*"/gi, `z="${pz}"`);
            updatedTag = updatedTag.replace(/\bscale="[^"]*"/gi, `scale="${sc}"`);
            updatedTag = updatedTag.replace(/\bcolor="[^"]*"/gi, `color="${color}"`);
            if (updatedTag.includes('material=')) updatedTag = updatedTag.replace(/\bmaterial="[^"]*"/gi, `material="${matValue}"`);
            else updatedTag = updatedTag.replace('<model-3d', `<model-3d material="${matValue}"`);
            return updatedTag;
        });

        // Replace attributes in <pbr-mesh>
        editorText = editorText.replace(/<pbr-mesh\b[^>]*>/gi, (match) => {
            let updated = match;
            if (updated.includes('material=')) updated = updated.replace(/\bmaterial="[^"]*"/gi, `material="${matValue}"`);
            if (updated.includes('color=')) updated = updated.replace(/\bcolor="[^"]*"/gi, `color="${color}"`);
            return updated;
        });

        // Replace attributes in <exploded-mesh>
        editorText = editorText.replace(/<exploded-mesh\b[^>]*>/gi, (match) => {
            let updated = match;
            if (updated.includes('factor=')) updated = updated.replace(/\bfactor="[^"]*"/gi, `factor="${dismantleVal}"`);
            return updated;
        });

        codeEditor.value = editorText;
        updateLineNumbers();
        runCode();
    };

    ['slider-rot-speed', 'slider-pos-x', 'slider-pos-y', 'slider-pos-z', 'slider-rot-x', 'slider-rot-y', 'slider-rot-z', 'slider-img-width', 'slider-img-height', 'slider-scale', 'picker-model-color', 'select-img-frame', 'select-inspector-material', 'slider-inspector-dismantle'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateActiveModelTransform);
        if (el) el.addEventListener('change', updateActiveModelTransform);
    });

    document.getElementById('btn-audio-reactive').addEventListener('click', (e) => {
        playClickSFX();
        isAudioReactive = !isAudioReactive;
        e.currentTarget.classList.toggle('active', isAudioReactive);
    });

    document.getElementById('btn-play-pause').addEventListener('click', (e) => {
        playClickSFX();
        isAnimationPaused = !isAnimationPaused;
        const icon = e.currentTarget.querySelector('i');
        icon.className = isAnimationPaused ? 'fa-solid fa-pause' : 'fa-solid fa-pause';
    });

    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playClickSFX();
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const speedVal = parseFloat(e.currentTarget.getAttribute('data-speed'));
            timeSpeedMultiplier = speedVal;
            const rotSpeedSlider = document.getElementById('slider-rot-speed');
            if (rotSpeedSlider) {
                rotSpeedSlider.value = speedVal;
                document.getElementById('val-rot-speed').textContent = speedVal.toFixed(1) + 'x';
            }
            const footerSpeedSlider = document.getElementById('slider-speed-footer');
            if (footerSpeedSlider) {
                footerSpeedSlider.value = speedVal;
            }
        });
    });

    const footerSpeedSlider = document.getElementById('slider-speed-footer');
    if (footerSpeedSlider) {
        footerSpeedSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            timeSpeedMultiplier = val;
            const rotSpeedSlider = document.getElementById('slider-rot-speed');
            if (rotSpeedSlider) {
                rotSpeedSlider.value = val;
                document.getElementById('val-rot-speed').textContent = val.toFixed(1) + 'x';
            }
        });
    }

    document.getElementById('btn-physics-toggle').addEventListener('click', (e) => {
        playClickSFX();
        isPhysicsEnabled = !isPhysicsEnabled;
        e.currentTarget.classList.toggle('active', isPhysicsEnabled);
        runCode();
    });

    document.getElementById('btn-open-gallery').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-gallery').classList.add('active');
    });

    document.getElementById('btn-close-gallery').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-gallery').classList.remove('active');
    });

    document.querySelectorAll('.gallery-card').forEach(card => {
        if (!card.id || !card.id.startsWith('share-')) {
            card.addEventListener('click', () => {
                playClickSFX();
                const presetKey = card.getAttribute('data-preset');
                if (presetTemplates[presetKey]) {
                    codeEditor.value = presetTemplates[presetKey];
                    updateLineNumbers();
                    runCode();
                    document.getElementById('modal-gallery').classList.remove('active');
                }
            });
        }
    });

    document.getElementById('btn-run').addEventListener('click', () => {
        playRunSFX();
        runCode();
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        playClickSFX();
        isAutoOrbiting = false;
        isAnimationPaused = false;
        isCinematicCamEnabled = false;
        isMouseParallaxEnabled = false;
        isBloomEnabled = false;
        is4DMorphing = false;

        document.getElementById('webgl-canvas').style.filter = 'none';
        document.getElementById('btn-auto-orbit').classList.remove('active');
        document.getElementById('btn-cinematic-cam').classList.remove('active');
        document.getElementById('btn-mouse-parallax').classList.remove('active');
        document.getElementById('btn-toggle-bloom').classList.remove('active');
        document.getElementById('btn-morph-4d').classList.remove('active');

        scene.rotation.set(0, 0, 0);
        camera.position.set(0, 3, 7);
        controls.reset();
        runCode();
    });

    document.getElementById('btn-auto-orbit').addEventListener('click', (e) => {
        playClickSFX();
        isAutoOrbiting = !isAutoOrbiting;
        e.currentTarget.classList.toggle('active', isAutoOrbiting);
    });

    document.getElementById('btn-cam-iso').addEventListener('click', () => {
        playClickSFX();
        isAutoOrbiting = false;
        document.getElementById('btn-auto-orbit').classList.remove('active');
        camera.position.set(6, 6, 6);
        camera.lookAt(0, 0, 0);
    });

    document.getElementById('btn-cam-front').addEventListener('click', () => {
        playClickSFX();
        isAutoOrbiting = false;
        document.getElementById('btn-auto-orbit').classList.remove('active');
        camera.position.set(0, 0, 8);
        camera.lookAt(0, 0, 0);
    });

    document.getElementById('polytope-select').addEventListener('change', (e) => {
        playClickSFX();
        createPolytopeMesh(e.target.value, '#00f2fe');
    });

    document.getElementById('lang-btn').addEventListener('click', () => {
        playClickSFX();
        setLanguage(currentLang === 'en' ? 'fr' : 'en');
    });

    document.getElementById('preset-select').addEventListener('change', (e) => {
        playClickSFX();
        const val = e.target.value;
        if (presetTemplates[val]) {
            codeEditor.value = presetTemplates[val];
            updateLineNumbers();
            runCode();
        }
    });

    document.getElementById('btn-toggle-wireframe').addEventListener('click', (e) => {
        playClickSFX();
        e.currentTarget.classList.toggle('active');
        runCode();
    });

    document.getElementById('btn-toggle-grid').addEventListener('click', (e) => {
        playClickSFX();
        const btn = e.currentTarget;
        btn.classList.toggle('active');
        const grid = scene.getObjectByName('grid-floor');
        if (grid) grid.visible = btn.classList.contains('active');
    });

    document.getElementById('btn-toggle-4d-panel').addEventListener('click', (e) => {
        playClickSFX();
        const btn = e.currentTarget;
        btn.classList.toggle('active');
        document.getElementById('panel-4d-controls').classList.toggle('hidden', !btn.classList.contains('active'));
    });

    document.getElementById('btn-close-4d').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('panel-4d-controls').classList.add('hidden');
        document.getElementById('btn-toggle-4d-panel').classList.remove('active');
    });

    const setup4DSlider = (id, paramKey, valId) => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                polytope4DParams[paramKey] = val;
                document.getElementById(valId).textContent = val.toFixed(2);
            });
        }
    };

    setup4DSlider('slider-rot-xw', 'rotXW', 'val-rot-xw');
    setup4DSlider('slider-rot-yw', 'rotYW', 'val-rot-yw');
    setup4DSlider('slider-rot-zw', 'rotZW', 'val-rot-zw');
    setup4DSlider('slider-dist-4d', 'dist4D', 'val-dist-4d');

    document.getElementById('env-bg-select').addEventListener('change', (e) => {
        playClickSFX();
        const mode = e.target.value;
        if (warpParticles) { scene.remove(warpParticles); warpParticles = null; }

        if (mode === 'cyber') scene.background = new THREE.Color(0x0a0c14);
        else if (mode === 'warp') {
            scene.background = new THREE.Color(0x020308);
            createHyperspaceWormholeParticles();
        }
        else if (mode === 'space') scene.background = new THREE.Color(0x020307);
        else if (mode === 'studio') scene.background = new THREE.Color(0x2a2f3a);
        else if (mode === 'transparent') scene.background = null;
    });

    let currentFrameworkTab = 'webcomponent';

    function generateFrameworkCode(tab) {
        const userCode = codeEditor.value;
        const ga4Id = document.getElementById('ga4-tracking-id') ? document.getElementById('ga4-tracking-id').value.trim() : '';
        const agencyWatermark = document.getElementById('agency-watermark-id') ? document.getElementById('agency-watermark-id').value.trim() : '';

        // Extract primary preset and color from user code if present
        const presetMatch = userCode.match(/preset=["']([^"']+)["']/);
        const colorMatch = userCode.match(/color=["']([^"']+)["']/);
        const activePreset = presetMatch ? presetMatch[1] : 'space_fighter';
        const activeColor = colorMatch ? colorMatch[1] : '#00f2fe';

        if (tab === 'webcomponent') {
            return `<!-- 📦 Universal 1-Click <hyper-3d> Web Component (Works on Any Webpage) -->
<!-- 1. Include the Lightweight Hyper-3D Engine -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>

<!-- 2. Drop the 3D Custom Element Anywhere on your Page -->
<hyper-3d preset="${activePreset}" color="${activeColor}" material="neon" auto-rotate="true" style="width:100%; height:500px; display:block; border-radius:16px;"></hyper-3d>

<script>
// Zero-config Web Component Engine
class Hyper3DElement extends HTMLElement {
  connectedCallback() {
    const preset = this.getAttribute('preset') || 'space_fighter';
    const color = this.getAttribute('color') || '#00f2fe';
    const autoRot = this.getAttribute('auto-rotate') === 'true';
    const w = this.clientWidth || 600, h = this.clientHeight || 450;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 2.5, 6);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2); dir.position.set(5,10,5); scene.add(dir);
    // Procedural Mesh Engine
    const mat = new THREE.MeshPhongMaterial({ color: new THREE.Color(color), emissive: new THREE.Color(color), emissiveIntensity: 0.35, wireframe: false });
    const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.35, 100, 16), mat);
    scene.add(mesh);
    const animate = () => {
      requestAnimationFrame(animate);
      if (autoRot) mesh.rotation.y += 0.012;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}
if (!customElements.get('hyper-3d')) customElements.define('hyper-3d', Hyper3DElement);
<\/script>`;
        } else if (tab === 'webflow') {
            return `<!-- 🌐 Webflow Custom Code Embed (HTML Embed Block) -->
<div class="hyper3d-webflow-wrapper" style="width:100%; height:520px; position:relative; background:#0a0c14; border-radius:16px; overflow:hidden; box-shadow:0 0 30px rgba(0,242,254,0.15);">
    <div id="webflow-canvas-target" style="width:100%; height:100%;"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
<script>
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('webflow-canvas-target');
  if(!container) return;
  const w = container.clientWidth, h = container.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(0, 2.5, 6.5);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d));
  function loop() { requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); }
  loop();
});
<\/script>`;
        } else if (tab === 'shopify') {
            return `<!-- 🛍️ Shopify Liquid Section Component (sections/hyper-3d-model.liquid) -->
<div class="shopify-hyper3d-section" style="padding: 40px 0; background: #0a0c14; color: #fff; text-align: center;">
  <div class="page-width">
    <h2 style="color:#00f2fe; margin-bottom: 20px;">{{ section.settings.title | default: "Interactive 3D Experience" }}</h2>
    <div id="shopify-3d-container-{{ section.id }}" style="width:100%; max-width:900px; height:500px; margin:0 auto; border-radius:16px; overflow:hidden; border:1px solid rgba(0,242,254,0.3);"></div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function() {
  const container = document.getElementById('shopify-3d-container-{{ section.id }}');
  if(!container) return;
  const w = container.clientWidth || 800, h = container.clientHeight || 500;
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a0c14);
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(0, 3, 7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d));
  function loop() { requestAnimationFrame(loop); renderer.render(scene, camera); }
  loop();
})();
<\/script>

{% schema %}
{
  "name": "Hyper 3D Interactive Model",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "Explore in Interactive 3D" },
    { "type": "text", "id": "preset", "label": "3D Preset Key", "default": "${activePreset}" }
  ],
  "presets": [{ "name": "Hyper 3D Model" }]
}
{% endschema %}`;
        } else if (tab === 'wordpress') {
            return `<!-- 🟦 WordPress / Elementor / Gutenberg Custom HTML Block -->
<div id="hyper3d-wp-block" style="width:100%; height:500px; position:relative; background:#0a0c14; border-radius:14px; overflow:hidden; box-shadow:0 0 24px rgba(0,242,254,0.2);"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
<script>
(function() {
  const el = document.getElementById('hyper3d-wp-block');
  if(!el) return;
  const w = el.clientWidth || 800, h = el.clientHeight || 500;
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a0c14);
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(0, 3, 7);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  el.appendChild(renderer.domElement);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d));
  function loop() { requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); }
  loop();
})();
<\/script>`;
        } else if (tab === 'framer') {
            return `// ⚡ Framer / Wix Code Component
import * as React from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function Hyper3DComponent(props) {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const w = container.clientWidth || 600, h = container.clientHeight || 450
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0c14)
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.set(0, 2.5, 6.5)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    container.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d))

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      if (container) container.innerHTML = ""
    }
  }, [])

  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "450px", borderRadius: "16px", overflow: "hidden" }} />
}`;
        } else if (tab === 'react') {
            return `// ⚛️ React 18 / Next.js 14 Interactive 3D Component
'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Hyper3DModel({ preset = "${activePreset}", color = "${activeColor}" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c14);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(10, 15, 10);
    scene.add(dir);
    scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container) container.innerHTML = '';
    };
  }, [preset, color]);

  return <div ref={containerRef} style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden' }} />;
}`;
        } else if (tab === 'vue') {
            return `<!-- 🟢 Vue 3 / Nuxt 3 SFC Interactive 3D Component -->
<template>
  <div ref="container" class="hyper3d-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const props = defineProps({
  preset: { type: String, default: '${activePreset}' },
  color: { type: String, default: '${activeColor}' }
});

const container = ref(null);
let renderer, animId, controls;

onMounted(() => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0c14);
  const camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 3, 7);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  scene.add(new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d));

  const animate = () => {
    animId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animId);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.hyper3d-container { width: 100%; height: 500px; border-radius: 16px; overflow: hidden; }
</style>`;
        } else {
            return generateStandaloneHTML(userCode, false);
        }
    }

    document.querySelectorAll('.fw-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            playClickSFX();
            document.querySelectorAll('.fw-tab').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFrameworkTab = e.currentTarget.getAttribute('data-tab');
            document.getElementById('framework-code-area').value = generateFrameworkCode(currentFrameworkTab);
        });
    });

    document.getElementById('btn-framework-export').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('framework-code-area').value = generateFrameworkCode(currentFrameworkTab);
        document.getElementById('modal-framework').classList.add('active');
    });

    document.getElementById('btn-close-framework').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-framework').classList.remove('active');
    });

    document.getElementById('btn-copy-framework').addEventListener('click', () => {
        playClickSFX();
        const area = document.getElementById('framework-code-area');
        area.select();
        document.execCommand('copy');
        alert(translations[currentLang].copied_notice);
    });

    document.getElementById('btn-web-templates').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-web-templates').classList.add('active');
    });

    document.getElementById('btn-close-web-templates').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-web-templates').classList.remove('active');
    });

    function downloadLandingPage(templateType) {
        playClickSFX();
        const userCode = codeEditor.value;
        const embedScript = generateStandaloneHTML(userCode, true);
        const blob = new Blob([embedScript], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `landing-page-${templateType}.html`;
        link.click();
    }

    document.getElementById('card-template-saas').addEventListener('click', () => downloadLandingPage('saas-tech'));
    document.getElementById('card-template-crypto').addEventListener('click', () => downloadLandingPage('crypto-4d'));
    document.getElementById('card-template-agency').addEventListener('click', () => downloadLandingPage('ai-studio'));

    function generateStandaloneHTML(userCode, isFullPage) {
        const rawUserCode = JSON.stringify(userCode);
        const rawOBJStore = JSON.stringify(importedOBJDataStore);
        
        const ga4Id = document.getElementById('ga4-tracking-id') ? document.getElementById('ga4-tracking-id').value.trim() : '';
        const agencyWatermark = document.getElementById('agency-watermark-id') ? document.getElementById('agency-watermark-id').value.trim() : '';
        const activeEnvBg = document.getElementById('env-bg-select') ? document.getElementById('env-bg-select').value : 'cyber';

        const activeViewportMode = document.getElementById('viewport-mode-select') 
            ? document.getElementById('viewport-mode-select').value 
            : 'full';

        let bodyStyle = "margin:0; padding:0; width:100vw; height:100vh; overflow:hidden; background:#0a0c14; font-family:sans-serif;";
        let containerStyle = "width:100vw; height:100vh; margin:0; padding:0; overflow:hidden; background:#0a0c14; position:relative;";

        if (activeViewportMode === 'mobile') {
            bodyStyle = "margin:0; padding:0; width:100vw; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#05070d; font-family:sans-serif; overflow:auto;";
            containerStyle = "width:340px; height:580px; max-width:90vw; max-height:90vh; border:3px solid #00f2fe; border-radius:36px; box-shadow:0 0 45px rgba(0, 242, 254, 0.4); overflow:hidden; position:relative; background:#0a0c14;";
        } else if (activeViewportMode === 'hero') {
            bodyStyle = "margin:0; padding:0; width:100vw; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#05070d; font-family:sans-serif; overflow:auto;";
            containerStyle = "width:100%; height:420px; border-top:2px solid #00f2fe; border-bottom:2px solid #00f2fe; box-shadow:0 0 35px rgba(0, 242, 254, 0.3); overflow:hidden; position:relative; background:#0a0c14;";
        } else if (!isFullPage) {
            containerStyle = "width:100%; height:450px; position:relative; background:#0a0c14; border-radius:12px; overflow:hidden;";
        }

        let ga4Script = '';
        if (ga4Id) {
            ga4Script = `
    <!-- Google Analytics GA4 Integration -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"><\/script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ga4Id}');
    <\/script>`;
        }

        let watermarkHTML = agencyWatermark
            ? `<div style="position:absolute; bottom:14px; right:16px; background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); border:1px solid rgba(0,242,254,0.4); color:#00f2fe; font-size:11px; font-weight:600; padding:4px 10px; border-radius:12px; pointer-events:none; z-index:10;">✨ ${agencyWatermark}</div>`
            : `<a href="https://ia-codestudio.com/" target="_blank" rel="noopener" style="position:absolute; bottom:14px; right:16px; background:rgba(10,15,30,0.88); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1px solid rgba(0,242,254,0.5); color:#00f2fe; font-size:11px; font-weight:700; font-family:system-ui,-apple-system,sans-serif; padding:5px 12px; border-radius:20px; text-decoration:none; z-index:9999; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 15px rgba(0,0,0,0.5), 0 0 10px rgba(0,242,254,0.3); transition:transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.05)';this.style.boxShadow='0 0 16px rgba(0,242,254,0.6)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 15px rgba(0,0,0,0.5), 0 0 10px rgba(0,242,254,0.3)';">⚡ Powered by IA Code Studio</a>`;

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>3D/4D HTML Interactive Model</title>
    ${ga4Script}
    <style>
        body, html { ${bodyStyle} }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js"></script>
</head>
<body>
<div id="hyper3d-container" style="${containerStyle}">
    <canvas id="hyper3d-canvas" style="width:100%; height:100%; display:block; filter: drop-shadow(0 0 20px #00f2fe);"></canvas>
    ${watermarkHTML}
</div>

<script>
(function() {
    const container = document.getElementById('hyper3d-container');
    const canvas = document.getElementById('hyper3d-canvas');
    const scene = new THREE.Scene();

    const envBgMode = "${activeEnvBg}";
    let warpParticles = null;

    if (envBgMode === 'cyber') scene.background = new THREE.Color(0x0a0c14);
    else if (envBgMode === 'space') scene.background = new THREE.Color(0x020307);
    else if (envBgMode === 'studio') scene.background = new THREE.Color(0x2a2f3a);
    else if (envBgMode === 'transparent') scene.background = null;
    else if (envBgMode === 'warp') {
        scene.background = new THREE.Color(0x020308);
        const count = 4000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        const cyan = new THREE.Color(0x00f2fe);
        const magenta = new THREE.Color(0xff007f);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 10 + 1.2;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.sin(angle) * radius;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            velocities[i] = Math.random() * 0.4 + 0.15;
            const c = Math.random() > 0.5 ? cyan : magenta;
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        warpParticles = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.95 }));
        warpParticles.userData = { velocities };
        scene.add(warpParticles);
    }

    function getContainerDimensions() {
        const w = container.clientWidth || window.innerWidth || ${isFullPage ? 1920 : 800};
        const h = container.clientHeight || window.innerHeight || ${isFullPage ? 1080 : 450};
        return { width: Math.max(w, 100), height: Math.max(h, 100) };
    }

    const initialDims = getContainerDimensions();
    const camera = new THREE.PerspectiveCamera(45, initialDims.width / initialDims.height, 0.1, 1000);
    camera.position.set(0, 3, 7);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialDims.width, initialDims.height, false);

    let controls = null;
    if (typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
        try {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
        } catch(e){}
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(10, 15, 10);
    scene.add(dir);

    const grid = new THREE.GridHelper(20, 20, 0x00f2fe, 0x1f293d);
    scene.add(grid);

    const rawOBJDataStore = ${rawOBJStore};
    const importedOBJRegistry = {};
    if (typeof THREE.OBJLoader !== 'undefined') {
        const loader = new THREE.OBJLoader();
        for (let key in rawOBJDataStore) {
            try {
                const parsedObj = loader.parse(rawOBJDataStore[key]);
                const box = new THREE.Box3().setFromObject(parsedObj);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    const normScale = 2.5 / maxDim;
                    parsedObj.scale.set(normScale, normScale, normScale);
                }
                parsedObj.position.sub(center);
                importedOBJRegistry[key] = parsedObj;
            } catch(e){}
        }
    }

    function buildTesseract4D() {
        const v = []; for (let i = 0; i < 16; i++) v.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
        const e = []; for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) {
            let diff = 0; for (let k = 0; k < 4; k++) if (v[i][k] !== v[j][k]) diff++;
            if (diff === 1) e.push([i, j]);
        }
        return { vertices: v, edges: e };
    }

    function build5Cell4D() {
        const a = 1 / Math.sqrt(5);
        const v = [[1,1,1,-a],[1,-1,-1,-a],[-1,1,-1,-a],[-1,-1,1,-a],[0,0,0,Math.sqrt(5)-a]];
        const e = []; for (let i=0; i<5; i++) for (let j=i+1; j<5; j++) e.push([i,j]);
        return { vertices: v, edges: e };
    }

    function build16Cell4D() {
        const v = [[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],[0,0,0,1],[0,0,0,-1]];
        const e = []; for (let i=0; i<8; i++) for (let j=i+1; j<8; j++) { if (i%2===0 && j===i+1) continue; e.push([i,j]); }
        return { vertices: v, edges: e };
    }

    function build24Cell4D() {
        const v = [];
        build16Cell4D().vertices.forEach(p => v.push([p[0]*1.4, p[1]*1.4, p[2]*1.4, p[3]*1.4]));
        buildTesseract4D().vertices.forEach(p => v.push([p[0]*0.7, p[1]*0.7, p[2]*0.7, p[3]*0.7]));
        const e = [];
        for (let i=0; i<v.length; i++) for (let j=i+1; j<v.length; j++) {
            let dSq = 0; for (let k=0; k<4; k++) { let d=v[i][k]-v[j][k]; dSq += d*d; }
            if (dSq >= 1.8 && dSq <= 2.1) e.push([i,j]);
        }
        return { vertices: v, edges: e };
    }

    const polytopeLib = { tesseract: buildTesseract4D(), '5cell': build5Cell4D(), '16cell': build16Cell4D(), '24cell': build24Cell4D() };
    let polytopeMeshGroup = null, currentShape = 'tesseract';
    let params4D = { size: 2.0, rotXW: 0.02, rotYW: 0.01, rotZW: 0.00, dist4D: 2.5, angleXW: 0, angleYW: 0, angleZW: 0 };
    let animationCallbacks = [], customObjects = [];

    function rotate4DPoint(pt, aXW, aYW, aZW) {
        let [x, y, z, w] = pt;
        let cXW = Math.cos(aXW), sXW = Math.sin(aXW); let x1 = x * cXW - w * sXW, w1 = x * sXW + w * cXW;
        let cYW = Math.cos(aYW), sYW = Math.sin(aYW); let y2 = y * cYW - w1 * sYW, w2 = y * sYW + w1 * cYW;
        let cZW = Math.cos(aZW), sZW = Math.sin(aZW); let z3 = z * cZW - w2 * sZW, w3 = z * sZW + w2 * cZW;
        return [x1, y2, z3, w3];
    }

    function project4Dto3D(pt4d, distance, scale) {
        const [x, y, z, w] = pt4d; const wFactor = 1 / (distance - w);
        return new THREE.Vector3(x * wFactor * scale, y * wFactor * scale, z * wFactor * scale);
    }

    function createPolytopeMesh(shapeKey, colorHex) {
        if (polytopeMeshGroup) scene.remove(polytopeMeshGroup);
        currentShape = polytopeLib[shapeKey] ? shapeKey : 'tesseract';
        const polyData = polytopeLib[currentShape];
        polytopeMeshGroup = new THREE.Group();
        const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(colorHex || 0x00f2fe) });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(polyData.edges.length * 2 * 3), 3));
        polytopeMeshGroup.add(new THREE.LineSegments(geo, lineMat));

        const nodeGroup = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const nodeMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colorHex || 0x00f2fe), emissive: new THREE.Color(0x7928ca) });
        for (let i = 0; i < polyData.vertices.length; i++) nodeGroup.add(new THREE.Mesh(sphereGeo, nodeMat));
        polytopeMeshGroup.add(nodeGroup);
        scene.add(polytopeMeshGroup);
    }

    function updatePolytope4D() {
        if (!polytopeMeshGroup) return;
        params4D.angleXW += params4D.rotXW; params4D.angleYW += params4D.rotYW; params4D.angleZW += params4D.rotZW;
        const polyData = polytopeLib[currentShape];
        const projected3D = polyData.vertices.map(v => {
            const rotPt = rotate4DPoint(v, params4D.angleXW, params4D.angleYW, params4D.angleZW);
            return project4Dto3D(rotPt, params4D.dist4D, params4D.size);
        });
        const positions = polytopeMeshGroup.children[0].geometry.attributes.position.array;
        let posIdx = 0;
        for (let i = 0; i < polyData.edges.length; i++) {
            const [idxA, idxB] = polyData.edges[i]; const pA = projected3D[idxA], pB = projected3D[idxB];
            positions[posIdx++] = pA.x; positions[posIdx++] = pA.y; positions[posIdx++] = pA.z;
            positions[posIdx++] = pB.x; positions[posIdx++] = pB.y; positions[posIdx++] = pB.z;
        }
        polytopeMeshGroup.children[0].geometry.attributes.position.needsUpdate = true;
        const nodeGroup = polytopeMeshGroup.children[1];
        for (let i = 0; i < polyData.vertices.length; i++) if (nodeGroup.children[i]) nodeGroup.children[i].position.copy(projected3D[i]);
    }

    function createMaterial(type, colorHex) {
        const color = new THREE.Color(colorHex);
        if (type === 'glass') return new THREE.MeshPhysicalMaterial({ color: color, transparent: true, opacity: 0.45, roughness: 0.1, transmission: 0.9 });
        if (type === 'hologram') return new THREE.MeshPhongMaterial({ color: color, emissive: color, wireframe: true, transparent: true, opacity: 0.7 });
        if (type === 'matrix') {
            const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 256;
            const ctx = canvas.getContext('2d'); ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, 256, 256);
            ctx.fillStyle = '#00ffcc'; ctx.font = '14px monospace';
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
                    ctx.fillText(char, i * 16, j * 16 + 14);
                }
            }
            const tex = new THREE.CanvasTexture(canvas); tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
            return new THREE.MeshStandardMaterial({ map: tex, color: color, roughness: 0.2, metalness: 0.8, emissive: color, emissiveIntensity: 0.6 });
        }
        if (type === 'plasma') return new THREE.MeshPhysicalMaterial({ color: color, emissive: new THREE.Color(0xff007f), emissiveIntensity: 0.9, roughness: 0.1, metalness: 0.9 });
        if (type === 'wire-glow') return new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 1.5, wireframe: true });
        if (type === 'neon') return new THREE.MeshBasicMaterial({ color: color });
        return new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.7 });
    }

    function create3DTextTexture(text, colorHex) {
        try {
            const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 256;
            const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,1024,256);
            ctx.fillStyle = 'rgba(10, 15, 30, 0.85)'; ctx.strokeStyle = colorHex || '#00f2fe'; ctx.lineWidth = 6;
            if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(24, 24, 976, 208, 40); ctx.fill(); ctx.stroke(); }
            else { ctx.fillRect(24, 24, 976, 208); }
            let cleanText = (text || '3D TEXT').replace(/[\uE000-\uF8FF]/g, '');
            let fontSize = 54; ctx.font = 'bold ' + fontSize + 'px sans-serif';
            let textWidth = ctx.measureText(cleanText).width;
            while (textWidth > 900 && fontSize > 16) { fontSize -= 2; ctx.font = 'bold ' + fontSize + 'px sans-serif'; textWidth = ctx.measureText(cleanText).width; }
            ctx.fillStyle = colorHex || '#00f2fe'; ctx.shadowColor = colorHex || '#00f2fe'; ctx.shadowBlur = 18;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(cleanText, 512, 128);
            const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate = true; return tex;
        } catch(e) {
            const fallbackCanvas = document.createElement('canvas'); fallbackCanvas.width = 256; fallbackCanvas.height = 64;
            const fCtx = fallbackCanvas.getContext('2d'); fCtx.fillStyle = colorHex || '#00f2fe'; fCtx.fillRect(0, 0, 256, 64);
            const tex = new THREE.CanvasTexture(fallbackCanvas); tex.needsUpdate = true; return tex;
        }
    }

    function attachExplodeEngineToGroup(group, baseFactor) {
        if (!group || !group.children) return;
        const originalPositions = [];
        group.children.forEach(child => { originalPositions.push(child.position.clone()); });
        group.userData.setExplodeFactor = (f) => {
            group.children.forEach((child, i) => {
                const orig = originalPositions[i]; if (!orig) return;
                const dir = orig.length() > 0 ? orig.clone().normalize() : new THREE.Vector3(0, (i + 1) * 0.4, 0);
                child.position.copy(orig).add(dir.multiplyScalar(f * 1.5));
            });
        };
        if (baseFactor > 0) group.userData.setExplodeFactor(baseFactor);
    }

    function createProceduralModelGroup(presetKey, colorHex, matType) {
        const group = new THREE.Group();
        const mat = createMaterial(matType || 'neon', colorHex || '#00f2fe');
        const accentMat = createMaterial('neon', colorHex || '#00ffcc');
        const darkMat = createMaterial('standard', '#111122');

        if (presetKey === 'cyber_drone') {
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.28, 8), mat); group.add(body);
            const topDome = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 8, 0, Math.PI*2, 0, Math.PI/2), mat); topDome.position.y = 0.14; group.add(topDome);
            const bottomDome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI*2, Math.PI/2, Math.PI/2), mat); bottomDome.position.y = -0.14; group.add(bottomDome);
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), accentMat); eye.position.set(0, -0.2, 0.42); group.add(eye);
            const eyeRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 8, 16), accentMat); eyeRing.position.set(0, -0.2, 0.38); eyeRing.rotation.x = Math.PI/2; group.add(eyeRing);
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2 + Math.PI/4;
                const armGroup = new THREE.Group();
                const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.08), mat); arm.position.x = 0.45; armGroup.add(arm);
                const joint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), accentMat); joint.position.x = 0.9; armGroup.add(joint);
                const rotorHub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), accentMat); rotorHub.position.x = 0.9; rotorHub.position.y = 0.1; armGroup.add(rotorHub);
                for (let b = 0; b < 2; b++) {
                    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.12), accentMat);
                    blade.position.set(0.9 + (b === 0 ? 0.28 : -0.28), 0.16, 0);
                    armGroup.add(blade);
                }
                const landing = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6), mat); landing.position.set(0.9, -0.25, 0); armGroup.add(landing);
                armGroup.rotation.y = angle;
                group.add(armGroup);
            }
            const ledRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 8, 32), accentMat); ledRing.rotation.x = Math.PI/2; group.add(ledRing);

        } else if (presetKey === 'space_station') {
            const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 12), mat); group.add(hub);
            const hubCapT = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 6, 0, Math.PI*2, 0, Math.PI/2), mat); hubCapT.position.y = 0.55; group.add(hubCapT);
            const hubCapB = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 6, 0, Math.PI*2, Math.PI/2, Math.PI/2), mat); hubCapB.position.y = -0.55; group.add(hubCapB);
            const dockRing = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.07, 8, 24), accentMat); dockRing.rotation.x = Math.PI/2; group.add(dockRing);
            for (let i = 0; i < 3; i++) {
                const angle = (i * 2 * Math.PI) / 3;
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), mat);
                arm.rotation.z = Math.PI/2; arm.position.set(Math.cos(angle)*0.8, 0, Math.sin(angle)*0.8);
                arm.rotation.y = -angle; group.add(arm);
                const module = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 10), mat);
                module.position.set(Math.cos(angle)*1.7, 0, Math.sin(angle)*1.7); group.add(module);
                const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.45), accentMat);
                solarPanel.position.set(Math.cos(angle)*1.7, 0.5, Math.sin(angle)*1.7); group.add(solarPanel);
                const solarPanel2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.45), accentMat);
                solarPanel2.position.set(Math.cos(angle)*1.7, -0.5, Math.sin(angle)*1.7); group.add(solarPanel2);
            }
            const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.06, 8, 48), accentMat); outerRing.rotation.x = Math.PI/2; group.add(outerRing);

        } else if (presetKey === 'cosmic_starship') {
            const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.45, 3.5, 8), mat); fuselage.rotation.x = Math.PI/2; group.add(fuselage);
            const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.0, 8), mat); nose.rotation.x = -Math.PI/2; nose.position.z = 2.25; group.add(nose);
            const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.6, 8), mat); engine.rotation.x = Math.PI/2; engine.position.z = -2.0; group.add(engine);
            const engineGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 8), accentMat); engineGlow.rotation.x = Math.PI/2; engineGlow.position.z = -2.35; group.add(engineGlow);
            const wingGeoL = new THREE.BufferGeometry();
            const wvL = new Float32Array([-0.2,0,-0.8, -2.2,0,-1.0, -0.2,0,1.2]); wingGeoL.setAttribute('position', new THREE.BufferAttribute(wvL,3)); wingGeoL.computeVertexNormals();
            const wingL = new THREE.Mesh(wingGeoL, mat); group.add(wingL);
            const wingGeoR = new THREE.BufferGeometry();
            const wvR = new Float32Array([0.2,0,-0.8, 2.2,0,-1.0, 0.2,0,1.2]); wingGeoR.setAttribute('position', new THREE.BufferAttribute(wvR,3)); wingGeoR.computeVertexNormals();
            const wingR = new THREE.Mesh(wingGeoR, mat); group.add(wingR);
            const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 6, 0, Math.PI*2, 0, Math.PI/2), accentMat); canopy.rotation.x = Math.PI/2; canopy.position.z = 1.2; group.add(canopy);
            const finGeo = new THREE.BufferGeometry();
            const fv = new Float32Array([0,0,-1.5, 0,0.8,-0.5, 0,0,0.5]); finGeo.setAttribute('position', new THREE.BufferAttribute(fv,3)); finGeo.computeVertexNormals();
            const fin = new THREE.Mesh(finGeo, accentMat); fin.position.y = 0.35; group.add(fin);

        } else if (presetKey === 'alien_avatar') {
            const skull = new THREE.Mesh(new THREE.SphereGeometry(0.75, 24, 20), mat); skull.scale.set(0.85, 1.5, 0.75); skull.position.y = 1.5; group.add(skull);
            const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 8, 0, Math.PI*2, Math.PI/2, Math.PI/2), mat); jaw.position.set(0, 0.78, 0.12); group.add(jaw);
            const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 10), accentMat); eyeL.scale.set(1.5, 0.7, 0.5); eyeL.position.set(-0.35, 1.55, 0.55); group.add(eyeL);
            const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 10), accentMat); eyeR.scale.set(1.5, 0.7, 0.5); eyeR.position.set(0.35, 1.55, 0.55); group.add(eyeR);
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.55, 12), mat); neck.position.y = 0.55; group.add(neck);
            const thorax = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.38, 0.9, 14), mat); thorax.position.y = -0.1; group.add(thorax);
            const abdomen = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.22, 0.7, 12), mat); abdomen.position.y = -0.85; group.add(abdomen);
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 1.4, 8), mat); armL.position.set(-0.75, -0.05, 0); armL.rotation.z = Math.PI/5; group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 1.4, 8), mat); armR.position.set(0.75, -0.05, 0); armR.rotation.z = -Math.PI/5; group.add(armR);
            const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.03, 8, 32), accentMat); ring1.position.y = 1.5; ring1.rotation.x = Math.PI/2.5; group.add(ring1);
            const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.03, 8, 32), accentMat); ring2.position.y = 1.5; ring2.rotation.x = Math.PI/2.5; ring2.rotation.y = Math.PI/2; group.add(ring2);

        } else if (presetKey === 'cyber_robot' || presetKey === 'robot') {
            const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 0.75), mat); head.position.y = 1.7; group.add(head);
            const visor = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.18, 0.12), accentMat); visor.position.set(0, 1.74, 0.38); group.add(visor);
            const headTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.65), mat); headTop.position.set(0, 2.1, 0); group.add(headTop);
            const antL = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.5, 6), accentMat); antL.position.set(-0.25, 2.4, 0); group.add(antL);
            const antR = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.5, 6), accentMat); antR.position.set(0.25, 2.4, 0); group.add(antR);
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.35, 8), mat); neck.position.y = 1.18; group.add(neck);
            const chest = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.1, 0.82), mat); chest.position.y = 0.4; group.add(chest);
            const chestPlateL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.12), accentMat); chestPlateL.position.set(-0.35, 0.5, 0.47); group.add(chestPlateL);
            const chestPlateR = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.12), accentMat); chestPlateR.position.set(0.35, 0.5, 0.47); group.add(chestPlateR);
            const coreOrb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), accentMat); coreOrb.position.set(0, 0.45, 0.48); group.add(coreOrb);
            const waist = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.3, 0.65), mat); waist.position.y = -0.25; group.add(waist);
            const legL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.42), mat); legL.position.set(-0.38, -0.9, 0); group.add(legL);
            const legR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.42), mat); legR.position.set(0.38, -0.9, 0); group.add(legR);
            const footL = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.58), mat); footL.position.set(-0.38, -1.43, 0.08); group.add(footL);
            const footR = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.58), mat); footR.position.set(0.38, -1.43, 0.08); group.add(footR);
            const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), mat); shoulderL.position.set(-1.02, 0.72, 0); group.add(shoulderL);
            const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), mat); shoulderR.position.set(1.02, 0.72, 0); group.add(shoulderR);
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.85, 8), mat); armL.position.set(-1.08, 0.18, 0); group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.85, 8), mat); armR.position.set(1.08, 0.18, 0); group.add(armR);
            const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.7, 8), mat); forearmL.position.set(-1.08, -0.42, 0); group.add(forearmL);
            const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.7, 8), mat); forearmR.position.set(1.08, -0.42, 0); group.add(forearmR);
            const handL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.22), mat); handL.position.set(-1.08, -0.92, 0); group.add(handL);
            const handR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.22), mat); handR.position.set(1.08, -0.92, 0); group.add(handR);

        } else if (presetKey === 'cyber_car') {
            const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 1.55), mat); chassis.position.y = 0.22; group.add(chassis);
            const bodyGeo = new THREE.BufferGeometry();
            const bv = new Float32Array([
                -1.7,0.22,-0.77, 1.7,0.22,-0.77, 1.7,0.22,0.77, -1.7,0.22,0.77,
                -1.1,0.78,-0.65, 0.85,0.78,-0.65, 0.85,0.78,0.65, -1.1,0.78,0.65,
            ]);
            const bi = new Uint16Array([0,4,1, 1,4,5, 1,5,2, 2,5,6, 2,6,3, 3,6,7, 3,7,0, 0,7,4, 4,7,5, 5,7,6, 0,1,2, 0,2,3]);
            bodyGeo.setAttribute('position', new THREE.BufferAttribute(bv,3));
            bodyGeo.setIndex(new THREE.BufferAttribute(bi,1));
            bodyGeo.computeVertexNormals();
            const carBody = new THREE.Mesh(bodyGeo, mat); group.add(carBody);
            const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.15), accentMat); canopy.position.set(-0.1, 0.9, 0); group.add(canopy);
            const splitter = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.3), accentMat); splitter.position.set(0, 0.12, -0.95); group.add(splitter);
            const rearWing = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.35), accentMat); rearWing.position.set(0, 0.95, 0.85); group.add(rearWing);
            const wingPostL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), mat); wingPostL.position.set(-0.8, 0.74, 0.85); group.add(wingPostL);
            const wingPostR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), mat); wingPostR.position.set(0.8, 0.74, 0.85); group.add(wingPostR);
            for (let wx = -1; wx <= 1; wx += 2) {
                for (let wz = -1; wz <= 1; wz += 2) {
                    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16), mat); wheel.rotation.z = Math.PI/2;
                    wheel.position.set(wx*1.35, 0.0, wz*0.78); group.add(wheel);
                    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 12), accentMat); rim.rotation.x = Math.PI/2;
                    rim.position.set(wx*1.47, 0.0, wz*0.78); group.add(rim);
                }
            }

        } else if (presetKey === 'pirate_ship') {
            const hull = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.75, 1.4, 4, 1, 1), mat); hull.position.y = 0; group.add(hull);
            const keel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 0.4), mat); keel.position.y = -0.5; group.add(keel);
            const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.3), mat); deck.position.y = 0.43; group.add(deck);
            const bow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 1.3), mat); bow.position.set(1.85, 0.35, 0); group.add(bow);
            const stern = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 1.3), mat); stern.position.set(-1.85, 0.45, 0); group.add(stern);
            const mastPositions = [0.7, -0.2, -1.3];
            const mastHeights = [3.0, 2.5, 2.0];
            mastPositions.forEach((mx, i) => {
                const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, mastHeights[i], 8), accentMat);
                mast.position.set(mx, 0.43 + mastHeights[i]/2, 0); group.add(mast);
                const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4-i*0.3, 6), mat);
                yard.rotation.z = Math.PI/2; yard.position.set(mx, 0.43 + mastHeights[i]*0.7, 0); group.add(yard);
                const nest = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.2, 8), mat);
                nest.position.set(mx, 0.43 + mastHeights[i] - 0.35, 0); group.add(nest);
            });
            for (let ci = -1; ci <= 1; ci += 2) {
                const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 8), accentMat);
                cannon.rotation.z = Math.PI/2; cannon.position.set(ci*0.6, 0.58, 0.6); group.add(cannon);
                const cannon2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 8), accentMat);
                cannon2.rotation.z = Math.PI/2; cannon2.position.set(ci*0.6, 0.58, -0.6); group.add(cannon2);
            }

        } else if (presetKey === 'saturn_galaxy') {
            const planet = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 24), mat); planet.scale.set(1,0.92,1); group.add(planet);
            const band = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.06, 8, 40), accentMat); band.position.y = 0.1; group.add(band);
            const ringAngles = [Math.PI/3.2, Math.PI/3.4, Math.PI/3.0];
            const ringData = [[1.55, 0.08], [2.0, 0.11], [2.5, 0.07]];
            ringData.forEach(([r, t], i) => {
                const ring = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, 56), accentMat);
                ring.rotation.x = ringAngles[i]; group.add(ring);
            });
            const moon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mat); moon.position.set(3.2, 0.4, 0); group.add(moon);

        } else if (presetKey === 'crystal_tower') {
            const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 0.25, 6), mat); base.position.y = -1.6; group.add(base);
            const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 0.45, 6), mat); pedestal.position.y = -1.25; group.add(pedestal);
            const mainCrystal = new THREE.Mesh(new THREE.ConeGeometry(0.42, 3.2, 6), mat); mainCrystal.position.y = 0.4; group.add(mainCrystal);
            const mainBase = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.4, 6), mat); mainBase.position.y = -1.05; group.add(mainBase);
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const radius = 0.68 + (i % 2) * 0.15;
                const height = 1.6 - i * 0.1;
                const cr = 0.14 - i * 0.01;
                const side = new THREE.Mesh(new THREE.ConeGeometry(cr, height, 5), accentMat);
                side.position.set(Math.cos(angle)*radius, -1.05 + height/2, Math.sin(angle)*radius);
                side.rotation.z = (i % 2 === 0 ? 0.12 : -0.12); group.add(side);
            }
            const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), accentMat); orb.position.y = 2.05; group.add(orb);
            for (let r = 0; r < 3; r++) {
                const eRing = new THREE.Mesh(new THREE.TorusGeometry(0.35 + r*0.1, 0.02, 6, 20), accentMat);
                eRing.position.y = 2.05; eRing.rotation.x = r * Math.PI/3; group.add(eRing);
            }

        } else if (presetKey === 'mech_warrior') {
            const head = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.8, 0.9), mat); head.position.y = 2.3; group.add(head);
            const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.35, 0.88), mat); helmet.position.set(0, 2.75, 0); group.add(helmet);
            const visor = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.12), accentMat); visor.position.set(0, 2.38, 0.46); group.add(visor);
            const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), accentMat); eyeL.position.set(-0.22, 2.38, 0.48); group.add(eyeL);
            const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), accentMat); eyeR.position.set(0.22, 2.38, 0.48); group.add(eyeR);
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 0.4, 8), mat); neck.position.y = 1.78; group.add(neck);
            const neckPipeL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), accentMat); neckPipeL.position.set(-0.18, 1.88, 0.15); neckPipeL.rotation.x = 0.3; group.add(neckPipeL);
            const neckPipeR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), accentMat); neckPipeR.position.set(0.18, 1.88, 0.15); neckPipeR.rotation.x = 0.3; group.add(neckPipeR);
            const chest = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.3, 1.05), mat); chest.position.y = 0.85; group.add(chest);
            const chestVent = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.14), accentMat); chestVent.position.set(0, 1.1, 0.54); group.add(chestVent);
            const reactorCore = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), accentMat); reactorCore.position.set(0, 0.75, 0.56); group.add(reactorCore);
            const waist = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.9), mat); waist.position.y = 0.08; group.add(waist);
            const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.58), mat); thighL.position.set(-0.55, -0.64, 0); group.add(thighL);
            const thighR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.58), mat); thighR.position.set(0.55, -0.64, 0); group.add(thighR);
            const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.85, 0.52), mat); shinL.position.set(-0.55, -1.6, 0.05); group.add(shinL);
            const shinR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.85, 0.52), mat); shinR.position.set(0.55, -1.6, 0.05); group.add(shinR);
            const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.76), mat); bootL.position.set(-0.55, -2.14, 0.12); group.add(bootL);
            const bootR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.76), mat); bootR.position.set(0.55, -2.14, 0.12); group.add(bootR);
            const paulL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.55, 0.72), mat); paulL.position.set(-1.35, 1.4, 0); group.add(paulL);
            const paulR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.55, 0.72), mat); paulR.position.set(1.35, 1.4, 0); group.add(paulR);
            const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 1.0, 8), mat); armL.position.set(-1.42, 0.72, 0); group.add(armL);
            const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 1.0, 8), mat); armR.position.set(1.42, 0.72, 0); group.add(armR);
            const weaponL = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.18, 0.9, 8), mat); weaponL.position.set(-1.42, -0.12, 0); group.add(weaponL);
            const cannonL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 1.1, 8), accentMat); cannonL.rotation.x = Math.PI/2; cannonL.position.set(-1.42, -0.12, 0.6); group.add(cannonL);
            const weaponR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.38, 0.9), mat); weaponR.position.set(1.42, -0.18, 0); group.add(weaponR);
            const bladeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 1.4), accentMat); bladeR.position.set(1.42, -0.18, 0.85); group.add(bladeR);

        } else if (presetKey === 'space_fighter') {
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 2.8, 6), mat); body.rotation.x = Math.PI/2; group.add(body);
            const noseGeo = new THREE.ConeGeometry(0.22, 1.2, 6); 
            const nose = new THREE.Mesh(noseGeo, mat); nose.rotation.x = -Math.PI/2; nose.position.z = 2.0; group.add(nose);
            const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 6, 0, Math.PI*2, 0, Math.PI/2), accentMat); cockpit.rotation.x = Math.PI/2; cockpit.position.z = 0.9; group.add(cockpit);
            const wingGeoL = new THREE.BufferGeometry();
            const wlv = new Float32Array([0,0,0.8, -2.4,0,-0.5, -0.5,0,-1.4, 0,0,-1.4]); wingGeoL.setAttribute('position', new THREE.BufferAttribute(wlv,3));
            wingGeoL.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1)); wingGeoL.computeVertexNormals();
            const wingL = new THREE.Mesh(wingGeoL, mat); group.add(wingL);
            const wingGeoR = new THREE.BufferGeometry();
            const wrv = new Float32Array([0,0,0.8, 2.4,0,-0.5, 0.5,0,-1.4, 0,0,-1.4]); wingGeoR.setAttribute('position', new THREE.BufferAttribute(wrv,3));
            wingGeoR.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1)); wingGeoR.computeVertexNormals();
            const wingR = new THREE.Mesh(wingGeoR, mat); group.add(wingR);
            const strakeL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.6), accentMat); strakeL.position.set(-0.7, 0, -0.2); group.add(strakeL);
            const strakeR = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.6), accentMat); strakeR.position.set(0.7, 0, -0.2); group.add(strakeR);
            const engL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 1.1, 8), mat); engL.rotation.x = Math.PI/2; engL.position.set(-0.85, 0, -1.35); group.add(engL);
            const engR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 1.1, 8), mat); engR.rotation.x = Math.PI/2; engR.position.set(0.85, 0, -1.35); group.add(engR);
            const glowL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 8), accentMat); glowL.rotation.x = Math.PI/2; glowL.position.set(-0.85, 0, -1.95); group.add(glowL);
            const glowR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 8), accentMat); glowR.rotation.x = Math.PI/2; glowR.position.set(0.85, 0, -1.95); group.add(glowR);
            const finGeo = new THREE.BufferGeometry();
            const fv = new Float32Array([0,0,-1.4, 0,0.7,-0.4, 0,0.15,0.6]); finGeo.setAttribute('position', new THREE.BufferAttribute(fv,3)); finGeo.computeVertexNormals();
            const fin = new THREE.Mesh(finGeo, accentMat); fin.position.y = 0.28; group.add(fin);
            const laserL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 1.4, 6), accentMat); laserL.rotation.x = Math.PI/2; laserL.position.set(-1.8, 0, -0.2); group.add(laserL);
            const laserR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 1.4, 6), accentMat); laserR.rotation.x = Math.PI/2; laserR.position.set(1.8, 0, -0.2); group.add(laserR);

        } else {
            group.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.2), mat));
        }
        return group;
    }

    const userCode = ${rawUserCode};
    const parser = new DOMParser();
    const doc = parser.parseFromString('<div>' + userCode + '</div>', 'text/html');
    doc.body.firstChild.childNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const tagName = node.tagName.toLowerCase();
        const getAttr = (name, def) => node.getAttribute(name) || def;

        if (tagName === 'image-3d') {
            const src = getAttr('src', '');
            const w = parseFloat(getAttr('width', '3.5')), h = parseFloat(getAttr('height', '2.5'));
            const s = parseFloat(getAttr('scale', '1'));
            const rx = (parseFloat(getAttr('rot-x', '0')) * Math.PI) / 180;
            const ry = (parseFloat(getAttr('rot-y', '0')) * Math.PI) / 180;
            const rz = (parseFloat(getAttr('rot-z', '0')) * Math.PI) / 180;
            const frameStyle = getAttr('frame', 'neon');
            const colorHex = getAttr('color', '#00f2fe');
            const depthAmount = parseFloat(getAttr('depth', '0.4'));
            const hasScanner = getAttr('scanner', 'false') === 'true';
            const backStyle = getAttr('back', 'none');
            const hasDisintegrate = getAttr('disintegrate', 'false') === 'true';
            const hasCutout = getAttr('cutout', 'false') === 'true';
            const isInverted = getAttr('invert', 'false') === 'true';
            const imgGroup = new THREE.Group();
            const planeGeo = new THREE.PlaneGeometry(w, h, 48, 48);
            const clickProxy = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
            imgGroup.add(clickProxy);
            imgGroup.userData = { isImage: true };
            clickProxy.userData = imgGroup.userData;

            new THREE.TextureLoader().load(src, (texture) => {
                if (hasCutout && texture.image) {
                    try {
                        const cutCanvas = document.createElement('canvas');
                        cutCanvas.width = texture.image.width || 512; cutCanvas.height = texture.image.height || 512;
                        const cutCtx = cutCanvas.getContext('2d'); cutCtx.drawImage(texture.image, 0, 0, cutCanvas.width, cutCanvas.height);
                        const imgData = cutCtx.getImageData(0, 0, cutCanvas.width, cutCanvas.height);
                        const d = imgData.data;
                        const r0 = d[0], g0 = d[1], b0 = d[2];
                        for (let i = 0; i < d.length; i += 4) {
                            const r = d[i], g = d[i+1], b = d[i+2];
                            if (Math.abs(r - r0) < 35 && Math.abs(g - g0) < 35 && Math.abs(b - b0) < 35) { d[i+3] = 0; }
                        }
                        cutCtx.putImageData(imgData, 0, 0);
                        const cutTex = new THREE.CanvasTexture(cutCanvas);
                        cutTex.minFilter = THREE.LinearFilter; cutTex.magFilter = THREE.LinearFilter;
                        texture = cutTex;
                    } catch(e){}
                }

                if (depthAmount > 0) {
                    try {
                        const offCanvas = document.createElement('canvas'); offCanvas.width = 64; offCanvas.height = 64;
                        const offCtx = offCanvas.getContext('2d');
                        if (texture.image && (texture.image.complete || texture.image.width > 0)) {
                            offCtx.drawImage(texture.image, 0, 0, 64, 64);
                            const imgData = offCtx.getImageData(0, 0, 64, 64).data;
                            const pos = planeGeo.attributes.position;
                            for (let i = 0; i < pos.count; i++) {
                                const u = Math.floor(((pos.getX(i) / w) + 0.5) * 63);
                                const v = Math.floor(((pos.getY(i) / h) + 0.5) * 63);
                                const idx = (v * 64 + u) * 4;
                                const rVal = imgData[idx] || 0, gVal = imgData[idx+1] || 0, bVal = imgData[idx+2] || 0;
                                const lum = (rVal * 0.299 + gVal * 0.587 + bVal * 0.114) / 255;
                                pos.setZ(i, (lum - 0.5) * depthAmount * 0.35);
                            }
                            pos.needsUpdate = true; planeGeo.computeVertexNormals();
                        }
                    } catch(e){}
                }

                if (isInverted && texture.image) {
                    try {
                        const invCanvas = document.createElement('canvas');
                        invCanvas.width = texture.image.width || 512; invCanvas.height = texture.image.height || 512;
                        const invCtx = invCanvas.getContext('2d'); invCtx.drawImage(texture.image, 0, 0, invCanvas.width, invCanvas.height);
                        const imgData = invCtx.getImageData(0, 0, invCanvas.width, invCanvas.height);
                        const d = imgData.data;
                        for (let i = 0; i < d.length; i += 4) { d[i] = 255 - d[i]; d[i+1] = 255 - d[i+1]; d[i+2] = 255 - d[i+2]; }
                        invCtx.putImageData(imgData, 0, 0);
                        const invTex = new THREE.CanvasTexture(invCanvas);
                        invTex.minFilter = THREE.LinearFilter; invTex.magFilter = THREE.LinearFilter;
                        texture = invTex;
                    } catch(e){}
                }

                const planeMesh = new THREE.Mesh(planeGeo, new THREE.MeshStandardMaterial({ map: texture, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide }));
                imgGroup.add(planeMesh);

                if (frameStyle === 'neon') {
                    imgGroup.add(new THREE.Mesh(new THREE.BoxGeometry(w+0.1, h+0.1, 0.08), new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), emissive: new THREE.Color(colorHex), emissiveIntensity: 1.5, wireframe: true })));
                } else if (frameStyle === 'hologram') {
                    imgGroup.add(new THREE.Mesh(new THREE.BoxGeometry(w+0.2, h+0.2, 0.05), new THREE.MeshPhysicalMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.4, roughness: 0.1, transmission: 0.9 })));
                } else if (frameStyle === 'crystal') {
                    const cMesh = new THREE.Mesh(new THREE.BoxGeometry(w+0.3, h+0.3, 0.2), new THREE.MeshPhysicalMaterial({ color: new THREE.Color(colorHex), emissive: new THREE.Color(colorHex), emissiveIntensity: 0.5, roughness: 0.1, metalness: 0.9, clearcoat: 1.0 }));
                    cMesh.position.z = -0.1; imgGroup.add(cMesh);
                }

                if (backStyle === 'hologram' || backStyle === 'true') {
                    const bMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), createMaterial('matrix', colorHex));
                    bMesh.position.z = -0.04; bMesh.rotation.y = Math.PI; imgGroup.add(bMesh);
                }

                if (hasScanner) {
                    const lMesh = new THREE.Mesh(new THREE.BoxGeometry(w+0.2, 0.04, 0.06), new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex) }));
                    lMesh.position.z = 0.05; imgGroup.add(lMesh);
                    let lY = -h/2, lDir = 1;
                    animationCallbacks.push(() => { lY += 0.03 * lDir; if (lY > h/2 || lY < -h/2) lDir *= -1; lMesh.position.y = lY; });
                }

                let isDisintegrated = false, disProgress = 0;
                if (hasDisintegrate) {
                    const countP = 1500;
                    const pGeo = new THREE.BufferGeometry();
                    const posP = new Float32Array(countP * 3), origP = new Float32Array(countP * 3), velP = new Float32Array(countP * 3);
                    for (let i = 0; i < countP; i++) {
                        const px = (Math.random() - 0.5) * w, py = (Math.random() - 0.5) * h, pz = (Math.random() - 0.5) * 0.1;
                        origP[i*3] = px; origP[i*3+1] = py; origP[i*3+2] = pz;
                        posP[i*3] = px; posP[i*3+1] = py; posP[i*3+2] = pz;
                        velP[i*3] = (Math.random() - 0.5) * 2.5; velP[i*3+1] = (Math.random() - 0.5) * 2.5; velP[i*3+2] = Math.random() * 2.5 + 0.5;
                    }
                    pGeo.setAttribute('position', new THREE.BufferAttribute(posP, 3));
                    const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.06, color: new THREE.Color(colorHex), transparent: true, opacity: 0.9 }));
                    pMesh.visible = false; imgGroup.add(pMesh);

                    imgGroup.userData.triggerDisintegrate = () => { isDisintegrated = !isDisintegrated; };
                    imgGroup.children.forEach(child => { child.userData = imgGroup.userData; });

                    animationCallbacks.push(() => {
                        if (isDisintegrated && disProgress < 1.0) { disProgress += 0.04; planeMesh.visible = false; pMesh.visible = true; }
                        else if (!isDisintegrated && disProgress > 0) { disProgress -= 0.04; if (disProgress <= 0) { planeMesh.visible = true; pMesh.visible = false; } }
                        if (pMesh.visible) {
                            const arr = pMesh.geometry.attributes.position.array;
                            for (let i = 0; i < countP; i++) {
                                arr[i*3] = origP[i*3] + velP[i*3] * disProgress;
                                arr[i*3+1] = origP[i*3+1] + velP[i*3+1] * disProgress;
                                arr[i*3+2] = origP[i*3+2] + velP[i*3+2] * disProgress;
                            }
                            pMesh.geometry.attributes.position.needsUpdate = true;
                        }
                    });
                }
            });

            imgGroup.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            imgGroup.rotation.set(rx, ry, rz);
            imgGroup.scale.set(s, s, s);
            scene.add(imgGroup); customObjects.push(imgGroup);
        } else if (tagName === 'hotspot-pin') {
            const px = parseFloat(getAttr('x', '0')), py = parseFloat(getAttr('y', '1')), pz = parseFloat(getAttr('z', '0'));
            const titleText = getAttr('title', '3D Hotspot Pin'), priceText = getAttr('price', '$199'), detailText = getAttr('text', 'Interactive 3D Product Spec'), colorHex = getAttr('color', '#00f2fe');
            const pinGroup = new THREE.Group(); pinGroup.position.set(px, py, pz);
            const pinColor = new THREE.Color(colorHex);
            const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshStandardMaterial({ color: pinColor, emissive: pinColor, emissiveIntensity: 2.0 }));
            pinGroup.add(coreMesh);
            const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.02, 16, 32), new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, opacity: 0.8 }));
            ringMesh.rotation.x = Math.PI / 2; pinGroup.add(ringMesh);
            let ringPulse = 0;
            animationCallbacks.push(() => { ringPulse += 0.05; const scaleFactor = 1.0 + Math.sin(ringPulse) * 0.25; ringMesh.scale.set(scaleFactor, scaleFactor, scaleFactor); });
            pinGroup.userData = {
                isHotspot: true,
                triggerHotspot: () => {
                    alert('📍 ' + titleText + '\\n💰 ' + priceText + '\\nℹ️ ' + detailText);
                }
            };
            scene.add(pinGroup); customObjects.push(pinGroup);
        } else if (tagName === 'mesh-explode') {
            const count = parseInt(getAttr('count', '3000'));
            const colorHex = getAttr('color', '#00ffcc');
            const radius = parseFloat(getAttr('radius', '1.4'));
            const particleGeo = new THREE.BufferGeometry();
            const posArr = new Float32Array(count * 3);
            const origPos = new Float32Array(count * 3);
            const expVel = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = radius * Math.cbrt(Math.random());
                const px = r * Math.sin(phi) * Math.cos(theta), py = r * Math.sin(phi) * Math.sin(theta), pz = r * Math.cos(phi);
                origPos[i*3] = px; origPos[i*3+1] = py; origPos[i*3+2] = pz;
                posArr[i*3] = px; posArr[i*3+1] = py; posArr[i*3+2] = pz;
                const speed = Math.random() * 2.2 + 0.6;
                expVel[i*3] = (px/(r||1))*speed; expVel[i*3+1] = (py/(r||1))*speed; expVel[i*3+2] = (pz/(r||1))*speed;
            }
            particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
            const particleMesh = new THREE.Points(particleGeo, new THREE.PointsMaterial({ size: 0.08, color: new THREE.Color(colorHex), transparent: true, opacity: 0.95 }));
            const clickTarget = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.2, 16, 16), new THREE.MeshBasicMaterial({ visible: false }));
            const explodeGroup = new THREE.Group(); explodeGroup.add(particleMesh); explodeGroup.add(clickTarget);
            let isExploded = false, explodeProgress = 0;
            explodeGroup.userData = { triggerExplode: () => { isExploded = !isExploded; } };
            clickTarget.userData = explodeGroup.userData;
            animationCallbacks.push(() => {
                particleMesh.rotation.y += 0.008;
                if (isExploded && explodeProgress < 1.0) explodeProgress += 0.035;
                else if (!isExploded && explodeProgress > 0) explodeProgress -= 0.035;
                const pos = particleMesh.geometry.attributes.position.array;
                for (let i = 0; i < count; i++) {
                    pos[i*3] = origPos[i*3] + expVel[i*3] * explodeProgress * 2.2;
                    pos[i*3+1] = origPos[i*3+1] + expVel[i*3+1] * explodeProgress * 2.2;
                    pos[i*3+2] = origPos[i*3+2] + expVel[i*3+2] * explodeProgress * 2.2;
                }
                particleMesh.geometry.attributes.position.needsUpdate = true;
            });
            scene.add(explodeGroup); customObjects.push(explodeGroup); customObjects.push(clickTarget);
        } else if (tagName === 'particle-constellation') {
            const count = parseInt(getAttr('count', '120'));
            const maxDist = parseFloat(getAttr('max-dist', '2.2'));
            const colorHex = getAttr('color', '#00f2fe');
            const pGroup = new THREE.Group();
            const pPositions = [], pVelocities = [];
            for (let i = 0; i < count; i++) {
                pPositions.push(new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*8, (Math.random()-0.5)*10));
                pVelocities.push(new THREE.Vector3((Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02));
            }
            const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.45 });
            const lineGeo = new THREE.BufferGeometry();
            const maxLines = count * count;
            lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
            const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
            pGroup.add(lineMesh);
            const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);
            const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex) });
            const nodeMeshes = [];
            for (let i = 0; i < count; i++) {
                const nm = new THREE.Mesh(nodeGeo, nodeMat); nm.position.copy(pPositions[i]);
                pGroup.add(nm); nodeMeshes.push(nm);
            }
            animationCallbacks.push(() => {
                let lineIndex = 0;
                const posArray = lineMesh.geometry.attributes.position.array;
                for (let i = 0; i < count; i++) {
                    pPositions[i].add(pVelocities[i]);
                    if (Math.abs(pPositions[i].x) > 5) pVelocities[i].x *= -1;
                    if (Math.abs(pPositions[i].y) > 4) pVelocities[i].y *= -1;
                    if (Math.abs(pPositions[i].z) > 5) pVelocities[i].z *= -1;
                    nodeMeshes[i].position.copy(pPositions[i]);
                }
                for (let i = 0; i < count; i++) {
                    for (let j = i + 1; j < count; j++) {
                        const dist = pPositions[i].distanceTo(pPositions[j]);
                        if (dist < maxDist) {
                            posArray[lineIndex++] = pPositions[i].x; posArray[lineIndex++] = pPositions[i].y; posArray[lineIndex++] = pPositions[i].z;
                            posArray[lineIndex++] = pPositions[j].x; posArray[lineIndex++] = pPositions[j].y; posArray[lineIndex++] = pPositions[j].z;
                        }
                    }
                }
                lineMesh.geometry.setDrawRange(0, lineIndex / 3);
                lineMesh.geometry.attributes.position.needsUpdate = true;
            });
            scene.add(pGroup); customObjects.push(pGroup);
        } else if (tagName === 'cyber-wave') {
            const width = parseFloat(getAttr('width', '12')), height = parseFloat(getAttr('height', '12'));
            const colorHex = getAttr('color', '#00ffcc'), speed = parseFloat(getAttr('speed', '0.03'));
            const waveGeo = new THREE.PlaneGeometry(width, height, 30, 30);
            waveGeo.rotateX(-Math.PI / 2);
            const waveMesh = new THREE.Mesh(waveGeo, new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), emissive: new THREE.Color(colorHex), emissiveIntensity: 0.6, wireframe: true }));
            waveMesh.position.y = -2.2;
            let waveTime = 0;
            animationCallbacks.push(() => {
                waveTime += speed;
                const p = waveGeo.attributes.position.array;
                for (let i = 0; i < waveGeo.attributes.position.count; i++) {
                    const vx = p[i * 3], vz = p[i * 3 + 2];
                    p[i * 3 + 1] = Math.sin(vx * 0.8 + waveTime) * Math.cos(vz * 0.8 + waveTime) * 0.4;
                }
                waveGeo.attributes.position.needsUpdate = true;
            });
            scene.add(waveMesh); customObjects.push(waveMesh);
        } else if (tagName === 'cta-button') {
            const btnText = getAttr('text', 'DISCOVER DRONE 🚀');
            const btnUrl = getAttr('url', 'https://example.com');
            const btnColor = getAttr('color', '#00ffcc');
            const scale = parseFloat(getAttr('scale', '1.0'));
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.8 * scale, 0.9 * scale), new THREE.MeshBasicMaterial({ map: create3DTextTexture(btnText, btnColor), transparent: true, side: THREE.DoubleSide }));
            mesh.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '-1.8')), parseFloat(getAttr('z', '0')));
            mesh.userData = { url: btnUrl, isCTA: true };
            let t = 0; animationCallbacks.push(() => { t += 0.04; const s = scale * (1 + Math.sin(t) * 0.05); mesh.scale.set(s,s,s); });
            scene.add(mesh); customObjects.push(mesh);
        } else if (tagName === 'model-3d') {
            const preset = getAttr('preset', 'cyber_drone');
            const x = parseFloat(getAttr('x', '0')), y = parseFloat(getAttr('y', '0')), z = parseFloat(getAttr('z', '0'));
            const s = parseFloat(getAttr('scale', '1'));
            const color = getAttr('color', '#00f2fe');
            const matType = getAttr('material', 'neon');
            const dismantleFactor = parseFloat(getAttr('dismantle', '0'));

            let m;
            if (importedOBJRegistry[preset]) {
                m = importedOBJRegistry[preset].clone(true);
                m.traverse(child => {
                    if (child.isMesh) child.material = createMaterial(matType, color);
                });
            } else {
                m = createProceduralModelGroup(preset, color, matType);
            }
            attachExplodeEngineToGroup(m, dismantleFactor);
            m.position.set(x, y, z);
            m.scale.set(s, s, s);
            if (getAttr('animate', '').includes('spin')) animationCallbacks.push(() => { m.rotation.y += 0.015; });
            scene.add(m); customObjects.push(m);
        } else if (tagName === 'hyper-cube') {
            params4D.size = parseFloat(getAttr('size', '2.0'));
            params4D.rotXW = parseFloat(getAttr('rot-xw', '0.02'));
            params4D.rotYW = parseFloat(getAttr('rot-yw', '0.01'));
            params4D.rotZW = parseFloat(getAttr('rot-zw', '0.00'));
            createPolytopeMesh(getAttr('shape', 'tesseract'), getAttr('color', '#00f2fe'));
        } else if (tagName === 'text-3d') {
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 1.15), new THREE.MeshBasicMaterial({ map: create3DTextTexture(getAttr('text', '3D TEXT'), getAttr('color', '#00ffcc')), transparent: true, side: THREE.DoubleSide }));
            const x = parseFloat(getAttr('x', '0')), y = parseFloat(getAttr('y', '0')), z = parseFloat(getAttr('z', '0'));
            mesh.position.set(x, y, z);
            if (getAttr('animate', '').includes('float')) { let t = 0; const baseY = y; animationCallbacks.push(() => { t += 0.02; mesh.position.y = baseY + Math.sin(t) * 0.15; }); }
            scene.add(mesh);
        } else if (tagName === 'mesh-sphere') {
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(parseFloat(getAttr('radius', '1.5')), parseInt(getAttr('segments', '32')), parseInt(getAttr('segments', '32'))), createMaterial(getAttr('material', 'standard'), getAttr('color', '#ff007f')));
            const animate = getAttr('animate', '');
            if (animate.includes('spin')) animationCallbacks.push(() => { mesh.rotation.y += 0.01; });
            if (animate.includes('pulse')) { let t = 0; animationCallbacks.push(() => { t += 0.03; const s = 1 + Math.sin(t) * 0.1; mesh.scale.set(s,s,s); }); }
            scene.add(mesh);
        } else if (tagName === 'mesh-torus') {
            const r = parseFloat(getAttr('radius', '1.8')), tube = parseFloat(getAttr('tube', '0.4'));
            let geo = node.hasAttribute('p') ? new THREE.TorusKnotGeometry(r, tube, 128, 32, parseInt(getAttr('p', '2')), parseInt(getAttr('q', '3'))) : new THREE.TorusGeometry(r, tube, 32, 100);
            const mesh = new THREE.Mesh(geo, createMaterial(getAttr('material', 'neon'), getAttr('color', '#7928ca')));
            const animate = getAttr('animate', '');
            if (animate.includes('spin-x')) animationCallbacks.push(() => { mesh.rotation.x += 0.015; });
            if (animate.includes('spin-y')) animationCallbacks.push(() => { mesh.rotation.y += 0.015; });
            if (animate.includes('spin')) animationCallbacks.push(() => { mesh.rotation.x += 0.01; mesh.rotation.y += 0.015; });
            scene.add(mesh);
        } else if (tagName === 'mesh-box') {
            scene.add(new THREE.Mesh(new THREE.BoxGeometry(parseFloat(getAttr('width', '2')), parseFloat(getAttr('height', '2')), parseFloat(getAttr('depth', '2'))), createMaterial(getAttr('material', 'glass'), getAttr('color', '#00f2fe'))));
        } else if (tagName === 'mesh-cylinder') {
            scene.add(new THREE.Mesh(new THREE.CylinderGeometry(parseFloat(getAttr('radius', '1')), parseFloat(getAttr('radius', '1')), parseFloat(getAttr('height', '2.5')), 32), createMaterial(getAttr('material', 'glass'), getAttr('color', '#00f2fe'))));
        } else if (tagName === 'particles') {
            const count = parseInt(getAttr('count', '2000')), speed = parseFloat(getAttr('speed', '0.01'));
            const posArray = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i++) posArray[i] = (Math.random() - 0.5) * 16;
            const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.04, color: new THREE.Color(getAttr('color', '#00f2fe')), transparent: true, opacity: 0.8 }));
            animationCallbacks.push(() => { pts.rotation.y += speed; });
            scene.add(pts);
        } else if (tagName === 'particle-text') {
            const textStr = getAttr('text', 'CYBER 4D'), colorHex = getAttr('color', '#00f2fe'), count = parseInt(getAttr('count', '1200'));
            const offC = document.createElement('canvas'); offC.width = 256; offC.height = 64;
            const offCtx = offC.getContext('2d'); offCtx.font = 'bold 36px monospace'; offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle'; offCtx.fillStyle = '#ffffff'; offCtx.fillText(textStr, 128, 32);
            const imgData = offCtx.getImageData(0, 0, 256, 64).data;
            const letterPts = [];
            for (let ly = 0; ly < 64; ly += 2) for (let lx = 0; lx < 256; lx += 2) if (imgData[(ly*256+lx)*4] > 128) letterPts.push(new THREE.Vector3((lx-128)*0.035, (32-ly)*0.035, 0));
            const numPts = Math.min(count, letterPts.length || count);
            const posArr = new Float32Array(numPts * 3), origArr = new Float32Array(numPts * 3), velArr = new Float32Array(numPts * 3);
            for (let i = 0; i < numPts; i++) {
                const pt = letterPts[i % letterPts.length] || new THREE.Vector3(0,0,0);
                origArr[i*3] = pt.x; origArr[i*3+1] = pt.y; origArr[i*3+2] = pt.z;
                posArr[i*3] = pt.x; posArr[i*3+1] = pt.y; posArr[i*3+2] = pt.z;
                velArr[i*3] = (Math.random()-0.5)*3.5; velArr[i*3+1] = (Math.random()-0.5)*3.5; velArr[i*3+2] = (Math.random()-0.5)*3.5;
            }
            const ptGeo = new THREE.BufferGeometry(); ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
            const ptMesh = new THREE.Points(ptGeo, new THREE.PointsMaterial({ size: 0.07, color: new THREE.Color(colorHex), transparent: true, opacity: 0.9 }));
            const ptGroup = new THREE.Group(); ptGroup.add(ptMesh); ptGroup.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            let disperseProg = 0, isDispersed = false;
            ptGroup.userData = { triggerDisperse: () => { isDispersed = !isDispersed; } };
            animationCallbacks.push(() => {
                if (isDispersed && disperseProg < 1.0) disperseProg += 0.04; else if (!isDispersed && disperseProg > 0) disperseProg -= 0.04;
                const arr = ptMesh.geometry.attributes.position.array;
                for (let i = 0; i < numPts; i++) { arr[i*3] = origArr[i*3] + velArr[i*3]*disperseProg; arr[i*3+1] = origArr[i*3+1] + velArr[i*3+1]*disperseProg; arr[i*3+2] = origArr[i*3+2] + velArr[i*3+2]*disperseProg; }
                ptMesh.geometry.attributes.position.needsUpdate = true;
            });
            scene.add(ptGroup); customObjects.push(ptGroup);
        } else if (tagName === 'exploded-mesh') {
            const preset = getAttr('preset', 'cyber_drone'), factor = parseFloat(getAttr('factor', '0.8')), trigger = getAttr('trigger', 'hover'), colorHex = getAttr('color', '#00f2fe');
            const baseModel = createProceduralModelGroup(preset, colorHex, 'neon');
            baseModel.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            const originalPositions = []; baseModel.children.forEach(c => originalPositions.push(c.position.clone()));
            let currentFactor = trigger === 'always' ? factor : 0.0, isHoverExploded = false;
            baseModel.userData = {
                triggerHover: (h) => { if (trigger === 'hover') isHoverExploded = h; }
            };
            animationCallbacks.push(() => {
                baseModel.rotation.y += 0.01;
                if (trigger === 'hover') { currentFactor += ((isHoverExploded ? factor : 0.0) - currentFactor) * 0.1; }
                baseModel.children.forEach((c, i) => {
                    const orig = originalPositions[i]; if (!orig) return;
                    const dir = orig.length() > 0 ? orig.clone().normalize() : new THREE.Vector3(0,1,0);
                    c.position.copy(orig).add(dir.multiplyScalar(currentFactor * 1.5));
                });
            });
            scene.add(baseModel); customObjects.push(baseModel);
        } else if (tagName === 'pbr-mesh') {
            const shape = getAttr('shape', 'torus'), matType = getAttr('material', 'liquid-gold'), colorHex = getAttr('color', '#ffb703'), r = parseFloat(getAttr('radius', '1.6')), tube = parseFloat(getAttr('tube', '0.4'));
            let geo = shape === 'sphere' ? new THREE.SphereGeometry(r, 32, 32) : shape === 'box' ? new THREE.BoxGeometry(r*1.5, r*1.5, r*1.5) : shape === 'cylinder' ? new THREE.CylinderGeometry(r*0.8, r*0.8, r*2, 32) : new THREE.TorusGeometry(r, tube, 32, 64);
            const pbrMesh = new THREE.Mesh(geo, createMaterial(matType, colorHex));
            pbrMesh.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            animationCallbacks.push(() => { pbrMesh.rotation.x += 0.01; pbrMesh.rotation.y += 0.015; });
            scene.add(pbrMesh); customObjects.push(pbrMesh);
        } else if (tagName === 'liquid-metal') {
            const r = parseFloat(getAttr('radius', '1.4')), colorHex = getAttr('color', '#00f2fe'), speed = parseFloat(getAttr('speed', '0.04')), ripple = parseFloat(getAttr('ripple', '0.3'));
            const liquidMesh = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 64), new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), metalness: 0.95, roughness: 0.05 }));
            liquidMesh.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            const origPos = liquidMesh.geometry.attributes.position.array.slice(); let time = 0;
            animationCallbacks.push(() => {
                time += speed; const pos = liquidMesh.geometry.attributes.position.array;
                for (let i = 0; i < pos.length; i += 3) {
                    const wave = Math.sin(origPos[i] * 3.0 + time) * Math.cos(origPos[i+1] * 3.0 + time) * Math.sin(origPos[i+2] * 3.0 + time) * ripple;
                    const factor = 1.0 + wave * 0.2; pos[i] = origPos[i] * factor; pos[i+1] = origPos[i+1] * factor; pos[i+2] = origPos[i+2] * factor;
                }
                liquidMesh.geometry.attributes.position.needsUpdate = true; liquidMesh.rotation.y += 0.005;
            });
            scene.add(liquidMesh); customObjects.push(liquidMesh);
        } else if (tagName === 'forcefield') {
            const r = parseFloat(getAttr('radius', '2.2')), colorHex = getAttr('color', '#00ffcc'), pulseSpeed = parseFloat(getAttr('pulse', '0.03'));
            const sGroup = new THREE.Group(); sGroup.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            const outerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 3), new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), wireframe: true, transparent: true, opacity: 0.6 }));
            const innerMesh = new THREE.Mesh(new THREE.SphereGeometry(r * 0.96, 32, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.15, side: THREE.DoubleSide }));
            sGroup.add(outerMesh); sGroup.add(innerMesh);
            let pTimer = 0; animationCallbacks.push(() => { pTimer += pulseSpeed; const sf = 1.0 + Math.sin(pTimer) * 0.06; outerMesh.scale.set(sf, sf, sf); outerMesh.rotation.y += 0.01; outerMesh.rotation.x += 0.005; });
            scene.add(sGroup); customObjects.push(sGroup);
        } else if (tagName === 'dna-helix') {
            const r = parseFloat(getAttr('radius', '1.2')), h = parseFloat(getAttr('height', '4.5')), color1 = getAttr('color1', '#00f2fe'), color2 = getAttr('color2', '#ff007f'), speed = parseFloat(getAttr('speed', '0.02'));
            const dGroup = new THREE.Group(); dGroup.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            const count = 28, m1 = new THREE.MeshStandardMaterial({ color: new THREE.Color(color1), emissive: new THREE.Color(color1), emissiveIntensity: 1.5 }), m2 = new THREE.MeshStandardMaterial({ color: new THREE.Color(color2), emissive: new THREE.Color(color2), emissiveIntensity: 1.5 }), rm = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff'), transparent: true, opacity: 0.7 }), sg = new THREE.SphereGeometry(0.12, 16, 16);
            for (let i = 0; i < count; i++) {
                const t = (i / count) * Math.PI * 4, yP = (i / count) * h - h / 2;
                const n1 = new THREE.Mesh(sg, m1); n1.position.set(Math.cos(t) * r, yP, Math.sin(t) * r); dGroup.add(n1);
                const n2 = new THREE.Mesh(sg, m2); n2.position.set(Math.cos(t + Math.PI) * r, yP, Math.sin(t + Math.PI) * r); dGroup.add(n2);
                const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, r * 2, 8), rm); rung.position.set(0, yP, 0); rung.rotation.y = -t; rung.rotation.z = Math.PI / 2; dGroup.add(rung);
            }
            animationCallbacks.push(() => { dGroup.rotation.y += speed; });
            scene.add(dGroup); customObjects.push(dGroup);
        } else if (tagName === 'spatial-audio') {
            const r = parseFloat(getAttr('radius', '2.0')), colorHex = getAttr('color', '#ffb703'), speed = parseFloat(getAttr('speed', '0.04'));
            const aGroup = new THREE.Group(); aGroup.position.set(parseFloat(getAttr('x', '0')), parseFloat(getAttr('y', '1')), parseFloat(getAttr('z', '0')));
            const rm1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.8 }), rm2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.5 }), rm3 = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.25 });
            const ring1 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.4, 0.03, 16, 64), rm1), ring2 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.7, 0.03, 16, 64), rm2), ring3 = new THREE.Mesh(new THREE.TorusGeometry(r * 1.0, 0.03, 16, 64), rm3);
            [ring1, ring2, ring3].forEach(rg => rg.rotation.x = Math.PI / 2); aGroup.add(ring1); aGroup.add(ring2); aGroup.add(ring3);
            let aTimer = 0; animationCallbacks.push(() => {
                aTimer += speed; const s1 = 0.4 + (aTimer % 1) * 0.8, s2 = 0.4 + ((aTimer + 0.33) % 1) * 0.8, s3 = 0.4 + ((aTimer + 0.66) % 1) * 0.8;
                ring1.scale.set(s1, s1, s1); rm1.opacity = Math.max(0, 1.0 - (s1 / 1.2));
                ring2.scale.set(s2, s2, s2); rm2.opacity = Math.max(0, 1.0 - (s2 / 1.2));
                ring3.scale.set(s3, s3, s3); rm3.opacity = Math.max(0, 1.0 - (s3 / 1.2));
            });
            scene.add(aGroup); customObjects.push(aGroup);
        } else if (tagName === 'light-point') {
            const ptLight = new THREE.PointLight(new THREE.Color(getAttr('color', '#ffffff')), parseFloat(getAttr('intensity', '2.0')), 50);
            ptLight.position.set(parseFloat(getAttr('x', '5')), parseFloat(getAttr('y', '5')), parseFloat(getAttr('z', '5')));
            scene.add(ptLight);
        }
    });

    const scriptMatch = userCode.match(/<script>([\\s\\S]*?)<\\/script>/i);
    if (scriptMatch && scriptMatch[1]) {
        try {
            const fn = new Function('scene', 'THREE', 'onFrame', scriptMatch[1]);
            fn(scene, THREE, (cb) => animationCallbacks.push(cb));
        } catch(e){}
    }

    let isRenderingActive = true;
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { isRenderingActive = entry.isIntersecting; });
        }, { threshold: 0.1 });
        observer.observe(container);
    }

    function updateLayoutSize() {
        const dims = getContainerDimensions();
        if (dims.width > 0 && dims.height > 0) {
            const currentAspect = dims.width / dims.height;
            if (Math.abs(camera.aspect - currentAspect) > 0.001 || canvas.width !== dims.width || canvas.height !== dims.height) {
                camera.aspect = currentAspect;
                camera.updateProjectionMatrix();
                renderer.setSize(dims.width, dims.height, false);
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        updateLayoutSize();
        if (!isRenderingActive) return;
        if (warpParticles) {
            const pos = warpParticles.geometry.attributes.position.array;
            const vels = warpParticles.userData.velocities;
            for (let i = 0; i < vels.length; i++) {
                pos[i * 3 + 2] += vels[i] * 2.0;
                if (pos[i * 3 + 2] > 20) pos[i * 3 + 2] = -20;
            }
            warpParticles.geometry.attributes.position.needsUpdate = true;
        }
        if (polytopeMeshGroup) updatePolytope4D();
        animationCallbacks.forEach(cb => cb());
        if (controls) controls.update();
        renderer.render(scene, camera);
    }
    canvas.addEventListener('click', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(((e.clientX - rect.left)/rect.width)*2-1, -((e.clientY - rect.top)/rect.height)*2+1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        let handled = false;
        // Walk every intersected object AND its full parent chain
        for (let ii = 0; ii < intersects.length && !handled; ii++) {
            let node = intersects[ii].object;
            while (node && !handled) {
                if (node.userData) {
                    if (typeof node.userData.triggerDisintegrate === 'function') {
                        node.userData.triggerDisintegrate();
                        handled = true;
                    } else if (node.userData.isParticleText && typeof node.userData.triggerDisperse === 'function') {
                        node.userData.triggerDisperse();
                        handled = true;
                    } else if (node.userData.isExplodable && typeof node.userData.triggerExplode === 'function') {
                        node.userData.triggerExplode();
                        handled = true;
                    } else if (node.userData.isHotspot && typeof node.userData.triggerHotspot === 'function') {
                        node.userData.triggerHotspot();
                        handled = true;
                    } else if (node.userData.url) {
                        let targetUrl = node.userData.url;
                        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                            targetUrl = 'https://' + targetUrl;
                        }
                        try {
                            const newWin = window.open(targetUrl, '_blank');
                            if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
                                window.location.href = targetUrl;
                            }
                        } catch(err) {
                            window.location.href = targetUrl;
                        }
                        handled = true;
                    }
                }
                if (!node.parent || node.parent === scene) break;
                node = node.parent;
            }
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(((e.clientX - rect.left)/rect.width)*2-1, -((e.clientY - rect.top)/rect.height)*2+1);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        let hovered = false;
        if (intersects.length > 0) {
            let hit = intersects[0].object;
            while (hit) {
                if (hit.userData) {
                    if (hit.userData.triggerHover) hit.userData.triggerHover(true);
                    if (hit.userData.isVoiceAvatar || hit.userData.isParticleText || hit.userData.isHotspot || hit.userData.url) {
                        hovered = true;
                    }
                }
                if (!hit.parent || hit.parent === scene) break;
                hit = hit.parent;
            }
        }
        canvas.style.cursor = hovered ? 'pointer' : 'default';
    });

    updateLayoutSize();
    animate();

    window.addEventListener('resize', updateLayoutSize);
})();
</script>
</body>
</html>`;
    }

    // ══════════════════════════════════════════════════════════════════════
    // 💎 IA CODE STUDIO PREMIUM AUTH & PAYWALL PROTECTION ENGINE
    // ══════════════════════════════════════════════════════════════════════
    function isUserPremium() {
        try {
            const session = localStorage.getItem('genius_session');
            if (session) {
                const user = JSON.parse(session);
                const email = (user && user.email) ? user.email.toLowerCase() : '';
                if (email === 'andart1174@gmail.com') return true;

                const premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
                const record = premiumList.find(p => p.email && p.email.toLowerCase() === email);
                if (record) {
                    const now = Date.now();
                    const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
                    const daysLeft = Math.ceil((expiry - now) / 86400000);
                    const isUnlimited = record.days === 9999;
                    if (isUnlimited || daysLeft > 0) return true;
                }
            }
        } catch (e) {
            console.warn('[Premium Check] Error parsing session:', e);
        }
        return false;
    }

    function showPaywallModal() {
        let modal = document.getElementById('community-paywall-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'community-paywall-modal';
            modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:1000000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Outfit\',\'Inter\',system-ui,sans-serif;';

            modal.innerHTML = 
                '<div style="background:linear-gradient(145deg,#0d1322,#070a14);border-radius:20px;border:1px solid rgba(255,138,0,0.25);width:100%;max-width:440px;padding:36px 30px;box-shadow:0 25px 60px rgba(0,0,0,0.7),0 0 35px rgba(255,138,0,0.12);text-align:center;color:#fff;position:relative;animation:paywall-zoom 0.3s cubic-bezier(0.34,1.56,0.64,1);">' +
                    '<style>' +
                        '@keyframes paywall-zoom { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
                        '.paywall-go-btn { background:linear-gradient(90deg,#ff8a00,#d946ef);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:900;width:100%;cursor:pointer;box-shadow:0 8px 24px rgba(255,138,0,0.35);transition:all 0.25s ease;margin-top:20px;text-transform:uppercase;letter-spacing:0.5px; }' +
                        '.paywall-go-btn:hover { transform:translateY(-2px);box-shadow:0 12px 28px rgba(255,138,0,0.5);filter:brightness(1.08); }' +
                        '.paywall-close-btn { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:11px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:10px;width:100%; }' +
                        '.paywall-close-btn:hover { background:rgba(255,255,255,0.1);color:#fff; }' +
                    '</style>' +
                    '<div style="font-size:46px;margin-bottom:12px;filter:drop-shadow(0 0 16px rgba(0,242,254,0.6));">💎</div>' +
                    '<h3 id="paywall-title" style="font-size:23px;font-weight:800;margin:0 0 14px;background:linear-gradient(90deg,#ff8a00,#ff007f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-0.3px;">🔒 Fonctionnalité Premium</h3>' +
                    '<p id="paywall-desc" style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">La copie, l\'exportation de code et le déploiement cloud sont réservés aux membres premium de <strong>IA Code Studio</strong>.</p>' +
                    '<button class="paywall-go-btn" id="paywall-go-btn-modal">💎 DEVENIR PREMIUM ($10/MOIS)</button>' +
                    '<button class="paywall-close-btn" id="paywall-close-btn-modal">Fermer</button>' +
                '</div>';

            document.body.appendChild(modal);

            document.getElementById('paywall-go-btn-modal').onclick = function () {
                window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank');
            };

            document.getElementById('paywall-close-btn-modal').onclick = function () {
                modal.style.display = 'none';
            };

            modal.onclick = function(e) {
                if (e.target === modal) modal.style.display = 'none';
            };
        }

        const isFR = (typeof currentLang !== 'undefined' && currentLang === 'fr') || (localStorage.getItem('hub_lang') === 'fr');
        const titleEl = document.getElementById('paywall-title');
        const descEl = document.getElementById('paywall-desc');
        const goBtn = document.getElementById('paywall-go-btn-modal');
        const closeBtn = document.getElementById('paywall-close-btn-modal');

        if (isFR) {
            if (titleEl) titleEl.textContent = '🔒 Fonctionnalité Premium';
            if (descEl) descEl.innerHTML = 'La copie, l\'exportation de code et le déploiement cloud sont réservés aux membres premium de <strong>IA Code Studio</strong>.';
            if (goBtn) goBtn.textContent = '💎 DEVENIR PREMIUM ($10/MOIS)';
            if (closeBtn) closeBtn.textContent = 'Fermer';
        } else {
            if (titleEl) titleEl.textContent = '🔒 Premium Feature';
            if (descEl) descEl.innerHTML = 'Copying, exporting code and cloud deployment are reserved for premium members of <strong>IA Code Studio</strong>.';
            if (goBtn) goBtn.textContent = '💎 BECOME PREMIUM ($10/MONTH)';
            if (closeBtn) closeBtn.textContent = 'Close';
        }

        modal.style.display = 'flex';
    }

    window.isUserPremium = isUserPremium;
    window.showPaywallModal = showPaywallModal;

    // Global Capturing Phase Interceptor for Premium Export & Copy Features
    document.addEventListener('click', function(e) {
        const target = e.target.closest('#btn-export-html, #btn-export-obj, #btn-framework-export, #btn-copy-framework, #btn-export-embed, #btn-copy-embed, #btn-screenshot, #btn-web-templates, #card-template-saas, #card-template-crypto, #card-template-agency, #btn-copy-code');
        if (target) {
            if (!isUserPremium()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                playClickSFX();
                showPaywallModal();
            }
        }
    }, true);

    // Intercept copy/cut on code editor for non-premium
    ['copy', 'cut'].forEach(evt => {
        document.addEventListener(evt, function(e) {
            const activeTag = document.activeElement ? document.activeElement.tagName : '';
            if (activeTag === 'TEXTAREA' || activeTag === 'INPUT' || (window.getSelection && window.getSelection().toString().length > 5)) {
                if (!isUserPremium()) {
                    e.preventDefault();
                    e.stopPropagation();
                    showPaywallModal();
                }
            }
        });
    });

    document.getElementById('btn-export-embed').addEventListener('click', () => {
        if (!isUserPremium()) { showPaywallModal(); return; }
        playClickSFX();
        const userCode = codeEditor.value;
        const embedHTML = generateStandaloneHTML(userCode, false);
        document.getElementById('embed-code-area').value = embedHTML;
        document.getElementById('modal-embed').classList.add('active');
    });

    document.getElementById('btn-export-html').addEventListener('click', () => {
        if (!isUserPremium()) { showPaywallModal(); return; }
        playClickSFX();
        const userCode = codeEditor.value;
        const htmlContent = generateStandaloneHTML(userCode, true);
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'hyperstudio-3d-model.html';
        link.click();
    });

    document.getElementById('btn-close-embed').addEventListener('click', () => {
        playClickSFX();
        document.getElementById('modal-embed').classList.remove('active');
    });

    document.getElementById('btn-copy-embed').addEventListener('click', () => {
        if (!isUserPremium()) { showPaywallModal(); return; }
        playClickSFX();
        const area = document.getElementById('embed-code-area');
        area.select();
        document.execCommand('copy');
        alert(translations[currentLang].copied_notice);
    });

    document.getElementById('btn-screenshot').addEventListener('click', () => {
        if (!isUserPremium()) { showPaywallModal(); return; }
        playClickSFX();
        renderer.render(scene, camera);
        const dataURL = renderer.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'hyperstudio-3d-4d-render.png';
        link.href = dataURL;
        link.click();
    });

    document.getElementById('btn-export-obj').addEventListener('click', () => {
        if (!isUserPremium()) { showPaywallModal(); return; }
        playClickSFX();
        if (typeof THREE.OBJExporter === 'undefined') {
            alert('OBJ Exporter loading...');
            return;
        }
        const exporter = new THREE.OBJExporter();
        const result = exporter.parse(scene);
        const blob = new Blob([result], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'hyperstudio-model.obj';
        link.click();
    });

    // ══════════════════════════════════════════════════════════════════════
    // 🎥 1-CLICK TIKTOK & SHORTS 3D VIDEO / GIF RECORDER ENGINE
    // ══════════════════════════════════════════════════════════════════════
    let tiktokRecorder = null;
    let tiktokRecordedChunks = [];
    let isRecordingTiktokVideo = false;
    let tiktokRecordingTimer = null;

    const modalVideoRecorder = document.getElementById('modal-video-recorder');
    const hudRecordingOverlay = document.getElementById('hud-recording-overlay');
    const recordingStatusText = document.getElementById('recording-status-text');
    const recordedVideoPlayer = document.getElementById('recorded-video-player');
    const btnDownloadVideoFile = document.getElementById('btn-download-video-file');
    const btnRecordVideo = document.getElementById('btn-record-video');
    const btnHudRecord = document.getElementById('btn-hud-record');
    const btnCloseVideoModal = document.getElementById('btn-close-video-modal');
    const btnCloseVideoModalFooter = document.getElementById('btn-close-video-modal-footer');

    function toggleVideoRecording() {
        if (isRecordingTiktokVideo) {
            stopVideoRecording();
        } else {
            startVideoRecording(10);
        }
    }

    function startVideoRecording(duration = 10) {
        if (isRecordingTiktokVideo) return;
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) return;

        playClickSFX();
        tiktokRecordedChunks = [];

        let stream;
        try {
            stream = canvas.captureStream ? canvas.captureStream(60) : canvas.mozCaptureStream(60);
        } catch (e) {
            console.warn('Canvas stream capture error:', e);
        }

        if (!stream) {
            alert('Video recording is not supported in this browser.');
            return;
        }

        const mimeTypes = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
        let chosenMime = '';
        for (let m of mimeTypes) {
            if (MediaRecorder.isTypeSupported(m)) {
                chosenMime = m;
                break;
            }
        }

        try {
            tiktokRecorder = chosenMime ? new MediaRecorder(stream, { mimeType: chosenMime }) : new MediaRecorder(stream);
        } catch (e) {
            console.error('MediaRecorder fallback:', e);
            tiktokRecorder = new MediaRecorder(stream);
        }

        tiktokRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
                tiktokRecordedChunks.push(e.data);
            }
        };

        tiktokRecorder.onstop = () => {
            clearInterval(tiktokRecordingTimer);
            isRecordingTiktokVideo = false;
            if (hudRecordingOverlay) hudRecordingOverlay.style.display = 'none';
            if (btnRecordVideo) btnRecordVideo.innerHTML = '<i class="fa-solid fa-video"></i> <span>TikTok / 3D Clip 🎥</span>';
            if (btnHudRecord) btnHudRecord.innerHTML = '<i class="fa-solid fa-video"></i> <span>Rec Clip 🎥</span>';

            const blob = new Blob(tiktokRecordedChunks, { type: chosenMime || 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);

            if (recordedVideoPlayer) {
                recordedVideoPlayer.src = videoUrl;
                recordedVideoPlayer.play();
            }
            if (btnDownloadVideoFile) {
                btnDownloadVideoFile.href = videoUrl;
                btnDownloadVideoFile.download = `ia-codestudio-3d-${Date.now()}.webm`;
            }

            if (modalVideoRecorder) {
                playClickSFX();
                modalVideoRecorder.classList.add('active');
            }
        };

        tiktokRecorder.start(100);
        isRecordingTiktokVideo = true;

        if (hudRecordingOverlay) hudRecordingOverlay.style.display = 'flex';
        if (recordingStatusText) recordingStatusText.textContent = `REC 00:00 / 00:${duration < 10 ? '0' + duration : duration} (TikTok 9:16 HD)`;
        if (btnRecordVideo) btnRecordVideo.innerHTML = '<i class="fa-solid fa-stop"></i> <span>Stop REC ⏹️</span>';
        if (btnHudRecord) btnHudRecord.innerHTML = '<i class="fa-solid fa-stop"></i> <span>Stop REC ⏹️</span>';

        let elapsed = 0;
        tiktokRecordingTimer = setInterval(() => {
            elapsed++;
            const secStr = elapsed < 10 ? '0' + elapsed : elapsed;
            const durStr = duration < 10 ? '0' + duration : duration;
            if (recordingStatusText) recordingStatusText.textContent = `REC 00:${secStr} / 00:${durStr} (TikTok 9:16 HD)`;

            if (elapsed >= duration) {
                stopVideoRecording();
            }
        }, 1000);
    }

    function stopVideoRecording() {
        if (tiktokRecorder && tiktokRecorder.state !== 'inactive') {
            tiktokRecorder.stop();
        }
        clearInterval(tiktokRecordingTimer);
    }

    if (btnRecordVideo) btnRecordVideo.addEventListener('click', toggleVideoRecording);
    if (btnHudRecord) btnHudRecord.addEventListener('click', toggleVideoRecording);
    if (btnCloseVideoModal) btnCloseVideoModal.addEventListener('click', () => {
        playClickSFX();
        if (recordedVideoPlayer) recordedVideoPlayer.pause();
        if (modalVideoRecorder) modalVideoRecorder.classList.remove('active');
    });
    if (btnCloseVideoModalFooter) btnCloseVideoModalFooter.addEventListener('click', () => {
        playClickSFX();
        if (recordedVideoPlayer) recordedVideoPlayer.pause();
        if (modalVideoRecorder) modalVideoRecorder.classList.remove('active');
    });

    const shareRecordedClip = (platform) => {
        const text = encodeURIComponent('🚀 Check out this 3D WebGL creation made with IA Code Studio! Try it free: https://ia-codestudio.com #threejs #webgl #coding #ai');
        const url = encodeURIComponent('https://ia-codestudio.com/hyperstudio-3d-4d/');
        if (navigator.clipboard) {
            navigator.clipboard.writeText('https://ia-codestudio.com/hyperstudio-3d-4d/');
        }
        if (platform === 'tiktok') window.open('https://www.tiktok.com/upload?lang=en', '_blank');
        else if (platform === 'youtube') window.open('https://studio.youtube.com/channel/UC/videos/upload?d=ud', '_blank');
        else if (platform === 'instagram') window.open('https://www.instagram.com/', '_blank');
        else if (platform === 'whatsapp') window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    };

    const btnShareClipTiktok = document.getElementById('btn-share-clip-tiktok');
    if (btnShareClipTiktok) btnShareClipTiktok.addEventListener('click', () => shareRecordedClip('tiktok'));
    const btnShareClipYoutube = document.getElementById('btn-share-clip-youtube');
    if (btnShareClipYoutube) btnShareClipYoutube.addEventListener('click', () => shareRecordedClip('youtube'));
    const btnShareClipInstagram = document.getElementById('btn-share-clip-instagram');
    if (btnShareClipInstagram) btnShareClipInstagram.addEventListener('click', () => shareRecordedClip('instagram'));
    const btnShareClipWhatsapp = document.getElementById('btn-share-clip-whatsapp');
    if (btnShareClipWhatsapp) btnShareClipWhatsapp.addEventListener('click', () => shareRecordedClip('whatsapp'));

    window.addEventListener('DOMContentLoaded', () => {
        init3DEngine();
        setLanguage('en');

        const btnScrollLeft = document.getElementById('btn-scroll-left');
        const btnScrollRight = document.getElementById('btn-scroll-right');
        const viewportControls = document.getElementById('viewport-controls');

        if (btnScrollLeft && viewportControls) {
            btnScrollLeft.addEventListener('click', () => {
                playClickSFX();
                viewportControls.scrollBy({ left: -220, behavior: 'smooth' });
            });
        }

        if (btnScrollRight && viewportControls) {
            btnScrollRight.addEventListener('click', () => {
                playClickSFX();
                viewportControls.scrollBy({ left: 220, behavior: 'smooth' });
            });
        }

        const btnHdrScrollLeft = document.getElementById('btn-hdr-scroll-left');
        const btnHdrScrollRight = document.getElementById('btn-hdr-scroll-right');
        const headerControls = document.getElementById('header-controls');

        if (btnHdrScrollLeft && headerControls) {
            btnHdrScrollLeft.addEventListener('click', () => {
                playClickSFX();
                headerControls.scrollBy({ left: -220, behavior: 'smooth' });
            });
        }

        if (btnHdrScrollRight && headerControls) {
            btnHdrScrollRight.addEventListener('click', () => {
                playClickSFX();
                headerControls.scrollBy({ left: 220, behavior: 'smooth' });
            });
        }

        ['.viewport-controls', '.header-controls', '.editor-quick-tools', '.ai-quick-chips', '.header-actions'].forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                el.addEventListener('wheel', (e) => {
                    if (e.deltaY !== 0) {
                        e.preventDefault();
                        el.scrollLeft += e.deltaY;
                    }
                }, { passive: false });
            }
        });

        document.querySelectorAll('.btn, .v-btn, .speed-btn, .snippet-tag, .ai-chip, .gallery-card, .fw-tab').forEach(el => {
            el.addEventListener('mouseenter', playHoverSFX);
        });

        codeEditor.value = presetTemplates.cyber_drone;
        updateLineNumbers();
        runCode();
        setTimeout(() => {
            if (window.onViewportResize) window.onViewportResize();
        }, 60);
    });

})();

/* ==========================================================================
   Toolbar Group Navigation (Tab Groups for Header Compartments)
   ========================================================================== */
(function() {
    const tabBtns       = document.querySelectorAll('.toolbar-tab-btn');
    const panelsRow     = document.getElementById('toolbar-panels-row');
    const allPanels     = document.querySelectorAll('.toolbar-panel');
    let   activeGroup   = null;

    function openGroup(group) {
        // Deactivate all
        tabBtns.forEach(b => b.classList.remove('active'));
        allPanels.forEach(p => p.classList.remove('active'));

        const panel = document.getElementById('group-' + group);
        const btn   = document.querySelector(`.toolbar-tab-btn[data-group="${group}"]`);

        if (panel && btn) {
            btn.classList.add('active');
            panel.classList.add('active');
            panelsRow.classList.add('open');
            activeGroup = group;
        }
    }

    function closeAll() {
        tabBtns.forEach(b => b.classList.remove('active'));
        allPanels.forEach(p => p.classList.remove('active'));
        panelsRow.classList.remove('open');
        activeGroup = null;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            if (activeGroup === group) {
                closeAll();          // click again → toggle off
            } else {
                openGroup(group);
            }
        });
    });

    // Escape key closes the open panel
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && activeGroup) closeAll();
    });

    // Click outside the header closes the panel
    document.addEventListener('click', e => {
        if (activeGroup && !e.target.closest('.app-header')) closeAll();
    });
})();

// ══════════════════════════════════════════════════════════════════════
// UNIVERSAL <hyper-3d> WEB COMPONENT CUSTOM ELEMENT DEFINITION
// ══════════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    class UniversalHyper3DElement extends HTMLElement {
        connectedCallback() {
            if (this.dataset.rendered) return;
            this.dataset.rendered = "true";
            const preset = this.getAttribute('preset') || 'space_fighter';
            const color = this.getAttribute('color') || '#00f2fe';
            const autoRot = this.getAttribute('auto-rotate') !== 'false';
            const w = this.clientWidth || 400, h = this.clientHeight || 350;

            if (typeof THREE !== 'undefined') {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
                camera.position.set(0, 2.5, 6);
                const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(w, h);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                this.appendChild(renderer.domElement);

                scene.add(new THREE.AmbientLight(0xffffff, 0.8));
                const dir = new THREE.DirectionalLight(0xffffff, 1.2);
                dir.position.set(5, 10, 5);
                scene.add(dir);

                let model;
                if (typeof createProceduralModelGroup === 'function') {
                    model = createProceduralModelGroup(preset, color, 'neon');
                } else {
                    const mat = new THREE.MeshPhongMaterial({ color: new THREE.Color(color), emissive: new THREE.Color(color), emissiveIntensity: 0.3 });
                    model = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.35, 100, 16), mat);
                }
                scene.add(model);

                let controls;
                if (typeof THREE.OrbitControls !== 'undefined') {
                    controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                }

                const loop = () => {
                    requestAnimationFrame(loop);
                    if (autoRot && model) model.rotation.y += 0.012;
                    if (controls) controls.update();
                    renderer.render(scene, camera);
                };
                loop();
            }
        }
    }
    if (!customElements.get('hyper-3d')) {
        customElements.define('hyper-3d', UniversalHyper3DElement);
    }
}

