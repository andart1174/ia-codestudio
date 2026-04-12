import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Box, Layout, Code, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Walkthrough = ({ onComplete }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);

    const steps = [
        {
            icon: <Sparkles size={40} className="text-primary" />,
            title: t('tourStep1'),
            desc: t('tourStep1Desc'),
        },
        {
            icon: <Box size={40} className="text-primary" />,
            title: t('tourStep2'),
            desc: t('tourStep2Desc'),
        },
        {
            icon: <Eye size={40} className="text-primary" />,
            title: t('tourStep3'),
            desc: t('tourStep3Desc'),
        },
        {
            icon: <Code size={40} className="text-primary" />,
            title: t('tourStep4'),
            desc: t('tourStep4Desc'),
        }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        localStorage.setItem('aura_tour_done', 'true');
        onComplete();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    width: '90%',
                    maxWidth: '480px',
                    padding: '40px',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <button 
                    onClick={handleClose}
                    style={{
                        position: 'absolute', top: '20px', right: '20px',
                        background: 'transparent', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ 
                        width: '80px', height: '80px', borderRadius: '50%', 
                        background: 'var(--bg-main)', border: '1px solid var(--glass-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', color: 'var(--primary)'
                    }}>
                        {steps[step].icon}
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 12px' }}>
                        {step === 0 ? t('tourWelcome') : steps[step].title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                        {step === 0 ? t('tourWelcomeDesc') : steps[step].desc}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {steps.map((_, i) => (
                            <div key={i} style={{
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: i === step ? 'var(--primary)' : 'var(--glass-border)',
                                transition: 'all 0.3s'
                            }} />
                        ))}
                    </div>
                    <button 
                        onClick={nextStep}
                        className="primary-btn"
                        style={{ padding: '12px 24px', fontSize: '15px' }}
                    >
                        {step === steps.length - 1 ? t('tourGotIt') : t('tourNext')}
                        <ChevronRight size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Walkthrough;
