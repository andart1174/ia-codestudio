// DevSocial AI Hub - Main Application Controller (Standalone Version)
(function() {
  'use strict';

  // State
  let currentLang = 'en';
  let activeTab = 'feed';
  let posts = [];
  let checkDeepLinkOnce = false;
  let currentUser = null;
  const renderers = {}; // renderer map for active 3D card canvases
  const animLoops = {};  // animation loop callbacks for active 3D card canvases

  // IntersectionObserver to optimize offscreen WebGL rendering
  let viewportObserver = null;
  if (typeof IntersectionObserver !== 'undefined') {
    viewportObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const containerId = entry.target.id;
        const loop = animLoops[containerId];
        if (loop) {
          loop.visible = entry.isIntersecting;
        }
      });
    }, { threshold: 0.05 });
  }

  // Parse URL parameters for deep-linking and embedding
  const urlParams = new URLSearchParams(window.location.search);
  const isEmbed = urlParams.get('embed') === 'true';
  const targetPostId = urlParams.get('post') || urlParams.get('view');
  
  if (isEmbed) {
    document.documentElement.classList.add('embed-mode');
    const addBodyClass = () => {
      if (document.body) {
        document.body.classList.add('embed-mode');
      } else {
        setTimeout(addBodyClass, 5);
      }
    };
    addBodyClass();
  }
  
  let activeChallengeData = null;
  let globalConfig = { profanityFilter: false };

  // DevSocial Studio Multiplayer State
  let activeRoomId = null;
  let roomUnsubscribe = null;
  let peersUnsubscribe = null;
  let peerId = null;
  let isUpdatingFromRemote = false;
  let heartbeatInterval = null;
  let lastReactionTimes = {};
  let lastProcessedRunTrigger = null;
  let hasLoadedInitialPreview = false;

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

  // Share Modal Elements
  const modalSharePost = document.getElementById('modal-share-post');
  const btnCloseShare = document.getElementById('btn-close-share');
  const shareLinkInput = document.getElementById('share-link-input');
  const btnCopyShareLink = document.getElementById('btn-copy-share-link');
  const shareTwitterBtn = document.getElementById('share-twitter-btn');
  const shareRedditBtn = document.getElementById('share-reddit-btn');
  const shareFacebookBtn = document.getElementById('share-facebook-btn');

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
    
    // Initialize DEVSOCIAL advanced modules
    if (typeof initVoiceChat === 'function') initVoiceChat();
    if (typeof initPrefabs === 'function') initPrefabs();
    if (typeof initLeaderboard === 'function') initLeaderboard();
    if (typeof syncLocalUserReputationAndLeaderboard === 'function') syncLocalUserReputationAndLeaderboard();

    // Subscribe to Firebase Firestore real-time post changes
    window.DevSocialDB.subscribePosts(updatedPosts => {
      posts = updatedPosts;
      if (activeTab === 'feed') renderFeed();
      if (activeTab === 'gallery') renderGallery();
      if (typeof syncLocalUserReputationAndLeaderboard === 'function') {
        syncLocalUserReputationAndLeaderboard();
      }

      // Deep-link check to scroll to post
      if (!checkDeepLinkOnce && posts.length > 0) {
        checkDeepLinkOnce = true;
        const urlParams = new URLSearchParams(window.location.search);
        const targetPostId = urlParams.get('post') || urlParams.get('view');
        if (targetPostId) {
          setTimeout(() => {
            const card = document.querySelector(`.post-card[data-id="${targetPostId}"]`);
            if (card) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              card.classList.add('glowing-post');
              setTimeout(() => {
                card.classList.remove('glowing-post');
              }, 4000);
            }
          }, 800);
        }
      }
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

      // Real-time Premium Status Sync for Cross-Device Support
      db.collection('premium').doc(currentUser.email).onSnapshot(doc => {
        if (doc.exists) {
          const pData = doc.data();
          let lsP = [];
          try {
            const raw = localStorage.getItem('ia_premium_users');
            lsP = raw ? JSON.parse(raw) : [];
          } catch(e){}
          const emailLower = currentUser.email.toLowerCase();
          const index = lsP.findIndex(p => p.email.toLowerCase() === emailLower);
          if (index !== -1) {
            lsP[index] = { ...lsP[index], ...pData };
          } else {
            lsP.push({ email: currentUser.email, ...pData });
          }
          localStorage.setItem('ia_premium_users', JSON.stringify(lsP));
        }
      }, err => console.log("Premium sync error:", err));
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
      
      const container = document.getElementById(id);
      if (container && viewportObserver) {
        viewportObserver.unobserve(container);
      }
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
    
    let postsToRender = posts;
    if (targetPostId) {
      postsToRender = posts.filter(p => String(p.id) === String(targetPostId));
    } else {
      // Exclude unlisted posts from the public feed
      postsToRender = posts.filter(p => p.unlisted !== true);
    }

    if (isEmbed && postsToRender.length === 0) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; width:100vw; height:100vh; color:#fff; font-family:"Outfit", sans-serif; font-size:16px; background:#050815; z-index:9999;';
      errorDiv.innerHTML = `
        <span style="font-size:32px; margin-bottom:12px;">🔍</span>
        <strong style="color:#fff;">3D Widget Not Found</strong>
        <p style="font-size:13px; color:rgba(255,255,255,0.5); margin-top:6px;">This post may have been deleted or moved.</p>
      `;
      postsContainer.appendChild(errorDiv);
      return;
    }
    
    postsToRender.forEach(post => {
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
            <button class="btn-post-action btn-share" onclick="openShareModal(${post.id})">
              <i class="fa-solid fa-share-nodes"></i> <span>${currentLang === 'fr' ? 'Partager' : 'Share'}</span>
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
    
    // Sort posts by popularity (likes) and exclude unlisted
    const sorted = [...posts].filter(p => p.unlisted !== true).sort((a, b) => b.likes - a.likes);
    
    sorted.forEach(post => {
      const item = document.createElement('div');
      item.className = 'gallery-item-card';
      
      const typeLabel = post.preset === 'clockwork' ? 'Clockwork 3D' : post.preset === 'avatar' ? 'Webcam 3D' : 'Mesh 3D';
      const forkLabel = currentLang === 'fr' ? 'Importer' : 'Fork';

      const captionText = post.caption_en || post.caption || post.caption_fr || '';
      const truncatedCaption = captionText.length > 80 ? captionText.substring(0, 80) + '...' : captionText;

      item.innerHTML = `
        <div class="gallery-3d-preview" id="gallery-viewport-${post.id}"></div>
        <div class="gallery-meta">
          <h4>@${post.user} - ${typeLabel}</h4>
          <p>${truncatedCaption}</p>
          <div class="gallery-footer-actions">
            <div class="gallery-stats-group">
              <span><i class="fa-solid fa-heart"></i> ${post.likes}</span>
              <span><i class="fa-solid fa-comment"></i> ${(post.comments || []).length}</span>
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

    // Helper to append watermark if in embed mode
    function checkAndAppendWatermark() {
      if (isEmbed && !isGallery) {
        // Remove existing to avoid duplicates
        const existingWatermark = container.querySelector('.embed-watermark');
        if (existingWatermark) existingWatermark.remove();

        const watermark = document.createElement('a');
        const baseOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? window.location.origin : 'https://ia-codestudio.com';
        watermark.href = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}`;
        watermark.target = '_blank';
        watermark.className = 'embed-watermark';
        watermark.innerHTML = `✨ Powered by IA Code Studio`;
        container.appendChild(watermark);
      }
    }

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
      checkAndAppendWatermark();
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
        const customFunc = new Function('scene', codeString + `
          if (typeof createChronoScene === 'function') return createChronoScene(scene);
          if (typeof createAvatarScene === 'function') return createAvatarScene(scene);
          if (typeof createSurfaceScene === 'function') return createSurfaceScene(scene);
        `);
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
      animCb,
      visible: true
    };

    if (viewportObserver) {
      viewportObserver.observe(container);
    }

    checkAndAppendWatermark();
  }

  function animateAll() {
    requestAnimationFrame(animateAll);
    
    Object.keys(animLoops).forEach(id => {
      const loop = animLoops[id];
      if (loop && loop.visible !== false) {
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

    if (confirm(currentLang === 'fr' ? "Êtes-vous sûr de vouloir supprimer cette publication ?" : "Are you sure you want to delete this post?")) {
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
        "🔒 La copie et l'importation de code sont réservées aux membres Premium. Veuillez vous connecter ou vous abonner sur le portail principal !" : 
        "🔒 Copying and importing code are reserved for Premium members. Please log in or subscribe on the main portal!");
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    forkModalTitle.textContent = currentLang === 'fr' ? `Importer le code de @${post.user}` : `Fork from @${post.user}`;
    forkCodeDisplay.value = post.code || `// Sample Three.js configuration\ncreateThreeScene(scene);`;
    modalForkCode.classList.add('active');
  };

  window.openShareModal = function(postId) {
    if (!checkPremium()) {
      alert(currentLang === 'fr' 
        ? "🔒 Le partage et l'intégration de créations 3D sont réservés aux membres Premium. Veuillez vous connecter ou vous abonner sur le portail principal !" 
        : "🔒 Sharing and embedding 3D creations are reserved for Premium members. Please log in or subscribe on the main portal!");
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const baseOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? window.location.origin : 'https://ia-codestudio.com';
    const url = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}`;
    if (shareLinkInput) shareLinkInput.value = url;

    const embedUrl = `${url}&embed=true`;
    const embedCode = `<iframe src="${embedUrl}" width="100%" height="450" style="border:none; border-radius:12px; box-shadow: 0 4px 30px rgba(0,0,0,0.35);"></iframe>`;
    const embedCodeInput = document.getElementById('embed-code-input');
    if (embedCodeInput) embedCodeInput.value = embedCode;

    const caption = currentLang === 'fr' 
      ? (post.caption_fr || post.caption || post.caption_en || '')
      : (post.caption_en || post.caption || post.caption_fr || '');
    
    // Social text templates
    const tweetText = currentLang === 'fr'
      ? `Regardez cette animation 3D que j'ai codée avec l'IA sur IA Code Studio ! ${caption}`
      : `Check out this 3D animation I coded using AI on IA Code Studio! ${caption}`;
    
    const redditTitle = currentLang === 'fr'
      ? `Animation 3D codée avec l'IA sur IA Code Studio`
      : `Cool 3D animation coded using AI on IA Code Studio`;

    if (shareTwitterBtn) {
      shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
    }
    if (shareRedditBtn) {
      shareRedditBtn.href = `https://www.reddit.com/submit?title=${encodeURIComponent(redditTitle)}&url=${encodeURIComponent(url)}`;
    }
    if (shareFacebookBtn) {
      shareFacebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }

    if (modalSharePost) {
      modalSharePost.classList.add('active');
    }
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
      toast(currentLang === 'fr' ? "🔒 Connectez-vous sur le portail pour publier !" : "🔒 Please log in on the main portal to publish!");
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

    window.lastFirestoreError = null;
    window.lastFirebaseInitError = null;
    window.DevSocialDB.savePost(newPost).then((success) => {
      if (!success) {
        const errMsg = window.lastFirestoreError || window.lastFirebaseInitError || "Unknown connection error";
        alert(currentLang === 'fr' 
          ? `⚠️ Enregistré LOCALEMENT car la synchronisation en ligne a échoué.\nDétails: ${errMsg}`
          : `⚠️ Saved LOCALLY because online sync failed.\nDetails: ${errMsg}`);
      } else {
        toast(currentLang === 'fr' ? "Modèle partagé !" : "Model shared successfully!");
      }
    });
    closeModalNewPost();
  };

  // 10. AI CHAT CONTROLLER
  function initAIChat() {
    chatMessages.innerHTML = '';
    const botMsg = window.StudioAI.getWelcomeMessage(currentLang);
    appendChatMessage('bot', botMsg);
    
    // Bind click delegation for Apply Code buttons
    chatMessages.addEventListener('click', (e) => {
      const btn = e.target.closest('.apply-code-btn');
      if (btn) {
        if (!checkPremium()) {
          alert(currentLang === 'fr' ? 
            "🔒 Accès Premium requis pour charger du code dans le Studio." : 
            "🔒 Premium access required to load code into the Studio.");
          return;
        }
        const code = btn.getAttribute('data-code');
        const studioTextarea = document.getElementById('studio-code-input');
        if (studioTextarea) {
          studioTextarea.value = code;
          updateEditorGutter();
          switchTab('studio');
          runStudioPreview();
          toast(currentLang === 'fr' ? "Code appliqué au Studio !" : "Code applied to Studio!");
        }
      }
    });

    // Voice Co-Pilot Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      let isRecording = false;
      const btnMic = document.getElementById('btn-chat-mic');
      
      if (btnMic) {
        btnMic.onclick = () => {
          if (!checkPremium()) {
            alert(currentLang === 'fr' ? 
              "🔒 La saisie vocale Co-Pilot est réservée aux membres Premium." : 
              "🔒 Voice Co-Pilot input is reserved for Premium members.");
            return;
          }
          if (isRecording) {
            recognition.stop();
          } else {
            recognition.lang = currentLang === 'fr' ? 'fr-FR' : 'en-US';
            recognition.start();
          }
        };
      }
      
      recognition.onstart = () => {
        isRecording = true;
        if (btnMic) btnMic.classList.add('recording');
        toast(currentLang === 'fr' ? "🎙️ Écoute en cours..." : "🎙️ Listening...");
      };
      
      recognition.onend = () => {
        isRecording = false;
        if (btnMic) btnMic.classList.remove('recording');
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        isRecording = false;
        if (btnMic) btnMic.classList.remove('recording');
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputField = document.getElementById('chat-user-input');
        if (inputField) {
          inputField.value = (inputField.value + " " + transcript).trim();
          inputField.focus();
        }
      };
    } else {
      const btnMic = document.getElementById('btn-chat-mic');
      if (btnMic) {
        btnMic.style.opacity = '0.3';
        btnMic.title = "Speech Recognition not supported in this browser";
      }
    }
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
      formatted = formatted.replace(/```(?:javascript)?([\s\S]*?)```/g, (match, code) => {
        const escapedCode = code.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        const applyText = currentLang === 'fr' ? "Appliquer à l'Éditeur" : "Apply to Editor";
        return `<div class="code-block-wrapper">
          <pre><code>${code}</code></pre>
          <button class="apply-code-btn" data-code="${escapedCode}"><i class="fa-solid fa-arrow-right-to-bracket"></i> ${applyText}</button>
        </div>`;
      });
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

    // Share modal actions
    if (btnCloseShare) {
      btnCloseShare.onclick = () => modalSharePost.classList.remove('active');
    }
    if (modalSharePost) {
      modalSharePost.onclick = (e) => {
        if (e.target === modalSharePost) modalSharePost.classList.remove('active');
      };
    }
    // Helper for robust clipboard copying with fallback
    function copyTextToClipboard(text) {
      function fallbackCopy(resolve, reject) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) resolve();
          else reject(new Error("Copy command failed"));
        } catch (err) {
          reject(err);
        }
      }

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(text).catch(err => {
          console.warn("navigator.clipboard.writeText failed, trying fallback:", err);
          return new Promise(fallbackCopy);
        });
      } else {
        return new Promise(fallbackCopy);
      }
    }

    if (btnCopyShareLink && shareLinkInput) {
      btnCopyShareLink.onclick = () => {
        copyTextToClipboard(shareLinkInput.value).then(() => {
          const copyLabel = btnCopyShareLink.querySelector('span');
          if (copyLabel) {
            const origText = copyLabel.textContent;
            copyLabel.textContent = currentLang === 'fr' ? 'Copié !' : 'Copied!';
            setTimeout(() => {
              copyLabel.textContent = origText;
            }, 2000);
          }
        }).catch(err => {
          console.error("Failed to copy:", err);
        });
      };
    }

    const btnCopyEmbedCode = document.getElementById('btn-copy-embed-code');
    const embedCodeInput = document.getElementById('embed-code-input');
    if (btnCopyEmbedCode && embedCodeInput) {
      btnCopyEmbedCode.onclick = () => {
        copyTextToClipboard(embedCodeInput.value).then(() => {
          const copyLabel = btnCopyEmbedCode.querySelector('span');
          if (copyLabel) {
            const origText = copyLabel.textContent;
            copyLabel.textContent = currentLang === 'fr' ? 'Copié !' : 'Copied!';
            setTimeout(() => {
              copyLabel.textContent = origText;
            }, 2000);
          }
        }).catch(err => {
          console.error("Failed to copy:", err);
        });
      };
    }

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
          "🔒 Accès Premium requis pour utiliser le Studio." : 
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
          const captionText = post.caption_en || post.caption || post.caption_fr || '';
          const match = post.user.toLowerCase().includes(query) || 
                        captionText.toLowerCase().includes(query) ||
                        (post.preset || '').toLowerCase().includes(query);
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

  const defaultGlslShaderCode = `// Cybernetic Wave Grid Shader
// u_time, u_resolution, and u_mouse are provided.

precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  // Create grid lines
  vec2 grid = abs(sin(uv * 10.0 + vec2(u_time * 0.5)));
  float line = smoothstep(0.95, 1.0, max(grid.x, grid.y));
  
  // Interactive glowing spot
  float dist = length(uv - mouse);
  float glow = 0.08 / (dist + 0.08);
  
  // Wave pattern
  float wave = sin(uv.x * 3.0 + u_time) * cos(uv.y * 3.0 + u_time);
  
  // Combine colors
  vec3 baseColor = vec3(0.1, 0.4, 0.9) * (wave * 0.5 + 0.5);
  vec3 glowColor = vec3(0.0, 0.8, 1.0) * glow;
  vec3 gridColor = vec3(0.5, 0.0, 0.8) * line;
  
  vec3 finalColor = baseColor + glowColor + gridColor;
  gl_FragColor = vec4(finalColor, 1.0);
}`;

  function getGlslIframeSrcDoc(fragmentShaderSource) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GLSL Shader Sandbox</title>
  <style>
    body { margin: 0; overflow: hidden; background: #000; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
</head>
<body>
  <canvas id="glcanvas"></canvas>
  <script>
    const canvas = document.getElementById('glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      alert('WebGL not supported');
    }

    const vsSource = \`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    \`;

    const fsSource = \`${fragmentShaderSource.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\\\$')}\`;

    function showShaderError(message) {
      const div = document.createElement('div');
      div.style.cssText = 'position:absolute;top:10px;left:10px;right:10px;background:rgba(239,68,68,0.95);color:#fff;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;white-space:pre-wrap;z-index:9999;border:1px solid #ef4444;box-shadow:0 10px 15px rgba(0,0,0,0.5);';
      div.textContent = '❌ GLSL Shader Compilation Error:\\n\\n' + message;
      document.body.appendChild(div);
    }

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        console.error('Shader compile error:', log);
        showShaderError(log);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) {
      throw new Error('Shader compilation failed');
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      console.error('Program link error:', log);
      showShaderError(log);
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY;
    });

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let lastReportTime = 0;
    function render(time) {
      time *= 0.001;
      
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseX, mouseY);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);

      var now = Date.now();
      if (now - lastReportTime > 200) {
        lastReportTime = now;
        window.parent.postMessage({
          type: 'camera_move',
          position: { x: mouseX, y: mouseY, z: 0 }
        }, '*');
      }
    }
    requestAnimationFrame(render);
  </script>
</body>
</html>`;
}

function getMismatchedModeHtml(message) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mismatched Mode</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #050815;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #94a3b8;
    }
    .card {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      max-width: 80%;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
    }
    .icon { font-size: 32px; margin-bottom: 12px; }
    .title { color: #f8fafc; font-weight: 700; font-size: 16px; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">⚠️</div>
    <div class="title">${currentLang === 'fr' ? 'Mode de Code Incompatible' : 'Mismatched Code Mode'}</div>
    <div style="line-height:1.5; font-size:13px;">${message}</div>
  </div>
</body>
</html>`;
}

function getStudioIframeSrcDoc(rawCode, mode = 'threejs') {
  const trimmed = rawCode.trim();
  const isFullHtml = trimmed.toLowerCase().startsWith('<!doctype') || 
                     trimmed.toLowerCase().startsWith('<html') || 
                     trimmed.toLowerCase().includes('<script') ||
                     trimmed.toLowerCase().includes('<body>');
                     
  if (isFullHtml) {
    return rawCode;
  }

  let htmlContent = "";
  if (false) {
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
    
    function showThreeError(message) {
      const div = document.createElement('div');
      div.style.cssText = 'position:absolute;top:10px;left:10px;right:10px;background:rgba(239,68,68,0.95);color:#fff;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;white-space:pre-wrap;z-index:9999;border:1px solid #ef4444;box-shadow:0 10px 15px rgba(0,0,0,0.5);';
      div.textContent = '❌ JS Evaluation Error:\\n\\n' + message;
      document.body.appendChild(div);
    }

    var animate = (function() {
      try {
        const customFunc = new Function('scene', \`${rawCode.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\\\$')}
          if (typeof createChronoScene === 'function') return createChronoScene(scene);
          if (typeof createAvatarScene === 'function') return createAvatarScene(scene);
          if (typeof createSurfaceScene === 'function') return createSurfaceScene(scene);
        \`);
        return customFunc(scene);
      } catch(e) {
        console.error("User script evaluation error:", e);
        showThreeError(e.message);
        return null;
      }
    })();
    
    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    var peers = {};
    
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    var lastPointerReport = 0;

    window.addEventListener('mousemove', function(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      var intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      
      var now = Date.now();
      if (now - lastPointerReport > 120) {
        lastPointerReport = now;
        window.parent.postMessage({
          type: 'pointer_move',
          position: { x: intersection.x, y: intersection.y, z: intersection.z }
        }, '*');
      }
    });

    window.addEventListener('message', function(event) {
      if (event.data.type === 'peer_update') {
        updatePeers(event.data.peers);
      } else if (event.data.type === 'peer_reaction') {
        triggerPeerReaction(event.data.peerId, event.data.emoji);
      }
    });

    function toScreenPosition(obj, camera) {
      var vector = new THREE.Vector3();
      obj.updateMatrixWorld();
      vector.setFromMatrixPosition(obj.matrixWorld);
      vector.project(camera);
      return {
        x: (vector.x * 0.5 + 0.5) * window.innerWidth,
        y: (-(vector.y * 0.5) + 0.5) * window.innerHeight
      };
    }

    function triggerPeerReaction(peerId, emoji) {
      var p = peers[peerId];
      if (!p) return;
      if (p.reactionEl) p.reactionEl.remove();
      var el = document.createElement('div');
      el.textContent = emoji;
      el.style.position = 'absolute';
      el.style.fontSize = '24px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      document.body.appendChild(el);
      p.reactionEl = el;
      p.reactionOffset = 0;
    }

    function updatePeers(peersList) {
      var activeIds = {};
      peersList.forEach(function(peer) {
        activeIds[peer.id] = true;
        if (peers[peer.id]) {
          peers[peer.id].targetPosition.set(peer.x, peer.y, peer.z);
          peers[peer.id].targetPointer.set(peer.px || 0, peer.py || 0, peer.pz || 0);
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
          
          // Glow Laser Pointer Cone
          var pointerGeom = new THREE.ConeGeometry(1.5, 6, 8);
          pointerGeom.rotateX(Math.PI / 2);
          var pointerMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
          var pointerMesh = new THREE.Mesh(pointerGeom, pointerMat);
          scene.add(pointerMesh);
          
          peers[peer.id] = {
            mesh: mesh,
            pointerMesh: pointerMesh,
            targetPosition: new THREE.Vector3(peer.x, peer.y, peer.z),
            targetPointer: new THREE.Vector3(peer.px || 0, peer.py || 0, peer.pz || 0)
          };
        }
      });
      
      Object.keys(peers).forEach(function(id) {
        if (!activeIds[id]) {
          if (peers[id].reactionEl) peers[id].reactionEl.remove();
          scene.remove(peers[id].mesh);
          if (peers[id].pointerMesh) scene.remove(peers[id].pointerMesh);
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
        
        if (p.pointerMesh) {
          p.pointerMesh.position.lerp(p.targetPointer, 0.2);
        }

        if (p.reactionEl) {
          var pos = toScreenPosition(p.mesh, camera);
          p.reactionEl.style.left = (pos.x - 12) + 'px';
          p.reactionOffset += 1.5;
          p.reactionEl.style.top = (pos.y - 20 - p.reactionOffset) + 'px';
          if (p.reactionOffset > 100) {
            p.reactionEl.remove();
            p.reactionEl = null;
          }
        }
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
          } else if (event.data.type === 'peer_reaction') {
            triggerPeerReaction(event.data.peerId, event.data.emoji);
          }
        });
        
        function toScreenPosition(obj, camera) {
          var vector = new THREE.Vector3();
          obj.updateMatrixWorld();
          vector.setFromMatrixPosition(obj.matrixWorld);
          vector.project(camera);
          return {
            x: (vector.x * 0.5 + 0.5) * window.innerWidth,
            y: (-(vector.y * 0.5) + 0.5) * window.innerHeight
          };
        }

        function triggerPeerReaction(peerId, emoji) {
          var p = peers[peerId];
          if (!p) return;
          if (p.reactionEl) p.reactionEl.remove();
          var el = document.createElement('div');
          el.textContent = emoji;
          el.style.position = 'absolute';
          el.style.fontSize = '24px';
          el.style.pointerEvents = 'none';
          el.style.zIndex = '9999';
          document.body.appendChild(el);
          p.reactionEl = el;
          p.reactionOffset = 0;
        }

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
              if (peers[id].reactionEl) peers[id].reactionEl.remove();
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
            if (p.reactionEl) {
              var pos = toScreenPosition(p.mesh, camera);
              p.reactionEl.style.left = (pos.x - 12) + 'px';
              p.reactionOffset += 1.5;
              p.reactionEl.style.top = (pos.y - 20 - p.reactionOffset) + 'px';
              if (p.reactionOffset > 100) {
                p.reactionEl.remove();
                p.reactionEl = null;
              }
            }
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

  async function updateRoomDocument(fields) {
    if (!activeRoomId || typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    
    // Intercept updates where code size > 250,000 characters to protect room document and performance
    if (fields.code && fields.code.length > 250000) {
      if (currentLang === 'fr') {
        alert("⚠️ Le code est trop volumineux pour être synchronisé en multijoueur (>250 Ko). Veuillez de préférence réduire sa taille ou utiliser la Session Locale pour travailler sur ce projet complexe.");
      } else {
        alert("⚠️ The code is too large to be synchronized in multiplayer mode (>250 KB). Please reduce its size or use a Local Session to work on this complex project.");
      }
      return Promise.reject("Code size exceeds 250 KB limit for multiplayer");
    }
    
    // If code is present and is large, compress it!
    if (fields.code && fields.code.length > 20000 && window.DevSocialDB && typeof window.DevSocialDB._compress === 'function') {
      try {
        console.log("Compressing room code...", fields.code.length, "chars");
        const compressed = await window.DevSocialDB._compress(fields.code);
        console.log("Compressed room code to", compressed.length, "chars");
        fields.compressedCode = compressed;
        fields.code = ""; // Clear uncompressed code
      } catch (e) {
        console.error("Room code compression failed:", e);
      }
    }
    
    fields.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    fields.updatedBy = currentUser.email;
    
    return db.collection('rooms').doc(activeRoomId).set(fields, { merge: true })
      .catch(e => console.error("Error updating room doc:", e));
  }

  function initDevSocialStudio() {
    const studioTextarea = document.getElementById('studio-code-input');
    if (!studioTextarea) return;
    
    studioTextarea.value = defaultThreeJsCode;
    updateEditorGutter();
    
    const modeSelect = document.getElementById('studio-render-mode');
    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        const val = studioTextarea.value.trim();
        const isGlsl = modeSelect.value === 'glsl';
        
        // Switch default template code ONLY if untouched
        if (studioTextarea.value === defaultThreeJsCode && isGlsl) {
          studioTextarea.value = defaultGlslShaderCode;
          updateEditorGutter();
        } else if (studioTextarea.value === defaultGlslShaderCode && !isGlsl) {
          studioTextarea.value = defaultThreeJsCode;
          updateEditorGutter();
        }
        
        runStudioPreview();
        
        // Sync to Firestore if in a room
        if (activeRoomId && typeof firebase !== 'undefined') {
          updateRoomDocument({
            mode: modeSelect.value,
            code: studioTextarea.value
          }).then(() => {
            updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
          });
        }
      });
    }
    
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
        
        // Sincronizează rularea preview-ului în Firestore
        if (activeRoomId && typeof firebase !== 'undefined') {
          const modeSelect = document.getElementById('studio-render-mode');
          updateRoomDocument({
            code: studioTextarea.value,
            mode: modeSelect ? modeSelect.value : 'threejs',
            runTrigger: Date.now()
          });
        }
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
          const modeSelect = document.getElementById('studio-render-mode');
          updateRoomDocument({
            code: studioTextarea.value,
            mode: modeSelect ? modeSelect.value : 'threejs'
          }).then(() => {
            updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
          });
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
          alert(currentLang === 'fr' ? "🔒 Accès Premium requis pour utiliser le Studio." : "🔒 Premium access required to use Studio.");
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
    
    // Check if the current editor code is too large (>250 KB) before connecting to avoid crashing browsers
    const studioTextarea = document.getElementById('studio-code-input');
    if (studioTextarea && studioTextarea.value.length > 250000) {
      if (currentLang === 'fr') {
        alert("⚠️ Le code actuel de votre éditeur dépasse la limite de 250 Ko autorisée pour le mode multijoueur. Pour éviter de bloquer votre navigateur et celui des autres utilisateurs, l'éditeur a été réinitialisé au modèle par défaut.");
      } else {
        alert("⚠️ The current code in your editor exceeds the 250 KB limit allowed for multiplayer mode. To prevent freezing your browser and other users' browsers, the editor has been reset to the default template.");
      }
      studioTextarea.value = defaultThreeJsCode;
      const modeSelect = document.getElementById('studio-render-mode');
      if (modeSelect) {
        modeSelect.value = 'threejs';
      }
      updateEditorGutter();
      runStudioPreview();
    }
    
    leaveMultiplayerRoom(true);
    
    activeRoomId = roomId;
    peerId = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.random().toString(36).substring(2, 6);
    
    toast(currentLang === 'fr' ? `Connexion à la salle: ${activeRoomId}` : `Joining room: ${activeRoomId}`);
    
    document.getElementById('studio-room-input').disabled = true;
    document.getElementById('btn-studio-join').classList.add('hidden');
    document.getElementById('btn-studio-leave').classList.remove('hidden');
    document.getElementById('active-peers-container').classList.remove('hidden');
    document.getElementById('mp-reactions-bar').classList.remove('hidden');
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (voiceBtn) {
      voiceBtn.classList.remove('hidden');
      voiceBtn.classList.remove('voice-active');
      voiceBtn.textContent = currentLang === 'fr' ? '🎙️ Parler direct' : '🎙️ Join Voice';
    }
    
    updateSyncStatusText(currentLang === 'fr' ? 'Connexion...' : 'Connecting...');

    // Fetch active user profile for multiplayer badge/reputation representation
    let localRep = 0;
    let localBadge = '🧑‍💻';
    db.collection('users').doc(currentUser.email).get().then(doc => {
      if (doc.exists) {
        localRep = doc.data().reputation || 0;
        localBadge = doc.data().badge || '🧑‍💻';
      }
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).set({
        name: currentUser.name,
        email: currentUser.email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
        x: 0,
        y: 0,
        z: 150,
        px: null,
        py: null,
        pz: null,
        speaking: false,
        reputation: localRep,
        badge: localBadge,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(e => console.error("Error joining room:", e));
    }).catch(err => {
      // Fallback if user profile doesn't exist yet
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).set({
        name: currentUser.name,
        email: currentUser.email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
        x: 0,
        y: 0,
        z: 150,
        px: null,
        py: null,
        pz: null,
        speaking: false,
        reputation: 0,
        badge: '🧑‍💻',
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(e => console.error("Error joining room fallback:", e));
    });

    heartbeatInterval = setInterval(() => {
      if (activeRoomId && peerId) {
        db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
          lastActive: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(e => console.error(e));
      }
    }, 5000);

    roomUnsubscribe = db.collection('rooms').doc(activeRoomId).onSnapshot(async doc => {
      if (doc.exists) {
        const data = doc.data();
        const studioTextarea = document.getElementById('studio-code-input');
        const modeSelect = document.getElementById('studio-render-mode');
        
        let databaseCode = data.code || '';
        if (data.compressedCode && !data.code) {
          if (window.DevSocialDB && typeof window.DevSocialDB._decompress === 'function') {
            try {
              databaseCode = await window.DevSocialDB._decompress(data.compressedCode);
            } catch (e) {
              console.error("Room code decompression failed:", e);
            }
          }
        }

        let codeUpdated = false;
        let modeUpdated = false;
        
        const isDatabaseCodeDefault = !databaseCode || 
                                       databaseCode.trim() === defaultThreeJsCode.trim() || 
                                       databaseCode.trim() === defaultGlslShaderCode.trim();
        
        const isLocalCodeCustom = studioTextarea.value.trim() !== defaultThreeJsCode.trim() && 
                                  studioTextarea.value.trim() !== defaultGlslShaderCode.trim() &&
                                  studioTextarea.value.trim() !== "";

        if (isDatabaseCodeDefault && isLocalCodeCustom && data.updatedBy !== currentUser.email) {
          // Upload local custom code to database instead of overwriting it
          updateRoomDocument({
            code: studioTextarea.value,
            mode: modeSelect ? modeSelect.value : 'threejs'
          });
        } else if (databaseCode && databaseCode !== studioTextarea.value && data.updatedBy !== currentUser.email) {
          isUpdatingFromRemote = true;
          const start = studioTextarea.selectionStart || 0;
          const end = studioTextarea.selectionEnd || 0;
          
          studioTextarea.value = databaseCode;
          updateEditorGutter();
          
          studioTextarea.setSelectionRange(start, end);
          isUpdatingFromRemote = false;
          codeUpdated = true;
        }
        
        if (data.mode && modeSelect && data.mode !== modeSelect.value && data.updatedBy !== currentUser.email) {
          modeSelect.value = data.mode;
          modeUpdated = true;
        }
        
        const hasNewRunTrigger = data.runTrigger && data.runTrigger !== lastProcessedRunTrigger && data.updatedBy !== currentUser.email;
        if (hasNewRunTrigger) {
          lastProcessedRunTrigger = data.runTrigger;
        }
        
        // Rulăm preview-ul doar la prima încărcare, când se schimbă modul de randare, sau când celălalt partener apasă pe "Run Preview"
        if (!hasLoadedInitialPreview || modeUpdated || hasNewRunTrigger) {
          runStudioPreview();
          hasLoadedInitialPreview = true;
        }
        
        updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
      } else {
        const studioTextarea = document.getElementById('studio-code-input');
        const modeSelect = document.getElementById('studio-render-mode');
        updateRoomDocument({
          code: studioTextarea.value,
          mode: modeSelect ? modeSelect.value : 'threejs'
        }).then(() => {
          updateSyncStatusText(currentLang === 'fr' ? 'Synchronisé' : 'Synced');
        });
      }
    }, err => {
      console.error("Firestore room subscription error:", err);
      updateSyncStatusText(currentLang === 'fr' ? 'Erreur de Connexion' : 'Connection Error');
      toast(currentLang === 'fr' ? "Erreur de connexion Firestore" : "Firestore connection error");
    });

    peersUnsubscribe = db.collection('rooms').doc(activeRoomId).collection('peers').onSnapshot(snapshot => {
      const peersList = [];
      const now = Date.now();
      const peerListContainer = document.getElementById('studio-peers-list');
      if (peerListContainer) peerListContainer.innerHTML = '';
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        
        let lastActiveTime = now;
        if (data.lastActive) {
          if (typeof data.lastActive.toDate === 'function') {
            lastActiveTime = data.lastActive.toDate().getTime();
          } else if (data.lastActive instanceof Date) {
            lastActiveTime = data.lastActive.getTime();
          } else if (typeof data.lastActive === 'number') {
            lastActiveTime = data.lastActive;
          } else if (data.lastActive.seconds) {
            lastActiveTime = data.lastActive.seconds * 1000;
          }
        }
        
        if (now - lastActiveTime > 60000) {
          if (id !== peerId) {
            db.collection('rooms').doc(activeRoomId).collection('peers').doc(id).delete().catch(e => {});
          }
          return;
        }

        // Listen for new reaction
        const rx = data.reaction;
        if (rx && rx.timestamp) {
          if (id !== peerId) {
            const lastTime = lastReactionTimes[id] || 0;
            if (rx.timestamp > lastTime && (now - rx.timestamp) < 3000) {
              lastReactionTimes[id] = rx.timestamp;
              showFloatingEmoji(rx.emoji, false, data.name);
              const iframe = document.getElementById('studio-preview-frame');
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({
                  type: 'peer_reaction',
                  peerId: id,
                  emoji: rx.emoji
                }, '*');
              }
            }
          }
        }
        
        peersList.push({
          id: id,
          name: data.name,
          avatar: data.avatar,
          x: data.x || 0,
          y: data.y || 0,
          z: data.z || 150,
          px: typeof data.px !== 'undefined' ? data.px : null,
          py: typeof data.py !== 'undefined' ? data.py : null,
          pz: typeof data.pz !== 'undefined' ? data.pz : null,
          speaking: data.speaking || false,
          reputation: data.reputation || 0,
          badge: data.badge || ''
        });
        
        if (peerListContainer) {
          const peerChip = document.createElement('div');
          peerChip.className = `peer-chip ${id === peerId ? 'self' : ''} ${data.speaking ? 'speaking' : ''}`;
          
          let badgeHtml = '';
          if (data.badge) {
            let badgeClass = 'collab';
            if (data.badge.includes('🏆') || data.badge.toLowerCase().includes('champ')) badgeClass = 'champ';
            else if (data.badge.includes('🔥') || data.badge.toLowerCase().includes('shader')) badgeClass = 'shader';
            badgeHtml = `<span class="badge-pill ${badgeClass}">${data.badge}</span>`;
          }
          
          const rep = data.reputation || 0;
          peerChip.innerHTML = `
            <img src="${data.avatar}" alt="Avatar">
            <span>${data.name} ${badgeHtml} <small style="opacity:0.6;margin-left:4px;">(${rep} Rep)</small> ${id === peerId ? (currentLang === 'fr' ? '(Vous)' : '(You)') : ''}</span>
          `;
          peerListContainer.appendChild(peerChip);
        }
      });
      
      const iframe = document.getElementById('studio-preview-frame');
      if (iframe && iframe.contentWindow) {
        const otherPeers = peersList.filter(p => p.id !== peerId);
        iframe.contentWindow.postMessage({
          type: 'peer_update',
          peers: otherPeers
        }, '*');
      }
    }, err => {
      console.error("Firestore peers subscription error:", err);
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
    hasLoadedInitialPreview = false;
    lastProcessedRunTrigger = null;
    
    document.getElementById('studio-room-input').disabled = false;
    document.getElementById('btn-studio-join').classList.remove('hidden');
    document.getElementById('btn-studio-leave').classList.add('hidden');
    document.getElementById('active-peers-container').classList.add('hidden');
    document.getElementById('studio-peers-list').innerHTML = '';
    document.getElementById('mp-reactions-bar').classList.add('hidden');
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (voiceBtn) {
      voiceBtn.classList.add('hidden');
      voiceBtn.classList.remove('voice-active');
      voiceBtn.textContent = currentLang === 'fr' ? '🎙️ Parler direct' : '🎙️ Join Voice';
    }
    if (typeof stopVoiceChat === 'function') {
      stopVoiceChat();
    }
    
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
    const modeSelect = document.getElementById('studio-render-mode');
    const mode = modeSelect ? modeSelect.value : 'threejs';
    const iframe = document.getElementById('studio-preview-frame');
    if (iframe) {
      iframe.srcdoc = getStudioIframeSrcDoc(code, mode);
    }
  }

  function sendReaction(emoji) {
    if (activeRoomId && peerId && typeof firebase !== 'undefined') {
      const db = firebase.firestore();
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
        reaction: {
          emoji: emoji,
          timestamp: Date.now()
        }
      }).then(() => {
        showFloatingEmoji(emoji, true);
      }).catch(e => console.error("Error sending reaction:", e));
    }
  }

  function showFloatingEmoji(emoji, isLocal, peerName = '') {
    const layer = document.getElementById('viewport-reactions-layer');
    if (!layer) return;
    
    const el = document.createElement('div');
    el.className = 'floating-emoji';
    
    if (isLocal) {
      el.textContent = emoji;
      el.style.left = '50%';
      el.style.bottom = '10px';
      el.style.transform = 'translateX(-50%)';
    } else {
      el.innerHTML = `<span style="font-size: 10px; background: rgba(0,0,0,0.65); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 2px 6px; border-radius: 4px; margin-right: 6px; font-weight: 700; white-space: nowrap; vertical-align: middle;">${peerName}</span>${emoji}`;
      el.style.left = (30 + Math.random() * 40) + '%';
      el.style.bottom = '10px';
    }
    
    layer.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 2500);
  }

  // Throttle state for multiplayer coordinates sync
  let lastCameraSentTime = 0;
  let lastPointerSentTime = 0;
  let cameraThrottleTimeout = null;
  let pointerThrottleTimeout = null;
  const THROTTLE_MS = 200; // 5 updates per second max

  function sendCameraUpdate(pos) {
    if (!activeRoomId || !peerId || typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
      x: pos.x,
      y: pos.y,
      z: pos.z
    }).catch(e => {});
  }

  function sendPointerUpdate(pos) {
    if (!activeRoomId || !peerId || typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
      px: pos.x,
      py: pos.y,
      pz: pos.z
    }).catch(e => {});
  }

  window.addEventListener('message', (event) => {
    if (!event.data) return;
    if (event.data.type === 'camera_move' && activeRoomId && peerId && typeof firebase !== 'undefined') {
      const pos = event.data.position;
      const now = Date.now();
      
      if (now - lastCameraSentTime >= THROTTLE_MS) {
        lastCameraSentTime = now;
        sendCameraUpdate(pos);
      } else {
        clearTimeout(cameraThrottleTimeout);
        cameraThrottleTimeout = setTimeout(() => {
          lastCameraSentTime = Date.now();
          sendCameraUpdate(pos);
        }, THROTTLE_MS - (now - lastCameraSentTime));
      }
    } else if (event.data.type === 'pointer_move' && activeRoomId && peerId && typeof firebase !== 'undefined') {
      const pos = event.data.position;
      const now = Date.now();
      
      if (now - lastPointerSentTime >= THROTTLE_MS) {
        lastPointerSentTime = now;
        sendPointerUpdate(pos);
      } else {
        clearTimeout(pointerThrottleTimeout);
        pointerThrottleTimeout = setTimeout(() => {
          lastPointerSentTime = Date.now();
          sendPointerUpdate(pos);
        }, THROTTLE_MS - (now - lastPointerSentTime));
      }
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

  // ==========================================
  // DEVSOCIAL AI HUB - ADVANCED FUNCTIONS
  // ==========================================

  // --- 1. WebRTC Voice Chat ---
  let localAudioStream = null;
  let peerConnections = {};
  let voiceSignalsUnsubscribe = null;
  let voiceActive = false;
  let audioContext = null;
  let analyser = null;
  let voiceLevelInterval = null;

  function initVoiceChat() {
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (!voiceBtn) return;

    voiceBtn.addEventListener('click', () => {
      if (!activeRoomId || !peerId) {
        toast(currentLang === 'fr' ? "Rejoignez une salle d'abord !" : "Join a room first!");
        return;
      }
      if (voiceActive) {
        stopVoiceChat();
      } else {
        startVoiceChat();
      }
    });
  }

  function startVoiceChat() {
    voiceActive = true;
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (voiceBtn) {
      voiceBtn.classList.add('voice-active');
      voiceBtn.textContent = currentLang === 'fr' ? '🎙️ Connecté' : '🎙️ Connected';
    }
    toast(currentLang === 'fr' ? "Connexion au canal vocal..." : "Connecting to voice channel...");

    const db = firebase.firestore();
    
    db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
      inVoice: true,
      speaking: false
    }).catch(e => {});

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
      localAudioStream = stream;
      
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let wasSpeaking = false;
        
        voiceLevelInterval = setInterval(() => {
          if (!voiceActive) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const isSpeakingNow = average > 12;
          
          if (isSpeakingNow !== wasSpeaking) {
            wasSpeaking = isSpeakingNow;
            db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
              speaking: isSpeakingNow
            }).catch(e => {});
          }
        }, 150);
      } catch(e) {
        console.warn("AudioContext error, falling back to basic join", e);
      }

      setupVoiceSignaling();
    }).catch(err => {
      console.warn("Microphone access denied or failed, running simulated mode", err);
      toast(currentLang === 'fr' ? "Audio simulé (Micro non autorisé)" : "Simulated Audio (Mic not allowed)");
      
      let wasSpeaking = false;
      voiceLevelInterval = setInterval(() => {
        if (!voiceActive) return;
        if (Math.random() < 0.15) {
          const isSpeakingNow = !wasSpeaking;
          wasSpeaking = isSpeakingNow;
          db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
            speaking: isSpeakingNow
          }).catch(e => {});
        }
      }, 1000);
    });
  }

  function setupVoiceSignaling() {
    if (typeof firebase === 'undefined' || !activeRoomId || !peerId) return;
    const db = firebase.firestore();

    voiceSignalsUnsubscribe = db.collection('rooms').doc(activeRoomId).collection('voice_signals')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const data = change.doc.data();
          if (change.type === 'added' || change.type === 'modified') {
            if (data.to === peerId) {
              handleVoiceSignal(change.doc.id, data);
            }
          }
        });
      });
      
    db.collection('rooms').doc(activeRoomId).collection('peers').get().then(snap => {
      snap.forEach(doc => {
        const otherId = doc.id;
        const otherData = doc.data();
        if (otherId !== peerId && otherData.inVoice) {
          initiateCallWith(otherId);
        }
      });
    });
  }

  function initiateCallWith(otherId) {
    if (peerConnections[otherId]) return;
    
    const db = firebase.firestore();
    const pc = createPeerConnection(otherId);
    peerConnections[otherId] = pc;
    
    if (localAudioStream) {
      localAudioStream.getTracks().forEach(track => {
        pc.addTrack(track, localAudioStream);
      });
    }
    
    pc.createOffer().then(offer => {
      return pc.setLocalDescription(offer);
    }).then(() => {
      db.collection('rooms').doc(activeRoomId).collection('voice_signals').doc(peerId + '_to_' + otherId).set({
        from: peerId,
        to: otherId,
        type: 'offer',
        sdp: pc.localDescription.sdp,
        timestamp: Date.now()
      });
    }).catch(e => console.error("Error creating RTC offer:", e));
  }

  function handleVoiceSignal(signalId, data) {
    const otherId = data.from;
    const db = firebase.firestore();
    
    if (data.type === 'offer') {
      let pc = peerConnections[otherId];
      if (!pc) {
        pc = createPeerConnection(otherId);
        peerConnections[otherId] = pc;
        if (localAudioStream) {
          localAudioStream.getTracks().forEach(track => {
            pc.addTrack(track, localAudioStream);
          });
        }
      }
      
      pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: data.sdp }))
        .then(() => pc.createAnswer())
        .then(answer => pc.setLocalDescription(answer))
        .then(() => {
          db.collection('rooms').doc(activeRoomId).collection('voice_signals').doc(peerId + '_to_' + otherId).set({
            from: peerId,
            to: otherId,
            type: 'answer',
            sdp: pc.localDescription.sdp,
            timestamp: Date.now()
          });
          db.collection('rooms').doc(activeRoomId).collection('voice_signals').doc(signalId).delete().catch(e => {});
        }).catch(e => console.error("Error responding to offer:", e));
        
    } else if (data.type === 'answer') {
      const pc = peerConnections[otherId];
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: data.sdp }))
          .then(() => {
            db.collection('rooms').doc(activeRoomId).collection('voice_signals').doc(signalId).delete().catch(e => {});
          }).catch(e => console.error("Error setting answer description:", e));
      }
    } else if (data.type === 'candidate') {
      const pc = peerConnections[otherId];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(e => {});
      }
    }
  }

  function createPeerConnection(otherId) {
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    
    const pc = new RTCPeerConnection(config);
    const db = firebase.firestore();
    
    pc.onicecandidate = event => {
      if (event.candidate) {
        db.collection('rooms').doc(activeRoomId).collection('voice_signals').add({
          from: peerId,
          to: otherId,
          type: 'candidate',
          candidate: event.candidate.toJSON(),
          timestamp: Date.now()
        });
      }
    };
    
    pc.ontrack = event => {
      let remoteAudio = document.getElementById('audio_peer_' + otherId);
      if (!remoteAudio) {
        remoteAudio = document.createElement('audio');
        remoteAudio.id = 'audio_peer_' + otherId;
        remoteAudio.autoplay = true;
        document.body.appendChild(remoteAudio);
      }
      remoteAudio.srcObject = event.streams[0];
    };
    
    return pc;
  }

  function stopVoiceChat() {
    voiceActive = false;
    const voiceBtn = document.getElementById('btn-voice-toggle');
    if (voiceBtn) {
      voiceBtn.classList.remove('voice-active');
      voiceBtn.textContent = currentLang === 'fr' ? '🎙️ Parler direct' : '🎙️ Join Voice';
    }
    
    if (voiceSignalsUnsubscribe) {
      voiceSignalsUnsubscribe();
      voiceSignalsUnsubscribe = null;
    }
    
    if (voiceLevelInterval) {
      clearInterval(voiceLevelInterval);
      voiceLevelInterval = null;
    }
    
    if (localAudioStream) {
      localAudioStream.getTracks().forEach(track => track.stop());
      localAudioStream = null;
    }
    
    Object.keys(peerConnections).forEach(id => {
      peerConnections[id].close();
      const audioEl = document.getElementById('audio_peer_' + id);
      if (audioEl) audioEl.remove();
    });
    peerConnections = {};
    
    if (activeRoomId && peerId && typeof firebase !== 'undefined') {
      const db = firebase.firestore();
      db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
        inVoice: false,
        speaking: false
      }).catch(e => {});
    }
  }



  // --- 3. AI Prefabs Snippets Injection ---
  function initPrefabs() {
    const cards = document.querySelectorAll('.prefab-card');
    const editor = document.getElementById('studio-code-input');
    const runBtn = document.getElementById('btn-studio-run');
    
    const snippets = {
      'glowing-torus': `// Glowing Torus Preset
// A rotating neon torus knot with physical reflectivity.
var geom = new THREE.TorusKnotGeometry(12, 3.5, 120, 16);
var mat = new THREE.MeshPhysicalMaterial({
  color: 0x0ea5e9,
  emissive: 0x0284c7,
  roughness: 0.08,
  metalness: 0.9,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
});
var knot = new THREE.Mesh(geom, mat);
scene.add(knot);

var light = new THREE.PointLight(0x0ea5e9, 2.5, 120);
light.position.set(20, 20, 20);
scene.add(light);

return function() {
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.015;
};`,
      'clockwork-gears': `// Clockwork Gears Preset
// Animated steampunk gearwheel with mechanical axle.
var gearGroup = new THREE.Group();
scene.add(gearGroup);

var gearM = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
var axleM = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });

var baseGear = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 2.5, 32), gearM);
baseGear.rotation.x = Math.PI / 2;
gearGroup.add(baseGear);

var axle = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 9, 16), axleM);
axle.rotation.x = Math.PI / 2;
gearGroup.add(axle);

for (var i = 0; i < 16; i++) {
  var angle = (i / 16) * Math.PI * 2;
  var tooth = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 4.5), gearM);
  tooth.position.set(Math.cos(angle) * 15, Math.sin(angle) * 15, 0);
  tooth.rotation.z = angle;
  gearGroup.add(tooth);
}

return function() {
  gearGroup.rotation.z += 0.012;
};`,
      'particle-matrix': `// Particle Matrix Preset
// Dynamic wave matrix of particles simulating cybernetic flow.
var count = 2000;
var geom = new THREE.BufferGeometry();
var positions = new Float32Array(count * 3);

for (var i = 0; i < count; i++) {
  var x = (Math.random() - 0.5) * 160;
  var y = (Math.random() - 0.5) * 160;
  var z = (Math.random() - 0.5) * 160;
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
var mat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 1.6, transparent: true, opacity: 0.8 });
var points = new THREE.Points(geom, mat);
scene.add(points);

return function() {
  var posAttr = points.geometry.attributes.position;
  var time = Date.now() * 0.0012;
  for (var i = 0; i < count; i++) {
    var x = posAttr.getX(i);
    var z = posAttr.getZ(i);
    var newY = Math.sin(x * 0.06 + time) * 8 + Math.cos(z * 0.06 + time) * 8;
    posAttr.setY(i, newY);
  }
  posAttr.needsUpdate = true;
  points.rotation.y += 0.0015;
};`
    };

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const preset = card.dataset.preset;
        if (snippets[preset] && editor) {
          editor.value = snippets[preset];
          
          // Force render mode select to 'threejs' since these presets are designed for Three.js 3D rendering
          const modeSelect = document.getElementById('studio-render-mode');
          if (modeSelect) {
            modeSelect.value = 'threejs';
            modeSelect.dispatchEvent(new Event('change'));
          }
          
          toast(currentLang === 'fr' ? "Préfabriqué injecté ! Exécution du rendu..." : "Prefab injected! Running render...");
          if (runBtn) runBtn.click();
        }
      });
    });
  }

  // --- 4. Gamification, Badges, and Leaderboard ---
  function initLeaderboard() {
    if (typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    const leaderboardContainer = document.getElementById('reputation-leaderboard');
    if (!leaderboardContainer) return;

    db.collection('users').orderBy('reputation', 'desc').limit(5)
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          seedMockLeaderboard();
          return;
        }

        leaderboardContainer.innerHTML = '';
        let rank = 1;
        snapshot.forEach(doc => {
          const u = doc.data();
          const item = document.createElement('div');
          item.className = 'leaderboard-item';
          
          let badgeHtml = '';
          if (u.badge) {
            let badgeClass = 'collab';
            if (u.badge.includes('🏆') || u.badge.toLowerCase().includes('champ')) badgeClass = 'champ';
            else if (u.badge.includes('🔥') || u.badge.toLowerCase().includes('shader')) badgeClass = 'shader';
            badgeHtml = `<span class="badge-pill ${badgeClass}">${u.badge}</span>`;
          }

          item.innerHTML = `
            <span class="leaderboard-rank">#${rank}</span>
            <img src="${u.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + u.name}" alt="${u.name}">
            <span class="leaderboard-name">${u.name} ${badgeHtml}</span>
            <span class="leaderboard-score">${u.reputation || 0} XP</span>
          `;
          leaderboardContainer.appendChild(item);
          rank++;
        });
      }, err => console.error("Error fetching leaderboard:", err));
  }

  function seedMockLeaderboard() {
    const db = firebase.firestore();
    const mockUsers = [
      { name: "EmmaArchitect", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Emma", reputation: 240, badge: "🏆" },
      { name: "Lucas_3D", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lucas", reputation: 180, badge: "🔥" },
      { name: "SteampunkMaker", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Chrono", reputation: 90, badge: "🧑‍💻" }
    ];

    mockUsers.forEach(u => {
      db.collection('users').doc(u.name.toLowerCase() + '@example.com').set(u).catch(e => {});
    });

    if (currentUser) {
      db.collection('users').doc(currentUser.email).set({
        name: currentUser.name,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
        reputation: 35,
        badge: "🧑‍💻"
      }).catch(e => {});
    }
  }

  function syncLocalUserReputationAndLeaderboard() {
    if (!currentUser || typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    
    db.collection('devsocial_posts').get().then(snap => {
      let postsCount = 0;
      let likesCount = 0;
      
      snap.forEach(doc => {
        const p = doc.data();
        if (p.user === currentUser.name) {
          postsCount++;
          likesCount += (p.likes || 0);
        }
      });
      
      db.collection('users').doc(currentUser.email).get().then(doc => {
        let battleRep = 0;
        let earnedBadge = '🧑‍💻';
        if (doc.exists) {
          const d = doc.data();
          battleRep = d.battleReputation || 0;
          earnedBadge = d.badge || '🧑‍💻';
        }
        
        let totalRep = (postsCount * 12) + (likesCount * 6) + battleRep;
        
        if (totalRep > 120) earnedBadge = '🏆';
        else if (totalRep > 60) earnedBadge = '🔥';
        
        db.collection('users').doc(currentUser.email).set({
          name: currentUser.name,
          email: currentUser.email,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`,
          reputation: totalRep,
          badge: earnedBadge
        }, { merge: true }).catch(e => {});
        
        if (activeRoomId && peerId) {
          db.collection('rooms').doc(activeRoomId).collection('peers').doc(peerId).update({
            reputation: totalRep,
            badge: earnedBadge
          }).catch(e => {});
        }
      });
    });
  }

})();
