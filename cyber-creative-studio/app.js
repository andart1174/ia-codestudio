/**
 * ⚡ CYBER CREATIVE STUDIO — MASTER APPLICATION CONTROLLER
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Bilingual Support
    window.I18N.applyTranslations();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            window.I18N.setLang(lang);
        });
    });

    // 2. Initialize Module Tab Switcher (strictly restrict to header module navigation)
    const tabs = document.querySelectorAll('.app-header .tab-btn[data-tab]');
    const sections = document.querySelectorAll('.module-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetModule = tab.getAttribute('data-tab');
            if (!targetModule) return;
            const targetEl = document.getElementById('module-' + targetModule);
            if (!targetEl) return;

            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            targetEl.classList.add('active');

            if (targetModule === 'intro' && window.introEngine) {
                window.introEngine.onResize();
            }
        });
    });

    // 3. Initialize Engines
    window.introEngine = new window.IntroCreator();
    window.beatEngine = new window.BeatMaker();

    // 🎬 4. MASTER FEATURE 8: 1-CLICK AI MOVIE TRAILER GENERATOR
    const btnMasterTrailer = document.getElementById('btn-master-ai-trailer');
    if (btnMasterTrailer) {
        btnMasterTrailer.addEventListener('click', () => {
            trigger1ClickAITrailer();
        });
    }

    function trigger1ClickAITrailer() {
        const isFrench = (window.I18N && window.I18N.currentLang === 'fr');

        // A. Switch to 3D Intro Tab
        const introTab = document.querySelector('.app-header .tab-btn[data-tab="intro"]');
        if (introTab) introTab.click();

        // B. Setup Beat Studio with an Epic Cinematic Soundtrack
        if (window.beatEngine) {
            window.beatEngine.initAudioContext();
            const genreSelect = document.getElementById('beat-select-genre');
            if (genreSelect) {
                genreSelect.value = 'cinematic';
                window.beatEngine.changeGenre('cinematic');
            }
            // Generate full radio-ready hit song progression
            window.beatEngine.generateCompleteHitSong();
            // Start playback
            if (!window.beatEngine.isPlaying) {
                window.beatEngine.play();
            }
        }

        // C. Configure 3D Arena for Blockbuster Movie Trailer
        if (window.introEngine) {
            // Choose Titan Prime Ultra
            window.introEngine.setRobotHostMode('titan_prime');
            const selectHost = document.getElementById('robot-select-host');
            if (selectHost) selectHost.value = 'titan_prime';

            // Set Movie Trailer Director Cuts camera mode
            window.introEngine.setCameraDirectorMode('trailer');
            const selectAnim = document.getElementById('intro-select-anim');
            if (selectAnim) selectAnim.value = 'trailer';

            // Set Cataclysm to Solar Flare EMP Shockwave
            window.introEngine.setCataclysm('solarflare');
            const selectCataclysm = document.getElementById('intro-select-cataclysm');
            if (selectCataclysm) selectCataclysm.value = 'solarflare';

            // Set preset to Cyberpunk 2077
            const selectPreset = document.getElementById('intro-select-preset');
            if (selectPreset) {
                selectPreset.value = 'cyberpunk';
                window.introEngine.setPreset('cyberpunk');
            }

            // Script speech for intro
            const script = isFrench 
                ? "Alerte maximale ! Séquence de lancement interstellaire amorcée. Cyber Creative Studio propulse votre vision dans une nouvelle dimension !"
                : "Maximum alert! Interstellar launch sequence engaged. Cyber Creative Studio powers your cinematic vision into the future!";
            
            const textarea = document.getElementById('robot-input-script');
            if (textarea) textarea.value = script;
            window.introEngine.robotScript = script;

            // Trigger robot speech
            setTimeout(() => {
                if (window.introEngine.speakRobotScript) {
                    window.introEngine.speakRobotScript();
                }
            }, 600);

            // Highlight Export Video button with pulse glow
            const exportBtn = document.getElementById('btn-intro-export');
            if (exportBtn) {
                exportBtn.style.animation = 'pulseFusion 1.5s infinite alternate';
                setTimeout(() => {
                    if (exportBtn) exportBtn.style.animation = '';
                }, 8000);
            }

            if (window.introEngine.showToast) {
                window.introEngine.showToast(window.I18N.t('msg_generating_trailer'));
            }
        }
    }

    console.log('⚡ Cyber Creative Studio fully initialized!');
});
