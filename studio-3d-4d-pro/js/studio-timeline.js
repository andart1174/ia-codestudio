/**
 * Studio 3D/4D Pro v2.0 — Keyframe Timeline, Camera Path Sequencer & 360° Turntable WebM Recorder
 */
(function () {
  'use strict';

  let drawer = null;
  let keyframes = [];
  let duration = 6.0;
  let curTime = 0;
  let playing = false;
  let easing = 'easeInOut';
  let lastTick = 0;
  let recording = false;

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  const EASINGS = {
    linear: t => t,
    easeInOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    elastic: t => t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
    bounce: t => {
      const n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };

  function lerp(a, b, t) { return a + (b - a) * t; }

  function addCurrentKeyframe() {
    const cam = window.SketchExtruder && window.SketchExtruder.getCamera ? window.SketchExtruder.getCamera() : null;
    const ctrl = window.SketchExtruder && window.SketchExtruder.getControls ? window.SketchExtruder.getControls() : null;
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!cam) return;

    const kf = {
      time: Number(curTime.toFixed(2)),
      camPos: [cam.position.x, cam.position.y, cam.position.z],
      camTarget: ctrl ? [ctrl.target.x, ctrl.target.y, ctrl.target.z] : [0, 0, 0],
      objId: act ? act.id : null,
      objPos: act && act.meshGroup ? [act.meshGroup.position.x, act.meshGroup.position.y, act.meshGroup.position.z] : null,
      objRot: act && act.meshGroup ? [act.meshGroup.rotation.x, act.meshGroup.rotation.y, act.meshGroup.rotation.z] : null,
      objScl: act && act.meshGroup ? [act.meshGroup.scale.x, act.meshGroup.scale.y, act.meshGroup.scale.z] : null
    };
    keyframes = keyframes.filter(k => Math.abs(k.time - kf.time) > 0.05);
    keyframes.push(kf);
    keyframes.sort((a, b) => a.time - b.time);
    renderDrawer();
    if (window.toast) window.toast(`🎬 Keyframe @ ${kf.time}s saved!`);
  }

  function applyTime(t) {
    if (keyframes.length === 0) return;
    const cam = window.SketchExtruder && window.SketchExtruder.getCamera ? window.SketchExtruder.getCamera() : null;
    const ctrl = window.SketchExtruder && window.SketchExtruder.getControls ? window.SketchExtruder.getControls() : null;
    if (!cam) return;

    let a = keyframes[0], b = keyframes[keyframes.length - 1];
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (t >= keyframes[i].time && t <= keyframes[i + 1].time) {
        a = keyframes[i]; b = keyframes[i + 1]; break;
      }
    }
    if (t <= keyframes[0].time) { a = b = keyframes[0]; }
    if (t >= keyframes[keyframes.length - 1].time) { a = b = keyframes[keyframes.length - 1]; }

    const span = Math.max(0.0001, b.time - a.time);
    const rawFrac = a === b ? 0 : Math.max(0, Math.min(1, (t - a.time) / span));
    const f = (EASINGS[easing] || EASINGS.easeInOut)(rawFrac);

    cam.position.set(
      lerp(a.camPos[0], b.camPos[0], f),
      lerp(a.camPos[1], b.camPos[1], f),
      lerp(a.camPos[2], b.camPos[2], f)
    );
    if (ctrl) {
      ctrl.target.set(
        lerp(a.camTarget[0], b.camTarget[0], f),
        lerp(a.camTarget[1], b.camTarget[1], f),
        lerp(a.camTarget[2], b.camTarget[2], f)
      );
      ctrl.update();
    } else {
      cam.lookAt(lerp(a.camTarget[0], b.camTarget[0], f), lerp(a.camTarget[1], b.camTarget[1], f), lerp(a.camTarget[2], b.camTarget[2], f));
    }

    if (a.objId && a.objId === b.objId && a.objPos && b.objPos && window.SketchExtruder.getModels) {
      const m = window.SketchExtruder.getModels().find(x => x.id === a.objId);
      if (m && m.meshGroup) {
        m.meshGroup.position.set(lerp(a.objPos[0], b.objPos[0], f), lerp(a.objPos[1], b.objPos[1], f), lerp(a.objPos[2], b.objPos[2], f));
        m.meshGroup.rotation.set(lerp(a.objRot[0], b.objRot[0], f), lerp(a.objRot[1], b.objRot[1], f), lerp(a.objRot[2], b.objRot[2], f));
        m.meshGroup.scale.set(lerp(a.objScl[0], b.objScl[0], f), lerp(a.objScl[1], b.objScl[1], f), lerp(a.objScl[2], b.objScl[2], f));
      }
    }
  }

  function loadPreset(kind) {
    keyframes = [];
    const r = 200;
    if (kind === 'turntable') {
      for (let i = 0; i <= 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        keyframes.push({ time: Number(((i / 8) * duration).toFixed(2)), camPos: [Math.sin(ang) * r, 55, Math.cos(ang) * r], camTarget: [0, 0, 0] });
      }
      easing = 'linear';
    } else if (kind === 'flyin') {
      keyframes = [
        { time: 0, camPos: [260, 160, 320], camTarget: [0, 20, 0] },
        { time: Number((duration * 0.5).toFixed(2)), camPos: [-90, 45, 165], camTarget: [0, 0, 0] },
        { time: duration, camPos: [0, 30, 130], camTarget: [0, 0, 0] }
      ];
      easing = 'easeInOut';
    } else if (kind === 'reveal') {
      keyframes = [
        { time: 0, camPos: [0, -20, 80], camTarget: [0, 0, 0] },
        { time: Number((duration * 0.6).toFixed(2)), camPos: [140, 85, 180], camTarget: [0, 0, 0] },
        { time: duration, camPos: [0, 50, 210], camTarget: [0, 0, 0] }
      ];
      easing = 'easeInOut';
    }
    curTime = 0;
    applyTime(0);
    renderDrawer();
    if (window.toast) window.toast('🎬 Camera sequence loaded!');
  }

  function togglePlay() {
    if (keyframes.length < 2) loadPreset('turntable');
    playing = !playing;
    lastTick = performance.now();
    if (playing) {
      window.SketchExtruder.registerAnimHook('studio-timeline-play', () => {
        if (!playing) return;
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastTick) / 1000);
        lastTick = now;
        curTime += dt;
        if (curTime >= duration) curTime = 0;
        applyTime(curTime);
        const sc = document.getElementById('tl-scrubber');
        const tv = document.getElementById('tl-time-val');
        if (sc) sc.value = curTime.toFixed(2);
        if (tv) tv.textContent = curTime.toFixed(1) + 's';
      });
    } else {
      window.SketchExtruder.unregisterAnimHook('studio-timeline-play');
    }
    renderDrawer();
  }

  function recordTurntableWebM() {
    if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
      if (typeof window.showPaywallModal === 'function') window.showPaywallModal();
      return;
    }
    const rend = window.SketchExtruder && window.SketchExtruder.getRenderer ? window.SketchExtruder.getRenderer() : null;
    if (!rend || !rend.domElement || typeof MediaRecorder === 'undefined') {
      if (window.toast) window.toast('❌ MediaRecorder unavailable');
      return;
    }
    if (recording) return;
    if (keyframes.length < 2) loadPreset('turntable');
    recording = true;
    curTime = 0;
    if (!playing) togglePlay();

    const chunks = [];
    const stream = rend.domElement.captureStream(30);
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const rec = new MediaRecorder(stream, { mimeType: mime });
    rec.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };
    rec.onstop = () => {
      recording = false;
      if (playing) togglePlay();
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `studio-3d-turntable-${Date.now()}.webm`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      if (window.toast) window.toast(isFR() ? '🎥 Vidéo Turntable WebM enregistrée !' : '🎥 Turntable WebM Video saved!');
      renderDrawer();
    };
    rec.start(100);
    if (window.toast) window.toast(isFR() ? `🔴 Enregistrement ${duration}s en cours...` : `🔴 Recording ${duration}s sequence...`);
    renderDrawer();
    setTimeout(() => { if (rec.state !== 'inactive') rec.stop(); }, Math.round(duration * 1000));
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🎬', fr ? 'Timeline Caméra & Turntable 360°' : 'Timeline & 360° Turntable')}
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-bottom:4px;">
        <span style="color:#94a3b8;">${fr ? 'Temps' : 'Playhead'}: <b id="tl-time-val" style="color:#14b8a6;">${curTime.toFixed(1)}s</b> / ${duration}s</span>
        <select id="tl-ease" style="background:#0f172a;border:1px solid #334155;border-radius:5px;color:#e2e8f0;font-size:10px;padding:3px 6px;">
          <option value="easeInOut" ${easing==='easeInOut'?'selected':''}>EaseInOut</option>
          <option value="linear" ${easing==='linear'?'selected':''}>Linear</option>
          <option value="elastic" ${easing==='elastic'?'selected':''}>Elastic</option>
          <option value="bounce" ${easing==='bounce'?'selected':''}>Bounce</option>
        </select>
      </div>
      <input type="range" id="tl-scrubber" min="0" max="${duration}" step="0.05" value="${curTime}" style="width:100%;accent-color:#14b8a6;margin-bottom:10px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
        <button id="tl-play" class="studio-btn-primary" style="background:${playing ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#14b8a6,#0d9488)'};">${playing ? '⏸ Pause' : '▶ Play'}</button>
        <button id="tl-add-kf" class="studio-btn-sec">➕ ${fr ? 'Clé (Keyframe)' : 'Add Keyframe'}</button>
      </div>
      <div style="font-size:10px;color:#94a3b8;margin-bottom:5px;">${fr ? 'Durée (sec)' : 'Duration (sec)'}: <b id="tl-dur-v">${duration}s</b><input type="range" id="tl-dur" min="3" max="15" step="1" value="${duration}" style="width:100%;accent-color:#38bdf8;"></div>
      <div style="font-size:10px;font-weight:800;color:#2dd4bf;text-transform:uppercase;margin:8px 0 5px;">⚡ ${fr ? 'Séquences Caméra (1 clic)' : '1-Click Camera Sequences'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:10px;">
        <button class="studio-btn-sec tl-pre" data-p="turntable">🔄 360°</button>
        <button class="studio-btn-sec tl-pre" data-p="flyin">✈️ Fly-In</button>
        <button class="studio-btn-sec tl-pre" data-p="reveal">🌟 Reveal</button>
      </div>
      <div style="max-height:105px;overflow-y:auto;background:rgba(0,0,0,0.28);border-radius:8px;padding:6px;margin-bottom:10px;font-size:10px;">
        ${keyframes.length === 0
          ? `<div style="color:#64748b;text-align:center;padding:10px;">${fr ? 'Aucune clé — cliquez 360° ou + Clé' : 'No keyframes — click 360° or + Add Keyframe'}</div>`
          : keyframes.map((k, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 4px;border-bottom:1px solid #1e293b;"><span>◆ KF #${i + 1} @ <b>${k.time}s</b></span><button class="tl-del-kf" data-i="${i}" style="background:none;border:none;color:#f87171;cursor:pointer;">✕</button></div>`).join('')}
      </div>
      <button id="tl-record-webm" class="studio-btn-primary" style="background:linear-gradient(135deg,#f43f5e,#ec4899);" ${recording ? 'disabled' : ''}>
        ${recording ? '🔴 Recording...' : (fr ? '🎥 Exporter Vidéo Turntable WebM 👑' : '🎥 Record Turntable WebM Video 👑')}
      </button>
    `;

    drawer.panel.querySelector('#tl-scrubber').oninput = e => {
      curTime = parseFloat(e.target.value);
      drawer.panel.querySelector('#tl-time-val').textContent = curTime.toFixed(1) + 's';
      applyTime(curTime);
    };
    drawer.panel.querySelector('#tl-ease').onchange = e => { easing = e.target.value; };
    drawer.panel.querySelector('#tl-dur').oninput = e => {
      duration = +e.target.value;
      drawer.panel.querySelector('#tl-dur-v').textContent = duration + 's';
      drawer.panel.querySelector('#tl-scrubber').max = duration;
    };
    drawer.panel.querySelector('#tl-play').onclick = togglePlay;
    drawer.panel.querySelector('#tl-add-kf').onclick = addCurrentKeyframe;
    drawer.panel.querySelector('#tl-record-webm').onclick = recordTurntableWebM;
    drawer.panel.querySelectorAll('.tl-pre').forEach(b => { b.onclick = () => loadPreset(b.dataset.p); });
    drawer.panel.querySelectorAll('.tl-del-kf').forEach(b => { b.onclick = () => { keyframes.splice(+b.dataset.i, 1); renderDrawer(); }; });
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioTimeline = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-timeline-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    }
  };
})();
