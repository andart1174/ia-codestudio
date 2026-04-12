import React, { useState } from 'react';
import { Rocket, ExternalLink, Copy, Check, AlertCircle, Loader, Smartphone, Globe, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { downloadProjectZip } from '../utils/ExportEngine';
import StripeModal from './StripeModal';

const STEPS = {
    en: [
        '1. Click "Download ZIP" — your project is bundled for standard hosting.',
        '2. Sign in to netlify.com or vercel.com.',
        '3. Drag & drop the ZIP file into the deployment area.',
        '4. Your app is live! To install on phone, open the URL in Chrome/Safari and select "Add to Home Screen".',
    ],
    fr: [
        '1. Cliquez "Télécharger ZIP" — votre projet est prêt pentru hébergement standard.',
        '2. Connectez-vous sur netlify.com ou vercel.com.',
        '3. Glissez le fichier ZIP în zona de déploiement.',
        '4. Votre app est en ligne ! Pour l\'installer pe telefon, deschide URL în Chrome/Safari și alege "Add to Home Screen".',
    ],
};

const DeployPanel = ({ files }) => {
    const { t, i18n } = useTranslation();
    const [step, setStep] = useState('idle'); // idle | downloading | done
    const [enablePWA, setEnablePWA] = useState(true);
    const [copied, setCopied] = useState(false);
    const [stripeAction, setStripeAction] = useState(null);
    const isFr = i18n.language.startsWith('fr');
    const steps = isFr ? STEPS.fr : STEPS.en;

    const handleDownloadNetlifyOriginal = async () => {
        setStep('downloading');
        const mainFile = files.find(f => f.name === 'App.jsx') || { content: '' };
        await downloadProjectZip(mainFile.content, files, { 
            title: 'AuraGen App', 
            filename: 'auragen-netlify-deploy.zip',
            netlify: true 
        });
        setTimeout(() => setStep('done'), 1000);
    };

    const handleDownloadNetlify = () => {
        setStripeAction({ name: 'Deploy to Netlify', cost: '$2.00', action: handleDownloadNetlifyOriginal });
    };

    const handleCopyVercelUrl = () => {
        navigator.clipboard.writeText('https://app.netlify.com/drop');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header */}
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px dashed rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <Rocket size={20} style={{ display: 'inline', marginBottom: '6px', color: '#818cf8' }} />
                <div style={{ fontSize: '13px', color: '#818cf8', fontWeight: 700 }}>
                    {isFr ? 'Déploiement Professionnel' : 'Professional Deployment'}
                </div>
            </div>

            {/* PWA Toggle */}
            <div style={{ 
                padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Smartphone size={18} color="#10b981" />
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{isFr ? 'Mode App Mobile (PWA)' : 'Mobile App Mode (PWA)'}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{isFr ? 'Rend l\'app installable pe iPhone/Android' : 'Makes app installable on iPhone/Android'}</div>
                    </div>
                </div>
                <button 
                    onClick={() => setEnablePWA(!enablePWA)}
                    style={{
                        width: '36px', height: '18px', borderRadius: '20px', background: enablePWA ? '#10b981' : '#475569',
                        border: 'none', position: 'relative', cursor: 'pointer', transition: '0.3s'
                    }}
                >
                    <div style={{
                        width: '14px', height: '14px', borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: '2px', left: enablePWA ? '20px' : '2px', transition: '0.3s'
                    }} />
                </button>
            </div>

            {/* Step-by-step guide */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {steps.map((s, i) => (
                    <div key={i} style={{
                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                        padding: '10px 12px', borderRadius: '10px',
                        background: step === 'done' && i <= 2 ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--glass-border)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5',
                    }}>
                        <div style={{
                            minWidth: '22px', height: '22px', borderRadius: '50%',
                            background: step === 'done' && i <= 2 ? '#10b981' : 'var(--primary)',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 800, flexShrink: 0,
                        }}>
                            {step === 'done' && i <= 2 ? <Check size={12} /> : i + 1}
                        </div>
                        <span>{s}</span>
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            <button
                onClick={handleDownloadNetlify}
                disabled={step === 'downloading'}
                style={{
                    padding: '13px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                    border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
            >
                {step === 'downloading'
                    ? <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    : <Box size={15} />}
                {isFr ? 'Télécharger ZIP pour Netlify' : 'Download ZIP for Netlify'}
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={handleCopyVercelUrl}
                    style={{
                        flex: 1, padding: '10px', background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)', borderRadius: '8px',
                        color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    }}
                >
                    {copied ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                    {isFr ? 'Copier URL Netlify Drop' : 'Copy Netlify Drop URL'}
                </button>
                <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1, padding: '10px', background: '#25c2a0',
                        border: 'none', borderRadius: '8px',
                        color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        textDecoration: 'none',
                    }}
                >
                    <ExternalLink size={13} />
                    Netlify Drop
                </a>
            </div>
            
            {/* GitHub Info */}
            <div style={{ marginTop: '10px', padding: '12px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#fff', fontWeight: 600 }}>
                    <Globe size={14} /> GitHub Pages
                </div>
                {isFr 
                    ? 'Pentru GitHub: Creați un repo nou, urcați conținutul fișierului ZIP și activați "GitHub Pages" în setări.' 
                    : 'For GitHub: Create a new repo, upload the ZIP contents, and enable "GitHub Pages" in settings.'}
            </div>
            {stripeAction && (
                <StripeModal
                    isFr={isFr}
                    actionName={stripeAction.name}
                    cost={stripeAction.cost}
                    onConfirm={() => {
                        window.open("https://checkout.stripe.com/pay/test", "_blank");
                        if (stripeAction.action) stripeAction.action();
                        setStripeAction(null);
                    }}
                    onClose={() => setStripeAction(null)}
                />
            )}
        </div>
    );
};

export default DeployPanel;
