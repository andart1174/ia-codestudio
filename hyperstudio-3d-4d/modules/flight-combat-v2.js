/**
 * HyperStudio 3D/4D v2.0 — Flight Combat, Mothership Boss, Gamepad/Gyro,
 * Cinematic FX, Pilot Ranks/Achievements/Hall of Fame, Interactive Hangar Customizer & Warp Gates
 * Implements Ideas #1, #2, #3, #4, #5, #12
 */
(function () {
    'use strict';

    const STORAGE_KEY_CUSTOM = 'hyper3d_ship_custom_v2';
    const STORAGE_KEY_ACH = 'hyper3d_achievements_v2';
    const STORAGE_KEY_HOF = 'hyper3d_hall_of_fame_v2';

    const PAINT_THEMES = {
        cyber_cyan:      { name: 'Cyber Cyan',      color: '#00f2fe', emissive: '#006688', metalness: 0.72, roughness: 0.22 },
        stealth_carbon:  { name: 'Stealth Carbon',  color: '#1e293b', emissive: '#00f2fe', metalness: 0.88, roughness: 0.35 },
        solar_gold:      { name: 'Solar Gold',      color: '#ffb703', emissive: '#7a4500', metalness: 0.94, roughness: 0.14 },
        crimson_plasma:  { name: 'Crimson Plasma',  color: '#ff0055', emissive: '#880033', metalness: 0.78, roughness: 0.20 },
        quantum_emerald: { name: 'Quantum Emerald', color: '#00ffcc', emissive: '#005544', metalness: 0.80, roughness: 0.18 }
    };

    const LASER_THEMES = {
        cyan:    { name: 'Hyper Cyan',    hex: 0x00f2fe, css: '#00f2fe' },
        magenta: { name: 'Plasma Pink',   hex: 0xff007f, css: '#ff007f' },
        gold:    { name: 'Solar Gold',    hex: 0xffb703, css: '#ffb703' },
        emerald: { name: 'Toxic Emerald', hex: 0x00ffcc, css: '#00ffcc' }
    };

    const FLEET_SHIPS = [
        { key: 'space_fighter',   label: '🚀 Delta Space Fighter' },
        { key: 'cosmic_starship', label: '🛸 Cosmic Starship 4D' },
        { key: 'cyber_drone',     label: '🛸 Cyber Recon Drone' },
        { key: 'cyber_car',       label: '🏎️ Neon Cyber Car' },
        { key: 'mech_warrior',    label: '🦾 Mech Warrior Titan' }
    ];

    const ACHIEVEMENTS = [
        { id: 'first_flight',  icon: '🚀', en: 'First Liftoff',     fr: 'Premier Décollage',   desc: 'Enter Flight Simulator mode' },
        { id: 'asteroid_ace',  icon: '☄️', en: 'Asteroid Crusher',  fr: 'Briseur d\'Astéroïdes', desc: 'Destroy 3 asteroids' },
        { id: 'combo_x4',      icon: '🔥', en: 'Combo Master ×4',   fr: 'Maître Combo ×4',     desc: 'Reach a ×4 score combo' },
        { id: 'warp_boost',    icon: '⚡', en: 'Hyperspace Ace',    fr: 'As de l\'Hyperespace', desc: 'Engage Nitro Warp Boost' },
        { id: 'missile_kill',  icon: '🎯', en: 'Smart Munitions',   fr: 'Missile Guidé',       desc: 'Hit a target with a Homing Missile' },
        { id: 'boss_slayer',   icon: '👾', en: 'Mothership Slayer', fr: 'Tueur de Boss',       desc: 'Destroy the Mothership Boss' },
        { id: 'customizer',    icon: '🎨', en: 'Hangar Mechanic',   fr: 'Mécanicien Hangar',   desc: 'Customize your ship paint or laser' },
        { id: 'orbital_dock',  icon: '🛰️', en: 'Orbital Docker',    fr: 'Amarrage Orbital',    desc: 'Dock at the Orbital Station' },
        { id: 'warp_jumper',   icon: '🌀', en: 'Dimension Jumper',  fr: 'Sauteur de Portail',  desc: 'Jump worlds through a Warp Gate' },
        { id: 'quantum_lord',  icon: '👑', en: 'Quantum Legend',    fr: 'Légende Quantique',   desc: 'Reach 10,000 Mission Score' }
    ];

    const WARP_WORLD_ROTATION = [
        { world: 'cybercity', label: '🏙️ CYBER MEGACITY', color: 0xff007f },
        { world: 'asteroids', label: '☄️ ASTEROID STORM', color: 0xffb703 },
        { world: 'blackhole', label: '🕳️ BLACK HOLE',     color: 0xa855f7 },
        { world: 'rings',     label: '⚡ SPEED SLALOM',    color: 0x00f2fe },
        { world: 'galaxies',  label: '🌌 SOLAR GALAXIES',  color: 0x00ffcc },
        { world: 'deepspace', label: '✨ DEEP VOID',       color: 0x38bdf8 }
    ];

    // Persistent state
    let shipCustom = { paint: 'cyber_cyan', laser: 'cyan' };
    let unlockedAch = {};
    let hallOfFame = [];
    try {
        shipCustom = Object.assign(shipCustom, JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM) || '{}'));
        unlockedAch = JSON.parse(localStorage.getItem(STORAGE_KEY_ACH) || '{}');
        hallOfFame = JSON.parse(localStorage.getItem(STORAGE_KEY_HOF) || '[]');
    } catch (e) {}

    // Live combat & FX state
    let enemyDrones = [];
    let enemyBolts = [];
    let homingMissiles = [];
    let fragmentBursts = [];
    let warpGates = [];
    let bossGroup = null;
    let bossCores = [];
    let bossTotalMaxHP = 300;
    let bossDefeated = false;

    let thrusterGroup = null;
    let warpLinesMesh = null;
    let wingRibbons = null;
    let ribbonHistoryL = [];
    let ribbonHistoryR = [];
    const RIBBON_POINTS = 28;

    let screenShakeMag = 0;
    let comboCount = 0;
    let comboDecayTimer = 0;
    let sessionAsteroidsDestroyed = 0;
    let lastMissileTime = 0;
    let lastWarpJumpTime = 0;
    let lastDockRepairTime = 0;
    let isGyroEnabled = false;
    let gyroInput = { steer: 0, pitch: 0 };
    let prevGamepadButtons = {};

    // Shared geometries/materials for zero-leak FX
    let sharedFragGeo = null;
    let sharedMissileGeo = null;
    let sharedEnemyBoltGeo = null;
    let sharedEnemyBoltMat = null;

    function getCore() { return window.__HyperStudioCore; }
    function isFR() { const c = getCore(); return c && c.getLang() === 'fr'; }

    function saveCustom() { try { localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(shipCustom)); } catch (e) {} }
    function saveAch() { try { localStorage.setItem(STORAGE_KEY_ACH, JSON.stringify(unlockedAch)); } catch (e) {} }

    function recordHallOfFame(score) {
        if (!score || score < 500) return;
        const entry = {
            score: Math.round(score),
            rank: getPilotRankInfo(score).title,
            date: new Date().toLocaleDateString()
        };
        const existingTop = hallOfFame.find(h => h.score === entry.score && h.date === entry.date);
        if (!existingTop) {
            hallOfFame.push(entry);
            hallOfFame.sort((a, b) => b.score - a.score);
            hallOfFame = hallOfFame.slice(0, 10);
            try { localStorage.setItem(STORAGE_KEY_HOF, JSON.stringify(hallOfFame)); } catch (e) {}
        }
    }

    function getPilotRankInfo(score) {
        if (score >= 25000) return { title: '👑 QUANTUM LEGEND', color: '#00ffcc' };
        if (score >= 10000) return { title: '🥇 NEBULA COMMANDER', color: '#ffb703' };
        if (score >= 4500)  return { title: '🦅 ACE PILOT', color: '#a855f7' };
        if (score >= 1500)  return { title: '🥈 STAR PILOT', color: '#00f2fe' };
        return { title: '🥉 CADET', color: '#94a3b8' };
    }

    function unlockAchievement(id) {
        if (unlockedAch[id]) return;
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (!ach) return;
        unlockedAch[id] = Date.now();
        saveAch();
        const c = getCore();
        if (c) c.playRingChimeSFX();
        showAchievementToast(ach);
        renderHangarProfile();
    }

    function showAchievementToast(ach) {
        let toast = document.getElementById('hud-ach-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'hud-ach-toast';
            toast.className = 'hud-ach-toast';
            const hud = document.getElementById('fps-hud-overlay') || document.body;
            hud.appendChild(toast);
        }
        toast.innerHTML = `<span class="ach-ico">${ach.icon}</span><div><div class="ach-lbl">${isFR() ? 'SUCCÈS DÉBLOQUÉ !' : 'ACHIEVEMENT UNLOCKED!'}</div><div class="ach-name">${isFR() ? ach.fr : ach.en}</div></div>`;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 3400);
    }

    function rumbleGamepad(durationMs = 120, strong = 0.5, weak = 0.35) {
        try {
            const pads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (let i = 0; i < pads.length; i++) {
                const gp = pads[i];
                if (gp && gp.vibrationActuator && typeof gp.vibrationActuator.playEffect === 'function') {
                    gp.vibrationActuator.playEffect('dual-rumble', {
                        startDelay: 0, duration: durationMs, weakMagnitude: weak, strongMagnitude: strong
                    }).catch(() => {});
                }
            }
        } catch (e) {}
    }

    // ── 3D Fragment Debris Explosion System (Zero-Leak Pooled) ────────────
    function spawnExplosion(pos, colorHex = 0xffb703, count = 18) {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        if (!sharedFragGeo) sharedFragGeo = new THREE.OctahedronGeometry(0.32, 0);
        const mat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 1.0 });
        const shards = [];
        for (let i = 0; i < count; i++) {
            const m = new THREE.Mesh(sharedFragGeo, mat);
            m.position.copy(pos);
            const s = 0.6 + Math.random() * 1.4;
            m.scale.set(s, s, s);
            m.userData = { sharedGeometry: true, isFlightFX: true };
            scene.add(m);
            shards.push({
                mesh: m,
                vel: new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4),
                rot: new THREE.Vector3(Math.random() * 0.25, Math.random() * 0.25, Math.random() * 0.25)
            });
        }
        fragmentBursts.push({ shards, mat, life: 42, maxLife: 42 });
    }

    function updateExplosions(dtScale) {
        const c = getCore();
        if (!c) return;
        const scene = c.getScene();
        for (let i = fragmentBursts.length - 1; i >= 0; i--) {
            const b = fragmentBursts[i];
            b.life -= dtScale;
            const alpha = Math.max(0, b.life / b.maxLife);
            b.mat.opacity = alpha;
            b.shards.forEach(s => {
                s.mesh.position.addScaledVector(s.vel, dtScale);
                s.mesh.rotation.x += s.rot.x * dtScale;
                s.mesh.rotation.y += s.rot.y * dtScale;
                s.mesh.scale.multiplyScalar(Math.pow(0.97, dtScale));
            });
            if (b.life <= 0) {
                b.shards.forEach(s => scene.remove(s.mesh));
                try { b.mat.dispose(); } catch (e) {}
                fragmentBursts.splice(i, 1);
            }
        }
    }

    // ── Thruster Flames, Hyperspace Warp Lines & Tron Wing Ribbons ────────
    function ensureFlightFX() {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();

        // Twin thruster cones
        if (!thrusterGroup) {
            thrusterGroup = new THREE.Group();
            thrusterGroup.name = 'flight-thruster-fx';
            thrusterGroup.userData = { isFlightFX: true };
            const flameGeo = new THREE.ConeGeometry(0.24, 1.8, 10, 1, true);
            flameGeo.rotateX(-Math.PI / 2);
            const outerMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.78, side: THREE.DoubleSide });
            const innerGeo = new THREE.ConeGeometry(0.11, 1.1, 8, 1, true);
            innerGeo.rotateX(-Math.PI / 2);
            const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
            [-0.45, 0.45].forEach(ox => {
                const outer = new THREE.Mesh(flameGeo, outerMat);
                outer.position.set(ox, 0, -1.7);
                const inner = new THREE.Mesh(innerGeo, innerMat);
                inner.position.set(ox, 0, -1.45);
                thrusterGroup.add(outer);
                thrusterGroup.add(inner);
            });
            scene.add(thrusterGroup);
        }

        // Hyperspace Warp Speed Lines (visible during Nitro)
        if (!warpLinesMesh) {
            const lineCount = 90;
            const positions = new Float32Array(lineCount * 6);
            for (let i = 0; i < lineCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const rad = 3.5 + Math.random() * 14;
                const z = (Math.random() - 0.5) * 60;
                const x = Math.cos(angle) * rad;
                const y = Math.sin(angle) * rad;
                positions[i * 6 + 0] = x; positions[i * 6 + 1] = y; positions[i * 6 + 2] = z;
                positions[i * 6 + 3] = x; positions[i * 6 + 4] = y; positions[i * 6 + 5] = z + 5.5;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const mat = new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.0 });
            warpLinesMesh = new THREE.LineSegments(geo, mat);
            warpLinesMesh.userData = { isFlightFX: true };
            scene.add(warpLinesMesh);
        }

        // Tron Wingtip Light Ribbons (when trail upgrade equipped)
        if (!wingRibbons) {
            const buildRibbon = (hex) => {
                const geo = new THREE.BufferGeometry();
                geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(RIBBON_POINTS * 3), 3));
                const mat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 });
                const line = new THREE.Line(geo, mat);
                line.frustumCulled = false;
                line.userData = { isFlightFX: true };
                scene.add(line);
                return line;
            };
            wingRibbons = { left: buildRibbon(0x00f2fe), right: buildRibbon(0xff007f) };
            ribbonHistoryL = [];
            ribbonHistoryR = [];
        }
    }

    function cleanupFlightFX() {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        [thrusterGroup, warpLinesMesh].forEach(o => {
            if (o) { scene.remove(o); c.disposeObject3D(o); }
        });
        thrusterGroup = null;
        warpLinesMesh = null;
        if (wingRibbons) {
            scene.remove(wingRibbons.left); c.disposeObject3D(wingRibbons.left);
            scene.remove(wingRibbons.right); c.disposeObject3D(wingRibbons.right);
            wingRibbons = null;
        }
        cleanupCombatEntities();
        cleanupWarpGates();
        const bossBar = document.getElementById('hud-boss-bar');
        if (bossBar) bossBar.style.display = 'none';
        const dockBanner = document.getElementById('hud-docking-banner');
        if (dockBanner) dockBanner.style.display = 'none';
    }

    function updateFlightFX(dtScale, vecs) {
        const c = getCore();
        if (!c) return;
        const pp = c.getPilotPhysics();
        const ship = pp && pp.targetObj;
        if (!ship) return;
        ensureFlightFX();

        const speedNorm = Math.min(1.6, Math.abs(pp.speed) / Math.max(0.1, pp.maxSpeed));
        const boost = pp.isBoosting;
        if (boost) unlockAchievement('warp_boost');

        // Thruster flames attached behind ship
        if (thrusterGroup) {
            thrusterGroup.position.copy(ship.position);
            thrusterGroup.rotation.copy(ship.rotation);
            const flicker = 0.85 + Math.random() * 0.35;
            const flameLen = (0.35 + speedNorm * 0.9 + (boost ? 1.15 : 0)) * flicker;
            thrusterGroup.scale.set(boost ? 1.3 : 1.0, boost ? 1.3 : 1.0, flameLen);
            thrusterGroup.visible = speedNorm > 0.05 || boost;
            const flameMat = thrusterGroup.children[0] && thrusterGroup.children[0].material;
            if (flameMat) flameMat.color.setHex(boost ? 0xff007f : 0x00f2fe);
        }

        // Hyperspace Warp Lines
        if (warpLinesMesh) {
            const targetOp = boost ? 0.72 : (speedNorm > 0.85 ? 0.2 : 0.0);
            warpLinesMesh.material.opacity = THREE.MathUtils.lerp(warpLinesMesh.material.opacity, targetOp, Math.min(1, 0.14 * dtScale));
            warpLinesMesh.visible = warpLinesMesh.material.opacity > 0.02;
            if (warpLinesMesh.visible) {
                warpLinesMesh.position.copy(ship.position);
                warpLinesMesh.rotation.set(pp.pitch, pp.yaw, pp.roll, 'YXZ');
                const arr = warpLinesMesh.geometry.attributes.position.array;
                const streakSpeed = (boost ? 3.2 : 1.1) * dtScale;
                for (let i = 0; i < arr.length; i += 6) {
                    arr[i + 2] -= streakSpeed;
                    arr[i + 5] -= streakSpeed;
                    if (arr[i + 5] < -30) {
                        arr[i + 2] += 60;
                        arr[i + 5] += 60;
                    }
                }
                warpLinesMesh.geometry.attributes.position.needsUpdate = true;
            }
        }

        // Tron Wingtip Light Ribbons
        const upg = c.getUnlockedUpgrades();
        if (wingRibbons) {
            const showTrail = !!(upg && upg.trail);
            wingRibbons.left.visible = showTrail;
            wingRibbons.right.visible = showTrail;
            if (showTrail) {
                const rightVec = new THREE.Vector3(vecs.cosYaw, 0, -vecs.sinYaw);
                const pL = ship.position.clone().addScaledVector(rightVec, -1.65);
                const pR = ship.position.clone().addScaledVector(rightVec, 1.65);
                ribbonHistoryL.unshift(pL);
                ribbonHistoryR.unshift(pR);
                if (ribbonHistoryL.length > RIBBON_POINTS) ribbonHistoryL.pop();
                if (ribbonHistoryR.length > RIBBON_POINTS) ribbonHistoryR.pop();

                const fillLine = (line, hist) => {
                    const posArr = line.geometry.attributes.position.array;
                    for (let i = 0; i < RIBBON_POINTS; i++) {
                        const pt = hist[Math.min(i, hist.length - 1)] || ship.position;
                        posArr[i * 3] = pt.x; posArr[i * 3 + 1] = pt.y; posArr[i * 3 + 2] = pt.z;
                    }
                    line.geometry.attributes.position.needsUpdate = true;
                };
                fillLine(wingRibbons.left, ribbonHistoryL);
                fillLine(wingRibbons.right, ribbonHistoryR);
            }
        }

        // Camera screen shake decay
        if (screenShakeMag > 0.005) {
            const cam = c.getCamera();
            if (cam) {
                cam.position.x += (Math.random() - 0.5) * screenShakeMag;
                cam.position.y += (Math.random() - 0.5) * screenShakeMag;
            }
            screenShakeMag *= Math.pow(0.84, dtScale);
        } else {
            screenShakeMag = 0;
        }
    }

    // ── AI Enemy Combat Squadron & Mothership Boss Battle (Idea #1) ───────
    function cleanupCombatEntities() {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        enemyDrones.forEach(d => { if (d.mesh) { scene.remove(d.mesh); c.disposeObject3D(d.mesh); } });
        enemyDrones = [];
        enemyBolts.forEach(b => { if (b.mesh) scene.remove(b.mesh); });
        enemyBolts = [];
        homingMissiles.forEach(m => { if (m.mesh) { scene.remove(m.mesh); c.disposeObject3D(m.mesh); } });
        homingMissiles = [];
        if (bossGroup) { scene.remove(bossGroup); c.disposeObject3D(bossGroup); bossGroup = null; }
        bossCores = [];
        bossDefeated = false;
    }

    function createEnemyDroneMesh() {
        const g = new THREE.Group();
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a0b2e, emissive: 0xff0055, emissiveIntensity: 0.45, metalness: 0.8, roughness: 0.25 });
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xff2266 });
        const hull = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), bodyMat);
        hull.scale.set(1.4, 0.55, 1.6);
        g.add(hull);
        [-2.0, 2.0].forEach(wx => {
            const wing = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 1.4), bodyMat);
            wing.position.x = wx;
            g.add(wing);
        });
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), coreMat);
        eye.position.set(0, 0.1, 1.3);
        g.add(eye);
        g.userData = { isFlightFX: true };
        return g;
    }

    function spawnEnemySquadron(count = 4, aroundPos = new THREE.Vector3(0, 14, 95)) {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        for (let i = 0; i < count; i++) {
            const mesh = createEnemyDroneMesh();
            const ang = (i / count) * Math.PI * 2;
            mesh.position.set(
                aroundPos.x + Math.cos(ang) * (28 + Math.random() * 25),
                aroundPos.y + (Math.random() - 0.5) * 14,
                aroundPos.z + Math.sin(ang) * (28 + Math.random() * 25)
            );
            scene.add(mesh);
            enemyDrones.push({
                mesh,
                hp: 40,
                maxHp: 40,
                active: true,
                orbitAngle: ang,
                orbitRadius: 24 + Math.random() * 22,
                orbitCenter: aroundPos.clone(),
                fireCooldown: 90 + Math.random() * 120
            });
        }
    }

    function spawnMothershipBoss() {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();

        bossGroup = new THREE.Group();
        bossGroup.position.set(0, 18, 120);
        bossGroup.userData = { isFlightFX: true };

        const armorMat = new THREE.MeshStandardMaterial({ color: 0x0e1326, emissive: 0x4c1d95, emissiveIntensity: 0.45, metalness: 0.9, roughness: 0.2 });
        const trimMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });

        // Gigantic saucer & citadel hull
        const mainRing = new THREE.Mesh(new THREE.TorusGeometry(20, 3.2, 16, 48), armorMat);
        mainRing.rotation.x = Math.PI / 2;
        bossGroup.add(mainRing);

        const coreHull = new THREE.Mesh(new THREE.CylinderGeometry(11, 14, 9, 12), armorMat);
        bossGroup.add(coreHull);

        const crown = new THREE.Mesh(new THREE.TorusGeometry(13.5, 0.65, 10, 36), trimMat);
        crown.rotation.x = Math.PI / 2;
        crown.position.y = 4.6;
        bossGroup.add(crown);

        // 3 Destructible Shield Generators around the Mothership
        bossCores = [];
        bossTotalMaxHP = 300;
        bossDefeated = false;
        for (let i = 0; i < 3; i++) {
            const ang = (i / 3) * Math.PI * 2;
            const coreMat = new THREE.MeshStandardMaterial({
                color: 0xff007f, emissive: 0xff007f, emissiveIntensity: 1.0, metalness: 0.4, roughness: 0.15
            });
            const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 1), coreMat);
            coreMesh.position.set(Math.cos(ang) * 20, 3.2, Math.sin(ang) * 20);
            bossGroup.add(coreMesh);

            const ringHalo = new THREE.Mesh(
                new THREE.TorusGeometry(4.6, 0.22, 8, 24),
                new THREE.MeshBasicMaterial({ color: 0x00f2fe })
            );
            coreMesh.add(ringHalo);

            bossCores.push({ mesh: coreMesh, hp: 100, maxHp: 100, active: true, index: i, fireTimer: 70 + i * 45 });
        }

        scene.add(bossGroup);
        spawnEnemySquadron(4, new THREE.Vector3(0, 18, 105));
        updateBossHudBar();
    }

    function updateBossHudBar() {
        let bar = document.getElementById('hud-boss-bar');
        if (!bossGroup || bossDefeated) {
            if (bar) bar.style.display = 'none';
            return;
        }
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'hud-boss-bar';
            bar.className = 'hud-boss-bar';
            bar.innerHTML = `
                <div class="boss-bar-hdr"><span>👾 MOTHERSHIP OVERLORD</span><span id="hud-boss-cores-lbl">3 CORES LEFT</span></div>
                <div class="boss-hp-track"><div class="boss-hp-fill" id="hud-boss-hp-fill" style="width:100%"></div></div>
            `;
            const hud = document.getElementById('fps-hud-overlay');
            if (hud) hud.appendChild(bar);
        }
        bar.style.display = 'flex';
        const remainingHP = bossCores.reduce((sum, co) => sum + (co.active ? Math.max(0, co.hp) : 0), 0);
        const aliveCores = bossCores.filter(co => co.active).length;
        const pct = Math.max(0, Math.min(100, (remainingHP / bossTotalMaxHP) * 100));
        const fill = document.getElementById('hud-boss-hp-fill');
        const lbl = document.getElementById('hud-boss-cores-lbl');
        if (fill) fill.style.width = pct.toFixed(1) + '%';
        if (lbl) lbl.textContent = `${aliveCores} / 3 CORES • ${Math.round(pct)}%`;
    }

    function findBestLockTarget(shipPos) {
        let best = null;
        let bestDist = 220;
        const tmp = new THREE.Vector3();

        bossCores.forEach(co => {
            if (!co.active || !co.mesh) return;
            co.mesh.getWorldPosition(tmp);
            const d = shipPos.distanceTo(tmp);
            if (d < bestDist) { bestDist = d; best = { type: 'bossCore', ref: co, pos: tmp.clone() }; }
        });
        enemyDrones.forEach(dr => {
            if (!dr.active || !dr.mesh) return;
            const d = shipPos.distanceTo(dr.mesh.position);
            if (d < bestDist) { bestDist = d; best = { type: 'drone', ref: dr, pos: dr.mesh.position.clone() }; }
        });
        const c = getCore();
        if (!best && c) {
            c.getAsteroids().forEach(ast => {
                if (!ast.active || !ast.mesh) return;
                const d = shipPos.distanceTo(ast.mesh.position);
                if (d < bestDist) { bestDist = d; best = { type: 'asteroid', ref: ast, pos: ast.mesh.position.clone() }; }
            });
        }
        return best;
    }

    function fireHomingMissile() {
        const c = getCore();
        if (!c || !c.isPilotActive()) return;
        const pp = c.getPilotPhysics();
        const ship = pp && pp.targetObj;
        if (!ship) return;

        const now = performance.now();
        if (now - lastMissileTime < 1100) return;
        lastMissileTime = now;

        const scene = c.getScene();
        if (!sharedMissileGeo) {
            sharedMissileGeo = new THREE.ConeGeometry(0.24, 1.6, 8);
            sharedMissileGeo.rotateX(Math.PI / 2);
        }
        const mat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
        const mMesh = new THREE.Mesh(sharedMissileGeo, mat);
        mMesh.position.copy(ship.position).add(new THREE.Vector3(0, -0.4, 0));
        mMesh.userData = { sharedGeometry: true, isFlightFX: true };
        scene.add(mMesh);

        const target = findBestLockTarget(ship.position);
        const dir = new THREE.Vector3(
            Math.sin(pp.yaw) * Math.cos(pp.pitch),
            Math.sin(pp.pitch),
            Math.cos(pp.yaw) * Math.cos(pp.pitch)
        ).normalize();

        homingMissiles.push({ mesh: mMesh, mat, vel: dir.multiplyScalar(2.0), target, life: 140 });
        c.playBoostSFX();
        if (navigator.vibrate) { try { navigator.vibrate([25, 20, 35]); } catch (e) {} }
        rumbleGamepad(90, 0.3, 0.5);
        c.showHUDNotification(target ? '🎯 HOMING MISSILE LOCKED!' : '🚀 PLASMA MISSILE LAUNCHED!', '#ffb703');
    }

    function damageBossCore(coreObj, dmg, fromMissile) {
        if (!coreObj || !coreObj.active) return;
        const c = getCore();
        coreObj.hp -= dmg;
        const wp = new THREE.Vector3();
        coreObj.mesh.getWorldPosition(wp);
        if (c) c.playExplosionSFX();

        coreObj.mesh.material.emissive.setHex(0xffffff);
        setTimeout(() => { if (coreObj.mesh && coreObj.active) coreObj.mesh.material.emissive.setHex(0xff007f); }, 100);

        if (coreObj.hp <= 0) {
            coreObj.active = false;
            coreObj.mesh.visible = false;
            spawnExplosion(wp, 0xff007f, 28);
            screenShakeMag = 0.7;
            rumbleGamepad(220, 0.8, 0.6);
            if (fromMissile) unlockAchievement('missile_kill');

            const mult = registerComboHit('boss_core', wp);
            if (c) {
                c.addScore(1000 * mult);
                c.addCrystals(250);
                const alive = bossCores.filter(x => x.active).length;
                const destroyed = 3 - alive;
                const progEl = document.getElementById('hud-mission-progress');
                if (progEl && c.getActiveMission() === 'boss') progEl.textContent = `${destroyed} / 3 👾`;
                c.showHUDNotification(`💥 BOSS CORE DESTROYED! (${destroyed}/3) +${1000 * mult} PTS`, '#ff007f');

                if (alive === 0 && !bossDefeated) {
                    bossDefeated = true;
                    const bp = bossGroup ? bossGroup.position.clone() : wp;
                    spawnExplosion(bp, 0x00f2fe, 42);
                    spawnExplosion(bp.clone().add(new THREE.Vector3(6, 2, -4)), 0xffb703, 30);
                    if (bossGroup) { c.getScene().remove(bossGroup); c.disposeObject3D(bossGroup); bossGroup = null; }
                    c.addScore(3000);
                    c.addCrystals(1000);
                    unlockAchievement('boss_slayer');
                    c.showHUDNotification(isFR() ? '🏆 VAISSEAU-MÈRE DÉTRUIT ! +3000 PTS • +1000 💎' : '🏆 MOTHERSHIP DESTROYED! +3000 PTS • +1000 💎', '#00ffcc');
                    if (c.getActiveMission() === 'boss') c.checkMissionVictory();
                }
            }
        }
        updateBossHudBar();
    }

    function damageEnemyDrone(dr, dmg, fromMissile) {
        if (!dr || !dr.active) return;
        const c = getCore();
        dr.hp -= dmg;
        if (c) c.playExplosionSFX();
        if (dr.hp <= 0) {
            dr.active = false;
            const pos = dr.mesh.position.clone();
            if (c) {
                c.getScene().remove(dr.mesh);
                c.disposeObject3D(dr.mesh);
                const mult = registerComboHit('drone', pos);
                c.addScore(600 * mult);
                c.addCrystals(120);
                c.showHUDNotification(`👾 ENEMY DRONE DOWN! +${600 * mult} PTS`, '#ff007f');
            }
            if (fromMissile) unlockAchievement('missile_kill');
            spawnExplosion(pos, 0xff0055, 20);
        }
    }

    function updateCombatAI(dtScale) {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        const pp = c.getPilotPhysics();
        const ship = pp && pp.targetObj;
        if (!ship) return;

        if (!sharedEnemyBoltGeo) {
            sharedEnemyBoltGeo = new THREE.SphereGeometry(0.45, 8, 8);
            sharedEnemyBoltMat = new THREE.MeshBasicMaterial({ color: 0xff2244 });
        }

        // Boss rotation & plasma turret fire
        if (bossGroup && !bossDefeated) {
            bossGroup.rotation.y += 0.004 * dtScale;
            const wp = new THREE.Vector3();
            bossCores.forEach(co => {
                if (!co.active) return;
                co.mesh.rotation.y += 0.03 * dtScale;
                co.fireTimer -= dtScale;
                if (co.fireTimer <= 0) {
                    co.fireTimer = 110 + Math.random() * 60;
                    co.mesh.getWorldPosition(wp);
                    if (wp.distanceTo(ship.position) < 230) {
                        const bolt = new THREE.Mesh(sharedEnemyBoltGeo, sharedEnemyBoltMat);
                        bolt.position.copy(wp);
                        bolt.userData = { sharedGeometry: true, sharedMaterial: true, isFlightFX: true };
                        scene.add(bolt);
                        const toPlayer = ship.position.clone().sub(wp).normalize();
                        enemyBolts.push({ mesh: bolt, vel: toPlayer.multiplyScalar(1.35), life: 160 });
                    }
                }
            });
        }

        // Enemy Drones patrol, pursue & fire
        enemyDrones.forEach(dr => {
            if (!dr.active || !dr.mesh) return;
            dr.orbitAngle += 0.012 * dtScale;
            const targetPos = dr.orbitCenter.clone().add(new THREE.Vector3(
                Math.cos(dr.orbitAngle) * dr.orbitRadius,
                Math.sin(dr.orbitAngle * 1.7) * 8,
                Math.sin(dr.orbitAngle) * dr.orbitRadius
            ));
            dr.mesh.position.lerp(targetPos, Math.min(1, 0.035 * dtScale));
            dr.mesh.lookAt(ship.position);

            dr.fireCooldown -= dtScale;
            if (dr.fireCooldown <= 0 && dr.mesh.position.distanceTo(ship.position) < 170) {
                dr.fireCooldown = 120 + Math.random() * 75;
                const bolt = new THREE.Mesh(sharedEnemyBoltGeo, sharedEnemyBoltMat);
                bolt.position.copy(dr.mesh.position);
                bolt.userData = { sharedGeometry: true, sharedMaterial: true, isFlightFX: true };
                scene.add(bolt);
                const dir = ship.position.clone().sub(dr.mesh.position).normalize();
                enemyBolts.push({ mesh: bolt, vel: dir.multiplyScalar(1.25), life: 135 });
            }
        });

        // Player laser hits against Enemy Drones & Boss Cores
        const lasers = c.getActiveLasers();
        const tmpWP = new THREE.Vector3();
        for (let li = lasers.length - 1; li >= 0; li--) {
            const laser = lasers[li];
            if (!laser || !laser.mesh || laser.life <= 0) continue;
            const dmg = c.getUnlockedUpgrades().lasers ? 26 : 16;

            for (let di = 0; di < enemyDrones.length; di++) {
                const dr = enemyDrones[di];
                if (dr.active && laser.mesh.position.distanceTo(dr.mesh.position) < 3.4) {
                    laser.life = 0;
                    damageEnemyDrone(dr, dmg, false);
                    break;
                }
            }
            if (laser.life <= 0) continue;

            for (let bi = 0; bi < bossCores.length; bi++) {
                const co = bossCores[bi];
                if (!co.active || !co.mesh) continue;
                co.mesh.getWorldPosition(tmpWP);
                if (laser.mesh.position.distanceTo(tmpWP) < 5.2) {
                    laser.life = 0;
                    damageBossCore(co, dmg, false);
                    break;
                }
            }
        }

        // Update Enemy Plasma Bolts -> Shield Damage
        for (let i = enemyBolts.length - 1; i >= 0; i--) {
            const b = enemyBolts[i];
            b.mesh.position.addScaledVector(b.vel, dtScale);
            b.life -= dtScale;
            if (b.mesh.position.distanceTo(ship.position) < 2.6) {
                b.life = 0;
                c.applyShipShieldDamage(12, isFR() ? '⚡ TIR PLASMA ENNEMI ! -12 BOUCLIER' : '⚡ ENEMY PLASMA HIT! -12 SHIELD');
            }
            if (b.life <= 0) {
                scene.remove(b.mesh);
                enemyBolts.splice(i, 1);
            }
        }

        // Update Homing Missiles
        for (let i = homingMissiles.length - 1; i >= 0; i--) {
            const m = homingMissiles[i];
            if (m.target) {
                let tPos = null;
                if (m.target.type === 'bossCore' && m.target.ref.active) {
                    tPos = new THREE.Vector3();
                    m.target.ref.mesh.getWorldPosition(tPos);
                } else if ((m.target.type === 'drone' || m.target.type === 'asteroid') && m.target.ref.active) {
                    tPos = m.target.ref.mesh.position;
                }
                if (tPos) {
                    const desired = tPos.clone().sub(m.mesh.position).normalize().multiplyScalar(2.4);
                    m.vel.lerp(desired, Math.min(1, 0.14 * dtScale));
                    if (m.mesh.position.distanceTo(tPos) < 4.8) {
                        m.life = 0;
                        if (m.target.type === 'bossCore') damageBossCore(m.target.ref, 58, true);
                        else if (m.target.type === 'drone') damageEnemyDrone(m.target.ref, 60, true);
                        else if (m.target.type === 'asteroid') {
                            m.target.ref.hp = 0;
                            m.target.ref.active = false;
                            scene.remove(m.target.ref.mesh);
                            c.disposeObject3D(m.target.ref.mesh);
                            spawnExplosion(tPos, 0xffb703, 20);
                            c.playExplosionSFX();
                            c.addScore(500);
                            c.addCrystals(100);
                            unlockAchievement('missile_kill');
                        }
                    }
                }
            }
            m.mesh.position.addScaledVector(m.vel, dtScale);
            m.mesh.lookAt(m.mesh.position.clone().add(m.vel));
            m.life -= dtScale;
            if (m.life <= 0) {
                scene.remove(m.mesh);
                try { m.mat.dispose(); } catch (e) {}
                homingMissiles.splice(i, 1);
            }
        }
    }

    // ── Inter-World Warp Gates & Orbital Station Docking Bay (Idea #12) ──
    function cleanupWarpGates() {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        warpGates.forEach(g => { if (g.mesh) { scene.remove(g.mesh); c.disposeObject3D(g.mesh); } });
        warpGates = [];
    }

    function spawnWorldWarpGates(currentWorld) {
        cleanupWarpGates();
        const c = getCore();
        if (!c || !c.getScene() || !c.isPilotActive()) return;
        const scene = c.getScene();

        const targets = WARP_WORLD_ROTATION.filter(w => w.world !== currentWorld).slice(0, 2);
        const coords = [new THREE.Vector3(-85, 22, 95), new THREE.Vector3(85, 24, 115)];

        targets.forEach((t, idx) => {
            const grp = new THREE.Group();
            grp.position.copy(coords[idx]);
            grp.userData = { isFlightFX: true };

            const outerRing = new THREE.Mesh(
                new THREE.TorusGeometry(9.5, 0.75, 14, 42),
                new THREE.MeshBasicMaterial({ color: t.color })
            );
            const innerRing = new THREE.Mesh(
                new THREE.TorusGeometry(7.2, 0.32, 10, 32),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            const portalDisk = new THREE.Mesh(
                new THREE.CircleGeometry(7.0, 32),
                new THREE.MeshBasicMaterial({ color: t.color, transparent: true, opacity: 0.24, side: THREE.DoubleSide })
            );
            grp.add(outerRing, innerRing, portalDisk);
            scene.add(grp);
            warpGates.push({ mesh: grp, innerRing, targetWorld: t.world, label: t.label, color: t.color });
        });
    }

    function updateWarpGatesAndDocking(dtScale) {
        const c = getCore();
        if (!c) return;
        const pp = c.getPilotPhysics();
        const ship = pp && pp.targetObj;
        if (!ship) return;

        // 1. Inter-World Warp Gates
        const now = performance.now();
        warpGates.forEach(g => {
            g.mesh.rotation.z += 0.014 * dtScale;
            g.innerRing.rotation.z -= 0.025 * dtScale;
            if (now - lastWarpJumpTime > 3000 && ship.position.distanceTo(g.mesh.position) < 9.5) {
                lastWarpJumpTime = now;
                c.playBoostSFX();
                screenShakeMag = 0.55;
                unlockAchievement('warp_jumper');
                c.addScore(250);
                c.showHUDNotification(`🌀 WARP JUMP → ${g.label}! +250 PTS`, '#00f2fe');
                ship.position.set(0, 12, 0);
                c.buildCosmosWorld(g.targetWorld);
            }
        });

        // 2. Orbital Station Docking Bay (Free 100% Shield Repair + Hangar Shortcut)
        const station = c.getOrbitalStation();
        let dockBanner = document.getElementById('hud-docking-banner');
        if (station && ship.position.distanceTo(station.position) < 26) {
            if (!dockBanner) {
                dockBanner = document.createElement('div');
                dockBanner.id = 'hud-docking-banner';
                dockBanner.className = 'hud-docking-banner';
                dockBanner.innerHTML = `
                    <span>🛰️ <strong>${isFR() ? 'BAIE D\'AMARRAGE ORBITALE' : 'ORBITAL DOCKING BAY'}</strong> — ${isFR() ? 'Boucliers réparés 100% !' : 'Shields Repaired 100%!'}</span>
                    <button type="button" id="btn-dock-open-hangar" class="hud-mode-pill hangar">🛠️ Hangar [H]</button>
                `;
                const hud = document.getElementById('fps-hud-overlay');
                if (hud) hud.appendChild(dockBanner);
                dockBanner.querySelector('#btn-dock-open-hangar')?.addEventListener('click', () => c.openHangarModal());
            }
            dockBanner.style.display = 'flex';
            const sh = c.getShield();
            if (sh.hp < sh.max && now - lastDockRepairTime > 1200) {
                lastDockRepairTime = now;
                c.setShieldHP(sh.max);
                c.playRingChimeSFX();
            }
            unlockAchievement('orbital_dock');
        } else if (dockBanner) {
            dockBanner.style.display = 'none';
        }
    }

    // ── Combo System & Galactic Ranks (Idea #4) ───────────────────────────
    function registerComboHit(kind, pos) {
        comboCount = Math.min(8, comboCount + 1);
        comboDecayTimer = 320; // ~5.3 seconds
        if (kind === 'asteroid') {
            sessionAsteroidsDestroyed++;
            if (sessionAsteroidsDestroyed >= 3) unlockAchievement('asteroid_ace');
            if (pos) spawnExplosion(pos, 0xffb703, 18);
        }
        if (comboCount >= 4) unlockAchievement('combo_x4');

        const c = getCore();
        if (c) {
            const sc = c.getScore();
            if (sc >= 10000) unlockAchievement('quantum_lord');
            recordHallOfFame(sc);
            const rInfo = getPilotRankInfo(sc);
            const rankEl = document.getElementById('hud-rank-name');
            if (rankEl) { rankEl.textContent = rInfo.title; rankEl.style.color = rInfo.color; }
        }
        updateComboBadge();
        return comboCount;
    }

    function updateComboBadge() {
        let badge = document.getElementById('hud-combo-badge');
        if (comboCount <= 1) {
            if (badge) badge.style.display = 'none';
            return;
        }
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'hud-combo-badge';
            badge.className = 'hud-combo-badge';
            const hud = document.getElementById('fps-hud-overlay');
            if (hud) hud.appendChild(badge);
        }
        badge.style.display = 'inline-flex';
        badge.innerHTML = `🔥 COMBO <strong>×${comboCount}</strong>`;
    }

    // ── Shield Impact Flash & Screen Shake ────────────────────────────────
    function onShieldHit(amount, reasonText) {
        screenShakeMag = Math.min(1.0, 0.35 + amount * 0.015);
        rumbleGamepad(160, 0.7, 0.5);
        const c = getCore();
        if (c && reasonText) c.showHUDNotification(reasonText, '#ff0055');

        let vig = document.getElementById('hud-damage-vignette');
        if (!vig) {
            vig = document.createElement('div');
            vig.id = 'hud-damage-vignette';
            vig.className = 'hud-damage-vignette';
            const hud = document.getElementById('fps-hud-overlay');
            if (hud) hud.appendChild(vig);
        }
        vig.classList.add('hit');
        clearTimeout(vig._t);
        vig._t = setTimeout(() => vig.classList.remove('hit'), 320);
    }

    // ── Physical Gamepad API & Mobile Gyroscope Tilt-to-Steer (Idea #2) ───
    function pollExternalControls() {
        let steer = 0, pitch = 0, thrust = 0, brake = 0, fire = false, boost = false;
        let padConnected = false;

        try {
            const pads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (let i = 0; i < pads.length; i++) {
                const gp = pads[i];
                if (!gp || !gp.connected) continue;
                padConnected = true;
                const dz = (v) => (Math.abs(v) < 0.16 ? 0 : v);
                steer -= dz(gp.axes[0] || 0); // Left stick X
                pitch -= dz(gp.axes[1] || 0); // Left stick Y
                const rt = gp.buttons[7] ? gp.buttons[7].value : 0;
                const lt = gp.buttons[6] ? gp.buttons[6].value : 0;
                if (rt > 0.1) thrust = Math.max(thrust, rt);
                if (lt > 0.1) brake = Math.max(brake, lt);
                if (gp.buttons[0] && gp.buttons[0].pressed) fire = true;   // A / Cross
                if (gp.buttons[2] && gp.buttons[2].pressed) fire = true;   // X / Square
                if (gp.buttons[1] && gp.buttons[1].pressed) boost = true;  // B / Circle
                if (gp.buttons[5] && gp.buttons[5].pressed) boost = true;  // RB / R1

                // Y / Triangle = Homing Missile (edge-triggered)
                const yNow = !!(gp.buttons[3] && gp.buttons[3].pressed);
                if (yNow && !prevGamepadButtons.y) fireHomingMissile();
                prevGamepadButtons.y = yNow;
                break;
            }
        } catch (e) {}

        const gpBadge = document.getElementById('hud-gamepad-badge');
        if (gpBadge) gpBadge.style.display = padConnected ? 'inline-flex' : 'none';

        if (isGyroEnabled) {
            steer = Math.max(-1, Math.min(1, steer + gyroInput.steer));
            pitch = Math.max(-1, Math.min(1, pitch + gyroInput.pitch));
        }

        return { steer, pitch, thrust, brake, fire, boost };
    }

    function toggleGyroSteering() {
        const c = getCore();
        const enable = () => {
            isGyroEnabled = !isGyroEnabled;
            const btn = document.getElementById('btn-hud-gyro-toggle');
            if (btn) btn.classList.toggle('active', isGyroEnabled);
            if (c) c.showHUDNotification(isGyroEnabled ? '📱 GYRO TILT STEERING: ON' : '📱 GYRO TILT STEERING: OFF', '#00f2fe');
        };
        if (!isGyroEnabled && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(res => {
                if (res === 'granted') enable();
            }).catch(() => enable());
        } else {
            enable();
        }
    }

    window.addEventListener('deviceorientation', (e) => {
        if (!isGyroEnabled) return;
        const gamma = e.gamma || 0; // left/right tilt (-90..90)
        const beta = (e.beta || 45) - 45; // front/back tilt centered around 45 deg
        gyroInput.steer = Math.max(-1, Math.min(1, -gamma / 32));
        gyroInput.pitch = Math.max(-1, Math.min(1, -beta / 32));
    });

    // ── Interactive 3D Hangar Customizer & Pilot Profile UI (Idea #5) ─────
    function applyShipCustomizationToActiveVehicle() {
        const c = getCore();
        if (!c) return;
        const pp = c.getPilotPhysics();
        const ship = pp && pp.targetObj;
        const theme = PAINT_THEMES[shipCustom.paint] || PAINT_THEMES.cyber_cyan;
        if (!ship) return;
        ship.traverse(child => {
            if (child.isMesh && child.material && !child.userData?.isFlightFX) {
                if (child.material.color) child.material.color.set(theme.color);
                if (child.material.emissive) child.material.emissive.set(theme.emissive);
                if (typeof child.material.metalness === 'number') child.material.metalness = theme.metalness;
                if (typeof child.material.roughness === 'number') child.material.roughness = theme.roughness;
            }
        });
    }

    function switchActiveFleetShip(presetKey) {
        const c = getCore();
        if (!c || !c.getScene()) return;
        const scene = c.getScene();
        const pp = c.getPilotPhysics();
        const oldShip = pp && pp.targetObj;
        const pos = oldShip ? oldShip.position.clone() : new THREE.Vector3(0, 3, 0);
        if (oldShip) {
            scene.remove(oldShip);
            c.disposeObject3D(oldShip);
            const list = c.getCustomObjects();
            const idx = list.indexOf(oldShip);
            if (idx >= 0) list.splice(idx, 1);
        }
        const theme = PAINT_THEMES[shipCustom.paint] || PAINT_THEMES.cyber_cyan;
        const newShip = c.createProceduralModelGroup(presetKey, theme.color, 'neon');
        newShip.position.copy(pos);
        newShip.userData = { preset: presetKey };
        scene.add(newShip);
        c.getCustomObjects().push(newShip);
        pp.targetObj = newShip;
        applyShipCustomizationToActiveVehicle();
        c.playRunSFX();
        c.showHUDNotification(`🚀 ACTIVE SHIP: ${presetKey.replace(/_/g, ' ').toUpperCase()}`, '#00ffcc');
    }

    function injectHangarCustomizerUI() {
        const modal = document.getElementById('modal-cosmic-hangar');
        if (!modal || document.getElementById('hangar-v2-customizer')) return;
        const body = modal.querySelector('.modal-body');
        if (!body) return;

        const section = document.createElement('div');
        section.id = 'hangar-v2-customizer';
        section.className = 'hangar-v2-section';
        section.innerHTML = `
            <div class="hangar-v2-block">
                <div class="hangar-v2-heading"><i class="fa-solid fa-palette"></i> PBR Ship Paint &amp; Laser Customizer</div>
                <div class="hangar-swatch-row" id="hangar-paint-swatches">
                    ${Object.entries(PAINT_THEMES).map(([k, v]) => `
                        <button type="button" class="hangar-swatch-btn ${shipCustom.paint === k ? 'active' : ''}" data-paint="${k}">
                            <span class="swatch-dot" style="background:${v.color};box-shadow:0 0 8px ${v.color};"></span>
                            <span>${v.name}</span>
                        </button>`).join('')}
                </div>
                <div class="hangar-swatch-row" id="hangar-laser-swatches" style="margin-top:8px;">
                    <span class="hangar-mini-lbl">Laser Color:</span>
                    ${Object.entries(LASER_THEMES).map(([k, v]) => `
                        <button type="button" class="hangar-swatch-btn ${shipCustom.laser === k ? 'active' : ''}" data-laser="${k}">
                            <span class="swatch-dot" style="background:${v.css};box-shadow:0 0 8px ${v.css};"></span>
                            <span>${v.name}</span>
                        </button>`).join('')}
                </div>
                <div class="hangar-swatch-row" id="hangar-fleet-picker" style="margin-top:8px;">
                    <span class="hangar-mini-lbl">Switch Ship:</span>
                    ${FLEET_SHIPS.map(s => `<button type="button" class="hangar-swatch-btn" data-fleet="${s.key}">${s.label}</button>`).join('')}
                </div>
            </div>
            <div class="hangar-v2-grid">
                <div class="hangar-v2-block">
                    <div class="hangar-v2-heading"><i class="fa-solid fa-trophy"></i> Achievements (<span id="ach-count-lbl">0/10</span>)</div>
                    <div id="hangar-ach-grid" class="hangar-ach-grid"></div>
                </div>
                <div class="hangar-v2-block">
                    <div class="hangar-v2-heading"><i class="fa-solid fa-ranking-star"></i> Hall of Fame (Top 10)</div>
                    <div id="hangar-hof-list" class="hangar-hof-list"></div>
                </div>
            </div>
        `;
        body.appendChild(section);

        section.querySelectorAll('[data-paint]').forEach(btn => {
            btn.addEventListener('click', () => {
                shipCustom.paint = btn.dataset.paint;
                saveCustom();
                section.querySelectorAll('[data-paint]').forEach(b => b.classList.toggle('active', b === btn));
                applyShipCustomizationToActiveVehicle();
                unlockAchievement('customizer');
                const c = getCore();
                if (c) c.playClickSFX();
            });
        });

        section.querySelectorAll('[data-laser]').forEach(btn => {
            btn.addEventListener('click', () => {
                shipCustom.laser = btn.dataset.laser;
                saveCustom();
                section.querySelectorAll('[data-laser]').forEach(b => b.classList.toggle('active', b === btn));
                unlockAchievement('customizer');
                const c = getCore();
                if (c) c.playClickSFX();
            });
        });

        section.querySelectorAll('[data-fleet]').forEach(btn => {
            btn.addEventListener('click', () => switchActiveFleetShip(btn.dataset.fleet));
        });

        renderHangarProfile();
    }

    function renderHangarProfile() {
        const achGrid = document.getElementById('hangar-ach-grid');
        const achCount = document.getElementById('ach-count-lbl');
        if (achGrid) {
            const count = Object.keys(unlockedAch).length;
            if (achCount) achCount.textContent = `${count}/${ACHIEVEMENTS.length}`;
            achGrid.innerHTML = ACHIEVEMENTS.map(a => {
                const done = !!unlockedAch[a.id];
                return `<div class="ach-pill ${done ? 'done' : ''}" title="${a.desc}"><span>${a.icon}</span><span>${isFR() ? a.fr : a.en}</span></div>`;
            }).join('');
        }
        const hofEl = document.getElementById('hangar-hof-list');
        if (hofEl) {
            if (!hallOfFame.length) {
                hofEl.innerHTML = '<div style="font-size:0.78rem;color:#94a3b8;padding:8px;">Complete missions or destroy asteroids to enter the Galactic Hall of Fame!</div>';
            } else {
                hofEl.innerHTML = hallOfFame.map((h, i) => `
                    <div class="hof-row"><span>#${i + 1} ${h.rank}</span><strong>${h.score.toLocaleString()} PTS</strong><span class="hof-date">${h.date}</span></div>
                `).join('');
            }
        }
    }

    // ── Keyboard shortcut [M] for Homing Missile + HUD wiring ─────────────
    window.addEventListener('keydown', (e) => {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
        const c = getCore();
        if (c && c.isPilotActive() && e.key.toLowerCase() === 'm') {
            e.preventDefault();
            fireHomingMissile();
        }
    });

    function wireExtraHUDControls() {
        const tbtnMissile = document.getElementById('tbtn-missile');
        if (tbtnMissile && !tbtnMissile.dataset.wired) {
            tbtnMissile.dataset.wired = '1';
            tbtnMissile.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); fireHomingMissile(); }, { passive: false });
            tbtnMissile.addEventListener('click', fireHomingMissile);
        }
        const btnGyro = document.getElementById('btn-hud-gyro-toggle');
        if (btnGyro && !btnGyro.dataset.wired) {
            btnGyro.dataset.wired = '1';
            btnGyro.addEventListener('click', toggleGyroSteering);
        }
        const btnHangar = document.getElementById('btn-open-hangar');
        if (btnHangar && !btnHangar.dataset.v2Wired) {
            btnHangar.dataset.v2Wired = '1';
            btnHangar.addEventListener('click', () => {
                injectHangarCustomizerUI();
                renderHangarProfile();
            });
        }
    }

    // ── Register Clean Hooks with HyperStudioCore ─────────────────────────
    window.__HyperFlightV2 = {
        getLaserColorHex: () => (LASER_THEMES[shipCustom.laser] || LASER_THEMES.cyan).hex,
        pollExternalControls,
        onShieldHit,
        registerComboHit,
        fireHomingMissile,
        toggleGyroSteering,
        spawnExplosion,
        getAchievements: () => ACHIEVEMENTS,
        getHallOfFame: () => hallOfFame
    };

    window.__HyperStudioHooks = window.__HyperStudioHooks || {};

    window.__HyperStudioHooks.onTogglePilot = function (isActive) {
        wireExtraHUDControls();
        injectHangarCustomizerUI();
        if (isActive) {
            unlockAchievement('first_flight');
            applyShipCustomizationToActiveVehicle();
            ensureFlightFX();
            const c = getCore();
            if (c) spawnWorldWarpGates(c.getActiveCosmosWorld());
        } else {
            const c = getCore();
            if (c) recordHallOfFame(c.getScore());
            cleanupFlightFX();
            comboCount = 0;
            updateComboBadge();
        }
    };

    window.__HyperStudioHooks.onMissionStart = function (missionKey) {
        cleanupCombatEntities();
        if (missionKey === 'boss') {
            spawnMothershipBoss();
        } else if (missionKey === 'asteroids' || missionKey === 'station') {
            spawnEnemySquadron(2, new THREE.Vector3(0, 16, 110));
        }
    };

    window.__HyperStudioHooks.onWorldBuilt = function (worldType) {
        const c = getCore();
        if (c && c.isPilotActive()) {
            spawnWorldWarpGates(worldType);
        }
    };

    window.__HyperStudioHooks.onPilotTick = function (dtScale, vecs) {
        if (comboDecayTimer > 0) {
            comboDecayTimer -= dtScale;
            if (comboDecayTimer <= 0) {
                comboCount = 0;
                updateComboBadge();
            }
        }
        updateFlightFX(dtScale, vecs);
        updateCombatAI(dtScale);
        updateExplosions(dtScale);
        updateWarpGatesAndDocking(dtScale);
    };

    window.__HyperStudioHooks.onRadarDraw = function (ctx, cx, cy, radius, drawBlip) {
        enemyDrones.forEach(dr => { if (dr.active && dr.mesh) drawBlip(dr.mesh.position, '#ff2266', 3.5); });
        if (bossGroup && !bossDefeated) drawBlip(bossGroup.position, '#ff00ff', 5.5);
        warpGates.forEach(g => { if (g.mesh) drawBlip(g.mesh.position, '#00f2fe', 4); });
    };

    window.addEventListener('DOMContentLoaded', () => {
        wireExtraHUDControls();
        injectHangarCustomizerUI();
    });
})();
