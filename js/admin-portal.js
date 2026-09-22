/* ============================================================
   IA CODE STUDIO — Admin Portal, Modals & Firebase Auth Logic
   ============================================================ */

            function checkPremiumPortal() {
                const btn = document.getElementById('portal-premium-btn');
                if (!btn) return;
                
                // 1. Get current logged user
                const session = localStorage.getItem('genius_session');
                if (!session) {
                    btn.classList.remove('active-sub');
                    btn.innerText = '💎 Devenir Premium ($10/mo)';
                    return;
                }
                
                const user = JSON.parse(session);
                const email = user.email.toLowerCase();
                
                // Admin bypass (matching premium-lock.js)
                if (email === 'andart1174@gmail.com') {
                    btn.classList.add('active-sub');
                    btn.innerText = currentLang === 'fr' ? '✅ Premium ACTIV (Admin)' : '✅ Premium ACTIVE (Admin)';
                    return;
                }
                
                // 2. Check in premium database
                const premiumList = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
                const record = premiumList.find(p => p.email.toLowerCase() === email);
                
                if (record) {
                    const now = Date.now();
                    const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
                    const daysLeft = Math.ceil((expiry - now) / 86400000);
                    const isUnlimited = record.days === 9999;
                    
                    if (isUnlimited || daysLeft > 0) {
                        btn.classList.add('active-sub');
                        btn.innerText = '✅ Premium ACTIV (' + (isUnlimited ? 'Illimité' : daysLeft + ' jours restants') + ')';
                        return;
                    }
                }

                // Not premium
                btn.classList.remove('active-sub');
                btn.innerText = '💎 Devenir Premium ($10/mo)';
            }
            function triggerPremiumPortal() {
                window.open('https://buy.stripe.com/bJecN61Fk3staax7mGbfO03', '_blank');
            }
            document.addEventListener('DOMContentLoaded', checkPremiumPortal);

            /* Local Modal Scripts */
            function openModal(id) {
                const m = document.getElementById('modal-' + id);
                if (m) {
                    m.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                if (id === 'admin' && typeof refreshAdminStats === 'function') {
                    refreshAdminStats();
                }
            }
            function closeModal(id) {
                const m = document.getElementById('modal-' + id);
                if (m) {
                    m.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            window.openModal = openModal;
            window.closeModal = closeModal;

            /* ============================================================
               AUTH SYSTEM — Login + Register + Google Auth + Admin Panel
               ============================================================ */

            // Initialize Firebase
            const firebaseConfig = {
              apiKey: "AIzaSyBXJ0LstZF7c3-GI2eDtv6V7vsx0scgXHk",
              authDomain: "ia-codestudio.firebaseapp.com",
              projectId: "ia-codestudio",
              storageBucket: "ia-codestudio.firebasestorage.app",
              messagingSenderId: "977495027432",
              appId: "1:977495027432:web:fb93e8ae7712c70df2635d",
              measurementId: "G-YVNWE5Q6KB"
            };

            if (typeof firebase !== 'undefined') {
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
            }
            const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
            const auth = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth() : null;

            let isSignUpMode = false;
            let isRecoveryMode = false;

            function toggleAuthMode(e) {
                if(e) e.preventDefault();
                isSignUpMode = !isSignUpMode;
                isRecoveryMode = false;
                updateAuthUI();
            }

            function toggleRecoveryMode(e) {
                if(e) e.preventDefault();
                isRecoveryMode = true;
                isSignUpMode = false;
                updateAuthUI();
            }

            async function handleGoogleSignIn() {
                const errBox = document.getElementById('auth-error');
                if (errBox) errBox.style.display = 'none';

                try {
                    if (typeof firebase === 'undefined' || typeof firebase.auth !== 'function') {
                        throw new Error(currentLang === 'fr' ? "Service d'authentification indisponible." : "Authentication service unavailable.");
                    }

                    const provider = new firebase.auth.GoogleAuthProvider();
                    provider.setCustomParameters({ prompt: 'select_account' });

                    const result = await firebase.auth().signInWithPopup(provider);
                    const user = result.user;
                    if (!user || !user.email) {
                        throw new Error("No user email returned");
                    }

                    const email = user.email.toLowerCase();
                    const isAdmin = email === 'andart1174@gmail.com';
                    const displayName = user.displayName || email.split('@')[0];
                    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff&bold=true`;

                    // Check if banned
                    if (db) {
                        try {
                            const userDoc = await db.collection('users').doc(email).get();
                            if (userDoc.exists && userDoc.data().banned === true) {
                                await firebase.auth().signOut();
                                if (errBox) {
                                    errBox.textContent = currentLang === 'en' ? "Your account has been banned." : "Votre compte a été banni.";
                                    errBox.style.display = 'block';
                                }
                                return;
                            }
                        } catch(e) {
                            console.log("Ban check warning:", e);
                        }
                    }

                    // Save session
                    const sessionUser = {
                        email: email,
                        name: displayName,
                        role: isAdmin ? 'Admin' : 'User',
                        photoURL: photoURL,
                        uid: user.uid,
                        loginAt: Date.now()
                    };
                    localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                    localStorage.setItem('custom_display_name_' + email, displayName);

                    // Sync with Firestore users collection
                    if (db) {
                        const userData = {
                            email: email,
                            displayName: displayName,
                            name: displayName,
                            photoURL: photoURL,
                            uid: user.uid,
                            role: isAdmin ? 'Admin' : 'User',
                            lastLogin: Date.now(),
                            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                        };
                        try {
                            await db.collection('users').doc(email).set(userData, { merge: true });
                            if (user.uid) {
                                await db.collection('users').doc(user.uid).set(userData, { merge: true });
                            }
                        } catch(e) {
                            console.log("Firestore user update warning:", e);
                        }
                    }

                    // Update local users array
                    let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
                    users = users.filter(u => u.email !== email);
                    users.push(sessionUser);
                    localStorage.setItem('ia_users', JSON.stringify(users));

                    // Close modal and update UI
                    closeModal('login');
                    authCheck();

                    // Sync Firebase and check premium
                    syncFirebaseWithLocal().then(() => {
                        if (typeof checkPremiumPortal === 'function') checkPremiumPortal();
                    }).catch(e => console.log(e));

                    if (isAdmin) {
                        setTimeout(() => openModal('admin'), 300);
                    }
                } catch (err) {
                    console.error("Google Auth Error:", err);
                    if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
                        return;
                    }
                    if (errBox) {
                        let msg = err.message || (currentLang === 'fr' ? "Échec de la connexion avec Google." : "Google sign in failed.");
                        if (err.code === 'auth/unauthorized-domain') {
                            msg = currentLang === 'fr' ? "Domaine non autorisé dans Firebase Console." : "Unauthorized domain in Firebase Console.";
                        }
                        errBox.textContent = msg;
                        errBox.style.display = 'block';
                    }
                }
            }
            window.handleGoogleSignIn = handleGoogleSignIn;

            function updateAuthUI() {
                const nameGroup = document.getElementById('auth-name-group');
                const title = document.getElementById('auth-title');
                const btn = document.getElementById('auth-submit-btn');
                const toggleLink = document.getElementById('auth-toggle-link');
                const forgotLink = document.getElementById('auth-forgot-link');
                const recoveryHint = document.getElementById('recovery-hint');
                const nameInput = document.getElementById('auth-name');
                const errBox = document.getElementById('auth-error');
                const googleBtn = document.getElementById('btn-google-auth');
                const divider = document.getElementById('auth-divider');
                
                if (errBox) errBox.style.display = 'none';

                const lang = (typeof currentLang !== 'undefined') ? currentLang : 'fr';
                const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};

                if (isRecoveryMode) {
                    if (nameGroup) { nameGroup.style.display = 'none'; nameInput.required = false; }
                    if (forgotLink) forgotLink.style.display = 'none';
                    if (recoveryHint) recoveryHint.style.display = 'block';
                    if (googleBtn) googleBtn.style.display = 'none';
                    if (divider) divider.style.display = 'none';
                    if (title) {
                        title.textContent = t.recovery_title || "Récupération";
                        title.setAttribute('data-i18n', 'recovery_title');
                    }
                    if (btn) {
                        btn.textContent = t.recovery_btn || "Sauvegarder et Connecter";
                        btn.setAttribute('data-i18n', 'recovery_btn');
                    }
                    if (toggleLink) {
                        toggleLink.textContent = t.login_has_account || "Déjà un compte ? Connectez-vous";
                        toggleLink.setAttribute('data-i18n', 'login_has_account');
                        toggleLink.onclick = (e) => { e.preventDefault(); isRecoveryMode=false; isSignUpMode=false; updateAuthUI(); };
                    }
                } else if (isSignUpMode) {
                    if (nameGroup) { nameGroup.style.display = 'block'; nameInput.required = true; }
                    if (forgotLink) forgotLink.style.display = 'none';
                    if (recoveryHint) recoveryHint.style.display = 'none';
                    if (googleBtn) googleBtn.style.display = 'flex';
                    if (divider) divider.style.display = 'flex';
                    if (title) {
                        title.textContent = t.signup_title || "Créer un compte";
                        title.setAttribute('data-i18n', 'signup_title');
                    }
                    if (btn) {
                        btn.textContent = t.signup_btn || "S'inscrire";
                        btn.setAttribute('data-i18n', 'signup_btn');
                    }
                    if (toggleLink) {
                        toggleLink.textContent = t.login_has_account || "Déjà un compte ? Connectez-vous";
                        toggleLink.setAttribute('data-i18n', 'login_has_account');
                        toggleLink.onclick = toggleAuthMode;
                    }
                } else {
                    if (nameGroup) { nameGroup.style.display = 'none'; nameInput.required = false; }
                    if (forgotLink) forgotLink.style.display = 'inline-block';
                    if (recoveryHint) recoveryHint.style.display = 'none';
                    if (googleBtn) googleBtn.style.display = 'flex';
                    if (divider) divider.style.display = 'flex';
                    if (title) {
                        title.textContent = t.login_title || "Se connecter";
                        title.setAttribute('data-i18n', 'login_title');
                    }
                    if (btn) {
                        btn.textContent = t.login_btn || "Connexion";
                        btn.setAttribute('data-i18n', 'login_btn');
                    }
                    if (toggleLink) {
                        toggleLink.textContent = t.login_no_account || "Pas de compte ? Inscrivez-vous";
                        toggleLink.setAttribute('data-i18n', 'login_no_account');
                        toggleLink.onclick = toggleAuthMode;
                    }
                }
            }

            function authCheck() {
                const session = localStorage.getItem('genius_session');
                const loginBtn = document.getElementById('login-nav-btn');
                const userBtn  = document.getElementById('user-nav-btn');
                const userName = document.getElementById('user-nav-name');
                const userAvatar = document.getElementById('user-nav-avatar');
                const adminBadge = document.querySelector('.admin-badge');
                
                if (session) {
                    try {
                        const user = JSON.parse(session);
                        
                        // Force upgrade if they have an old cached session as standard user
                        if (user.email && user.email.toLowerCase() === 'andart1174@gmail.com' && user.role !== 'Admin') {
                            user.role = 'Admin';
                            localStorage.setItem('genius_session', JSON.stringify(user));
                        }

                        if (loginBtn) loginBtn.style.display = 'none';
                        if (userBtn)  { userBtn.style.display = 'flex'; }
                        if (userName) userName.textContent = user.name || (user.email ? user.email.split('@')[0] : 'User');

                        if (userAvatar) {
                            if (user.photoURL) {
                                userAvatar.innerHTML = `<img src="${user.photoURL}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;vertical-align:middle;" />`;
                            } else {
                                userAvatar.textContent = '👤';
                            }
                        }

                        if (user.role === 'Admin') {
                            if (adminBadge) adminBadge.style.display = 'inline-block';
                            userBtn.onclick = () => openModal('admin');
                        } else {
                            if (adminBadge) adminBadge.style.display = 'none';
                            userBtn.onclick = () => {
                                const profName = document.getElementById('user-profile-name');
                                const profEmail = document.getElementById('user-profile-email');
                                const profAv = document.getElementById('user-profile-avatar');
                                if (profName) profName.textContent = user.name || 'User';
                                if (profEmail) profEmail.textContent = user.email || '';
                                if (profAv) {
                                    if (user.photoURL) {
                                        profAv.innerHTML = `<img src="${user.photoURL}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid #8b5cf6;" />`;
                                    } else {
                                        profAv.textContent = '👤';
                                    }
                                }
                                openModal('user');
                            };
                        }
                    } catch(e) {
                        console.error("authCheck parse error:", e);
                        localStorage.removeItem('genius_session');
                        if (loginBtn) loginBtn.style.display = 'flex';
                        if (userBtn)  userBtn.style.display  = 'none';
                    }
                } else {
                    if (loginBtn) loginBtn.style.display = 'flex';
                    if (userBtn)  userBtn.style.display  = 'none';
                }
            }

            // ============ FIREBASE SYNC OVERRIDE ============
            async function syncFirebaseWithLocal() {
                if (!db) return;
                try {
                    const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout Firebase")), ms));
                    
                    const session = localStorage.getItem('genius_session');
                    if (!session) return;
                    
                    const currentUser = JSON.parse(session);
                    const email = currentUser.email.toLowerCase();
                    const isAdmin = currentUser.role === 'Admin' || email === 'andart1174@gmail.com';

                    if (isAdmin) {
                        // Admin Sync (Read-only download to localStorage, no write-back)
                        
                        // 1. Users Sync
                        const uSnap = await Promise.race([db.collection('users').get(), timeout(5000)]);
                        const memU = [];
                        uSnap.forEach(d => {
                            const data = d.data();
                            if (data && data.email) memU.push(data);
                        });
                        localStorage.setItem('ia_users', JSON.stringify(memU));

                        // 2. Messages Sync
                        const mSnap = await Promise.race([db.collection('messages').get(), timeout(5000)]);
                        const memM = [];
                        mSnap.forEach(d => {
                            const data = d.data();
                            if (data && data.email) memM.push(data);
                        });
                        memM.sort((a,b) => b.date - a.date);
                        localStorage.setItem('ia_messages', JSON.stringify(memM));

                        // 3. Premium Sync
                        const pSnap = await Promise.race([db.collection('premium').get(), timeout(5000)]);
                        const memP = [];
                        pSnap.forEach(d => {
                            const data = d.data();
                            if (data && data.email) memP.push(data);
                        });
                        localStorage.setItem('ia_premium_users', JSON.stringify(memP));

                    } else {
                        // Standard User Sync (Sync ONLY own records, no global database dump)
                        
                        // 1. Fetch own user doc (for bans / updates)
                        try {
                            const uDoc = await Promise.race([db.collection('users').doc(email).get(), timeout(3000)]);
                            if (uDoc.exists) {
                                const data = uDoc.data();
                                if (data.banned === true) {
                                    currentUser.banned = true;
                                    localStorage.setItem('genius_session', JSON.stringify(currentUser));
                                }
                            }
                        } catch(e) { console.log("User doc sync warning:", e); }

                        // 2. Fetch own premium doc
                        try {
                            const pDoc = await Promise.race([db.collection('premium').doc(email).get(), timeout(3000)]);
                            if (pDoc.exists) {
                                const data = pDoc.data();
                                localStorage.setItem('ia_premium_users', JSON.stringify([data]));
                            } else {
                                localStorage.setItem('ia_premium_users', '[]');
                            }
                        } catch(e) {
                            console.log("Premium doc sync warning:", e);
                        }
                    }
                    
                    if (document.getElementById('firebase-status')) document.getElementById('firebase-status').innerHTML = 'Firebase: <span style="color:#10b981">Connected ✅</span>';
                } catch(e) {
                    console.log("Firebase sync warning:", e);
                    if (document.getElementById('firebase-status')) document.getElementById('firebase-status').innerHTML = 'Firebase: <span style="color:#ef4444">Error Syncing ❌</span>';
                }
            }

            async function handleAuthSubmit(e) {
                e.preventDefault();
                const email = document.getElementById('auth-email').value.trim().toLowerCase();
                const password = document.getElementById('auth-password').value;
                const name = document.getElementById('auth-name').value.trim();
                const errBox = document.getElementById('auth-error');
                const btn = document.getElementById('auth-submit-btn');

                btn.disabled = true;
                btn.textContent = '⏳...';

                setTimeout(async () => {
                    let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
                    const isAdmin = email === 'andart1174@gmail.com';

                    // Check if banned first in firebase
                    try {
                        const fbUserDoc = await db.collection('users').doc(email).get();
                        if (fbUserDoc.exists && fbUserDoc.data().banned === true) {
                            errBox.textContent = currentLang === 'en' ? "Your account has been banned." : "Votre compte a été banni.";
                            errBox.style.display = 'block';
                            btn.disabled = false;
                            btn.textContent = isRecoveryMode ? "Sauvegarder" : "Connexion";
                            return;
                        }
                    } catch(err) { console.log(err); }

                    if (isRecoveryMode) {
                        let userToReset = users.find(u => u.email === email);
                        if (!userToReset && db) {
                            try {
                                const doc = await db.collection('users').doc(email).get();
                                if (doc.exists) userToReset = doc.data();
                            } catch(e) { console.log(e); }
                        }
                        if (!userToReset && isAdmin) {
                            userToReset = { email: email, password: password, name: 'Admin', role: 'Admin', createdAt: Date.now() };
                            users.push(userToReset);
                        }

                        if (userToReset) {
                            userToReset.password = password;
                            if (isAdmin && userToReset.role !== 'Admin') userToReset.role = 'Admin';
                            
                            try {
                                await db.collection('users').doc(userToReset.email).set(userToReset);
                            } catch(e) { console.log(e); }
                            
                            users = users.filter(u => u.email !== userToReset.email);
                            users.push(userToReset);
                            localStorage.setItem('ia_users', JSON.stringify(users));
                            
                            const sessionUser = { email: userToReset.email, name: userToReset.name, role: userToReset.role, loginAt: Date.now() };
                            localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                            errBox.style.display = 'none';
                            closeModal('login');
                            authCheck();
                            syncFirebaseWithLocal().then(() => { if (typeof checkPremiumPortal === 'function') checkPremiumPortal(); }).catch(e => console.log(e));
                            if (userToReset.role === 'Admin') setTimeout(() => openModal('admin'), 300);
                        } else {
                            errBox.textContent = currentLang === 'en' ? "Account not found." : "Compte introuvable.";
                            errBox.style.display = 'block';
                        }
                    } else if (isSignUpMode) {
                        let existingUser = users.find(u => u.email === email);
                        if (!existingUser && db) {
                            try {
                                const doc = await db.collection('users').doc(email).get();
                                if (doc.exists) existingUser = doc.data();
                            } catch(e) { console.log(e); }
                        }
                        if (existingUser) {
                            errBox.textContent = currentLang === 'en' ? "Email already registered." : "Email déjà utilisé.";
                            errBox.style.display = 'block';
                        } else {
                            const finalName = name || email.split('@')[0];
                            const newUser = { email, password, name: finalName, role: isAdmin ? 'Admin' : 'User', createdAt: Date.now() };
                            
                            try {
                                await db.collection('users').doc(newUser.email).set(newUser);
                            } catch(e) { console.log(e); }
                            
                            users.push(newUser);
                            localStorage.setItem('ia_users', JSON.stringify(users));
                            
                            const sessionUser = { email: newUser.email, name: newUser.name, role: newUser.role, loginAt: Date.now() };
                            localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                            errBox.style.display = 'none';
                            closeModal('login');
                            authCheck();
                            syncFirebaseWithLocal().then(() => { if (typeof checkPremiumPortal === 'function') checkPremiumPortal(); }).catch(e => console.log(e));
                            if(isAdmin) setTimeout(() => openModal('admin'), 300);
                        }
                    } else {
                        let match = users.find(u => u.email === email && u.password === password);
                        if (!match) {
                            const LEGACY_ADMINS = [
                                { email: 'admin@ia-codestudio.com', password: 'admin2026', name: 'André Admin', role: 'Admin' },
                                { email: 'admin@aistudio.com',      password: 'aistudio2026', name: 'Super Admin', role: 'Admin' }
                            ];
                            match = LEGACY_ADMINS.find(u => u.email === email && u.password === password);
                        }
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
                            } catch(e) { console.log(e); }
                        }
                        
                        if (match) {
                            if (isAdmin && match.role !== 'Admin') {
                                match.role = 'Admin';
                                localStorage.setItem('ia_users', JSON.stringify(users));
                            }
                            
                            const sessionUser = { email: match.email, name: match.name, role: match.role, loginAt: Date.now() };
                            localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                            errBox.style.display = 'none';
                            closeModal('login');
                            authCheck();
                            syncFirebaseWithLocal().then(() => { if (typeof checkPremiumPortal === 'function') checkPremiumPortal(); }).catch(e => console.log(e));
                            if (match.role === 'Admin') setTimeout(() => openModal('admin'), 300);
                        } else {
                            errBox.textContent = translations[currentLang]?.login_error || "Email ou mot de passe incorrect.";
                            errBox.style.display = 'block';
                        }
                    }
                    
                    btn.disabled = false;
                    btn.textContent = isRecoveryMode ? (translations[currentLang].recovery_btn || "Sauvegarder") : 
                                      isSignUpMode ? (translations[currentLang].signup_btn || "S'inscrire") : 
                                      (translations[currentLang].login_btn || "Connexion");
                }, 600);
            }

            function adminLog(msg) {
                console.log("[ADMIN LOG]:", msg);
                logCopilotMessage(`⚙️ ${msg}`, '#94a3b8');
            }

            function getPremiumUsers() {
                const raw = localStorage.getItem('ia_premium_users');
                return raw ? JSON.parse(raw) : [];
            }

            function savePremiumUsers(list) {
                localStorage.setItem('ia_premium_users', JSON.stringify(list));
            }

            async function adminAddPremiumUser() {
                const emailInput = document.getElementById('premium-user-email');
                const daysSelect = document.getElementById('premium-duration');
                if (!emailInput || !daysSelect) return;
                const email = emailInput.value.trim().toLowerCase();
                const days = parseInt(daysSelect.value);
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    adminLog('⚠️ Email address format invalid.');
                    emailInput.focus();
                    return;
                }
                const list = getPremiumUsers();
                const existing = list.findIndex(u => u.email === email);
                const pData = { email, addedAt: Date.now(), days };
                
                if (existing >= 0) {
                    list[existing] = pData;
                    adminLog('Mis à jour premium pour: ' + email);
                } else {
                    list.push(pData);
                    adminLog('Activé premium pour: ' + email);
                }
                
                try {
                    await db.collection('premium').doc(pData.email).set(pData);
                } catch(e) { console.log('Firebase Sync Error', e); }

                savePremiumUsers(list);
                emailInput.value = '';
                refreshAdminStats();
            }

            async function refreshAdminStats() {
                try {
                    const premiumUsers = getPremiumUsers().filter(u => u && u.email);
                    const allUsers = JSON.parse(localStorage.getItem('ia_users') || '[]').filter(u => u && u.email);
                    
                    document.getElementById('stat-users-count').textContent = allUsers.length;
                    const activePremiumCount = premiumUsers.filter(u => {
                        if (!u || !u.email) return false;
                        if (u.days === 9999) return true;
                        const expiryDate = (u.addedAt || 0) + (u.days || 0) * 86400000;
                        return expiryDate > Date.now();
                    }).length;
                    document.getElementById('stat-premium-count').textContent = activePremiumCount;
                    
                    const now = Date.now();
                    const newUsersToday = allUsers.filter(u => u.createdAt && (now - u.createdAt) < 86400000).length;
                    
                    const session = localStorage.getItem('genius_session');
                    if (session) {
                        try {
                            const user = JSON.parse(session);
                            const welcomeEls = document.querySelectorAll('#admin-welcome-msg');
                            welcomeEls.forEach(el => el.textContent = `Bienvenue, ${user.name} 👑`);
                        } catch(e) {}
                    }
                    
                    renderAllUsersAdmin();
                    loadChallengesTab();
                    loadFeedModerationTab();
                    loadMessagesTab();
                    
                    // Update global settings checkbox
                    db.collection('admin_config').doc('global').get().then(doc => {
                        if (doc.exists) {
                            const checkbox = document.getElementById('admin-profanity-checkbox');
                            if (checkbox) checkbox.checked = doc.data().profanityFilter;
                        }
                    });
                } catch(e) {
                     console.log(e);
                }
            }

            function renderAllUsersAdmin() {
                const list = JSON.parse(localStorage.getItem('ia_users') || '[]');
                const container = document.getElementById('admin-users-table-body');
                if (!container) return;
                
                container.innerHTML = '';
                
                // Filtrează elementele corupte sau fără email
                const validList = list.filter(u => u && u.email);
                
                if (validList.length === 0) {
                    container.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b; padding:20px; font-style:italic;">No users found.</td></tr>`;
                    return;
                }
                
                let bannedCount = 0;
                
                validList.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0)).forEach(u => {
                    const isAdm = u.role === 'Admin';
                    const isBanned = u.banned === true;
                    if (isBanned) bannedCount++;
                    
                    const premiumUsers = getPremiumUsers();
                    const premiumRec = premiumUsers.find(p => p && p.email && p.email.toLowerCase() === u.email.toLowerCase());
                    let isPremium = false;
                    let premiumLabel = "Free";
                    if (premiumRec) {
                        const expiry = (premiumRec.addedAt || 0) + (premiumRec.days || 0) * 86400000;
                        if (premiumRec.days === 9999 || expiry > Date.now()) {
                            isPremium = true;
                            premiumLabel = premiumRec.days === 9999 ? "Premium (Lifetime)" : `Premium (${Math.ceil((expiry - Date.now())/86400000)}d left)`;
                        }
                    }
                    
                    const roleBadge = isAdm ? `<span style="background:rgba(139,92,246,0.2); color:#c4b5fd; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">Admin</span>` : 
                                              `<span style="background:rgba(148,163,184,0.1); color:#94a3b8; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">User</span>`;
                    
                    const planBadge = isPremium ? `<span style="background:rgba(245,158,11,0.2); color:#fbbf24; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">${premiumLabel}</span>` : 
                                                 `<span style="background:rgba(148,163,184,0.1); color:#94a3b8; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">Free</span>`;
                    
                    const tr = document.createElement('tr');
                    tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                    
                    const banButtonText = isBanned ? "Unban" : "Ban";
                    const banButtonColor = isBanned ? "#10b981" : "#ef4444";
                    const banButtonBg = isBanned ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)";
                    const banButtonBorder = isBanned ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)";
                    
                    const premButtonText = isPremium ? "Revoke 💎" : "Grant 💎";
                    const premButtonColor = isPremium ? "#f87171" : "#fbbf24";
                    const premButtonBg = isPremium ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)";
                    const premButtonBorder = isPremium ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)";
                    
                    const uNameSafe = u.name || "Utilisateur sans nom";
                    const uEmailSafe = u.email;
                    
                    tr.innerHTML = `
                        <td style="padding:10px 8px; font-weight:700; color:#fff;">${uNameSafe}</td>
                        <td style="padding:10px 8px; color:#cbd5e1;">${uEmailSafe}</td>
                        <td style="padding:10px 8px;">
                            <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
                                ${roleBadge}
                                ${planBadge}
                            </div>
                        </td>
                        <td style="padding:10px 8px; text-align:right;">
                            <div style="display:flex; gap:6px; justify-content:flex-end;">
                                <button onclick="adminToggleBan('${uEmailSafe}', ${isBanned})" style="background:${banButtonBg}; border:1px solid ${banButtonBorder}; color:${banButtonColor}; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:700;">
                                    ${banButtonText}
                                </button>
                                <button onclick="adminTogglePremiumLink('${uEmailSafe}', ${isPremium})" style="background:${premButtonBg}; border:1px solid ${premButtonBorder}; color:${premButtonColor}; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:700;">
                                    ${premButtonText}
                                </button>
                            </div>
                        </td>
                    `;
                    container.appendChild(tr);
                });
                
                const statBanned = document.getElementById('stat-banned-count');
                if (statBanned) statBanned.textContent = bannedCount;
            }

            async function adminToggleBan(email, isCurrentlyBanned) {
                const action = isCurrentlyBanned ? "unban" : "ban";
                if (!confirm(`Are you sure you want to ${action} ${email}?`)) return;
                
                try {
                    await db.collection('users').doc(email).update({ banned: !isCurrentlyBanned });
                    adminLog(`User ${email} has been ${isCurrentlyBanned ? 'unbanned' : 'banned'}`);
                    
                    let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
                    let idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
                    if (idx >= 0) {
                        users[idx].banned = !isCurrentlyBanned;
                        localStorage.setItem('ia_users', JSON.stringify(users));
                    }
                    
                    refreshAdminStats();
                } catch(e) {
                    console.error("Error banning user:", e);
                    adminLog("❌ Error toggling ban: " + e.message);
                }
            }
            
            async function adminTogglePremiumLink(email, isCurrentlyPremium) {
                const targetEmail = email.trim().toLowerCase();
                if (isCurrentlyPremium) {
                    if (!confirm(`Revoke premium access for ${targetEmail}?`)) return;
                    let list = getPremiumUsers();
                    let idx = list.findIndex(u => u.email.toLowerCase() === targetEmail);
                    if (idx >= 0) {
                        list.splice(idx, 1);
                        savePremiumUsers(list);
                        try {
                            await db.collection('premium').doc(targetEmail).delete();
                            adminLog(`Premium access revoked for: ${targetEmail}`);
                            refreshAdminStats();
                        } catch(e) {
                            console.error(e);
                        }
                    }
                } else {
                    document.getElementById('premium-user-email').value = targetEmail;
                    document.getElementById('premium-user-email').focus();
                    adminLog(`Enter duration and click Grant Premium for ${targetEmail}`);
                }
            }

            async function adminToggleProfanityFilter(checkbox) {
                const active = checkbox.checked;
                try {
                    await db.collection('admin_config').doc('global').set({ profanityFilter: active });
                    adminLog(`Profanity Filter toggled: ${active ? 'ON' : 'OFF'}`);
                } catch(e) {
                    console.error("Error toggling profanity filter:", e);
                    adminLog("❌ Error: " + e.message);
                }
            }

            async function adminPublishChallenge() {
                const titleEn = document.getElementById('challenge-title-en').value.trim();
                const titleFr = document.getElementById('challenge-title-fr').value.trim();
                const descEn = document.getElementById('challenge-desc-en').value.trim();
                const descFr = document.getElementById('challenge-desc-fr').value.trim();
                const expiryInput = document.getElementById('challenge-expiry').value;
                const reward = document.getElementById('challenge-reward').value.trim();
                
                if (!titleEn || !titleFr || !descEn || !descFr || !expiryInput || !reward) {
                    alert("Please fill all fields for the challenge.");
                    return;
                }
                
                const expiryMs = new Date(expiryInput).getTime();
                const newChallenge = {
                    id: String(Date.now()),
                    title_en: titleEn,
                    title_fr: titleFr,
                    desc_en: descEn,
                    desc_fr: descFr,
                    expiry: expiryMs,
                    reward: reward,
                    createdAt: Date.now()
                };
                
                try {
                    await db.collection('devsocial_challenges').doc(newChallenge.id).set(newChallenge);
                    adminLog(`Challenge published: ${titleEn}`);
                    
                    document.getElementById('challenge-title-en').value = '';
                    document.getElementById('challenge-title-fr').value = '';
                    document.getElementById('challenge-desc-en').value = '';
                    document.getElementById('challenge-desc-fr').value = '';
                    document.getElementById('challenge-expiry').value = '';
                    document.getElementById('challenge-reward').value = '';
                    
                    loadChallengesTab();
                } catch(e) {
                    console.error("Error publishing challenge:", e);
                    adminLog("❌ Error: " + e.message);
                }
            }
            
            let challengeTimerInterval = null;
            function loadChallengesTab() {
                db.collection('devsocial_challenges').orderBy('createdAt', 'desc').limit(1).get().then(snap => {
                    if (!snap.empty) {
                        let active = snap.docs[0].data();
                        document.getElementById('active-challenge-title').textContent = currentLang === 'fr' ? active.title_fr : active.title_en;
                        document.getElementById('active-challenge-desc').textContent = currentLang === 'fr' ? active.desc_fr : active.desc_en;
                        document.getElementById('active-challenge-reward').textContent = active.reward;
                        
                        const expDate = new Date(active.expiry);
                        document.getElementById('active-challenge-expiry-date').textContent = expDate.toLocaleDateString() + ' ' + expDate.toLocaleTimeString();
                        
                        if (challengeTimerInterval) clearInterval(challengeTimerInterval);
                        
                        function updateTimer() {
                            const diff = active.expiry - Date.now();
                            const timerEl = document.getElementById('active-challenge-timer');
                            if (!timerEl) return;
                            if (diff <= 0) {
                                timerEl.textContent = "EXPIRED";
                                timerEl.style.color = "#ef4444";
                                clearInterval(challengeTimerInterval);
                            } else {
                                const h = Math.floor(diff / 3600000);
                                const m = Math.floor((diff % 3600000) / 60000);
                                const s = Math.floor((diff % 60000) / 1000);
                                timerEl.textContent = `${h}h ${m}m ${s}s left`;
                                timerEl.style.color = "#10b981";
                            }
                        }
                        updateTimer();
                        challengeTimerInterval = setInterval(updateTimer, 1000);
                    }
                });
                
                db.collection('devsocial_challenges').orderBy('createdAt', 'desc').limit(5).get().then(snap => {
                    const container = document.getElementById('admin-past-challenges-list');
                    if (!container) return;
                    container.innerHTML = '';
                    snap.forEach(doc => {
                        const c = doc.data();
                        const row = document.createElement('div');
                        row.style = 'background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:10px; font-size:12px; display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;';
                        row.innerHTML = `
                            <div>
                                <span style="font-weight:700; color:#fff;">${currentLang === 'fr' ? c.title_fr : c.title_en}</span>
                                <div style="font-size:10px; color:#64748b;">Reward: ${c.reward}</div>
                            </div>
                            <button onclick="adminDeleteChallenge('${c.id}')" style="background:none; border:none; color:#f87171; cursor:pointer;" title="Delete">✕</button>
                        `;
                        container.appendChild(row);
                    });
                });
            }
            
            async function adminDeleteChallenge(id) {
                if (!confirm("Delete this challenge?")) return;
                try {
                    await db.collection('devsocial_challenges').doc(id).delete();
                    adminLog("Challenge deleted.");
                    loadChallengesTab();
                } catch(e) {
                    console.error("Error deleting challenge:", e);
                }
            }

            function loadFeedModerationTab() {
                db.collection('devsocial_posts').orderBy('createdAt', 'desc').get().then(snap => {
                    const container = document.getElementById('admin-feed-table-body');
                    if (!container) return;
                    container.innerHTML = '';
                    
                    if (snap.empty) {
                        container.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b; padding:20px; font-style:italic;">No posts found.</td></tr>`;
                        return;
                    }
                    
                    snap.forEach(doc => {
                        const p = doc.data();
                        const isReported = p.reports && p.reports > 0;
                        
                        const tr = document.createElement('tr');
                        tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                        if (isReported) {
                            tr.style.background = 'rgba(239,68,68,0.03)';
                        }
                        
                        const reportsVal = isReported ? `<span style="color:#ef4444; font-weight:900;">⚠️ ${p.reports} reports</span>` : `<span style="color:#64748b;">0</span>`;
                        const captionPreview = p.caption_en || p.caption || p.caption_fr || '';
                        
                        tr.innerHTML = `
                            <td style="padding:10px 8px; font-weight:700; color:#fff;">${p.user}</td>
                            <td style="padding:10px 8px; color:#cbd5e1; max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${captionPreview.replace(/"/g, '&quot;')}">${captionPreview}</td>
                            <td style="padding:10px 8px;">${reportsVal}</td>
                            <td style="padding:10px 8px; text-align:right;">
                                <div style="display:flex; gap:6px; justify-content:flex-end;">
                                    ${isReported ? `
                                    <button onclick="adminClearReports('${p.id}')" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); color:#10b981; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:700;">
                                        Clear Flags
                                    </button>
                                    ` : ''}
                                    <button onclick="adminDeletePost('${p.id}')" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); color:#f87171; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:700;">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        `;
                        container.appendChild(tr);
                    });
                });
            }
            
            async function adminClearReports(postId) {
                try {
                    await db.collection('devsocial_posts').doc(String(postId)).update({ reports: 0 });
                    adminLog(`Flags cleared for post ${postId}`);
                    loadFeedModerationTab();
                } catch(e) {
                    console.error("Error clearing flags:", e);
                }
            }
            
            async function adminDeletePost(postId) {
                if (!confirm("Are you sure you want to delete this post globally?")) return;
                try {
                    await db.collection('devsocial_posts').doc(String(postId)).delete();
                    adminLog(`Post ${postId} deleted globally.`);
                    loadFeedModerationTab();
                } catch(e) {
                    console.error("Error deleting post:", e);
                }
            }

            async function loadMessagesTab() {
                const container = document.getElementById('admin-messages-list');
                if (!container) return;
                
                try {
                    const snap = await db.collection('messages').orderBy('date', 'desc').get();
                    container.innerHTML = '';
                    
                    if (snap.empty) {
                        container.innerHTML = `<div style="text-align:center; color:#64748b; padding:20px; font-style:italic;">No messages.</div>`;
                        return;
                    }
                    
                    snap.forEach(doc => {
                        const m = doc.data();
                        const id = doc.id;
                        const dateStr = new Date(m.date).toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US');
                        const replied = m.replied === true;
                        
                        const card = document.createElement('div');
                        card.style = 'background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 8px; text-align: left;';
                        
                        let replyHtml = '';
                        if (replied) {
                            const rDateStr = m.repliedAt ? new Date(m.repliedAt).toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US') : '';
                            replyHtml = `
                                <div style="background: rgba(245, 158, 11, 0.05); border-left: 3px solid #fbbf24; padding: 8px 12px; border-radius: 4px; margin-top: 8px; font-size: 13px;">
                                    <div style="font-weight: 700; color: #fbbf24; display: flex; justify-content: space-between; margin-bottom: 4px;">
                                        <span>Re: Reply Sent</span>
                                        <span style="font-size: 11px; color: #64748b;">${rDateStr}</span>
                                    </div>
                                    <div style="color: #cbd5e1; white-space: pre-wrap; line-height: 1.4;">${m.replyText}</div>
                                </div>
                            `;
                        } else {
                            replyHtml = `
                                <div id="reply-box-${id}" style="display: none; flex-direction: column; gap: 8px; margin-top: 10px; background: rgba(139, 92, 246, 0.03); border: 1px solid rgba(139, 92, 246, 0.1); padding: 12px; border-radius: 8px;">
                                    <textarea id="reply-input-${id}" placeholder="${currentLang === 'fr' ? 'Écrivez votre réponse ici...' : 'Type your reply here...'}" rows="3" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 8px 12px; font-size: 13px; font-family: inherit; resize: vertical; outline: none;"></textarea>
                                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                                        <button onclick="adminSendReply('${id}', '${m.email}', '${m.name.replace(/'/g, "\\'")}', '${m.message.replace(/\n/g, '\\n').replace(/'/g, "\\'")}')" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;">
                                            Send Reply & Email ✉️
                                        </button>
                                        <button onclick="document.getElementById('reply-box-${id}').style.display='none'" style="background: rgba(255,255,255,0.05); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer;">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            `;
                        }
                        
                        card.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                                <div>
                                    <span style="font-weight: 800; color: #fff; font-size: 14px;">${m.name}</span>
                                    <span style="color: #cbd5e1; font-size: 12px; margin-left: 8px;"><a href="mailto:${m.email}" style="color: #3b82f6; text-decoration: none;">${m.email}</a></span>
                                </div>
                                <span style="font-size: 11px; color: #64748b;">${dateStr}</span>
                            </div>
                            <div style="color: #e2e8f0; font-size: 13px; line-height: 1.5; white-space: pre-wrap; margin: 4px 0; background: rgba(0,0,0,0.15); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.02); text-align: left;">${m.message}</div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    ${replied ? 
                                        `<span style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">Replied</span>` : 
                                        `<span style="background: rgba(239, 68, 68, 0.15); color: #f87171; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">No Reply</span>`
                                    }
                                    ${!replied ? 
                                        `<button onclick="document.getElementById('reply-box-${id}').style.display='flex'" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 4px 8px; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 700;">Reply 💬</button>` : ''
                                    }
                                </div>
                                <button onclick="adminDeleteMessage('${id}')" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 4px 8px; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 700;">
                                    Delete ✕
                                </button>
                            </div>
                            ${replyHtml}
                        `;
                        container.appendChild(card);
                    });
                } catch(e) {
                    console.error("Error loading messages:", e);
                    container.innerHTML = '';
                    const localMsgs = JSON.parse(localStorage.getItem('ia_messages') || '[]');
                    if (localMsgs.length === 0) {
                        container.innerHTML = `<div style="text-align:center; color:#64748b; padding:20px; font-style:italic;">No messages.</div>`;
                        return;
                    }
                    localMsgs.sort((a,b) => b.date - a.date).forEach((m, idx) => {
                        const dateStr = new Date(m.date).toLocaleString();
                        const card = document.createElement('div');
                        card.style = 'background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 8px; text-align: left;';
                        card.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div>
                                    <span style="font-weight: 800; color: #fff; font-size: 14px;">${m.name}</span>
                                    <span style="color: #cbd5e1; font-size: 12px; margin-left: 8px;"><a href="mailto:${m.email}" style="color:#3b82f6; text-decoration:none;">${m.email}</a></span>
                                </div>
                                <span style="font-size: 11px; color: #64748b;">${dateStr}</span>
                            </div>
                            <div style="color: #cbd5e1; font-size: 13px; line-height: 1.4; white-space: pre-wrap; background: rgba(0,0,0,0.15); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.02); text-align: left;">${m.message}</div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">Local Cache</span>
                                <button onclick="window.location.href='mailto:${m.email}?subject=Re: IA Code Studio Contact Message'" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 4px 8px; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 700;">Reply via Email ✉️</button>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }
            }

            async function adminSendReply(msgId, email, name, originalMsg) {
                const textarea = document.getElementById(`reply-input-${msgId}`);
                if (!textarea) return;
                const replyText = textarea.value.trim();
                if (!replyText) {
                    alert("Please enter a reply message.");
                    return;
                }
                
                try {
                    await db.collection('messages').doc(msgId).update({
                        replied: true,
                        replyText: replyText,
                        repliedAt: Date.now()
                    });
                    
                    adminLog(`Replied to ${email}`);
                    
                    // Trigger mailto client
                    const subject = encodeURIComponent("Re: IA Code Studio Contact Message");
                    const body = encodeURIComponent(`Bonjour ${name},\n\n${replyText}\n\n---\nMessage original:\n"${originalMsg}"`);
                    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    
                    loadMessagesTab();
                } catch(e) {
                    console.error("Error sending reply:", e);
                    alert("Error saving reply: " + e.message);
                }
            }

            async function adminDeleteMessage(msgId) {
                if (!confirm("Are you sure you want to delete this message?")) return;
                try {
                    await db.collection('messages').doc(msgId).delete();
                    adminLog("Message deleted successfully.");
                    
                    // Also filter out of local cache
                    let lsM = JSON.parse(localStorage.getItem('ia_messages') || '[]');
                    lsM = lsM.filter(m => (m.date + '_' + m.email) !== msgId);
                    localStorage.setItem('ia_messages', JSON.stringify(lsM));
                    
                    loadMessagesTab();
                } catch(e) {
                    console.error("Error deleting message:", e);
                }
            }

            let regChart = null;
            let licenseChart = null;
            
            function renderAnalyticsCharts() {
                const allUsers = JSON.parse(localStorage.getItem('ia_users') || '[]');
                const premiumUsers = getPremiumUsers();
                
                const regDates = {};
                const now = Date.now();
                for (let i = 6; i >= 0; i--) {
                    const dateStr = new Date(now - i * 24 * 3600 * 1000).toLocaleDateString([], {month: 'short', day: 'numeric'});
                    regDates[dateStr] = 0;
                }
                
                allUsers.forEach(u => {
                    if (u.createdAt) {
                        const dateStr = new Date(u.createdAt).toLocaleDateString([], {month: 'short', day: 'numeric'});
                        if (regDates[dateStr] !== undefined) {
                            regDates[dateStr]++;
                        }
                    }
                });
                
                const labels = Object.keys(regDates);
                const regData = Object.values(regDates);
                
                const ctxReg = document.getElementById('chart-registrations');
                if (ctxReg) {
                    if (regChart) regChart.destroy();
                    const chartCtx = ctxReg.getContext('2d');
                    const gradient = chartCtx.createLinearGradient(0, 0, 0, 150);
                    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                    
                    regChart = new Chart(ctxReg, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'New Registrations',
                                data: regData,
                                borderColor: '#8b5cf6',
                                backgroundColor: gradient,
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#06b6d4',
                                pointBorderColor: '#fff',
                                pointHoverRadius: 6
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', stepSize: 1 } }
                            }
                        }
                    });
                }
                
                const premiumCount = premiumUsers.filter(u => {
                    if (u.days === 9999) return true;
                    const expiry = (u.addedAt || 0) + (u.days || 0) * 86400000;
                    return expiry > Date.now();
                }).length;
                const freeCount = Math.max(0, allUsers.length - premiumCount);
                
                const ctxLic = document.getElementById('chart-licenses');
                if (ctxLic) {
                    if (licenseChart) licenseChart.destroy();
                    licenseChart = new Chart(ctxLic, {
                        type: 'doughnut',
                        data: {
                            labels: ['Free Tier', 'Premium Members'],
                            datasets: [{
                                data: [freeCount, premiumCount],
                                backgroundColor: ['rgba(148, 163, 184, 0.6)', '#fbbf24'],
                                borderColor: 'rgba(15, 23, 42, 0.8)',
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11 } }
                                }
                            },
                            cutout: '65%'
                        }
                    });
                }
                
                db.collection('devsocial_posts').orderBy('likes', 'desc').limit(3).get().then(snap => {
                    const listContainer = document.getElementById('admin-top-forks-list');
                    if (!listContainer) return;
                    listContainer.innerHTML = '';
                    
                    if (snap.empty) {
                        listContainer.innerHTML = `<div style="text-align:center; color:#64748b; font-size:12px; font-style:italic;">No active posts to rank.</div>`;
                        return;
                    }
                    
                    let rank = 1;
                    snap.forEach(doc => {
                        const post = doc.data();
                        const card = document.createElement('div');
                        card.style = 'display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:10px 14px; font-size:13px; margin-bottom: 6px;';
                        
                        let rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
                        card.innerHTML = `
                            <div style="display:flex; align-items:center; gap:12px;">
                                <span style="font-size:1.2rem;">${rankIcon}</span>
                                <div>
                                    <span style="font-weight:700; color:#fff;">@${post.user}</span>
                                    <span style="color:#64748b; font-size:11px; margin-left:6px;">(${post.preset})</span>
                                </div>
                            </div>
                            <div style="color:#fbbf24; font-weight:700; font-size:12px;">❤️ ${post.likes || 0} Likes</div>
                        `;
                        listContainer.appendChild(card);
                        rank++;
                    });
                });
            }

            function handleCopilotKey(e) {
                if (e.key === 'Enter') submitCopilotCommand();
            }
            
            async function submitCopilotCommand() {
                const inputEl = document.getElementById('copilot-input');
                const cmd = inputEl.value.trim();
                if (!cmd) return;
                
                inputEl.value = '';
                logCopilotMessage(`> ${cmd}`, '#cbd5e1');
                
                const cmdLower = cmd.toLowerCase();
                
                if (cmdLower.startsWith('ban user ') || cmdLower.startsWith('blochează utilizatorul ')) {
                    const email = cmd.substring(cmdLower.includes('ban user ') ? 9 : 23).trim().toLowerCase();
                    if (validateEmail(email)) {
                        try {
                            await db.collection('users').doc(email).update({ banned: true });
                            let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
                            let idx = users.findIndex(u => u.email.toLowerCase() === email);
                            if (idx >= 0) {
                                users[idx].banned = true;
                                localStorage.setItem('ia_users', JSON.stringify(users));
                            }
                            logCopilotMessage(`🤖 Co-pilot: Banned user ${email} successfully.`, '#10b981');
                            refreshAdminStats();
                        } catch(e) {
                            logCopilotMessage(`🤖 Co-pilot Error: ${e.message}`, '#ef4444');
                        }
                    } else {
                        logCopilotMessage(`🤖 Co-pilot: Invalid email address.`, '#ef4444');
                    }
                }
                else if (cmdLower.startsWith('unban user ') || cmdLower.startsWith('deblochează utilizatorul ')) {
                    const email = cmd.substring(cmdLower.includes('unban user ') ? 11 : 25).trim().toLowerCase();
                    if (validateEmail(email)) {
                        try {
                            await db.collection('users').doc(email).update({ banned: false });
                            let users = JSON.parse(localStorage.getItem('ia_users') || '[]');
                            let idx = users.findIndex(u => u.email.toLowerCase() === email);
                            if (idx >= 0) {
                                users[idx].banned = false;
                                localStorage.setItem('ia_users', JSON.stringify(users));
                            }
                            logCopilotMessage(`🤖 Co-pilot: Unbanned user ${email} successfully.`, '#10b981');
                            refreshAdminStats();
                        } catch(e) {
                            logCopilotMessage(`🤖 Co-pilot Error: ${e.message}`, '#ef4444');
                        }
                    } else {
                        logCopilotMessage(`🤖 Co-pilot: Invalid email address.`, '#ef4444');
                    }
                }
                else if (cmdLower.startsWith('premium ')) {
                    let email = '';
                    let days = 30;
                    
                    const matchEn = cmd.match(/premium\s+([^\s]+)\s+(\d+)\s+days/i);
                    
                    if (matchEn) {
                        email = matchEn[1].toLowerCase();
                        days = parseInt(matchEn[2]);
                    } else {
                        const tokens = cmd.split(/\s+/);
                        tokens.forEach(t => {
                            if (validateEmail(t)) email = t.toLowerCase();
                            else if (/^\d+$/.test(t)) days = parseInt(t);
                        });
                    }
                    
                    if (validateEmail(email)) {
                        try {
                            const pData = { email, addedAt: Date.now(), days };
                            await db.collection('premium').doc(email).set(pData);
                            
                            let list = getPremiumUsers();
                            let existing = list.findIndex(u => u.email.toLowerCase() === email);
                            if (existing >= 0) list[existing] = pData;
                            else list.push(pData);
                            savePremiumUsers(list);
                            
                            logCopilotMessage(`🤖 Co-pilot: Granted ${days === 9999 ? 'Lifetime' : days + ' Days'} Premium to ${email}.`, '#10b981');
                            refreshAdminStats();
                        } catch(e) {
                            logCopilotMessage(`🤖 Co-pilot Error: ${e.message}`, '#ef4444');
                        }
                    } else {
                        logCopilotMessage(`🤖 Co-pilot: Could not parse email from command.`, '#ef4444');
                    }
                }
                else if (cmdLower.startsWith('create challenge:')) {
                    try {
                        const content = cmd.substring(17).trim();
                        const expIdx = content.toLowerCase().indexOf('expires');
                        const expIdxRo = content.toLowerCase().indexOf('expiră');
                        const splitIdx = expIdx >= 0 ? expIdx : expIdxRo;
                        
                        if (splitIdx < 0) {
                            throw new Error("Missing 'expires' / 'expiră' parameter.");
                        }
                        
                        const title = content.substring(0, splitIdx).trim();
                        const remainder = content.substring(splitIdx + (expIdx >= 0 ? 7 : 6)).trim();
                        
                        const rewIdx = remainder.toLowerCase().indexOf('reward');
                        const rewIdxRo = remainder.toLowerCase().indexOf('premiu');
                        const rSplitIdx = rewIdx >= 0 ? rewIdx : rewIdxRo;
                        
                        let dateStr = '';
                        let reward = '7 Days Premium';
                        
                        if (rSplitIdx >= 0) {
                            dateStr = remainder.substring(0, rSplitIdx).trim();
                            reward = remainder.substring(rSplitIdx + (rewIdx >= 0 ? 6 : 6)).trim();
                        } else {
                            dateStr = remainder;
                        }
                        
                        const expiryMs = new Date(dateStr).getTime();
                        if (isNaN(expiryMs)) {
                            throw new Error(`Invalid date format: "${dateStr}". Use YYYY-MM-DD HH:MM`);
                        }
                        
                        const newC = {
                            id: String(Date.now()),
                            title_en: title,
                            title_fr: title,
                            desc_en: "Created via AI Co-pilot command.",
                            desc_fr: "Créé via la commande AI Co-pilot.",
                            expiry: expiryMs,
                            reward: reward,
                            createdAt: Date.now()
                        };
                        
                        await db.collection('devsocial_challenges').doc(newC.id).set(newC);
                        logCopilotMessage(`🤖 Co-pilot: Published challenge "${title}" successfully.`, '#10b981');
                        refreshAdminStats();
                        loadChallengesTab();
                    } catch(e) {
                        logCopilotMessage(`🤖 Co-pilot Error: ${e.message}`, '#ef4444');
                    }
                }
                else {
                    let answer = "🤖 Co-pilot: Command not recognized. Write a valid command or ask about the database statistics.";
                    if (cmdLower.includes('help')) {
                        answer = `🤖 Co-pilot Commands:<br>
                                 • <code>create challenge: [Title] expires [Date] reward [Reward]</code><br>
                                 • <code>ban user [Email]</code><br>
                                 • <code>unban user [Email]</code><br>
                                 • <code>premium [Email] [Days] days</code>`;
                    } else if (cmdLower.includes('how many users')) {
                        const count = JSON.parse(localStorage.getItem('ia_users') || '[]').length;
                        answer = `🤖 Co-pilot: There are currently ${count} registered users.`;
                    } else if (cmdLower.includes('premium count')) {
                        const count = getPremiumUsers().length;
                        answer = `🤖 Co-pilot: There are currently ${count} premium members.`;
                    } else if (cmdLower.includes('status')) {
                        answer = `🤖 Co-pilot: System status is nominal. Firebase is connected.`;
                    }
                    logCopilotMessage(answer, '#8b5cf6');
                }
            }
            
            function logCopilotMessage(msg, color) {
                const logEl = document.getElementById('copilot-log-container');
                if (!logEl) return;
                const entry = document.createElement('div');
                entry.innerHTML = msg;
                if (color) entry.style.color = color;
                logEl.appendChild(entry);
                logEl.scrollTop = logEl.scrollHeight;
            }
            
            function validateEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }

            function adminClearSessions() {
                if (!confirm('Clear all local sessions? This cannot be undone.')) return;
                const keys = Object.keys(localStorage).filter(k => k.startsWith('genius_db_') || k === 'genius_session' || k === 'ia_premium_sub_date' || k === 'ia_premium_users');
                keys.forEach(k => localStorage.removeItem(k));
                adminLog('All sessions cleared.');
                refreshAdminStats();
                setTimeout(() => { closeModal('admin'); authCheck(); }, 1500);
            }

            function adminExportData() {
                const data = {};
                Object.keys(localStorage).forEach(k => { data[k] = localStorage.getItem(k); });
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'ia-codestudio-data-export.json';
                a.click(); URL.revokeObjectURL(url);
                adminLog('Export downloaded.');
            }

            function adminLogout() {
                localStorage.removeItem('genius_session');
                if (typeof firebase !== 'undefined' && firebase.auth) {
                    try {
                        firebase.auth().signOut().catch(e => console.log(e));
                    } catch(e) {}
                }
                closeModal('admin');
                closeModal('user');
                authCheck();
                adminLog('Signed out.');
                if (typeof checkPremiumPortal === 'function') checkPremiumPortal();
            }

            // Tab routing inside Admin Panel
            document.addEventListener('DOMContentLoaded', () => {
                const tabBtns = document.querySelectorAll('.admin-tab-btn');
                tabBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        tabBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        const tabId = btn.getAttribute('data-tab');
                        document.querySelectorAll('.admin-sub-panel').forEach(panel => {
                            panel.style.display = 'none';
                        });
                        
                        const activePanel = document.getElementById(`admin-panel-${tabId}`);
                        if (activePanel) {
                            activePanel.style.display = (tabId === 'copilot' || tabId === 'messages') ? 'flex' : 'block';
                        }
                        
                        if (tabId === 'messages') {
                            loadMessagesTab();
                        }
                        
                        if (tabId === 'analytics') {
                            setTimeout(renderAnalyticsCharts, 100);
                        }
                    });
                });
            });

            // Real-time Banned Status Verification
            function verifyBannedStatus() {
                const session = localStorage.getItem('genius_session');
                if (session && db) {
                    try {
                        const user = JSON.parse(session);
                        if (user && user.email) {
                            db.collection('users').doc(user.email).get().then(doc => {
                                if (doc.exists && doc.data().banned === true) {
                                    alert(currentLang === 'en' ? "Your account has been banned by the administrator." : "Votre compte a été banni par l'administrateur.");
                                    adminLogout();
                                }
                            }).catch(e => console.log("Banned verification error:", e));
                        }
                    } catch(e) {}
                }
            }

            document.addEventListener('DOMContentLoaded', () => {
                localStorage.removeItem('ia_premium_sub_date');
                authCheck();
                verifyBannedStatus();
                if (localStorage.getItem('genius_session')) {
                    syncFirebaseWithLocal()
                        .then(() => {
                            if (typeof checkPremiumPortal === 'function') checkPremiumPortal();
                        })
                        .catch(e => console.log('Startup sync warning:', e));
                } else {
                    if (typeof checkPremiumPortal === 'function') checkPremiumPortal();
                }

                // Listen to Firebase Auth state for automatic Google session sync
                if (typeof firebase !== 'undefined' && firebase.auth) {
                    try {
                        firebase.auth().onAuthStateChanged(authUser => {
                            if (authUser && !localStorage.getItem('genius_session')) {
                                const email = authUser.email ? authUser.email.toLowerCase() : '';
                                const isAdmin = email === 'andart1174@gmail.com';
                                const displayName = authUser.displayName || email.split('@')[0] || 'User';
                                const photoURL = authUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7c3aed&color=fff&bold=true`;
                                const sessionUser = {
                                    email: email,
                                    name: displayName,
                                    role: isAdmin ? 'Admin' : 'User',
                                    photoURL: photoURL,
                                    uid: authUser.uid,
                                    loginAt: Date.now()
                                };
                                localStorage.setItem('genius_session', JSON.stringify(sessionUser));
                                authCheck();
                            }
                        });
                    } catch(e) {
                        console.log("Firebase auth listener error:", e);
                    }
                }
            });
