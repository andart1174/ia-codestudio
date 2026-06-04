(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════
  // 📡 HARDWARE API STUDIO — Real Camera, GPS, Battery Access
  // ════════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hardware API Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: rgba(15, 23, 42, 0.65);
      --card-border: rgba(255, 255, 255, 0.08);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      
      --gps-color: #10b981;
      --gps-grad: linear-gradient(135deg, #10b981, #059669);
      
      --cam-color: #0ea5e9;
      --cam-grad: linear-gradient(135deg, #0ea5e9, #2563eb);
      
      --bat-color: #fbbf24;
      --bat-grad: linear-gradient(135deg, #fbbf24, #d97706);
      
      --mic-color: #ec4899;
      --mic-grad: linear-gradient(135deg, #ec4899, #be185d);
    }
    
    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(56, 189, 248, 0.08) 0px, transparent 50%);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      min-height: 100vh;
      box-sizing: border-box;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.5px;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    
    .sub {
      margin: 0;
      font-size: 14px;
      color: var(--text-muted);
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }
    
    .card-hdr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 12px;
    }
    
    .card-title {
      font-size: 15px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .card-icon {
      font-size: 18px;
    }
    
    .badge {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 20px;
      letter-spacing: 0.5px;
    }
    
    .badge.gps { background: rgba(16, 185, 129, 0.15); color: var(--gps-color); border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge.cam { background: rgba(14, 165, 233, 0.15); color: var(--cam-color); border: 1px solid rgba(14, 165, 233, 0.3); }
    .badge.bat { background: rgba(245, 158, 11, 0.15); color: var(--bat-color); border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge.mic { background: rgba(236, 72, 153, 0.15); color: var(--mic-color); border: 1px solid rgba(236, 72, 153, 0.3); }
    
    .btn {
      width: 100%;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
      outline: none;
    }
    
    .btn-gps { background: var(--gps-grad); color: #fff; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25); }
    .btn-gps:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35); }
    
    .btn-cam { background: var(--cam-grad); color: #fff; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25); }
    .btn-cam:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(14, 165, 233, 0.35); }
    .btn-stop { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }
    .btn-stop:hover { background: rgba(239, 68, 68, 0.2); }
    
    .btn-bat { background: var(--bat-grad); color: #000; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25); }
    .btn-bat:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35); }
    
    .btn-mic { background: var(--mic-grad); color: #fff; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25); }
    .btn-mic:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(236, 72, 153, 0.35); }
    
    /* GPS Specifics */
    .gps-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    
    .data-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
    }
    
    .data-lbl {
      font-size: 9px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    
    .data-val {
      font-size: 15px;
      font-weight: 900;
      color: var(--text);
    }
    
    .map-link {
      display: block;
      text-align: center;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: var(--gps-color);
      padding: 8px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      margin-top: 10px;
      transition: all 0.2s;
    }
    .map-link:hover {
      background: rgba(16, 185, 129, 0.15);
      border-color: var(--gps-color);
    }
    
    /* Camera feed styling */
    .video-viewport {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: #000;
      overflow: hidden;
      position: relative;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .video-viewport video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .video-placeholder {
      font-size: 11px;
      color: var(--text-muted);
      text-align: center;
      padding: 20px;
    }
    
    /* Battery specific physical model */
    .battery-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      margin-bottom: 12px;
    }
    
    .battery-shape {
      width: 130px;
      height: 60px;
      border: 3px solid rgba(255,255,255,0.7);
      border-radius: 10px;
      position: relative;
      padding: 4px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.3);
    }
    
    .battery-shape::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 16px;
      background: rgba(255,255,255,0.7);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    
    .battery-level-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #10b981, #34d399);
      border-radius: 4px;
      transition: width 0.5s ease-out, background 0.3s;
      position: relative;
    }
    
    .battery-bolt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: #fff;
      text-shadow: 0 2px 5px rgba(0,0,0,0.5);
      animation: pulse 1.5s infinite;
      display: none;
    }
    
    .battery-info {
      text-align: center;
      margin-top: 10px;
      font-size: 13px;
      font-weight: 700;
    }
    
    /* Mic equalizers */
    .mic-viewport {
      height: 120px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 3px;
      padding: 10px;
      box-sizing: border-box;
    }
    
    .mic-bar {
      width: 6%;
      height: 8%;
      background: var(--mic-color);
      border-radius: 2px;
      transition: height 0.05s ease;
    }
    
    .mic-lbl {
      text-align: center;
      font-size: 11px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    
    .err-msg {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      font-size: 10px;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 10px;
      display: none;
      font-weight: 700;
    }
    
    .status-msg {
      text-align: center;
      color: var(--text-muted);
      font-size: 11px;
      padding: 10px;
    }
    
    @keyframes pulse {
      0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      100% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📡 Hardware API Studio</h1>
      <p class="sub">Advanced Real-time Client-side Hardware Integration Hub</p>
    </header>
    
    <div class="grid">
      <!-- GPS Card -->
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">
            <span class="card-icon">📍</span> GPS Location Hub
          </div>
          <span class="badge gps">Active GPS</span>
        </div>
        
        <div id="gpsError" class="err-msg"></div>
        
        <div style="margin-bottom: 16px;">
          <button id="gpsBtn" class="btn btn-gps">🛰️ Get Location Data</button>
        </div>
        
        <div id="gpsLoading" class="status-msg" style="display: none;">Acquiring satellite signal...</div>
        
        <div id="gpsResult" style="display: none;">
          <div class="gps-grid">
            <div class="data-box">
              <div class="data-lbl">Latitude</div>
              <div id="latVal" class="data-val" style="color: var(--gps-color);">—</div>
            </div>
            <div class="data-box">
              <div class="data-lbl">Longitude</div>
              <div id="lngVal" class="data-val" style="color: var(--gps-color);">—</div>
            </div>
          </div>
          
          <div class="data-box" style="margin-bottom: 10px;">
            <div class="data-lbl">Accuracy Radius</div>
            <div id="accVal" class="data-val" style="color: #fbbf24; font-size: 13px;">—</div>
          </div>
          
          <a id="gpsMapLink" href="#" target="_blank" class="map-link">🗺️ Navigation: Open in Google Maps</a>
        </div>
      </div>
      
      <!-- Camera Card -->
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">
            <span class="card-icon">📷</span> HD Camera Feed
          </div>
          <span class="badge cam">Viewport</span>
        </div>
        
        <div id="camError" class="err-msg"></div>
        
        <div class="video-viewport">
          <video id="camVideo" autoplay playsinline style="display: none;"></video>
          <div id="camPlaceholder" class="video-placeholder">
            <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
            Camera feed is offline.<br>Click "Démarrer" or "Start" to stream.
          </div>
        </div>
        
        <div>
          <button id="camStart" class="btn btn-cam">📸 Start Video Feed</button>
          <button id="camStop" class="btn btn-stop" style="display: none;">⏹ Stop Stream</button>
        </div>
      </div>
      
      <!-- Battery Card -->
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">
            <span class="card-icon">🔋</span> Battery Fuel Level
          </div>
          <span class="badge bat">Real Battery</span>
        </div>
        
        <div id="batError" class="err-msg"></div>
        
        <div class="battery-container">
          <div class="battery-shape">
            <div id="batFill" class="battery-level-fill"></div>
            <div id="batCharging" class="battery-bolt">⚡</div>
          </div>
          
          <div id="batResult" class="battery-info" style="display: none;">
            <div style="font-size: 20px; font-weight: 900; margin-bottom: 4px;" id="batPct">—</div>
            <div style="font-size: 11px; font-weight: 500;" id="batChargingLabel">Checking power connection...</div>
          </div>
        </div>
        
        <div>
          <button id="batBtn" class="btn btn-bat">⚡ Query Battery Status</button>
        </div>
      </div>
      
      <!-- Microphone Card -->
      <div class="card">
        <div class="card-hdr">
          <div class="card-title">
            <span class="card-icon">🎤</span> Microphone Equalizer
          </div>
          <span class="badge mic">Analyser</span>
        </div>
        
        <div id="micError" class="err-msg"></div>
        
        <div class="mic-viewport" id="micVis" style="display: none;">
          <div id="mb-0" class="mic-bar"></div>
          <div id="mb-1" class="mic-bar"></div>
          <div id="mb-2" class="mic-bar"></div>
          <div id="mb-3" class="mic-bar"></div>
          <div id="mb-4" class="mic-bar"></div>
          <div id="mb-5" class="mic-bar"></div>
          <div id="mb-6" class="mic-bar"></div>
          <div id="mb-7" class="mic-bar"></div>
          <div id="mb-8" class="mic-bar"></div>
          <div id="mb-9" class="mic-bar"></div>
          <div id="mb-10" class="mic-bar"></div>
          <div id="mb-11" class="mic-bar"></div>
          <div id="mb-12" class="mic-bar"></div>
          <div id="mb-13" class="mic-bar"></div>
          <div id="mb-14" class="mic-bar"></div>
          <div id="mb-15" class="mic-bar"></div>
          <div id="mb-16" class="mic-bar"></div>
          <div id="mb-17" class="mic-bar"></div>
          <div id="mb-18" class="mic-bar"></div>
          <div id="mb-19" class="mic-bar"></div>
        </div>
        
        <div id="micLevelWrap" class="mic-lbl" style="display: none;">
          Average Amplitude Level: <span id="micLevel" style="font-weight: bold; color: var(--mic-color);">0</span>
        </div>
        
        <div>
          <button id="micStart" class="btn btn-mic">🎙️ Connect Microphone</button>
          <button id="micStop" class="btn btn-stop" style="display: none;">⏹ Disconnect Microphone</button>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // GPS Hub Logic
    var gpsBtn = document.getElementById('gpsBtn');
    var gpsResult = document.getElementById('gpsResult');
    var gpsLoading = document.getElementById('gpsLoading');
    var gpsError = document.getElementById('gpsError');
    var latVal = document.getElementById('latVal');
    var lngVal = document.getElementById('lngVal');
    var accVal = document.getElementById('accVal');
    var gpsMapLink = document.getElementById('gpsMapLink');

    gpsBtn.addEventListener('click', function() {
      if (!navigator.geolocation) {
        gpsError.textContent = 'Geolocation not supported by this browser.';
        gpsError.style.display = 'block';
        return;
      }
      gpsLoading.style.display = 'block';
      gpsResult.style.display = 'none';
      gpsError.style.display = 'none';
      
      navigator.geolocation.getCurrentPosition(function(pos) {
        gpsLoading.style.display = 'none';
        latVal.textContent = pos.coords.latitude.toFixed(6);
        lngVal.textContent = pos.coords.longitude.toFixed(6);
        accVal.textContent = Math.round(pos.coords.accuracy) + ' meters';
        gpsMapLink.href = 'https://www.google.com/maps?q=' + pos.coords.latitude + ',' + pos.coords.longitude;
        gpsResult.style.display = 'block';
      }, function(err) {
        gpsLoading.style.display = 'none';
        gpsError.textContent = 'Error: ' + err.message;
        gpsError.style.display = 'block';
      }, { enableHighAccuracy: true, timeout: 10000 });
    });

    // Camera Feed Logic
    var camStart = document.getElementById('camStart');
    var camStop = document.getElementById('camStop');
    var camVideo = document.getElementById('camVideo');
    var camPlaceholder = document.getElementById('camPlaceholder');
    var camError = document.getElementById('camError');
    var camStream = null;

    camStart.addEventListener('click', function() {
      camError.style.display = 'none';
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(function(stream) {
          camStream = stream;
          camVideo.srcObject = stream;
          camVideo.style.display = 'block';
          camPlaceholder.style.display = 'none';
          camStart.style.display = 'none';
          camStop.style.display = 'inline-block';
        })
        .catch(function(err) {
          camError.textContent = 'Camera error: ' + err.message;
          camError.style.display = 'block';
        });
    });

    camStop.addEventListener('click', function() {
      if (camStream) {
        camStream.getTracks().forEach(function(track) { track.stop(); });
        camStream = null;
      }
      camVideo.srcObject = null;
      camVideo.style.display = 'none';
      camPlaceholder.style.display = 'block';
      camStart.style.display = 'inline-block';
      camStop.style.display = 'none';
    });

    // Battery Logic
    var batBtn = document.getElementById('batBtn');
    var batResult = document.getElementById('batResult');
    var batError = document.getElementById('batError');
    var batPct = document.getElementById('batPct');
    var batFill = document.getElementById('batFill');
    var batCharging = document.getElementById('batCharging');
    var batChargingLabel = document.getElementById('batChargingLabel');

    function updateBatteryInfo(battery) {
      var pct = Math.round(battery.level * 100);
      batPct.textContent = pct + '%';
      batFill.style.width = pct + '%';
      if (pct > 30) {
        batFill.style.background = 'linear-gradient(90deg, #fbbf24, #d97706)';
      } else {
        batFill.style.background = '#ef4444';
      }
      if (battery.charging) {
        batCharging.style.display = 'inline-block';
        batChargingLabel.textContent = 'Charging (AC Connected)';
        batChargingLabel.style.color = '#10b981';
      } else {
        batCharging.style.display = 'none';
        batChargingLabel.textContent = 'Discharging (On Battery)';
        batChargingLabel.style.color = '#fbbf24';
      }
      batResult.style.display = 'block';
    }

    batBtn.addEventListener('click', function() {
      if (!navigator.getBattery) {
        batError.textContent = 'Battery API not supported in this browser.';
        batError.style.display = 'block';
        return;
      }
      navigator.getBattery().then(function(battery) {
        updateBatteryInfo(battery);
        
        battery.addEventListener('levelchange', function() {
          updateBatteryInfo(battery);
        });
        battery.addEventListener('chargingchange', function() {
          updateBatteryInfo(battery);
        });
      }).catch(function(err) {
        batError.textContent = 'Battery read failed: ' + err.message;
        batError.style.display = 'block';
      });
    });

    // Microphone Analyzer Logic
    var micStart = document.getElementById('micStart');
    var micStop = document.getElementById('micStop');
    var micVis = document.getElementById('micVis');
    var micLevelWrap = document.getElementById('micLevelWrap');
    var micError = document.getElementById('micError');
    var micLevel = document.getElementById('micLevel');
    var micStream = null;
    var audioCtx = null;
    var analyser = null;
    var micAnim = null;

    micStart.addEventListener('click', function() {
      micError.style.display = 'none';
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          micStream = stream;
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioCtx.createAnalyser();
          var source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 64;
          var dataArray = new Uint8Array(analyser.frequencyBinCount);
          
          micVis.style.display = 'flex';
          micLevelWrap.style.display = 'block';
          micStart.style.display = 'none';
          micStop.style.display = 'inline-block';
          
          var bars = [];
          for (var i = 0; i < 20; i++) {
            bars.push(document.getElementById('mb-' + i));
          }
          
          function draw() {
            analyser.getByteFrequencyData(dataArray);
            var sum = 0;
            for (var k = 0; k < dataArray.length; k++) {
              sum += dataArray[k];
            }
            var avg = sum / dataArray.length;
            micLevel.textContent = Math.round(avg);
            
            for (var j = 0; j < 20; j++) {
              var val = dataArray[j] || 0;
              var heightPercent = Math.max(8, Math.round((val / 255) * 100));
              if (bars[j]) {
                bars[j].style.height = heightPercent + '%';
              }
            }
            micAnim = requestAnimationFrame(draw);
          }
          draw();
        })
        .catch(function(err) {
          micError.textContent = 'Mic access error: ' + err.message;
          micError.style.display = 'block';
        });
    });

    micStop.addEventListener('click', function() {
      if (micStream) {
        micStream.getTracks().forEach(function(track) { track.stop(); });
        micStream = null;
      }
      if (micAnim) {
        cancelAnimationFrame(micAnim);
      }
      micVis.style.display = 'none';
      micLevelWrap.style.display = 'none';
      micStart.style.display = 'inline-block';
      micStop.style.display = 'none';
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: 'HARDWARE API STUDIO',
      sub: 'Real Access: Camera · GPS · Battery · Microphone',
      gpsTitle: '📍 GPS Location',
      gpsBtn: '🛰️ Get My Location',
      gpsLoading: 'Acquiring GPS signal...',
      gpsLat: 'Latitude',
      gpsLng: 'Longitude',
      gpsAcc: 'Accuracy',
      gpsMeters: 'm',
      gpsError: '❌ Permission denied or unavailable.',
      camTitle: '📷 Camera Feed',
      camBtn: '📸 Start Camera',
      camStop: '⏹ Stop Camera',
      camError: '❌ Camera access denied.',
      batTitle: '🔋 Battery Status',
      batBtn: '⚡ Read Battery',
      batLevel: 'Level',
      batCharging: 'Charging',
      batYes: 'YES ✅',
      batNo: 'NO ⚡',
      batUnsupported: '❌ Battery API not supported in this browser.',
      micTitle: '🎤 Microphone Level',
      micBtn: '🎙️ Start Mic',
      micStop: '⏹ Stop Mic',
      micError: '❌ Microphone access denied.',
      codeTitle: '📋 Generated Code Snippet',
      copyCode: '📋 Copy Code',
      copySuccess: '✅ Copied!',
      injected: '✅ Hardware API Studio loaded.',
      selectFeature: 'Select a feature above to start using real hardware.',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Standalone App loaded into editor!'
    },
    fr: {
      title: 'STUDIO API MATÉRIEL',
      sub: 'Accès Réel: Caméra · GPS · Batterie · Microphone',
      gpsTitle: '📍 Localisation GPS',
      gpsBtn: '🛰️ Obtenir ma Position',
      gpsLoading: 'Acquisition du signal GPS...',
      gpsLat: 'Latitude',
      gpsLng: 'Longitude',
      gpsAcc: 'Précision',
      gpsMeters: 'm',
      gpsError: '❌ Permission refusée ou indisponible.',
      camTitle: '📷 Flux Caméra',
      camBtn: '📸 Démarrer la Caméra',
      camStop: '⏹ Arrêter la Caméra',
      camError: '❌ Accès caméra refusé.',
      batTitle: '🔋 État de la Batterie',
      batBtn: '⚡ Lire la Batterie',
      batLevel: 'Niveau',
      batCharging: 'En Charge',
      batYes: 'OUI ✅',
      batNo: 'NON ⚡',
      batUnsupported: '❌ API Batterie non supportée dans ce navigateur.',
      micTitle: '🎤 Niveau Microphone',
      micBtn: '🎙️ Démarrer le Mic',
      micStop: '⏹ Arrêter le Mic',
      micError: '❌ Accès microphone refusé.',
      codeTitle: '📋 Snippet de Code Généré',
      copyCode: '📋 Copier le Code',
      copySuccess: '✅ Copié!',
      injected: '✅ Studio API Matériel chargé.',
      selectFeature: 'Sélectionnez une fonctionnalité ci-dessus pour utiliser le matériel réel.',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Application complète chargée dans l\'éditeur!'
    }
  };

  function gl() { return window.appLang || 'en'; }

  const _orig = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'hardwareapi') {
      window.activeTab = 'hardwareapi';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-hardwareapi');
      if (btn) btn.classList.add('active');
      initHardwareAPI(gl());
      return;
    }
    if (typeof _orig === 'function') _orig(tab);
  };

  // ── Code Snippets ─────────────────────────────────────────────
  const CODE_SNIPPETS = {
    gps: `// 📍 Real GPS Location — IA Architecte Hardware API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    console.log(\`Lat: \${lat}, Lng: \${lng}, Accuracy: \${accuracy}m\`);
    // Use lat/lng for maps, tracking, location-based features
  },
  (error) => {
    console.error('GPS Error:', error.message);
  },
  { enableHighAccuracy: true, timeout: 10000 }
);`,
    camera: `// 📷 Real Camera Access — IA Architecte Hardware API
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user' }, // 'environment' for back camera
    audio: false
  });
  const video = document.getElementById('my-video');
  video.srcObject = stream;
  video.play();
}

function stopCamera(stream) {
  stream.getTracks().forEach(track => track.stop());
}

startCamera();`,
    battery: `// 🔋 Real Battery Status — IA Architecte Hardware API
navigator.getBattery().then((battery) => {
  console.log('Level:', Math.round(battery.level * 100) + '%');
  console.log('Charging:', battery.charging);

  // Listen for changes
  battery.addEventListener('levelchange', () => {
    console.log('New level:', Math.round(battery.level * 100) + '%');
  });
  battery.addEventListener('chargingchange', () => {
    console.log('Charging:', battery.charging);
  });
});`,
    mic: `// 🎤 Real Microphone Level — IA Architecte Hardware API
async function startMicrophone() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.fftSize = 256;

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  function draw() {
    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
    console.log('Mic Level:', Math.round(avg));
    requestAnimationFrame(draw);
  }
  draw();
}`
  };

  function initHardwareAPI(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    let camStream = null;
    let micStream = null;
    let micAnimFrame = null;

    el.innerHTML = `
      <div id="hw-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(56,189,248,0.15),rgba(99,102,241,0.1));border-radius:14px;padding:14px;border:1px solid rgba(56,189,248,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #38bdf8);">📡</span>
          <div>
            <h2 style="margin:0;color:#7dd3fc;font-size:15px;font-weight:900;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="hw-load-full-app" style="width:100%;background:linear-gradient(90deg,#7dd3fc,#6366f1);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(56,189,248,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Feature Tabs -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
          <button class="hw-tab active-hw" data-hw="gps" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">📍 GPS</button>
          <button class="hw-tab" data-hw="camera" style="background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);color:#38bdf8;padding:10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">📷 Camera</button>
          <button class="hw-tab" data-hw="battery" style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;padding:10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">🔋 Battery</button>
          <button class="hw-tab" data-hw="mic" style="background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.4);color:#f472b6;padding:10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">🎤 Mic</button>
        </div>

        <!-- Dynamic Panel -->
        <div id="hw-panel"></div>

        <!-- Code Output -->
        <div id="hw-code-wrap" style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;margin-top:14px;">
          <div style="background:#1e293b;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:10px;font-weight:700;color:#7dd3fc;">📄 ${T.codeTitle}</div>
            <div style="display:flex;gap:6px;">
              <button id="hw-copy-code" style="background:none;border:1px solid rgba(56,189,248,0.3);color:#38bdf8;padding:4px 10px;border-radius:5px;font-size:9px;font-weight:700;cursor:pointer;">${T.copyCode}</button>
              <button id="hw-inject-code" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.4);color:#34d399;padding:4px 10px;border-radius:5px;font-size:9px;font-weight:700;cursor:pointer;">💉 ${lang === 'fr' ? 'Injecter' : 'Inject'}</button>
            </div>
          </div>
          <textarea id="hw-code-output" readonly style="width:100%;height:140px;background:#000;border:none;color:#a5b4fc;padding:10px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
        </div>
        <div id="hw-toast" style="display:none;text-align:center;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);border-radius:8px;padding:8px;margin-top:10px;color:#38bdf8;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    const panel = document.getElementById('hw-panel');
    const codeOutput = document.getElementById('hw-code-output');
    const toast = document.getElementById('hw-toast');

    function showT(msg) { toast.textContent = msg; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2500); }
    function stopCamera() { if (camStream) { camStream.getTracks().forEach(t => t.stop()); camStream = null; } }
    function stopMic() { if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; } if (micAnimFrame) { cancelAnimationFrame(micAnimFrame); micAnimFrame = null; } }

    function renderGPS() {
      stopCamera(); stopMic();
      codeOutput.value = CODE_SNIPPETS.gps;
      panel.innerHTML = `
        <div style="background:#0f172a;border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:14px;">
          <div style="font-size:12px;font-weight:800;color:#34d399;margin-bottom:12px;">${T.gpsTitle}</div>
          <button id="hw-gps-btn" style="width:100%;background:linear-gradient(90deg,#10b981,#059669);border:none;color:#fff;padding:12px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;margin-bottom:12px;">${T.gpsBtn}</button>
          <div id="hw-gps-result" style="display:none;background:#1e293b;border-radius:10px;padding:12px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
              <div style="text-align:center;">
                <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;">${T.gpsLat}</div>
                <div id="hw-gps-lat" style="font-size:14px;color:#34d399;font-weight:900;margin-top:3px;">—</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;">${T.gpsLng}</div>
                <div id="hw-gps-lng" style="font-size:14px;color:#34d399;font-weight:900;margin-top:3px;">—</div>
              </div>
            </div>
            <div style="text-align:center;border-top:1px solid #334155;padding-top:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:700;text-transform:uppercase;">${T.gpsAcc}</div>
              <div id="hw-gps-acc" style="font-size:12px;color:#fbbf24;font-weight:900;margin-top:3px;">—</div>
            </div>
            <a id="hw-gps-link" href="#" target="_blank" style="display:block;margin-top:10px;text-align:center;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#34d399;padding:8px;border-radius:6px;text-decoration:none;font-size:10px;font-weight:700;">🗺️ Open in Google Maps</a>
          </div>
          <div id="hw-gps-loading" style="display:none;text-align:center;color:#94a3b8;font-size:11px;padding:10px;">${T.gpsLoading}</div>
          <div id="hw-gps-error" style="display:none;color:#ef4444;font-size:10px;font-weight:700;padding:8px;"></div>
        </div>`;

      document.getElementById('hw-gps-btn').addEventListener('click', () => {
        if (!navigator.geolocation) { document.getElementById('hw-gps-error').textContent = T.gpsError; document.getElementById('hw-gps-error').style.display = 'block'; return; }
        document.getElementById('hw-gps-loading').style.display = 'block';
        document.getElementById('hw-gps-result').style.display = 'none';
        document.getElementById('hw-gps-error').style.display = 'none';
        navigator.geolocation.getCurrentPosition(pos => {
          document.getElementById('hw-gps-loading').style.display = 'none';
          document.getElementById('hw-gps-lat').textContent = pos.coords.latitude.toFixed(6);
          document.getElementById('hw-gps-lng').textContent = pos.coords.longitude.toFixed(6);
          document.getElementById('hw-gps-acc').textContent = Math.round(pos.coords.accuracy) + ' ' + T.gpsMeters;
          document.getElementById('hw-gps-link').href = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
          document.getElementById('hw-gps-result').style.display = 'block';
        }, err => {
          document.getElementById('hw-gps-loading').style.display = 'none';
          document.getElementById('hw-gps-error').textContent = T.gpsError + ' (' + err.message + ')';
          document.getElementById('hw-gps-error').style.display = 'block';
        }, { enableHighAccuracy: true, timeout: 12000 });
      });
    }

    function renderCamera() {
      stopMic();
      codeOutput.value = CODE_SNIPPETS.camera;
      panel.innerHTML = `
        <div style="background:#0f172a;border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:14px;">
          <div style="font-size:12px;font-weight:800;color:#38bdf8;margin-bottom:12px;">${T.camTitle}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
            <button id="hw-cam-start" style="background:linear-gradient(90deg,#0ea5e9,#0284c7);border:none;color:#fff;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.camBtn}</button>
            <button id="hw-cam-stop" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.4);color:#ef4444;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.camStop}</button>
          </div>
          <video id="hw-video" autoplay playsinline style="width:100%;border-radius:10px;border:1px solid #1e293b;background:#000;display:none;max-height:180px;object-fit:cover;"></video>
          <div id="hw-cam-error" style="display:none;color:#ef4444;font-size:10px;font-weight:700;padding:8px;"></div>
        </div>`;

      document.getElementById('hw-cam-start').addEventListener('click', async () => {
        try {
          stopCamera();
          camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
          const video = document.getElementById('hw-video');
          video.srcObject = camStream;
          video.style.display = 'block';
        } catch (e) {
          document.getElementById('hw-cam-error').textContent = T.camError + ' ' + e.message;
          document.getElementById('hw-cam-error').style.display = 'block';
        }
      });
      document.getElementById('hw-cam-stop').addEventListener('click', () => {
        stopCamera();
        const video = document.getElementById('hw-video');
        if (video) { video.srcObject = null; video.style.display = 'none'; }
      });
    }

    function renderBattery() {
      stopCamera(); stopMic();
      codeOutput.value = CODE_SNIPPETS.battery;
      panel.innerHTML = `
        <div style="background:#0f172a;border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:14px;">
          <div style="font-size:12px;font-weight:800;color:#fbbf24;margin-bottom:12px;">${T.batTitle}</div>
          <button id="hw-bat-btn" style="width:100%;background:linear-gradient(90deg,#f59e0b,#d97706);border:none;color:#000;padding:12px;border-radius:8px;font-weight:900;font-size:12px;cursor:pointer;margin-bottom:12px;">${T.batBtn}</button>
          <div id="hw-bat-result" style="display:none;background:#1e293b;border-radius:10px;padding:14px;">
            <div style="margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:10px;color:#94a3b8;font-weight:700;">${T.batLevel}</span>
                <span id="hw-bat-pct" style="font-size:14px;color:#fbbf24;font-weight:900;">—</span>
              </div>
              <div style="width:100%;height:12px;background:#0f172a;border-radius:6px;overflow:hidden;">
                <div id="hw-bat-bar" style="height:100%;background:linear-gradient(90deg,#10b981,#fbbf24);border-radius:6px;transition:width 0.5s;width:0%;"></div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #334155;padding-top:10px;">
              <span style="font-size:10px;color:#94a3b8;font-weight:700;">${T.batCharging}</span>
              <span id="hw-bat-charging" style="font-size:12px;font-weight:900;">—</span>
            </div>
          </div>
          <div id="hw-bat-error" style="display:none;color:#ef4444;font-size:10px;font-weight:700;padding:8px;"></div>
        </div>`;

      document.getElementById('hw-bat-btn').addEventListener('click', () => {
        if (!navigator.getBattery) {
          document.getElementById('hw-bat-error').textContent = T.batUnsupported;
          document.getElementById('hw-bat-error').style.display = 'block';
          return;
        }
        navigator.getBattery().then(battery => {
          const pct = Math.round(battery.level * 100);
          document.getElementById('hw-bat-pct').textContent = pct + '%';
          document.getElementById('hw-bat-bar').style.width = pct + '%';
          document.getElementById('hw-bat-bar').style.background = pct > 30 ? 'linear-gradient(90deg,#10b981,#fbbf24)' : '#ef4444';
          document.getElementById('hw-bat-charging').textContent = battery.charging ? T.batYes : T.batNo;
          document.getElementById('hw-bat-charging').style.color = battery.charging ? '#10b981' : '#f59e0b';
          document.getElementById('hw-bat-result').style.display = 'block';
        }).catch(() => {
          document.getElementById('hw-bat-error').textContent = T.batUnsupported;
          document.getElementById('hw-bat-error').style.display = 'block';
        });
      });
    }

    function renderMic() {
      stopCamera();
      codeOutput.value = CODE_SNIPPETS.mic;
      panel.innerHTML = `
        <div style="background:#0f172a;border:1px solid rgba(236,72,153,0.3);border-radius:12px;padding:14px;">
          <div style="font-size:12px;font-weight:800;color:#f472b6;margin-bottom:12px;">${T.micTitle}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
            <button id="hw-mic-start" style="background:linear-gradient(90deg,#ec4899,#be185d);border:none;color:#fff;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.micBtn}</button>
            <button id="hw-mic-stop" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.4);color:#ef4444;padding:11px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;">${T.micStop}</button>
          </div>
          <div id="hw-mic-vis" style="background:#1e293b;border-radius:10px;padding:14px;display:none;">
            <div style="display:flex;align-items:flex-end;justify-content:center;gap:3px;height:50px;" id="hw-mic-bars">
              ${Array.from({length:20}, (_,i) => `<div id="hw-mb-${i}" style="width:8px;background:#f472b6;border-radius:2px;height:4px;transition:height 0.05s;"></div>`).join('')}
            </div>
            <div style="text-align:center;margin-top:8px;">
              <span style="font-size:10px;color:#94a3b8;">Level: </span>
              <span id="hw-mic-level" style="font-size:12px;color:#f472b6;font-weight:900;">0</span>
            </div>
          </div>
          <div id="hw-mic-error" style="display:none;color:#ef4444;font-size:10px;font-weight:700;padding:8px;"></div>
        </div>`;

      document.getElementById('hw-mic-start').addEventListener('click', async () => {
        try {
          stopMic();
          micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioCtx = new AudioContext();
          const analyser = audioCtx.createAnalyser();
          const source = audioCtx.createMediaStreamSource(micStream);
          source.connect(analyser);
          analyser.fftSize = 64;
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          document.getElementById('hw-mic-vis').style.display = 'block';
          const bars = Array.from({length: 20}, (_, i) => document.getElementById(`hw-mb-${i}`));
          function draw() {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            document.getElementById('hw-mic-level').textContent = Math.round(avg);
            bars.forEach((bar, i) => {
              const v = (dataArray[i] || 0) / 255;
              if (bar) bar.style.height = Math.max(4, Math.round(v * 50)) + 'px';
            });
            micAnimFrame = requestAnimationFrame(draw);
          }
          draw();
        } catch (e) {
          document.getElementById('hw-mic-error').textContent = T.micError + ' ' + e.message;
          document.getElementById('hw-mic-error').style.display = 'block';
        }
      });

      document.getElementById('hw-mic-stop').addEventListener('click', () => {
        stopMic();
        const vis = document.getElementById('hw-mic-vis');
        if (vis) vis.style.display = 'none';
      });
    }

    const panelRenderers = { gps: renderGPS, camera: renderCamera, battery: renderBattery, mic: renderMic };

    document.querySelectorAll('.hw-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.hw-tab').forEach(b => b.style.opacity = '0.6');
        btn.style.opacity = '1';
        const hw = btn.dataset.hw;
        if (panelRenderers[hw]) panelRenderers[hw]();
      });
    });

    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        return new Promise((resolve, reject) => {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) resolve(); else reject(new Error('execCommand copy failed'));
          } catch (e) {
            reject(e);
          }
        });
      }
    }

    document.getElementById('hw-copy-code').addEventListener('click', () => {
      if (!codeOutput.value) return;
      copyToClipboard(codeOutput.value).then(() => showT(T.copySuccess));
    });

    document.getElementById('hw-inject-code').addEventListener('click', () => {
      if (!codeOutput.value) return;
      const wrapped = `<script>\n${codeOutput.value}\n<\/script>`;
      const msg = lang === 'fr' ? '✅ Code matériel injecté !' : '✅ Hardware code injected!';
      
      if (window.smartInject) {
        window.smartInject(wrapped, 'logic');
        showT(msg);
      } else if (window.editor) {
        const cur = window.editor.getValue();
        const idx = cur.toLowerCase().indexOf('</body>');
        if (idx !== -1) {
          window.editor.setValue(cur.slice(0, idx) + '\n' + wrapped + '\n' + cur.slice(idx));
        } else {
          window.editor.setValue(cur + '\n' + wrapped);
        }
        if (window.runPreview) window.runPreview();
        showT(msg);
      }
    });

    document.getElementById('hw-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showT(T.loadSuccess);
      }
    });

    // Default: render GPS
    renderGPS();

    if (window.showToast) window.showToast(T.injected);
  }
})();
