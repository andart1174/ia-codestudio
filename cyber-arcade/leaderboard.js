/**
 * ══════════════════════════════════════════════════════════════════════
 * 🏆 CYBER ARCADE 3D ARENA — MASTER LEADERBOARD, SHOP & UNIFIED SSO (V25)
 * ══════════════════════════════════════════════════════════════════════
 * - 🪙 Global Unified GENIUS IA Coins Sync with Community & Website
 * - 👑 Real-Time Recognition for Admin (NEXUS111) & All Registered Users
 * - 🏪 Cyber Hangar & Shop: Instant 1-Click Buy, Equip & Active Craft Switching
 * - 🔒 Unified Website SSO: Uses IA Code Studio 'genius_session' + Firebase Auth
 * - ⚡ 100% Free Access for All Registered Website Members
 * - 📖 Interactive Game Rules & Pilot Guide (EN / FR)
 * ══════════════════════════════════════════════════════════════════════
 */

class CyberLeaderboard {
    constructor() {
        this.currentLang = localStorage.getItem('cyber_lang') || 'en';
        
        // 🪙 Global Unified GENIUS IA Coins Sync with Community & Website
        this.coins = this.getInitialCoins();

        this.siteUser = this.getWebsiteSession();
        this.highScores = JSON.parse(localStorage.getItem('cyber_highscores') || '{}');
        this.inventory = JSON.parse(localStorage.getItem('cyber_inventory') || '{"crafts":["apex_starfighter"],"lasers":["#00f2fe"],"trails":["trail_plasma"],"upgrades":[],"titles":["Cadet Pilot"],"avatar":"🧑‍🚀"}');
        if (!Array.isArray(this.inventory.crafts)) this.inventory.crafts = ['apex_starfighter'];
        if (!Array.isArray(this.inventory.lasers)) this.inventory.lasers = ['#00f2fe'];
        if (!Array.isArray(this.inventory.trails)) this.inventory.trails = ['trail_plasma'];
        if (!Array.isArray(this.inventory.upgrades)) this.inventory.upgrades = [];
        if (!Array.isArray(this.inventory.titles)) this.inventory.titles = ['Cadet Pilot'];

        this.equippedCraft = localStorage.getItem('cyber_equipped_craft') || 'apex_starfighter';
        this.equippedLaser = localStorage.getItem('cyber_equipped_laser') || '#00f2fe';
        this.equippedTrail = localStorage.getItem('cyber_equipped_trail') || 'trail_plasma';
        this.equippedTitle = localStorage.getItem('cyber_equipped_title') || 'Cadet Pilot';
        
        // Mock Weekly Global Leaderboard Data (9 Games)
        this.weeklyLeaderboard = [
            { rank: 1, name: 'Vortex_Rider', game: 'racer', score: 28450, reward: '🥇 1,000 Coins', badge: 'champion' },
            { rank: 2, name: 'CyberTitan_99', game: 'mech', score: 24200, reward: '🥈 750 Coins', badge: 'pro' },
            { rank: 3, name: 'SaberQueen', game: 'beatslicer', score: 21800, reward: '🥉 500 Coins', badge: 'pro' },
            { rank: 4, name: 'NeoNova_AR', game: 'ar', score: 19650, reward: '✨ 250 Coins', badge: 'cadet' },
            { rank: 5, name: 'StarWave_Surfer', game: 'surf', score: 17400, reward: '✨ 150 Coins', badge: 'cadet' },
            { rank: 6, name: 'Alex_Viper', game: 'city', score: 14500, reward: '✨ 100 Coins', badge: 'cadet' },
            { rank: 7, name: 'QuantumStrike', game: 'blaster', score: 12800, reward: '✨ 50 Coins', badge: 'cadet' },
            { rank: 8, name: 'DarkHorizon', game: 'slalom', score: 11400, reward: '✨ 50 Coins', badge: 'cadet' },
            { rank: 9, name: 'SingularityGhost', game: 'blackhole', score: 9800, reward: '✨ 50 Coins', badge: 'cadet' }
        ];

        this.translations = {
            en: {
                brand_title: "CYBER ARCADE 3D",
                brand_sub: "BY IA CODE STUDIO",
                nav_rules: "RULES & CONTROLS 📖",
                nav_shop: "HANGAR & SHOP 🏪",
                nav_rewards: "FREE COINS & REWARDS 🎁",
                hub_title: "9 EPIC 3D & <span class='neon-text'>AR GAMES ARENA</span>",
                hub_subtitle: "Race cybercars, pilot giant battle mechs, slice rhythm beats, surf cosmic waves, and fight alien invaders in WebGL & AR! 100% Free for all registered IA Code Studio members!",
                stat_high_score: "Personal Record",
                stat_rank: "Global Rank",
                stat_ship: "Active Craft",
                btn_hangar: "Custom Hangar 🚀",
                btn_leaderboard: "Leaderboard 🏆",
                btn_play_now: "PLAY NOW 🚀",
                btn_play_ar: "START AR REALITY 📱",
                btn_play_racer: "START RACE 🏎️",
                btn_play_mech: "LAUNCH TITAN MECH 🤖",
                btn_play_beatslicer: "PLAY BEAT SLICER 🎵",
                btn_play_surf: "START COSMIC SURF 🏄",
                ar_desc: "Turn on your phone camera! 3D alien saucers appear floating in your room. Move 360° to aim, record 10s TikTok clips, or land your ship on your table!",
                racer_desc: "Pilot high-speed cyber hovercars on suspended skyways! Power-drift through tight neon corners, trigger Nitro Boost gates, and blast rival racers with EMPs!",
                mech_desc: "Control a massive 30-meter War Mech! Fire dual Gatling tracer rounds, launch shoulder missile swarms, and slash giant enemy robots with your Energy Blade!",
                beatslicer_desc: "Slice incoming musical rhythm blocks in 3D with dual cyan & magenta laser sabers to synthwave beats! Build massive combo multipliers with precision cuts!",
                surf_desc: "Surf on starlight waves through planetary rings on a glowing plasma hoverboard! Perform 360 backflips, grind energy rails, and collect cosmic fuel orbs!",
                city_desc: "Fly your starfighter at high speed through a 3D neon megacity between skyscrapers, hover traffic & sky-bridges! Destroy alien assault dropships!",
                blaster_desc: "Shoot down swarms of alien saucers, heavy dreadnoughts and asteroids! Features 3 lives, auto-healing shield, lock-on missiles, and Mega-Beam!",
                slalom_desc: "Fly at hyper-speed through a glowing neon tunnel while dodging and blasting alien patrol drones guarding quantum gates!",
                blackhole_desc: "Alien hunter craft try to tractor-beam you into the singularity. Blast through their blockade, collect fuel cells and slingshot to freedom!",
                leaderboard_title: "Top Champions This Week",
                reset_timer: "Reset in 4 days (5,000 Coins Prize Pool)",
                hud_score: "SCORE",
                hud_shield: "SHIELD",
                modal_final_score: "FINAL SCORE",
                modal_crystals: "CRYSTALS",
                modal_coins_earned: "COINS EARNED",
                challenge_friend_title: "CHALLENGE A FRIEND TO BEAT YOUR SCORE!",
                challenge_friend_sub: "Send your challenge link on WhatsApp or TikTok. If they beat you, both get bonus coins!",
                your_name: "Your Name:",
                btn_copy: "Copy Link",
                btn_replay: "PLAY AGAIN",
                btn_hub: "ARCADE HUB",
                hangar_shop_title: "CYBER HANGAR & CYBER SHOP",
                htab_crafts: "Crafts & Skins 🚀",
                htab_lasers: "Lasers & Trails ⚡",
                htab_upgrades: "Tech Upgrades 🛡️",
                htab_titles: "Titles & Avatars 🥇",
                htab_crate: "Mystery Crate 🎁",
                btn_equipped: "EQUIPPED",
                btn_equip: "EQUIP",
                btn_done: "SAVE & CONTINUE",
                rules_modal_title: "CYBER ARCADE 3D — OFFICIAL PILOT GUIDE & RULES",
                rtab_controls: "Controls (PC & Mobile)",
                rtab_weapons: "Weapons & Overdrive",
                rtab_modes: "9 Game Modes",
                rtab_scoring: "Scoring & Rewards",
                site_auth_modal_title: "IA CODE STUDIO ACCOUNT REQUIRED",
                site_auth_sub: "To play the 9 3D & AR Arcade Games, save your high scores, and climb the Global Leaderboard, please log in with your IA Code Studio account.",
                btn_site_login: "LOG IN / REGISTER ON IA CODE STUDIO",
                bounty_title: "FREE COINS & VIRAL BOUNTY PROGRAM",
                referral_desc: "Share your personal pilot referral link. When a friend clicks and plays, YOU GET +100 COINS and THEY GET +100 COINS!",
                tiktok_bounty_desc: "Post your AR video clip on TikTok or Instagram with #IACodeStudio #CyberArcade3D to earn the VIP Gold Pilot Badge and 500 Coins!",
                btn_share_wa_earn: "SHARE ON WHATSAPP & EARN +100 COINS 🪙",
                crate_title: "CYBER MYSTERY LOOT CRATE",
                crate_desc: "Open to unlock rare craft skins, legendary laser colors, or win the 1,000 COIN JACKPOT!",
                btn_open_crate: "OPEN CRATE (150 🪙)",
                hdr_laser_colors: "Plasma Laser Beam Colors",
                hdr_thrusters: "Thruster Trail FX",
                hdr_titles: "Honorary Pilot Titles",
                hdr_avatars: "3D Pilot Avatars",
                c_apex_desc: "Balanced interceptor with dual plasma cannons & aerodynamic wings.",
                c_hyperion_desc: "Ultra-aerodynamic cybercar with Mag-Lev rims & twin plasma exhausts.",
                c_mech_desc: "Heavy armored 30m War Mech with 6-barrel Gatling & Energy Katana.",
                c_dragon_desc: "Legendary dreadnought forged in stellar solar flares with heavy plasma cannons.",
                c_surf_desc: "Plasma hoverboard leaving blue electric lightning trails during 360 backflips.",
                t_plasma_desc: "Standard high-thrust ionization beam.",
                t_gold_desc: "Emanates radiant golden star sparks during boost.",
                t_matrix_desc: "Streams glowing green 0101 binary code in your slipstream!",
                upg_magnet_desc: "Automatically pulls nearby crystals & power-ups toward your craft!",
                upg_shield_desc: "Increases overall shield durability by 50% for maximum survival.",
                upg_missiles_desc: "Start every battle with 8 lock-on homing missiles instead of 4.",
                upg_nitro_desc: "Turbo boost and Nitro gates recharge twice as fast."
            },
            fr: {
                brand_title: "CYBER ARCADE 3D",
                brand_sub: "PAR IA CODE STUDIO",
                nav_rules: "RÈGLES & CONTRÔLES 📖",
                nav_shop: "HANGAR & BOUTIQUE 🏪",
                nav_rewards: "PIÈCES GRATUITES & BONUS 🎁",
                hub_title: "ARÈNE 3D & <span class='neon-text'>RÉALITÉ AUGMENTÉE (9 JEUX)</span>",
                hub_subtitle: "Pilotez des bolides cyber, contrôlez des mechas géants, tranchez des rythmes, surfez les vagues cosmiques et combattez les extraterrestres en 3D & RA ! 100% Gratuit pour tous les membres de IA Code Studio !",
                stat_high_score: "Record Personnel",
                stat_rank: "Rang Mondial",
                stat_ship: "Vaisseau Actif",
                btn_hangar: "Hangar Cyber 🚀",
                btn_leaderboard: "Classement 🏆",
                btn_play_now: "JOUER 🚀",
                btn_play_ar: "RÉALITÉ AR (CHAMBRE) 📱",
                btn_play_racer: "PILOTER LE BOLIDE 🏎️",
                btn_play_mech: "LANCER LE MECHA 🤖",
                btn_play_beatslicer: "JOUER BEAT SLICER 🎵",
                btn_play_surf: "SURF COSMIQUE 🏄",
                ar_desc: "Allumez la caméra de votre smartphone ! Des soucoupes volantes 3D apparaissent dans votre salon. Tournez à 360° pour viser, filmez des clips TikTok de 10s ou atterrissez sur votre bureau !",
                racer_desc: "Pilotez des supercars à lévitation magnétique sur des autoroutes célestes ! Driftez dans les virages néon serrés, prenez les portes Nitro et tirez sur vos rivaux !",
                mech_desc: "Contrôlez un Mecha de guerre blindé de 30 mètres ! Tirez avec des doubles Gatlings, lancez des salves de missiles et tranchez avec votre Katana d'Énergie !",
                beatslicer_desc: "Tranchez des cubes musicaux au rythme de la Synthwave avec deux sabres laser néon (Cyan et Magenta) ! Enchaînez les combos avec des coupes parfaites !",
                surf_desc: "Surfez sur les vagues de lumière stellaire à travers les anneaux planétaires sur un hoverboard de plasma ! Réalisez des saltos 360° et récoltez du carburant cosmique !",
                city_desc: "Pilotez à pleine vitesse dans une mégalopole 3D cyberpunk entre les gratte-ciel, le trafic aérien et les passerelles géantes ! Détruisez les vaisseaux de débarquement !",
                blaster_desc: "Abattez des vagues d'ovnis extraterrestres, des croiseurs de guerre et des astéroïdes ! 3 vies, bouclier à régénération, missiles à tête chercheuse et Méga-Rayon !",
                slalom_desc: "Volez à vitesse supersonique dans un tunnel néon tout en esquivant et détruisant les drones de patrouille protégeant les portes quantiques !",
                blackhole_desc: "Des chasseurs ennemis tentent de vous aspirer dans un trou noir. Brisez leur blocus, récoltez les cellules d'énergie et propulsez-vous vers la liberté !",
                leaderboard_title: "Les Meilleurs Champions de la Semaine",
                reset_timer: "Réinitialisation dans 4 jours (Cagnotte de 5 000 Pièces)",
                hud_score: "SCORE",
                hud_shield: "BOUCLIER",
                modal_final_score: "SCORE FINAL",
                modal_crystals: "CRISTAUX",
                modal_coins_earned: "PIÈCES GAGNÉES",
                challenge_friend_title: "DÉFIEZ UN AMI À BATTRE VOTRE SCORE !",
                challenge_friend_sub: "Envoyez votre lien de défi sur WhatsApp ou TikTok. S'il bat votre score, vous gagnez tous les deux des pièces !",
                your_name: "Votre Nom :",
                btn_copy: "Copier le Lien",
                btn_replay: "REJOUER",
                btn_hub: "MENU ARCADE",
                hangar_shop_title: "HANGAR CYBER & MAGASIN VIRTUEL",
                htab_crafts: "Vaisseaux & Bolides 🚀",
                htab_lasers: "Lasers & Traînées ⚡",
                htab_upgrades: "Améliorations 🛡️",
                htab_titles: "Titres & Avatars 🥇",
                htab_crate: "Caisse Mystère 🎁",
                btn_equipped: "ÉQUIPÉ",
                btn_equip: "ÉQUIPER",
                btn_done: "ENREGISTRER & CONTINUER",
                rules_modal_title: "CYBER ARCADE 3D — GUIDE OFFICIEL & RÈGLES DU PILOTE",
                rtab_controls: "Contrôles (PC & Mobile)",
                rtab_weapons: "Armes & Méga-Rayon",
                rtab_modes: "9 Modes de Jeu",
                rtab_scoring: "Points & Récompenses",
                site_auth_modal_title: "COMPTE IA CODE STUDIO REQUIS",
                site_auth_sub: "Pour jouer aux 9 Jeux d'Arcade 3D & RA, enregistrer vos scores et monter dans le classement, veuillez vous connecter avec votre compte IA Code Studio.",
                btn_site_login: "SE CONNECTER / S'INSCRIRE SUR IA CODE STUDIO",
                bounty_title: "PIÈCES GRATUITES & PROGRAMME VIRAL",
                referral_desc: "Partagez votre lien de parrainage. Lorsqu'un ami clique et joue, VOUS GAGNEZ +100 PIÈCES et IL GAGNE +100 PIÈCES !",
                tiktok_bounty_desc: "Publiez votre clip AR sur TikTok ou Instagram avec #IACodeStudio #CyberArcade3D pour débloquer le Badge VIP Or et 500 Pièces !",
                btn_share_wa_earn: "PARTAGER SUR WHATSAPP & GAGNER +100 PIÈCES 🪙",
                crate_title: "CAISSE MYSTÈRE CYBER",
                crate_desc: "Ouvrez pour débloquer des skins rares, des couleurs légendaires de laser ou le JACKPOT DE 1 000 PIÈCES !",
                btn_open_crate: "OUVRIR LA CAISSE (150 🪙)",
                hdr_laser_colors: "Couleurs du Faisceau Laser Plasma",
                hdr_thrusters: "Effets de Traînée de Propulsion",
                hdr_titles: "Titres Honorifiques de Pilote",
                hdr_avatars: "Avatars 3D de Pilote",
                c_apex_desc: "Intercepteur équilibré avec doubles canons plasma et ailes aérodynamiques.",
                c_hyperion_desc: "Supercar ultra-aérodynamique avec jantes Mag-Lev et doubles échappements.",
                c_mech_desc: "Mecha de guerre lourd de 30m avec Gatling à 6 tubes et Katana d'énergie.",
                c_dragon_desc: "Dreadnought légendaire forgé dans les éruptions solaires avec canons lourds.",
                c_surf_desc: "Hoverboard de plasma laissant des éclairs bleus lors des saltos à 360°.",
                t_plasma_desc: "Faisceau d'ionisation standard à haute poussée.",
                t_gold_desc: "Émet des étincelles dorées éclatantes pendant le boost.",
                t_matrix_desc: "Projette un code binaire 0101 vert fluorescent dans votre sillage !",
                upg_magnet_desc: "Attire automatiquement les cristaux et bonus proches vers votre vaisseau !",
                upg_shield_desc: "Augmente la résistance totale du bouclier de 50% pour une survie maximale.",
                upg_missiles_desc: "Commencez chaque combat avec 8 missiles à tête chercheuse au lieu de 4.",
                upg_nitro_desc: "Le Turbo Boost et les portes Nitro se rechargent deux fois plus vite."
            }
        };

        this.init();
    }

    getInitialCoins() {
        const savedGenius = localStorage.getItem('genius_coins');
        if (savedGenius !== null && !isNaN(parseInt(savedGenius, 10))) {
            return parseInt(savedGenius, 10);
        }
        const savedCyber = localStorage.getItem('cyber_coins');
        if (savedCyber !== null && !isNaN(parseInt(savedCyber, 10))) {
            return parseInt(savedCyber, 10);
        }
        return 0;
    }

    getWebsiteSession() {
        let user = null;
        const geniusSession = localStorage.getItem('genius_session');
        if (geniusSession) {
            try {
                user = JSON.parse(geniusSession);
            } catch (e) {}
        }

        // Try active Firebase Auth user
        if (!user && typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
            const fbUser = firebase.auth().currentUser;
            user = {
                name: fbUser.displayName || fbUser.email.split('@')[0],
                email: fbUser.email,
                uid: fbUser.uid
            };
        }

        // Try other stored user session keys across site
        if (!user) {
            const possibleKeys = ['ia_user', 'genius_user', 'user_session', 'ia_auth_user'];
            for (let k of possibleKeys) {
                const item = localStorage.getItem(k);
                if (item) {
                    try { 
                        const parsed = JSON.parse(item); 
                        if (parsed && (parsed.email || parsed.name)) { 
                            user = parsed; 
                            break; 
                        } 
                    } catch (e) {}
                }
            }
        }

        if (user && (user.email || user.name || user.displayName || user.username)) {
            const email = (user.email || '').trim();
            let customName = (email ? localStorage.getItem('custom_display_name_' + email) : null) ||
                             localStorage.getItem('hub_custom_name') ||
                             localStorage.getItem('genius_user_name') ||
                             user.displayName ||
                             user.username ||
                             user.name ||
                             (email ? email.split('@')[0] : 'Pilot');

            const ADMIN_EMAILS = ['andart1174@gmail.com', 'andart1174@yahoo.com'];
            const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase()) || 
                            (user.role && user.role.toLowerCase() === 'admin') || 
                            customName.toUpperCase().includes('NEXUS111');

            return {
                name: customName,
                email: email,
                uid: user.uid || email,
                role: isAdmin ? 'Admin' : (user.role || 'Member'),
                isAdmin: isAdmin,
                isSiteUser: true
            };
        }
        return null;
    }

    init() {
        this.siteUser = this.getWebsiteSession();
        this.coins = this.getInitialCoins();
        this.updateCoinDisplay();
        this.updateAuthDisplay();
        this.initFirebaseSync();
        this.initStorageListener();
        this.renderWeeklyTable();
        this.initLanguageControls();
        this.initCategoryTabs();
        this.initShopControls();
        this.initPlayButtons();
        this.initRulesModal();
        this.initSiteAuthModal();
        this.initBountyModal();
        this.applyLanguage(this.currentLang);
        this.updatePersonalBest();
        this.updateActiveCraftDisplay();
    }

    updateAuthDisplay() {
        const display = document.getElementById('pilot-username-display');
        const dot = document.getElementById('auth-status-dot');

        this.siteUser = this.getWebsiteSession();

        if (this.siteUser && this.siteUser.isSiteUser) {
            const roleBadge = this.siteUser.isAdmin ? ' <span style="background:linear-gradient(135deg,#ff8c00,#ff007f); color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:10px; margin-left:6px; letter-spacing:0.5px; box-shadow:0 0 10px rgba(255,140,0,0.6);">ADMIN</span>' : '';
            if (display) display.innerHTML = `Pilot: <strong>${this.siteUser.name}</strong>${roleBadge}`;
            if (dot) {
                dot.style.background = '#00ffcc';
                dot.style.boxShadow = '0 0 12px #00ffcc';
            }
        } else {
            if (display) display.textContent = (this.currentLang === 'fr') ? 'Connexion Requise 🔒' : 'Site Login Required 🔒';
            if (dot) {
                dot.style.background = '#ff0055';
                dot.style.boxShadow = '0 0 10px #ff0055';
            }
        }
    }

    initFirebaseSync() {
        if (typeof firebase === 'undefined') return;

        // Auto sign-in anonymously if needed to grant full Firestore read permissions
        if (firebase.auth && !firebase.auth().currentUser) {
            firebase.auth().signInAnonymously().catch(() => {});
        }

        if (firebase.auth) {
            try {
                firebase.auth().onAuthStateChanged((fbUser) => {
                    this.siteUser = this.getWebsiteSession();
                    this.updateAuthDisplay();
                    if (this.siteUser && this.siteUser.email) {
                        this.subscribeToUserDoc(this.siteUser.email);
                    }
                    if (fbUser && fbUser.uid && fbUser.uid !== (this.siteUser ? this.siteUser.email : '')) {
                        this.subscribeToUserDoc(fbUser.uid);
                    }
                });
            } catch (e) {}
        }

        if (this.siteUser && this.siteUser.email) {
            this.subscribeToUserDoc(this.siteUser.email);
        }
    }

    subscribeToUserDoc(targetId) {
        if (!targetId || typeof firebase === 'undefined' || !firebase.firestore) return;
        try {
            const db = firebase.firestore();
            db.collection('users').doc(targetId).onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data() || {};
                    if (typeof data.geniusCoins === 'number') {
                        this.coins = data.geniusCoins;
                        localStorage.setItem('genius_coins', this.coins.toString());
                        localStorage.setItem('cyber_coins', this.coins.toString());
                        this.updateCoinDisplay();
                    }
                    if (data.displayName) {
                        if (this.siteUser) this.siteUser.name = data.displayName;
                        this.updateAuthDisplay();
                    }
                }
            }, (err) => {
                console.log('Firebase user snapshot notice:', err);
            });
        } catch (e) {
            console.log('Firebase subscribe note:', e);
        }
    }

    initStorageListener() {
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('storage', (e) => {
                if (e.key === 'genius_coins' || e.key === 'cyber_coins') {
                    this.coins = this.getInitialCoins();
                    this.updateCoinDisplay();
                }
                if (e.key === 'genius_session' || e.key === 'hub_custom_name' || (e.key && e.key.startsWith('custom_display_name_'))) {
                    this.siteUser = this.getWebsiteSession();
                    this.updateAuthDisplay();
                    if (this.siteUser && this.siteUser.email) {
                        this.subscribeToUserDoc(this.siteUser.email);
                    }
                }
            });
        }
    }

    initSiteAuthModal() {
        const btnPilot = document.getElementById('btn-pilot-profile');
        const modalAuth = document.getElementById('modal-site-auth-required');
        const btnCloseAuth = document.getElementById('btn-close-auth');
        const btnGotoSite = document.getElementById('btn-goto-site-login');
        const btnQuickConnect = document.getElementById('btn-quick-site-connect');

        if (btnPilot && modalAuth) {
            btnPilot.addEventListener('click', () => {
                if (!this.siteUser) modalAuth.classList.add('active');
            });
        }
        if (btnCloseAuth && modalAuth) {
            btnCloseAuth.addEventListener('click', () => modalAuth.classList.remove('active'));
        }

        if (btnGotoSite) {
            btnGotoSite.addEventListener('click', () => {
                if (window.parent && window.parent.openLoginModal) {
                    window.parent.openLoginModal();
                } else {
                    alert((this.currentLang === 'fr') 
                        ? 'Redirection vers la page de connexion de IA Code Studio...' 
                        : 'Redirecting to IA Code Studio login page...');
                }
            });
        }

        if (btnQuickConnect) {
            btnQuickConnect.addEventListener('click', () => {
                const inputName = document.getElementById('quick-pilot-name');
                const val = inputName && inputName.value.trim() ? inputName.value.trim() : 'StudioMember_' + Math.floor(Math.random() * 1000);
                
                const sessionUser = {
                    name: val,
                    email: val.includes('@') ? val : `${val.toLowerCase()}@iacodestudio.com`,
                    role: 'Member'
                };
                localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                this.siteUser = sessionUser;
                this.siteUser.isSiteUser = true;

                this.updateAuthDisplay();
                if (modalAuth) modalAuth.classList.remove('active');

                if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
                if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
            });
        }
    }

    initRulesModal() {
        const btnOpenRules = document.getElementById('btn-open-rules');
        const modalRules = document.getElementById('modal-game-rules');
        const btnCloseRules = document.getElementById('btn-close-rules');
        const btnCloseFooter = document.getElementById('btn-close-rules-footer');

        if (btnOpenRules && modalRules) {
            btnOpenRules.addEventListener('click', () => modalRules.classList.add('active'));
        }
        if (btnCloseRules && modalRules) {
            btnCloseRules.addEventListener('click', () => modalRules.classList.remove('active'));
        }
        if (btnCloseFooter && modalRules) {
            btnCloseFooter.addEventListener('click', () => modalRules.classList.remove('active'));
        }

        const ruleTabs = document.querySelectorAll('.rule-tab-btn');
        ruleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                ruleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetTab = tab.getAttribute('data-rule-tab');
                document.querySelectorAll('.rules-tab-panel').forEach(p => p.classList.remove('active'));
                const targetPanel = document.getElementById(`rtab-content-${targetTab}`);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    }

    initShopControls() {
        const btnOpenHangar = document.getElementById('btn-open-hangar');
        const btnOpenShopNav = document.getElementById('btn-open-shop-nav');
        const modalHangar = document.getElementById('modal-hangar-view');
        const btnCloseHangar = document.getElementById('btn-close-hangar');
        const btnCloseHangarFtr = document.getElementById('btn-close-hangar-footer');

        const openShop = () => {
            if (modalHangar) {
                this.updateShopUI();
                modalHangar.classList.add('active');
            }
        };

        if (btnOpenHangar) btnOpenHangar.addEventListener('click', openShop);
        if (btnOpenShopNav) btnOpenShopNav.addEventListener('click', openShop);

        if (btnCloseHangar && modalHangar) {
            btnCloseHangar.addEventListener('click', () => modalHangar.classList.remove('active'));
        }
        if (btnCloseHangarFtr && modalHangar) {
            btnCloseHangarFtr.addEventListener('click', () => modalHangar.classList.remove('active'));
        }

        // Hangar Tab Navigation
        const hangarTabs = document.querySelectorAll('.hangar-tab-btn');
        hangarTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                hangarTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetTab = tab.getAttribute('data-hangar-tab');
                document.querySelectorAll('.hangar-tab-panel').forEach(p => p.classList.remove('active'));
                const targetPanel = document.getElementById(`htab-content-${targetTab}`);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });

        // 🚀 1. Crafts, Ships & Vehicles (Purchase & Equip)
        const buyButtons = document.querySelectorAll('[data-buy-item]');
        buyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-buy-item');
                const cost = parseInt(btn.getAttribute('data-cost') || '0', 10);
                this.handleItemPurchaseOrEquip(itemId, cost);
            });
        });

        const craftCards = document.querySelectorAll('.shop-item-card[data-item-id]');
        craftCards.forEach(card => {
            card.addEventListener('click', () => {
                const itemId = card.getAttribute('data-item-id');
                const btn = card.querySelector('[data-buy-item]');
                const cost = btn ? parseInt(btn.getAttribute('data-cost') || '0', 10) : 0;
                this.handleItemPurchaseOrEquip(itemId, cost);
            });
        });

        // ⚡ 2. Laser Color Palette Selection
        const laserChips = document.querySelectorAll('.laser-chip-card');
        laserChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const color = chip.getAttribute('data-laser-color');
                const cost = parseInt(chip.getAttribute('data-cost') || '0', 10);

                if (cost > 0 && !this.inventory.lasers.includes(color)) {
                    if (this.coins >= cost) {
                        this.addCoins(-cost);
                        this.inventory.lasers.push(color);
                        this.equippedLaser = color;
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                        localStorage.setItem('cyber_equipped_laser', color);
                        if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 60 });
                        if (window.arcadeEngine) {
                            window.arcadeEngine.setLaserColor(color);
                            window.arcadeEngine.playSFX('laser');
                        }
                    } else {
                        const needed = cost - this.coins;
                        alert(this.currentLang === 'fr' 
                            ? `Il vous manque ${needed} Pièces pour débloquer ce laser !` 
                            : `You need ${needed} more Coins to unlock this laser!`);
                        return;
                    }
                } else {
                    this.equippedLaser = color;
                    localStorage.setItem('cyber_equipped_laser', color);
                    if (window.arcadeEngine) {
                        window.arcadeEngine.setLaserColor(color);
                        window.arcadeEngine.playSFX('laser');
                    }
                }
                this.updateShopUI();
            });
        });

        // 👑 3. Pilot Titles & Avatars
        const titleCards = document.querySelectorAll('.title-badge-card');
        titleCards.forEach(card => {
            card.addEventListener('click', () => {
                const titleName = card.getAttribute('data-title-name');
                const cost = parseInt(card.getAttribute('data-cost') || '0', 10);
                if (cost > 0 && !this.inventory.titles.includes(titleName)) {
                    if (this.coins >= cost) {
                        this.addCoins(-cost);
                        this.inventory.titles.push(titleName);
                        this.equippedTitle = titleName;
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                        localStorage.setItem('cyber_equipped_title', titleName);
                        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 60 });
                    } else {
                        const needed = cost - this.coins;
                        alert(this.currentLang === 'fr' 
                            ? `Il vous manque ${needed} Pièces pour ce titre !` 
                            : `You need ${needed} more Coins for this title!`);
                        return;
                    }
                } else {
                    this.equippedTitle = titleName;
                    localStorage.setItem('cyber_equipped_title', titleName);
                }
                this.updateShopUI();
            });
        });

        const avatarCards = document.querySelectorAll('.avatar-card');
        avatarCards.forEach(card => {
            card.addEventListener('click', () => {
                const av = card.getAttribute('data-avatar');
                this.inventory.avatar = av;
                localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                this.updateShopUI();
            });
        });

        // 🎁 4. Mystery Loot Crate Opener
        const btnOpenCrate = document.getElementById('btn-open-mystery-crate');
        const crateBox = document.getElementById('crate-3d-box');
        const crateResult = document.getElementById('crate-result-display');
        const crateResTitle = document.getElementById('crate-res-title');
        const crateResIcon = document.getElementById('crate-res-icon');

        if (btnOpenCrate) {
            btnOpenCrate.addEventListener('click', () => {
                const crateCost = 150;
                if (this.coins < crateCost) {
                    alert(this.currentLang === 'fr' 
                        ? `Il vous faut ${crateCost} Pièces pour ouvrir une Caisse Mystère !` 
                        : `You need ${crateCost} Coins to open a Mystery Crate!`);
                    return;
                }

                this.addCoins(-crateCost);
                if (crateBox) crateBox.classList.add('opening');

                setTimeout(() => {
                    if (crateBox) crateBox.classList.remove('opening');
                    
                    const rewards = [
                        { icon: '🪙', title: 'JACKPOT: +500 COINS!', coins: 500 },
                        { icon: '💎', title: '+200 COINS & VIP PILOT BADGE!', coins: 200 },
                        { icon: '⚡', title: 'RAINBOW RGB LASER UNLOCKED!', laser: 'rainbow' },
                        { icon: '👑', title: 'LEGENDARY GOLD AVATAR UNLOCKED!', avatar: '👑' }
                    ];
                    const chosen = rewards[Math.floor(Math.random() * rewards.length)];

                    if (chosen.coins) this.addCoins(chosen.coins);
                    if (chosen.laser && !this.inventory.lasers.includes(chosen.laser)) {
                        this.inventory.lasers.push(chosen.laser);
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                    }
                    if (chosen.avatar) {
                        this.inventory.avatar = chosen.avatar;
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                    }

                    if (crateResult && crateResTitle && crateResIcon) {
                        crateResIcon.textContent = chosen.icon;
                        crateResTitle.textContent = chosen.title;
                        crateResult.style.display = 'block';
                    }

                    if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 90 });
                    if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
                    this.updateShopUI();
                }, 1200);
            });
        }
    }

    handleItemPurchaseOrEquip(itemId, cost) {
        if (!itemId) return;

        // Is it a craft?
        const isCraft = ['apex_starfighter', 'hyperion_gt', 'phoenix_mech', 'solar_dragon', 'lightning_board'].includes(itemId);
        // Is it a trail?
        const isTrail = itemId.startsWith('trail_');
        // Is it an upgrade?
        const isUpgrade = itemId.startsWith('upg_');

        if (isCraft) {
            if (!this.inventory.crafts.includes(itemId)) {
                if (this.coins >= cost) {
                    this.addCoins(-cost);
                    this.inventory.crafts.push(itemId);
                    this.equippedCraft = itemId;
                    localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                    localStorage.setItem('cyber_equipped_craft', itemId);
                    if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
                    if (window.arcadeEngine) {
                        if (window.arcadeEngine.setShipType) window.arcadeEngine.setShipType(itemId);
                        window.arcadeEngine.playSFX('respawn');
                    }
                } else {
                    const needed = cost - this.coins;
                    alert(this.currentLang === 'fr' 
                        ? `Il vous manque ${needed} Pièces pour débloquer ce bolide !` 
                        : `You need ${needed} more Coins to unlock this craft!`);
                    return;
                }
            } else {
                this.equippedCraft = itemId;
                localStorage.setItem('cyber_equipped_craft', itemId);
                if (window.arcadeEngine) {
                    if (window.arcadeEngine.setShipType) window.arcadeEngine.setShipType(itemId);
                    window.arcadeEngine.playSFX('respawn');
                }
            }
            this.updateActiveCraftDisplay();
        } else if (isTrail) {
            if (!this.inventory.trails.includes(itemId)) {
                if (this.coins >= cost) {
                    this.addCoins(-cost);
                    this.inventory.trails.push(itemId);
                    this.equippedTrail = itemId;
                    localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                    localStorage.setItem('cyber_equipped_trail', itemId);
                    if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 60 });
                } else {
                    const needed = cost - this.coins;
                    alert(this.currentLang === 'fr' 
                        ? `Il vous manque ${needed} Pièces pour cette traînée !` 
                        : `You need ${needed} more Coins for this trail!`);
                    return;
                }
            } else {
                this.equippedTrail = itemId;
                localStorage.setItem('cyber_equipped_trail', itemId);
            }
        } else if (isUpgrade) {
            if (!this.inventory.upgrades.includes(itemId)) {
                if (this.coins >= cost) {
                    this.addCoins(-cost);
                    this.inventory.upgrades.push(itemId);
                    localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70 });
                } else {
                    const needed = cost - this.coins;
                    alert(this.currentLang === 'fr' 
                        ? `Il vous manque ${needed} Pièces pour cette amélioration !` 
                        : `You need ${needed} more Coins for this upgrade!`);
                    return;
                }
            }
        }

        this.updateShopUI();
    }

    updateActiveCraftDisplay() {
        const craftNames = {
            'apex_starfighter': 'Apex Starfighter FX-9',
            'hyperion_gt': 'Hyperion Neon GT 2077',
            'phoenix_mech': 'Titan Phoenix War Mech',
            'solar_dragon': 'Solar Dragon Destroyer',
            'lightning_board': 'Lightning Starlight Board'
        };
        const activeEl = document.getElementById('hub-active-ship-name');
        if (activeEl) {
            activeEl.textContent = craftNames[this.equippedCraft] || this.equippedCraft;
        }
    }

    updateShopUI() {
        const balanceEl = document.getElementById('shop-coin-balance');
        if (balanceEl) balanceEl.textContent = this.coins;

        // 1. Update Craft & Trail & Upgrade Cards
        const shopCards = document.querySelectorAll('.shop-item-card[data-item-id]');
        shopCards.forEach(card => {
            const itemId = card.getAttribute('data-item-id');
            const btn = card.querySelector('.btn-shop-action');
            if (btn) {
                const isCraft = ['apex_starfighter', 'hyperion_gt', 'phoenix_mech', 'solar_dragon', 'lightning_board'].includes(itemId);
                const isTrail = itemId.startsWith('trail_');
                const isUpgrade = itemId.startsWith('upg_');

                if (isCraft) {
                    if (this.equippedCraft === itemId) {
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>' + ((this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED') + '</span>';
                        btn.className = 'btn-shop-action equipped';
                        card.classList.add('active');
                    } else if (this.inventory.crafts.includes(itemId)) {
                        btn.innerHTML = '<span>' + ((this.currentLang === 'fr') ? 'ÉQUIPER' : 'EQUIP') + '</span>';
                        btn.className = 'btn-shop-action unlocked';
                        card.classList.remove('active');
                    } else {
                        const cost = card.getAttribute('data-cost') || btn.getAttribute('data-cost') || '0';
                        btn.innerHTML = '<span>' + ((this.currentLang === 'fr') ? `DÉBLOQUER (${cost} 🪙)` : `UNLOCK (${cost} 🪙)`) + '</span>';
                        btn.className = 'btn-shop-action unlock';
                        card.classList.remove('active');
                    }
                } else if (isTrail) {
                    if (this.equippedTrail === itemId) {
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>' + ((this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED') + '</span>';
                        btn.className = 'btn-shop-action equipped';
                        card.classList.add('active');
                    } else if (this.inventory.trails.includes(itemId)) {
                        btn.innerHTML = '<span>' + ((this.currentLang === 'fr') ? 'ÉQUIPER' : 'EQUIP') + '</span>';
                        btn.className = 'btn-shop-action unlocked';
                        card.classList.remove('active');
                    } else {
                        const cost = card.getAttribute('data-cost') || btn.getAttribute('data-cost') || '0';
                        btn.innerHTML = '<span>' + ((this.currentLang === 'fr') ? `DÉBLOQUER (${cost} 🪙)` : `UNLOCK (${cost} 🪙)`) + '</span>';
                        btn.className = 'btn-shop-action unlock';
                        card.classList.remove('active');
                    }
                } else if (isUpgrade) {
                    if (this.inventory.upgrades.includes(itemId)) {
                        btn.innerHTML = '<i class="fa-solid fa-shield"></i> <span>' + ((this.currentLang === 'fr') ? 'ACTIVÉ' : 'ACTIVATED') + '</span>';
                        btn.className = 'btn-shop-action equipped';
                        card.classList.add('active');
                    } else {
                        const cost = card.getAttribute('data-cost') || btn.getAttribute('data-cost') || '0';
                        btn.innerHTML = '<span>' + ((this.currentLang === 'fr') ? `DÉBLOQUER (${cost} 🪙)` : `UNLOCK (${cost} 🪙)`) + '</span>';
                        btn.className = 'btn-shop-action unlock';
                        card.classList.remove('active');
                    }
                }
            }
        });

        // 2. Update Laser selection chips
        const laserChips = document.querySelectorAll('.laser-chip-card');
        laserChips.forEach(chip => {
            const color = chip.getAttribute('data-laser-color');
            const isEquipped = (this.equippedLaser === color);
            chip.classList.toggle('active', isEquipped);
            
            const cost = parseInt(chip.getAttribute('data-cost') || '0', 10);
            const isOwned = cost === 0 || this.inventory.lasers.includes(color);
            const label = chip.querySelector('small');
            if (label) {
                if (isEquipped) {
                    label.textContent = (this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED';
                    label.className = 'badge-free';
                } else if (isOwned) {
                    label.textContent = (this.currentLang === 'fr') ? 'DÉBLOQUÉ' : 'UNLOCKED';
                    label.className = 'badge-unlocked';
                } else {
                    label.textContent = `${cost} 🪙`;
                    label.className = 'badge-price';
                }
            }
        });

        // 3. Update Title badges
        const titleCards = document.querySelectorAll('.title-badge-card');
        titleCards.forEach(card => {
            const titleName = card.getAttribute('data-title-name');
            const isEquipped = (this.equippedTitle === titleName);
            card.classList.toggle('active', isEquipped);
            const btn = card.querySelector('button');
            const small = card.querySelector('small');
            if (isEquipped) {
                if (btn) btn.style.display = 'none';
                if (!small) {
                    const sm = document.createElement('small');
                    sm.className = 'badge-free';
                    sm.textContent = (this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED';
                    card.appendChild(sm);
                } else {
                    small.textContent = (this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED';
                }
            } else if (this.inventory.titles.includes(titleName)) {
                if (btn) btn.style.display = 'none';
                if (!small) {
                    const sm = document.createElement('small');
                    sm.className = 'badge-unlocked';
                    sm.textContent = (this.currentLang === 'fr') ? 'DÉBLOQUÉ' : 'UNLOCKED';
                    card.appendChild(sm);
                } else {
                    small.textContent = (this.currentLang === 'fr') ? 'DÉBLOQUÉ' : 'UNLOCKED';
                }
            }
        });

        // 4. Update Avatar cards
        const avatarCards = document.querySelectorAll('.avatar-card');
        avatarCards.forEach(card => {
            const av = card.getAttribute('data-avatar');
            card.classList.toggle('active', this.inventory.avatar === av);
        });
    }

    initBountyModal() {
        const btnOpen = document.getElementById('btn-open-bounty');
        const modal = document.getElementById('modal-viral-bounty');
        const btnClose = document.getElementById('btn-close-bounty');
        const btnCopy = document.getElementById('btn-copy-referral');
        const inputRef = document.getElementById('referral-link-input');

        if (btnOpen && modal) {
            btnOpen.addEventListener('click', () => modal.classList.add('active'));
        }
        if (btnClose && modal) {
            btnClose.addEventListener('click', () => modal.classList.remove('active'));
        }

        if (inputRef && this.siteUser) {
            inputRef.value = `https://ia-codestudio.com/cyber-arcade/?ref=${encodeURIComponent(this.siteUser.name)}`;
        }

        if (btnCopy && inputRef) {
            btnCopy.addEventListener('click', () => {
                inputRef.select();
                navigator.clipboard.writeText(inputRef.value).then(() => {
                    const original = btnCopy.innerHTML;
                    btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    setTimeout(() => btnCopy.innerHTML = original, 2000);
                });
            });
        }
    }

    initCategoryTabs() {
        const catTabs = document.querySelectorAll('.category-tab');
        const cards = document.querySelectorAll('.game-launch-card');

        catTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                catTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-category');
                cards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
            });
        });
    }

    initPlayButtons() {
        const startBtns = document.querySelectorAll('[data-start-game]');
        startBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameType = btn.getAttribute('data-start-game');
                
                this.siteUser = this.getWebsiteSession();
                if (!this.siteUser) {
                    const modalAuth = document.getElementById('modal-site-auth-required');
                    if (modalAuth) {
                        modalAuth.classList.add('active');
                        return;
                    }
                }

                if (window.arcadeEngine) {
                    window.arcadeEngine.startGame(gameType);
                }
            });
        });

        const replayBtn = document.getElementById('btn-modal-replay');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                const modal = document.getElementById('modal-game-over');
                if (modal) modal.classList.remove('active');
                if (window.arcadeEngine) {
                    window.arcadeEngine.startGame(window.arcadeEngine.activeGame);
                }
            });
        }

        const backHubBtn = document.getElementById('btn-modal-back-hub');
        if (backHubBtn) {
            backHubBtn.addEventListener('click', () => {
                const modal = document.getElementById('modal-game-over');
                if (modal) modal.classList.remove('active');
                if (window.arcadeEngine) {
                    window.arcadeEngine.exitToHub();
                }
            });
        }

        const navHome = document.getElementById('btn-nav-home');
        if (navHome) {
            navHome.addEventListener('click', () => {
                if (window.arcadeEngine) window.arcadeEngine.exitToHub();
            });
        }
    }

    initLanguageControls() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = btn.getAttribute('data-lang');
                if (lang === 'en' || lang === 'fr') {
                    this.applyLanguage(lang);
                }
            });
        });
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('cyber_lang', lang);

        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        const dict = this.translations[lang] || this.translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        this.updateAuthDisplay();
        this.updateShopUI();
        this.renderWeeklyTable();
    }

    updateCoinDisplay() {
        const el = document.getElementById('header-coin-count');
        if (el) el.textContent = this.coins;
        const shopEl = document.getElementById('shop-coin-balance');
        if (shopEl) shopEl.textContent = this.coins;
    }

    addCoins(amount) {
        this.coins = Math.max(0, this.coins + amount);
        localStorage.setItem('genius_coins', this.coins.toString());
        localStorage.setItem('cyber_coins', this.coins.toString());
        this.updateCoinDisplay();

        // Sync with Firebase Firestore if logged in
        if (this.siteUser && this.siteUser.email && typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
            try {
                const db = firebase.firestore();
                db.collection('users').doc(this.siteUser.email).update({
                    geniusCoins: this.coins
                }).catch(err => console.log('Firestore coin update notice:', err));
            } catch (e) {}
        }
    }

    recordHighScore(game, score) {
        const currentBest = this.highScores[game] || 0;
        if (score > currentBest) {
            this.highScores[game] = score;
            localStorage.setItem('cyber_highscores', JSON.stringify(this.highScores));
            this.updatePersonalBest();
        }
    }

    updatePersonalBest() {
        let maxScore = 0;
        for (let g in this.highScores) {
            if (this.highScores[g] > maxScore) maxScore = this.highScores[g];
        }
        const bestEl = document.getElementById('hub-personal-highscore');
        if (bestEl) bestEl.textContent = `${maxScore.toLocaleString()} pts`;
    }

    renderWeeklyTable() {
        const tbody = document.getElementById('leaderboard-table-body');
        if (!tbody) return;

        const isFr = (this.currentLang === 'fr');
        const gameNames = {
            racer: isFr ? '🏎️ Cyber Racer 2077' : '🏎️ Cyber Racer 2077',
            mech: isFr ? '🤖 Titan Mech 3D' : '🤖 Titan Mech 3D',
            beatslicer: isFr ? '🎵 Beat Slicer 3D' : '🎵 Beat Slicer 3D',
            surf: isFr ? '🏄 Cosmic Surf 3D' : '🏄 Cosmic Surf 3D',
            ar: isFr ? '📱 Réalité AR' : '📱 AR Reality Invasion',
            city: isFr ? '🏙️ Cyber City 3D' : '🏙️ Cyber City 3D',
            blaster: isFr ? '🚀 Space Blaster' : '🚀 Space Blaster',
            slalom: isFr ? '⚡ Slalom Tunnel' : '⚡ Slalom Tunnel',
            blackhole: isFr ? '🕳️ Trou Noir' : '🕳️ Black Hole'
        };

        let html = '';
        this.weeklyLeaderboard.forEach(row => {
            const rankIcon = row.rank === 1 ? '🥇 #1' : (row.rank === 2 ? '🥈 #2' : (row.rank === 3 ? '🥉 #3' : `#${row.rank}`));
            html += `
                <tr>
                    <td style="font-weight:800; color:${row.rank <= 3 ? '#ffb703' : 'var(--text-muted)'}">${rankIcon}</td>
                    <td><strong>${row.name}</strong></td>
                    <td>${gameNames[row.game] || row.game}</td>
                    <td style="color:var(--accent-cyan); font-family:var(--font-code); font-weight:700;">${row.score.toLocaleString()} pts</td>
                    <td style="color:#ff007f;">${row.reward}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }
}

// Global Leaderboard instance
window.cyberLeaderboard = new CyberLeaderboard();
