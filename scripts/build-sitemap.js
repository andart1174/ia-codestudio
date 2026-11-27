/**
 * Automatically generates a clean, canonical sitemap.xml for https://ia-codestudio.com
 * Excludes non-indexable files (404.html, Google verification file, downloadable repo templates).
 * Run: node scripts/build-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'https://ia-codestudio.com';
const TODAY = '2026-11-27';

const EXCLUDE_PREFIXES = [
  '.git',
  'node_modules',
  'netlify',
  'scripts',
  'ia-code-studio-templates',
  'templates',
  'tools/'
];

const EXCLUDE_PATTERNS = [
  /^retro-arcade\/\d{2}-.*\.html$/i
];

const EXCLUDE_FILES = new Set([
  '404.html',
  'preview.html',
  'googlefb2bcd50466119a3.html'
]);

function walk(dir, relBase = '', out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    if (EXCLUDE_PREFIXES.some(p => rel === p || rel.startsWith(p + '/') || rel.startsWith(p))) continue;
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), rel, out);
    } else if (entry.name.endsWith('.html') && !EXCLUDE_FILES.has(rel) && !EXCLUDE_PATTERNS.some(re => re.test(rel))) {
      out.push(rel);
    }
  }
  return out;
}

function toCanonical(rel) {
  if (rel === 'index.html') return `${HOST}/`;
  if (rel.endsWith('/index.html')) return `${HOST}/${rel.slice(0, -'index.html'.length)}`;
  return `${HOST}/${rel}`;
}

function getPriorityAndFreq(url) {
  const p = url.replace(HOST, '');
  if (p === '/' || p === '/fr/') return { priority: '1.0', freq: 'daily' };
  if (/^\/(ia-architecte-app|ia-architecte-studio-pro|ia-architecte-studio-ultra|3d-studios|free-tools|marketing-widgets|compare|arcade|fr\/3d-studios|fr\/marketing-widgets|fr\/arcade|fr\/compare)\/$/.test(p)) {
    return { priority: '0.95', freq: 'weekly' };
  }
  if (/^\/(3d-creative-studio|3d-liquid-chrome-studio|studio-3d-4d-pro|hyperstudio-3d-4d|hologram-hud-builder|cyber-creative-studio|ad-genius-ai|3d-marketing-lab|widget-studio|cyber-arcade|retro-arcade|free-tools\/omni-convert|free-tools\/playground)\/$/.test(p)) {
    return { priority: '0.90', freq: 'weekly' };
  }
  if (p.startsWith('/compare/') || p.startsWith('/how-to-') || p.includes('generator.html') || p.includes('showroom-ai.html') || p.includes('ad-maker.html')) {
    return { priority: '0.88', freq: 'weekly' };
  }
  if (p.startsWith('/free-tools/converters/') || p.startsWith('/3d-marketing-lab/')) {
    return { priority: '0.85', freq: 'weekly' };
  }
  if (p === '/privacy-policy.html') return { priority: '0.50', freq: 'monthly' };
  return { priority: '0.80', freq: 'monthly' };
}

const files = walk(ROOT);
const seen = new Set();
const entries = [];

for (const f of files) {
  const loc = toCanonical(f);
  if (seen.has(loc)) continue;
  seen.add(loc);
  const { priority, freq } = getPriorityAndFreq(loc);
  entries.push({ loc, priority, freq });
}

entries.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority) || a.loc.localeCompare(b.loc));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(e => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap.xml with ${entries.length} canonical URLs.`);
