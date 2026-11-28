/**
 * AD-GENIUS AI PRO — 5 High-ROI Commercial Advertising Studios Expansion (23 -> 28 Studios)
 * 100% Client-Side · $0 API · Bilingual EN/FR · Brand Kit Ready · 1-Click Export & IDE Code Handoff
 *   24. flash-sale      — Flash Sale & FOMO Conversion Bar Studio
 *   25. before-after    — Interactive Before / After Comparison Slider Ad
 *   26. whatsapp-lead   — Smart WhatsApp & Booking Floating Lead Widget
 *   27. quote-calc      — Interactive Quote / ROI Calculator Ad
 *   28. reels-animator  — 9:16 Reels / TikTok / Shorts Animated Video Ad (WebM + HTML5)
 */
(function () {
  'use strict';

  const isFr = () => window.lang === 'fr';
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const exporters = {};

  function dlFile(content, filename, mime) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type: mime || 'text/html;charset=utf-8' }));
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function sendToIde(title, htmlCode) {
    try {
      localStorage.setItem('ia_forge_handoff', JSON.stringify({
        title, html: htmlCode, css: '', js: '', combinedHtml: htmlCode, ts: Date.now()
      }));
    } catch (e) {}
    window.location.href = '/ia-architecte-app/index.html?from=forge&lang=' + (isFr() ? 'fr' : 'en');
  }

  function ctl(label, inner) {
    return `<div style="display:flex;flex-direction:column;gap:5px;"><label style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">${label}</label>${inner}</div>`;
  }

  const INP_S = 'width:100%;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.14);background:#0f172a;color:#fff;font-size:13px;outline:none;';
  const BTN_PRI = 'width:100%;padding:10px;border-radius:10px;border:none;background:linear-gradient(135deg,#f59e0b,#ec4899);color:#fff;font-weight:800;font-size:12.5px;cursor:pointer;';
  const BTN_IDE = 'width:100%;padding:10px;border-radius:10px;border:none;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-weight:800;font-size:12.5px;cursor:pointer;';

  // =========================================================================
  // 24. FLASH SALE & FOMO CONVERSION BAR STUDIO
  // =========================================================================
  function initFlashSale() {
    if (window.fsStudioInitialized) return;
    window.fsStudioInitialized = true;
    const center = document.getElementById('fs-center');
    const right = document.getElementById('fs-right');
    if (!center || !right) return;
    const fr = isFr();

    const st = {
      headline: fr ? '🔥 VENTE FLASH : -35% AUJOURD’HUI SEULEMENT !' : '🔥 FLASH SALE: 35% OFF ENDS TONIGHT!',
      code: 'FLASH35',
      cta: fr ? 'Profiter de l’offre →' : 'Claim 35% Off →',
      url: 'https://ia-codestudio.com',
      stockLeft: 4,
      hours: 3,
      primary: '#f59e0b',
      accent: '#ec4899',
      socialProof: true
    };

    const buildHtml = () => `<!DOCTYPE html>
<html lang="${fr ? 'fr' : 'en'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(st.headline)}</title>
<style>*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,sans-serif}body{background:#030712;color:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}
.fomo-bar{width:100%;max-width:780px;background:linear-gradient(135deg,${st.primary}22,${st.accent}22,#0f172a);border:1px solid ${st.primary}66;border-radius:20px;padding:24px;box-shadow:0 24px 60px rgba(0,0,0,.55)}
.top{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:16px}
.top h2{font-size:1.25rem;font-weight:900}.timer{display:flex;gap:8px}.tbox{background:#020617;border:1px solid rgba(255,255,255,.15);padding:7px 11px;border-radius:10px;text-align:center;min-width:52px}
.tbox b{display:block;font-size:1.1rem;color:${st.primary}}.tbox span{font-size:.62rem;color:#94a3b8;text-transform:uppercase}
.stock{margin-bottom:18px}.stock-lbl{display:flex;justify-content:space-between;font-size:.8rem;color:#fcd34d;font-weight:700;margin-bottom:6px}
.track{height:8px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden}.fill{height:100%;width:${Math.max(12, Math.min(95, st.stockLeft * 9))}%;background:linear-gradient(90deg,${st.primary},${st.accent})}
.actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.coupon{background:rgba(255,255,255,.06);border:1px dashed ${st.primary};color:#fff;padding:11px 16px;border-radius:12px;font-weight:800;letter-spacing:.08em;cursor:pointer}
.cta{flex:1;text-align:center;background:linear-gradient(135deg,${st.primary},${st.accent});color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:900}
.proof{margin-top:16px;display:${st.socialProof ? 'inline-flex' : 'none'};align-items:center;gap:8px;padding:8px 14px;border-radius:99px;background:rgba(16,185,129,.14);border:1px solid rgba(16,185,129,.35);font-size:.78rem;color:#6ee7b7;font-weight:700}
</style></head><body>
<div class="fomo-bar">
  <div class="top"><h2>${esc(st.headline)}</h2>
    <div class="timer"><div class="tbox"><b id="fh">0${st.hours}</b><span>HRS</span></div><div class="tbox"><b id="fm">42</b><span>MIN</span></div><div class="tbox"><b id="fs">19</b><span>SEC</span></div></div>
  </div>
  <div class="stock"><div class="stock-lbl"><span>⚡ ${fr ? 'Stock limité' : 'Low Stock Alert'}</span><span>${fr ? 'Plus que ' + st.stockLeft + ' disponibles !' : 'Only ' + st.stockLeft + ' left in stock!'}</span></div><div class="track"><div class="fill"></div></div></div>
  <div class="actions"><button class="coupon" id="cp-btn">🏷️ ${esc(st.code)} (${fr ? 'Copier' : 'Copy'})</button><a class="cta" href="${esc(st.url)}" target="_blank" rel="noopener">${esc(st.cta)}</a></div>
  <div class="proof" id="sp-pill">🟢 ${fr ? 'Sophie (Paris) vient d’utiliser ' + esc(st.code) : 'Alex (New York) just claimed ' + esc(st.code)}</div>
</div>
<script>let sec=${st.hours}*3600+2539;setInterval(()=>{if(sec>0)sec--;const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;document.getElementById('fh').textContent=String(h).padStart(2,'0');document.getElementById('fm').textContent=String(m).padStart(2,'0');document.getElementById('fs').textContent=String(s).padStart(2,'0');},1000);
document.getElementById('cp-btn').onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText('${esc(st.code)}');this.textContent='✓ ${fr ? 'Copié :' : 'Copied:'} ${esc(st.code)}';};
const buyers=['Sophie · Paris','Marc · Lyon','Emma · London','Liam · Toronto'];let bi=0;setInterval(()=>{bi=(bi+1)%buyers.length;const p=document.getElementById('sp-pill');if(p)p.textContent='🟢 '+buyers[bi]+' ${fr ? 'vient de commander' : 'just claimed'} ${esc(st.code)}';},4500);<\/script></body></html>`;

    exporters['flash-sale'] = buildHtml;
    const render = () => {
      center.innerHTML = `<iframe style="width:100%;height:100%;border:none;" srcdoc="${buildHtml().replace(/"/g, '&quot;')}"></iframe>`;
    };

    right.innerHTML = `
      <h3 style="margin:0;font-size:15px;color:#fcd34d;">⏳ ${fr ? 'Promo Flash & FOMO' : 'Flash Sale & FOMO'}</h3>
      ${ctl(fr ? 'Titre' : 'Headline', `<input id="fs-in-h" style="${INP_S}" value="${esc(st.headline)}">`)}
      ${ctl(fr ? 'Code Promo' : 'Promo Code', `<input id="fs-in-c" style="${INP_S}" value="${esc(st.code)}">`)}
      ${ctl(fr ? 'Bouton CTA' : 'CTA Button', `<input id="fs-in-cta" style="${INP_S}" value="${esc(st.cta)}">`)}
      ${ctl('Target URL', `<input id="fs-in-u" style="${INP_S}" value="${esc(st.url)}">`)}
      ${ctl(fr ? 'Stock restant' : 'Items Left in Stock', `<input id="fs-in-st" type="range" min="1" max="10" value="${st.stockLeft}">`)}
      ${ctl(fr ? 'Heures restantes' : 'Countdown Hours', `<input id="fs-in-hr" type="number" min="1" max="48" style="${INP_S}" value="${st.hours}">`)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${ctl('Primary', `<input id="fs-in-p" type="color" value="${st.primary}" style="width:100%;height:34px;border:none;border-radius:6px;">`)}
        ${ctl('Accent', `<input id="fs-in-a" type="color" value="${st.accent}" style="width:100%;height:34px;border:none;border-radius:6px;">`)}
      </div>
      <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;"><input id="fs-in-sp" type="checkbox" checked> ${fr ? 'Afficher preuve sociale live' : 'Show Live Social Proof'}</label>
      <button id="fs-btn-ide" style="${BTN_IDE}">💻 ${fr ? 'Éditer le Code dans IDE' : 'Edit Code in Studio Pro IDE'}</button>
      <button id="fs-btn-html" data-pro-export="1" style="${BTN_PRI}">📥 ${fr ? 'Exporter HTML5' : 'Export Standalone HTML'}</button>`;

    const bind = (id, key, isNum, isChk) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener(isChk ? 'change' : 'input', () => {
        st[key] = isChk ? el.checked : (isNum ? Number(el.value) : el.value);
        render();
      });
    };
    bind('fs-in-h', 'headline'); bind('fs-in-c', 'code'); bind('fs-in-cta', 'cta');
    bind('fs-in-u', 'url'); bind('fs-in-st', 'stockLeft', true); bind('fs-in-hr', 'hours', true);
    bind('fs-in-p', 'primary'); bind('fs-in-a', 'accent'); bind('fs-in-sp', 'socialProof', false, true);
    document.getElementById('fs-btn-ide').onclick = () => sendToIde('Flash Sale FOMO Banner', buildHtml());
    document.getElementById('fs-btn-html').onclick = () => dlFile(buildHtml(), 'flash-sale-fomo-ad.html');
    render();
  }

  // =========================================================================
  // 25. INTERACTIVE BEFORE / AFTER COMPARISON SLIDER AD
  // =========================================================================
  function initBeforeAfter() {
    if (window.ba2StudioInitialized) return;
    window.ba2StudioInitialized = true;
    const center = document.getElementById('ba2-center');
    const right = document.getElementById('ba2-right');
    if (!center || !right) return;
    const fr = isFr();

    const st = {
      title: fr ? 'Résultat Réel en 14 Jours' : 'Real Transformation in 14 Days',
      beforeLbl: fr ? 'AVANT' : 'BEFORE',
      afterLbl: fr ? 'APRÈS' : 'AFTER',
      cta: fr ? 'Réserver ma séance →' : 'Book Your Session →',
      url: 'https://ia-codestudio.com',
      primary: '#06b6d4',
      beforeImg: '',
      afterImg: ''
    };

    const buildHtml = () => {
      const bBg = st.beforeImg
        ? `url(${st.beforeImg}) center/cover no-repeat`
        : 'linear-gradient(135deg,#334155,#1e293b 60%,#0f172a)';
      const aBg = st.afterImg
        ? `url(${st.afterImg}) center/cover no-repeat`
        : `linear-gradient(135deg,${st.primary},#8b5cf6 60%,#ec4899)`;
      return `<!DOCTYPE html>
<html lang="${fr ? 'fr' : 'en'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(st.title)}</title>
<style>*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,sans-serif}body{background:#030712;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{max-width:680px;width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.12);border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6)}
.stage{position:relative;width:100%;height:340px;user-select:none;overflow:hidden;cursor:ew-resize}
.layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;letter-spacing:.04em}
.after{background:${aBg}}.before{background:${bBg};clip-path:inset(0 50% 0 0)}
.pill{position:absolute;top:14px;padding:5px 12px;border-radius:99px;font-size:.72rem;font-weight:800;background:rgba(2,6,23,.78);border:1px solid rgba(255,255,255,.2)}
.pill.l{left:14px;color:#cbd5e1}.pill.r{right:14px;color:#67e8f9}
.handle{position:absolute;top:0;bottom:0;left:50%;width:3px;background:#fff;transform:translateX(-50%);pointer-events:none}
.knob{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:42px;height:42px;border-radius:50%;background:#fff;color:#0f172a;display:flex;align-items:center;justify-content:center;font-weight:900;box-shadow:0 4px 18px rgba(0,0,0,.5)}
.slider{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;z-index:5}
.foot{padding:20px 24px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}
.foot h2{font-size:1.15rem;font-weight:800}.cta{background:linear-gradient(135deg,${st.primary},#8b5cf6);color:#fff;text-decoration:none;padding:11px 20px;border-radius:11px;font-weight:800;font-size:.88rem}
</style></head><body>
<div class="card">
  <div class="stage">
    <div class="layer after">${st.afterImg ? '' : '✨ ' + esc(st.afterLbl)}</div>
    <div class="layer before" id="bef">${st.beforeImg ? '' : esc(st.beforeLbl)}</div>
    <span class="pill l">${esc(st.beforeLbl)}</span><span class="pill r">${esc(st.afterLbl)}</span>
    <div class="handle" id="hdl"><div class="knob">⇆</div></div>
    <input class="slider" id="rng" type="range" min="0" max="100" value="50">
  </div>
  <div class="foot"><h2>${esc(st.title)}</h2><a class="cta" href="${esc(st.url)}" target="_blank" rel="noopener">${esc(st.cta)}</a></div>
</div>
<script>const r=document.getElementById('rng'),b=document.getElementById('bef'),h=document.getElementById('hdl');
r.oninput=()=>{const v=r.value;b.style.clipPath='inset(0 '+(100-v)+'% 0 0)';h.style.left=v+'%';};<\/script></body></html>`;
    };

    exporters['before-after'] = buildHtml;
    const render = () => {
      center.innerHTML = `<iframe style="width:100%;height:100%;border:none;" srcdoc="${buildHtml().replace(/"/g, '&quot;')}"></iframe>`;
    };

    right.innerHTML = `
      <h3 style="margin:0;font-size:15px;color:#67e8f9;">⚖️ ${fr ? 'Pub Avant / Après' : 'Before / After Slider'}</h3>
      ${ctl(fr ? 'Titre de l’offre' : 'Ad Headline', `<input id="ba2-t" style="${INP_S}" value="${esc(st.title)}">`)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${ctl('Before Label', `<input id="ba2-bl" style="${INP_S}" value="${esc(st.beforeLbl)}">`)}
        ${ctl('After Label', `<input id="ba2-al" style="${INP_S}" value="${esc(st.afterLbl)}">`)}
      </div>
      ${ctl(fr ? 'Image Avant (opt.)' : 'Before Photo (opt.)', `<input id="ba2-bi" type="file" accept="image/*" style="color:#cbd5e1;font-size:11px;">`)}
      ${ctl(fr ? 'Image Après (opt.)' : 'After Photo (opt.)', `<input id="ba2-ai" type="file" accept="image/*" style="color:#cbd5e1;font-size:11px;">`)}
      ${ctl('CTA Text', `<input id="ba2-cta" style="${INP_S}" value="${esc(st.cta)}">`)}
      ${ctl('Target URL', `<input id="ba2-url" style="${INP_S}" value="${esc(st.url)}">`)}
      ${ctl('Accent Color', `<input id="ba2-col" type="color" value="${st.primary}" style="width:100%;height:34px;border:none;border-radius:6px;">`)}
      <button id="ba2-btn-ide" style="${BTN_IDE}">💻 ${fr ? 'Éditer le Code dans IDE' : 'Edit Code in Studio Pro IDE'}</button>
      <button id="ba2-btn-html" data-pro-export="1" style="${BTN_PRI}">📥 ${fr ? 'Exporter HTML5' : 'Export Standalone HTML'}</button>`;

    const readImg = (elId, key) => {
      document.getElementById(elId).onchange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const rd = new FileReader();
        rd.onload = () => { st[key] = rd.result; render(); };
        rd.readAsDataURL(f);
      };
    };
    readImg('ba2-bi', 'beforeImg'); readImg('ba2-ai', 'afterImg');
    [['ba2-t', 'title'], ['ba2-bl', 'beforeLbl'], ['ba2-al', 'afterLbl'], ['ba2-cta', 'cta'], ['ba2-url', 'url'], ['ba2-col', 'primary']]
      .forEach(([id, k]) => { document.getElementById(id).oninput = (e) => { st[k] = e.target.value; render(); }; });
    document.getElementById('ba2-btn-ide').onclick = () => sendToIde('Before After Comparison Ad', buildHtml());
    document.getElementById('ba2-btn-html').onclick = () => dlFile(buildHtml(), 'before-after-slider-ad.html');
    render();
  }

  // =========================================================================
  // 26. SMART WHATSAPP & BOOKING FLOATING LEAD WIDGET
  // =========================================================================
  function initWhatsAppLead() {
    if (window.waStudioInitialized) return;
    window.waStudioInitialized = true;
    const center = document.getElementById('wa-center');
    const right = document.getElementById('wa-right');
    if (!center || !right) return;
    const fr = isFr();

    const st = {
      brand: 'Studio Lumière',
      role: fr ? 'Répond en moins de 5 min' : 'Typically replies in 5 mins',
      greeting: fr ? 'Bonjour ! 👋 Comment pouvons-nous vous aider aujourd’hui ?' : 'Hi there! 👋 How can we help you today?',
      phone: '33600000000',
      q1: fr ? '📅 Réserver un rendez-vous' : '📅 Book an appointment',
      q2: fr ? '💰 Demander un devis gratuit' : '💰 Request a free quote',
      q3: fr ? '📍 Horaires & Adresse' : '📍 Opening hours & location',
      color: '#10b981'
    };

    const buildHtml = () => `<!DOCTYPE html>
<html lang="${fr ? 'fr' : 'en'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(st.brand)} — WhatsApp Lead Widget</title>
<style>*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,sans-serif}body{background:#030712;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.wa-box{width:340px;max-width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.12);border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6)}
.wa-head{background:${st.color};padding:18px;display:flex;align-items:center;gap:12px}
.av{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:1.3rem}
.wa-head h3{font-size:1rem;font-weight:800}.wa-head p{font-size:.76rem;opacity:.9}
.wa-body{padding:18px;display:flex;flex-direction:column;gap:10px}
.bubble{background:rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:12px 14px;font-size:.86rem;line-height:1.5;color:#e2e8f0}
.qbtn{display:block;width:100%;text-align:left;padding:10px 13px;border-radius:11px;border:1px solid ${st.color}55;background:${st.color}18;color:#fff;font-weight:700;font-size:.82rem;text-decoration:none;transition:.2s}
.qbtn:hover{background:${st.color};color:#fff}
.wa-foot{padding:0 18px 18px;display:flex;gap:8px}.wa-foot input{flex:1;background:#020617;border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:10px;color:#fff;font-size:.82rem;outline:none}
.wa-foot button{background:${st.color};border:none;color:#fff;padding:0 14px;border-radius:10px;font-weight:800;cursor:pointer}
</style></head><body>
<div class="wa-box">
  <div class="wa-head"><div class="av">💬</div><div><h3>${esc(st.brand)}</h3><p>● ${esc(st.role)}</p></div></div>
  <div class="wa-body">
    <div class="bubble">${esc(st.greeting)}</div>
    <a class="qbtn" target="_blank" rel="noopener" href="https://wa.me/${esc(st.phone)}?text=${encodeURIComponent(st.q1)}">${esc(st.q1)}</a>
    <a class="qbtn" target="_blank" rel="noopener" href="https://wa.me/${esc(st.phone)}?text=${encodeURIComponent(st.q2)}">${esc(st.q2)}</a>
    <a class="qbtn" target="_blank" rel="noopener" href="https://wa.me/${esc(st.phone)}?text=${encodeURIComponent(st.q3)}">${esc(st.q3)}</a>
  </div>
  <form class="wa-foot" onsubmit="event.preventDefault();const v=document.getElementById('wm').value.trim();if(v)window.open('https://wa.me/${esc(st.phone)}?text='+encodeURIComponent(v),'_blank');">
    <input id="wm" placeholder="${fr ? 'Écrire un message...' : 'Type your message...'}"><button type="submit">➤</button>
  </form>
</div></body></html>`;

    exporters['whatsapp-lead'] = buildHtml;
    const render = () => {
      center.innerHTML = `<iframe style="width:100%;height:100%;border:none;" srcdoc="${buildHtml().replace(/"/g, '&quot;')}"></iframe>`;
    };

    right.innerHTML = `
      <h3 style="margin:0;font-size:15px;color:#34d399;">💬 ${fr ? 'Widget WhatsApp Leads' : 'WhatsApp Lead Widget'}</h3>
      ${ctl(fr ? 'Nom de l’entreprise' : 'Business Name', `<input id="wa-b" style="${INP_S}" value="${esc(st.brand)}">`)}
      ${ctl(fr ? 'Téléphone WhatsApp (sans +)' : 'WhatsApp Number (digits)', `<input id="wa-p" style="${INP_S}" value="${esc(st.phone)}">`)}
      ${ctl(fr ? 'Sous-titre statut' : 'Status Subtitle', `<input id="wa-r" style="${INP_S}" value="${esc(st.role)}">`)}
      ${ctl(fr ? 'Message d’accueil' : 'Greeting Message', `<input id="wa-g" style="${INP_S}" value="${esc(st.greeting)}">`)}
      ${ctl('Quick Option 1', `<input id="wa-q1" style="${INP_S}" value="${esc(st.q1)}">`)}
      ${ctl('Quick Option 2', `<input id="wa-q2" style="${INP_S}" value="${esc(st.q2)}">`)}
      ${ctl('Quick Option 3', `<input id="wa-q3" style="${INP_S}" value="${esc(st.q3)}">`)}
      ${ctl('Theme Color', `<input id="wa-c" type="color" value="${st.color}" style="width:100%;height:34px;border:none;border-radius:6px;">`)}
      <button id="wa-btn-ide" style="${BTN_IDE}">💻 ${fr ? 'Éditer le Code dans IDE' : 'Edit Code in Studio Pro IDE'}</button>
      <button id="wa-btn-html" data-pro-export="1" style="${BTN_PRI}">📥 ${fr ? 'Exporter HTML5' : 'Export Standalone HTML'}</button>`;

    [['wa-b', 'brand'], ['wa-p', 'phone'], ['wa-r', 'role'], ['wa-g', 'greeting'], ['wa-q1', 'q1'], ['wa-q2', 'q2'], ['wa-q3', 'q3'], ['wa-c', 'color']]
      .forEach(([id, k]) => { document.getElementById(id).oninput = (e) => { st[k] = e.target.value; render(); }; });
    document.getElementById('wa-btn-ide').onclick = () => sendToIde('WhatsApp Lead Widget', buildHtml());
    document.getElementById('wa-btn-html').onclick = () => dlFile(buildHtml(), 'whatsapp-lead-widget.html');
    render();
  }

  // =========================================================================
  // 27. INTERACTIVE QUOTE / ROI CALCULATOR AD
  // =========================================================================
  function initQuoteCalc() {
    if (window.qcStudioInitialized) return;
    window.qcStudioInitialized = true;
    const center = document.getElementById('qc-center');
    const right = document.getElementById('qc-right');
    if (!center || !right) return;
    const fr = isFr();

    const st = {
      title: fr ? 'Calculez votre Devis Instantané' : 'Estimate Your Instant Project Quote',
      currency: fr ? '€' : '$',
      s1Name: fr ? 'Pages / Écrans' : 'Pages / Screens', s1Rate: 120,
      s2Name: fr ? 'Modules 3D / Interactifs' : '3D / Interactive Widgets', s2Rate: 180,
      s3Name: fr ? 'Mois de Maintenance' : 'Support Months', s3Rate: 60,
      cta: fr ? 'Recevoir ce devis →' : 'Lock In This Quote →',
      color: '#8b5cf6'
    };

    const buildHtml = () => `<!DOCTYPE html>
<html lang="${fr ? 'fr' : 'en'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(st.title)}</title>
<style>*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,sans-serif}body{background:#030712;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.box{max-width:560px;width:100%;background:rgba(15,23,42,.88);border:1px solid ${st.color}55;border-radius:22px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.6)}
h2{font-size:1.35rem;font-weight:900;margin-bottom:18px}.row{margin-bottom:16px}.lbl{display:flex;justify-content:space-between;font-size:.86rem;font-weight:700;margin-bottom:6px;color:#cbd5e1}
input[type=range]{width:100%;accent-color:${st.color};cursor:pointer}
.total-card{background:linear-gradient(135deg,${st.color}28,rgba(6,182,212,.16));border:1px solid ${st.color}66;border-radius:16px;padding:18px;display:flex;justify-content:space-between;align-items:center;margin:20px 0 16px}
.total-card span{font-size:.8rem;color:#cbd5e1;font-weight:700;text-transform:uppercase}.total-card strong{font-size:2rem;font-weight:900;color:#fff}
.lead{display:flex;gap:8px;flex-wrap:wrap}.lead input{flex:1;min-width:180px;background:#020617;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:11px;color:#fff;outline:none}
.lead button{background:linear-gradient(135deg,${st.color},#06b6d4);border:none;color:#fff;padding:11px 18px;border-radius:10px;font-weight:800;cursor:pointer}
.ok{margin-top:10px;font-size:.84rem;color:#34d399;font-weight:700;min-height:18px}
</style></head><body>
<div class="box">
  <h2>🧾 ${esc(st.title)}</h2>
  <div class="row"><div class="lbl"><span>${esc(st.s1Name)}</span><b id="v1">5</b></div><input id="r1" type="range" min="1" max="20" value="5"></div>
  <div class="row"><div class="lbl"><span>${esc(st.s2Name)}</span><b id="v2">2</b></div><input id="r2" type="range" min="0" max="10" value="2"></div>
  <div class="row"><div class="lbl"><span>${esc(st.s3Name)}</span><b id="v3">3</b></div><input id="r3" type="range" min="0" max="12" value="3"></div>
  <div class="total-card"><span>${fr ? 'Estimation Totale' : 'Estimated Total'}</span><strong id="tot">${esc(st.currency)}1,140</strong></div>
  <form class="lead" onsubmit="event.preventDefault();document.getElementById('ok').textContent='✓ ${fr ? 'Devis envoyé à ' : 'Quote sent to '}'+document.getElementById('em').value+' ('+document.getElementById('tot').textContent+')';">
    <input id="em" type="email" required placeholder="you@company.com"><button type="submit">${esc(st.cta)}</button>
  </form><div id="ok" class="ok"></div>
</div>
<script>function calc(){const a=+r1.value,b=+r2.value,c=+r3.value;v1.textContent=a;v2.textContent=b;v3.textContent=c;tot.textContent='${esc(st.currency)}'+(a*${st.s1Rate}+b*${st.s2Rate}+c*${st.s3Rate}).toLocaleString();}
[r1,r2,r3].forEach(x=>x.oninput=calc);calc();<\/script></body></html>`;

    exporters['quote-calc'] = buildHtml;
    const render = () => {
      center.innerHTML = `<iframe style="width:100%;height:100%;border:none;" srcdoc="${buildHtml().replace(/"/g, '&quot;')}"></iframe>`;
    };

    right.innerHTML = `
      <h3 style="margin:0;font-size:15px;color:#c4b5fd;">🧾 ${fr ? 'Calculateur Devis & ROI' : 'Quote / ROI Calculator'}</h3>
      ${ctl(fr ? 'Titre' : 'Title', `<input id="qc-t" style="${INP_S}" value="${esc(st.title)}">`)}
      ${ctl(fr ? 'Devise (€ / $)' : 'Currency ($ / €)', `<input id="qc-cur" style="${INP_S}" value="${esc(st.currency)}">`)}
      ${ctl('Slider 1 Label', `<input id="qc-s1" style="${INP_S}" value="${esc(st.s1Name)}">`)}
      ${ctl('Slider 1 Unit Price', `<input id="qc-r1" type="number" style="${INP_S}" value="${st.s1Rate}">`)}
      ${ctl('Slider 2 Label', `<input id="qc-s2" style="${INP_S}" value="${esc(st.s2Name)}">`)}
      ${ctl('Slider 2 Unit Price', `<input id="qc-r2" type="number" style="${INP_S}" value="${st.s2Rate}">`)}
      ${ctl('Slider 3 Label', `<input id="qc-s3" style="${INP_S}" value="${esc(st.s3Name)}">`)}
      ${ctl('CTA Text', `<input id="qc-cta" style="${INP_S}" value="${esc(st.cta)}">`)}
      ${ctl('Brand Color', `<input id="qc-col" type="color" value="${st.color}" style="width:100%;height:34px;border:none;border-radius:6px;">`)}
      <button id="qc-btn-ide" style="${BTN_IDE}">💻 ${fr ? 'Éditer le Code dans IDE' : 'Edit Code in Studio Pro IDE'}</button>
      <button id="qc-btn-html" data-pro-export="1" style="${BTN_PRI}">📥 ${fr ? 'Exporter HTML5' : 'Export Standalone HTML'}</button>`;

    [['qc-t', 'title'], ['qc-cur', 'currency'], ['qc-s1', 's1Name'], ['qc-r1', 's1Rate', 1], ['qc-s2', 's2Name'], ['qc-r2', 's2Rate', 1], ['qc-s3', 's3Name'], ['qc-cta', 'cta'], ['qc-col', 'color']]
      .forEach(([id, k, isNum]) => { document.getElementById(id).oninput = (e) => { st[k] = isNum ? Number(e.target.value) : e.target.value; render(); }; });
    document.getElementById('qc-btn-ide').onclick = () => sendToIde('Interactive Quote Calculator Ad', buildHtml());
    document.getElementById('qc-btn-html').onclick = () => dlFile(buildHtml(), 'interactive-quote-calculator-ad.html');
    render();
  }

  // =========================================================================
  // 28. 9:16 REELS / TIKTOK / SHORTS ANIMATED VIDEO AD (WEBM + HTML5)
  // =========================================================================
  function initReelsAnimator() {
    if (window.raStudioInitialized) return;
    window.raStudioInitialized = true;
    const center = document.getElementById('ra-center');
    const right = document.getElementById('ra-right');
    if (!center || !right) return;
    const fr = isFr();

    const st = {
      brand: 'IA CODE STUDIO',
      headline: fr ? 'NOUVELLE COLLECTION' : 'NEW DROP LIVE NOW',
      oldPrice: '$99',
      newPrice: '$49',
      cta: fr ? 'ACHETER MAINTENANT' : 'SHOP THE DROP',
      theme: 'cyber',
      imgObj: null
    };

    const THEMES = {
      cyber: { bg1: '#0f172a', bg2: '#31105f', acc1: '#8b5cf6', acc2: '#06b6d4', txt: '#ffffff' },
      gold: { bg1: '#181207', bg2: '#422806', acc1: '#f59e0b', acc2: '#fde047', txt: '#ffffff' },
      flash: { bg1: '#1f0612', bg2: '#5c0a24', acc1: '#f43f5e', acc2: '#fb923c', txt: '#ffffff' },
      clean: { bg1: '#0b1120', bg2: '#1e293b', acc1: '#10b981', acc2: '#38bdf8', txt: '#ffffff' }
    };

    center.innerHTML = `<canvas id="ra-canvas" width="450" height="800" style="max-height:82vh;max-width:100%;border-radius:22px;border:2px solid rgba(255,255,255,0.16);box-shadow:0 24px 60px rgba(0,0,0,0.7);"></canvas>`;
    const canvas = document.getElementById('ra-canvas');
    const ctx = canvas.getContext('2d');
    let animId = null;

    function drawFrame(tSec) {
      const th = THEMES[st.theme] || THEMES.cyber;
      const W = canvas.width, H = canvas.height;
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, th.bg1); g.addColorStop(1, th.bg2);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // Animated kinetic background rings
      for (let i = 0; i < 4; i++) {
        const rad = 100 + i * 75 + Math.sin(tSec * 2 + i) * 16;
        ctx.strokeStyle = i % 2 ? th.acc1 + '33' : th.acc2 + '33';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(W / 2, H * 0.44, rad, 0, Math.PI * 2); ctx.stroke();
      }

      // Brand pill
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath(); ctx.roundRect(W / 2 - 110, 62, 220, 36, 18); ctx.fill();
      ctx.fillStyle = th.acc2; ctx.font = '800 14px Inter,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(st.brand.toUpperCase(), W / 2, 85);

      // Center product image or animated 3D badge
      const floatY = Math.sin(tSec * 2.8) * 12;
      ctx.save();
      ctx.translate(W / 2, H * 0.42 + floatY);
      if (st.imgObj) {
        ctx.beginPath(); ctx.roundRect(-130, -130, 260, 260, 26); ctx.clip();
        ctx.drawImage(st.imgObj, -130, -130, 260, 260);
      } else {
        ctx.rotate(Math.sin(tSec * 1.4) * 0.14);
        const cg = ctx.createLinearGradient(-110, -110, 110, 110);
        cg.addColorStop(0, th.acc1); cg.addColorStop(1, th.acc2);
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.roundRect(-110, -110, 220, 220, 34); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = '900 68px Inter,sans-serif';
        ctx.fillText('⚡', 0, 24);
      }
      ctx.restore();

      // Kinetic headline
      const scale = 1 + Math.sin(tSec * 4) * 0.03;
      ctx.save(); ctx.translate(W / 2, H * 0.68); ctx.scale(scale, scale);
      ctx.fillStyle = th.txt; ctx.font = '900 30px Outfit,Inter,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(st.headline.slice(0, 26), 0, 0);
      ctx.restore();

      // Slashed price + New price
      ctx.font = '700 22px Inter,sans-serif'; ctx.fillStyle = '#94a3b8';
      ctx.fillText(st.oldPrice, W / 2 - 58, H * 0.76);
      ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(W / 2 - 84, H * 0.752); ctx.lineTo(W / 2 - 32, H * 0.752); ctx.stroke();
      ctx.font = '900 40px Outfit,Inter,sans-serif'; ctx.fillStyle = th.acc2;
      ctx.fillText(st.newPrice, W / 2 + 42, H * 0.768);

      // Pulsing CTA button
      const pulse = 1 + Math.sin(tSec * 5) * 0.04;
      ctx.save(); ctx.translate(W / 2, H * 0.87); ctx.scale(pulse, pulse);
      const bg = ctx.createLinearGradient(-140, 0, 140, 0);
      bg.addColorStop(0, th.acc1); bg.addColorStop(1, th.acc2);
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-145, -28, 290, 56, 28); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '900 18px Inter,sans-serif'; ctx.fillText(st.cta + ' →', 0, 6);
      ctx.restore();
    }

    function loop(ts) {
      if (window.activeTab === 'reels-animator') {
        drawFrame(ts * 0.001);
      }
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);
    if (window.GeniusUtils && window.GeniusUtils.registerCleanup) {
      window.GeniusUtils.registerCleanup('reels-animator', () => { if (animId) cancelAnimationFrame(animId); });
    }

    const buildHtml = () => `<!DOCTYPE html>
<html lang="${fr ? 'fr' : 'en'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(st.brand)} — 9:16 Reels Ad</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#020617;font-family:Inter,sans-serif;color:#fff}
.reel{width:360px;height:640px;border-radius:26px;background:linear-gradient(160deg,${(THEMES[st.theme]||THEMES.cyber).bg1},${(THEMES[st.theme]||THEMES.cyber).bg2});display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:38px 24px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.15)}
.tag{padding:6px 16px;border-radius:99px;background:rgba(255,255,255,.12);color:${(THEMES[st.theme]||THEMES.cyber).acc2};font-weight:800;font-size:.78rem;letter-spacing:.08em}
.orb{width:170px;height:170px;border-radius:30px;background:linear-gradient(135deg,${(THEMES[st.theme]||THEMES.cyber).acc1},${(THEMES[st.theme]||THEMES.cyber).acc2});display:flex;align-items:center;justify-content:center;font-size:4rem;animation:fl 2.4s ease-in-out infinite alternate}
@keyframes fl{from{transform:translateY(-8px) rotate(-3deg)}to{transform:translateY(8px) rotate(3deg)}}
h1{font-size:1.6rem;font-weight:900}.prices{display:flex;gap:14px;align-items:center;justify-content:center}.old{color:#94a3b8;text-decoration:line-through;font-size:1.2rem}.new{color:${(THEMES[st.theme]||THEMES.cyber).acc2};font-size:2.1rem;font-weight:900}
.cta{display:inline-block;width:100%;padding:15px;border-radius:99px;background:linear-gradient(135deg,${(THEMES[st.theme]||THEMES.cyber).acc1},${(THEMES[st.theme]||THEMES.cyber).acc2});color:#fff;text-decoration:none;font-weight:900}
</style></head><body><div class="reel"><span class="tag">${esc(st.brand)}</span><div class="orb">⚡</div><div><h1>${esc(st.headline)}</h1><div class="prices"><span class="old">${esc(st.oldPrice)}</span><span class="new">${esc(st.newPrice)}</span></div></div><a class="cta" href="https://ia-codestudio.com" target="_blank">${esc(st.cta)} →</a></div></body></html>`;

    exporters['reels-animator'] = buildHtml;

    right.innerHTML = `
      <h3 style="margin:0;font-size:15px;color:#f9a8d4;">🎬 ${fr ? 'Animateur 9:16 Reels / TikTok' : '9:16 Reels / TikTok Ad'}</h3>
      ${ctl('Brand Pill', `<input id="ra-b" style="${INP_S}" value="${esc(st.brand)}">`)}
      ${ctl(fr ? 'Titre Kinetic' : 'Kinetic Headline', `<input id="ra-h" style="${INP_S}" value="${esc(st.headline)}">`)}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${ctl(fr ? 'Ancien Prix' : 'Old Price', `<input id="ra-op" style="${INP_S}" value="${esc(st.oldPrice)}">`)}
        ${ctl(fr ? 'Prix Promo' : 'Promo Price', `<input id="ra-np" style="${INP_S}" value="${esc(st.newPrice)}">`)}
      </div>
      ${ctl('CTA Text', `<input id="ra-cta" style="${INP_S}" value="${esc(st.cta)}">`)}
      ${ctl(fr ? 'Thème Vidéo' : 'Motion Theme', `<select id="ra-th" style="${INP_S}"><option value="cyber">Cyber Neon</option><option value="gold">Luxury Gold</option><option value="flash">Flash Sale Red</option><option value="clean">Emerald Clean</option></select>`)}
      ${ctl(fr ? 'Photo Produit (opt.)' : 'Product Photo (opt.)', `<input id="ra-img" type="file" accept="image/*" style="color:#cbd5e1;font-size:11px;">`)}
      <button id="ra-btn-webm" data-pro-export="1" style="${BTN_PRI}">🎬 ${fr ? 'Enregistrer Vidéo WebM (5s)' : 'Export 5s WebM Video'}</button>
      <button id="ra-btn-ide" style="${BTN_IDE}">💻 ${fr ? 'Éditer HTML5 dans IDE' : 'Edit HTML5 in Studio Pro IDE'}</button>
      <button id="ra-btn-html" data-pro-export="1" style="${BTN_PRI};background:rgba(255,255,255,0.1);">📥 ${fr ? 'Exporter HTML5' : 'Export HTML5'}</button>`;

    [['ra-b', 'brand'], ['ra-h', 'headline'], ['ra-op', 'oldPrice'], ['ra-np', 'newPrice'], ['ra-cta', 'cta'], ['ra-th', 'theme']]
      .forEach(([id, k]) => { document.getElementById(id).oninput = (e) => { st[k] = e.target.value; }; });
    document.getElementById('ra-img').onchange = (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const rd = new FileReader(); rd.onload = () => { const im = new Image(); im.onload = () => { st.imgObj = im; }; im.src = rd.result; }; rd.readAsDataURL(f);
    };
    document.getElementById('ra-btn-ide').onclick = () => sendToIde('9:16 Reels Ad', buildHtml());
    document.getElementById('ra-btn-html').onclick = () => dlFile(buildHtml(), 'reels-9x16-ad.html');
    document.getElementById('ra-btn-webm').onclick = () => {
      const btn = document.getElementById('ra-btn-webm');
      if (window.GeniusUtils && window.GeniusUtils.recordCanvasWebM) {
        const orig = btn.textContent;
        btn.disabled = true;
        window.GeniusUtils.recordCanvasWebM(canvas, 5000, 'ia-codestudio-reels-9x16.webm', (s) => { btn.textContent = '🔴 REC ' + s + 's'; })
          .finally(() => { btn.disabled = false; btn.textContent = orig; });
      }
    };
  }

  // Expose unified export hook for genius-pro-suite.js (Bundle ZIP + Edit in IDE!)
  window.__getExpandedStudioHTML = function (studioId) {
    return typeof exporters[studioId] === 'function' ? exporters[studioId]() : '';
  };

  // Chain cleanly onto window.renderTab
  const prevRenderTab = window.renderTab;
  window.renderTab = function (id) {
    if (typeof prevRenderTab === 'function') prevRenderTab(id);
    if (id === 'flash-sale') initFlashSale();
    else if (id === 'before-after') initBeforeAfter();
    else if (id === 'whatsapp-lead') initWhatsAppLead();
    else if (id === 'quote-calc') initQuoteCalc();
    else if (id === 'reels-animator') initReelsAnimator();
  };
})();
