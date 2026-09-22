/**
 * CSS Shortcuts Injector v1.0 — EN/FR
 * Injects 40 utility classes ready to use in HTML.
 */
(function () {
'use strict';
var TX = {
  en: { tab: 'CSS Shortcuts', title: '🎯 CSS Shortcuts', sub: '40 utility classes, one click',
    desc: 'Inject 40 ready-to-use utility classes into your app. Use them directly in your HTML like class="flex center shadow-lg".',
    inject: '➕ Inject Utility Classes',
    remove: '✖ Remove',
    injected: '✅ 40 utility classes injected!',
    removed: '✖ Utility classes removed.',
    classes: 'Available classes:'
  },
  fr: { tab: 'Raccourcis CSS', title: '🎯 Raccourcis CSS', sub: '40 classes utilitaires en un clic',
    desc: 'Injectez 40 classes CSS utilitaires dans votre app. Utilisez-les directement dans votre HTML.',
    inject: '➕ Injecter les Classes',
    remove: '✖ Supprimer',
    injected: '✅ 40 classes utilitaires injectees !',
    removed: '✖ Classes supprimees.',
    classes: 'Classes disponibles:'
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var UTILITY_CSS = '<style id="ia-utils">\n'
  /* Layout */
  + '.flex{display:flex!important}'
  + '.flex-col{display:flex!important;flex-direction:column!important}'
  + '.grid{display:grid!important}'
  + '.grid-2{display:grid!important;grid-template-columns:1fr 1fr!important;gap:16px!important}'
  + '.grid-3{display:grid!important;grid-template-columns:1fr 1fr 1fr!important;gap:16px!important}'
  + '.center{display:flex!important;align-items:center!important;justify-content:center!important}'
  + '.between{display:flex!important;align-items:center!important;justify-content:space-between!important}'
  + '.wrap{flex-wrap:wrap!important}'
  + '.gap-sm{gap:8px!important}'
  + '.gap{gap:16px!important}'
  + '.gap-lg{gap:32px!important}'
  /* Spacing */
  + '.p-0{padding:0!important}'
  + '.p-sm{padding:8px!important}'
  + '.p{padding:16px!important}'
  + '.p-lg{padding:32px!important}'
  + '.px{padding-left:16px!important;padding-right:16px!important}'
  + '.py{padding-top:16px!important;padding-bottom:16px!important}'
  + '.m-auto{margin:auto!important}'
  + '.mt{margin-top:16px!important}'
  + '.mb{margin-bottom:16px!important}'
  /* Typography */
  + '.text-xs{font-size:12px!important}'
  + '.text-sm{font-size:14px!important}'
  + '.text-lg{font-size:20px!important}'
  + '.text-xl{font-size:28px!important}'
  + '.bold{font-weight:700!important}'
  + '.black{font-weight:900!important}'
  + '.uppercase{text-transform:uppercase!important}'
  + '.text-center{text-align:center!important}'
  + '.truncate{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'
  /* Visual */
  + '.rounded{border-radius:8px!important}'
  + '.rounded-xl{border-radius:16px!important}'
  + '.rounded-full{border-radius:9999px!important}'
  + '.shadow{box-shadow:0 4px 12px rgba(0,0,0,0.15)!important}'
  + '.shadow-lg{box-shadow:0 10px 40px rgba(0,0,0,0.3)!important}'
  + '.border{border:1px solid rgba(255,255,255,0.1)!important}'
  + '.glass{background:rgba(255,255,255,0.05)!important;backdrop-filter:blur(10px)!important;border:1px solid rgba(255,255,255,0.1)!important}'
  + '.text-gradient{background:linear-gradient(135deg,#3b82f6,#8b5cf6)!important;-webkit-background-clip:text!important;-webkit-text-fill-color:transparent!important}'
  /* Animation */
  + '.fade-in{animation:ia-fadeIn .6s ease forwards!important}'
  + '.slide-up{animation:ia-slideUp .5s ease forwards!important}'
  + '.pulse{animation:ia-pulse 2s ease-in-out infinite!important}'
  + '\n@keyframes ia-fadeIn{from{opacity:0}to{opacity:1}}'
  + '\n@keyframes ia-slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'
  + '\n@keyframes ia-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}'
  + '\n/* Utility: hover effects */'
  + '\n.hover-scale{transition:transform .2s!important}.hover-scale:hover{transform:scale(1.04)!important}'
  + '\n</style>';

var CLASSES = [
  {cat:'Layout',   items:['flex','flex-col','grid','grid-2','grid-3','center','between','wrap','gap-sm','gap','gap-lg']},
  {cat:'Spacing',  items:['p-0','p-sm','p','p-lg','px','py','m-auto','mt','mb']},
  {cat:'Text',     items:['text-xs','text-sm','text-lg','text-xl','bold','black','uppercase','text-center','truncate']},
  {cat:'Visual',   items:['rounded','rounded-xl','rounded-full','shadow','shadow-lg','border','glass','text-gradient']},
  {cat:'Animation',items:['fade-in','slide-up','pulse','hover-scale']}
];

function injectUtils(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-utils">[\s\S]*?<\/style>/g, '');
  if (code.indexOf('</head>') !== -1) {
    code = code.replace('</head>', UTILITY_CSS + '\n</head>');
  } else { code = UTILITY_CSS + '\n' + code; }
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('injected');
}

function removeUtils(statusEl) {
  if (!window.editor) return;
  var code = window.editor.getValue();
  code = code.replace(/<style id="ia-utils">[\s\S]*?<\/style>/g, '');
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  if (statusEl) statusEl.textContent = t('removed');
}

function renderCSSTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(34,197,94,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#4ade80;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;';
  body.appendChild(statusEl);

  var injectBtn = document.createElement('button');
  injectBtn.textContent = t('inject');
  injectBtn.style.cssText = 'width:100%;background:linear-gradient(135deg,#16a34a,#0284c7);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  injectBtn.onclick = function () { injectUtils(statusEl); };
  body.appendChild(injectBtn);

  /* Class reference */
  var refLbl = document.createElement('div');
  refLbl.style.cssText = 'font-size:10px;font-weight:700;color:#4ade80;margin-top:4px;';
  refLbl.textContent = t('classes');
  body.appendChild(refLbl);

  CLASSES.forEach(function (cat) {
    var sec = document.createElement('div');
    sec.style.cssText = 'background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:8px 10px;';
    var catLbl = document.createElement('div');
    catLbl.style.cssText = 'font-size:9px;font-weight:900;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;';
    catLbl.textContent = cat.cat;
    sec.appendChild(catLbl);
    var tags = document.createElement('div');
    tags.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    cat.items.forEach(function (cls) {
      var tag = document.createElement('span');
      tag.style.cssText = 'background:#1e293b;color:#4ade80;font-family:monospace;font-size:9px;padding:2px 6px;border-radius:4px;cursor:pointer;border:1px solid #334155;';
      tag.textContent = '.' + cls;
      tag.title = 'Click to copy';
      tag.onclick = function () {
        var ta = document.createElement('textarea');
        ta.value = cls;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        tag.style.borderColor = '#4ade80';
        setTimeout(function () { tag.style.borderColor = '#334155'; }, 800);
      };
      tags.appendChild(tag);
    });
    sec.appendChild(tags);
    body.appendChild(sec);
  });

  var remBtn = document.createElement('button');
  remBtn.textContent = t('remove');
  remBtn.style.cssText = 'width:100%;background:rgba(100,116,139,0.15);border:1px solid rgba(100,116,139,0.3);border-radius:8px;padding:9px;color:#94a3b8;font-weight:700;font-size:10px;cursor:pointer;';
  remBtn.onclick = function () { removeUtils(statusEl); };
  body.appendChild(remBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-cssshortcuts');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'cssshortcuts') renderCSSTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'cssshortcuts') {
      window.activeTab = 'cssshortcuts';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-cssshortcuts');
      if (btn) btn.classList.add('active');
      renderCSSTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
