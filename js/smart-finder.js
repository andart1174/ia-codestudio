/**
 * IA Code Studio — Instant Smart Ad & App Finder (100% Local · 0ms · $0 API Cost)
 * Indexes ALL 28 Ad-Genius Commercial Advertising Studios, 9 3D Marketing Lab Generators,
 * 10 App Hub Starter Apps, 28 Studio Ultra Editable Web Apps, 6 3D Studios & 10 Free Dev Tools.
 * Every app & studio connects directly to IA Architecte Studio Pro / Ultra IDE for live code editing!
 */
(function (window, document) {
  'use strict';

  const CATALOG = [
    // === NEW 5 HIGH-ROI COMMERCIAL AD STUDIOS (Ad-Genius 24-28) ===
    {
      id: 'ad-flash-sale', cat: 'ads', isNew: true, icon: '⏳',
      en: 'Flash Sale & FOMO Banner Studio', fr: 'Studio Promo Flash & FOMO',
      descEn: 'Countdown urgency bar, live stock meter, promo code copy button & social-proof popups.',
      descFr: 'Barre chrono d’urgence, jauge de stock, copie de code promo et preuves sociales live.',
      tags: 'flash sale fomo countdown timer promo discount coupon ecommerce pub ad banner urgency popup',
      url: '/ad-genius-ai/index.html?studio=flash-sale', ideUrl: '/ad-genius-ai/index.html?studio=flash-sale&edit=1'
    },
    {
      id: 'ad-before-after', cat: 'ads', isNew: true, icon: '⚖️',
      en: 'Before / After Interactive Slider Ad', fr: 'Pub Slider Avant / Après Interactif',
      descEn: 'Drag-to-reveal comparison ad for clinics, salons, fitness, detailing, real estate & SaaS.',
      descFr: 'Comparateur glissant Avant/Après pour cliniques, salons, immobilier, auto et fitness.',
      tags: 'before after slider comparison salon dentist clinic fitness real estate car pub ad interactive',
      url: '/ad-genius-ai/index.html?studio=before-after', ideUrl: '/ad-genius-ai/index.html?studio=before-after&edit=1'
    },
    {
      id: 'ad-whatsapp-lead', cat: 'ads', isNew: true, icon: '💬',
      en: 'Smart WhatsApp & Booking Lead Widget', fr: 'Widget WhatsApp & Rendez-vous',
      descEn: 'Floating multi-agent WhatsApp / Telegram / booking lead bubble with hours & quick replies.',
      descFr: 'Bulle flottante WhatsApp / réservation multi-agents avec horaires et messages rapides.',
      tags: 'whatsapp messenger chat lead booking widget floating business salon restaurant agency pub ad',
      url: '/ad-genius-ai/index.html?studio=whatsapp-lead', ideUrl: '/ad-genius-ai/index.html?studio=whatsapp-lead&edit=1'
    },
    {
      id: 'ad-quote-calc', cat: 'ads', isNew: true, icon: '🧾',
      en: 'Interactive Quote / ROI Calculator Ad', fr: 'Calculateur de Devis & ROI Interactif',
      descEn: 'Interactive slider price estimator that calculates instant quotes and captures qualified leads.',
      descFr: 'Estimateur de tarif interactif avec curseurs pour capturer des prospects qualifiés.',
      tags: 'quote calculator roi estimator price pricing lead magnet agency saas real estate pub ad',
      url: '/ad-genius-ai/index.html?studio=quote-calc', ideUrl: '/ad-genius-ai/index.html?studio=quote-calc&edit=1'
    },
    {
      id: 'ad-reels-animator', cat: 'ads', isNew: true, icon: '🎬',
      en: '9:16 Reels / TikTok / Shorts Ad Animator', fr: 'Animateur Pub 9:16 Reels / TikTok',
      descEn: 'Animated vertical 9:16 social video ad creator with kinetic headlines & WebM video export.',
      descFr: 'Créateur de pubs vidéo verticales 9:16 animées avec export vidéo WebM direct navigateur.',
      tags: 'video reels tiktok shorts vertical 9:16 social ad story animator webm export pub publicite',
      url: '/ad-genius-ai/index.html?studio=reels-animator', ideUrl: '/ad-genius-ai/index.html?studio=reels-animator&edit=1'
    },

    // === 23 CORE COMMERCIAL AD STUDIOS (Ad-Genius AI Pro) ===
    {
      id: 'ad-core-banner', cat: 'ads', icon: '⚡',
      en: 'AI Banner, Exit-Intent & Sticky Ad Builder', fr: 'Créateur Bannières & Popups Pub',
      descEn: 'Conversion popups, exit-intent offers, sticky header bars & slide-in cards with click heatmap.',
      descFr: 'Popups de sortie, barres collantes et cartes glissantes avec heatmap de clics.',
      tags: 'banner popup exit intent sticky bar slide in ad pub publicite marketing conversion',
      url: '/ad-genius-ai/index.html?studio=core-ad-genius'
    },
    {
      id: 'ad-digital-menu', cat: 'ads', icon: '🍽️',
      en: 'Digital Menu Pro (Restaurants & Cafés)', fr: 'Menu Digital QR Pro (Restaurants)',
      descEn: 'Interactive restaurant & café QR menu builder with categories, prices, specials & HTML export.',
      descFr: 'Menu QR interactif pour restaurants et cafés avec catégories, prix et export HTML.',
      tags: 'restaurant restaurante cafe menu food pizza burger bistro bar qr digital menu pub',
      url: '/ad-genius-ai/index.html?studio=digital-menu'
    },
    {
      id: 'ad-spin-wheel', cat: 'ads', icon: '🎡',
      en: 'Spin Wheel Fortune Lead Ad', fr: 'Roue de la Fortune Publicitaire',
      descEn: 'Gamified lucky spin wheel to distribute promo coupons and capture customer emails.',
      descFr: 'Roue de la fortune ludique pour offrir des coupons et capturer des emails clients.',
      tags: 'spin wheel fortune lucky promo coupon discount gamified lead ecommerce restaurant pub ad',
      url: '/ad-genius-ai/index.html?studio=spin-wheel'
    },
    {
      id: 'ad-scratch-card', cat: 'ads', icon: '🎫',
      en: 'Scratch Card Promo Studio', fr: 'Studio Carte à Gratter Promo',
      descEn: 'Interactive scratch-off coupon widget that reveals instant discounts on mobile & desktop.',
      descFr: 'Carte à gratter interactive qui révèle un code promo sur mobile et ordinateur.',
      tags: 'scratch card gratter promo coupon discount gamified pub ad marketing ecommerce',
      url: '/ad-genius-ai/index.html?studio=scratch-card'
    },
    {
      id: 'ad-3d-showroom', cat: 'ads', icon: '🛍️',
      en: '3D Product Showroom Banner', fr: 'Showroom Produit 3D E-Commerce',
      descEn: 'Interactive 360° 3D product showcase ad with custom labels, lighting & buy buttons.',
      descFr: 'Vitrine produit 3D interactive 360° avec étiquettes, éclairage et bouton d’achat.',
      tags: '3d product showroom ecommerce shop store sneaker watch banner pub ad 360',
      url: '/ad-genius-ai/index.html?studio=showroom-3d'
    },
    {
      id: 'ad-pricing-table', cat: 'ads', icon: '💰',
      en: 'Pricing Table Ad Studio', fr: 'Studio Tableaux de Prix',
      descEn: 'High-converting interactive SaaS & service pricing tables with toggles and badges.',
      descFr: 'Tableaux de prix SaaS et services à forte conversion prêts à intégrer.',
      tags: 'pricing table price tarifs plan subscription saas pub ad conversion',
      url: '/ad-genius-ai/index.html?studio=pricing-table'
    },
    {
      id: 'ad-playable', cat: 'ads', icon: '🎮',
      en: 'Playable Mini-Game Ad Builder', fr: 'Créateur Playable Ads (Mini-Jeu Pub)',
      descEn: 'Build playable HTML5 mini-game advertisements that skyrocket ad click-through rates.',
      descFr: 'Créez des mini-jeux publicitaires HTML5 interactifs à très fort taux de clic.',
      tags: 'playable ad mini game gamification html5 display ad pub publicite',
      url: '/ad-genius-ai/index.html?studio=playable-ad-builder'
    },
    {
      id: 'ad-ar-bizcard', cat: 'ads', icon: '🪪',
      en: 'AR 3D Business Card & Smart vCard', fr: 'Carte de Visite 3D RA & vCard',
      descEn: 'Interactive 3D tilting digital business card with offline QR code & one-tap contact save.',
      descFr: 'Carte de visite numérique 3D inclinable avec QR code hors-ligne et contact direct.',
      tags: 'business card vcard carte de visite ar qr contact networking pub',
      url: '/ad-genius-ai/index.html?studio=ar-business-card'
    },
    {
      id: 'ad-biolink', cat: 'ads', icon: '🔗',
      en: 'BioLink Hub Pro (Link-in-Bio)', fr: 'BioLink Hub Pro (Lien en Bio)',
      descEn: 'Custom link-in-bio micro-landing page for Instagram, TikTok, YouTube & creators.',
      descFr: 'Page lien-en-bio personnalisée pour Instagram, TikTok, YouTube et créateurs.',
      tags: 'biolink link in bio linktree social instagram tiktok creator profile',
      url: '/ad-genius-ai/index.html?studio=biolink-hub'
    },
    {
      id: 'ad-packaging', cat: 'ads', icon: '📦',
      en: '3D Packaging Box & Mockup Studio', fr: 'Studio Packaging 3D & Mockups',
      descEn: 'Custom 6-face WebGL 3D product boxes, bottles, cylinders & device mockups with lighting.',
      descFr: 'Boîtes packaging 3D 6 faces, cylindres et mockups produits WebGL personnalisables.',
      tags: '3d packaging box mockup product ecommerce bottle brand design pub',
      url: '/ad-genius-ai/index.html?studio=mockup-box'
    },
    {
      id: 'ad-kinetic-typo', cat: 'ads', icon: '🔤',
      en: 'Kinetic Typography Motion Ads', fr: 'Typographie Cinétique Animée',
      descEn: '20+ physics-driven animated headline ads with HTML, PNG and WebM video export.',
      descFr: 'Plus de 20 effets de texte animé pour pubs sociales avec export HTML, PNG et vidéo.',
      tags: 'kinetic typography motion text animation headline social ad video pub',
      url: '/ad-genius-ai/index.html?studio=kinetic-typography'
    },
    {
      id: 'ad-smart-signage', cat: 'ads', icon: '📺',
      en: 'Smart Signage Pro (Store Screens & QR)', fr: 'Affichage Dynamique & Affiches QR',
      descEn: 'Dynamic TV / storefront digital signage slideshows and printable QR promo posters.',
      descFr: 'Diaporamas d’affichage dynamique en magasin et affiches promo QR.',
      tags: 'signage screen tv store poster qr display shop restaurant pub',
      url: '/ad-genius-ai/index.html?studio=smart-signage'
    },
    {
      id: 'ad-certificate', cat: 'ads', icon: '🏆',
      en: 'Certificate & Diploma Studio Pro', fr: 'Studio Certificats & Diplômes Pro',
      descEn: 'Design and export professional awards, training certificates and digital diplomas.',
      descFr: 'Créez et exportez des certificats professionnels, diplômes et récompenses.',
      tags: 'certificate diploma award badge course print editorial',
      url: '/ad-genius-ai/index.html?studio=certificate-studio'
    },
    {
      id: 'ad-book', cat: 'ads', icon: '📖',
      en: '3D Flipping Digital Book & Catalog', fr: 'Catalogue & Livre 3D Interactif',
      descEn: 'Turn product catalogs, brochures and portfolios into 3D page-flipping digital books.',
      descFr: 'Transformez vos catalogues produits et brochures en livres 3D feuilletables.',
      tags: 'book catalog brochure magazine flipbook portfolio print',
      url: '/ad-genius-ai/index.html?studio=digital-book'
    },
    {
      id: 'ad-brand-v2', cat: 'ads', icon: '🔥',
      en: 'Brand Ad Studio V2 (3D VFX Ads)', fr: 'Brand Ad Studio V2 (Pubs VFX 3D)',
      descEn: 'High-impact 3D visual effects commercial brand banners with PNG, Video & HTML export.',
      descFr: 'Bannières de marque 3D VFX haut de gamme avec export PNG, Vidéo et HTML.',
      tags: 'brand vfx 3d commercial banner luxury ad pub publicite',
      url: '/ad-genius-ai/index.html?studio=brand-ad'
    },
    {
      id: 'ad-gravity-pro', cat: 'ads', icon: '🪐',
      en: 'Gravity Physics Ad Sandbox (Matter.js)', fr: 'Pub Physique Gravité (Matter.js)',
      descEn: 'Interactive rigid-body physics banner where products bounce and collide on mouse drag.',
      descFr: 'Bannière publicitaire physique interactive où vos produits rebondissent au curseur.',
      tags: 'gravity physics matter js interactive banner playful pub ad',
      url: '/ad-genius-ai/index.html?studio=gravity-sandbox-pro'
    },
    {
      id: 'ad-localized', cat: 'ads', icon: '🌦️',
      en: 'Dynamic Weather & Time Contextual Ads', fr: 'Pubs Dynamiques Météo & Horaire',
      descEn: 'Smart banners that automatically adapt headlines and offers based on local time & weather.',
      descFr: 'Bannières intelligentes qui adaptent le message selon l’heure et la météo locale.',
      tags: 'weather time contextual dynamic localized smart banner pub ad',
      url: '/ad-genius-ai/index.html?studio=localized-ad'
    },

    // === 9 VIRAL 3D MARKETING LAB GENERATORS ===
    {
      id: 'lab-svg-3d', cat: '3d', icon: '📐',
      en: 'SVG Logo to 3D WebGL Extruder', fr: 'Convertisseur Logo SVG vers 3D',
      descEn: 'Extrude any 2D SVG brand logo into a spinning metallic 3D WebGL widget in 1 click.',
      descFr: 'Extrudez n’importe quel logo SVG en modèle 3D WebGL rotatif prêt à intégrer.',
      tags: 'svg 3d logo converter extruder vector threejs webgl brand widget',
      url: '/3d-marketing-lab/svg-to-3d-converter.html'
    },
    {
      id: 'lab-hologram', cat: '3d', icon: '🕶️',
      en: '3D Holographic Hero Banner Maker', fr: 'Bannière Holographique 3D',
      descEn: 'Build interactive WebGL hero banners with 13 animated 3D objects & parallax depth.',
      descFr: 'Créez des bannières WebGL 3D interactives avec 13 objets animés et parallaxe.',
      tags: 'hologram banner 3d hero webgl landing parallax pub ad',
      url: '/3d-marketing-lab/3d-hologram-banner.html'
    },
    {
      id: 'lab-neon', cat: '3d', icon: '✨',
      en: 'Animated Neon Sign Generator', fr: 'Générateur d’Enseigne Néon Animée',
      descEn: 'Create realistic glowing flickering neon signs for restaurants, clubs, bars & hero banners.',
      descFr: 'Créez des enseignes néon lumineuses clignotantes pour restaurants, bars et sites.',
      tags: 'neon sign glow restaurant bar club store css html banner pub',
      url: '/3d-marketing-lab/neon-sign-generator.html'
    },
    {
      id: 'lab-particles', cat: '3d', icon: '🌌',
      en: '3D Particle Logo Cloud', fr: 'Logo en Nuage de Particules 3D',
      descEn: 'Turn your brand mark into thousands of cursor-reactive 3D WebGL particles.',
      descFr: 'Transformez votre logo en milliers de particules 3D réactives à la souris.',
      tags: 'particle logo cloud 3d webgl interactive hero brand',
      url: '/3d-marketing-lab/particle-logo-cloud.html'
    },
    {
      id: 'lab-countdown', cat: '3d', icon: '⏱️',
      en: '3D Holographic Launch Countdown', fr: 'Compte à Rebours 3D Lancement',
      descEn: 'Animated 3D WebGL launch timer for product drops, Black Friday sales & events.',
      descFr: 'Compte à rebours 3D holographique pour lancements produits et promotions.',
      tags: 'countdown timer launch drop sale black friday 3d widget pub',
      url: '/3d-marketing-lab/launch-countdown-3d.html'
    },
    {
      id: 'lab-portal', cat: '3d', icon: '🌀',
      en: '3D Holographic Stargate Portal', fr: 'Portail Holographique 3D',
      descEn: 'Suspend your logo inside concentric rotating sci-fi rings and volumetric rays.',
      descFr: 'Suspendez votre logo dans des anneaux holographiques 3D tournants.',
      tags: 'portal hologram 3d rings sci fi logo webgl hero',
      url: '/3d-marketing-lab/holographic-portal-generator.html'
    },

    // === 3D CREATIVE & LIQUID CHROME STUDIOS ===
    {
      id: 'studio-3d-creative', cat: '3d', icon: '✨',
      en: '3D Creative Studio (72 UI Components)', fr: '3D Creative Studio (72 Composants UI)',
      descEn: 'Customize 72 interactive 3D buttons, cards, globes & Bento grids; export HTML/React/Vue.',
      descFr: 'Personnalisez 72 composants UI 3D interactifs avec export HTML, React et Vue 3.',
      tags: '3d ui components buttons cards globe bento react vue html studio',
      url: '/3d-creative-studio/index.html'
    },
    {
      id: 'studio-liquid-chrome', cat: '3d', icon: '💎',
      en: '3D Liquid Chrome & 4D Shaders', fr: 'Studio Chrome Liquide 3D & 4D',
      descEn: '18 procedural liquid chrome & neon 4D WebGL shaders with standalone code & 3MF export.',
      descFr: '18 shaders 4D chrome liquide et néon avec export de code WebGL et 3MF.',
      tags: 'liquid chrome 4d shader 3d metallic neon webgl 3mf studio',
      url: '/3d-liquid-chrome-studio/index.html'
    },

    // === EDITABLE FULL WEB APPS (STUDIO ULTRA 28 TEMPLATES + APP HUB 10 APPS) ===
    {
      id: 'app-restaurant', cat: 'apps', icon: '🍕',
      en: 'Full Restaurant Website & Ordering App', fr: 'Application Site Restaurant & Commandes',
      descEn: 'Complete editable HTML/CSS/JS restaurant website with menu filter, cart & reservation form.',
      descFr: 'Site complet de restaurant modifiable en code avec menu, panier et réservation.',
      tags: 'restaurant restaurante food pizza menu order delivery website app html code',
      url: '/ia-architecte-studio-ultra/index.html?template=restaurant', ideUrl: '/ia-architecte-studio-ultra/index.html?template=restaurant'
    },
    {
      id: 'app-ecommerce', cat: 'apps', icon: '🛒',
      en: 'E-Commerce Store & Shopping Cart App', fr: 'Boutique E-Commerce & Panier Complet',
      descEn: 'Full working online store with product catalog, variant filters, cart drawer & checkout UI.',
      descFr: 'Boutique en ligne complète avec catalogue, filtres et panier interactif modifiable en code.',
      tags: 'ecommerce shop store boutique cart product online vente website app code',
      url: '/ia-architecte-studio-ultra/index.html?template=ecommerce', ideUrl: '/ia-architecte-studio-ultra/index.html?template=ecommerce'
    },
    {
      id: 'app-sneaker', cat: 'apps', icon: '👟',
      en: 'Sneaker Drop & Streetwear Landing App', fr: 'Boutique Drop Sneakers & Streetwear',
      descEn: 'High-impact product drop storefront with colorways, size selector & countdown.',
      descFr: 'Page de lancement produit streetwear avec sélecteur de tailles et couleurs.',
      tags: 'sneaker shoe streetwear drop ecommerce product landing shop app',
      url: '/ia-architecte-studio-ultra/index.html?template=sneaker', ideUrl: '/ia-architecte-studio-ultra/index.html?template=sneaker'
    },
    {
      id: 'app-dashboard', cat: 'apps', icon: '📊',
      en: 'SaaS Analytics KPI Dashboard App', fr: 'Tableau de Bord Analytique SaaS',
      descEn: 'Editable dark-mode SaaS dashboard with charts, KPIs, metrics & real JS state.',
      descFr: 'Dashboard SaaS sombre avec graphiques, KPIs et logique JS modifiable dans l’IDE.',
      tags: 'dashboard saas analytics kpi chart metrics admin tableau de bord app',
      url: '/ia-architecte-studio-ultra/index.html?template=dashboard', ideUrl: '/ia-architecte-studio-ultra/index.html?template=dashboard'
    },
    {
      id: 'app-crypto', cat: 'apps', icon: '🪙',
      en: 'Crypto Market & Portfolio Tracker', fr: 'Tracker Crypto & Portefeuille Live',
      descEn: 'Interactive cryptocurrency watchlist, simulated live prices & portfolio value calculator.',
      descFr: 'Suivi crypto interactif, prix simulés et calculateur de portefeuille.',
      tags: 'crypto bitcoin btc ethereum finance market tracker dashboard app',
      url: '/ia-architecte-studio-ultra/index.html?template=crypto', ideUrl: '/ia-architecte-studio-ultra/index.html?template=crypto'
    },
    {
      id: 'app-budget', cat: 'apps', icon: '💵',
      en: 'Personal Budget & Expense Tracker', fr: 'Gestionnaire de Budget & Dépenses',
      descEn: 'Track income, expenses, categories and savings goals with LocalStorage persistence.',
      descFr: 'Suivez revenus, dépenses et objectifs d’épargne avec sauvegarde locale.',
      tags: 'budget expense finance money accounting tracker calculator app',
      url: '/ia-architecte-studio-ultra/index.html?template=budget', ideUrl: '/ia-architecte-studio-ultra/index.html?template=budget'
    },
    {
      id: 'app-kanban', cat: 'apps', icon: '📋',
      en: 'Kanban Project Board (Trello-Style)', fr: 'Tableau Kanban & Gestion de Projets',
      descEn: 'Drag-and-drop task columns, custom labels, priority badges & local save.',
      descFr: 'Colonnes glisser-déposer, étiquettes de priorité et sauvegarde locale.',
      tags: 'kanban trello project task board workflow crm management app',
      url: '/ia-architecte-studio-ultra/index.html?template=kanban', ideUrl: '/ia-architecte-studio-ultra/index.html?template=kanban'
    },
    {
      id: 'app-music', cat: 'apps', icon: '🎵',
      en: 'Web Audio Music Player & Beatmaker', fr: 'Lecteur Audio & Synthétiseur Web',
      descEn: 'Interactive music studio with procedural Web Audio synthesis and visual equalizer.',
      descFr: 'Studio musical interactif Web Audio avec synthé et égaliseur visuel.',
      tags: 'music audio player synth beatmaker drum sound app',
      url: '/ia-architecte-studio-ultra/index.html?template=music', ideUrl: '/ia-architecte-studio-ultra/index.html?template=music'
    },
    {
      id: 'app-gallery', cat: 'apps', icon: '🖼️',
      en: 'Photography Portfolio & Lightbox Gallery', fr: 'Portfolio Photo & Galerie Lightbox',
      descEn: 'Masonry creative portfolio with category filtering and fullscreen lightbox viewer.',
      descFr: 'Portfolio créatif masonry avec filtres par catégorie et visionneuse plein écran.',
      tags: 'portfolio gallery photo agency showcase photography website app',
      url: '/ia-architecte-studio-ultra/index.html?template=gallery', ideUrl: '/ia-architecte-studio-ultra/index.html?template=gallery'
    },
    {
      id: 'app-quiz', cat: 'apps', icon: '🧠',
      en: 'Interactive Lead Quiz & Trivia App', fr: 'Quiz Interactif & Capture de Leads',
      descEn: 'Timed multi-choice quiz with instant scoring — great for lead generation & education.',
      descFr: 'Quiz chronométré à choix multiples avec score — idéal pour capter des leads.',
      tags: 'quiz trivia qcm lead education test interactive app',
      url: '/ia-architecte-studio-ultra/index.html?template=quiz', ideUrl: '/ia-architecte-studio-ultra/index.html?template=quiz'
    },
    {
      id: 'app-studio-pro', cat: 'apps', icon: '🏛️',
      en: 'IA Architecte Studio Pro (Monaco IDE)', fr: 'IA Architecte Studio Pro (Éditeur Monaco)',
      descEn: 'Full browser code IDE with Monaco Editor, live preview & Smart Code Enhancer tools.',
      descFr: 'IDE navigateur complet avec Monaco Editor, aperçu live et Smart Code Enhancer.',
      tags: 'ide code editor monaco html css js build custom app studio pro',
      url: '/ia-architecte-app/index.html'
    },

    // === FREE OFFLINE DEV TOOLS ===
    {
      id: 'tool-omniconvert', cat: 'tools', icon: '🔄',
      en: 'OmniConvert Pro (Offline File Converter)', fr: 'OmniConvert Pro (Convertisseur Hors-Ligne)',
      descEn: 'Convert images (WebP/PNG/JPG), PDF, JSON/CSV/YAML, audio & QR 100% locally.',
      descFr: 'Convertissez images, PDF, JSON/CSV/YAML, audio et QR 100% hors-ligne.',
      tags: 'convert converter webp png pdf json csv yaml qr offline tool',
      url: '/free-tools/omni-convert/index.html'
    },
    {
      id: 'tool-playground', cat: 'tools', icon: '💻',
      en: 'Live HTML / CSS / JS Code Sandbox', fr: 'Sandbox Code Live HTML / CSS / JS',
      descEn: 'Instant split-screen code editor with live console and #code= URL sharing.',
      descFr: 'Éditeur de code scindé temps réel avec console live et partage par lien.',
      tags: 'sandbox playground codepen html css js editor test live tool',
      url: '/free-tools/playground/index.html'
    },
    {
      id: 'tool-svg-opt', cat: 'tools', icon: '✂️',
      en: 'SVG Optimizer & Minifier', fr: 'Optimiseur & Minifieur SVG',
      descEn: 'Shrink SVG icons and logos by up to 65% offline before embedding or 3D extrusion.',
      descFr: 'Allégez vos logos et icônes SVG jusqu’à 65% hors-ligne.',
      tags: 'svg optimizer minify compress icon vector tool',
      url: '/free-tools/converters/svg-optimizer/index.html'
    },
    {
      id: 'tool-bento', cat: 'tools', icon: '🧱',
      en: 'CSS Grid Bento Layout Builder', fr: 'Constructeur Grille CSS Bento',
      descEn: 'Visually design responsive SaaS Bento grids and copy clean vanilla CSS.',
      descFr: 'Concevez visuellement des grilles Bento SaaS responsives en CSS pur.',
      tags: 'bento grid css layout builder responsive saas tool',
      url: '/free-tools/converters/grid-bento-builder/index.html'
    }
  ];

  let activeCat = 'all';

  function getLang() {
    if (document.documentElement && document.documentElement.lang === 'fr') return 'fr';
    if (window.currentLang === 'fr') return 'fr';
    return 'en';
  }
  function isFr() { return getLang() === 'fr'; }

  function scoreItem(item, query) {
    if (!query) return item.isNew ? 12 : (item.cat === 'ads' ? 10 : 5);
    const tokens = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/).filter(Boolean);
    const hay = `${item.en} ${item.fr} ${item.descEn} ${item.descFr} ${item.tags} ${item.cat}`
      .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let score = 0;
    for (const tok of tokens) {
      if (hay.includes(tok)) {
        score += 10;
        if ((item.en + ' ' + item.fr).toLowerCase().includes(tok)) score += 12;
      } else if (tok.length >= 4 && hay.includes(tok.slice(0, -1))) {
        score += 6;
      }
    }
    if (score > 0 && item.isNew) score += 2;
    return score;
  }

  function ensureResultsPanel(form) {
    let panel = document.getElementById('sf-results-panel');
    if (!panel && form) {
      panel = document.createElement('div');
      panel.id = 'sf-results-panel';
      panel.className = 'sf-results-panel';
      form.appendChild(panel);
    }
    return panel;
  }

  function renderResults(query, catOverride, openAlways) {
    const form = document.querySelector('.prompt-launcher');
    const panel = ensureResultsPanel(form);
    if (!panel) return;

    const cat = catOverride !== undefined ? catOverride : activeCat;
    const q = String(query || '').trim();

    if (!q && !openAlways) {
      panel.classList.remove('open');
      return;
    }

    const filtered = CATALOG
      .filter(it => cat === 'all' || it.cat === cat)
      .map(it => ({ it, s: scoreItem(it, q) }))
      .filter(x => !q || x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.it);

    const fr = isFr();
    const catLabels = {
      ads: fr ? 'PUB STUDIO' : 'AD STUDIO',
      '3d': '3D WEBGL',
      apps: fr ? 'APP CODE' : 'EDITABLE APP',
      tools: fr ? 'OUTIL DEV' : 'DEV TOOL'
    };

    const topItems = filtered.slice(0, 8);
    const headText = q
      ? (fr ? `<strong>${filtered.length}</strong> résultats instantanés pour « ${q.replace(/</g, '&lt;')} » ($0 · Local)` : `<strong>${filtered.length}</strong> instant matches for “${q.replace(/</g, '&lt;')}” ($0 · Local)`)
      : (fr ? `<strong>${filtered.length}</strong> studios & applications prêts à lancer et modifier en code` : `<strong>${filtered.length}</strong> ready-to-launch studios & editable apps`);

    let cardsHtml = '';
    if (!topItems.length) {
      cardsHtml = `<div class="sf-empty">
        ${fr
          ? 'Aucun modèle exact trouvé — ouvrez directement <strong>IA Architecte Studio Pro</strong> ou <strong>Ad-Genius (28 Studios)</strong> pour créer sur mesure !'
          : 'No exact preset found — jump straight into <strong>IA Architecte Studio Pro</strong> or <strong>Ad-Genius (28 Studios)</strong> to customize freely!'}
        <div style="margin-top:12px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <a href="/ad-genius-ai/index.html" class="sf-btn-launch" style="flex:0 1 auto;padding:9px 16px;">⚡ ${fr ? 'Ouvrir les 28 Studios Pub' : 'Browse 28 Ad Studios'}</a>
          <a href="/ia-architecte-app/index.html?lang=${getLang()}" class="sf-btn-ide" style="padding:9px 16px;">💻 ${fr ? 'Ouvrir Studio Pro IDE' : 'Open Studio Pro IDE'}</a>
        </div>
      </div>`;
    } else {
      cardsHtml = topItems.map(item => {
        const title = fr ? item.fr : item.en;
        const desc = fr ? item.descFr : item.descEn;
        const badgeCls = item.isNew ? 'sf-cat-new' : ('sf-cat-' + item.cat);
        const badgeTxt = item.isNew ? (fr ? '★ NOUVEAU PUB' : '★ NEW AD') : (catLabels[item.cat] || 'STUDIO');
        const ideHref = item.ideUrl || item.url;
        const ideLabel = item.cat === 'apps'
          ? (fr ? '💻 Éditer le Code' : '💻 Edit Code')
          : (fr ? '💻 + Code IDE' : '💻 + IDE Code');
        return `<article class="sf-card">
          <div class="sf-card-top">
            <div class="sf-card-title-row">
              <span class="sf-card-icon">${item.icon}</span>
              <span class="sf-card-title">${title}</span>
            </div>
            <span class="sf-cat-pill ${badgeCls}">${badgeTxt}</span>
          </div>
          <p class="sf-card-desc">${desc}</p>
          <div class="sf-card-actions">
            <a href="${item.url}" class="sf-btn-launch">⚡ ${fr ? 'Ouvrir' : 'Launch'}</a>
            ${item.cat !== 'tools' ? `<a href="${ideHref}" class="sf-btn-ide">${ideLabel}</a>` : ''}
          </div>
        </article>`;
      }).join('');
    }

    panel.innerHTML = `
      <div class="sf-results-head">
        <span>🔍 ${headText}</span>
        <button type="button" class="sf-close-btn" id="sf-close-results">✕ ${fr ? 'Fermer' : 'Close'}</button>
      </div>
      <div class="sf-results-grid">${cardsHtml}</div>`;
    panel.classList.add('open');

    const closeBtn = document.getElementById('sf-close-results');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => panel.classList.remove('open'));
    }
  }

  function initSmartFinder() {
    const form = document.querySelector('.prompt-launcher');
    if (!form || form.dataset.sfInit) return;
    form.dataset.sfInit = '1';

    const input = form.querySelector('.prompt-input');
    const tabsRow = form.querySelector('.prompt-mode-tabs');
    if (tabsRow && !document.getElementById('sf-local-badge')) {
      const b = document.createElement('span');
      b.id = 'sf-local-badge';
      b.className = 'sf-badge-local';
      b.textContent = isFr() ? '⚡ 100% Local · 140+ Apps' : '⚡ 100% Instant · 140+ Apps';
      tabsRow.appendChild(b);
    }

    if (input) {
      input.addEventListener('input', () => {
        renderResults(input.value, activeCat, false);
      });
      input.addEventListener('focus', () => {
        if (input.value.trim()) renderResults(input.value, activeCat, true);
      });
    }

    // Update badge on language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const b = document.getElementById('sf-local-badge');
          if (b) b.textContent = isFr() ? '⚡ 100% Local · 140+ Apps' : '⚡ 100% Instant · 140+ Apps';
          const panel = document.getElementById('sf-results-panel');
          if (panel && panel.classList.contains('open') && input) {
            renderResults(input.value, activeCat, true);
          }
        }, 60);
      });
    });
  }

  window.IASmartFinder = {
    setCategory: function (cat, btn) {
      activeCat = cat || 'all';
      document.querySelectorAll('.prompt-mode-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const input = document.querySelector('.prompt-launcher .prompt-input');
      renderResults(input ? input.value : '', activeCat, true);
    },
    search: function (query, cat) {
      const input = document.querySelector('.prompt-launcher .prompt-input');
      if (input && query !== undefined) input.value = query;
      if (cat) activeCat = cat;
      renderResults(query !== undefined ? query : (input ? input.value : ''), activeCat, true);
    },
    submit: function (e) {
      if (e) e.preventDefault();
      const input = document.querySelector('.prompt-launcher .prompt-input');
      const q = input ? input.value.trim() : '';
      renderResults(q, activeCat, true);
    },
    getCatalog: () => CATALOG
  };

  document.addEventListener('DOMContentLoaded', initSmartFinder);
})(window, document);
