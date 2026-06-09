// DevSocial AI Hub - Main Application Controller (Integrated Version)
(function() {
  'use strict';

  // State
  let currentLang = 'fr';
  let activeTab = 'feed';
  let posts = [];
  const renderers = {}; // renderer map for active 3D card canvases
  const animLoops = {};  // animation loop callbacks for active 3D card canvases

  // Deferred initialization until DOM is ready
  window.addEventListener('load', () => {
    const overlay = document.getElementById('social-overlay');
    if (!overlay) return;

    // DOM Elements scoped to social-overlay
    const navItems = overlay.querySelectorAll('.nav-menu .nav-item');
    const viewPanels = overlay.querySelectorAll('.view-panel');
    const postsContainer = overlay.querySelector('#posts-container');
    const galleryContainer = overlay.querySelector('#gallery-container');
    
    // Post Modals Elements
    const modalNewPost = overlay.querySelector('#modal-new-post');
    const btnTriggerNewPost = overlay.querySelector('#btn-trigger-new-post');
    const btnCloseNewPost = overlay.querySelector('#btn-close-new-post');
    const btnCancelNewPost = overlay.querySelector('#btn-cancel-new-post');
    const btnSubmitNewPost = overlay.querySelector('#btn-submit-new-post');
    
    const postTitleInput = overlay.querySelector('#post-title-input');
    const postDescInput = overlay.querySelector('#post-desc-input');
    const postCodeInput = overlay.querySelector('#post-code-input');
    const postPresetSelect = overlay.querySelector('#post-preset-select');
    
    // Fork Modal Elements
    const modalForkCode = overlay.querySelector('#modal-fork-code');
    const btnCloseFork = overlay.querySelector('#btn-close-fork');
    const btnCopyForkCode = overlay.querySelector('#btn-copy-fork-code');
    const btnConfirmForkAction = overlay.querySelector('#btn-confirm-fork-action');
    const forkCodeDisplay = overlay.querySelector('#fork-code-display');
    const forkModalTitle = overlay.querySelector('#fork-modal-title');

    // AI Elements
    const chatMessages = overlay.querySelector('#chat-messages');
    const chatUserInput = overlay.querySelector('#chat-user-input');
    const btnSendChat = overlay.querySelector('#btn-send-chat');

    // Load database
    posts = window.DevSocialDB.getPosts();
    
    // Initialize tab and language based on page settings
    currentLang = window.currentLang || 'fr';
    switchTab('feed');
    switchLanguage(currentLang);
    
    // Build initial view
    renderFeed();
    renderGallery();
    initAIChat();

    // Bind event listeners
    bindEvents();
    
    // Start global animation loop
    animateAll();

    // Expose control API
    window.DevSocialApp = {
      initSocial: function() {
        switchTab('feed');
        renderFeed();
        renderGallery();
      },
      stopAll3DViews: stopAll3DViews,
      switchLanguage: switchLanguage
    };

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

      // Update static labels in UI
      overlay.querySelectorAll('[data-en]').forEach(el => {
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

        const commentsBtnLabel = currentLang === 'fr' ? `Commentaires (${post.comments.length})` : `Comments (${post.comments.length})`;
        const forkBtnLabel = currentLang === 'fr' ? `Importer` : `Fork Code`;

        card.innerHTML = `
          <div class="post-header">
            <div class="post-user-info">
              <img src="${post.userAvatar}" alt="Avatar">
              <div class="post-user-meta">
                <h4>${post.user}</h4>
                <span>${post.userTag}</span>
              </div>
            </div>
            <span class="fork-badge">🕹️ WebGL Ready</span>
          </div>
          
          <div class="post-caption">${post.caption}</div>
          
          <!-- Live Three.js Preview -->
          <div class="post-viewport-container" id="viewport-${post.id}">
            <div class="viewport-overlay">✨ ${currentLang === 'fr' ? 'Faites glisser pour tourner' : 'Drag to rotate 3D'}</div>
          </div>
          
          <div class="post-actions">
            <div class="action-buttons-group">
              <button class="btn-post-action btn-like" data-post-id="${post.id}">
                ❤️ <span>${post.likes}</span>
              </button>
              <button class="btn-post-action btn-comment-toggle" data-post-id="${post.id}">
                💬 <span>${commentsBtnLabel}</span>
              </button>
            </div>
            <button class="btn-fork-code" data-post-id="${post.id}">
              🔌 ${forkBtnLabel}
            </button>
          </div>

          <!-- Comments Dropdown -->
          <div class="post-comments-section" id="comments-section-${post.id}" style="display: none;">
            <div class="comments-list" id="comments-list-${post.id}">
              ${commentsHtml}
            </div>
            <div class="comment-input-bar">
              <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="${currentLang === 'fr' ? 'Écrire un commentaire...' : 'Write a comment...'}">
              <button class="btn-send-comment" data-post-id="${post.id}">🚀</button>
            </div>
          </div>
        `;
        
        postsContainer.appendChild(card);
        
        // Initialize Three.js viewport in card
        setTimeout(() => initThreeViewport(post.id, post.preset, post.code), 50);
      });

      // Attach dynamic actions listeners
      postsContainer.querySelectorAll('.btn-like').forEach(btn => {
        btn.onclick = () => likePost(parseInt(btn.dataset.postId));
      });
      postsContainer.querySelectorAll('.btn-comment-toggle').forEach(btn => {
        btn.onclick = () => toggleComments(parseInt(btn.dataset.postId));
      });
      postsContainer.querySelectorAll('.btn-fork-code').forEach(btn => {
        btn.onclick = () => openForkCodeModal(parseInt(btn.dataset.postId));
      });
      postsContainer.querySelectorAll('.btn-send-comment').forEach(btn => {
        btn.onclick = () => submitComment(parseInt(btn.dataset.postId));
      });
      postsContainer.querySelectorAll('.comment-input').forEach(input => {
        input.onkeydown = (e) => {
          if (e.key === 'Enter') {
            const id = parseInt(input.id.replace('comment-input-', ''));
            submitComment(id);
          }
        };
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
                <span>❤️ ${post.likes}</span>
                <span>💬 ${post.comments.length}</span>
              </div>
              <button class="btn-fork-code btn-gallery-fork" style="padding: 6px 12px; font-size: 10.5px;" data-post-id="${post.id}">
                🔌 ${forkLabel}
              </button>
            </div>
          </div>
        `;
        
        galleryContainer.appendChild(item);
        setTimeout(() => initThreeViewport(post.id, post.preset, post.code, true), 100);
      });

      galleryContainer.querySelectorAll('.btn-gallery-fork').forEach(btn => {
        btn.onclick = () => openForkCodeModal(parseInt(btn.dataset.postId));
      });
    }

    // 6. THREE.JS VIEWPORT RENDERER
    function initThreeViewport(postId, preset, codeString, isGallery = false) {
      const containerId = isGallery ? `gallery-viewport-${postId}` : `viewport-${postId}`;
      const container = overlay.querySelector(`#${containerId}`);
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
        // Evaluate custom user script safely inside custom container sandbox
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

    // Particle cloud
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
    function likePost(postId) {
      const count = window.DevSocialDB.likePost(postId);
      const btn = postsContainer.querySelector(`.post-card[data-id="${postId}"] .btn-like`);
      if (btn) {
        btn.querySelector('span').textContent = count;
        btn.classList.add('liked');
        if (window.toast) window.toast(currentLang === 'fr' ? "Aimé !" : "Liked!");
      }
    }

    function toggleComments(postId) {
      const sec = overlay.querySelector(`#comments-section-${postId}`);
      if (sec) {
        sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
      }
    }

    function submitComment(postId) {
      const input = overlay.querySelector(`#comment-input-${postId}`);
      const text = input.value.trim();
      if (!text) return;
      
      const comment = {
        user: "Creator",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
        text: text
      };
      
      const comments = window.DevSocialDB.addComment(postId, comment);
      input.value = '';
      
      // Update comments UI
      const list = overlay.querySelector(`#comments-list-${postId}`);
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
        
        // Update count badge
        const btn = postsContainer.querySelector(`.post-card[data-id="${postId}"] .btn-comment-toggle span`);
        if (btn) btn.textContent = currentLang === 'fr' ? `Commentaires (${comments.length})` : `Comments (${comments.length})`;
        
        list.scrollTop = list.scrollHeight;
      }
    }

    // 8. FORK CODE MODAL
    function openForkCodeModal(postId) {
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      forkModalTitle.textContent = currentLang === 'fr' ? `Importer le code de @${post.user}` : `Fork from @${post.user}`;
      forkCodeDisplay.value = post.code || `// Sample Three.js configuration\ncreateThreeScene(scene);`;
      modalForkCode.classList.add('active');
    }

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
      if (window.toast) window.toast(currentLang === 'fr' ? "Modèle partagé avec succès !" : "Model shared successfully!");
    };

    // 10. AI CHAT CONTROLLER
    function initAIChat() {
      // Clear previous messages
      chatMessages.innerHTML = '';
      // Welcome message
      const botMsg = window.StudioAI.getWelcomeMessage(currentLang);
      appendChatMessage('bot', botMsg);
    }

    function appendChatMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = `message ${sender}`;
      
      if (sender === 'bot') {
        msg.innerHTML = `
          <div class="bot-ico">🤖</div>
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

    // Expose useHint to global
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

      // Fork modal closes
      btnCloseFork.onclick = () => modalForkCode.classList.remove('active');
      
      modalForkCode.onclick = (e) => {
        if (e.target === modalForkCode) modalForkCode.classList.remove('active');
      };

      btnCopyForkCode.onclick = () => {
        navigator.clipboard.writeText(forkCodeDisplay.value);
        btnCopyForkCode.innerHTML = `✅ ${currentLang === 'fr' ? 'Copié !' : 'Copied!'}`;
        setTimeout(() => {
          btnCopyForkCode.innerHTML = `📋 ${currentLang === 'fr' ? 'Copier le code' : 'Copy Code'}`;
        }, 2000);
      };

      btnConfirmForkAction.onclick = () => {
        modalForkCode.classList.remove('active');
        
        // Write the forked Three.js scene code directly into the main editor
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
          // If code doesn't start with standard HTML layout, wrap it so it renders
          let finalCode = forkCodeDisplay.value;
          if (!finalCode.includes('<!DOCTYPE html>') && !finalCode.includes('<html>')) {
            finalCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; overflow: hidden; background: #000; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <script>
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 150);
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);
    
    // Injected Scene Logic
    ${forkCodeDisplay.value}
    
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

          codeEditor.value = finalCode;
          codeEditor.dispatchEvent(new Event('input'));
        }
        
        // Call global runPreview to compile & load iframe
        if (typeof window.runPreview === 'function') {
          window.runPreview();
        }
        
        // Hide social modal/overlay
        if (typeof window.hideSocial === 'function') {
          window.hideSocial();
        }
        
        // Switch back to 3D Design tab
        if (typeof window.toggleMode === 'function') {
          window.toggleMode('design');
        }
        
        if (window.toast) {
          window.toast(currentLang === 'fr' ? '✅ Modèle chargé dans l\'éditeur Studio !' : '✅ Model loaded inside Studio Editor!');
        }
      };

      // Feed Search Filter
      const searchInput = overlay.querySelector('#feed-search');
      searchInput.oninput = () => {
        const query = searchInput.value.toLowerCase().trim();
        const cards = postsContainer.querySelectorAll('.post-card');
        
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
  });

})();
