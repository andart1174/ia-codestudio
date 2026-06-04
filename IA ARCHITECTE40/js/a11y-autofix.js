/**
 * ♿ A11y Accessibility & ARIA Auto-Fixer v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'A11y Fixer',
    title: '♿ A11y Accessibility Auditor',
    sub: 'Scan and automatically inject ARIA roles and labels',
    desc: 'Audit your HTML code for WCAG compliance violations. Use the One-Click Auto-Fix tool to inject missing alt tags, ARIA labels, semantic roles, and focus tab-indices directly into Monaco.',
    btnAudit: '🔍 Scan Accessibility',
    btnFixAll: '⚡ Auto-Fix All Issues',
    perfect: '✅ Congratulations! No accessibility issues found.',
    lblIssues: 'Detected Issues',
    issueAlt: 'Image <img> is missing an alt description tag.',
    issueLang: 'The <html> tag is missing a lang attribute.',
    issueRole: 'Interactive element has onclick handler but is missing role="button" and tabindex="0".',
    issueAria: 'Button element has no inner text and is missing an aria-label.',
    btnFix: 'Fix',
    copied: 'Fixed!',
    noHTML: 'No HTML code found or Monaco editor not active.'
  },
  fr: {
    tab: 'Fixer A11y',
    title: '♿ Audit de l\'Accessibilité A11y',
    sub: 'Analysez et injectez automatiquement les rôles et tags ARIA',
    desc: 'Analysez votre code HTML pour détecter les infractions aux règles d\'accessibilité. Utilisez les boutons Auto-Fix pour injecter les tags alt, les labels ARIA, les rôles et les index de focus directement dans Monaco.',
    btnAudit: '🔍 Analyser l\'Accessibilité',
    btnFixAll: '⚡ Tout Corriger',
    perfect: '✅ Félicitations ! Aucun problème d\'accessibilité détecté.',
    lblIssues: 'Problèmes Détectés',
    issueAlt: 'L\'image <img> n\'a pas de description alt.',
    issueLang: 'La balise <html> n\'a pas d\'attribut de langue (lang).',
    issueRole: 'L\'élément interactif a un gestionnaire onclick mais n\'a pas de role="button" ni de tabindex="0".',
    issueAria: 'Le bouton n\'a pas de texte interne et n\'a pas de label ARIA.',
    btnFix: 'Corriger',
    copied: 'Corrigé !',
    noHTML: 'Aucun code HTML trouvé ou éditeur Monaco inactif.'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

let currentIssues = [];

function runA11yAudit() {
  const ed = window.editor;
  if (!ed) {
    currentIssues = [];
    return;
  }
  const html = ed.getValue();
  const lines = html.split('\n');
  const issues = [];

  // 1. Check HTML Lang
  if (html.includes('<html') && !html.includes('lang=')) {
    issues.push({
      id: 'lang',
      type: 'lang',
      description: t('issueLang'),
      recommendation: 'Replace <html> with <html lang="en">'
    });
  }

  // 2. Check Alt Tag on Images
  const imgRegex = /<img([^>]+)>/g;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1];
    if (!attrs.includes('alt=')) {
      issues.push({
        id: 'alt_' + issues.length,
        type: 'alt',
        tag: match[0],
        description: t('issueAlt'),
        recommendation: 'Add alt="Image description" to the image tag.'
      });
    }
  }

  // 3. Check Interactive div/span missing role and tabindex
  const interactiveRegex = /<(div|span)([^>]+onclick=[^>]+)>/g;
  while ((match = interactiveRegex.exec(html)) !== null) {
    const attrs = match[2];
    const tagName = match[1];
    if (!attrs.includes('role=') || !attrs.includes('tabindex=')) {
      issues.push({
        id: 'role_' + issues.length,
        type: 'role',
        tag: match[0],
        tagName: tagName,
        description: t('issueRole'),
        recommendation: `Add role="button" tabindex="0" to the interactive <${tagName}>.`
      });
    }
  }

  // 4. Check Empty Button missing aria-label
  const buttonRegex = /<button([^>]*)>([\s\S]*?)<\/button>/g;
  while ((match = buttonRegex.exec(html)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();
    // If it only contains icons/special chars or is empty and lacks aria-label
    const isIconOnly = content.length <= 4 || /^[^\w\s]*$/.test(content);
    if (isIconOnly && !attrs.includes('aria-label=') && !attrs.includes('aria-labelledby=')) {
      issues.push({
        id: 'aria_' + issues.length,
        type: 'aria',
        tag: match[0],
        description: t('issueAria'),
        recommendation: 'Add aria-label="..." to define the button action.'
      });
    }
  }

  currentIssues = issues;
  renderA11yTab();
}

function fixA11yIssue(issueId) {
  const ed = window.editor;
  if (!ed) return;
  let html = ed.getValue();
  const issue = currentIssues.find(i => i.id === issueId);
  if (!issue) return;

  if (issue.type === 'lang') {
    html = html.replace(/<html(\s*>|\s+[^>]*>)/i, '<html lang="en">');
  } else if (issue.type === 'alt') {
    const fixedTag = issue.tag.replace('<img', '<img alt="Image description"');
    html = html.replace(issue.tag, fixedTag);
  } else if (issue.type === 'role') {
    let fixedTag = issue.tag;
    if (!fixedTag.includes('role=')) {
      fixedTag = fixedTag.replace(`<${issue.tagName}`, `<${issue.tagName} role="button"`);
    }
    if (!fixedTag.includes('tabindex=')) {
      fixedTag = fixedTag.replace(`<${issue.tagName}`, `<${issue.tagName} tabindex="0"`);
    }
    html = html.replace(issue.tag, fixedTag);
  } else if (issue.type === 'aria') {
    const fixedTag = issue.tag.replace('<button', '<button aria-label="Action"');
    html = html.replace(issue.tag, fixedTag);
  }

  ed.setValue(html);
  if (window.showToast) window.showToast(t('copied'));
  if (window.runPreview) window.runPreview();
  runA11yAudit();
}

function fixAllIssues() {
  const ed = window.editor;
  if (!ed || currentIssues.length === 0) return;
  
  let html = ed.getValue();

  currentIssues.forEach(issue => {
    if (issue.type === 'lang') {
      html = html.replace(/<html(\s*>|\s+[^>]*>)/i, '<html lang="en">');
    } else if (issue.type === 'alt') {
      const fixedTag = issue.tag.replace('<img', '<img alt="Image description"');
      html = html.replace(issue.tag, fixedTag);
    } else if (issue.type === 'role') {
      let fixedTag = issue.tag;
      if (!fixedTag.includes('role=')) {
        fixedTag = fixedTag.replace(`<${issue.tagName}`, `<${issue.tagName} role="button"`);
      }
      if (!fixedTag.includes('tabindex=')) {
        fixedTag = fixedTag.replace(`<${issue.tagName}`, `<${issue.tagName} tabindex="0"`);
      }
      html = html.replace(issue.tag, fixedTag);
    } else if (issue.type === 'aria') {
      const fixedTag = issue.tag.replace('<button', '<button aria-label="Action"');
      html = html.replace(issue.tag, fixedTag);
    }
  });

  ed.setValue(html);
  if (window.showToast) window.showToast(t('copied'));
  if (window.runPreview) window.runPreview();
  runA11yAudit();
}

function renderA11yTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0d0b14;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(20,184,166,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#10b981;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Buttons
  const auditBtn = document.createElement('button');
  auditBtn.textContent = t('btnAudit');
  auditBtn.style = 'background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.25);border-radius:8px;padding:9px;font-weight:800;font-size:10.5px;cursor:pointer;';
  auditBtn.onclick = runA11yAudit;
  scrollContainer.appendChild(auditBtn);

  if (currentIssues.length > 0) {
    const fixAllBtn = document.createElement('button');
    fixAllBtn.textContent = t('btnFixAll');
    fixAllBtn.style = 'background:linear-gradient(90deg,#10b981,#059669);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
    fixAllBtn.onclick = fixAllIssues;
    scrollContainer.appendChild(fixAllBtn);
  }

  // Issues Header
  const issueHdr = document.createElement('div');
  issueHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:4px;';
  issueHdr.textContent = t('lblIssues');
  scrollContainer.appendChild(issueHdr);

  // Issues list
  if (currentIssues.length === 0) {
    const perfectCard = document.createElement('div');
    perfectCard.style = 'background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:12px;font-size:11px;color:#34d399;text-align:center;font-weight:bold;';
    perfectCard.textContent = t('perfect');
    scrollContainer.appendChild(perfectCard);
  } else {
    currentIssues.forEach(issue => {
      const card = document.createElement('div');
      card.style = 'background:#14121e;border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
      
      const txt = document.createElement('div');
      txt.style = 'font-size:10.5px;color:#fca5a5;line-height:1.4;';
      txt.innerHTML = `<strong style="color:#ef4444;">⚠️ WCAG Violation:</strong> ${issue.description}`;
      card.appendChild(txt);

      if (issue.tag) {
        const codeView = document.createElement('pre');
        codeView.style = 'background:#08060c;border:1px solid rgba(255,255,255,0.03);border-radius:6px;padding:6px;color:#a78bfa;font-family:monospace;font-size:9px;white-space:pre-wrap;word-break:break-all;margin:0;';
        codeView.textContent = issue.tag;
        card.appendChild(codeView);
      }

      const rec = document.createElement('div');
      rec.style = 'font-size:9.5px;color:#94a3b8;font-style:italic;';
      rec.textContent = `Recommendation: ${issue.recommendation}`;
      card.appendChild(rec);

      const fBtn = document.createElement('button');
      fBtn.textContent = t('btnFix');
      fBtn.style = 'align-self:flex-end;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);border-radius:6px;padding:5px 12px;font-size:9.5px;font-weight:800;cursor:pointer;';
      fBtn.onclick = () => fixA11yIssue(issue.id);
      card.appendChild(fBtn);

      scrollContainer.appendChild(card);
    });
  }

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-a11yautofix');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'a11yautofix') renderA11yTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'a11yautofix') {
      window.activeTab = 'a11yautofix';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-a11yautofix');
      if (btn) btn.classList.add('active');
      renderA11yTab();
      runA11yAudit();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
