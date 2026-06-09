// DevSocial AI Hub - Main Application Controller (Standalone Version)
(function() {
  'use strict';

  // State
  let currentLang = 'en';
  let activeTab = 'feed';
  let posts = [];
  const renderers = {}; // renderer map for active 3D card canvases
  const animLoops = {};  // animation loop callbacks for active 3D card canvases

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
    // Load database
    posts = window.DevSocialDB.getPosts();
    
    // Restore saved language preference or default to FR
    const savedLang = localStorage.getItem('hub_lang') || 'fr';
    switchTab('feed');
    switchLanguage(savedLang);
    
    // Build initial view
    renderFeed();
    renderGallery();
    initAIChat();

    // Bind event listeners
    bindEvents();
    
    // Start global animation loop
    animateAll();
  });

  // 2. TAB SWITCHING
  function switchTab(tabId) {
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

    // Re-render feed and gallery to apply dynamic text updates
    if (activeTab === 'feed') renderFeed();
    if (activeTab === 'gallery') renderGallery();
  }

  // 4. RENDER FEED POSTS
  function renderFeed() {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
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
            <span class="fork-badge"><i class="fa-solid fa-code"></i> WebGL Ready</span>
            <button class="btn-delete-post" onclick="deletePost(${post.id})" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); color: #f87171; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" title="${currentLang === 'fr' ? 'Supprimer la publication (Admin)' : 'Delete Post (Admin)'}">
              <i class="fa-solid fa-trash" style="font-size: 11px;"></i>
            </button>
          </div>
        </div>
        
        <div class="post-caption">${post.caption}</div>
        
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
    const count = window.DevSocialDB.likePost(postId);
    const btn = document.querySelector(`.post-card[data-id="${postId}"] .btn-like`);
    if (btn) {
      btn.querySelector('span').textContent = count;
      btn.classList.add('liked');
      toast(currentLang === 'fr' ? "Aimé !" : "Liked!");
    }
  };

  window.deletePost = function(postId) {
    if (confirm(currentLang === 'fr' ? "Êtes-vous sûr de vouloir supprimer cette publication en tant qu'Administrateur ?" : "Are you sure you want to delete this post as Administrator?")) {
      posts = window.DevSocialDB.deletePost(postId);
      stopAll3DViews();
      renderFeed();
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
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;
    
    const comment = {
      user: "Creator",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
      text: text
    };
    
    const comments = window.DevSocialDB.addComment(postId, comment);
    input.value = '';
    
    const list = document.getElementById(`comments-list-${postId}`);
    if (list) {
      list.innerHTML = comments.map(c => `
        <div class="comment-item">
          <img src="${c.avatar}" alt="User">
          <div class="comment-meta">
            <h5>${c.user}</h5>
            <p>${c.text}</p>
          </div>
        </div>
      `).join('');
      
      const btn = document.querySelector(`.post-card[data-id="${postId}"] button[onclick^="toggleComments"] span`);
      if (btn) btn.textContent = currentLang === 'fr' ? `Commentaires (${comments.length})` : `Comments (${comments.length})`;
      
      list.scrollTop = list.scrollHeight;
    }
  };

  // 8. FORK CODE MODAL (Wraps in HTML and copies/forks)
  window.openForkCodeModal = function(postId) {
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

    const newPost = {
      id: Date.now(),
      user: "Creator",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
      userTag: "ADMIN Maker",
      caption: `${desc} #custom3D`,
      likes: 0,
      comments: [],
      preset: preset === 'none' ? 'custom' : preset,
      hasThree: true,
      code: code
    };

    posts = window.DevSocialDB.savePost(newPost);
    closeModalNewPost();
    renderFeed();
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

    // Fork/Load in Studio saves code to localStorage and redirects back to STUDIO 3D PRO editor
    btnConfirmForkAction.onclick = () => {
      const rawCode = forkCodeDisplay.value;
      const wrappedHtml = wrapInFullHtml(rawCode, forkModalTitle.textContent);
      
      localStorage.setItem('forked_three_code', wrappedHtml);
      modalForkCode.classList.remove('active');
      
      toast(currentLang === 'fr' ? "🔌 Chargement dans l'éditeur..." : "🔌 Loading into editor...");
      setTimeout(() => {
        window.location.href = '../STUDIO 3D 4D PRO/index.html';
      }, 800);
    };

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
