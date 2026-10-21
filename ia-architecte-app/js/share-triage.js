(function() {
  'use strict';

  // Helper to copy text to clipboard with robust textarea fallback
  function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((resolve, reject) => {
        if (document.execCommand('copy')) {
          resolve();
        } else {
          reject(new Error("execCommand failed"));
        }
        textArea.remove();
      });
    }
  }

  // Dynamic language translation for modals
  function translateShareModals() {
    const activeLang = window.lang || 'en';
    const elements = document.querySelectorAll('#modal-publish-feed [data-en], #modal-share-triage [data-en], #modal-share-post [data-en], #modal-github-token [data-en], #btn-publish-feed [data-en]');
    elements.forEach(el => {
      const text = activeLang === 'fr' ? el.getAttribute('data-fr') : el.getAttribute('data-en');
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    });
  }

  if (typeof window.applyLang === 'function') {
    const originalApplyLang = window.applyLang;
    window.applyLang = function() {
      originalApplyLang();
      translateShareModals();
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    translateShareModals();

    const btnShareTrigger = document.getElementById('btn-publish-feed');
    const modalShare = document.getElementById('modal-share-post');
    const modalGist = document.getElementById('modal-github-token');

    function executeDirectShare() {
      // 1. Premium Lock check
      if (typeof window.isUserPremium === 'function' && !window.isUserPremium()) {
        if (typeof window.showPaywallModal === 'function') {
          window.showPaywallModal();
        } else {
          alert(window.lang === 'fr' ? "🔒 Option Premium requise !" : "🔒 Premium option required!");
        }
        return;
      }

      // 2. Validate code is not empty
      const rawCode = window.editor ? window.editor.getValue() : '';
      if (!rawCode.trim()) {
        alert(window.lang === 'fr' ? "Le code est vide ! Veuillez d'abord générer un projet." : "Code is empty! Please generate a project first.");
        return;
      }

      const session = localStorage.getItem('genius_session');
      let sessionUser = {};
      let nickname = "Creator";
      if (session) {
        try {
          sessionUser = JSON.parse(session);
          nickname = sessionUser.name || nickname;
        } catch (e) {}
      }

      const sanitizedCode = typeof window.sanitizeStandalone === 'function' ? window.sanitizeStandalone(rawCode) : rawCode;
      const postId = Date.now();
      const post = {
        id: postId,
        user: nickname,
        userEmail: sessionUser.email || "anonymous@example.com",
        userAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname)}`,
        userTag: sessionUser.role === 'Admin' ? 'ADMIN Maker' : 'Creator',
        caption_en: "Interactive 3D WebGL Scene",
        caption_fr: "Scène 3D WebGL Interactive",
        likes: 0,
        comments: [],
        preset: "custom",
        hasThree: true,
        code: sanitizedCode,
        createdAt: postId,
        unlisted: true
      };

      const baseOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? window.location.origin : 'https://ia-codestudio.com';
      const shareUrl = `${baseOrigin}/preview.html?id=${postId}`;
      const embedCode = `<iframe src="${shareUrl}" width="100%" height="450" style="border:none; border-radius:12px; box-shadow: 0 4px 30px rgba(0,0,0,0.35);"></iframe>`;

      if (document.getElementById('share-link-input')) {
        document.getElementById('share-link-input').value = shareUrl;
      }
      if (document.getElementById('embed-code-input')) {
        document.getElementById('embed-code-input').value = embedCode;
      }

      const currentLang = window.lang || 'en';
      const shareCaption = currentLang === 'fr' ? "Découvrez cette création 3D interactive !" : "Check out this interactive 3D WebGL creation!";
      const tweetText = currentLang === 'fr'
        ? `Regardez cette création 3D interactive codée sur IA Code Studio !`
        : `Check out this interactive 3D WebGL project on IA Code Studio!`;

      const twBtn = document.getElementById('share-twitter-btn');
      if (twBtn) twBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;

      const rdBtn = document.getElementById('share-reddit-btn');
      if (rdBtn) rdBtn.href = `https://reddit.com/submit?title=${encodeURIComponent(shareCaption)}&url=${encodeURIComponent(shareUrl)}`;

      const fbBtn = document.getElementById('share-facebook-btn');
      if (fbBtn) fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

      const waBtn = document.getElementById('share-whatsapp-btn');
      if (waBtn) waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(tweetText + ' ' + shareUrl)}`;

      const liBtn = document.getElementById('share-linkedin-btn');
      if (liBtn) liBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

      if (window.DevSocialDB && typeof window.DevSocialDB.savePost === 'function') {
        window.DevSocialDB.savePost(post).catch(() => {});
      }

      copyTextToClipboard(shareUrl).then(() => {
        if (window.showToast) {
          window.showToast(currentLang === 'fr' ? "🔗 Lien copié dans le presse-papier !" : "🔗 Link copied to clipboard!");
        }
      }).catch(() => {
        if (window.showToast) {
          window.showToast(currentLang === 'fr' ? "🔗 Lien de partage prêt !" : "🔗 Share link ready!");
        }
      });

      if (modalShare) modalShare.style.display = 'flex';
    }

    if (btnShareTrigger) {
      btnShareTrigger.addEventListener('click', executeDirectShare);
    }

    const closeShare = document.getElementById('btn-close-share');
    if (closeShare) closeShare.addEventListener('click', () => modalShare.style.display = 'none');

    const closeGist = document.getElementById('btn-close-gist-modal');
    const cancelGist = document.getElementById('btn-cancel-gist-modal');
    if (closeGist) closeGist.addEventListener('click', () => modalGist.style.display = 'none');
    if (cancelGist) cancelGist.addEventListener('click', () => modalGist.style.display = 'none');

    if (modalShare) {
      modalShare.addEventListener('click', (e) => {
        if (e.target === modalShare) modalShare.style.display = 'none';
      });
    }

    // Copy Link button click
    const btnCopyLink = document.getElementById('btn-copy-share-link');
    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', () => {
        const input = document.getElementById('share-link-input');
        copyTextToClipboard(input.value).then(() => {
          const origHTML = btnCopyLink.innerHTML;
          const currentLang = window.lang || 'en';
          btnCopyLink.innerHTML = `<i class="fa-solid fa-check"></i> ` + (currentLang === 'fr' ? 'Copié !' : 'Copied!');
          setTimeout(() => { btnCopyLink.innerHTML = origHTML; }, 2000);
        }).catch(err => {
          console.error("Failed to copy link:", err);
        });
      });
    }

    // Copy Embed Code button click
    const btnCopyEmbed = document.getElementById('btn-copy-embed-code');
    if (btnCopyEmbed) {
      btnCopyEmbed.addEventListener('click', () => {
        const input = document.getElementById('embed-code-input');
        copyTextToClipboard(input.value).then(() => {
          const origHTML = btnCopyEmbed.innerHTML;
          const currentLang = window.lang || 'en';
          btnCopyEmbed.innerHTML = `<i class="fa-solid fa-check"></i> ` + (currentLang === 'fr' ? 'Copié !' : 'Copied!');
          setTimeout(() => { btnCopyEmbed.innerHTML = origHTML; }, 2000);
        }).catch(err => {
          console.error("Failed to copy embed code:", err);
        });
      });
    }
  });

})();
