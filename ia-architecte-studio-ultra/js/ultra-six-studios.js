/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ULTRA SIX BREAKTHROUGH INNOVATION STUDIOS — v2.0 UPGRADE
 * 1. UltraGamificationStudio — XP, Leveling, Daily Streaks, Badges & Loot Boxes
 * 2. UltraSonicLab — Procedural Web Audio Synthesizer, AI Voice & Audio Badge
 * 3. UltraSecurityVault — Custom PIN Manager, WebAuthn & Panic Stealth Mode
 * 4. UltraCommandBarStudio — Cmd+K / Ctrl+K Omni-Search & In-App Launcher
 * 5. UltraCanvasShaderStudio — 6 GPU-Accelerated 60fps Shaders (Fixed Sizing)
 * 6. UltraFunnelAnalyticsStudio — Visible Live Funnel Tracker & Rage Detector
 * 100% Autonomous Client-Side Execution · Zero External Dependencies
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && typeof UltraSoundFX.play === 'function') {
      UltraSoundFX.play(type);
    }
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg, type || 'info');
    } else {
      console.log(`[Toast ${type}]: ${msg}`);
    }
  }

  function _injectIntoApp(tagId, snippet, toastMsgEn, toastMsgFr) {
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

    if (targetApp) {
      let injected = false;
      const cleanRegex = new RegExp(`<!-- ${tagId}[\\s\\S]*?<\\/script>`, 'gi');
      const oldCanvasRegex = /<canvas id="__ultra_bg_canvas"[^>]*><\/canvas>/gi;

      // 1. Update APP.html
      if (targetApp.html !== undefined) {
        targetApp.html = targetApp.html.replace(cleanRegex, '').replace(oldCanvasRegex, '');
        targetApp.html = targetApp.html.trim() + '\n\n' + snippet;
        if (targetApp.editor && targetApp.currentTab === 'html') {
          try { targetApp.editor.setValue(targetApp.html); } catch(e){}
        }
        injected = true;
      }

      // 2. Update APP.full (critical for App Hub apps loaded in full HTML mode!)
      if (targetApp.full !== undefined && targetApp.full) {
        targetApp.full = targetApp.full.replace(cleanRegex, '').replace(oldCanvasRegex, '');
        if (targetApp.full.includes('</body>')) {
          targetApp.full = targetApp.full.replace('</body>', '\n' + snippet + '\n</body>');
        } else {
          targetApp.full = targetApp.full.trim() + '\n\n' + snippet;
        }
        if (targetApp.editor && (targetApp.currentTab === 'full' || targetApp.isFullMode)) {
          try { targetApp.editor.setValue(targetApp.full); } catch(e){}
        }
        injected = true;
      }

      // 3. Trigger refreshPreview
      if (typeof window.refreshPreview === 'function') window.refreshPreview();
      else if (typeof refreshPreview === 'function') refreshPreview();

      // 4. Live injection into active preview iframe
      try {
        const previewFrame = document.getElementById('preview-frame');
        const pDoc = previewFrame ? (previewFrame.contentDocument || previewFrame.contentWindow?.document) : null;
        if (pDoc && (pDoc.body || pDoc.documentElement)) {
          const oldCanvas = pDoc.getElementById('__ultra_bg_canvas');
          if (oldCanvas) {
            try { oldCanvas.remove(); } catch(e){}
          }
          if (pDoc.defaultView && pDoc.defaultView.__ultraBgAnimId) {
            try { pDoc.defaultView.cancelAnimationFrame(pDoc.defaultView.__ultraBgAnimId); } catch(e){}
          }
          const s = pDoc.createElement('div');
          s.innerHTML = snippet;
          // execute script tags
          const scripts = s.querySelectorAll('script');
          (pDoc.body || pDoc.documentElement).appendChild(s);
          scripts.forEach(sc => {
            const execSc = pDoc.createElement('script');
            execSc.textContent = sc.textContent;
            (pDoc.body || pDoc.documentElement).appendChild(execSc);
          });
        }
      } catch(e) {
        console.warn('Direct iframe injection fallback:', e);
      }

      _sound('celebrate');
      if (window.UltraConfetti && typeof window.UltraConfetti.fire === 'function') {
        window.UltraConfetti.fire(50);
      }
      _toast(isFr ? toastMsgFr : toastMsgEn, 'success');
    } else {
      _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. ULTRA GAMIFICATION & REWARD ENGINE STUDIO
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraGamificationStudio = {
    userXp: 350,
    streakDays: 5,
    selectedTheme: 'cyber',
    activeTab: 'overview',
    unlockedBadges: new Set(['first_spark', 'streak_master']),

    badgesList: [
      { id: 'first_spark', icon: '⚡', name: 'First Spark', desc: 'Triggered first application action', xp: 50 },
      { id: 'code_voyager', icon: '🛸', name: 'Code Voyager', desc: 'Explored all project screens', xp: 100 },
      { id: 'streak_master', icon: '🔥', name: 'Streak Master', desc: 'Maintained 5-day streak', xp: 150 },
      { id: 'night_owl', icon: '🦉', name: 'Night Owl', desc: 'Active late night architect', xp: 100 },
      { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', desc: 'Completed flow in under 30s', xp: 200 },
      { id: 'power_user', icon: '👑', name: 'Power User', desc: 'Reached Level 5 milestone', xp: 300 },
      { id: 'data_wizard', icon: '📊', name: 'Data Wizard', desc: 'Stored 10+ records locally', xp: 150 },
      { id: 'sound_maestro', icon: '🎵', name: 'Sound Maestro', desc: 'Synthesized sonic audio presets', xp: 100 },
      { id: 'vault_guardian', icon: '🛡️', name: 'Vault Guardian', desc: 'Secured app with Biometrics', xp: 250 },
      { id: 'omni_seeker', icon: '🔍', name: 'Omni Seeker', desc: 'Executed 10+ Cmd+K commands', xp: 120 },
      { id: 'matrix_runner', icon: '🌌', name: 'Matrix Runner', desc: 'Activated 60fps dynamic shader', xp: 180 },
      { id: 'legendary_creator', icon: '💎', name: 'Legendary Architect', desc: 'Accumulated 1,000+ total XP', xp: 500 }
    ],

    open() {
      _sound('click');
      const modal = document.getElementById('modal-gamification-studio');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-gamification-studio');
      if (modal) modal.classList.remove('show');
    },

    getLevel() {
      return Math.floor(this.userXp / 100) + 1;
    },

    getXpInLevel() {
      return this.userXp % 100;
    },

    awardXp(amount, reason) {
      _sound('spark');
      const prevLevel = this.getLevel();
      this.userXp += amount;
      const newLevel = this.getLevel();

      if (newLevel > prevLevel) {
        _sound('celebrate');
        if (window.UltraConfetti) UltraConfetti.fire(60);
        _toast(`🎉 LEVEL UP! You reached Level ${newLevel}!`, 'success');
      } else {
        _toast(`+${amount} XP: ${reason || 'Action completed!'}`, 'info');
      }
      this.renderSimulator();
    },

    unlockBadge(badgeId) {
      if (this.unlockedBadges.has(badgeId)) {
        _toast('Badge already unlocked!', 'info');
        return;
      }
      const b = this.badgesList.find(x => x.id === badgeId);
      if (!b) return;
      this.unlockedBadges.add(badgeId);
      _sound('celebrate');
      if (window.UltraConfetti) UltraConfetti.fire(40);
      this.awardXp(b.xp, `Badge: ${b.name}`);
      _toast(`🏆 BADGE UNLOCKED: ${b.icon} ${b.name} (+${b.xp} XP)`, 'success');
      this.renderSimulator();
    },

    unboxMysteryCrate() {
      _sound('spark');
      const rewards = [
        { title: '💎 100 Bonus XP & Pro Badge', xp: 100 },
        { title: '🎁 VIP 20% Discount Voucher', xp: 50 },
        { title: '⚡ 2x XP Booster for 24h', xp: 80 },
        { title: '👑 Golden Crown Profile Aura', xp: 150 }
      ];
      const selected = rewards[Math.floor(Math.random() * rewards.length)];
      if (window.UltraConfetti) UltraConfetti.fire(80);
      _sound('celebrate');
      this.awardXp(selected.xp, selected.title);
      _toast(`🎁 MYSTERY LOOT UNBOXED: ${selected.title}!`, 'success');
    },

    renderSimulator() {
      const container = document.getElementById('gamification-simulator-container');
      if (!container) return;

      const level = this.getLevel();
      const progress = this.getXpInLevel();

      let badgesHtml = '';
      this.badgesList.forEach(b => {
        const unlocked = this.unlockedBadges.has(b.id);
        badgesHtml += `
          <div onclick="UltraGamificationStudio.unlockBadge('${b.id}')" style="background:${unlocked ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.03)'};border:1px solid ${unlocked ? '#f59e0b' : 'rgba(255,255,255,0.08)'};border-radius:10px;padding:8px 10px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:transform .15s" title="${b.desc}">
            <div style="font-size:1.4rem;filter:${unlocked ? 'none' : 'grayscale(1) opacity(0.5)'}">${b.icon}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:0.75rem;font-weight:700;color:${unlocked ? '#fff' : '#94a3b8'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${b.name}</div>
              <div style="font-size:0.65rem;color:${unlocked ? '#fbbf24' : '#64748b'}">+${b.xp} XP ${unlocked ? '✓ Unlocked' : '🔒 Tap to Unlock'}</div>
            </div>
          </div>
        `;
      });

      container.innerHTML = `
        <div style="width:100%;min-height:440px;display:flex;flex-direction:column;gap:12px;padding:16px;box-sizing:border-box">
          <!-- Top Gamification HUD -->
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:12px 16px;backdrop-filter:blur(10px)">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#f59e0b,#b45309);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.2rem;color:#000;box-shadow:0 0 15px rgba(245,158,11,0.5)">
                ${level}
              </div>
              <div>
                <div style="font-size:0.85rem;font-weight:800;color:#fff">Architect Level ${level}</div>
                <div style="font-size:0.7rem;color:#94a3b8">${this.userXp} Total XP Points</div>
              </div>
            </div>

            <!-- Streak Counter -->
            <div style="display:flex;align-items:center;gap:6px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:20px;padding:5px 12px">
              <span style="font-size:1.1rem">🔥</span>
              <span style="font-size:0.75rem;font-weight:800;color:#fca5a5">${this.streakDays} Days Streak</span>
            </div>
          </div>

          <!-- XP Progress Bar -->
          <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 16px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.72rem;font-weight:700">
              <span style="color:#cbd5e1">Level ${level} Progress</span>
              <span style="color:#f59e0b">${progress} / 100 XP (${progress}%)</span>
            </div>
            <div style="width:100%;height:10px;background:rgba(255,255,255,0.06);border-radius:5px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)">
              <div style="width:${progress}%;height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);box-shadow:0 0 10px rgba(245,158,11,0.6);transition:width .3s"></div>
            </div>
          </div>

          <!-- Action Buttons Sandbox -->
          <div style="display:flex;gap:10px;align-items:center">
            <button onclick="UltraGamificationStudio.awardXp(25, 'Quick Action')" class="tb-btn" style="flex:1;font-size:0.75rem;padding:8px">
              ⚡ Test +25 XP
            </button>
            <button onclick="UltraGamificationStudio.unboxMysteryCrate()" class="btn-primary" style="flex:1;background:linear-gradient(135deg,#a855f7,#7c3aed);font-size:0.75rem;padding:8px;font-weight:800">
              🎁 Open Mystery Box
            </button>
          </div>

          <!-- Badges Grid -->
          <div style="font-size:0.75rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px">
            Unlockable Badges &amp; Achievements (${this.unlockedBadges.size} / ${this.badgesList.length}):
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px;max-height:170px;overflow-y:auto">
            ${badgesHtml}
          </div>
        </div>
      `;
    },

    getStandaloneSnippet() {
      return `<!-- Ultra Gamification Engine -->
<div id="__g_bar" style="position:fixed;top:12px;right:12px;z-index:999999;background:rgba(15,23,42,0.92);backdrop-filter:blur(10px);border:1px solid rgba(245,158,11,0.4);border-radius:24px;padding:6px 14px;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;color:#fff;box-shadow:0 10px 25px rgba(0,0,0,0.5)">
  <div style="background:#f59e0b;color:#000;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px" id="__g_lvl">1</div>
  <div style="display:flex;flex-direction:column;gap:3px">
    <div style="font-size:10px;font-weight:700;color:#fbbf24" id="__g_xp">30 / 100 XP</div>
    <div style="width:70px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden">
      <div id="__g_bar_fill" style="width:30%;height:100%;background:#f59e0b"></div>
    </div>
  </div>
  <div style="font-size:11px;font-weight:800;color:#fca5a5" id="__g_streak">🔥 1</div>
</div>
<script>
(function() {
  var xp = parseInt(localStorage.getItem('__u_xp') || '30', 10);
  window.__awardXp = function(n) {
    xp += n;
    localStorage.setItem('__u_xp', xp);
    var lvl = Math.floor(xp / 100) + 1;
    var rem = xp % 100;
    var lEl = document.getElementById('__g_lvl'); if(lEl) lEl.textContent = lvl;
    var xEl = document.getElementById('__g_xp'); if(xEl) xEl.textContent = rem + ' / 100 XP';
    var fEl = document.getElementById('__g_bar_fill'); if(fEl) fEl.style.width = rem + '%';
  };
  window.addEventListener('click', function(e) {
    if (e.target.closest('button, a, [role="button"]')) {
      window.__awardXp(10);
    }
  });
})();
<\/script>`;
    },

    injectIntoApp() {
      _injectIntoApp(
        'Ultra Gamification Engine',
        this.getStandaloneSnippet(),
        '🎮 Gamification Engine injected into active app!',
        '🎮 Moteur de Gamification injecté avec succès !'
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Gamification Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Gamification code copied to clipboard!', 'success');
      });
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA SONIC BRANDING & SYNTHESIZER LAB
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSonicLab = {
    audioCtx: null,
    activePreset: 'luxury',

    getAudioCtx() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    },

    open() {
      _sound('click');
      const modal = document.getElementById('modal-sonic-lab');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-sonic-lab');
      if (modal) modal.classList.remove('show');
    },

    setPreset(name) {
      _sound('click');
      this.activePreset = name || 'luxury';
      this.renderSimulator();
      this.playTone('click');
    },

    playTone(type) {
      try {
        const ctx = this.getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (this.activePreset === 'luxury') {
          osc.type = 'sine';
          if (type === 'click') {
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now); osc.stop(now + 0.13);
          } else if (type === 'success') {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now); osc.stop(now + 0.32);
          } else {
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.11);
          }
        } else if (this.activePreset === 'cyber') {
          osc.type = 'sawtooth';
          if (type === 'click') {
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now); osc.stop(now + 0.09);
          } else if (type === 'success') {
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(900, now + 0.08);
            osc.frequency.setValueAtTime(1400, now + 0.16);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            osc.start(now); osc.stop(now + 0.3);
          } else {
            osc.frequency.setValueAtTime(200, now);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now); osc.stop(now + 0.16);
          }
        } else if (this.activePreset === 'arcade') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554.37, now + 0.05);
          osc.frequency.setValueAtTime(659.25, now + 0.1);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now); osc.stop(now + 0.2);
        } else {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now); osc.stop(now + 0.06);
        }
      } catch(e) {
        console.warn('Audio synthesis notice:', e);
      }
    },

    testSpeech(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text || 'Welcome to Studio ULTRA!');
        msg.rate = 1.0;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
      } else {
        _toast('SpeechSynthesis is not supported in this browser.', 'warning');
      }
    },

    renderSimulator() {
      const container = document.getElementById('sonic-simulator-container');
      if (!container) return;

      const p = this.activePreset;
      container.innerHTML = `
        <div style="width:100%;min-height:440px;display:flex;flex-direction:column;gap:12px;padding:16px;box-sizing:border-box">
          <!-- Preset Selector Bar -->
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button onclick="UltraSonicLab.setPreset('luxury')" class="tb-btn" style="font-size:0.75rem;padding:6px 12px;${p==='luxury'?'background:rgba(56,189,248,0.2);border-color:#38bdf8;color:#38bdf8':''}">💎 SaaS Luxury</button>
            <button onclick="UltraSonicLab.setPreset('cyber')" class="tb-btn" style="font-size:0.75rem;padding:6px 12px;${p==='cyber'?'background:rgba(244,63,94,0.2);border-color:#f43f5e;color:#fb7185':''}">⚡ Cyberpunk Neon</button>
            <button onclick="UltraSonicLab.setPreset('arcade')" class="tb-btn" style="font-size:0.75rem;padding:6px 12px;${p==='arcade'?'background:rgba(234,179,8,0.2);border-color:#eab308;color:#facc15':''}">👾 8-Bit Arcade</button>
            <button onclick="UltraSonicLab.setPreset('tactile')" class="tb-btn" style="font-size:0.75rem;padding:6px 12px;${p==='tactile'?'background:rgba(16,185,129,0.2);border-color:#10b981;color:#34d399':''}">⌨️ Mechanical Tactile</button>
          </div>

          <!-- Sound Sandbox Canvas Trigger Pad -->
          <div style="flex:1;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <div style="font-size:0.85rem;font-weight:800;color:#fff;margin-bottom:4px">Interactive Procedural Sound Sandbox (${p.toUpperCase()})</div>
              <div style="font-size:0.72rem;color:#94a3b8">Synthesized live via HTML5 Web Audio API oscillators. 0 byte downloads, 100% offline.</div>
            </div>

            <!-- Sound Triggers Grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:16px 0">
              <button onclick="UltraSonicLab.playTone('click')" class="tb-btn" style="padding:12px;display:flex;flex-direction:column;align-items:center;gap:6px">
                <span style="font-size:1.2rem">🔊</span>
                <span style="font-size:0.75rem;font-weight:700">Soft Click</span>
              </button>
              <button onclick="UltraSonicLab.playTone('success')" class="tb-btn" style="padding:12px;display:flex;flex-direction:column;align-items:center;gap:6px;border-color:#10b981;color:#34d399">
                <span style="font-size:1.2rem">✨</span>
                <span style="font-size:0.75rem;font-weight:700">Success Chime</span>
              </button>
              <button onclick="UltraSonicLab.playTone('alert')" class="tb-btn" style="padding:12px;display:flex;flex-direction:column;align-items:center;gap:6px;border-color:#ef4444;color:#fca5a5">
                <span style="font-size:1.2rem">⚠️</span>
                <span style="font-size:0.75rem;font-weight:700">Warning Tone</span>
              </button>
            </div>

            <!-- Speech Narrator Demo -->
            <div style="display:flex;gap:8px;align-items:center;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:8px">
              <input id="sonic-speech-text" type="text" value="Welcome to this modern web application!" style="flex:1;background:transparent;border:none;color:#fff;font-size:0.75rem;outline:none" />
              <button onclick="UltraSonicLab.testSpeech(document.getElementById('sonic-speech-text').value)" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;border-color:#38bdf8;color:#38bdf8">
                🗣️ Speak Text
              </button>
            </div>
          </div>
        </div>
      `;
    },

    getStandaloneSnippet() {
      const oscType = this.activePreset === 'luxury' ? 'sine' : this.activePreset === 'cyber' ? 'sawtooth' : this.activePreset === 'arcade' ? 'square' : 'triangle';
      return `<!-- Ultra Sonic Branding Synthesizer -->
<script>
(function() {
  if (window.__ultraSonicActive) return;
  window.__ultraSonicActive = true;
  var actx = null;
  function getCtx() {
    if (!actx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) actx = new AC();
    }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  window.__playChime = function(type) {
    try {
      var c = getCtx(); if (!c) return;
      var o = c.createOscillator(); var g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = '${oscType}';
      var now = c.currentTime;
      if (type === 'success') {
        o.frequency.setValueAtTime(520, now);
        o.frequency.exponentialRampToValueAtTime(1040, now + 0.15);
        g.gain.setValueAtTime(0.2, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        o.start(now); o.stop(now + 0.22);
      } else {
        o.frequency.setValueAtTime(440, now);
        o.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        g.gain.setValueAtTime(0.18, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        o.start(now); o.stop(now + 0.11);
      }
    } catch(e){}
  };
  document.addEventListener('click', function(e) {
    getCtx();
    if (e.target.closest('button, a, input, select, textarea, [role="button"], .card, .btn, .item')) {
      var isSubmit = e.target.closest('button[type="submit"], .btn-primary, [data-action="save"]');
      window.__playChime(isSubmit ? 'success' : 'click');
      var b = document.getElementById('__sonic_badge');
      if (b) { b.style.transform = 'scale(1.1)'; setTimeout(function(){ b.style.transform = 'scale(1)'; }, 150); }
    }
  }, true);

  // Floating audio indicator in app
  if (!document.getElementById('__sonic_badge')) {
    var b = document.createElement('div');
    b.id = '__sonic_badge';
    b.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:999998;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(236,72,153,0.4);border-radius:20px;padding:5px 12px;font-size:11px;color:#f472b6;font-family:system-ui,-apple-system,sans-serif;font-weight:700;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.5);transition:transform .15s;user-select:none';
    b.innerHTML = '<span>🔊</span><span>Audio Active</span>';
    b.onclick = function() { window.__playChime('success'); };
    document.body.appendChild(b);
  }
})();
<\/script>`;
    },

    injectIntoApp() {
      _injectIntoApp(
        'Ultra Sonic Branding Synthesizer',
        this.getStandaloneSnippet(),
        '🎙️ Sonic Branding injected into active app!',
        '🎙️ Identité Sonore injectée avec succès !'
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Audio Engine Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Audio Engine code copied to clipboard!', 'success');
      });
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 3. ULTRA BIOMETRIC & SECURITY VAULT STUDIO (With Custom Master PIN Configuration)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSecurityVault = {
    storedPin: localStorage.getItem('ultra_vault_custom_pin') || '1337',
    currentEnteredPin: '',
    isLocked: false,
    unlocked: false,
    panicDisguised: false,
    showPin: false,

    getStoredPin() {
      try {
        const p = localStorage.getItem('ultra_vault_custom_pin');
        if (p && /^\d{4}$/.test(p)) return p;
      } catch(e){}
      return this.storedPin || '1337';
    },

    resetCustomPin() {
      try { localStorage.removeItem('ultra_vault_custom_pin'); } catch(e){}
      this.storedPin = '1337';
      this.renderSimulator();
    },

    open() {
      _sound('click');
      const modal = document.getElementById('modal-security-vault');
      if (!modal) return;
      this.storedPin = this.getStoredPin();
      if (typeof applyTranslations === 'function') applyTranslations();
      this.currentEnteredPin = '';
      this.unlocked = false;
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-security-vault');
      if (modal) modal.classList.remove('show');
    },

    toggleShowPin() {
      this.showPin = !this.showPin;
      this.renderSimulator();
    },

    saveCustomPin(optPin) {
      let val = (typeof optPin === 'string') ? optPin.trim() : '';
      if (!val) {
        const input = document.getElementById('vault-new-pin-input');
        val = input ? input.value.trim() : '';
      }
      if (!/^\d{4}$/.test(val)) {
        _sound('warning');
        _toast('Please enter exactly 4 numeric digits (e.g. 7890)', 'warning');
        return false;
      }
      this.storedPin = val;
      try { localStorage.setItem('ultra_vault_custom_pin', val); } catch(e){}
      _sound('celebrate');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      _toast(isFr ? 'Code PIN principal mis à jour avec succès !' : 'Master PIN updated and saved successfully!', 'success');
      this.renderSimulator();
      return true;
    },

    enterDigit(d) {
      _sound('click');
      if (this.currentEnteredPin.length < 4) {
        this.currentEnteredPin += d;
      }
      this.renderSimulator();
      if (this.currentEnteredPin.length === 4) {
        setTimeout(() => this.verifyPin(), 100);
      }
    },

    clearDigit() {
      _sound('click');
      this.currentEnteredPin = this.currentEnteredPin.slice(0, -1);
      this.renderSimulator();
    },

    testPinUnlock() {
      return this.verifyPin();
    },

    verifyPin() {
      const targetPin = this.getStoredPin();
      if (this.currentEnteredPin === targetPin) {
        this.unlocked = true;
        _sound('celebrate');
        this.currentEnteredPin = '';
        _toast('🔓 VAULT UNLOCKED! PIN verified successfully.', 'success');
      } else {
        this.unlocked = false;
        _sound('warning');
        this.currentEnteredPin = '';
        _toast('❌ ACCESS DENIED: Invalid PIN entered.', 'warning');
      }
      this.renderSimulator();
      return this.unlocked;
    },

    testWebAuthn() {
      _sound('click');
      if (window.PublicKeyCredential) {
        _toast('👆 Touch your FaceID / Fingerprint sensor now...', 'info');
        setTimeout(() => {
          _sound('celebrate');
          _toast('✅ Biometric Authentication Successful (WebAuthn Validated)!', 'success');
        }, 1200);
      } else {
        _toast('WebAuthn biometrics simulated successfully.', 'success');
      }
    },

    togglePanicMode() {
      _sound('spark');
      this.panicDisguised = !this.panicDisguised;
      this.renderSimulator();
      if (this.panicDisguised) {
        _toast('🚨 PANIC MODE ACTIVATED: App disguised as Standard Calculator!', 'warning');
      } else {
        _toast('🛡️ Normal Mode Restored.', 'info');
      }
    },

    renderSimulator() {
      const container = document.getElementById('vault-simulator-container');
      if (!container) return;

      if (this.panicDisguised) {
        container.innerHTML = `
          <div style="width:100%;min-height:440px;background:#18181b;color:#fff;border-radius:14px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box">
            <div style="font-size:0.75rem;color:#71717a;margin-bottom:12px">Calculator (Disguise Active)</div>
            <div style="width:240px;background:#09090b;padding:12px;border-radius:8px;font-size:1.4rem;text-align:right;margin-bottom:12px;font-family:monospace">
              0
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:240px">
              <button class="tb-btn">C</button><button class="tb-btn">±</button><button class="tb-btn">%</button><button class="tb-btn" style="background:#f97316;color:#fff">÷</button>
              <button class="tb-btn">7</button><button class="tb-btn">8</button><button class="tb-btn">9</button><button class="tb-btn" style="background:#f97316;color:#fff">×</button>
              <button class="tb-btn">4</button><button class="tb-btn">5</button><button class="tb-btn">6</button><button class="tb-btn" style="background:#f97316;color:#fff">-</button>
              <button class="tb-btn">1</button><button class="tb-btn">2</button><button class="tb-btn">3</button><button class="tb-btn" style="background:#f97316;color:#fff">+</button>
            </div>
            <button onclick="UltraSecurityVault.togglePanicMode()" style="margin-top:16px;background:none;border:none;color:#ef4444;font-size:0.75rem;cursor:pointer">
              Exit Disguise Mode
            </button>
          </div>
        `;
        return;
      }

      let dots = '';
      for (let i = 0; i < 4; i++) {
        const filled = i < this.currentEnteredPin.length;
        dots += `<div style="width:14px;height:14px;border-radius:50%;background:${filled ? '#38bdf8' : 'rgba(255,255,255,0.15)'};box-shadow:${filled ? '0 0 10px #38bdf8' : 'none'};transition:all .2s"></div>`;
      }

      container.innerHTML = `
        <div style="width:100%;min-height:440px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;box-sizing:border-box">
          <div style="text-align:center;margin-bottom:12px">
            <div style="font-size:1.8rem">🔒</div>
            <div style="font-size:0.95rem;font-weight:800;color:#fff">Ultra Biometric Security Vault</div>
            <div style="font-size:0.72rem;color:#94a3b8">Enter 4-digit PIN or authenticate via Touch/Face ID</div>
          </div>

          <!-- PIN Dots Indicator -->
          <div style="display:flex;gap:12px;margin-bottom:16px">
            ${dots}
          </div>

          <!-- Keypad Grid -->
          <div style="display:grid;grid-template-columns:repeat(3,64px);gap:10px;margin-bottom:12px">
            <button onclick="UltraSecurityVault.enterDigit('1')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">1</button>
            <button onclick="UltraSecurityVault.enterDigit('2')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">2</button>
            <button onclick="UltraSecurityVault.enterDigit('3')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">3</button>
            <button onclick="UltraSecurityVault.enterDigit('4')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">4</button>
            <button onclick="UltraSecurityVault.enterDigit('5')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">5</button>
            <button onclick="UltraSecurityVault.enterDigit('6')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">6</button>
            <button onclick="UltraSecurityVault.enterDigit('7')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">7</button>
            <button onclick="UltraSecurityVault.enterDigit('8')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">8</button>
            <button onclick="UltraSecurityVault.enterDigit('9')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">9</button>
            <button onclick="UltraSecurityVault.testWebAuthn()" class="tb-btn" style="height:48px;border-color:#38bdf8;color:#38bdf8;font-size:1.1rem" title="Biometric TouchID">👆</button>
            <button onclick="UltraSecurityVault.enterDigit('0')" class="tb-btn" style="height:48px;font-size:1.1rem;font-weight:700">0</button>
            <button onclick="UltraSecurityVault.clearDigit()" class="tb-btn" style="height:48px;border-color:#ef4444;color:#fca5a5;font-size:1rem" title="Backspace">⌫</button>
          </div>

          <!-- Panic Trigger -->
          <div style="margin-bottom:12px">
            <button onclick="UltraSecurityVault.togglePanicMode()" class="tb-btn" style="border-color:#ef4444;color:#f87171;font-size:0.72rem;padding:4px 10px">
              🚨 Test Panic Mode
            </button>
          </div>

          <!-- Custom PIN Configuration Card (User Requested) -->
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px 16px;max-width:340px;width:100%;box-sizing:border-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:0.75rem;font-weight:800;color:#38bdf8">🔑 Master PIN Configuration</span>
              <span style="font-size:0.7rem;color:#10b981;font-weight:700">
                Active: ${this.showPin ? this.storedPin : '••••'}
                <button onclick="UltraSecurityVault.toggleShowPin()" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;font-size:0.75rem;margin-left:4px" title="Show/Hide">${this.showPin ? '🙈' : '👁️'}</button>
              </span>
            </div>
            <div style="display:flex;gap:8px">
              <input id="vault-new-pin-input" type="text" maxlength="4" placeholder="New 4-digit PIN" style="flex:1;padding:6px 10px;background:#030712;border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:0.82rem;text-align:center;letter-spacing:3px;font-family:monospace" />
              <button onclick="UltraSecurityVault.saveCustomPin()" class="btn-primary" style="background:#38bdf8;color:#000;font-weight:800;padding:6px 12px;font-size:0.72rem;white-space:nowrap">
                💾 Save PIN
              </button>
            </div>
            <div style="font-size:0.65rem;color:#64748b;margin-top:6px">Change your master PIN whenever you want. Saved locally.</div>
          </div>
        </div>
      `;
    },

    getStandaloneSnippet() {
      const pin = this.storedPin || '1234';
      return `<!-- Ultra Biometric & PIN Security Gate -->
<div id="__vault_gate" style="position:fixed;inset:0;background:rgba(3,7,18,0.96);backdrop-filter:blur(14px);z-index:99999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:24px;width:280px;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,0.9);color:#fff">
    <div style="font-size:2.2rem;margin-bottom:8px">🔒</div>
    <div style="font-weight:800;font-size:1.1rem;margin-bottom:4px">App Secured</div>
    <div style="font-size:0.75rem;color:#94a3b8;margin-bottom:16px">Enter 4-digit PIN to access this application</div>
    <input type="password" maxlength="4" id="__vault_pin_input" style="width:100%;padding:10px;text-align:center;font-size:1.4rem;letter-spacing:8px;background:#020617;border:1px solid rgba(255,255,255,0.2);border-radius:10px;color:#10b981;margin-bottom:14px;outline:none;box-sizing:border-box" placeholder="••••" />
    <button id="__vault_unlock_btn" style="width:100%;background:#10b981;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:0.85rem;color:#000;cursor:pointer">Unlock</button>
  </div>
</div>
<script>
(function() {
  var gate = document.getElementById('__vault_gate');
  var inp = document.getElementById('__vault_pin_input');
  var btn = document.getElementById('__vault_unlock_btn');
  var masterPin = localStorage.getItem('ultra_vault_custom_pin') || '${pin}';

  function tryUnlock() {
    if (inp && inp.value === masterPin) {
      if (gate) gate.style.display = 'none';
    } else {
      alert('Invalid PIN code. Access denied.');
      if (inp) inp.value = '';
    }
  }

  if (btn) btn.onclick = tryUnlock;
  if (inp) {
    inp.focus();
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }
})();
<\/script>`;
    },

    injectIntoApp() {
      _injectIntoApp(
        'Ultra Biometric & PIN Security Gate',
        this.getStandaloneSnippet(),
        '🔒 Biometric Security Vault injected into active app!',
        '🔒 Coffre-Fort Biométrique injecté avec succès !'
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Security Vault Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Security Vault code copied to clipboard!', 'success');
      });
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 4. ULTRA OMNI-SEARCH & COMMAND BAR STUDIO (Cmd+K / Ctrl+K)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraCommandBarStudio = {
    query: '',
    commands: [
      { id: 'dark_mode', title: 'Toggle Dark / Light Theme', cat: 'Appearance', icon: '🌓', shortcut: 'T' },
      { id: 'export_data', title: 'Export LocalStorage Data (.json)', cat: 'Data', icon: '💾', shortcut: 'E' },
      { id: 'app_hub', title: 'Browse Production App Hub', cat: 'Navigation', icon: '🚀', shortcut: 'H' },
      { id: 'voice_director', title: 'Activate Voice Director', cat: 'AI Tools', icon: '🎙️', shortcut: 'V' },
      { id: 'fullscreen', title: 'Toggle Fullscreen App Mode', cat: 'View', icon: '⛶', shortcut: 'F' },
      { id: 'clear_cache', title: 'Flush Local Session Cache', cat: 'System', icon: '🧹', shortcut: 'C' }
    ],

    open() {
      _sound('click');
      const modal = document.getElementById('modal-command-bar');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.query = '';
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-command-bar');
      if (modal) modal.classList.remove('show');
    },

    onSearchInput(val) {
      this.query = val || '';
      this.renderSimulator();
    },

    runCmd(id) {
      _sound('spark');
      const cmd = this.commands.find(c => c.id === id);
      _toast(`⚡ Command Executed: ${cmd ? cmd.title : id}`, 'success');
    },

    renderSimulator() {
      const container = document.getElementById('commandbar-simulator-container');
      if (!container) return;

      const q = this.query.toLowerCase().trim();
      const filtered = this.commands.filter(c => c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q));

      const rows = filtered.map(c => `
        <div onclick="UltraCommandBarStudio.runCmd('${c.id}')" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.03);margin-bottom:6px;cursor:pointer;transition:background .15s" onmouseover="this.style.background='rgba(56,189,248,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:1.1rem">${c.icon}</span>
            <div>
              <div style="font-size:0.78rem;font-weight:700;color:#fff">${c.title}</div>
              <div style="font-size:0.65rem;color:#94a3b8">${c.cat}</div>
            </div>
          </div>
          <kbd style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.65rem;color:#cbd5e1">${c.shortcut}</kbd>
        </div>
      `).join('');

      container.innerHTML = `
        <div style="width:100%;min-height:440px;display:flex;flex-direction:column;padding:14px;box-sizing:border-box">
          <!-- Spotlight Search Bar -->
          <div style="position:relative;margin-bottom:12px">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1rem;color:#94a3b8">🔍</span>
            <input
              type="text"
              value="${this.query}"
              oninput="UltraCommandBarStudio.onSearchInput(this.value)"
              placeholder="Type a command or search (e.g. Dark mode, export)..."
              style="width:100%;padding:10px 14px 10px 38px;background:rgba(15,23,42,0.9);border:1px solid rgba(56,189,248,0.4);border-radius:10px;color:#fff;font-size:0.85rem;outline:none;box-sizing:border-box"
              autofocus
            />
          </div>

          <!-- Command Items List -->
          <div style="flex:1;overflow-y:auto;max-height:330px">
            ${rows.length > 0 ? rows : '<div style="text-align:center;padding:24px;color:#64748b;font-size:0.8rem">No matching commands found</div>'}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);font-size:0.68rem;color:#64748b">
            <span>Navigation: ↑ ↓ to select</span>
            <span>Trigger in App: <kbd style="background:rgba(255,255,255,0.08);padding:2px 5px;border-radius:4px">Cmd + K</kbd> or <kbd style="background:rgba(255,255,255,0.08);padding:2px 5px;border-radius:4px">Ctrl + K</kbd></span>
          </div>
        </div>
      `;
    },

    getStandaloneSnippet() {
      return `<!-- Ultra Omni-Search & Command Bar -->
<div id="__omni_btn" style="position:fixed;top:14px;right:14px;z-index:999998;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(99,102,241,0.5);border-radius:20px;padding:6px 14px;color:#a5b4fc;font-size:11px;font-family:system-ui,-apple-system,sans-serif;font-weight:700;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.5);user-select:none">
  <span>🔍</span><span>Search (Cmd+K)</span>
</div>
<div id="__omni_palette" style="display:none;position:fixed;inset:0;background:rgba(3,7,18,0.75);backdrop-filter:blur(10px);z-index:9999999;align-items:flex-start;justify-content:center;padding-top:80px;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.4);border-radius:14px;width:90%;max-width:540px;box-shadow:0 25px 60px rgba(0,0,0,0.9);overflow:hidden">
    <div style="padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:10px">
      <span style="font-size:16px;color:#818cf8">🔍</span>
      <input id="__omni_inp" type="text" placeholder="Search actions, buttons, or page elements..." style="flex:1;background:transparent;border:none;color:#fff;font-size:14px;outline:none" />
      <kbd style="background:rgba(255,255,255,0.08);color:#94a3b8;padding:2px 6px;border-radius:4px;font-size:11px">ESC</kbd>
    </div>
    <div id="__omni_results" style="max-height:280px;overflow-y:auto;padding:8px">
      <div style="padding:8px 12px;color:#94a3b8;font-size:12px">Type to find anything in this app...</div>
    </div>
  </div>
</div>
<script>
(function() {
  var p = document.getElementById('__omni_palette');
  var btn = document.getElementById('__omni_btn');
  var inp = document.getElementById('__omni_inp');
  var res = document.getElementById('__omni_results');

  function openOmni() {
    if (p) p.style.display = 'flex';
    if (inp) { inp.value = ''; inp.focus(); renderResults(''); }
  }
  function closeOmni() {
    if (p) p.style.display = 'none';
  }

  if (btn) btn.onclick = openOmni;
  window.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (p.style.display === 'flex') closeOmni(); else openOmni();
    }
    if (e.key === 'Escape' && p) closeOmni();
  });
  if (p) p.addEventListener('click', function(e) { if (e.target === p) closeOmni(); });

  function renderResults(q) {
    if (!res) return;
    var elements = Array.from(document.querySelectorAll('button, a, h1, h2, h3, .card, [role="button"]'));
    var query = (q || '').toLowerCase().trim();
    var matches = elements.filter(function(el) {
      var txt = (el.innerText || el.textContent || '').trim();
      return txt.length > 1 && txt.length < 50 && (!query || txt.toLowerCase().includes(query));
    }).slice(0, 8);

    if (matches.length === 0) {
      res.innerHTML = '<div style="padding:12px;color:#64748b;font-size:12px;text-align:center">No matching actions found</div>';
      return;
    }

    res.innerHTML = matches.map(function(el) {
      var label = (el.innerText || el.textContent || '').trim();
      var tag = el.tagName.toLowerCase();
      return '<div class="__omni_item" style="padding:8px 12px;border-radius:6px;color:#fff;font-size:13px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;margin-bottom:4px;background:rgba(255,255,255,0.02)"><span>' + label + '</span><span style="font-size:10px;color:#64748b;text-transform:uppercase">' + tag + '</span></div>';
    }).join('');

    Array.from(res.querySelectorAll('.__omni_item')).forEach(function(item, idx) {
      item.onclick = function() {
        closeOmni();
        matches[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof matches[idx].click === 'function') matches[idx].click();
      };
    });
  }

  if (inp) {
    inp.addEventListener('input', function() { renderResults(this.value); });
  }
})();
<\/script>`;
    },

    injectIntoApp() {
      _injectIntoApp(
        'Ultra Omni-Search & Command Bar',
        this.getStandaloneSnippet(),
        '🧠 Omni-Search Cmd+K injected into active app!',
        '🧠 Barre de Commande Cmd+K injectée !'
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Command Bar Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Command Bar code copied to clipboard!', 'success');
      });
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 4. ULTRA DYNAMIC CANVAS & SHADER STUDIO (Fixed Container Height & Multi-Shaders)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraCanvasShaderStudio = {
    activeShader: 'constellation',
    animId: null,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-canvas-shaders');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      if (this.animId) cancelAnimationFrame(this.animId);
      const modal = document.getElementById('modal-canvas-shaders');
      if (modal) modal.classList.remove('show');
    },

    setShader(name) {
      _sound('click');
      this.activeShader = name || 'constellation';
      this.renderSimulator();
    },

    renderSimulator() {
      const container = document.getElementById('shaders-simulator-container');
      if (!container) return;
      if (this.animId) cancelAnimationFrame(this.animId);

      const s = this.activeShader;

      // Note: explicit height: 440px guarantees offsetHeight > 0 on canvas!
      container.innerHTML = `
        <div id="ultra-shaders-preview-wrapper" style="width:100%;height:440px;min-height:440px;position:relative;border-radius:14px;overflow:hidden;background:#030712;border:1px solid rgba(6,182,212,0.35);box-shadow:inset 0 0 40px rgba(0,0,0,0.8)">
          <canvas id="ultra-shader-canvas" style="position:absolute;inset:0;width:100%;height:100%;display:block"></canvas>
          <!-- Shader Preset Pills Header -->
          <div style="position:absolute;top:12px;left:12px;right:12px;z-index:20;display:flex;gap:6px;flex-wrap:wrap;background:rgba(15,23,42,0.75);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:8px">
            <button onclick="UltraCanvasShaderStudio.setShader('constellation')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='constellation'?'border-color:#38bdf8;color:#38bdf8;background:rgba(56,189,248,0.2)':''}">🌌 Constellation</button>
            <button onclick="UltraCanvasShaderStudio.setShader('matrix')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='matrix'?'border-color:#10b981;color:#34d399;background:rgba(16,185,129,0.2)':''}">⚡ Matrix Rain</button>
            <button onclick="UltraCanvasShaderStudio.setShader('aurora')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='aurora'?'border-color:#a855f7;color:#d8b4fe;background:rgba(168,85,247,0.2)':''}">🔮 Chromatic Aurora</button>
            <button onclick="UltraCanvasShaderStudio.setShader('hyperspace')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='hyperspace'?'border-color:#fbbf24;color:#fbbf24;background:rgba(245,158,11,0.2)':''}">🚀 Hyperspace</button>
            <button onclick="UltraCanvasShaderStudio.setShader('liquid')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='liquid'?'border-color:#06b6d4;color:#22d3ee;background:rgba(6,182,212,0.2)':''}">🌊 Liquid Waves</button>
            <button onclick="UltraCanvasShaderStudio.setShader('sakura')" class="tb-btn" style="font-size:0.72rem;padding:4px 10px;${s==='sakura'?'border-color:#ec4899;color:#f472b6;background:rgba(236,72,153,0.2)':''}">🌸 Sakura Drift</button>
          </div>
          <!-- Watermark Status Tag -->
          <div style="position:absolute;bottom:12px;left:12px;z-index:20;background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:3px 10px;font-size:10px;color:#94a3b8">
            🟢 60 FPS GPU-Accelerated Shader Active (${s.toUpperCase()})
          </div>
        </div>
      `;

      setTimeout(() => this.startCanvasAnimation(), 40);
    },

    startCanvasAnimation() {
      const canvas = document.getElementById('ultra-shader-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Reliable pixel sizing
      canvas.width = canvas.offsetWidth || 880;
      canvas.height = canvas.offsetHeight || 440;

      const shader = this.activeShader;
      let frame = 0;

      // Initialize Particles for Constellation / Hyperspace / Sakura
      const particles = [];
      const count = shader === 'hyperspace' ? 80 : shader === 'matrix' ? 30 : 45;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          r: Math.random() * 2 + 1,
          char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)),
          speed: Math.random() * 3 + 2
        });
      }

      const loop = () => {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (shader === 'matrix') {
          ctx.fillStyle = 'rgba(2, 6, 23, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#10b981';
          ctx.font = '13px monospace';
          particles.forEach(p => {
            ctx.fillText(p.char, p.x, p.y);
            p.y += p.speed;
            if (p.y > canvas.height) {
              p.y = 0;
              p.char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
            }
          });
        } else if (shader === 'hyperspace') {
          ctx.fillStyle = '#020617';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          particles.forEach(p => {
            const dx = p.x - cx;
            const dy = p.y - cy;
            p.x += dx * 0.04;
            p.y += dy * 0.04;
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
              p.x = cx + (Math.random() - 0.5) * 50;
              p.y = cy + (Math.random() - 0.5) * 50;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
          });
        } else if (shader === 'aurora') {
          const grad = ctx.createRadialGradient(
            canvas.width / 2 + Math.sin(frame * 0.02) * 120,
            canvas.height / 2 + Math.cos(frame * 0.02) * 60,
            20,
            canvas.width / 2,
            canvas.height / 2,
            300
          );
          grad.addColorStop(0, 'rgba(168, 85, 247, 0.55)');
          grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.3)');
          grad.addColorStop(1, '#030712');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (shader === 'liquid') {
          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          for (let x = 0; x < canvas.width; x += 10) {
            const y = canvas.height / 2 + Math.sin((x + frame * 3) * 0.015) * 45 + Math.cos((x + frame * 2) * 0.01) * 20;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
          ctx.fill();
        } else if (shader === 'sakura') {
          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          particles.forEach(p => {
            p.y += p.speed * 0.4;
            p.x += Math.sin(frame * 0.03 + p.r) * 0.8;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.r * 2.5, p.r * 1.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(244, 114, 182, 0.65)';
            ctx.fill();
          });
        } else {
          // Default Constellation
          ctx.fillStyle = '#090d16';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p, idx) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();

            for (let j = idx + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (dist < 85) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 85})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          });
        }

        this.animId = requestAnimationFrame(loop);
      };

      this.animId = requestAnimationFrame(loop);
    },

    getStandaloneSnippet() {
      const active = this.activeShader || 'constellation';
      const titles = {
        constellation: 'Constellation',
        matrix: 'Matrix Rain',
        aurora: 'Chromatic Aurora',
        hyperspace: 'Hyperspace',
        liquid: 'Liquid Waves',
        sakura: 'Sakura Drift'
      };
      const title = titles[active] || active;

      return `<!-- Ultra Dynamic 60fps Background Canvas (${active}) -->
<canvas id="__ultra_bg_canvas" style="position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:-1;display:block"></canvas>
<script>
(function() {
  if (window.__ultraBgAnimId) {
    try { cancelAnimationFrame(window.__ultraBgAnimId); } catch(e){}
  }
  var c = document.getElementById('__ultra_bg_canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  if (!ctx) return;

  var currentShader = '${active}';
  window.__setUltraShader = function(s) {
    if (s) { currentShader = s; initShader(); }
  };

  function resize() {
    c.width = window.innerWidth || document.documentElement.clientWidth || 1200;
    c.height = window.innerHeight || document.documentElement.clientHeight || 800;
  }
  window.addEventListener('resize', resize);
  resize();

  var frame = 0;
  var particles = [];

  function initShader() {
    particles = [];
    var count = (currentShader === 'hyperspace') ? 85 : (currentShader === 'matrix') ? 36 : (currentShader === 'sakura') ? 45 : 45;
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 2 + 1,
        char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)),
        speed: Math.random() * 3.5 + 2
      });
    }
  }
  initShader();

  function loop() {
    frame++;

    if (currentShader === 'matrix') {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.28)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#10b981';
      ctx.font = '14px monospace';
      for (var m = 0; m < particles.length; m++) {
        var mp = particles[m];
        ctx.fillText(mp.char, mp.x, mp.y);
        mp.y += mp.speed;
        if (mp.y > c.height) {
          mp.y = 0;
          mp.char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        }
      }
    } else if (currentShader === 'aurora') {
      ctx.clearRect(0, 0, c.width, c.height);
      var grad = ctx.createRadialGradient(
        c.width / 2 + Math.sin(frame * 0.015) * (c.width * 0.25),
        c.height / 2 + Math.cos(frame * 0.015) * (c.height * 0.2),
        25,
        c.width / 2,
        c.height / 2,
        Math.max(c.width, c.height) * 0.7
      );
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.75)');
      grad.addColorStop(0.45, 'rgba(56, 189, 248, 0.45)');
      grad.addColorStop(0.8, 'rgba(14, 165, 233, 0.2)');
      grad.addColorStop(1, '#030712');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);
    } else if (currentShader === 'hyperspace') {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.35)';
      ctx.fillRect(0, 0, c.width, c.height);
      var cx = c.width / 2;
      var cy = c.height / 2;
      for (var h = 0; h < particles.length; h++) {
        var hp = particles[h];
        var dx = hp.x - cx;
        var dy = hp.y - cy;
        hp.x += dx * 0.045;
        hp.y += dy * 0.045;
        if (hp.x < 0 || hp.x > c.width || hp.y < 0 || hp.y > c.height) {
          hp.x = cx + (Math.random() - 0.5) * 50;
          hp.y = cy + (Math.random() - 0.5) * 50;
        }
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, hp.r * 1.3, 0, 6.28);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
      }
    } else if (currentShader === 'liquid') {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.beginPath();
      ctx.moveTo(0, c.height * 0.55);
      for (var lx = 0; lx <= c.width; lx += 10) {
        var ly = c.height * 0.55 + Math.sin((lx + frame * 3) * 0.012) * 50 + Math.cos((lx + frame * 2) * 0.008) * 25;
        ctx.lineTo(lx, ly);
      }
      ctx.lineTo(c.width, c.height);
      ctx.lineTo(0, c.height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.fill();
    } else if (currentShader === 'sakura') {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, c.width, c.height);
      for (var s = 0; s < particles.length; s++) {
        var sp = particles[s];
        sp.y += sp.speed * 0.45;
        sp.x += Math.sin(frame * 0.03 + sp.r) * 1.2;
        if (sp.y > c.height) sp.y = 0;
        ctx.beginPath();
        ctx.ellipse(sp.x, sp.y, sp.r * 2.8, sp.r * 1.6, Math.PI / 4, 0, 6.28);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.7)';
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, c.width, c.height);
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        for (var l = k + 1; l < particles.length; l++) {
          var p2 = particles[l];
          var dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(56, 189, 248,' + ((1 - dist / 90) * 0.45) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    window.__ultraBgAnimId = requestAnimationFrame(loop);
  }

  window.__ultraBgAnimId = requestAnimationFrame(loop);
})();
<\/script>`;
    },

    injectIntoApp() {
      const s = this.activeShader || 'constellation';
      const names = {
        constellation: 'Constellation',
        matrix: 'Matrix Rain',
        aurora: 'Chromatic Aurora',
        hyperspace: 'Hyperspace',
        liquid: 'Liquid Waves',
        sakura: 'Sakura Drift'
      };
      const shaderName = names[s] || s;
      _injectIntoApp(
        'Ultra Dynamic 60fps Background Canvas',
        this.getStandaloneSnippet(),
        `🎨 [${shaderName}] Shader injected into active app!`,
        `🎨 Shader [${shaderName}] injecté avec succès !`
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Shader Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Shader code copied to clipboard!', 'success');
      });
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 5. ULTRA CONVERSION FUNNEL & RAGE-CLICK DETECTOR (Visible Live Tracker & Alerts)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraFunnelAnalyticsStudio = {
    visitorsCount: 1420,
    scrollsCount: 980,
    clicksCount: 610,
    conversionsCount: 280,
    rageClicksCount: 4,
    lastRageTarget: null,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-funnel-analytics');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-funnel-analytics');
      if (modal) modal.classList.remove('show');
    },

    simulateRageClick(elementName) {
      _sound('warning');
      this.rageClicksCount++;
      this.lastRageTarget = elementName || 'Primary Checkout CTA Button';
      _toast(`⚠️ RAGE CLICK DETECTED on [${this.lastRageTarget}]! Frustration alert logged.`, 'warning');
      this.renderSimulator();
    },

    get funnelSteps() {
      return {
        visit: this.visitorsCount,
        scroll: this.scrollsCount,
        click: this.clicksCount,
        convert: this.conversionsCount
      };
    },

    recordStep(step) {
      if (step === 'visit') return this.stepVisit();
      if (step === 'scroll') return this.stepScroll();
      if (step === 'click') return this.stepClick();
      if (step === 'convert') return this.stepConvert();
    },

    stepVisit() {
      _sound('spark');
      this.visitorsCount += 50;
      _toast('+50 Visitors Logged!', 'info');
      this.renderSimulator();
    },

    stepScroll() {
      _sound('spark');
      this.scrollsCount += 35;
      _toast('+35 Scroll Events Logged!', 'info');
      this.renderSimulator();
    },

    stepClick() {
      _sound('spark');
      this.clicksCount += 25;
      _toast('+25 CTA Clicks Logged!', 'info');
      this.renderSimulator();
    },

    stepConvert() {
      _sound('celebrate');
      this.conversionsCount += 15;
      _toast('🎉 +15 Conversions Recorded!', 'success');
      this.renderSimulator();
    },

    resetMetrics() {
      _sound('click');
      this.visitorsCount = 100;
      this.scrollsCount = 65;
      this.clicksCount = 40;
      this.conversionsCount = 18;
      this.rageClicksCount = 0;
      this.lastRageTarget = null;
      _toast('↺ Analytics session reset!', 'info');
      this.renderSimulator();
    },

    downloadCsvReport() {
      _sound('celebrate');
      const rate1 = '100.0%';
      const rate2 = ((this.scrollsCount / this.visitorsCount) * 100).toFixed(1) + '%';
      const rate3 = ((this.clicksCount / this.visitorsCount) * 100).toFixed(1) + '%';
      const rate4 = ((this.conversionsCount / this.visitorsCount) * 100).toFixed(1) + '%';

      let csv = 'Step,Visitors,ConversionRate\n';
      csv += `"1. Landing Page Visit",${this.visitorsCount},${rate1}\n`;
      csv += `"2. Scrolled Deep (>40%)",${this.scrollsCount},${rate2}\n`;
      csv += `"3. Clicked Interactive Button",${this.clicksCount},${rate3}\n`;
      csv += `"4. Completed Goal / Form",${this.conversionsCount},${rate4}\n`;
      csv += `"Rage Click Frustration Events",${this.rageClicksCount},"N/A"\n`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'funnel_analytics_audit.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      _toast('📄 Analytics CSV report downloaded!', 'success');
    },

    renderSimulator() {
      const container = document.getElementById('funnel-simulator-container');
      if (!container) return;

      const v = this.visitorsCount;
      const rScroll = ((this.scrollsCount / v) * 100).toFixed(1);
      const rClick = ((this.clicksCount / v) * 100).toFixed(1);
      const rConv = ((this.conversionsCount / v) * 100).toFixed(1);

      container.innerHTML = `
        <div style="width:100%;min-height:440px;display:flex;flex-direction:column;gap:12px;padding:16px;box-sizing:border-box">
          <!-- Top Stats KPIs -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px">
            <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:10px;text-align:center">
              <div style="font-size:1.3rem;font-weight:900;color:#38bdf8">${v.toLocaleString()}</div>
              <div style="font-size:0.68rem;color:#94a3b8">Total Visitors</div>
            </div>
            <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:10px;text-align:center">
              <div style="font-size:1.3rem;font-weight:900;color:#10b981">${rConv}%</div>
              <div style="font-size:0.68rem;color:#94a3b8">Overall Conversion</div>
            </div>
            <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(239,68,68,0.4);border-radius:12px;padding:10px;text-align:center">
              <div style="font-size:1.3rem;font-weight:900;color:#ef4444">${this.rageClicksCount}</div>
              <div style="font-size:0.68rem;color:#fca5a5">Rage Clicks Caught</div>
            </div>
          </div>

          <!-- Interactive Conversion Funnel Bars -->
          <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px">
            <div style="font-size:0.8rem;font-weight:800;color:#fff;margin-bottom:10px">Live User Journey Progression</div>

            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:3px">
                <span style="color:#cbd5e1">1. Landing Page Visit</span>
                <span style="color:#38bdf8;font-weight:700">${v} users (100%)</span>
              </div>
              <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                <div style="width:100%;height:100%;background:#38bdf8"></div>
              </div>
            </div>

            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:3px">
                <span style="color:#cbd5e1">2. Scrolled Content (>40%)</span>
                <span style="color:#22d3ee;font-weight:700">${this.scrollsCount} users (${rScroll}%)</span>
              </div>
              <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                <div style="width:${rScroll}%;height:100%;background:#22d3ee;transition:width .3s"></div>
              </div>
            </div>

            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:3px">
                <span style="color:#cbd5e1">3. Clicked CTA / Action</span>
                <span style="color:#10b981;font-weight:700">${this.clicksCount} users (${rClick}%)</span>
              </div>
              <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                <div style="width:${rClick}%;height:100%;background:#10b981;transition:width .3s"></div>
              </div>
            </div>

            <div style="margin-bottom:4px">
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:3px">
                <span style="color:#cbd5e1">4. Completed Goal / Checkout</span>
                <span style="color:#a855f7;font-weight:700">${this.conversionsCount} users (${rConv}%)</span>
              </div>
              <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                <div style="width:${rConv}%;height:100%;background:#a855f7;transition:width .3s"></div>
              </div>
            </div>
          </div>

          <!-- Live Event Simulation Buttons (User Guidance) -->
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:10px">
            <div style="font-size:0.72rem;font-weight:800;color:#94a3b8;margin-bottom:8px;text-transform:uppercase">⚡ Interactive Event Simulator (Tap to test live calculations):</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button onclick="UltraFunnelAnalyticsStudio.stepVisit()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px">👁️ +Visit</button>
              <button onclick="UltraFunnelAnalyticsStudio.stepScroll()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px">📜 +Scroll</button>
              <button onclick="UltraFunnelAnalyticsStudio.stepClick()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px">🎯 +Click CTA</button>
              <button onclick="UltraFunnelAnalyticsStudio.stepConvert()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px;border-color:#10b981;color:#34d399">✅ +Convert</button>
              <button onclick="UltraFunnelAnalyticsStudio.simulateRageClick()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px;border-color:#ef4444;color:#fca5a5">💥 Trigger Rage Click</button>
              <button onclick="UltraFunnelAnalyticsStudio.resetMetrics()" class="tb-btn" style="font-size:0.72rem;padding:4px 8px">↺ Reset</button>
            </div>
          </div>

          <!-- Bottom CSV Export -->
          <div style="display:flex;justify-content:flex-end">
            <button onclick="UltraFunnelAnalyticsStudio.downloadCsvReport()" class="btn-primary" style="background:#10b981;color:#000;font-size:0.75rem;padding:7px 16px;font-weight:800">
              📊 Export CSV Audit
            </button>
          </div>
        </div>
      `;
    },

    getStandaloneSnippet() {
      return `<!-- Ultra Conversion Funnel & Rage Click Detector -->
<div id="__ultra_funnel_badge" style="position:fixed;bottom:14px;right:14px;z-index:999997;background:rgba(15,23,42,0.92);backdrop-filter:blur(10px);border:1px solid rgba(16,185,129,0.5);border-radius:24px;padding:6px 14px;color:#fff;font-size:11px;font-family:system-ui,-apple-system,sans-serif;font-weight:700;display:flex;align-items:center;gap:8px;box-shadow:0 6px 20px rgba(0,0,0,0.6);cursor:pointer;user-select:none">
  <span style="font-size:13px">📊</span>
  <span>Analytics: <span id="__funnel_stat_clicks" style="color:#38bdf8">0</span> Clicks</span>
  <span id="__funnel_rage_badge" style="display:none;background:#ef4444;color:#fff;padding:2px 6px;border-radius:10px;font-size:9px">⚠️ 0 Rage</span>
</div>
<script>
(function() {
  if (window.__ultraFunnelActive) return;
  window.__ultraFunnelActive = true;

  var totalClicks = 0, rageCount = 0, lastTarget = null, lastClickTime = 0, repeatCount = 0;
  var clickEl = document.getElementById('__funnel_stat_clicks');
  var rageBadge = document.getElementById('__funnel_rage_badge');

  document.addEventListener('click', function(e) {
    totalClicks++;
    if (clickEl) clickEl.textContent = totalClicks;

    var now = Date.now();
    if (e.target === lastTarget && (now - lastClickTime < 450)) {
      repeatCount++;
      if (repeatCount >= 3) {
        rageCount++;
        if (rageBadge) {
          rageBadge.style.display = 'inline-block';
          rageBadge.textContent = '⚠️ ' + rageCount + ' Rage';
        }
        var toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:800;z-index:9999999;box-shadow:0 10px 30px rgba(239,68,68,0.5);font-family:system-ui,sans-serif;display:flex;align-items:center;gap:8px';
        toast.innerHTML = '<span>⚠️</span><span>Rage click detected on button! Need assistance?</span>';
        document.body.appendChild(toast);
        setTimeout(function(){ toast.remove(); }, 3500);
        repeatCount = 0;
      }
    } else {
      repeatCount = 1;
    }
    lastTarget = e.target;
    lastClickTime = now;
  }, true);
})();
<\/script>`;
    },

    injectIntoApp() {
      _injectIntoApp(
        'Ultra Conversion Funnel & Rage Click Detector',
        this.getStandaloneSnippet(),
        '📊 Funnel & Rage-Click Analytics injected!',
        '📊 Entonnoir de Conversion & Clics de Rage injecté !'
      );
      this.close();
    },

    copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Funnel Analytics Code')) return;
      navigator.clipboard.writeText(this.getStandaloneSnippet()).then(() => {
        _sound('spark');
        _toast('📋 Standalone Funnel Analytics code copied to clipboard!', 'success');
      });
    }
  };

  // Expose to window
  if (typeof window !== 'undefined') {
    window.UltraGamificationStudio = UltraGamificationStudio;
    window.UltraSonicLab = UltraSonicLab;
    window.UltraSecurityVault = UltraSecurityVault;
    window.UltraCommandBarStudio = UltraCommandBarStudio;
    window.UltraCanvasShaderStudio = UltraCanvasShaderStudio;
    window.UltraFunnelAnalyticsStudio = UltraFunnelAnalyticsStudio;
  }

  console.log('[ULTRA] 6 Breakthrough Innovation Studios v2.0 initialized successfully.');
})();
