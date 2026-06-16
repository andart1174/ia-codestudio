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

  // Wire up the language hook to trigger translations on lang toggles
  if (typeof window.applyLang === 'function') {
    const originalApplyLang = window.applyLang;
    window.applyLang = function() {
      originalApplyLang();
      translateShareModals();
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Translate modals on page load
    translateShareModals();

    const btnShareTrigger = document.getElementById('btn-publish-feed');
    const modalTriage = document.getElementById('modal-share-triage');
    const modalPublish = document.getElementById('modal-publish-feed');
    const modalShare = document.getElementById('modal-share-post');
    const modalGist = document.getElementById('modal-github-token');

    if (btnShareTrigger) {
      btnShareTrigger.addEventListener('click', () => {
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
        const code = window.editor ? window.editor.getValue() : '';
        if (!code.trim()) {
          alert(window.lang === 'fr' ? "Le code est vide ! Veuillez d'abord générer un projet." : "Code is empty! Please generate a project first.");
          return;
        }

        // 3. Open triage modal
        modalTriage.style.display = 'flex';
      });
    }

    // Modal close and cancel listeners
    const closeTriage = document.getElementById('btn-close-triage');
    if (closeTriage) closeTriage.addEventListener('click', () => modalTriage.style.display = 'none');

    const closePublish = document.getElementById('btn-close-publish');
    const cancelPublish = document.getElementById('btn-cancel-publish');
    if (closePublish) closePublish.addEventListener('click', () => modalPublish.style.display = 'none');
    if (cancelPublish) cancelPublish.addEventListener('click', () => modalPublish.style.display = 'none');

    const closeShare = document.getElementById('btn-close-share');
    if (closeShare) closeShare.addEventListener('click', () => modalShare.style.display = 'none');

    const closeGist = document.getElementById('btn-close-gist-modal');
    const cancelGist = document.getElementById('btn-cancel-gist-modal');
    if (closeGist) closeGist.addEventListener('click', () => modalGist.style.display = 'none');
    if (cancelGist) cancelGist.addEventListener('click', () => modalGist.style.display = 'none');

    // Close on overlay background click
    const overlays = [modalTriage, modalPublish, modalShare, modalGist];
    overlays.forEach(overlay => {
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) overlay.style.display = 'none';
        });
      }
    });

    // Option 1: Publish to Community Feed
    const optFeed = document.getElementById('opt-triage-feed');
    if (optFeed) {
      optFeed.addEventListener('click', () => {
        modalTriage.style.display = 'none';
        
        // Pre-fill nickname
        const session = localStorage.getItem('genius_session');
        if (session) {
          try {
            const user = JSON.parse(session);
            if (user && user.name) {
              document.getElementById('publish-nickname').value = user.name;
            }
          } catch (e) {}
        }
        modalPublish.style.display = 'flex';
      });
    }

    // Submit Publish to Community Feed
    const btnSubmitPublish = document.getElementById('btn-submit-publish');
    if (btnSubmitPublish) {
      btnSubmitPublish.addEventListener('click', () => {
        const nickname = document.getElementById('publish-nickname').value.trim();
        const descEn = document.getElementById('publish-desc-en').value.trim();
        const descFr = document.getElementById('publish-desc-fr').value.trim();
        
        if (!nickname) {
          alert(window.lang === 'fr' ? 'Veuillez saisir votre pseudo !' : 'Please enter your nickname!');
          return;
        }

        const rawCode = window.editor ? window.editor.getValue() : '';
        const sanitizedCode = typeof window.sanitizeStandalone === 'function' ? window.sanitizeStandalone(rawCode) : rawCode;

        const session = localStorage.getItem('genius_session');
        let sessionUser = {};
        if (session) {
          try {
            sessionUser = JSON.parse(session);
          } catch (e) {}
        }

        const postId = Date.now();
        const post = {
          id: postId,
          user: nickname,
          userEmail: sessionUser.email || "anonymous@example.com",
          userAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname)}`,
          userTag: sessionUser.role === 'Admin' ? 'ADMIN Maker' : 'Premium Maker',
          caption_en: descEn || "Check out this web application I built on IA Code Studio!",
          caption_fr: descFr || "Découvrez cette application web que j'ai créée sur IA Code Studio !",
          likes: 0,
          comments: [],
          preset: "custom",
          hasThree: true, // HTML/CSS/JS App preview
          code: sanitizedCode,
          createdAt: postId
        };

        if (window.DevSocialDB && typeof window.DevSocialDB.savePost === 'function') {
          window.lastFirestoreError = null;

          window.DevSocialDB.savePost(post).then((success) => {
            if (success) {
              if (window.showToast) {
                window.showToast(window.lang === 'fr' ? "🎉 Application publiée sur le feed !" : "🎉 App published to feed!");
              } else {
                alert(window.lang === 'fr' ? "🎉 Application publiée sur le feed !" : "🎉 App published to feed!");
              }

              // Show share modal with link and embed code immediately after successful publish
              const baseOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? window.location.origin : 'https://ia-codestudio.com';
              const shareUrl = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}`;
              document.getElementById('share-link-input').value = shareUrl;

              const embedUrl = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}&embed=true`;
              const embedCode = `<iframe src="${embedUrl}" width="100%" height="450" style="border:none; border-radius:12px; box-shadow: 0 4px 30px rgba(0,0,0,0.35);"></iframe>`;
              document.getElementById('embed-code-input').value = embedCode;
              
              const currentLang = window.lang || 'en';
              const shareCaption = currentLang === 'fr' ? "Découvrez cette application web !" : "Check out this web application!";
              const tweetText = currentLang === 'fr'
                ? `Regardez cette application web que j'ai codée avec l'IA sur IA Code Studio ! ${shareCaption}`
                : `Check out this web application I coded with AI on IA Code Studio! ${shareCaption}`;
                
              document.getElementById('share-twitter-btn').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
              document.getElementById('share-reddit-btn').href = `https://reddit.com/submit?title=${encodeURIComponent(shareCaption)}&url=${encodeURIComponent(shareUrl)}`;
              document.getElementById('share-facebook-btn').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

              modalShare.style.display = 'flex';
            } else {
              const errMsg = window.lastFirestoreError || window.lastFirebaseInitError || "Unknown connection error";
              alert(window.lang === 'fr'
                ? `⚠️ Enregistré LOCALEMENT car la synchronisation en ligne a échoué.\nDétails: ${errMsg}`
                : `⚠️ Saved LOCALLY because online sync failed.\nDetails: ${errMsg}`);
            }
          });
          
          modalPublish.style.display = 'none';
          
          // Reset fields
          document.getElementById('publish-nickname').value = '';
          document.getElementById('publish-desc-en').value = '';
          document.getElementById('publish-desc-fr').value = '';
        } else {
          alert(window.lang === 'fr' ? "Erreur: Base de données Firestore non disponible." : "Error: Firestore database not available.");
        }
      });
    }

    // Option 2: Direct Social Share & Embed (Unlisted)
    const optDirect = document.getElementById('opt-triage-direct');
    if (optDirect) {
      optDirect.addEventListener('click', () => {
        const session = localStorage.getItem('genius_session');
        let sessionUser = {};
        let nickname = "Developer";
        if (session) {
          try {
            sessionUser = JSON.parse(session);
            nickname = sessionUser.name || nickname;
          } catch (e) {}
        }

        const rawCode = window.editor ? window.editor.getValue() : '';
        const sanitizedCode = typeof window.sanitizeStandalone === 'function' ? window.sanitizeStandalone(rawCode) : rawCode;
        
        const postId = Date.now();
        const post = {
          id: postId,
          user: nickname,
          userEmail: sessionUser.email || "anonymous@example.com",
          userAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname)}`,
          userTag: sessionUser.role === 'Admin' ? 'ADMIN Maker' : 'Premium Maker',
          caption_en: "Web Application (Direct Link)",
          caption_fr: "Application Web (Lien Direct)",
          likes: 0,
          comments: [],
          preset: "custom",
          hasThree: true,
          code: sanitizedCode,
          createdAt: postId,
          unlisted: true // 🔒 Exclude from public feed
        };

        if (window.DevSocialDB && typeof window.DevSocialDB.savePost === 'function') {
          window.lastFirestoreError = null;

          window.DevSocialDB.savePost(post).then((success) => {
            if (!success) {
              const errMsg = window.lastFirestoreError || window.lastFirebaseInitError || "Unknown connection error";
              alert(window.lang === 'fr'
                ? `⚠️ Enregistré LOCALEMENT car la synchronisation en ligne a échoué.\nDétails: ${errMsg}`
                : `⚠️ Saved LOCALLY because online sync failed.\nDetails: ${errMsg}`);
            } else {
              if (window.showToast) {
                window.showToast(window.lang === 'fr' ? "✅ Prêt pour le partage !" : "✅ Ready for sharing!");
              }
            }
          });
          
          modalTriage.style.display = 'none';
          
          // Populate share link & embed code inputs
          const baseOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? window.location.origin : 'https://ia-codestudio.com';
          const shareUrl = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}`;
          document.getElementById('share-link-input').value = shareUrl;

          const embedUrl = `${baseOrigin}/devsocial-ai-hub/index.html?post=${postId}&embed=true`;
          const embedCode = `<iframe src="${embedUrl}" width="100%" height="450" style="border:none; border-radius:12px; box-shadow: 0 4px 30px rgba(0,0,0,0.35);"></iframe>`;
          document.getElementById('embed-code-input').value = embedCode;
          
          const currentLang = window.lang || 'en';
          const shareCaption = currentLang === 'fr' ? "Découvrez cette application web !" : "Check out this web application!";
          const tweetText = currentLang === 'fr'
            ? `Regardez cette application web que j'ai codée avec l'IA sur IA Code Studio ! ${shareCaption}`
            : `Check out this web application I coded with AI on IA Code Studio! ${shareCaption}`;
            
          document.getElementById('share-twitter-btn').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
          document.getElementById('share-reddit-btn').href = `https://reddit.com/submit?title=${encodeURIComponent(shareCaption)}&url=${encodeURIComponent(shareUrl)}`;
          document.getElementById('share-facebook-btn').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

          modalShare.style.display = 'flex';
        } else {
          alert(window.lang === 'fr' ? "Erreur: Base de données Firestore non disponible." : "Error: Firestore database not available.");
        }
      });
    }

    // Option 3: Export to GitHub Gist
    const optGist = document.getElementById('opt-triage-gist');
    if (optGist) {
      optGist.addEventListener('click', () => {
        modalTriage.style.display = 'none';
        
        // Pre-fill existing PAT if saved
        const savedToken = localStorage.getItem('ia_gh_token');
        if (savedToken) {
          document.getElementById('gist-token-input').value = savedToken;
        }
        modalGist.style.display = 'flex';
      });
    }

    // Gist token save & submit
    const btnSaveGist = document.getElementById('btn-save-gist-modal');
    if (btnSaveGist) {
      btnSaveGist.addEventListener('click', () => {
        const token = document.getElementById('gist-token-input').value.trim();
        if (!token) {
          alert(window.lang === 'fr' ? "Veuillez entrer un jeton GitHub valide !" : "Please enter a valid GitHub token!");
          return;
        }
        localStorage.setItem('ia_gh_token', token);
        modalGist.style.display = 'none';
        triggerGistExport(token);
      });
    }

    function triggerGistExport(token) {
      const rawCode = window.editor ? window.editor.getValue() : '';
      const sanitizedCode = typeof window.sanitizeStandalone === 'function' ? window.sanitizeStandalone(rawCode) : rawCode;
      const currentLang = window.lang || 'en';
      
      const submitBtn = document.getElementById('btn-save-gist-modal');
      const origText = submitBtn.textContent;
      submitBtn.textContent = currentLang === 'fr' ? "Publication..." : "Exporting...";
      submitBtn.disabled = true;

      fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token ' + token
        },
        body: JSON.stringify({
          description: 'Created with IA Architecte Studio',
          public: true,
          files: { 'index.html': { content: sanitizedCode } }
        })
      })
      .then(res => res.json())
      .then(data => {
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
        if (data.html_url) {
          if (window.showToast) {
            window.showToast(currentLang === 'fr' ? "🎉 Gist créé avec succès !" : "🎉 Gist created successfully!");
          }
          window.open(data.html_url, '_blank');
        } else {
          alert((currentLang === 'fr' ? "Erreur : " : "Error: ") + (data.message || 'Unknown error'));
        }
      })
      .catch(err => {
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
        alert((currentLang === 'fr' ? "Erreur : " : "Error: ") + err.message);
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
