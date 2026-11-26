/* ============================================================================
   QUANTUM 3D HUD BUILDER v2.0 — MODULE 3: PRO EXPORTERS SUITE ($10/mo)
   Ideas #4 (OBS Transparent Overlay + React / Vue / Embed Exporter),
   #7 (Pro HUD Video Compositor Studio 9:16 / 16:9 / 1:1 + Mixed Audio),
   #9 (Transparent PNG Overlay Capture 1x / 2x / 4K)
   ============================================================================ */
(function () {
    'use strict';

    window.__QuantumHUDHooks = window.__QuantumHUDHooks || {};

    function requirePro() {
        if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
            if (typeof window.showPaywallModal === 'function') window.showPaywallModal();
            return false;
        }
        return true;
    }

    // ------------------------------------------------------------------------
    // 1. TRANSPARENT PNG OVERLAY CAPTURE (1x HD / 2x 2K / 4K UHD) — Idea #9
    // ------------------------------------------------------------------------
    function exportTransparentPNG(resMode) {
        if (!requirePro()) return;
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const renderer = core.getRenderer();
        const scene = core.getScene();
        const camera = core.getCamera();
        if (!renderer || !scene || !camera) return;

        const mode = resMode || (document.getElementById('png-res-select')?.value || '2x');
        const origSize = new THREE.Vector2();
        renderer.getSize(origSize);
        const origPixelRatio = renderer.getPixelRatio();
        const origFog = scene.fog;
        const origBg = scene.background;
        const origAspect = camera.aspect;

        let targetW = origSize.x, targetH = origSize.y, targetPR = origPixelRatio;
        if (mode === '1x') { targetW = 1920; targetH = 1080; targetPR = 1; }
        else if (mode === '2x') { targetW = 2560; targetH = 1440; targetPR = 1; }
        else if (mode === '4k') { targetW = 3840; targetH = 2160; targetPR = 1; }

        try {
            scene.background = null;
            scene.fog = null;
            renderer.setClearColor(0x000000, 0);
            renderer.setPixelRatio(targetPR);
            renderer.setSize(targetW, targetH, false);
            camera.aspect = targetW / targetH;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);

            renderer.domElement.toBlob((blob) => {
                // Restore original viewport immediately
                scene.background = origBg;
                scene.fog = origFog;
                renderer.setPixelRatio(origPixelRatio);
                renderer.setSize(origSize.x, origSize.y, false);
                camera.aspect = origAspect;
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);

                if (!blob) {
                    core.logTerminal('ERROR: Transparent PNG capture failed.');
                    return;
                }
                const fname = `quantum-hud-${core.getActivePreset()}-${mode}-transparent.png`;
                core.safeDownloadBlob(blob, fname);
                core.playSound('confirm');
                core.logTerminal(`Transparent PNG exported (${targetW}x${targetH}): ${fname}`);
            }, 'image/png');
        } catch (err) {
            scene.background = origBg;
            scene.fog = origFog;
            renderer.setPixelRatio(origPixelRatio);
            renderer.setSize(origSize.x, origSize.y, false);
            camera.aspect = origAspect;
            camera.updateProjectionMatrix();
            console.error(err);
            core.logTerminal('ERROR capturing transparent PNG.');
        }
    }

    // ------------------------------------------------------------------------
    // 2. MULTI-FRAMEWORK & OBS TRANSPARENT OVERLAY EXPORTER — Idea #4
    // ------------------------------------------------------------------------
    function generateObsTransparentHTML() {
        const core = window.__QuantumHUDCore;
        const pri = core.getPrimaryColorInfo();
        const sec = core.getSecondaryColorInfo();
        const preset = core.getActivePreset();
        const speed = core.getRotationSpeed();
        const brand = core.getBranding();
        const clockOn = document.getElementById('layer-clock')?.checked ?? true;
        const visOn = document.getElementById('layer-visualizer')?.checked ?? true;

        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OBS Transparent Quantum HUD — ${preset.toUpperCase()}</title>
<style>
  html, body { margin:0; padding:0; width:100vw; height:100vh; overflow:hidden; background:transparent !important; font-family:'Orbitron',monospace,sans-serif; }
  canvas { display:block; width:100%; height:100%; background:transparent !important; filter: drop-shadow(0 0 10px ${pri.hex}); }
  .obs-hud-frame { position:fixed; inset:18px; pointer-events:none; }
  .c { position:absolute; width:26px; height:26px; border:2px solid ${pri.hex}; }
  .tl { top:0; left:0; border-right:none; border-bottom:none; }
  .tr { top:0; right:0; border-left:none; border-bottom:none; }
  .bl { bottom:0; left:0; border-right:none; border-top:none; }
  .br { bottom:0; right:0; border-left:none; border-top:none; }
  .obs-badge { position:fixed; top:26px; right:30px; color:${pri.hex}; font-size:12px; letter-spacing:2px; text-shadow:0 0 10px ${pri.hex}; }
  .obs-clock { position:fixed; bottom:26px; left:30px; color:${sec.hex}; font-size:18px; font-weight:700; letter-spacing:3px; text-shadow:0 0 10px ${sec.hex}; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
</head>
<body>
<div class="obs-hud-frame"><div class="c tl"></div><div class="c tr"></div><div class="c bl"></div><div class="c br"></div></div>
<div class="obs-badge">${(brand.title || 'QUANTUM HUD').replace(/</g, '')} // LIVE</div>
${clockOn ? '<div class="obs-clock" id="obs-clock">00:00:00</div>' : ''}
<script>
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(0, 1.8, 11.5);
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  const pri = ${pri.three}, sec = ${sec.three};
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 1), new THREE.MeshBasicMaterial({ color:pri, wireframe:true, transparent:true, opacity:0.9 }));
  const inner = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), new THREE.MeshBasicMaterial({ color:sec, transparent:true, opacity:0.42 }));
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 12, 64), new THREE.MeshBasicMaterial({ color:sec, transparent:true, opacity:0.8 }));
  ring1.rotation.x = Math.PI / 2.4;
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(3.8, 4.1, 48), new THREE.MeshBasicMaterial({ color:pri, wireframe:true, side:THREE.DoubleSide, transparent:true, opacity:0.6 }));
  ring2.rotation.x = Math.PI / 2;
  group.add(core, inner, ring1, ring2);
  scene.add(group);

  const bars = [];
  if (${visOn}) {
    for (let i = 0; i < 16; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1, 0.26), new THREE.MeshBasicMaterial({ color:i%2?sec:pri, wireframe:true, transparent:true, opacity:0.75 }));
      const a = (i / 16) * Math.PI * 1.2 - Math.PI * 0.6;
      b.position.set(Math.sin(a) * 5.8, -1.8, Math.cos(a) * 5.8);
      scene.add(b); bars.push(b);
    }
  }
  addEventListener('resize', () => { camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.012 * ${speed};
    core.rotation.y += 0.008 * ${speed}; core.rotation.x += 0.004 * ${speed};
    inner.rotation.y -= 0.014 * ${speed};
    ring1.rotation.z += 0.012 * ${speed}; ring2.rotation.z -= 0.009 * ${speed};
    bars.forEach((b, i) => { const h = Math.max(0.3, 1 + Math.sin(t * 4 + i * 0.45) * 1.2); b.scale.y = h; b.position.y = -2.2 + h * 0.5; });
    const clk = document.getElementById('obs-clock');
    if (clk) clk.textContent = new Date().toLocaleTimeString('en-GB');
    renderer.render(scene, camera);
  }
  loop();
<\/script>
</body>
</html>`;
    }

    function generateReactComponent() {
        const core = window.__QuantumHUDCore;
        const pri = core.getPrimaryColorInfo();
        const sec = core.getSecondaryColorInfo();
        const preset = core.getActivePreset();
        const speed = core.getRotationSpeed();
        return `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * QuantumHologramHUD — Generated by IA Code Studio (Preset: ${preset})
 * npm install three
 */
export default function QuantumHologramHUD({
  primaryColor = '${pri.hex}',
  secondaryColor = '${sec.hex}',
  speed = ${speed},
  height = 480
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true, transparent: true, opacity: 0.9 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);

    const ringGeo = new THREE.TorusGeometry(3.3, 0.08, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.78 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(coreMesh, ring);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      coreMesh.rotation.y += 0.008 * speed;
      coreMesh.rotation.x += 0.004 * speed;
      ring.rotation.z -= 0.012 * speed;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      coreGeo.dispose(); coreMat.dispose(); ringGeo.dispose(); ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [primaryColor, secondaryColor, speed]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height,
        position: 'relative',
        background: 'radial-gradient(circle, rgba(${pri.rgb}, 0.12), #030308)',
        border: '1px solid ${pri.hex}44',
        borderRadius: 12,
        overflow: 'hidden'
      }}
    />
  );
}`;
    }

    function generateVueComponent() {
        const core = window.__QuantumHUDCore;
        const pri = core.getPrimaryColorInfo();
        const sec = core.getSecondaryColorInfo();
        const speed = core.getRotationSpeed();
        return `<template>
  <div ref="stageRef" class="quantum-hud-stage"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';

const stageRef = ref(null);
let rafId = 0, renderer = null;

onMounted(() => {
  const el = stageRef.value;
  if (!el) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 11);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 1),
    new THREE.MeshBasicMaterial({ color: '${pri.hex}', wireframe: true })
  );
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.3, 0.08, 12, 64),
    new THREE.MeshBasicMaterial({ color: '${sec.hex}', transparent: true, opacity: 0.78 })
  );
  ring.rotation.x = Math.PI / 2.5;
  scene.add(core, ring);

  const tick = () => {
    rafId = requestAnimationFrame(tick);
    core.rotation.y += 0.008 * ${speed};
    ring.rotation.z -= 0.012 * ${speed};
    renderer.render(scene, camera);
  };
  tick();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.quantum-hud-stage {
  width: 100%;
  height: 460px;
  border-radius: 12px;
  border: 1px solid ${pri.hex}44;
  background: radial-gradient(circle, rgba(${pri.rgb}, 0.12), #030308);
}
</style>`;
    }

    function generateEmbedSnippet() {
        const core = window.__QuantumHUDCore;
        const shareUrl = core.buildShareHUDUrl ? core.buildShareHUDUrl() : window.location.href;
        const pri = core.getPrimaryColorInfo();
        return `<!-- Responsive Quantum 3D HUD Embed (Webflow / Framer / WordPress / HTML) -->
<div style="position:relative;width:100%;padding-bottom:56.25%;border-radius:14px;overflow:hidden;border:1px solid ${pri.hex}55;box-shadow:0 0 28px rgba(${pri.rgb},0.22);">
  <iframe
    src="${shareUrl}"
    title="Quantum 3D Holographic HUD"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="microphone; autoplay"
    loading="lazy"
  ></iframe>
</div>`;
    }

    let currentFrameworkTab = 'obs';
    function refreshFrameworkModalCode() {
        const codeEl = document.getElementById('obs-framework-code');
        const infoEl = document.getElementById('obs-framework-hint');
        const dlBtn = document.getElementById('btn-obs-download-html');
        if (!codeEl) return;

        if (currentFrameworkTab === 'obs') {
            codeEl.value = generateObsTransparentHTML();
            if (infoEl) infoEl.textContent = 'OBS / Streamlabs: Add Browser Source -> Local File -> select downloaded .html (1920x1080, transparent background included!).';
            if (dlBtn) dlBtn.style.display = 'inline-flex';
        } else if (currentFrameworkTab === 'react') {
            codeEl.value = generateReactComponent();
            if (infoEl) infoEl.textContent = 'React 18+ JSX component with full Three.js WebGL lifecycle & GPU memory cleanup.';
            if (dlBtn) dlBtn.style.display = 'none';
        } else if (currentFrameworkTab === 'vue') {
            codeEl.value = generateVueComponent();
            if (infoEl) infoEl.textContent = 'Vue 3 <script setup> Single File Component ready for Vite / Nuxt.';
            if (dlBtn) dlBtn.style.display = 'none';
        } else {
            codeEl.value = generateEmbedSnippet();
            if (infoEl) infoEl.textContent = 'Drop this responsive <iframe> into Webflow, Framer, Notion, or any website.';
            if (dlBtn) dlBtn.style.display = 'none';
        }
    }

    function openObsFrameworkModal() {
        if (!requirePro()) return;
        const modal = document.getElementById('modal-obs-framework');
        if (!modal) return;
        modal.style.display = 'flex';
        refreshFrameworkModalCode();
        window.__QuantumHUDCore?.playSound('click');
    }

    // ------------------------------------------------------------------------
    // 3. PRO HUD VIDEO COMPOSITOR STUDIO (9:16 / 16:9 / 1:1 + Audio) — Idea #7
    // ------------------------------------------------------------------------
    let isStudioRecording = false;
    let lastPreviewVideoUrl = null;
    let lastRecordedBlob = null;

    function openVideoStudio() {
        if (!requirePro()) return;
        const modal = document.getElementById('modal-video-studio');
        if (!modal) return;
        const brandInp = document.getElementById('vid-title-input');
        if (brandInp && !brandInp.value) {
            brandInp.value = window.__QuantumHUDCore?.getBranding()?.title || 'QUANTUM HUD 3D';
        }
        modal.style.display = 'flex';
        window.__QuantumHUDCore?.playSound('click');
    }

    function startStudioVideoRecording() {
        if (!requirePro() || isStudioRecording) return;
        const core = window.__QuantumHUDCore;
        const renderer = core?.getRenderer();
        if (!renderer || !renderer.domElement) return;

        const fmt = document.getElementById('vid-format-select')?.value || '9:16';
        const duration = parseInt(document.getElementById('vid-duration-select')?.value || '5', 10);
        const titleTxt = (document.getElementById('vid-title-input')?.value || 'QUANTUM HUD 3D').toUpperCase();
        const incHud = document.getElementById('vid-inc-hud')?.checked ?? true;
        const incAudio = document.getElementById('vid-inc-audio')?.checked ?? true;

        const dims = fmt === '16:9' ? { w: 1280, h: 720 } : (fmt === '1:1' ? { w: 1080, h: 1080 } : { w: 720, h: 1280 });
        const compCanvas = document.createElement('canvas');
        compCanvas.width = dims.w;
        compCanvas.height = dims.h;
        const ctx = compCanvas.getContext('2d');

        let stream;
        try {
            stream = compCanvas.captureStream(30);
        } catch (e) {
            alert('Canvas captureStream is not supported in this browser.');
            return;
        }

        // Mix Web Audio Master Bus if requested & active
        if (incAudio) {
            try {
                const dest = core.getMasterMediaDest();
                if (dest && dest.stream) {
                    dest.stream.getAudioTracks().forEach(t => stream.addTrack(t));
                }
            } catch (e) {}
        }

        let mimeType = 'video/webm;codecs=vp9';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp8') ? 'video/webm;codecs=vp8' : 'video/webm';
        }

        let recorder;
        try { recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 6000000 }); }
        catch (e) { recorder = new MediaRecorder(stream); }

        const chunks = [];
        recorder.ondataavailable = (ev) => { if (ev.data && ev.data.size > 0) chunks.push(ev.data); };

        const btnStart = document.getElementById('btn-vid-start-rec');
        const progBar = document.getElementById('vid-studio-bar');
        const progTxt = document.getElementById('vid-studio-status');
        const previewWrap = document.getElementById('vid-preview-wrap');
        const previewEl = document.getElementById('vid-preview-player');
        const btnDl = document.getElementById('btn-vid-download');

        isStudioRecording = true;
        if (btnStart) btnStart.disabled = true;
        if (previewWrap) previewWrap.style.display = 'none';
        if (progTxt) progTxt.textContent = `Recording ${fmt} (${duration}s)...`;

        const startTime = performance.now();
        let rafComp = 0;

        function compositeFrame() {
            if (!isStudioRecording) return;
            const elapsed = (performance.now() - startTime) / 1000;
            const pct = Math.min(100, (elapsed / duration) * 100);
            if (progBar) progBar.style.width = pct.toFixed(1) + '%';
            if (progTxt) progTxt.textContent = `Recording ${fmt} — ${elapsed.toFixed(1)}s / ${duration}s (${Math.round(pct)}%)`;

            const pri = core.getPrimaryColorInfo();
            const sec = core.getSecondaryColorInfo();

            // 1. Deep space gradient backdrop
            const bgGrad = ctx.createRadialGradient(dims.w / 2, dims.h / 2, 20, dims.w / 2, dims.h / 2, Math.max(dims.w, dims.h) * 0.65);
            bgGrad.addColorStop(0, `rgba(${pri.rgb}, 0.14)`);
            bgGrad.addColorStop(1, '#03030a');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, dims.w, dims.h);

            // 2. Draw live WebGL 3D canvas centered with aspect fit/cover
            const srcCanvas = renderer.domElement;
            const srcRatio = srcCanvas.width / Math.max(1, srcCanvas.height);
            const dstRatio = dims.w / dims.h;
            let drawW = dims.w, drawH = dims.h, dx = 0, dy = 0;
            if (srcRatio > dstRatio) {
                drawH = dims.w / srcRatio;
                dy = (dims.h - drawH) / 2;
            } else {
                drawW = dims.h * srcRatio;
                dx = (dims.w - drawW) / 2;
            }
            ctx.drawImage(srcCanvas, dx, dy, drawW, drawH);

            // 3. Optional Full HUD Compositor Overlays (Corner Brackets + Telemetry + Scanlines + Title)
            if (incHud) {
                // Subtle scanlines
                ctx.fillStyle = `rgba(${pri.rgb}, 0.04)`;
                for (let y = 0; y < dims.h; y += 6) ctx.fillRect(0, y, dims.w, 2);

                // Moving neon scanner bar
                const scanY = ((elapsed * 220) % dims.h);
                const sGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
                sGrad.addColorStop(0, 'transparent');
                sGrad.addColorStop(0.5, `rgba(${pri.rgb}, 0.22)`);
                sGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = sGrad;
                ctx.fillRect(0, scanY - 30, dims.w, 60);

                // Corner brackets
                const m = 28, L = 42;
                ctx.strokeStyle = pri.hex;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(m, m + L); ctx.lineTo(m, m); ctx.lineTo(m + L, m);
                ctx.moveTo(dims.w - m - L, m); ctx.lineTo(dims.w - m, m); ctx.lineTo(dims.w - m, m + L);
                ctx.moveTo(m, dims.h - m - L); ctx.lineTo(m, dims.h - m); ctx.lineTo(m + L, dims.h - m);
                ctx.moveTo(dims.w - m - L, dims.h - m); ctx.lineTo(dims.w - m, dims.h - m); ctx.lineTo(dims.w - m, dims.h - m - L);
                ctx.stroke();

                // Top Brand Title
                ctx.fillStyle = pri.hex;
                ctx.font = `bold ${Math.round(dims.w * 0.036)}px Orbitron, monospace`;
                ctx.textAlign = 'center';
                ctx.shadowColor = pri.hex;
                ctx.shadowBlur = 14;
                ctx.fillText(titleTxt, dims.w / 2, 74);
                ctx.shadowBlur = 0;

                // Bottom Live Telemetry Strip
                ctx.textAlign = 'left';
                ctx.font = `600 ${Math.round(dims.w * 0.019)}px Orbitron, monospace`;
                ctx.fillStyle = sec.hex;
                const polyTxt = document.getElementById('telemetry-total-polygons')?.textContent || 'ACTIVE';
                ctx.fillText(`PRESET: ${core.getActivePreset().toUpperCase()}  |  POLYS: ${polyTxt}`, 44, dims.h - 54);
                ctx.textAlign = 'right';
                ctx.fillStyle = pri.hex;
                ctx.fillText(`REC ● ${elapsed.toFixed(1)}s`, dims.w - 44, dims.h - 54);
                ctx.textAlign = 'left';
            }

            if (elapsed >= duration) {
                isStudioRecording = false;
                if (recorder.state === 'recording') recorder.stop();
                return;
            }
            rafComp = requestAnimationFrame(compositeFrame);
        }

        recorder.onstop = () => {
            cancelAnimationFrame(rafComp);
            isStudioRecording = false;
            if (btnStart) btnStart.disabled = false;
            lastRecordedBlob = new Blob(chunks, { type: 'video/webm' });
            if (lastPreviewVideoUrl) { try { URL.revokeObjectURL(lastPreviewVideoUrl); } catch (e) {} }
            lastPreviewVideoUrl = URL.createObjectURL(lastRecordedBlob);
            if (previewEl) { previewEl.src = lastPreviewVideoUrl; previewEl.play().catch(() => {}); }
            if (previewWrap) previewWrap.style.display = 'block';
            if (btnDl) btnDl.dataset.filename = `quantum-hud-${core.getActivePreset()}-${fmt.replace(':', 'x')}-${duration}s.webm`;
            if (progTxt) progTxt.textContent = `✅ Ready! (${(lastRecordedBlob.size / 1024 / 1024).toFixed(2)} MB WebM)`;
            core.playSound('confirm');
            core.logTerminal(`Pro HUD Video rendered (${fmt}, ${duration}s).`);
        };

        recorder.start(100);
        compositeFrame();
    }

    // ------------------------------------------------------------------------
    // 4. BIND EXPORTER UI MODALS & BUTTONS
    // ------------------------------------------------------------------------
    function bindProExportersUI() {
        const core = window.__QuantumHUDCore;
        if (!core) return;

        // Transparent PNG button
        const btnPng = document.getElementById('btn-export-png-hud');
        if (btnPng) btnPng.addEventListener('click', () => exportTransparentPNG());

        // OBS & React/Vue Exporter modal
        const btnObsModal = document.getElementById('btn-export-obs-framework');
        if (btnObsModal) btnObsModal.addEventListener('click', openObsFrameworkModal);

        document.querySelectorAll('.obs-tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                currentFrameworkTab = tab.dataset.tab;
                document.querySelectorAll('.obs-tab-btn').forEach(b => b.classList.toggle('active', b === tab));
                refreshFrameworkModalCode();
                core.playSound('click');
            });
        });

        const btnObsCopy = document.getElementById('btn-obs-copy-code');
        if (btnObsCopy) {
            btnObsCopy.addEventListener('click', () => {
                const ta = document.getElementById('obs-framework-code');
                if (!ta) return;
                navigator.clipboard.writeText(ta.value).then(() => {
                    const prev = btnObsCopy.innerHTML;
                    btnObsCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    core.playSound('confirm');
                    setTimeout(() => { btnObsCopy.innerHTML = prev; }, 1600);
                });
            });
        }

        const btnObsDl = document.getElementById('btn-obs-download-html');
        if (btnObsDl) {
            btnObsDl.addEventListener('click', () => {
                const html = generateObsTransparentHTML();
                core.safeDownloadBlob(new Blob([html], { type: 'text/html' }), `obs-transparent-hud-${core.getActivePreset()}.html`);
                core.playSound('confirm');
                core.logTerminal('OBS Transparent Browser Source .html downloaded!');
            });
        }

        const btnObsClose = document.getElementById('btn-obs-close');
        const obsModal = document.getElementById('modal-obs-framework');
        if (btnObsClose && obsModal) btnObsClose.addEventListener('click', () => { obsModal.style.display = 'none'; });
        if (obsModal) obsModal.addEventListener('click', (e) => { if (e.target === obsModal) obsModal.style.display = 'none'; });

        // Video Studio modal
        const btnVidStart = document.getElementById('btn-vid-start-rec');
        const btnVidDl = document.getElementById('btn-vid-download');
        const btnVidClose = document.getElementById('btn-vid-close');
        const vidModal = document.getElementById('modal-video-studio');
        if (btnVidStart) btnVidStart.addEventListener('click', startStudioVideoRecording);
        if (btnVidDl) {
            btnVidDl.addEventListener('click', () => {
                if (!lastRecordedBlob) return;
                core.safeDownloadBlob(lastRecordedBlob, btnVidDl.dataset.filename || 'quantum-hud-studio.webm');
                core.playSound('confirm');
            });
        }
        if (btnVidClose && vidModal) btnVidClose.addEventListener('click', () => { vidModal.style.display = 'none'; });
        if (vidModal) vidModal.addEventListener('click', (e) => { if (e.target === vidModal) vidModal.style.display = 'none'; });
    }

    const prevReady = window.__QuantumHUDHooks.onReady;
    window.__QuantumHUDHooks.onReady = function () {
        if (typeof prevReady === 'function') prevReady();
        bindProExportersUI();
    };

    window.__QuantumExportersV2 = {
        openObsFrameworkModal,
        openVideoStudio,
        exportTransparentPNG
    };
})();
