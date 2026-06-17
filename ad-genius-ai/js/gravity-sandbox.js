/* ====================================================
   Interactive "Gravity Bomb" Physics Sandbox Ad
   Features: draggable spheres, gravity bomb impulse,
   locked voucher zone that unlocks when cleared,
   device tilt physics, multiple backgrounds & lighting
   ==================================================== */
(function () {
    'use strict';
    var _prevRenderTab = window.renderTab;
    var S = {
        active: false, canvas: null, ctx: null, animId: null,
        bgType: 'cosmos',
        lightType: 'neon',
        brandColor: '#ff9600',
        couponCode: 'PROMO50',
        couponLabel: 'Clearance Sale',
        images: [null, null, null, null, null],
        voucherUnlocked: false,
        voucherProgress: 0,   // 0–1 how much area cleared
        bombCooldown: 0
    };

    window.renderTab = function (tab) {
        if (tab === 'gravity-sandbox') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-gravity-sandbox');
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel, .right-panel, .workspace').forEach(function (el) {
                el.style.display = 'none';
            });
            var ws = document.getElementById('gravity-sandbox-workspace');
            if (ws) ws.style.display = 'flex';
            var c = document.getElementById('gs-center');
            var r = document.getElementById('gs-right');
            if (c) c.style.display = 'flex';
            if (r) r.style.display = 'block';

            buildUI();
            initEngine();
            return;
        }
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    /* ── UI Panel ────────────────────────────────────── */
    function buildUI() {
        var r = document.getElementById('gs-right');
        if (!r) return;
        r.innerHTML = `
        <div style="color:white;font-family:sans-serif;">
            <h2 style="margin:0 0 4px;color:#ff9600;font-size:18px;">💥 Gravity Sandbox</h2>
            <p style="margin:0 0 18px;font-size:11px;color:#94a3b8;">Interactive Physics Ad</p>

            <label style="font-size:11px;color:#fcd34d;">Background:</label>
            <select id="gs-bg" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                <option value="cosmos">🌌 Cosmos (Stars)</option>
                <option value="rain">🌧️ Rain</option>
                <option value="snow">❄️ Snow</option>
                <option value="storm">⚡ Storm</option>
                <option value="ocean">🌊 Ocean</option>
                <option value="lava">🔥 Lava Floor</option>
            </select>

            <label style="font-size:11px;color:#fcd34d;">Lighting / Material:</label>
            <select id="gs-light" style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">
                <option value="neon">Neon Glow</option>
                <option value="plastic">Glossy Plastic</option>
                <option value="spotlight">Studio Spotlight</option>
                <option value="hologram">Hologram 3D</option>
                <option value="chrome">Chrome Mirror</option>
            </select>

            <label style="font-size:11px;color:#fcd34d;">Accent Color:</label><br>
            <input type="color" id="gs-c" value="${S.brandColor}"
                style="width:100%;height:30px;border:none;background:transparent;margin-bottom:12px;cursor:pointer;">

            <label style="font-size:11px;color:#fcd34d;">Voucher Code (prize):</label>
            <input type="text" id="gs-coupon" value="${S.couponCode}"
                style="width:100%;margin-bottom:6px;background:#1e293b;color:#fcd34d;border:1px solid #334155;padding:8px;border-radius:4px;font-weight:bold;letter-spacing:2px;">

            <label style="font-size:11px;color:#fcd34d;">Voucher Label:</label>
            <input type="text" id="gs-clabel" value="${S.couponLabel}"
                style="width:100%;margin-bottom:12px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">

            <label style="font-size:11px;color:#fcd34d;">Upload Sphere Images (1–5):</label>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:16px;background:#1e293b;padding:10px;border-radius:6px;border:1px solid #334155;">
                <input type="file" id="gs-f0" accept="image/*" style="font-size:10px;color:#94a3b8;">
                <input type="file" id="gs-f1" accept="image/*" style="font-size:10px;color:#94a3b8;">
                <input type="file" id="gs-f2" accept="image/*" style="font-size:10px;color:#94a3b8;">
                <input type="file" id="gs-f3" accept="image/*" style="font-size:10px;color:#94a3b8;">
                <input type="file" id="gs-f4" accept="image/*" style="font-size:10px;color:#94a3b8;">
            </div>

            <div style="background:rgba(255,150,0,0.12);border:1px solid rgba(255,150,0,0.4);border-radius:6px;padding:10px;margin-bottom:12px;font-size:11px;color:#fcd34d;">
                💣 <b>Gravity Bomb:</b> Right-click on canvas to detonate a radial impulse that pushes all balls away!
            </div>

            <button id="gs-reset"
                style="width:100%;background:#334155;color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer;margin-bottom:8px;font-size:12px;">
                🔄 Reset Physics
            </button>
            <button id="gs-bomb-btn"
                style="width:100%;background:linear-gradient(135deg,#ef4444,#b91c1c);color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer;margin-bottom:8px;font-size:12px;font-weight:bold;">
                💥 Detonate Bomb (Center)
            </button>
            <button id="gs-exp-html"
                style="width:100%;background:linear-gradient(135deg,#ff9600,#f59e0b);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;">
                🌐 Export Playable HTML5
            </button>
            <div id="gs-st" style="margin-top:12px;font-size:11px;text-align:center;color:#ff9600;">Engine Ready</div>
        </div>`;

        document.getElementById('gs-bg').onchange = function (e) { S.bgType = e.target.value; };
        document.getElementById('gs-light').onchange = function (e) { S.lightType = e.target.value; };
        document.getElementById('gs-c').oninput = function (e) { S.brandColor = e.target.value; };
        document.getElementById('gs-coupon').oninput = function (e) { S.couponCode = e.target.value; };
        document.getElementById('gs-clabel').oninput = function (e) { S.couponLabel = e.target.value; };

        for (var i = 0; i < 5; i++) {
            (function (idx) {
                var el = document.getElementById('gs-f' + idx);
                if (el) el.onchange = function (e) {
                    var f = e.target.files[0];
                    if (!f) return;
                    var rdr = new FileReader();
                    rdr.onload = function (ev) {
                        var img = new Image();
                        img.onload = function () { S.images[idx] = img; initSim(); };
                        img.src = ev.target.result;
                    };
                    rdr.readAsDataURL(f);
                };
            })(i);
        }

        document.getElementById('gs-reset').onclick = function () {
            S.voucherUnlocked = false;
            S.voucherProgress = 0;
            initSim();
        };
        document.getElementById('gs-bomb-btn').onclick = function () {
            detonateBomb(S.canvas.width / 2, S.canvas.height / 2, 300);
        };
        document.getElementById('gs-exp-html').onclick = exportHTML;
    }

    /* ── Physics state ───────────────────────────────── */
    var mod = {
        objs: [], env: [], sparks: [], blastWaves: [],
        isDown: false, mx: 0, my: 0, dragObj: null,
        t: 0, gx: 0, gy: 1.0,
        voucherY: 0 // canvas-space Y of the voucher zone bottom
    };

    function initSim() {
        mod.objs = [];
        mod.env = [];
        mod.sparks = [];
        mod.blastWaves = [];
        S.voucherUnlocked = false;
        S.voucherProgress = 0;
        var w = S.canvas ? S.canvas.width : 400;
        var h = S.canvas ? S.canvas.height : 600;
        mod.voucherY = h - 80;

        for (var i = 0; i < 100; i++) {
            mod.env.push({ x: Math.random() * w, y: Math.random() * h, s: 0.5 + Math.random() * 2, r: Math.random() * 2 });
        }

        var numBalls = 5;
        var r0 = Math.min(w, h) * 0.12;
        for (var i = 0; i < numBalls; i++) {
            mod.objs.push({
                x: w / 2 + (Math.random() - 0.5) * w * 0.5,
                y: -80 - i * 120,
                vx: (Math.random() - 0.5) * 3,
                vy: 0,
                radius: r0,
                imgIdx: i
            });
        }
    }

    /* ── Gravity bomb ────────────────────────────────── */
    function detonateBomb(bx, by, strength) {
        if (S.bombCooldown > 0) return;
        S.bombCooldown = 60;

        // Radial impulse to all objects
        mod.objs.forEach(function (o) {
            var dx = o.x - bx;
            var dy = o.y - by;
            var dist = Math.hypot(dx, dy) || 1;
            var force = strength / (dist * 0.5 + 80);
            o.vx += (dx / dist) * force;
            o.vy += (dy / dist) * force;
        });

        // Sparks burst at bomb point
        for (var i = 0; i < 40; i++) {
            var ang = (i / 40) * Math.PI * 2;
            var spd = 5 + Math.random() * 15;
            mod.sparks.push({
                x: bx, y: by,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                l: 1.0, r: 2 + Math.random() * 4
            });
        }

        // Blast wave ring
        mod.blastWaves.push({ x: bx, y: by, r: 10, maxR: 250, l: 1.0 });
    }

    /* ── Engine init ─────────────────────────────────── */
    function initEngine() {
        if (S.active) return;
        S.active = true;
        var ct = document.getElementById('gs-center');
        ct.innerHTML = '';

        S.canvas = document.createElement('canvas');
        S.canvas.width = 400; S.canvas.height = 600;
        S.canvas.style.height = '100%';
        S.canvas.style.maxHeight = '700px';
        S.canvas.style.aspectRatio = '2 / 3';
        S.canvas.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
        S.canvas.style.borderRadius = '8px';
        ct.appendChild(S.canvas);
        S.ctx = S.canvas.getContext('2d');

        // Hint label
        var hint = document.createElement('div');
        hint.style.cssText = 'color:#475569;font-size:11px;text-align:center;margin-top:10px;font-family:sans-serif;';
        hint.textContent = '🖱️ Drag balls · Right-click for Gravity Bomb · Tilt device';
        ct.appendChild(hint);

        initSim();

        // Device tilt
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (e) {
                if (e.gamma === null) return;
                mod.gx = e.gamma / 45;
                mod.gy = Math.max(0.2, e.beta / 45);
                var maxG = Math.max(Math.abs(mod.gx), Math.abs(mod.gy));
                if (maxG > 1) { mod.gx /= maxG; mod.gy /= maxG; }
            });
        }

        // Mouse drag
        S.canvas.addEventListener('mousedown', function (e) {
            mod.isDown = true;
            var rect = S.canvas.getBoundingClientRect();
            mod.mx = (e.clientX - rect.left) * (S.canvas.width / rect.width);
            mod.my = (e.clientY - rect.top) * (S.canvas.height / rect.height);
            checkDrag();
        });
        S.canvas.addEventListener('mousemove', function (e) {
            if (!mod.isDown) return;
            var rect = S.canvas.getBoundingClientRect();
            mod.mx = (e.clientX - rect.left) * (S.canvas.width / rect.width);
            mod.my = (e.clientY - rect.top) * (S.canvas.height / rect.height);
            if (mod.dragObj) { mod.dragObj.x = mod.mx; mod.dragObj.y = mod.my; mod.dragObj.vx = 0; mod.dragObj.vy = 0; }
        });
        S.canvas.addEventListener('mouseup', function () { mod.isDown = false; mod.dragObj = null; });
        S.canvas.addEventListener('mouseleave', function () { mod.isDown = false; mod.dragObj = null; });

        // Right-click = gravity bomb
        S.canvas.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            var rect = S.canvas.getBoundingClientRect();
            var bx = (e.clientX - rect.left) * (S.canvas.width / rect.width);
            var by = (e.clientY - rect.top) * (S.canvas.height / rect.height);
            detonateBomb(bx, by, 400);
        });

        // Touch
        S.canvas.addEventListener('touchstart', function (e) {
            mod.isDown = true;
            var rect = S.canvas.getBoundingClientRect();
            mod.mx = (e.touches[0].clientX - rect.left) * (S.canvas.width / rect.width);
            mod.my = (e.touches[0].clientY - rect.top) * (S.canvas.height / rect.height);
            checkDrag();
        }, { passive: true });
        S.canvas.addEventListener('touchmove', function (e) {
            var rect = S.canvas.getBoundingClientRect();
            mod.mx = (e.touches[0].clientX - rect.left) * (S.canvas.width / rect.width);
            mod.my = (e.touches[0].clientY - rect.top) * (S.canvas.height / rect.height);
            if (mod.dragObj) { mod.dragObj.x = mod.mx; mod.dragObj.y = mod.my; mod.dragObj.vx = 0; mod.dragObj.vy = 0; }
        }, { passive: true });
        S.canvas.addEventListener('touchend', function () { mod.isDown = false; mod.dragObj = null; });

        function checkDrag() {
            mod.dragObj = null;
            for (var i = 0; i < mod.objs.length; i++) {
                if (Math.hypot(mod.objs[i].x - mod.mx, mod.objs[i].y - mod.my) < mod.objs[i].radius) {
                    mod.dragObj = mod.objs[i]; break;
                }
            }
        }

        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);
            renderCanvas();
        }
        loop();
    }

    /* ── Rendering ───────────────────────────────────── */
    function renderCanvas() {
        var w = S.canvas.width, h = S.canvas.height;
        var ctx = S.ctx;
        mod.t += 0.05;
        if (S.bombCooldown > 0) S.bombCooldown--;

        /* ── Background ── */
        drawBG(ctx, w, h);

        /* ── Voucher zone (locked) ── */
        drawVoucherZone(ctx, w, h);

        /* ── Blast waves ── */
        for (var i = mod.blastWaves.length - 1; i >= 0; i--) {
            var bw = mod.blastWaves[i];
            bw.r += 12;
            bw.l -= 0.04;
            if (bw.l <= 0) { mod.blastWaves.splice(i, 1); continue; }
            ctx.save();
            ctx.globalAlpha = bw.l;
            ctx.strokeStyle = S.brandColor;
            ctx.lineWidth = 3;
            ctx.shadowColor = S.brandColor;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(bw.x, bw.y, bw.r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        /* ── Sparks ── */
        for (var s = mod.sparks.length - 1; s >= 0; s--) {
            var sp = mod.sparks[s];
            sp.x += sp.vx; sp.y += sp.vy;
            sp.vy += 0.2;
            sp.l -= 0.04;
            if (sp.l <= 0) { mod.sparks.splice(s, 1); continue; }
            ctx.fillStyle = S.brandColor;
            ctx.globalAlpha = sp.l;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.r || 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        /* ── Physics + draw balls ── */
        var objsInZone = 0;
        for (var i = 0; i < mod.objs.length; i++) {
            var o = mod.objs[i];
            if (o !== mod.dragObj) {
                o.vx += mod.gx * 0.5;
                o.vy += mod.gy * 0.5;
                o.vy *= 0.99; o.vx *= 0.99;
                o.x += o.vx; o.y += o.vy;
                if (o.x < o.radius) { o.x = o.radius; o.vx *= -0.7; }
                if (o.x > w - o.radius) { o.x = w - o.radius; o.vx *= -0.7; }
                if (o.y < o.radius) { o.y = o.radius; o.vy *= -0.7; }
                if (o.y > h - o.radius) { o.y = h - o.radius; o.vy *= -0.7; }
            }

            // Check if ball overlaps voucher zone
            if (!S.voucherUnlocked && o.y + o.radius > mod.voucherY) {
                objsInZone++;
            }

            for (var j = i + 1; j < mod.objs.length; j++) {
                var o2 = mod.objs[j];
                var dx = o2.x - o.x, dy = o2.y - o.y;
                var dist = Math.hypot(dx, dy);
                var minDist = o.radius + o2.radius;
                if (dist < minDist) {
                    var ang = Math.atan2(dy, dx);
                    var force = (minDist - dist) * 0.5;
                    var fx = Math.cos(ang) * force, fy = Math.sin(ang) * force;
                    if (o !== mod.dragObj) { o.x -= fx; o.y -= fy; o.vx -= fx * 0.1; o.vy -= fy * 0.1; }
                    if (o2 !== mod.dragObj) { o2.x += fx; o2.y += fy; o2.vx += fx * 0.1; o2.vy += fy * 0.1; }
                    if (force > 2 && Math.random() > 0.5) {
                        var cpX = o.x + Math.cos(ang) * o.radius;
                        var cpY = o.y + Math.sin(ang) * o.radius;
                        for (var sk = 0; sk < 4; sk++) {
                            mod.sparks.push({ x: cpX, y: cpY, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8, l: 0.8, r: 2 });
                        }
                    }
                }
            }
            drawBall(ctx, o);
        }

        // Voucher unlock logic
        if (!S.voucherUnlocked) {
            S.voucherProgress = Math.max(0, 1 - (objsInZone / mod.objs.length));
            if (objsInZone === 0) {
                S.voucherUnlocked = true;
            }
        }
    }

    function drawBG(ctx, w, h) {
        if (S.bgType === 'cosmos') {
            ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#fff';
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s;
                if (mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random() * w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r, 0, Math.PI * 2); ctx.fill();
            }
        } else if (S.bgType === 'rain') {
            ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 5;
                if (mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random() * w; }
                ctx.beginPath(); ctx.moveTo(mod.env[i].x, mod.env[i].y); ctx.lineTo(mod.env[i].x - 1, mod.env[i].y + 12); ctx.stroke();
            }
        } else if (S.bgType === 'snow') {
            ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#fff';
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 0.5; mod.env[i].x += Math.sin(mod.t + i) * 0.5;
                if (mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random() * w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r * 1.5, 0, Math.PI * 2); ctx.fill();
            }
        } else if (S.bgType === 'storm') {
            ctx.fillStyle = (Math.random() > 0.95 && Math.random() > 0.5) ? '#fff' : '#000';
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = 'rgba(200,220,255,0.8)'; ctx.lineWidth = 1;
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 5;
                if (mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random() * w; }
                ctx.beginPath(); ctx.moveTo(mod.env[i].x, mod.env[i].y); ctx.lineTo(mod.env[i].x - 2, mod.env[i].y + 15); ctx.stroke();
            }
        } else if (S.bgType === 'ocean') {
            var grd = ctx.createLinearGradient(0, 0, 0, h);
            grd.addColorStop(0, '#0284c7'); grd.addColorStop(1, '#082f49');
            ctx.fillStyle = grd; ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y -= mod.env[i].s; mod.env[i].x += Math.sin(mod.t + i);
                if (mod.env[i].y < 0) { mod.env[i].y = h; mod.env[i].x = Math.random() * w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r * 2, 0, Math.PI * 2); ctx.stroke();
            }
        } else if (S.bgType === 'lava') {
            var lg = ctx.createLinearGradient(0, 0, 0, h);
            lg.addColorStop(0, '#1c0a00'); lg.addColorStop(0.7, '#3d0000'); lg.addColorStop(1, '#7f1d1d');
            ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h);
            for (var i = 0; i < mod.env.length; i++) {
                mod.env[i].y -= mod.env[i].s * 0.3; mod.env[i].x += Math.sin(mod.t * 0.5 + i) * 0.5;
                if (mod.env[i].y < 0) { mod.env[i].y = h; mod.env[i].x = Math.random() * w; }
                ctx.fillStyle = 'rgba(255,' + Math.floor(50 + mod.env[i].r * 30) + ',0,' + (0.3 + mod.env[i].r * 0.1) + ')';
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r * 3, 0, Math.PI * 2); ctx.fill();
            }
        }
    }

    function drawVoucherZone(ctx, w, h) {
        var zoneH = 80;
        var vy = mod.voucherY;

        if (S.voucherUnlocked) {
            // Unlocked — glowing green reveal
            var t = mod.t;
            ctx.save();
            var grd = ctx.createLinearGradient(0, vy, 0, h);
            grd.addColorStop(0, 'rgba(0,200,80,0.15)');
            grd.addColorStop(1, 'rgba(0,200,80,0.35)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, vy, w, zoneH);

            // Border glow
            ctx.strokeStyle = '#00e676';
            ctx.lineWidth = 2 + Math.sin(t * 3) * 0.5;
            ctx.shadowColor = '#00e676';
            ctx.shadowBlur = 15;
            ctx.strokeRect(2, vy + 2, w - 4, zoneH - 4);

            // Coupon text
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('🎉 ' + S.couponLabel, w / 2, vy + 28);

            ctx.fillStyle = '#fcd34d';
            ctx.font = 'bold 26px monospace';
            ctx.letterSpacing = '4px';
            ctx.fillText(S.couponCode, w / 2, vy + 62);
            ctx.restore();
        } else {
            // Locked zone — frosted with lock icon
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, vy, w, zoneH);

            // Scanlines
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = '#fff';
            for (var ly = vy; ly < vy + zoneH; ly += 4) {
                ctx.fillRect(0, ly, w, 2);
            }
            ctx.globalAlpha = 1;

            // Progress bar inside zone
            var prog = S.voucherProgress;
            ctx.fillStyle = 'rgba(255,150,0,0.25)';
            ctx.fillRect(0, vy, w * prog, zoneH);

            // Dashed border
            ctx.strokeStyle = S.brandColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.strokeRect(2, vy + 2, w - 4, zoneH - 4);
            ctx.setLineDash([]);

            // Lock icon + text
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('🔒 Clear the area to unlock your voucher!', w / 2, vy + 30);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '11px sans-serif';
            ctx.fillText('Use the Gravity Bomb or drag balls away', w / 2, vy + 52);

            ctx.fillStyle = S.brandColor;
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('Progress: ' + Math.round(prog * 100) + '%', w / 2, vy + 70);
            ctx.restore();
        }
    }

    function drawBall(ctx, o) {
        ctx.save();
        ctx.translate(o.x, o.y);
        var speed = Math.hypot(o.vx, o.vy);
        var angle = Math.atan2(o.vy, o.vx);
        var stretch = Math.min(1 + speed * 0.02, 1.5);
        var squash = Math.max(1 / stretch, 0.6);
        ctx.rotate(angle); ctx.scale(stretch, squash); ctx.rotate(-angle);

        // Lighting shadow/glow
        if (S.lightType === 'neon') {
            ctx.shadowColor = S.brandColor; ctx.shadowBlur = 22;
        } else if (S.lightType === 'spotlight') {
            ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 20;
        } else if (S.lightType === 'plastic') {
            ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 5;
        } else if (S.lightType === 'hologram') {
            ctx.globalAlpha = 0.75; ctx.shadowColor = S.brandColor; ctx.shadowBlur = 12;
        } else if (S.lightType === 'chrome') {
            ctx.shadowColor = '#aaaaff'; ctx.shadowBlur = 15;
        }

        ctx.beginPath();
        ctx.arc(0, 0, o.radius, 0, Math.PI * 2);

        var img = S.images[o.imgIdx];
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.save();
            ctx.clip();
            ctx.drawImage(img, -o.radius, -o.radius, o.radius * 2, o.radius * 2);
            if (S.lightType === 'plastic') {
                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                ctx.beginPath();
                ctx.ellipse(0, -o.radius * 0.55, o.radius * 0.55, o.radius * 0.2, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (S.lightType === 'hologram') {
                ctx.fillStyle = S.brandColor;
                for (var ly = -o.radius; ly < o.radius; ly += 4) {
                    ctx.fillRect(-o.radius, ly, o.radius * 2, 1);
                }
            } else if (S.lightType === 'chrome') {
                var rg = ctx.createRadialGradient(-o.radius * 0.3, -o.radius * 0.3, 0, 0, 0, o.radius);
                rg.addColorStop(0, 'rgba(255,255,255,0.6)');
                rg.addColorStop(0.5, 'rgba(255,255,255,0.0)');
                rg.addColorStop(1, 'rgba(0,0,0,0.4)');
                ctx.fillStyle = rg;
                ctx.beginPath(); ctx.arc(0, 0, o.radius, 0, Math.PI * 2); ctx.fill();
            } else {
                ctx.lineWidth = 4; ctx.strokeStyle = S.brandColor; ctx.stroke();
            }
            ctx.restore();
        } else {
            var grad = ctx.createRadialGradient(-o.radius * 0.3, -o.radius * 0.3, 0, 0, 0, o.radius);
            grad.addColorStop(0, lightenColor(S.brandColor, 60));
            grad.addColorStop(1, S.brandColor);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.stroke();
        }
        ctx.restore();
    }

    function lightenColor(hex, amount) {
        var n = parseInt(hex.replace('#', ''), 16);
        var r = Math.min(255, (n >> 16) + amount);
        var g = Math.min(255, ((n >> 8) & 0xff) + amount);
        var b = Math.min(255, (n & 0xff) + amount);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    /* ── Export HTML5 ────────────────────────────────── */
    function exportHTML() {
        var imgDataArr = S.images.map(function (img) { return img ? img.src : null; });
        var html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Gravity Sandbox Ad</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#050505;overflow:hidden;display:flex;align-items:center;justify-content:center;height:100vh;touch-action:none;font-family:sans-serif;}
canvas{box-shadow:0 10px 40px rgba(0,0,0,0.9);border-radius:8px;max-height:100vh;}
#hint{position:fixed;bottom:12px;left:0;right:0;text-align:center;color:#475569;font-size:11px;}
#bomb-ui{position:fixed;top:12px;right:12px;}
#bomb-ui button{background:linear-gradient(135deg,#ef4444,#b91c1c);color:#fff;border:none;padding:8px 14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;}
</style>
</head>
<body>
<div id="bomb-ui"><button onclick="detonateBomb(W/2,H/2,400)">💥 Bomb</button></div>
<div id="hint">🖱️ Drag balls · Right-click or tap Bomb · Tilt device</div>
<script>
var BC='${S.brandColor}',BG='${S.bgType}',LT='${S.lightType}';
var COUPON='${S.couponCode}',CLABEL='${S.couponLabel}';
var imgDataArr=${JSON.stringify(imgDataArr)};

var cvs=document.createElement('canvas');
var W=Math.min(window.innerWidth,window.innerHeight*2/3<500?500:window.innerHeight*2/3);
var H=W*1.5;
cvs.width=W; cvs.height=H;
document.body.insertBefore(cvs,document.getElementById('hint'));
var ctx=cvs.getContext('2d');

var imgs=imgDataArr.map(function(d){if(!d)return null;var i=new Image();i.src=d;return i;});
var env=[],objs=[],sparks=[],blastWaves=[];
var t=0,gx=0,gy=1,voucherUnlocked=false,voucherY=H-80;
var bombCooldown=0;

for(var i=0;i<100;i++) env.push({x:Math.random()*W,y:Math.random()*H,s:0.5+Math.random()*2,r:Math.random()*2});
for(var i=0;i<5;i++) objs.push({x:W/2+(Math.random()-0.5)*W*0.5,y:-80-i*120,vx:(Math.random()-0.5)*3,vy:0,radius:Math.min(W,H)*0.12,imgIdx:i});

if(window.DeviceOrientationEvent){
  window.addEventListener('deviceorientation',function(e){
    if(e.gamma===null)return;
    gx=e.gamma/45; gy=Math.max(0.2,e.beta/45);
    var mx=Math.max(Math.abs(gx),Math.abs(gy));
    if(mx>1){gx/=mx;gy/=mx;}
  });
}

var isDown=false,mx=0,my=0,dragObj=null;
function getPos(e,touch){
  var r=cvs.getBoundingClientRect();
  var cx=touch?e.touches[0].clientX:e.clientX;
  var cy=touch?e.touches[0].clientY:e.clientY;
  return{x:(cx-r.left)*(W/r.width),y:(cy-r.top)*(H/r.height)};
}
cvs.addEventListener('mousedown',function(e){isDown=true;var p=getPos(e);mx=p.x;my=p.y;checkDrag();});
cvs.addEventListener('mousemove',function(e){if(!isDown)return;var p=getPos(e);mx=p.x;my=p.y;if(dragObj){dragObj.x=mx;dragObj.y=my;dragObj.vx=0;dragObj.vy=0;}});
cvs.addEventListener('mouseup',function(){isDown=false;dragObj=null;});
cvs.addEventListener('contextmenu',function(e){e.preventDefault();var p=getPos(e);detonateBomb(p.x,p.y,400);});
cvs.addEventListener('touchstart',function(e){isDown=true;var p=getPos(e,true);mx=p.x;my=p.y;checkDrag();},{passive:true});
cvs.addEventListener('touchmove',function(e){var p=getPos(e,true);mx=p.x;my=p.y;if(dragObj){dragObj.x=mx;dragObj.y=my;dragObj.vx=0;dragObj.vy=0;}},{passive:true});
cvs.addEventListener('touchend',function(){isDown=false;dragObj=null;});
function checkDrag(){dragObj=null;for(var i=0;i<objs.length;i++){if(Math.hypot(objs[i].x-mx,objs[i].y-my)<objs[i].radius){dragObj=objs[i];break;}}}

function detonateBomb(bx,by,str){
  if(bombCooldown>0)return;
  bombCooldown=60;
  objs.forEach(function(o){var dx=o.x-bx,dy=o.y-by,d=Math.hypot(dx,dy)||1,f=str/(d*0.5+80);o.vx+=(dx/d)*f;o.vy+=(dy/d)*f;});
  for(var i=0;i<40;i++){var a=(i/40)*Math.PI*2,sp=5+Math.random()*15;sparks.push({x:bx,y:by,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,l:1,r:3});}
  blastWaves.push({x:bx,y:by,r:10,maxR:250,l:1});
}

function loop(){
  requestAnimationFrame(loop);
  t+=0.05; if(bombCooldown>0)bombCooldown--;
  ctx.fillStyle='#050505'; ctx.fillRect(0,0,W,H);
  
  // Starfield
  ctx.fillStyle='#fff';
  for(var i=0;i<env.length;i++){env[i].y+=env[i].s;if(env[i].y>H){env[i].y=0;env[i].x=Math.random()*W;}ctx.beginPath();ctx.arc(env[i].x,env[i].y,env[i].r,0,Math.PI*2);ctx.fill();}
  
  // Voucher zone
  if(voucherUnlocked){
    var vg=ctx.createLinearGradient(0,voucherY,0,H);vg.addColorStop(0,'rgba(0,200,80,0.15)');vg.addColorStop(1,'rgba(0,200,80,0.35)');
    ctx.fillStyle=vg;ctx.fillRect(0,voucherY,W,80);
    ctx.strokeStyle='#00e676';ctx.lineWidth=2;ctx.shadowColor='#00e676';ctx.shadowBlur=15;ctx.strokeRect(2,voucherY+2,W-4,76);ctx.shadowBlur=0;
    ctx.fillStyle='#fff';ctx.font='bold 13px monospace';ctx.textAlign='center';ctx.fillText('🎉 '+CLABEL,W/2,voucherY+28);
    ctx.fillStyle='#fcd34d';ctx.font='bold 26px monospace';ctx.fillText(COUPON,W/2,voucherY+62);
  } else {
    ctx.fillStyle='rgba(0,0,0,0.7)';ctx.fillRect(0,voucherY,W,80);
    ctx.strokeStyle=BC;ctx.lineWidth=2;ctx.setLineDash([8,6]);ctx.strokeRect(2,voucherY+2,W-4,76);ctx.setLineDash([]);
    ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('🔒 Clear the area to unlock voucher!',W/2,voucherY+30);
    ctx.fillStyle='#94a3b8';ctx.font='11px sans-serif';ctx.fillText('Right-click or press Bomb',W/2,voucherY+55);
  }
  
  // Blast waves
  for(var i=blastWaves.length-1;i>=0;i--){var bw=blastWaves[i];bw.r+=12;bw.l-=0.04;if(bw.l<=0){blastWaves.splice(i,1);continue;}ctx.save();ctx.globalAlpha=bw.l;ctx.strokeStyle=BC;ctx.lineWidth=3;ctx.shadowColor=BC;ctx.shadowBlur=20;ctx.beginPath();ctx.arc(bw.x,bw.y,bw.r,0,Math.PI*2);ctx.stroke();ctx.restore();}
  
  // Sparks
  for(var s=sparks.length-1;s>=0;s--){var sp=sparks[s];sp.x+=sp.vx;sp.y+=sp.vy;sp.vy+=0.2;sp.l-=0.04;if(sp.l<=0){sparks.splice(s,1);continue;}ctx.fillStyle=BC;ctx.globalAlpha=sp.l;ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r||2,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  
  // Physics
  var inZone=0;
  for(var i=0;i<objs.length;i++){
    var o=objs[i];
    if(o!==dragObj){o.vx+=gx*0.5;o.vy+=gy*0.5;o.vy*=0.99;o.vx*=0.99;o.x+=o.vx;o.y+=o.vy;if(o.x<o.radius){o.x=o.radius;o.vx*=-0.7;}if(o.x>W-o.radius){o.x=W-o.radius;o.vx*=-0.7;}if(o.y<o.radius){o.y=o.radius;o.vy*=-0.7;}if(o.y>H-o.radius){o.y=H-o.radius;o.vy*=-0.7;}}
    if(!voucherUnlocked&&o.y+o.radius>voucherY)inZone++;
    for(var j=i+1;j<objs.length;j++){var o2=objs[j],dx=o2.x-o.x,dy=o2.y-o.y,dist=Math.hypot(dx,dy),md=o.radius+o2.radius;if(dist<md){var an=Math.atan2(dy,dx),fo=(md-dist)*0.5,fx=Math.cos(an)*fo,fy=Math.sin(an)*fo;if(o!==dragObj){o.x-=fx;o.y-=fy;o.vx-=fx*0.1;o.vy-=fy*0.1;}if(o2!==dragObj){o2.x+=fx;o2.y+=fy;o2.vx+=fx*0.1;o2.vy+=fy*0.1;}}}
    // Draw ball
    ctx.save();ctx.translate(o.x,o.y);ctx.shadowColor=BC;ctx.shadowBlur=20;ctx.beginPath();ctx.arc(0,0,o.radius,0,Math.PI*2);
    if(imgs[o.imgIdx]&&imgs[o.imgIdx].complete){ctx.clip();ctx.drawImage(imgs[o.imgIdx],-o.radius,-o.radius,o.radius*2,o.radius*2);}
    else{var gr=ctx.createRadialGradient(-o.radius*0.3,-o.radius*0.3,0,0,0,o.radius);gr.addColorStop(0,'#fff');gr.addColorStop(1,BC);ctx.fillStyle=gr;ctx.fill();}
    ctx.restore();
  }
  if(!voucherUnlocked&&inZone===0)voucherUnlocked=true;
}
loop();
<\/script>
</body>
</html>`;

        var blob = new Blob([html], { type: 'text/html' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'gravity_sandbox_ad.html';
        a.click();
        var st = document.getElementById('gs-st');
        if (st) {
            st.textContent = '✅ Exported!';
            setTimeout(function () { st.textContent = 'Engine Ready'; }, 2500);
        }
    }

})();
