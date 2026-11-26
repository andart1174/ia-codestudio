/* ============================================================================
   QUANTUM 3D HUD BUILDER v2.0 — MODULE 1: SHADERS, GLITCH FX, PRESETS & SLICING
   Ideas #1 (GLSL Fresnel + Glitch), #3 (4 Flagship Presets), #10 (Dual Hex +
   6 Cinema Themes), #12 (Visible Neon Laser Cut Planes)
   ============================================================================ */
(function () {
    'use strict';

    window.__QuantumHUDHooks = window.__QuantumHUDHooks || {};

    const CINEMA_THEMES = {
        jarvis:      { name: 'Jarvis Arc',    pri: '#00f3ff', sec: '#ffd700', preset: 'arcreactor' },
        matrix:      { name: 'Matrix Bio',    pri: '#00ff66', sec: '#00c896', preset: null },
        bladerunner: { name: 'Blade Runner',  pri: '#ff7b00', sec: '#00e5ff', preset: null },
        sith:        { name: 'Crimson Sith',  pri: '#ff1e42', sec: '#ff8800', preset: null },
        synthwave:   { name: 'Synthwave',     pri: '#ff2a85', sec: '#00f3ff', preset: null },
        ghost:       { name: 'Ghost Protocol',pri: '#d8f3ff', sec: '#8b5cf6', preset: null }
    };

    const activeFresnelMats = new Set();
    let tesseractState = null;
    let dysonPlanets = [];
    let defenseSatellites = [];
    let arcCoilsGroup = null;
    let sliceLaserGroup = null;
    let sliceRings = { y: null, x: null, z: null };
    let glitchBurstUntil = 0;
    let glitchOffsetX = 0;
    let glitchOffsetY = 0;

    // ------------------------------------------------------------------------
    // 1. CUSTOM GLSL FRESNEL + ANIMATED SCANLINE + GLITCH SHADER MATERIAL
    // ------------------------------------------------------------------------
    function createFresnelMaterial(primaryHex, secondaryHex, clippingPlanes) {
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uColor:      { value: new THREE.Color(primaryHex) },
                uSecColor:   { value: new THREE.Color(secondaryHex) },
                uTime:       { value: 0 },
                uGlitch:     { value: 0.2 },
                uAudioBoost: { value: 1.0 },
                uOpacity:    { value: 0.92 }
            },
            vertexShader: `
                #include <clipping_planes_pars_vertex>
                uniform float uTime;
                uniform float uGlitch;
                varying vec3 vNormalView;
                varying vec3 vViewPos;
                varying vec3 vWorldPos;
                void main() {
                    vec3 pos = position;
                    float glitchWave = sin(pos.y * 16.0 + uTime * 22.0);
                    float spike = step(0.92 - (uGlitch * 0.14), fract(sin(floor(uTime * 10.0) * 12.9898 + pos.y * 4.0) * 43758.5453));
                    pos.x += glitchWave * spike * uGlitch * 0.22;
                    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                    vWorldPos = worldPos.xyz;
                    vec4 mvPosition = viewMatrix * worldPos;
                    vViewPos = -mvPosition.xyz;
                    vNormalView = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * mvPosition;
                    #include <clipping_planes_vertex>
                }
            `,
            fragmentShader: `
                #include <clipping_planes_pars_fragment>
                uniform vec3 uColor;
                uniform vec3 uSecColor;
                uniform float uTime;
                uniform float uGlitch;
                uniform float uAudioBoost;
                uniform float uOpacity;
                varying vec3 vNormalView;
                varying vec3 vViewPos;
                varying vec3 vWorldPos;
                void main() {
                    #include <clipping_planes_fragment>
                    vec3 N = normalize(gl_FrontFacing ? vNormalView : -vNormalView);
                    vec3 V = normalize(vViewPos);
                    float fresnel = pow(1.0 - clamp(abs(dot(N, V)), 0.0, 1.0), 2.1);
                    float scan = 0.5 + 0.5 * sin(vWorldPos.y * 26.0 - uTime * 5.2);
                    float sweep = smoothstep(0.92, 1.0, sin(vWorldPos.y * 1.4 - uTime * 2.1));
                    float flicker = 1.0 - (uGlitch * 0.18 * step(0.95, fract(sin(uTime * 37.0) * 913.7)));
                    vec3 col = mix(uColor, uSecColor, clamp(fresnel * 0.65 + sweep * 0.5, 0.0, 1.0));
                    col *= (0.55 + fresnel * 1.65 + sweep * 0.9) * uAudioBoost * flicker;
                    float alpha = clamp((0.14 + fresnel * 0.82 + scan * 0.12 + sweep * 0.28) * uOpacity, 0.08, 0.98);
                    gl_FragColor = vec4(col, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            clipping: true,
            clippingPlanes: clippingPlanes || []
        });
        activeFresnelMats.add(mat);
        return mat;
    }

    function pruneDisposedFresnelMats() {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const scene = core.getScene();
        if (!scene) return;
        const inScene = new Set();
        scene.traverse(obj => {
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => inScene.add(m));
                else inScene.add(obj.material);
            }
        });
        activeFresnelMats.forEach(m => {
            if (!inScene.has(m)) activeFresnelMats.delete(m);
        });
    }

    function applyFresnelToObject(root, color, secColor, localPlanes) {
        if (!root) return;
        root.traverse(child => {
            if (child.userData && child.userData.isOutline) return;
            if (child.isMesh && child.geometry) {
                child.visible = true;
                if (child.userData.wireframeOutline) {
                    child.remove(child.userData.wireframeOutline);
                    child.userData.wireframeOutline = null;
                }
                if (child.userData.pointsCloud) {
                    if (child.userData.pointsCloud.parent) child.userData.pointsCloud.parent.remove(child.userData.pointsCloud);
                    child.userData.pointsCloud = null;
                }
                child.material = createFresnelMaterial(color, secColor, localPlanes);
                const wireOverlay = new THREE.Mesh(
                    child.geometry,
                    new THREE.MeshBasicMaterial({
                        color: secColor,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.22,
                        clippingPlanes: localPlanes || [],
                        clipShadows: true
                    })
                );
                wireOverlay.userData.isOutline = true;
                child.add(wireOverlay);
                child.userData.wireframeOutline = wireOverlay;
            }
        });
    }

    // ------------------------------------------------------------------------
    // 2. FOUR NEW FLAGSHIP 3D HOLOGRAM PRESETS (arcreactor, dyson, defense, tesseract4d)
    // ------------------------------------------------------------------------
    function buildArcReactorPreset(coreGroup, color, colorSec, localPlanes) {
        const useFresnel = window.__QuantumHUDCore && window.__QuantumHUDCore.getMaterialMode() === 'fresnel';
        const mkSolidMat = (c1, c2, op) => useFresnel
            ? createFresnelMaterial(c1, c2, localPlanes)
            : new THREE.MeshBasicMaterial({ color: c1, transparent: true, opacity: op, side: THREE.DoubleSide, clippingPlanes: localPlanes });

        // Central hexagonal plasma core
        const hexCore = new THREE.Mesh(
            new THREE.CylinderGeometry(1.05, 1.05, 0.55, 6),
            mkSolidMat(color, colorSec, 0.42)
        );
        hexCore.rotation.x = Math.PI / 2;
        coreGroup.add(hexCore);

        const coreWire = new THREE.Mesh(
            new THREE.CylinderGeometry(1.12, 1.12, 0.6, 6),
            new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.95, clippingPlanes: localPlanes })
        );
        coreWire.rotation.x = Math.PI / 2;
        coreGroup.add(coreWire);

        // Inner triangular Stark energy emblem
        const triRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.65, 0.08, 8, 3),
            new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.95, clippingPlanes: localPlanes })
        );
        triRing.position.z = 0.32;
        coreGroup.add(triRing);

        // Main copper/neon palladium torus ring
        const ring1 = new THREE.Mesh(
            new THREE.TorusGeometry(2.55, 0.24, 14, 54),
            new THREE.MeshBasicMaterial({ color: colorSec, wireframe: true, transparent: true, opacity: 0.78, clippingPlanes: localPlanes })
        );
        coreGroup.add(ring1);

        // 10 radial induction coils
        arcCoilsGroup = new THREE.Group();
        const coilGeo = new THREE.BoxGeometry(0.46, 0.88, 0.52);
        for (let i = 0; i < 10; i++) {
            const ang = (i / 10) * Math.PI * 2;
            const coilMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? colorSec : color,
                wireframe: i % 2 !== 0,
                transparent: true,
                opacity: i % 2 === 0 ? 0.52 : 0.85,
                clippingPlanes: localPlanes
            });
            const coil = new THREE.Mesh(coilGeo, coilMat);
            coil.position.set(Math.cos(ang) * 2.55, Math.sin(ang) * 2.55, 0);
            coil.rotation.z = ang + Math.PI / 2;
            arcCoilsGroup.add(coil);

            // Micro spoke beam connecting center to coil
            const spokeGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(Math.cos(ang) * 1.15, Math.sin(ang) * 1.15, 0),
                new THREE.Vector3(Math.cos(ang) * 2.25, Math.sin(ang) * 2.25, 0)
            ]);
            arcCoilsGroup.add(new THREE.Line(spokeGeo, new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.7, clippingPlanes: localPlanes })));
        }
        coreGroup.add(arcCoilsGroup);

        // Outer quantum containment ring
        const ring2 = new THREE.Mesh(
            new THREE.TorusGeometry(3.55, 0.08, 10, 64),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.65, clippingPlanes: localPlanes })
        );
        coreGroup.add(ring2);

        return { coreMesh: coreWire, ring1, ring2 };
    }

    function buildDysonPreset(coreGroup, color, colorSec, localPlanes) {
        dysonPlanets = [];
        // Radiant central plasma star
        const starCore = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.18, 2),
            createFresnelMaterial(color, colorSec, localPlanes)
        );
        coreGroup.add(starCore);

        const starWire = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.32, 1),
            new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.85, clippingPlanes: localPlanes })
        );
        coreGroup.add(starWire);

        // Geodesic Dyson Energy Shell (collector lattice)
        const dysonShell = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2.75, 1),
            new THREE.MeshBasicMaterial({ color: colorSec, wireframe: true, transparent: true, opacity: 0.55, clippingPlanes: localPlanes })
        );
        coreGroup.add(dysonShell);

        // Collector hex mirrors at vertices
        const posAttr = dysonShell.geometry.attributes.position;
        const mirrorGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 6);
        const seen = new Set();
        for (let i = 0; i < posAttr.count; i++) {
            const vx = posAttr.getX(i), vy = posAttr.getY(i), vz = posAttr.getZ(i);
            const key = vx.toFixed(2) + ',' + vy.toFixed(2) + ',' + vz.toFixed(2);
            if (seen.has(key)) continue;
            seen.add(key);
            if (seen.size > 24) break;
            const mirror = new THREE.Mesh(
                mirrorGeo,
                new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, clippingPlanes: localPlanes })
            );
            mirror.position.set(vx, vy, vz);
            mirror.lookAt(0, 0, 0);
            mirror.rotateX(Math.PI / 2);
            coreGroup.add(mirror);
        }

        // 3 tilted planetary orbital rings + orbiting holographic planets
        const orbits = [
            { r: 3.7, tiltX: Math.PI / 2.2, tiltZ: 0.22, speed: 0.9, pSize: 0.22, col: colorSec },
            { r: 4.5, tiltX: Math.PI / 2.6, tiltZ: -0.35, speed: 0.62, pSize: 0.28, col: color },
            { r: 5.3, tiltX: Math.PI / 1.9, tiltZ: 0.48, speed: 0.42, pSize: 0.19, col: colorSec }
        ];
        let r1 = null, r2 = null;
        orbits.forEach((orb, idx) => {
            const orbGroup = new THREE.Group();
            orbGroup.rotation.x = orb.tiltX;
            orbGroup.rotation.z = orb.tiltZ;
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(orb.r, 0.035, 8, 72),
                new THREE.MeshBasicMaterial({ color: orb.col, transparent: true, opacity: 0.55, clippingPlanes: localPlanes })
            );
            orbGroup.add(ring);
            const planet = new THREE.Mesh(
                new THREE.SphereGeometry(orb.pSize, 12, 12),
                new THREE.MeshBasicMaterial({ color: orb.col, wireframe: true, transparent: true, opacity: 0.95, clippingPlanes: localPlanes })
            );
            planet.position.set(orb.r, 0, 0);
            orbGroup.add(planet);
            dysonPlanets.push({ mesh: planet, radius: orb.r, speed: orb.speed, angle: idx * 2.1 });
            coreGroup.add(orbGroup);
            if (idx === 0) r1 = ring;
            if (idx === 1) r2 = ring;
        });

        return { coreMesh: starWire, ring1: r1, ring2: r2 };
    }

    function buildDefensePreset(coreGroup, color, colorSec, localPlanes) {
        defenseSatellites = [];
        // Geodesic plasma forcefield shield
        const shieldFresnel = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2.35, 2),
            createFresnelMaterial(color, colorSec, localPlanes)
        );
        coreGroup.add(shieldFresnel);

        const shieldWire = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2.42, 2),
            new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.45, clippingPlanes: localPlanes })
        );
        coreGroup.add(shieldWire);

        // Protected command core inside forcefield
        const innerBase = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.9, 0),
            new THREE.MeshBasicMaterial({ color: colorSec, wireframe: true, transparent: true, opacity: 0.9, clippingPlanes: localPlanes })
        );
        coreGroup.add(innerBase);

        // Equatorial defense ring
        const ring1 = new THREE.Mesh(
            new THREE.RingGeometry(3.25, 3.65, 48),
            new THREE.MeshBasicMaterial({ color: colorSec, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true, clippingPlanes: localPlanes })
        );
        ring1.rotation.x = Math.PI / 2;
        coreGroup.add(ring1);

        const ring2 = new THREE.Mesh(
            new THREE.TorusGeometry(4.15, 0.04, 8, 64),
            new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5, clippingPlanes: localPlanes })
        );
        ring2.rotation.x = Math.PI / 2;
        coreGroup.add(ring2);

        // 3 Orbiting Defense Satellites + live laser targeting beams
        for (let i = 0; i < 3; i++) {
            const ang = (i / 3) * Math.PI * 2;
            const satGroup = new THREE.Group();
            const body = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.32, 0),
                new THREE.MeshBasicMaterial({ color: colorSec, wireframe: true, clippingPlanes: localPlanes })
            );
            const wingL = new THREE.Mesh(
                new THREE.BoxGeometry(0.7, 0.06, 0.25),
                new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.75, clippingPlanes: localPlanes })
            );
            wingL.position.x = -0.5;
            const wingR = wingL.clone();
            wingR.position.x = 0.5;
            satGroup.add(body, wingL, wingR);

            const r = 4.15;
            const sx = Math.cos(ang) * r, sy = Math.sin(ang * 2) * 0.75, sz = Math.sin(ang) * r;
            satGroup.position.set(sx, sy, sz);
            satGroup.lookAt(0, 0, 0);
            coreGroup.add(satGroup);

            const beamGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(sx, sy, sz),
                new THREE.Vector3(sx * 0.56, sy * 0.56, sz * 0.56)
            ]);
            const beamLine = new THREE.Line(
                beamGeo,
                new THREE.LineBasicMaterial({ color: colorSec, transparent: true, opacity: 0.85, clippingPlanes: localPlanes })
            );
            coreGroup.add(beamLine);
            defenseSatellites.push({ group: satGroup, beam: beamLine, angle: ang, radius: r });
        }

        return { coreMesh: shieldWire, ring1, ring2 };
    }

    function buildTesseract4DPreset(coreGroup, color, colorSec, localPlanes) {
        // Real 16 vertices in 4D Euclidean space (±1, ±1, ±1, ±1) & 32 hypercube edges
        const verts4D = [];
        for (let i = 0; i < 16; i++) {
            verts4D.push([
                (i & 1) ? 1 : -1,
                (i & 2) ? 1 : -1,
                (i & 4) ? 1 : -1,
                (i & 8) ? 1 : -1
            ]);
        }
        const edges = [];
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                const diff = i ^ j;
                if (diff && (diff & (diff - 1)) === 0) edges.push([i, j]);
            }
        }

        const linePositions = new Float32Array(edges.length * 2 * 3);
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.95, clippingPlanes: localPlanes });
        const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
        coreGroup.add(lineMesh);

        // 16 glowing quantum vertex nodes
        const nodes = [];
        const nodeGeo = new THREE.SphereGeometry(0.13, 10, 10);
        for (let i = 0; i < 16; i++) {
            const node = new THREE.Mesh(
                nodeGeo,
                new THREE.MeshBasicMaterial({
                    color: i < 8 ? color : colorSec,
                    transparent: true,
                    opacity: 0.95,
                    clippingPlanes: localPlanes
                })
            );
            coreGroup.add(node);
            nodes.push(node);
        }

        // Inner Fresnel core nucleus
        const nucleus = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.75, 1),
            createFresnelMaterial(color, colorSec, localPlanes)
        );
        coreGroup.add(nucleus);

        // Outer hyper-containment ring
        const ring1 = new THREE.Mesh(
            new THREE.TorusGeometry(3.8, 0.055, 8, 64),
            new THREE.MeshBasicMaterial({ color: colorSec, transparent: true, opacity: 0.6, clippingPlanes: localPlanes })
        );
        ring1.rotation.x = Math.PI / 3;
        coreGroup.add(ring1);

        tesseractState = { verts4D, edges, lineGeo, lineMesh, nodes, angleXW: 0, angleYW: 0, angleZW: 0 };
        updateTesseract4DGeometry(0);

        return { coreMesh: nucleus, ring1, ring2: null };
    }

    function updateTesseract4DGeometry(step) {
        if (!tesseractState || !tesseractState.lineGeo) return;
        const st = tesseractState;
        st.angleXW += step * 0.85;
        st.angleYW += step * 0.52;
        st.angleZW += step * 0.36;

        const cXW = Math.cos(st.angleXW), sXW = Math.sin(st.angleXW);
        const cYW = Math.cos(st.angleYW), sYW = Math.sin(st.angleYW);
        const cZW = Math.cos(st.angleZW), sZW = Math.sin(st.angleZW);

        const projected = [];
        for (let i = 0; i < 16; i++) {
            let [x, y, z, w] = st.verts4D[i];
            // 4D Rotation XW plane
            let nx = x * cXW - w * sXW;
            let nw = x * sXW + w * cXW;
            x = nx; w = nw;
            // 4D Rotation YW plane
            let ny = y * cYW - w * sYW;
            nw = y * sYW + w * cYW;
            y = ny; w = nw;
            // 4D Rotation ZW plane
            let nz = z * cZW - w * sZW;
            nw = z * sZW + w * cZW;
            z = nz; w = nw;

            // Stereographic 4D -> 3D projection
            const scale = 3.1 / (3.15 - w);
            const px = x * scale, py = y * scale, pz = z * scale;
            projected.push([px, py, pz]);
            if (st.nodes[i]) {
                st.nodes[i].position.set(px, py, pz);
                const s = Math.max(0.55, Math.min(1.65, scale * 0.72));
                st.nodes[i].scale.set(s, s, s);
            }
        }

        const posArr = st.lineGeo.attributes.position.array;
        for (let e = 0; e < st.edges.length; e++) {
            const [a, b] = st.edges[e];
            const pa = projected[a], pb = projected[b];
            const idx = e * 6;
            posArr[idx]     = pa[0]; posArr[idx + 1] = pa[1]; posArr[idx + 2] = pa[2];
            posArr[idx + 3] = pb[0]; posArr[idx + 4] = pb[1]; posArr[idx + 5] = pb[2];
        }
        st.lineGeo.attributes.position.needsUpdate = true;
    }

    // ------------------------------------------------------------------------
    // 3. VISIBLE NEON LASER SLICE PLANES (Idea #12)
    // ------------------------------------------------------------------------
    function ensureSliceLaserGroup() {
        const core = window.__QuantumHUDCore;
        if (!core || !core.getScene()) return null;
        if (sliceLaserGroup) return sliceLaserGroup;

        sliceLaserGroup = new THREE.Group();
        const mkPlaneLaser = (axis) => {
            const grp = new THREE.Group();
            const ring = new THREE.Mesh(
                new THREE.RingGeometry(3.45, 3.62, 64),
                new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending })
            );
            const disc = new THREE.Mesh(
                new THREE.CircleGeometry(3.45, 48),
                new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide, transparent: true, opacity: 0.08, depthWrite: false, blending: THREE.AdditiveBlending })
            );
            grp.add(ring, disc);
            if (axis === 'y') grp.rotation.x = Math.PI / 2;
            if (axis === 'x') grp.rotation.y = Math.PI / 2;
            grp.visible = false;
            return grp;
        };

        sliceRings.y = mkPlaneLaser('y');
        sliceRings.x = mkPlaneLaser('x');
        sliceRings.z = mkPlaneLaser('z');
        sliceLaserGroup.add(sliceRings.y, sliceRings.x, sliceRings.z);
        core.getScene().add(sliceLaserGroup);
        return sliceLaserGroup;
    }

    function updateSliceLaserRings() {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        ensureSliceLaserGroup();
        if (!sliceLaserGroup) return;

        const planes = core.getLocalPlanes();
        if (!planes || planes.length < 3) return;
        const hex3 = core.getSecondaryColorInfo().three;

        const map = [
            { ax: 'y', val: planes[0].constant, setPos: (g, v) => g.position.set(0, v, 0) },
            { ax: 'x', val: planes[1].constant, setPos: (g, v) => g.position.set(v, 0, 0) },
            { ax: 'z', val: planes[2].constant, setPos: (g, v) => g.position.set(0, 0, v) }
        ];
        map.forEach(item => {
            const g = sliceRings[item.ax];
            if (!g) return;
            const active = item.val < 2.95;
            g.visible = active;
            if (active) {
                item.setPos(g, item.val);
                g.children.forEach(ch => { if (ch.material && ch.material.color) ch.material.color.setHex(hex3); });
            }
        });
    }

    // ------------------------------------------------------------------------
    // 4. HOOK INTO QUANTUM HUD CORE
    // ------------------------------------------------------------------------
    window.__QuantumHUDHooks.onBuildCustomPreset = function (presetKey, coreGroup, color, colorSec, exp, localPlanes) {
        tesseractState = null;
        dysonPlanets = [];
        defenseSatellites = [];
        arcCoilsGroup = null;
        pruneDisposedFresnelMats();

        if (presetKey === 'arcreactor') return buildArcReactorPreset(coreGroup, color, colorSec, localPlanes);
        if (presetKey === 'dyson')      return buildDysonPreset(coreGroup, color, colorSec, localPlanes);
        if (presetKey === 'defense')    return buildDefensePreset(coreGroup, color, colorSec, localPlanes);
        if (presetKey === 'tesseract4d') return buildTesseract4DPreset(coreGroup, color, colorSec, localPlanes);
        return null;
    };

    window.__QuantumHUDHooks.onPostBuildCore = function (coreGroup, color, colorSec, localPlanes) {
        tesseractState = null;
        dysonPlanets = [];
        defenseSatellites = [];
        arcCoilsGroup = null;
        pruneDisposedFresnelMats();

        const core = window.__QuantumHUDCore;
        if (!core) return;
        const mode = core.getMaterialMode ? core.getMaterialMode() : 'wireframe';
        if (mode === 'fresnel') {
            coreGroup.traverse(ch => {
                if (ch.isMesh && ch.material && !ch.material.wireframe && !ch.userData?.isOutline) {
                    ch.material = createFresnelMaterial(color, colorSec, localPlanes);
                }
            });
        }
    };

    const prevOnAnimate = window.__QuantumHUDHooks.onAnimate;
    window.__QuantumHUDHooks.onAnimate = function (now, dtScale, timeClock, volumeMultiplier, freqData) {
        if (typeof prevOnAnimate === 'function') prevOnAnimate(now, dtScale, timeClock, volumeMultiplier, freqData);

        const core = window.__QuantumHUDCore;
        if (!core) return;

        const glitchPct = core.getGlitchIntensity ? core.getGlitchIntensity() : 20;
        const glitchNorm = glitchPct / 100;
        const pri3 = core.getPrimaryColorInfo().three;
        const sec3 = core.getSecondaryColorInfo().three;
        const priHex = core.getPrimaryColorInfo().hex;
        const secHex = core.getSecondaryColorInfo().hex;

        // 1. Update GLSL Fresnel shader uniforms
        activeFresnelMats.forEach(mat => {
            if (!mat.uniforms) return;
            mat.uniforms.uTime.value = timeClock * 1.3;
            mat.uniforms.uGlitch.value = glitchNorm;
            mat.uniforms.uAudioBoost.value = Math.min(2.2, volumeMultiplier);
            mat.uniforms.uColor.value.setHex(pri3);
            mat.uniforms.uSecColor.value.setHex(sec3);
        });

        // 2. Animate Flagship Presets
        if (dtScale > 0) {
            const step = 0.012 * core.getRotationSpeed() * dtScale;
            if (tesseractState && core.getActivePreset() === 'tesseract4d') {
                updateTesseract4DGeometry(step);
            }
            if (arcCoilsGroup && core.getActivePreset() === 'arcreactor') {
                arcCoilsGroup.rotation.z += step * 0.65;
            }
            if (dysonPlanets.length > 0 && core.getActivePreset() === 'dyson') {
                dysonPlanets.forEach(p => {
                    p.angle += step * p.speed * 1.4;
                    p.mesh.position.set(Math.cos(p.angle) * p.radius, Math.sin(p.angle) * p.radius, 0);
                    p.mesh.rotation.y += step * 2.0;
                });
            }
            if (defenseSatellites.length > 0 && core.getActivePreset() === 'defense') {
                defenseSatellites.forEach(s => {
                    s.angle += step * 0.9;
                    const sx = Math.cos(s.angle) * s.radius;
                    const sy = Math.sin(s.angle * 2) * 0.8;
                    const sz = Math.sin(s.angle) * s.radius;
                    s.group.position.set(sx, sy, sz);
                    s.group.lookAt(0, 0, 0);
                    const arr = s.beam.geometry.attributes.position.array;
                    arr[0] = sx; arr[1] = sy; arr[2] = sz;
                    arr[3] = sx * 0.56; arr[4] = sy * 0.56; arr[5] = sz * 0.56;
                    s.beam.geometry.attributes.position.needsUpdate = true;
                });
            }
        }

        // 3. REAL Glitch FX Engine (periodic micro-jitter + RGB chromatic shadow burst!)
        const coreGroup = core.getCoreGroup();
        const renderer = core.getRenderer();
        if (coreGroup && renderer && renderer.domElement) {
            // Undo last frame's temporary jitter so coreGroup never drifts
            if (glitchOffsetX !== 0 || glitchOffsetY !== 0) {
                coreGroup.position.x -= glitchOffsetX;
                coreGroup.position.y -= glitchOffsetY;
                glitchOffsetX = 0;
                glitchOffsetY = 0;
            }
            if (glitchPct > 2 && dtScale > 0) {
                const triggerChance = (glitchNorm * glitchNorm) * 0.085;
                if (now > glitchBurstUntil && Math.random() < triggerChance) {
                    glitchBurstUntil = now + 55 + Math.random() * 110;
                }
                if (now < glitchBurstUntil) {
                    const mag = 0.04 + glitchNorm * 0.22;
                    glitchOffsetX = (Math.random() - 0.5) * mag;
                    glitchOffsetY = (Math.random() - 0.5) * mag * 0.5;
                    coreGroup.position.x += glitchOffsetX;
                    coreGroup.position.y += glitchOffsetY;
                    const shiftPx = (1.5 + glitchNorm * 4.5).toFixed(1);
                    renderer.domElement.style.filter = `drop-shadow(${shiftPx}px 0 0 ${priHex}) drop-shadow(-${shiftPx}px 0 0 ${secHex}) contrast(${(1.08 + glitchNorm * 0.25).toFixed(2)})`;
                } else {
                    const bloomOn = core.isBloomEnabled && core.isBloomEnabled();
                    renderer.domElement.style.filter = bloomOn
                        ? `drop-shadow(0 0 12px ${priHex}) drop-shadow(0 0 28px ${priHex}55)`
                        : 'none';
                }
            }
        }
    };

    // ------------------------------------------------------------------------
    // 5. DUAL CUSTOM HEX PICKERS & 6 CINEMA THEMES (Idea #10)
    // ------------------------------------------------------------------------
    function applyTheme(themeKey) {
        const t = CINEMA_THEMES[themeKey];
        const core = window.__QuantumHUDCore;
        if (!t || !core) return;
        const pPick = document.getElementById('picker-primary-hex');
        const sPick = document.getElementById('picker-secondary-hex');
        if (pPick) pPick.value = t.pri;
        if (sPick) sPick.value = t.sec;
        document.querySelectorAll('.color-btn, .color-btn-sec').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.cinema-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === themeKey));
        core.setCustomHexColors(t.pri, t.sec);
        updateSliceLaserRings();
        core.playSound('confirm');
        core.logTerminal(`Cinema Theme applied: ${t.name.toUpperCase()} (${t.pri} / ${t.sec})`);
    }

    function bindShaderAndThemeUI() {
        const core = window.__QuantumHUDCore;
        if (!core) return;

        const priPicker = document.getElementById('picker-primary-hex');
        const secPicker = document.getElementById('picker-secondary-hex');
        if (priPicker) {
            priPicker.addEventListener('input', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                core.setCustomHexColors(e.target.value, undefined);
                updateSliceLaserRings();
            });
        }
        if (secPicker) {
            secPicker.addEventListener('input', (e) => {
                document.querySelectorAll('.color-btn-sec').forEach(b => b.classList.remove('active'));
                core.setCustomHexColors(undefined, e.target.value);
                updateSliceLaserRings();
            });
        }

        document.querySelectorAll('.cinema-theme-btn').forEach(btn => {
            btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
        });

        const btnFresnel = document.getElementById('btn-toggle-fresnel');
        if (btnFresnel) {
            btnFresnel.addEventListener('click', () => {
                const isNowFresnel = core.getMaterialMode() !== 'fresnel';
                core.setMaterialMode(isNowFresnel ? 'fresnel' : 'wireframe');
                btnFresnel.classList.toggle('active', isNowFresnel);
                core.playSound('confirm');
                core.logTerminal(isNowFresnel ? 'GLSL Fresnel Hologram Shader ENABLED.' : 'Switched to Wireframe Glow shader.');
            });
        }

        // Bind slice laser rings to X / Y / Z sliders
        ['model-slice-y', 'model-slice-x', 'model-slice-z'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', updateSliceLaserRings);
        });
        const btnReset = document.getElementById('btn-reset-model');
        if (btnReset) btnReset.addEventListener('click', () => setTimeout(updateSliceLaserRings, 20));
    }

    const prevOnReady = window.__QuantumHUDHooks.onReady;
    window.__QuantumHUDHooks.onReady = function () {
        if (typeof prevOnReady === 'function') prevOnReady();
        ensureSliceLaserGroup();
        bindShaderAndThemeUI();
        updateSliceLaserRings();
    };

    window.__QuantumShadersV2 = {
        CINEMA_THEMES,
        createFresnelMaterial,
        applyFresnelToObject,
        applyTheme,
        updateSliceLaserRings
    };
})();
