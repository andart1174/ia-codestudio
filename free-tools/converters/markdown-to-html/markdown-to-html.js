// Markdown to HTML compiler script

const watermarkCode = `
  <!-- IA Code Studio Embed Watermark (Remove by upgrading to Premium) -->
  <div id="ia-code-watermark" style="position:fixed;bottom:15px;right:15px;z-index:999999;background:rgba(15,17,26,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,240,255,0.25);border-radius:30px;padding:8px 16px;box-shadow:0 4px 15px rgba(0,240,255,0.15);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:all 0.3s ease;user-select:none;" onclick="window.open('https://ia-codestudio.com','_blank')">
    <span style="color:#00f0ff;animation:pulse-glow 1.5s infinite alternate;">⚡</span>
    <span style="color:#fff;letter-spacing:0.5px;">3D Widget by <span style="background:linear-gradient(135deg,#00f0ff,#ff007f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">IA Code Studio</span></span>
  </div>
  <style>
    @keyframes pulse-glow {
      0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
      100% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(0,240,255,0.8)); }
    }
    #ia-code-watermark:hover {
      transform: translateY(-2px);
      border-color: #00f0ff;
      box-shadow: 0 6px 20px rgba(0,240,255,0.3);
    }
  </style>
`;

const defaultMarkdownInput = `# Pro Web Development Notes

Here is how you can use **IA Code Studio** to boost your design workflow:

* Select a pre-built 3D template in the sandbox
* Customize colors, depth, and spin variables
* Copy and embed the clean HTML5 output in 1-click

> "This is the easiest way to add immersive Three.js widgets directly to any landing page."

Feel free to write \`inline code blocks\` or check links: [IA Code Studio Home](https://ia-codestudio.com).`;

function parseMarkdown(md) {
  let html = md;

  // 1. Headers
  html = html.replace(/^\s*# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^\s*## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^\s*### (.*?)$/gm, '<h3>$1</h3>');

  // 2. Blockquotes
  html = html.replace(/^\s*>\s*(.*?)$/gm, '<blockquote>$1</blockquote>');

  // 3. Horizontal Rules
  html = html.replace(/^\s*---\s*$/gm, '<hr>');

  // 4. Codeblocks (fenced)
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // 5. Inline Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 6. Bold & Italics
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // 7. Images
  html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:8px;">');

  // 8. Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // 9. Lists (Unordered)
  // Match consecutive lines starting with * or - and wrap them in <ul>
  html = html.replace(/^\s*[\-\*]\s+(.*?)$/gm, '<li>$1</li>');
  // Simple regex to group adjacent <li> tags into a single <ul> block
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
  
  // Clear duplicate nested <ul> tags from greedy replacements
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // 10. Paragraphs (wrap remaining lines not inside other HTML tags in <p>)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    // If line starts with a block HTML tag, leave it alone
    if (/^<(h1|h2|h3|blockquote|li|ul|ol|pre|code|hr|img|a)/i.test(trimmed)) {
      return line;
    }
    return `<p>${line}</p>`;
  });

  return processedLines.filter(l => l !== '').join('\n');
}

function processCompile() {
  const mdText = document.getElementById('inp-markdown').value;
  const includeWatermark = document.getElementById('chk-watermark').checked;

  if (!mdText.trim()) return;

  const compiledHtml = parseMarkdown(mdText);

  // Update Live Preview Container
  document.getElementById('preview-container-box').innerHTML = compiledHtml;

  // Update Output Text Area
  const finalEmbedCode = `${compiledHtml.trim()}${includeWatermark ? '\n' + watermarkCode.trim() : ''}`;
  document.getElementById('output-code').value = finalEmbedCode;
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind events
  document.getElementById('btn-compile').addEventListener('click', processCompile);
  document.getElementById('chk-watermark').addEventListener('change', processCompile);

  // Load defaults
  document.getElementById('inp-markdown').value = defaultMarkdownInput;
  processCompile();

  // Watch for language switcher
  window.addEventListener('langChanged', () => {
    const activeLang = localStorage.getItem('hub_lang') || 'fr';
    // If default text is unmodified, we load default localized texts
    document.getElementById('inp-markdown').placeholder = translations[activeLang].md2h_input_placeholder;
    processCompile();
  });

  // Copy code action
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    navigator.clipboard.writeText(code).then(() => {
      const activeLang = localStorage.getItem('hub_lang') || 'fr';
      const msg = translations[activeLang].success_copy || 'Code copié avec succès !';
      alert(msg);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Download standalone HTML action
  document.getElementById('btn-download-html').addEventListener('click', () => {
    const code = document.getElementById('output-code').value;
    const compiledCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compiled Markdown Page — IA Code Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #0b0c10;
      color: #d1d5db;
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .content-wrapper {
      max-width: 700px;
      width: 100%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    h1, h2, h3 { color: #fff; font-weight: 700; }
    h1 { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; }
    blockquote {
      border-left: 3px solid #00f0ff;
      background: rgba(255, 255, 255, 0.01);
      padding: 10px 20px;
      margin: 20px 0;
      font-style: italic;
    }
    code {
      background: rgba(255, 255, 255, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
      color: #00f0ff;
      font-family: monospace;
    }
    a { color: #00f0ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="content-wrapper">
    ${code.replace(/\n/g, '\n    ')}
  </div>
</body>
</html>`;
    const blob = new Blob([compiledCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'compiled-markdown.html');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
