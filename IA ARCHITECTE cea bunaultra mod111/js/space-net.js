(function(){
'use strict';

const TX = {
  en: {
    title: 'DTN INTERPLANETARY BRIDGE',
    sub: 'Delay-Tolerant Space Communication Link',
    desc: 'Simulate packet routing across Earth-Moon-Mars space links. Direct beams are blocked when the Sun aligns between planets (Solar Conjunction), routing data into intermediate satellite caches (Store-and-Forward). Adjust solar flare noise to test Reed-Solomon bit error correction.',
    flareLabel: 'Solar Flare Interference (Noise)',
    transmitBtn: '🛰️ Simulate API Request Transmit',
    injectBtn: 'Infect Monaco with DTN Link Dashboard',
    copyBtn: 'Copy Link Telemetry Config',
    logTitle: '🛰️ Bitwise Checksum & Error-Correction Terminal',
    copied: 'DTN Link Config copied to clipboard!',
    injected: 'DTN Link Dashboard injected into Monaco Editor!',
    warningConjunction: '⚠️ CONJUNCTION ACTIVE: Direct Earth-Mars link occluded by the Sun. Store-and-Forward routing active.',
    okLink: '🟢 Direct link line of sight stable. Earth-Mars beam online.',
    phobosCache: 'Phobos Cache Space',
    solarFlareAlert: '⚠️ HIGH RADIATION: Solar flare noise causing package bit degradation.',
    presets: {
      conjunction: '☀️ Planet Solar Conjunction State',
      flare: '🔥 Extreme Solar Flare Storm',
      stable: '🟢 Direct High-Speed Earth-Mars Beam',
      relay: '📡 Moon Relay Route'
    }
  },
  fr: {
    title: 'PONT RÉSEAU INTERPLANÉTAIRE DTN',
    sub: 'Lien de Communication Spatial Tolérant aux Délais',
    desc: 'Simulez le routage des paquets sur les liaisons Terre-Lune-Mars. Les faisceaux directs sont bloqués en cas d\'alignement solaire (conjonction), mettant en cache les données (Store-and-Forward). Ajustez le bruit solaire pour tester la correction d\'erreurs Reed-Solomon.',
    flareLabel: 'Interférence de Tempête Solaire (Bruit)',
    transmitBtn: '🛰️ Simuler l\'Envoi d\'une Requête API',
    injectBtn: 'Infecter Monaco avec le Tableau de Bord DTN',
    copyBtn: 'Copier la Configuration de Liaison',
    logTitle: '🛰️ Terminal de Somme de Contrôle & Correction d\'Erreurs',
    copied: 'Configuration de liaison copiée !',
    injected: 'Tableau de Bord DTN injecté dans Monaco Editor !',
    warningConjunction: '⚠️ CONJONCTION SOLAIRE : Liaison directe obstruée par le Soleil. Caching Store-and-Forward actif.',
    okLink: '🟢 Ligne de visée stable. Liaison Terre-Mars directe opérationnelle.',
    phobosCache: 'Mémoire Cache Phobos',
    solarFlareAlert: '⚠️ DEGRÉS DE RADIATION HAUTS : Dégradation des paquets.',
    presets: {
      conjunction: '☀️ Alignement de Conjonction Solaire',
      flare: '🔥 Tempête Solaire Violente',
      stable: '🟢 Faisceau Direct Terre-Mars Optimal',
      relay: '📡 Routage via Relais Lunaire'
    }
  }
};

function gl() { return window.appLang || 'en'; }

window._spaceNetState = {
  flare: 15,
  soundActive: false,
  conjunction: false,
  phobosCacheCount: 0,
  osc: null,
  gain: null,
  ctx: null,
  packets: [],
  planets: {
    earth: { a: 0, speed: 0.008, radius: 60, size: 7, color: '#38bdf8', name: 'Earth' },
    moon: { a: 0, speed: 0.08, radius: 12, size: 2.5, color: '#94a3b8', name: 'Moon' },
    mars: { a: Math.PI, speed: 0.004, radius: 110, size: 5.5, color: '#fb7185', name: 'Mars' },
    phobos: { a: 0, speed: 0.06, radius: 12, size: 2, color: '#f59e0b', name: 'Phobos Relay' }
  }
};

const _o = window.renderTab;
window.renderTab = function(tab) {
  if (tab === 'spacenet') {
    window.activeTab = 'spacenet';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const b = document.getElementById('tab-spacenet');
    if (b) b.classList.add('active');
    window.initSpaceNet(gl());
    return;
  }
  if (typeof _o === 'function') _o(tab);
};

window.initSpaceNet = function(lang) {
  const el = document.getElementById('left-body');
  if (!el) return;
  const t = TX[lang] || TX.en;

  el.innerHTML = `
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;position:relative;">
  
  <!-- Header Card -->
  <div style="background:linear-gradient(135deg,rgba(56,189,248,0.12),rgba(129,140,248,0.08));border-radius:14px;padding:16px;border:1px solid rgba(56,189,248,0.35);display:flex;align-items:center;gap:12px;position:relative;z-index:2;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #38bdf8);">🛰️</span>
    <div>
      <h2 style="margin:0;color:#38bdf8;font-size:14px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10px;margin:0;line-height:1.5;position:relative;z-index:2;">${t.desc}</p>

  <!-- Sound & Presets Controls -->
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px;position:relative;z-index:2;">
    <!-- Telemetry Presets -->
    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.03);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:4px;">
      <span style="font-size:8px;color:#38bdf8;font-weight:800;text-transform:uppercase;margin-bottom:3px;">Select Space Orbit Preset</span>
      <select id="spacenet-preset" onchange="window.setSpaceNetPreset(this.value)" style="background:#020617;border:1px solid rgba(56,189,248,0.3);color:#e2e8f0;font-size:9.5px;padding:4px;border-radius:6px;outline:none;cursor:pointer;width:100%;">
        <option value="stable">${t.presets.stable}</option>
        <option value="conjunction">${t.presets.conjunction}</option>
        <option value="flare">${t.presets.flare}</option>
        <option value="relay">${t.presets.relay}</option>
      </select>
    </div>

    <!-- Alarm synth mute toggle -->
    <button onclick="window.toggleSpaceNetSound()" id="btn-spacenet-sound" style="background:#0f172a;border:1px solid rgba(56,189,248,0.3);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all 0.3s;color:#e2e8f0;font-weight:800;font-size:9.5px;">
      <span style="font-size:14px;" id="sound-spacenet-icon">🔇</span>
      <span id="sound-spacenet-txt">Alarm Mute</span>
    </button>
  </div>

  <!-- Solar Flare slider -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#64748b;font-size:9.5px;font-weight:800;text-transform:uppercase;">${t.flareLabel}</span>
      <span id="spacenet-flare-val" style="color:#38bdf8;font-size:11px;font-weight:800;">${window._spaceNetState.flare}%</span>
    </div>
    <input type="range" id="spacenet-flare-slider" min="0" max="100" value="${window._spaceNetState.flare}" oninput="window.setSpaceNetFlare(parseInt(this.value))" style="width:100%;accent-color:#38bdf8;cursor:pointer;" />
  </div>

  <!-- Realtime Orbital Map Canvas Panel -->
  <div style="background:#020617;border:1px solid rgba(56,189,248,0.25);border-radius:12px;height:240px;position:relative;overflow:hidden;box-shadow:0 0 20px rgba(56,189,248,0.05);z-index:2;">
    <canvas id="spacenet-canvas" style="display:block;width:100%;height:100%;"></canvas>
    
    <!-- Link Quality HUD Info Box overlay -->
    <div id="spacenet-hud" style="position:absolute;bottom:8px;left:8px;background:rgba(2,6,23,0.85);border:1px solid rgba(56,189,248,0.3);padding:6px;border-radius:6px;font-family:sans-serif;font-size:9px;color:#94a3b8;pointer-events:none;z-index:5;display:flex;flex-direction:column;gap:3px;max-width:220px;">
      <div style="display:flex;justify-content:space-between;gap:15px;align-items:center;">
        <span style="font-weight:800;color:#e2e8f0;text-transform:uppercase;">Link Topology</span>
        <span id="spacenet-beam-status" style="font-weight:800;color:#22c55e;">ONLINE</span>
      </div>
      <div style="color:#64748b;font-family:monospace;font-size:8px;" id="spacenet-latency-hud">Latency: 4.22 min</div>
      <div style="color:#f59e0b;font-family:monospace;font-size:8px;display:none;" id="spacenet-cache-hud">Phobos Queue: +0</div>
    </div>
  </div>

  <!-- Transmit API request particle launcher -->
  <button onclick="window.transmitDTNPacket()" id="spacenet-trigger" style="position:relative;z-index:2;width:100%;padding:12px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#818cf8);border:none;color:#fff;font-weight:900;font-size:11.5px;cursor:pointer;box-shadow:0 0 15px rgba(56,189,248,0.35);transition:all 0.2s;">${t.transmitBtn}</button>

  <!-- Checksum Logic logs terminal -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:110px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="font-size:9.5px;color:#38bdf8;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">${t.logTitle}</div>
    <div id="spacenet-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:20px;">— Terminal waiting for frame telemetry packets —</div>
    </div>
  </div>

  <!-- Monaco Injections -->
  <div style="display:flex;gap:6px;position:relative;z-index:2;">
    <button onclick="window.spaceNetInject()" style="flex:1.2;padding:11px;border-radius:8px;background:#38bdf8;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 10px rgba(56,189,248,0.25);" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
    <button onclick="window.spaceNetCopy()" style="flex:1;padding:11px;border-radius:8px;background:#0c4a6e;border:none;color:#bae6fd;font-weight:800;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
  </div>
</div>`;

  // Start Canvas Render
  window.initSpaceNetCanvas();
};

window.initSpaceNetCanvas = function() {
  const canvas = document.getElementById('spacenet-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  let frameId;
  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2;

  function animate() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Draw solar grid lines / magnetic dust particles
    const timeVal = Date.now() * 0.001;
    const flare = window._spaceNetState.flare;

    if (flare > 5) {
      // Draw dynamic orange magnetic waves radiating from center Sun
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.03 * (flare / 100)})`;
      ctx.beginPath();
      for (let r = 10; r < 180; r += 15) {
        const shapeMult = Math.sin(timeVal * 2 + r * 0.05);
        ctx.arc(cx, cy, r + shapeMult * (flare / 15), 0, Math.PI * 2);
      }
      ctx.stroke();
    }

    // Draw center Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 18);
    sunGrad.addColorStop(0, '#fef08a');
    sunGrad.addColorStop(0.3, '#f59e0b');
    sunGrad.addColorStop(1, 'rgba(245,158,11,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fill();

    // Advance orbital angles
    const pl = window._spaceNetState.planets;
    pl.earth.a += pl.earth.speed;
    pl.moon.a += pl.moon.speed;
    pl.mars.a += pl.mars.speed;
    pl.phobos.a += pl.phobos.speed;

    // Calculate dynamic Cartesian coordinates for planet centers
    const ex = cx + Math.cos(pl.earth.a) * pl.earth.radius;
    const ey = cy + Math.sin(pl.earth.a) * pl.earth.radius;

    const mx = cx + Math.cos(pl.mars.a) * pl.mars.radius;
    const my = cy + Math.sin(pl.mars.a) * pl.mars.radius;

    // Moon coordinates relative to Earth
    const moonX = ex + Math.cos(pl.moon.a) * pl.moon.radius;
    const moonY = ey + Math.sin(pl.moon.a) * pl.moon.radius;

    // Phobos relative to Mars
    const phobosX = mx + Math.cos(pl.phobos.a) * pl.phobos.radius;
    const phobosY = my + Math.sin(pl.phobos.a) * pl.phobos.radius;

    // Check line of sight occlusion by Sun (Solar Conjunction)
    // Distance from center Sun (cx, cy) to line segment (Earth -> Mars)
    const lineLen = Math.sqrt((mx - ex)*(mx - ex) + (my - ey)*(my - ey));
    const u = ((cx - ex) * (mx - ex) + (cy - ey) * (my - ey)) / (lineLen * lineLen);
    const clampedU = Math.max(0, Math.min(1, u));
    const projX = ex + clampedU * (mx - ex);
    const projY = ey + clampedU * (my - ey);
    const distToSun = Math.sqrt((cx - projX)*(cx - projX) + (cy - projY)*(cy - projY));

    // Sun radius threshold for occlusion: 14px
    const occluded = distToSun < 15;
    window._spaceNetState.conjunction = occluded;

    // Reactively trigger alarm sounds if warning active
    window.modulateSpaceNetAlarm(occluded, flare);

    // Dynamic HUD updates
    const beamStatus = document.getElementById('spacenet-beam-status');
    const latencyHud = document.getElementById('spacenet-latency-hud');
    const cacheHud = document.getElementById('spacenet-cache-hud');

    if (beamStatus) {
      if (occluded) {
        beamStatus.textContent = gl() === 'fr' ? 'CONJONCTION ACTIVE' : 'CONJUNCTION';
        beamStatus.style.color = '#ef4444';
      } else if (flare > 65) {
        beamStatus.textContent = gl() === 'fr' ? 'PERTURBATION' : 'NOISY LINK';
        beamStatus.style.color = '#f59e0b';
      } else {
        beamStatus.textContent = gl() === 'fr' ? 'ACTIF' : 'ONLINE';
        beamStatus.style.color = '#22c55e';
      }
    }

    if (latencyHud) {
      // Calculate realistic delay based on distance
      const distanceMin = (lineLen * 0.15).toFixed(2);
      latencyHud.textContent = `Earth-Mars Latency: ${distanceMin} min`;
    }

    if (cacheHud) {
      if (window._spaceNetState.phobosCacheCount > 0) {
        cacheHud.style.display = 'block';
        cacheHud.textContent = `${TX[gl()].phobosCache}: +${window._spaceNetState.phobosCacheCount}`;
      } else {
        cacheHud.style.display = 'none';
      }
    }

    // Draw planet orbits
    ctx.strokeStyle = 'rgba(255,255,255,0.015)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, pl.earth.radius, 0, Math.PI * 2);
    ctx.arc(cx, cy, pl.mars.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Line of Sight segment
    ctx.strokeStyle = occluded ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.15)';
    if (occluded) {
      ctx.setLineDash([3, 3]);
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Draw Planets
    // Earth
    ctx.fillStyle = pl.earth.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = pl.earth.color;
    ctx.beginPath();
    ctx.arc(ex, ey, pl.earth.size, 0, Math.PI * 2);
    ctx.fill();

    // Moon
    ctx.fillStyle = pl.moon.color;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(moonX, moonY, pl.moon.size, 0, Math.PI * 2);
    ctx.fill();

    // Mars
    ctx.fillStyle = pl.mars.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = pl.mars.color;
    ctx.beginPath();
    ctx.arc(mx, my, pl.mars.size, 0, Math.PI * 2);
    ctx.fill();

    // Phobos Relay satellite
    ctx.fillStyle = pl.phobos.color;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(phobosX, phobosY, pl.phobos.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw Phobos orbit
    ctx.strokeStyle = 'rgba(245,158,11,0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(mx, my, pl.phobos.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw packet particles fly simulation
    ctx.fillStyle = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#38bdf8';

    for (let i = window._spaceNetState.packets.length - 1; i >= 0; i--) {
      const p = window._spaceNetState.packets[i];
      p.t += 0.015;

      // Interpolate package position from Earth center to Mars center
      let px = ex + (mx - ex) * p.t;
      let py = ey + (my - ey) * p.t;

      // Store-and-forward relay occlusion bend path
      if (occluded && p.t < 0.48) {
        // Bend package path toward Phobos relay center coordinates
        const phDistX = phobosX - px;
        const phDistY = phobosY - py;
        px += phDistX * (p.t * 1.5);
        py += phDistY * (p.t * 1.5);
      }

      // Solar flare noise corruption glitching packet
      if (flare > 10) {
        const noise = (flare / 100) * 12;
        px += (Math.random() * 2 - 1) * noise;
        py += (Math.random() * 2 - 1) * noise;
      }

      // Check distance to destination
      const destDist = Math.sqrt((px - mx)*(px - mx) + (py - my)*(py - my));
      const phobosDist = Math.sqrt((px - phobosX)*(px - phobosX) + (py - phobosY)*(py - phobosY));

      if (occluded && phobosDist < 8 && !p.cached) {
        // Cache packet in Phobos queue
        p.cached = true;
        window._spaceNetState.phobosCacheCount++;
        window._spaceNetState.packets.splice(i, 1);
        window.spaceNetLog('Phobos Caching Segment', `Frame cached in relay buffer. Stored checksum [0x${p.id}].`);
        continue;
      }

      if (destDist < 6) {
        // Packet reached destination Mars!
        window._spaceNetState.packets.splice(i, 1);
        
        // Output Bitwise log
        const isCorrupt = p.corrupted;
        const hashHex = p.id;
        if (isCorrupt) {
          window.spaceNetLog('Package Arrival Anomaly', `Frame corrupted [0x${hashHex}] by Solar Flare! Executing Reed-Solomon bit solver...`, true);
          window.spaceNetLog('Bit Solver System', `Correction Formula: 0b10110011 -> 0b10110111. Error corrected successfully. Checksum validated.`, false, true);
        } else {
          window.spaceNetLog('Package Arrival Success', `DTN Frame payload [0x${hashHex}] resolved cleanly. Link operational.`, false);
        }
        continue;
      }

      if (p.t >= 1.2) {
        // Lost package in space
        window._spaceNetState.packets.splice(i, 1);
        continue;
      }

      // Set package color
      ctx.fillStyle = p.corrupted ? '#ef4444' : '#38bdf8';
      ctx.shadowColor = ctx.fillStyle;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0; // reset

    // Automated Phobos relay flushing segments if direct beam comes online again
    if (!occluded && window._spaceNetState.phobosCacheCount > 0) {
      window._spaceNetState.phobosCacheCount--;
      // Launch cached packet from Phobos to Mars
      const idStr = Math.floor(Math.random()*65535).toString(16);
      window._spaceNetState.packets.push({ t: 0.8, id: idStr, corrupted: Math.random()*100 < flare, cached: true });
      window.spaceNetLog('Relay Flushing Cache', `Phobos forwarding cached packet segment. Payload [0x${idStr}].`);
    }

    frameId = requestAnimationFrame(animate);
  }

  animate();

  // Garbage collect animation loop on tab switch
  window.addEventListener('hashchange', () => {
    cancelAnimationFrame(frameId);
  }, { once: true });
};

window.setSpaceNetFlare = function(val) {
  window._spaceNetState.flare = val;
  const valEl = document.getElementById('spacenet-flare-val');
  if (valEl) valEl.textContent = val + '%';
};

window.toggleSpaceNetSound = function() {
  const icon = document.getElementById('sound-spacenet-icon');
  const txt = document.getElementById('sound-spacenet-txt');

  if (!window._spaceNetState.soundActive) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      gain.gain.setValueAtTime(0.0, ctx.currentTime); // start silent

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      window._spaceNetState.ctx = ctx;
      window._spaceNetState.osc = osc;
      window._spaceNetState.gain = gain;
      window._spaceNetState.soundActive = true;

      if (icon) icon.textContent = '🔊';
      if (txt) txt.textContent = 'Alarm Unmute';
    } catch(e) {
      console.warn('Audio Context block:', e);
    }
  } else {
    if (window._spaceNetState.osc) {
      try {
        window._spaceNetState.osc.stop();
      } catch(e) {}
      window._spaceNetState.osc = null;
    }
    window._spaceNetState.soundActive = false;
    if (icon) icon.textContent = '🔇';
    if (txt) txt.textContent = 'Alarm Mute';
  }
};

window.modulateSpaceNetAlarm = function(occluded, flare) {
  if (!window._spaceNetState.soundActive || !window._spaceNetState.osc) return;

  const ctx = window._spaceNetState.ctx;
  const osc = window._spaceNetState.osc;
  const gain = window._spaceNetState.gain;

  if (occluded || flare > 70) {
    // Alert sweep sound
    const sweepVal = 150 + Math.sin(Date.now() * 0.01) * 40;
    osc.frequency.setValueAtTime(sweepVal, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
  } else {
    // Mute alarm
    gain.gain.setValueAtTime(0.0, ctx.currentTime);
  }
};

window.transmitDTNPacket = function() {
  const flare = window._spaceNetState.flare;
  const idStr = Math.floor(Math.random()*65535).toString(16);
  const isCorrupted = Math.random()*100 < flare;

  // Add a packet traveling Earth segments to Mars
  window._spaceNetState.packets.push({
    t: 0.0,
    id: idStr,
    corrupted: isCorrupted,
    cached: false
  });

  window.spaceNetLog('Transmission Packet Launched', `API request sent. Header: [DTN-GET-200], Payload: [0x${idStr}]`);
};

window.spaceNetLog = function(title, msg, warning = false, success = false) {
  const log = document.getElementById('spacenet-log');
  if (!log) return;

  // Clear spacer
  if (log.innerHTML.includes('waiting for frame')) {
    log.innerHTML = '';
  }

  const row = document.createElement('div');
  row.style.padding = '1px 0';
  row.style.borderBottom = '1px solid rgba(255,255,255,0.01)';
  row.innerHTML = `<span style="color:${warning ? '#ef4444' : (success ? '#22c55e' : '#38bdf8')}; font-weight:800;">[${title}]</span> ${msg}`;

  log.appendChild(row);
  log.scrollTop = log.scrollHeight;

  // Clamp log count
  if (log.children.length > 15) {
    log.removeChild(log.firstChild);
  }
};

window.setSpaceNetPreset = function(preset) {
  const lang = gl();
  const pl = window._spaceNetState.planets;

  const presetsMap = {
    stable: { flare: 5, earthAngle: 0, marsAngle: 1.2 },
    conjunction: { flare: 10, earthAngle: 0, marsAngle: 0.02 }, // closely aligned with sun center
    flare: { flare: 90, earthAngle: 1.5, marsAngle: 4 },
    relay: { flare: 20, earthAngle: 0.2, marsAngle: 0.9 }
  };

  const selected = presetsMap[preset];
  if (!selected) return;

  window._spaceNetState.flare = selected.flare;
  pl.earth.a = selected.earthAngle;
  pl.mars.a = selected.marsAngle;

  const slider = document.getElementById('spacenet-flare-slider');
  if (slider) slider.value = selected.flare;
  const valEl = document.getElementById('spacenet-flare-val');
  if (valEl) valEl.textContent = selected.flare + '%';

  window.spaceNetLog('Orbit Telemetry Preset', `Loaded planet coordinate topology: ${preset.toUpperCase()}`);
};

window.spaceNetInject = function() {
  const t = TX[gl()] || TX.en;

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Interplanetary DTN Network Controller</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700;800&family=Inter:wght@400;900&display=swap" rel="stylesheet">
  <style>
    body {
      background: #020617;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .header {
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(2, 6, 23, 0.8));
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badge {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #38bdf8;
      color: #38bdf8;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 15px;
    }

    .card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
      padding: 6px 0;
      font-size: 11px;
    }

    .btn {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #38bdf8;
      background: transparent;
      color: #38bdf8;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }

    .btn:hover {
      background: #38bdf8;
      color: #000;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span style="font-family:'Inter', sans-serif; font-size:16px; font-weight:900; color:#38bdf8;">🛰️ INTERPLANETARY DTN CONTROLLER V1</span>
      <div style="font-size:10px; color:#64748b; margin-top:3px;">Store-and-Forward Telemetry Satellite Relay Link</div>
    </div>
    <span class="badge">LINK STATUS: OPTIMAL</span>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0; font-size: 12px; color: #38bdf8;">TOPOLOGY STATUS</h3>
      <div style="margin-top: 5px;">
        <div class="metric-row"><span>Earth-Mars Segment Latency</span><span style="color:#fff;">14m 22s</span></div>
        <div class="metric-row"><span>Phobos Queue Load</span><span style="color:#22c55e;">+0 frames</span></div>
        <div class="metric-row"><span>Reed-Solomon Bit Recovery</span><span style="color:#38bdf8;">100% Corrected</span></div>
        <div class="metric-row"><span>Solar Flare Interference</span><span style="color:#f59e0b;">15% Noise</span></div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin: 0; font-size: 12px; color: #38bdf8;">TELEMETRY LINK LOGS</h3>
      <div style="flex:1; overflow-y:auto; font-size:10px; display:flex; flex-direction:column; gap:4px; color:#94a3b8;">
        <div>[02:18:22] ▶ Sending interplanetary synchronization frames...</div>
        <div style="color:#22c55e;">[02:18:23] ▶ Frame checksum [0x8f4d] validated successfully.</div>
        <div>[02:18:24] ▶ All DTN links synchronized. Line-of-sight optimal.</div>
      </div>
    </div>
  </div>

  <button class="btn" onclick="alert('DTN routing segment active!')">
    EXECUTE INTERPLANETARY LINK ROUTING FLUSH
  </button>
</body>
</html>`;

  if (window.editor) {
    window.editor.setValue(htmlTemplate);
    if (window.runPreview) window.runPreview();
  }
  if (window.showToast) window.showToast(t.injected);
};

window.spaceNetCopy = function() {
  const t = TX[gl()] || TX.en;
  const config = `
/* Interplanetary DTN Link Configuration */
[link]
  protocol = "dtn-store-and-forward"
  lineOfSightOcclusionSunRadius = 15.0
  retransmitAttempts = 5
[ecc "reed-solomon"]
  paritySymbols = 32
  bitCorrectionLength = 16
[reconstruction]
  mode = "hamming-bitwise"
  automaticRebuild = true
`;

  navigator.clipboard.writeText(config.trim()).then(() => {
    if (window.showToast) window.showToast(t.copied);
  });
};

const _oa = window.applyLang;
window.applyLang = function() {
  if (typeof _oa === 'function') _oa();
  const l = document.getElementById('lbl-tab-spacenet');
  if (l) l.textContent = gl() === 'fr' ? 'Réseau Spatial' : 'Space Net';
  if (window.activeTab === 'spacenet') window.initSpaceNet(gl());
};

console.log('🛰️ DTN Interplanetary Bridge loaded!');
})();
