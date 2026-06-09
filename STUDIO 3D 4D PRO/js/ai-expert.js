// DevSocial AI Hub - Studio-AI Expert System
(function() {
  'use strict';

  // 1. Documentation Knowledge Base (EN/FR)
  const DOCS = {
    general: {
      en: "Hello! I am **Studio-AI**, your dedicated technical assistant for **IA CodeStudio**. I can help you with anything related to **IA ARCHITECTE** (our intelligent house builder) or **STUDIO 3D/4D PRO** (our custom WebGL modeler). Feel free to ask a question in English or French!",
      fr: "Bonjour ! Je suis **Studio-AI**, votre assistant technique pour **IA CodeStudio**. Je peux vous aider pour tout ce qui concerne **IA ARCHITECTE** (notre constructeur de maison intelligent) ou **STUDIO 3D/4D PRO** (notre modeleur WebGL personnalisé). N'hésitez pas à poser une question en anglais ou en français !"
    },
    
    architecte: {
      en: "**IA ARCHITECTE** is an intelligent tool designed for house modeling and planning. It features:\n- **2D Floor Plan Drawing**: Draw walls, rooms, windows, and doors easily.\n- **Instant 3D Extrusion**: Render your 2D plans into full interactive 3D house models.\n- **Material Library**: Apply realistic textures (wood, brick, concrete) to surfaces.\n- **Export Formats**: Download plans as DXF/SVG or export the interactive 3D viewport.",
      fr: "**IA ARCHITECTE** est un outil intelligent conçu pour la modélisation et la planification de maisons. Il comprend :\n- **Dessin de plan 2D** : Dessinez facilement des murs, des pièces, des fenêtres et des portes.\n- **Extrusion 3D instantanée** : Transformez vos plans 2D en modèles de maisons 3D interactifs.\n- **Bibliothèque de matériaux** : Appliquez des textures réalistes (bois, brique, béton) aux surfaces.\n- **Formats d'exportation** : Téléchargez les plans au format DXF/SVG ou exportez la vue 3D interactive."
    },
    
    studio: {
      en: "**STUDIO 3D/4D PRO** is our advanced WebGL composer. It allows you to build custom interactive 3D elements and export them. Core modules include:\n1. **2D to 3D Extruder**: Import SVG or DXF files and extrude them into complex 3D shapes.\n2. **Steampunk Chrono-Engine**: Generate procedural animated steampunk clocks with steam particles.\n3. **Webcam Avatar**: Access your camera to render a real-time point-cloud face avatar.\n4. **Video 3D Projection**: Project any video onto curved screens, spheres, or cylinders with chroma-key green screen transparency.\n5. **Live Collaboration**: Edit code with partners in real-time using built-in WebRTC.",
      fr: "**STUDIO 3D/4D PRO** est notre composeur WebGL avancé. Il vous permet de créer des éléments 3D interactifs personnalisés et de les exporter. Les modules principaux sont :\n1. **Extrudeur 2D vers 3D** : Importez des fichiers SVG ou DXF et extrudez-les en formes 3D complexes.\n2. **Moteur Chrono Steampunk** : Générez des horloges steampunk animées avec des jets de particules de vapeur.\n3. **Avatar Webcam** : Accédez à votre caméra pour afficher un avatar de visage 3D en nuage de points en temps réel.\n4. **Projection Vidéo 3D** : Projetez n'importe quelle vidéo sur des écrans incurvés, des sphères ou des cylindres avec transparence fond vert (Chroma Key).\n5. **Collab en direct** : Modifiez le code avec un partenaire en direct via WebRTC."
    },
    
    webcam: {
      en: "To set up the **Webcam Avatar (3D Point Cloud)**:\n1. Click on the **Webcam Avatar** module.\n2. Grant browser permissions to access your camera.\n3. The system will start streaming your camera frame, sample pixel color/depth coordinates, and render a live 3D point cloud of your face.\n4. *Troubleshooting*: Ensure your camera is not used by another app. If a black screen occurs, verify that camera permissions are enabled in your browser settings under Site Settings.",
      fr: "Pour configurer l'**Avatar Webcam (Nuage de points 3D)** :\n1. Cliquez sur le module **Avatar Webcam**.\n2. Accordez les autorisations du navigateur pour accéder à votre caméra.\n3. Le système capte le flux vidéo, échantillonne la couleur et la profondeur des pixels, puis affiche un nuage de points 3D de votre visage en direct.\n4. *Dépannage* : Vérifiez que la caméra n'est pas utilisée par une autre application. Si l'écran reste noir, assurez-vous que les permissions de la caméra sont activées dans les paramètres du site de votre navigateur."
    },
    
    steam: {
      en: "To customize the **Steampunk Steam Exhaust System**:\n1. Open the **Steampunk Chrono** module in the sidebar.\n2. Go to the **Steam Exhaust System** section.\n3. Choose your exhaust type: **Periodic Burst** (bursts in sync with the piston), **Constant Stream**, or **Heartbeat Pulse**.\n4. Choose a custom steam tint color using the color picker.\n5. When you export or preview the code, Three.js custom particle physics (`THREE.Points`) will be injected automatically to animate the steam vents.",
      fr: "Pour personnaliser le **Système d'Échappement de Vapeur Steampunk** :\n1. Ouvrez le module **Chrono Steampunk** dans le volet latéral.\n2. Accédez à la section **Système d'échappement de vapeur**.\n3. Choisissez le type d'échappement : **Jet Périodique** (synchronisé avec le piston), **Jet Continu**, ou **Pulsation Cardiaque**.\n4. Choisissez la teinte de la vapeur à l'aide du sélecteur de couleurs.\n5. Lors de l'exportation ou de la prévisualisation, la physique des particules Three.js (`THREE.Points`) est injectée automatiquement pour animer les évents."
    },
    
    chroma: {
      en: "To project a **Video with Chroma Key transparency**:\n1. Go to the **Video to 3D** module.\n2. Drag and drop any video file (e.g. mp4, webm).\n3. Check the **Chroma Key (Green Screen)** box.\n4. Use the color picker to select the green background color of your video.\n5. Adjust **Similarity** and **Smoothness** ranges to remove the green background. The video will render transparently on your chosen 3D shape (curved, sphere, cube) in real-time.",
      fr: "Pour projeter une **Vidéo avec transparence Chroma Key (Fond Vert)** :\n1. Allez dans le module **Vidéo vers 3D**.\n2. Glissez-déposez n'importe quel fichier vidéo (ex: mp4, webm).\n3. Cochez la case **Chroma Key (Green Screen)**.\n4. Sélectionnez la couleur verte du fond vert avec le sélecteur.\n5. Ajustez la **Similarité** et la **Lissitude** (Smoothness) pour effacer le fond vert. La vidéo s'affichera de manière transparente sur la forme 3D choisie (écran incurvé, sphère, cube)."
    },

    paywall: {
      en: "The **Premium Lock System** secures all code exports. Non-premium users can build, customize, and preview 3D scenes in the browser, but clicks on **Export code**, **Download HTML**, **ZIP Pack**, or module-level **Fusion & Export** actions will trigger the premium paywall modal.",
      fr: "Le **Système de Verrouillage Premium** sécurise toutes les exportations. Les membres non-premium peuvent concevoir, personnaliser et prévisualiser les scènes dans le navigateur, mais les clics sur **Copier le code**, **Télécharger HTML**, **Pack ZIP** ou **Fusionner & Exporter** déclenchent le modal paywall."
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
      else if (msg.includes("architecte") || msg.includes("maison") || msg.includes("plan")) {
        return DOCS.architecte[lang];
      }
      else if (msg.includes("studio") || msg.includes("3d") || msg.includes("4d") || msg.includes("composer")) {
        return DOCS.studio[lang];
      }
      else if (msg.includes("premium") || msg.includes("paywall") || msg.includes("lock") || msg.includes("payer") || msg.includes("stripe")) {
        return DOCS.paywall[lang];
      }
      
      // Fallback
      if (lang === 'fr') {
        return "Je comprends votre question. Cependant, je suis spécifiquement entraîné pour vous guider sur **IA ARCHITECTE** et **STUDIO 3D/4D PRO**. Pourriez-vous préciser si vous souhaitez de l'aide concernant *l'avatar webcam*, *les particules de vapeur*, *le fond vert vidéo* ou *l'exportation de code* ?";
      } else {
        return "I understand your query. However, I am specifically trained to help you with **IA ARCHITECTE** and **STUDIO 3D/4D PRO**. Could you specify if you need assistance with *webcam avatar setup*, *steampunk steam particles*, *chroma key video*, or *export options*?";
      }
    },
    
    getWelcomeMessage: function(lang) {
      return DOCS.general[lang];
    }
  };
})();
