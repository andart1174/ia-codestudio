/**
 * IA CODE STUDIO — PRO FEATURES FOR STUDIO 3D/4D PRO v2.0
 * Universal 3D Model Export: OBJ, STL, GLTF/GLB (Pro-Gated + Full EN/FR i18n)
 */

(function () {
    'use strict';

    const I18N = {
        en: {
            title: '📦 Universal 3D Export (Pro)',
            desc: 'Export your 3D scene directly for Blender, Unity, Unreal Engine, Cinema 4D, or 3D Printers.',
            objDesc: 'Standard mesh format for Blender, Maya, 3ds Max & Cinema 4D',
            stlDesc: 'Ready for 3D Printing (Bambu Lab, Prusa, Ultimaker, Creality)',
            gltfDesc: 'Modern binary PBR format for Web, Unity, Unreal Engine & WebAR',
            noScene: '⚠️ No 3D scene found! Create or load a 3D model first.',
            emptyScene: '⚠️ The 3D scene is empty! Add an object before exporting.',
            objMissing: '❌ OBJExporter library is not loaded.',
            stlMissing: '❌ STLExporter library is not loaded.',
            gltfMissing: '❌ GLTFExporter library is not loaded.',
            objOk: '✅ 3D Model exported as .OBJ!',
            stlOk: '✅ 3D Model exported as .STL (3D Print ready)!',
            gltfOk: '✅ 3D Model exported as .GLB (Binary GLTF)!',
            errPrefix: '❌ Export error: '
        },
        fr: {
            title: '📦 Exportation 3D Universelle (Pro)',
            desc: 'Exportez votre scène 3D directement pour Blender, Unity, Unreal Engine, Cinema 4D ou imprimantes 3D.',
            objDesc: 'Format maillage standard pour Blender, Maya, 3ds Max & Cinema 4D',
            stlDesc: 'Prêt pour l\'impression 3D (Bambu Lab, Prusa, Ultimaker, Creality)',
            gltfDesc: 'Format PBR binaire moderne pour Web, Unity, Unreal Engine & WebAR',
            noScene: '⚠️ Aucune scène 3D détectée ! Créez ou chargez d\'abord un modèle.',
            emptyScene: '⚠️ La scène 3D est vide ! Ajoutez un objet avant d\'exporter.',
            objMissing: '❌ La librairie OBJExporter n\'est pas chargée.',
            stlMissing: '❌ La librairie STLExporter n\'est pas chargée.',
            gltfMissing: '❌ La librairie GLTFExporter n\'est pas chargée.',
            objOk: '✅ Modèle 3D exporté en .OBJ !',
            stlOk: '✅ Modèle 3D exporté en .STL (Prêt pour impression 3D) !',
            gltfOk: '✅ Modèle 3D exporté en .GLB (GLTF Binaire) !',
            errPrefix: '❌ Erreur exportation : '
        }
    };

    function getLang() {
        const raw = (window.currentLang || document.documentElement.lang || 'en').toLowerCase();
        return raw.startsWith('fr') ? 'fr' : 'en';
    }

    function t(key) {
        return (I18N[getLang()] || I18N.en)[key] || key;
    }

    function notify(msg) {
        if (typeof window.toast === 'function') window.toast(msg);
        else alert(msg);
    }

    function requirePro() {
        if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
            if (typeof window.showPaywallModal === 'function') window.showPaywallModal();
            return false;
        }
        return true;
    }

    function getExportTarget() {
        if (!window.SketchExtruder || !window.SketchExtruder.getGroup) {
            notify(t('noScene'));
            return null;
        }
        const target = window.SketchExtruder.getGroup() || (window.SketchExtruder.getScene && window.SketchExtruder.getScene());
        if (!target || !target.children || target.children.length === 0) {
            notify(t('emptyScene'));
            return null;
        }
        return target;
    }

    function triggerDownload(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 500);
    }

    function refreshModalLang() {
        const setTxt = (id, key) => {
            const el = document.getElementById(id);
            if (el) el.textContent = t(key);
        };
        setTxt('lbl-3d-export-title', 'title');
        setTxt('lbl-3d-export-desc', 'desc');
        setTxt('lbl-obj-desc', 'objDesc');
        setTxt('lbl-stl-desc', 'stlDesc');
        setTxt('lbl-gltf-desc', 'gltfDesc');
    }

    function init3DExporters() {
        const btnOpenModal = document.getElementById('btn-export-3d-modal');
        const modal = document.getElementById('modal-export-3d');
        const btnCloseModal = document.getElementById('btn-close-3d-modal');
        const btnObj = document.getElementById('btn-do-export-obj');
        const btnStl = document.getElementById('btn-do-export-stl');
        const btnGltf = document.getElementById('btn-do-export-gltf');

        refreshModalLang();

        if (btnOpenModal && modal) {
            btnOpenModal.addEventListener('click', () => {
                if (!requirePro()) return;
                refreshModalLang();
                modal.classList.add('active');
            });
        }

        if (btnCloseModal && modal) {
            btnCloseModal.addEventListener('click', () => modal.classList.remove('active'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }

        if (btnObj) {
            btnObj.addEventListener('click', () => {
                if (!requirePro()) return;
                const target = getExportTarget();
                if (!target) return;
                if (typeof THREE.OBJExporter === 'undefined') { notify(t('objMissing')); return; }
                try {
                    const exporter = new THREE.OBJExporter();
                    const result = exporter.parse(target);
                    triggerDownload(new Blob([result], { type: 'text/plain' }), `ia-studio-3d-${Date.now()}.obj`);
                    notify(t('objOk'));
                    if (modal) modal.classList.remove('active');
                } catch (e) {
                    console.error('OBJ Export Error:', e);
                    notify(t('errPrefix') + e.message);
                }
            });
        }

        if (btnStl) {
            btnStl.addEventListener('click', () => {
                if (!requirePro()) return;
                const target = getExportTarget();
                if (!target) return;
                if (typeof THREE.STLExporter === 'undefined') { notify(t('stlMissing')); return; }
                try {
                    const exporter = new THREE.STLExporter();
                    const result = exporter.parse(target, { binary: true });
                    triggerDownload(new Blob([result], { type: 'application/octet-stream' }), `ia-studio-3d-${Date.now()}.stl`);
                    notify(t('stlOk'));
                    if (modal) modal.classList.remove('active');
                } catch (e) {
                    console.error('STL Export Error:', e);
                    notify(t('errPrefix') + e.message);
                }
            });
        }

        if (btnGltf) {
            btnGltf.addEventListener('click', () => {
                if (!requirePro()) return;
                const target = getExportTarget();
                if (!target) return;
                if (typeof THREE.GLTFExporter === 'undefined') { notify(t('gltfMissing')); return; }
                try {
                    const exporter = new THREE.GLTFExporter();
                    exporter.parse(
                        target,
                        function (result) {
                            if (result instanceof ArrayBuffer) {
                                triggerDownload(new Blob([result], { type: 'model/gltf-binary' }), `ia-studio-3d-${Date.now()}.glb`);
                            } else {
                                triggerDownload(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }), `ia-studio-3d-${Date.now()}.gltf`);
                            }
                            notify(t('gltfOk'));
                            if (modal) modal.classList.remove('active');
                        },
                        { binary: true }
                    );
                } catch (e) {
                    console.error('GLTF Export Error:', e);
                    notify(t('errPrefix') + e.message);
                }
            });
        }

        window.addEventListener('studio:langchange', refreshModalLang);
    }

    window.ProExport3D = { refreshLang: refreshModalLang };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init3DExporters);
    } else {
        init3DExporters();
    }
})();
