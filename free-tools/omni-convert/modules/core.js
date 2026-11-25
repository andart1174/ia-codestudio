// OmniConvert Pro 2.0 — Core Framework, Unified i18n, Toast, History, Autosave, ZIP, Share & Premium Helpers
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});

  // ---------------------------------------------------------------------------
  // 1. Unified State & Storage Keys
  // ---------------------------------------------------------------------------
  const STORAGE = {
    LANG: 'hub_lang',
    THEME: 'omniconvert_theme',
    FAVORITES: 'omniconvert_favorites',
    HISTORY: 'omniconvert_history',
    AUTOSAVE: 'omniconvert_autosave_v2',
    SNIPPETS: 'omniconvert_pro_snippets',
    RECIPES: 'omniconvert_pipes_v2',
  };

  Omni.STORAGE = STORAGE;
  Omni.state = {
    lang: 'en',
    theme: 'cyber',
    activeTab: 'playground',
    activeUtilSubtab: 'text-tools',
    favorites: ['playground', 'serialize', 'base64', 'qrcode', 'omnipipe'],
    history: [],
    lastToastTimeout: null,
  };

  // ---------------------------------------------------------------------------
  // 2. Unified Translations Dictionary (100% EN + FR coverage)
  // ---------------------------------------------------------------------------
  const I18N = {
    en: {
      appTag: 'Ultimate Offline Dev Workstation',
      statusActive: '100% Offline Engine',
      backToSite: 'Back to Hub',
      cmdPaletteHint: 'Search tools or Magic Paste...',
      magicPasteBtn: 'Magic Paste',
      themeCyber: 'Cyber Dark',
      themeMidnight: 'Midnight',
      themeLight: 'Clean Light',
      historyTitle: 'History',
      panicWipe: 'Wipe Local Data',
      panicWipeConfirm: 'Clear all saved inputs, history, and preferences? (Snippets are kept unless confirmed.)',
      panicWipeDone: 'All local session data wiped!',
      outputDefaultTitle: 'Live Preview / Output',
      copyOutput: 'Copy Output',
      sendTo: 'Send Output to...',
      copied: 'Copied to clipboard!',
      errorPrefix: 'Error: ',
      noData: 'Please enter input data first.',

      // Sidebar Categories
      catPinned: 'Pinned',
      catCode: 'Code & Live',
      catData: 'Data & API',
      catSecurity: 'Security & Crypto',
      catDesign: 'Visual & CSS Lab',
      catDev: 'Dev Utilities',

      // Tab Names
      tab_playground: 'Playground 2.0',
      tab_omnipipe: 'OmniPipe Chains',
      tab_serialize: 'JSON / XML / YAML / CSV',
      tab_codegen: 'JSON → Code & Schema',
      tab_base64: 'Base64 Studio',
      tab_minify: 'Minify & Obfuscate',
      tab_http: 'cURL & URL Studio',
      tab_qrcode: 'QR Studio 2.0',
      tab_hash: 'Crypto & Hash Vault',
      tab_jwt: 'JWT Studio',
      tab_colors: 'Colors & WCAG Lab',
      tab_gradient: 'Gradient & Mesh Lab',
      tab_shadow: 'Shadow & Glass Lab',
      tab_svg: 'SVG Optimizer',
      tab_regex: 'Regex Lab',
      tab_diff: 'Diff Studio',
      tab_utilities: 'Dev Utilities & Cron',
      tab_snippets: 'Snippet Manager',

      // Playground
      pgTemplates: 'Templates',
      pgWatermark: 'Include "Built with IA Code Studio" badge',
      pgCopyHtml: 'Copy HTML',
      pgDownloadHtml: 'Download HTML',
      pgDownloadZip: 'Export ZIP',
      pgShareUrl: 'Share Link',
      pgConsole: 'Console Output',
      pgClear: 'Clear',
      pgRun: 'Run (Ctrl+Enter)',
      pgCopiedHtml: 'Combined HTML copied!',
      pgDownloadedHtml: 'HTML file downloaded!',
      pgDownloadedZip: 'Project ZIP downloaded!',
      pgShareCopied: 'Serverless share URL copied to clipboard!',
      pgShareLoaded: 'Shared Playground restored from URL!',

      // Base64
      b64TextTitle: 'Base64 Text & Base64URL',
      b64Encode: 'Encode',
      b64Decode: 'Decode',
      b64UrlSafe: 'Base64URL (URL-safe, no padding)',
      b64FileTitle: 'File / Media to Base64',
      b64Drop: 'Drag & drop any file (image, audio, video, PDF, binary) or click to browse',
      b64FileName: 'File Name',
      b64FileType: 'MIME Type',
      b64FileSize: 'Size',
      b64Download: 'Download Decoded File',
      b64MediaPreview: 'Media Preview',
      b64EmbedTitle: 'Embed & Data URI',
      b64NoMedia: 'No media decoded yet',
      b64Invalid: 'Invalid Base64 input!',

      // Serialize & Data
      serTitle: 'Data Converter & Explorer (JSON / XML / YAML / CSV)',
      serFormat: 'Format / Beautify',
      serMinify: 'Minify',
      serViewRaw: 'Raw Output',
      serViewTree: 'JSON Tree',
      serViewTable: 'Table View',
      serConverted: 'Converted successfully!',
      serPathCopied: 'JSONPath copied: ',

      // Codegen
      cgTitle: 'JSON → Types, Schemas & SQL Generator',
      cgDesc: 'Paste any JSON payload to instantly generate TypeScript interfaces, Zod schemas, JSON Schema, SQL tables, Python Pydantic models, or Go structs.',
      cgRootName: 'Root Type Name',
      cgGenerate: 'Generate Code',

      // Minify & Obfuscate
      minTitle: 'Tokenizer Minifier & JS Obfuscator',
      minLang: 'Language',
      minBtn: 'Minify Code',
      minObfBtn: 'Obfuscate JS',
      minDone: 'Code minified successfully!',
      minObfDone: 'JavaScript obfuscated safely!',

      // HTTP & cURL
      httpTitle: 'cURL Translator & URL Query Builder',
      httpCurlTab: 'cURL → Code',
      httpUrlTab: 'URL Inspector',
      httpConvert: 'Translate cURL',
      httpAddParam: 'Add Query Param',

      // QR Studio
      qrTitle: 'QR Code Studio 2.0 (ISO/IEC 18004 v1–v40)',
      qrDesc: '100% offline ISO-compliant QR generator with UTF-8, automatic version sizing, 4-module quiet zone, smart templates, custom styling, logo overlay, SVG export & offline image scanner.',
      qrModeText: 'Text / URL',
      qrModeWifi: 'Wi-Fi',
      qrModeVcard: 'vCard',
      qrModeEmail: 'Email',
      qrModeEvent: 'Calendar',
      qrModeScan: 'Scan Image',
      qrSize: 'Size (px)',
      qrEcc: 'Error Correction',
      qrStyle: 'Module Style',
      qrFg: 'Foreground',
      qrFg2: 'Gradient Color 2 (Optional)',
      qrBg: 'Background',
      qrLogo: 'Center Logo (auto ECC High)',
      qrGenBtn: 'Generate QR Code',
      qrDlPng: 'Download PNG',
      qrDlSvg: 'Download SVG',
      qrCopyImg: 'Copy PNG',
      qrNoQr: 'Generate a QR code to preview here',

      // Hash & Crypto Vault
      hashSubHash: 'Hashes & Checksum',
      hashSubAes: 'AES-256-GCM Vault',
      hashSubCert: 'PEM Cert & Keys',
      hashTitle: 'Cryptographic Hash & File Checksum Verifier',
      hashDesc: 'Compute MD5, SHA-1, SHA-256, SHA-384, SHA-512 & HMAC offline — works on text AND dropped files even over file://.',
      hashExpected: 'Verify against expected hash (optional)...',
      hashMatch: 'CHECKSUM MATCH',
      hashMismatch: 'CHECKSUM MISMATCH',
      hashDropFile: 'Drop any file here to compute its checksums locally',
      aesTitle: 'Client-Side AES-256-GCM Encryption (PBKDF2)',
      aesEncrypt: 'Encrypt',
      aesDecrypt: 'Decrypt',
      certTitle: 'X.509 PEM Certificate Inspector & Keypair Generator',
      certParse: 'Inspect PEM Certificate',
      certGenKeys: 'Generate Keypair',

      // JWT
      jwtTitle: 'Offline JWT Inspector, Verifier & Signer',
      jwtDesc: 'Paste any JWT (with or without "Bearer ") for live decoding, expiration checks, HMAC signature verification, or sign new test tokens offline.',
      jwtVerifyBtn: 'Verify Signature',
      jwtSignBtn: 'Sign New JWT',
      jwtHeader: 'Header',
      jwtPayload: 'Payload & Claims',
      jwtSignature: 'Signature & Verification',
      jwtValid: 'TOKEN ACTIVE',
      jwtExpired: 'TOKEN EXPIRED',
      jwtNotYet: 'NOT YET VALID (nbf)',

      // Colors & WCAG
      colTitle: 'Color Studio, OKLCH & WCAG Contrast Lab',
      colDesc: 'Enter HEX (with/without #), RGB, HSL, or OKLCH. Inspect Tailwind 50–950 shades, WCAG 2.1 contrast ratios, and colorblind simulations.',
      colContrastTitle: 'WCAG 2.1 Contrast Checker',
      colAutoFix: 'Auto-Fix Contrast (AA)',
      colShadesTitle: 'Tailwind 50–950 Shade Scale',
      colBlindTitle: 'Colorblind Simulation',

      // Gradient & Mesh
      gradTitle: 'CSS Gradient & Mesh Studio',
      gradType: 'Type',
      gradAngle: 'Angle (deg)',
      gradStops: 'Color Stops',
      gradAddStop: 'Add Stop',
      gradReverse: 'Reverse',
      gradRandom: 'Randomize',
      gradPresets: 'Presets',
      gradDlPng: 'Export PNG',

      // Shadow & Glass
      shTitle: 'Multi-Layer Shadow & Glassmorphism Lab',
      shBox: 'Box Shadow',
      shText: 'Text Shadow',
      shDrop: 'Drop Shadow',
      shGlass: 'Glassmorphism',
      shAddLayer: 'Add Shadow Layer',
      shPresets: 'Design Presets',

      // SVG Optimizer
      svgTitle: 'SVG Optimizer & React JSX / CSS Converter',
      svgDesc: 'Clean comments, editor metadata, and redundant decimals offline. Export optimized SVG, React JSX component, or CSS Data URI.',
      svgOptimize: 'Optimize SVG',
      svgDrop: 'Drop an .svg file here or paste SVG markup below',

      // Regex
      rgxTitle: 'Live Regex Lab, Capture Groups & Replace',
      rgxDesc: 'Test patterns in real time with exact flag control, capture group extraction, find & replace preview, and ReDoS timeout protection.',
      rgxMatches: 'matches',
      rgxMatch: 'match',
      rgxNoMatches: '0 matches',
      rgxPresets: 'Quick Presets',
      rgxReplaceLabel: 'Replace Template (supports $1, $&, $<name>)',

      // Diff
      difTitle: 'Myers Text Diff Studio',
      difDesc: 'Compare two text/code blocks with CRLF normalization, line numbers, inline word-level highlights, and Unified or Side-by-Side view.',
      difOriginal: 'Original',
      difModified: 'Modified',
      difCompare: 'Compare',
      difSwap: 'Swap',
      difIgnoreWs: 'Ignore Whitespace',
      difSideBySide: 'Side-by-Side',
      difAdditions: 'additions',
      difDeletions: 'deletions',

      // Utilities & Cron
      utilText: 'Text & Markdown',
      utilGen: 'Generators',
      utilTime: 'Timestamp',
      utilCron: 'Cron Builder',
      utilBase: 'Base & Bitwise',
      utilUrlEnc: 'URL Encode',
      utilUrlDec: 'URL Decode',
      utilHtmlEsc: 'HTML Escape',
      utilHtmlUnesc: 'HTML Unescape',
      utilMarkdown: 'Render GFM Markdown',
      utilCaseTitle: 'Case Converters',

      // Snippets
      snipTitle: 'Code Snippet Vault 2.0',
      snipSave: 'Save Snippet',
      snipUpdate: 'Update Snippet',
      snipCancelEdit: 'Cancel Edit',
      snipSavedList: 'Saved Snippets',
      snipExport: 'Export JSON',
      snipImport: 'Import JSON',

      // OmniPipe
      pipeTitle: 'OmniPipe — Visual Chained Pipelines',
      pipeDesc: 'Chain multiple transformations sequentially (e.g. Base64 Decode → JSON Format → YAML) and run them in one click. Save or share custom recipes!',
      pipeAddStep: 'Add Transformation Step',
      pipeRun: 'Run Pipeline',
      pipeSave: 'Save Recipe',
      pipeShare: 'Share Recipe URL',
      pipePresets: 'Built-in Recipes',

      // Premium Modal
      proModalTitle: 'Unlock OmniConvert PRO',
      proModalDesc: 'Upgrade to IA Code Studio Premium for white-label Playground exports (no badge), 4K/SVG branded QR codes, and priority updates.',
      proModalCta: 'Go Premium ⚡',
      proModalCancel: 'Continue Free',
    },
    fr: {
      appTag: 'Station Dev Hors Ligne Ultime',
      statusActive: 'Moteur 100% Hors Ligne',
      backToSite: 'Retour au Hub',
      cmdPaletteHint: 'Rechercher un outil ou Magic Paste...',
      magicPasteBtn: 'Magic Paste',
      themeCyber: 'Cyber Sombre',
      themeMidnight: 'Minuit',
      themeLight: 'Clair Propre',
      historyTitle: 'Historique',
      panicWipe: 'Effacer Données Locales',
      panicWipeConfirm: 'Effacer les entrées sauvegardées, l\'historique et les préférences ? (Les snippets sont conservés.)',
      panicWipeDone: 'Données de session locales effacées !',
      outputDefaultTitle: 'Aperçu en Direct / Sortie',
      copyOutput: 'Copier la Sortie',
      sendTo: 'Envoyer vers...',
      copied: 'Copié dans le presse-papiers !',
      errorPrefix: 'Erreur : ',
      noData: 'Veuillez d\'abord saisir des données.',

      catPinned: 'Épinglés',
      catCode: 'Code & Live',
      catData: 'Données & API',
      catSecurity: 'Sécurité & Crypto',
      catDesign: 'Lab Visuel & CSS',
      catDev: 'Utilitaires Dev',

      tab_playground: 'Playground 2.0',
      tab_omnipipe: 'Chaînes OmniPipe',
      tab_serialize: 'JSON / XML / YAML / CSV',
      tab_codegen: 'JSON → Code & Schéma',
      tab_base64: 'Studio Base64',
      tab_minify: 'Minifier & Offusquer',
      tab_http: 'Studio cURL & URL',
      tab_qrcode: 'Studio QR 2.0',
      tab_hash: 'Coffre Crypto & Hash',
      tab_jwt: 'Studio JWT',
      tab_colors: 'Couleurs & WCAG',
      tab_gradient: 'Dégradés & Mesh',
      tab_shadow: 'Ombres & Verre',
      tab_svg: 'Optimiseur SVG',
      tab_regex: 'Lab Regex',
      tab_diff: 'Studio Diff',
      tab_utilities: 'Utilitaires & Cron',
      tab_snippets: 'Gestionnaire Snippets',

      pgTemplates: 'Modèles',
      pgWatermark: 'Inclure le badge "Built with IA Code Studio"',
      pgCopyHtml: 'Copier HTML',
      pgDownloadHtml: 'Télécharger HTML',
      pgDownloadZip: 'Exporter ZIP',
      pgShareUrl: 'Lien Partage',
      pgConsole: 'Console Virtuelle',
      pgClear: 'Vider',
      pgRun: 'Exécuter (Ctrl+Entrée)',
      pgCopiedHtml: 'Code HTML combiné copié !',
      pgDownloadedHtml: 'Fichier HTML téléchargé !',
      pgDownloadedZip: 'Archive ZIP du projet téléchargée !',
      pgShareCopied: 'Lien de partage sans serveur copié !',
      pgShareLoaded: 'Playground partagé restauré depuis l\'URL !',

      b64TextTitle: 'Texte Base64 & Base64URL',
      b64Encode: 'Encoder',
      b64Decode: 'Décoder',
      b64UrlSafe: 'Base64URL (URL-safe, sans padding)',
      b64FileTitle: 'Fichier / Média vers Base64',
      b64Drop: 'Glissez-déposez un fichier (image, audio, vidéo, PDF, binaire) ou cliquez',
      b64FileName: 'Nom du fichier',
      b64FileType: 'Type MIME',
      b64FileSize: 'Taille',
      b64Download: 'Télécharger le Fichier Décodé',
      b64MediaPreview: 'Aperçu Média',
      b64EmbedTitle: 'Intégration & Data URI',
      b64NoMedia: 'Aucun média décodé pour le moment',
      b64Invalid: 'Format Base64 invalide !',

      serTitle: 'Convertisseur & Explorateur (JSON / XML / YAML / CSV)',
      serFormat: 'Formater / Embellir',
      serMinify: 'Minifier',
      serViewRaw: 'Code Brut',
      serViewTree: 'Arbre JSON',
      serViewTable: 'Vue Tableau',
      serConverted: 'Converti avec succès !',
      serPathCopied: 'JSONPath copié : ',

      cgTitle: 'Générateur JSON → Types, Schémas & SQL',
      cgDesc: 'Collez un JSON pour générer instantanément des interfaces TypeScript, schémas Zod, JSON Schema, tables SQL, modèles Pydantic ou structs Go.',
      cgRootName: 'Nom du Type Racine',
      cgGenerate: 'Générer le Code',

      minTitle: 'Minificateur Tokenizer & Offuscateur JS',
      minLang: 'Langage',
      minBtn: 'Minifier le Code',
      minObfBtn: 'Offusquer le JS',
      minDone: 'Code minifié avec succès !',
      minObfDone: 'JavaScript offusqué en toute sécurité !',

      httpTitle: 'Traducteur cURL & Inspecteur URL',
      httpCurlTab: 'cURL → Code',
      httpUrlTab: 'Inspecteur URL',
      httpConvert: 'Traduire cURL',
      httpAddParam: 'Ajouter un paramètre',

      qrTitle: 'Studio QR Code 2.0 (ISO/IEC 18004 v1–v40)',
      qrDesc: 'Générateur QR ISO 100% hors ligne avec UTF-8, version auto, zone de silence 4 modules, modèles intelligents, logo central, export SVG et lecteur d\'image.',
      qrModeText: 'Texte / URL',
      qrModeWifi: 'Wi-Fi',
      qrModeVcard: 'vCard',
      qrModeEmail: 'E-mail',
      qrModeEvent: 'Calendrier',
      qrModeScan: 'Scanner Image',
      qrSize: 'Taille (px)',
      qrEcc: 'Correction d\'Erreurs',
      qrStyle: 'Style des Modules',
      qrFg: 'Avant-plan',
      qrFg2: 'Dégradé Couleur 2 (Optionnel)',
      qrBg: 'Arrière-plan',
      qrLogo: 'Logo Central (ECC Haut auto)',
      qrGenBtn: 'Générer le QR Code',
      qrDlPng: 'Télécharger PNG',
      qrDlSvg: 'Télécharger SVG',
      qrCopyImg: 'Copier PNG',
      qrNoQr: 'Générez un QR Code pour voir l\'aperçu ici',

      hashSubHash: 'Hash & Checksum',
      hashSubAes: 'Coffre AES-256-GCM',
      hashSubCert: 'Certificat PEM & Clés',
      hashTitle: 'Hachage Cryptographique & Vérificateur de Fichiers',
      hashDesc: 'Calculez MD5, SHA-1, SHA-256, SHA-384, SHA-512 et HMAC hors ligne — sur texte ET fichiers déposés.',
      hashExpected: 'Vérifier contre un hash attendu (optionnel)...',
      hashMatch: 'EMPREINTE IDENTIQUE',
      hashMismatch: 'EMPREINTE DIFFÉRENTE',
      hashDropFile: 'Déposez un fichier ici pour calculer ses empreintes localement',
      aesTitle: 'Chiffrement Client AES-256-GCM (PBKDF2)',
      aesEncrypt: 'Chiffrer',
      aesDecrypt: 'Déchiffrer',
      certTitle: 'Inspecteur Certificat X.509 PEM & Générateur de Clés',
      certParse: 'Inspecter le Certificat PEM',
      certGenKeys: 'Générer Paire de Clés',

      jwtTitle: 'Studio JWT Hors Ligne (Décodeur, Vérificateur & Signataire)',
      jwtDesc: 'Collez un JWT (avec ou sans "Bearer ") pour décodage en direct, contrôle d\'expiration, vérification HMAC ou signature de jetons de test.',
      jwtVerifyBtn: 'Vérifier la Signature',
      jwtSignBtn: 'Signer un Nouveau JWT',
      jwtHeader: 'En-tête (Header)',
      jwtPayload: 'Charge Utile (Payload)',
      jwtSignature: 'Signature & Vérification',
      jwtValid: 'JETON ACTIF',
      jwtExpired: 'JETON EXPIRÉ',
      jwtNotYet: 'PAS ENCORE VALIDE (nbf)',

      colTitle: 'Studio Couleurs, OKLCH & Contraste WCAG',
      colDesc: 'Saisissez HEX (avec/sans #), RGB, HSL ou OKLCH. Explorez la palette Tailwind 50–950, les ratios WCAG 2.1 et la simulation de daltonisme.',
      colContrastTitle: 'Vérificateur de Contraste WCAG 2.1',
      colAutoFix: 'Corriger le Contraste (AA)',
      colShadesTitle: 'Nuancier Tailwind 50–950',
      colBlindTitle: 'Simulation Daltonisme',

      gradTitle: 'Studio Dégradés CSS & Mesh',
      gradType: 'Type',
      gradAngle: 'Angle (deg)',
      gradStops: 'Points de Couleur',
      gradAddStop: 'Ajouter un Point',
      gradReverse: 'Inverser',
      gradRandom: 'Aléatoire',
      gradPresets: 'Préréglages',
      gradDlPng: 'Exporter PNG',

      shTitle: 'Lab Ombres Multi-Couches & Glassmorphism',
      shBox: 'Ombre de Boîte',
      shText: 'Ombre de Texte',
      shDrop: 'Drop Shadow',
      shGlass: 'Glassmorphism',
      shAddLayer: 'Ajouter une Couche',
      shPresets: 'Préréglages Design',

      svgTitle: 'Optimiseur SVG & Convertisseur JSX / CSS',
      svgDesc: 'Nettoyez commentaires, métadonnées et décimales inutiles hors ligne. Exportez en SVG optimisé, composant React JSX ou Data URI CSS.',
      svgOptimize: 'Optimiser le SVG',
      svgDrop: 'Déposez un fichier .svg ici ou collez le code SVG ci-dessous',

      rgxTitle: 'Lab Regex en Direct, Groupes & Remplacement',
      rgxDesc: 'Testez vos motifs en temps réel avec contrôle exact des drapeaux, extraction des groupes de capture, aperçu Remplacer et protection anti-ReDoS.',
      rgxMatches: 'correspondances',
      rgxMatch: 'correspondance',
      rgxNoMatches: '0 correspondance',
      rgxPresets: 'Modèles Rapides',
      rgxReplaceLabel: 'Modèle de Remplacement ($1, $&, $<nom>)',

      difTitle: 'Studio Diff Myers',
      difDesc: 'Comparez deux blocs avec normalisation CRLF, numéros de lignes, surlignage mot-à-mot et vue Unifiée ou Côte-à-Côte.',
      difOriginal: 'Original',
      difModified: 'Modifié',
      difCompare: 'Comparer',
      difSwap: 'Inverser',
      difIgnoreWs: 'Ignorer Espaces',
      difSideBySide: 'Côte-à-Côte',
      difAdditions: 'ajouts',
      difDeletions: 'suppressions',

      utilText: 'Texte & Markdown',
      utilGen: 'Générateurs',
      utilTime: 'Horodatage',
      utilCron: 'Constructeur Cron',
      utilBase: 'Bases & Binaire',
      utilUrlEnc: 'Encoder URL',
      utilUrlDec: 'Décoder URL',
      utilHtmlEsc: 'Échapper HTML',
      utilHtmlUnesc: 'Déséchapper HTML',
      utilMarkdown: 'Rendre Markdown GFM',
      utilCaseTitle: 'Convertisseurs de Casse',

      snipTitle: 'Coffre à Snippets 2.0',
      snipSave: 'Enregistrer',
      snipUpdate: 'Mettre à jour',
      snipCancelEdit: 'Annuler',
      snipSavedList: 'Snippets Enregistrés',
      snipExport: 'Exporter JSON',
      snipImport: 'Importer JSON',

      pipeTitle: 'OmniPipe — Pipelines Visuels Chaînés',
      pipeDesc: 'Chaînez plusieurs transformations (ex: Décodage Base64 → Format JSON → YAML) et exécutez-les en 1 clic. Enregistrez ou partagez vos recettes !',
      pipeAddStep: 'Ajouter une Étape',
      pipeRun: 'Exécuter le Pipeline',
      pipeSave: 'Enregistrer Recette',
      pipeShare: 'Partager URL Recette',
      pipePresets: 'Recettes Prêtes',

      proModalTitle: 'Débloquer OmniConvert PRO',
      proModalDesc: 'Passez à IA Code Studio Premium pour exporter sans filigrane, générer des QR Codes SVG/4K avec logo et profiter des mises à jour prioritaires.',
      proModalCta: 'Passer au Premium ⚡',
      proModalCancel: 'Continuer Gratuitement',
    },
  };

  Omni.I18N = I18N;

  Omni.t = function (key, fallback) {
    const dict = I18N[Omni.state.lang] || I18N.en;
    return dict[key] !== undefined ? dict[key] : (I18N.en[key] !== undefined ? I18N.en[key] : (fallback || key));
  };

  Omni.initLanguage = function () {
    const params = new URLSearchParams(global.location ? global.location.search : '');
    const urlLang = params.get('lang');
    let lang = 'en';
    if (urlLang === 'fr' || urlLang === 'en') {
      lang = urlLang;
    } else {
      try {
        const saved = localStorage.getItem(STORAGE.LANG);
        if (saved === 'fr' || saved === 'en') lang = saved;
        else if (navigator.language && navigator.language.toLowerCase().startsWith('fr')) lang = 'fr';
      } catch (_) {}
    }
    Omni.setLanguage(lang, false);
  };

  const langListeners = [];
  Omni.onLangChange = function (fn) {
    langListeners.push(fn);
  };

  Omni.setLanguage = function (lang, persist = true) {
    Omni.state.lang = lang === 'fr' ? 'fr' : 'en';
    if (persist) {
      try { localStorage.setItem(STORAGE.LANG, Omni.state.lang); } catch (_) {}
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = Omni.state.lang;
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const val = Omni.t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      });
      document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.title = Omni.t(el.getAttribute('data-i18n-title'));
        el.setAttribute('aria-label', el.title);
      });
      const langBtn = document.getElementById('btn-lang');
      if (langBtn) {
        langBtn.textContent = Omni.state.lang === 'en' ? 'EN / FR' : 'FR / EN';
        langBtn.setAttribute('aria-label', Omni.state.lang === 'en' ? 'Switch to French' : 'Passer en Anglais');
      }
    }
    langListeners.forEach((fn) => {
      try { fn(Omni.state.lang); } catch (_) {}
    });
  };

  // ---------------------------------------------------------------------------
  // 3. Toast Notification System (Always mounted & accessible)
  // ---------------------------------------------------------------------------
  Omni.showToast = function (message, type = 'info') {
    if (typeof document === 'undefined') return;
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.className = `toast-${type}`;
    toast.textContent = message;
    // Force reflow for re-trigger animation
    void toast.offsetWidth;
    toast.classList.add('show');

    if (Omni.state.lastToastTimeout) clearTimeout(Omni.state.lastToastTimeout);
    Omni.state.lastToastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // ---------------------------------------------------------------------------
  // 4. Safe Clipboard Helper (with textarea fallback for file:// / restricted ctx)
  // ---------------------------------------------------------------------------
  Omni.copyText = async function (text, successMsg) {
    if (!text) return false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Fallback');
      }
      Omni.showToast(successMsg || Omni.t('copied'), 'success');
      return true;
    } catch (_) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        Omni.showToast(successMsg || Omni.t('copied'), 'success');
        return true;
      } catch (err) {
        Omni.showToast(Omni.t('errorPrefix') + err.message, 'error');
        return false;
      }
    }
  };

  // ---------------------------------------------------------------------------
  // 5. File Download Helper
  // ---------------------------------------------------------------------------
  Omni.downloadBlob = function (blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  Omni.downloadText = function (text, filename, mime = 'text/plain;charset=utf-8') {
    Omni.downloadBlob(new Blob([text], { type: mime }), filename);
  };

  // ---------------------------------------------------------------------------
  // 6. Pure-JS Client-Side ZIP Archive Builder (RFC 1952 / Store mode, 0 deps)
  // ---------------------------------------------------------------------------
  const CRC_TABLE = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    CRC_TABLE[i] = c >>> 0;
  }
  function crc32(bytes) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  Omni.createZipBlob = function (files) {
    // files: Array<{ name: string, content: string | Uint8Array }>
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    for (const file of files) {
      const nameBytes = encoder.encode(file.name);
      const dataBytes = file.content instanceof Uint8Array ? file.content : encoder.encode(String(file.content));
      const crc = crc32(dataBytes);
      const size = dataBytes.length;

      // Local File Header (30 bytes + name)
      const lh = new ArrayBuffer(30);
      const lv = new DataView(lh);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true); // UTF-8 flag
      lv.setUint16(8, 0, true); // Store
      lv.setUint16(10, 0, true);
      lv.setUint16(12, 0x5421, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, size, true);
      lv.setUint32(22, size, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);

      localParts.push(new Uint8Array(lh), nameBytes, dataBytes);

      // Central Directory Header (46 bytes + name)
      const ch = new ArrayBuffer(46);
      const cv = new DataView(ch);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 0x5421, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, size, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, offset, true);

      centralParts.push(new Uint8Array(ch), nameBytes);
      offset += 30 + nameBytes.length + size;
    }

    const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
    const eocd = new ArrayBuffer(22);
    const ev = new DataView(eocd);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    ev.setUint16(20, 0, true);

    return new Blob([...localParts, ...centralParts, new Uint8Array(eocd)], { type: 'application/zip' });
  };

  // ---------------------------------------------------------------------------
  // 7. Serverless Gzip + Base64URL Share Encoder / Decoder
  // ---------------------------------------------------------------------------
  function bytesToBase64Url(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlToBytes(b64url) {
    let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  Omni.encodeSharePayload = async function (obj) {
    const raw = new TextEncoder().encode(JSON.stringify(obj));
    if (typeof CompressionStream === 'function') {
      const cs = new CompressionStream('gzip');
      const writer = cs.writable.getWriter();
      writer.write(raw);
      writer.close();
      const compressed = new Uint8Array(await new Response(cs.readable).arrayBuffer());
      return 'gz_' + bytesToBase64Url(compressed);
    }
    return 'raw_' + bytesToBase64Url(raw);
  };

  Omni.decodeSharePayload = async function (encoded) {
    if (encoded.startsWith('gz_') && typeof DecompressionStream === 'function') {
      const bytes = base64UrlToBytes(encoded.slice(3));
      const ds = new DecompressionStream('gzip');
      const writer = ds.writable.getWriter();
      writer.write(bytes);
      writer.close();
      const raw = new Uint8Array(await new Response(ds.readable).arrayBuffer());
      return JSON.parse(new TextDecoder().decode(raw));
    }
    const clean = encoded.startsWith('raw_') ? encoded.slice(4) : encoded;
    return JSON.parse(new TextDecoder().decode(base64UrlToBytes(clean)));
  };

  // ---------------------------------------------------------------------------
  // 8. Conversion History & Session Autosave
  // ---------------------------------------------------------------------------
  Omni.loadHistory = function () {
    try {
      const raw = localStorage.getItem(STORAGE.HISTORY);
      Omni.state.history = raw ? JSON.parse(raw) : [];
    } catch (_) {
      Omni.state.history = [];
    }
    return Omni.state.history;
  };

  Omni.addHistory = function (toolId, summary, outputPreview) {
    if (!outputPreview) return;
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      tool: toolId,
      summary: String(summary).slice(0, 60),
      output: String(outputPreview).slice(0, 4000),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    Omni.state.history.unshift(item);
    if (Omni.state.history.length > 25) Omni.state.history.length = 25;
    try { localStorage.setItem(STORAGE.HISTORY, JSON.stringify(Omni.state.history)); } catch (_) {}
    if (typeof Omni.renderHistoryBadge === 'function') Omni.renderHistoryBadge();
  };

  let autosaveTimer = null;
  Omni.scheduleAutosave = function (key, value) {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      try {
        const current = JSON.parse(localStorage.getItem(STORAGE.AUTOSAVE) || '{}');
        current[key] = typeof value === 'string' ? value.slice(0, 100000) : value;
        localStorage.setItem(STORAGE.AUTOSAVE, JSON.stringify(current));
      } catch (_) {}
    }, 500);
  };

  Omni.getAutosave = function (key) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE.AUTOSAVE) || '{}');
      return current[key];
    } catch (_) {
      return undefined;
    }
  };

  Omni.panicWipe = function () {
    try {
      localStorage.removeItem(STORAGE.HISTORY);
      localStorage.removeItem(STORAGE.AUTOSAVE);
      Omni.state.history = [];
    } catch (_) {}
    Omni.showToast(Omni.t('panicWipeDone'), 'success');
  };

  // ---------------------------------------------------------------------------
  // 9. Clean Premium Check & Modal (aligned with IA Code Studio Hub)
  // ---------------------------------------------------------------------------
  Omni.checkIsPremium = function () {
    try {
      const session = localStorage.getItem('genius_session');
      if (session) {
        const user = JSON.parse(session);
        const email = (user.email || '').toLowerCase();
        const list = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        const record = list.find((p) => (p.email || '').toLowerCase() === email);
        if (record) {
          const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
          if (record.days === 9999 || expiry > Date.now()) return true;
        }
      }
    } catch (_) {}
    try {
      const subDate = localStorage.getItem('ia_premium_sub_date');
      if (subDate) {
        const daysPassed = Math.floor((Date.now() - parseInt(subDate, 10)) / 86400000);
        if (30 - daysPassed > 0) return true;
      }
    } catch (_) {}
    return false;
  };

  Omni.openPremiumModal = function () {
    const modal = document.getElementById('pro-modal');
    if (modal) modal.classList.add('open');
  };

  Omni.closePremiumModal = function () {
    const modal = document.getElementById('pro-modal');
    if (modal) modal.classList.remove('open');
  };

  // ---------------------------------------------------------------------------
  // 10. HTML Escape Utility
  // ---------------------------------------------------------------------------
  Omni.escapeHTML = function (str) {
    return String(str).replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[tag] || tag));
  };

  // ---------------------------------------------------------------------------
  // 11. Universal Output Router ("Send Output To...")
  // ---------------------------------------------------------------------------
  Omni.sendToRegistry = {};
  Omni.registerSendTarget = function (tabId, labelEn, labelFr, handler) {
    Omni.sendToRegistry[tabId] = { labelEn, labelFr, handler };
  };
})(typeof window !== 'undefined' ? window : globalThis);
