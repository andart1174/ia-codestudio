import React, { useState } from 'react';
import { FileCode, Play, ChevronDown } from 'lucide-react';

const SMART_TEMPLATES = [
    {
        id: 'landing',
        label: 'SaaS Landing Page',
        labelFr: 'Page Landing SaaS',
        icon: '🚀',
        vars: [
            { key: 'COMPANY', label: 'Company Name', labelFr: 'Nom de l\'entreprise', placeholder: 'AuraGen' },
            { key: 'TAGLINE', label: 'Tagline', labelFr: 'Slogan', placeholder: 'Build apps 10x faster' },
            { key: 'CTA', label: 'CTA Button Text', labelFr: 'Texte bouton', placeholder: 'Get Started Free' },
            { key: 'COLOR', label: 'Primary Color', labelFr: 'Couleur principale', placeholder: '#6366f1', type: 'color' },
        ],
        code: (v) => `const App = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}' }}>${v.COMPANY}</span>
      <div style={{ display: 'flex', gap: '32px', color: '#64748b', fontWeight: 600, fontSize: '15px' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
      </div>
      <button style={{ padding: '10px 22px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>${v.CTA}</button>
    </nav>
    <section style={{ textAlign: 'center', padding: '120px 20px 80px' }}>
      <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '${v.COLOR}', padding: '6px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 700, marginBottom: '24px' }}>✨ Now in Beta</div>
      <h1 style={{ fontSize: '60px', fontWeight: 900, color: '#0f172a', margin: '0 0 20px', letterSpacing: '-2px', lineHeight: 1.1 }}>${v.TAGLINE}</h1>
      <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>The all-in-one platform that helps teams ship beautiful products faster than ever before.</p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button style={{ padding: '16px 36px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}>${v.CTA}</button>
        <button style={{ padding: '16px 36px', background: 'transparent', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '14px', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>Watch Demo →</button>
      </div>
    </section>
    <section style={{ padding: '80px 40px', background: '#f8fafc' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
        {[{ icon: '⚡', title: 'Lightning Fast', desc: 'Deploy your apps in seconds with our optimized infrastructure.' },
          { icon: '🔒', title: 'Secure by Default', desc: 'Enterprise-grade security built into every layer of the stack.' },
          { icon: '📈', title: 'Scales Infinitely', desc: 'From zero to millions of users without changing a line of code.' }
        ].map((f, i) => (
          <div key={i} style={{ background: '#fff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: '18px' }}>{f.title}</h3>
            <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '15px' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);`,
    },
    {
        id: 'portfolio',
        label: 'Personal Portfolio',
        labelFr: 'Portfolio Personnel',
        icon: '🎨',
        vars: [
            { key: 'NAME', label: 'Your Full Name', labelFr: 'Votre nom', placeholder: 'Alice Martin' },
            { key: 'TITLE', label: 'Job Title', labelFr: 'Profession', placeholder: 'Senior UX Designer' },
            { key: 'BIO', label: 'Short Bio', labelFr: 'Bio courte', placeholder: 'I craft digital experiences that people love' },
            { key: 'COLOR', label: 'Accent Color', labelFr: 'Couleur accent', placeholder: '#ec4899', type: 'color' },
        ],
        code: (v) => `const App = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
    <header style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: 900, fontSize: '20px', color: '${v.COLOR}' }}>${v.NAME.split(' ')[0]}.</span>
      <div style={{ display: 'flex', gap: '28px', color: '#94a3b8', fontWeight: 500 }}>
        {['Work', 'About', 'Contact'].map(i => <a key={i} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{i}</a>)}
      </div>
    </header>
    <main style={{ padding: '80px 48px', maxWidth: '900px' }}>
      <div style={{ fontSize: '14px', color: '${v.COLOR}', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>AVAILABLE FOR HIRE</div>
      <h1 style={{ fontSize: '68px', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.05, letterSpacing: '-2px' }}>
        Hi, I'm<br /><span style={{ color: '${v.COLOR}' }}>${v.NAME}</span>
      </h1>
      <p style={{ fontSize: '22px', color: '#94a3b8', margin: '20px 0 40px', maxWidth: '560px', lineHeight: 1.6 }}>${v.BIO}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
        {['${v.TITLE}', 'React', 'Figma', 'Node.js'].map(tag => (
          <span key={tag} style={{ padding: '8px 18px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', color: '#cbd5e1' }}>{tag}</span>
        ))}
      </div>
      <button style={{ padding: '16px 36px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginRight: '12px' }}>View My Work →</button>
      <button style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>Download CV</button>
    </main>
  </div>
);`,
    },
    {
        id: 'dashboard',
        label: 'Admin Dashboard',
        labelFr: 'Tableau de Bord',
        icon: '📊',
        vars: [
            { key: 'APPNAME', label: 'App Name', labelFr: 'Nom de l\'app', placeholder: 'AdminPro' },
            { key: 'USERNAME', label: 'Admin Name', labelFr: 'Nom admin', placeholder: 'Alice Martin' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur marque', placeholder: '#6366f1', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const stats = [
    { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, icon: '💰' },
    { label: 'Active Users', value: '3,842', change: '+8.2%', up: true, icon: '👥' },
    { label: 'New Orders', value: '1,204', change: '+5.1%', up: true, icon: '📦' },
    { label: 'Churn Rate', value: '2.4%', change: '-0.3%', up: false, icon: '📉' },
  ];
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: '220px', background: '#0f172a', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
        <div style={{ color: '#fff', fontWeight: 900, fontSize: '20px', padding: '8px 12px', marginBottom: '16px' }}>
          <span style={{ color: '${v.COLOR}' }}>${v.APPNAME}</span>
        </div>
        {['Dashboard', 'Analytics', 'Users', 'Orders', 'Products', 'Settings'].map((item, i) => (
          <div key={item} style={{ padding: '10px 14px', borderRadius: '10px', color: i === 0 ? '#fff' : '#64748b', background: i === 0 ? '${v.COLOR}' : 'transparent', fontWeight: i === 0 ? 700 : 500, cursor: 'pointer', fontSize: '14px' }}>{item}</div>
        ))}
      </aside>
      <main style={{ flex: 1, background: '#f8fafc', padding: '32px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Good morning, ${v.USERNAME} 👋</h1>
            <p style={{ margin: 0, color: '#64748b' }}>Here's what's happening with your business today.</p>
          </div>
          <button style={{ padding: '10px 22px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>+ New Report</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: s.up ? '#10b981' : '#ef4444', fontWeight: 600 }}>{s.change} this month</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};`,
    },
    {
        id: 'restaurant',
        label: 'Restaurant Menu',
        labelFr: 'Menu Restaurant',
        icon: '🍽️',
        vars: [
            { key: 'RNAME', label: 'Restaurant Name', labelFr: 'Nom du restaurant', placeholder: 'La Belle Table' },
            { key: 'TAGLINE', label: 'Tagline', labelFr: 'Slogan', placeholder: 'Authentic French Cuisine' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#d97706', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const menu = [
    { cat: 'Starters', items: [{ name: 'French Onion Soup', price: '$12', desc: 'Traditional recipe with gruyère crust' }, { name: 'Truffle Arancini', price: '$16', desc: 'Crispy risotto balls with black truffle' }] },
    { cat: 'Main Course', items: [{ name: 'Duck Confit', price: '$34', desc: 'Slow-cooked duck leg with seasonal vegetables' }, { name: 'Sea Bass Fillet', price: '$38', desc: 'Pan-seared with lemon butter sauce' }] },
    { cat: 'Desserts', items: [{ name: 'Crème Brûlée', price: '$11', desc: 'Classic French vanilla custard' }, { name: 'Tarte Tatin', price: '$13', desc: 'Caramelized apple upside-down tart' }] },
  ];
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#faf7f2', minHeight: '100vh' }}>
      <header style={{ background: '${v.COLOR}', color: '#fff', padding: '48px', textAlign: 'center' }}>
        <div style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '12px' }}>Est. 1982</div>
        <h1 style={{ margin: '0 0 8px', fontSize: '48px', fontWeight: 400, letterSpacing: '-1px' }}>${v.RNAME}</h1>
        <p style={{ margin: 0, opacity: 0.85, fontSize: '18px', fontStyle: 'italic' }}>${v.TAGLINE}</p>
      </header>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 24px' }}>
        {menu.map((section, i) => (
          <div key={i} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: '${v.COLOR}', margin: '0 0 24px', borderBottom: '1px solid #e5d9c8', paddingBottom: '12px' }}>{section.cat}</h2>
            {section.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '18px', color: '#1c1917', marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ color: '#78716c', fontSize: '14px', fontStyle: 'italic' }}>{item.desc}</div>
                </div>
                <div style={{ fontWeight: 700, color: '${v.COLOR}', fontSize: '18px', flexShrink: 0 }}>{item.price}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'ecommerce',
        label: 'E-Commerce Store',
        labelFr: 'Boutique E-Commerce',
        icon: '🛍️',
        vars: [
            { key: 'STORE', label: 'Store Name', labelFr: 'Nom boutique', placeholder: 'StyleHub' },
            { key: 'TAGLINE', label: 'Tagline', labelFr: 'Slogan', placeholder: 'Fashion that speaks' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#f43f5e', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const products = [
    { name: 'Classic Tee', price: '$29', badge: 'New', emoji: '👕' },
    { name: 'Slim Jeans', price: '$79', badge: 'Hot', emoji: '👖' },
    { name: 'Sneakers', price: '$120', badge: 'Sale', emoji: '👟' },
    { name: 'Hoodie', price: '$65', badge: '', emoji: '🧥' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid #f1f5f9' }}>
        <span style={{ fontWeight: 900, fontSize: '24px', color: '${v.COLOR}' }}>${v.STORE}</span>
        <div style={{ display: 'flex', gap: '24px', color: '#64748b', fontSize: '15px', fontWeight: 600 }}>
          {['Men', 'Women', 'Sale', 'New'].map(i => <a key={i} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{i}</a>)}
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '22px' }}>🔍 🛒</div>
      </nav>
      <div style={{ background: '${v.COLOR}', color: '#fff', padding: '80px 48px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8 }}>New Collection 2025</p>
        <h1 style={{ margin: '0 0 20px', fontSize: '56px', fontWeight: 900, letterSpacing: '-2px' }}>${v.TAGLINE}</h1>
        <button style={{ padding: '14px 36px', background: '#fff', color: '${v.COLOR}', border: 'none', borderRadius: '99px', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>Shop Now →</button>
      </div>
      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
        {products.map((p, i) => (
          <div key={i} style={{ border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ background: '#f8fafc', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', position: 'relative' }}>
              {p.emoji}
              {p.badge && <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 10px', background: '${v.COLOR}', color: '#fff', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>{p.badge}</span>}
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: '${v.COLOR}', fontSize: '18px' }}>{p.price}</span>
                <button style={{ padding: '8px 14px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Add +</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'blog',
        label: 'Blog / Magazine',
        labelFr: 'Blog / Magazine',
        icon: '✍️',
        vars: [
            { key: 'BLOG', label: 'Blog Name', labelFr: 'Nom du blog', placeholder: 'The Daily Byte' },
            { key: 'AUTHOR', label: 'Author', labelFr: 'Auteur', placeholder: 'Lucas Bernard' },
            { key: 'COLOR', label: 'Accent Color', labelFr: 'Couleur accent', placeholder: '#0ea5e9', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const posts = [
    { title: 'The Future of AI in 2025', cat: 'Technology', read: '5 min', date: 'Mar 28' },
    { title: 'Building Better Design Systems', cat: 'Design', read: '8 min', date: 'Mar 25' },
    { title: 'Remote Work: A 2025 Guide', cat: 'Lifestyle', read: '6 min', date: 'Mar 20' },
  ];
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fafafa', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
        <span style={{ fontWeight: 900, fontSize: '26px', color: '#0f172a', fontFamily: 'system-ui' }}>${v.BLOG}</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Tech', 'Design', 'Life', 'About'].map(t => <a key={t} href="#" style={{ textDecoration: 'none', color: '#64748b', fontFamily: 'system-ui', fontSize: '15px', fontWeight: 600 }}>{t}</a>)}
        </div>
      </header>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '${v.COLOR}', color: '#fff', borderRadius: '20px', padding: '48px', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Featured</span>
          <h1 style={{ fontSize: '38px', margin: '12px 0 16px', lineHeight: 1.2, fontWeight: 700 }}>Welcome to ${v.BLOG} — Your source for handpicked stories</h1>
          <p style={{ opacity: 0.85, fontStyle: 'italic', margin: 0 }}>By ${v.AUTHOR}</p>
        </div>
        {posts.map((p, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '28px', marginBottom: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'system-ui', fontWeight: 700, color: '${v.COLOR}', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.cat}</span>
              <h2 style={{ margin: '8px 0 12px', fontSize: '20px', color: '#0f172a', fontWeight: 700 }}>{p.title}</h2>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontFamily: 'system-ui' }}>{p.date} · {p.read} read</span>
            </div>
            <span style={{ fontSize: '32px', marginLeft: '20px' }}>📖</span>
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'pricing',
        label: 'Pricing Page',
        labelFr: 'Page de Tarifs',
        icon: '💳',
        vars: [
            { key: 'PRODUCT', label: 'Product Name', labelFr: 'Nom du produit', placeholder: 'ProFlow' },
            { key: 'COLOR', label: 'Primary Color', labelFr: 'Couleur principale', placeholder: '#8b5cf6', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const plans = [
    { name: 'Starter', price: 'Free', features: ['5 projects', '1 GB storage', 'Community support', '—', '—'], cta: 'Get Started' },
    { name: 'Pro', price: '$19/mo', features: ['Unlimited projects', '50 GB storage', 'Priority support', 'AI features', 'Custom domain'], cta: 'Start Free Trial', highlight: true },
    { name: 'Enterprise', price: '$99/mo', features: ['Unlimited projects', '1 TB storage', 'Dedicated support', 'AI features', 'SSO & SAML'], cta: 'Contact Sales' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fafafa', minHeight: '100vh', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ background: 'rgba(139,92,246,0.1)', color: '${v.COLOR}', padding: '6px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 700 }}>Simple Pricing</span>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', margin: '16px 0 12px', letterSpacing: '-1.5px' }}>Plans for every team</h1>
        <p style={{ color: '#64748b', fontSize: '18px' }}>Start free, scale as you grow with ${v.PRODUCT}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
        {plans.map((p, i) => (
          <div key={i} style={{ background: p.highlight ? '${v.COLOR}' : '#fff', color: p.highlight ? '#fff' : '#0f172a', borderRadius: '20px', padding: '36px', border: p.highlight ? 'none' : '1px solid #e2e8f0', boxShadow: p.highlight ? '0 20px 60px rgba(139,92,246,0.35)' : 'none', transform: p.highlight ? 'scale(1.05)' : 'none' }}>
            {p.highlight && <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>⭐ POPULAR</div>}
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{p.name}</div>
            <div style={{ fontSize: '36px', fontWeight: 900, marginBottom: '24px' }}>{p.price}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {p.features.map((f, j) => <div key={j} style={{ fontSize: '14px', opacity: f === '—' ? 0.35 : 1 }}>{f !== '—' ? '✓ ' : ''}{f}</div>)}
            </div>
            <button style={{ width: '100%', padding: '14px', background: p.highlight ? '#fff' : '${v.COLOR}', color: p.highlight ? '${v.COLOR}' : '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'login',
        label: 'Login / Auth Page',
        labelFr: 'Page de Connexion',
        icon: '🔐',
        vars: [
            { key: 'APPNAME', label: 'App Name', labelFr: "Nom de l'app", placeholder: 'Nexus' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#6366f1', type: 'color' },
        ],
        code: (v) => `const App = () => (
  <div style={{ fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ display: 'flex', boxShadow: '0 25px 80px rgba(0,0,0,0.12)', borderRadius: '24px', overflow: 'hidden', maxWidth: '860px', width: '100%' }}>
      <div style={{ flex: 1, background: '${v.COLOR}', color: '#fff', padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '24px' }}>✦</div>
        <h2 style={{ margin: '0 0 16px', fontSize: '34px', fontWeight: 900, letterSpacing: '-1px' }}>Welcome to ${v.APPNAME}</h2>
        <p style={{ opacity: 0.8, fontSize: '16px', lineHeight: 1.7, margin: 0 }}>The platform that empowers your team to build, ship, and scale — all in one place.</p>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['🔒 Enterprise-grade security', '⚡ 99.9% uptime SLA', '🌍 Used by 50k+ teams'].map((f,i) => <div key={i} style={{ fontSize: '14px', opacity: 0.9 }}>{f}</div>)}
        </div>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>Sign in</h3>
        <p style={{ margin: '0 0 32px', color: '#64748b' }}>New here? <a href="#" style={{ color: '${v.COLOR}', fontWeight: 700 }}>Create an account</a></p>
        {[{label:'Email', ph:'you@example.com', type:'email'},{label:'Password', ph:'••••••••', type:'password'}].map((f,i) => (
          <div key={i} style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>{f.label}</label>
            <input type={f.type} placeholder={f.ph} style={{ width: '100%', boxSizing:'border-box', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', color: '#0f172a' }} />
          </div>
        ))}
        <div style={{ textAlign: 'right', marginBottom: '24px' }}><a href="#" style={{ fontSize: '13px', color: '${v.COLOR}', fontWeight: 600 }}>Forgot password?</a></div>
        <button style={{ width: '100%', padding: '14px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>Sign In →</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Google', 'GitHub', 'Apple'].map(p => <button key={p} style={{ flex: 1, padding: '11px', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>{p}</button>)}
        </div>
      </div>
    </div>
  </div>
);`,
    },
    {
        id: 'realestate',
        label: 'Real Estate Listing',
        labelFr: 'Annonce Immobilière',
        icon: '🏠',
        vars: [
            { key: 'AGENCY', label: 'Agency Name', labelFr: "Nom de l'agence", placeholder: 'Prestige Realty' },
            { key: 'CITY', label: 'City', labelFr: 'Ville', placeholder: 'Paris' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#2563eb', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const listings = [
    { title: 'Luxury Penthouse', price: '$2,400,000', beds: 4, baths: 3, sqft: '3,200', emoji: '🏙️', tag: 'Featured' },
    { title: 'Modern Villa', price: '$890,000', beds: 5, baths: 4, sqft: '4,100', emoji: '🏡', tag: 'New' },
    { title: 'Downtown Loft', price: '$540,000', beds: 2, baths: 2, sqft: '1,800', emoji: '🏢', tag: '' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#f8fafc', minHeight: '100vh' }}>
      <nav style={{ background: '#fff', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 0 #e2e8f0' }}>
        <span style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}' }}>${v.AGENCY}</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Buy', 'Rent', 'Sell', 'Agents'].map(i => <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>{i}</a>)}
        </div>
        <button style={{ padding: '10px 22px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Contact Us</button>
      </nav>
      <div style={{ background: '${v.COLOR}', padding: '64px 48px', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-1.5px' }}>Find Your Dream Home in ${v.CITY}</h1>
        <div style={{ display: 'flex', gap: '0', maxWidth: '600px', margin: '28px auto 0', background: '#fff', borderRadius: '14px', overflow: 'hidden' }}>
          <input placeholder="🔍  Search by location, property type..." style={{ flex: 1, padding: '16px 20px', border: 'none', fontSize: '15px', outline: 'none', color: '#0f172a' }} />
          <button style={{ padding: '16px 28px', background: '${v.COLOR}', color: '#fff', border: 'none', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>Search</button>
        </div>
      </div>
      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
        {listings.map((l, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
            <div style={{ background: '#f1f5f9', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px', position: 'relative' }}>
              {l.emoji}
              {l.tag && <span style={{ position: 'absolute', top: '14px', left: '14px', padding: '5px 12px', background: '${v.COLOR}', color: '#fff', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>{l.tag}</span>}
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}', marginBottom: '4px' }}>{l.price}</div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', marginBottom: '12px' }}>{l.title}</div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                <span>🛏 {l.beds} beds</span><span>🚿 {l.baths} baths</span><span>📐 {l.sqft} ft²</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'education',
        label: 'Online Course Platform',
        labelFr: 'Plateforme de Cours',
        icon: '🎓',
        vars: [
            { key: 'PLATFORM', label: 'Platform Name', labelFr: 'Nom plateforme', placeholder: 'LearnLab' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#10b981', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const courses = [
    { title: 'Full-Stack Web Development', level: 'Beginner', lessons: 48, rating: '4.9', emoji: '💻', students: '12.4k' },
    { title: 'Data Science with Python', level: 'Intermediate', lessons: 62, rating: '4.8', emoji: '📊', students: '8.7k' },
    { title: 'UX/UI Design Masterclass', level: 'All Levels', lessons: 36, rating: '4.9', emoji: '🎨', students: '15.2k' },
    { title: 'Machine Learning A–Z', level: 'Advanced', lessons: 80, rating: '4.7', emoji: '🤖', students: '6.1k' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <span style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}' }}>${v.PLATFORM} 🎓</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Courses', 'Paths', 'Community', 'Pricing'].map(i => <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>{i}</a>)}
        </div>
        <button style={{ padding: '10px 22px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Start Learning</button>
      </nav>
      <div style={{ textAlign: 'center', padding: '72px 24px 48px', background: 'linear-gradient(to bottom, rgba(16,185,129,0.06), #fff)' }}>
        <h1 style={{ fontSize: '50px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-2px' }}>Learn skills that<br /><span style={{ color: '${v.COLOR}' }}>get you hired</span></h1>
        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '32px' }}>Join 500,000+ learners on ${v.PLATFORM}</p>
        <div style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto', background: '#f8fafc', borderRadius: '14px', border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
          <input placeholder="🔍  Search for courses..." style={{ flex: 1, padding: '14px 18px', border: 'none', background: 'transparent', fontSize: '15px', outline: 'none', color: '#0f172a' }} />
          <button style={{ padding: '14px 24px', background: '${v.COLOR}', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Search</button>
        </div>
      </div>
      <div style={{ padding: '0 48px 64px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {courses.map((c, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px' }}>{c.emoji}</div>
            <div style={{ padding: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '${v.COLOR}', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.level}</span>
              <h3 style={{ margin: '6px 0 10px', fontSize: '15px', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{c.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                <span>📚 {c.lessons} lessons</span><span>⭐ {c.rating}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>👥 {c.students} students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`,
    },
    {
        id: 'healthcare',
        label: 'Healthcare / Clinic',
        labelFr: 'Clinique Médicale',
        icon: '🏥',
        vars: [
            { key: 'CLINIC', label: 'Clinic Name', labelFr: 'Nom clinique', placeholder: 'MediCare Plus' },
            { key: 'DOCTOR', label: 'Lead Doctor', labelFr: 'Médecin principal', placeholder: 'Dr. Sarah Johnson' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#0891b2', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const services = [
    { icon: '🩺', title: 'General Medicine', desc: 'Comprehensive primary care for all ages' },
    { icon: '🦷', title: 'Dental Care', desc: 'Full dental services & cosmetic dentistry' },
    { icon: '🧠', title: 'Mental Health', desc: 'Licensed therapists & counseling services' },
    { icon: '🫀', title: 'Cardiology', desc: 'Advanced heart care diagnostics & treatment' },
    { icon: '👶', title: 'Pediatrics', desc: 'Expert child healthcare from birth to 18' },
    { icon: '🔬', title: 'Lab Services', desc: 'On-site lab with fast digital results' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 0 #e2e8f0' }}>
        <span style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}' }}>🏥 ${v.CLINIC}</span>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Services', 'Doctors', 'Patients', 'Contact'].map(i => <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>{i}</a>)}
        </div>
        <button style={{ padding: '10px 22px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Book Appointment</button>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '64px', padding: '72px 80px', background: 'linear-gradient(135deg, rgba(8,145,178,0.05) 0%, #fff 100%)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(8,145,178,0.1)', color: '${v.COLOR}', padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>✅ Accepting New Patients</div>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: '#0f172a', margin: '0 0 18px', letterSpacing: '-2px', lineHeight: 1.1 }}>Your Health,<br />Our Priority</h1>
          <p style={{ color: '#64748b', fontSize: '18px', lineHeight: 1.7, marginBottom: '32px' }}>Led by ${v.DOCTOR}, ${v.CLINIC} provides compassionate, world-class medical care for your entire family.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '14px 28px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>📅 Book Appointment</button>
            <button style={{ padding: '14px 28px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', color: '#374151', background: '#fff' }}>📞 Call Us Now</button>
          </div>
        </div>
        <div style={{ fontSize: '120px' }}>🏥</div>
      </div>
      <div style={{ padding: '64px 80px', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 36px' }}>Our Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', marginBottom: '6px' }}>{s.title}</div>
              <div style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
    },
    {
        id: 'agency',
        label: 'Creative Agency',
        labelFr: 'Agence Créative',
        icon: '🎯',
        vars: [
            { key: 'AGENCY', label: 'Agency Name', labelFr: "Nom de l'agence", placeholder: 'Craft Studio' },
            { key: 'TAGLINE', label: 'Tagline', labelFr: 'Slogan', placeholder: 'We design the future' },
            { key: 'COLOR', label: 'Accent Color', labelFr: 'Couleur accent', placeholder: '#f59e0b', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const works = [
    { title: 'Brand Identity', client: 'TechCorp', emoji: '🎨', year: '2024' },
    { title: 'Web Platform', client: 'NovaSaaS', emoji: '💻', year: '2024' },
    { title: 'Mobile App', client: 'FoodieApp', emoji: '📱', year: '2025' },
    { title: 'Campaign', client: 'LuxBrand', emoji: '📣', year: '2025' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <nav style={{ padding: '24px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontWeight: 900, fontSize: '22px', color: '${v.COLOR}' }}>${v.AGENCY}</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Work', 'Services', 'About', 'Contact'].map(i => <a key={i} href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>{i}</a>)}
        </div>
        <button style={{ padding: '11px 24px', background: '${v.COLOR}', color: '#000', border: 'none', borderRadius: '99px', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>Let's Talk →</button>
      </nav>
      <section style={{ padding: '120px 64px 80px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '99px', fontSize: '13px', color: '${v.COLOR}', fontWeight: 700, marginBottom: '28px' }}>✦ Award-Winning Studio</div>
        <h1 style={{ fontSize: '80px', fontWeight: 900, margin: '0 0 28px', letterSpacing: '-3px', lineHeight: 0.95 }}>
          ${v.TAGLINE}
        </h1>
        <p style={{ color: '#64748b', fontSize: '20px', maxWidth: '520px', lineHeight: 1.7, marginBottom: '40px' }}>We partner with ambitious brands to craft experiences that resonate, convert, and last.</p>
        <div style={{ display: 'flex', gap: '48px', marginTop: '20px' }}>
          {[{n:'120+',l:'Projects Done'},{n:'8',l:'Years Experience'},{n:'95%',l:'Client Retention'}].map((s,i)=>(
            <div key={i}><div style={{ fontSize: '36px', fontWeight: 900, color: '${v.COLOR}' }}>{s.n}</div><div style={{ color: '#64748b', fontSize: '14px' }}>{s.l}</div></div>
          ))}
        </div>
      </section>
      <section style={{ padding: '0 64px 80px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>Selected Work</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {works.map((w, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', cursor: 'pointer' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{w.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{w.title}</div>
              <div style={{ color: '#64748b', fontSize: '13px' }}>{w.client} · {w.year}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};`,
    },
    {
        id: 'chat',
        label: 'Messaging App UI',
        labelFr: 'Interface Messagerie',
        icon: '💬',
        vars: [
            { key: 'APPNAME', label: 'App Name', labelFr: "Nom de l'app", placeholder: 'Pulse Chat' },
            { key: 'USER', label: 'Your Name', labelFr: 'Votre nom', placeholder: 'Alex' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#6366f1', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const contacts = [
    { name: 'Sarah M.', msg: 'Can we review the designs?', time: '2m', emoji: '👩', unread: 3 },
    { name: 'Dev Team', msg: 'Build passed ✅', time: '15m', emoji: '👥', unread: 0 },
    { name: 'Luke R.', msg: 'Thanks for the update!', time: '1h', emoji: '👨', unread: 0 },
    { name: 'Marketing', msg: 'Campaign goes live tomorrow', time: '3h', emoji: '📣', unread: 1 },
  ];
  const messages = [
    { from: 'Sarah M.', text: 'Hey! Can we review the dashboard designs today?', mine: false },
    { from: '${v.USER}', text: 'Of course! I have some updates ready. Give me 5 mins.', mine: true },
    { from: 'Sarah M.', text: 'Perfect, I\\'ll set up a call 👌', mine: false },
    { from: '${v.USER}', text: 'Sounds great, talk soon!', mine: true },
  ];
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui', background: '#f8fafc' }}>
      <aside style={{ width: '280px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 900, fontSize: '20px', color: '${v.COLOR}', marginBottom: '12px' }}>${v.APPNAME}</div>
          <input placeholder="🔍 Search..." style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', background: '#f8fafc' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {contacts.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px 16px', cursor: 'pointer', background: i === 0 ? 'rgba(99,102,241,0.06)' : '#fff', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '${v.COLOR}', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{c.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{c.name}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{c.time}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.msg}</div>
              </div>
              {c.unread > 0 && <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '${v.COLOR}', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.unread}</div>}
            </div>
          ))}
        </div>
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '${v.COLOR}', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👩</div>
          <div><div style={{ fontWeight: 700, color: '#0f172a' }}>Sarah M.</div><div style={{ fontSize: '12px', color: '#10b981' }}>● Online</div></div>
        </div>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '60%', padding: '12px 16px', borderRadius: m.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.mine ? '${v.COLOR}' : '#fff', color: m.mine ? '#fff' : '#0f172a', fontSize: '14px', lineHeight: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: m.mine ? 'none' : '1px solid #e2e8f0' }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '15px', outline: 'none', color: '#0f172a' }} />
          <button style={{ padding: '12px 20px', background: '${v.COLOR}', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>Send ↑</button>
        </div>
      </main>
    </div>
  );
};`,
    },
    {
        id: 'travel',
        label: 'Travel / Hotel Booking',
        labelFr: 'Voyage / Hôtel',
        icon: '✈️',
        vars: [
            { key: 'BRAND', label: 'Brand Name', labelFr: 'Nom marque', placeholder: 'Horizon Travel' },
            { key: 'DEST', label: 'Featured Destination', labelFr: 'Destination vedette', placeholder: 'Bali, Indonesia' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#0891b2', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const destinations = [
    { name: 'Bali', country: 'Indonesia', price: '$1,299', rating: '4.9', emoji: '🏝️' },
    { name: 'Paris', country: 'France', price: '$899', rating: '4.8', emoji: '🗼' },
    { name: 'Tokyo', country: 'Japan', price: '$1,599', rating: '5.0', emoji: '⛩️' },
    { name: 'Santorini', country: 'Greece', price: '$1,099', rating: '4.9', emoji: '🏛️' },
  ];
  return (
    <div style={{ fontFamily: 'system-ui', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '22px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 900, fontSize: '22px', color: '#fff' }}>✈️ ${v.BRAND}</span>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Flights', 'Hotels', 'Packages', 'Deals'].map(i => <a key={i} href="#" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>{i}</a>)}
        </div>
        <button style={{ padding: '10px 22px', background: '#fff', color: '${v.COLOR}', border: 'none', borderRadius: '99px', fontWeight: 800, cursor: 'pointer' }}>Sign In</button>
      </nav>
      <div style={{ background: '${v.COLOR}', padding: '150px 64px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>🌍 Discover the World</p>
          <h1 style={{ color: '#fff', fontSize: '60px', fontWeight: 900, margin: '0 0 40px', letterSpacing: '-2px', lineHeight: 1.05 }}>Your next adventure<br />starts in ${v.DEST}</h1>
          <div style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '16px', overflow: 'hidden', maxWidth: '700px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {['📍 Destination', '📅 Check In', '📅 Check Out', '👥 Guests'].map((f,i) => (
              <div key={i} style={{ flex:1, padding:'16px 18px', borderRight: i<3 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>{f}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{i===0?'Anywhere':i===3?'2 Adults':'Select date'}</div>
              </div>
            ))}
            <button style={{ padding: '0 28px', background: '${v.COLOR}', color: '#fff', border: 'none', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </div>
      <div style={{ padding: '56px 64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 28px' }}>✨ Popular Destinations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
          {destinations.map((d,i) => (
            <div key={i} style={{ border: '1px solid #f1f5f9', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: '160px', background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(8,145,178,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>{d.emoji}</div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>{d.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>{d.country}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '20px', color: '${v.COLOR}' }}>{d.price}</span>
                  <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 700 }}>⭐ {d.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
    },
    {
        id: 'finance',
        label: 'Finance / Banking App',
        labelFr: 'Application Bancaire',
        icon: '💰',
        vars: [
            { key: 'BANK', label: 'Bank Name', labelFr: 'Nom banque', placeholder: 'NeoBank' },
            { key: 'USER', label: 'User Name', labelFr: "Nom d'utilisateur", placeholder: 'Alex Johnson' },
            { key: 'COLOR', label: 'Brand Color', labelFr: 'Couleur', placeholder: '#7c3aed', type: 'color' },
        ],
        code: (v) => `const App = () => {
  const txns = [
    { icon: '🛒', name: 'Whole Foods Market', amount: '-$84.50', date: 'Today', cat: 'Groceries' },
    { icon: '🎵', name: 'Spotify Premium', amount: '-$9.99', date: 'Yesterday', cat: 'Entertainment' },
    { icon: '💼', name: 'Salary Deposit', amount: '+$5,200.00', date: 'Mar 28', cat: 'Income' },
    { icon: '☕', name: 'Blue Bottle Coffee', amount: '-$6.20', date: 'Mar 27', cat: 'Food' },
    { icon: '🏋️', name: 'Equinox Gym', amount: '-$89.00', date: 'Mar 25', cat: 'Health' },
  ];
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui', background: '#f8fafc' }}>
      <aside style={{ width: '240px', background: '#0f172a', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontWeight: 900, fontSize: '20px', color: '${v.COLOR}', padding: '8px 12px', marginBottom: '20px' }}>${v.BANK}</div>
        {['🏠  Overview','💳  Cards','📤  Transfer','📊  Analytics','⚙️  Settings'].map((item,i)=>(
          <div key={i} style={{ padding:'11px 14px', borderRadius:'10px', color:i===0?'#fff':'#64748b', background:i===0?'${v.COLOR}':'transparent', fontWeight:i===0?700:500, cursor:'pointer', fontSize:'14px' }}>{item}</div>
        ))}
      </aside>
      <main style={{ flex:1, padding:'36px', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
          <div>
            <h1 style={{ margin:'0 0 4px', fontSize:'22px', fontWeight:800, color:'#0f172a' }}>Good morning, ${v.USER} 👋</h1>
            <p style={{ margin:0, color:'#64748b', fontSize:'14px' }}>Here's your financial overview</p>
          </div>
          <button style={{ padding:'10px 20px', background:'${v.COLOR}', color:'#fff', border:'none', borderRadius:'10px', fontWeight:700, cursor:'pointer' }}>+ New Payment</button>
        </div>
        <div style={{ background:'linear-gradient(135deg, ${v.COLOR}, #4f46e5)', borderRadius:'20px', padding:'32px', color:'#fff', marginBottom:'24px' }}>
          <div style={{ fontSize:'13px', opacity:0.8, marginBottom:'8px', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase' }}>Total Balance</div>
          <div style={{ fontSize:'48px', fontWeight:900, letterSpacing:'-2px', marginBottom:'24px' }}>$24,831.50</div>
          <div style={{ display:'flex', gap:'16px' }}>
            {['💸 Send','📥 Receive','🔄 Transfer','➕ Top Up'].map((a,i)=>(
              <button key={i} style={{ flex:1, padding:'11px 0', background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'12px', fontWeight:700, cursor:'pointer', fontSize:'13px' }}>{a}</button>
            ))}
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'24px' }}>
          {[{label:'Monthly Income',val:'$5,200',ch:'+12%',up:true},{label:'Monthly Expenses',val:'$2,847',ch:'+3%',up:false},{label:'Savings',val:'$2,353',ch:'+28%',up:true}].map((c,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:'16px', padding:'20px', border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:'13px', color:'#64748b', fontWeight:600, marginBottom:'8px' }}>{c.label}</div>
              <div style={{ fontSize:'26px', fontWeight:900, color:'#0f172a', marginBottom:'4px' }}>{c.val}</div>
              <div style={{ fontSize:'13px', color:c.up?'#10b981':'#ef4444', fontWeight:700 }}>{c.ch} vs last month</div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:'16px', border:'1px solid #e2e8f0', padding:'20px' }}>
          <h3 style={{ margin:'0 0 16px', fontSize:'16px', fontWeight:800, color:'#0f172a' }}>Recent Transactions</h3>
          {txns.map((t,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'12px 0', borderBottom:i<txns.length-1?'1px solid #f8fafc':'none' }}>
              <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:'14px', color:'#0f172a' }}>{t.name}</div>
                <div style={{ fontSize:'12px', color:'#94a3b8' }}>{t.cat} · {t.date}</div>
              </div>
              <div style={{ fontWeight:800, fontSize:'15px', color:t.amount.startsWith('+')?'#10b981':'#0f172a' }}>{t.amount}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};`,
    },
];

const SmartTemplates = ({ onInsert }) => {
    const isFr = document.documentElement.lang === 'fr';
    const [selected, setSelected] = useState(null);
    const [values, setValues] = useState({});
    const [open, setOpen] = useState(null);

    const handleSelect = (tpl) => {
        setSelected(tpl);
        const defaults = {};
        tpl.vars.forEach(v => { defaults[v.key] = v.placeholder; });
        setValues(defaults);
        setOpen(tpl.id);
    };

    const handleInsert = () => {
        if (!selected) return;
        const code = selected.code(values);
        onInsert(JSON.stringify({ name: selected.label, snippet: code, logic: '' }));
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px dashed rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: 'var(--primary)', textAlign: 'center', fontWeight: 600 }}>
                <FileCode size={14} style={{ display: 'inline', marginRight: '6px' }} />
                {isFr ? 'Personnalisez & insérez en 1 clic' : 'Customize & insert in 1 click'}
            </div>

            {SMART_TEMPLATES.map(tpl => (
                <div key={tpl.id} style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', overflow: 'hidden' }}>
                    <button
                        onClick={() => setOpen(open === tpl.id ? null : tpl.id)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: open === tpl.id ? 'rgba(99,102,241,0.08)' : 'var(--glass-bg)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '13px' }}>
                            <span>{tpl.icon}</span>
                            {isFr ? tpl.labelFr : tpl.label}
                        </span>
                        <ChevronDown size={14} style={{ transform: open === tpl.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-muted)' }} />
                    </button>

                    {open === tpl.id && (
                        <div style={{ padding: '14px', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {tpl.vars.map(v => (
                                <div key={v.key}>
                                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        {isFr ? v.labelFr : v.label}
                                    </label>
                                    {v.type === 'color' ? (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input type="color" value={values[v.key] || v.placeholder} onChange={e => setValues({ ...values, [v.key]: e.target.value })} style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: 0 }} />
                                            <input value={values[v.key] || ''} onChange={e => setValues({ ...values, [v.key]: e.target.value })} style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }} />
                                        </div>
                                    ) : (
                                        <input
                                            value={values[v.key] || ''}
                                            onChange={e => setValues({ ...values, [v.key]: e.target.value })}
                                            placeholder={v.placeholder}
                                            style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => handleSelect(tpl) || handleInsert()}
                                style={{ padding: '11px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}
                            >
                                <Play size={14} />
                                {isFr ? 'Insérer ce template' : 'Insert Template'}
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SmartTemplates;
