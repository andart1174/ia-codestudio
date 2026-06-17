/* ====================================================
   🌀 3D INFINITE ZOOM PORTAL — Premium Rewrite
   Canvas 2D exponential scaling engine with:
   - 4 procedurally drawn themed scenes (Tech, Nature, Cyber, Space)
   - Seamless cross-fade transitions between scenes
   - Spiral, Linear, and Glitch transition styles
   - Brand logo injection at each scene boundary
   - Zoom speed slider, transition style selector
   - Video export (WebM) + Standalone HTML5 ZIP export
   ==================================================== */
(function () {
    'use strict';
    var _prevRenderTab = window.renderTab;

    var S = {
        active: false,
        canvas: null,
        ctx: null,
        animId: null,

        // Zoom engine state
        scale: 1.0,
        zoomSpeed: 0.008,
        transitionStyle: 'linear', // linear, spiral, glitch
        sceneIndex: 0,
        numScenes: 4,
        inTransition: false,
        transitionAlpha: 0.0, // 0→1 fade-in for next scene
        transitionProgress: 0,
        transitionDuration: 60, // frames for cross-fade

        // Logo brand options
        brandLogoText: 'BRAND',
        showLogoAtTransition: true,
        logoAlpha: 0,
        logoFadeDir: 0, // 1=in, -1=out

        // UI
        t: 0
    };

    // ── Scene definitions (procedural drawers) ──────────────────
    var SCENES = [
        {
            id: 'tech',
            name: '⚙️ Tech Grid',
            bg: '#030a1a',
            draw: drawTechScene
        },
        {
            id: 'nature',
            name: '🌿 Bio Nature',
            bg: '#020d06',
            draw: drawNatureScene
        },
        {
            id: 'cyber',
            name: '🦾 Cyber Punk',
            bg: '#08000f',
            draw: drawCyberScene
        },
        {
            id: 'space',
            name: '🌌 Deep Space',
            bg: '#010208',
            draw: drawSpaceScene
        }
    ];

    var TRANSITION_STYLES = [
        { id: 'linear', label: '➡️ Linear Fade' },
        { id: 'spiral', label: '🌀 Spiral Rotate' },
        { id: 'glitch', label: '⚡ Glitch Shatter' }
    ];

    /* ── Tab routing ── */
    window.renderTab = function (tab) {
        if (tab === 'infinite-zoom') {
            window.activeTab = 'infinite-zoom';
            document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-infinite-zoom');
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(function (el) {
                el.style.display = 'none';
            });

            var ws = document.getElementById('infinite-zoom-workspace');
            if (ws) ws.style.display = 'flex';
            var c = document.getElementById('iz-center');
            var r = document.getElementById('iz-right');
            if (c) c.style.display = 'flex';
            if (r) r.style.display = 'block';

            buildUI();
            if (!S.active) {
                initEngine();
            }
            return;
        }

        if (S.active) {
            S.active = false;
            if (S.animId) cancelAnimationFrame(S.animId);
        }
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    /* ── UI ── */
    function buildUI() {
        var r = document.getElementById('iz-right');
        if (!r) return;

        var sceneOpts = SCENES.map(function (sc, i) {
            return '<option value="' + i + '"' + (i === S.sceneIndex ? ' selected' : '') + '>' + sc.name + '</option>';
        }).join('');

        var transOpts = TRANSITION_STYLES.map(function (t) {
            return '<option value="' + t.id + '"' + (t.id === S.transitionStyle ? ' selected' : '') + '>' + t.label + '</option>';
        }).join('');

        r.innerHTML = `
        <div style="color:white;font-family:sans-serif;">
            <h2 style="margin:0 0 4px;color:#9600ff;font-size:18px;">🌀 Infinite Zoom Portal</h2>
            <p style="margin:0 0 16px;font-size:11px;color:#94a3b8;">Seamless 3D Deep-Zoom Ad Engine</p>

            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">Starting Scene:</label>
            <select id="iz-scene" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                ${sceneOpts}
            </select>

            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">Transition Style:</label>
            <select id="iz-trans" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                ${transOpts}
            </select>

            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">Zoom Speed: <span id="iz-spd-val">${S.zoomSpeed}</span></label>
            <input type="range" id="iz-spd" min="0.003" max="0.02" step="0.001" value="${S.zoomSpeed}"
                style="width:100%;margin-bottom:12px;accent-color:#9600ff;">

            <label style="font-size:11px;color:#d8b4fe;display:block;margin-bottom:4px;">Brand Logo Text:</label>
            <input type="text" id="iz-brand" value="${S.brandLogoText}"
                style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;font-size:13px;font-weight:bold;">

            <label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#bae6fd;margin-bottom:16px;cursor:pointer;">
                <input type="checkbox" id="iz-logo-cb" ${S.showLogoAtTransition ? 'checked' : ''} style="accent-color:#9600ff;">
                Show brand logo at transitions
            </label>

            <div style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px;text-align:center;margin-bottom:16px;">
                <span style="font-size:11px;color:#94a3b8;line-height:1.6;display:block;">
                    🌀 <b>Infinite zoom</b> — each scene zooms into the next.<br>
                    Click scene selector to jump. Logo flashes at each portal transition.
                </span>
            </div>

            <hr style="border:0;border-top:1px solid #334155;margin:10px 0;">

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                <button id="iz-exp-png" style="background:#334155;color:#fff;border:none;padding:10px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;">📸 Capture PNG</button>
                <button id="iz-exp-vid" style="background:#1e293b;color:#a78bfa;border:1px solid #9600ff;padding:8px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold;">🎥 Record 6s</button>
            </div>
            <button id="iz-exp-zip" style="width:100%;background:linear-gradient(135deg,#9600ff,#ec4899);color:#fff;border:none;padding:12px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;">📦 Export Playable Ad ZIP</button>
            <div id="iz-st" style="margin-top:12px;font-size:12px;text-align:center;color:#9600ff;font-weight:bold;">● Portal Active</div>
        </div>`;

        // Hooks
        document.getElementById('iz-scene').onchange = function (e) {
            S.sceneIndex = parseInt(e.target.value);
            S.scale = 1.0;
        };
        document.getElementById('iz-trans').onchange = function (e) {
            S.transitionStyle = e.target.value;
        };
        document.getElementById('iz-spd').oninput = function (e) {
            S.zoomSpeed = parseFloat(e.target.value);
            document.getElementById('iz-spd-val').textContent = S.zoomSpeed.toFixed(3);
        };
        document.getElementById('iz-brand').oninput = function (e) {
            S.brandLogoText = e.target.value || 'BRAND';
        };
        document.getElementById('iz-logo-cb').onchange = function (e) {
            S.showLogoAtTransition = e.target.checked;
        };
        document.getElementById('iz-exp-png').onclick = exportPNG;
        document.getElementById('iz-exp-vid').onclick = exportVideo;
        document.getElementById('iz-exp-zip').onclick = exportHTML5;
    }

    /* ── Initialize Canvas Engine ── */
    function initEngine() {
        S.active = true;
        S.scale = 1.0;
        var ct = document.getElementById('iz-center');
        if (!ct) return;
        ct.innerHTML = '';

        S.canvas = document.createElement('canvas');
        S.canvas.width = 900;
        S.canvas.height = 900;
        S.canvas.style.cssText = 'width:100%;height:100%;object-fit:contain;';
        ct.appendChild(S.canvas);
        S.ctx = S.canvas.getContext('2d');

        S.t = 0;
        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);
            S.t += 1;
            renderFrame();
        }
        loop();
    }

    /* ── Main Render Frame ── */
    function renderFrame() {
        var w = S.canvas.width, h = S.canvas.height;
        var ctx = S.ctx;

        // Advance zoom scale exponentially
        S.scale *= (1.0 + S.zoomSpeed);

        // When scale hits 2x: smoothly cross-fade into next scene
        if (S.scale >= 2.0 && !S.inTransition) {
            S.inTransition = true;
            S.transitionProgress = 0;
            S.transitionAlpha = 0;
            // Trigger logo flash
            if (S.showLogoAtTransition) {
                S.logoAlpha = 0;
                S.logoFadeDir = 1;
            }
        }

        if (S.inTransition) {
            S.transitionProgress++;
            S.transitionAlpha = S.transitionProgress / S.transitionDuration;

            if (S.transitionProgress >= S.transitionDuration) {
                // Commit scene switch
                S.sceneIndex = (S.sceneIndex + 1) % S.numScenes;
                S.scale = 1.0;
                S.inTransition = false;
                S.transitionAlpha = 0;
            }
        }

        // Draw current scene (full frame)
        drawSceneZoomed(ctx, w, h, S.sceneIndex, S.scale);

        // Cross-fade next scene on top
        if (S.inTransition) {
            var nextIdx = (S.sceneIndex + 1) % S.numScenes;
            if (S.transitionStyle === 'glitch') {
                drawGlitchOverlay(ctx, w, h, nextIdx, S.transitionAlpha);
            } else if (S.transitionStyle === 'spiral') {
                drawSpiralOverlay(ctx, w, h, nextIdx, S.transitionAlpha);
            } else {
                // Linear cross-fade
                ctx.save();
                ctx.globalAlpha = S.transitionAlpha;
                drawSceneFullFit(ctx, w, h, nextIdx);
                ctx.restore();
            }
        }

        // Draw brand logo flash
        if (S.showLogoAtTransition && (S.inTransition || S.logoAlpha > 0)) {
            // Fade in during transition, fade out after
            if (S.inTransition) {
                S.logoAlpha = Math.min(1.0, S.logoAlpha + 0.06);
            } else {
                S.logoAlpha = Math.max(0, S.logoAlpha - 0.04);
            }
            drawBrandLogo(ctx, w, h, S.logoAlpha);
        }

        // Draw scene name label (bottom-left)
        drawSceneLabel(ctx, w, h);
    }

    /* ── Draw current scene with zoom applied ── */
    function drawSceneZoomed(ctx, w, h, sceneIdx, scale) {
        var scene = SCENES[sceneIdx];
        ctx.save();
        ctx.fillStyle = scene.bg;
        ctx.fillRect(0, 0, w, h);

        // Draw 6 layers scaled from small (far) to large (near)
        var numLayers = 7;
        for (var i = numLayers; i >= 0; i--) {
            var layerScale = scale * Math.pow(0.5, i);
            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.scale(layerScale, layerScale);
            scene.draw(ctx, w, h, i, S.t);
            ctx.restore();
        }
        ctx.restore();
    }

    /* ── Draw scene at 1:1 fit (for transitions) ── */
    function drawSceneFullFit(ctx, w, h, sceneIdx) {
        var scene = SCENES[sceneIdx];
        ctx.fillStyle = scene.bg;
        ctx.fillRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);
        scene.draw(ctx, w, h, 0, S.t);
        ctx.restore();
    }

    /* ── Glitch overlay transition ── */
    function drawGlitchOverlay(ctx, w, h, nextIdx, alpha) {
        var slices = 14;
        var sliceH = h / slices;
        for (var i = 0; i < slices; i++) {
            if (Math.random() > alpha * 1.2) continue;
            var offsetX = (Math.random() - 0.5) * w * alpha * 0.35;
            var sy = i * sliceH;
            var sh = sliceH * (0.8 + Math.random() * 0.4);
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, sy, w, sh);
            ctx.clip();
            ctx.translate(offsetX, 0);
            ctx.globalAlpha = alpha * (0.6 + Math.random() * 0.4);
            drawSceneFullFit(ctx, w, h, nextIdx);
            ctx.restore();
        }
        // scanline artifacts
        ctx.save();
        ctx.globalAlpha = alpha * 0.18;
        ctx.fillStyle = '#00ffff';
        for (var j = 0; j < h; j += 4) {
            if (Math.random() < 0.1) { ctx.fillRect(0, j, w, 1); }
        }
        ctx.restore();
    }

    /* ── Spiral overlay transition ── */
    function drawSpiralOverlay(ctx, w, h, nextIdx, alpha) {
        var cx = w / 2, cy = h / 2;
        var maxR = Math.sqrt(cx * cx + cy * cy);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(alpha * Math.PI * 1.5);
        ctx.globalAlpha = alpha;
        // Clip to a growing circle
        ctx.beginPath();
        ctx.arc(0, 0, maxR * alpha * 1.1, 0, Math.PI * 2);
        ctx.clip();
        ctx.translate(-cx, -cy);
        drawSceneFullFit(ctx, w, h, nextIdx);
        ctx.restore();
    }

    /* ── Brand Logo Flash ── */
    function drawBrandLogo(ctx, w, h, alpha) {
        if (alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = alpha;

        // Centered logo panel
        var pw = 380, ph = 100;
        var px = (w - pw) / 2, py = (h - ph) / 2;

        // Shadow glow
        ctx.shadowColor = '#9600ff';
        ctx.shadowBlur = 40 * alpha;

        // Panel background
        var g = ctx.createLinearGradient(px, py, px + pw, py + ph);
        g.addColorStop(0, 'rgba(150,0,255,0.9)');
        g.addColorStop(1, 'rgba(236,72,153,0.9)');
        ctx.fillStyle = g;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(px, py, pw, ph, 14);
        } else {
            ctx.rect(px, py, pw, ph);
        }
        ctx.fill();

        // Logo text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Arial Black", Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '6px';
        ctx.fillText(S.brandLogoText, w / 2, h / 2 - 4);

        // Tagline
        ctx.font = '13px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('∞ INFINITE PORTAL AD', w / 2, h / 2 + 32);

        ctx.restore();
    }

    /* ── Scene label bottom-left ── */
    function drawSceneLabel(ctx, w, h) {
        var scene = SCENES[S.sceneIndex];
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(16, h - 48, 200, 34, 8);
        } else {
            ctx.rect(16, h - 48, 200, 34);
        }
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#9600ff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(scene.name, 28, h - 30);
        ctx.restore();
    }

    /* ════════════════════════════════════════════
       SCENE DRAWERS — procedural art, drawn centered on (0,0)
       ctx is already translated to center, scale applied
    ════════════════════════════════════════════ */

    function drawTechScene(ctx, w, h, layer, t) {
        var hw = w / 2, hh = h / 2;
        var pulse = Math.sin(t * 0.04) * 0.3 + 0.7;

        // Grid lines
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.18)';
        ctx.lineWidth = 1;
        var step = 60;
        for (var gx = -hw; gx <= hw; gx += step) {
            ctx.beginPath(); ctx.moveTo(gx, -hh); ctx.lineTo(gx, hh); ctx.stroke();
        }
        for (var gy = -hh; gy <= hh; gy += step) {
            ctx.beginPath(); ctx.moveTo(-hw, gy); ctx.lineTo(hw, gy); ctx.stroke();
        }

        // Concentric CPU rings
        var rings = [320, 220, 140, 80, 40];
        rings.forEach(function (r, i) {
            ctx.strokeStyle = 'rgba(0, 200, 255, ' + (0.25 + i * 0.07) + ')';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, r * pulse, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Radial connector lines (circuit traces)
        var numLines = 16;
        ctx.strokeStyle = 'rgba(0,255,200,0.25)';
        ctx.lineWidth = 1;
        for (var k = 0; k < numLines; k++) {
            var angle = (k / numLines) * Math.PI * 2 + t * 0.01;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * 40, Math.sin(angle) * 40);
            ctx.lineTo(Math.cos(angle) * 330, Math.sin(angle) * 330);
            ctx.stroke();
        }

        // Center hexagon
        ctx.strokeStyle = 'rgba(0,200,255,0.7)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (var v = 0; v < 6; v++) {
            var vAngle = (v / 6) * Math.PI * 2 - Math.PI / 6;
            var vr = 35;
            if (v === 0) ctx.moveTo(Math.cos(vAngle) * vr, Math.sin(vAngle) * vr);
            else ctx.lineTo(Math.cos(vAngle) * vr, Math.sin(vAngle) * vr);
        }
        ctx.closePath();
        ctx.stroke();

        // Glowing center dot
        var cg = ctx.createRadialGradient(0, 0, 0, 0, 0, 26);
        cg.addColorStop(0, 'rgba(0,200,255,1)');
        cg.addColorStop(1, 'rgba(0,200,255,0)');
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();

        // Binary text scattered
        ctx.fillStyle = 'rgba(0,200,255,0.15)';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        for (var b = 0; b < 20; b++) {
            var bx = (Math.sin(b * 2.4 + t * 0.01) * hw * 0.75);
            var by = (Math.cos(b * 1.7 + t * 0.008) * hh * 0.65);
            ctx.fillText(Math.random() > 0.5 ? '1' : '0', bx, by);
        }
    }

    function drawNatureScene(ctx, w, h, layer, t) {
        var hw = w / 2, hh = h / 2;
        var sway = Math.sin(t * 0.02) * 0.05;

        // Background radial glow
        var bg = ctx.createRadialGradient(0, 0, 50, 0, 0, 400);
        bg.addColorStop(0, 'rgba(34,197,94,0.25)');
        bg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bg;
        ctx.fillRect(-hw, -hh, w, h);

        // Fibonacci spiral branches
        ctx.strokeStyle = 'rgba(34,197,94,0.5)';
        ctx.lineWidth = 2;
        var numBranches = 8;
        for (var br = 0; br < numBranches; br++) {
            var brAngle = (br / numBranches) * Math.PI * 2 + sway;
            ctx.save();
            ctx.rotate(brAngle);
            drawBranch(ctx, 0, 0, 0, -160, 0, t);
            ctx.restore();
        }

        // Pollen/particles
        ctx.fillStyle = 'rgba(163,230,53,0.5)';
        for (var p = 0; p < 30; p++) {
            var px = Math.sin(p * 5.3 + t * 0.015) * hw * 0.65;
            var py = Math.cos(p * 3.7 + t * 0.011) * hh * 0.65;
            var pr = 2.5 + Math.sin(p * 2.1 + t * 0.03) * 1.5;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();
        }

        // Leaf rings
        var leafColors = ['rgba(34,197,94,0.3)', 'rgba(22,163,74,0.25)', 'rgba(20,83,45,0.2)'];
        [280, 180, 90].forEach(function (r, i) {
            ctx.strokeStyle = leafColors[i];
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Center flower
        var flowerColors = ['#86efac', '#4ade80', '#22c55e'];
        for (var petal = 0; petal < 6; petal++) {
            var pAngle = (petal / 6) * Math.PI * 2 + sway;
            ctx.save();
            ctx.rotate(pAngle);
            var pg = ctx.createRadialGradient(0, -22, 0, 0, -22, 18);
            pg.addColorStop(0, '#86efac');
            pg.addColorStop(1, 'rgba(34,197,94,0)');
            ctx.fillStyle = pg;
            ctx.beginPath();
            ctx.ellipse(0, -22, 12, 18, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        // Center pistil
        var centG = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
        centG.addColorStop(0, '#fde047');
        centG.addColorStop(1, 'rgba(253,224,71,0)');
        ctx.fillStyle = centG;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBranch(ctx, x1, y1, x2, y2, depth, t) {
        if (depth > 4) return;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        var dx = x2 - x1, dy = y2 - y1;
        var len = Math.sqrt(dx * dx + dy * dy) * 0.62;
        var angle = Math.atan2(dy, dx) + Math.sin(t * 0.02 + depth) * 0.15;
        var angle2 = angle - 0.55;
        var angle3 = angle + 0.55;
        if (len > 6) {
            drawBranch(ctx, x2, y2, x2 + Math.cos(angle2) * len, y2 + Math.sin(angle2) * len, depth + 1, t);
            drawBranch(ctx, x2, y2, x2 + Math.cos(angle3) * len, y2 + Math.sin(angle3) * len, depth + 1, t);
        }
    }

    function drawCyberScene(ctx, w, h, layer, t) {
        var hw = w / 2, hh = h / 2;

        // Background mesh
        ctx.strokeStyle = 'rgba(168,85,247,0.12)';
        ctx.lineWidth = 1;
        var step = 70;
        for (var gx = -hw; gx <= hw; gx += step) {
            ctx.beginPath(); ctx.moveTo(gx, -hh); ctx.lineTo(gx, hh); ctx.stroke();
        }
        for (var gy = -hh; gy <= hh; gy += step) {
            ctx.beginPath(); ctx.moveTo(-hw, gy); ctx.lineTo(hw, gy); ctx.stroke();
        }

        // Neon scanning line
        var scanY = ((t * 3) % (h)) - hh;
        var scanG = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
        scanG.addColorStop(0, 'rgba(168,85,247,0)');
        scanG.addColorStop(0.5, 'rgba(168,85,247,0.5)');
        scanG.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.fillStyle = scanG;
        ctx.fillRect(-hw, scanY - 20, w, 40);

        // Neon hexagons
        var hexSizes = [300, 200, 120, 65, 30];
        hexSizes.forEach(function (r, i) {
            var hue = (i * 45 + t * 0.8) % 360;
            ctx.strokeStyle = 'hsla(' + hue + ', 100%, 70%, ' + (0.12 + i * 0.1) + ')';
            ctx.lineWidth = 1.5;
            ctx.save();
            ctx.rotate(t * 0.005 * (i % 2 === 0 ? 1 : -1));
            ctx.beginPath();
            for (var v = 0; v <= 6; v++) {
                var va = (v / 6) * Math.PI * 2;
                if (v === 0) ctx.moveTo(Math.cos(va) * r, Math.sin(va) * r);
                else ctx.lineTo(Math.cos(va) * r, Math.sin(va) * r);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        });

        // Neon nodes
        ctx.fillStyle = '#a855f7';
        var numNodes = 12;
        for (var n = 0; n < numNodes; n++) {
            var na = (n / numNodes) * Math.PI * 2;
            var nd = 150 + Math.sin(t * 0.03 + n) * 20;
            var nx = Math.cos(na) * nd;
            var ny = Math.sin(na) * nd;
            var nodeGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 12);
            nodeGlow.addColorStop(0, 'rgba(168,85,247,1)');
            nodeGlow.addColorStop(1, 'rgba(168,85,247,0)');
            ctx.fillStyle = nodeGlow;
            ctx.beginPath();
            ctx.arc(nx, ny, 12, 0, Math.PI * 2);
            ctx.fill();

            // Connector to center
            ctx.strokeStyle = 'rgba(168,85,247,0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(nx, ny);
            ctx.stroke();
        }

        // Center glowing orb
        var og = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
        og.addColorStop(0, 'rgba(236,72,153,1)');
        og.addColorStop(0.5, 'rgba(168,85,247,0.8)');
        og.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawSpaceScene(ctx, w, h, layer, t) {
        var hw = w / 2, hh = h / 2;

        // Stars
        var starCount = 80;
        ctx.fillStyle = '#ffffff';
        for (var s = 0; s < starCount; s++) {
            var sx = Math.sin(s * 7.3 + 1.5) * hw * 0.9;
            var sy = Math.cos(s * 5.1 + 0.8) * hh * 0.9;
            var sr = (s % 3 === 0) ? 2.5 : 1.2;
            var twinkle = 0.4 + Math.sin(t * 0.05 + s * 1.3) * 0.4;
            ctx.globalAlpha = twinkle;
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Nebula clouds
        var nebColors = [
            'rgba(139,92,246,0.08)',
            'rgba(59,130,246,0.06)',
            'rgba(236,72,153,0.07)'
        ];
        nebColors.forEach(function (c, i) {
            var ng = ctx.createRadialGradient(
                Math.cos(i * 2.1 + t * 0.005) * 120, Math.sin(i * 1.8 + t * 0.004) * 100, 0,
                Math.cos(i * 2.1 + t * 0.005) * 120, Math.sin(i * 1.8 + t * 0.004) * 100, 180
            );
            ng.addColorStop(0, c);
            ng.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = ng;
            ctx.fillRect(-hw, -hh, w, h);
        });

        // Galaxy arms spiral
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 2;
        var armCount = 3;
        for (var arm = 0; arm < armCount; arm++) {
            ctx.beginPath();
            for (var theta = 0; theta <= Math.PI * 4; theta += 0.05) {
                var r = theta * 35;
                var armAngle = theta + (arm / armCount) * Math.PI * 2 + t * 0.003;
                var ax = Math.cos(armAngle) * r;
                var ay = Math.sin(armAngle) * r;
                if (theta === 0) ctx.moveTo(ax, ay);
                else ctx.lineTo(ax, ay);
            }
            ctx.stroke();
        }

        // Planet in center
        var planetG = ctx.createRadialGradient(-12, -12, 4, 0, 0, 38);
        planetG.addColorStop(0, '#93c5fd');
        planetG.addColorStop(0.6, '#3b82f6');
        planetG.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = planetG;
        ctx.beginPath();
        ctx.arc(0, 0, 38, 0, Math.PI * 2);
        ctx.fill();

        // Planet ring
        ctx.save();
        ctx.rotate(0.5);
        ctx.strokeStyle = 'rgba(148,197,253,0.5)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.ellipse(0, 0, 72, 14, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Moon
        var moonAngle = t * 0.018;
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(Math.cos(moonAngle) * 80, Math.sin(moonAngle) * 80, 9, 0, Math.PI * 2);
        ctx.fill();
    }

    /* ── Exports ── */
    function exportPNG() {
        if (!S.canvas) return;
        var a = document.createElement('a');
        a.download = 'infinite-zoom-portal.png';
        a.href = S.canvas.toDataURL('image/png');
        a.click();
    }

    function exportVideo() {
        if (!S.canvas) return;
        var st = document.getElementById('iz-st');
        if (st) st.textContent = '⏺ Recording 6s Loop...';

        var stream = S.canvas.captureStream(30);
        var rec = new MediaRecorder(stream, { mimeType: 'video/webm' });
        var chunks = [];
        rec.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
        rec.onstop = function () {
            var url = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
            var a = document.createElement('a');
            a.href = url; a.download = 'infinite-zoom-loop.webm'; a.click();
            if (st) {
                st.textContent = '✅ Video exported!';
                setTimeout(function () { st.textContent = '● Portal Active'; }, 2000);
            }
        };
        rec.start();
        setTimeout(function () { rec.stop(); }, 6000);
    }

    function exportHTML5() {
        var st = document.getElementById('iz-st');
        if (st) st.textContent = '⏳ Building HTML5 bundle...';

        var adHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Infinite Zoom Portal — Interactive Ad</title>
<style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#000; display:flex; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
    canvas { width:100vmin; height:100vmin; max-width:700px; max-height:700px; display:block; }
    #cta {
        position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
        background:linear-gradient(135deg,#9600ff,#ec4899);
        color:#fff; border:none; padding:13px 36px; border-radius:50px;
        font-weight:900; font-size:14px; text-transform:uppercase;
        box-shadow:0 0 25px rgba(150,0,255,0.7); cursor:pointer;
        letter-spacing:2px; font-family:sans-serif;
    }
</style>
</head>
<body>
<canvas id="c" width="900" height="900"></canvas>
<button id="cta" onclick="alert('Welcome to the Portal!\\nPromo Code: ZOOM50')">ENTER THE PORTAL</button>
<script>
(function() {
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var t = 0, scale = 1.0, zoomSpeed = ${S.zoomSpeed}, sceneIndex = ${S.sceneIndex};
    var brandText = ${JSON.stringify(S.brandLogoText)};
    var transStyle = ${JSON.stringify(S.transitionStyle)};
    var inTrans = false, transProgress = 0, transAlpha = 0, transDur = 60;
    var logoAlpha = 0, logoFadeDir = 0;
    var numScenes = 4;

    function drawGrid(ctx, w, h, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 1;
        var step = 60;
        for(var gx=-w/2; gx<=w/2; gx+=step){ ctx.beginPath(); ctx.moveTo(gx,-h/2); ctx.lineTo(gx,h/2); ctx.stroke(); }
        for(var gy=-h/2; gy<=h/2; gy+=step){ ctx.beginPath(); ctx.moveTo(-w/2,gy); ctx.lineTo(w/2,gy); ctx.stroke(); }
    }

    function drawScene(ctx, w, h, si, t) {
        var hw=w/2, hh=h/2;
        if(si===0) { // Tech
            drawGrid(ctx,w,h,'rgba(0,200,255,0.15)');
            [300,200,120,60].forEach(function(r,i){
                ctx.strokeStyle='rgba(0,200,255,'+(0.15+i*0.1)+')'; ctx.lineWidth=1.5;
                ctx.beginPath(); ctx.arc(0,0,r*(0.85+Math.sin(t*0.03)*0.1),0,Math.PI*2); ctx.stroke();
            });
            var cg=ctx.createRadialGradient(0,0,0,0,0,28); cg.addColorStop(0,'rgba(0,200,255,1)'); cg.addColorStop(1,'rgba(0,200,255,0)');
            ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(0,0,28,0,Math.PI*2); ctx.fill();
        } else if(si===1) { // Nature
            var bg=ctx.createRadialGradient(0,0,50,0,0,400); bg.addColorStop(0,'rgba(34,197,94,0.2)'); bg.addColorStop(1,'rgba(0,0,0,0)');
            ctx.fillStyle=bg; ctx.fillRect(-hw,-hh,w,h);
            ctx.strokeStyle='rgba(34,197,94,0.5)'; ctx.lineWidth=2;
            for(var b=0;b<6;b++){
                var a=(b/6)*Math.PI*2+Math.sin(t*0.02)*0.08;
                ctx.save(); ctx.rotate(a);
                ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-180); ctx.stroke();
                ctx.restore();
            }
            [280,170,80].forEach(function(r){ ctx.strokeStyle='rgba(34,197,94,0.25)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke(); });
            var fg=ctx.createRadialGradient(0,0,0,0,0,20); fg.addColorStop(0,'#fde047'); fg.addColorStop(1,'rgba(253,224,71,0)');
            ctx.fillStyle=fg; ctx.beginPath(); ctx.arc(0,0,20,0,Math.PI*2); ctx.fill();
        } else if(si===2) { // Cyber
            drawGrid(ctx,w,h,'rgba(168,85,247,0.1)');
            [300,200,120,60,28].forEach(function(r,i){
                ctx.save(); ctx.rotate(t*0.004*(i%2?1:-1));
                ctx.strokeStyle='hsla('+(i*40+t*0.6)+'%,100%,70%,'+(0.1+i*0.09)+')'; ctx.lineWidth=1.5;
                ctx.beginPath();
                for(var v=0;v<=6;v++){var va=(v/6)*Math.PI*2; if(v===0)ctx.moveTo(Math.cos(va)*r,Math.sin(va)*r); else ctx.lineTo(Math.cos(va)*r,Math.sin(va)*r);}
                ctx.closePath(); ctx.stroke(); ctx.restore();
            });
            var og=ctx.createRadialGradient(0,0,0,0,0,38); og.addColorStop(0,'rgba(236,72,153,1)'); og.addColorStop(0.5,'rgba(168,85,247,0.7)'); og.addColorStop(1,'rgba(168,85,247,0)');
            ctx.fillStyle=og; ctx.beginPath(); ctx.arc(0,0,38,0,Math.PI*2); ctx.fill();
        } else { // Space
            ctx.fillStyle='#ffffff';
            for(var s=0;s<60;s++){
                var sx=Math.sin(s*7.3+1.5)*hw*0.85, sy=Math.cos(s*5.1+0.8)*hh*0.85;
                ctx.globalAlpha=0.4+Math.sin(t*0.05+s*1.3)*0.4;
                ctx.beginPath(); ctx.arc(sx,sy,s%3===0?2:1.2,0,Math.PI*2); ctx.fill();
            }
            ctx.globalAlpha=1;
            var pg=ctx.createRadialGradient(-10,-10,4,0,0,36); pg.addColorStop(0,'#93c5fd'); pg.addColorStop(0.6,'#3b82f6'); pg.addColorStop(1,'#1e3a5f');
            ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(0,0,36,0,Math.PI*2); ctx.fill();
            ctx.save(); ctx.rotate(0.5); ctx.strokeStyle='rgba(148,197,253,0.5)'; ctx.lineWidth=6;
            ctx.beginPath(); ctx.ellipse(0,0,72,14,0,0,Math.PI*2); ctx.stroke(); ctx.restore();
            var moonA=t*0.018;
            ctx.fillStyle='#cbd5e1'; ctx.beginPath(); ctx.arc(Math.cos(moonA)*80,Math.sin(moonA)*80,9,0,Math.PI*2); ctx.fill();
        }
    }

    function drawFull(ctx, w, h, si, t) {
        ctx.save(); ctx.translate(w/2, h/2); drawScene(ctx,w,h,si,t); ctx.restore();
    }

    function drawZoomed(ctx, w, h, si, scale, t) {
        ctx.fillStyle=['#030a1a','#020d06','#08000f','#010208'][si];
        ctx.fillRect(0,0,w,h);
        for(var i=7;i>=0;i--){
            var ls=scale*Math.pow(0.5,i);
            ctx.save(); ctx.translate(w/2,h/2); ctx.scale(ls,ls); drawScene(ctx,w,h,si,t); ctx.restore();
        }
    }

    function drawLogo(ctx, w, h, alpha) {
        if(alpha<=0) return;
        ctx.save(); ctx.globalAlpha=alpha;
        var pw=380,ph=100,px=(w-pw)/2,py=(h-ph)/2;
        ctx.shadowColor='#9600ff'; ctx.shadowBlur=40*alpha;
        var g=ctx.createLinearGradient(px,py,px+pw,py+ph); g.addColorStop(0,'rgba(150,0,255,0.9)'); g.addColorStop(1,'rgba(236,72,153,0.9)');
        ctx.fillStyle=g; ctx.beginPath(); ctx.rect(px,py,pw,ph); ctx.fill();
        ctx.shadowBlur=0; ctx.fillStyle='#fff'; ctx.font='bold 44px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(brandText, w/2, h/2-4);
        ctx.font='13px monospace'; ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.fillText('∞ INFINITE PORTAL AD', w/2, h/2+32);
        ctx.restore();
    }

    function loop() {
        requestAnimationFrame(loop);
        t++;
        var w=canvas.width, h=canvas.height;
        scale *= (1+zoomSpeed);
        if(scale>=2.0 && !inTrans){ inTrans=true; transProgress=0; transAlpha=0; logoAlpha=0; logoFadeDir=1; }
        if(inTrans){ transProgress++; transAlpha=transProgress/transDur; if(transProgress>=transDur){ sceneIndex=(sceneIndex+1)%numScenes; scale=1.0; inTrans=false; transAlpha=0; } }
        drawZoomed(ctx,w,h,sceneIndex,scale,t);
        if(inTrans){
            var ni=(sceneIndex+1)%numScenes;
            ctx.save(); ctx.globalAlpha=transAlpha; drawFull(ctx,w,h,ni,t); ctx.restore();
        }
        if(inTrans) logoAlpha=Math.min(1,logoAlpha+0.06);
        else logoAlpha=Math.max(0,logoAlpha-0.04);
        drawLogo(ctx,w,h,logoAlpha);
    }
    loop();
})();
</script>
</body>
</html>`;

        var zip = new window.JSZip();
        zip.file('index.html', adHTML);
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            var a = document.createElement('a');
            a.download = 'infinite-zoom-portal-ad.zip';
            a.href = URL.createObjectURL(content);
            a.click();
            URL.revokeObjectURL(a.href);

            if (st) {
                st.textContent = '✅ ZIP exported!';
                setTimeout(function () { st.textContent = '● Portal Active'; }, 2000);
            }
        });
    }

})();
