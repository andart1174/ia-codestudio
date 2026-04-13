import React, { useEffect } from 'react';

const StripeModal = ({ actionName, cost, onConfirm, onClose, isFr, isSub = false }) => {
    
    // Auto-bypass if they already have premium (safety net)
    useEffect(() => {
        // 1. Check legacy timestamp
        const subDate = localStorage.getItem('ia_premium_sub_date');
        if (subDate) {
            const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
            if (daysPassed < 30) {
                onConfirm(); // Instant bypass
                return;
            } else {
                localStorage.removeItem('ia_premium_sub_date');
            }
        }

        // 2. Check Database list
        try {
            const session = JSON.parse(localStorage.getItem('genius_session') || '{}');
            const premiumUsers = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
            if (session.email && premiumUsers.includes(session.email)) {
                onConfirm(); // Instant bypass
                return;
            }
        } catch(e) {}
    }, [onConfirm]);

    const handleSubClick = () => {
        window.open('https://buy.stripe.com/bJecN6bfUfbbaax36qbfO02', '_blank');
        onClose();
    };

    const handleSingleClick = () => {
        window.open('https://buy.stripe.com/cNi5kE97Mfbb6Yl4aubfO01', '_blank');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999999,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20
        }}>
            <div style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.95))',
                borderRadius: 20,
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.2)',
                maxWidth: 550, width: '100%',
                padding: '30px 40px',
                textAlign: 'center',
                fontFamily: '"Inter", sans-serif'
            }}>
                <div style={{
                    width: 60, height: 60, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                    <span style={{ fontSize: 30 }}>💳</span>
                </div>
                
                <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                    {isFr ? 'Action Premium' : 'Premium Action'}
                </h2>
                
                <p style={{ margin: '0 0 20px', fontSize: 16, color: '#94a3b8', lineHeight: 1.5 }}>
                    {isFr 
                        ? `Pour procéder à l'action [ ${actionName} ], une petite participation est requise.` 
                        : `To proceed with [ ${actionName} ], a small contribution is required.`}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: isSub ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                    
                    {!isSub && (
                        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 15, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 800, marginBottom: 8 }}>
                                {isFr ? 'Action Unique' : 'Single Action'}
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: '#10b981', marginBottom: 15 }}>
                                {cost || '$2.00'}
                            </div>
                            <button onClick={handleSingleClick} style={{
                                background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', border: 'none', padding: '12px 20px',
                                borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)', width: '100%', transition: 'all 0.2s'
                            }} onMouseOver={e => e.currentTarget.style.filter='brightness(1.1)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1)'}>
                                {isFr ? 'Payer 2$ ➔' : 'Pay $2 ➔'}
                            </button>
                        </div>
                    )}

                    <div style={{ background: 'rgba(245,158,11,0.05)', borderRadius: 12, padding: 15, border: '1px solid rgba(245,158,11,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: 12, color: '#fbbf24', textTransform: 'uppercase', fontWeight: 800, marginBottom: 8 }}>
                            {isFr ? 'Abonnement (1 Mois)' : 'Subscription (1 Mo)'}
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b', marginBottom: 15 }}>
                            $30<span style={{fontSize: 14, color: '#94a3b8'}}>/mo</span>
                        </div>
                        <button onClick={handleSubClick} style={{
                            background: 'linear-gradient(135deg, #f59e0b, #d946ef)', color: 'white', border: 'none', padding: '12px 20px',
                            borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.4)', width: '100%', transition: 'all 0.2s'
                        }} onMouseOver={e => e.currentTarget.style.transform='scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
                            {isFr ? 'Devenir Premium 💎' : 'Become Premium 💎'}
                        </button>
                    </div>

                </div>

                <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
                    <button onClick={onClose} style={{
                        background: 'transparent', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.3)', 
                        padding: '12px 20px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                    }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f8fafc'; }} 
                       onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                        {isFr ? 'Annuler' : 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StripeModal;
