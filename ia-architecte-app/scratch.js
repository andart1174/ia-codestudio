const fs = require('fs');
let content = fs.readFileSync('js/premium-studios.js', 'utf8');

const startIdx = content.indexOf('    <div id="res" class="grid">');
const endIdx = content.indexOf('// =======================\r\n// DATA: Motion FX');

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found!');
  process.exit(1);
}

const newContent = `    <div id="res" class="grid"><div style="text-align:center;grid-column:1/-1;color:#64748b;">Powered by Jikan API (MyAnimeList)</div></div>
  </div>
  <script>
    async function find() {
      const q = document.getElementById('q').value;
      const res = document.getElementById('res');
      if(!q) return;
      res.innerHTML = '<div style="grid-column:1/-1;text-align:center;">Searching database...</div>';
      try {
        const r = await fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(q) + '&limit=4');
        if(!r.ok) throw new Error('API Error or Rate limit.');
        const data = await r.json();
        if(data.data.length === 0) throw new Error('No anime found.');
        res.innerHTML = data.data.map(a => 
          '<div class="card"><img src="' + a.images.jpg.image_url + '" class="img"><div class="info"><div class="title">' + a.title + '</div><div class="meta"><span class="score">★ ' + (a.score || 'N/A') + '</span><span>' + (a.episodes ? a.episodes + ' eps' : '? eps') + '</span></div></div></div>'
        ).join('');
      } catch(e) { res.innerHTML = '<div style="grid-column:1/-1;color:#ef4444;text-align:center;">' + e.message + '</div>'; }
    }
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🦊', name: 'Fox Explorer', desc: 'Fetches random cute fox pictures.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fox API</title>
  <style>
    body{background:#f97316;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .card{background:white;padding:20px;border-radius:16px;box-shadow:0 10px 20px rgba(0,0,0,0.2);text-align:center;width:300px;}
    img{width:100%;border-radius:10px;height:250px;object-fit:cover;margin-bottom:15px;}
    button{background:#c2410c;color:white;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <h2>🦊 Random Fox</h2>
    <img id="img" src="" alt="Fox">
    <button onclick="getFox()">More Foxes!</button>
  </div>
  <script>
    async function getFox(){
      try{
        const res=await fetch('https://randomfox.ca/floof/');
        const data=await res.json();
        document.getElementById('img').src=data.image;
      }catch(e){}
    }
    getFox();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🎱', name: 'Magic 8 Ball (Yes/No)', desc: 'Ask a question, get an animated GIF answer.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Yes/No API</title>
  <style>
    body{background:#111;color:white;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .box{background:#222;padding:30px;border-radius:20px;text-align:center;width:320px;box-shadow:0 0 30px rgba(255,255,255,0.1);}
    h2{margin-top:0;text-transform:uppercase;}
    img{width:100%;border-radius:10px;margin-bottom:20px;height:200px;object-fit:cover;}
    button{background:#3b82f6;color:white;border:none;padding:15px;border-radius:10px;width:100%;font-weight:bold;cursor:pointer;font-size:16px;}
  </style>
</head>
<body>
  <div class="box">
    <h2 id="ans">Thinking...</h2>
    <img id="img" src="">
    <button onclick="ask()">Ask The Oracle</button>
  </div>
  <script>
    async function ask(){
      try{
        const res=await fetch('https://yesno.wtf/api');
        const data=await res.json();
        document.getElementById('ans').innerText=data.answer;
        document.getElementById('img').src=data.image;
      }catch(e){}
    }
    ask();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🔮', name: 'Age Predictor', desc: 'Predicts someone\\'s age based on their name.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Agify API</title>
  <style>
    body{background:#e0e7ff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .card{background:white;padding:30px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);width:300px;text-align:center;}
    h1{color:#4338ca;margin-top:0;font-size:48px;margin-bottom:10px;}
    p{color:#6b7280;margin-bottom:20px;}
    input{width:100%;padding:12px;border:2px solid #c7d2fe;border-radius:8px;margin-bottom:10px;box-sizing:border-box;text-align:center;font-size:16px;outline:none;}
    button{background:#4f46e5;color:white;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <h1 id="age">?</h1>
    <p id="desc">Enter a name to predict age</p>
    <input type="text" id="name" value="Michael">
    <button onclick="predict()">Predict Age</button>
  </div>
  <script>
    async function predict(){
      const name=document.getElementById('name').value;
      if(!name)return;
      try{
        const res=await fetch('https://api.agify.io?name='+name);
        const data=await res.json();
        document.getElementById('age').innerText=data.age||'?';
        document.getElementById('desc').innerText='Based on '+data.count+' names';
      }catch(e){}
    }
    predict();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🎤', name: 'Kanye Wisdom', desc: 'Random quotes from Kanye West.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kanye REST</title>
  <style>
    body{background:#000;color:white;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:serif;text-align:center;padding:20px;}
    .quote{font-size:32px;font-style:italic;max-width:600px;line-height:1.5;margin-bottom:40px;}
    button{background:transparent;color:#fff;border:2px solid #fff;padding:15px 30px;font-size:16px;cursor:pointer;text-transform:uppercase;letter-spacing:2px;}
    button:hover{background:#fff;color:#000;}
  </style>
</head>
<body>
  <div>
    <div class="quote" id="q">"..."</div>
    <button onclick="getQ()">More Wisdom</button>
  </div>
  <script>
    async function getQ(){
      try{
        const res=await fetch('https://api.kanye.rest/');
        const data=await res.json();
        document.getElementById('q').innerText='\"'+data.quote+'\"';
      }catch(e){}
    }
    getQ();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🤖', name: 'RoboHash Avatar', desc: 'Generates unique robot avatars from text.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RoboHash</title>
  <style>
    body{background:#0f172a;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .box{background:#1e293b;padding:30px;border-radius:20px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.5);width:320px;border:1px solid #334155;}
    img{width:200px;height:200px;background:#334155;border-radius:50%;margin-bottom:20px;border:5px solid #38bdf8;}
    input{width:100%;padding:12px;border:none;border-radius:8px;background:#0f172a;color:white;margin-bottom:15px;box-sizing:border-box;text-align:center;font-size:16px;outline:none;}
    button{background:#38bdf8;color:#0f172a;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;font-size:16px;}
  </style>
</head>
<body>
  <div class="box">
    <img id="bot" src="https://robohash.org/hello">
    <input type="text" id="txt" value="hello">
    <button onclick="gen()">Generate Robot</button>
  </div>
  <script>
    function gen(){
      const txt=document.getElementById('txt').value;
      if(txt) document.getElementById('bot').src='https://robohash.org/'+encodeURIComponent(txt);
    }
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🤡', name: 'Jokes API', desc: 'Random jokes with setup and punchline.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Jokes</title>
  <style>
    body{background:#ec4899;color:white;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;padding:20px;}
    .card{background:#be185d;padding:40px;border-radius:20px;max-width:400px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);}
    .setup{font-size:24px;font-weight:bold;margin-bottom:20px;line-height:1.4;}
    .punch{font-size:20px;color:#fbcfe8;font-style:italic;margin-bottom:30px;min-height:30px;}
    button{background:white;color:#be185d;border:none;padding:15px 30px;border-radius:30px;font-weight:bold;font-size:16px;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <div class="setup" id="set">Loading...</div>
    <div class="punch" id="punch"></div>
    <button onclick="getJoke()">Tell me another</button>
  </div>
  <script>
    async function getJoke(){
      document.getElementById('set').innerText='Thinking...';
      document.getElementById('punch').innerText='';
      try{
        const res=await fetch('https://official-joke-api.appspot.com/random_joke');
        const data=await res.json();
        document.getElementById('set').innerText=data.setup;
        setTimeout(()=>{document.getElementById('punch').innerText=data.punchline;}, 2000);
      }catch(e){}
    }
    getJoke();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🛒', name: 'Fake Store DB', desc: 'Fetches random products for e-commerce UI testing.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fake Store</title>
  <style>
    body{background:#f3f4f6;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .card{background:white;padding:20px;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.1);width:300px;text-align:center;}
    img{width:150px;height:150px;object-fit:contain;margin-bottom:20px;}
    .title{font-weight:bold;color:#111827;font-size:16px;margin-bottom:10px;height:40px;overflow:hidden;}
    .price{font-size:24px;color:#059669;font-weight:900;margin-bottom:20px;}
    button{background:#111827;color:white;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <img id="img" src="">
    <div class="title" id="title">Loading product...</div>
    <div class="price" id="price">...</div>
    <button onclick="getItem()">Next Product</button>
  </div>
  <script>
    async function getItem(){
      try{
        const id=Math.floor(Math.random()*20)+1;
        const res=await fetch('https://fakestoreapi.com/products/'+id);
        const data=await res.json();
        document.getElementById('img').src=data.image;
        document.getElementById('title').innerText=data.title;
        document.getElementById('price').innerText='$'+data.price;
      }catch(e){}
    }
    getItem();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🐕', name: 'Dog Facts', desc: 'Random facts about dogs.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dog Facts</title>
  <style>
    body{background:#fef08a;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;padding:20px;}
    .card{background:white;padding:40px;border-radius:24px;text-align:center;box-shadow:0 20px 40px rgba(161,98,7,0.2);max-width:400px;border:4px solid #ca8a04;}
    .icon{font-size:60px;margin-bottom:20px;}
    .fact{font-size:18px;color:#854d0e;line-height:1.5;margin-bottom:30px;font-weight:bold;min-height:80px;}
    button{background:#ca8a04;color:white;border:none;padding:12px 30px;border-radius:30px;font-size:16px;font-weight:bold;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🐶</div>
    <div class="fact" id="fact">Fetching data...</div>
    <button onclick="getFact()">Woof!</button>
  </div>
  <script>
    async function getFact(){
      try{
        const res=await fetch('https://dog-api.kinduff.com/api/facts');
        const data=await res.json();
        document.getElementById('fact').innerText=data.facts[0];
      }catch(e){}
    }
    getFact();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '⚔️', name: 'Star Wars Codex', desc: 'Random characters from the Star Wars universe.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SWAPI</title>
  <style>
    body{background:#000;color:#ffe81f;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .card{border:2px solid #ffe81f;padding:30px;border-radius:15px;text-align:center;width:300px;}
    h2{margin-top:0;text-transform:uppercase;letter-spacing:2px;font-size:28px;}
    .info{text-align:left;color:#fff;margin-bottom:20px;font-size:16px;line-height:1.8;}
    .val{color:#ffe81f;font-weight:bold;float:right;}
    button{background:#ffe81f;color:#000;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;text-transform:uppercase;}
  </style>
</head>
<body>
  <div class="card">
    <h2 id="name">Searching...</h2>
    <div class="info">
      <div>Height: <span class="val" id="h"></span></div>
      <div>Mass: <span class="val" id="m"></span></div>
      <div>Hair: <span class="val" id="hc"></span></div>
    </div>
    <button onclick="getChar()">Next Character</button>
  </div>
  <script>
    async function getChar(){
      try{
        const id=Math.floor(Math.random()*82)+1;
        const res=await fetch('https://swapi.dev/api/people/'+id+'/');
        const data=await res.json();
        document.getElementById('name').innerText=data.name;
        document.getElementById('h').innerText=data.height;
        document.getElementById('m').innerText=data.mass;
        document.getElementById('hc').innerText=data.hair_color;
      }catch(e){}
    }
    getChar();
  <\\/script>
</body>
</html>\`
  },
  {
    icon: '🚻', name: 'Genderize API', desc: 'Predict gender based on a given name.',
    code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Genderize API</title>
  <style>
    body{background:#fdf2f8;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;}
    .card{background:white;padding:30px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);width:300px;text-align:center;}
    h1{font-size:60px;margin:0 0 10px;}
    p{color:#64748b;margin-bottom:20px;font-weight:bold;}
    input{width:100%;padding:12px;border:2px solid #e2e8f0;border-radius:8px;margin-bottom:10px;box-sizing:border-box;text-align:center;font-size:16px;outline:none;}
    button{background:#14b8a6;color:white;border:none;padding:12px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;}
  </style>
</head>
<body>
  <div class="card">
    <h1 id="sym">?</h1>
    <p id="desc">Enter a name</p>
    <input type="text" id="name" value="Alex">
    <button onclick="predict()">Analyze Name</button>
  </div>
  <script>
    async function predict(){
      const name=document.getElementById('name').value;
      if(!name)return;
      try{
        const res=await fetch('https://api.genderize.io?name='+name);
        const data=await res.json();
        const g = data.gender;
        document.getElementById('sym').innerText = g==='male'?'👨':g==='female'?'👩':'❓';
        document.getElementById('desc').innerText = g ? g.toUpperCase() + ' (' + Math.round(data.probability*100) + '%)' : 'Unknown';
      }catch(e){}
    }
    predict();
  <\\/script>
</body>
</html>\`
  }
];

`;

const res = content.substring(0, startIdx) + newContent + content.substring(endIdx);
fs.writeFileSync('js/premium-studios.js', res);
console.log('Fixed premium-studios.js');
