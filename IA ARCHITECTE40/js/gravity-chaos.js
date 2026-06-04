/**
 * Gravity Chaos Engine v1.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Gravity', title: '🍎 Gravity Chaos Engine', sub: 'DOM Physics Simulator',
    desc: 'Breaks the laws of HTML. All elements will fall to the bottom of the screen. You can grab and throw them with your mouse!',
    inject: '⚡ Auto-Apply Gravity',
    injected: '✅ Gravity applied! Watch your elements fall!'
  },
  fr: {
    tab: 'Gravité', title: '🍎 Moteur Chaos Gravité', sub: 'Simulateur Physique DOM',
    desc: 'Brise les lois du HTML. Tous les éléments tomberont en bas de l\'écran. Vous pouvez les attraper et les lancer !',
    inject: '⚡ Auto-Appliquer Gravité',
    injected: '✅ Gravité appliquée ! Regardez vos éléments tomber !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var GRAVITY_SCRIPT = `
<!-- 🍎 Gravity Chaos Engine -->
<script id="ia-gravity-js">
document.addEventListener('DOMContentLoaded', () => {
  const bodies = [];
  let isDragging = false;
  let draggedBody = null;
  const gravity = 0.5;
  const bounce = -0.7;
  const friction = 0.99;

  const elementsToMove = [];
  document.querySelectorAll('h1, h2, h3, p, button, .btn, img, .card, article').forEach(el => {
    if(el.children.length > 3 || el.tagName === 'BODY' || el.tagName === 'HTML' || el.tagName === 'MAIN') return;
    const rect = el.getBoundingClientRect();
    if(rect.width === 0 || rect.height === 0) return;
    elementsToMove.push({ el: el, rect: rect });
  });

  elementsToMove.forEach(item => {
    const el = item.el;
    const rect = item.rect;

    // Move to body so they break out of any hidden containers
    document.body.appendChild(el);

    // Use fixed positioning so they fall relative to the screen
    el.style.position = 'fixed';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.margin = '0';
    el.style.zIndex = '9999';
    el.style.userSelect = 'none';
    el.style.cursor = 'grab';

    bodies.push({
      el: el,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      isDragging: false
    });

    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const body = bodies.find(b => b.el === el);
      if(body) {
        body.isDragging = true;
        draggedBody = body;
        el.style.cursor = 'grabbing';
      }
    });
  });

  window.addEventListener('mouseup', () => {
    if(draggedBody) {
      draggedBody.isDragging = false;
      draggedBody.el.style.cursor = 'grab';
      draggedBody = null;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if(draggedBody) {
      draggedBody.vx = e.movementX;
      draggedBody.vy = e.movementY;
      draggedBody.x = e.clientX - draggedBody.width / 2;
      draggedBody.y = e.clientY - draggedBody.height / 2;
    }
  });

  function update() {
    const maxY = window.innerHeight;
    const maxX = window.innerWidth;

    bodies.forEach(b => {
      if(b.isDragging) {
        b.el.style.left = b.x + 'px';
        b.el.style.top = b.y + 'px';
        return;
      }

      b.vy += gravity;
      b.vx *= friction;
      
      b.x += b.vx;
      b.y += b.vy;

      // Floor collision
      if(b.y + b.height > maxY) {
        b.y = maxY - b.height;
        b.vy *= bounce;
        b.vx *= 0.9; // floor friction
      }

      // Wall collisions
      if(b.x < 0) {
        b.x = 0;
        b.vx *= bounce;
      }
      if(b.x + b.width > maxX) {
        b.x = maxX - b.width;
        b.vx *= bounce;
      }

      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
      
      // Add slight rotation based on velocity
      const rotation = b.vx * 2;
      b.el.style.transform = \`rotate(\${rotation}deg)\`;
    });

    requestAnimationFrame(update);
  }

  // Start engine
  requestAnimationFrame(update);
  document.body.style.overflow = 'hidden';
});
</script>
`;

function injectGravity() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(!code.includes('ia-gravity-js')) {
    code = code.includes('</body>') ? code.replace('</body>', GRAVITY_SCRIPT + '\\n</body>') : code + '\\n' + GRAVITY_SCRIPT;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  } else {
    if(window.showToast) window.showToast('Already injected.');
  }
}

function renderGravityTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(245,158,11,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fbbf24;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var sec = document.createElement('div');
  sec.style = 'background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:8px;padding:12px;text-align:center;';
  
  var icon = document.createElement('div');
  icon.innerHTML = '🍎';
  icon.style = 'font-size:40px;margin-bottom:10px;animation: pulse 2s infinite;';
  sec.appendChild(icon);

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;margin-bottom:15px;line-height:1.5;';
  desc.textContent = t('desc');
  sec.appendChild(desc);

  var btn = document.createElement('button');
  btn.textContent = t('inject');
  btn.style = 'width:100%;background:linear-gradient(135deg,#f59e0b,#ef4444);border:none;border-radius:6px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  btn.onclick = injectGravity;
  sec.appendChild(btn);

  body.appendChild(sec);
  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-gravity');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='gravity') renderGravityTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='gravity') {
      window.activeTab = 'gravity';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-gravity');
      if(btn) btn.classList.add('active');
      renderGravityTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
