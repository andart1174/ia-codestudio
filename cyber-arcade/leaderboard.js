/**
 * ══════════════════════════════════════════════════════════════════════
 * 🏆 CYBER ARCADE 3D ARENA — MASTER LEADERBOARD, SHOP & UNIFIED SSO (V16)
 * ══════════════════════════════════════════════════════════════════════
 * - 🎁 2,500 Starter Coins Bonus for Instant Testing!
 * - 🏪 Cyber Hangar & Shop (Instant Buy, Equip, Audio & Visual Feedback)
 * - 🔒 Unified Website SSO: Uses IA Code Studio 'genius_session'
 * - ⚡ 100% Free Access for All Registered Website Members
 * - 📖 Interactive Game Rules & Pilot Guide (EN / FR)
 * ══════════════════════════════════════════════════════════════════════
 */

class CyberLeaderboard {
    constructor() {
        this.currentLang = localStorage.getItem('cyber_lang') || 'en';
        
        // 2,500 Free Coins for Testing & Unlocking Everything
        let storedCoins = parseInt(localStorage.getItem('cyber_coins') || '2500', 10);
        if (storedCoins < 2500) storedCoins = 2500;
        this.coins = storedCoins;
        localStorage.setItem('cyber_coins', this.coins.toString());

        this.siteUser = this.getWebsiteSession();
        this.highScores = JSON.parse(localStorage.getItem('cyber_highscores') || '{}');
        this.inventory = JSON.parse(localStorage.getItem('cyber_inventory') || '{"crafts":["apex"],"lasers":["#00f2fe"],"upgrades":[],"titles":["Cadet Pilot"],"avatar":"🧑‍🚀"}');
        this.equippedCraft = localStorage.getItem('cyber_equipped_craft') || 'apex';
        this.equippedLaser = localStorage.getItem('cyber_equipped_laser') || '#00f2fe';
        
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
                upg_shield_desc: "Increases total shield hull health by 50% for maximum durability.",
                upg_missiles_desc: "Start every battle with 8 lock-on homing missiles instead of 4.",
                upg_nitro_desc: "Turbo Boost & Nitro gates recharge twice as fast in Cyber Racer & Space."
            },
            fr: {
                brand_title: "CYBER ARCADE 3D",
                brand_sub: "PAR IA CODE STUDIO",
                nav_rules: "RÈGLES & CONTRÔLES 📖",
                nav_shop: "HANGAR & MAGASIN 🏪",
                nav_rewards: "PIÈCES GRATUITES 🎁",
                hub_title: "ARÈNE DE 9 JEUX ÉPIQUES 3D & <span class='neon-text'>RÉALITÉ AUGMENTÉE</span>",
                hub_subtitle: "Pilotez des bolides cybernétiques, contrôlez des robots titans géants, tranchez les rythmes musicaux, surfez l'espace et combattez les aliens en RA ! 100% Gratuit pour tous les membres enregistrés !",
                stat_high_score: "Record Personnel",
                stat_rank: "Rang Mondial",
                stat_ship: "Vaisseau Actif",
                btn_hangar: "Hangar & Armes 🚀",
                btn_leaderboard: "Classement 🏆",
                btn_play_now: "JOUER 🚀",
                btn_play_ar: "LANCER RÉALITÉ AR 📱",
                btn_play_racer: "LANCER COURSE 🏎️",
                btn_play_mech: "LANCER TITAN MECH 🤖",
                btn_play_beatslicer: "JOUER AU RYTHME 🎵",
                btn_play_surf: "SURFER L'ESPACE 🏄",
                ar_desc: "Allumez la caméra de votre téléphone ! Des soucoupes aliens 3D flottent dans votre salon. Tournez à 360° pour viser, enregistrez des clips TikTok de 10s ou posez votre vaisseau sur votre table !",
                racer_desc: "Pilotez des bolides à sustentation sur des autoroutes célestes ! Driftez dans les virages néon, activez le Nitro Boost et dépassez vos rivaux !",
                mech_desc: "Contrôlez un Mecha de guerre de 30 mètres ! Tirez avec les doubles Gatlings, lancez des salves de missiles et tranchez les robots ennemis avec votre lame laser !",
                beatslicer_desc: "Tranchez des cubes musicaux néon en 3D avec vos doubles sabres laser cyan et magenta au rythme de musiques Synthwave !",
                surf_desc: "Surfez sur des vagues de lumière stellaire sur un hoverboard de plasma ! Réalisez des saltos 360° et glissez sur les rails d'énergie cosmique !",
                city_desc: "Volez à toute vitesse entre les gratte-ciels néon, le trafic aérien et les ponts suspendus ! Détruisez les vaisseaux d'assaut aliens !",
                blaster_desc: "Abattez des escadrons d'aliens, des dreadnoughts lourds et des astéroïdes ! 3 vies, bouclier auto-régénérant, missiles à guidage et Méga-Rayon !",
                slalom_desc: "Foncez à vitesse supraluminique dans un tunnel néon tout en esquivant et détruisant les drones aliens patrouillant les portes quantiques !",
                blackhole_desc: "Des chasseurs aliens tentent de vous aspirer dans la singularité. Forcez le blocus, récoltez l'énergie et échappez-vous !",
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

    getWebsiteSession() {
        const geniusSession = localStorage.getItem('genius_session');
        if (geniusSession) {
            try {
                const user = JSON.parse(geniusSession);
                if (user && (user.email || user.name)) {
                    return {
                        name: user.name || (user.email ? user.email.split('@')[0] : 'Pilot'),
                        email: user.email || '',
                        role: user.role || 'Member',
                        isSiteUser: true
                    };
                }
            } catch (e) {}
        }
        return null;
    }

    init() {
        this.updateCoinDisplay();
        this.updateAuthDisplay();
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
    }

    updateAuthDisplay() {
        const display = document.getElementById('pilot-username-display');
        const dot = document.getElementById('auth-status-dot');

        if (this.siteUser && this.siteUser.isSiteUser) {
            if (display) display.textContent = `Pilot: ${this.siteUser.name}`;
            if (dot) dot.classList.add('online');
        } else {
            if (display) display.textContent = (this.currentLang === 'fr') ? 'Connexion Requise 🔒' : 'Site Login Required 🔒';
            if (dot) dot.classList.remove('online');
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

        // Laser Color Palette Selection
        const laserChips = document.querySelectorAll('.laser-chip-card');
        laserChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const color = chip.getAttribute('data-laser-color');
                const cost = parseInt(chip.getAttribute('data-cost') || '0', 10);

                if (cost > 0 && !this.inventory.lasers.includes(color)) {
                    if (this.coins >= cost) {
                        this.addCoins(-cost);
                        this.inventory.lasers.push(color);
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                        if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 60 });
                    } else {
                        const needed = cost - this.coins;
                        alert((this.currentLang === 'fr') 
                            ? `Il vous manque ${needed} pièces pour débloquer ce laser !` 
                            : `You need ${needed} more coins to unlock this laser!`);
                        return;
                    }
                }

                laserChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.equippedLaser = color;
                localStorage.setItem('cyber_equipped_laser', color);

                if (window.arcadeEngine) {
                    window.arcadeEngine.laserColor = (color === 'rainbow') ? '#00f2fe' : color;
                    window.arcadeEngine.playSFX('crystal');
                }
            });
        });

        // Craft & Upgrade Purchases
        const buyBtns = document.querySelectorAll('[data-buy-item]');
        buyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.getAttribute('data-buy-item');
                const cost = parseInt(btn.getAttribute('data-cost') || '0', 10);

                const isCraft = ['apex', 'hyperion', 'phoenix_mech', 'solar_dragon', 'lightning_board'].includes(itemId);
                const isOwned = isCraft 
                    ? (this.inventory.crafts.includes(itemId) || itemId === 'apex')
                    : (this.inventory.upgrades.includes(itemId));

                if (!isOwned && cost > 0) {
                    if (this.coins >= cost) {
                        this.addCoins(-cost);
                        if (isCraft) {
                            this.inventory.crafts.push(itemId);
                        } else {
                            this.inventory.upgrades.push(itemId);
                        }
                        localStorage.setItem('cyber_inventory', JSON.stringify(this.inventory));
                        if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 75 });
                        if (window.arcadeEngine) window.arcadeEngine.playSFX('powerup');
                    } else {
                        const needed = cost - this.coins;
                        alert((this.currentLang === 'fr') 
                            ? `Il vous manque ${needed} pièces pour débloquer cet élément !` 
                            : `You need ${needed} more coins to unlock this item!`);
                        return;
                    }
                }

                // Equip Craft
                if (isCraft && (this.inventory.crafts.includes(itemId) || itemId === 'apex')) {
                    this.equippedCraft = itemId;
                    localStorage.setItem('cyber_equipped_craft', itemId);
                    
                    const cardTitle = btn.closest('.shop-item-card') ? btn.closest('.shop-item-card').querySelector('h4').textContent : itemId;
                    const shipNameEl = document.getElementById('hub-active-ship-name');
                    if (shipNameEl) shipNameEl.textContent = cardTitle;

                    if (window.arcadeEngine) window.arcadeEngine.playSFX('respawn');
                }

                this.updateShopUI();
            });
        });

        // Mystery Crate Opener
        const btnOpenCrate = document.getElementById('btn-open-mystery-crate');
        const crateBox = document.getElementById('crate-3d-box');
        const crateResult = document.getElementById('crate-result-display');
        const crateResIcon = document.getElementById('crate-res-icon');
        const crateResTitle = document.getElementById('crate-res-title');

        if (btnOpenCrate) {
            btnOpenCrate.addEventListener('click', () => {
                if (this.coins < 150) {
                    const needed = 150 - this.coins;
                    alert((this.currentLang === 'fr') 
                        ? `Il vous manque ${needed} pièces pour ouvrir la Caisse Mystère !` 
                        : `You need ${needed} more coins to open the Mystery Crate!`);
                    return;
                }

                this.addCoins(-150);
                if (window.arcadeEngine) window.arcadeEngine.playSFX('nitro');

                if (crateBox) {
                    crateBox.style.transform = 'scale(1.3) rotate(360deg)';
                    setTimeout(() => { crateBox.style.transform = 'scale(1)'; }, 500);
                }

                setTimeout(() => {
                    const prizes = [
                        { type: 'coins', amount: 500, icon: '🪙', titleEn: 'JACKPOT: YOU WON 500 COINS! 🪙', titleFr: 'JACKPOT : VOUS GAGNEZ 500 PIÈCES ! 🪙' },
                        { type: 'coins', amount: 250, icon: '✨', titleEn: 'YOU WON 250 BONUS COINS! ✨', titleFr: 'VOUS GAGNEZ 250 PIÈCES BONUS ! ✨' },
                        { type: 'coins', amount: 1000, icon: '👑', titleEn: 'MEGA JACKPOT: 1,000 COINS! 👑', titleFr: 'MÉGA JACKPOT : 1 000 PIÈCES ! 👑' }
                    ];

                    const prize = prizes[Math.floor(Math.random() * prizes.length)];
                    this.addCoins(prize.amount);

                    if (crateResult && crateResIcon && crateResTitle) {
                        crateResIcon.textContent = prize.icon;
                        crateResTitle.textContent = (this.currentLang === 'fr') ? prize.titleFr : prize.titleEn;
                        crateResult.style.display = 'block';
                    }

                    if (typeof confetti === 'function') confetti({ particleCount: 160, spread: 90 });
                    if (window.arcadeEngine) window.arcadeEngine.playSFX('combo');
                }, 600);
            });
        }
    }

    updateShopUI() {
        const coinEl = document.getElementById('shop-coin-balance');
        if (coinEl) coinEl.textContent = this.coins;

        // Update Craft item cards
        document.querySelectorAll('.shop-item-card[data-category="craft"]').forEach(card => {
            const id = card.getAttribute('data-item-id');
            const btn = card.querySelector('.btn-shop-action');
            if (!btn) return;

            const isOwned = this.inventory.crafts.includes(id) || id === 'apex';
            const isEquipped = (this.equippedCraft === id);

            if (isEquipped) {
                card.classList.add('active');
                btn.className = 'btn-shop-action equipped';
                btn.innerHTML = '<i class="fa-solid fa-check"></i> ' + ((this.currentLang === 'fr') ? 'ÉQUIPÉ' : 'EQUIPPED');
            } else if (isOwned) {
                card.classList.remove('active');
                btn.className = 'btn-shop-action equip';
                btn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> ' + ((this.currentLang === 'fr') ? 'ÉQUIPER' : 'EQUIP');
            } else {
                card.classList.remove('active');
                btn.className = 'btn-shop-action unlock';
                const cost = btn.getAttribute('data-cost') || '250';
                btn.innerHTML = `<span>${(this.currentLang === 'fr' ? 'DÉBLOQUER' : 'UNLOCK')} (${cost} 🪙)</span>`;
            }
        });
    }

    initBountyModal() {
        const btnOpenBounty = document.getElementById('btn-open-bounty');
        const modalBounty = document.getElementById('modal-viral-bounty');
        const btnCloseBounty = document.getElementById('btn-close-bounty');
        const btnCopyLink = document.getElementById('btn-copy-bounty-link');
        const btnShareWA = document.getElementById('btn-bounty-share-wa');

        if (btnOpenBounty && modalBounty) {
            btnOpenBounty.addEventListener('click', () => {
                const pilotName = this.siteUser ? this.siteUser.name : 'Pilot';
                const inputUrl = document.getElementById('bounty-referral-url');
                if (inputUrl) inputUrl.value = `https://ia-codestudio.com/cyber-arcade/?ref=${encodeURIComponent(pilotName)}`;
                modalBounty.classList.add('active');
            });
        }
        if (btnCloseBounty && modalBounty) {
            btnCloseBounty.addEventListener('click', () => modalBounty.classList.remove('active'));
        }

        if (btnCopyLink) {
            btnCopyLink.addEventListener('click', () => {
                const inputUrl = document.getElementById('bounty-referral-url');
                if (inputUrl) {
                    inputUrl.select();
                    navigator.clipboard.writeText(inputUrl.value);
                    btnCopyLink.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    setTimeout(() => { btnCopyLink.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Link'; }, 2000);
                }
            });
        }

        if (btnShareWA) {
            btnShareWA.addEventListener('click', () => {
                const pilotName = this.siteUser ? this.siteUser.name : 'Pilot';
                const msg = encodeURIComponent(`🚀 Play 9 epic 3D & AR games with me on Cyber Arcade! Free coins bonus: https://ia-codestudio.com/cyber-arcade/?ref=${pilotName}`);
                window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
                this.addCoins(100);
            });
        }
    }

    initCategoryTabs() {
        const tabs = document.querySelectorAll('.category-tab');
        const cards = document.querySelectorAll('.games-grid .game-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

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
        this.coins += amount;
        localStorage.setItem('cyber_coins', this.coins.toString());
        this.updateCoinDisplay();
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
