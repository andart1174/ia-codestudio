(function() {
'use strict';
/* ═══════════════════════════════════════════════════
   Security Vault v1.0
   Advanced security scanner — beyond Code Audit
   ═══════════════════════════════════════════════════ */
var t_sv = {
  en: { tab: 'Security', title: '🔐 Security Vault', sub: 'Advanced security scanner for your code',
        scan: '🔍 Run Security Scan', fix: '🔧 Auto-Fix', fixed: '✅ Fixed!',
        noCode: 'No code in editor.', clean: '✅ No critical issues found! Your code is secure.',
        critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM', low: 'LOW', info: 'INFO',
        total: 'issues found', score: 'Security Score' },
  fr: { tab: 'Sécurité', title: '🔐 Coffre de Sécurité', sub: 'Scanner de sécurité avancé pour votre code',
        scan: '🔍 Lancer le Scan de Sécurité', fix: '🔧 Corriger Auto.', fixed: '✅ Corrigé !',
        noCode: 'Aucun code dans l\'éditeur.', clean: '✅ Aucun problème critique trouvé ! Votre code est sécurisé.',
        critical: 'CRITIQUE', high: 'ÉLEVÉ', medium: 'MOYEN', low: 'FAIBLE', info: 'INFO',
        total: 'problèmes trouvés', score: 'Score Sécurité' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return t_sv[gl()][k] || k; }

var SEVERITY_COLORS = { CRITICAL:'#ef4444', HIGH:'#f97316', MEDIUM:'#f59e0b', LOW:'#3b82f6', INFO:'#64748b' };

// ─── Security Rules ────────────────────────────────────────────────────
var RULES = [
  // CRITICAL
  { id:'xss-innerHTML', sev:'CRITICAL',
    en:'XSS Risk — innerHTML usage detected', fr:'Risque XSS — usage de innerHTML détecté',
    en_desc:'innerHTML can execute malicious scripts. Use textContent instead.',
    fr_desc:'innerHTML peut exécuter des scripts malveillants. Utilisez textContent.',
    detect: function(c){ return c.includes('innerHTML') && c.includes('input') || (c.match(/innerHTML\s*=/g)||[]).length > 2; },
    fix: null },
  { id:'hardcoded-secret', sev:'CRITICAL',
    en:'Hardcoded Secret — API key or password in code', fr:'Secret en clair — Clé API ou mot de passe dans le code',
    en_desc:'Never hardcode API keys or passwords. Use environment variables.',
    fr_desc:'Ne codez jamais de clés API en dur. Utilisez des variables d\'environnement.',
    detect: function(c){ return /(?:api[_-]?key|password|secret|token|apikey)\s*[=:]\s*["'][^"']{8,}/i.test(c); },
    fix: null },

  // HIGH
  { id:'http-resource', sev:'HIGH',
    en:'Insecure HTTP — using http:// instead of https://', fr:'HTTP non sécurisé — utilisation de http:// au lieu de https://',
    en_desc:'Always use HTTPS for external resources (scripts, fonts, images).',
    fr_desc:'Utilisez toujours HTTPS pour les ressources externes.',
    detect: function(c){ return /(?:src|href)=["']http:\/\/(?!localhost)/i.test(c); },
    fix: function(c){ return c.replace(/(?<=(?:src|href)=["'])http:\/\/(?!localhost)/gi, 'https://'); } },
  { id:'eval-usage', sev:'HIGH',
    en:'eval() Detected — dangerous code execution', fr:'eval() Détecté — exécution de code dangereuse',
    en_desc:'eval() can execute arbitrary code. Avoid it completely.',
    fr_desc:'eval() peut exécuter du code arbitraire. Évitez-le complètement.',
    detect: function(c){ return /\beval\s*\(/i.test(c); },
    fix: null },
  { id:'no-csp', sev:'HIGH',
    en:'Missing Content Security Policy (CSP)', fr:'Politique de Sécurité du Contenu (CSP) manquante',
    en_desc:'Add a CSP meta tag to prevent XSS attacks.',
    fr_desc:'Ajoutez une balise meta CSP pour prévenir les attaques XSS.',
    detect: function(c){ return c.includes('<head>') && !c.includes('Content-Security-Policy'); },
    fix: function(c){ return c.replace('</head>', '  <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\';">\n</head>'); } },

  // MEDIUM
  { id:'no-https-form', sev:'MEDIUM',
    en:'Form without secure action — data may be sent insecurely', fr:'Formulaire sans action sécurisée',
    en_desc:'Ensure form actions use HTTPS endpoints.',
    fr_desc:'Assurez-vous que les actions de formulaire utilisent HTTPS.',
    detect: function(c){ return /<form[^>]*action=["']http:\/\//i.test(c); },
    fix: function(c){ return c.replace(/(<form[^>]*action=["'])http:\/\//gi, '$1https://'); } },
  { id:'autocomplete-password', sev:'MEDIUM',
    en:'Password field without autocomplete="off"', fr:'Champ mot de passe sans autocomplete="off"',
    en_desc:'Disable autocomplete on sensitive password fields.',
    fr_desc:'Désactivez l\'autocomplétion sur les champs de mot de passe sensibles.',
    detect: function(c){ return /<input[^>]*type=["']password["'][^>]*>/i.test(c) && !c.includes('autocomplete="off"'); },
    fix: function(c){ return c.replace(/(<input[^>]*type=["']password["'][^>]*)(>)/gi, '$1 autocomplete="off"$2'); } },
  { id:'no-rel-noopener', sev:'MEDIUM',
    en:'External link without rel="noopener" — tab hijacking risk', fr:'Lien externe sans rel="noopener" — risque de détournement',
    en_desc:'Add rel="noopener noreferrer" to all external links.',
    fr_desc:'Ajoutez rel="noopener noreferrer" à tous les liens externes.',
    detect: function(c){ return /<a[^>]*target=["']_blank["'][^>]*(?!rel=["']noopener)/i.test(c); },
    fix: function(c){ return c.replace(/(<a[^>]*target=["']_blank["'](?![^>]*rel=)[^>]*)(>)/gi, '$1 rel="noopener noreferrer"$2'); } },
  { id:'no-lang', sev:'MEDIUM',
    en:'Missing lang attribute on <html>', fr:'Attribut lang manquant sur <html>',
    en_desc:'Add lang="en" (or your language) to the <html> tag for accessibility.',
    fr_desc:'Ajoutez lang="fr" à la balise <html> pour l\'accessibilité.',
    detect: function(c){ return c.includes('<html>') && !c.includes('<html lang'); },
    fix: function(c){ return c.replace('<html>', '<html lang="' + gl() + '">'); } },

  // LOW
  { id:'inline-event', sev:'LOW',
    en:'Inline event handlers detected — bad practice', fr:'Gestionnaires d\'événements inline — mauvaise pratique',
    en_desc:'Use addEventListener() instead of inline onclick, onload etc.',
    fr_desc:'Utilisez addEventListener() au lieu des gestionnaires inline.',
    detect: function(c){ return (c.match(/\b(onclick|onload|onmouseover|onkeyup)\s*=/gi)||[]).length > 3; },
    fix: null },
  { id:'no-meta-viewport', sev:'LOW',
    en:'Missing viewport meta — poor mobile experience', fr:'Meta viewport manquant — mauvaise expérience mobile',
    en_desc:'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    fr_desc:'Ajoutez <meta name="viewport" content="width=device-width, initial-scale=1">',
    detect: function(c){ return c.includes('<head>') && !c.includes('viewport'); },
    fix: function(c){ return c.replace('</head>', '  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>'); } },
  { id:'console-log', sev:'LOW',
    en:'console.log() calls in production code', fr:'Appels console.log() dans le code de production',
    en_desc:'Remove console.log() calls before deploying to production.',
    fr_desc:'Supprimez les appels console.log() avant de déployer en production.',
    detect: function(c){ return (c.match(/console\.log\s*\(/g)||[]).length > 2; },
    fix: null },

  // INFO
  { id:'no-favicon', sev:'INFO',
    en:'No favicon defined', fr:'Aucun favicon défini',
    en_desc:'Add <link rel="icon" href="favicon.ico"> for a professional look.',
    fr_desc:'Ajoutez <link rel="icon" href="favicon.ico"> pour un aspect professionnel.',
    detect: function(c){ return c.includes('<head>') && !c.includes('rel="icon"') && !c.includes("rel='icon'"); },
    fix: function(c){ return c.replace('</head>', '  <link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>🏗️</text></svg>">\n</head>'); } },
  { id:'no-og-tags', sev:'INFO',
    en:'No Open Graph meta tags for social sharing', fr:'Aucune balise Open Graph pour le partage social',
    en_desc:'Add og:title and og:description for better social sharing.',
    fr_desc:'Ajoutez og:title et og:description pour un meilleur partage social.',
    detect: function(c){ return !c.includes('og:title') && !c.includes('og:description'); },
    fix: null }
];

var scanResults = [];

function runScan(code) {
  var results = [];
  RULES.forEach(function(rule) {
    try {
      if (rule.detect(code)) {
        results.push(rule);
      }
    } catch(e) {}
  });
  return results;
}

function calcScore(issues) {
  var penalties = { CRITICAL: 25, HIGH: 15, MEDIUM: 8, LOW: 3, INFO: 1 };
  var total = 100;
  issues.forEach(function(r) { total -= (penalties[r.sev] || 0); });
  return Math.max(0, total);
}

function renderSecurityTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f87171;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  var scanBtn = document.createElement('button');
  scanBtn.innerHTML = t('scan');
  scanBtn.style = 'width:100%;background:linear-gradient(90deg,#dc2626,#b91c1c);color:#fff;border:none;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
  scanBtn.onclick = function() {
    if (!window.editor) return;
    var code = window.editor.getValue();
    if (!code.trim()) { if(window.showToast) window.showToast(t('noCode')); return; }
    scanResults = runScan(code);
    renderSecurityTab();
  };
  body.appendChild(scanBtn);

  if (scanResults.length > 0) {
    var score = calcScore(scanResults);
    var scoreColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

    // Score card
    var scoreCard = document.createElement('div');
    scoreCard.style = 'background:#1e293b;border-radius:10px;padding:12px;text-align:center;border:1px solid ' + scoreColor + '30;';
    scoreCard.innerHTML = '<div style="font-size:28px;font-weight:900;color:' + scoreColor + ';">' + score + '/100</div>' +
      '<div style="font-size:10px;color:#64748b;">' + t('score') + '</div>' +
      '<div style="background:#0f172a;border-radius:6px;height:6px;margin-top:8px;overflow:hidden;"><div style="width:' + score + '%;height:100%;background:' + scoreColor + ';border-radius:6px;transition:width 0.8s;"></div></div>' +
      '<div style="font-size:10px;color:#94a3b8;margin-top:6px;">' + scanResults.length + ' ' + t('total') + '</div>';
    body.appendChild(scoreCard);

    // Group by severity
    var groups = { CRITICAL:[], HIGH:[], MEDIUM:[], LOW:[], INFO:[] };
    scanResults.forEach(function(r) { if(groups[r.sev]) groups[r.sev].push(r); });

    Object.keys(groups).forEach(function(sev) {
      if (groups[sev].length === 0) return;
      var color = SEVERITY_COLORS[sev];
      var sevLabel = t(sev.toLowerCase()) || sev;

      var sevHdr = document.createElement('div');
      sevHdr.style = 'font-size:9px;font-weight:bold;color:' + color + ';text-transform:uppercase;letter-spacing:1px;margin-top:4px;';
      sevHdr.textContent = '⚠ ' + sevLabel + ' (' + groups[sev].length + ')';
      body.appendChild(sevHdr);

      groups[sev].forEach(function(rule) {
        var card = document.createElement('div');
        card.style = 'background:#1e293b;border:1px solid ' + color + '30;border-left:3px solid ' + color + ';border-radius:6px;padding:8px 10px;';

        var titleEl = document.createElement('div');
        titleEl.style = 'font-size:10px;font-weight:bold;color:#e2e8f0;margin-bottom:3px;';
        titleEl.textContent = gl()==='fr' ? rule.fr : rule.en;

        var descEl = document.createElement('div');
        descEl.style = 'font-size:9px;color:#64748b;line-height:1.4;margin-bottom:6px;';
        descEl.textContent = gl()==='fr' ? rule.fr_desc : rule.en_desc;

        card.appendChild(titleEl);
        card.appendChild(descEl);

        if (rule.fix) {
          var fixBtn = document.createElement('button');
          fixBtn.textContent = t('fix');
          fixBtn.style = 'background:' + color + '20;border:1px solid ' + color + '50;color:' + color + ';padding:3px 8px;border-radius:4px;font-size:9px;cursor:pointer;font-weight:bold;';
          fixBtn.onclick = function() {
            if (!window.editor) return;
            try {
              var newCode = rule.fix(window.editor.getValue());
              window.editor.setValue(newCode);
              if (window.runPreview) window.runPreview();
              fixBtn.textContent = t('fixed');
              fixBtn.style.background = '#10b98120';
              fixBtn.style.borderColor = '#10b981';
              fixBtn.style.color = '#10b981';
              // Re-scan
              setTimeout(function() {
                scanResults = runScan(window.editor.getValue());
                renderSecurityTab();
              }, 1000);
            } catch(e) {}
          };
          card.appendChild(fixBtn);
        }

        body.appendChild(card);
      });
    });

  } else if (scanResults !== undefined && window.editor && window.editor.getValue().trim()) {
    // Only show clean if scan was actually run
  }

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() { if(typeof oAL==='function') oAL(); var el=document.getElementById('lbl-tab-security'); if(el) el.textContent=t('tab'); if(window.activeTab==='security') renderSecurityTab(); };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='security'){window.activeTab='security';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var el=document.getElementById('tab-security');if(el)el.classList.add('active');renderSecurityTab();return;}
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
