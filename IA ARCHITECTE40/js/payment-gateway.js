/* Payment Gateway Interceptor */

(function() {
    // Inject Styles for Modal
    const style = document.createElement('style');
    style.textContent = `
        .stripe-modal-overlay {
            position: fixed; inset: 0; z-index: 9999999;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(10px);
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.3s;
            font-family: 'Inter', sans-serif;
        }
        .stripe-modal-overlay.active {
            opacity: 1; pointer-events: auto;
        }
        .stripe-modal {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.95));
            border-radius: 20px; border: 1px solid rgba(99, 102, 241, 0.3);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.2);
            max-width: 450px; width: 100%; padding: 30px 40px; text-align: center;
            transform: translateY(20px); transition: transform 0.3s;
        }
        .stripe-modal-overlay.active .stripe-modal { transform: translateY(0); }
        .stripe-modal-icon {
            width: 60px; height: 60px; border-radius: 50%; background: rgba(99, 102, 241, 0.1);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px; border: 1px solid rgba(99, 102, 241, 0.3); font-size: 30px;
        }
        .stripe-modal-title { margin: 0 0 10px; font-size: 24px; font-weight: 800; color: #f8fafc; letter-spacing: -0.02em; }
        .stripe-modal-desc { margin: 0 0 20px; font-size: 16px; color: #94a3b8; line-height: 1.5; }
        .stripe-modal-pricebox {
            background: rgba(0,0,0,0.4); border-radius: 12px; padding: 15px; margin-bottom: 25px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .stripe-modal-price-lbl { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .stripe-modal-price { font-size: 36px; font-weight: 900; color: #10b981; }
        .stripe-btn-pay {
            background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none; padding: 14px 20px;
            border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3); width: 100%; margin-bottom: 12px; transition: transform 0.1s, filter 0.2s;
        }
        .stripe-btn-pay:hover { filter: brightness(1.1); }
        .stripe-btn-sub {
            background: linear-gradient(135deg, #f59e0b, #d946ef); color: white; border: none; padding: 14px 20px;
            border-radius: 10px; font-size: 16px; font-weight: 800; cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.4); width: 100%; margin-bottom: 12px; transition: transform 0.15s, filter 0.2s;
        }
        .stripe-btn-sub:hover { filter: brightness(1.15) contrast(1.1); transform: scale(1.02); }
        .stripe-btn-cancel {
            background: transparent; color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3);
            padding: 12px 20px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;
            width: 100%; transition: all 0.2s;
        }
        .stripe-btn-cancel:hover { background: rgba(255,255,255,0.05); color: #f8fafc; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .opt-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; display: flex; flex-direction: column; justify-content: center; }
        .opt-box.premium-box { border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.05); }
        .opt-lbl { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 800; margin-bottom: 8px; }
        .opt-price { font-size: 28px; font-weight: 900; color: #10b981; margin-bottom: 15px; }
        .premium-box .opt-price { color: #f59e0b; }
        .premium-box .opt-lbl { color: #fbbf24; }
    `;
    document.head.appendChild(style);

    // Build DOM
    const overlay = document.createElement('div');
    overlay.className = 'stripe-modal-overlay';
    overlay.innerHTML = `
        <div class="stripe-modal" style="max-width: 550px;">
            <div class="stripe-modal-icon">💳</div>
            <h2 class="stripe-modal-title" id="stm-title">Premium Action</h2>
            <p class="stripe-modal-desc" id="stm-desc"></p>
            
            <div class="options-grid" id="stm-options-container">
                <!-- Option 1: Single -->
                <div class="opt-box">
                    <div class="opt-lbl" id="stm-lbl-1">Action Unique</div>
                    <div class="opt-price">$2.00</div>
                    <button class="stripe-btn-pay" id="stm-pay">Payer 2$ ➔</button>
                </div>
                <!-- Option 2: Premium -->
                <div class="opt-box premium-box" id="stm-premium-box">
                    <div class="opt-lbl" id="stm-lbl-2">Abonnement (1 Mois)</div>
                    <div class="opt-price">$30<span style="font-size:14px;color:#94a3b8">/mo</span></div>
                    <button class="stripe-btn-sub" id="stm-sub">Devenir Premium 💎</button>
                </div>
            </div>
            
            <button class="stripe-btn-cancel" id="stm-cancel">Cancel</button>
        </div>
    `;
    document.body.appendChild(overlay);

    let activeCallback = null;
    let isSubMode = false;

    window.showStripeModal = function(actionName, onPaid, isSubscriptionReq = false) {
        // --- PREMIUM CHECK SYSTEM (V2) ---
        let isPremium = false;
        
        // 1. Check legacy timestamp
        const subDate = localStorage.getItem('ia_premium_sub_date');
        if (subDate) {
            const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
            if (daysPassed < 30) {
                isPremium = true;
            } else {
                localStorage.removeItem('ia_premium_sub_date'); // expired
            }
        }

        // 2. Check Database list (From Admin Panel)
        if (!isPremium) {
            try {
                const session = JSON.parse(localStorage.getItem('genius_session') || '{}');
                const premiumUsers = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
                const userEmail = session.email ? session.email.toLowerCase() : '';
                
                const record = premiumUsers.find(u => u.email.toLowerCase() === userEmail);
                if (record) {
                    const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
                    if (record.days === 9999 || expiry > Date.now()) {
                        isPremium = true;
                    }
                }
            } catch(e) { console.error("Premium list check failed", e); }
        }

        if (isPremium) {
            if (onPaid) onPaid(); // Instant bypass
            return;
        }
        // ---------------------------------

        activeCallback = onPaid;
        isSubMode = isSubscriptionReq;
        const isFr = document.querySelector('.lang-btn.active')?.dataset.lang === 'fr';
        
        document.getElementById('stm-title').innerText = isFr ? 'Action Premium' : 'Premium Action';
        document.getElementById('stm-desc').innerText = isFr 
            ? `Pour procéder à l'action [ ${actionName} ], une petite participation est requise pour soutenir la plateforme.`
            : `To proceed with [ ${actionName} ], a small contribution is required to support the platform.`;
        
        document.getElementById('stm-lbl-1').innerText = isFr ? 'Action Unique' : 'Single Action';
        document.getElementById('stm-lbl-2').innerText = isFr ? 'Abonnement (1 Mois)' : 'Subscription (1 Mo)';
        document.getElementById('stm-pay').innerText = isFr ? 'Payer 2$ ➔' : 'Pay $2 ➔';
        document.getElementById('stm-sub').innerText = isFr ? 'Devenir Premium 💎' : 'Become Premium 💎';
        document.getElementById('stm-cancel').innerText = isFr ? 'Annuler' : 'Cancel';
        
        // If triggered directly from topbar btn, we might want to ONLY show the $30 option
        if (isSubMode) {
            document.getElementById('stm-options-container').style.gridTemplateColumns = '1fr';
            document.getElementById('stm-options-container').firstElementChild.style.display = 'none';
        } else {
            document.getElementById('stm-options-container').style.gridTemplateColumns = '1fr 1fr';
            document.getElementById('stm-options-container').firstElementChild.style.display = 'flex';
        }
        
        overlay.classList.add('active');
    };

    document.getElementById('stm-cancel').addEventListener('click', () => {
        overlay.classList.remove('active');
        activeCallback = null;
    });

    document.getElementById('stm-pay').addEventListener('click', () => {
        window.open('https://buy.stripe.com/cNi5kE97Mfbb6Yl4aubfO01', '_blank');
        if (activeCallback) activeCallback();
        overlay.classList.remove('active');
    });

    document.getElementById('stm-sub').addEventListener('click', () => {
        window.open('https://buy.stripe.com/bJecN6bfUfbbaax36qbfO02', '_blank'); // Demo subscription link
        
        if (isSubMode && activeCallback) {
            // Already handled by code-studio logic if isSubMode
            activeCallback();
        } else if (!isSubMode) {
            // Simulate waiting for payment
            setTimeout(() => {
                if (confirm("TEST MODE: Simulăm finalizarea plății pe Stripe? Apasă OK dacă ai 'plătit' pentru a porni abonamentul.")) {
                    localStorage.setItem('ia_premium_sub_date', Date.now().toString());
                    if (activeCallback) activeCallback();
                    window.location.reload(); 
                }
            }, 500);
        }
        overlay.classList.remove('active');
    });
})();
