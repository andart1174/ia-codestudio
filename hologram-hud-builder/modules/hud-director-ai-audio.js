/* ============================================================================
   QUANTUM 3D HUD BUILDER v2.0 — MODULE 2: AI ARCHITECT, TELEMETRY, AUDIO & CAM
   Ideas #2 (Jarvis AI Prompt Architect), #5 (Oscilloscope + Custom Branding +
   RED ALERT), #6 (Built-in Synth + MP3 Upload), #8 (Camera Director + Hotkeys)
   ============================================================================ */
(function () {
    'use strict';

    window.__QuantumHUDHooks = window.__QuantumHUDHooks || {};

    // Camera Director State
    const CAM_PRESETS = {
        front: { pos: [0, 2.0, 12.0],  target: [0, 0, 0] },
        iso:   { pos: [8.8, 6.2, 8.8], target: [0, 0, 0] },
        top:   { pos: [0, 14.5, 0.4],  target: [0, 0, 0] },
        macro: { pos: [0, 0.9, 5.2],   target: [0, 0, 0] }
    };
    let camLerp = null; // { startPos, endPos, startTgt, endTgt, startTime, duration }
    let autoTourActive = false;
    let tourAngle = 0;

    // Built-in Sci-Fi Synth + MP3 Audio Reactor State
    let synthActive = false;
    let synthInterval = null;
    let synthDroneOsc = null;
    let synthDroneGain = null;
    let mp3AudioEl = null;
    let mp3SourceNode = null;
    let mp3Playing = false;
    let redAlertAlarmTimer = null;
    let prevThemeBeforeAlert = null;
    let lastTelemetryDomUpdate = 0;

    // ------------------------------------------------------------------------
    // 1. MULTI-SOURCE AUDIO REACTOR (Idea #6: Synth Pulse + MP3/WAV Upload)
    // ------------------------------------------------------------------------
    function isAudioSourceActive() {
        return synthActive || mp3Playing;
    }

    function stopSynth() {
        synthActive = false;
        if (synthInterval) { clearInterval(synthInterval); synthInterval = null; }
        if (synthDroneOsc) { try { synthDroneOsc.stop(); synthDroneOsc.disconnect(); } catch (e) {} synthDroneOsc = null; }
        if (synthDroneGain) { try { synthDroneGain.disconnect(); } catch (e) {} synthDroneGain = null; }
        const btn = document.getElementById('btn-audio-synth');
        if (btn) btn.classList.remove('active');
    }

    function toggleSynth() {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        if (synthActive) {
            stopSynth();
            core.logTerminal('Sci-Fi Synth Pulse stopped.');
            return;
        }
        const ctx = core.getAudioContext();
        const bus = core.getMasterAudioGain();
        if (!ctx || !bus) return;

        // Warm low sci-fi drone
        synthDroneOsc = ctx.createOscillator();
        synthDroneGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240, ctx.currentTime);
        synthDroneOsc.type = 'sawtooth';
        synthDroneOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1
        synthDroneGain.gain.setValueAtTime(0.08, ctx.currentTime);
        synthDroneOsc.connect(filter);
        filter.connect(synthDroneGain);
        synthDroneGain.connect(bus);
        synthDroneOsc.start();

        // Cybernetic arpeggio pulse synced to analyser
        const scale = [110, 130.81, 164.81, 196.0, 220.0, 261.63, 329.63, 196.0];
        let stepIdx = 0;
        synthInterval = setInterval(() => {
            if (!synthActive || !ctx || ctx.state !== 'running') return;
            const now = ctx.currentTime;
            const freq = scale[stepIdx % scale.length];
            stepIdx++;

            // Arpeggio note
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = (stepIdx % 4 === 0) ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq * (stepIdx % 8 === 0 ? 2 : 1), now);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.24);
            osc.connect(gain);
            gain.connect(bus);
            osc.start(now);
            osc.stop(now + 0.25);

            // Kick thump every 2 steps for juicy 3D equalizer bass bounce
            if (stepIdx % 2 === 1) {
                const kick = ctx.createOscillator();
                const kGain = ctx.createGain();
                kick.type = 'sine';
                kick.frequency.setValueAtTime(135, now);
                kick.frequency.exponentialRampToValueAtTime(38, now + 0.14);
                kGain.gain.setValueAtTime(0.28, now);
                kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                kick.connect(kGain);
                kGain.connect(bus);
                kick.start(now);
                kick.stop(now + 0.19);
            }
        }, 230);

        synthActive = true;
        const btn = document.getElementById('btn-audio-synth');
        if (btn) btn.classList.add('active');
        core.logTerminal('Sci-Fi Synth Pulse active -> driving 3D Equalizer & Core!');
    }

    let currentAudioObjectUrl = null;
    function loadAudioFile(file) {
        const core = window.__QuantumHUDCore;
        if (!core || !file) return;
        const ctx = core.getAudioContext();
        const bus = core.getMasterAudioGain();
        if (!ctx || !bus) return;

        stopSynth();
        if (currentAudioObjectUrl) {
            try { URL.revokeObjectURL(currentAudioObjectUrl); } catch (e) {}
            currentAudioObjectUrl = null;
        }
        if (!mp3AudioEl) {
            mp3AudioEl = document.createElement('audio');
            mp3AudioEl.loop = true;
            mp3AudioEl.crossOrigin = 'anonymous';
            mp3SourceNode = ctx.createMediaElementSource(mp3AudioEl);
            mp3SourceNode.connect(bus);
            mp3AudioEl.addEventListener('play', () => { mp3Playing = true; updateAudioStatusUI(); });
            mp3AudioEl.addEventListener('pause', () => { mp3Playing = false; updateAudioStatusUI(); });
        }
        currentAudioObjectUrl = URL.createObjectURL(file);
        mp3AudioEl.src = currentAudioObjectUrl;
        mp3AudioEl.play().then(() => {
            mp3Playing = true;
            const status = document.getElementById('audio-track-status');
            if (status) status.textContent = '♫ ' + file.name.slice(0, 22);
            updateAudioStatusUI();
            core.logTerminal(`Audio track loaded: ${file.name}`);
        }).catch(err => {
            console.warn(err);
            core.logTerminal('Audio playback blocked — click Play to start.');
        });
    }

    function toggleMp3Playback() {
        if (!mp3AudioEl || !mp3AudioEl.src) {
            const inp = document.getElementById('audio-file-input');
            if (inp) inp.click();
            return;
        }
        if (mp3AudioEl.paused) mp3AudioEl.play().catch(() => {});
        else mp3AudioEl.pause();
    }

    function updateAudioStatusUI() {
        const btn = document.getElementById('btn-audio-upload');
        if (btn) btn.classList.toggle('active', mp3Playing);
    }

    function stopAllExtraAudio() {
        stopSynth();
        if (mp3AudioEl) { try { mp3AudioEl.pause(); } catch (e) {} mp3Playing = false; }
        updateAudioStatusUI();
    }

    // ------------------------------------------------------------------------
    // 2. RED ALERT TACTICAL MODE + LIVE TELEMETRY OSCILLOSCOPE + BRANDING (Idea #5)
    // ------------------------------------------------------------------------
    function toggleRedAlert(forceState) {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const next = (typeof forceState === 'boolean') ? forceState : !core.isRedAlert();

        if (next) {
            prevThemeBeforeAlert = {
                status: document.getElementById('system-status-text')?.textContent || 'PROJECTION STABLE',
                glitch: document.getElementById('glitch-slider')?.value || '20'
            };
            const gSl = document.getElementById('glitch-slider');
            const gVl = document.getElementById('glitch-value');
            if (gSl) gSl.value = 65;
            if (gVl) gVl.innerText = '65%';
            const statusEl = document.getElementById('system-status-text');
            if (statusEl) statusEl.textContent = 'CRITICAL BREACH // RED ALERT';
            core.setRedAlert(true);
            core.playSound('alarm');
            core.speakAI("Alerte Rouge Tactique ! Brèche critique détectée.", "Red Alert Activated! Critical containment breach detected.");
            core.logTerminal('[ALERT] RED ALERT TACTICAL OVERRIDE ENGAGED!');
            if (redAlertAlarmTimer) clearInterval(redAlertAlarmTimer);
            redAlertAlarmTimer = setInterval(() => {
                if (core.isRedAlert()) core.playSound('alarm');
            }, 2200);
        } else {
            if (redAlertAlarmTimer) { clearInterval(redAlertAlarmTimer); redAlertAlarmTimer = null; }
            if (prevThemeBeforeAlert) {
                const gSl = document.getElementById('glitch-slider');
                const gVl = document.getElementById('glitch-value');
                if (gSl) gSl.value = prevThemeBeforeAlert.glitch;
                if (gVl) gVl.innerText = prevThemeBeforeAlert.glitch + '%';
                const statusEl = document.getElementById('system-status-text');
                if (statusEl) statusEl.textContent = prevThemeBeforeAlert.status;
            }
            core.setRedAlert(false);
            core.playSound('confirm');
            core.logTerminal('[SYS] Red Alert disengaged. Systems nominal.');
        }

        ['btn-red-alert', 'btn-red-alert-header'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', next);
        });
    }

    function drawTelemetryOscilloscope(timeClock, volumeMultiplier, freqData) {
        const canvas = document.getElementById('telemetry-oscilloscope');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const core = window.__QuantumHUDCore;
        const priHex = core ? core.getPrimaryColorInfo().hex : '#00f3ff';
        const secHex = core ? core.getSecondaryColorInfo().hex : '#bd00ff';
        const isAlert = core && core.isRedAlert();
        const w = canvas.width, h = canvas.height;

        ctx.clearRect(0, 0, w, h);
        // Subtle background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
        ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
        ctx.stroke();

        // Waveform curve
        ctx.strokeStyle = isAlert ? '#ff2244' : priHex;
        ctx.shadowColor = isAlert ? '#ff2244' : priHex;
        ctx.shadowBlur = 6;
        ctx.lineWidth = 1.6;
        ctx.beginPath();

        const audioOn = isAudioSourceActive() || (document.getElementById('btn-mic-toggle')?.classList.contains('active'));
        const samples = 54;
        for (let i = 0; i < samples; i++) {
            const x = (i / (samples - 1)) * w;
            let amp = 0;
            if (audioOn && freqData && freqData.length > 0) {
                const bin = Math.floor((i / samples) * (freqData.length * 0.55));
                const v = (freqData[bin] || 0) / 255;
                amp = Math.sin(i * 0.65 + timeClock * 10) * (v * (h * 0.44));
            } else {
                amp = (Math.sin(i * 0.32 + timeClock * 6.5) * 0.55 + Math.cos(i * 0.72 - timeClock * 4.0) * 0.3) * (h * (isAlert ? 0.42 : 0.28));
            }
            const y = h / 2 + amp;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Secondary harmonic dashed line
        ctx.strokeStyle = secHex;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < samples; i++) {
            const x = (i / (samples - 1)) * w;
            const y = h / 2 + Math.cos(i * 0.25 - timeClock * 3.8) * (h * 0.22);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    function updateDynamicTelemetryNumbers(now, timeClock, volumeMultiplier) {
        if (now - lastTelemetryDomUpdate < 240) return;
        lastTelemetryDomUpdate = now;
        const core = window.__QuantumHUDCore;
        const isAlert = core && core.isRedAlert();
        const tempEl = document.getElementById('telemetry-temp');
        const pwrEl = document.getElementById('telemetry-power');
        const freqEl = document.getElementById('telemetry-freq');
        if (tempEl) {
            const k = (isAlert ? 4820 : 2410) + Math.sin(timeClock * 3.1) * 45 + (volumeMultiplier - 1) * 320;
            tempEl.textContent = Math.round(k) + ' °K';
        }
        if (pwrEl) {
            const gw = (isAlert ? 9.8 : 4.2) + Math.cos(timeClock * 2.4) * 0.35 + (volumeMultiplier - 1) * 2.1;
            pwrEl.textContent = gw.toFixed(2) + ' GW';
        }
        if (freqEl) {
            const hz = (isAlert ? 880 : 432) + Math.sin(timeClock * 4.5) * 14 + (volumeMultiplier - 1) * 110;
            freqEl.textContent = hz.toFixed(1) + ' Hz';
        }
    }

    // ------------------------------------------------------------------------
    // 3. JARVIS AI HUD PROMPT ARCHITECT (Idea #2: Text + Voice NLP)
    // ------------------------------------------------------------------------
    function runAIPrompt(rawPrompt) {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const text = (rawPrompt || '').trim();
        if (!text) return;
        const q = text.toLowerCase();
        const actions = [];

        // 1. Detect Preset
        const presetRules = [
            { key: 'arcreactor',  re: /\b(arc\s*reactor|iron\s*man|stark|jarvis)\b/ },
            { key: 'dyson',       re: /\b(dyson|galaxy|galaxie|star\s*map|stellaire|solar|planet|plan[eè]te)\b/ },
            { key: 'defense',     re: /\b(defense|d[eé]fense|shield|bouclier|satellite|orbital|forcefield)\b/ },
            { key: 'tesseract4d', re: /\b(tesseract|4d|hypercube|quantique\s*4d|dimension)\b/ },
            { key: 'dna',         re: /\b(dna|adn|helix|h[eé]lice|bio|genetic)\b/ },
            { key: 'brain',       re: /\b(brain|cerveau|cyberpunk)\b/ },
            { key: 'neuralpulse', re: /\b(pulse|puls[eé]|synapse)\b/ },
            { key: 'neural',      re: /\b(neural|r[eé]seau|network|ai|ia)\b/ },
            { key: 'radar',       re: /\b(radar|tactical|tactique|spacecraft|vaisseau)\b/ },
            { key: 'mech',        re: /\b(mech|mecha|x-?ray|robot|vehicle|v[eé]hicule)\b/ },
            { key: 'vitals',      re: /\b(vital|medical|m[eé]dical|heart|coeur|sant[eé])\b/ },
            { key: 'navigation',  re: /\b(nav|navigation|deep\s*space|boussole)\b/ },
            { key: 'reactor',     re: /\b(reactor|r[eé]acteur|core|quantum)\b/ }
        ];
        for (const r of presetRules) {
            if (r.re.test(q)) {
                const sel = document.getElementById('preset-select');
                if (sel) sel.value = r.key;
                core.applyPreset(r.key);
                actions.push('Preset: ' + r.key.toUpperCase());
                break;
            }
        }

        // 2. Red Alert check
        if (/\b(red\s*alert|alerte\s*rouge|emergency|urgence|breach|danger|attack)\b/.test(q)) {
            toggleRedAlert(true);
            actions.push('RED ALERT');
        } else if (/\b(safe|normal|calm|reset\s*alert|stand\s*down)\b/.test(q)) {
            if (core.isRedAlert()) toggleRedAlert(false);
        }

        // 3. Cinema Theme / Colors
        if (window.__QuantumShadersV2) {
            if (/\b(synthwave|outrun|vapor|neon\s*pink|rose)\b/.test(q)) { window.__QuantumShadersV2.applyTheme('synthwave'); actions.push('Theme: Synthwave'); }
            else if (/\b(matrix|hacker|bio\s*green)\b/.test(q)) { window.__QuantumShadersV2.applyTheme('matrix'); actions.push('Theme: Matrix'); }
            else if (/\b(blade\s*runner|amber|ambre|desert)\b/.test(q)) { window.__QuantumShadersV2.applyTheme('bladerunner'); actions.push('Theme: Blade Runner'); }
            else if (/\b(sith|crimson|blood|rouge|red)\b/.test(q) && !core.isRedAlert()) { window.__QuantumShadersV2.applyTheme('sith'); actions.push('Theme: Crimson Sith'); }
            else if (/\b(ghost|white|blanc|silver|argent)\b/.test(q)) { window.__QuantumShadersV2.applyTheme('ghost'); actions.push('Theme: Ghost'); }
            else if (/\b(gold|or|golden|dor[eé]|yellow|jaune)\b/.test(q)) { core.setCustomHexColors('#ffd700', '#00f3ff'); actions.push('Color: Gold/Cyan'); }
            else if (/\b(purple|violet|magenta)\b/.test(q)) { core.setCustomHexColors('#bd00ff', '#00f3ff'); actions.push('Color: Purple/Cyan'); }
            else if (/\b(emerald|green|vert)\b/.test(q)) { core.setCustomHexColors('#00ff66', '#00f3ff'); actions.push('Color: Emerald'); }
            else if (/\b(orange)\b/.test(q)) { core.setCustomHexColors('#ff5e00', '#ffd700'); actions.push('Color: Orange'); }
            else if (/\b(cyan|blue|bleu|ice|glace)\b/.test(q)) { core.setCustomHexColors('#00f3ff', '#bd00ff'); actions.push('Color: Cyan'); }
        }

        // 4. Shaders & Effects
        if (/\b(fresnel|shader|hologram\s*fx|glow\s*shader|glass)\b/.test(q)) {
            core.setMaterialMode('fresnel');
            const bf = document.getElementById('btn-toggle-fresnel');
            if (bf) bf.classList.add('active');
            actions.push('Fresnel GLSL');
        }
        if (/\b(glitch|corrupt|static|distort|bug)\b/.test(q)) {
            const gSl = document.getElementById('glitch-slider');
            const gVl = document.getElementById('glitch-value');
            if (gSl) gSl.value = 78;
            if (gVl) gVl.innerText = '78%';
            core.updateCodeOutput();
            actions.push('Glitch 78%');
        }
        if (/\b(explode|exploded|[eé]clat[eé]|disassemble|open)\b/.test(q)) {
            core.setExplodedFactor(1.8);
            actions.push('Exploded 1.8x');
        }
        if (/\b(fast|turbo|overdrive|rapide|hyper)\b/.test(q)) {
            core.setRotationSpeed(2.4);
            actions.push('Speed 2.4x');
        } else if (/\b(slow|calm|zen|lent)\b/.test(q)) {
            core.setRotationSpeed(0.4);
            actions.push('Speed 0.4x');
        }
        if (/\b(globe|earth|world|terre|monde)\b/.test(q)) {
            const gl = document.getElementById('layer-globe');
            if (gl && !gl.checked) { gl.checked = true; gl.dispatchEvent(new Event('change')); }
            actions.push('3D Globe ON');
        }
        if (/\b(synth|music|musique|beat|audio|pulse\s*audio)\b/.test(q)) {
            if (!synthActive) toggleSynth();
            actions.push('Synth Audio ON');
        }
        if (/\b(tour|cinema|cinematic|orbit|camera)\b/.test(q)) {
            setCameraPreset('tour');
            actions.push('Cinematic Tour');
        }

        if (actions.length === 0) {
            core.setCustomHexColors('#00f3ff', '#ff2a85');
            core.setMaterialMode('fresnel');
            actions.push('Quantum AI Auto-Style');
        }

        core.playSound('confirm');
        const summary = actions.join(' • ');
        core.logTerminal(`[JARVIS AI] "${text}" -> ${summary}`);
        core.speakAI(`Configuration IA appliquée : ${summary}`, `AI HUD directive executed: ${summary}`);
    }

    function startVoicePrompt() {
        const core = window.__QuantumHUDCore;
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            if (core) core.logTerminal('SpeechRecognition not supported in this browser.');
            return;
        }
        const rec = new SR();
        rec.lang = (core && core.getLang() === 'fr') ? 'fr-FR' : 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        const btn = document.getElementById('btn-ai-hud-voice');
        if (btn) btn.classList.add('active');
        rec.onresult = (ev) => {
            const transcript = ev.results?.[0]?.[0]?.transcript || '';
            const inp = document.getElementById('ai-hud-prompt');
            if (inp) inp.value = transcript;
            runAIPrompt(transcript);
        };
        rec.onerror = () => { if (btn) btn.classList.remove('active'); };
        rec.onend = () => { if (btn) btn.classList.remove('active'); };
        rec.start();
    }

    // ------------------------------------------------------------------------
    // 4. CAMERA DIRECTOR FLOATING BAR + HOTKEYS (Idea #8)
    // ------------------------------------------------------------------------
    function setCameraPreset(presetName) {
        const core = window.__QuantumHUDCore;
        if (!core) return;
        const camera = core.getCamera();
        const controls = core.getControls();
        if (!camera || !controls) return;

        document.querySelectorAll('.cam-dock-btn[data-cam]').forEach(b => {
            b.classList.toggle('active', b.dataset.cam === presetName);
        });

        if (presetName === 'tour') {
            autoTourActive = !autoTourActive;
            camLerp = null;
            const btnTour = document.querySelector('.cam-dock-btn[data-cam="tour"]');
            if (btnTour) btnTour.classList.toggle('active', autoTourActive);
            core.playSound('click');
            core.logTerminal(autoTourActive ? 'Cinematic Auto-Tour engaged.' : 'Auto-Tour stopped.');
            return;
        }

        autoTourActive = false;
        const btnTour = document.querySelector('.cam-dock-btn[data-cam="tour"]');
        if (btnTour) btnTour.classList.remove('active');

        const cfg = CAM_PRESETS[presetName] || CAM_PRESETS.front;
        camLerp = {
            startPos: camera.position.clone(),
            endPos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
            startTgt: controls.target.clone(),
            endTgt: new THREE.Vector3(cfg.target[0], cfg.target[1], cfg.target[2]),
            startTime: performance.now(),
            duration: 720
        };
        core.playSound('click');
        core.logTerminal(`Camera Director -> ${presetName.toUpperCase()} view.`);
    }

    // ------------------------------------------------------------------------
    // 5. HOOK INTO ANIMATION LOOP & UI BINDINGS
    // ------------------------------------------------------------------------
    const prevAnimate = window.__QuantumHUDHooks.onAnimate;
    window.__QuantumHUDHooks.onAnimate = function (now, dtScale, timeClock, volumeMultiplier, freqData) {
        if (typeof prevAnimate === 'function') prevAnimate(now, dtScale, timeClock, volumeMultiplier, freqData);

        const core = window.__QuantumHUDCore;
        if (!core) return;
        const camera = core.getCamera();
        const controls = core.getControls();

        // Smooth camera interpolation
        if (camLerp && camera && controls) {
            const t = Math.min(1, (now - camLerp.startTime) / camLerp.duration);
            const ease = 1 - Math.pow(1 - t, 3);
            camera.position.lerpVectors(camLerp.startPos, camLerp.endPos, ease);
            controls.target.lerpVectors(camLerp.startTgt, camLerp.endTgt, ease);
            controls.update();
            if (t >= 1) camLerp = null;
        } else if (autoTourActive && camera && controls && dtScale > 0) {
            tourAngle += 0.0045 * dtScale;
            const r = 10.5 + Math.sin(tourAngle * 0.7) * 2.2;
            camera.position.set(
                Math.cos(tourAngle) * r,
                2.5 + Math.sin(tourAngle * 1.4) * 3.0,
                Math.sin(tourAngle) * r
            );
            controls.target.set(0, 0, 0);
            controls.update();
        }

        // Live Oscilloscope & Telemetry metrics
        drawTelemetryOscilloscope(timeClock, volumeMultiplier, freqData);
        updateDynamicTelemetryNumbers(now, timeClock, volumeMultiplier);
    };

    function bindDirectorUI() {
        const core = window.__QuantumHUDCore;
        if (!core) return;

        // AI Prompt Architect
        const inp = document.getElementById('ai-hud-prompt');
        const btnRun = document.getElementById('btn-ai-hud-run');
        const btnVoice = document.getElementById('btn-ai-hud-voice');
        if (btnRun && inp) {
            btnRun.addEventListener('click', () => runAIPrompt(inp.value));
            inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') runAIPrompt(inp.value); });
        }
        if (btnVoice) btnVoice.addEventListener('click', startVoicePrompt);
        document.querySelectorAll('.ai-chip-btn').forEach(ch => {
            ch.addEventListener('click', () => {
                const p = ch.dataset.prompt || ch.textContent;
                if (inp) inp.value = p;
                runAIPrompt(p);
            });
        });

        // Multi-source Audio Reactor
        const btnSynth = document.getElementById('btn-audio-synth');
        const btnUpload = document.getElementById('btn-audio-upload');
        const fileAudio = document.getElementById('audio-file-input');
        if (btnSynth) btnSynth.addEventListener('click', toggleSynth);
        if (btnUpload) btnUpload.addEventListener('click', toggleMp3Playback);
        if (fileAudio) {
            fileAudio.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) loadAudioFile(e.target.files[0]);
            });
        }

        // Custom HUD Branding inputs
        const titleInp = document.getElementById('hud-brand-title');
        const coordInp = document.getElementById('hud-brand-coord');
        const statusSel = document.getElementById('hud-brand-status');
        if (titleInp) {
            titleInp.addEventListener('input', (e) => {
                const val = e.target.value.trim() || 'QUANTUM HUD BUILDER';
                core.setBranding({ title: val });
                const h1 = document.querySelector('.header-logo h1');
                if (h1) {
                    const parts = val.split(' ');
                    const first = parts.shift() || 'QUANTUM';
                    h1.textContent = '';
                    h1.appendChild(document.createTextNode(first + ' '));
                    const span = document.createElement('span');
                    span.className = 'accent-text';
                    span.textContent = parts.join(' ');
                    h1.appendChild(span);
                }
            });
        }
        if (coordInp) {
            coordInp.addEventListener('input', (e) => {
                const val = e.target.value.trim() || 'SYSTEM LNK: SECURE | SEC-COORD: 45.981A // 002.E';
                core.setBranding({ coord: val });
                const el = document.querySelector('.hud-coordinates');
                if (el) el.textContent = val;
            });
        }
        if (statusSel) {
            statusSel.addEventListener('change', (e) => {
                core.setBranding({ status: e.target.value });
                const el = document.getElementById('system-status-text');
                if (el) el.textContent = e.target.value;
            });
        }

        // Red Alert buttons
        ['btn-red-alert', 'btn-red-alert-header'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', () => toggleRedAlert());
        });

        // Camera Director Dock buttons
        document.querySelectorAll('.cam-dock-btn[data-cam]').forEach(btn => {
            btn.addEventListener('click', () => setCameraPreset(btn.dataset.cam));
        });
        const btnPause = document.getElementById('btn-cam-pause');
        if (btnPause) {
            btnPause.addEventListener('click', () => {
                const next = !core.isPaused();
                core.setPaused(next);
                btnPause.classList.toggle('active', next);
                btnPause.innerHTML = next ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
                core.logTerminal(next ? 'Simulation PAUSED.' : 'Simulation RESUMED.');
            });
        }

        // Global Hotkeys (disabled while typing inside form inputs)
        window.addEventListener('keydown', (e) => {
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key === '1') setCameraPreset('front');
            else if (e.key === '2') setCameraPreset('iso');
            else if (e.key === '3') setCameraPreset('top');
            else if (e.key === '4') setCameraPreset('macro');
            else if (e.key === '5') setCameraPreset('tour');
            else if (e.key === ' ') { e.preventDefault(); if (btnPause) btnPause.click(); }
            else if (e.key.toLowerCase() === 'v') { document.getElementById('btn-theater-mode')?.click(); }
            else if (e.key.toLowerCase() === 'r') { setCameraPreset('front'); }
            else if (e.key.toLowerCase() === 'a') { toggleRedAlert(); }
        });
    }

    const prevReady = window.__QuantumHUDHooks.onReady;
    window.__QuantumHUDHooks.onReady = function () {
        if (typeof prevReady === 'function') prevReady();
        bindDirectorUI();
    };

    window.__QuantumAudioV2 = {
        isAudioSourceActive,
        toggleSynth,
        stopAllExtraAudio,
        loadAudioFile
    };
    window.__QuantumDirectorV2 = {
        setCameraPreset,
        runAIPrompt,
        toggleRedAlert
    };
})();
