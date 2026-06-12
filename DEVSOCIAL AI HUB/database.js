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

  // 2. Initialize Firebase using the configuration from the portal
  const firebaseConfig = {
    apiKey: "AIzaSyBXJ0LstZF7c3-GI2eDtv6V7vsx0scgXHk",
    authDomain: "ia-codestudio.firebaseapp.com",
    projectId: "ia-codestudio",
    storageBucket: "ia-codestudio.firebasestorage.app",
    messagingSenderId: "977495027432",
    appId: "1:977495027432:web:fb93e8ae7712c70df2635d",
    measurementId: "G-YVNWE5Q6KB"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  // 3. Database Helper Methods API - Firebase Firestore implementation
  window.DevSocialDB = {
    initFirestoreSeed: function() {
      db.collection('devsocial_posts').limit(1).get().then(snap => {
        if (snap.empty) {
          MOCK_POSTS.forEach((post, index) => {
            // Distribute timestamps to preserve mock order
            post.createdAt = Date.now() - (index * 3600000);
            db.collection('devsocial_posts').doc(String(post.id)).set(post)
              .catch(err => console.error("Error seeding Firestore:", err));
          });
        } else {
          // Force-update the mock posts' code to ensure they are the unwrapped versions
          MOCK_POSTS.forEach(post => {
            db.collection('devsocial_posts').doc(String(post.id)).update({
              code: post.code
            }).catch(err => console.warn("Could not auto-update mock post code:", err));
          });
        }
      }).catch(err => {
        console.warn("Firestore collection devsocial_posts is not initialized or accessible. Please check Firestore Security Rules.", err);
      });
    },

    subscribePosts: function(callback) {
      this.initFirestoreSeed();
      return db.collection('devsocial_posts')
               .orderBy('createdAt', 'desc')
               .onSnapshot(snapshot => {
                 const postsList = [];
                 snapshot.forEach(doc => {
                   postsList.push(doc.data());
                 });
                 callback(postsList);
               }, error => {
                 console.error("Firestore subscription error:", error);
               });
    },
    
    savePost: function(post) {
      post.createdAt = Date.now();
      db.collection('devsocial_posts').doc(String(post.id)).set(post)
        .catch(err => console.error("Error saving post to Firestore:", err));
    },
    
    likePost: function(postId) {
      db.collection('devsocial_posts').doc(String(postId)).update({
        likes: firebase.firestore.FieldValue.increment(1)
      }).catch(err => console.error("Error liking post in Firestore:", err));
    },
    
    reportPost: function(postId) {
      db.collection('devsocial_posts').doc(String(postId)).update({
        reports: firebase.firestore.FieldValue.increment(1)
      }).catch(err => console.error("Error reporting post in Firestore:", err));
    },
    
    addComment: function(postId, comment) {
      db.collection('devsocial_posts').doc(String(postId)).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
      }).catch(err => console.error("Error adding comment in Firestore:", err));
    },
    
    deletePost: function(postId) {
      db.collection('devsocial_posts').doc(String(postId)).delete()
        .catch(err => console.error("Error deleting post from Firestore:", err));
    },
    
    subscribeActiveChallenge: function(callback) {
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
                 console.error("Firestore challenge subscription error:", error);
               });
    },

    subscribeGlobalConfig: function(callback) {
      db.collection('admin_config').doc('global').get().then(doc => {
        if (!doc.exists) {
          db.collection('admin_config').doc('global').set({ profanityFilter: false });
        }
      });

      return db.collection('admin_config').doc('global').onSnapshot(doc => {
        if (doc.exists) {
          callback(doc.data());
        }
      }, err => console.error("Config subscription error:", err));
    }
  };
})();
