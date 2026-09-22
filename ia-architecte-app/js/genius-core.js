'use strict';
/* 🏛️ Genius Core | Real-World Functionalization Engine v1.0 */

const GeniusCore = (() => {
  
  // ── 🗄️ GENIUS DB (Persistent CRUD) ──
  const DB = {
    save: (key, data) => {
      localStorage.setItem(`genius_db_${key}`, JSON.stringify(data));
      console.log(`[GeniusDB] Saved ${key}`);
      return Promise.resolve(true);
    },
    load: (key) => {
      const data = localStorage.getItem(`genius_db_${key}`);
      return Promise.resolve(data ? JSON.parse(data) : null);
    },
    push: async (key, item) => {
      const list = await DB.load(key) || [];
      list.push({ id: Date.now(), ...item });
      await DB.save(key, list);
      return list;
    },
    remove: async (key, id) => {
      const list = await DB.load(key) || [];
      const filtered = list.filter(item => item.id !== id);
      await DB.save(key, filtered);
      return filtered;
    }
  };

  // ── 🔐 GENIUS AUTH (Session Management) ──
  const Auth = {
    user: null,
    login: (email, password) => {
      if (email && password) {
        Auth.user = { email, name: email.split('@')[0], role: 'Admin' };
        localStorage.setItem('genius_session', JSON.stringify(Auth.user));
        return true;
      }
      return false;
    },
    logout: () => {
      Auth.user = null;
      localStorage.removeItem('genius_session');
      window.location.reload();
    },
    check: () => {
      const session = localStorage.getItem('genius_session');
      if (session) Auth.user = JSON.parse(session);
      return Auth.user;
    }
  };

  // ── 📊 GENIUS STORE (Global State) ──
  const Store = {
    state: {},
    listeners: [],
    set: (key, val) => {
      Store.state[key] = val;
      Store.listeners.forEach(l => l(Store.state));
    },
    subscribe: (fn) => Store.listeners.push(fn)
  };

  // ── ⚡ GENIUS UI (Auto-Binder) ──
  const UI = {
    toast: (msg) => {
      const t = document.createElement('div');
      t.style = 'position:fixed;bottom:20px;right:20px;background:#3b82f6;color:#fff;padding:12px 25px;border-radius:10px;z-index:9999;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,0.5);transform:translateY(100px);transition:0.3s;';
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.style.transform = 'translateY(0)', 10);
      setTimeout(() => { t.style.transform = 'translateY(100px)'; setTimeout(() => t.remove(), 300); }, 3000);
    }
  };

  // ── 🐞 GENIUS DEBUGGER (Junior UI) ──
  const Debugger = {
    panel: null,
    init: () => {
      if (document.getElementById('genius-debug-overlay')) return;
      const d = document.createElement('div');
      d.id = 'genius-debug-overlay';
      d.style = 'position:fixed;top:10px;left:10px;background:rgba(8,12,20,0.9);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:240px;color:#fff;font-family:sans-serif;font-size:11px;z-index:99999;box-shadow:0 10px 30px rgba(0,0,0,0.5);overflow:hidden;';
      d.innerHTML = `
        <div style="background:rgba(59,130,246,0.2);padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;cursor:move">
          <span style="font-weight:900;letter-spacing:1px">🐞 GENIUS DEBUGGER</span>
          <button onclick="this.parentElement.parentElement.style.height=this.parentElement.parentElement.style.height==='32px'?'auto':'32px'" style="background:none;border:none;color:#fff;cursor:pointer;font-weight:900">-</button>
        </div>
        <div style="padding:10px;display:flex;flex-direction:column;gap:8px">
          <div><b style="color:#10b981">AUTH:</b> <span id="debug-auth">Not Connected</span></div>
          <div><b style="color:#3b82f6">DB (KEYS):</b> <span id="debug-db">-</span></div>
          <div><b style="color:#f59e0b">STORE:</b> <span id="debug-store">{}</span></div>
        </div>
      `;
      document.body.appendChild(d);
      Debugger.panel = d;
      setInterval(Debugger.update, 1000);
    },
    update: () => {
      const auth = Auth.check();
      const elAuth = document.getElementById('debug-auth');
      if (elAuth) elAuth.textContent = auth ? `User: ${auth.name}` : '(None)';
      
      const elDb = document.getElementById('debug-db');
      if (elDb) {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('genius_db_')).map(k => k.replace('genius_db_', ''));
        elDb.textContent = keys.length ? keys.join(', ') : '(Empty)';
      }

      const elStore = document.getElementById('debug-store');
      if (elStore) elStore.textContent = JSON.stringify(Store.state);
    }
  };

  return { DB, Auth, Store, UI, Debugger };
})();

// Export to Global
window.GeniusCore = GeniusCore;
