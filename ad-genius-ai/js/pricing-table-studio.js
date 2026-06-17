(function() {
    'use strict';
    
    var _prevRenderTab = window.renderTab;
    window.renderTab = function(tab) {
        if (tab === 'pricing-table') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('pt-center');
            var r = document.getElementById('pt-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            if(!window.ptInitialized) {
                buildUI();
                renderPreview();
                window.ptInitialized = true;
            }
            return;
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    var state = {
        theme: 'purple',
        currency: '$',
        period: '/month',
        tiers: [
            {
                name: 'Starter',
                price: '19',
                desc: 'Perfect for individuals starting out.',
                features: ['1 Project', '10GB Storage', 'Basic Support', 'Community Access'],
                btnText: 'Start Free Trial',
                highlight: false
            },
            {
                name: 'Professional',
                price: '49',
                desc: 'Ideal for growing businesses and teams.',
                features: ['Unlimited Projects', '100GB Storage', 'Priority 24/7 Support', 'Advanced Analytics', 'Custom Domain'],
                btnText: 'Get Started',
                highlight: true
            },
            {
                name: 'Enterprise',
                price: '99',
                desc: 'For large scale operations and agencies.',
                features: ['Everything in Pro', 'Unlimited Storage', 'Dedicated Manager', 'API Access', 'White Labeling'],
                btnText: 'Contact Sales',
                highlight: false
            }
        ]
    };

    var themes = {
        purple: { bg: '#0f172a', cardBg: '#1e293b', accent: '#a855f7', text: '#f8fafc', textMuted: '#94a3b8' },
        blue: { bg: '#0b1120', cardBg: '#172554', accent: '#3b82f6', text: '#eff6ff', textMuted: '#93c5fd' },
        gold: { bg: '#1c1917', cardBg: '#292524', accent: '#f59e0b', text: '#fafaf9', textMuted: '#d6d3d1' },
        cyber: { bg: '#000000', cardBg: '#111111', accent: '#00ff9d', text: '#ffffff', textMuted: '#888888', border: '#00ff9d' }
    };

    function buildUI() {
        var r = document.getElementById('pt-right');
        
        r.innerHTML = `
            <div style="color:white;font-family:sans-serif;padding-bottom:50px;">
                <h2 style="margin:0 0 5px;color:#00ff64;font-size:18px;">💰 Pricing Table Studio</h2>
                <p style="margin:0 0 15px;font-size:11px;color:#94a3b8;">Generate highly converting HTML pricing plans.</p>

                <div style="background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px;">
                    <label style="font-size:10px;color:#94a3b8;">Color Theme:</label>
                    <select id="pt-theme" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;margin-bottom:10px;">
                        <option value="purple">💜 Neon Purple</option>
                        <option value="blue">🌊 Ocean Blue</option>
                        <option value="gold">🏆 Luxury Gold</option>
                        <option value="cyber">🤖 Cyberpunk Green</option>
                    </select>

                    <div style="display:flex;gap:10px;">
                        <div style="flex:1;">
                            <label style="font-size:10px;color:#94a3b8;">Currency:</label>
                            <input type="text" id="pt-currency" value="$" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        </div>
                        <div style="flex:1;">
                            <label style="font-size:10px;color:#94a3b8;">Period:</label>
                            <input type="text" id="pt-period" value="/month" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;">
                        </div>
                    </div>
                </div>

                <div id="pt-tiers-container"></div>

                <button id="pt-btn-export" style="width:100%;margin-top:20px;background:linear-gradient(135deg,#10b981,#047857);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);">🌐 Export Interactive HTML</button>
            </div>
        `;

        setupListeners();
        renderTierControls();
    }

    function renderTierControls() {
        var container = document.getElementById('pt-tiers-container');
        container.innerHTML = '';

        state.tiers.forEach((tier, index) => {
            var box = document.createElement('div');
            box.style.cssText = 'background:#1e293b;padding:10px;border-radius:6px;margin-bottom:15px; border-left:3px solid ' + (tier.highlight ? '#a855f7' : '#334155');
            
            box.innerHTML = `
                <h3 style="margin:0 0 10px;font-size:13px;color:#fef08a;">Tier ${index + 1} ${tier.highlight ? '(Highlighted)' : ''}</h3>
                
                <input type="text" value="${tier.name}" data-idx="${index}" data-field="name" class="pt-input" placeholder="Plan Name" style="width:100%;margin-bottom:5px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;font-size:11px;">
                <input type="text" value="${tier.price}" data-idx="${index}" data-field="price" class="pt-input" placeholder="Price" style="width:100%;margin-bottom:5px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;font-size:11px;">
                <input type="text" value="${tier.desc}" data-idx="${index}" data-field="desc" class="pt-input" placeholder="Short description" style="width:100%;margin-bottom:5px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;font-size:11px;">
                
                <label style="font-size:10px;color:#94a3b8;display:block;margin-top:5px;">Features (comma separated):</label>
                <textarea data-idx="${index}" data-field="features" class="pt-input" style="width:100%;height:40px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;font-size:11px;resize:none;">${tier.features.join(', ')}</textarea>
                
                <input type="text" value="${tier.btnText}" data-idx="${index}" data-field="btnText" class="pt-input" placeholder="Button Text" style="width:100%;margin-top:5px;background:#0f172a;color:#fff;border:1px solid #334155;padding:4px;border-radius:4px;font-size:11px;">
                
                <label style="display:flex;align-items:center;gap:5px;font-size:11px;margin-top:5px;cursor:pointer;">
                    <input type="radio" name="highlightedTier" value="${index}" ${tier.highlight ? 'checked' : ''} class="pt-highlight"> Make this "Most Popular"
                </label>
            `;
            container.appendChild(box);
        });

        // Re-attach listeners to new inputs
        document.querySelectorAll('.pt-input').forEach(inp => {
            inp.addEventListener('input', e => {
                var idx = e.target.getAttribute('data-idx');
                var field = e.target.getAttribute('data-field');
                if(field === 'features') {
                    state.tiers[idx][field] = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                } else {
                    state.tiers[idx][field] = e.target.value;
                }
                renderPreview();
            });
        });

        document.querySelectorAll('.pt-highlight').forEach(rad => {
            rad.addEventListener('change', e => {
                var idx = parseInt(e.target.value);
                state.tiers.forEach((t, i) => t.highlight = (i === idx));
                renderTierControls(); // Re-render to show left border update
                renderPreview();
            });
        });
    }

    function setupListeners() {
        document.getElementById('pt-theme').addEventListener('change', e => { state.theme = e.target.value; renderPreview(); });
        document.getElementById('pt-currency').addEventListener('input', e => { state.currency = e.target.value; renderPreview(); });
        document.getElementById('pt-period').addEventListener('input', e => { state.period = e.target.value; renderPreview(); });
        document.getElementById('pt-btn-export').addEventListener('click', exportHTML);
    }

    function renderPreview() {
        var c = document.getElementById('pt-center');
        var t = themes[state.theme];

        var html = `
            <div style="width:100%; max-width:1000px; display:flex; flex-wrap:wrap; justify-content:center; gap:30px; font-family:'Inter', sans-serif;">
                <style>
                    .pt-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    .pt-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
                    .pt-btn { transition: all 0.2s ease; }
                    .pt-btn:hover { filter: brightness(1.2); transform: scale(1.05); }
                    .cyber-border { box-shadow: 0 0 10px ${t.accent}, inset 0 0 10px ${t.accent}; border: 1px solid ${t.accent}; }
                </style>
        `;

        state.tiers.forEach(tier => {
            var isHi = tier.highlight;
            var scale = isHi ? 'transform: scale(1.05); z-index: 10;' : '';
            var border = state.theme === 'cyber' ? 'cyber-border' : (isHi ? 'border:2px solid ' + t.accent + ';' : 'border:1px solid rgba(255,255,255,0.1);');
            var bg = isHi && state.theme !== 'cyber' ? 'background: linear-gradient(180deg, ' + t.cardBg + ' 0%, rgba(0,0,0,0.5) 100%);' : 'background:' + t.cardBg + ';';
            var shadow = isHi ? 'box-shadow: 0 0 30px ' + t.accent + '44;' : '';
            var badge = isHi ? `<div style="position:absolute; top:-15px; left:50%; transform:translateX(-50%); background:${t.accent}; color:#fff; padding:4px 15px; border-radius:20px; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Most Popular</div>` : '';

            var featureList = tier.features.map(f => `
                <li style="display:flex; align-items:center; gap:10px; margin-bottom:15px; color:${t.text}; font-size:14px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ${f}
                </li>
            `).join('');

            html += `
                <div class="pt-card ${state.theme === 'cyber' ? 'cyber-border' : ''}" style="position:relative; width:300px; padding:40px; border-radius:16px; ${bg} ${border} ${shadow} ${scale} display:flex; flex-direction:column;">
                    ${badge}
                    <h3 style="color:${t.text}; font-size:24px; margin:0 0 10px; font-weight:700;">${tier.name}</h3>
                    <p style="color:${t.textMuted}; font-size:14px; margin:0 0 20px; min-height:40px;">${tier.desc}</p>
                    <div style="margin-bottom:30px;">
                        <span style="color:${t.text}; font-size:48px; font-weight:800;">${state.currency}${tier.price}</span>
                        <span style="color:${t.textMuted}; font-size:16px;">${state.period}</span>
                    </div>
                    <ul style="list-style:none; padding:0; margin:0 0 30px; flex:1;">
                        ${featureList}
                    </ul>
                    <button class="pt-btn" style="width:100%; padding:15px; border-radius:8px; border:none; background:${isHi ? t.accent : 'rgba(255,255,255,0.1)'}; color:${isHi ? '#fff' : t.text}; font-size:16px; font-weight:bold; cursor:pointer;">
                        ${tier.btnText}
                    </button>
                </div>
            `;
        });

        html += `</div>`;
        c.innerHTML = html;
        c.style.backgroundColor = t.bg;
    }

    function exportHTML() {
        var t = themes[state.theme];
        
        var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pricing Plans</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 50px 20px;
            background-color: ${t.bg};
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .pricing-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            max-width: 1100px;
            width: 100%;
        }
        .pt-card {
            position: relative;
            width: 320px;
            padding: 40px;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
            box-sizing: border-box;
        }
        .pt-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .cyber-border {
            box-shadow: 0 0 15px ${t.accent}44, inset 0 0 15px ${t.accent}44;
            border: 1px solid ${t.accent}88;
        }
        .cyber-border:hover {
            box-shadow: 0 0 30px ${t.accent}, inset 0 0 20px ${t.accent};
        }
        .pt-btn {
            transition: all 0.3s ease;
            width: 100%;
            padding: 15px;
            border-radius: 8px;
            border: none;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            margin-top: auto;
        }
        .pt-btn:hover {
            transform: scale(1.05);
            filter: brightness(1.2);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: ${t.accent};
            color: #fff;
            padding: 6px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            box-shadow: 0 5px 15px ${t.accent}66;
            white-space: nowrap;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 0 0 30px 0;
        }
        li {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            color: ${t.text};
            font-size: 15px;
        }
        @media (max-width: 1050px) {
            .pt-card.highlight {
                transform: none !important;
            }
            .pt-card:hover {
                transform: translateY(-5px);
            }
        }
    </style>
</head>
<body>
    <div class="pricing-container">
`;

        state.tiers.forEach(tier => {
            var isHi = tier.highlight;
            
            var cardClass = 'pt-card' + (isHi ? ' highlight' : '') + (state.theme === 'cyber' ? ' cyber-border' : '');
            var scale = isHi ? 'transform: scale(1.05); z-index: 10;' : '';
            var border = state.theme === 'cyber' ? '' : (isHi ? 'border:2px solid ' + t.accent + ';' : 'border:1px solid rgba(255,255,255,0.08);');
            var bg = isHi && state.theme !== 'cyber' ? 'background: linear-gradient(180deg, ' + t.cardBg + ' 0%, rgba(0,0,0,0.5) 100%);' : 'background:' + t.cardBg + ';';
            var shadow = isHi && state.theme !== 'cyber' ? 'box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 40px ' + t.accent + '33;' : '';
            var badge = isHi ? `<div class="badge">Most Popular</div>` : '';

            var featureList = tier.features.map(f => `
                <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${t.accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ${f}
                </li>
            `).join('');

            htmlContent += `
        <div class="${cardClass}" style="${bg} ${border} ${shadow} ${scale}">
            ${badge}
            <h3 style="color:${t.text}; font-size:26px; margin:0 0 12px; font-weight:800;">${tier.name}</h3>
            <p style="color:${t.textMuted}; font-size:15px; margin:0 0 25px; line-height:1.5;">${tier.desc}</p>
            <div style="margin-bottom:35px; display:flex; align-items:baseline; gap:5px;">
                <span style="color:${t.text}; font-size:54px; font-weight:800; letter-spacing:-1px;">${state.currency}${tier.price}</span>
                <span style="color:${t.textMuted}; font-size:16px; font-weight:600;">${state.period}</span>
            </div>
            <ul>
                ${featureList}
            </ul>
            <button class="pt-btn" style="background:${isHi ? t.accent : 'rgba(255,255,255,0.05)'}; color:${isHi ? (state.theme==='cyber'?'#000':'#fff') : t.text}; border:${isHi ? 'none' : '1px solid rgba(255,255,255,0.1)'}">
                ${tier.btnText}
            </button>
        </div>
`;
        });

        htmlContent += `
    </div>
</body>
</html>`;

        var blob = new Blob([htmlContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Pricing_Table.html';
        a.click();
    }
})();
