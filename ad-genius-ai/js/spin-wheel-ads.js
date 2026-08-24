(function() {
    'use strict';
    var _prevRenderTab = window.renderTab;

    var S = {
        active: false, canvas: null, ctx: null, animId: null,
        titleText: 'SPIN TO WIN YOUR SPECIAL DISCOUNT!',
        brandColor: '#f97316',
        centerImgData: '',
        centerImg: null,
        // 6 segments pre-configured
        segments: [
            { text: '10% OFF', color: '#1e293b' },
            { text: 'FREE SHIPPING', color: '#f97316' },
            { text: 'TRY AGAIN', color: '#475569' },
            { text: '20% OFF', color: '#3b82f6' },
            { text: 'FREE GIFT', color: '#8b5cf6' },
            { text: '50% OFF!', color: '#ec4899' }
        ]
    };

    var game = {
        angle: 0,
        angularVelocity: 0,
        isSpinning: false,
        friction: 0.985,
        targetSegment: -1,
        tickerAngle: -Math.PI / 2, // Ticker is at the top
        tickerOffset: 0,
        lastSegmentIndex: -1,
        state: 'idle', // idle, spinning, won
        confetti: []
    };

    window.renderTab = function(tab) {
        if (tab === 'spin-wheel') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-spin-wheel');
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(function(el) { el.style.display = 'none'; });

            var ws = document.getElementById('spin-wheel-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('sw-center');
            var r = document.getElementById('sw-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';

            buildUI();
            initSpinWheel();
            return;
        }
        
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('sw-right');
        if (!r) return;

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#f97316;font-size:18px;">🎡 Spin Wheel Fortune</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Interactive Fortune Wheel Ad Studio</p>' +
            
            '<label style="font-size:11px;color:#ffedd5;font-weight:bold;">1. Campaign Title (Titlu Reclamă):</label>' +
            '<input type="text" id="sw-title" value="'+S.titleText+'" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:12px;">' +
            
            '<label style="font-size:11px;color:#ffedd5;font-weight:bold;margin-bottom:6px;display:block;">2. Edit Wheel Segments (Premii):</label>' +
            '<div style="max-height:180px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:15px;padding-right:5px;">';
            
        for(var i=0; i<6; i++) {
            html += '<div style="display:flex;align-items:center;gap:6px;">' +
                '<span style="font-size:11px;color:#94a3b8;width:15px;">'+(i+1)+'</span>' +
                '<input type="text" class="sw-seg-txt" data-idx="'+i+'" value="'+S.segments[i].text+'" style="flex:1;background:#1e293b;color:#fff;border:1px solid #334155;padding:6px;border-radius:4px;font-size:11px;">' +
                '<input type="color" class="sw-seg-col" data-idx="'+i+'" value="'+S.segments[i].color+'" style="border:none;background:transparent;cursor:pointer;width:30px;height:28px;">' +
                '</div>';
        }
            
        html += '</div>' +
            
            '<label style="font-size:11px;color:#ffedd5;font-weight:bold;">3. Brand Center Logo:</label>' +
            '<input type="file" id="sw-logo" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;margin-bottom:15px;">' +
            
            '<label style="font-size:11px;color:#ffedd5;font-weight:bold;">4. Main Accent Color:</label><br>' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">' +
                '<input type="color" id="sw-c" value="'+S.brandColor+'" style="border:none;background:transparent;cursor:pointer;width:40px;height:35px;">' +
                '<span style="font-size:11px;color:#94a3b8;">Pointer & Center Ring</span>' +
            '</div>' +
            
            '<button id="sw-spin" style="width:100%;background:#f97316;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 6px rgba(0,0,0,0.3);transition:0.2s;">⚡ Spin the Wheel</button>' +
            '<button id="sw-export" style="width:100%;background:linear-gradient(135deg,#e2e8f0,#94a3b8);color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.2);transition:0.2s;">🌐 Export Playable Wheel HTML</button>' +
            '</div>';

        r.innerHTML = html;

        // Listeners
        document.getElementById('sw-title').oninput = function(e){ S.titleText = e.target.value; };
        
        document.querySelectorAll('.sw-seg-txt').forEach(input => {
            input.oninput = function(e) {
                var idx = parseInt(e.target.dataset.idx);
                S.segments[idx].text = e.target.value;
            };
        });

        document.querySelectorAll('.sw-seg-col').forEach(input => {
            input.oninput = function(e) {
                var idx = parseInt(e.target.dataset.idx);
                S.segments[idx].color = e.target.value;
            };
        });

        document.getElementById('sw-c').oninput = function(e){ S.brandColor = e.target.value; };

        document.getElementById('sw-logo').onchange = function(e) {
            var f = e.target.files[0];
            if(!f) return;
            var rdr = new FileReader();
            rdr.onload = function(ev) {
                S.centerImgData = ev.target.result;
                var img = new Image();
                img.onload = function() { S.centerImg = img; };
                img.src = S.centerImgData;
            };
            rdr.readAsDataURL(f);
        };

        document.getElementById('sw-spin').onclick = function() {
            triggerSpin();
        };

        document.getElementById('sw-export').onclick = function() {
            exportSpinWheelAd();
        };
    }

    function triggerSpin() {
        if (game.isSpinning) return;
        game.isSpinning = true;
        game.state = 'spinning';
        game.confetti = [];
        // Set a high random initial velocity
        game.angularVelocity = 0.45 + Math.random() * 0.25;
    }

    function initSpinWheel() {
        if (S.active && S.canvas) return;
        S.active = true;

        var ct = document.getElementById('sw-center');
        if (!ct) return;
        ct.innerHTML = '';

        S.canvas = document.createElement('canvas');
        S.canvas.width = 460;
        S.canvas.height = 540;
        S.canvas.style.height = '90%';
        S.canvas.style.maxHeight = '650px';
        S.canvas.style.aspectRatio = '46 / 54';
        S.canvas.style.borderRadius = '16px';
        S.canvas.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6)';
        S.canvas.style.cursor = 'pointer';
        ct.appendChild(S.canvas);

        S.ctx = S.canvas.getContext('2d');

        // Allow clicking canvas directly to spin
        S.canvas.onclick = function() {
            triggerSpin();
        };

        // Confetti system
        function spawnConfetti() {
            for (var i = 0; i < 4; i++) {
                game.confetti.push({
                    x: Math.random() * S.canvas.width,
                    y: -10,
                    vx: (Math.random() - 0.5) * 3,
                    vy: 3 + Math.random() * 4,
                    size: 5 + Math.random() * 8,
                    color: 'hsl(' + (Math.random() * 360) + ', 100%, 60%)',
                    rot: Math.random() * Math.PI,
                    rotSp: (Math.random() - 0.5) * 0.05
                });
            }
        }

        // Loop
        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);

            updatePhysics(spawnConfetti);
            drawWheel();
        }
        loop();
    }

    function updatePhysics(spawnConfettiCallback) {
        if (game.isSpinning) {
            game.angle += game.angularVelocity;
            game.angularVelocity *= game.friction;

            // Simple ticking calculation
            var w = S.canvas.width;
            var numSegs = S.segments.length;
            var rawIndex = Math.floor(numSegs - (game.angle % (Math.PI * 2)) / (Math.PI * 2) * numSegs) % numSegs;
            if (rawIndex !== game.lastSegmentIndex) {
                game.lastSegmentIndex = rawIndex;
                game.tickerOffset = -15; // spring back effect
                
                // Play tick sound mock or flash lights
                if(window.AudioContext || window.webkitAudioContext) {
                    playTickSound();
                }
            }

            // Ticker recoil animation
            game.tickerOffset *= 0.85;

            // Stop condition
            if (game.angularVelocity < 0.0015) {
                game.angularVelocity = 0;
                game.isSpinning = false;
                game.state = 'won';
                game.targetSegment = rawIndex;
            }
        } else if (game.state === 'won') {
            spawnConfettiCallback();
            
            // Confetti physics
            game.confetti.forEach(function(p, idx) {
                p.y += p.vy;
                p.x += p.vx;
                p.rot += p.rotSp;
                if(p.y > S.canvas.height) {
                    game.confetti.splice(idx, 1);
                }
            });
        }
    }

    var audioCtx = null;
    function playTickSound() {
        try {
            if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if(audioCtx.state === 'suspended') audioCtx.resume();
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.frequency.setValueAtTime(450, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch(e) {}
    }

    function drawWheel() {
        var ctx = S.ctx;
        var w = S.canvas.width;
        var h = S.canvas.height;

        ctx.clearRect(0,0,w,h);

        // Gradient Background
        var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Header Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(S.titleText.toUpperCase(), w / 2, 45);

        // Wheel Dimensions
        var cx = w / 2;
        var cy = h / 2 + 20;
        var radius = 180;

        // 1. Draw outer glowing gold shadow & rim
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 15, 0, Math.PI*2);
        ctx.shadowColor = S.brandColor;
        ctx.shadowBlur = 35;
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.restore();

        // Rim border (Gold/Brand color)
        ctx.strokeStyle = S.brandColor;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 10, 0, Math.PI*2);
        ctx.stroke();

        // Draw light bulbs on the rim
        var lightCount = 18;
        for (var i = 0; i < lightCount; i++) {
            var lightAngle = (i * Math.PI * 2 / lightCount) + (game.isSpinning ? game.angle * 0.2 : 0);
            var lx = cx + Math.cos(lightAngle) * (radius + 10);
            var ly = cy + Math.sin(lightAngle) * (radius + 10);
            
            // Flashing lights logic (alternate)
            var isLit = Math.floor(Date.now() / 200) % 2 === i % 2;
            ctx.fillStyle = isLit ? '#fef08a' : '#78350f';
            ctx.beginPath();
            ctx.arc(lx, ly, 4, 0, Math.PI*2);
            ctx.fill();
            if (isLit) {
                ctx.save();
                ctx.shadowColor = '#fde047';
                ctx.shadowBlur = 8;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(lx, ly, 2, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        }

        // 2. Draw Wheel slices
        var numSegs = S.segments.length;
        var sliceAngle = Math.PI * 2 / numSegs;

        for (var i = 0; i < numSegs; i++) {
            var start = game.angle + i * sliceAngle;
            var end = start + sliceAngle;
            var seg = S.segments[i];

            // Wedge slice
            ctx.fillStyle = seg.color;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, start, end);
            ctx.closePath();
            ctx.fill();

            // Inner divider lines
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(start)*radius, cy + Math.sin(start)*radius);
            ctx.stroke();

            // Draw prize text inside slice
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(start + sliceAngle / 2);
            
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 13px "Inter", sans-serif';
            
            // Text shadow for readability
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 5;

            ctx.fillText(seg.text, radius - 25, 0);
            ctx.restore();
        }

        // 3. Draw Center Hub
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI*2);
        ctx.fillStyle = '#0f172a';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.strokeStyle = S.brandColor;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();

        // Logo inside center hub
        if (S.centerImg && S.centerImg.complete) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, 26, 0, Math.PI*2);
            ctx.clip();
            ctx.drawImage(S.centerImg, cx - 26, cy - 26, 52, 52);
            ctx.restore();
        } else {
            ctx.fillStyle = S.brandColor;
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🎁', cx, cy);
        }

        // 4. Draw pointer / ticker at top
        ctx.save();
        ctx.translate(cx, cy - radius - 12);
        // Ticker recoil rotate
        ctx.rotate(game.tickerOffset * Math.PI / 180);

        ctx.fillStyle = S.brandColor;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;

        // Draw pin triangle pointing downwards
        ctx.beginPath();
        ctx.moveTo(0, 20); // Tip pointing down
        ctx.lineTo(-14, -10);
        ctx.lineTo(14, -10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Ticker pin cap
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -10, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();

        // 5. Won popup overlay
        if (game.state === 'won' && game.targetSegment !== -1) {
            var wonPrize = S.segments[game.targetSegment].text;
            
            // Draw Confetti
            game.confetti.forEach(function(p) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            });

            // Modal box
            var mw = 340, mh = 140;
            var mx = w / 2 - mw / 2;
            var my = cy - mh / 2;

            ctx.save();
            ctx.fillStyle = 'rgba(15,23,42,0.95)';
            ctx.beginPath();
            ctx.roundRect(mx, my, mw, mh, 16);
            ctx.fill();

            ctx.strokeStyle = S.brandColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(mx, my, mw, mh, 16);
            ctx.stroke();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('CONGRATULATIONS! 🎉', w / 2, my + 45);

            ctx.font = '13px "Inter", sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText('You unlocked your exclusive offer:', w / 2, my + 75);

            ctx.fillStyle = S.brandColor;
            ctx.font = 'bold 24px "Inter", sans-serif';
            ctx.fillText(wonPrize, w / 2, my + 110);
            ctx.restore();
        } else if (game.state === 'idle') {
            // Draw prompt to click
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, h-45, w, 45);
            ctx.fillStyle = '#f97316';
            ctx.font = 'bold 12px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('👉 CLICK ON THE WHEEL OR THE SPIN BUTTON TO SPIN', w / 2, h - 18);
        }
    }

    function exportSpinWheelAd() {
        if (!window.JSZip) {
            window.showToast("JSZip is loading...");
            return;
        }

        document.getElementById('sw-export').textContent = '📦 Packaging Playable Wheel...';

        var segmentsJson = JSON.stringify(S.segments);
        var logoImgTag = S.centerImgData ? `var cImg = new Image(); cImg.src = "${S.centerImgData}";` : `var cImg = null;`;

        var standaloneJS = `
        (function() {
            var W = window.innerWidth, H = window.innerHeight;
            var canvas = document.createElement('canvas');
            canvas.width = 460; canvas.height = 540;
            canvas.style.position = 'absolute';
            canvas.style.top = '50%'; canvas.style.left = '50%';
            canvas.style.transform = 'translate(-50%, -50%)';
            canvas.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
            canvas.style.borderRadius = '16px';
            canvas.style.cursor = 'pointer';
            document.body.appendChild(canvas);
            
            var ctx = canvas.getContext('2d');
            var segments = ${segmentsJson};
            var brandColor = "${S.brandColor}";
            var titleText = "${S.titleText.replace(/"/g, '\\"')}";
            
            ${logoImgTag}

            var game = {
                angle: 0, angularVelocity: 0, isSpinning: false, friction: 0.985,
                targetSegment: -1, tickerOffset: 0, lastSegmentIndex: -1,
                state: 'idle', confetti: []
            };

            function triggerSpin() {
                if (game.isSpinning) return;
                game.isSpinning = true; game.state = 'spinning'; game.confetti = [];
                game.angularVelocity = 0.45 + Math.random() * 0.25;
            }

            canvas.onclick = triggerSpin;

            // Audio Context for sound ticking
            var audioCtx = null;
            function playTick() {
                try {
                    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    if(audioCtx.state === 'suspended') audioCtx.resume();
                    var osc = audioCtx.createOscillator();
                    var gain = audioCtx.createGain();
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.frequency.setValueAtTime(450, audioCtx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.05);
                    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
                    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
                } catch(e) {}
            }

            function loop() {
                requestAnimationFrame(loop);
                // Update
                if (game.isSpinning) {
                    game.angle += game.angularVelocity;
                    game.angularVelocity *= game.friction;
                    var numSegs = segments.length;
                    var rawIdx = Math.floor(numSegs - (game.angle % (Math.PI*2)) / (Math.PI*2) * numSegs) % numSegs;
                    if(rawIdx !== game.lastSegmentIndex) {
                        game.lastSegmentIndex = rawIdx; game.tickerOffset = -15; playTick();
                    }
                    game.tickerOffset *= 0.85;
                    if (game.angularVelocity < 0.0015) {
                        game.angularVelocity = 0; game.isSpinning = false; game.state = 'won'; game.targetSegment = rawIdx;
                    }
                } else if (game.state === 'won') {
                    for(var i=0; i<3; i++) {
                        game.confetti.push({
                            x: Math.random()*460, y:-10, vx: (Math.random()-0.5)*3, vy: 3 + Math.random()*4,
                            size: 5 + Math.random()*6, color: 'hsl('+(Math.random()*360)+', 100%, 50%)',
                            rot: Math.random()*Math.PI, rotSp: (Math.random()-0.5)*0.05
                        });
                    }
                    game.confetti.forEach(function(p, idx){
                        p.y += p.vy; p.x += p.vx; p.rot += p.rotSp;
                        if(p.y > 540) game.confetti.splice(idx, 1);
                    });
                }

                // Draw
                ctx.clearRect(0,0,460,540);
                var bg = ctx.createLinearGradient(0,0,0,540);
                bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#020617');
                ctx.fillStyle = bg; ctx.fillRect(0,0,460,540);

                ctx.fillStyle = '#ffffff'; ctx.font = 'bold 15px sans-serif'; ctx.textAlign='center';
                ctx.fillText(titleText.toUpperCase(), 230, 45);

                var cx = 230, cy = 290, radius = 180;
                
                // Shadow
                ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, radius+15, 0, Math.PI*2);
                ctx.shadowColor = brandColor; ctx.shadowBlur = 35; ctx.fillStyle = '#1e293b'; ctx.fill(); ctx.restore();

                // Rim
                ctx.strokeStyle = brandColor; ctx.lineWidth = 10;
                ctx.beginPath(); ctx.arc(cx, cy, radius+10, 0, Math.PI*2); ctx.stroke();

                var lightCount = 18;
                for (var i = 0; i < lightCount; i++) {
                    var lightAngle = (i * Math.PI * 2 / lightCount) + (game.isSpinning ? game.angle * 0.2 : 0);
                    var lx = cx + Math.cos(lightAngle)*(radius+10);
                    var ly = cy + Math.sin(lightAngle)*(radius+10);
                    var isLit = Math.floor(Date.now() / 200) % 2 === i % 2;
                    ctx.fillStyle = isLit ? '#fef08a' : '#78350f';
                    ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI*2); ctx.fill();
                }

                var numSegs = segments.length;
                var sliceAngle = Math.PI*2 / numSegs;
                for (var i=0; i<numSegs; i++) {
                    var start = game.angle + i*sliceAngle;
                    var end = start + sliceAngle;
                    ctx.fillStyle = segments[i].color;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, radius, start, end); ctx.closePath(); ctx.fill();

                    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(start)*radius, cy + Math.sin(start)*radius); ctx.stroke();

                    ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + sliceAngle/2);
                    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.font = 'bold 13px sans-serif';
                    ctx.fillText(segments[i].text, radius - 25, 0); ctx.restore();
                }

                ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI*2); ctx.fillStyle = '#0f172a'; ctx.fill();
                ctx.strokeStyle = brandColor; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();

                if (cImg && cImg.complete) {
                    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI*2); ctx.clip();
                    ctx.drawImage(cImg, cx-26, cy-26, 52, 52); ctx.restore();
                } else {
                    ctx.fillStyle = brandColor; ctx.font = '24px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('🎁', cx, cy);
                }

                // Ticker
                ctx.save(); ctx.translate(cx, cy - radius - 12); ctx.rotate(game.tickerOffset * Math.PI / 180);
                ctx.fillStyle = brandColor; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(-14, -10); ctx.lineTo(14, -10); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.restore();

                if (game.state === 'won') {
                    game.confetti.forEach(function(p){
                        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color; ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size); ctx.restore();
                    });
                    var mw = 340, mh = 140;
                    ctx.fillStyle = 'rgba(15,23,42,0.95)'; ctx.beginPath(); ctx.roundRect(cx-mw/2, cy-mh/2, mw, mh, 16); ctx.fill();
                    ctx.strokeStyle = brandColor; ctx.lineWidth = 3; ctx.strokeRect(cx-mw/2, cy-mh/2, mw, mh);
                    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 20px sans-serif'; ctx.textAlign='center'; ctx.fillText('CONGRATULATIONS! 🎉', cx, cy-mh/2+45);
                    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '13px sans-serif'; ctx.fillText('You unlocked your exclusive offer:', cx, cy-mh/2+75);
                    ctx.fillStyle = brandColor; ctx.font = 'bold 24px sans-serif'; ctx.fillText(segments[game.targetSegment].text, cx, cy-mh/2+110);
                } else if (game.state === 'idle') {
                    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 540-45, 460, 45);
                    ctx.fillStyle = '#f97316'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign='center'; ctx.fillText('👉 CLICK ANYWHERE ON THE BOARD TO SPIN THE WHEEL', 230, 540-18);
                }
            }
            loop();
        })();
        `;

        var fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Spin to Win Playable Ad</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #020617;
            overflow: hidden;
            touch-action: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
        }
    </style>
</head>
<body>
    <script>${standaloneJS}</script>
    <div style="position:fixed;bottom:12px;left:50%;transform:translateX(-50%);font-size:11px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;opacity:0.75;z-index:99;">
        <a href="https://ia-codestudio.com" target="_blank" rel="noopener" style="color:#94a3b8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;background:rgba(15,23,42,0.7);padding:4px 10px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);">⚡ Powered by <span style="color:#38bdf8;font-weight:600;">IA Code Studio</span></a>
    </div>
</body>
</html>`;

        var zip = new JSZip();
        zip.file("spin_wheel_ad.html", fullHtml);
        zip.generateAsync({type:"blob"}).then(function(content) {
            var url = URL.createObjectURL(content);
            var a = document.createElement('a'); 
            a.href = url; 
            a.download = 'spin_wheel_playable_ad.zip'; 
            a.click();
            
            document.getElementById('sw-export').textContent = '🌐 Export Playable Wheel HTML';
            window.showToast("Spin Wheel Ad ZIP Exported!");
            setTimeout(function(){ URL.revokeObjectURL(url); }, 2500);
        });
    }

})();
