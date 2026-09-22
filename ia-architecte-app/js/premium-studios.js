'use strict';

(function() {

// =======================
// DATA: UI Blocks
// =======================
const UI_BLOCKS = [
  {
    icon: '🪟', name: 'Glassmorphism Hero', desc: 'Modern hero section with glass UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Glassmorphism Hero</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:sans-serif; }
    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #f43f5e, #8b5cf6, #3b82f6);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 60px;
      text-align: center;
      color: white;
      max-width: 600px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    h1 { font-size: 3rem; margin-bottom: 20px; }
    p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; line-height: 1.5; }
    button {
      padding: 15px 30px;
      border: none;
      border-radius: 30px;
      background: white;
      color: #8b5cf6;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="glass-card">
    <h1>Future is Here</h1>
    <p>Build stunning user interfaces instantly with perfectly generated glassmorphism components.</p>
    <button>Get Started</button>
  </div>
</body>
</html>`
  },
  {
    icon: '🏷️', name: 'Pricing Table', desc: 'Sleek, converting pricing cards.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pricing Table</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:sans-serif; }
    body { background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
    .grid { display: flex; gap: 30px; }
    .card { background: white; padding: 40px; border-radius: 20px; width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; }
    .card.pro { border: 2px solid #3b82f6; transform: scale(1.05); position: relative; }
    .badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
    h3 { font-size: 1.5rem; color: #1e293b; margin-bottom: 10px; }
    .price { font-size: 3rem; font-weight: bold; color: #1e293b; margin-bottom: 30px; }
    .price span { font-size: 1rem; color: #64748b; }
    ul { list-style: none; margin-bottom: 30px; text-align: left; }
    li { margin-bottom: 15px; color: #475569; }
    button { padding: 12px; width: 100%; border-radius: 10px; border: none; font-weight: bold; cursor: pointer; }
    .btn-outline { background: #f1f5f9; color: #1e293b; }
    .btn-solid { background: #3b82f6; color: white; }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <h3>Basic</h3>
      <div class="price">$9<span>/mo</span></div>
      <ul><li>✅ 1 Project</li><li>✅ Basic Support</li><li>❌ Custom Domain</li></ul>
      <button class="btn-outline">Choose Basic</button>
    </div>
    <div class="card pro">
      <div class="badge">MOST POPULAR</div>
      <h3>Pro</h3>
      <div class="price">$29<span>/mo</span></div>
      <ul><li>✅ Unlimited Projects</li><li>✅ Priority Support</li><li>✅ Custom Domain</li></ul>
      <button class="btn-solid">Choose Pro</button>
    </div>
  </div>
</body>
</html>`
  }
];

// =======================
// DATA: API Hub
// =======================
const API_HUB = [
  {
    icon: '₿', name: 'Live Crypto Price', desc: 'Fetches real-time Bitcoin price.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Crypto</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #1e293b; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .widget { background: #0f172a; padding: 40px; border-radius: 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid #334155; }
    .title { font-size: 1.2rem; color: #94a3b8; margin-bottom: 10px; }
    .price { font-size: 4rem; font-weight: bold; color: #10b981; }
    .loader { margin-top: 20px; font-size: 0.9rem; color: #64748b; }
  </style>
</head>
<body>
  <div class="widget">
    <div class="title">Bitcoin (BTC) Live Price</div>
    <div class="price" id="price">Fetching...</div>
    <div class="loader" id="time">Last updated: -</div>
  </div>

  <script>
    async function fetchPrice() {
      try {
        // Using Binance Public API
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await res.json();
        
        const priceNum = parseFloat(data.price);
        document.getElementById('price').innerText = '$' + priceNum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        
        const now = new Date();
        document.getElementById('time').innerText = 'Last updated: ' + now.toLocaleTimeString();
      } catch (err) {
        document.getElementById('price').innerText = 'Error';
        console.error(err);
      }
    }
    
    // Fetch immediately and then every 3 seconds
    fetchPrice();
    setInterval(fetchPrice, 3000);
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌤️', name: 'Live Weather', desc: 'Fetches weather using OpenMeteo API.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Weather</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #e0f2fe; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .card { background: white; padding: 40px; border-radius: 30px; box-shadow: 0 20px 50px rgba(2,132,199,0.1); text-align: center; width: 300px; }
    h2 { color: #0284c7; margin-bottom: 5px; }
    .temp { font-size: 4rem; font-weight: bold; color: #0f172a; margin: 20px 0; }
    .desc { color: #64748b; font-size: 1.1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h2>London, UK</h2>
    <div class="desc" id="status">Loading data...</div>
    <div class="temp" id="temp">--°C</div>
    <div class="desc" id="wind">Wind: -- km/h</div>
  </div>

  <script>
    async function getWeather() {
      try {
        // OpenMeteo API (No Key Required) - London coordinates
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true');
        const data = await res.json();
        
        const w = data.current_weather;
        document.getElementById('status').innerText = 'Current Weather';
        document.getElementById('temp').innerText = w.temperature + '°C';
        document.getElementById('wind').innerText = 'Wind: ' + w.windspeed + ' km/h';
      } catch (e) {
        document.getElementById('status').innerText = 'Failed to load';
      }
    }
    getWeather();
  <\/script>
</body>
</html>`
  },
  {
    icon: '👤', name: 'Fake Identity', desc: 'Generates a random human profile.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random User</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: #1e293b; border-radius: 20px; padding: 30px; text-align: center; width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #3b82f6; margin-bottom: 20px; object-fit: cover; }
    h2 { margin: 0 0 5px; color: #e2e8f0; }
    p { color: #94a3b8; margin: 0 0 20px; }
    button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-weight: bold; width: 100%; transition: 0.2s; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="card">
    <img id="avatar" src="https://via.placeholder.com/120/1e293b/1e293b" alt="Avatar">
    <h2 id="name">Loading...</h2>
    <p id="email">Please wait</p>
    <button onclick="fetchUser()">Generate New Profile</button>
  </div>
  <script>
    async function fetchUser() {
      document.getElementById('name').innerText = 'Loading...';
      try {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const user = data.results[0];
        document.getElementById('avatar').src = user.picture.large;
        document.getElementById('name').innerText = user.name.first + ' ' + user.name.last;
        document.getElementById('email').innerText = user.email;
      } catch(e) {
        document.getElementById('name').innerText = 'Error';
      }
    }
    fetchUser();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🤠', name: 'Joke Machine', desc: 'Fetches random Chuck Norris jokes.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Joke Machine</title>
  <style>
    body { background: #f59e0b; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; padding: 20px; }
    .box { background: white; border-radius: 20px; padding: 40px; text-align: center; max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    h1 { font-size: 40px; margin-bottom: 20px; }
    p { font-size: 20px; color: #334155; line-height: 1.6; margin-bottom: 30px; font-weight: 500; min-height: 100px; display: flex; align-items: center; justify-content: center; }
    button { background: #1e293b; color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-weight: bold; font-size: 16px; transition: transform 0.1s; }
    button:active { transform: scale(0.95); }
  </style>
</head>
<body>
  <div class="box">
    <h1>🤠</h1>
    <p id="joke">Loading joke...</p>
    <button onclick="getJoke()">Get Another Joke</button>
  </div>
  <script>
    async function getJoke() {
      const p = document.getElementById('joke');
      p.innerText = 'Thinking...';
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await res.json();
        p.innerText = '"' + data.value + '"';
      } catch(e) {
        p.innerText = 'Failed to load joke.';
      }
    }
    getJoke();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🐶', name: 'Dog Explorer', desc: 'Fetches infinite random dog pictures.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random Dog</title>
  <style>
    body { background: #e2e8f0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; }
    .frame { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .img-container { width: 300px; height: 300px; border-radius: 8px; overflow: hidden; background: #cbd5e1; display: flex; justify-content: center; align-items: center; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    button { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; font-size: 16px; }
  </style>
</head>
<body>
  <div class="frame">
    <div class="img-container">
      <span id="loader">Fetching 🐕...</span>
      <img id="dog-img" src="" alt="Dog" onload="this.style.display='block'; document.getElementById('loader').style.display='none';">
    </div>
    <button onclick="getDog()">Next Dog</button>
  </div>
  <script>
    async function getDog() {
      document.getElementById('dog-img').style.display = 'none';
      document.getElementById('loader').style.display = 'block';
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        document.getElementById('dog-img').src = data.message;
      } catch(e) {
        document.getElementById('loader').innerText = 'Error loading dog';
      }
    }
    getDog();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🕵️‍♂️', name: 'IP Hacker Trace', desc: 'Finds device IP and location.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IP Trace</title>
  <style>
    body { background: #000; color: #0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: monospace; margin: 0; }
    .term { border: 1px solid #0f0; padding: 20px; width: 350px; box-shadow: 0 0 15px rgba(0,255,0,0.2); }
    h3 { margin: 0 0 15px; text-transform: uppercase; border-bottom: 1px dashed #0f0; padding-bottom: 5px; }
    .line { margin-bottom: 10px; font-size: 14px; }
    .val { color: #fff; }
    .blink { animation: blink 1s infinite; }
    @keyframes blink { 50% { opacity: 0; } }
  </style>
</head>
<body>
  <div class="term">
    <h3>System Trace...</h3>
    <div class="line" id="out">Establishing connection<span class="blink">_</span></div>
  </div>
  <script>
    async function trace() {
      const out = document.getElementById('out');
      try {
        const res = await fetch('https://api.github.com/users/torvalds');
        const data = await res.json();
        out.innerHTML = 
          'TARGET ACQUIRED<br>' +
          'Name: <span class="val">' + data.name + '</span><br>' +
          'Location: <span class="val">' + data.location + '</span><br>' +
          'Followers: <span class="val">' + data.followers + '</span><br>' +
          'Public Repos: <span class="val">' + data.public_repos + '</span><br>' +
          'Trace complete.<span class="blink">_</span>';
      } catch(e) {
        out.innerHTML = 'Trace failed.<span class="blink">_</span>';
      }
    }
    setTimeout(trace, 1000);
  <\/script>
</body>
</html>`
  },
  {
    icon: '🚀', name: 'NASA APOD', desc: 'Astronomy Picture of the Day.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NASA Explorer</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; padding: 20px; }
    .card { background: #1e293b; border-radius: 16px; overflow: hidden; width: 100%; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .img-box { width: 100%; height: 250px; background: #000; display: flex; align-items: center; justify-content: center; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    .content { padding: 20px; }
    h2 { margin: 0 0 10px; font-size: 1.2rem; color: #38bdf8; }
    p { margin: 0; font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  </style>
</head>
<body>
  <div class="card">
    <div class="img-box" id="img-box">
      <span id="load">Connecting to NASA...</span>
      <img id="img" src="" alt="Space" onload="this.style.display='block'; document.getElementById('load').style.display='none';">
    </div>
    <div class="content">
      <h2 id="title">Searching database...</h2>
      <p id="desc">Please wait.</p>
    </div>
  </div>
  <script>
    async function getSpace() {
      try {
        // Fetching a specific date (Solar Eclipse 2023) to guarantee a beautiful image
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2023-10-14');
        const data = await res.json();
        if(data.media_type === 'image') {
          document.getElementById('img').src = data.url;
        } else if(data.media_type === 'video') {
          document.getElementById('img-box').innerHTML = '<iframe width="100%" height="100%" src="' + data.url + '" frameborder="0" allowfullscreen></iframe>';
        }
        document.getElementById('title').innerText = data.title;
        document.getElementById('desc').innerText = data.explanation;
      } catch(e) {
        document.getElementById('title').innerText = 'Connection lost.';
      }
    }
    getSpace();
  <\/script>
</body>
</html>`
  },
  {
    icon: '👾', name: 'Pokedex Card', desc: 'Random Pokémon from PokeAPI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pokedex</title>
  <style>
    body { background: #ef4444; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Courier New', monospace; margin: 0; }
    .dex { background: #f8fafc; border: 8px solid #cbd5e1; border-radius: 12px; width: 300px; padding: 20px; text-align: center; box-shadow: 10px 10px 0px rgba(0,0,0,0.2); }
    .screen { background: #cbd5e1; border: 4px solid #475569; border-radius: 8px; height: 150px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    img { width: 120px; height: 120px; display: none; image-rendering: pixelated; }
    h2 { text-transform: uppercase; margin: 0 0 10px; color: #1e293b; font-size: 24px; }
    .stats { background: #1e293b; color: #4ade80; padding: 10px; border-radius: 4px; text-align: left; font-size: 14px; }
    button { margin-top: 15px; width: 100%; padding: 10px; background: #ef4444; color: white; border: 2px solid #7f1d1d; cursor: pointer; font-family: inherit; font-weight: bold; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="dex">
    <div class="screen">
      <span id="load">SCANNING...</span>
      <img id="poke-img" src="" onload="this.style.display='block'; document.getElementById('load').style.display='none';">
    </div>
    <h2 id="name">???</h2>
    <div class="stats" id="stats">NO DATA</div>
    <button onclick="catchPoke()">Catch Another</button>
  </div>
  <script>
    async function catchPoke() {
      document.getElementById('poke-img').style.display = 'none';
      document.getElementById('load').style.display = 'block';
      document.getElementById('name').innerText = '???';
      document.getElementById('stats').innerText = 'NO DATA';
      try {
        const id = Math.floor(Math.random() * 151) + 1; // Gen 1
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
        const data = await res.json();
        document.getElementById('poke-img').src = data.sprites.front_default;
        document.getElementById('name').innerText = data.name;
        document.getElementById('stats').innerHTML = 
          'TYPE: ' + data.types[0].type.name.toUpperCase() + '<br>' +
          'HP:   ' + data.stats[0].base_stat + '<br>' +
          'ATK:  ' + data.stats[1].base_stat;
      } catch(e) {}
    }
    catchPoke();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🧠', name: 'Live Trivia', desc: 'Real-time quiz from OpenTDB.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trivia Live</title>
  <style>
    body { background: #4f46e5; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: white; color: #1e293b; padding: 30px; border-radius: 20px; width: 320px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .badge { background: #f43f5e; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
    h3 { font-size: 18px; margin-bottom: 30px; line-height: 1.4; }
    .btn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    button { padding: 15px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; color: white; transition: 0.2s; }
    .btn-t { background: #10b981; } .btn-f { background: #ef4444; }
    .btn-next { background: #3b82f6; width: 100%; margin-top: 15px; display: none; grid-column: 1 / -1; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge" id="cat">Loading...</div>
    <h3 id="question">Fetching question from database...</h3>
    <div class="btn-grid">
      <button class="btn-t" onclick="answer('True')">True</button>
      <button class="btn-f" onclick="answer('False')">False</button>
      <button class="btn-next" id="next" onclick="getQ()">Next Question</button>
    </div>
  </div>
  <script>
    let correct = '';
    async function getQ() {
      document.getElementById('next').style.display = 'none';
      document.getElementById('question').innerText = 'Fetching...';
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
        const data = await res.json();
        const q = data.results[0];
        document.getElementById('cat').innerText = q.category;
        // Basic HTML decode
        const txt = document.createElement('textarea');
        txt.innerHTML = q.question;
        document.getElementById('question').innerText = txt.value;
        correct = q.correct_answer;
      } catch(e) { document.getElementById('question').innerText = 'Error loading.'; }
    }
    function answer(ans) {
      if(!correct) return;
      if(ans === correct) document.getElementById('question').innerText = '✅ Correct!';
      else document.getElementById('question').innerText = '❌ Wrong! It was ' + correct + '.';
      correct = '';
      document.getElementById('next').style.display = 'block';
    }
    getQ();
  <\/script>
</body>
</html>`
  },
  {
    icon: '💡', name: 'Advice Oracle', desc: 'Random life advice generator.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Advice Oracle</title>
  <style>
    body { background: #1e293b; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: #334155; padding: 40px; border-radius: 16px; width: 350px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; }
    .id { color: #10b981; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px; }
    .text { color: #e2e8f0; font-size: 24px; font-weight: bold; line-height: 1.4; margin-bottom: 30px; }
    .dice { background: #10b981; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); box-shadow: 0 0 20px rgba(16,185,129,0.5); transition: 0.3s; font-size: 24px; }
    .dice:hover { box-shadow: 0 0 30px rgba(16,185,129,0.8); transform: translateX(-50%) rotate(180deg); }
  </style>
</head>
<body>
  <div class="card">
    <div class="id" id="aid">ADVICE #---</div>
    <div class="text" id="advice">"Seeking the oracle..."</div>
    <div class="dice" onclick="getAdvice()">🎲</div>
  </div>
  <script>
    async function getAdvice() {
      const adv = document.getElementById('advice');
      adv.innerText = '...';
      try {
        const res = await fetch('https://api.adviceslip.com/advice?' + new Date().getTime());
        const data = await res.json();
        document.getElementById('aid').innerText = 'ADVICE #' + data.slip.id;
        adv.innerText = '"' + data.slip.advice + '"';
      } catch(e) { adv.innerText = '"Connection failed."'; }
    }
    getAdvice();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🍔', name: 'Random Recipe', desc: 'Fetches delicious meals from TheMealDB.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random Meal</title>
  <style>
    body { background: #fffbeb; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .recipe-card { background: white; border-radius: 20px; overflow: hidden; width: 320px; box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
    .img-box { width: 100%; height: 220px; background: #fcd34d; display: flex; align-items: center; justify-content: center; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    .info { padding: 20px; text-align: center; }
    h2 { margin: 0 0 10px; color: #b45309; font-size: 22px; }
    .tag { background: #fef3c7; color: #d97706; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
    button { background: #f59e0b; color: white; border: none; padding: 12px 24px; border-radius: 30px; font-weight: bold; cursor: pointer; width: 100%; font-size: 16px; transition: 0.2s; }
    button:hover { background: #d97706; }
  </style>
</head>
<body>
  <div class="recipe-card">
    <div class="img-box" id="loader">Cooking...</div>
    <img id="meal-img" src="" onload="this.style.display='block'; document.getElementById('loader').style.display='none';">
    <div class="info">
      <h2 id="meal-name">Searching kitchen...</h2>
      <div class="tag" id="meal-area">Category</div>
      <button onclick="getMeal()">Find Another Meal</button>
    </div>
  </div>
  <script>
    async function getMeal() {
      document.getElementById('meal-img').style.display = 'none';
      document.getElementById('loader').style.display = 'flex';
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await res.json();
        const meal = data.meals[0];
        document.getElementById('meal-img').src = meal.strMealThumb;
        document.getElementById('meal-name').innerText = meal.strMeal;
        document.getElementById('meal-area').innerText = meal.strArea + ' / ' + meal.strCategory;
      } catch(e) {}
    }
    getMeal();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🍸', name: 'Mixology Pro', desc: 'Random cocktail generator.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cocktail Generator</title>
  <style>
    body { background: #18181b; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .glass { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; width: 300px; text-align: center; backdrop-filter: blur(10px); }
    .pic { width: 200px; height: 200px; border-radius: 50%; border: 4px solid #f472b6; margin: 0 auto 20px; overflow: hidden; background: #27272a; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    h2 { color: #fdf2f8; margin: 0 0 5px; }
    p { color: #f472b6; font-size: 14px; margin: 0 0 20px; font-weight: bold; }
    button { background: transparent; color: #f472b6; border: 2px solid #f472b6; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    button:hover { background: #f472b6; color: #18181b; }
  </style>
</head>
<body>
  <div class="glass">
    <div class="pic">
      <img id="drink-img" src="" onload="this.style.display='block'">
    </div>
    <h2 id="drink-name">Mixing...</h2>
    <p id="drink-type">Glass Type</p>
    <button onclick="getDrink()">Mix Another</button>
  </div>
  <script>
    async function getDrink() {
      document.getElementById('drink-img').style.display = 'none';
      try {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await res.json();
        const drink = data.drinks[0];
        document.getElementById('drink-img').src = drink.strDrinkThumb;
        document.getElementById('drink-name').innerText = drink.strDrink;
        document.getElementById('drink-type').innerText = drink.strGlass;
      } catch(e) {}
    }
    getDrink();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌀', name: 'R&M Portal', desc: 'Fetches Rick & Morty characters.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>R&M Portal</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Courier New', monospace; margin: 0; }
    .portal { background: #1e293b; border: 4px solid #84cc16; border-radius: 20px; width: 320px; overflow: hidden; box-shadow: 0 0 30px rgba(132, 204, 22, 0.3); }
    img { width: 100%; display: block; border-bottom: 4px solid #84cc16; }
    .data { padding: 20px; color: white; }
    h2 { margin: 0 0 10px; color: #bef264; }
    .status { display: inline-flex; align-items: center; gap: 5px; background: rgba(0,0,0,0.5); padding: 5px 10px; border-radius: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .alive { background: #84cc16; } .dead { background: #ef4444; } .unknown { background: #94a3b8; }
    button { background: #84cc16; color: #0f172a; border: none; padding: 10px; width: 100%; margin-top: 15px; font-weight: bold; font-family: inherit; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="portal">
    <img id="char-img" src="https://via.placeholder.com/300x300/1e293b/84cc16?text=PORTAL+OPENING">
    <div class="data">
      <h2 id="name">Searching Dimension...</h2>
      <div class="status">
        <div class="dot" id="dot"></div> <span id="status">Status</span>
      </div>
      <button onclick="summon()">Open Portal</button>
    </div>
  </div>
  <script>
    async function summon() {
      try {
        const id = Math.floor(Math.random() * 826) + 1;
        const res = await fetch('https://rickandmortyapi.com/api/character/' + id);
        const data = await res.json();
        document.getElementById('char-img').src = data.image;
        document.getElementById('name').innerText = data.name;
        document.getElementById('status').innerText = data.status + ' - ' + data.species;
        
        const dot = document.getElementById('dot');
        dot.className = 'dot';
        if(data.status === 'Alive') dot.classList.add('alive');
        else if(data.status === 'Dead') dot.classList.add('dead');
        else dot.classList.add('unknown');
      } catch(e) {}
    }
    summon();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌍', name: 'Name Origins', desc: 'Predicts nationality from a name.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Name Origins</title>
  <style>
    body { background: #f0fdf4; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .box { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 10px 25px rgba(22,163,74,0.1); width: 320px; text-align: center; }
    h2 { color: #16a34a; margin: 0 0 20px; }
    input { width: 100%; padding: 12px; border: 2px solid #bbf7d0; border-radius: 8px; font-size: 16px; margin-bottom: 15px; box-sizing: border-box; outline: none; text-align: center; }
    input:focus { border-color: #22c55e; }
    button { background: #22c55e; color: white; border: none; padding: 12px; border-radius: 8px; width: 100%; font-size: 16px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
    .result { display: flex; justify-content: space-between; padding: 10px; background: #f0fdf4; border-radius: 6px; margin-bottom: 8px; font-weight: bold; color: #15803d; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Nationality Predictor</h2>
    <input type="text" id="name" value="Alexander" placeholder="Enter a first name">
    <button onclick="predict()">Predict Origin</button>
    <div id="results"></div>
  </div>
  <script>
    async function predict() {
      const name = document.getElementById('name').value.trim();
      if(!name) return;
      const resDiv = document.getElementById('results');
      resDiv.innerHTML = '<div style="color:#64748b">Analyzing global database...</div>';
      try {
        const res = await fetch('https://api.nationalize.io/?name=' + name);
        const data = await res.json();
        resDiv.innerHTML = '';
        if(data.country.length === 0) { resDiv.innerHTML = 'No data found.'; return; }
        
        data.country.slice(0,3).forEach(c => {
          const perc = Math.round(c.probability * 100) + '%';
          resDiv.innerHTML += '<div class="result"><span>Flag: ' + c.country_id + '</span><span>' + perc + '</span></div>';
        });
      } catch(e) { resDiv.innerHTML = 'Error.'; }
    }
    predict();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🐈', name: 'Cat Facts', desc: 'Random feline trivia.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cat Facts</title>
  <style>
    body { background: #fce7f3; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: white; padding: 40px 30px; border-radius: 24px; box-shadow: 0 20px 40px rgba(244,114,182,0.15); width: 300px; text-align: center; position: relative; }
    .cat-icon { font-size: 60px; margin-bottom: 10px; animation: bounce 2s infinite; display: inline-block; }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    h2 { color: #db2777; margin: 0 0 20px; font-size: 24px; }
    p { color: #475569; font-size: 16px; line-height: 1.6; min-height: 100px; font-weight: 500; }
    button { background: #db2777; color: white; border: none; padding: 12px 25px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 10px 20px rgba(219,39,119,0.3); transition: 0.2s; }
    button:active { transform: scale(0.95); }
  </style>
</head>
<body>
  <div class="card">
    <div class="cat-icon">😸</div>
    <h2>Did you know?</h2>
    <p id="fact">Loading purr-fect fact...</p>
    <button onclick="getFact()">Meow!</button>
  </div>
  <script>
    async function getFact() {
      const p = document.getElementById('fact');
      p.innerText = 'Consulting the cats...';
      try {
        const res = await fetch('https://catfact.ninja/fact');
        const data = await res.json();
        p.innerText = data.fact;
      } catch(e) { p.innerText = 'Cats are asleep.'; }
    }
    getFact();
  <\/script>
</body>
</html>`
  },
  {
    icon: '💱', name: 'Exchange Rates / Taux de Change', desc: 'Live currency rates via open.er-api.com. / Taux de change en direct.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exchange Rates</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
    .widget { background: #1e293b; border-radius: 20px; padding: 30px; width: 340px; border: 1px solid #334155; }
    h2 { text-align: center; color: #38bdf8; margin-bottom: 20px; font-size: 1.3rem; }
    .select-row { display: flex; gap: 10px; margin-bottom: 20px; }
    select { flex: 1; background: #0f172a; color: white; border: 1px solid #334155; padding: 10px; border-radius: 8px; font-size: 15px; }
    button { background: #38bdf8; color: #0f172a; border: none; padding: 10px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
    button:hover { opacity: 0.85; }
    .rate-list { display: flex; flex-direction: column; gap: 8px; }
    .rate-row { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 10px 14px; border-radius: 8px; }
    .cur { color: #94a3b8; font-size: 13px; }
    .val { color: #4ade80; font-weight: bold; font-size: 15px; }
    .flag { font-size: 18px; }
    .status { color: #64748b; text-align: center; font-size: 12px; margin-top: 12px; }
    .spinner { display: inline-block; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="widget">
    <h2>💱 Live Exchange Rates</h2>
    <div class="select-row">
      <select id="base" onchange="getRates()">
        <option value="USD">🇺🇸 USD — Dollar</option>
        <option value="EUR">🇪🇺 EUR — Euro</option>
        <option value="GBP">🇬🇧 GBP — Pound</option>
        <option value="JPY">🇯🇵 JPY — Yen</option>
        <option value="CAD">🇨🇦 CAD — Dollar CA</option>
        <option value="CHF">🇨🇭 CHF — Franc suisse</option>
      </select>
      <button onclick="getRates()">↻</button>
    </div>
    <div class="rate-list" id="rates"></div>
    <div class="status" id="status"><span class="spinner">⏳</span> Chargement / Loading...</div>
  </div>
  <script>
    const PAIRS = [
      { code:'EUR', flag:'🇪🇺' }, { code:'USD', flag:'🇺🇸' },
      { code:'GBP', flag:'🇬🇧' }, { code:'JPY', flag:'🇯🇵' },
      { code:'CAD', flag:'🇨🇦' }, { code:'CHF', flag:'🇨🇭' },
      { code:'AUD', flag:'🇦🇺' }, { code:'CNY', flag:'🇨🇳' }
    ];
    async function getRates() {
      const base = document.getElementById('base').value;
      const status = document.getElementById('status');
      const list = document.getElementById('rates');
      status.innerHTML = '<span class="spinner">⏳</span> Loading...';
      list.innerHTML = '';
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/' + base);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data.result !== 'success') throw new Error('API error');
        PAIRS.filter(p => p.code !== base).forEach(p => {
          const val = data.rates[p.code];
          if (!val) return;
          list.innerHTML += '<div class="rate-row"><span class="flag">' + p.flag + '</span><span class="cur">1 ' + base + ' =</span><span class="val">' + val.toFixed(4) + ' ' + p.code + '</span></div>';
        });
        status.innerText = '✅ Updated ' + new Date().toLocaleTimeString() + ' — open.er-api.com';
      } catch(e) {
        status.innerText = '❌ Error: ' + e.message + ' / Erreur de connexion';
      }
    }
    getRates();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🛰️', name: 'ISS Live Tracker', desc: 'Real-time ISS position from Open Notify. / Position de l\'ISS en temps réel.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ISS Tracker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: monospace; }
    body { background: #020617; color: #a5f3fc; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .panel { background: #0c1445; border: 1px solid #0ea5e9; border-radius: 16px; padding: 30px; width: 340px; box-shadow: 0 0 40px rgba(14,165,233,0.2); text-align: center; }
    h2 { color: #38bdf8; margin-bottom: 5px; font-size: 1.5rem; }
    .sub { color: #64748b; font-size: 13px; margin-bottom: 25px; }
    .iss { font-size: 60px; animation: orbit 4s linear infinite; display: inline-block; margin-bottom: 20px; }
    @keyframes orbit { from { transform: rotate(0deg) translateX(20px) rotate(0deg); } to { transform: rotate(360deg) translateX(20px) rotate(-360deg); } }
    .data-row { display: flex; justify-content: space-between; padding: 10px; background: #020617; border-radius: 8px; margin-bottom: 8px; }
    .label { color: #64748b; font-size: 13px; }
    .value { color: #4ade80; font-weight: bold; }
    .update { color: #475569; font-size: 12px; margin-top: 15px; }
    button { background: #0ea5e9; color: #020617; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 15px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="panel">
    <h2>🛰️ ISS Tracker</h2>
    <div class="sub">International Space Station — Live / En direct</div>
    <div class="iss">🛸</div>
    <div class="data-row"><span class="label">Latitude</span><span class="value" id="lat">--°</span></div>
    <div class="data-row"><span class="label">Longitude</span><span class="value" id="lon">--°</span></div>
    <div class="data-row"><span class="label">Altitude</span><span class="value" id="alt">~408 km</span></div>
    <div class="data-row"><span class="label">Speed / Vitesse</span><span class="value" id="speed">~27,600 km/h</span></div>
    <div class="update" id="ts">Connecting to NASA feed...</div>
    <button onclick="getISS()">Refresh / Actualiser</button>
  </div>
  <script>
    async function getISS() {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const d = await res.json();
        document.getElementById('lat').innerText = parseFloat(d.latitude).toFixed(4) + '°';
        document.getElementById('lon').innerText = parseFloat(d.longitude).toFixed(4) + '°';
        document.getElementById('alt').innerText = parseFloat(d.altitude).toFixed(1) + ' km';
        document.getElementById('speed').innerText = parseFloat(d.velocity).toFixed(0) + ' km/h';
        document.getElementById('ts').innerText = 'Updated: ' + new Date().toLocaleTimeString() + ' | wheretheiss.at API';
      } catch(e) {
        document.getElementById('ts').innerText = 'Connection error / Erreur de connexion';
      }
    }
    getISS();
    setInterval(getISS, 5000);
  <\/script>
</body>
</html>`
  },
  {
    icon: '📖', name: 'Open Library Search', desc: 'Search millions of books via Open Library. / Recherchez des millions de livres.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Open Library</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #1c1917; color: #e7e5e4; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 30px 15px; }
    .app { width: 100%; max-width: 420px; }
    h2 { color: #fbbf24; text-align: center; margin-bottom: 20px; }
    .search-bar { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; background: #292524; border: 1px solid #44403c; color: white; padding: 12px; border-radius: 8px; font-size: 15px; outline: none; }
    input:focus { border-color: #fbbf24; }
    button { background: #fbbf24; color: #1c1917; border: none; padding: 12px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .results { display: flex; flex-direction: column; gap: 12px; }
    .book { background: #292524; border-radius: 12px; padding: 15px; display: flex; gap: 12px; border: 1px solid #44403c; }
    .cover { width: 50px; min-width: 50px; height: 70px; border-radius: 4px; object-fit: cover; background: #1c1917; }
    .book-info { overflow: hidden; }
    .title { color: #fbbf24; font-weight: bold; font-size: 14px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .author { color: #a8a29e; font-size: 13px; margin-bottom: 4px; }
    .year { color: #57534e; font-size: 12px; }
    .status { color: #57534e; text-align: center; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>📖 Open Library</h2>
    <div class="search-bar">
      <input type="text" id="query" placeholder="Search books / Rechercher..." value="Victor Hugo">
      <button onclick="searchBooks()">🔍</button>
    </div>
    <div class="results" id="results"><div class="status">Loading / Chargement...</div></div>
  </div>
  <script>
    async function searchBooks() {
      const q = document.getElementById('query').value.trim();
      if (!q) return;
      const res_div = document.getElementById('results');
      res_div.innerHTML = '<div class="status">Searching / Recherche en cours...</div>';
      try {
        const res = await fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(q) + '&limit=5&fields=title,author_name,first_publish_year,cover_i');
        const data = await res.json();
        if (!data.docs.length) { res_div.innerHTML = '<div class="status">No results / Aucun résultat</div>'; return; }
        res_div.innerHTML = '';
        data.docs.forEach(book => {
          const cover = book.cover_i ? 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-S.jpg' : 'https://via.placeholder.com/50x70/292524/fbbf24?text=?';
          res_div.innerHTML += '<div class="book"><img class="cover" src="' + cover + '" alt="cover"><div class="book-info"><div class="title">' + (book.title || 'Unknown') + '</div><div class="author">✍️ ' + (book.author_name ? book.author_name[0] : 'Unknown author') + '</div><div class="year">📅 ' + (book.first_publish_year || '?') + '</div></div></div>';
        });
      } catch(e) { res_div.innerHTML = '<div class="status">Error / Erreur API</div>'; }
    }
    searchBooks();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🚀', name: 'SpaceX Launch Log', desc: 'Latest SpaceX launches from official API. / Derniers lancements SpaceX.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SpaceX Launches</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #09090b; color: #fafafa; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 30px 15px; }
    .app { width: 100%; max-width: 440px; }
    h2 { text-align: center; color: #a3e635; margin-bottom: 5px; letter-spacing: 1px; }
    .sub { text-align: center; color: #52525b; font-size: 13px; margin-bottom: 25px; }
    .launch { background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 18px; margin-bottom: 12px; }
    .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .name { font-weight: bold; color: #a3e635; font-size: 15px; }
    .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
    .success { background: rgba(163,230,53,0.15); color: #a3e635; border: 1px solid rgba(163,230,53,0.3); }
    .failure { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
    .unknown { background: rgba(148,163,184,0.15); color: #94a3b8; border: 1px solid rgba(148,163,184,0.3); }
    .date { color: #71717a; font-size: 13px; margin-bottom: 6px; }
    .details { color: #a1a1aa; font-size: 13px; line-height: 1.4; }
    .rocket { color: #d4d4d8; font-size: 13px; margin-top: 6px; }
    .status { text-align: center; color: #52525b; padding: 20px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🚀 SpaceX Launch Log</h2>
    <div class="sub">Latest missions / Dernières missions</div>
    <div id="launches"><div class="status">Connecting to SpaceX API...</div></div>
  </div>
  <script>
    async function getLaunches() {
      const container = document.getElementById('launches');
      try {
        const res = await fetch('https://api.spacexdata.com/v4/launches/past?limit=5&offset=0', {
          method: 'GET', headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        const latest = data.slice(-5).reverse();
        container.innerHTML = '';
        latest.forEach(l => {
          const ok = l.success === true ? 'success' : l.success === false ? 'failure' : 'unknown';
          const label = l.success === true ? '✅ Success' : l.success === false ? '❌ Failed' : '❓ Unknown';
          const date = l.date_utc ? new Date(l.date_utc).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '?';
          const detail = l.details ? l.details.substring(0, 100) + '...' : 'No details available.';
          container.innerHTML += '<div class="launch"><div class="top"><span class="name">🛸 ' + l.name + '</span><span class="badge ' + ok + '">' + label + '</span></div><div class="date">📅 ' + date + '</div><div class="details">' + detail + '</div></div>';
        });
      } catch(e) { container.innerHTML = '<div class="status">Error loading / Erreur de chargement</div>'; }
    }
    getLaunches();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌐', name: 'GitHub Trending Dev', desc: 'Top GitHub profiles via public API. / Profils GitHub populaires.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GitHub Explorer</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #0d1117; color: #c9d1d9; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 30px 15px; }
    .app { width: 100%; max-width: 420px; }
    h2 { text-align: center; color: #58a6ff; margin-bottom: 5px; }
    .sub { text-align: center; color: #6e7681; font-size: 13px; margin-bottom: 20px; }
    .search-bar { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; background: #161b22; border: 1px solid #30363d; color: #c9d1d9; padding: 12px; border-radius: 8px; font-size: 15px; outline: none; }
    input:focus { border-color: #58a6ff; }
    button { background: #238636; color: white; border: none; padding: 12px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; }
    button:hover { background: #2ea043; }
    .card { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px; display: flex; gap: 15px; align-items: center; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; border: 2px solid #30363d; }
    .info { flex: 1; overflow: hidden; }
    .uname { color: #58a6ff; font-weight: bold; font-size: 18px; margin-bottom: 4px; }
    .bio { color: #8b949e; font-size: 13px; margin-bottom: 10px; line-height: 1.4; height: 38px; overflow: hidden; }
    .stats { display: flex; gap: 15px; }
    .stat { text-align: center; }
    .sval { color: #58a6ff; font-weight: bold; font-size: 16px; display: block; }
    .slabel { color: #6e7681; font-size: 11px; }
    .link { display: inline-block; margin-top: 12px; background: #238636; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; }
    .status { text-align: center; color: #6e7681; padding: 20px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🌐 GitHub Explorer</h2>
    <div class="sub">Search any GitHub user / Rechercher un utilisateur</div>
    <div class="search-bar">
      <input type="text" id="user" value="torvalds" placeholder="Username / Nom d'utilisateur">
      <button onclick="getProfile()">Search</button>
    </div>
    <div id="result"><div class="status">Loading profile... / Chargement...</div></div>
  </div>
  <script>
    async function getProfile() {
      const u = document.getElementById('user').value.trim();
      if (!u) return;
      const r = document.getElementById('result');
      r.innerHTML = '<div class="status">Searching / Recherche...</div>';
      try {
        const res = await fetch('https://api.github.com/users/' + u);
        if (!res.ok) { r.innerHTML = '<div class="status">User not found / Utilisateur introuvable</div>'; return; }
        const d = await res.json();
        r.innerHTML = '<div class="card"><img class="avatar" src="' + d.avatar_url + '" alt="avatar"><div class="info"><div class="uname">@' + d.login + '</div><div class="bio">' + (d.bio || 'No bio available / Aucune biographie') + '</div><div class="stats"><div class="stat"><span class="sval">' + (d.public_repos || 0) + '</span><span class="slabel">Repos</span></div><div class="stat"><span class="sval">' + (d.followers || 0).toLocaleString() + '</span><span class="slabel">Followers</span></div><div class="stat"><span class="sval">' + (d.following || 0) + '</span><span class="slabel">Following</span></div></div><a class="link" href="' + d.html_url + '" target="_blank">View Profile →</a></div></div>';
      } catch(e) { r.innerHTML = '<div class="status">API Error / Erreur API GitHub</div>'; }
    }
    getProfile();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🗺️', name: 'Country Explorer', desc: 'Search any country — flag, capital, population. / Explorez les pays du monde.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Country Explorer</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#0f172a; color:white; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:30px 15px; }
    .app { width:100%; max-width:400px; }
    h2 { text-align:center; color:#818cf8; margin-bottom:20px; }
    .bar { display:flex; gap:8px; margin-bottom:20px; }
    input { flex:1; background:#1e293b; border:1px solid #334155; color:white; padding:12px; border-radius:8px; font-size:15px; outline:none; }
    input:focus { border-color:#818cf8; }
    button { background:#818cf8; color:#0f172a; border:none; padding:12px 16px; border-radius:8px; font-weight:bold; cursor:pointer; }
    .card { background:#1e293b; border-radius:16px; overflow:hidden; border:1px solid #334155; }
    .flag { font-size:80px; text-align:center; padding:20px; background:#0f172a; }
    .info { padding:20px; }
    .name { font-size:24px; font-weight:bold; color:#818cf8; margin-bottom:15px; }
    .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #1e293b; font-size:14px; }
    .label { color:#64748b; }
    .val { color:#e2e8f0; font-weight:500; text-align:right; max-width:60%; }
    .status { text-align:center; color:#475569; padding:30px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🗺️ Country Explorer</h2>
    <div class="bar">
      <input type="text" id="q" value="France" placeholder="Country name / Nom du pays">
      <button onclick="search()">Search</button>
    </div>
    <div id="out"><div class="status">Search a country / Recherchez un pays</div></div>
  </div>
  <script>
    async function search() {
      const q = document.getElementById('q').value.trim();
      if (!q) return;
      const out = document.getElementById('out');
      out.innerHTML = '<div class="status">Loading / Chargement...</div>';
      try {
        const res = await fetch('https://restcountries.com/v3.1/name/' + encodeURIComponent(q) + '?fullText=false&fields=name,flags,capital,population,region,languages,currencies,area');
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        const c = data[0];
        const langs = Object.values(c.languages || {}).join(', ');
        const curr = Object.values(c.currencies || {}).map(x => x.name + ' (' + (x.symbol||'?') + ')').join(', ');
        const pop = (c.population || 0).toLocaleString();
        const area = (c.area || 0).toLocaleString() + ' km²';
        out.innerHTML = '<div class="card"><div class="flag">' + (c.flags?.emoji||'🏳️') + '</div><div class="info"><div class="name">' + c.name.common + '</div><div class="row"><span class="label">🏛️ Capital</span><span class="val">' + (c.capital?.[0]||'?') + '</span></div><div class="row"><span class="label">🌍 Region</span><span class="val">' + c.region + '</span></div><div class="row"><span class="label">👥 Population</span><span class="val">' + pop + '</span></div><div class="row"><span class="label">📐 Area</span><span class="val">' + area + '</span></div><div class="row"><span class="label">🗣️ Language(s)</span><span class="val">' + langs + '</span></div><div class="row"><span class="label">💰 Currency</span><span class="val">' + curr + '</span></div></div></div>';
      } catch(e) { out.innerHTML = '<div class="status">❌ Country not found / Pays introuvable</div>'; }
    }
    search();
  <\/script>
</body>
</html>`
  },
  {
    icon: '📰', name: 'Hacker News Live', desc: 'Top stories from HN in real-time. / Actualités tech en direct.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hacker News Live</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#1a1a1a; color:#e6e6e6; min-height:100vh; padding:20px; }
    h2 { color:#ff6600; text-align:center; margin-bottom:5px; font-size:1.4rem; }
    .sub { text-align:center; color:#666; font-size:12px; margin-bottom:20px; }
    .story { background:#242424; border-radius:10px; padding:14px; margin-bottom:10px; border-left:3px solid #ff6600; }
    .title a { color:#e6e6e6; text-decoration:none; font-size:15px; font-weight:600; line-height:1.4; }
    .title a:hover { color:#ff6600; }
    .meta { display:flex; gap:15px; margin-top:8px; font-size:12px; color:#888; }
    .score { color:#ff6600; font-weight:bold; }
    .by { color:#aaa; }
    .status { text-align:center; color:#555; padding:20px; }
    button { display:block; margin:15px auto 0; background:#ff6600; color:white; border:none; padding:10px 24px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:14px; }
  </style>
</head>
<body>
  <h2>📰 Hacker News Live</h2>
  <div class="sub">Top stories / Meilleures histoires</div>
  <div id="feed"><div class="status">Loading... / Chargement...</div></div>
  <button onclick="load()">↻ Refresh / Actualiser</button>
  <script>
    async function load() {
      const feed = document.getElementById('feed');
      feed.innerHTML = '<div class="status">Fetching stories...</div>';
      try {
        const ids = await (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json();
        const top8 = ids.slice(0,8);
        const stories = await Promise.all(top8.map(id => fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(r => r.json())));
        feed.innerHTML = '';
        stories.forEach(s => {
          if (!s) return;
          const url = s.url || 'https://news.ycombinator.com/item?id=' + s.id;
          const domain = s.url ? new URL(s.url).hostname.replace('www.','') : 'news.ycombinator.com';
          feed.innerHTML += '<div class="story"><div class="title"><a href="' + url + '" target="_blank">' + s.title + '</a></div><div class="meta"><span class="score">▲ ' + (s.score||0) + ' pts</span><span class="by">👤 ' + (s.by||'?') + '</span><span>💬 ' + (s.descendants||0) + ' comments</span><span>' + domain + '</span></div></div>';
        });
      } catch(e) { feed.innerHTML = '<div class="status">❌ Error / Erreur de connexion</div>'; }
    }
    load();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🎨', name: 'Color Lab', desc: 'Enter a HEX color — get name, palette, shades. / Laboratoire de couleurs.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Color Lab</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#111; color:#fff; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:30px 15px; }
    .app { width:100%; max-width:380px; }
    h2 { text-align:center; margin-bottom:20px; font-size:1.3rem; }
    .bar { display:flex; gap:10px; margin-bottom:20px; align-items:center; }
    .swatch { width:50px; height:46px; border-radius:8px; border:2px solid #333; cursor:pointer; }
    input[type=text] { flex:1; background:#1e1e1e; border:1px solid #333; color:white; padding:12px; border-radius:8px; font-size:15px; outline:none; font-family:monospace; }
    button { background:#fff; color:#111; border:none; padding:12px 14px; border-radius:8px; font-weight:bold; cursor:pointer; }
    .preview { height:120px; border-radius:16px; margin-bottom:15px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold; transition:background 0.4s; }
    .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:15px; }
    .info-box { background:#1e1e1e; border-radius:8px; padding:10px; text-align:center; }
    .ilabel { color:#666; font-size:11px; text-transform:uppercase; margin-bottom:3px; }
    .ival { font-weight:bold; font-size:13px; }
    .swatches { display:flex; gap:6px; }
    .sw { flex:1; height:40px; border-radius:8px; cursor:pointer; transition:transform 0.2s; }
    .sw:hover { transform:scaleY(1.2); }
    .status { color:#555; font-size:12px; text-align:center; margin-top:10px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🎨 Color Lab</h2>
    <div class="bar">
      <input type="color" class="swatch" id="picker" value="#6366f1" oninput="syncText(this.value)">
      <input type="text" id="hex" value="#6366f1" placeholder="#RRGGBB" maxlength="7">
      <button onclick="analyze()">Go</button>
    </div>
    <div class="preview" id="preview">#6366f1</div>
    <div class="info-grid" id="info"></div>
    <div class="swatches" id="swatches"></div>
    <div class="status" id="status"></div>
  </div>
  <script>
    function syncText(v) { document.getElementById('hex').value = v; analyze(); }
    function hexToRgb(h) { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return {r,g,b}; }
    function luma(h) { const {r,g,b}=hexToRgb(h); return 0.299*r+0.587*g+0.114*b; }
    function shade(hex, pct) {
      let {r,g,b}=hexToRgb(hex);
      r=Math.min(255,Math.max(0,Math.round(r+(255-r)*pct)));
      g=Math.min(255,Math.max(0,Math.round(g+(255-g)*pct)));
      b=Math.min(255,Math.max(0,Math.round(b+(255-b)*pct)));
      return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
    }
    function rgbToHsl(r,g,b) {
      r/=255;g/=255;b/=255;
      const max=Math.max(r,g,b),min=Math.min(r,g,b);
      let h,s,l=(max+min)/2;
      if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}
      return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
    }
    async function analyze() {
      let hex = document.getElementById('hex').value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
      document.getElementById('picker').value = hex;
      const preview = document.getElementById('preview');
      const textColor = luma(hex) > 128 ? '#111' : '#fff';
      preview.style.background = hex;
      preview.style.color = textColor;
      preview.innerText = hex.toUpperCase();
      const {r,g,b} = hexToRgb(hex);
      const {h,s,l} = rgbToHsl(r,g,b);
      document.getElementById('info').innerHTML =
        '<div class="info-box"><div class="ilabel">HEX</div><div class="ival">' + hex.toUpperCase() + '</div></div>' +
        '<div class="info-box"><div class="ilabel">RGB</div><div class="ival">' + r + ', ' + g + ', ' + b + '</div></div>' +
        '<div class="info-box"><div class="ilabel">HSL</div><div class="ival">' + h + '°, ' + s + '%, ' + l + '%</div></div>' +
        '<div class="info-box"><div class="ilabel">Luma</div><div class="ival">' + Math.round(luma(hex)) + ' / 255</div></div>';
      const shadeVals = [-0.4,-0.2,0,0.3,0.6];
      const sw = document.getElementById('swatches');
      sw.innerHTML = '';
      shadeVals.forEach(p => {
        const c = p===0 ? hex : shade(hex, p>0 ? p : 0);
        const dark = p<0 ? darken(hex, Math.abs(p)) : (p===0 ? hex : shade(hex,p));
        sw.innerHTML += '<div class="sw" style="background:' + dark + '" title="' + dark + '" onclick="navigator.clipboard&&navigator.clipboard.writeText(\\'' + dark + '\\')"></div>';
      });
      try {
        const res = await fetch('https://www.thecolorapi.com/id?hex=' + hex.slice(1) + '&format=json');
        const d = await res.json();
        preview.innerText = d.name.value + ' · ' + hex.toUpperCase();
        document.getElementById('status').innerText = '✅ thecolorapi.com — click swatches to copy / cliquez pour copier';
      } catch(e) { document.getElementById('status').innerText = '⚠️ Name lookup failed — local data used'; }
    }
    function darken(hex, pct) {
      let {r,g,b}=hexToRgb(hex);
      r=Math.round(r*(1-pct));g=Math.round(g*(1-pct));b=Math.round(b*(1-pct));
      return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
    }
    analyze();
  <\/script>
</body>
</html>`
  },
  {
    icon: '📦', name: 'NPM Package Stats', desc: 'Search any npm package — version, downloads, info. / Stats des packages npm.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NPM Stats</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#1a1a2e; color:#eee; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:30px 15px; }
    .app { width:100%; max-width:400px; }
    h2 { text-align:center; color:#cb3837; margin-bottom:20px; }
    .bar { display:flex; gap:8px; margin-bottom:20px; }
    input { flex:1; background:#16213e; border:1px solid #0f3460; color:white; padding:12px; border-radius:8px; font-size:15px; outline:none; }
    input:focus { border-color:#cb3837; }
    button { background:#cb3837; color:white; border:none; padding:12px 16px; border-radius:8px; font-weight:bold; cursor:pointer; }
    .card { background:#16213e; border-radius:16px; padding:20px; border:1px solid #0f3460; }
    .pkg-name { font-size:22px; font-weight:bold; color:#cb3837; margin-bottom:5px; }
    .version { font-size:12px; background:#cb3837; color:white; padding:3px 10px; border-radius:20px; display:inline-block; margin-bottom:15px; }
    .desc { color:#aaa; font-size:14px; line-height:1.5; margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #0f3460; }
    .stats { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px; }
    .stat { background:#1a1a2e; padding:12px; border-radius:8px; text-align:center; }
    .sv { color:#cb3837; font-weight:bold; font-size:18px; }
    .sl { color:#666; font-size:11px; margin-top:3px; }
    .links { display:flex; gap:8px; }
    .link { flex:1; text-align:center; padding:10px; border-radius:8px; background:#0f3460; color:#aaa; text-decoration:none; font-size:13px; transition:0.2s; }
    .link:hover { background:#cb3837; color:white; }
    .status { text-align:center; color:#555; padding:30px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>📦 NPM Package Stats</h2>
    <div class="bar">
      <input type="text" id="pkg" value="react" placeholder="Package name...">
      <button onclick="search()">Search</button>
    </div>
    <div id="out"><div class="status">Search a package / Recherchez un package</div></div>
  </div>
  <script>
    async function search() {
      const pkg = document.getElementById('pkg').value.trim();
      if (!pkg) return;
      const out = document.getElementById('out');
      out.innerHTML = '<div class="status">Loading... / Chargement...</div>';
      try {
        const [reg, dl] = await Promise.all([
          fetch('https://registry.npmjs.org/' + encodeURIComponent(pkg)).then(r => r.json()),
          fetch('https://api.npmjs.org/downloads/point/last-month/' + encodeURIComponent(pkg)).then(r => r.json())
        ]);
        if (reg.error) throw new Error(reg.error);
        const latest = reg['dist-tags']?.latest || '?';
        const info = reg.versions?.[latest] || {};
        const desc = reg.description || info.description || 'No description / Pas de description';
        const downloads = dl.downloads ? dl.downloads.toLocaleString() : 'N/A';
        const license = info.license || reg.license || '?';
        const deps = Object.keys(info.dependencies || {}).length;
        const homepage = reg.homepage || 'https://npmjs.com/package/' + pkg;
        const repo = reg.repository?.url?.replace('git+','').replace('.git','') || '#';
        out.innerHTML = '<div class="card"><div class="pkg-name">' + reg.name + '</div><span class="version">v' + latest + '</span><div class="desc">' + desc + '</div><div class="stats"><div class="stat"><div class="sv">' + downloads + '</div><div class="sl">📥 Downloads/month</div></div><div class="stat"><div class="sv">' + deps + '</div><div class="sl">🔗 Dependencies</div></div><div class="stat"><div class="sv">' + license + '</div><div class="sl">📜 License</div></div><div class="stat"><div class="sv">' + (reg.maintainers?.length||'?') + '</div><div class="sl">👤 Maintainers</div></div></div><div class="links"><a class="link" href="https://npmjs.com/package/' + pkg + '" target="_blank">📦 NPM</a><a class="link" href="' + repo + '" target="_blank">🐙 GitHub</a><a class="link" href="' + homepage + '" target="_blank">🌐 Homepage</a></div></div>';
      } catch(e) { out.innerHTML = '<div class="status">❌ Package not found / Package introuvable</div>'; }
    }
    search();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🔲', name: 'QR Code Generator', desc: 'Text or URL to instant QR code. / Générateur de QR code en temps réel.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QR Generator</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#0f172a; color:white; min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; }
    .app { width:100%; max-width:360px; text-align:center; }
    h2 { color:#a78bfa; margin-bottom:20px; }
    textarea { width:100%; background:#1e293b; border:1px solid #334155; color:white; padding:12px; border-radius:10px; font-size:14px; outline:none; resize:vertical; min-height:80px; margin-bottom:15px; line-height:1.5; }
    textarea:focus { border-color:#a78bfa; }
    .opts { display:flex; gap:10px; margin-bottom:15px; }
    select { flex:1; background:#1e293b; border:1px solid #334155; color:white; padding:10px; border-radius:8px; }
    input[type=color] { width:50px; height:42px; border:none; border-radius:8px; cursor:pointer; background:none; }
    button { width:100%; background:#a78bfa; color:#0f172a; border:none; padding:13px; border-radius:10px; font-weight:bold; font-size:15px; cursor:pointer; margin-bottom:20px; transition:opacity 0.2s; }
    button:hover { opacity:0.85; }
    .qr-box { background:#fff; padding:15px; border-radius:16px; display:inline-block; margin-bottom:15px; }
    img { display:block; max-width:100%; }
    .dl { background:#1e293b; color:#a78bfa; border:2px solid #a78bfa; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block; transition:0.2s; }
    .dl:hover { background:#a78bfa; color:#0f172a; }
    .status { color:#475569; font-size:12px; margin-top:10px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🔲 QR Code Generator</h2>
    <textarea id="txt" placeholder="Enter text or URL / Entrez du texte ou une URL">https://github.com</textarea>
    <div class="opts">
      <select id="size">
        <option value="150">Small 150px</option>
        <option value="200" selected>Medium 200px</option>
        <option value="300">Large 300px</option>
      </select>
      <input type="color" id="color" value="#000000" title="Color / Couleur">
    </div>
    <button onclick="gen()">⚡ Generate QR Code</button>
    <div class="qr-box"><img id="qr" src="" alt="QR" width="200" height="200"></div>
    <br>
    <a class="dl" id="dl" href="#" download="qrcode.png">⬇ Download / Télécharger</a>
    <div class="status" id="status">api.qrserver.com — free & no key required</div>
  </div>
  <script>
    function gen() {
      const txt = encodeURIComponent(document.getElementById('txt').value.trim() || 'Hello World');
      const size = document.getElementById('size').value;
      const color = document.getElementById('color').value.slice(1);
      const url = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + txt + '&color=' + color + '&bgcolor=ffffff&format=png';
      document.getElementById('qr').src = url;
      document.getElementById('qr').width = size;
      document.getElementById('qr').height = size;
      document.getElementById('dl').href = url;
      document.getElementById('status').innerText = '✅ QR generated — ' + decodeURIComponent(txt).substring(0,40);
    }
    gen();
  <\/script>
</body>
</html>`
  },
  {
    icon: '⚔️', name: 'D&D Spell Book', desc: 'Random D&D spells from dnd5eapi.co. / Sorts Donjons & Dragons aléatoires.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>D&D Spell Book</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#1a0a2e; color:#e2d9f3; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:25px 15px; }
    .app { width:100%; max-width:400px; }
    h2 { text-align:center; color:#c084fc; margin-bottom:5px; }
    .sub { text-align:center; color:#6b46a0; font-size:12px; margin-bottom:20px; }
    .card { background:#2d1b4e; border:1px solid #4c1d95; border-radius:16px; padding:20px; }
    .spell-name { font-size:22px; font-weight:bold; color:#c084fc; margin-bottom:8px; }
    .tags { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:15px; }
    .tag { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:bold; }
    .t-level { background:rgba(192,132,252,0.2); color:#c084fc; border:1px solid #4c1d95; }
    .t-school { background:rgba(251,191,36,0.2); color:#fbbf24; border:1px solid #92400e; }
    .t-cast { background:rgba(16,185,129,0.2); color:#34d399; border:1px solid #065f46; }
    .desc { color:#c4b5d4; font-size:14px; line-height:1.6; margin-bottom:15px; max-height:140px; overflow-y:auto; }
    .details { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:15px; }
    .det { background:#1a0a2e; padding:10px; border-radius:8px; }
    .dlabel { color:#6b46a0; font-size:11px; text-transform:uppercase; }
    .dval { color:#e2d9f3; font-weight:bold; font-size:13px; margin-top:2px; }
    .classes { color:#94a3b8; font-size:13px; margin-bottom:15px; }
    button { width:100%; background:#7c3aed; color:white; border:none; padding:13px; border-radius:10px; font-weight:bold; font-size:15px; cursor:pointer; transition:0.2s; }
    button:hover { background:#6d28d9; }
    .status { text-align:center; color:#4c1d95; padding:30px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>⚔️ D&D Spell Book</h2>
    <div class="sub">Donjons & Dragons 5e — dnd5eapi.co</div>
    <div id="out"><div class="status">Loading spells... / Chargement...</div></div>
  </div>
  <script>
    let allSpells = [];
    async function init() {
      try {
        const res = await fetch('https://www.dnd5eapi.co/api/spells');
        const data = await res.json();
        allSpells = data.results;
        roll();
      } catch(e) { document.getElementById('out').innerHTML = '<div class="status">❌ API Error / Erreur dnd5eapi.co</div>'; }
    }
    async function roll() {
      if (!allSpells.length) return;
      const out = document.getElementById('out');
      out.innerHTML = '<div class="status">Consulting the arcane tome... / Consultation du grimoire...</div>';
      const pick = allSpells[Math.floor(Math.random() * allSpells.length)];
      try {
        const res = await fetch('https://www.dnd5eapi.co' + pick.url);
        const s = await res.json();
        const lvl = s.level === 0 ? 'Cantrip' : 'Level ' + s.level;
        const comps = (s.components||[]).join(', ');
        const classes = (s.classes||[]).map(c=>c.name).join(', ');
        out.innerHTML = '<div class="card"><div class="spell-name">✨ ' + s.name + '</div><div class="tags"><span class="tag t-level">' + lvl + '</span><span class="tag t-school">' + (s.school?.name||'?') + '</span><span class="tag t-cast">⏱ ' + (s.casting_time||'?') + '</span></div><div class="desc">' + (Array.isArray(s.desc) ? s.desc[0] : s.desc||'No description.') + '</div><div class="details"><div class="det"><div class="dlabel">Range / Portée</div><div class="dval">' + (s.range||'?') + '</div></div><div class="det"><div class="dlabel">Duration / Durée</div><div class="dval">' + (s.duration||'?') + '</div></div><div class="det"><div class="dlabel">Components</div><div class="dval">' + comps + '</div></div><div class="det"><div class="dlabel">Concentration</div><div class="dval">' + (s.concentration?'Yes / Oui':'No / Non') + '</div></div></div><div class="classes">📚 Classes: ' + classes + '</div><button onclick="roll()">🎲 New Spell / Nouveau sort</button></div>';
      } catch(e) { out.innerHTML = '<div class="status">❌ Spell failed / Sort raté</div>'; }
    }
    init();
  <\/script>
</body>
</html>`
  },
  {
    icon: '📖', name: 'Wikipedia Instant', desc: 'Instant Wikipedia summary for any topic. / Résumé Wikipedia instantané.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Wikipedia Instant</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:#f8f9fa; color:#202122; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:25px 15px; }
    .app { width:100%; max-width:420px; }
    h2 { text-align:center; color:#3366cc; margin-bottom:20px; font-size:1.4rem; }
    .bar { display:flex; gap:8px; margin-bottom:20px; }
    input { flex:1; background:white; border:1px solid #a2a9b1; color:#202122; padding:12px; border-radius:8px; font-size:15px; outline:none; }
    input:focus { border-color:#3366cc; box-shadow:0 0 0 2px rgba(51,102,204,0.2); }
    .lang { background:white; border:1px solid #a2a9b1; color:#202122; padding:12px; border-radius:8px; font-size:14px; }
    button { background:#3366cc; color:white; border:none; padding:12px 14px; border-radius:8px; font-weight:bold; cursor:pointer; }
    .card { background:white; border:1px solid #a2a9b1; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08); }
    .thumb { width:100%; height:200px; object-fit:cover; display:block; }
    .body { padding:20px; }
    .title { font-size:20px; font-weight:bold; color:#202122; margin-bottom:5px; }
    .extract { color:#54595d; font-size:14px; line-height:1.6; margin-bottom:15px; max-height:180px; overflow-y:auto; }
    .wiki-link { display:inline-block; background:#3366cc; color:white; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold; }
    .status { text-align:center; color:#72777d; padding:30px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>📖 Wikipedia Instant</h2>
    <div class="bar">
      <select class="lang" id="lang">
        <option value="en">🇬🇧 EN</option>
        <option value="fr">🇫🇷 FR</option>
      </select>
      <input type="text" id="q" value="Artificial intelligence" placeholder="Search / Rechercher...">
      <button onclick="search()">🔍</button>
    </div>
    <div id="out"><div class="status">Search any topic / Cherchez n'importe quel sujet</div></div>
  </div>
  <script>
    async function search() {
      const q = document.getElementById('q').value.trim();
      const lang = document.getElementById('lang').value;
      if (!q) return;
      const out = document.getElementById('out');
      out.innerHTML = '<div class="status">Searching Wikipedia...</div>';
      try {
        const url = 'https://' + lang + '.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(q);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Not found');
        const d = await res.json();
        const img = d.thumbnail?.source ? '<img class="thumb" src="' + d.thumbnail.source + '" alt="thumb">' : '';
        out.innerHTML = '<div class="card">' + img + '<div class="body"><div class="title">' + d.title + '</div><p style="color:#72777d;font-size:12px;margin-bottom:10px;">' + (d.description||'') + '</p><div class="extract">' + (d.extract||'No extract available.') + '</div><a class="wiki-link" href="' + d.content_urls?.desktop?.page + '" target="_blank">📖 Read full article / Lire l’article complet →</a></div></div>';
      } catch(e) { out.innerHTML = '<div class="status">❌ Article not found / Article introuvable<br><small>Try another spelling / Essayez une autre orthographe</small></div>'; }
    }
    window.onload = search;
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌅', name: 'Sunrise & Sunset', desc: 'Get sunrise/sunset times for any city. / Lever et coucher du soleil.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sunrise & Sunset</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:linear-gradient(135deg, #0f0c29, #302b63, #24243e); color:white; min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; }
    .app { width:100%; max-width:380px; text-align:center; }
    h2 { font-size:1.5rem; margin-bottom:5px; }
    .sub { color:#94a3b8; font-size:13px; margin-bottom:25px; }
    .bar { display:flex; gap:8px; margin-bottom:25px; }
    input { flex:1; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; padding:12px; border-radius:8px; font-size:14px; outline:none; }
    input::placeholder { color:rgba(255,255,255,0.4); }
    input:focus { border-color:#f59e0b; }
    button { background:#f59e0b; color:#0f0c29; border:none; padding:12px 16px; border-radius:8px; font-weight:bold; cursor:pointer; }
    .sky { font-size:60px; margin-bottom:15px; animation: float 3s ease-in-out infinite; display:block; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    .times { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px; }
    .time-box { background:rgba(255,255,255,0.1); border-radius:12px; padding:18px; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.15); }
    .ticon { font-size:28px; margin-bottom:8px; }
    .tlabel { color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:1px; }
    .tval { font-size:20px; font-weight:bold; margin-top:4px; color:#fbbf24; }
    .extra { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
    .ext { background:rgba(255,255,255,0.07); border-radius:8px; padding:10px; }
    .elabel { color:#64748b; font-size:10px; }
    .eval { font-size:13px; font-weight:bold; margin-top:2px; }
    .status { color:#475569; font-size:12px; margin-top:15px; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🌅 Sunrise & Sunset</h2>
    <div class="sub">Powered by open-meteo.com + geocoding / Sans clé API</div>
    <div class="bar">
      <input type="text" id="city" value="Paris" placeholder="City / Ville...">
      <button onclick="load()">Search</button>
    </div>
    <span class="sky" id="sky">🌤️</span>
    <div class="times" id="times"></div>
    <div class="extra" id="extra"></div>
    <div class="status" id="status">Loading... / Chargement...</div>
  </div>
  <script>
    function fmt(iso) {
      if (!iso) return '--:--';
      const d = new Date(iso);
      return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    }
    function duration(r, s) {
      const diff = (new Date(s) - new Date(r)) / 1000 / 60;
      const h = Math.floor(diff / 60), m = Math.round(diff % 60);
      return h + 'h ' + m + 'min';
    }
    async function load() {
      const city = document.getElementById('city').value.trim();
      if (!city) return;
      document.getElementById('status').innerText = 'Searching / Recherche...';
      document.getElementById('times').innerHTML = '';
      document.getElementById('extra').innerHTML = '';
      try {
        const geo = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=en&format=json');
        const gd = await geo.json();
        if (!gd.results?.length) throw new Error('City not found');
        const loc = gd.results[0];
        const sun = await fetch('https://api.sunrise-sunset.org/json?lat=' + loc.latitude + '&lng=' + loc.longitude + '&formatted=0');
        const sd = await sun.json();
        const r = sd.results;
        const now = new Date();
        const sunriseT = new Date(r.sunrise);
        const sunsetT = new Date(r.sunset);
        const isDay = now > sunriseT && now < sunsetT;
        document.getElementById('sky').innerText = isDay ? '☀️' : '🌙';
        document.getElementById('times').innerHTML =
          '<div class="time-box"><div class="ticon">🌅</div><div class="tlabel">Sunrise / Lever</div><div class="tval">' + fmt(r.sunrise) + '</div></div>' +
          '<div class="time-box"><div class="ticon">🌇</div><div class="tlabel">Sunset / Coucher</div><div class="tval">' + fmt(r.sunset) + '</div></div>';
        document.getElementById('extra').innerHTML =
          '<div class="ext"><div class="elabel">Daylight / Jour</div><div class="eval">' + duration(r.sunrise, r.sunset) + '</div></div>' +
          '<div class="ext"><div class="elabel">Solar Noon</div><div class="eval">' + fmt(r.solar_noon) + '</div></div>' +
          '<div class="ext"><div class="elabel">Status</div><div class="eval">' + (isDay ? '☀️ Day' : '🌙 Night') + '</div></div>';
        document.getElementById('status').innerText = '📍 ' + loc.name + ', ' + (loc.country||'') + ' — lat:' + loc.latitude.toFixed(2) + ' lng:' + loc.longitude.toFixed(2);
      } catch(e) { document.getElementById('status').innerText = '❌ ' + e.message + ' / Ville introuvable'; }
    }
    load();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌍', name: 'IP Locator', desc: 'Locate any IP address — country, city, ISP. / Localiser une adresse IP.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IP Locator</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:monospace; }
    body { background:#000; color:#00ff41; min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; }
    .terminal { background:#0a0a0a; border:1px solid #00ff41; border-radius:12px; padding:25px; width:100%; max-width:420px; box-shadow:0 0 30px rgba(0,255,65,0.15); }
    .header { color:#00ff41; font-size:14px; border-bottom:1px dashed #00ff41; padding-bottom:10px; margin-bottom:15px; }
    .bar { display:flex; gap:8px; margin-bottom:20px; }
    input { flex:1; background:#000; border:1px solid #00ff41; color:#00ff41; padding:10px; border-radius:4px; font-family:monospace; font-size:14px; outline:none; }
    input::placeholder { color:#005c19; }
    button { background:#00ff41; color:#000; border:none; padding:10px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-family:monospace; }
    .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #0a2a0a; font-size:13px; }
    .key { color:#005c19; }
    .val { color:#00ff41; text-align:right; max-width:60%; word-break:break-all; }
    .map-link { display:block; text-align:center; margin-top:15px; color:#00ff41; text-decoration:none; font-size:13px; border:1px solid #00ff41; padding:8px; border-radius:4px; transition:0.2s; }
    .map-link:hover { background:#00ff41; color:#000; }
    .status { color:#005c19; text-align:center; padding:20px; font-size:13px; }
    .blink { animation:blink 1s infinite; }
    @keyframes blink { 50%{opacity:0} }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="header">▶ IP TRACE SYSTEM v2.0 — ip-api.com (free)<span class="blink">_</span></div>
    <div class="bar">
      <input type="text" id="ip" placeholder="IP address / Adresse IP (blank = yours)">
      <button onclick="trace()">TRACE</button>
    </div>
    <div id="out"><div class="status">Awaiting target... / En attente d'une cible<span class="blink">_</span></div></div>
  </div>
  <script>
    async function trace() {
      const ip = document.getElementById('ip').value.trim();
      const out = document.getElementById('out');
      out.innerHTML = '<div class="status">Tracing... / Localisation en cours<span class="blink">_</span></div>';
      try {
        const target = ip || '';
        const url = 'https://ipwho.is/' + target;
        const res = await fetch(url);
        const d = await res.json();
        if (!d.success) throw new Error(d.message || 'Lookup failed');
        const rows = [
          ['IP Address', d.ip],
          ['Country / Pays', (d.country||'?') + ' ' + (d.country_code||'')],
          ['Region / Région', (d.region||'?')],
          ['City / Ville', (d.city||'?')],
          ['ZIP / Code postal', (d.postal||'?')],
          ['Latitude', d.latitude],
          ['Longitude', d.longitude],
          ['Timezone', (d.timezone?.id||'?')],
          ['ISP', (d.connection?.isp||'?')],
          ['Organization', (d.connection?.org||'?')],
          ['ASN', (d.connection?.asn||'?')]
        ];
        const mapUrl = 'https://www.openstreetmap.org/?mlat=' + d.latitude + '&mlon=' + d.longitude + '&zoom=12';
        out.innerHTML = rows.map(([k,v]) => '<div class="row"><span class="key">' + k + '</span><span class="val">' + v + '</span></div>').join('') +
          '<a class="map-link" href="' + mapUrl + '" target="_blank">📍 View on Map / Voir sur la carte →</a>';
      } catch(e) { out.innerHTML = '<div class="status">❌ Trace failed: ' + e.message + '<span class="blink">_</span></div>'; }
    }
    trace();
  <\/script>
</body>
</html>`
  },
  {
    icon: '💬', name: 'Inspirational Quotes', desc: 'Random motivational quotes from ZenQuotes. / Citations motivantes aléatoires.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Inspirational Quotes</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; font-family:sans-serif; }
    body { background:linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); color:white; min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; }
    .app { width:100%; max-width:420px; text-align:center; }
    .quote-mark { font-size:80px; color:rgba(139,92,246,0.3); line-height:1; margin-bottom:-20px; font-family:Georgia,serif; }
    .card { background:rgba(255,255,255,0.05); border:1px solid rgba(139,92,246,0.3); border-radius:24px; padding:35px 30px; backdrop-filter:blur(10px); margin-bottom:25px; min-height:200px; display:flex; flex-direction:column; justify-content:center; }
    .quote { font-size:18px; line-height:1.7; color:#e2e8f0; font-style:italic; font-family:Georgia,serif; margin-bottom:20px; transition:opacity 0.4s; }
    .author { color:#a78bfa; font-weight:bold; font-size:15px; }
    .author::before { content:'— '; }
    .actions { display:flex; gap:10px; justify-content:center; }
    button { flex:1; padding:13px; border:none; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer; transition:0.2s; }
    .btn-new { background:#7c3aed; color:white; }
    .btn-new:hover { background:#6d28d9; }
    .btn-copy { background:rgba(255,255,255,0.1); color:#a78bfa; border:1px solid rgba(139,92,246,0.4); }
    .btn-copy:hover { background:rgba(139,92,246,0.2); }
    .status { color:#4c1d95; font-size:12px; margin-top:15px; }
    .fade { opacity:0; }
  </style>
</head>
<body>
  <div class="app">
    <div class="quote-mark">"</div>
    <div class="card">
      <div class="quote" id="quote">Loading a quote for you... / Chargement d'une citation...</div>
      <div class="author" id="author">...</div>
    </div>
    <div class="actions">
      <button class="btn-new" onclick="getQuote()">✨ New Quote / Nouvelle citation</button>
      <button class="btn-copy" onclick="copyQuote()">📋 Copy / Copier</button>
    </div>
    <div class="status" id="status">zenquotes.io — free API, no key required</div>
  </div>
  <script>
    const QUOTES = [
      {q:'The only way to do great work is to love what you do.',a:'Steve Jobs'},
      {q:'In the middle of every difficulty lies opportunity.',a:'Albert Einstein'},
      {q:'Success is not final, failure is not fatal: it is the courage to continue that counts.',a:'Winston Churchill'},
      {q:'It does not matter how slowly you go as long as you do not stop.',a:'Confucius'},
      {q:'Life is what happens when you are busy making other plans.',a:'John Lennon'},
      {q:'The future belongs to those who believe in the beauty of their dreams.',a:'Eleanor Roosevelt'},
      {q:'Strive not to be a success, but rather to be of value.',a:'Albert Einstein'},
      {q:'Two roads diverged in a wood, and I took the one less traveled by.',a:'Robert Frost'},
      {q:'You miss 100 percent of the shots you never take.',a:'Wayne Gretzky'},
      {q:'Whether you think you can or you think you cannot - you are right.',a:'Henry Ford'},
      {q:'The best time to plant a tree was 20 years ago. The second best time is now.',a:'Chinese Proverb'},
      {q:'An unexamined life is not worth living.',a:'Socrates'},
      {q:'Spread love everywhere you go. Let no one ever come to you without leaving happier.',a:'Mother Teresa'},
      {q:'When you reach the end of your rope, tie a knot in it and hang on.',a:'Franklin D. Roosevelt'},
      {q:'Always remember that you are absolutely unique. Just like everyone else.',a:'Margaret Mead'},
      {q:'Do not go where the path may lead, go instead where there is no path and leave a trail.',a:'Ralph Waldo Emerson'},
      {q:'You will face many defeats in life, but never let yourself be defeated.',a:'Maya Angelou'},
      {q:'In the end, it is not the years in your life that count. It is the life in your years.',a:'Abraham Lincoln'},
      {q:'Never let the fear of striking out keep you from playing the game.',a:'Babe Ruth'},
      {q:'Life is either a daring adventure or nothing at all.',a:'Helen Keller'},
      {q:'Many failures happen when people do not realize how close they were to success before giving up.',a:'Thomas Edison'},
      {q:'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',a:'Dr. Seuss'},
      {q:'If life were predictable it would cease to be life, and be without flavor.',a:'Eleanor Roosevelt'},
      {q:'If you look at what you have in life, you will always have more.',a:'Oprah Winfrey'},
      {q:'If you want to live a happy life, tie it to a goal, not to people or things.',a:'Albert Einstein'},
      {q:'Never let the fear of striking out keep you from playing the game.',a:'Babe Ruth'},
      {q:'The only impossible journey is the one you never begin.',a:'Tony Robbins'},
      {q:'In this life we cannot do great things. We can only do small things with great love.',a:'Mother Teresa'},
      {q:'Do what you can, with what you have, where you are.',a:'Theodore Roosevelt'},
      {q:'It always seems impossible until it is done.',a:'Nelson Mandela'}
    ];
    let used = [], currentQuote = '', currentAuthor = '';
    function getQuote() {
      const qEl = document.getElementById('quote');
      const aEl = document.getElementById('author');
      qEl.style.opacity = '0';
      if (used.length >= QUOTES.length) used = [];
      let idx;
      do { idx = Math.floor(Math.random() * QUOTES.length); } while (used.includes(idx));
      used.push(idx);
      const q = QUOTES[idx];
      currentQuote = q.q; currentAuthor = q.a;
      setTimeout(() => {
        qEl.innerText = currentQuote;
        aEl.innerText = currentAuthor;
        qEl.style.opacity = '1';
        document.getElementById('status').innerText = '✅ Quote ' + (used.length) + ' / ' + QUOTES.length + ' — 100% local, no API needed';
      }, 300);
    }
    function copyQuote() {
      if (!currentQuote) return;
      const text = '"' + currentQuote + '" — ' + currentAuthor;
      navigator.clipboard?.writeText(text).then(() => { document.getElementById('status').innerText = '✅ Copied to clipboard / Copié !'; });
    }
    getQuote();
  <\/script>
</body>
</html>`
  },
  {
    icon: '📖', name: 'Smart Dictionary', desc: 'Dictionary with audio pronunciation. / Dictionnaire avec prononciation audio.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smart Dictionary</title>
  <style>
    body { background: #f8fafc; color: #0f172a; font-family: 'Inter', sans-serif; display: flex; justify-content: center; padding: 50px 20px; margin: 0; }
    .card { background: white; width: 100%; max-width: 500px; padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
    h1 { margin: 0 0 20px; font-size: 24px; color: #3b82f6; }
    .search-box { display: flex; gap: 10px; margin-bottom: 30px; }
    input { flex: 1; padding: 15px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none; }
    input:focus { border-color: #3b82f6; }
    button { background: #3b82f6; color: white; border: none; padding: 0 20px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
    button:hover { background: #2563eb; }
    .word-title { font-size: 32px; font-weight: 900; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .phonetic { color: #8b5cf6; font-weight: bold; margin-bottom: 20px; }
    .meaning { margin-bottom: 20px; line-height: 1.6; }
    .part { font-weight: bold; color: #64748b; font-size: 14px; text-transform: uppercase; margin-bottom: 5px; }
    .def { font-size: 18px; }
    .play-btn { width: 50px; height: 50px; background: #e0e7ff; color: #4f46e5; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 20px; }
    .play-btn:hover { background: #c7d2fe; }
    .error { color: #ef4444; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>📖 Smart Dictionary</h1>
    <div class="search-box">
      <input type="text" id="term" placeholder="Type a word in English..." onkeydown="if(event.key==='Enter') search()">
      <button onclick="search()">Search</button>
    </div>
    <div id="res">
      <div style="color: #64748b;">Search for any English word to get its definition and audio pronunciation.</div>
    </div>
  </div>
  <script>
    async function search() {
      const q = document.getElementById('term').value.trim();
      if(!q) return;
      const res = document.getElementById('res');
      res.innerHTML = 'Loading...';
      try {
        const r = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(q));
        if(!r.ok) throw new Error('Word not found.');
        const data = await r.json();
        const word = data[0];
        let audioUrl = '';
        for(let p of word.phonetics) { if(p.audio) { audioUrl = p.audio; break; } }
        let meaningHtml = '';
        if(word.meanings && word.meanings.length > 0) {
          const m = word.meanings[0];
          meaningHtml = '<div class="meaning"><div class="part">' + m.partOfSpeech + '</div><div class="def">' + m.definitions[0].definition + '</div></div>';
        }
        res.innerHTML = '<div class="word-title"><span>' + word.word + '</span>' + 
          (audioUrl ? '<div class="play-btn" onclick="new Audio(\\'' + audioUrl + '\\').play()">🔊</div>' : '') + 
          '</div><div class="phonetic">' + (word.phonetic || '') + '</div>' + meaningHtml;
      } catch(e) {
        res.innerHTML = '<div class="error">' + e.message + '</div>';
      }
    }
  <`+`/script>
</body>
</html>`
  },
  {
    icon: '🍿', name: 'TV Show Finder', desc: 'Search TV series and get summaries & posters. / Chercher des séries et affiches.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TV Show Finder</title>
  <style>
    body { background: #111; color: white; font-family: 'Inter', sans-serif; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: #222; width: 100%; max-width: 600px; border-radius: 20px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    h1 { color: #ef4444; margin-top: 0; }
    .search { display: flex; gap: 10px; margin-bottom: 30px; }
    input { flex: 1; padding: 15px; background: #000; border: 1px solid #333; color: white; border-radius: 10px; font-size: 16px; outline: none; }
    button { background: #ef4444; color: white; border: none; padding: 0 20px; border-radius: 10px; font-weight: bold; cursor: pointer; }
    .show { display: flex; gap: 20px; }
    .poster { width: 150px; border-radius: 10px; background: #333; }
    .info { flex: 1; }
    .title { font-size: 28px; font-weight: 900; margin-bottom: 5px; }
    .meta { color: #888; font-size: 14px; margin-bottom: 15px; }
    .rating { display: inline-block; background: #f59e0b; color: black; font-weight: bold; padding: 3px 8px; border-radius: 5px; margin-right: 10px; }
    .summary { color: #ccc; line-height: 1.6; font-size: 15px; }
    .error { color: #ef4444; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🍿 TV Show Finder</h1>
    <div class="search">
      <input type="text" id="q" placeholder="Enter a TV series (e.g. Breaking Bad)..." onkeydown="if(event.key==='Enter') find()">
      <button onclick="find()">Search</button>
    </div>
    <div id="res" style="color:#888;">Discover TV shows and details. Data by TVMaze API.</div>
  </div>
  <script>
    async function find() {
      const q = document.getElementById('q').value;
      const res = document.getElementById('res');
      if(!q) return;
      res.innerHTML = 'Searching...';
      try {
        const r = await fetch('https://api.tvmaze.com/singlesearch/shows?q=' + encodeURIComponent(q));
        if(!r.ok) throw new Error('Show not found.');
        const s = await r.json();
        const img = s.image ? s.image.medium : 'https://via.placeholder.com/150x210?text=No+Image';
        const rating = s.rating && s.rating.average ? s.rating.average + '/10' : 'N/A';
        const genres = s.genres ? s.genres.join(', ') : '';
        res.innerHTML = '<div class="show"><img src="' + img + '" class="poster"><div class="info"><div class="title">' + s.name + '</div><div class="meta"><span class="rating">⭐ ' + rating + '</span>' + (s.premiered ? s.premiered.substring(0,4) + ' • ' : '') + genres + '</div><div class="summary">' + (s.summary || 'No summary available.') + '</div></div></div>';
      } catch(e) { res.innerHTML = '<div class="error">' + e.message + '</div>'; }
    }
  <`+`/script>
</body>
</html>`
  },
  {
    icon: '🎵', name: 'Music Explorer', desc: 'Search songs with 30s audio previews (iTunes). / Extraits musicaux de 30s.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Music Explorer</title>
  <style>
    body { background: linear-gradient(135deg, #1e3a8a, #3b0764); color: white; font-family: 'Inter', sans-serif; min-height: 100vh; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: rgba(0,0,0,0.5); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); width: 100%; max-width: 600px; border-radius: 24px; padding: 30px; box-shadow: 0 30px 60px rgba(0,0,0,0.6); }
    h1 { margin-top: 0; color: #38bdf8; }
    .search { display: flex; gap: 10px; margin-bottom: 30px; }
    input { flex: 1; padding: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 12px; font-size: 16px; outline: none; }
    button { background: #38bdf8; color: #000; border: none; padding: 0 20px; border-radius: 12px; font-weight: bold; cursor: pointer; }
    .track { display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px; margin-bottom: 10px; }
    .art { width: 60px; height: 60px; border-radius: 10px; }
    .info { flex: 1; }
    .name { font-weight: bold; font-size: 16px; margin-bottom: 5px; }
    .artist { color: #94a3b8; font-size: 14px; }
    audio { height: 30px; width: 150px; outline: none; }
    .error { color: #ef4444; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🎵 iTunes Explorer</h1>
    <div class="search">
      <input type="text" id="q" placeholder="Search artist or song (e.g. Daft Punk)..." onkeydown="if(event.key==='Enter') find()">
      <button onclick="find()">Search</button>
    </div>
    <div id="res" style="color:#94a3b8;">Search to preview 30 seconds of top tracks!</div>
  </div>
  <script>
    async function find() {
      const q = document.getElementById('q').value;
      const res = document.getElementById('res');
      if(!q) return;
      res.innerHTML = 'Searching iTunes API...';
      try {
        const r = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(q) + '&entity=song&limit=4');
        const data = await r.json();
        if(data.results.length === 0) throw new Error('No tracks found.');
        res.innerHTML = data.results.map(t => 
          '<div class="track"><img src="' + t.artworkUrl100 + '" class="art"><div class="info"><div class="name">' + t.trackName + '</div><div class="artist">' + t.artistName + '</div></div><audio controls src="' + t.previewUrl + '" title="30s preview"></audio></div>'
        ).join('');
      } catch(e) { res.innerHTML = '<div class="error">' + e.message + '</div>'; }
    }
  <`+`/script>
</body>
</html>`
  },
  {
    icon: '🎴', name: 'Pokemon TCG', desc: 'Search official Pokemon cards and prices. / Cartes Pokemon officielles.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pokemon TCG</title>
  <style>
    body { background: #facc15; color: #1e3a8a; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; }
    .container { max-width: 900px; margin: 0 auto; text-align: center; }
    h1 { font-size: 36px; color: #1e40af; margin-bottom: 30px; text-shadow: 2px 2px 0 #fff; }
    .search { display: flex; justify-content: center; gap: 10px; margin-bottom: 40px; }
    input { width: 300px; padding: 12px 20px; border: 3px solid #1e3a8a; border-radius: 30px; font-size: 16px; outline: none; font-weight: bold; }
    button { background: #ef4444; color: white; border: 3px solid #7f1d1d; padding: 0 25px; border-radius: 30px; cursor: pointer; font-weight: 900; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
    .card { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); display: flex; flex-direction: column; align-items: center; border: 3px solid #1e3a8a; transition: 0.2s; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
    .art-img { width: 100%; max-width: 200px; border-radius: 10px; margin-bottom: 15px; }
    .title { font-weight: 900; font-size: 18px; margin-bottom: 5px; }
    .set { color: #64748b; font-size: 14px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎴 Pokémon TCG Explorer</h1>
    <div class="search">
      <input type="text" id="q" placeholder="Enter a Pokémon (e.g. Charizard)..." onkeydown="if(event.key==='Enter') find()">
      <button onclick="find()">Search</button>
    </div>
    <div id="res" class="grid"><div style="text-align:center;grid-column:1/-1;color:#64748b;">Powered by Jikan API (MyAnimeList)</div></div>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🦊', name: 'Fox Explorer', desc: 'Fetches random cute fox pictures.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🎱', name: 'Magic 8 Ball (Yes/No)', desc: 'Ask a question, get an animated GIF answer.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🔮', name: 'Age Predictor', desc: 'Predicts someone\'s age based on their name.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🎤', name: 'Kanye Wisdom', desc: 'Random quotes from Kanye West.',
    code: `<!DOCTYPE html>
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
        document.getElementById('q').innerText='"'+data.quote+'"';
      }catch(e){}
    }
    getQ();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🤖', name: 'RoboHash Avatar', desc: 'Generates unique robot avatars from text.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🤡', name: 'Jokes API', desc: 'Random jokes with setup and punchline.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🛒', name: 'Fake Store DB', desc: 'Fetches random products for e-commerce UI testing.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🐕', name: 'Dog Facts', desc: 'Random facts about dogs.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '⚔️', name: 'Star Wars Codex', desc: 'Random characters from the Star Wars universe.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🚻', name: 'Genderize API', desc: 'Predict gender based on a given name.',
    code: `<!DOCTYPE html>
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
  <\/script>
</body>
</html>`
  },
  {
    icon: '🦊', name: 'Fox Finder', desc: 'Fetches infinite random fox pictures.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random Fox</title>
  <style>
    body { background: #fdba74; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: white; padding: 20px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 300px; text-align: center; }
    .img-box { width: 100%; height: 250px; background: #ffedd5; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    button { background: #ea580c; color: white; border: none; padding: 12px; border-radius: 10px; width: 100%; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.2s; }
    button:hover { background: #c2410c; }
  </style>
</head>
<body>
  <div class="card">
    <div class="img-box">
      <span id="load">Loading fox...</span>
      <img id="fox-img" src="" onload="this.style.display='block'; document.getElementById('load').style.display='none';">
    </div>
    <button onclick="getFox()">Fetch Another Fox</button>
  </div>
  <script>
    async function getFox() {
      document.getElementById('fox-img').style.display = 'none';
      document.getElementById('load').style.display = 'block';
      try {
        const res = await fetch('https://randomfox.ca/floof/');
        const data = await res.json();
        document.getElementById('fox-img').src = data.image;
      } catch(e) { document.getElementById('load').innerText = 'Error'; }
    }
    getFox();
  <\/script>
</body>
</html>`
  },
  {
    icon: '💡', name: 'Tech Quotes', desc: 'Random programming jokes.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tech Quotes</title>
  <style>
    body { background: #1e293b; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: monospace; margin: 0; }
    .quote-box { background: #0f172a; border-left: 5px solid #3b82f6; padding: 40px; border-radius: 0 15px 15px 0; width: 350px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .text { font-size: 18px; line-height: 1.6; margin-bottom: 20px; color: #cbd5e1; }
    .author { color: #3b82f6; font-weight: bold; text-align: right; }
    button { margin-top: 30px; background: transparent; border: 1px solid #3b82f6; color: #3b82f6; padding: 10px 20px; cursor: pointer; transition: 0.2s; border-radius: 5px; }
    button:hover { background: #3b82f6; color: white; }
  </style>
</head>
<body>
  <div class="quote-box">
    <div class="text" id="quote">"Fetching logic..."</div>
    <div class="author" id="author">- Server</div>
    <button onclick="getQuote()">Next Joke</button>
  </div>
  <script>
    async function getQuote() {
      try {
        const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        const data = await res.json();
        document.getElementById('quote').innerText = '"' + data[0].setup + '"';
        document.getElementById('author').innerText = '- ' + data[0].punchline;
      } catch(e) {}
    }
    getQuote();
  <\/script>
</body>
</html>`
  },
  {
    icon: '📚', name: 'Dictionary', desc: 'Real-time English dictionary.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dictionary</title>
  <style>
    body { background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: serif; margin: 0; }
    .card { background: white; padding: 30px; border-radius: 12px; width: 300px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-size: 16px; margin-bottom: 10px; font-family: sans-serif; outline: none; }
    button { background: #0f172a; color: white; border: none; padding: 10px; border-radius: 6px; width: 100%; cursor: pointer; font-weight: bold; margin-bottom: 20px; }
    h1 { margin: 0 0 5px; font-size: 28px; color: #1e293b; }
    .pos { font-style: italic; color: #3b82f6; font-size: 14px; margin-bottom: 15px; }
    .def { font-size: 16px; color: #334155; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <input type="text" id="word" value="serendipity">
    <button onclick="lookup()">Define</button>
    <h1 id="title">serendipity</h1>
    <div class="pos" id="pos">noun</div>
    <div class="def" id="def">the occurrence and development of events by chance in a happy or beneficial way.</div>
  </div>
  <script>
    async function lookup() {
      const w = document.getElementById('word').value;
      document.getElementById('title').innerText = '...';
      document.getElementById('def').innerText = '';
      try {
        const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + w);
        const data = await res.json();
        const entry = data[0];
        document.getElementById('title').innerText = entry.word;
        document.getElementById('pos').innerText = entry.meanings[0].partOfSpeech;
        document.getElementById('def').innerText = entry.meanings[0].definitions[0].definition;
      } catch(e) { document.getElementById('title').innerText = 'Not found'; document.getElementById('pos').innerText = ''; }
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '🗺️', name: 'Country Info', desc: 'Fetches country details by name.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>REST Countries</title>
  <style>
    body { background: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: white; padding: 30px; border-radius: 16px; width: 300px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
    input { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 10px; outline: none; }
    button { width: 100%; background: #10b981; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-bottom: 20px; }
    img { width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; display: none; margin-bottom: 15px; }
    h2 { margin: 0 0 10px; font-size: 20px; color: #1e293b; }
    .info { color: #64748b; font-size: 14px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <input type="text" id="cname" value="France">
    <button onclick="getCountry()">Search Country</button>
    <img id="flag" src="">
    <h2 id="name">Result...</h2>
    <div class="info" id="info"></div>
  </div>
  <script>
    async function getCountry() {
      const q = document.getElementById('cname').value;
      try {
        const res = await fetch('https://restcountries.com/v3.1/name/' + q);
        const data = await res.json();
        const c = data[0];
        document.getElementById('flag').style.display = 'block';
        document.getElementById('flag').src = c.flags.svg;
        document.getElementById('name').innerText = c.name.common;
        document.getElementById('info').innerHTML = 
          'Capital: <b>' + (c.capital ? c.capital[0] : 'N/A') + '</b><br>' +
          'Region: <b>' + c.region + '</b><br>' +
          'Pop: <b>' + c.population.toLocaleString() + '</b>';
      } catch(e) {}
    }
    getCountry();
  <\/script>
</body>
</html>`
  },
  {
    icon: '🎵', name: 'iTunes Search', desc: 'Searches songs on Apple Music.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>iTunes Search</title>
  <style>
    body { background: #18181b; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .app { background: #27272a; padding: 20px; border-radius: 16px; width: 350px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { display: flex; gap: 10px; margin-bottom: 20px; }
    input { flex: 1; padding: 10px; border-radius: 8px; border: none; outline: none; background: #3f3f46; color: white; }
    button { background: #ec4899; border: none; color: white; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .track { display: flex; align-items: center; gap: 15px; padding: 10px; background: #3f3f46; border-radius: 10px; margin-bottom: 10px; }
    img { width: 50px; height: 50px; border-radius: 8px; }
    .details { flex: 1; overflow: hidden; }
    .t-name { font-size: 14px; font-weight: bold; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; margin-bottom: 4px; }
    .a-name { font-size: 12px; color: #a1a1aa; }
  </style>
</head>
<body>
  <div class="app">
    <div class="header">
      <input type="text" id="query" value="Daft Punk">
      <button onclick="search()">Search</button>
    </div>
    <div id="results"></div>
  </div>
  <script>
    async function search() {
      const q = document.getElementById('query').value;
      const resDiv = document.getElementById('results');
      resDiv.innerHTML = 'Searching...';
      try {
        const res = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(q) + '&limit=3');
        const data = await res.json();
        resDiv.innerHTML = '';
        if(data.results.length === 0) resDiv.innerHTML = 'No results.';
        data.results.forEach(t => {
          resDiv.innerHTML += 
            '<div class="track">' +
              '<img src="' + t.artworkUrl100 + '">' +
              '<div class="details">' +
                '<div class="t-name">' + t.trackName + '</div>' +
                '<div class="a-name">' + t.artistName + '</div>' +
              '</div>' +
            '</div>';
        });
      } catch(e) {}
    }
    search();
  <\/script>
</body>
</html>`
  }
];

// =======================
// DATA: Motion FX
// =======================
const MOTION_FX = [
  {
    icon: '🧲', name: 'Magnetic Button', desc: 'Button that follows mouse cursor.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Magnetic Button</title>
  <style>
    body { background: #111; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .magnet {
      padding: 20px 40px;
      font-size: 1.2rem;
      background: #f43f5e;
      color: white;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.1s ease-out;
      box-shadow: 0 10px 30px rgba(244,63,94,0.3);
    }
  </style>
</head>
<body>
  <button class="magnet" id="btn">Hover Me</button>

  <script>
    const btn = document.getElementById('btn');
    
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move button slightly towards cursor
      btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });
    
    btn.addEventListener('mouseleave', () => {
      // Reset position with a spring effect via CSS transition
      btn.style.transform = 'translate(0px, 0px)';
    });
  <\/script>
</body>
</html>`
  },
  {
    icon: '🌀', name: 'Hypnotic Loader', desc: 'CSS only advanced loading animation.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Loader</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .loader {
      width: 100px;
      height: 100px;
      border: 5px solid transparent;
      border-top-color: #3b82f6;
      border-bottom-color: #8b5cf6;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
      position: relative;
    }
    .loader::before {
      content: '';
      position: absolute;
      top: 10px; left: 10px; right: 10px; bottom: 10px;
      border: 5px solid transparent;
      border-left-color: #10b981;
      border-right-color: #f59e0b;
      border-radius: 50%;
      animation: spin-reverse 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>`
  }
];

// =======================
// DATA: DataViz
// =======================
const DATA_VIZ = [
  {
    icon: '🥧', name: 'Canvas Pie Chart', desc: 'Pure JS Canvas Pie Chart with animations.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Canvas Pie</title>
  <style>
    body { background: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
    .wrapper { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h2 style="margin-bottom:20px;color:#1e293b;">Market Share</h2>
    <canvas id="chart" width="300" height="300"></canvas>
  </div>

  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    const data = [30, 50, 20];
    const colors = ['#f43f5e', '#3b82f6', '#10b981'];
    
    let total = data.reduce((a,b)=>a+b, 0);
    let startAngle = -0.5 * Math.PI;
    
    // Draw slices
    data.forEach((val, i) => {
      let sliceAngle = (val / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(150, 150); // center
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = colors[i];
      ctx.fill();
      
      startAngle += sliceAngle;
    });
    
    // Donut hole
    ctx.beginPath();
    ctx.arc(150, 150, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  <\/script>
</body>
</html>`
  }
];

// =======================
// DATA: Web3 Crypto
// =======================
const WEB3_UI = [
  {
    icon: '🦊', name: 'Wallet Connect', desc: 'Modern Web3 Wallet connection UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web3 Connect</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .modal { background: #1e293b; width: 350px; border-radius: 24px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h2 { color: white; text-align: center; margin-bottom: 20px; }
    .wallet-btn {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; padding: 15px 20px; margin-bottom: 15px;
      background: #0f172a; border: 1px solid #334155; border-radius: 16px;
      color: white; font-weight: bold; cursor: pointer; transition: 0.2s;
    }
    .wallet-btn:hover { border-color: #3b82f6; background: rgba(59,130,246,0.1); }
    .icon { font-size: 24px; }
  </style>
</head>
<body>
  <div class="modal">
    <h2>Connect Wallet</h2>
    <button class="wallet-btn" onclick="connect()">
      <span>MetaMask</span> <span class="icon">🦊</span>
    </button>
    <button class="wallet-btn" onclick="connect()">
      <span>Phantom</span> <span class="icon">👻</span>
    </button>
    <button class="wallet-btn" onclick="connect()">
      <span>WalletConnect</span> <span class="icon">🔗</span>
    </button>
    <p id="status" style="color:#10b981;text-align:center;margin-top:10px;font-size:14px;"></p>
  </div>
  
  <script>
    function connect() {
      const s = document.getElementById('status');
      s.innerText = 'Connecting...';
      s.style.color = '#f59e0b';
      
      setTimeout(() => {
        s.innerText = '✅ Wallet Connected (0x7A...3f1)';
        s.style.color = '#10b981';
      }, 1500);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '🖼️', name: 'NFT Minting', desc: 'Animated NFT minting interface.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NFT Mint</title>
  <style>
    body { background: #000; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .card { background: #111; padding: 20px; border-radius: 20px; border: 1px solid #333; text-align: center; width: 320px; box-shadow: 0 0 50px rgba(139,92,246,0.2); }
    .nft-art { width: 100%; height: 300px; border-radius: 12px; background: linear-gradient(45deg, #f43f5e, #8b5cf6, #3b82f6); animation: spin 5s infinite linear; margin-bottom: 20px; }
    @keyframes spin { 100% { filter: hue-rotate(360deg); } }
    h2 { margin: 0 0 10px; font-size: 24px; }
    .stats { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; color: #aaa; }
    .bar-bg { background: #333; height: 10px; border-radius: 5px; margin-bottom: 20px; overflow: hidden; }
    .bar-fill { background: #8b5cf6; height: 100%; width: 65%; }
    button { background: #8b5cf6; color: white; border: none; padding: 15px; border-radius: 10px; font-weight: bold; font-size: 16px; width: 100%; cursor: pointer; transition: 0.2s; }
    button:hover { background: #a78bfa; box-shadow: 0 0 20px #8b5cf6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="nft-art"></div>
    <h2>Cosmic Genesis #402</h2>
    <div class="stats">
      <span>Price: 0.05 ETH</span>
      <span>Minted: 650/1000</span>
    </div>
    <div class="bar-bg"><div class="bar-fill"></div></div>
    <button onclick="mint(this)">Mint NFT</button>
  </div>
  <script>
    function mint(btn) {
      btn.innerText = 'Minting...';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.innerText = 'Successfully Minted!';
        btn.style.background = '#10b981';
      }, 2000);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '💱', name: 'Token Swap UI', desc: 'Uniswap-style decentralized exchange widget.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Token Swap</title>
  <style>
    body { background: #1e1e24; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .swap-box { background: #2b2b36; padding: 20px; border-radius: 24px; width: 340px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); border: 1px solid #3f3f4e; }
    .header { display: flex; justify-content: space-between; color: white; font-weight: bold; margin-bottom: 20px; font-size: 18px; }
    .input-group { background: #1e1e24; border-radius: 16px; padding: 15px; margin-bottom: 10px; border: 1px solid #3f3f4e; }
    .label { color: #8a8a9e; font-size: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; }
    .row { display: flex; justify-content: space-between; align-items: center; }
    input { background: transparent; border: none; color: white; font-size: 24px; outline: none; width: 60%; }
    .token { background: #3f3f4e; color: white; padding: 5px 10px; border-radius: 20px; font-weight: bold; display: flex; align-items: center; gap: 5px; }
    .arrow { text-align: center; color: #8a8a9e; font-size: 20px; margin: -10px 0; z-index: 10; position: relative; }
    button { background: #ec4899; color: white; border: none; padding: 16px; border-radius: 16px; font-size: 18px; font-weight: bold; width: 100%; margin-top: 10px; cursor: pointer; transition: 0.2s; }
    button:hover { background: #f472b6; }
  </style>
</head>
<body>
  <div class="swap-box">
    <div class="header"><span>Swap</span><span>⚙️</span></div>
    <div class="input-group">
      <div class="label"><span>You pay</span><span>Balance: 1.45</span></div>
      <div class="row">
        <input type="number" value="0.5">
        <div class="token">💠 ETH</div>
      </div>
    </div>
    <div class="arrow">↓</div>
    <div class="input-group">
      <div class="label"><span>You receive</span><span>Balance: 0.00</span></div>
      <div class="row">
        <input type="number" value="1542.30" readonly>
        <div class="token">💵 USDT</div>
      </div>
    </div>
    <button onclick="swap(this)">Swap Tokens</button>
  </div>
  <script>
    function swap(btn) {
      btn.innerText = 'Confirming in Wallet...';
      setTimeout(() => {
        btn.innerText = 'Swap Successful ✅';
        btn.style.background = '#10b981';
      }, 2000);
    }
  <\/script>
</body>
</html>`
  },
  {
    icon: '⛽', name: 'Gas Tracker', desc: 'Ethereum network gas fee dashboard.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gas Tracker</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .dashboard { background: #1e293b; padding: 30px; border-radius: 20px; width: 350px; text-align: center; border: 1px solid #334155; }
    h2 { color: white; margin: 0 0 20px; }
    .gwei { font-size: 48px; color: #38bdf8; font-weight: bold; margin-bottom: 30px; text-shadow: 0 0 20px rgba(56,189,248,0.5); }
    .cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .card { background: #0f172a; padding: 15px 5px; border-radius: 12px; border: 1px solid #334155; }
    .type { color: #94a3b8; font-size: 12px; margin-bottom: 5px; text-transform: uppercase; }
    .val { color: white; font-size: 18px; font-weight: bold; }
    .val.slow { color: #10b981; } .val.avg { color: #f59e0b; } .val.fast { color: #ef4444; }
  </style>
</head>
<body>
  <div class="dashboard">
    <h2>⛽ Live ETH Gas</h2>
    <div class="gwei" id="main">24 Gwei</div>
    <div class="cards">
      <div class="card">
        <div class="type">Slow</div><div class="val slow" id="slow">22</div>
      </div>
      <div class="card">
        <div class="type">Normal</div><div class="val avg" id="avg">24</div>
      </div>
      <div class="card">
        <div class="type">Fast</div><div class="val fast" id="fast">28</div>
      </div>
    </div>
  </div>
  <script>
    setInterval(() => {
      const base = Math.floor(Math.random() * 20) + 15;
      document.getElementById('main').innerText = (base+2) + ' Gwei';
      document.getElementById('slow').innerText = base;
      document.getElementById('avg').innerText = base+2;
      document.getElementById('fast').innerText = base+6;
    }, 2000);
  <\/script>
</body>
</html>`
  },
  {
    icon: '📊', name: 'Crypto Portfolio', desc: 'Decentralized asset tracking UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portfolio</title>
  <style>
    body { background: #111827; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .app { background: #1f2937; border-radius: 24px; padding: 30px; width: 320px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .balance-title { color: #9ca3af; font-size: 14px; margin-bottom: 5px; text-align: center; }
    .balance { font-size: 40px; font-weight: bold; text-align: center; margin-bottom: 30px; }
    .asset { display: flex; align-items: center; justify-content: space-between; background: #374151; padding: 15px; border-radius: 16px; margin-bottom: 10px; }
    .asset-info { display: flex; align-items: center; gap: 10px; }
    .icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; }
    .eth { background: #627eea; color: white; }
    .sol { background: #14f195; color: black; }
    .usdc { background: #2775ca; color: white; }
    .name { font-weight: bold; font-size: 16px; margin-bottom: 2px; }
    .amt { color: #9ca3af; font-size: 12px; }
    .value { font-weight: bold; text-align: right; }
    .change { font-size: 12px; color: #10b981; }
  </style>
</head>
<body>
  <div class="app">
    <div class="balance-title">Total Balance</div>
    <div class="balance">$12,450.80</div>
    
    <div class="asset">
      <div class="asset-info">
        <div class="icon eth">Ξ</div>
        <div><div class="name">Ethereum</div><div class="amt">2.5 ETH</div></div>
      </div>
      <div>
        <div class="value">$8,050.00</div><div class="change">+5.2%</div>
      </div>
    </div>
    
    <div class="asset">
      <div class="asset-info">
        <div class="icon sol">S</div>
        <div><div class="name">Solana</div><div class="amt">145 SOL</div></div>
      </div>
      <div>
        <div class="value">$3,400.80</div><div class="change">+12.4%</div>
      </div>
    </div>

    <div class="asset">
      <div class="asset-info">
        <div class="icon usdc">$</div>
        <div><div class="name">USDC</div><div class="amt">1000 USDC</div></div>
      </div>
      <div>
        <div class="value">$1,000.00</div><div class="change" style="color:#6b7280">0.0%</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    icon: '⚖️', name: 'DAO Voting', desc: 'Decentralized autonomous org voting UI.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DAO Vote</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }
    .vote-card { background: #1e293b; border-radius: 20px; padding: 30px; width: 350px; border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .tag { background: rgba(59,130,246,0.2); color: #3b82f6; padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; display: inline-block; }
    h2 { color: white; font-size: 20px; margin: 0 0 10px; line-height: 1.4; }
    p { color: #94a3b8; font-size: 14px; margin: 0 0 30px; }
    .option { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 15px; margin-bottom: 10px; cursor: pointer; color: white; font-weight: bold; display: flex; justify-content: space-between; transition: 0.2s; }
    .option:hover { border-color: #3b82f6; }
    .bar { height: 4px; background: #3b82f6; border-radius: 2px; margin-top: 10px; width: 0%; transition: 1s; }
  </style>
</head>
<body>
  <div class="vote-card">
    <div class="tag">Active Proposal</div>
    <h2>SIP-42: Increase Staking Rewards by 5%</h2>
    <p>Voting ends in 2 days. 1 Token = 1 Vote.</p>
    
    <div class="option" onclick="vote(this, 75)">
      <div>👍 Approve</div> <span class="perc"></span>
      <div class="bar" style="display:none"></div>
    </div>
    
    <div class="option" onclick="vote(this, 25)">
      <div>👎 Reject</div> <span class="perc"></span>
      <div class="bar" style="display:none; background:#ef4444;"></div>
    </div>
  </div>
  <script>
    let voted = false;
    function vote(el, val) {
      if(voted) return; voted = true;
      el.style.borderColor = '#10b981';
      document.querySelectorAll('.option').forEach(opt => {
        opt.style.display = 'block';
        const bar = opt.querySelector('.bar');
        bar.style.display = 'block';
        setTimeout(() => {
          if(opt === el) bar.style.width = val + '%';
          else bar.style.width = (100-val) + '%';
          opt.querySelector('.perc').innerText = (opt === el ? val : 100-val) + '%';
        }, 100);
      });
    }
  <\/script>
</body>
</html>`
  }
];

const AI_LAB = [
  { 
    icon: '🎙️', name: 'Voice Assistant UI', desc: 'Pulsing AI voice wave animation.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Voice</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .ai-box { text-align: center; }
    h2 { color: white; font-weight: 300; letter-spacing: 2px; margin-bottom: 40px; }
    .waves { display: flex; justify-content: center; align-items: center; gap: 8px; height: 100px; }
    .bar { width: 8px; border-radius: 4px; background: linear-gradient(180deg, #38bdf8, #818cf8, #c084fc); animation: pulse 1s ease-in-out infinite alternate; }
    .bar:nth-child(1) { height: 20px; animation-delay: 0.1s; }
    .bar:nth-child(2) { height: 50px; animation-delay: 0.3s; }
    .bar:nth-child(3) { height: 90px; animation-delay: 0.5s; }
    .bar:nth-child(4) { height: 40px; animation-delay: 0.2s; }
    .bar:nth-child(5) { height: 60px; animation-delay: 0.4s; }
    .bar:nth-child(6) { height: 30px; animation-delay: 0.1s; }
    @keyframes pulse { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
  </style>
</head>
<body>
  <div class="ai-box">
    <h2>LISTENING...</h2>
    <div class="waves">
      <div class="bar"></div><div class="bar"></div><div class="bar"></div>
      <div class="bar"></div><div class="bar"></div><div class="bar"></div>
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '💬', name: 'Neural Chat UI', desc: 'Modern GPT-style conversational interface.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Chat</title>
  <style>
    body { background: #343541; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .chat { width: 400px; height: 500px; background: #343541; border: 1px solid #565869; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .msgs { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
    .msg { display: flex; gap: 15px; color: #d1d5db; font-size: 15px; line-height: 1.5; }
    .msg.ai { background: #444654; padding: 15px; border-radius: 8px; margin: -15px -20px; padding: 20px; }
    .avatar { width: 30px; height: 30px; border-radius: 4px; display: flex; justify-content: center; align-items: center; font-size: 18px; flex-shrink: 0; }
    .user-av { background: #10a37f; color: white; }
    .ai-av { background: #facc15; }
    .input-area { padding: 20px; background: #343541; }
    .input-box { background: #40414f; border-radius: 8px; display: flex; padding: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    input { flex: 1; background: transparent; border: none; color: white; outline: none; font-size: 15px; }
    .type-indicator { display: flex; gap: 4px; margin-top: 10px; }
    .dot { width: 6px; height: 6px; background: #d1d5db; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
  </style>
</head>
<body>
  <div class="chat">
    <div class="msgs">
      <div class="msg">
        <div class="avatar user-av">U</div>
        <div>Can you write a viral React component?</div>
      </div>
      <div class="msg ai">
        <div class="avatar ai-av">🤖</div>
        <div>
          Absolutely! Here is a highly optimized, aesthetic React component...
          <div class="type-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <div class="input-box"><input type="text" placeholder="Send a message..."></div>
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '🎨', name: 'AI Image Generator', desc: 'Mockup of a diffusion image generation tool.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Image</title>
  <style>
    body { background: #18181b; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    .generator { width: 360px; background: #27272a; border-radius: 16px; padding: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid #3f3f46; }
    .prompt { background: #18181b; padding: 12px; border-radius: 8px; color: #a1a1aa; font-size: 13px; font-style: italic; margin-bottom: 20px; border: 1px solid #3f3f46; }
    .image-box { width: 100%; height: 260px; background: #18181b; border-radius: 12px; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; width: 100%; height: 100%; opacity: 0.2; }
    .grid div { background: #3f3f46; }
    .loader { position: absolute; display: flex; flex-direction: column; align-items: center; }
    .spinner { width: 40px; height: 40px; border: 4px solid #3f3f46; border-top-color: #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 10px; }
    .percent { color: #8b5cf6; font-weight: bold; font-size: 20px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .btn { background: #8b5cf6; color: white; width: 100%; padding: 12px; border: none; border-radius: 8px; margin-top: 20px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="generator">
    <div class="prompt">"A futuristic cyberpunk city with neon lights, unreal engine 5, 8k resolution --v 5.2"</div>
    <div class="image-box">
      <div class="grid"><div></div><div></div><div></div><div></div></div>
      <div class="loader">
        <div class="spinner"></div>
        <div class="percent" id="perc">0%</div>
      </div>
    </div>
    <button class="btn">Generating...</button>
  </div>
  <script>
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 10);
      if(p > 99) p = 99;
      document.getElementById('perc').innerText = p + '%';
    }, 300);
  <\/script>
</body>
</html>` 
  },
  { 
    icon: '👁️', name: 'Biometric Scanner', desc: 'Cyberpunk face scanning UI.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scanner</title>
  <style>
    body { background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Courier New', monospace; }
    .scanner { width: 300px; height: 400px; border: 2px solid #0ea5e9; position: relative; overflow: hidden; background: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop') center/cover; }
    .scanner::before { content:''; position:absolute; width:100%; height:100%; background: rgba(14,165,233,0.2); z-index:1; }
    .line { position: absolute; width: 100%; height: 2px; background: #0ea5e9; box-shadow: 0 0 10px #0ea5e9, 0 0 20px #0ea5e9; animation: scan 3s linear infinite; z-index: 2; }
    .box { position: absolute; border: 2px solid #38bdf8; width: 120px; height: 120px; top: 120px; left: 90px; z-index: 2; }
    .box::after, .box::before { content:''; position:absolute; width:10px; height:10px; }
    .box::before { top:-2px; left:-2px; border-top:2px solid #fff; border-left:2px solid #fff; }
    .box::after { bottom:-2px; right:-2px; border-bottom:2px solid #fff; border-right:2px solid #fff; }
    .data { position: absolute; bottom: 20px; left: 20px; color: #38bdf8; font-size: 14px; z-index: 3; text-shadow: 0 0 5px #0ea5e9; }
    @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
  </style>
</head>
<body>
  <div class="scanner">
    <div class="line"></div>
    <div class="box"></div>
    <div class="data">
      > MATCH FOUND<br>
      > ID: 409-B<br>
      > STATUS: ACTIVE
    </div>
  </div>
</body>
</html>` 
  },
  { 
    icon: '🧠', name: 'Neural Core', desc: 'Interactive Neural Network visualizer.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neural</title>
  <style>
    body { background: #000; margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    let nodes = [];
    for(let i=0; i<80; i++) {
      nodes.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        vx: (Math.random()-0.5)*2,
        vy: (Math.random()-0.5)*2
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      for(let i=0; i<nodes.length; i++) {
        let n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > cvs.width) n.vx *= -1;
        if(n.y < 0 || n.y > cvs.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        for(let j=i+1; j<nodes.length; j++) {
          let n2 = nodes[j];
          let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if(dist < 100) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = \`rgba(16, 185, 129, \${1 - dist/100})\`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  <\/script>
</body>
</html>` 
  }
];
const MOBILE_OS = [
  { 
    icon: '📱', name: 'iOS 17 Lock Screen', desc: 'iPhone replica with glassmorphism notifications.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>iOS Lock Screen</title>
  <style>
    body { background: #1a1a1a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .phone { width: 320px; height: 650px; background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop') center/cover; border-radius: 40px; border: 10px solid #000; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 30px; background: #000; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }
    .time { text-align: center; margin-top: 60px; color: white; font-weight: 200; }
    .time h1 { font-size: 70px; margin: 0; letter-spacing: -2px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .time p { margin: 0; font-size: 16px; font-weight: 500; }
    .notifications { position: absolute; bottom: 50px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .notif { width: 85%; background: rgba(255,255,255,0.2); backdrop-filter: blur(15px); padding: 15px; border-radius: 20px; color: white; animation: slideUp 0.5s ease-out; border: 1px solid rgba(255,255,255,0.1); }
    .notif h4 { margin: 0 0 5px; font-size: 14px; display: flex; justify-content: space-between; }
    .notif p { margin: 0; font-size: 14px; opacity: 0.9; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div class="phone">
    <div class="notch"></div>
    <div class="time">
      <p>Wednesday, October 18</p>
      <h1>09:41</h1>
    </div>
    <div class="notifications">
      <div class="notif">
        <h4><span>💬 Messages</span> <span style="opacity:0.5">now</span></h4>
        <p>You: "This IDE is amazing! 🔥"</p>
      </div>
      <div class="notif" style="animation-delay: 0.2s">
        <h4><span>📸 Instagram</span> <span style="opacity:0.5">2m ago</span></h4>
        <p>Someone liked your reel.</p>
      </div>
    </div>
  </div>
</body>
</html>` 
  }
];
const FINTECH = [
  { 
    icon: '💳', name: '3D Platinum Card', desc: 'Hover to flip holographic bank card.', 
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3D Card</title>
  <style>
    body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; perspective: 1000px; }
    .card-container { width: 350px; height: 220px; position: relative; transition: transform 0.8s; transform-style: preserve-3d; cursor: pointer; }
    .card-container:hover { transform: rotateY(180deg); }
    .card-face { position: absolute; width: 100%; height: 100%; border-radius: 20px; backface-visibility: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); padding: 25px; box-sizing: border-box; color: white; display: flex; flex-direction: column; justify-content: space-between; }
    .front { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); }
    .front::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%); border-radius: 20px; }
    .back { background: #0f172a; transform: rotateY(180deg); border: 1px solid rgba(255,255,255,0.1); padding: 0; }
    .chip { width: 50px; height: 35px; background: linear-gradient(135deg, #fbbf24, #d97706); border-radius: 8px; margin-bottom: 20px; position: relative; z-index: 2; }
    .number { font-size: 24px; letter-spacing: 4px; font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 2; position: relative; }
    .details { display: flex; justify-content: space-between; z-index: 2; position: relative; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; }
    .stripe { background: #000; height: 40px; width: 100%; margin-top: 30px; }
    .cvv { background: white; color: black; margin: 20px; padding: 10px; text-align: right; font-style: italic; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card-face front">
      <div style="text-align:right; font-weight:bold; font-size:18px; z-index:2; position:relative;">PLATINUM</div>
      <div class="chip"></div>
      <div class="number">4000 1234 5678 9010</div>
      <div class="details">
        <span>Alexandru Dev</span>
        <span>12/28</span>
      </div>
    </div>
    <div class="card-face back">
      <div class="stripe"></div>
      <div class="cvv">123</div>
      <div style="padding: 20px; font-size:10px; color:#64748b; text-align:center;">This card is property of IA Architecte. Found cards must be returned to the nearest branch.</div>
    </div>
  </div>
</body>
</html>` 
  }
];


// =======================
// Core Engine
// =======================
let isPremiumTyping = false;
function injectPremiumCode(code, cinematic, statusEl) {
  if (!window.editor) return;
  
  if (!cinematic) {
    window.editor.setValue(code);
    if (window.runPreview) window.runPreview();
    if(statusEl) {
      statusEl.textContent = '✅ Injected!';
      setTimeout(() => statusEl.textContent = '', 2000);
    }
    return;
  }

  // Cinematic Typing
  if (isPremiumTyping) return;
  isPremiumTyping = true;
  var lines = code.split('\n');
  var currentCode = '';
  var index = 0;
  
  if(statusEl) statusEl.textContent = '🤖 AI is writing code...';
  
  function typeNextLine() {
    if (index < lines.length) {
      currentCode += lines[index] + (index === lines.length - 1 ? '' : '\n');
      window.editor.setValue(currentCode);
      
      try {
         var lineCount = window.editor.getModel().getLineCount();
         window.editor.revealLine(lineCount);
      } catch(e){}
      
      index++;
      var delay = 80;
      if (lines[index-1]) {
         if (lines[index-1].length > 40) delay = 150;
         if (lines[index-1].trim() === '') delay = 20;
      }
      
      setTimeout(typeNextLine, delay);
    } else {
      if (window.runPreview) window.runPreview();
      if(statusEl) {
        statusEl.textContent = '✅ Generated!';
        setTimeout(() => statusEl.textContent = '', 2000);
      }
      isPremiumTyping = false;
    }
  }
  
  typeNextLine();
}

function renderPremiumGenericTab(dataArray, title, subtitle, colorPrimary, colorSecondary) {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  
  var hdr = document.createElement('div');
  hdr.style.cssText = `padding:12px 14px 8px;border-bottom:1px solid rgba(${colorPrimary},0.25);flex-shrink:0;`;
  hdr.innerHTML = `<div style="font-size:15px;font-weight:900;color:rgb(${colorPrimary});">${title}</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;line-height:1.4;">${subtitle}</div>`;
  wrap.appendChild(hdr);
  
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;font-weight:bold;margin-bottom:5px;';
  body.appendChild(statusEl);

  dataArray.forEach(function (item) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:12px;padding:15px;display:flex;align-items:center;gap:12px;transition:all 0.2s;';
    card.onmouseenter = function() { card.style.borderColor = `rgb(${colorPrimary})`; card.style.transform = 'translateY(-2px)'; };
    card.onmouseleave = function() { card.style.borderColor = '#334155'; card.style.transform = 'translateY(0)'; };

    var iconBox = document.createElement('div');
    iconBox.style.cssText = `font-size:24px;width:40px;height:40px;background:rgba(${colorPrimary},0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;`;
    iconBox.textContent = item.icon;
    
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    info.innerHTML = `<div style="font-size:13px;font-weight:800;color:#e2e8f0;margin-bottom:4px;">${item.name}</div><div style="font-size:10px;color:#94a3b8;line-height:1.3;">${item.desc}</div>`;

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:5px;flex-shrink:0;';

    var btnType = document.createElement('button');
    btnType.innerHTML = '🎬';
    btnType.title = "Cinematic Generate";
    btnType.style.cssText = `background:linear-gradient(135deg,rgb(${colorSecondary}),rgb(${colorPrimary}));border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;`;
    btnType.onclick = function() { injectPremiumCode(item.code, true, statusEl); };

    var btn = document.createElement('button');
    btn.textContent = '⚡';
    btn.title = "Instant Generate";
    btn.style.cssText = `background:linear-gradient(135deg,rgb(${colorPrimary}),rgb(${colorSecondary}));border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;`;
    btn.onclick = function() { injectPremiumCode(item.code, false, statusEl); };

    actions.appendChild(btnType);
    actions.appendChild(btn);

    card.appendChild(iconBox);
    card.appendChild(info);
    card.appendChild(actions);
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  // Translate tabs
  const origApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof origApplyLang === 'function') origApplyLang();
    // Labels are already set in HTML, just re-render active if needed
    if(window.activeTab === 'uiblocks') window.renderTab('uiblocks');
    if(window.activeTab === 'apihub') window.renderTab('apihub');
    if(window.activeTab === 'motionfx') window.renderTab('motionfx');
    if(window.activeTab === 'dataviz') window.renderTab('dataviz');
    if(window.activeTab === 'web3ui') window.renderTab('web3ui');
    if(window.activeTab === 'ailab') window.renderTab('ailab');
    if(window.activeTab === 'mobileos') window.renderTab('mobileos');
    if(window.activeTab === 'fintech') window.renderTab('fintech');
  };

  // Intercept renderTab
  const origRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    const customTabs = ['uiblocks', 'apihub', 'motionfx', 'dataviz', 'web3ui', 'ailab', 'mobileos', 'fintech'];
    if (customTabs.includes(tab)) {
      window.activeTab = tab;
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const tBtn = document.getElementById('tab-' + tab);
      if (tBtn) tBtn.classList.add('active');
      
      const l = window.lang || 'en';
      
      if (tab === 'uiblocks') {
        renderPremiumGenericTab(UI_BLOCKS, '🧩 UI Blocks', 
          l==='fr' ? "Générez des composants d'interface modernes." : 'Generate modern UI components like Lego blocks.', 
          '129, 140, 248', '99, 102, 241'); // Indigo
      }
      if (tab === 'apihub') {
        renderPremiumGenericTab(API_HUB, '🌍 Live API Hub', 
          l==='fr' ? 'Applications connectées aux données en temps réel.' : 'Apps connected to real-time internet data via fetch.', 
          '52, 211, 153', '16, 185, 129'); // Emerald
      }
      if (tab === 'motionfx') {
        renderPremiumGenericTab(MOTION_FX, '🪄 Motion FX', 
          l==='fr' ? "Laboratoire d'animations CSS et JavaScript." : 'CSS & JavaScript animation laboratory.', 
          '244, 114, 182', '236, 72, 153'); // Pink
      }
      if (tab === 'dataviz') {
        renderPremiumGenericTab(DATA_VIZ, '📊 DataViz', 
          l==='fr' ? 'Générateur de graphiques HTML Canvas.' : 'HTML Canvas chart and dashboard generator.', 
          '56, 189, 248', '14, 165, 233'); // Sky
      }
      if (tab === 'web3ui') {
        renderPremiumGenericTab(WEB3_UI, '🧬 Web3 Crypto', 
          l==='fr' ? 'Interfaces décentralisées et Crypto.' : 'Decentralized interfaces and Crypto wallets.', 
          '251, 191, 36', '245, 158, 11'); // Amber
      }
      if (tab === 'ailab') {
        renderPremiumGenericTab(AI_LAB, '🤖 AI Lab', 
          l==='fr' ? "Interfaces d'Intelligence Artificielle." : 'Artificial Intelligence UI interfaces.', 
          '52, 211, 153', '16, 185, 129'); // Emerald
      }

      if (tab === 'mobileos') {
        renderPremiumGenericTab(MOBILE_OS, '📱 Mobile Clones', 
          l==='fr' ? "Répliques d'interfaces mobiles." : 'Mobile OS interface replicas.', 
          '56, 189, 248', '14, 165, 233'); // Sky
      }
      if (tab === 'fintech') {
        renderPremiumGenericTab(FINTECH, '💳 FinTech & Banking', 
          l==='fr' ? 'Applications financières et bancaires.' : 'Financial and banking applications.', 
          '251, 191, 36', '245, 158, 11'); // Amber
      }
      return;
    }
    
    if (typeof origRenderTab === 'function') origRenderTab(tab);
  };
});

})();
