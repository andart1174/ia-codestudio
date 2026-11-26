/**
 * IA Code Studio — Free Tools Hub Shared Utilities (v2.0)
 * Centralizes XSS/SVG sanitization, clipboard copy, safe Blob downloads,
 * glassmorphic toast notifications, WCAG 2.1 contrast ratio, synced Pro check,
 * and clean HTML widget attribution watermark.
 */
(function (global) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/`/g, '&#96;');
  }

  function sanitizeUrl(url, fallback) {
    var fb = fallback || '#';
    if (!url) return fb;
    var s = String(url).trim();
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(s)) return s;
    if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(s)) return 'https://' + s;
    return fb;
  }

  /**
   * Strict client-side SVG sanitizer removing <script>, <foreignObject>,
   * event handler attributes (on*), and javascript: hrefs.
   */
  function sanitizeSvg(svgStr) {
    if (!svgStr) return '';
    if (typeof DOMParser === 'undefined') {
      return String(svgStr)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
        .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/javascript\s*:/gi, '');
    }
    try {
      var parser = new DOMParser();
      var doc = parser.parseFromString(String(svgStr), 'image/svg+xml');
      var svg = doc.querySelector('svg');
      if (!svg) return '';
      var forbidden = ['script', 'foreignobject', 'iframe', 'object', 'embed', 'animate', 'set'];
      forbidden.forEach(function (tag) {
        svg.querySelectorAll(tag).forEach(function (node) { node.remove(); });
      });
      var walk = function (el) {
        if (!el || !el.attributes) return;
        Array.from(el.attributes).forEach(function (attr) {
          var name = attr.name.toLowerCase();
          var val = (attr.value || '').trim();
          if (name.indexOf('on') === 0) {
            el.removeAttribute(attr.name);
          } else if ((name === 'href' || name === 'xlink:href' || name === 'src') && /^\s*javascript:/i.test(val)) {
            el.removeAttribute(attr.name);
          } else if (name === 'style' && /expression\s*\(|javascript\s*:/i.test(val)) {
            el.removeAttribute(attr.name);
          }
        });
        Array.from(el.children || []).forEach(walk);
      };
      walk(svg);
      return new XMLSerializer().serializeToString(svg);
    } catch (e) {
      return '';
    }
  }

  function showToast(message, type) {
    if (typeof document === 'undefined' || !document.body) return;
    var container = document.getElementById('hub-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hub-toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999999;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:92vw;';
      document.body.appendChild(container);
    }
    var border = type === 'error' ? 'rgba(239,68,68,0.6)' : type === 'warn' ? 'rgba(245,158,11,0.6)' : type === 'success' ? 'rgba(16,185,129,0.6)' : 'rgba(0,240,255,0.45)';
    var el = document.createElement('div');
    el.style.cssText = 'background:rgba(11,14,26,0.95);backdrop-filter:blur(14px);color:#f8fafc;padding:11px 20px;border-radius:12px;font-family:Outfit,sans-serif;font-size:13.5px;font-weight:600;border:1px solid ' + border + ';box-shadow:0 12px 32px rgba(0,0,0,0.55);opacity:0;transform:translateY(14px);transition:all 0.25s cubic-bezier(0.16,1,0.3,1);text-align:center;';
    el.textContent = String(message || '');
    container.appendChild(el);
    requestAnimationFrame(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-10px)';
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 280);
    }, 3000);
  }

  function copyText(text, successMsg) {
    var str = String(text || '');
    var notify = function (ok) {
      if (ok && successMsg) showToast(successMsg, 'success');
      return ok;
    };
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(str).then(function () {
        return notify(true);
      }).catch(function () {
        return notify(fallbackCopy(str));
      });
    }
    return Promise.resolve(notify(fallbackCopy(str)));
  }

  function fallbackCopy(str) {
    try {
      var ta = document.createElement('textarea');
      ta.value = str;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return !!ok;
    } catch (e) {
      return false;
    }
  }

  function safeDownloadBlob(blob, filename) {
    if (!blob) return;
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'ia-code-studio-export.html';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      if (a.parentNode) a.parentNode.removeChild(a);
      try { URL.revokeObjectURL(url); } catch (e) {}
    }, 4000);
  }

  function safeDownloadText(content, filename, mime) {
    var blob = new Blob([String(content || '')], { type: mime || 'text/html;charset=utf-8' });
    safeDownloadBlob(blob, filename);
  }

  function parseHex(hex) {
    var h = String(hex || '#000000').trim().replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length !== 6) return [0, 0, 0];
    return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
  }

  function relLum(rgb) {
    var c = rgb.map(function (v) {
      var s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function contrastRatio(hex1, hex2) {
    var l1 = relLum(parseHex(hex1));
    var l2 = relLum(parseHex(hex2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function formatContrastBadge(hex1, hex2, lang) {
    var r = contrastRatio(hex1, hex2);
    var fr = lang === 'fr';
    if (r >= 7) return { ratio: r, level: 'AAA', color: '#10b981', text: '♿ ' + r.toFixed(1) + ':1 ✅ AAA' };
    if (r >= 4.5) return { ratio: r, level: 'AA', color: '#38bdf8', text: '♿ ' + r.toFixed(1) + ':1 ✅ AA' };
    if (r >= 3) return { ratio: r, level: 'AA Large', color: '#f59e0b', text: '♿ ' + r.toFixed(1) + ':1 ' + (fr ? '⚠️ Grand' : '⚠️ Large') };
    return { ratio: r, level: 'FAIL', color: '#ef4444', text: '♿ ' + r.toFixed(1) + ':1 ' + (fr ? '❌ Faible' : '❌ Low') };
  }

  function checkIsPremium() {
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        var params = new URLSearchParams(window.location.search);
        if (params.get('pro_unlocked') === 'true') {
          localStorage.setItem('ia_pro_unlocked', 'true');
          return true;
        }
      }
    } catch (e) {}
    try {
      if (localStorage.getItem('ia_pro_unlocked') === 'true' || localStorage.getItem('ia_pro_active') === 'true') {
        return true;
      }
      var session = localStorage.getItem('genius_session');
      if (session) {
        var user = JSON.parse(session);
        var email = (user.email || '').toLowerCase();
        var premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
        var record = premiumList.find(function (p) { return (p.email || '').toLowerCase() === email; });
        if (record) {
          var isUnlimited = record.days === 9999;
          var expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
          if (isUnlimited || expiry > Date.now()) return true;
        }
      }
      var subDate = localStorage.getItem('ia_premium_sub_date');
      if (subDate) {
        var daysLeft = 30 - Math.floor((Date.now() - parseInt(subDate, 10)) / 86400000);
        if (daysLeft > 0) return true;
      }
    } catch (e) {}
    return false;
  }

  function getWatermarkCode(label) {
    var badgeTitle = escapeHtml(label || 'Powered by IA Code Studio');
    return '<!-- IA Code Studio Attribution (Remove with Pro) -->\n' +
      '<div id="ia-code-watermark" style="position:fixed;bottom:14px;right:14px;z-index:999999;background:rgba(15,17,26,0.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,240,255,0.28);border-radius:30px;padding:7px 14px;box-shadow:0 4px 15px rgba(0,240,255,0.15);font-family:Outfit,system-ui,sans-serif;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">' +
      '<a href="https://ia-codestudio.com" target="_blank" rel="noopener noreferrer" style="color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">' +
      '<span style="color:#00f0ff;">⚡</span><span>' + badgeTitle + '</span></a></div>';
  }

  global.HubUtils = {
    escapeHtml: escapeHtml,
    escapeAttr: escapeAttr,
    sanitizeUrl: sanitizeUrl,
    sanitizeSvg: sanitizeSvg,
    showToast: showToast,
    copyText: copyText,
    safeDownloadBlob: safeDownloadBlob,
    safeDownloadText: safeDownloadText,
    contrastRatio: contrastRatio,
    formatContrastBadge: formatContrastBadge,
    checkIsPremium: checkIsPremium,
    getWatermarkCode: getWatermarkCode
  };
})(typeof window !== 'undefined' ? window : globalThis);
