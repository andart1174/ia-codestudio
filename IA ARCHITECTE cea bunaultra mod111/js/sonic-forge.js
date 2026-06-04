// ==========================================
// 🎵 Sonic Forge - Web Audio Synthesizer
// IA Architecte - Premium Studio
// ==========================================
(function() {
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab !== 'sonic') { if (origRenderTab) origRenderTab(tab); return; }
    window.activeTab = 'sonic';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('tab-sonic');
    if (btn) btn.classList.add('active');

    const lang = window.appLang || 'en';
    const isFr = lang === 'fr';

    const presets = [
      { id:'click',   name:'Tech Click',    icon:'🖱️', type:'square',  freq:800, dur:0.05, vol:0.3 },
      { id:'success', name:'Success Chime', icon:'✅', type:'sine',    freq:523, dur:0.4,  vol:0.4 },
      { id:'error',   name:'Error Buzz',    icon:'❌', type:'sawtooth',freq:150, dur:0.3,  vol:0.3 },
      { id:'notify',  name:'Notification',  icon:'🔔', type:'sine',   freq:880, dur:0.2,  vol:0.35 },
      { id:'pop',     name:'Pop',           icon:'💬', type:'sine',   freq:1200,dur:0.08, vol:0.2 },
      { id:'coin',    name:'Coin',          icon:'🪙', type:'square', freq:988, dur:0.15, vol:0.3 },
    ];

    const presetBtns = presets.map(p =>
      `<button onclick="sonicPlay('${p.id}')" id="sbtn-${p.id}" style="padding:8px 6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">${p.icon} ${p.name}</button>`
    ).join('');

    document.getElementById('left-body').innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;background:linear-gradient(135deg,#1a0a0a,#0d0d1a);color:#fff;overflow:hidden;">
        <div style="padding:16px 16px 10px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;">
          <div style="font-size:15px;font-weight:900;color:#f87171;">🎵 Sonic Forge</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${isFr ? 'Synthétiseur Audio – Zéro MP3' : 'Web Audio Synthesizer – Zero MP3'}</div>
        </div>
        <div style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;">
          <canvas id="sonic-canvas" width="220" height="55" style="width:100%;border-radius:8px;background:rgba(0,0,0,0.5);border:1px solid rgba(239,68,68,0.2);"></canvas>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">${presetBtns}</div>
          <div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:12px;border:1px solid rgba(239,68,68,0.2);">
            <div style="font-size:10px;color:#f87171;font-weight:bold;margin-bottom:8px;">${isFr ? 'Personnaliser' : 'Customize'}</div>
            <div style="margin-bottom:6px;">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>Frequency (Hz)</span><span id="lbl-sonic-freq">440</span></div>
              <input type="range" id="sonic-freq" min="50" max="2000" value="440" style="width:100%;accent-color:#ef4444;" oninput="document.getElementById('lbl-sonic-freq').innerText=this.value;sonicUpdateCode()">
            </div>
            <div style="margin-bottom:6px;">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>Volume</span><span id="lbl-sonic-vol">0.3</span></div>
              <input type="range" id="sonic-vol" min="0" max="1" step="0.01" value="0.3" style="width:100%;accent-color:#ef4444;" oninput="document.getElementById('lbl-sonic-vol').innerText=parseFloat(this.value).toFixed(2);sonicUpdateCode()">
            </div>
            <div style="margin-bottom:6px;">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px;"><span>Duration (s)</span><span id="lbl-sonic-dur">0.3</span></div>
              <input type="range" id="sonic-dur" min="0.05" max="2" step="0.05" value="0.3" style="width:100%;accent-color:#ef4444;" oninput="document.getElementById('lbl-sonic-dur').innerText=parseFloat(this.value).toFixed(2);sonicUpdateCode()">
            </div>
            <select id="sonic-wave" onchange="sonicUpdateCode()" style="width:100%;background:#0f172a;color:#fff;border:1px solid rgba(239,68,68,0.3);padding:6px;border-radius:6px;font-size:11px;margin-bottom:8px;">
              <option value="sine">Sine 〜</option>
              <option value="square">Square ⎍</option>
              <option value="sawtooth">Sawtooth /</option>
              <option value="triangle">Triangle △</option>
            </select>
            <button onclick="sonicPreview()" style="width:100%;padding:8px;background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold;">▶ ${isFr ? 'Écouter' : 'Play Sound'}</button>
          </div>
          <div>
            <div style="font-size:10px;color:#ef4444;font-weight:bold;margin-bottom:4px;">Generated JS</div>
            <textarea id="sonic-code" readonly style="width:100%;height:120px;background:rgba(0,0,0,0.5);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-family:monospace;font-size:9px;padding:8px;border-radius:6px;resize:none;box-sizing:border-box;"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <button onclick="sonicCopy()" style="padding:10px;background:rgba(239,68,68,0.1);border:1px solid #ef4444;color:#fca5a5;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">📋 ${isFr ? 'Copier' : 'Copy JS'}</button>
            <button onclick="sonicInject()" style="padding:10px;background:linear-gradient(90deg,#dc2626,#ef4444);border:none;color:#fff;border-radius:8px;cursor:pointer;font-size:11px;font-weight:bold;">⬇️ ${isFr ? 'Injecter' : 'Inject'}</button>
          </div>
        </div>
      </div>`;

    function drawWave(type) {
      const canvas = document.getElementById('sonic-canvas');
      if (!canvas) return;
      const ctx2 = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      ctx2.clearRect(0, 0, W, H);
      ctx2.strokeStyle = '#ef4444'; ctx2.lineWidth = 2;
      ctx2.shadowBlur = 8; ctx2.shadowColor = '#ef4444';
      ctx2.beginPath();
      for (let x = 0; x < W; x++) {
        const t = (x / W) * Math.PI * 6;
        let y = type === 'sine' ? Math.sin(t) : type === 'square' ? Math.sign(Math.sin(t)) :
                type === 'sawtooth' ? ((t % (Math.PI*2)) / Math.PI) - 1 : Math.abs(((t % (Math.PI*2)) / Math.PI) - 1) * 2 - 1;
        const py = H/2 - y * (H/2 - 6);
        x === 0 ? ctx2.moveTo(x, py) : ctx2.lineTo(x, py);
      }
      ctx2.stroke();
    }

    function playTone(freq, type, dur, vol) {
      if (!window._sonicCtx || window._sonicCtx.state === 'closed') window._sonicCtx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = window._sonicCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
      drawWave(type);
    }

    function getVals() {
      return {
        freq: parseFloat(document.getElementById('sonic-freq').value),
        vol:  parseFloat(document.getElementById('sonic-vol').value),
        dur:  parseFloat(document.getElementById('sonic-dur').value),
        type: document.getElementById('sonic-wave').value
      };
    }

    window.sonicUpdateCode = function() {
      const v = getVals();
      document.getElementById('sonic-code').value =
`// Sonic Forge - Web Audio\nfunction playSoundEffect() {\n  const ctx = new (window.AudioContext || window.webkitAudioContext)();\n  const osc = ctx.createOscillator();\n  const gain = ctx.createGain();\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  osc.type = '${v.type}';\n  osc.frequency.value = ${v.freq};\n  gain.gain.setValueAtTime(${v.vol}, ctx.currentTime);\n  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ${v.dur});\n  osc.start(ctx.currentTime);\n  osc.stop(ctx.currentTime + ${v.dur});\n}`;
    };

    window.sonicPreview = function() { const v = getVals(); playTone(v.freq, v.type, v.dur, v.vol); };

    window.sonicPlay = function(id) {
      const p = presets.find(x => x.id === id); if (!p) return;
      const b = document.getElementById('sbtn-' + id);
      if (b) { b.style.background = 'rgba(239,68,68,0.4)'; setTimeout(() => b.style.background = 'rgba(239,68,68,0.1)', 300); }
      playTone(p.freq, p.type, p.dur, p.vol);
      document.getElementById('sonic-freq').value = p.freq; document.getElementById('lbl-sonic-freq').innerText = p.freq;
      document.getElementById('sonic-vol').value = p.vol;   document.getElementById('lbl-sonic-vol').innerText = p.vol;
      document.getElementById('sonic-dur').value = p.dur;   document.getElementById('lbl-sonic-dur').innerText = p.dur;
      document.getElementById('sonic-wave').value = p.type;
      sonicUpdateCode();
    };

    window.sonicCopy = function() { navigator.clipboard.writeText(document.getElementById('sonic-code').value); if (window.showToast) window.showToast('JS Copied!'); };

    window.sonicInject = function() {
      const code = document.getElementById('sonic-code').value; if (!code || !window.editor) return;
      const cur = window.editor.getValue();
      const snippet = `\n<script>\n${code}\n<\/script>\n`;
      window.editor.setValue(cur.includes('</body>') ? cur.replace('</body>', snippet + '</body>') : cur + snippet);
      if (window.showToast) window.showToast('Injected!');
    };

    setTimeout(() => { drawWave('sine'); sonicUpdateCode(); }, 50);
  };
})();
