// Markdown GFM to HTML5 Sanitized Compiler Pro

const defaultMarkdownInput = `# Pro Web Development Notes

Here is how **IA Code Studio** boosts your workflow with ~~manual boilerplate~~ instant tooling:

## Quick Checklist
- [x] Protected fenced code blocks (\`my_var_name\` stays untouched!)
- [x] GFM Tables, H1-H6 & Ordered Lists
- [ ] Export clean semantic HTML5

| Feature | Status | Security |
| --- | --- | --- |
| GFM Tables | Active | Escaped |
| Code Blocks | Protected | Zero XSS |

1. Write structured Markdown
2. Preview live with instant stats
3. Export in Dark Cyber, GitHub or Notion theme

\`\`\`js
const my_var_name = "safe_underscores_preserved";
console.log(my_var_name);
\`\`\`

> "Clean, sanitized semantic HTML5 in 1-click."

Check out [IA Code Studio](https://ia-codestudio.com).`;

function esc(str) {
  if (typeof window !== 'undefined' && window.HubUtils && window.HubUtils.escapeHtml) {
    return window.HubUtils.escapeHtml(str);
  }
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function safeHref(url) {
  if (typeof window !== 'undefined' && window.HubUtils && window.HubUtils.sanitizeUrl) {
    return window.HubUtils.sanitizeUrl(url, '#');
  }
  const s = String(url || '').trim();
  return /^(https?:|mailto:|tel:|#|\/)/i.test(s) ? s : '#';
}

function formatInline(text) {
  // Protect inline code spans first so _ or * inside code never get formatted
  const inlineCodes = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, code) => {
    const idx = inlineCodes.push(`<code>${code}</code>`) - 1;
    return `\u0000IC${idx}\u0000`;
  });

  // Images & Links (with sanitized URL)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img src="${esc(safeHref(url))}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;">`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => `<a href="${esc(safeHref(url))}" target="_blank" rel="noopener noreferrer">${label}</a>`);

  // Bold, Italic, Strikethrough
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/(^|[^\w])_([^_]+)_(?=[^\w]|$)/g, '$1<em>$2</em>');

  return s.replace(/\u0000IC(\d+)\u0000/g, (_, i) => inlineCodes[Number(i)]);
}

function parseMarkdown(md) {
  const src = String(md || '').replace(/\r\n/g, '\n');

  // 1. Extract & protect fenced code blocks BEFORE any other parsing!
  const codeBlocks = [];
  const protectedSrc = src.replace(/```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const cls = lang ? ` class="language-${esc(lang)}"` : '';
    const idx = codeBlocks.push(`<pre><code${cls}>${esc(code.replace(/\n$/, ''))}</code></pre>`) - 1;
    return `\n\u0000CB${idx}\u0000\n`;
  });

  const lines = protectedSrc.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    // Protected Code Block placeholder
    const cbM = trimmed.match(/^\u0000CB(\d+)\u0000$/);
    if (cbM) {
      out.push(codeBlocks[Number(cbM[1])]);
      i++; continue;
    }

    // Horizontal Rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      out.push('<hr>');
      i++; continue;
    }

    // Headings H1-H6
    const hM = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (hM) {
      const lvl = hM[1].length;
      out.push(`<h${lvl}>${formatInline(hM[2])}</h${lvl}>`);
      i++; continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const bq = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bq.push(formatInline(lines[i].trim().replace(/^>\s?/, '')));
        i++;
      }
      out.push(`<blockquote>${bq.join('<br>')}</blockquote>`);
      continue;
    }

    // GFM Table
    if (trimmed.includes('|') && i + 1 < lines.length && /^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(lines[i + 1])) {
      const splitRow = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const headers = splitRow(trimmed);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      const thead = `<thead><tr>${headers.map(h => `<th>${formatInline(h)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${formatInline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      out.push(`<table style="width:100%;border-collapse:collapse;margin:1rem 0;">${thead}${tbody}</table>`);
      continue;
    }

    // Unordered / Task List
    if (/^[\-\*\+]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[\-\*\+]\s+/.test(lines[i].trim())) {
        const rawItem = lines[i].trim().replace(/^[\-\*\+]\s+/, '');
        const taskM = rawItem.match(/^\[(x|X|\s)\]\s+(.+)$/);
        if (taskM) {
          const checked = taskM[1].toLowerCase() === 'x' ? ' checked' : '';
          items.push(`<li style="list-style:none;"><input type="checkbox" disabled${checked}> ${formatInline(taskM[2])}</li>`);
        } else {
          items.push(`<li>${formatInline(rawItem)}</li>`);
        }
        i++;
      }
      out.push(`<ul>\n${items.join('\n')}\n</ul>`);
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(`<li>${formatInline(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>\n${items.join('\n')}\n</ol>`);
      continue;
    }

    // Paragraph
    out.push(`<p>${formatInline(trimmed)}</p>`);
    i++;
  }

  return out.join('\n');
}

function getExportThemeCSS(theme) {
  if (theme === 'github') {
    return `body{background:#fff;color:#24292f;font-family:-apple-system,Segoe UI,sans-serif;margin:0;padding:40px 20px;display:flex;justify-content:center}.content-wrapper{max-width:760px;width:100%}h1,h2{border-bottom:1px solid #d0d7de;padding-bottom:6px}code{background:#f6f8fa;padding:2px 6px;border-radius:4px;font-family:monospace}pre{background:#f6f8fa;padding:16px;border-radius:8px;overflow:auto}blockquote{border-left:4px solid #d0d7de;padding:0 16px;color:#57606a;margin:16px 0}th,td{border:1px solid #d0d7de;padding:8px 12px;text-align:left}`;
  }
  if (theme === 'notion') {
    return `body{background:#fbfbfa;color:#37352f;font-family:Inter,system-ui,sans-serif;margin:0;padding:48px 20px;display:flex;justify-content:center;line-height:1.65}.content-wrapper{max-width:700px;width:100%}code{background:rgba(135,131,120,0.15);color:#eb5757;padding:2px 6px;border-radius:4px;font-family:monospace}pre{background:#f7f6f3;padding:18px;border-radius:8px;overflow:auto}blockquote{border-left:3px solid #37352f;padding:4px 16px;margin:16px 0}th,td{border:1px solid #e5e5e4;padding:8px 12px;text-align:left}`;
  }
  return `body{background:#0b0c10;color:#d1d5db;font-family:Outfit,system-ui,sans-serif;margin:0;padding:40px 20px;display:flex;justify-content:center;line-height:1.65}.content-wrapper{max-width:740px;width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px}h1,h2,h3,h4{color:#fff}h1{border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px}code{background:rgba(0,240,255,0.1);padding:2px 6px;border-radius:4px;color:#00f0ff;font-family:monospace}pre{background:#06070c;padding:16px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);overflow:auto}blockquote{border-left:3px solid #00f0ff;background:rgba(0,240,255,0.04);padding:10px 18px;margin:16px 0}a{color:#00f0ff}th,td{border:1px solid rgba(255,255,255,0.12);padding:8px 12px;text-align:left}th{background:rgba(255,255,255,0.05);color:#fff}`;
}

function processCompile() {
  const mdText = document.getElementById('inp-markdown').value;
  const includeWatermark = document.getElementById('chk-watermark').checked || !checkIsPremium();

  const words = (mdText.trim() ? mdText.trim().split(/\s+/).length : 0);
  const mins = Math.max(1, Math.ceil(words / 200));
  const fr = (localStorage.getItem('hub_lang') || 'fr') === 'fr';
  const wcEl = document.getElementById('md-word-count');
  const rtEl = document.getElementById('md-read-time');
  if (wcEl) wcEl.textContent = `${words} ${fr ? 'mots' : 'words'}`;
  if (rtEl) rtEl.textContent = `${mins} min ${fr ? 'lecture' : 'read'}`;

  const compiledHtml = parseMarkdown(mdText);
  document.getElementById('preview-container-box').innerHTML = compiledHtml;

  const wm = (window.HubUtils && window.HubUtils.getWatermarkCode) ? window.HubUtils.getWatermarkCode('Markdown HTML by IA Code Studio') : '';
  document.getElementById('output-code').value = `${compiledHtml.trim()}${includeWatermark ? '\n\n' + wm : ''}`;
}

if (typeof window !== 'undefined') {
  window._mdParser = { parseMarkdown };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('inp-markdown');
    if (!inp) return;
    inp.value = defaultMarkdownInput;
    processCompile();

    let timer;
    inp.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(processCompile, 160);
    });
    document.getElementById('btn-compile').addEventListener('click', processCompile);
    document.getElementById('chk-watermark').addEventListener('change', processCompile);
    window.addEventListener('langChanged', processCompile);

    document.getElementById('btn-copy-code').addEventListener('click', () => {
      const lang = localStorage.getItem('hub_lang') || 'fr';
      const msg = (translations[lang] && translations[lang].success_copy) || 'Copied!';
      if (window.HubUtils) window.HubUtils.copyText(document.getElementById('output-code').value, msg);
    });

    document.getElementById('btn-download-html').addEventListener('click', () => {
      const code = document.getElementById('output-code').value;
      const theme = document.getElementById('md-export-theme')?.value || 'cyber';
      const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1.0">\n  <title>Compiled Markdown — IA Code Studio</title>\n  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">\n  <style>${getExportThemeCSS(theme)}</style>\n</head>\n<body>\n  <div class="content-wrapper">\n${code}\n  </div>\n</body>\n</html>`;
      if (window.HubUtils) window.HubUtils.safeDownloadText(html, 'compiled-markdown.html');
    });
  });
}
