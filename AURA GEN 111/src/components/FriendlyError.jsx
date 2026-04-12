import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const FriendlyError = ({ issue, runtimeError, onClose }) => {
    const { t } = useTranslation();

    if (!issue && !runtimeError) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    border: '1px solid #fee2e2',
                    borderLeft: '4px solid #ef4444',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    width: '90%',
                    maxWidth: '400px',
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.15)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    zIndex: 100
                }}
            >
                <AlertCircle size={24} className="text-red-500" style={{ color: '#ef4444', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#991b1b' }}>
                        {t('syntaxErrorHeading') || 'Oops! We found a bug 🐛'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#b91c1c', lineHeight: '1.5' }}>
                        {t('syntaxErrorDesc') || 'Our Scanner detected an issue:'}
                        <br/>
                        <span style={{ fontWeight: 'bold', display: 'block', marginTop: '4px', padding: '4px', background: '#fee2e2', borderRadius: '4px' }}>
                            {issue ? issue.message : runtimeError}
                        </span>
                    </p>
                </div>
                <button 
                    onClick={onClose}
                    style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', outline: 'none' }}
                >
                    <XCircle size={18} />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default FriendlyError;
