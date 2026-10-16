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

        // 🔐 Unified Authentication State
        this.isSignUpMode = false;
        this.isRecoveryMode = false;
        this.pendingGameType = null;

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
                upg_nitro_desc: "Turbo boost and Nitro gates recharge twice as fast.",
                // 🔐 Real Authentication Modal Translations
                login_title: "Sign In",
                signup_title: "Create an Account",
                recovery_title: "Reset Password",
                login_google_btn: "Continue with Google",
                login_divider: "OR WITH EMAIL",
                signup_name: "Your name",
                login_password: "Password",
                login_forgot: "Forgot password?",
                recovery_hint: "Enter your email and your new password.",
                recovery_btn: "Save & Sign In",
                login_btn: "Sign In",
                signup_btn: "Create Account",
                login_no_account: "No account? Sign up",
                login_has_account: "Already have an account? Sign in",
                logged_as: "Pilot:",
                btn_logout: "Logout",
                auth_err_email_req: "Please enter a valid email address.",
                auth_err_pwd_req: "Password must be at least 4 characters.",
                auth_err_not_found: "Account not found.",
                auth_err_taken: "Email already registered.",
                auth_err_invalid: "Incorrect email or password.",
                auth_google_fail: "Google sign in failed.",
                auth_required_prompt: "Site Login Required 🔒"
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
                upg_nitro_desc: "Le Turbo Boost et les portes Nitro se rechargent deux fois plus vite.",
                // 🔐 Real Authentication Modal Translations
                login_title: "Se connecter",
                signup_title: "Créer un compte",
                recovery_title: "Récupération",
                login_google_btn: "Continuer avec Google",
                login_divider: "OU AVEC EMAIL",
                signup_name: "Votre nom",
                login_password: "Mot de passe",
                login_forgot: "Mot de passe oublié ?",
                recovery_hint: "Entrez votre email et votre nouveau mot de passe.",
                recovery_btn: "Sauvegarder et Connecter",
                login_btn: "Connexion",
                signup_btn: "S'inscrire",
                login_no_account: "Pas de compte ? Inscrivez-vous",
                login_has_account: "Déjà un compte ? Connectez-vous",
                logged_as: "Pilote :",
                btn_logout: "Déconnexion",
                auth_err_email_req: "Veuillez entrer une adresse email valide.",
                auth_err_pwd_req: "Le mot de passe doit comporter au moins 4 caractères.",
                auth_err_not_found: "Compte introuvable.",
                auth_err_taken: "Email déjà utilisé.",
                auth_err_invalid: "Email ou mot de passe incorrect.",
                auth_google_fail: "Échec de la connexion avec Google.",
                auth_required_prompt: "Connexion Requise 🔒"
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

        // Try retro arcade session if genius_session is not set
        if (!user) {
            const retroSession = localStorage.getItem('retro_arcade_user');
            if (retroSession) {
                try {
                    user = JSON.parse(retroSession);
                } catch (e) {}
            }
        }

        // Try active Firebase Auth user
        if (!user && typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
            const fbUser = firebase.auth().currentUser;
            if (fbUser && fbUser.email) {
                user = {
                    name: fbUser.displayName || fbUser.email.split('@')[0],
                    email: fbUser.email,
                    uid: fbUser.uid
                };
            }
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

        if (user) {
            const email = (user.email || '').trim().toLowerCase();
            const name = (user.name || user.displayName || user.username || '').trim();

            // 🚫 CRITICAL SECURITY FIX: Reject and purge any fake dummy accounts generated by old quick-connect bug!
            if (!email || !email.includes('@') || email.endsWith('@iacodestudio.com') || name.startsWith('StudioMember_')) {
                localStorage.removeItem('genius_session');
                localStorage.removeItem('retro_arcade_user');
                return null;
            }

            let customName = localStorage.getItem('custom_display_name_' + email) ||
                             user.displayName ||
                             user.name ||
                             user.username ||
                             email.split('@')[0];

            const ADMIN_EMAILS = ['andart1174@gmail.com', 'andart1174@yahoo.com'];
            const isAdmin = ADMIN_EMAILS.includes(email) || 
                            (user.role && user.role.toLowerCase() === 'admin') || 
                            customName.toUpperCase().includes('NEXUS111');

            return {
                name: customName,
                email: email,
                uid: user.uid || email,
                photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(customName)}&background=7c3aed&color=fff&bold=true`,
                role: isAdmin ? 'Admin' : 'User', // Simple user, NEVER premium
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

        // 📜 Smooth Scroll Handlers
        const btnScrollGames = document.getElementById('btn-scroll-to-games');
        if (btnScrollGames) {
            btnScrollGames.addEventListener('click', () => {
                const grid = document.getElementById('arena-games-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        const btnScrollLb = document.getElementById('btn-scroll-to-leaderboard');
        const btnOpenLb = document.getElementById('btn-open-leaderboard');
        const scrollToLb = () => {
            const lb = document.getElementById('leaderboard-section');
            if (lb) lb.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        if (btnScrollLb) btnScrollLb.addEventListener('click', scrollToLb);
        if (btnOpenLb) btnOpenLb.addEventListener('click', scrollToLb);

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
            const logoutTxt = (this.currentLang === 'fr') ? 'Déconnexion' : 'Logout';
            if (display) {
                display.innerHTML = `Pilot: <strong>${this.siteUser.name}</strong>${roleBadge} <a href="#" id="cyber-btn-logout" style="color:#ff0055; font-size:10px; margin-left:8px; text-decoration:underline; font-weight:700; cursor:pointer;">(${logoutTxt})</a>`;
                const logoutBtn = document.getElementById('cyber-btn-logout');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleLogout();
                    });
                }
            }
            if (dot) {
                dot.style.background = '#00ffcc';
                dot.style.boxShadow = '0 0 12px #00ffcc';
            }
        } else {
            const promptTxt = (this.currentLang === 'fr') ? 'Connexion Requise 🔒' : 'Site Login Required 🔒';
            if (display) {
                display.innerHTML = `<span id="cyber-btn-login-prompt" style="cursor:pointer; text-decoration:underline;">${promptTxt}</span>`;
                const loginPrompt = document.getElementById('cyber-btn-login-prompt');
                if (loginPrompt) {
                    loginPrompt.addEventListener('click', () => this.openAuthModal());
                }
            }
            if (dot) {
                dot.style.background = '#ff0055';
                dot.style.boxShadow = '0 0 10px #ff0055';
            }
        }
    }

    initFirebaseSync() {
        if (typeof firebase === 'undefined') return;

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
                if (e.key === 'genius_session' || e.key === 'retro_arcade_user' || e.key === 'hub_custom_name' || (e.key && e.key.startsWith('custom_display_name_'))) {
                    this.siteUser = this.getWebsiteSession();
                    this.updateAuthDisplay();
                    if (this.siteUser && this.siteUser.email) {
                        this.subscribeToUserDoc(this.siteUser.email);
                    }
                }
            });
        }
    }

    openAuthModal(gameType) {
        if (gameType) {
            this.pendingGameType = gameType;
        }
        const modal = document.getElementById('modal-site-auth-required');
        const errBox = document.getElementById('cyber-auth-error');
        if (errBox) errBox.style.display = 'none';
        this.updateAuthModalUI();
        if (modal) modal.classList.add('active');
    }

    closeAuthModal() {
        const modal = document.getElementById('modal-site-auth-required');
        if (modal) modal.classList.remove('active');
    }

    toggleAuthMode(e) {
        if (e && e.preventDefault) e.preventDefault();
        this.isSignUpMode = !this.isSignUpMode;
        this.isRecoveryMode = false;
        this.updateAuthModalUI();
    }

    toggleRecoveryMode(e) {
        if (e && e.preventDefault) e.preventDefault();
        this.isRecoveryMode = true;
        this.isSignUpMode = false;
        this.updateAuthModalUI();
    }

    updateAuthModalUI() {
        const title = document.getElementById('cyber-auth-modal-title');
        const googleBtn = document.getElementById('btn-cyber-google-auth');
        const divider = document.getElementById('cyber-auth-divider');
        const nameGroup = document.getElementById('cyber-auth-name-group');
        const nameInput = document.getElementById('cyber-auth-name');
        const forgotLink = document.getElementById('cyber-auth-forgot-link');
        const recoveryHint = document.getElementById('cyber-recovery-hint');
        const submitBtn = document.getElementById('cyber-auth-submit-btn');
        const toggleLink = document.getElementById('cyber-auth-toggle-link');
        const errBox = document.getElementById('cyber-auth-error');
        if (errBox) errBox.style.display = 'none';

        const dict = this.translations[this.currentLang] || this.translations.en;

        if (this.isRecoveryMode) {
            if (nameGroup) { nameGroup.style.display = 'none'; if (nameInput) nameInput.required = false; }
            if (googleBtn) googleBtn.style.display = 'none';
            if (divider) divider.style.display = 'none';
            if (forgotLink) forgotLink.style.display = 'none';
            if (recoveryHint) recoveryHint.style.display = 'block';
            if (title) title.textContent = dict.recovery_title || 'Reset Password';
            if (submitBtn) submitBtn.textContent = dict.recovery_btn || 'Save & Sign In';
            if (toggleLink) {
                toggleLink.textContent = dict.login_has_account || 'Already have an account? Sign in';
                toggleLink.onclick = (e) => {
                    e.preventDefault();
                    this.isRecoveryMode = false;
                    this.isSignUpMode = false;
                    this.updateAuthModalUI();
                };
            }
        } else if (this.isSignUpMode) {
            if (nameGroup) { nameGroup.style.display = 'block'; if (nameInput) nameInput.required = true; }
            if (googleBtn) googleBtn.style.display = 'flex';
            if (divider) divider.style.display = 'flex';
            if (forgotLink) forgotLink.style.display = 'none';
            if (recoveryHint) recoveryHint.style.display = 'none';
            if (title) title.textContent = dict.signup_title || 'Create Account';
            if (submitBtn) submitBtn.textContent = dict.signup_btn || 'Create Account';
            if (toggleLink) {
                toggleLink.textContent = dict.login_has_account || 'Already have an account? Sign in';
                toggleLink.onclick = (e) => this.toggleAuthMode(e);
            }
        } else {
            if (nameGroup) { nameGroup.style.display = 'none'; if (nameInput) nameInput.required = false; }
            if (googleBtn) googleBtn.style.display = 'flex';
            if (divider) divider.style.display = 'flex';
            if (forgotLink) forgotLink.style.display = 'inline-block';
            if (recoveryHint) recoveryHint.style.display = 'none';
            if (title) title.textContent = dict.login_title || 'Sign In';
            if (submitBtn) submitBtn.textContent = dict.login_btn || 'Sign In';
            if (toggleLink) {
                toggleLink.textContent = dict.login_no_account || 'No account? Sign up';
                toggleLink.onclick = (e) => this.toggleAuthMode(e);
            }
        }
    }

    async handleGoogleSignIn() {
        const errBox = document.getElementById('cyber-auth-error');
        if (errBox) errBox.style.display = 'none';

        try {
            if (typeof firebase === 'undefined' || !firebase.auth) {
                throw new Error(this.currentLang === 'fr' ? "Service d'authentification indisponible." : "Authentication service unavailable.");
            }

            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

            const result = await firebase.auth().signInWithPopup(provider);
            const fbUser = result.user;
            if (!fbUser || !fbUser.email) {
                throw new Error("No user email returned");
            }

            const email = fbUser.email.toLowerCase();
            const ADMIN_EMAILS = ['andart1174@gmail.com', 'andart1174@yahoo.com'];
            const isAdmin = ADMIN_EMAILS.includes(email);
            const displayName = fbUser.displayName || email.split('@')[0];
            const photoURL = fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff&bold=true`;

            // Check if banned in Firestore
            if (firebase.firestore) {
                try {
                    const uDoc = await firebase.firestore().collection('users').doc(email).get();
                    if (uDoc.exists && uDoc.data().banned === true) {
                        await firebase.auth().signOut();
                        if (errBox) {
                            errBox.textContent = this.currentLang === 'fr' ? "Votre compte a été banni." : "Your account has been banned.";
                            errBox.style.display = 'block';
                        }
                        return;
                    }
                } catch (e) {
                    console.warn("Ban check note:", e);
                }
            }

            // Save unified session (role: 'User' for standard users, NEVER premium)
            const sessionUser = {
                email: email,
                name: displayName,
                username: displayName,
                role: isAdmin ? 'Admin' : 'User', // Simple user
                photoURL: photoURL,
                uid: fbUser.uid,
                loginAt: Date.now()
            };

            localStorage.setItem('genius_session', JSON.stringify(sessionUser));
            localStorage.setItem('retro_arcade_user', JSON.stringify(sessionUser));
            localStorage.setItem('custom_display_name_' + email, displayName);

            // Update local users array (ia_users)
            let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
            users = users.filter(u => u.email !== email);
            users.push(sessionUser);
            localStorage.setItem('ia_users', JSON.stringify(users));

            // Sync Firestore
            if (firebase.firestore) {
                try {
                    await firebase.firestore().collection('users').doc(email).set({
                        email: email,
                        displayName: displayName,
                        name: displayName,
                        photoURL: photoURL,
                        uid: fbUser.uid,
                        role: isAdmin ? 'Admin' : 'User',
                        lastLogin: Date.now(),
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                } catch (e) {
                    console.warn("Firestore sync note:", e);
                }
            }

            this.siteUser = this.getWebsiteSession();
            this.closeAuthModal();
            this.updateAuthDisplay();

            if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
            if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');

            // Launch pending game if waiting
            if (this.pendingGameType) {
                const game = this.pendingGameType;
                this.pendingGameType = null;
                if (window.arcadeEngine) {
                    window.arcadeEngine.startGame(game);
                }
            }
        } catch (err) {
            console.error("Cyber Arcade Google Auth Error:", err);
            if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
                return;
            }
            if (errBox) {
                let msg = err.message || ((this.currentLang === 'fr') ? "Échec de la connexion avec Google." : "Google sign in failed.");
                if (err.code === 'auth/unauthorized-domain') {
                    msg = (this.currentLang === 'fr') ? "Domaine non autorisé dans Firebase Console." : "Unauthorized domain in Firebase Console.";
                }
                errBox.textContent = msg;
                errBox.style.display = 'block';
            }
        }
    }

    async handleAuthSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const emailInput = document.getElementById('cyber-auth-email');
        const passwordInput = document.getElementById('cyber-auth-password');
        const nameInput = document.getElementById('cyber-auth-name');
        const errBox = document.getElementById('cyber-auth-error');
        const submitBtn = document.getElementById('cyber-auth-submit-btn');

        const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
        const password = passwordInput ? passwordInput.value : '';
        const name = nameInput ? nameInput.value.trim() : '';

        const dict = this.translations[this.currentLang] || this.translations.en;

        if (!email || !email.includes('@')) {
            if (errBox) {
                errBox.textContent = dict.auth_err_email_req || "Please enter a valid email address.";
                errBox.style.display = 'block';
            }
            return;
        }
        if (!password || password.length < 4) {
            if (errBox) {
                errBox.textContent = dict.auth_err_pwd_req || "Password must be at least 4 characters.";
                errBox.style.display = 'block';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳...';
        }

        const ADMIN_EMAILS = ['andart1174@gmail.com', 'andart1174@yahoo.com'];
        const isAdmin = ADMIN_EMAILS.includes(email);
        let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
        const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;

        // Check if banned
        if (db) {
            try {
                const fbUserDoc = await db.collection('users').doc(email).get();
                if (fbUserDoc.exists && fbUserDoc.data().banned === true) {
                    if (errBox) {
                        errBox.textContent = this.currentLang === 'fr' ? "Votre compte a été banni." : "Your account has been banned.";
                        errBox.style.display = 'block';
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        this.updateAuthModalUI();
                    }
                    return;
                }
            } catch (err) { console.warn(err); }
        }

        if (this.isRecoveryMode) {
            let userToReset = users.find(u => u.email === email);
            if (!userToReset && db) {
                try {
                    const doc = await db.collection('users').doc(email).get();
                    if (doc.exists) userToReset = doc.data();
                } catch (e) { console.warn(e); }
            }

            if (userToReset) {
                userToReset.password = password;
                if (isAdmin && userToReset.role !== 'Admin') userToReset.role = 'Admin';

                if (db) {
                    try { await db.collection('users').doc(userToReset.email).set(userToReset, { merge: true }); } catch (e) {}
                }

                users = users.filter(u => u.email !== userToReset.email);
                users.push(userToReset);
                localStorage.setItem('ia_users', JSON.stringify(users));

                const sessionUser = {
                    email: userToReset.email,
                    name: userToReset.name || userToReset.email.split('@')[0],
                    username: userToReset.name || userToReset.email.split('@')[0],
                    role: userToReset.role || (isAdmin ? 'Admin' : 'User'),
                    loginAt: Date.now()
                };
                localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                localStorage.setItem('retro_arcade_user', JSON.stringify(sessionUser));

                this.siteUser = this.getWebsiteSession();
                this.closeAuthModal();
                this.updateAuthDisplay();

                if (this.pendingGameType) {
                    const game = this.pendingGameType;
                    this.pendingGameType = null;
                    if (window.arcadeEngine) window.arcadeEngine.startGame(game);
                }
            } else {
                if (errBox) {
                    errBox.textContent = dict.auth_err_not_found || "Account not found.";
                    errBox.style.display = 'block';
                }
            }
        } else if (this.isSignUpMode) {
            let existingUser = users.find(u => u.email === email);
            if (!existingUser && db) {
                try {
                    const doc = await db.collection('users').doc(email).get();
                    if (doc.exists) existingUser = doc.data();
                } catch (e) { console.warn(e); }
            }

            if (existingUser) {
                if (errBox) {
                    errBox.textContent = dict.auth_err_taken || "Email already registered.";
                    errBox.style.display = 'block';
                }
            } else {
                const finalName = name || email.split('@')[0];
                const newUser = {
                    email: email,
                    password: password,
                    name: finalName,
                    username: finalName,
                    role: isAdmin ? 'Admin' : 'User', // Simple user
                    createdAt: Date.now()
                };

                if (db) {
                    try { await db.collection('users').doc(newUser.email).set(newUser, { merge: true }); } catch (e) {}
                }

                users.push(newUser);
                localStorage.setItem('ia_users', JSON.stringify(users));

                const sessionUser = {
                    email: newUser.email,
                    name: newUser.name,
                    username: newUser.name,
                    role: newUser.role,
                    loginAt: Date.now()
                };
                localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                localStorage.setItem('retro_arcade_user', JSON.stringify(sessionUser));

                this.siteUser = this.getWebsiteSession();
                this.closeAuthModal();
                this.updateAuthDisplay();

                if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
                if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');

                if (this.pendingGameType) {
                    const game = this.pendingGameType;
                    this.pendingGameType = null;
                    if (window.arcadeEngine) window.arcadeEngine.startGame(game);
                }
            }
        } else {
            // Sign In Mode
            let match = users.find(u => u.email === email && u.password === password);
            if (!match && db) {
                try {
                    const doc = await db.collection('users').doc(email).get();
                    if (doc.exists) {
                        const fbUser = doc.data();
                        if (fbUser.password === password) {
                            match = fbUser;
                            users.push(fbUser);
                            localStorage.setItem('ia_users', JSON.stringify(users));
                        }
                    }
                } catch (e) { console.warn(e); }
            }

            if (match) {
                const sessionUser = {
                    email: match.email,
                    name: match.name || match.email.split('@')[0],
                    username: match.name || match.email.split('@')[0],
                    role: match.role || (isAdmin ? 'Admin' : 'User'),
                    loginAt: Date.now()
                };
                localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                localStorage.setItem('retro_arcade_user', JSON.stringify(sessionUser));

                this.siteUser = this.getWebsiteSession();
                this.closeAuthModal();
                this.updateAuthDisplay();

                if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
                if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');

                if (this.pendingGameType) {
                    const game = this.pendingGameType;
                    this.pendingGameType = null;
                    if (window.arcadeEngine) window.arcadeEngine.startGame(game);
                }
            } else {
                if (errBox) {
                    errBox.textContent = dict.auth_err_invalid || "Incorrect email or password.";
                    errBox.style.display = 'block';
                }
            }
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            this.updateAuthModalUI();
        }
    }

    async handleLogout() {
        localStorage.removeItem('genius_session');
        localStorage.removeItem('retro_arcade_user');
        this.siteUser = null;
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try { await firebase.auth().signOut(); } catch (e) {}
        }
        this.updateAuthDisplay();
    }

    initSiteAuthModal() {
        const btnPilot = document.getElementById('btn-pilot-profile');
        const modalAuth = document.getElementById('modal-site-auth-required');
        const btnCloseAuth = document.getElementById('btn-close-auth');

        if (btnPilot && modalAuth) {
            btnPilot.addEventListener('click', () => {
                if (!this.siteUser) this.openAuthModal();
            });
        }
        if (btnCloseAuth && modalAuth) {
            btnCloseAuth.addEventListener('click', () => this.closeAuthModal());
        }

        if (modalAuth) {
            modalAuth.addEventListener('click', (e) => {
                if (e.target === modalAuth) this.closeAuthModal();
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
                    this.openAuthModal(gameType);
                    return;
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

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        this.updateAuthDisplay();
        this.updateAuthModalUI();
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
window.arcadeLeaderboard = window.cyberLeaderboard;
