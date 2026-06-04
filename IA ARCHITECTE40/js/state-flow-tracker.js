/**
 * 🔗 Visual State Management & Event Flow Tracker v1.0
 * IA Architecte — Code Studio Pro | EN/FR Bilingual
 * Fully decoupled script using decorator pattern
 */
(function() {
'use strict';

const TX = {
  en: {
    tab: 'State Flow',
    title: '🔗 State Flow & Event Tracker',
    sub: 'Real-time state debugger & action dispatcher',
    desc: 'Monitor state changes inside the live preview. Declare a window.state object in your preview code, and this panel will trace every state mutation and allow you to dispatch new states dynamically.',
    btnDispatch: '🚀 Dispatch Action',
    lblStateTree: 'Current State Tree',
    lblMutationLog: 'State Mutation History',
    lblHelperTitle: '📋 Integration Code Helper',
    lblHelperDesc: 'Add this standard state structure to your code in Monaco to enable visual debugging:',
    btnCopyHelper: '📋 Copy State Helper',
    noState: 'Waiting for state initialization... Make sure window.state is declared in your app.',
    key: 'Key',
    value: 'Value (JSON/String)',
    copied: 'Copied!'
  },
  fr: {
    tab: 'Flux État',
    title: '🔗 Débogueur de Flux d\'État & Événements',
    sub: 'Débogueur d\'état en temps réel & dispatch d\'actions',
    desc: 'Surveillez les changements d\'état dans la preview. Déclarez un objet window.state dans votre code, et ce panneau affichera chaque mutation en temps réel, vous permettant d\'injecter des valeurs à la volée.',
    btnDispatch: '🚀 Dispatcher l\'Action',
    lblStateTree: 'Arbre d\'État Actuel',
    lblMutationLog: 'Historique des Mutations',
    lblHelperTitle: '📋 Aide d\'Intégration du Code',
    lblHelperDesc: 'Ajoutez cette structure d\'état standard à votre code dans Monaco pour activer le débogage :',
    btnCopyHelper: '📋 Copier le Helper d\'État',
    noState: 'En attente de l\'initialisation... Assurez-vous que window.state est déclaré.',
    key: 'Clé',
    value: 'Valeur (JSON/Texte)',
    copied: 'Copié !'
  }
};

function gl() { return window.lang || 'en'; }
const t = k => (TX[gl()] || TX.en)[k] || k;

let mutationHistory = [];
let currentState = null;

// Dispatch state key/value form state
let formKey = 'theme';
let formValue = '"dark"';

const stateHelperCode = `// 🔗 Standard State Initialization for IA Debugger
window.state = new Proxy({
  theme: 'light',
  count: 0,
  user: { name: 'Guest', loggedIn: false }
}, {
  set(target, key, value) {
    target[key] = value;
    // Dispatch mutation to IA Studio Parent
    if (window.parent) {
      window.parent.postMessage({
        type: 'ia-state-mutation',
        state: target,
        mutation: { key, value, timestamp: new Date().toLocaleTimeString() }
      }, '*');
    }
    // Custom UI Render Call triggers here
    if (typeof render === 'function') render();
    return true;
  }
});

// Dispatch initial state
if (window.parent) {
  window.parent.postMessage({ type: 'ia-state-mutation', state: window.state }, '*');
}
`;

function dispatchStateAction() {
  const iframe = document.getElementById('preview-iframe');
  if (!iframe || !iframe.contentWindow) return;

  try {
    let parsedVal;
    try {
      parsedVal = JSON.parse(formValue);
    } catch(e) {
      parsedVal = formValue; // Fallback to raw string
    }

    // Inject state directly into the iframe's state object
    iframe.contentWindow.postMessage({
      type: 'ia-state-dispatch',
      key: formKey,
      value: parsedVal
    }, '*');
    
    if (window.showToast) window.showToast('Action dispatched!');
  } catch (e) {
    alert('Failed to dispatch action: ' + e.message);
  }
}

function renderStateFlowTab() {
  const parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0b0a14;color:#e2e8f0;font-family:"Inter",sans-serif;';

  const hdr = document.createElement('div');
  hdr.style = 'padding:14px;border-bottom:1px solid rgba(168,85,247,0.25);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(99,102,241,0.05));';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#c084fc;">' + t('title') + '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  const scrollContainer = document.createElement('div');
  scrollContainer.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';

  const desc = document.createElement('div');
  desc.style = 'font-size:10.5px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  scrollContainer.appendChild(desc);

  // Dispatch Panel
  const dispHdr = document.createElement('div');
  dispHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;margin-top:4px;';
  dispHdr.textContent = 'Action Dispatcher';
  scrollContainer.appendChild(dispHdr);

  const dispForm = document.createElement('div');
  dispForm.style = 'background:#131120;border:1px solid rgba(168,85,247,0.15);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;';
  
  const dispRow = document.createElement('div');
  dispRow.style = 'display:grid;grid-template-columns:1fr 1.5fr;gap:6px;';
  
  const colKey = document.createElement('div');
  colKey.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('key')}</label>`;
  const inpK = document.createElement('input');
  inpK.type = 'text'; inpK.value = formKey;
  inpK.style = 'width:100%;background:#090810;border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  inpK.oninput = function() { formKey = this.value; };
  colKey.appendChild(inpK);

  const colVal = document.createElement('div');
  colVal.innerHTML = `<label style="font-size:8.5px;color:#64748b;font-weight:800;text-transform:uppercase;display:block;margin-bottom:3px;">${t('value')}</label>`;
  const inpV = document.createElement('input');
  inpV.type = 'text'; inpV.value = formValue;
  inpV.style = 'width:100%;background:#090810;border:1px solid rgba(255,255,255,0.1);color:#a78bfa;font-family:monospace;border-radius:6px;padding:6px;font-size:10px;outline:none;';
  inpV.oninput = function() { formValue = this.value; };
  colVal.appendChild(inpV);

  dispRow.appendChild(colKey);
  dispRow.appendChild(colVal);
  dispForm.appendChild(dispRow);

  const dispBtn = document.createElement('button');
  dispBtn.textContent = t('btnDispatch');
  dispBtn.style = 'background:linear-gradient(90deg,#a855f7,#6366f1);color:#fff;border:none;border-radius:6px;padding:8px;font-size:10.5px;font-weight:800;cursor:pointer;';
  dispBtn.onclick = dispatchStateAction;
  dispForm.appendChild(dispBtn);
  scrollContainer.appendChild(dispForm);

  // State tree
  const treeHdr = document.createElement('div');
  treeHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  treeHdr.textContent = t('lblStateTree');
  scrollContainer.appendChild(treeHdr);

  if (!currentState) {
    const noStateCard = document.createElement('div');
    noStateCard.style = 'font-size:10.5px;color:#64748b;text-align:center;padding:15px;background:rgba(255,255,255,0.01);border-radius:8px;border:1px dashed rgba(255,255,255,0.08);';
    noStateCard.textContent = t('noState');
    scrollContainer.appendChild(noStateCard);
  } else {
    const treeCard = document.createElement('pre');
    treeCard.style = 'background:#08070e;border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:10px;font-family:monospace;font-size:9.5px;color:#c084fc;margin:0;overflow-x:auto;white-space:pre-wrap;';
    treeCard.textContent = JSON.stringify(currentState, null, 2);
    scrollContainer.appendChild(treeCard);
  }

  // Mutation History Log
  const logHdr = document.createElement('div');
  logHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  logHdr.textContent = t('lblMutationLog');
  scrollContainer.appendChild(logHdr);

  if (mutationHistory.length === 0) {
    const emptyLog = document.createElement('div');
    emptyLog.style = 'font-size:9.5px;color:#64748b;text-align:center;padding:10px;font-style:italic;';
    emptyLog.textContent = 'No state mutations logged yet.';
    scrollContainer.appendChild(emptyLog);
  } else {
    const logWrap = document.createElement('div');
    logWrap.style = 'display:flex;flex-direction:column;gap:5px;max-height:120px;overflow-y:auto;scrollbar-width:thin;';
    
    // Render last mutations first
    [...mutationHistory].reverse().forEach(m => {
      const logItem = document.createElement('div');
      logItem.style = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.1);border-radius:6px;padding:6px;font-size:9px;font-family:monospace;display:flex;justify-content:space-between;align-items:center;';
      logItem.innerHTML = `<span>[${m.timestamp}] <strong style="color:#c084fc;">${m.key}</strong> = <strong style="color:#818cf8;">${JSON.stringify(m.value)}</strong></span>`;
      logWrap.appendChild(logItem);
    });
    scrollContainer.appendChild(logWrap);
  }

  // Helper Integrator Card
  const helpHdr = document.createElement('div');
  helpHdr.style = 'font-size:9.5px;font-weight:800;color:#64748b;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;';
  helpHdr.textContent = t('lblHelperTitle');
  scrollContainer.appendChild(helpHdr);

  const helpCard = document.createElement('div');
  helpCard.style = 'background:#131120;border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
  
  const helpDesc = document.createElement('div');
  helpDesc.style = 'font-size:9.5px;color:#94a3b8;line-height:1.4;';
  helpDesc.textContent = t('lblHelperDesc');
  helpCard.appendChild(helpDesc);

  const helpCode = document.createElement('textarea');
  helpCode.rows = 8; helpCode.readOnly = true; helpCode.value = stateHelperCode;
  helpCode.style = 'width:100%;background:#090810;border:1px solid rgba(255,255,255,0.05);color:#c084fc;font-family:monospace;font-size:9px;border-radius:6px;padding:6px;outline:none;resize:vertical;';
  helpCard.appendChild(helpCode);

  const cpBtn = document.createElement('button');
  cpBtn.textContent = t('btnCopyHelper');
  cpBtn.style = 'background:rgba(168,85,247,0.1);color:#c084fc;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:8px;font-size:9.5px;font-weight:800;cursor:pointer;';
  cpBtn.onclick = function() {
    navigator.clipboard.writeText(helpCode.value).then(() => {
      if (window.showToast) window.showToast(t('copied'));
    });
  };
  helpCard.appendChild(cpBtn);
  scrollContainer.appendChild(helpCard);

  wrap.appendChild(scrollContainer);
  parent.appendChild(wrap);
}

// Inject state helper and dispatch receiver scripts
function injectStateTracker(htmlCode) {
  const scriptTag = `
  <!-- Visual State Tracker & Dispatch Receiver -->
  <script id="ia-state-tracker-script">
    (function() {
      // Receive dispatch requests from parent editor
      window.addEventListener('message', function(e) {
        if (!e.data || e.data.type !== 'ia-state-dispatch') return;
        const { key, value } = e.data;
        if (window.state) {
          window.state[key] = value;
          console.log("🔗 [State Flow] Key updated via Dispatcher: " + key + " =", value);
        } else {
          console.warn("🔗 [State Flow] window.state object not found inside preview! Dispatch failed.");
        }
      });
    })();
  <\/script>
  `;

  if (htmlCode.includes('</head>')) {
    return htmlCode.replace('</head>', scriptTag + '</head>');
  } else if (htmlCode.includes('<head>')) {
    return htmlCode.replace('<head>', '<head>' + scriptTag);
  } else {
    return scriptTag + htmlCode;
  }
}

// Listen to incoming mutations from the preview iframe
window.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'ia-state-mutation') return;
  
  if (e.data.state) {
    currentState = e.data.state;
  }
  if (e.data.mutation) {
    mutationHistory.push(e.data.mutation);
    if (mutationHistory.length > 30) {
      mutationHistory.shift();
    }
  }

  if (window.activeTab === 'stateflowtracker') {
    renderStateFlowTab();
  }
});

// Hook tab triggers
document.addEventListener('DOMContentLoaded', function() {
  const oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    const el = document.getElementById('lbl-tab-stateflowtracker');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'stateflowtracker') renderStateFlowTab();
  };

  const oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'stateflowtracker') {
      window.activeTab = 'stateflowtracker';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-stateflowtracker');
      if (btn) btn.classList.add('active');
      renderStateFlowTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };

  // Decorate runPreview to inject the dispatcher receiver script
  const originalRunPreview = window.runPreview;
  window.runPreview = function() {
    const ed = window.editor;
    if (ed && typeof originalRunPreview === 'function') {
      const originalGetValue = ed.getValue;
      ed.getValue = function() {
        let val = originalGetValue.apply(ed);
        val = injectStateTracker(val);
        return val;
      };
      try {
        originalRunPreview();
      } finally {
        ed.getValue = originalGetValue;
      }
    } else {
      if (typeof originalRunPreview === 'function') {
        originalRunPreview();
      }
    }
  };
});
})();
