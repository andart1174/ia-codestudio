(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to inject their tabs if any
    setTimeout(function() {
      var leftTabs = document.getElementById('left-tabs');
      if (!leftTabs) return;
      var buttons = Array.from(leftTabs.querySelectorAll('.ltab'));
      if (buttons.length === 0) return;

      var catMap = {
        "🚀 NEXUS FORGE": ["nexusforge"],
        "⚛️ QUANTUM LAB": ["quantumlab"],
        "🤖 AI STUDIO": ["elite", "appspro", "iaultra", "iapro", "aichat", "promo", "wizard", "onemin", "ailab", "prompt", "personaswarm", "neuro", "aipair", "aimentor", "codereview", "codepredict", "autodocs", "logicforge", "codedna", "bugfix", "codeexplain", "bizval", "genius", "vision", "voice", "nodelogic", "guide", "ai", "smartfaq", "predictor", "aichatbot", "aichatbotrag"],
        "🔮 FUTURE TECH LAB": ["extgen", "scraperbot", "gameengine", "cloudarch", "quantum", "iot", "webxr", "zk", "webrtc", "geomap", "aiswarm", "biotech", "hud"],
        "🚀 FUTURE TECH LAB PRO": ["bcireader", "digitaltwin", "qkdcrypto", "noneuclidean", "dnastorage", "neuromorphic", "satmesh", "quantcircuit", "fusionplasma", "crisprsplicer", "dysonsphere", "microbotswarm", "antimattertrap", "acousticcymatics"],
        "🎮 GAME DEV STUDIO": ["gamedevstudio", "gamedevstudiopro", "gamedevstudioultimate", "gamedevstudioultra", "particleemitter", "proceduralmap", "rigidbodyphysics", "dialoguetree", "raycastingfov", "pathfindingai", "inversekinematics", "parallaxengine", "spriteanimator", "spatialaudio", "voxelextruder"],
        "✨ VIZUAL EFECTS": ["scrollreveal", "kinetictypo", "liquidgooey", "cursorspot", "webgldistort", "svgmorph", "xrayvision", "terminalos", "pixelforge", "glassbreaker", "vhsrewind", "zerog", "vortexui", "cyberglitch", "chaosshake", "neonpulse", "chaos", "microphysics", "thanos", "holographic", "gravity", "microfx", "scrollfx", "motionfx", "timeline", "glassmorphism", "cyberneon", "bglab", "loaderscreen", "uishuffler", "meshgrad", "textanim", "flipcard"],
        "🖌️ DESIGN & UI": ["stylelab", "themepicker", "colorharmony", "colors", "gradientforge", "gradient", "typography", "fontexplorer", "cssarchitect", "cssshortcuts", "icongen", "svgstudio", "svgshaper", "svgdraw", "draw3d", "dtstudio", "tailwind", "herobuilder", "themebreeder", "uidreamer"],
        "📐 LAYOUT & FLOW": ["layout", "grid", "gridbuilder", "uiblocks", "uiforge", "breakpoints", "respmatrix", "appassembler", "legobuilder", "userflow", "spacingaudit", "styleclone", "guidedbuilder", "arch", "journey"],
        "🛠️ DEV TOOLS": ["regexforge", "cronstudio", "regex", "tools", "tpro", "snippets", "npmexplorer", "githubsync", "profiler", "jwt", "fwconvert", "apitester", "errordoctor", "refactor", "commit", "hooks", "devsim", "forge", "stack", "mock", "pm", "tm", "settings", "apimock"],
        "🛡️ CYBERSECURITY & ETHICAL HACKING": ["cyberstudio"],
        "📱 APP & SAAS FORGE": ["saasforge"],
        "🤖 AI & LLM INTERFACE BUILDER": ["aillmstudio"],
        "🌍 WEB3 & BLOCKCHAIN STUDIO": ["web3dapp", "web3studio"],
        "🐳 DEVOPS STUDIO": ["devopsstudio", "spacedevops"],
        "📡 API DESIGN STUDIO": ["apidesign"],
        "🏗️ WEB ARCHITECT": ["webarchitect", "webcontainers", "nativecompiler"],
        "🎯 ALGORITHM VISUALIZER": ["algoviz"],
        "🌎 EXTENSION FORGE": ["extforge"],
        "🎨 CREATIVE CODE STUDIO": ["creativecode"],
        "📊 DATA SCIENCE STUDIO": ["datasciencestudio"],
        "📱 MOBILE UI KIT": ["mobileuikit", "appstoremockup"],
        "📢 ADVERTISING STUDIO": ["productad", "adbannerpro", "ythumb", "socialproof", "podcast", "licarousel", "webticket", "rollup", "billboard", "fencebanner", "floatingprod", "lightbox", "pedestal", "printflyer", "doohsim", "iabbanner", "promobanner", "videoad", "storiesad", "gamifiedad", "smartpopup"],
        "📈 MARKETING & BIZ": ["devscore", "pricing", "invoice", "ratecalc", "monetizecalc", "privacy", "cookies", "paywall", "socialshowcase", "lpscore", "appstore", "fintech", "pitchdeck", "brandkit", "funnel", "outreach", "roicalc", "competitor", "testimonial", "contentcal", "contract", "proposal", "analytics", "pricingpage", "newsletter", "autobio", "digicard", "emailsig"],
        "📊 DATA & NET": ["dataforge", "webhooklab", "data", "mockdata", "dbarch", "jsonviz", "sqlbuilder", "apihub", "headers", "web3ui", "sites", "sitemap", "hosting", "seo", "oauthflow"],
        "🎬 MEDIA & AUDIO": ["cssanim", "cinematic", "timelapse", "animforge", "audioui", "soundfx", "sonic", "voicereader", "media", "transcode", "assets", "assetvault", "anim", "record", "sonicsynth"],
        "🧪 TEST & AUDIT": ["bundleradar", "audit", "launchcheck", "codestats", "deadcss", "cssspec", "heatmap", "abtest", "eco", "codeaudit", "security", "password", "a11y", "speedbudget", "neuroux"],
        "🔬 NEXT-GEN LABS": ["agisentience", "deepspace", "hyper4d", "spacenet", "timewormhole", "quantumdebugger", "tesseract", "codeevolution", "devbiometrics"],
        "💫 PREMIUM STUDIOS": ["assetoptimizer", "codeprotector", "indexeddbmgr", "hardwareapi", "webrtcstreamer", "svgmorphing", "meshgradient", "audiosynth", "neuralnet", "holographiccard"],
        "⚙️ ADVANCED DEVELOPS STUDIO": ["codesonar", "projectassembler", "dbcrudapi", "prodoptimizer", "e2etestgen", "apiclientmock", "tailwindtranspile", "a11yautofix", "npmcdnexplorer", "stateflowtracker", "webvitalsperf", "securityexploit"],
        "⚗️ GENIUS LAB": ["musictosite","emotionadaptive","appdnasplicer","uxpredictor","physicscss","codetutorialgame","geoadaptive","dreamui","spatialui"],
        "📦 EXTRAS": ["achievements", "widgets", "comments", "screenshot", "timetravel", "skeleton", "bionic", "games", "templates", "moodboard", "earthmap", "appstory", "challenges", "emailstudio", "pwagen", "pomodoro", "s2c", "carbon", "fluidtype", "404gen", "units", "loader", "cursor", "haptic", "gamification", "i18n", "present", "tooltipbuilder", "colorblind", "exporthub", "dataviz", "mobileos", "social", "pwa", "collab", "3d", "chartarch", "webxr"],
      };

      var grouped = {};
      Object.keys(catMap).forEach(function(k) { grouped[k] = []; });
      grouped["📁 OTHER"] = [];

      // Sort existing buttons into categories
      buttons.forEach(function(btn) {
        var tabId = btn.getAttribute('data-tab');
        var found = false;
        for (var cat in catMap) {
          if (catMap[cat].indexOf(tabId) !== -1) {
            grouped[cat].push(btn);
            found = true;
            break;
          }
        }
        if (!found) grouped["📁 OTHER"].push(btn);
      });

      // Clear the container
      leftTabs.innerHTML = '';
      
      // Inject CSS for accordion
      var style = document.createElement('style');
      style.innerHTML = `
        .cat-folder { 
          width: 100%; padding: 12px 14px; 
          background: linear-gradient(135deg, #0f172a, #1e293b); 
          color: #e2e8f0; border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 10px; text-align: left; font-weight: 900; 
          cursor: pointer; margin-bottom: 6px; display: flex; 
          justify-content: space-between; align-items: center; 
          font-size: 11px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); 
        }
        .cat-folder:hover { 
          background: linear-gradient(135deg, #1e293b, #334155); 
          color: #fff; border-color: rgba(255,255,255,0.1); 
          transform: translateY(-1px);
        }
        .cat-content { 
          display: none; flex-direction: column; gap: 6px; 
          padding: 6px 0 14px 10px; border-left: 2px solid rgba(255,255,255,0.05); 
          margin-left: 10px; margin-bottom: 8px; 
        }
        .cat-content.open { display: flex; animation: slideDown 0.3s ease-out; }
        .cat-folder.active { 
          background: linear-gradient(135deg, #3b82f6, #6366f1); 
          color: #fff; border-color: #60a5fa; 
          box-shadow: 0 0 15px rgba(99,102,241,0.4); 
        }
        .cat-arrow { font-size: 9px; color: #94a3b8; transition: transform 0.3s; }
        .cat-folder.active .cat-arrow { color: #fff; transform: rotate(180deg); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

        /* Premium custom items base style overrides (idle) */
        .cat-folder[data-cat="🚀 NEXUS FORGE"] {
          animation: nxPulse 3s ease-in-out infinite;
        }

        /* Premium single active states */
        .cat-folder[data-cat="🚀 NEXUS FORGE"].active { 
          background: linear-gradient(90deg, rgba(244,114,182,0.3), rgba(167,139,250,0.3), rgba(56,189,248,0.2)) !important;
          border-color: #f472b6 !important;
          box-shadow: 0 0 18px rgba(244,114,182,0.45) !important;
        }
        .cat-folder[data-cat="🚀 NEXUS FORGE"].active span {
          animation: nxGlow 2s ease-in-out infinite;
          color: #f9a8d4;
          text-shadow: 0 0 10px rgba(244,114,182,0.8);
          font-weight: 900;
        }
        .cat-folder[data-cat="⚛️ QUANTUM LAB"].active { 
          background: linear-gradient(90deg, rgba(129,140,248,0.35), rgba(52,211,153,0.3), rgba(244,114,182,0.25)) !important;
          border-color: #818cf8 !important;
          box-shadow: 0 0 18px rgba(129,140,248,0.45) !important;
        }
        .cat-folder[data-cat="⚛️ QUANTUM LAB"].active span {
          color: #a5b4fc;
          text-shadow: 0 0 10px rgba(129,140,248,0.8);
          font-weight: 900;
        }
      `;
      document.head.appendChild(style);

      // Create Accordion Elements
      Object.keys(grouped).forEach(function(cat) {
        if (grouped[cat].length === 0) return;
        
        var isSingle = grouped[cat].length === 1;
        var folder = document.createElement('button');
        folder.className = 'cat-folder';
        folder.setAttribute('data-cat', cat);
        
        var content = document.createElement('div');
        content.className = 'cat-content';
        content.setAttribute('data-cat-content', cat);
        
        if (isSingle) {
          folder.innerHTML = '<span>' + cat + '</span>';
          var singleBtn = grouped[cat][0];
          
          // Copy styles and attribute animations if applicable
          var baseStyle = singleBtn.getAttribute('style') || '';
          if (baseStyle) {
            folder.setAttribute('style', baseStyle);
          }
          // Reset basic folder layout properties just in case styles override them
          folder.style.width = '100%';
          folder.style.display = 'flex';
          folder.style.justifyContent = 'space-between';
          folder.style.alignItems = 'center';
          folder.style.padding = '12px 14px';
          folder.style.borderRadius = '10px';
          folder.style.marginBottom = '6px';
          folder.style.fontSize = '11px';
          folder.style.cursor = 'pointer';
          folder.style.textAlign = 'left';
          
          content.style.display = 'none';
          content.appendChild(singleBtn);
          
          folder.onclick = function() {
            // Close all others
            document.querySelectorAll('.cat-content').forEach(function(c) {
              if (c !== content) c.classList.remove('open');
            });
            document.querySelectorAll('.cat-folder').forEach(function(f) {
              if (f !== folder) f.classList.remove('active');
            });
            folder.classList.add('active');
            singleBtn.click();
          };
          
          singleBtn.setAttribute('data-parent-folder-cat', cat);
        } else {
          folder.innerHTML = '<span>' + cat + '</span> <span class="cat-arrow">▼</span>';
          grouped[cat].forEach(function(b) {
            b.style.width = '100%';
            b.style.marginBottom = '0';
            b.style.justifyContent = 'flex-start';
            content.appendChild(b);
            b.setAttribute('data-parent-folder-cat', cat);
          });
          
          folder.onclick = function() {
            var isOpen = content.classList.contains('open');
            
            // Close all others
            document.querySelectorAll('.cat-content').forEach(function(c) { c.classList.remove('open'); });
            document.querySelectorAll('.cat-folder').forEach(function(f) { f.classList.remove('active'); });
            
            if (!isOpen) {
              content.classList.add('open');
              folder.classList.add('active');
            }
          };
        }
        
        leftTabs.appendChild(folder);
        leftTabs.appendChild(content);
      });

      // Hook window.renderTab to keep sidebar accordion in sync
      var origRenderTab = window.renderTab;
      window.renderTab = function(tabId) {
        if (typeof origRenderTab === 'function') {
          origRenderTab(tabId);
        }
        
        var activeBtn = document.querySelector('.ltab[data-tab="' + tabId + '"]');
        if (activeBtn) {
          var cat = activeBtn.getAttribute('data-parent-folder-cat');
          if (cat) {
            document.querySelectorAll('.cat-content').forEach(function(c) { c.classList.remove('open'); });
            document.querySelectorAll('.cat-folder').forEach(function(f) { f.classList.remove('active'); });
            
            var folder = document.querySelector('.cat-folder[data-cat="' + cat + '"]');
            var content = document.querySelector('.cat-content[data-cat-content="' + cat + '"]');
            if (folder) folder.classList.add('active');
            
            if (content && content.style.display !== 'none') {
              content.classList.add('open');
            }
          }
        }
      };

      // Set initial folder state based on active tab
      if (window.activeTab) {
        window.renderTab(window.activeTab);
      }
    }, 500); // 500ms delay to ensure all dynamically injected tabs are loaded
  });
})();
