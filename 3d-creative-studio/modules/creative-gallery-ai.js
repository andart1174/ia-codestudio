/* ============================================================================
   3D CREATIVE STUDIO v2.0 — MODULE 2: VISUAL GALLERY, SEARCH, FAVORITES & AI STYLIST
   ============================================================================ */
(function () {
  'use strict';

  const FAV_KEY = 'creative_studio_favs_v2';

  const CAT_ICONS = {
    buttons: '🔘', business_cards: '🪪', gift_cards: '🎁', surprise_cards: '✉️',
    toggles: '🎛️', parallax_cards: '✨', cursors: '🖱️', typography: '🔤',
    background_assets: '🌌', corner_badges: '🏷️', data_viz: '📊', audio_players: '💿',
    loaders: '🧬', carousels: '🎠', menus: '🧭', widgets: '🤖',
    sections: '🧱', ads_promo: '📣', gamification: '🏆', audio_fx: '🎹'
  };

  function loadFavs() {
    try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
    catch (e) { return new Set(); }
  }

  function saveFavs(set) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...set])); } catch (e) {}
  }

  let favOnly = false;
  let galleryCatFilter = 'all';

  function updateQuickSearchResults(query) {
    const core = window.__CreativeStudioCore;
    if (!core || !window.uiTemplates) return;
    const q = (query || '').trim().toLowerCase();
    const box = document.getElementById('quick-search-results');
    if (!box) return;

    if (!q) {
      box.style.display = 'none';
      box.textContent = '';
      return;
    }

    const lang = core.getLang();
    const matches = Object.entries(window.uiTemplates).filter(([k, t]) => {
      const nFr = (t.name?.fr || '').toLowerCase();
      const nEn = (t.name?.en || '').toLowerCase();
      return k.toLowerCase().includes(q) || nFr.includes(q) || nEn.includes(q) || t.category.toLowerCase().includes(q);
    }).slice(0, 12);

    box.textContent = '';
    if (matches.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = lang === 'fr' ? 'Aucun modèle trouvé.' : 'No matching 3D assets found.';
      box.appendChild(empty);
    } else {
      matches.forEach(([key, t]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-hit-btn';
        const icon = CAT_ICONS[t.category] || '✨';
        const label = t.name?.[lang] || t.name?.en || key;
        btn.textContent = `${icon} ${label}`;
        btn.addEventListener('click', () => {
          core.selectComponentByKey(key);
          box.style.display = 'none';
          const inp = document.getElementById('input-search-comp');
          if (inp) inp.value = '';
        });
        box.appendChild(btn);
      });
    }
    box.style.display = 'flex';
  }

  function renderGalleryGrid() {
    const core = window.__CreativeStudioCore;
    const grid = document.getElementById('gallery-grid');
    if (!core || !grid || !window.uiTemplates) return;

    const lang = core.getLang();
    const q = (document.getElementById('gallery-search-input')?.value || '').trim().toLowerCase();
    const favs = loadFavs();
    const activeKey = core.els.selectComponent?.value;

    grid.textContent = '';
    const entries = Object.entries(window.uiTemplates).filter(([key, t]) => {
      if (favOnly && !favs.has(key)) return false;
      if (galleryCatFilter !== 'all' && t.category !== galleryCatFilter) return false;
      if (!q) return true;
      const hay = `${key} ${t.category} ${t.name?.fr || ''} ${t.name?.en || ''}`.toLowerCase();
      return hay.includes(q);
    });

    const countEl = document.getElementById('gallery-count-label');
    if (countEl) countEl.textContent = `${entries.length} / ${Object.keys(window.uiTemplates).length}`;

    if (entries.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'gallery-empty';
      empty.textContent = lang === 'fr' ? 'Aucun composant dans ce filtre.' : 'No components match this filter.';
      grid.appendChild(empty);
      return;
    }

    entries.forEach(([key, t]) => {
      const card = document.createElement('div');
      card.className = 'gallery-item-card' + (key === activeKey ? ' active' : '');

      const top = document.createElement('div');
      top.className = 'gallery-item-top';
      const ico = document.createElement('span');
      ico.className = 'gallery-item-ico';
      ico.textContent = CAT_ICONS[t.category] || '✨';

      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'gallery-fav-btn' + (favs.has(key) ? ' active' : '');
      favBtn.textContent = favs.has(key) ? '★' : '☆';
      favBtn.title = 'Toggle Favorite';
      favBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const f = loadFavs();
        if (f.has(key)) f.delete(key);
        else f.add(key);
        saveFavs(f);
        syncHeaderFavButton();
        renderGalleryGrid();
      });
      top.append(ico, favBtn);

      const title = document.createElement('div');
      title.className = 'gallery-item-title';
      title.textContent = t.name?.[lang] || t.name?.en || key;

      const badge = document.createElement('div');
      badge.className = 'gallery-item-cat';
      badge.textContent = t.category.replace(/_/g, ' ');

      card.append(top, title, badge);
      card.addEventListener('click', () => {
        core.selectComponentByKey(key);
        const modal = document.getElementById('modal-gallery');
        if (modal) modal.style.display = 'none';
      });
      grid.appendChild(card);
    });
  }

  function populateGalleryCategories() {
    const sel = document.getElementById('gallery-cat-select');
    const core = window.__CreativeStudioCore;
    if (!sel || !core || !core.els.selectCategory) return;
    const prev = sel.value || 'all';
    sel.innerHTML = `<option value="all">${core.getLang() === 'fr' ? 'Toutes les catégories (20)' : 'All Categories (20)'}</option>`;
    Array.from(core.els.selectCategory.options).forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = `${CAT_ICONS[opt.value] || ''} ${opt.textContent}`;
      sel.appendChild(o);
    });
    sel.value = prev;
  }

  function syncHeaderFavButton() {
    const core = window.__CreativeStudioCore;
    const btn = document.getElementById('btn-fav-toggle');
    if (!btn || !core) return;
    const active = core.els.selectComponent?.value;
    const isFav = active && loadFavs().has(active);
    btn.textContent = isFav ? '★' : '☆';
    btn.classList.toggle('active', !!isFav);
  }

  // --------------------------------------------------------------------------
  // AI COMPONENT STYLIST & COPY GENERATOR (EN / FR Natural Language Parser)
  // --------------------------------------------------------------------------
  function applyAiStylePrompt(rawPrompt) {
    const core = window.__CreativeStudioCore;
    if (!core || !rawPrompt) return;
    const q = rawPrompt.trim().toLowerCase();
    if (!q) return;

    // 1. Detect best template
    const rules = [
      { key: 'bento_grid_3d',        re: /\b(bento|apple|grid|saas\s*feature)\b/ },
      { key: 'pricing_flip_toggle',  re: /\b(switch\s*pric|monthly|annual|flip\s*tarif)\b/ },
      { key: 'pricing_section_3d',   re: /\b(pricing|tarif|plans?|subscription)\b/ },
      { key: 'globe_3d_widget',      re: /\b(globe|earth|world|map|network|r[eé]seau)\b/ },
      { key: 'ai_stream_card_3d',    re: /\b(ai|terminal|chat|gpt|llm|stream)\b/ },
      { key: 'synth_piano_3d',       re: /\b(piano|synth|keyboard|clavier|melody)\b/ },
      { key: 'flip_countdown_3d',    re: /\b(countdown|timer|compteur|flash\s*sale)\b/ },
      { key: 'spin_wheel_3d',        re: /\b(wheel|spin|roue|fortune|lucky)\b/ },
      { key: 'orbital_equalizer_3d', re: /\b(equalizer|spectrum|beat|music|audio)\b/ },
      { key: 'vinyl_player_3d',      re: /\b(vinyl|record|player|disque)\b/ },
      { key: 'holographic_card',     re: /\b(business\s*card|carte\s*de\s*visite|profile|holo\s*card)\b/ },
      { key: 'credit_card',          re: /\b(credit|visa|bank|fintech|payment)\b/ },
      { key: 'hero_banner_3d',       re: /\b(hero|landing|banner|header)\b/ },
      { key: 'confetti_btn',         re: /\b(confetti|celebrate|party|launch\s*btn)\b/ },
      { key: 'liquid',               re: /\b(liquid|button|bouton|cta)\b/ }
    ];
    let chosenKey = core.els.selectComponent?.value || 'hero_banner_3d';
    for (const r of rules) {
      if (r.re.test(q) && window.uiTemplates?.[r.key]) {
        chosenKey = r.key;
        break;
      }
    }
    core.selectComponentByKey(chosenKey);

    // 2. Detect color mood
    let pCol = '#00f0ff', sCol = '#ff007f';
    if (/\b(gold|or|luxury|vip|luxe)\b/.test(q))           { pCol = '#f59e0b'; sCol = '#fef08a'; }
    else if (/\b(matrix|hacker|emerald|green|vert)\b/.test(q)) { pCol = '#10b981'; sCol = '#00f0ff'; }
    else if (/\b(cyber|neon|pink|rose|synthwave)\b/.test(q))   { pCol = '#00f0ff'; sCol = '#ff007f'; }
    else if (/\b(purple|violet|mystic|galaxy)\b/.test(q))      { pCol = '#a855f7'; sCol = '#38bdf8'; }
    else if (/\b(fire|red|rouge|black\s*friday|promo)\b/.test(q)) { pCol = '#ef4444'; sCol = '#f59e0b'; }
    else if (/\b(ice|frost|blue|bleu|saas)\b/.test(q))         { pCol = '#38bdf8'; sCol = '#818cf8'; }

    if (core.els.colorPrimary) {
      core.els.colorPrimary.value = pCol;
      if (core.els.valColorPrimary) core.els.valColorPrimary.textContent = pCol.toUpperCase();
    }
    if (core.els.colorSecondary) {
      core.els.colorSecondary.value = sCol;
      if (core.els.valColorSecondary) core.els.valColorSecondary.textContent = sCol.toUpperCase();
    }

    // 3. Apply clean headline/copy if user wants promo/SaaS/VIP flavor
    if (core.els.inputText && core.els.fieldDefaultText?.style.display !== 'none') {
      if (/\b(black\s*friday|promo|sale)\b/.test(q) && chosenKey === 'flip_countdown_3d') {
        core.els.inputText.value = 'BLACK FRIDAY -70% VIP';
      } else if (/\b(saas|ai)\b/.test(q) && chosenKey === 'hero_banner_3d') {
        core.els.inputText.value = 'NEXT-GEN AI 3D SUITE - Ship stunning holographic interfaces in seconds.';
      }
    }

    core.updatePreview();
    core.showToast(`✨ AI Stylist -> ${chosenKey.replace(/_/g, ' ').toUpperCase()} (${pCol} / ${sCol})`, 'success');
  }

  function bindGalleryAndAi() {
    const core = window.__CreativeStudioCore;
    if (!core) return;

    const searchInp = document.getElementById('input-search-comp');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => updateQuickSearchResults(e.target.value));
      document.addEventListener('click', (e) => {
        const box = document.getElementById('quick-search-results');
        if (box && e.target !== searchInp && !box.contains(e.target)) box.style.display = 'none';
      });
    }

    const modal = document.getElementById('modal-gallery');
    const btnOpen = document.getElementById('btn-open-gallery');
    const btnMobOpen = document.getElementById('mob-nav-gallery');
    const btnClose = document.getElementById('btn-gallery-close');
    const gSearch = document.getElementById('gallery-search-input');
    const gCat = document.getElementById('gallery-cat-select');
    const gFavBtn = document.getElementById('btn-gallery-favs-only');

    const openGallery = () => {
      if (!modal) return;
      populateGalleryCategories();
      renderGalleryGrid();
      modal.style.display = 'flex';
    };

    if (btnOpen) btnOpen.addEventListener('click', openGallery);
    if (btnMobOpen) btnMobOpen.addEventListener('click', openGallery);
    if (btnClose && modal) btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    if (gSearch) gSearch.addEventListener('input', renderGalleryGrid);
    if (gCat) gCat.addEventListener('change', (e) => { galleryCatFilter = e.target.value; renderGalleryGrid(); });
    if (gFavBtn) {
      gFavBtn.addEventListener('click', () => {
        favOnly = !favOnly;
        gFavBtn.classList.toggle('active', favOnly);
        renderGalleryGrid();
      });
    }

    const favToggle = document.getElementById('btn-fav-toggle');
    if (favToggle) {
      favToggle.addEventListener('click', () => {
        const key = core.els.selectComponent?.value;
        if (!key) return;
        const favs = loadFavs();
        if (favs.has(key)) favs.delete(key);
        else favs.add(key);
        saveFavs(favs);
        syncHeaderFavButton();
      });
    }

    const aiInp = document.getElementById('ai-stylist-input');
    const aiBtn = document.getElementById('btn-ai-stylist-run');
    if (aiBtn && aiInp) {
      aiBtn.addEventListener('click', () => applyAiStylePrompt(aiInp.value));
      aiInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') applyAiStylePrompt(aiInp.value); });
    }
    document.querySelectorAll('.ai-style-chip').forEach(ch => {
      ch.addEventListener('click', () => {
        const p = ch.dataset.prompt || ch.textContent;
        if (aiInp) aiInp.value = p;
        applyAiStylePrompt(p);
      });
    });

    syncHeaderFavButton();
  }

  const prevChanged = window.__CreativeStudioHooks.onComponentChanged;
  window.__CreativeStudioHooks.onComponentChanged = function (key, tpl) {
    if (typeof prevChanged === 'function') prevChanged(key, tpl);
    syncHeaderFavButton();
  };

  const prevReady = window.__CreativeStudioHooks.onReady;
  window.__CreativeStudioHooks.onReady = function () {
    if (typeof prevReady === 'function') prevReady();
    bindGalleryAndAi();
  };

  window.__CreativeGalleryAI = { applyAiStylePrompt, renderGalleryGrid };
})();
