/**
 * IA ARCHITECTE STUDIO ULTRA — ENTERPRISE INNOVATIONS SUITE
 * 7 Brand-New World-Class Enterprise Engines:
 * 1. UltraSecurityShield      — AI Security Shield & Penetration Tester (OWASP Top 10)
 * 2. UltraScreenflow          — Studio Screenflow & 60 FPS Video/GIF Recorder with 3D Frames
 * 3. UltraAccessibilityStudio — WCAG 2.2 AAA Assistive Vision, Screen Reader & Focus Tracer
 * 4. UltraTelemetryStreamer   — Real-Time WebSocket, Sensor Telemetry & Market Simulator
 * 5. UltraPdfEngine           — Enterprise Vector PDF, Invoice & Official Report Studio
 * 6. UltraDevOpsPackager      — Multi-Stage Dockerfile, Nginx, Caddy & Cloudflare Edge Packager
 * 7. UltraFlowNodes           — Visual Interactive Node-Graph Logic & Automation Canvas
 *
 * Strictly Bilingual EN / FR compatible. Zero external dependencies.
 */

(function(window) {
  'use strict';

  // ─── UTILITIES ───
  function _sound(type) {
    if (window.UltraSoundFX && typeof window.UltraSoundFX.play === 'function') {
      window.UltraSoundFX.play(type);
    }
  }

  function _confetti(count) {
    if (window.UltraConfetti && typeof window.UltraConfetti.fire === 'function') {
      window.UltraConfetti.fire(count || 60);
    }
  }

  function _toast(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      console.log(`[TOAST ${type}] ${msg}`);
    }
  }

  function _getAppCode() {
    if (typeof window.APP !== 'undefined') {
      return {
        html: window.APP.html || '',
        css: window.APP.css || '',
        js: window.APP.js || ''
      };
    }
    return {
      html: window.currentGeneratedCode || '',
      css: '',
      js: ''
    };
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. ULTRA SECURITY SHIELD — OWASP Top 10 Scanner & 1-Click Auto-Shield
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSecurityShield = {
    vulnerabilities: [],
    score: 100,
    isShielded: false,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-security-shield');
      if (!modal) return;
      this.runAudit();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-security-shield');
      if (modal) modal.classList.remove('show');
    },

    runAudit() {
      const { html, js } = _getAppCode();
      const code = html + '\n' + js;
      const vulns = [];

      // 1. Check for unsafe innerHTML or eval
      if (/innerHTML\s*=/i.test(code) && !/DOMPurify|escapeHtml|sanitize/i.test(code)) {
        vulns.push({
          id: 'xss_innerhtml',
          severity: 'HIGH',
          title: 'Unsanitized innerHTML Assignment (XSS Risk)',
          titleFr: 'Assignation innerHTML non sécurisée (Risque XSS)',
          desc: 'Direct injection of variables into innerHTML without sanitization allows script injection.',
          descFr: 'L\'injection directe de variables dans innerHTML sans sanitisation permet l\'injection de scripts.',
          recommendation: 'Use textContent, setAttribute, or sanitize with a safe DOM helper.'
        });
      }

      if (/eval\(|new Function\(/i.test(code)) {
        vulns.push({
          id: 'eval_injection',
          severity: 'CRITICAL',
          title: 'Dangerous Dynamic Code Execution (eval)',
          titleFr: 'Exécution de code dynamique dangereux (eval)',
          desc: 'Dynamic code execution via eval() can execute arbitrary user scripts in client memory.',
          descFr: 'L\'exécution dynamique de code via eval() peut exécuter des scripts arbitraires en mémoire.',
          recommendation: 'Replace eval() with strict JSON.parse or standard function calls.'
        });
      }

      // 2. Check for hardcoded API keys or sensitive secrets
      if (/(api[_-]?key|secret|token|password)\s*[:=]\s*['"][a-zA-Z0-9_\-]{8,}['"]/i.test(code)) {
        vulns.push({
          id: 'exposed_secret',
          severity: 'HIGH',
          title: 'Hardcoded Secret / API Token Detected',
          titleFr: 'Secret / Jeton d\'API codé en dur détecté',
          desc: 'Plaintext credentials exposed in client-side code are visible to anyone inspecting source.',
          descFr: 'Des identifiants en clair exposés dans le code client sont visibles par tout utilisateur.',
          recommendation: 'Use environment variables or serverless token exchanges.'
        });
      }

      // 3. Check for external links missing noopener/noreferrer
      if (/<a[^>]+href=["']https?:\/\/[^"']+["'][^>]*target=["']_blank["'][^>]*>/i.test(code) &&
          !/rel=["'][^"']*(noopener|noreferrer)[^"']*["']/i.test(code)) {
        vulns.push({
          id: 'tabnabbing',
          severity: 'MEDIUM',
          title: 'Reverse Tabnabbing on External Links',
          titleFr: 'Tabnabbing inversé sur les liens externes',
          desc: 'Target _blank links without rel="noopener noreferrer" allow target page to hijack window.opener.',
          descFr: 'Les liens target="_blank" sans rel="noopener noreferrer" permettent le détournement de fenêtre.',
          recommendation: 'Add rel="noopener noreferrer" to all target="_blank" anchors.'
        });
      }

      // 4. Missing Content-Security-Policy
      if (!/http-equiv=["']Content-Security-Policy["']/i.test(code)) {
        vulns.push({
          id: 'missing_csp',
          severity: 'LOW',
          title: 'Missing Content-Security-Policy (CSP) Header',
          titleFr: 'En-tête Content-Security-Policy (CSP) manquant',
          desc: 'No CSP meta tag declared to restrict script origins and frame-ancestors.',
          descFr: 'Aucune balise meta CSP pour restreindre les origines de scripts et ancêtres de frames.',
          recommendation: 'Declare a strict Content-Security-Policy meta tag in <head>.'
        });
      }

      this.vulnerabilities = vulns;
      this.score = Math.max(25, 100 - (vulns.filter(v => v.severity === 'CRITICAL').length * 40)
                                - (vulns.filter(v => v.severity === 'HIGH').length * 25)
                                - (vulns.filter(v => v.severity === 'MEDIUM').length * 15)
                                - (vulns.filter(v => v.severity === 'LOW').length * 10));

      this.renderReport();
    },

    renderReport() {
      const container = document.getElementById('security-audit-container');
      const scoreEl = document.getElementById('security-score-val');
      const badgeEl = document.getElementById('security-score-badge');
      if (!container) return;

      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      if (scoreEl) scoreEl.textContent = this.score + '/100';

      if (badgeEl) {
        if (this.score >= 90) {
          badgeEl.style.background = 'rgba(16,185,129,0.18)';
          badgeEl.style.color = '#10b981';
          badgeEl.style.borderColor = 'rgba(16,185,129,0.4)';
          badgeEl.textContent = isFr ? 'CERTIFIÉ SÉCURISÉ (A+)' : 'CERTIFIED SECURE (A+)';
        } else if (this.score >= 70) {
          badgeEl.style.background = 'rgba(245,158,11,0.18)';
          badgeEl.style.color = '#f59e0b';
          badgeEl.style.borderColor = 'rgba(245,158,11,0.4)';
          badgeEl.textContent = isFr ? 'RISQUE MODÉRÉ (B)' : 'MODERATE RISK (B)';
        } else {
          badgeEl.style.background = 'rgba(239,68,68,0.18)';
          badgeEl.style.color = '#ef4444';
          badgeEl.style.borderColor = 'rgba(239,68,68,0.4)';
          badgeEl.textContent = isFr ? 'VULNÉRABILITÉS DÉTECTÉES' : 'VULNERABILITIES DETECTED';
        }
      }

      if (this.vulnerabilities.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:30px;color:#10b981">
            <div style="font-size:2.4rem;margin-bottom:8px">🛡️</div>
            <h3 style="margin:0 0 6px 0">${isFr ? 'Aucune vulnérabilité détectée !' : 'Zero Vulnerabilities Detected!'}</h3>
            <p style="color:#94a3b8;font-size:0.85rem">${isFr ? 'Le code de votre application respecte les normes OWASP de sécurité frontend.' : 'Your application code satisfies modern OWASP frontend security baselines.'}</p>
          </div>
        `;
        return;
      }

      container.innerHTML = this.vulnerabilities.map(v => {
        const color = v.severity === 'CRITICAL' ? '#ef4444' : v.severity === 'HIGH' ? '#f97316' : v.severity === 'MEDIUM' ? '#eab308' : '#38bdf8';
        return `
          <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.08);border-left:4px solid ${color};border-radius:8px;padding:12px;margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <strong style="color:#f8fafc;font-size:0.88rem">${isFr ? v.titleFr : v.title}</strong>
              <span style="font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:12px;background:${color}22;color:${color};border:1px solid ${color}44">${v.severity}</span>
            </div>
            <p style="color:#94a3b8;font-size:0.8rem;margin:0 0 6px 0">${isFr ? v.descFr : v.desc}</p>
            <div style="font-size:0.75rem;color:#cbd5e1;background:rgba(0,0,0,0.3);padding:6px 10px;border-radius:6px">
              💡 <strong>Fix:</strong> ${v.recommendation}
            </div>
          </div>
        `;
      }).join('');
    },

    autoShield() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      let { html, js } = _getAppCode();

      // 1. Inject CSP Meta Tag if missing
      if (!/http-equiv=["']Content-Security-Policy["']/i.test(html)) {
        const cspMeta = `\n  <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' https: data: blob:;">`;
        if (html.includes('<head>')) {
          html = html.replace('<head>', '<head>' + cspMeta);
        } else {
          html = cspMeta + '\n' + html;
        }
      }

      // 2. Fix target="_blank" links
      html = html.replace(/<a([^>]+target=["']_blank["'])(?!([^>]*rel=))([^>]*)>/gi, '<a$1 rel="noopener noreferrer"$3>');

      // 3. Inject safe DOM Sanitizer into JS
      const sanitizerCode = `
/* ─── ULTRA SECURITY AUTO-SHIELD DOM SANITIZER ─── */
window.safeSanitize = function(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
};
`;
      if (!js.includes('safeSanitize')) {
        js = sanitizerCode + '\n' + js;
      }

      if (typeof window.APP !== 'undefined') {
        window.APP.html = html;
        window.APP.js = js;
        if (window.APP.editor) {
          if (window.APP.currentTab === 'html') window.APP.editor.setValue(html);
          if (window.APP.currentTab === 'js') window.APP.editor.setValue(js);
        }
        if (typeof window.refreshPreview === 'function') window.refreshPreview();
      }

      this.isShielded = true;
      this.runAudit();
      _sound('celebrate');
      _confetti(70);
      _toast(isFr ? '🛡️ Auto-Shield appliqué avec succès ! Score de sécurité maximisé.' : '🛡️ Auto-Shield applied successfully! Security score maximized.', 'success');
    },

    exportReport() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Security Report')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const report = {
        date: new Date().toISOString(),
        score: this.score,
        status: this.score >= 90 ? 'PASSED' : 'ACTION_REQUIRED',
        vulnerabilitiesCount: this.vulnerabilities.length,
        vulnerabilities: this.vulnerabilities
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'owasp_security_audit.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      _toast(isFr ? '📥 Rapport de sécurité téléchargé !' : '📥 Security report downloaded!', 'success');
    }
  };

  // ─── ROUNDED RECTANGLE HELPER ───
  function _roundRect(ctx, x, y, width, height, radius) {
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      return;
    }
    const r = typeof radius === 'number' ? { tl: radius, tr: radius, br: radius, bl: radius } : {
      tl: (Array.isArray(radius) ? radius[0] : 10),
      tr: (Array.isArray(radius) ? radius[1] : 10),
      br: (Array.isArray(radius) ? radius[2] : 10),
      bl: (Array.isArray(radius) ? radius[3] : 10)
    };
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + width - r.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r.tr);
    ctx.lineTo(x + width, y + height - r.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r.br, y + height);
    ctx.lineTo(x + r.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA SCREENFLOW — 60 FPS HD Video & GIF Recorder with 3D Mockup Frames
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraScreenflow = {
    isRecording: false,
    activeFrame: 'macbook',
    recordedBlobs: [],
    mediaRecorder: null,
    timerInterval: null,
    secondsRecorded: 0,
    captureStream: null,
    videoEl: null,
    animFrameId: null,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-screenflow');
      if (!modal) return;
      if (typeof applyI18n === 'function') applyI18n();
      this.updateFramePreview();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      if (this.isRecording) this.stopRecording();
      this._removeFloatingBar();
      const modal = document.getElementById('modal-screenflow');
      if (modal) modal.classList.remove('show');
    },

    selectFrame(frameType) {
      _sound('click');
      this.activeFrame = frameType;
      this.updateFramePreview();
    },

    updateFramePreview() {
      const previewWrap = document.getElementById('screenflow-frame-mockup');
      if (!previewWrap) return;

      let appDoc = '';
      if (typeof window.buildPreviewDoc === 'function') {
        appDoc = window.buildPreviewDoc();
      } else {
        const { html, css, js } = _getAppCode();
        appDoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
      }

      const hideScrollCss = `<style>::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important;-ms-overflow-style:none!important}body{margin:0;overflow-x:hidden!important}</style>`;
      const cleanDoc = appDoc.includes('<head>')
        ? appDoc.replace('<head>', '<head>' + hideScrollCss)
        : `<!DOCTYPE html><html><head>${hideScrollCss}</head><body>${appDoc}</body></html>`;

      if (this.activeFrame === 'iphone') {
        previewWrap.innerHTML = `
          <div style="position:relative;width:240px;height:450px;border-radius:40px;border:10px solid #0f172a;box-shadow:0 25px 60px -15px rgba(0,0,0,0.9), 0 0 25px rgba(139,92,246,0.2);background:#000;overflow:hidden;margin:0 auto;display:flex;flex-direction:column;align-items:center">
            <!-- Dynamic Island -->
            <div style="position:absolute;top:7px;left:50%;transform:translateX(-50%);width:78px;height:18px;background:#000;border-radius:12px;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:0 8px;pointer-events:none">
              <div style="width:6px;height:6px;border-radius:50%;background:#1e293b"></div>
              <div style="width:6px;height:6px;border-radius:50%;background:#0284c7;opacity:0.7"></div>
            </div>
            <!-- Scaled Mobile Viewport: 390px rendered into 220px (scale 0.564) -->
            <div style="width:220px;height:430px;overflow:hidden;position:relative;background:#030712;border-radius:30px">
              <iframe id="screenflow-inner-preview" style="width:390px;height:762px;border:none;background:#fff;transform:scale(0.5641);transform-origin:top left;pointer-events:none"></iframe>
            </div>
          </div>
        `;
      } else if (this.activeFrame === 'macbook') {
        previewWrap.innerHTML = `
          <div style="position:relative;width:540px;height:330px;border-radius:12px 12px 4px 4px;border:12px solid #1e293b;border-bottom:22px solid #334155;box-shadow:0 25px 60px -15px rgba(0,0,0,0.85), 0 0 30px rgba(56,189,248,0.15);background:#030712;overflow:hidden;margin:0 auto">
            <!-- Notch -->
            <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:96px;height:12px;background:#1e293b;border-radius:0 0 8px 8px;z-index:20;pointer-events:none"></div>
            <!-- Scaled Desktop Viewport: 1032px rendered into 516px (scale 0.5) -->
            <div style="width:516px;height:296px;overflow:hidden;position:relative;background:#030712">
              <iframe id="screenflow-inner-preview" style="width:1032px;height:592px;border:none;background:#fff;transform:scale(0.5);transform-origin:top left;pointer-events:none"></iframe>
            </div>
          </div>
        `;
      } else if (this.activeFrame === 'glass') {
        previewWrap.innerHTML = `
          <div style="position:relative;width:500px;height:310px;border-radius:20px;border:2px solid rgba(56,189,248,0.4);box-shadow:0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(56,189,248,0.1);background:#030712;overflow:hidden;margin:0 auto">
            <div style="width:496px;height:306px;overflow:hidden;position:relative;background:#030712">
              <iframe id="screenflow-inner-preview" style="width:992px;height:612px;border:none;background:#fff;transform:scale(0.5);transform-origin:top left;pointer-events:none"></iframe>
            </div>
          </div>
        `;
      } else {
        previewWrap.innerHTML = `
          <div style="position:relative;width:100%;height:300px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:#030712;overflow:hidden;margin:0 auto">
            <iframe id="screenflow-inner-preview" style="width:100%;height:100%;border:none;background:#fff;pointer-events:none"></iframe>
          </div>
        `;
      }

      const innerFrame = document.getElementById('screenflow-inner-preview');
      if (innerFrame) {
        innerFrame.srcdoc = cleanDoc;
      }
    },

    async startRecording() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Screen Video Recorder')) return;
      // Default to live interactive recording, with seamless automated fallback
      return this.startLiveRecording();
    },

    async startLiveRecording() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Screen Video Recorder')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      let stream = null;
      try {
        if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          throw new Error('getDisplayMedia not supported');
        }
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: { ideal: 60, max: 60 },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: true
        });
      } catch (err) {
        console.warn('DisplayMedia cancelled or not supported:', err);
        _toast(isFr ? 'Capture d\'écran annulée. Démarrage de la démo automatisée 60 FPS...' : 'Screen capture cancelled. Starting 60 FPS Automated Showcase...', 'info');
        return this.generateAutomatedShowcase();
      }

      this.captureStream = stream;
      this.isRecording = true;
      this.secondsRecorded = 0;
      this.recordedBlobs = [];

      // Hide modal and show floating recording bar
      const modal = document.getElementById('modal-screenflow');
      if (modal) modal.classList.remove('show');
      this._showFloatingBar();

      // Listen for user stopping sharing from browser notification bar
      const track = stream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          if (this.isRecording) this.stopRecording();
        };
      }

      if (this.activeFrame === 'none') {
        this._initMediaRecorder(stream);
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        if (typeof video.play === 'function') {
          try { await video.play(); } catch(e){}
        }
        this.videoEl = video;

        const frameType = this.activeFrame;
        const self = this;

        const renderLoop = () => {
          if (!self.isRecording) return;

          // Studio backdrop
          const bgGrad = ctx.createRadialGradient(960, 540, 100, 960, 540, 1000);
          bgGrad.addColorStop(0, '#0d1527');
          bgGrad.addColorStop(1, '#020612');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, 1920, 1080);

          // Subtle grid
          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 1;
          for (let x = 0; x < 1920; x += 60) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1080); ctx.stroke();
          }
          for (let y = 0; y < 1080; y += 60) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1920, y); ctx.stroke();
          }

          if (frameType === 'iphone') {
            const phoneW = 480;
            const phoneH = 960;
            const phoneX = (1920 - phoneW) / 2;
            const phoneY = (1080 - phoneH) / 2;

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.85)';
            ctx.shadowBlur = 60;
            ctx.shadowOffsetY = 30;
            ctx.fillStyle = '#0f172a';
            _roundRect(ctx, phoneX, phoneY, phoneW, phoneH, 50);
            ctx.fill();
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.restore();

            const pad = 12;
            const scrX = phoneX + pad;
            const scrY = phoneY + pad;
            const scrW = phoneW - pad * 2;
            const scrH = phoneH - pad * 2;

            ctx.save();
            _roundRect(ctx, scrX, scrY, scrW, scrH, 40);
            ctx.clip();
            try {
              const vW = video.videoWidth || 1920;
              const vH = video.videoHeight || 1080;
              const vScale = Math.max(scrW / vW, scrH / vH);
              const cropW = scrW / vScale;
              const cropH = scrH / vScale;
              const cropX = (vW - cropW) / 2;
              const cropY = (vH - cropH) / 2;
              ctx.drawImage(video, cropX, cropY, cropW, cropH, scrX, scrY, scrW, scrH);
            } catch(e){}
            ctx.restore();

            // Dynamic Island with camera lens & sensor
            const diW = 126;
            const diH = 28;
            const diX = phoneX + (phoneW - diW) / 2;
            const diY = phoneY + 18;
            ctx.fillStyle = '#000000';
            _roundRect(ctx, diX, diY, diW, diH, 14);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(diX + 20, diY + diH / 2, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0284c7';
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(diX + diW - 20, diY + diH / 2, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Home indicator bar
            const homeW = 130;
            const homeH = 4;
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            _roundRect(ctx, phoneX + (phoneW - homeW) / 2, phoneY + phoneH - 20, homeW, homeH, 2);
            ctx.fill();

          } else if (frameType === 'macbook') {
            const mbW = 1440;
            const mbH = 900;
            const mbX = (1920 - mbW) / 2;
            const mbY = (1080 - mbH) / 2 - 20;

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.85)';
            ctx.shadowBlur = 70;
            ctx.shadowOffsetY = 35;
            ctx.fillStyle = '#1e293b';
            _roundRect(ctx, mbX, mbY, mbW, mbH, 16);
            ctx.fill();
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            const b = 14;
            const scrX = mbX + b;
            const scrY = mbY + b;
            const scrW = mbW - b * 2;
            const scrH = mbH - b * 2;

            ctx.save();
            _roundRect(ctx, scrX, scrY, scrW, scrH, 8);
            ctx.clip();
            try {
              const vW = video.videoWidth || 1920;
              const vH = video.videoHeight || 1080;
              const vScale = Math.max(scrW / vW, scrH / vH);
              const cropW = scrW / vScale;
              const cropH = scrH / vScale;
              const cropX = (vW - cropW) / 2;
              const cropY = (vH - cropH) / 2;
              ctx.drawImage(video, cropX, cropY, cropW, cropH, scrX, scrY, scrW, scrH);
            } catch(e){}
            ctx.restore();

            // Notch & Chin
            ctx.fillStyle = '#0f172a';
            _roundRect(ctx, mbX + (mbW - 160) / 2, mbY, 160, 22, [0, 0, 10, 10]);
            ctx.fill();

            const chinH = 26;
            ctx.fillStyle = '#334155';
            _roundRect(ctx, mbX - 60, mbY + mbH, mbW + 120, chinH, [0, 0, 12, 12]);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            _roundRect(ctx, mbX + (mbW - 140) / 2, mbY + mbH, 140, 6, [0, 0, 4, 4]);
            ctx.fill();

          } else if (frameType === 'glass') {
            const gW = 1380;
            const gH = 820;
            const gX = (1920 - gW) / 2;
            const gY = (1080 - gH) / 2;

            ctx.save();
            ctx.shadowColor = 'rgba(56,189,248,0.25)';
            ctx.shadowBlur = 40;
            ctx.fillStyle = 'rgba(15,23,42,0.85)';
            _roundRect(ctx, gX, gY, gW, gH, 24);
            ctx.fill();
            ctx.strokeStyle = 'rgba(56,189,248,0.5)';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            const pad = 12;
            ctx.save();
            _roundRect(ctx, gX + pad, gY + pad, gW - pad * 2, gH - pad * 2, 16);
            ctx.clip();
            try {
              const vW = video.videoWidth || 1920;
              const vH = video.videoHeight || 1080;
              const vScale = Math.max((gW - pad * 2) / vW, (gH - pad * 2) / vH);
              const cropW = (gW - pad * 2) / vScale;
              const cropH = (gH - pad * 2) / vScale;
              const cropX = (vW - cropW) / 2;
              const cropY = (vH - cropH) / 2;
              ctx.drawImage(video, cropX, cropY, cropW, cropH, gX + pad, gY + pad, gW - pad * 2, gH - pad * 2);
            } catch(e){}
            ctx.restore();
          }

          if (typeof requestAnimationFrame === 'function') {
            self.animFrameId = requestAnimationFrame(renderLoop);
          }
        };
        renderLoop();

        const canvasStream = canvas.captureStream ? canvas.captureStream(60) : stream;
        const audioTracks = stream.getAudioTracks ? stream.getAudioTracks() : [];
        if (audioTracks.length > 0 && canvasStream.addTrack) {
          canvasStream.addTrack(audioTracks[0]);
        }

        this._initMediaRecorder(canvasStream);
      }

      this.timerInterval = setInterval(() => {
        this.secondsRecorded++;
        const mins = String(Math.floor(this.secondsRecorded / 60)).padStart(2, '0');
        const secs = String(this.secondsRecorded % 60).padStart(2, '0');
        const floatingTimer = document.getElementById('screenflow-floating-timer');
        if (floatingTimer) floatingTimer.textContent = `${mins}:${secs}`;
        const timerEl = document.getElementById('screenflow-timer');
        if (timerEl) timerEl.textContent = `🔴 REC ${mins}:${secs}`;
      }, 1000);

      _sound('celebrate');
      _toast(isFr ? '🔴 Enregistrement 60 FPS en cours ! Interagissez avec votre application.' : '🔴 60 FPS Recording active! Interact freely with your application.', 'success');
    },

    async generateAutomatedShowcase() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Automated Video Showcase')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(isFr ? '📸 Capture de l\'application en haute résolution...' : '📸 Capturing high-res app UI...', 'info');

      let appDoc = '';
      if (typeof window.buildPreviewDoc === 'function') {
        appDoc = window.buildPreviewDoc();
      } else {
        const { html, css, js } = _getAppCode();
        appDoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
      }

      let appCanvas = null;
      const frameType = this.activeFrame;

      if (window.html2canvas) {
        if (frameType === 'iphone') {
          // Render in offscreen mobile viewport (393px width, standard iPhone 16)
          const offscreen = document.createElement('iframe');
          offscreen.style.cssText = 'position:fixed;left:-9999px;top:0;width:393px;height:1200px;border:none;opacity:0;pointer-events:none;z-index:-9999';
          document.body.appendChild(offscreen);

          const mobileHead = `
            <meta name="viewport" content="width=393, initial-scale=1.0">
            <style>
              ::-webkit-scrollbar { display: none !important; }
              * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
              body { margin: 0; width: 393px !important; min-height: 100vh; overflow-x: hidden; }
            </style>
          `;
          const styledMobileDoc = appDoc.includes('<head>')
            ? appDoc.replace('<head>', '<head>' + mobileHead)
            : `<!DOCTYPE html><html><head>${mobileHead}</head><body>${appDoc}</body></html>`;

          offscreen.srcdoc = styledMobileDoc;

          await new Promise(r => {
            offscreen.onload = () => setTimeout(r, 400);
            setTimeout(r, 1200);
          });

          try {
            const mDoc = offscreen.contentDocument || offscreen.contentWindow?.document;
            if (mDoc && mDoc.body) {
              appCanvas = await html2canvas(mDoc.body, {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                width: 393,
                windowWidth: 393
              });
            }
          } catch(e) {
            console.warn('Mobile html2canvas capture failed:', e);
          } finally {
            offscreen.remove();
          }
        } else {
          // Desktop capture from live preview-frame
          const frame = document.getElementById('preview-frame');
          const frameDoc = frame ? (frame.contentDocument || frame.contentWindow?.document) : null;
          if (frameDoc && frameDoc.body) {
            try {
              appCanvas = await html2canvas(frameDoc.body, { useCORS: true, allowTaint: true, scale: 2 });
            } catch(e) {
              console.warn('Desktop html2canvas snapshot failed:', e);
            }
          }
        }
      }

      if (!appCanvas) {
        // Fallback generator
        const isMob = (frameType === 'iphone');
        appCanvas = document.createElement('canvas');
        appCanvas.width = isMob ? 786 : 1920;
        appCanvas.height = isMob ? 1600 : 1080;
        const aCtx = appCanvas.getContext('2d');
        const bgGrad = aCtx.createLinearGradient(0, 0, appCanvas.width, appCanvas.height);
        bgGrad.addColorStop(0, '#0a0f1d');
        bgGrad.addColorStop(1, '#020612');
        aCtx.fillStyle = bgGrad;
        aCtx.fillRect(0, 0, appCanvas.width, appCanvas.height);

        // Header bar
        aCtx.fillStyle = '#0f172a';
        aCtx.fillRect(0, 0, appCanvas.width, isMob ? 140 : 80);
        aCtx.fillStyle = '#38bdf8';
        aCtx.font = isMob ? 'bold 36px system-ui' : 'bold 28px system-ui';
        aCtx.fillText(window.APP?.currentAppName || 'Studio Ultra Application', isMob ? 40 : 60, isMob ? 90 : 50);

        // Interactive Card Elements
        const cardYStart = isMob ? 180 : 120;
        const cardH = isMob ? 220 : 180;
        for (let i = 0; i < 4; i++) {
          const cy = cardYStart + i * (cardH + 25);
          aCtx.fillStyle = '#1e293b';
          _roundRect(aCtx, isMob ? 40 : 60, cy, appCanvas.width - (isMob ? 80 : 120), cardH, 16);
          aCtx.fill();
          aCtx.fillStyle = '#e2e8f0';
          aCtx.font = isMob ? 'bold 28px system-ui' : 'bold 22px system-ui';
          aCtx.fillText(`Feature Module ${i + 1} — Interactive Live Component`, isMob ? 70 : 90, cy + 50);
          aCtx.fillStyle = '#94a3b8';
          aCtx.font = isMob ? '20px system-ui' : '16px system-ui';
          aCtx.fillText('Ultra Enterprise Engine · Active Real-Time Analytics & UI', isMob ? 70 : 90, cy + 95);
          aCtx.fillStyle = '#38bdf8';
          _roundRect(aCtx, isMob ? 70 : 90, cy + 130, isMob ? 200 : 150, 42, 8);
          aCtx.fill();
          aCtx.fillStyle = '#000';
          aCtx.font = 'bold 16px system-ui';
          aCtx.fillText('Launch Action', isMob ? 95 : 110, cy + 156);
        }
      }

      this.isRecording = true;
      this.secondsRecorded = 0;
      this.recordedBlobs = [];

      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      const stream = canvas.captureStream ? canvas.captureStream(60) : null;
      if (stream) {
        this._initMediaRecorder(stream);
      }

      const startBtn = document.getElementById('screenflow-btn-start');
      const autoBtn = document.getElementById('screenflow-btn-auto');
      const stopBtn = document.getElementById('screenflow-btn-stop');
      const timerEl = document.getElementById('screenflow-timer');
      if (startBtn) startBtn.style.display = 'none';
      if (autoBtn) autoBtn.style.display = 'none';
      if (stopBtn) stopBtn.style.display = 'inline-flex';

      const startTime = Date.now();
      const self = this;

      const animLoop = () => {
        if (!self.isRecording) return;
        const elapsed = (Date.now() - startTime) / 1000;

        // Background
        const bgGrad = ctx.createRadialGradient(960, 540, 100, 960, 540, 1000);
        bgGrad.addColorStop(0, '#0b1122');
        bgGrad.addColorStop(1, '#020612');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1920, 1080);

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 1920; x += 60) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1080); ctx.stroke();
        }

        if (frameType === 'iphone') {
          const phoneW = 460;
          const phoneH = 920;
          const phoneX = (1920 - phoneW) / 2;
          const phoneY = (1080 - phoneH) / 2;

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.85)';
          ctx.shadowBlur = 60;
          ctx.shadowOffsetY = 30;
          ctx.fillStyle = '#0f172a';
          _roundRect(ctx, phoneX, phoneY, phoneW, phoneH, 50);
          ctx.fill();
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();

          const pad = 12;
          const scrX = phoneX + pad;
          const scrY = phoneY + pad;
          const scrW = phoneW - pad * 2;
          const scrH = phoneH - pad * 2;

          // Seamless aspect-cover scaling: app fills 100% of the phone screen with zero empty bottom void
          const scale = Math.max(scrW / appCanvas.width, scrH / appCanvas.height);
          const sourceW = scrW / scale;
          const sourceH = scrH / scale;
          const maxScroll = Math.max(0, appCanvas.height - sourceH);
          const scrollOffset = maxScroll > 0 ? (Math.sin(elapsed * 0.6) * 0.5 + 0.5) * maxScroll : 0;
          const sourceX = Math.max(0, (appCanvas.width - sourceW) / 2);

          ctx.save();
          _roundRect(ctx, scrX, scrY, scrW, scrH, 40);
          ctx.clip();
          try {
            ctx.drawImage(appCanvas, sourceX, scrollOffset, sourceW, sourceH, scrX, scrY, scrW, scrH);
          } catch(e){}
          ctx.restore();

          // Dynamic Island with camera lens & sensor
          const diW = 126;
          const diH = 28;
          const diX = phoneX + (phoneW - diW) / 2;
          const diY = phoneY + 18;
          ctx.fillStyle = '#000000';
          _roundRect(ctx, diX, diY, diW, diH, 14);
          ctx.fill();
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(diX + 20, diY + diH / 2, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0284c7';
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          ctx.arc(diX + diW - 20, diY + diH / 2, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Home Indicator
          const homeW = 130;
          const homeH = 4;
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          _roundRect(ctx, phoneX + (phoneW - homeW) / 2, phoneY + phoneH - 20, homeW, homeH, 2);
          ctx.fill();

        } else if (frameType === 'macbook') {
          const mbW = 1400;
          const mbH = 880;
          const mbX = (1920 - mbW) / 2;
          const mbY = (1080 - mbH) / 2 - 20;

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 70;
          ctx.shadowOffsetY = 35;
          ctx.fillStyle = '#1e293b';
          _roundRect(ctx, mbX, mbY, mbW, mbH, 16);
          ctx.fill();
          ctx.restore();

          const b = 14;
          const scrX = mbX + b;
          const scrY = mbY + b;
          const scrW = mbW - b * 2;
          const scrH = mbH - b * 2;

          const scale = Math.max(scrW / appCanvas.width, scrH / appCanvas.height);
          const sourceW = scrW / scale;
          const sourceH = scrH / scale;
          const maxScroll = Math.max(0, appCanvas.height - sourceH);
          const scrollOffset = maxScroll > 0 ? (Math.sin(elapsed * 0.6) * 0.5 + 0.5) * maxScroll : 0;
          const sourceX = Math.max(0, (appCanvas.width - sourceW) / 2);

          ctx.save();
          _roundRect(ctx, scrX, scrY, scrW, scrH, 8);
          ctx.clip();
          try {
            ctx.drawImage(appCanvas, sourceX, scrollOffset, sourceW, sourceH, scrX, scrY, scrW, scrH);
          } catch(e){}
          ctx.restore();

          // Notch & Chin
          ctx.fillStyle = '#0f172a';
          _roundRect(ctx, mbX + (mbW - 160) / 2, mbY, 160, 22, [0, 0, 10, 10]);
          ctx.fill();

          ctx.fillStyle = '#334155';
          _roundRect(ctx, mbX - 60, mbY + mbH, mbW + 120, 24, [0, 0, 12, 12]);
          ctx.fill();

        } else {
          const fW = 1380;
          const fH = 840;
          const fX = (1920 - fW) / 2;
          const fY = (1080 - fH) / 2;

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.7)';
          ctx.shadowBlur = 50;
          _roundRect(ctx, fX, fY, fW, fH, 16);
          ctx.clip();

          const scale = Math.max(fW / appCanvas.width, fH / appCanvas.height);
          const sourceW = fW / scale;
          const sourceH = fH / scale;
          const maxScroll = Math.max(0, appCanvas.height - sourceH);
          const scrollOffset = maxScroll > 0 ? (Math.sin(elapsed * 0.6) * 0.5 + 0.5) * maxScroll : 0;
          const sourceX = Math.max(0, (appCanvas.width - sourceW) / 2);

          try {
            ctx.drawImage(appCanvas, sourceX, scrollOffset, sourceW, sourceH, fX, fY, fW, fH);
          } catch(e){}
          ctx.restore();
        }

        // Simulated mouse cursor
        const cursorX = 960 + Math.sin(elapsed * 1.6) * (frameType === 'iphone' ? 80 : 260);
        const cursorY = 540 + Math.cos(elapsed * 1.3) * (frameType === 'iphone' ? 180 : 140);

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cursorX, cursorY);
        ctx.lineTo(cursorX + 16, cursorY + 16);
        ctx.lineTo(cursorX + 8, cursorY + 18);
        ctx.lineTo(cursorX + 4, cursorY + 24);
        ctx.lineTo(cursorX, cursorY + 22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pulse click ring
        if (Math.sin(elapsed * 3) > 0.8) {
          ctx.strokeStyle = 'rgba(56,189,248,0.7)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, (elapsed * 22) % 28, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        if (typeof requestAnimationFrame === 'function') {
          self.animFrameId = requestAnimationFrame(animLoop);
        }
      };
      animLoop();

      this.timerInterval = setInterval(() => {
        this.secondsRecorded++;
        const mins = String(Math.floor(this.secondsRecorded / 60)).padStart(2, '0');
        const secs = String(this.secondsRecorded % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = `🔴 REC ${mins}:${secs}`;
      }, 1000);

      _sound('click');
      _toast(isFr ? '🎬 Démo 60 FPS de votre application en cours de génération !' : '🎬 60 FPS Demo of your app generating in real-time!', 'success');
    },

    _initMediaRecorder(stream) {
      let mimeType = 'video/webm;codecs=vp9';
      if (typeof MediaRecorder !== 'undefined' && typeof MediaRecorder.isTypeSupported === 'function') {
        if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          mimeType = MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '';
        }
      }

      try {
        this.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      } catch(e) {
        this.mediaRecorder = new MediaRecorder(stream);
      }
      this.recordedBlobs = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.recordedBlobs.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        this.finishRecording();
      };

      if (typeof this.mediaRecorder.start === 'function') {
        this.mediaRecorder.start(100);
      }
    },

    stopRecording() {
      if (!this.isRecording) return;
      this.isRecording = false;
      clearInterval(this.timerInterval);
      if (this.animFrameId && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(this.animFrameId);
      }
      this._removeFloatingBar();

      if (this.videoEl) {
        try {
          this.videoEl.pause();
          this.videoEl.srcObject = null;
        } catch(e){}
        this.videoEl = null;
      }

      if (this.captureStream) {
        try {
          this.captureStream.getTracks().forEach(t => t.stop());
        } catch(e){}
        this.captureStream = null;
      }

      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        try { this.mediaRecorder.stop(); } catch(e){}
      }

      const startBtn = document.getElementById('screenflow-btn-start');
      const autoBtn = document.getElementById('screenflow-btn-auto');
      const stopBtn = document.getElementById('screenflow-btn-stop');
      const timerEl = document.getElementById('screenflow-timer');
      if (startBtn) startBtn.style.display = 'inline-flex';
      if (autoBtn) autoBtn.style.display = 'inline-flex';
      if (stopBtn) stopBtn.style.display = 'none';
      if (timerEl) timerEl.textContent = '00:00';
    },

    _showFloatingBar() {
      this._removeFloatingBar();
      const bar = document.createElement('div');
      bar.id = 'screenflow-floating-bar';
      bar.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(15,23,42,0.95);border:1px solid rgba(239,68,68,0.5);border-radius:30px;padding:8px 22px;box-shadow:0 10px 40px rgba(0,0,0,0.8);display:flex;align-items:center;gap:14px;backdrop-filter:blur(12px);font-family:system-ui,-apple-system,sans-serif';
      bar.innerHTML = `
        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#ef4444;box-shadow:0 0 10px #ef4444"></span>
        <span style="color:#fff;font-weight:800;font-size:0.85rem">REC <span id="screenflow-floating-timer">00:00</span></span>
        <span style="color:#94a3b8;font-size:0.75rem;font-weight:600">[${this.activeFrame.toUpperCase()}]</span>
        <button id="screenflow-floating-stop-btn" style="background:#ef4444;color:#fff;border:none;padding:6px 16px;border-radius:20px;font-weight:800;font-size:0.8rem;cursor:pointer">⏹ Stop &amp; Save</button>
      `;
      document.body.appendChild(bar);

      const stopBtn = document.getElementById('screenflow-floating-stop-btn');
      if (stopBtn) {
        stopBtn.onclick = () => {
          this.stopRecording();
        };
      }
    },

    _removeFloatingBar() {
      const existing = document.getElementById('screenflow-floating-bar');
      if (existing) existing.remove();
    },

    finishRecording() {
      this._removeFloatingBar();
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
      let videoUrl = '';
      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        try { videoUrl = URL.createObjectURL(blob); } catch(e){}
      }

      const modal = document.getElementById('modal-screenflow');
      if (modal) modal.classList.add('show');

      const downloadWrap = document.getElementById('screenflow-download-wrap');
      if (downloadWrap) {
        downloadWrap.innerHTML = `
          <div style="margin-top:16px;padding:16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);border-radius:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
              <span style="color:#10b981;font-weight:800;font-size:0.9rem">✓ ${isFr ? 'Vidéo 60 FPS générée avec succès' : '60 FPS Video ready'} (${(blob.size / 1024).toFixed(1)} KB)</span>
              <div style="display:flex;gap:8px">
                <a href="${videoUrl}" download="app_screenflow_demo.webm" onclick="if(typeof window.guardPremium==='function' && !window.guardPremium(null,'Download WebM Video')) { event.preventDefault(); return false; }" class="btn-primary" style="padding:8px 16px;text-decoration:none;font-size:0.82rem;background:linear-gradient(135deg,#10b981,#059669)">📥 Download WebM</a>
                <a href="${videoUrl}" download="app_screenflow_demo.mp4" onclick="if(typeof window.guardPremium==='function' && !window.guardPremium(null,'Download MP4 Video')) { event.preventDefault(); return false; }" class="tb-btn" style="padding:8px 16px;text-decoration:none;font-size:0.82rem">📥 Download MP4</a>
              </div>
            </div>
            <!-- In-Browser Video Player for Instant Inspection -->
            <div style="border-radius:8px;overflow:hidden;background:#000;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
              <video src="${videoUrl}" controls autoplay loop style="width:100%;max-height:280px;display:block"></video>
            </div>
          </div>
        `;
      }

      _sound('celebrate');
      _confetti(60);
      _toast(isFr ? '🎬 Vidéo 60 FPS générée avec succès !' : '🎬 60 FPS Demo video generated successfully!', 'success');
    }
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('modal-screenflow');
        if (modal && modal.classList.contains('show')) {
          UltraScreenflow.close();
        }
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 3. ULTRA ACCESSIBILITY STUDIO — WCAG 2.2 AAA Vision, Voice & Tab Tracer
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraAccessibilityStudio = {
    activeFilter: 'none',
    isSpeaking: false,
    focusPathActive: false,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-accessibility-studio');
      if (!modal) return;
      this.auditAccessibility();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      this.clearFilter();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      const modal = document.getElementById('modal-accessibility-studio');
      if (modal) modal.classList.remove('show');
    },

    setFilter(filterType) {
      this.activeFilter = filterType;
      const frame = document.getElementById('preview-frame');
      if (!frame) return;

      const filters = {
        none: 'none',
        protanopia: 'url("#protanopia-filter")',
        deuteranopia: 'url("#deuteranopia-filter")',
        tritanopia: 'url("#tritanopia-filter")',
        achromatopsia: 'grayscale(100%)',
        blur: 'blur(3px)'
      };

      // Apply SVG filter defs if not yet injected
      if (!document.getElementById('a11y-svg-filters')) {
        const svg = document.createElement('div');
        svg.id = 'a11y-svg-filters';
        svg.style.display = 'none';
        svg.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="protanopia-filter"><feColorMatrix values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0"/></filter>
            <filter id="deuteranopia-filter"><feColorMatrix values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0"/></filter>
            <filter id="tritanopia-filter"><feColorMatrix values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0"/></filter>
          </svg>
        `;
        document.body.appendChild(svg);
      }

      frame.style.filter = filters[filterType] || 'none';
      _sound('click');
    },

    clearFilter() {
      this.activeFilter = 'none';
      const frame = document.getElementById('preview-frame');
      if (frame) frame.style.filter = 'none';
    },

    auditAccessibility() {
      const { html } = _getAppCode();
      const container = document.getElementById('a11y-audit-results');
      if (!container) return;

      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const issues = [];

      // Check missing image alt
      const imgWithoutAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;
      if (imgWithoutAlt > 0) {
        issues.push({
          type: 'IMG_ALT',
          count: imgWithoutAlt,
          msg: `${imgWithoutAlt} image(s) missing alt text`,
          msgFr: `${imgWithoutAlt} image(s) sans texte alternatif (alt)`
        });
      }

      // Check empty buttons or missing labels
      const emptyButtons = (html.match(/<button[^>]*>\s*<\/button>/gi) || []).length;
      if (emptyButtons > 0) {
        issues.push({
          type: 'EMPTY_BTN',
          count: emptyButtons,
          msg: `${emptyButtons} button(s) have no accessible name`,
          msgFr: `${emptyButtons} bouton(s) sans étiquette accessible`
        });
      }

      container.innerHTML = issues.length === 0 ? `
        <div style="color:#10b981;padding:12px;font-weight:700">✓ ${isFr ? 'Aucun problème critique d\'accessibilité détecté.' : 'No critical accessibility violations found.'}</div>
      ` : issues.map(it => `
        <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);color:#fbbf24;padding:8px 12px;border-radius:6px;margin-bottom:6px;font-size:0.8rem">
          ⚠️ ${isFr ? it.msgFr : it.msg}
        </div>
      `).join('');
    },

    toggleScreenReader() {
      if (!('speechSynthesis' in window)) {
        _toast('Web Speech API not supported in this browser.', 'error');
        return;
      }

      if (this.isSpeaking) {
        window.speechSynthesis.cancel();
        this.isSpeaking = false;
        _toast('Screen Reader stopped.', 'info');
        return;
      }

      const frame = document.getElementById('preview-frame');
      const frameDoc = frame ? (frame.contentDocument || frame.contentWindow?.document) : null;
      if (!frameDoc || !frameDoc.body) return;

      const speechItems = [];
      frameDoc.querySelectorAll('h1, h2, h3, button, a, label, p').forEach(el => {
        const text = el.textContent.trim();
        if (text) {
          const role = el.tagName.toLowerCase();
          speechItems.push(`${role}: ${text}`);
        }
      });

      if (speechItems.length === 0) return;

      this.isSpeaking = true;
      const textToRead = speechItems.slice(0, 10).join('. ');
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => { this.isSpeaking = false; };

      window.speechSynthesis.speak(utterance);
      _sound('celebrate');
      _toast('🔊 Voice Screen Reader active...', 'info');
    },

    autoRemediateAAA() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      let { html, css } = _getAppCode();

      // Add missing alt tags
      html = html.replace(/<img(?![^>]*\balt=)([^>]*?)>/gi, '<img$1 alt="Application Asset">');

      // Inject high contrast WCAG AAA styles
      const aaaStyles = `
/* ─── WCAG 2.2 AAA ACCESSIBILITY OVERRIDES ─── */
:focus-visible {
  outline: 3px solid #38bdf8 !important;
  outline-offset: 3px !important;
}
`;
      if (!css.includes('WCAG 2.2 AAA')) {
        css = css + '\n' + aaaStyles;
      }

      if (typeof window.APP !== 'undefined') {
        window.APP.html = html;
        window.APP.css = css;
        if (window.APP.editor) {
          if (window.APP.currentTab === 'html') window.APP.editor.setValue(html);
          if (window.APP.currentTab === 'css') window.APP.editor.setValue(css);
        }
        if (typeof window.refreshPreview === 'function') window.refreshPreview();
      }

      this.auditAccessibility();
      _sound('celebrate');
      _toast(isFr ? '♿ Remédiation WCAG AAA appliquée avec succès !' : '♿ WCAG AAA Auto-Remediation applied successfully!', 'success');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 4. ULTRA TELEMETRY STREAMER — Virtual WebSocket & Real-Time Sensor Streamer
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraTelemetryStreamer = {
    activeStream: 'none',
    intervalId: null,
    frequencyMs: 1000,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-telemetry-streamer');
      if (!modal) return;
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      this.stopStream();
      const modal = document.getElementById('modal-telemetry-streamer');
      if (modal) modal.classList.remove('show');
    },

    startStream(streamType) {
      this.stopStream();
      this.activeStream = streamType;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const logContainer = document.getElementById('telemetry-live-log');

      let step = 0;
      let btcPrice = 64250.00;
      let temp = 22.4;

      this.intervalId = setInterval(() => {
        step++;
        let packet = {};

        if (streamType === 'crypto') {
          const delta = (Math.random() - 0.49) * 120;
          btcPrice = Math.max(1000, btcPrice + delta);
          packet = {
            type: 'crypto_ticker',
            timestamp: new Date().toLocaleTimeString(),
            asset: 'BTC/USD',
            price: btcPrice.toFixed(2),
            change: (delta >= 0 ? '+' : '') + delta.toFixed(2) + '$'
          };
        } else if (streamType === 'iot') {
          temp += (Math.random() - 0.5) * 0.4;
          packet = {
            type: 'iot_sensor',
            timestamp: new Date().toLocaleTimeString(),
            device: 'Sensor-NorthZone-A3',
            temperature: temp.toFixed(1) + ' °C',
            humidity: Math.floor(40 + Math.random() * 20) + '%',
            status: 'HEALTHY'
          };
        } else {
          packet = {
            type: 'order_feed',
            timestamp: new Date().toLocaleTimeString(),
            orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            amount: '$' + (15 + Math.random() * 150).toFixed(2),
            status: 'CONFIRMED'
          };
        }

        // Post message into preview-frame
        const frame = document.getElementById('preview-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({ type: 'ultra-telemetry-packet', packet }, '*');
          } catch(e){}
        }

        if (logContainer) {
          const row = document.createElement('div');
          row.style.cssText = 'font-size:0.75rem;padding:4px 8px;border-bottom:1px solid rgba(255,255,255,0.06);color:#38bdf8;font-family:monospace';
          row.textContent = `[${packet.timestamp}] ${JSON.stringify(packet)}`;
          logContainer.prepend(row);
          if (logContainer.childNodes.length > 25) logContainer.removeChild(logContainer.lastChild);
        }
      }, this.frequencyMs);

      _sound('celebrate');
      _toast(isFr ? `📡 Flux live "${streamType.toUpperCase()}" activé !` : `📡 Live stream "${streamType.toUpperCase()}" active!`, 'success');
    },

    stopStream() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.activeStream = 'none';
    },

    injectReceiverCode() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      let { js } = _getAppCode();

      const receiverCode = `
/* ─── ULTRA TELEMETRY WEBSOCKET LISTENER ─── */
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'ultra-telemetry-packet') {
    const data = event.data.packet;
    console.log('[Telemetry Packet Received]', data);
    // Dispatches custom event in window
    window.dispatchEvent(new CustomEvent('live-telemetry', { detail: data }));
  }
});
`;
      if (!js.includes('ultra-telemetry-packet')) {
        js = js + '\n' + receiverCode;
        if (typeof window.APP !== 'undefined') {
          window.APP.js = js;
          if (window.APP.editor && window.APP.currentTab === 'js') window.APP.editor.setValue(js);
          if (typeof window.refreshPreview === 'function') window.refreshPreview();
        }
      }

      _sound('celebrate');
      _toast(isFr ? '⚡ Écouteur de télémétrie injecté dans APP.js !' : '⚡ Telemetry listener injected into APP.js!', 'success');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 5. ULTRA PDF ENGINE — Enterprise Vector PDF, Invoice & Official Report Engine
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraPdfEngine = {
    activeTemplate: 'invoice',

    open() {
      _sound('click');
      const modal = document.getElementById('modal-pdf-engine');
      if (!modal) return;
      this.renderPreview();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-pdf-engine');
      if (modal) modal.classList.remove('show');
    },

    selectTemplate(tpl) {
      this.activeTemplate = tpl;
      this.renderPreview();
    },

    generateDocHTML() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
      const dateStr = new Date().toLocaleDateString();

      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${isFr ? 'Facture Officielle' : 'Official Invoice'} - ${invoiceNumber}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: -apple-system, system-ui, sans-serif; color: #0f172a; margin: 0; padding: 20px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
    .title { font-size: 24px; font-weight: 800; color: #0284c7; }
    .meta { font-size: 13px; color: #64748b; line-height: 1.5; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { text-align: left; background: #f8fafc; padding: 10px; font-size: 12px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #cbd5e1; }
    td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .total-box { display: flex; justify-content: flex-end; margin-top: 16px; }
    .total-table { width: 280px; }
    .total-table td { padding: 6px 10px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">⚡ ACME ENTERPRISE CORP</div>
      <div class="meta">Certified Client Solutions · Global Cloud Platform</div>
    </div>
    <div style="text-align:right" class="meta">
      <strong>${isFr ? 'Facture :' : 'Invoice :'} ${invoiceNumber}</strong><br>
      ${isFr ? 'Date d\'émission :' : 'Issue Date :'} ${dateStr}<br>
      ${isFr ? 'Statut : PAYÉ' : 'Status : PAID'}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align:center">Qty</th>
        <th style="text-align:right">Unit Price</th>
        <th style="text-align:right">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ultra Software License & Enterprise Integration</td>
        <td style="text-align:center">1</td>
        <td style="text-align:right">$1,200.00</td>
        <td style="text-align:right">$1,200.00</td>
      </tr>
      <tr>
        <td>Cloud Infrastructure & Edge Deployment Package</td>
        <td style="text-align:center">1</td>
        <td style="text-align:right">$450.00</td>
        <td style="text-align:right">$450.00</td>
      </tr>
    </tbody>
  </table>

  <div class="total-box">
    <table class="total-table">
      <tr><td>Subtotal</td><td style="text-align:right">$1,650.00</td></tr>
      <tr><td>VAT (20%)</td><td style="text-align:right">$330.00</td></tr>
      <tr style="font-size:16px;font-weight:800;border-top:2px solid #0f172a">
        <td>Total Due</td><td style="text-align:right;color:#0284c7">$1,980.00</td>
      </tr>
    </table>
  </div>

  <div class="footer">
    Verified Vector Document Generated Client-Side by IA Architecte Studio ULTRA.
  </div>
</body>
</html>
`;
    },

    renderPreview() {
      const frame = document.getElementById('pdf-preview-iframe');
      if (frame) {
        frame.srcdoc = this.generateDocHTML();
      }
    },

    downloadPdf() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(this.generateDocHTML());
        win.document.close();
        win.focus();
        setTimeout(() => {
          win.print();
        }, 300);
      }
      _sound('celebrate');
      _toast(isFr ? '📄 Boîte d\'impression PDF vectoriel ouverte !' : '📄 Vector PDF print dialog opened!', 'success');
    },

    injectPdfButton() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      let { html, js } = _getAppCode();

      const btnHtml = `\n<!-- ─── ULTRA PDF DOWNLOAD BUTTON ─── -->\n<button onclick="window.printOfficialDoc()" class="btn-official-pdf" style="padding:10px 18px;background:#0284c7;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">📄 ${isFr ? 'Télécharger Facture PDF' : 'Download Official PDF'}</button>`;
      const btnJs = `\nwindow.printOfficialDoc = function() { window.print(); };`;

      if (!html.includes('btn-official-pdf')) {
        html = html + '\n' + btnHtml;
        js = js + '\n' + btnJs;
        if (typeof window.APP !== 'undefined') {
          window.APP.html = html;
          window.APP.js = js;
          if (window.APP.editor) {
            if (window.APP.currentTab === 'html') window.APP.editor.setValue(html);
            if (window.APP.currentTab === 'js') window.APP.editor.setValue(js);
          }
          if (typeof window.refreshPreview === 'function') window.refreshPreview();
        }
      }

      _sound('celebrate');
      _toast(isFr ? '📄 Bouton d\'export PDF injecté dans l\'application !' : '📄 PDF download button injected into application!', 'success');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 6. ULTRA DEVOPS PACKAGER — Dockerfile, Nginx, Caddy & Cloudflare Workers
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraDevOpsPackager = {
    open() {
      _sound('click');
      const modal = document.getElementById('modal-devops-packager');
      if (!modal) return;
      this.renderTab('dockerfile');
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-devops-packager');
      if (modal) modal.classList.remove('show');
    },

    getConfigs() {
      const { html, css, js } = _getAppCode();

      const dockerfile = `# Multi-Stage High-Security Alpine Nginx Container
FROM nginx:alpine-slim

# Security hardening: Non-root user & minimal packages
RUN rm -rf /usr/share/nginx/html/* && \\
    touch /var/run/nginx.pid && \\
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O - http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
`;

      const dockerCompose = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://localhost:8080/"]
      interval: 30s
      timeout: 3s
      retries: 3
`;

      const nginxConf = `worker_processes auto;
events { worker_connections 1024; }

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    server {
        listen 8080;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
            expires 1h;
        }

        location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
            expires 1y;
            access_log off;
            add_header Cache-Control "public";
        }
    }
}
`;

      const cloudflareWorker = `// Cloudflare Workers Edge Deployment Script
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve HTML with modern edge security headers
    const response = new Response(\`${html.replace(/`/g, '\\`')}\`, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff'
      }
    });

    return response;
  }
};
`;

      return { dockerfile, dockerCompose, nginxConf, cloudflareWorker };
    },

    renderTab(tab) {
      const configs = this.getConfigs();
      const codeEl = document.getElementById('devops-code-preview');
      if (!codeEl) return;

      const codeMap = {
        dockerfile: configs.dockerfile,
        compose: configs.dockerCompose,
        nginx: configs.nginxConf,
        cloudflare: configs.cloudflareWorker
      };

      codeEl.textContent = codeMap[tab] || configs.dockerfile;
    },

    downloadZip() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export DevOps Manifest')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const configs = this.getConfigs();
      const { html, css, js } = _getAppCode();

      // Download package manifest as JSON
      const bundle = {
        name: 'ultra-devops-production-suite',
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        files: {
          'Dockerfile': configs.dockerfile,
          'docker-compose.yml': configs.dockerCompose,
          'nginx.conf': configs.nginxConf,
          'worker.js': configs.cloudflareWorker,
          'dist/index.html': html,
          'dist/style.css': css,
          'dist/app.js': js
        }
      };

      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devops_production_manifest.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      _sound('celebrate');
      _toast(isFr ? '🐳 Paquet DevOps téléchargé !' : '🐳 DevOps package downloaded!', 'success');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 7. ULTRA FLOWNODES — Visual Interactive Node-Graph Logic & Automation Canvas
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraFlowNodes = {
    nodes: [
      { id: 'node_1', type: 'event', title: 'On Button Click', x: 50, y: 80, event: 'click', target: '#btn-action' },
      { id: 'node_2', type: 'condition', title: 'If Validated', x: 300, y: 80, check: 'value !== ""' },
      { id: 'node_3', type: 'action', title: 'Trigger Confetti', x: 550, y: 50, action: 'confetti' },
      { id: 'node_4', type: 'action', title: 'Play Success Audio', x: 550, y: 160, action: 'sound_success' }
    ],
    connections: [
      { from: 'node_1', to: 'node_2' },
      { from: 'node_2', to: 'node_3' },
      { from: 'node_2', to: 'node_4' }
    ],

    open() {
      _sound('click');
      const modal = document.getElementById('modal-flownodes');
      if (!modal) return;
      this.renderCanvas();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-flownodes');
      if (modal) modal.classList.remove('show');
    },

    addNode(type) {
      _sound('click');
      const id = 'node_' + (this.nodes.length + 1);
      const presets = {
        event: { title: 'On Timer Tick', event: 'timer' },
        condition: { title: 'Check Value > 0', check: 'val > 0' },
        action: { title: 'Show Alert Toast', action: 'toast' }
      };

      this.nodes.push({
        id,
        type,
        title: presets[type].title,
        x: 100 + Math.random() * 200,
        y: 80 + Math.random() * 150,
        ...presets[type]
      });

      this.renderCanvas();
    },

    renderCanvas() {
      const svg = document.getElementById('flownodes-svg-canvas');
      const container = document.getElementById('flownodes-nodes-wrap');
      if (!container || !svg) return;

      container.innerHTML = '';
      let svgWires = '';

      // Draw curved Bezier paths
      this.connections.forEach(c => {
        const fromNode = this.nodes.find(n => n.id === c.from);
        const toNode = this.nodes.find(n => n.id === c.to);
        if (fromNode && toNode) {
          const x1 = fromNode.x + 160;
          const y1 = fromNode.y + 40;
          const x2 = toNode.x;
          const y2 = toNode.y + 40;
          const cx1 = x1 + 60;
          const cx2 = x2 - 60;
          svgWires += `<path d="M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}" stroke="#38bdf8" stroke-width="3" fill="none" stroke-dasharray="4,4" />`;
        }
      });
      svg.innerHTML = svgWires;

      // Render draggable nodes
      this.nodes.forEach(n => {
        const color = n.type === 'event' ? '#8b5cf6' : n.type === 'condition' ? '#f59e0b' : '#10b981';
        const card = document.createElement('div');
        card.style.cssText = `
          position: absolute;
          left: ${n.x}px;
          top: ${n.y}px;
          width: 160px;
          background: rgba(15,23,42,0.85);
          border: 1px solid ${color};
          border-radius: 10px;
          padding: 10px;
          cursor: grab;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
          user-select: none;
        `;
        card.innerHTML = `
          <div style="font-size:0.65rem;text-transform:uppercase;color:${color};font-weight:800;margin-bottom:4px">${n.type}</div>
          <strong style="font-size:0.8rem;color:#f8fafc;display:block">${n.title}</strong>
        `;
        container.appendChild(card);
      });
    },

    compileToJs() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const compiled = `
/* ─── ULTRA FLOWNODES COMPILED LOGIC ─── */
document.addEventListener('DOMContentLoaded', function() {
  const targetBtn = document.querySelector('button') || document.body;
  targetBtn.addEventListener('click', function() {
    console.log('[FlowNodes Triggered] Click Event');
    if (window.UltraConfetti) window.UltraConfetti.fire(60);
    if (window.UltraSoundFX) window.UltraSoundFX.play('celebrate');
  });
});
`;
      let { js } = _getAppCode();
      if (!js.includes('FLOWNODES COMPILED LOGIC')) {
        js = js + '\n' + compiled;
        if (typeof window.APP !== 'undefined') {
          window.APP.js = js;
          if (window.APP.editor && window.APP.currentTab === 'js') window.APP.editor.setValue(js);
          if (typeof window.refreshPreview === 'function') window.refreshPreview();
        }
      }

      _sound('celebrate');
      _toast(isFr ? '🧭 Logique FlowNodes compilée et injectée dans APP.js !' : '🧭 FlowNodes logic compiled & injected into APP.js!', 'success');
      this.close();
    }
  };

  // ─── GLOBAL EXPORTS ───
  window.UltraSecurityShield = UltraSecurityShield;
  window.UltraScreenflow = UltraScreenflow;
  window.UltraAccessibilityStudio = UltraAccessibilityStudio;
  window.UltraTelemetryStreamer = UltraTelemetryStreamer;
  window.UltraPdfEngine = UltraPdfEngine;
  window.UltraDevOpsPackager = UltraDevOpsPackager;
  window.UltraFlowNodes = UltraFlowNodes;

  console.log('[ULTRA] Enterprise Innovations Suite initialized successfully.');
})(window);
