(function() {
  'use strict';

  const T = {
    en: {
      title: "🚀 Deep Space DevOps",
      desc: "Deploy your local workspace into the global CDN cloud, visualized as an orbital satellite network launch.",
      btnLaunch: "🚀 Launch Orbital Deployment",
      btnLaunching: "📡 Syncing Satellite Orbit...",
      consoleTitle: "Telemetry & Deployment Log",
      liveCardTitle: "🛰️ Space Net Link Established",
      liveCardDesc: "Your application is synchronized across global orbital bases.",
      openApp: "🌐 Visit Live Site"
    },
    fr: {
      title: "🚀 Space DevOps & Orbite",
      desc: "Déployez votre code sur le cloud CDN mondial, visualisé sous forme de satellites en orbite active.",
      btnLaunch: "🚀 Lancer le Déploiement Orbital",
      btnLaunching: "📡 Synchronisation Satellite...",
      consoleTitle: "Jurnal de Télémétrie & Déploiement",
      liveCardTitle: "🛰️ Liaison Space-Net Établie",
      liveCardDesc: "Votre application est synchronisée sur les bases orbitales terrestres.",
      openApp: "🌐 Visiter le Site"
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // Animation variables
  let earthAngle = 0;
  let satAngle1 = 0;
  let satAngle2 = Math.PI * 0.7;
  let satAngle3 = Math.PI * 1.4;
  let animFrameId = null;

  // Deployment sequence state
  let deployState = 'idle'; // idle, launching, complete
  let rocketY = 160;        // Rocket start Y position (on Earth)
  let rocketX = 170;
  let rocketSpeed = 0;
  let laserOpacity = 0;
  let consoleTimeout = null;

  // Log sequence
  const LOGS = [
    "[SYS] Initializing orbital deployment bridge...",
    "[NAV] Calculating orbital delta-V vectors...",
    "[SYS] Compressing source files & asset metadata (143KB)...",
    "[RKT] Delta-V launch vehicle ignition sequence... 🚀",
    "[RKT] Solid booster ignition confirmed. Thrust 1.2M Lbf.",
    "[RKT] Orbit velocity 7.8 km/s achieved. Boosters separated.",
    "[SAT] Payload fairing jettison. Satellite grid deployed.",
    "[SYS] Establishing laser mesh connections to CDN edges...",
    "[CDA] Syncing London Edge CDN (0.8ms ping)... 🛰️ 💻",
    "[CDA] Syncing Tokyo Edge CDN (1.4ms ping)... 🛰️ 💻",
    "[CDA] Syncing New York Edge CDN (0.6ms ping)... 🛰️ 💻",
    "[DB] Database replica synchronization complete.",
    "[READY] Orbit Bridge sync: 100%. Site is now live!"
  ];

  function runDeployment() {
    if (deployState !== 'idle') return;
    deployState = 'launching';
    rocketY = 135;
    rocketSpeed = 0.5;
    laserOpacity = 0;

    const btn = document.getElementById('sd-deploy-btn');
    if (btn) {
      btn.textContent = t('btnLaunching');
      btn.disabled = true;
      btn.style.background = 'linear-gradient(90deg, #64748b, #475569)';
    }

    const consoleBox = document.getElementById('sd-console-box');
    if (consoleBox) consoleBox.innerHTML = '';

    // Play launch sound if synth module is available
    if (window.playPluck) {
      // play a sweeping laser sound
      let time = 0;
      for (let f = 100; f < 800; f += 80) {
        setTimeout(() => {
          if (window.playCustomSound) window.playCustomSound(f, 0.05);
        }, time);
        time += 50;
      }
    }

    triggerConsoleLog(0);
  }

  function triggerConsoleLog(index) {
    if (index >= LOGS.length) {
      deployState = 'complete';
      updateUiComplete();
      return;
    }

    const consoleBox = document.getElementById('sd-console-box');
    if (consoleBox) {
      const logDiv = document.createElement('div');
      logDiv.style.cssText = `margin-bottom: 6px; font-family: monospace; font-size: 10px; color: ${index === LOGS.length-1 ? '#34d399' : '#38bdf8'}; line-height: 1.4; border-left: 2px solid ${index === LOGS.length-1 ? '#34d399' : '#0891b2'}; padding-left: 6px; animation: slideUp 0.15s ease-out;`;
      
      const timeStr = `[${new Date().toLocaleTimeString([], { hour12: false })}]`;
      logDiv.textContent = `${timeStr} ${LOGS[index]}`;
      consoleBox.appendChild(logDiv);
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }

    // Dynamic speeds for logs
    let delay = 1200;
    if (index === 3 || index === 4 || index === 5) delay = 1500; // Launch taking a bit longer
    if (index === 7 || index === 8 || index === 9) delay = 900;  // Laser sync is fast

    consoleTimeout = setTimeout(() => {
      triggerConsoleLog(index + 1);
    }, delay);
  }

  function updateUiComplete() {
    const btn = document.getElementById('sd-deploy-btn');
    if (btn) {
      btn.textContent = t('btnLaunch');
      btn.disabled = false;
      btn.style.background = 'linear-gradient(90deg, #3b82f6, #06b6d4)';
    }

    const card = document.getElementById('sd-live-card');
    if (card) {
      card.style.display = 'block';
    }

    if (window.showToast) {
      window.showToast('🚀 CDN Deployment orbital sync complete!');
    }
  }

  // Draw space scene
  function startSpaceLoop() {
    const canvas = document.getElementById('space-devops-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const loop = () => {
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      // Draw background space stars
      ctx.fillStyle = '#ffffff';
      for(let i = 0; i < 30; i++) {
        const sx = (Math.sin(i * 123.45) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 678.90) * 0.5 + 0.5) * h;
        const size = Math.abs(Math.sin(Date.now() * 0.001 + i)) * 1.5;
        ctx.fillRect(sx, sy, size, size);
      }

      // Draw Orbits
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      
      const drawOrbit = (rx, ry) => {
        ctx.beginPath();
        ctx.ellipse(w/2, h/2, rx, ry, 0.2, 0, Math.PI * 2);
        ctx.stroke();
      };
      drawOrbit(110, 45);
      drawOrbit(140, 60);

      // Draw Earth (Center)
      const eRadius = 46;
      const ex = w / 2;
      const ey = h / 2;

      // Glow effect around Earth
      const glow = ctx.createRadialGradient(ex, ey, eRadius - 5, ex, ey, eRadius + 15);
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      glow.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(ex, ey, eRadius + 15, 0, Math.PI * 2);
      ctx.fill();

      // Body of Earth
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(ex, ey, eRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Earth Continent Shapes (animated shifting rotation)
      earthAngle += 0.004;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.save();
      // Clip inside Earth circle
      ctx.beginPath();
      ctx.arc(ex, ey, eRadius, 0, Math.PI * 2);
      ctx.clip();

      const drawContinent = (cx, cy, r, speedMult) => {
        const offset = Math.sin(earthAngle * speedMult) * 18;
        ctx.beginPath();
        ctx.arc(cx + offset, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };
      drawContinent(ex - 15, ey - 5, 20, 1.2);
      drawContinent(ex + 25, ey + 10, 14, 0.8);
      drawContinent(ex + 10, ey - 22, 10, 1.4);
      ctx.restore();

      // Orbit Angles increment
      satAngle1 += 0.012;
      satAngle2 += 0.009;
      satAngle3 += 0.007;

      // Draw Satellites
      const drawSat = (angle, rx, ry, col) => {
        const sx = ex + Math.cos(angle) * rx;
        const sy = ey + Math.sin(angle) * ry;

        // Draw Sat body
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI*2);
        ctx.fill();

        // Draw Solar wings
        ctx.fillStyle = '#64748b';
        ctx.fillRect(sx - 8, sy - 1, 4, 2);
        ctx.fillRect(sx + 4, sy - 1, 4, 2);

        // Active connecting laser if launching
        if (deployState === 'launching' && rocketY < ey) {
          ctx.strokeStyle = 'rgba(52, 211, 153, ' + Math.min(1.0, laserOpacity) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      };

      drawSat(satAngle1, 110, 45, '#38bdf8');
      drawSat(satAngle2, 140, 60, '#c084fc');
      drawSat(satAngle3, 120, 52, '#d946ef');

      // Draw Rocket Launch Sequence
      if (deployState === 'launching') {
        rocketY -= rocketSpeed;
        rocketSpeed += 0.03; // accelerate

        // Draw fire particles
        ctx.fillStyle = '#fb923c';
        ctx.fillRect(rocketX + 1, rocketY + 8 + Math.random()*4, 2, 3);
        ctx.fillStyle = '#f87171';
        ctx.fillRect(rocketX, rocketY + 12, 4, 2);

        // Draw rocket body
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(rocketX + 2, rocketY);
        ctx.lineTo(rocketX + 5, rocketY + 8);
        ctx.lineTo(rocketX - 1, rocketY + 8);
        ctx.closePath();
        ctx.fill();

        // Laser opacity increases as rocket goes higher
        if (rocketY < 60) {
          laserOpacity += 0.05;
        }

        // Complete launch phase once out of boundaries
        if (rocketY < -20) {
          rocketY = -100;
        }
      }

      animFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  // Render UI
  window.renderSpaceDevops = function(container) {
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 10px 4px; font-family: 'Inter', sans-serif; color: #f1f5f9; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 🌌 Space Canvas Visualizer -->
        <div style="background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; overflow: hidden; padding: 6px; display: flex; flex-direction: column;">
          <canvas id="space-devops-canvas" width="340" height="180" style="width: 100%; height: auto; aspect-ratio: 340 / 180; display: block; border-radius: 8px;"></canvas>
        </div>

        <!-- 🚀 Launch Controls -->
        <div>
          <button id="sd-deploy-btn" class="sm-btn blue-btn" style="width:100%; font-weight:800; padding:12px; font-size:12px; background: linear-gradient(90deg, #3b82f6, #06b6d4);">
            ${t('btnLaunch')}
          </button>
        </div>

        <!-- 🖥️ Telemetry Console -->
        <div style="background: #070a13; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; height: 160px; padding: 12px;">
          <div style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            📡 ${t('consoleTitle')}
          </div>
          <div id="sd-console-box" style="flex:1; overflow-y:auto; font-family: monospace; display:flex; flex-direction:column; gap:4px; scrollbar-width:thin;">
            <div style="color: #64748b; font-size: 10px; font-style: italic;">System idle. Ready for flight parameters...</div>
          </div>
        </div>

        <!-- 🛰️ Glassmorphic Live App URL Card (Hidden by default) -->
        <div id="sd-live-card" style="display: ${deployState === 'complete' ? 'block' : 'none'}; background: rgba(52, 211, 153, 0.05); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 12px; padding: 18px; animation: slideUp 0.3s ease-out;">
          <h4 style="font-size:13px; font-weight:900; color:#34d399; margin: 0 0 6px 0;">
            ${t('liveCardTitle')}
          </h4>
          <p style="font-size: 11px; color:#cbd5e1; line-height: 1.5; margin: 0 0 14px 0;">
            ${t('liveCardDesc')}
          </p>
          <button id="sd-visit-btn" class="sm-btn green-btn" style="width: 100%; font-weight:800; padding:8px;">
            ${t('openApp')}
          </button>
        </div>
      </div>
    `;

    // Hook listeners
    document.getElementById('sd-deploy-btn').onclick = function() {
      runDeployment();
    };

    document.getElementById('sd-visit-btn').onclick = function() {
      // Trigger deploy modal in main app
      const deployBtn = document.getElementById('lbl-deploy') || document.getElementById('tab-deploy');
      if (deployBtn) deployBtn.click();
    };

    // Cancel existing loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    // Start canvas loop
    setTimeout(startSpaceLoop, 100);
  };

  // Tab Decorator
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'spacedevops') {
      window.renderSpaceDevops(document.getElementById('left-body'));
    } else {
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
