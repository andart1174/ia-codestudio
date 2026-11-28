/**
 * IA Code Studio — Static SEO & Native French Pages Generator
 * Builds:
 *   1. /compare/index.html + 6 high-intent comparison guides (EN + FR toggle)
 *   2. Native French SEO pages: /fr/index.html, /fr/3d-studios/index.html,
 *      /fr/marketing-widgets/index.html, /fr/arcade/index.html, /fr/compare/index.html
 * Run: node scripts/build-seo-pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'https://ia-codestudio.com';
const OG_IMG = `${HOST}/og-social-banner.png`;

function writePage(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('BUILT:', relPath);
}

const COMPARE_CSS = `
  .cmp-table-wrap { overflow-x:auto; margin: 28px 0 36px; border-radius:16px; border:1px solid rgba(255,255,255,0.1); background:rgba(15,23,42,0.75); }
  .cmp-table { width:100%; border-collapse:collapse; text-align:left; font-size:0.92rem; }
  .cmp-table th, .cmp-table td { padding:14px 18px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .cmp-table th { background:rgba(139,92,246,0.14); color:#fff; font-family:'Outfit',sans-serif; font-weight:700; }
  .cmp-table tr:last-child td { border-bottom:none; }
  .cmp-table td:first-child { font-weight:600; color:#e2e8f0; }
  .cmp-yes { color:#34d399; font-weight:700; }
  .cmp-no { color:#94a3b8; }
  .cmp-grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin:28px 0 36px; }
  .cmp-box { background:rgba(15,23,42,0.75); border:1px solid rgba(255,255,255,0.08); border-radius:18px; padding:24px; }
  .cmp-box h2 { font-family:'Outfit',sans-serif; font-size:1.25rem; margin-bottom:12px; color:#fff; }
  .cmp-box ul { padding-left:18px; color:#cbd5e1; font-size:0.92rem; line-height:1.75; }
  .cmp-faq details { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px 20px; margin-bottom:10px; }
  .cmp-faq summary { cursor:pointer; font-weight:700; color:#fff; font-size:0.96rem; }
  .cmp-faq p { color:#94a3b8; font-size:0.92rem; margin-top:10px; line-height:1.65; }
  @media (max-width: 720px) { .cmp-grid-2 { grid-template-columns:1fr; } }
`;

const COMPARISONS = [
  {
    slug: 'ia-code-studio-vs-codepen.html',
    icon: '💻',
    badge: 'AI Web IDE vs Sandbox',
    titleEn: 'IA Code Studio vs CodePen — Free AI Web IDE & Offline Sandbox (2026)',
    titleFr: 'IA Code Studio vs CodePen — IDE Web IA & Sandbox Hors-Ligne (2026)',
    h1En: 'IA Code Studio vs CodePen: Which Browser Code Editor Fits Your Workflow?',
    h1Fr: 'IA Code Studio vs CodePen : Quel éditeur web choisir ?',
    descEn: 'Compare IA Code Studio (IA Architecte Studio Pro + Free Offline Sandbox) against CodePen: AI prompt-to-app generation, Three.js 3D studios, offline privacy, and standalone ZIP export.',
    descFr: 'Comparez IA Code Studio (IA Architecte Studio Pro + Sandbox gratuite) et CodePen : génération IA par prompts, studios 3D Three.js, outils hors-ligne et export ZIP autonome.',
    ctaHref: '/ia-architecte-app/index.html',
    ctaLabelEn: '🚀 Launch IA Architecte Studio Pro Free',
    ctaLabelFr: '🚀 Lancer IA Architecte Studio Pro Gratuitement',
    rows: [
      ['AI Prompt-to-App Generation', '✓ Built-in (HTML/CSS/JS + Three.js)', '✕ Manual coding only'],
      ['Live HTML / CSS / JS Sandbox', '✓ Free split-screen + console (#code= share)', '✓ Public pens free'],
      ['100% Client-Side Offline Dev Tools', '✓ OmniConvert, Tailwind→CSS, SVG, Bento Grid', '✕ Requires cloud session'],
      ['Built-in 3D WebGL & UI Component Studios', '✓ 6 3D Studios + 72 React/Vue 3D components', '✕ Must hand-code from scratch'],
      ['Standalone Clean ZIP Export', '✓ 1 Free Starter ZIP/day · Unlimited Pro ($10/mo)', '✓ Paid Pro plan required for Projects'],
      ['Bilingual EN / FR Interface', '✓ Native English & French', '✕ English only']
    ],
    whenIa: [
      'You want to go from a plain-text prompt to a working landing page, dashboard, or Three.js scene in seconds.',
      'You need offline developer utilities (JSON/YAML, JWT, Regex, Tailwind→CSS, SVG Optimizer) in the same workspace.',
      'You want ready-to-export standalone HTML/CSS/JS ZIP bundles with zero setup.'
    ],
    whenOther: [
      'You primarily want a large social gallery to browse community CSS art experiments.',
      'You already maintain a team library of Pens hosted on CodePen.'
    ],
    faqs: [
      { q: 'Can I use IA Code Studio as a free CodePen alternative?', a: 'Yes. Both IA Architecte Studio Pro and our Live Sandbox Playground v2.0 let you write, preview, and share HTML, CSS, JavaScript, and Three.js directly in your browser without mandatory signup.' },
      { q: 'Does IA Code Studio export clean standalone HTML/CSS/JS?', a: 'Yes. Exported files have no proprietary wrapper or vendor lock-in — double-click index.html and it runs anywhere.' },
      { q: 'Are my code snippets private?', a: 'Yes. Unlike public-by-default CodePen free pens, IA Code Studio Free Tools and local drafts stay private inside your browser.' }
    ]
  },
  {
    slug: 'ia-code-studio-vs-spline.html',
    icon: '💎',
    badge: '3D WebGL & Shaders',
    titleEn: 'IA Code Studio vs Spline 3D — Free Three.js Generator & 4D Liquid Chrome Studio',
    titleFr: 'IA Code Studio vs Spline 3D — Générateur Three.js & Studio Chrome Liquide 4D',
    h1En: 'IA Code Studio vs Spline 3D: Browser 3D Web Design Compared',
    h1Fr: 'IA Code Studio vs Spline 3D : Comparatif Création Web 3D dans le Navigateur',
    descEn: 'Compare IA Code Studio 3D Studios (Liquid Chrome 4D, 3D Creative Studio, SVG/DXF to 3D) against Spline 3D: Three.js code ownership, 3MF/GLB export, pricing, and zero-watermark embeds.',
    descFr: 'Comparez les Studios 3D d’IA Code Studio (Liquid Chrome 4D, 3D Creative Studio, SVG→3D) et Spline 3D : propriété du code Three.js, export 3MF/GLB et tarifs.',
    ctaHref: '/3d-studios/index.html',
    ctaLabelEn: '💎 Explore All 6 3D & WebGL Studios',
    ctaLabelFr: '💎 Explorer les 6 Studios 3D & WebGL',
    rows: [
      ['Clean Three.js / HTML Source Code Export', '✓ Standalone Three.js, React JSX & Vue 3', '✕ Proprietary runtime embed'],
      ['SVG & DXF Blueprint to 3D Mesh Extruder', '✓ Built-in (Studio 3D/4D Pro & Marketing Lab)', '✓ SVG import (no DXF CAD)'],
      ['Procedural 4D Liquid Chrome & Mecha Shaders', '✓ 18 ready-to-customize 4D compartments', '✕ Must build manually'],
      ['3D UI Components Library (Buttons, Cards, Globes)', '✓ 72+ ready components (3D Creative Studio)', '✕ General modeling canvas'],
      ['3MF Multicolor 3D Print + GLB Export', '✓ Built-in in Liquid Chrome Studio', '✓ GLB/STL on paid tiers'],
      ['All-Access Pro Pricing', '✓ $10/month (includes AI Web IDE & 23 Ad Studios)', '$20–$32+/month per seat']
    ],
    whenIa: [
      'You want clean, lightweight Three.js, React, or Vue code that you own 100% without loading heavy proprietary runtimes.',
      'You need instant SVG/DXF 3D extrusion, 72 ready-made 3D UI components, or liquid chrome shaders in minutes.',
      'You want an affordable $10/mo all-in-one suite combining 3D WebGL and AI web app coding.'
    ],
    whenOther: [
      'You need a full manual polygon sculpting and keyframe animation timeline for bespoke 3D characters.',
      'Your design team collaborates exclusively on Spline cloud scenes.'
    ],
    faqs: [
      { q: 'Does IA Code Studio add a watermark to exported 3D code?', a: 'No. Pro code exports give you clean standalone Three.js, HTML, React JSX, or Vue 3 files with zero forced runtime branding.' },
      { q: 'Can I convert my SVG logo to 3D for free?', a: 'Yes — open Studio 3D/4D Pro or 3D Marketing Lab to extrude SVG vectors into interactive 3D meshes right in your browser.' },
      { q: 'Do the 3D scenes run smoothly on mobile phones?', a: 'Yes. All studios target 60 FPS WebGL rendering with responsive touch orbit controls.' }
    ]
  },
  {
    slug: 'ia-code-studio-vs-bolt.html',
    icon: '⚡',
    badge: 'AI App Builders',
    titleEn: 'IA Code Studio vs Bolt & Lovable — Zero-Setup Browser HTML/CSS/JS AI Builder',
    titleFr: 'IA Code Studio vs Bolt & Lovable — Constructeur Web IA Sans Configuration',
    h1En: 'IA Code Studio vs Bolt.new & Lovable: Fast Browser Prototyping Compared',
    h1Fr: 'IA Code Studio vs Bolt.new & Lovable : Prototypage Web IA Comparé',
    descEn: 'Compare IA Architecte Studio Pro & Ultra v2.0 against Bolt and Lovable: zero token burn for UI prototyping, instant standalone HTML/CSS/JS export, built-in 3D WebGL, and flat $10/mo pricing.',
    descFr: 'Comparez IA Architecte Studio Pro & Ultra v2.0 face à Bolt et Lovable : prototypage rapide sans quota de tokens, export HTML/CSS/JS autonome, 3D WebGL intégré et tarif fixe $10/mois.',
    ctaHref: '/ia-architecte-app/index.html',
    ctaLabelEn: '🚀 Try IA Architecte Studio Pro Now',
    ctaLabelFr: '🚀 Essayer IA Architecte Studio Pro',
    rows: [
      ['Instant Zero-Setup Start (No Credit Card)', '✓ Opens in 1 second, no token anxiety', 'Requires account + daily token limits'],
      ['Export Format', '✓ Zero-build standalone HTML/CSS/JS ZIP (runs on double-click)', 'Multi-file Vite/Node repo requiring npm install'],
      ['Built-in 3D WebGL & Interactive Widgets', '✓ 6 3D Studios + 23 Marketing Studios included', '✕ Text-only generation'],
      ['Offline Developer Utilities Included', '✓ 10+ offline tools (OmniConvert, Regex, SVG, Bento)', '✕ Not included'],
      ['Pricing Predictability', '✓ Flat $10/month unlimited Pro exports', '$20–$50+/month token-metered plans']
    ],
    whenIa: [
      'You want fast, portable HTML/CSS/JS apps, landing pages, widgets, and 3D WebGL interfaces that run anywhere without Node/npm build chains.',
      'You want predictable flat pricing ($0 free / $10/mo Pro) without burning paid tokens on every minor CSS tweak.',
      'You work in English or French and want built-in 3D UI and marketing studios.'
    ],
    whenOther: [
      'You specifically want a hosted cloud container running full-stack Node.js + Postgres backends provisioned automatically.'
    ],
    faqs: [
      { q: 'Can I host apps exported from IA Architecte Studio Pro on Netlify, Vercel, or GitHub Pages?', a: 'Yes! Because exported apps are clean standalone HTML, CSS, and JavaScript, you can drag-and-drop the ZIP onto Netlify or push to GitHub Pages in seconds with zero build step.' },
      { q: 'Are there per-prompt token overage fees?', a: 'No. Free access lets you prototype and preview freely, and Pro is a simple flat $10/month.' }
    ]
  },
  {
    slug: 'free-svg-to-3d-converter-online.html',
    icon: '📐',
    badge: 'SVG / DXF to 3D',
    titleEn: 'Free Online SVG & DXF to 3D Three.js Converter — No Blender Needed',
    titleFr: 'Convertisseur Gratuit SVG & DXF en 3D Three.js en Ligne — Sans Blender',
    h1En: 'Convert SVG Logos & DXF Blueprints to Interactive 3D WebGL in Seconds',
    h1Fr: 'Convertissez vos Logos SVG & Plans DXF en 3D WebGL Interactif',
    descEn: 'Turn flat 2D SVG vectors and DXF CAD files into metallic, animated 3D Three.js meshes directly in your browser. Customize bevel, depth, lighting, and export embeddable code.',
    descFr: 'Transformez vos logos SVG 2D et plans DXF en objets 3D Three.js métalliques et animés directement dans votre navigateur. Export HTML/WebGL en 1 clic.',
    ctaHref: '/studio-3d-4d-pro/index.html',
    ctaLabelEn: '🎨 Open Studio 3D/4D Pro Extruder',
    ctaLabelFr: '🎨 Ouvrir l’Extrudeur Studio 3D/4D Pro',
    rows: [
      ['Input Formats Supported', '✓ SVG vectors, DXF CAD, STL, GLB, OBJ', 'Manual Blender import + shader setup'],
      ['Setup & Hardware Needed', '✓ 0 MB download — runs in any WebGL browser', '500 MB+ desktop install + learning curve'],
      ['Bevel, Extrusion Depth & Metallic Materials', '✓ Real-time sliders at 60 FPS', 'Manual modifier stack'],
      ['Ready-to-Embed Website Widget', '✓ 1-click standalone Three.js HTML export', 'Requires manual glTF export + viewer code']
    ],
    whenIa: [
      'You want to turn a client SVG logo into a rotating 3D hero element for a website in under 2 minutes.',
      'You need quick DXF extrusion or STL/GLB browser previews without opening desktop CAD software.'
    ],
    whenOther: [
      'You are doing cinema VFX, UV unwrapping, or complex organic sculpting where Blender excels.'
    ],
    faqs: [
      { q: 'Which tools on IA Code Studio convert SVG to 3D?', a: 'Both Studio 3D/4D Pro (/studio-3d-4d-pro/) for full SVG/DXF/STL/GLB scenes and 3D Marketing Lab (/3d-marketing-lab/svg-to-3d-converter.html) for quick viral 3D brand logos.' },
      { q: 'Does my SVG file get uploaded to an external server?', a: 'No. Parsing and 3D mesh extrusion happen locally inside your browser using Three.js SVGLoader.' }
    ]
  },
  {
    slug: 'best-offline-developer-tools.html',
    icon: '🛠️',
    badge: '100% Offline Privacy',
    titleEn: 'Best Free Offline Developer Tools (2026) — Zero Server Uploads | IA Code Studio',
    titleFr: 'Meilleurs Outils Développeurs Gratuits Hors-Ligne (2026) — Zéro Envoi Serveur',
    h1En: '11 Free Client-Side Developer Tools That Never Upload Your Data',
    h1Fr: '11 Outils Développeurs Gratuits 100% Locaux Qui Respectent Vos Données',
    descEn: 'Format JSON/YAML/XML, decode JWT tokens, test Regex, transpile Tailwind to CSS, optimize SVGs, and build Bento grids 100% locally in your browser with zero tracking or ads.',
    descFr: 'Convertissez JSON/YAML/XML, décodez vos JWT, testez vos Regex, transpilez Tailwind en CSS et optimisez vos SVG 100% localement dans votre navigateur sans publicité.',
    ctaHref: '/free-tools/index.html',
    ctaLabelEn: '🛠️ Open Free Developer Tools Hub',
    ctaLabelFr: '🛠️ Ouvrir le Hub Outils Développeurs',
    rows: [
      ['Data Privacy (JWTs, JSON, API Keys, SVGs)', '✓ 100% local browser execution (zero network calls)', 'Many online tools log payloads server-side'],
      ['Works Offline (PWA Cached)', '✓ Yes — Service Worker offline support', '✕ Breaks without internet'],
      ['Ad-Free & Clean Dark UI', '✓ Zero popups or banner clutter', 'Often filled with intrusive ads'],
      ['All-in-One Dev Suite', '✓ OmniConvert + Sandbox + Mesh + Bento + Tailwind + Regex/JWT', 'Scattered across 10 different bookmarks']
    ],
    whenIa: [
      'You handle production JSON payloads, JWT tokens, or proprietary SVGs that must never leave your machine.',
      'You want one fast bookmarked hub combining OmniConvert Pro, Live Sandbox, CSS Mesh Lab, Bento Builder, Tailwind→CSS, and Dev Swiss Kit.'
    ],
    whenOther: [
      'You need CLI-only batch pipelines inside CI/CD servers.'
    ],
    faqs: [
      { q: 'Are all tools in the Free Tools Hub really 100% free?', a: 'Yes! OmniConvert Pro 2.0 and all 10 tools in /free-tools/ are completely free with no account required.' },
      { q: 'Can I verify that no data leaves my browser?', a: 'Yes — open your browser DevTools Network tab while converting JSON, Base64, or JWT tokens and observe zero outgoing requests.' }
    ]
  },
  {
    slug: 'free-3d-ui-components-react-vue.html',
    icon: '✨',
    badge: '72+ 3D UI Assets',
    titleEn: '72+ Interactive 3D UI Components for HTML, React & Vue — 3D Creative Studio',
    titleFr: '72+ Composants UI 3D Interactifs pour HTML, React & Vue — 3D Creative Studio',
    h1En: 'Build Interactive 3D Buttons, Holographic Cards & Globes for React, Vue & HTML',
    h1Fr: 'Créez des Boutons 3D, Cartes Holographiques & Globes pour React, Vue & HTML',
    descEn: 'Preview and customize 72+ interactive 3D UI components visually in 3D Creative Studio v2.0: 3D buttons, glass cards, Bento grids, 3D globes, and pricing tables exported to HTML, React JSX, or Vue 3.',
    descFr: 'Personnalisez plus de 72 composants UI 3D interactifs dans 3D Creative Studio v2.0 : boutons 3D, cartes holographiques, grilles Bento et globes exportables en HTML, React JSX ou Vue 3.',
    ctaHref: '/3d-creative-studio/index.html',
    ctaLabelEn: '✨ Open 3D Creative Studio (72+ Components)',
    ctaLabelFr: '✨ Ouvrir 3D Creative Studio (72+ Composants)',
    rows: [
      ['Interactive Live Customizer & AI Stylist', '✓ Customize colors, tilt, glow & copy live', 'Static code snippets only'],
      ['Multi-Framework Export', '✓ Standalone HTML, React JSX, Vue 3 SFC, Web Component', 'Usually single-framework only'],
      ['Component Variety', '✓ 72+ assets across 20 categories (Buttons, Cards, Globes, Synths)', 'Small 5–10 snippet collections'],
      ['Mobile QR Live Preview', '✓ Built-in Preset Vault & instant QR sharing', '✕ Manual deployment needed']
    ],
    whenIa: [
      'You want high-impact 3D micro-interactions and holographic sections for SaaS landing pages without spending days writing CSS 3D transforms and shaders.',
      'You work across React, Vue 3, or vanilla HTML/Webflow/WordPress.'
    ],
    whenOther: [
      'You only need plain flat form inputs from a headless UI kit like Radix or shadcn/ui (which pair great alongside 3D Creative Studio hero components!).'
    ],
    faqs: [
      { q: 'Can I preview all 72 3D components for free?', a: 'Yes! Customizing, visual gallery search, AI Stylist, Preset Vault, and QR preview sharing are 100% free. Pro ($10/mo) unlocks unlimited production code copy & framework exports.' },
      { q: 'Do exported components work in Next.js, Vite, and Nuxt?', a: 'Yes — React JSX and Vue 3 SFC exports drop cleanly into modern Next.js, Vite, Remix, and Nuxt projects.' }
    ]
  }
];

function buildComparisonPage(c) {
  const canUrl = `${HOST}/compare/${c.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: c.h1En,
        description: c.descEn,
        url: canUrl,
        image: OG_IMG,
        author: { '@type': 'Organization', name: 'IA Code Studio', url: `${HOST}/` },
        publisher: { '@type': 'Organization', name: 'IA Code Studio', logo: { '@type': 'ImageObject', url: `${HOST}/logo-ia-codestudio.webp` } },
        datePublished: '2026-11-27',
        dateModified: '2026-11-27'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'IA Code Studio', item: `${HOST}/` },
          { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${HOST}/compare/` },
          { '@type': 'ListItem', position: 3, name: c.h1En, item: canUrl }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };

  const rowsHtml = c.rows.map(([feat, ia, other]) => `
        <tr>
          <td>${feat}</td>
          <td class="cmp-yes">${ia}</td>
          <td class="cmp-no">${other}</td>
        </tr>`).join('');

  const whenIaHtml = c.whenIa.map(x => `<li>${x}</li>`).join('\n          ');
  const whenOtherHtml = c.whenOther.map(x => `<li>${x}</li>`).join('\n          ');
  const faqsHtml = c.faqs.map(f => `
      <details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join('');

  const relatedHtml = COMPARISONS.filter(x => x.slug !== c.slug).slice(0, 4).map(r => `
      <a href="/compare/${r.slug}" class="hub-mini-card">
        <span class="hub-mini-icon">${r.icon}</span>
        <div>
          <strong>${r.titleEn.split('—')[0].trim()}</strong>
          <span>${r.badge}</span>
        </div>
      </a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.titleEn}</title>
  <meta name="description" content="${c.descEn}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canUrl}">
  <link rel="icon" type="image/png" href="/logo-ia-codestudio.png">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canUrl}">
  <meta property="og:title" content="${c.titleEn}">
  <meta property="og:description" content="${c.descEn}">
  <meta property="og:image" content="${OG_IMG}">
  <meta property="og:site_name" content="IA Code Studio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${c.titleEn}">
  <meta name="twitter:description" content="${c.descEn}">
  <meta name="twitter:image" content="${OG_IMG}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <link rel="stylesheet" href="/css/hub-pages.css?v=20261127">
  <style>${COMPARE_CSS}</style>
</head>
<body>
  <div class="hub-bg-glow"></div>

  <header class="hub-navbar">
    <div class="hub-nav-inner">
      <a href="/index.html" class="hub-brand">
        <img src="/logo-ia-codestudio.webp" alt="IA Code Studio">
        <span>IA CODE STUDIO</span>
      </a>
      <nav class="hub-nav-links" aria-label="Main navigation">
        <a href="/index.html" class="hub-nav-link">AI Code IDE</a>
        <a href="/3d-studios/index.html" class="hub-nav-link">3D Studios</a>
        <a href="/free-tools/index.html" class="hub-nav-link">Dev Tools</a>
        <a href="/compare/index.html" class="hub-nav-link active">Comparisons</a>
        <a href="/fr/index.html" class="hub-nav-link">Français</a>
      </nav>
      <div class="hub-nav-actions">
        <a href="/ia-architecte-app/index.html" class="hub-cta-primary">
          <span>🚀</span> <span class="cta-label-long">Open Studio Pro</span>
        </a>
        <button type="button" class="hub-mobile-toggle" id="hub-mob-btn" aria-label="Menu">☰</button>
      </div>
    </div>
  </header>

  <div class="hub-mobile-drawer" id="hub-mob-drawer">
    <a href="/index.html">AI Code IDE</a>
    <a href="/3d-studios/index.html">3D Studios</a>
    <a href="/free-tools/index.html">Dev Tools</a>
    <a href="/marketing-widgets/index.html">Marketing &amp; Widgets</a>
    <a href="/compare/index.html" class="active">Comparisons</a>
    <a href="/fr/index.html">Version Française</a>
  </div>

  <main class="hub-main">
    <div class="hub-breadcrumb">
      <a href="/index.html">Home</a>
      <span>/</span>
      <a href="/compare/index.html">Comparisons</a>
      <span>/</span>
      <span>${c.badge}</span>
    </div>

    <section class="hub-hero">
      <div class="hub-eyebrow">${c.icon} ${c.badge} · 2026 GUIDE</div>
      <h1>${c.h1En}</h1>
      <p>${c.descEn}</p>
      <div style="margin-top:24px; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <a href="${c.ctaHref}" class="hub-cta-primary" style="padding:13px 24px; font-size:0.95rem;">${c.ctaLabelEn}</a>
        <a href="/compare/index.html" class="hub-btn-secondary">← All Comparison Guides</a>
      </div>
    </section>

    <div class="cmp-table-wrap">
      <table class="cmp-table">
        <thead>
          <tr>
            <th>Capability</th>
            <th>IA Code Studio</th>
            <th>Traditional Alternative</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}
        </tbody>
      </table>
    </div>

    <section class="cmp-grid-2">
      <div class="cmp-box" style="border-color:rgba(16,185,129,0.3);">
        <h2>✅ Choose IA Code Studio if...</h2>
        <ul>
          ${whenIaHtml}
        </ul>
      </div>
      <div class="cmp-box">
        <h2>ℹ️ Choose the alternative if...</h2>
        <ul>
          ${whenOtherHtml}
        </ul>
      </div>
    </section>

    <section class="cmp-faq" style="margin-bottom:48px;">
      <div class="hub-section-header">
        <div>
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers about exports, privacy, and free vs Pro access.</p>
        </div>
      </div>${faqsHtml}
    </section>

    <div class="hub-section-header">
      <div>
        <h2>More Comparisons &amp; Alternatives</h2>
        <p>Explore how IA Code Studio compares across AI coding, 3D WebGL, and offline developer utilities.</p>
      </div>
    </div>
    <section class="hub-strip-grid">${relatedHtml}
    </section>

    <section class="hub-ide-callout">
      <div>
        <h3>Test IA Code Studio right now — free in your browser</h3>
        <p>Launch IA Architecte Studio Pro with zero installation, preview at 60 FPS, and export clean standalone HTML/CSS/JS.</p>
      </div>
      <a href="${c.ctaHref}" class="hub-cta-primary" style="padding:13px 24px; font-size:0.95rem;">${c.ctaLabelEn}</a>
    </section>
  </main>

  <footer class="hub-footer">
    <div class="hub-footer-inner">
      <span>© 2026 IA Code Studio. All rights reserved.</span>
      <div class="hub-footer-links">
        <a href="/index.html">Home</a>
        <a href="/3d-studios/index.html">3D Studios</a>
        <a href="/free-tools/index.html">Dev Tools</a>
        <a href="/compare/index.html">Comparisons</a>
        <a href="/fr/index.html">Français</a>
        <a href="/privacy-policy.html">Privacy Policy</a>
      </div>
    </div>
  </footer>
  <script>
    const mobBtn = document.getElementById('hub-mob-btn');
    const drawer = document.getElementById('hub-mob-drawer');
    if (mobBtn && drawer) mobBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  </script>
</body>
</html>`;
}

function buildCompareHub(lang) {
  const isFr = lang === 'fr';
  const canUrl = isFr ? `${HOST}/fr/compare/` : `${HOST}/compare/`;
  const cards = COMPARISONS.map(c => `
      <article class="hub-card">
        <div class="hub-card-top">
          <div class="hub-card-icon">${c.icon}</div>
          <span class="hub-badge hot">${c.badge}</span>
        </div>
        <h2>${isFr ? c.h1Fr : c.h1En}</h2>
        <p>${isFr ? c.descFr : c.descEn}</p>
        <div class="hub-card-actions">
          <a href="/compare/${c.slug}" class="hub-btn-launch">${isFr ? 'Lire le comparatif →' : 'Read Comparison →'}</a>
        </div>
      </article>`).join('');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isFr ? 'Comparatifs & Alternatives Gratuites — IA Code Studio' : 'Comparisons & Free Alternatives — IA Code Studio'}</title>
  <meta name="description" content="${isFr ? 'Comparez IA Code Studio avec CodePen, Spline 3D, Bolt, Lovable et les convertisseurs en ligne : code IA, 3D WebGL, SVG vers 3D et outils développeurs hors-ligne.' : 'Compare IA Code Studio against CodePen, Spline 3D, Bolt, Lovable, and online converters: AI web coding, Three.js 3D UI, SVG-to-3D, and offline developer tools.'}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canUrl}">
  <link rel="alternate" hreflang="en" href="${HOST}/compare/">
  <link rel="alternate" hreflang="fr" href="${HOST}/fr/compare/">
  <link rel="alternate" hreflang="x-default" href="${HOST}/compare/">
  <link rel="icon" type="image/png" href="/logo-ia-codestudio.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canUrl}">
  <meta property="og:title" content="${isFr ? 'Comparatifs & Alternatives — IA Code Studio' : 'Comparisons & Free Alternatives — IA Code Studio'}">
  <meta property="og:image" content="${OG_IMG}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "${isFr ? 'Comparatifs IA Code Studio' : 'IA Code Studio Comparisons & Alternatives'}",
    "url": "${canUrl}",
    "inLanguage": "${lang}",
    "isPartOf": { "@type": "WebSite", "name": "IA Code Studio", "url": "${HOST}/" }
  }
  </script>
  <link rel="stylesheet" href="/css/hub-pages.css?v=20261127">
</head>
<body>
  <div class="hub-bg-glow"></div>
  <header class="hub-navbar">
    <div class="hub-nav-inner">
      <a href="${isFr ? '/fr/index.html' : '/index.html'}" class="hub-brand">
        <img src="/logo-ia-codestudio.webp" alt="IA Code Studio">
        <span>IA CODE STUDIO</span>
      </a>
      <nav class="hub-nav-links">
        <a href="${isFr ? '/fr/index.html' : '/index.html'}" class="hub-nav-link">${isFr ? 'IDE Code IA' : 'AI Code IDE'}</a>
        <a href="${isFr ? '/fr/3d-studios/index.html' : '/3d-studios/index.html'}" class="hub-nav-link">${isFr ? 'Studios 3D' : '3D Studios'}</a>
        <a href="/free-tools/index.html" class="hub-nav-link">${isFr ? 'Outils Dev' : 'Dev Tools'}</a>
        <a href="${isFr ? '/fr/compare/index.html' : '/compare/index.html'}" class="hub-nav-link active">${isFr ? 'Comparatifs' : 'Comparisons'}</a>
        <a href="${isFr ? '/fr/arcade/index.html' : '/arcade/index.html'}" class="hub-nav-link">${isFr ? 'Vitrine Arcade' : 'Arcade Showcase'}</a>
      </nav>
      <div class="hub-nav-actions">
        <div class="hub-lang-toggle">
          <a href="/compare/index.html" class="hub-lang-btn ${!isFr ? 'active' : ''}" style="text-decoration:none;">EN</a>
          <a href="/fr/compare/index.html" class="hub-lang-btn ${isFr ? 'active' : ''}" style="text-decoration:none;">FR</a>
        </div>
        <a href="/ia-architecte-app/index.html?lang=${lang}" class="hub-cta-primary"><span>🚀</span> <span class="cta-label-long">${isFr ? "Ouvrir l'IDE" : 'Open IDE'}</span></a>
      </div>
    </div>
  </header>

  <main class="hub-main">
    <div class="hub-breadcrumb">
      <a href="${isFr ? '/fr/index.html' : '/index.html'}">${isFr ? 'Accueil' : 'Home'}</a>
      <span>/</span>
      <span>${isFr ? 'Comparatifs' : 'Comparisons'}</span>
    </div>

    <section class="hub-hero">
      <div class="hub-eyebrow">${isFr ? '⚖️ GUIDES COMPARATIFS 2026' : '⚖️ 2026 COMPARISON GUIDES'}</div>
      <h1>${isFr ? 'Comment IA Code Studio se Compare aux Autres Outils' : 'How IA Code Studio Compares to Other Tools'}</h1>
      <p>${isFr ? 'Comparatifs transparents entre IA Architecte Studio Pro, nos 6 studios 3D WebGL, nos outils dev hors-ligne et les plateformes populaires du marché.' : 'Transparent side-by-side guides comparing IA Architecte Studio Pro, our 6 3D WebGL studios, and offline dev tools against popular alternatives.'}</p>
    </section>

    <section class="hub-grid">${cards}
    </section>

    <section style="margin:36px 0 12px;padding:28px 30px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:20px;">
      <h2 style="font-size:1.3rem;font-weight:800;color:#fff;margin:0 0 10px;">${isFr ? 'Comment nous évaluons les IDE Web IA et Studios 3D' : 'How We Benchmark Browser AI IDEs &amp; 3D Studios'}</h2>
      <p style="color:#94a3b8;font-size:0.93rem;line-height:1.7;margin:0 0 16px;">${isFr ? 'Chaque comparatif est rédigé pour aider les développeurs, créateurs et fondateurs SaaS à choisir l’outil adapté à leur flux de travail réel : propriété du code exporté (HTML, CSS, JS, React, Vue, 3MF/GLB), confidentialité hors-ligne dans le navigateur, performances WebGL 60 FPS et transparence tarifaire.' : 'Every guide on this page is written to help developers, designers, and SaaS founders choose the right browser tool based on real production criteria: full code ownership (HTML, CSS, JS, React, Vue, 3MF/GLB), 100% client-side offline privacy, 60 FPS WebGL rendering speed, and transparent pricing with zero vendor lock-in.'}</p>
      <div class="cmp-faq">
        <details><summary>${isFr ? 'Puis-je tester IA Code Studio gratuitement avant de choisir ?' : 'Can I test IA Code Studio free before choosing?'}</summary><p>${isFr ? 'Oui. IA Architecte Studio Pro, la Sandbox Live, OmniConvert Pro et les 9 générateurs du 3D Marketing Lab s’ouvrent gratuitement sans carte bancaire.' : 'Yes. IA Architecte Studio Pro, Live Sandbox Playground, OmniConvert Pro, and all 9 tools in 3D Marketing Lab launch free in your browser with no credit card required.'}</p></details>
        <details><summary>${isFr ? 'Le code exporté fonctionne-t-il en dehors d’IA Code Studio ?' : 'Does exported code work independently outside IA Code Studio?'}</summary><p>${isFr ? 'Absolument. Vous exportez du HTML/CSS/JS standard, des composants React/Vue ou des modèles 3D ouverts déployables sur Netlify, Vercel, GitHub Pages ou WordPress.' : 'Yes. Every export produces clean standard HTML/CSS/JS, React/Vue components, or open 3D formats deployable on Netlify, Vercel, GitHub Pages, Shopify, or WordPress.'}</p></details>
      </div>
    </section>
  </main>

  <footer class="hub-footer">
    <div class="hub-footer-inner">
      <span>${isFr ? '© 2026 IA Code Studio. Tous droits réservés.' : '© 2026 IA Code Studio. All rights reserved.'}</span>
      <div class="hub-footer-links">
        <a href="${isFr ? '/fr/index.html' : '/index.html'}">${isFr ? 'Accueil' : 'Home'}</a>
        <a href="${isFr ? '/fr/3d-studios/index.html' : '/3d-studios/index.html'}">${isFr ? 'Studios 3D' : '3D Studios'}</a>
        <a href="/free-tools/index.html">${isFr ? 'Outils Dev' : 'Dev Tools'}</a>
        <a href="${isFr ? '/fr/marketing-widgets/index.html' : '/marketing-widgets/index.html'}">Marketing</a>
        <a href="/privacy-policy.html?lang=${lang}">${isFr ? 'Confidentialité' : 'Privacy Policy'}</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// 1. Build /compare/ hub + 6 pages + /fr/compare/
writePage('compare/index.html', buildCompareHub('en'));
writePage('fr/compare/index.html', buildCompareHub('fr'));
for (const c of COMPARISONS) {
  writePage(`compare/${c.slug}`, buildComparisonPage(c));
}

// 2. Build Native French Hub Pages (/fr/3d-studios/, /fr/marketing-widgets/, /fr/arcade/)
function buildNativeFrHub(srcRel, outRel, slug, frHead) {
  let html = fs.readFileSync(path.join(ROOT, srcRel), 'utf8');
  html = html.replace('<html lang="en">', '<html lang="fr">');
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${frHead.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${frHead.desc}">`);
  html = html.replace(`href="${HOST}/${slug}"`, `href="${HOST}/fr/${slug}"`);
  html = html.replace(`property="og:url" content="${HOST}/${slug}"`, `property="og:url" content="${HOST}/fr/${slug}"`);
  html = html.replace(/property="og:title" content="[^"]*"/, `property="og:title" content="${frHead.title}"`);
  html = html.replace(/property="og:description" content="[^"]*"/, `property="og:description" content="${frHead.desc}"`);
  // Update JSON-LD CollectionPage url, name, description & language to native French
  html = html.replace(`"url": "${HOST}/${slug}"`, `"url": "${HOST}/fr/${slug}",\n      "inLanguage": "fr"`);
  html = html.replace(/"name":\s*"[^"]*IA Code Studio"/, `"name": "${frHead.title.replace(/"/g, '\\"')}"`);
  // Extract inline T.fr dictionary and pre-render every static data-i18n element into native French!
  const vm = require('vm');
  const dictMatch = html.match(/const T = (\{[\s\S]*?\n\s{6}\});/);
  if (dictMatch) {
    try {
      const T = vm.runInNewContext(`(${dictMatch[1]})`);
      if (T && T.fr) {
        const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        html = html.replace(/(<([a-z0-9]+)[^>]*\sdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi, (full, open, tag, key, inner, close) => {
          if (T.fr[key] && !/<[a-z]/i.test(inner)) {
            return `${open}${escHtml(T.fr[key])}${close}`;
          }
          return full;
        });
      }
    } catch (e) {
      console.warn('Could not pre-render static FR i18n for', srcRel, e.message);
    }
  }
  // Fix relative paths ../ -> / so /fr/<hub>/ resolves every asset and studio cleanly!
  html = html.replace(/(href|src)="\.\.\//g, '$1="/');
  // Point internal hub nav links inside /fr/ to French equivalents where available
  html = html.replace(/href="\/index\.html"/g, 'href="/fr/index.html"');
  html = html.replace(/href="\/3d-studios\/index\.html"/g, 'href="/fr/3d-studios/index.html"');
  html = html.replace(/href="\/marketing-widgets\/index\.html"/g, 'href="/fr/marketing-widgets/index.html"');
  html = html.replace(/href="\/arcade\/index\.html"/g, 'href="/fr/arcade/index.html"');
  // Replace visible static H1 + eyebrow + force default 'fr' on init
  html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, `<h1 data-i18n="hero_title">${frHead.h1}</h1>`);
  html = html.replace(/<div class="hub-eyebrow"[^>]*>[\s\S]*?<\/div>/i, `<div class="hub-eyebrow" data-i18n="eyebrow">${frHead.eyebrow}</div>`);
  html = html.replace(
    /const initLang = [^;]+;/,
    `const initLang = (urlLang === 'en') ? 'en' : 'fr';`
  );
  // Make EN button navigate cleanly to the English canonical hub
  html = html.replace(
    '<button type="button" class="hub-lang-btn active" data-lang="en">EN</button>',
    `<a href="/${slug}" class="hub-lang-btn" style="text-decoration:none;">EN</a>`
  );
  html = html.replace(
    '<button type="button" class="hub-lang-btn" data-lang="fr">FR</button>',
    '<button type="button" class="hub-lang-btn active" data-lang="fr">FR</button>'
  );
  writePage(outRel, html);
}

buildNativeFrHub('3d-studios/index.html', 'fr/3d-studios/index.html', '3d-studios/', {
  title: 'Studios Visuels 3D & WebGL — IA Code Studio',
  desc: 'Explorez nos 6 studios WebGL 3D & Three.js dans le navigateur : 72 composants UI 3D, Chrome Liquide 4D, extrudeur SVG/DXF vers 3D, HUD Sci-Fi et intros vidéo 3D.',
  eyebrow: '✨ 6 Studios Spécialisés 3D WebGL & Three.js',
  h1: 'Studios Visuels 3D & WebGL'
});

buildNativeFrHub('marketing-widgets/index.html', 'fr/marketing-widgets/index.html', 'marketing-widgets/', {
  title: 'Suite Marketing Interactif & Widgets 3D — IA Code Studio',
  desc: 'Créez des showrooms produits 3D, cartes à gratter, roues de la fortune, cartes de visite numériques et bannières HTML5 intégrables en 1 clic.',
  eyebrow: '📣 Outils de Conversion HTML5 & 3D Intégrables',
  h1: 'Marketing & Widgets Interactifs'
});

buildNativeFrHub('arcade/index.html', 'fr/arcade/index.html', 'arcade/', {
  title: 'Vitrine & Arcade — 21 Jeux WebGL Créés avec IA Code Studio',
  desc: 'Jouez gratuitement à 21 jeux WebGL 3D, Réalité Augmentée et Rétro 80s conçus avec le moteur IA Code Studio : Cyber Arcade (9 jeux), Retro 80s (12 classiques) et Simulateur Spatial.',
  eyebrow: '🎮 Vitrine — Créé avec Notre Moteur WebGL & HTML5',
  h1: '21 Jeux Navigateur & Démos 3D Live'
});

// 3. Build Native Static French Homepage (/fr/index.html)
const frHomeHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IA Code Studio — IDE Web IA, Création d'Applications &amp; Studios 3D WebGL</title>
  <meta name="description" content="Créez des applications web HTML, CSS, JavaScript et des composants 3D WebGL interactifs à partir de prompts IA dans votre navigateur. Propulsé par IA Architecte Studio Pro — gratuit pour démarrer.">
  <meta name="keywords" content="IDE Web IA gratuit, générateur application web IA, IA Architecte Studio Pro, générateur Three.js gratuit, studio 3D WebGL navigateur, outils développeurs hors ligne, IA Code Studio">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${HOST}/fr/">
  <link rel="alternate" hreflang="en" href="${HOST}/">
  <link rel="alternate" hreflang="fr" href="${HOST}/fr/">
  <link rel="alternate" hreflang="x-default" href="${HOST}/">
  <link rel="icon" type="image/png" href="/logo-ia-codestudio.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${HOST}/fr/">
  <meta property="og:title" content="IA Code Studio — IDE Web IA &amp; Studios 3D WebGL Gratuits">
  <meta property="og:description" content="Décrivez votre application web ou composant 3D en français et générez du code HTML, CSS, JavaScript et Three.js propre en direct dans votre navigateur.">
  <meta property="og:image" content="${OG_IMG}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:locale:alternate" content="en_US">
  <meta property="og:site_name" content="IA Code Studio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="IA Code Studio — IDE Web IA &amp; Studios 3D WebGL">
  <meta name="twitter:description" content="Codez des applications web HTML/CSS/JS et des interfaces 3D avec l'IA directement dans votre navigateur.">
  <meta name="twitter:image" content="${OG_IMG}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": "${HOST}/fr/",
        "name": "IA Code Studio (Français)",
        "inLanguage": "fr",
        "description": "IDE Web IA dans le navigateur (IA Architecte Studio Pro & Ultra v2.0), 6 Studios 3D WebGL, 10+ Outils Développeurs hors-ligne et Suite Marketing."
      },
      {
        "@type": "SoftwareApplication",
        "name": "IA Architecte Studio Pro — IA Code Studio",
        "url": "${HOST}/ia-architecte-app/?lang=fr",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "inLanguage": "fr",
        "offers": [
          { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Accès Gratuit" },
          { "@type": "Offer", "price": "10.00", "priceCurrency": "USD", "name": "Créateur Pro" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "IA Architecte Studio Pro génère-t-il du code propre et exportable ?",
            "acceptedAnswer": { "@type": "Answer", "text": "Oui, le code généré est du HTML, CSS et JavaScript pur, exportable en fichier autonome ou archive ZIP sans dépendance lourde." }
          },
          {
            "@type": "Question",
            "name": "Les outils développeurs gratuits envoient-ils mes données sur un serveur ?",
            "acceptedAnswer": { "@type": "Answer", "text": "Jamais. OmniConvert Pro et tous les outils de Free Tools s'exécutent 100% localement dans votre navigateur." }
          }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="/style.css?v=20261127_v5">
  <link rel="stylesheet" href="/css/neural-forge.css?v=20261128">
  <script src="/js/app-service-core.js?v=20260922_v2"></script>
  <script src="/js/app-service-auth.js?v=20260922_v2"></script>
</head>
<body>
  <div class="aura-container" aria-hidden="true">
    <div class="aura-orb orb-1"></div>
    <div class="aura-orb orb-2"></div>
    <div class="aura-orb orb-3"></div>
  </div>

  <header class="navbar">
    <div class="navbar-inner">
      <a href="/fr/index.html" class="logo">
        <img src="/logo-ia-codestudio.webp" alt="Logo IA Code Studio" class="logo-img">
        <span>IA CODE STUDIO</span>
      </a>
      <nav class="nav-links" aria-label="Navigation principale">
        <a href="#ecosystem" class="nav-link active">IDE Code IA</a>
        <a href="/fr/3d-studios/index.html" class="nav-link">Studios 3D</a>
        <a href="/free-tools/index.html" class="nav-link">Outils Dev</a>
        <a href="/fr/marketing-widgets/index.html" class="nav-link">Marketing</a>
        <a href="/fr/compare/index.html" class="nav-link">Comparatifs</a>
        <a href="/fr/arcade/index.html" class="nav-link">Vitrine</a>
      </nav>
      <div class="nav-right">
        <div class="lang-toggle" role="group" aria-label="Langue">
          <a href="/index.html?lang=en" class="lang-btn" style="text-decoration:none;">EN</a>
          <span class="lang-btn active">FR</span>
        </div>
        <a href="/ia-architecte-app/index.html?lang=fr" class="nav-cta-btn"><span>🚀</span> <span>Ouvrir l'IDE</span></a>
        <button type="button" class="mobile-menu-btn" id="fr-mob-btn" aria-label="Menu">☰</button>
      </div>
    </div>
  </header>

  <div class="mobile-nav-drawer" id="fr-mob-drawer">
    <a href="/ia-architecte-app/index.html?lang=fr" class="mobile-drawer-primary">🚀 Lancer IA Architecte Studio Pro</a>
    <a href="/ia-architecte-studio-ultra/index.html?lang=fr" class="mobile-drawer-ultra">⚡ IA Architecte Studio Ultra v2.0</a>
    <a href="/fr/3d-studios/index.html">✨ Studios 3D &amp; WebGL (6)</a>
    <a href="/free-tools/index.html">🛠️ Outils Développeurs Gratuits &amp; OmniConvert</a>
    <a href="/fr/marketing-widgets/index.html">📣 Marketing &amp; Widgets Interactifs</a>
    <a href="/fr/compare/index.html">⚖️ Comparatifs &amp; Alternatives</a>
    <a href="/fr/arcade/index.html">🎮 Vitrine Arcade (21 Jeux)</a>
    <a href="/index.html?lang=en">🌐 Switch to English</a>
  </div>

  <main>
    <section class="hero">
      <a href="/ia-architecte-app/index.html?lang=fr" class="hero-eyebrow">
        <span class="eyebrow-dot"></span>
        <span>IA Architecte Studio Pro — IDE Web IA &amp; Moteur de Code 3D dans le Navigateur</span>
        <span>→</span>
      </a>
      <h1>Codez des Applications Web &amp; 3D avec l'IA</h1>
      <p class="hero-subtitle">Décrivez une application web, un tableau de bord SaaS ou un composant 3D interactif — générez du code HTML, CSS, JavaScript et Three.js propre en direct dans votre navigateur.</p>

      <form class="prompt-launcher" onsubmit="frLaunchPrompt(event)">
        <div class="prompt-mode-tabs">
          <button type="button" class="prompt-mode-btn active" onclick="frSelectMode('pro', this)">🏛️ Studio Pro IDE</button>
          <button type="button" class="prompt-mode-btn" onclick="frSelectMode('ultra', this)">⚡ Ultra IDE v2</button>
          <button type="button" class="prompt-mode-btn" onclick="frSelectMode('ui3d', this)">✨ Studio UI 3D</button>
          <button type="button" class="prompt-mode-btn" onclick="frSelectMode('chrome', this)">💎 Chrome Liquide 3D</button>
        </div>
        <div class="prompt-input-row">
          <input type="text" id="fr-prompt-input" class="prompt-input" placeholder="Décrivez votre application... ex : Tableau de bord SaaS sombre avec graphiques et tarifs" autocomplete="off">
          <button type="submit" class="prompt-submit-btn">⚡ Générer l'App</button>
        </div>
        <div class="prompt-chips">
          <span class="prompt-chips-label">Essayer :</span>
          <button type="button" class="prompt-chip" onclick="frQuickDemo('saas')">📊 Dashboard SaaS</button>
          <button type="button" class="prompt-chip" onclick="frQuickDemo('landing')">🌐 Landing Page</button>
          <button type="button" class="prompt-chip" onclick="frQuickDemo('pricing')">💳 Tableau de Prix</button>
          <button type="button" class="prompt-chip" onclick="frQuickDemo('contact')">✨ Contact Glass UI</button>
        </div>
      </form>

      <div class="hero-actions-row">
        <a href="/ia-architecte-app/index.html?lang=fr" class="hero-btn-primary">🚀 Lancer IA Architecte Studio Pro</a>
        <a href="/ia-architecte-studio-ultra/index.html?lang=fr" class="hero-btn-ultra">⚡ IA Architecte Studio Ultra v2.0</a>
        <a href="/free-tools/index.html" class="hero-btn-secondary">🛠️ Outils Développeurs Gratuits</a>
      </div>

      <div class="hero-trust-strip">
        <span>✓ 100% Navigateur</span><span class="trust-dot">•</span>
        <span>✓ Aperçu Live 60 FPS</span><span class="trust-dot">•</span>
        <span>✓ Export HTML / CSS / JS Propre</span><span class="trust-dot">•</span>
        <span>✓ Bilingue FR / EN</span>
      </div>
    </section>

    <section id="ecosystem" class="ecosystem-section">
      <div class="section-heading">
        <span class="section-eyebrow">ARCHITECTURE DE LA PLATEFORME</span>
        <h2>Un Studio de Codage IA. Trois Suites Spécialisées.</h2>
        <p>Codez immédiatement dans notre IDE Web IA principal, ou accédez à un espace dédié pour vos visuels 3D, utilitaires développeurs ou widgets marketing.</p>
      </div>

      <article class="flagship-card">
        <div class="flagship-copy">
          <div class="flagship-badges">
            <span class="pill-flagship">★ IDE WEB IA PRINCIPAL</span>
            <span class="pill-subtle">Gratuit pour Créer &amp; Prévisualiser</span>
          </div>
          <h3>IA Architecte Studio Pro</h3>
          <p>Notre IDE complet de développement web propulsé par l'IA. Transformez vos prompts en applications HTML, CSS et JavaScript fonctionnelles, éditez dans Monaco, concevez des API, auditez la sécurité et exportez un code propre.</p>
          <div class="flagship-features">
            <span class="feat-chip">⚡ Moteur Prompt-to-App</span>
            <span class="feat-chip">💻 Éditeur Monaco</span>
            <span class="feat-chip">👁️ Aperçu Scindé Live</span>
            <span class="feat-chip">📦 Export HTML / ZIP en 1 Clic</span>
          </div>
          <div class="flagship-actions">
            <a href="/ia-architecte-app/index.html?lang=fr" class="btn-flagship-primary">🚀 Ouvrir IA Architecte Studio Pro</a>
            <a href="/ia-architecte-studio-pro/index.html" class="btn-flagship-ghost">Découvrir les Fonctions</a>
          </div>
        </div>
        <div class="flagship-visual" aria-hidden="true">
          <div class="ide-window">
            <div class="ide-titlebar">
              <div class="ide-dots"><span style="background:#ef4444"></span><span style="background:#f59e0b"></span><span style="background:#10b981"></span></div>
              <span class="ide-filename">index.html — IA Architecte Studio Pro</span>
              <span class="ide-live-pill">● LIVE 60 FPS</span>
            </div>
            <div class="ide-split">
              <div class="ide-code-pane">
                <div class="code-line"><span class="c-muted">01</span> <span class="c-kw">&lt;section</span> <span class="c-attr">class</span>=<span class="c-str">"saas-hero"</span><span class="c-kw">&gt;</span></div>
                <div class="code-line"><span class="c-muted">02</span>   <span class="c-kw">&lt;h1&gt;</span>Analytique Pro<span class="c-kw">&lt;/h1&gt;</span></div>
                <div class="code-line"><span class="c-muted">03</span>   <span class="c-cm">// Cartes KPI générées par IA</span></div>
                <div class="code-line"><span class="c-muted">04</span>   <span class="c-fn">renderChart</span>(<span class="c-str">'revenus'</span>);</div>
                <div class="code-line"><span class="c-muted">05</span> <span class="c-kw">&lt;/section&gt;</span></div>
                <div class="ide-prompt-badge">✦ Prompt compilé en 2.4s · 0 erreur</div>
              </div>
              <div class="ide-preview-pane">
                <div class="mock-kpi"><span class="mock-label">Croissance MRR</span><strong class="mock-val">$42 800</strong><span class="mock-delta">+28.4%</span></div>
                <div class="mock-bars"><span style="height:40%"></span><span style="height:65%"></span><span style="height:52%"></span><span style="height:82%"></span><span style="height:95%"></span></div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="ultra-companion-card">
        <div class="ultra-companion-left">
          <div class="ultra-icon-box">⚡</div>
          <div class="ultra-companion-copy">
            <div class="ultra-companion-head">
              <h3>IA Architecte Studio Ultra v2.0</h3>
              <span class="pill-ultra">IDE COMPAGNON · 28+ APPS</span>
            </div>
            <p>Atelier IA multi-écrans nouvelle génération avec 28+ applications fonctionnelles, inspecteur CSS et base de données visuel, aperçus spatiaux 3D/AR et packager DevOps.</p>
          </div>
        </div>
        <a href="/ia-architecte-studio-ultra/index.html?lang=fr" class="btn-ultra-launch">⚡ Ouvrir Studio Ultra v2.0 →</a>
      </article>

      <div class="hubs-bento-grid">
        <article class="bento-hub-card">
          <div class="bento-card-head"><div class="bento-icon icon-cyan">💎</div><span class="bento-count">6 Studios Visuels</span></div>
          <h3>Studios 3D &amp; WebGL</h3>
          <p>72+ composants UI 3D (React/Vue/HTML), 18 shaders Chrome Liquide 4D, extrudeur SVG/DXF vers 3D, HUD Sci-Fi et intros vidéo 3D.</p>
          <ul class="bento-list">
            <li><a href="/3d-creative-studio/index.html">3D Creative Studio (72 Composants UI)</a></li>
            <li><a href="/3d-liquid-chrome-studio/index.html">3D Liquid Chrome &amp; Néon (18 Studios 4D)</a></li>
            <li><a href="/studio-3d-4d-pro/index.html">Studio 3D/4D Pro (SVG/DXF → 3D)</a></li>
          </ul>
          <a href="/fr/3d-studios/index.html" class="bento-cta">Explorer les 6 Studios 3D →</a>
        </article>

        <article class="bento-hub-card">
          <div class="bento-card-head"><div class="bento-icon icon-emerald">🛠️</div><span class="bento-count">100% Gratuit &amp; Hors-Ligne</span></div>
          <h3>Outils Dev &amp; Sandbox</h3>
          <p>Outils rapides côté client pour le développement web : OmniConvert Pro, Sandbox HTML/CSS/JS live, Tailwind→CSS, Optimiseur SVG et Dev Swiss Kit.</p>
          <ul class="bento-list">
            <li><a href="/free-tools/omni-convert/index.html">OmniConvert Pro 2.0 (JSON/YAML/QR)</a></li>
            <li><a href="/free-tools/playground/index.html">Sandbox Live HTML/CSS/JS v2.0</a></li>
            <li><a href="/free-tools/converters/tailwind-to-vanilla/index.html">Tailwind → CSS &amp; Optimiseur SVG</a></li>
          </ul>
          <a href="/free-tools/index.html" class="bento-cta">Ouvrir les Outils Gratuits →</a>
        </article>

        <article class="bento-hub-card">
          <div class="bento-card-head"><div class="bento-icon icon-amber">📣</div><span class="bento-count">30+ Générateurs</span></div>
          <h3>Marketing &amp; Widgets 3D</h3>
          <p>Créez des showrooms produits 3D, cartes à gratter, roues de la fortune, vCards numériques et bannières HTML5 intégrables sur Shopify et WordPress.</p>
          <ul class="bento-list">
            <li><a href="/ad-genius-ai/index.html">Ad-Genius AI Pro (23 Studios Pub)</a></li>
            <li><a href="/3d-marketing-lab/index.html">3D Marketing Lab (9 Outils Viraux)</a></li>
            <li><a href="/widget-studio/index.html">AI Ad &amp; Widget Studio</a></li>
          </ul>
          <a href="/fr/marketing-widgets/index.html" class="bento-cta">Explorer la Suite Marketing →</a>
        </article>
      </div>
    </section>

    <section class="engine-showcase-section">
      <div class="engine-showcase-card">
        <div class="engine-showcase-copy">
          <span class="engine-showcase-badge">🎮 CRÉÉ AVEC NOTRE MOTEUR WEBGL &amp; HTML5</span>
          <h2>Découvrez ce que le code navigateur créé ici peut faire</h2>
          <p>Explorez notre Vitrine Arcade dédiée : 21 jeux WebGL 3D, RA et Rétro 80s jouables plus des démos shaders 60 FPS — sans téléchargement.</p>
          <div class="engine-showcase-links">
            <a href="/fr/arcade/index.html" class="engine-btn-primary">Explorer la Vitrine Arcade (21 Jeux) →</a>
            <a href="/index.html?lang=fr#app-hub-showcase" class="engine-demo-pill">📦 10 Apps de Départ (1 ZIP/Jour)</a>
            <a href="/fr/compare/index.html" class="engine-demo-pill">⚖️ Comparatifs vs CodePen / Spline</a>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" class="pricing-section">
      <div class="section-heading">
        <span class="section-eyebrow">TARIFS SIMPLES</span>
        <h2>Codez Gratuitement. Passez Pro Quand Vous Publiez.</h2>
        <p>Créez et prévisualisez sans limite. Débloquez les exports illimités sur tous les studios avec un seul abonnement transparent.</p>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card">
          <div class="pricing-tier">Gratuit</div>
          <div class="pricing-price">$0 <span>/mois</span></div>
          <p class="pricing-desc">Idéal pour prototyper des apps web, tester les prompts IA et utiliser les outils dev hors-ligne.</p>
          <ul class="pricing-list">
            <li>✓ Aperçu en direct complet d'IA Architecte Studio Pro</li>
            <li>✓ Tous les 10+ Outils Dev Gratuits &amp; OmniConvert</li>
            <li>✓ 1 export ZIP d'application de départ par jour</li>
            <li>✓ Accès gratuit aux Démos 3D &amp; Vitrine Arcade</li>
            <li class="muted-item">✕ Exports illimités Studio Pro &amp; Studios 3D</li>
          </ul>
          <a href="/ia-architecte-app/index.html?lang=fr" class="pricing-btn-secondary">Commencer Gratuitement →</a>
        </div>
        <div class="pricing-card pricing-card-pro">
          <div class="pricing-popular-badge">★ ACCÈS COMPLET PRO</div>
          <div class="pricing-tier">Créateur Pro</div>
          <div class="pricing-price">$10 <span>/mois</span></div>
          <p class="pricing-desc">Exports de production illimités dans l'IDE, les studios 3D et les suites marketing.</p>
          <ul class="pricing-list">
            <li>✓ Tout ce qui est inclus dans Gratuit</li>
            <li>✓ Exports HTML, CSS, JS &amp; ZIP illimités</li>
            <li>✓ Exports React, Vue, 3MF &amp; GLB dans les Studios 3D</li>
            <li>✓ Accès aux 23 studios commerciaux Ad-Genius AI Pro</li>
            <li>✓ Annulable à tout moment · Paiement sécurisé Stripe</li>
          </ul>
          <a href="https://buy.stripe.com/bJecN61Fk3staax7mGbfO03" target="_blank" rel="noopener" class="pricing-btn-secondary" style="background:linear-gradient(135deg,#f59e0b,#ec4899); border:none;">💎 Passer à Pro ($10/mois)</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="main-footer">
    <div class="footer-container">
      <div class="footer-brand-col">
        <div class="footer-logo">
          <img src="/logo-ia-codestudio.webp" alt="Logo IA Code Studio" class="footer-logo-img">
          <span class="footer-logo-text">IA CODE STUDIO</span>
        </div>
        <p class="footer-tagline">IDE Web IA dans le navigateur pour coder des applications web, des composants 3D WebGL interactifs et des outils développeurs hors-ligne.</p>
      </div>
      <div class="footer-col">
        <h4 class="footer-col-title">Codage IA &amp; 3D</h4>
        <ul class="footer-links">
          <li><a href="/ia-architecte-app/index.html?lang=fr">IA Architecte Studio Pro</a></li>
          <li><a href="/ia-architecte-studio-ultra/index.html?lang=fr">IA Architecte Studio Ultra v2.0</a></li>
          <li><a href="/fr/3d-studios/index.html">Tous les Studios 3D &amp; WebGL (6)</a></li>
          <li><a href="/3d-creative-studio/index.html">3D Creative Studio (72 UI)</a></li>
          <li><a href="/3d-liquid-chrome-studio/index.html">3D Liquid Chrome &amp; Néon</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-col-title">Outils &amp; Marketing</h4>
        <ul class="footer-links">
          <li><a href="/free-tools/index.html">Hub Outils Développeurs Gratuits</a></li>
          <li><a href="/free-tools/omni-convert/index.html">OmniConvert Pro 2.0</a></li>
          <li><a href="/fr/marketing-widgets/index.html">Suite Marketing &amp; Widgets</a></li>
          <li><a href="/ad-genius-ai/index.html">Ad-Genius AI Pro (23 Studios)</a></li>
          <li><a href="/3d-marketing-lab/index.html">3D Marketing Lab</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-col-title">Vitrine &amp; Ressources</h4>
        <ul class="footer-links">
          <li><a href="/fr/arcade/index.html">Vitrine Arcade (21 Jeux)</a></li>
          <li><a href="/fr/compare/index.html">Comparatifs &amp; Alternatives</a></li>
          <li><a href="/index.html?lang=en">English Version (EN)</a></li>
          <li><a href="/privacy-policy.html?lang=fr">Politique de Confidentialité</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 IA CODE STUDIO. Tous droits réservés.</p>
      <div class="footer-sub-links">
        <a href="/index.html?lang=en">English</a>
        <span class="footer-sep">•</span>
        <a href="/privacy-policy.html?lang=fr">Confidentialité</a>
      </div>
    </div>
  </footer>

  <script src="/js/neural-demos.js?v=20261128"></script>
  <script src="/js/neural-forge.js?v=20261128"></script>
  <script>
    localStorage.setItem('hub_lang', 'fr');
    window.currentLang = 'fr';
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBXJ0LstZF7c3-GI2eDtv6V7vsx0scgXHk",
        authDomain: "ia-codestudio.firebaseapp.com",
        projectId: "ia-codestudio",
        storageBucket: "ia-codestudio.firebasestorage.app",
        messagingSenderId: "977495027432",
        appId: "1:977495027432:web:fb93e8ae7712c70df2635d"
      });
    }
    window.handleGoogleSignIn = async function() {
      if (typeof firebase === 'undefined' || !firebase.auth) return;
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      if (window.IANeuralForge) window.IANeuralForge.refreshProStatus();
    };
    var frMode = 'pro';
    function frSelectMode(m, btn) {
      frMode = m;
      document.querySelectorAll('.prompt-mode-btn').forEach(function(b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      if (window.IANeuralForge) window.IANeuralForge.setMode(m);
    }
    function frLaunchPrompt(e) {
      if (e) e.preventDefault();
      var txt = (document.getElementById('fr-prompt-input').value || '').trim();
      if (window.IANeuralForge) {
        window.IANeuralForge.handlePromptSubmit(txt, frMode);
        return;
      }
      var map = {
        pro: '/ia-architecte-app/index.html',
        ultra: '/ia-architecte-studio-ultra/index.html',
        ui3d: '/3d-creative-studio/index.html',
        chrome: '/3d-liquid-chrome-studio/index.html'
      };
      var p = new URLSearchParams();
      p.set('lang', 'fr');
      if (txt) p.set('prompt', txt);
      window.location.href = (map[frMode] || map.pro) + '?' + p.toString();
    }
    function frQuickDemo(demoId) {
      if (window.IANeuralForge) {
        window.IANeuralForge.handleQuickChip(demoId);
      }
    }
    var mb = document.getElementById('fr-mob-btn'), dr = document.getElementById('fr-mob-drawer');
    if (mb && dr) mb.addEventListener('click', function() { dr.classList.toggle('open'); });
  </script>
</body>
</html>`;

writePage('fr/index.html', frHomeHtml);
console.log('\nALL COMPARE & NATIVE /FR/ PAGES GENERATED SUCCESSFULLY!');
