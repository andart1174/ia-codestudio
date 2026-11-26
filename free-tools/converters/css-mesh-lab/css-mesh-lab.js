// CSS Mesh Gradient, Smooth Layered Shadow & Animated Neon Border Lab (v2.0)

const MESH_PRESETS = {
  cyber: {
    base: '#070b18',
    orbs: [
      { color: '#00f0ff', x: 18, y: 22, spread: 54 },
      { color: '#8a2be2', x: 82, y: 28, spread: 58 },
      { color: '#ec4899', x: 75, y: 84, spread: 52 },
      { color: '#2563eb', x: 20, y: 82, spread: 55 }
    ]
  },
  stripe: {
    base: '#0f172a',
    orbs: [
      { color: '#6366f1', x: 15, y: 15, spread: 58 },
      { color: '#a855f7', x: 85, y: 20, spread: 54 },
      { color: '#38bdf8', x: 78, y: 82, spread: 50 },
      { color: '#f43f5e', x: 24, y: 80, spread: 48 }
    ]
  },
  ocean: {
    base: '#04121f',
    orbs: [
      { color: '#06b6d4', x: 22, y: 25, spread: 56 },
      { color: '#0ea5e9', x: 76, y: 18, spread: 52 },
      { color: '#14b8a6', x: 70, y: 80, spread: 56 },
      { color: '#1d4ed8', x: 18, y: 78, spread: 54 }
    ]
  },
  solar: {
    base: '#17080d',
    orbs: [
      { color: '#f97316', x: 20, y: 25, spread: 56 },
      { color: '#ef4444', x: 82, y: 24, spread: 52 },
      { color: '#f59e0b', x: 72, y: 82, spread: 54 },
      { color: '#db2777', x: 24, y: 82, spread: 52 }
    ]
  },
  emerald: {
    base: '#041410',
    orbs: [
      { color: '#10b981', x: 20, y: 20, spread: 56 },
      { color: '#22c55e', x: 80, y: 26, spread: 52 },
      { color: '#06b6d4', x: 75, y: 82, spread: 54 },
      { color: '#84cc16', x: 22, y: 84, spread: 48 }
    ]
  }
};

function hexToRgbTuple(hex) {
  const h = String(hex || '#000000').replace('#', '');
  const full = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  return [
    parseInt(full.slice(0, 2), 16) || 0,
    parseInt(full.slice(2, 4), 16) || 0,
    parseInt(full.slice(4, 6), 16) || 0
  ];
}

function buildMeshCss(base, orbs, format) {
  const layers = orbs.map(o => `radial-gradient(at ${o.x}% ${o.y}%, ${o.color} 0px, transparent ${o.spread}%)`);
  const bgValue = layers.join(',\n    ');
  if (format === 'tailwind') {
    const compact = layers.join(',').replace(/\s+/g, '_');
    return `<!-- Tailwind Arbitrary Value Mesh Background -->\n<div class="bg-[${base}] [background-image:${compact}] rounded-2xl p-8"></div>`;
  }
  return `.mesh-gradient {\n  background-color: ${base};\n  background-image:\n    ${bgValue};\n}`;
}

function buildSmoothShadowCss(opts, format) {
  const layers = Math.max(2, Math.min(6, parseInt(opts.layers, 10) || 5));
  const maxY = parseFloat(opts.y) || 36;
  const maxBlur = parseFloat(opts.blur) || 64;
  const maxAlpha = (parseFloat(opts.alpha) || 34) / 100;
  const [r, g, b] = hexToRgbTuple(opts.color || '#00f0ff');

  const shadows = [];
  for (let i = 1; i <= layers; i++) {
    const ratio = i / layers;
    const curve = Math.pow(ratio, 2.2);
    const y = Math.max(1, Math.round(maxY * curve));
    const blur = Math.max(2, Math.round(maxBlur * curve));
    const alpha = Math.max(0.02, (maxAlpha / layers) * (0.65 + ratio * 0.7)).toFixed(3);
    shadows.push(`0 ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${alpha})`);
  }
  const value = shadows.join(',\n    ');
  if (format === 'tailwind') {
    const compact = shadows.join(',').replace(/\s+/g, '_');
    return `<!-- Tailwind Arbitrary Smooth Shadow -->\n<div class="rounded-2xl shadow-[${compact}]"></div>`;
  }
  return `.smooth-shadow {\n  box-shadow:\n    ${value};\n}`;
}

function buildNeonBorderCss(opts, format) {
  const c1 = opts.c1 || '#00f0ff';
  const c2 = opts.c2 || '#a855f7';
  const w = parseInt(opts.width, 10) || 2;
  const radius = parseInt(opts.radius, 10) || 20;
  const speed = parseFloat(opts.speed) || 3.5;
  const glow = parseInt(opts.glow, 10) || 22;

  if (format === 'tailwind') {
    return `<!-- Tailwind + CSS @property Animated Neon Border -->\n<div class="relative p-[${w}px] rounded-[${radius}px] bg-[conic-gradient(from_var(--angle),${c1},${c2},transparent_55%,${c1})] animate-[spin-angle_${speed}s_linear_infinite]" style="box-shadow:0 0 ${glow}px ${c1}55">\n  <div class="rounded-[${Math.max(2, radius - w)}px] bg-[#0b1020] p-6 text-white">Content</div>\n</div>`;
  }
  return `@property --neon-angle {\n  syntax: '<angle>';\n  initial-value: 0deg;\n  inherits: false;\n}\n@keyframes neon-spin {\n  to { --neon-angle: 360deg; }\n}\n.neon-border-card {\n  padding: ${w}px;\n  border-radius: ${radius}px;\n  background: conic-gradient(from var(--neon-angle), ${c1}, ${c2}, transparent 55%, ${c1});\n  box-shadow: 0 0 ${glow}px ${c1}55;\n  animation: neon-spin ${speed}s linear infinite;\n}\n.neon-border-inner {\n  border-radius: ${Math.max(2, radius - w)}px;\n  background: #0b1020;\n  padding: 1.5rem;\n}`;
}

if (typeof window !== 'undefined') {
  window._meshLab = { buildMeshCss, buildSmoothShadowCss, buildNeonBorderCss };
}

document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('mesh-stage');
  const outputCode = document.getElementById('output-code');
  const orbContainer = document.getElementById('orb-controls');
  const meshBaseColor = document.getElementById('mesh-base-color');
  const meshGrain = document.getElementById('mesh-grain');

  const shLayers = document.getElementById('sh-layers');
  const shY = document.getElementById('sh-y');
  const shBlur = document.getElementById('sh-blur');
  const shAlpha = document.getElementById('sh-alpha');
  const shColor = document.getElementById('sh-color');
  const shBg = document.getElementById('sh-bg');

  const nbC1 = document.getElementById('nb-c1');
  const nbC2 = document.getElementById('nb-c2');
  const nbWidth = document.getElementById('nb-width');
  const nbRadius = document.getElementById('nb-radius');
  const nbSpeed = document.getElementById('nb-speed');
  const nbGlow = document.getElementById('nb-glow');

  const btnRandomize = document.getElementById('btn-randomize');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnDownloadCss = document.getElementById('btn-download-css');

  let mode = 'mesh';
  let format = 'css';
  let orbs = JSON.parse(JSON.stringify(MESH_PRESETS.cyber.orbs));

  function renderOrbControls() {
    orbContainer.innerHTML = '';
    orbs.forEach((orb, idx) => {
      const card = document.createElement('div');
      card.className = 'orb-card';
      card.innerHTML = `
        <div class="orb-head">
          <span style="font-family:var(--font-mono);font-size:0.78rem;color:#cbd5e1;">Orb #${idx + 1}</span>
          <input type="color" class="color-picker" data-orb="${idx}" data-prop="color" value="${orb.color}">
        </div>
        <div class="orb-sliders">
          <label>X: ${orb.x}%<input type="range" min="0" max="100" value="${orb.x}" data-orb="${idx}" data-prop="x"></label>
          <label>Y: ${orb.y}%<input type="range" min="0" max="100" value="${orb.y}" data-orb="${idx}" data-prop="y"></label>
        </div>
      `;
      orbContainer.appendChild(card);
    });

    orbContainer.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-orb'), 10);
        const prop = e.target.getAttribute('data-prop');
        orbs[idx][prop] = prop === 'color' ? e.target.value : parseInt(e.target.value, 10);
        if (prop === 'x' || prop === 'y') {
          e.target.parentElement.firstChild.textContent = `${prop.toUpperCase()}: ${orbs[idx][prop]}%`;
        }
        renderStageAndCode();
      });
    });
  }

  function renderStageAndCode() {
    stage.innerHTML = '';
    stage.style.background = '';
    stage.style.backgroundColor = '';

    if (mode === 'mesh') {
      const base = meshBaseColor.value;
      const bgImgs = orbs.map(o => `radial-gradient(at ${o.x}% ${o.y}%, ${o.color} 0px, transparent ${o.spread}%)`).join(', ');
      stage.style.backgroundColor = base;
      stage.style.backgroundImage = bgImgs;
      if (meshGrain.checked) {
        const grain = document.createElement('div');
        grain.className = 'mesh-noise-layer';
        stage.appendChild(grain);
      }
      const badge = document.createElement('div');
      badge.style.cssText = 'position:relative;z-index:2;padding:12px 22px;border-radius:14px;background:rgba(10,14,26,0.45);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.16);color:#fff;font-family:var(--font-mono);font-weight:700;font-size:0.95rem;';
      badge.textContent = 'Mesh Gradient Preview';
      stage.appendChild(badge);
      outputCode.value = buildMeshCss(base, orbs, format);
    } else if (mode === 'shadow') {
      stage.style.background = shBg.value;
      const css = buildSmoothShadowCss({
        layers: shLayers.value, y: shY.value, blur: shBlur.value, alpha: shAlpha.value, color: shColor.value
      }, format);
      const rawShadow = buildSmoothShadowCss({
        layers: shLayers.value, y: shY.value, blur: shBlur.value, alpha: shAlpha.value, color: shColor.value
      }, 'css').replace(/\.smooth-shadow\s*\{\s*box-shadow:\s*/, '').replace(/;\s*\}$/, '');

      const card = document.createElement('div');
      card.className = 'shadow-demo-card';
      card.style.boxShadow = rawShadow;
      card.innerHTML = `<span style="font-size:1.4rem;">🧊</span><strong>${shLayers.value}-Layer Shadow</strong><span style="font-size:0.75rem;color:#94a3b8;">Y:${shY.value}px • Blur:${shBlur.value}px</span>`;
      stage.appendChild(card);
      outputCode.value = css;
    } else {
      stage.style.background = 'radial-gradient(circle at 50% 45%, #11162c, #050508 80%)';
      const w = parseInt(nbWidth.value, 10);
      const r = parseInt(nbRadius.value, 10);
      const wrap = document.createElement('div');
      wrap.className = 'neon-demo-wrap';
      wrap.style.padding = `${w}px`;
      wrap.style.borderRadius = `${r}px`;
      wrap.style.setProperty('--neon-speed', `${nbSpeed.value}s`);
      wrap.style.background = `conic-gradient(from var(--ia-neon-angle), ${nbC1.value}, ${nbC2.value}, transparent 55%, ${nbC1.value})`;
      wrap.style.boxShadow = `0 0 ${nbGlow.value}px ${nbC1.value}55`;

      const inner = document.createElement('div');
      inner.className = 'neon-demo-inner';
      inner.style.borderRadius = `${Math.max(2, r - w)}px`;
      inner.innerHTML = `<span style="font-size:1.3rem;">⚡</span><strong>Neon Border</strong><span style="font-size:0.75rem;color:#94a3b8;">${nbSpeed.value}s • ${w}px</span>`;
      wrap.appendChild(inner);
      stage.appendChild(wrap);

      outputCode.value = buildNeonBorderCss({
        c1: nbC1.value, c2: nbC2.value, width: w, radius: r, speed: nbSpeed.value, glow: nbGlow.value
      }, format);
    }
  }

  // Mode switching
  document.querySelectorAll('#mesh-mode-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#mesh-mode-tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.getAttribute('data-mode');
      document.getElementById('panel-mode-mesh').style.display = mode === 'mesh' ? 'flex' : 'none';
      document.getElementById('panel-mode-shadow').style.display = mode === 'shadow' ? 'flex' : 'none';
      document.getElementById('panel-mode-border').style.display = mode === 'border' ? 'flex' : 'none';
      renderStageAndCode();
    });
  });

  // Format switching
  document.querySelectorAll('#mesh-format-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#mesh-format-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      format = btn.getAttribute('data-fmt');
      renderStageAndCode();
    });
  });

  // Presets
  document.querySelectorAll('#mesh-presets .preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#mesh-presets .preset-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = MESH_PRESETS[btn.getAttribute('data-preset')];
      if (!p) return;
      meshBaseColor.value = p.base;
      orbs = JSON.parse(JSON.stringify(p.orbs));
      renderOrbControls();
      renderStageAndCode();
    });
  });

  // Randomize vibrant palette
  btnRandomize.addEventListener('click', () => {
    const randHex = () => {
      const h = Math.floor(Math.random() * 360);
      const s = 75 + Math.floor(Math.random() * 20);
      const l = 52 + Math.floor(Math.random() * 14);
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
        const col = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * col).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    if (mode === 'mesh') {
      orbs = orbs.map(o => ({
        color: randHex(),
        x: 10 + Math.floor(Math.random() * 80),
        y: 10 + Math.floor(Math.random() * 80),
        spread: 46 + Math.floor(Math.random() * 18)
      }));
      renderOrbControls();
    } else if (mode === 'shadow') {
      shColor.value = randHex();
    } else {
      nbC1.value = randHex();
      nbC2.value = randHex();
    }
    renderStageAndCode();
  });

  [meshBaseColor, meshGrain, shLayers, shY, shBlur, shAlpha, shColor, shBg, nbC1, nbC2, nbWidth, nbRadius, nbSpeed, nbGlow]
    .forEach(el => { if (el) el.addEventListener('input', renderStageAndCode); });

  btnCopyCode.addEventListener('click', () => {
    const msg = (translations[currentLang] && translations[currentLang].success_copy) || 'Copied!';
    window.HubUtils.copyText(outputCode.value, msg);
  });

  btnDownloadCss.addEventListener('click', () => {
    const ext = format === 'tailwind' ? 'html' : 'css';
    window.HubUtils.safeDownloadText(outputCode.value, `ia-mesh-${mode}.${ext}`, ext === 'css' ? 'text/css;charset=utf-8' : 'text/html;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? `📥 Exported .${ext.toUpperCase()}!` : `📥 Fichier .${ext.toUpperCase()} téléchargé !`, 'success');
  });

  renderOrbControls();
  renderStageAndCode();
});
