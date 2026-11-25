/**
 * HyperStudio 3D/4D v2.0 — Real Web Audio FFT Engine, True 9:16/16:9 Video Studio (with Mixed Audio)
 * & 4D Hyperspace Morphing Lab 2.0 (Smooth Polytope Interpolation, W-Slice Plane & 4D Depth Color)
 * Implements Ideas #6, #7, #8
 */
(function () {
    'use strict';

    function getCore() { return window.__HyperStudioCore; }

    // ══════════════════════════════════════════════════════════════════════
    // 🎵 IDEA #6: REAL WEB AUDIO FFT AUDIO-REACTIVE ENGINE (Radio / Mic / MP3)
    // ══════════════════════════════════════════════════════════════════════
    let fftData = null;
    let audioSourceMode = 'radio'; // 'radio' | 'mic' | 'file'
    let micStream = null;
    let micSourceNode = null;
    let fileAudioEl = null;
    let fileSourceNode = null;
    let customAnalyser = null;
    let demoOscTimer = null;

    function getActiveAnalyser() {
        const c = getCore();
        if (!c) return null;
        return customAnalyser || c.getMasterAnalyser();
    }

    function createAudioFFTDock() {
        if (document.getElementById('hyper-audio-fft-dock')) return;
        const stage = document.getElementById('canvas-container');
        if (!stage) return;

        const dock = document.createElement('div');
        dock.id = 'hyper-audio-fft-dock';
        dock.className = 'hyper-audio-fft-dock hidden';
        dock.innerHTML = `
            <div class="fft-hdr">
                <span><i class="fa-solid fa-wave-square"></i> Real FFT Audio Engine</span>
                <button type="button" id="btn-close-fft-dock" class="btn-icon-sm"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="fft-sources">
                <button type="button" class="fft-src-btn active" data-src="radio">🎹 Synth</button>
                <button type="button" class="fft-src-btn" data-src="mic">🎤 Mic</button>
                <button type="button" class="fft-src-btn" data-src="file">🎵 MP3</button>
                <input type="file" id="fft-audio-file-input" accept="audio/*" style="display:none;">
            </div>
            <canvas id="fft-spectrum-canvas" width="210" height="44"></canvas>
            <div class="fft-bands">
                <span>BASS <b id="fft-val-bass">0%</b></span>
                <span>MID <b id="fft-val-mid">0%</b></span>
                <span>HIGH <b id="fft-val-high">0%</b></span>
            </div>
        `;
        stage.appendChild(dock);

        dock.querySelector('#btn-close-fft-dock').addEventListener('click', () => {
            dock.classList.add('hidden');
            const c = getCore();
            if (c) c.setAudioReactive(false);
            document.getElementById('btn-audio-reactive')?.classList.remove('active');
            stopDemoPulse();
        });

        const fileInput = dock.querySelector('#fft-audio-file-input');
        dock.querySelectorAll('.fft-src-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const src = btn.dataset.src;
                dock.querySelectorAll('.fft-src-btn').forEach(b => b.classList.toggle('active', b === btn));
                if (src === 'mic') enableMicInput();
                else if (src === 'file') fileInput.click();
                else enableSynthPulseInput();
            });
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            enableMP3FileInput(file);
            e.target.value = '';
        });
    }

    function stopDemoPulse() {
        if (demoOscTimer) { clearInterval(demoOscTimer); demoOscTimer = null; }
    }

    function enableSynthPulseInput() {
        audioSourceMode = 'radio';
        customAnalyser = null;
        stopDemoPulse();
        const c = getCore();
        if (!c) return;
        const ctx = c.getAudioContext();
        const master = c.getMasterAudioGain();
        if (!ctx || !master) return;

        // Play subtle rhythmic synth bass pulse when outside Flight Radio so FFT immediately dances!
        const notes = [110, 130.81, 146.83, 164.81, 98, 130.81, 164.81, 196];
        let step = 0;
        const triggerBeat = () => {
            if (!c.isAudioReactive() || audioSourceMode !== 'radio') { stopDemoPulse(); return; }
            if (c.isPilotActive()) return; // Flight radio is already feeding masterAnalyser!
            try {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = step % 4 === 0 ? 'sawtooth' : 'triangle';
                osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);
                g.gain.setValueAtTime(0.001, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);
                osc.connect(g);
                g.connect(master);
                osc.start();
                osc.stop(ctx.currentTime + 0.36);
                step++;
            } catch (e) {}
        };
        triggerBeat();
        demoOscTimer = setInterval(triggerBeat, 420);
    }

    async function enableMicInput() {
        stopDemoPulse();
        const c = getCore();
        if (!c) return;
        const ctx = c.getAudioContext();
        if (!ctx || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Live Microphone requires HTTPS or localhost permission.');
            return;
        }
        try {
            if (micStream) micStream.getTracks().forEach(t => t.stop());
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micSourceNode = ctx.createMediaStreamSource(micStream);
            customAnalyser = ctx.createAnalyser();
            customAnalyser.fftSize = 256;
            customAnalyser.smoothingTimeConstant = 0.78;
            micSourceNode.connect(customAnalyser);
            audioSourceMode = 'mic';
        } catch (err) {
            console.warn('[HyperFFT] Mic access denied:', err);
            enableSynthPulseInput();
        }
    }

    function enableMP3FileInput(file) {
        stopDemoPulse();
        const c = getCore();
        if (!c) return;
        const ctx = c.getAudioContext();
        const master = c.getMasterAudioGain();
        if (!ctx || !master) return;

        if (!fileAudioEl) {
            fileAudioEl = new Audio();
            fileAudioEl.crossOrigin = 'anonymous';
            fileAudioEl.loop = true;
            fileSourceNode = ctx.createMediaElementSource(fileAudioEl);
            fileSourceNode.connect(master);
        }
        if (fileAudioEl._objUrl) { try { URL.revokeObjectURL(fileAudioEl._objUrl); } catch (e) {} }
        fileAudioEl._objUrl = URL.createObjectURL(file);
        fileAudioEl.src = fileAudioEl._objUrl;
        fileAudioEl.play().catch(() => {});
        customAnalyser = null; // Routed cleanly through masterAnalyser + Video Studio audio bus!
        audioSourceMode = 'file';
    }

    function onAudioReactiveTick(time, dtScale) {
        const c = getCore();
        if (!c) return;
        const analyser = getActiveAnalyser();
        let bass = 0, mid = 0, high = 0;

        if (analyser) {
            if (!fftData || fftData.length !== analyser.frequencyBinCount) {
                fftData = new Uint8Array(analyser.frequencyBinCount);
            }
            analyser.getByteFrequencyData(fftData);
            const n = fftData.length;
            const bassEnd = Math.max(4, Math.floor(n * 0.14));
            const midEnd = Math.max(12, Math.floor(n * 0.50));

            let bSum = 0, mSum = 0, hSum = 0;
            for (let i = 0; i < bassEnd; i++) bSum += fftData[i];
            for (let i = bassEnd; i < midEnd; i++) mSum += fftData[i];
            for (let i = midEnd; i < n; i++) hSum += fftData[i];
            bass = bSum / (bassEnd * 255);
            mid = mSum / ((midEnd - bassEnd) * 255);
            high = hSum / ((n - midEnd) * 255);

            // Render live 16-bar neon FFT spectrum
            const specCanvas = document.getElementById('fft-spectrum-canvas');
            if (specCanvas) {
                const sctx = specCanvas.getContext('2d');
                sctx.clearRect(0, 0, specCanvas.width, specCanvas.height);
                const bars = 20;
                const bw = specCanvas.width / bars;
                for (let b = 0; b < bars; b++) {
                    const val = fftData[Math.floor((b / bars) * (n * 0.7))] / 255;
                    const bh = Math.max(3, val * (specCanvas.height - 4));
                    sctx.fillStyle = b < 6 ? '#00f2fe' : (b < 13 ? '#7928ca' : '#ff007f');
                    sctx.fillRect(b * bw + 1.5, specCanvas.height - bh, bw - 3, bh);
                }
            }
            const bEl = document.getElementById('fft-val-bass');
            const mEl = document.getElementById('fft-val-mid');
            const hEl = document.getElementById('fft-val-high');
            if (bEl) bEl.textContent = Math.round(bass * 100) + '%';
            if (mEl) mEl.textContent = Math.round(mid * 100) + '%';
            if (hEl) hEl.textContent = Math.round(high * 100) + '%';
        }

        // Non-destructively modulate custom objects (preserves base user scale!)
        const pulseScale = 1.0 + bass * 0.28 + mid * 0.08;
        c.getCustomObjects().forEach(obj => {
            if (!obj || obj.userData?.isFlightFX) return;
            if (obj.isMesh && obj.geometry && obj.geometry.type === 'PlaneGeometry') return;
            if (!obj.userData.baseScaleVec) {
                obj.userData.baseScaleVec = obj.scale.clone();
            }
            const bs = obj.userData.baseScaleVec;
            obj.scale.set(bs.x * pulseScale, bs.y * pulseScale, bs.z * pulseScale);
            if (high > 0.08) obj.rotation.y += high * 0.03 * dtScale;
        });

        // Modulate 4D Polytope rotation subtly with treble
        const p4 = c.getPolytope4DParams();
        if (p4 && bass > 0.05) {
            p4.angleXW += bass * 0.025 * dtScale;
            p4.angleYW += mid * 0.02 * dtScale;
        }
    }

    // ══════════════════════════════════════════════════════════════════════
    // 🎥 IDEA #7: TRUE 9:16 VERTICAL / 16:9 LANDSCAPE VIDEO STUDIO + AUDIO
    // ══════════════════════════════════════════════════════════════════════
    let recState = {
        active: false,
        format: '9:16', // '9:16' | '16:9'
        duration: 10,
        titleOverlay: 'HyperStudio 3D/4D',
        recorder: null,
        chunks: [],
        timer: null,
        rafId: null,
        offCanvas: null,
        lastBlobUrl: null
    };

    function getVideoDimensions(fmt) {
        return fmt === '16:9' ? { w: 1280, h: 720, label: 'YouTube 16:9 HD' } : { w: 720, h: 1280, label: 'TikTok 9:16 HD' };
    }

    function startCompositeRecording() {
        if (recState.active) return;
        const c = getCore();
        const srcCanvas = document.getElementById('webgl-canvas');
        if (!srcCanvas) return;

        // Read selected format from modal selector if present
        const fmtSel = document.getElementById('video-format-select');
        if (fmtSel) recState.format = fmtSel.value || '9:16';
        const durSel = document.getElementById('video-duration-select');
        if (durSel) recState.duration = parseInt(durSel.value || '10', 10);
        const titleInp = document.getElementById('video-title-overlay');
        if (titleInp) recState.titleOverlay = titleInp.value.trim();

        const dims = getVideoDimensions(recState.format);
        if (!recState.offCanvas) recState.offCanvas = document.createElement('canvas');
        const off = recState.offCanvas;
        off.width = dims.w;
        off.height = dims.h;
        const octx = off.getContext('2d');

        // Draw compositor loop (genuine center-crop 9:16 or 16:9 + neon title & watermark!)
        const drawFrame = () => {
            if (!recState.active) return;
            octx.fillStyle = '#060812';
            octx.fillRect(0, 0, off.width, off.height);

            const sw = srcCanvas.width || 1;
            const sh = srcCanvas.height || 1;
            const targetRatio = off.width / off.height;
            const srcRatio = sw / sh;
            let sx = 0, sy = 0, sWidth = sw, sHeight = sh;
            if (srcRatio > targetRatio) {
                sWidth = sh * targetRatio;
                sx = (sw - sWidth) / 2;
            } else {
                sHeight = sw / targetRatio;
                sy = (sh - sHeight) / 2;
            }
            try { octx.drawImage(srcCanvas, sx, sy, sWidth, sHeight, 0, 0, off.width, off.height); } catch (e) {}

            // Subtle neon title & watermark burn-in
            if (recState.titleOverlay) {
                octx.save();
                octx.font = '700 28px Outfit, sans-serif';
                octx.textAlign = 'center';
                octx.fillStyle = '#00f2fe';
                octx.shadowColor = '#00f2fe';
                octx.shadowBlur = 14;
                octx.fillText(recState.titleOverlay, off.width / 2, 54);
                octx.restore();
            }
            octx.save();
            octx.font = '700 18px Outfit, sans-serif';
            octx.textAlign = 'right';
            octx.fillStyle = 'rgba(0, 255, 204, 0.9)';
            octx.fillText('⚡ ia-codestudio.com', off.width - 24, off.height - 26);
            octx.restore();

            recState.rafId = requestAnimationFrame(drawFrame);
        };

        let videoStream;
        try {
            videoStream = off.captureStream ? off.captureStream(30) : off.mozCaptureStream(30);
        } catch (e) {
            alert('Canvas video recording is not supported in this browser.');
            return;
        }

        // Mix live Web Audio (Synth Radio + SFX + MP3) into video stream!
        const combinedTracks = [...videoStream.getVideoTracks()];
        try {
            const audioDest = c && c.getMasterMediaDest ? c.getMasterMediaDest() : null;
            if (audioDest && audioDest.stream) {
                audioDest.stream.getAudioTracks().forEach(t => combinedTracks.push(t));
            }
        } catch (e) {}
        const finalStream = new MediaStream(combinedTracks);

        const mimes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm;codecs=vp9', 'video/webm'];
        const chosenMime = mimes.find(m => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) || '';

        recState.chunks = [];
        try {
            recState.recorder = chosenMime ? new MediaRecorder(finalStream, { mimeType: chosenMime }) : new MediaRecorder(finalStream);
        } catch (e) {
            recState.recorder = new MediaRecorder(videoStream);
        }

        recState.recorder.ondataavailable = (ev) => {
            if (ev.data && ev.data.size > 0) recState.chunks.push(ev.data);
        };

        recState.recorder.onstop = () => {
            recState.active = false;
            cancelAnimationFrame(recState.rafId);
            clearInterval(recState.timer);

            const overlay = document.getElementById('hud-recording-overlay');
            if (overlay) overlay.style.display = 'none';
            const btn1 = document.getElementById('btn-record-video');
            const btn2 = document.getElementById('btn-hud-record');
            if (btn1) btn1.innerHTML = '<i class="fa-solid fa-video"></i> <span>TikTok / 3D Clip 🎥</span>';
            if (btn2) btn2.innerHTML = '<i class="fa-solid fa-video"></i> <span>Rec Clip 🎥</span>';

            if (recState.lastBlobUrl) { try { URL.revokeObjectURL(recState.lastBlobUrl); } catch (e) {} }
            const blob = new Blob(recState.chunks, { type: chosenMime || 'video/webm' });
            const url = URL.createObjectURL(blob);
            recState.lastBlobUrl = url;

            const player = document.getElementById('recorded-video-player');
            const dl = document.getElementById('btn-download-video-file');
            const modal = document.getElementById('modal-video-recorder');
            if (player) {
                player.src = url;
                player.muted = false;
                player.parentElement.style.aspectRatio = recState.format === '16:9' ? '16/9' : '9/16';
                player.play().catch(() => {});
            }
            if (dl) {
                dl.href = url;
                dl.download = `hyperstudio-${recState.format.replace(':', 'x')}-${Date.now()}.webm`;
            }
            if (modal) modal.classList.add('active');
        };

        recState.active = true;
        drawFrame();
        recState.recorder.start(150);

        const overlay = document.getElementById('hud-recording-overlay');
        const statusEl = document.getElementById('recording-status-text');
        const btn1 = document.getElementById('btn-record-video');
        const btn2 = document.getElementById('btn-hud-record');
        if (overlay) overlay.style.display = 'flex';
        if (statusEl) statusEl.textContent = `REC 00:00 / 00:${String(recState.duration).padStart(2, '0')} (${dims.label} + Audio)`;
        if (btn1) btn1.innerHTML = '<i class="fa-solid fa-stop"></i> <span>Stop REC ⏹️</span>';
        if (btn2) btn2.innerHTML = '<i class="fa-solid fa-stop"></i> <span>Stop REC ⏹️</span>';

        let elapsed = 0;
        recState.timer = setInterval(() => {
            elapsed++;
            if (statusEl) statusEl.textContent = `REC 00:${String(elapsed).padStart(2, '0')} / 00:${String(recState.duration).padStart(2, '0')} (${dims.label} + Audio)`;
            if (elapsed >= recState.duration) stopCompositeRecording();
        }, 1000);
    }

    function stopCompositeRecording() {
        clearInterval(recState.timer);
        if (recState.recorder && recState.recorder.state !== 'inactive') {
            recState.recorder.stop();
        }
        recState.active = false;
    }

    window.__HyperVideoStudioV2 = {
        toggle: () => { if (recState.active) stopCompositeRecording(); else startCompositeRecording(); },
        start: startCompositeRecording,
        stop: stopCompositeRecording
    };

    // ══════════════════════════════════════════════════════════════════════
    // 🌀 IDEA #8: 4D HYPERSPACE MORPHING LAB 2.0 (Smooth Morph + W-Slice + Depth Color)
    // ══════════════════════════════════════════════════════════════════════
    const MORPH_SHAPES = ['tesseract', '16cell', '24cell', 'clifford', '5cell'];
    let morphProgress = 0;
    let morphFromIdx = 0;
    let morphToIdx = 1;
    let wSliceValue = 0.0;       // -1.5 .. 1.5
    let wSliceWidth = 2.5;       // 2.5 = show all, smaller = razor-thin 4D cross-section
    let use4DDepthColor = true;
    const tmpColA = new THREE.Color(0x00f2fe);
    const tmpColB = new THREE.Color(0xff007f);
    const tmpColOut = new THREE.Color();

    function sampleShapeVert(poly, idx) {
        const verts = poly.vertices;
        return verts[idx % verts.length];
    }

    function on4DMorphTick(time, dtScale) {
        const c = getCore();
        if (!c) return;
        const p4 = c.getPolytope4DParams();
        p4.rotXW = 0.025 + Math.sin(time * 0.0005) * 0.022;
        p4.rotYW = 0.018 + Math.cos(time * 0.0007) * 0.022;
        p4.rotZW = Math.sin(time * 0.0004) * 0.018;
        p4.dist4D = 2.55 + Math.sin(time * 0.0004) * 0.55;

        morphProgress += 0.0045 * dtScale;
        if (morphProgress >= 1.0) {
            morphProgress = 0;
            morphFromIdx = morphToIdx;
            morphToIdx = (morphToIdx + 1) % MORPH_SHAPES.length;
        }
    }

    function onUpdatePolytope4D(dtScale) {
        const c = getCore();
        if (!c) return;
        const group = c.getPolytopeMeshGroup();
        if (!group || !group.children[0]) return;

        const p4 = c.getPolytope4DParams();
        const speedMul = c.getTimeSpeedMultiplier();
        p4.angleXW += p4.rotXW * speedMul * dtScale;
        p4.angleYW += p4.rotYW * speedMul * dtScale;
        p4.angleZW += p4.rotZW * speedMul * dtScale;

        const lib = c.getPolytopeLibrary();
        const curKey = c.getCurrentPolytypeKey();
        const basePoly = lib[curKey] || lib.tesseract;
        const isMorph = c.is4DMorphing();
        const fromPoly = isMorph ? (lib[MORPH_SHAPES[morphFromIdx]] || basePoly) : basePoly;
        const toPoly = isMorph ? (lib[MORPH_SHAPES[morphToIdx]] || basePoly) : basePoly;
        const smoothT = isMorph ? (0.5 - 0.5 * Math.cos(morphProgress * Math.PI)) : 0;

        // Project vertices + keep 4D W-coordinate for Depth Color & W-Slice!
        const projected3D = [];
        const rotatedW = [];
        for (let i = 0; i < basePoly.vertices.length; i++) {
            let v4 = basePoly.vertices[i];
            if (isMorph) {
                const a = sampleShapeVert(fromPoly, i);
                const b = sampleShapeVert(toPoly, i);
                v4 = [
                    a[0] + (b[0] - a[0]) * smoothT,
                    a[1] + (b[1] - a[1]) * smoothT,
                    a[2] + (b[2] - a[2]) * smoothT,
                    a[3] + (b[3] - a[3]) * smoothT
                ];
            }
            const rotPt = c.rotate4DPoint(v4, p4.angleXW, p4.angleYW, p4.angleZW);
            rotatedW.push(rotPt[3]);
            projected3D.push(c.project4Dto3D(rotPt, p4.dist4D, p4.size));
        }

        const lineSegments = group.children[0];
        const geo = lineSegments.geometry;
        const positions = geo.attributes.position.array;

        // Enable per-vertex 4D W-depth coloring cleanly (allocated once!)
        if (use4DDepthColor) {
            if (!geo.attributes.color) {
                geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(positions.length), 3));
            }
            if (!lineSegments.material.vertexColors) {
                lineSegments.material.vertexColors = true;
                lineSegments.material.color.setHex(0xffffff);
                lineSegments.material.needsUpdate = true;
            }
        }
        const colors = geo.attributes.color ? geo.attributes.color.array : null;

        let posIdx = 0;
        for (let i = 0; i < basePoly.edges.length; i++) {
            const [idxA, idxB] = basePoly.edges[i];
            const pA = projected3D[idxA], pB = projected3D[idxB];
            const wA = rotatedW[idxA], wB = rotatedW[idxB];
            const avgW = (wA + wB) * 0.5;
            const visibleBySlice = Math.abs(avgW - wSliceValue) <= wSliceWidth;

            if (visibleBySlice) {
                positions[posIdx] = pA.x; positions[posIdx + 1] = pA.y; positions[posIdx + 2] = pA.z;
                positions[posIdx + 3] = pB.x; positions[posIdx + 4] = pB.y; positions[posIdx + 5] = pB.z;
            } else {
                // Collapse outside W-slice cleanly without reallocating buffers
                positions[posIdx] = positions[posIdx + 1] = positions[posIdx + 2] = 0;
                positions[posIdx + 3] = positions[posIdx + 4] = positions[posIdx + 5] = 0;
            }

            if (colors && use4DDepthColor) {
                const tA = Math.max(0, Math.min(1, (wA + 1.5) / 3.0));
                const tB = Math.max(0, Math.min(1, (wB + 1.5) / 3.0));
                tmpColOut.lerpColors(tmpColA, tmpColB, tA);
                colors[posIdx] = tmpColOut.r; colors[posIdx + 1] = tmpColOut.g; colors[posIdx + 2] = tmpColOut.b;
                tmpColOut.lerpColors(tmpColA, tmpColB, tB);
                colors[posIdx + 3] = tmpColOut.r; colors[posIdx + 4] = tmpColOut.g; colors[posIdx + 5] = tmpColOut.b;
            }
            posIdx += 6;
        }
        geo.attributes.position.needsUpdate = true;
        if (geo.attributes.color) geo.attributes.color.needsUpdate = true;

        const nodeGroup = group.children[1];
        if (nodeGroup) {
            for (let i = 0; i < basePoly.vertices.length; i++) {
                const nd = nodeGroup.children[i];
                if (!nd) continue;
                nd.position.copy(projected3D[i]);
                nd.visible = Math.abs(rotatedW[i] - wSliceValue) <= wSliceWidth;
            }
        }
    }

    function wireUI() {
        createAudioFFTDock();

        // Hook Audio Beats button to show/hide Real FFT Dock & start synth pulse
        const btnAudio = document.getElementById('btn-audio-reactive');
        if (btnAudio && !btnAudio.dataset.fftWired) {
            btnAudio.dataset.fftWired = '1';
            btnAudio.addEventListener('click', () => {
                const c = getCore();
                const on = c && c.isAudioReactive();
                const dock = document.getElementById('hyper-audio-fft-dock');
                if (dock) dock.classList.toggle('hidden', !on);
                if (on) {
                    if (audioSourceMode === 'radio') enableSynthPulseInput();
                } else {
                    stopDemoPulse();
                    // Restore base user scales cleanly
                    c && c.getCustomObjects().forEach(o => {
                        if (o && o.userData && o.userData.baseScaleVec) o.scale.copy(o.userData.baseScaleVec);
                    });
                }
            });
        }

        // Wire W-Axis Cross-Section Slice controls in 4D Panel
        const wSliceSlider = document.getElementById('slider-w-slice');
        const wSliceVal = document.getElementById('val-w-slice');
        if (wSliceSlider) {
            wSliceSlider.addEventListener('input', (e) => {
                wSliceValue = parseFloat(e.target.value);
                wSliceWidth = Math.abs(wSliceValue) < 0.05 ? 2.5 : 0.95;
                if (wSliceVal) wSliceVal.textContent = Math.abs(wSliceValue) < 0.05 ? 'FULL' : wSliceValue.toFixed(2);
            });
        }
        const chkDepth = document.getElementById('chk-4d-depth-color');
        if (chkDepth) {
            chkDepth.addEventListener('change', (e) => { use4DDepthColor = !!e.target.checked; });
        }

        // Wire Re-Record button inside Video Modal
        const btnRerecord = document.getElementById('btn-video-rerecord');
        if (btnRerecord) {
            btnRerecord.addEventListener('click', () => {
                document.getElementById('modal-video-recorder')?.classList.remove('active');
                startCompositeRecording();
            });
        }
    }

    window.__HyperStudioHooks = window.__HyperStudioHooks || {};
    window.__HyperStudioHooks.onAudioReactiveTick = onAudioReactiveTick;
    window.__HyperStudioHooks.on4DMorphTick = on4DMorphTick;
    window.__HyperStudioHooks.onUpdatePolytope4D = onUpdatePolytope4D;

    window.addEventListener('DOMContentLoaded', wireUI);
})();
