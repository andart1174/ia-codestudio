import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, X, Layout, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplainPanel = ({ code, onClose }) => {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const concepts = [
        {
            key: 'flex',
            icon: <Layout size={14} />,
            title: isFr ? 'Maîtriser Flexbox' : 'Mastering Flexbox',
            desc: isFr 
                ? 'Le standard moderne pour aligner des éléments. C\'est comme un élastique intelligent.' 
                : 'The modern standard for aligning elements. Think of it like a smart rubber band.',
            challenge: isFr
                ? 'Remplacez justify-content: "center" par "space-between" pour voir l\'écartement.'
                : 'Try changing justify-content: "center" to "space-between" to see the gap.',
            match: /display:\s*['"]flex['"]/i
        },
        {
            key: 'grid',
            icon: <Layout size={14} />,
            title: isFr ? 'Puissance des Grilles' : 'Grid Power',
            desc: isFr 
                ? 'Idéal pour les structures en 2D (lignes et colonnes simultanées).' 
                : 'Perfect for 2D structures (rows and columns simultaneously).',
            challenge: isFr
                ? 'Changez repeat(3, 1fr) en repeat(2, 1fr) pour réduire les colonnes.'
                : 'Change repeat(3, 1fr) to repeat(2, 1fr) to reduce the columns.',
            match: /display:\s*['"]grid['"]/i
        },
        {
            key: 'useState',
            icon: <Cpu size={14} />,
            title: isFr ? 'La Mémoire (useState)' : 'Memory (useState)',
            desc: isFr 
                ? 'C\'est ainsi que React se souvient des clics ou du texte saisi.' 
                : 'This is how React remembers clicks or typed text.',
            challenge: isFr
                ? 'Cherchez le bouton et voyez comment il met à jour la variable.'
                : 'Find the button and see how it updates the variable.',
            match: /useState/
        },
        {
            key: 'map',
            icon: <BookOpen size={14} />,
            title: isFr ? 'Listes Dynamiques (map)' : 'Dynamic Lists (map)',
            desc: isFr 
                ? 'Transforme une liste de données en une liste d\'éléments visuels.' 
                : 'Transforms a data list into a visual list of elements.',
            challenge: isFr
                ? 'Ajoutez un élément au tableau initial pour le voir apparaître.'
                : 'Add an item to the initial array to see it appear instantly.',
            match: /\.map\(/
        }
    ];

    const detected = concepts.filter(c => c.match.test(code));

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="explain-panel"
        >
            <div className="explain-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} className="text-primary" />
                    <span style={{ fontWeight: 700, fontSize: '13px' }}>{t('explain')}</span>
                </div>
                <button onClick={onClose} className="pane-tool-btn">
                    <X size={14} />
                </button>
            </div>
            
            <div className="explain-body">
                {detected.length > 0 ? (
                    detected.map(c => (
                        <div key={c.key} className="concept-card">
                            <div className="concept-header">
                                <div className="concept-icon">{c.icon}</div>
                                <span className="concept-title">{c.title}</span>
                            </div>
                            <p className="concept-desc">{c.desc}</p>
                            {c.challenge && (
                                <div className="challenge-box">
                                    <div className="challenge-label">
                                        <Sparkles size={10} />
                                        <span>Try this!</span>
                                    </div>
                                    <p className="challenge-text">{c.challenge}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                        {isFr ? 'Aucun concept complexe détecté dans ce code.' : 'No complex concepts detected in this code.'}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default ExplainPanel;
