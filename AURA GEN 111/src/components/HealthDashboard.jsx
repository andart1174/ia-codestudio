import React, { useMemo } from 'react';
import { 
    Activity, ShieldCheck, Zap, Monitor, 
    Globe, Smartphone, CheckCircle, AlertTriangle, 
    XCircle, Info, Wand2, Search, Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, label, color }) => {
    const radius = 30;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;

    return (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '70px', height: '70px', marginBottom: '8px' }}>
                <svg width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="35" cy="35" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <circle 
                        cx="35" cy="35" r={radius} 
                        fill="transparent" 
                        stroke={color} 
                        strokeWidth="6" 
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px', color: '#fff' }}>
                    {score}
                </div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        </div>
    );
};

const HealthDashboard = ({ audit, onAutoFix, currentCode, isFr }) => {
    const { score, issues } = audit;

    // Derived scores for categories
    const categories = useMemo(() => {
        const a11y = issues.filter(i => i.type === 'ACCESSIBILITY');
        const seo = issues.filter(i => i.type === 'SEO');
        const best = issues.filter(i => i.type === 'BEST_PRACTICE' || i.type === 'SYNTAX' || i.type === 'SECURITY');

        return [
            { id: 'a11y', label: isFr ? 'ACCESSIBILITÉ' : 'ACCESSIBILITY', score: Math.max(0, 100 - a11y.length * 15), issues: a11y, color: '#10b981' },
            { id: 'seo', label: 'SEO', score: Math.max(0, 100 - seo.length * 20), issues: seo, color: '#6366f1' },
            { id: 'perf', label: 'PERFORMANCE', score: score < 50 ? 60 : 98, issues: best, color: '#ef4444' }
        ];
    }, [issues, score, isFr]);

    return (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: 'rgba(99,102,241,0.15)', borderRadius: '10px', color: '#818cf8' }}>
                        <Activity size={20} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#fff' }}>
                            {isFr ? 'Rapport de Santé Aura' : 'Aura Health Report'}
                        </h3>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                            {isFr ? 'Analyse professionnelle du projet' : 'Professional project analysis'}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onAutoFix}
                    disabled={issues.length === 0}
                    style={{
                        padding: '8px 16px', borderRadius: '8px', border: 'none',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#fff', fontWeight: '700', fontSize: '12px',
                        cursor: issues.length > 0 ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        opacity: issues.length > 0 ? 1 : 0.5, transition: 'all 0.2s'
                    }}
                >
                    <Wand2 size={14} />
                    {isFr ? 'Auto-Correction' : 'Auto-Fix All'}
                </button>
            </div>

            {/* Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {categories.map(cat => (
                    <ScoreGauge key={cat.id} score={cat.score} label={cat.label} color={cat.color} />
                ))}
            </div>

            {/* SEO Preview Tool */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Search size={14} color="#6366f1" />
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#e2e8f0' }}>
                        {isFr ? 'APERÇU GOOGLE (SEO)' : 'GOOGLE PREVIEW (SEO)'}
                    </span>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', color: '#1a0dab', fontFamily: 'arial, sans-serif' }}>
                    <div style={{ fontSize: '18px', fontWeight: '400', marginBottom: '4px', cursor: 'pointer' }}>
                        {isFr ? 'Accueil | Mon App AuraGen Pro' : 'Home | My AuraGen Pro App'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#006621', marginBottom: '4px' }}>
                        https://auragen.app/votre-projet
                    </div>
                    <div style={{ fontSize: '13px', color: '#545454', lineHeight: '1.4' }}>
                        {isFr 
                            ? 'Découvrez une application web performante et accessible générée avec l\'IA. Design premium et animations 3D incluses avec AuraGen.' 
                            : 'Discover a powerful and accessible web application generated with AI. Premium design and 3D animations included via AuraGen.'}
                    </div>
                </div>
            </div>

            {/* Issues List */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <AlertTriangle size={14} color="#f59e0b" />
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#e2e8f0' }}>
                        {isFr ? 'RÉSULTATS DE L\'AUDIT' : 'AUDIT FINDINGS'}
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {issues.length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', border: '1px dashed rgba(16,185,129,0.3)', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.05)' }}>
                            <CheckCircle size={24} color="#10b981" style={{ margin: '0 auto 8px' }} />
                            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
                                {isFr ? 'Aucun problème détecté. Votre code est parfait !' : 'No issues found. Your code is perfect!'}
                            </div>
                        </div>
                    ) : (
                        issues.map((issue, idx) => (
                            <div key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px' }}>
                                <div style={{ color: issue.severity === 'CRITICAL' ? '#ef4444' : issue.severity === 'HIGH' ? '#f59e0b' : '#38bdf8', padding: '4px' }}>
                                    {issue.severity === 'CRITICAL' ? <XCircle size={14} /> : <Info size={14} />}
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#f1f5f9' }}>{issue.message}</div>
                                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                                        {issue.code}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthDashboard;
