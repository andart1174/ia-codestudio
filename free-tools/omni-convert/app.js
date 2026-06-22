// OmniConvert Pro DevPlayground & Code Converter - Core Engine
let currentLang = 'en';
let activeTab = 'playground';
let compileTimeout = null;
let toastTimeout = null;

const watermarkCode = `
<!-- IA Code Studio Embed Watermark (Remove by upgrading to Premium) -->
<div id="ia-code-watermark" style="position:fixed;bottom:15px;right:15px;z-index:999999;background:rgba(15,17,26,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,240,255,0.25);border-radius:30px;padding:8px 16px;box-shadow:0 4px 15px rgba(0,240,255,0.15);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:all 0.3s ease;user-select:none;" onclick="window.open('https://ia-codestudio.com','_blank')">
  <span style="color:#00f0ff;animation:pulse-glow 1.5s infinite alternate;">⚡</span>
  <span style="color:#fff;letter-spacing:0.5px;">3D Widget by <span style="background:linear-gradient(135deg,#00f0ff,#ff007f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">IA Code Studio</span></span>
</div>
<style>
  @keyframes pulse-glow {
    0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
    100% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(0,240,255,0.8)); }
  }
  #ia-code-watermark:hover {
    transform: translateY(-2px);
    border-color: #00f0ff;
    box-shadow: 0 6px 20px rgba(0,240,255,0.3);
  }
</style>
`;

function generatePlaygroundOutput() {
  const html = document.getElementById('editor-html').value;
  const css = document.getElementById('editor-css').value;
  const js = document.getElementById('editor-js').value;
  
  const isPremium = typeof checkIsPremium === 'function' ? checkIsPremium() : false;
  const includeWatermark = (document.getElementById('chk-watermark') && document.getElementById('chk-watermark').checked) || !isPremium;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OmniConvert Pro Export</title>
  <style>
    ${css.replace(/\n/g, '\n    ')}
  </style>
</head>
<body>
  ${html.replace(/\n/g, '\n  ')}
  ${includeWatermark ? watermarkCode.trim().replace(/\n/g, '\n  ') : ''}
  <script>
    ${js.replace(/\n/g, '\n    ')}
  </script>
</body>
</html>`;
}

// Translations dictionary
const translations = {
  en: {
    statusActive: "Local Engine Active",
    tabPlayground: "Playground",
    tabBase64: "Base64",
    tabSerialize: "JSON/XML/YAML",
    tabMinify: "Minify & Obfuscate",
    tabUtilities: "Utilities",
    tabHash: "Hash",
    tabColors: "Colors",
    tabRegex: "Regex",
    tabJwt: "JWT",
    tabDiff: "Diff",
    
    // Base64 tab
    b64TextTitle: "Base64 Text Mode",
    b64Encode: "Encode Text",
    b64Decode: "Decode Text",
    b64FileTitle: "Base64 File Converter",
    dropText: "Drag & drop files (images, audio, video, PDF) or click to browse",
    
    // Serialize tab
    serializeTitle: "Data Converter (JSON, XML, YAML)",
    serializeFormat: "Format / Beautify",
    serializeMinify: "Minify",
    
    // Minify tab
    minifyTitle: "Code Compressor & Obfuscator",
    minifyBtn: "Minify Code",
    obfuscateBtn: "Obfuscate JS",
    
    // Utilities tab
    utilTitle: "Web Developer Utilities",
    markdownBtn: "Render Markdown",
    
    // Hash tab
    hashTitle: "Cryptographic Hash Generator",
    hashDesc: "Generate SHA-1, SHA-256, SHA-384, SHA-512 and MD5-like hashes from any text using the browser's native Web Crypto API.",
    hashInputPlaceholder: "Type any text to hash...",
    hashBtn: "Generate All Hashes",
    
    // Colors tab
    colorTitle: "Color Converter & Palette",
    colorDesc: "Convert colors between HEX, RGB, and HSL formats. Pick a color or enter any value.",
    paletteTitle: "Generated Palette",
    
    // Regex tab
    regexTitle: "Live Regex Tester",
    regexDesc: "Write a pattern and test it in real time. Matches are highlighted instantly.",
    regexPatternPlaceholder: "([a-z]+)\\d+",
    regexFlagsPlaceholder: "gi",
    regexInputPlaceholder: "Enter test text here...\nThe quick brown fox123 jumped over the lazy dog456.",
    regexMatches: "matches",
    regexMatch: "match",
    regexNoMatches: "0 matches",
    
    // JWT tab
    jwtTitle: "JWT Token Decoder",
    jwtDesc: "Decode any JSON Web Token offline. Paste a full JWT to inspect its header, payload, and verify the signature structure.",
    jwtBtn: "Decode JWT",
    jwtHeader: "Header",
    jwtPayload: "Payload",
    jwtSig: "Signature",
    
    // Diff tab
    diffTitle: "Text Diff Viewer",
    diffDesc: "Compare two blocks of text line by line. Additions are green, removals are red.",
    diffOriginal: "Original",
    diffModified: "Modified",
    diffBtn: "Compare Texts",
    
    // Output title
    outputTitle: "Live Preview / Output",
    mediaPreview: "Media Preview",
    embedTitle: "Embed & Share Code",
    dataUri: "Data URI Code",
    htmlTag: "HTML Tag Embed",
    
    // Toasts & Messages
    toastCopied: "Copied to clipboard!",
    toastError: "Error: ",
    toastB64Invalid: "Invalid Base64 format!",
    toastJSONInvalid: "Invalid JSON format!",
    toastXMLInvalid: "Invalid XML format!",
    toastYAMLInvalid: "Invalid YAML format!",
    toastConverted: "Successfully converted!",
    toastObfuscated: "JavaScript code obfuscated!",
    toastMinified: "Code successfully minified!",
    noMedia: "No media decoded yet",
    toastB64Success: "Text encoded successfully!",
    toastB64DecSuccess: "Base64 text decoded successfully!",
    toastB64FileSuccess: "File successfully compiled to Base64!",
    toastB64UriSuccess: "Data URI loaded and visual preview rendered!",
    toastMarkdownSuccess: "Markdown compiled! Preview loaded in Playground iframe.",
    toastJwtSuccess: "JWT Decoded offline!",
    toastJwtFormatError: "Invalid JWT format (must have 3 parts separated by dots)!",
    
    // Placeholders
    b64InputPlaceholder: "Enter text to encode or Base64 to decode...",
    serializeInputPlaceholder: "{\n  \"project\": \"omniconvert-pro\",\n  \"converters\": [\"JSON\", \"XML\", \"YAML\"],\n  \"active\": true\n}",
    minifyInputPlaceholder: "function calculateArea(width, height) {\n  // Multiply dimensions to find surface area\n  const result = width * height;\n  console.log('Calculating area:', result);\n  return result;\n}",
    utilitiesInputPlaceholder: "Type text or code here...",
    codeOutputPlaceholder: "Output code will appear here...",
    diffOriginalPlaceholder: "Paste original text here...",
    diffModifiedPlaceholder: "Paste modified text here..."
  },
  fr: {
    statusActive: "Moteur local actif",
    tabPlayground: "Bac à sable",
    tabBase64: "Base64",
    tabSerialize: "JSON/XML/YAML",
    tabMinify: "Minifier & Offusquer",
    tabUtilities: "Utilitaires",
    tabHash: "Hachage",
    tabColors: "Couleurs",
    tabRegex: "Regex",
    tabJwt: "JWT",
    tabDiff: "Diff",
    
    // Base64 tab
    b64TextTitle: "Mode Texte Base64",
    b64Encode: "Encoder le Texte",
    b64Decode: "Décoder le Texte",
    b64FileTitle: "Convertisseur de Fichier Base64",
    dropText: "Glissez-déposez des fichiers (images, audio, vidéo, PDF) ou cliquez pour parcourir",
    
    // Serialize tab
    serializeTitle: "Convertisseur de Données (JSON, XML, YAML)",
    serializeFormat: "Formater / Embellir",
    serializeMinify: "Minifier",
    
    // Minify tab
    minifyTitle: "Compresseur & Offuscateur de Code",
    minifyBtn: "Minifier le Code",
    obfuscateBtn: "Offusquer le JS",
    
    // Utilities tab
    utilTitle: "Utilitaires Web Developer",
    markdownBtn: "Rendre le Markdown",
    
    // Hash tab
    hashTitle: "Générateur de Hachage Cryptographique",
    hashDesc: "Générez des hachages SHA-1, SHA-256, SHA-384, SHA-512 et de type MD5 à partir de n'importe quel texte avec l'API native Web Crypto.",
    hashInputPlaceholder: "Tapez le texte à hacher...",
    hashBtn: "Générer tous les Hachages",
    
    // Colors tab
    colorTitle: "Convertisseur de Couleur & Palette",
    colorDesc: "Convertissez des couleurs entre HEX, RGB et HSL. Choisissez une couleur ou entrez une valeur.",
    paletteTitle: "Palette Générée",
    
    // Regex tab
    regexTitle: "Testeur de Regex en Direct",
    regexDesc: "Écrivez un motif et testez-le en temps réel. Les correspondances sont surlignées instantanément.",
    regexPatternPlaceholder: "([a-z]+)\\d+",
    regexFlagsPlaceholder: "gi",
    regexInputPlaceholder: "Entrez le texte de test ici...\nThe quick brown fox123 jumped over the lazy dog456.",
    regexMatches: "correspondances",
    regexMatch: "correspondance",
    regexNoMatches: "Aucune correspondance",
    
    // JWT tab
    jwtTitle: "Décodeur de Jeton JWT",
    jwtDesc: "Décodez tout jeton JSON Web Token hors ligne. Collez un JWT pour inspecter son en-tête, sa charge utile et sa signature.",
    jwtBtn: "Décoder le JWT",
    jwtHeader: "En-tête",
    jwtPayload: "Charge utile",
    jwtSig: "Signature",
    
    // Diff tab
    diffTitle: "Comparateur de Texte (Diff)",
    diffDesc: "Comparez deux blocs de texte ligne par ligne. Les ajouts sont en vert, les suppressions en rouge.",
    diffOriginal: "Original",
    diffModified: "Modifié",
    diffBtn: "Comparer les Textes",
    
    // Output title
    outputTitle: "Aperçu en Direct / Résultat",
    mediaPreview: "Aperçu Média",
    embedTitle: "Intégrer & Partager le Code",
    dataUri: "Code Data URI",
    htmlTag: "Intégration Balise HTML",
    
    // Toasts & Messages
    toastCopied: "Copié dans le presse-papiers !",
    toastError: "Erreur : ",
    toastB64Invalid: "Format Base64 invalide !",
    toastJSONInvalid: "Format JSON invalide !",
    toastXMLInvalid: "Format XML invalide !",
    toastYAMLInvalid: "Format YAML invalide !",
    toastConverted: "Converti avec succès !",
    toastObfuscated: "Code JavaScript offusqué !",
    toastMinified: "Code minifié avec succès !",
    noMedia: "Aucun média décodé pour le moment",
    toastB64Success: "Texte encodé avec succès !",
    toastB64DecSuccess: "Texte Base64 décodé avec succès !",
    toastB64FileSuccess: "Fichier converti en Base64 avec succès !",
    toastB64UriSuccess: "Data URI chargé et aperçu visuel généré !",
    toastMarkdownSuccess: "Markdown compilé ! Aperçu chargé dans le Playground.",
    toastJwtSuccess: "JWT Décodé hors ligne !",
    toastJwtFormatError: "Format JWT invalide (doit contenir 3 parties séparées par des points) !",
    
    // Placeholders
    b64InputPlaceholder: "Entrez le texte à encoder ou le Base64 à décoder...",
    serializeInputPlaceholder: "{\n  \"project\": \"omniconvert-pro\",\n  \"converters\": [\"JSON\", \"XML\", \"YAML\"],\n  \"active\": true\n}",
    minifyInputPlaceholder: "function calculateArea(width, height) {\n  // Multiply dimensions to find surface area\n  const result = width * height;\n  console.log('Calculating area:', result);\n  return result;\n}",
    utilitiesInputPlaceholder: "Entrez le texte ou le code ici...",
    codeOutputPlaceholder: "Le code de sortie apparaîtra ici...",
    diffOriginalPlaceholder: "Collez le texte original ici...",
    diffModifiedPlaceholder: "Collez le texte modifié ici..."
  }
};

// -------------------------------------------------------------
// Initialization & Listeners Setup
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupLanguage();
  setupTabSwitching();
  setupSubtabSwitching();
  setupPlaygroundCompiler();
  setupConsoleInterceptor();
  setupBase64Converter();
  setupSerializationConverters();
  setupMinifyObfuscator();
  setupUtilities();
  setupHashGenerator();
  setupColorConverter();
  setupRegexTester();
  setupJWTDecoder();
  setupDiffViewer();
  setupUniversalCopyButtons();
  setupUtilitiesSubtabs();
  setupUUIDGenerator();
  setupPasswordGenerator();
  setupGlassmorphismGenerator();
  setupGradientBuilder();
  setupQRGenerator();
  setupTimestampConverter();
  setupNumberBaseConverter();
  setupShadowBuilder();
  setupFakeDataGenerator();
  setupSnippetManager();
});

// -------------------------------------------------------------
// Toast Alerts
// -------------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// -------------------------------------------------------------
// Language Selection Handling
// -------------------------------------------------------------
function setupLanguage() {
  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'fr' : 'en';
      updateUILanguage();
    });
  }
  // Initialize on start
  updateUILanguage();
}

function updateUILanguage() {
  const dict = translations[currentLang];
  
  // Status and Tabs
  document.getElementById('lbl-status').textContent = dict.statusActive;
  document.getElementById('tab-lbl-playground').textContent = dict.tabPlayground;
  document.getElementById('tab-lbl-base64').textContent = dict.tabBase64;
  document.getElementById('tab-lbl-serialize').textContent = dict.tabSerialize;
  document.getElementById('tab-lbl-minify').textContent = dict.tabMinify;
  document.getElementById('tab-lbl-utilities').textContent = dict.tabUtilities;
  document.getElementById('tab-lbl-hash').textContent = dict.tabHash;
  document.getElementById('tab-lbl-colors').textContent = dict.tabColors;
  document.getElementById('tab-lbl-regex').textContent = dict.tabRegex;
  document.getElementById('tab-lbl-jwt').textContent = dict.tabJwt;
  document.getElementById('tab-lbl-diff').textContent = dict.tabDiff;
  
  // Base64 Tab Content
  document.getElementById('lbl-b64-text-title').textContent = dict.b64TextTitle;
  document.getElementById('lbl-b64-encode').textContent = dict.b64Encode;
  document.getElementById('lbl-b64-decode').textContent = dict.b64Decode;
  document.getElementById('lbl-b64-file-title').textContent = dict.b64FileTitle;
  document.getElementById('lbl-drop-text').textContent = dict.dropText;
  
  // Serialize Tab Content
  document.getElementById('lbl-serialize-title').textContent = dict.serializeTitle;
  document.getElementById('lbl-serialize-format').textContent = dict.serializeFormat;
  document.getElementById('lbl-serialize-minify').textContent = dict.serializeMinify;
  
  // Minify Tab Content
  document.getElementById('lbl-minify-title').textContent = dict.minifyTitle;
  document.getElementById('lbl-minify-btn').textContent = dict.minifyBtn;
  document.getElementById('lbl-obfuscate-btn').textContent = dict.obfuscateBtn;
  
  // Utilities Tab Content
  document.getElementById('lbl-util-title').textContent = dict.utilTitle;
  document.getElementById('lbl-markdown').textContent = dict.markdownBtn;

  // Hash Tab Content
  document.getElementById('lbl-hash-title').textContent = dict.hashTitle;
  document.getElementById('lbl-hash-desc').textContent = dict.hashDesc;
  document.getElementById('lbl-hash-btn').textContent = dict.hashBtn;
  
  // Colors Tab Content
  document.getElementById('lbl-color-title').textContent = dict.colorTitle;
  document.getElementById('lbl-color-desc').textContent = dict.colorDesc;
  document.getElementById('lbl-palette-title').textContent = dict.paletteTitle;
  
  // Regex Tab Content
  document.getElementById('lbl-regex-title').textContent = dict.regexTitle;
  document.getElementById('lbl-regex-desc').textContent = dict.regexDesc;
  
  // JWT Tab Content
  document.getElementById('lbl-jwt-title').textContent = dict.jwtTitle;
  document.getElementById('lbl-jwt-desc').textContent = dict.jwtDesc;
  document.getElementById('lbl-jwt-btn').textContent = dict.jwtBtn;
  document.getElementById('lbl-jwt-header').textContent = dict.jwtHeader;
  document.getElementById('lbl-jwt-payload').textContent = dict.jwtPayload;
  document.getElementById('lbl-jwt-sig').textContent = dict.jwtSig;
  
  // Diff Tab Content
  document.getElementById('lbl-diff-title').textContent = dict.diffTitle;
  document.getElementById('lbl-diff-desc').textContent = dict.diffDesc;
  document.getElementById('lbl-diff-original').textContent = dict.diffOriginal;
  document.getElementById('lbl-diff-modified').textContent = dict.diffModified;
  document.getElementById('lbl-diff-btn').textContent = dict.diffBtn;
  
  // Output Title Layout
  const outputTitleEl = document.getElementById('output-title');
  if (outputTitleEl) {
    outputTitleEl.innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${dict.outputTitle}`;
  }
  
  document.getElementById('lbl-media-preview').textContent = dict.mediaPreview;
  document.getElementById('lbl-embed-title').textContent = dict.embedTitle;
  document.getElementById('lbl-data-uri').textContent = dict.dataUri;
  document.getElementById('lbl-html-tag').textContent = dict.htmlTag;
  
  // Textareas placeholders
  document.getElementById('b64-text-input').placeholder = dict.b64InputPlaceholder;
  document.getElementById('serialize-input').placeholder = dict.serializeInputPlaceholder;
  document.getElementById('minify-input').placeholder = dict.minifyInputPlaceholder;
  document.getElementById('utilities-input').placeholder = dict.utilitiesInputPlaceholder;
  document.getElementById('code-output').placeholder = dict.codeOutputPlaceholder;
  document.getElementById('hash-input').placeholder = dict.hashInputPlaceholder;
  document.getElementById('regex-pattern').placeholder = dict.regexPatternPlaceholder;
  document.getElementById('regex-flags').placeholder = dict.regexFlagsPlaceholder;
  document.getElementById('regex-test-input').placeholder = dict.regexInputPlaceholder;
  document.getElementById('jwt-input').placeholder = dict.b64InputPlaceholder;
  document.getElementById('diff-original').placeholder = dict.diffOriginalPlaceholder;
  document.getElementById('diff-modified').placeholder = dict.diffModifiedPlaceholder;
  
  const placeholderEl = document.getElementById('b64-placeholder');
  if (placeholderEl) {
    placeholderEl.textContent = dict.noMedia;
  }

  // New Utilities Translations
  document.getElementById('subtab-lbl-text-tools').textContent = currentLang === 'en' ? "Text Tools" : "Outils Texte";
  document.getElementById('subtab-lbl-generators').textContent = currentLang === 'en' ? "Generators" : "Générateurs";
  document.getElementById('subtab-lbl-css-glass').textContent = currentLang === 'en' ? "CSS Glass" : "CSS Verre";
  document.getElementById('lbl-gen-title').textContent = currentLang === 'en' ? "Random Generators" : "Générateurs Aléatoires";
  document.getElementById('lbl-uuid-title').textContent = currentLang === 'en' ? "UUID v4 Generator" : "Générateur UUID v4";
  document.getElementById('lbl-uuid-btn').textContent = currentLang === 'en' ? "Generate" : "Générer";
  document.getElementById('lbl-pass-title').textContent = currentLang === 'en' ? "Password / Token Generator" : "Générateur de Mots de Passe";
  document.getElementById('lbl-pass-upper').textContent = currentLang === 'en' ? "Uppercase (A-Z)" : "Majuscules (A-Z)";
  document.getElementById('lbl-pass-lower').textContent = currentLang === 'en' ? "Lowercase (a-z)" : "Minuscules (a-z)";
  document.getElementById('lbl-pass-nums').textContent = currentLang === 'en' ? "Numbers (0-9)" : "Chiffres (0-9)";
  document.getElementById('lbl-pass-syms').textContent = currentLang === 'en' ? "Symbols (%$#@!...)" : "Symboles (%$#@!...)";
  document.getElementById('lbl-pass-len').textContent = currentLang === 'en' ? "Length:" : "Longueur :";
  document.getElementById('lbl-pass-btn').textContent = currentLang === 'en' ? "Generate Password" : "Générer le Mot de Passe";
  document.getElementById('lbl-glass-title').textContent = currentLang === 'en' ? "Glassmorphism CSS Generator" : "Générateur CSS de Morphisme de Verre";
  document.getElementById('lbl-blur').textContent = currentLang === 'en' ? "Blur:" : "Flou :";
  document.getElementById('lbl-opacity').textContent = currentLang === 'en' ? "Transparency:" : "Transparence :";
  document.getElementById('lbl-saturation').textContent = currentLang === 'en' ? "Saturation:" : "Saturation :";
  document.getElementById('lbl-border-op').textContent = currentLang === 'en' ? "Border Transparency:" : "Transparence Bordure :";
  document.getElementById('lbl-glass-color').textContent = currentLang === 'en' ? "Background Color:" : "Couleur de Fond :";
  
  // New Main Tabs translations
  const tabLblGradient = document.getElementById('tab-lbl-gradient');
  if (tabLblGradient) tabLblGradient.textContent = currentLang === 'en' ? "Gradient Builder" : "Générateur Gradient";
  const tabLblQrcode = document.getElementById('tab-lbl-qrcode');
  if (tabLblQrcode) tabLblQrcode.textContent = currentLang === 'en' ? "QR Code" : "QR Code";
  const tabLblShadow = document.getElementById('tab-lbl-shadow');
  if (tabLblShadow) tabLblShadow.textContent = currentLang === 'en' ? "Shadow Builder" : "Générateur d'Ombre";
  const tabLblSnippets = document.getElementById('tab-lbl-snippets');
  if (tabLblSnippets) tabLblSnippets.textContent = currentLang === 'en' ? "Snippet Manager" : "Gestionnaire Snippets";

  // Subtabs
  const subtabLblTimestamp = document.getElementById('subtab-lbl-timestamp');
  if (subtabLblTimestamp) subtabLblTimestamp.textContent = currentLang === 'en' ? "Timestamp" : "Horodatage";
  const subtabLblNumberBase = document.getElementById('subtab-lbl-number-base');
  if (subtabLblNumberBase) subtabLblNumberBase.textContent = currentLang === 'en' ? "Number Base" : "Base de Nombres";

  // Gradient Builder
  const lblGradientTitle = document.getElementById('lbl-gradient-title');
  if (lblGradientTitle) lblGradientTitle.textContent = currentLang === 'en' ? "CSS Gradient Generator" : "Générateur de Gradient CSS";
  const lblGradientType = document.getElementById('lbl-gradient-type');
  if (lblGradientType) lblGradientType.textContent = currentLang === 'en' ? "Type" : "Type";
  const lblGradientAngle = document.getElementById('lbl-gradient-angle');
  if (lblGradientAngle) lblGradientAngle.textContent = currentLang === 'en' ? "Angle (deg)" : "Angle (degrés)";
  const lblGradientStops = document.getElementById('lbl-gradient-stops');
  if (lblGradientStops) lblGradientStops.textContent = currentLang === 'en' ? "Color Stops" : "Points de Couleur";
  const lblGradientAdd = document.getElementById('lbl-gradient-add');
  if (lblGradientAdd) lblGradientAdd.textContent = currentLang === 'en' ? "Add Color Stop" : "Ajouter un Point";
  const lblGradientPresets = document.getElementById('lbl-gradient-presets');
  if (lblGradientPresets) lblGradientPresets.textContent = currentLang === 'en' ? "Presets" : "Préréglages";

  // QR Code
  const lblQrcodeTitle = document.getElementById('lbl-qrcode-title');
  if (lblQrcodeTitle) lblQrcodeTitle.textContent = currentLang === 'en' ? "QR Code Generator" : "Générateur de QR Code";
  const lblQrcodeDesc = document.getElementById('lbl-qrcode-desc');
  if (lblQrcodeDesc) lblQrcodeDesc.textContent = currentLang === 'en' ? "Generate QR Codes offline for URLs, text, or contact cards. Customize colors and size, then download as PNG." : "Générez des codes QR hors ligne pour des URL, du texte ou des cartes de contact. Personnalisez les couleurs et la taille, puis téléchargez au format PNG.";
  const lblQrSize = document.getElementById('lbl-qr-size');
  if (lblQrSize) lblQrSize.textContent = currentLang === 'en' ? "Size (px)" : "Taille (px)";
  const lblQrEcc = document.getElementById('lbl-qr-ecc');
  if (lblQrEcc) lblQrEcc.textContent = currentLang === 'en' ? "Error Correction" : "Correction d'Erreurs";
  const lblQrFg = document.getElementById('lbl-qr-fg');
  if (lblQrFg) lblQrFg.textContent = currentLang === 'en' ? "Foreground Color" : "Couleur de Premier Plan";
  const lblQrBg = document.getElementById('lbl-qr-bg');
  if (lblQrBg) lblQrBg.textContent = currentLang === 'en' ? "Background Color" : "Couleur d'Arrière-Plan";
  const lblQrcodeBtn = document.getElementById('lbl-qrcode-btn');
  if (lblQrcodeBtn) lblQrcodeBtn.textContent = currentLang === 'en' ? "Generate QR Code" : "Générer le QR Code";
  const lblQrcodeDownload = document.getElementById('lbl-qrcode-download');
  if (lblQrcodeDownload) lblQrcodeDownload.textContent = currentLang === 'en' ? "Download PNG" : "Télécharger PNG";
  const qrcodeInput = document.getElementById('qrcode-input');
  if (qrcodeInput) qrcodeInput.placeholder = currentLang === 'en' ? "Enter text or URL to generate QR code..." : "Entrez le texte ou l'URL pour générer le code QR...";

  // Timestamp Converter
  const lblTimestampTitle = document.getElementById('lbl-timestamp-title');
  if (lblTimestampTitle) lblTimestampTitle.textContent = currentLang === 'en' ? "Timestamp & Date Converter" : "Convertisseur d'Horodatage et Date";
  const lblTsToDateTitle = document.getElementById('lbl-ts-to-date-title');
  if (lblTsToDateTitle) lblTsToDateTitle.textContent = currentLang === 'en' ? "Unix Timestamp ↔ Date" : "Unix Horodatage ↔ Date";
  const lblTsConvertBtn = document.getElementById('lbl-ts-convert-btn');
  if (lblTsConvertBtn) lblTsConvertBtn.textContent = currentLang === 'en' ? "Convert to Date" : "Convertir en Date";
  const lblDateToTsTitle = document.getElementById('lbl-date-to-ts-title');
  if (lblDateToTsTitle) lblDateToTsTitle.textContent = currentLang === 'en' ? "Date ↔ Unix Timestamp" : "Date ↔ Unix Horodatage";
  const lblDateConvertBtn = document.getElementById('lbl-date-convert-btn');
  if (lblDateConvertBtn) lblDateConvertBtn.textContent = currentLang === 'en' ? "Convert to Timestamp" : "Convertir en Horodatage";
  const lblTsDiffTitle = document.getElementById('lbl-ts-diff-title');
  if (lblTsDiffTitle) lblTsDiffTitle.textContent = currentLang === 'en' ? "Date Difference Calculator" : "Calculateur de Différence de Dates";
  const lblDiffCalcBtn = document.getElementById('lbl-diff-calc-btn');
  if (lblDiffCalcBtn) lblDiffCalcBtn.textContent = currentLang === 'en' ? "Calculate Difference" : "Calculer la Différence";
  const lblTsCountdownTitle = document.getElementById('lbl-ts-countdown-title');
  if (lblTsCountdownTitle) lblTsCountdownTitle.textContent = currentLang === 'en' ? "Live Countdown Timer" : "Compte à Rebours en Direct";

  // Number Base Converter
  const lblNumberBaseTitle = document.getElementById('lbl-number-base-title');
  if (lblNumberBaseTitle) lblNumberBaseTitle.textContent = currentLang === 'en' ? "Number Base Converter" : "Convertisseur de Base de Nombres";
  const lblNbDec = document.getElementById('lbl-nb-dec');
  if (lblNbDec) lblNbDec.textContent = currentLang === 'en' ? "Decimal (Base 10)" : "Décimal (Base 10)";
  const lblNbHex = document.getElementById('lbl-nb-hex');
  if (lblNbHex) lblNbHex.textContent = currentLang === 'en' ? "Hexadecimal (Base 16)" : "Hexadécimal (Base 16)";
  const lblNbBin = document.getElementById('lbl-nb-bin');
  if (lblNbBin) lblNbBin.textContent = currentLang === 'en' ? "Binary (Base 2)" : "Binaire (Base 2)";
  const lblNbOct = document.getElementById('lbl-nb-oct');
  if (lblNbOct) lblNbOct.textContent = currentLang === 'en' ? "Octal (Base 8)" : "Octal (Base 8)";
  const lblNbBitwiseTitle = document.getElementById('lbl-nb-bitwise-title');
  if (lblNbBitwiseTitle) lblNbBitwiseTitle.textContent = currentLang === 'en' ? "Bitwise Operations" : "Opérations Bit à Bit";
  const lblNbBitwiseBtn = document.getElementById('lbl-nb-bitwise-btn');
  if (lblNbBitwiseBtn) lblNbBitwiseBtn.textContent = currentLang === 'en' ? "Calculate Bitwise" : "Calculer Bit à Bit";

  // CSS Shadow Builder
  const lblShadowTitle = document.getElementById('lbl-shadow-title');
  if (lblShadowTitle) lblShadowTitle.textContent = currentLang === 'en' ? "CSS Shadow Builder" : "Générateur d'Ombres CSS";
  const subtabLblBoxShadow = document.getElementById('subtab-lbl-box-shadow');
  if (subtabLblBoxShadow) subtabLblBoxShadow.textContent = currentLang === 'en' ? "Box Shadow" : "Ombre de Boîte";
  const subtabLblTextShadow = document.getElementById('subtab-lbl-text-shadow');
  if (subtabLblTextShadow) subtabLblTextShadow.textContent = currentLang === 'en' ? "Text Shadow" : "Ombre de Texte";
  const lblShX = document.getElementById('lbl-sh-x');
  if (lblShX) lblShX.textContent = currentLang === 'en' ? "Offset X:" : "Décalage X :";
  const lblShY = document.getElementById('lbl-sh-y');
  if (lblShY) lblShY.textContent = currentLang === 'en' ? "Offset Y:" : "Décalage Y :";
  const lblShBlur = document.getElementById('lbl-sh-blur');
  if (lblShBlur) lblShBlur.textContent = currentLang === 'en' ? "Blur Radius:" : "Rayon de Flou :";
  const lblShSpread = document.getElementById('lbl-sh-spread');
  if (lblShSpread) lblShSpread.textContent = currentLang === 'en' ? "Spread Radius:" : "Rayon de Propagation :";
  const lblShOpacity = document.getElementById('lbl-sh-opacity');
  if (lblShOpacity) lblShOpacity.textContent = currentLang === 'en' ? "Shadow Opacity:" : "Opacité de l'Ombre :";
  const lblShColor = document.getElementById('lbl-sh-color');
  if (lblShColor) lblShColor.textContent = currentLang === 'en' ? "Shadow Color:" : "Couleur de l'Ombre :";
  const lblShInset = document.getElementById('lbl-sh-inset');
  if (lblShInset) lblShInset.textContent = currentLang === 'en' ? "Inset Shadow" : "Ombre Interne";

  // Fake Data Generator
  const lblFakeDataTitle = document.getElementById('lbl-fake-data-title');
  if (lblFakeDataTitle) lblFakeDataTitle.textContent = currentLang === 'en' ? "Lorem Ipsum & Fake Data" : "Lorem Ipsum & Données de Test";
  const lblFdType = document.getElementById('lbl-fd-type');
  if (lblFdType) lblFdType.textContent = currentLang === 'en' ? "Type of Data" : "Type de Données";
  const lblFdCount = document.getElementById('lbl-fd-count');
  if (lblFdCount) lblFdCount.textContent = currentLang === 'en' ? "Quantity:" : "Quantité :";
  const lblFakeDataBtn = document.getElementById('lbl-fake-data-btn');
  if (lblFakeDataBtn) lblFakeDataBtn.textContent = currentLang === 'en' ? "Generate Data" : "Générer des Données";

  // Snippet Manager
  const lblSnippetsTitle = document.getElementById('lbl-snippets-title');
  if (lblSnippetsTitle) lblSnippetsTitle.textContent = currentLang === 'en' ? "Code Snippet Manager" : "Gestionnaire de Snippets";
  const lblSnipSaveTitle = document.getElementById('lbl-snip-save-title');
  if (lblSnipSaveTitle) lblSnipSaveTitle.textContent = currentLang === 'en' ? "Save Snippet" : "Enregistrer le Snippet";
  const lblSnippetSaveBtn = document.getElementById('lbl-snippet-save-btn');
  if (lblSnippetSaveBtn) lblSnippetSaveBtn.textContent = currentLang === 'en' ? "Save Snippet" : "Enregistrer le Snippet";
  const lblSnipListTitle = document.getElementById('lbl-snip-list-title');
  if (lblSnipListTitle) lblSnipListTitle.textContent = currentLang === 'en' ? "Saved Snippets" : "Snippets Enregistrés";
  const lblSnipExport = document.getElementById('lbl-snip-export');
  if (lblSnipExport) lblSnipExport.textContent = currentLang === 'en' ? "Export" : "Exporter";
  const lblSnipImport = document.getElementById('lbl-snip-import');
  if (lblSnipImport) lblSnipImport.textContent = currentLang === 'en' ? "Import" : "Importer";
  const snippetTitle = document.getElementById('snippet-title');
  if (snippetTitle) snippetTitle.placeholder = currentLang === 'en' ? "Snippet Title" : "Titre du Snippet";
  const snippetCodeInput = document.getElementById('snippet-code-input');
  if (snippetCodeInput) snippetCodeInput.placeholder = currentLang === 'en' ? "Paste code to save..." : "Collez le code à enregistrer...";
  const snippetSearch = document.getElementById('snippet-search');
  if (snippetSearch) snippetSearch.placeholder = currentLang === 'en' ? "Search snippets..." : "Rechercher des snippets...";

  const b64DownloadEl = document.getElementById('lbl-b64-download');
  if (b64DownloadEl) {
    b64DownloadEl.textContent = currentLang === 'en' ? "Download Decoded File" : "Télécharger le Fichier Décodé";
  }

  // Update button languages dynamically if changed
  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.textContent = currentLang === 'en' ? "🇺🇸 EN | 🇫🇷 FR" : "🇫🇷 FR | 🇺🇸 EN";
  }

  // Retrigger Regex update and Diff update to reflect language changes in match count
  const patternInput = document.getElementById('regex-pattern');
  if (patternInput && patternInput.value) {
    patternInput.dispatchEvent(new Event('input'));
  }
}

// -------------------------------------------------------------
// Main Tabs Control
// -------------------------------------------------------------
function setupTabSwitching() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      activeTab = tabName;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      const activeContent = document.getElementById(`tab-${tabName}`);
      if (activeContent) activeContent.classList.add('active');
      
      showOutputContainerForTab(tabName);
    });
  });
}

function showOutputContainerForTab(tabName) {
  document.querySelectorAll('.output-container').forEach(oc => oc.classList.remove('active'));
  
  if (tabName === 'playground') {
    document.getElementById('container-playground').classList.add('active');
  } else if (tabName === 'base64') {
    document.getElementById('container-base64').classList.add('active');
  } else if (tabName === 'diff') {
    document.getElementById('container-diff').classList.add('active');
  } else {
    document.getElementById('container-code').classList.add('active');
  }
}

function showOutputContainer(type) {
  document.querySelectorAll('.output-container').forEach(oc => oc.classList.remove('active'));
  const container = document.getElementById(`container-${type}`);
  if (container) container.classList.add('active');
}

// -------------------------------------------------------------
// Playground Editor Subtabs (HTML / CSS / JS)
// -------------------------------------------------------------
function setupSubtabSwitching() {
  const subtabs = document.querySelectorAll('.subtab-btn');
  subtabs.forEach(subtab => {
    subtab.addEventListener('click', () => {
      const editorName = subtab.getAttribute('data-editor');
      
      subtabs.forEach(st => st.classList.remove('active'));
      subtab.classList.add('active');
      
      document.querySelectorAll('.code-textarea').forEach(ta => {
        if (ta.id && ta.id.startsWith('editor-')) {
          ta.classList.add('hidden');
        }
      });
      const editor = document.getElementById(`editor-${editorName}`);
      if (editor) editor.classList.remove('hidden');
    });
  });
}

// -------------------------------------------------------------
// Live Sandbox Playground Compiler
// -------------------------------------------------------------
function setupPlaygroundCompiler() {
  const htmlEditor = document.getElementById('editor-html');
  const cssEditor = document.getElementById('editor-css');
  const jsEditor = document.getElementById('editor-js');
  const iframe = document.getElementById('preview-frame');
  
  if (htmlEditor && cssEditor && jsEditor) {
    htmlEditor.addEventListener('input', triggerCompile);
    cssEditor.addEventListener('input', triggerCompile);
    jsEditor.addEventListener('input', triggerCompile);
  }
  
  const wmCheckbox = document.getElementById('chk-watermark');
  if (wmCheckbox) {
    wmCheckbox.addEventListener('change', runPlayground);
  }
  
  // Playground Copy and Download Buttons
  const copyPlaygroundBtn = document.getElementById('btn-copy-playground');
  if (copyPlaygroundBtn) {
    copyPlaygroundBtn.addEventListener('click', () => {
      const code = generatePlaygroundOutput();
      navigator.clipboard.writeText(code)
        .then(() => showToast(currentLang === 'en' ? "Copied combined HTML code!" : "Code HTML combiné copié !"))
        .catch(err => showToast(translations[currentLang].toastError + err.message));
    });
  }
  
  const downloadPlaygroundBtn = document.getElementById('btn-download-playground');
  if (downloadPlaygroundBtn) {
    downloadPlaygroundBtn.addEventListener('click', () => {
      const code = generatePlaygroundOutput();
      const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'omniconvert-export.html');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(currentLang === 'en' ? "Downloaded HTML file!" : "Fichier HTML téléchargé !");
    });
  }
  
  // Clear Console Button
  const clearConsoleBtn = document.getElementById('btn-clear-console');
  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', () => {
      const consoleLogs = document.getElementById('console-logs');
      if (consoleLogs) consoleLogs.innerHTML = '';
    });
  }
  
  // Initial compilation
  runPlayground();
}

function triggerCompile() {
  if (compileTimeout) clearTimeout(compileTimeout);
  compileTimeout = setTimeout(runPlayground, 400);
}

function runPlayground() {
  const htmlEditor = document.getElementById('editor-html');
  const cssEditor = document.getElementById('editor-css');
  const jsEditor = document.getElementById('editor-js');
  const iframe = document.getElementById('preview-frame');
  
  if (!htmlEditor || !cssEditor || !jsEditor || !iframe) return;
  
  const html = htmlEditor.value;
  const css = cssEditor.value;
  const js = jsEditor.value;
  
  const isPremium = typeof checkIsPremium === 'function' ? checkIsPremium() : false;
  const includeWatermark = (document.getElementById('chk-watermark') && document.getElementById('chk-watermark').checked) || !isPremium;
  
  const srcdoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${css}
  </style>
  <script>
    (function() {
      const _log = console.log;
      const _error = console.error;
      const _warn = console.warn;
      
      function send(type, args) {
        const formattedArgs = Array.from(args).map(arg => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        });
        window.parent.postMessage({
          type: 'console-intercept',
          level: type,
          message: formattedArgs.join(' ')
        }, '*');
      }
      
      console.log = function() {
        send('log', arguments);
        _log.apply(console, arguments);
      };
      console.error = function() {
        send('error', arguments);
        _error.apply(console, arguments);
      };
      console.warn = function() {
        send('warn', arguments);
        _warn.apply(console, arguments);
      };
      
      window.addEventListener('error', function(e) {
        window.parent.postMessage({
          type: 'console-intercept',
          level: 'error',
          message: e.message
        }, '*');
      });

      window.addEventListener('unhandledrejection', function(e) {
        window.parent.postMessage({
          type: 'console-intercept',
          level: 'error',
          message: 'Unhandled Promise Rejection: ' + (e.reason ? (e.reason.message || e.reason) : e)
        }, '*');
      });
    })();
  <\/script>
</head>
<body>
  ${html}
  ${includeWatermark ? watermarkCode : ''}
  <script>
    try {
      ${js}
    } catch (err) {
      console.error(err.message);
    }
  <\/script>
</body>
</html>
  `;
  iframe.srcdoc = srcdoc;
}

// Intercept message events from sandboxed iframe
function setupConsoleInterceptor() {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'console-intercept') {
      const consoleLogs = document.getElementById('console-logs');
      if (!consoleLogs) return;
      
      const logItem = document.createElement('div');
      logItem.className = `log-item log-${event.data.level}`;
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'log-time';
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      timeSpan.textContent = `[${timeStr}] `;
      
      const msgText = document.createTextNode(event.data.message);
      
      logItem.appendChild(timeSpan);
      logItem.appendChild(msgText);
      consoleLogs.appendChild(logItem);
      
      // Auto scroll
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }
  });
}

// -------------------------------------------------------------
// Base64 Text & File Converter
// -------------------------------------------------------------
function setupBase64Converter() {
  const encodeBtn = document.getElementById('btn-b64-encode');
  const decodeBtn = document.getElementById('btn-b64-decode');
  const dropZone = document.getElementById('b64-drop-zone');
  const fileInput = document.getElementById('b64-file-input');
  const downloadBtn = document.getElementById('btn-b64-download');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const dataUrl = document.getElementById('embed-datauri').value;
      if (!dataUrl) return;
      const fileName = document.getElementById('b64-name').textContent || 'download';
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (encodeBtn) {
    encodeBtn.addEventListener('click', () => {
      const text = document.getElementById('b64-text-input').value;
      if (!text) return;
      try {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        document.getElementById('code-output').value = encoded;
        showOutputContainer('code');
        if (downloadBtn) downloadBtn.style.display = 'none';
        showToast(translations[currentLang].toastB64Success);
      } catch (err) {
        showToast(translations[currentLang].toastError + err.message);
      }
    });
  }
  
  if (decodeBtn) {
    decodeBtn.addEventListener('click', () => {
      const text = document.getElementById('b64-text-input').value.trim();
      if (!text) return;
      
      // Smart check if the input is a base64 Data URI string
      const dataUriRegex = /^data:(.*?);base64,(.*)$/;
      const match = text.match(dataUriRegex);
      
      if (match) {
        const mime = match[1];
        const base64Data = match[2];
        
        document.getElementById('embed-datauri').value = text;
        document.getElementById('b64-name').textContent = "Decoded Data URI File";
        document.getElementById('b64-type').textContent = mime;
        document.getElementById('b64-size').textContent = "~" + Math.round(base64Data.length * 0.75 / 1024) + " KB";
        document.getElementById('b64-file-details').style.display = 'block';
        if (downloadBtn) downloadBtn.style.display = 'inline-flex';
        
        renderBase64Preview(text, mime, "Decoded File");
        showOutputContainer('base64');
        showToast(translations[currentLang].toastB64UriSuccess);
      } else {
        // Standard text base64 decoding
        try {
          const decoded = decodeURIComponent(escape(atob(text)));
          document.getElementById('code-output').value = decoded;
          showOutputContainer('code');
          if (downloadBtn) downloadBtn.style.display = 'none';
          showToast(translations[currentLang].toastB64DecSuccess);
        } catch (err) {
          showToast(translations[currentLang].toastB64Invalid);
        }
      }
    });
  }
  
  // File browse click triggers
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    
    // Drag-and-drop triggers
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    });
  }
}

function handleFiles(files) {
  if (!files.length) return;
  const file = files[0];
  
  document.getElementById('b64-name').textContent = file.name;
  document.getElementById('b64-type').textContent = file.type || 'unknown';
  
  let sizeStr = '';
  if (file.size < 1024) sizeStr = `${file.size} B`;
  else if (file.size < 1024 * 1024) sizeStr = `${(file.size / 1024).toFixed(2)} KB`;
  else sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
  document.getElementById('b64-size').textContent = sizeStr;
  
  document.getElementById('b64-file-details').style.display = 'block';
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById('embed-datauri').value = dataUrl;
    const downloadBtn = document.getElementById('btn-b64-download');
    if (downloadBtn) downloadBtn.style.display = 'inline-flex';
    renderBase64Preview(dataUrl, file.type, file.name);
    showOutputContainer('base64');
    showToast(translations[currentLang].toastB64FileSuccess);
  };
  reader.readAsDataURL(file);
}

function renderBase64Preview(dataUrl, mime, fileName) {
  const previewBox = document.getElementById('b64-media-preview');
  if (!previewBox) return;
  previewBox.innerHTML = '';
  
  let htmlTag = '';
  
  if (mime.startsWith('image/')) {
    htmlTag = `<img src="${dataUrl}" alt="${fileName}">`;
    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'preview-media-item';
    previewBox.appendChild(img);
  } else if (mime.startsWith('audio/')) {
    htmlTag = `<audio controls>\n  <source src="${dataUrl}" type="${mime}">\n</audio>`;
    const audio = document.createElement('audio');
    audio.src = dataUrl;
    audio.controls = true;
    audio.className = 'preview-media-item';
    previewBox.appendChild(audio);
  } else if (mime.startsWith('video/')) {
    htmlTag = `<video controls width="100%">\n  <source src="${dataUrl}" type="${mime}">\n</video>`;
    const video = document.createElement('video');
    video.src = dataUrl;
    video.controls = true;
    video.className = 'preview-media-item';
    previewBox.appendChild(video);
  } else if (mime === 'application/pdf') {
    htmlTag = `<object data="${dataUrl}" type="application/pdf" width="100%" height="600px">\n  <embed src="${dataUrl}" type="application/pdf" />\n</object>`;
    const iframe = document.createElement('iframe');
    iframe.src = dataUrl;
    iframe.className = 'preview-media-item';
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = 'none';
    previewBox.appendChild(iframe);
  } else {
    htmlTag = `<a href="${dataUrl}" download="${fileName}">Download ${fileName}</a>`;
    const div = document.createElement('div');
    div.className = 'preview-placeholder';
    div.textContent = currentLang === 'en'
      ? `File format (${mime}) not supported for live preview. Base64 outputs generated successfully.`
      : `Format de fichier (${mime}) non supporté pour l'aperçu en direct. Sortie Base64 générée avec succès.`;
    previewBox.appendChild(div);
  }
  
  document.getElementById('embed-htmltag').value = htmlTag;
}

// -------------------------------------------------------------
// Serialization Parsers & Converters (JSON / XML / YAML)
// -------------------------------------------------------------
function setupSerializationConverters() {
  const jsonToXmlBtn = document.getElementById('btn-json-xml');
  const xmlToJsonBtn = document.getElementById('btn-xml-json');
  const jsonToYamlBtn = document.getElementById('btn-json-yaml');
  const yamlToJsonBtn = document.getElementById('btn-yaml-json');
  const formatBtn = document.getElementById('btn-serialize-format');
  const minifyBtn = document.getElementById('btn-serialize-minify');
  
  if (jsonToXmlBtn) {
    jsonToXmlBtn.addEventListener('click', () => {
      try {
        const val = document.getElementById('serialize-input').value.trim();
        if (!val) return;
        const parsed = JSON.parse(val);
        const xml = jsonToXml(parsed, "root");
        document.getElementById('code-output').value = xml;
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastJSONInvalid + " " + err.message);
      }
    });
  }
  
  if (xmlToJsonBtn) {
    xmlToJsonBtn.addEventListener('click', () => {
      const xmlStr = document.getElementById('serialize-input').value.trim();
      if (!xmlStr) return;
      try {
        const json = xmlStringToJSON(xmlStr);
        document.getElementById('code-output').value = json;
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastXMLInvalid + " " + err.message);
      }
    });
  }
  
  if (jsonToYamlBtn) {
    jsonToYamlBtn.addEventListener('click', () => {
      try {
        const val = document.getElementById('serialize-input').value.trim();
        if (!val) return;
        const parsed = JSON.parse(val);
        const yaml = jsonToYaml(parsed);
        document.getElementById('code-output').value = yaml;
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastJSONInvalid + " " + err.message);
      }
    });
  }
  
  if (yamlToJsonBtn) {
    yamlToJsonBtn.addEventListener('click', () => {
      const yamlStr = document.getElementById('serialize-input').value.trim();
      if (!yamlStr) return;
      try {
        let parsed = parseYAML(yamlStr);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length === 1 && parsed.hasOwnProperty('undefined')) {
          parsed = parsed['undefined'];
        }
        document.getElementById('code-output').value = JSON.stringify(parsed, null, 2);
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastYAMLInvalid + " " + err.message);
      }
    });
  }
  
  if (formatBtn) {
    formatBtn.addEventListener('click', () => {
      const input = document.getElementById('serialize-input').value.trim();
      if (!input) return;
      try {
        if (input.startsWith('<')) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(input, "application/xml");
          if (xmlDoc.querySelector("parsererror")) {
            throw new Error("Invalid XML structure");
          }
          const serializer = new XMLSerializer();
          const rawXml = serializer.serializeToString(xmlDoc).replace(/>\s+</g, '><');
          document.getElementById('code-output').value = formatXml(rawXml);
        } else if (input.startsWith('{') || input.startsWith('[')) {
          const parsed = JSON.parse(input);
          document.getElementById('code-output').value = JSON.stringify(parsed, null, 2);
        } else {
          let parsed = parseYAML(input);
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length === 1 && parsed.hasOwnProperty('undefined')) {
            parsed = parsed['undefined'];
          }
          document.getElementById('code-output').value = jsonToYaml(parsed);
        }
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastError + err.message);
      }
    });
  }
  
  if (minifyBtn) {
    minifyBtn.addEventListener('click', () => {
      const input = document.getElementById('serialize-input').value.trim();
      if (!input) return;
      try {
        if (input.startsWith('<')) {
          const minified = input.replace(/>\s+</g, '><').trim();
          document.getElementById('code-output').value = minified;
        } else if (input.startsWith('{') || input.startsWith('[')) {
          const parsed = JSON.parse(input);
          document.getElementById('code-output').value = JSON.stringify(parsed);
        } else {
          let parsed = parseYAML(input);
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length === 1 && parsed.hasOwnProperty('undefined')) {
            parsed = parsed['undefined'];
          }
          document.getElementById('code-output').value = JSON.stringify(parsed);
        }
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastError + err.message);
      }
    });
  }
}

// Recursive JSON to XML
function jsonToXml(obj, rootName = "root") {
  let xml = "";
  if (typeof obj !== "object" || obj === null) {
    return String(obj);
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let val = obj[key];
      let safeKey = key.replace(/[^a-zA-Z0-9_.-]/g, "_");
      if (Array.isArray(val)) {
        val.forEach(item => {
          xml += `<${safeKey}>${jsonToXml(item, "")}</${safeKey}>`;
        });
      } else if (typeof val === "object" && val !== null) {
        xml += `<${safeKey}>${jsonToXml(val, "")}</${safeKey}>`;
      } else {
        xml += `<${safeKey}>${escapeXml(String(val))}</${safeKey}>`;
      }
    }
  }
  return rootName ? `<${rootName}>${xml}</${rootName}>` : xml;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// XML string parser to JSON
function xmlStringToJSON(xmlStr) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
  const parserError = xmlDoc.querySelector("parsererror");
  if (parserError) {
    throw new Error(parserError.textContent);
  }
  const root = xmlDoc.documentElement;
  const res = {};
  res[root.nodeName] = xmlToJson(root);
  return JSON.stringify(res, null, 2);
}

function xmlToJson(xmlNode) {
  if (xmlNode.nodeType === 3) {
    return xmlNode.nodeValue.trim();
  }
  let obj = {};
  if (xmlNode.hasChildNodes()) {
    let hasElementChildren = false;
    let textContent = "";
    
    for (let i = 0; i < xmlNode.childNodes.length; i++) {
      let item = xmlNode.childNodes.item(i);
      if (item.nodeType === 1) {
        hasElementChildren = true;
        let nodeName = item.nodeName;
        let childVal = xmlToJson(item);
        if (obj[nodeName] === undefined) {
          obj[nodeName] = childVal;
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(childVal);
        }
      } else if (item.nodeType === 3) {
        textContent += item.nodeValue.trim();
      }
    }
    
    if (!hasElementChildren && textContent) {
      obj = textContent;
    }
  }
  if (xmlNode.attributes && xmlNode.attributes.length > 0) {
    let attrs = {};
    for (let j = 0; j < xmlNode.attributes.length; j++) {
      let attribute = xmlNode.attributes.item(j);
      attrs["@" + attribute.nodeName] = attribute.nodeValue;
    }
    if (typeof obj === "object" && Object.keys(obj).length > 0) {
      obj = Object.assign(obj, attrs);
    } else {
      let textVal = typeof obj === "string" ? obj : "";
      obj = Object.assign({ "#text": textVal }, attrs);
    }
  }
  return obj;
}

// JSON to YAML converter
function jsonToYaml(obj, depth = 0) {
  const indent = "  ".repeat(depth);
  if (typeof obj !== "object" || obj === null) {
    if (typeof obj === "string") {
      if (/[:#\[\]{}|>&!%@`]/.test(obj) || obj.includes("\n")) {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }
      return obj;
    }
    return String(obj);
  }
  
  let yaml = "";
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]\n";
    obj.forEach(item => {
      if (typeof item === "object" && item !== null) {
        const itemYaml = jsonToYaml(item, depth + 1);
        const trimmed = itemYaml.trimStart();
        yaml += `${indent}- ${trimmed}`;
      } else {
        yaml += `${indent}- ${jsonToYaml(item, 0)}\n`;
      }
    });
  } else {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}\n";
    keys.forEach(key => {
      let val = obj[key];
      if (typeof val === "object" && val !== null) {
        yaml += `${indent}${key}:\n${jsonToYaml(val, depth + 1)}`;
      } else {
        yaml += `${indent}${key}: ${jsonToYaml(val, 0)}\n`;
      }
    });
  }
  return yaml;
}

// YAML to JSON compiler
function parseYAML(yaml) {
  const lines = yaml.replace(/\r/g, '').split('\n');
  const root = {};
  const stack = [{ indent: -1, value: root }];
  
  lines.forEach((line, idx) => {
    if (line.trim() === '' || line.trim().startsWith('#')) return;
    
    const indent = line.search(/\S/);
    const content = line.trim();
    
    if (content.startsWith('-')) {
      const valueStr = content.slice(1).trim();
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].value;
      let arr;
      
      if (Array.isArray(parent)) {
        arr = parent;
      } else {
        const keys = Object.keys(parent);
        const lastKey = keys[keys.length - 1];
        if (!Array.isArray(parent[lastKey])) {
          parent[lastKey] = [];
        }
        arr = parent[lastKey];
      }
      
      if (valueStr.includes(':')) {
        const colonIndex = valueStr.indexOf(':');
        const itemKey = valueStr.slice(0, colonIndex).trim();
        const itemVal = parseYamlValue(valueStr.slice(colonIndex + 1));
        const obj = {};
        obj[itemKey] = itemVal;
        arr.push(obj);
        stack.push({ indent: indent + 2, value: obj });
      } else {
        arr.push(parseYamlValue(valueStr));
      }
    } else if (content.includes(':')) {
      const colonIndex = content.indexOf(':');
      const key = content.slice(0, colonIndex).trim();
      const valStr = content.slice(colonIndex + 1).trim();
      
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      const parent = stack[stack.length - 1].value;
      let currentContainer = parent;
      if (Array.isArray(parent)) {
        currentContainer = parent[parent.length - 1];
      }
      
      if (valStr === '') {
        // Peek to see if the next non-empty line starts with a list marker '-'
        let isListNext = false;
        for (let j = idx + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine === '' || nextLine.startsWith('#')) continue;
          if (nextLine.startsWith('-')) {
            isListNext = true;
          }
          break;
        }
        
        const newContainer = isListNext ? [] : {};
        currentContainer[key] = newContainer;
        stack.push({ indent: indent, value: newContainer });
      } else {
        currentContainer[key] = parseYamlValue(valStr);
      }
    }
  });
  
  return root;
}

function parseYamlValue(val) {
  val = val.trim();
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null') return null;
  if (!isNaN(val) && val !== '') return Number(val);
  return val;
}

function formatXml(xmlStr) {
  let formatted = '';
  const reg = /(>)(<)(\/*)/g;
  xmlStr = xmlStr.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  xmlStr.split('\r\n').forEach(line => {
    let indent = 0;
    if (line.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (line.match(/^<\/\w/)) {
      if (pad !== 0) pad -= 1;
    } else if (line.match(/^<\w[^>]*[^\/]>$/)) {
      indent = 1;
    } else {
      indent = 0;
    }
    
    formatted += '  '.repeat(pad) + line + '\r\n';
    pad += indent;
  });
  return formatted.trim();
}

// -------------------------------------------------------------
// Code Minifier & JavaScript Obfuscator
// -------------------------------------------------------------
function setupMinifyObfuscator() {
  const minifyBtn = document.getElementById('btn-minify-js');
  const obfuscateBtn = document.getElementById('btn-obfuscate-js');
  
  if (minifyBtn) {
    minifyBtn.addEventListener('click', () => {
      const input = document.getElementById('minify-input').value.trim();
      if (!input) return;
      
      let result = "";
      if (input.includes('{') && (input.includes('margin') || input.includes('color:') || input.includes('background:'))) {
        result = minifyCSS(input);
      } else if (input.includes('<html') || input.includes('<!DOCTYPE')) {
        result = input
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        result = minifyJS(input);
      }
      
      document.getElementById('code-output').value = result;
      showOutputContainer('code');
      showToast(translations[currentLang].toastMinified);
    });
  }
  
  if (obfuscateBtn) {
    obfuscateBtn.addEventListener('click', () => {
      const input = document.getElementById('minify-input').value.trim();
      if (!input) return;
      try {
        const obfuscated = obfuscateJS(input);
        document.getElementById('code-output').value = obfuscated;
        showOutputContainer('code');
        showToast(translations[currentLang].toastObfuscated);
      } catch (err) {
        showToast(translations[currentLang].toastError + err.message);
      }
    });
  }
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}::;])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

// A simple but effective JS minifier
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(?:^|\n)\s*\/\/.*$/gm, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([=+\-*/%&|<>!?;:.,{}()\[\]])\s*/g, '$1')
    .trim();
}

// Hex/Obfuscation algorithm for offline JavaScript Protection
function obfuscateJS(code) {
  const strings = [];
  const arrayName = "_0x" + Math.random().toString(36).substring(2, 6);
  const funcName = "_0x" + Math.random().toString(36).substring(2, 6);

  // Strip comments first to prevent mismatched quotes inside comments
  const strippedCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  // Replace string literals with array lookups
  const stringRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
  let cleanCode = strippedCode.replace(stringRegex, (fullMatch, dVal, sVal) => {
    const val = dVal !== undefined ? dVal : sVal;
    let idx = strings.indexOf(val);
    if (idx === -1) {
      idx = strings.length;
      strings.push(val);
    }
    return `${funcName}(${idx})`;
  });
  
  // Scramble variable names in var, let, const declarations
  const blacklist = [
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 
    'return', 'function', 'var', 'let', 'const', 'new', 'this', 'typeof', 
    'instanceof', 'void', 'delete', 'in', 'of', 'try', 'catch', 'finally', 
    'throw', 'class', 'extends', 'super', 'import', 'export', 'default', 
    'console', 'log', 'error', 'warn', 'window', 'document', 'body', 
    'addEventListener', 'querySelector', 'querySelectorAll', 'getElementById', 
    'innerHTML', 'textContent', 'style', 'value', 'onload', 'onclick', 'alert', 
    'JSON', 'stringify', 'parse', 'Math', 'random', 'toString', 'substring', 
    'length', 'push', 'split', 'join', 'forEach', 'map', 'filter', 'reduce', 
    'click', 'target', 'result'
  ];
  
  // Collect vars to rename from the stripped code (comments already removed)
  const varDeclarations = /\b(let|const|var|function)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  const varsToRename = new Set();
  let varMatch;
  while ((varMatch = varDeclarations.exec(strippedCode)) !== null) {
    const name = varMatch[2];
    if (!blacklist.includes(name)) {
      varsToRename.add(name);
    }
  }
  
  let renamedCode = cleanCode;
  varsToRename.forEach(varName => {
    const hexName = "_0x" + Math.random().toString(36).substring(2, 6);
    // Use lookbehind to avoid renaming member fields
    const varRegex = new RegExp(`(?<!\\.)\\b${varName}\\b`, 'g');
    renamedCode = renamedCode.replace(varRegex, hexName);
  });
  
  // Hex encode string elements in pool
  const hexStrings = strings.map(str => {
    return str.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  });
  
  const header = `const ${arrayName} = [${hexStrings.map(s => `'${s}'`).join(', ')}];\nfunction ${funcName}(i) { return ${arrayName}[i]; }\n`;
  return header + renamedCode;
}

// -------------------------------------------------------------
// Web Developer Utilities Hub
// -------------------------------------------------------------
function setupUtilities() {
  const urlEncodeBtn = document.getElementById('btn-url-encode');
  const urlDecodeBtn = document.getElementById('btn-url-decode');
  const htmlEncodeBtn = document.getElementById('btn-html-encode');
  const htmlDecodeBtn = document.getElementById('btn-html-decode');
  const markdownBtn = document.getElementById('btn-markdown');
  
  if (urlEncodeBtn) {
    urlEncodeBtn.addEventListener('click', () => {
      const input = document.getElementById('utilities-input').value;
      if (!input) return;
      document.getElementById('code-output').value = encodeURIComponent(input);
      showOutputContainer('code');
      showToast(translations[currentLang].toastConverted);
    });
  }
  
  if (urlDecodeBtn) {
    urlDecodeBtn.addEventListener('click', () => {
      const input = document.getElementById('utilities-input').value;
      if (!input) return;
      try {
        document.getElementById('code-output').value = decodeURIComponent(input);
        showOutputContainer('code');
        showToast(translations[currentLang].toastConverted);
      } catch (err) {
        showToast(translations[currentLang].toastError + err.message);
      }
    });
  }
  
  if (htmlEncodeBtn) {
    htmlEncodeBtn.addEventListener('click', () => {
      const input = document.getElementById('utilities-input').value;
      if (!input) return;
      document.getElementById('code-output').value = escapeHTML(input);
      showOutputContainer('code');
      showToast(translations[currentLang].toastConverted);
    });
  }
  
  if (htmlDecodeBtn) {
    htmlDecodeBtn.addEventListener('click', () => {
      const input = document.getElementById('utilities-input').value;
      if (!input) return;
      document.getElementById('code-output').value = unescapeHTML(input);
      showOutputContainer('code');
      showToast(translations[currentLang].toastConverted);
    });
  }
  
  if (markdownBtn) {
    markdownBtn.addEventListener('click', () => {
      const input = document.getElementById('utilities-input').value;
      if (!input) return;
      
      const renderedHTML = renderMarkdown(input);
      
      const isPremium = typeof checkIsPremium === 'function' ? checkIsPremium() : false;
      const includeWatermark = (document.getElementById('chk-watermark') && document.getElementById('chk-watermark').checked) || !isPremium;
      
      let finalMarkdownHTML = renderedHTML;
      if (includeWatermark) {
        finalMarkdownHTML += '\n' + watermarkCode.trim();
      }
      document.getElementById('code-output').value = finalMarkdownHTML;
      
      // Inject visual styling + rendering inside the preview sandbox iframe
      const iframe = document.getElementById('preview-frame');
      if (iframe) {
        const styledDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #e2e8f0;
      background-color: #0b0f19;
      line-height: 1.6;
      padding: 30px;
    }
    h1, h2, h3 {
      color: #06b6d4;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 800;
    }
    h1 { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; font-size: 1.8rem; }
    h2 { font-size: 1.4rem; }
    h3 { font-size: 1.1rem; }
    p { margin-bottom: 1em; }
    code {
      font-family: 'Fira Code', monospace;
      background: rgba(255,255,255,0.06);
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 0.88em;
      color: #f472b6;
    }
    pre {
      background: #0f172a;
      border: 1px solid rgba(255,255,255,0.08);
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5em 0;
    }
    pre code {
      background: none;
      padding: 0;
      color: #38bdf8;
    }
    ul {
      padding-left: 20px;
      margin-bottom: 1em;
    }
    li {
      margin-bottom: 0.5em;
    }
  </style>
</head>
<body>
  ${renderedHTML}
  ${includeWatermark ? watermarkCode : ''}
</body>
</html>
        `;
        iframe.srcdoc = styledDoc;
      }
      
      showOutputContainer('code');
      showToast(translations[currentLang].toastMarkdownSuccess);
    });
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function unescapeHTML(str) {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent || str;
}

// Custom Markdown Engine
function renderMarkdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const result = [];
  let inList = false;
  let inCodeBlock = false;
  let codeBlockContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = escapeHTML(codeBlockContent.join('\n'));
        result.push(`<pre><code>${codeText}</code></pre>`);
        codeBlockContent = [];
      } else {
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }
    
    const trimmed = line.trim();
    
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.substring(2);
      const parsedContent = parseInlineMarkdown(content);
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(`  <li>${parsedContent}</li>`);
      continue;
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
    }
    
    if (trimmed.startsWith('# ')) {
      result.push(`<h1>${parseInlineMarkdown(trimmed.substring(2))}</h1>`);
    } else if (trimmed.startsWith('## ')) {
      result.push(`<h2>${parseInlineMarkdown(trimmed.substring(3))}</h2>`);
    } else if (trimmed.startsWith('### ')) {
      result.push(`<h3>${parseInlineMarkdown(trimmed.substring(4))}</h3>`);
    } else if (trimmed === '') {
      result.push('<br>');
    } else {
      result.push(`<p>${parseInlineMarkdown(trimmed)}</p>`);
    }
  }
  
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('\n').replace(/<br>\n<br>/g, '<br>');
}

function parseInlineMarkdown(text) {
  let html = escapeHTML(text);
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  return html;
}

// -------------------------------------------------------------
// Cryptographic Hash Generator logic
// -------------------------------------------------------------
function setupHashGenerator() {
  const inputEl = document.getElementById('hash-input');
  const generateBtn = document.getElementById('btn-hash-generate');
  
  if (!inputEl) return;
  
  async function updateHashes() {
    const text = inputEl.value;
    
    // MD5
    const md5Hex = md5(text || "");
    const md5El = document.getElementById('hash-md5');
    if (md5El) {
      md5El.textContent = text ? md5Hex : "—";
      if (text) md5El.classList.add('filled');
      else md5El.classList.remove('filled');
    }
    
    // SHA-1
    const sha1El = document.getElementById('hash-sha1');
    if (sha1El) {
      if (text) {
        try {
          const res = await digestMessage(text, 'SHA-1');
          sha1El.textContent = res;
          sha1El.classList.add('filled');
        } catch (e) {
          sha1El.textContent = "Error";
        }
      } else {
        sha1El.textContent = "—";
        sha1El.classList.remove('filled');
      }
    }
    
    // SHA-256
    const sha256El = document.getElementById('hash-sha256');
    if (sha256El) {
      if (text) {
        try {
          const res = await digestMessage(text, 'SHA-256');
          sha256El.textContent = res;
          sha256El.classList.add('filled');
        } catch (e) {
          sha256El.textContent = "Error";
        }
      } else {
        sha256El.textContent = "—";
        sha256El.classList.remove('filled');
      }
    }
    
    // SHA-384
    const sha384El = document.getElementById('hash-sha384');
    if (sha384El) {
      if (text) {
        try {
          const res = await digestMessage(text, 'SHA-384');
          sha384El.textContent = res;
          sha384El.classList.add('filled');
        } catch (e) {
          sha384El.textContent = "Error";
        }
      } else {
        sha384El.textContent = "—";
        sha384El.classList.remove('filled');
      }
    }
    
    // SHA-512
    const sha512El = document.getElementById('hash-sha512');
    if (sha512El) {
      if (text) {
        try {
          const res = await digestMessage(text, 'SHA-512');
          sha512El.textContent = res;
          sha512El.classList.add('filled');
        } catch (e) {
          sha512El.textContent = "Error";
        }
      } else {
        sha512El.textContent = "—";
        sha512El.classList.remove('filled');
      }
    }
  }
  
  inputEl.addEventListener('input', updateHashes);
  if (generateBtn) {
    generateBtn.addEventListener('click', updateHashes);
  }
  
  // Set up copy handlers for the cryptographic hashes
  document.querySelectorAll('.hash-row .btn-copy-hash').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const valEl = document.getElementById(targetId);
        if (valEl && valEl.textContent && valEl.textContent !== "—" && valEl.textContent !== "Error") {
          navigator.clipboard.writeText(valEl.textContent)
            .then(() => showToast(translations[currentLang].toastCopied))
            .catch(err => showToast(translations[currentLang].toastError + err.message));
        }
      }
    });
  });
  
  // Initial run
  updateHashes();
}

async function digestMessage(message, algo) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Pure JS MD5 Implementation
function md5(string) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }
  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }
  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b,c,d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  
  var x = [];
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;
  
  string = unescape(encodeURIComponent(string));
  var lMessageLength = string.length;
  var lNumberOfWords_temp1 = lMessageLength + 8;
  var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
  var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
  var lWordArray = Array(lNumberOfWords);
  for (var i=0; i<lNumberOfWords; i++) lWordArray[i] = 0;
  var lByteCount = 0;
  while ( lByteCount < lMessageLength ) {
    var lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    var lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
    lByteCount++;
  }
  var lWordCount = (lByteCount - (lByteCount % 4)) / 4;
  var lBytePosition = (lByteCount % 4) * 8;
  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
  lWordArray[lNumberOfWords - 2] = lMessageLength * 8;
  lWordArray[lNumberOfWords - 1] = 0;
  
  x = lWordArray;
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  for (k=0; k<x.length; k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478); d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756); c=FF(c,d,a,b,x[k+2], S13,0x242070DB); b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF); d=FF(d,a,b,c,x[k+5], S12,0x4787C62A); c=FF(c,d,a,b,x[k+6], S13,0xA8304613); b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8); d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF); c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1); b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122); d=FF(d,a,b,c,x[k+13],S12,0xFD987193); c=FF(c,d,a,b,x[k+14],S13,0xA679438E); b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562); d=GG(d,a,b,c,x[k+6], S22,0xC040B340); c=GG(c,d,a,b,x[k+11],S23,0x265E5A51); b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D); d=GG(d,a,b,c,x[k+10],S22,0x02441453); c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681); b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6); d=GG(d,a,b,c,x[k+14],S22,0xC33707D6); c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87); b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905); d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8); c=GG(c,d,a,b,x[k+7], S23,0x676F02D9); b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942); d=HH(d,a,b,c,x[k+8], S32,0x8771F681); c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122); b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44); d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9); c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60); b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6); d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA); c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085); b=HH(b,c,d,a,x[k+6], S34,0x04881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039); d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5); c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8); b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244); d=II(d,a,b,c,x[k+7], S42,0x432AFF97); c=II(c,d,a,b,x[k+14],S43,0xAB9423A7); b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3); d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92); c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D); b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F); d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0); c=II(c,d,a,b,x[k+6], S43,0xA3014314); b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82); d=II(d,a,b,c,x[k+11],S42,0xBD3AF235); c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB); b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
  }
  
  function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  }
  return (WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d)).toLowerCase();
}

// -------------------------------------------------------------
// Color Converter & Palette Generator logic
// -------------------------------------------------------------
function setupColorConverter() {
  const picker = document.getElementById('color-picker');
  const textInput = document.getElementById('color-hex-input');
  const preview = document.getElementById('color-preview-block');
  
  if (!picker || !textInput) return;
  
  function updateColors(hex) {
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      return;
    }
    
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    picker.value = hex;
    textInput.value = hex;
    if (preview) preview.style.backgroundColor = hex;
    
    // Outputs
    const outHexEl = document.getElementById('out-hex');
    if (outHexEl) outHexEl.value = hex.toLowerCase();
    
    const rgb = hexToRgb(hex);
    const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '—';
    const outRgbEl = document.getElementById('out-rgb');
    if (outRgbEl) outRgbEl.value = rgbStr;
    
    const hsl = hexToHsl(hex);
    const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '—';
    const outHslEl = document.getElementById('out-hsl');
    if (outHslEl) outHslEl.value = hslStr;
    
    const cssVar = `--color-primary: ${hex.toLowerCase()};`;
    const outCssEl = document.getElementById('out-cssvar');
    if (outCssEl) outCssEl.value = cssVar;
    
    // Generate Palette
    generatePalette(hex);
  }
  
  picker.addEventListener('input', (e) => updateColors(e.target.value));
  textInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length === 7 || val.length === 4) {
      updateColors(val);
    }
  });
  
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  
  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  
  function generatePalette(hex) {
    const hsl = hexToHsl(hex);
    if (!hsl) return;
    
    const paletteSwatches = document.getElementById('palette-swatches');
    if (!paletteSwatches) return;
    
    paletteSwatches.innerHTML = '';
    
    const colors = [
      hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
      hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 10)),
      hex,
      hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
      hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
    ];
    
    colors.forEach(col => {
      const swatch = document.createElement('div');
      swatch.className = 'palette-swatch';
      swatch.style.backgroundColor = col;
      swatch.setAttribute('data-hex', col.toLowerCase());
      swatch.title = col;
      swatch.addEventListener('click', () => updateColors(col));
      
      const label = document.createElement('span');
      label.className = 'palette-swatch-label';
      label.textContent = col.toLowerCase();
      swatch.appendChild(label);
      
      paletteSwatches.appendChild(swatch);
    });
  }
  
  document.querySelectorAll('.color-field-row .btn-copy-hash').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInputId = btn.getAttribute('data-target-input');
      if (targetInputId) {
        const inputEl = document.getElementById(targetInputId);
        if (inputEl && inputEl.value && inputEl.value !== "—") {
          navigator.clipboard.writeText(inputEl.value)
            .then(() => showToast(translations[currentLang].toastCopied))
            .catch(err => showToast(translations[currentLang].toastError + err.message));
        }
      }
    });
  });

  updateColors(picker.value);
}

// -------------------------------------------------------------
// Live Regex Tester logic
// -------------------------------------------------------------
function setupRegexTester() {
  const patternInput = document.getElementById('regex-pattern');
  const flagsInput = document.getElementById('regex-flags');
  const testInput = document.getElementById('regex-test-input');
  const matchCount = document.getElementById('regex-match-count');
  const errorMsg = document.getElementById('regex-error-msg');
  const highlightedBox = document.getElementById('regex-highlighted');
  
  if (!patternInput || !testInput) return;
  
  function testRegex() {
    const pattern = patternInput.value;
    const flags = flagsInput.value;
    const text = testInput.value;
    
    errorMsg.textContent = '';
    matchCount.textContent = translations[currentLang].regexNoMatches;
    highlightedBox.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');
    
    if (!pattern) return;
    
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      
      let matches = [];
      let match;
      let lastIndex = 0;
      let securityCounter = 0;
      
      while ((match = re.exec(text)) !== null) {
        if (re.lastIndex === lastIndex) {
          re.lastIndex++;
        }
        lastIndex = re.lastIndex;
        
        matches.push({
          index: match.index,
          text: match[0]
        });
        
        if (++securityCounter > 5000) break;
      }
      
      const count = matches.length;
      if (count === 1) {
        matchCount.textContent = `1 ${translations[currentLang].regexMatch}`;
      } else {
        matchCount.textContent = `${count} ${translations[currentLang].regexMatches}`;
      }
      
      if (count > 0) {
        let htmlText = text;
        for (let i = matches.length - 1; i >= 0; i--) {
          const m = matches[i];
          if (m.text.length === 0) continue;
          
          const before = htmlText.substring(0, m.index);
          const after = htmlText.substring(m.index + m.text.length);
          htmlText = before + `[[[MARK_START]]]${m.text}[[[MARK_END]]]` + after;
        }
        
        let finalHtml = escapeHTML(htmlText);
        finalHtml = finalHtml.replace(/\[\[\[MARK_START\]\]\]/g, '<mark class="regex-match">');
        finalHtml = finalHtml.replace(/\[\[\[MARK_END\]\]\]/g, '</mark>');
        finalHtml = finalHtml.replace(/\n/g, '<br>');
        
        highlightedBox.innerHTML = finalHtml;
      }
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  }
  
  patternInput.addEventListener('input', testRegex);
  flagsInput.addEventListener('input', testRegex);
  testInput.addEventListener('input', testRegex);
  
  testInput.addEventListener('scroll', () => {
    highlightedBox.scrollTop = testInput.scrollTop;
  });
  
  testRegex();
}

// -------------------------------------------------------------
// JWT Token Decoder logic
// -------------------------------------------------------------
function setupJWTDecoder() {
  const inputEl = document.getElementById('jwt-input');
  const decodeBtn = document.getElementById('btn-jwt-decode');
  const segmentsContainer = document.getElementById('jwt-segments');
  const headerOut = document.getElementById('jwt-header-out');
  const payloadOut = document.getElementById('jwt-payload-out');
  const sigOut = document.getElementById('jwt-sig-out');
  
  if (!inputEl || !decodeBtn) return;
  
  function decodeJWT() {
    const token = inputEl.value.trim();
    if (!token) return;
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      showToast(translations[currentLang].toastJwtFormatError);
      if (segmentsContainer) segmentsContainer.style.display = 'none';
      return;
    }
    
    try {
      const headerDecoded = base64UrlDecode(parts[0]);
      const payloadDecoded = base64UrlDecode(parts[1]);
      const signatureHex = parts[2];
      
      headerOut.textContent = JSON.stringify(JSON.parse(headerDecoded), null, 2);
      payloadOut.textContent = JSON.stringify(JSON.parse(payloadDecoded), null, 2);
      sigOut.textContent = signatureHex;
      
      if (segmentsContainer) segmentsContainer.style.display = 'block';
      showToast(translations[currentLang].toastJwtSuccess);
    } catch (err) {
      showToast(translations[currentLang].toastError + err.message);
      if (segmentsContainer) segmentsContainer.style.display = 'none';
    }
  }
  
  function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  }
  
  decodeBtn.addEventListener('click', decodeJWT);
}

// -------------------------------------------------------------
// Text Diff Viewer logic
// -------------------------------------------------------------
function setupDiffViewer() {
  const origText = document.getElementById('diff-original');
  const modText = document.getElementById('diff-modified');
  const compareBtn = document.getElementById('btn-diff-compare');
  const diffOutput = document.getElementById('diff-output');
  
  if (!origText || !modText || !compareBtn) return;
  
  function computeDiff() {
    const original = origText.value.split('\n');
    const modified = modText.value.split('\n');
    
    const diff = diffLines(original, modified);
    
    diffOutput.innerHTML = '';
    
    let addedCount = 0;
    let removedCount = 0;

    const statDiv = document.createElement('div');
    statDiv.className = 'diff-stat';
    
    diff.forEach(item => {
      const div = document.createElement('div');
      div.className = `diff-line ${item.type}`;
      
      if (item.type === 'added') addedCount++;
      if (item.type === 'removed') removedCount++;

      const numSpan = document.createElement('span');
      numSpan.className = 'diff-num';
      numSpan.textContent = item.type === 'added' ? '+' : (item.type === 'removed' ? '-' : ' ');
      
      const contentSpan = document.createElement('span');
      contentSpan.className = 'diff-content';
      contentSpan.textContent = item.text || ' ';
      
      div.appendChild(numSpan);
      div.appendChild(contentSpan);
      diffOutput.appendChild(div);
    });
    
    const langAdded = currentLang === 'en' ? 'additions' : 'ajouts';
    const langRemoved = currentLang === 'en' ? 'deletions' : 'suppressions';
    statDiv.innerHTML = `<span class="added-count">+ ${addedCount} ${langAdded}</span><span class="removed-count">- ${removedCount} ${langRemoved}</span>`;
    
    diffOutput.insertBefore(statDiv, diffOutput.firstChild);
    showOutputContainer('diff');
  }
  
  function diffLines(orig, mod) {
    const M = orig.length;
    const N = mod.length;
    const dp = Array(M + 1).fill(null).map(() => Array(N + 1).fill(0));
    
    for (let i = 1; i <= M; i++) {
      for (let j = 1; j <= N; j++) {
        if (orig[i - 1] === mod[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    
    const result = [];
    let i = M, j = N;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && orig[i - 1] === mod[j - 1]) {
        result.unshift({ type: 'unchanged', text: orig[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.unshift({ type: 'added', text: mod[j - 1] });
        j--;
      } else {
        result.unshift({ type: 'removed', text: orig[i - 1] });
        i--;
      }
    }
    
    return result;
  }
  
  compareBtn.addEventListener('click', computeDiff);
}

// -------------------------------------------------------------
// Universal Copy Actions
// -------------------------------------------------------------
function setupUniversalCopyButtons() {
  const copyOutputBtn = document.getElementById('btn-copy-output');
  if (copyOutputBtn) {
    copyOutputBtn.addEventListener('click', () => {
      let textToCopy = "";
      let msg = "";
      
      const playContainer = document.getElementById('container-playground');
      const b64Container = document.getElementById('container-base64');
      const codeContainer = document.getElementById('container-code');
      const diffContainer = document.getElementById('container-diff');
      
      if (playContainer.classList.contains('active')) {
        textToCopy = generatePlaygroundOutput();
        msg = currentLang === 'en' ? "Copied combined HTML code!" : "Code HTML combiné copié !";
      } else if (b64Container.classList.contains('active')) {
        textToCopy = document.getElementById('embed-datauri').value;
        msg = currentLang === 'en' ? "Copied Data URI!" : "Data URI copié !";
      } else if (diffContainer.classList.contains('active')) {
        const lines = [];
        document.querySelectorAll('#diff-output .diff-line').forEach(line => {
          const prefix = line.classList.contains('added') ? '+ ' : (line.classList.contains('removed') ? '- ' : '  ');
          const content = line.querySelector('.diff-content').textContent;
          lines.push(prefix + content);
        });
        textToCopy = lines.join('\n');
        msg = currentLang === 'en' ? "Copied diff output text!" : "Texte diff copié !";
      } else if (codeContainer.classList.contains('active')) {
        textToCopy = document.getElementById('code-output').value;
        msg = translations[currentLang].toastCopied;
      }
      
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => showToast(msg))
          .catch(err => showToast(translations[currentLang].toastError + err.message));
      }
    });
  }
  
  document.querySelectorAll('.btn-copy-embed').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl && targetEl.value) {
        navigator.clipboard.writeText(targetEl.value)
          .then(() => showToast(translations[currentLang].toastCopied))
          .catch(err => showToast(translations[currentLang].toastError + err.message));
      }
    });
  });
}

// -------------------------------------------------------------
// Utilities Sub-tab Switching
// -------------------------------------------------------------
function setupUtilitiesSubtabs() {
  const subtabs = document.querySelectorAll('#utilities-subtabs .subtab-btn');
  const subcontents = document.querySelectorAll('.util-subcontent');

  subtabs.forEach(btn => {
    btn.addEventListener('click', () => {
      subtabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-util-tab');
      subcontents.forEach(sc => sc.classList.add('hidden'));
      const targetEl = document.getElementById('util-' + target);
      if (targetEl) targetEl.classList.remove('hidden');
    });
  });
}

// -------------------------------------------------------------
// UUID v4 Generator
// -------------------------------------------------------------
function setupUUIDGenerator() {
  const genBtn = document.getElementById('btn-uuid-gen');
  if (!genBtn) return;

  genBtn.addEventListener('click', () => {
    const countEl = document.getElementById('uuid-count');
    const count = Math.min(100, Math.max(1, parseInt(countEl.value) || 1));
    const uuids = [];
    for (let i = 0; i < count; i++) {
      uuids.push(generateUUID());
    }
    document.getElementById('code-output').value = uuids.join('\n');
    showOutputContainer('code');
    const msg = currentLang === 'en'
      ? `Generated ${count} UUID${count > 1 ? 's' : ''}!`
      : `${count} UUID${count > 1 ? 's' : ''} généré${count > 1 ? 's' : ''} !`;
    showToast(msg);
  });
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f);
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// -------------------------------------------------------------
// Password / Token Generator
// -------------------------------------------------------------
function setupPasswordGenerator() {
  const genBtn = document.getElementById('btn-pass-gen');
  const lengthSlider = document.getElementById('pass-length');
  const lengthVal = document.getElementById('pass-len-val');

  if (!genBtn || !lengthSlider) return;

  lengthSlider.addEventListener('input', () => {
    lengthVal.textContent = lengthSlider.value;
  });

  genBtn.addEventListener('click', () => {
    const useUpper = document.getElementById('pass-upper').checked;
    const useLower = document.getElementById('pass-lower').checked;
    const useNumbers = document.getElementById('pass-numbers').checked;
    const useSymbols = document.getElementById('pass-symbols').checked;
    const length = parseInt(lengthSlider.value) || 16;

    let charset = '';
    if (useUpper)   charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower)   charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (!charset) {
      showToast(currentLang === 'en' ? 'Select at least one character type!' : 'Sélectionnez au moins un type de caractère !');
      return;
    }

    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    const password = Array.from(array)
      .map(b => charset[b % charset.length])
      .join('');

    document.getElementById('code-output').value = password;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Password generated!' : 'Mot de passe généré !');
  });
}

// -------------------------------------------------------------
// CSS Glassmorphism Generator
// -------------------------------------------------------------
function setupGlassmorphismGenerator() {
  const blurSlider     = document.getElementById('glass-blur');
  const opacitySlider  = document.getElementById('glass-opacity');
  const satSlider      = document.getElementById('glass-saturation');
  const borderSlider   = document.getElementById('glass-border-op');
  const colorPicker    = document.getElementById('glass-color');
  const card           = document.getElementById('glass-preview-card');

  if (!blurSlider || !card) return;

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return { r, g, b };
  }

  function updateGlass() {
    const blur    = blurSlider.value;
    const opacity = opacitySlider.value;
    const sat     = satSlider.value;
    const borderOp = borderSlider.value;
    const hex     = colorPicker.value;
    const rgb     = hexToRgb(hex);

    document.getElementById('blur-val').textContent     = blur + 'px';
    document.getElementById('opacity-val').textContent  = opacity + '%';
    document.getElementById('saturation-val').textContent = sat + '%';
    document.getElementById('border-op-val').textContent  = borderOp + '%';

    const bgAlpha     = (parseInt(opacity) / 100).toFixed(2);
    const borderAlpha = (parseInt(borderOp) / 100).toFixed(2);

    const cardStyle = [
      `background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgAlpha})`,
      `backdrop-filter: blur(${blur}px) saturate(${sat}%)`,
      `-webkit-backdrop-filter: blur(${blur}px) saturate(${sat}%)`,
      `border: 1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${borderAlpha})`,
      `border-radius: 10px`,
    ].join('; ');

    card.style.cssText = cardStyle + '; display:flex; justify-content:center; align-items:center; font-size:0.72rem; font-weight:700; color:white; text-shadow:0 1px 3px rgba(0,0,0,0.6); transition:all 0.1s ease;';

    const cssOutput = [
      `.glass {`,
      `  background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgAlpha});`,
      `  backdrop-filter: blur(${blur}px) saturate(${sat}%);`,
      `  -webkit-backdrop-filter: blur(${blur}px) saturate(${sat}%);`,
      `  border: 1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${borderAlpha});`,
      `  border-radius: 12px;`,
      `}`,
    ].join('\n');

    document.getElementById('code-output').value = cssOutput;
    showOutputContainer('code');
  }

  blurSlider.addEventListener('input', updateGlass);
  opacitySlider.addEventListener('input', updateGlass);
  satSlider.addEventListener('input', updateGlass);
  borderSlider.addEventListener('input', updateGlass);
  colorPicker.addEventListener('input', updateGlass);

  // Run once on load to show initial state
  updateGlass();
}

// -------------------------------------------------------------
// CSS Gradient Builder
// -------------------------------------------------------------
let gradientStops = [
  { color: '#00f2fe', position: 0 },
  { color: '#4facfe', position: 100 }
];

const GRADIENT_PRESETS = [
  { name: 'Aurora', type: 'linear', angle: 135, stops: [{ color: '#00f2fe', position: 0 }, { color: '#4facfe', position: 100 }] },
  { name: 'Sunset', type: 'linear', angle: 135, stops: [{ color: '#ff0844', position: 0 }, { color: '#ffb199', position: 100 }] },
  { name: 'Ocean', type: 'linear', angle: 135, stops: [{ color: '#43e97b', position: 0 }, { color: '#38f9d7', position: 100 }] },
  { name: 'Fire', type: 'linear', angle: 135, stops: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }] },
  { name: 'Nebula', type: 'linear', angle: 135, stops: [{ color: '#f857a6', position: 0 }, { color: '#ff5858', position: 100 }] },
  { name: 'Cyberpunk', type: 'linear', angle: 135, stops: [{ color: '#f72585', position: 0 }, { color: '#7209b7', position: 50 }, { color: '#4361ee', position: 100 }] }
];

function setupGradientBuilder() {
  const typeSelect = document.getElementById('gradient-type');
  const angleSlider = document.getElementById('gradient-angle');
  const angleVal = document.getElementById('gradient-angle-val');
  const angleContainer = document.getElementById('gradient-angle-container');
  const addStopBtn = document.getElementById('btn-gradient-add-stop');
  
  if (!typeSelect) return;

  typeSelect.addEventListener('change', () => {
    if (typeSelect.value === 'linear') {
      angleContainer.style.display = 'block';
    } else {
      angleContainer.style.display = 'none';
    }
    updateGradient();
  });

  angleSlider.addEventListener('input', () => {
    angleVal.textContent = angleSlider.value + '°';
    updateGradient();
  });

  addStopBtn.addEventListener('click', () => {
    if (gradientStops.length >= 6) {
      showToast(currentLang === 'en' ? "Max 6 color stops allowed!" : "Maximum 6 points de couleur autorisés !");
      return;
    }
    const lastStop = gradientStops[gradientStops.length - 1];
    const newPos = Math.min(100, lastStop.position + 15);
    gradientStops.push({ color: '#ff5858', position: newPos });
    renderGradientStops();
    updateGradient();
  });

  renderGradientPresets();
  renderGradientStops();
  updateGradient();
}

function renderGradientPresets() {
  const container = document.getElementById('gradient-presets');
  if (!container) return;
  container.innerHTML = '';
  GRADIENT_PRESETS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'gradient-preset-btn';
    btn.title = p.name;
    const cssStops = p.stops.map(s => `${s.color} ${s.position}%`).join(', ');
    btn.style.background = `linear-gradient(135deg, ${cssStops})`;
    btn.addEventListener('click', () => {
      document.getElementById('gradient-type').value = p.type;
      document.getElementById('gradient-angle').value = p.angle;
      document.getElementById('gradient-angle-val').textContent = p.angle + '°';
      gradientStops = JSON.parse(JSON.stringify(p.stops));
      
      const angleContainer = document.getElementById('gradient-angle-container');
      if (p.type === 'linear') {
        angleContainer.style.display = 'block';
      } else {
        angleContainer.style.display = 'none';
      }
      
      renderGradientStops();
      updateGradient();
    });
    container.appendChild(btn);
  });
}

function renderGradientStops() {
  const list = document.getElementById('gradient-stops-list');
  if (!list) return;
  list.innerHTML = '';

  gradientStops.forEach((stop, index) => {
    const row = document.createElement('div');
    row.className = 'gradient-stop-row';

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = stop.color;
    colorPicker.className = 'gradient-stop-color';
    colorPicker.addEventListener('input', (e) => {
      stop.color = e.target.value;
      updateGradient();
    });

    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '100';
    range.value = stop.position;
    range.className = 'gradient-stop-pos';
    range.addEventListener('input', (e) => {
      stop.position = parseInt(e.target.value);
      posText.textContent = stop.position + '%';
      updateGradient();
    });

    const posText = document.createElement('span');
    posText.className = 'gradient-stop-pos-text';
    posText.textContent = stop.position + '%';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-stop-delete';
    delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    if (gradientStops.length <= 2) {
      delBtn.style.opacity = '0.3';
      delBtn.style.cursor = 'not-allowed';
    } else {
      delBtn.addEventListener('click', () => {
        gradientStops.splice(index, 1);
        renderGradientStops();
        updateGradient();
      });
    }

    row.appendChild(colorPicker);
    row.appendChild(range);
    row.appendChild(posText);
    row.appendChild(delBtn);
    list.appendChild(row);
  });
}

function updateGradient() {
  const type = document.getElementById('gradient-type').value;
  const angle = document.getElementById('gradient-angle').value;
  const card = document.getElementById('gradient-preview-card');
  const codeOutput = document.getElementById('code-output');

  if (!card) return;

  const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);
  const stopStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  let cssValue = '';
  if (type === 'linear') {
    cssValue = `linear-gradient(${angle}deg, ${stopStr})`;
  } else if (type === 'radial') {
    cssValue = `radial-gradient(circle, ${stopStr})`;
  } else if (type === 'conic') {
    cssValue = `conic-gradient(from 180deg, ${stopStr})`;
  }

  card.style.background = cssValue;
  
  const outputCode = [
    `.gradient-box {`,
    `  background: ${cssValue};`,
    `}`
  ].join('\n');

  if (activeTab === 'gradient') {
    codeOutput.value = outputCode;
    showOutputContainer('code');
  }
}

// -------------------------------------------------------------
// QR Code Generator Logic (Offline Kazuhiko Arase QR Code)
// -------------------------------------------------------------
function setupQRGenerator() {
  const input = document.getElementById('qrcode-input');
  const sizeInput = document.getElementById('qrcode-size');
  const eccSelect = document.getElementById('qrcode-ecc');
  const fgPicker = document.getElementById('qrcode-fg');
  const fgHex = document.getElementById('qrcode-fg-hex');
  const bgPicker = document.getElementById('qrcode-bg');
  const bgHex = document.getElementById('qrcode-bg-hex');
  const genBtn = document.getElementById('btn-qrcode-gen');
  const downloadBtn = document.getElementById('btn-qrcode-download');
  const canvas = document.getElementById('qrcode-canvas');
  const canvasContainer = document.getElementById('qrcode-canvas-container');
  const placeholder = document.getElementById('qrcode-placeholder');

  if (!input) return;

  fgPicker.addEventListener('input', () => { fgHex.value = fgPicker.value; });
  fgHex.addEventListener('input', () => { if (/^#[0-9A-F]{6}$/i.test(fgHex.value)) fgPicker.value = fgHex.value; });
  bgPicker.addEventListener('input', () => { bgHex.value = bgPicker.value; });
  bgHex.addEventListener('input', () => { if (/^#[0-9A-F]{6}$/i.test(bgHex.value)) bgPicker.value = bgHex.value; });

  genBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      showToast(currentLang === 'en' ? 'Please enter some text!' : 'Veuillez saisir du texte !');
      return;
    }

    try {
      const ecc = eccSelect.value;
      const size = parseInt(sizeInput.value) || 256;
      const fg = fgPicker.value;
      const bg = bgPicker.value;

      let version = 1;
      const len = text.length;
      if (len > 120) version = 10;
      else if (len > 80) version = 8;
      else if (len > 50) version = 6;
      else if (len > 30) version = 4;
      else if (len > 14) version = 2;

      const qr = new QRCodeLib(version, ecc);
      qr.addData(text);
      qr.make();

      canvasContainer.style.display = 'block';
      placeholder.style.display = 'none';
      downloadBtn.style.display = 'block';

      drawQRCode(qr, canvas, size, fg, bg);

      const dataUri = canvas.toDataURL('image/png');
      document.getElementById('code-output').value = dataUri;
      if (activeTab === 'qrcode') {
        showOutputContainer('code');
      }
      showToast(currentLang === 'en' ? 'QR Code generated!' : 'Code QR généré !');
    } catch (e) {
      showToast(translations[currentLang].toastError + e.message);
    }
  });

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function drawQRCode(qr, canvas, size, fgColor, bgColor) {
  const ctx = canvas.getContext('2d');
  const count = qr.getModuleCount();
  const scale = size / count;
  canvas.width = size;
  canvas.height = size;
  
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  
  ctx.fillStyle = fgColor;
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(Math.round(c * scale), Math.round(r * scale), Math.ceil(scale), Math.ceil(scale));
      }
    }
  }
}

function QRCodeLib(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = [];
}
QRCodeLib.prototype = {
  addData: function(data) {
    this.dataList.push(new QR8BitByte(data));
    this.dataCache = null;
  },
  isDark: function(row, col) {
    return this.modules[row][col];
  },
  getModuleCount: function() {
    return this.moduleCount;
  },
  make: function() {
    this.makeImpl(false, 0);
  },
  makeImpl: function(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
      for (var col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }
    if (this.dataCache == null) {
      this.dataCache = QRCodeLib.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  setupPositionProbePattern: function(row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  setupPositionAdjustPattern: function() {
    var pos = QRPatternPosition.getPatternPosition(this.typeNumber);
    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];
        if (this.modules[row][col] != null) continue;
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (Math.abs(r) == 2 || Math.abs(c) == 2 || (r == 0 && c == 0)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTimingPattern: function() {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) continue;
      this.modules[r][6] = (r % 2 == 0);
    }
    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) continue;
      this.modules[6][c] = (c % 2 == 0);
    }
  },
  setupTypeInfo: function(test, maskPattern) {
    var data = (QRErrorCorrectLevel[this.errorCorrectLevel] << 3) | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);
    for (var i = 0; i < 15; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      if (i < 6) this.modules[i][8] = mod;
      else if (i < 8) this.modules[i + 1][8] = mod;
      else this.modules[this.moduleCount - 15 + i][8] = mod;
    }
    for (var i = 0; i < 15; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
      else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
      else this.modules[8][15 - i - 1] = mod;
    }
    this.modules[this.moduleCount - 8][8] = (!test);
  },
  setupTypeNumber: function(test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (var i = 0; i < 18; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  mapData: function(data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      while (true) {
        for (var c = 0; c < 2; c++) {
          var targetCol = col - c;
          if (this.modules[row][targetCol] == null) {
            var dark = false;
            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
            }
            if ((row + targetCol) % 2 == 0) {
              dark = !dark;
            }
            this.modules[row][targetCol] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};
QRCodeLib.createData = function(typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBuffer();
  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }
  var totalDataCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }
  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  }
  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }
  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) break;
    buffer.put(170, 8);
    if (buffer.getLengthInBits() >= totalDataCount * 8) break;
    buffer.put(20, 8);
  }
  return QRCodeLib.createBytes(buffer, rsBlocks);
};
QRCodeLib.createBytes = function(buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcData = new Array(rsBlocks.length);
  var ecData = new Array(rsBlocks.length);
  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcData[r] = new Array(dcCount);
    for (var i = 0; i < dcData[r].length; i++) {
      dcData[r][i] = 0xff & buffer.buffer[i + offset];
    }
    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcData[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecData[r] = new Array(rsPoly.getLength() - 1);
    for (var i = 0; i < ecData[r].length; i++) {
      var modIndex = i + modPoly.getLength() - ecData[r].length;
      ecData[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
    }
  }
  var totalCodeCount = 0;
  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }
  var data = new Array(totalCodeCount);
  var index = 0;
  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }
  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecData[r].length) {
        data[index++] = ecData[r][i];
      }
    }
  }
  return data;
};
function QR8BitByte(data) {
  this.mode = 4;
  this.data = data;
}
QR8BitByte.prototype = {
  getLength: function() { return this.data.length; },
  write: function(buffer) {
    for (var i = 0; i < this.data.length; i++) {
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
};
var QRErrorCorrectLevel = { 'L': 1, 'M': 0, 'Q': 3, 'H': 2 };
var QRPatternPosition = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54]
  ],
  getPatternPosition: function(version) {
    return this.PATTERN_POSITION_TABLE[version - 1] || [];
  }
};
var QRUtil = {
  getBCHTypeInfo: function(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(21505) >= 0) {
      d ^= (21505 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(21505)));
    }
    return ((data << 10) | d) ^ 21505;
  },
  getBCHTypeNumber: function(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(7973) >= 0) {
      d ^= (7973 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(7973)));
    }
    return (data << 12) | d;
  },
  getBCHDigit: function(data) {
    var digit = 0;
    while (data != 0) { digit++; data >>>= 1; }
    return digit;
  },
  getLengthInBits: function(mode, type) {
    if (1 <= type && type < 10) {
      return 8;
    }
    return 16;
  },
  getErrorCorrectPolynomial: function(eccCount) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < eccCount; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  }
};
function QRBuffer() {
  this.buffer = [];
  this.length = 0;
}
QRBuffer.prototype = {
  get: function(index) {
    var bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
  },
  put: function(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) == 1);
    }
  },
  getLengthInBits: function() { return this.length; },
  putBit: function(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }
    this.length++;
  }
};

const QRRSBlock = {
  RS_BLOCK_TABLE: [
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 4, 34, 12],
    [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
    [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
    [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
    [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
    [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16]
  ],
  getRSBlocks: function(version, ecc) {
    const eccMap = { 'L': 0, 'M': 1, 'Q': 2, 'H': 3 };
    const offset = (version - 1) * 4 + eccMap[ecc];
    const data = this.RS_BLOCK_TABLE[offset];
    const list = [];
    for (let i = 0; i < data.length; i += 3) {
      const count = data[i];
      const totalCount = data[i + 1];
      const dataCount = data[i + 2];
      for (let j = 0; j < count; j++) {
        list.push({ totalCount, dataCount });
      }
    }
    return list;
  }
};

const QRMath = {
  glog: function(n) {
    if (n < 1) throw new Error("glog(" + n + ")");
    return LOG_TABLE[n];
  },
  gexp: function(n) {
    while (n < 0) n += 255;
    while (n >= 255) n -= 255;
    return EXP_TABLE[n];
  }
};
var EXP_TABLE = new Array(256);
var LOG_TABLE = new Array(256);
for (var i = 0; i < 8; i++) EXP_TABLE[i] = 1 << i;
for (var i = 8; i < 256; i++) EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
for (var i = 0; i < 255; i++) LOG_TABLE[EXP_TABLE[i]] = i;

function QRPolynomial(num, shift) {
  if (num.length === undefined) throw new Error(num.length + "/" + shift);
  var offset = 0;
  while (offset < num.length && num[offset] === 0) offset++;
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) this.num[i] = num[offset + i];
  for (var i = num.length - offset; i < this.num.length; i++) this.num[i] = 0;
}
QRPolynomial.prototype = {
  get: function(index) { return this.num[index]; },
  getLength: function() { return this.num.length; },
  multiply: function(e) {
    var num = new Array(this.getLength() + e.getLength() - 1);
    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  mod: function(e) {
    if (this.getLength() - e.getLength() < 0) return this;
    var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    var num = new Array(this.getLength());
    for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }
    return new QRPolynomial(num, 0).mod(e);
  }
};

// -------------------------------------------------------------
// Timestamp & Date Converter
// -------------------------------------------------------------
let countdownInterval = null;

function setupTimestampConverter() {
  const tsInput = document.getElementById('ts-input');
  const btnTsNow = document.getElementById('btn-ts-now');
  const btnTsConvert = document.getElementById('btn-ts-convert');
  const dateInput = document.getElementById('date-input');
  const btnDateConvert = document.getElementById('btn-date-convert');
  const diffDate1 = document.getElementById('diff-date1');
  const diffDate2 = document.getElementById('diff-date2');
  const btnTsCalcDiff = document.getElementById('btn-ts-calc-diff');
  const countdownTarget = document.getElementById('countdown-target');
  const countdownDisplay = document.getElementById('countdown-display');

  if (!tsInput) return;

  const now = new Date();
  const formatDateTime = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  dateInput.value = formatDateTime(now);
  diffDate1.value = formatDateTime(now);
  diffDate2.value = formatDateTime(new Date(now.getTime() + 86400000));
  countdownTarget.value = formatDateTime(new Date(now.getTime() + 3600000 * 2));

  btnTsNow.addEventListener('click', () => {
    tsInput.value = Math.floor(Date.now() / 1000);
  });

  btnTsConvert.addEventListener('click', () => {
    let val = tsInput.value.trim();
    if (!val) return;
    let ms = parseInt(val);
    if (isNaN(ms)) {
      showToast(currentLang === 'en' ? 'Invalid timestamp!' : 'Horodatage invalide !');
      return;
    }
    if (val.length <= 10) ms *= 1000;
    
    const d = new Date(ms);
    const result = [
      `UTC Date: ${d.toUTCString()}`,
      `Local Date: ${d.toString()}`,
      `ISO Format: ${d.toISOString()}`
    ].join('\n');

    document.getElementById('code-output').value = result;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Timestamp converted!' : 'Horodatage converti !');
  });

  btnDateConvert.addEventListener('click', () => {
    const val = dateInput.value;
    if (!val) return;
    const d = new Date(val);
    const seconds = Math.floor(d.getTime() / 1000);
    const ms = d.getTime();

    const result = [
      `Unix Timestamp (seconds): ${seconds}`,
      `Unix Timestamp (milliseconds): ${ms}`
    ].join('\n');

    document.getElementById('code-output').value = result;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Date converted!' : 'Date convertie !');
  });

  btnTsCalcDiff.addEventListener('click', () => {
    const d1 = new Date(diffDate1.value);
    const d2 = new Date(diffDate2.value);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      showToast(currentLang === 'en' ? 'Invalid dates!' : 'Dates invalides !');
      return;
    }

    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    const result = [
      `Difference:`,
      `- Days: ${diffDays}`,
      `- Hours: ${diffHours}`,
      `- Minutes: ${diffMins}`,
      `- Seconds: ${diffSecs}`,
      `- Milliseconds: ${diffMs}`
    ].join('\n');

    document.getElementById('code-output').value = result;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Difference calculated!' : 'Différence calculée !');
  });

  countdownTarget.addEventListener('input', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownDisplay.style.display = 'block';

    const updateCountdown = () => {
      const targetTime = new Date(countdownTarget.value).getTime();
      const nowTime = Date.now();
      const distance = targetTime - nowTime;

      if (isNaN(targetTime)) {
        countdownDisplay.textContent = 'Invalid date';
        clearInterval(countdownInterval);
        return;
      }

      if (distance < 0) {
        countdownDisplay.textContent = currentLang === 'en' ? 'Timer Expired!' : 'Temps écoulé !';
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
}

// -------------------------------------------------------------
// Number Base Converter
// -------------------------------------------------------------
function setupNumberBaseConverter() {
  const decInput = document.getElementById('nb-dec');
  const hexInput = document.getElementById('nb-hex');
  const binInput = document.getElementById('nb-bin');
  const octInput = document.getElementById('nb-oct');
  
  const bitA = document.getElementById('nb-bit-a');
  const bitB = document.getElementById('nb-bit-b');
  const bitOp = document.getElementById('nb-bit-op');
  const btnBitwise = document.getElementById('btn-nb-bitwise-calc');

  if (!decInput) return;

  function updateAll(value, base) {
    if (value === '') {
      decInput.value = '';
      hexInput.value = '';
      binInput.value = '';
      octInput.value = '';
      return;
    }
    
    let num = parseInt(value, base);
    if (isNaN(num)) return;

    if (base !== 10) decInput.value = num.toString(10);
    if (base !== 16) hexInput.value = num.toString(16).toUpperCase();
    if (base !== 2)  binInput.value = num.toString(2);
    if (base !== 8)  octInput.value = num.toString(8);
  }

  decInput.addEventListener('input', () => {
    let cleaned = decInput.value.replace(/[^0-9\-]/g, '');
    if (decInput.value !== cleaned) decInput.value = cleaned;
    updateAll(cleaned, 10);
  });

  hexInput.addEventListener('input', () => {
    let cleaned = hexInput.value.replace(/[^0-9A-Fa-f]/g, '');
    if (hexInput.value !== cleaned) hexInput.value = cleaned;
    updateAll(cleaned, 16);
  });

  binInput.addEventListener('input', () => {
    let cleaned = binInput.value.replace(/[^01]/g, '');
    if (binInput.value !== cleaned) binInput.value = cleaned;
    updateAll(cleaned, 2);
  });

  octInput.addEventListener('input', () => {
    let cleaned = octInput.value.replace(/[^0-7]/g, '');
    if (octInput.value !== cleaned) octInput.value = cleaned;
    updateAll(cleaned, 8);
  });

  btnBitwise.addEventListener('click', () => {
    const valA = bitA.value.trim();
    const valB = bitB.value.trim();
    const op = bitOp.value;

    let numA = parseAnyBase(valA);
    let numB = parseAnyBase(valB);

    if (isNaN(numA) || (op !== 'NOT' && isNaN(numB))) {
      showToast(currentLang === 'en' ? 'Invalid bitwise operands!' : 'Opérandes de calcul bit à bit invalides !');
      return;
    }

    let res = 0;
    if (op === 'AND') res = numA & numB;
    else if (op === 'OR')  res = numA | numB;
    else if (op === 'XOR') res = numA ^ numB;
    else if (op === 'SHL') res = numA << numB;
    else if (op === 'SHR') res = numA >> numB;

    const result = [
      `Bitwise Calculation:`,
      `Operand A: ${numA} (bin: ${numA.toString(2)})`,
      op !== 'NOT' ? `Operand B: ${numB} (bin: ${numB.toString(2)})` : '',
      `Operation: ${op}`,
      `---------------------------------`,
      `Result Decimal: ${res}`,
      `Result Hex: ${res.toString(16).toUpperCase()}`,
      `Result Binary: ${res.toString(2)}`,
      `Result Octal: ${res.toString(8)}`
    ].filter(Boolean).join('\n');

    document.getElementById('code-output').value = result;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Bitwise calculation complete!' : 'Calcul bit à bit terminé !');
  });

  function parseAnyBase(str) {
    str = str.toLowerCase();
    if (str.startsWith('0x')) return parseInt(str.slice(2), 16);
    if (str.startsWith('0b')) return parseInt(str.slice(2), 2);
    if (str.startsWith('0o')) return parseInt(str.slice(2), 8);
    if (/^[01]+$/.test(str) && str.length > 5) return parseInt(str, 2);
    return parseInt(str, 10);
  }
}

// -------------------------------------------------------------
// CSS Shadow Builder
// -------------------------------------------------------------
let shadowType = 'box';

function setupShadowBuilder() {
  const tabs = document.querySelectorAll('#shadow-type-tabs .subtab-btn');
  const inputX = document.getElementById('sh-x');
  const inputY = document.getElementById('sh-y');
  const inputBlur = document.getElementById('sh-blur');
  const inputSpread = document.getElementById('sh-spread');
  const inputOpacity = document.getElementById('sh-opacity');
  const inputColor = document.getElementById('sh-color');
  const inputInset = document.getElementById('sh-inset');

  const valX = document.getElementById('sh-x-val');
  const valY = document.getElementById('sh-y-val');
  const valBlur = document.getElementById('sh-blur-val');
  const valSpread = document.getElementById('sh-spread-val');
  const valOpacity = document.getElementById('sh-opacity-val');

  const spreadContainer = document.getElementById('sh-spread-container');
  const insetContainer = document.getElementById('sh-inset-container');

  if (!inputX) return;

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      shadowType = btn.getAttribute('data-shadow-type');

      if (shadowType === 'box') {
        spreadContainer.style.display = 'block';
        insetContainer.style.display = 'flex';
        document.getElementById('shadow-preview-box').style.background = '#0ea5e9';
        document.getElementById('shadow-preview-text').textContent = currentLang === 'en' ? 'Box Shadow' : 'Ombre de Boîte';
      } else {
        spreadContainer.style.display = 'none';
        insetContainer.style.display = 'none';
        document.getElementById('shadow-preview-box').style.background = 'transparent';
        document.getElementById('shadow-preview-text').textContent = currentLang === 'en' ? 'Text Shadow' : 'Ombre de Texte';
      }
      updateShadow();
    });
  });

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return { r, g, b };
  }

  function updateShadow() {
    const x = inputX.value;
    const y = inputY.value;
    const blur = inputBlur.value;
    const spread = inputSpread.value;
    const opacity = inputOpacity.value;
    const colorHex = inputColor.value;
    const rgb = hexToRgb(colorHex);
    const alpha = (parseInt(opacity) / 100).toFixed(2);
    const inset = inputInset.checked && shadowType === 'box' ? 'inset' : '';

    valX.textContent = x + 'px';
    valY.textContent = y + 'px';
    valBlur.textContent = blur + 'px';
    valSpread.textContent = spread + 'px';
    valOpacity.textContent = opacity + '%';

    const colorStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    const previewBox = document.getElementById('shadow-preview-box');
    const previewText = document.getElementById('shadow-preview-text');
    const codeOutput = document.getElementById('code-output');

    let cssCode = '';
    if (shadowType === 'box') {
      const shadowValue = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${colorStr}`;
      previewBox.style.boxShadow = shadowValue;
      previewBox.style.textShadow = 'none';
      
      cssCode = [
        `.shadow-box {`,
        `  box-shadow: ${shadowValue};`,
        `}`
      ].join('\n');
    } else {
      const shadowValue = `${x}px ${y}px ${blur}px ${colorStr}`;
      previewBox.style.boxShadow = 'none';
      previewText.style.textShadow = shadowValue;
      
      cssCode = [
        `.shadow-text {`,
        `  text-shadow: ${shadowValue};`,
        `}`
      ].join('\n');
    }

    if (activeTab === 'shadow') {
      codeOutput.value = cssCode;
      showOutputContainer('code');
    }
  }

  [inputX, inputY, inputBlur, inputSpread, inputOpacity, inputColor, inputInset].forEach(el => {
    el.addEventListener('input', updateShadow);
  });

  updateShadow();
}

// -------------------------------------------------------------
// Lorem Ipsum & Fake Data Generator
// -------------------------------------------------------------
const LOREM_WORDS_LIST = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];
const FAKE_FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const FAKE_LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const FAKE_DOMAINS = ["example.com", "testmail.com", "devpost.io", "codelab.org", "omniconvertpro.com"];

function setupFakeDataGenerator() {
  const typeSelect = document.getElementById('fake-data-type');
  const countSlider = document.getElementById('fake-data-count');
  const countVal = document.getElementById('fake-data-count-val');
  const genBtn = document.getElementById('btn-fake-data-gen');

  if (!typeSelect) return;

  countSlider.addEventListener('input', () => {
    countVal.textContent = countSlider.value;
  });

  genBtn.addEventListener('click', () => {
    const type = typeSelect.value;
    const count = parseInt(countSlider.value) || 5;
    let result = '';

    if (type === 'lorem-words') {
      const words = [];
      for (let i = 0; i < count * 8; i++) {
        words.push(LOREM_WORDS_LIST[Math.floor(Math.random() * LOREM_WORDS_LIST.length)]);
      }
      result = words.join(' ') + '.';
    } else if (type === 'lorem-paragraphs') {
      const paras = [];
      for (let p = 0; p < count; p++) {
        const sentences = [];
        const sentenceCount = 3 + Math.floor(Math.random() * 4);
        for (let s = 0; s < sentenceCount; s++) {
          const words = [];
          const wordCount = 6 + Math.floor(Math.random() * 10);
          for (let w = 0; w < wordCount; w++) {
            words.push(LOREM_WORDS_LIST[Math.floor(Math.random() * LOREM_WORDS_LIST.length)]);
          }
          let sentence = words.join(' ');
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
          sentences.push(sentence);
        }
        paras.push(sentences.join(' '));
      }
      result = paras.join('\n\n');
    } else if (type === 'names') {
      const names = [];
      for (let i = 0; i < count; i++) {
        const fn = FAKE_FIRST_NAMES[Math.floor(Math.random() * FAKE_FIRST_NAMES.length)];
        const ln = FAKE_LAST_NAMES[Math.floor(Math.random() * FAKE_LAST_NAMES.length)];
        names.push(`${fn} ${ln}`);
      }
      result = names.join('\n');
    } else if (type === 'emails') {
      const emails = [];
      for (let i = 0; i < count; i++) {
        const fn = FAKE_FIRST_NAMES[Math.floor(Math.random() * FAKE_FIRST_NAMES.length)].toLowerCase();
        const ln = FAKE_LAST_NAMES[Math.floor(Math.random() * FAKE_LAST_NAMES.length)].toLowerCase();
        const dom = FAKE_DOMAINS[Math.floor(Math.random() * FAKE_DOMAINS.length)];
        emails.push(`${fn}.${ln}@${dom}`);
      }
      result = emails.join('\n');
    } else if (type === 'users-json') {
      const users = [];
      for (let i = 0; i < count; i++) {
        const fn = FAKE_FIRST_NAMES[Math.floor(Math.random() * FAKE_FIRST_NAMES.length)];
        const ln = FAKE_LAST_NAMES[Math.floor(Math.random() * FAKE_LAST_NAMES.length)];
        const dom = FAKE_DOMAINS[Math.floor(Math.random() * FAKE_DOMAINS.length)];
        users.push({
          id: i + 1,
          name: `${fn} ${ln}`,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${dom}`,
          role: Math.random() > 0.5 ? "Developer" : "Administrator",
          active: Math.random() > 0.3
        });
      }
      result = JSON.stringify(users, null, 2);
    }

    document.getElementById('code-output').value = result;
    showOutputContainer('code');
    showToast(currentLang === 'en' ? 'Data generated!' : 'Données générées !');
  });
}

// -------------------------------------------------------------
// Code Snippet Manager
// -------------------------------------------------------------
let savedSnippets = [];

function setupSnippetManager() {
  const btnSave = document.getElementById('btn-snippet-save');
  const inputTitle = document.getElementById('snippet-title');
  const selectCat = document.getElementById('snippet-category');
  const textareaCode = document.getElementById('snippet-code-input');
  
  const searchInput = document.getElementById('snippet-search');
  const filterCat = document.getElementById('snippet-filter-cat');
  
  const btnExport = document.getElementById('btn-snippets-export');
  const btnImportTrigger = document.getElementById('btn-snippets-import-trigger');
  const importFileInput = document.getElementById('snippets-import-file');

  if (!btnSave) return;

  loadSnippets();

  btnSave.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const cat = selectCat.value;
    const code = textareaCode.value;

    if (!title || !code.trim()) {
      showToast(currentLang === 'en' ? 'Title and code are required!' : 'Le titre et le code sont requis !');
      return;
    }

    const snippet = {
      id: Date.now().toString(),
      title,
      category: cat,
      code,
      date: new Date().toLocaleDateString()
    };

    savedSnippets.unshift(snippet);
    saveSnippetsToStorage();
    renderSnippets();

    inputTitle.value = '';
    textareaCode.value = '';
    showToast(currentLang === 'en' ? 'Snippet saved!' : 'Snippet enregistré !');
  });

  searchInput.addEventListener('input', renderSnippets);
  filterCat.addEventListener('change', renderSnippets);

  btnExport.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedSnippets, null, 2));
    const link = document.createElement('a');
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "omniconvert_pro_snippets.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(currentLang === 'en' ? 'Snippets exported!' : 'Snippets exportés !');
  });

  btnImportTrigger.addEventListener('click', () => {
    importFileInput.click();
  });

  importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          const existingIds = new Set(savedSnippets.map(s => s.id));
          imported.forEach(s => {
            if (s.id && s.title && s.code) {
              if (existingIds.has(s.id)) {
                s.id = Date.now().toString() + Math.random().toString(36).substring(2,5);
              }
              savedSnippets.unshift(s);
            }
          });
          saveSnippetsToStorage();
          renderSnippets();
          showToast(currentLang === 'en' ? 'Snippets imported!' : 'Snippets importés !');
        } else {
          showToast(currentLang === 'en' ? 'Invalid snippets file format!' : 'Format de fichier de snippets invalide !');
        }
      } catch (err) {
        showToast(currentLang === 'en' ? 'Error importing file!' : 'Erreur lors de l\'importation !');
      }
    };
    reader.readAsText(file);
  });
}

function loadSnippets() {
  const data = localStorage.getItem('omniconvert_pro_snippets');
  if (data) {
    try {
      savedSnippets = JSON.parse(data);
    } catch (e) {
      savedSnippets = [];
    }
  } else {
    savedSnippets = [
      {
        id: '1',
        title: 'Fetch API GET request',
        category: 'JavaScript',
        code: `fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));`,
        date: new Date().toLocaleDateString()
      },
      {
        id: '2',
        title: 'Flexbox Center Styling',
        category: 'CSS',
        code: `.centered {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
        date: new Date().toLocaleDateString()
      }
    ];
    saveSnippetsToStorage();
  }
  renderSnippets();
}

function saveSnippetsToStorage() {
  localStorage.setItem('omniconvert_pro_snippets', JSON.stringify(savedSnippets));
}

function renderSnippets() {
  const container = document.getElementById('snippets-list-container');
  if (!container) return;
  container.innerHTML = '';

  const query = document.getElementById('snippet-search').value.toLowerCase();
  const filter = document.getElementById('snippet-filter-cat').value;

  const filtered = savedSnippets.filter(s => {
    const matchesQuery = s.title.toLowerCase().includes(query) || s.code.toLowerCase().includes(query);
    const matchesCat = filter === 'All' || s.category === filter;
    return matchesQuery && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:12px; font-size:0.72rem; color:var(--text-muted);">${currentLang === 'en' ? 'No snippets found' : 'Aucun snippet trouvé'}</div>`;
    return;
  }

  filtered.forEach(s => {
    const item = document.createElement('div');
    item.className = 'snippet-item';
    
    item.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('i')) return;
      document.getElementById('code-output').value = s.code;
      showOutputContainer('code');
      showToast(currentLang === 'en' ? 'Snippet loaded into output!' : 'Snippet chargé dans la sortie !');
    });

    const info = document.createElement('div');
    info.className = 'snippet-info';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'snippet-item-title';
    titleSpan.textContent = s.title;

    const meta = document.createElement('div');
    meta.className = 'snippet-item-meta';
    
    const badge = document.createElement('span');
    badge.className = `snippet-badge ${s.category.toLowerCase()}`;
    badge.textContent = s.category;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = s.date;

    meta.appendChild(badge);
    meta.appendChild(dateSpan);
    info.appendChild(titleSpan);
    info.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'snippet-actions';

    const btnCopy = document.createElement('button');
    btnCopy.className = 'btn-snippet-copy';
    btnCopy.title = currentLang === 'en' ? 'Copy Code' : 'Copier le code';
    btnCopy.innerHTML = '<i class="fa-solid fa-copy"></i>';
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(s.code)
        .then(() => showToast(translations[currentLang].toastCopied))
        .catch(err => showToast(translations[currentLang].toastError + err.message));
    });

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-snippet-delete';
    btnDelete.title = currentLang === 'en' ? 'Delete' : 'Supprimer';
    btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnDelete.addEventListener('click', () => {
      savedSnippets = savedSnippets.filter(item => item.id !== s.id);
      saveSnippetsToStorage();
      renderSnippets();
      showToast(currentLang === 'en' ? 'Snippet deleted!' : 'Snippet supprimé !');
    });

    actions.appendChild(btnCopy);
    actions.appendChild(btnDelete);

    item.appendChild(info);
    item.appendChild(actions);
    container.appendChild(item);
  });
}
