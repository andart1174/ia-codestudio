(function() {
  'use strict';

  const T = {
    en: {
      title: "🥽 Spatial UI Simulator",
      desc: "Simulate Spatial Computing & Apple Vision Pro layouts directly in the browser.",
      pitch: "Pitch (Rotation X)",
      yaw: "Yaw (Rotation Y)",
      distance: "Distance (Depth Z)",
      perspective: "Perspective (FOV)",
      glassBlur: "Glass Blur Intensity",
      gaze: "👁️ Eye-Gaze Hover Highlights",
      presets: "Presets",
      presetVision: "🕶️ Apple Vision Pro Mode",
      presetCurved: "🖥️ Curved Screen",
      presetFloat: "🌌 Space Floating Panel",
      presetReset: "↺ Reset Stage",
      active: "Active",
      inactive: "Inactive",
      controls: "3D Spatial Controls",
      appearance: "Appearance & Depth",
      gazeActiveToast: "Eye-Gaze simulation enabled in preview!"
    },
    fr: {
      title: "🥽 Simulateur d'UI Spatiale",
      desc: "Simulez le comportement spatial & l'Apple Vision Pro directement dans le browser.",
      pitch: "Tangage (Rotation X)",
      yaw: "Lacet (Rotation Y)",
      distance: "Distance (Profondeur Z)",
      perspective: "Perspective (FOV)",
      glassBlur: "Intensité du Flou Verre",
      gaze: "👁️ Surbrillance Regard (Gaze Hover)",
      presets: "Préréglages",
      presetVision: "🕶️ Mode Apple Vision Pro",
      presetCurved: "🖥️ Écran Incurvé",
      presetFloat: "🌌 Panneau Flottant Spatiale",
      presetReset: "↺ Réinitialiser la Scène",
      active: "Actif",
      inactive: "Inactif",
      controls: "Contrôles Spatiaux 3D",
      appearance: "Apparence & Profondeur",
      gazeActiveToast: "Simulation du regard activée dans l'aperçu !"
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // State
  let rx = 0;   // Rotation X
  let ry = 0;   // Rotation Y
  let tz = 0;   // Translate Z (Distance)
  let fov = 2000; // Perspective
  let blur = 0;   // Glass overlay blur
  let gazeEnabled = false;

  // Insert gaze highlights into iframe doc
  function updateIframeGaze() {
    const iframe = document.getElementById('preview-iframe');
    if (!iframe) return;
    try {
      const doc = iframe.contentWindow.document;
      let style = doc.getElementById('spatial-gaze-style');
      if (!gazeEnabled) {
        if (style) style.remove();
        return;
      }
      if (!style) {
        style = doc.createElement('style');
        style.id = 'spatial-gaze-style';
        doc.head.appendChild(style);
      }
      style.innerHTML = `
        * {
          transition: outline 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important;
        }
        *:hover {
          outline: 2px solid rgba(244, 114, 182, 0.8) !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 15px rgba(244, 114, 182, 0.4), inset 0 0 5px rgba(244, 114, 182, 0.2) !important;
          transform: translateZ(5px) scale(1.01) !important;
        }
      `;
    } catch (e) {
      // Cross-origin issues when loaded externally
    }
  }

  // Listen to frame loads to inject gaze style
  window.addEventListener('message', function(e) {
    if (e.data === 'preview-ready' || e.data === 'preview-loaded') {
      setTimeout(updateIframeGaze, 300);
    }
  });
  
  // Also hook into runPreview if available
  const origRunPreview = window.runPreview;
  window.runPreview = function() {
    if (origRunPreview) origRunPreview();
    setTimeout(updateIframeGaze, 400);
  };

  function applyTransform() {
    const wrap = document.getElementById('preview-frame-wrap');
    const viewport = document.querySelector('.preview-viewport');
    if (!wrap) return;

    if (viewport) {
      viewport.style.perspective = `${fov}px`;
      viewport.style.transformStyle = 'preserve-3d';
      viewport.style.overflow = 'visible';
    }

    wrap.style.transformStyle = 'preserve-3d';
    wrap.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s, backdrop-filter 0.3s';
    wrap.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;

    // Glass overlay & blur
    if (blur > 0) {
      wrap.style.boxShadow = `0 30px 70px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 255, 255, 0.15), 0 0 0 ${blur}px rgba(255,255,255,0.03)`;
      wrap.style.backdropFilter = `blur(${blur}px)`;
      wrap.style.background = 'rgba(255, 255, 255, 0.02)';
      wrap.style.border = '1px solid rgba(255, 255, 255, 0.12)';
      wrap.style.borderRadius = '16px';
    } else {
      wrap.style.boxShadow = '';
      wrap.style.backdropFilter = '';
      wrap.style.background = '';
      wrap.style.border = '';
      wrap.style.borderRadius = '';
    }
  }

  function setPreset(preset) {
    gazeEnabled = false;
    switch(preset) {
      case 'vision':
        rx = 12;
        ry = -16;
        tz = -200;
        fov = 1800;
        blur = 12;
        gazeEnabled = true;
        break;
      case 'curved':
        rx = 5;
        ry = -22;
        tz = -100;
        fov = 1200;
        blur = 0;
        break;
      case 'float':
        rx = 18;
        ry = 0;
        tz = -350;
        fov = 2200;
        blur = 20;
        break;
      case 'reset':
      default:
        rx = 0;
        ry = 0;
        tz = 0;
        fov = 2000;
        blur = 0;
        break;
    }

    // Update controls UI
    document.getElementById('sp-rx').value = rx;
    document.getElementById('sp-rx-val').textContent = rx + '°';
    document.getElementById('sp-ry').value = ry;
    document.getElementById('sp-ry-val').textContent = ry + '°';
    document.getElementById('sp-tz').value = tz;
    document.getElementById('sp-tz-val').textContent = tz + 'px';
    document.getElementById('sp-fov').value = fov;
    document.getElementById('sp-fov-val').textContent = fov + 'px';
    document.getElementById('sp-blur').value = blur;
    document.getElementById('sp-blur-val').textContent = blur + 'px';

    const gazeBtn = document.getElementById('sp-gaze-toggle');
    if (gazeBtn) {
      gazeBtn.textContent = gazeEnabled ? t('active') : t('inactive');
      gazeBtn.className = gazeEnabled ? 'sm-btn green-btn' : 'sm-btn border-btn';
    }

    applyTransform();
    updateIframeGaze();
  }

  window.renderSpatialUi = function(container) {
    if (!container) return;
    
    // Check if right viewport needs reset styles
    const wrap = document.getElementById('preview-frame-wrap');
    if (wrap) {
      // Auto-toggle preview open if collapsed
      const rightPanel = document.querySelector('.right-panel');
      if (rightPanel && rightPanel.classList.contains('collapsed')) {
        const toggleBtn = document.getElementById('toggle-right');
        if (toggleBtn) toggleBtn.click();
      }
    }

    container.innerHTML = `
      <div style="padding: 10px 4px; font-family: 'Inter', sans-serif; color: #f1f5f9; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #60a5fa, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 🚀 PRESETS SECTION -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 14px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
            ⚡ ${t('presets')}
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <button id="pres-vision" class="sm-btn glass-btn" style="font-weight: 700; font-size: 11px; padding: 10px;">
              ${t('presetVision')}
            </button>
            <button id="pres-curved" class="sm-btn glass-btn" style="font-weight: 700; font-size: 11px; padding: 10px;">
              ${t('presetCurved')}
            </button>
            <button id="pres-float" class="sm-btn glass-btn" style="font-weight: 700; font-size: 11px; padding: 10px;">
              ${t('presetFloat')}
            </button>
            <button id="pres-reset" class="sm-btn red-btn" style="font-weight: 700; font-size: 11px; padding: 10px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171;">
              ${t('presetReset')}
            </button>
          </div>
        </div>

        <!-- 🎛️ CONTROLS SECTION -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
            🛠️ ${t('controls')}
          </div>
          
          <!-- Pitch Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
              <span>${t('pitch')}</span>
              <span id="sp-rx-val" style="color: #60a5fa;">${rx}°</span>
            </div>
            <input type="range" id="sp-rx" min="-45" max="45" value="${rx}" style="width: 100%; accent-color: #60a5fa;" />
          </div>

          <!-- Yaw Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
              <span>${t('yaw')}</span>
              <span id="sp-ry-val" style="color: #60a5fa;">${ry}°</span>
            </div>
            <input type="range" id="sp-ry" min="-45" max="45" value="${ry}" style="width: 100%; accent-color: #60a5fa;" />
          </div>

          <!-- Distance Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
              <span>${t('distance')}</span>
              <span id="sp-tz-val" style="color: #c084fc;">${tz}px</span>
            </div>
            <input type="range" id="sp-tz" min="-1200" max="0" value="${tz}" style="width: 100%; accent-color: #c084fc;" />
          </div>

          <!-- Perspective Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
              <span>${t('perspective')}</span>
              <span id="sp-fov-val" style="color: #c084fc;">${fov}px</span>
            </div>
            <input type="range" id="sp-fov" min="800" max="4000" value="${fov}" style="width: 100%; accent-color: #c084fc;" />
          </div>
        </div>

        <!-- 👁️ EYE TRACKING & APPEARANCE -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
            🌌 ${t('appearance')}
          </div>

          <!-- Glass Blur Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600;">
              <span>${t('glassBlur')}</span>
              <span id="sp-blur-val" style="color: #fb7185;">${blur}px</span>
            </div>
            <input type="range" id="sp-blur" min="0" max="40" value="${blur}" style="width: 100%; accent-color: #fb7185;" />
          </div>

          <!-- Eye-Gaze Toggle -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
            <div style="display: flex; flex-direction: column; gap: 4px; max-width: 70%;">
              <span style="font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                ${t('gaze')}
              </span>
              <span style="font-size: 10px; color: #64748b;">Highlights elements on hover with eye-tracking borders.</span>
            </div>
            <button id="sp-gaze-toggle" class="sm-btn ${gazeEnabled ? 'green-btn' : 'border-btn'}" style="font-weight: 800; padding: 8px 16px;">
              ${gazeEnabled ? t('active') : t('inactive')}
            </button>
          </div>
        </div>
      </div>
    `;

    // Hook listeners
    document.getElementById('sp-rx').oninput = function(e) {
      rx = parseInt(e.target.value);
      document.getElementById('sp-rx-val').textContent = rx + '°';
      applyTransform();
    };
    document.getElementById('sp-ry').oninput = function(e) {
      ry = parseInt(e.target.value);
      document.getElementById('sp-ry-val').textContent = ry + '°';
      applyTransform();
    };
    document.getElementById('sp-tz').oninput = function(e) {
      tz = parseInt(e.target.value);
      document.getElementById('sp-tz-val').textContent = tz + 'px';
      applyTransform();
    };
    document.getElementById('sp-fov').oninput = function(e) {
      fov = parseInt(e.target.value);
      document.getElementById('sp-fov-val').textContent = fov + 'px';
      applyTransform();
    };
    document.getElementById('sp-blur').oninput = function(e) {
      blur = parseInt(e.target.value);
      document.getElementById('sp-blur-val').textContent = blur + 'px';
      applyTransform();
    };

    document.getElementById('sp-gaze-toggle').onclick = function() {
      gazeEnabled = !gazeEnabled;
      this.textContent = gazeEnabled ? t('active') : t('inactive');
      this.className = gazeEnabled ? 'sm-btn green-btn' : 'sm-btn border-btn';
      if (gazeEnabled && window.showToast) {
        window.showToast(t('gazeActiveToast'));
      }
      updateIframeGaze();
    };

    // Preset buttons
    document.getElementById('pres-vision').onclick = () => setPreset('vision');
    document.getElementById('pres-curved').onclick = () => setPreset('curved');
    document.getElementById('pres-float').onclick = () => setPreset('float');
    document.getElementById('pres-reset').onclick = () => setPreset('reset');

    // Run first apply
    applyTransform();
  };

  // Standard tab decorator routing
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'spatialui') {
      window.renderSpatialUi(document.getElementById('left-body'));
    } else {
      // Clear 3D rotations when navigating to other tabs (keeps regular preview safe)
      if (tab !== 'spatialui') {
        const wrap = document.getElementById('preview-frame-wrap');
        if (wrap) {
          wrap.style.transform = '';
          wrap.style.boxShadow = '';
          wrap.style.backdropFilter = '';
          wrap.style.background = '';
          wrap.style.border = '';
          wrap.style.borderRadius = '';
        }
        gazeEnabled = false;
        updateIframeGaze();
      }
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
