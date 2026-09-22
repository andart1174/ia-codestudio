(function() {
'use strict';
/* ═══════════════════════════════════════════════════
   Presentation Mode v1.0
   Fullscreen slide-by-slide presenter from HTML sections
   ═══════════════════════════════════════════════════ */
var t_pm = {
  en: { tab: 'Present', title: '🎬 Presentation Mode', sub: 'Present your app slide by slide',
        start: '▶ Start Fullscreen Presentation', extract: '🔍 Extract Slides from Code',
        export: '📦 Export as Slideshow HTML', noSlides: 'No sections found. Add <section> tags to your code.',
        slides: 'slides detected', prev: '← Prev', next: 'Next →', close: '✕ Exit',
        slide: 'Slide', of: 'of', keys: 'Use ← → arrows or buttons to navigate' },
  fr: { tab: 'Présenter', title: '🎬 Mode Présentation', sub: 'Présentez votre app diapositive par diapositive',
        start: '▶ Lancer la Présentation Plein Écran', extract: '🔍 Extraire les Diapositives',
        export: '📦 Exporter en HTML Diaporama', noSlides: 'Aucune section trouvée. Ajoutez des balises <section> à votre code.',
        slides: 'diapositives détectées', prev: '← Précéd.', next: 'Suivant →', close: '✕ Quitter',
        slide: 'Diapo', of: 'sur', keys: 'Utilisez les flèches ← → ou les boutons' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_pm[gl()][k] || k; }

var slides = [];
var currentSlide = 0;
var PRES_OPEN = false;

function extractSlides(code) {
  var results = [];
  // Extract <section> blocks
  var rx = /<section([^>]*)>([\s\S]*?)<\/section>/gi;
  var m;
  while ((m = rx.exec(code)) !== null) {
    results.push({ attrs: m[1], content: m[2].trim() });
  }
  // Fallback: extract major structural elements
  if (results.length === 0) {
    var fallbackTags = ['header', 'nav', 'main', 'footer', 'article'];
    fallbackTags.forEach(function(tag) {
      var fRx = new RegExp('<' + tag + '([^>]*)>([\\s\\S]*?)<\\/' + tag + '>', 'gi');
      var fm;
      while ((fm = fRx.exec(code)) !== null) {
        results.push({ attrs: fm[1], content: fm[2].trim() });
      }
    });
  }
  return results;
}

function buildFullHTML(slideContent) {
  // Extract <style> from the full code
  var code = window.editor ? window.editor.getValue() : '';
  var styleBlocks = [];
  var srx = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  var sm;
  while ((sm = srx.exec(code)) !== null) styleBlocks.push(sm[1]);
  var styles = styleBlocks.join('\n');

  return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<style>' + styles + '\nbody{margin:0;padding:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;font-family:sans-serif;}</style>' +
    '</head><body>' + slideContent + '</body></html>';
}

function openPresentation(slidesArr) {
  if (PRES_OPEN) return;
  PRES_OPEN = true;
  currentSlide = 0;
  slides = slidesArr;

  var overlay = document.createElement('div');
  overlay.id = 'pres-overlay';
  overlay.style = 'position:fixed;inset:0;background:#000;z-index:9999999;display:flex;flex-direction:column;';

  // Top bar
  var bar = document.createElement('div');
  bar.style = 'background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.1);';

  var leftInfo = document.createElement('div');
  leftInfo.style = 'display:flex;align-items:center;gap:15px;';
  leftInfo.innerHTML = '<span style="color:#fff;font-weight:900;font-size:14px;">🎬 ' + (gl()==='fr'?'Mode Présentation':'Presentation Mode') + '</span>';

  var counter = document.createElement('span');
  counter.id = 'pres-counter';
  counter.style = 'color:#94a3b8;font-size:12px;';

  var controls = document.createElement('div');
  controls.style = 'display:flex;align-items:center;gap:8px;';

  var prevBtn = document.createElement('button');
  prevBtn.innerHTML = t('prev');
  prevBtn.style = 'background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:11px;';
  prevBtn.onclick = function() { if(currentSlide>0){currentSlide--;updateSlide();} };

  var nextBtn = document.createElement('button');
  nextBtn.innerHTML = t('next');
  nextBtn.style = 'background:#3b82f6;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold;';
  nextBtn.onclick = function() { if(currentSlide<slides.length-1){currentSlide++;updateSlide();} };

  var closeBtn = document.createElement('button');
  closeBtn.innerHTML = t('close');
  closeBtn.style = 'background:#ef4444;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:11px;';
  closeBtn.onclick = closePresentation;

  // Progress dots
  var dots = document.createElement('div');
  dots.id = 'pres-dots';
  dots.style = 'display:flex;gap:4px;';

  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
  controls.appendChild(closeBtn);
  leftInfo.appendChild(counter);
  bar.appendChild(leftInfo);
  bar.appendChild(dots);
  bar.appendChild(controls);

  // Slide frame
  var frame = document.createElement('iframe');
  frame.id = 'pres-frame';
  frame.style = 'flex:1;border:none;background:#0f172a;';
  frame.sandbox = 'allow-scripts allow-same-origin';

  // Hint bar
  var hint = document.createElement('div');
  hint.style = 'background:rgba(0,0,0,0.6);padding:5px;text-align:center;font-size:9px;color:#475569;flex-shrink:0;';
  hint.textContent = t('keys');

  overlay.appendChild(bar);
  overlay.appendChild(frame);
  overlay.appendChild(hint);
  document.body.appendChild(overlay);

  // Keyboard
  document.addEventListener('keydown', presKeyHandler);

  updateSlide();

  function updateSlide() {
    var sl = slides[currentSlide];
    counter.textContent = t('slide') + ' ' + (currentSlide+1) + ' ' + t('of') + ' ' + slides.length;
    prevBtn.style.opacity = currentSlide === 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentSlide === slides.length-1 ? '0.4' : '1';

    // Dots
    dots.innerHTML = '';
    slides.forEach(function(_, i) {
      var d = document.createElement('div');
      d.style = 'width:6px;height:6px;border-radius:50%;background:' + (i===currentSlide?'#3b82f6':'#334155') + ';cursor:pointer;transition:0.2s;';
      d.onclick = function() { currentSlide=i; updateSlide(); };
      dots.appendChild(d);
    });

    var html = buildFullHTML('<section' + sl.attrs + ' style="width:100%;padding:60px 8%;box-sizing:border-box;">' + sl.content + '</section>');
    frame.srcdoc = html;
  }
}

function presKeyHandler(e) {
  if (!PRES_OPEN) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { if(currentSlide<slides.length-1){currentSlide++;var f=document.getElementById('pres-frame');var d=document.getElementById('pres-counter');if(d)d.textContent=t('slide')+' '+(currentSlide+1)+' '+t('of')+' '+slides.length;if(f)f.srcdoc=buildFullHTML('<section'+slides[currentSlide].attrs+' style="width:100%;padding:60px 8%;box-sizing:border-box;">'+slides[currentSlide].content+'</section>');}}
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { if(currentSlide>0){currentSlide--;var f=document.getElementById('pres-frame');var d=document.getElementById('pres-counter');if(d)d.textContent=t('slide')+' '+(currentSlide+1)+' '+t('of')+' '+slides.length;if(f)f.srcdoc=buildFullHTML('<section'+slides[currentSlide].attrs+' style="width:100%;padding:60px 8%;box-sizing:border-box;">'+slides[currentSlide].content+'</section>');}}
  if (e.key === 'Escape') closePresentation();
}

function closePresentation() {
  PRES_OPEN = false;
  document.removeEventListener('keydown', presKeyHandler);
  var ov = document.getElementById('pres-overlay');
  if (ov) ov.remove();
}

function exportSlideshow() {
  if (!window.editor) return;
  var code = window.editor.getValue();
  var extractedSlides = extractSlides(code);
  if (extractedSlides.length === 0) { if(window.showToast) window.showToast(t('noSlides')); return; }

  var styleBlocks = [];
  var srx = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  var sm;
  while ((sm = srx.exec(code)) !== null) styleBlocks.push(sm[1]);
  var styles = styleBlocks.join('\n');

  var slideHTML = extractedSlides.map(function(s, i) {
    return '<div class="slide" id="slide-' + i + '" style="display:' + (i===0?'flex':'none') + ';align-items:center;justify-content:center;min-height:100vh;padding:60px 8%;box-sizing:border-box;">' + s.content + '</div>';
  }).join('\n');

  var dotHTML = extractedSlides.map(function(_, i) {
    return '<div class="dot" onclick="goTo(' + i + ')" style="width:8px;height:8px;border-radius:50%;background:' + (i===0?'#3b82f6':'#334155') + ';cursor:pointer;" id="dot-' + i + '"></div>';
  }).join('');

  var full = '<!DOCTYPE html>\n<html lang="' + gl() + '">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Presentation</title>\n<style>\n' + styles + '\n* { box-sizing: border-box; }\nbody { margin:0; background:#0f172a; font-family:sans-serif; }\n.nav { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.7); backdrop-filter:blur(10px); padding:10px 20px; border-radius:50px; display:flex; align-items:center; gap:10px; z-index:9999; }\n.nav button { background:#3b82f6; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-size:12px; }\n.nav button:disabled { opacity:0.4; }\n.dots { display:flex; gap:5px; }\n.slide { flex-direction:column; }\n</style></head>\n<body>\n' + slideHTML + '\n<div class="nav"><button id="btn-prev" onclick="prev()">←</button><div class="dots">' + dotHTML + '</div><button id="btn-next" onclick="next()">→</button><span id="counter" style="color:#94a3b8;font-size:11px;"></span></div>\n<script>\nvar cur=0,total=' + extractedSlides.length + ';\nfunction goTo(n){document.querySelectorAll(\'.slide\').forEach(function(s,i){s.style.display=i===n?\'flex\':\'none\';});document.querySelectorAll(\'.dot\').forEach(function(d,i){d.style.background=i===n?\'#3b82f6\':\'#334155\';});cur=n;document.getElementById(\'counter\').textContent=(n+1)+\'/\'+total;document.getElementById(\'btn-prev\').disabled=n===0;document.getElementById(\'btn-next\').disabled=n===total-1;}\nfunction prev(){if(cur>0)goTo(cur-1);}function next(){if(cur<total-1)goTo(cur+1);}\ndocument.addEventListener(\'keydown\',function(e){if(e.key===\'ArrowRight\'||e.key===\'ArrowDown\')next();if(e.key===\'ArrowLeft\'||e.key===\'ArrowUp\')prev();});\ngoTo(0);\n<\/script>\n</body></html>';

  var a = document.createElement('a');
  a.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(full);
  a.download = 'presentation.html';
  a.click();
  if (window.showToast) window.showToast(gl()==='fr'?'Diaporama exporté !':'Slideshow exported!');
}

function renderPresentTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(59,130,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#60a5fa;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  // Extract btn
  var extBtn = document.createElement('button');
  extBtn.innerHTML = t('extract');
  extBtn.style = 'width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:10px;border-radius:8px;font-size:11px;cursor:pointer;';
  extBtn.onclick = function() {
    if (!window.editor) return;
    var code = window.editor.getValue();
    slides = extractSlides(code);
    if (slides.length === 0) { if(window.showToast) window.showToast(t('noSlides')); return; }
    if (window.showToast) window.showToast(slides.length + ' ' + t('slides'));
    renderPresentTab();
  };
  body.appendChild(extBtn);

  // Slides count
  if (slides.length > 0) {
    var countEl = document.createElement('div');
    countEl.style = 'font-size:11px;color:#10b981;font-weight:bold;';
    countEl.textContent = '✅ ' + slides.length + ' ' + t('slides');
    body.appendChild(countEl);

    // Slide thumbnails
    slides.forEach(function(sl, i) {
      var thumb = document.createElement('div');
      thumb.style = 'background:#1e293b;border:1px solid #334155;border-radius:6px;padding:8px;cursor:pointer;border-left:3px solid #3b82f6;';
      var tTitle = document.createElement('div');
      tTitle.style = 'font-size:9px;font-weight:bold;color:#60a5fa;margin-bottom:4px;';
      tTitle.textContent = t('slide') + ' ' + (i+1);
      var tPrev = document.createElement('div');
      tPrev.style = 'font-size:9px;color:#64748b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
      tPrev.textContent = sl.content.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().substring(0, 80);
      thumb.appendChild(tTitle); thumb.appendChild(tPrev);
      thumb.onclick = function() { openPresentation(slides); };
      body.appendChild(thumb);
    });
  }

  // Action buttons
  var startBtn = document.createElement('button');
  startBtn.innerHTML = t('start');
  startBtn.style = 'width:100%;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#fff;border:none;padding:12px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-top:4px;';
  startBtn.onclick = function() {
    if (!window.editor) return;
    var code = window.editor.getValue();
    slides = extractSlides(code);
    if (slides.length === 0) { if(window.showToast) window.showToast(t('noSlides')); return; }
    openPresentation(slides);
  };
  body.appendChild(startBtn);

  var expBtn = document.createElement('button');
  expBtn.innerHTML = t('export');
  expBtn.style = 'width:100%;background:none;border:1px solid #3b82f6;color:#60a5fa;padding:9px;border-radius:8px;font-size:11px;cursor:pointer;';
  expBtn.onclick = exportSlideshow;
  body.appendChild(expBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el=document.getElementById('lbl-tab-present'); if(el) el.textContent=t('tab'); if(window.activeTab==='present') renderPresentTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='present'){window.activeTab='present';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-present');if(el)el.classList.add('active');renderPresentTab();return;}
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
