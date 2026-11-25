/**
 * HyperStudio 3D/4D v2.0 — Procedural PBR Studio Environment Map (PMREMGenerator)
 * Gives Liquid Metal, Liquid Gold, Chrome, Glass, and Starships real studio reflections (Three.js r128).
 */
(function () {
    'use strict';

    let cachedEnvRT = null;

    function buildProceduralStudioEnv(renderer) {
        if (!renderer || typeof THREE === 'undefined' || typeof THREE.PMREMGenerator === 'undefined') {
            return null;
        }
        try {
            const pmrem = new THREE.PMREMGenerator(renderer);
            pmrem.compileEquirectangularShader();

            const envScene = new THREE.Scene();
            envScene.background = new THREE.Color(0x090e1c);

            // Overhead cool studio softbox
            const topLight = new THREE.Mesh(
                new THREE.PlaneGeometry(16, 16),
                new THREE.MeshBasicMaterial({ color: 0xe6f9ff, side: THREE.DoubleSide })
            );
            topLight.position.set(0, 9, 0);
            topLight.rotation.x = Math.PI / 2;
            envScene.add(topLight);

            // Left cyan rim light panel
            const cyanPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(12, 8),
                new THREE.MeshBasicMaterial({ color: 0x00f2fe, side: THREE.DoubleSide })
            );
            cyanPanel.position.set(-10, 3, 2);
            cyanPanel.rotation.y = Math.PI / 2;
            envScene.add(cyanPanel);

            // Right magenta/purple accent rim light panel
            const magentaPanel = new THREE.Mesh(
                new THREE.PlaneGeometry(12, 8),
                new THREE.MeshBasicMaterial({ color: 0xff007f, side: THREE.DoubleSide })
            );
            magentaPanel.position.set(10, 2, -2);
            magentaPanel.rotation.y = -Math.PI / 2;
            envScene.add(magentaPanel);

            // Warm gold key highlight
            const goldAccent = new THREE.Mesh(
                new THREE.SphereGeometry(2.5, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0xffd166 })
            );
            goldAccent.position.set(5, 6, 8);
            envScene.add(goldAccent);

            // Subtle floor bounce
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(24, 24),
                new THREE.MeshBasicMaterial({ color: 0x111a33, side: THREE.DoubleSide })
            );
            floor.position.set(0, -6, 0);
            floor.rotation.x = -Math.PI / 2;
            envScene.add(floor);

            const rt = pmrem.fromScene(envScene, 0.04);

            // Dispose temporary builder resources cleanly
            envScene.traverse((o) => {
                if (o.geometry) o.geometry.dispose();
                if (o.material) o.material.dispose();
            });
            pmrem.dispose();

            return rt;
        } catch (err) {
            console.warn('[HyperPBR] Could not initialize PMREM Studio Env:', err);
            return null;
        }
    }

    window.applyHyperPBRStudioEnv = function (scene, renderer) {
        if (!scene || !renderer) return;
        if (cachedEnvRT && typeof cachedEnvRT.dispose === 'function') {
            cachedEnvRT.dispose();
            cachedEnvRT = null;
        }
        cachedEnvRT = buildProceduralStudioEnv(renderer);
        if (cachedEnvRT && cachedEnvRT.texture) {
            scene.environment = cachedEnvRT.texture;
        }
    };
})();
