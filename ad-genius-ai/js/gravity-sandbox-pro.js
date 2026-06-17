(function() {
    'use strict';
    var _prevRenderTab = window.renderTab;
    var S = {
        active: false, canvas: null, ctx: null, animId: null,
        bgType: 'cosmos', lightType: 'neon', brandColor: '#ff3200',
        counts: { circle: 2, square: 2, rect: 1, triangle: 1, hexagon: 1 },
        slots: [] // Array of { type: 'circle', imgData: null, fileId: '...' }
    };

    var mod = { engine: null, runner: null, bodies: [], env: [], t: 0 };

    window.renderTab = function(tab) {
        if (tab === 'gravity-sandbox-pro') {
            window.activeTab = tab;
            document.querySelectorAll('.ltab').forEach(function(b) { b.classList.remove('active'); });
            var btn = document.getElementById('tab-' + tab);
            if (btn) btn.classList.add('active');

            document.querySelectorAll('.center-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.right-panel').forEach(function(p) { p.style.display = 'none'; });
            document.querySelectorAll('.workspace').forEach(function(w) { w.style.display = 'none'; });

            var ws = document.getElementById(tab + '-workspace');
            if (ws) ws.style.display = 'flex';
            
            var c = document.getElementById('gsp-center');
            var r = document.getElementById('gsp-right');
            if(c) c.style.display = 'flex';
            if(r) r.style.display = 'block';

            buildUI();
            initEngine();
            return;
        }
        
        S.active = false;
        if (S.animId) cancelAnimationFrame(S.animId);
        if (mod.runner) { Matter.Runner.stop(mod.runner); mod.runner=null; }
        if (mod.engine) { Matter.Engine.clear(mod.engine); mod.engine=null; }
        
        if (_prevRenderTab) _prevRenderTab(tab);
    };

    function buildUI() {
        var r = document.getElementById('gsp-right');
        if (!r) return;

        var html = '<div style="color:white;font-family:sans-serif;">' +
            '<h2 style="margin:0 0 5px;color:#ff3200;font-size:18px;">🔥 Gravity Pro</h2>' +
            '<p style="margin:0 0 20px;font-size:11px;color:#94a3b8;">Matter.js Physics Ad</p>' +
            
            '<label style="font-size:11px;color:#fca5a5;">Animated Background:</label>' +
            '<select id="gsp-bg" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">' +
                '<option value="cosmos">🌌 Cosmos (Stars)</option>' +
                '<option value="rain">🌧️ Rain</option>' +
                '<option value="snow">❄️ Snow</option>' +
                '<option value="storm">⚡ Storm</option>' +
                '<option value="ocean">🌊 Ocean</option>' +
            '</select>' +
            
            '<label style="font-size:11px;color:#fca5a5;">Lighting & Material:</label>' +
            '<select id="gsp-light" style="width:100%;margin-bottom:10px;background:#1e293b;color:#fff;border:1px solid #334155;padding:8px;border-radius:4px;">' +
                '<option value="neon">Neon Glow</option>' +
                '<option value="plastic">Glossy Plastic</option>' +
                '<option value="spotlight">Studio Spotlight</option>' +
                '<option value="hologram">Hologram 3D</option>' +
            '</select>' +
            
            '<label style="font-size:11px;color:#fca5a5;">Accent Color / FX:</label><br>' +
            '<input type="color" id="gsp-c" value="'+S.brandColor+'" style="width:100%;height:30px;border:none;background:transparent;margin-bottom:15px;cursor:pointer;">' +
            
            '<hr style="border:0;border-top:1px solid #334155;margin:15px 0;">' +
            '<label style="font-size:11px;color:#fca5a5;font-weight:bold;">Shape Counts (Max 20 total):</label>' +
            
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:5px; margin-bottom:10px;">' +
                '<div><label style="font-size:10px;color:#cbd5e1;">🟠 Spheres:</label><input type="number" id="gsp-n-circ" value="'+S.counts.circle+'" min="0" max="10" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334;padding:4px;border-radius:4px;"></div>' +
                '<div><label style="font-size:10px;color:#cbd5e1;">🟦 Cubes:</label><input type="number" id="gsp-n-sq" value="'+S.counts.square+'" min="0" max="10" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334;padding:4px;border-radius:4px;"></div>' +
                '<div><label style="font-size:10px;color:#cbd5e1;">🟨 Rectangles:</label><input type="number" id="gsp-n-rect" value="'+S.counts.rect+'" min="0" max="10" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334;padding:4px;border-radius:4px;"></div>' +
                '<div><label style="font-size:10px;color:#cbd5e1;">🔺 Triangles:</label><input type="number" id="gsp-n-tri" value="'+S.counts.triangle+'" min="0" max="10" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334;padding:4px;border-radius:4px;"></div>' +
                '<div><label style="font-size:10px;color:#cbd5e1;">⬡ Hexagons:</label><input type="number" id="gsp-n-hex" value="'+S.counts.hexagon+'" min="0" max="10" style="width:100%;background:#0f172a;color:#fff;border:1px solid #334;padding:4px;border-radius:4px;"></div>' +
            '</div>' +
            
            '<button id="gsp-gen" style="width:100%;background:#475569;color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:bold;">⚙️ Generate Upload Slots</button>' +
            
            '<div id="gsp-slots-container" style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; background:#1e293b; padding:10px; border-radius:6px; border:1px solid #334155; max-height:200px; overflow-y:auto;">' +
            '</div>' +
            
            '<button id="gsp-reset" style="width:100%;background:#334155;color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer;margin-bottom:10px;font-size:12px;">🔄 Restart Simulation</button>' +
            '<button id="gsp-exp-html" style="width:100%;background:linear-gradient(135deg,#ff3200,#ec4899);color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;">🌐 Export Pro HTML</button>' +
            '<div id="gsp-st" style="margin-top:15px;font-size:11px;text-align:center;color:#ff3200;">Engine Ready</div>' +
            '</div>';

        r.innerHTML = html;
        
        document.getElementById('gsp-bg').onchange = function(e){ S.bgType = e.target.value; };
        document.getElementById('gsp-light').onchange = function(e){ S.lightType = e.target.value; };
        document.getElementById('gsp-c').oninput = function(e){ S.brandColor = e.target.value; };
        
        document.getElementById('gsp-gen').onclick = function() {
            S.counts.circle = parseInt(document.getElementById('gsp-n-circ').value)||0;
            S.counts.square = parseInt(document.getElementById('gsp-n-sq').value)||0;
            S.counts.rect = parseInt(document.getElementById('gsp-n-rect').value)||0;
            S.counts.triangle = parseInt(document.getElementById('gsp-n-tri').value)||0;
            S.counts.hexagon = parseInt(document.getElementById('gsp-n-hex').value)||0;
            
            generateSlots();
            initSim();
        };
        
        document.getElementById('gsp-reset').onclick = function() { initSim(); };
        
        document.getElementById('gsp-exp-html').onclick = function() {
            exportHTML();
        };
        
        generateSlots();
    }

    var shapeIcons = { circle: '🟠', square: '🟦', rect: '🟨', triangle: '🔺', hexagon: '⬡' };

    function generateSlots() {
        var c = document.getElementById('gsp-slots-container');
        if(!c) return;
        c.innerHTML = '';
        S.slots = [];
        
        var types = ['circle', 'square', 'rect', 'triangle', 'hexagon'];
        var idx = 0;
        
        types.forEach(function(t) {
            for(var i=0; i<S.counts[t]; i++) {
                S.slots.push({ type: t, imgData: null, fileId: 'gsp-f-'+idx, imgObj: null });
                
                var div = document.createElement('div');
                div.style.display = 'flex'; div.style.alignItems='center'; div.style.gap='5px';
                
                var lbl = document.createElement('span');
                lbl.style.fontSize='12px'; lbl.textContent = shapeIcons[t];
                
                var inp = document.createElement('input');
                inp.type = 'file'; inp.accept = 'image/*'; inp.id = 'gsp-f-'+idx;
                inp.style.fontSize='10px'; inp.style.color='#94a3b8'; inp.style.flex='1';
                
                (function(slotIndex) {
                    inp.onchange = function(e) {
                        var f = e.target.files[0];
                        if(!f) return;
                        var rdr = new FileReader();
                        rdr.onload = function(ev) {
                            var img = new Image();
                            img.onload = function() { 
                                S.slots[slotIndex].imgData = ev.target.result;
                                S.slots[slotIndex].imgObj = img;
                                initSim();
                            };
                            img.src = ev.target.result;
                        };
                        rdr.readAsDataURL(f);
                    };
                })(idx);
                
                div.appendChild(lbl); div.appendChild(inp);
                c.appendChild(div);
                idx++;
            }
        });
    }

    function initSim() {
        if(!S.canvas || typeof Matter === 'undefined') return;
        if(mod.runner) { Matter.Runner.stop(mod.runner); mod.runner=null; }
        if(mod.engine) { Matter.Engine.clear(mod.engine); mod.engine=null; }
        
        var w = S.canvas.width, h = S.canvas.height;
        
        mod.engine = Matter.Engine.create();
        if(mod.engine.gravity) mod.engine.gravity.y = 1;
        else if(mod.engine.world && mod.engine.world.gravity) mod.engine.world.gravity.y = 1;
        
        mod.bodies = [];
        mod.env = [];
        for(var i=0; i<100; i++) mod.env.push({ x:Math.random()*w, y:Math.random()*h, s:0.5+Math.random()*2, r:Math.random()*2 });
        
        // Boundaries
        var opt = { isStatic: true, render: { visible: false } };
        Matter.World.add(mod.engine.world, [
            Matter.Bodies.rectangle(w/2, h+50, w*2, 100, opt), // floor
            Matter.Bodies.rectangle(-50, h/2, 100, h*2, opt), // left
            Matter.Bodies.rectangle(w+50, h/2, 100, h*2, opt) // right
        ]);

        var rad = Math.min(w,h)*0.15;
        
        S.slots.forEach(function(slot, i) {
            var px = w/2 + (Math.random()-0.5)*w*0.5;
            var py = -100 - i*150;
            var bOpt = { restitution: 0.6, friction: 0.1, density: 0.05, plugin: { slot: slot } };
            var body;
            
            if(slot.type === 'circle') { body = Matter.Bodies.circle(px, py, rad, bOpt); body.plugin.w = rad*2; body.plugin.h = rad*2; }
            else if(slot.type === 'square') { body = Matter.Bodies.rectangle(px, py, rad*1.8, rad*1.8, bOpt); body.plugin.w = rad*1.8; body.plugin.h = rad*1.8; }
            else if(slot.type === 'rect') { body = Matter.Bodies.rectangle(px, py, rad*2.2, rad*1.1, bOpt); body.plugin.w = rad*2.2; body.plugin.h = rad*1.1; }
            else if(slot.type === 'triangle') { body = Matter.Bodies.polygon(px, py, 3, rad*1.2, bOpt); body.plugin.w = rad*2.4; body.plugin.h = rad*2.4; }
            else if(slot.type === 'hexagon') { body = Matter.Bodies.polygon(px, py, 6, rad, bOpt); body.plugin.w = rad*2; body.plugin.h = rad*2; }
            
            if(body) {
                Matter.World.add(mod.engine.world, body);
                mod.bodies.push(body);
            }
        });
        
        // Mouse interaction
        var mouse = Matter.Mouse.create(S.canvas);
        var mConstraint = Matter.MouseConstraint.create(mod.engine, {
            mouse: mouse, constraint: { stiffness: 0.2, render: { visible: false } }
        });
        Matter.World.add(mod.engine.world, mConstraint);
        
        mod.runner = Matter.Runner.create();
        Matter.Runner.run(mod.runner, mod.engine);
    }

    function initEngine() {
        if (S.active) return;
        S.active = true;
        var ct = document.getElementById('gsp-center');
        ct.innerHTML = '';
        S.canvas = document.createElement('canvas');
        S.canvas.width = 400; S.canvas.height = 600;
        S.canvas.style.height = '100%'; S.canvas.style.maxHeight = '700px';
        S.canvas.style.aspectRatio = '2 / 3';
        S.canvas.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
        ct.appendChild(S.canvas);
        S.ctx = S.canvas.getContext('2d');
        
        initSim();

        function loop() {
            if (!S.active) return;
            S.animId = requestAnimationFrame(loop);
            renderCanvas();
        }
        loop();
    }
    
    function renderCanvas() {
        if(!mod.engine) return;
        var w = S.canvas.width, h = S.canvas.height;
        var ctx = S.ctx;
        mod.t += 0.05;
        
        // Backgrounds
        if(S.bgType === 'cosmos') {
            ctx.fillStyle = '#050505'; ctx.fillRect(0,0,w,h);
            ctx.fillStyle = '#fff';
            for(var i=0; i<mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s;
                if(mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random()*w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r, 0, Math.PI*2); ctx.fill();
            }
        } else if(S.bgType === 'rain') {
            ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,w,h);
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth=1;
            for(var i=0; i<mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 3;
                if(mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random()*w; }
                ctx.beginPath(); ctx.moveTo(mod.env[i].x, mod.env[i].y); ctx.lineTo(mod.env[i].x, mod.env[i].y+10); ctx.stroke();
            }
        } else if(S.bgType === 'snow') {
            ctx.fillStyle = '#1e293b'; ctx.fillRect(0,0,w,h);
            ctx.fillStyle = '#fff';
            for(var i=0; i<mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 0.5;
                mod.env[i].x += Math.sin(mod.t + i)*0.5;
                if(mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random()*w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r*1.5, 0, Math.PI*2); ctx.fill();
            }
        } else if(S.bgType === 'storm') {
            ctx.fillStyle = (Math.random()>0.95 && Math.random()>0.5) ? '#fff' : '#000'; 
            ctx.fillRect(0,0,w,h);
            ctx.strokeStyle = '#fff'; ctx.lineWidth=1;
            for(var i=0; i<mod.env.length; i++) {
                mod.env[i].y += mod.env[i].s * 4;
                if(mod.env[i].y > h) { mod.env[i].y = 0; mod.env[i].x = Math.random()*w; }
                ctx.beginPath(); ctx.moveTo(mod.env[i].x, mod.env[i].y); ctx.lineTo(mod.env[i].x-2, mod.env[i].y+15); ctx.stroke();
            }
        } else if(S.bgType === 'ocean') {
            var grd = ctx.createLinearGradient(0,0,0,h); grd.addColorStop(0,"#0284c7"); grd.addColorStop(1,"#082f49");
            ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth=2;
            for(var i=0; i<mod.env.length; i++) {
                mod.env[i].y -= mod.env[i].s;
                mod.env[i].x += Math.sin(mod.t + i);
                if(mod.env[i].y < 0) { mod.env[i].y = h; mod.env[i].x = Math.random()*w; }
                ctx.beginPath(); ctx.arc(mod.env[i].x, mod.env[i].y, mod.env[i].r*2, 0, Math.PI*2); ctx.stroke();
            }
        }
        
        // Draw Bodies (Matter.js)
        for(var i=0; i<mod.bodies.length; i++) {
            var b = mod.bodies[i];
            var slot = b.plugin.slot;
            if(!slot) continue;
            
            ctx.save();
            ctx.translate(b.position.x, b.position.y);
            ctx.rotate(b.angle);
            
            // Lighting
            if(S.lightType === 'neon') {
                ctx.shadowColor = S.brandColor; ctx.shadowBlur = 20; ctx.shadowOffsetY=0;
            } else if(S.lightType === 'spotlight') {
                ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 30; ctx.shadowOffsetY=20;
            } else if(S.lightType === 'plastic') {
                ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY=5;
            } else if(S.lightType === 'hologram') {
                ctx.globalAlpha = 0.7; ctx.shadowColor = S.brandColor; ctx.shadowBlur=10;
            }
            
            ctx.beginPath();
            if(slot.type === 'circle') {
                ctx.arc(0,0, b.circleRadius, 0, Math.PI*2);
            } else {
                var cos = Math.cos(-b.angle), sin = Math.sin(-b.angle);
                var lx0 = (b.vertices[0].x - b.position.x)*cos - (b.vertices[0].y - b.position.y)*sin;
                var ly0 = (b.vertices[0].x - b.position.x)*sin + (b.vertices[0].y - b.position.y)*cos;
                ctx.moveTo(lx0, ly0);
                for(var j=1; j<b.vertices.length; j++) {
                    var lx = (b.vertices[j].x - b.position.x)*cos - (b.vertices[j].y - b.position.y)*sin;
                    var ly = (b.vertices[j].x - b.position.x)*sin + (b.vertices[j].y - b.position.y)*cos;
                    ctx.lineTo(lx, ly);
                }
            }
            ctx.closePath();
            
            var lw = b.plugin.w || (rad*2), lh = b.plugin.h || (rad*2);
            var bw2 = lw/2, bh2 = lh/2;
            
            if (slot.imgObj && slot.imgObj.complete) {
                ctx.clip();
                ctx.drawImage(slot.imgObj, -bw2, -bh2, lw, lh);
                
                if(S.lightType === 'plastic') {
                    ctx.fillStyle = 'rgba(255,255,255,0.4)';
                    ctx.beginPath(); ctx.ellipse(0, -bh2*0.6, bw2*0.6, bh2*0.2, 0, 0, Math.PI*2); ctx.fill();
                } else if(S.lightType === 'hologram') {
                    ctx.fillStyle = S.brandColor;
                    for(var ly=-bh2; ly<bh2; ly+=4) { ctx.fillRect(-bw2, ly, lw, 1); }
                } else {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = S.brandColor;
                    ctx.stroke();
                }
            } else {
                ctx.fillStyle = S.brandColor;
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    function exportHTML() {
        document.getElementById('gsp-st').textContent = '⏺ Packing Engine...';
        
        // Prepare simplified slots for export
        var expSlots = S.slots.map(function(s) { return { type: s.type, imgData: s.imgData }; });
        
        var js = `
        var S = { 
            bgType: "${S.bgType}", 
            lightType: "${S.lightType}", 
            color: "${S.brandColor}", 
            slots: ${JSON.stringify(expSlots)} 
        };
        var W = window.innerWidth, H = window.innerHeight;
        var cvs = document.createElement('canvas'); cvs.width=W; cvs.height=H;
        document.body.appendChild(cvs); var ctx = cvs.getContext('2d');
        
        // Load images
        S.slots.forEach(function(slot) {
            if(slot.imgData) {
                var i = new Image(); i.src = slot.imgData; slot.imgObj = i;
            }
        });
        
        var env = [];
        for(var i=0; i<100; i++) env.push({ x:Math.random()*W, y:Math.random()*H, s:0.5+Math.random()*2, r:Math.random()*2 });
        
        var engine = Matter.Engine.create();
        
        if(window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(e){
                if(e.gamma===null)return;
                var gx = e.gamma / 45, gy = (e.beta) / 45;
                var max = Math.max(Math.abs(gx), Math.abs(gy));
                if(max > 1) { gx/=max; gy/=max; }
                engine.gravity.x = gx; engine.gravity.y = gy;
            });
        }
        
        var opt = { isStatic: true, render: { visible: false } };
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(W/2, H+50, W*2, 100, opt),
            Matter.Bodies.rectangle(-50, H/2, 100, H*2, opt),
            Matter.Bodies.rectangle(W+50, H/2, 100, H*2, opt)
        ]);

        var rad = Math.min(W,H)*0.15;
        var bodies = [];
        
        S.slots.forEach(function(slot, i) {
            var px = W/2 + (Math.random()-0.5)*W*0.5;
            var py = -100 - i*150;
            var bOpt = { restitution: 0.6, friction: 0.1, density: 0.05, plugin: { slot: slot } };
            var body;
            
            if(slot.type === 'circle') { body = Matter.Bodies.circle(px, py, rad, bOpt); body.plugin.w = rad*2; body.plugin.h = rad*2; }
            else if(slot.type === 'square') { body = Matter.Bodies.rectangle(px, py, rad*1.8, rad*1.8, bOpt); body.plugin.w = rad*1.8; body.plugin.h = rad*1.8; }
            else if(slot.type === 'rect') { body = Matter.Bodies.rectangle(px, py, rad*2.2, rad*1.1, bOpt); body.plugin.w = rad*2.2; body.plugin.h = rad*1.1; }
            else if(slot.type === 'triangle') { body = Matter.Bodies.polygon(px, py, 3, rad*1.2, bOpt); body.plugin.w = rad*2.4; body.plugin.h = rad*2.4; }
            else if(slot.type === 'hexagon') { body = Matter.Bodies.polygon(px, py, 6, rad, bOpt); body.plugin.w = rad*2; body.plugin.h = rad*2; }
            
            if(body) { Matter.World.add(engine.world, body); bodies.push(body); }
        });
        
        var mouse = Matter.Mouse.create(cvs);
        var mConstraint = Matter.MouseConstraint.create(engine, { mouse: mouse, constraint: { stiffness: 0.2 } });
        Matter.World.add(engine.world, mConstraint);
        
        Matter.Runner.run(Matter.Runner.create(), engine);
        
        var t = 0;
        function loop() {
            requestAnimationFrame(loop); t += 0.05;
            
            // Background
            if(S.bgType === 'cosmos') {
                ctx.fillStyle = '#050505'; ctx.fillRect(0,0,W,H); ctx.fillStyle = '#fff';
                for(var i=0; i<env.length; i++) { env[i].y += env[i].s; if(env[i].y > H) { env[i].y = 0; env[i].x = Math.random()*W; } ctx.beginPath(); ctx.arc(env[i].x, env[i].y, env[i].r, 0, Math.PI*2); ctx.fill(); }
            } else if(S.bgType === 'rain') {
                ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,W,H); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth=1;
                for(var i=0; i<env.length; i++) { env[i].y += env[i].s*3; if(env[i].y > H) { env[i].y = 0; env[i].x = Math.random()*W; } ctx.beginPath(); ctx.moveTo(env[i].x, env[i].y); ctx.lineTo(env[i].x, env[i].y+10); ctx.stroke(); }
            } else if(S.bgType === 'snow') {
                ctx.fillStyle = '#1e293b'; ctx.fillRect(0,0,W,H); ctx.fillStyle = '#fff';
                for(var i=0; i<env.length; i++) { env[i].y += env[i].s*0.5; env[i].x += Math.sin(t+i)*0.5; if(env[i].y > H) { env[i].y = 0; env[i].x = Math.random()*W; } ctx.beginPath(); ctx.arc(env[i].x, env[i].y, env[i].r*1.5, 0, Math.PI*2); ctx.fill(); }
            } else if(S.bgType === 'storm') {
                ctx.fillStyle = (Math.random()>0.95 && Math.random()>0.5) ? '#fff' : '#000'; ctx.fillRect(0,0,W,H); ctx.strokeStyle = '#fff'; ctx.lineWidth=1;
                for(var i=0; i<env.length; i++) { env[i].y += env[i].s*4; if(env[i].y > H) { env[i].y = 0; env[i].x = Math.random()*W; } ctx.beginPath(); ctx.moveTo(env[i].x, env[i].y); ctx.lineTo(env[i].x-2, env[i].y+15); ctx.stroke(); }
            } else if(S.bgType === 'ocean') {
                var grd = ctx.createLinearGradient(0,0,0,H); grd.addColorStop(0,"#0284c7"); grd.addColorStop(1,"#082f49"); ctx.fillStyle = grd; ctx.fillRect(0,0,W,H); ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth=2;
                for(var i=0; i<env.length; i++) { env[i].y -= env[i].s; env[i].x += Math.sin(t+i); if(env[i].y < 0) { env[i].y = H; env[i].x = Math.random()*W; } ctx.beginPath(); ctx.arc(env[i].x, env[i].y, env[i].r*2, 0, Math.PI*2); ctx.stroke(); }
            }
            
            for(var i=0; i<bodies.length; i++) {
                var b = bodies[i]; var slot = b.plugin.slot;
                ctx.save(); ctx.translate(b.position.x, b.position.y); ctx.rotate(b.angle);
                
                if(S.lightType === 'neon') { ctx.shadowColor = S.color; ctx.shadowBlur = 20; ctx.shadowOffsetY=0; }
                else if(S.lightType === 'spotlight') { ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 30; ctx.shadowOffsetY=20; }
                else if(S.lightType === 'plastic') { ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY=5; }
                else if(S.lightType === 'hologram') { ctx.globalAlpha = 0.7; ctx.shadowColor = S.color; ctx.shadowBlur=10; }
                
                ctx.beginPath();
                if(slot.type === 'circle') {
                    ctx.arc(0,0, b.circleRadius, 0, Math.PI*2);
                } else {
                    var cos = Math.cos(-b.angle), sin = Math.sin(-b.angle);
                    var lx0 = (b.vertices[0].x - b.position.x)*cos - (b.vertices[0].y - b.position.y)*sin;
                    var ly0 = (b.vertices[0].x - b.position.x)*sin + (b.vertices[0].y - b.position.y)*cos;
                    ctx.moveTo(lx0, ly0);
                    for(var j=1; j<b.vertices.length; j++) {
                        var lx = (b.vertices[j].x - b.position.x)*cos - (b.vertices[j].y - b.position.y)*sin;
                        var ly = (b.vertices[j].x - b.position.x)*sin + (b.vertices[j].y - b.position.y)*cos;
                        ctx.lineTo(lx, ly);
                    }
                }
                ctx.closePath();
                
                var lw = b.plugin.w || (rad*2), lh = b.plugin.h || (rad*2);
                var bw2 = lw/2, bh2 = lh/2;
                
                if(slot.imgObj && slot.imgObj.complete) {
                    ctx.clip(); ctx.drawImage(slot.imgObj, -bw2, -bh2, lw, lh);
                    if(S.lightType === 'plastic') { ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.ellipse(0, -bh2*0.6, bw2*0.6, bh2*0.2, 0, 0, Math.PI*2); ctx.fill(); }
                    else if(S.lightType === 'hologram') { ctx.fillStyle = S.color; for(var ly=-bh2; ly<bh2; ly+=4) { ctx.fillRect(-bw2, ly, lw, 1); } }
                    else { ctx.lineWidth=4; ctx.strokeStyle=S.color; ctx.stroke(); }
                } else {
                    ctx.fillStyle = S.color; ctx.fill(); ctx.lineWidth=2; ctx.strokeStyle='#fff'; ctx.stroke();
                }
                ctx.restore();
            }
        }
        loop();
        `;
        
        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Gravity Sandbox Pro</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#000;overflow:hidden;touch-action:none;}</style></head><body>';
        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"><'+'/script>';
        html += '<script>'+js+'<'+'/script></body></html>';
        var a = document.createElement('a'); a.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(html); a.download = 'gravity_pro.html'; a.click();
        
        document.getElementById('gsp-st').textContent = '✓ Pro HTML Exported!';
        setTimeout(function(){ document.getElementById('gsp-st').textContent = 'Engine Ready'; }, 2000);
    }
})();
