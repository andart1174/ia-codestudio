/**
 * ══════════════════════════════════════════════════════════════════════
 * 🎮 CYBER ARCADE 3D ARENA — MASTER ENGINE (V12 - NON-STOP ENEMIES IN ALL GAMES)
 * ══════════════════════════════════════════════════════════════════════
 * - 🌀 Quantum Slalom: Non-stop Alien Interceptor Drones in Tunnel!
 * - 🕳️ Black Hole: Non-stop Alien Hunter Gunships swarming the Singularity!
 * - 🏎️ Cyber Racer 2077: Non-stop Rival Cybercars & EMP Enforcers to blast & overtake!
 * - 🤖 Cyber Mech: Non-stop Rogue Combat Walkers, Spider Drones & Attack Gunships!
 * - 🚀 Deep Space & Megacity: Non-stop Alien Saucers, Heavy Dreadnoughts & Dropships!
 * ══════════════════════════════════════════════════════════════════════
 */

class CyberArcadeEngine {
    constructor() {
        this.canvas = document.getElementById('arcade-webgl-canvas');
        this.activeGame = 'blaster';
        this.isRunning = false;
        this.isPaused = false;
        
        // Player Stats & Lives
        this.score = 0;
        this.crystals = 0;
        this.combo = 1;
        this.comboTimer = 0;
        this.shield = 100;
        this.lives = 3;
        this.invulnerableTimer = 0;
        this.lastDamageTime = 0;
        this.missiles = 4;
        this.wave = 1;
        this.isBoosting = false;

        // 📱 AR State
        this.isARMode = false;
        this.arVideoStream = null;
        this.arVideo = document.getElementById('ar-camera-video');
        this.arVideoTexture = null;
        this.deviceOrientation = { alpha: 0, beta: 0, gamma: 0, active: false };
        this.isCyberScanActive = false;
        this.isTableLandingMode = false;
        this.arShow3DShip = false;
        this.dimensionalPortal = null;
        this.lastSonarPingTime = 0;

        // 🎥 Video Recorder
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecordingVideo = false;
        this.recordingCountdown = 10;
        this.recordingInterval = null;

        // Overdrive Mega-Beam
        this.overdriveCharge = 100;
        this.isMegaBeamActive = false;
        this.megaBeamTimer = 0;
        this.megaBeamMesh = null;

        // Camera Mode
        this.cameraMode = 'third';

        // Power-ups
        this.tripleLaserTimer = 0;
        this.chronoSlowTimer = 0;
        this.hasForcefield = false;
        this.forcefieldMesh = null;
        
        // Rival Challenge
        this.targetRivalScore = 0;
        this.rivalName = '';
        this.rivalBeaten = false;

        // Three.js Core
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();

        // Game Entities
        this.playerShip = null;
        this.deskShip = null;
        this.gatlingBarrels = null;
        this.mechLegs = [];
        this.saberLeft = null;
        this.saberRight = null;

        this.engineThrusters = [];
        this.lasers = [];
        this.homingMissiles = [];
        this.alienShips = [];
        this.alienLasers = [];
        this.asteroids = [];
        this.particles = [];
        this.collectibleCrystals = [];
        this.powerUpOrbs = [];
        this.quantumGates = [];
        this.bossShip = null;
        this.bossActive = false;
        this.bossHP = 100;
        this.blackHole = null;

        // 🏎️ Racer Entities
        this.racerHighwayRoads = [];
        this.racerNitroGates = [];
        this.rivalRacerCars = [];

        // 🤖 Mech Entities
        this.enemyWalkerRobots = [];

        // 🎵 Beat Slicer Entities
        this.beatCubes = [];

        // 🏄 Surf Entities
        this.surfLightRails = [];
        this.starlightEnergyOrbs = [];

        // 🏙️ Megacity Entities
        this.cityBuildings = [];
        this.hoverCars = [];
        this.skyBridges = [];
        this.buildingWindowTexture = null;

        // Input
        this.input = { x: 0, y: 0, firing: false, boost: false };
        this.laserColor = '#00f2fe';
        this.activeShipType = 'apex';
        this.deskColorIndex = 0;
        this.arReticleScreenPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        this.audioCtx = null;
        this.soundEnabled = true;

        this.initDOMBindings();
    }

    initDOMBindings() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        this.initTouchControls();

        const btnQuickBack = document.getElementById('btn-quick-back-hub');
        if (btnQuickBack) {
            btnQuickBack.onclick = (e) => { if(e) e.preventDefault(); this.exitToHub(); };
        }

        const btnToggleAR = document.getElementById('btn-toggle-ar-menu');
        if (btnToggleAR) {
            btnToggleAR.onclick = (e) => { if(e) e.preventDefault(); this.toggleARMenu(); };
        }
        this.initDeviceOrientation();

        const btnPause = document.getElementById('btn-pause-game');
        if (btnPause) btnPause.addEventListener('click', () => this.togglePause());

        const btnExit = document.getElementById('btn-exit-game');
        if (btnExit) btnExit.addEventListener('click', () => this.exitToHub());

        const btnCam = document.getElementById('btn-toggle-camera');
        if (btnCam) btnCam.addEventListener('click', () => this.toggleCameraView());

        // 🌟 AR Toolbar Buttons
        const btnBarRecord = document.getElementById('btn-ar-bar-record');
        if (btnBarRecord) {
            btnBarRecord.addEventListener('click', () => {
                if (this.isRecordingVideo) this.stopARRecording();
                else this.startARRecording(10);
            });
        }

        const btnBarShipToggle = document.getElementById('btn-ar-bar-ship-toggle');
        if (btnBarShipToggle) {
            btnBarShipToggle.addEventListener('click', () => this.toggleARShipView());
        }

        const btnBarTableLand = document.getElementById('btn-ar-bar-table-land');
        if (btnBarTableLand) {
            btnBarTableLand.addEventListener('click', () => this.startTableLandingMode());
        }

        const btnBarScanner = document.getElementById('btn-ar-bar-scanner');
        if (btnBarScanner) {
            btnBarScanner.addEventListener('click', () => this.toggleCyberScan());
        }

        const btnBarExit = document.getElementById('btn-ar-bar-exit');
        if (btnBarExit) {
            btnBarExit.addEventListener('click', () => this.exitToHub());
        }

        // Table Landing Buttons
        const btnQuickLand = document.getElementById('btn-quick-land-table');
        if (btnQuickLand) {
            btnQuickLand.addEventListener('click', () => {
                this.startGame('ar');
                setTimeout(() => this.startTableLandingMode(), 400);
            });
        }

        const btnTakeoff = document.getElementById('btn-takeoff-table');
        if (btnTakeoff) {
            btnTakeoff.addEventListener('click', () => this.takeoffFromTable());
        }

        const btnCycleColor = document.getElementById('btn-cycle-desk-color');
        if (btnCycleColor) {
            btnCycleColor.addEventListener('click', () => this.cycleDeskShipColor());
        }

        // Video Modal Close & Share
        const btnCloseVideo = document.getElementById('btn-close-ar-video');
        const modalVideo = document.getElementById('modal-ar-video-recorder');
        if (btnCloseVideo && modalVideo) {
            btnCloseVideo.addEventListener('click', () => modalVideo.classList.remove('active'));
        }

        const btnShareWA = document.getElementById('btn-share-ar-whatsapp');
        if (btnShareWA) {
            btnShareWA.addEventListener('click', () => {
                const msg = encodeURIComponent('🔥 Look at this 3D alien invasion in my room! Play Cyber Arcade in AR: https://ia-codestudio.com/cyber-arcade/');
                window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
            });
        }

        const btnSound = document.getElementById('btn-toggle-sound');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                this.soundEnabled = !this.soundEnabled;
                btnSound.innerHTML = this.soundEnabled 
                    ? '<i class="fa-solid fa-volume-high"></i>' 
                    : '<i class="fa-solid fa-volume-xmark" style="color:#ff007f;"></i>';
            });
        }
    }

    initDeviceOrientation() {
        window.addEventListener('deviceorientation', (e) => {
            if (e.alpha !== null && e.beta !== null) {
                this.deviceOrientation.alpha = e.alpha || 0;
                this.deviceOrientation.beta = e.beta || 0;
                this.deviceOrientation.gamma = e.gamma || 0;
                this.deviceOrientation.active = true;
            }
        }, true);
    }

    setShipType(type) {
        this.activeShipType = type;
        localStorage.setItem('cyber_equipped_craft', type);
    }

    setLaserColor(color) {
        this.laserColor = color;
        localStorage.setItem('cyber_equipped_laser', color);
    }

    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.audioCtx = new AudioContext();
        }
    }

    playSFX(type) {
        if (!this.soundEnabled || !this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        try {
            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            if (type === 'laser') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(950, now);
                osc.frequency.exponentialRampToValueAtTime(120, now + 0.14);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
                osc.start(now);
                osc.stop(now + 0.14);
            } else if (type === 'sword' || type === 'slice') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === 'gatling') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'nitro') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.4);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
            } else if (type === 'sonar') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'missile') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(660, now + 0.3);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'overdrive' || type === 'emp') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(120, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.8);
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
            } else if (type === 'alien_laser') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(580, now);
                osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.start(now);
                osc.stop(now + 0.18);
            } else if (type === 'explosion') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'crystal' || type === 'powerup') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.08);
                osc.frequency.setValueAtTime(1046.50, now + 0.16);
                gain.gain.setValueAtTime(0.28, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
                osc.start(now);
                osc.stop(now + 0.28);
            } else if (type === 'combo') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (type === 'respawn') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            }
        } catch (e) {}
    }

    startARRecording(duration = 10) {
        if (!this.canvas) return;
        this.playSFX('crystal');

        try {
            const stream = this.canvas.captureStream(30);
            this.recordedChunks = [];

            const options = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('video/webm;codecs=vp9'))
                ? { mimeType: 'video/webm;codecs=vp9' }
                : { mimeType: 'video/webm' };

            this.mediaRecorder = new MediaRecorder(stream, options);
            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                const videoURL = URL.createObjectURL(blob);

                const preview = document.getElementById('ar-recorded-preview');
                if (preview) preview.src = videoURL;

                const btnDownload = document.getElementById('btn-download-ar-video');
                if (btnDownload) btnDownload.href = videoURL;

                const modal = document.getElementById('modal-ar-video-recorder');
                if (modal) modal.classList.add('active');

                if (window.cyberLeaderboard) window.cyberLeaderboard.addCoins(50);
                if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 75 });
            };

            this.mediaRecorder.start();
            this.isRecordingVideo = true;
            this.recordingCountdown = duration;

            const btnBarRec = document.getElementById('btn-ar-bar-record');
            const recText = document.getElementById('ar-rec-btn-text');

            if (btnBarRec) btnBarRec.classList.add('recording');
            if (recText) recText.textContent = `REC ${duration}s...`;

            this.recordingInterval = setInterval(() => {
                this.recordingCountdown--;
                if (recText) recText.textContent = `REC ${this.recordingCountdown}s...`;
                if (this.recordingCountdown <= 0) {
                    this.stopARRecording();
                }
            }, 1000);

        } catch (err) {
            console.warn('Video recording error:', err);
            alert('Recording started! Use your device screen recorder.');
        }
    }

    stopARRecording() {
        if (!this.isRecordingVideo) return;
        this.isRecordingVideo = false;
        clearInterval(this.recordingInterval);

        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }

        const btnBarRec = document.getElementById('btn-ar-bar-record');
        const recText = document.getElementById('ar-rec-btn-text');
        if (btnBarRec) btnBarRec.classList.remove('recording');
        if (recText) recText.textContent = 'REC VIDEO (10s)';
    }

    toggleARShipView() {
        this.arShow3DShip = !this.arShow3DShip;
        const btnShip = document.getElementById('btn-ar-bar-ship-toggle');
        const shipText = document.getElementById('ar-ship-toggle-text');
        const cockpitHUD = document.getElementById('cockpit-hud-overlay');

        if (this.playerShip) this.playerShip.visible = this.arShow3DShip;
        if (btnShip) btnShip.classList.toggle('active', this.arShow3DShip);
        if (shipText) shipText.textContent = this.arShow3DShip ? '3D SHIP ON 🚀' : 'COCKPIT HUD 🎥';
        if (cockpitHUD) cockpitHUD.style.display = this.arShow3DShip ? 'none' : 'block';
        this.playSFX('respawn');
    }

    toggleCyberScan() {
        this.isCyberScanActive = !this.isCyberScanActive;
        this.playSFX('laser');
        const viewport = document.getElementById('canvas-viewport');
        const btnScanner = document.getElementById('btn-ar-bar-scanner');

        document.body.classList.toggle('cyber-scan-active', this.isCyberScanActive);
        if (viewport) viewport.classList.toggle('cyber-scan-active', this.isCyberScanActive);
        if (btnScanner) btnScanner.classList.toggle('active', this.isCyberScanActive);
        this.closeARMenu();
    }

    startTableLandingMode() {
        this.isTableLandingMode = true;
        const landingOverlay = document.getElementById('table-landing-overlay');
        if (landingOverlay) landingOverlay.style.display = 'block';

        if (!this.deskShip) {
            this.deskShip = this.playerShip.clone();
            this.deskShip.scale.set(0.65, 0.65, 0.65);
            this.scene.add(this.deskShip);
        }

        this.deskShip.position.set(0, -1.2, -3.5);
        this.deskShip.visible = true;
        if (this.playerShip) this.playerShip.visible = false;
        this.playSFX('respawn');
    }

    cycleDeskShipColor() {
        const colors = [0x00f2fe, 0xff007f, 0x00ffcc, 0xffb703];
        this.deskColorIndex = (this.deskColorIndex + 1) % colors.length;
        const newColor = colors[this.deskColorIndex];

        if (this.deskShip) {
            this.deskShip.traverse((child) => {
                if (child.isMesh && child.material && child.material.color) {
                    if (child.material.color.getHex() !== 0x0f172a) {
                        child.material.color.setHex(newColor);
                    }
                }
            });
        }
        this.playSFX('crystal');
    }

    takeoffFromTable() {
        this.isTableLandingMode = false;
        const landingOverlay = document.getElementById('table-landing-overlay');
        if (landingOverlay) landingOverlay.style.display = 'none';

        if (this.deskShip) this.deskShip.visible = false;
        if (this.playerShip) this.playerShip.visible = this.arShow3DShip;

        this.playSFX('overdrive');
        if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
    }

    triggerEMPShockwave() {
        this.playSFX('emp');
        const viewport = document.getElementById('canvas-viewport');
        if (viewport) {
            viewport.classList.add('emp-screen-ripple');
            setTimeout(() => viewport.classList.remove('emp-screen-ripple'), 800);
        }

        for (let alien of this.alienShips) {
            this.createExplosion(alien.position, 0xff0055);
            this.scene.remove(alien);
        }
        this.addScore(this.alienShips.length * 500);
        this.alienShips = [];
    }

    toggleCameraView() {
        if (this.isARMode) {
            this.toggleARShipView();
            return;
        }

        this.cameraMode = (this.cameraMode === 'third') ? 'cockpit' : 'third';
        const btnCam = document.getElementById('btn-toggle-camera');
        const cockpitHUD = document.getElementById('cockpit-hud-overlay');
        const standardCrosshair = document.getElementById('hud-center-crosshair');

        if (this.cameraMode === 'cockpit') {
            if (btnCam) {
                btnCam.style.borderColor = '#00f2fe';
                btnCam.style.color = '#00f2fe';
            }
            if (cockpitHUD) cockpitHUD.style.display = 'block';
            if (standardCrosshair) standardCrosshair.style.display = 'none';
            if (this.playerShip) this.playerShip.visible = false;
        } else {
            if (btnCam) {
                btnCam.style.borderColor = 'rgba(255,255,255,0.2)';
                btnCam.style.color = '#fff';
            }
            if (cockpitHUD) cockpitHUD.style.display = 'none';
            if (standardCrosshair) standardCrosshair.style.display = 'block';
            if (this.playerShip) this.playerShip.visible = true;
        }
    }

    announceWave(waveNum) {
        this.wave = waveNum;
        const banner = document.getElementById('wave-announcement-banner');
        const title = document.getElementById('wave-banner-title');
        const sub = document.getElementById('wave-banner-sub');
        const waveBadge = document.getElementById('wave-badge-text');

        if (waveBadge) waveBadge.textContent = `WAVE ${waveNum}`;

        const isFr = (localStorage.getItem('cyber_lang') === 'fr');
        let waveTitle = '';
        let waveSub = '';

        if (this.activeGame === 'racer') {
            waveTitle = isFr ? `TOUR ${waveNum} : AUTOROUTE NEON DRIFT` : `LAP ${waveNum}: NEON DRIFT HIGHWAY`;
            waveSub = isFr ? 'Dépassez et détruisez les bolides rivaux au laser !' : 'Blast and overtake rival cybercars with lasers & Nitro!';
        } else if (this.activeGame === 'mech') {
            waveTitle = isFr ? `VAGUE ${waveNum} : SIÈGE DU TITAN MECHA` : `WAVE ${waveNum}: TITAN MECH SIEGE`;
            waveSub = isFr ? 'Détruisez les marcheurs ennemis au Gatling et à la lame laser !' : 'Destroy rogue enemy walkers with Gatling & Energy Blade!';
        } else if (this.activeGame === 'slalom') {
            waveTitle = isFr ? `VAGUE ${waveNum} : INTERCEPTEURS DU TUNNEL` : `WAVE ${waveNum}: TUNNEL INTERCEPTORS`;
            waveSub = isFr ? 'Abattez les drones aliens patrouillant dans le tunnel !' : 'Shoot down alien interceptors patrolling the quantum tunnel!';
        } else if (this.activeGame === 'blackhole') {
            waveTitle = isFr ? `VAGUE ${waveNum} : SIÈGE DES CHASSEURS DU TROU NOIR` : `WAVE ${waveNum}: BLACK HOLE HUNTER SIEGE`;
            waveSub = isFr ? 'Détruisez les vaisseaux de chasse aliens et échappez à la singularité !' : 'Destroy alien hunter gunships and escape the singularity!';
        } else if (this.activeGame === 'beatslicer') {
            waveTitle = isFr ? `RYTHME ${waveNum} : VITESSE SYNTHWAVE` : `BEAT ${waveNum}: SYNTHWAVE SLICE`;
            waveSub = isFr ? 'Tranchez les cubes en rythme avec vos deux sabres laser !' : 'Slice rhythm cubes with dual laser sabers to the beat!';
        } else if (this.activeGame === 'surf') {
            waveTitle = isFr ? `VAGUE ${waveNum} : SURF COSMIQUE NEBULA` : `WAVE ${waveNum}: COSMIC SURF NEBULA`;
            waveSub = isFr ? 'Effectuez des backflips 360° et glissez sur les rails de lumière !' : 'Perform 360 backflips & grind starlight rails!';
        } else if (this.activeGame === 'ar') {
            waveTitle = isFr ? `VAGUE ${waveNum} : INVASION RÉELLE (RA)` : `WAVE ${waveNum}: REAL WORLD AR INVASION`;
            waveSub = isFr ? 'Les aliens sont dans votre pièce ! Tournez votre téléphone pour tirer !' : 'Aliens floating in your room! Turn phone 360° to aim & blast!';
        } else if (this.activeGame === 'city') {
            waveTitle = isFr ? `VAGUE ${waveNum} : SIÈGE DE LA MÉGAPOLE` : `WAVE ${waveNum}: CYBER CITY SIEGE`;
            waveSub = isFr ? 'Défendez les gratte-ciels contre les escadrons aliens !' : 'Defend skyscrapers & weave between buildings against alien dropships!';
        } else {
            waveTitle = isFr ? `VAGUE ${waveNum} : INCURSION EXTRA-TERRESTRE` : `WAVE ${waveNum}: ALIEN INVASION`;
            waveSub = isFr ? 'Détruisez les chasseurs aliens et esquivez leurs tirs !' : 'Destroy alien warcraft & dodge incoming plasma bolts!';
        }

        if (banner && title && sub) {
            title.textContent = waveTitle;
            sub.textContent = waveSub;
            banner.style.display = 'block';
            setTimeout(() => { banner.style.display = 'none'; }, 3200);
        }
    }

    triggerNearMissBonus(customText = '⚡ NEAR MISS! +250 PTS 🔥') {
        this.addScore(250);
        const banner = document.getElementById('near-miss-banner');
        if (banner) {
            banner.textContent = customText;
            banner.style.display = 'block';
            setTimeout(() => { banner.style.display = 'none'; }, 600);
        }
    }

    generateWindowTexture() {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 256;
        const ctx = c.getContext('2d');

        ctx.fillStyle = '#0a1128';
        ctx.fillRect(0, 0, 128, 256);

        const cols = 6;
        const rows = 16;
        const w = 14;
        const h = 10;
        const gapX = 6;
        const gapY = 5;

        for (let r = 0; r < rows; r++) {
            for (let col = 0; col < cols; col++) {
                const rand = Math.random();
                if (rand > 0.45) {
                    ctx.fillStyle = rand > 0.85 ? '#00f2fe' : (rand > 0.7 ? '#ff007f' : '#ffb703');
                    ctx.fillRect(col * (w + gapX) + 6, r * (h + gapY) + 6, w, h);
                }
            }
        }

        return new THREE.CanvasTexture(c);
    }

    async startARCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Camera not supported on this browser.');
            return false;
        }

        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const perm = await DeviceOrientationEvent.requestPermission();
                if (perm === 'granted') this.initDeviceOrientation();
            } catch (err) {}
        }

        try {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } },
                    audio: false
                });
            } catch (e1) {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            }

            this.arVideoStream = stream;
            if (this.arVideo) {
                this.arVideo.srcObject = this.arVideoStream;
                this.arVideo.muted = true;
                this.arVideo.playsInline = true;
                await this.arVideo.play();

                this.arVideoTexture = new THREE.VideoTexture(this.arVideo);
                this.arVideoTexture.minFilter = THREE.LinearFilter;
                this.arVideoTexture.magFilter = THREE.LinearFilter;
                this.scene.background = this.arVideoTexture;

                this.isARMode = true;
                document.body.classList.add('ar-active-mode');
                return true;
            }
        } catch (err) {
            console.error('AR Camera error:', err);
            this.isARMode = true;
            document.body.classList.add('ar-active-mode');
            return true;
        }
        return false;
    }

    stopARCamera() {
        if (this.arVideoStream) {
            this.arVideoStream.getTracks().forEach(track => track.stop());
            this.arVideoStream = null;
        }
        this.isARMode = false;
        document.body.classList.remove('ar-active-mode');
    }

    async startGame(gameType = 'blaster', rivalTarget = 0, rivalName = '') {
        this.initAudio();
        this.activeGame = gameType;
        this.targetRivalScore = rivalTarget;
        this.rivalName = rivalName;
        this.rivalBeaten = false;

        this.score = 0;
        this.crystals = 0;
        this.combo = 1;
        this.comboTimer = 0;
        this.shield = 100;
        this.lives = 3;
        this.invulnerableTimer = 0;
        this.lastDamageTime = 0;
        this.missiles = 4;
        this.wave = 1;
        this.overdriveCharge = 100;
        this.isMegaBeamActive = false;
        this.megaBeamTimer = 0;
        this.isTableLandingMode = false;
        this.arShow3DShip = true;

        this.tripleLaserTimer = 0;
        this.chronoSlowTimer = 0;
        this.hasForcefield = false;
        this.bossActive = false;
        this.bossShip = null;
        this.bossHP = 100;

        document.getElementById('view-arcade-hub').style.display = 'none';
        const mainHeader = document.querySelector('.arcade-header');
        if (mainHeader) mainHeader.style.display = 'none';

        const gameStage = document.getElementById('view-game-stage');
        gameStage.style.display = 'block';

        this.updateHUD();
        this.setup3DScene();

        if (gameType === 'ar') {
            await this.startARCamera();
            this.arShow3DShip = false;
            if (this.playerShip) {
                this.playerShip.visible = false;
            }
            const shipBtn = document.getElementById('btn-ar-bar-ship-toggle');
            if (shipBtn) shipBtn.classList.remove('active');
            const arBar = document.getElementById('ar-prominent-control-bar');
            if (arBar) arBar.classList.remove('open');
            const toggleBtn = document.getElementById('btn-toggle-ar-menu');
            if (toggleBtn) toggleBtn.classList.remove('active');
        } else {
            this.stopARCamera();
            this.cameraMode = 'third';
            const cockpitHUD = document.getElementById('cockpit-hud-overlay');
            if (cockpitHUD) cockpitHUD.style.display = 'none';
            const standardCrosshair = document.getElementById('hud-center-crosshair');
            if (standardCrosshair) standardCrosshair.style.display = 'block';
        }

        this.announceWave(1);

        this.isRunning = true;
        this.isPaused = false;
        this.clock.start();
        this.animate();
    }

    setup3DScene() {
        if (!this.renderer) {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                powerPreference: 'high-performance',
                alpha: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            window.addEventListener('resize', () => this.onWindowResize());
        }

        this.scene = new THREE.Scene();
        
        if (this.activeGame === 'ar') {
            this.scene.fog = null;
            this.scene.background = null;
        } else if (this.activeGame === 'racer') {
            this.scene.fog = new THREE.FogExp2(0x1a0a00, 0.003);
        } else if (this.activeGame === 'mech') {
            this.scene.fog = new THREE.FogExp2(0x1a1500, 0.0035);
        } else if (this.activeGame === 'beatslicer') {
            this.scene.fog = new THREE.FogExp2(0x14001a, 0.004);
        } else if (this.activeGame === 'surf') {
            this.scene.fog = new THREE.FogExp2(0x00141a, 0.0025);
        } else if (this.activeGame === 'city') {
            this.scene.fog = new THREE.FogExp2(0x050b1a, 0.0035);
        } else {
            this.scene.fog = new THREE.FogExp2(0x050714, 0.0025);
        }

        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1200);
        this.camera.position.set(0, 3.2, 11);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x00f2fe, 1.5);
        dirLight.position.set(15, 30, 20);
        this.scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xff007f, 1.2);
        fillLight.position.set(-20, -10, -30);
        this.scene.add(fillLight);

        if (this.activeGame !== 'ar') {
            this.buildStarfield();
        }

        this.buildMegaBeamMesh();

        // Clear Entity Arrays
        this.lasers = [];
        this.homingMissiles = [];
        this.alienShips = [];
        this.alienLasers = [];
        this.asteroids = [];
        this.particles = [];
        this.collectibleCrystals = [];
        this.powerUpOrbs = [];
        this.quantumGates = [];
        this.cityBuildings = [];
        this.hoverCars = [];
        this.skyBridges = [];
        this.racerHighwayRoads = [];
        this.racerNitroGates = [];
        this.rivalRacerCars = [];
        this.enemyWalkerRobots = [];
        this.beatCubes = [];
        this.surfLightRails = [];
        this.starlightEnergyOrbs = [];
        this.engineThrusters = [];

        // Build Active Mode
        if (this.activeGame === 'racer') {
            this.buildRealisticCyberRacer();
        } else if (this.activeGame === 'mech') {
            this.buildRealisticTitanMech();
        } else if (this.activeGame === 'beatslicer') {
            this.buildBeatSlicer();
        } else if (this.activeGame === 'surf') {
            this.buildCyberSurf();
        } else if (this.activeGame === 'ar') {
            this.buildRealisticStarfighter();
            this.buildARWorld();
        } else if (this.activeGame === 'city') {
            this.buildRealisticStarfighter();
            this.buildCyberCity();
        } else if (this.activeGame === 'slalom') {
            this.buildRealisticStarfighter();
            this.buildQuantumTunnel();
        } else if (this.activeGame === 'blackhole') {
            this.buildRealisticStarfighter();
            this.buildBlackHole();
        } else {
            // blaster
            this.buildRealisticStarfighter();
            this.buildDeepSpaceWorld();
        }
    }

    buildStarfield() {
        const starGeo = new THREE.BufferGeometry();
        const starCount = 2800;
        const starPos = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            starPos[i] = (Math.random() - 0.5) * 800;
            starPos[i + 1] = (Math.random() - 0.5) * 800;
            starPos[i + 2] = (Math.random() - 0.5) * 1000;

            const rand = Math.random();
            if (rand > 0.6) {
                starColors[i] = 0.0; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0;
            } else if (rand > 0.3) {
                starColors[i] = 1.0; starColors[i + 1] = 0.0; starColors[i + 2] = 0.5;
            } else {
                starColors[i] = 1.0; starColors[i + 1] = 1.0; starColors[i + 2] = 1.0;
            }
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = new THREE.PointsMaterial({
            size: 2.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.9
        });

        this.starfield = new THREE.Points(starGeo, starMat);
        this.scene.add(this.starfield);
    }

    buildDeepSpaceWorld() {
        for (let i = 0; i < 12; i++) {
            this.spawnAsteroid();
        }
        for (let i = 0; i < 5; i++) {
            this.spawnAlienShip(false);
        }
    }

    buildRealisticStarfighter() {
        const ship = new THREE.Group();
        this.engineThrusters = [];

        const hullMat = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            metalness: 0.92,
            roughness: 0.18,
            emissive: 0x001528
        });

        const armorAccentMat = new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            metalness: 0.85,
            roughness: 0.25,
            emissive: 0x003355
        });

        const canopyGlassMat = new THREE.MeshPhysicalMaterial({
            color: 0xff007f,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.8,
            thickness: 0.5,
            transparent: true,
            opacity: 0.85,
            reflectivity: 0.9
        });

        const noseGeo = new THREE.ConeGeometry(0.7, 2.6, 5);
        noseGeo.rotateX(Math.PI / 2);
        const nose = new THREE.Mesh(noseGeo, hullMat);
        nose.position.set(0, 0, -1.2);
        ship.add(nose);

        const mainBodyGeo = new THREE.BoxGeometry(1.2, 0.65, 3.2);
        const mainBody = new THREE.Mesh(mainBodyGeo, hullMat);
        mainBody.position.set(0, 0, 0.4);
        ship.add(mainBody);

        const canopyGeo = new THREE.SphereGeometry(0.48, 16, 12);
        canopyGeo.scale(0.8, 0.55, 1.8);
        const canopy = new THREE.Mesh(canopyGeo, canopyGlassMat);
        canopy.position.set(0, 0.38, -0.2);
        ship.add(canopy);

        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.lineTo(2.8, -1.2);
        wingShape.lineTo(2.6, -1.8);
        wingShape.lineTo(0, -0.6);
        wingShape.closePath();

        const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
        const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
        wingGeo.rotateX(Math.PI / 2);

        const rightWing = new THREE.Mesh(wingGeo, armorAccentMat);
        rightWing.position.set(0.5, -0.05, 0.8);
        ship.add(rightWing);

        const leftWing = new THREE.Mesh(wingGeo, armorAccentMat);
        leftWing.position.set(-0.5, -0.05, 0.8);
        leftWing.scale.x = -1;
        ship.add(leftWing);

        const finGeo = new THREE.BoxGeometry(0.08, 0.9, 1.2);
        const rightFin = new THREE.Mesh(finGeo, hullMat);
        rightFin.position.set(0.65, 0.55, 1.2);
        rightFin.rotation.z = -0.3;
        ship.add(rightFin);

        const leftFin = new THREE.Mesh(finGeo, hullMat);
        leftFin.position.set(-0.65, 0.55, 1.2);
        leftFin.rotation.z = 0.3;
        ship.add(leftFin);

        const cannonGeo = new THREE.CylinderGeometry(0.09, 0.11, 2.2, 8);
        cannonGeo.rotateX(Math.PI / 2);
        const cannonMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.95 });

        const rightCannon = new THREE.Mesh(cannonGeo, cannonMat);
        rightCannon.position.set(2.4, -0.15, -0.4);
        ship.add(rightCannon);

        const leftCannon = new THREE.Mesh(cannonGeo, cannonMat);
        leftCannon.position.set(-2.4, -0.15, -0.4);
        ship.add(leftCannon);

        const muzzleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 8);
        muzzleGeo.rotateX(Math.PI / 2);
        const muzzleMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });

        const rightMuzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
        rightMuzzle.position.set(2.4, -0.15, -1.5);
        ship.add(rightMuzzle);

        const leftMuzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
        leftMuzzle.position.set(-2.4, -0.15, -1.5);
        ship.add(leftMuzzle);

        const exhaustGeo = new THREE.CylinderGeometry(0.24, 0.35, 0.8, 12);
        exhaustGeo.rotateX(Math.PI / 2);

        const rightExhaust = new THREE.Mesh(exhaustGeo, cannonMat);
        rightExhaust.position.set(0.4, 0.05, 2.0);
        ship.add(rightExhaust);

        const leftExhaust = new THREE.Mesh(exhaustGeo, cannonMat);
        leftExhaust.position.set(-0.4, 0.05, 2.0);
        ship.add(leftExhaust);

        const flameGeo = new THREE.ConeGeometry(0.28, 1.4, 8);
        flameGeo.rotateX(-Math.PI / 2);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.85 });

        const rightFlame = new THREE.Mesh(flameGeo, flameMat);
        rightFlame.position.set(0.4, 0.05, 2.7);
        ship.add(rightFlame);
        this.engineThrusters.push(rightFlame);

        const leftFlame = new THREE.Mesh(flameGeo, flameMat);
        leftFlame.position.set(-0.4, 0.05, 2.7);
        ship.add(leftFlame);
        this.engineThrusters.push(leftFlame);

        const shieldGeo = new THREE.SphereGeometry(3.6, 24, 24);
        const shieldMat = new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        this.forcefieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        this.forcefieldMesh.visible = false;
        ship.add(this.forcefieldMesh);

        ship.position.set(0, 0, 0);
        this.playerShip = ship;
        this.scene.add(this.playerShip);
    }

    /**
     * 🏎️ ULTRA-REALISTIC 3D CYBER SUPERCAP (LAMBORGHINI / QUADRA GT)
     */
    buildRealisticCyberRacer() {
        const car = new THREE.Group();
        this.engineThrusters = [];

        const bodyMat = new THREE.MeshStandardMaterial({
            color: 0xff3b00,
            metalness: 0.95,
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });

        const carbonMat = new THREE.MeshStandardMaterial({
            color: 0x111827,
            metalness: 0.9,
            roughness: 0.3
        });

        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x00f2fe,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.9,
            thickness: 0.6,
            transparent: true,
            opacity: 0.85
        });

        const neonCyan = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
        const neonOrange = new THREE.MeshBasicMaterial({ color: 0xff6b00 });

        const mainChassisGeo = new THREE.BoxGeometry(2.6, 0.65, 5.2);
        const mainChassis = new THREE.Mesh(mainChassisGeo, bodyMat);
        mainChassis.position.set(0, 0.2, 0);
        car.add(mainChassis);

        const hoodGeo = new THREE.ConeGeometry(1.3, 1.8, 4);
        hoodGeo.rotateX(Math.PI / 2);
        hoodGeo.rotateY(Math.PI / 4);
        const hood = new THREE.Mesh(hoodGeo, bodyMat);
        hood.position.set(0, 0.15, -2.8);
        hood.scale.set(1.4, 0.35, 1.2);
        car.add(hood);

        const roofGeo = new THREE.BoxGeometry(1.7, 0.55, 2.2);
        const roof = new THREE.Mesh(roofGeo, glassMat);
        roof.position.set(0, 0.75, 0.2);
        car.add(roof);

        const hlGeo = new THREE.BoxGeometry(0.5, 0.12, 0.2);
        const hlRight = new THREE.Mesh(hlGeo, neonCyan);
        hlRight.position.set(0.95, 0.25, -2.7);
        car.add(hlRight);

        const hlLeft = new THREE.Mesh(hlGeo, neonCyan);
        hlLeft.position.set(-0.95, 0.25, -2.7);
        car.add(hlLeft);

        const skirtGeo = new THREE.BoxGeometry(0.3, 0.35, 4.4);
        const skirtR = new THREE.Mesh(skirtGeo, carbonMat);
        skirtR.position.set(1.4, -0.05, 0);
        car.add(skirtR);

        const skirtL = new THREE.Mesh(skirtGeo, carbonMat);
        skirtL.position.set(-1.4, -0.05, 0);
        car.add(skirtL);

        const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 16);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelPositions = [
            [-1.4, -0.15, -1.8], [1.4, -0.15, -1.8],
            [-1.4, -0.15, 1.8], [1.4, -0.15, 1.8]
        ];
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeo, carbonMat);
            wheel.position.set(...pos);

            const ringGeo = new THREE.TorusGeometry(0.48, 0.05, 8, 16);
            ringGeo.rotateY(Math.PI / 2);
            const rim = new THREE.Mesh(ringGeo, neonCyan);
            wheel.add(rim);

            car.add(wheel);
        });

        const spoilerWingGeo = new THREE.BoxGeometry(3.0, 0.1, 0.6);
        const spoilerWing = new THREE.Mesh(spoilerWingGeo, carbonMat);
        spoilerWing.position.set(0, 1.1, 2.3);
        car.add(spoilerWing);

        const strutGeo = new THREE.BoxGeometry(0.08, 0.5, 0.3);
        const strutR = new THREE.Mesh(strutGeo, carbonMat);
        strutR.position.set(0.8, 0.8, 2.3);
        car.add(strutR);
        const strutL = new THREE.Mesh(strutGeo, carbonMat);
        strutL.position.set(-0.8, 0.8, 2.3);
        car.add(strutL);

        const exhaustGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.6, 12);
        exhaustGeo.rotateX(Math.PI / 2);
        const exR = new THREE.Mesh(exhaustGeo, carbonMat);
        exR.position.set(0.55, 0.1, 2.6);
        car.add(exR);

        const exL = new THREE.Mesh(exhaustGeo, carbonMat);
        exL.position.set(-0.55, 0.1, 2.6);
        car.add(exL);

        const flameGeo = new THREE.ConeGeometry(0.28, 1.6, 8);
        flameGeo.rotateX(-Math.PI / 2);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.85 });

        const rightFlame = new THREE.Mesh(flameGeo, flameMat);
        rightFlame.position.set(0.55, 0.1, 3.4);
        car.add(rightFlame);
        this.engineThrusters.push(rightFlame);

        const leftFlame = new THREE.Mesh(flameGeo, flameMat);
        leftFlame.position.set(-0.55, 0.1, 3.4);
        car.add(leftFlame);
        this.engineThrusters.push(leftFlame);

        car.position.set(0, -1.6, 0);
        this.playerShip = car;
        this.scene.add(car);

        // Build Suspended Highway Road
        const roadGeo = new THREE.PlaneGeometry(28, 60);
        roadGeo.rotateX(-Math.PI / 2);
        const roadMat = new THREE.MeshStandardMaterial({ color: 0x080e1e, roughness: 0.4 });

        for (let i = 0; i < 20; i++) {
            const road = new THREE.Mesh(roadGeo, roadMat);
            road.position.set(0, -2.5, -i * 55);
            this.racerHighwayRoads.push(road);
            this.scene.add(road);

            if (i % 3 === 0) {
                const gateGeo = new THREE.TorusGeometry(6.5, 0.35, 8, 24);
                const gate = new THREE.Mesh(gateGeo, neonOrange);
                gate.position.set((Math.random() - 0.5) * 14, -0.5, -i * 55);
                this.racerNitroGates.push(gate);
                this.scene.add(gate);
            }
        }

        // Spawn Initial Rival Cars on Highway
        for (let i = 0; i < 5; i++) {
            this.spawnRivalRacerCar(-i * 50 - 40);
        }
    }

    spawnRivalRacerCar(zPos = -180) {
        const rivalCar = new THREE.Group();
        const colors = [0xff007f, 0x7928ca, 0x00ffcc, 0xffb703];
        const col = colors[Math.floor(Math.random() * colors.length)];
        const bodyMat = new THREE.MeshStandardMaterial({ color: col, metalness: 0.9, roughness: 0.2 });

        const bodyGeo = new THREE.BoxGeometry(2.4, 0.65, 4.6);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        rivalCar.add(body);

        const glassGeo = new THREE.BoxGeometry(1.6, 0.5, 2.0);
        const glass = new THREE.Mesh(glassGeo, new THREE.MeshBasicMaterial({ color: 0x111827 }));
        glass.position.set(0, 0.5, 0);
        rivalCar.add(glass);

        const laneX = (Math.random() - 0.5) * 18;
        rivalCar.position.set(laneX, -1.6, zPos);
        rivalCar.hp = 3;
        rivalCar.scoreVal = 800;
        rivalCar.shootTimer = Math.random() * 2 + 1;
        rivalCar.speed = Math.random() * 10 + 20;

        this.alienShips.push(rivalCar);
        this.scene.add(rivalCar);
    }

    /**
     * 🤖 ULTRA-REALISTIC 3D TITAN WAR MECH (MECHWARRIOR / GUNDAM)
     */
    buildRealisticTitanMech() {
        const mech = new THREE.Group();
        this.engineThrusters = [];
        this.mechLegs = [];

        const armorMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            metalness: 0.95,
            roughness: 0.2
        });

        const goldPlateMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.92,
            roughness: 0.25
        });

        const steelJointMat = new THREE.MeshStandardMaterial({
            color: 0x475569,
            metalness: 0.98,
            roughness: 0.15
        });

        const visorNeonMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
        const energyBladeMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

        const torsoGeo = new THREE.BoxGeometry(3.6, 2.8, 2.8);
        const torso = new THREE.Mesh(torsoGeo, armorMat);
        torso.position.y = 1.2;
        mech.add(torso);

        const chestGeo = new THREE.BoxGeometry(2.8, 1.2, 0.4);
        const chest = new THREE.Mesh(chestGeo, goldPlateMat);
        chest.position.set(0, 1.4, -1.45);
        mech.add(chest);

        const headGeo = new THREE.BoxGeometry(1.4, 0.9, 1.4);
        const head = new THREE.Mesh(headGeo, armorMat);
        head.position.set(0, 2.8, -0.4);
        mech.add(head);

        const visorGeo = new THREE.BoxGeometry(1.1, 0.28, 0.2);
        const visor = new THREE.Mesh(visorGeo, visorNeonMat);
        visor.position.set(0, 2.85, -1.1);
        mech.add(visor);

        const podGeo = new THREE.BoxGeometry(1.5, 1.4, 2.2);
        const podR = new THREE.Mesh(podGeo, goldPlateMat);
        podR.position.set(2.4, 2.6, 0);
        mech.add(podR);

        const podL = new THREE.Mesh(podGeo, goldPlateMat);
        podL.position.set(-2.4, 2.6, 0);
        mech.add(podL);

        const rightArm = new THREE.Group();
        const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 12), steelJointMat);
        rightArm.add(shoulderR);

        const upperArmGeo = new THREE.BoxGeometry(0.8, 2.0, 0.8);
        const upperArm = new THREE.Mesh(upperArmGeo, armorMat);
        upperArm.position.set(0, -1.2, 0);
        rightArm.add(upperArm);

        const gatlingAssembly = new THREE.Group();
        const coreGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.4, 12);
        coreGeo.rotateX(Math.PI / 2);
        const core = new THREE.Mesh(coreGeo, steelJointMat);
        gatlingAssembly.add(core);

        const barrelGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8);
        barrelGeo.rotateX(Math.PI / 2);
        for (let b = 0; b < 6; b++) {
            const angle = (b / 6) * Math.PI * 2;
            const barrel = new THREE.Mesh(barrelGeo, steelJointMat);
            barrel.position.set(Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, -1.6);
            gatlingAssembly.add(barrel);
        }
        gatlingAssembly.position.set(0, -2.4, -0.6);
        this.gatlingBarrels = gatlingAssembly;
        rightArm.add(gatlingAssembly);

        rightArm.position.set(2.6, 1.2, 0);
        mech.add(rightArm);

        const leftArm = new THREE.Group();
        const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 12), steelJointMat);
        leftArm.add(shoulderL);

        const leftUpper = new THREE.Mesh(upperArmGeo, armorMat);
        leftUpper.position.set(0, -1.2, 0);
        leftArm.add(leftUpper);

        const bladeGeo = new THREE.BoxGeometry(0.18, 0.65, 4.8);
        const blade = new THREE.Mesh(bladeGeo, energyBladeMat);
        blade.position.set(0, -2.4, -2.2);
        leftArm.add(blade);

        leftArm.position.set(-2.6, 1.2, 0);
        mech.add(leftArm);

        const createLeg = (xOffset) => {
            const leg = new THREE.Group();
            const thigh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.2, 1.2), armorMat);
            thigh.position.set(0, -1.0, 0);
            leg.add(thigh);

            const knee = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), steelJointMat);
            knee.position.set(0, -2.2, 0);
            leg.add(knee);

            const shin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.2, 1.1), goldPlateMat);
            shin.position.set(0, -3.4, 0.1);
            leg.add(shin);

            const foot = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 2.4), steelJointMat);
            foot.position.set(0, -4.6, -0.3);
            leg.add(foot);

            leg.position.set(xOffset, 0, 0);
            return leg;
        };

        const legR = createLeg(1.2);
        const legL = createLeg(-1.2);
        mech.add(legR);
        mech.add(legL);
        this.mechLegs.push(legR, legL);

        mech.position.set(0, 0.8, 0);
        this.playerShip = mech;
        this.scene.add(mech);

        for (let i = 0; i < 5; i++) {
            this.spawnEnemyWalker(-i * 40 - 50);
        }
    }

    spawnEnemyWalker(zPos = -220) {
        const walker = new THREE.Group();
        const bodyGeo = new THREE.OctahedronGeometry(2.0, 1);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x880828, metalness: 0.85 });
        walker.add(new THREE.Mesh(bodyGeo, bodyMat));

        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
        eye.position.set(0, 0, -1.8);
        walker.add(eye);

        walker.position.set((Math.random() - 0.5) * 24, 0.5, zPos);
        walker.hp = 4;
        walker.scoreVal = 600;
        walker.shootTimer = Math.random() * 2 + 1;

        this.alienShips.push(walker);
        this.scene.add(walker);
    }

    buildBeatSlicer() {
        this.cameraMode = 'cockpit';

        const saberGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12);
        saberGeo.rotateX(Math.PI / 2);
        this.saberLeft = new THREE.Mesh(saberGeo, new THREE.MeshBasicMaterial({ color: 0x00f2fe }));
        this.saberLeft.position.set(-0.8, -0.6, -2.0);
        this.scene.add(this.saberLeft);

        this.saberRight = new THREE.Mesh(saberGeo, new THREE.MeshBasicMaterial({ color: 0xff007f }));
        this.saberRight.position.set(0.8, -0.6, -2.0);
        this.scene.add(this.saberRight);

        for (let i = 0; i < 18; i++) {
            this.spawnBeatCube(-i * 20 - 30);
        }
    }

    spawnBeatCube(zPos) {
        const isCyan = Math.random() > 0.5;
        const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const cubeMat = new THREE.MeshStandardMaterial({
            color: isCyan ? 0x00f2fe : 0xff007f,
            emissive: isCyan ? 0x003355 : 0x440022
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);

        const laneX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 1.2);
        const laneY = (Math.random() - 0.5) * 4;
        cube.position.set(laneX, laneY, zPos);
        cube.isCyan = isCyan;

        this.beatCubes.push(cube);
        this.scene.add(cube);
    }

    buildCyberSurf() {
        const boardGroup = new THREE.Group();
        this.engineThrusters = [];

        const deckGeo = new THREE.BoxGeometry(1.2, 0.12, 4.2);
        const deckMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc, metalness: 0.9, roughness: 0.1 });
        const deck = new THREE.Mesh(deckGeo, deckMat);
        boardGroup.add(deck);

        const footGeo = new THREE.BoxGeometry(0.4, 0.25, 0.8);
        const footMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const f1 = new THREE.Mesh(footGeo, footMat); f1.position.set(0, 0.2, 0.8); boardGroup.add(f1);
        const f2 = new THREE.Mesh(footGeo, footMat); f2.position.set(0, 0.2, -0.8); boardGroup.add(f2);

        const flameGeo = new THREE.ConeGeometry(0.3, 1.6, 8);
        flameGeo.rotateX(-Math.PI / 2);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.85 });
        const jet = new THREE.Mesh(flameGeo, flameMat);
        jet.position.set(0, 0, 2.5);
        boardGroup.add(jet);
        this.engineThrusters.push(jet);

        boardGroup.position.set(0, -1.2, 0);
        this.playerShip = boardGroup;
        this.scene.add(boardGroup);

        for (let i = 0; i < 22; i++) {
            const railGeo = new THREE.TorusGeometry(5.0, 0.18, 8, 24);
            const rail = new THREE.Mesh(railGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true }));
            rail.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6, -i * 35 - 30);
            this.surfLightRails.push(rail);
            this.scene.add(rail);

            const orbGeo = new THREE.IcosahedronGeometry(0.8, 0);
            const orb = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color: 0xffb703 }));
            orb.position.copy(rail.position);
            this.starlightEnergyOrbs.push(orb);
            this.scene.add(orb);
        }
    }

    buildMegaBeamMesh() {
        const beamGeo = new THREE.CylinderGeometry(1.6, 2.4, 180, 16);
        beamGeo.rotateX(Math.PI / 2);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            transparent: true,
            opacity: 0.75
        });
        this.megaBeamMesh = new THREE.Mesh(beamGeo, beamMat);
        this.megaBeamMesh.position.set(0, 0, -90);
        this.megaBeamMesh.visible = false;
        this.scene.add(this.megaBeamMesh);
    }

    buildDimensionalPortal() {
        const portalGroup = new THREE.Group();

        const ringGeo = new THREE.TorusGeometry(4.5, 0.4, 16, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x7928ca });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        portalGroup.add(ring);

        const diskGeo = new THREE.CircleGeometry(4.2, 32);
        const diskMat = new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        portalGroup.add(disk);

        portalGroup.position.set(0, 2, -18);
        this.dimensionalPortal = portalGroup;
        this.scene.add(this.dimensionalPortal);
    }

    buildARWorld() {
        this.buildDimensionalPortal();
        for (let i = 0; i < 6; i++) {
            this.spawnARAlien();
        }
    }

    spawnARAlien() {
        const alienGroup = new THREE.Group();
        const isHeavy = Math.random() > 0.6;

        if (isHeavy) {
            const bodyGeo = new THREE.OctahedronGeometry(2.2, 1);
            const bodyMat = new THREE.MeshStandardMaterial({ color: 0x880828, emissive: 0x4c0519, metalness: 0.9 });
            alienGroup.add(new THREE.Mesh(bodyGeo, bodyMat));

            const ringGeo = new THREE.TorusGeometry(3.2, 0.2, 8, 24);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            alienGroup.add(ring);
            alienGroup.ringMesh = ring;
            alienGroup.hp = 4;
            alienGroup.scoreVal = 800;
        } else {
            const saucerGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.4, 12);
            const saucerMat = new THREE.MeshStandardMaterial({ color: 0x059669, emissive: 0x064e3b, metalness: 0.85 });
            alienGroup.add(new THREE.Mesh(saucerGeo, saucerMat));

            const domeGeo = new THREE.SphereGeometry(0.7, 12, 12);
            const dome = new THREE.Mesh(domeGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
            dome.position.y = 0.3;
            alienGroup.add(dome);
            alienGroup.hp = 2;
            alienGroup.scoreVal = 400;
        }

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 16 + 12;
        const height = (Math.random() - 0.3) * 14;

        alienGroup.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
        alienGroup.shootTimer = Math.random() * 3 + 1.5;
        alienGroup.swaySeed = Math.random() * 100;
        alienGroup.orbitAngle = angle;
        alienGroup.orbitRadius = radius;

        this.alienShips.push(alienGroup);
        this.scene.add(alienGroup);
    }

    buildCyberCity() {
        if (!this.buildingWindowTexture) {
            this.buildingWindowTexture = this.generateWindowTexture();
            this.buildingWindowTexture.wrapS = THREE.RepeatWrapping;
            this.buildingWindowTexture.wrapT = THREE.RepeatWrapping;
        }

        for (let i = 0; i < 30; i++) {
            this.spawnCityBlock(-i * 45 - 20);
        }

        for (let i = 0; i < 14; i++) {
            this.spawnHoverCar(-i * 30 - 30);
        }

        for (let i = 0; i < 4; i++) {
            this.spawnAlienShip(false);
        }
    }

    spawnCityBlock(zPos) {
        const buildingMat = new THREE.MeshStandardMaterial({
            color: 0x0b132b,
            metalness: 0.85,
            roughness: 0.25,
            map: this.buildingWindowTexture
        });

        const hLeft = Math.random() * 60 + 50;
        const wLeft = Math.random() * 12 + 10;
        const dLeft = Math.random() * 16 + 14;
        const geoLeft = new THREE.BoxGeometry(wLeft, hLeft, dLeft);
        const meshLeft = new THREE.Mesh(geoLeft, buildingMat);
        const xLeft = -(Math.random() * 10 + 22);
        const yLeft = hLeft / 2 - 25;
        meshLeft.position.set(xLeft, yLeft, zPos);

        this.cityBuildings.push(meshLeft);
        this.scene.add(meshLeft);

        const hRight = Math.random() * 60 + 50;
        const wRight = Math.random() * 12 + 10;
        const dRight = Math.random() * 16 + 14;
        const geoRight = new THREE.BoxGeometry(wRight, hRight, dRight);
        const meshRight = new THREE.Mesh(geoRight, buildingMat);
        const xRight = (Math.random() * 10 + 22);
        const yRight = hRight / 2 - 25;
        meshRight.position.set(xRight, yRight, zPos);

        this.cityBuildings.push(meshRight);
        this.scene.add(meshRight);

        if (Math.random() < 0.25) {
            const bridgeGeo = new THREE.BoxGeometry(38, 2.5, 4);
            const bridgeMat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0x00f2fe : 0xff007f,
                wireframe: true
            });
            const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
            bridge.position.set(0, Math.random() * 15 + 4, zPos);
            this.skyBridges.push(bridge);
            this.scene.add(bridge);
        }
    }

    spawnHoverCar(zPos) {
        const carGeo = new THREE.BoxGeometry(1.6, 0.6, 3.2);
        const isCyan = Math.random() > 0.5;
        const carMat = new THREE.MeshBasicMaterial({ color: isCyan ? 0x00f2fe : 0xffb703 });
        const car = new THREE.Mesh(carGeo, carMat);

        const laneX = (Math.random() - 0.5) * 26;
        const laneY = (Math.random() - 0.5) * 16;
        car.position.set(laneX, laneY, zPos);
        car.velocity = new THREE.Vector3(0, 0, Math.random() * 15 + 25);

        this.hoverCars.push(car);
        this.scene.add(car);
    }

    buildQuantumTunnel() {
        for (let i = 0; i < 24; i++) {
            this.spawnQuantumGate(-i * 35 - 40);
        }
        for (let i = 0; i < 5; i++) {
            this.spawnAlienShip(false);
        }
    }

    spawnQuantumGate(zPos) {
        const ringGeo = new THREE.TorusGeometry(5.2, 0.35, 12, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0x00f2fe : 0xff007f
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, zPos);
        this.quantumGates.push(ring);
        this.scene.add(ring);
    }

    buildBlackHole() {
        const bhGroup = new THREE.Group();
        
        const bhGeo = new THREE.SphereGeometry(10, 32, 32);
        const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const bhMesh = new THREE.Mesh(bhGeo, bhMat);
        bhGroup.add(bhMesh);

        const diskGeo = new THREE.RingGeometry(12, 32, 48);
        diskGeo.rotateX(Math.PI / 2.2);
        const diskMat = new THREE.MeshBasicMaterial({
            color: 0xff007f,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        bhGroup.add(disk);

        bhGroup.position.set(0, 0, -280);
        this.blackHole = bhGroup;
        this.scene.add(this.blackHole);

        for (let i = 0; i < 8; i++) {
            this.spawnAsteroid();
        }
        for (let i = 0; i < 5; i++) {
            this.spawnAlienShip(true);
        }
    }

    fireOverdriveMegaBeam() {
        if (this.overdriveCharge < 100 || this.isMegaBeamActive) return;
        this.overdriveCharge = 0;
        this.isMegaBeamActive = true;
        this.megaBeamTimer = 4.5;
        this.playSFX('overdrive');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

        if (this.megaBeamMesh) this.megaBeamMesh.visible = true;
        this.updateHUD();
    }

    spawnAlienShip(isHeavy = false) {
        if (this.activeGame === 'ar') {
            this.spawnARAlien();
            return;
        }
        if (this.activeGame === 'racer') {
            this.spawnRivalRacerCar(-240);
            return;
        }
        if (this.activeGame === 'mech') {
            this.spawnEnemyWalker(-240);
            return;
        }

        const alienGroup = new THREE.Group();

        if (isHeavy) {
            const bodyGeo = new THREE.OctahedronGeometry(2.2, 1);
            const bodyMat = new THREE.MeshStandardMaterial({
                color: 0x4c0519,
                emissive: 0x880828,
                metalness: 0.9,
                roughness: 0.2
            });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            alienGroup.add(body);

            const ringGeo = new THREE.TorusGeometry(3.2, 0.2, 8, 24);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            alienGroup.add(ring);
            alienGroup.ringMesh = ring;

            alienGroup.hp = 5;
            alienGroup.scoreVal = 800;
            alienGroup.isHeavy = true;
        } else {
            const saucerGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.4, 12);
            const saucerMat = new THREE.MeshStandardMaterial({
                color: 0x064e3b,
                emissive: 0x059669,
                metalness: 0.85
            });
            const saucer = new THREE.Mesh(saucerGeo, saucerMat);
            alienGroup.add(saucer);

            const domeGeo = new THREE.SphereGeometry(0.7, 12, 12);
            const domeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const dome = new THREE.Mesh(domeGeo, domeMat);
            dome.position.y = 0.3;
            alienGroup.add(dome);

            alienGroup.hp = 2;
            alienGroup.scoreVal = 400;
            alienGroup.isHeavy = false;
        }

        const spawnX = (Math.random() - 0.5) * 28;
        const spawnY = (Math.random() - 0.5) * 20;
        const spawnZ = this.playerShip ? this.playerShip.position.z - (Math.random() * 120 + 150) : -220;

        alienGroup.position.set(spawnX, spawnY, spawnZ);
        alienGroup.shootTimer = Math.random() * 2.5 + 1.2;
        alienGroup.swaySeed = Math.random() * 100;

        this.alienShips.push(alienGroup);
        this.scene.add(alienGroup);
    }

    fireAlienLaser(alienPos) {
        this.playSFX('alien_laser');

        const laserGeo = new THREE.SphereGeometry(0.35, 8, 8);
        const laserMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const mesh = new THREE.Mesh(laserGeo, laserMat);

        mesh.position.copy(alienPos);

        const target = this.isARMode ? this.camera.position.clone() : (this.playerShip ? this.playerShip.position.clone() : new THREE.Vector3(0, 0, 0));
        const dir = target.sub(alienPos).normalize();
        mesh.velocity = dir.multiplyScalar(65);

        this.alienLasers.push(mesh);
        this.scene.add(mesh);
    }

    fireHomingMissile() {
        if (!this.playerShip || this.missiles <= 0) return;
        this.missiles--;
        this.updateHUD();
        this.playSFX('missile');

        const mGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.6, 8);
        mGeo.rotateX(Math.PI / 2);
        const mMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
        const missile = new THREE.Mesh(mGeo, mMat);

        if (this.isARMode) {
            missile.position.copy(this.camera.position);
            missile.position.y -= 0.5;
            missile.velocity = new THREE.Vector3(0, 0, -30).applyQuaternion(this.camera.quaternion);
        } else {
            missile.position.copy(this.playerShip.position);
            missile.position.y -= 0.3;
            missile.velocity = new THREE.Vector3((Math.random() - 0.5) * 10, -5, -40);
        }
        missile.life = 4.0;

        let nearestTarget = null;
        let minDist = 9999;

        for (let alien of this.alienShips) {
            const d = missile.position.distanceTo(alien.position);
            if (d < minDist) {
                minDist = d;
                nearestTarget = alien;
            }
        }
        if (!nearestTarget) {
            for (let ast of this.asteroids) {
                const d = missile.position.distanceTo(ast.position);
                if (d < minDist) {
                    minDist = d;
                    nearestTarget = ast;
                }
            }
        }

        missile.target = nearestTarget;
        this.homingMissiles.push(missile);
        this.scene.add(missile);
    }

    fireLaser() {
        if (this.shield <= 0) return;

        if (this.activeGame === 'mech') {
            this.playSFX('gatling');
            if (this.gatlingBarrels) this.gatlingBarrels.rotation.z += 2.5;
        } else if (this.activeGame === 'beatslicer') {
            this.playSFX('slice');
        } else {
            this.playSFX('laser');
        }

        const laserColor = this.laserColor || '#00f2fe';
        const laserMat = new THREE.MeshBasicMaterial({ color: laserColor });
        const laserGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.8, 6);
        laserGeo.rotateX(Math.PI / 2);

        if (this.isARMode) {
            // Calculate 3D Ray from the movable reticle on screen
            const ndcX = (this.arReticleScreenPos.x / window.innerWidth) * 2 - 1;
            const ndcY = -(this.arReticleScreenPos.y / window.innerHeight) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x: ndcX, y: ndcY }, this.camera);
            let aimDir = raycaster.ray.direction.clone().normalize();

            // Check lock-on on nearby alien
            let targetAlien = null;
            let minAngle = 0.45;
            for (let alien of this.alienShips) {
                const toAlien = alien.position.clone().sub(this.camera.position).normalize();
                const angle = aimDir.angleTo(toAlien);
                if (angle < minAngle) {
                    minAngle = angle;
                    targetAlien = alien;
                }
            }
            if (targetAlien) {
                aimDir = targetAlien.position.clone().sub(this.camera.position).normalize();
            }

            // Target Point in room
            const targetPoint = this.camera.position.clone().add(aimDir.clone().multiplyScalar(60));

            // Camera right and down vectors for dual side cannons
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
            const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);

            // Left & Right Muzzle origins (bottom corners of view)
            const leftOrigin = this.camera.position.clone()
                .add(camRight.clone().multiplyScalar(-0.45))
                .add(camUp.clone().multiplyScalar(-0.35))
                .add(camFwd.clone().multiplyScalar(0.7));

            const rightOrigin = this.camera.position.clone()
                .add(camRight.clone().multiplyScalar(0.45))
                .add(camUp.clone().multiplyScalar(-0.35))
                .add(camFwd.clone().multiplyScalar(0.7));

            const dirLeft = targetPoint.clone().sub(leftOrigin).normalize();
            const dirRight = targetPoint.clone().sub(rightOrigin).normalize();

            // Large, glowing cylindrical plasma bolts
            const arLaserGeo = new THREE.CylinderGeometry(0.18, 0.18, 4.5, 8);
            arLaserGeo.rotateX(Math.PI / 2);

            const laserLeft = new THREE.Mesh(arLaserGeo, laserMat);
            laserLeft.position.copy(leftOrigin);
            laserLeft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dirLeft);
            laserLeft.velocity = dirLeft.multiplyScalar(220);
            laserLeft.isARLaser = true;
            this.lasers.push(laserLeft);
            this.scene.add(laserLeft);

            const laserRight = new THREE.Mesh(arLaserGeo, laserMat);
            laserRight.position.copy(rightOrigin);
            laserRight.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dirRight);
            laserRight.velocity = dirRight.multiplyScalar(220);
            laserRight.isARLaser = true;
            this.lasers.push(laserRight);
            this.scene.add(laserRight);

            // Screen Muzzle Flash FX
            this.createExplosion(leftOrigin.add(dirLeft.clone().multiplyScalar(0.5)), 0x00f2fe);
            this.createExplosion(rightOrigin.add(dirRight.clone().multiplyScalar(0.5)), 0x00f2fe);
            return;
        }

        if (!this.playerShip) return;

        const leftPos = new THREE.Vector3(this.playerShip.position.x - 2.0, this.playerShip.position.y - 0.15, this.playerShip.position.z - 1.5);
        const rightPos = new THREE.Vector3(this.playerShip.position.x + 2.0, this.playerShip.position.y - 0.15, this.playerShip.position.z - 1.5);

        const laserLeft = new THREE.Mesh(laserGeo, laserMat);
        laserLeft.position.copy(leftPos);
        laserLeft.velocity = new THREE.Vector3(0, 0, -220);
        this.lasers.push(laserLeft);
        this.scene.add(laserLeft);

        const laserRight = new THREE.Mesh(laserGeo, laserMat);
        laserRight.position.copy(rightPos);
        laserRight.velocity = new THREE.Vector3(0, 0, -220);
        this.lasers.push(laserRight);
        this.scene.add(laserRight);

        if (this.tripleLaserTimer > 0) {
            const centerLaser = new THREE.Mesh(laserGeo, laserMat);
            centerLaser.position.set(this.playerShip.position.x, this.playerShip.position.y + 0.3, this.playerShip.position.z - 1.8);
            centerLaser.velocity = new THREE.Vector3(0, 0, -240);
            this.lasers.push(centerLaser);
            this.scene.add(centerLaser);
        }
    }

    spawnAsteroid() {
        const radius = Math.random() * 1.6 + 1.2;
        const geo = new THREE.DodecahedronGeometry(radius, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x64748b,
            roughness: 0.85,
            metalness: 0.15
        });
        const mesh = new THREE.Mesh(geo, mat);

        const spawnX = (Math.random() - 0.5) * 38;
        const spawnY = (Math.random() - 0.5) * 26;
        const spawnZ = this.playerShip ? this.playerShip.position.z - (Math.random() * 150 + 80) : -150;

        mesh.position.set(spawnX, spawnY, spawnZ);
        mesh.rotationSpeed = {
            x: (Math.random() - 0.5) * 3.5,
            y: (Math.random() - 0.5) * 3.5
        };
        mesh.velocity = new THREE.Vector3(0, 0, Math.random() * 25 + 45);
        mesh.hp = Math.ceil(radius * 2);

        this.asteroids.push(mesh);
        this.scene.add(mesh);
    }

    spawnPowerUp(position) {
        const types = ['triple', 'shield', 'nuke', 'missile', 'slow'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const colors = { triple: 0xff007f, shield: 0x00f2fe, nuke: 0xffb703, missile: 0xffb703, slow: 0x00ffcc };
        const geo = new THREE.IcosahedronGeometry(0.9, 0);
        const mat = new THREE.MeshBasicMaterial({ color: colors[type], wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        
        mesh.position.copy(position);
        mesh.velocity = new THREE.Vector3(0, 0, 15);
        mesh.powerType = type;
        
        this.powerUpOrbs.push(mesh);
        this.scene.add(mesh);
    }

    activatePowerUp(type) {
        this.playSFX('powerup');
        const pill = document.getElementById('hud-powerup-pill');
        const pillText = document.getElementById('powerup-pill-text');

        if (type === 'triple') {
            this.tripleLaserTimer = 10;
            if (pill && pillText) {
                pill.style.display = 'block';
                pillText.textContent = '⚡ TRIPLE LASERS (10s)';
            }
        } else if (type === 'missile') {
            this.missiles = Math.min(this.missiles + 3, 9);
            this.updateHUD();
            if (pill && pillText) {
                pill.style.display = 'block';
                pillText.textContent = '🎯 +3 HOMING MISSILES!';
            }
        } else if (type === 'shield') {
            this.shield = 100;
            this.hasForcefield = true;
            if (this.forcefieldMesh) this.forcefieldMesh.visible = true;
            if (pill && pillText) {
                pill.style.display = 'block';
                pillText.textContent = '🛡️ FORCEFIELD OVERCHARGE!';
            }
        } else if (type === 'nuke') {
            this.triggerEMPShockwave();
            if (pill && pillText) {
                pill.style.display = 'block';
                pillText.textContent = '💥 EMP NUKE DETONATED!';
            }
        } else if (type === 'slow') {
            this.chronoSlowTimer = 6;
            if (pill && pillText) {
                pill.style.display = 'block';
                pillText.textContent = '⏱️ CHRONO SLOW TIME (6s)';
            }
        }

        setTimeout(() => {
            if (pill && this.tripleLaserTimer <= 0 && this.chronoSlowTimer <= 0) {
                pill.style.display = 'none';
            }
        }, 3000);
    }

    createExplosion(position, color = 0xff007f) {
        this.playSFX('explosion');
        if (navigator.vibrate) navigator.vibrate(60);

        const pCount = 28;
        for (let i = 0; i < pCount; i++) {
            const pGeo = new THREE.SphereGeometry(0.18, 4, 4);
            const pMat = new THREE.MeshBasicMaterial({ color: color });
            const p = new THREE.Mesh(pGeo, pMat);
            p.position.copy(position);
            p.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 24
            );
            p.life = 0.65;
            this.particles.push(p);
            this.scene.add(p);
        }
    }

    spawnCrystal(position) {
        const cGeo = new THREE.OctahedronGeometry(0.65, 0);
        const cMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
        const c = new THREE.Mesh(cGeo, cMat);
        c.position.copy(position);
        c.velocity = new THREE.Vector3(0, 0, 16);
        this.collectibleCrystals.push(c);
        this.scene.add(c);
    }

    takeDamage(amount) {
        if (this.invulnerableTimer > 0) return;

        this.lastDamageTime = Date.now();

        if (this.hasForcefield) {
            this.hasForcefield = false;
            if (this.forcefieldMesh) this.forcefieldMesh.visible = false;
            this.invulnerableTimer = 1.0;
            return;
        }

        this.shield -= amount;
        this.combo = 1;
        this.invulnerableTimer = 1.2;

        if (this.shield <= 0) {
            this.lives--;
            this.playSFX('explosion');

            if (this.lives > 0) {
                this.shield = 100;
                this.invulnerableTimer = 2.5;
                this.hasForcefield = true;
                if (this.forcefieldMesh) this.forcefieldMesh.visible = true;
                this.playSFX('respawn');
            } else {
                this.gameOver();
                return;
            }
        }

        this.updateHUD();
    }

    updateEntities(delta) {
        const timeScale = this.chronoSlowTimer > 0 ? 0.4 : 1.0;
        const effDelta = delta * timeScale;

        // Auto-Shield Regeneration
        if (Date.now() - this.lastDamageTime > 3000 && this.shield < 100) {
            this.shield = Math.min(100, this.shield + 10 * delta);
            this.updateHUD();
        }

        // Charge Overdrive
        if (this.overdriveCharge < 100 && !this.isMegaBeamActive) {
            this.overdriveCharge = Math.min(100, this.overdriveCharge + 8 * delta);
            this.updateHUD();
        }

        // Mega-Beam
        if (this.isMegaBeamActive) {
            this.megaBeamTimer -= delta;
            if (this.megaBeamMesh) {
                if (this.isARMode) {
                    const camDir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion).normalize();
                    this.megaBeamMesh.position.copy(this.camera.position).addScaledVector(camDir, 90);
                    this.megaBeamMesh.quaternion.copy(this.camera.quaternion);
                } else if (this.playerShip) {
                    this.megaBeamMesh.position.set(this.playerShip.position.x, this.playerShip.position.y, this.playerShip.position.z - 90);
                    this.megaBeamMesh.rotation.z += 10 * delta;
                }
            }

            for (let i = this.alienShips.length - 1; i >= 0; i--) {
                const alien = this.alienShips[i];
                if (alien.position.length() < 35) {
                    this.createExplosion(alien.position, 0xff0055);
                    this.addScore(alien.scoreVal || 500);
                    this.scene.remove(alien);
                    this.alienShips.splice(i, 1);
                }
            }

            if (this.megaBeamTimer <= 0) {
                this.isMegaBeamActive = false;
                if (this.megaBeamMesh) this.megaBeamMesh.visible = false;
            }
        }

        // 🌌 STARFIELD SPEED IN ALL SPACE & RACING MODES
        if (this.starfield && this.activeGame !== 'ar') {
            const positions = this.starfield.geometry.attributes.position.array;
            const starSpeed = this.isBoosting ? 280 : 130;
            for (let i = 2; i < positions.length; i += 3) {
                positions[i] += starSpeed * effDelta;
                if (positions[i] > 100) positions[i] = -800;
            }
            this.starfield.geometry.attributes.position.needsUpdate = true;
        }

        // 🏎️ 1. CYBER RACER UPDATE
        if (this.activeGame === 'racer') {
            const carSpeed = this.isBoosting ? 240 : 140;

            for (let road of this.racerHighwayRoads) {
                road.position.z += carSpeed * effDelta;
                if (road.position.z > 30) road.position.z = -550;
            }

            for (let i = this.racerNitroGates.length - 1; i >= 0; i--) {
                const gate = this.racerNitroGates[i];
                gate.position.z += carSpeed * effDelta;
                gate.rotation.z += 2 * effDelta;

                if (this.playerShip && Math.abs(gate.position.z - this.playerShip.position.z) < 3.5) {
                    if (Math.abs(gate.position.x - this.playerShip.position.x) < 4.5) {
                        this.playSFX('nitro');
                        this.triggerNearMissBonus('⚡ NITRO BOOST! 400 KM/H! +1,000 PTS 🔥');
                        this.isBoosting = true;
                        setTimeout(() => { this.isBoosting = false; }, 2500);
                    }
                }
                if (gate.position.z > 30) {
                    gate.position.z = -500;
                    gate.position.x = (Math.random() - 0.5) * 16;
                }
            }

            this.addScore(Math.floor(70 * delta));
        }

        // 🤖 2. CYBER MECH UPDATE
        if (this.activeGame === 'mech') {
            if (this.playerShip) {
                const walkPhase = Date.now() * 0.008;
                this.playerShip.position.y = 0.8 + Math.abs(Math.sin(walkPhase)) * 0.25;

                if (this.mechLegs.length === 2) {
                    this.mechLegs[0].rotation.x = Math.sin(walkPhase) * 0.4;
                    this.mechLegs[1].rotation.x = -Math.sin(walkPhase) * 0.4;
                }
            }
            this.addScore(Math.floor(35 * delta));
        }

        // 🎵 3. BEAT SLICER UPDATE
        if (this.activeGame === 'beatslicer') {
            const beatSpeed = 70;

            if (this.saberLeft && this.saberRight) {
                this.saberLeft.position.x = THREE.MathUtils.lerp(this.saberLeft.position.x, this.input.x * 6 - 0.8, 0.2);
                this.saberRight.position.x = THREE.MathUtils.lerp(this.saberRight.position.x, this.input.x * 6 + 0.8, 0.2);
                this.saberLeft.position.y = THREE.MathUtils.lerp(this.saberLeft.position.y, this.input.y * 3 - 0.5, 0.2);
                this.saberRight.position.y = THREE.MathUtils.lerp(this.saberRight.position.y, this.input.y * 3 - 0.5, 0.2);
            }

            for (let i = this.beatCubes.length - 1; i >= 0; i--) {
                const cube = this.beatCubes[i];
                cube.position.z += beatSpeed * effDelta;
                cube.rotation.x += 2 * effDelta;

                const checkPos = cube.isCyan ? this.saberLeft.position : this.saberRight.position;
                if (cube.position.distanceTo(checkPos) < 2.2) {
                    this.playSFX('slice');
                    this.createExplosion(cube.position, cube.isCyan ? 0x00f2fe : 0xff007f);
                    this.addScore(500 * this.combo);
                    this.increaseCombo();
                    this.scene.remove(cube);
                    this.beatCubes.splice(i, 1);
                    this.spawnBeatCube(-280);
                    continue;
                }

                if (cube.position.z > 15) {
                    this.scene.remove(cube);
                    this.beatCubes.splice(i, 1);
                    this.combo = 1;
                    this.updateHUD();
                    this.spawnBeatCube(-280);
                }
            }
        }

        // 🏄 4. COSMIC SURFER UPDATE
        if (this.activeGame === 'surf') {
            const surfSpeed = this.isBoosting ? 180 : 90;

            for (let i = this.surfLightRails.length - 1; i >= 0; i--) {
                const rail = this.surfLightRails[i];
                rail.position.z += surfSpeed * effDelta;
                rail.rotation.z += 0.8 * effDelta;

                if (rail.position.z > 30) {
                    rail.position.z = -450;
                    rail.position.x = (Math.random() - 0.5) * 12;
                    rail.position.y = (Math.random() - 0.5) * 6;
                }
            }

            for (let i = this.starlightEnergyOrbs.length - 1; i >= 0; i--) {
                const orb = this.starlightEnergyOrbs[i];
                orb.position.z += surfSpeed * effDelta;
                orb.rotation.y += 3 * effDelta;

                if (this.playerShip && orb.position.distanceTo(this.playerShip.position) < 3.2) {
                    this.playSFX('combo');
                    this.addScore(800 * this.combo);
                    this.increaseCombo();
                    this.crystals++;
                    this.updateHUD();
                    orb.position.z = -450;
                    orb.position.x = (Math.random() - 0.5) * 12;
                    orb.position.y = (Math.random() - 0.5) * 6;
                } else if (orb.position.z > 30) {
                    orb.position.z = -450;
                }
            }

            this.addScore(Math.floor(50 * delta));
        }

        // 🏙️ 5. MEGACITY FLIGHT UPDATE
        if (this.activeGame === 'city') {
            const citySpeed = this.isBoosting ? 140 : 80;

            for (let i = this.cityBuildings.length - 1; i >= 0; i--) {
                const b = this.cityBuildings[i];
                b.position.z += citySpeed * effDelta;

                if (Math.abs(b.position.z - this.playerShip.position.z) < 6) {
                    if (Math.abs(this.playerShip.position.x - b.position.x) < 8) {
                        this.takeDamage(15);
                        this.createExplosion(this.playerShip.position, 0x00f2fe);
                    }
                }
                if (b.position.z > 30) b.position.z = -450;
            }

            for (let i = this.hoverCars.length - 1; i >= 0; i--) {
                const car = this.hoverCars[i];
                car.position.z += (citySpeed + 20) * effDelta;

                if (this.playerShip && car.position.distanceTo(this.playerShip.position) < 3.2) {
                    this.triggerNearMissBonus('🚗 TRAFFIC SLALOM! +200 PTS 🔥');
                }
                if (car.position.z > 30) {
                    car.position.z = -350;
                    car.position.x = (Math.random() - 0.5) * 26;
                    car.position.y = (Math.random() - 0.5) * 16;
                }
            }

            this.addScore(Math.floor(40 * delta));
        }

        // 🌀 6. QUANTUM SLALOM UPDATE
        if (this.activeGame === 'slalom') {
            const gateSpeed = this.isBoosting ? 120 : 70;

            for (let i = this.quantumGates.length - 1; i >= 0; i--) {
                const g = this.quantumGates[i];
                g.position.z += gateSpeed * effDelta;
                g.rotation.z += effDelta;

                if (this.playerShip && Math.abs(g.position.z - this.playerShip.position.z) < 2.0) {
                    const distToCenter = Math.hypot(g.position.x - this.playerShip.position.x, g.position.y - this.playerShip.position.y);
                    if (distToCenter < 5.2) {
                        this.playSFX('combo');
                        this.addScore(1000 * this.combo);
                        this.increaseCombo();
                    }
                }

                if (g.position.z > 20) {
                    g.position.z = -350;
                    g.position.x = (Math.random() - 0.5) * 14;
                    g.position.y = (Math.random() - 0.5) * 9;
                }
            }

            this.addScore(Math.floor(50 * delta));
        }

        // 🕳️ 7. BLACK HOLE UPDATE
        if (this.activeGame === 'blackhole') {
            if (this.blackHole) {
                this.blackHole.rotation.z += 0.8 * effDelta;
            }
            this.addScore(Math.floor(65 * delta));
        }

        // 🚀 8. ASTEROIDS UPDATE (IN SPACE MODES)
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            const ast = this.asteroids[i];
            ast.position.z += (this.isBoosting ? 90 : 55) * effDelta;
            ast.rotation.x += ast.rotationSpeed.x * effDelta;
            ast.rotation.y += ast.rotationSpeed.y * effDelta;

            for (let j = this.lasers.length - 1; j >= 0; j--) {
                const l = this.lasers[j];
                if (l.position.distanceTo(ast.position) < 2.5) {
                    this.scene.remove(l);
                    this.lasers.splice(j, 1);

                    ast.hp--;
                    if (ast.hp <= 0) {
                        this.createExplosion(ast.position, 0x00f2fe);
                        this.spawnCrystal(ast.position);
                        if (Math.random() < 0.2) this.spawnPowerUp(ast.position);

                        this.scene.remove(ast);
                        this.asteroids.splice(i, 1);
                        this.addScore(250 * this.combo);
                        this.increaseCombo();
                        this.spawnAsteroid();
                        break;
                    }
                }
            }

            if (this.playerShip && ast.position.distanceTo(this.playerShip.position) < 2.4) {
                this.createExplosion(ast.position, 0xff0055);
                this.scene.remove(ast);
                this.asteroids.splice(i, 1);
                this.takeDamage(20);
                this.spawnAsteroid();
                return;
            }

            if (ast.position.z > 20) {
                ast.position.z = -220;
                ast.position.x = (Math.random() - 0.5) * 38;
                ast.position.y = (Math.random() - 0.5) * 26;
            }
        }

        // 📱 AR GYROSCOPE & 3D SHIP FLYING
        if (this.isARMode) {
            if (this.deviceOrientation.active) {
                const alpha = THREE.MathUtils.degToRad(this.deviceOrientation.alpha);
                const beta = THREE.MathUtils.degToRad(this.deviceOrientation.beta - 90);
                const gamma = THREE.MathUtils.degToRad(-this.deviceOrientation.gamma);
                const euler = new THREE.Euler(beta, alpha, gamma, 'YXZ');
                this.camera.quaternion.setFromEuler(euler);
            } else {
                this.camera.rotation.y = -this.input.x * 1.2;
                this.camera.rotation.x = this.input.y * 0.8;
            }

            this.camera.position.set(0, 0, 0);

            if (this.playerShip && this.arShow3DShip && !this.isTableLandingMode) {
                this.playerShip.visible = true;
                const forward = new THREE.Vector3(0, -0.9, -3.8).applyQuaternion(this.camera.quaternion);
                this.playerShip.position.copy(this.camera.position).add(forward);
                this.playerShip.quaternion.copy(this.camera.quaternion);
                this.playerShip.rotation.z += Math.sin(Date.now() * 0.003) * 0.08;
            } else if (!this.arShow3DShip || this.isTableLandingMode) {
                if (this.playerShip) this.playerShip.visible = false;
            }

            let hasLeftAlien = false;
            let hasRightAlien = false;
            let hasBehindAlien = false;
            let closestAlienDist = 999;

            const camHeading = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);

            for (let alien of this.alienShips) {
                const toAlien = alien.position.clone().normalize();
                const angle = camHeading.angleTo(toAlien);
                const cross = new THREE.Vector3().crossVectors(camHeading, toAlien);
                const dist = alien.position.length();
                if (dist < closestAlienDist) closestAlienDist = dist;

                if (angle > 0.8) {
                    if (angle > 2.3) hasBehindAlien = true;
                    else if (cross.y > 0) hasLeftAlien = true;
                    else hasRightAlien = true;
                }
            }

            const arrowLeft = document.getElementById('ar-arrow-left');
            const arrowRight = document.getElementById('ar-arrow-right');
            const warningBehind = document.getElementById('ar-warning-behind');

            if (arrowLeft) arrowLeft.style.display = hasLeftAlien ? 'flex' : 'none';
            if (arrowRight) arrowRight.style.display = hasRightAlien ? 'flex' : 'none';
            if (warningBehind) warningBehind.style.display = hasBehindAlien ? 'flex' : 'none';

            if (closestAlienDist < 20 && Date.now() - this.lastSonarPingTime > Math.max(300, closestAlienDist * 60)) {
                this.lastSonarPingTime = Date.now();
                this.playSFX('sonar');
            }

        } else {
            // Standard Controls
            if (this.playerShip) {
                const speed = this.isBoosting ? 32 : 20;
                this.playerShip.position.x += this.input.x * speed * delta;
                if (this.activeGame !== 'racer' && this.activeGame !== 'mech') {
                    this.playerShip.position.y += this.input.y * speed * delta;
                    this.playerShip.position.y = THREE.MathUtils.clamp(this.playerShip.position.y, -11, 11);
                }

                this.playerShip.position.x = THREE.MathUtils.clamp(this.playerShip.position.x, -16, 16);
                this.playerShip.rotation.z = -this.input.x * 0.45;

                if (this.cameraMode === 'cockpit') {
                    this.camera.position.set(this.playerShip.position.x, this.playerShip.position.y + 0.15, this.playerShip.position.z - 2.0);
                    this.playerShip.visible = false;
                } else {
                    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, this.playerShip.position.x * 0.5, 0.12);
                    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, this.playerShip.position.y * 0.5 + 3.2, 0.12);
                    this.camera.position.z = this.playerShip.position.z + 11;
                    if (this.invulnerableTimer <= 0) this.playerShip.visible = true;
                }
            }
        }

        // Lasers
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const l = this.lasers[i];
            l.position.addScaledVector(l.velocity, delta);

            if (l.position.length() > 300 || l.position.z < -260) {
                this.scene.remove(l);
                this.lasers.splice(i, 1);
            }
        }

        // Alien Ships & Rival Vehicles AI & Combat
        for (let i = this.alienShips.length - 1; i >= 0; i--) {
            const alien = this.alienShips[i];

            if (this.activeGame === 'ar') {
                alien.orbitAngle += 0.2 * effDelta;
                alien.position.x = Math.cos(alien.orbitAngle) * alien.orbitRadius;
                alien.position.z = Math.sin(alien.orbitAngle) * alien.orbitRadius;
                alien.lookAt(0, 0, 0);
            } else if (this.activeGame === 'racer') {
                alien.position.z += (alien.speed || 35) * effDelta;
            } else if (this.activeGame === 'mech') {
                alien.position.z += 25 * effDelta;
            } else {
                alien.position.z += (this.activeGame === 'slalom' ? 45 : 30) * effDelta;
                alien.position.x += Math.sin(Date.now() * 0.003 + (alien.swaySeed || 0)) * 0.3;
            }

            if (alien.ringMesh) alien.ringMesh.rotation.z += 3 * effDelta;

            alien.shootTimer = (alien.shootTimer || 2) - effDelta;
            if (alien.shootTimer <= 0 && alien.position.length() > 5 && alien.position.z < 0) {
                alien.shootTimer = Math.random() * 2.5 + 1.2;
                this.fireAlienLaser(alien.position);
            }

            // Laser Hits (Enhanced for AR and Fast Ships)
            for (let j = this.lasers.length - 1; j >= 0; j--) {
                const l = this.lasers[j];
                const hitRadius = (this.isARMode || l.isARLaser) ? 5.5 : 3.6;
                if (l.position.distanceTo(alien.position) < hitRadius) {
                    this.scene.remove(l);
                    this.lasers.splice(j, 1);

                    alien.hp = (alien.hp || 2) - 1;
                    if (alien.hp <= 0) {
                        this.createExplosion(alien.position, 0x10b981);
                        this.spawnCrystal(alien.position);
                        if (Math.random() < 0.25) this.spawnPowerUp(alien.position);

                        this.addScore((alien.scoreVal || 400) * this.combo);
                        this.increaseCombo();

                        this.scene.remove(alien);
                        this.alienShips.splice(i, 1);
                        break;
                    }
                }
            }

            if (!this.isARMode && alien.position.z > 20) {
                this.scene.remove(alien);
                this.alienShips.splice(i, 1);
            }
        }

        // Alien Lasers
        for (let i = this.alienLasers.length - 1; i >= 0; i--) {
            const al = this.alienLasers[i];
            al.position.addScaledVector(al.velocity, effDelta);

            const hitDist = this.isARMode ? al.position.distanceTo(this.camera.position) : (this.playerShip ? al.position.distanceTo(this.playerShip.position) : 999);
            if (hitDist < 2.0) {
                this.scene.remove(al);
                this.alienLasers.splice(i, 1);
                this.takeDamage(12);
                return;
            } else if (al.position.length() > 300) {
                this.scene.remove(al);
                this.alienLasers.splice(i, 1);
            }
        }

        // 🌟 CONTINUOUS ACTIVE SPAWNING FOR EVERY GAME
        if (!this.bossActive) {
            if (this.activeGame === 'ar' && this.alienShips.length < 6) {
                if (Math.random() < 0.04) this.spawnARAlien();
            } else if (this.activeGame === 'racer' && this.alienShips.length < 5) {
                if (Math.random() < 0.04) this.spawnRivalRacerCar(-240);
            } else if (this.activeGame === 'mech' && this.alienShips.length < 5) {
                if (Math.random() < 0.04) this.spawnEnemyWalker(-240);
            } else if (this.activeGame === 'slalom' && this.alienShips.length < 5) {
                if (Math.random() < 0.04) this.spawnAlienShip(false);
            } else if (this.activeGame === 'blackhole' && this.alienShips.length < 5) {
                if (Math.random() < 0.04) this.spawnAlienShip(Math.random() > 0.5);
            } else if (this.activeGame === 'city' && this.alienShips.length < 5) {
                if (Math.random() < 0.04) this.spawnAlienShip(this.wave >= 2 && Math.random() > 0.6);
            } else if (this.activeGame === 'blaster') {
                if (this.asteroids.length < 10 && Math.random() < 0.05) this.spawnAsteroid();
                if (this.alienShips.length < 5 && Math.random() < 0.04) this.spawnAlienShip(this.wave >= 2 && Math.random() > 0.6);
            }
        }

        // Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.position.addScaledVector(p.velocity, delta);
            p.life -= delta;
            p.scale.multiplyScalar(0.95);
            if (p.life <= 0) {
                this.scene.remove(p);
                this.particles.splice(i, 1);
            }
        }

        // Timers
        if (this.tripleLaserTimer > 0) this.tripleLaserTimer -= delta;
        if (this.chronoSlowTimer > 0) this.chronoSlowTimer -= delta;

        if (this.comboTimer > 0) {
            this.comboTimer -= delta;
            if (this.comboTimer <= 0) {
                this.combo = 1;
                this.updateHUD();
            }
        }
    }

    addScore(pts) {
        this.score += pts;
        this.updateHUD();

        if (this.targetRivalScore > 0 && this.score >= this.targetRivalScore && !this.rivalBeaten) {
            this.rivalBeaten = true;
            this.triggerRivalBeatenCelebration();
        }
    }

    increaseCombo() {
        this.combo = Math.min(this.combo + 1, 10);
        this.comboTimer = 3.5;
        this.updateHUD();
    }

    triggerRivalBeatenCelebration() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
        }
        this.playSFX('combo');
    }

    updateHUD() {
        const scoreEl = document.getElementById('in-game-score');
        if (scoreEl) scoreEl.textContent = this.score.toString().padStart(5, '0');

        const crystalEl = document.getElementById('in-game-crystals');
        if (crystalEl) crystalEl.textContent = this.crystals;

        const missileEl = document.getElementById('in-game-missiles');
        if (missileEl) missileEl.textContent = this.missiles;

        for (let i = 1; i <= 3; i++) {
            const lifeEl = document.getElementById(`life-${i}`);
            if (lifeEl) {
                if (i <= this.lives) lifeEl.classList.remove('lost');
                else lifeEl.classList.add('lost');
            }
        }

        const comboEl = document.getElementById('in-game-combo');
        const comboTxt = document.getElementById('combo-multiplier-text');
        if (comboEl && comboTxt) {
            if (this.combo > 1) {
                comboEl.style.display = 'block';
                comboTxt.textContent = `x${this.combo} COMBO! 🔥`;
            } else {
                comboEl.style.display = 'none';
            }
        }

        const shieldFill = document.getElementById('in-game-shield-fill');
        if (shieldFill) shieldFill.style.width = `${Math.max(0, this.shield)}%`;
        const shieldTxt = document.getElementById('shield-percent-text');
        if (shieldTxt) shieldTxt.textContent = `${Math.round(Math.max(0, this.shield))}%`;

        const odFill = document.getElementById('in-game-overdrive-fill');
        if (odFill) odFill.style.width = `${this.overdriveCharge}%`;
        const odTxt = document.getElementById('overdrive-status-txt');
        if (odTxt) {
            odTxt.textContent = (this.overdriveCharge >= 100) ? 'READY! ⚡' : `${Math.round(this.overdriveCharge)}%`;
            odTxt.style.color = (this.overdriveCharge >= 100) ? '#ff007f' : '#ffb703';
        }

        const rivalTracker = document.getElementById('hud-rival-tracker');
        if (rivalTracker) {
            if (this.targetRivalScore > 0) {
                rivalTracker.style.display = 'block';
                const percent = Math.min(100, (this.score / this.targetRivalScore) * 100);
                const fill = document.getElementById('hud-rival-progress-fill');
                if (fill) fill.style.width = `${percent}%`;
            } else {
                rivalTracker.style.display = 'none';
            }
        }
    }

    gameOver() {
        this.isRunning = false;
        this.stopARCamera();
        this.playSFX('explosion');

        let coinsEarned = Math.floor(this.score / 250) + (this.crystals * 2);
        if (this.rivalBeaten) coinsEarned += 50;

        if (window.cyberLeaderboard) {
            window.cyberLeaderboard.addCoins(coinsEarned);
            window.cyberLeaderboard.recordHighScore(this.activeGame, this.score);
        }

        if (window.cyberChallengeSystem) {
            window.cyberChallengeSystem.showGameOverModal({
                score: this.score,
                crystals: this.crystals,
                coinsEarned: coinsEarned,
                game: this.activeGame,
                rivalBeaten: this.rivalBeaten,
                targetRivalScore: this.targetRivalScore,
                rivalName: this.rivalName
            });
        }
    }

    animate() {
        if (!this.isRunning) return;
        requestAnimationFrame(() => this.animate());

        if (this.isPaused) return;

        const delta = Math.min(this.clock.getDelta(), 0.1);
        this.updateEntities(delta);

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const btnPause = document.getElementById('btn-pause-game');
        if (btnPause) {
            btnPause.innerHTML = this.isPaused 
                ? '<i class="fa-solid fa-play"></i>' 
                : '<i class="fa-solid fa-pause"></i>';
        }
    }

    toggleARMenu() {
        const arBar = document.getElementById('ar-prominent-control-bar');
        const toggleBtn = document.getElementById('btn-toggle-ar-menu');
        if (arBar) {
            arBar.classList.toggle('open');
            if (toggleBtn) toggleBtn.classList.toggle('active');
        }
    }

    closeARMenu() {
        const arBar = document.getElementById('ar-prominent-control-bar');
        const toggleBtn = document.getElementById('btn-toggle-ar-menu');
        if (arBar) arBar.classList.remove('open');
        if (toggleBtn) toggleBtn.classList.remove('active');
    }

    exitToHub() {
        this.isRunning = false;
        this.stopARCamera();
        document.getElementById('view-game-stage').style.display = 'none';
        const mainHeader = document.querySelector('.arcade-header');
        if (mainHeader) mainHeader.style.display = 'flex';
        document.getElementById('view-arcade-hub').style.display = 'block';
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.input.x = -1;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.input.x = 1;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.input.y = 1;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.input.y = -1;
        if (e.key === ' ' || e.key === 'Enter') {
            this.fireLaser();
        }
        if (e.key === 'e' || e.key === 'E' || e.key === 'm' || e.key === 'M') {
            this.fireHomingMissile();
        }
        if (e.key === 'q' || e.key === 'Q' || e.key === 'f' || e.key === 'F') {
            this.fireOverdriveMegaBeam();
        }
        if (e.key === 'v' || e.key === 'V') {
            this.toggleCyberScan();
        }
        if (e.key === 'c' || e.key === 'C') {
            this.toggleCameraView();
        }
        if (e.key === 'Shift') {
            this.isBoosting = true;
        }
        if (e.key === 'Escape') {
            this.exitToHub();
        }
        if (e.key === 'p' || e.key === 'P') {
            this.togglePause();
        }
    }

    handleKeyUp(e) {
        if (['ArrowLeft', 'a', 'A', 'ArrowRight', 'd', 'D'].includes(e.key)) this.input.x = 0;
        if (['ArrowUp', 'w', 'W', 'ArrowDown', 's', 'S'].includes(e.key)) this.input.y = 0;
        if (e.key === 'Shift') this.isBoosting = false;
    }

    initTouchControls() {
        const joystickZone = document.getElementById('touch-joystick-zone');
        const stick = document.getElementById('joystick-stick');
        const canvas = this.canvas;
        let joyTouchId = null;
        let joyStartX = 0, joyStartY = 0;

        // 🕹️ 1. Dynamic Joystick Handler
        if (joystickZone) {
            const handleJoyStart = (e) => {
                e.preventDefault();
                const touch = e.changedTouches[0];
                joyTouchId = touch.identifier;
                const rect = joystickZone.getBoundingClientRect();
                joyStartX = rect.left + rect.width / 2;
                joyStartY = rect.top + rect.height / 2;
            };

            const handleJoyMove = (e) => {
                e.preventDefault();
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const touch = e.changedTouches[i];
                    if (touch.identifier === joyTouchId) {
                        const dx = touch.clientX - joyStartX;
                        const dy = touch.clientY - joyStartY;
                        const dist = Math.hypot(dx, dy);
                        const maxDist = 45;

                        const clampedX = dist > 0 ? (dx / dist) * Math.min(dist, maxDist) : 0;
                        const clampedY = dist > 0 ? (dy / dist) * Math.min(dist, maxDist) : 0;

                        if (stick) {
                            stick.style.transform = `translate(calc(-50% + ${clampedX}px), calc(-50% + ${clampedY}px))`;
                        }

                        this.input.x = clampedX / maxDist;
                        this.input.y = -clampedY / maxDist;
                        break;
                    }
                }
            };

            const resetJoystick = (e) => {
                if (e) e.preventDefault();
                joyTouchId = null;
                if (stick) stick.style.transform = 'translate(-50%, -50%)';
                this.input.x = 0;
                this.input.y = 0;
            };

            joystickZone.addEventListener('touchstart', handleJoyStart, { passive: false });
            joystickZone.addEventListener('touchmove', handleJoyMove, { passive: false });
            joystickZone.addEventListener('touchend', resetJoystick, { passive: false });
            joystickZone.addEventListener('touchcancel', resetJoystick, { passive: false });
        }

        // 📱 Touch drag & reticle mover for AR and games
        const crosshair = document.getElementById('hud-center-crosshair');
        if (crosshair) {
            crosshair.classList.add('ar-movable');
        }

        const moveReticleTo = (clientX, clientY) => {
            this.arReticleScreenPos.x = clientX;
            this.arReticleScreenPos.y = clientY;
            if (crosshair && this.isARMode) {
                crosshair.style.left = clientX + 'px';
                crosshair.style.top = clientY + 'px';
            }
        };

        if (canvas) {
            canvas.addEventListener('pointerdown', (e) => {
                if (this.isARMode) {
                    moveReticleTo(e.clientX, e.clientY);
                }
            });
            canvas.addEventListener('pointermove', (e) => {
                if (this.isARMode && e.buttons > 0) {
                    moveReticleTo(e.clientX, e.clientY);
                }
            });
        }

        // 📱 2. Universal Canvas Screen Drag (Steer Anywhere on Mobile & 360° AR Pan)
        if (canvas) {
            let canvasDragTouchId = null;
            let lastDragX = 0, lastDragY = 0;

            canvas.addEventListener('touchstart', (e) => {
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const touch = e.changedTouches[i];
                    // If touch is on the screen and not part of the joystick or action cluster
                    if (touch.clientX < window.innerWidth * 0.7) {
                        canvasDragTouchId = touch.identifier;
                        lastDragX = touch.clientX;
                        lastDragY = touch.clientY;
                        break;
                    }
                }
            }, { passive: true });

            canvas.addEventListener('touchmove', (e) => {
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const touch = e.changedTouches[i];
                    if (touch.identifier === canvasDragTouchId) {
                        const deltaX = touch.clientX - lastDragX;
                        const deltaY = touch.clientY - lastDragY;
                        lastDragX = touch.clientX;
                        lastDragY = touch.clientY;

                        if (this.isARMode) {
                            // Smooth 360° AR touch pan
                            this.camera.rotation.y -= deltaX * 0.008;
                            this.camera.rotation.x -= deltaY * 0.006;
                        } else {
                            // Direct ship / vehicle steering
                            const moveScale = 0.06;
                            this.input.x = THREE.MathUtils.clamp(this.input.x + deltaX * moveScale, -1, 1);
                            this.input.y = THREE.MathUtils.clamp(this.input.y - deltaY * moveScale, -1, 1);

                            if (this.playerShip) {
                                this.playerShip.position.x = THREE.MathUtils.clamp(this.playerShip.position.x + deltaX * 0.12, -16, 16);
                                if (this.activeGame !== 'racer' && this.activeGame !== 'mech') {
                                    this.playerShip.position.y = THREE.MathUtils.clamp(this.playerShip.position.y - deltaY * 0.12, -11, 11);
                                }
                            }
                        }
                        break;
                    }
                }
            }, { passive: true });

            const resetCanvasDrag = (e) => {
                for (let i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier === canvasDragTouchId) {
                        canvasDragTouchId = null;
                        this.input.x = 0;
                        this.input.y = 0;
                        break;
                    }
                }
            };

            canvas.addEventListener('touchend', resetCanvasDrag);
            canvas.addEventListener('touchcancel', resetCanvasDrag);
        }

        // 🔥 3. Action Buttons with Rapid Fire Support
        const btnFire = document.getElementById('tbtn-fire');
        let fireInterval = null;
        if (btnFire) {
            const startFiring = (e) => {
                e.preventDefault();
                this.fireLaser();
                if (!fireInterval) {
                    fireInterval = setInterval(() => {
                        if (this.gameRunning) this.fireLaser();
                    }, 180);
                }
            };
            const stopFiring = (e) => {
                if (e) e.preventDefault();
                if (fireInterval) {
                    clearInterval(fireInterval);
                    fireInterval = null;
                }
            };

            btnFire.addEventListener('touchstart', startFiring, { passive: false });
            btnFire.addEventListener('touchend', stopFiring, { passive: false });
            btnFire.addEventListener('touchcancel', stopFiring, { passive: false });
            btnFire.addEventListener('mousedown', startFiring);
            btnFire.addEventListener('mouseup', stopFiring);
        }

        const btnMissile = document.getElementById('tbtn-missile');
        if (btnMissile) {
            btnMissile.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.fireHomingMissile();
            }, { passive: false });
            btnMissile.addEventListener('click', () => { this.fireHomingMissile(); });
        }

        const btnOverdrive = document.getElementById('tbtn-overdrive');
        if (btnOverdrive) {
            btnOverdrive.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.fireOverdriveMegaBeam();
            }, { passive: false });
            btnOverdrive.addEventListener('click', () => { this.fireOverdriveMegaBeam(); });
        }

        const btnBoost = document.getElementById('tbtn-boost');
        if (btnBoost) {
            btnBoost.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.isBoosting = true;
            }, { passive: false });
            btnBoost.addEventListener('touchend', (e) => {
                if (e) e.preventDefault();
                this.isBoosting = false;
            }, { passive: false });
            btnBoost.addEventListener('mousedown', () => { this.isBoosting = true; });
            btnBoost.addEventListener('mouseup', () => { this.isBoosting = false; });
        }
    }
}

// Global instance
window.arcadeEngine = new CyberArcadeEngine();
