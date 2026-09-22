const gameCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; }
    #pong { background: #000; border: 2px solid #10b981; border-radius: 10px; box-shadow: 0 0 40px rgba(16,185,129,0.25); }
    .score-board { display: flex; gap: 80px; font-size: 48px; font-weight: 900; color: #10b981; margin-bottom: 20px; }
    .hint { margin-top: 20px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="score-board">
    <div id="p1-score">0</div>
    <div id="p2-score">0</div>
  </div>
  <canvas id="pong" width="600" height="400"></canvas>
  <div class="hint">Move Cursor to Control your Paddle</div>
  <script></script>
</body>
</html>`;

let newBody = gameCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];
newBody = newBody.replace(/<script[\s\S]*?<\/script>/gi, '').trim();

const uid = 'ia1234';
newBody = newBody.replace(/id=(['"])(.*?)\1/gi, `id="$1${uid}-$2$1"`);
console.log('TRANSFORMED BODY:', newBody);

const styleMatch = gameCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
let newStyle = styleMatch ? styleMatch[1].trim() : '';

if(newStyle) {
  newStyle = newStyle
    .replace(/#([a-zA-Z0-9_-]+)(?=[^{}]*{)/g, `#${uid}-$1`)
    .replace(/([^\r\n,{}]+)(?=[^{}]*{)/g, (m) => {
      if(m.includes('@') || m.includes('from') || m.includes('to') || m.includes('%')) return m;
      return `#${uid} ` + m.trim().replace(/\s+/g, ' ');
    });
}
console.log('TRANSFORMED STYLE:', newStyle);
