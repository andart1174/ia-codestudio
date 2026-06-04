/**
 * Bionic Reader Auto-Fixer v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Bionic Read', title: '🧠 Bionic Reader Auto-Fixer', sub: 'Neuro-Accessibility',
    desc: 'Instantly applies Bionic Reading to all text. It bolds the first half of every word to help users with ADHD/Dyslexia read 3x faster.',
    inject: '⚡ Auto-Apply Bionic Reading',
    injected: '✅ Bionic Reading applied to all text!'
  },
  fr: {
    tab: 'Lecture Bionique', title: '🧠 Correcteur Lecture Bionique', sub: 'Neuro-Accessibilité',
    desc: 'Applique instantanément la Lecture Bionique. Met en gras la moitié de chaque mot pour aider la lecture rapide (TDAH/Dyslexie).',
    inject: '⚡ Auto-Appliquer Lecture Bionique',
    injected: '✅ Lecture Bionique appliquée à tout le texte !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var BIONIC_SCRIPT = `
<!-- 🧠 Bionic Reading Engine -->
<style id="ia-bionic-css">
.ia-bionic-text b {
  font-weight: 800 !important;
  color: inherit;
}
</style>
<script id="ia-bionic-js">
document.addEventListener('DOMContentLoaded', () => {
  function applyBionic(node) {
    if (node.nodeType === 3) { // Text node
      const text = node.nodeValue;
      if (!text.trim()) return;
      
      const words = text.split(/(\\s+)/);
      const span = document.createElement('span');
      span.className = 'ia-bionic-text';
      
      words.forEach(word => {
        if (word.trim().length > 0) {
          const mid = Math.ceil(word.length / 2);
          const first = word.slice(0, mid);
          const second = word.slice(mid);
          
          const b = document.createElement('b');
          b.textContent = first;
          span.appendChild(b);
          span.appendChild(document.createTextNode(second));
        } else {
          span.appendChild(document.createTextNode(word));
        }
      });
      
      node.parentNode.replaceChild(span, node);
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.className !== 'ia-bionic-text') {
      // Recursively process children
      Array.from(node.childNodes).forEach(applyBionic);
    }
  }

  // Apply to major text containers
  document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a, label, blockquote').forEach(el => {
    Array.from(el.childNodes).forEach(child => {
      if(child.nodeType === 3) {
        applyBionic(child);
      }
    });
  });
});
</script>
`;

function injectBionic() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-bionic-js')) {
    code = code.includes('</body>') ? code.replace('</body>', BIONIC_SCRIPT + '\\n</body>') : code + '\\n' + BIONIC_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderBionicTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(74,222,128,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#4ade80;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🧠';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var sample = document.createElement('div');
  sample.style = 'background:rgba(0,0,0,0.3);border-radius:4px;padding:8px;font-size:12px;color:#fff;margin-bottom:15px;text-align:left;line-height:1.4;';
  sample.innerHTML = '<b>Bio</b>nic <b>read</b>ing <b>ai</b>ds <b>fa</b>st <b>compreh</b>ension.';
  sec.appendChild(sample);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#22c55e,#14b8a6);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectBionic;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-bionic');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='bionic') renderBionicTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='bionic') {
      window.activeTab = 'bionic';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-bionic');
      if(btn) btn.classList.add('active');
      renderBionicTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
