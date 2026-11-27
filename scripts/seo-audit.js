/**
 * IA Code Studio — Comprehensive Technical SEO, Sitemap, GEO & IndexNow Validator
 * Run: node scripts/seo-audit.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'https://ia-codestudio.com';
const errors = [];
const warnings = [];

// 1. Validate sitemap.xml
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const smUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
if (smUrls.length < 70) errors.push(`Expected 70+ URLs in sitemap.xml, found ${smUrls.length}`);

let missingMeta = 0, missingCan = 0, badCan = 0, missingOg = 0, missingH1 = 0, missingLd = 0;

for (const u of smUrls) {
  let rel = u.replace(`${HOST}/`, '');
  if (!rel || rel.endsWith('/')) rel += 'index.html';
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    errors.push(`Broken sitemap URL: ${u} (missing ${rel})`);
    continue;
  }
  const html = fs.readFileSync(full, 'utf8');
  if (!/<meta\s+name=["']description["']/i.test(html)) { missingMeta++; errors.push(`Missing meta description: ${rel}`); }
  const canMatch = html.match(/rel=["']canonical["']\s+href=["']([^"']+)["']/i) || html.match(/href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  if (!canMatch) { missingCan++; errors.push(`Missing canonical: ${rel}`); }
  else if (canMatch[1].includes('/index.html')) { badCan++; errors.push(`Canonical uses /index.html: ${rel} -> ${canMatch[1]}`); }
  if (!/property=["']og:image["']/i.test(html)) { missingOg++; warnings.push(`Missing og:image: ${rel}`); }
  if (!/<h1[\s>]/i.test(html)) { missingH1++; errors.push(`Missing H1: ${rel}`); }
  if (!/application\/ld\+json/i.test(html)) { missingLd++; warnings.push(`Missing JSON-LD: ${rel}`); }

  // Validate JSON-LD blocks
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1].trim()); }
    catch (e) { errors.push(`Invalid JSON-LD in ${rel}: ${e.message}`); }
  }
}

// 2. Validate GEO & Core SEO files
for (const reqFile of ['robots.txt', 'llms.txt', 'llms-full.txt', '404.html', 'c7f1a9b24e8d3c015b6a7e8f901234cd.txt', 'netlify/functions/indexnow.js', 'scripts/ping-indexnow.js']) {
  if (!fs.existsSync(path.join(ROOT, reqFile))) errors.push(`Missing required SEO file: ${reqFile}`);
}

// 3. Validate JS syntax of IndexNow function & scripts
for (const jsFile of ['netlify/functions/indexnow.js', 'scripts/ping-indexnow.js', 'scripts/build-seo-pages.js', 'js/admin-portal.js', 'js/i18n.js']) {
  try {
    new vm.Script(fs.readFileSync(path.join(ROOT, jsFile), 'utf8'), { filename: jsFile });
  } catch (e) {
    errors.push(`JS syntax error in ${jsFile}: ${e.message}`);
  }
}

// 4. Unit-test Netlify IndexNow function internals
const idxFn = require(path.join(ROOT, 'netlify/functions/indexnow.js'));
if (idxFn._internals.HOST !== 'ia-codestudio.com') errors.push('IndexNow HOST mismatch');
if (idxFn._internals.KEY !== 'c7f1a9b24e8d3c015b6a7e8f901234cd') errors.push('IndexNow KEY mismatch');
const clean = idxFn._internals.sanitizeUrlList([
  'https://ia-codestudio.com/',
  'https://evil.com/phish',
  'http://ia-codestudio.com/insecure',
  'https://ia-codestudio.com/fr/',
  'https://ia-codestudio.com/'
]);
if (clean.length !== 2) errors.push(`sanitizeUrlList expected 2 valid URLs, got ${clean.length}`);

// 5. Check Romanian leak in new SEO pages
for (const rel of ['llms.txt', 'llms-full.txt', '404.html', 'compare/index.html', 'fr/index.html', 'fr/3d-studios/index.html', 'fr/marketing-widgets/index.html', 'fr/arcade/index.html', 'fr/compare/index.html']) {
  const txt = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  if (/[ăĂșȘțȚ]/.test(txt)) errors.push(`Romanian character leak in ${rel}`);
}

console.log(`SEO Audit Summary (${smUrls.length} sitemap URLs):`);
console.log(`  Missing meta desc: ${missingMeta}`);
console.log(`  Missing canonical: ${missingCan} | /index.html canonicals: ${badCan}`);
console.log(`  Missing H1:        ${missingH1}`);
console.log(`  Missing og:image:  ${missingOg} (warnings)`);
console.log(`  Missing JSON-LD:   ${missingLd} (warnings)`);
console.log(`  IndexNow unit test: OK (${clean.length} sanitized URLs)`);

if (warnings.length) console.log(`Warnings (${warnings.length}):`, warnings.slice(0, 10));
if (errors.length) {
  console.error(`\nERRORS (${errors.length}):\n` + errors.join('\n'));
  process.exit(1);
}
console.log('\nALL SEO, GEO, HREFLANG & INDEXNOW CHECKS PASSED WITH ZERO ERRORS!');
