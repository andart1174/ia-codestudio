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
      caption: "Check out my new procedural Clockwork mechanism! Fused with brass gears and custom speed scaling. Tagging #steampunk #webgl",
      likes: 38,
      comments: [
        { user: "Lucas_3D", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lucas", text: "Incredible teeth meshing details! Is this Three.js CylinderGeometry?" },
        { user: "Admin", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin", text: "Superb work Emma, the tourbillon cages look flawless." }
      ],
      preset: "clockwork",
      hasThree: true,
      code: `// Steampunk Clockwork Preset Code
function createChronoScene(scene) {
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
  };
}`
    },
    {
      id: 2,
      user: "Lucas_3D",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lucas",
      userTag: "Creator",
      caption: "Futuristic live Webcam point cloud avatar. Made using custom particle buffer geometry in WebGL. #avatar #neuro",
      likes: 24,
      comments: [
        { user: "EmmaArchitect", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Emma", text: "Wow, how did you parse the camera stream depth so fast?" }
      ],
      preset: "avatar",
      hasThree: true,
      code: `// Live Webcam Avatar Point Cloud Simulation Code
function createAvatarScene(scene) {
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
  };
}`
    },
    {
      id: 3,
      user: "SteampunkMaker",
      userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Chrono",
      userTag: "Maker",
      caption: "Rendering a wireframe parametric mountain topography using custom sin/cos displacement maps. #math #surface #threejs",
      likes: 19,
      comments: [],
      preset: "landscape",
      hasThree: true,
      code: `// Wireframe Parametric Surface Code
function createSurfaceScene(scene) {
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
  };
}`
    }
  ];

  // 2. Database Helper Methods API
  window.DevSocialDB = {
    init: function() {
      if (!localStorage.getItem('devsocial_posts')) {
        localStorage.setItem('devsocial_posts', JSON.stringify(MOCK_POSTS));
      }
    },
    
    getPosts: function() {
      this.init();
      try {
        return JSON.parse(localStorage.getItem('devsocial_posts'));
      } catch(e) {
        return MOCK_POSTS;
      }
    },
    
    savePost: function(post) {
      const posts = this.getPosts();
      posts.unshift(post);
      localStorage.setItem('devsocial_posts', JSON.stringify(posts));
      return posts;
    },
    
    likePost: function(postId) {
      const posts = this.getPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
        localStorage.setItem('devsocial_posts', JSON.stringify(posts));
      }
      return post ? post.likes : 0;
    },
    
    addComment: function(postId, comment) {
      const posts = this.getPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments = post.comments || [];
        post.comments.push(comment);
        localStorage.setItem('devsocial_posts', JSON.stringify(posts));
      }
      return post ? post.comments : [];
    }
  };
})();
