/**
 * AD-GENIUS AI PRO — Unified Pro Suite Engine
 * Implements:
 * 1. Dashboard Smart Search (Ctrl+K), Category Filters, Favorites & Recent
 * 2. Global Brand Kit Sync ("Set Once, Apply Everywhere")
 * 3. AI Campaign Director (Cross-Studio Copy & Palette Generator)
 * 4. Universal Studio Pro Toolbar (Mobile Preview/Controls Switcher for all 22 studios)
 * 5. IAB Display & Social Safe-Zone + Mockup Frame Switcher
 * 6. Real-Time WCAG 2.1 Contrast Auditor Pill
 * 7. Universal 60fps WebM Video Capture (Pro)
 * 8. Campaign Bundle ZIP Exporter + UTM & GA4/Meta Pixel Injector (Pro)
 * 9. Multi-Language Bulk Ad Export ZIP (EN/FR/ES/DE/RO) (Pro)
 * 10. ROI / ROAS Live Funnel Calculator
 * 11. Preset Vault + #cfg= Shareable Config Link
 * 12. Dynamic EN/FR Panel Translation Observer
 */
(function () {
    'use strict';

    var STORAGE_FAVS = 'ad_genius_favs_v1';
    var STORAGE_RECENT = 'ad_genius_recent_v1';
    var STORAGE_BRAND = 'ad_genius_brand_kit_v1';
    var STORAGE_VAULT = 'ad_genius_vault_v1';

    function isFr() { return window.lang === 'fr'; }
    function U() { return window.GeniusUtils || {}; }
    function esc(s) { return U().escapeHtml ? U().escapeHtml(s) : String(s || ''); }

    function loadJSON(key, fallback) {
        try {
            var v = localStorage.getItem(key);
            return v ? JSON.parse(v) : fallback;
        } catch (e) { return fallback; }
    }
    function saveJSON(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    }

    var defaultBrand = {
        name: 'IA Code Studio',
        tagline: 'Next-Gen AI Marketing Experiences',
        cta: 'Claim Offer Now',
        url: 'https://ia-codestudio.com',
        primary: '#3b82f6',
        accent: '#8b5cf6',
        text: '#ffffff',
        bg: '#0f172a',
        logo: ''
    };

    /* ================================================================
       1. DASHBOARD SEARCH, CATEGORY FILTERS, FAVORITES & RECENT
       ================================================================ */
    var dashState = { query: '', cat: 'all' };

    function initDashboardFilters() {
        var searchInput = document.getElementById('dash-search-input');
        var pills = document.querySelectorAll('.dash-cat-pill');
        var grid = document.getElementById('dashboard-grid-view');
        if (!grid) return;

        function refreshFavButtons() {
            var favs = loadJSON(STORAGE_FAVS, []);
            grid.querySelectorAll('.dash-fav-btn').forEach(function (btn) {
                var id = btn.getAttribute('data-fav');
                var active = favs.indexOf(id) !== -1;
                btn.textContent = active ? '★' : '☆';
                btn.classList.toggle('is-fav', active);
            });
        }

        function applyFilter() {
            var cards = grid.querySelectorAll('.dash-card-item');
            var favs = loadJSON(STORAGE_FAVS, []);
            var recent = loadJSON(STORAGE_RECENT, []);
            var q = dashState.query.trim().toLowerCase();
            var shown = 0;

            cards.forEach(function (card) {
                var id = card.getAttribute('data-studio') || '';
                var cat = card.getAttribute('data-cat') || '';
                var text = (card.textContent || '').toLowerCase() + ' ' + id;
                var matchQ = !q || text.indexOf(q) !== -1;
                var matchCat = true;
                if (dashState.cat === 'favorites') matchCat = favs.indexOf(id) !== -1;
                else if (dashState.cat === 'recent') matchCat = recent.indexOf(id) !== -1;
                else if (dashState.cat !== 'all') matchCat = cat === dashState.cat;

                var visible = matchQ && matchCat;
                card.style.display = visible ? '' : 'none';
                if (visible) shown++;
            });

            var badge = document.getElementById('dash-count-badge');
            if (badge) badge.textContent = shown + ' / ' + cards.length;
        }

        // Favorite star button click (stop propagation so card doesn't open)
        grid.addEventListener('click', function (e) {
            var favBtn = e.target.closest('.dash-fav-btn');
            if (!favBtn) return;
            e.preventDefault();
            e.stopPropagation();
            var id = favBtn.getAttribute('data-fav');
            var favs = loadJSON(STORAGE_FAVS, []);
            var idx = favs.indexOf(id);
            if (idx === -1) {
                favs.push(id);
                if (U().showToast) U().showToast(isFr() ? '⭐ Ajouté aux favoris' : '⭐ Added to favorites', 'success');
            } else {
                favs.splice(idx, 1);
            }
            saveJSON(STORAGE_FAVS, favs);
            refreshFavButtons();
            if (dashState.cat === 'favorites') applyFilter();
        });

        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                dashState.query = e.target.value || '';
                applyFilter();
            });
        }

        pills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                pills.forEach(function (p) { p.classList.remove('active'); });
                pill.classList.add('active');
                dashState.cat = pill.getAttribute('data-cat') || 'all';
                applyFilter();
            });
        });

        // Ctrl+K / Cmd+K quick focus on dashboard search
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                var tb = document.getElementById('dashboard-toolbar');
                if (tb && tb.style.display !== 'none' && searchInput) {
                    e.preventDefault();
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });

        refreshFavButtons();
        applyFilter();
        window._refreshDashboardFilters = applyFilter;
    }

    function recordRecentStudio(id) {
        if (!id) return;
        var recent = loadJSON(STORAGE_RECENT, []).filter(function (x) { return x !== id; });
        recent.unshift(id);
        saveJSON(STORAGE_RECENT, recent.slice(0, 8));
    }

    /* ================================================================
       2. GLOBAL BRAND KIT SYNC ("SET ONCE, APPLY EVERYWHERE")
       ================================================================ */
    function getBrandKit() {
        return Object.assign({}, defaultBrand, loadJSON(STORAGE_BRAND, {}));
    }

    function applyBrandKitToActiveStudio(customBrand) {
        var kit = customBrand || getBrandKit();
        var activeWs = document.querySelector('.workspace.active-workspace');
        if (!activeWs) {
            if (U().showToast) U().showToast(isFr() ? 'Ouvrez un studio pour appliquer votre Brand Kit !' : 'Open any studio first to apply your Brand Kit!', 'warn');
            return;
        }
        var applied = 0;

        // Special clean path for Core Ad Genius
        if (window.activeTab === 'core-ad-genius') {
            var mapCore = [
                ['input-title', kit.name],
                ['input-desc', kit.tagline],
                ['input-btn-text', kit.cta],
                ['input-btn-url', kit.url],
                ['color-primary', kit.primary],
                ['color-accent', kit.accent]
            ];
            mapCore.forEach(function (pair) {
                var el = document.getElementById(pair[0]);
                if (el && pair[1]) {
                    el.value = pair[1];
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    applied++;
                }
            });
        } else {
            // Smart generic heuristic across all 22 studios
            var inputs = activeWs.querySelectorAll('input, textarea');
            var colorIndex = 0;
            inputs.forEach(function (inp) {
                if (inp.disabled || inp.readOnly) return;
                var id = (inp.id || '').toLowerCase();
                var ph = (inp.placeholder || '').toLowerCase();
                var type = (inp.type || 'text').toLowerCase();

                if (type === 'color') {
                    if (/bg|back/.test(id)) inp.value = kit.bg;
                    else if (/text|txt|fg|head/.test(id)) inp.value = kit.text;
                    else if (/acc|glow|sec|ring|btn/.test(id)) inp.value = kit.accent;
                    else if (colorIndex === 0) inp.value = kit.primary;
                    else if (colorIndex === 1) inp.value = kit.accent;
                    else return;
                    colorIndex++;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                    inp.dispatchEvent(new Event('change', { bubbles: true }));
                    applied++;
                } else if (type === 'url' || /url|link|site|web|qr/.test(id) || /https?:/.test(ph)) {
                    if (kit.url) {
                        inp.value = kit.url;
                        inp.dispatchEvent(new Event('input', { bubbles: true }));
                        applied++;
                    }
                } else if (type === 'text' || inp.tagName === 'TEXTAREA') {
                    if (/title|head|name|brand|text|company|shop|rest/.test(id) && !/sub|btn|code|url/.test(id)) {
                        inp.value = kit.name;
                        inp.dispatchEvent(new Event('input', { bubbles: true }));
                        applied++;
                    } else if (/sub|desc|tag|bio|motto|details/.test(id)) {
                        inp.value = kit.tagline;
                        inp.dispatchEvent(new Event('input', { bubbles: true }));
                        applied++;
                    } else if (/cta|btn/.test(id)) {
                        inp.value = kit.cta;
                        inp.dispatchEvent(new Event('input', { bubbles: true }));
                        applied++;
                    }
                }
            });
        }

        updateContrastBadge();
        if (U().showToast) {
            U().showToast(
                (isFr() ? '🎨 Brand Kit appliqué (' : '🎨 Brand Kit applied (') + applied + (isFr() ? ' champs synchronisés)' : ' fields synced)'),
                'success'
            );
        }
    }

    function openBrandKitModal() {
        var kit = getBrandKit();
        var fr = isFr();
        var html =
            '<div class="gs-modal-grid">' +
            '<div><label>' + (fr ? 'Nom de la marque / Titre' : 'Brand Name / Headline') + '</label><input id="bk-name" type="text" value="' + esc(kit.name) + '"></div>' +
            '<div><label>' + (fr ? 'Slogan / Accroche' : 'Tagline / Subheadline') + '</label><input id="bk-tag" type="text" value="' + esc(kit.tagline) + '"></div>' +
            '<div><label>' + (fr ? 'Texte CTA par défaut' : 'Default CTA Text') + '</label><input id="bk-cta" type="text" value="' + esc(kit.cta) + '"></div>' +
            '<div><label>' + (fr ? 'URL du site web' : 'Target Website URL') + '</label><input id="bk-url" type="url" value="' + esc(kit.url) + '"></div>' +
            '</div>' +
            '<div class="gs-color-row">' +
            '<div><label>' + (fr ? 'Principale' : 'Primary') + '</label><input id="bk-primary" type="color" value="' + esc(kit.primary) + '"></div>' +
            '<div><label>' + (fr ? 'Accent' : 'Accent') + '</label><input id="bk-accent" type="color" value="' + esc(kit.accent) + '"></div>' +
            '<div><label>' + (fr ? 'Fond' : 'Background') + '</label><input id="bk-bg" type="color" value="' + esc(kit.bg) + '"></div>' +
            '<div><label>' + (fr ? 'Texte' : 'Text') + '</label><input id="bk-text" type="color" value="' + esc(kit.text) + '"></div>' +
            '</div>' +
            '<div id="bk-wcag-preview" class="gs-wcag-bar"></div>' +
            '<div class="gs-modal-actions">' +
            '<button type="button" id="bk-save" class="gs-btn-sec">💾 ' + (fr ? 'Sauvegarder' : 'Save Kit') + '</button>' +
            '<button type="button" id="bk-apply" class="gs-btn-pri">⚡ ' + (fr ? 'Sauver & Appliquer au Studio' : 'Save & Apply to Studio') + '</button>' +
            '</div>';

        var modal = openSuiteModal('🎨 ' + (fr ? 'Brand Kit Global' : 'Global Brand Kit Sync'), html);
        function refreshWcag() {
            var bg = modal.querySelector('#bk-bg').value;
            var tx = modal.querySelector('#bk-text').value;
            var pr = modal.querySelector('#bk-primary').value;
            var b1 = U().formatContrastBadge ? U().formatContrastBadge(bg, tx, window.lang) : { text: '' };
            var b2 = U().formatContrastBadge ? U().formatContrastBadge(bg, pr, window.lang) : { text: '' };
            modal.querySelector('#bk-wcag-preview').innerHTML =
                '<span>' + (fr ? 'Texte/Fond :' : 'Text/Bg:') + ' <strong style="color:' + b1.color + '">' + b1.text + '</strong></span>' +
                '<span>' + (fr ? 'Accent/Fond :' : 'Primary/Bg:') + ' <strong style="color:' + b2.color + '">' + b2.text + '</strong></span>';
        }
        ['#bk-bg', '#bk-text', '#bk-primary'].forEach(function (sel) {
            modal.querySelector(sel).addEventListener('input', refreshWcag);
        });
        refreshWcag();

        function readForm() {
            return {
                name: modal.querySelector('#bk-name').value.trim() || defaultBrand.name,
                tagline: modal.querySelector('#bk-tag').value.trim() || defaultBrand.tagline,
                cta: modal.querySelector('#bk-cta').value.trim() || defaultBrand.cta,
                url: modal.querySelector('#bk-url').value.trim() || defaultBrand.url,
                primary: modal.querySelector('#bk-primary').value,
                accent: modal.querySelector('#bk-accent').value,
                bg: modal.querySelector('#bk-bg').value,
                text: modal.querySelector('#bk-text').value,
                logo: kit.logo || ''
            };
        }
        modal.querySelector('#bk-save').onclick = function () {
            saveJSON(STORAGE_BRAND, readForm());
            if (U().showToast) U().showToast(fr ? '💾 Brand Kit sauvegardé !' : '💾 Brand Kit saved!', 'success');
            modal.remove();
        };
        modal.querySelector('#bk-apply').onclick = function () {
            var next = readForm();
            saveJSON(STORAGE_BRAND, next);
            modal.remove();
            applyBrandKitToActiveStudio(next);
        };
    }

    /* ================================================================
       3. AI CAMPAIGN DIRECTOR (CROSS-STUDIO GENERATOR)
       ================================================================ */
    function generateDirectorVariants(product, audience, tone, fr) {
        var prod = product || (fr ? 'Votre Produit Star' : 'Your Hero Product');
        var aud = audience || (fr ? 'clients exigeants' : 'smart buyers');
        var palettes = {
            urgency: [
                { p: '#ef4444', a: '#f59e0b', bg: '#09090b' },
                { p: '#f97316', a: '#ec4899', bg: '#0f172a' }
            ],
            luxury: [
                { p: '#d4af37', a: '#fef08a', bg: '#050507' },
                { p: '#a855f7', a: '#ec4899', bg: '#090414' }
            ],
            playful: [
                { p: '#06b6d4', a: '#84cc16', bg: '#0b1120' },
                { p: '#ec4899', a: '#3b82f6', bg: '#0f172a' }
            ],
            b2b: [
                { p: '#3b82f6', a: '#06b6d4', bg: '#020617' },
                { p: '#10b981', a: '#3b82f6', bg: '#06131a' }
            ]
        };
        var pal = palettes[tone] || palettes.urgency;
        if (fr) {
            return [
                { title: 'FLASH -30% : ' + prod.toUpperCase(), sub: 'Offre réservée aux ' + aud + ' — Expire ce soir !', cta: 'Profiter de -30%', code: 'FLASH30', ctr: '5.8%', p: pal[0].p, a: pal[0].a, bg: pal[0].bg },
                { title: 'NOUVEAU : ' + prod, sub: 'Conçu sur mesure pour les ' + aud + '. Résultats dès le 1er jour.', cta: 'Découvrir Maintenant', code: 'VIP20', ctr: '4.9%', p: pal[1].p, a: pal[1].a, bg: pal[1].bg },
                { title: 'DERNIÈRE CHANCE ⚡ ' + prod, sub: 'Stock limité ! Rejoignez déjà +4 200 ' + aud + ' satisfaits.', cta: 'Réserver mon Accès', code: 'LAST25', ctr: '6.2%', p: pal[0].p, a: pal[1].a, bg: pal[0].bg },
                { title: 'ÉDITION EXCLUSIVE ' + prod, sub: 'Livraison offerte + bonus VIP inclus aujourd\'hui uniquement.', cta: 'Débloquer le Bonus', code: 'GOLD15', ctr: '5.1%', p: pal[1].p, a: pal[0].a, bg: pal[1].bg },
                { title: 'BOOSTEZ VOS RÉSULTATS AVEC ' + prod, sub: 'Essayez sans risque pendant 14 jours. Pour ' + aud + '.', cta: 'Essai Gratuit →', code: 'TRYFREE', ctr: '5.4%', p: pal[0].p, a: pal[0].a, bg: pal[1].bg }
            ];
        }
        return [
            { title: 'FLASH 30% OFF: ' + prod.toUpperCase(), sub: 'Exclusive deal for ' + aud + ' — Ends tonight!', cta: 'Claim 30% Off', code: 'FLASH30', ctr: '5.8%', p: pal[0].p, a: pal[0].a, bg: pal[0].bg },
            { title: 'MEET THE NEW ' + prod.toUpperCase(), sub: 'Built specifically for ' + aud + '. Upgrade in seconds.', cta: 'Explore Now →', code: 'VIP20', ctr: '4.9%', p: pal[1].p, a: pal[1].a, bg: pal[1].bg },
            { title: 'FINAL HOURS ⚡ ' + prod, sub: 'Selling fast! Trusted by 4,200+ ' + aud + ' worldwide.', cta: 'Unlock Instant Access', code: 'LAST25', ctr: '6.2%', p: pal[0].p, a: pal[1].a, bg: pal[0].bg },
            { title: 'VIP EDITION: ' + prod, sub: 'Free shipping + exclusive bonus gift included today only.', cta: 'Get My VIP Offer', code: 'GOLD15', ctr: '5.1%', p: pal[1].p, a: pal[0].a, bg: pal[1].bg },
            { title: '10X YOUR RESULTS WITH ' + prod, sub: 'Risk-free 14-day trial crafted for ' + aud + '.', cta: 'Start Free Trial →', code: 'TRYFREE', ctr: '5.4%', p: pal[0].p, a: pal[0].a, bg: pal[1].bg }
        ];
    }

    function openAIDirectorModal() {
        var fr = isFr();
        var html =
            '<div class="gs-modal-grid">' +
            '<div><label>' + (fr ? 'Produit / Offre' : 'Product / Offer') + '</label><input id="aid-prod" type="text" placeholder="' + (fr ? 'Ex: Sneakers Aero X, Formation IA...' : 'e.g., Aero X Sneakers, SaaS Suite...') + '"></div>' +
            '<div><label>' + (fr ? 'Audience cible' : 'Target Audience') + '</label><input id="aid-aud" type="text" placeholder="' + (fr ? 'Ex: créateurs, entrepreneurs' : 'e.g., founders, gamers, shoppers') + '"></div>' +
            '<div><label>' + (fr ? 'Ton & Style' : 'Tone & Mood') + '</label><select id="aid-tone">' +
            '<option value="urgency">' + (fr ? '🔥 Urgence & Flash Sale' : '🔥 Urgency & Flash Sale') + '</option>' +
            '<option value="luxury">' + (fr ? '👑 Luxe & Premium' : '👑 Luxury & High-Ticket') + '</option>' +
            '<option value="playful">' + (fr ? '🎉 Ludique & Viral' : '🎉 Playful & Viral') + '</option>' +
            '<option value="b2b">' + (fr ? '💼 B2B & SaaS Pro' : '💼 B2B & SaaS Authority') + '</option>' +
            '</select></div>' +
            '<div style="display:flex;align-items:flex-end;"><button type="button" id="aid-gen" class="gs-btn-pri" style="width:100%;">✨ ' + (fr ? 'Générer 5 Campagnes IA' : 'Generate 5 AI Variants') + '</button></div>' +
            '</div>' +
            '<div id="aid-results" class="aid-results"></div>';

        var modal = openSuiteModal('🧠 ' + (fr ? 'Directeur de Campagne IA' : 'AI Campaign Director'), html);

        function renderVariants() {
            var prod = modal.querySelector('#aid-prod').value.trim();
            var aud = modal.querySelector('#aid-aud').value.trim();
            var tone = modal.querySelector('#aid-tone').value;
            var variants = generateDirectorVariants(prod, aud, tone, fr);
            var box = modal.querySelector('#aid-results');
            box.innerHTML = variants.map(function (v, idx) {
                return '<div class="aid-card">' +
                    '<div class="aid-card-top">' +
                    '<span class="aid-swatch" style="background:linear-gradient(135deg,' + v.p + ',' + v.a + ');"></span>' +
                    '<strong>' + esc(v.title) + '</strong>' +
                    '<span class="aid-ctr">CTR ~' + v.ctr + '</span>' +
                    '</div>' +
                    '<p>' + esc(v.sub) + '</p>' +
                    '<div class="aid-card-foot">' +
                    '<span class="aid-chip">CTA: ' + esc(v.cta) + '</span>' +
                    '<span class="aid-chip">CODE: ' + esc(v.code) + '</span>' +
                    '<button type="button" class="gs-btn-mini" data-vidx="' + idx + '">⚡ ' + (fr ? 'Injecter dans le Studio' : 'Apply to Active Studio') + '</button>' +
                    '</div></div>';
            }).join('');

            box.querySelectorAll('[data-vidx]').forEach(function (btn) {
                btn.onclick = function () {
                    var v = variants[parseInt(btn.getAttribute('data-vidx'), 10)];
                    modal.remove();
                    if (!window.activeTab) {
                        window.activateWorkspace('core-ad-genius');
                    }
                    setTimeout(function () {
                        applyBrandKitToActiveStudio({
                            name: v.title,
                            tagline: v.sub,
                            cta: v.cta,
                            url: getBrandKit().url,
                            primary: v.p,
                            accent: v.a,
                            bg: v.bg,
                            text: '#ffffff'
                        });
                    }, 120);
                };
            });
        }
        modal.querySelector('#aid-gen').onclick = renderVariants;
        renderVariants();
    }

    /* ================================================================
       4. ROI / ROAS LIVE FUNNEL CALCULATOR
       ================================================================ */
    function openROICalculatorModal() {
        var fr = isFr();
        var html =
            '<div class="gs-modal-grid">' +
            '<div><label>' + (fr ? 'Budget Quotidien ($)' : 'Daily Ad Spend ($)') + '</label><input id="roi-budget" type="number" min="10" value="150"></div>' +
            '<div><label>CPC ($)</label><input id="roi-cpc" type="number" min="0.05" step="0.05" value="0.65"></div>' +
            '<div><label>' + (fr ? 'Taux de Conversion (%)' : 'Landing Conv. Rate (%)') + '</label><input id="roi-cvr" type="number" min="0.2" step="0.2" value="3.8"></div>' +
            '<div><label>' + (fr ? 'Panier Moyen / AOV ($)' : 'Avg Order Value ($)') + '</label><input id="roi-aov" type="number" min="5" value="79"></div>' +
            '</div>' +
            '<div id="roi-kpis" class="roi-kpis"></div>' +
            '<div id="roi-bar-wrap" class="roi-bar-wrap"></div>';

        var modal = openSuiteModal('📈 ' + (fr ? 'Simulateur ROI & ROAS Publicitaire' : 'Live Ad Funnel ROI & ROAS Calculator'), html);

        function recalc() {
            var budget = Math.max(1, parseFloat(modal.querySelector('#roi-budget').value) || 100);
            var cpc = Math.max(0.05, parseFloat(modal.querySelector('#roi-cpc').value) || 0.5);
            var cvr = Math.max(0.1, parseFloat(modal.querySelector('#roi-cvr').value) || 3.0) / 100;
            var aov = Math.max(1, parseFloat(modal.querySelector('#roi-aov').value) || 50);

            var clicks = Math.round(budget / cpc);
            var convs = clicks * cvr;
            var rev = convs * aov;
            var profit = rev - budget;
            var roas = rev / budget;
            var cpa = convs > 0 ? budget / convs : 0;

            modal.querySelector('#roi-kpis').innerHTML =
                '<div class="roi-kpi"><span>' + (fr ? 'Clics / jour' : 'Clicks / day') + '</span><strong>' + clicks.toLocaleString() + '</strong></div>' +
                '<div class="roi-kpi"><span>' + (fr ? 'Ventes / jour' : 'Sales / day') + '</span><strong>' + convs.toFixed(1) + '</strong></div>' +
                '<div class="roi-kpi"><span>CPA</span><strong>$' + cpa.toFixed(2) + '</strong></div>' +
                '<div class="roi-kpi"><span>ROAS</span><strong style="color:' + (roas >= 2 ? '#10b981' : roas >= 1 ? '#f59e0b' : '#ef4444') + '">' + roas.toFixed(2) + 'x</strong></div>' +
                '<div class="roi-kpi"><span>' + (fr ? 'Revenu 30j' : '30d Revenue') + '</span><strong style="color:#38bdf8">$' + Math.round(rev * 30).toLocaleString() + '</strong></div>' +
                '<div class="roi-kpi"><span>' + (fr ? 'Profit Net 30j' : '30d Net Profit') + '</span><strong style="color:' + (profit >= 0 ? '#10b981' : '#ef4444') + '">$' + Math.round(profit * 30).toLocaleString() + '</strong></div>';

            var revPct = Math.min(100, Math.round((rev / Math.max(rev, budget * 1.2)) * 100));
            var costPct = Math.min(100, Math.round((budget / Math.max(rev, budget * 1.2)) * 100));
            modal.querySelector('#roi-bar-wrap').innerHTML =
                '<div class="roi-bar-row"><span>' + (fr ? 'Dépense' : 'Ad Spend') + ' ($' + budget.toFixed(0) + ')</span><div class="roi-track"><div style="width:' + costPct + '%;background:#f43f5e;"></div></div></div>' +
                '<div class="roi-bar-row"><span>' + (fr ? 'Revenu Estimé' : 'Est. Revenue') + ' ($' + rev.toFixed(0) + ')</span><div class="roi-track"><div style="width:' + revPct + '%;background:linear-gradient(90deg,#10b981,#38bdf8);"></div></div></div>';
        }
        ['#roi-budget', '#roi-cpc', '#roi-cvr', '#roi-aov'].forEach(function (id) {
            modal.querySelector(id).addEventListener('input', recalc);
        });
        recalc();
    }

    /* ================================================================
       5. CAMPAIGN BUNDLE ZIP + UTM/PIXEL + MULTI-LANG BULK EXPORT (PRO)
       ================================================================ */
    function buildActiveAdHTMLSnapshot(utmQuery, gaId, fbId, langOverride) {
        var activeWs = document.querySelector('.workspace.active-workspace');
        var studioId = window.activeTab || 'core-ad-genius';
        var htmlCode = '';

        if (typeof window.__getExpandedStudioHTML === 'function') {
            var expandedCode = window.__getExpandedStudioHTML(studioId);
            if (expandedCode) htmlCode = expandedCode;
        }

        if (!htmlCode && studioId === 'core-ad-genius') {
            var ta = document.getElementById('code-output');
            htmlCode = ta ? ta.value : '';
        } else if (!htmlCode && activeWs) {
            var iframe = activeWs.querySelector('iframe');
            var cvs = activeWs.querySelector('canvas');
            if (iframe && iframe.srcdoc) {
                htmlCode = iframe.srcdoc;
            } else {
                var kit = getBrandKit();
                var snapImg = '';
                try { if (cvs) snapImg = cvs.toDataURL('image/png'); } catch (e) {}
                var ctaUrl = (U().sanitizeUrl ? U().sanitizeUrl(kit.url) : kit.url) + (utmQuery || '');
                htmlCode = '<!DOCTYPE html><html lang="' + (langOverride || window.lang || 'en') + '"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>' + esc(kit.name) + ' — AD-GENIUS AI PRO</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#020617;font-family:Inter,system-ui,sans-serif;color:#fff;padding:20px;box-sizing:border-box}.card{max-width:640px;width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.6)}.card img{width:100%;display:block;max-height:420px;object-fit:contain;background:#020617}.card-body{padding:24px}.btn{display:inline-block;margin-top:14px;padding:12px 28px;border-radius:10px;background:linear-gradient(135deg,' + kit.primary + ',' + kit.accent + ');color:#fff;font-weight:800;text-decoration:none}</style></head><body><div class="card">' +
                    (snapImg ? '<img src="' + snapImg + '" alt="Ad Creative">' : '') +
                    '<div class="card-body"><h2>' + esc(kit.name) + '</h2><p style="color:#94a3b8">' + esc(kit.tagline) + '</p><a class="btn" href="' + esc(ctaUrl) + '" target="_blank" rel="noopener">' + esc(kit.cta) + '</a></div></div></body></html>';
            }
        }

        if (utmQuery && htmlCode) {
            htmlCode = htmlCode.replace(/href="(https?:\/\/[^"]+)"/g, function (m, url) {
                if (url.indexOf('ia-codestudio.com') !== -1 && url.indexOf('utm_') === -1 && htmlCode.indexOf('Made with IA Code Studio') !== -1 && m.indexOf('ia-codestudio.com"') !== -1) {
                    return m;
                }
                var sep = url.indexOf('?') === -1 ? '?' : '&';
                return 'href="' + url + sep + utmQuery.replace(/^\?/, '') + '"';
            });
        }

        var pixelSnippets = '';
        if (gaId) {
            pixelSnippets += '\n<script async src="https://www.googletagmanager.com/gtag/js?id=' + esc(gaId) + '"></script>' +
                '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","' + esc(gaId) + '");document.addEventListener("click",function(e){if(e.target.closest("a,button"))gtag("event","ad_cta_click",{studio:"' + esc(studioId) + '"});});</script>';
        }
        if (fbId) {
            pixelSnippets += '\n<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","' + esc(fbId) + '");fbq("track","PageView");document.addEventListener("click",function(e){if(e.target.closest("a,button"))fbq("track","Lead");});</script>';
        }
        if (pixelSnippets && htmlCode.indexOf('</head>') !== -1) {
            htmlCode = htmlCode.replace('</head>', pixelSnippets + '\n</head>');
        }
        return htmlCode;
    }

    function openBundleExportModal() {
        if (typeof window.requirePremium === 'function' && !window.checkIsPremium()) {
            window.showPremiumModal();
            return;
        }
        var fr = isFr();
        var html =
            '<div class="gs-modal-grid">' +
            '<div><label>utm_source</label><input id="utm-src" type="text" value="google_display"></div>' +
            '<div><label>utm_medium</label><input id="utm-med" type="text" value="cpc"></div>' +
            '<div><label>utm_campaign</label><input id="utm-cmp" type="text" value="ad_genius_launch"></div>' +
            '<div><label>GA4 Measurement ID (opt.)</label><input id="utm-ga" type="text" placeholder="G-XXXXXXXXXX"></div>' +
            '<div><label>Meta Pixel ID (opt.)</label><input id="utm-fb" type="text" placeholder="123456789012345"></div>' +
            '<div><label>' + (fr ? 'Format IAB cible' : 'Target IAB Slot') + '</label><select id="utm-slot"><option value="responsive">Responsive 100%</option><option value="300x250">300×250 Medium Rectangle</option><option value="728x90">728×90 Leaderboard</option><option value="160x600">160×600 Skyscraper</option><option value="1080x1920">1080×1920 Reels / TikTok</option></select></div>' +
            '</div>' +
            '<div class="gs-modal-actions" style="margin-top:16px;">' +
            '<button type="button" id="btn-dl-bundle-zip" class="gs-btn-pri">📦 ' + (fr ? 'Télécharger Campaign Bundle ZIP' : 'Download Campaign Bundle ZIP') + '</button>' +
            '<button type="button" id="btn-dl-multilang-zip" class="gs-btn-sec">🌍 ' + (fr ? 'Export Multi-Langues (EN/FR/ES/DE/RO)' : 'Multi-Lang Bulk ZIP (EN/FR/ES/DE/RO)') + '</button>' +
            '</div>';

        var modal = openSuiteModal('📦 ' + (fr ? 'Export Campagne Pro + UTM & Pixels' : 'Pro Campaign Bundle + UTM & Pixel Builder'), html);

        function readTracking() {
            var src = encodeURIComponent(modal.querySelector('#utm-src').value.trim());
            var med = encodeURIComponent(modal.querySelector('#utm-med').value.trim());
            var cmp = encodeURIComponent(modal.querySelector('#utm-cmp').value.trim());
            var q = [];
            if (src) q.push('utm_source=' + src);
            if (med) q.push('utm_medium=' + med);
            if (cmp) q.push('utm_campaign=' + cmp);
            return {
                utm: q.length ? '?' + q.join('&') : '',
                ga: modal.querySelector('#utm-ga').value.trim(),
                fb: modal.querySelector('#utm-fb').value.trim(),
                slot: modal.querySelector('#utm-slot').value
            };
        }

        modal.querySelector('#btn-dl-bundle-zip').onclick = function () {
            if (typeof JSZip === 'undefined') {
                U().showToast(fr ? 'JSZip indisponible hors ligne.' : 'JSZip is not loaded.', 'error');
                return;
            }
            var tr = readTracking();
            var zip = new JSZip();
            var adHtml = buildActiveAdHTMLSnapshot(tr.utm, tr.ga, tr.fb);
            zip.file('index.html', adHtml);
            var dims = tr.slot === 'responsive' ? 'width="100%" height="420"' : ('width="' + tr.slot.split('x')[0] + '" height="' + tr.slot.split('x')[1] + '"');
            zip.file('embed-snippet.txt', '<iframe src="index.html" ' + dims + ' style="border:0;overflow:hidden;border-radius:12px;" loading="lazy"></iframe>');
            zip.file('README.txt', 'AD-GENIUS AI PRO Campaign Bundle\nStudio: ' + (window.activeTab || 'core') + '\nSlot: ' + tr.slot + '\nUTM: ' + (tr.utm || 'none') + '\nGA4: ' + (tr.ga || 'none') + '\nMeta Pixel: ' + (tr.fb || 'none') + '\n\nUpload this ZIP directly to Google Display Network, Meta Ads, or your web server.');

            var activeWs = document.querySelector('.workspace.active-workspace');
            var cvs = activeWs ? activeWs.querySelector('canvas') : null;
            if (cvs) {
                try {
                    var png = cvs.toDataURL('image/png').split(',')[1];
                    if (png) zip.file('backup-fallback.png', png, { base64: true });
                } catch (e) {}
            }

            zip.generateAsync({ type: 'blob' }).then(function (blob) {
                U().safeDownloadBlob(blob, 'ad-genius-campaign-' + (window.activeTab || 'bundle') + '.zip');
                U().showToast(fr ? '📦 Pack Campagne ZIP téléchargé !' : '📦 Campaign Bundle ZIP downloaded!', 'success');
                modal.remove();
            });
        };

        modal.querySelector('#btn-dl-multilang-zip').onclick = function () {
            if (typeof JSZip === 'undefined') {
                U().showToast(fr ? 'JSZip indisponible.' : 'JSZip not loaded.', 'error');
                return;
            }
            var tr = readTracking();
            var zip = new JSZip();
            var locales = [
                { code: 'en', cta: 'Claim Offer Now', badge: 'LIMITED OFFER' },
                { code: 'fr', cta: 'Profiter de l\'Offre', badge: 'OFFRE LIMITÉE' },
                { code: 'es', cta: 'Reclamar Oferta', badge: 'OFERTA LIMITADA' },
                { code: 'de', cta: 'Angebot Sichern', badge: 'LIMITIERTES ANGEBOT' },
                { code: 'ro', cta: 'Revendică Oferta', badge: 'OFERTĂ LIMITATĂ' }
            ];
            var baseHtml = buildActiveAdHTMLSnapshot(tr.utm, tr.ga, tr.fb);
            locales.forEach(function (loc) {
                var localized = baseHtml
                    .replace(/<html lang="[^"]*"/i, '<html lang="' + loc.code + '"')
                    .replace(/Claim Offer|Profiter de l'Offre/gi, loc.cta);
                zip.file('ad-' + loc.code + '.html', localized);
            });
            zip.generateAsync({ type: 'blob' }).then(function (blob) {
                U().safeDownloadBlob(blob, 'ad-genius-multilang-5x.zip');
                U().showToast(fr ? '🌍 Pack 5 langues exporté !' : '🌍 5-Language Bulk ZIP exported!', 'success');
                modal.remove();
            });
        };
    }

    /* ================================================================
       6. PRESET VAULT + #cfg= SHAREABLE URL STATE
       ================================================================ */
    function snapshotActiveWorkspace() {
        var activeWs = document.querySelector('.workspace.active-workspace');
        if (!activeWs || !window.activeTab) return null;
        var fields = {};
        activeWs.querySelectorAll('input[id], select[id], textarea[id]').forEach(function (el) {
            if (el.type === 'file' || el.readOnly) return;
            fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
        });
        return { studio: window.activeTab, ts: Date.now(), fields: fields };
    }

    function restoreWorkspaceSnapshot(snap) {
        if (!snap || !snap.studio) return;
        window.activateWorkspace(snap.studio);
        setTimeout(function () {
            var fields = snap.fields || {};
            Object.keys(fields).forEach(function (id) {
                var el = document.getElementById(id);
                if (!el || el.type === 'file') return;
                if (el.type === 'checkbox') el.checked = !!fields[id];
                else el.value = fields[id];
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            });
            updateContrastBadge();
            if (U().showToast) U().showToast(isFr() ? '💾 Projet restauré !' : '💾 Campaign preset restored!', 'success');
        }, 320);
    }

    function openVaultModal() {
        var fr = isFr();
        var items = loadJSON(STORAGE_VAULT, []);
        var canSave = !!window.activeTab;

        var listHtml = items.length ? items.map(function (it, idx) {
            return '<div class="vault-row">' +
                '<div><strong>' + esc(it.name) + '</strong><small>' + esc(it.studio) + ' · ' + new Date(it.ts).toLocaleDateString() + '</small></div>' +
                '<div style="display:flex;gap:6px;">' +
                '<button type="button" class="gs-btn-mini" data-vload="' + idx + '">' + (fr ? 'Ouvrir' : 'Load') + '</button>' +
                '<button type="button" class="gs-btn-mini gs-btn-danger" data-vdel="' + idx + '">✕</button>' +
                '</div></div>';
        }).join('') : '<p style="color:#94a3b8;font-size:13px;text-align:center;padding:18px 0;">' + (fr ? 'Aucune campagne enregistrée. Ouvrez un studio puis sauvegardez.' : 'No saved campaigns yet. Open any studio to save presets.') + '</p>';

        var html =
            (canSave ? (
                '<div style="display:flex;gap:8px;margin-bottom:14px;">' +
                '<input id="vault-name" type="text" placeholder="' + (fr ? 'Nom de la campagne (ex: Promo Été)' : 'Campaign name (e.g. Summer Launch)') + '" style="flex:1;">' +
                '<button type="button" id="vault-save-btn" class="gs-btn-pri">💾 ' + (fr ? 'Sauvegarder' : 'Save Current') + '</button>' +
                '</div>' +
                '<button type="button" id="vault-share-url" class="gs-btn-sec" style="width:100%;margin-bottom:16px;">🔗 ' + (fr ? 'Copier le lien partageable #cfg=' : 'Copy Shareable #cfg= Link') + '</button>'
            ) : '') +
            '<div class="vault-list">' + listHtml + '</div>';

        var modal = openSuiteModal('💾 ' + (fr ? 'Coffre de Campagnes & Partage #cfg=' : 'Campaign Vault & #cfg= Share Link'), html);

        var saveBtn = modal.querySelector('#vault-save-btn');
        if (saveBtn) {
            saveBtn.onclick = function () {
                var snap = snapshotActiveWorkspace();
                if (!snap) return;
                snap.name = modal.querySelector('#vault-name').value.trim() || (snap.studio + ' #' + (items.length + 1));
                items.unshift(snap);
                saveJSON(STORAGE_VAULT, items.slice(0, 30));
                modal.remove();
                if (U().showToast) U().showToast(fr ? '💾 Campagne enregistrée dans le coffre !' : '💾 Saved to Campaign Vault!', 'success');
            };
        }

        var shareBtn = modal.querySelector('#vault-share-url');
        if (shareBtn) {
            shareBtn.onclick = function () {
                var snap = snapshotActiveWorkspace();
                if (!snap) return;
                try {
                    var encoded = btoa(unescape(encodeURIComponent(JSON.stringify(snap))));
                    var shareUrl = window.location.origin + window.location.pathname + '#cfg=' + encoded;
                    U().copyText(shareUrl).then(function () {
                        U().showToast(fr ? '🔗 Lien #cfg= copié dans le presse-papiers !' : '🔗 Shareable #cfg= link copied!', 'success');
                    });
                } catch (e) {
                    U().showToast(fr ? 'Configuration trop lourde pour URL.' : 'Config too large for URL hash.', 'warn');
                }
            };
        }

        modal.querySelectorAll('[data-vload]').forEach(function (b) {
            b.onclick = function () {
                var it = items[parseInt(b.getAttribute('data-vload'), 10)];
                modal.remove();
                restoreWorkspaceSnapshot(it);
            };
        });
        modal.querySelectorAll('[data-vdel]').forEach(function (b) {
            b.onclick = function () {
                items.splice(parseInt(b.getAttribute('data-vdel'), 10), 1);
                saveJSON(STORAGE_VAULT, items);
                modal.remove();
                openVaultModal();
            };
        });
    }

    function checkHashConfigOnLoad() {
        var h = window.location.hash || '';
        if (h.indexOf('#cfg=') === 0) {
            try {
                var raw = h.slice(5);
                var snap = JSON.parse(decodeURIComponent(escape(atob(raw))));
                if (snap && snap.studio) {
                    setTimeout(function () { restoreWorkspaceSnapshot(snap); }, 450);
                }
            } catch (e) {}
        }
    }

    /* ================================================================
       7. UNIVERSAL STUDIO PRO BAR (SAFE-ZONES, MOBILE SWITCHER,
          WEBM 60FPS RECORDER, WCAG CONTRAST, BUNDLE, ROI)
       ================================================================ */
    function ensureStudioProBar() {
        var bar = document.getElementById('studio-pro-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'studio-pro-bar';
            bar.className = 'studio-pro-bar';
            bar.style.display = 'none';
            var appContainer = document.querySelector('.app-container');
            if (appContainer) appContainer.insertBefore(bar, appContainer.firstChild);
        }
        renderStudioProBar(bar);
        return bar;
    }

    function renderStudioProBar(bar) {
        var fr = isFr();
        var isCore = window.activeTab === 'core-ad-genius';
        bar.innerHTML =
            '<div class="spb-group spb-mobile-toggle" style="' + (isCore ? 'display:none;' : '') + '">' +
            '<button type="button" class="spb-mob-btn active" data-mob-view="preview">👁️ ' + (fr ? 'Aperçu' : 'Preview') + '</button>' +
            '<button type="button" class="spb-mob-btn" data-mob-view="controls">⚙️ ' + (fr ? 'Contrôles' : 'Controls') + '</button>' +
            '</div>' +
            '<div class="spb-group">' +
            '<select id="spb-frame-select" class="spb-select" title="IAB & Social Format">' +
            '<option value="free">📐 ' + (fr ? 'Format Libre' : 'Free Canvas') + '</option>' +
            '<option value="300x250">Display 300×250</option>' +
            '<option value="728x90">Leaderboard 728×90</option>' +
            '<option value="160x600">Skyscraper 160×600</option>' +
            '<option value="reels">Reels / TikTok 9:16</option>' +
            '<option value="square">Feed Social 1:1</option>' +
            '<option value="iphone">📱 iPhone Story Frame</option>' +
            '<option value="billboard">🏙️ Metro Billboard</option>' +
            '</select>' +
            '<button type="button" id="spb-safezone-btn" class="spb-btn" title="Safe-Zone Guides">🎯 ' + (fr ? 'Zones Sûres' : 'Safe Zones') + '</button>' +
            '<span id="spb-wcag-pill" class="spb-wcag-pill" title="WCAG 2.1 Readability Contrast">♿ --</span>' +
            '</div>' +
            '<div class="spb-group">' +
            '<button type="button" id="spb-edit-ide-btn" class="spb-btn" style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;font-weight:800;">💻 ' + (fr ? 'Éditer le Code (IDE)' : 'Edit Code in IDE') + '</button>' +
            '<button type="button" id="spb-apply-brand" class="spb-btn">🎨 ' + (fr ? 'Appliquer Brand' : 'Apply Brand') + '</button>' +
            '<button type="button" id="spb-roi-btn" class="spb-btn">📈 ROI</button>' +
            '<button type="button" id="spb-webm-btn" class="spb-btn spb-pro" data-pro-export="1">🎬 ' + (fr ? 'Vidéo 60fps' : '60fps WebM') + '</button>' +
            '<button type="button" id="spb-bundle-btn" class="spb-btn spb-pro" data-pro-export="1">📦 ' + (fr ? 'Pack ZIP + UTM' : 'Bundle ZIP + UTM') + '</button>' +
            '</div>';

        // Mobile Preview/Controls switcher for all 22 modules
        bar.querySelectorAll('.spb-mob-btn').forEach(function (b) {
            b.onclick = function () {
                var mode = b.getAttribute('data-mob-view');
                bar.querySelectorAll('.spb-mob-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
                var ws = document.querySelector('.workspace.active-workspace');
                if (ws) ws.setAttribute('data-studio-mobile', mode);
                setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 80);
            };
        });

        // IAB / Device Frame switcher
        var frameSel = bar.querySelector('#spb-frame-select');
        frameSel.onchange = function () { applyPreviewFrame(frameSel.value); };

        // Safe-Zone overlay toggle
        var szBtn = bar.querySelector('#spb-safezone-btn');
        szBtn.onclick = function () {
            var activeWs = document.querySelector('.workspace.active-workspace');
            if (!activeWs) return;
            var center = activeWs.querySelector('.center-panel, .preview-area');
            if (!center) return;
            var ov = center.querySelector('.iab-safezone-overlay');
            if (ov) {
                ov.remove();
                szBtn.classList.remove('active');
            } else {
                ov = document.createElement('div');
                ov.className = 'iab-safezone-overlay';
                ov.innerHTML =
                    '<div class="sz-top"><span>' + (fr ? 'Zone UI Haute (Reels/TikTok Header)' : 'Top UI Safe Margin (Reels/TikTok)') + '</span></div>' +
                    '<div class="sz-safe-box"><span>' + (fr ? 'ZONE SÛRE CTA / TEXTE' : 'TEXT & CTA SAFE ZONE') + '</span></div>' +
                    '<div class="sz-right"><span>❤️ 💬 ↗️</span></div>' +
                    '<div class="sz-bottom"><span>' + (fr ? 'Zone Légende & Bouton Sponsorisé' : 'Caption & Sponsored CTA Margin') + '</span></div>';
                center.style.position = 'relative';
                center.appendChild(ov);
                szBtn.classList.add('active');
            }
        };

        var editIdeBtn = bar.querySelector('#spb-edit-ide-btn');
        if (editIdeBtn) {
            editIdeBtn.onclick = function () {
                var htmlSnap = buildActiveAdHTMLSnapshot('', '', '', window.lang || 'en');
                if (!htmlSnap) {
                    if (U().showToast) U().showToast(fr ? 'Générez d’abord un aperçu dans ce studio.' : 'Configure the studio first before sending to IDE.', 'warn');
                    return;
                }
                try {
                    localStorage.setItem('ia_forge_handoff', JSON.stringify({
                        title: 'Ad-Genius — ' + (window.activeTab || 'Ad'),
                        html: htmlSnap,
                        css: '',
                        js: '',
                        combinedHtml: htmlSnap,
                        ts: Date.now()
                    }));
                } catch (e) {}
                window.location.href = '/ia-architecte-app/index.html?from=forge&lang=' + (fr ? 'fr' : 'en');
            };
        }
        bar.querySelector('#spb-apply-brand').onclick = function () { applyBrandKitToActiveStudio(); };
        bar.querySelector('#spb-roi-btn').onclick = openROICalculatorModal;
        bar.querySelector('#spb-bundle-btn').onclick = openBundleExportModal;

        // Universal 60fps WebM Capture (Pro)
        var webmBtn = bar.querySelector('#spb-webm-btn');
        webmBtn.onclick = function () {
            if (typeof window.requirePremium === 'function' && !window.checkIsPremium()) {
                window.showPremiumModal();
                return;
            }
            var activeWs = document.querySelector('.workspace.active-workspace');
            var canvas = activeWs ? activeWs.querySelector('canvas') : null;
            if (!canvas) {
                U().showToast(fr ? 'Ce studio n\'utilise pas de canvas animé. Utilisez Pack ZIP ou PNG !' : 'No live <canvas> detected in this studio — use Bundle ZIP or HTML export!', 'warn');
                return;
            }
            var origText = webmBtn.textContent;
            webmBtn.disabled = true;
            U().recordCanvasWebM(canvas, 5000, 'ad-genius-' + (window.activeTab || 'studio') + '-60fps.webm', function (sec) {
                webmBtn.textContent = '🔴 REC ' + sec + 's';
            }).finally(function () {
                webmBtn.disabled = false;
                webmBtn.textContent = origText;
            });
        };

        updateContrastBadge();
    }

    function applyPreviewFrame(mode) {
        var activeWs = document.querySelector('.workspace.active-workspace');
        if (!activeWs) return;
        var center = activeWs.querySelector('.center-panel, .iframe-container');
        if (!center) return;
        center.classList.remove('frame-300x250', 'frame-728x90', 'frame-160x600', 'frame-reels', 'frame-square', 'frame-iphone', 'frame-billboard');
        if (mode && mode !== 'free') {
            center.classList.add('frame-' + mode);
        }
        setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 80);
    }

    function updateContrastBadge() {
        var pill = document.getElementById('spb-wcag-pill');
        var activeWs = document.querySelector('.workspace.active-workspace');
        if (!pill || !activeWs || !U().formatContrastBadge) return;
        var colors = Array.from(activeWs.querySelectorAll('input[type="color"]')).map(function (c) { return c.value; });
        var bg = '#0f172a', fg = '#ffffff';
        if (colors.length >= 2) { bg = colors[0]; fg = colors[1]; }
        else if (colors.length === 1) { bg = '#0f172a'; fg = colors[0]; }
        var info = U().formatContrastBadge(bg, fg, window.lang);
        pill.textContent = info.text;
        pill.style.borderColor = info.color;
        pill.style.color = info.color;
    }

    /* ================================================================
       8. GENERIC GLASSMORPHIC MODAL HELPER
       ================================================================ */
    function openSuiteModal(title, bodyHtml) {
        var old = document.getElementById('genius-suite-modal');
        if (old) old.remove();
        var overlay = document.createElement('div');
        overlay.id = 'genius-suite-modal';
        overlay.className = 'gs-modal-overlay';
        overlay.innerHTML =
            '<div class="gs-modal-card">' +
            '<div class="gs-modal-head"><h3>' + title + '</h3><button type="button" class="gs-modal-close" aria-label="Close">✕</button></div>' +
            '<div class="gs-modal-body">' + bodyHtml + '</div>' +
            '</div>';
        document.body.appendChild(overlay);
        overlay.querySelector('.gs-modal-close').onclick = function () { overlay.remove(); };
        overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
        return overlay;
    }

    /* ================================================================
       9. HOOK INTO WORKSPACE ACTIVATION, DASHBOARD RETURN & I18N
       ================================================================ */
    function installSuiteHooks() {
        var origActivate = window.activateWorkspace;
        if (typeof origActivate === 'function') {
            window.activateWorkspace = function (id) {
                var tb = document.getElementById('dashboard-toolbar');
                if (tb) tb.style.display = 'none';
                recordRecentStudio(id);
                origActivate.apply(this, arguments);

                var bar = ensureStudioProBar();
                bar.style.display = 'flex';
                var ws = document.querySelector('.workspace.active-workspace');
                if (ws && !ws.getAttribute('data-studio-mobile')) {
                    ws.setAttribute('data-studio-mobile', 'preview');
                }
                setTimeout(function () {
                    if (ws && U().translateStudioTree) U().translateStudioTree(ws, window.lang);
                    updateContrastBadge();
                }, 180);
            };
        }

        var origBack = window.goBackToDashboard;
        if (typeof origBack === 'function') {
            window.goBackToDashboard = function () {
                origBack.apply(this, arguments);
                var tb = document.getElementById('dashboard-toolbar');
                if (tb) tb.style.display = 'flex';
                var bar = document.getElementById('studio-pro-bar');
                if (bar) bar.style.display = 'none';
                if (typeof window._refreshDashboardFilters === 'function') window._refreshDashboardFilters();
            };
        }

        // Update contrast pill live when user edits any color picker
        document.addEventListener('input', function (e) {
            if (e.target && e.target.type === 'color') updateContrastBadge();
        });

        // Re-translate active studio & Pro Bar when language toggles
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setTimeout(function () {
                    var bar = document.getElementById('studio-pro-bar');
                    if (bar && bar.style.display !== 'none') renderStudioProBar(bar);
                    var ws = document.querySelector('.workspace.active-workspace');
                    if (ws && U().translateStudioTree) U().translateStudioTree(ws, window.lang);
                }, 140);
            });
        });

        // Navbar Suite buttons
        var bKit = document.getElementById('btn-open-brand-kit');
        if (bKit) bKit.addEventListener('click', openBrandKitModal);
        var bAi = document.getElementById('btn-open-ai-director');
        if (bAi) bAi.addEventListener('click', openAIDirectorModal);
        var bVault = document.getElementById('btn-open-vault');
        if (bVault) bVault.addEventListener('click', openVaultModal);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initDashboardFilters();
        installSuiteHooks();
        checkHashConfigOnLoad();
    });
})();
