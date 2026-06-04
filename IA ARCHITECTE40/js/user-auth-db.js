/**
 * User Auth & Realtime Database Manager v1.0
 * Supports Firebase Realtime Database with an automatic LocalStorage hybrid fallback.
 */
(function() {
  'use strict';

  // Language management
  function getLang() {
    return window.lang || 'fr'; // default to French as requested in summaries
  }

  const TXT = {
    en: {
      authTitleLogin: "🔐 Developer Login",
      authTitleRegister: "🚀 Create Account",
      authTitleRecover: "🔑 Recover Password",
      errEmptyFields: "Please fill in all fields.",
      errInvalidEmail: "Please enter a valid email address.",
      errPasswordLength: "Password must be at least 6 characters.",
      errUserExists: "This email is already registered.",
      errInvalidCredentials: "Invalid email or password.",
      errUserBanned: "This account has been banned by the administrator.",
      successRegister: "Account created successfully! Welcome to the community.",
      successRecover: "Password recovery instructions sent to your email.",
      successMuted: "You have been muted by the administrator and cannot send messages.",
      localModeBanner: "⚡ Running in Local Mode (Offline/Simulated). Click here to connect Firebase.",
      firebaseConnected: "🟢 Connected to Firebase Live Database!",
      invalidConfig: "Invalid Firebase configuration. Please check your keys.",
      configSaved: "Firebase configuration saved. Reloading database...",
      logoutSuccess: "Logged out successfully."
    },
    fr: {
      authTitleLogin: "🔐 Connexion Développeur",
      authTitleRegister: "🚀 Créer un Compte",
      authTitleRecover: "🔑 Récupérer le Mot de Passe",
      errEmptyFields: "Veuillez remplir tous les champs.",
      errInvalidEmail: "Veuillez entrer une adresse email valide.",
      errPasswordLength: "Le mot de passe doit contenir au moins 6 caractères.",
      errUserExists: "Cet email est déjà enregistré.",
      errInvalidCredentials: "Email ou mot de passe incorrect.",
      errUserBanned: "Ce compte a été banni par l'administrateur.",
      successRegister: "Compte créé avec succès ! Bienvenue dans la communauté.",
      successRecover: "Instructions de récupération envoyées à votre email.",
      successMuted: "Vous avez été rendu muet par l'administrateur et ne pouvez pas envoyer de messages.",
      localModeBanner: "⚡ Mode Local (Simulé). Cliquez ici pour connecter Firebase.",
      firebaseConnected: "🟢 Connecté à la base de données Firebase !",
      invalidConfig: "Configuration Firebase invalide. Veuillez vérifier vos clés.",
      configSaved: "Configuration Firebase enregistrée. Rechargement de la base...",
      logoutSuccess: "Déconnexion réussie."
    }
  };

  function t(key) {
    const l = getLang();
    return (TXT[l] || TXT.fr)[key] || key;
  }

  // Firebase Scripts to load
  const firebaseScripts = [
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js'
  ];

  // State Management
  const AppState = {
    isFirebase: false,
    currentUser: null,
    onlineUsersCount: 1,
    users: [],
    messages: [],
    authListeners: [],
    presenceListeners: [],
    messageListeners: [],
    userListListeners: [],
    firebaseApp: null,
    db: null
  };

  // Safe callback dispatchers
  function notifyAuthListeners(user) {
    AppState.authListeners.forEach(cb => { try { cb(user); } catch(e) { console.error(e); } });
  }
  function notifyPresenceListeners(count) {
    AppState.presenceListeners.forEach(cb => { try { cb(count); } catch(e) { console.error(e); } });
  }
  function notifyMessageListeners(msgs) {
    AppState.messageListeners.forEach(cb => { try { cb(msgs); } catch(e) { console.error(e); } });
  }
  function notifyUserListListeners(users) {
    AppState.userListListeners.forEach(cb => { try { cb(users); } catch(e) { console.error(e); } });
  }

  // --- MOCK DATABASE CONTROLLER (LocalStorage fallback) ---
  const MockDb = {
    init() {
      // Setup mock users if not existing (no default admin in local mode - security fix)
      if (!localStorage.getItem('mock_users')) {
        const defaultUsers = {}; // No default users - all users must register
        localStorage.setItem('mock_users', JSON.stringify(defaultUsers));
      }

      // Setup mock license keys if not existing
      if (!localStorage.getItem('mock_license_keys')) {
        const defaultKeys = {
          'IA-PREM-TEST-1111': { active: true, redeemedBy: null, redeemedAt: null },
          'IA-PREM-TEST-2222': { active: true, redeemedBy: null, redeemedAt: null },
          'IA-PREM-TEST-3333': { active: true, redeemedBy: null, redeemedAt: null }
        };
        localStorage.setItem('mock_license_keys', JSON.stringify(defaultKeys));
      }

      // Setup mock messages if not existing
      if (!localStorage.getItem('mock_chat_messages')) {
        const defaultMsgs = [
          {
            msgId: 'msg_1',
            uid: 'mock_bot_pierre',
            nickname: 'PierreCoder 🇫🇷',
            text: "Bienvenue sur le hub communautaire d'IA Architecte ! C'est génial de pouvoir coder et partager ici.",
            timestamp: Date.now() - 3600000
          },
          {
            msgId: 'msg_2',
            uid: 'mock_bot_sarah',
            nickname: 'DevSarah 🇬🇧',
            text: "Hello friends! Happy to pair-program. IA Architecte UI builder is absolutely brilliant, feels super premium!",
            timestamp: Date.now() - 1800000
          }
        ];
        localStorage.setItem('mock_chat_messages', JSON.stringify(defaultMsgs));
      }

      // Synchronize changes across multiple browser tabs
      window.addEventListener('storage', (e) => {
        if (e.key === 'mock_chat_messages') {
          AppState.messages = JSON.parse(e.newValue || '[]');
          notifyMessageListeners(AppState.messages);
        }
        if (e.key === 'mock_presence') {
          this.updateOnlineCount();
        }
        if (e.key === 'mock_users') {
          AppState.users = Object.values(JSON.parse(e.newValue || '{}'));
          notifyUserListListeners(AppState.users);
          // Check if current user was modified (muted / banned)
          if (AppState.currentUser) {
            const users = JSON.parse(e.newValue || '{}');
            const self = users[AppState.currentUser.email];
            if (self) {
              if (self.isBanned) {
                MockDb.signOut();
                if (window.showToast) window.showToast(t('errUserBanned'));
              } else if (self.isMuted !== AppState.currentUser.isMuted) {
                AppState.currentUser.isMuted = self.isMuted;
                notifyAuthListeners(AppState.currentUser);
              }
            }
          }
        }
      });

      // Load session
      const stored = sessionStorage.getItem('mock_current_user');
      if (stored) {
        AppState.currentUser = JSON.parse(stored);
        this.updatePresence(true);
      }

      this.updateOnlineCount();
      this.loadUsers();
      this.loadMessages();

      // Start Bot simulation
      this.startBotSimulation();
    },

    loadUsers() {
      const usersObj = JSON.parse(localStorage.getItem('mock_users') || '{}');
      AppState.users = Object.values(usersObj).map(u => {
        // Exclude password for privacy/security emulation
        const { password, ...safeUser } = u;
        return safeUser;
      });
      notifyUserListListeners(AppState.users);
    },

    loadMessages() {
      AppState.messages = JSON.parse(localStorage.getItem('mock_chat_messages') || '[]');
      notifyMessageListeners(AppState.messages);
    },

    updatePresence(isOnline) {
      if (!AppState.currentUser) return;
      let presence = JSON.parse(localStorage.getItem('mock_presence') || '{}');
      if (isOnline) {
        presence[AppState.currentUser.uid] = {
          nickname: AppState.currentUser.nickname,
          lastActive: Date.now()
        };
      } else {
        delete presence[AppState.currentUser.uid];
      }
      localStorage.setItem('mock_presence', JSON.stringify(presence));
      this.updateOnlineCount();
    },

    updateOnlineCount() {
      const presence = JSON.parse(localStorage.getItem('mock_presence') || '{}');
      // Count local active + simulated bots (usually 2 to 4 bots active)
      const localCount = Object.keys(presence).length;
      AppState.onlineUsersCount = Math.max(1, localCount + this.getSimulatedBotCount());
      notifyPresenceListeners(AppState.onlineUsersCount);
    },

    getSimulatedBotCount() {
      // Simulate fluctuation based on hours/minutes
      const mins = new Date().getMinutes();
      if (mins % 15 < 5) return 2;
      if (mins % 15 < 10) return 3;
      return 4;
    },

    signUp(email, password, nickname) {
      return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
        if (users[email]) {
          return reject(new Error(t('errUserExists')));
        }
        const uid = 'mock_user_' + Math.random().toString(36).substr(2, 9);
        // In local/offline mode, all users are regular users (no admin via mock)
        const role = 'user';
        const membership = 'free';
        
        users[email] = {
          uid: uid,
          email: email,
          password: password,
          nickname: nickname,
          role: role,
          membership: membership,
          isMuted: false,
          isBanned: false,
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('mock_users', JSON.stringify(users));
        this.loadUsers();
        resolve(users[email]);
      });
    },

    signIn(email, password) {
      return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
        const user = users[email];
        if (!user || user.password !== password) {
          return reject(new Error(t('errInvalidCredentials')));
        }
        if (user.isBanned) {
          return reject(new Error(t('errUserBanned')));
        }
        
        AppState.currentUser = {
          uid: user.uid,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          membership: user.membership || 'free',
          isMuted: user.isMuted,
          isBanned: false
        };

        sessionStorage.setItem('mock_current_user', JSON.stringify(AppState.currentUser));
        this.updatePresence(true);
        notifyAuthListeners(AppState.currentUser);
        resolve(AppState.currentUser);
      });
    },

    signOut() {
      return new Promise((resolve) => {
        if (AppState.currentUser) {
          this.updatePresence(false);
        }
        AppState.currentUser = null;
        sessionStorage.removeItem('mock_current_user');
        notifyAuthListeners(null);
        resolve();
      });
    },

    sendPasswordResetEmail(email) {
      return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
        if (!users[email]) {
          return reject(new Error(t('errInvalidCredentials')));
        }
        resolve();
      });
    },

    sendMessage(text, codeSnippet = null) {
      if (!AppState.currentUser) return Promise.reject(new Error("Not logged in."));
      if (AppState.currentUser.isMuted) {
        if (window.showToast) window.showToast(t('successMuted'));
        return Promise.reject(new Error("Muted"));
      }

      const msgs = JSON.parse(localStorage.getItem('mock_chat_messages') || '[]');
      const newMsg = {
        msgId: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        uid: AppState.currentUser.uid,
        nickname: AppState.currentUser.nickname,
        text: text,
        codeSnippet: codeSnippet,
        timestamp: Date.now()
      };
      msgs.push(newMsg);
      // Limit to last 100 messages
      if (msgs.length > 100) msgs.shift();

      localStorage.setItem('mock_chat_messages', JSON.stringify(msgs));
      AppState.messages = msgs;
      notifyMessageListeners(msgs);

      // Handle Bot response triggers
      this.handleBotResponseTrigger(text);

      return Promise.resolve(newMsg);
    },

    deleteMessage(msgId) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      let msgs = JSON.parse(localStorage.getItem('mock_chat_messages') || '[]');
      msgs = msgs.filter(m => m.msgId !== msgId);
      localStorage.setItem('mock_chat_messages', JSON.stringify(msgs));
      AppState.messages = msgs;
      notifyMessageListeners(msgs);
      return Promise.resolve();
    },

    setUserMute(uid, isMuted) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
      for (const email in users) {
        if (users[email].uid === uid) {
          users[email].isMuted = isMuted;
          break;
        }
      }
      localStorage.setItem('mock_users', JSON.stringify(users));
      this.loadUsers();
      return Promise.resolve();
    },

    deleteUser(uid) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
      for (const email in users) {
        if (users[email].uid === uid) {
          users[email].isBanned = true; // Mark as banned
          break;
        }
      }
      localStorage.setItem('mock_users', JSON.stringify(users));
      this.loadUsers();
      return Promise.resolve();
    },

    setUserPremium(uid, isPremium) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
      for (const email in users) {
        if (users[email].uid === uid) {
          users[email].membership = isPremium ? 'premium' : 'free';
          break;
        }
      }
      localStorage.setItem('mock_users', JSON.stringify(users));
      this.loadUsers();
      return Promise.resolve();
    },

    redeemLicenseKey(key) {
      if (!AppState.currentUser) return Promise.reject(new Error("Not logged in."));
      const keys = JSON.parse(localStorage.getItem('mock_license_keys') || '{}');
      const keyRecord = keys[key];
      if (!keyRecord || !keyRecord.active) {
        return Promise.reject(new Error(getLang() === 'fr' ? "Clé de licence invalide ou expirée." : "Invalid or expired license key."));
      }

      // Mark key as redeemed
      keyRecord.active = false;
      keyRecord.redeemedBy = AppState.currentUser.uid;
      keyRecord.redeemedAt = Date.now();
      localStorage.setItem('mock_license_keys', JSON.stringify(keys));

      // Update user to premium
      const users = JSON.parse(localStorage.getItem('mock_users') || '{}');
      for (const email in users) {
        if (users[email].uid === AppState.currentUser.uid) {
          users[email].membership = 'premium';
          break;
        }
      }
      localStorage.setItem('mock_users', JSON.stringify(users));
      this.loadUsers();

      // Update current state
      AppState.currentUser.membership = 'premium';
      notifyAuthListeners(AppState.currentUser);

      return Promise.resolve();
    },
    
    generateLicenseKey() {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      const keys = JSON.parse(localStorage.getItem('mock_license_keys') || '{}');
      const key = "IA-PREM-" + Math.random().toString(36).substr(2, 4).toUpperCase() + "-" + Math.random().toString(36).substr(2, 4).toUpperCase();
      keys[key] = { active: true, redeemedBy: null, redeemedAt: null };
      localStorage.setItem('mock_license_keys', JSON.stringify(keys));
      return Promise.resolve(key);
    },

    // SIMULATED BOTS CONTROLLER
    startBotSimulation() {
      if (this.botInterval) clearInterval(this.botInterval);
      
      const botMessages = {
        en: [
          { name: "DevSarah 🇬🇧", text: "Pro tip: Always use flexbox/grid wrapper classes to ensure components resize gracefully on small viewports! 📱" },
          { name: "AlexJS 🇨🇦", text: "Look at this shortcut to copy an object: `const clone = structuredClone(original);` natively supported in modern browsers now! 🚀" },
          { name: "MarcPWA 🇬🇧", text: "Don't forget to test your PWA installability in Chrome DevTools under Application tab. Highly recommend!" }
        ],
        fr: [
          { name: "PierreCoder 🇫🇷", text: "Petite astuce CSS: Utilisez `backdrop-filter: blur(8px)` pour créer de superbes fenêtres avec effet de verre dépoli. 🔮" },
          { name: "AlexJS 🇨🇦", text: "Saviez-vous que `Array.from({length: 5}, (_, i) => i)` génère instantanément [0, 1, 2, 3, 4] ? Super pratique pour tester des listes." },
          { name: "MarcPWA 🇫🇷", text: "Avec les Service Workers de notre module PWA Generator, l'application fonctionne parfaitement sans internet !" }
        ]
      };

      this.botInterval = setInterval(() => {
        // Only trigger bots randomly if tab is focused and user is logged in
        if (document.hidden || !AppState.currentUser) return;
        if (Math.random() > 0.3) return; // 30% chance every 40s

        const currentLang = getLang();
        const pool = botMessages[currentLang] || botMessages.en;
        const msg = pool[Math.floor(Math.random() * pool.length)];

        // Append to chat
        const msgs = JSON.parse(localStorage.getItem('mock_chat_messages') || '[]');
        const newMsg = {
          msgId: 'msg_bot_' + Date.now(),
          uid: 'mock_bot_' + msg.name.replace(/\s+/g, '_').toLowerCase(),
          nickname: msg.name,
          text: msg.text,
          timestamp: Date.now()
        };
        msgs.push(newMsg);
        if (msgs.length > 100) msgs.shift();
        localStorage.setItem('mock_chat_messages', JSON.stringify(msgs));
        AppState.messages = msgs;
        notifyMessageListeners(msgs);
      }, 40000);
    },

    handleBotResponseTrigger(userText) {
      const lower = userText.toLowerCase();
      let botReply = null;
      let botName = "PierreCoder 🇫🇷";
      const l = getLang();

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('salut') || lower.includes('bonjour')) {
        if (l === 'fr') {
          botReply = `Salut ${AppState.currentUser.nickname} ! Bienvenue sur le chat d'IA Architecte. N'hésite pas à partager tes questions ou tes astuces ! 😊`;
        } else {
          botReply = `Hey ${AppState.currentUser.nickname}! Welcome to the developer chat. Feel free to ask questions or share your tips! 😊`;
        }
      } else if (lower.includes('css') || lower.includes('style') || lower.includes('design') || lower.includes('layout')) {
        botName = "DevSarah 🇬🇧";
        if (l === 'fr') {
          botReply = "Pour les styles CSS modernes, le secret c'est les variables HSL ! Elles permettent d'ajuster facilement la saturation et la luminosité des couleurs en temps réel. 🎨";
        } else {
          botReply = "For modern CSS styling, try custom HSL variables! It makes it super easy to adjust color saturation and lightness dynamically in the stylesheet. 🎨";
        }
      } else if (lower.includes('js') || lower.includes('javascript') || lower.includes('code')) {
        botName = "AlexJS 🇨🇦";
        if (l === 'fr') {
          botReply = "Astuce JS: Utilisez le chaînage optionnel `user?.profile?.name` pour éviter les erreurs fatales de propriétés non définies ! ⚡";
        } else {
          botReply = "JS Tip: Always use optional chaining like `user?.profile?.name` to easily prevent undefined property errors in your logic loops! ⚡";
        }
      } else if (lower.includes('pwa') || lower.includes('offline') || lower.includes('offline screen')) {
        botName = "MarcPWA 🇫🇷";
        if (l === 'fr') {
          botReply = "N'oublie pas d'éditer le fichier `sw.js` dans le dossier PWA Generator pour mettre en cache les pages clés de ton projet. 📶";
        } else {
          botReply = "Make sure to edit the `sw.js` in the PWA Generator module to precache the core routes of your offline application. 📶";
        }
      }

      if (botReply) {
        setTimeout(() => {
          const msgs = JSON.parse(localStorage.getItem('mock_chat_messages') || '[]');
          const newMsg = {
            msgId: 'msg_bot_reply_' + Date.now(),
            uid: 'mock_bot_' + botName.replace(/\s+/g, '_').toLowerCase(),
            nickname: botName,
            text: botReply,
            timestamp: Date.now()
          };
          msgs.push(newMsg);
          if (msgs.length > 100) msgs.shift();
          localStorage.setItem('mock_chat_messages', JSON.stringify(msgs));
          AppState.messages = msgs;
          notifyMessageListeners(msgs);
        }, 1200);
      }
    }
  };


  // --- FIREBASE CONTROLLER ---
  const FirebaseDb = {
    init(config) {
      try {
        if (typeof firebase === 'undefined') {
          throw new Error("Firebase SDK was not loaded from CDN.");
        }

        if (AppState.firebaseApp) {
          // Already initialized, check if config matches
          return;
        }

        if (firebase.apps && firebase.apps.length > 0) {
          AppState.firebaseApp = firebase.app();
        } else {
          AppState.firebaseApp = firebase.initializeApp(config);
        }

        AppState.db = firebase.database();
        AppState.isFirebase = true;

        // Monitor Firebase Auth State
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // Retrieve additional roles/profile from database
            AppState.db.ref('users_public/' + user.uid).once('value')
              .then(snapshot => {
                const profile = snapshot.val() || {};
                
                if (profile.isBanned) {
                  firebase.auth().signOut();
                  if (window.showToast) window.showToast(t('errUserBanned'));
                  return;
                }

                AppState.currentUser = {
                  uid: user.uid,
                  email: user.email,
                  nickname: profile.nickname || user.displayName || "Coder",
                  role: profile.role || "user",
                  membership: profile.membership || "free",
                  isMuted: profile.isMuted || false,
                  isBanned: false
                };

                // Setup presence monitoring
                const presenceRef = AppState.db.ref('presence/' + user.uid);
                const connectedRef = AppState.db.ref('.info/connected');
                connectedRef.on('value', snap => {
                  if (snap.val() === true) {
                    presenceRef.onDisconnect().remove();
                    presenceRef.set({
                      nickname: AppState.currentUser.nickname,
                      lastActive: firebase.database.ServerValue.TIMESTAMP
                    });
                  }
                });

                notifyAuthListeners(AppState.currentUser);
              })
              .catch(err => {
                console.error("Failed to load user profile:", err);
                // Assume standard user if snapshot read fails
                AppState.currentUser = {
                  uid: user.uid,
                  email: user.email,
                  nickname: user.displayName || "Coder",
                  role: "user",
                  membership: "free",
                  isMuted: false,
                  isBanned: false
                };
                notifyAuthListeners(AppState.currentUser);
              });
          } else {
            AppState.currentUser = null;
            notifyAuthListeners(null);
          }
        });

        // Listen to active developers presence count
        AppState.db.ref('presence').on('value', snapshot => {
          const list = snapshot.val() || {};
          AppState.onlineUsersCount = Math.max(1, Object.keys(list).length);
          notifyPresenceListeners(AppState.onlineUsersCount);
        });

        // Listen to real-time chat messages
        AppState.db.ref('chat').limitToLast(100).on('value', snapshot => {
          const raw = snapshot.val() || {};
          const msgs = Object.values(raw).sort((a, b) => a.timestamp - b.timestamp);
          AppState.messages = msgs;
          notifyMessageListeners(msgs);
        });

        // Listen to all users list (if logged in user is admin)
        AppState.db.ref('users_public').on('value', snapshot => {
          const raw = snapshot.val() || {};
          AppState.users = Object.values(raw);
          notifyUserListListeners(AppState.users);
        });

        if (window.showToast) window.showToast(t('firebaseConnected'));

      } catch (err) {
        console.error("Firebase init failed, switching to Local Mode:", err);
        if (window.showToast) window.showToast(t('invalidConfig') + ": " + err.message);
        AppState.isFirebase = false;
        MockDb.init();
      }
    },

    signUp(email, password, nickname) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
          const user = cred.user;
          const role = (email.toLowerCase() === 'admin@iaarchitecte.com') ? 'admin' : 'user';
          const membership = (email.toLowerCase() === 'admin@iaarchitecte.com') ? 'premium' : 'free';
          const publicProfile = {
            uid: user.uid,
            nickname: nickname,
            role: role,
            membership: membership,
            isMuted: false,
            isBanned: false,
            createdAt: new Date().toISOString()
          };
          const privateProfile = {
            email: email
          };

          // Save profiles in Database
          return Promise.all([
            AppState.db.ref('users_public/' + user.uid).set(publicProfile),
            AppState.db.ref('users_private/' + user.uid).set(privateProfile),
            user.updateProfile({ displayName: nickname })
          ]).then(() => {
            return publicProfile;
          });
        });
    },

    signIn(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signOut() {
      // Remove presence node
      if (AppState.currentUser) {
        AppState.db.ref('presence/' + AppState.currentUser.uid).remove();
      }
      return firebase.auth().signOut();
    },

    sendPasswordResetEmail(email) {
      return firebase.auth().sendPasswordResetEmail(email);
    },

    sendMessage(text, codeSnippet = null) {
      if (!AppState.currentUser) return Promise.reject(new Error("Not logged in."));
      if (AppState.currentUser.isMuted) {
        if (window.showToast) window.showToast(t('successMuted'));
        return Promise.reject(new Error("Muted"));
      }

      const chatRef = AppState.db.ref('chat').push();
      const msg = {
        msgId: chatRef.key,
        uid: AppState.currentUser.uid,
        nickname: AppState.currentUser.nickname,
        text: text,
        codeSnippet: codeSnippet,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      return chatRef.set(msg).then(() => msg);
    },

    deleteMessage(msgId) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      return AppState.db.ref('chat/' + msgId).remove();
    },

    setUserMute(uid, isMuted) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      return AppState.db.ref('users_public/' + uid + '/isMuted').set(isMuted);
    },

    deleteUser(uid) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      // Ban user in users_public
      return AppState.db.ref('users_public/' + uid + '/isBanned').set(true)
        .then(() => {
          // Remove from presence
          return AppState.db.ref('presence/' + uid).remove();
        });
    },

    setUserPremium(uid, isPremium) {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      return AppState.db.ref('users_public/' + uid + '/membership').set(isPremium ? 'premium' : 'free');
    },

    redeemLicenseKey(key) {
      if (!AppState.currentUser) return Promise.reject(new Error("Not logged in."));
      const keyRef = AppState.db.ref('license_keys/' + key);
      return keyRef.once('value').then(snap => {
        const record = snap.val();
        if (!record || !record.active) {
          throw new Error(getLang() === 'fr' ? "Clé de licence invalide ou expirée." : "Invalid or expired license key.");
        }

        // Deactivate and assign key
        const updates = {};
        updates['license_keys/' + key + '/active'] = false;
        updates['license_keys/' + key + '/redeemedBy'] = AppState.currentUser.uid;
        updates['license_keys/' + key + '/redeemedAt'] = firebase.database.ServerValue.TIMESTAMP;
        updates['users_public/' + AppState.currentUser.uid + '/membership'] = 'premium';

        return AppState.db.ref().update(updates).then(() => {
          AppState.currentUser.membership = 'premium';
          notifyAuthListeners(AppState.currentUser);
        });
      });
    },

    generateLicenseKey() {
      if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
        return Promise.reject(new Error("Unauthorized admin access."));
      }
      const key = "IA-PREM-" + Math.random().toString(36).substr(2, 4).toUpperCase() + "-" + Math.random().toString(36).substr(2, 4).toUpperCase();
      const record = { active: true, redeemedBy: null, redeemedAt: null };
      return AppState.db.ref('license_keys/' + key).set(record).then(() => key);
    }
  };

  function loadScripts(urls, callback) {
    let index = 0;
    function loadNext() {
      if (index >= urls.length) {
        return callback(null);
      }
      const url = urls[index];
      if (document.querySelector(`script[src="${url}"]`)) {
        index++;
        loadNext();
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        index++;
        loadNext();
      };
      script.onerror = () => {
        callback(new Error("Failed to load script: " + url));
      };
      document.head.appendChild(script);
    }
    loadNext();
  }

  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyBWwpp5eOzj2Ta8gQUa78zqdnVAlFG6RwE",
    authDomain: "ia-codestudio-7ce3a.firebaseapp.com",
    databaseURL: "https://ia-codestudio-7ce3a-default-rtdb.firebaseio.com",
    projectId: "ia-codestudio-7ce3a",
    storageBucket: "ia-codestudio-7ce3a.firebasestorage.app",
    messagingSenderId: "484008154719",
    appId: "1:484008154719:web:eb1b805c1419a271be6dea",
    measurementId: "G-EH6VWC2W9K"
  };

  // --- INITIALIZATION ---
  function initDatabase() {
    // Always start with the built-in Firebase config (most reliable)
    // A manually saved config from localStorage can override it only if valid
    let config = DEFAULT_FIREBASE_CONFIG;
    
    const savedConfig = localStorage.getItem('firebase_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Only use saved config if it has different/custom apiKey
        if (parsed && parsed.apiKey && parsed.apiKey !== DEFAULT_FIREBASE_CONFIG.apiKey) {
          config = parsed;
        }
      } catch(e) {
        console.warn("Saved Firebase config was invalid, using default config.");
        localStorage.removeItem('firebase_config'); // Clear bad config
      }
    }

    if (config && config.apiKey) {
      loadScripts(firebaseScripts, (err) => {
        if (err) {
          console.warn("Failed to load Firebase scripts (offline?), using Local Mode.");
          AppState.isFirebase = false;
          MockDb.init();
        } else {
          FirebaseDb.init(config);
        }
      });
      return;
    }

    // Default to Local Mode
    AppState.isFirebase = false;
    MockDb.init();
  }

  // --- EXPORT GLOBAL API ---
  window.AppAuth = {
    isPremium() {
      // 1. Check logged-in database state
      if (AppState.currentUser && AppState.currentUser.membership === 'premium') {
        return true;
      }
      
      // 2. Check local storage sub date (from Stripe payment on portal)
      const subDate = localStorage.getItem('ia_premium_sub_date');
      if (subDate) {
        const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
        if (daysPassed < 30) {
          return true;
        } else {
          localStorage.removeItem('ia_premium_sub_date'); // expired
        }
      }

      // 3. Check portal's premium users list in local storage
      try {
        const email = AppState.currentUser ? AppState.currentUser.email : '';
        if (email) {
          const premiumUsers = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
          const record = premiumUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (record) {
            const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
            if (record.days === 9999 || expiry > Date.now()) {
              return true;
            }
          }
        }
      } catch(e) {
        console.error("Premium list check failed", e);
      }

      return false;
    },

    get currentUser() {
      if (AppState.currentUser) {
        if (AppState.currentUser.membership !== 'premium' && window.AppAuth.isPremium()) {
          AppState.currentUser.membership = 'premium';
        }
        return AppState.currentUser;
      }
      // If not logged in, check if active subDate exists
      const subDate = localStorage.getItem('ia_premium_sub_date');
      if (subDate) {
        const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
        if (daysPassed < 30) {
          return {
            uid: 'local_premium_guest',
            email: 'guest@iaarchitecte.com',
            nickname: 'Premium Guest',
            role: 'user',
            membership: 'premium'
          };
        } else {
          localStorage.removeItem('ia_premium_sub_date');
        }
      }
      return null;
    },
    get isFirebase() { return AppState.isFirebase; },
    get onlineUsersCount() { return AppState.onlineUsersCount; },
    get users() { return AppState.users; },
    get messages() { return AppState.messages; },

    onAuthStateChanged(callback) {
      AppState.authListeners.push(callback);
      // Fire immediately with current value
      callback(AppState.currentUser);
    },
    onOnlineUserCountChange(callback) {
      AppState.presenceListeners.push(callback);
      callback(AppState.onlineUsersCount);
    },
    onNewMessage(callback) {
      AppState.messageListeners.push(callback);
      callback(AppState.messages);
    },
    onUsersChange(callback) {
      AppState.userListListeners.push(callback);
      callback(AppState.users);
    },

    signUp(email, password, nickname) {
      if (AppState.isFirebase) {
        return FirebaseDb.signUp(email, password, nickname);
      } else {
        return MockDb.signUp(email, password, nickname);
      }
    },

    signIn(email, password) {
      if (AppState.isFirebase) {
        return FirebaseDb.signIn(email, password);
      } else {
        return MockDb.signIn(email, password);
      }
    },

    signOut() {
      if (AppState.isFirebase) {
        return FirebaseDb.signOut();
      } else {
        return MockDb.signOut();
      }
    },

    sendPasswordResetEmail(email) {
      if (AppState.isFirebase) {
        return FirebaseDb.sendPasswordResetEmail(email);
      } else {
        return MockDb.sendPasswordResetEmail(email);
      }
    },

    sendMessage(text, codeSnippet = null) {
      if (AppState.isFirebase) {
        return FirebaseDb.sendMessage(text, codeSnippet);
      } else {
        return MockDb.sendMessage(text, codeSnippet);
      }
    },

    deleteMessage(msgId) {
      if (AppState.isFirebase) {
        return FirebaseDb.deleteMessage(msgId);
      } else {
        return MockDb.deleteMessage(msgId);
      }
    },

    setUserMute(uid, isMuted) {
      if (AppState.isFirebase) {
        return FirebaseDb.setUserMute(uid, isMuted);
      } else {
        return MockDb.setUserMute(uid, isMuted);
      }
    },

    deleteUser(uid) {
      if (AppState.isFirebase) {
        return FirebaseDb.deleteUser(uid);
      } else {
        return MockDb.deleteUser(uid);
      }
    },

    setUserPremium(uid, isPremium) {
      if (AppState.isFirebase) {
        return FirebaseDb.setUserPremium(uid, isPremium);
      } else {
        return MockDb.setUserPremium(uid, isPremium);
      }
    },

    redeemLicenseKey(key) {
      if (AppState.isFirebase) {
        return FirebaseDb.redeemLicenseKey(key);
      } else {
        return MockDb.redeemLicenseKey(key);
      }
    },

    generateLicenseKey() {
      if (AppState.isFirebase) {
        return FirebaseDb.generateLicenseKey();
      } else {
        return MockDb.generateLicenseKey();
      }
    },

    saveFirebaseConfig(config) {
      try {
        if (!config || !config.apiKey || !config.databaseURL || !config.projectId) {
          throw new Error(t('invalidConfig'));
        }
        localStorage.setItem('firebase_config', JSON.stringify(config));
        if (window.showToast) window.showToast(t('configSaved'));
        setTimeout(() => window.location.reload(), 1000);
        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },

    clearFirebaseConfig() {
      localStorage.removeItem('firebase_config');
      if (window.showToast) window.showToast("Firebase Config Cleared.");
      setTimeout(() => window.location.reload(), 500);
    }
  };

  // Wire up UI views toggle functions on window
  window.showAuthView = function(view) {
    const vLogin = document.getElementById('auth-view-login');
    const vRegister = document.getElementById('auth-view-register');
    const vRecover = document.getElementById('auth-view-recover');
    
    if (vLogin) vLogin.style.display = view === 'login' ? 'block' : 'none';
    if (vRegister) vRegister.style.display = view === 'register' ? 'block' : 'none';
    if (vRecover) vRecover.style.display = view === 'recover' ? 'block' : 'none';
    
    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) {
      if (view === 'login') titleEl.textContent = t('authTitleLogin');
      if (view === 'register') titleEl.textContent = t('authTitleRegister');
      if (view === 'recover') titleEl.textContent = t('authTitleRecover');
    }
  };

  // Setup click listeners and validation for the auth modal buttons
  function bindAuthEvents() {
    // Live Dev counter badge click event -> Open modal or log out choice
    const devBadge = document.getElementById('live-dev-counter');
    if (devBadge) {
      // Remove old listeners if any by replacing element clone
      const newDevBadge = devBadge.cloneNode(true);
      devBadge.parentNode.replaceChild(newDevBadge, devBadge);
      
      newDevBadge.addEventListener('click', () => {
        const user = window.AppAuth.currentUser;
        if (!user) {
          document.getElementById('auth-modal').style.display = 'flex';
          window.showAuthView('login');
        } else {
          // Ask if they want to log out
          const confirmLogout = confirm(t('logoutSuccess') + " (" + user.nickname + ") ? " + (getLang() === 'fr' ? 'Se déconnecter ?' : 'Sign out?'));
          if (confirmLogout) {
            window.AppAuth.signOut().then(() => {
              if (window.showToast) window.showToast(t('logoutSuccess'));
            });
          }
        }
      });
    }

    // Connect login form button
    const btnLogin = document.getElementById('btn-do-login');
    if (btnLogin) {
      const newBtnLogin = btnLogin.cloneNode(true);
      btnLogin.parentNode.replaceChild(newBtnLogin, btnLogin);
      newBtnLogin.addEventListener('click', () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;

        if (!email || !pass) {
          alert(t('errEmptyFields'));
          return;
        }

        // Show loading state
        const origText = newBtnLogin.textContent;
        newBtnLogin.textContent = getLang() === 'fr' ? '⏳ Connexion...' : '⏳ Signing in...';
        newBtnLogin.disabled = true;

        window.AppAuth.signIn(email, pass)
          .then(() => {
            document.getElementById('auth-modal').style.display = 'none';
            const user = window.AppAuth.currentUser;
            if (window.showToast) window.showToast('✅ ' + (getLang() === 'fr' ? 'Connecté ! Bonjour ' : 'Connected! Hello ') + (user ? user.nickname : ''));
            // Open the social panel to show the chat/dashboard immediately
            if (window.renderTab) window.renderTab('social');
          })
          .catch(err => {
            // Translate Firebase error codes to user-friendly messages
            let msg = err.message || t('errInvalidCredentials');
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
              msg = t('errInvalidCredentials');
            } else if (err.code === 'auth/too-many-requests') {
              msg = getLang() === 'fr' ? 'Trop de tentatives. Réessayez dans quelques minutes.' : 'Too many attempts. Please try again in a few minutes.';
            } else if (err.code === 'auth/network-request-failed') {
              msg = getLang() === 'fr' ? 'Erreur réseau. Vérifiez votre connexion internet.' : 'Network error. Check your internet connection.';
            }
            alert(msg);
          })
          .finally(() => {
            newBtnLogin.textContent = origText;
            newBtnLogin.disabled = false;
          });
      });
    }

    // Connect register form button
    const btnRegister = document.getElementById('btn-do-register');
    if (btnRegister) {
      const newBtnRegister = btnRegister.cloneNode(true);
      btnRegister.parentNode.replaceChild(newBtnRegister, btnRegister);
      newBtnRegister.addEventListener('click', () => {
        const nick = document.getElementById('reg-nickname').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-password').value;

        if (!nick || !email || !pass) {
          alert(t('errEmptyFields'));
          return;
        }
        if (pass.length < 6) {
          alert(t('errPasswordLength'));
          return;
        }

        // Show loading state
        const origText = newBtnRegister.textContent;
        newBtnRegister.textContent = getLang() === 'fr' ? '⏳ Création...' : '⏳ Creating...';
        newBtnRegister.disabled = true;

        window.AppAuth.signUp(email, pass, nick)
          .then(() => {
            // Automatically log in
            return window.AppAuth.signIn(email, pass);
          })
          .then(() => {
            document.getElementById('auth-modal').style.display = 'none';
            if (window.showToast) window.showToast('✅ ' + t('successRegister'));
            // Open the social panel to show the chat/dashboard immediately
            if (window.renderTab) window.renderTab('social');
          })
          .catch(err => {
            let msg = err.message || t('errUserExists');
            if (err.code === 'auth/email-already-in-use') {
              msg = t('errUserExists');
            } else if (err.code === 'auth/weak-password') {
              msg = t('errPasswordLength');
            } else if (err.code === 'auth/network-request-failed') {
              msg = getLang() === 'fr' ? 'Erreur réseau. Vérifiez votre connexion internet.' : 'Network error. Check your internet connection.';
            }
            alert(msg);
          })
          .finally(() => {
            newBtnRegister.textContent = origText;
            newBtnRegister.disabled = false;
          });
      });
    }

    // Connect recover password button
    const btnRecover = document.getElementById('btn-do-recover');
    if (btnRecover) {
      const newBtnRecover = btnRecover.cloneNode(true);
      btnRecover.parentNode.replaceChild(newBtnRecover, btnRecover);
      newBtnRecover.addEventListener('click', () => {
        const email = document.getElementById('recover-email').value.trim();
        if (!email) {
          alert(t('errEmptyFields'));
          return;
        }

        window.AppAuth.sendPasswordResetEmail(email)
          .then(() => {
            alert(t('successRecover'));
            window.showAuthView('login');
          })
          .catch(err => {
            alert(err.message || t('errInvalidEmail'));
          });
      });
    }

    // Initialize Database
    initDatabase();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAuthEvents);
  } else {
    bindAuthEvents();
  }

  // Listen to lang changes to keep badge labels correctly translated
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') originalApplyLang();
    
    // Update live devs text
    const lblDevs = document.getElementById('lbl-live-devs');
    if (lblDevs) {
      const count = window.AppAuth.onlineUsersCount;
      const word = getLang() === 'fr' ? 'Dév Connectés' : 'Devs Online';
      lblDevs.textContent = `${count} ${word}`;
    }

    // Update modal views labels
    const currentView = document.getElementById('auth-view-register').style.display === 'block' 
      ? 'register' 
      : (document.getElementById('auth-view-recover').style.display === 'block' ? 'recover' : 'login');
    window.showAuthView(currentView);

    // Paywall Modal translations (English/French only)
    const pwTitle = document.getElementById('paywall-title');
    const pwSub = document.getElementById('paywall-subtitle');
    const pwF1 = document.getElementById('paywall-feat1');
    const pwF2 = document.getElementById('paywall-feat2');
    const pwF3 = document.getElementById('paywall-feat3');
    const pwF4 = document.getElementById('paywall-feat4');
    const pwBtn = document.getElementById('paywall-upgrade-btn');
    const pwLic = document.getElementById('paywall-license-btn');
    const pwNote = document.getElementById('paywall-price-note');

    if (getLang() === 'fr') {
      if (pwTitle) pwTitle.textContent = "IA ARCHITECTE PREMIUM";
      if (pwSub) pwSub.textContent = "Débloquez la puissance complète de création et d'exportation sans limites.";
      if (pwF1) pwF1.textContent = "Copie de code et formatage instantanés dans Monaco";
      if (pwF2) pwF2.textContent = "Exportation complète en ZIP, HTML autonome et modules JS";
      if (pwF3) pwF3.textContent = "Collaboration en temps réel via Firebase Live";
      if (pwF4) pwF4.textContent = "Pas de filigrane (watermark) sur les aperçus";
      if (pwBtn) pwBtn.textContent = "👑 Devenir Premium / Upgrade Now";
      if (pwLic) pwLic.textContent = "🔑 J'ai une clé de licence / Activer";
      if (pwNote) pwNote.textContent = "Paiement sécurisé · Annulez à tout moment · Activation instantanée";
    } else {
      if (pwTitle) pwTitle.textContent = "IA ARCHITECTE PREMIUM";
      if (pwSub) pwSub.textContent = "Unlock the full power of creation and export without limits.";
      if (pwF1) pwF1.textContent = "Instant code copy and formatting in Monaco";
      if (pwF2) pwF2.textContent = "Full export in ZIP, standalone HTML and JS modules";
      if (pwF3) pwF3.textContent = "Real-time collaboration via Firebase Live";
      if (pwF4) pwF4.textContent = "No watermark on preview stages";
      if (pwBtn) pwBtn.textContent = "👑 Upgrade Now / Become Premium";
      if (pwLic) pwLic.textContent = "🔑 I have a License Key / Redeem Key";
      if (pwNote) pwNote.textContent = "Secure payment · Cancel anytime · Instant activation";
    }
  };

  // Wire presence update on count change
  window.AppAuth.onOnlineUserCountChange((count) => {
    const lblDevs = document.getElementById('lbl-live-devs');
    if (lblDevs) {
      const word = getLang() === 'fr' ? 'Dév Connectés' : 'Devs Online';
      lblDevs.textContent = `${count} ${word}`;
    }
  });

})();
