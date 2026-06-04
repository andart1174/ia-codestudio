(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 📡 WEBRTC STREAMER STUDIO — Real P2P Streaming & Filters
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>P2P Streamer & Live Canvas Filters</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --card-bg: #0b1329;
      --card-border: #1f293d;
      --accent: #ec4899;
      --accent-hover: #db2777;
      --text: #f9fafb;
      --text-muted: #9ca3af;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 850px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
    }
    h1 {
      margin: 0 0 4px 0;
      font-size: 24px;
      font-weight: 900;
      color: var(--accent);
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    p.sub {
      margin: 0 0 24px 0;
      font-size: 13px;
      color: var(--text-muted);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 1.2fr 0.8fr;
      }
    }
    .video-card {
      background: #020617;
      border: 1px solid var(--card-border);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      aspect-ratio: 16/9;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
    }
    video, canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(236, 72, 153, 0.2);
      border: 1px solid var(--accent);
      color: var(--accent);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      z-index: 5;
    }
    .panel {
      background: rgba(255,255,255,0.01);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
    }
    h3 {
      margin: 0 0 12px 0;
      font-size: 13px;
      text-transform: uppercase;
      color: var(--accent);
      letter-spacing: 0.5px;
      font-weight: 700;
    }
    .btn-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 16px;
    }
    button {
      font-family: inherit;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      outline: none;
    }
    button.btn-primary {
      background: linear-gradient(90deg, var(--accent), #a78bfa);
      border: none;
      color: #000;
      padding: 12px;
      font-weight: 900;
      box-shadow: 0 4px 12px rgba(236,72,153,0.3);
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(236,72,153,0.4);
    }
    button.btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      color: var(--text);
      padding: 12px;
    }
    button.btn-secondary:hover {
      background: #334155;
    }
    .filter-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .filter-btn {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 8px;
      font-size: 11px;
    }
    .filter-btn.active {
      background: rgba(236,72,153,0.1);
      border-color: var(--accent);
      color: var(--accent);
    }
    .p2p-wrap {
      margin-top: 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
    }
    textarea {
      width: 100%;
      height: 80px;
      background: #020617;
      border: 1px solid var(--card-border);
      color: #818cf8;
      padding: 8px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      resize: none;
      box-sizing: border-box;
      outline: none;
      margin-bottom: 10px;
    }
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent);
      color: #000;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      display: none;
      z-index: 100;
      box-shadow: 0 8px 20px rgba(236,72,153,0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📡 Live P2P Streamer & Canvas FX</h1>
    <p class="sub">WebRTC peer-to-peer transmission & real-time client canvas shaders</p>

    <div class="grid">
      <div class="video-card">
        <span class="badge" id="stream-status">Offline</span>
        <video id="localVideo" autoplay playsinline muted style="display:none;"></video>
        <canvas id="filterCanvas"></canvas>
      </div>

      <div class="panel">
        <h3>📹 Video Capture</h3>
        <div class="btn-group">
          <button class="btn-primary" id="startCamBtn">📸 Camera</button>
          <button class="btn-secondary" id="startScreenBtn">🖥️ Screen</button>
        </div>

        <h3>🎨 Canvas Filters</h3>
        <div class="filter-grid">
          <button class="filter-btn active" data-filter="none">Normal</button>
          <button class="filter-btn" data-filter="neon">Neon Cyber</button>
          <button class="filter-btn" data-filter="vhs">VHS Glitch</button>
          <button class="filter-btn" data-filter="matrix">Matrix Code</button>
        </div>
      </div>
    </div>

    <div class="p2p-wrap">
      <h3>📡 WebRTC P2P Signaling (No Server)</h3>
      <div class="btn-group">
        <button class="btn-primary" id="createOfferBtn">1. Generate P2P Offer</button>
        <button class="btn-secondary" id="connectBtn">2. Accept Answer</button>
      </div>
      <label style="font-size:10px;color:var(--text-muted);display:block;margin-bottom:4px;">SDP Token Exchange Area:</label>
      <textarea id="sdpBox" placeholder="Paste remote SDP offer or answer token here..."></textarea>
      <button class="btn-secondary" id="clearBtn" style="width:100%;">Clear Token</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const localVideo = document.getElementById('localVideo');
    const filterCanvas = document.getElementById('filterCanvas');
    const ctx = filterCanvas.getContext('2d');
    const streamStatus = document.getElementById('stream-status');
    const sdpBox = document.getElementById('sdpBox');
    const toast = document.getElementById('toast');

    let activeStream = null;
    let activeFilter = 'none';
    let animationId = null;
    let peerConnection = null;

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    async function initStream(getMediaFn) {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
      try {
        activeStream = await getMediaFn();
        localVideo.srcObject = activeStream;
        localVideo.play();
        streamStatus.textContent = 'Streaming';
        streamStatus.style.borderColor = '#10b981';
        streamStatus.style.color = '#34d399';
        showToast('Stream started successfully!');
        startFilterLoop();
      } catch (err) {
        console.error(err);
        showToast('Error capturing stream.');
      }
    }

    document.getElementById('startCamBtn').addEventListener('click', () => {
      initStream(() => navigator.mediaDevices.getUserMedia({ video: true, audio: false }));
    });

    document.getElementById('startScreenBtn').addEventListener('click', () => {
      initStream(() => navigator.mediaDevices.getDisplayMedia({ video: true }));
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeFilter = e.target.getAttribute('data-filter');
      });
    });

    function startFilterLoop() {
      if (animationId) cancelAnimationFrame(animationId);
      
      function drawFrame() {
        if (!activeStream) return;
        if (localVideo.paused || localVideo.ended) return;

        if (filterCanvas.width !== localVideo.videoWidth) {
          filterCanvas.width = localVideo.videoWidth || 640;
          filterCanvas.height = localVideo.videoHeight || 360;
        }

        ctx.drawImage(localVideo, 0, 0, filterCanvas.width, filterCanvas.height);
        
        if (activeFilter !== 'none') {
          const imgData = ctx.getImageData(0, 0, filterCanvas.width, filterCanvas.height);
          const d = imgData.data;

          if (activeFilter === 'neon') {
            for (let i = 0; i < d.length; i += 4) {
              let r = d[i], g = d[i+1], b = d[i+2];
              d[i] = r > 100 ? 255 : 0;
              d[i+1] = g < 80 ? 0 : 255;
              d[i+2] = b > 120 ? 255 : 0;
            }
          } else if (activeFilter === 'vhs') {
            for (let i = 0; i < d.length; i += 4) {
              if (Math.random() < 0.05) {
                d[i] = 255; d[i+1] = 0; d[i+2] = 255;
              } else {
                d[i] = d[i+4] || d[i];
                d[i+1] = d[i+1];
                d[i+2] = d[i-4] || d[i+2];
              }
            }
          } else if (activeFilter === 'matrix') {
            for (let i = 0; i < d.length; i += 4) {
              let gray = (d[i] + d[i+1] + d[i+2]) / 3;
              d[i] = 0;
              d[i+1] = gray > 80 ? Math.min(255, gray * 1.5) : 0;
              d[i+2] = 0;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        animationId = requestAnimationFrame(drawFrame);
      }
      drawFrame();
    }

    // WebRTC connection logic
    const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

    document.getElementById('createOfferBtn').addEventListener('click', async () => {
      peerConnection = new RTCPeerConnection(rtcConfig);
      if (activeStream) {
        activeStream.getTracks().forEach(track => peerConnection.addTrack(track, activeStream));
      }
      
      peerConnection.onicecandidate = e => {
        if (!e.candidate) {
          sdpBox.value = btoa(JSON.stringify(peerConnection.localDescription));
          sdpBox.select();
          document.execCommand('copy');
          showToast('Offer created & copied to clipboard!');
        }
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
    });

    document.getElementById('connectBtn').addEventListener('click', async () => {
      const rawSdp = sdpBox.value.trim();
      if (!rawSdp) { showToast('Please paste a P2P token first.'); return; }
      
      try {
        const sdp = JSON.parse(atob(rawSdp));
        if (!peerConnection) {
          peerConnection = new RTCPeerConnection(rtcConfig);
          peerConnection.ontrack = e => {
            localVideo.srcObject = e.streams[0];
            localVideo.play();
            startFilterLoop();
            streamStatus.textContent = 'Remote Connected';
            streamStatus.style.borderColor = '#10b981';
          };
          await peerConnection.setRemoteDescription(sdp);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          sdpBox.value = btoa(JSON.stringify(peerConnection.localDescription));
          showToast('Answer created! Send this back to Offer side.');
        } else {
          await peerConnection.setRemoteDescription(sdp);
          showToast('P2P connection established!');
        }
      } catch (err) {
        showToast('Invalid SDP Token.');
      }
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
      sdpBox.value = '';
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: 'WEBRTC STREAMER & CANVAS FX',
      sub: 'Real Client-side P2P Streaming & Live Filters',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!',
      videoCap: '📹 Video Capture Controls',
      camBtn: '📸 Camera',
      screenBtn: '🖥️ Screen',
      filters: '🎨 Real-time Canvas Filters',
      none: 'Normal',
      neon: 'Cyber Neon',
      vhs: 'VHS Glitch',
      matrix: 'Matrix Code',
      statusOffline: 'Offline',
      statusStreaming: 'Live',
      statusErr: 'Error capturing media',
      toastStarted: '✅ Stream started successfully!',
      p2pHdr: '📡 P2P WebRTC Connection (No Server)',
      p2pOffer: '1. Generate Offer & Copy',
      p2pAccept: '2. Accept Token',
      labelSdp: 'SDP Exchange token:',
      copied: '✅ Offer copied to clipboard!',
      connected: '✅ Connection established!',
      invalidToken: '❌ Invalid Token.'
    },
    fr: {
      title: 'STREAMER WEBRTC & EFFETS CANVAS',
      sub: 'Streaming P2P réel & Filtres Canvas en direct',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!',
      videoCap: '📹 Contrôles de capture vidéo',
      camBtn: '📸 Caméra Web',
      screenBtn: '🖥️ Partager l\'écran',
      filters: '🎨 Filtres Canvas en temps réel',
      none: 'Normal',
      neon: 'Cyber Néon',
      vhs: 'Effet VHS',
      matrix: 'Code Matrix',
      statusOffline: 'Hors-ligne',
      statusStreaming: 'En direct',
      statusErr: 'Erreur de capture',
      toastStarted: '✅ Capture démarrée !',
      p2pHdr: '📡 Connexion P2P WebRTC (Sans Serveur)',
      p2pOffer: '1. Générer l\'Offre & Copier',
      p2pAccept: '2. Accepter le jeton',
      labelSdp: 'Jeton SDP d\'échange:',
      copied: '✅ Offre copiée dans le presse-papiers !',
      connected: '✅ Connexion établie !',
      invalidToken: '❌ Jeton invalide.'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'webrtcstreamer') {
      window.activeTab = 'webrtcstreamer';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-webrtcstreamer');
      if (btn) btn.classList.add('active');
      initWebRTCStreamer(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initWebRTCStreamer(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="webrtc-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(236,72,153,0.15),rgba(168,85,247,0.1));border-radius:14px;padding:14px;border:1px solid rgba(236,72,153,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #ec4899);">📡</span>
          <div>
            <h2 style="margin:0;color:#f472b6;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="webrtc-load-full-app" style="width:100%;background:linear-gradient(90deg,#f472b6,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(236,72,153,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Preview Screen -->
        <div style="background:#000;border:1px solid #1e293b;border-radius:12px;overflow:hidden;position:relative;aspect-ratio:16/9;margin-bottom:14px;display:flex;justify-content:center;align-items:center;">
          <span id="webrtc-preview-badge" style="position:absolute;top:10px;left:10px;background:rgba(236,72,153,0.2);border:1px solid #ec4899;color:#ec4899;padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;text-transform:uppercase;">${T.statusOffline}</span>
          <video id="webrtc-video" autoplay playsinline muted style="display:none;"></video>
          <canvas id="webrtc-canvas" style="width:100%;height:100%;object-fit:cover;"></canvas>
        </div>

        <!-- Controls -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;">
          <h3 style="margin:0 0 10px 0;font-size:11px;color:#f472b6;text-transform:uppercase;">${T.videoCap}</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
            <button id="webrtc-cam-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">${T.camBtn}</button>
            <button id="webrtc-screen-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">${T.screenBtn}</button>
          </div>

          <h3 style="margin:0 0 10px 0;font-size:11px;color:#f472b6;text-transform:uppercase;">${T.filters}</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button class="webrtc-filter" data-val="none" style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;color:#fff;padding:8px;border-radius:6px;font-size:10px;cursor:pointer;font-weight:700;">${T.none}</button>
            <button class="webrtc-filter" data-val="neon" style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;color:#fff;padding:8px;border-radius:6px;font-size:10px;cursor:pointer;font-weight:700;">${T.neon}</button>
            <button class="webrtc-filter" data-val="vhs" style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;color:#fff;padding:8px;border-radius:6px;font-size:10px;cursor:pointer;font-weight:700;">${T.vhs}</button>
            <button class="webrtc-filter" data-val="matrix" style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;color:#fff;padding:8px;border-radius:6px;font-size:10px;cursor:pointer;font-weight:700;">${T.matrix}</button>
          </div>
        </div>

        <!-- P2P signaling -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 10px 0;font-size:11px;color:#f472b6;text-transform:uppercase;">${T.p2pHdr}</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <button id="webrtc-offer-btn" style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.4);color:#818cf8;padding:10px;border-radius:6px;font-size:10px;font-weight:800;cursor:pointer;">${T.p2pOffer}</button>
            <button id="webrtc-accept-btn" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:10px;border-radius:6px;font-size:10px;font-weight:800;cursor:pointer;">${T.p2pAccept}</button>
          </div>
          <textarea id="webrtc-sdp" placeholder="SDP exchange box..." style="width:100%;height:60px;background:#000;border:1px solid #1e293b;color:#818cf8;padding:8px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
        </div>

        <div id="webrtc-toast" style="display:none;text-align:center;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#ec4899;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const video = document.getElementById('webrtc-video');
    const canvas = document.getElementById('webrtc-canvas');
    const ctx = canvas.getContext('2d');
    const badge = document.getElementById('webrtc-preview-badge');
    const sdpBox = document.getElementById('webrtc-sdp');
    const toast = document.getElementById('webrtc-toast');

    let stream = null;
    let currentFilter = 'none';
    let animId = null;
    let pc = null;

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    async function startMedia(mediaPromise) {
      if (stream) { stream.getTracks().forEach(t => t.stop()); }
      try {
        stream = await mediaPromise;
        video.srcObject = stream;
        video.play();
        badge.textContent = T.statusStreaming;
        badge.style.borderColor = '#ec4899';
        showToast(T.toastStarted);
        runFilterLoop();
      } catch (err) {
        showToast(T.statusErr);
      }
    }

    document.getElementById('webrtc-cam-btn').addEventListener('click', () => {
      startMedia(navigator.mediaDevices.getUserMedia({ video: true, audio: false }));
    });

    document.getElementById('webrtc-screen-btn').addEventListener('click', () => {
      startMedia(navigator.mediaDevices.getDisplayMedia({ video: true }));
    });

    document.querySelectorAll('.webrtc-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.webrtc-filter').forEach(b => {
          b.style.borderColor = '#1e293b';
          b.style.background = 'rgba(255,255,255,0.03)';
        });
        e.target.style.borderColor = '#ec4899';
        e.target.style.background = 'rgba(236,72,153,0.1)';
        currentFilter = e.target.getAttribute('data-val');
      });
    });

    function runFilterLoop() {
      if (animId) cancelAnimationFrame(animId);
      function render() {
        if (!stream) return;
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 360;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (currentFilter !== 'none') {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          if (currentFilter === 'neon') {
            for (let i = 0; i < d.length; i += 4) {
              d[i] = d[i] > 100 ? 255 : 0;
              d[i+1] = d[i+1] < 80 ? 0 : 255;
              d[i+2] = d[i+2] > 120 ? 255 : 0;
            }
          } else if (currentFilter === 'vhs') {
            for (let i = 0; i < d.length; i += 4) {
              if (Math.random() < 0.05) { d[i] = 255; d[i+1] = 0; d[i+2] = 255; }
              else { d[i] = d[i+4] || d[i]; d[i+2] = d[i-4] || d[i+2]; }
            }
          } else if (currentFilter === 'matrix') {
            for (let i = 0; i < d.length; i += 4) {
              let gray = (d[i] + d[i+1] + d[i+2]) / 3;
              d[i] = 0; d[i+1] = gray > 80 ? Math.min(255, gray * 1.5) : 0; d[i+2] = 0;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }
        animId = requestAnimationFrame(render);
      }
      render();
    }

    const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

    document.getElementById('webrtc-offer-btn').addEventListener('click', async () => {
      pc = new RTCPeerConnection(rtcConfig);
      if (stream) { stream.getTracks().forEach(t => pc.addTrack(t, stream)); }
      pc.onicecandidate = e => {
        if (!e.candidate) {
          sdpBox.value = btoa(JSON.stringify(pc.localDescription));
          sdpBox.select();
          document.execCommand('copy');
          showToast(T.copied);
        }
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
    });

    document.getElementById('webrtc-accept-btn').addEventListener('click', async () => {
      const raw = sdpBox.value.trim();
      if (!raw) return;
      try {
        const sdp = JSON.parse(atob(raw));
        if (!pc) {
          pc = new RTCPeerConnection(rtcConfig);
          pc.ontrack = e => {
            video.srcObject = e.streams[0];
            video.play();
            runFilterLoop();
            badge.textContent = 'Remote Connected';
            badge.style.borderColor = '#10b981';
          };
          await pc.setRemoteDescription(sdp);
          const ans = await pc.createAnswer();
          await pc.setLocalDescription(ans);
          sdpBox.value = btoa(JSON.stringify(pc.localDescription));
          showToast('Answer created! Send this back to Offer side.');
        } else {
          await pc.setRemoteDescription(sdp);
          showToast(T.connected);
        }
      } catch (e) {
        showToast(T.invalidToken);
      }
    });

    document.getElementById('webrtc-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast('✅ WebRTC Streamer initialized.');
  }
})();
