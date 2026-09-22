/**
 * 🧪 Interactive E2E Test & Event Recorder v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'E2E Testing',
    title: '🧪 E2E Test & Event Recorder',
    sub: 'Record user events and output Playwright/Cypress test suites',
    desc: 'Simulate user actions in the sandbox page below. Click buttons and input values to watch the E2E regression test code write itself live.',
    btnRecord: '⏺ Start Recording',
    btnStop: '⏹ Stop & Clear',
    btnCopy: '📋 Copy Test Code',
    copied: 'Copied!',
    lblSandbox: 'Interactive Sandbox Viewport',
    lblOutput: 'Generated Test Suite',
    lblFw: 'Target Test Framework',
    sandbox: {
      navHome: 'Home', navDash: 'Dashboard',
      title: 'Sign In Page',
      lblUser: 'Username', lblPass: 'Password',
      btnSubmit: 'Login', btnReset: 'Reset'
    }
  },
  fr: {
    tab: 'Tests E2E',
    title: '🧪 Générateur de Tests E2E',
    sub: 'Enregistrez des événements pour exporter des scripts Playwright/Cypress',
    desc: 'Simulez les actions de l\'utilisateur dans le bac à sable ci-dessous. Cliquez sur les boutons et saisissez du texte pour voir le script de test s\'écrire en direct.',
    btnRecord: '⏺ Démarrer',
    btnStop: '⏹ Arrêter & Effacer',
    btnCopy: '📋 Copier le Code de Test',
    copied: 'Copié !',
    lblSandbox: 'Bac à Sable Interactif',
    lblOutput: 'Code de Test Généré',
    lblFw: 'Framework de Test Ciblé',
    sandbox: {
      navHome: 'Accueil', navDash: 'Dashboard',
      title: 'Page de Connexion',
      lblUser: 'Utilisateur', lblPass: 'Mot de Passe',
      btnSubmit: 'Connexion', btnReset: 'Réinitialiser'
    }
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

// Test Generator State
let isRecording = false;
let recordedEvents = [];
let targetFramework = 'playwright'; // playwright, cypress, jest

function appendEvent(ev) {
  if (!isRecording) return;
  recordedEvents.push(ev);
  renderTestCode();
}

function startRecording() {
  isRecording = true;
  recordedEvents = [];
  appendEvent({ type: 'init', url: 'http://localhost:3000/index.html' });
  renderE2ETab();
}

function stopAndClear() {
  isRecording = false;
  recordedEvents = [];
  renderE2ETab();
}

function generateTestScript() {
  if (recordedEvents.length === 0) {
    return '// ' + (gl() === 'fr' ? 'Aucun événement enregistré. Activez l\'enregistrement et cliquez sur le bac à sable ci-dessus.' : 'No events recorded. Start recording and click on the sandbox above.');
  }

  let code = "";
  
  if (targetFramework === 'playwright') {
    code += `import { test, expect } from '@playwright/test';\n\n`;
    code += `test('User flow regression test', async ({ page }) => {\n`;
    recordedEvents.forEach(e => {
       if (e.type === 'init') {
         code += `  await page.goto('${e.url}');\n`;
       } else if (e.type === 'click') {
         code += `  await page.locator('${e.selector}').click();\n`;
       } else if (e.type === 'fill') {
         code += `  await page.locator('${e.selector}').fill('${e.value}');\n`;
       }
    });
    code += `  // Expect elements to be visible\n`;
    code += `  await expect(page.locator('body')).toBeVisible();\n`;
    code += `});\n`;
  } else if (targetFramework === 'cypress') {
    code += `describe('User flow regression test', () => {\n`;
    code += `  it('should run recorded interactions successfully', () => {\n`;
    recordedEvents.forEach(e => {
       if (e.type === 'init') {
         code += `    cy.visit('${e.url}');\n`;
       } else if (e.type === 'click') {
         code += `    cy.get('${e.selector}').click();\n`;
       } else if (e.type === 'fill') {
         code += `    cy.get('${e.selector}').type('${e.value}');\n`;
       }
    });
    code += `    cy.get('body').should('be.visible');\n`;
    code += `  });\n`;
    code += `});\n`;
  } else if (targetFramework === 'jest') {
    code += `import { render, screen, fireEvent } from '@testing-library/react';\n`;
    code += `import App from './App';\n\n`;
    code += `test('verify interactive controls', () => {\n`;
    code += `  render(<App />);\n`;
    recordedEvents.forEach(e => {
       if (e.type === 'click') {
         code += `  fireEvent.click(screen.getByTestId('${e.id || e.selector}'));\n`;
       } else if (e.type === 'fill') {
         code += `  fireEvent.change(screen.getByTestId('${e.id || e.selector}'), { target: { value: '${e.value}' } });\n`;
       }
    });
    code += `  expect(screen.getByRole('main')).toBeInTheDocument();\n`;
    code += `});\n`;
  }
  
  return code;
}

function renderTestCode() {
  const ta = document.getElementById('e2e-output-code');
  if (ta) {
     ta.value = generateTestScript();
  }
}

function copyCode() {
  const ta = document.getElementById('e2e-output-code');
  if(!ta) return;
  navigator.clipboard.writeText(ta.value).then(() => {
    if(window.showToast) window.showToast(t('copied'));
  });
}

function renderE2ETab() {
  const parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  
  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(6,182,212,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#22d3ee;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;min-height:0;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  // Recorder controls
  const recBtnRow = document.createElement('div');
  recBtnRow.style = 'display:flex;gap:6px;';
  
  const recBtn = document.createElement('button');
  recBtn.textContent = t('btnRecord');
  recBtn.style = 'flex:1;background:' + (isRecording ? '#0891b2' : 'rgba(6,182,212,0.15)') + ';color:#22d3ee;border:1px solid rgba(6,182,212,0.3);border-radius:8px;padding:9px;font-weight:800;font-size:10.5px;cursor:pointer;';
  recBtn.onclick = startRecording;
  if(isRecording) {
     recBtn.disabled = true; recBtn.style.opacity = '0.5';
  }

  const stopBtn = document.createElement('button');
  stopBtn.textContent = t('btnStop');
  stopBtn.style = 'flex:1;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:9px;font-weight:800;font-size:10.5px;cursor:pointer;';
  stopBtn.onclick = stopAndClear;

  recBtnRow.appendChild(recBtn);
  recBtnRow.appendChild(stopBtn);
  body.appendChild(recBtnRow);

  // Interactive Sandbox Layout Card
  const boxHdr = document.createElement('div');
  boxHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;margin-top:5px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  boxHdr.textContent = t('lblSandbox');
  body.appendChild(boxHdr);

  const sandbox = document.createElement('div');
  sandbox.style = 'background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 10px rgba(0,0,0,0.1);';
  
  // Sandbox navbar mockup
  const sNav = document.createElement('div');
  sNav.style = 'display:flex;gap:10px;font-size:9px;font-weight:bold;color:#64748b;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;';
  
  const linkHome = document.createElement('span');
  linkHome.style = 'cursor:pointer;color:#38bdf8;';
  linkHome.textContent = t('sandbox.navHome');
  linkHome.onclick = () => appendEvent({ type: 'click', selector: 'nav.main-nav a.home', id: 'nav-home' });
  
  const linkDash = document.createElement('span');
  linkDash.style = 'cursor:pointer;';
  linkDash.textContent = t('sandbox.navDash');
  linkDash.onclick = () => appendEvent({ type: 'click', selector: 'nav.main-nav a.dashboard', id: 'nav-dash' });
  
  sNav.appendChild(linkHome); sNav.appendChild(linkDash);
  sandbox.appendChild(sNav);

  // Sandbox Form
  const sTitle = document.createElement('div');
  sTitle.style = 'font-size:11px;font-weight:900;color:#fff;text-align:center;margin-top:2px;';
  sTitle.textContent = t('sandbox.title');
  sandbox.appendChild(sTitle);

  const sUser = document.createElement('input');
  sUser.type = 'text'; sUser.placeholder = t('sandbox.lblUser');
  sUser.style = 'padding:6px;background:#0f172a;border:1px solid rgba(255,255,255,0.08);color:#fff;font-size:10px;border-radius:4px;width:100%;';
  sUser.onchange = function() {
     appendEvent({ type: 'fill', selector: 'input#username', id: 'input-user', value: this.value });
  };
  sandbox.appendChild(sUser);

  const sPass = document.createElement('input');
  sPass.type = 'password'; sPass.placeholder = t('sandbox.lblPass');
  sPass.style = 'padding:6px;background:#0f172a;border:1px solid rgba(255,255,255,0.08);color:#fff;font-size:10px;border-radius:4px;width:100%;';
  sPass.onchange = function() {
     appendEvent({ type: 'fill', selector: 'input#password', id: 'input-pass', value: '••••••••' });
  };
  sandbox.appendChild(sPass);

  const sBtnRow = document.createElement('div');
  sBtnRow.style = 'display:flex;gap:4px;margin-top:3px;';
  const subBtn = document.createElement('button');
  subBtn.textContent = t('sandbox.btnSubmit');
  subBtn.style = 'flex:1;background:#22d3ee;color:#000;border:none;padding:6px;border-radius:4px;font-size:9.5px;font-weight:800;';
  subBtn.onclick = () => appendEvent({ type: 'click', selector: 'button#btn-login', id: 'btn-login' });
  
  const resetBtn = document.createElement('button');
  resetBtn.textContent = t('sandbox.btnReset');
  resetBtn.style = 'flex:none;background:rgba(255,255,255,0.05);color:#cbd5e1;border:1px solid rgba(255,255,255,0.1);padding:6px;border-radius:4px;font-size:9.5px;font-weight:bold;';
  resetBtn.onclick = () => {
     sUser.value = ""; sPass.value = "";
     appendEvent({ type: 'click', selector: 'button#btn-reset', id: 'btn-reset' });
  };
  sBtnRow.appendChild(subBtn); sBtnRow.appendChild(resetBtn);
  sandbox.appendChild(sBtnRow);
  body.appendChild(sandbox);

  // Framework Selector tabs
  const fwLabel = document.createElement('div');
  fwLabel.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;margin-top:5px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  fwLabel.textContent = t('lblFw');
  body.appendChild(fwLabel);

  const tabRow = document.createElement('div');
  tabRow.style = 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;';
  const frameworks = [['playwright','Playwright'],['cypress','Cypress'],['jest','Jest / RTL']];
  frameworks.forEach(([val, label]) => {
     const tBtn = document.createElement('button');
     tBtn.textContent = label;
     const isSel = val === targetFramework;
     tBtn.style = `padding:6px; border-radius:6px; font-weight:700; font-size:10px; cursor:pointer; font-family:inherit;
       background:${isSel ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.02)'};
       border:1px solid ${isSel ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)'};
       color:${isSel ? '#22d3ee' : '#94a3b8'};`;
     tBtn.onclick = () => {
        targetFramework = val;
        renderE2ETab();
     };
     tabRow.appendChild(tBtn);
  });
  body.appendChild(tabRow);

  // Output test code textarea
  const outHdr = document.createElement('div');
  outHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;';
  outHdr.textContent = t('lblOutput');
  body.appendChild(outHdr);

  const ta = document.createElement('textarea');
  ta.id = 'e2e-output-code';
  ta.readOnly = true;
  ta.style = 'width:100%;height:140px;background:#020617;color:#22d3ee;font-family:"JetBrains Mono",monospace;font-size:10px;padding:10px;border:1px solid rgba(255,255,255,0.06);border-radius:10px;outline:none;resize:vertical;';
  body.appendChild(ta);

  const cpBtn = document.createElement('button');
  cpBtn.textContent = t('btnCopy');
  cpBtn.style = 'background:linear-gradient(90deg,#06b6d4,#6366f1);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:800;font-size:11px;cursor:pointer;box-shadow:0 4px 15px rgba(6,182,212,0.2);';
  cpBtn.onclick = copyCode;
  body.appendChild(cpBtn);

  wrap.appendChild(body);
  parent.appendChild(wrap);

  renderTestCode();
}

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-e2etestgen');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'e2etestgen') renderE2ETab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'e2etestgen') {
      window.activeTab = 'e2etestgen';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-e2etestgen');
      if (btn) btn.classList.add('active');
      renderE2ETab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
