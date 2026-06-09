// DevSocial AI Hub - Main Application Controller (Standalone Version)
(function() {
  'use strict';

  // State
  let currentLang = 'en';
  let activeTab = 'feed';
  let posts = [];
  let currentUser = null;
  const renderers = {}; // renderer map for active 3D card canvases
  const animLoops = {};  // animation loop callbacks for active 3D card canvases
  
  let activeChallengeData = null;
  let globalConfig = { profanityFilter: false };

  // DevSocial Studio Multiplayer State
  let activeRoomId = null;
  let roomUnsubscribe = null;
  let peersUnsubscribe = null;
  let peerId = null;
  let isUpdatingFromRemote = false;
  let heartbeatInterval = null;

  // DOM Elements
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');
  const langBtns = document.querySelectorAll('.lang-btn');
  const postsContainer = document.getElementById('posts-container');
  const galleryContainer = document.getElementById('gallery-container');
  
  // Post Modals Elements
  const modalNewPost = document.getElementById('modal-new-post');
  const btnTriggerNewPost = document.getElementById('btn-trigger-new-post');
  const btnCloseNewPost = document.getElementById('btn-close-new-post');
  const btnCancelNewPost = document.getElementById('btn-cancel-new-post');
  const btnSubmitNewPost = document.getElementById('btn-submit-new-post');
  
  const postTitleInput = document.getElementById('post-title-input');
  const postDescInput = document.getElementById('post-desc-input');
  const postCodeInput = document.getElementById('post-code-input');
  const postPresetSelect = document.getElementById('post-preset-select');
  
  // Fork Modal Elements
  const modalForkCode = document.getElementById('modal-fork-code');
  const btnCloseFork = document.getElementById('btn-close-fork');
  const btnCopyForkCode = document.getElementById('btn-copy-fork-code');
  const btnConfirmForkAction = document.getElementById('btn-confirm-fork-action');
  const forkCodeDisplay = document.getElementById('fork-code-display');
  const forkModalTitle = document.getElementById('fork-modal-title');

  // AI Elements
  const chatMessages = document.getElementById('chat-messages');
  const chatUserInput = document.getElementById('chat-user-input');
  const btnSendChat = document.getElementById('btn-send-chat');

  // HTML wrapping template helper
  function wrapInFullHtml(rawThreeCode, title = "Three.js Export") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - DevSocial AI Hub</title>
  <style>
    body { margin: 0; overflow: hidden; background: #000; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <script>
    // Create scene, camera and renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 150);
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // Add lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);
    
    // --- INJECTED MODEL CODE ---
    ${rawThreeCode}
    // ----------------------------
    
    var animate = null;
    if (typeof createChronoScene === 'function') {
      animate = createChronoScene(scene);
    } else if (typeof createAvatarScene === 'function') {
      animate = createAvatarScene(scene);
    } else if (typeof createSurfaceScene === 'function') {
      animate = createSurfaceScene(scene);
    }
    
    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    function loop() {
      requestAnimationFrame(loop);
      controls.update();
      if (typeof animate === 'function') {
        animate();
      }
      renderer.render(scene, camera);
    }
    loop();
  </script>
</body>
</html>`;
  }

  // 1. APP INITIALIZATION
  window.addEventListener('load', () => {
    // Read session from localStorage
    const session = localStorage.getItem('genius_session');
    if (session) {
      try {
        currentUser = JSON.parse(session);
      } catch(e) {
        console.error("Error parsing genius_session:", e);
      }
    }
    
    // Update user profile card in sidebar
    updateUserProfileCard();

    // Restore saved language preference or default to FR
    const savedLang = localStorage.getItem('hub_lang') || 'fr';
    switchTab('feed');
    switchLanguage(savedLang);
    
    initAIChat();
    bindEvents();
    animateAll();
    initDevSocialStudio();

    // Subscribe to Firebase Firestore real-time post changes
    window.DevSocialDB.subscribePosts(updatedPosts => {
      posts = updatedPosts;
      if (activeTab === 'feed') renderFeed();
      if (activeTab === 'gallery') renderGallery();
    });

    // Subscribe to Active Challenge in real-time
    window.DevSocialDB.subscribeActiveChallenge(challenge => {
      activeChallengeData = challenge;
      renderActiveChallenge(activeChallengeData);
    });

    // Subscribe to Global Config in real-time
    window.DevSocialDB.subscribeGlobalConfig(config => {
      globalConfig = config;
    });

    // Real-time Banned Status Verification
    if (currentUser && typeof firebase !== 'undefined') {
      const db = firebase.firestore();
      db.collection('users').doc(currentUser.email).onSnapshot(doc => {
        if (doc.exists && doc.data().banned === true) {
          alert(currentLang === 'fr' ? "Votre compte a été banni par l'administrateur." : "Your account has been banned by the administrator.");
          localStorage.removeItem('genius_session');
          window.location.reload();
        }
      });
    }
  });

  let challengeInterval = null;
  function renderActiveChallenge(challenge) {
    if (!challenge) return;
    
    const challengeBox = document.querySelector('.challenge-box');
    if (challengeBox) {
      const h3 = challengeBox.querySelector('h3');
      const p = challengeBox.querySelector('p');
      const timeVal = challengeBox.querySelector('.fa-clock').nextElementSibling;
      const statsVal = challengeBox.querySelector('.fa-users').nextElementSibling;
      
      const title = currentLang === 'fr' ? challenge.title_fr : challenge.title_en;
      const desc = currentLang === 'fr' ? challenge.desc_fr : challenge.desc_en;
      
      if (h3) h3.textContent = title;
      if (p) p.textContent = desc;
      
      if (challengeInterval) clearInterval(challengeInterval);
      
      function updateCountdown() {
        const now = Date.now();
        const diff = challenge.expiry - now;
        if (diff <= 0) {
          timeVal.textContent = currentLang === 'fr' ? 'Expiré' : 'Expired';
          if (challengeInterval) clearInterval(challengeInterval);
        } else {
          const hours = Math.floor(diff / (3600 * 1000));
          const mins = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
          const secs = Math.floor((diff % (60 * 1000)) / 1000);
          timeVal.textContent = currentLang === 'fr' ? `${hours}h ${mins}m restantes` : `${hours}h ${mins}m left`;
        }
      }
      
      updateCountdown();
      challengeInterval = setInterval(updateCountdown, 1000);
      
      const joinedCount = challenge.joinedCount || 42;
      statsVal.textContent = currentLang === 'fr' ? `${joinedCount} Participants` : `${joinedCount} Joined`;
    }

    const activeChallengeLarge = document.querySelector('.active-challenge-large');
    if (activeChallengeLarge) {
      const h2 = activeChallengeLarge.querySelector('h2');
      const p = activeChallengeLarge.querySelector('p');
      
      const title = currentLang === 'fr' ? challenge.title_fr : challenge.title_en;
      const desc = currentLang === 'fr' ? challenge.desc_fr : challenge.desc_en;
      
      if (h2) h2.textContent = `🔥 ${currentLang === 'fr' ? 'Défi Actif' : 'Active Challenge'}: ${title}`;
      if (p) p.textContent = desc + " " + (currentLang === 'fr' ? `Récompense : ${challenge.reward}` : `Reward: ${challenge.reward}`);
    }
  }

  function censorText(text) {
    if (!globalConfig || !globalConfig.profanityFilter) return text;
    const badWords = [
      'shit', 'fuck', 'asshole', 'bitch', 'crap', 'bastard', 'cunt', 'dick',
      'merde', 'putain', 'connard', 'salaud', 'salope', 'cul', 'chier', 'bordel'
    ];
    let censored = text;
    badWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      censored = censored.replace(regex, '***');
    });
    return censored;
  }

  function updateUserProfileCard() {
    const profileCard = document.querySelector('.user-profile-card');
    if (!profileCard) return;

    if (currentUser) {
      profileCard.innerHTML = `
        <div class="user-avatar">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}" alt="Avatar">
          <span class="status-indicator online"></span>
        </div>
        <div class="user-info">
          <h3>${currentUser.name}</h3>
          <span class="user-tag ${currentUser.role === 'Admin' ? 'admin-tag' : ''}" style="${currentUser.role !== 'Admin' ? 'background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.3);' : ''}">${currentUser.role === 'Admin' ? 'ADMIN Maker' : 'Premium Maker'}</span>
        </div>
      `;
    } else {
      profileCard.innerHTML = `
        <div class="user-avatar">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Guest" alt="Avatar">
          <span class="status-indicator offline"></span>
        </div>
        <div class="user-info">
          <h3 data-en="Guest User" data-fr="Invité">Guest User</h3>
          <span class="user-tag" style="background: rgba(255,255,255,0.05); color: #9ca3af; border: 1px solid var(--border-glass);" data-en="Read Only" data-fr="Lecture Seule">Read Only</span>
        </div>
      `;
    }
  }

  // 2. TAB SWITCHING
  function switchTab(tabId) {
    if (activeTab === 'studio' && tabId !== 'studio') {
      leaveMultiplayerRoom();
    }
    activeTab = tabId;
    
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });
    
    viewPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });

    // Clean up renderers when leaving feed to save CPU/GPU resource
    if (tabId !== 'feed' && tabId !== 'gallery') {
      stopAll3DViews();
    } else {
      if (tabId === 'feed') renderFeed();
      if (tabId === 'gallery') renderGallery();
    }
  }

  function stopAll3DViews() {
    Object.keys(renderers).forEach(id => {
      const r = renderers[id];
      if (r) {
        r.dispose();
      }
      delete renderers[id];
      delete animLoops[id];
    });
  }

  // 3. TRANSLATIONS MANAGER
  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('hub_lang', lang);
    
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update static labels in UI
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    });

    if (activeChallengeData) {
      renderActiveChallenge(activeChallengeData);
    }

    // Re-render feed and gallery to apply dynamic text updates
    if (activeTab === 'feed') renderFeed();
    if (activeTab === 'gallery') renderGallery();
  }

  // 4. RENDER FEED POSTS
  function renderFeed() {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
      const showDelete = currentUser && (currentUser.role === 'Admin' || currentUser.email === post.userEmail);
      const deleteButtonHtml = showDelete ? `
        <button class="btn-delete-post" onclick="deletePost(${post.id})" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); color: #f87171; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" title="${currentLang === 'fr' ? 'Supprimer la publication' : 'Delete Post'}">
          <i class="fa-solid fa-trash" style="font-size: 11px;"></i>
        </button>
      ` : '';

      const card = document.createElement('div');
      card.className = 'post-card';
      card.dataset.id = post.id;
      
      const commentsHtml = post.comments.map(c => `
        <div class="comment-item">
          <img src="${c.avatar}" alt="User">
          <div class="comment-meta">
            <h5>${c.user}</h5>
            <p>${c.text}</p>
          </div>
        </div>
      `).join('');

      const commentsLabel = currentLang === 'fr' ? `Commentaires (${post.comments.length})` : `Comments (${post.comments.length})`;
      const forkLabel = currentLang === 'fr' ? `🔌 Importer` : `🔌 Fork Code`;
      const captionText = currentLang === 'fr' ? (post.caption_fr || post.caption || post.caption_en || '') : (post.caption_en || post.caption || post.caption_fr || '');

      card.innerHTML = `
        <div class="post-header">
          <div class="post-user-info">
            <img src="${post.userAvatar}" alt="Avatar">
            <div class="post-user-meta">
              <h4>${post.user}</h4>
              <span>${post.userTag}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-report-post" onclick="reportPost(${post.id})" style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171; font-size: 11px; padding: 4px 8px; border-radius: 6px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='rgba(239, 68, 68, 0.15)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.05)'">
              🚩 ${currentLang === 'fr' ? 'Signaler' : 'Report'} ${post.reports ? `(${post.reports})` : ''}
            </button>
            <span class="fork-badge"><i class="fa-solid fa-code"></i> WebGL Ready</span>
            ${deleteButtonHtml}
          </div>
        </div>
        
        <div class="post-caption">${captionText}</div>
        
        <!-- Live Three.js Preview -->
        <div class="post-viewport-container" id="viewport-${post.id}">
          <div class="viewport-overlay"><i class="fa-solid fa-arrows-spin"></i> ${currentLang === 'fr' ? 'Faites glisser' : 'Drag to rotate 3D'}</div>
        </div>
        
        <div class="post-actions">
          <div class="action-buttons-group">
            <button class="btn-post-action btn-like" onclick="likePost(${post.id})">
              <i class="fa-solid fa-heart"></i> <span>${post.likes}</span>
            </button>
            <button class="btn-post-action" onclick="toggleComments(${post.id})">
              <i class="fa-solid fa-comment"></i> <span>${commentsLabel}</span>
            </button>
          </div>
          <button class="btn-fork-code" onclick="openForkCodeModal(${post.id})">
            ${forkLabel}
          </button>
        </div>

        <!-- Comments Dropdown -->
        <div class="post-comments-section" id="comments-section-${post.id}" style="display: none;">
          <div class="comments-list" id="comments-list-${post.id}">
            ${commentsHtml}
          </div>
          <div class="comment-input-bar">
            <input type="text" id="comment-input-${post.id}" placeholder="${currentLang === 'fr' ? 'Écrire un commentaire...' : 'Write a comment...'}" onkeydown="handleCommentKey(event, ${post.id})">
            <button class="btn-send-comment" onclick="submitComment(${post.id})"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      `;
      
      postsContainer.appendChild(card);
      
      // Initialize Three.js viewport in card
      setTimeout(() => initThreeViewport(post.id, post.preset, post.code), 50);
    });
  }

  // 5. RENDER FEATURED GALLERY
  function renderGallery() {
    galleryContainer.innerHTML = '';
    
    // Sort posts by popularity (likes)
    const sorted = [...posts].sort((a, b) => b.likes - a.likes);
    
    sorted.forEach(post => {
      const item = document.createElement('div');
      item.className = 'gallery-item-card';
      
      const typeLabel = post.preset === 'clockwork' ? 'Clockwork 3D' : post.preset === 'avatar' ? 'Webcam 3D' : 'Mesh 3D';
      const forkLabel = currentLang === 'fr' ? 'Importer' : 'Fork';

      item.innerHTML = `
        <div class="gallery-3d-preview" id="gallery-viewport-${post.id}"></div>
        <div class="gallery-meta">
          <h4>@${post.user} - ${typeLabel}</h4>
          <p>${post.caption.substring(0, 80)}...</p>
          <div class="gallery-footer-actions">
            <div class="gallery-stats-group">
              <span><i class="fa-solid fa-heart"></i> ${post.likes}</span>
              <span><i class="fa-solid fa-comment"></i> ${post.comments.length}</span>
            </div>
            <button class="btn-fork-code" style="padding: 6px 12px; font-size: 10.5px;" onclick="openForkCodeModal(${post.id})">
              ${forkLabel}
            </button>
          </div>
        </div>
      `;
      
      galleryContainer.appendChild(item);
      setTimeout(() => initThreeViewport(post.id, post.preset, post.code, true), 100);
    });
  }

  // 6. THREE.JS VIEWPORT RENDERER
  function initThreeViewport(postId, preset, codeString, isGallery = false) {
    const containerId = isGallery ? `gallery-viewport-${postId}` : `viewport-${postId}`;
    const container = document.getElementById(containerId);
    if (!container) return;

    // Detect if codeString is a full HTML page
    const trimmed = (codeString || '').trim();
    const isHtml = trimmed.toLowerCase().startsWith('<!doctype') || 
                   trimmed.toLowerCase().startsWith('<html') || 
                   trimmed.toLowerCase().includes('<script') ||
                   trimmed.toLowerCase().includes('<body>') ||
                   trimmed.toLowerCase().includes('<head>');

    if (isHtml) {
      // Create iframe for HTML code to render exactly what was built in Studio
      const iframe = document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.background = 'transparent';
      iframe.style.borderRadius = '12px';
      iframe.style.pointerEvents = 'auto'; // allow orbit controls inside the iframe
      iframe.srcdoc = codeString;

      // Keep viewport-overlay and append iframe
      const overlay = container.querySelector('.viewport-overlay');
      container.innerHTML = '';
      if (overlay) container.appendChild(overlay);
      container.appendChild(iframe);
      return;
    }

    // Dimensions
    const w = container.clientWidth || 300;
    const h = container.clientHeight || 200;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    
    renderers[containerId] = renderer;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
    camera.position.set(0, 0, 150);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Basic Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);

    let animCb = null;

    // Load custom presets dynamically or evaluate code
    if (preset === 'clockwork') {
      animCb = drawClockwork(scene);
    } else if (preset === 'avatar') {
      animCb = drawAvatar(scene);
    } else if (preset === 'landscape') {
      animCb = drawLandscape(scene);
    } else if (preset === 'torus') {
      animCb = drawTorus(scene);
    } else {
      try {
        const customFunc = new Function('scene', codeString + '\nreturn createChronoScene(scene);');
        animCb = customFunc(scene);
      } catch (e) {
        console.error("Error running code preset:", e);
        animCb = drawTorus(scene); // fallback
      }
    }

    // Loop
    animLoops[containerId] = {
      scene,
      camera,
      controls,
      renderer,
      animCb
    };
  }

  function animateAll() {
    requestAnimationFrame(animateAll);
    
    Object.keys(animLoops).forEach(id => {
      const loop = animLoops[id];
      if (loop) {
        loop.controls.update();
        if (typeof loop.animCb === 'function') {
          loop.animCb();
        }
        loop.renderer.render(loop.scene, loop.camera);
      }
    });
  }

  // Preset 3D builders
  function drawClockwork(scene) {
    const group = new THREE.Group();
    const mat = new THREE.MeshPhysicalMaterial({color: 0xf59e0b, metalness: 0.95, roughness: 0.15, clearcoat: 0.8});
    
    const ring = new THREE.Mesh(new THREE.TorusGeometry(25, 0.8, 8, 32), mat);
    group.add(ring);
    
    const gear = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 2, 24), mat);
    gear.rotation.x = Math.PI / 2;
    group.add(gear);

    const axle = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 4, 8), new THREE.MeshStandardMaterial({color: 0x334155, metalness: 0.9}));
    axle.rotation.x = Math.PI / 2;
    group.add(axle);
    
    scene.add(group);
    
    return function() {
      gear.rotation.y += 0.01;
      group.rotation.y += 0.002;
    };
  }

  function drawAvatar(scene) {
    const count = 1200;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 25 + Math.sin(theta * 5) * Math.cos(phi * 5) * 4;
      
      pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
    }
    
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({color: 0x0ea5e9, size: 1.5, transparent: true, opacity: 0.85});
    const points = new THREE.Points(geom, mat);
    scene.add(points);
    
    return function() {
      points.rotation.y += 0.005;
    };
  }

  function drawLandscape(scene) {
    const size = 30;
    const geom = new THREE.PlaneGeometry(80, 80, size, size);
    const pos = geom.attributes.position.array;
    
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const y = pos[i+1];
      const d = Math.sqrt(x*x + y*y);
      pos[i+2] = Math.sin(d * 0.15) * 8;
    }
    geom.computeVertexNormals();
    
    const mat = new THREE.MeshBasicMaterial({color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.35});
    const mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);
    
    return function() {
      mesh.rotation.z += 0.002;
    };
  }

  function drawTorus(scene) {
    const mat = new THREE.MeshStandardMaterial({color: 0x10b981, roughness: 0.4, wireframe: true});
    const geom = new THREE.TorusKnotGeometry(16, 4, 100, 16);
    const knot = new THREE.Mesh(geom, mat);
    scene.add(knot);
    
    return function() {
      knot.rotation.y += 0.01;
      knot.rotation.x += 0.005;
    };
  }

  // 7. LIKES & COMMENTS ACTIONS
  window.likePost = function(postId) {
    if (!currentUser) {
      toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour aimer !" : "🔒 Please log in on the main portal to like!");
      return;
    }
    window.DevSocialDB.likePost(postId);
    const btn = document.querySelector(`.post-card[data-id="${postId}"] .btn-like`);
    if (btn) {
      btn.classList.add('liked');
      toast(currentLang === 'fr' ? "Aimé !" : "Liked!");
    }
  };

  window.reportPost = function(postId) {
    if (!currentUser) {
      toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour signaler !" : "🔒 Please log in on the main portal to report!");
      return;
    }
    window.DevSocialDB.reportPost(postId);
    toast(currentLang === 'fr' ? "Publication signalée. Merci." : "Post reported. Thank you.");
  };

  window.deletePost = function(postId) {
    if (!currentUser) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const isAllowed = currentUser.role === 'Admin' || currentUser.email === post.userEmail;
    if (!isAllowed) {
      toast(currentLang === 'fr' ? "❌ Non autorisé !" : "❌ Unauthorized!");
      return;
    }

    if (confirm(currentLang === 'fr' ? "Êtes-vous sûr de vouloir supprimer această publicație?" : "Are you sure you want to delete this post?")) {
      window.DevSocialDB.deletePost(postId);
      stopAll3DViews();
      toast(currentLang === 'fr' ? "Publication supprimée !" : "Post deleted successfully!");
    }
  };

  window.toggleComments = function(postId) {
    const sec = document.getElementById(`comments-section-${postId}`);
    if (sec) {
      sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.handleCommentKey = function(event, postId) {
    if (event.key === 'Enter') {
      submitComment(postId);
    }
  };

  window.submitComment = function(postId) {
    if (!currentUser) {
      toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour commentez !" : "🔒 Please log in on the main portal to comment!");
      return;
    }

    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;
    
    const censoredText = censorText(text);
    
    const comment = {
      user: currentUser.name,
      userEmail: currentUser.email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
      text: censoredText
    };
    
    window.DevSocialDB.addComment(postId, comment);
    input.value = '';
  };

  function checkPremium() {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    
    try {
      const raw = localStorage.getItem('ia_premium_users');
      const premiumUsers = raw ? JSON.parse(raw) : [];
      const premiumRec = premiumUsers.find(p => p.email.toLowerCase() === currentUser.email.toLowerCase());
      if (premiumRec) {
        if (premiumRec.days === 9999) return true;
        const expiry = (premiumRec.addedAt || 0) + (premiumRec.days || 0) * 86400000;
        return expiry > Date.now();
      }
    } catch(e) {
      console.error(e);
    }
    return false;
  }

  // 8. FORK CODE MODAL (Wraps in HTML and copies/forks)
  window.openForkCodeModal = function(postId) {
    if (!checkPremium()) {
      alert(currentLang === 'fr' ? 
        "🔒 Copierea și importul codului sunt rezervate membrilor Premium. Vă rugăm să vă conectați sau să vă abonați pe portalul principal!" : 
        "🔒 Copying and importing code are reserved for Premium members. Please log in or subscribe on the main portal!");
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    forkModalTitle.textContent = currentLang === 'fr' ? `Importer le code de @${post.user}` : `Fork from @${post.user}`;
    forkCodeDisplay.value = post.code || `// Sample Three.js configuration\ncreateThreeScene(scene);`;
    modalForkCode.classList.add('active');
  };

  // 9. NEW POST FORM CONTROLLER
  btnTriggerNewPost.onclick = () => modalNewPost.classList.add('active');
  btnCloseNewPost.onclick = () => closeModalNewPost();
  btnCancelNewPost.onclick = () => closeModalNewPost();
  
  function closeModalNewPost() {
    modalNewPost.classList.remove('active');
    postTitleInput.value = '';
    postDescInput.value = '';
    postCodeInput.value = '';
    postPresetSelect.value = 'none';
  }

  btnSubmitNewPost.onclick = () => {
    if (!currentUser) {
      toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pentru a publica !" : "🔒 Please log in on the main portal to publish!");
      return;
    }

    const title = postTitleInput.value.trim();
    const desc = postDescInput.value.trim();
    let code = postCodeInput.value.trim();
    const preset = postPresetSelect.value;
    
    if (!title || !desc) {
      alert(currentLang === 'fr' ? "Veuillez remplir tous les champs obligatoires." : "Please fill in all mandatory fields.");
      return;
    }
    
    if (preset === 'none' && !code) {
      alert(currentLang === 'fr' ? "Veuillez fournir du code Three.js ou sélectionner un modèle." : "Please either provide custom Three.js code or select a Preset Model.");
      return;
    }

    if (!code) {
      code = `// Preset ${preset} custom code loaded`;
    }

    const censoredDesc = censorText(desc);

    const newPost = {
      id: Date.now(),
      user: currentUser.name,
      userEmail: currentUser.email,
      userAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
      userTag: currentUser.role === 'Admin' ? 'ADMIN Maker' : 'Premium Maker',
      caption_en: `${censoredDesc} #custom3D`,
      caption_fr: `${censoredDesc} #custom3D`,
      likes: 0,
      comments: [],
      preset: preset === 'none' ? 'custom' : preset,
      hasThree: true,
      code: code
    };

    window.DevSocialDB.savePost(newPost);
    closeModalNewPost();
    toast(currentLang === 'fr' ? "Modèle partagé !" : "Model shared successfully!");
  };

  // 10. AI CHAT CONTROLLER
  function initAIChat() {
    chatMessages.innerHTML = '';
    const botMsg = window.StudioAI.getWelcomeMessage(currentLang);
    appendChatMessage('bot', botMsg);
  }

  function appendChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    
    if (sender === 'bot') {
      msg.innerHTML = `
        <div class="bot-ico"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-bubble">${formatMarkdown(text)}</div>
      `;
    } else {
      msg.innerHTML = `
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Admin" alt="User">
        <div class="msg-bubble">${formatMarkdown(text)}</div>
      `;
    }
    
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function formatMarkdown(text) {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
      
    if (formatted.includes('```')) {
      formatted = formatted.replace(/```javascript([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
      formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    }
    
    return formatted.replace(/\n/g, '<br>');
  }

  btnSendChat.onclick = sendUserMessage;
  chatUserInput.onkeydown = (e) => {
    if (e.key === 'Enter') sendUserMessage();
  };

  function sendUserMessage() {
    const text = chatUserInput.value.trim();
    if (!text) return;
    
    appendChatMessage('user', text);
    chatUserInput.value = '';
    
    setTimeout(() => {
      const response = window.StudioAI.generateResponse(text, currentLang);
      appendChatMessage('bot', response);
    }, 800);
  }

  window.useHint = function(hintText) {
    chatUserInput.value = hintText;
    chatUserInput.focus();
  };

  // 11. GENERAL BINDINGS
  function bindEvents() {
    // Navigation items click
    navItems.forEach(item => {
      item.onclick = () => switchTab(item.dataset.tab);
    });

    // Language toggle click
    langBtns.forEach(btn => {
      btn.onclick = () => switchLanguage(btn.dataset.lang);
    });

    // Fork modal closes
    btnCloseFork.onclick = () => modalForkCode.classList.remove('active');
    
    modalForkCode.onclick = (e) => {
      if (e.target === modalForkCode) modalForkCode.classList.remove('active');
    };

    // Copy action wraps raw Three.js snippet in full HTML page so it works in external viewers
    btnCopyForkCode.onclick = () => {
      const rawCode = forkCodeDisplay.value;
      const wrappedHtml = wrapInFullHtml(rawCode, forkModalTitle.textContent);
      navigator.clipboard.writeText(wrappedHtml);
      
      btnCopyForkCode.innerHTML = `<i class="fa-solid fa-check"></i> ${currentLang === 'fr' ? 'Copié !' : 'Copied!'}`;
      setTimeout(() => {
        btnCopyForkCode.innerHTML = `<i class="fa-solid fa-copy"></i> ${currentLang === 'fr' ? 'Copier le code HTML' : 'Copy HTML Code'}`;
      }, 2000);
    };

    // Fork/Load in Studio loads directly into local Studio tab
    btnConfirmForkAction.onclick = () => {
      const rawCode = forkCodeDisplay.value;
      modalForkCode.classList.remove('active');
      
      if (!checkPremium()) {
        alert(currentLang === 'fr' ? 
          "🔒 Accès Premium requis pentru a utiliza Studio." : 
          "🔒 Premium access required to use Studio.");
        return;
      }
      
      // Load code into the studio's textarea
      const studioTextarea = document.getElementById('studio-code-input');
      if (studioTextarea) {
        studioTextarea.value = rawCode;
        updateEditorGutter();
      }
      
      // Switch tab to studio
      switchTab('studio');
      
      // Run the preview automatically
      runStudioPreview();
      
      toast(currentLang === 'fr' ? "🔌 Chargement dans le Studio..." : "🔌 Loaded in Studio...");
    };

    // Join Challenge Button click
    document.querySelectorAll('.btn-join-challenge').forEach(btn => {
      btn.onclick = () => {
        if (!currentUser) {
          toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour participer !" : "🔒 Please log in on the main portal to join challenges!");
          return;
        }
        modalNewPost.classList.add('active');
        postDescInput.value = "#chrono2026 ";
        postDescInput.focus();
      };
    });

    // Feed Search Filter
    const searchInput = document.getElementById('feed-search');
    searchInput.oninput = () => {
      const query = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.post-card');
      
      cards.forEach(card => {
        const id = parseInt(card.dataset.id);
        const post = posts.find(p => p.id === id);
        if (post) {
          const match = post.user.toLowerCase().includes(query) || 
                        post.caption.toLowerCase().includes(query) ||
                        post.preset.toLowerCase().includes(query);
          card.style.display = match ? 'block' : 'none';
        }
      });
    };
  }

  // DEVSOCIAL STUDIO & MULTIPLAYER HELPER FUNCTIONS

  const defaultThreeJsCode = `// Glowing 3D Quantum Cube Preset
// Inside the sandbox, 'scene' is available.
// Create your meshes here, and return an animate callback.

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  roughness: 0.2,
  metalness: 0.8,
  wireframe: false
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add custom lights
const pointLight = new THREE.PointLight(0x0ea5e9, 2, 100);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Return animation loop function
return function() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
};`;

  function getStudioIframeSrcDoc(rawCode) {
    let htmlContent = "";
    const trimmed = rawCode.trim();
    const isFullHtml = trimmed.toLowerCase().startsWith('<!doctype') || 
                       trimmed.toLowerCase().startsWith('<html') || 
                       trimmed.toLowerCase().includes('<script') ||
                       trimmed.toLowerCase().includes('<body>');
                       
    if (isFullHtml) {
      htmlContent = rawCode;
    } else {
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevSocial Studio Live Preview</title>
  <style>
    body { margin: 0; overflow: hidden; background: #000; font-family: sans-serif; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <script>
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 150);
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);
    
    var animate = (function() {
      try {
        const customFunc = new Function('scene', \`${rawCode.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`);
        return customFunc(scene);
      } catch(e) {
        console.error("User script evaluation error:", e);
        return null;
      }
    })();
    
    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    var peers = {};
    
    window.addEventListener('message', function(event) {
      if (event.data.type === 'peer_update') {
        updatePeers(event.data.peers);
      }
    });

    function updatePeers(peersList) {
      var activeIds = {};
      peersList.forEach(function(peer) {
        activeIds[peer.id] = true;
        if (peers[peer.id]) {
          peers[peer.id].targetPosition.set(peer.x, peer.y, peer.z);
        } else {
          var geom = new THREE.SphereGeometry(4, 16, 16);
          var mat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true });
          var mesh = new THREE.Mesh(geom, mat);
          mesh.position.set(peer.x, peer.y, peer.z);
          scene.add(mesh);
          
          var ringGeom = new THREE.RingGeometry(5, 6, 32);
          var ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
          var ring = new THREE.Mesh(ringGeom, ringMat);
          ring.rotation.x = Math.PI / 2;
          mesh.add(ring);
          
          peers[peer.id] = {
            mesh: mesh,
            targetPosition: new THREE.Vector3(peer.x, peer.y, peer.z)
          };
        }
      });
      
      Object.keys(peers).forEach(function(id) {
        if (!activeIds[id]) {
          scene.remove(peers[id].mesh);
          delete peers[id];
        }
      });
    }

    var lastReportTime = 0;
    function loop() {
      requestAnimationFrame(loop);
      controls.update();
      if (typeof animate === 'function') {
        try { animate(); } catch(e) {}
      }
      
      Object.keys(peers).forEach(function(id) {
        var p = peers[id];
        p.mesh.position.lerp(p.targetPosition, 0.1);
        p.mesh.rotation.y += 0.02;
      });
      
      renderer.render(scene, camera);
      
      var now = Date.now();
      if (now - lastReportTime > 200) {
        lastReportTime = now;
        window.parent.postMessage({
          type: 'camera_move',
          position: { x: camera.position.x, y: camera.position.y, z: camera.position.z }
        }, '*');
      }
    }
    loop();
  </script>
</body>
</html>`;
    }
    
    if (isFullHtml) {
      const injectedScript = `
      <!-- INJECTED BY DEVSOCIAL MULTIPLAYER SANDBOX -->
      <script>
        (function() {
          var peers = {};
          window.addEventListener('message', function(event) {
            if (event.data.type === 'peer_update') {
              updatePeers(event.data.peers);
            }
          });
          
          function updatePeers(peersList) {
            if (typeof THREE === 'undefined' || typeof scene === 'undefined') return;
            var activeIds = {};
            peersList.forEach(function(peer) {
              activeIds[peer.id] = true;
              if (peers[peer.id]) {
                peers[peer.id].targetPosition.set(peer.x, peer.y, peer.z);
              } else {
                var geom = new THREE.SphereGeometry(4, 16, 16);
                var mat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true });
                var mesh = new THREE.Mesh(geom, mat);
                mesh.position.set(peer.x, peer.y, peer.z);
                scene.add(mesh);
                
                var ringGeom = new THREE.RingGeometry(5, 6, 32);
                var ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
                var ring = new THREE.Mesh(ringGeom, ringMat);
                ring.rotation.x = Math.PI / 2;
                mesh.add(ring);
                
                peers[peer.id] = {
                  mesh: mesh,
                  targetPosition: new THREE.Vector3(peer.x, peer.y, peer.z)
                };
              }
            });
            
            Object.keys(peers).forEach(function(id) {
              if (!activeIds[id]) {
                scene.remove(peers[id].mesh);
                delete peers[id];
              }
            });
          }

          var lastReportTime = 0;
          function trackLoop() {
            requestAnimationFrame(trackLoop);
            if (typeof THREE !== 'undefined' && typeof camera !== 'undefined') {
              var now = Date.now();
              if (now - lastReportTime > 200) {
                lastReportTime = now;
                window.parent.postMessage({
                  type: 'camera_move',
                  position: { x: camera.position.x, y: camera.position.y, z: camera.position.z }
                }, '*');
              }
            }
            Object.keys(peers).forEach(function(id) {
              var p = peers[id];
              p.mesh.position.lerp(p.targetPosition, 0.1);
              p.mesh.rotation.y += 0.02;
            });
          }
          trackLoop();
        })();
      </script>
      `;
      const pos = htmlContent.toLowerCase().lastIndexOf('</body>');
      if (pos !== -1) {
        htmlContent = htmlContent.substring(0, pos) + injectedScript + htmlContent.substring(pos);
      } else {
        htmlContent = htmlContent + injectedScript;
      }
    }
    return htmlContent;
  }

  function initDevSocialStudio() {
    const studioTextarea = document.getElementById('studio-code-input');
    if (!studioTextarea) return;
    
    studioTextarea.value = defaultThreeJsCode;
    updateEditorGutter();
    
    studioTextarea.addEventListener('scroll', () => {
      const gutter = document.getElementById('editor-gutter');
      if (gutter) gutter.scrollTop = studioTextarea.scrollTop;
    });

    studioTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = studioTextarea.selectionStart;
        const end = studioTextarea.selectionEnd;
        studioTextarea.value = studioTextarea.value.substring(0, start) + "  " + studioTextarea.value.substring(end);
        studioTextarea.selectionStart = studioTextarea.selectionEnd = start + 2;
        updateEditorGutter();
      }
    });

    const btnRun = document.getElementById('btn-studio-run');
    if (btnRun) {
      btnRun.onclick = () => {
        if (!checkPremium()) {
          alert(currentLang === 'fr' ? "🔒 Accès Premium requis pour coder dans le Studio." : "🔒 Premium access required to code in Studio.");
          return;
        }
        runStudioPreview();
      };
    }

    const btnShare = document.getElementById('btn-studio-share');
    if (btnShare) {
      btnShare.onclick = () => {
        if (!currentUser) {
          toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour publier !" : "🔒 Please log in on the main portal to publish!");
          return;
        }
        const code = studioTextarea.value;
        if (!code) {
          alert(currentLang === 'fr' ? "Le code est vide !" : "Code is empty!");
          return;
        }
        modalNewPost.classList.add('active');
        document.getElementById('post-code-input').value = code;
        document.getElementById('post-preset-select').value = 'none';
        document.getElementById('post-title-input').focus();
      };
    }

    let debounceTimer = null;
    studioTextarea.addEventListener('input', () => {
      updateEditorGutter();
      if (isUpdatingFromRemote) return;
      if (!activeRoomId) return;
      
      updateSyncStatusText(currentLang === 'fr' ? 'Enregistrement...' : 'Saving...');
      
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (activeRoomId && typeof firebase !== 'undefined') {
          const db = firebase.firestore();
          db.collection('rooms').doc(activeRoomId).update({
            code: studioTextarea.value,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: currentUser.email
          }).then(() => {
            updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
          }).catch(e => console.error(e));
        }
      }, 600);
    });

    const btnJoin = document.getElementById('btn-studio-join');
    const roomInput = document.getElementById('studio-room-input');
    if (btnJoin && roomInput) {
      btnJoin.onclick = () => {
        if (!currentUser) {
          toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour utiliser le mode multijoueur !" : "🔒 Please log in on the main portal to use multiplayer!");
          return;
        }
        if (!checkPremium()) {
          alert(currentLang === 'fr' ? "🔒 Accès Premium requis pentru a utiliza Studio." : "🔒 Premium access required to use Studio.");
          return;
        }
        const val = roomInput.value.trim().toLowerCase();
        if (!val) {
          alert(currentLang === 'fr' ? "Veuillez entrer un nom de salle valide." : "Please enter a valid room ID.");
          return;
        }
        joinMultiplayerRoom(val);
      };
    }

    const btnLeave = document.getElementById('btn-studio-leave');
    if (btnLeave) {
      btnLeave.onclick = () => {
        leaveMultiplayerRoom();
      };
    }

    window.addEventListener('beforeunload', () => {
      if (activeRoomId && peerId && typeof firebase !== 'undefined') {
        const db = firebase.firestore();
        db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).delete().catch(e => {});
      }
    });

    runStudioPreview();
  }

  function joinMultiplayerRoom(roomId) {
    if (typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    
    leaveMultiplayerRoom(true);
    
    activeRoomId = roomId;
    peerId = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.random().toString(36).substring(2, 6);
    
    toast(currentLang === 'fr' ? `Connexion à la salle: ${activeRoomId}` : `Joining room: ${activeRoomId}`);
    
    document.getElementById('studio-room-input').disabled = true;
    document.getElementById('btn-studio-join').classList.add('hidden');
    document.getElementById('btn-studio-leave').classList.remove('hidden');
    document.getElementById('active-peers-container').classList.remove('hidden');
    
    updateSyncStatusText(currentLang === 'fr' ? 'Connexion...' : 'Connecting...');

    db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).set({
      name: currentUser.name,
      email: currentUser.email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
      x: 0,
      y: 0,
      z: 150,
      lastActive: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(e => console.error("Error joining room:", e));

    heartbeatInterval = setInterval(() => {
      if (activeRoomId && peerId) {
        db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
          lastActive: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(e => console.error(e));
      }
    }, 5000);

    roomUnsubscribe = db.collection('rooms').doc(activeRoomId).onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        const studioTextarea = document.getElementById('studio-code-input');
        if (data.code && data.code !== studioTextarea.value && data.updatedBy !== currentUser.email) {
          isUpdatingFromRemote = true;
          const start = studioTextarea.selectionStart;
          const end = studioTextarea.selectionEnd;
          
          studioTextarea.value = data.code;
          updateEditorGutter();
          
          studioTextarea.setSelectionRange(start, end);
          isUpdatingFromRemote = false;
          
          runStudioPreview();
          updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
        }
      } else {
        const studioTextarea = document.getElementById('studio-code-input');
        db.collection('rooms').doc(activeRoomId).set({
          code: studioTextarea.value,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: currentUser.email
        });
      }
    });

    peersUnsubscribe = db.collection('rooms').doc(activeRoomId).collection('peers').onSnapshot(snapshot => {
      const peersList = [];
      const now = Date.now();
      const peerListContainer = document.getElementById('studio-peers-list');
      peerListContainer.innerHTML = '';
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        
        const lastActiveTime = data.lastActive ? data.lastActive.toDate().getTime() : now;
        if (now - lastActiveTime > 15000) {
          if (id !== peerId) {
            db.collection('rooms').doc(activeRoomId).collection('peers').doc(id).delete().catch(e => {});
          }
          return;
        }
        
        peersList.push({
          id: id,
          name: data.name,
          avatar: data.avatar,
          x: data.x || 0,
          y: data.y || 0,
          z: data.z || 150
        });
        
        const peerChip = document.createElement('div');
        peerChip.className = `peer-chip ${id === peerId ? 'self' : ''}`;
        peerChip.innerHTML = `
          <img src="${data.avatar}" alt="Avatar">
          <span>${data.name} ${id === peerId ? '(You)' : ''}</span>
        `;
        peerListContainer.appendChild(peerChip);
      });
      
      const iframe = document.getElementById('studio-preview-frame');
      if (iframe && iframe.contentWindow) {
        const otherPeers = peersList.filter(p => p.id !== peerId);
        iframe.contentWindow.postMessage({
          type: 'peer_update',
          peers: otherPeers
        }, '*');
      }
    });
  }

  function leaveMultiplayerRoom(silent = false) {
    if (roomUnsubscribe) { roomUnsubscribe(); roomUnsubscribe = null; }
    if (peersUnsubscribe) { peersUnsubscribe(); peersUnsubscribe = null; }
    if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
    
    if (activeRoomId && peerId && typeof firebase !== 'undefined') {
      const db = firebase.firestore();
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).delete().catch(e => {});
    }
    
    const roomIdWas = activeRoomId;
    activeRoomId = null;
    peerId = null;
    
    document.getElementById('studio-room-input').disabled = false;
    document.getElementById('btn-studio-join').classList.remove('hidden');
    document.getElementById('btn-studio-leave').classList.add('hidden');
    document.getElementById('active-peers-container').classList.add('hidden');
    document.getElementById('studio-peers-list').innerHTML = '';
    
    updateSyncStatusText(currentLang === 'fr' ? 'Session Locale' : 'Local Session');
    if (!silent && roomIdWas) {
      toast(currentLang === 'fr' ? "Chambre quittée" : "Left room");
    }
  }

  function updateSyncStatusText(text) {
    const statusText = document.querySelector('#studio-sync-status .status-text');
    const statusDot = document.querySelector('#studio-sync-status .status-dot');
    if (statusText) statusText.textContent = text;
    
    if (statusDot) {
      if (text === 'Synced' || text === 'Synchronisé' || text === 'Local Session' || text === 'Session Locale') {
        statusDot.className = 'status-dot green';
      } else if (text === 'Saving...' || text === 'Enregistrement...' || text === 'Connecting...' || text === 'Connexion...') {
        statusDot.className = 'status-dot orange';
      } else {
        statusDot.className = 'status-dot orange';
      }
    }
  }

  function updateEditorGutter() {
    const textarea = document.getElementById('studio-code-input');
    const gutter = document.getElementById('editor-gutter');
    if (!textarea || !gutter) return;
    const lines = textarea.value.split('\n').length;
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
      gutterHtml += i + '<br>';
    }
    gutter.innerHTML = gutterHtml;
  }

  function runStudioPreview() {
    const code = document.getElementById('studio-code-input').value;
    const iframe = document.getElementById('studio-preview-frame');
    if (iframe) {
      iframe.srcdoc = getStudioIframeSrcDoc(code);
    }
  }

  window.addEventListener('message', (event) => {
    if (event.data.type === 'camera_move' && activeRoomId && peerId && typeof firebase !== 'undefined') {
      const pos = event.data.position;
      const db = firebase.firestore();
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
        x: pos.x,
        y: pos.y,
        z: pos.z
      }).catch(e => {});
    }
  });

  // Toast helper
  function toast(msg) {
    const t = document.createElement('div');
    t.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: rgba(17, 24, 39, 0.95); border: 1px solid var(--color-primary);
      padding: 10px 20px; border-radius: var(--radius-sm); font-size: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20000; color: #fff;
      backdrop-filter: blur(8px); font-weight: 500; font-family: sans-serif;
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }
  window.toast = toast;

})();
