// OmniConvert Pro 2.0 — Color/WCAG/OKLCH Engine, Cron Parser, BigInt Base/Bitwise, SVG Optimizer, Timestamp, Fake Data & Magic Paste Detector
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});

  // ===========================================================================
  // 1. Universal Color Engine (HEX/RGB/HSL/OKLCH/CMYK, WCAG 2.1, Shades, Colorblind)
  // ===========================================================================
  const Color = (Omni.Color = {});

  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  Color.rgbToHex = function (r, g, b) {
    return '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
  };

  Color.rgbToHsl = function (r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  Color.hslToRgb = function (h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
  };

  Color.rgbToCmyk = function (r, g, b) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const k = 1 - Math.max(rn, gn, bn);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((1 - rn - k) / (1 - k)) * 100),
      m: Math.round(((1 - gn - k) / (1 - k)) * 100),
      y: Math.round(((1 - bn - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  // sRGB -> Linear -> Oklab -> OKLCH
  Color.rgbToOklch = function (r, g, b) {
    const lin = (c) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const rl = lin(r), gl = lin(g), bl = lin(b);
    const l = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
    const m = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
    const s = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
    const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
    const C = Math.sqrt(A * A + B * B);
    let H = (Math.atan2(B, A) * 180) / Math.PI;
    if (H < 0) H += 360;
    return { L: +(L * 100).toFixed(1), C: +C.toFixed(3), H: Math.round(H) };
  };

  // Universal color parser: accepts #RGB, RGB, #RRGGBB, RRGGBB, rgb(...), hsl(...)
  Color.parse = function (input) {
    const raw = String(input || '').trim().toLowerCase();
    if (!raw) return null;

    // HEX (with or without #, 3 or 6 chars)
    const hexM = raw.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexM) {
      let h = hexM[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
      };
    }

    // rgb(r, g, b) or rgba(...)
    const rgbM = raw.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/);
    if (rgbM) {
      return { r: clamp(+rgbM[1], 0, 255), g: clamp(+rgbM[2], 0, 255), b: clamp(+rgbM[3], 0, 255) };
    }

    // hsl(h, s%, l%) or hsla(...)
    const hslM = raw.match(/^hsla?\(\s*(-?\d+(?:\.\d+)?)\s*[,\s]\s*(\d+(?:\.\d+)?)%?\s*[,\s]\s*(\d+(?:\.\d+)?)%?/);
    if (hslM) {
      return Color.hslToRgb(parseFloat(hslM[1]), parseFloat(hslM[2]), parseFloat(hslM[3]));
    }

    return null;
  };

  // WCAG 2.1 relative luminance & contrast ratio
  Color.luminance = function (r, g, b) {
    const f = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  Color.contrastRatio = function (rgb1, rgb2) {
    const l1 = Color.luminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = Color.luminance(rgb2.r, rgb2.g, rgb2.b);
    const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return +((hi + 0.05) / (lo + 0.05)).toFixed(2);
  };

  Color.autoFixContrast = function (fgRgb, bgRgb, targetRatio = 4.5) {
    const hsl = Color.rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLum = Color.luminance(bgRgb.r, bgRgb.g, bgRgb.b);
    // Exact WCAG perceptual midpoint where black and white have equal contrast: sqrt(1.05 * 0.05) - 0.05 ≈ 0.1791
    const primaryDir = bgLum > 0.1791 ? -2 : 2;
    for (const step of [primaryDir, -primaryDir]) {
      let l = hsl.l;
      for (let i = 0; i <= 50; i++) {
        const cand = Color.hslToRgb(hsl.h, hsl.s, l);
        if (Color.contrastRatio(cand, bgRgb) >= targetRatio) return cand;
        const nextL = clamp(l + step, 0, 100);
        if (nextL === l) break;
        l = nextL;
      }
    }
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    return Color.contrastRatio(black, bgRgb) >= Color.contrastRatio(white, bgRgb) ? black : white;
  };

  Color.tailwindScale = function (rgb) {
    const hsl = Color.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const stops = [
      [50, 96], [100, 91], [200, 82], [300, 70], [400, 58],
      [500, 48], [600, 40], [700, 32], [800, 24], [900, 16], [950, 9],
    ];
    return stops.map(([step, l]) => {
      const c = Color.hslToRgb(hsl.h, clamp(hsl.s + (step < 300 ? 6 : 0), 0, 100), l);
      return { step, hex: Color.rgbToHex(c.r, c.g, c.b) };
    });
  };

  // Vienot/Brettel approximate CVD simulation matrices
  const CVD_MATRICES = {
    protanopia: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
    deuteranopia: [[0.625, 0.375, 0], [0.70, 0.30, 0], [0, 0.30, 0.70]],
    tritanopia: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
    achromatopsia: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]],
  };

  Color.simulateColorblind = function (rgb) {
    const out = {};
    for (const [name, m] of Object.entries(CVD_MATRICES)) {
      const r = m[0][0] * rgb.r + m[0][1] * rgb.g + m[0][2] * rgb.b;
      const g = m[1][0] * rgb.r + m[1][1] * rgb.g + m[1][2] * rgb.b;
      const b = m[2][0] * rgb.r + m[2][1] * rgb.g + m[2][2] * rgb.b;
      out[name] = Color.rgbToHex(r, g, b);
    }
    return out;
  };

  // ===========================================================================
  // 2. Cron Expression Parser, Human Explainer (EN/FR) & Next 10 Runs
  // ===========================================================================
  const Cron = (Omni.Cron = {});
  const DOW_MAP = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
  const MON_MAP = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

  function parseCronField(expr, min, max, namesMap) {
    const set = new Set();
    let norm = expr.toUpperCase();
    if (namesMap) {
      for (const [k, v] of Object.entries(namesMap)) {
        norm = norm.replace(new RegExp(`\\b${k}\\b`, 'g'), String(v));
      }
    }
    for (const part of norm.split(',')) {
      const [rangePart, stepPart] = part.split('/');
      const step = stepPart ? parseInt(stepPart, 10) : 1;
      if (isNaN(step) || step < 1) throw new Error(`Invalid step "${part}"`);
      let start = min, end = max;
      if (rangePart !== '*') {
        if (rangePart.includes('-')) {
          const [a, b] = rangePart.split('-').map((x) => parseInt(x, 10));
          if (isNaN(a) || isNaN(b)) throw new Error(`Invalid range "${part}"`);
          start = a; end = b;
        } else {
          const v = parseInt(rangePart, 10);
          if (isNaN(v)) throw new Error(`Invalid value "${part}"`);
          start = v;
          end = stepPart ? max : v;
        }
      }
      if (max === 6 && start === 7) start = 0;
      if (max === 6 && end === 7) end = 0;
      if (start < min || end > max || start > end) throw new Error(`Out-of-range value "${part}" (${min}-${max})`);
      for (let i = start; i <= end; i += step) set.add(i);
    }
    return set;
  }

  Cron.parse = function (expr) {
    const parts = String(expr || '').trim().split(/\s+/);
    if (parts.length !== 5) throw new Error('Cron expression must have exactly 5 fields: min hour dom month dow');
    return {
      raw: parts,
      minutes: parseCronField(parts[0], 0, 59),
      hours: parseCronField(parts[1], 0, 23),
      dom: parseCronField(parts[2], 1, 31),
      months: parseCronField(parts[3], 1, 12, MON_MAP),
      dow: parseCronField(parts[4], 0, 6, DOW_MAP),
    };
  };

  Cron.describe = function (expr, lang = 'en') {
    const parsed = Cron.parse(expr);
    const [m, h, dom, mon, dow] = parsed.raw;
    const isFr = lang === 'fr';
    const pieces = [];

    if (m === '*' && h === '*') pieces.push(isFr ? 'Chaque minute' : 'Every minute');
    else if (m.startsWith('*/') && h === '*') pieces.push(isFr ? `Toutes les ${m.slice(2)} minutes` : `Every ${m.slice(2)} minutes`);
    else if (m === '0' && h.startsWith('*/')) pieces.push(isFr ? `Toutes les ${h.slice(2)} heures` : `Every ${h.slice(2)} hours`);
    else if (/^\d+$/.test(m) && /^\d+$/.test(h)) pieces.push(isFr ? `À ${h.padStart(2, '0')}:${m.padStart(2, '0')}` : `At ${h.padStart(2, '0')}:${m.padStart(2, '0')}`);
    else pieces.push(isFr ? `Minute (${m}), Heure (${h})` : `At minute ${m}, hour ${h}`);

    if (dom !== '*') pieces.push(isFr ? `le jour ${dom} du mois` : `on day ${dom} of the month`);
    if (mon !== '*') pieces.push(isFr ? `en mois (${mon})` : `in month ${mon}`);
    if (dow !== '*') {
      const dowLabel = dow === '1-5' ? (isFr ? 'du Lundi au Vendredi' : 'Monday through Friday') : (isFr ? `jour de semaine (${dow})` : `on weekday ${dow}`);
      pieces.push(dowLabel);
    }
    return pieces.join(', ');
  };

  Cron.nextRuns = function (expr, count = 10, fromDate = new Date()) {
    const p = Cron.parse(expr);
    const runs = [];
    const cur = new Date(fromDate.getTime());
    cur.setSeconds(0, 0);
    cur.setMinutes(cur.getMinutes() + 1);
    const maxIter = 525960; // ~1 year of minutes
    for (let i = 0; i < maxIter && runs.length < count; i++) {
      if (
        p.months.has(cur.getMonth() + 1) &&
        p.dom.has(cur.getDate()) &&
        p.dow.has(cur.getDay()) &&
        p.hours.has(cur.getHours()) &&
        p.minutes.has(cur.getMinutes())
      ) {
        runs.push(new Date(cur.getTime()));
      }
      cur.setMinutes(cur.getMinutes() + 1);
    }
    return runs;
  };

  // ===========================================================================
  // 3. BigInt Arbitrary-Precision Number Base & Bitwise Engine
  // ===========================================================================
  const BigBase = (Omni.BigBase = {});

  BigBase.parse = function (str, base = 10) {
    let s = String(str || '').trim().replace(/_/g, '');
    if (!s) return null;
    let neg = false;
    if (s.startsWith('-')) { neg = true; s = s.slice(1); }
    else if (s.startsWith('+')) { s = s.slice(1); }
    if (!s) return null;

    if (base === 16) s = s.replace(/^0x/i, '');
    if (base === 2) s = s.replace(/^0b/i, '');
    if (base === 8) s = s.replace(/^0o/i, '');

    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
    const bBig = BigInt(base);
    let acc = 0n;
    for (const ch of s.toLowerCase()) {
      const d = alphabet.indexOf(ch);
      if (d === -1) throw new Error(`Invalid character "${ch}" for base ${base}`);
      acc = acc * bBig + BigInt(d);
    }
    return neg ? -acc : acc;
  };

  // Strict explicit-prefix parser (never misinterprets decimal "100000" as binary!)
  BigBase.parseExplicit = function (str) {
    let s = String(str || '').trim().replace(/_/g, '');
    if (!s) throw new Error('Empty operand');
    let neg = false;
    if (s.startsWith('-')) { neg = true; s = s.slice(1); }
    let val;
    if (/^0x/i.test(s)) val = BigBase.parse(s.slice(2), 16);
    else if (/^0b/i.test(s)) val = BigBase.parse(s.slice(2), 2);
    else if (/^0o/i.test(s)) val = BigBase.parse(s.slice(2), 8);
    else val = BigBase.parse(s, 10);
    return neg ? -val : val;
  };

  BigBase.formatAll = function (bigVal) {
    const neg = bigVal < 0n;
    const abs = neg ? -bigVal : bigVal;
    const sign = neg ? '-' : '';
    const uint32 = BigInt.asUintN(32, bigVal);
    return {
      dec: sign + abs.toString(10),
      hex: sign + abs.toString(16).toUpperCase(),
      bin: sign + abs.toString(2),
      oct: sign + abs.toString(8),
      base36: sign + abs.toString(36).toUpperCase(),
      bits32: uint32.toString(2).padStart(32, '0'),
    };
  };

  BigBase.bitwise = function (aStr, bStr, op) {
    const a = BigBase.parseExplicit(aStr);
    const b = op === 'NOT' ? 0n : BigBase.parseExplicit(bStr);
    let res;
    if (op === 'AND') res = a & b;
    else if (op === 'OR') res = a | b;
    else if (op === 'XOR') res = a ^ b;
    else if (op === 'NOT') res = ~a;
    else if (op === 'SHL') res = a << b;
    else if (op === 'SHR') res = a >> b;
    else if (op === 'USHR') res = BigInt.asUintN(32, a) >> b;
    else throw new Error(`Unknown bitwise op: ${op}`);
    return { a, b, res, formatted: BigBase.formatAll(res) };
  };

  // ===========================================================================
  // 4. Timestamp & Multi-Timezone Converter (Handles Negative & Float Correctly!)
  // ===========================================================================
  const Time = (Omni.Time = {});

  Time.parseTimestamp = function (raw) {
    const s = String(raw || '').trim();
    if (!/^[+-]?\d+(?:\.\d+)?$/.test(s)) {
      throw new Error('Invalid numeric timestamp.');
    }
    const num = Number(s);
    const abs = Math.abs(num);
    let ms, detectedUnit;
    // Smart magnitude detection (works for negative timestamps & floats!)
    if (abs >= 1e17) { ms = num / 1e6; detectedUnit = 'nanoseconds'; }
    else if (abs >= 1e14) { ms = num / 1e3; detectedUnit = 'microseconds'; }
    else if (abs >= 1e11) { ms = num; detectedUnit = 'milliseconds'; }
    else { ms = num * 1000; detectedUnit = 'seconds'; }

    const date = new Date(ms);
    if (isNaN(date.getTime())) throw new Error('Timestamp out of valid JavaScript Date range.');
    return { date, ms: Math.round(ms), seconds: Math.floor(ms / 1000), detectedUnit };
  };

  Time.diffDates = function (d1, d2) {
    const deltaMs = d2.getTime() - d1.getTime();
    const direction = deltaMs >= 0 ? 'forward' : 'backward';
    const abs = Math.abs(deltaMs);
    const totalSec = Math.floor(abs / 1000);
    const totalMin = Math.floor(totalSec / 60);
    const totalHours = Math.floor(totalMin / 60);
    const totalDays = Math.floor(totalHours / 24);
    const days = totalDays;
    const hours = totalHours % 24;
    const minutes = totalMin % 60;
    const seconds = totalSec % 60;
    return { direction, deltaMs, days, hours, minutes, seconds, totalDays, totalHours, totalMin, totalSec };
  };

  // ===========================================================================
  // 5. SVG Optimizer + React JSX + CSS Data URI Converter
  // ===========================================================================
  const Svg = (Omni.Svg = {});

  Svg.optimize = function (svgText, opts = {}) {
    const { removeComments = true, removeMetadata = true, roundPrecision = 2, removeDimensions = false, minify = true } = opts;
    const origBytes = new TextEncoder().encode(svgText).length;
    let out = svgText.trim();
    if (!/<svg[\s>]/i.test(out)) throw new Error('Input does not contain a valid <svg> element.');

    if (removeComments) out = out.replace(/<!--[\s\S]*?-->/g, '');
    if (removeMetadata) {
      out = out
        .replace(/<\?xml[\s\S]*?\?>/gi, '')
        .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
        .replace(/<metadata[\s\S]*?<\/metadata>/gi, '')
        .replace(/\s+(?:xmlns:(?:inkscape|sodipodi|sketch|dc|cc|rdf)|(?:inkscape|sodipodi|sketch):[a-zA-Z0-9_-]+)="[^"]*"/gi, '')
        .replace(/<sodipodi:namedview[\s\S]*?\/>/gi, '');
    }
    if (removeDimensions) {
      out = out.replace(/(<svg\b[^>]*?)\s+(?:width|height)="[^"]*"/gi, '$1').replace(/(<svg\b[^>]*?)\s+(?:width|height)="[^"]*"/gi, '$1');
    }
    if (roundPrecision >= 0) {
      const p = Math.min(4, Math.max(0, Number(roundPrecision)));
      out = out.replace(/(\d+\.\d{3,})/g, (m) => Number(parseFloat(m).toFixed(p)).toString());
    }
    if (minify) {
      out = out.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim();
    }
    const newBytes = new TextEncoder().encode(out).length;
    const savedPct = origBytes > 0 ? +(((origBytes - newBytes) / origBytes) * 100).toFixed(1) : 0;
    return { svg: out, origBytes, newBytes, savedPct };
  };

  Svg.toReactJsx = function (svgText, compName = 'SvgIcon') {
    let jsx = svgText
      .replace(/\bclass=/g, 'className=')
      .replace(/\bfor=/g, 'htmlFor=')
      .replace(/\b([a-z]+)-([a-z])/g, (_, a, b) => a + b.toUpperCase())
      .replace(/\bxmlns:xlink=/g, 'xmlnsXlink=')
      .replace(/\bxlink:href=/g, 'xlinkHref=')
      .replace(/<svg\b/, '<svg {...props}');
    return `import React from 'react';\n\nexport function ${compName}(props) {\n  return (\n    ${jsx}\n  );\n}`;
  };

  Svg.toCssDataUri = function (svgText) {
    const encoded = encodeURIComponent(svgText.replace(/\s+/g, ' ').trim())
      .replace(/%20/g, ' ')
      .replace(/%3D/g, '=')
      .replace(/%3A/g, ':')
      .replace(/%2F/g, '/')
      .replace(/'/g, '%27');
    return `background-image: url("data:image/svg+xml,${encoded}");`;
  };

  // ===========================================================================
  // 6. Accurate Fake Data & Lorem Generator (Exact Count — No 8x Bug!)
  // ===========================================================================
  const Fake = (Omni.Fake = {});
  const LOREM = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','ut','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur'];
  const FIRST = ['Alex','Elena','Marcus','Sofia','Liam','Chloe','Matei','Maya','Noah','Clara','Lucas','Aria','David','Nora','Julian','Emma','Andrei','Hannah','Leo','Zoe'];
  const LAST = ['Carter','Popescu','Moreau','Chen','Patel','Silva','Kowalski','Vance','Dupont','Müller','Rossi','Kim','Novak','Ionescu','Walker','Mercer','Sato','Rivera','Brooks','Dumont'];
  const ROLES = ['Staff Engineer','Product Designer','Security Lead','DevOps Architect','Frontend Dev','AI Researcher','Data Scientist'];
  const CITIES = ['Paris','Bucharest','Montreal','London','Berlin','Tokyo','Austin','Zurich','Amsterdam','Toronto'];
  const DOMAINS = ['devmail.io','cloudlab.dev','codestudio.org','example.com','workspace.app'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  Fake.generate = function (type, count = 5) {
    const n = Math.max(1, Math.min(200, Number(count) || 5));
    if (type === 'lorem-words') {
      const words = Array.from({ length: n }, () => pick(LOREM));
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    }
    if (type === 'lorem-paragraphs') {
      return Array.from({ length: n }, () => {
        const sents = 3 + Math.floor(Math.random() * 3);
        return Array.from({ length: sents }, () => {
          const wc = 8 + Math.floor(Math.random() * 8);
          const w = Array.from({ length: wc }, () => pick(LOREM));
          w[0] = w[0][0].toUpperCase() + w[0].slice(1);
          return w.join(' ') + '.';
        }).join(' ');
      }).join('\n\n');
    }
    if (type === 'names') return Array.from({ length: n }, () => `${pick(FIRST)} ${pick(LAST)}`).join('\n');
    if (type === 'emails') return Array.from({ length: n }, () => `${pick(FIRST).toLowerCase()}.${pick(LAST).toLowerCase()}${Math.floor(Math.random() * 99)}@${pick(DOMAINS)}`).join('\n');

    const users = Array.from({ length: n }, (_, i) => {
      const fn = pick(FIRST), ln = pick(LAST);
      return {
        id: i + 1,
        uuid: Omni.Crypto ? Omni.Crypto.generateUUIDv4() : `user-${i + 1}`,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${pick(DOMAINS)}`,
        role: pick(ROLES),
        city: pick(CITIES),
        active: Math.random() > 0.25,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 365)).toISOString(),
      };
    });
    if (type === 'users-csv' && Omni.Data) return Omni.Data.jsonToCsv(users);
    if (type === 'users-sql' && Omni.Data) return Omni.Data.jsonToSqlInsert(users, 'users');
    return JSON.stringify(users, null, 2);
  };

  // ===========================================================================
  // 7. Magic Paste Auto-Detector (<1ms smart content classifier)
  // ===========================================================================
  Omni.MagicDetect = function (raw) {
    const s = String(raw || '').trim();
    if (!s) return null;

    // 1. JWT (with or without Bearer)
    const jwtClean = s.replace(/^Bearer\s+/i, '');
    if (/^[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]*$/.test(jwtClean)) {
      return { type: 'jwt', tab: 'jwt', labelEn: 'JWT Token Detected', labelFr: 'Jeton JWT détecté', action: 'Open in JWT Studio' };
    }
    // 2. PEM Certificate
    if (/-----BEGIN CERTIFICATE-----/.test(s)) {
      return { type: 'pem', tab: 'hash', labelEn: 'X.509 PEM Certificate', labelFr: 'Certificat PEM X.509', action: 'Inspect in Crypto Vault' };
    }
    // 3. cURL Command
    if (/^curl\s+/i.test(s)) {
      return { type: 'curl', tab: 'http', labelEn: 'cURL Command Detected', labelFr: 'Commande cURL détectée', action: 'Translate in cURL Studio' };
    }
    // 4. SVG Markup
    if (/^<(?:!DOCTYPE|\?xml)?[\s\S]*?<svg\b/i.test(s) && /<\/svg>\s*$/i.test(s)) {
      return { type: 'svg', tab: 'svg', labelEn: 'SVG Graphic Detected', labelFr: 'Graphique SVG détecté', action: 'Optimize in SVG Studio' };
    }
    // 5. Data URI
    if (/^data:[a-z0-9.+-]+\/[a-z0-9.+-]+;base64,/i.test(s)) {
      return { type: 'datauri', tab: 'base64', labelEn: 'Base64 Data URI', labelFr: 'Data URI Base64', action: 'Preview in Base64 Studio' };
    }
    // 6. Color
    if (Color.parse(s)) {
      return { type: 'color', tab: 'colors', labelEn: `Color (${s})`, labelFr: `Couleur (${s})`, action: 'Open in Colors & WCAG Lab' };
    }
    // 7. Unix Timestamp (10 or 13 digits)
    if (/^-?\d{10,13}$/.test(s)) {
      return { type: 'timestamp', tab: 'utilities', subtab: 'timestamp', labelEn: 'Unix Timestamp Detected', labelFr: 'Horodatage Unix détecté', action: 'Convert Timestamp' };
    }
    // 8. Cron Expression (5 fields)
    if (/^([*\d/,-]+\s+){4}[*\d/,-a-zA-Z]+$/.test(s)) {
      try { Cron.parse(s); return { type: 'cron', tab: 'utilities', subtab: 'cron', labelEn: 'Cron Expression Detected', labelFr: 'Expression Cron détectée', action: 'Explain in Cron Builder' }; } catch (_) {}
    }
    // 9. URL with query params
    if (/^https?:\/\/\S+/.test(s) && !s.includes('\n')) {
      return { type: 'url', tab: 'http', labelEn: 'HTTP URL Detected', labelFr: 'URL HTTP détectée', action: 'Inspect URL / Generate QR' };
    }
    // 10. JSON
    if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
      try { JSON.parse(s); return { type: 'json', tab: 'serialize', labelEn: 'Valid JSON Detected', labelFr: 'JSON valide détecté', action: 'Format / Convert / Code-Gen' }; } catch (_) {}
    }
    // 11. XML / HTML
    if (s.startsWith('<') && s.endsWith('>')) {
      if (/<(?:html|div|section|body|style|script)\b/i.test(s)) {
        return { type: 'html', tab: 'playground', labelEn: 'HTML Snippet Detected', labelFr: 'Code HTML détecté', action: 'Preview in Playground' };
      }
      return { type: 'xml', tab: 'serialize', labelEn: 'XML Document Detected', labelFr: 'Document XML détecté', action: 'Convert XML to JSON' };
    }
    // 12. Base64 string (min 16 chars, multiple of 4)
    if (s.length >= 16 && s.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(s)) {
      return { type: 'base64', tab: 'base64', labelEn: 'Base64 Encoded String', labelFr: 'Chaîne Base64 détectée', action: 'Decode in Base64 Studio' };
    }
    // 13. YAML (multi-line key: val)
    if (s.includes('\n') && /^[a-zA-Z0-9_-]+:\s+/m.test(s)) {
      return { type: 'yaml', tab: 'serialize', labelEn: 'YAML Detected', labelFr: 'YAML détecté', action: 'Convert YAML to JSON' };
    }
    return { type: 'text', tab: 'hash', labelEn: 'Plain Text', labelFr: 'Texte Brut', action: 'Hash / Base64 / Diff' };
  };
})(typeof window !== 'undefined' ? window : globalThis);
