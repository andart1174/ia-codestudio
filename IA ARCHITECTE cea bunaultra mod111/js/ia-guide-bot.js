(function() {
'use strict';

/* ═══════════════════════════════════════════════════════════════════════
   IA GUIDE BOT v3.0 — GENIUS EDITION
   • Knows EVERY module in the app (250+ modules)
   • Interactive Welcome Tour on first visit
   • Animated onboarding with category exploration
   • Smart intent matching in EN & FR
   ═══════════════════════════════════════════════════════════════════════ */

var BOT_OPEN = false;
var CHAT_HISTORY = [];
var TOUR_ACTIVE = false;
var TOUR_STEP = 0;

// ─── Full Module Knowledge Base ────────────────────────────────────────
var FULL_KB = {
  // ── AI & GENERATION ──────────────────────────────────────────────────
  iaultra:     { icon:'⚡', name:'IA ULTRA', cat:'AI Studio', tab:'iaultra',
    desc:'Le module le plus puissant. Tapez n\'importe quelle idée en langage naturel → un site web complet est généré instantanément avec HTML, CSS et JS stylisés.',
    desc_en:'The most powerful module. Type any idea in natural language → a complete styled website is generated instantly with HTML, CSS and JS.',
    how:'1. Tapez "Un restaurant de sushi" → 2. Appuyez Entrée → 3. Site complet généré !',
    how_en:'1. Type "A sushi restaurant" → 2. Press Enter → 3. Complete site generated!' },
  iapro:       { icon:'💎', name:'IA PRO', cat:'AI Studio', tab:'iapro',
    desc:'Templates d\'applications professionnels. Choisissez un modèle, personnalisez, exportez en HTML autonome.',
    desc_en:'Professional app templates. Choose a template, customize, export as standalone HTML.',
    how:'1. Parcourir les templates → 2. Sélectionner → 3. Personnaliser et exporter',
    how_en:'1. Browse templates → 2. Select one → 3. Customize and export' },
  voice:       { icon:'🎙️', name:'Voice AI', cat:'AI Studio', tab:'voice',
    desc:'Dictez ou tapez une commande → l\'IA génère du HTML/CSS et l\'injecte dans l\'éditeur immédiatement.',
    desc_en:'Dictate or type a command → AI generates HTML/CSS and injects it into the editor immediately.',
    how:'1. Cliquer le micro → 2. Dire "Ajoute une navbar bleue" → 3. Code injecté !',
    how_en:'1. Click mic → 2. Say "Add blue navbar" → 3. Code injected!' },
  wizard:      { icon:'🪄', name:'App Wizard', cat:'AI Studio', tab:'wizard',
    desc:'Assistant guidé pour créer une application en quelques étapes. Remplissez le formulaire et le code est généré.',
    desc_en:'Guided assistant to create an application in a few steps. Fill the form and code is generated.',
    how:'1. Choisir le type d\'app → 2. Remplir les détails → 3. Générer',
    how_en:'1. Choose app type → 2. Fill details → 3. Generate' },
  prompt:      { icon:'⚡', name:'Prompt-to-App', cat:'AI Studio', tab:'prompt',
    desc:'Convertissez un prompt détaillé en application fonctionnelle complète. Plus précis qu\'IA ULTRA.',
    desc_en:'Convert a detailed prompt into a full functional application. More precise than IA ULTRA.',
    how:'1. Écrire un prompt détaillé → 2. Générer → 3. App complète créée',
    how_en:'1. Write a detailed prompt → 2. Generate → 3. Full app created' },
  onemin:      { icon:'⏱️', name:'1-Min App', cat:'AI Studio', tab:'onemin',
    desc:'Créez une mini-application en moins d\'une minute avec des templates prêts à l\'emploi.',
    desc_en:'Create a mini-application in under a minute with ready-to-use templates.',
    how:'1. Choisir un template → 2. Personnaliser → 3. Prêt en 60 secondes',
    how_en:'1. Choose template → 2. Customize → 3. Ready in 60 seconds' },
  aichat:      { icon:'💬', name:'AI Chat', cat:'AI Studio', tab:'aichat',
    desc:'Assistant IA de chat intégré pour poser des questions de code, obtenir des suggestions et de l\'aide.',
    desc_en:'Built-in AI chat assistant for code questions, suggestions and help.',
    how:'1. Ouvrir le chat → 2. Poser votre question → 3. Obtenir une réponse IA',
    how_en:'1. Open chat → 2. Ask your question → 3. Get AI response' },
  aichatbot:   { icon:'🤖', name:'AI Chatbot', cat:'AI Studio', tab:'aichatbot',
    desc:'Créez votre propre chatbot IA personnalisé avec prompt engineering, réponses préprogrammées et interface intégrée.',
    desc_en:'Build your own custom AI chatbot with prompt engineering, pre-programmed responses and embedded interface.',
    how:'1. Configurer le chatbot → 2. Définir les réponses → 3. Exporter le widget',
    how_en:'1. Configure chatbot → 2. Define responses → 3. Export widget' },
  aichatbotrag:{ icon:'🤖', name:'AI Chatbot Studio', cat:'AI Studio', tab:'aichatbotrag',
    desc:'Studio RAG avancé pour chatbots IA avec base de connaissances personnalisée et apprentissage de documents.',
    desc_en:'Advanced RAG studio for AI chatbots with custom knowledge base and document learning.',
    how:'1. Uploader des documents → 2. Configurer le RAG → 3. Tester le chatbot',
    how_en:'1. Upload documents → 2. Configure RAG → 3. Test chatbot' },
  bugfixer:    { icon:'🤖', name:'AI Bug Fixer', cat:'AI Studio', tab:'bugfix',
    desc:'Collez une erreur console → obtenez une explication + code de correction instantanément.',
    desc_en:'Paste a console error → get explanation + fix code instantly.',
    how:'1. Coller l\'erreur → 2. Cliquer Analyser → 3. Copier la correction',
    how_en:'1. Paste error → 2. Click Analyze → 3. Copy fix' },
  codeexplain: { icon:'🔮', name:'Code Explainer', cat:'AI Studio', tab:'codeexplain',
    desc:'Collez n\'importe quel code → l\'IA l\'explique ligne par ligne en EN ou FR.',
    desc_en:'Paste any code → AI explains it line by line in EN or FR.',
    how:'1. Coller le code → 2. Choisir EN/FR → 3. Cliquer Expliquer',
    how_en:'1. Paste code → 2. Choose EN/FR → 3. Click Explain' },
  genius:      { icon:'🧠', name:'Genius', cat:'AI Studio', tab:'genius',
    desc:'Module d\'intelligence artificielle avancée pour suggestions de code contextuelles et optimisations.',
    desc_en:'Advanced artificial intelligence module for contextual code suggestions and optimizations.',
    how:'1. Ouvrir Genius → 2. Analyser le code → 3. Appliquer suggestions',
    how_en:'1. Open Genius → 2. Analyze code → 3. Apply suggestions' },
  ailab:       { icon:'🤖', name:'AI Lab', cat:'AI Studio', tab:'ailab',
    desc:'Laboratoire d\'expérimentation IA pour tester différents modèles et prompts en conditions réelles.',
    desc_en:'AI experimentation lab to test different models and prompts in real conditions.',
    how:'1. Sélectionner un modèle → 2. Tester le prompt → 3. Comparer les résultats',
    how_en:'1. Select model → 2. Test prompt → 3. Compare results' },
  vision:      { icon:'📷', name:'Vision AI', cat:'AI Studio', tab:'vision',
    desc:'Analysez des images avec l\'IA pour extraire du code CSS ou HTML depuis des maquettes et screenshots.',
    desc_en:'Analyze images with AI to extract CSS or HTML code from mockups and screenshots.',
    how:'1. Uploader une image → 2. Analyser → 3. Code extrait automatiquement',
    how_en:'1. Upload image → 2. Analyze → 3. Code extracted automatically' },
  nodelogic:   { icon:'🔗', name:'Node Logic', cat:'AI Studio', tab:'nodelogic',
    desc:'Construisez de la logique JavaScript visuellement en connectant des blocs — sans écrire de code.',
    desc_en:'Build JavaScript logic visually by connecting blocks — without writing code.',
    how:'1. Choisir un événement → 2. Ajouter des actions → 3. Compiler en JS',
    how_en:'1. Choose event → 2. Add actions → 3. Compile to JS' },
  smartfaq:    { icon:'❓', name:'Smart FAQ', cat:'AI Studio', tab:'smartfaq',
    desc:'Générateur de FAQ intelligent basé sur l\'IA pour votre site ou application.',
    desc_en:'AI-powered smart FAQ generator for your site or application.',
    how:'1. Décrire le produit → 2. Générer FAQ → 3. Injecter dans l\'éditeur',
    how_en:'1. Describe product → 2. Generate FAQ → 3. Inject to editor' },
  predictor:   { icon:'🔮', name:'Predictor', cat:'AI Studio', tab:'predictor',
    desc:'Prédicteur de comportement utilisateur basé sur des patterns de code et UX.',
    desc_en:'User behavior predictor based on code patterns and UX.',
    how:'1. Analyser le code → 2. Voir les prédictions → 3. Optimiser',
    how_en:'1. Analyze code → 2. See predictions → 3. Optimize' },

  // ── NEXUS FORGE & QUANTUM LAB ─────────────────────────────────────────
  nexusforge:  { icon:'🚀', name:'NEXUS FORGE', cat:'NEXUS FORGE', tab:'nexusforge',
    desc:'Module ultra-révolutionnaire combinant 7 fonctionnalités de pointe pour la génération de projets complets.',
    desc_en:'Ultra-revolutionary module combining 7 cutting-edge features for complete project generation.',
    how:'1. Choisir le type de projet → 2. Configurer → 3. Générer',
    how_en:'1. Choose project type → 2. Configure → 3. Generate' },
  quantumlab:  { icon:'⚛️', name:'Quantum Lab', cat:'QUANTUM LAB', tab:'quantumlab',
    desc:'Laboratoire d\'innovations expérimentales avec 5 fonctionnalités uniques pour les développeurs avancés.',
    desc_en:'Experimental innovation lab with 5 unique features for advanced developers.',
    how:'1. Sélectionner l\'expérience → 2. Configurer → 3. Exécuter',
    how_en:'1. Select experiment → 2. Configure → 3. Execute' },

  // ── DESIGN & UI ───────────────────────────────────────────────────────
  dtstudio:    { icon:'🎨', name:'Design Tokens', cat:'Design & UI', tab:'dtstudio',
    desc:'Créez et gérez votre système de design avec des tokens (couleurs, typographie, espacement). Exportez en CSS variables.',
    desc_en:'Create and manage your design system with tokens (colors, typography, spacing). Export as CSS variables.',
    how:'1. Créer tokens → 2. Organiser le système → 3. Exporter CSS',
    how_en:'1. Create tokens → 2. Organize system → 3. Export CSS' },
  stylelab:    { icon:'🎨', name:'Style Lab', cat:'Design & UI', tab:'stylelab',
    desc:'Laboratoire de styles visuels pour expérimenter avec des effets CSS avancés en temps réel.',
    desc_en:'Visual styles laboratory to experiment with advanced CSS effects in real time.',
    how:'1. Sélectionner un effet → 2. Ajuster les paramètres → 3. Copier le CSS',
    how_en:'1. Select effect → 2. Adjust parameters → 3. Copy CSS' },
  colors:      { icon:'🎨', name:'Colors', cat:'Design & UI', tab:'colors',
    desc:'Gestionnaire de couleurs avancé avec palettes harmonieuses, accessibilité et export multi-format.',
    desc_en:'Advanced color manager with harmonious palettes, accessibility and multi-format export.',
    how:'1. Choisir couleur → 2. Générer palette → 3. Exporter',
    how_en:'1. Choose color → 2. Generate palette → 3. Export' },
  colorharmony:{ icon:'🌈', name:'Color Harmony', cat:'Design & UI', tab:'colorharmony',
    desc:'Choisissez une couleur de base → générez une palette harmonieuse (complémentaire, triadique, analogique).',
    desc_en:'Pick a base color → generate a harmonious palette (complementary, triadic, analogic).',
    how:'1. Choisir couleur → 2. Sélectionner harmonie → 3. Copier palette',
    how_en:'1. Pick color → 2. Select harmony → 3. Copy palette' },
  gradientforge:{ icon:'🎨', name:'Gradient Forge', cat:'Design & UI', tab:'gradientforge',
    desc:'Créez des dégradés mesh, coniques, radiaux visuellement. Exportez en CSS ou SVG.',
    desc_en:'Build mesh, conic, radial gradients visually. Export as CSS or SVG.',
    how:'1. Choisir le type → 2. Glisser les couleurs → 3. Copier CSS',
    how_en:'1. Pick type → 2. Drag color stops → 3. Copy CSS' },
  gradient:    { icon:'🌈', name:'Gradient Studio', cat:'Design & UI', tab:'gradient',
    desc:'Studio de dégradés avec présets et éditeur visuel avancé pour créer des effets de couleur spectaculaires.',
    desc_en:'Gradient studio with presets and advanced visual editor for creating spectacular color effects.',
    how:'1. Choisir préset → 2. Personnaliser → 3. Exporter',
    how_en:'1. Choose preset → 2. Customize → 3. Export' },
  themepicker: { icon:'🎨', name:'Theme Picker', cat:'Design & UI', tab:'themepicker',
    desc:'Sélectionnez parmi des thèmes UI prêts à l\'emploi et appliquez-les à votre code instantanément.',
    desc_en:'Select from ready-to-use UI themes and apply them to your code instantly.',
    how:'1. Parcourir les thèmes → 2. Prévisualiser → 3. Appliquer',
    how_en:'1. Browse themes → 2. Preview → 3. Apply' },
  typography:  { icon:'🔤', name:'Typography AI', cat:'Design & UI', tab:'typography',
    desc:'Choisissez une ambiance → l\'IA suggère des combinaisons de polices Google avec aperçu en direct.',
    desc_en:'Pick a mood → AI suggests Google Font combos with live preview.',
    how:'1. Sélectionner ambiance → 2. Voir les paires → 3. Injecter dans l\'éditeur',
    how_en:'1. Select mood → 2. See font pairs → 3. Inject to editor' },
  fontexplorer:{ icon:'🔤', name:'Font Explorer', cat:'Design & UI', tab:'fontexplorer',
    desc:'Explorez et testez des centaines de polices Google Fonts avec aperçu en temps réel sur votre texte.',
    desc_en:'Explore and test hundreds of Google Fonts with real-time preview on your text.',
    how:'1. Chercher police → 2. Prévisualiser → 3. Injecter',
    how_en:'1. Search font → 2. Preview → 3. Inject' },
  svgstudio:   { icon:'✒️', name:'SVG Studio', cat:'Design & UI', tab:'svgstudio',
    desc:'Décrivez une icône en mots → obtenez un vecteur SVG évolutif !',
    desc_en:'Describe an icon in words → get a scalable SVG vector!',
    how:'1. Taper description (ex: "cœur rouge") → 2. Générer SVG → 3. Copier/Injecter',
    how_en:'1. Type description (e.g. "red heart") → 2. Generate SVG → 3. Copy/Inject' },
  svgdraw:     { icon:'✍️', name:'SVG Draw Studio', cat:'Design & UI', tab:'svgdraw',
    desc:'Dessinez des icônes et illustrations SVG directement dans l\'application avec des outils vectoriels.',
    desc_en:'Draw SVG icons and illustrations directly in the app with vector tools.',
    how:'1. Dessiner sur le canvas → 2. Ajuster → 3. Exporter SVG',
    how_en:'1. Draw on canvas → 2. Adjust → 3. Export SVG' },
  svgshaper:   { icon:'🌊', name:'SVG Shaper', cat:'Design & UI', tab:'svgshaper',
    desc:'Créez des formes SVG complexes et des paths animés avec un éditeur de points de contrôle.',
    desc_en:'Create complex SVG shapes and animated paths with a control point editor.',
    how:'1. Choisir forme de base → 2. Manipuler points → 3. Animer',
    how_en:'1. Choose base shape → 2. Manipulate points → 3. Animate' },
  draw3d:      { icon:'🎨', name:'Draw → 3D', cat:'Design & UI', tab:'draw3d',
    desc:'Dessinez des formes 2D → extrudées en objets 3D en temps réel. Exportez la scène 3D.',
    desc_en:'Draw 2D shapes → extruded into 3D objects in real-time. Export the 3D scene.',
    how:'1. Dessiner sur canvas → 2. Ajuster profondeur → 3. Exporter scène 3D',
    how_en:'1. Draw on canvas → 2. Adjust depth → 3. Export 3D scene' },
  icongen:     { icon:'🎨', name:'Icon Generator', cat:'Design & UI', tab:'icongen',
    desc:'Générez favicon + jeu d\'icônes (16px→512px) depuis emoji ou texte.',
    desc_en:'Generate favicon + icon set (16px→512px) from emoji or text.',
    how:'1. Taper emoji/lettre → 2. Choisir style → 3. Télécharger PNG',
    how_en:'1. Type emoji/letter → 2. Pick style → 3. Download PNG set' },
  glassmorphism:{ icon:'💎', name:'Glassmorphism', cat:'Design & UI', tab:'glassmorphism',
    desc:'Générez des composants UI en verre avec contrôles de flou et de transparence. Effet modern glassmorphism.',
    desc_en:'Generate glass-effect UI components with blur and transparency controls. Modern glassmorphism effect.',
    how:'1. Ajuster flou/opacité → 2. Prévisualiser → 3. Copier CSS',
    how_en:'1. Adjust blur/opacity → 2. Preview → 3. Copy CSS' },
  themebreeder:{ icon:'🧬', name:'Theme Breeder', cat:'Design & UI', tab:'themebreeder',
    desc:'Croisez deux thèmes UI pour créer un nouveau thème hybride unique avec un système génétique.',
    desc_en:'Cross two UI themes to create a unique hybrid theme with a genetic system.',
    how:'1. Sélectionner 2 thèmes parents → 2. Croiser → 3. Nouveau thème créé',
    how_en:'1. Select 2 parent themes → 2. Cross-breed → 3. New theme created' },
  uidreamer:   { icon:'🎨', name:'UI Dreamer', cat:'Design & UI', tab:'uidreamer',
    desc:'Décrivez l\'interface de vos rêves en mots → l\'IA génère le design complet.',
    desc_en:'Describe your dream interface in words → AI generates the complete design.',
    how:'1. Décrire l\'interface → 2. Générer → 3. Personnaliser',
    how_en:'1. Describe interface → 2. Generate → 3. Customize' },
  cssarchitect:{ icon:'🎨', name:'CSS Architect', cat:'Design & UI', tab:'cssarchitect',
    desc:'Architecte CSS avancé pour créer des systèmes de design cohérents et maintenables.',
    desc_en:'Advanced CSS architect for creating coherent and maintainable design systems.',
    how:'1. Définir la base → 2. Créer composants → 3. Exporter système CSS',
    how_en:'1. Define base → 2. Create components → 3. Export CSS system' },
  herobuilder: { icon:'🎨', name:'Hero Builder', cat:'Design & UI', tab:'herobuilder',
    desc:'Créez des sections hero spectaculaires pour vos sites web avec animations et gradients.',
    desc_en:'Create spectacular hero sections for your websites with animations and gradients.',
    how:'1. Choisir layout → 2. Personnaliser → 3. Injecter dans éditeur',
    how_en:'1. Choose layout → 2. Customize → 3. Inject to editor' },
  background:  { icon:'🖼️', name:'Background Lab', cat:'Design & UI', tab:'bglab',
    desc:'Générez des fonds animés/statiques: particules, vagues, dégradés. Exportez CSS/JS.',
    desc_en:'Generate animated/static backgrounds: particles, waves, gradients. Export CSS/JS.',
    how:'1. Choisir style → 2. Personnaliser → 3. Copier CSS/JS',
    how_en:'1. Choose style → 2. Customize → 3. Copy CSS/JS' },
  uishuffler:  { icon:'🔀', name:'UI Shuffler', cat:'Design & UI', tab:'uishuffler',
    desc:'Mélangez et réarrangez les composants UI pour explorer différentes combinaisons de design.',
    desc_en:'Shuffle and rearrange UI components to explore different design combinations.',
    how:'1. Charger les composants → 2. Mélanger → 3. Sauvegarder le meilleur',
    how_en:'1. Load components → 2. Shuffle → 3. Save the best one' },
  styleclone:  { icon:'🎭', name:'Style Clone', cat:'Design & UI', tab:'styleclone',
    desc:'Clonez le style visuel d\'un site web et appliquez-le à votre code automatiquement.',
    desc_en:'Clone the visual style of a website and apply it to your code automatically.',
    how:'1. Entrer URL → 2. Extraire style → 3. Appliquer à votre code',
    how_en:'1. Enter URL → 2. Extract style → 3. Apply to your code' },
  cssshortcuts:{ icon:'🎯', name:'CSS Shortcuts', cat:'Design & UI', tab:'cssshortcuts',
    desc:'Bibliothèque de raccourcis CSS les plus utiles avec exemples interactifs et copie rapide.',
    desc_en:'Library of most useful CSS shortcuts with interactive examples and quick copy.',
    how:'1. Chercher un effet → 2. Voir l\'exemple → 3. Copier le code',
    how_en:'1. Search effect → 2. See example → 3. Copy code' },
  colorblind:  { icon:'👁️', name:'ColorBlind Simulator', cat:'Design & UI', tab:'colorblind',
    desc:'Simulez comment votre site apparaît aux personnes daltoniennes pour assurer l\'accessibilité.',
    desc_en:'Simulate how your site appears to color-blind people to ensure accessibility.',
    how:'1. Prévisualiser le site → 2. Sélectionner type daltonisme → 3. Comparer',
    how_en:'1. Preview site → 2. Select colorblindness type → 3. Compare' },

  // ── LAYOUT & FLOW ─────────────────────────────────────────────────────
  grid:        { icon:'📐', name:'Grid Builder', cat:'Layout & Flow', tab:'grid',
    desc:'Constructeur de grilles CSS visuellement avec glisser-déposer. Exportez du CSS Grid propre.',
    desc_en:'Visual CSS grid builder with drag-and-drop. Export clean CSS Grid code.',
    how:'1. Créer grille → 2. Glisser éléments → 3. Copier CSS',
    how_en:'1. Create grid → 2. Drag items → 3. Copy CSS' },
  gridbuilder: { icon:'📐', name:'Grid/Flexbox Builder', cat:'Layout & Flow', tab:'gridbuilder',
    desc:'Constructeur visuel de layouts avec Grid et Flexbox. Glissez-déposez et exportez le CSS.',
    desc_en:'Visual layout builder with Grid and Flexbox. Drag-and-drop and export CSS.',
    how:'1. Choisir Grid/Flex → 2. Glisser éléments → 3. Copier CSS',
    how_en:'1. Choose Grid/Flex → 2. Drag items → 3. Copy CSS' },
  uiblocks:    { icon:'🧩', name:'UI Blocks', cat:'Layout & Flow', tab:'uiblocks',
    desc:'Bibliothèque de blocs UI prêts à l\'emploi: navbars, heroes, cards, footers. Copie en 1 clic.',
    desc_en:'Library of ready-to-use UI blocks: navbars, heroes, cards, footers. 1-click copy.',
    how:'1. Parcourir les blocs → 2. Prévisualiser → 3. Injecter dans l\'éditeur',
    how_en:'1. Browse blocks → 2. Preview → 3. Inject to editor' },
  uiforge:     { icon:'🧊', name:'UI Forge', cat:'Layout & Flow', tab:'uiforge',
    desc:'Forgez des composants UI sur mesure avec des configurateurs visuels et des options avancées.',
    desc_en:'Forge custom UI components with visual configurators and advanced options.',
    how:'1. Choisir composant → 2. Configurer → 3. Générer et copier',
    how_en:'1. Choose component → 2. Configure → 3. Generate and copy' },
  breakpoints: { icon:'📏', name:'Breakpoints', cat:'Layout & Flow', tab:'breakpoints',
    desc:'Testez vos layouts sur différentes tailles d\'écran avec des breakpoints CSS personnalisables.',
    desc_en:'Test your layouts on different screen sizes with customizable CSS breakpoints.',
    how:'1. Entrer les breakpoints → 2. Prévisualiser → 3. Copier le CSS responsive',
    how_en:'1. Enter breakpoints → 2. Preview → 3. Copy responsive CSS' },
  arch:        { icon:'📊', name:'Flowchart Builder', cat:'Layout & Flow', tab:'arch',
    desc:'Créez des diagrammes de flux, d\'architecture et des organigrammes directement dans l\'application.',
    desc_en:'Create flowcharts, architecture diagrams and org charts directly in the app.',
    how:'1. Ajouter des nœuds → 2. Connecter → 3. Exporter SVG/PNG',
    how_en:'1. Add nodes → 2. Connect → 3. Export SVG/PNG' },
  appassembler:{ icon:'🏗️', name:'App Assembler', cat:'Layout & Flow', tab:'appassembler',
    desc:'Assemblez des applications complètes en combinant des sections et composants pré-construits.',
    desc_en:'Assemble complete applications by combining pre-built sections and components.',
    how:'1. Choisir sections → 2. Organiser → 3. Générer app complète',
    how_en:'1. Choose sections → 2. Organize → 3. Generate complete app' },
  legobuilder: { icon:'🧱', name:'Component Forge', cat:'Layout & Flow', tab:'legobuilder',
    desc:'Construisez des composants réutilisables comme des briques Lego et assemblez-les en interfaces.',
    desc_en:'Build reusable components like Lego bricks and assemble them into interfaces.',
    how:'1. Créer composants → 2. Assembler → 3. Exporter le tout',
    how_en:'1. Create components → 2. Assemble → 3. Export everything' },
  spacingaudit:{ icon:'📐', name:'Spacing Audit', cat:'Layout & Flow', tab:'spacingaudit',
    desc:'Auditez et corrigez les espaces incohérents dans votre CSS. Harmonisez le spacing system.',
    desc_en:'Audit and fix inconsistent spacing in your CSS. Harmonize the spacing system.',
    how:'1. Analyser le CSS → 2. Voir les incohérences → 3. Corriger automatiquement',
    how_en:'1. Analyze CSS → 2. See inconsistencies → 3. Auto-fix' },
  guidedbuilder:{ icon:'🧭', name:'Guided Builder', cat:'Layout & Flow', tab:'guidedbuilder',
    desc:'Assistant guidé étape par étape pour construire des interfaces de A à Z avec de l\'aide contextuelle.',
    desc_en:'Step-by-step guided assistant to build interfaces from A to Z with contextual help.',
    how:'1. Suivre les étapes → 2. Construire avec l\'aide → 3. Finaliser',
    how_en:'1. Follow steps → 2. Build with guidance → 3. Finalize' },
  layout:      { icon:'📐', name:'Layout Studio', cat:'Layout & Flow', tab:'layout',
    desc:'Studio de mise en page avancé pour créer des layouts complexes avec présets professionnels.',
    desc_en:'Advanced layout studio for creating complex layouts with professional presets.',
    how:'1. Choisir preset → 2. Personnaliser → 3. Exporter',
    how_en:'1. Choose preset → 2. Customize → 3. Export' },
  userflow:    { icon:'🗺️', name:'User Flow', cat:'Layout & Flow', tab:'userflow',
    desc:'Mappez le parcours utilisateur de votre application avec des diagrammes de flux interactifs.',
    desc_en:'Map your application\'s user journey with interactive flow diagrams.',
    how:'1. Définir les écrans → 2. Connecter les flux → 3. Exporter',
    how_en:'1. Define screens → 2. Connect flows → 3. Export' },
  journey:     { icon:'🗺️', name:'Journey Map', cat:'Layout & Flow', tab:'journey',
    desc:'Créez des cartes de parcours client détaillées pour analyser l\'expérience utilisateur.',
    desc_en:'Create detailed customer journey maps to analyze user experience.',
    how:'1. Définir phases → 2. Ajouter touchpoints → 3. Analyser',
    how_en:'1. Define phases → 2. Add touchpoints → 3. Analyze' },
  respmatrix:  { icon:'📱', name:'Responsive Matrix', cat:'Layout & Flow', tab:'respmatrix',
    desc:'Testez votre site simultanément sur toutes les résolutions d\'écran dans une matrice comparative.',
    desc_en:'Test your site simultaneously on all screen resolutions in a comparative matrix.',
    how:'1. Charger le site → 2. Sélectionner résolutions → 3. Comparer',
    how_en:'1. Load site → 2. Select resolutions → 3. Compare' },

  // ── DEV TOOLS ─────────────────────────────────────────────────────────
  regexforge:  { icon:'🧩', name:'Regex Forge', cat:'Dev Tools', tab:'regexforge',
    desc:'Constructeur visuel de regex. Tapez du texte et il génère le pattern regex correspondant.',
    desc_en:'Visual regex builder. Type text and it generates the corresponding regex pattern.',
    how:'1. Taper email/url/number → 2. Cliquer Build Regex → 3. Code injecté !',
    how_en:'1. Type email/url/number → 2. Click Build Regex → 3. Code injected!' },
  cronstudio:  { icon:'⏳', name:'Cron Studio', cat:'Dev Tools', tab:'cronstudio',
    desc:'Générez des schedules de cron jobs via une liste déroulante simple. Exportez l\'expression.',
    desc_en:'Generate cron job schedules via a simple dropdown. Export the expression.',
    how:'1. Sélectionner schedule ("Chaque lundi à 4h") → 2. Code injecté !',
    how_en:'1. Select schedule ("Every Monday at 4AM") → 2. Code injected!' },
  tools:       { icon:'🛠', name:'Dev Tools', cat:'Dev Tools', tab:'tools',
    desc:'Collection d\'outils de développement essentiels: formateurs, validateurs, convertisseurs.',
    desc_en:'Collection of essential development tools: formatters, validators, converters.',
    how:'1. Sélectionner outil → 2. Utiliser → 3. Copier résultat',
    how_en:'1. Select tool → 2. Use → 3. Copy result' },
  tpro:        { icon:'🧰', name:'Toolbox Pro', cat:'Dev Tools', tab:'tpro',
    desc:'Boîte à outils professionnelle avec outils avancés pour développeurs expérimentés.',
    desc_en:'Professional toolbox with advanced tools for experienced developers.',
    how:'1. Parcourir les outils → 2. Sélectionner → 3. Utiliser',
    how_en:'1. Browse tools → 2. Select → 3. Use' },
  snippets:    { icon:'📦', name:'Snippets', cat:'Dev Tools', tab:'snippets',
    desc:'Bibliothèque de snippets de code organisés par langage et catégorie. Copie rapide en 1 clic.',
    desc_en:'Code snippet library organized by language and category. Quick 1-click copy.',
    how:'1. Chercher snippet → 2. Prévisualiser → 3. Injecter',
    how_en:'1. Search snippet → 2. Preview → 3. Inject' },
  forge:       { icon:'🧩', name:'Code Forge', cat:'Dev Tools', tab:'forge',
    desc:'Forgez des structures de code complexes à partir de templates et patterns pré-construits.',
    desc_en:'Forge complex code structures from pre-built templates and patterns.',
    how:'1. Choisir pattern → 2. Configurer → 3. Générer code',
    how_en:'1. Choose pattern → 2. Configure → 3. Generate code' },
  stack:       { icon:'🏗️', name:'Stack Builder', cat:'Dev Tools', tab:'stack',
    desc:'Choisissez votre stack technologique et générez la configuration de projet correspondante.',
    desc_en:'Choose your tech stack and generate the corresponding project configuration.',
    how:'1. Sélectionner technologies → 2. Configurer → 3. Générer boilerplate',
    how_en:'1. Select technologies → 2. Configure → 3. Generate boilerplate' },
  mock:        { icon:'🗄️', name:'Backend Mock', cat:'Dev Tools', tab:'mock',
    desc:'Créez des APIs backend mockées pour tester votre frontend sans serveur réel.',
    desc_en:'Create mocked backend APIs to test your frontend without a real server.',
    how:'1. Définir endpoints → 2. Ajouter données → 3. Activer le mock',
    how_en:'1. Define endpoints → 2. Add data → 3. Activate mock' },
  pm:          { icon:'📁', name:'Project Manager', cat:'Dev Tools', tab:'pm',
    desc:'Gérez vos projets de développement: organisation des fichiers, notes et versions.',
    desc_en:'Manage your development projects: file organization, notes and versions.',
    how:'1. Créer projet → 2. Organiser → 3. Sauvegarder',
    how_en:'1. Create project → 2. Organize → 3. Save' },
  tm:          { icon:'🕰️', name:'History/Time Machine', cat:'Dev Tools', tab:'tm',
    desc:'Parcourez l\'historique de vos modifications de code. Restaurez n\'importe quelle version précédente.',
    desc_en:'Browse the history of your code changes. Restore any previous version.',
    how:'1. Ouvrir l\'historique → 2. Parcourir les snapshots → 3. Restaurer',
    how_en:'1. Open history → 2. Browse snapshots → 3. Restore' },
  devsim:      { icon:'📱', name:'Device Simulator', cat:'Dev Tools', tab:'devsim',
    desc:'Simulez votre site sur différents appareils: iPhone, Android, tablettes, desktops.',
    desc_en:'Simulate your site on different devices: iPhone, Android, tablets, desktops.',
    how:'1. Choisir appareil → 2. Prévisualiser → 3. Ajuster',
    how_en:'1. Choose device → 2. Preview → 3. Adjust' },
  settings:    { icon:'⚙', name:'Settings', cat:'Dev Tools', tab:'settings',
    desc:'Configurez les préférences de l\'application: thème, langue, raccourcis, comportements.',
    desc_en:'Configure application preferences: theme, language, shortcuts, behaviors.',
    how:'1. Ouvrir Settings → 2. Ajuster préférences → 3. Sauvegarder',
    how_en:'1. Open Settings → 2. Adjust preferences → 3. Save' },
  apimock:     { icon:'🔌', name:'API Mock', cat:'Dev Tools', tab:'apimock',
    desc:'Mocked API simplifiée pour tester les appels REST sans backend réel.',
    desc_en:'Simplified mocked API to test REST calls without a real backend.',
    how:'1. Configurer routes → 2. Définir réponses → 3. Tester',
    how_en:'1. Configure routes → 2. Define responses → 3. Test' },
  errordoctor: { icon:'🐛', name:'Error Doctor', cat:'Dev Tools', tab:'errordoctor',
    desc:'Diagnostiquez et corrigez les erreurs JavaScript avec des explications claires et des solutions.',
    desc_en:'Diagnose and fix JavaScript errors with clear explanations and solutions.',
    how:'1. Coller l\'erreur → 2. Diagnostiquer → 3. Appliquer correction',
    how_en:'1. Paste error → 2. Diagnose → 3. Apply fix' },
  refactor:    { icon:'⚡', name:'Smart Refactor', cat:'Dev Tools', tab:'refactor',
    desc:'Collez du code → l\'IA suggère des améliorations de refactoring et des patterns plus propres.',
    desc_en:'Paste code → AI suggests refactoring improvements and cleaner patterns.',
    how:'1. Coller code → 2. Analyser → 3. Appliquer suggestions',
    how_en:'1. Paste code → 2. Analyze → 3. Apply suggestions' },
  commit:      { icon:'✅', name:'Commit Helper', cat:'Dev Tools', tab:'commit',
    desc:'Générez des messages de commit Git clairs et standardisés depuis votre description de changements.',
    desc_en:'Generate clear and standardized Git commit messages from your change description.',
    how:'1. Décrire le changement → 2. Générer message → 3. Copier',
    how_en:'1. Describe change → 2. Generate message → 3. Copy' },
  hooks:       { icon:'🪝', name:'React Hooks', cat:'Dev Tools', tab:'hooks',
    desc:'Générateur de React hooks personnalisés avec exemples et documentation.',
    desc_en:'Custom React hooks generator with examples and documentation.',
    how:'1. Décrire le hook → 2. Générer → 3. Copier le code',
    how_en:'1. Describe hook → 2. Generate → 3. Copy code' },
  fwconvert:   { icon:'🔄', name:'Framework Converter', cat:'Dev Tools', tab:'fwconvert',
    desc:'Convertissez du code entre frameworks: React, Vue, Angular, Svelte, Vanilla JS.',
    desc_en:'Convert code between frameworks: React, Vue, Angular, Svelte, Vanilla JS.',
    how:'1. Choisir source/cible → 2. Coller code → 3. Convertir',
    how_en:'1. Choose source/target → 2. Paste code → 3. Convert' },
  apitester:   { icon:'🔌', name:'API Tester', cat:'Dev Tools', tab:'apitester',
    desc:'Testez des APIs REST: GET/POST/PUT/DELETE avec headers et body personnalisables.',
    desc_en:'Test REST APIs: GET/POST/PUT/DELETE with customizable headers and body.',
    how:'1. Entrer URL → 2. Choisir méthode → 3. Envoyer et voir la réponse',
    how_en:'1. Enter URL → 2. Choose method → 3. Send and see response' },
  npmexplorer: { icon:'📦', name:'NPM Explorer', cat:'Dev Tools', tab:'npmexplorer',
    desc:'Explorez et installez des packages npm directement depuis l\'application.',
    desc_en:'Explore and install npm packages directly from the application.',
    how:'1. Chercher package → 2. Voir détails → 3. Ajouter au projet',
    how_en:'1. Search package → 2. See details → 3. Add to project' },
  codedna:     { icon:'🧬', name:'Code DNA', cat:'Dev Tools', tab:'codedna',
    desc:'Visualisez l\'ADN de votre code: patterns, dépendances et structure sous forme génomique.',
    desc_en:'Visualize your code DNA: patterns, dependencies and structure in genomic form.',
    how:'1. Analyser le code → 2. Voir l\'ADN → 3. Optimiser',
    how_en:'1. Analyze code → 2. See DNA → 3. Optimize' },
  profiler:    { icon:'⚡', name:'Code Profiler', cat:'Dev Tools', tab:'profiler',
    desc:'Profilez les performances de votre code pour identifier les goulots d\'étranglement.',
    desc_en:'Profile your code performance to identify bottlenecks.',
    how:'1. Coller code → 2. Profiler → 3. Identifier les problèmes',
    how_en:'1. Paste code → 2. Profile → 3. Identify issues' },
  githubsync:  { icon:'🐙', name:'GitHub Sync', cat:'Dev Tools', tab:'githubsync',
    desc:'Connectez-vous à GitHub: push/pull code directement depuis le studio.',
    desc_en:'Connect to GitHub: push/pull code directly from the studio.',
    how:'1. Entrer repo + token → 2. Pull/push → 3. Synchroniser',
    how_en:'1. Enter repo + token → 2. Pull/push → 3. Sync' },

  // ── ADVANCED DEVELOPS STUDIO ──────────────────────────────────────────
  codesonar:   { icon:'🔊', name:'Code Sonar', cat:'Advanced Develops Studio', tab:'codesonar',
    desc:'Analysez votre code avec un "sonar" sonore — chaque élément de code génère un signal audio unique.',
    desc_en:'Analyze your code with a sound "sonar" — each code element generates a unique audio signal.',
    how:'1. Coller le code → 2. Activer le sonar → 3. Écouter les patterns',
    how_en:'1. Paste code → 2. Activate sonar → 3. Listen to patterns' },
  projectassembler:{ icon:'📂', name:'Multi-File Manager', cat:'Advanced Develops Studio', tab:'projectassembler',
    desc:'Gérez plusieurs fichiers HTML, CSS, JS en même temps. Prévisualisez le projet complet.',
    desc_en:'Manage multiple HTML, CSS, JS files at the same time. Preview the complete project.',
    how:'1. Créer les fichiers → 2. Organiser → 3. Prévisualiser le projet',
    how_en:'1. Create files → 2. Organize → 3. Preview project' },
  dbcrudapi:   { icon:'💾', name:'Visual CRUD', cat:'Advanced Develops Studio', tab:'dbcrudapi',
    desc:'Créez des interfaces CRUD visuellement et générez l\'API REST correspondante automatiquement.',
    desc_en:'Create CRUD interfaces visually and generate the corresponding REST API automatically.',
    how:'1. Définir entités → 2. Configurer CRUD → 3. Générer API',
    how_en:'1. Define entities → 2. Configure CRUD → 3. Generate API' },
  prodoptimizer:{ icon:'⚡', name:'Production Optimizer', cat:'Advanced Develops Studio', tab:'prodoptimizer',
    desc:'Optimisez votre code pour la production: minification, tree-shaking, lazy loading.',
    desc_en:'Optimize your code for production: minification, tree-shaking, lazy loading.',
    how:'1. Analyser le code → 2. Appliquer optimisations → 3. Exporter',
    how_en:'1. Analyze code → 2. Apply optimizations → 3. Export' },
  e2etestgen:  { icon:'🧪', name:'E2E Testing Generator', cat:'Advanced Develops Studio', tab:'e2etestgen',
    desc:'Générez automatiquement des tests End-to-End (Playwright/Cypress) depuis votre interface.',
    desc_en:'Automatically generate End-to-End tests (Playwright/Cypress) from your interface.',
    how:'1. Décrire les scénarios → 2. Générer tests → 3. Exporter',
    how_en:'1. Describe scenarios → 2. Generate tests → 3. Export' },
  apiclientmock:{ icon:'🔌', name:'API Mock & Service Worker', cat:'Advanced Develops Studio', tab:'apiclientmock',
    desc:'Client API REST avec Service Worker Mock — testez les endpoints sans serveur réel.',
    desc_en:'REST API client with Service Worker Mock — test endpoints without a real server.',
    how:'1. Configurer les mocks → 2. Tester → 3. Documenter',
    how_en:'1. Configure mocks → 2. Test → 3. Document' },
  tailwindtranspile:{ icon:'🎨', name:'Tailwind CSS Transpiler', cat:'Advanced Develops Studio', tab:'tailwindtranspile',
    desc:'Convertissez du code Tailwind CSS en CSS pur et vice-versa. Prévisualisation en temps réel.',
    desc_en:'Convert Tailwind CSS code to pure CSS and vice versa. Real-time preview.',
    how:'1. Coller le code → 2. Choisir direction → 3. Convertir',
    how_en:'1. Paste code → 2. Choose direction → 3. Convert' },
  a11yautofix: { icon:'♿', name:'A11y Auto-Fixer', cat:'Advanced Develops Studio', tab:'a11yautofix',
    desc:'Détectez et corrigez automatiquement les problèmes d\'accessibilité WCAG dans votre code.',
    desc_en:'Automatically detect and fix WCAG accessibility issues in your code.',
    how:'1. Analyser le code → 2. Voir les erreurs → 3. Auto-corriger',
    how_en:'1. Analyze code → 2. See errors → 3. Auto-fix' },
  npmcdnexplorer:{ icon:'📦', name:'NPM & CDN Explorer', cat:'Advanced Develops Studio', tab:'npmcdnexplorer',
    desc:'Explorez des packages npm et des bibliothèques CDN, comparez et injectez directement.',
    desc_en:'Explore npm packages and CDN libraries, compare and inject directly.',
    how:'1. Chercher package → 2. Comparer → 3. Injecter CDN link',
    how_en:'1. Search package → 2. Compare → 3. Inject CDN link' },
  stateflowtracker:{ icon:'🔗', name:'State Flow Tracker', cat:'Advanced Develops Studio', tab:'stateflowtracker',
    desc:'Suivez et visualisez les flux d\'état dans vos applications React/Vue/Svelte.',
    desc_en:'Track and visualize state flows in your React/Vue/Svelte applications.',
    how:'1. Analyser l\'app → 2. Visualiser les flux → 3. Optimiser',
    how_en:'1. Analyze app → 2. Visualize flows → 3. Optimize' },
  webvitalsperf:{ icon:'⚡', name:'Lighthouse & Web Vitals', cat:'Advanced Develops Studio', tab:'webvitalsperf',
    desc:'Analysez les Core Web Vitals et le score Lighthouse de votre application pour maximiser les performances.',
    desc_en:'Analyze Core Web Vitals and Lighthouse score of your application to maximize performance.',
    how:'1. Tester l\'URL → 2. Voir le score → 3. Appliquer les recommandations',
    how_en:'1. Test URL → 2. See score → 3. Apply recommendations' },
  securityexploit:{ icon:'🛡️', name:'Security Scanner', cat:'Advanced Develops Studio', tab:'securityexploit',
    desc:'Scanner de sécurité avancé: XSS, CSRF, SQL injection, en-têtes de sécurité.',
    desc_en:'Advanced security scanner: XSS, CSRF, SQL injection, security headers.',
    how:'1. Entrer URL → 2. Scanner → 3. Voir rapport de sécurité',
    how_en:'1. Enter URL → 2. Scan → 3. See security report' },

  // ── PREMIUM STUDIOS ───────────────────────────────────────────────────
  assetoptimizer:{ icon:'🖼️', name:'Asset Optimizer', cat:'Premium Studios', tab:'assetoptimizer',
    desc:'Optimisez images, SVG, polices pour réduire le poids de votre site. Compression intelligente.',
    desc_en:'Optimize images, SVGs, fonts to reduce site weight. Intelligent compression.',
    how:'1. Uploader les assets → 2. Optimiser → 3. Télécharger la version légère',
    how_en:'1. Upload assets → 2. Optimize → 3. Download lightweight version' },
  codeprotector:{ icon:'🛡️', name:'Code Protector', cat:'Premium Studios', tab:'codeprotector',
    desc:'Obfusquez et protégez votre code JavaScript contre la copie et le reverse engineering.',
    desc_en:'Obfuscate and protect your JavaScript code against copying and reverse engineering.',
    how:'1. Coller le code → 2. Choisir niveau de protection → 3. Générer code protégé',
    how_en:'1. Paste code → 2. Choose protection level → 3. Generate protected code' },
  indexeddbmgr:{ icon:'🗄️', name:'IndexedDB Manager', cat:'Premium Studios', tab:'indexeddbmgr',
    desc:'Gérez les bases de données IndexedDB de votre application avec une interface visuelle.',
    desc_en:'Manage your application\'s IndexedDB databases with a visual interface.',
    how:'1. Ouvrir le manager → 2. Inspecter les stores → 3. Modifier les données',
    how_en:'1. Open manager → 2. Inspect stores → 3. Modify data' },
  hardwareapi: { icon:'📡', name:'Hardware API Studio', cat:'Premium Studios', tab:'hardwareapi',
    desc:'Accédez aux APIs matérielles du navigateur: caméra, micro, géolocalisation, Bluetooth, NFC.',
    desc_en:'Access browser hardware APIs: camera, microphone, geolocation, Bluetooth, NFC.',
    how:'1. Sélectionner API → 2. Tester → 3. Générer code d\'intégration',
    how_en:'1. Select API → 2. Test → 3. Generate integration code' },
  webrtcstreamer:{ icon:'📡', name:'WebRTC Streamer', cat:'Premium Studios', tab:'webrtcstreamer',
    desc:'Créez des applications de streaming vidéo/audio peer-to-peer avec WebRTC.',
    desc_en:'Create peer-to-peer video/audio streaming applications with WebRTC.',
    how:'1. Configurer les contraintes → 2. Démarrer stream → 3. Générer code',
    how_en:'1. Configure constraints → 2. Start stream → 3. Generate code' },
  svgmorphing: { icon:'🎨', name:'SVG Morphing Studio', cat:'Premium Studios', tab:'svgmorphing',
    desc:'Créez des animations de morphing entre formes SVG. Effets fluides et exportation CSS/JS.',
    desc_en:'Create morphing animations between SVG shapes. Smooth effects and CSS/JS export.',
    how:'1. Dessiner formes → 2. Créer animation → 3. Exporter CSS/JS',
    how_en:'1. Draw shapes → 2. Create animation → 3. Export CSS/JS' },
  meshgradient: { icon:'🌈', name:'Mesh Gradient Forge', cat:'Premium Studios', tab:'meshgradient',
    desc:'Créez des mesh gradients spectaculaires avec des points de contrôle interactifs. Export CSS.',
    desc_en:'Create spectacular mesh gradients with interactive control points. CSS export.',
    how:'1. Ajouter points de couleur → 2. Glisser → 3. Exporter CSS',
    how_en:'1. Add color points → 2. Drag → 3. Export CSS' },
  audiosynth:  { icon:'🎹', name:'Web Audio Synthesizer', cat:'Premium Studios', tab:'audiosynth',
    desc:'Synthétiseur audio complet dans le navigateur. Créez et exportez des sons et de la musique.',
    desc_en:'Complete audio synthesizer in the browser. Create and export sounds and music.',
    how:'1. Configurer oscillateurs → 2. Jouer notes → 3. Exporter audio',
    how_en:'1. Configure oscillators → 2. Play notes → 3. Export audio' },
  neuralnet:   { icon:'🧠', name:'Neural Network Sandbox', cat:'Premium Studios', tab:'neuralnet',
    desc:'Créez et entraînez des réseaux de neurones visuellement. Visualisez l\'apprentissage en direct.',
    desc_en:'Create and train neural networks visually. Watch live learning visualization.',
    how:'1. Définir architecture → 2. Charger données → 3. Entraîner et visualiser',
    how_en:'1. Define architecture → 2. Load data → 3. Train and visualize' },
  holographiccard:{ icon:'🎴', name:'Holographic 3D Cards', cat:'Premium Studios', tab:'holographiccard',
    desc:'Créez des cartes holographiques 3D interactives avec effets de lumière et reflets spectaculaires.',
    desc_en:'Create interactive 3D holographic cards with spectacular light effects and reflections.',
    how:'1. Choisir template → 2. Personnaliser → 3. Exporter composant',
    how_en:'1. Choose template → 2. Customize → 3. Export component' },

  // ── GENIUS LAB ────────────────────────────────────────────────────────
  musictosite: { icon:'🎵', name:'Music → Website', cat:'Genius Lab', tab:'musictosite',
    desc:'Uploadez une chanson → l\'IA analyse le mood et génère un site web correspondant à l\'ambiance.',
    desc_en:'Upload a song → AI analyzes the mood and generates a website matching the vibe.',
    how:'1. Uploader audio → 2. Analyser mood → 3. Générer le site',
    how_en:'1. Upload audio → 2. Analyze mood → 3. Generate site' },
  emotionadaptive:{ icon:'🫀', name:'Emotion Adaptive UI', cat:'Genius Lab', tab:'emotionadaptive',
    desc:'UI qui s\'adapte aux émotions détectées via la caméra. Couleurs et layout changent en temps réel.',
    desc_en:'UI that adapts to emotions detected via camera. Colors and layout change in real time.',
    how:'1. Activer caméra → 2. Détecter émotion → 3. Voir l\'UI s\'adapter',
    how_en:'1. Activate camera → 2. Detect emotion → 3. Watch UI adapt' },
  appdnasplicer:{ icon:'🧬', name:'App DNA Splicer', cat:'Genius Lab', tab:'appdnasplicer',
    desc:'Fusionnez deux applications différentes pour créer une app hybride géniale.',
    desc_en:'Merge two different applications to create a brilliant hybrid app.',
    how:'1. Charger 2 apps → 2. Splicer → 3. Nouvelle app créée',
    how_en:'1. Load 2 apps → 2. Splice → 3. New hybrid app created' },
  uxpredictor: { icon:'🔮', name:'Predictive UX Heatmap', cat:'Genius Lab', tab:'uxpredictor',
    desc:'Prédisez les zones de clic et d\'attention des utilisateurs avec une IA de heatmap.',
    desc_en:'Predict user click zones and attention areas with a heatmap AI.',
    how:'1. Charger l\'interface → 2. Prédire → 3. Voir la heatmap',
    how_en:'1. Load interface → 2. Predict → 3. See heatmap' },
  physicscss:  { icon:'🌊', name:'Physics → CSS', cat:'Genius Lab', tab:'physicscss',
    desc:'Appliquez des simulations physiques (gravité, ressorts, collision) à vos éléments CSS.',
    desc_en:'Apply physics simulations (gravity, springs, collision) to your CSS elements.',
    how:'1. Sélectionner éléments → 2. Configurer physique → 3. Animer',
    how_en:'1. Select elements → 2. Configure physics → 3. Animate' },
  codetutorialgame:{ icon:'🕹️', name:'Code Tutorial Game', cat:'Genius Lab', tab:'codetutorialgame',
    desc:'Apprenez le code en jouant ! Exercices interactifs sous forme de jeu vidéo.',
    desc_en:'Learn coding by playing! Interactive exercises in video game format.',
    how:'1. Choisir niveau → 2. Jouer → 3. Apprendre en s\'amusant',
    how_en:'1. Choose level → 2. Play → 3. Learn while having fun' },
  geoadaptive: { icon:'🌍', name:'Geo-Adaptive Studio', cat:'Genius Lab', tab:'geoadaptive',
    desc:'L\'UI s\'adapte automatiquement à la localisation de l\'utilisateur (langue, devise, heure).',
    desc_en:'The UI automatically adapts to user location (language, currency, time).',
    how:'1. Configurer les régions → 2. Tester → 3. Exporter',
    how_en:'1. Configure regions → 2. Test → 3. Export' },
  dreamui:     { icon:'🌙', name:'Dream UI Interpreter', cat:'Genius Lab', tab:'dreamui',
    desc:'Décrivez votre rêve d\'interface en mots chaotiques → l\'IA interprète et génère.',
    desc_en:'Describe your interface dream in chaotic words → AI interprets and generates.',
    how:'1. Décrire librement → 2. Interpréter → 3. Générer l\'interface',
    how_en:'1. Freely describe → 2. Interpret → 3. Generate interface' },
  spatialui:   { icon:'🥽', name:'Spatial UI Simulator', cat:'Genius Lab', tab:'spatialui',
    desc:'Simulez votre interface dans un espace 3D pour Vision Pro / Quest VR.',
    desc_en:'Simulate your interface in 3D space for Vision Pro / Quest VR.',
    how:'1. Charger l\'interface → 2. Placer en 3D → 3. Prévisualiser en VR',
    how_en:'1. Load interface → 2. Place in 3D → 3. Preview in VR' },

  // ── VISUAL EFFECTS ───────────────────────────────────────────────────
  liquidgooey: { icon:'💧', name:'Liquid Gooey', cat:'Visual FX', tab:'liquidgooey',
    desc:'Effets liquides et gooey sur vos éléments UI. Physique des fluides dans le navigateur.',
    desc_en:'Liquid and gooey effects on your UI elements. Fluid physics in the browser.',
    how:'1. Activer → 2. Choisir l\'effet → 3. Exporter',
    how_en:'1. Activate → 2. Choose effect → 3. Export' },
  cursorspot:  { icon:'🔦', name:'Cursor Spotlight', cat:'Visual FX', tab:'cursorspot',
    desc:'Ajoutez un effet spotlight qui suit le curseur. Parfait pour les présentations.',
    desc_en:'Add a spotlight effect that follows the cursor. Perfect for presentations.',
    how:'1. Configurer l\'effet → 2. Prévisualiser → 3. Injecter',
    how_en:'1. Configure effect → 2. Preview → 3. Inject' },
  webgldistort:{ icon:'🌊', name:'WebGL Ripple', cat:'Visual FX', tab:'webgldistort',
    desc:'Effet de distorsion WebGL en ondulation sur votre site. Spectaculaire et performant.',
    desc_en:'WebGL ripple distortion effect on your site. Spectacular and performant.',
    how:'1. Configurer l\'ondulation → 2. Appliquer → 3. Exporter',
    how_en:'1. Configure ripple → 2. Apply → 3. Export' },
  svgmorph:    { icon:'🔀', name:'SVG Morph', cat:'Visual FX', tab:'svgmorph',
    desc:'Morphez entre deux formes SVG avec des animations fluides et personnalisables.',
    desc_en:'Morph between two SVG shapes with smooth and customizable animations.',
    how:'1. Définir formes → 2. Configurer transition → 3. Exporter CSS',
    how_en:'1. Define shapes → 2. Configure transition → 3. Export CSS' },
  scrollreveal:{ icon:'📜', name:'Scroll Reveal', cat:'Visual FX', tab:'scrollreveal',
    desc:'Animations déclenchées au défilement. Les éléments apparaissent en scrollant.',
    desc_en:'Scroll-triggered animations. Elements appear as you scroll.',
    how:'1. Sélectionner éléments → 2. Choisir animation → 3. Exporter JS',
    how_en:'1. Select elements → 2. Choose animation → 3. Export JS' },
  kinetictypo: { icon:'🔠', name:'Kinetic Typography', cat:'Visual FX', tab:'kinetictypo',
    desc:'Créez de la typographie cinétique animée. Le texte danse et se transforme.',
    desc_en:'Create animated kinetic typography. Text dances and transforms.',
    how:'1. Entrer le texte → 2. Choisir animation → 3. Exporter',
    how_en:'1. Enter text → 2. Choose animation → 3. Export' },
  xrayvision:  { icon:'🦴', name:'X-Ray Vision', cat:'Visual FX', tab:'xrayvision',
    desc:'Visualisez les boîtes englobantes de votre UI en mode wireframe néon.',
    desc_en:'Visualize UI bounding boxes in neon wireframe mode.',
    how:'1. Cliquer Activer → 2. Voir le mode blueprint',
    how_en:'1. Click Activate → 2. See blueprint mode' },
  terminalos:  { icon:'💻', name:'Terminal OS', cat:'Visual FX', tab:'terminalos',
    desc:'Transformez votre site en terminal Linux années 90. Effet Matrix vert sur noir.',
    desc_en:'Transform your site into a 90s Linux terminal. Green-on-black Matrix effect.',
    how:'1. Cliquer Injecter → 2. Voir l\'effet Matrix',
    how_en:'1. Click Inject → 2. See the Matrix effect' },
  pixelforge:  { icon:'🕹️', name:'Pixel Forge', cat:'Visual FX', tab:'pixelforge',
    desc:'Pixelisez votre UI moderne en esthétique Nintendo 8-bit rétro.',
    desc_en:'Pixelate your modern UI into retro 8-bit Nintendo aesthetic.',
    how:'1. Cliquer Demaster → 2. Voir l\'effet pixel art',
    how_en:'1. Click Demaster → 2. See pixel art effect' },
  glassbreaker:{ icon:'🔨', name:'Smash UI', cat:'Visual FX', tab:'glassbreaker',
    desc:'Cliquez sur n\'importe quel élément pour le faire exploser en éclats de verre.',
    desc_en:'Click any element to shatter it into glass fragments.',
    how:'1. Charger le Smasher → 2. Cliquer des éléments → 3. Tout briser !',
    how_en:'1. Load Smasher → 2. Click elements → 3. Smash everything!' },
  vhsrewind:   { icon:'📼', name:'VHS Rewind', cat:'Visual FX', tab:'vhsrewind',
    desc:'Appliquez des effets de cassette VHS réalistes: tracking, distorsion, bruit statique.',
    desc_en:'Apply realistic VHS tape effects: tracking, distortion, static noise.',
    how:'1. Insérer VHS → 2. Voir la distorsion de tracking',
    how_en:'1. Insert VHS → 2. Watch tracking distortion' },
  zerog:       { icon:'🪐', name:'Zero-G UI', cat:'Visual FX', tab:'zerog',
    desc:'Vos éléments flottent en apesanteur dans un environnement spatial.',
    desc_en:'Your elements float in weightlessness in a space environment.',
    how:'1. Activer Zero-G → 2. Voir les éléments flotter',
    how_en:'1. Activate Zero-G → 2. Watch elements float' },
  vortexui:    { icon:'🕳️', name:'Vortex Hole', cat:'Visual FX', tab:'vortexui',
    desc:'Créez un effet de trou noir qui aspire vos éléments UI.',
    desc_en:'Create a black hole effect that sucks in your UI elements.',
    how:'1. Activer Vortex → 2. Voir les éléments aspirés',
    how_en:'1. Activate Vortex → 2. Watch elements get sucked in' },
  cyberglitch: { icon:'📺', name:'Cyber Glitch', cat:'Visual FX', tab:'cyberglitch',
    desc:'Effets de glitch cyberpunk sur votre interface. RGB split, scanlines, noise.',
    desc_en:'Cyberpunk glitch effects on your interface. RGB split, scanlines, noise.',
    how:'1. Configurer glitch → 2. Appliquer → 3. Exporter',
    how_en:'1. Configure glitch → 2. Apply → 3. Export' },
  chaosshake:  { icon:'🥴', name:'Chaos Shake', cat:'Visual FX', tab:'chaosshake',
    desc:'Animation de tremblement chaotique sur vos éléments. Pour les effets d\'urgence.',
    desc_en:'Chaotic shake animation on your elements. For emergency/alert effects.',
    how:'1. Sélectionner éléments → 2. Configurer tremblement → 3. Exporter CSS',
    how_en:'1. Select elements → 2. Configure shake → 3. Export CSS' },
  neonpulse:   { icon:'🪩', name:'Neon Pulse', cat:'Visual FX', tab:'neonpulse',
    desc:'Effets néon pulsants sur les éléments: glow, bloom, animations de lueur.',
    desc_en:'Pulsing neon effects on elements: glow, bloom, luminescence animations.',
    how:'1. Choisir couleur néon → 2. Configurer pulse → 3. Exporter',
    how_en:'1. Choose neon color → 2. Configure pulse → 3. Export' },
  holographic: { icon:'🃏', name:'Hologram 3D', cat:'Visual FX', tab:'holographic',
    desc:'Créez des hologrammes 3D interactifs avec effets de parallaxe et de profondeur.',
    desc_en:'Create interactive 3D holograms with parallax and depth effects.',
    how:'1. Uploader contenu → 2. Configurer hologramme → 3. Exporter',
    how_en:'1. Upload content → 2. Configure hologram → 3. Export' },
  gravity:     { icon:'🍎', name:'Gravity', cat:'Visual FX', tab:'gravity',
    desc:'Simulez la gravité sur vos éléments UI. Ils tombent, rebondissent, s\'effondrent.',
    desc_en:'Simulate gravity on your UI elements. They fall, bounce, collapse.',
    how:'1. Activer gravité → 2. Voir les éléments tomber',
    how_en:'1. Activate gravity → 2. Watch elements fall' },
  thanos:      { icon:'🎭', name:'Dematerialize', cat:'Visual FX', tab:'thanos',
    desc:'Effet de désintégration Thanos — votre interface se désintègre en pixels.',
    desc_en:'Thanos disintegration effect — your interface disintegrates into pixels.',
    how:'1. Activer → 2. Voir la désintégration',
    how_en:'1. Activate → 2. Watch disintegration' },
  glassmorphism2:{ icon:'🧊', name:'Glass UI', cat:'Visual FX', tab:'glassmorphism',
    desc:'Créez des interfaces glassmorphism modernes avec flou d\'arrière-plan et transparence.',
    desc_en:'Create modern glassmorphism interfaces with backdrop blur and transparency.',
    how:'1. Ajuster flou → 2. Prévisualiser → 3. Copier CSS',
    how_en:'1. Adjust blur → 2. Preview → 3. Copy CSS' },
  cyberneon:   { icon:'🌌', name:'Cyber Neon', cat:'Visual FX', tab:'cyberneon',
    desc:'Transformez votre UI en esthétique cyberpunk néon avec couleurs fluo et effets 80s.',
    desc_en:'Transform your UI into neon cyberpunk aesthetic with fluorescent colors and 80s effects.',
    how:'1. Activer le mode Cyber Neon → 2. Personnaliser couleurs → 3. Exporter',
    how_en:'1. Activate Cyber Neon mode → 2. Customize colors → 3. Export' },
  microfx:     { icon:'🎪', name:'Micro FX', cat:'Visual FX', tab:'microfx',
    desc:'Collection de micro-animations subtiles pour les boutons, liens et éléments interactifs.',
    desc_en:'Collection of subtle micro-animations for buttons, links and interactive elements.',
    how:'1. Sélectionner FX → 2. Appliquer → 3. Exporter CSS',
    how_en:'1. Select FX → 2. Apply → 3. Export CSS' },
  scrollfx:    { icon:'🌊', name:'Scroll FX', cat:'Visual FX', tab:'scrollfx',
    desc:'Effets déclenchés au défilement: parallaxe, zoom, rotation, fondu.',
    desc_en:'Scroll-triggered effects: parallax, zoom, rotation, fade.',
    how:'1. Choisir l\'effet → 2. Configurer → 3. Exporter JS',
    how_en:'1. Choose effect → 2. Configure → 3. Export JS' },
  motionfx:    { icon:'🪄', name:'Motion FX', cat:'Visual FX', tab:'motionfx',
    desc:'Studio d\'animation motion design pour créer des transitions et animations complexes.',
    desc_en:'Motion design animation studio for creating complex transitions and animations.',
    how:'1. Définir animation → 2. Prévisualiser → 3. Exporter',
    how_en:'1. Define animation → 2. Preview → 3. Export' },
  timeline:    { icon:'🎞️', name:'Timeline FX', cat:'Visual FX', tab:'timeline',
    desc:'Éditeur de timeline pour synchroniser plusieurs animations et créer des séquences.',
    desc_en:'Timeline editor to synchronize multiple animations and create sequences.',
    how:'1. Ajouter pistes → 2. Synchroniser → 3. Exporter CSS/JS',
    how_en:'1. Add tracks → 2. Synchronize → 3. Export CSS/JS' },
  microphysics:{ icon:'🧲', name:'Micro-Physics', cat:'Visual FX', tab:'microphysics',
    desc:'Physique microscopique sur les particules UI: magnétisme, répulsion, attraction.',
    desc_en:'Microscopic physics on UI particles: magnetism, repulsion, attraction.',
    how:'1. Configurer physique → 2. Activer → 3. Voir l\'interaction',
    how_en:'1. Configure physics → 2. Activate → 3. See interaction' },
  skeleton:    { icon:'🦴', name:'Skeleton UI', cat:'Visual FX', tab:'skeleton',
    desc:'Créez des états de chargement skeleton loader pour vos applications.',
    desc_en:'Create skeleton loader loading states for your applications.',
    how:'1. Définir le layout → 2. Générer skeleton → 3. Exporter',
    how_en:'1. Define layout → 2. Generate skeleton → 3. Export' },
  audioui:     { icon:'🎵', name:'Audio UI', cat:'Visual FX', tab:'audioui',
    desc:'Ajoutez des sons interactifs à votre interface: sons de clic, hover, feedback.',
    desc_en:'Add interactive sounds to your interface: click sounds, hover, feedback.',
    how:'1. Choisir sons → 2. Assigner aux éléments → 3. Exporter',
    how_en:'1. Choose sounds → 2. Assign to elements → 3. Export' },
  loaderscreen:{ icon:'⌛', name:'Loading Screen', cat:'Visual FX', tab:'loaderscreen',
    desc:'Créez des écrans de chargement spectaculaires pour vos applications.',
    desc_en:'Create spectacular loading screens for your applications.',
    how:'1. Choisir animation → 2. Personnaliser → 3. Injecter',
    how_en:'1. Choose animation → 2. Customize → 3. Inject' },
  animforge:   { icon:'🎬', name:'Animation Forge', cat:'Visual FX', tab:'animforge',
    desc:'Forgez des animations CSS complexes avec des éditeurs visuels de keyframes.',
    desc_en:'Forge complex CSS animations with visual keyframe editors.',
    how:'1. Ajouter keyframes → 2. Définir propriétés → 3. Exporter CSS',
    how_en:'1. Add keyframes → 2. Define properties → 3. Export CSS' },

  // ── MEDIA & AUDIO ─────────────────────────────────────────────────────
  media:       { icon:'🖼️', name:'Media Studio', cat:'Media & Audio', tab:'media',
    desc:'Gestion et optimisation des médias: images, vidéos, audio dans votre application.',
    desc_en:'Media management and optimization: images, videos, audio in your application.',
    how:'1. Importer médias → 2. Optimiser → 3. Intégrer',
    how_en:'1. Import media → 2. Optimize → 3. Integrate' },
  cinematic:   { icon:'🎬', name:'Cinematic Studio', cat:'Media & Audio', tab:'cinematic',
    desc:'Créez des transitions cinématiques entre les sections de votre site.',
    desc_en:'Create cinematic transitions between your site sections.',
    how:'1. Définir scènes → 2. Configurer transitions → 3. Exporter',
    how_en:'1. Define scenes → 2. Configure transitions → 3. Export' },
  timelapse:   { icon:'🎬', name:'Timelapse Recorder', cat:'Media & Audio', tab:'timelapse',
    desc:'Enregistrez votre session de code en timelapse pour les réseaux sociaux.',
    desc_en:'Record your coding session as a timelapse for social media.',
    how:'1. Démarrer enregistrement → 2. Coder → 3. Exporter MP4',
    how_en:'1. Start recording → 2. Code → 3. Export MP4' },
  sonicsynth:  { icon:'🎵', name:'Sonic Synthesizer', cat:'Media & Audio', tab:'sonicsynth',
    desc:'Synthétiseur sonique avancé pour créer des paysages audio immersifs.',
    desc_en:'Advanced sonic synthesizer for creating immersive audio landscapes.',
    how:'1. Configurer synthé → 2. Créer ambiance → 3. Exporter',
    how_en:'1. Configure synth → 2. Create ambience → 3. Export' },
  voicereader: { icon:'🗣️', name:'Voice Reader', cat:'Media & Audio', tab:'voicereader',
    desc:'Lecteur de voix off pour votre application. Text-to-Speech multi-langues.',
    desc_en:'Voice-over reader for your application. Multi-language Text-to-Speech.',
    how:'1. Entrer texte → 2. Choisir voix → 3. Générer audio',
    how_en:'1. Enter text → 2. Choose voice → 3. Generate audio' },
  sonic:       { icon:'🎵', name:'Sonic Forge', cat:'Media & Audio', tab:'sonic',
    desc:'Créez des effets sonores pour jeux et applications web interactives.',
    desc_en:'Create sound effects for games and interactive web applications.',
    how:'1. Designer le son → 2. Prévisualiser → 3. Exporter',
    how_en:'1. Design sound → 2. Preview → 3. Export' },
  soundfx:     { icon:'🎵', name:'Sound FX', cat:'Media & Audio', tab:'soundfx',
    desc:'Bibliothèque d\'effets sonores pour enrichir votre interface utilisateur.',
    desc_en:'Sound effects library to enrich your user interface.',
    how:'1. Parcourir FX → 2. Prévisualiser → 3. Injecter',
    how_en:'1. Browse FX → 2. Preview → 3. Inject' },
  record:      { icon:'📹', name:'Screen Recorder', cat:'Media & Audio', tab:'record',
    desc:'Enregistrez votre écran et votre code en vidéo pour des tutoriels et démos.',
    desc_en:'Record your screen and code as video for tutorials and demos.',
    how:'1. Configurer → 2. Enregistrer → 3. Télécharger',
    how_en:'1. Configure → 2. Record → 3. Download' },
  transcode:   { icon:'🔠', name:'Media Transcoder', cat:'Media & Audio', tab:'transcode',
    desc:'Convertissez des médias entre formats: images, vidéos, audio.',
    desc_en:'Convert media between formats: images, videos, audio.',
    how:'1. Uploader fichier → 2. Choisir format → 3. Convertir',
    how_en:'1. Upload file → 2. Choose format → 3. Convert' },
  assets:      { icon:'📦', name:'Asset Manager', cat:'Media & Audio', tab:'assets',
    desc:'Gérez tous les assets de votre projet: images, icônes, polices, vidéos.',
    desc_en:'Manage all your project assets: images, icons, fonts, videos.',
    how:'1. Importer assets → 2. Organiser → 3. Utiliser dans le code',
    how_en:'1. Import assets → 2. Organize → 3. Use in code' },
  assetvault:  { icon:'🗜️', name:'Asset Vault', cat:'Media & Audio', tab:'assetvault',
    desc:'Coffre-fort d\'assets pour stocker et organiser vos ressources numériques.',
    desc_en:'Asset vault to store and organize your digital resources.',
    how:'1. Stocker assets → 2. Organiser → 3. Réutiliser',
    how_en:'1. Store assets → 2. Organize → 3. Reuse' },
  anim:        { icon:'🎞️', name:'Animation Studio', cat:'Media & Audio', tab:'anim',
    desc:'Studio d\'animation complet pour créer des animations CSS et JavaScript.',
    desc_en:'Complete animation studio for creating CSS and JavaScript animations.',
    how:'1. Choisir animation → 2. Configurer → 3. Exporter',
    how_en:'1. Choose animation → 2. Configure → 3. Export' },

  // ── TEST & AUDIT ──────────────────────────────────────────────────────
  audit:       { icon:'🛡️', name:'Code Audit', cat:'Test & Audit', tab:'audit',
    desc:'Sécurité, SEO, accessibilité, performance — scan complet du code.',
    desc_en:'Security, SEO, accessibility, performance — full code scan.',
    how:'1. Écrire code → 2. Lancer Audit → 3. Auto-corriger les problèmes',
    how_en:'1. Write code → 2. Run Audit → 3. Auto-Fix issues' },
  launchcheck: { icon:'📋', name:'Launch Checklist', cat:'Test & Audit', tab:'launchcheck',
    desc:'Liste de contrôle complète avant le lancement de votre site ou app.',
    desc_en:'Complete checklist before launching your site or app.',
    how:'1. Cocher les éléments → 2. Corriger les problèmes → 3. Lancer !',
    how_en:'1. Check items → 2. Fix issues → 3. Launch!' },
  codestats:   { icon:'📊', name:'Code Statistics', cat:'Test & Audit', tab:'codestats',
    desc:'Comptez les lignes, fonctions, métriques de complexité de votre codebase.',
    desc_en:'Count lines, functions, complexity metrics for your codebase.',
    how:'1. Coller code → 2. Voir statistiques → 3. Copier rapport',
    how_en:'1. Paste code → 2. See stats → 3. Copy report' },
  deadcss:     { icon:'🪦', name:'Dead CSS Finder', cat:'Test & Audit', tab:'deadcss',
    desc:'Trouvez les sélecteurs CSS inutilisés dans votre feuille de style.',
    desc_en:'Find unused CSS selectors in your stylesheet.',
    how:'1. Coller CSS + HTML → 2. Scanner → 3. Supprimer règles mortes',
    how_en:'1. Paste CSS + HTML → 2. Scan → 3. Remove dead rules' },
  heatmap:     { icon:'🔥', name:'Heatmap Simulator', cat:'Test & Audit', tab:'heatmap',
    desc:'Simulez des heatmaps de clics pour prévoir le comportement utilisateur.',
    desc_en:'Simulate click heatmaps to predict user behavior.',
    how:'1. Charger interface → 2. Simuler → 3. Analyser',
    how_en:'1. Load interface → 2. Simulate → 3. Analyze' },
  eco:         { icon:'🌱', name:'Eco Tracker', cat:'Test & Audit', tab:'eco',
    desc:'Mesurez l\'empreinte carbone de votre site web et obtenez des conseils d\'optimisation.',
    desc_en:'Measure your website\'s carbon footprint and get optimization tips.',
    how:'1. Entrer URL → 2. Analyser → 3. Réduire l\'impact',
    how_en:'1. Enter URL → 2. Analyze → 3. Reduce impact' },
  bundleradar: { icon:'🪶', name:'Bundle Radar', cat:'Test & Audit', tab:'bundleradar',
    desc:'Analysez vos dépendances de code pour estimer la taille totale et la vitesse de chargement.',
    desc_en:'Analyze your code dependencies to estimate total size and loading speed.',
    how:'1. Lancer scan → 2. Voir poids KB et temps 3G',
    how_en:'1. Run scan → 2. See KB weight and 3G load time' },
  codeaudit:   { icon:'💊', name:'Code Health', cat:'Test & Audit', tab:'codeaudit',
    desc:'Scannez la complexité, les doublons, les fonctions longues, les problèmes de nommage.',
    desc_en:'Scan for complexity, duplicates, long functions, naming issues.',
    how:'1. Coller code → 2. Analyser → 3. Voir score de santé',
    how_en:'1. Paste code → 2. Analyze → 3. See health score' },
  security:    { icon:'🔐', name:'Security Analyzer', cat:'Test & Audit', tab:'security',
    desc:'Analysez la sécurité de votre code: vulnérabilités connues, mauvaises pratiques.',
    desc_en:'Analyze your code security: known vulnerabilities, bad practices.',
    how:'1. Analyser → 2. Voir vulnérabilités → 3. Corriger',
    how_en:'1. Analyze → 2. See vulnerabilities → 3. Fix' },
  neuroux:     { icon:'🧠', name:'Neuro-UX Debugger', cat:'Test & Audit', tab:'neuroux',
    desc:'Analysez l\'interface selon les principes neuropsychologiques de l\'UX.',
    desc_en:'Analyze the interface according to neuropsychological UX principles.',
    how:'1. Charger interface → 2. Analyser → 3. Recommandations neuro-UX',
    how_en:'1. Load interface → 2. Analyze → 3. Neuro-UX recommendations' },
  a11y:        { icon:'🧪', name:'Accessibility (A11y)', cat:'Test & Audit', tab:'a11y',
    desc:'Testez l\'accessibilité WCAG de votre interface. Couleurs, contrast, ARIA.',
    desc_en:'Test WCAG accessibility of your interface. Colors, contrast, ARIA.',
    how:'1. Charger interface → 2. Tester → 3. Voir rapport A11y',
    how_en:'1. Load interface → 2. Test → 3. See A11y report' },
  abtest:      { icon:'🔬', name:'A/B Test Generator', cat:'Test & Audit', tab:'abtest',
    desc:'Créez des variantes A/B pour tester différentes versions de votre interface.',
    desc_en:'Create A/B variants to test different versions of your interface.',
    how:'1. Créer variantes → 2. Configurer test → 3. Analyser résultats',
    how_en:'1. Create variants → 2. Configure test → 3. Analyze results' },
  speedbudget: { icon:'⚡', name:'Speed Budget', cat:'Test & Audit', tab:'speedbudget',
    desc:'Définissez un budget de performance et vérifiez que votre site le respecte.',
    desc_en:'Define a performance budget and verify your site stays within it.',
    how:'1. Définir budget → 2. Analyser → 3. Optimiser',
    how_en:'1. Define budget → 2. Analyze → 3. Optimize' },
  password:    { icon:'🔒', name:'Password Analyzer', cat:'Test & Audit', tab:'password',
    desc:'Testez la force des mots de passe, estimez le temps de crack, générez des mots de passe sécurisés.',
    desc_en:'Test password strength, estimate crack time, generate secure passwords.',
    how:'1. Taper mot de passe → 2. Voir force → 3. Générer sécurisé',
    how_en:'1. Type password → 2. See strength → 3. Generate secure one' },
  cssspec:     { icon:'🔢', name:'CSS Specificity', cat:'Test & Audit', tab:'cssspec',
    desc:'Calculez et visualisez la spécificité CSS de vos sélecteurs pour résoudre les conflits.',
    desc_en:'Calculate and visualize CSS specificity of your selectors to resolve conflicts.',
    how:'1. Entrer sélecteur → 2. Calculer → 3. Comparer',
    how_en:'1. Enter selector → 2. Calculate → 3. Compare' },

  // ── SPECIALIST STUDIOS ────────────────────────────────────────────────
  cyberstudio: { icon:'🛡️', name:'Cyber Hacking Studio', cat:'Cybersecurity', tab:'cyberstudio',
    desc:'Studio de cybersécurité et hacking éthique. Testez les vulnérabilités de vos apps.',
    desc_en:'Cybersecurity and ethical hacking studio. Test vulnerabilities of your apps.',
    how:'1. Sélectionner test → 2. Exécuter → 3. Analyser résultats',
    how_en:'1. Select test → 2. Execute → 3. Analyze results' },
  saasforge:   { icon:'📱', name:'App & SaaS Forge', cat:'App Forge', tab:'saasforge',
    desc:'Forgez des applications SaaS complètes avec authentification, pricing, dashboard.',
    desc_en:'Forge complete SaaS applications with authentication, pricing, dashboard.',
    how:'1. Configurer SaaS → 2. Générer → 3. Déployer',
    how_en:'1. Configure SaaS → 2. Generate → 3. Deploy' },
  aillmstudio: { icon:'🤖', name:'AI & LLM Interface Builder', cat:'AI Studio', tab:'aillmstudio',
    desc:'Construisez des interfaces pour LLMs (GPT, Claude, Gemini). Prompt engineering avancé.',
    desc_en:'Build interfaces for LLMs (GPT, Claude, Gemini). Advanced prompt engineering.',
    how:'1. Configurer LLM → 2. Designer interface → 3. Déployer',
    how_en:'1. Configure LLM → 2. Design interface → 3. Deploy' },
  web3dapp:    { icon:'🌍', name:'Web3 & Blockchain Studio', cat:'Web3', tab:'web3dapp',
    desc:'Créez des dApps blockchain avec smart contracts, NFTs et wallets intégrés.',
    desc_en:'Create blockchain dApps with smart contracts, NFTs and integrated wallets.',
    how:'1. Connecter wallet → 2. Déployer contrat → 3. Créer dApp',
    how_en:'1. Connect wallet → 2. Deploy contract → 3. Create dApp' },
  devopsstudio:{ icon:'🐳', name:'DevOps Studio', cat:'DevOps', tab:'devopsstudio',
    desc:'Docker, CI/CD, Kubernetes — gérez votre infrastructure depuis le studio.',
    desc_en:'Docker, CI/CD, Kubernetes — manage your infrastructure from the studio.',
    how:'1. Configurer pipeline → 2. Déployer → 3. Monitorer',
    how_en:'1. Configure pipeline → 2. Deploy → 3. Monitor' },
  webarchitect:{ icon:'✨', name:'Web Architect', cat:'Architecture', tab:'webarchitect',
    desc:'Architecte web avancé pour concevoir des architectures d\'applications complexes.',
    desc_en:'Advanced web architect for designing complex application architectures.',
    how:'1. Définir architecture → 2. Générer → 3. Implémenter',
    how_en:'1. Define architecture → 2. Generate → 3. Implement' },
  apidesign:   { icon:'📡', name:'API Design Studio', cat:'API', tab:'apidesign',
    desc:'Concevez et documentez vos APIs REST/GraphQL avec un générateur OpenAPI.',
    desc_en:'Design and document your REST/GraphQL APIs with an OpenAPI generator.',
    how:'1. Définir endpoints → 2. Documenter → 3. Exporter OpenAPI',
    how_en:'1. Define endpoints → 2. Document → 3. Export OpenAPI' },
  algoviz:     { icon:'🎯', name:'Algorithm Visualizer', cat:'Education', tab:'algoviz',
    desc:'Visualisez le fonctionnement des algorithmes de tri, recherche, graphes étape par étape.',
    desc_en:'Visualize how sorting, search, graph algorithms work step by step.',
    how:'1. Choisir algorithme → 2. Ajouter données → 3. Visualiser',
    how_en:'1. Choose algorithm → 2. Add data → 3. Visualize' },
  extforge:    { icon:'🌎', name:'Extension Forge', cat:'Browser', tab:'extforge',
    desc:'Créez des extensions Chrome/Firefox visuellement sans configuration complexe.',
    desc_en:'Create Chrome/Firefox extensions visually without complex configuration.',
    how:'1. Configurer extension → 2. Générer manifest → 3. Exporter',
    how_en:'1. Configure extension → 2. Generate manifest → 3. Export' },
  creativecode:{ icon:'🎨', name:'Creative Code Studio', cat:'Creative', tab:'creativecode',
    desc:'Studio de code créatif pour créer de l\'art génératif, des expériences interactives.',
    desc_en:'Creative code studio for creating generative art, interactive experiences.',
    how:'1. Choisir style → 2. Coder → 3. Partager',
    how_en:'1. Choose style → 2. Code → 3. Share' },
  datasciencestudio:{ icon:'📊', name:'Data Science Studio', cat:'Data', tab:'datasciencestudio',
    desc:'Analysez et visualisez des données avec des graphiques interactifs et du machine learning.',
    desc_en:'Analyze and visualize data with interactive charts and machine learning.',
    how:'1. Importer données → 2. Analyser → 3. Visualiser',
    how_en:'1. Import data → 2. Analyze → 3. Visualize' },
  mobileuikit: { icon:'📱', name:'Mobile UI Kit', cat:'Mobile', tab:'mobileuikit',
    desc:'Kit de composants UI mobile-first: boutons, cartes, navbars, modaux iOS/Android.',
    desc_en:'Mobile-first UI component kit: buttons, cards, navbars, modals iOS/Android.',
    how:'1. Sélectionner composant → 2. Personnaliser → 3. Exporter',
    how_en:'1. Select component → 2. Customize → 3. Export' },

  // ── MARKETING & BIZ ────────────────────────────────────────────────────
  seo:         { icon:'🔍', name:'SEO Meta Studio', cat:'Marketing & Biz', tab:'seo',
    desc:'Générez tous les meta tags: OG, Twitter Card, SEO. Prévisualisez le rendu.',
    desc_en:'Generate all meta tags: OG, Twitter Card, SEO. Preview rendering.',
    how:'1. Remplir titre/desc → 2. Prévisualiser cartes → 3. Copier tags',
    how_en:'1. Fill title/desc → 2. Preview social cards → 3. Copy tags' },
  hosting:     { icon:'🌐', name:'Hosting Manager', cat:'Marketing & Biz', tab:'hosting',
    desc:'Déployez votre application sur Netlify, Vercel, GitHub Pages directement.',
    desc_en:'Deploy your application to Netlify, Vercel, GitHub Pages directly.',
    how:'1. Choisir hébergeur → 2. Configurer → 3. Déployer',
    how_en:'1. Choose host → 2. Configure → 3. Deploy' },
  social:      { icon:'📱', name:'Social Preview', cat:'Marketing & Biz', tab:'social',
    desc:'Prévisualisez votre site sur Twitter, Facebook, LinkedIn avant de publier.',
    desc_en:'Preview your site on Twitter, Facebook, LinkedIn before publishing.',
    how:'1. Extraire du code → 2. Modifier tags OG → 3. Injecter',
    how_en:'1. Extract from code → 2. Edit OG tags → 3. Inject' },
  promo:       { icon:'🚀', name:'AI Promo Launch', cat:'Marketing & Biz', tab:'promo',
    desc:'Analysez le code et écrivez des posts marketing pour Twitter, Facebook, TikTok, Email.',
    desc_en:'Analyze code and write marketing posts for Twitter, Facebook, TikTok, Email.',
    how:'1. Avoir du code → 2. Générer campagne → 3. Copier les posts',
    how_en:'1. Have code → 2. Generate campaign → 3. Copy posts' },
  invoice:     { icon:'📋', name:'Invoice Generator', cat:'Marketing & Biz', tab:'invoice',
    desc:'Créez des factures professionnelles pour votre travail freelance.',
    desc_en:'Create professional invoices for your freelance work.',
    how:'1. Remplir détails client → 2. Ajouter lignes → 3. Exporter PDF/HTML',
    how_en:'1. Fill client details → 2. Add items → 3. Export PDF/HTML' },
  ratecalc:    { icon:'💼', name:'Freelance Rate Calculator', cat:'Marketing & Biz', tab:'ratecalc',
    desc:'Calculez votre taux horaire/journalier idéal selon vos dépenses et objectifs.',
    desc_en:'Calculate your ideal hourly/daily rate based on expenses and goals.',
    how:'1. Entrer dépenses mensuelles → 2. Définir profit → 3. Obtenir taux',
    how_en:'1. Enter monthly expenses → 2. Set target profit → 3. Get rate' },
  paywall:     { icon:'💰', name:'Paywall & Monetize', cat:'Marketing & Biz', tab:'paywall',
    desc:'Créez des paywalls et systèmes de monétisation pour votre contenu.',
    desc_en:'Create paywalls and monetization systems for your content.',
    how:'1. Configurer paywall → 2. Définir plans → 3. Intégrer',
    how_en:'1. Configure paywall → 2. Define plans → 3. Integrate' },
  lpscore:     { icon:'🎯', name:'Landing Page Score', cat:'Marketing & Biz', tab:'lpscore',
    desc:'Collez du HTML → obtenez un score de conversion: CTA, SEO, Confiance, Mobile (A+ à F).',
    desc_en:'Paste HTML → get conversion score: CTA, SEO, Trust, Mobile (A+ to F).',
    how:'1. Coller HTML page → 2. Analyser → 3. Voir score + conseils',
    how_en:'1. Paste page HTML → 2. Analyze → 3. See score + tips' },

  // ── DATA & NETWORK ────────────────────────────────────────────────────
  mockdata:    { icon:'🎲', name:'Mock Data Injector', cat:'Data & Network', tab:'mockdata',
    desc:'Générez des données fausses réalistes: utilisateurs, produits, commandes en JSON/CSV.',
    desc_en:'Generate realistic fake data: users, products, orders in JSON/CSV.',
    how:'1. Choisir type → 2. Définir nombre → 3. Exporter JSON/CSV',
    how_en:'1. Choose type → 2. Set count → 3. Export JSON/CSV' },
  dbarch:      { icon:'🗃️', name:'DB Architect', cat:'Data & Network', tab:'dbarch',
    desc:'Concevez des schémas de base de données visuellement → générez une API backend mock.',
    desc_en:'Design database schemas visually → generate a mock backend API.',
    how:'1. Créer tables → 2. Ajouter champs → 3. Générer backend code',
    how_en:'1. Create tables → 2. Add fields → 3. Generate backend code' },
  dataforge:   { icon:'📦', name:'Data Forge', cat:'Data & Network', tab:'dataforge',
    desc:'Convertissez JSON en interfaces TypeScript et schémas Zod de validation.',
    desc_en:'Convert JSON into TypeScript interfaces and Zod validation schemas.',
    how:'1. Coller JSON → 2. Générer → 3. TS + Zod injectés !',
    how_en:'1. Paste JSON → 2. Generate → 3. TS + Zod injected!' },
  webhooklab:  { icon:'🪝', name:'Webhook Lab', cat:'Data & Network', tab:'webhooklab',
    desc:'Simulez des webhooks entrants (ex: paiements Stripe) pour tester vos endpoints.',
    desc_en:'Simulate incoming webhooks (e.g., Stripe payments) to test your endpoints.',
    how:'1. Choisir type webhook → 2. Simuler → 3. Voir les logs',
    how_en:'1. Choose webhook type → 2. Simulate → 3. View logs' },
  headers:     { icon:'🌐', name:'HTTP Headers Inspector', cat:'Data & Network', tab:'headers',
    desc:'Analysez les en-têtes de sécurité de n\'importe quelle URL. Score A+ à D.',
    desc_en:'Analyze security headers of any URL. Score A+ to D.',
    how:'1. Entrer URL → 2. Inspecter → 3. Voir score sécurité',
    how_en:'1. Enter URL → 2. Inspect → 3. See security score' },
  jwt:         { icon:'🔑', name:'JWT Tool', cat:'Data & Network', tab:'jwt',
    desc:'Décodez, encodez, validez des tokens JWT. Voir header/payload/signature.',
    desc_en:'Decode, encode, validate JWT tokens. See header/payload/signature.',
    how:'1. Coller token → 2. Décoder → 3. Modifier et ré-encoder',
    how_en:'1. Paste token → 2. Decode → 3. Edit and re-encode' },
  apihub:      { icon:'🔌', name:'Live API Hub', cat:'Data & Network', tab:'apihub',
    desc:'Testez des APIs REST: GET/POST/PUT/DELETE avec headers et body.',
    desc_en:'Test REST APIs: GET/POST/PUT/DELETE with headers and body.',
    how:'1. Entrer URL → 2. Choisir méthode → 3. Envoyer et voir réponse',
    how_en:'1. Enter URL → 2. Choose method → 3. Send and see response' },
  sitemap:     { icon:'🗺️', name:'Sitemap Generator', cat:'Data & Network', tab:'sitemap',
    desc:'Générez un sitemap.xml depuis la structure de vos pages pour le SEO.',
    desc_en:'Generate sitemap.xml from your page structure for SEO.',
    how:'1. Entrer pages → 2. Définir priorité → 3. Télécharger sitemap.xml',
    how_en:'1. Enter pages → 2. Set priority → 3. Download sitemap.xml' },
  jsonvis:     { icon:'📊', name:'JSON Visualizer', cat:'Data & Network', tab:'jsonviz',
    desc:'Collez du JSON → arbre interactif et repliable avec recherche et édition.',
    desc_en:'Paste JSON → interactive collapsible tree with search and edit.',
    how:'1. Coller JSON → 2. Parcourir arbre → 3. Chercher/modifier/exporter',
    how_en:'1. Paste JSON → 2. Browse tree → 3. Search/edit/export' },
  sqlbuilder:  { icon:'🗃️', name:'SQL Query Builder', cat:'Data & Network', tab:'sqlbuilder',
    desc:'Construisez des requêtes SELECT/JOIN/WHERE visuellement → exportez SQL + données mock.',
    desc_en:'Build SELECT/JOIN/WHERE queries visually → export SQL + mock data.',
    how:'1. Définir table → 2. Ajouter colonnes/WHERE/JOIN → 3. Générer SQL',
    how_en:'1. Set table → 2. Add columns/WHERE/JOIN → 3. Generate SQL' },
  oauthflow:   { icon:'🔐', name:'OAuth Flow', cat:'Data & Network', tab:'oauthflow',
    desc:'Visualisez et testez les flux OAuth 2.0 et OpenID Connect.',
    desc_en:'Visualize and test OAuth 2.0 and OpenID Connect flows.',
    how:'1. Configurer provider → 2. Tester flux → 3. Implémenter',
    how_en:'1. Configure provider → 2. Test flow → 3. Implement' },

  // ── 3D & AR ───────────────────────────────────────────────────────────
  webxr:       { icon:'🕶️', name:'WebXR / AR Studio', cat:'3D & AR', tab:'webxr',
    desc:'Chargez des modèles 3D, visualisez en AR sur mobile. Générez un QR pour la prévisualisation.',
    desc_en:'Load 3D models, view in AR on mobile. Generate QR for AR preview.',
    how:'1. Charger modèle .glb → 2. Générer QR AR → 3. Scanner avec téléphone',
    how_en:'1. Load .glb model → 2. Generate AR QR → 3. Scan with phone' },
  '3d':        { icon:'🎲', name:'3D WebGL Studio', cat:'3D & AR', tab:'3d',
    desc:'Créez et animez des scènes 3D WebGL directement dans le navigateur.',
    desc_en:'Create and animate 3D WebGL scenes directly in the browser.',
    how:'1. Créer scène → 2. Ajouter objets → 3. Animer et exporter',
    how_en:'1. Create scene → 2. Add objects → 3. Animate and export' },

  // ── COLLAB ────────────────────────────────────────────────────────────
  collab:      { icon:'👥', name:'Code Collaboration', cat:'Collaboration', tab:'collab',
    desc:'Partagez votre session d\'éditeur avec un lien. Collaboration en temps réel.',
    desc_en:'Share your editor session with a link. Real-time collaborative coding.',
    how:'1. Cliquer Partager → 2. Envoyer lien → 3. Coder ensemble en direct',
    how_en:'1. Click Share → 2. Send link → 3. Code together live' },

  // ── SHOWROOM ──────────────────────────────────────────────────────────
  showroom:    { icon:'🌌', name:'Community Showroom', cat:'Showcase', tab:'showroom',
    desc:'Galerie communautaire de projets créés avec IA Architecte. Inspirez-vous et partagez.',
    desc_en:'Community gallery of projects created with IA Architecte. Get inspired and share.',
    how:'1. Parcourir projets → 2. S\'inspirer → 3. Partager votre création',
    how_en:'1. Browse projects → 2. Get inspired → 3. Share your creation' },

  // ── EXPORT & DEPLOY ───────────────────────────────────────────────────
  export:      { icon:'📦', name:'Export & Deploy', cat:'Export', tab:'exporthub',
    desc:'Exportez en HTML autonome ou déployez sur Netlify/Vercel/GitHub Pages.',
    desc_en:'Export as standalone HTML or deploy to Netlify/Vercel/GitHub Pages.',
    how:'Cliquer Export All → télécharger HTML. Ou Deploy pour une URL en direct.',
    how_en:'Click Export All → download HTML. Or Deploy for a live URL.' },
  pwa:         { icon:'📱', name:'PWA Generator', cat:'Export', tab:'pwagen',
    desc:'Générez manifest.json + service worker pour rendre votre app installable (PWA).',
    desc_en:'Generate manifest.json + service worker to make your app installable (PWA).',
    how:'1. Remplir infos app → 2. Générer → 3. Télécharger fichiers PWA',
    how_en:'1. Fill app info → 2. Generate → 3. Download PWA files' },
  autodocs:    { icon:'📚', name:'Auto-Documentation', cat:'Export', tab:'autodocs',
    desc:'Analysez le code → générez un README.md professionnel automatiquement.',
    desc_en:'Analyze code → generate professional README.md automatically.',
    how:'1. Écrire code → 2. Générer README → 3. Télécharger',
    how_en:'1. Write code → 2. Generate README → 3. Download' },
  exporthub:   { icon:'📤', name:'Export Hub', cat:'Export', tab:'exporthub',
    desc:'Hub d\'export centralisé: HTML, CSS, JS, images, complète l\'app en un clic.',
    desc_en:'Centralized export hub: HTML, CSS, JS, images, complete app in one click.',
    how:'1. Choisir format → 2. Configurer → 3. Exporter tout',
    how_en:'1. Choose format → 2. Configure → 3. Export everything' },

  // ── GAME DEV ──────────────────────────────────────────────────────────
  gamedevstudio:{ icon:'🎮', name:'Game Dev Studio', cat:'Game Dev', tab:'gamedevstudio',
    desc:'Studio de développement de jeux 2D/3D dans le navigateur avec moteur physique.',
    desc_en:'2D/3D game development studio in the browser with physics engine.',
    how:'1. Créer scène → 2. Ajouter sprites → 3. Programmer et tester',
    how_en:'1. Create scene → 2. Add sprites → 3. Program and test' },
  gamedevstudiopro:{ icon:'💎', name:'Game Dev Pro', cat:'Game Dev', tab:'gamedevstudiopro',
    desc:'Version Pro du Game Dev Studio avec outils avancés: IA ennemis, physique avancée.',
    desc_en:'Pro version of Game Dev Studio with advanced tools: enemy AI, advanced physics.',
    how:'1. Configurer IA → 2. Créer niveaux → 3. Exporter jeu',
    how_en:'1. Configure AI → 2. Create levels → 3. Export game' },
  gamedevstudioultimate:{ icon:'🚀', name:'Game Dev Ultimate', cat:'Game Dev', tab:'gamedevstudioultimate',
    desc:'Version Ultimate: moteur 3D WebGL, shaders, effets particules avancés.',
    desc_en:'Ultimate version: 3D WebGL engine, shaders, advanced particle effects.',
    how:'1. Créer monde 3D → 2. Shaders → 3. Publier',
    how_en:'1. Create 3D world → 2. Shaders → 3. Publish' },
  particleemitter:{ icon:'🌋', name:'Particle FX', cat:'Game Dev', tab:'particleemitter',
    desc:'Émetteur de particules pour effets visuels: feu, fumée, explosions, magie.',
    desc_en:'Particle emitter for visual effects: fire, smoke, explosions, magic.',
    how:'1. Configurer émetteur → 2. Ajuster → 3. Exporter JS',
    how_en:'1. Configure emitter → 2. Adjust → 3. Export JS' },

  // ── NEXT-GEN LABS ─────────────────────────────────────────────────────
  agisentience:{ icon:'🧠', name:'AGI Sentience Sandbox', cat:'Next-Gen Labs', tab:'agisentience',
    desc:'Bac à sable pour experimenter avec des architectures AGI et conscience artificielle.',
    desc_en:'Sandbox for experimenting with AGI architectures and artificial consciousness.',
    how:'1. Configurer AGI → 2. Tester → 3. Observer comportements',
    how_en:'1. Configure AGI → 2. Test → 3. Observe behaviors' },
  deepspace:   { icon:'🌌', name:'Deep Space Simulator', cat:'Next-Gen Labs', tab:'deepspace',
    desc:'Simulez des phénomènes spatiaux: orbites, trous noirs, galaxies en WebGL.',
    desc_en:'Simulate space phenomena: orbits, black holes, galaxies in WebGL.',
    how:'1. Configurer simulation → 2. Lancer → 3. Observer',
    how_en:'1. Configure simulation → 2. Launch → 3. Observe' },
  hyper4d:     { icon:'🌀', name:'4D Synth Lab', cat:'Next-Gen Labs', tab:'hyper4d',
    desc:'Synthétiseur 4D hypermodèles pour créer des géométries impossibles.',
    desc_en:'4D hypermodel synthesizer for creating impossible geometries.',
    how:'1. Configurer dimensions → 2. Générer → 3. Visualiser',
    how_en:'1. Configure dimensions → 2. Generate → 3. Visualize' },

  // ── EXTRAS ────────────────────────────────────────────────────────────
  achievements:{ icon:'🏆', name:'Achievements & Badges', cat:'Extras', tab:'achievements',
    desc:'Débloquez des badges et récompenses en utilisant les différents modules de l\'app.',
    desc_en:'Unlock badges and rewards by using the different app modules.',
    how:'1. Utiliser des modules → 2. Débloquer badges → 3. Partager',
    how_en:'1. Use modules → 2. Unlock badges → 3. Share' },
  widgets:     { icon:'🎪', name:'Widget Gallery', cat:'Extras', tab:'widgets',
    desc:'Galerie de widgets prêts à l\'emploi: compteurs, sliders, cartes météo, horloges.',
    desc_en:'Gallery of ready-to-use widgets: counters, sliders, weather cards, clocks.',
    how:'1. Choisir widget → 2. Personnaliser → 3. Injecter',
    how_en:'1. Choose widget → 2. Customize → 3. Inject' },
  comments:    { icon:'💬', name:'Code Comments', cat:'Extras', tab:'comments',
    desc:'Ajoutez des commentaires et annotations à votre code pour la documentation.',
    desc_en:'Add comments and annotations to your code for documentation.',
    how:'1. Sélectionner code → 2. Ajouter commentaire → 3. Générer docs',
    how_en:'1. Select code → 2. Add comment → 3. Generate docs' },
  screenshot:  { icon:'🖼️', name:'Screenshot Tool', cat:'Extras', tab:'screenshot',
    desc:'Capturez votre interface en haute résolution pour les présentations.',
    desc_en:'Capture your interface in high resolution for presentations.',
    how:'1. Configurer capture → 2. Prendre screenshot → 3. Télécharger PNG',
    how_en:'1. Configure capture → 2. Take screenshot → 3. Download PNG' },
  bionic:      { icon:'🧠', name:'Bionic Reading', cat:'Extras', tab:'bionic',
    desc:'Convertissez votre texte en lecture bionique pour une lecture plus rapide.',
    desc_en:'Convert your text to bionic reading for faster reading speed.',
    how:'1. Entrer texte → 2. Convertir → 3. Lire plus vite',
    how_en:'1. Enter text → 2. Convert → 3. Read faster' },
  games:       { icon:'🎮', name:'Mini Games', cat:'Extras', tab:'games',
    desc:'Mini-jeux intégrés pour les pauses: Tetris, Snake, 2048.',
    desc_en:'Built-in mini-games for breaks: Tetris, Snake, 2048.',
    how:'1. Choisir jeu → 2. Jouer → 3. Battre son record !',
    how_en:'1. Choose game → 2. Play → 3. Beat your score!' },
  pomodoro:    { icon:'🍅', name:'Pomodoro Timer', cat:'Extras', tab:'pomodoro',
    desc:'Minuteur Pomodoro intégré pour booster la productivité pendant le code.',
    desc_en:'Built-in Pomodoro timer to boost productivity while coding.',
    how:'1. Définir durée → 2. Démarrer → 3. Concentrez-vous !',
    how_en:'1. Set time → 2. Start → 3. Focus!' },
  guide:       { icon:'📖', name:'Interactive Guide', cat:'Extras', tab:'guide',
    desc:'Guide interactif et documentation complète de l\'application.',
    desc_en:'Interactive guide and complete application documentation.',
    how:'1. Ouvrir Guide → 2. Parcourir sections → 3. Apprendre',
    how_en:'1. Open Guide → 2. Browse sections → 3. Learn' },
  data:        { icon:'📊', name:'Data Studio', cat:'Extras', tab:'data',
    desc:'Studio de données pour visualiser et analyser des datasets.',
    desc_en:'Data studio for visualizing and analyzing datasets.',
    how:'1. Importer données → 2. Visualiser → 3. Analyser',
    how_en:'1. Import data → 2. Visualize → 3. Analyze' },
  regex:       { icon:'🔍', name:'Regex Tester', cat:'Dev Tools', tab:'regex',
    desc:'Testez des expressions régulières en direct avec mise en évidence des correspondances.',
    desc_en:'Test regular expressions live with match highlighting.',
    how:'1. Écrire pattern → 2. Coller texte test → 3. Voir correspondances',
    how_en:'1. Write pattern → 2. Paste test text → 3. See matches' },

  // ── ADVERTISING STUDIO ────────────────────────────────────────────────
  productad:   { icon:'📢', name:'Product Ad Creator', cat:'Advertising', tab:'productad',
    desc:'Créez des publicités produit professionnelles pour les réseaux sociaux.',
    desc_en:'Create professional product ads for social media.',
    how:'1. Ajouter produit → 2. Choisir format → 3. Générer pub',
    how_en:'1. Add product → 2. Choose format → 3. Generate ad' },
  adbannerpro: { icon:'📢', name:'Ad Banner Pro', cat:'Advertising', tab:'adbannerpro',
    desc:'Créez des bannières publicitaires HTML5 animées et réactives.',
    desc_en:'Create animated and responsive HTML5 advertising banners.',
    how:'1. Choisir taille IAB → 2. Designer → 3. Exporter HTML5',
    how_en:'1. Choose IAB size → 2. Design → 3. Export HTML5' },
  ythumb:      { icon:'📺', name:'YouTube Thumbnail', cat:'Advertising', tab:'ythumb',
    desc:'Créez des vignettes YouTube accrocheuses qui maximisent le taux de clics.',
    desc_en:'Create eye-catching YouTube thumbnails that maximize click-through rates.',
    how:'1. Choisir template → 2. Personnaliser → 3. Télécharger PNG',
    how_en:'1. Choose template → 2. Customize → 3. Download PNG' },
  socialproof: { icon:'⭐', name:'Social Proof Builder', cat:'Advertising', tab:'socialproof',
    desc:'Créez des éléments de preuve sociale: témoignages, avis, compteurs clients.',
    desc_en:'Create social proof elements: testimonials, reviews, customer counters.',
    how:'1. Ajouter preuves → 2. Styler → 3. Injecter',
    how_en:'1. Add proofs → 2. Style → 3. Inject' },
  licarousel:  { icon:'📄', name:'LinkedIn Carousel', cat:'Advertising', tab:'licarousel',
    desc:'Créez des carrousels LinkedIn professionnels pour maximiser l\'engagement.',
    desc_en:'Create professional LinkedIn carousels to maximize engagement.',
    how:'1. Créer slides → 2. Personnaliser → 3. Exporter PDF',
    how_en:'1. Create slides → 2. Customize → 3. Export PDF' },

  // ── FUTURE TECH ───────────────────────────────────────────────────────
  bcireader:   { icon:'🧠', name:'BCI Reader', cat:'Future Tech Lab', tab:'bcireader',
    desc:'Interface Brain-Computer pour contrôler l\'application par la pensée.',
    desc_en:'Brain-Computer Interface for controlling the application by thought.',
    how:'1. Connecter BCI → 2. Calibrer → 3. Contrôler par pensée',
    how_en:'1. Connect BCI → 2. Calibrate → 3. Control by thought' },
  digitaltwin: { icon:'🏭', name:'Digital Twin', cat:'Future Tech Lab', tab:'digitaltwin',
    desc:'Créez des jumeaux numériques de systèmes physiques pour simulation et monitoring.',
    desc_en:'Create digital twins of physical systems for simulation and monitoring.',
    how:'1. Modéliser système → 2. Connecter capteurs → 3. Simuler',
    how_en:'1. Model system → 2. Connect sensors → 3. Simulate' },
  quantcircuit:{ icon:'⚛️', name:'Quantum Circuit Designer', cat:'Future Tech Lab', tab:'quantcircuit',
    desc:'Concevez des circuits quantiques avec des portes logiques quantiques.',
    desc_en:'Design quantum circuits with quantum logic gates.',
    how:'1. Ajouter qubits → 2. Appliquer portes → 3. Mesurer',
    how_en:'1. Add qubits → 2. Apply gates → 3. Measure' },

  // ── MISC ──────────────────────────────────────────────────────────────
  elite:       { icon:'🚀', name:'Elite Studio', cat:'AI Studio', tab:'elite',
    desc:'Studio élite avec fonctionnalités exclusives pour les développeurs avancés.',
    desc_en:'Elite studio with exclusive features for advanced developers.',
    how:'1. Accéder Elite → 2. Utiliser outils exclusifs → 3. Créer',
    how_en:'1. Access Elite → 2. Use exclusive tools → 3. Create' },
  appspro:     { icon:'💎', name:'Apps Pro Collection', cat:'AI Studio', tab:'appspro',
    desc:'Collection d\'applications professionnelles prêtes à personnaliser et déployer.',
    desc_en:'Collection of professional applications ready to customize and deploy.',
    how:'1. Choisir app → 2. Personnaliser → 3. Déployer',
    how_en:'1. Choose app → 2. Customize → 3. Deploy' },
  sites:       { icon:'🌐', name:'Sites Gallery', cat:'Marketing & Biz', tab:'sites',
    desc:'Galerie de sites web complets prêts à utiliser et personnaliser.',
    desc_en:'Gallery of complete websites ready to use and customize.',
    how:'1. Parcourir galerie → 2. Choisir site → 3. Personnaliser',
    how_en:'1. Browse gallery → 2. Choose site → 3. Customize' },
  i18n:        { icon:'🌍', name:'Internationalization (i18n)', cat:'Dev Tools', tab:'i18n',
    desc:'Gérez les traductions et l\'internationalisation de votre application.',
    desc_en:'Manage translations and internationalization of your application.',
    how:'1. Ajouter langues → 2. Traduire → 3. Exporter fichiers i18n',
    how_en:'1. Add languages → 2. Translate → 3. Export i18n files' },
  present:     { icon:'🎤', name:'Presentation Mode', cat:'Extras', tab:'present',
    desc:'Présentez votre code et interface en mode plein écran professionnel.',
    desc_en:'Present your code and interface in professional full-screen mode.',
    how:'1. Activer présentation → 2. Naviguer → 3. Impressionner !',
    how_en:'1. Activate presentation → 2. Navigate → 3. Impress!' },
  anim2:       { icon:'🎞️', name:'Animation Library', cat:'Visual FX', tab:'anim',
    desc:'Bibliothèque complète d\'animations CSS: entrées, sorties, effets spéciaux.',
    desc_en:'Complete CSS animation library: entrances, exits, special effects.',
    how:'1. Parcourir → 2. Prévisualiser → 3. Copier CSS',
    how_en:'1. Browse → 2. Preview → 3. Copy CSS' },
  showr:       { icon:'🌌', name:'Showroom', cat:'Showcase', tab:'showroom',
    desc:'Galerie de créations de la communauté. Trouvez l\'inspiration et partagez.',
    desc_en:'Community creation gallery. Find inspiration and share.',
    how:'1. Parcourir → 2. S\'inspirer → 3. Partager',
    how_en:'1. Browse → 2. Get inspired → 3. Share' },
  shortcut:    { icon:'⌨️', name:'Keyboard Shortcuts', cat:'General', tab:null,
    desc:'Raccourcis clavier: Ctrl+K (Palette), Ctrl+S (Sauver), Ctrl+Z (Annuler), F5 (Aperçu).',
    desc_en:'Keyboard shortcuts: Ctrl+K (Palette), Ctrl+S (Save), Ctrl+Z (Undo), F5 (Preview).',
    how:'Ctrl+K est la façon la plus rapide de naviguer dans le studio !',
    how_en:'Ctrl+K is the fastest way to navigate the studio!' }
};

// ─── TOUR Steps ──────────────────────────────────────────────────────────
var TOUR_STEPS = {
  en: [
    {
      title: '🎉 Welcome to IA Architecte!',
      msg: '**Your AI-powered web studio** with 250+ modules.\n\nI\'m **IA Guide**, your personal assistant. Let me show you around in 30 seconds! ✨\n\nClick **Next Tour Step →** to begin!',
      quick: ['⏭️ Next Tour Step →', 'Skip Tour', '📋 All Modules']
    },
    {
      title: '⚡ Step 1: Generate a Full Website',
      msg: '**IA ULTRA** is your magic wand!\n\nJust type *"a sushi restaurant"*, *"crypto dashboard"*, or *"portfolio for a designer"* and a **complete styled website appears instantly!**\n\nIt\'s the fastest way to start any project.',
      quick: ['⚡ Try IA ULTRA Now!', '⏭️ Next Tour Step →', 'Skip Tour'],
      openTab: 'iaultra'
    },
    {
      title: '🎨 Step 2: Design Tools',
      msg: 'Our **Design & UI** compartment has everything:\n\n🌈 **Gradient Forge** — Drag color stops\n🔤 **Typography AI** — Font pairs by mood\n🎨 **Color Harmony** — Harmonious palettes\n💎 **Glassmorphism** — Glass UI effects\n✒️ **SVG Studio** — Describe → get icons\n\nAll inject directly into your editor!',
      quick: ['🌈 Try Gradient Forge', '🎨 Browse Design Tools', '⏭️ Next Tour Step →'],
      openTab: 'gradientforge'
    },
    {
      title: '🤖 Step 3: AI Assistance',
      msg: 'The **AI Studio** has your back:\n\n🎙️ **Voice AI** — Speak your design\n🤖 **AI Bug Fixer** — Fix errors instantly\n🔮 **Code Explainer** — Understand any code\n🤖 **AI Chatbot** — Build your own chatbot\n🧠 **Neural Sandbox** — Train neural nets visually\n\nAI-powered tools for every coding need!',
      quick: ['🎙️ Try Voice AI', '🤖 Open AI Studio', '⏭️ Next Tour Step →'],
      openTab: 'voice'
    },
    {
      title: '✨ Step 4: Visual Effects',
      msg: 'Make your site **SPECTACULAR** with our visual FX:\n\n💧 **Liquid Gooey** — Fluid physics\n📺 **Cyber Glitch** — Cyberpunk effects\n🕹️ **Pixel Forge** — 8-bit retro style\n🔨 **Smash UI** — Click to shatter elements!\n📜 **Scroll Reveal** — Scroll animations\n🌌 **Zero-G UI** — Elements float in space',
      quick: ['🔨 Try Smash UI!', '🌊 See All FX', '⏭️ Next Tour Step →'],
      openTab: 'glassbreaker'
    },
    {
      title: '⚙️ Step 5: Advanced Develops Studio',
      msg: 'Power tools for serious developers:\n\n📂 **Multi-File Manager** — Multiple files at once\n💾 **Visual CRUD** — Database UIs visually\n⚡ **Production Optimizer** — Minify & optimize\n🧪 **E2E Testing** — Auto-generate tests\n⚡ **Lighthouse** — Core Web Vitals analysis\n🛡️ **Security Scanner** — Find vulnerabilities',
      quick: ['📂 Multi-File Manager', '⚡ Try Optimizer', '⏭️ Next Tour Step →'],
      openTab: 'projectassembler'
    },
    {
      title: '🚀 You\'re Ready to Build!',
      msg: '**You now know the essentials!** Here\'s how to use me:\n\n💬 **Ask me anything** — "What is X?", "How do I do Y?"\n📋 **"All Modules"** — Browse all 250+ tools\n🔍 **Search by name** — "Gradient", "Neural", "Game Dev"\n🚀 **"Open X"** — I\'ll navigate directly!\n\n*Happy building! I\'m always here.* 🤖✨',
      quick: ['📋 All Modules', '⚡ Open IA ULTRA', '🎨 Browse Design'],
      openTab: null
    }
  ],
  fr: [
    {
      title: '🎉 Bienvenue dans IA Architecte !',
      msg: '**Votre studio web propulsé par l\'IA** avec 250+ modules.\n\nJe suis **IA Guide**, votre assistant personnel. Laissez-moi vous faire faire le tour en 30 secondes ! ✨\n\nCliquez **Étape suivante →** pour commencer !',
      quick: ['⏭️ Étape suivante →', 'Passer le tour', '📋 Tous les modules']
    },
    {
      title: '⚡ Étape 1 : Générez un site complet',
      msg: '**IA ULTRA** est votre baguette magique !\n\nTapez simplement *"un restaurant de sushi"*, *"dashboard crypto"*, ou *"portfolio designer"* et un **site web complet et stylisé apparaît instantanément !**\n\nC\'est la façon la plus rapide de démarrer.',
      quick: ['⚡ Essayer IA ULTRA !', '⏭️ Étape suivante →', 'Passer'],
      openTab: 'iaultra'
    },
    {
      title: '🎨 Étape 2 : Outils de Design',
      msg: 'Le compartiment **Design & UI** a tout :\n\n🌈 **Gradient Forge** — Glisser les couleurs\n🔤 **Typography AI** — Polices par ambiance\n🎨 **Color Harmony** — Palettes harmonieuses\n💎 **Glassmorphism** — Effets verre\n✒️ **Studio SVG** — Décrivez → obtenez icônes\n\nTout s\'injecte dans votre éditeur !',
      quick: ['🌈 Essayer Gradient Forge', '🎨 Design Tools', '⏭️ Étape suivante →'],
      openTab: 'gradientforge'
    },
    {
      title: '🤖 Étape 3 : Assistance IA',
      msg: 'L\'**AI Studio** est là pour vous :\n\n🎙️ **Voice AI** — Parlez votre design\n🤖 **AI Bug Fixer** — Corrigez erreurs instantanément\n🔮 **Code Explainer** — Comprenez n\'importe quel code\n🤖 **AI Chatbot** — Créez votre propre chatbot\n🧠 **Neural Sandbox** — Entraînez des réseaux neuronaux\n\nL\'IA pour chaque besoin de code !',
      quick: ['🎙️ Essayer Voice AI', '🤖 AI Studio', '⏭️ Étape suivante →'],
      openTab: 'voice'
    },
    {
      title: '✨ Étape 4 : Effets Visuels',
      msg: 'Rendez votre site **SPECTACULAIRE** :\n\n💧 **Liquid Gooey** — Physique des fluides\n📺 **Cyber Glitch** — Effets cyberpunk\n🕹️ **Pixel Forge** — Style rétro 8-bit\n🔨 **Smash UI** — Cliquez pour briser les éléments !\n📜 **Scroll Reveal** — Animations au défilement\n🌌 **Zero-G UI** — Éléments en apesanteur',
      quick: ['🔨 Essayer Smash UI !', '🌊 Tous les effets', '⏭️ Étape suivante →'],
      openTab: 'glassbreaker'
    },
    {
      title: '⚙️ Étape 5 : Advanced Develops Studio',
      msg: 'Outils puissants pour développeurs sérieux :\n\n📂 **Multi-File Manager** — Plusieurs fichiers à la fois\n💾 **Visual CRUD** — UIs de base de données\n⚡ **Production Optimizer** — Minification\n🧪 **E2E Testing** — Tests auto-générés\n⚡ **Lighthouse** — Core Web Vitals\n🛡️ **Security Scanner** — Trouver vulnérabilités',
      quick: ['📂 Multi-File Manager', '⚡ Optimizer', '⏭️ Étape suivante →'],
      openTab: 'projectassembler'
    },
    {
      title: '🚀 Vous êtes prêt à créer !',
      msg: '**Vous connaissez maintenant l\'essentiel !** Comment m\'utiliser :\n\n💬 **Posez-moi n\'importe quoi** — "Qu\'est-ce que X ?", "Comment faire Y ?"\n📋 **"Tous les modules"** — Parcourez les 250+ outils\n🔍 **Cherchez par nom** — "Gradient", "Neural", "Game Dev"\n🚀 **"Ouvrir X"** — Je navigue directement !\n\n*Bon développement ! Je suis toujours là.* 🤖✨',
      quick: ['📋 Tous les modules', '⚡ IA ULTRA', '🎨 Design Tools'],
      openTab: null
    }
  ]
};

function gl() { return (window.lang && window.lang === 'fr') ? 'fr' : 'en'; }
function isFr() { return gl() === 'fr'; }

// ─── Simple intent matching ────────────────────────────────────────────
function matchIntent(msg) {
  var m = msg.toLowerCase().trim();
  var lx = gl();

  // Tour triggers
  if (m.match(/\b(tour|guide|start|démarrer|commencer|begin|walk|explain app|présente|montrer)\b/)) {
    return { type: 'tour' };
  }
  // Greetings
  if (m.match(/\b(hi|hello|bonjour|salut|hey|howdy|hola|ciao)\b/)) {
    return { type: 'greeting' };
  }
  // Help / all modules
  if (m.match(/\b(help|aide|tools|outils|all|tous|list|liste|modules|what can|que peux|catég)\b/)) {
    return { type: 'categories' };
  }
  // Shortcuts
  if (m.match(/\b(shortcut|raccourci|ctrl|keyboard|clavier)\b/)) {
    return { type: 'module', key: 'shortcut' };
  }
  // Export / deploy
  if (m.match(/\b(export|download|deploy|share|partage|télécharge|publish|publier)\b/)) {
    return { type: 'module', key: 'export' };
  }
  // Tour next
  if (m.match(/\b(next|suivant|continue|continuer|step|étape)\b/) && TOUR_ACTIVE) {
    return { type: 'tour_next' };
  }
  // Skip tour
  if (m.match(/\b(skip|passer|stop tour|arrêter tour)\b/)) {
    return { type: 'tour_end' };
  }

  // Search in FULL_KB by name, tab id, keywords
  var keys = Object.keys(FULL_KB);
  var bestMatch = null;
  var bestScore = 0;

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var mod = FULL_KB[k];
    if (!mod) continue;
    var score = 0;
    var name = (mod.name || '').toLowerCase();
    var tab = (mod.tab || '').toLowerCase();
    var desc = (lx === 'fr' ? mod.desc : mod.desc_en || mod.desc || '').toLowerCase();

    // Exact tab id match
    if (m === tab || m.includes(tab)) score += 10;
    // Key match
    if (m === k.toLowerCase()) score += 8;
    // Name words match
    var nameWords = name.split(/[\s\-_]+/);
    nameWords.forEach(function(w) {
      if (w.length > 2 && m.includes(w)) score += 4;
    });
    // Partial name match
    if (m.includes(name)) score += 6;
    // Description keyword match
    var descWords = desc.split(/[\s\-_.,]+/);
    descWords.forEach(function(w) {
      if (w.length > 3 && m.includes(w)) score += 1;
    });

    if (score > bestScore) {
      bestScore = score;
      bestMatch = k;
    }
  }

  if (bestScore >= 3 && bestMatch) {
    return { type: 'module', key: bestMatch };
  }

  // Also check window.GK for legacy support
  if (window.GK && window.GK.en) {
    var gkKeys = Object.keys(window.GK.en);
    for (var j = 0; j < gkKeys.length; j++) {
      var gkMod = window.GK.en[gkKeys[j]];
      var searchStr = (gkMod.name + ' ' + gkMod.desc).toLowerCase();
      var nWords = gkMod.name.toLowerCase().split(/\s+/);
      var matched = nWords.some(function(w) { return w.length > 2 && m.includes(w); });
      if (!matched) matched = m.includes(gkKeys[j].toLowerCase());
      if (matched) return { type: 'gkmodule', key: gkKeys[j] };
    }
  }

  return null;
}

// ─── Markdown renderer ────────────────────────────────────────────────
function mdToHtml(text) {
  return (text || '')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:#94a3b8;">$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:#334155;padding:1px 5px;border-radius:3px;font-size:10px;color:#f472b6;">$1</code>')
    .replace(/\n/g, '<br>');
}

// ─── Add message ──────────────────────────────────────────────────────
function addMessage(role, text, openTab, quickReplies) {
  CHAT_HISTORY.push({ role: role, text: text, openTab: openTab, quickReplies: quickReplies });
  refreshChat();
}

// ─── Refresh chat ─────────────────────────────────────────────────────
function refreshChat() {
  var chatBody = document.getElementById('iagb-body');
  if (!chatBody) return;
  chatBody.innerHTML = '';

  CHAT_HISTORY.forEach(function(msg) {
    if (msg.role === 'categories' && window.GK) {
      renderCategoriesBlock(chatBody);
      return;
    }

    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:flex-start;' + (msg.role === 'user' ? 'flex-direction:row-reverse;' : '');

    var avatar = document.createElement('div');
    avatar.style.cssText = 'width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;background:' +
      (msg.role === 'user' ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'linear-gradient(135deg,#8b5cf6,#6d28d9)') + ';';
    avatar.textContent = msg.role === 'user' ? '👤' : '🤖';

    var bubble = document.createElement('div');
    bubble.style.cssText = 'max-width:85%;padding:10px 13px;border-radius:' +
      (msg.role === 'user' ? '12px 2px 12px 12px' : '2px 12px 12px 12px') +
      ';font-size:11.5px;line-height:1.65;background:' +
      (msg.role === 'user' ? 'linear-gradient(135deg,#1d4ed8,#1e40af)' : '#1e293b') +
      ';color:#e2e8f0;border:1px solid ' +
      (msg.role === 'user' ? '#2563eb40' : '#334155') + ';';
    bubble.innerHTML = mdToHtml(msg.text);

    // Open Tab button
    if (msg.openTab) {
      var openBtn = document.createElement('button');
      openBtn.style.cssText = 'display:inline-flex;align-items:center;gap:5px;margin-top:9px;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border:none;padding:6px 13px;border-radius:7px;font-size:10px;cursor:pointer;font-weight:700;transition:all 0.2s;';
      openBtn.innerHTML = '🚀 ' + (isFr() ? 'Ouvrir ' : 'Open ') + (FULL_KB[msg.openTab] ? FULL_KB[msg.openTab].name : msg.openTab.toUpperCase());
      var tabId = msg.openTab;
      openBtn.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
      openBtn.onmouseout = function() { this.style.transform = 'scale(1)'; };
      openBtn.onclick = function() {
        if (window.renderTab) window.renderTab(tabId);
        toggleBot(false);
      };
      bubble.appendChild(openBtn);
    }

    // Quick reply buttons
    if (msg.quickReplies && msg.quickReplies.length > 0) {
      var qrDiv = document.createElement('div');
      qrDiv.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;margin-top:9px;';
      msg.quickReplies.forEach(function(qr) {
        var qrBtn = document.createElement('button');
        qrBtn.textContent = qr;
        qrBtn.style.cssText = 'background:#0f172a;border:1px solid #4c1d95;color:#c4b5fd;padding:4px 9px;border-radius:20px;font-size:9.5px;cursor:pointer;transition:all 0.2s;';
        qrBtn.onmouseover = function() { this.style.background = '#1e1b4b'; this.style.borderColor = '#7c3aed'; };
        qrBtn.onmouseout = function() { this.style.background = '#0f172a'; this.style.borderColor = '#4c1d95'; };
        qrBtn.onclick = function() { processInput(qr); };
        qrDiv.appendChild(qrBtn);
      });
      bubble.appendChild(qrDiv);
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatBody.appendChild(row);
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

function renderCategoriesBlock(chatBody) {
  var cats = {
    en: [
      { label: '🤖 AI Studio', color: '#8b5cf6', tabs: ['iaultra','voice','aichatbot','wizard','onemin','bugfixer'] },
      { label: '🎨 Design & UI', color: '#ec4899', tabs: ['gradientforge','colorharmony','svgstudio','glassmorphism','themepicker'] },
      { label: '📐 Layout & Flow', color: '#06b6d4', tabs: ['gridbuilder','uiblocks','arch','appassembler','breakpoints'] },
      { label: '⚙️ Advanced Dev Studio', color: '#f59e0b', tabs: ['projectassembler','dbcrudapi','e2etestgen','webvitalsperf','tailwindtranspile'] },
      { label: '💫 Premium Studios', color: '#a855f7', tabs: ['neuralnet','holographiccard','meshgradient','audiosynth','assetoptimizer'] },
      { label: '✨ Visual FX', color: '#38bdf8', tabs: ['liquidgooey','cyberglitch','glassbreaker','pixelforge','neonpulse'] },
      { label: '🛠️ Dev Tools', color: '#f97316', tabs: ['regexforge','cronstudio','dataforge','snippets','stack'] },
      { label: '🧪 Test & Audit', color: '#34d399', tabs: ['audit','launchcheck','a11y','eco','heatmap'] },
      { label: '🎮 Game Dev', color: '#f43f5e', tabs: ['gamedevstudio','particleemitter','proceduralmap','rigidbodyphysics'] },
      { label: '⚗️ Genius Lab', color: '#fbbf24', tabs: ['musictosite','emotionadaptive','physicscss','spatialui'] },
      { label: '📈 Marketing & Biz', color: '#fb923c', tabs: ['seo','invoice','promo','social','lpscore'] },
      { label: '🔬 Next-Gen Labs', color: '#818cf8', tabs: ['agisentience','neuralnet','deepspace','quantcircuit'] }
    ],
    fr: [
      { label: '🤖 AI Studio', color: '#8b5cf6', tabs: ['iaultra','voice','aichatbot','wizard','onemin','bugfixer'] },
      { label: '🎨 Design & UI', color: '#ec4899', tabs: ['gradientforge','colorharmony','svgstudio','glassmorphism','themepicker'] },
      { label: '📐 Layout & Flux', color: '#06b6d4', tabs: ['gridbuilder','uiblocks','arch','appassembler','breakpoints'] },
      { label: '⚙️ Advanced Dev Studio', color: '#f59e0b', tabs: ['projectassembler','dbcrudapi','e2etestgen','webvitalsperf','tailwindtranspile'] },
      { label: '💫 Premium Studios', color: '#a855f7', tabs: ['neuralnet','holographiccard','meshgradient','audiosynth','assetoptimizer'] },
      { label: '✨ Effets Visuels', color: '#38bdf8', tabs: ['liquidgooey','cyberglitch','glassbreaker','pixelforge','neonpulse'] },
      { label: '🛠️ Outils Dev', color: '#f97316', tabs: ['regexforge','cronstudio','dataforge','snippets','stack'] },
      { label: '🧪 Tests & Audit', color: '#34d399', tabs: ['audit','launchcheck','a11y','eco','heatmap'] },
      { label: '🎮 Game Dev', color: '#f43f5e', tabs: ['gamedevstudio','particleemitter','proceduralmap','rigidbodyphysics'] },
      { label: '⚗️ Genius Lab', color: '#fbbf24', tabs: ['musictosite','emotionadaptive','physicscss','spatialui'] },
      { label: '📈 Marketing & Biz', color: '#fb923c', tabs: ['seo','invoice','promo','social','lpscore'] },
      { label: '🔬 Labs Futur', color: '#818cf8', tabs: ['agisentience','neuralnet','deepspace','quantcircuit'] }
    ]
  };

  var localCats = cats[gl()] || cats.en;
  var catDiv = document.createElement('div');
  catDiv.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
  var intro = document.createElement('div');
  intro.style.cssText = 'font-size:11px;color:#94a3b8;padding:4px 0;font-weight:600;';
  intro.innerHTML = '🤖 <strong style="color:#c4b5fd;">IA Guide</strong> — ' + (isFr() ? 'Cliquez une catégorie :' : 'Click a category to explore:');
  catDiv.appendChild(intro);

  var grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';

  localCats.forEach(function(cat) {
    var btn = document.createElement('button');
    btn.style.cssText = 'background:' + cat.color + '15;border:1px solid ' + cat.color + '40;color:' + cat.color + ';padding:7px 9px;border-radius:8px;font-size:9.5px;font-weight:700;cursor:pointer;text-align:left;transition:all 0.2s;line-height:1.3;';
    btn.textContent = cat.label;
    btn.onmouseover = function() { this.style.background = cat.color + '30'; this.style.borderColor = cat.color + '80'; };
    btn.onmouseout = function() { this.style.background = cat.color + '15'; this.style.borderColor = cat.color + '40'; };
    btn.onclick = function() { showCategoryDetail(cat); };
    grid.appendChild(btn);
  });

  catDiv.appendChild(grid);
  chatBody.appendChild(catDiv);
}

function showCategoryDetail(cat) {
  var lines = [cat.label + (isFr() ? ' — Modules :' : ' — Available modules:') + '\n'];
  cat.tabs.forEach(function(tabId) {
    // Find in FULL_KB
    var mod = null;
    Object.keys(FULL_KB).forEach(function(k) {
      if (FULL_KB[k].tab === tabId && !mod) mod = FULL_KB[k];
    });
    if (mod) {
      var desc = isFr() ? (mod.desc || mod.desc_en) : (mod.desc_en || mod.desc);
      lines.push(mod.icon + ' **' + mod.name + '** — ' + desc);
    }
  });
  lines.push('\n' + (isFr() ? 'Tapez le nom d\'un module pour l\'ouvrir.' : 'Type any module name to open it.'));
  addMessage('bot', lines.join('\n'));
}

// ─── Process user input ───────────────────────────────────────────────
function processInput(val) {
  if (!val.trim()) return;

  // Check for tour navigation keywords
  var m = val.toLowerCase();
  var isTourNext = m.match(/next tour step|étape suivante|⏭️/) !== null;
  var isTourSkip = m.match(/skip tour|passer le tour|skip/) !== null;

  addMessage('user', val);

  setTimeout(function() {
    if (isTourSkip) {
      TOUR_ACTIVE = false;
      var endMsg = isFr()
        ? '✅ Tour terminé ! Je suis toujours là pour vous aider.\n\nPosez-moi n\'importe quelle question sur un module !'
        : '✅ Tour ended! I\'m still here to help.\n\nAsk me anything about any module!';
      addMessage('bot', endMsg, null, isFr() ? ['📋 Tous les modules', '⚡ IA ULTRA'] : ['📋 All Modules', '⚡ IA ULTRA']);
      return;
    }

    if (isTourNext || (TOUR_ACTIVE && m.match(/⏭️/))) {
      TOUR_STEP++;
      showTourStep();
      return;
    }

    var intent = matchIntent(val);

    if (!intent) {
      var suggestions = findClosestModules(val);
      var unknownMsg = isFr()
        ? 'Je ne suis pas sûr de ça. Vouliez-vous dire :\n' + suggestions + '\n\nOu tapez **aide** pour voir toutes les catégories.'
        : 'I\'m not sure about that. Did you mean:\n' + suggestions + '\n\nOr type **help** to browse all categories.';
      addMessage('bot', unknownMsg, null, isFr() ? ['📋 Tous modules', '🎓 Tour guidé'] : ['📋 All Modules', '🎓 Take a Tour']);
      return;
    }

    switch (intent.type) {
      case 'greeting':
        var greeting = isFr()
          ? '👋 Bonjour ! Je suis **IA Guide**.\n\nJe connais **250+ modules** de cette application !\n\n💡 *Astuce : tapez "tour" pour une visite guidée ou "aide" pour voir tous les modules.*'
          : '👋 Hello! I\'m **IA Guide**.\n\nI know **250+ modules** in this app!\n\n💡 *Tip: type "tour" for a guided tour or "help" to see all modules.*';
        addMessage('bot', greeting, null, isFr() ? ['🎓 Tour guidé', '📋 Tous les modules', '⚡ IA ULTRA'] : ['🎓 Take a Tour', '📋 All Modules', '⚡ IA ULTRA']);
        break;

      case 'tour':
        TOUR_ACTIVE = true;
        TOUR_STEP = 0;
        showTourStep();
        break;

      case 'tour_next':
        TOUR_STEP++;
        showTourStep();
        break;

      case 'tour_end':
        TOUR_ACTIVE = false;
        var endMsg2 = isFr() ? '✅ D\'accord ! Je suis là si besoin.' : '✅ Alright! I\'m here if you need me.';
        addMessage('bot', endMsg2, null, isFr() ? ['📋 Tous modules'] : ['📋 All Modules']);
        break;

      case 'categories':
        CHAT_HISTORY.push({ role: 'categories' });
        refreshChat();
        break;

      case 'module':
        var mod = FULL_KB[intent.key];
        if (mod) {
          var desc = isFr() ? (mod.desc || mod.desc_en) : (mod.desc_en || mod.desc);
          var how = isFr() ? (mod.how || mod.how_en) : (mod.how_en || mod.how);
          var txt = mod.icon + ' **' + mod.name + '**\n\n' + desc + '\n\n**' + (isFr() ? 'Comment utiliser :' : 'How to use:') + '**\n' + how;
          addMessage('bot', txt, mod.tab, isFr() ? ['📋 Plus de modules'] : ['📋 More modules']);
        } else {
          addMessage('bot', isFr() ? 'Module introuvable.' : 'Module not found.');
        }
        break;

      case 'gkmodule':
        if (window.GK && window.GK.en[intent.key]) {
          var gkMod = window.GK.en[intent.key];
          var gkTxt = gkMod.icon + ' **' + gkMod.name + '**\n\n' + gkMod.desc + '\n\n**' + (isFr() ? 'Comment utiliser :' : 'How to use:') + '**\n' + gkMod.how;
          addMessage('bot', gkTxt, gkMod.tab);
        }
        break;

      default:
        addMessage('bot', intent.data || (isFr() ? 'Voici l\'information.' : 'Here is the information.'));
    }
  }, 350);
}

function findClosestModules(query) {
  var q = query.toLowerCase();
  var matches = [];
  Object.keys(FULL_KB).forEach(function(k) {
    var mod = FULL_KB[k];
    var name = (mod.name || '').toLowerCase();
    if (name.split(' ').some(function(w) { return w.length > 1 && q.includes(w[0]); })) {
      matches.push(mod.icon + ' ' + mod.name);
    }
  });
  if (matches.length === 0) {
    return (isFr() ? '- ⚡ IA ULTRA\n- 🎨 Gradient Forge\n- 🧠 Neural Sandbox' : '- ⚡ IA ULTRA\n- 🎨 Gradient Forge\n- 🧠 Neural Sandbox');
  }
  return matches.slice(0, 4).map(function(m) { return '- ' + m; }).join('\n');
}

// ─── Tour engine ──────────────────────────────────────────────────────
function showTourStep() {
  var steps = TOUR_STEPS[gl()];
  if (TOUR_STEP >= steps.length) {
    TOUR_ACTIVE = false;
    var doneMsg = isFr()
      ? '🎉 Tour terminé ! Vous connaissez maintenant les fonctionnalités essentielles.\n\nPosez-moi n\'importe quelle question sur un module !'
      : '🎉 Tour complete! You now know the essential features.\n\nAsk me anything about any module!';
    addMessage('bot', doneMsg, null, isFr() ? ['📋 Tous modules', '⚡ IA ULTRA'] : ['📋 All Modules', '⚡ IA ULTRA']);
    return;
  }
  var step = steps[TOUR_STEP];
  var fullMsg = '**' + step.title + '**\n\n' + step.msg;
  var progressEmoji = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣'][TOUR_STEP] || '✅';
  fullMsg = progressEmoji + ' ' + fullMsg;

  addMessage('bot', fullMsg, step.openTab || null, step.quick || []);
}

// ─── Welcome Tour (first visit) ───────────────────────────────────────
function triggerWelcomeTour() {
  var hasVisited = localStorage.getItem('iagb_tour_done');
  if (hasVisited) return;
  localStorage.setItem('iagb_tour_done', '1');

  setTimeout(function() {
    if (!BOT_OPEN) {
      toggleBot(true);
    }
    TOUR_ACTIVE = true;
    TOUR_STEP = 0;
    var steps = TOUR_STEPS[gl()];
    var welcomeStep = steps[0];
    var firstMsg = '🎉 **' + welcomeStep.title + '**\n\n' + welcomeStep.msg;
    addMessage('bot', firstMsg, null, welcomeStep.quick);
  }, 2000); // Show after 2 seconds of app load
}

// ─── Toggle bot ───────────────────────────────────────────────────────
function toggleBot(forceState) {
  BOT_OPEN = (forceState !== undefined) ? forceState : !BOT_OPEN;
  var panel = document.getElementById('iagb-panel');
  var fab = document.getElementById('iagb-fab');
  if (panel) panel.style.display = BOT_OPEN ? 'flex' : 'none';
  if (fab) {
    fab.style.background = BOT_OPEN ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#8b5cf6,#6d28d9)';
    fab.textContent = BOT_OPEN ? '✕' : '🤖';
  }

  if (BOT_OPEN && CHAT_HISTORY.length === 0) {
    // Initial greeting
    var greeting = isFr()
      ? '👋 Bonjour ! Je suis **IA Guide Bot**.\n\nJe connais **250+ modules** dans 20 catégories !\n\n💡 Tapez **"tour"** pour une visite guidée, ou posez-moi n\'importe quelle question !'
      : '👋 Hi! I\'m **IA Guide Bot**.\n\nI know **250+ modules** across 20 categories!\n\n💡 Type **"tour"** for a guided tour, or ask me anything about the app!';
    addMessage('bot', greeting, null,
      isFr()
        ? ['🎓 Tour guidé', '📋 Tous les modules', '⚡ IA ULTRA', '🤖 AI Chatbot']
        : ['🎓 Take a Tour', '📋 All Modules', '⚡ IA ULTRA', '🤖 AI Chatbot']);
  }

  if (BOT_OPEN) {
    setTimeout(function() {
      var inp = document.getElementById('iagb-input');
      if (inp) inp.focus();
    }, 100);
  }
}

// ─── Build Bot UI ─────────────────────────────────────────────────────
function buildBot() {
  if (document.getElementById('iagb-fab')) return;

  // ── FAB Button ──
  var fab = document.createElement('button');
  fab.id = 'iagb-fab';
  fab.textContent = '🤖';
  fab.title = 'IA Guide Bot — Ask me anything!';
  fab.style.cssText = [
    'position:fixed;bottom:24px;right:24px;',
    'width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;',
    'font-size:24px;',
    'background:linear-gradient(135deg,#8b5cf6,#6d28d9);',
    'color:#fff;',
    'box-shadow:0 8px 30px rgba(139,92,246,0.6),0 0 0 0 rgba(139,92,246,0.4);',
    'z-index:999999;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);',
    'display:flex;align-items:center;justify-content:center;',
    'animation:iagbPulse 2.5s ease-in-out infinite;'
  ].join('');

  // ── Panel ──
  var panel = document.createElement('div');
  panel.id = 'iagb-panel';
  panel.style.cssText = [
    'position:fixed;bottom:90px;right:24px;',
    'width:340px;height:500px;',
    'background:linear-gradient(180deg,#0f172a 0%,#0d1117 100%);',
    'border:1px solid rgba(139,92,246,0.5);border-radius:18px;',
    'display:none;flex-direction:column;',
    'box-shadow:0 30px 70px rgba(0,0,0,0.7),0 0 40px rgba(139,92,246,0.15);',
    'z-index:999998;overflow:hidden;font-family:"Inter",sans-serif;'
  ].join('');

  // ── Header ──
  var panelHdr = document.createElement('div');
  panelHdr.style.cssText = 'background:linear-gradient(135deg,#7c3aed,#4c1d95);padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;position:relative;overflow:hidden;';

  // Shimmer effect on header
  var shimmer = document.createElement('div');
  shimmer.style.cssText = 'position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);animation:iagbShimmer 3s ease-in-out infinite;pointer-events:none;';
  panelHdr.appendChild(shimmer);

  panelHdr.innerHTML += [
    '<div style="font-size:22px;z-index:1;">🤖</div>',
    '<div style="z-index:1;">',
    '  <div style="font-size:13.5px;font-weight:900;color:#fff;letter-spacing:0.5px;">IA Guide Bot</div>',
    '  <div style="font-size:9.5px;color:#ddd8fe;opacity:0.9;">',
    (isFr() ? '250+ modules · Toujours là pour vous' : '250+ modules · Always here for you'),
    '  </div>',
    '</div>',
    '<div style="margin-left:auto;display:flex;gap:6px;z-index:1;">',
    '  <button id="iagb-tour-btn" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:#fff;padding:4px 8px;border-radius:6px;font-size:9px;cursor:pointer;font-weight:700;" title="Guided Tour">🎓 Tour</button>',
    '  <button id="iagb-clear-btn" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#ddd8fe;padding:4px 8px;border-radius:6px;font-size:9px;cursor:pointer;">Clear</button>',
    '</div>'
  ].join('');

  // ── Chat body ──
  var chatBody = document.createElement('div');
  chatBody.id = 'iagb-body';
  chatBody.style.cssText = 'flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:#4c1d95 #0f172a;';

  // ── Quick actions ──
  var quickRow = document.createElement('div');
  quickRow.style.cssText = 'padding:8px 12px;border-top:1px solid #1e293b;display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0;background:#090e18;';

  var quickBtns = isFr() ? [
    { l: '📋 Tous modules', v: 'aide' },
    { l: '⚡ IA ULTRA', v: 'ia ultra' },
    { l: '🎓 Tour guidé', v: 'tour' },
    { l: '🤖 AI Chatbot', v: 'ai chatbot' },
    { l: '💫 Premium', v: 'premium studios' },
    { l: '🎮 Game Dev', v: 'game dev' },
    { l: '🌈 Gradient', v: 'gradient forge' },
    { l: '🧠 Neural', v: 'neural network' },
    { l: '📦 Exporter', v: 'export' }
  ] : [
    { l: '📋 All Modules', v: 'help' },
    { l: '⚡ IA ULTRA', v: 'ia ultra' },
    { l: '🎓 Take Tour', v: 'tour' },
    { l: '🤖 AI Chatbot', v: 'ai chatbot' },
    { l: '💫 Premium', v: 'premium studios' },
    { l: '🎮 Game Dev', v: 'game dev' },
    { l: '🌈 Gradient', v: 'gradient forge' },
    { l: '🧠 Neural', v: 'neural network' },
    { l: '📦 Export', v: 'export' }
  ];

  quickBtns.forEach(function(b) {
    var qb = document.createElement('button');
    qb.textContent = b.l;
    qb.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:4px 9px;border-radius:20px;font-size:9px;cursor:pointer;white-space:nowrap;transition:all 0.2s;';
    qb.onmouseover = function() { this.style.borderColor = '#8b5cf6'; this.style.color = '#c4b5fd'; this.style.background = '#1e1b4b'; };
    qb.onmouseout = function() { this.style.borderColor = '#334155'; this.style.color = '#94a3b8'; this.style.background = '#1e293b'; };
    qb.onclick = function() { processInput(b.v); };
    quickRow.appendChild(qb);
  });

  // ── Input row ──
  var inputRow = document.createElement('div');
  inputRow.style.cssText = 'padding:10px 12px;border-top:1px solid #1e293b;display:flex;gap:8px;flex-shrink:0;background:#090e18;';

  var inp = document.createElement('input');
  inp.id = 'iagb-input';
  inp.placeholder = isFr() ? 'Posez une question...' : 'Ask a question...';
  inp.style.cssText = 'flex:1;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:9px 13px;border-radius:10px;font-size:11.5px;outline:none;transition:border-color 0.2s;font-family:inherit;';
  inp.onfocus = function() { this.style.borderColor = '#8b5cf6'; };
  inp.onblur = function() { this.style.borderColor = '#334155'; };
  inp.onkeydown = function(e) { if (e.key === 'Enter') { processInput(this.value); this.value = ''; } };

  var sendBtn = document.createElement('button');
  sendBtn.innerHTML = '➤';
  sendBtn.style.cssText = 'background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border:none;width:38px;height:38px;border-radius:10px;cursor:pointer;font-size:15px;transition:all 0.2s;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
  sendBtn.onmouseover = function() { this.style.transform = 'scale(1.1)'; };
  sendBtn.onmouseout = function() { this.style.transform = 'scale(1)'; };
  sendBtn.onclick = function() { processInput(inp.value); inp.value = ''; };

  inputRow.appendChild(inp);
  inputRow.appendChild(sendBtn);

  panel.appendChild(panelHdr);
  panel.appendChild(chatBody);
  panel.appendChild(quickRow);
  panel.appendChild(inputRow);

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  // ── Inject CSS animations ──
  var style = document.createElement('style');
  style.innerHTML = [
    '@keyframes iagbPulse {',
    '  0%,100% { box-shadow:0 8px 30px rgba(139,92,246,0.6),0 0 0 0 rgba(139,92,246,0.4); }',
    '  50% { box-shadow:0 8px 30px rgba(139,92,246,0.8),0 0 0 12px rgba(139,92,246,0); }',
    '}',
    '@keyframes iagbShimmer {',
    '  0% { left:-100%; }',
    '  50%,100% { left:200%; }',
    '}',
    '#iagb-body::-webkit-scrollbar { width:4px; }',
    '#iagb-body::-webkit-scrollbar-track { background:#0f172a; }',
    '#iagb-body::-webkit-scrollbar-thumb { background:#4c1d95;border-radius:2px; }',
    '#iagb-fab:hover { transform:scale(1.12) rotate(5deg) !important; }',
    '#iagb-clear-btn:hover { background:rgba(239,68,68,0.3) !important; color:#fca5a5 !important; }'
  ].join('\n');
  document.head.appendChild(style);

  // ── Wire up header buttons ──
  fab.onclick = function() { toggleBot(); };

  setTimeout(function() {
    var tourBtn = document.getElementById('iagb-tour-btn');
    var clearBtn = document.getElementById('iagb-clear-btn');
    if (tourBtn) tourBtn.onclick = function() { TOUR_ACTIVE = true; TOUR_STEP = 0; processInput('tour'); };
    if (clearBtn) clearBtn.onclick = function() { CHAT_HISTORY = []; TOUR_ACTIVE = false; TOUR_STEP = 0; refreshChat(); };
  }, 100);

  // Trigger welcome tour for new visitors
  triggerWelcomeTour();
}

// ─── Init ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(buildBot, 800);
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(buildBot, 800);
}

window.IAGuideBot = { toggle: toggleBot, ask: processInput, resetTour: function() { localStorage.removeItem('iagb_tour_done'); } };

})();
