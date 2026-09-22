/**
 * Audio UI Synthesizer v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Audio UI', title: '🎵 Audio UI Synthesizer', sub: 'Premium Sensory Feedback',
    desc: 'Instantly adds ASMR-style micro-sounds to your UI. Generates soft clicks and blips using pure math (no MP3s required).',
    inject: '⚡ Auto-Apply Audio UI',
    injected: '✅ Audio UI applied! Hover and click buttons to hear them.'
  },
  fr: {
    tab: 'Audio UI', title: '🎵 Synthétiseur Audio UI', sub: 'Feedback Sensoriel Premium',
    desc: 'Ajoute instantanément des micro-sons style ASMR à votre UI. Génère des clics doux par calcul mathématique (sans MP3).',
    inject: '⚡ Auto-Appliquer Audio UI',
    injected: '✅ Audio UI appliqué ! Survolez et cliquez pour entendre.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var AUDIO_SCRIPT = `
<!-- 🎵 Audio UI Engine -->
<script id="ia-audio-ui-js">
document.addEventListener('DOMContentLoaded', () => {
  let audioCtx = null;
  
  function initAudio() {
    if(!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, vol) {
    if(!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  // Hover sound: soft high pitch
  function playHover() {
    playTone(800, 'sine', 0.1, 0.05);
  }

  // Click sound: deeper pop
  function playClick() {
    playTone(300, 'triangle', 0.15, 0.1);
  }

  // Initialize AudioContext on first user interaction with the body (browser policy)
  document.body.addEventListener('click', initAudio, { once: true });
  document.body.addEventListener('mousemove', initAudio, { once: true });

  const interactives = document.querySelectorAll('button, .btn, a');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => { if(audioCtx) playHover(); });
    el.addEventListener('mousedown', () => { if(audioCtx) playClick(); });
  });
});
</script>
`;

function injectAudio() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-audio-ui-js')) {
    code = code.includes('</body>') ? code.replace('</body>', AUDIO_SCRIPT + '\\n</body>') : code + '\\n' + AUDIO_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderAudioTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🎵';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#a855f7,#6366f1);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectAudio;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-audioui');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='audioui') renderAudioTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='audioui') {
      window.activeTab = 'audioui';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-audioui');
      if(btn) btn.classList.add('active');
      renderAudioTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
