(function() {
    'use strict';
    var _prevRenderTab = window.renderTab;
    
    // State of the simulator
    var S = {
        active: false,
        simWeather: 'sunny', // sunny, rainy, snowy, windy
        simTime: 'afternoon', // morning, afternoon, night
        brandColor: '#3b82f6',
        bgImgData: '',
        
        // Rules configuration
        rules: {
            sunny: { text: "Stay Cool & Refreshed! ☀️", code: "SUN30" },
            rainy: { text: "Cozy Up & Save on Rainy Days! 🌧️", code: "RAIN40" },
            snowy: { text: "Winter Wonder Deals! ❄️", code: "SNOW50" },
            windy: { text: "Breezy Savings Just For You! 💨", code: "WIND20" },
            night: { text: "Night Owl Exclusive Offer! 🌙", code: "NIGHT15" }
        }
    };

    var anim = {
        ctx: null,
        canvas: null,
        particles: [],
        animId: null,
        t: 0
    };

    window.renderTab = function(tab) {
        if (tab === 'localized-ad') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');
            
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(el => el.style.display = 'none');
            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('la-center');
            var r = document.getElementById('la-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';
            
            buildUI();
            initPreview();
            return;
        }
        
        S.active = false;
        if (anim.animId) cancelAnimationFrame(anim.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('la-right');
        if (!r) return;
        
        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#38bdf8;font-size:18px;">🌍 Dynamic Contextual Studio</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Weather & Time Adaptive Ad Campaigns</p>' +
            
            // 1. Weather simulator selector
            '<label style="font-size:11px;color:#a5f3fc;font-weight:bold;display:block;margin-bottom:6px;">1. Simulate Weather (Simulează Vremea):</label>' +
            '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:15px;">' +
                '<button class="w-btn '+(S.simWeather==='sunny'?'active':'')+'" data-w="sunny" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simWeather==='sunny'?'#38bdf8':'#1e293b')+';color:'+(S.simWeather==='sunny'?'#000':'#fff')+';transition:0.2s;">☀️ Sun</button>' +
                '<button class="w-btn '+(S.simWeather==='rainy'?'active':'')+'" data-w="rainy" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simWeather==='rainy'?'#38bdf8':'#1e293b')+';color:'+(S.simWeather==='rainy'?'#000':'#fff')+';transition:0.2s;">🌧️ Rain</button>' +
                '<button class="w-btn '+(S.simWeather==='snowy'?'active':'')+'" data-w="snowy" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simWeather==='snowy'?'#38bdf8':'#1e293b')+';color:'+(S.simWeather==='snowy'?'#000':'#fff')+';transition:0.2s;">❄️ Snow</button>' +
                '<button class="w-btn '+(S.simWeather==='windy'?'active':'')+'" data-w="windy" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simWeather==='windy'?'#38bdf8':'#1e293b')+';color:'+(S.simWeather==='windy'?'#000':'#fff')+';transition:0.2s;">💨 Wind</button>' +
            '</div>' +
            
            // 2. Time simulator selector
            '<label style="font-size:11px;color:#a5f3fc;font-weight:bold;display:block;margin-bottom:6px;">2. Simulate Time (Simulează Ora):</label>' +
            '<div style="display:flex;gap:5px;margin-bottom:15px;">' +
                '<button class="t-btn '+(S.simTime==='morning'?'active':'')+'" data-t="morning" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simTime==='morning'?'#eab308':'#1e293b')+';color:'+(S.simTime==='morning'?'#000':'#fff')+';transition:0.2s;">🌅 Morning</button>' +
                '<button class="t-btn '+(S.simTime==='afternoon'?'active':'')+'" data-t="afternoon" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simTime==='afternoon'?'#eab308':'#1e293b')+';color:'+(S.simTime==='afternoon'?'#000':'#fff')+';transition:0.2s;">☀️ Day</button>' +
                '<button class="t-btn '+(S.simTime==='night'?'active':'')+'" data-t="night" style="flex:1;padding:8px;font-size:11px;font-weight:bold;border:1px solid #334155;border-radius:4px;cursor:pointer;background:'+(S.simTime==='night'?'#eab308':'#1e293b')+';color:'+(S.simTime==='night'?'#000':'#fff')+';transition:0.2s;">🌙 Night</button>' +
            '</div>' +
            
            // 3. Campaign Rules Configurator
            '<label style="font-size:11px;color:#a5f3fc;font-weight:bold;display:block;margin-bottom:10px;border-bottom:1px solid #334155;padding-bottom:5px;">3. Edit Marketing Rules:</label>' +
            
            '<div style="max-height:220px;overflow-y:auto;padding-right:5px;display:flex;flex-direction:column;gap:12px;margin-bottom:15px;">' +
                '<div>' +
                    '<span style="font-size:11px;color:#fdba74;font-weight:bold;">☀️ SUNNY RULE:</span>' +
                    '<input type="text" id="rule-sun-txt" value="'+S.rules.sunny.text+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;margin:3px 0;">' +
                    '<input type="text" id="rule-sun-code" value="'+S.rules.sunny.code+'" placeholder="Code" style="width:50%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;font-size:10px;font-weight:bold;text-transform:uppercase;">' +
                '</div>' +
                '<div>' +
                    '<span style="font-size:11px;color:#93c5fd;font-weight:bold;">🌧️ RAINY RULE:</span>' +
                    '<input type="text" id="rule-rain-txt" value="'+S.rules.rainy.text+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;margin:3px 0;">' +
                    '<input type="text" id="rule-rain-code" value="'+S.rules.rainy.code+'" placeholder="Code" style="width:50%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;font-size:10px;font-weight:bold;text-transform:uppercase;">' +
                '</div>' +
                '<div>' +
                    '<span style="font-size:11px;color:#a7f3d0;font-weight:bold;">❄️ SNOWY RULE:</span>' +
                    '<input type="text" id="rule-snow-txt" value="'+S.rules.snowy.text+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;margin:3px 0;">' +
                    '<input type="text" id="rule-snow-code" value="'+S.rules.snowy.code+'" placeholder="Code" style="width:50%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;font-size:10px;font-weight:bold;text-transform:uppercase;">' +
                '</div>' +
                '<div>' +
                    '<span style="font-size:11px;color:#cbd5e1;font-weight:bold;">💨 WINDY RULE:</span>' +
                    '<input type="text" id="rule-wind-txt" value="'+S.rules.windy.text+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;margin:3px 0;">' +
                    '<input type="text" id="rule-wind-code" value="'+S.rules.windy.code+'" placeholder="Code" style="width:50%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;font-size:10px;font-weight:bold;text-transform:uppercase;">' +
                '</div>' +
                '<div>' +
                    '<span style="font-size:11px;color:#c084fc;font-weight:bold;">🌙 NIGHT EXCLUSIVE:</span>' +
                    '<input type="text" id="rule-night-txt" value="'+S.rules.night.text+'" style="width:100%;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;margin:3px 0;">' +
                    '<input type="text" id="rule-night-code" value="'+S.rules.night.code+'" placeholder="Code" style="width:50%;background:#1e293b;color:#fff;border:1px solid #334155;padding:5px;border-radius:4px;font-size:10px;font-weight:bold;text-transform:uppercase;">' +
                '</div>' +
            '</div>' +

            // 4. Style brand
            '<label style="font-size:11px;color:#a5f3fc;font-weight:bold;display:block;margin-bottom:6px;">4. Theme Style:</label>' +
            '<div style="display:flex;align-items:center;gap:15px;margin-bottom:12px;">' +
                '<input type="color" id="la-brand-c" value="'+S.brandColor+'" style="border:none;background:transparent;cursor:pointer;width:35px;height:30px;">' +
                '<span style="font-size:11px;color:#94a3b8;">CTA Button Accent Color</span>' +
            '</div>' +
            '<label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;">Upload Watermark/Logo overlay:</label>' +
            '<input type="file" id="la-bg" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;margin-bottom:20px;">' +

            '<button id="la-export" style="width:100%;background:linear-gradient(135deg,#38bdf8,#3b82f6);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.3);transition:0.2s;">🌐 Export Smart Contextual Banner</button>' +
            '</div>';

        r.innerHTML = html;

        // Button Event Handlers
        document.querySelectorAll('.w-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.w-btn').forEach(b => {
                    b.style.background = '#1e293b';
                    b.style.color = '#fff';
                });
                btn.style.background = '#38bdf8';
                btn.style.color = '#000';
                S.simWeather = btn.dataset.w;
                initWeatherParticles();
            });
        });

        document.querySelectorAll('.t-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.t-btn').forEach(b => {
                    b.style.background = '#1e293b';
                    b.style.color = '#fff';
                });
                btn.style.background = '#eab308';
                btn.style.color = '#000';
                S.simTime = btn.dataset.t;
            });
        });

        // Rules text event bindings
        document.getElementById('rule-sun-txt').oninput = function(e){ S.rules.sunny.text = e.target.value; };
        document.getElementById('rule-sun-code').oninput = function(e){ S.rules.sunny.code = e.target.value.toUpperCase(); };
        document.getElementById('rule-rain-txt').oninput = function(e){ S.rules.rainy.text = e.target.value; };
        document.getElementById('rule-rain-code').oninput = function(e){ S.rules.rainy.code = e.target.value.toUpperCase(); };
        document.getElementById('rule-snow-txt').oninput = function(e){ S.rules.snowy.text = e.target.value; };
        document.getElementById('rule-snow-code').oninput = function(e){ S.rules.snowy.code = e.target.value.toUpperCase(); };
        document.getElementById('rule-wind-txt').oninput = function(e){ S.rules.windy.text = e.target.value; };
        document.getElementById('rule-wind-code').oninput = function(e){ S.rules.windy.code = e.target.value.toUpperCase(); };
        document.getElementById('rule-night-txt').oninput = function(e){ S.rules.night.text = e.target.value; };
        document.getElementById('rule-night-code').oninput = function(e){ S.rules.night.code = e.target.value.toUpperCase(); };

        document.getElementById('la-brand-c').oninput = function(e){ S.brandColor = e.target.value; };

        // File Uploader
        document.getElementById('la-bg').onchange = function(e) {
            var f = e.target.files[0];
            if(!f) return;
            var rdr = new FileReader();
            rdr.onload = function(ev) {
                S.bgImgData = ev.target.result;
            };
            rdr.readAsDataURL(f);
        };

        // Export handler
        document.getElementById('la-export').onclick = function() {
            exportContextualAd();
        };
    }

    function initWeatherParticles() {
        if (!anim.canvas) return;
        anim.particles = [];
        var w = anim.canvas.width;
        var h = anim.canvas.height;

        if (S.simWeather === 'rainy') {
            for (var i = 0; i < 40; i++) {
                anim.particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vy: 8 + Math.random() * 6,
                    length: 12 + Math.random() * 8,
                    width: 1 + Math.random() * 1
                });
            }
        } else if (S.simWeather === 'snowy') {
            for (var i = 0; i < 35; i++) {
                anim.particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vy: 1 + Math.random() * 2.5,
                    vx: (Math.random() - 0.5) * 1.5,
                    size: 2 + Math.random() * 4,
                    density: Math.random() * 20
                });
            }
        } else if (S.simWeather === 'windy') {
            // Windy: drift wind lines & leaves
            for (var i = 0; i < 15; i++) {
                anim.particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: 4 + Math.random() * 5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: 6 + Math.random() * 8,
                    type: Math.random() > 0.5 ? 'leaf' : 'windline',
                    rot: Math.random() * Math.PI,
                    rotSp: (Math.random() - 0.5) * 0.05
                });
            }
        }
    }

    function initPreview() {
        if (S.active && anim.canvas) return;
        S.active = true;
        
        var ct = document.getElementById('la-center');
        if (!ct) return;
        ct.innerHTML = '';
        
        // Wrap/Screen Frame for banner
        var frame = document.createElement('div');
        frame.style.width = '380px';
        frame.style.height = '280px';
        frame.style.position = 'relative';
        frame.style.borderRadius = '16px';
        frame.style.overflow = 'hidden';
        frame.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
        frame.style.display = 'flex';
        frame.style.flexDirection = 'column';
        frame.style.justifyContent = 'space-between';
        frame.style.padding = '20px';
        frame.style.boxSizing = 'border-box';
        frame.style.transition = 'background 0.5s ease-in-out';
        frame.id = 'la-banner-frame';
        ct.appendChild(frame);
        
        // Overlay Weather Canvas inside banner
        anim.canvas = document.createElement('canvas');
        anim.canvas.width = 380;
        anim.canvas.height = 280;
        anim.canvas.style.position = 'absolute';
        anim.canvas.style.top = '0';
        anim.canvas.style.left = '0';
        anim.canvas.style.width = '100%';
        anim.canvas.style.height = '100%';
        anim.canvas.style.pointerEvents = 'none';
        anim.canvas.style.zIndex = '2';
        frame.appendChild(anim.canvas);
        anim.ctx = anim.canvas.getContext('2d');

        // Text & Coupon Content Overlay inside frame
        var contentWrap = document.createElement('div');
        contentWrap.style.zIndex = '3';
        contentWrap.style.display = 'flex';
        contentWrap.style.flexDirection = 'column';
        contentWrap.style.height = '100%';
        contentWrap.style.justifyContent = 'space-between';
        contentWrap.style.width = '100%';
        contentWrap.id = 'la-content-overlay';
        frame.appendChild(contentWrap);

        initWeatherParticles();

        // Main Loop
        function loop() {
            if (!S.active) return;
            anim.animId = requestAnimationFrame(loop);
            
            updateFrameBackground();
            updateBannerContent(contentWrap);
            drawWeather();
        }
        loop();
    }

    function updateFrameBackground() {
        var frame = document.getElementById('la-banner-frame');
        if (!frame) return;

        var grad = '';
        if (S.simTime === 'morning') {
            grad = 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)'; // warm sunset orange
        } else if (S.simTime === 'afternoon') {
            grad = 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)'; // cyan light blue
        } else { // night
            grad = 'linear-gradient(135deg, #0f172a 0%, #020617 100%)'; // dark slate
        }

        frame.style.background = grad;
    }

    function updateBannerContent(container) {
        // Select active rule based on simulated states (Night priority)
        var rule = S.rules.sunny; // default
        var icon = '☀️';
        
        if (S.simTime === 'night') {
            rule = S.rules.night;
            icon = '🌙';
        } else {
            if (S.simWeather === 'rainy') {
                rule = S.rules.rainy; icon = '🌧️';
            } else if (S.simWeather === 'snowy') {
                rule = S.rules.snowy; icon = '❄️';
            } else if (S.simWeather === 'windy') {
                rule = S.rules.windy; icon = '💨';
            }
        }

        var isDarkBg = (S.simTime === 'night');
        var txtColor = isDarkBg ? '#ffffff' : '#000000';
        var descColor = isDarkBg ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
        var badgeBg = isDarkBg ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

        var watermarkStr = '';
        if (S.bgImgData) {
            watermarkStr = '<img src="'+S.bgImgData+'" style="position:absolute;top:15px;right:15px;width:50px;height:50px;object-fit:contain;opacity:0.8;border-radius:4px;">';
        }

        container.innerHTML = watermarkStr + 
            '<div style="text-align:left;">' +
                '<span style="background:'+badgeBg+';color:'+txtColor+';padding:4px 10px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:1px;font-family:sans-serif;">'+icon+' LIVE AD ENVIRONMENT</span>' +
                '<h2 style="margin:15px 0 5px;font-size:20px;font-weight:900;color:'+txtColor+';font-family:sans-serif;line-height:1.2;text-shadow:'+(isDarkBg?'0 2px 8px rgba(0,0,0,0.5)':'none')+'">'+rule.text+'</h2>' +
                '<p style="margin:0;font-size:11px;color:'+descColor+';font-weight:500;">Dynamic hyper-local contextual advertisement</p>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px dashed '+(isDarkBg?'rgba(255,255,255,0.15)':'rgba(0,0,0,0.15)')+';padding-top:15px;margin-top:10px;">' +
                '<div>' +
                    '<span style="font-size:9px;color:'+descColor+';display:block;font-weight:bold;">COUPON CODE:</span>' +
                    '<span style="font-size:18px;font-family:monospace;font-weight:900;color:'+(isDarkBg?'#e2e8f0':S.brandColor)+';text-shadow:'+(isDarkBg?'0 1px 4px rgba(0,0,0,0.5)':'none')+'">'+rule.code+'</span>' +
                '</div>' +
                '<button style="background:'+S.brandColor+';color:#ffffff;border:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:12px;cursor:pointer;box-shadow:0 6px 15px '+S.brandColor+'40;transition:0.2s;">CLAIM DEALS →</button>' +
            '</div>';
    }

    function drawWeather() {
        if (!anim.canvas) return;
        var ctx = anim.ctx;
        var w = anim.canvas.width;
        var h = anim.canvas.height;
        ctx.clearRect(0, 0, w, h);
        
        anim.t += 0.02;

        if (S.simWeather === 'sunny') {
            // Draw warm glowing sun rays coming from top right
            var rayCount = 4;
            var rx = w - 40;
            var ry = 40;
            
            ctx.fillStyle = 'rgba(253, 224, 71, 0.08)';
            for(var i=0; i<rayCount; i++) {
                var width = 20 + Math.sin(anim.t + i) * 10;
                var angle = (Math.PI / 4) + (i * 0.15) + Math.cos(anim.t * 0.5) * 0.05;
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx - Math.cos(angle)*400 - width, ry + Math.sin(angle)*400);
                ctx.lineTo(rx - Math.cos(angle)*400 + width, ry + Math.sin(angle)*400);
                ctx.closePath();
                ctx.fill();
            }
            
            // Draw abstract warm particles drifting
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            for(var j=0; j<5; j++) {
                var px = w * 0.3 + Math.sin(anim.t*0.5 + j)*60;
                var py = h * 0.4 + Math.cos(anim.t*0.3 + j)*40;
                ctx.beginPath();
                ctx.arc(px, py, 3 + j, 0, Math.PI*2);
                ctx.fill();
            }
        } 
        else if (S.simWeather === 'rainy') {
            // Draw falling rain drops
            ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)';
            ctx.lineCap = 'round';
            anim.particles.forEach(function(p) {
                ctx.lineWidth = p.width;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - 2, p.y + p.length); // slanted fall
                ctx.stroke();
                
                // Physics fall
                p.y += p.vy;
                p.x -= 2;
                
                // Reset drop
                if(p.y > h) {
                    p.y = -20;
                    p.x = Math.random() * (w + 50);
                    p.vy = 8 + Math.random() * 6;
                }
            });
        } 
        else if (S.simWeather === 'snowy') {
            // Draw falling snowflakes
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            anim.particles.forEach(function(p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                
                // physics fall
                p.y += p.vy;
                p.x += Math.sin(anim.t * 0.8 + p.density) * 0.8;
                
                // Reset flake
                if(p.y > h) {
                    p.y = -10;
                    p.x = Math.random() * w;
                    p.vy = 1 + Math.random() * 2.5;
                }
            });
        } 
        else if (S.simWeather === 'windy') {
            // Draw wind vectors and flying leaves
            anim.particles.forEach(function(p) {
                if (p.type === 'windline') {
                    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.bezierCurveTo(p.x + 50, p.y + 10, p.x + 100, p.y - 10, p.x + 150, p.y);
                    ctx.stroke();
                    
                    p.x += p.vx;
                    if(p.x > w) {
                        p.x = -150;
                        p.y = Math.random() * h;
                    }
                } else { // leaf
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = 'rgba(245, 158, 11, 0.35)'; // orange-brown autumn leaf
                    
                    // Simple leaf oval geometry
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.size, p.size*0.4, 0, 0, Math.PI*2);
                    ctx.fill();
                    
                    // Leaf stem
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(-p.size, 0); ctx.lineTo(p.size, 0); ctx.stroke();
                    
                    ctx.restore();
                    
                    // Leaf physics
                    p.x += p.vx * 0.8;
                    p.y += p.vy + Math.sin(anim.t + p.size)*1.5;
                    p.rot += p.rotSp;
                    
                    if(p.x > w + 20) {
                        p.x = -20;
                        p.y = Math.random() * h;
                    }
                }
            });
        }
    }

    function exportContextualAd() {
        if(!window.JSZip) {
            window.showToast("JSZip is loading...");
            return;
        }

        document.getElementById('la-export').textContent = '📦 Packaging Campaign ZIP...';

        // Serialize rules & parameters
        var rulesStr = JSON.stringify(S.rules);
        var brandColor = S.brandColor;
        var logoData = S.bgImgData || '';

        var htmlSource = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Contextual Ad Banner</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #020617;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            margin: 0;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #banner {
            width: 300px;
            height: 250px;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 18px;
            box-sizing: border-box;
            background: linear-gradient(135deg, #0ea5e9, #38bdf8);
            transition: background 0.5s ease;
        }
        #weather-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 2;
        }
        #content {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
        }
        .btn-cta {
            background: ${brandColor};
            color: #ffffff;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 11px;
            cursor: pointer;
            box-shadow: 0 4px 10px ${brandColor}50;
        }
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 20px;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>

    <div id="banner">
        <canvas id="weather-canvas"></canvas>
        <div id="content">
            <div>
                <span id="badge" class="badge">☀️ LIVE AD ENVIRONMENT</span>
                <h2 id="headline" style="margin:10px 0 4px;font-size:17px;font-weight:900;line-height:1.2;">Checking environment...</h2>
                <p id="sub-msg" style="margin:0;font-size:10px;font-weight:500;">Targeted smart banner</p>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px dashed rgba(0,0,0,0.15);padding-top:10px;margin-top:5px;" id="bottom-bar">
                <div>
                    <span id="coupon-lbl" style="font-size:8px;display:block;font-weight:bold;">COUPON CODE:</span>
                    <span id="coupon-code" style="font-size:15px;font-family:monospace;font-weight:900;">WELCOME</span>
                </div>
                <button class="btn-cta" onclick="alert('Offer claimed!')">CLAIM DEALS →</button>
            </div>
        </div>
        ${logoData ? `<img src="${logoData}" style="position:absolute;top:15px;right:15px;width:35px;height:35px;object-fit:contain;opacity:0.8;">` : ''}
    </div>

    <script>
        var rules = ${rulesStr};
        var campaign = { weather: 'sunny', time: 'afternoon' };
        
        var canvas = document.getElementById('weather-canvas');
        canvas.width = 300; canvas.height = 250;
        var ctx = canvas.getContext('2d');
        var particles = [];
        var t = 0;

        function updateStyle(weather, time) {
            campaign.weather = weather;
            campaign.time = time;
            
            var banner = document.getElementById('banner');
            var headline = document.getElementById('headline');
            var badge = document.getElementById('badge');
            var subMsg = document.getElementById('sub-msg');
            var couponLbl = document.getElementById('coupon-lbl');
            var couponCode = document.getElementById('coupon-code');
            var bottomBar = document.getElementById('bottom-bar');
            
            // 1. Apply time gradients
            var bg = '';
            if(time === 'morning') bg = 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)';
            else if(time === 'afternoon') bg = 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)';
            else bg = 'linear-gradient(135deg, #0f172a 0%, #020617 100%)';
            banner.style.background = bg;
            
            // 2. Select rule (Night priority)
            var rule = rules.sunny;
            var icon = '☀️';
            if(time === 'night') {
                rule = rules.night; icon = '🌙';
            } else {
                if(weather === 'rainy') { rule = rules.rainy; icon = '🌧️'; }
                else if(weather === 'snowy') { rule = rules.snowy; icon = '❄️'; }
                else if(weather === 'windy') { rule = rules.windy; icon = '💨'; }
            }

            var isDark = (time === 'night');
            var colorText = isDark ? '#ffffff' : '#000000';
            var colorDesc = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
            
            headline.style.color = colorText;
            headline.innerText = rule.text;
            subMsg.style.color = colorDesc;
            couponLbl.style.color = colorDesc;
            couponCode.innerText = rule.code;
            couponCode.style.color = isDark ? '#e2e8f0' : '${brandColor}';
            
            badge.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
            badge.style.color = colorText;
            badge.innerText = icon + ' LIVE AD ENVIRONMENT';
            
            bottomBar.style.borderTopColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
            
            initParticles();
        }

        function initParticles() {
            particles = [];
            var w = canvas.width, h = canvas.height;
            if (campaign.weather === 'rainy') {
                for(var i=0; i<30; i++) particles.push({ x: Math.random()*w, y: Math.random()*h, vy: 7+Math.random()*5, len: 10+Math.random()*6 });
            } else if (campaign.weather === 'snowy') {
                for(var i=0; i<25; i++) particles.push({ x: Math.random()*w, y: Math.random()*h, vy: 0.8+Math.random()*1.5, size: 1.5+Math.random()*3, rotSp: Math.random()*20 });
            } else if (campaign.weather === 'windy') {
                for(var i=0; i<10; i++) particles.push({ x: Math.random()*w, y: Math.random()*h, vx: 4+Math.random()*4, size: 5+Math.random()*5, type: Math.random()>0.5?'leaf':'wind' });
            }
        }

        function draw() {
            requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.02;
            var w = canvas.width, h = canvas.height;
            
            if (campaign.weather === 'sunny') {
                ctx.fillStyle = 'rgba(253, 224, 71, 0.08)';
                for(var i=0; i<3; i++) {
                    var width = 15 + Math.sin(t + i)*8;
                    var angle = (Math.PI / 4) + (i * 0.15);
                    ctx.beginPath(); ctx.moveTo(w-30, 30);
                    ctx.lineTo(w-30 - Math.cos(angle)*300 - width, 30 + Math.sin(angle)*300);
                    ctx.lineTo(w-30 - Math.cos(angle)*300 + width, 30 + Math.sin(angle)*300);
                    ctx.fill();
                }
            } else if (campaign.weather === 'rainy') {
                ctx.strokeStyle = 'rgba(156, 163, 175, 0.35)'; ctx.lineWidth = 1.2;
                particles.forEach(function(p) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x-1.5, p.y+p.len); ctx.stroke();
                    p.y += p.vy; p.x -= 1.5;
                    if(p.y > h) { p.y = -20; p.x = Math.random()*(w+30); }
                });
            } else if (campaign.weather === 'snowy') {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                particles.forEach(function(p) {
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                    p.y += p.vy; p.x += Math.sin(t + p.rotSp)*0.5;
                    if(p.y > h) { p.y = -10; p.x = Math.random()*w; }
                });
            } else if (campaign.weather === 'windy') {
                particles.forEach(function(p) {
                    if(p.type === 'wind') {
                        ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x+80, p.y+5); ctx.stroke();
                        p.x += p.vx; if(p.x > w) { p.x = -80; p.y = Math.random()*h; }
                    } else {
                        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
                        ctx.beginPath(); ctx.ellipse(p.x, p.y, p.size, p.size*0.4, Math.sin(t)*0.2, 0, Math.PI*2); ctx.fill();
                        p.x += p.vx * 0.7; p.y += Math.sin(t + p.size)*0.8;
                        if(p.x > w + 10) { p.x = -10; p.y = Math.random()*h; }
                    }
                });
            }
        }

        // --- DYNAMIC DRIVERS (GEOLOCATION & TIME) ---
        var now = new Date();
        var hour = now.getHours();
        var month = now.getMonth(); // 0 = Jan, 11 = Dec
        
        // 1. Time evaluation
        var calculatedTime = 'afternoon';
        if (hour >= 6 && hour < 11) calculatedTime = 'morning';
        else if (hour >= 20 || hour < 6) calculatedTime = 'night';
        
        // 2. Weather evaluation based on seasonal fallbacks
        var calculatedWeather = 'sunny';
        if (month === 11 || month === 0 || month === 1) calculatedWeather = 'snowy'; // Dec-Feb
        else if (month === 2 || month === 3 || month === 4) calculatedWeather = 'windy'; // Mar-May (Spring)
        else if (month === 8 || month === 9 || month === 10) calculatedWeather = 'rainy'; // Sep-Nov (Autumn)

        // 3. Optional: Live fetch of local weather using free API (Open-Meteo) based on Geo IP or navigator GPS
        function tryLiveEnvironment() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                    var lat = pos.coords.latitude;
                    var lon = pos.coords.longitude;
                    
                    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true')
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                        var code = data.current_weather.weathercode;
                        var wState = 'sunny';
                        // Map WMO codes:
                        if (code >= 51 && code <= 67 || code >= 80 && code <= 82 || code >= 95) {
                            wState = 'rainy';
                        } else if (code >= 71 && code <= 77 || code >= 85 && code <= 86) {
                            wState = 'snowy';
                        } else if (code >= 1 && code <= 3 || code === 45 || code === 48) {
                            wState = 'windy';
                        }
                        updateStyle(wState, calculatedTime);
                    })
                    .catch(function() {
                        // fallback to seasonal guess
                        updateStyle(calculatedWeather, calculatedTime);
                    });
                }, function() {
                    // Geolocation denied, fallback to IP Geolocation API
                    fetchIPGeolocation();
                });
            } else {
                fetchIPGeolocation();
            }
        }

        function fetchIPGeolocation() {
            fetch('https://ipapi.co/json/')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                var lat = data.latitude;
                var lon = data.longitude;
                if(lat && lon) {
                    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true')
                    .then(function(res) { return res.json(); })
                    .then(function(wData) {
                        var code = wData.current_weather.weathercode;
                        var wState = 'sunny';
                        if (code >= 51 && code <= 67 || code >= 80 && code <= 82 || code >= 95) wState = 'rainy';
                        else if (code >= 71 && code <= 77 || code >= 85 && code <= 86) wState = 'snowy';
                        else if (code >= 1 && code <= 3 || code === 45 || code === 48) wState = 'windy';
                        updateStyle(wState, calculatedTime);
                    })
                    .catch(function() { updateStyle(calculatedWeather, calculatedTime); });
                } else {
                    updateStyle(calculatedWeather, calculatedTime);
                }
            })
            .catch(function() {
                updateStyle(calculatedWeather, calculatedTime);
            });
        }

        // Initialize
        tryLiveEnvironment();
        draw();

    </script>
</body>
</html>`;

        var zip = new JSZip();
        zip.file("smart_contextual_banner.html", htmlSource);
        zip.generateAsync({type:"blob"}).then(function(content) {
            var url = URL.createObjectURL(content);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'dynamic_weather_banner.zip';
            a.click();
            
            document.getElementById('la-export').textContent = '🌐 Export Smart Contextual Banner';
            window.showToast("Contextual Campaign ZIP Exported!");
            setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
        });
    }

})();
