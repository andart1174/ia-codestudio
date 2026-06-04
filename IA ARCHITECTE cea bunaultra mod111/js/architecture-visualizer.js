/**
 * Architecture Visualizer v1.0 — EN/FR
 * Auto-generates an architecture flowchart from HTML code using Mermaid.js
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'Flowchart', title: '📊 Arch Visualizer', sub: 'Auto-generate App Flowchart',
    analyze: '🔍 Analyze Code & Draw', noBody: 'No body tag found to analyze.',
    info: 'Extracts the DOM tree and generates an interactive Mermaid diagram.'
  },
  fr: {
    tab: 'Schéma', title: '📊 Visualiseur Arch', sub: 'Générer le schéma de l\'App',
    analyze: '🔍 Analyser & Dessiner', noBody: 'Aucune balise body trouvée.',
    info: 'Extrait l\'arbre DOM et génère un diagramme Mermaid interactif.'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

function injectMermaid(callback) {
  if (window.mermaid) { callback(); return; }
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
  script.onload = function() {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    callback();
  };
  document.head.appendChild(script);
}

function parseHTMLToMermaid(htmlCode) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlCode, 'text/html');
  var body = doc.body;
  
  if(!body) return null;

  var mermaidCode = 'graph TD\n';
  mermaidCode += '  root[((Body))]\n';
  
  var nodeCounter = 0;

  function traverse(node, parentId) {
    if(node.nodeType !== 1) return; // only element nodes
    
    var tag = node.tagName.toLowerCase();
    // Only map structural tags to avoid massive clutter
    var allowedTags = ['header','nav','main','section','article','aside','footer','form','ul','div'];
    if(allowedTags.indexOf(tag) === -1 && node.id === '') return;

    var id = 'n' + nodeCounter++;
    var label = tag;
    if(node.id) label += '#' + node.id;
    else if(node.className) label += '.' + node.className.split(' ')[0];

    // truncate label
    if(label.length > 20) label = label.substring(0, 20) + '...';

    mermaidCode += '  ' + parentId + ' --> ' + id + '["' + label + '"]\n';
    
    // add some styling
    if(tag === 'header' || tag === 'footer') mermaidCode += '  style ' + id + ' fill:#3b82f6,stroke:#1e3a8a,color:#fff\n';
    else if(tag === 'main') mermaidCode += '  style ' + id + ' fill:#10b981,stroke:#064e3b,color:#fff\n';
    else if(tag === 'section') mermaidCode += '  style ' + id + ' fill:#f59e0b,stroke:#78350f,color:#fff\n';

    var children = Array.from(node.children);
    children.forEach(function(child) {
      traverse(child, id);
    });
  }

  Array.from(body.children).forEach(function(c) { traverse(c, 'root'); });
  return mermaidCode;
}

function generateFlowchart() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  
  var diagramData = parseHTMLToMermaid(code);
  if(!diagramData || diagramData.split('\\n').length < 3) {
    alert(t('noBody')); return;
  }

  var container = document.getElementById('mermaid-container');
  if(!container) return;
  container.innerHTML = '<div class="mermaid" id="m-graph">' + diagramData + '</div>';
  
  injectMermaid(function() {
    window.mermaid.run({
      nodes: [document.getElementById('m-graph')]
    });
  });
}

function renderArchTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(244,63,94,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f43f5e;">' + t('title') + '</div><div style="font-size:10px;color:#64748b;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;';

  var bGen = document.createElement('button');
  bGen.textContent = t('analyze');
  bGen.style = 'width:100%;background:linear-gradient(135deg,#f43f5e,#be123c);border:none;border-radius:6px;padding:12px;color:#fff;font-weight:900;font-size:11px;cursor:pointer;';
  bGen.onclick = generateFlowchart;
  body.appendChild(bGen);

  var info = document.createElement('div');
  info.style = 'font-size:10px;color:#64748b;line-height:1.4;font-style:italic;text-align:center;padding:0 10px;';
  info.textContent = t('info');
  body.appendChild(info);

  var graphBox = document.createElement('div');
  graphBox.id = 'mermaid-container';
  graphBox.style = 'background:#0f172a;border:1px solid rgba(244,63,94,0.3);border-radius:8px;padding:10px;min-height:300px;overflow:auto;display:flex;justify-content:center;';
  body.appendChild(graphBox);

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-arch');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='arch') renderArchTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='arch') {
      window.activeTab = 'arch';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-arch');
      if(btn) btn.classList.add('active');
      renderArchTab(); return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
