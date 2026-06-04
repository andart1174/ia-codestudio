(function() {
'use strict';

var activeFilter = 'all';

function gl(){return window.lang||'en';}

// ─── Widget definitions (simple, no nested quotes) ──────────────────────
var WIDGETS = [
  {
    id:'countdown', icon:'⏱️', en:'Countdown Timer', fr:'Compte à Rebours', cat:'utility',
    code: function() {
      var d = new Date(); d.setDate(d.getDate()+7);
      var ds = d.toISOString().split('T')[0];
      var parts = [];
      parts.push('<div id="wcd" style="background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #3b82f6;border-radius:16px;padding:30px;text-align:center;font-family:sans-serif;max-width:400px;margin:20px auto;">');
      parts.push('<div style="font-size:13px;color:#64748b;margin-bottom:15px;letter-spacing:2px;">COUNTDOWN</div>');
      parts.push('<div id="wcd-d" style="display:flex;justify-content:center;gap:20px;"></div>');
      parts.push('<div style="font-size:11px;color:#64748b;margin-top:15px;">Target: ' + ds + '</div>');
      parts.push('</div>');
      parts.push('<script>');
      parts.push('(function(){');
      parts.push('var t=new Date("' + ds + 'T00:00:00");');
      parts.push('function upd(){var n=new Date(),d=t-n;');
      parts.push('if(d<0){document.getElementById("wcd-d").innerHTML="<span style=color:#10b981;font-size:20px>Time up!</span>";return;}');
      parts.push('var dd=Math.floor(d/86400000),h=Math.floor(d%86400000/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);');
      parts.push('document.getElementById("wcd-d").innerHTML=[[dd,"Days"],[h,"Hrs"],[m,"Min"],[s,"Sec"]].map(function(x){');
      parts.push('return "<div><div style=font-size:32px;font-weight:900;color:#60a5fa>"+String(x[0]).padStart(2,"0")+"</div><div style=font-size:10px;color:#64748b>"+x[1]+"</div></div>";}).join("");');
      parts.push('}upd();setInterval(upd,1000);})();');
      parts.push('<\/script>');
      return parts.join('\n');
    }
  },
  {
    id:'weather', icon:'🌤️', en:'Weather Card', fr:'Carte Météo', cat:'data',
    code: function() {
      var p = [];
      p.push('<div style="background:linear-gradient(135deg,#0ea5e9,#0284c7);border-radius:16px;padding:25px;max-width:320px;margin:20px auto;font-family:sans-serif;color:#fff;box-shadow:0 10px 30px rgba(14,165,233,0.3);">');
      p.push('<div style="display:flex;justify-content:space-between;align-items:center;">');
      p.push('<div><div style="font-size:13px;opacity:0.8;">📍 Paris</div>');
      p.push('<div style="font-size:48px;font-weight:900;margin:8px 0;">22°C</div>');
      p.push('<div style="font-size:14px;opacity:0.9;">Partly Cloudy</div></div>');
      p.push('<div style="font-size:60px;">⛅</div></div>');
      p.push('<div style="display:flex;gap:15px;margin-top:15px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.2);">');
      p.push('<div style="text-align:center;"><div style="font-size:11px;opacity:0.7;">Humidity</div><div style="font-weight:bold;">68%</div></div>');
      p.push('<div style="text-align:center;"><div style="font-size:11px;opacity:0.7;">Wind</div><div style="font-weight:bold;">14 km/h</div></div>');
      p.push('<div style="text-align:center;"><div style="font-size:11px;opacity:0.7;">UV</div><div style="font-weight:bold;">5</div></div>');
      p.push('</div></div>');
      return p.join('\n');
    }
  },
  {
    id:'calculator', icon:'🧮', en:'Calculator', fr:'Calculatrice', cat:'utility',
    code: function() {
      var p = [];
      p.push('<div id="wcalc" style="background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px;max-width:260px;margin:20px auto;font-family:monospace;">');
      p.push('<div id="wcalc-s" style="background:#0f172a;color:#60a5fa;font-size:22px;font-weight:bold;padding:12px;border-radius:8px;text-align:right;margin-bottom:10px;min-height:48px;">0</div>');
      p.push('<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">');
      var btns = [
        ['C','#ef4444'],['(','#334155'],[')','#334155'],['/','#f59e0b'],
        ['7','#1e293b'],['8','#1e293b'],['9','#1e293b'],['*','#f59e0b'],
        ['4','#1e293b'],['5','#1e293b'],['6','#1e293b'],['-','#f59e0b'],
        ['1','#1e293b'],['2','#1e293b'],['3','#1e293b'],['+','#f59e0b']
      ];
      btns.forEach(function(b) {
        p.push('<button onclick="wci(\'' + b[0] + '\')" style="background:' + b[1] + ';color:#fff;border:none;padding:10px;border-radius:6px;font-size:14px;cursor:pointer;">' + (b[0]==='*'?'×':b[0]==='/'?'÷':b[0]) + '</button>');
      });
      p.push('<button onclick="wci(\'0\')" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:10px;border-radius:6px;font-size:14px;cursor:pointer;grid-column:span 2;">0</button>');
      p.push('<button onclick="wci(\'.\')" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:10px;border-radius:6px;font-size:14px;cursor:pointer;">.</button>');
      p.push('<button onclick="wci(\'=\')" style="background:#3b82f6;color:#fff;border:none;padding:10px;border-radius:6px;font-size:14px;cursor:pointer;font-weight:bold;">=</button>');
      p.push('</div></div>');
      p.push('<script>');
      p.push('var wcx="";');
      p.push('function wci(k){var s=document.getElementById("wcalc-s");');
      p.push('if(k==="C"){wcx="";s.textContent="0";return;}');
      p.push('if(k==="="){try{wcx=String(eval(wcx));s.textContent=wcx;}catch(e){s.textContent="Err";wcx="";}return;}');
      p.push('wcx+=k;s.textContent=wcx;}');
      p.push('<\/script>');
      return p.join('\n');
    }
  },
  {
    id:'cookie', icon:'🍪', en:'Cookie Banner GDPR', fr:'Bannière Cookies', cat:'legal',
    code: function() {
      var isFr = gl()==='fr';
      var p = [];
      p.push('<div id="wck" style="position:fixed;bottom:0;left:0;right:0;background:#1e293b;border-top:1px solid #334155;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:9999;font-family:sans-serif;flex-wrap:wrap;">');
      p.push('<div><div style="font-size:13px;font-weight:bold;color:#e2e8f0;">🍪 ' + (isFr?'Nous utilisons des cookies':'We use cookies') + '</div>');
      p.push('<div style="font-size:11px;color:#94a3b8;">' + (isFr?'Ce site utilise des cookies.':'This site uses cookies to enhance your experience.') + '</div></div>');
      p.push('<div style="display:flex;gap:8px;">');
      p.push('<button onclick="document.getElementById(\'wck\').remove()" style="background:none;border:1px solid #475569;color:#94a3b8;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:11px;">' + (isFr?'Refuser':'Decline') + '</button>');
      p.push('<button onclick="localStorage.setItem(\'ck\',1);document.getElementById(\'wck\').remove()" style="background:#3b82f6;color:#fff;border:none;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:bold;">' + (isFr?'Accepter':'Accept') + '</button>');
      p.push('</div></div>');
      p.push('<script>if(localStorage.getItem("ck"))document.getElementById("wck").remove();<\/script>');
      return p.join('\n');
    }
  },
  {
    id:'progress', icon:'📊', en:'Progress Bars', fr:'Barres de Progression', cat:'ui',
    code: function() {
      var bars = [['Design',88,'#8b5cf6'],['Development',95,'#3b82f6'],['Marketing',72,'#10b981'],['Strategy',65,'#f59e0b']];
      var p = [];
      p.push('<div style="background:#1e293b;border-radius:16px;padding:28px;max-width:400px;margin:20px auto;font-family:sans-serif;">');
      p.push('<h3 style="color:#e2e8f0;margin:0 0 18px;font-size:15px;">Skills</h3>');
      bars.forEach(function(b) {
        p.push('<div style="margin-bottom:14px;">');
        p.push('<div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:5px;"><span>' + b[0] + '</span><span>' + b[1] + '%</span></div>');
        p.push('<div style="background:#0f172a;border-radius:50px;height:8px;overflow:hidden;">');
        p.push('<div class="wpb" data-w="' + b[1] + '" style="width:0%;height:100%;background:' + b[2] + ';border-radius:50px;transition:width 1.5s ease;"></div>');
        p.push('</div></div>');
      });
      p.push('</div>');
      p.push('<script>setTimeout(function(){document.querySelectorAll(".wpb").forEach(function(b){b.style.width=b.dataset.w+"%";});},200);<\/script>');
      return p.join('\n');
    }
  },
  {
    id:'testimonial', icon:'💬', en:'Testimonial Carousel', fr:'Carousel Témoignages', cat:'marketing',
    code: function() {
      var isFr = gl()==='fr';
      var items = isFr
        ? [['Marie D.','CEO','Incroyable ! Notre productivité a augmenté de 300%.'],['Pierre L.','Designer','Interface magnifique et puissante.'],['Sophie M.','Dev','Le meilleur studio de code.']]
        : [['Alex M.','CEO','Amazing! Our productivity increased by 300%.'],['Sarah J.','Designer','Beautiful interface with powerful features.'],['Mike R.','Dev','The best code studio ever.']];
      var p = [];
      p.push('<div id="wtst" style="background:#1e293b;border-radius:16px;padding:28px;max-width:460px;margin:20px auto;font-family:sans-serif;text-align:center;">');
      p.push('<div id="wtst-b"></div>');
      p.push('<div id="wtst-d" style="display:flex;justify-content:center;gap:7px;margin-top:18px;"></div>');
      p.push('</div>');
      p.push('<script>');
      p.push('var witems=' + JSON.stringify(items) + ',wi=0;');
      p.push('function wtr(){var it=witems[wi];');
      p.push('document.getElementById("wtst-b").innerHTML=' +
        '"<div style=font-size:13px;color:#94a3b8;line-height:1.7;margin-bottom:18px;font-style:italic>\\u201c"+it[2]+"\\u201d</div>' +
        '<div style=font-weight:bold;color:#e2e8f0>"+it[0]+"</div>' +
        '<div style=font-size:11px;color:#64748b>"+it[1]+"</div>";');
      p.push('var d=document.getElementById("wtst-d");d.innerHTML="";');
      p.push('witems.forEach(function(_,i){var x=document.createElement("div");x.style="width:8px;height:8px;border-radius:50%;background:"+(i===wi?"#3b82f6":"#334155")+";cursor:pointer;";x.onclick=function(){wi=i;wtr();};d.appendChild(x);});}');
      p.push('wtr();setInterval(function(){wi=(wi+1)%witems.length;wtr();},4000);');
      p.push('<\/script>');
      return p.join('\n');
    }
  },
  {
    id:'newsletter', icon:'📧', en:'Newsletter Signup', fr:'Inscription Newsletter', cat:'marketing',
    code: function() {
      var isFr = gl()==='fr';
      var p = [];
      p.push('<div style="background:linear-gradient(135deg,#1e1035,#1e293b);border:1px solid #8b5cf640;border-radius:16px;padding:36px;text-align:center;max-width:460px;margin:20px auto;font-family:sans-serif;">');
      p.push('<div style="font-size:30px;margin-bottom:10px;">📧</div>');
      p.push('<h2 style="color:#e2e8f0;margin:0 0 8px;font-size:20px;">' + (isFr?'Restez Informé':'Stay in the Loop') + '</h2>');
      p.push('<p style="color:#94a3b8;font-size:12px;margin:0 0 22px;">' + (isFr?'Recevez les dernières nouvelles.':'Get the latest updates in your inbox.') + '</p>');
      p.push('<form onsubmit="event.preventDefault();this.innerHTML=\'<div style=color:#10b981;font-weight:bold>✅ ' + (isFr?'Merci !':'Subscribed!') + '</div>\';" style="display:flex;gap:8px;max-width:340px;margin:0 auto;">');
      p.push('<input type="email" placeholder="' + (isFr?'votre@email.com':'your@email.com') + '" required style="flex:1;background:#0f172a;color:#e2e8f0;border:1px solid #334155;padding:11px 14px;border-radius:8px;font-size:12px;">');
      p.push('<button type="submit" style="background:#8b5cf6;color:#fff;border:none;padding:11px 18px;border-radius:8px;font-weight:bold;cursor:pointer;">' + (isFr?'S\'inscrire':'Subscribe') + '</button>');
      p.push('</form></div>');
      return p.join('\n');
    }
  },
  {
    id:'chat', icon:'💬', en:'Chat Bubble', fr:'Bulle de Chat', cat:'support',
    code: function() {
      var isFr = gl()==='fr';
      var p = [];
      p.push('<div id="wchat-btn" onclick="var b=document.getElementById(\'wchat-box\');b.style.display=b.style.display===\'none\'?\'flex\':\'none\';" style="position:fixed;bottom:24px;left:24px;width:54px;height:54px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;box-shadow:0 6px 20px rgba(16,185,129,0.4);z-index:9998;">💬</div>');
      p.push('<div id="wchat-box" style="display:none;position:fixed;bottom:88px;left:24px;width:270px;background:#1e293b;border:1px solid #334155;border-radius:12px;flex-direction:column;z-index:9999;box-shadow:0 12px 30px rgba(0,0,0,0.5);overflow:hidden;">');
      p.push('<div style="background:#10b981;padding:11px 14px;color:#fff;font-size:13px;font-weight:bold;">🤝 ' + (isFr?'Support Live':'Live Support') + '</div>');
      p.push('<div id="wchat-msgs" style="padding:12px;font-size:12px;color:#94a3b8;min-height:60px;">👋 ' + (isFr?'Bonjour ! Comment puis-je aider ?':'Hello! How can I help?') + '</div>');
      p.push('<form onsubmit="event.preventDefault();var inp=this.querySelector(\'input\'),msg=inp.value.trim();if(!msg)return;var d=document.createElement(\'div\');d.style=\'background:#3b82f6;color:#fff;border-radius:8px;padding:6px 10px;font-size:11px;margin-top:6px;text-align:right\';d.textContent=msg;document.getElementById(\'wchat-msgs\').appendChild(d);inp.value=\'\';" style="display:flex;gap:6px;padding:8px 12px;border-top:1px solid #334155;">');
      p.push('<input placeholder="' + (isFr?'Message...':'Message...') + '" style="flex:1;background:#0f172a;color:#e2e8f0;border:1px solid #334155;padding:7px;border-radius:6px;font-size:11px;">');
      p.push('<button type="submit" style="background:#3b82f6;color:#fff;border:none;padding:7px 11px;border-radius:6px;cursor:pointer;">→</button>');
      p.push('</form></div>');
      return p.join('\n');
    }
  },
  {
    id:'backtotop', icon:'⬆️', en:'Back to Top', fr:'Retour en Haut', cat:'navigation',
    code: function() {
      var p = [];
      p.push('<button id="wbtt" onclick="window.scrollTo({top:0,behavior:\'smooth\'})" style="position:fixed;bottom:90px;right:24px;width:42px;height:42px;background:#3b82f6;color:#fff;border:none;border-radius:50%;font-size:18px;cursor:pointer;box-shadow:0 4px 14px rgba(59,130,246,0.4);z-index:9997;display:none;align-items:center;justify-content:center;transition:0.3s;">↑</button>');
      p.push('<script>window.addEventListener("scroll",function(){var b=document.getElementById("wbtt");if(b)b.style.display=window.scrollY>300?"flex":"none";});<\/script>');
      return p.join('\n');
    }
  }
];

function renderWidgetTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var isFr = gl() === 'fr';

  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;';

  // Header
  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(16,185,129,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#34d399;">&#127914; ' + (isFr?'Usine à Widgets':'Widget Drop Factory') + '</div>' +
    '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + (isFr?'Injectez des widgets en un clic':'Drop pre-built widgets into your code') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;';

  // Search box
  var searchInp = document.createElement('input');
  searchInp.placeholder = isFr ? 'Rechercher...' : 'Search widgets...';
  searchInp.style = 'width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:8px 10px;border-radius:8px;font-size:11px;box-sizing:border-box;outline:none;';
  body.appendChild(searchInp);

  // Category filter buttons
  var cats = ['all','utility','ui','marketing','data','legal','support','navigation'];
  var filterRow = document.createElement('div');
  filterRow.style = 'display:flex;flex-wrap:wrap;gap:4px;';
  cats.forEach(function(cat) {
    var btn = document.createElement('button');
    btn.textContent = cat;
    var isActive = activeFilter === cat;
    btn.style = 'font-size:9px;padding:3px 8px;border-radius:20px;cursor:pointer;font-weight:bold;' +
      (isActive ? 'background:#10b981;color:#000;border:1px solid #10b981;' : 'background:#1e293b;color:#64748b;border:1px solid #334155;');
    btn.onclick = function() { activeFilter = cat; renderWidgetTab(); };
    filterRow.appendChild(btn);
  });
  body.appendChild(filterRow);

  // Widget cards container - added to body FIRST
  var listEl = document.createElement('div');
  listEl.style = 'display:flex;flex-direction:column;gap:6px;';
  body.appendChild(listEl);

  // Fill cards immediately (listEl is already in body)
  function fillList(query) {
    listEl.innerHTML = '';
    var filtered = WIDGETS.filter(function(w) {
      if (activeFilter !== 'all' && w.cat !== activeFilter) return false;
      if (query) {
        var name = isFr ? w.fr : w.en;
        return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;color:#475569;font-size:11px;padding:20px;">' + (isFr?'Aucun résultat':'No widgets found') + '</div>';
      return;
    }

    filtered.forEach(function(w) {
      var card = document.createElement('div');
      card.style = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 12px;display:flex;align-items:center;gap:10px;';

      var ic = document.createElement('div');
      ic.style = 'font-size:20px;flex-shrink:0;';
      ic.textContent = w.icon;

      var info = document.createElement('div');
      info.style = 'flex:1;min-width:0;';
      var nameEl = document.createElement('div');
      nameEl.style = 'font-size:11px;font-weight:bold;color:#e2e8f0;';
      nameEl.textContent = isFr ? w.fr : w.en;
      var catEl = document.createElement('div');
      catEl.style = 'font-size:9px;color:#34d399;background:rgba(16,185,129,0.12);display:inline-block;padding:1px 6px;border-radius:4px;margin-top:2px;';
      catEl.textContent = w.cat;
      info.appendChild(nameEl);
      info.appendChild(catEl);

      var btn = document.createElement('button');
      btn.textContent = '⬇️';
      btn.title = isFr ? 'Injecter' : 'Inject Widget';
      btn.style = 'background:#10b981;color:#fff;border:none;width:32px;height:32px;border-radius:6px;cursor:pointer;font-size:14px;flex-shrink:0;';
      btn.onclick = (function(widget) {
        return function() {
          if (!window.editor) { if(window.showToast) window.showToast('Editor not ready'); return; }
          var code = window.editor.getValue();
          var wc = '\n<!-- Widget: ' + (isFr?widget.fr:widget.en) + ' -->\n' + widget.code() + '\n';
          if (code.indexOf('</body>') !== -1) {
            code = code.replace('</body>', wc + '</body>');
          } else if (code.indexOf('</html>') !== -1) {
            code = code.replace('</html>', wc + '</html>');
          } else {
            code = code + wc;
          }
          window.editor.setValue(code);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast((isFr?'Widget injecté: ':'Widget injected: ') + (isFr?widget.fr:widget.en));
          if (window.unlockAchievement) window.unlockAchievement('widget_drop');
        };
      })(w);

      card.appendChild(ic);
      card.appendChild(info);
      card.appendChild(btn);
      listEl.appendChild(card);
    });
  }

  fillList('');
  searchInp.oninput = function() { fillList(this.value); };

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-widgets');
    if (el) el.textContent = gl()==='fr' ? 'Widgets' : 'Widgets';
    if (window.activeTab === 'widgets') renderWidgetTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'widgets') {
      window.activeTab = 'widgets';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var el = document.getElementById('tab-widgets');
      if (el) el.classList.add('active');
      renderWidgetTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
