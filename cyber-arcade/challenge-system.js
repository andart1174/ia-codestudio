/**
 * ══════════════════════════════════════════════════════════════════════
 * 🔥 CYBER ARCADE 3D — VIRAL CHALLENGE & SOCIAL ENGINE (EN / FR)
 * ══════════════════════════════════════════════════════════════════════
 */

class CyberChallengeSystem {
    constructor() {
        this.currentChallenge = null;
        this.lastGameResult = null;
        this.init();
    }

    init() {
        this.parseURLParams();
        this.initEventBindings();
    }

    parseURLParams() {
        const params = new URLSearchParams(window.location.search);
        const challengeScore = parseInt(params.get('challenge'), 10);
        const challenger = params.get('challenger') || 'Cyber Pilot';
        const game = params.get('game') || 'blaster';

        if (!isNaN(challengeScore) && challengeScore > 0) {
            this.currentChallenge = {
                score: challengeScore,
                challenger: challenger,
                game: game
            };

            const heroBanner = document.getElementById('hero-challenge-banner');
            const title = document.getElementById('banner-challenger-title');
            const targetScore = document.getElementById('banner-target-score');
            const headerPill = document.getElementById('header-rival-badge');
            const pillText = document.getElementById('rival-pill-text');

            if (heroBanner) heroBanner.style.display = 'block';
            if (title) title.textContent = `⚔️ ${challenger.toUpperCase()} HAS CHALLENGED YOU!`;
            if (targetScore) targetScore.textContent = `${challengeScore.toLocaleString()} Points`;
            
            if (headerPill) headerPill.style.display = 'flex';
            if (pillText) pillText.innerHTML = `⚔️ Challenge from <strong>${challenger}</strong>: <strong>${challengeScore.toLocaleString()} pts</strong>`;

            const btnAccept = document.getElementById('btn-accept-hero-challenge');
            if (btnAccept) {
                btnAccept.addEventListener('click', () => {
                    if (window.arcadeEngine) {
                        window.arcadeEngine.startGame(game, challengeScore, challenger);
                    }
                });
            }
        }
    }

    initEventBindings() {
        document.querySelectorAll('[data-start-game]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameType = e.currentTarget.getAttribute('data-start-game');
                const rivalTarget = this.currentChallenge ? this.currentChallenge.score : 0;
                const rivalName = this.currentChallenge ? this.currentChallenge.challenger : '';
                if (window.arcadeEngine) {
                    window.arcadeEngine.startGame(gameType, rivalTarget, rivalName);
                }
            });
        });

        const nameInput = document.getElementById('challenger-name-input');
        if (nameInput) {
            nameInput.addEventListener('input', () => this.updateShareURL());
        }

        const btnCopy = document.getElementById('btn-copy-challenge-link');
        if (btnCopy) {
            btnCopy.addEventListener('click', () => this.copyChallengeLink());
        }

        const btnWhatsapp = document.getElementById('btn-share-whatsapp');
        if (btnWhatsapp) btnWhatsapp.addEventListener('click', () => this.shareSocial('whatsapp'));

        const btnTiktok = document.getElementById('btn-share-tiktok');
        if (btnTiktok) btnTiktok.addEventListener('click', () => this.shareSocial('tiktok'));

        const btnTelegram = document.getElementById('btn-share-telegram');
        if (btnTelegram) btnTelegram.addEventListener('click', () => this.shareSocial('telegram'));

        const btnDiscord = document.getElementById('btn-share-discord');
        if (btnDiscord) btnDiscord.addEventListener('click', () => this.shareSocial('discord'));

        const btnTwitter = document.getElementById('btn-share-twitter');
        if (btnTwitter) btnTwitter.addEventListener('click', () => this.shareSocial('twitter'));

        const btnFacebook = document.getElementById('btn-share-facebook');
        if (btnFacebook) btnFacebook.addEventListener('click', () => this.shareSocial('facebook'));

        const btnReplay = document.getElementById('btn-modal-replay');
        if (btnReplay) {
            btnReplay.addEventListener('click', () => {
                this.closeGameOverModal();
                if (window.arcadeEngine && this.lastGameResult) {
                    window.arcadeEngine.startGame(this.lastGameResult.game, this.lastGameResult.targetRivalScore, this.lastGameResult.rivalName);
                }
            });
        }

        const btnBackHub = document.getElementById('btn-modal-back-hub');
        if (btnBackHub) {
            btnBackHub.addEventListener('click', () => {
                this.closeGameOverModal();
                if (window.arcadeEngine) window.arcadeEngine.exitToHub();
            });
        }
    }

    showGameOverModal(result) {
        this.lastGameResult = result;
        const modal = document.getElementById('modal-game-over');
        if (!modal) return;

        const isFr = (localStorage.getItem('cyber_lang') === 'fr');

        const finalScoreEl = document.getElementById('modal-final-score-val');
        if (finalScoreEl) finalScoreEl.textContent = result.score.toLocaleString();

        const crystalsEl = document.getElementById('modal-final-crystals-val');
        if (crystalsEl) crystalsEl.textContent = `💎 ${result.crystals}`;

        const coinsEl = document.getElementById('modal-final-coins-val');
        if (coinsEl) coinsEl.textContent = `🪙 +${result.coinsEarned}`;

        const rivalBox = document.getElementById('rival-result-box');
        const rivalTitle = document.getElementById('rival-result-title');
        const rivalSub = document.getElementById('rival-result-sub');

        if (rivalBox && result.targetRivalScore > 0) {
            rivalBox.style.display = 'flex';
            if (result.rivalBeaten) {
                rivalTitle.textContent = isFr 
                    ? `🎉 VOUS AVEZ BATTU ${result.rivalName.toUpperCase()} !` 
                    : `🎉 YOU DEFEATED ${result.rivalName.toUpperCase()}!`;
                rivalSub.innerHTML = isFr 
                    ? `Vous avez dépassé ${result.targetRivalScore.toLocaleString()} pts et gagné <strong>+50 Coins BONUS</strong> ! 🪙`
                    : `You beat ${result.targetRivalScore.toLocaleString()} pts and earned <strong>+50 BONUS COINS</strong>! 🪙`;
            } else {
                const diff = result.targetRivalScore - result.score;
                rivalTitle.textContent = isFr 
                    ? `⚔️ PLUS QUE ${diff.toLocaleString()} POINTS !` 
                    : `⚔️ ONLY ${diff.toLocaleString()} PTS AWAY!`;
                rivalSub.textContent = isFr
                    ? `Le score de ${result.rivalName} était de ${result.targetRivalScore.toLocaleString()} pts. Réessayez !`
                    : `${result.rivalName}'s score was ${result.targetRivalScore.toLocaleString()} pts. Try again!`;
            }
        } else if (rivalBox) {
            rivalBox.style.display = 'none';
        }

        this.updateShareURL();
        modal.classList.add('active');
    }

    closeGameOverModal() {
        const modal = document.getElementById('modal-game-over');
        if (modal) modal.classList.remove('active');
    }

    updateShareURL() {
        if (!this.lastGameResult) return;
        const nameInput = document.getElementById('challenger-name-input');
        const playerName = nameInput ? encodeURIComponent(nameInput.value.trim() || 'CyberPilot') : 'CyberPilot';
        const score = this.lastGameResult.score;
        const game = this.lastGameResult.game;

        const baseURL = window.location.origin + window.location.pathname;
        const shareURL = `${baseURL}?challenge=${score}&challenger=${playerName}&game=${game}`;

        const urlInput = document.getElementById('challenge-share-url');
        if (urlInput) urlInput.value = shareURL;

        return shareURL;
    }

    copyChallengeLink() {
        const urlInput = document.getElementById('challenge-share-url');
        if (!urlInput) return;

        urlInput.select();
        urlInput.setSelectionRange(0, 99999);

        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlInput.value);
        } else {
            document.execCommand('copy');
        }

        const isFr = (localStorage.getItem('cyber_lang') === 'fr');
        const btnCopy = document.getElementById('btn-copy-challenge-link');
        if (btnCopy) {
            const originalText = btnCopy.innerHTML;
            btnCopy.innerHTML = isFr ? '<i class="fa-solid fa-check"></i> Copié !' : '<i class="fa-solid fa-check"></i> Copied!';
            btnCopy.style.background = '#00ffcc';
            setTimeout(() => {
                btnCopy.innerHTML = originalText;
                btnCopy.style.background = '';
            }, 2000);
        }
    }

    shareSocial(platform) {
        const shareURL = this.updateShareURL();
        const score = this.lastGameResult ? this.lastGameResult.score.toLocaleString() : '15,000';
        const isFr = (localStorage.getItem('cyber_lang') === 'fr');

        const message = isFr 
            ? `⚔️ J'ai obtenu ${score} points dans Cyber Arcade 3D ! Je te défie de me battre :` 
            : `⚔️ I scored ${score} points in Cyber Arcade 3D! I dare you to beat me:`;

        const encodedMsg = encodeURIComponent(message);
        const encodedUrl = encodeURIComponent(shareURL);

        if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${encodedMsg}%20${encodedUrl}`, '_blank');
        } else if (platform === 'telegram') {
            window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedMsg}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedUrl}&hashtags=CyberArcade3D,ThreeJS,Gaming`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        } else if (platform === 'discord' || platform === 'tiktok') {
            this.copyChallengeLink();
            alert(isFr 
                ? `Lien de défi copié dans le presse-papiers ! Collez-le sur ${platform.toUpperCase()} !`
                : `Challenge link copied to clipboard! Paste it on ${platform.toUpperCase()}!`);
        }
    }
}

// Global instance
window.cyberChallengeSystem = new CyberChallengeSystem();
