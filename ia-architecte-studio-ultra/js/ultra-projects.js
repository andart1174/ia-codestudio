// ══════════════════════════════════════════════════════════════════════════════
// ULTRA PROJECTS — Save, Load, Delete, Rename & Version History
// ══════════════════════════════════════════════════════════════════════════════

function getActiveCode() {
  if (window.APP && window.APP.editor) {
    try {
      const v = window.APP.editor.getValue();
      if (v && v.trim().length > 0) return v;
    } catch(e) {}
  }
  if (window.APP) {
    return window.APP.full || window.APP.html || window.APP.js || '';
  }
  return '';
}

// ── ULTRA PROJECTS ────────────────────────────────────────────────────────────
const UltraProjects = {
  STORAGE_KEY: "ultra_projects",

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch(e) {
      return [];
    }
  },

  save(customName) {
    const projects = this.getAll();
    const name = customName || window.APP?.currentAppName || ("My App " + (projects.length + 1));
    const id = "proj_" + Date.now();
    const code = getActiveCode();
    const snap = {
      id: id,
      name: name,
      timestamp: Date.now(),
      html: window.APP?.html || "",
      css:  window.APP?.css  || "",
      js:   window.APP?.js   || "",
      full: window.APP?.full || code,
      size: code.length
    };
    projects.unshift(snap);
    if (projects.length > 50) projects.splice(50);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    return snap;
  },

  load(id) {
    const p = this.getAll().find(x => x.id === id);
    if (!p) return;
    if (typeof loadAppIntoStudio === "function") {
      loadAppIntoStudio({ id: id, name: p.name, html: p.html, css: p.css, js: p.js, full: p.full }, false);
    }
    if (typeof closeModal === "function") closeModal("projects");
    if (typeof showToast === "function") showToast("⚡ \"" + p.name + "\" loaded!", "success");
    UltraHistory.push(p.name + " (Projects)");
  },

  remove(id) {
    const projects = this.getAll().filter(x => x.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    this.renderModal();
    if (typeof showToast === "function") showToast("Project deleted", "info");
  },

  rename(id, newName) {
    const projects = this.getAll();
    const p = projects.find(x => x.id === id);
    if (p && newName && newName.trim()) {
      p.name = newName.trim();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    }
    this.renderModal();
  },

  saveCurrentWithPrompt() {
    const code = getActiveCode();
    if (!code || code.trim().length === 0) {
      if (typeof showToast === "function") showToast("No app loaded to save! Select an app first.", "error");
      return;
    }
    const defaultName = window.APP?.currentAppName || "My App";
    const dlg = document.getElementById("proj-save-dlg");
    const inp = document.getElementById("proj-save-name");
    if (dlg && inp) {
      inp.value = defaultName;
      dlg.style.display = "flex";
      setTimeout(() => { inp.focus(); inp.select(); }, 50);
    } else {
      const snap = this.save(defaultName);
      if (typeof showToast === "function") showToast("📁 \"" + snap.name + "\" saved to Projects!", "success");
    }
  },

  confirmSave() {
    const inp = document.getElementById("proj-save-name");
    const dlg = document.getElementById("proj-save-dlg");
    const name = (inp ? inp.value.trim() : "") || "My App";
    const snap = this.save(name);
    if (dlg) dlg.style.display = "none";
    if (typeof showToast === "function") showToast("📁 \"" + snap.name + "\" saved to Projects!", "success");
    if (typeof consoleLog === "function") consoleLog("📁 Project saved: " + snap.name, "ok");
    this.renderModal();
  },

  renderModal() {
    const container = document.getElementById("projects-list");
    if (!container) return;
    const projects = this.getAll();
    if (projects.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:48px 20px;color:#64748b"><div style="font-size:3rem;margin-bottom:16px">📁</div><div style="color:#94a3b8;font-weight:700;font-size:1rem;margin-bottom:6px">No saved projects yet</div><div style="font-size:0.83rem">Load an app from App Hub or generate one, then click 💾 Save to keep it here.</div></div>';
      return;
    }
    container.innerHTML = projects.map(p => {
      const date = new Date(p.timestamp).toLocaleDateString("en-GB", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" });
      const kb = p.size > 1024 ? (p.size/1024).toFixed(1) + " KB" : p.size + " B";
      const safeName = (p.name || "Untitled").replace(/"/g, "&quot;");
      return '<div class="proj-card">' +
        '<div class="proj-card-icon">📄</div>' +
        '<div class="proj-card-info">' +
          '<div class="proj-card-name" title="' + safeName + '">' + p.name + '</div>' +
          '<div class="proj-card-meta">' + date + ' · ' + kb + '</div>' +
        '</div>' +
        '<div class="proj-card-actions">' +
          '<button onclick="UltraProjects.load(\'' + p.id + '\')">▶ Load</button>' +
          '<button onclick="UltraProjects.startRename(\'' + p.id + '\',\'' + safeName + '\')">✏️ Rename</button>' +
          '<button onclick="UltraProjects.remove(\'' + p.id + '\')" style="color:#f43f5e">🗑️</button>' +
        '</div>' +
      '</div>';
    }).join("");
  },

  startRename(id, currentName) {
    const newName = prompt("Rename project:", currentName);
    if (newName && newName.trim()) this.rename(id, newName.trim());
  }
};

// ── ULTRA HISTORY ─────────────────────────────────────────────────────────────
const UltraHistory = {
  STORAGE_KEY: "ultra_history",
  MAX: 20,

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch(e) {
      return [];
    }
  },

  push(label) {
    const code = getActiveCode();
    if (!code || code.trim().length === 0) return;
    const history = this.getAll();
    history.unshift({
      id: "hist_" + Date.now(),
      label: label || window.APP?.currentAppName || "Snapshot",
      timestamp: Date.now(),
      html: window.APP?.html || "",
      css:  window.APP?.css  || "",
      js:   window.APP?.js   || "",
      full: window.APP?.full || code
    });
    if (history.length > this.MAX) history.splice(this.MAX);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  },

  restore(id) {
    const snap = this.getAll().find(x => x.id === id);
    if (!snap) return;
    if (typeof loadAppIntoStudio === "function") {
      loadAppIntoStudio({ id: id, name: snap.label, html: snap.html, css: snap.css, js: snap.js, full: snap.full }, false);
    }
    if (typeof closeModal === "function") closeModal("projects");
    if (typeof showToast === "function") showToast("⏪ Restored: \"" + snap.label + "\"", "success");
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.renderPanel();
    if (typeof showToast === "function") showToast("History cleared", "info");
  },

  renderPanel() {
    const container = document.getElementById("history-list");
    if (!container) return;
    const history = this.getAll();
    if (history.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:32px;color:#64748b;font-size:0.85rem">No version history yet.<br>Load or generate an app to start tracking versions.</div>';
      return;
    }
    container.innerHTML = history.map((h, i) => {
      const date = new Date(h.timestamp).toLocaleDateString("en-GB", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" });
      return '<div class="hist-item">' +
        '<div class="hist-dot" style="background:' + (i === 0 ? "#6366f1" : "#374151") + '"></div>' +
        '<div class="hist-info">' +
          '<div class="hist-label">' + h.label + '</div>' +
          '<div class="hist-time">' + date + '</div>' +
        '</div>' +
        '<button onclick="UltraHistory.restore(\'' + h.id + '\')" style="background:rgba(99,102,241,0.18);border:1px solid rgba(99,102,241,0.4);color:#a5b4fc;padding:4px 11px;border-radius:6px;font-size:0.78rem;font-weight:700;cursor:pointer;flex-shrink:0">⏪ Restore</button>' +
      '</div>';
    }).join("");
  }
};

// ── ULTRA FAVORITES ───────────────────────────────────────────────────────────
const UltraFavorites = {
  STORAGE_KEY: "ultra_favorites",

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch(e) {
      return [];
    }
  },

  isFavorite(id) {
    return this.getAll().includes(id);
  },

  toggle(id) {
    let favs = this.getAll();
    if (favs.includes(id)) {
      favs = favs.filter(x => x !== id);
      if (typeof showToast === "function") showToast("Removed from Favorites", "info");
    } else {
      favs.push(id);
      if (typeof showToast === "function") showToast("⭐ Added to Favorites!", "success");
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favs));
    if (typeof renderHub === "function") renderHub();
  },

  getCount() {
    return this.getAll().length;
  }
};

// ── MODAL HELPERS ─────────────────────────────────────────────────────────────
function openProjectsModal() {
  if (typeof openModal === "function") {
    openModal("projects");
  } else {
    const m = document.getElementById("modal-projects");
    if (m) m.classList.add("show");
    showProjectsTab("projects");
  }
}

function showProjectsTab(tab) {
  document.querySelectorAll(".proj-tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  const pTab = document.getElementById("tab-projects");
  const hTab = document.getElementById("tab-history");
  if (pTab) pTab.style.display = tab === "projects" ? "block" : "none";
  if (hTab) hTab.style.display = tab === "history"  ? "block" : "none";
  if (tab === "projects") UltraProjects.renderModal();
  if (tab === "history")  UltraHistory.renderPanel();
}

// Auto-push history on app load
(function hookLoadAppHistory() {
  const orig = window.loadAppIntoStudio;
  if (orig) {
    window.loadAppIntoStudio = function(app, shouldFocusCode) {
      orig.call(this, app, shouldFocusCode);
      setTimeout(() => UltraHistory.push(app.name || app.nameF || "App"), 200);
    };
  } else {
    setTimeout(hookLoadAppHistory, 500);
  }
})();
