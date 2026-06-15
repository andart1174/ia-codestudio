// DevSocial AI Hub - Studio-AI Expert System (Fully Bilingual & Extended)
(function() {
  'use strict';

  // 1. Documentation Knowledge Base (EN/FR Only)
  const DOCS = {
    general: {
      en: "Hello! I am **Studio-AI**, your dedicated technical assistant for **IA CodeStudio**. I can help you with anything related to **IA ARCHITECTE** (our advanced AI-powered web code editor & development workspace) or **STUDIO 3D/4D PRO** (our custom WebGL vector extruder and 3D modeling platform). Feel free to ask a question in English or French!",
      fr: "Bonjour ! Je suis **Studio-AI**, votre assistant technique pour **IA CodeStudio**. Je peux vous aider pour tout ce qui concerne **IA ARCHITECTE** (notre éditeur de code web et espace de développement avancé propulsé par l'IA) ou **STUDIO 3D/4D PRO** (notre plateforme d'extrusion vectorielle WebGL et modélisation 3D). N'hésitez pas à poser une question en anglais ou en français !"
    },
    
    architecte: {
      en: "**IA ARCHITECTE** is a professional, bilingual AI-powered HTML/CSS/JS code editor and development studio. It features:\n- **Nexus Forge & Quantum Lab**: Advanced AI-driven app generation and feature managers.\n- **Multi-Module Tooling**: Over 20+ specialized panels including DevOps/Docker tools, API Design, Web3/Blockchain, Cyber Security, A11y Audit, SEO analyzer, and Voxel 3D.\n- **Built-in Responsive Simulator & Live Coding**: Test UI responsiveness and run/preview code instantly in real-time.\n- **Standalone Exports & Deployments**: Export clean source files as ZIP packages, download single HTML files, or deploy directly to cloud hosting platforms.",
      fr: "**IA ARCHITECTE** est un éditeur de code HTML/CSS/JS et un studio de développement professionnel bilingue propulsé par l'IA. Il comprend :\n- **Nexus Forge & Quantum Lab** : Générateurs d'applications et gestionnaires de fonctionnalités avancés pilotés par l'IA.\n- **Outils Multi-Modules** : Plus de 20 panneaux spécialisés incluant les outils DevOps/Docker, Design d'API, Web3/Blockchain, Cybersécurité, Audit A11y, Analyseur SEO, et Voxel 3D.\n- **Simulateur Responsive & Code en Direct** : Testez le comportement de l'interface en direct et exécutez/prévisualisez le code instantanément.\n- **Exportations & Déploiements Autonomes** : Exportez les fichiers sources propres dans un pack ZIP, téléchargez en HTML unique, ou déployez directement vers des hébergements cloud."
    },
    
    studio: {
      en: "**STUDIO 3D/4D PRO** is our advanced WebGL 3D/4D composer and vector path extruder. It allows you to build, customize, and export interactive Three.js models. Core modules include:\n1. **Vector Extruder (2D to 3D)**: Import SVG or DXF files and extrude them into complex 3D shapes.\n2. **Steampunk Chrono-Engine**: Generate animated steampunk clock mechanisms with custom particle physics.\n3. **Webcam Avatar**: Stream webcam video to render a live, interactive 3D point cloud of your face.\n4. **Video 3D Projection**: Project videos onto 3D shapes with Chroma Key green screen transparency.\n5. **Interactive 3D Scene Controls**: Configure lighting, textures, particle counts, and rotation speed before exporting standalone HTML or ZIP code packages.",
      fr: "**STUDIO 3D/4D PRO** est notre composeur WebGL 3D/4D avancé et extrudeur vectoriel. Il vous permet de créer, personnaliser et exporter des éléments Three.js interactifs. Les modules principaux incluent :\n1. **Extrudeur Vectoriel (2D vers 3D)** : Importez des fichiers SVG ou DXF et extrudez-les en formes 3D complexes.\n2. **Moteur Chrono Steampunk** : Générez des mécanismes d'horloges steampunk animés avec de la physique de particules personnalisée.\n3. **Avatar Webcam** : Capturez le flux caméra pour afficher un avatar 3D en nuage de points en direct.\n4. **Projection Vidéo 3D** : Projetez des vidéos sur des formes 3D avec transparence fond vert (Chroma Key).\n5. **Contrôles de Scène 3D Interactifs** : Ajustez la lumière, les textures, les particules et la vitesse de rotation avant d'exporter en HTML autonome ou en ZIP."
    },
    
    comparison: {
      en: "**IA ARCHITECTE** and **STUDIO 3D/4D PRO** are two distinct professional tools within **IA CodeStudio**:\n- **IA ARCHITECTE** is a full-stack, AI-powered HTML/CSS/JS code editor and workspace featuring 20+ specialized modules (SaaS, Web3, DevOps, SEO, A11y, API Design, Voxel 3D, and more) to build and deploy bilingual web applications.\n- **STUDIO 3D/4D PRO** is an advanced 3D WebGL composer and vector path extruder that allows you to import/extrude SVG/DXF files, build 3D Webcam Avatars, project 3D videos with Chroma Key, and configure complex Three.js scenes.",
      fr: "**IA ARCHITECTE** et **STUDIO 3D/4D PRO** sont deux outils professionnels distincts au sein de **IA CodeStudio** :\n- **IA ARCHITECTE** est un éditeur de code HTML/CSS/JS complet propulsé par l'IA avec plus de 20 modules spécialisés (SaaS, Web3, DevOps, SEO, A11y, API Design, Voxel 3D, etc.) pour concevoir et déployer des applications web bilingues.\n- **STUDIO 3D/4D PRO** est un composeur 3D WebGL avancé et un extrudeur vectoriel qui permet d'importer/extruder des fichiers SVG/DXF, de créer des avatars Webcam 3D, de projeter des vidéos 3D avec fond vert (Chroma Key), et de configurer des scènes Three.js complexes."
    },
    
    webcam: {
      en: "To set up the **Webcam Avatar (3D Point Cloud)**:\n1. Click on the **Webcam Avatar** module.\n2. Grant browser permissions to access your camera.\n3. The system will start streaming your camera frame, sample pixel color/depth coordinates, and render a live 3D point cloud of your face.\n4. *Troubleshooting*: Ensure your camera is not used by another app. If a black screen occurs, verify that camera permissions are enabled in your browser settings under Site Settings.",
      fr: "Pour configurer l'**Avatar Webcam (Nuage de points 3D)** :\n1. Cliquez sur le module **Avatar Webcam**.\n2. Accordez les autorisations du navigateur pour accéder à votre caméra.\n3. Le système capte le flux de la caméra, échantillonne la couleur et la profondeur des pixels, puis affiche un nuage de points 3D de votre visage en direct.\n4. *Dépannage* : Vérifiez que la caméra n'est pas utilisée par une autre application. Si l'écran reste noir, assurez-vous que les permissions de la caméra sont activées dans les paramètres du site de votre navigateur."
    },
    
    steam: {
      en: "To customize the **Steampunk Steam Exhaust System**:\n1. Open the **Steampunk Chrono** module in the sidebar.\n2. Go to the **Steam Exhaust System** section.\n3. Choose your exhaust type: **Periodic Burst** (bursts in sync with the piston), **Constant Stream**, or **Heartbeat Pulse**.\n4. Choose a custom steam tint color using the color picker.\n5. When you export or preview the code, Three.js custom particle physics (`THREE.Points`) will be injected automatically to animate the steam vents.",
      fr: "Pour personnaliser le **Système d'Échappement de Vapeur Steampunk** :\n1. Ouvrez le module **Chrono Steampunk** dans le volet latéral.\n2. Accédez à la section **Système d'échappement de vapeur**.\n3. Choisissez le type d'échappement : **Jet Périodique** (synchronisé avec le piston), **Jet Continu**, ou **Pulsation Cardiaque**.\n4. Choisissez la teinte de la vapeur à l'aide de la palette de couleurs.\n5. Lors de l'exportation ou de la prévisualisation, la physique des particules Three.js (`THREE.Points`) est injectée automatiquement pour animer les évents."
    },
    
    chroma: {
      en: "To project a **Video with Chroma Key transparency**:\n1. Go to the **Video to 3D** module.\n2. Drag and drop any video file (e.g. mp4, webm).\n3. Check the **Chroma Key (Green Screen)** box.\n4. Use the color picker to select the green background color of your video.\n5. Adjust **Similarity** and **Smoothness** ranges to remove the green background. The video will render transparently on your chosen 3D shape (curved, sphere, cube) in real-time.",
      fr: "Pour projeter une **Vidéo avec transparence Chroma Key (Fond Vert)** :\n1. Allez dans le module **Vidéo vers 3D**.\n2. Glissez-déposez n'importe quel fichier vidéo (ex: mp4, webm).\n3. Cochez la case **Chroma Key (Green Screen)**.\n4. Sélectionnez la couleur verte du fond vert avec le sélecteur.\n5. Ajustez la **Similarité** et la **Lissitude** (Smoothness) pour effacer le fond vert. La vidéo s'affichera de manière transparente sur la forme 3D choisie (écran incurvé, sphère, cube)."
    },

    paywall: {
      en: "The **Premium Lock System** secures all code exports. Non-premium users can build, customize, and preview 3D scenes in the browser, but clicks on **Export code**, **Download HTML**, **ZIP Pack**, or module-level **Fusion & Export** actions will trigger the premium paywall modal.",
      fr: "Le **Système de Verrouillage Premium** sécurise toutes les exportations. Les membres non-premium peuvent concevoir, personnaliser et prévisualiser les scènes dans le navigateur, mais les clics sur **Copier le code**, **Télécharger HTML**, **Pack ZIP** ou **Fusionner & Exporter** déclenchent le modal paywall."
    },

    audio: {
      en: "The **Audio Visualizer 3D** transforms sound frequencies into moving shapes:\n1. Open the **Audio Visualizer 3D** module.\n2. Drag and drop an audio file (mp3/wav) or grant microphone access.\n3. The app initializes a Web Audio API analyzer (`AudioContext` and `AnalyserNode`).\n4. Sound frequencies are mapped to 3D elements (e.g. wireframe bars, circular wave ripples) using real-time scale updates inside the animation loop.",
      fr: "Le **Visualiseur Audio 3D** transforme les fréquences sonores en formes animées :\n1. Ouvrez le module **Visualiseur Audio 3D**.\n2. Glissez-déposez un fichier audio (mp3/wav) ou autorisez l'accès au micro.\n3. L'application initialise un analyseur Web Audio API (`AudioContext` et `AnalyserNode`).\n4. Les fréquences sonores contrôlent l'échelle et la hauteur d'éléments 3D (ex: barres circulaires, anneaux d'ondes) en temps réel."
    },

    image: {
      en: "The **Image to 3D Extruder** converts standard 2D images into textured 3D models:\n1. Open the **Image to 3D** module.\n2. Upload any PNG or JPG image.\n3. The system parses the pixel brightness to create a grayscale height map.\n4. Using a custom Three.js `PlaneGeometry` displacement, brighter pixels are extruded higher, generating a detailed 3D relief (lithophane or heightfield) mapping the original image.",
      fr: "L'**Extrudeur Image vers 3D** convertit les images 2D classiques en modèles 3D texturés :\n1. Ouvrez le module **Image vers 3D**.\n2. Chargez n'importe quelle image PNG ou JPG.\n3. Le système analyse la luminosité des pixels pour générer une carte de hauteur (Height Map) en niveaux de gris.\n4. Par un déplacement géométrique sur une `PlaneGeometry` Three.js, les zones claires sont extrudées en relief pour reproduire l'image originale en 3D."
    },

    voxel: {
      en: "The **3D Voxel Mode / Voxel QR** creates pixelated structures and custom mazes:\n1. Access the Voxel/Labyrinth features inside the designer.\n2. Draw on the 2D grid or enter a custom text code (including QR patterns).\n3. The system generates rows of 3D cubes (`BoxGeometry`) representing the pixels.\n4. You can export the resulting structure as a complete 3D maze file or custom Three.js code.",
      fr: "Le **Mode Voxel 3D / Voxel QR** permet de créer des structures pixelisées et des labyrinthes :\n1. Accédez aux options Voxel/Labyrinthe dans le composeur.\n2. Dessinez sur la grille 2D ou saisissez un texte pour générer un motif (ex: QR code).\n3. L'application génère des blocs de cubes 3D (`BoxGeometry`) pour chaque pixel.\n4. Vous pouvez exporter la structure sous forme de fichier de labyrinthe 3D complet ou sous forme de code Three.js."
    },

    collab: {
      en: "The **Live Collaboration (WebRTC)** connects developers in real-time:\n1. Click on **Collab Live** in the top tab bar.\n2. Copy the generated peer ID or enter your partner's ID to connect.\n3. A secure peer-to-peer data channel is opened directly between browsers using WebRTC.\n4. Any changes you make to the Three.js code editor will synchronize instantly on your partner's screen, and vice versa.",
      fr: "La **Collaboration en direct (WebRTC)** connecte les développeurs en temps réel :\n1. Cliquez sur **Collab en direct** dans la barre du haut.\n2. Copiez l'ID de session généré ou entrez l'ID de votre partenaire pour vous connecter.\n3. Un canal de données sécurisé Peer-to-Peer est ouvert via WebRTC.\n4. Toutes les modifications apportées à l'éditeur de code Three.js se synchronisent instantanément sur l'écran de votre partenaire."
    }
  };

  // 2. Chatbot Core Logic
  window.StudioAI = {
    generateResponse: function(userMessage, lang) {
      const msg = userMessage.toLowerCase();
      
      // Keywords Matching
      if (msg.includes("webcam") || msg.includes("camera") || msg.includes("avatar")) {
        return DOCS.webcam[lang];
      }
      else if (msg.includes("steam") || msg.includes("vapeur") || msg.includes("exhaust") || msg.includes("echappement")) {
        return DOCS.steam[lang];
      }
      else if (msg.includes("chroma") || msg.includes("green screen") || msg.includes("fond vert") || msg.includes("video")) {
        return DOCS.chroma[lang];
      }
      else if (msg.includes("vs") || msg.includes("difference") || msg.includes("compare") || msg.includes("différence") || msg.includes("comparer")) {
        return DOCS.comparison[lang];
      }
      else if (msg.includes("architecte")) {
        return DOCS.architecte[lang];
      }
      else if (msg.includes("studio") || msg.includes("3d") || msg.includes("4d") || msg.includes("composer")) {
        return DOCS.studio[lang];
      }
      else if (msg.includes("premium") || msg.includes("paywall") || msg.includes("lock") || msg.includes("payer") || msg.includes("stripe")) {
        return DOCS.paywall[lang];
      }
      else if (msg.includes("audio") || msg.includes("visualiseur") || msg.includes("visualizer") || msg.includes("son") || msg.includes("music")) {
        return DOCS.audio[lang];
      }
      else if (msg.includes("image") || msg.includes("photo") || msg.includes("convert") || msg.includes("png") || msg.includes("jpg")) {
        return DOCS.image[lang];
      }
      else if (msg.includes("voxel") || msg.includes("labyrinthe") || msg.includes("maze") || msg.includes("qr")) {
        return DOCS.voxel[lang];
      }
      else if (msg.includes("collab") || msg.includes("direct") || msg.includes("webrtc") || msg.includes("share")) {
        return DOCS.collab[lang];
      }
      
      // Fallback
      if (lang === 'fr') {
        return "Je comprends votre question. Cependant, je suis spécifiquement entraîné pour vous guider sur **IA ARCHITECTE** (notre éditeur de code IA bilingue) et **STUDIO 3D/4D PRO** (notre composeur WebGL 3D). Pourriez-vous préciser sur quelle fonctionnalité vous souhaitez des informations (ex: collab, avatar webcam, steampunk, chroma key, voxel, audio visualiseur) ?";
      } else {
        return "I understand your query. However, I am specifically trained to help you with **IA ARCHITECTE** (our bilingual AI code editor) and **STUDIO 3D/4D PRO** (our 3D WebGL composer). Could you specify which features you'd like to learn more about (e.g., collab, webcam avatar, steampunk chrono, chroma key video, voxel, audio visualizer)?";
      }
    },
    
    getWelcomeMessage: function(lang) {
      return DOCS.general[lang];
    }
  };
})();
