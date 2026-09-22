
(function () {
  'use strict';

  const TAB_ID = 'geoadaptive';

  /* ─────────────────────────────────────────────
     I18N STRINGS
  ───────────────────────────────────────────── */
  const i18n = {
    en: {
      title: '🌍 GEO-ADAPTIVE COMPONENT STUDIO',
      subtitle: 'Generate culturally-adapted UI variants for global markets',
      selectComponent: 'Select Component',
      selectRegions: 'Select Regions to Compare',
      generateBtn: 'Generate Variants',
      exportBtn: '📦 Export All Variants',
      loadEditorBtn: '📝 Load to Editor',
      copyHtmlBtn: '📋 Copy HTML',
      clearBtn: '✕ Clear',
      comparisonTitle: 'Cultural Variant Comparison',
      noVariants: 'Select a component and at least one region, then click Generate Variants.',
      toastInit: '🌍 Geo-Adaptive Studio initialized.',
      toastExport: '✅ Exported! Open the downloaded file.',
      toastCopy: '📋 HTML copied to clipboard!',
      toastLoad: '✅ Variant loaded into editor.',
      toastGenerate: '✅ Variants generated!',
      components: {
        button: 'Button / CTA',
        hero: 'Hero Section',
        nav: 'Navigation Bar',
        card: 'Product Card',
        pricing: 'Pricing Table',
        cta: 'CTA Banner',
      },
      regions: {
        us: '🇺🇸 North America (US)',
        eu: '🇪🇺 Europe (GDPR)',
        jp: '🇯🇵 Japan / East Asia',
        uk: '🇬🇧 United Kingdom',
        br: '🇧🇷 Brazil / Latin America',
        ae: '🇦🇪 Middle East (RTL)',
        in: '🇮🇳 India',
      },
      loadStandalone: '🚀 Load Full Standalone App',
    },
    fr: {
      title: '🌍 STUDIO DE COMPOSANTS GÉO-ADAPTATIFS',
      subtitle: 'Générez des variantes UI culturellement adaptées pour les marchés mondiaux',
      selectComponent: 'Sélectionner le composant',
      selectRegions: 'Sélectionner les régions à comparer',
      generateBtn: 'Générer les variantes',
      exportBtn: '📦 Exporter toutes les variantes',
      loadEditorBtn: '📝 Charger dans l\'éditeur',
      copyHtmlBtn: '📋 Copier le HTML',
      clearBtn: '✕ Effacer',
      comparisonTitle: 'Comparaison des variantes culturelles',
      noVariants: 'Sélectionnez un composant et au moins une région, puis cliquez sur Générer les variantes.',
      toastInit: '🌍 Studio Géo-Adaptatif initialisé.',
      toastExport: '✅ Exporté ! Ouvrez le fichier téléchargé.',
      toastCopy: '📋 HTML copié dans le presse-papiers !',
      toastLoad: '✅ Variante chargée dans l\'éditeur.',
      toastGenerate: '✅ Variantes générées !',
      components: {
        button: 'Bouton / CTA',
        hero: 'Section Hero',
        nav: 'Barre de navigation',
        card: 'Carte produit',
        pricing: 'Tableau de tarifs',
        cta: 'Bannière CTA',
      },
      regions: {
        us: '🇺🇸 Amérique du Nord (US)',
        eu: '🇪🇺 Europe (RGPD)',
        jp: '🇯🇵 Japon / Asie de l\'Est',
        uk: '🇬🇧 Royaume-Uni',
        br: '🇧🇷 Brésil / Amérique latine',
        ae: '🇦🇪 Moyen-Orient (RTL)',
        in: '🇮🇳 Inde',
      },
      loadStandalone: '🚀 Charger l\'application autonome',
    },
  };

  /* ─────────────────────────────────────────────
     CULTURAL ADAPTATION DATABASE
  ───────────────────────────────────────────── */
  const CULTURES = {
    us: {
      label: '🇺🇸 North America',
      dir: 'ltr',
      palette: {
        bg: '#0f172a',
        surface: '#1e293b',
        accent: '#ef4444',
        accent2: '#f97316',
        text: '#f8fafc',
        muted: '#94a3b8',
        border: '#334155',
        btn: 'linear-gradient(135deg,#ef4444,#f97316)',
        btnText: '#ffffff',
        badge: '#fbbf24',
      },
      font: 'system-ui, -apple-system, sans-serif',
      tone: 'urgency',
      currency: '$',
      price: '9.99',
      priceAlt: '4.99',
    },
    eu: {
      label: '🇪🇺 Europe (GDPR)',
      dir: 'ltr',
      palette: {
        bg: '#0e1621',
        surface: '#1a2332',
        accent: '#3b82f6',
        accent2: '#6366f1',
        text: '#e2e8f0',
        muted: '#8fa3be',
        border: '#2a3a50',
        btn: 'linear-gradient(135deg,#3b82f6,#6366f1)',
        btnText: '#ffffff',
        badge: '#10b981',
      },
      font: 'system-ui, -apple-system, sans-serif',
      tone: 'professional',
      currency: '€',
      price: '9.99',
      priceAlt: '4.99',
    },
    jp: {
      label: '🇯🇵 Japan / East Asia',
      dir: 'ltr',
      palette: {
        bg: '#f5f5f5',
        surface: '#ffffff',
        accent: '#c0392b',
        accent2: '#e74c3c',
        text: '#1a1a1a',
        muted: '#6b7280',
        border: '#e5e7eb',
        btn: 'linear-gradient(135deg,#c0392b,#e74c3c)',
        btnText: '#ffffff',
        badge: '#059669',
      },
      font: '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
      tone: 'polite',
      currency: '¥',
      price: '1,500',
      priceAlt: '980',
    },
    uk: {
      label: '🇬🇧 United Kingdom',
      dir: 'ltr',
      palette: {
        bg: '#0d1b2a',
        surface: '#1b2d42',
        accent: '#1d4ed8',
        accent2: '#7c3aed',
        text: '#e2e8f0',
        muted: '#94a3b8',
        border: '#2d3f55',
        btn: 'linear-gradient(135deg,#1d4ed8,#1e40af)',
        btnText: '#ffffff',
        badge: '#d97706',
      },
      font: '"Georgia", "Times New Roman", serif',
      tone: 'understated',
      currency: '£',
      price: '7.99',
      priceAlt: '3.99',
    },
    br: {
      label: '🇧🇷 Brazil / LATAM',
      dir: 'ltr',
      palette: {
        bg: '#1a0a00',
        surface: '#2d1500',
        accent: '#f59e0b',
        accent2: '#10b981',
        text: '#fef3c7',
        muted: '#d97706',
        border: '#78350f',
        btn: 'linear-gradient(135deg,#f59e0b,#10b981)',
        btnText: '#1a0a00',
        badge: '#ef4444',
      },
      font: '"Segoe UI", Arial, sans-serif',
      tone: 'vibrant',
      currency: 'R$',
      price: '49,90',
      priceAlt: '24,90',
    },
    ae: {
      label: '🇦🇪 Middle East (RTL)',
      dir: 'rtl',
      palette: {
        bg: '#0a0e1a',
        surface: '#111827',
        accent: '#16a34a',
        accent2: '#d97706',
        text: '#f9fafb',
        muted: '#9ca3af',
        border: '#1f2937',
        btn: 'linear-gradient(135deg,#16a34a,#d97706)',
        btnText: '#ffffff',
        badge: '#d97706',
      },
      font: '"Segoe UI", "Arial Unicode MS", sans-serif',
      tone: 'formal',
      currency: 'د.إ',
      price: '36.75',
      priceAlt: '18.40',
    },
    in: {
      label: '🇮🇳 India',
      dir: 'ltr',
      palette: {
        bg: '#1a0033',
        surface: '#2d004d',
        accent: '#f97316',
        accent2: '#a855f7',
        text: '#fef9c3',
        muted: '#c084fc',
        border: '#6b21a8',
        btn: 'linear-gradient(135deg,#f97316,#a855f7)',
        btnText: '#ffffff',
        badge: '#22c55e',
      },
      font: '"Noto Sans", "Segoe UI", sans-serif',
      tone: 'value',
      currency: '₹',
      price: '799',
      priceAlt: '399',
    },
  };

  /* ─────────────────────────────────────────────
     COMPONENT TEMPLATE GENERATORS
     Each returns an HTML string for a given culture.
  ───────────────────────────────────────────── */

  function genButton(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const copies = {
      us: { main: 'Get Started FREE — Limited Time!', sub: '⚡ Offer ends soon · No credit card needed', badge: '🔥 BEST DEAL' },
      eu: { main: 'Get Started', sub: 'No lock-in. Cancel anytime. GDPR compliant.', badge: 'Trusted' },
      jp: { main: 'ご利用を開始ください', sub: '無料でお試しいただけます。いつでもご解約可能です。', badge: '安心' },
      uk: { main: 'Get Started', sub: 'No fuss, no nonsense. Cancel whenever you like.', badge: 'Jolly Good' },
      br: { main: 'Comece Agora — É GRÁTIS! 🎉', sub: 'Junte-se a mais de 50.000 pessoas! Sem cartão de crédito.', badge: '🎊 INCRÍVEL' },
      ae: { main: 'ابدأ الآن مجاناً', sub: 'انضم إلى آلاف المستخدمين الموثوقين. بدون بطاقة ائتمان.', badge: '✨ موثوق' },
      in: { main: 'Start FREE — Best Price Guaranteed! 🏆', sub: '✅ Trusted by 1 Lakh+ users · UPI / Cards / EMI available', badge: '💎 BEST VALUE' },
    };
    const copy = copies[cultureKey];
    return `<div dir="${c.dir}" style="background:${p.bg};padding:32px;border-radius:12px;font-family:${c.font};text-align:${c.dir === 'rtl' ? 'right' : 'center'};">
  <span style="display:inline-block;background:${p.badge};color:${p.bg};padding:4px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:1px;margin-bottom:16px;">${copy.badge}</span>
  <div style="margin-bottom:20px;">
    <button style="background:${p.btn};color:${p.btnText};border:none;padding:16px 36px;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,0.4);font-family:${c.font};">${copy.main}</button>
  </div>
  <p style="color:${p.muted};font-size:13px;margin:0;">${copy.sub}</p>
</div>`;
  }

  function genHero(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const copies = {
      us: {
        headline: 'Build Faster. Ship More. Dominate Your Market.',
        sub: 'The #1 platform trusted by 200,000+ developers. Start free today — no credit card required.',
        btn: '🚀 Start for FREE',
        btn2: 'Watch Demo',
        trust: '⭐⭐⭐⭐⭐ 4.9/5 from 12,000 reviews',
      },
      eu: {
        headline: 'Professional Software for Modern Teams',
        sub: 'Build reliable products with a platform that respects your privacy. Fully GDPR compliant. Data stored in Europe.',
        btn: 'Get Started',
        btn2: 'Learn More',
        trust: '🔒 GDPR Compliant · ISO 27001 · EU Servers',
      },
      jp: {
        headline: '信頼と品質のソフトウェアプラットフォーム',
        sub: '丁寧なサポートと高品質なサービスで、あなたのビジネスをサポートします。まずは無料でお試しください。',
        btn: '無料でお試しはこちら',
        btn2: '詳細はこちら',
        trust: '安心・安全 · お客様満足度 98%',
      },
      uk: {
        headline: 'Software That Simply Works.',
        sub: 'Rather good software for people who prefer things that actually function properly. No hyperbole necessary.',
        btn: 'Get Started',
        btn2: 'See How It Works',
        trust: '★★★★★ Rated "Quite Excellent" by 8,000 customers',
      },
      br: {
        headline: '🎉 Transforme seu Negócio com Nossa Plataforma!',
        sub: 'Mais de 80.000 empreendedores brasileiros já escolheram. Comunidade ativa, suporte em português!',
        btn: '🚀 Comece Grátis Agora!',
        btn2: 'Ver Demonstração',
        trust: '❤️ Comunidade de 80 mil membros ativos!',
      },
      ae: {
        headline: 'منصة برمجية موثوقة للمحترفين',
        sub: 'خدمة احترافية تليق بتطلعاتكم. نوفر دعماً متميزاً وأمناً لا مثيل له. جرّبوا مجاناً.',
        btn: 'ابدأ مجاناً',
        btn2: 'اعرف أكثر',
        trust: '✅ موثوق من قِبل أكثر من 50,000 مستخدم في المنطقة',
      },
      in: {
        headline: '🏆 India\'s Most Trusted Platform — Best Price Guaranteed!',
        sub: 'Join 1 Lakh+ Indian businesses. Pay via UPI, Cards, Net Banking or EMI. 24/7 Hindi & English support.',
        btn: '🎯 Start FREE Today',
        btn2: 'View Plans',
        trust: '✅ ISO Certified · Made for Bharat · GST Invoice Available',
      },
    };
    const copy = copies[cultureKey];
    return `<div dir="${c.dir}" style="background:${p.bg};padding:48px 32px;border-radius:12px;font-family:${c.font};text-align:${c.dir === 'rtl' ? 'right' : 'center'};">
  <h1 style="color:${p.text};font-size:clamp(22px,3vw,34px);font-weight:800;line-height:1.25;margin:0 0 16px;">${copy.headline}</h1>
  <p style="color:${p.muted};font-size:15px;line-height:1.7;max-width:520px;margin:0 auto 28px;">${copy.sub}</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
    <button style="background:${p.btn};color:${p.btnText};border:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;font-family:${c.font};">${copy.btn}</button>
    <button style="background:transparent;color:${p.accent};border:2px solid ${p.accent};padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;font-family:${c.font};">${copy.btn2}</button>
  </div>
  <p style="color:${p.muted};font-size:12px;margin:0;">${copy.trust}</p>
</div>`;
  }

  function genNav(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const copies = {
      us: { brand: '⚡ AppForce', links: ['Features', 'Pricing', 'Enterprise', 'Blog'], cta: 'Start Free ›', login: 'Sign In' },
      eu: { brand: '◆ AppSuite', links: ['Features', 'Pricing', 'Privacy', 'Blog'], cta: 'Get Started', login: 'Login' },
      jp: { brand: '◎ アプリスイート', links: ['機能', '料金', 'サポート', 'ブログ'], cta: '無料で始める', login: 'ログイン' },
      uk: { brand: '▲ AppBrit', links: ['Features', 'Pricing', 'FAQs', 'Blog'], cta: 'Get Started', login: 'Sign In' },
      br: { brand: '🎯 AppBrasil', links: ['Recursos', 'Preços', 'Comunidade', 'Blog'], cta: 'Comece Grátis 🚀', login: 'Entrar' },
      ae: { brand: 'تطبيق برو ◆', links: ['الميزات', 'الأسعار', 'الدعم', 'المدونة'], cta: 'ابدأ مجاناً', login: 'تسجيل دخول' },
      in: { brand: '🇮🇳 AppBharat', links: ['Features', 'Pricing', 'Support', 'Blog'], cta: 'Try FREE 🎯', login: 'Login' },
    };
    const copy = copies[cultureKey];
    const linksHtml = copy.links.map(l => `<a href="#" style="color:${p.muted};text-decoration:none;font-size:14px;white-space:nowrap;">${l}</a>`).join('');
    return `<div dir="${c.dir}" style="background:${p.surface};padding:0 24px;border-radius:12px;border:1px solid ${p.border};font-family:${c.font};">
  <nav style="display:flex;align-items:center;justify-content:space-between;height:60px;gap:16px;flex-wrap:wrap;">
    <span style="color:${p.accent};font-size:18px;font-weight:800;white-space:nowrap;">${copy.brand}</span>
    <div style="display:flex;gap:20px;flex:1;justify-content:center;flex-wrap:wrap;">${linksHtml}</div>
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="#" style="color:${p.muted};text-decoration:none;font-size:14px;white-space:nowrap;">${copy.login}</a>
      <button style="background:${p.btn};color:${p.btnText};border:none;padding:8px 18px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:${c.font};white-space:nowrap;">${copy.cta}</button>
    </div>
  </nav>
</div>`;
  }

  function genCard(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const copies = {
      us: {
        badge: '🔥 LIMITED OFFER',
        name: 'Pro Wireless Headphones',
        desc: 'Crystal-clear sound. 40-hour battery. Crush the competition.',
        price: `$${CULTURES.us.price}`,
        oldPrice: '$149.99',
        btn: 'Add to Cart — Buy NOW',
        social: '⭐ 4.8 · 3,200 reviews · Ships TODAY',
      },
      eu: {
        badge: 'Quality Certified',
        name: 'Pro Wireless Headphones',
        desc: 'Superior audio quality with responsible manufacturing. 2-year EU warranty included.',
        price: `€${CULTURES.eu.price}`,
        oldPrice: '€139.99',
        btn: 'Add to Basket',
        social: '★ 4.7/5 · Verified by TÜV · 2yr Warranty',
      },
      jp: {
        badge: '人気商品',
        name: 'プロ ワイヤレスイヤホン',
        desc: '繊細な音質と洗練されたデザイン。長時間使用可能な40時間バッテリー。',
        price: `¥${CULTURES.jp.price}`,
        oldPrice: '¥18,000',
        btn: 'カートに追加する',
        social: '★ 4.9 · 8,500件のレビュー · 送料無料',
      },
      uk: {
        badge: 'Editor\'s Pick',
        name: 'Pro Wireless Headphones',
        desc: 'Rather splendid audio. Long battery life. No unnecessary fuss.',
        price: `£${CULTURES.uk.price}`,
        oldPrice: '£119.99',
        btn: 'Add to Basket',
        social: '★ 4.7 · 2,100 reviews · Free delivery over £25',
      },
      br: {
        badge: '🎊 SUPER OFERTA',
        name: 'Fone de Ouvido Pro Wireless',
        desc: 'Som incrível, bateria de 40 horas. A escolha da comunidade brasileira!',
        price: `R$${CULTURES.br.price}`,
        oldPrice: 'R$699,90',
        btn: '🛒 Comprar Agora!',
        social: '❤️ 4.8 · 5.200 avaliações · Frete grátis para SP/RJ',
      },
      ae: {
        badge: '✨ عرض مميز',
        name: 'سماعات لاسلكية احترافية',
        desc: 'جودة صوت استثنائية وبطارية تدوم 40 ساعة. الخيار الأول للمحترفين.',
        price: `${CULTURES.ae.currency} ${CULTURES.ae.price}`,
        oldPrice: `${CULTURES.ae.currency} 550`,
        btn: 'أضف إلى السلة',
        social: '★ 4.9 · 2,800 تقييم · شحن مجاني',
      },
      in: {
        badge: '💎 BEST VALUE',
        name: 'Pro Wireless Headphones',
        desc: 'Superb sound. 40-hr battery. Best price in India. GST invoice included.',
        price: `₹${CULTURES.in.price}`,
        oldPrice: '₹3,999',
        btn: '🛒 Add to Cart — Best Price!',
        social: '⭐ 4.8 · 12,000 reviews · Free delivery · UPI/EMI available',
      },
    };
    const copy = copies[cultureKey];
    return `<div dir="${c.dir}" style="background:${p.surface};border-radius:12px;border:1px solid ${p.border};overflow:hidden;font-family:${c.font};max-width:300px;margin:auto;">
  <div style="background:${p.accent};height:160px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:64px;">🎧</span>
  </div>
  <div style="padding:20px;">
    <span style="background:${p.badge};color:${p.bg};padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:1px;">${copy.badge}</span>
    <h3 style="color:${p.text};margin:10px 0 6px;font-size:16px;">${copy.name}</h3>
    <p style="color:${p.muted};font-size:13px;margin:0 0 14px;line-height:1.5;">${copy.desc}</p>
    <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:14px;">
      <span style="color:${p.accent};font-size:22px;font-weight:800;">${copy.price}</span>
      <span style="color:${p.muted};font-size:14px;text-decoration:line-through;">${copy.oldPrice}</span>
    </div>
    <button style="width:100%;background:${p.btn};color:${p.btnText};border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:${c.font};margin-bottom:10px;">${copy.btn}</button>
    <p style="color:${p.muted};font-size:11px;margin:0;text-align:center;">${copy.social}</p>
  </div>
</div>`;
  }

  function genPricing(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const currency = c.currency;
    const price = c.price;
    const priceAlt = c.priceAlt;
    const copies = {
      us: {
        title: 'Choose Your Plan — Lock in Savings NOW!',
        plans: [
          { name: 'Starter', price: 'FREE', period: '/mo', features: ['5 Projects', '1 GB Storage', 'Email Support'], btn: 'Start Free', highlight: false },
          { name: '🔥 PRO', price: `${currency}${price}`, period: '/mo', features: ['Unlimited Projects', '100 GB Storage', '24/7 Priority Support', 'Advanced Analytics'], btn: '🚀 GET PRO NOW', highlight: true },
          { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'SLA Guarantee', 'Dedicated Manager', 'Custom Integrations'], btn: 'Contact Sales', highlight: false },
        ],
        badge: '🔥 MOST POPULAR',
        note: '⚡ 30-day money-back guarantee. No questions asked.',
      },
      eu: {
        title: 'Transparent Pricing — No Surprises',
        plans: [
          { name: 'Free', price: 'Free', period: '/mo', features: ['5 Projects', '1 GB Storage', 'Email Support'], btn: 'Get Started', highlight: false },
          { name: 'Professional', price: `${currency}${price}`, period: '/mo', features: ['Unlimited Projects', '100 GB (EU Servers)', '24/7 Support', 'Privacy Dashboard'], btn: 'Choose Plan', highlight: true },
          { name: 'Enterprise', price: 'On Request', period: '', features: ['All Professional features', 'SLA', 'DPA Agreement', 'GDPR Officer Support'], btn: 'Request Quote', highlight: false },
        ],
        badge: 'Recommended',
        note: '🔒 All data stored on EU servers. GDPR compliant. Cancel anytime.',
      },
      jp: {
        title: '料金プランのご案内',
        plans: [
          { name: '無料プラン', price: '無料', period: '/月', features: ['5プロジェクト', '1 GBストレージ', 'メールサポート'], btn: '無料で始める', highlight: false },
          { name: '◎ プロプラン', price: `${currency}${price}`, period: '/月', features: ['無制限プロジェクト', '100 GBストレージ', '24時間サポート', '詳細分析'], btn: 'プロプランを選ぶ', highlight: true },
          { name: 'エンタープライズ', price: 'お見積り', period: '', features: ['プロプランの全機能', 'SLA保証', '専任担当者', 'カスタム連携'], btn: 'お問い合わせ', highlight: false },
        ],
        badge: '人気 No.1',
        note: '安心の30日間返金保証。いつでも解約可能です。',
      },
      uk: {
        title: 'Straightforward Pricing',
        plans: [
          { name: 'Free', price: 'Free', period: '/mo', features: ['5 Projects', '1 GB Storage', 'Email Support'], btn: 'Get Started', highlight: false },
          { name: 'Professional', price: `${currency}${price}`, period: '/mo', features: ['Unlimited Projects', '100 GB Storage', 'Telephone Support', 'Analytics'], btn: 'Choose Plan', highlight: true },
          { name: 'Enterprise', price: 'POA', period: '', features: ['All Professional features', 'SLA', 'Account Manager', 'Bespoke Integrations'], btn: 'Ring Us', highlight: false },
        ],
        badge: 'Most Popular',
        note: '30-day money-back guarantee. No quibbles whatsoever.',
      },
      br: {
        title: '🎉 Escolha o Plano Perfeito para Você!',
        plans: [
          { name: 'Grátis', price: 'Grátis', period: '/mês', features: ['5 Projetos', '1 GB Espaço', 'Suporte por E-mail'], btn: 'Começar Grátis', highlight: false },
          { name: '🚀 PRO', price: `${currency}${price}`, period: '/mês', features: ['Projetos Ilimitados', '100 GB Espaço', 'Suporte 24/7 em PT', 'Análise Avançada'], btn: '🎯 QUERO O PRO!', highlight: true },
          { name: 'Empresarial', price: 'Sob Consulta', period: '', features: ['Tudo do PRO', 'SLA Garantido', 'Gerente Dedicado', 'Integração Personalizada'], btn: 'Falar com Vendas', highlight: false },
        ],
        badge: '🏆 MAIS POPULAR',
        note: '❤️ Garantia de 30 dias. Parcele em até 12x no cartão!',
      },
      ae: {
        title: 'خطط الأسعار الشفافة',
        plans: [
          { name: 'مجاني', price: 'مجاناً', period: '/شهر', features: ['5 مشاريع', '1 GB تخزين', 'دعم بريد إلكتروني'], btn: 'ابدأ مجاناً', highlight: false },
          { name: '◆ احترافي', price: `${currency} ${price}`, period: '/شهر', features: ['مشاريع غير محدودة', '100 GB تخزين', 'دعم 24/7', 'تحليلات متقدمة'], btn: 'اختر الخطة', highlight: true },
          { name: 'مؤسسي', price: 'عند الطلب', period: '', features: ['كل مميزات الاحترافي', 'ضمان SLA', 'مدير مخصص', 'تكاملات مخصصة'], btn: 'تواصل معنا', highlight: false },
        ],
        badge: '✨ الأكثر شعبية',
        note: '✅ ضمان استرداد المال 30 يوماً. إلغاء في أي وقت.',
      },
      in: {
        title: '🏆 Best Value Plans — Made for India',
        plans: [
          { name: 'Free', price: 'FREE', period: '/mo', features: ['5 Projects', '1 GB Storage', 'Email Support'], btn: 'Start FREE', highlight: false },
          { name: '💎 PRO', price: `${currency}${price}`, period: '/mo', features: ['Unlimited Projects', '100 GB Storage', '24/7 Hindi Support', 'GST Invoice'], btn: '🎯 GET BEST DEAL', highlight: true },
          { name: 'Enterprise', price: 'Custom', period: '', features: ['All Pro features', 'SLA Guarantee', 'Dedicated Manager', 'Custom Integrations'], btn: 'Talk to Sales', highlight: false },
        ],
        badge: '💎 BEST VALUE',
        note: '✅ EMI available · UPI · Cards · Net Banking · GST Invoice · 30-day refund',
      },
    };
    const copy = copies[cultureKey];
    const plansHtml = copy.plans.map(plan => `
      <div style="background:${plan.highlight ? p.accent + '22' : p.surface};border:2px solid ${plan.highlight ? p.accent : p.border};border-radius:10px;padding:20px;flex:1;min-width:160px;position:relative;">
        ${plan.highlight ? `<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:${p.badge};color:${p.bg};padding:2px 12px;border-radius:20px;font-size:10px;font-weight:800;white-space:nowrap;">${copy.badge}</div>` : ''}
        <div style="color:${p.text};font-weight:700;font-size:16px;margin-bottom:8px;">${plan.name}</div>
        <div style="color:${plan.highlight ? p.accent : p.text};font-size:26px;font-weight:800;margin-bottom:4px;">${plan.price}<span style="font-size:13px;font-weight:400;color:${p.muted};">${plan.period}</span></div>
        <ul style="list-style:none;padding:0;margin:12px 0;color:${p.muted};font-size:12px;line-height:2;">
          ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
        <button style="width:100%;background:${plan.highlight ? p.btn : 'transparent'};color:${plan.highlight ? p.btnText : p.accent};border:2px solid ${p.accent};padding:10px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;font-family:${c.font};">${plan.btn}</button>
      </div>`).join('');
    return `<div dir="${c.dir}" style="background:${p.bg};padding:28px 20px;border-radius:12px;font-family:${c.font};">
  <h2 style="color:${p.text};text-align:center;font-size:18px;margin:0 0 20px;">${copy.title}</h2>
  <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:16px;">${plansHtml}</div>
  <p style="color:${p.muted};font-size:12px;text-align:center;margin:0;">${copy.note}</p>
</div>`;
  }

  function genCTA(cultureKey) {
    const c = CULTURES[cultureKey];
    const p = c.palette;
    const copies = {
      us: {
        headline: '⚡ Don\'t Miss Out — 50% OFF Ends Tonight!',
        sub: 'Join 200,000+ professionals who made the switch. Zero risk. 30-day money-back guarantee.',
        btn: '🔥 CLAIM 50% OFF NOW',
        btn2: 'Maybe Later',
        timer: '⏰ Offer expires in 04:59:22',
      },
      eu: {
        headline: 'Ready to Get Started?',
        sub: 'Join thousands of professionals across Europe. No dark patterns. No urgency tricks. Just great software.',
        btn: 'Get Started',
        btn2: 'Learn More',
        timer: '🔒 No automatic renewals without explicit consent.',
      },
      jp: {
        headline: '今すぐ始めませんか？',
        sub: 'ご要望に合わせたプランをご提案いたします。まずはお気軽にお試しください。専門スタッフが丁寧にサポートいたします。',
        btn: '無料体験を始める',
        btn2: 'もっと詳しく',
        timer: '安心の30日間無料トライアル',
      },
      uk: {
        headline: 'Fancy Giving It a Go?',
        sub: 'Thousands of sensible people across Britain have already signed up. There\'s even a queue to join. Just kidding — no queue.',
        btn: 'Get Started',
        btn2: 'More Information',
        timer: '30-day trial. No faffing about.',
      },
      br: {
        headline: '🎊 Junte-se à Nossa Comunidade!',
        sub: 'Mais de 80.000 brasileiros já fazem parte. Suporte em português, comunidade ativa e preço que cabe no bolso!',
        btn: '🚀 ENTRAR NA COMUNIDADE!',
        btn2: 'Saiba Mais',
        timer: '❤️ 30 dias grátis. Parcele em até 12x!',
      },
      ae: {
        headline: 'انضم إلى منصتنا المميزة اليوم',
        sub: 'يثق بنا أكثر من 50,000 محترف في منطقة الشرق الأوسط. خدمة راقية تليق بتطلعاتكم.',
        btn: 'انضم الآن',
        btn2: 'تعرف على المزيد',
        timer: '✅ ضمان استرداد 30 يوماً كاملة',
      },
      in: {
        headline: '🏆 India\'s #1 Platform — Start FREE Today!',
        sub: 'Trusted by 1 Lakh+ businesses across India. GST invoice available. Pay via UPI, Cards, EMI or Net Banking.',
        btn: '🎯 Start FREE — Best Deal!',
        btn2: 'View Plans',
        timer: '✅ 100% Secure · ISO Certified · 30-day refund · Made for Bharat',
      },
    };
    const copy = copies[cultureKey];
    return `<div dir="${c.dir}" style="background:linear-gradient(135deg,${p.accent}22,${p.accent2 || p.accent}33);border:1px solid ${p.accent}55;padding:36px 28px;border-radius:12px;font-family:${c.font};text-align:${c.dir === 'rtl' ? 'right' : 'center'};">
  <h2 style="color:${p.text};font-size:clamp(18px,2.5vw,26px);font-weight:800;margin:0 0 12px;">${copy.headline}</h2>
  <p style="color:${p.muted};font-size:14px;line-height:1.7;max-width:500px;margin:0 auto 20px;">${copy.sub}</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;">
    <button style="background:${p.btn};color:${p.btnText};border:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;font-family:${c.font};">${copy.btn}</button>
    <button style="background:transparent;color:${p.muted};border:none;padding:14px 20px;border-radius:8px;font-size:14px;cursor:pointer;font-family:${c.font};text-decoration:underline;">${copy.btn2}</button>
  </div>
  <p style="color:${p.muted};font-size:12px;margin:0;">${copy.timer}</p>
</div>`;
  }

  const GENERATORS = {
    button: genButton,
    hero: genHero,
    nav: genNav,
    card: genCard,
    pricing: genPricing,
    cta: genCTA,
  };

  /* ─────────────────────────────────────────────
     STANDALONE TEMPLATE
  ───────────────────────────────────────────── */
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌍 Geo-Adaptive Component Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#020617;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;padding:24px}
h1{font-size:clamp(20px,3vw,28px);font-weight:800;background:linear-gradient(135deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}
.subtitle{color:#64748b;font-size:14px;margin-bottom:24px}
.controls{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:20px;align-items:flex-end}
label{display:block;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
select{background:#0f172a;color:#e2e8f0;border:1px solid #1e3a5f;padding:10px 14px;border-radius:8px;font-size:14px;outline:none;cursor:pointer;font-family:inherit}
.region-grid{display:flex;flex-wrap:wrap;gap:8px}
.region-btn{background:#0f172a;color:#94a3b8;border:1px solid #1e3a5f;padding:8px 14px;border-radius:20px;font-size:13px;cursor:pointer;transition:all 0.2s;font-family:inherit}
.region-btn.active{background:#1e40af22;color:#38bdf8;border-color:#38bdf8}
.gen-btn{background:linear-gradient(135deg,#38bdf8,#818cf8);color:#020617;border:none;padding:11px 24px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
.export-btn{background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:11px 22px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
.comparison-grid{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.variant-panel{background:#0f172a;border:1px solid #1e3a5f;border-radius:12px;overflow:hidden}
.variant-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#0a0f1e;border-bottom:1px solid #1e3a5f}
.variant-label{font-size:14px;font-weight:700;color:#38bdf8}
.panel-btns{display:flex;gap:6px}
.panel-btn{background:#1e293b;color:#94a3b8;border:none;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit}
.variant-preview{padding:16px;overflow:auto;max-height:420px}
.empty{text-align:center;padding:48px 24px;color:#334155}
.empty-icon{font-size:48px;margin-bottom:12px}
.toast{position:fixed;top:20px;right:20px;background:#1e293b;color:#e2e8f0;padding:12px 20px;border-radius:8px;font-size:14px;border:1px solid #334155;box-shadow:0 8px 32px rgba(0,0,0,0.5);transform:translateY(-80px);transition:transform 0.3s;z-index:9999}
.toast.show{transform:translateY(0)}
.section-title{font-size:16px;font-weight:700;color:#94a3b8;margin-bottom:14px;display:flex;align-items:center;gap:8px}
</style>
</head>
<body>
<h1>🌍 Geo-Adaptive Component Studio</h1>
<p class="subtitle">Generate culturally-adapted UI variants for global markets</p>

<div class="controls">
  <div>
    <label>Select Component</label>
    <select id="compSelect">
      <option value="button">Button / CTA</option>
      <option value="hero">Hero Section</option>
      <option value="nav">Navigation Bar</option>
      <option value="card">Product Card</option>
      <option value="pricing">Pricing Table</option>
      <option value="cta">CTA Banner</option>
    </select>
  </div>
  <div>
    <label>Select Regions to Compare</label>
    <div class="region-grid" id="regionGrid"></div>
  </div>
  <button class="gen-btn" id="genBtn">⚡ Generate Variants</button>
  <button class="export-btn" id="exportBtn">📦 Export All</button>
</div>

<div class="section-title">🌐 Cultural Variant Comparison</div>
<div class="comparison-grid" id="comparisonGrid">
  <div class="empty"><div class="empty-icon">🌍</div><p>Select a component and regions, then click Generate Variants.</p></div>
</div>

<div class="toast" id="toast"></div>

<${'script'}>
const CULTURES={us:{label:'🇺🇸 North America',dir:'ltr',palette:{bg:'#0f172a',surface:'#1e293b',accent:'#ef4444',accent2:'#f97316',text:'#f8fafc',muted:'#94a3b8',border:'#334155',btn:'linear-gradient(135deg,#ef4444,#f97316)',btnText:'#ffffff',badge:'#fbbf24'},font:'system-ui,-apple-system,sans-serif',tone:'urgency',currency:'$',price:'9.99',priceAlt:'4.99'},eu:{label:'🇪🇺 Europe (GDPR)',dir:'ltr',palette:{bg:'#0e1621',surface:'#1a2332',accent:'#3b82f6',accent2:'#6366f1',text:'#e2e8f0',muted:'#8fa3be',border:'#2a3a50',btn:'linear-gradient(135deg,#3b82f6,#6366f1)',btnText:'#ffffff',badge:'#10b981'},font:'system-ui,-apple-system,sans-serif',tone:'professional',currency:'€',price:'9.99',priceAlt:'4.99'},jp:{label:'🇯🇵 Japan',dir:'ltr',palette:{bg:'#f5f5f5',surface:'#ffffff',accent:'#c0392b',accent2:'#e74c3c',text:'#1a1a1a',muted:'#6b7280',border:'#e5e7eb',btn:'linear-gradient(135deg,#c0392b,#e74c3c)',btnText:'#ffffff',badge:'#059669'},font:'"Hiragino Sans","Yu Gothic","Meiryo",sans-serif',tone:'polite',currency:'¥',price:'1,500',priceAlt:'980'},uk:{label:'🇬🇧 United Kingdom',dir:'ltr',palette:{bg:'#0d1b2a',surface:'#1b2d42',accent:'#1d4ed8',accent2:'#7c3aed',text:'#e2e8f0',muted:'#94a3b8',border:'#2d3f55',btn:'linear-gradient(135deg,#1d4ed8,#1e40af)',btnText:'#ffffff',badge:'#d97706'},font:'"Georgia","Times New Roman",serif',tone:'understated',currency:'£',price:'7.99',priceAlt:'3.99'},br:{label:'🇧🇷 Brazil/LATAM',dir:'ltr',palette:{bg:'#1a0a00',surface:'#2d1500',accent:'#f59e0b',accent2:'#10b981',text:'#fef3c7',muted:'#d97706',border:'#78350f',btn:'linear-gradient(135deg,#f59e0b,#10b981)',btnText:'#1a0a00',badge:'#ef4444'},font:'"Segoe UI",Arial,sans-serif',tone:'vibrant',currency:'R$',price:'49,90',priceAlt:'24,90'},ae:{label:'🇦🇪 Middle East (RTL)',dir:'rtl',palette:{bg:'#0a0e1a',surface:'#111827',accent:'#16a34a',accent2:'#d97706',text:'#f9fafb',muted:'#9ca3af',border:'#1f2937',btn:'linear-gradient(135deg,#16a34a,#d97706)',btnText:'#ffffff',badge:'#d97706'},font:'"Segoe UI","Arial Unicode MS",sans-serif',tone:'formal',currency:'د.إ',price:'36.75',priceAlt:'18.40'},in:{label:'🇮🇳 India',dir:'ltr',palette:{bg:'#1a0033',surface:'#2d004d',accent:'#f97316',accent2:'#a855f7',text:'#fef9c3',muted:'#c084fc',border:'#6b21a8',btn:'linear-gradient(135deg,#f97316,#a855f7)',btnText:'#ffffff',badge:'#22c55e'},font:'"Noto Sans","Segoe UI",sans-serif',tone:'value',currency:'₹',price:'799',priceAlt:'399'}};

function showToast(msg,ms=2200){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),ms)}

const REGION_KEYS=Object.keys(CULTURES);
const grid=document.getElementById('regionGrid');
let activeRegions=new Set(['us','jp','br']);
REGION_KEYS.forEach(k=>{
  const btn=document.createElement('button');
  btn.className='region-btn'+(activeRegions.has(k)?' active':'');
  btn.textContent=CULTURES[k].label;
  btn.dataset.key=k;
  btn.onclick=()=>{
    if(activeRegions.has(k)){activeRegions.delete(k);btn.classList.remove('active');}
    else{activeRegions.add(k);btn.classList.add('active');}
  };
  grid.appendChild(btn);
});

function genButton(k){const c=CULTURES[k],p=c.palette,copies={us:{main:'Get Started FREE — Limited Time!',sub:'⚡ Offer ends soon · No credit card needed',badge:'🔥 BEST DEAL'},eu:{main:'Get Started',sub:'No lock-in. Cancel anytime. GDPR compliant.',badge:'Trusted'},jp:{main:'ご利用を開始ください',sub:'無料でお試しいただけます。いつでもご解約可能です。',badge:'安心'},uk:{main:'Get Started',sub:'No fuss, no nonsense. Cancel whenever you like.',badge:'Jolly Good'},br:{main:'Comece Agora — É GRÁTIS! 🎉',sub:'Junte-se a mais de 50.000 pessoas! Sem cartão de crédito.',badge:'🎊 INCRÍVEL'},ae:{main:'ابدأ الآن مجاناً',sub:'انضم إلى آلاف المستخدمين الموثوقين. بدون بطاقة ائتمان.',badge:'✨ موثوق'},in:{main:'Start FREE — Best Price Guaranteed! 🏆',sub:'✅ Trusted by 1 Lakh+ users · UPI / Cards / EMI available',badge:'💎 BEST VALUE'}},copy=copies[k];return \`<div dir="\${c.dir}" style="background:\${p.bg};padding:32px;border-radius:12px;font-family:\${c.font};text-align:\${c.dir==='rtl'?'right':'center'}"><span style="display:inline-block;background:\${p.badge};color:\${p.bg};padding:4px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:1px;margin-bottom:16px">\${copy.badge}</span><div style="margin-bottom:20px"><button style="background:\${p.btn};color:\${p.btnText};border:none;padding:16px 36px;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer">\${copy.main}</button></div><p style="color:\${p.muted};font-size:13px;margin:0">\${copy.sub}</p></div>\`}

function genHero(k){const c=CULTURES[k],p=c.palette,copies={us:{headline:'Build Faster. Ship More. Dominate Your Market.',sub:'The #1 platform trusted by 200,000+ developers. Start free today — no credit card required.',btn:'🚀 Start for FREE',btn2:'Watch Demo',trust:'⭐⭐⭐⭐⭐ 4.9/5 from 12,000 reviews'},eu:{headline:'Professional Software for Modern Teams',sub:'Build reliable products with a platform that respects your privacy. Fully GDPR compliant.',btn:'Get Started',btn2:'Learn More',trust:'🔒 GDPR Compliant · ISO 27001 · EU Servers'},jp:{headline:'信頼と品質のソフトウェアプラットフォーム',sub:'丁寧なサポートと高品質なサービスで、あなたのビジネスをサポートします。',btn:'無料でお試しはこちら',btn2:'詳細はこちら',trust:'安心・安全 · お客様満足度 98%'},uk:{headline:'Software That Simply Works.',sub:'Rather good software for people who prefer things that actually function properly.',btn:'Get Started',btn2:'See How It Works',trust:'★★★★★ Rated "Quite Excellent" by 8,000 customers'},br:{headline:'🎉 Transforme seu Negócio com Nossa Plataforma!',sub:'Mais de 80.000 empreendedores brasileiros já escolheram. Comunidade ativa!',btn:'🚀 Comece Grátis Agora!',btn2:'Ver Demonstração',trust:'❤️ Comunidade de 80 mil membros ativos!'},ae:{headline:'منصة برمجية موثوقة للمحترفين',sub:'خدمة احترافية تليق بتطلعاتكم. نوفر دعماً متميزاً وأمناً لا مثيل له.',btn:'ابدأ مجاناً',btn2:'اعرف أكثر',trust:'✅ موثوق من قِبل أكثر من 50,000 مستخدم'},in:{headline:'🏆 India\'s Most Trusted Platform — Best Price Guaranteed!',sub:'Join 1 Lakh+ Indian businesses. Pay via UPI, Cards, Net Banking or EMI.',btn:'🎯 Start FREE Today',btn2:'View Plans',trust:'✅ ISO Certified · Made for Bharat · GST Invoice Available'}},copy=copies[k];return \`<div dir="\${c.dir}" style="background:\${p.bg};padding:48px 32px;border-radius:12px;font-family:\${c.font};text-align:\${c.dir==='rtl'?'right':'center'}"><h1 style="color:\${p.text};font-size:clamp(22px,3vw,34px);font-weight:800;line-height:1.25;margin:0 0 16px">\${copy.headline}</h1><p style="color:\${p.muted};font-size:15px;line-height:1.7;max-width:520px;margin:0 auto 28px">\${copy.sub}</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px"><button style="background:\${p.btn};color:\${p.btnText};border:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer">\${copy.btn}</button><button style="background:transparent;color:\${p.accent};border:2px solid \${p.accent};padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer">\${copy.btn2}</button></div><p style="color:\${p.muted};font-size:12px;margin:0">\${copy.trust}</p></div>\`}

function genCard(k){const c=CULTURES[k],p=c.palette,copies={us:{badge:'🔥 LIMITED OFFER',name:'Pro Wireless Headphones',desc:'Crystal-clear sound. 40-hour battery.',price:'$9.99',oldPrice:'$149.99',btn:'Add to Cart — Buy NOW',social:'⭐ 4.8 · 3,200 reviews · Ships TODAY'},eu:{badge:'Quality Certified',name:'Pro Wireless Headphones',desc:'Superior audio quality. 2-year EU warranty.',price:'€9.99',oldPrice:'€139.99',btn:'Add to Basket',social:'★ 4.7 · Verified · 2yr Warranty'},jp:{badge:'人気商品',name:'プロ ワイヤレスイヤホン',desc:'繊細な音質と40時間バッテリー。',price:'¥1,500',oldPrice:'¥18,000',btn:'カートに追加する',social:'★ 4.9 · 8,500件のレビュー'},uk:{badge:"Editor's Pick",name:'Pro Wireless Headphones',desc:'Rather splendid audio. No unnecessary fuss.',price:'£7.99',oldPrice:'£119.99',btn:'Add to Basket',social:'★ 4.7 · 2,100 reviews · Free delivery'},br:{badge:'🎊 SUPER OFERTA',name:'Fone de Ouvido Pro Wireless',desc:'Som incrível! A escolha da comunidade!',price:'R$49,90',oldPrice:'R$699,90',btn:'🛒 Comprar Agora!',social:'❤️ 4.8 · 5.200 avaliações'},ae:{badge:'✨ عرض مميز',name:'سماعات لاسلكية احترافية',desc:'جودة صوت استثنائية وبطارية 40 ساعة.',price:'د.إ 36.75',oldPrice:'د.إ 550',btn:'أضف إلى السلة',social:'★ 4.9 · 2,800 تقييم · شحن مجاني'},in:{badge:'💎 BEST VALUE',name:'Pro Wireless Headphones',desc:'Superb sound. GST invoice included.',price:'₹799',oldPrice:'₹3,999',btn:'🛒 Add to Cart — Best Price!',social:'⭐ 4.8 · 12,000 reviews · UPI/EMI'}},copy=copies[k];return \`<div dir="\${c.dir}" style="background:\${p.surface};border-radius:12px;border:1px solid \${p.border};overflow:hidden;font-family:\${c.font};max-width:280px;margin:auto"><div style="background:\${p.accent};height:140px;display:flex;align-items:center;justify-content:center"><span style="font-size:56px">🎧</span></div><div style="padding:18px"><span style="background:\${p.badge};color:\${p.bg};padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800">\${copy.badge}</span><h3 style="color:\${p.text};margin:10px 0 6px;font-size:15px">\${copy.name}</h3><p style="color:\${p.muted};font-size:12px;margin:0 0 12px;line-height:1.5">\${copy.desc}</p><div style="display:flex;align-items:baseline;gap:8px;margin-bottom:12px"><span style="color:\${p.accent};font-size:20px;font-weight:800">\${copy.price}</span><span style="color:\${p.muted};font-size:13px;text-decoration:line-through">\${copy.oldPrice}</span></div><button style="width:100%;background:\${p.btn};color:\${p.btnText};border:none;padding:11px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:8px">\${copy.btn}</button><p style="color:\${p.muted};font-size:11px;margin:0;text-align:center">\${copy.social}</p></div></div>\`}

function genCTA(k){const c=CULTURES[k],p=c.palette,copies={us:{headline:'⚡ Don\'t Miss Out — 50% OFF Ends Tonight!',sub:'Join 200,000+ professionals. Zero risk. 30-day money-back guarantee.',btn:'🔥 CLAIM 50% OFF NOW',timer:'⏰ Offer expires in 04:59:22'},eu:{headline:'Ready to Get Started?',sub:'No dark patterns. No urgency tricks. Just great software.',btn:'Get Started',timer:'🔒 No automatic renewals without explicit consent.'},jp:{headline:'今すぐ始めませんか？',sub:'まずはお気軽にお試しください。専門スタッフが丁寧にサポートいたします。',btn:'無料体験を始める',timer:'安心の30日間無料トライアル'},uk:{headline:'Fancy Giving It a Go?',sub:"Thousands of sensible people across Britain have signed up. No queue.",btn:'Get Started',timer:'30-day trial. No faffing about.'},br:{headline:'🎊 Junte-se à Nossa Comunidade!',sub:'Mais de 80.000 brasileiros já fazem parte. Suporte em português!',btn:'🚀 ENTRAR NA COMUNIDADE!',timer:'❤️ 30 dias grátis. Parcele em até 12x!'},ae:{headline:'انضم إلى منصتنا المميزة اليوم',sub:'يثق بنا أكثر من 50,000 محترف في منطقة الشرق الأوسط.',btn:'انضم الآن',timer:'✅ ضمان استرداد 30 يوماً كاملة'},in:{headline:'🏆 India\'s #1 Platform — Start FREE Today!',sub:'Trusted by 1 Lakh+ businesses. UPI, Cards, EMI or Net Banking.',btn:'🎯 Start FREE — Best Deal!',timer:'✅ 100% Secure · ISO Certified · 30-day refund'}},copy=copies[k];return \`<div dir="\${c.dir}" style="background:linear-gradient(135deg,\${p.accent}22,\${p.accent2||p.accent}33);border:1px solid \${p.accent}55;padding:32px 24px;border-radius:12px;font-family:\${c.font};text-align:\${c.dir==='rtl'?'right':'center'}"><h2 style="color:\${p.text};font-size:clamp(16px,2.5vw,22px);font-weight:800;margin:0 0 12px">\${copy.headline}</h2><p style="color:\${p.muted};font-size:14px;line-height:1.7;max-width:460px;margin:0 auto 20px">\${copy.sub}</p><button style="background:\${p.btn};color:\${p.btnText};border:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:14px">\${copy.btn}</button><p style="color:\${p.muted};font-size:12px;margin:0">\${copy.timer}</p></div>\`}

function genNav(k){const c=CULTURES[k],p=c.palette,copies={us:{brand:'⚡ AppForce',links:['Features','Pricing','Enterprise','Blog'],cta:'Start Free ›',login:'Sign In'},eu:{brand:'◆ AppSuite',links:['Features','Pricing','Privacy','Blog'],cta:'Get Started',login:'Login'},jp:{brand:'◎ アプリスイート',links:['機能','料金','サポート','ブログ'],cta:'無料で始める',login:'ログイン'},uk:{brand:'▲ AppBrit',links:['Features','Pricing','FAQs','Blog'],cta:'Get Started',login:'Sign In'},br:{brand:'🎯 AppBrasil',links:['Recursos','Preços','Comunidade','Blog'],cta:'Comece Grátis 🚀',login:'Entrar'},ae:{brand:'تطبيق برو ◆',links:['الميزات','الأسعار','الدعم','المدونة'],cta:'ابدأ مجاناً',login:'تسجيل دخول'},in:{brand:'🇮🇳 AppBharat',links:['Features','Pricing','Support','Blog'],cta:'Try FREE 🎯',login:'Login'}},copy=copies[k];const lh=copy.links.map(l=>\`<a href="#" style="color:\${p.muted};text-decoration:none;font-size:13px">\${l}</a>\`).join('');return \`<div dir="\${c.dir}" style="background:\${p.surface};padding:0 20px;border-radius:12px;border:1px solid \${p.border};font-family:\${c.font}"><nav style="display:flex;align-items:center;justify-content:space-between;height:56px;gap:12px"><span style="color:\${p.accent};font-size:17px;font-weight:800;white-space:nowrap">\${copy.brand}</span><div style="display:flex;gap:16px;flex:1;justify-content:center">\${lh}</div><div style="display:flex;align-items:center;gap:10px"><a href="#" style="color:\${p.muted};text-decoration:none;font-size:13px">\${copy.login}</a><button style="background:\${p.btn};color:\${p.btnText};border:none;padding:7px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer">\${copy.cta}</button></div></nav></div>\`}

function genPricing(k){const c=CULTURES[k],p=c.palette,copies={us:{title:'Choose Your Plan — Lock in Savings NOW!',plans:[{name:'Starter',price:'FREE',period:'/mo',features:['5 Projects','1 GB Storage','Email Support'],btn:'Start Free',hl:false},{name:'🔥 PRO',price:\`$\${c.price}\`,period:'/mo',features:['Unlimited Projects','100 GB Storage','24/7 Priority Support','Advanced Analytics'],btn:'🚀 GET PRO NOW',hl:true},{name:'Enterprise',price:'Custom',period:'',features:['Everything in Pro','SLA Guarantee','Dedicated Manager'],btn:'Contact Sales',hl:false}],badge:'🔥 MOST POPULAR',note:'⚡ 30-day money-back guarantee. No questions asked.'},eu:{title:'Transparent Pricing — No Surprises',plans:[{name:'Free',price:'Free',period:'/mo',features:['5 Projects','1 GB Storage','Email Support'],btn:'Get Started',hl:false},{name:'Professional',price:\`€\${c.price}\`,period:'/mo',features:['Unlimited Projects','100 GB (EU)','24/7 Support','Privacy Dashboard'],btn:'Choose Plan',hl:true},{name:'Enterprise',price:'On Request',period:'',features:['All Pro features','SLA','DPA Agreement'],btn:'Request Quote',hl:false}],badge:'Recommended',note:'🔒 GDPR compliant. EU servers. Cancel anytime.'},jp:{title:'料金プランのご案内',plans:[{name:'無料プラン',price:'無料',period:'/月',features:['5プロジェクト','1 GBストレージ','メールサポート'],btn:'無料で始める',hl:false},{name:'◎ プロプラン',price:\`¥\${c.price}\`,period:'/月',features:['無制限プロジェクト','100 GBストレージ','24時間サポート'],btn:'プロプランを選ぶ',hl:true},{name:'エンタープライズ',price:'お見積り',period:'',features:['プロプランの全機能','SLA保証','専任担当者'],btn:'お問い合わせ',hl:false}],badge:'人気 No.1',note:'安心の30日間返金保証。いつでも解約可能です。'},uk:{title:'Straightforward Pricing',plans:[{name:'Free',price:'Free',period:'/mo',features:['5 Projects','1 GB Storage','Email Support'],btn:'Get Started',hl:false},{name:'Professional',price:\`£\${c.price}\`,period:'/mo',features:['Unlimited Projects','100 GB Storage','Telephone Support'],btn:'Choose Plan',hl:true},{name:'Enterprise',price:'POA',period:'',features:['All Pro features','SLA','Account Manager'],btn:'Ring Us',hl:false}],badge:'Most Popular',note:'30-day money-back guarantee. No quibbles.'},br:{title:'🎉 Escolha o Plano Perfeito!',plans:[{name:'Grátis',price:'Grátis',period:'/mês',features:['5 Projetos','1 GB Espaço','Suporte E-mail'],btn:'Começar Grátis',hl:false},{name:'🚀 PRO',price:\`R$\${c.price}\`,period:'/mês',features:['Projetos Ilimitados','100 GB Espaço','Suporte 24/7 PT'],btn:'🎯 QUERO O PRO!',hl:true},{name:'Empresarial',price:'Sob Consulta',period:'',features:['Tudo do PRO','SLA Garantido','Gerente Dedicado'],btn:'Falar com Vendas',hl:false}],badge:'🏆 MAIS POPULAR',note:'❤️ Garantia de 30 dias. Parcele em até 12x!'},ae:{title:'خطط الأسعار الشفافة',plans:[{name:'مجاني',price:'مجاناً',period:'/شهر',features:['5 مشاريع','1 GB تخزين','دعم بريد إلكتروني'],btn:'ابدأ مجاناً',hl:false},{name:'◆ احترافي',price:\`د.إ \${c.price}\`,period:'/شهر',features:['مشاريع غير محدودة','100 GB تخزين','دعم 24/7'],btn:'اختر الخطة',hl:true},{name:'مؤسسي',price:'عند الطلب',period:'',features:['كل مميزات الاحترافي','ضمان SLA','مدير مخصص'],btn:'تواصل معنا',hl:false}],badge:'✨ الأكثر شعبية',note:'✅ ضمان 30 يوماً. إلغاء في أي وقت.'},in:{title:'🏆 Best Value Plans — Made for India',plans:[{name:'Free',price:'FREE',period:'/mo',features:['5 Projects','1 GB Storage','Email Support'],btn:'Start FREE',hl:false},{name:'💎 PRO',price:\`₹\${c.price}\`,period:'/mo',features:['Unlimited Projects','100 GB Storage','24/7 Hindi Support','GST Invoice'],btn:'🎯 GET BEST DEAL',hl:true},{name:'Enterprise',price:'Custom',period:'',features:['All Pro features','SLA Guarantee','Dedicated Manager'],btn:'Talk to Sales',hl:false}],badge:'💎 BEST VALUE',note:'✅ EMI · UPI · Cards · Net Banking · GST Invoice'}};const copy=copies[k];const ph=copy.plans.map(pl=>\`<div style="background:\${pl.hl?p.accent+'22':p.surface};border:2px solid \${pl.hl?p.accent:p.border};border-radius:10px;padding:18px;flex:1;min-width:140px;position:relative">\${pl.hl?\`<div style="position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:\${p.badge};color:\${p.bg};padding:2px 12px;border-radius:20px;font-size:10px;font-weight:800;white-space:nowrap">\${copy.badge}</div>\`:''}<div style="color:\${p.text};font-weight:700;font-size:15px;margin-bottom:6px">\${pl.name}</div><div style="color:\${pl.hl?p.accent:p.text};font-size:22px;font-weight:800;margin-bottom:4px">\${pl.price}<span style="font-size:12px;font-weight:400;color:\${p.muted}">\${pl.period}</span></div><ul style="list-style:none;padding:0;margin:10px 0;color:\${p.muted};font-size:11px;line-height:2">\${pl.features.map(f=>\`<li>✓ \${f}</li>\`).join('')}</ul><button style="width:100%;background:\${pl.hl?p.btn:'transparent'};color:\${pl.hl?p.btnText:p.accent};border:2px solid \${p.accent};padding:8px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer">\${pl.btn}</button></div>\`).join('');return \`<div dir="\${c.dir}" style="background:\${p.bg};padding:24px 16px;border-radius:12px;font-family:\${c.font}"><h2 style="color:\${p.text};text-align:center;font-size:16px;margin:0 0 18px">\${copy.title}</h2><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:14px">\${ph}</div><p style="color:\${p.muted};font-size:11px;text-align:center;margin:0">\${copy.note}</p></div>\`}

const GENS={button:genButton,hero:genHero,nav:genNav,card:genCard,pricing:genPricing,cta:genCTA};
let currentVariants=[];

document.getElementById('genBtn').onclick=function(){
  const comp=document.getElementById('compSelect').value;
  const regions=[...activeRegions];
  if(!regions.length){showToast('⚠️ Select at least one region.');return;}
  currentVariants=regions.map(r=>({key:r,label:CULTURES[r].label,html:GENS[comp](r)}));
  const grid=document.getElementById('comparisonGrid');
  grid.innerHTML='';
  currentVariants.forEach(v=>{
    const panel=document.createElement('div');
    panel.className='variant-panel';
    panel.innerHTML=\`<div class="variant-header"><span class="variant-label">\${v.label}</span><div class="panel-btns"><button class="panel-btn" onclick="copyHtml(\${JSON.stringify(v.html).replace(/"/g,'&quot;')})">📋 Copy</button></div></div><div class="variant-preview">\${v.html}</div>\`;
    grid.appendChild(panel);
  });
  showToast('✅ Variants generated!');
};

function copyHtml(html){navigator.clipboard.writeText(html).then(()=>showToast('📋 Copied!'));}

document.getElementById('exportBtn').onclick=function(){
  if(!currentVariants.length){showToast('⚠️ Generate variants first.');return;}
  const comp=document.getElementById('compSelect').value;
  const tabs=currentVariants.map((v,i)=>\`<button class="tab-btn \${i===0?'active':''}" onclick="switchTab(\${i})" id="tab\${i}">\${v.label}</button>\`).join('');
  const panels=currentVariants.map((v,i)=>\`<div class="panel" id="panel\${i}" style="display:\${i===0?'block':'none'}">\${v.html}</div>\`).join('');
  const doc=\`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Geo-Adaptive Variants — \${comp}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#020617;color:#e2e8f0;font-family:system-ui,sans-serif;padding:24px}h1{color:#38bdf8;margin-bottom:20px;font-size:22px}.tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.tab-btn{background:#0f172a;color:#94a3b8;border:1px solid #1e3a5f;padding:8px 16px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px}.tab-btn.active{background:#1e40af22;color:#38bdf8;border-color:#38bdf8}</style></head><body><h1>🌍 Geo-Adaptive Variants — \${comp}</h1><div class="tabs">\${tabs}</div><div id="panels">\${panels}</div><script>function switchTab(i){document.querySelectorAll('.panel').forEach((p,j)=>p.style.display=j===i?'block':'none');document.querySelectorAll('.tab-btn').forEach((b,j)=>b.classList.toggle('active',j===i));}<\\/script></body></html>\`;
  const blob=new Blob([doc],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=\`geo-variants-\${comp}.html\`;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),5000);
  showToast('✅ Exported!');
};

// Auto-generate on load
document.getElementById('genBtn').click();
</${'script'}>
</body>
</html>`;

  /* ─────────────────────────────────────────────
     MODULE STYLES
  ───────────────────────────────────────────── */
  const MODULE_CSS = `
#geoadaptive-root {
  font-family: 'Inter', system-ui, sans-serif;
  background: #020617;
  min-height: 100%;
  padding: 20px;
  color: #e2e8f0;
  box-sizing: border-box;
}
#geoadaptive-root * { box-sizing: border-box; }
.geo-header { margin-bottom: 18px; }
.geo-title {
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 800;
  background: linear-gradient(135deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
}
.geo-subtitle { color: #64748b; font-size: 13px; }
.geo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
  align-items: flex-end;
}
.geo-field label {
  display: block;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}
.geo-select {
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #1e3a5f;
  padding: 9px 13px;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
}
.geo-region-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-width: 520px;
}
.geo-region-btn {
  background: #0f172a;
  color: #94a3b8;
  border: 1px solid #1e3a5f;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.18s;
  font-family: inherit;
  white-space: nowrap;
}
.geo-region-btn.active {
  background: #1e40af22;
  color: #38bdf8;
  border-color: #38bdf8;
  box-shadow: 0 0 8px #38bdf844;
}
.geo-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
}
.geo-btn {
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.15s, transform 0.1s;
}
.geo-btn:active { transform: scale(0.97); }
.geo-btn-primary { background: linear-gradient(135deg, #38bdf8, #818cf8); color: #020617; }
.geo-btn-success { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
.geo-btn-accent { background: linear-gradient(135deg, #f97316, #ef4444); color: #fff; }
.geo-btn-standalone { background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; }
.geo-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.geo-comparison-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}
.geo-variant-panel {
  background: #0f172a;
  border: 1px solid #1e3a5f;
  border-radius: 12px;
  overflow: hidden;
}
.geo-variant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #0a0f1e;
  border-bottom: 1px solid #1e3a5f;
}
.geo-variant-label { font-size: 13px; font-weight: 700; color: #38bdf8; }
.geo-panel-btns { display: flex; gap: 6px; }
.geo-panel-btn {
  background: #1e293b;
  color: #94a3b8;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.geo-panel-btn:hover { background: #334155; color: #e2e8f0; }
.geo-variant-preview {
  padding: 14px;
  overflow: auto;
  max-height: 400px;
  scrollbar-width: thin;
  scrollbar-color: #1e3a5f #0a0f1e;
}
.geo-empty {
  text-align: center;
  padding: 48px 24px;
  color: #334155;
}
.geo-empty-icon { font-size: 48px; margin-bottom: 12px; }
.geo-empty-text { font-size: 14px; color: #475569; line-height: 1.6; }
`;

  /* ─────────────────────────────────────────────
     RENDER FUNCTION
  ───────────────────────────────────────────── */
  function renderGeoAdaptive() {
    const lang = window.appLang || 'en';
    const t = i18n[lang];

    const lb = document.getElementById('left-body');
    if (!lb) return;

    // Inject CSS
    if (!document.getElementById('geo-adaptive-styles')) {
      const style = document.createElement('style');
      style.id = 'geo-adaptive-styles';
      style.textContent = MODULE_CSS;
      document.head.appendChild(style);
    }

    lb.innerHTML = `
<div id="geoadaptive-root">
  <div class="geo-header">
    <div class="geo-title">${t.title}</div>
    <div class="geo-subtitle">${t.subtitle}</div>
  </div>

  <div class="geo-controls">
    <div class="geo-field">
      <label>${t.selectComponent}</label>
      <select class="geo-select" id="geo-comp-select">
        ${Object.entries(t.components).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
      </select>
    </div>
    <div class="geo-field">
      <label>${t.selectRegions}</label>
      <div class="geo-region-grid" id="geo-region-grid">
        ${Object.entries(t.regions).map(([k, v]) => `
          <button class="geo-region-btn${['us', 'jp', 'br'].includes(k) ? ' active' : ''}" data-region="${k}">${v}</button>
        `).join('')}
      </div>
    </div>
  </div>

  <div class="geo-action-row">
    <button class="geo-btn geo-btn-primary" id="geo-generate-btn">⚡ ${t.generateBtn}</button>
    <button class="geo-btn geo-btn-success" id="geo-export-btn">${t.exportBtn}</button>
    <button class="geo-btn geo-btn-standalone" id="geo-standalone-btn">${t.loadStandalone}</button>
  </div>

  <div class="geo-section-title">🌐 ${t.comparisonTitle}</div>
  <div class="geo-comparison-grid" id="geo-comparison-grid">
    <div class="geo-empty">
      <div class="geo-empty-icon">🌍</div>
      <div class="geo-empty-text">${t.noVariants}</div>
    </div>
  </div>
</div>`;

    /* ── State ── */
    let activeRegions = new Set(['us', 'jp', 'br']);
    let currentVariants = [];

    /* ── Region toggle ── */
    document.querySelectorAll('.geo-region-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.region;
        if (activeRegions.has(k)) {
          activeRegions.delete(k);
          btn.classList.remove('active');
        } else {
          activeRegions.add(k);
          btn.classList.add('active');
        }
      });
    });

    /* ── Generate ── */
    function generateVariants() {
      const comp = document.getElementById('geo-comp-select').value;
      const regions = [...activeRegions];
      if (!regions.length) {
        if (window.showToast) window.showToast('⚠️ Select at least one region first.');
        return;
      }

      const generator = GENERATORS[comp];
      currentVariants = regions.map(r => ({
        key: r,
        label: CULTURES[r].label,
        html: generator(r),
      }));

      const grid = document.getElementById('geo-comparison-grid');
      grid.innerHTML = '';

      currentVariants.forEach((v, idx) => {
        const panel = document.createElement('div');
        panel.className = 'geo-variant-panel';
        panel.innerHTML = `
          <div class="geo-variant-header">
            <span class="geo-variant-label">${v.label}</span>
            <div class="geo-panel-btns">
              <button class="geo-panel-btn" data-action="copy" data-idx="${idx}">${t.copyHtmlBtn}</button>
              <button class="geo-panel-btn" data-action="load" data-idx="${idx}">${t.loadEditorBtn}</button>
            </div>
          </div>
          <div class="geo-variant-preview">${v.html}</div>`;
        grid.appendChild(panel);
      });

      // Wire panel buttons
      grid.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const variant = currentVariants[idx];
          if (btn.dataset.action === 'copy') {
            navigator.clipboard.writeText(variant.html).then(() => {
              if (window.showToast) window.showToast(t.toastCopy);
            });
          } else if (btn.dataset.action === 'load') {
            if (window.editor && window.editor.setValue) {
              window.editor.setValue(variant.html);
              if (window.runPreview) window.runPreview();
              if (window.showToast) window.showToast(t.toastLoad);
            } else {
              if (window.showToast) window.showToast('⚠️ Editor not available.');
            }
          }
        });
      });

      if (window.showToast) window.showToast(t.toastGenerate);
    }

    document.getElementById('geo-generate-btn').addEventListener('click', generateVariants);

    /* ── Export All ── */
    document.getElementById('geo-export-btn').addEventListener('click', () => {
      if (!currentVariants.length) {
        if (window.showToast) window.showToast('⚠️ Generate variants first.');
        return;
      }
      const comp = document.getElementById('geo-comp-select').value;
      const compLabel = t.components[comp];

      const tabs = currentVariants.map((v, i) =>
        `<button class="tab-btn${i === 0 ? ' active' : ''}" onclick="switchTab(${i})">${v.label}</button>`
      ).join('');

      const panels = currentVariants.map((v, i) =>
        `<div class="panel" id="panel${i}" style="display:${i === 0 ? 'block' : 'none'};">${v.html}</div>`
      ).join('');

      const exportDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌍 Geo-Adaptive Variants — ${compLabel}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#020617;color:#e2e8f0;font-family:'Inter',system-ui,sans-serif;padding:32px;min-height:100vh}
h1{font-size:24px;font-weight:800;background:linear-gradient(135deg,#38bdf8,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px}
.meta{color:#475569;font-size:14px;margin-bottom:24px}
.tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.tab-btn{background:#0f172a;color:#94a3b8;border:1px solid #1e3a5f;padding:8px 18px;border-radius:20px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;transition:all 0.18s}
.tab-btn.active{background:#1e40af22;color:#38bdf8;border-color:#38bdf8;box-shadow:0 0 10px #38bdf833}
.panel{animation:fadein 0.25s}
@keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
footer{margin-top:32px;color:#334155;font-size:12px;text-align:center}
</style>
</head>
<body>
<h1>🌍 Geo-Adaptive Component Variants</h1>
<div class="meta">Component: <strong style="color:#94a3b8">${compLabel}</strong> · ${currentVariants.length} regional variants · Generated ${new Date().toLocaleDateString()}</div>
<div class="tabs">${tabs}</div>
<div id="panels">${panels}</div>
<footer>Generated by IA Architecte — GEO-ADAPTIVE COMPONENT STUDIO</footer>
<${'script'}>
function switchTab(i){
  document.querySelectorAll('.panel').forEach((p,j)=>p.style.display=j===i?'block':'none');
  document.querySelectorAll('.tab-btn').forEach((b,j)=>b.classList.toggle('active',j===i));
}
</${'script'}>
</body>
</html>`;

      const blob = new Blob([exportDoc], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `geo-variants-${comp}-${Date.now()}.html`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      if (window.showToast) window.showToast(t.toastExport);
    });

    /* ── Load Standalone ── */
    document.getElementById('geo-standalone-btn').addEventListener('click', () => {
      if (window.editor && window.editor.setValue) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
    });

    // Auto-generate on render
    generateVariants();
  }

  /* ─────────────────────────────────────────────
     TAB HOOK
  ───────────────────────────────────────────── */
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId === TAB_ID) {
      renderGeoAdaptive();
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
      }
    }
  };

  /* ─────────────────────────────────────────────
     INIT TOAST
  ───────────────────────────────────────────── */
  if (window.showToast) {
    const lang = window.appLang || 'en';
    window.showToast(i18n[lang].toastInit);
  }

})();
