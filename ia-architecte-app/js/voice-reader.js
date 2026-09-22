/**
 * Accessibility Voice Reader v1.0
 * Reads the live preview aloud using Web Speech API.
 * EN / FR only.
 */
(function () {
  'use strict';

  var TX = {
    en: {
      tab:     'Voice Reader',
      title:   '🗣️ Accessibility Voice Reader',
      sub:     'Hear your app as a screen-reader would',
      desc:    'Simulates how a visually-impaired user hears your page. Click "Read Page" to have every visible text element spoken aloud in order.',
      read:    '▶ Read Page',
      stop:    '⏹ Stop',
      speed:   'Speed',
      noText:  'No readable text found in the preview.',
      reading: '🔊 Reading…',
      done:    '✅ Done reading!'
    },
    fr: {
      tab:     'Lecture Vocale',
      title:   '🗣️ Lecteur Vocal Accessibilite',
      sub:     'Entendez votre app comme un lecteur d ecran',
      desc:    'Simule comment un utilisateur malvoyant entend votre page. Cliquez sur "Lire la page" pour ecouter chaque texte visible dans l ordre.',
      read:    '▶ Lire la page',
      stop:    '⏹ Arreter',
      speed:   'Vitesse',
      noText:  'Aucun texte lisible trouve dans la previsualisation.',
      reading: '🔊 Lecture en cours…',
      done:    '✅ Lecture terminee !'
    }
  };

  function gl() { return window.lang || 'en'; }
  function t(k) { return (TX[gl()] || TX.en)[k] || k; }

  var synth = window.speechSynthesis;
  var currentUtterances = [];
  var isReading = false;

  function stopReading() {
    if (synth) synth.cancel();
    currentUtterances = [];
    isReading = false;
  }

  function extractTexts() {
    var iframe = document.getElementById('preview-iframe') || document.querySelector('#right-panel iframe');
    if (!iframe) return [];
    var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
    if (!doc || !doc.body) return [];

    var walker = doc.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.tagName.toUpperCase();
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
          var style = doc.defaultView.getComputedStyle(p);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return NodeFilter.FILTER_REJECT;
          var text = node.textContent.trim();
          if (!text) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var texts = [];
    var node;
    while ((node = walker.nextNode())) {
      var text = node.textContent.trim();
      if (text.length > 1) texts.push(text);
    }
    return texts;
  }

  function highlightElement(text, iframeDoc) {
    if (!iframeDoc) return;
    var walker = iframeDoc.createTreeWalker(iframeDoc.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim() === text) {
        var el = node.parentElement;
        if (el) {
          el.style.outline = '2px solid #f59e0b';
          el.style.backgroundColor = 'rgba(245,158,11,0.15)';
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () {
            el.style.outline = '';
            el.style.backgroundColor = '';
          }, 2000);
        }
        break;
      }
    }
  }

  function readPage(speed, statusEl) {
    if (!synth) {
      if (statusEl) statusEl.textContent = 'Speech synthesis not supported in this browser.';
      return;
    }

    stopReading();
    var texts = extractTexts();
    if (!texts.length) {
      if (statusEl) statusEl.textContent = t('noText');
      return;
    }

    isReading = true;
    if (statusEl) statusEl.textContent = t('reading');

    var iframe = document.getElementById('preview-iframe') || document.querySelector('#right-panel iframe');
    var iframeDoc = iframe ? (iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document)) : null;

    var index = 0;

    function speakNext() {
      if (index >= texts.length || !isReading) {
        isReading = false;
        if (statusEl) statusEl.textContent = t('done');
        return;
      }
      var utterance = new SpeechSynthesisUtterance(texts[index]);
      utterance.rate = parseFloat(speed) || 1;
      utterance.lang = gl() === 'fr' ? 'fr-FR' : 'en-US';

      highlightElement(texts[index], iframeDoc);

      utterance.onend = function () {
        index++;
        speakNext();
      };
      utterance.onerror = function () {
        index++;
        speakNext();
      };

      currentUtterances.push(utterance);
      synth.speak(utterance);
    }

    speakNext();
  }

  /* ── Render Tab ── */
  function renderVoiceTab() {
    var parent = document.getElementById('left-body');
    if (!parent) return;
    parent.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

    /* Header */
    var hdr = document.createElement('div');
    hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(34,197,94,0.25);flex-shrink:0;';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#4ade80;">' + t('title') + '</div>'
                  + '<div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
    wrap.appendChild(hdr);

    /* Body */
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:14px;';

    /* Description */
    var desc = document.createElement('div');
    desc.style.cssText = 'font-size:11px;color:#94a3b8;line-height:1.6;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15);border-radius:8px;padding:10px;';
    desc.textContent = t('desc');
    body.appendChild(desc);

    /* Speed slider */
    var speedWrap = document.createElement('div');
    speedWrap.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
    var speedLbl = document.createElement('label');
    speedLbl.style.cssText = 'font-size:10px;color:#94a3b8;';
    var speedVal = document.createElement('span');
    speedVal.textContent = '1.0x';
    speedLbl.textContent = t('speed') + ': ';
    speedLbl.appendChild(speedVal);
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0.5'; slider.max = '2'; slider.step = '0.1'; slider.value = '1';
    slider.style.cssText = 'width:100%;accent-color:#4ade80;';
    slider.oninput = function () { speedVal.textContent = parseFloat(slider.value).toFixed(1) + 'x'; };
    speedWrap.appendChild(speedLbl);
    speedWrap.appendChild(slider);
    body.appendChild(speedWrap);

    /* Status */
    var statusEl = document.createElement('div');
    statusEl.style.cssText = 'font-size:11px;color:#fbbf24;min-height:18px;text-align:center;';
    body.appendChild(statusEl);

    /* Buttons */
    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;';

    var readBtn = document.createElement('button');
    readBtn.textContent = t('read');
    readBtn.style.cssText = 'flex:2;background:linear-gradient(135deg,#16a34a,#15803d);border:none;border-radius:8px;padding:10px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;transition:opacity .2s;';
    readBtn.onmouseenter = function () { readBtn.style.opacity = '0.85'; };
    readBtn.onmouseleave = function () { readBtn.style.opacity = '1'; };
    readBtn.onclick = function () { readPage(slider.value, statusEl); };
    btnRow.appendChild(readBtn);

    var stopBtn = document.createElement('button');
    stopBtn.textContent = t('stop');
    stopBtn.style.cssText = 'flex:1;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:8px;padding:10px;color:#f87171;font-weight:900;font-size:11px;cursor:pointer;transition:background .2s;';
    stopBtn.onmouseenter = function () { stopBtn.style.background = 'rgba(239,68,68,0.3)'; };
    stopBtn.onmouseleave = function () { stopBtn.style.background = 'rgba(239,68,68,0.15)'; };
    stopBtn.onclick = function () { stopReading(); statusEl.textContent = ''; };
    btnRow.appendChild(stopBtn);

    body.appendChild(btnRow);
    wrap.appendChild(body);
    parent.appendChild(wrap);
  }

  /* ── Hook into renderTab ── */
  document.addEventListener('DOMContentLoaded', function () {
    var oAL = window.applyLang;
    window.applyLang = function () {
      if (typeof oAL === 'function') oAL();
      var el = document.getElementById('lbl-tab-voicereader');
      if (el) el.textContent = t('tab');
      if (window.activeTab === 'voicereader') renderVoiceTab();
    };

    var oRT = window.renderTab;
    window.renderTab = function (tab) {
      if (tab === 'voicereader') {
        window.activeTab = 'voicereader';
        document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.getElementById('tab-voicereader');
        if (btn) btn.classList.add('active');
        renderVoiceTab();
        return;
      }
      if (typeof oRT === 'function') oRT(tab);
    };
  });
})();
