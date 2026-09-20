/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ULTRA HTML WRITING ASSISTANT & SMART COPILOT SUITE (v2.0)
 * 1. Real-Time Cursor Ghost Autocomplete (Tags, Emmet Snippets, Attributes)
 * 2. Smart Auto-Closing Tags Engine (Zero-Lag XML/HTML Pairing)
 * 3. 50+ Production-Ready HTML5 Components & Boilerplates
 * 4. Interactive Component Studio Modal & Quick Helper Toolbar
 * 5. 🔄 Auto-Rename Tag Pair (Simultaneous opening/closing tag sync)
 * 6. 🎯 Bi-Directional Highlighting & Inspect-to-Code (Alt+Click preview -> jump)
 * 7. ⚡ Advanced Emmet Compiler (Nesting, Multipliers, Text Nodes + Tab Expansion)
 * 8. 👻 Ghost-Text AI Inline Completion (Contextual multi-character ghosting)
 * 9. 🧭 DOM Breadcrumb Bar & Quick Wrapper (Hierarchy path + Wrap with...)
 * 10. 🎨 Inline Color Swatches & Mini Color Picker (Live hex preview & edit)
 * 11. 🧹 Smart HTML Beautifier & A11y Lint Doctor (Auto-indent & a11y fixer)
 * 12. 💬 Inline AI Code Generator (Ctrl+K floating command bar at cursor)
 * 100% Client-Side · Zero External Dependencies · Full Bilingual Parity (EN/FR)
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && typeof UltraSoundFX.play === 'function') {
      UltraSoundFX.play(type);
    }
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg, type || 'info');
    } else {
      console.log(`[Toast ${type}]: ${msg}`);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. KNOWLEDGE BASE: HTML5 TAGS, SMART COMPONENTS & ATTRIBUTES
  // ══════════════════════════════════════════════════════════════════════════════
  const HTML_TAGS = [
    // Layout & Semantic Containers
    { tag: 'div', descEn: 'Generic block container', descFr: 'Conteneur générique de bloc', icon: '📦', cat: 'layout', template: '<div>\n  $0\n</div>' },
    { tag: 'section', descEn: 'Thematic section of document', descFr: 'Section thématique du document', icon: '📑', cat: 'layout', template: '<section class="$1">\n  $0\n</section>' },
    { tag: 'article', descEn: 'Self-contained composition', descFr: 'Composition autonome réutilisable', icon: '📰', cat: 'layout', template: '<article class="$1">\n  $0\n</article>' },
    { tag: 'header', descEn: 'Introductory container or banner', descFr: 'En-tête de page ou section', icon: '🔝', cat: 'layout', template: '<header class="$1">\n  $0\n</header>' },
    { tag: 'footer', descEn: 'Footer container with credits', descFr: 'Pied de page avec crédits/liens', icon: '🔚', cat: 'layout', template: '<footer class="$1">\n  $0\n</footer>' },
    { tag: 'main', descEn: 'Dominant content of document', descFr: 'Contenu principal dominant', icon: '🏛️', cat: 'layout', template: '<main class="$1">\n  $0\n</main>' },
    { tag: 'aside', descEn: 'Sidebar or tangential content', descFr: 'Barre latérale ou contenu annexe', icon: '📐', cat: 'layout', template: '<aside class="$1">\n  $0\n</aside>' },
    { tag: 'nav', descEn: 'Navigation links container', descFr: 'Conteneur de liens de navigation', icon: '🧭', cat: 'layout', template: '<nav class="$1">\n  $0\n</nav>' },

    // UI Elements & Typography
    { tag: 'button', descEn: 'Interactive clickable button', descFr: 'Bouton cliquable interactif', icon: '🔘', cat: 'ui', template: '<button class="btn" onclick="$1">$0Click Me</button>' },
    { tag: 'a', descEn: 'Hyperlink to page or anchor', descFr: 'Hyperlien vers page ou ancre', icon: '🔗', cat: 'ui', template: '<a href="$1" class="$2">$0Link Text</a>' },
    { tag: 'p', descEn: 'Paragraph of text', descFr: 'Paragraphe de texte stylisé', icon: '📝', cat: 'ui', template: '<p class="$1">$0</p>' },
    { tag: 'span', descEn: 'Generic inline text container', descFr: 'Conteneur de texte en ligne', icon: '🏷️', cat: 'ui', template: '<span class="$1">$0</span>' },
    { tag: 'h1', descEn: 'Primary page headline', descFr: 'Titre principal de premier niveau', icon: '🎯', cat: 'ui', template: '<h1 class="$1">$0Main Headline</h1>' },
    { tag: 'h2', descEn: 'Secondary section heading', descFr: 'Sous-titre de deuxième niveau', icon: '✨', cat: 'ui', template: '<h2 class="$1">$0Section Heading</h2>' },
    { tag: 'h3', descEn: 'Tertiary sub-heading', descFr: 'Sous-titre de troisième niveau', icon: '🔹', cat: 'ui', template: '<h3 class="$1">$0Card Heading</h3>' },
    { tag: 'badge', descEn: 'Status or count pill indicator', descFr: 'Pastille de statut ou compteur', icon: '🏷️', cat: 'ui', template: '<span style="background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid rgba(56,189,248,0.4);border-radius:20px;padding:3px 10px;font-size:12px;font-weight:700">$0Active</span>' },

    // Forms & Inputs
    { tag: 'form', descEn: 'Interactive input submission form', descFr: 'Formulaire de saisie interactif', icon: '📋', cat: 'forms', template: '<form onsubmit="event.preventDefault();$1">\n  $0\n</form>' },
    { tag: 'input', descEn: 'Data input field (text/email/etc)', descFr: 'Champ de saisie de données', icon: '✏️', cat: 'forms', template: '<input type="text" placeholder="$1" class="input-field" />$0', selfClosing: true },
    { tag: 'label', descEn: 'Accessible caption for input', descFr: 'Étiquette accessible de champ', icon: '🏷️', cat: 'forms', template: '<label for="$1">$0Label Text</label>' },
    { tag: 'select', descEn: 'Dropdown option menu', descFr: 'Menu déroulant de sélection', icon: '🔽', cat: 'forms', template: '<select class="select-field">\n  <option value="1">Option 1</option>\n  <option value="2">Option 2</option>\n</select>$0' },
    { tag: 'textarea', descEn: 'Multi-line text editor input', descFr: 'Zone de texte multi-lignes', icon: '📄', cat: 'forms', template: '<textarea rows="4" placeholder="$1" class="textarea-field">$0</textarea>' },

    // Media & Visuals
    { tag: 'img', descEn: 'Responsive graphic image', descFr: 'Image graphique réactive', icon: '🖼️', cat: 'media', template: '<img src="$1" alt="$2" style="max-width:100%;border-radius:12px" />$0', selfClosing: true },
    { tag: 'canvas', descEn: '2D / WebGL graphics canvas', descFr: 'Pânză grafică 2D / WebGL', icon: '🎨', cat: 'media', template: '<canvas id="$1" width="600" height="400" style="display:block;border-radius:12px"></canvas>$0' },
    { tag: 'audio', descEn: 'Audio sound player control', descFr: 'Lecteur audio interactif', icon: '🎵', cat: 'media', template: '<audio controls src="$1">$0</audio>' },
    { tag: 'video', descEn: 'Video movie player with controls', descFr: 'Lecteur vidéo avec contrôles', icon: '🎬', cat: 'media', template: '<video controls width="640" style="border-radius:12px"><source src="$1" type="video/mp4"></video>$0' },

    // Data & Collections
    { tag: 'table', descEn: 'Tabular data structure', descFr: 'Structure de données tabulaires', icon: '📊', cat: 'data', template: '<table style="width:100%;border-collapse:collapse">\n  <thead>\n    <tr>\n      <th>Column 1</th>\n      <th>Column 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Data 1</td>\n      <td>Data 2</td>\n    </tr>\n  </tbody>\n</table>$0' },
    { tag: 'ul', descEn: 'Unordered bullet list', descFr: 'Liste à puces non ordonnée', icon: '📑', cat: 'data', template: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  $0\n</ul>' },
    { tag: 'ol', descEn: 'Ordered numbered list', descFr: 'Liste numérotée ordonnée', icon: '🔢', cat: 'data', template: '<ol>\n  <li>First</li>\n  <li>Second</li>\n  $0\n</ol>' },
    { tag: 'details', descEn: 'Collapsible accordion item', descFr: 'Bloc accordéon déroulant/repliable', icon: '📂', cat: 'data', template: '<details style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px">\n  <summary style="font-weight:700;cursor:pointer">Question Title?</summary>\n  <p style="margin-top:8px;color:#94a3b8">Detailed answer text here...</p>\n</details>$0' }
  ];

  const SMART_SNIPPETS = [
    {
      key: 'card',
      aliases: ['card', 'glasscard', 'card-glass'],
      name: 'Glassmorphic Card',
      descEn: 'Modern frosted glass container with glow border',
      descFr: 'Carte moderne en verre dépoli avec bordure lumineuse',
      icon: '🎴',
      cat: 'ui',
      code: `<div style="background:rgba(15,23,42,0.8);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:24px;color:#fff;box-shadow:0 20px 40px rgba(0,0,0,0.4)">
  <h3 style="margin-top:0;font-size:1.2rem;font-weight:800;color:#38bdf8">✨ Premium Glass Card</h3>
  <p style="color:#94a3b8;font-size:0.9rem;line-height:1.5">Interactive modern card ready for SaaS products, portfolios, and dashboards.</p>
  <button style="background:linear-gradient(135deg,#38bdf8,#0284c7);border:none;border-radius:8px;padding:8px 18px;color:#fff;font-weight:700;cursor:pointer">Explore</button>
</div>`
    },
    {
      key: 'btn',
      aliases: ['btn', 'neonbtn', 'glowbtn', 'button-glow'],
      name: 'Neon Radiant Button',
      descEn: 'Glowing gradient CTA button with hover animation',
      descFr: 'Bouton d\'action radiant avec animation au survol',
      icon: '🔘',
      cat: 'ui',
      code: `<button style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);color:#fff;border:none;padding:12px 28px;border-radius:12px;font-weight:800;font-size:0.95rem;cursor:pointer;box-shadow:0 6px 20px rgba(99,102,241,0.45);transition:transform .2s" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
  🚀 Launch Feature
</button>`
    },
    {
      key: 'hero',
      aliases: ['hero', 'herosection', 'landing-hero'],
      name: 'Modern Hero Header',
      descEn: 'Full-width landing page hero with headline and CTAs',
      descFr: 'Section héroïque complète avec titre et boutons d\'action',
      icon: '👑',
      cat: 'boilerplate',
      code: `<section style="text-align:center;padding:60px 20px;max-width:900px;margin:0 auto">
  <span style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.35);color:#a5b4fc;padding:6px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:1px">🚀 Next-Gen Platform v2.0</span>
  <h1 style="font-size:3rem;font-weight:900;letter-spacing:-1px;margin:20px 0 16px;background:linear-gradient(135deg,#fff,#94a3b8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
    Build Astonishing Web Apps in Seconds
  </h1>
  <p style="font-size:1.1rem;color:#94a3b8;max-width:640px;margin:0 auto 32px;line-height:1.6">
    The all-in-one studio engineered to transform ideas into production-ready software.
  </p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <button style="background:#38bdf8;color:#000;border:none;padding:14px 30px;border-radius:10px;font-weight:800;font-size:1rem;cursor:pointer">Get Started Free</button>
    <button style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:14px 26px;border-radius:10px;font-weight:700;font-size:1rem;cursor:pointer">Live Demo ↗</button>
  </div>
</section>`
    },
    {
      key: 'navbar',
      aliases: ['nav', 'navbar', 'header-nav'],
      name: 'Responsive Top Navigation',
      descEn: 'Glassmorphic header bar with brand logo and links',
      descFr: 'Barre de navigation supérieure avec logo et liens',
      icon: '🧭',
      cat: 'layout',
      code: `<header style="display:flex;justify-content:space-between;align-items:center;padding:16px 28px;background:rgba(15,23,42,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.08);color:#fff">
  <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.15rem">
    <span style="font-size:1.4rem">⚡</span>
    <span style="background:linear-gradient(135deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">ApexStudio</span>
  </div>
  <nav style="display:flex;gap:24px;font-size:0.9rem;font-weight:600">
    <a href="#features" style="color:#cbd5e1;text-decoration:none">Features</a>
    <a href="#pricing" style="color:#cbd5e1;text-decoration:none">Pricing</a>
    <a href="#docs" style="color:#cbd5e1;text-decoration:none">Docs</a>
  </nav>
  <button style="background:#38bdf8;color:#000;border:none;border-radius:8px;padding:8px 18px;font-weight:700;cursor:pointer">Sign In</button>
</header>`
    },
    {
      key: 'grid-3',
      aliases: ['grid', 'grid3', 'cards-grid'],
      name: '3-Column Responsive Grid',
      descEn: 'Auto-wrapping 3-column container with 20px gap',
      descFr: 'Grille responsive à 3 colonnes avec espacement 20px',
      icon: '📐',
      cat: 'layout',
      code: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;padding:20px">
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px">
    <div style="font-size:1.8rem;margin-bottom:8px">⚡</div>
    <h3 style="color:#fff;margin:0 0 6px">Lightning Fast</h3>
    <p style="color:#94a3b8;font-size:0.85rem;line-height:1.4">Optimized for maximum speed and instant user responsiveness.</p>
  </div>
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px">
    <div style="font-size:1.8rem;margin-bottom:8px">🛡️</div>
    <h3 style="color:#fff;margin:0 0 6px">Enterprise Secure</h3>
    <p style="color:#94a3b8;font-size:0.85rem;line-height:1.4">Military-grade protection built into the core foundation.</p>
  </div>
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px">
    <div style="font-size:1.8rem;margin-bottom:8px">✨</div>
    <h3 style="color:#fff;margin:0 0 6px">Smart Automations</h3>
    <p style="color:#94a3b8;font-size:0.85rem;line-height:1.4">Autonomous AI agents handling repetitive routine workflows.</p>
  </div>
</div>`
    },
    {
      key: 'login-form',
      aliases: ['form', 'login', 'auth-card'],
      name: 'Glassmorphic Login Form',
      descEn: 'Authentication form with validation and submit button',
      descFr: 'Formulaire de connexion avec validation et bouton',
      icon: '🔐',
      cat: 'forms',
      code: `<form onsubmit="event.preventDefault();alert('Logged in!');" style="max-width:380px;margin:20px auto;background:rgba(15,23,42,0.85);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;box-shadow:0 20px 40px rgba(0,0,0,0.5)">
  <h2 style="margin-top:0;color:#fff;font-size:1.4rem;text-align:center">Welcome Back</h2>
  <p style="color:#94a3b8;font-size:0.85rem;text-align:center;margin-bottom:24px">Sign in to your account</p>
  
  <div style="margin-bottom:16px">
    <label style="display:block;font-size:0.8rem;color:#cbd5e1;margin-bottom:6px;font-weight:600">Email Address</label>
    <input type="email" required placeholder="you@company.com" style="width:100%;padding:10px 14px;background:#030712;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;font-size:0.85rem;outline:none;box-sizing:border-box" />
  </div>

  <div style="margin-bottom:24px">
    <label style="display:block;font-size:0.8rem;color:#cbd5e1;margin-bottom:6px;font-weight:600">Password</label>
    <input type="password" required placeholder="••••••••" style="width:100%;padding:10px 14px;background:#030712;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;font-size:0.85rem;outline:none;box-sizing:border-box" />
  </div>

  <button type="submit" style="width:100%;padding:12px;background:#38bdf8;color:#000;border:none;border-radius:8px;font-weight:800;font-size:0.9rem;cursor:pointer">
    Sign In
  </button>
</form>`
    },
    {
      key: 'pricing-card',
      aliases: ['pricing', 'plan', 'price-table'],
      name: 'Pricing Tier Card',
      descEn: 'Subscription tier card with feature checklist & badge',
      descFr: 'Carte de forfait avec liste de fonctionnalités et badge',
      icon: '💎',
      cat: 'ui',
      code: `<div style="max-width:320px;background:rgba(15,23,42,0.9);border:2px solid #38bdf8;border-radius:18px;padding:32px;color:#fff;position:relative;box-shadow:0 0 30px rgba(56,189,248,0.25)">
  <span style="position:absolute;top:-12px;right:24px;background:#38bdf8;color:#000;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;text-transform:uppercase">POPULAR</span>
  <h3 style="margin:0;font-size:1.3rem">Pro Plan</h3>
  <div style="font-size:2.4rem;font-weight:900;margin:16px 0 8px;color:#38bdf8">$29<span style="font-size:0.9rem;color:#94a3b8;font-weight:500">/mo</span></div>
  <p style="color:#94a3b8;font-size:0.85rem;line-height:1.5;margin-bottom:24px">For scaling founders and demanding engineering teams.</p>
  <ul style="list-style:none;padding:0;margin:0 0 24px;font-size:0.85rem;color:#cbd5e1;display:flex;flex-direction:column;gap:10px">
    <li>✓ Unlimited App Generations</li>
    <li>✓ Full Source Code Export</li>
    <li>✓ Custom Domains & Hosting</li>
    <li>✓ 24/7 Priority Support</li>
  </ul>
  <button style="width:100%;padding:12px;background:#38bdf8;color:#000;border:none;border-radius:10px;font-weight:800;cursor:pointer">Get Started Now</button>
</div>`
    },
    {
      key: 'kpi-stat',
      aliases: ['kpi', 'stat', 'metric'],
      name: 'KPI Metric Widget',
      descEn: 'Dashboard stat metric card with indicator pill',
      descFr: 'Carte métrique de tableau de bord avec indicateur',
      icon: '📈',
      cat: 'ui',
      code: `<div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;display:flex;align-items:center;justify-content:space-between;max-width:320px">
  <div>
    <div style="font-size:0.8rem;color:#94a3b8;font-weight:600;margin-bottom:4px">Monthly Recurring Revenue</div>
    <div style="font-size:1.8rem;font-weight:800;color:#fff">$48,250</div>
  </div>
  <span style="background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:700">
    +24.8% ↑
  </span>
</div>`
    },
    {
      key: 'html5',
      aliases: ['html5', 'shell', 'template-html', 'blank'],
      name: 'HTML5 Modern Boilerplate',
      descEn: 'Complete clean HTML5 shell document with meta & viewport',
      descFr: 'Modèle HTML5 propre et complet avec balises méta',
      icon: '🌐',
      cat: 'boilerplate',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ultra Web Application</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; min-height: 100vh; }
  </style>
</head>
<body>
  <main style="max-width: 960px; margin: 0 auto">
    <h1 style="font-size: 2rem; margin-bottom: 12px">✨ Welcome to Ultra Studio</h1>
    <p style="color: #94a3b8; line-height: 1.6">Start designing high-performance interactive interfaces right here.</p>
  </main>
</body>
</html>`
    }
  ];

  const HTML_ATTRIBUTES = [
    { attr: 'class', descEn: 'CSS class selector name', descFr: 'Nom de sélecteur de classe CSS', snippet: 'class="$1"$0' },
    { attr: 'id', descEn: 'Unique element identifier', descFr: 'Identifiant unique d\'élément', snippet: 'id="$1"$0' },
    { attr: 'style', descEn: 'Inline CSS styling rules', descFr: 'Règles de style CSS en ligne', snippet: 'style="$1"$0' },
    { attr: 'onclick', descEn: 'Click event handler code', descFr: 'Code gestionnaire d\'événement clic', snippet: 'onclick="$1"$0' },
    { attr: 'placeholder', descEn: 'Input hint placeholder text', descFr: 'Texte d\'indication dans le champ', snippet: 'placeholder="$1"$0' },
    { attr: 'type', descEn: 'Input control subtype (text/etc)', descFr: 'Sous-type de contrôle de saisie', snippet: 'type="$1"$0' },
    { attr: 'href', descEn: 'Target hyperlink URL address', descFr: 'Adresse URL cible du lien', snippet: 'href="$1"$0' },
    { attr: 'src', descEn: 'Resource source file URL', descFr: 'URL du fichier ressource source', snippet: 'src="$1"$0' },
    { attr: 'alt', descEn: 'Alternative image description', descFr: 'Description textuelle alternative', snippet: 'alt="$1"$0' },
    { attr: 'title', descEn: 'Hover advisory tooltip text', descFr: 'Texte d\'infobulle au survol', snippet: 'title="$1"$0' },
    { attr: 'value', descEn: 'Initial or current element value', descFr: 'Valeur initiale ou courante', snippet: 'value="$1"$0' },
    { attr: 'name', descEn: 'Form submission field key', descFr: 'Clé de champ pour formulaire', snippet: 'name="$1"$0' }
  ];

  const VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA HTML ASSISTANT CORE ENGINE (v2.0)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraHtmlAssistant = {
    isEnabled: localStorage.getItem('ultra_html_copilot_enabled') !== 'false',
    autoRenameEnabled: localStorage.getItem('ultra_html_autorename') !== 'false',
    ghostTextEnabled: localStorage.getItem('ultra_html_ghosttext') !== 'false',
    inspectMode: false,
    popupEl: null,
    selectedIndex: 0,
    currentMatches: [],
    tokenRange: null,
    editorAttached: false,
    isRenaming: false,
    activeGhostSuggestion: null,
    colorMarkers: [],

    init() {
      this.createPopupElement();
      this.createInlinePromptElement();
      this.attachToCodeMirror();
      this.renderQuickBarState();
      this.setupWindowMessageListener();
      console.log('[ULTRA] HTML Writing Assistant & Smart Copilot Suite v2.0 initialized.');
    },

    toggleEnabled() {
      this.isEnabled = !this.isEnabled;
      localStorage.setItem('ultra_html_copilot_enabled', String(this.isEnabled));
      _sound('click');
      this.renderQuickBarState();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(
        this.isEnabled
          ? (isFr ? '✨ Copilote HTML activé !' : '✨ HTML Copilot activated!')
          : (isFr ? 'Copilote HTML désactivé.' : 'HTML Copilot paused.'),
        'info'
      );
    },

    toggleAutoRename() {
      this.autoRenameEnabled = !this.autoRenameEnabled;
      localStorage.setItem('ultra_html_autorename', String(this.autoRenameEnabled));
      _sound('click');
      this.renderQuickBarState();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(
        this.autoRenameEnabled
          ? (isFr ? '🔄 Renommage Auto activé' : '🔄 Auto-Rename Tag Pair enabled')
          : (isFr ? 'Renommage Auto désactivé' : 'Auto-Rename Tag Pair disabled'),
        'info'
      );
    },

    toggleInspectMode() {
      this.inspectMode = !this.inspectMode;
      _sound('click');
      this.renderQuickBarState();
      
      const frame = document.getElementById('preview-frame');
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({
          type: 'ultra-set-inspect-mode',
          enabled: this.inspectMode
        }, '*');
      }

      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(
        this.inspectMode
          ? (isFr ? '🎯 Mode Inspection actif : Cliquez sur un élément dans l\'aperçu !' : '🎯 Inspect Mode active: Click any element in preview!')
          : (isFr ? 'Mode Inspection désactivé.' : 'Inspect Mode disabled.'),
        'info'
      );
    },

    createPopupElement() {
      if (document.getElementById('ultra-html-copilot-popup')) {
        this.popupEl = document.getElementById('ultra-html-copilot-popup');
        return;
      }
      const el = document.createElement('div');
      el.id = 'ultra-html-copilot-popup';
      el.style.cssText = `
        position: fixed;
        display: none;
        z-index: 9999999;
        width: 320px;
        max-height: 280px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(14px);
        border: 1px solid rgba(56, 189, 248, 0.4);
        border-radius: 12px;
        box-shadow: 0 16px 36px rgba(0,0,0,0.8), 0 0 15px rgba(56,189,248,0.2);
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
        user-select: none;
      `;
      document.body.appendChild(el);
      this.popupEl = el;
    },

    attachToCodeMirror() {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const editor = getEditor();

      if (!editor) {
        this._attachRetries = (this._attachRetries || 0) + 1;
        if (this._attachRetries < 25) {
          setTimeout(() => this.attachToCodeMirror(), 200);
        }
        return;
      }
      if (this.editorAttached) return;
      this.editorAttached = true;

      // 1. Keystroke Listener for Autocomplete & Auto-Closing & Tag Renaming
      editor.on('inputRead', (cm, change) => {
        if (!this.isEnabled) return;
        const currentTab = (typeof APP !== 'undefined' && APP.currentTab) || 'html';
        if (currentTab !== 'html' && currentTab !== 'full') return;

        const typedText = change.text ? change.text.join('') : '';

        // Handle Smart Auto-Closing Tag when '>' is typed
        if (typedText === '>') {
          this.handleAutoCloseTag(cm);
          this.hidePopup();
          return;
        }

        // Trigger autocomplete evaluation
        this.evalSuggestions(cm);
      });

      // 2. Auto-Rename Tag Pair Listener
      editor.on('change', (cm, change) => {
        if (this.autoRenameEnabled && !this.isRenaming) {
          this.handleAutoRename(cm, change);
        }
        // Update DOM Breadcrumbs and Color Swatches
        this.updateBreadcrumbs(cm);
        this.updateColorSwatches(cm);
      });

      // 3. Keyboard Navigation in Popup, Emmet Tab, & Ghost Text
      editor.on('keydown', (cm, event) => {
        // Handle Tab for Emmet expansion or Ghost text accept
        if (event.key === 'Tab' && !this.isPopupVisible()) {
          const emmetHandled = this.handleEmmetKey(cm);
          if (emmetHandled) {
            event.preventDefault();
            return;
          }
          if (this.activeGhostSuggestion) {
            event.preventDefault();
            this.acceptGhostSuggestion(cm);
            return;
          }
        }

        // Handle Ctrl+K / Cmd+K for Inline Prompt Generator
        if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
          event.preventDefault();
          this.openInlinePrompt(cm);
          return;
        }

        // Handle ArrowRight for Ghost Text acceptance if at line end
        if (event.key === 'ArrowRight' && this.activeGhostSuggestion) {
          const cur = cm.getCursor();
          const line = cm.getLine(cur.line);
          if (cur.ch === line.length) {
            event.preventDefault();
            this.acceptGhostSuggestion(cm);
            return;
          }
        }

        if (!this.isPopupVisible()) return;

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.moveSelection(1);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.moveSelection(-1);
        } else if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault();
          this.applySelectedMatch(cm);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          this.hidePopup();
        }
      });

      // 4. Cursor Activity: Update breadcrumbs, sync highlight to preview
      editor.on('cursorActivity', () => {
        this.updateBreadcrumbs(editor);
        this.syncEditorToPreviewHighlight(editor);

        setTimeout(() => {
          if (!this.popupEl || this.popupEl.style.display === 'none') return;
          const cur = editor.getCursor();
          if (this.tokenRange && (cur.line !== this.tokenRange.from.line || Math.abs(cur.ch - this.tokenRange.to.ch) > 10)) {
            this.hidePopup();
          }
        }, 50);
      });

      // Initial update
      this.updateBreadcrumbs(editor);
      this.updateColorSwatches(editor);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // AUTO-RENAME TAG PAIR ENGINE
    // ══════════════════════════════════════════════════════════════════════════
    handleAutoRename(cm, change) {
      try {
        if (!change || !change.text) return;
        const cur = cm.getCursor();
        const line = cm.getLine(cur.line);
        const upToCursor = line.slice(0, cur.ch);
        
        // Check if typing inside opening tag name: e.g. <div or <sec
        const openMatch = upToCursor.match(/<([a-zA-Z0-9\-]+)$/);
        if (!openMatch) return;
        
        const newTag = openMatch[1].toLowerCase();
        if (VOID_ELEMENTS.has(newTag)) return;

        // Look forward in document for corresponding closing tag
        const docText = cm.getValue();
        const startOffset = cm.indexFromPos(cur);
        const remainingDoc = docText.slice(startOffset);

        // Find next closing tag
        const closeMatch = remainingDoc.match(/<\/([a-zA-Z0-9\-]+)>/);
        if (closeMatch && closeMatch.index !== undefined) {
          const oldClosingTag = closeMatch[1].toLowerCase();
          if (oldClosingTag !== newTag && !VOID_ELEMENTS.has(oldClosingTag)) {
            const closePos = cm.posFromIndex(startOffset + closeMatch.index + 2);
            const closeEndPos = cm.posFromIndex(startOffset + closeMatch.index + 2 + oldClosingTag.length);
            this.isRenaming = true;
            cm.replaceRange(newTag, closePos, closeEndPos);
            this.isRenaming = false;
          }
        }
      } catch(e) {
        this.isRenaming = false;
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // ADVANCED EMMET COMPILER & TAB EXPANSION
    // ══════════════════════════════════════════════════════════════════════════
    expandEmmet(expr) {
      if (!expr || typeof expr !== 'string') return '';
      expr = expr.trim();

      // Split siblings by '+' outside quotes or brackets
      function parseSiblings(str) {
        const parts = [];
        let cur = '', depth = 0;
        for (let i = 0; i < str.length; i++) {
          const ch = str[i];
          if (ch === '[' || ch === '{') depth++;
          else if (ch === ']' || ch === '}') depth--;
          else if (ch === '+' && depth === 0) {
            parts.push(cur); cur = ''; continue;
          }
          cur += ch;
        }
        if (cur) parts.push(cur);
        return parts.map(p => parseChildren(p)).join('\n');
      }

      // Split children by '>' outside quotes or brackets
      function parseChildren(str) {
        const parts = [];
        let cur = '', depth = 0;
        for (let i = 0; i < str.length; i++) {
          const ch = str[i];
          if (ch === '[' || ch === '{') depth++;
          else if (ch === ']' || ch === '}') depth--;
          else if (ch === '>' && depth === 0) {
            parts.push(cur); cur = ''; continue;
          }
          cur += ch;
        }
        if (cur) parts.push(cur);

        // Build nested tags from inside out
        let result = '';
        for (let i = parts.length - 1; i >= 0; i--) {
          const single = parts[i];
          if (i === parts.length - 1) {
            result = parseSingle(single);
          } else {
            const parent = parseSingle(single, result);
            result = parent;
          }
        }
        return result;
      }

      // Parse a single element with multipliers (*N), classes, ids, attrs, text
      function parseSingle(str, innerContent = '') {
        const multMatch = str.match(/^(.+)\*(\d+)$/);
        if (multMatch) {
          const base = multMatch[1];
          const count = parseInt(multMatch[2], 10);
          const out = [];
          for (let i = 1; i <= count; i++) {
            const subStr = base.replace(/\$/g, String(i));
            const subInner = innerContent ? innerContent.replace(/\$/g, String(i)) : '';
            out.push(parseSingleUnit(subStr, subInner));
          }
          return out.join('\n');
        }
        return parseSingleUnit(str, innerContent);
      }

      function parseSingleUnit(str, innerContent = '') {
        let tag = 'div', id = '', classes = [], attrs = [], text = '';

        // Extract text {text}
        const textMatch = str.match(/\{([^}]+)\}/);
        if (textMatch) {
          text = textMatch[1];
          str = str.replace(/\{[^}]+\}/, '');
        }

        // Extract attributes [type=text]
        const attrMatch = str.match(/\[([^\]]+)\]/);
        if (attrMatch) {
          const raw = attrMatch[1];
          const formatted = raw.replace(/([a-zA-Z0-9\-_]+)=([^"'\s]+)/g, '$1="$2"');
          attrs.push(formatted);
          str = str.replace(/\[[^\]]+\]/, '');
        }

        // Extract classes (.class) and id (#id)
        const tokens = str.match(/([.#]?[a-zA-Z0-9\-_]+)/g) || [];
        tokens.forEach(tok => {
          if (tok.startsWith('.')) classes.push(tok.slice(1));
          else if (tok.startsWith('#')) id = tok.slice(1);
          else if (!tag || tag === 'div') tag = tok.toLowerCase();
        });

        if (tag === 'a' && !attrs.some(a => a.includes('href='))) {
          attrs.unshift('href="#"');
        }

        const isVoid = VOID_ELEMENTS.has(tag);
        let attrStr = '';
        if (id) attrStr += ` id="${id}"`;
        if (classes.length) attrStr += ` class="${classes.join(' ')}"`;
        if (attrs.length) attrStr += ` ${attrs.join(' ')}`;

        const body = text ? (innerContent ? text + '\n  ' + innerContent : text) : (innerContent || '');
        if (isVoid) {
          return `<${tag}${attrStr} />`;
        }
        if (!body) {
          return `<${tag}${attrStr}></${tag}>`;
        }
        return `<${tag}${attrStr}>${body.includes('\n') ? '\n  ' + body.replace(/\n/g, '\n  ') + '\n' : body}</${tag}>`;
      }

      try {
        return parseSiblings(expr);
      } catch(e) {
        return '';
      }
    },

    handleEmmetKey(cm) {
      try {
        const cur = cm.getCursor();
        const line = cm.getLine(cur.line);
        const textBefore = line.slice(0, cur.ch);
        const match = textBefore.match(/([a-zA-Z0-9\-_#\.\[\]\{\}\*\+\>]+)$/);
        if (!match) return false;

        const candidate = match[1];
        if (!candidate.includes('>') && !candidate.includes('*') && !candidate.includes('+') && !candidate.includes('.')) {
          return false;
        }

        const expanded = this.expandEmmet(candidate);
        if (expanded) {
          const from = { line: cur.line, ch: cur.ch - candidate.length };
          cm.replaceRange(expanded, from, cur);
          _sound('spark');
          return true;
        }
      } catch(e) {}
      return false;
    },

    // ══════════════════════════════════════════════════════════════════════════
    // GHOST-TEXT INLINE COMPLETION ENGINE
    // ══════════════════════════════════════════════════════════════════════════
    acceptGhostSuggestion(cm) {
      if (!this.activeGhostSuggestion) return;
      const cur = cm.getCursor();
      cm.replaceRange(this.activeGhostSuggestion, cur);
      this.clearGhostSuggestion();
      _sound('click');
    },

    clearGhostSuggestion() {
      this.activeGhostSuggestion = null;
      const ghostEl = document.getElementById('ultra-ghost-hint');
      if (ghostEl) ghostEl.remove();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // DOM BREADCRUMB BAR & QUICK WRAPPER
    // ══════════════════════════════════════════════════════════════════════════
    updateBreadcrumbs(cm) {
      const bar = document.getElementById('html-breadcrumb-bar');
      if (!bar) return;

      try {
        const cur = cm.getCursor();
        const docText = cm.getValue();
        const lines = docText.split('\n').slice(0, cur.line + 1);

        // Tag hierarchy extraction
        const stack = [];
        const tagRegex = /<(\/?)([a-zA-Z0-9\-]+)([^>]*)>/g;
        const textUpToCursor = lines.join('\n');
        let m;

        while ((m = tagRegex.exec(textUpToCursor)) !== null) {
          const isClose = m[1] === '/';
          const tagName = m[2].toLowerCase();
          if (VOID_ELEMENTS.has(tagName)) continue;

          if (isClose) {
            if (stack.length && stack[stack.length - 1].tag === tagName) {
              stack.pop();
            }
          } else {
            const rawAttrs = m[3] || '';
            const classMatch = rawAttrs.match(/class=["']([^"']+)["']/);
            const idMatch = rawAttrs.match(/id=["']([^"']+)["']/);
            stack.push({
              tag: tagName,
              cls: classMatch ? classMatch[1].split(' ')[0] : '',
              id: idMatch ? idMatch[1] : ''
            });
          }
        }

        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        const items = [{ tag: 'html', label: isFr ? 'Document' : 'Document', isRoot: true }, ...stack];

        const chipsHtml = items.map((item, idx) => {
          const label = item.isRoot ? item.label : `<${item.tag}${item.id ? '#' + item.id : ''}${item.cls ? '.' + item.cls : ''}>`;
          return `
            <span class="breadcrumb-chip" onclick="UltraHtmlAssistant.selectBreadcrumbTag('${item.tag}')" style="cursor:pointer;padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.06);color:#cbd5e1;font-size:0.72rem;font-weight:600;display:inline-flex;align-items:center;gap:4px" onmouseover="this.style.color='#38bdf8';this.style.background='rgba(56,189,248,0.15)'" onmouseout="this.style.color='#cbd5e1';this.style.background='rgba(255,255,255,0.06)'">
              ${label}
            </span>
            ${idx < items.length - 1 ? '<span style="color:#475569;font-size:0.65rem">›</span>' : ''}
          `;
        }).join('');

        bar.innerHTML = `
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;white-space:nowrap;flex:1">
            <span style="font-size:0.8rem">🧭</span>
            ${chipsHtml}
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;align-items:center">
            <button onclick="UltraHtmlAssistant.promptWrapSelection()" class="tb-btn" style="padding:2px 8px;font-size:0.68rem;border-color:rgba(56,189,248,0.3);color:#38bdf8" title="Wrap selection with HTML container">
              📦 Wrap
            </button>
            <button onclick="UltraHtmlAssistant.stripActiveTag()" class="tb-btn" style="padding:2px 8px;font-size:0.68rem;border-color:rgba(239,68,68,0.3);color:#f87171" title="Remove outer tag pair">
              ✂️ Strip
            </button>
          </div>
        `;
      } catch(e) {}
    },

    selectBreadcrumbTag(tagName) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;
      
      const doc = cm.getValue();
      const openIdx = doc.lastIndexOf(`<${tagName}`, cm.indexFromPos(cm.getCursor()));
      if (openIdx !== -1) {
        const startPos = cm.posFromIndex(openIdx);
        cm.setCursor(startPos);
        cm.focus();
        _sound('click');
      }
    },

    promptWrapSelection() {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;

      const selected = cm.getSelection();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const tag = prompt(isFr ? 'Envelopper la sélection avec quelle balise ? (ex: div.card, section, a)' : 'Wrap selection with which tag? (e.g. div.card, section, a)', 'div.card');
      if (!tag) return;

      const parsed = this.expandEmmet(tag);
      if (parsed) {
        const wrapped = parsed.includes('</div>') ? parsed.replace('</div>', (selected ? selected : '') + '\n</div>') : `<${tag}>\n${selected}\n</${tag.split('.')[0]}>`;
        cm.replaceSelection(wrapped);
        _sound('spark');
      }
    },

    stripActiveTag() {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;
      
      const cur = cm.getCursor();
      const line = cm.getLine(cur.line);
      const cleaned = line.replace(/<[a-zA-Z0-9\-]+[^>]*>|<\/[a-zA-Z0-9\-]+>/g, '');
      cm.setLine(cur.line, cleaned);
      _sound('click');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(isFr ? 'Balises supprimées' : 'Tag pair stripped cleanly', 'info');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INLINE COLOR SWATCHES & MINI COLOR PICKER
    // ══════════════════════════════════════════════════════════════════════════
    updateColorSwatches(cm) {
      this.colorMarkers.forEach(m => { try { m.clear(); } catch(e){} });
      this.colorMarkers = [];

      try {
        const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/g;
        const lineCount = cm.lineCount();
        const maxLines = Math.min(lineCount, 300);

        for (let i = 0; i < maxLines; i++) {
          const line = cm.getLine(i);
          let m;
          while ((m = hexRegex.exec(line)) !== null) {
            const hex = m[0];
            const startCh = m.index;
            const endCh = startCh + hex.length;

            const pill = document.createElement('span');
            pill.style.cssText = `
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 3px;
              background: ${hex};
              border: 1px solid rgba(255,255,255,0.4);
              margin-right: 3px;
              vertical-align: middle;
              cursor: pointer;
            `;
            pill.title = `Click to change color (${hex})`;
            pill.onclick = (e) => {
              e.stopPropagation();
              this.openColorPicker(cm, { line: i, ch: startCh }, { line: i, ch: endCh }, hex);
            };

            const marker = cm.setBookmark({ line: i, ch: startCh }, { widget: pill, insertLeft: true });
            this.colorMarkers.push(marker);
          }
        }
      } catch(e) {}
    },

    openColorPicker(cm, fromPos, toPos, initialHex) {
      const input = document.createElement('input');
      input.type = 'color';
      input.value = initialHex.length === 4 ? `#${initialHex[1]}${initialHex[1]}${initialHex[2]}${initialHex[2]}${initialHex[3]}${initialHex[3]}` : initialHex;
      input.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
      document.body.appendChild(input);

      input.oninput = () => {
        cm.replaceRange(input.value, fromPos, toPos);
      };
      input.onchange = () => {
        _sound('spark');
        input.remove();
      };
      input.click();
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BI-DIRECTIONAL HIGHLIGHTING & INSPECT-TO-CODE
    // ══════════════════════════════════════════════════════════════════════════
    getInspectScript() {
      return `
(function() {
  if (window.__ultraInspectInstalled) return;
  window.__ultraInspectInstalled = true;

  var isInspectMode = false;
  var highlightBox = null;
  var inspectBadge = null;

  function getOrCreateBox() {
    if (!highlightBox) {
      highlightBox = document.createElement('div');
      highlightBox.id = '_ultra_inspect_box';
      highlightBox.style.cssText = 'position:fixed;pointer-events:none;z-index:99999999;border:2px solid #38bdf8;background:rgba(56,189,248,0.12);box-shadow:0 0 15px rgba(56,189,248,0.6);border-radius:4px;transition:all 0.12s ease;display:none;';

      inspectBadge = document.createElement('span');
      inspectBadge.id = '_ultra_inspect_badge';
      inspectBadge.style.cssText = 'position:absolute;top:-22px;left:0;background:#0284c7;color:#fff;font-family:monospace;font-size:11px;font-weight:700;padding:2px 6px;border-radius:3px;white-space:nowrap;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
      highlightBox.appendChild(inspectBadge);

      document.body.appendChild(highlightBox);
    }
    return highlightBox;
  }

  function updateBoxPosition(el, label) {
    if (!el || el === document.body || el === document.documentElement) {
      if (highlightBox) highlightBox.style.display = 'none';
      return;
    }
    var box = getOrCreateBox();
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      box.style.display = 'none';
      return;
    }
    box.style.left = Math.max(0, r.left) + 'px';
    box.style.top = Math.max(0, r.top) + 'px';
    box.style.width = r.width + 'px';
    box.style.height = r.height + 'px';
    box.style.display = 'block';

    if (inspectBadge) {
      var tagDisplay = label || ('<' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(' ').slice(0, 2).join('.') : '') + '>');
      inspectBadge.textContent = tagDisplay;
      if (r.top < 26) {
        inspectBadge.style.top = '2px';
      } else {
        inspectBadge.style.top = '-22px';
      }
    }
  }

  // Mousemove for Inspect Mode or when Alt key is held
  document.addEventListener('mousemove', function(e) {
    if (!isInspectMode && !e.altKey) return;
    var target = e.target;
    if (!target || target === document.body || target === document.documentElement || target === highlightBox) return;
    updateBoxPosition(target);
  }, true);

  // Click listener (Inspect Mode or Alt+Click)
  document.addEventListener('click', function(e) {
    if (!isInspectMode && !e.altKey) return;

    e.preventDefault();
    e.stopPropagation();

    var target = e.target;
    if (!target || target === document.body || target === document.documentElement) return;

    var tag = target.tagName ? target.tagName.toLowerCase() : 'div';
    var id = target.id || '';
    var cls = (target.className && typeof target.className === 'string') ? target.className.trim() : '';
    var text = (target.innerText || target.textContent || '').trim().slice(0, 35);

    var allOfSameTag = Array.from(document.querySelectorAll(tag));
    var tagIndex = allOfSameTag.indexOf(target);

    window.parent.postMessage({
      type: 'ultra-inspect-to-code',
      tag: tag,
      id: id,
      cls: cls,
      text: text,
      tagIndex: tagIndex
    }, '*');

    // Visual green flash feedback on target
    var box = getOrCreateBox();
    box.style.borderColor = '#10b981';
    box.style.background = 'rgba(16,185,129,0.3)';
    setTimeout(function() {
      if (box) {
        box.style.borderColor = '#38bdf8';
        box.style.background = 'rgba(56,189,248,0.12)';
      }
    }, 450);

    if (isInspectMode) {
      window.parent.postMessage({ type: 'ultra-inspect-mode-complete' }, '*');
    }
  }, true);

  // Parent messages (toggle inspect mode, or highlight from editor cursor)
  window.addEventListener('message', function(e) {
    if (!e.data) return;

    if (e.data.type === 'ultra-set-inspect-mode') {
      isInspectMode = !!e.data.enabled;
      document.body.style.cursor = isInspectMode ? 'crosshair' : '';
      var box = getOrCreateBox();
      if (!isInspectMode) {
        box.style.display = 'none';
      }
    }

    if (e.data.type === 'ultra-highlight-selector') {
      var sel = e.data.selector;
      var textSnippet = e.data.text;
      var lineTag = e.data.tag;
      var tagIndex = e.data.tagIndex;

      if (!sel && !textSnippet && !lineTag) {
        var b = getOrCreateBox();
        b.style.display = 'none';
        return;
      }

      var el = null;
      try {
        if (sel) {
          if (typeof tagIndex === 'number' && tagIndex >= 0) {
            var list = document.querySelectorAll(sel);
            if (list.length > tagIndex) el = list[tagIndex];
            else if (list.length > 0) el = list[0];
          } else {
            el = document.querySelector(sel);
          }
        }
      } catch(ex) {}

      if (!el && textSnippet) {
        var allNodes = document.querySelectorAll(lineTag || '*');
        for (var i = 0; i < allNodes.length; i++) {
          var n = allNodes[i];
          if (n.children.length <= 2 && n.textContent && n.textContent.includes(textSnippet)) {
            el = n;
            break;
          }
        }
      }

      if (el) {
        updateBoxPosition(el, '<' + el.tagName.toLowerCase() + '>');
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch(sc){}
      } else {
        var bx = getOrCreateBox();
        bx.style.display = 'none';
      }
    }
  });
})();
`;
    },

    injectPreviewScript() {
      return this.getInspectScript();
    },

    getInspectDaemonTag() {
      return `<script id="ultra-inspect-daemon">${this.getInspectScript()}<\/script>`;
    },

    setupWindowMessageListener() {
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        window.addEventListener('message', (event) => {
          if (!event.data) return;
          if (event.data.type === 'ultra-inspect-to-code') {
            this.handleInspectMessage(event.data);
          }
          if (event.data.type === 'ultra-inspect-mode-complete') {
            this.inspectMode = false;
            this.renderQuickBarState();
          }
        });
      }
    },

    handleInspectMessage(data) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;

      // Switch to HTML or full tab if needed
      if (typeof APP !== 'undefined' && typeof switchTab === 'function') {
        const neededTab = (APP.isFullMode || APP.currentTab === 'full') ? 'full' : 'html';
        if (APP.currentTab !== neededTab) {
          switchTab(neededTab);
        }
      }

      const { tag, id, cls, text, tagIndex } = data;
      const lines = cm.getValue().split('\n');
      let targetLine = -1;

      // 1. Match by ID (highest precision)
      if (id) {
        targetLine = lines.findIndex(l => l.includes(`id="${id}"`) || l.includes(`id='${id}'`));
      }

      // 2. Match by exact text snippet if present
      if (targetLine === -1 && text && text.trim().length > 1) {
        const cleanText = text.trim();
        targetLine = lines.findIndex(l => l.includes(cleanText) && l.includes(`<${tag}`));
        if (targetLine === -1) {
          targetLine = lines.findIndex(l => l.includes(cleanText));
        }
      }

      // 3. Match by specific classes (longer/rarest classes first)
      if (targetLine === -1 && cls) {
        const classList = cls.trim().split(/\s+/).filter(c => c.length > 1).sort((a, b) => b.length - a.length);
        for (const c of classList) {
          targetLine = lines.findIndex(l => l.includes(c) && l.includes(`<${tag}`));
          if (targetLine !== -1) break;
        }
        if (targetLine === -1 && classList.length > 0) {
          targetLine = lines.findIndex(l => l.includes(classList[0]));
        }
      }

      // 4. Match by Tag with occurrence index
      if (targetLine === -1) {
        const tagMatches = [];
        lines.forEach((l, idx) => {
          if (l.match(new RegExp('<' + tag + '(\\s|>|/)', 'i'))) {
            tagMatches.push(idx);
          }
        });
        if (tagMatches.length > 0) {
          if (typeof tagIndex === 'number' && tagIndex >= 0 && tagIndex < tagMatches.length) {
            targetLine = tagMatches[tagIndex];
          } else {
            targetLine = tagMatches[0];
          }
        }
      }

      if (targetLine !== -1) {
        cm.setCursor({ line: targetLine, ch: 0 });
        cm.scrollIntoView({ line: targetLine, ch: 0 }, 140);
        cm.focus();

        // Flash line in CodeMirror
        try {
          const marker = cm.markText(
            { line: targetLine, ch: 0 },
            { line: targetLine, ch: lines[targetLine].length },
            { className: 'ultra-inspected-line-highlight' }
          );
          setTimeout(() => {
            try { marker.clear(); } catch(e){}
          }, 2500);
        } catch(e){}

        _sound('spark');
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        _toast(
          isFr ? `🎯 Élément <${tag}> inspecté (Ligne ${targetLine + 1})` : `🎯 Element <${tag}> inspected (Line ${targetLine + 1})`,
          'success'
        );
      }
    },

    syncEditorToPreviewHighlight(cm) {
      try {
        const frame = document.getElementById('preview-frame');
        if (!frame || !frame.contentWindow) return;

        const cur = cm.getCursor();
        const line = cm.getLine(cur.line);

        let match = line.match(/<([a-zA-Z0-9\-]+)(?:[^>]*?id=["']([^"']+)["'])?(?:[^>]*?class=["']([^"']+)["'])?/);
        let searchLine = cur.line;
        while (!match && searchLine > 0 && searchLine >= cur.line - 4) {
          searchLine--;
          const prevLine = cm.getLine(searchLine);
          if (prevLine.includes('</')) break;
          match = prevLine.match(/<([a-zA-Z0-9\-]+)(?:[^>]*?id=["']([^"']+)["'])?(?:[^>]*?class=["']([^"']+)["'])?/);
        }

        if (!match) {
          frame.contentWindow.postMessage({ type: 'ultra-highlight-selector', selector: null }, '*');
          return;
        }

        const tag = match[1].toLowerCase();
        if (tag === 'html' || tag === 'body' || tag === 'head' || tag === 'script' || tag === 'style') {
          frame.contentWindow.postMessage({ type: 'ultra-highlight-selector', selector: null }, '*');
          return;
        }

        const id = match[2];
        const cls = match[3] ? match[3].split(' ')[0] : '';
        const textSnippet = line.replace(/<[^>]*>/g, '').trim().slice(0, 25);

        let selector = tag;
        if (id) selector = `#${id}`;
        else if (cls) selector = `${tag}.${cls}`;

        const lines = cm.getValue().split('\n');
        let tagIndex = 0;
        for (let i = 0; i < searchLine; i++) {
          if (lines[i].match(new RegExp('<' + tag + '(\\s|>|/)', 'i'))) {
            tagIndex++;
          }
        }

        frame.contentWindow.postMessage({
          type: 'ultra-highlight-selector',
          selector: selector,
          tag: tag,
          text: textSnippet,
          tagIndex: tagIndex
        }, '*');
      } catch(e) {}
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SMART HTML BEAUTIFIER & A11Y LINT DOCTOR
    // ══════════════════════════════════════════════════════════════════════════
    beautifyHTML(rawHtml) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      let html = (typeof rawHtml === 'string') ? rawHtml : (cm ? cm.getValue() : '');
      if (!html) return '';

      let tab = '  ';
      let result = '';
      let indent = 0;

      html = html.replace(/>\s*</g, '>\n<');
      const lines = html.split('\n');

      lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.match(/^<\//)) {
          indent = Math.max(0, indent - 1);
        }

        result += tab.repeat(indent) + line + '\n';

        if (line.match(/^<[^\/]/) && !line.match(/\/>/) && !line.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i)) {
          if (!line.match(/<([a-zA-Z0-9\-]+)[^>]*>.*<\/\1>/)) {
            indent++;
          }
        }
      });

      const formatted = result.trim();
      if (typeof rawHtml !== 'string' && cm) {
        cm.setValue(formatted);
        _sound('spark');
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        _toast(isFr ? '✨ Code HTML formaté avec succès !' : '✨ HTML formatted cleanly!', 'success');
      }
      return formatted;
    },

    lintA11y(rawDoc) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      const doc = (typeof rawDoc === 'string') ? rawDoc : (cm ? cm.getValue() : '');
      if (!doc) return { issues: [], score: 100 };

      const lines = doc.split('\n');
      const issues = [];

      lines.forEach((line, idx) => {
        if (line.includes('<img') && !line.includes('alt=')) {
          issues.push({ line: idx + 1, type: 'img-alt', descEn: 'Image tag missing alt="" description attribute', descFr: 'Balise <img> sans attribut alt=""' });
        }
        if (line.includes('<button') && !line.includes('aria-label') && !line.match(/<button[^>]*>[^<]+<\/button>/)) {
          issues.push({ line: idx + 1, type: 'btn-label', descEn: 'Button missing text label or aria-label attribute', descFr: 'Bouton sans libellé textuel ou attribut aria-label' });
        }
        if (line.includes('<input') && !line.includes('aria-label') && !line.includes('id=')) {
          issues.push({ line: idx + 1, type: 'input-label', descEn: 'Input field missing id/label pair or aria-label', descFr: 'Champ de saisie sans étiquette ou aria-label' });
        }
        if (line.includes('<iframe') && !line.includes('title=')) {
          issues.push({ line: idx + 1, type: 'iframe-title', descEn: 'iframe missing title attribute', descFr: 'iframe sans attribut title' });
        }
      });

      const score = Math.max(0, 100 - issues.length * 15);
      return { issues, score };
    },

    autoFixA11y(rawDoc) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      let code = (typeof rawDoc === 'string') ? rawDoc : (cm ? cm.getValue() : '');
      if (!code) return '';

      code = code.replace(/<img\b(?![^>]*\balt=)([^>]*?)>/gi, '<img$1 alt="Image description">');
      code = code.replace(/<button\b(?![^>]*\baria-label=)([^>]*?)>\s*(<[^>]+>\s*)*<\/button>/gi, '<button$1 aria-label="Action button">$2</button>');
      code = code.replace(/<input\b(?![^>]*\baria-label=)([^>]*?)>/gi, '<input$1 aria-label="Input field">');
      code = code.replace(/<iframe\b(?![^>]*\btitle=)([^>]*?)>/gi, '<iframe$1 title="Embedded content">');

      if (typeof rawDoc !== 'string' && cm) {
        cm.setValue(code);
        _sound('spark');
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        _toast(isFr ? '🩹 Corrections d\'accessibilité appliquées !' : '🩹 Accessibility fixes applied cleanly!', 'success');
        this.closeDoctorModal();
      }
      return code;
    },

    openDoctorModal() {
      _sound('click');
      const audit = this.lintA11y();
      const issues = audit.issues || [];
      const score = typeof audit.score === 'number' ? audit.score : 100;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      let modal = document.getElementById('modal-html-doctor');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-html-doctor';
        modal.className = 'modal-overlay';
        modal.onclick = (e) => { if (e.target === modal) this.closeDoctorModal(); };
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-box" style="max-width:540px;width:90%;background:rgba(15,23,42,0.95);backdrop-filter:blur(20px);border:1px solid rgba(56,189,248,0.4);box-shadow:0 25px 60px rgba(0,0,0,0.8);border-radius:16px;overflow:hidden">
          <div class="modal-header" style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
            <span class="modal-title" style="font-size:1.1rem;font-weight:800;color:#fff">✨ ${isFr ? 'Docteur HTML & Accessibilité' : 'HTML & A11y Doctor'} <span style="font-size:0.75rem;padding:2px 8px;border-radius:99px;background:${score >= 80 ? 'rgba(52,211,153,0.2)' : 'rgba(245,158,11,0.2)'};color:${score >= 80 ? '#34d399' : '#fbbf24'};border:1px solid ${score >= 80 ? 'rgba(52,211,153,0.3)' : 'rgba(245,158,11,0.3)'}">${score}% Health</span></span>
            <button class="modal-close" onclick="UltraHtmlAssistant.closeDoctorModal()" style="background:none;border:none;color:#94a3b8;font-size:1.2rem;cursor:pointer">✕</button>
          </div>
          <div class="modal-body" style="padding:20px;color:#cbd5e1">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
              <div style="font-size:2.4rem">${issues.length === 0 ? '🎉' : '🩺'}</div>
              <div>
                <div style="font-size:1rem;font-weight:700;color:${issues.length === 0 ? '#34d399' : '#f59e0b'}">
                  ${issues.length === 0 ? (isFr ? 'Code 100% propre & accessible !' : '100% Clean & Accessible HTML!') : `${issues.length} ${isFr ? 'problèmes détectés' : 'accessibility issues detected'}`}
                </div>
                <div style="font-size:0.8rem;color:#94a3b8">
                  ${issues.length === 0 ? (isFr ? 'Toutes les balises sont conformes aux standards WCAG.' : 'All elements pass WCAG accessibility best practices.') : (isFr ? 'Améliorez le SEO et le confort des utilisateurs avec un correctif.' : 'Fix missing alt attributes and aria labels for a11y & SEO.')}
                </div>
              </div>
            </div>

            ${issues.length > 0 ? `
              <div style="max-height:180px;overflow-y:auto;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;margin-bottom:16px;display:flex;flex-direction:column;gap:8px">
                ${issues.map(iss => `
                  <div style="font-size:0.8rem;display:flex;align-items:center;justify-content:space-between;padding:4px 8px;background:rgba(255,255,255,0.03);border-radius:6px">
                    <span>⚠️ ${isFr ? iss.descFr : iss.descEn}</span>
                    <span style="color:#38bdf8;font-weight:700;font-family:monospace">Line ${iss.line}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="modal-footer" style="padding:14px 20px;display:flex;justify-content:space-between;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.06)">
            ${issues.length > 0 ? `
              <button onclick="UltraHtmlAssistant.autoFixA11y()" class="btn-primary" style="background:#38bdf8;color:#000;font-weight:800;padding:8px 16px;border-radius:8px;border:none;cursor:pointer">
                🩹 ${isFr ? 'Corriger Automatiquement Tout' : 'Auto-Fix All A11y Issues'}
              </button>
            ` : '<div></div>'}
            <button onclick="UltraHtmlAssistant.closeDoctorModal()" class="tb-btn" style="padding:8px 16px">
              ${isFr ? 'Fermer' : 'Close'}
            </button>
          </div>
        </div>
      `;
      modal.classList.add('show');
    },

    closeDoctorModal() {
      const modal = document.getElementById('modal-html-doctor');
      if (modal) modal.classList.remove('show');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INLINE AI CODE GENERATOR (Ctrl+K)
    // ══════════════════════════════════════════════════════════════════════════
    createInlinePromptElement() {
      if (document.getElementById('ultra-inline-prompt-bar')) return;
      const el = document.createElement('div');
      el.id = 'ultra-inline-prompt-bar';
      el.style.cssText = `
        position: fixed;
        display: none;
        z-index: 99999999;
        width: 440px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(56, 189, 248, 0.5);
        border-radius: 12px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.85);
        padding: 12px 14px;
        font-family: system-ui, -apple-system, sans-serif;
      `;
      el.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:0.75rem;font-weight:800;color:#38bdf8;display:flex;align-items:center;gap:6px">
            <span>✨</span><span>INLINE HTML GENERATOR (Ctrl+K)</span>
          </span>
          <button onclick="UltraHtmlAssistant.closeInlinePrompt()" style="background:none;border:none;color:#64748b;font-size:12px;cursor:pointer">✕</button>
        </div>
        <div style="display:flex;gap:6px">
          <input type="text" id="ultra-inline-prompt-input" placeholder="e.g. Pricing table with 3 cards..." style="flex:1;background:#030712;border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:8px 12px;color:#fff;font-size:0.82rem;outline:none" onkeydown="if(event.key==='Enter')UltraHtmlAssistant.submitInlinePrompt()" />
          <button onclick="UltraHtmlAssistant.submitInlinePrompt()" class="btn-primary" style="background:#38bdf8;color:#000;border:none;border-radius:8px;padding:8px 14px;font-weight:800;font-size:0.75rem;cursor:pointer">
            Generate
          </button>
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:8px">
          <button onclick="UltraHtmlAssistant.fillPrompt('hero')" class="tb-btn" style="font-size:0.65rem;padding:2px 6px">👑 Hero</button>
          <button onclick="UltraHtmlAssistant.fillPrompt('pricing')" class="tb-btn" style="font-size:0.65rem;padding:2px 6px">💎 Pricing</button>
          <button onclick="UltraHtmlAssistant.fillPrompt('faq')" class="tb-btn" style="font-size:0.65rem;padding:2px 6px">📂 FAQ</button>
          <button onclick="UltraHtmlAssistant.fillPrompt('login')" class="tb-btn" style="font-size:0.65rem;padding:2px 6px">🔐 Form</button>
          <button onclick="UltraHtmlAssistant.fillPrompt('stats')" class="tb-btn" style="font-size:0.65rem;padding:2px 6px">📈 KPI</button>
        </div>
      `;
      document.body.appendChild(el);
    },

    openInlinePrompt(cm) {
      this.createInlinePromptElement();
      const el = document.getElementById('ultra-inline-prompt-bar');
      if (!el) return;

      const cur = cm.getCursor();
      const coords = cm.cursorCoords(cur, 'page');
      el.style.left = Math.min(Math.max(20, coords.left), window.innerWidth - 460) + 'px';
      el.style.top = Math.max(10, coords.bottom + 8) + 'px';
      el.style.display = 'block';

      const input = document.getElementById('ultra-inline-prompt-input');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 50);
      }
      _sound('click');
    },

    closeInlinePrompt() {
      const el = document.getElementById('ultra-inline-prompt-bar');
      if (el) el.style.display = 'none';
    },

    fillPrompt(key) {
      const input = document.getElementById('ultra-inline-prompt-input');
      if (!input) return;
      if (key === 'hero') input.value = 'Modern full-width hero header';
      else if (key === 'pricing') input.value = 'Pricing table with 3 cards';
      else if (key === 'faq') input.value = 'FAQ accordion collapsible questions';
      else if (key === 'login') input.value = 'Glassmorphic login form with validation';
      else if (key === 'stats') input.value = 'Dashboard KPI stats with metrics';
      this.submitInlinePrompt();
    },

    generatePromptComponent(promptText) {
      const val = (promptText || '').toLowerCase().trim();
      let snippet = null;
      if (val.includes('price') || val.includes('pricing')) snippet = SMART_SNIPPETS.find(s => s.key === 'pricing-card');
      else if (val.includes('hero')) snippet = SMART_SNIPPETS.find(s => s.key === 'hero');
      else if (val.includes('grid')) snippet = SMART_SNIPPETS.find(s => s.key === 'grid-3');
      else if (val.includes('login') || val.includes('form') || val.includes('contact')) snippet = SMART_SNIPPETS.find(s => s.key === 'login-form');
      else if (val.includes('kpi') || val.includes('stat')) snippet = SMART_SNIPPETS.find(s => s.key === 'kpi-stat');
      else if (val.includes('faq')) snippet = HTML_TAGS.find(t => t.tag === 'details');
      else snippet = SMART_SNIPPETS.find(s => s.key === 'card');

      const raw = (snippet && (snippet.code || snippet.template)) ? (snippet.code || snippet.template) : '<div class="card">\n  <h3>Component</h3>\n  <p>Content</p>\n</div>';
      return raw.replace(/\$0|\$1|\$2/g, '');
    },

    submitInlinePrompt() {
      const input = document.getElementById('ultra-inline-prompt-input');
      const val = (input ? input.value : '').toLowerCase().trim();
      if (!val) return;

      this.closeInlinePrompt();
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;

      const code = this.generatePromptComponent(val);
      cm.replaceSelection('\n' + code + '\n');
      _sound('spark');
      cm.focus();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(isFr ? 'Bloc HTML généré au curseur !' : 'HTML block generated at cursor!', 'success');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // STANDARD AUTO-CLOSING & SUGGESTION POPUP (Inherited & Optimized)
    // ══════════════════════════════════════════════════════════════════════════
    handleAutoCloseTag(cm) {
      try {
        const cur = cm.getCursor();
        const line = cm.getLine(cur.line);
        const upToCursor = line.slice(0, cur.ch);

        const match = upToCursor.match(/<([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?>$/);
        if (match) {
          const tagName = match[1].toLowerCase();
          if (VOID_ELEMENTS.has(tagName)) return;
          if (upToCursor.endsWith(`</${tagName}>`)) return;

          const closeTag = `</${tagName}>`;
          cm.replaceRange(closeTag, cur);
          cm.setCursor(cur);
          _sound('click');
        }
      } catch(e) {}
    },

    evalSuggestions(cm) {
      const cur = cm.getCursor();
      const line = cm.getLine(cur.line);
      const textBefore = line.slice(0, cur.ch);

      const tokenMatch = textBefore.match(/([<#.]?[a-zA-Z0-9\-_]+)$/);
      if (!tokenMatch) {
        this.hidePopup();
        return;
      }

      const rawToken = tokenMatch[1];
      const hasLt = rawToken.startsWith('<');
      const cleanToken = rawToken.replace(/^[<#.]/, '').toLowerCase();

      if (cleanToken.length === 0 && !hasLt) {
        this.hidePopup();
        return;
      }

      const inTagMatch = textBefore.match(/<([a-zA-Z0-9\-]+)[^>]*$/);
      const isInsideTag = !!inTagMatch && !hasLt;

      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      let matches = [];

      if (isInsideTag) {
        matches = HTML_ATTRIBUTES.filter(a => a.attr.startsWith(cleanToken)).map(a => ({
          type: 'attr',
          name: a.attr,
          label: `${a.attr}=""`,
          desc: isFr ? a.descFr : a.descEn,
          icon: '⚙️',
          template: a.snippet
        }));
      }

      const snippetMatches = SMART_SNIPPETS.filter(s => {
        return s.key.startsWith(cleanToken) || s.aliases.some(al => al.startsWith(cleanToken));
      }).map(s => ({
        type: 'snippet',
        name: s.name,
        label: s.key,
        desc: isFr ? s.descFr : s.descEn,
        icon: s.icon,
        template: s.code
      }));

      const tagMatches = HTML_TAGS.filter(t => t.tag.startsWith(cleanToken)).map(t => ({
        type: 'tag',
        name: t.tag,
        label: `<${t.tag}>`,
        desc: isFr ? t.descFr : t.descEn,
        icon: t.icon,
        template: t.template
      }));

      matches = [...matches, ...snippetMatches, ...tagMatches].slice(0, 7);

      if (matches.length === 0) {
        this.hidePopup();
        return;
      }

      this.currentMatches = matches;
      this.selectedIndex = 0;
      this.tokenRange = {
        from: { line: cur.line, ch: cur.ch - rawToken.length },
        to: cur,
        rawToken
      };

      this.renderPopup(cm);
    },

    renderPopup(cm) {
      if (!this.popupEl) return;
      const cur = cm.getCursor();
      const coords = cm.cursorCoords(cur, 'page');

      const viewportHeight = window.innerHeight;
      const popupHeight = 240;
      let top = coords.bottom + 6;
      if (top + popupHeight > viewportHeight) {
        top = Math.max(10, coords.top - popupHeight - 6);
      }
      const left = Math.min(Math.max(10, coords.left), window.innerWidth - 340);

      this.popupEl.style.left = `${left}px`;
      this.popupEl.style.top = `${top}px`;
      this.popupEl.style.display = 'block';

      let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:rgba(2,6,23,0.8);border-bottom:1px solid rgba(255,255,255,0.08);font-size:10px;color:#94a3b8;font-weight:700">
          <span>✨ HTML COPILOT SUGGESTIONS</span>
          <span style="color:#38bdf8">${this.currentMatches.length} matches</span>
        </div>
        <div style="max-height:210px;overflow-y:auto;padding:4px">
      `;

      this.currentMatches.forEach((m, idx) => {
        const isSel = idx === this.selectedIndex;
        const badgeColor = m.type === 'snippet' ? '#a855f7' : m.type === 'attr' ? '#f59e0b' : '#38bdf8';
        const badgeBg = m.type === 'snippet' ? 'rgba(168,85,247,0.2)' : m.type === 'attr' ? 'rgba(245,158,11,0.2)' : 'rgba(56,189,248,0.2)';
        const badgeText = m.type === 'snippet' ? 'SNIPPET' : m.type === 'attr' ? 'ATTR' : 'TAG';

        html += `
          <div class="copilot-item" onclick="UltraHtmlAssistant.selectMatchByIndex(${idx})" style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:8px;cursor:pointer;margin-bottom:2px;background:${isSel ? 'rgba(56,189,248,0.2)' : 'transparent'};border:1px solid ${isSel ? 'rgba(56,189,248,0.5)' : 'transparent'};transition:all .15s">
            <div style="display:flex;align-items:center;gap:8px;min-width:0">
              <span style="font-size:14px">${m.icon}</span>
              <div style="min-width:0">
                <div style="font-size:12px;font-weight:800;color:${isSel ? '#38bdf8' : '#fff'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${m.label}
                </div>
                <div style="font-size:10px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  ${m.desc}
                </div>
              </div>
            </div>
            <span style="font-size:9px;font-weight:800;padding:2px 6px;border-radius:6px;background:${badgeBg};color:${badgeColor}">
              ${badgeText}
            </span>
          </div>
        `;
      });

      html += `
        </div>
        <div style="padding:4px 10px;background:rgba(2,6,23,0.9);border-top:1px solid rgba(255,255,255,0.06);font-size:9px;color:#64748b;display:flex;justify-content:space-between">
          <span>↑↓ Navigate</span>
          <span>Tab / Enter to insert</span>
        </div>
      `;

      this.popupEl.innerHTML = html;
    },

    moveSelection(delta) {
      if (!this.currentMatches.length) return;
      this.selectedIndex = (this.selectedIndex + delta + this.currentMatches.length) % this.currentMatches.length;
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const editor = getEditor();
      if (editor) this.renderPopup(editor);
    },

    selectMatchByIndex(idx) {
      this.selectedIndex = idx;
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const editor = getEditor();
      if (editor) this.applySelectedMatch(editor);
    },

    applySelectedMatch(cm) {
      if (!this.tokenRange || !this.currentMatches[this.selectedIndex]) return;
      const match = this.currentMatches[this.selectedIndex];
      this.hidePopup();

      let template = match.template;
      const placeholderIdx = template.indexOf('$0');
      const cleanTemplate = template.replace(/\$0|\$1|\$2/g, '');

      cm.replaceRange(cleanTemplate, this.tokenRange.from, this.tokenRange.to);

      if (placeholderIdx !== -1) {
        const fromPos = this.tokenRange.from;
        const lines = template.slice(0, placeholderIdx).split('\n');
        const targetLine = fromPos.line + lines.length - 1;
        const targetCh = (lines.length === 1 ? fromPos.ch : 0) + lines[lines.length - 1].length;
        cm.setCursor({ line: targetLine, ch: targetCh });
      }

      _sound('spark');
      cm.focus();
    },

    isPopupVisible() {
      return this.popupEl && this.popupEl.style.display !== 'none';
    },

    hidePopup() {
      if (this.popupEl) {
        this.popupEl.style.display = 'none';
      }
      this.currentMatches = [];
      this.tokenRange = null;
    },

    insertSnippetDirectly(key) {
      const getEditor = () => (typeof APP !== 'undefined' && APP.editor) ? APP.editor : null;
      const cm = getEditor();
      if (!cm) return;

      const snippet = SMART_SNIPPETS.find(s => s.key === key) || HTML_TAGS.find(t => t.tag === key);
      if (!snippet) return;

      const code = (snippet.code || snippet.template || '').replace(/\$0|\$1|\$2/g, '');
      cm.replaceSelection(code + '\n');
      _sound('spark');
      cm.focus();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(isFr ? `Composant [${snippet.name || snippet.tag}] inséré !` : `Component [${snippet.name || snippet.tag}] inserted!`, 'success');
    },

    renderQuickBarState() {
      const indicator = document.getElementById('copilot-status-indicator');
      if (indicator) {
        indicator.textContent = this.isEnabled ? 'ON' : 'OFF';
        indicator.style.color = this.isEnabled ? '#34d399' : '#94a3b8';
      }
      const renameBtn = document.getElementById('copilot-autorename-btn');
      if (renameBtn) {
        renameBtn.style.color = this.autoRenameEnabled ? '#38bdf8' : '#94a3b8';
      }
      const inspectBtn = document.getElementById('copilot-inspect-btn');
      if (inspectBtn) {
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        if (this.inspectMode) {
          inspectBtn.style.background = 'rgba(56,189,248,0.25)';
          inspectBtn.style.borderColor = '#38bdf8';
          inspectBtn.style.color = '#fff';
          inspectBtn.innerHTML = '🎯 ' + (isFr ? 'Inspecter...' : 'Inspecting...');
        } else {
          inspectBtn.style.background = '';
          inspectBtn.style.borderColor = 'rgba(14,165,233,0.4)';
          inspectBtn.style.color = '#38bdf8';
          inspectBtn.innerHTML = '🎯 ' + (isFr ? 'Inspecter' : 'Inspect');
        }
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // DEDICATED STUDIO MODAL & COMPONENT BROWSER
    // ══════════════════════════════════════════════════════════════════════════
    activeModalCat: 'all',
    modalSearchQuery: '',

    openStudio() {
      _sound('click');
      const modal = document.getElementById('modal-html-assistant');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.renderStudioModalContent();
      modal.classList.add('show');
    },

    closeStudio() {
      _sound('click');
      const modal = document.getElementById('modal-html-assistant');
      if (modal) modal.classList.remove('show');
    },

    setStudioCategory(cat) {
      _sound('click');
      this.activeModalCat = cat;
      this.renderStudioModalContent();
    },

    onStudioSearch(val) {
      this.modalSearchQuery = (val || '').toLowerCase().trim();
      this.renderStudioModalContent();
    },

    renderStudioModalContent() {
      const container = document.getElementById('html-assistant-catalog-grid');
      if (!container) return;

      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const query = this.modalSearchQuery;
      const cat = this.activeModalCat;

      const allItems = [
        ...SMART_SNIPPETS.map(s => ({ ...s, isSnippet: true })),
        ...HTML_TAGS.map(t => ({ key: t.tag, name: `<${t.tag}> Tag`, descEn: t.descEn, descFr: t.descFr, icon: t.icon, cat: t.cat, code: t.template.replace(/\$0|\$1|\$2/g, ''), isSnippet: false }))
      ];

      const filtered = allItems.filter(item => {
        const matchesCat = cat === 'all' || item.cat === cat || (cat === 'snippets' && item.isSnippet);
        const matchesQuery = !query ||
          item.key.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          (item.descEn && item.descEn.toLowerCase().includes(query)) ||
          (item.descFr && item.descFr.toLowerCase().includes(query));
        return matchesCat && matchesQuery;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b">
            <div style="font-size:2rem;margin-bottom:8px">🔍</div>
            <div style="font-size:0.9rem">No HTML elements match "${query}"</div>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(item => {
        const desc = isFr ? (item.descFr || item.descEn) : (item.descEn || item.descFr);
        const previewCode = item.code.length > 150 ? item.code.slice(0, 145) + '...' : item.code;

        return `
          <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 10px 25px rgba(0,0,0,0.3);transition:transform .15s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:1.4rem">${item.icon}</span>
                  <div>
                    <div style="font-size:0.95rem;font-weight:800;color:#fff">${item.name}</div>
                    <div style="font-size:0.72rem;color:#38bdf8;font-family:monospace;font-weight:700">${item.key}</div>
                  </div>
                </div>
                <span style="font-size:0.65rem;font-weight:800;padding:2px 8px;border-radius:6px;background:${item.isSnippet ? 'rgba(168,85,247,0.2)' : 'rgba(56,189,248,0.2)'};color:${item.isSnippet ? '#c084fc' : '#38bdf8'}">
                  ${item.isSnippet ? 'COMPONENT' : 'TAG'}
                </span>
              </div>
              <p style="font-size:0.78rem;color:#94a3b8;margin:0 0 12px;line-height:1.4">${desc}</p>
              <pre style="background:#030712;padding:8px 10px;border-radius:8px;font-size:0.7rem;color:#34d399;font-family:monospace;overflow-x:auto;max-height:80px;margin:0 0 14px">${previewCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </div>
            <div style="display:flex;gap:8px">
              <button onclick="UltraHtmlAssistant.insertFromStudio('${item.key}')" class="btn-primary" style="flex:1;background:#38bdf8;color:#000;font-size:0.72rem;padding:7px 10px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:4px">
                <span>⚡</span><span>${isFr ? 'Insérer' : 'Insert at Cursor'}</span>
              </button>
              <button onclick="UltraHtmlAssistant.copyCode('${encodeURIComponent(item.code)}')" class="tb-btn" style="font-size:0.72rem;padding:7px 10px">
                📋
              </button>
            </div>
          </div>
        `;
      }).join('');
    },

    insertFromStudio(key) {
      this.insertSnippetDirectly(key);
      this.closeStudio();
    },

    copyCode(encodedCode) {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy HTML Snippet')) return;
      const code = decodeURIComponent(encodedCode);
      navigator.clipboard.writeText(code).then(() => {
        _sound('spark');
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        _toast(isFr ? 'Code copié dans le presse-papiers !' : 'Code copied to clipboard!', 'success');
      });
    },

    // Public Knowledge Bases & Inspection
    HTML_TAGS,
    HTML_ATTRIBUTES,
    SMART_SNIPPETS,
    VOID_ELEMENTS,

    getSuggestions(rawToken, contextType = 'all') {
      const cleanToken = (rawToken || '').replace(/^[<#.]/, '').toLowerCase();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      if (contextType === 'attr') {
        return HTML_ATTRIBUTES.filter(a => a.attr.startsWith(cleanToken)).map(a => ({
          type: 'attr',
          name: a.attr,
          label: `${a.attr}=""`,
          desc: isFr ? a.descFr : a.descEn,
          icon: '⚙️',
          template: a.snippet
        }));
      }

      if (contextType === 'snippet') {
        return SMART_SNIPPETS.filter(s => {
          return s.key.startsWith(cleanToken) || s.aliases.some(al => al.startsWith(cleanToken));
        }).map(s => ({
          type: 'snippet',
          name: s.name,
          label: s.key,
          desc: isFr ? s.descFr : s.descEn,
          icon: s.icon,
          template: s.code
        }));
      }

      if (contextType === '<' || contextType === 'tag') {
        return HTML_TAGS.filter(t => t.tag.startsWith(cleanToken)).map(t => ({
          type: 'tag',
          name: t.tag,
          label: `<${t.tag}>`,
          desc: isFr ? t.descFr : t.descEn,
          icon: t.icon,
          template: t.template
        }));
      }

      const attrMatches = HTML_ATTRIBUTES.filter(a => a.attr.startsWith(cleanToken)).map(a => ({
        type: 'attr',
        name: a.attr,
        label: `${a.attr}=""`,
        desc: isFr ? a.descFr : a.descEn,
        icon: '⚙️',
        template: a.snippet
      }));
      const snippetMatches = SMART_SNIPPETS.filter(s => {
        return s.key.startsWith(cleanToken) || s.aliases.some(al => al.startsWith(cleanToken));
      }).map(s => ({
        type: 'snippet',
        name: s.name,
        label: s.key,
        desc: isFr ? s.descFr : s.descEn,
        icon: s.icon,
        template: s.code
      }));
      const tagMatches = HTML_TAGS.filter(t => t.tag.startsWith(cleanToken)).map(t => ({
        type: 'tag',
        name: t.tag,
        label: `<${t.tag}>`,
        desc: isFr ? t.descFr : t.descEn,
        icon: t.icon,
        template: t.template
      }));

      return [...attrMatches, ...snippetMatches, ...tagMatches].slice(0, 10);
    }
  };

  // Expose globally
  window.UltraHtmlAssistant = UltraHtmlAssistant;

  // Auto-init on page readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UltraHtmlAssistant.init());
  } else {
    UltraHtmlAssistant.init();
  }
})();
