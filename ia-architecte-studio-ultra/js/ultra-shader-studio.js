// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — ULTRA RAYMARCHING & SHADER FX STUDIO (v1.0)
// UltraShaderStudio (modal-shader-studio)
// 100% Client-Side Procedural GLSL Shaders · Zero External Files · Real-Time WebGL
// 6 Masterpiece Shaders · Interactive Mouse & Palette Controls · 1-Click App Injection
// ══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function _isFr() {
    return (typeof currentLang !== 'undefined' && currentLang === 'fr');
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg);
    } else if (typeof window.showToast === 'function') {
      window.showToast(msg);
    } else {
      console.log('[UltraShaderStudio]', msg);
    }
  }

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && UltraSoundFX.play) {
      try { UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _confetti() {
    if (typeof UltraConfetti !== 'undefined' && UltraConfetti.fire) {
      try { UltraConfetti.fire(40); } catch(e){}
    }
  }

  function _injectCodeToActiveApp(snippet, markerRegex, label) {
    const isFr = _isFr();
    const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

    if (targetApp && targetApp.html !== undefined) {
      if (markerRegex) {
        targetApp.html = targetApp.html.replace(markerRegex, '');
      }
      targetApp.html = targetApp.html.trim() + '\n\n' + snippet;

      if (targetApp.editor) {
        try {
          if (targetApp.currentTab === 'html' || !targetApp.currentTab) {
            targetApp.editor.setValue(targetApp.html);
          }
        } catch(e){}
      }

      if (typeof window.refreshPreview === 'function') {
        window.refreshPreview();
      } else if (typeof refreshPreview === 'function') {
        refreshPreview();
      }

      _sound('celebrate');
      _confetti();
      _toast(isFr ? ('✨ ' + label + ' injecté avec succès dans votre application !') : ('✨ ' + label + ' injected successfully into your application!'), 'success');
      return true;
    } else {
      _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
      return false;
    }
  }

  async function _copyCode(text, label) {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy ' + (label || 'Code'))) return;
    const isFr = _isFr();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      _sound('click');
      _toast(isFr ? ('📋 Code ' + label + ' copié dans le presse-papiers !') : ('📋 ' + label + ' code copied to clipboard!'), 'success');
    } catch(err) {
      _toast(isFr ? 'Erreur lors de la copie.' : 'Failed to copy code.', 'error');
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // GLSL SHADER SOURCES (Pure Client-Side WebGL Raymarching & Fragment Shaders)
  // ══════════════════════════════════════════════════════════════════════════════
  const VS_SOURCE = `attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

  const SHADERS = {
    // 1. Organic Neon Fluid / Metaballs
    liquid: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * u_speed * 0.8;
  vec2 m = (u_mouse - 0.5 * u_res) / min(u_res.x, u_res.y);
  
  float d = 0.0;
  for (float i = 1.0; i <= 6.0; i += 1.0) {
    vec2 p = vec2(sin(t * 0.7 * i + i * 1.5) * 0.45, cos(t * 0.5 * i + i * 2.1) * 0.35);
    p += m * 0.25 * sin(t + i);
    d += 0.065 / length(uv - p);
  }
  
  float edge = smoothstep(0.9, 1.3, d);
  float glow = smoothstep(0.4, 1.8, d);
  vec3 col = mix(u_colorA, u_colorB, sin(d * 3.0 + t) * 0.5 + 0.5) * edge;
  col += u_colorA * glow * 0.45;
  col += vec3(pow(d * 0.35, 3.0)) * 0.3;
  gl_FragColor = vec4(col, 1.0);
}`,

    // 2. Cyberpunk ASCII Matrix Digital Rain
    matrix: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * u_speed * 1.5;
  
  vec2 grid = vec2(60.0, 30.0);
  vec2 ipos = floor(uv * grid);
  vec2 fpos = fract(uv * grid);
  
  float rain = fract(t * 0.8 + hash(vec2(ipos.x, 0.0)));
  float trail = smoothstep(1.0, 0.0, (ipos.y / grid.y) - rain);
  if (rain < (ipos.y / grid.y)) trail += smoothstep(1.0, 0.0, (ipos.y / grid.y) - rain - 1.0);
  
  float charPattern = step(0.35, hash(ipos + floor(t * 6.0)));
  float glyph = charPattern * (1.0 - length(fpos - 0.5) * 1.6);
  glyph = clamp(glyph, 0.0, 1.0);
  
  vec3 col = mix(u_colorB, u_colorA, trail);
  col *= glyph * trail * 2.2;
  
  col *= 0.8 + 0.2 * sin(gl_FragCoord.y * 1.5);
  gl_FragColor = vec4(col, 1.0);
}`,

    // 3. Volumetric 3D Mandelbulb Fractal Raymarching
    mandelbulb: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

float map(vec3 p) {
  vec3 w = p;
  float m = dot(w, w);
  float dz = 1.0;
  float power = 8.0 + sin(u_time * u_speed * 0.5) * 1.5;
  
  for (int i = 0; i < 4; i++) {
    dz = power * pow(sqrt(m), power - 1.0) * dz + 1.0;
    float r = length(w);
    float b = power * acos(clamp(w.y / r, -1.0, 1.0));
    float a = power * atan(w.x, w.z);
    w = p + pow(r, power) * vec3(sin(b) * sin(a), cos(b), sin(b) * cos(a));
    m = dot(w, w);
    if (m > 4.0) break;
  }
  return 0.25 * log(m) * sqrt(m) / dz;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float rot = u_time * u_speed * 0.3;
  vec3 ro = vec3(sin(rot) * 2.5, 0.5, cos(rot) * 2.5);
  vec3 ta = vec3(0.0);
  vec3 ww = normalize(ta - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = normalize(cross(uu, ww));
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.4 * ww);
  
  float t = 0.0;
  float d = 0.0;
  for (int i = 0; i < 40; i++) {
    d = map(ro + rd * t);
    if (d < 0.005 || t > 5.0) break;
    t += d;
  }
  
  vec3 col = vec3(0.02, 0.03, 0.06);
  if (t < 5.0) {
    float occ = clamp(1.0 - float(d) * 15.0, 0.0, 1.0);
    col = mix(u_colorA, u_colorB, clamp(t * 0.4, 0.0, 1.0));
    col *= (1.0 - t / 5.0) * 1.8;
  }
  gl_FragColor = vec4(col, 1.0);
}`,

    // 4. Relativistic Hyperspace Wormhole Tunnel
    wormhole: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float t = u_time * u_speed * 1.2;
  
  float depth = 1.0 / (r + 0.05) + t * 2.0;
  float angle = a * 4.0 / 3.14159 + sin(depth * 0.4);
  
  float pattern = sin(depth * 3.0) * cos(angle * 3.0);
  pattern = smoothstep(0.1, 0.8, abs(pattern));
  
  vec3 col = mix(u_colorA, u_colorB, sin(depth * 0.5) * 0.5 + 0.5);
  col *= pattern * (1.0 - r * 0.45);
  col += u_colorB * smoothstep(0.35, 0.0, r) * 1.6;
  gl_FragColor = vec4(col, 1.0);
}`,

    // 5. Cosmic Volumetric Deep-Space Nebula
    nebula: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453;
  float b = sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453;
  float c = sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
  float d = sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453;
  return mix(mix(fract(a), fract(b), f.x), mix(fract(c), fract(d), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * u_speed * 0.2;
  
  vec2 q = vec2(fbm(uv + vec2(0.0, t * 0.5)), fbm(uv + vec2(t * 0.4, 0.0)));
  vec2 r = vec2(fbm(uv + 4.0 * q + vec2(t * 0.3, t * 0.2)), fbm(uv + 4.0 * q + vec2(t * 0.1, t * 0.4)));
  float f = fbm(uv + 4.0 * r);
  
  vec3 col = mix(vec3(0.02, 0.01, 0.05), u_colorA, clamp(f * f * 2.5, 0.0, 1.0));
  col = mix(col, u_colorB, clamp(length(q) * 0.9, 0.0, 1.0));
  col = mix(col, vec3(1.0), clamp(pow(r.x, 3.0) * 0.6, 0.0, 1.0));
  
  gl_FragColor = vec4(col, 1.0);
}`,

    // 6. Retro Synthwave Neon Wireframe Grid Sun
    synthwave: `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float t = u_time * u_speed * 1.5;
  vec3 col = vec3(0.04, 0.02, 0.08);
  
  // Neon Sun
  vec2 sunPos = vec2(0.0, 0.15);
  float sunDist = length(uv - sunPos);
  if (sunDist < 0.38) {
    float sunBars = sin(uv.y * 50.0);
    if (uv.y > sunPos.y || sunBars > -0.2) {
      col = mix(vec3(1.0, 0.8, 0.2), vec3(1.0, 0.1, 0.5), (uv.y - sunPos.y + 0.38) / 0.76);
    }
  }
  col += vec3(1.0, 0.2, 0.6) * (0.05 / (sunDist + 0.08));
  
  // 3D Perspective Ground Grid
  if (uv.y < 0.0) {
    vec3 ro = vec3(0.0, 1.0, t);
    vec3 rd = normalize(vec3(uv.x, uv.y, 1.0));
    float dist = -ro.y / rd.y;
    vec3 hit = ro + rd * dist;
    
    vec2 grid = abs(fract(hit.xz) - 0.5);
    float line = smoothstep(0.46, 0.5, max(grid.x, grid.y));
    
    vec3 gridCol = mix(u_colorA, u_colorB, hit.z * 0.05);
    col = mix(col, gridCol, line * clamp(1.0 - dist * 0.04, 0.0, 1.0));
  }
  
  gl_FragColor = vec4(col, 1.0);
}`
  };

  const PALETTES = {
    cyberpunk: { a: [0.22, 0.74, 0.97], b: [0.66, 0.33, 0.97], name: 'Cyberpunk Neon' },
    matrix:    { a: [0.06, 0.92, 0.45], b: [0.02, 0.45, 0.22], name: 'Matrix Emerald' },
    solar:     { a: [0.96, 0.62, 0.04], b: [0.94, 0.24, 0.37], name: 'Solar Flare' },
    ice:       { a: [0.02, 0.82, 0.85], b: [0.45, 0.65, 0.95], name: 'Ice Cavern' },
    vaporwave: { a: [0.92, 0.28, 0.60], b: [0.22, 0.74, 0.97], name: 'Vaporwave Sunset' }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // CORE SHADER STUDIO OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraShaderStudio = {
    state: {
      activeShader: 'liquid',
      activePalette: 'cyberpunk',
      speed: 1.0,
      resolutionScale: 1.0,
      mouseInteractive: true,
      animating: false
    },

    glData: {
      gl: null,
      program: null,
      positionBuffer: null,
      canvas: null,
      animId: null,
      mousePos: { x: 300, y: 200 },
      startTime: 0,
      uniforms: {}
    },

    shadersMeta: {
      liquid: {
        nameEn: 'Organic Neon Fluid Metaballs',
        nameFr: 'Fluide Organique Néon Métaballs',
        icon: '🫧',
        descEn: 'Real-time raymarched viscous metaballs with chromatic caustics and interactive cursor dynamics.',
        descFr: 'Métaballes visqueuses raymarchées en temps réel avec caustiques chromatiques et dynamique au curseur.'
      },
      matrix: {
        nameEn: 'Cyberpunk ASCII Matrix Terminal',
        nameFr: 'Terminal ASCII Matrix Cyberpunk',
        icon: '💻',
        descEn: 'High-speed digital glyph rain with phosphor persistence, scanline quantization, and cyber bloom.',
        descFr: 'Pluie de glyphes numériques à grande vitesse avec persistance phosphore et scanlines holographiques.'
      },
      mandelbulb: {
        nameEn: 'Volumetric 3D Mandelbulb Fractal',
        nameFr: 'Fractale 3D Volumétrique Mandelbulb',
        icon: '🔮',
        descEn: 'True 3D Mandelbulb raymarching with trigonometric hyper-power modulation and distance estimation.',
        descFr: 'Raymarching 3D Mandelbulb authentique avec modulation trigonométrique et estimation de distance.'
      },
      wormhole: {
        nameEn: 'Relativistic Wormhole Warp Tunnel',
        nameFr: 'Tunnel de Ver Relativiste Hyperspatial',
        icon: '🌀',
        descEn: 'Infinite logarithmic tunnel warp with Doppler shifts, gravitational curvature, and core flare.',
        descFr: 'Distorsion de tunnel logarithmique infini avec décalage Doppler et courbure gravitationnelle.'
      },
      nebula: {
        nameEn: 'Deep-Space Cosmic Gas Nebula',
        nameFr: 'Nébuleuse Gazeuse Cosmique Profonde',
        icon: '🌌',
        descEn: 'Multi-octave Fractional Brownian Motion (fBm) turbulence simulating stellar interstellar gas clouds.',
        descFr: 'Turbulence fBm multi-octaves simulant les nuages de gaz interstellaires et la matière cosmique.'
      },
      synthwave: {
        nameEn: '80s Synthwave Wireframe Horizon Sun',
        nameFr: 'Horizon Synthwave Rétro 80s avec Soleil Néon',
        icon: '🌅',
        descEn: 'Perspective raytraced ground grid with infinite speed forward scroll and neon segmented solar orb.',
        descFr: 'Grille au sol en perspective fil de fer rétro avec défilement infini et orbe solaire néon segmenté.'
      }
    },

    open: function() {
      const modal = document.getElementById('modal-shader-studio');
      if (modal) {
        modal.classList.add('show', 'active');
        _sound('click');
        setTimeout(() => {
          this.initGL();
          this.resizeCanvas();
          this.updateUi();
        }, 60);
      }
    },

    close: function() {
      const modal = document.getElementById('modal-shader-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        this.pauseLoop();
      }
    },

    initGL: function() {
      const container = document.getElementById('shader-canvas-container');
      if (!container) return;

      if (!this.glData.canvas) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(canvas);
        this.glData.canvas = canvas;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.error('[UltraShaderStudio] WebGL not supported');
          return;
        }
        this.glData.gl = gl;

        // Quad geometry
        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1
        ]), gl.STATIC_DRAW);
        this.glData.positionBuffer = posBuffer;

        // Mouse tracking
        container.addEventListener('mousemove', e => {
          if (!this.state.mouseInteractive) return;
          const rect = container.getBoundingClientRect();
          this.glData.mousePos.x = e.clientX - rect.left;
          this.glData.mousePos.y = rect.height - (e.clientY - rect.top);
        });

        window.addEventListener('resize', () => this.resizeCanvas());
      }

      this.compileCurrentShader();
      this.startLoop();
    },

    resizeCanvas: function() {
      const container = document.getElementById('shader-canvas-container');
      const canvas = this.glData.canvas;
      const gl = this.glData.gl;
      if (!container || !canvas || !gl) return;

      const w = container.clientWidth || 600;
      const h = container.clientHeight || 420;
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * this.state.resolutionScale;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },

    compileCurrentShader: function() {
      const gl = this.glData.gl;
      if (!gl) return;

      const fsSrc = SHADERS[this.state.activeShader] || SHADERS.liquid;

      // Compile vertex shader
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, VS_SOURCE);
      gl.compileShader(vs);

      // Compile fragment shader
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSrc);
      gl.compileShader(fs);

      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error('[UltraShaderStudio] FS compile error:', gl.getShaderInfoLog(fs));
        return;
      }

      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('[UltraShaderStudio] Program link error:', gl.getProgramInfoLog(prog));
        return;
      }

      this.glData.program = prog;
      gl.useProgram(prog);

      // Bind quad
      const posAttr = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(posAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.glData.positionBuffer);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      // Uniforms
      this.glData.uniforms = {
        res: gl.getUniformLocation(prog, 'u_res'),
        time: gl.getUniformLocation(prog, 'u_time'),
        mouse: gl.getUniformLocation(prog, 'u_mouse'),
        colorA: gl.getUniformLocation(prog, 'u_colorA'),
        colorB: gl.getUniformLocation(prog, 'u_colorB'),
        speed: gl.getUniformLocation(prog, 'u_speed')
      };

      this.glData.startTime = performance.now();
    },

    startLoop: function() {
      if (this.state.animating) return;
      this.state.animating = true;

      const render = () => {
        if (!this.state.animating) return;
        this.glData.animId = requestAnimationFrame(render);
        this.renderFrame();
      };
      render();
    },

    pauseLoop: function() {
      this.state.animating = false;
      if (this.glData.animId) {
        cancelAnimationFrame(this.glData.animId);
        this.glData.animId = null;
      }
    },

    renderFrame: function() {
      const gl = this.glData.gl;
      const prog = this.glData.program;
      const canvas = this.glData.canvas;
      if (!gl || !prog || !canvas) return;

      gl.useProgram(prog);

      const time = (performance.now() - this.glData.startTime) * 0.001;
      const pal = PALETTES[this.state.activePalette] || PALETTES.cyberpunk;
      const u = this.glData.uniforms;

      if (u.res) gl.uniform2f(u.res, canvas.width, canvas.height);
      if (u.time) gl.uniform1f(u.time, time);
      if (u.mouse) gl.uniform2f(u.mouse, this.glData.mousePos.x, this.glData.mousePos.y);
      if (u.colorA) gl.uniform3f(u.colorA, pal.a[0], pal.a[1], pal.a[2]);
      if (u.colorB) gl.uniform3f(u.colorB, pal.b[0], pal.b[1], pal.b[2]);
      if (u.speed) gl.uniform1f(u.speed, this.state.speed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },

    setShader: function(name) {
      if (!SHADERS[name]) return;
      this.state.activeShader = name;
      _sound('click');
      this.compileCurrentShader();
      this.updateUi();
    },

    setPalette: function(pal) {
      if (!PALETTES[pal]) return;
      this.state.activePalette = pal;
      _sound('click');
      this.updateUi();
    },

    setSpeed: function(val) {
      this.state.speed = parseFloat(val);
      const lbl = document.getElementById('shader-val-speed');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(1) + 'x';
    },

    toggleMouseInteractive: function() {
      this.state.mouseInteractive = !this.state.mouseInteractive;
      _sound('click');
      this.updateUi();
    },

    updateUi: function() {
      const isFr = _isFr();
      const meta = this.shadersMeta[this.state.activeShader];

      // Shader buttons
      document.querySelectorAll('.shader-btn').forEach(btn => {
        const s = btn.getAttribute('data-shader');
        if (s === this.state.activeShader) {
          btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(168,85,247,0.25))';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#fff';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.08)';
          btn.style.color = '#94a3b8';
        }
      });

      // Palette buttons
      document.querySelectorAll('.shader-pal-btn').forEach(btn => {
        const p = btn.getAttribute('data-pal');
        if (p === this.state.activePalette) {
          btn.style.borderColor = '#ec4899';
          btn.style.boxShadow = '0 0 10px rgba(236,72,153,0.5)';
        } else {
          btn.style.borderColor = 'rgba(255,255,255,0.15)';
          btn.style.boxShadow = 'none';
        }
      });

      // Meta info
      const titleEl = document.getElementById('shader-name-display');
      if (titleEl && meta) titleEl.textContent = (meta.icon || '🌈') + ' ' + (isFr ? meta.nameFr : meta.nameEn);

      const descEl = document.getElementById('shader-desc-display');
      if (descEl && meta) descEl.textContent = isFr ? meta.descFr : meta.descEn;

      // Mouse interactive toggle
      const mBtn = document.getElementById('shader-btn-mouse');
      if (mBtn) {
        mBtn.style.borderColor = this.state.mouseInteractive ? '#10b981' : 'rgba(255,255,255,0.15)';
        mBtn.style.color = this.state.mouseInteractive ? '#34d399' : '#94a3b8';
      }
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // CODE GENERATION & INJECTION ENGINES
    // ══════════════════════════════════════════════════════════════════════════════
    getStandaloneSnippet: function(shaderName, paletteKey, speed) {
      const s = shaderName || this.state.activeShader;
      const p = paletteKey || this.state.activePalette;
      const spd = speed !== undefined ? speed : this.state.speed;
      const pal = PALETTES[p] || PALETTES.cyberpunk;
      const fsSrc = (SHADERS[s] || SHADERS.liquid).replace(/\\/g, '\\\\').replace(/`/g, '\\`');

      const uid = 'ultraShader_' + Math.random().toString(36).substr(2, 6);

      return `<!-- Ultra Shader FX Canvas (${s}) -->
<div id="${uid}_container" style="position:relative;width:100%;height:400px;overflow:hidden;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.6)">
  <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block"></canvas>
</div>
<script>
(function() {
  const canvas = document.getElementById('${uid}_canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vsSrc = \`${VS_SOURCE}\`;
  const fsSrc = \`${fsSrc}\`;

  function createShader(gl, type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uColA = gl.getUniformLocation(prog, 'u_colorA');
  const uColB = gl.getUniformLocation(prog, 'u_colorB');
  const uSpeed = gl.getUniformLocation(prog, 'u_speed');

  gl.uniform3f(uColA, ${pal.a[0]}, ${pal.a[1]}, ${pal.a[2]});
  gl.uniform3f(uColB, ${pal.b[0]}, ${pal.b[1]}, ${pal.b[2]});
  gl.uniform1f(uSpeed, ${spd});

  let mouseX = 300, mouseY = 200;
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left; mouseY = r.height - (e.clientY - r.top);
  });

  function resize() {
    canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  const start = performance.now();
  function loop() {
    requestAnimationFrame(loop);
    const t = (performance.now() - start) * 0.001;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mouseX, mouseY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  loop();
})();
</script>`;
    },

    inject: function(targetType) {
      const s = this.state.activeShader;
      const meta = this.shadersMeta[s];
      const name = meta ? meta.nameEn : s;

      if (targetType === 'background') {
        const uid = 'shaderBg_' + Math.random().toString(36).substr(2, 6);
        const pal = PALETTES[this.state.activePalette] || PALETTES.cyberpunk;
        const fsSrc = (SHADERS[s] || SHADERS.liquid).replace(/\\/g, '\\\\').replace(/`/g, '\\`');

        const snippet = `<!-- Ultra Live Procedural Shader Background (${name}) -->
<div id="${uid}_wrap" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;overflow:hidden">
  <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block;opacity:0.6"></canvas>
</div>
<script>
(function() {
  const canvas = document.getElementById('${uid}_canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const vsSrc = \`${VS_SOURCE}\`;
  const fsSrc = \`${fsSrc}\`;
  function cs(gl, t, s) { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; }
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl, gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(prog, cs(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uColA = gl.getUniformLocation(prog, 'u_colorA');
  const uColB = gl.getUniformLocation(prog, 'u_colorB');
  const uSpeed = gl.getUniformLocation(prog, 'u_speed');
  gl.uniform3f(uColA, ${pal.a[0]}, ${pal.a[1]}, ${pal.a[2]});
  gl.uniform3f(uColB, ${pal.b[0]}, ${pal.b[1]}, ${pal.b[2]});
  gl.uniform1f(uSpeed, ${this.state.speed});
  let mx = 300, my = 200;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = window.innerHeight - e.clientY; });
  function rz() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; gl.viewport(0, 0, canvas.width, canvas.height); }
  window.addEventListener('resize', rz); rz();
  const st = performance.now();
  function lp() {
    requestAnimationFrame(lp);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - st) * 0.001);
    gl.uniform2f(uMouse, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  lp();
})();
</script>`;
        _injectCodeToActiveApp(snippet, /<!-- Ultra Live Procedural Shader Background[\s\S]*?<\/script>/g, 'Live Shader Background');
      } else {
        const snippet = this.getStandaloneSnippet();
        _injectCodeToActiveApp(snippet, /<!-- Ultra Shader FX Canvas[\s\S]*?<\/script>/g, 'Interactive Shader Canvas');
      }
    },

    copySnippet: function() {
      const code = this.getStandaloneSnippet();
      _copyCode(code, 'Shader GLSL');
    },

    exportHTML: function() {
      const isFr = _isFr();
      const s = this.state.activeShader;
      const meta = this.shadersMeta[s];
      const title = meta ? (isFr ? meta.nameFr : meta.nameEn) : s.toUpperCase();
      const snippet = this.getStandaloneSnippet();

      const html = `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IA Architecte Studio ULTRA — ${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #030712; color: #fff; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    h1 { font-size: 1.5rem; margin-bottom: 8px; background: linear-gradient(135deg, #38bdf8, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px; text-align: center; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>Procedural GLSL Shader Engine · 100% Autonomous WebGL</p>
  <div style="width: 90vw; max-width: 960px; height: 550px;">
    ${snippet}
  </div>
</body>
</html>`;

      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ultra_shader_${s}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _sound('celebrate');
      _toast(isFr ? `🌐 App Shader HTML exportée avec succès (${s}) !` : `🌐 Standalone Shader HTML exported successfully (${s})!`, 'success');
    }
  };

  console.log('🌈 Ultra Raymarching & Procedural Shader FX Studio v1.0 initialized.');
})();
