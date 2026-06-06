/**
 * IA Guide Bot — Studio 3D/4D Pro Interactive Virtual Assistant
 * Fully Client-Side NLP Matching & Programmatic Action Triggers
 * Supported Languages: English (en), French (fr)
 */
'use strict';

const IAGuideBot = (() => {
  let isPanelOpen = false;
  let currentLang = 'en';

  // Categories definition
  const categories = {
    en: {
      "All Modules": "📂 All Studio Modules categorized alphabetically.",
      "IA ULTRA": "⭐ High-fidelity Ultra modules including Clock Ultra, Mech Robot, Hero Forge, Steampunk Chrono.",
      "Premium Studios": "🏢 Pro simulation workspaces: Cyber City, Quantum Fluids, text-to-scene, Git City, Web AR.",
      "Web Architect": "🌐 Website and server API visualizations, live JSON sensors, WebSockets, Collab coding.",
      "Next-Gen Labs": "🔬 Math surfaces, cellular automata life, L-System botany flora, fractals, molecules, crystals.",
      "Neural Sandbox": "🧠 Brain net displays, biometric skeletons, emotion terrain heights, mood charts.",
      "Mesh Gradient": "📐 Vector and 3D path composers: SVG, DXF, Voxel Pixelart, Force Shield extruders.",
      "Audio Synth": "🎵 Musical keyboard, audio visualizers, microphone voice deforming models.",
      "Holo Cards": "🔠 Documents carousels, PDF booklets, logic flowcharts, choice story books, QR labyrinths.",
      "Export": "💾 Tools to download standalone HTML, compile ZIP Pro packages, save PNG or record WebM video."
    },
    fr: {
      "All Modules": "📂 Tous les modules du Studio regroupés par ordre alphabétique.",
      "IA ULTRA": "⭐ Modules Ultra haute fidélité: Clock Ultra, Mech Robot, Hero Forge, Steampunk Chrono.",
      "Premium Studios": "🏢 Espaces de simulation Pro: Cyber City, Quantum Fluids, text-to-scene, Git City, Web AR.",
      "Web Architect": "🌐 Visualisations d'API Web/Serveur, capteurs JSON en direct, WebSockets, Collab en direct.",
      "Next-Gen Labs": "🔬 Surfaces mathématiques, jeu de la vie, flore L-System, fractales, molécules, cristaux.",
      "Neural Sandbox": "🧠 Réseaux de neurones, squelette biométrique, relief émotionnel, humeurs en 3D.",
      "Mesh Gradient": "📐 Extrudeurs de tracés SVG, DXF, pixelart voxel, bouclier d'énergie.",
      "Audio Synth": "🎵 Clavier musical, visualiseur audio réactif, sculpture vocale par micro.",
      "Holo Cards": "🔠 Carrousel de docs, livre PDF tournant, mindmaps de logique, livre d'histoire, labyrinthe QR.",
      "Export": "💾 Export HTML autonome, packs ZIP, capture photo PNG et enregistreur vidéo WebM."
    }
  };

  // Modules metadata database
  const modulesDatabase = [
    // IA ULTRA
    {
      id: "btn-clockultra-scene",
      category: "IA ULTRA",
      name: { en: "🕒💎 CLOCK ULTRA", fr: "🕒💎 HORLOGE ULTRA" },
      keywords: ["clock ultra", "clock", "horloge ultra", "horloge", "time", "zodiac", "lunar", "lune", "weather", "meteo", "parallax", "battery", "batterie"],
      desc: {
        en: "The master Clock Ultra engine. Features 30 custom rotating mechanical rings, zodiac tracking, lunar phase calendars, parallax animations, battery tracking, and real-time live local weather synchronization.",
        fr: "Le moteur principal Clock Ultra. Comprend 30 anneaux mécaniques rotatifs personnalisés, suivi du zodiaque, phases lunaires, parallaxe, niveau de batterie et synchronisation météo locale en direct."
      }
    },
    {
      id: "btn-steampunk-pro-scene",
      category: "IA ULTRA",
      name: { en: "⚙️👑 Steampunk Chrono Pro", fr: "⚙️👑 Steampunk Chrono Pro" },
      keywords: ["steampunk pro", "steampunk chrono pro", "chrono pro", "astrolabe", "solar calendar", "calendrier solaire"],
      desc: {
        en: "An advanced luxury clock mechanism containing multiple rotating brass rings, solar calendar wheels, and astrolabe controls.",
        fr: "Mécanisme d'horloge de luxe avancé contenant plusieurs anneaux en laiton rotatifs, calendrier solaire et contrôles d'astrolabe."
      }
    },
    {
      id: "btn-steampunk-scene",
      category: "IA ULTRA",
      name: { en: "⚙️ Steampunk Chrono", fr: "⚙️ Steampunk Chrono" },
      keywords: ["steampunk", "steampunk chrono", "chrono", "gears", "engrenages", "brass", "laiton"],
      desc: {
        en: "Build physical brass gears, escapements, and hands in 3D. Allows customizing gears tooth counts and speeds.",
        fr: "Construisez des engrenages physiques en laiton, des échappements et des aiguilles en 3D. Permet de personnaliser les dents et vitesses."
      }
    },
    {
      id: "btn-heroforge-scene",
      category: "IA ULTRA",
      name: { en: "🦸‍♂️ Hero Forge", fr: "🦸‍♂️ Hero Forge" },
      keywords: ["hero forge", "hero", "forge", "character", "warrior", "personnage", "guerrier", "helmet", "casque", "armor", "armure"],
      desc: {
        en: "Create and customize your 3D fantasy warrior character. Equip helmets, breastplates, capes, and swords, and customize armor color gradients.",
        fr: "Créez et personnalisez votre guerrier fantastique 3D. Équipez des casques, plastrons, capes, épées et modifiez les dégradés de couleurs."
      }
    },
    {
      id: "btn-mechrobot-scene",
      category: "IA ULTRA",
      name: { en: "🤖 Mech Robot", fr: "🤖 Mech Robot" },
      keywords: ["mech", "robot", "mech robot", "hydraulic", "laser", "plates", "armure"],
      desc: {
        en: "Compose giant mechanical robots with hydraulic arms, heavy leg armor plates, and customizable laser blasters.",
        fr: "Composez des robots géants avec bras hydrauliques, plaques d'armure lourdes et canons lasers personnalisables."
      }
    },
    {
      id: "btn-ancientarch-scene",
      category: "IA ULTRA",
      name: { en: "🏛️ Ancient Arch", fr: "🏛️ Arche Ancienne" },
      keywords: ["ancient arch", "arch", "arche", "colonne", "column", "temple", "rome", "ruins", "ruines"],
      desc: {
        en: "Model classical roman arches, stone columns, ruined temples, and historical architectural columns.",
        fr: "Modélisez des arches romaines classiques, des colonnes de pierre, des temples en ruine et des éléments d'architecture antique."
      }
    },
    {
      id: "btn-legocity-scene",
      category: "IA ULTRA",
      name: { en: "🧱 Lego City", fr: "🧱 Ville Lego" },
      keywords: ["lego", "lego city", "bricks", "briques", "toys", "jouets"],
      desc: {
        en: "Build low-poly cities where all houses, trees, and cars are constructed from modular plastic Lego bricks.",
        fr: "Construisez des villes low-poly où les maisons, arbres et voitures sont assemblés à partir de briques Lego modulaires."
      }
    },
    {
      id: "btn-dataglobe-scene",
      category: "IA ULTRA",
      name: { en: "🌐 Data Globe 3D", fr: "🌐 Globe de Données 3D" },
      keywords: ["data globe", "globe data", "connections", "connexions", "arcs", "climate", "climat"],
      desc: {
        en: "Display global connection arcs, flight paths, regional statistics, and climate heat grids on a spinning 3D globe.",
        fr: "Affichez des arcs de connexion mondiaux, des routes aériennes, des stats régionales et des grilles thermiques sur un globe 3D rotatif."
      }
    },
    {
      id: "btn-holohud-scene",
      category: "IA ULTRA",
      name: { en: "🌈 Holo HUD", fr: "🌈 HUD Holographique" },
      keywords: ["holo hud", "hud", "holographic hud", "ironman", "compass", "boussole", "status", "gauges"],
      desc: {
        en: "Project Iron Man-style floating holographic status indicators, target sights, compass rings, and energy grid gauges.",
        fr: "Projetez des indicateurs holographiques flottants style Iron Man, viseurs, anneaux de boussole et jauges d'énergie."
      }
    },
    {
      id: "btn-masksculptor-scene",
      category: "IA ULTRA",
      name: { en: "🎭 Mask Sculptor", fr: "🎭 Sculpteur de Masques" },
      keywords: ["mask", "sculptor", "masque", "face", "visage", "deform", "vertices", "sommets"],
      desc: {
        en: "Mold 3D human faces, tribal masks, and venetian masquerades by pulling and pushing interactive mesh vertices in real-time.",
        fr: "Modelez des visages humains 3D, masques tribaux ou vénitiens en déformant les sommets du maillage en direct."
      }
    },
    {
      id: "btn-instrument-scene",
      category: "IA ULTRA",
      name: { en: "🎸 Musical Keyboard", fr: "🎸 Clavier Musical" },
      keywords: ["instrument", "keyboard", "piano", "notes", "synthesizer", "synthe", "clavier"],
      desc: {
        en: "A fully playable 3D musical piano keyboard. Click the 3D keys to play different tones and synthesizer wave settings.",
        fr: "Un clavier de piano musical 3D jouable. Cliquez sur les touches 3D pour jouer différentes notes et ondes de synthétiseur."
      }
    },
    {
      id: "btn-chemreaction-scene",
      category: "IA ULTRA",
      name: { en: "⚗️ Chem Reaction", fr: "⚗️ Réaction Chimique" },
      keywords: ["chem", "reaction", "chimie", "beaker", "becher", "particles", "gas", "gaz", "mixing", "melange"],
      desc: {
        en: "Simulate chemical molecule mixing inside laboratory beakers, heat reactions, color transformations, and gas particle expansion.",
        fr: "Simulez le mélange de molécules chimiques dans des béchers, réactions thermiques, changements de couleur et émission de gaz."
      }
    },
    {
      id: "btn-anatomy-scene",
      category: "IA ULTRA",
      name: { en: "🦴 Body Anatomy", fr: "🦴 Anatomie Corporelle" },
      keywords: ["anatomy", "anatomie", "body", "corps", "skeleton", "squelette", "muscles", "heart", "coeur"],
      desc: {
        en: "Explore a multi-layered 3D human anatomy model. Toggle views between bones/skeleton, muscles, cardiovascular organs, and nervous systems.",
        fr: "Explorez un modèle d'anatomie humaine 3D multicouche. Basculez entre le squelette, les muscles, le système cardiovasculaire et nerveux."
      }
    },
    {
      id: "btn-iceterrain-scene",
      category: "IA ULTRA",
      name: { en: "🧊 Ice Terrain", fr: "🧊 Terrain Glaciaire" },
      keywords: ["ice", "glacier", "snow", "neige", "mountain", "montagne", "cold", "froid"],
      desc: {
        en: "Generate realistic snowy mountains, ice valleys, and glaciers with sub-zero color profiles and frost sparkles.",
        fr: "Générez des montagnes enneigées, vallées de glace et glaciers avec des profils de couleurs polaires et éclats gelés."
      }
    },
    {
      id: "btn-lavaworld-scene",
      category: "IA ULTRA",
      name: { en: "🌋 Lava World", fr: "🌋 Monde de Lave" },
      keywords: ["lava", "volcano", "volcan", "lave", "fire", "feu", "heat", "shimmer", "chaleur"],
      desc: {
        en: "Build burning volcanic scenes with glowing lava flows, heat shimmer particles, and hot igneous rocks.",
        fr: "Créez des scènes volcaniques brûlantes avec des coulées de lave rougeoyantes, particules thermiques et roches magmatiques."
      }
    },
    {
      id: "btn-oceanwave-scene",
      category: "IA ULTRA",
      name: { en: "🌊 Ocean Wave", fr: "🌊 Vagues d'Océan" },
      keywords: ["ocean wave", "water", "eau", "wave", "vagues", "foam", "mousse", "buoy", "bouee"],
      desc: {
        en: "Simulate beautiful ocean waves with foam peaks, customizable wind heights, water color depths, and floating interactive buoys.",
        fr: "Simulez de superbes vagues océaniques avec crêtes d'écume, hauteurs réglables, profondeur de couleur et bouées flottantes."
      }
    },

    // Premium Studios
    {
      id: "btn-cybercity-scene",
      category: "Premium Studios",
      name: { en: "🏙️ Cyber City", fr: "🏙️ Cyber Cité" },
      keywords: ["cyber city", "cyberpunk", "hologram", "traffic", "neon", "metropolis", "grille", "grid"],
      desc: {
        en: "Generate a futuristic cyberpunk metropolis with neon skyscrapers, moving hovercar traffic grids, and giant corporate holographic boards.",
        fr: "Générez une métropole cyberpunk avec gratte-ciels néon, trafic de voitures volantes et panneaux holographiques géants."
      }
    },
    {
      id: "btn-fluid-scene",
      category: "Premium Studios",
      name: { en: "🌊 Quantum Fluids", fr: "🌊 Fluides Quantiques" },
      keywords: ["fluid", "quantum", "vortex", "particles", "superfluid", "friction", "physique", "physics"],
      desc: {
        en: "Simulate advanced quantum fluid dynamics, showing superfluid vortices, color trails, particle collisions, and friction scales.",
        fr: "Simulez la dynamique des fluides quantiques, affichant des tourbillons superfluides, trainées de couleur et collisions de particules."
      }
    },
    {
      id: "btn-timelapse-scene",
      category: "Premium Studios",
      name: { en: "⏳ Time Lapse 4D", fr: "⏳ Time Lapse 4D" },
      keywords: ["4d", "time lapse", "dimension", "t-axis", "temporal", "decay", "degradation"],
      desc: {
        en: "Warp and slice 3D objects across a fourth temporal dimension (t-axis), visualizing organic growth, crystal formations, or material decay.",
        fr: "Déformez et tranchez des objets 3D à travers une 4ème dimension temporelle (axe t), visualisant la croissance ou la décomposition."
      }
    },
    {
      id: "btn-product-scene",
      category: "Premium Studios",
      name: { en: "🛒 Product Showcase", fr: "🛒 Vitrine Produit" },
      keywords: ["product", "showcase", "e-com", "vitrine", "stand", "ring", "lights", "lumieres"],
      desc: {
        en: "An e-commerce product display stand with dynamic studio lights, auto-rotation turntable, shadow adjustments, and floating spec tags.",
        fr: "Un présentoir e-commerce avec lumières de studio dynamiques, plateau rotatif, réglage des ombres et étiquettes flottantes."
      }
    },
    {
      id: "btn-social-scene",
      category: "Premium Studios",
      name: { en: "💬 Social Media Room", fr: "💬 Salon Réseaux Sociaux" },
      keywords: ["social", "media", "posts", "wall", "mur", "likes", "feed", "comments", "commentaires"],
      desc: {
        en: "Render custom social media feeds onto a virtual 3D room gallery, showing post text cards, user avatars, comment clouds, and like stats.",
        fr: "Affichez des flux de réseaux sociaux sur les murs d'un salon 3D virtuel, avec cartes textuelles, avatars et nuages de likes."
      }
    },
    {
      id: "btn-gitrepo-scene",
      category: "Premium Studios",
      name: { en: "📂 Git City 3D", fr: "📂 Git Ville 3D" },
      keywords: ["git", "repository", "code", "city", "buildings", "commits", "files", "fichiers", "rues", "streets"],
      desc: {
        en: "Turn Git repositories into interactive 3D cities: directories map to streets, source files form skyscrapers, and code size dictates height.",
        fr: "Transformez vos dépôts Git en villes 3D interactives: les dossiers forment des rues, les fichiers des buildings selon leur taille."
      }
    },
    {
      id: "btn-webar-scene",
      category: "Premium Studios",
      name: { en: "👁️ Web AR Portal", fr: "👁️ Portail Web AR" },
      keywords: ["ar", "augmented reality", "portal", "realite augmentee", "webxr", "camera", "phone", "mobile"],
      desc: {
        en: "Wrap your generated 3D scene into a WebXR-compatible mobile environment to place your models in the real world via phone cameras.",
        fr: "Encapsulez votre scène dans un format compatible WebXR mobile pour placer vos modèles 3D dans le monde réel via votre caméra."
      }
    },
    {
      id: "btn-text2scene-scene",
      category: "Premium Studios",
      name: { en: "🪄 Text to Scene 3D", fr: "🪄 Texte vers Scène 3D" },
      keywords: ["text to scene", "txt to 3d", "natural language", "commandes", "prompt", "cubes", "generate"],
      desc: {
        en: "Write natural language commands (e.g. 'add a gold sphere', 'make it metallic') and a parser builds the physical 3D nodes instantly.",
        fr: "Saisissez des phrases simples (ex: 'ajouter une sphère en or', 'mettre en métal') pour générer des géométries 3D en direct."
      }
    },

    // Web Architect
    {
      id: "btn-webnet-scene",
      category: "Web Architect",
      name: { en: "🌐 Live Web Network", fr: "🌐 Réseau Web Live" },
      keywords: ["network", "webnet", "crawler", "nodes", "nouds", "links", "liens", "mesh"],
      desc: {
        en: "Render interconnected website link systems, web-crawler nodes, and mesh networks in 3D node-link structures.",
        fr: "Visualisez les systèmes de liens web interconnectés, noeuds d'indexation et réseaux maillés en structures 3D."
      }
    },
    {
      id: "btn-jsonlive-scene",
      category: "Web Architect",
      name: { en: "🌡️ JSON Dashboard", fr: "🌡️ Tableau de bord JSON" },
      keywords: ["json", "dashboard", "telemetry", "gauges", "jauges", "charts", "sensors", "capteurs"],
      desc: {
        en: "Feed custom JSON API responses into glowing 3D telemetry panels, dials, analog needles, and interactive monitoring charts.",
        fr: "Injectez des réponses d'API JSON dans des panneaux de télémétrie lumineux, jauges à aiguille et graphiques interactifs."
      }
    },
    {
      id: "btn-wslive-scene",
      category: "Web Architect",
      name: { en: "📡 WebSocket Live", fr: "📡 WebSocket en Direct" },
      keywords: ["websocket", "wss", "stream", "live data", "telemetry", "real-time"],
      desc: {
        en: "Connect to live WebSocket streams to visualize real-time high-speed data flow rates as pulsing 3D nodes and spikes.",
        fr: "Connectez-vous à des flux WebSocket pour visualiser les débits de données en temps réel sous forme d'ondes et pics 3D."
      }
    },
    {
      id: "btn-collab-mode",
      category: "Web Architect",
      name: { en: "🧑‍💻 Code Collab Live", fr: "🧑‍💻 Code Collab en Direct" },
      keywords: ["collab", "collaboration", "live coding", "room", "salon", "p2p", "partage"],
      desc: {
        en: "Launch a live workspace for local peer-to-peer coding collaboration and share generated model parameters instantly.",
        fr: "Lancez un espace partagé pour le codage à plusieurs en local et synchronisez instantanément les modèles générés."
      }
    },

    // Next-Gen Labs
    {
      id: "btn-math-scene",
      category: "Next-Gen Labs",
      name: { en: "📐 Math Surface 3D", fr: "📐 Surface Math 3D" },
      keywords: ["math", "surface", "klein", "mobius", "parametric", "equation", "formulas", "formules"],
      desc: {
        en: "Render parametric mathematical surfaces (Klein Bottle, Möbius Strip, sine waves) based on adjustable mathematical equations.",
        fr: "Générez des surfaces mathématiques paramétriques (bouteille de Klein, ruban de Möbius) réglables via des équations."
      }
    },
    {
      id: "btn-automata-scene",
      category: "Next-Gen Labs",
      name: { en: "🧬 Cellular Life", fr: "🧬 Vie Cellulaire 3D" },
      keywords: ["cellular", "automata", "life", "conway", "voxel grid", "matrix", "growth", "croissance"],
      desc: {
        en: "Simulate Conway's Game of Life or procedural growth algorithms inside an active 3D voxel grid cube matrix.",
        fr: "Simulez le Jeu de la Vie de Conway ou des algorithmes de croissance cellulaire dans une matrice de voxels 3D."
      }
    },
    {
      id: "btn-fractal-scene",
      category: "Next-Gen Labs",
      name: { en: "🌀 Fractal Generator", fr: "🌀 Générateur de Fractales" },
      keywords: ["fractal", "fractale", "mandelbrot", "julia", "recursive", "math", "geometry"],
      desc: {
        en: "Render complex mathematical fractals (Mandelbrot, Julia sets) extruded into glowing, infinite 3D geometries.",
        fr: "Calculez des fractales mathématiques (Mandelbrot, Julia) extrudées dans des structures géométriques 3D infinies."
      }
    },
    {
      id: "btn-dna-scene",
      category: "Next-Gen Labs",
      name: { en: "🧬 DNA Helix", fr: "🧬 Hélice ADN" },
      keywords: ["dna", "adn", "helix", "helice", "base pairs", "bases", "genetics", "genetique"],
      desc: {
        en: "Construct 3D double-helix DNA structures with adjustable spiral rotations, customized base-pair colors, and replication animations.",
        fr: "Assemblez des hélices ADN 3D avec pas de rotation réglables, couleurs personnalisables pour les bases et animations."
      }
    },
    {
      id: "btn-molecule-scene",
      category: "Next-Gen Labs",
      name: { en: "🧬 Molecule 3D", fr: "🧬 Molécule 3D" },
      keywords: ["molecule", "mol", "atoms", "atomes", "caffeine", "water", "glucose", "bonds", "liaisons"],
      desc: {
        en: "Build chemical atomic structures (Water, Caffeine, Glucose, Ethanol) using a premium ball-and-stick 3D visualization.",
        fr: "Affichez des structures atomiques chimiques (Eau, Caféine, Glucose, Éthanol) en modélisation 3D boules-bâtonnets."
      }
    },
    {
      id: "btn-crystal-scene",
      category: "Next-Gen Labs",
      name: { en: "🔮 Crystal Gen 3D", fr: "🔮 Générateur de Cristaux" },
      keywords: ["crystal", "cristal", "quartz", "ruby", "rubis", "refractive", "glass", "verre"],
      desc: {
        en: "Grow procedurally generated minerals and crystals (Quartz, Amethyst, Emerald) using refractive glass shaders and glowing inner cores.",
        fr: "Faites croître des minéraux et cristaux (Quartz, Améthyste, Émeraude) avec shaders de verre réfractif et noyaux luminescents."
      }
    },
    {
      id: "btn-botany-scene",
      category: "Next-Gen Labs",
      name: { en: "🌿 Botany Flora L-Sys", fr: "🌿 Flore L-Système" },
      keywords: ["botany", "botanique", "flora", "flore", "l-system", "plants", "plantes", "grammar", "rules"],
      desc: {
        en: "Generate realistic organic plants, trees, and leaves using Lindenmayer mathematical grammar systems and branching iterations.",
        fr: "Générez des plantes, arbres et feuillages organiques à partir de règles de grammaire mathématique L-Système."
      }
    },

    // Neural Sandbox
    {
      id: "btn-neural-scene",
      category: "Neural Sandbox",
      name: { en: "🕸️ Neural Net 3D", fr: "🕸️ Réseau de Neurones" },
      keywords: ["neural net", "neural", "brain", "reseau neurones", "cerveau", "layers", "couches", "weights", "poids"],
      desc: {
        en: "Visualize deep neural networks in 3D. Inspect Input, Hidden, and Output node layers, weight paths, and glowing activation triggers.",
        fr: "Visualisez des réseaux de neurones en 3D. Examinez les couches d'entrée, cachées et de sortie, poids et propagations."
      }
    },
    {
      id: "btn-sentiment-scene",
      category: "Neural Sandbox",
      name: { en: "🧠 Sentiment Landscape", fr: "🧠 Relief Émotionnel" },
      keywords: ["sentiment", "emotion", "landscape", "relief", "analyze", "analyser", "text", "texte"],
      desc: {
        en: "Input custom text to perform emotional analysis. The engine deforms a 3D landscape mesh based on happy, sad, or aggressive scores.",
        fr: "Analysez la tonalité d'un texte. Le moteur déforme un relief 3D selon les scores de joie, tristesse ou agressivité calculés."
      }
    },
    {
      id: "btn-bio-scene",
      category: "Neural Sandbox",
      name: { en: "🌡️ Biometric Avatar", fr: "🌡️ Avatar Biométrique" },
      keywords: ["biometric", "biometrie", "avatar", "ecg", "heartbeat", "cardio", "pulse", "pulses"],
      desc: {
        en: "Render live biometric feedback (electrocardiogram pulse waves, breathing rates, blood pressures) onto a glowing 3D human torso.",
        fr: "Affichez des retours biométriques (ondes ECG, rythmes respiratoires, pouls) sur un torse humain 3D lumineux."
      }
    },

    // Mesh Gradient
    {
      id: "btn-svg",
      category: "Mesh Gradient",
      name: { en: "🖼️ SVG Import", fr: "🖼️ Import SVG" },
      keywords: ["svg", "vector", "vectoriel", "path", "chemin", "extrude", "extruder", "bevel", "biseau"],
      desc: {
        en: "Import custom SVG files, parse XML vector paths, and extrude them into 3D meshes with adjustable depths and bevel styles.",
        fr: "Importez des fichiers SVG, analysez les tracés vectoriels et extrudez-les en modèles 3D avec biseaux réglables."
      }
    },
    {
      id: "btn-dxf",
      category: "Mesh Gradient",
      name: { en: "📐 DXF Import", fr: "📐 Import DXF" },
      keywords: ["dxf", "cad", "drawing", "plan", "autocad", "extrude", "polylines"],
      desc: {
        en: "Load industrial DXF CAD drafts, extract drawing polylines, and extrude blueprints into physical structural 3D models.",
        fr: "Chargez des fichiers DXF de CAO, extrayez les polylignes de dessin et extrudez les plans en modèles structurels 3D."
      }
    },
    {
      id: "btn-pixel-scene",
      category: "Mesh Gradient",
      name: { en: "🎮 Pixel Voxel 3D", fr: "🎮 Pixel Voxel 3D" },
      keywords: ["pixel", "voxel", "voxel art", "grid", "grille", "draw", "dessiner", "minecraft"],
      desc: {
        en: "Draw on a 2D pixel grid and automatically extrude pixels into physical 3D voxel cubes (similar to voxel blocks).",
        fr: "Dessinez sur une grille pixel 2D et extrudez automatiquement les cases en cubes de voxels 3D physiques."
      }
    },
    {
      id: "btn-impossible-scene",
      category: "Mesh Gradient",
      name: { en: "👁️ Impossible Geometry", fr: "👁️ Géométrie Impossible" },
      keywords: ["impossible", "illusion", "escher", "penrose", "staircase", "escalier", "optical", "optique"],
      desc: {
        en: "Render optical illusions in 3D space, including the Penrose Triangle and Escher's infinite staircases.",
        fr: "Affichez des illusions d'optique géométriques en 3D comme le triangle de Penrose ou l'escalier infini d'Escher."
      }
    },
    {
      id: "btn-papercraft-scene",
      category: "Mesh Gradient",
      name: { en: "📄 Papercraft Builder", fr: "📄 Patron Papercraft" },
      keywords: ["papercraft", "origami", "flatten", "unfold", "deplier", "folding", "pliage"],
      desc: {
        en: "Deconstruct low-poly 3D models into flat 2D cutting patterns or fold 2D sheets back into paper-style origami.",
        fr: "Déconstruisez des modèles 3D low-poly en patrons 2D à découper ou repliez des patrons en origami virtuel."
      }
    },
    {
      id: "btn-shield-scene",
      category: "Mesh Gradient",
      name: { en: "🛡️ Force Shield 3D", fr: "🛡️ Bouclier d'Énergie" },
      keywords: ["shield", "force shield", "bouclier", "ripple", "ondulation", "impact", "cursor", "laser"],
      desc: {
        en: "Generate glowing force-fields that ripple dynamically on mouse cursor collisions and deflect simulated laser impacts.",
        fr: "Générez un champ de force lumineux qui ondule lors de collisions avec le pointeur ou d'impacts de lasers."
      }
    },

    // Audio Synth
    {
      id: "btn-audio-scene",
      category: "Audio Synth",
      name: { en: "🎵 Audio 3D Visualizer", fr: "🎵 Visualiseur Audio 3D" },
      keywords: ["audio", "music", "musique", "visualizer", "visualiseur", "frequencies", "mic", "mp3"],
      desc: {
        en: "Create 3D meshes (cubes, rings) that scale and pulse to music frequencies. Supports microphone input and MP3 file uploads.",
        fr: "Générez des objets 3D (cubes, anneaux) pulsant selon les fréquences de la musique. Gère le micro et les fichiers MP3."
      }
    },
    {
      id: "btn-midi-scene",
      category: "Audio Synth",
      name: { en: "🎼 MIDI Note Arch", fr: "🎼 Arches de Notes MIDI" },
      keywords: ["midi", "piano roll", "arches", "keys", "notes", "visualize midi"],
      desc: {
        en: "Import standard MIDI piano rolls and visualize keys falling as illuminated arches and rings inside a virtual auditorium.",
        fr: "Importez des fichiers MIDI pour visualiser les touches de piano tomber sous forme d'arches lumineuses colorées."
      }
    },
    {
      id: "btn-voice-scene",
      category: "Audio Synth",
      name: { en: "🎙️ Voice Sculpture", fr: "🎙️ Sculpture Vocale" },
      keywords: ["voice", "sculpture", "mic", "deform", "parler", "deformer", "amplitude"],
      desc: {
        en: "Deform 3D sphere meshes in real-time by speaking or singing into the microphone. Voice amplitude shapes the geometry vertices.",
        fr: "Déformez une sphère 3D en direct en parlant ou chantant dans le micro. L'amplitude vocale sculpte les sommets."
      }
    },

    // Holo Cards
    {
      id: "btn-gallery-scene",
      category: "Holo Cards",
      name: { en: "🖼️ Document Carousel", fr: "🖼️ Carrousel de Documents" },
      keywords: ["doc", "gallery", "carousel", "carrousel", "markdown", "cards", "fiches", "floating"],
      desc: {
        en: "Organize textual guides and markdown notes on floating 3D glass cards arranged in a rotating carousel.",
        fr: "Organisez des fiches texte et notes markdown sur des cartes de verre 3D rotatives en carrousel."
      }
    },
    {
      id: "btn-pdf-scene",
      category: "Holo Cards",
      name: { en: "📄 PDF 3D Book", fr: "📄 Livre PDF 3D" },
      keywords: ["pdf", "book", "livre", "pages", "turn", "tourner", "booklet", "brochure"],
      desc: {
        en: "Upload PDF files and render their pages inside a realistic physical 3D booklet. Grabbing pages turns them with smooth physics.",
        fr: "Chargez des fichiers PDF et affichez leurs pages dans un livre 3D réaliste. Tournez les pages en les glissant."
      }
    },
    {
      id: "btn-tree-scene",
      category: "Holo Cards",
      name: { en: "🌳 Logic Node Tree", fr: "🌳 Arbre Logique" },
      keywords: ["tree", "logic", "nodes", "noeuds", "mindmap", "organizational", "hierarchie"],
      desc: {
        en: "Visualize structural mindmaps, parent-child flows, and organizational diagrams in interactive 3D node chains.",
        fr: "Représentez des cartes mentales, arborescences de dossiers ou diagrammes hiérarchiques sous forme de noeuds 3D."
      }
    },
    {
      id: "btn-story-scene",
      category: "Holo Cards",
      name: { en: "🗣️ Visual Novel Book", fr: "🗣️ Visual Novel Book" },
      keywords: ["story", "novel", "visual novel", "choices", "choix", "scenario"],
      desc: {
        en: "Write dialogue trees and navigate through custom scenarios with interactive choice buttons rendered inside a 3D volume book.",
        fr: "Écrivez des scénarios interactifs et naviguez dans l'histoire avec des boutons de choix modélisés sur un livre 3D."
      }
    },
    {
      id: "btn-qr-labyrinth-scene",
      category: "Holo Cards",
      name: { en: "🧩 QR Code Maze", fr: "🧩 Labyrinthe Code QR" },
      keywords: ["qr labyrinth", "maze", "labyrinth", "labyrinthe", "qr", "walls", "murs"],
      desc: {
        en: "Generate a QR code containing any URL, then convert its patterns into a physical 3D grid wall maze.",
        fr: "Générez un QR Code pour n'importe quelle URL, puis extrudez ses motifs sombres en murs de labyrinthe 3D."
      }
    },
    {
      id: "btn-terrain-scene",
      category: "Holo Cards",
      name: { en: "⛰️ Location Topography", fr: "⛰️ Topographie de Lieu" },
      keywords: ["terrain", "gps", "coordinates", "coordonnees", "map", "carte", "altitude", "elevation"],
      desc: {
        en: "Generate virtual 3D topography and relief contours using custom GPS coordinate inputs or simulated height data.",
        fr: "Générez des reliefs topographiques et courbes de niveau 3D à l'aide de coordonnées GPS ou de simulations d'altitude."
      }
    },

    // Export & System
    {
      id: "btn-dl-html",
      category: "Export",
      name: { en: "💾 HTML Standalone Export", fr: "💾 Export HTML Autonome" },
      keywords: ["export html", "download html", "télécharger html", "html code"],
      desc: {
        en: "Compiles the active 3D model, setup lights, cameras, and controls into a single standalone, offline-runnable HTML file.",
        fr: "Compile le modèle 3D actif, les lumières, caméras et contrôles dans un fichier HTML unique exécutable hors-ligne."
      }
    },
    {
      id: "btn-export-zip",
      category: "Export",
      name: { en: "📦 ZIP Package Pro", fr: "📦 Export Pack ZIP Pro" },
      keywords: ["export zip", "zip pack", "download zip", "télécharger zip"],
      desc: {
        en: "Packages the entire workspace, including external Three.js libraries, models, scripts, and readme instructions, into a structured ZIP archive.",
        fr: "Regroupe tout l'espace de travail, incluant librairies Three.js, scripts et documentations bilingues dans un dossier ZIP."
      }
    },
    {
      id: "btn-screenshot",
      category: "Export",
      name: { en: "📸 PNG Screenshot", fr: "📸 Capture Photo PNG" },
      keywords: ["screenshot", "capture", "png", "photo", "image"],
      desc: {
        en: "Takes a high-resolution snapshot of the WebGL canvas viewport and triggers a PNG download.",
        fr: "Prend une photo haute définition du canevas WebGL et lance le téléchargement de l'image en PNG."
      }
    },
    {
      id: "btn-export-video",
      category: "Export",
      name: { en: "🎥 WebM Video Recording", fr: "🎥 Enregistreur Vidéo WebM" },
      keywords: ["record video", "record WebM", "enregistrer video", "rec", "capturer video"],
      desc: {
        en: "Records the active canvas animation frames and exports a high-quality WebM video file directly to your downloads.",
        fr: "Enregistre l'animation du canevas WebGL en temps réel et génère un fichier vidéo WebM de haute qualité."
      }
    }
  ];

  // Helper dictionary of standard UI texts
  const uiTexts = {
    en: {
      botTitle: "IA Guide Bot",
      botSubtitle: "Knows every studio module",
      clearBtn: "Clear",
      placeholder: "Ask a question about the app...",
      welcome: "I know **every tool** in this app — over 200 modules across 20 categories. Ask me anything like:\n- *\"What is the Asset Optimizer?\"*\n- *\"How do I use the Neural Network Sandbox?\"*\n- *\"Open Holographic 3D Cards\"*\n- *\"What modules are in Premium Studios?\"*\n- *\"How do I export my app?\"*\n\nOr click **All Modules** to browse by category!",
      notFound: "I couldn't find a specific module for that query. Click on one of the suggestion buttons below or try asking about another tool like *Steampunk*, *Anatomy*, *Lego*, or *Lava*!",
      opening: "🚀 Opening **{name}** module for you!",
      categoryTitle: "📂 **{cat}** Category Modules:",
      allModulesHeader: "📂 **All Studio Modules** (Click one to open):"
    },
    fr: {
      botTitle: "IA Guide Bot",
      botSubtitle: "Connaît tous les modules du studio",
      clearBtn: "Effacer",
      placeholder: "Posez une question sur l'app...",
      welcome: "Je connais **tous les outils** de cette application — plus de 200 modules dans 20 catégories. Demandez-moi par exemple:\n- *\"Qu'est-ce que l'Optimiseur d'Actifs ?\"*\n- *\"Comment utiliser le Bac à sable Neural ?\"*\n- *\"Ouvre les Cartes Holographiques\"*\n- *\"Quels modules sont dans Premium Studios ?\"*\n- *\"Comment exporter mon application ?\"*\n\nOu cliquez sur **Tous les modules** pour parcourir !",
      notFound: "Je n'ai pas trouvé de module spécifique pour cette recherche. Cliquez sur un des boutons ci-dessous ou demandez par exemple: *Steampunk*, *Anatomie*, *Lego* ou *Lave* !",
      opening: "🚀 Ouverture du module **{name}** !",
      categoryTitle: "📂 Catégorie **{cat}** :",
      allModulesHeader: "📂 **Tous les modules** (Cliquez pour ouvrir) :"
    }
  };

  // Setup DOM elements
  let triggerBtn = null;
  let panel = null;
  let chatArea = null;
  let inputField = null;

  function init() {
    currentLang = window.currentLang || 'fr'; // default to app setting

    // Injects CSS styles dynamically
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      #ia-guide-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #6366f1);
        box-shadow: 0 8px 32px rgba(124, 58, 237, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10000;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: ia-pulse 2s infinite;
      }
      @keyframes ia-pulse {
        0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
        100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
      }
      #ia-guide-trigger:hover {
        transform: scale(1.1);
        background: linear-gradient(135deg, #8b5cf6, #4f46e5);
      }
      #ia-guide-panel {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 380px;
        height: 550px;
        border-radius: 16px;
        background: rgba(13, 18, 37, 0.95);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(99, 102, 241, 0.3);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(20px);
        opacity: 0;
        pointer-events: none;
      }
      #ia-guide-panel.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      #ia-guide-header {
        background: #7c3aed;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .ia-bot-info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
      }
      .ia-bot-avatar {
        font-size: 24px;
        animation: ia-float 3s ease-in-out infinite;
      }
      @keyframes ia-float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
        100% { transform: translateY(0px); }
      }
      .ia-bot-text {
        display: flex;
        flex-direction: column;
      }
      .ia-bot-name {
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.2px;
      }
      .ia-bot-sub {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.8);
      }
      #ia-guide-clear {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 6px;
        color: white;
        font-size: 10px;
        font-weight: 700;
        padding: 4px 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      #ia-guide-clear:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      #ia-guide-chat {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scrollbar-width: thin;
        scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
      }
      .ia-msg {
        max-width: 85%;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 12px;
        line-height: 1.4;
        animation: ia-bubble-pop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes ia-bubble-pop {
        from { opacity: 0; transform: scale(0.9) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .ia-msg.bot {
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(99, 102, 241, 0.2);
        color: #e2e8f0;
        align-self: flex-start;
        border-bottom-left-radius: 2px;
      }
      .ia-msg.user {
        background: #6366f1;
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 2px;
      }
      #ia-guide-chips {
        padding: 10px 12px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        border-top: 1px solid rgba(99, 102, 241, 0.15);
        background: rgba(10, 15, 30, 0.6);
        max-height: 110px;
        overflow-y: auto;
      }
      .ia-chip {
        background: rgba(30, 41, 59, 0.7);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 6px;
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
        padding: 5px 4px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ia-chip:hover {
        background: rgba(99, 102, 241, 0.25);
        border-color: #6366f1;
        color: white;
      }
      #ia-guide-input-bar {
        padding: 12px 14px;
        display: flex;
        gap: 8px;
        border-top: 1px solid rgba(99, 102, 241, 0.15);
        background: rgba(10, 15, 30, 0.8);
      }
      #ia-guide-input {
        flex: 1;
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 8px;
        color: white;
        padding: 8px 12px;
        font-size: 12px;
        outline: none;
        transition: all 0.2s;
      }
      #ia-guide-input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 8px rgba(99, 102, 241, 0.2);
      }
      #ia-guide-send {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #6366f1;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        transition: all 0.2s;
      }
      #ia-guide-send:hover {
        background: #4f46e5;
        transform: scale(1.05);
      }
      .ia-link {
        color: #22d3ee;
        text-decoration: underline;
        cursor: pointer;
        display: inline-block;
        margin: 2px 0;
        font-weight: bold;
      }
      .ia-link:hover {
        color: #38bdf8;
      }
    `;
    document.head.appendChild(styleEl);

    // Create trigger button
    triggerBtn = document.createElement('div');
    triggerBtn.id = 'ia-guide-trigger';
    triggerBtn.title = 'IA Guide Bot';
    triggerBtn.innerHTML = '🤖';
    document.body.appendChild(triggerBtn);

    // Create chat panel
    panel = document.createElement('div');
    panel.id = 'ia-guide-panel';
    panel.innerHTML = `
      <div id="ia-guide-header">
        <div class="ia-bot-info">
          <span class="ia-bot-avatar">🤖</span>
          <div class="ia-bot-text">
            <span class="ia-bot-name" id="ia-lbl-title">IA Guide Bot</span>
            <span class="ia-bot-sub" id="ia-lbl-subtitle">Knows every studio module</span>
          </div>
        </div>
        <button id="ia-guide-clear">Clear</button>
      </div>
      <div id="ia-guide-chat"></div>
      <div id="ia-guide-chips"></div>
      <div id="ia-guide-input-bar">
        <input type="text" id="ia-guide-input" spellcheck="false" placeholder="Ask a question..." autocomplete="off">
        <button id="ia-guide-send">➔</button>
      </div>
    `;
    document.body.appendChild(panel);

    chatArea = panel.querySelector('#ia-guide-chat');
    inputField = panel.querySelector('#ia-guide-input');

    // Register events
    triggerBtn.addEventListener('click', togglePanel);
    panel.querySelector('#ia-guide-clear').addEventListener('click', clearChat);
    panel.querySelector('#ia-guide-send').addEventListener('click', handleSend);
    inputField.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    // Build chip suggestions
    renderChips();

    // Render initial welcome
    addWelcomeMessage();

    // Set initial text languages
    refreshLang();
  }

  function togglePanel() {
    isPanelOpen = !isPanelOpen;
    if (isPanelOpen) {
      panel.classList.add('active');
      triggerBtn.innerHTML = '❌';
      triggerBtn.style.background = '#ef4444';
      triggerBtn.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.4)';
      inputField.focus();
    } else {
      panel.classList.remove('active');
      triggerBtn.innerHTML = '🤖';
      triggerBtn.style.background = 'linear-gradient(135deg, #7c3aed, #6366f1)';
      triggerBtn.style.boxShadow = '0 8px 32px rgba(124, 58, 237, 0.4)';
    }
  }

  function refreshLang() {
    currentLang = window.currentLang || 'fr';
    const texts = uiTexts[currentLang];

    panel.querySelector('#ia-lbl-title').textContent = texts.botTitle;
    panel.querySelector('#ia-lbl-subtitle').textContent = texts.botSubtitle;
    panel.querySelector('#ia-guide-clear').textContent = texts.clearBtn;
    inputField.placeholder = texts.placeholder;

    renderChips();
  }

  function renderChips() {
    const chipContainer = panel.querySelector('#ia-guide-chips');
    chipContainer.innerHTML = '';

    const list = currentLang === 'fr' 
      ? ["Tous les modules", "IA ULTRA", "Premium Studios", "Architecte Web", "Labs Next-Gen", "Bac à sable Neural", "Dégradé Mesh", "Synthé Audio", "Holo Cartes", "Exportation"]
      : ["All Modules", "IA ULTRA", "Premium Studios", "Web Architect", "Next-Gen Labs", "Neural Sandbox", "Mesh Gradient", "Audio Synth", "Holo Cards", "Export"];

    list.forEach(chipName => {
      const btn = document.createElement('div');
      btn.className = 'ia-chip';
      btn.textContent = chipName;
      btn.title = chipName;
      btn.addEventListener('click', () => handleChipClick(chipName));
      chipContainer.appendChild(btn);
    });
  }

  function clearChat() {
    chatArea.innerHTML = '';
    addWelcomeMessage();
  }

  function addWelcomeMessage() {
    const text = uiTexts[currentLang].welcome;
    addMessage(text, 'bot');
  }

  function addMessage(htmlContent, sender) {
    const bubble = document.createElement('div');
    bubble.className = `ia-msg ${sender}`;
    bubble.innerHTML = formatMarkdown(htmlContent);
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function formatMarkdown(text) {
    // Basic formatting for presentation
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/- (.*)/g, '• $1');
  }

  function handleSend() {
    const val = inputField.value.trim();
    if (!val) return;

    addMessage(val, 'user');
    inputField.value = '';

    // Process answer
    setTimeout(() => {
      processInput(val);
    }, 400);
  }

  function handleChipClick(chipName) {
    addMessage(chipName, 'user');

    setTimeout(() => {
      // Map category back to internal names if French
      let mappedCat = chipName;
      if (currentLang === 'fr') {
        if (chipName === "Tous les modules") mappedCat = "All Modules";
        if (chipName === "Architecte Web") mappedCat = "Web Architect";
        if (chipName === "Labs Next-Gen") mappedCat = "Next-Gen Labs";
        if (chipName === "Bac à sable Neural") mappedCat = "Neural Sandbox";
        if (chipName === "Dégradé Mesh") mappedCat = "Mesh Gradient";
        if (chipName === "Synthé Audio") mappedCat = "Audio Synth";
        if (chipName === "Holo Cartes") mappedCat = "Holo Cards";
        if (chipName === "Exportation") mappedCat = "Export";
      }

      if (mappedCat === "All Modules") {
        const header = uiTexts[currentLang].allModulesHeader;
        let body = header + "<br><br>";
        
        // Group and sort all modules
        const sorted = [...modulesDatabase].sort((a, b) => {
          const nameA = a.name[currentLang].toUpperCase();
          const nameB = b.name[currentLang].toUpperCase();
          return nameA.localeCompare(nameB);
        });

        sorted.forEach(m => {
          body += `• <span class="ia-link" data-id="${m.id}">${m.name[currentLang]}</span><br>`;
        });

        addMessage(body, 'bot');
        hookLinks();
        return;
      }

      // Check if it's a category
      if (categories[currentLang][mappedCat] !== undefined || categories['en'][mappedCat] !== undefined) {
        const descText = categories[currentLang][mappedCat] || categories['en'][mappedCat];
        const categoryHeader = uiTexts[currentLang].categoryTitle.replace('{cat}', chipName);
        let body = `**${chipName}**: *${descText}*<br><br>${categoryHeader}<br>`;

        const matching = modulesDatabase.filter(m => m.category === mappedCat);
        matching.forEach(m => {
          body += `• <span class="ia-link" data-id="${m.id}">${m.name[currentLang]}</span>: ${m.desc[currentLang]}<br>`;
        });

        addMessage(body, 'bot');
        hookLinks();
      } else {
        processInput(chipName);
      }
    }, 400);
  }

  function hookLinks() {
    chatArea.querySelectorAll('.ia-link').forEach(link => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('data-id');
        triggerModule(id);
      });
    });
  }

  function processInput(query) {
    const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Check if the user is asking to open something
    const openKeywords = ["open", "launch", "run", "activate", "view", "start", "ouvre", "lancer", "activer", "charge", "afficher", "lance"];
    let wantsToOpen = false;
    for (const w of openKeywords) {
      if (cleanQuery.includes(w)) {
        wantsToOpen = true;
        break;
      }
    }

    // Keyword matching
    let bestMatch = null;
    let highestScore = 0;

    modulesDatabase.forEach(m => {
      let score = 0;
      m.keywords.forEach(kw => {
        const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (cleanQuery.includes(cleanKw)) {
          // Grant higher points to longer keyword matches
          score += cleanKw.length;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = m;
      }
    });

    // If score is high enough
    if (bestMatch && highestScore > 2) {
      if (wantsToOpen) {
        triggerModule(bestMatch.id);
      } else {
        const nameText = bestMatch.name[currentLang];
        const descText = bestMatch.desc[currentLang];
        const linkHtml = `<br><br>👉 <span class="ia-link" data-id="${bestMatch.id}">${currentLang === 'fr' ? 'Cliquez ici pour charger ce module' : 'Click here to load this module'}</span>`;
        addMessage(`**${nameText}**<br>${descText}${linkHtml}`, 'bot');
        hookLinks();
      }
    } else {
      // General fallbacks or special rules
      if (cleanQuery.includes("lighting") || cleanQuery.includes("lumier") || cleanQuery.includes("lights")) {
        triggerModule("btn-lighting");
        return;
      }
      if (cleanQuery.includes("clon")) {
        triggerModule("btn-clone-obj");
        return;
      }
      if (cleanQuery.includes("environment") || cleanQuery.includes("environ")) {
        addMessage(currentLang === 'fr' ? "Vous pouvez modifier l'environnement de fond dans le menu déroulant **Environnement** situé en bas du panneau latéral gauche." : "You can change the background environment using the **Scene Environment** dropdown located at the bottom of the left-hand sidebar.", 'bot');
        return;
      }

      // No match
      addMessage(uiTexts[currentLang].notFound, 'bot');
    }
  }

  function triggerModule(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      // Show opening animation or message
      const moduleMeta = modulesDatabase.find(m => m.id === buttonId);
      const name = moduleMeta ? moduleMeta.name[currentLang] : buttonId.replace('btn-', '').toUpperCase();
      const msg = uiTexts[currentLang].opening.replace('{name}', name);
      addMessage(msg, 'bot');
      
      // Programmatically click
      btn.click();

      // Dispatch feedback toast if available
      if (window.toast) {
        window.toast(currentLang === 'fr' ? `🚀 IA Guide: Ouverture de ${name}` : `🚀 IA Guide: Opening ${name}`);
      }
    } else {
      addMessage(currentLang === 'fr' ? `❌ Erreur: Le bouton ou module '${buttonId}' est actuellement introuvable.` : `❌ Error: The button or module '${buttonId}' is not found.`, 'bot');
    }
  }

  return {
    init,
    refreshLang,
    triggerModule
  };
})();

// Initialize on document load
window.addEventListener('DOMContentLoaded', () => {
  IAGuideBot.init();
  window.IAGuideBot = IAGuideBot;
});
