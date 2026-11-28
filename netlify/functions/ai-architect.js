/**
 * Netlify Serverless Function: IA Code Studio — Google Gemini Neural Architect (PRO ONLY)
 * - ZERO free API burn: strictly requires verified Firebase Auth + active Pro status:
 *     1) Admin email (andart1174@gmail.com, email_verified === true)
 *     2) Firestore premium/{email} (verified via user's own Firebase ID token — zero Service Account needed!)
 *     3) Live Stripe active subscription or recent paid checkout via STRIPE_SECRET_KEY (read-only rk_live_...)
 * - Powered by Google Gemini 2.5 Flash (multimodal: text + sketch/screenshot image -> working app)
 * - Injects unique IA Code Studio "3D & UI DNA Memory" blueprints (Three.js, Liquid Chrome, Glassmorphism, Bento, Audio SFX)
 * - Supports actions: 'status' | 'generate' | 'modify' | 'repair'
 */
const https = require('https');
const crypto = require('crypto');

const FIREBASE_PROJECT_ID = 'ia-codestudio';
const ADMIN_EMAIL = String(process.env.IA_ADMIN_EMAIL || 'andart1174@gmail.com').toLowerCase().trim();
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3-flash'
];
const MAX_PROMPT_LEN = 4000;
const MAX_IMAGE_BASE64_LEN = 4_500_000; // ~3.3 MB raw image max
const PRO_CACHE_TTL_MS = 5 * 60 * 1000; // 5 min warm-lambda cache

let _cachedCerts = null;
let _cachedCertsExpiresAt = 0;
const _proCache = new Map(); // email -> { isPro, source, expiresAt }
const _rateWindow = new Map(); // email -> { count, resetAt }

function httpsRequest(url, options = {}, bodyStr = '') {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { timeout: 24000, ...options }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode || 500, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('Upstream request timed out')));
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function fetchGoogleCerts(requestImpl = httpsRequest) {
  if (_cachedCerts && Date.now() < _cachedCertsExpiresAt) {
    return Promise.resolve(_cachedCerts);
  }
  return requestImpl(GOOGLE_CERTS_URL, { method: 'GET', timeout: 10000 }).then((res) => {
    if (res.status !== 200) throw new Error(`Google certs HTTP ${res.status}`);
    _cachedCerts = JSON.parse(res.body);
    _cachedCertsExpiresAt = Date.now() + 3600000;
    return _cachedCerts;
  });
}

async function verifyFirebaseUser(event, requestImpl = httpsRequest) {
  const headers = (event && event.headers) || {};
  const authHeader = String(headers.authorization || headers.Authorization || '');
  if (!authHeader.startsWith('Bearer ')) {
    return { ok: false, statusCode: 401, code: 'AUTH_REQUIRED', error: 'Please sign in with Google to access Pro Neural Architect.' };
  }
  const token = authHeader.slice(7).trim();
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Malformed authentication token.' };
  }

  try {
    const headerJson = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const payloadJson = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    if (headerJson.alg !== 'RS256' || !headerJson.kid) {
      return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Unsupported token algorithm.' };
    }
    const certs = await fetchGoogleCerts(requestImpl);
    const certPem = certs && certs[headerJson.kid];
    if (!certPem) {
      return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Unknown signing key id.' };
    }
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(`${parts[0]}.${parts[1]}`);
    verifier.end();
    const sigValid = verifier.verify(certPem, Buffer.from(parts[2], 'base64url'));
    if (!sigValid) {
      return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Invalid authentication signature.' };
    }
    const nowSec = Math.floor(Date.now() / 1000);
    if (payloadJson.aud !== FIREBASE_PROJECT_ID || payloadJson.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) {
      return { ok: false, statusCode: 403, code: 'AUTH_INVALID', error: 'Invalid Firebase project claim.' };
    }
    if (!payloadJson.exp || Number(payloadJson.exp) <= nowSec || !payloadJson.sub) {
      return { ok: false, statusCode: 401, code: 'AUTH_EXPIRED', error: 'Session expired. Please sign in again.' };
    }
    const email = String(payloadJson.email || '').toLowerCase().trim();
    const emailVerified = payloadJson.email_verified === true;
    if (!email) {
      return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Account email missing from token.' };
    }
    return { ok: true, email, emailVerified, uid: payloadJson.sub, token };
  } catch (err) {
    return { ok: false, statusCode: 401, code: 'AUTH_INVALID', error: 'Token verification failed.' };
  }
}

function parseFirestoreNumber(field) {
  if (!field) return 0;
  if (field.integerValue !== undefined) return Number(field.integerValue);
  if (field.doubleValue !== undefined) return Number(field.doubleValue);
  if (field.stringValue !== undefined) return Number(field.stringValue);
  return 0;
}

async function checkFirestorePremium(email, firebaseToken, requestImpl = httpsRequest) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/premium/${encodeURIComponent(email)}`;
    const res = await requestImpl(url, {
      method: 'GET',
      timeout: 7000,
      headers: { Authorization: `Bearer ${firebaseToken}` }
    });
    if (res.status !== 200 || !res.body) return false;
    const doc = JSON.parse(res.body);
    const fields = doc && doc.fields;
    if (!fields) return false;
    const days = parseFirestoreNumber(fields.days);
    const addedAt = parseFirestoreNumber(fields.addedAt);
    if (days === 9999) return true;
    if (days > 0 && addedAt > 0 && (addedAt + days * 86400000) > Date.now()) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

async function checkStripeActivePro(email, requestImpl = httpsRequest) {
  const stripeKey = (process.env.STRIPE_SECRET_KEY || '').trim();
  if (!stripeKey) return { active: false, reason: 'no_stripe_key' };

  const requiredProdId = (process.env.STRIPE_PRO_PRODUCT_ID || '').trim();
  const authHeaders = {
    Authorization: `Bearer ${stripeKey}`,
    'Stripe-Version': '2024-06-20'
  };

  try {
    // 1. Check active/trialing subscriptions for customers with this verified email
    const custUrl = `https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=5&expand[]=data.subscriptions`;
    const custRes = await requestImpl(custUrl, { method: 'GET', timeout: 8000, headers: authHeaders });
    if (custRes.status === 200 && custRes.body) {
      const custData = JSON.parse(custRes.body);
      const customers = Array.isArray(custData.data) ? custData.data : [];
      for (const c of customers) {
        const subs = (c.subscriptions && Array.isArray(c.subscriptions.data)) ? c.subscriptions.data : [];
        for (const sub of subs) {
          if (sub.status === 'active' || sub.status === 'trialing') {
            if (!requiredProdId) return { active: true, source: 'stripe_subscription' };
            const items = (sub.items && Array.isArray(sub.items.data)) ? sub.items.data : [];
            const matchesProd = items.some((it) => {
              const p = it.price && it.price.product;
              const pid = typeof p === 'string' ? p : (p && p.id);
              return pid === requiredProdId;
            });
            if (matchesProd) return { active: true, source: 'stripe_subscription' };
          }
        }
      }
    }

    // 2. Fallback: check recent paid Checkout Sessions (last 32 days) in case of one-time pass
    const sessUrl = `https://api.stripe.com/v1/checkout/sessions?customer_details[email]=${encodeURIComponent(email)}&limit=5`;
    const sessRes = await requestImpl(sessUrl, { method: 'GET', timeout: 8000, headers: authHeaders });
    if (sessRes.status === 200 && sessRes.body) {
      const sessData = JSON.parse(sessRes.body);
      const sessions = Array.isArray(sessData.data) ? sessData.data : [];
      const cutoffSec = Math.floor((Date.now() - 32 * 86400000) / 1000);
      for (const s of sessions) {
        if (s.payment_status === 'paid' && Number(s.created || 0) >= cutoffSec) {
          return { active: true, source: 'stripe_checkout' };
        }
      }
    }
  } catch (e) {
    return { active: false, reason: 'stripe_error' };
  }
  return { active: false, reason: 'no_active_subscription' };
}

async function resolveProEntitlement(user, requestImpl = httpsRequest) {
  const { email, emailVerified, token } = user;

  // 1. Admin always has full unlimited access (requires verified Google email)
  if (email === ADMIN_EMAIL && emailVerified) {
    return { isPro: true, source: 'admin' };
  }

  // Require verified email before checking paid entitlements (prevents email spoofing)
  if (!emailVerified) {
    return { isPro: false, source: 'unverified_email' };
  }

  // Short warm-cache lookup (only caches positive Pro results briefly)
  const cached = _proCache.get(email);
  if (cached && cached.isPro && Date.now() < cached.expiresAt) {
    return { isPro: true, source: cached.source };
  }

  // 2. Check Firestore premium/{email} (Admin Panel grants)
  const inFirestore = await checkFirestorePremium(email, token, requestImpl);
  if (inFirestore) {
    _proCache.set(email, { isPro: true, source: 'firestore', expiresAt: Date.now() + PRO_CACHE_TTL_MS });
    return { isPro: true, source: 'firestore' };
  }

  // 3. Check live Stripe active subscription / recent checkout
  const stripeRes = await checkStripeActivePro(email, requestImpl);
  if (stripeRes.active) {
    _proCache.set(email, { isPro: true, source: stripeRes.source, expiresAt: Date.now() + PRO_CACHE_TTL_MS });
    return { isPro: true, source: stripeRes.source };
  }

  return { isPro: false, source: 'none' };
}

function checkRateLimit(email, isAdmin) {
  if (isAdmin) return { ok: true, remaining: 999 };
  const now = Date.now();
  const limitPerHour = Number(process.env.AI_PRO_HOURLY_LIMIT || 35);
  let entry = _rateWindow.get(email);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + 3600000 };
  }
  if (entry.count >= limitPerHour) {
    return { ok: false, remaining: 0 };
  }
  entry.count += 1;
  _rateWindow.set(email, entry);
  return { ok: true, remaining: Math.max(0, limitPerHour - entry.count) };
}

// ============================================================================
// IA CODE STUDIO — UNIQUE "3D & UI DNA MEMORY" SELECTOR
// ============================================================================
function selectDnaBlueprints(prompt, mode, boost3d) {
  const low = String(prompt || '').toLowerCase();
  const dna = [];

  dna.push({
    name: 'IA Cyber-Glass Aesthetic DNA',
    recipe: 'Use deep obsidian surfaces (#030712, #0b1120), frosted glassmorphism cards (rgba(15,23,42,0.72), backdrop-filter:blur(14px), border:1px solid rgba(255,255,255,0.1)), vibrant violet-cyan accents (#8b5cf6 -> #06b6d4), crisp Outfit/Inter typography, subtle micro-hover elevation, and flawless responsive CSS Grid/Flexbox layouts unless the user explicitly asks for a light theme.'
  });

  const wants3d = boost3d || mode === 'ui3d' || mode === 'chrome' ||
    /\b(3d|webgl|three\.?js|shader|particle|galaxy|globe|hologram|chrome|liquid|neon|portal|cube|space|immersive|spatial)\b/i.test(low);

  if (wants3d) {
    dna.push({
      name: mode === 'chrome' ? 'IA 4D Liquid Chrome Shader DNA' : 'IA Three.js WebGL 60 FPS DNA',
      recipe: mode === 'chrome'
        ? 'Embed a real interactive Three.js r128 canvas (load https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) featuring a glossy metallic/iridescent displaced sphere or torus mesh with dynamic Fresnel/environment lighting, smooth vertex wave motion, and interactive mouse parallax rotation + Orbit/drag feel, keeping pixelRatio capped at Math.min(window.devicePixelRatio, 2).'
        : 'Include a real interactive Three.js r128 WebGL visual stage or hero backdrop (load https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) using BufferGeometry particles, rotating geometric meshes, or interactive 3D cards with smooth mouse-reactive parallax, crisp resize handling, and graceful fallback if WebGL is unavailable.'
    });
  }

  if (/\b(dashboard|saas|analytics|kpi|chart|crypto|finance|budget|crm|admin|stock|revenue|tableau de bord|statistique)\b/i.test(low)) {
    dna.push({
      name: 'IA Interactive Data & Canvas Charts DNA',
      recipe: 'Build real interactive charts using crisp HTML5 Canvas 2D or responsive SVG graphs with hover tooltips, timeframe switcher buttons (7D / 30D / 1Y) that dynamically recompute KPI metrics & redraw charts, live search/filter tables, and localStorage persistence.'
    });
  }

  if (/\b(game|jeu|arcade|quiz|puzzle|piano|synth|music|audio|beat|drum|snake|tetris|shooter|pong|memory|clicker)\b/i.test(low)) {
    dna.push({
      name: 'IA 60 FPS Game Loop & Web Audio SFX DNA',
      recipe: 'Implement a silky 60 FPS requestAnimationFrame loop, responsive keyboard + touch/mouse controls, synthesized zero-asset Web Audio API sound effects (unlocked safely on first click), live score/combo HUD, game-over/restart screen, and localStorage high-score persistence.'
    });
  }

  if (/\b(shop|store|ecommerce|boutique|cart|panier|booking|calendar|rendez-vous|salon|restaurant|menu|hotel|real estate|immobilier|todo|kanban|task|calculator|calculatrice|form|portfolio)\b/i.test(low)) {
    dna.push({
      name: 'IA Full Working State & LocalStorage DB DNA',
      recipe: 'Every single button, filter, modal, shopping cart, booking slot, calculator formula, or CRUD item must actually work with real JavaScript state persisted in localStorage, smooth toast notifications, and zero dead links or placeholder alerts.'
    });
  }

  return dna;
}

function buildSystemInstruction(lang, mode, boost3d, dnaList) {
  const dnaText = dnaList.map((d, i) => `${i + 1}. [${d.name}]: ${d.recipe}`).join('\n');
  const langRule = lang === 'fr'
    ? 'Language: Detect the user prompt language. If the user writes in French (or requests French), write ALL UI labels, headings, sample data, and summary in natural French. If the user writes in English, write in natural English.'
    : 'Language: Match the exact language of the user prompt (English or French) for all UI text, sample data, and summary.';

  const modeHint = {
    pro: 'Target workspace: IA Architecte Studio Pro (full production web application).',
    ultra: 'Target workspace: IA Architecte Studio Ultra v2.0 (rich multi-section interactive web app).',
    ui3d: 'Target workspace: 3D UI Studio (interactive 3D WebGL / CSS-3D component showcase with live customization controls).',
    chrome: 'Target workspace: 3D Liquid Chrome Studio (iridescent liquid chrome 3D WebGL visual experience with interactive sliders).'
  }[mode] || 'Target workspace: IA Architecte Studio Pro.';

  return `You are IA Code Studio's Neural Architect — an elite Principal Frontend Engineer & Creative Technologist.
You create COMPLETE, STUNNING, 100% FUNCTIONAL browser web applications that look like award-winning SaaS/creative products.

${modeHint}
${langRule}

ACTIVE IA CODE STUDIO DNA MEMORY (inject these signature qualities seamlessly):
${dnaText}

STRICT OUTPUT & ENGINEERING RULES:
1. Return ONLY a valid JSON object matching this exact schema:
   {
     "title": "Short catchy app title (3-6 words)",
     "summary": "1-2 concise sentences explaining what was built and key interactive features",
     "html": "Inner body HTML ONLY (no <!DOCTYPE>, <html>, <head>, or <body> tags). You MAY include lightweight CDN <script> tags like Three.js r128 if needed for 3D.",
     "css": "Complete modern CSS including Google Fonts import if helpful, responsive media queries, custom scrollbars, and smooth animations.",
     "js": "Complete, bug-free vanilla JavaScript. Wrap initialization cleanly so it works immediately when injected into the document. Zero undefined variables, zero syntax errors, zero dead buttons."
   }
2. NEVER leave placeholder comments like "// TODO" or "add logic here". Every button, tab, search input, chart, calculator, form, or 3D control MUST genuinely work.
3. Keep external dependencies minimal: pure HTML5/CSS3/ES6 JS (and optional Three.js r128 CDN only when 3D is active). Never require npm, React build steps, or backend API keys.
4. Keep code tight, clean, and fast (target ~150-280 total lines across HTML+CSS+JS — zero bloat, maximum visual polish and interactivity).
5. Make the UI immediately impressive above the fold at both 1280px desktop and 390px mobile widths.
6. Never use alert() or prompt() — build sleek custom toast notifications or modals inside the app.`;
}

function buildUserContent(action, bodyObj) {
  if (action === 'modify') {
    const reqText = String(bodyObj.prompt || '').slice(0, MAX_PROMPT_LEN);
    const curHtml = String(bodyObj.currentHtml || '').slice(0, 18000);
    const curCss = String(bodyObj.currentCss || '').slice(0, 14000);
    const curJs = String(bodyObj.currentJs || '').slice(0, 18000);
    return `Modify the existing web application according to this user instruction:
"${reqText}"

Preserve all working features unless the user asked to replace or remove them. Return the COMPLETE updated JSON object {"title","summary","html","css","js"}.

CURRENT HTML:
${curHtml}

CURRENT CSS:
${curCss}

CURRENT JS:
${curJs}`;
  }

  if (action === 'repair') {
    const errMsg = String(bodyObj.errorMessage || 'Unknown runtime error').slice(0, 600);
    const curHtml = String(bodyObj.currentHtml || '').slice(0, 18000);
    const curCss = String(bodyObj.currentCss || '').slice(0, 14000);
    const curJs = String(bodyObj.currentJs || '').slice(0, 18000);
    return `AUTO-REPAIR REQUEST: The generated web application threw this browser runtime error:
"${errMsg}"

Fix the root cause cleanly without breaking existing UI or features. Return the COMPLETE repaired JSON object {"title","summary","html","css","js"}.

CURRENT HTML:
${curHtml}

CURRENT CSS:
${curCss}

CURRENT JS:
${curJs}`;
  }

  const userPrompt = String(bodyObj.prompt || '').trim().slice(0, MAX_PROMPT_LEN);
  const imgNote = bodyObj.imageBase64
    ? '\n\nAn image/sketch reference is attached. Recreate its layout, visual hierarchy, and purpose as a polished, fully interactive web application, enhancing it with IA Code Studio quality.'
    : '';
  return `Build a complete, interactive, production-grade web application for this request:\n"${userPrompt}"${imgNote}`;
}

function extractAppJson(rawText) {
  if (!rawText || typeof rawText !== 'string') throw new Error('Empty AI response.');
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }
  let parsed = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      parsed = JSON.parse(cleaned.slice(start, end + 1));
    } else {
      throw new Error('Could not parse structured AI output.');
    }
  }
  if (!parsed || (typeof parsed.html !== 'string' && typeof parsed.css !== 'string' && typeof parsed.js !== 'string')) {
    throw new Error('AI response missing html/css/js fields.');
  }
  return {
    title: String(parsed.title || 'AI Generated App').slice(0, 80),
    summary: String(parsed.summary || 'Interactive web application built by IA Code Studio Neural Architect.').slice(0, 320),
    html: String(parsed.html || ''),
    css: String(parsed.css || ''),
    js: String(parsed.js || '')
  };
}

async function discoverLatestFlashModel(apiKey, requestImpl = httpsRequest) {
  try {
    const res = await requestImpl('https://generativelanguage.googleapis.com/v1beta/models', {
      method: 'GET',
      timeout: 7000,
      headers: { 'x-goog-api-key': apiKey }
    });
    if (res.status !== 200 || !res.body) return null;
    const data = JSON.parse(res.body);
    const models = Array.isArray(data.models) ? data.models : [];
    const candidates = models
      .filter((m) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
      .map((m) => String(m.name || '').replace(/^models\//, ''))
      .filter((id) => /^gemini-[3-9].*flash/i.test(id) && !/tts|audio|image|embedding|vision|live/i.test(id));
    candidates.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    return candidates[0] || null;
  } catch (e) {
    return null;
  }
}

async function callGeminiArchitect({ apiKey, systemInstruction, userPromptText, imageBase64, imageMime }, requestImpl = httpsRequest) {
  const userParts = [{ text: userPromptText }];
  if (imageBase64 && typeof imageBase64 === 'string' && imageBase64.length <= MAX_IMAGE_BASE64_LEN) {
    const allowedMimes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    const safeMime = allowedMimes.includes(imageMime) ? imageMime : 'image/jpeg';
    userParts.push({
      inlineData: {
        mimeType: safeMime,
        data: imageBase64.replace(/^data:[^;]+;base64,/, '')
      }
    });
  }

  const makeBody = (thinkingLevel) => {
    const genCfg = {
      temperature: 0.72,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json'
    };
    if (thinkingLevel) {
      genCfg.thinkingConfig = { thinkingLevel };
    }
    return JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: 'user', parts: userParts }],
      generationConfig: genCfg
    });
  };

  const deadlineMs = Date.now() + 23500;
  const tried = [];

  const attemptModel = async (model, thinkingLevel = 'minimal') => {
    const remainingMs = deadlineMs - Date.now();
    if (remainingMs < 3500) {
      return { ok: false, status: 504, error: 'Time budget reached' };
    }
    const bodyStr = makeBody(thinkingLevel);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const res = await requestImpl(url, {
      method: 'POST',
      timeout: Math.min(18500, remainingMs),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-goog-api-key': apiKey,
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    }, bodyStr);

    if (res.status === 200) {
      const data = JSON.parse(res.body);
      const parts = data.candidates?.[0]?.content?.parts || [];
      const text = parts.filter(p => !p.thought).map(p => p.text || '').join('') || parts.map(p => p.text || '').join('');
      const app = extractAppJson(text);
      return { ok: true, app, model };
    }

    let apiErrMsg = `HTTP ${res.status}`;
    try {
      const parsedErr = JSON.parse(res.body);
      if (parsedErr.error && parsedErr.error.message) apiErrMsg = parsedErr.error.message;
    } catch (e) {}

    // If model rejects thinkingLevel "minimal" with 400, immediately retry without thinkingConfig
    if (res.status === 400 && thinkingLevel && /thinking/i.test(apiErrMsg)) {
      return attemptModel(model, null);
    }

    return { ok: false, status: res.status, error: apiErrMsg };
  };

  const modelList = process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL.trim(), ...GEMINI_MODELS.filter(m => m !== process.env.GEMINI_MODEL.trim())]
    : [...GEMINI_MODELS];

  for (const model of modelList) {
    if (Date.now() > deadlineMs - 3500) break;
    try {
      const r = await attemptModel(model, 'minimal');
      if (r.ok) return { app: r.app, model: r.model };
      tried.push(`${model}: ${r.error}`);
      if (![400, 404, 429, 500, 503].includes(r.status)) break;
    } catch (err) {
      tried.push(`${model}: ${err && err.message ? err.message : 'timeout'}`);
    }
  }

  // Self-healing fallback: discover newest active Flash model if time remains
  if (Date.now() < deadlineMs - 6000) {
    const discovered = await discoverLatestFlashModel(apiKey, requestImpl);
    if (discovered && !modelList.includes(discovered)) {
      try {
        const r = await attemptModel(discovered, 'minimal');
        if (r.ok) return { app: r.app, model: r.model };
        tried.push(`${discovered}: ${r.error}`);
      } catch (err) {
        tried.push(`${discovered}: ${err && err.message ? err.message : 'timeout'}`);
      }
    }
  }

  const allHighDemand = tried.length > 0 && tried.every(m => /high demand|503|429|timeout|timed out/i.test(m));
  if (allHighDemand) {
    throw new Error('Google Gemini is briefly experiencing peak demand. Click Retry in a few seconds (enabling Google AI Studio Pay-as-you-go billing also eliminates Free Tier 503 spikes).');
  }
  throw new Error(tried.slice(0, 3).join(' | ') || 'Gemini API request failed.');
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(payload)
  };
}

exports.handler = async (event, _context, deps = {}) => {
  const requestImpl = deps.httpsRequest || httpsRequest;
  const method = String((event && event.httpMethod) || 'GET').toUpperCase();

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: { Allow: 'POST, OPTIONS' }, body: '' };
  }
  if (method !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method Not Allowed. Use POST.' });
  }

  let bodyObj = {};
  if (event && event.body) {
    try {
      const rawBody = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : String(event.body);
      bodyObj = JSON.parse(rawBody || '{}');
    } catch (e) {
      return jsonResponse(400, { ok: false, error: 'Invalid JSON request body.' });
    }
  }

  // 1. Verify Firebase User Token (cryptographic RS256)
  const user = typeof deps.verifyFirebaseUser === 'function'
    ? await deps.verifyFirebaseUser(event, requestImpl)
    : await verifyFirebaseUser(event, requestImpl);
  if (!user || !user.ok) {
    return jsonResponse((user && user.statusCode) || 401, {
      ok: false,
      code: (user && user.code) || 'AUTH_REQUIRED',
      error: (user && user.error) || 'Authentication required.'
    });
  }

  // 2. Verify Paid Pro / Admin Entitlement SERVER-SIDE (Zero Free API Burn!)
  const entitlement = typeof deps.resolveProEntitlement === 'function'
    ? await deps.resolveProEntitlement(user, requestImpl)
    : await resolveProEntitlement(user, requestImpl);

  const action = String(bodyObj.action || 'generate').toLowerCase();

  // Status probe returns Pro verification without touching Gemini API
  if (action === 'status') {
    return jsonResponse(200, {
      ok: true,
      isPro: entitlement.isPro,
      source: entitlement.source,
      email: user.email,
      geminiConfigured: Boolean((process.env.GEMINI_API_KEY || '').trim()),
      stripeConfigured: Boolean((process.env.STRIPE_SECRET_KEY || '').trim())
    });
  }

  if (!entitlement.isPro) {
    return jsonResponse(402, {
      ok: false,
      code: 'PRO_REQUIRED',
      source: entitlement.source,
      error: 'Creator Pro subscription ($10/mo) is required to run Google Gemini Neural Architect.'
    });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    return jsonResponse(503, {
      ok: false,
      code: 'API_KEY_MISSING',
      error: 'GEMINI_API_KEY is not configured in Netlify Environment Variables.'
    });
  }

  // 3. Fair-Usage Anti-Abuse Rate Limit
  const rl = checkRateLimit(user.email, entitlement.source === 'admin');
  if (!rl.ok) {
    return jsonResponse(429, {
      ok: false,
      code: 'RATE_LIMITED',
      error: 'Hourly Pro AI fair-usage limit reached. Please try again shortly.'
    });
  }

  if (action === 'generate' && !String(bodyObj.prompt || '').trim() && !bodyObj.imageBase64) {
    return jsonResponse(400, { ok: false, error: 'Please enter an app description or attach a sketch.' });
  }

  const lang = bodyObj.lang === 'fr' ? 'fr' : 'en';
  const mode = ['pro', 'ultra', 'ui3d', 'chrome'].includes(bodyObj.mode) ? bodyObj.mode : 'pro';
  const boost3d = Boolean(bodyObj.boost3d);

  const dnaList = selectDnaBlueprints(bodyObj.prompt || '', mode, boost3d);
  const systemInstruction = buildSystemInstruction(lang, mode, boost3d, dnaList);
  const userPromptText = buildUserContent(action, bodyObj);

  try {
    const geminiCall = typeof deps.callGeminiArchitect === 'function'
      ? deps.callGeminiArchitect
      : callGeminiArchitect;
    const { app, model } = await geminiCall({
      apiKey,
      systemInstruction,
      userPromptText,
      imageBase64: action === 'generate' ? bodyObj.imageBase64 : '',
      imageMime: action === 'generate' ? bodyObj.imageMime : ''
    }, requestImpl);

    return jsonResponse(200, {
      ok: true,
      action,
      model,
      proSource: entitlement.source,
      dnaUsed: dnaList.map(d => d.name),
      remainingHourly: rl.remaining,
      app
    });
  } catch (err) {
    return jsonResponse(502, {
      ok: false,
      code: 'AI_UPSTREAM_ERROR',
      error: err && err.message ? err.message : 'Gemini AI generation failed. Please retry.'
    });
  }
};

exports._internals = {
  FIREBASE_PROJECT_ID,
  ADMIN_EMAIL,
  selectDnaBlueprints,
  extractAppJson,
  parseFirestoreNumber,
  verifyFirebaseUser,
  resolveProEntitlement,
  checkFirestorePremium,
  checkStripeActivePro
};
