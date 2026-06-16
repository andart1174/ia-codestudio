// DevSocial AI Hub - Local Database Engine
(function() {
  'use strict';

  // 1. Initial Mock Data (Realistic Three.js configurations)
  const MOCK_POSTS = [
    {
      id: 1,
      user: "EmmaArchitect",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Emma",
      userTag: "Premium Maker",
      caption_en: "Check out my new procedural Clockwork mechanism! Fused with brass gears and custom speed scaling. Tagging #steampunk #webgl",
      caption_fr: "Découvrez mon nouveau mécanisme d'horlogerie procédural ! Fusionné avec des engrenages en laiton et une échelle de vitesse personnalisée. #steampunk #webgl",
      likes: 38,
      comments: [
        { user: "Lucas_3D", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lucas", text: "Incredible teeth meshing details! Is this Three.js CylinderGeometry?" },
        { user: "Admin", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin", text: "Superb work Emma, the tourbillon cages look flawless." }
      ],
      preset: "clockwork",
      hasThree: true,
      code: `// Steampunk Clockwork Preset Code
var chrono = new THREE.Group();
scene.add(chrono);

var mat = new THREE.MeshPhysicalMaterial({color: 0xd4af37, metalness: 0.9, roughness: 0.2, clearcoat: 1.0});
var axleMat = new THREE.MeshStandardMaterial({color: 0x3a3d40, metalness: 0.8});

// Center main dial ring
var dial = new THREE.Mesh(new THREE.TorusGeometry(32, 1.0, 8, 32), mat);
chrono.add(dial);

// 64T Driving Gear
var gearG = new THREE.CylinderGeometry(20, 20, 2.5, 32);
var gear = new THREE.Mesh(gearG, mat);
gear.position.set(0, 0, -2);
gear.rotation.x = Math.PI/2;
chrono.add(gear);

var axle = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 8), axleMat);
gear.add(axle);

// Adding indicator hands
var hand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 22, 0.8), mat);
hand.position.y = 9;
var handGroup = new THREE.Group();
handGroup.add(hand);
handGroup.position.z = 2;
chrono.add(handGroup);

// Register anim loop
var tick = 0;
return function() {
  tick += 0.015;
  gear.rotation.y = tick;
  handGroup.rotation.z = -tick * 4;
};`
    },
    {
      id: 2,
      user: "Lucas_3D",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lucas",
      userTag: "Creator",
      caption_en: "Futuristic live Webcam point cloud avatar. Made using custom particle buffer geometry in WebGL. #avatar #neuro",
      caption_fr: "Avatar futuriste en nuage de points webcam. Conçu avec une géométrie de tampon de particules de webcam en WebGL. #avatar #neuro",
      likes: 24,
      comments: [
        { user: "EmmaArchitect", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Emma", text: "Wow, how did you parse the camera stream depth so fast?" }
      ],
      preset: "avatar",
      hasThree: true,
      code: `// Live Webcam Avatar Point Cloud Simulation Code
var count = 3000;
var geom = new THREE.BufferGeometry();
var pos = new Float32Array(count * 3);

for (var i = 0; i < count; i++) {
  var theta = Math.random() * Math.PI * 2;
  var phi = Math.acos((Math.random() * 2) - 1);
  var r = 30 + Math.random() * 40; // noise sphere
  
  // Custom face point cloud mapping
  if (Math.sin(theta) > 0 && Math.sin(phi) > 0) {
    r = 30 + (Math.sin(theta*10)*Math.cos(phi*10))*3;
  }
  
  pos[i*3] = r * Math.sin(phi) * Math.cos(theta);
  pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  pos[i*3+2] = r * Math.cos(phi);
}

geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
var mat = new THREE.PointsMaterial({color: 0x0ea5e9, size: 2.0, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending});
var points = new THREE.Points(geom, mat);
scene.add(points);

return function() {
  points.rotation.y += 0.005;
  points.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2;
};`
    },
    {
      id: 3,
      user: "SteampunkMaker",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Chrono",
      userTag: "Maker",
      caption_en: "Rendering a wireframe parametric mountain topography using custom sin/cos displacement maps. #math #surface #threejs",
      caption_fr: "Rendu d'une topographie de montagne paramétrique en fil de fer utilisant des cartes de displacement sin/cos. #math #surface #threejs",
      likes: 19,
      comments: [],
      preset: "landscape",
      hasThree: true,
      code: `// Wireframe Parametric Surface Code
var size = 60;
var geom = new THREE.PlaneGeometry(160, 160, size, size);
var pos = geom.attributes.position.array;

for (var i = 0; i < pos.length; i += 3) {
  var x = pos[i];
  var y = pos[i+1];
  // Sin/cos displace height
  var d = Math.sqrt(x*x + y*y);
  pos[i+2] = Math.sin(d * 0.12 - Math.PI/2) * 15 + Math.cos(x * 0.05) * Math.sin(y * 0.05) * 8;
}

geom.computeVertexNormals();
var mat = new THREE.MeshBasicMaterial({color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.4});
var mesh = new THREE.Mesh(geom, mat);
mesh.rotation.x = -Math.PI / 3;
scene.add(mesh);

return function() {
  mesh.rotation.z += 0.003;
};`
    }
  ];

  // 2. Initialize Firebase using the configuration from the portal with robust LocalStorage fallback
  const firebaseConfig = {
    apiKey: "AIzaSyBXJ0LstZF7c3-GI2eDtv6V7vsx0scgXHk",
    authDomain: "ia-codestudio.firebaseapp.com",
    projectId: "ia-codestudio",
    storageBucket: "ia-codestudio.firebasestorage.app",
    messagingSenderId: "977495027432",
    appId: "1:977495027432:web:fb93e8ae7712c70df2635d",
    measurementId: "G-YVNWE5Q6KB"
  };

  let useFirestore = false;
  let db = null;

  if (typeof window.firebase === 'undefined') {
    console.warn("Firebase SDK was not loaded (blocked by adblocker?). Setting up mock Firebase & LocalStorage fallback.");
    window.firebase = {
      apps: [],
      initializeApp: function() {
        return { name: '[MockApp]' };
      },
      firestore: function() {
        const mockQuery = {
          limit: function() { return this; },
          orderBy: function() { return this; },
          where: function() { return this; },
          get: function() {
            return Promise.resolve({
              empty: true,
              size: 0,
              docs: [],
              forEach: function() {}
            });
          },
          doc: function() {
            return {
              get: function() {
                return Promise.resolve({
                  exists: false,
                  data: function() { return {}; }
                });
              },
              set: function() { return Promise.resolve(); },
              update: function() { return Promise.resolve(); },
              delete: function() { return Promise.resolve(); },
              onSnapshot: function(callback) {
                // Return dummy unsubscribe function
                return function() {};
              }
            };
          },
          onSnapshot: function(callback) {
            // Return dummy unsubscribe function
            return function() {};
          }
        };

        return {
          collection: function() {
            return mockQuery;
          }
        };
      }
    };
    window.firebase.firestore.FieldValue = {
      increment: function(n) { return n; },
      arrayUnion: function(val) { return [val]; },
      serverTimestamp: function() { return new Date(); }
    };
  } else {
    try {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      db = window.firebase.firestore();
      useFirestore = true;
      console.log("Firebase/Firestore initialized successfully.");
    } catch (e) {
      console.warn("Firebase initialization failed, falling back to LocalStorage:", e);
    }
  }

  // List of subscribers for local storage updates
  let postListeners = [];
  let challengeListeners = [];
  let configListeners = [];

  // Compression/Decompression utilities (using native browser APIs)
  async function compressString(str) {
    if (typeof CompressionStream === 'undefined') return str;
    try {
      const stream = new Response(str).body.pipeThrough(new CompressionStream('gzip'));
      const buffer = await new Response(stream).arrayBuffer();
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i += 32000) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 32000));
      }
      return btoa(binary);
    } catch (e) {
      console.warn("Gzip compression failed:", e);
      return str;
    }
  }

  async function decompressString(base64) {
    if (typeof DecompressionStream === 'undefined') return base64;
    try {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'));
      return await new Response(stream).text();
    } catch (e) {
      console.warn("Gzip decompression failed:", e);
      return base64;
    }
  }

  async function notifyPostListeners() {
    let posts = [];
    try {
      posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]');
    } catch (e) {
      console.error("Error parsing posts from localstorage:", e);
    }
    if (posts.length === 0) {
      posts = [...MOCK_POSTS];
      localStorage.setItem('devsocial_posts', JSON.stringify(posts));
    }
    
    // Decompress posts before invoking listeners
    const promises = [];
    posts.forEach(post => {
      if (post.compressedCode && !post.code) {
        promises.push(
          decompressString(post.compressedCode)
            .then(decompressed => {
              post.code = decompressed;
            })
            .catch(err => {
              console.error("Decompression failed for local post in notifier", post.id, err);
            })
        );
      }
    });
    
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    
    posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    postListeners.forEach(cb => {
      try { cb(posts); } catch(e){}
    });
  }

  // 3. Database Helper Methods API - Unified Firebase Firestore & LocalStorage implementation
  window.DevSocialDB = {
    initFirestoreSeed: function() {
      if (useFirestore && db) {
        db.collection('devsocial_posts').limit(1).get().then(snap => {
          if (snap.empty) {
            MOCK_POSTS.forEach((post, index) => {
              post.createdAt = Date.now() - (index * 3600000);
              db.collection('devsocial_posts').doc(String(post.id)).set(post)
                .catch(err => console.error("Error seeding Firestore:", err));
            });
          } else {
            MOCK_POSTS.forEach(post => {
              db.collection('devsocial_posts').doc(String(post.id)).update({
                code: post.code
              }).catch(err => console.warn("Could not auto-update mock post code:", err));
            });
          }
        }).catch(err => {
          console.warn("Firestore collection devsocial_posts is not initialized or accessible. Using LocalStorage fallback.", err);
          useFirestore = false;
        });
      } else {
        let posts = [];
        try {
          posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]');
        } catch (e) {}
        if (posts.length === 0) {
          posts = [...MOCK_POSTS];
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        }
      }
    },

    subscribePosts: function(callback) {
      this.initFirestoreSeed();
      if (useFirestore && db) {
        return db.collection('devsocial_posts')
                 .orderBy('createdAt', 'desc')
                 .onSnapshot(async snapshot => {
                   const postsList = [];
                   const promises = [];
                   snapshot.forEach(doc => {
                     const post = doc.data();
                     postsList.push(post);
                     if (post.compressedCode && !post.code) {
                       promises.push(
                         decompressString(post.compressedCode)
                           .then(decompressed => {
                             post.code = decompressed;
                           })
                           .catch(err => {
                             console.error("Decompression failed for post", post.id, err);
                           })
                       );
                     }
                   });

                   // Merge local posts (e.g. from local storage) that are not in Firestore
                   let localPosts = [];
                   try {
                     localPosts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]');
                   } catch (e) {}

                   const firestoreIds = new Set(postsList.map(p => String(p.id)));
                   const mergedList = [...postsList];
                   const localPromises = [];

                   localPosts.forEach(post => {
                     if (!firestoreIds.has(String(post.id))) {
                       mergedList.push(post);
                       if (post.compressedCode && !post.code) {
                         localPromises.push(
                           decompressString(post.compressedCode)
                             .then(decompressed => {
                               post.code = decompressed;
                             })
                             .catch(err => {
                               console.error("Decompression failed for local post", post.id, err);
                             })
                         );
                       }
                     }
                   });

                   if (promises.length > 0 || localPromises.length > 0) {
                     await Promise.all([...promises, ...localPromises]);
                   }

                   // Sort merged list by createdAt desc
                   mergedList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                   callback(mergedList);
                 }, error => {
                   console.error("Firestore subscription error. Falling back to LocalStorage:", error);
                   useFirestore = false;
                   this.subscribePosts(callback);
                 });
      } else {
        postListeners.push(callback);
        let posts = [];
        try {
          posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]');
        } catch (e) {}
        if (posts.length === 0) {
          posts = [...MOCK_POSTS];
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        }
        
        // Decompress local posts asynchronously
        const promises = [];
        posts.forEach(post => {
          if (post.compressedCode && !post.code) {
            promises.push(
              decompressString(post.compressedCode)
                .then(decompressed => {
                  post.code = decompressed;
                })
                .catch(err => {
                  console.error("Decompression failed for local post", post.id, err);
                })
            );
          }
        });
        
        const runCallback = () => {
          posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          callback(posts);
        };
        
        if (promises.length > 0) {
          Promise.all(promises).then(runCallback);
        } else {
          runCallback();
        }
        
        return () => {
          postListeners = postListeners.filter(c => c !== callback);
        };
      }
    },
    
    savePost: async function(post) {
      post.createdAt = Date.now();
      
      const hasCompression = typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';
      if (hasCompression && post.code && post.code.length > 20000) {
        try {
          console.log("Compressing post code...", post.code.length, "chars");
          const compressed = await compressString(post.code);
          console.log("Compressed to", compressed.length, "chars");
          post.compressedCode = compressed;
          post.code = ""; // Clear uncompressed code to save space
        } catch (e) {
          console.error("Compression failed, saving raw code:", e);
        }
      }

      // Check final post size
      const postStr = JSON.stringify(post);
      const isTooLargeForFirestore = postStr.length > 1000000; // ~1MB
      
      if (isTooLargeForFirestore) {
        const sizeInMb = (postStr.length / (1024 * 1024)).toFixed(2);
        alert(window.isFR || (typeof currentLang !== 'undefined' && currentLang === 'fr')
          ? `⚠️ Scène trop volumineuse (${sizeInMb} Mo) ! Elle dépasse la limite de 1 Mo pour le partage en ligne.\nElle sera sauvegardée uniquement dans votre stockage local de navigateur.`
          : `⚠️ Scene too large (${sizeInMb} MB)! It exceeds the 1 MB database limit for online sharing.\nIt will only be saved to your local browser storage.`);
      }

      if (useFirestore && db && !isTooLargeForFirestore) {
        db.collection('devsocial_posts').doc(String(post.id)).set(post)
          .catch(err => {
            console.error("Error saving post to Firestore, saving to LocalStorage instead:", err);
            saveToLocal(post);
          });
      } else {
        saveToLocal(post);
      }

      function saveToLocal(p) {
        let posts = [];
        try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
        posts = posts.filter(item => String(item.id) !== String(p.id));
        posts.push(p);
        try {
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        } catch (e) {
          if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert(window.isFR || (typeof currentLang !== 'undefined' && currentLang === 'fr')
              ? "⚠️ Espace local insuffisant ! Le modèle est trop volumineux pour votre navigateur."
              : "⚠️ Local storage quota exceeded! The model is too large for your browser.");
          } else {
            console.error("LocalStorage save error:", e);
          }
        }
        notifyPostListeners();
      }
    },
    
    likePost: function(postId) {
      if (useFirestore && db) {
        db.collection('devsocial_posts').doc(String(postId)).update({
          likes: firebase.firestore.FieldValue.increment(1)
        }).catch(err => {
          console.error("Error liking post in Firestore, falling back to LocalStorage:", err);
          let posts = [];
          try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
          posts = posts.map(p => {
            if (String(p.id) === String(postId)) p.likes = (p.likes || 0) + 1;
            return p;
          });
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
          notifyPostListeners();
        });
      } else {
        let posts = [];
        try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
        posts = posts.map(p => {
          if (String(p.id) === String(postId)) p.likes = (p.likes || 0) + 1;
          return p;
        });
        localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        notifyPostListeners();
      }
    },
    
    reportPost: function(postId) {
      if (useFirestore && db) {
        db.collection('devsocial_posts').doc(String(postId)).update({
          reports: firebase.firestore.FieldValue.increment(1)
        }).catch(err => {
          console.error("Error reporting post in Firestore, falling back to LocalStorage:", err);
          let posts = [];
          try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
          posts = posts.map(p => {
            if (String(p.id) === String(postId)) p.reports = (p.reports || 0) + 1;
            return p;
          });
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
          notifyPostListeners();
        });
      } else {
        let posts = [];
        try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
        posts = posts.map(p => {
          if (String(p.id) === String(postId)) p.reports = (p.reports || 0) + 1;
          return p;
        });
        localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        notifyPostListeners();
      }
    },
    
    addComment: function(postId, comment) {
      if (useFirestore && db) {
        db.collection('devsocial_posts').doc(String(postId)).update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        }).catch(err => {
          console.error("Error adding comment in Firestore, falling back to LocalStorage:", err);
          let posts = [];
          try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
          posts = posts.map(p => {
            if (String(p.id) === String(postId)) {
              if (!p.comments) p.comments = [];
              p.comments.push(comment);
            }
            return p;
          });
          localStorage.setItem('devsocial_posts', JSON.stringify(posts));
          notifyPostListeners();
        });
      } else {
        let posts = [];
        try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
        posts = posts.map(p => {
          if (String(p.id) === String(postId)) {
            if (!p.comments) p.comments = [];
            p.comments.push(comment);
          }
          return p;
        });
        localStorage.setItem('devsocial_posts', JSON.stringify(posts));
        notifyPostListeners();
      }
    },
    
    deletePost: function(postId) {
      // Always delete from LocalStorage first to ensure local consistency
      let posts = [];
      try { posts = JSON.parse(localStorage.getItem('devsocial_posts') || '[]'); } catch (e) {}
      posts = posts.filter(p => String(p.id) !== String(postId));
      localStorage.setItem('devsocial_posts', JSON.stringify(posts));

      if (useFirestore && db) {
        db.collection('devsocial_posts').doc(String(postId)).delete()
          .then(() => {
            notifyPostListeners();
          })
          .catch(err => {
            console.error("Error deleting post from Firestore:", err);
            notifyPostListeners();
          });
      } else {
        notifyPostListeners();
      }
    },
    
    subscribeActiveChallenge: function(callback) {
      if (useFirestore && db) {
        db.collection('devsocial_challenges').limit(1).get().then(snap => {
          if (snap.empty) {
            const defaultChallenge = {
              id: "default",
              title_en: "Procedural Clockwork Wheel",
              title_fr: "Roue Dentée Rétro",
              desc_en: "Create a custom animated gear mesh using Three.js logic and share it with the tag #chrono2026.",
              desc_fr: "Créez un engrenage animé personnalisé avec Three.js et partagez-le avec le hashtag #chrono2026.",
              expiry: Date.now() + 24 * 3600 * 1000,
              reward: "7 Days Premium",
              createdAt: Date.now()
            };
            db.collection('devsocial_challenges').doc("default").set(defaultChallenge);
          }
        });

        return db.collection('devsocial_challenges')
                 .orderBy('createdAt', 'desc')
                 .limit(1)
                 .onSnapshot(snapshot => {
                   if (!snapshot.empty) {
                     let activeChallenge = null;
                     snapshot.forEach(doc => { activeChallenge = doc.data(); });
                     callback(activeChallenge);
                   }
                 }, error => {
                   console.error("Firestore challenge subscription error. Falling back to LocalStorage:", error);
                   useFirestore = false;
                   this.subscribeActiveChallenge(callback);
                 });
      } else {
        challengeListeners.push(callback);
        let challenge = null;
        try { challenge = JSON.parse(localStorage.getItem('devsocial_active_challenge') || 'null'); } catch(e){}
        if (!challenge) {
          challenge = {
            id: "default",
            title_en: "Procedural Clockwork Wheel",
            title_fr: "Roue Dentée Rétro",
            desc_en: "Create a custom animated gear mesh using Three.js logic and share it with the tag #chrono2026.",
            desc_fr: "Créez un engrenage animé personnalisé avec Three.js et partagez-le avec le hashtag #chrono2026.",
            expiry: Date.now() + 24 * 3600 * 1000,
            reward: "7 Days Premium",
            createdAt: Date.now()
          };
          localStorage.setItem('devsocial_active_challenge', JSON.stringify(challenge));
        }
        callback(challenge);
        return () => {
          challengeListeners = challengeListeners.filter(c => c !== callback);
        };
      }
    },

    subscribeGlobalConfig: function(callback) {
      if (useFirestore && db) {
        db.collection('admin_config').doc('global').get().then(doc => {
          if (!doc.exists) {
            db.collection('admin_config').doc('global').set({ profanityFilter: false });
          }
        });

        return db.collection('admin_config').doc('global').onSnapshot(doc => {
          if (doc.exists) {
            callback(doc.data());
          }
        }, err => {
          console.error("Config subscription error. Falling back to LocalStorage:", err);
          useFirestore = false;
          this.subscribeGlobalConfig(callback);
        });
      } else {
        configListeners.push(callback);
        let config = null;
        try { config = JSON.parse(localStorage.getItem('devsocial_global_config') || 'null'); } catch(e){}
        if (!config) {
          config = { profanityFilter: false };
          localStorage.setItem('devsocial_global_config', JSON.stringify(config));
        }
        callback(config);
        return () => {
          configListeners = configListeners.filter(c => c !== callback);
        };
      }
    },
    
    _compress: compressString,
    _decompress: decompressString
  };
})();
