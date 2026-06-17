// AD-GENIUS AI — Core Logic & Code Generators

// ==========================================
// 1. LOCALIZATION DICTIONARY (EN / FR)
// ==========================================
const translations = {
    en: {
        panel_settings_title: "Ad Configuration",
        panel_settings_subtitle: "Create conversion-optimized ads",
        sec_format: "1. Ad Format",
        label_format: "Select Layout Type",
        opt_exit_intent: "Exit-Intent Popup",
        opt_sticky_bar: "Sticky Header Bar",
        opt_slide_in: "Corner Slide-in Card",
        sec_ai_copywriter: "2. AI Copywriter (AIDA/PAS)",
        label_industry: "Business Category",
        opt_ecommerce: "E-Commerce & Retail",
        opt_saas: "SaaS & Tech Software",
        opt_realestate: "Real Estate & Agency",
        opt_services: "Local Business & Services",
        label_product_desc: "Describe your Offer",
        label_framework: "Marketing Framework",
        btn_generate_copy: "Generate High-Converting Copy",
        sec_content: "3. Fine-Tune Content",
        label_title: "Headline",
        label_desc: "Description / Body Text",
        label_btn_text: "Button Text",
        label_btn_url: "Target URL",
        sec_design: "4. Visual Aesthetics",
        label_color_primary: "Primary Color",
        label_color_accent: "Accent Glow",
        label_opacity: "Background Glass Opacity",
        label_glow: "Neon Border Glow",
        panel_preview_title: "Interactive Live Preview",
        panel_preview_subtitle: "Test behaviors, transitions, and hover triggers",
        toggle_heatmap: "🔥 Show Click Heatmap",
        dash_title: "📈 Conversion Intelligence Dashboard",
        dash_ctr_label: "Simulated CTR (Click Rate)",
        dash_score_label: "Ad Copy Quality Score",
        dash_tips_title: "Optimization Feedback",
        dash_tip_default: "Add a clear sense of urgency (e.g. 'Limited Time') to increase clicks by up to 25%.",
        panel_code_title: "Integration Code",
        panel_code_subtitle: "Embed this optimized code block inside your site",
        btn_copy: "Copy Code",
        btn_copied: "Copied! ✅",
        btn_download: "Download HTML",
        guide_title: "How to Install",
        guide_step_1: "Copy the generated script code using the button above.",
        guide_step_2: "Paste it inside the <body> tag of your web pages.",
        guide_step_3: "Exit-Intent popups trigger automatically when users leave. Sticky bars appear instantly at the top/bottom.",
        btn_back: "Back to Studios",
        card_sr_title: "3D Product Showroom",
        card_sr_desc: "Create interactive 3D product banners with custom labels.",
        card_sc_title: "Scratch Card Studio",
        card_sc_desc: "Design gamified scratch-off cards to reveal promotions."
    },
    fr: {
        panel_settings_title: "Configuration de la Pub",
        panel_settings_subtitle: "Créez des publicités optimisées",
        sec_format: "1. Format Publicitaire",
        label_format: "Type de mise en page",
        opt_exit_intent: "Popup d'Intention de Sortie",
        opt_sticky_bar: "Barre En-tête Collante",
        opt_slide_in: "Carte Glissante d'Angle",
        sec_ai_copywriter: "2. Copywriter AI (AIDA/PAS)",
        label_industry: "Catégorie de l'entreprise",
        opt_ecommerce: "E-Commerce & Vente",
        opt_saas: "SaaS & Logiciel Tech",
        opt_realestate: "Immobilier & Agence",
        opt_services: "Commerce Local & Services",
        label_product_desc: "Décrivez votre Offre",
        label_framework: "Structure Marketing",
        btn_generate_copy: "Générer une Copie Optimisée",
        sec_content: "3. Ajuster le Contenu",
        label_title: "Titre principal",
        label_desc: "Description / Corps du texte",
        label_btn_text: "Texte du bouton",
        label_btn_url: "URL cible du bouton",
        sec_design: "4. Esthétique Visuelle",
        label_color_primary: "Couleur principale",
        label_color_accent: "Lueur d'accent",
        label_opacity: "Opacité de l'arrière-plan en verre",
        label_glow: "Glow de bordure néon",
        panel_preview_title: "Aperçu Interactif Réel",
        panel_preview_subtitle: "Testez les comportements et les animations au survol",
        toggle_heatmap: "🔥 Afficher Heatmap de Clic",
        dash_title: "📈 Tableau de Bord de Conversion Intelligent",
        dash_ctr_label: "CTR Simulé (Taux de Clic)",
        dash_score_label: "Score de Qualité de Copie",
        dash_tips_title: "Conseils d'Optimisation",
        dash_tip_default: "Ajoutez un sentiment d'urgence (ex: 'Temps limité') pour augmenter les clics de 25%.",
        panel_code_title: "Code d'Intégration",
        panel_code_subtitle: "Intégrez ce bloc de code optimisé sur votre site",
        btn_copy: "Copier le Code",
        btn_copied: "Copié ! ✅",
        btn_download: "Télécharger HTML",
        guide_title: "Comment l'installer",
        guide_step_1: "Copiez le code du script généré ci-dessus.",
        guide_step_2: "Collez-le n'importe où dans la balise <body> de votre site.",
        guide_step_3: "Le popup d'intention de sortie s'active au départ. La barre collante apparaît instantanément en haut/bas.",
        btn_back: "Retour aux Studios",
        card_sr_title: "Showroom Produit 3D",
        card_sr_desc: "Créez des bannières produits 3D interactives avec étiquettes personnalisées.",
        card_sc_title: "Studio Carte à Gratter",
        card_sc_desc: "Concevez des cartes à gratter ludiques pour révéler des promotions."
    }
};

let currentLang = 'en';

// ==========================================
// 2. COPYWRITING PRESETS
// ==========================================
const copywritingPresets = {
    ecommerce: {
        aida: {
            en: { title: "DON'T MISS OUT! 🛍️", desc: "Discover our bestsellers with an exclusive 20% discount. Limited stocks available, grab yours today!" },
            fr: { title: "OFFRE EXCEPTIONNELLE ! 🛍️", desc: "Découvrez nos best-sellers avec 20% de réduction exclusive. Stocks limités, profitez-en aujourd'hui !" }
        },
        pas: {
            en: { title: "Tired of High Prices? 💸", desc: "Shopping online shouldn't break the bank. Get premium quality products at direct-to-consumer prices now." },
            fr: { title: "Marre des prix élevés ? 💸", desc: "Faire du shopping ne devrait pas vous ruiner. Obtenez une qualité premium au meilleur prix direct usine." }
        }
    },
    saas: {
        aida: {
            en: { title: "WORK 10x FASTER ⚡", desc: "Unlock advanced AI automation tools. Streamline your workflow and scale your business with ease." },
            fr: { title: "TRAVAILLEZ 10x PLUS VITE ⚡", desc: "Débloquez des outils d'automatisation IA avancés. Simplifiez vos tâches et boostez votre croissance." }
        },
        pas: {
            en: { title: "Cluttered Workflow? 🌪️", desc: "Managing business tools is overwhelming. Centralize your entire system into one clean workspace today." },
            fr: { title: "Tâches désorganisées ? 🌪️", desc: "Gérer vos outils est fatigant. Centralisez votre flux de travail dans un espace unique et intuitif." }
        }
    },
    realestate: {
        aida: {
            en: { title: "FIND YOUR DREAM HOME 🏡", desc: "Browse off-market premium listings in your area. Secure low rates and book a private tour now." },
            fr: { title: "MAISON DE VOS RÊVES 🏡", desc: "Découvrez des biens immobiliers exclusifs hors marché. Réservez une visite privée dès maintenant." }
        },
        pas: {
            en: { title: "Struggling to Sell? 📉", desc: "Finding qualified buyers is hard. List your property with our AI-powered matchmaking tool for instant offers." },
            fr: { title: "Difficulté à vendre ? 📉", desc: "Trouver des acheteurs qualifiés est difficile. Vendez plus vite grâce à notre ciblage intelligent instantané." }
        }
    },
    services: {
        aida: {
            en: { title: "NEED A PRO FAST? 🛠️", desc: "Top-rated local experts ready to help. 100% satisfaction guaranteed, get a free quote in 5 minutes!" },
            fr: { title: "BESOIN D'UN PRO VITÉ ? 🛠️", desc: "Des experts locaux hautement qualifiés prêts à intervenir. Satisfaction 100% garantie, devis gratuit en 5 minutes !" }
        },
        pas: {
            en: { title: "Leaking Pipes or Roof? 💧", desc: "Waiting makes damage worse. Hire certified technicians in your neighborhood for same-day emergency repairs." },
            fr: { title: "Fuite ou problème urgent ? 💧", desc: "Attendre aggrave les dégâts. Faites appel à nos techniciens certifiés pour une réparation aujourd'hui." }
        }
    }
};

// ==========================================
// 3. APPLICATION STATE
// ==========================================
const state = {
    format: 'exit_intent',
    industry: 'ecommerce',
    framework: 'aida',
    title: 'SPECIAL OFFER',
    desc: 'Get premium access now and boost your sales.',
    btnText: 'Claim Offer',
    btnUrl: 'https://ia-codestudio.com',
    colorPrimary: '#3b82f6',
    colorAccent: '#8b5cf6',
    opacity: 15,
    glowEnabled: true,
    heatmapEnabled: false
};

// ==========================================
// 4. DOM ELEMENTS
// ==========================================
const els = {
    langBtns: document.querySelectorAll('.lang-btn'),
    format: document.getElementById('select-format'),
    industry: document.getElementById('select-industry'),
    framework: document.getElementById('select-framework'),
    productDesc: document.getElementById('input-product-desc'),
    btnGenerateCopy: document.getElementById('btn-generate-copy'),
    title: document.getElementById('input-title'),
    desc: document.getElementById('input-desc'),
    btnText: document.getElementById('input-btn-text'),
    btnUrl: document.getElementById('input-btn-url'),
    colorPrimary: document.getElementById('color-primary'),
    colorAccent: document.getElementById('color-accent'),
    rangeOpacity: document.getElementById('range-opacity'),
    valOpacity: document.getElementById('val-opacity'),
    switchGlow: document.getElementById('switch-glow'),
    checkHeatmap: document.getElementById('check-heatmap'),
    heatmapOverlay: document.getElementById('heatmap-overlay'),
    iframe: document.getElementById('preview-iframe'),
    codeOutput: document.getElementById('code-output'),
    btnCopyCode: document.getElementById('btn-copy-code'),
    btnDownloadHtml: document.getElementById('btn-download-html'),
    dashCtr: document.getElementById('dash-ctr'),
    dashScore: document.getElementById('dash-score'),
    dashTip: document.getElementById('dash-tip')
};

// ==========================================
// 5. INITIALIZATION & TRANSLATIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    window.lang = currentLang;
    bindEvents();
    translatePage();
    triggerWidgetRender();
});

function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = translations[currentLang][key];
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
}

// ==========================================
// 6. EVENT BINDING
// ==========================================
function bindEvents() {
    // Language Switcher
    els.langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.getAttribute('data-lang');
            window.lang = currentLang;
            translatePage();
            if (window.activeTab === 'core-ad-genius' || !window.activeTab) {
                triggerWidgetRender();
            } else {
                reRenderActiveWorkspace();
            }
        });
    });

    // Back to dashboard handler
    const btnBack = document.getElementById('btn-back-dashboard');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            window.goBackToDashboard();
        });
    }

    // Binding state and updating widget
    const bindState = (element, stateKey, eventType = 'input', transformer = null) => {
        if (!element) return;
        element.addEventListener(eventType, (e) => {
            let val = element.type === 'checkbox' ? element.checked : element.value;
            if (transformer) val = transformer(val);
            state[stateKey] = val;
            
            // Special handlers
            if (stateKey === 'opacity' && els.valOpacity) {
                els.valOpacity.textContent = `${val}%`;
            }
            
            triggerWidgetRender();
        });
    };

    bindState(els.format, 'format', 'change');
    bindState(els.industry, 'industry', 'change');
    bindState(els.framework, 'framework', 'change');
    bindState(els.title, 'title');
    bindState(els.desc, 'desc');
    bindState(els.btnText, 'btnText');
    bindState(els.btnUrl, 'btnUrl');
    bindState(els.colorPrimary, 'colorPrimary');
    bindState(els.colorAccent, 'colorAccent');
    bindState(els.rangeOpacity, 'opacity', 'input', parseInt);
    bindState(els.switchGlow, 'glowEnabled', 'change');
    
    // Heatmap Toggle
    if (els.checkHeatmap) {
        els.checkHeatmap.addEventListener('change', (e) => {
            state.heatmapEnabled = e.target.checked;
            if (state.heatmapEnabled) {
                els.heatmapOverlay.classList.add('active');
            } else {
                els.heatmapOverlay.classList.remove('active');
            }
            triggerWidgetRender();
        });
    }

    // AI Copywriter Generation
    if (els.btnGenerateCopy) {
        els.btnGenerateCopy.addEventListener('click', () => {
            generateAICopy();
        });
    }

    // Copy Code action — PREMIUM REQUIRED
    if (els.btnCopyCode) {
        els.btnCopyCode.addEventListener('click', () => {
            requirePremium(() => {
                els.codeOutput.select();
                document.execCommand('copy');
                const originalText = translations[currentLang].btn_copy;
                els.btnCopyCode.textContent = translations[currentLang].btn_copied;
                setTimeout(() => {
                    els.btnCopyCode.textContent = originalText;
                }, 2000);
            });
        });
    }

    // Download HTML action — PREMIUM REQUIRED
    if (els.btnDownloadHtml) {
        els.btnDownloadHtml.addEventListener('click', () => {
            requirePremium(() => {
                const html = els.codeOutput.value;
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ad-genius-${state.format}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        });
    }
}

// ==========================================
// 7. AI COPYWRITING SIMULATOR
// ==========================================
function generateAICopy() {
    const ind = state.industry;
    const fw = state.framework;
    const userPrompt = els.productDesc.value.trim();
    
    let baseText = copywritingPresets[ind][fw][currentLang];
    
    if (!baseText) return;
    
    let finalTitle = baseText.title;
    let finalDesc = baseText.desc;
    
    // If the user entered custom text, inject/incorporate it elegantly
    if (userPrompt.length > 0) {
        // Extract words or build copy incorporating user prompt
        if (currentLang === 'en') {
            finalDesc = `${userPrompt}. ${baseText.desc}`;
        } else {
            finalDesc = `${userPrompt}. ${baseText.desc}`;
        }
    }
    
    // Update inputs
    els.title.value = finalTitle;
    els.desc.value = finalDesc;
    
    // Sync state
    state.title = finalTitle;
    state.desc = finalDesc;
    
    triggerWidgetRender();
}

// ==========================================
// 8. CONVERSION PREDICTION ALGORITHM
// ==========================================
function calculateConversionMetrics() {
    let ctr = 3.2; // Base CTR
    let score = 70; // Base score
    let tip = "";
    
    const titleLen = state.title.length;
    const descLen = state.desc.length;
    const textCombined = (state.title + " " + state.desc).toLowerCase();
    
    // 1. Headline length analysis
    if (titleLen > 10 && titleLen < 25) {
        ctr += 0.8;
        score += 8;
    } else {
        ctr -= 0.5;
        score -= 5;
    }
    
    // 2. Power words / Urgency detection
    const urgencyWords = ["now", "today", "limited", "save", "free", "off", "vite", "aujourd'hui", "gratuit", "promo", "reduction"];
    let matchCount = 0;
    urgencyWords.forEach(w => {
        if (textCombined.includes(w)) matchCount++;
    });
    
    if (matchCount > 0) {
        ctr += matchCount * 0.6;
        score += matchCount * 6;
    } else {
        ctr -= 0.6;
    }
    
    // 3. Emojis
    const emojiRegex = /[\uD800-\uDFFF\u2600-\u27BF]/g;
    if (emojiRegex.test(textCombined)) {
        ctr += 0.5;
        score += 5;
    }
    
    // 4. Aesthetics / Design
    if (state.glowEnabled) {
        ctr += 0.3;
    }
    if (state.opacity > 10 && state.opacity < 25) {
        ctr += 0.2;
    }
    
    // Cap results
    ctr = Math.max(1.2, Math.min(10.8, ctr));
    score = Math.max(30, Math.min(100, score));
    
    // Localized optimization tips
    if (matchCount === 0) {
        tip = currentLang === 'en' 
            ? "Urgency boost: Add actionable words like 'Limited Offer' or 'Now' to trigger FOMO." 
            : "Urgence : Ajoutez des mots comme 'Offre Limitée' ou 'Maintenant' pour inciter à l'action.";
    } else if (titleLen > 30) {
        tip = currentLang === 'en'
            ? "Headline too long: Try keeping it under 25 characters to make it punchier on mobile viewports."
            : "Titre trop long : Essayez de le réduire à moins de 25 caractères pour un meilleur impact sur mobile.";
    } else if (!emojiRegex.test(textCombined)) {
        tip = currentLang === 'en'
            ? "Visual anchor: Inserting a relevant emoji (like 🛍️, ⚡ or 🎁) can improve visual attention by 15%."
            : "Ancre visuelle : Insérer un emoji (ex: 🛍️, ⚡ ou 🎁) peut augmenter l'attention visuelle de 15%.";
    } else {
        tip = currentLang === 'en'
            ? "Excellent copy structure. To optimize further, match the primary color to your target brand identity."
            : "Excellente structure. Pour optimiser davantage, alignez la couleur principale avec celle de votre marque.";
    }
    
    // Update Dashboard UI
    els.dashCtr.textContent = `${ctr.toFixed(1)}%`;
    els.dashScore.textContent = `${score}/100`;
    els.dashTip.textContent = tip;
}

// ==========================================
// 9. CODE GENERATION & PREVIEW RENDER
// ==========================================
function triggerWidgetRender() {
    calculateConversionMetrics();
    const htmlCode = buildExportCode();
    
    els.codeOutput.value = htmlCode;
    els.iframe.srcdoc = htmlCode;
}

function buildExportCode() {
    const borderGlow = state.glowEnabled 
        ? `box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px ${state.colorAccent}40, inset 0 0 1px rgba(255,255,255,0.2); border: 1px solid ${state.colorPrimary}80;` 
        : `box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08);`;
        
    let bodyLayoutHTML = '';
    let layoutCSS = '';
    let behaviorScript = '';
    
    if (state.format === 'exit_intent') {
        // EXIT INTENT POPUP
        bodyLayoutHTML = `
        <div class="ad-overlay" id="ad-wrapper">
            <div class="ad-modal">
                <button class="ad-close-btn" onclick="closeAd()">&times;</button>
                <div class="ad-icon">🎁</div>
                <h2 class="ad-title">${state.title}</h2>
                <p class="ad-desc">${state.desc}</p>
                <a href="${state.btnUrl}" target="_blank" class="ad-btn">${state.btnText}</a>
            </div>
        </div>
        `;
        
        layoutCSS = `
        .ad-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .ad-overlay.show {
            opacity: 1; pointer-events: auto;
        }
        .ad-modal {
            background: rgba(17, 24, 39, ${state.opacity / 100});
            backdrop-filter: blur(24px);
            padding: 40px 30px;
            border-radius: 24px;
            max-width: 420px;
            width: 90%;
            text-align: center;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ${borderGlow}
        }
        .ad-overlay.show .ad-modal {
            transform: scale(1);
        }
        .ad-close-btn {
            position: absolute;
            top: 15px; right: 15px;
            background: none; border: none;
            color: #9ca3af; font-size: 24px;
            cursor: pointer; line-height: 1;
            transition: color 0.2s;
        }
        .ad-close-btn:hover { color: #f3f4f6; }
        .ad-icon { font-size: 40px; margin-bottom: 15px; }
        .ad-title {
            font-family: 'Outfit', sans-serif;
            font-weight: 800; font-size: 24px;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #fff 30%, ${state.colorPrimary} 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .ad-desc { font-size: 14px; color: #9ca3af; line-height: 1.5; margin-bottom: 25px; }
        .ad-btn {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary} 0%, ${state.colorAccent} 100%);
            color: #fff; font-weight: 700; font-size: 14px;
            text-decoration: none; padding: 12px 30px;
            border-radius: 10px; width: 100%;
            box-shadow: 0 0 15px ${state.colorPrimary}40;
            transition: transform 0.2s, filter 0.2s;
        }
        .ad-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        `;
        
        behaviorScript = `
        function showAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper && !localStorage.getItem('ad_genius_shown')) {
                wrapper.classList.add('show');
            }
        }
        function closeAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper) {
                wrapper.classList.remove('show');
                localStorage.setItem('ad_genius_shown', 'true');
            }
        }
        
        // Exit-Intent logic
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 20) {
                showAd();
            }
        });
        
        // Fallback for preview mode
        setTimeout(showAd, 2000);
        `;
        
    } else if (state.format === 'sticky_bar') {
        // STICKY FLOATING BAR (Top of Page)
        bodyLayoutHTML = `
        <div class="ad-sticky-bar" id="ad-wrapper">
            <div class="ad-bar-container">
                <span class="ad-bar-badge">OFFER</span>
                <div class="ad-bar-text">
                    <strong class="ad-bar-title">${state.title}</strong>
                    <span class="ad-bar-desc">${state.desc}</span>
                </div>
                <div class="ad-bar-actions">
                    <a href="${state.btnUrl}" target="_blank" class="ad-btn">${state.btnText}</a>
                    <button class="ad-close-btn" onclick="closeAd()">&times;</button>
                </div>
            </div>
        </div>
        `;
        
        layoutCSS = `
        .ad-sticky-bar {
            position: fixed;
            top: 0; left: 0; width: 100vw;
            background: rgba(17, 24, 39, ${state.opacity / 100});
            backdrop-filter: blur(20px);
            z-index: 999999;
            padding: 12px 24px;
            display: flex; justify-content: center;
            opacity: 0; transform: translateY(-100%);
            transition: opacity 0.4s ease, transform 0.4s ease;
            ${borderGlow}
            border-left: none; border-right: none; border-top: none;
        }
        .ad-sticky-bar.show {
            opacity: 1; transform: translateY(0);
        }
        .ad-bar-container {
            max-width: 1100px; width: 100%;
            display: flex; align-items: center; justify-content: space-between;
            gap: 15px;
        }
        .ad-bar-badge {
            font-size: 9px; font-weight: 800; background: ${state.colorAccent};
            color: #fff; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;
        }
        .ad-bar-text {
            flex: 1; display: flex; align-items: center; gap: 10px; font-size: 13.5px;
        }
        .ad-bar-title { font-family: 'Outfit', sans-serif; font-weight: 700; color: #fff; }
        .ad-bar-desc { color: #9ca3af; }
        .ad-bar-actions { display: flex; align-items: center; gap: 15px; }
        .ad-close-btn {
            background: none; border: none; color: #9ca3af; font-size: 20px;
            cursor: pointer; transition: color 0.2s; line-height: 1;
        }
        .ad-close-btn:hover { color: #fff; }
        .ad-btn {
            display: inline-block;
            background: linear-gradient(135deg, ${state.colorPrimary} 0%, ${state.colorAccent} 100%);
            color: #fff; font-weight: 700; font-size: 12.5px;
            text-decoration: none; padding: 8px 20px;
            border-radius: 6px; white-space: nowrap;
            box-shadow: 0 0 10px ${state.colorPrimary}40;
            transition: transform 0.2s, filter 0.2s;
        }
        .ad-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
        
        @media (max-width: 768px) {
            .ad-bar-container { flex-direction: column; text-align: center; }
            .ad-bar-text { flex-direction: column; gap: 4px; }
            .ad-btn { width: 100%; }
        }
        `;
        
        behaviorScript = `
        function showAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper) {
                wrapper.classList.add('show');
            }
        }
        function closeAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper) {
                wrapper.classList.remove('show');
            }
        }
        setTimeout(showAd, 1000);
        `;
        
    } else if (state.format === 'slide_in') {
        // CORNER SLIDE-IN CARD (Bottom Right)
        bodyLayoutHTML = `
        <div class="ad-slide-in" id="ad-wrapper">
            <button class="ad-close-btn" onclick="closeAd()">&times;</button>
            <div class="ad-body">
                <div class="ad-header-row">
                    <span class="ad-icon">⚡</span>
                    <strong class="ad-title">${state.title}</strong>
                </div>
                <p class="ad-desc">${state.desc}</p>
                <a href="${state.btnUrl}" target="_blank" class="ad-btn">${state.btnText}</a>
            </div>
        </div>
        `;
        
        layoutCSS = `
        .ad-slide-in {
            position: fixed;
            bottom: 20px; right: 20px;
            background: rgba(17, 24, 39, ${state.opacity / 100});
            backdrop-filter: blur(20px);
            z-index: 999999;
            padding: 24px;
            border-radius: 16px;
            max-width: 310px;
            width: calc(100vw - 40px);
            opacity: 0; transform: translateY(100px);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ${borderGlow}
        }
        .ad-slide-in.show {
            opacity: 1; transform: translateY(0);
        }
        .ad-close-btn {
            position: absolute;
            top: 10px; right: 12px;
            background: none; border: none; color: #9ca3af; font-size: 18px;
            cursor: pointer; line-height: 1; transition: color 0.2s;
        }
        .ad-close-btn:hover { color: #fff; }
        .ad-header-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ad-icon { font-size: 18px; }
        .ad-title {
            font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 15px; color: #fff;
        }
        .ad-desc { font-size: 12.5px; color: #9ca3af; line-height: 1.5; margin-bottom: 15px; }
        .ad-btn {
            display: inline-block; text-align: center;
            background: linear-gradient(135deg, ${state.colorPrimary} 0%, ${state.colorAccent} 100%);
            color: #fff; font-weight: 700; font-size: 12px;
            text-decoration: none; padding: 10px 20px;
            border-radius: 8px; width: 100%;
            box-shadow: 0 0 10px ${state.colorPrimary}40;
            transition: transform 0.2s, filter 0.2s;
        }
        .ad-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
        `;
        
        behaviorScript = `
        function showAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper) {
                wrapper.classList.add('show');
            }
        }
        function closeAd() {
            const wrapper = document.getElementById('ad-wrapper');
            if (wrapper) {
                wrapper.classList.remove('show');
            }
        }
        setTimeout(showAd, 1500);
        `;
    }
    
    // Combine everything into a single file code
    return `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AD-GENIUS AI AD</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: transparent;
            color: #fff;
            width: 100%; height: 100%;
            min-height: 100vh;
        }
        
        ${layoutCSS}
    </style>
</head>
<body>

    ${bodyLayoutHTML}

    <script>
        ${behaviorScript}
    </script>
</body>
</html>`;
}

// ==========================================
// 10. STUDIO ROUTER & WORKSPACE NAVIGATION
// ==========================================
window.activeTab = null;

window.activateWorkspace = function(id) {
    // Hide dashboard grid view
    document.getElementById('dashboard-grid-view').style.display = 'none';
    
    // Show back to dashboard button
    document.getElementById('btn-back-dashboard').style.display = 'block';
    
    // Hide all workspaces
    document.querySelectorAll('.workspace').forEach(el => el.style.display = 'none');
    
    // Hide extra non-workspace wrapper elements
    const mmWs = document.getElementById('mockup-master-workspace');
    if (mmWs) mmWs.style.display = 'none';
    const baWs = document.getElementById('brand-ad-workspace');
    if (baWs) baWs.style.display = 'none';
    
    window.activeTab = id;
    
    if (id === 'core-ad-genius') {
        document.getElementById('core-ad-genius-workspace').style.display = 'grid';
    } else {
        // Run the renderTab chain for copied modules
        if (window.renderTab) {
            window.renderTab(id);
        }
    }
    
    // Apply premium guards to export buttons after module renders
    setTimeout(applyPremiumGuardsToExportButtons, 400);
};

window.goBackToDashboard = function() {
    // Show dashboard grid view
    document.getElementById('dashboard-grid-view').style.display = 'grid';
    
    // Hide back to dashboard button
    document.getElementById('btn-back-dashboard').style.display = 'none';
    
    // Hide all workspaces
    document.querySelectorAll('.workspace').forEach(el => el.style.display = 'none');
    
    // Hide extra non-workspace wrapper elements
    const mmWs = document.getElementById('mockup-master-workspace');
    if (mmWs) mmWs.style.display = 'none';
    const baWs = document.getElementById('brand-ad-workspace');
    if (baWs) baWs.style.display = 'none';
    
    window.activeTab = null;
};

// ==========================================
// 11. GLOBAL UTILITIES (TOAST & LANG RELOAD)
// ==========================================
window.showToast = function(message) {
    let toastContainer = document.getElementById('global-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'global-toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: rgba(17, 24, 39, 0.9);
        backdrop-filter: blur(12px);
        color: #fff;
        padding: 12px 24px;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(59, 130, 246, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
};

function reRenderActiveWorkspace() {
    if (!window.activeTab || window.activeTab === 'core-ad-genius') return;
    
    // Reset initialization flags
    const flags = [
        'ptInitialized', 'certInitialized', 'gcsInitialized', 'dbsInitialized',
        'mcsInitialized', 'dmpInitialized', 'svcInitialized', 'bhpInitialized',
        'sspInitialized', 'laInitialized', 'swInitialized', 'izInitialized',
        'gsInitialized', 'gspInitialized', 'abcInitialized', 'pabInitialized',
        'ktpInitialized', 'mmInitialized', 'mbsInitialized', 'baInitialized',
        'srInitialized', 'scInitialized'
    ];
    flags.forEach(flag => {
        window[flag] = false;
    });
    
    // Re-render
    if (window.renderTab) {
        window.renderTab(window.activeTab);
    }
}

// ==========================================
// 12. SYSTÈME PREMIUM — AD-GENIUS AI PRO
//     Compatible avec ia-codestudio.com
// ==========================================

/**
 * Vérifie si l'utilisateur connecté a un abonnement Premium actif.
 * Utilise le même système localStorage que le site principal.
 */
function checkIsPremium() {
    const session = localStorage.getItem('genius_session');
    if (!session) return false;
    try {
        const user = JSON.parse(session);
        const email = user.email.toLowerCase();
        const premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        const record = premiumList.find(p => p.email.toLowerCase() === email);
        if (record) {
            const isUnlimited = record.days === 9999;
            const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
            if (isUnlimited || expiry > Date.now()) return true;
        }
    } catch (e) {}
    // Fallback legacy key
    const subDate = localStorage.getItem('ia_premium_sub_date');
    if (subDate) {
        const daysLeft = 30 - Math.floor((Date.now() - parseInt(subDate)) / 86400000);
        if (daysLeft > 0) return true;
    }
    return false;
}

/**
 * Exécute le callback si premium, sinon affiche la modale de paiement.
 */
function requirePremium(callback) {
    if (checkIsPremium()) {
        callback();
    } else {
        showPremiumModal();
    }
}

/**
 * Crée et affiche la modale Premium (style identique aux autres compartiments du site).
 */
function showPremiumModal() {
    // Remove existing modal if any
    const existing = document.getElementById('adgenius-premium-modal');
    if (existing) { existing.style.display = 'flex'; return; }

    const isFr = (currentLang === 'fr');

    const modal = document.createElement('div');
    modal.id = 'adgenius-premium-modal';
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(3, 7, 18, 0.85);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: agFadeIn 0.25s ease;
    `;

    modal.innerHTML = `
        <style>
            @keyframes agFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
            #adgenius-premium-modal .ag-modal-box {
                background: linear-gradient(145deg, #0f172a, #1e1b4b);
                border: 1px solid rgba(139,92,246,0.35);
                border-radius: 24px;
                padding: 40px 36px;
                max-width: 440px;
                width: 100%;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.15);
                font-family: 'Inter', sans-serif;
                color: #fff;
            }
            #adgenius-premium-modal .ag-gem { font-size: 3rem; margin-bottom: 16px; display:block; }
            #adgenius-premium-modal h3 {
                font-size: 22px;
                font-weight: 800;
                margin-bottom: 12px;
                background: linear-gradient(90deg, #f59e0b, #ec4899);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            #adgenius-premium-modal p {
                color: #94a3b8;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 28px;
            }
            #adgenius-premium-modal p b { color: #e2e8f0; }
            #adgenius-premium-modal .ag-btn-upgrade {
                display: block;
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #f59e0b, #ec4899);
                color: #fff;
                border: none;
                border-radius: 14px;
                font-size: 15px;
                font-weight: 800;
                cursor: pointer;
                text-decoration: none;
                letter-spacing: 0.5px;
                transition: transform 0.2s, box-shadow 0.2s;
                margin-bottom: 12px;
            }
            #adgenius-premium-modal .ag-btn-upgrade:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(245,158,11,0.4);
            }
            #adgenius-premium-modal .ag-btn-close {
                display: block;
                width: 100%;
                padding: 13px;
                background: rgba(255,255,255,0.06);
                color: #94a3b8;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 14px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }
            #adgenius-premium-modal .ag-btn-close:hover {
                background: rgba(255,255,255,0.1);
                color: #fff;
            }
        </style>
        <div class="ag-modal-box">
            <span class="ag-gem">💎</span>
            <h3>🔒 ${isFr ? 'Fonctionnalité Premium' : 'Premium Feature'}</h3>
            <p>
                ${isFr
                    ? 'La copie, l\'exportation de code et le déploiement cloud sont réservés aux membres premium de <b>IA Code Studio</b>.'
                    : 'Copying, exporting code, and cloud deployment are reserved for premium members of <b>IA Code Studio</b>.'
                }
            </p>
            <a href="https://ia-codestudio.com" target="_blank" class="ag-btn-upgrade">
                💎 ${isFr ? 'DEVENIR PREMIUM ($10/MOIS)' : 'BECOME PREMIUM ($10/MONTH)'}
            </a>
            <button class="ag-btn-close" onclick="document.getElementById('adgenius-premium-modal').style.display='none'">
                ${isFr ? 'Fermer' : 'Close'}
            </button>
        </div>
    `;

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.body.appendChild(modal);
}

// ==========================================
// 13. INTERCEPTION DES BOUTONS D'EXPORT
//     Appliquée après chaque chargement de module
// ==========================================

/**
 * Liste complète de tous les boutons d'export dans les 22 modules.
 * Après chaque activation de workspace, on intercepte ces boutons
 * pour exiger Premium avant d'exécuter l'action.
 */
const EXPORT_BUTTON_IDS = [
    // Core AD-GENIUS Banner Builder (géré dans bindEvents)
    // 3D Showroom
    'sr-btn-html', 'sr-btn-png',
    // AR Business Card
    'abc-exp-html',
    // BioLink Hub Pro
    'bhp-btn-html',
    // Brand Ad Studio
    'ba-exp-png', 'ba-exp-vid', 'ba-exp-html',
    // Certificate Studio Pro
    'cert-btn-png', 'cert-btn-html',
    // Digital Book Studio
    'dbs-btn-export', 'dbs-btn-zip',
    // Digital Menu Pro
    'dmp-btn-html',
    // Gravity Sandbox
    'gs-exp-html',
    // Gravity Sandbox Pro
    'gsp-exp-html',
    // Greeting Card Pro
    'gcs-btn-export-html', 'gcs-btn-export-png',
    // Infinite Zoom
    'iz-exp-png', 'iz-exp-vid', 'iz-exp-zip',
    // Kinetic Typography
    'kt-exp-html',
    // Localized Ad Engine
    'la-export',
    // Magazine Cover Pro
    'mcs-btn-img', 'mcs-btn-html',
    // Mockup Box Studio
    'mbs-btn-png', 'mbs-btn-html',
    // Mockup Master Pro
    'mm-exp-png', 'mm-exp-vid', 'mm-exp-html',
    // Playable Ad Builder
    'pab-exp-html',
    // Pricing Table Studio
    'pt-btn-export',
    // Scratch Card Studio
    'sc-btn-html',
    // Smart Signage Pro
    'ssp-btn-html', 'ssp-btn-img',
    // Smart vCard Pro
    'svc-btn-html',
    // Spin Wheel Ads
    'sw-export'
];

/**
 * Parcourt tous les boutons d'export connus et remplace leur handler
 * par une version protégée par Premium.
 */
function applyPremiumGuardsToExportButtons() {
    EXPORT_BUTTON_IDS.forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        if (btn._premiumGuarded) return; // Already guarded

        // Save the original onclick if set directly
        const originalOnclick = btn.onclick;

        // Replace onclick with premium-guarded version
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            requirePremium(() => {
                if (originalOnclick) originalOnclick.call(btn, e);
            });
            return false;
        };

        btn._premiumGuarded = true;
    });

    // Also guard any remaining buttons via event capture on the document
    // (catches addEventListener-based handlers added by modules)
    guardExportButtonsByCapture();
}

/**
 * Adds a capture-phase listener that intercepts clicks on export buttons
 * before the module's own addEventListener handlers fire.
 */
let _captureGuardInstalled = false;
function guardExportButtonsByCapture() {
    if (_captureGuardInstalled) return;
    _captureGuardInstalled = true;

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('button, a[id]');
        if (!btn || !btn.id) return;
        if (EXPORT_BUTTON_IDS.includes(btn.id)) {
            if (!checkIsPremium()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                showPremiumModal();
            }
        }
    }, true); // true = capture phase, fires before module handlers
}

// Anti-copy protections
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'CANVAS' || e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && ['s', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});
