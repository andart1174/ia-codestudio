/* ====================================================
   KINETIC TYPOGRAPHY MOTION ENGINE AD
   20+ letter-level animation effects, mouse interaction,
   Google Fonts, PNG/Video/HTML5 export
   ==================================================== */
(function () {
    'use strict';
    var _prevRenderTab = window.renderTab;

    var S = {
        active: false, canvas: null, ctx: null, animId: null,
        text: 'MOTION DESIGN',
        font: 'Impact',
        fontSize: 120,
        textColor: '#ffffff',
        bgColor: '#0a0a0a',
        accentColor: '#ccff00',
        effect: 'bounce',
        mouseX: 0, mouseY: 0,
        letters: [],
        t: 0
    };

    var GOOGLE_FONTS = [
        'Impact', 'Bebas Neue', 'Montserrat', 'Oswald', 'Rajdhani',
        'Anton', 'Black Han Sans', 'Righteous', 'Bungee', 'Russo One',
        'Press Start 2P', 'Orbitron', 'Exo 2', 'Poppins', 'Inter'
    ];

    var EFFECTS = [
        { id: 'bounce',    label: '🏀 Bounce Physics' },
        { id: 'wave',      label: '🌊 Sine Wave' },
        { id: 'glitch',    label: '⚡ RGB Glitch' },
        { id: 'scatter',   label: '💨 Scatter & Reform' },
        { id: 'typewriter',label: '⌨️ Typewriter' },
        { id: 'elastic',   label: '🧲 Elastic Spring' },
        { id: 'orbit',     label: '🪐 Orbit' },
        { id: 'neon',      label: '💡 Neon Flicker' },
        { id: 'magnetic',  label: '🧲 Magnetic Mouse' },
        { id: 'cascade',   label: '🌧️ Cascade Fall' },
        { id: 'zoom',      label: '🔭 Zoom Burst' },
        { id: 'fire',      label: '🔥 Fire Rise' },
        { id: 'matrix',    label: '🖥️ Matrix Rain' },
        { id: 'spiral',    label: '🌀 Spiral In' },
        { id: 'shake',     label: '📳 Earthquake Shake' },
        { id: 'paint',     label: '🎨 Ink Reveal' },
        { id: 'flip',      label: '🎰 Slot Machine Flip' },
        { id: 'explode',   label: '💥 Explode & Reassemble' },
        { id: 'marquee',   label: '📺 Infinite Marquee' },
        { id: 'brutalist', label: '🏗️ Big Brutalist' }
    ];

    /* ── Tab routing ── */
    window.renderTab = function (tab) {
        if (tab === 'kinetic-typography') {
            window.activeTab = 'kinetic-typography';
            document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-kinetic-typography');
            if (btn) btn.classList.add('active');
            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(function (el) {
                el.style.display = 'none';
            });
            var ws = document.getElementById('kinetic-typography-workspace');
            if (ws) ws.style.display = 'flex';
            var c = document.getElementById('ktp-center');
            var r = document.getElementById('ktp-right');
            if (c) c.style.display = 'flex';
            if (r) r.style.display = 'block';
            loadGoogleFonts();
            buildUI();
            if (!S.active) initCanvas();
            return;
        }
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    /* ── Google Fonts ── */
    function loadGoogleFonts() {
        if (document.getElementById('kt-gfonts')) return;
        var link = document.createElement('link');
        link.id = 'kt-gfonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@900&family=Oswald:wght@700&family=Rajdhani:wght@700&family=Anton&family=Righteous&family=Bungee&family=Russo+One&family=Press+Start+2P&family=Orbitron:wght@900&family=Exo+2:wght@900&family=Poppins:wght@900&family=Inter:wght@900&display=swap';
        document.head.appendChild(link);
    }

    /* ── UI ── */
    function buildUI() {
        var r = document.getElementById('ktp-right');
        if (!r) return;

        var effectOpts = EFFECTS.map(function (e) {
            return '<option value="' + e.id + '"' + (e.id === S.effect ? ' selected' : '') + '>' + e.label + '</option>';
        }).join('');

        var fontOpts = GOOGLE_FONTS.map(function (f) {
            return '<option value="' + f + '"' + (f === S.font ? ' selected' : '') + '>' + f + '</option>';
        }).join('');

        r.innerHTML = `
        <div style="color:white;font-family:sans-serif;">
            <h2 style="margin:0 0 4px;color:#ccff00;font-size:18px;">✍️ Kinetic Typography</h2>
            <p style="margin:0 0 16px;font-size:11px;color:#94a3b8;">Motion Engine Ad — 20 Effects</p>

            <label style="font-size:11px;color:#7dd3fc;">Text:</label>
            <input type="text" id="kt-text" value="${S.text}"
                style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:13px;">

            <label style="font-size:11px;color:#7dd3fc;">Animation Effect:</label>
            <select id="kt-effect" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                ${effectOpts}
            </select>

            <label style="font-size:11px;color:#7dd3fc;">Font:</label>
            <select id="kt-font" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                ${fontOpts}
            </select>

            <label style="font-size:11px;color:#7dd3fc;">Font Size: <span id="kt-fs-val">${S.fontSize}px</span></label>
            <input type="range" id="kt-fontsize" min="40" max="220" value="${S.fontSize}"
                style="width:100%;margin-bottom:12px;accent-color:#ccff00;">

            <div style="display:flex;gap:8px;margin-bottom:12px;">
                <div style="flex:1">
                    <label style="font-size:10px;color:#7dd3fc;">Text Color</label><br>
                    <input type="color" id="kt-tc" value="${S.textColor}"
                        style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                </div>
                <div style="flex:1">
                    <label style="font-size:10px;color:#7dd3fc;">BG Color</label><br>
                    <input type="color" id="kt-bg" value="${S.bgColor}"
                        style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                </div>
                <div style="flex:1">
                    <label style="font-size:10px;color:#7dd3fc;">Accent</label><br>
                    <input type="color" id="kt-ac" value="${S.accentColor}"
                        style="width:100%;height:30px;border:none;background:transparent;cursor:pointer;">
                </div>
            </div>

            <hr style="border:0;border-top:1px solid #334155;margin:10px 0;">

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                <button id="kt-exp-png" style="background:#334155;color:#fff;border:none;padding:10px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;">📸 PNG</button>
                <button id="kt-exp-vid" style="background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;border:none;padding:10px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;">🎥 Video 5s</button>
            </div>
            <button id="kt-exp-html" style="width:100%;background:linear-gradient(135deg,#ccff00,#84cc16);color:#000;border:none;padding:12px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;margin-bottom:8px;">🌐 Export HTML5 Standalone</button>
            <button id="kt-reset" style="width:100%;background:#1e293b;color:#94a3b8;border:1px solid #334155;padding:8px;border-radius:6px;cursor:pointer;font-size:11px;">🔄 Reset Animation</button>
            <div id="kt-st" style="margin-top:12px;font-size:11px;text-align:center;color:#ccff00;">● Ready</div>
        </div>`;

        /* listeners */
        document.getElementById('kt-text').oninput = function (e) {
            S.text = e.target.value || ' ';
            buildLetters();
        };
        document.getElementById('kt-effect').onchange = function (e) {
            S.effect = e.target.value;
            buildLetters();
        };
        document.getElementById('kt-font').onchange = function (e) {
            S.font = e.target.value;
            buildLetters();
        };
        document.getElementById('kt-fontsize').oninput = function (e) {
            S.fontSize = parseInt(e.target.value);
            document.getElementById('kt-fs-val').textContent = S.fontSize + 'px';
            buildLetters();
        };
        document.getElementById('kt-tc').oninput = function (e) { S.textColor = e.target.value; };
        document.getElementById('kt-bg').oninput = function (e) { S.bgColor = e.target.value; };
        document.getElementById('kt-ac').oninput = function (e) { S.accentColor = e.target.value; buildLetters(); };
        document.getElementById('kt-reset').onclick = function () { buildLetters(); };

        document.getElementById('kt-exp-png').onclick = function () {
            var a = document.createElement('a');
            a.download = 'kinetic-typography.png';
            a.href = S.canvas.toDataURL('image/png');
            a.click();
        };

        document.getElementById('kt-exp-vid').onclick = function () {
            var st = document.getElementById('kt-st');
            st.textContent = '⏺ Recording 5s...';
            var stream = S.canvas.captureStream(30);
            var rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
            var chunks = [];
            rec.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
            rec.onstop = function () {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
                a.download = 'kinetic-typography.webm';
                a.click();
                st.textContent = '✅ Video exported!';
                setTimeout(function () { st.textContent = '● Ready'; }, 2500);
            };
            buildLetters();
            rec.start();
            setTimeout(function () { rec.stop(); }, 5000);
        };

        document.getElementById('kt-exp-html').onclick = exportHTML;
    }

    /* ── Canvas init ── */
    function initCanvas() {
        S.active = true;
        var ct = document.getElementById('ktp-center');
        ct.innerHTML = '';
        S.canvas = document.createElement('canvas');
        S.canvas.width = 1080;
        S.canvas.height = 1080;
        S.canvas.style.cssText = 'width:100%;max-width:540px;aspect-ratio:1;box-shadow:0 10px 40px rgba(0,0,0,0.8);border-radius:8px;cursor:crosshair;';
        ct.appendChild(S.canvas);
        S.ctx = S.canvas.getContext('2d');

        S.canvas.addEventListener('mousemove', function (e) {
            var r = S.canvas.getBoundingClientRect();
            S.mouseX = (e.clientX - r.left) * (S.canvas.width / r.width);
            S.mouseY = (e.clientY - r.top) * (S.canvas.height / r.height);
        });
        S.canvas.addEventListener('click', function () {
            if (S.effect === 'scatter' || S.effect === 'explode') buildLetters();
        });

        buildLetters();

        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);
            S.t += 0.02;
            renderFrame();
        }
        loop();
    }

    /* ── Letter objects ── */
    function buildLetters() {
        var ctx = S.ctx;
        var w = S.canvas.width, h = S.canvas.height;
        ctx.font = 'bold ' + S.fontSize + 'px "' + S.font + '", Impact, sans-serif';
        ctx.textBaseline = 'alphabetic';

        var chars = S.text.split('');
        // measure each char
        var widths = chars.map(function (c) { return ctx.measureText(c).width; });
        var totalWidth = widths.reduce(function (a, b) { return a + b; }, 0);
        var startX = (w - totalWidth) / 2;
        var baseY = h / 2 + S.fontSize * 0.35;

        S.letters = chars.map(function (ch, i) {
            var tx = startX;
            for (var j = 0; j < i; j++) tx += widths[j];
            tx += widths[i] / 2; // center of char

            return {
                ch: ch,
                targetX: tx, targetY: baseY,
                x: tx, y: S.effect === 'cascade' ? -S.fontSize * (i + 1) :
                    S.effect === 'fire' ? h + S.fontSize * (i + 1) :
                    S.effect === 'zoom' ? w / 2 : tx,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20,
                rotation: S.effect === 'flip' ? Math.PI * (Math.random() > 0.5 ? 1 : -1) * (i + 1) : 0,
                rotV: 0,
                scale: S.effect === 'zoom' ? 8 : 1,
                opacity: S.effect === 'typewriter' || S.effect === 'ink' || S.effect === 'paint' ? 0 : 1,
                phase: i * 0.4,
                w: widths[i],
                color: S.textColor,
                glitchTimer: Math.random() * 60
            };
        });
        S.t = 0;
    }

    /* ── Main render ── */
    function renderFrame() {
        var ctx = S.ctx;
        var w = S.canvas.width, h = S.canvas.height;
        var t = S.t;
        var eff = S.effect;

        /* Background */
        if (eff === 'glitch' || eff === 'matrix' || eff === 'neon') {
            ctx.fillStyle = S.bgColor;
            ctx.globalAlpha = 0.85;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 1;
        } else if (eff === 'fire') {
            ctx.fillStyle = S.bgColor;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 1;
        } else {
            ctx.fillStyle = S.bgColor;
            ctx.fillRect(0, 0, w, h);
        }

        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'center';

        /* Special full-canvas effects */
        if (eff === 'matrix') { drawMatrix(ctx, w, h, t); return; }
        if (eff === 'marquee') { drawMarquee(ctx, w, h, t); return; }
        if (eff === 'brutalist') { drawBrutalist(ctx, w, h, t); return; }

        /* Per-letter effects */
        var fontStr = 'bold ' + S.fontSize + 'px "' + S.font + '", Impact, sans-serif';
        ctx.font = fontStr;

        S.letters.forEach(function (lt, i) {
            var targetX = lt.targetX;
            var targetY = lt.targetY;

            switch (eff) {

                case 'wave':
                    lt.x = targetX;
                    lt.y = targetY + Math.sin(t * 3 + lt.phase) * S.fontSize * 0.5;
                    lt.rotation = Math.sin(t * 2 + lt.phase) * 0.2;
                    lt.opacity = 1;
                    break;

                case 'bounce':
                    if (lt.y < targetY) {
                        lt.vy += 1.2;
                        lt.y += lt.vy;
                        lt.x = targetX;
                        if (lt.y >= targetY) { lt.y = targetY; lt.vy *= -0.5; }
                    } else {
                        lt.vy += 0.8;
                        lt.y += lt.vy;
                        if (lt.y >= targetY) { lt.y = targetY; lt.vy *= -0.55; if (Math.abs(lt.vy) < 1) lt.vy = 0; }
                    }
                    lt.scale = lt.y >= targetY - 2 ? Math.max(0.8, 1 - Math.abs(lt.vy) * 0.03) : 1;
                    lt.opacity = 1;
                    break;

                case 'scatter':
                    if (t < 1.5) {
                        lt.x += (Math.random() - 0.5) * 8;
                        lt.y += (Math.random() - 0.5) * 8;
                        lt.rotation += (Math.random() - 0.5) * 0.3;
                        lt.opacity = 0.6;
                    } else {
                        lt.x += (targetX - lt.x) * 0.08;
                        lt.y += (targetY - lt.y) * 0.08;
                        lt.rotation *= 0.9;
                        lt.opacity = Math.min(1, lt.opacity + 0.05);
                    }
                    break;

                case 'typewriter':
                    var revealTime = i * 0.12;
                    lt.opacity = t > revealTime ? 1 : 0;
                    lt.x = targetX;
                    lt.y = targetY;
                    // blinking cursor after last revealed char
                    break;

                case 'elastic':
                    var dx = targetX - lt.x;
                    var dy = targetY - lt.y;
                    lt.vx += dx * 0.08;
                    lt.vy += dy * 0.08;
                    lt.vx *= 0.85;
                    lt.vy *= 0.85;
                    lt.x += lt.vx;
                    lt.y += lt.vy;
                    lt.rotation = lt.vx * 0.04;
                    lt.opacity = 1;
                    break;

                case 'orbit':
                    var orbitR = 180 + i * 10;
                    var angle = t * 1.2 + lt.phase;
                    lt.x = w / 2 + Math.cos(angle) * orbitR * (1 - Math.min(1, t * 0.5));
                    lt.y = h / 2 + Math.sin(angle) * orbitR * 0.4 * (1 - Math.min(1, t * 0.5));
                    if (t > 2) {
                        lt.x += (targetX - lt.x) * 0.05;
                        lt.y += (targetY - lt.y) * 0.05;
                    }
                    lt.rotation = angle;
                    lt.opacity = 1;
                    break;

                case 'neon':
                    lt.x = targetX;
                    lt.y = targetY;
                    lt.opacity = 0.7 + Math.sin(t * 8 + lt.phase * 3) * 0.3;
                    if (Math.random() > 0.97) lt.opacity = Math.random() * 0.4;
                    lt.rotation = 0;
                    break;

                case 'magnetic':
                    var mdx = S.mouseX - lt.x;
                    var mdy = S.mouseY - lt.y;
                    var mdist = Math.hypot(mdx, mdy) || 1;
                    var attract = Math.min(200 / mdist, 8);
                    lt.vx += mdx / mdist * attract * 0.3;
                    lt.vy += mdy / mdist * attract * 0.3;
                    var rdx2 = targetX - lt.x;
                    var rdy2 = targetY - lt.y;
                    lt.vx += rdx2 * 0.04;
                    lt.vy += rdy2 * 0.04;
                    lt.vx *= 0.88;
                    lt.vy *= 0.88;
                    lt.x += lt.vx;
                    lt.y += lt.vy;
                    lt.rotation = lt.vx * 0.05;
                    lt.opacity = 1;
                    break;

                case 'cascade':
                    if (lt.y < targetY) {
                        lt.vy += 0.9;
                        lt.y += lt.vy;
                        lt.opacity = Math.min(1, lt.opacity + 0.05);
                        if (lt.y >= targetY) { lt.y = targetY; lt.vy *= -0.3; }
                    } else {
                        lt.y = targetY;
                    }
                    lt.x = targetX;
                    break;

                case 'zoom':
                    lt.scale = Math.max(1, lt.scale - 0.15);
                    lt.x += (targetX - lt.x) * 0.06;
                    lt.y += (targetY - lt.y) * 0.06;
                    lt.opacity = Math.min(1, lt.opacity + 0.03);
                    break;

                case 'fire':
                    if (lt.y > targetY) {
                        lt.y -= 8 + Math.random() * 4;
                        lt.x = targetX + Math.sin(t * 10 + lt.phase) * 5;
                    } else {
                        lt.y = targetY + Math.sin(t * 5 + lt.phase) * 3;
                        lt.x = targetX + Math.sin(t * 8 + lt.phase) * 2;
                    }
                    lt.opacity = 1;
                    break;

                case 'shake':
                    var shakeAmp = 8 + Math.sin(t * 20) * 6;
                    lt.x = targetX + (Math.random() - 0.5) * shakeAmp;
                    lt.y = targetY + (Math.random() - 0.5) * shakeAmp;
                    lt.rotation = (Math.random() - 0.5) * 0.15;
                    lt.opacity = 1;
                    break;

                case 'paint':
                    var paintTime = i * 0.18;
                    if (t > paintTime) {
                        lt.opacity = Math.min(1, lt.opacity + 0.08);
                    }
                    lt.x = targetX;
                    lt.y = targetY;
                    break;

                case 'flip':
                    lt.rotation += lt.rotV;
                    lt.rotV += (0 - lt.rotation) * 0.08;
                    lt.rotV *= 0.85;
                    lt.x += (targetX - lt.x) * 0.08;
                    lt.y += (targetY - lt.y) * 0.08;
                    lt.opacity = 1;
                    break;

                case 'explode':
                    if (t < 1.0) {
                        lt.x += lt.vx;
                        lt.y += lt.vy;
                        lt.vy += 0.5;
                        lt.rotation += lt.rotV;
                        lt.opacity = Math.max(0, lt.opacity - 0.01);
                    } else {
                        lt.x += (targetX - lt.x) * 0.07;
                        lt.y += (targetY - lt.y) * 0.07;
                        lt.rotation *= 0.9;
                        lt.opacity = Math.min(1, lt.opacity + 0.04);
                    }
                    break;

                case 'spiral':
                    var spiralAngle = lt.phase + t * 2;
                    var spiralR = Math.max(0, 300 - t * 150);
                    lt.x = w / 2 + Math.cos(spiralAngle) * spiralR;
                    lt.y = h / 2 + Math.sin(spiralAngle) * spiralR * 0.4;
                    if (spiralR <= 0) { lt.x += (targetX - lt.x) * 0.1; lt.y += (targetY - lt.y) * 0.1; }
                    lt.rotation = spiralAngle;
                    lt.opacity = Math.min(1, t * 0.5);
                    break;

                default:
                    lt.x = targetX;
                    lt.y = targetY;
                    lt.opacity = 1;
            }

            /* Draw the letter */
            drawLetter(ctx, lt, eff, t, fontStr);
        });

        /* Typewriter cursor */
        if (eff === 'typewriter') {
            var lastRevealedIdx = Math.min(Math.floor(t / 0.12), S.letters.length - 1);
            if (lastRevealedIdx >= 0 && lastRevealedIdx < S.letters.length) {
                var clt = S.letters[lastRevealedIdx];
                if (Math.floor(t * 2) % 2 === 0) {
                    ctx.fillStyle = S.accentColor;
                    ctx.fillRect(clt.x + clt.w / 2, clt.y - S.fontSize, 4, S.fontSize * 1.1);
                }
            }
        }
    }

    function drawLetter(ctx, lt, eff, t, fontStr) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, lt.opacity));
        ctx.font = fontStr;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.translate(lt.x, lt.y);
        ctx.rotate(lt.rotation || 0);
        ctx.scale(lt.scale || 1, lt.scale || 1);

        if (eff === 'glitch') {
            lt.glitchTimer--;
            var doGlitch = lt.glitchTimer <= 0;
            if (doGlitch) { lt.glitchTimer = 20 + Math.random() * 80; }
            if (doGlitch && Math.random() > 0.5) {
                var go = (Math.random() - 0.5) * 12;
                ctx.fillStyle = '#ff0040';
                ctx.fillText(lt.ch, go, 0);
                ctx.fillStyle = '#00ffff';
                ctx.fillText(lt.ch, -go, 0);
                ctx.globalAlpha *= 0.8;
                ctx.fillStyle = S.textColor;
                ctx.fillText(lt.ch, 0, 0);
            } else {
                ctx.fillStyle = S.textColor;
                ctx.fillText(lt.ch, 0, 0);
            }
        } else if (eff === 'neon') {
            ctx.shadowColor = S.accentColor;
            ctx.shadowBlur = 20 + Math.sin(t * 8 + lt.phase * 3) * 10;
            ctx.fillStyle = S.accentColor;
            ctx.fillText(lt.ch, 0, 0);
            ctx.shadowBlur = 0;
        } else if (eff === 'fire') {
            var fireProgress = (lt.y - lt.targetY) / S.fontSize;
            var fireHue = Math.max(0, Math.min(60, fireProgress * 60));
            ctx.fillStyle = 'hsl(' + fireHue + ', 100%, 60%)';
            ctx.shadowColor = 'hsl(' + fireHue + ', 100%, 70%)';
            ctx.shadowBlur = 20;
            ctx.fillText(lt.ch, 0, 0);
            ctx.shadowBlur = 0;
        } else if (eff === 'paint') {
            ctx.shadowColor = S.accentColor;
            ctx.shadowBlur = 8 * (1 - lt.opacity);
            ctx.fillStyle = S.textColor;
            ctx.fillText(lt.ch, 0, 0);
            ctx.shadowBlur = 0;
        } else if (eff === 'magnetic') {
            var speed = Math.hypot(lt.vx, lt.vy);
            ctx.shadowColor = S.accentColor;
            ctx.shadowBlur = Math.min(30, speed * 2);
            ctx.fillStyle = speed > 3 ? S.accentColor : S.textColor;
            ctx.fillText(lt.ch, 0, 0);
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = S.textColor;
            ctx.fillText(lt.ch, 0, 0);
        }

        ctx.restore();
    }

    /* ── Special full-canvas effects ── */
    function drawMatrix(ctx, w, h, t) {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = S.accentColor;
        ctx.font = 'bold ' + S.fontSize * 0.2 + 'px monospace';
        ctx.textAlign = 'center';

        if (!S._matrixCols) {
            S._matrixCols = [];
            var cols = Math.floor(w / 24);
            for (var i = 0; i < cols; i++) {
                S._matrixCols.push(Math.random() * h);
            }
        }
        S._matrixCols.forEach(function (y, i) {
            var ch = S.text[Math.floor(Math.random() * S.text.length)] || '0';
            ctx.fillText(ch, i * 24 + 12, y);
            S._matrixCols[i] = y > h + 20 ? 0 : y + 22;
        });

        // Draw the actual text big in center
        ctx.font = 'bold ' + S.fontSize + 'px "' + S.font + '", Impact, sans-serif';
        ctx.globalAlpha = 0.7 + Math.sin(t * 4) * 0.3;
        ctx.fillText(S.text, w / 2, h / 2);
        ctx.globalAlpha = 1;
    }

    function drawMarquee(ctx, w, h, t) {
        ctx.font = 'bold ' + S.fontSize + 'px "' + S.font + '", Impact, sans-serif';
        ctx.textAlign = 'left';
        var txt = (S.text + '   ').repeat(6);
        var tw = ctx.measureText(S.text + '   ').width;
        var off1 = (t * 180) % tw;
        var off2 = (t * 220) % tw;
        var off3 = (t * 140) % tw;

        [0, 1, 2].forEach(function (row) {
            var y = h * (0.25 + row * 0.25);
            var off = [off1, off2, off3][row];
            var textColor = row === 1 ? S.accentColor : S.textColor;
            if (row === 1) {
                ctx.strokeStyle = S.textColor;
                ctx.lineWidth = 3;
                ctx.strokeText(txt, -off, y);
                ctx.strokeText(txt, tw - off, y);
            } else {
                ctx.fillStyle = textColor;
                ctx.fillText(txt, -off, y);
                ctx.fillText(txt, tw - off, y);
            }
        });
        ctx.textAlign = 'center';
    }

    function drawBrutalist(ctx, w, h, t) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Big blocks alternating fill/outline
        var bigFont = 'bold ' + S.fontSize * 2.2 + 'px "' + S.font + '", Impact, sans-serif';
        ctx.font = bigFont;
        var scale = 1 + Math.sin(t * 4) * 0.06;

        ctx.save();
        ctx.translate(w / 2, h * 0.32);
        ctx.scale(scale, scale);
        ctx.fillStyle = S.textColor;
        ctx.fillText(S.text.split(' ')[0] || S.text, 0, 0);
        ctx.restore();

        if (S.text.split(' ')[1]) {
            ctx.save();
            ctx.translate(w / 2, h * 0.68);
            ctx.scale(1 / scale, 1 / scale);
            ctx.strokeStyle = S.accentColor;
            ctx.lineWidth = 6;
            ctx.strokeText(S.text.split(' ')[1], 0, 0);
            ctx.restore();
        }

        // Horizontal rule
        ctx.fillStyle = S.accentColor;
        ctx.fillRect(w * 0.05, h * 0.48, w * 0.9, 8);
        ctx.textBaseline = 'alphabetic';
    }

    /* ── Export HTML5 ── */
    function exportHTML() {
        var st = document.getElementById('kt-st');
        if (st) st.textContent = '⏳ Building...';

        var html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kinetic Typography Ad</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@900&family=Oswald:wght@700&family=Anton&family=Righteous&family=Bungee&family=Russo+One&family=Orbitron:wght@900&display=swap">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:${S.bgColor};overflow:hidden;display:flex;align-items:center;justify-content:center;height:100vh;}
canvas{max-width:100vmin;max-height:100vmin;}
</style>
</head>
<body>
<script>
(function(){
var W=Math.min(window.innerWidth,window.innerHeight);
var cvs=document.createElement('canvas');
cvs.width=W;cvs.height=W;
document.body.appendChild(cvs);
var ctx=cvs.getContext('2d');
var TEXT=${JSON.stringify(S.text)};
var FONT=${JSON.stringify(S.font)};
var FS=${S.fontSize};
var TC=${JSON.stringify(S.textColor)};
var BC=${JSON.stringify(S.bgColor)};
var AC=${JSON.stringify(S.accentColor)};
var EFF=${JSON.stringify(S.effect)};
var t=0, mx=W/2, my=W/2;
window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});

function buildLetters(){
    ctx.font='bold '+FS+'px "'+FONT+'", Impact, sans-serif';
    var chars=TEXT.split('');
    var widths=chars.map(function(c){return ctx.measureText(c).width;});
    var tw=widths.reduce(function(a,b){return a+b;},0);
    var sx=(W-tw)/2, by=W/2+FS*0.35;
    return chars.map(function(ch,i){
        var tx=sx; for(var j=0;j<i;j++) tx+=widths[j]; tx+=widths[i]/2;
        return {ch:ch,targetX:tx,targetY:by,x:EFF==='cascade'?tx:EFF==='zoom'?W/2:tx,
            y:EFF==='cascade'?-FS*(i+1):EFF==='fire'?W+FS*(i+1):by,
            vx:(Math.random()-0.5)*20,vy:(Math.random()-0.5)*20,
            rotation:0,rotV:(Math.random()-0.5)*0.3,
            scale:EFF==='zoom'?8:1,opacity:EFF==='typewriter'||EFF==='paint'?0:1,
            phase:i*0.4,w:widths[i],glitchTimer:Math.random()*60};
    });
}
var letters=buildLetters();

function drawLetter(lt){
    ctx.save();
    ctx.globalAlpha=Math.max(0,Math.min(1,lt.opacity));
    ctx.font='bold '+FS+'px "'+FONT+'", Impact, sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.translate(lt.x,lt.y); ctx.rotate(lt.rotation||0); ctx.scale(lt.scale||1,lt.scale||1);
    if(EFF==='neon'){ctx.shadowColor=AC;ctx.shadowBlur=20+Math.sin(t*8+lt.phase*3)*10;ctx.fillStyle=AC;}
    else if(EFF==='glitch'){lt.glitchTimer--;var dg=lt.glitchTimer<=0;if(dg)lt.glitchTimer=20+Math.random()*80;
        if(dg&&Math.random()>0.5){var go=(Math.random()-0.5)*12;ctx.fillStyle='#ff0040';ctx.fillText(lt.ch,go,0);ctx.fillStyle='#00ffff';ctx.fillText(lt.ch,-go,0);}
        ctx.fillStyle=TC;}
    else if(EFF==='magnetic'){var sp=Math.hypot(lt.vx,lt.vy);ctx.shadowColor=AC;ctx.shadowBlur=Math.min(30,sp*2);ctx.fillStyle=sp>3?AC:TC;}
    else{ctx.fillStyle=TC;}
    ctx.fillText(lt.ch,0,0);
    ctx.restore();
}

function frame(){
    requestAnimationFrame(frame);
    t+=0.02;
    ctx.fillStyle=BC;ctx.fillRect(0,0,W,W);
    ctx.font='bold '+FS+'px "'+FONT+'", Impact, sans-serif';
    letters.forEach(function(lt,i){
        var tx=lt.targetX,ty=lt.targetY;
        if(EFF==='wave'){lt.x=tx;lt.y=ty+Math.sin(t*3+lt.phase)*FS*0.5;lt.rotation=Math.sin(t*2+lt.phase)*0.2;}
        else if(EFF==='bounce'){if(lt.y<ty){lt.vy+=1.2;lt.y+=lt.vy;lt.x=tx;if(lt.y>=ty){lt.y=ty;lt.vy*=-0.5;}}else{lt.vy+=0.8;lt.y+=lt.vy;if(lt.y>=ty){lt.y=ty;lt.vy*=-0.55;if(Math.abs(lt.vy)<1)lt.vy=0;}}lt.scale=lt.y>=ty-2?Math.max(0.8,1-Math.abs(lt.vy)*0.03):1;}
        else if(EFF==='elastic'){var dx=tx-lt.x,dy=ty-lt.y;lt.vx+=dx*0.08;lt.vy+=dy*0.08;lt.vx*=0.85;lt.vy*=0.85;lt.x+=lt.vx;lt.y+=lt.vy;lt.rotation=lt.vx*0.04;}
        else if(EFF==='cascade'){if(lt.y<ty){lt.vy+=0.9;lt.y+=lt.vy;lt.opacity=Math.min(1,lt.opacity+0.05);if(lt.y>=ty){lt.y=ty;lt.vy*=-0.3;}}lt.x=tx;}
        else if(EFF==='typewriter'){lt.opacity=t>i*0.12?1:0;lt.x=tx;lt.y=ty;}
        else if(EFF==='neon'){lt.x=tx;lt.y=ty;lt.opacity=0.7+Math.sin(t*8+lt.phase*3)*0.3;if(Math.random()>0.97)lt.opacity=Math.random()*0.4;}
        else if(EFF==='magnetic'){var mdx=mx-lt.x,mdy=my-lt.y,md=Math.hypot(mdx,mdy)||1,att=Math.min(200/md,8)*0.3;lt.vx+=mdx/md*att;lt.vy+=mdy/md*att;lt.vx+=(tx-lt.x)*0.04;lt.vy+=(ty-lt.y)*0.04;lt.vx*=0.88;lt.vy*=0.88;lt.x+=lt.vx;lt.y+=lt.vy;lt.rotation=lt.vx*0.05;}
        else if(EFF==='zoom'){lt.scale=Math.max(1,lt.scale-0.15);lt.x+=(tx-lt.x)*0.06;lt.y+=(ty-lt.y)*0.06;lt.opacity=Math.min(1,lt.opacity+0.03);}
        else if(EFF==='shake'){lt.x=tx+(Math.random()-0.5)*12;lt.y=ty+(Math.random()-0.5)*12;lt.rotation=(Math.random()-0.5)*0.15;}
        else if(EFF==='glitch'){lt.x=tx;lt.y=ty;lt.opacity=1;}
        else{lt.x=tx;lt.y=ty;lt.opacity=1;}
        drawLetter(lt);
    });
}
frame();
})();
<\/script>
</body>
</html>`;

        var blob = new Blob([html], { type: 'text/html' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'kinetic-typography-ad.html';
        a.click();
        if (st) {
            st.textContent = '✅ Exported!';
            setTimeout(function () { st.textContent = '● Ready'; }, 2500);
        }
    }

})();
