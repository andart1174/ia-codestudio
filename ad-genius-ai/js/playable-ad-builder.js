(function() {
    'use strict';
    var _prevRenderTab = window.renderTab;
    var S = {
        active: false, canvas: null, ctx: null, animId: null,
        customImg: null, customImgData: '',
        productType: 'food', // food, drink, fashion, tech, gaming, custom
        gameMode: 'slicer',  // slicer, catcher, bubble
        brandColor: '#10b981',
        titleText: 'INTERACTIVE PLAYABLE AD',
        discountCode: 'SUPERDEAL50'
    };

    var emojis = {
        food: '🍔',
        drink: '🥤',
        fashion: '👟',
        tech: '📱',
        gaming: '🎮'
    };

    var game = {
        state: 'play', // play, win
        score: 0,
        targetScore: 5,
        items: [],
        trail: [],
        particles: [],
        catcherX: 200,
        catcherWidth: 90,
        catcherHeight: 25,
        isScratching: false,
        scratchCanvas: null,
        scratchCtx: null,
        scratchPercent: 0,
        scratchFade: 1.0,
        winParticles: []
    };

    window.renderTab = function(tab) {
        if (tab === 'playable-ad-builder') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.right-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.workspace').forEach(function(w) { w.style.display = 'none'; });

            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('pab-center');
            var r = document.getElementById('pab-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';

            buildUI();
            initGame();
            return;
        }
        
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('pab-right');
        if (!r) return;

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#10b981;font-size:18px;">🕹️ Playable Ad Builder</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Interactive HTML5 Mini-Game Generator</p>' +
            
            '<label style="font-size:11px;color:#6ee7b7;font-weight:bold;">1. Select Game Mode (Mod Joc):</label>' +
            '<select id="pab-mode" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;outline:none;">' +
                '<option value="slicer" '+(S.gameMode==='slicer'?'selected':'')+'>🍒 Product Slicer (Ninja)</option>' +
                '<option value="catcher" '+(S.gameMode==='catcher'?'selected':'')+'>📥 Product Catcher (Falling)</option>' +
                '<option value="bubble" '+(S.gameMode==='bubble'?'selected':'')+'>🫧 Bubble Pop (Floating)</option>' +
            '</select>' +
            
            '<label style="font-size:11px;color:#6ee7b7;font-weight:bold;">2. Product Type (Tip Produs):</label>' +
            '<select id="pab-prod-type" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;outline:none;">' +
                '<option value="food" '+(S.productType==='food'?'selected':'')+'>🍔 Fast Food (Burger)</option>' +
                '<option value="drink" '+(S.productType==='drink'?'selected':'')+'>🥤 Drinks (Cup)</option>' +
                '<option value="fashion" '+(S.productType==='fashion'?'selected':'')+'>👟 Fashion (Shoe)</option>' +
                '<option value="tech" '+(S.productType==='tech'?'selected':'')+'>📱 Technology (Phone)</option>' +
                '<option value="gaming" '+(S.productType==='gaming'?'selected':'')+'>🎮 Gaming (Controller)</option>' +
                '<option value="custom" '+(S.productType==='custom'?'selected':'')+'>🖼️ Upload Custom Image</option>' +
            '</select>' +
            
            '<div id="pab-custom-upload-wrap" style="display:'+(S.productType==='custom'?'block':'none')+';margin-bottom:12px;">' +
                '<label style="font-size:11px;color:#94a3b8;">Upload Product Graphic:</label>' +
                '<input type="file" id="pab-f" accept="image/*" style="width:100%;font-size:11px;color:#94a3b8;margin-top:4px;">' +
            '</div>' +
            
            '<label style="font-size:11px;color:#6ee7b7;font-weight:bold;">3. Brand Text & Code:</label>' +
            '<input type="text" id="pab-t" value="'+S.titleText+'" placeholder="Game Headline" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:12px;">' +
            '<input type="text" id="pab-code" value="'+S.discountCode+'" placeholder="Promo Code" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-weight:bold;text-transform:uppercase;">' +
            
            '<label style="font-size:11px;color:#6ee7b7;font-weight:bold;">4. Customize Style:</label><br>' +
            '<div style="display:flex;align-items:center;gap:10px;margin-bottom:15px;">' +
                '<input type="color" id="pab-c" value="'+S.brandColor+'" style="border:none;background:transparent;cursor:pointer;width:40px;height:35px;">' +
                '<span style="font-size:11px;color:#94a3b8;">Primary Brand Color</span>' +
            '</div>' +
            
            '<button id="pab-reset" style="width:100%;background:#334155;color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer;margin-bottom:10px;font-size:12px;font-weight:bold;transition:0.2s;">🔄 Restart Game Preview</button>' +
            '<button id="pab-exp-html" style="width:100%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.3);transition:0.2s;">🌐 Export Playable HTML</button>' +
            '<div id="pab-st" style="margin-top:15px;font-size:11px;text-align:center;color:#10b981;font-weight:bold;">Game Preview Active</div>' +
            '</div>';

        r.innerHTML = html;
        
        // Listeners
        document.getElementById('pab-mode').onchange = function(e){
            S.gameMode = e.target.value;
            if(S.gameMode === 'slicer') S.titleText = 'SLICE THE PRODUCTS TO WIN!';
            else if(S.gameMode === 'catcher') S.titleText = 'CATCH 5 ITEMS TO WIN!';
            else S.titleText = 'POP THE PRODUCT BUBBLES!';
            document.getElementById('pab-t').value = S.titleText;
            initGameParams();
        };
        
        document.getElementById('pab-prod-type').onchange = function(e){
            S.productType = e.target.value;
            var uploadWrap = document.getElementById('pab-custom-upload-wrap');
            if(S.productType === 'custom') {
                uploadWrap.style.display = 'block';
            } else {
                uploadWrap.style.display = 'none';
                S.customImg = null;
                S.customImgData = '';
            }
            initGameParams();
        };

        document.getElementById('pab-t').oninput = function(e){ S.titleText = e.target.value; };
        document.getElementById('pab-code').oninput = function(e){ S.discountCode = e.target.value.toUpperCase(); };
        document.getElementById('pab-c').oninput = function(e){ 
            S.brandColor = e.target.value; 
            document.getElementById('pab-st').style.color = S.brandColor;
        };
        
        var fileInput = document.getElementById('pab-f');
        if(fileInput) {
            fileInput.onchange = function(e) {
                var f = e.target.files[0];
                if(!f) return;
                var rdr = new FileReader();
                rdr.onload = function(ev) {
                    var img = new Image();
                    img.onload = function() { 
                        S.customImg = img; 
                        S.customImgData = ev.target.result;
                        initGameParams();
                    };
                    img.src = ev.target.result;
                };
                rdr.readAsDataURL(f);
            };
        }
        
        document.getElementById('pab-reset').onclick = function() { 
            initGameParams(); 
            window.showToast("Game Reset!");
        };
        
        document.getElementById('pab-exp-html').onclick = function() {
            exportPlayableGame();
        };
    }

    function initGameParams() {
        game.state = 'play';
        game.score = 0;
        game.items = [];
        game.trail = [];
        game.particles = [];
        game.winParticles = [];
        game.scratchPercent = 0;
        game.scratchFade = 1.0;
        game.isScratching = false;

        var W = S.canvas ? S.canvas.width : 400;
        var H = S.canvas ? S.canvas.height : 600;

        if (S.gameMode === 'slicer') {
            for(var i=0; i<3; i++) {
                spawnItem(W, H, true);
            }
        } else if (S.gameMode === 'catcher') {
            game.catcherX = W / 2;
            for(var i=0; i<2; i++) {
                spawnItem(W, H, false);
                game.items[i].y = Math.random() * (H / 2); // Spread them out initially
            }
        } else { // bubble
            for(var i=0; i<3; i++) {
                spawnItem(W, H, false);
                game.items[i].y = H - Math.random() * H;
            }
        }
        
        // Reset Scratch Canvas if in win state
        if (game.scratchCanvas) {
            fillScratchCanvas();
        }
    }

    function spawnItem(W, H, bottomLaunch) {
        var size = 40;
        var item = {
            id: Math.random(),
            x: size + Math.random() * (W - size * 2),
            y: bottomLaunch ? H + 50 : -50,
            vx: bottomLaunch ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 3,
            vy: bottomLaunch ? -14 - Math.random() * 8 : 2 + Math.random() * 4,
            size: size,
            active: true,
            rot: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.1,
            pulse: Math.random() * Math.PI
        };
        
        // Mode Bubble: floats up slowly
        if (S.gameMode === 'bubble') {
            item.y = H + 50;
            item.vy = -1.5 - Math.random() * 2;
            item.vx = (Math.random() - 0.5) * 2;
            item.bubbleRadius = 25 + Math.random() * 10;
        }

        game.items.push(item);
    }

    function spawnParticles(x, y, color) {
        for(var i=0; i<15; i++) {
            game.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                size: 3 + Math.random() * 6,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03,
                color: color || S.brandColor
            });
        }
    }

    function spawnWinConfetti(W, H) {
        for(var i=0; i<3; i++) {
            game.winParticles.push({
                x: Math.random() * W,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: 3 + Math.random() * 5,
                size: 5 + Math.random() * 8,
                color: 'hsl(' + (Math.random() * 360) + ', 100%, 60%)',
                rot: Math.random() * Math.PI,
                rotSp: (Math.random() - 0.5) * 0.1
            });
        }
    }

    function fillScratchCanvas() {
        if (!game.scratchCanvas) return;
        var w = game.scratchCanvas.width;
        var h = game.scratchCanvas.height;
        var ctx = game.scratchCtx;

        ctx.globalCompositeOperation = 'source-over';
        
        // Metallic silver gradient background
        var grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#e2e8f0');
        grad.addColorStop(0.3, '#cbd5e1');
        grad.addColorStop(0.5, '#94a3b8');
        grad.addColorStop(0.7, '#cbd5e1');
        grad.addColorStop(1, '#94a3b8');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Pattern overlays
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        for(var i=0; i<w; i+=20) {
            ctx.fillRect(i, 0, 2, h);
        }
        for(var j=0; j<h; j+=20) {
            ctx.fillRect(0, j, w, 2);
        }

        // Silver border
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 6;
        ctx.strokeRect(10, 10, w - 20, h - 20);

        // Call to action text
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 20px "Inter", sans-serif';
        ctx.fillText('👋 SCRATCH OFF HERE', w / 2, h / 2 - 15);
        ctx.font = 'bold 12px "Inter", sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('Rub with your cursor or finger!', w / 2, h / 2 + 15);
    }

    function setupScratchCanvas(w, h) {
        if (!game.scratchCanvas) {
            game.scratchCanvas = document.createElement('canvas');
        }
        game.scratchCanvas.width = w;
        game.scratchCanvas.height = h;
        game.scratchCtx = game.scratchCanvas.getContext('2d');
        fillScratchCanvas();
    }

    function calculateScratchPercent() {
        if (!game.scratchCanvas) return;
        var w = game.scratchCanvas.width;
        var h = game.scratchCanvas.height;
        var imgData = game.scratchCtx.getImageData(0, 0, w, h);
        var pixels = imgData.data;
        var total = pixels.length / 4;
        var transparent = 0;
        
        // Sample 1 in every 20 pixels to keep it fast
        for (var i = 0; i < pixels.length; i += 80) {
            if (pixels[i + 3] === 0) { // Alpha channel is 0
                transparent++;
            }
        }
        
        var sampledTotal = total / 20;
        game.scratchPercent = (transparent / sampledTotal) * 100;
    }

    function scratchAt(x, y, radius) {
        if (!game.scratchCanvas) return;
        var ctx = game.scratchCtx;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        calculateScratchPercent();
    }

    function initGame() {
        if (S.active) return;
        S.active = true;
        
        var ct = document.getElementById('pab-center');
        if (!ct) return;
        ct.innerHTML = '';
        
        S.canvas = document.createElement('canvas');
        S.canvas.width = 400; S.canvas.height = 600; // Mobile Portrait aspect ratio
        S.canvas.style.height = '100%'; 
        S.canvas.style.maxHeight = '700px';
        S.canvas.style.aspectRatio = '2 / 3';
        S.canvas.style.boxShadow = '0 15px 40px rgba(0,0,0,0.6)';
        S.canvas.style.borderRadius = '16px';
        S.canvas.style.cursor = 'crosshair';
        ct.appendChild(S.canvas);
        
        S.ctx = S.canvas.getContext('2d');
        
        // Setup Scratch Card overlay dimensions
        setupScratchCanvas(320, 150);
        initGameParams();

        // Mouse and Touch Events
        function getCanvasCoords(e) {
            var rect = S.canvas.getBoundingClientRect();
            var scaleX = S.canvas.width / rect.width;
            var scaleY = S.canvas.height / rect.height;
            var clientX = e.touches ? e.touches[0].clientX : e.clientX;
            var clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function handlePointerStart(e) {
            var coords = getCanvasCoords(e);
            
            if (game.state === 'play') {
                if (S.gameMode === 'catcher') {
                    game.catcherX = coords.x;
                } else if (S.gameMode === 'bubble') {
                    game.items.forEach(function(b) {
                        if (b.active && Math.hypot(b.x - coords.x, b.y - coords.y) < b.bubbleRadius + 15) {
                            b.active = false;
                            game.score++;
                            spawnParticles(b.x, b.y, S.brandColor);
                            if (game.score >= game.targetScore) triggerWinState();
                        }
                    });
                }
            } else if (game.state === 'win' && game.scratchFade === 1.0) {
                // Check if scratch card was clicked
                var scX = (S.canvas.width - game.scratchCanvas.width) / 2;
                var scY = 320;
                if (coords.x >= scX && coords.x <= scX + game.scratchCanvas.width &&
                    coords.y >= scY && coords.y <= scY + game.scratchCanvas.height) {
                    game.isScratching = true;
                    scratchAt(coords.x - scX, coords.y - scY, 25);
                }
            }
        }

        function handlePointerMove(e) {
            var coords = getCanvasCoords(e);
            
            if (game.state === 'play') {
                if (S.gameMode === 'slicer') {
                    game.trail.push({x: coords.x, y: coords.y, life: 1.0});
                    
                    // Slice hit check
                    game.items.forEach(function(b) {
                        if (b.active && Math.hypot(b.x - coords.x, b.y - coords.y) < b.size) {
                            b.active = false;
                            game.score++;
                            spawnParticles(b.x, b.y, S.brandColor);
                            if (game.score >= game.targetScore) triggerWinState();
                        }
                    });
                } else if (S.gameMode === 'catcher') {
                    game.catcherX = coords.x;
                }
            } else if (game.state === 'win' && game.isScratching) {
                var scX = (S.canvas.width - game.scratchCanvas.width) / 2;
                var scY = 320;
                scratchAt(coords.x - scX, coords.y - scY, 25);
            }
        }

        function handlePointerEnd() {
            game.isScratching = false;
        }

        // Bind events
        S.canvas.addEventListener('mousedown', handlePointerStart);
        S.canvas.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerEnd);

        S.canvas.addEventListener('touchstart', function(e) { e.preventDefault(); handlePointerStart(e); }, { passive: false });
        S.canvas.addEventListener('touchmove', function(e) { e.preventDefault(); handlePointerMove(e); }, { passive: false });
        S.canvas.addEventListener('touchend', handlePointerEnd);

        function triggerWinState() {
            game.state = 'win';
            fillScratchCanvas();
        }

        // Main Loop
        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);
            
            updatePhysics();
            drawGame();
        }
        loop();
    }

    function updatePhysics() {
        var w = S.canvas.width, h = S.canvas.height;
        
        if (game.state === 'play') {
            // Update items
            game.items.forEach(function(b) {
                if (!b.active) return;
                
                b.x += b.vx;
                b.y += b.vy;
                b.rot += b.rotSpeed;

                if (S.gameMode === 'slicer') {
                    b.vy += 0.35; // gravity
                    // Recycle fallen items
                    if (b.y > h + 100) {
                        b.y = h + 100;
                        b.vy = -14 - Math.random() * 8;
                        b.vx = (Math.random() - 0.5) * 8;
                    }
                } else if (S.gameMode === 'catcher') {
                    // Falls from top
                    if (b.y > h + 50) {
                        b.y = -50;
                        b.x = b.size + Math.random() * (w - b.size * 2);
                        b.vy = 2 + Math.random() * 3;
                    }
                    
                    // Collision check with catcher basket
                    var basketY = h - 60;
                    if (b.y + b.size / 2 >= basketY && b.y - b.size / 2 <= basketY + game.catcherHeight &&
                        b.x + b.size / 2 >= game.catcherX - game.catcherWidth / 2 &&
                        b.x - b.size / 2 <= game.catcherX + game.catcherWidth / 2) {
                        b.active = false;
                        game.score++;
                        spawnParticles(b.x, b.y, S.brandColor);
                        if (game.score >= game.targetScore) game.state = 'win';
                        else spawnItem(w, h, false);
                    }
                } else if (S.gameMode === 'bubble') {
                    // Floats up
                    if (b.y < -50) {
                        b.y = h + 50;
                        b.x = b.bubbleRadius + Math.random() * (w - b.bubbleRadius * 2);
                        b.vy = -1.5 - Math.random() * 2;
                    }
                }
            });

            // Filter out inactive items to spawn replacements
            if (S.gameMode !== 'catcher') {
                for (var i = 0; i < game.items.length; i++) {
                    if (!game.items[i].active) {
                        game.items.splice(i, 1);
                        i--;
                        spawnItem(w, h, S.gameMode === 'slicer');
                    }
                }
            }
        } else if (game.state === 'win') {
            // Win Confetti
            spawnWinConfetti(w, h);
            
            // Fade out scratch card if scratched
            if (game.scratchPercent >= 55 && game.scratchFade > 0) {
                game.scratchFade -= 0.05;
                if(game.scratchFade < 0) game.scratchFade = 0;
            }
            
            // Update win confetti particles
            game.winParticles.forEach(function(p) {
                p.y += p.vy;
                p.x += p.vx;
                p.rot += p.rotSp;
                if(p.y > h) {
                    p.y = -10;
                    p.x = Math.random() * w;
                }
            });
        }

        // Update standard slice particles
        game.particles.forEach(function(p, idx) {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            if(p.life <= 0) {
                game.particles.splice(idx, 1);
            }
        });
    }

    function drawGame() {
        var w = S.canvas.width, h = S.canvas.height;
        var ctx = S.ctx;
        
        // Background Dark Gradient
        var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
        
        // Brand background image overlay (low opacity)
        if(S.customImg && S.customImg.complete) {
            var r = Math.max(w/S.customImg.width, h/S.customImg.height);
            ctx.globalAlpha = 0.15;
            ctx.drawImage(S.customImg, (w-S.customImg.width*r)/2, (h-S.customImg.height*r)/2, S.customImg.width*r, S.customImg.height*r);
            ctx.globalAlpha = 1;
        }

        // Grid Design Lines
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for (var x = 0; x < w; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (var y = 0; y < h; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Render gameplay elements
        if (game.state === 'play') {
            // Draw Items
            game.items.forEach(function(b) {
                if(!b.active) return;
                
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.rot);
                
                if (S.gameMode === 'bubble') {
                    // Bubble glow & shell
                    var glow = ctx.createRadialGradient(0, 0, b.bubbleRadius - 5, 0, 0, b.bubbleRadius + 5);
                    glow.addColorStop(0, 'rgba(255,255,255,0.1)');
                    glow.addColorStop(0.8, 'rgba(255,255,255,0.4)');
                    glow.addColorStop(1, S.brandColor);
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(0, 0, b.bubbleRadius, 0, Math.PI*2);
                    ctx.fill();
                    
                    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    
                    // Bubble shine dot
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(-b.bubbleRadius*0.3, -b.bubbleRadius*0.3, 4, 0, Math.PI*2);
                    ctx.fill();
                }

                // Draw product sprite (Image or Emoji)
                if (S.customImg && S.customImg.complete) {
                    var imgSize = S.gameMode === 'bubble' ? b.bubbleRadius * 1.2 : b.size;
                    ctx.drawImage(S.customImg, -imgSize/2, -imgSize/2, imgSize, imgSize);
                } else {
                    var emojiText = emojis[S.productType] || '🍔';
                    ctx.font = (S.gameMode === 'bubble' ? b.bubbleRadius*1.1 : b.size * 0.9) + 'px "Segoe UI Emoji"';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(emojiText, 0, 0);
                }
                
                ctx.restore();
            });

            // Draw Catcher Basket
            if (S.gameMode === 'catcher') {
                ctx.save();
                ctx.translate(game.catcherX, h - 60);
                
                // Draw Catcher base
                ctx.fillStyle = S.brandColor;
                ctx.beginPath();
                ctx.roundRect(-game.catcherWidth/2, 0, game.catcherWidth, game.catcherHeight, 8);
                ctx.fill();
                
                // Catcher basket net
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.fillRect(-game.catcherWidth/2 + 5, game.catcherHeight, game.catcherWidth - 10, 15);
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(-game.catcherWidth/2 + 5, game.catcherHeight, game.catcherWidth - 10, 15);
                
                // Draw basket emoji/design
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('📥 BRAND BASKET', 0, 16);
                
                ctx.restore();
            }

            // Draw header HUD (Neon style)
            ctx.fillStyle = 'rgba(15,23,42,0.8)';
            ctx.fillRect(0, 0, w, 100);
            ctx.strokeStyle = S.brandColor;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, 100); ctx.lineTo(w, 100); ctx.stroke();
            
            // Title
            ctx.fillStyle = '#ffffff';
            ctx.font = '800 15px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(S.titleText.toUpperCase(), w / 2, 40);
            
            // Target Score & Current Score HUD
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = '12px "Inter", sans-serif';
            ctx.fillText('SCORE TO GET REWARD:', w/2 - 30, 75);
            
            ctx.fillStyle = S.brandColor;
            ctx.font = 'bold 20px monospace';
            ctx.fillText(game.score + ' / ' + game.targetScore, w/2 + 75, 75);

            // Draw Slicer Trail
            if (S.gameMode === 'slicer' && game.trail.length > 1) {
                ctx.beginPath();
                for (var i = 0; i < game.trail.length; i++) {
                    var t = game.trail[i];
                    t.life -= 0.08;
                    if(t.life <= 0) {
                        game.trail.splice(i, 1);
                        i--;
                        continue;
                    }
                    ctx.lineWidth = t.life * 8;
                    ctx.strokeStyle = S.brandColor;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    if (i === 0) ctx.moveTo(t.x, t.y);
                    else ctx.lineTo(t.x, t.y);
                }
                ctx.stroke();
            }

        } else if (game.state === 'win') {
            // Draw Win Confetti falling
            game.winParticles.forEach(function(p) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            });

            // Draw Glowing Gift Box
            ctx.fillStyle = '#ffffff';
            ctx.font = '80px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('🎁', w/2, 180);

            // Win Header
            ctx.fillStyle = S.brandColor;
            ctx.font = 'bold 26px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('GOAL ACHIEVED!', w/2, 260);

            ctx.fillStyle = '#ffffff';
            ctx.font = '14px "Inter", sans-serif';
            ctx.fillText('Unlock your special reward below!', w/2, 290);

            // Prize / Voucher Area Underneath Scratch Card
            var scX = (w - game.scratchCanvas.width) / 2;
            var scY = 320;
            
            // Voucher design
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.roundRect(scX, scY, game.scratchCanvas.width, game.scratchCanvas.height, 12);
            ctx.fill();
            ctx.strokeStyle = S.brandColor;
            ctx.lineWidth = 3;
            ctx.stroke();

            // Dashed coupon box
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(scX + 15, scY + 15, game.scratchCanvas.width - 30, game.scratchCanvas.height - 30);
            ctx.setLineDash([]); // reset

            // Voucher Content
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 11px "Inter", sans-serif';
            ctx.fillText('VOUCHER CODE ACTIVATED', w / 2, scY + 40);
            
            ctx.fillStyle = S.brandColor;
            ctx.font = 'bold 32px monospace';
            ctx.fillText(S.discountCode, w / 2, scY + 85);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px "Inter", sans-serif';
            ctx.fillText('Use code at checkout to claim!', w / 2, scY + 122);

            // Render Scratch Card Layer on Top with fading
            if (game.scratchFade > 0) {
                ctx.save();
                ctx.globalAlpha = game.scratchFade;
                ctx.drawImage(game.scratchCanvas, scX, scY);
                ctx.restore();
            } else {
                // Glow text under scratched card
                ctx.fillStyle = 'rgba(16,185,129,0.15)';
                ctx.fillRect(scX, scY, game.scratchCanvas.width, game.scratchCanvas.height);
            }
        }

        // Draw hit/slice particles
        game.particles.forEach(function(p) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fill();
        });
    }

    function exportPlayableGame() {
        if (!window.JSZip) {
            window.showToast('JSZip is loading...');
            return;
        }

        document.getElementById('pab-st').textContent = '📦 Packaging Playable Game...';

        var imgTagStr = S.customImgData ? `var pImg = new Image(); pImg.src = "${S.customImgData}";` : `var pImg = null;`;
        
        var standaloneJS = `
        (function() {
            var W = window.innerWidth, H = window.innerHeight;
            var canvas = document.createElement('canvas');
            canvas.width = 400; canvas.height = 600;
            canvas.style.position = 'absolute';
            canvas.style.top = '50%'; canvas.style.left = '50%';
            canvas.style.transform = 'translate(-50%, -50%)';
            canvas.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
            canvas.style.borderRadius = '16px';
            canvas.style.cursor = 'crosshair';
            document.body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var emojis = ${JSON.stringify(emojis)};
            var productType = "${S.productType}";
            var gameMode = "${S.gameMode}";
            var brandColor = "${S.brandColor}";
            var titleText = "${S.titleText.replace(/"/g, '\\"')}";
            var discountCode = "${S.discountCode}";
            
            ${imgTagStr}

            var game = {
                state: 'play', score: 0, targetScore: 5, items: [], trail: [], particles: [],
                catcherX: 200, catcherWidth: 90, catcherHeight: 25,
                isScratching: false, winParticles: [],
                scratchCanvas: document.createElement('canvas'), scratchCtx: null,
                scratchPercent: 0, scratchFade: 1.0
            };
            game.scratchCanvas.width = 320; game.scratchCanvas.height = 150;
            game.scratchCtx = game.scratchCanvas.getContext('2d');

            function fillScratch() {
                var w = game.scratchCanvas.width, h = game.scratchCanvas.height;
                var gCtx = game.scratchCtx;
                gCtx.globalCompositeOperation = 'source-over';
                var grad = gCtx.createLinearGradient(0, 0, w, h);
                grad.addColorStop(0, '#e2e8f0'); grad.addColorStop(0.3, '#cbd5e1');
                grad.addColorStop(0.5, '#94a3b8'); grad.addColorStop(0.7, '#cbd5e1'); grad.addColorStop(1, '#94a3b8');
                gCtx.fillStyle = grad; gCtx.fillRect(0, 0, w, h);
                gCtx.fillStyle = 'rgba(255,255,255,0.15)';
                for(var i=0; i<w; i+=20) gCtx.fillRect(i, 0, 2, h);
                for(var j=0; j<h; j+=20) gCtx.fillRect(0, j, w, 2);
                gCtx.strokeStyle = 'rgba(0,0,0,0.15)'; gCtx.lineWidth = 6; gCtx.strokeRect(10, 10, w - 20, h - 20);
                gCtx.fillStyle = '#1e293b'; gCtx.textAlign = 'center'; gCtx.textBaseline = 'middle';
                gCtx.font = 'bold 20px sans-serif'; gCtx.fillText('👋 SCRATCH OFF HERE', w / 2, h / 2 - 15);
                gCtx.font = 'bold 12px sans-serif'; gCtx.fillStyle = '#475569'; gCtx.fillText('Rub with your cursor or finger!', w / 2, h / 2 + 15);
            }
            fillScratch();

            function spawnItem() {
                var size = 40;
                var item = {
                    id: Math.random(),
                    x: size + Math.random() * (400 - size * 2),
                    y: gameMode==='slicer' ? 650 : -50,
                    vx: gameMode==='slicer' ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 3,
                    vy: gameMode==='slicer' ? -14 - Math.random() * 8 : 2 + Math.random() * 4,
                    size: size, active: true, rot: Math.random() * Math.PI, rotSpeed: (Math.random() - 0.5) * 0.1
                };
                if (gameMode === 'bubble') {
                    item.y = 650; item.vy = -1.5 - Math.random() * 2; item.vx = (Math.random() - 0.5) * 2;
                    item.bubbleRadius = 25 + Math.random() * 10;
                }
                game.items.push(item);
            }

            function spawnParticles(x, y) {
                for(var i=0; i<15; i++) {
                    game.particles.push({
                        x: x, y: y, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                        size: 3 + Math.random() * 6, life: 1.0, decay: 0.02 + Math.random() * 0.03
                    });
                }
            }

            function scratchAt(x, y) {
                var sCtx = game.scratchCtx;
                sCtx.globalCompositeOperation = 'destination-out';
                sCtx.beginPath(); sCtx.arc(x, y, 25, 0, Math.PI*2); sCtx.fill();
                
                // Calculate scratch %
                var imgData = sCtx.getImageData(0, 0, 320, 150).data;
                var transparent = 0;
                for (var i = 3; i < imgData.length; i += 160) {
                    if (imgData[i] === 0) transparent++;
                }
                var pct = (transparent / (imgData.length / 160)) * 100;
                game.scratchPercent = pct;
            }

            // Init parameters
            if (gameMode === 'slicer') {
                for(var i=0; i<3; i++) spawnItem();
            } else if (gameMode === 'catcher') {
                for(var i=0; i<2; i++) { spawnItem(); game.items[i].y = Math.random() * 300; }
            } else {
                for(var i=0; i<3; i++) { spawnItem(); game.items[i].y = 600 - Math.random() * 600; }
            }

            function getCoords(e) {
                var rect = canvas.getBoundingClientRect();
                var scaleX = 400 / rect.width;
                var scaleY = 600 / rect.height;
                var cx = e.touches ? e.touches[0].clientX : e.clientX;
                var cy = e.touches ? e.touches[0].clientY : e.clientY;
                return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
            }

            function pointerStart(e) {
                var c = getCoords(e);
                if (game.state === 'play') {
                    if (gameMode === 'catcher') game.catcherX = c.x;
                    else if (gameMode === 'bubble') {
                        game.items.forEach(function(b) {
                            if (b.active && Math.hypot(b.x - c.x, b.y - c.y) < b.bubbleRadius + 15) {
                                b.active = false; game.score++; spawnParticles(b.x, b.y);
                                if (game.score >= game.targetScore) game.state = 'win';
                            }
                        });
                    }
                } else if (game.state === 'win' && game.scratchFade === 1.0) {
                    var scX = (400 - 320) / 2, scY = 320;
                    if (c.x >= scX && c.x <= scX + 320 && c.y >= scY && c.y <= scY + 150) {
                        game.isScratching = true; scratchAt(c.x - scX, c.y - scY);
                    }
                }
            }

            function pointerMove(e) {
                var c = getCoords(e);
                if (game.state === 'play') {
                    if (gameMode === 'slicer') {
                        game.trail.push({x: c.x, y: c.y, life: 1.0});
                        game.items.forEach(function(b) {
                            if (b.active && Math.hypot(b.x - c.x, b.y - c.y) < b.size) {
                                b.active = false; game.score++; spawnParticles(b.x, b.y);
                                if (game.score >= game.targetScore) game.state = 'win';
                            }
                        });
                    } else if (gameMode === 'catcher') game.catcherX = c.x;
                } else if (game.state === 'win' && game.isScratching) {
                    var scX = (400 - 320) / 2, scY = 320;
                    scratchAt(c.x - scX, c.y - scY);
                }
            }

            canvas.addEventListener('mousedown', pointerStart);
            canvas.addEventListener('mousemove', pointerMove);
            window.addEventListener('mouseup', function(){ game.isScratching = false; });
            canvas.addEventListener('touchstart', function(e){ e.preventDefault(); pointerStart(e); });
            canvas.addEventListener('touchmove', function(e){ e.preventDefault(); pointerMove(e); });
            window.addEventListener('touchend', function(){ game.isScratching = false; });

            function loop() {
                requestAnimationFrame(loop);
                // Update
                if (game.state === 'play') {
                    game.items.forEach(function(b) {
                        if (!b.active) return;
                        b.x += b.vx; b.y += b.vy; b.rot += b.rotSpeed;
                        if (gameMode === 'slicer') {
                            b.vy += 0.35;
                            if (b.y > 700) { b.y = 700; b.vy = -14 - Math.random() * 8; b.vx = (Math.random()-0.5)*8; }
                        } else if (gameMode === 'catcher') {
                            if (b.y > 650) { b.y = -50; b.x = 40 + Math.random()*320; b.vy = 2 + Math.random()*3; }
                            var basketY = 540;
                            if (b.y >= basketY && b.y <= basketY + game.catcherHeight &&
                                b.x >= game.catcherX - game.catcherWidth/2 && b.x <= game.catcherX + game.catcherWidth/2) {
                                b.active = false; game.score++; spawnParticles(b.x, b.y);
                                if (game.score >= game.targetScore) game.state = 'win';
                                else spawnItem();
                            }
                        } else if (gameMode === 'bubble') {
                            if (b.y < -50) { b.y = 650; b.x = 30 + Math.random()*340; b.vy = -1.5 - Math.random()*2; }
                        }
                    });
                    if (gameMode !== 'catcher') {
                        for(var i=0; i<game.items.length; i++) {
                            if(!game.items[i].active) { game.items.splice(i,1); i--; spawnItem(); }
                        }
                    }
                } else {
                    if (game.scratchPercent >= 55 && game.scratchFade > 0) game.scratchFade -= 0.05;
                    if (game.winParticles.length < 50) {
                        game.winParticles.push({
                            x: Math.random()*400, y:-10, vx: (Math.random()-0.5)*3, vy: 3 + Math.random()*4,
                            size: 4 + Math.random()*6, color: 'hsl('+(Math.random()*360)+', 100%, 50%)'
                        });
                    }
                    game.winParticles.forEach(function(p){
                        p.y += p.vy; p.x += p.vx; if(p.y > 600) { p.y = -10; p.x = Math.random()*400; }
                    });
                }

                game.particles.forEach(function(p, idx){
                    p.x += p.vx; p.y += p.vy; p.life -= p.decay; if(p.life <= 0) game.particles.splice(idx,1);
                });

                // Draw
                var bgGrad = ctx.createLinearGradient(0,0,0,600);
                bgGrad.addColorStop(0, '#0f172a'); bgGrad.addColorStop(1, '#020617');
                ctx.fillStyle = bgGrad; ctx.fillRect(0,0,400,600);

                if (pImg && pImg.complete) {
                    ctx.globalAlpha = 0.12;
                    ctx.drawImage(pImg, 0, 0, 400, 600);
                    ctx.globalAlpha = 1;
                }

                if (game.state === 'play') {
                    game.items.forEach(function(b) {
                        if (!b.active) return;
                        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
                        if (gameMode === 'bubble') {
                            ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.arc(0,0,b.bubbleRadius,0,Math.PI*2); ctx.fill();
                            ctx.strokeStyle = brandColor; ctx.lineWidth = 2; ctx.stroke();
                        }
                        if (pImg && pImg.complete) {
                            var imgSz = gameMode==='bubble' ? b.bubbleRadius*1.2 : b.size;
                            ctx.drawImage(pImg, -imgSz/2, -imgSz/2, imgSz, imgSz);
                        } else {
                            ctx.font = (gameMode==='bubble' ? b.bubbleRadius*1.1 : b.size*0.9) + 'px sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(emojis[productType] || '🍔', 0, 0);
                        }
                        ctx.restore();
                    });

                    if (gameMode === 'catcher') {
                        ctx.fillStyle = brandColor; ctx.beginPath();
                        ctx.roundRect(game.catcherX - game.catcherWidth/2, 540, game.catcherWidth, game.catcherHeight, 6);
                        ctx.fill();
                        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
                        ctx.fillText('📥 CATCH BASKET', game.catcherX, 556);
                    }

                    // HUD
                    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fillRect(0,0,400,90);
                    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign='center'; ctx.fillText(titleText, 200, 35);
                    ctx.fillStyle = '#94a3b8'; ctx.font = '12px sans-serif'; ctx.fillText('SCORE: ' + game.score + ' / ' + game.targetScore, 200, 65);

                    if (gameMode === 'slicer' && game.trail.length > 1) {
                        ctx.beginPath();
                        for (var i=0; i<game.trail.length; i++) {
                            var t = game.trail[i]; t.life -= 0.08;
                            if (t.life <= 0) { game.trail.splice(i,1); i--; continue; }
                            ctx.lineWidth = t.life * 8; ctx.strokeStyle = brandColor;
                            if (i === 0) ctx.moveTo(t.x, t.y); else ctx.lineTo(t.x, t.y);
                        }
                        ctx.stroke();
                    }
                } else {
                    // Win state
                    game.winParticles.forEach(function(p){
                        ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
                    });
                    ctx.fillStyle = '#ffffff'; ctx.font = '60px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🎁', 200, 160);
                    ctx.fillStyle = brandColor; ctx.font = 'bold 24px sans-serif'; ctx.fillText('GOAL ACHIEVED!', 200, 230);
                    ctx.fillStyle = '#94a3b8'; ctx.font = '13px sans-serif'; ctx.fillText('Scratch off below to claim your discount!', 200, 260);

                    var scX = 40, scY = 320;
                    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(scX, scY, 320, 150, 12); ctx.fill();
                    ctx.strokeStyle = brandColor; ctx.lineWidth = 3; ctx.strokeRect(scX, scY, 320, 150);
                    ctx.fillStyle = '#64748b'; ctx.font = 'bold 11px sans-serif'; ctx.fillText('SPECIAL REWARD', 200, scY + 35);
                    ctx.fillStyle = brandColor; ctx.font = 'bold 30px monospace'; ctx.fillText(discountCode, 200, scY + 80);
                    ctx.fillStyle = '#ffffff'; ctx.font = '12px sans-serif'; ctx.fillText('Use code at checkout to claim!', 200, scY + 120);

                    if (game.scratchFade > 0) {
                        ctx.save(); ctx.globalAlpha = game.scratchFade;
                        ctx.drawImage(game.scratchCanvas, scX, scY); ctx.restore();
                    }
                }

                game.particles.forEach(function(p) {
                    ctx.fillStyle = brandColor; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                });
            }
            loop();
        })();
        `;

        var fullHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>Interactive Playable Ad</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    background: #020617;
                    overflow: hidden;
                    touch-action: none;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
        </body>
        </html>`;

        var zip = new window.JSZip();
        zip.file("playable_ad.html", fullHtml);
        zip.generateAsync({type:"blob"}).then(function(content) {
            var url = URL.createObjectURL(content);
            var a = document.createElement('a'); 
            a.href = url; 
            a.download = 'playable_minigame_ad.zip'; 
            a.click();
            
            document.getElementById('pab-st').textContent = '✓ Playable ZIP Exported!';
            window.showToast("Playable Ad ZIP Exported!");
            setTimeout(function(){ 
                document.getElementById('pab-st').textContent = 'Game Preview Active'; 
                URL.revokeObjectURL(url);
            }, 2500);
        });
    }

})();
