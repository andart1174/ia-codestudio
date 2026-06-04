/**
 * Developer Social Hub & Admin Dashboard v1.0
 * Connects developers, allows chat, code sharing, and provides a powerful secure admin moderation panel.
 */
(function() {
  'use strict';

  // Translation Dictionaries
  const TX = {
    en: {
      socialTab: "Social Hub",
      welcomeTitle: "Community Lobby",
      welcomeSub: "Interact with coding enthusiasts around the world.",
      connectToJoin: "Join the Developer Hub to chat, share code, and collaborate in real-time.",
      signInBtn: "🔐 Connect Account / Sign In",
      tabChat: "💬 Global Chat",
      tabMembers: "👥 Members",
      tabFirebase: "⚙️ Config DB",
      tabAdmin: "📊 Admin Dashboard",
      typeMsg: "Type a message...",
      sendBtn: "Send",
      shareCodeBtn: "💻 Share Code",
      cloneEditBtn: "📂 Clone & Edit Code",
      onlineBadge: "Active",
      adminBadge: "Admin",
      muteUserBtn: "🔇 Mute",
      unmuteUserBtn: "🔊 Unmute",
      banUserBtn: "🚫 Ban Account",
      promoteAdminBtn: "👑 Make Admin",
      demoteAdminBtn: "🧑 Make User",
      firebaseTitle: "Multiplayer Synchronization (Firebase)",
      firebaseDesc: "Sync data in real-time across different computers. Enter your own free Firebase credentials below:",
      apiKeyLabel: "Firebase API Key:",
      dbUrlLabel: "Firebase DB URL (databaseURL):",
      projectIdLabel: "Firebase Project ID:",
      saveConnectBtn: "💾 Save & Connect Firebase",
      disconnectBtn: "🔌 Disconnect (Reset to Local)",
      telemetryTitle: "Community Telemetry Stats",
      regUsersLabel: "Registered Developers",
      activeUsersLabel: "Connected Online Now",
      totalMsgsLabel: "Total Chat Messages",
      userMgmtTitle: "Registered Users Moderation Panel",
      chatModTitle: "Live Message Moderation Feed",
      statusActive: "Active",
      statusMuted: "Muted",
      statusBanned: "Banned",
      confirmBan: "Are you sure you want to permanently BAN and block this developer?",
      confirmPromote: "Promote this user to Admin status?",
      confirmDemote: "Demote this admin back to standard User status?",
      importSuccess: "📂 Code imported successfully into editor! Preview updated.",
      noCodeFound: "No code snippet attached.",
      dbStatusLabel: "Database Engine Mode:",
      dbStatusLocal: "Simulated Local Hybrid (Multi-tab storage sync)",
      dbStatusFirebase: "Production Firebase Realtime Sync",
      searchUsersPlaceholder: "🔍 Search users by nickname..."
    },
    fr: {
      socialTab: "Hub Social",
      welcomeTitle: "Lobby Communautaire",
      welcomeSub: "Interagissez avec des passionnés de code du monde entier.",
      connectToJoin: "Rejoignez le Developer Hub pour chatter, partager du code et collaborer en temps réel.",
      signInBtn: "🔐 Se Connecter / Créer un Compte",
      tabChat: "💬 Chat Global",
      tabMembers: "👥 Membres",
      tabFirebase: "⚙️ Config DB",
      tabAdmin: "📊 Admin Dashboard",
      typeMsg: "Écrire un message...",
      sendBtn: "Envoyer",
      shareCodeBtn: "💻 Partager Code",
      cloneEditBtn: "📂 Importer & Éditer Code",
      onlineBadge: "En Ligne",
      adminBadge: "Admin",
      muteUserBtn: "🔇 Muer",
      unmuteUserBtn: "🔊 Parler",
      banUserBtn: "🚫 Bannir Compte",
      promoteAdminBtn: "👑 Rendre Admin",
      demoteAdminBtn: "🧑 Rendre User",
      firebaseTitle: "Synchronisation Multijoueur (Firebase)",
      firebaseDesc: "Synchronisez en temps réel sur plusieurs ordinateurs. Entrez vos identifiants Firebase gratuits :",
      apiKeyLabel: "Clé API Firebase :",
      dbUrlLabel: "URL Base de Données Firebase :",
      projectIdLabel: "ID Projet Firebase :",
      saveConnectBtn: "💾 Enregistrer & Connecter",
      disconnectBtn: "🔌 Déconnecter (Revenir en Local)",
      telemetryTitle: "Statistiques Community Telemetry",
      regUsersLabel: "Développeurs Enregistrés",
      activeUsersLabel: "Connectés En Ligne Actuellement",
      totalMsgsLabel: "Total des Messages Chat",
      userMgmtTitle: "Modération des Comptes Utilisateurs",
      chatModTitle: "Modération des Messages Live",
      statusActive: "Actif",
      statusMuted: "Muet",
      statusBanned: "Banni",
      confirmBan: "Êtes-vous sûr de vouloir BANNIR définitivement ce développeur ?",
      confirmPromote: "Promouvoir cet utilisateur au rang d'Administrateur ?",
      confirmDemote: "Rétrograder cet administrateur en simple Utilisateur ?",
      importSuccess: "📂 Code importé avec succès dans l'éditeur ! Aperçu mis à jour.",
      noCodeFound: "Aucun fragment de code trouvé.",
      dbStatusLabel: "Moteur de Base de Données :",
      dbStatusLocal: "Simulé Local Hybride (Synchro multi-onglets)",
      dbStatusFirebase: "Production Firebase Realtime Sync",
      searchUsersPlaceholder: "🔍 Rechercher par pseudo..."
    }
  };

  function gl() {
    return window.lang || 'fr'; // default to French
  }

  function t(key) {
    return (TX[gl()] || TX.fr)[key] || key;
  }

  // Active sub-tab state inside Social panel
  let activeSubTab = 'chat'; // chat, members, firebase, admin
  let userSearchQuery = '';

  // Render the Social Hub tab
  function renderSocialTab() {
    const parent = document.getElementById('left-body');
    if (!parent) return;

    parent.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

    // Header title
    const hdr = document.createElement('div');
    hdr.style = 'padding:12px 14px 10px;border-bottom:1px solid rgba(56,189,248,0.25);flex-shrink:0;';
    hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#38bdf8;">📱 ' + t('welcomeTitle') + '</div>' + 
                    '<div style="font-size:9px;color:#64748b;margin-top:2px;">' + t('welcomeSub') + '</div>';
    wrap.appendChild(hdr);

    // If user is not logged in, display the Connect banner lock screen
    const user = window.AppAuth ? window.AppAuth.currentUser : null;
    if (!user) {
      const lockScreen = document.createElement('div');
      lockScreen.style = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;gap:16px;background:rgba(8,12,20,0.65);';
      
      lockScreen.innerHTML = `
        <div style="font-size:36px;animation: pulse 2s infinite;">🔐</div>
        <p style="font-size:11px;color:#94a3b8;line-height:1.6;max-width:220px;margin:0 auto;">${t('connectToJoin')}</p>
        <button id="btn-social-signin" style="background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border:none;padding:12px 20px;border-radius:24px;font-size:11px;font-weight:bold;cursor:pointer;box-shadow:0 0 15px rgba(56,189,248,0.3);transition:all 0.2s;">
          ${t('signInBtn')}
        </button>
      `;
      wrap.appendChild(lockScreen);
      parent.appendChild(wrap);

      // Bind button click to trigger auth modal
      const btnIn = lockScreen.querySelector('#btn-social-signin');
      if (btnIn) {
        btnIn.addEventListener('click', () => {
          const authModal = document.getElementById('auth-modal');
          if (authModal) {
            authModal.style.display = 'flex';
            window.showAuthView('login');
          }
        });
      }
      return;
    }

    // --- LOGGED IN VIEW ---
    // Renders the sub-tabs navigation row
    const tabsRow = document.createElement('div');
    tabsRow.style = 'display:flex;background:rgba(0,0,0,0.25);border-bottom:1px solid var(--border);flex-shrink:0;';
    
    const subTabs = [
      { id: 'chat', label: t('tabChat') },
      { id: 'members', label: t('tabMembers') },
      { id: 'firebase', label: t('tabFirebase') }
    ];

    // Push admin dashboard tab if role is admin
    if (user.role === 'admin') {
      subTabs.push({ id: 'admin', label: t('tabAdmin') });
    }

    subTabs.forEach(tb => {
      const btn = document.createElement('button');
      btn.textContent = tb.label;
      const isActive = activeSubTab === tb.id;
      btn.style = 'flex:1;background:transparent;border:none;border-bottom:2px solid ' + (isActive ? '#38bdf8' : 'transparent') + 
                  ';color:' + (isActive ? '#38bdf8' : 'var(--muted)') + ';padding:8px 2px;font-size:10px;font-weight:bold;cursor:pointer;transition:all 0.2s;text-align:center;';
      btn.onclick = () => {
        activeSubTab = tb.id;
        renderSocialTab();
      };
      tabsRow.appendChild(btn);
    });
    wrap.appendChild(tabsRow);

    // Body panel for active subtab content
    const subBody = document.createElement('div');
    subBody.style = 'flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:10px;background:rgba(15,21,33,0.2);';

    if (activeSubTab === 'chat') {
      renderChatRoom(subBody);
    } else if (activeSubTab === 'members') {
      renderMembersList(subBody);
    } else if (activeSubTab === 'firebase') {
      renderFirebaseSettings(subBody);
    } else if (activeSubTab === 'admin' && user.role === 'admin') {
      renderAdminDashboard(subBody);
    }

    wrap.appendChild(subBody);
    parent.appendChild(wrap);
  }

  // Render Global Chat Room
  function renderChatRoom(container) {
    // 1. Messages container
    const msgsList = document.createElement('div');
    msgsList.style = 'flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:4px 2px;min-height:200px;scrollbar-width:thin;';
    
    const msgs = window.AppAuth.messages || [];
    if (msgs.length === 0) {
      msgsList.innerHTML = '<div style="text-align:center;color:#64748b;font-size:10px;margin-top:20px;">No messages yet. Say hello!</div>';
    }

    msgs.forEach(m => {
      const card = document.createElement('div');
      card.style = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:4px;';
      
      // Header row
      const hdrRow = document.createElement('div');
      hdrRow.style = 'display:flex;justify-content:space-between;align-items:center;';

      // Nickname & special tags
      const nickWrap = document.createElement('div');
      nickWrap.style = 'display:flex;align-items:center;gap:6px;';
      
      const nickSpan = document.createElement('span');
      nickSpan.textContent = m.nickname;
      nickSpan.style = 'font-size:11px;font-weight:900;color:' + getNicknameColor(m.nickname) + ';';
      nickWrap.appendChild(nickSpan);

      // Check if message sender role is admin
      const allUsers = window.AppAuth.users || [];
      const userRecord = allUsers.find(u => u.uid === m.uid);
      if (userRecord && userRecord.role === 'admin') {
        const admBadge = document.createElement('span');
        admBadge.textContent = t('adminBadge');
        admBadge.style = 'font-size:8px;background:rgba(139,92,246,0.15);color:#c084fc;border:1px solid rgba(139,92,246,0.3);padding:1px 4px;border-radius:4px;font-weight:bold;';
        nickWrap.appendChild(admBadge);
      }

      hdrRow.appendChild(nickWrap);

      // Time & delete moderator button
      const rightWrap = document.createElement('div');
      rightWrap.style = 'display:flex;align-items:center;gap:8px;font-size:9px;color:#475569;';
      
      const timeSpan = document.createElement('span');
      timeSpan.textContent = formatTime(m.timestamp);
      rightWrap.appendChild(timeSpan);

      // Admin delete message button
      if (window.AppAuth.currentUser && window.AppAuth.currentUser.role === 'admin') {
        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.style = 'background:none;border:none;cursor:pointer;font-size:11px;padding:0 2px;opacity:0.6;transition:opacity 0.2s;';
        delBtn.title = "Delete Message (Moderator)";
        delBtn.onmouseover = () => { delBtn.style.opacity = '1'; };
        delBtn.onmouseout = () => { delBtn.style.opacity = '0.6'; };
        delBtn.onclick = () => {
          if (confirm("Delete this message?")) {
            window.AppAuth.deleteMessage(m.msgId);
          }
        };
        rightWrap.appendChild(delBtn);
      }

      hdrRow.appendChild(rightWrap);
      card.appendChild(hdrRow);

      // Message text
      const bodySpan = document.createElement('p');
      bodySpan.textContent = m.text;
      bodySpan.style = 'font-size:11px;color:#e2e8f0;line-height:1.4;margin:0;word-break:break-word;white-space:pre-wrap;';
      card.appendChild(bodySpan);

      // If message includes code snippet
      if (m.codeSnippet) {
        const codeBox = document.createElement('div');
        codeBox.style = 'margin-top:6px;background:#0d1117;border:1px solid rgba(255,255,255,0.06);border-radius:6px;overflow:hidden;';
        
        const codePre = document.createElement('pre');
        codePre.style = 'margin:0;padding:8px;font-family:var(--mono);font-size:9px;color:#85e89d;overflow-x:auto;max-height:120px;';
        codePre.textContent = m.codeSnippet;
        codeBox.appendChild(codePre);

        // Action row: Clone & edit code block
        const actionRow = document.createElement('div');
        actionRow.style = 'padding:6px;border-top:1px solid rgba(255,255,255,0.05);display:flex;justify-content:flex-end;background:rgba(255,255,255,0.01);';
        
        const cloneBtn = document.createElement('button');
        cloneBtn.textContent = t('cloneEditBtn');
        cloneBtn.style = 'background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);border-radius:4px;color:#38bdf8;padding:4px 8px;font-size:9px;font-weight:bold;cursor:pointer;transition:all 0.2s;';
        cloneBtn.onmouseover = () => { cloneBtn.style.background = 'rgba(56,189,248,0.2)'; };
        cloneBtn.onmouseout = () => { cloneBtn.style.background = 'rgba(56,189,248,0.1)'; };
        cloneBtn.onclick = () => {
          if (window.editor) {
            window.editor.setValue(m.codeSnippet);
            if (window.runPreview) window.runPreview();
            if (window.showToast) window.showToast(t('importSuccess'));
          }
        };

        actionRow.appendChild(cloneBtn);
        codeBox.appendChild(actionRow);
        card.appendChild(codeBox);
      }

      msgsList.appendChild(card);
    });

    container.appendChild(msgsList);
    // Scroll list to bottom
    setTimeout(() => { msgsList.scrollTop = msgsList.scrollHeight; }, 100);

    // 2. Input control row
    const inputArea = document.createElement('div');
    inputArea.style = 'border-top:1px solid var(--border);padding-top:10px;display:flex;flex-direction:column;gap:6px;flex-shrink:0;';

    const textInput = document.createElement('textarea');
    textInput.placeholder = t('typeMsg');
    textInput.rows = 2;
    textInput.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:8px;color:#fff;padding:8px;font-size:11px;outline:none;resize:none;box-sizing:border-box;';
    textInput.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
      }
    };
    inputArea.appendChild(textInput);

    const actionRow = document.createElement('div');
    actionRow.style = 'display:flex;justify-content:space-between;align-items:center;';

    // Share code button
    const shareBtn = document.createElement('button');
    shareBtn.textContent = t('shareCodeBtn');
    shareBtn.style = 'background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:6px;color:var(--muted);padding:6px 10px;font-size:10px;font-weight:bold;cursor:pointer;transition:all 0.2s;';
    shareBtn.onclick = () => {
      if (window.editor) {
        const code = window.editor.getValue();
        if (code.trim()) {
          window.AppAuth.sendMessage(textInput.value.trim() || "Sharing my current progress!", code)
            .then(() => {
              textInput.value = '';
            })
            .catch(err => console.error(err));
        } else {
          alert(t('noCodeFound'));
        }
      }
    };
    actionRow.appendChild(shareBtn);

    // Send text button
    const sendBtn = document.createElement('button');
    sendBtn.textContent = t('sendBtn');
    sendBtn.style = 'background:linear-gradient(135deg,#38bdf8,#0284c7);border:none;color:#fff;padding:6px 14px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;';
    sendBtn.onclick = sendChatMessage;
    actionRow.appendChild(sendBtn);

    inputArea.appendChild(actionRow);
    container.appendChild(inputArea);

    function sendChatMessage() {
      const txt = textInput.value.trim();
      if (!txt) return;
      window.AppAuth.sendMessage(txt)
        .then(() => {
          textInput.value = '';
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  // Render Members List tab
  function renderMembersList(container) {
    // Search input
    const sInput = document.createElement('input');
    sInput.type = 'text';
    sInput.placeholder = t('searchUsersPlaceholder');
    sInput.value = userSearchQuery;
    sInput.style = 'width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:6px;padding:8px 10px;color:#fff;font-size:11px;outline:none;box-sizing:border-box;margin-bottom:6px;';
    sInput.oninput = (e) => {
      userSearchQuery = e.target.value;
      // Filter list locally
      refreshUsersList();
    };
    container.appendChild(sInput);

    const listWrap = document.createElement('div');
    listWrap.style = 'flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px;scrollbar-width:thin;';
    container.appendChild(listWrap);

    function refreshUsersList() {
      listWrap.innerHTML = '';
      const users = window.AppAuth.users || [];
      const q = userSearchQuery.toLowerCase().trim();

      const filtered = users.filter(u => {
        return u.nickname && u.nickname.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        listWrap.innerHTML = '<div style="text-align:center;color:#64748b;font-size:10px;margin-top:20px;">No users found.</div>';
        return;
      }

      filtered.forEach(u => {
        const item = document.createElement('div');
        item.style = 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;';

        const left = document.createElement('div');
        left.style = 'display:flex;flex-direction:column;gap:2px;';
        
        const nameRow = document.createElement('div');
        nameRow.style = 'display:flex;align-items:center;gap:6px;';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = u.nickname;
        nameSpan.style = 'font-size:11px;font-weight:bold;color:#e2e8f0;';
        nameRow.appendChild(nameSpan);

        if (u.role === 'admin') {
          const admBadge = document.createElement('span');
          admBadge.textContent = t('adminBadge');
          admBadge.style = 'font-size:8px;background:rgba(139,92,246,0.15);color:#c084fc;border:1px solid rgba(139,92,246,0.3);padding:1px 4px;border-radius:4px;font-weight:bold;';
          nameRow.appendChild(admBadge);
        }

        left.appendChild(nameRow);

        const joinedSpan = document.createElement('span');
        joinedSpan.textContent = "Registered: " + (u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A');
        joinedSpan.style = 'font-size:8px;color:#475569;';
        left.appendChild(joinedSpan);

        item.appendChild(left);

        // Status badge (Right)
        const right = document.createElement('div');
        right.style = 'display:flex;align-items:center;gap:6px;';

        const stBadge = document.createElement('span');
        if (u.isBanned) {
          stBadge.textContent = t('statusBanned');
          stBadge.style = 'font-size:9px;color:#fca5a5;background:rgba(239,68,68,0.1);padding:2px 6px;border-radius:10px;';
        } else if (u.isMuted) {
          stBadge.textContent = t('statusMuted');
          stBadge.style = 'font-size:9px;color:#fde047;background:rgba(234,179,8,0.1);padding:2px 6px;border-radius:10px;';
        } else {
          stBadge.textContent = t('statusActive');
          stBadge.style = 'font-size:9px;color:#86efac;background:rgba(34,197,94,0.1);padding:2px 6px;border-radius:10px;';
        }

        right.appendChild(stBadge);
        item.appendChild(right);
        listWrap.appendChild(item);
      });
    }

    refreshUsersList();
  }

  // Render Firebase Setup Credentials tab & Premium Activation
  function renderFirebaseSettings(container) {
    const title = document.createElement('h4');
    title.textContent = t('firebaseTitle');
    title.style = 'font-size:11px;font-weight:bold;color:#38bdf8;margin-bottom:4px;';
    container.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = t('firebaseDesc');
    desc.style = 'font-size:10px;color:#94a3b8;line-height:1.5;margin:0 0 10px;';
    container.appendChild(desc);

    // Engine Status info box
    const statusBox = document.createElement('div');
    const isFb = window.AppAuth.isFirebase;
    statusBox.style = 'background:' + (isFb ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.02)') + ';border:1px solid ' + (isFb ? 'rgba(34,197,94,0.2)' : 'var(--border)') + ';border-radius:8px;padding:8px 10px;font-size:10px;margin-bottom:12px;';
    statusBox.innerHTML = `<span style="color:#64748b;">${t('dbStatusLabel')}</span><br><b style="color:${isFb ? '#4ade80' : '#38bdf8'};">${isFb ? t('dbStatusFirebase') : t('dbStatusLocal')}</b>`;
    container.appendChild(statusBox);

    // Form fields
    const form = document.createElement('div');
    form.style = 'display:flex;flex-direction:column;gap:8px;';

    // Prefill if existing
    let conf = { apiKey: '', databaseURL: '', projectId: '' };
    const saved = localStorage.getItem('firebase_config');
    if (saved) {
      try { conf = JSON.parse(saved); } catch(e) {}
    }

    form.innerHTML = `
      <div>
        <label style="font-size:9px;color:#94a3b8;display:block;margin-bottom:3px;">${t('apiKeyLabel')}</label>
        <input type="password" id="fb-apiKey" value="${conf.apiKey || ''}" placeholder="AIzaSy..." style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;color:#fff;font-size:10px;outline:none;box-sizing:border-box;">
      </div>
      <div>
        <label style="font-size:9px;color:#94a3b8;display:block;margin-bottom:3px;">${t('dbUrlLabel')}</label>
        <input type="text" id="fb-dbUrl" value="${conf.databaseURL || ''}" placeholder="https://<project-id>-default-rtdb.firebaseio.com" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;color:#fff;font-size:10px;outline:none;box-sizing:border-box;">
      </div>
      <div>
        <label style="font-size:9px;color:#94a3b8;display:block;margin-bottom:3px;">${t('projectIdLabel')}</label>
        <input type="text" id="fb-projectId" value="${conf.projectId || ''}" placeholder="my-awesome-project" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;color:#fff;font-size:10px;outline:none;box-sizing:border-box;">
      </div>
    `;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = t('saveConnectBtn');
    saveBtn.style = 'background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border:none;padding:10px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;margin-top:6px;';
    saveBtn.onclick = () => {
      const k = container.querySelector('#fb-apiKey').value.trim();
      const db = container.querySelector('#fb-dbUrl').value.trim();
      const p = container.querySelector('#fb-projectId').value.trim();

      if (!k || !db || !p) {
        alert("Please fill all configuration fields.");
        return;
      }

      window.AppAuth.saveFirebaseConfig({
        apiKey: k,
        databaseURL: db,
        projectId: p,
        authDomain: p + ".firebaseapp.com"
      });
    };
    form.appendChild(saveBtn);

    if (saved) {
      const resetBtn = document.createElement('button');
      resetBtn.textContent = t('disconnectBtn');
      resetBtn.style = 'background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#fca5a5;padding:8px;border-radius:6px;font-size:10px;font-weight:bold;cursor:pointer;margin-top:4px;';
      resetBtn.onclick = () => {
        if (confirm("Disconnect and clear credentials? Database will reset to Local simulated mode.")) {
          window.AppAuth.clearFirebaseConfig();
        }
      };
      form.appendChild(resetBtn);
    }

    container.appendChild(form);

    // --- PREMIUM LICENSE ACTIVATION AREA ---
    const user = window.AppAuth.currentUser;
    const isPremium = user && user.membership === 'premium';

    const premWrap = document.createElement('div');
    premWrap.style = 'margin-top:16px;border-top:1px solid var(--border);padding-top:14px;';

    if (isPremium) {
      premWrap.innerHTML = `
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.22); border-radius:8px; padding:10px;">
          <h5 style="color:#fbbf24; font-size:10px; font-weight:bold; margin:0 0 4px;">👑 IA Architecte Premium active</h5>
          <p style="font-size:9px; color:#cbd5e1; line-height:1.4; margin:0;">
            ${gl() === 'fr' ? 'Accès premium activé. Exportations ZIP/HTML, copie de code et travail collaboratif débloqués.' : 'Premium membership activated. Standalone exports, code copying, and team sync fully unlocked!'}
          </p>
        </div>
      `;
    } else {
      premWrap.innerHTML = `
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:6px;">
          <h5 style="color:#e2e8f0; font-size:10px; font-weight:bold; margin:0 0 2px;">👑 Upgrade to Premium</h5>
          <p style="font-size:9px; color:#94a3b8; line-height:1.4; margin:0;">
            ${gl() === 'fr' ? 'Débloquez les exportations illimitées și les fonctions de copie Monaco.' : 'Unlock unlimited ZIP/HTML exports and code copying features in Monaco.'}
          </p>
          
          <a href="https://iaarchitecte.com" target="_blank" style="display:block; text-align:center; background:linear-gradient(135deg, #8b5cf6, #ec4899); color:#fff; border:none; padding:6px; border-radius:6px; font-size:9px; font-weight:bold; text-decoration:none; transition:all 0.2s;">
            ${gl() === 'fr' ? 'S\'abonner / Acheter' : 'Get License Key / Purchase'}
          </a>
          
          <div style="display:flex; gap:6px; margin-top:2px;">
            <input type="text" id="license-key-input" placeholder="IA-PREM-XXXX-XXXX" style="flex:1; background:rgba(0,0,0,0.3); border:1px solid var(--border); border-radius:6px; padding:6px; color:#fff; font-size:9px; outline:none; text-transform:uppercase;">
            <button id="btn-redeem-license" style="background:#10b981; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:9px; font-weight:bold; cursor:pointer;">Activate</button>
          </div>
        </div>
      `;
      
      const btnRedeem = premWrap.querySelector('#btn-redeem-license');
      if (btnRedeem) {
        btnRedeem.onclick = () => {
          const keyInput = premWrap.querySelector('#license-key-input');
          const key = keyInput.value.trim().toUpperCase();
          if (!key) return;
          window.AppAuth.redeemLicenseKey(key)
            .then(() => {
              alert(gl() === 'fr' ? "Premium activé avec succès !" : "Premium membership activated successfully!");
              renderSocialTab();
            })
            .catch(err => {
              alert(err.message);
            });
        };
      }
    }
    container.appendChild(premWrap);
  }

  // Render Admin dashboard tab
  function renderAdminDashboard(container) {
    // Section 1: Telemetry Cards
    const titleTel = document.createElement('div');
    titleTel.textContent = t('telemetryTitle');
    titleTel.style = 'font-size:10px;font-weight:800;text-transform:uppercase;color:#a78bfa;border-bottom:1px solid rgba(139,92,246,0.2);padding-bottom:4px;';
    container.appendChild(titleTel);

    const statsGrid = document.createElement('div');
    statsGrid.style = 'display:grid;grid-template-columns:1fr 1fr;gap:6px;';

    const usersCount = window.AppAuth.users.length;
    const onlineCount = window.AppAuth.onlineUsersCount;
    const msgsCount = window.AppAuth.messages.length;

    statsGrid.innerHTML = `
      <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.15);border-radius:8px;padding:8px;text-align:center;">
        <div style="font-size:8px;color:#a78bfa;">${t('regUsersLabel')}</div>
        <div style="font-size:16px;font-weight:bold;color:#c084fc;margin-top:2px;">${usersCount}</div>
      </div>
      <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:8px;text-align:center;">
        <div style="font-size:8px;color:#4ade80;">${t('activeUsersLabel')}</div>
        <div style="font-size:16px;font-weight:bold;color:#4ade80;margin-top:2px;">${onlineCount}</div>
      </div>
      <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;text-align:center;grid-column:span 2;">
        <div style="font-size:8px;color:#64748b;">${t('totalMsgsLabel')}</div>
        <div style="font-size:14px;font-weight:bold;color:#e2e8f0;margin-top:2px;">${msgsCount}</div>
      </div>
    `;
    container.appendChild(statsGrid);

    // Section 1.5: License Key Generator
    const titleLic = document.createElement('div');
    titleLic.textContent = "🔑 License Keys Generator";
    titleLic.style = 'font-size:10px;font-weight:800;text-transform:uppercase;color:#a78bfa;border-bottom:1px solid rgba(139,92,246,0.2);padding-bottom:4px;margin-top:8px;';
    container.appendChild(titleLic);

    const licBox = document.createElement('div');
    licBox.style = 'background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;padding:8px 12px;display:flex;flex-direction:column;gap:6px;';
    licBox.innerHTML = `
      <div style="display:flex; gap:6px;">
        <button id="btn-gen-license" style="flex:1; background:linear-gradient(135deg, #8b5cf6, #6d28d9); color:#fff; border:none; padding:6px; border-radius:6px; font-size:10px; font-weight:bold; cursor:pointer;">Generate License Key</button>
      </div>
      <div id="gen-key-display-area" style="display:none; align-items:center; justify-content:space-between; background:#0d1117; border:1px solid rgba(139,92,246,0.3); border-radius:6px; padding:6px 8px; font-family:var(--mono); font-size:10px; color:#fbbf24;">
        <span id="gen-key-value">IA-PREM-XXXX-XXXX</span>
        <button id="btn-copy-gen-key" style="background:transparent; border:none; color:#a78bfa; cursor:pointer; font-size:10px; font-weight:bold;">Copy</button>
      </div>
    `;
    container.appendChild(licBox);

    const btnGen = licBox.querySelector('#btn-gen-license');
    const areaGen = licBox.querySelector('#gen-key-display-area');
    const valGen = licBox.querySelector('#gen-key-value');
    const btnCopyGen = licBox.querySelector('#btn-copy-gen-key');

    if (btnGen) {
      btnGen.onclick = () => {
        window.AppAuth.generateLicenseKey()
          .then(key => {
            valGen.textContent = key;
            areaGen.style.display = 'flex';
            if (window.showToast) window.showToast("License Key Generated!");
          })
          .catch(err => alert(err.message));
      };
    }

    if (btnCopyGen) {
      btnCopyGen.onclick = () => {
        navigator.clipboard.writeText(valGen.textContent);
        btnCopyGen.textContent = "Copied!";
        setTimeout(() => { btnCopyGen.textContent = "Copy"; }, 1500);
      };
    }

    // Section 2: User management table-list
    const titleUsr = document.createElement('div');
    titleUsr.textContent = t('userMgmtTitle');
    titleUsr.style = 'font-size:10px;font-weight:800;text-transform:uppercase;color:#a78bfa;border-bottom:1px solid rgba(139,92,246,0.2);padding-bottom:4px;margin-top:8px;';
    container.appendChild(titleUsr);

    const userList = document.createElement('div');
    userList.style = 'display:flex;flex-direction:column;gap:6px;overflow-y:auto;max-height:180px;scrollbar-width:thin;';

    const users = window.AppAuth.users || [];
    users.forEach(u => {
      // Don't show current logged in admin actions on self
      const isSelf = window.AppAuth.currentUser && window.AppAuth.currentUser.uid === u.uid;

      const userCard = document.createElement('div');
      userCard.style = 'background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px;';

      const row1 = document.createElement('div');
      row1.style = 'display:flex;justify-content:space-between;align-items:center;';

      const nickSpan = document.createElement('span');
      nickSpan.textContent = u.nickname;
      nickSpan.style = 'font-size:10px;font-weight:bold;color:#e2e8f0;';
      row1.appendChild(nickSpan);

      // Status label
      const statusSpan = document.createElement('span');
      statusSpan.style = 'font-size:8px;font-weight:bold;';
      let statusText = '';
      if (u.isBanned) {
        statusText = t('statusBanned');
        statusSpan.style.color = '#ef4444';
      } else if (u.isMuted) {
        statusText = t('statusMuted');
        statusSpan.style.color = '#f59e0b';
      } else {
        statusText = t('statusActive');
        statusSpan.style.color = '#10b981';
      }
      const memType = (u.membership === 'premium') ? '👑 Premium' : 'Free';
      statusSpan.textContent = statusText + ' (' + memType + ')';
      row1.appendChild(statusSpan);

      userCard.appendChild(row1);

      // Actions row
      if (!isSelf) {
        const actRow = document.createElement('div');
        actRow.style = 'display:flex;gap:4px;';

        // Mute / Unmute Button
        const muteBtn = document.createElement('button');
        muteBtn.textContent = u.isMuted ? t('unmuteUserBtn') : t('muteUserBtn');
        muteBtn.style = 'flex:1;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:4px;color:#fbbf24;padding:4px;font-size:8px;font-weight:bold;cursor:pointer;';
        muteBtn.onclick = () => {
          window.AppAuth.setUserMute(u.uid, !u.isMuted);
        };
        actRow.appendChild(muteBtn);

        // Ban Account Button
        if (!u.isBanned) {
          const banBtn = document.createElement('button');
          banBtn.textContent = t('banUserBtn');
          banBtn.style = 'flex:1;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:4px;color:#fca5a5;padding:4px;font-size:8px;font-weight:bold;cursor:pointer;';
          banBtn.onclick = () => {
            if (confirm(t('confirmBan') + " (" + u.nickname + ")")) {
              window.AppAuth.deleteUser(u.uid);
            }
          };
          actRow.appendChild(banBtn);
        }

        // Toggle Premium membership button
        const isPrem = u.membership === 'premium';
        const premBtn = document.createElement('button');
        premBtn.textContent = isPrem ? "🧑 Revoke Premium" : "👑 Promote Premium";
        premBtn.style = 'flex:1;background:' + (isPrem ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)') + ';border:1px solid ' + (isPrem ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)') + ';border-radius:4px;color:' + (isPrem ? '#fca5a5' : '#86efac') + ';padding:4px;font-size:8px;font-weight:bold;cursor:pointer;';
        premBtn.onclick = () => {
          window.AppAuth.setUserPremium(u.uid, !isPrem);
        };
        actRow.appendChild(premBtn);

        userCard.appendChild(actRow);
      }

      userList.appendChild(userCard);
    });

    container.appendChild(userList);
  }

  // Helper utility functions
  function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Generates harmonized colors based on string hashing
  function getNicknameColor(name) {
    if (!name) return '#e2e8f0';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    // HSL tailored for beautiful text contrast in dark theme
    return `hsl(${h}, 85%, 70%)`;
  }

  // Attach and hook up listeners
  function bindSocialEvents() {
    // Intercept standard applied language events
    const originalApplyLang = window.applyLang;
    window.applyLang = function() {
      if (typeof originalApplyLang === 'function') originalApplyLang();
      
      const lblTab = document.getElementById('lbl-tab-social');
      if (lblTab) lblTab.textContent = t('socialTab');

      if (window.activeTab === 'social') {
        renderSocialTab();
      }
    };

    // Hijack tab renders
    const originalRenderTab = window.renderTab;
    window.renderTab = function(tab) {
      if (tab === 'social') {
        window.activeTab = 'social';
        // Deselect other sidebar tabs
        document.querySelectorAll('.ltab').forEach(btn => btn.classList.remove('active'));
        const btnSocial = document.getElementById('tab-social');
        if (btnSocial) btnSocial.classList.add('active');

        // Reset header active status indicators
        const topShowroom = document.getElementById('topbar-showroom');
        const topCollab = document.getElementById('topbar-collab');
        if (topShowroom) topShowroom.classList.remove('active');
        if (topCollab) topCollab.classList.remove('active');

        renderSocialTab();
        return;
      } else {
        // Unset social tab active class
        const btnSocial = document.getElementById('tab-social');
        if (btnSocial) btnSocial.classList.remove('active');
      }
      if (typeof originalRenderTab === 'function') {
        originalRenderTab(tab);
      }
    };

    // Subscriptions to live database updates to automatically reload layout
    if (window.AppAuth) {
      window.AppAuth.onAuthStateChanged(() => {
        if (window.activeTab === 'social') {
          renderSocialTab();
        }
      });
      window.AppAuth.onNewMessage(() => {
        if (window.activeTab === 'social' && activeSubTab === 'chat') {
          renderSocialTab();
        }
      });
      window.AppAuth.onUsersChange(() => {
        if (window.activeTab === 'social' && (activeSubTab === 'members' || activeSubTab === 'admin')) {
          renderSocialTab();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSocialEvents);
  } else {
    bindSocialEvents();
  }

})();
