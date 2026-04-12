import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, BarChart3, Zap } from 'lucide-react';

// --- SEO checks ---
const runSEO = (code) => {
    const checks = [
        { id: 'h1', label: 'Has <h1> tag', labelFr: 'Balise <h1> présente', pass: /<h1[\s>]/i.test(code), fix: 'Add an <h1> tag as your main page title.' },
        { id: 'title', label: 'Has <title> tag', labelFr: 'Balise <title> présente', pass: /<title[\s>]/i.test(code), fix: 'Add a <title> in your HTML head.' },
        { id: 'altImg', label: 'Images have alt text', labelFr: 'Images avec alt text', pass: !/<img(?![^>]*\balt=)[^>]*>/i.test(code), fix: 'Add alt="" attribute to all <img> tags.' },
        { id: 'semantic', label: 'Uses semantic tags', labelFr: 'Tags sémantiques utilisés', pass: /<(nav|main|section|article|header|footer|aside)[\s>]/i.test(code), fix: 'Use semantic HTML5 tags: <nav>, <main>, <section>, <article>.' },
        { id: 'links', label: 'Links have href', labelFr: 'Liens ont un href', pass: !/<a(?![^>]*\bhref=)[^>]*>/i.test(code), fix: 'Ensure all <a> tags have an href attribute.' },
        { id: 'lang', label: 'Language attribute', labelFr: 'Attribut lang défini', pass: /lang=/i.test(code), fix: 'Add lang="en" to your <html> tag.' },
        { id: 'viewport', label: 'Viewport meta tag', labelFr: 'Meta viewport présente', pass: /viewport/i.test(code), fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.' },
    ];
    const score = Math.round((checks.filter(c => c.pass).length / checks.length) * 100);
    return { checks, score };
};

// --- Accessibility checks ---
const runA11y = (code) => {
    const checks = [
        { id: 'alt', label: 'Image alt attributes', labelFr: 'Alt sur les images', pass: !/<img(?![^>]*\balt=)[^>]*>/i.test(code), fix: 'Add alt text to all images for screen readers.' },
        { id: 'aria', label: 'ARIA labels used', labelFr: 'ARIA labels présents', pass: /aria-label/i.test(code), fix: 'Add aria-label to interactive elements.' },
        { id: 'btnText', label: 'Buttons have text', labelFr: 'Boutons ont du texte', pass: !/<button[^>]*>\s*<\/button>/i.test(code), fix: 'All buttons should have visible text or aria-label.' },
        { id: 'formLabel', label: 'Inputs have labels', labelFr: 'Inputs ont des labels', pass: !/<input(?![^>]*\baria-label=)(?![^>]*\bid=)[^>]*>/i.test(code) || /<label/i.test(code), fix: 'Associate <label> with each <input> field.' },
        { id: 'contrast', label: 'Color contrast mentioned', labelFr: 'Contraste de couleur', pass: /color:|background/i.test(code), fix: 'Ensure WCAG 2.1 AA contrast ratio (4.5:1) for text.' },
        { id: 'focus', label: 'Focus styles present', labelFr: 'Styles focus présents', pass: /focus|outline/i.test(code), fix: 'Ensure focusable elements have visible focus styles.' },
        { id: 'heading', label: 'Heading hierarchy', labelFr: 'Hiérarchie des titres', pass: /<h[1-6][\s>]/i.test(code), fix: 'Use proper heading hierarchy h1 → h2 → h3.' },
    ];
    const score = Math.round((checks.filter(c => c.pass).length / checks.length) * 100);
    return { checks, score };
};

// --- Performance checks ---
const runPerf = (code) => {
    const inlineStyleCount = (code.match(/style=\{\{/g) || []).length;
    const componentCount = (code.match(/const [A-Z]/g) || []).length;
    const anonHandlers = (code.match(/onClick=\{(?:e =>|\(\) =>|\()/g) || []).length;
    const imgCount = (code.match(/<img/g) || []).length;
    const lazyImg = (code.match(/loading="lazy"/g) || []).length;

    const hints = [
        { label: 'Inline styles', labelFr: 'Styles inline', value: inlineStyleCount, status: inlineStyleCount > 10 ? 'warn' : 'ok', hint: `${inlineStyleCount} inline style blocks. Consider CSS classes for better performance.` },
        { label: 'Components defined', labelFr: 'Composants définis', value: componentCount, status: 'ok', hint: `${componentCount} component(s) detected. Good modular structure.` },
        { label: 'Event handlers', labelFr: 'Gestionnaires d\'événements', value: anonHandlers, status: anonHandlers > 8 ? 'warn' : 'ok', hint: `${anonHandlers} inline handlers. Consider useCallback for heavy renders.` },
        { label: 'Images lazy loading', labelFr: 'Chargement lazy images', value: lazyImg, status: imgCount > 0 && lazyImg === 0 ? 'warn' : 'ok', hint: imgCount > 0 ? `${imgCount} image(s), ${lazyImg} lazy loaded. Add loading="lazy" to images.` : 'No images detected.' },
        { label: 'Code lines', labelFr: 'Lignes de code', value: code.split('\n').length, status: code.split('\n').length > 200 ? 'warn' : 'ok', hint: `${code.split('\n').length} lines. Consider splitting into smaller components if > 200.` },
    ];
    const score = Math.round((hints.filter(h => h.status === 'ok').length / hints.length) * 100);
    return { hints, score };
};

const ScoreBadge = ({ score }) => {
    const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', color }}>
                {score}
            </div>
            <div style={{ height: '6px', flex: 1, background: 'var(--glass-border)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width 0.5s' }} />
            </div>
        </div>
    );
};

const CheckRow = ({ check, isFr }) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{check.pass ? '✅' : '⚠️'}</span>
        <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{isFr ? (check.labelFr || check.label) : check.label}</div>
            {!check.pass && <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '2px' }}>{check.fix}</div>}
        </div>
    </div>
);

const TABS = [
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'a11y', label: 'A11y', icon: ShieldCheck },
    { id: 'perf', label: 'Perf', icon: Zap },
];

const CodeInspector = ({ code }) => {
    const [tab, setTab] = useState('seo');
    const isFr = document.documentElement.lang === 'fr';
    const seo = runSEO(code);
    const a11y = runA11y(code);
    const perf = runPerf(code);

    const current = tab === 'seo' ? seo : tab === 'a11y' ? a11y : perf;

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Tab buttons */}
            <div style={{ display: 'flex', gap: '6px', background: 'var(--glass-bg)', padding: '4px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                {TABS.map(t => {
                    const Icon = t.icon;
                    return (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '8px 6px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: tab === t.id ? 'var(--primary)' : 'transparent', color: tab === t.id ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s' }}>
                            <Icon size={12} /> {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Score */}
            <ScoreBadge score={current.score} />

            {/* Results */}
            {tab === 'perf' ? (
                <div>
                    {perf.hints.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '14px', flexShrink: 0 }}>{h.status === 'ok' ? '✅' : '⚡'}</span>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{isFr ? h.labelFr : h.label}: <span style={{ color: 'var(--primary)' }}>{h.value}</span></div>
                                <div style={{ fontSize: '11px', color: h.status === 'warn' ? '#f59e0b' : 'var(--text-muted)', marginTop: '2px' }}>{h.hint}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {(tab === 'seo' ? seo.checks : a11y.checks).map((c, i) => (
                        <CheckRow key={i} check={c} isFr={isFr} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CodeInspector;
